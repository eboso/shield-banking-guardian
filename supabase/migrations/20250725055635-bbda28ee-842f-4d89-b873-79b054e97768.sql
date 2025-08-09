-- Create user profiles table for additional user information
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'user',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create authentication events table for tracking login attempts
CREATE TABLE public.auth_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL, -- 'login', 'logout', 'failed_login', 'password_reset'
  ip_address INET,
  user_agent TEXT,
  location TEXT,
  success BOOLEAN DEFAULT false,
  risk_score INTEGER DEFAULT 0,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create threat detections table
CREATE TABLE public.threat_detections (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  threat_type TEXT NOT NULL, -- 'spoofing', 'brute_force', 'anomaly', 'suspicious_location'
  severity TEXT NOT NULL, -- 'low', 'medium', 'high', 'critical'
  confidence_score DECIMAL(3,2) CHECK (confidence_score >= 0 AND confidence_score <= 1),
  description TEXT,
  source_ip INET,
  metadata JSONB DEFAULT '{}',
  is_resolved BOOLEAN DEFAULT false,
  resolved_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create behavioral analytics table
CREATE TABLE public.behavioral_analytics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  session_id TEXT,
  device_fingerprint TEXT,
  typing_pattern JSONB,
  mouse_movement JSONB,
  screen_resolution TEXT,
  timezone TEXT,
  language TEXT,
  anomaly_detected BOOLEAN DEFAULT false,
  anomaly_score DECIMAL(3,2) CHECK (anomaly_score >= 0 AND anomaly_score <= 1),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create risk scoring table
CREATE TABLE public.risk_scores (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  overall_score INTEGER CHECK (overall_score >= 0 AND overall_score <= 100),
  factors JSONB DEFAULT '{}', -- Store individual risk factors
  last_calculated TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE users (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  role VARCHAR(20) DEFAULT 'customer',
  password_hash TEXT NOT NULL,
  status VARCHAR(10) DEFAULT 'active'
);

CREATE TABLE transactions (
  transaction_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  timestamp DATETIME NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  location VARCHAR(100),
  status VARCHAR(20) DEFAULT 'pending',
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE threat_logs (
  log_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  type VARCHAR(50) NOT NULL,
  description TEXT,
  date_flagged DATETIME NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE access_logs (
  log_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  ip_address VARCHAR(45) NOT NULL,
  login_time DATETIME NOT NULL,
  status VARCHAR(20) DEFAULT 'success',
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE alerts (
  alert_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  log_id INT,
  method VARCHAR(50) NOT NULL,
  sent_at DATETIME NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (log_id) REFERENCES threat_logs(log_id)
);

-- Enable Row Level Security on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.auth_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.threat_detections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.behavioral_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.risk_scores ENABLE ROW LEVEL SECURITY;

-- Create security definer function to get current user role
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS TEXT AS $$
  SELECT role FROM public.profiles WHERE user_id = auth.uid();
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- Create policies for profiles table
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all profiles" 
ON public.profiles 
FOR ALL 
USING (public.get_current_user_role() = 'admin');

-- Create policies for auth_events table
CREATE POLICY "Users can view their own auth events" 
ON public.auth_events 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "System can insert auth events" 
ON public.auth_events 
FOR INSERT 
WITH CHECK (true); -- Allow system to log events

CREATE POLICY "Admins can view all auth events" 
ON public.auth_events 
FOR ALL 
USING (public.get_current_user_role() = 'admin');

-- Create policies for threat_detections table
CREATE POLICY "Users can view their own threat detections" 
ON public.threat_detections 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "System can insert threat detections" 
ON public.threat_detections 
FOR INSERT 
WITH CHECK (true); -- Allow system to create detections

CREATE POLICY "Admins can manage all threat detections" 
ON public.threat_detections 
FOR ALL 
USING (public.get_current_user_role() = 'admin');

-- Create policies for behavioral_analytics table
CREATE POLICY "Users can view their own behavioral analytics" 
ON public.behavioral_analytics 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "System can insert behavioral analytics" 
ON public.behavioral_analytics 
FOR INSERT 
WITH CHECK (auth.uid() = user_id OR public.get_current_user_role() = 'admin');

CREATE POLICY "Admins can view all behavioral analytics" 
ON public.behavioral_analytics 
FOR ALL 
USING (public.get_current_user_role() = 'admin');

-- Create policies for risk_scores table
CREATE POLICY "Users can view their own risk scores" 
ON public.risk_scores 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "System can manage risk scores" 
ON public.risk_scores 
FOR ALL 
WITH CHECK (auth.uid() = user_id OR public.get_current_user_role() = 'admin');

CREATE POLICY "Admins can view all risk scores" 
ON public.risk_scores 
FOR ALL 
USING (public.get_current_user_role() = 'admin');

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, full_name)
  VALUES (
    NEW.id, 
    NEW.email, 
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.raw_user_meta_data ->> 'name', '')
  );
  RETURN NEW;
END;
$$;

-- Create trigger to automatically create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Create indexes for better performance
CREATE INDEX idx_auth_events_user_id ON public.auth_events(user_id);
CREATE INDEX idx_auth_events_created_at ON public.auth_events(created_at DESC);
CREATE INDEX idx_threat_detections_user_id ON public.threat_detections(user_id);
CREATE INDEX idx_threat_detections_severity ON public.threat_detections(severity);
CREATE INDEX idx_threat_detections_created_at ON public.threat_detections(created_at DESC);
CREATE INDEX idx_behavioral_analytics_user_id ON public.behavioral_analytics(user_id);
CREATE INDEX idx_behavioral_analytics_session_id ON public.behavioral_analytics(session_id);
CREATE INDEX idx_risk_scores_user_id ON public.risk_scores(user_id);

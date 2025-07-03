
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Users, Bell, Lock } from 'lucide-react';

const SystemOverview = () => {
  const metrics = [
    {
      title: "Active Users",
      value: "12,847",
      change: "+12.5%",
      icon: Users,
      color: "text-blue-400"
    },
    {
      title: "Threats Blocked",
      value: "2,341",
      change: "+23.1%",
      icon: Shield,
      color: "text-green-400"
    },
    {
      title: "Active Alerts",
      value: "47",
      change: "Normal",
      icon: Bell,
      color: "text-yellow-400"
    },
    {
      title: "Security Score",
      value: "98.5%",
      change: "+0.3%",
      icon: Lock,
      color: "text-purple-400"
    }
  ];

  const threatTypes = [
    { name: "SIM Swap Attacks", detected: 34, blocked: 32, rate: 94.1 },
    { name: "Caller ID Spoofing", detected: 78, blocked: 76, rate: 97.4 },
    { name: "Device Spoofing", detected: 23, blocked: 21, rate: 91.3 },
    { name: "Biometric Impersonation", detected: 12, blocked: 12, rate: 100 },
    { name: "Session Hijacking", detected: 45, blocked: 43, rate: 95.6 }
  ];

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={index} className="bg-slate-800 border-slate-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-400">{metric.title}</p>
                    <p className="text-2xl font-bold text-white">{metric.value}</p>
                    <p className="text-sm text-green-400">{metric.change}</p>
                  </div>
                  <Icon className={`h-8 w-8 ${metric.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* System Architecture */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">System Architecture</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-600 rounded-lg p-4 mb-4">
                <h3 className="text-white font-semibold">Authentication Layer</h3>
              </div>
              <ul className="text-sm text-gray-300 space-y-2">
                <li>• Multi-factor Authentication</li>
                <li>• Biometric Verification</li>
                <li>• Voice Pattern Recognition</li>
                <li>• Device Fingerprinting</li>
              </ul>
            </div>
            <div className="text-center">
              <div className="bg-purple-600 rounded-lg p-4 mb-4">
                <h3 className="text-white font-semibold">AI/ML Detection</h3>
              </div>
              <ul className="text-sm text-gray-300 space-y-2">
                <li>• Behavioral Analytics</li>
                <li>• Anomaly Detection</li>
                <li>• Risk Scoring</li>
                <li>• Threat Intelligence</li>
              </ul>
            </div>
            <div className="text-center">
              <div className="bg-green-600 rounded-lg p-4 mb-4">
                <h3 className="text-white font-semibold">Response System</h3>
              </div>
              <ul className="text-sm text-gray-300 space-y-2">
                <li>• Real-time Alerts</li>
                <li>• Automated Blocking</li>
                <li>• Audit Logging</li>
                <li>• Incident Response</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Threat Detection Summary */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Threat Detection Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {threatTypes.map((threat, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
                <div className="flex-1">
                  <h4 className="text-white font-medium">{threat.name}</h4>
                  <p className="text-sm text-gray-400">
                    Detected: {threat.detected} | Blocked: {threat.blocked}
                  </p>
                </div>
                <div className="text-right">
                  <Badge 
                    variant={threat.rate >= 95 ? "default" : "destructive"}
                    className={threat.rate >= 95 ? "bg-green-600" : "bg-red-600"}
                  >
                    {threat.rate}% Success Rate
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemOverview;

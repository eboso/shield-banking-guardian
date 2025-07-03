
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Clock, MapPin, Smartphone, TrendingUp } from 'lucide-react';

const BehavioralAnalytics = () => {
  const loginPatterns = [
    { time: '06:00', normal: 45, anomaly: 2 },
    { time: '09:00', normal: 120, anomaly: 5 },
    { time: '12:00', normal: 80, anomaly: 3 },
    { time: '15:00', normal: 95, anomaly: 4 },
    { time: '18:00', normal: 140, anomaly: 8 },
    { time: '21:00', normal: 70, anomaly: 3 },
    { time: '00:00', normal: 25, anomaly: 1 }
  ];

  const behavioralProfile = [
    { subject: 'Login Time', A: 120, B: 110, fullMark: 150 },
    { subject: 'Location', A: 98, B: 130, fullMark: 150 },
    { subject: 'Device', A: 86, B: 130, fullMark: 150 },
    { subject: 'Transaction Pattern', A: 99, B: 100, fullMark: 150 },
    { subject: 'Session Duration', A: 85, B: 90, fullMark: 150 },
    { subject: 'Navigation Pattern', A: 65, B: 85, fullMark: 150 }
  ];

  const anomalyTypes = [
    {
      type: "Time-based Anomaly",
      description: "Login at unusual hours",
      count: 23,
      risk: "Medium",
      icon: Clock
    },
    {
      type: "Location Anomaly",
      description: "Access from new location",
      count: 45,
      risk: "High",
      icon: MapPin
    },
    {
      type: "Device Anomaly",
      description: "New device fingerprint",
      count: 18,
      risk: "Medium",
      icon: Smartphone
    },
    {
      type: "Velocity Anomaly",
      description: "Unusual transaction speed",
      count: 12,
      risk: "High",
      icon: TrendingUp
    }
  ];

  const userProfiles = [
    {
      userId: "USR-001",
      riskScore: 85,
      loginTime: "08:30 - 17:00",
      location: "Lagos, Nigeria",
      device: "iPhone 13",
      anomalies: 3
    },
    {
      userId: "USR-002",
      riskScore: 45,
      loginTime: "09:00 - 18:00",
      location: "Abuja, Nigeria",
      device: "Samsung Galaxy",
      anomalies: 1
    },
    {
      userId: "USR-003",
      riskScore: 92,
      loginTime: "Variable",
      location: "Multiple",
      device: "Multiple",
      anomalies: 8
    }
  ];

  const getRiskColor = (score: number) => {
    if (score >= 80) return "text-red-400";
    if (score >= 60) return "text-yellow-400";
    return "text-green-400";
  };

  return (
    <div className="space-y-6">
      {/* Login Pattern Analysis */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Login Pattern Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={loginPatterns}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="time" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#fff'
                }} 
              />
              <Line type="monotone" dataKey="normal" stroke="#10B981" strokeWidth={2} name="Normal Logins" />
              <Line type="monotone" dataKey="anomaly" stroke="#EF4444" strokeWidth={2} name="Anomalous Logins" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Behavioral Profile Radar */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Behavioral Profile Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={behavioralProfile}>
                <PolarGrid stroke="#374151" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                <PolarRadiusAxis tick={{ fill: '#9CA3AF', fontSize: 10 }} />
                <Radar name="Normal" dataKey="A" stroke="#10B981" fill="#10B981" fillOpacity={0.1} />
                <Radar name="Anomalous" dataKey="B" stroke="#EF4444" fill="#EF4444" fillOpacity={0.1} />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Anomaly Types */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Anomaly Detection Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {anomalyTypes.map((anomaly, index) => {
                const Icon = anomaly.icon;
                return (
                  <div key={index} className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Icon className="h-6 w-6 text-blue-400" />
                      <div>
                        <h4 className="text-white font-medium">{anomaly.type}</h4>
                        <p className="text-sm text-gray-400">{anomaly.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-white">{anomaly.count}</p>
                      <p className={`text-sm ${anomaly.risk === 'High' ? 'text-red-400' : 'text-yellow-400'}`}>
                        {anomaly.risk}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* User Risk Profiles */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">High-Risk User Profiles</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left p-3 text-gray-400">User ID</th>
                  <th className="text-left p-3 text-gray-400">Risk Score</th>
                  <th className="text-left p-3 text-gray-400">Login Pattern</th>
                  <th className="text-left p-3 text-gray-400">Location</th>
                  <th className="text-left p-3 text-gray-400">Device</th>
                  <th className="text-left p-3 text-gray-400">Anomalies</th>
                </tr>
              </thead>
              <tbody>
                {userProfiles.map((user, index) => (
                  <tr key={index} className="border-b border-slate-700">
                    <td className="p-3 text-white font-medium">{user.userId}</td>
                    <td className="p-3">
                      <span className={`font-bold ${getRiskColor(user.riskScore)}`}>
                        {user.riskScore}
                      </span>
                    </td>
                    <td className="p-3 text-gray-300">{user.loginTime}</td>
                    <td className="p-3 text-gray-300">{user.location}</td>
                    <td className="p-3 text-gray-300">{user.device}</td>
                    <td className="p-3 text-center">
                      <span className="bg-red-600 text-white px-2 py-1 rounded-full text-xs">
                        {user.anomalies}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BehavioralAnalytics;

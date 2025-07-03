
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Shield, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

const ThreatDetectionDashboard = () => {
  const [threats] = useState([
    { 
      id: 1, 
      type: "SIM Swap", 
      risk: "High", 
      status: "Blocked", 
      timestamp: "2024-01-15 14:32:45",
      userId: "USR-001",
      location: "Lagos, Nigeria",
      details: "Attempted login from new device after SIM change detected"
    },
    { 
      id: 2, 
      type: "Caller ID Spoofing", 
      risk: "Medium", 
      status: "Monitoring", 
      timestamp: "2024-01-15 14:28:12",
      userId: "USR-002",
      location: "Abuja, Nigeria",
      details: "Voice call verification requested from spoofed number"
    },
    { 
      id: 3, 
      type: "Device Spoofing", 
      risk: "High", 
      status: "Blocked", 
      timestamp: "2024-01-15 14:25:33",
      userId: "USR-003",
      location: "Port Harcourt, Nigeria",
      details: "Device fingerprint mismatch detected during transaction"
    },
    { 
      id: 4, 
      type: "Biometric Impersonation", 
      risk: "Critical", 
      status: "Blocked", 
      timestamp: "2024-01-15 14:20:17",
      userId: "USR-004",
      location: "Kano, Nigeria",
      details: "Facial recognition confidence below threshold"
    }
  ]);

  const threatData = [
    { name: '00:00', simSwap: 4, callerID: 8, device: 3, biometric: 1 },
    { name: '04:00', simSwap: 6, callerID: 12, device: 5, biometric: 2 },
    { name: '08:00', simSwap: 12, callerID: 18, device: 8, biometric: 3 },
    { name: '12:00', simSwap: 8, callerID: 15, device: 6, biometric: 2 },
    { name: '16:00', simSwap: 15, callerID: 22, device: 11, biometric: 4 },
    { name: '20:00', simSwap: 10, callerID: 14, device: 7, biometric: 2 }
  ];

  const riskDistribution = [
    { risk: 'Low', count: 45, color: '#10B981' },
    { risk: 'Medium', count: 78, color: '#F59E0B' },
    { risk: 'High', count: 23, color: '#EF4444' },
    { risk: 'Critical', count: 12, color: '#7C3AED' }
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'bg-green-600';
      case 'Medium': return 'bg-yellow-600';
      case 'High': return 'bg-red-600';
      case 'Critical': return 'bg-purple-600';
      default: return 'bg-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Blocked': return <XCircle className="h-4 w-4 text-red-400" />;
      case 'Monitoring': return <AlertTriangle className="h-4 w-4 text-yellow-400" />;
      case 'Resolved': return <CheckCircle className="h-4 w-4 text-green-400" />;
      default: return <Shield className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Real-time Threat Chart */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Real-time Threat Detection</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={threatData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#fff'
                }} 
              />
              <Line type="monotone" dataKey="simSwap" stroke="#EF4444" strokeWidth={2} name="SIM Swap" />
              <Line type="monotone" dataKey="callerID" stroke="#F59E0B" strokeWidth={2} name="Caller ID" />
              <Line type="monotone" dataKey="device" stroke="#10B981" strokeWidth={2} name="Device" />
              <Line type="monotone" dataKey="biometric" stroke="#8B5CF6" strokeWidth={2} name="Biometric" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk Distribution */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Risk Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={riskDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="risk" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#fff'
                  }} 
                />
                <Bar dataKey="count" fill="#8B5CF6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Threats */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Recent Threat Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {threats.map((threat) => (
                <div key={threat.id} className="p-3 bg-slate-700 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(threat.status)}
                      <span className="text-white font-medium">{threat.type}</span>
                    </div>
                    <Badge className={getRiskColor(threat.risk)}>
                      {threat.risk}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-300 space-y-1">
                    <p>User: {threat.userId} | Location: {threat.location}</p>
                    <p>Time: {threat.timestamp}</p>
                    <p className="text-gray-400">{threat.details}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ThreatDetectionDashboard;

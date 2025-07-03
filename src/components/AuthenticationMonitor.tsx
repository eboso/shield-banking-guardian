
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle, AlertTriangle, User, Smartphone, Shield } from 'lucide-react';

const AuthenticationMonitor = () => {
  const [authAttempts] = useState([
    {
      id: 1,
      userId: "USR-001",
      method: "Biometric + OTP",
      status: "Success",
      confidence: 98.5,
      timestamp: "2024-01-15 14:35:22",
      location: "Lagos, Nigeria",
      device: "iPhone 13",
      riskScore: 15
    },
    {
      id: 2,
      userId: "USR-002",
      method: "Password + SMS",
      status: "Failed",
      confidence: 45.2,
      timestamp: "2024-01-15 14:33:18",
      location: "Unknown",
      device: "Android (Spoofed)",
      riskScore: 85
    },
    {
      id: 3,
      userId: "USR-003",
      method: "Face Recognition",
      status: "Pending",
      confidence: 72.1,
      timestamp: "2024-01-15 14:32:45",
      location: "Abuja, Nigeria",
      device: "Samsung Galaxy",
      riskScore: 55
    },
    {
      id: 4,
      userId: "USR-004",
      method: "Voice Pattern",
      status: "Success",
      confidence: 94.8,
      timestamp: "2024-01-15 14:30:12",
      location: "Port Harcourt, Nigeria",
      device: "Huawei P30",
      riskScore: 20
    }
  ]);

  const authMethods = [
    { name: "Biometric", success: 245, failed: 12, accuracy: 95.3 },
    { name: "SMS OTP", success: 189, failed: 23, accuracy: 89.2 },
    { name: "Voice Pattern", success: 156, failed: 8, accuracy: 95.1 },
    { name: "Device Fingerprint", success: 298, failed: 34, accuracy: 89.8 }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Success': return <CheckCircle className="h-5 w-5 text-green-400" />;
      case 'Failed': return <XCircle className="h-5 w-5 text-red-400" />;
      case 'Pending': return <AlertTriangle className="h-5 w-5 text-yellow-400" />;
      default: return <Shield className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Success': return 'bg-green-600';
      case 'Failed': return 'bg-red-600';
      case 'Pending': return 'bg-yellow-600';
      default: return 'bg-gray-600';
    }
  };

  const getRiskColor = (score: number) => {
    if (score >= 70) return 'text-red-400';
    if (score >= 40) return 'text-yellow-400';
    return 'text-green-400';
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-400';
    if (confidence >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="space-y-6">
      {/* Authentication Method Performance */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {authMethods.map((method, index) => (
          <Card key={index} className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-medium">{method.name}</h3>
                <Shield className="h-6 w-6 text-blue-400" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Success</span>
                  <span className="text-green-400">{method.success}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Failed</span>
                  <span className="text-red-400">{method.failed}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Accuracy</span>
                  <span className="text-white font-medium">{method.accuracy}%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Authentication Attempts */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Recent Authentication Attempts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {authAttempts.map((attempt) => (
              <div key={attempt.id} className="p-4 bg-slate-700 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(attempt.status)}
                    <div>
                      <h4 className="text-white font-medium">{attempt.userId}</h4>
                      <p className="text-sm text-gray-400">{attempt.method}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(attempt.status)}>
                      {attempt.status}
                    </Badge>
                    <span className={`text-sm font-medium ${getRiskColor(attempt.riskScore)}`}>
                      Risk: {attempt.riskScore}
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-3">
                  <div className="text-sm">
                    <span className="text-gray-400">Confidence: </span>
                    <span className={`font-medium ${getConfidenceColor(attempt.confidence)}`}>
                      {attempt.confidence}%
                    </span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-400">Location: </span>
                    <span className="text-white">{attempt.location}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-400">Device: </span>
                    <span className="text-white">{attempt.device}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-400">Time: </span>
                    <span className="text-white">{attempt.timestamp}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Confidence Level</span>
                      <span className={getConfidenceColor(attempt.confidence)}>
                        {attempt.confidence}%
                      </span>
                    </div>
                    <Progress 
                      value={attempt.confidence} 
                      className="h-2"
                    />
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="border-slate-600 text-white hover:bg-slate-600"
                  >
                    Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Biometric Verification Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Biometric Verification Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <User className="h-6 w-6 text-blue-400" />
                  <div>
                    <h4 className="text-white font-medium">Face Recognition</h4>
                    <p className="text-sm text-gray-400">Active verification</p>
                  </div>
                </div>
                <Badge className="bg-green-600">Active</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Smartphone className="h-6 w-6 text-purple-400" />
                  <div>
                    <h4 className="text-white font-medium">Fingerprint</h4>
                    <p className="text-sm text-gray-400">Backup method</p>
                  </div>
                </div>
                <Badge className="bg-blue-600">Standby</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Shield className="h-6 w-6 text-green-400" />
                  <div>
                    <h4 className="text-white font-medium">Voice Pattern</h4>
                    <p className="text-sm text-gray-400">Call verification</p>
                  </div>
                </div>
                <Badge className="bg-green-600">Active</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Authentication Flow</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  1
                </div>
                <div>
                  <h4 className="text-white font-medium">Primary Authentication</h4>
                  <p className="text-sm text-gray-400">Password + Device verification</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  2
                </div>
                <div>
                  <h4 className="text-white font-medium">Biometric Verification</h4>
                  <p className="text-sm text-gray-400">Face/Fingerprint recognition</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  3
                </div>
                <div>
                  <h4 className="text-white font-medium">Behavioral Analysis</h4>
                  <p className="text-sm text-gray-400">Pattern matching & risk scoring</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  4
                </div>
                <div>
                  <h4 className="text-white font-medium">Final Verification</h4>
                  <p className="text-sm text-gray-400">OTP confirmation if required</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuthenticationMonitor;

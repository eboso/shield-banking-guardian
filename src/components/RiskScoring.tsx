
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, AlertTriangle, Shield } from 'lucide-react';

const RiskScoring = () => {
  const riskTrends = [
    { time: '00:00', low: 45, medium: 23, high: 8, critical: 2 },
    { time: '04:00', low: 52, medium: 18, high: 6, critical: 1 },
    { time: '08:00', low: 78, medium: 34, high: 12, critical: 3 },
    { time: '12:00', low: 89, medium: 45, high: 15, critical: 4 },
    { time: '16:00', low: 67, medium: 38, high: 18, critical: 6 },
    { time: '20:00', low: 56, medium: 28, high: 14, critical: 3 }
  ];

  const riskDistribution = [
    { name: 'Low Risk', value: 412, color: '#10B981' },
    { name: 'Medium Risk', value: 186, color: '#F59E0B' },
    { name: 'High Risk', value: 73, color: '#EF4444' },
    { name: 'Critical Risk', value: 19, color: '#7C3AED' }
  ];

  const userRiskProfiles = [
    {
      userId: "USR-001",
      overallRisk: 85,
      factors: {
        location: 90,
        device: 75,
        behavior: 80,
        biometric: 95
      },
      trend: "up",
      status: "High Risk"
    },
    {
      userId: "USR-002",
      overallRisk: 25,
      factors: {
        location: 20,
        device: 15,
        behavior: 30,
        biometric: 35
      },
      trend: "down",
      status: "Low Risk"
    },
    {
      userId: "USR-003",
      overallRisk: 65,
      factors: {
        location: 70,
        device: 60,
        behavior: 65,
        biometric: 65
      },
      trend: "up",
      status: "Medium Risk"
    },
    {
      userId: "USR-004",
      overallRisk: 92,
      factors: {
        location: 95,
        device: 90,
        behavior: 88,
        biometric: 95
      },
      trend: "up",
      status: "Critical"
    }
  ];

  const riskFactors = [
    { factor: "Location Anomaly", weight: 25, current: 15, impact: "Medium" },
    { factor: "Device Fingerprint", weight: 20, current: 8, impact: "Low" },
    { factor: "Behavioral Pattern", weight: 30, current: 22, impact: "High" },
    { factor: "Biometric Confidence", weight: 25, current: 18, impact: "Medium" }
  ];

  const getRiskColor = (score: number) => {
    if (score >= 80) return "text-red-400";
    if (score >= 60) return "text-orange-400";
    if (score >= 40) return "text-yellow-400";
    return "text-green-400";
  };

  const getRiskBadgeColor = (status: string) => {
    switch (status) {
      case 'Critical': return 'bg-red-600';
      case 'High Risk': return 'bg-orange-600';
      case 'Medium Risk': return 'bg-yellow-600';
      case 'Low Risk': return 'bg-green-600';
      default: return 'bg-gray-600';
    }
  };

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? 
      <TrendingUp className="h-4 w-4 text-red-400" /> : 
      <TrendingDown className="h-4 w-4 text-green-400" />;
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High': return 'text-red-400';
      case 'Medium': return 'text-yellow-400';
      case 'Low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Risk Score Trends */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Risk Score Trends (24 Hours)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={riskTrends}>
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
              <Line type="monotone" dataKey="low" stroke="#10B981" strokeWidth={2} name="Low Risk" />
              <Line type="monotone" dataKey="medium" stroke="#F59E0B" strokeWidth={2} name="Medium Risk" />
              <Line type="monotone" dataKey="high" stroke="#EF4444" strokeWidth={2} name="High Risk" />
              <Line type="monotone" dataKey="critical" stroke="#7C3AED" strokeWidth={2} name="Critical Risk" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk Distribution */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Current Risk Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={riskDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {riskDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#fff'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Risk Factors */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Risk Factor Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {riskFactors.map((factor, index) => (
                <div key={index} className="p-4 bg-slate-700 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white font-medium">{factor.factor}</h4>
                    <Badge className={getImpactColor(factor.impact) === 'text-red-400' ? 'bg-red-600' : 
                                   getImpactColor(factor.impact) === 'text-yellow-400' ? 'bg-yellow-600' : 'bg-green-600'}>
                      {factor.impact}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Weight: {factor.weight}%</span>
                      <span className="text-white">Current: {factor.current}%</span>
                    </div>
                    <Progress value={factor.current} className="h-2" />
                  </div>
                </div>
              ))}
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
          <div className="space-y-4">
            {userRiskProfiles.map((user, index) => (
              <div key={index} className="p-4 bg-slate-700 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-white font-medium">{user.userId}</span>
                      {getTrendIcon(user.trend)}
                    </div>
                    <Badge className={getRiskBadgeColor(user.status)}>
                      {user.status}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <span className={`text-2xl font-bold ${getRiskColor(user.overallRisk)}`}>
                      {user.overallRisk}
                    </span>
                    <p className="text-sm text-gray-400">Overall Risk</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {Object.entries(user.factors).map(([factor, score]) => (
                    <div key={factor} className="text-center">
                      <p className="text-sm text-gray-400 capitalize mb-1">{factor}</p>
                      <div className="mb-2">
                        <span className={`text-lg font-semibold ${getRiskColor(score as number)}`}>
                          {score}
                        </span>
                      </div>
                      <Progress value={score as number} className="h-2" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Risk Scoring Matrix */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Risk Scoring Matrix</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-slate-700 rounded-lg">
              <Shield className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <h3 className="text-white font-medium">Low Risk</h3>
              <p className="text-2xl font-bold text-green-400">0-39</p>
              <p className="text-sm text-gray-400">Normal behavior</p>
            </div>
            
            <div className="text-center p-4 bg-slate-700 rounded-lg">
              <AlertTriangle className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
              <h3 className="text-white font-medium">Medium Risk</h3>
              <p className="text-2xl font-bold text-yellow-400">40-69</p>
              <p className="text-sm text-gray-400">Monitor closely</p>
            </div>
            
            <div className="text-center p-4 bg-slate-700 rounded-lg">
              <AlertTriangle className="h-8 w-8 text-orange-400 mx-auto mb-2" />
              <h3 className="text-white font-medium">High Risk</h3>
              <p className="text-2xl font-bold text-orange-400">70-89</p>
              <p className="text-sm text-gray-400">Require additional verification</p>
            </div>
            
            <div className="text-center p-4 bg-slate-700 rounded-lg">
              <XCircle className="h-8 w-8 text-red-400 mx-auto mb-2" />
              <h3 className="text-white font-medium">Critical Risk</h3>
              <p className="text-2xl font-bold text-red-400">90-100</p>
              <p className="text-sm text-gray-400">Immediate action required</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RiskScoring;

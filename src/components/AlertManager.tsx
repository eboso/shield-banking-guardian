
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, AlertTriangle, CheckCircle, XCircle, Clock, Shield } from 'lucide-react';

const AlertManager = () => {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: "Critical",
      category: "SIM Swap",
      title: "Potential SIM Swap Attack Detected",
      description: "User USR-001 attempting login from new device after SIM change detected within 10 minutes",
      timestamp: "2024-01-15 14:35:22",
      status: "Active",
      userId: "USR-001",
      location: "Lagos, Nigeria",
      riskScore: 95,
      actions: ["Block User", "Require Additional Verification", "Contact User"]
    },
    {
      id: 2,
      type: "High",
      category: "Biometric Spoofing",
      title: "Biometric Verification Failed",
      description: "Multiple failed biometric attempts detected for user USR-004",
      timestamp: "2024-01-15 14:32:15",
      status: "Investigating",
      userId: "USR-004",
      location: "Kano, Nigeria",
      riskScore: 88,
      actions: ["Escalate to Security", "Temporary Lock", "Manual Review"]
    },
    {
      id: 3,
      type: "Medium",
      category: "Location Anomaly",
      title: "Unusual Location Access",
      description: "User USR-002 accessing from a new geographical location",
      timestamp: "2024-01-15 14:28:45",
      status: "Resolved",
      userId: "USR-002",
      location: "Abuja, Nigeria",
      riskScore: 65,
      actions: ["Verified", "Whitelist Location"]
    },
    {
      id: 4,
      type: "High",
      category: "Device Spoofing",
      title: "Device Fingerprint Mismatch",
      description: "Suspicious device characteristics detected during authentication",
      timestamp: "2024-01-15 14:25:18",
      status: "Active",
      userId: "USR-003",
      location: "Port Harcourt, Nigeria",
      riskScore: 82,
      actions: ["Block Device", "Require Re-enrollment", "Investigate"]
    }
  ]);

  const alertStats = [
    { type: "Critical", count: 3, color: "text-red-400", bg: "bg-red-600" },
    { type: "High", count: 12, color: "text-orange-400", bg: "bg-orange-600" },
    { type: "Medium", count: 28, color: "text-yellow-400", bg: "bg-yellow-600" },
    { type: "Low", count: 45, color: "text-green-400", bg: "bg-green-600" }
  ];

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'Critical': return <XCircle className="h-5 w-5 text-red-400" />;
      case 'High': return <AlertTriangle className="h-5 w-5 text-orange-400" />;
      case 'Medium': return <Bell className="h-5 w-5 text-yellow-400" />;
      case 'Low': return <Shield className="h-5 w-5 text-green-400" />;
      default: return <Bell className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active': return <AlertTriangle className="h-4 w-4 text-red-400" />;
      case 'Investigating': return <Clock className="h-4 w-4 text-yellow-400" />;
      case 'Resolved': return <CheckCircle className="h-4 w-4 text-green-400" />;
      default: return <Shield className="h-4 w-4 text-gray-400" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Critical': return 'bg-red-600';
      case 'High': return 'bg-orange-600';
      case 'Medium': return 'bg-yellow-600';
      case 'Low': return 'bg-green-600';
      default: return 'bg-gray-600';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-red-600';
      case 'Investigating': return 'bg-yellow-600';
      case 'Resolved': return 'bg-green-600';
      default: return 'bg-gray-600';
    }
  };

  const handleAlertAction = (alertId: number, action: string) => {
    console.log(`Executing action: ${action} for alert: ${alertId}`);
    // Update alert status based on action
    setAlerts(alerts.map(alert => 
      alert.id === alertId 
        ? { ...alert, status: action === 'Block User' ? 'Investigating' : alert.status }
        : alert
    ));
  };

  const activeAlerts = alerts.filter(alert => alert.status === 'Active');
  const investigatingAlerts = alerts.filter(alert => alert.status === 'Investigating');
  const resolvedAlerts = alerts.filter(alert => alert.status === 'Resolved');

  return (
    <div className="space-y-6">
      {/* Alert Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {alertStats.map((stat, index) => (
          <Card key={index} className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">{stat.type} Alerts</p>
                  <p className="text-2xl font-bold text-white">{stat.count}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.bg}`}>
                  <Bell className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Alert Management Tabs */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Alert Management</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="active" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3 bg-slate-700">
              <TabsTrigger value="active" className="text-white data-[state=active]:bg-red-600">
                Active ({activeAlerts.length})
              </TabsTrigger>
              <TabsTrigger value="investigating" className="text-white data-[state=active]:bg-yellow-600">
                Investigating ({investigatingAlerts.length})
              </TabsTrigger>
              <TabsTrigger value="resolved" className="text-white data-[state=active]:bg-green-600">
                Resolved ({resolvedAlerts.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="space-y-4">
              {activeAlerts.map((alert) => (
                <div key={alert.id} className="p-4 bg-slate-700 rounded-lg border-l-4 border-red-500">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      {getAlertIcon(alert.type)}
                      <div>
                        <h4 className="text-white font-medium">{alert.title}</h4>
                        <p className="text-sm text-gray-400">{alert.category}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getTypeColor(alert.type)}>
                        {alert.type}
                      </Badge>
                      <Badge className={getStatusColor(alert.status)}>
                        {alert.status}
                      </Badge>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 mb-3">{alert.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-2 text-sm mb-4">
                    <div>
                      <span className="text-gray-400">User: </span>
                      <span className="text-white">{alert.userId}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Location: </span>
                      <span className="text-white">{alert.location}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Risk Score: </span>
                      <span className="text-red-400 font-medium">{alert.riskScore}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Time: </span>
                      <span className="text-white">{alert.timestamp}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {alert.actions.map((action, index) => (
                      <Button
                        key={index}
                        size="sm"
                        variant="outline"
                        className="border-slate-600 text-white hover:bg-slate-600"
                        onClick={() => handleAlertAction(alert.id, action)}
                      >
                        {action}
                      </Button>
                    ))}
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="investigating" className="space-y-4">
              {investigatingAlerts.map((alert) => (
                <div key={alert.id} className="p-4 bg-slate-700 rounded-lg border-l-4 border-yellow-500">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(alert.status)}
                      <div>
                        <h4 className="text-white font-medium">{alert.title}</h4>
                        <p className="text-sm text-gray-400">{alert.category}</p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(alert.status)}>
                      {alert.status}
                    </Badge>
                  </div>
                  <p className="text-gray-300 mb-2">{alert.description}</p>
                  <p className="text-sm text-gray-400">Investigation in progress...</p>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="resolved" className="space-y-4">
              {resolvedAlerts.map((alert) => (
                <div key={alert.id} className="p-4 bg-slate-700 rounded-lg border-l-4 border-green-500">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(alert.status)}
                      <div>
                        <h4 className="text-white font-medium">{alert.title}</h4>
                        <p className="text-sm text-gray-400">{alert.category}</p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(alert.status)}>
                      {alert.status}
                    </Badge>
                  </div>
                  <p className="text-gray-300 mb-2">{alert.description}</p>
                  <p className="text-sm text-green-400">Successfully resolved</p>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AlertManager;

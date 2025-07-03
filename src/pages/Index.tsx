
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ThreatDetectionDashboard from '@/components/ThreatDetectionDashboard';
import BehavioralAnalytics from '@/components/BehavioralAnalytics';
import AuthenticationMonitor from '@/components/AuthenticationMonitor';
import AlertManager from '@/components/AlertManager';
import RiskScoring from '@/components/RiskScoring';
import SystemOverview from '@/components/SystemOverview';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto p-6">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-2">
            Banking Anti-Spoofing System
          </h1>
          <p className="text-gray-300 text-lg">
            Advanced threat detection and prevention for digital banking security
          </p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-slate-800 border-slate-700">
            <TabsTrigger value="overview" className="text-white data-[state=active]:bg-purple-600">
              Overview
            </TabsTrigger>
            <TabsTrigger value="threats" className="text-white data-[state=active]:bg-purple-600">
              Threat Detection
            </TabsTrigger>
            <TabsTrigger value="behavioral" className="text-white data-[state=active]:bg-purple-600">
              Behavioral Analytics
            </TabsTrigger>
            <TabsTrigger value="authentication" className="text-white data-[state=active]:bg-purple-600">
              Authentication
            </TabsTrigger>
            <TabsTrigger value="alerts" className="text-white data-[state=active]:bg-purple-600">
              Alert Management
            </TabsTrigger>
            <TabsTrigger value="risk" className="text-white data-[state=active]:bg-purple-600">
              Risk Scoring
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <SystemOverview />
          </TabsContent>

          <TabsContent value="threats" className="space-y-6">
            <ThreatDetectionDashboard />
          </TabsContent>

          <TabsContent value="behavioral" className="space-y-6">
            <BehavioralAnalytics />
          </TabsContent>

          <TabsContent value="authentication" className="space-y-6">
            <AuthenticationMonitor />
          </TabsContent>

          <TabsContent value="alerts" className="space-y-6">
            <AlertManager />
          </TabsContent>

          <TabsContent value="risk" className="space-y-6">
            <RiskScoring />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;

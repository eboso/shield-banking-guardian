import React from 'react';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/hooks/useAuth';
import { LogOut, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const DashboardHeader = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Signed out",
        description: "You have been signed out successfully.",
      });
    }
  };

  return (
    <div className="flex justify-between items-center mb-8">
      <div className="text-center flex-1">
        <h1 className="text-4xl font-bold text-white mb-2">
          Banking Anti-Spoofing System
        </h1>
        <p className="text-gray-300 text-lg">
          Advanced threat detection and prevention for digital banking security
        </p>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 text-white">
          <User className="h-4 w-4" />
          <span className="text-sm">{user?.email}</span>
        </div>
        <Button
          onClick={handleSignOut}
          variant="outline"
          size="sm"
          className="bg-slate-800 border-slate-600 text-white hover:bg-slate-700"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
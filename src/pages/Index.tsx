
import CertificationForm from "@/components/CertificationForm";
import CertificationHistory from "@/components/CertificationHistory";
import { useAuth } from "@/components/AuthProvider";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("new");

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Button onClick={() => navigate('/auth')}>Sign In</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-industrial-900">
              Seam Weld Certification System
            </h2>
            <p className="text-industrial-600">
              Manage your certification processes
            </p>
          </div>
          <Button onClick={handleSignOut} variant="outline">
            Sign Out
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="new">New Certification</TabsTrigger>
            <TabsTrigger value="history">Certification History</TabsTrigger>
          </TabsList>
          <TabsContent value="new">
            <CertificationForm />
          </TabsContent>
          <TabsContent value="history">
            <CertificationHistory />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;

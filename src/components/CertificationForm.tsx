
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/sonner';
import SafetySection from './SafetySection';
import ProductionSection from './ProductionSection';
import QualitySection from './QualitySection';
import DCPSection from './DCPSection';
import CertificationEvaluation from './CertificationEvaluation';
import ApprovalSection from './ApprovalSection';
import CertificationCompletion from './CertificationCompletion';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './AuthProvider';

type Section = 'initial' | 'safety' | 'production' | 'quality' | 'dcp' | 'evaluation' | 'approval' | 'completion';

const CertificationForm = () => {
  const [currentSection, setCurrentSection] = useState<Section>('initial');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    traineeName: '',
    areaExamined: '',
    certificationType: '',
    beginningDate: '',
    trainerInitials: '',
    traineeInitials: '',
  });
  const { user } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error("You must be signed in to submit the form.");
      return;
    }
    setLoading(true);
    const { traineeName, areaExamined, certificationType, beginningDate, trainerInitials, traineeInitials } = formData;

    // Insert the survey data into Supabase
    const { error } = await supabase
      .from('certification_surveys')
      .insert([{
        trainee_name: traineeName,
        area_examined: areaExamined,
        certification_type: certificationType,
        beginning_date: beginningDate,
        trainer_initials: trainerInitials,
        trainee_initials: traineeInitials,
        user_id: user.id,
      }]);

    setLoading(false);

    if (error) {
      toast.error("Failed to start certification process", {
        description: error.message,
      });
      return;
    }

    toast.success("Certification process started", {
      description: `Trainee: ${formData.traineeName}, Type: ${formData.certificationType || 'Not specified'}`,
    });

    setCurrentSection('safety');
  };

  const renderCurrentSection = () => {
    switch (currentSection) {
      case 'safety':
        return <SafetySection onComplete={() => setCurrentSection('production')} />;
      case 'production':
        return <ProductionSection onComplete={() => setCurrentSection('quality')} />;
      case 'quality':
        return <QualitySection onComplete={() => setCurrentSection('dcp')} />;
      case 'dcp':
        return <DCPSection onComplete={() => setCurrentSection('evaluation')} />;
      case 'evaluation':
        return <CertificationEvaluation onComplete={() => setCurrentSection('approval')} />;
      case 'approval':
        return <ApprovalSection onComplete={() => setCurrentSection('completion')} />;
      case 'completion':
        return <CertificationCompletion onComplete={() => setCurrentSection('initial')} />;
      default:
        return (
          <Card className="p-6 w-full max-w-2xl mx-auto">
            <div className="space-y-6">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-industrial-900">Seam Weld Certification</h1>
                <p className="text-industrial-600">Dayton Company Training System</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="traineeName">Trainee Name</Label>
                    <Input
                      id="traineeName"
                      name="traineeName"
                      value={formData.traineeName}
                      onChange={handleInputChange}
                      placeholder="Enter trainee name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="areaExamined">Area of Examination</Label>
                    <Input
                      id="areaExamined"
                      name="areaExamined"
                      value={formData.areaExamined}
                      onChange={handleInputChange}
                      placeholder="Enter area"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="certificationType">Certification Type</Label>
                    <Select
                      value={formData.certificationType}
                      onValueChange={(value) =>
                        setFormData(prev => ({ ...prev, certificationType: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="auto">Auto</SelectItem>
                        <SelectItem value="manual">Manual</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="beginningDate">Beginning Training Date</Label>
                    <Input
                      id="beginningDate"
                      name="beginningDate"
                      type="date"
                      value={formData.beginningDate}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="trainerInitials">Trainer Initials</Label>
                    <Input
                      id="trainerInitials"
                      name="trainerInitials"
                      value={formData.trainerInitials}
                      onChange={handleInputChange}
                      placeholder="Enter initials"
                      maxLength={3}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="traineeInitials">Trainee Initials</Label>
                    <Input
                      id="traineeInitials"
                      name="traineeInitials"
                      value={formData.traineeInitials}
                      onChange={handleInputChange}
                      placeholder="Enter initials"
                      maxLength={3}
                      required
                    />
                  </div>
                </div>

                <Button 
                  type="submit"
                  disabled={loading}
                  className="w-full mt-6 bg-industrial-700 hover:bg-industrial-800"
                >
                  {loading ? 'Starting...' : 'Begin Certification Process'}
                </Button>
              </form>
            </div>
          </Card>
        );
    }
  };

  return renderCurrentSection();
};

export default CertificationForm;

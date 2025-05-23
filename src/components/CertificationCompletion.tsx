
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/sonner';
import { useAuth } from '@/components/AuthProvider';
import { supabase } from '@/integrations/supabase/client';

interface CertificationCompletionProps {
  onComplete: () => void;
  formData?: {
    traineeName: string;
    certificationType: string;
  };
}

const CertificationCompletion = ({ onComplete, formData }: CertificationCompletionProps) => {
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formDataValues = new FormData(form);
    
    // Get trainee signature from form or use formData if available
    const traineeName = formDataValues.get('traineeSignature')?.toString() || formData?.traineeName || '';
    const completionDate = formDataValues.get('traineeDate')?.toString() || new Date().toISOString().split('T')[0];
    const certificationType = formData?.certificationType || 'Seam Weld';
    
    try {
      // Send email notification
      const { error: emailError } = await supabase.functions.invoke('send-certification-email', {
        body: {
          traineeName: traineeName,
          traineeEmail: user?.email,
          certificationType: certificationType,
          completionDate: completionDate,
        },
      });

      if (emailError) throw emailError;

      toast.success('Certification completed successfully', {
        description: 'A confirmation email has been sent to your inbox.',
      });

      onComplete();
    } catch (error) {
      console.error('Error completing certification:', error);
      toast.error('Failed to complete certification', {
        description: 'Please try again or contact support if the issue persists.',
      });
    }
  };

  return (
    <Card className="p-6 w-full max-w-2xl mx-auto">
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-industrial-900">Certification Completion</h2>
          <p className="text-industrial-600">Submit to Training Specialist once completed</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="prodSupervisor">Prod. Supervisor Signature</Label>
              <Input id="prodSupervisor" name="prodSupervisor" required />
            </div>
            <div>
              <Label htmlFor="prodDate">Date</Label>
              <Input id="prodDate" name="prodDate" type="date" required />
            </div>
            <div>
              <Label htmlFor="traineeSignature">Trainee Signature</Label>
              <Input 
                id="traineeSignature" 
                name="traineeSignature" 
                required 
                defaultValue={formData?.traineeName || ''}
              />
            </div>
            <div>
              <Label htmlFor="traineeDate">Date</Label>
              <Input 
                id="traineeDate" 
                name="traineeDate" 
                type="date" 
                required 
                defaultValue={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="comments">Comments</Label>
            <Textarea
              id="comments"
              name="comments"
              placeholder="Enter any final comments here..."
              className="min-h-[100px]"
            />
          </div>

          <input 
            type="hidden" 
            name="certificationType" 
            value={formData?.certificationType || 'Seam Weld'} 
          />

          <Button type="submit" className="w-full">Complete Certification</Button>
        </form>
      </div>
    </Card>
  );
};

export default CertificationCompletion;

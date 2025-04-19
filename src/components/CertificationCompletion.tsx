
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface CertificationCompletionProps {
  onComplete: () => void;
}

const CertificationCompletion = ({ onComplete }: CertificationCompletionProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete();
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
              <Input id="prodSupervisor" required />
            </div>
            <div>
              <Label htmlFor="prodDate">Date</Label>
              <Input id="prodDate" type="date" required />
            </div>
            <div>
              <Label htmlFor="traineeSignature">Trainee Signature</Label>
              <Input id="traineeSignature" required />
            </div>
            <div>
              <Label htmlFor="traineeDate">Date</Label>
              <Input id="traineeDate" type="date" required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="comments">Comments</Label>
            <Textarea
              id="comments"
              placeholder="Enter any final comments here..."
              className="min-h-[100px]"
            />
          </div>

          <Button type="submit" className="w-full">Complete Certification</Button>
        </form>
      </div>
    </Card>
  );
};

export default CertificationCompletion;


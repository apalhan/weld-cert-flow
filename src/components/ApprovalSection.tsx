
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface ApprovalSectionProps {
  onComplete: () => void;
}

const ApprovalSection = ({ onComplete }: ApprovalSectionProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete();
  };

  return (
    <Card className="p-6 w-full max-w-2xl mx-auto">
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-industrial-900">Approval Section</h2>
          <p className="text-industrial-600">Complete approval requirements</p>
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
              <Label htmlFor="qaAnalyst">Approved by QA Mgr/Analyst</Label>
              <Input id="qaAnalyst" required />
            </div>
            <div>
              <Label htmlFor="qaDate">Date</Label>
              <Input id="qaDate" type="date" required />
            </div>
            <div>
              <Label htmlFor="employeeId">ID # assigned to this employee</Label>
              <Input id="employeeId" type="number" required />
            </div>
          </div>

          <Button type="submit" className="w-full">Continue to Certification Completion</Button>
        </form>
      </div>
    </Card>
  );
};

export default ApprovalSection;



import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface CertificationEvaluationProps {
  onComplete: () => void;
}

const CertificationEvaluation = ({ onComplete }: CertificationEvaluationProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete();
  };

  return (
    <Card className="p-6 w-full max-w-2xl mx-auto">
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-industrial-900">Certification Evaluation</h2>
          <p className="text-industrial-600">Complete the evaluation details</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="border p-4 rounded-lg space-y-4">
            <h3 className="text-lg font-semibold">Rate Evaluation (Production Supervisor)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="timePeriod">Time Period</Label>
                <Input id="timePeriod" required />
              </div>
              <div>
                <Label htmlFor="earnedHours">Earned Hours</Label>
                <Input id="earnedHours" type="number" step="0.1" required />
              </div>
              <div>
                <Label htmlFor="directHours">Direct Hours (40 hrs min.)</Label>
                <Input id="directHours" type="number" step="0.1" required />
              </div>
              <div>
                <Label htmlFor="efficiency">% Efficiency</Label>
                <Input id="efficiency" type="number" step="0.1" required />
              </div>
            </div>
          </div>

          <div className="border p-4 rounded-lg space-y-4">
            <h3 className="text-lg font-semibold">Quality Evaluation (QA Manager/Analyst)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="completedSections">Completed Sections</Label>
                <Input id="completedSections" type="number" required />
              </div>
              <div>
                <Label htmlFor="defects">Defects</Label>
                <Input id="defects" type="number" step="0.1" required />
              </div>
              <div>
                <Label htmlFor="passPercent">% Pass</Label>
                <Input id="passPercent" type="number" step="0.1" required />
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full">Continue to Approval</Button>
        </form>
      </div>
    </Card>
  );
};

export default CertificationEvaluation;


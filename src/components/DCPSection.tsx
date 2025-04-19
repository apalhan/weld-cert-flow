
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const DCP_CODES = [
  "DCP-1410",
  "DCP-1820",
  "DCP-1830",
  "DCP-5010",
  "DCP-8020",
  "DCP-9020",
  "DCP-9060"
];

interface DCPSectionProps {
  onComplete: () => void;
}

const DCPSection = ({ onComplete }: DCPSectionProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete();
  };

  return (
    <Card className="p-6 w-full max-w-2xl mx-auto">
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-industrial-900">DCP Acknowledgments</h2>
          <p className="text-industrial-600">Complete all DCP requirements</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {DCP_CODES.map((code, index) => (
            <div key={index} className="space-y-4 border p-4 rounded-lg">
              <Label>{code}</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor={`date-${index}`}>Date</Label>
                  <Input
                    id={`date-${index}`}
                    type="date"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor={`trainer-${index}`}>Trainer Initials</Label>
                  <Input
                    id={`trainer-${index}`}
                    maxLength={3}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor={`trainee-${index}`}>Trainee Initials</Label>
                  <Input
                    id={`trainee-${index}`}
                    maxLength={3}
                    required
                  />
                </div>
              </div>
            </div>
          ))}

          <Button type="submit" className="w-full">Continue to Certification Evaluation</Button>
        </form>
      </div>
    </Card>
  );
};

export default DCPSection;


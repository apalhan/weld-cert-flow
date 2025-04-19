
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from '@/components/ui/sonner';

const QUALITY_QUESTIONS = [
  "Does the trainee know the Company Quality Policy?",
  "Can the trainee read and interpret the SI1000?",
  "Can the trainee identify run-offs, end slips, bent offsets, twist, waviness?",
  "Can the trainee explain the cause for specific defects?",
  "Does the trainee understand how defects affect assembly?",
  "Does the trainee understand gauge control, calibration, etc.?",
  "Is the trainee able to accurately measure section squareness?",
  "Is the trainee able to measure resistance and know when to test?",
  "Is the trainee able to correctly use the go-no-go pin gauge?",
  "Can the trainee use the light box to see whiskers, weld spatter, etc.?",
  "Does the trainee understand non-conformance policies?"
];

interface QualitySectionProps {
  onComplete: () => void;
}

const QualitySection = ({ onComplete }: QualitySectionProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete();
    toast.success("Certification sections completed!", {
      description: "All sections have been completed successfully.",
    });
  };

  return (
    <Card className="p-6 w-full max-w-2xl mx-auto">
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-industrial-900">Quality Section</h2>
          <p className="text-industrial-600">Complete all quality requirements</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {QUALITY_QUESTIONS.map((question, index) => (
            <div key={index} className="space-y-4">
              <Label>{question}</Label>
              <RadioGroup defaultValue="pending" className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="pass" id={`pass-${index}`} />
                  <Label htmlFor={`pass-${index}`}>Pass</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="fail" id={`fail-${index}`} />
                  <Label htmlFor={`fail-${index}`}>Fail</Label>
                </div>
              </RadioGroup>
            </div>
          ))}

          <Button type="submit" className="w-full">Complete Certification</Button>
        </form>
      </div>
    </Card>
  );
};

export default QualitySection;

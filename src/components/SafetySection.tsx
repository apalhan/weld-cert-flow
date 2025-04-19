
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const SAFETY_QUESTIONS = [
  "Is the trainee aware of weight limitations, unsafe movements, etc.?",
  "Can the trainee locate and identify SDS?",
  "Is the trainee aware of the rules regarding cell phones?",
  "Trainee has & uses required personal protective equipment (PPE's)?",
  "Is the trainee aware of rules reguarding long hair?",
  "Is the trainee aware of rules regarding loose clothing?",
  "Is the trainee aware of rules regarding jewelry?",
  "Trainee is aware of the rules reguarding ear buds?",
  "Can the trainee Identify pinch points?",
  "Can the trainee identify required guards?",
  "Is the trainee aware of how to safely handle a section?",
  "Is the trainee aware to let a falling section fall and not try to stop it?",
  "Can the trainee identify E-Stops?",
  "Can the trainee Identify ON/OFF switches?",
  "Does the trainee demonstrate good ergonomic practices?",
  "Is the trainee aware of the need to stretch in order to help prevent injury?"
];

interface SafetySectionProps {
  onComplete: () => void;
}

const SafetySection = ({ onComplete }: SafetySectionProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete();
  };

  return (
    <Card className="p-6 w-full max-w-2xl mx-auto">
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-industrial-900">Safety Section</h2>
          <p className="text-industrial-600">Complete all safety requirements</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {SAFETY_QUESTIONS.map((question, index) => (
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

          <Button type="submit" className="w-full">Continue to Production</Button>
        </form>
      </div>
    </Card>
  );
};

export default SafetySection;

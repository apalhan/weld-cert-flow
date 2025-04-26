
import React from 'react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { PRODUCTION_QUESTIONS } from './production-questions';

export const ProductionQuestions = () => {
  return (
    <>
      {PRODUCTION_QUESTIONS.map((question, index) => (
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
    </>
  );
};

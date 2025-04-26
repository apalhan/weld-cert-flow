
import React from 'react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { PRODUCTION_QUESTIONS } from './production-questions';
import { Separator } from '@/components/ui/separator';

export const ProductionQuestions = () => {
  return (
    <>
      {Object.entries(PRODUCTION_QUESTIONS).map(([section, { title, questions }]) => (
        <div key={section} className="space-y-4 mb-8">
          <div className="space-y-2">
            <h3 className="font-bold text-lg underline">{title}</h3>
            <Separator className="my-2" />
          </div>
          
          {questions.map((question, index) => (
            <div key={index} className="space-y-4">
              <Label>{question}</Label>
              <RadioGroup defaultValue="pending" className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="pass" id={`${section}-pass-${index}`} />
                  <Label htmlFor={`${section}-pass-${index}`}>Pass</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="fail" id={`${section}-fail-${index}`} />
                  <Label htmlFor={`${section}-fail-${index}`}>Fail</Label>
                </div>
              </RadioGroup>
            </div>
          ))}
        </div>
      ))}
    </>
  );
};

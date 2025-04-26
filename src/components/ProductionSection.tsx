
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './AuthProvider';

const PRODUCTION_QUESTIONS = [
  "Does the trainee understand the purpose of the operation?",
  "Does the trainee understand the purpose of Shoptrak?",
  "Can the trainee sign in/out of Shoptrak?",
  "Can the trainee sign in/out of Jobs?",
  "Does the trainee understand various indirect codes?",
  "Does the trainee know how to calculate/check performance?",
  "Does the trainee know how to record scrap?",
  "Can trainee find/locate, open and identify elements of Drawing /Process Sheets?",
  "Can trainee read and interpret bills of material on prints?",
  "Can trainee read, interpret and locate dimensions, tolerances, notes, etc.?",
  "When starting a new section, is the trainee starting on their right?",
  "Are motions fluid and without hesitation?",
  "Does trainee avoid double handling of parts?",
  "Can the trainee complete all required documentation legibly?"
];

interface ProductionSectionProps {
  onComplete: () => void;
}

const ProductionSection = ({ onComplete }: ProductionSectionProps) => {
  const { user } = useAuth();
  const [hasWatchedVideos, setHasWatchedVideos] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (user) {
      const { error } = await supabase
        .from('certification_surveys')
        .update({ viewed_grinding_videos: hasWatchedVideos })
        .eq('user_id', user.id);

      if (error) {
        console.error('Error updating grinding videos status:', error);
      }
    }
    
    onComplete();
  };

  return (
    <Card className="p-6 w-full max-w-2xl mx-auto">
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-industrial-900">Production Section</h2>
          <p className="text-industrial-600">Complete all production requirements</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
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

          <div className="space-y-4 border-t pt-4">
            <div className="flex items-start space-x-3">
              <Checkbox 
                id="watchedVideos" 
                checked={hasWatchedVideos}
                onCheckedChange={(checked) => setHasWatchedVideos(checked as boolean)}
              />
              <div className="space-y-1">
                <Label htmlFor="watchedVideos" className="text-base">
                  Has the trainee viewed grinding videos?
                </Label>
                <p className="text-sm text-muted-foreground">
                  Located at: S Drive>West Lafayette>Training>Public>Training Videos
                </p>
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full">Continue to Quality</Button>
        </form>
      </div>
    </Card>
  );
};

export default ProductionSection;

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from '@/components/ui/sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './AuthProvider';

const QUALITY_QUESTIONS = {
  qualityRequirements: {
    title: "Understanding of quality requirements",
    questions: [
      "Does the trainee know the Company Quality Policy?",
      "Can the trainee read and interpret the quality standards?",
      "Can the trainee identify run-offs, end slips, bent offsets, twist, waviness?",
      "Can the trainee explain the cause for specific defects?",
      "Does the trainee understand how defects affect assembly?",
      "Does the trainee understand gauge control, calibration, etc.?",
      "Is the trainee able to accurately measure section squareness?",
      "Is the trainee able to measure resistance and know when to test?",
      "Is the trainee able to correctly use the go-no-go pin gauge?",
      "Can the trainee use the light box to see whiskers, weld spatter, etc.?",
      "Does the trainee understand non-conformance policies?"
    ]
  }
};

interface QualitySectionProps {
  onComplete: () => void;
}

const QualitySection = ({ onComplete }: QualitySectionProps) => {
  const { user } = useAuth();
  const [hasViewedGrindingVideos, setHasViewedGrindingVideos] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (user) {
      const { error } = await supabase
        .from('certification_surveys')
        .update({ 
          viewed_grinding_videos: hasViewedGrindingVideos 
        })
        .eq('user_id', user.id);

      if (error) {
        console.error('Error updating training materials status:', error);
      }
    }
    
    onComplete();
    toast.success("Quality section completed!", {
      description: "All quality requirements have been completed successfully.",
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
          {Object.entries(QUALITY_QUESTIONS).map(([section, { title, questions }]) => (
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

          <div className="space-y-4 border-t pt-4">
            <div className="flex items-start space-x-3">
              <Checkbox 
                id="viewedGrindingVideos"
                checked={hasViewedGrindingVideos}
                onCheckedChange={(checked) => setHasViewedGrindingVideos(checked as boolean)}
              />
              <div className="space-y-1">
                <Label htmlFor="viewedGrindingVideos" className="text-base">
                  Has trainee viewed "Grinding Booth Method 1 & 2" videos?
                </Label>
                <p className="text-sm text-muted-foreground">
                  Located at: S Drive {">"} West Lafayette {">"} Training {">"} Public {">"} Training Videos
                </p>
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full">Complete Certification</Button>
        </form>
      </div>
    </Card>
  );
};

export default QualitySection;

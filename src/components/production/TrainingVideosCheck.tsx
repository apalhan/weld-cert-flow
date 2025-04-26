
import React from 'react';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

export const TrainingVideosCheck = () => {
  return (
    <div className="space-y-4 border-t pt-4">
      <div className="flex items-start space-x-3">
        <Checkbox id="viewedGrindingVideos" />
        <div className="space-y-1">
          <Label htmlFor="viewedGrindingVideos" className="text-base">
            Has trainee viewed "Grinding Booth Method 1 & 2" videos?
          </Label>
          <p className="text-sm text-muted-foreground">
            Located at: S Drive{">"} West Lafayette{">"} Training{">"} Public{">"} Training Videos
          </p>
        </div>
      </div>
    </div>
  );
};

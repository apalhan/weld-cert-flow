
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ProductionQuestions } from './production/ProductionQuestions';
import { TrainingVideosCheck } from './production/TrainingVideosCheck';

interface ProductionSectionProps {
  onComplete: () => void;
}

const ProductionSection = ({ onComplete }: ProductionSectionProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
          <ProductionQuestions />
          <TrainingVideosCheck />
          <Button type="submit" className="w-full">Continue to Quality</Button>
        </form>
      </div>
    </Card>
  );
};

export default ProductionSection;

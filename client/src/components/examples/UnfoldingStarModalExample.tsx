import { useState } from 'react';
import UnfoldingStarModal from '../UnfoldingStarModal';
import { Button } from '@/components/ui/button';

export default function UnfoldingStarModalExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <Button onClick={() => setIsOpen(true)} data-testid="button-open-modal">
        Open Star Unfold Animation
      </Button>
      <p className="text-sm text-muted-foreground">
        Click to see the magical unfolding animation
      </p>
      <UnfoldingStarModal
        isOpen={isOpen}
        color="#FF69B4"
        message="You are a beautiful soul, full of light and love. Never forget how special you are!"
        onComplete={() => setIsOpen(false)}
      />
    </div>
  );
}

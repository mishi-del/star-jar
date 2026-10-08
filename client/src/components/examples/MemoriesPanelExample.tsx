import { useState } from 'react';
import MemoriesPanel from '../MemoriesPanel';

const mockMemories = [
  {
    id: '1',
    color: '#FF6B6B',
    message: 'You are stronger than you think',
    openedAt: new Date()
  },
  {
    id: '2',
    color: '#4ECDC4',
    message: 'Today is going to be amazing',
    openedAt: new Date(Date.now() - 60000)
  },
  {
    id: '3',
    color: '#FFD93D',
    message: 'Your smile lights up the room',
    openedAt: new Date(Date.now() - 120000)
  }
];

export default function MemoriesPanelExample() {
  const [selectedMemory, setSelectedMemory] = useState<string | null>(null);

  return (
    <div className="relative w-full h-96 bg-muted/20 rounded-md overflow-hidden">
      <div className="p-4">
        <p className="text-muted-foreground">
          {selectedMemory 
            ? `Selected memory: ${selectedMemory}` 
            : 'Click the panel on the right to expand'}
        </p>
      </div>
      <MemoriesPanel 
        memories={mockMemories}
        onSelectMemory={(memory) => setSelectedMemory(memory.id)}
      />
    </div>
  );
}

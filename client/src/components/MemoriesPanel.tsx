import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Book, ChevronRight, ChevronLeft, Star } from 'lucide-react';

interface Memory {
  id: string;
  color: string;
  message: string;
  openedAt: Date;
}

interface MemoriesPanelProps {
  memories: Memory[];
  onSelectMemory: (memory: Memory) => void;
}

export default function MemoriesPanel({ memories, onSelectMemory }: MemoriesPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const lightenColor = (hex: string, percent: number) => {
    const num = parseInt(hex.slice(1), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.min(255, (num >> 16) + amt);
    const G = Math.min(255, ((num >> 8) & 0x00FF) + amt);
    const B = Math.min(255, (num & 0x0000FF) + amt);
    return `rgb(${R}, ${G}, ${B})`;
  };

  return (
    <div
      className="fixed right-0 top-1/2 -translate-y-1/2 z-40 transition-transform duration-300"
      style={{
        transform: `translateY(-50%) translateX(${isExpanded ? '0' : 'calc(100% - 48px)'})`
      }}
    >
      <Card className="flex overflow-hidden border-l border-t border-b rounded-l-lg rounded-r-none">
        <Button
          variant="ghost"
          size="icon"
          className="h-auto py-8 rounded-none border-r flex-shrink-0"
          onClick={() => setIsExpanded(!isExpanded)}
          data-testid="button-toggle-memories"
        >
          <div className="flex flex-col items-center gap-2">
            {isExpanded ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            <Book className="h-5 w-5" />
            <span className="text-xs font-medium writing-mode-vertical" style={{ writingMode: 'vertical-rl' }}>
              Memories ({memories.length})
            </span>
          </div>
        </Button>

        <div className="w-72 bg-card">
          <div className="p-4 border-b">
            <h3 className="font-semibold flex items-center gap-2">
              <Star className="h-4 w-4 text-primary" />
              Opened Stars
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              {memories.length} {memories.length === 1 ? 'message' : 'messages'} revealed
            </p>
          </div>

          <ScrollArea className="h-96">
            {memories.length === 0 ? (
              <div className="p-6 text-center text-muted-foreground">
                <Star className="h-12 w-12 mx-auto mb-3 opacity-30" />
                <p className="text-sm">No stars opened yet</p>
                <p className="text-xs mt-1">Drag a star out of the jar to reveal its message</p>
              </div>
            ) : (
              <div className="p-3 space-y-2">
                {memories.map((memory) => (
                  <button
                    key={memory.id}
                    onClick={() => onSelectMemory(memory)}
                    className="w-full text-left rounded-md p-3 transition-colors hover-elevate"
                    style={{
                      background: `linear-gradient(135deg, ${lightenColor(memory.color, 40)} 0%, ${lightenColor(memory.color, 30)} 100%)`
                    }}
                    data-testid={`memory-${memory.id}`}
                  >
                    <p
                      className="text-sm line-clamp-2"
                      style={{
                        fontFamily: "'Architects Daughter', cursive",
                        color: 'rgba(60, 40, 30, 0.9)'
                      }}
                    >
                      {memory.message}
                    </p>
                    <p className="text-xs mt-2 opacity-60">
                      {memory.openedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </button>
                ))}
              </div>
            )}
          </ScrollArea>
        </div>
      </Card>
    </div>
  );
}

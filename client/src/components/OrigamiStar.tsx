import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';

interface OrigamiStarProps {
  id: string;
  color: string;
  x: number;
  y: number;
  size: number;
  rotation: number;
  message: string;
  onDragOut: (id: string) => void;
  onDragStart?: () => void;
  jarBounds: { left: number; right: number; top: number; bottom: number } | null;
}

const starColors = [
  '#FF6B6B', '#FF8E72', '#FFB347', '#FFD93D', '#6BCB77',
  '#4ECDC4', '#45B7D1', '#96CEB4', '#DDA0DD', '#FF69B4',
  '#BA68C8', '#9575CD', '#7986CB', '#64B5F6', '#4FC3F7',
  '#4DD0E1', '#4DB6AC', '#81C784', '#AED581', '#DCE775',
  '#FFF176', '#FFD54F', '#FFB74D', '#FF8A65', '#A1887F'
];

export function getRandomStarColor() {
  return starColors[Math.floor(Math.random() * starColors.length)];
}

export default function OrigamiStar({ 
  id, 
  color, 
  x, 
  y, 
  size, 
  rotation, 
  message, 
  onDragOut,
  onDragStart,
  jarBounds 
}: OrigamiStarProps) {
  const starRef = useRef<SVGSVGElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x, y });
  const [wiggle, setWiggle] = useState({ x: 0, y: 0, rotation: 0 });
  const dragStart = useRef({ x: 0, y: 0, startX: 0, startY: 0 });

  useEffect(() => {
    const wiggleAnimation = () => {
      const duration = 2 + Math.random() * 2;
      gsap.to(wiggle, {
        x: (Math.random() - 0.5) * 4,
        y: (Math.random() - 0.5) * 3,
        rotation: (Math.random() - 0.5) * 5,
        duration,
        ease: 'sine.inOut',
        onUpdate: () => setWiggle({ ...wiggle }),
        onComplete: wiggleAnimation
      });
    };
    
    const timeout = setTimeout(wiggleAnimation, Math.random() * 2000);
    return () => clearTimeout(timeout);
  }, []);

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);
    onDragStart?.();
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    dragStart.current = {
      x: clientX,
      y: clientY,
      startX: position.x,
      startY: position.y
    };

    if (starRef.current) {
      gsap.to(starRef.current, {
        scale: 1.2,
        duration: 0.2,
        ease: 'back.out(1.7)'
      });
    }
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      
      const deltaX = clientX - dragStart.current.x;
      const deltaY = clientY - dragStart.current.y;
      
      setPosition({
        x: dragStart.current.startX + deltaX,
        y: dragStart.current.startY + deltaY
      });
    };

    const handleEnd = () => {
      setIsDragging(false);
      
      if (starRef.current) {
        gsap.to(starRef.current, {
          scale: 1,
          duration: 0.2
        });
      }

      if (jarBounds) {
        const isOutsideJar = 
          position.x < jarBounds.left - 20 ||
          position.x > jarBounds.right + 20 ||
          position.y < jarBounds.top - 40 ||
          position.y > jarBounds.bottom + 20;
        
        if (isOutsideJar) {
          onDragOut(id);
        } else {
          gsap.to(position, {
            x,
            y,
            duration: 0.5,
            ease: 'elastic.out(1, 0.5)',
            onUpdate: () => setPosition({ ...position })
          });
        }
      }
    };

    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleEnd);
    document.addEventListener('touchmove', handleMove);
    document.addEventListener('touchend', handleEnd);

    return () => {
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handleEnd);
      document.removeEventListener('touchmove', handleMove);
      document.removeEventListener('touchend', handleEnd);
    };
  }, [isDragging, position, jarBounds, id, onDragOut, x, y]);

  const darkenColor = (hex: string, percent: number) => {
    const num = parseInt(hex.slice(1), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.max(0, (num >> 16) - amt);
    const G = Math.max(0, ((num >> 8) & 0x00FF) - amt);
    const B = Math.max(0, (num & 0x0000FF) - amt);
    return `rgb(${R}, ${G}, ${B})`;
  };

  return (
    <svg
      ref={starRef}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      style={{
        position: 'absolute',
        left: position.x + wiggle.x,
        top: position.y + wiggle.y,
        transform: `rotate(${rotation + wiggle.rotation}deg)`,
        cursor: isDragging ? 'grabbing' : 'grab',
        zIndex: isDragging ? 100 : 10,
        filter: isDragging ? 'drop-shadow(0 8px 12px rgba(0,0,0,0.3))' : 'drop-shadow(0 2px 4px rgba(0,0,0,0.15))',
        transition: 'filter 0.2s ease'
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleMouseDown}
      data-testid={`star-${id}`}
    >
      <polygon
        points="50,5 61,35 95,35 68,57 79,91 50,70 21,91 32,57 5,35 39,35"
        fill={color}
        stroke={darkenColor(color, 15)}
        strokeWidth="2"
      />
      <polygon
        points="50,15 58,35 80,35 62,48 70,72 50,58 30,72 38,48 20,35 42,35"
        fill={darkenColor(color, 8)}
        opacity="0.4"
      />
      <line
        x1="50" y1="5" x2="50" y2="70"
        stroke={darkenColor(color, 20)}
        strokeWidth="0.5"
        opacity="0.3"
      />
      <line
        x1="21" y1="91" x2="79" y2="91"
        stroke={darkenColor(color, 20)}
        strokeWidth="0.5"
        opacity="0.2"
      />
    </svg>
  );
}

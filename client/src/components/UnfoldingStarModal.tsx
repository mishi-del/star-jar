import { useRef, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';

interface UnfoldingStarModalProps {
  isOpen: boolean;
  color: string;
  message: string;
  onComplete: () => void;
}

export default function UnfoldingStarModal({
  isOpen,
  color,
  message,
  onComplete
}: UnfoldingStarModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const paperRef = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLParagraphElement>(null);
  const closingRef = useRef(false);

  useEffect(() => {
    if (!isOpen) {
      closingRef.current = false;
      return;
    }

    closingRef.current = false;

    const tl = gsap.timeline();

    tl.fromTo(modalRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.15, ease: 'power2.out' }
    );

    tl.fromTo(paperRef.current,
      { scale: 0.4, rotateX: 60, opacity: 0 },
      { scale: 1, rotateX: 0, opacity: 1, duration: 0.28, ease: 'back.out(2)' }
    );

    tl.fromTo(messageRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.18, ease: 'power2.out' }
    );

    return () => { tl.kill(); };
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (closingRef.current) return;
    closingRef.current = true;

    gsap.timeline({ onComplete })
      .to(paperRef.current, {
        scale: 0.8,
        opacity: 0,
        y: -20,
        duration: 0.18,
        ease: 'power2.in'
      })
      .to(modalRef.current, {
        opacity: 0,
        duration: 0.1
      });
  }, [onComplete]);

  if (!isOpen) return null;

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
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center cursor-pointer"
      style={{
        backgroundColor: 'rgba(40, 20, 5, 0.55)',
        backdropFilter: 'blur(6px)'
      }}
      onClick={handleClose}
      data-testid="unfold-modal"
    >
      <div style={{ perspective: '800px' }}>
        <div
          ref={paperRef}
          style={{
            width: 'min(340px, 88vw)',
            minHeight: '160px',
            background: `linear-gradient(145deg, ${lightenColor(color, 32)} 0%, ${lightenColor(color, 18)} 100%)`,
            borderRadius: '12px',
            boxShadow: `0 24px 60px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.25) inset`,
            transformStyle: 'preserve-3d',
            position: 'relative',
            overflow: 'hidden'
          }}
          data-testid="unfolded-paper"
        >
          {/* lined paper texture */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `repeating-linear-gradient(
                0deg,
                transparent,
                transparent 28px,
                rgba(0,0,0,0.04) 28px,
                rgba(0,0,0,0.04) 29px
              )`,
              borderRadius: '12px'
            }}
          />

          {/* fold crease line */}
          <div className="absolute inset-x-0 top-1/2 pointer-events-none" style={{
            height: '1px',
            background: 'rgba(0,0,0,0.06)'
          }} />

          {/* message */}
          <div className="flex items-center justify-center p-8" style={{ minHeight: '160px' }}>
            <p
              ref={messageRef}
              className="text-center"
              style={{
                fontFamily: "'Architects Daughter', cursive",
                fontSize: 'clamp(1.15rem, 4vw, 1.45rem)',
                color: 'rgba(50, 28, 10, 0.92)',
                lineHeight: 1.6,
                textShadow: '0 1px 0 rgba(255,255,255,0.45)'
              }}
              data-testid="star-message"
            >
              {message}
            </p>
          </div>

          {/* tap to close hint */}
          <div className="absolute bottom-3 right-4">
            <span style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: '0.65rem',
              color: 'rgba(80,40,10,0.45)',
              letterSpacing: '0.05em'
            }}>
              tap anywhere to close
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

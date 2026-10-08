import { useEffect } from 'react';
import { X } from 'lucide-react';

interface PhotoLightboxProps {
  src: string | null;
  onClose: () => void;
}

export default function PhotoLightbox({ src, onClose }: PhotoLightboxProps) {
  useEffect(() => {
    if (!src) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [src, onClose]);

  if (!src) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{ background: 'rgba(20, 10, 5, 0.88)', backdropFilter: 'blur(10px)' }}
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-5 right-5 text-white/70 hover:text-white transition-colors"
        style={{ zIndex: 201 }}
      >
        <X size={32} />
      </button>

      <img
        src={src}
        alt="memory"
        onClick={e => e.stopPropagation()}
        style={{
          maxWidth: 'min(90vw, 520px)',
          maxHeight: '88vh',
          objectFit: 'contain',
          borderRadius: '12px',
          boxShadow: '0 30px 80px rgba(0,0,0,0.6)',
          border: '3px solid rgba(255,240,200,0.2)',
        }}
      />
    </div>
  );
}

import { useState, useRef, useEffect, useCallback } from 'react';
import GlassJar, { JarRef } from './GlassJar';
import OrigamiStar, { getRandomStarColor } from './OrigamiStar';
import UnfoldingStarModal from './UnfoldingStarModal';
import MemoriesPanel from './MemoriesPanel';
import Sparkles from './Sparkles';
import PhotoBackground from './PhotoBackground';
import PhotoLightbox from './PhotoLightbox';
import { Button } from '@/components/ui/button';
import { RefreshCw, Volume2, VolumeX } from 'lucide-react';
import { useSoundEffects } from '@/hooks/useSoundEffects';

interface Star {
  id: string;
  color: string;
  x: number;
  y: number;
  size: number;
  rotation: number;
  message: string;
}

interface Memory {
  id: string;
  color: string;
  message: string;
  openedAt: Date;
}

const messages = [
  "i love you so much.",
  "you're literally the cutest person ever.",
  "i miss you already.",
  "stop being so adorable.",
  "i'm so lucky i found you.",
  "you're my favorite human.",
  "you deserve flowers every day.",
  "i'm always on your team.",
  "i'm so proud of you.",
  "you're going to be the best CA ever.",
  "you make my life prettier.",
  "thanks for existing.",
  "you're my comfort person.",
  "if you're smiling right now, keep doing it.",
  "i hope today is kind to you.",
  "you deserve the biggest hug.",
  "i wish i could annoy you right now.",
  "don't forget to eat.",
  "i'm sending you a forehead kiss.",
  "you're my happy place.",
  "future CA looking cute as always.",
  "i believe in you more than you know.",
  "one day i'll say, 'yeah, that's my CA.'",
  "you're going to make everyone proud.",
  "especially yourself.",
  "don't stress too much.",
  "i'm already celebrating your success.",
  "keep going, okay?",
  "you're closer than yesterday.",
  "you've got this.",
  "you're prettier than every sunset.",
  "don't let anyone tell you otherwise.",
  "your smile heals people.",
  "especially mine.",
  "you have the sweetest heart.",
  "i'm obsessed with our friendship.",
  "life gave me the best bestie.",
  "that's you.",
  "hi cutie.",
  "i love you more than fries.",
  "don't overthink.",
  "come here 🫂",
  "breathe.",
  "everything will be okay.",
  "you're never alone.",
  "i'm always here.",
  "even at 3am.",
  "especially at 3am.",
  "i hope you sleep well tonight.",
  "sweet dreams, sunshine.",
  "your laugh is my favorite sound.",
  "you're ridiculously lovable.",
  "you deserve everything good.",
  "thank you for choosing me.",
  "i'd choose you every time.",
  "forever.",
  "pinky promise?",
  "don't break it.",
  "i trust you.",
  "you're home to me.",
  "i hope you become everything you've ever dreamed of.",
  "and more.",
  "because you deserve it.",
  "i know you'll do amazing.",
  "future CA energy ✨",
  "imagine your office.",
  "imagine your name with 'CA.'",
  "i already can.",
  "you'll get there.",
  "i'll clap the loudest.",
  "smile.",
  "there it is.",
  "so pretty.",
  "you're glowing.",
  "don't compare yourself.",
  "you're enough.",
  "always have been.",
  "always will be.",
  "don't forget that.",
  "ever.",
  "you're my favorite notification.",
  "text me soon.",
  "i miss our random conversations.",
  "let's go on an adventure.",
  "let's make more memories.",
  "let's take more pictures.",
  "let's laugh until our stomach hurts.",
  "forever sounds nice.",
  "you're stuck with me.",
  "sorry not sorry.",
  "you're my safe place.",
  "i hope i'm yours too.",
  "thank you for every memory.",
  "thank you for every laugh.",
  "thank you for staying.",
  "i appreciate you more than words.",
  "happy birthday, my favorite person.",
  "i love you endlessly.",
  "you're my person.",
  "no matter where life takes us, i'll always be cheering for you. 🤍",
  "if you ever forget how amazing you are, i'll remind you.",
  "you're so pretty it's actually rude.",
  "i'm so glad the universe let us meet.",
  "you're my favorite 'what if we...'",
  "i hope you know how deeply you're loved.",
  "you're worth celebrating every single day.",
  "i still can't believe i got this lucky.",
  "every version of you is lovable.",
  "if i had to choose a best friend again, it'd still be you.",
  "i hope one day you see yourself the way i see you.",
  "i love the way you laugh.",
  "i love listening to you talk.",
  "i love your little habits.",
  "i'm proud of the person you're becoming.",
  "my future favorite CA. 💼🤍",
  "if i could wrap our friendship as a gift, i'd never stop unwrapping it.",
  "thank you for making life feel lighter.",
  "i hope this tiny star made you smile.",
  "you deserve soft days and happy hearts.",
  "i love you... like, a lot. 💗"
];

function generateStars(count: number): Star[] {
  const stars: Star[] = [];
  const shuffledMessages = [...messages].sort(() => Math.random() - 0.5);
  for (let i = 0; i < count; i++) {
    const size = 24 + Math.random() * 14;
    const row = Math.floor(i / 8);
    const col = i % 8;
    stars.push({
      id: `star-${i}`,
      color: getRandomStarColor(),
      x: 15 + (col * 25) + (Math.random() - 0.5) * 14,
      y: 15 + (row * 22) + (Math.random() - 0.5) * 10,
      size,
      rotation: Math.random() * 360,
      message: shuffledMessages[i % shuffledMessages.length]
    });
  }
  return stars;
}

export default function StarJarExperience() {
  const [stars, setStars] = useState<Star[]>(() => generateStars(100));
  const [memories, setMemories] = useState<Memory[]>([]);
  const [selectedStar, setSelectedStar] = useState<Star | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const jarRef = useRef<JarRef>(null);
  const [jarBounds, setJarBounds] = useState<{ left: number; right: number; top: number; bottom: number } | null>(null);
  const { playUnfold, playPickup } = useSoundEffects(soundEnabled);

  useEffect(() => {
    const updateBounds = () => {
      if (jarRef.current) setJarBounds(jarRef.current.getBounds());
    };
    updateBounds();
    window.addEventListener('resize', updateBounds);
    return () => window.removeEventListener('resize', updateBounds);
  }, []);

  const handleStarDragOut = useCallback((id: string) => {
    const star = stars.find(s => s.id === id);
    if (!star) return;
    playUnfold();
    setSelectedStar(star);
    setShowModal(true);
    setStars(prev => prev.filter(s => s.id !== id));
  }, [stars, playUnfold]);

  const handleModalComplete = useCallback(() => {
    if (selectedStar) {
      setMemories(prev => [...prev, {
        id: selectedStar.id,
        color: selectedStar.color,
        message: selectedStar.message,
        openedAt: new Date()
      }]);
    }
    setShowModal(false);
    setSelectedStar(null);
  }, [selectedStar]);

  const handleSelectMemory = useCallback((memory: Memory) => {
    setSelectedStar({ id: memory.id, color: memory.color, message: memory.message, x: 0, y: 0, size: 0, rotation: 0 });
    setShowModal(true);
  }, []);

  const handleReset = useCallback(() => {
    setStars(generateStars(100));
    setMemories([]);
  }, []);

  return (
    <div className="min-h-screen w-full relative overflow-hidden flex flex-col items-center justify-center">

      {/* ── PHOTO BACKGROUND MOSAIC ── */}
      <PhotoBackground onPhotoClick={setLightboxSrc} />

      <Sparkles />

      {/* ── CONTROLS ── */}
      <div className="absolute top-4 left-4 flex items-center gap-2 z-30">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setSoundEnabled(!soundEnabled)}
          data-testid="button-toggle-sound"
          style={{ background: 'rgba(255,248,235,0.85)', borderColor: 'rgba(180,130,50,0.35)', backdropFilter: 'blur(8px)' }}
        >
          {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={handleReset}
          data-testid="button-reset"
          style={{ background: 'rgba(255,248,235,0.85)', borderColor: 'rgba(180,130,50,0.35)', backdropFilter: 'blur(8px)' }}
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>

      {/* ── CENTER GLASS CARD ── */}
      <div
        className="relative z-10 flex flex-col items-center py-8 px-6 mx-4"
        style={{
          background: 'rgba(255, 248, 232, 0.72)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          borderRadius: '28px',
          border: '1.5px solid rgba(255, 230, 170, 0.6)',
          boxShadow: '0 8px 40px rgba(160, 100, 30, 0.18), 0 2px 8px rgba(0,0,0,0.08)',
          maxWidth: '400px',
          width: '100%',
        }}
      >
        {/* Header */}
        <p style={{
          fontFamily: "'Architects Daughter', cursive",
          fontSize: '0.78rem',
          color: 'rgba(160,100,30,0.75)',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          marginBottom: '4px'
        }}>
          ✦ a little something for you ✦
        </p>

        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2rem, 6vw, 2.8rem)',
            fontWeight: 700,
            color: 'hsl(28 55% 20%)',
            lineHeight: 1.1,
            letterSpacing: '-0.01em',
            marginBottom: '4px',
            textAlign: 'center'
          }}
        >
          Lucky Star Jar
        </h1>

        <p style={{
          fontFamily: "'Architects Daughter', cursive",
          fontSize: '0.88rem',
          color: 'rgba(140,90,30,0.72)',
          marginBottom: '18px',
          textAlign: 'center'
        }}>
          drag a star out to unfold its note 🌟
        </p>

        {/* Jar */}
        <GlassJar ref={jarRef} width={290} height={390}>
          {stars.map(star => (
            <OrigamiStar
              key={star.id}
              {...star}
              onDragOut={handleStarDragOut}
              onDragStart={playPickup}
              jarBounds={jarBounds}
            />
          ))}
        </GlassJar>

        {/* Stars count */}
        <div className="mt-4">
          <p style={{
            fontFamily: "'Architects Daughter', cursive",
            fontSize: '0.82rem',
            color: 'rgba(130,85,20,0.75)',
            textAlign: 'center'
          }}>
            {stars.length} little stars still waiting ✨
          </p>
        </div>
      </div>

      {/* hint for background photos */}
      <div className="absolute bottom-4 left-0 right-0 text-center z-10 pointer-events-none">
        <p style={{
          fontFamily: "'Architects Daughter', cursive",
          fontSize: '0.72rem',
          color: 'rgba(120,70,20,0.55)',
          letterSpacing: '0.05em'
        }}>
          tap any photo in the background to open it 📷
        </p>
      </div>

      <MemoriesPanel memories={memories} onSelectMemory={handleSelectMemory} />

      <UnfoldingStarModal
        isOpen={showModal}
        color={selectedStar?.color || '#FF6B6B'}
        message={selectedStar?.message || ''}
        onComplete={handleModalComplete}
      />

      {/* ── PHOTO LIGHTBOX ── */}
      <PhotoLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
    </div>
  );
}

import { useRef, useCallback, useEffect } from 'react';
import { Howl } from 'howler';

export function useSoundEffects(enabled: boolean) {
  const pickupSoundRef = useRef<Howl | null>(null);
  const unfoldSoundRef = useRef<Howl | null>(null);
  const dropSoundRef = useRef<Howl | null>(null);

  useEffect(() => {
    pickupSoundRef.current = new Howl({
      src: ['data:audio/wav;base64,UklGRl9vT19LQVZFZm10IBAAAAABAAEA' +
            'VHQAAFx0AAACABAAZGFOYQAAAAAIAAgAGBgYGCgoKDg4OD' +
            'g4ODgoKCgYGBg='],
      volume: 0.3,
      rate: 1.5
    });

    unfoldSoundRef.current = new Howl({
      src: ['data:audio/wav;base64,UklGRl9vT19LQVZFZm10IBAAAAABAAEA' +
            'VHQAAFx0AAACABAAZGFOYQAAAAAYGBgoKCg4ODhISEhYWF' +
            'hYWFhISEg4ODgoKCgYGBg='],
      volume: 0.4,
      rate: 1.0
    });

    dropSoundRef.current = new Howl({
      src: ['data:audio/wav;base64,UklGRl9vT19LQVZFZm10IBAAAAABAAEA' +
            'VHQAAFx0AAACABAAZGFOYQAAAABISEg4ODgoKCgYGBgICAg='],
      volume: 0.2,
      rate: 1.2
    });

    return () => {
      pickupSoundRef.current?.unload();
      unfoldSoundRef.current?.unload();
      dropSoundRef.current?.unload();
    };
  }, []);

  const playPickup = useCallback(() => {
    if (enabled && pickupSoundRef.current) {
      pickupSoundRef.current.play();
    }
  }, [enabled]);

  const playUnfold = useCallback(() => {
    if (enabled && unfoldSoundRef.current) {
      unfoldSoundRef.current.play();
    }
  }, [enabled]);

  const playDrop = useCallback(() => {
    if (enabled && dropSoundRef.current) {
      dropSoundRef.current.play();
    }
  }, [enabled]);

  return { playPickup, playUnfold, playDrop };
}

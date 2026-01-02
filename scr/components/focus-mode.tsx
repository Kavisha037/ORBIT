'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw, X } from 'lucide-react';

interface FocusModeProps {
  onClose: () => void;
}

export default function FocusMode({ onClose }: FocusModeProps) {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch(error => {
        // Autoplay was prevented, which is common in browsers.
        // User interaction is often required to play audio.
        console.info('Focus mode sound was blocked by the browser:', error);
      });
    }

    let interval: NodeJS.Timeout | null = null;
    if (isActive) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    } else if (!isActive && time !== 0) {
      clearInterval(interval!);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isActive]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getSeconds = `0${seconds % 60}`.slice(-2);
    return `${getMinutes}:${getSeconds}`;
  };

  const handleStartPause = () => {
    setIsActive(!isActive);
  };

  const handleReset = () => {
    setIsActive(false);
    setTime(0);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-sm">
      <audio ref={audioRef} src="https://actions.google.com/sounds/v1/notifications/card_dismiss.ogg" preload="auto" />
      <Button variant="ghost" size="icon" className="absolute top-4 right-4 text-foreground/70 hover:text-foreground" onClick={onClose}>
        <X className="h-8 w-8" />
      </Button>
      <div className="relative flex items-center justify-center w-[350px] h-[350px] md:w-[450px] md:h-[450px]">
        <svg className="absolute w-full h-full" viewBox="0 0 100 100">
            <circle className="text-gray-200/50 dark:text-gray-800/50" strokeWidth="2" stroke="currentColor" fill="transparent" r="48" cx="50" cy="50" />
            <circle
                className="text-primary"
                strokeWidth="2"
                strokeDasharray={2 * Math.PI * 48}
                strokeDashoffset={0}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r="48"
                cx="50"
                cy="50"
                style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
            />
        </svg>
        <div className="relative z-10 flex flex-col items-center justify-center">
          <div 
            className="text-7xl md:text-8xl font-bold font-mono text-foreground"
          >
            {formatTime(time)}
          </div>
          <div className="mt-8 flex justify-center gap-4">
            <Button size="lg" variant="ghost" className="text-foreground/70 hover:text-foreground hover:bg-white/10" onClick={handleStartPause}>
              {isActive ? <Pause className="mr-2" /> : <Play className="mr-2" />}
              {isActive ? 'Pause' : 'Start'}
            </Button>
            <Button size="lg" variant="ghost" className="text-foreground/70 hover:text-foreground hover:bg-white/10" onClick={handleReset}>
              <RotateCcw className="mr-2" />
              Reset
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

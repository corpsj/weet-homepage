'use client';

import { useState, useRef, useEffect, RefObject } from 'react';
import { useKonamiCode, useTripleClick } from '@/lib/easter-eggs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';

export function EasterEggs() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [showBrandStory, setShowBrandStory] = useState(false);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const logoElement = document.querySelector('[data-easter-egg="logo"]') as HTMLDivElement;
    if (logoElement) {
      logoRef.current = logoElement;
    }
  }, []);

  useKonamiCode(() => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  });

  useTripleClick(logoRef as RefObject<HTMLElement | null>, () => {
    setShowBrandStory(true);
  });

  return (
    <>
      {showConfetti && <ConfettiOverlay />}
      <div className="easter-egg-logo-trigger" />
      <Dialog open={showBrandStory} onOpenChange={setShowBrandStory}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-lg font-semibold">
              위트있는 집, 위트있는 삶
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <p className="text-sm text-foreground/80 leading-relaxed">
              위트는 모듈러 건축의 새로운 가능성을 제시합니다. 
              빠르고, 효율적이며, 지속 가능한 건축 솔루션으로 
              당신의 삶을 더욱 풍요롭게 만들어갑니다.
            </p>
            <p className="text-xs text-muted-foreground text-center italic">
              ✨ 당신의 꿈을 현실로 ✨
            </p>
          </div>
          <DialogClose className="mt-4" />
        </DialogContent>
      </Dialog>
    </>
  );
}

function ConfettiOverlay() {
  const pieces = Array.from({ length: 50 }, (_, i) => ({
    id: `${Math.random()}-${i}`,
    isYellow: i % 2 === 0,
    delay: (i % 10) * 0.1,
    left: Math.random() * 100,
    duration: 2.5 + Math.random() * 0.5,
    borderRadius: Math.random() > 0.5 ? '50%' : '0',
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      <style>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes sway {
          0%, 100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(20px);
          }
        }

        .confetti-piece {
          position: absolute;
          width: 8px;
          height: 8px;
          animation: fall 3s ease-in forwards, sway 2s ease-in-out infinite;
          pointer-events: none;
        }

        .confetti-piece.yellow {
          background-color: #FFCA0D;
        }

        .confetti-piece.dark {
          background-color: #2D2D2A;
        }
      `}</style>

      {pieces.map((piece) => (
        <div
          key={piece.id}
          className={`confetti-piece ${piece.isYellow ? 'yellow' : 'dark'}`}
          style={{
            left: `${piece.left}%`,
            top: '-10px',
            animationDelay: `${piece.delay}s`,
            animationDuration: `${piece.duration}s`,
            borderRadius: piece.borderRadius,
          }}
        />
      ))}
    </div>
  );
}

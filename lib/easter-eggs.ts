'use client';

import { useState, useEffect, useCallback } from 'react';

export function useKonamiCode() {
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const konamiCode = [
      'ArrowUp', 'ArrowUp',
      'ArrowDown', 'ArrowDown',
      'ArrowLeft', 'ArrowRight',
      'ArrowLeft', 'ArrowRight',
      'b', 'a'
    ];
    let position = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === konamiCode[position]) {
        position++;
        if (position === konamiCode.length) {
          setTriggered(true);
          position = 0;
        }
      } else {
        position = 0;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return triggered;
}

export function useTripleClick(timeout = 500) {
  const [triggered, setTriggered] = useState(false);
  const [clicks, setClicks] = useState(0);

  useEffect(() => {
    if (clicks === 3) {
      setTriggered(true);
      setClicks(0);
    }

    if (clicks > 0) {
      const timer = setTimeout(() => setClicks(0), timeout);
      return () => clearTimeout(timer);
    }
  }, [clicks, timeout]);

  const handleTripleClick = useCallback(() => {
    setClicks((prev) => prev + 1);
  }, []);

  return { triggered, handleTripleClick };
}

'use client';

import { useState, useEffect, RefObject } from 'react';

/**
 * Hook to detect Konami code sequence: ↑↑↓↓←→←→BA
 * Returns a callback setter to handle the triggered event
 */
export function useKonamiCode(callback?: () => void) {
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
      const key = e.key.toLowerCase();
      const expectedKey = konamiCode[position].toLowerCase();

      if (key === expectedKey) {
        position++;
        if (position === konamiCode.length) {
          callback?.();
          position = 0;
        }
      } else {
        position = 0;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [callback]);
}

/**
 * Hook to detect triple-click on a ref element
 * Returns callback to attach to element
 */
export function useTripleClick(ref: RefObject<HTMLElement | null>, callback?: () => void, timeout = 500) {
  const [clicks, setClicks] = useState(0);

  useEffect(() => {
    if (clicks === 3) {
      callback?.();
      setClicks(0);
    }

    if (clicks > 0) {
      const timer = setTimeout(() => setClicks(0), timeout);
      return () => clearTimeout(timer);
    }
  }, [clicks, callback, timeout]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleClick = () => {
      setClicks((prev) => prev + 1);
    };

    element.addEventListener('click', handleClick);
    return () => element.removeEventListener('click', handleClick);
  }, [ref]);
}

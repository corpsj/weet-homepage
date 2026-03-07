'use client';

import { useState, useEffect, type RefObject } from 'react';
import { useScroll, useTransform, type MotionValue } from 'framer-motion';

export function useScrollProgress(ref: RefObject<HTMLElement | null>): MotionValue<number> {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  return scrollYProgress;
}

export function useScrollSection(
  ref: RefObject<HTMLElement | null>,
  config: { startOffset?: 'start end' | 'start start'; endOffset?: 'end start' | 'end end' } = {}
) {
  const { startOffset = 'start end', endOffset = 'end start' } = config;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [startOffset, endOffset],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [40, 0, 0, -40]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.95]);

  return { scrollYProgress, opacity, y, scale };
}

export function useScrollCounter(
  ref: RefObject<HTMLElement | null>,
  targetEnd: number,
  decimals = 0
): number {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const [value, setValue] = useState(0);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (progress) => {
      const mapped = Math.min(Math.max((progress - 0.2) / 0.6, 0), 1);
      const factor = Math.pow(10, decimals);
      setValue(Math.round(mapped * targetEnd * factor) / factor);
    });
    return unsubscribe;
  }, [scrollYProgress, targetEnd, decimals]);

  return value;
}

export function useParallax(
  ref: RefObject<HTMLElement | null>,
  distance: number = 50
): MotionValue<number> {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  return useTransform(scrollYProgress, [0, 1], [-distance, distance]);
}

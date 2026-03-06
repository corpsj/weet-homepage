'use client';

import { useRef } from 'react';
import { useScroll, useTransform, type MotionValue, type UseScrollOptions } from 'framer-motion';

export function useScrollProgress(offset?: UseScrollOptions['offset']) {
  const ref = useRef<HTMLDivElement>(null);
  const resolvedOffset: UseScrollOptions['offset'] = offset ?? ['start end', 'end start'];
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: resolvedOffset,
  });

  return { ref, progress: scrollYProgress };
}

export function useScrollTransform<T>(
  progress: MotionValue<number>,
  inputRange: number[],
  outputRange: T[]
) {
  return useTransform(progress, inputRange, outputRange);
}

export function useScrollSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  return { ref, progress: scrollYProgress };
}

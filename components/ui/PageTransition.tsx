'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { type ReactNode } from 'react';
import { motion as motionConfig } from '@/lib/design-tokens';

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

export function PageTransition({ children, className }: PageTransitionProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: motionConfig.duration.normal }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

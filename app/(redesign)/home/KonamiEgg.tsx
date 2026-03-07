'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useKonamiCode } from '@/lib/easter-eggs';

export function KonamiEgg() {
  const triggered = useKonamiCode();
  const [hidden, setHidden] = useState(false);

  return (
    <AnimatePresence>
      {triggered && !hidden && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 px-4 text-center"
          onClick={() => setHidden(true)}
        >
          <p className="text-4xl font-bold text-[#FEBD16] md:text-6xl">
            위트있는 집을 발견하셨군요! 🏠✨
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

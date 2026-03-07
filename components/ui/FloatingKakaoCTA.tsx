'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { isKakaoReady, openKakaoChannel } from '@/lib/kakao';
import { ConsultationModal } from './ConsultationModal';

const HIDDEN_PATHS = ['/quote'];

export function FloatingKakaoCTA() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);
  const [hasPulsed, setHasPulsed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const lastScrollY = useRef(0);
  const isHidden = HIDDEN_PATHS.includes(pathname);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY < 100) {
        setIsVisible(true);
      } else if (currentY > lastScrollY.current && currentY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setHasPulsed(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleClick = useCallback(() => {
    if (isKakaoReady()) {
      openKakaoChannel();
    } else {
      setShowModal(true);
    }
  }, []);

  if (isHidden) return null;

  return (
    <>
      <div
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[400] transition-all duration-300"
        style={{
          transform: isVisible ? 'translateY(0)' : 'translateY(6rem)',
          opacity: isVisible ? 1 : 0,
          pointerEvents: isVisible ? 'auto' : 'none',
        }}
      >
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              transition={{ duration: 0.15 }}
              className="absolute right-full mr-3 top-1/2 -translate-y-1/2 hidden md:block"
            >
              <div className="bg-gray-900 text-white text-sm rounded-lg px-3 py-2 whitespace-nowrap relative">
                카카오톡으로 상담하기
                <div className="absolute top-1/2 -translate-y-1/2 -right-1 w-2 h-2 bg-gray-900 rotate-45" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          type="button"
          onClick={handleClick}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          aria-label="카카오톡 상담"
          className="relative w-14 h-14 md:w-[60px] md:h-[60px] rounded-full bg-[#FEE500] shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center"
        >
          <svg viewBox="0 0 24 24" className="w-7 h-7 md:w-8 md:h-8" fill="#3C1E1E" role="img" aria-hidden="true">
            <title>카카오톡</title>
            <path d="M12 3C6.48 3 2 6.58 2 10.94c0 2.8 1.86 5.27 4.66 6.67-.15.53-.95 3.4-.98 3.61 0 0-.02.16.08.22.1.06.22.03.22.03.29-.04 3.37-2.2 3.9-2.57.69.1 1.4.15 2.12.15 5.52 0 10-3.58 10-7.94S17.52 3 12 3z" />
          </svg>

          {hasPulsed && (
            <motion.div
              initial={{ scale: 1, opacity: 0.6 }}
              animate={{ scale: 1.8, opacity: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="absolute inset-0 rounded-full bg-[#FEE500]"
              onAnimationComplete={() => setHasPulsed(false)}
            />
          )}
        </button>
      </div>

      <ConsultationModal open={showModal} onClose={() => setShowModal(false)} />
    </>
  );
}

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const floatingShapes = [
  { id: 'rect-a', width: 120, height: 80, top: '15%', left: '10%', duration: 18, delay: 0, rotate: 12 },
  { id: 'sq-b', width: 60, height: 60, top: '60%', right: '8%', duration: 22, delay: 2, rotate: -8 },
  { id: 'rect-c', width: 90, height: 140, bottom: '20%', left: '70%', duration: 20, delay: 4, rotate: 6 },
  { id: 'rect-d', width: 50, height: 100, top: '35%', right: '25%', duration: 24, delay: 1, rotate: -15 },
];

const contentVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
      staggerChildren: 0.12,
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export function FullscreenHero() {
  const [videoFailed, setVideoFailed] = useState(false);

  return (
    <section className="h-screen w-full relative overflow-hidden" style={{ backgroundColor: '#2D2D2A' }}>
      {!videoFailed && (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          onError={() => setVideoFailed(true)}
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
      )}

      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #1a1a18 0%, #2D2D2A 40%, #1f1f1c 70%, #2D2D2A 100%)',
        }}
      />

      {floatingShapes.map((shape) => (
        <motion.div
          key={shape.id}
          className="absolute border border-white/[0.04] bg-white/[0.02] rounded-sm pointer-events-none"
          style={{
            width: shape.width,
            height: shape.height,
            top: shape.top,
            left: shape.left,
            right: shape.right,
            bottom: shape.bottom,
          }}
          animate={{
            y: [0, -20, 0, 15, 0],
            rotate: [0, shape.rotate, 0, -shape.rotate / 2, 0],
          }}
          transition={{
            duration: shape.duration,
            delay: shape.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />

      <motion.div
        className="relative z-10 h-full flex flex-col items-center justify-center px-4 md:px-6 text-center"
        variants={contentVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={childVariants}>
          <Badge className="mb-6 bg-white/10 text-white/80 border-white/20 text-sm px-4 py-1.5 backdrop-blur-sm">
            시스템건축의 새로운 기준
          </Badge>
        </motion.div>

        <motion.h1
          variants={childVariants}
          className="text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight mb-5 whitespace-pre-line"
        >
          {'당신의 공간을,\n위트있게'}
        </motion.h1>

        <motion.p
          variants={childVariants}
          className="text-base md:text-lg text-white/60 max-w-xl mx-auto mb-10"
        >
          모듈러 건축과 현장건축 — 위트가 만드는 새로운 라이프스타일
        </motion.p>

        <motion.div
          variants={childVariants}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <Button
            asChild
            size="lg"
            className="bg-primary text-[#2D2D2A] hover:bg-primary/90 font-semibold rounded-full px-8 h-13 text-base"
          >
            <Link href="/products-v2">제품 보기</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10 rounded-full px-8 h-13 text-base bg-transparent"
          >
            <Link href="/support-v2">상담 신청</Link>
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <span className="text-white/40 text-xs tracking-widest">스크롤</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <ChevronDown className="h-6 w-6 text-white/40" />
        </motion.div>
      </motion.div>

      <span
        className="absolute bottom-4 right-6 text-white/5 text-sm font-light select-none pointer-events-none z-10"
        aria-hidden="true"
      >
        weet :)
      </span>
    </section>
  );
}

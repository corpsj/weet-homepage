'use client';

import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export function HomeCTA() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 bg-gray-900 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative max-w-3xl mx-auto px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl font-bold text-white mb-4"
        >
          위트있는 집, 지금 시작하세요
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-lg md:text-xl text-white/60 mb-10"
        >
          여기까지 보셨으면, 이미 반쯤 이사하신 거예요 :)
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="#consultation"
            className="inline-flex items-center justify-center bg-[#FEBD16] text-black font-semibold px-8 py-3.5 rounded-full min-h-[44px] hover:bg-[#E5A410] transition-colors"
          >
            상담 신청하기
          </Link>
          <Link
            href="/products-v2"
            className="inline-flex items-center justify-center border border-white/30 text-white font-semibold px-8 py-3.5 rounded-full min-h-[44px] hover:bg-white/10 transition-colors"
          >
            제품 둘러보기
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

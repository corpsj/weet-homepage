'use client';

import { motion } from 'framer-motion';
import { Award, Newspaper } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { sectionHeadlines } from '@/lib/witty-copy';
import { cn } from '@/lib/utils';

const mediaOutlets = [
  { name: 'SBS', id: 'sbs' },
  { name: 'KBS', id: 'kbs' },
  { name: '매일경제', id: 'mk' },
  { name: '조선일보', id: 'chosun' },
  { name: '한경', id: 'hankyung' },
];

const certifications = [
  { name: 'ISO 9001', id: 'iso' },
  { name: '모듈러 특별법 대응', id: 'modular' },
  { name: '건설업 등록', id: 'construction' },
];

export function TrustBadges() {
  return (
    <section className="bg-[#2D2D2A] py-20 md:py-28 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              {sectionHeadlines.trust}
            </h2>
            <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto">
              {sectionHeadlines.trustSub}
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="mb-16 md:mb-20">
            <p className="text-sm font-medium text-white/40 uppercase tracking-widest text-center mb-8">
              미디어 보도
            </p>
            <div className="flex gap-4 md:gap-6 overflow-x-auto pb-4 md:overflow-visible md:justify-center scrollbar-hide">
              {mediaOutlets.map((outlet, i) => (
                <motion.div
                  key={outlet.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className={cn(
                    'flex-shrink-0 flex flex-col items-center justify-center gap-2',
                    'w-28 h-20 md:w-36 md:h-24 rounded-xl border border-white/10',
                    'bg-white/5 grayscale opacity-60 transition-all duration-300',
                    'hover:grayscale-0 hover:opacity-100 hover:border-white/25 hover:bg-white/10'
                  )}
                >
                  <Newspaper className="w-5 h-5 text-white/70" />
                  <span className="text-sm font-medium text-white/80">{outlet.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="mb-16 md:mb-20">
            <p className="text-sm font-medium text-white/40 uppercase tracking-widest text-center mb-8">
              인증 및 등록
            </p>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              {certifications.map((cert, i) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className={cn(
                    'flex items-center gap-3 px-6 py-4 rounded-xl',
                    'border border-white/10 bg-white/5',
                    'grayscale opacity-60 transition-all duration-300',
                    'hover:grayscale-0 hover:opacity-100 hover:border-white/25 hover:bg-white/10'
                  )}
                >
                  <Award className="w-5 h-5 text-amber-400/80 flex-shrink-0" />
                  <span className="text-sm md:text-base font-medium text-white/80 whitespace-nowrap">
                    {cert.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

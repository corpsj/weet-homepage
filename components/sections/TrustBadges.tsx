'use client';

import { motion } from 'framer-motion';
import { Building2, ShieldCheck, Leaf, Home, Clock, Heart } from 'lucide-react';
import { CountUp } from '@/components/ui/CountUp';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { cn } from '@/lib/utils';

const mediaLogos = [
  { name: 'KBS', width: 'w-16' },
  { name: 'SBS', width: 'w-16' },
  { name: 'MBC', width: 'w-16' },
  { name: '조선일보', width: 'w-20' },
  { name: '한국경제', width: 'w-20' },
];

const certifications = [
  {
    icon: Building2,
    title: '모듈러 특별법 추진',
    description: '정부 주도 모듈러 건축 제도화',
  },
  {
    icon: ShieldCheck,
    title: '품질인증',
    description: '체계적인 품질 관리 시스템',
  },
  {
    icon: Leaf,
    title: '친환경 건축',
    description: '탄소 배출 최소화 공법',
  },
];

const stats = [
  { icon: Home, end: 50, suffix: '+', label: '시공 완료', ariaLabel: '시공 완료 50건 이상' },
  { icon: Clock, end: 5, suffix: '년+', label: '업력', ariaLabel: '업력 5년 이상' },
  { icon: Heart, end: 98, suffix: '%', label: '고객 만족', ariaLabel: '고객 만족도 98퍼센트' },
];

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export function TrustBadges({ className }: { className?: string }) {
  return (
    <section className={cn('py-20 md:py-32 bg-gray-50', className)}>
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-gray-900 mb-4">
            위트를 믿어주신 분들
          </h2>
          <p className="text-center text-gray-500 mb-16 md:mb-20 text-lg">
            신뢰할 수 있는 모듈러 건축 파트너
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1} className="mb-16 md:mb-20">
          <p className="text-sm font-medium text-gray-400 uppercase tracking-widest text-center mb-8">
            미디어 소개
          </p>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="flex flex-wrap justify-center gap-4"
          >
            {mediaLogos.map((media) => (
              <motion.div
                key={media.name}
                variants={staggerItem}
                className={cn(
                  'px-6 py-3 border border-gray-200 rounded-lg',
                  'text-gray-300 font-bold text-lg',
                  'hover:text-gray-900 hover:border-gray-300 hover:shadow-sm',
                  'transition-all duration-300 cursor-default select-none',
                  media.width
                )}
              >
                <span className="block text-center">{media.name}</span>
              </motion.div>
            ))}
          </motion.div>
          <p className="text-center text-sm text-gray-400 italic mt-4">
            미디어 보도 내용은 준비 중입니다
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2} className="mb-16 md:mb-20">
          <p className="text-sm font-medium text-gray-400 uppercase tracking-widest text-center mb-8">
            인증 및 제도
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {certifications.map((cert) => {
              const Icon = cert.icon;
              return (
                <div
                  key={cert.title}
                  className={cn(
                    'bg-white border border-gray-100 shadow-sm rounded-xl p-6',
                    'flex flex-col items-center text-center',
                    'hover:shadow-md hover:border-gray-200 transition-all duration-300'
                  )}
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{cert.title}</h3>
                  <p className="text-sm text-gray-500">{cert.description}</p>
                </div>
              );
            })}
          </div>
          <p className="text-center text-sm text-gray-400 italic mt-4">
            인증 관련 세부사항은 준비 중입니다
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-3xl mx-auto">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <figure
                  key={stat.label}
                  aria-label={stat.ariaLabel}
                  className="flex flex-col items-center text-center"
                >
                  <Icon className="w-8 h-8 text-primary mb-3" aria-hidden="true" />
                  <div className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-1">
                    <CountUp end={stat.end} suffix={stat.suffix} />
                  </div>
                  <p className="text-sm md:text-base text-gray-500 font-medium">{stat.label}</p>
                </figure>
              );
            })}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

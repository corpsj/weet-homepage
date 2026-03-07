'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { productTaglines, productSubcopy } from '@/lib/witty-copy';
import type { SizeCategory } from '@/lib/types';

interface ModelSlide {
  size: SizeCategory;
  dims: string;
  area: string;
  price: string;
  gradient: string;
}

const models: ModelSlide[] = [
  {
    size: 'S',
    dims: '3×6m',
    area: '18㎡',
    price: '2,500만',
    gradient: 'from-[#1a1a1a] via-[#252525] to-[#1a1a1a]',
  },
  {
    size: 'M',
    dims: '3×9m',
    area: '27㎡',
    price: '3,800만',
    gradient: 'from-[#1c1f26] via-[#272b33] to-[#1c1f26]',
  },
  {
    size: 'L',
    dims: '6×9m',
    area: '54㎡',
    price: '6,500만',
    gradient: 'from-[#1f1c1a] via-[#2a2623] to-[#1f1c1a]',
  },
  {
    size: 'XL',
    dims: '6×12m',
    area: '72㎡',
    price: '8,900만',
    gradient: 'from-[#0f0f0f] via-[#1a1a1a] to-[#0f0f0f]',
  },
];

export function FullscreenHero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  const setSectionRef = useCallback((el: HTMLElement | null, index: number) => {
    sectionRefs.current[index] = el;
  }, []);

  useEffect(() => {
    const sections = sectionRefs.current.filter(Boolean) as HTMLElement[];
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = sections.indexOf(entry.target as HTMLElement);
            if (idx !== -1) setActiveIndex(idx);
          }
        }
      },
      { root: containerRef.current, threshold: 0.6 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (index: number) => {
    sectionRefs.current[index]?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      ref={containerRef}
      className="h-screen overflow-y-auto snap-y snap-mandatory relative"
    >
      {models.map((model, i) => (
        <section
          key={model.size}
          ref={(el) => setSectionRef(el, i)}
          className={cn(
            'h-screen w-full snap-start relative flex items-center justify-center overflow-hidden',
            `bg-gradient-to-br ${model.gradient}`
          )}
        >
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
            <div className="absolute bottom-1/3 right-1/4 w-72 h-72 rounded-full bg-primary/3 blur-2xl" />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <Badge className="mb-6 bg-primary/20 text-primary border-primary/30 text-sm px-4 py-1.5">
                {model.dims} · {model.area}
              </Badge>

              <h2 className="text-[6rem] sm:text-[8rem] md:text-[10rem] lg:text-[12rem] font-bold text-white/10 leading-none select-none">
                {model.size}
              </h2>

              <div className="-mt-12 sm:-mt-16 md:-mt-20">
                <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
                  {productTaglines[model.size]}
                </p>
                <p className="text-base sm:text-lg text-white/60 mb-2 max-w-lg mx-auto">
                  {productSubcopy[model.size]}
                </p>
                <p className="text-lg sm:text-xl font-semibold text-primary mb-8">
                  ₩{model.price}~
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-primary text-[#2D2D2A] hover:bg-primary/90 font-semibold rounded-full px-8 h-13 text-base"
                >
                  <Link href="/products-v2">자세히 보기</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 rounded-full px-8 h-13 text-base bg-transparent"
                >
                  <Link href="/support-v2">상담 신청</Link>
                </Button>
              </div>
            </motion.div>
          </div>

          {i === 0 && (
            <motion.button
              type="button"
              className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 z-10"
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              onClick={() => scrollTo(1)}
              aria-label="다음 모델 보기"
            >
              <ChevronDown className="h-8 w-8" />
            </motion.button>
          )}
        </section>
      ))}

      <nav
        className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3"
        aria-label="모델 탐색"
      >
        {models.map((model, i) => (
          <button
            key={model.size}
            type="button"
            onClick={() => scrollTo(i)}
            className={cn(
              'w-3 h-3 rounded-full transition-all duration-300',
              activeIndex === i
                ? 'bg-primary scale-125'
                : 'bg-white/30 hover:bg-white/60'
            )}
            aria-label={`${model.size} 모델`}
            aria-current={activeIndex === i ? 'true' : undefined}
          />
        ))}
      </nav>
    </div>
  );
}

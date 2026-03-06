'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CountUp } from '@/components/ui/CountUp';
import { useScrollProgress, useScrollSection, useScrollTransform } from '@/lib/scroll-storytelling';
import { cn } from '@/lib/utils';

interface ScrollStoryItem {
  type: 'text' | 'stat' | 'comparison' | 'timeline';
  heading: string;
  content?: string;
  stat?: { value: number; suffix: string; label: string };
  items?: { label: string; value: string }[];
}

interface ScrollStorySectionProps {
  items: ScrollStoryItem[];
  className?: string;
}

interface TimelineStepProps {
  step: { label: string; value: string };
  index: number;
  total: number;
  progress: ReturnType<typeof useScrollProgress>['progress'];
  isMobile: boolean;
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    const handleChange = (event: MediaQueryListEvent) => setIsMobile(event.matches);

    setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return isMobile;
}

function TimelineStep({ step, index, total, progress, isMobile }: TimelineStepProps) {
  const start = total > 1 ? 0.2 + (index / (total - 1)) * 0.55 : 0.2;
  const end = Math.min(start + 0.2, 1);
  const opacity = useScrollTransform(progress, [start, end], [0.35, 1]);
  const y = useScrollTransform(progress, [start, end], isMobile ? [0, 0] : [20, 0]);

  return (
    <motion.li style={{ opacity, y }} className="relative pl-8 will-change-transform">
      <span className="absolute left-0 top-2 h-3 w-3 rounded-full bg-primary" />
      <p className="text-sm font-semibold uppercase tracking-[0.12em] text-text-secondary">{step.label}</p>
      <p className="mt-1 text-lg md:text-xl font-semibold text-text-primary">{step.value}</p>
    </motion.li>
  );
}

function ScrollStoryPanel({ item, isMobile }: { item: ScrollStoryItem; isMobile: boolean }) {
  const { ref, progress } = useScrollProgress(['start 85%', 'end 15%']);
  const textOpacity = useScrollTransform(progress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const panelOpacity = useScrollTransform(progress, [0, 0.2, 0.85, 1], [0, 1, 1, 0.2]);
  const baseOpacity = item.type === 'text' ? textOpacity : panelOpacity;
  const y = useScrollTransform(progress, [0, 0.35, 1], isMobile ? [0, 0, 0] : [36, 0, -24]);
  const timelineLineScale = useScrollTransform(progress, [0, 1], [0, 1]);

  const midpoint = Math.ceil((item.items?.length || 0) / 2);
  const leftColumn = item.items?.slice(0, midpoint) || [];
  const rightColumn = item.items?.slice(midpoint) || [];
  const timelineItems = item.items || [];

  return (
    <div ref={ref} className="relative min-h-[70vh] md:min-h-[80vh]">
      <motion.div
        style={{ opacity: baseOpacity, y }}
        className="will-change-transform md:sticky md:top-28 rounded-3xl border border-border-light bg-white/90 p-6 md:p-10 shadow-[0_24px_64px_-42px_rgba(0,0,0,0.45)]"
      >
        <h3 className="text-2xl md:text-4xl font-semibold text-text-primary">{item.heading}</h3>

        {item.type === 'text' && item.content && (
          <p className="mt-5 max-w-3xl text-base md:text-xl leading-relaxed text-text-secondary">{item.content}</p>
        )}

        {item.type === 'stat' && item.stat && (
          <div className="mt-8 space-y-3">
            <div className="text-4xl md:text-6xl font-bold text-text-primary leading-none">
              <CountUp end={item.stat.value} suffix={item.stat.suffix} className="inline-block" />
            </div>
            <p className="text-sm md:text-base uppercase tracking-[0.12em] text-text-secondary">{item.stat.label}</p>
            {item.content && <p className="text-base md:text-lg text-text-secondary">{item.content}</p>}
          </div>
        )}

        {item.type === 'comparison' && (item.items?.length || 0) > 0 && (
          <div className="mt-8 grid gap-4 md:gap-6 md:grid-cols-2">
            <div className="space-y-3">
              {leftColumn.map((entry) => (
                <div key={`${entry.label}-${entry.value}-left`} className="rounded-2xl border border-border-light bg-gray-50 p-4 md:p-5">
                  <p className="text-xs md:text-sm uppercase tracking-[0.1em] text-text-secondary">{entry.label}</p>
                  <p className="mt-1 text-lg md:text-2xl font-semibold text-text-primary">{entry.value}</p>
                </div>
              ))}
            </div>
            <div className="space-y-3">
              {rightColumn.map((entry) => (
                <div key={`${entry.label}-${entry.value}-right`} className="rounded-2xl border border-border-light bg-gray-50 p-4 md:p-5">
                  <p className="text-xs md:text-sm uppercase tracking-[0.1em] text-text-secondary">{entry.label}</p>
                  <p className="mt-1 text-lg md:text-2xl font-semibold text-text-primary">{entry.value}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {item.type === 'timeline' && timelineItems.length > 0 && (
          <div className="relative mt-8">
            <motion.div
              style={{ scaleY: timelineLineScale }}
              className="absolute left-1.5 top-2 h-[calc(100%-0.5rem)] w-px origin-top bg-primary/40 will-change-transform"
            />
            <ol className="space-y-6 md:space-y-8">
              {timelineItems.map((step, index) => (
                <TimelineStep
                  key={`${step.label}-${step.value}-${index}`}
                  step={step}
                  index={index}
                  total={timelineItems.length}
                  progress={progress}
                  isMobile={isMobile}
                />
              ))}
            </ol>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export function ScrollStorySection({ items, className }: ScrollStorySectionProps) {
  const isMobile = useIsMobile();
  const { ref, progress } = useScrollSection();
  const progressScale = useScrollTransform(progress, [0, 1], [0, 1]);

  return (
    <section ref={ref} className={cn('relative bg-white py-16 md:py-24', className)}>
      <div className="mx-auto w-full max-w-[1200px] px-4 md:px-8">
        <motion.div
          style={{ scaleX: isMobile ? 1 : progressScale }}
          className="mb-8 h-px origin-left bg-primary/50 will-change-transform"
        />
        <div className="space-y-8 md:space-y-12">
          {items.map((item, index) => (
            <ScrollStoryPanel key={`${item.heading}-${item.type}-${index}`} item={item} isMobile={isMobile} />
          ))}
        </div>
      </div>
    </section>
  );
}

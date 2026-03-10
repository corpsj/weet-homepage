'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, MapPin, Calendar, Ruler } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { cn } from '@/lib/utils';

interface ProjectStory {
  id: string;
  title: string;
  location: string;
  size: string;
  duration: string;
  category: string;
  description: string;
  beforeDesc: string;
  afterDesc: string;
  beforeImage: string;
  afterImage: string;
}

const stories: ProjectStory[] = [
  {
    id: 'story-1',
    title: '양평 세컨하우스',
    location: '경기도 양평군',
    size: 'M (27㎡)',
    duration: '8주',
    category: '세컨하우스',
    description: '주말마다 가족이 함께 쉴 수 있는 전원 세컨하우스',
    beforeDesc: '방치된 빈 토지',
    afterDesc: '가족의 주말 쉼터',
    beforeImage: '/images/modular/osc.webp',
    afterImage: '/images/products/medium/36+36집-2.webp',
  },
  {
    id: 'story-2',
    title: '홍천 농막',
    location: '강원도 홍천군',
    size: 'S (18㎡)',
    duration: '4주',
    category: '농막',
    description: '텃밭 관리와 휴식을 위한 농막',
    beforeDesc: '황무지 농지',
    afterDesc: '텃밭과 쉼터가 있는 공간',
    beforeImage: '/images/modular/prefabrication.webp',
    afterImage: '/images/products/small/private/3x9.webp',
  },
  {
    id: 'story-3',
    title: '제주 단독주택',
    location: '제주특별자치도',
    size: 'L (54㎡)',
    duration: '12주',
    category: '단독주택',
    description: '제주 이주를 꿈꾸는 가족의 본 주거 공간',
    beforeDesc: '빈 대지',
    afterDesc: '제주의 새로운 보금자리',
    beforeImage: '/images/modular/prefabricated-building.webp',
    afterImage: '/images/products/large/L-3.webp',
  },
];

export function BeforeAfterStories() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [beforeAfter, setBeforeAfter] = useState<'before' | 'after'>('after');

  const activeStory = stories[activeIndex];

  const prev = () => setActiveIndex(i => (i > 0 ? i - 1 : stories.length - 1));
  const next = () => setActiveIndex(i => (i < stories.length - 1 ? i + 1 : 0));

  return (
    <section className="py-20 md:py-28 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-h2 text-foreground mb-4">시공 스토리</h2>
            <p className="text-body-lg text-muted-foreground">위트가 만든 공간의 변화를 확인하세요</p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <ScrollReveal direction="left">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeStory.id}-${beforeAfter}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={beforeAfter === 'before' ? activeStory.beforeImage : activeStory.afterImage}
                    alt={`${activeStory.title} ${beforeAfter === 'before' ? '시공 전' : '시공 후'}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-black/30" />
                  <div className="relative z-10 flex items-center justify-center h-full">
                    <div className="text-center p-8">
                      <p className="text-lg font-medium text-white/80 mb-2">
                        {beforeAfter === 'before' ? 'Before' : 'After'}
                      </p>
                      <p className="text-2xl font-bold text-white">
                        {beforeAfter === 'before' ? activeStory.beforeDesc : activeStory.afterDesc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                <button
                  type="button"
                  onClick={() => setBeforeAfter('before')}
                  className={cn(
                    'px-4 py-2 rounded-full text-sm font-medium transition-all min-h-[44px]',
                    beforeAfter === 'before'
                      ? 'bg-foreground text-background'
                      : 'bg-background/80 text-foreground hover:bg-background'
                  )}
                >
                  Before
                </button>
                <button
                  type="button"
                  onClick={() => setBeforeAfter('after')}
                  className={cn(
                    'px-4 py-2 rounded-full text-sm font-medium transition-all min-h-[44px]',
                    beforeAfter === 'after'
                      ? 'bg-primary text-[#2D2D2A]'
                      : 'bg-background/80 text-foreground hover:bg-background'
                  )}
                >
                  After
                </button>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div className="flex flex-col justify-center h-full">
              <Badge className="w-fit mb-4 bg-primary/10 text-primary border-primary/20">
                {activeStory.category}
              </Badge>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                {activeStory.title}
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {activeStory.description}
              </p>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{activeStory.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Ruler className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{activeStory.size}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{activeStory.duration}</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={prev}
                    className="w-11 h-11 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
                    aria-label="이전 프로젝트"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    className="w-11 h-11 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
                    aria-label="다음 프로젝트"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
                <span className="text-sm text-muted-foreground">
                  {activeIndex + 1} / {stories.length}
                </span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

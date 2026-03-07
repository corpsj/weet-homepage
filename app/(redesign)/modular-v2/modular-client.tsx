'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Factory, Truck, Clock, Wrench, Recycle, Shield, Ruler, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { CountUp } from '@/components/ui/CountUp';
import { cn } from '@/lib/utils';
import { sectionHeadlines } from '@/lib/witty-copy';

const qaItems = [
  {
    question: '시스템건축이 뭐예요?',
    answer: '공장에서 모듈을 제작하고, 현장에서 조립·설치하는 건축 방식입니다. 기존 건축의 70% 시간으로 더 높은 품질을 실현합니다.',
    icon: Factory,
  },
  {
    question: '얼마나 걸려요?',
    answer: '평균 3개월이면 완공됩니다. 공장 제작과 현장 준비를 동시에 진행해 기존 건축 대비 획기적으로 단축됩니다.',
    icon: Clock,
    stat: { end: 3, suffix: '개월', label: '평균 시공 기간' },
  },
  {
    question: '튼튼한가요?',
    answer: '철골 프레임 구조로 내진 설계 기준을 충족하며, 50년 이상의 내구성을 자랑합니다. 일반 건축과 동일한 구조 안전성을 보장합니다.',
    icon: Shield,
    stat: { end: 50, suffix: '년+', label: '내구성' },
  },
  {
    question: '환경에 좋은가요?',
    answer: '공장 제작으로 현장 폐기물을 80% 이상 줄이고, 친환경 자재를 사용합니다. 필요 시 해체 후 재설치도 가능합니다.',
    icon: Recycle,
    stat: { end: 80, suffix: '%+', label: '폐기물 감소' },
  },
];

const timeline = [
  { step: '01', title: '상담·설계', desc: '용도, 부지, 예산에 맞는 맞춤 설계', duration: '2~3주', icon: Ruler },
  { step: '02', title: '공장 제작', desc: '통제된 환경에서 고품질 모듈 제작', duration: '4~6주', icon: Factory },
  { step: '03', title: '운송', desc: '완성된 모듈을 현장으로 안전 운송', duration: '1~2일', icon: Truck },
  { step: '04', title: '현장 설치', desc: '크레인으로 모듈 설치 및 연결', duration: '1~3일', icon: Wrench },
];

const comparison = [
  { category: '시공 기간', modular: '약 3개월', traditional: '6~12개월' },
  { category: '품질 편차', modular: '최소 (공장 관리)', traditional: '크다 (현장 변수)' },
  { category: '현장 폐기물', modular: '20% 이하', traditional: '100%' },
  { category: '소음·분진', modular: '최소', traditional: '높음' },
  { category: '이전 가능', modular: '가능', traditional: '불가' },
];

export function ModularClient() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  return (
    <div className="w-full">
      <section ref={heroRef} className="relative min-h-[90vh] bg-[#2D2D2A] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-20 md:py-32"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <Badge className="mb-6 bg-primary/20 text-primary border-primary/30 text-sm px-4 py-1.5">
              시스템건축
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              {sectionHeadlines.modular}
            </h1>
            <p className="text-lg md:text-xl text-white/70 mb-10 max-w-xl">
              {sectionHeadlines.modularSub}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-primary text-[#2D2D2A] hover:bg-primary/90 font-semibold rounded-full px-8 h-14 text-base">
                <Link href="/products-v2">제품 보기 <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 rounded-full px-8 h-14 text-base bg-transparent">
                <Link href="/support-v2">상담 신청</Link>
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <section className="py-20 md:py-28 lg:py-32 bg-background">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-h2 text-foreground mb-4">자주 묻는 질문</h2>
              <p className="text-body-lg text-muted-foreground">시스템건축에 대해 궁금한 것들</p>
            </div>
          </ScrollReveal>
          <div className="space-y-12">
            {qaItems.map((item, i) => (
              <ScrollReveal key={item.question} delay={i * 0.1}>
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mt-1">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-foreground mb-3">{item.question}</h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">{item.answer}</p>
                    {item.stat && (
                      <div className="inline-flex items-center gap-3 bg-muted/50 rounded-xl px-5 py-3">
                        <span className="text-3xl font-bold text-foreground">
                          <CountUp end={item.stat.end} suffix={item.stat.suffix} />
                        </span>
                        <span className="text-sm text-muted-foreground">{item.stat.label}</span>
                      </div>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 lg:py-32 bg-[#2D2D2A]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-h2 text-white mb-4">시공 과정</h2>
              <p className="text-body-lg text-white/60">상담부터 입주까지, 체계적인 프로세스</p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {timeline.map((item, i) => (
              <ScrollReveal key={item.step} delay={i * 0.12}>
                <div className="relative">
                  {i < timeline.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-white/10 -translate-x-1/2" />
                  )}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 h-full">
                    <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                      <item.icon className="h-7 w-7 text-primary" />
                    </div>
                    <Badge variant="secondary" className="mb-3 bg-white/10 text-white/80 border-white/20">
                      {item.step}
                    </Badge>
                    <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                    <p className="text-sm text-white/60 mb-3">{item.desc}</p>
                    <p className="text-xs text-primary font-medium">{item.duration}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 lg:py-32 bg-background">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-h2 text-foreground mb-4">시스템건축 vs 일반 건축</h2>
              <p className="text-body-lg text-muted-foreground">한눈에 비교하세요</p>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <div className="rounded-2xl border border-border overflow-hidden">
              <div className="grid grid-cols-3 bg-muted/50 px-4 py-3 md:px-6 md:py-4">
                <span className="text-sm font-medium text-muted-foreground">항목</span>
                <span className="text-sm font-semibold text-primary text-center">시스템건축</span>
                <span className="text-sm font-medium text-muted-foreground text-center">일반 건축</span>
              </div>
              {comparison.map((row, i) => (
                <div
                  key={row.category}
                  className={cn(
                    'grid grid-cols-3 px-4 py-3 md:px-6 md:py-4',
                    i % 2 === 0 ? 'bg-background' : 'bg-muted/20'
                  )}
                >
                  <span className="text-sm font-medium text-foreground">{row.category}</span>
                  <span className="text-sm text-foreground text-center font-medium">{row.modular}</span>
                  <span className="text-sm text-muted-foreground text-center">{row.traditional}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl md:text-4xl font-bold text-foreground">
                <CountUp end={3} suffix="개월" />
              </p>
              <p className="text-sm text-muted-foreground mt-1">평균 시공 기간</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-foreground">
                <CountUp end={70} suffix="%" />
              </p>
              <p className="text-sm text-muted-foreground mt-1">공기 단축</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-foreground">
                <CountUp end={80} suffix="%+" />
              </p>
              <p className="text-sm text-muted-foreground mt-1">폐기물 절감</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-foreground">
                <CountUp end={50} suffix="년+" />
              </p>
              <p className="text-sm text-muted-foreground mt-1">내구성</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-primary">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="text-h2 text-[#2D2D2A] mb-4">시스템건축으로 시작하세요</h2>
            <p className="text-body-lg text-[#2D2D2A]/70 mb-10 max-w-xl mx-auto">
              부지 조건과 요구사항을 알려주시면 맞춤 제안을 드립니다
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-[#2D2D2A] text-white hover:bg-[#2D2D2A]/90 rounded-full px-8 h-14 text-base font-semibold">
                <Link href="/quote">견적 받기</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-[#2D2D2A]/30 text-[#2D2D2A] hover:bg-[#2D2D2A]/10 rounded-full px-8 h-14 text-base bg-transparent">
                <Link href="/support-v2">상담 신청</Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}

"use client";

import type { Metadata } from 'next';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Clock, Shield, Wrench, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { cn } from '@/lib/utils';
import { BRAND_V2 } from '@/lib/constants';

const valueProps = [
  { icon: Clock, title: '빠른 시공', desc: '공장 제작과 현장 시공을 병행해 일반 건축 대비 70% 빠른 완공' },
  { icon: CheckCircle, title: '균일한 품질', desc: '공장 제어 환경에서 제작되어 날씨·현장 변수 없이 일정한 품질 보장' },
  { icon: Wrench, title: '맞춤 설계', desc: '용도와 부지에 맞는 비스포크 설계로 나만의 공간 완성' },
  { icon: Shield, title: 'A/S 보장', desc: '구조 10년, 마감·설비 2년 무상 A/S로 안심하고 사용' },
];

const sizeCards = [
  { size: 'S', dims: '3×6m', sqm: '18㎡', use: '농막·체류형 쉼터', desc: '건축 허가 없이 설치 가능한 소형 쉼터' },
  { size: 'M', dims: '3×9m', sqm: '27㎡', use: '세컨하우스', desc: '주말 휴식을 위한 아늑한 세컨하우스' },
  { size: 'L', dims: '6×9m', sqm: '54㎡', use: '단독주택', desc: '가족이 함께 생활하는 본 주거 공간' },
  { size: 'XL', dims: '6×12m', sqm: '72㎡', use: '대형 단독주택', desc: '넓고 쾌적한 프리미엄 단독주택' },
];

export default function HomePage() {
  return (
    <div className="w-full">
      <section className="relative min-h-screen bg-[#2D2D2A] flex flex-col items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <Badge className="mb-6 bg-primary/20 text-primary border-primary/30 text-sm px-4 py-1.5">
              {BRAND_V2.concept}
            </Badge>
            <h1 className="text-display text-white mb-6 whitespace-pre-line">
              {`시스템건축의\n새로운 기준`}
            </h1>
            <p className="text-body-lg text-white/70 mb-10 max-w-2xl mx-auto">
              이동식주택과 현장건축 — 위트가 만드는 공간
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary text-[#2D2D2A] hover:bg-primary/90 font-semibold rounded-full px-8 h-14 text-base">
                <Link href="/products-v2">제품 보기 <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 rounded-full px-8 h-14 text-base bg-transparent">
                <Link href="/support-v2">상담 신청</Link>
              </Button>
            </div>
          </motion.div>
        </div>
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <ChevronDown className="h-6 w-6" />
        </motion.div>
      </section>

      <section className="py-20 md:py-28 lg:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-h2 text-foreground mb-4">시스템건축이란?</h2>
              <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
                공장 제작과 현장 시공을 결합한 위트만의 건축 방식으로, 두 가지 방향으로 제공됩니다.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ScrollReveal direction="left">
              <Card className="group hover:shadow-lg transition-shadow border-border h-full">
                <CardHeader className="pb-4">
                  <Badge className="w-fit mb-3 bg-primary/10 text-primary border-primary/20">이동식주택</Badge>
                  <CardTitle className="text-h3">공장 제작 · 현장 설치</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    S·M·L·XL 사이즈로 제공되는 이동식주택. 농막, 세컨하우스, 단독주택까지 다양한 용도로 활용할 수 있습니다.
                  </p>
                  <Link href="/products-v2" className="inline-flex items-center text-primary font-medium hover:gap-2 transition-all gap-1">
                    제품 보기 <ArrowRight className="h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <Card className="group hover:shadow-lg transition-shadow border-border h-full">
                <CardHeader className="pb-4">
                  <Badge className="w-fit mb-3 bg-foreground/10 text-foreground border-foreground/20">현장건축</Badge>
                  <CardTitle className="text-h3">대지 직접 시공</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    부지에 직접 시공하는 현장건축. 더 큰 규모와 자유로운 설계로 나만의 공간을 완성합니다.
                  </p>
                  <Link href="/projects-v2" className="inline-flex items-center text-primary font-medium hover:gap-2 transition-all gap-1">
                    시공사례 보기 <ArrowRight className="h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 lg:py-32 bg-[#2D2D2A]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-h2 text-white mb-4">왜 위트인가</h2>
              <p className="text-body-lg text-white/60 max-w-xl mx-auto">
                시스템건축의 장점을 최대한 살린 위트만의 차별점
              </p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {valueProps.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.1}>
                <div className="flex flex-col gap-4 p-6 rounded-2xl bg-white/5 border border-white/10 h-full">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  <p className="text-sm text-white/60 leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 lg:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-h2 text-foreground mb-4">이동식주택 라인업</h2>
              <p className="text-body-lg text-muted-foreground">용도에 맞는 사이즈를 선택하세요</p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {sizeCards.map((item, i) => (
              <ScrollReveal key={item.size} delay={i * 0.08}>
                <Card className="hover:shadow-md transition-shadow border-border h-full">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-3xl font-bold text-foreground">{item.size}</span>
                      <Badge variant="secondary">{item.sqm}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.dims}</p>
                    <CardTitle className="text-base mt-1">{item.use}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal>
            <div className="text-center mt-12">
              <Button asChild size="lg" variant="outline" className="rounded-full px-8 h-12 border-foreground/20 hover:bg-foreground hover:text-background transition-colors">
                <Link href="/products-v2">전체 제품 보기 <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-primary">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="text-h2 text-[#2D2D2A] mb-4">지금 바로 상담받으세요</h2>
            <p className="text-body-lg text-[#2D2D2A]/70 mb-10 max-w-xl mx-auto">
              부지 조건과 요구사항을 알려주시면 맞춤 제안을 드립니다
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-[#2D2D2A] text-white hover:bg-[#2D2D2A]/90 rounded-full px-8 h-14 text-base font-semibold">
                <Link href="/support-v2">카카오톡 상담</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-[#2D2D2A]/30 text-[#2D2D2A] hover:bg-[#2D2D2A]/10 rounded-full px-8 h-14 text-base bg-transparent">
                <Link href="/bespoke-v2">견적 받기</Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}

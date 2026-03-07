'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Leaf, Shield, Clock, Truck, MapPin, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { CountUp } from '@/components/ui/CountUp';
import { cn } from '@/lib/utils';
import { sectionHeadlines } from '@/lib/witty-copy';

const benefits = [
  { icon: FileText, title: '건축 허가 불필요', desc: '20㎡ 이하 가설건축물로 신고만으로 설치 가능' },
  { icon: Truck, title: '당일 설치', desc: '공장에서 완성된 쉼터를 현장에 바로 설치' },
  { icon: Shield, title: '견고한 구조', desc: '철골 프레임 + 단열재로 사계절 사용 가능' },
  { icon: Leaf, title: '친환경 자재', desc: '환경 인증 자재 사용, 자연과 어울리는 디자인' },
];

const useCases = [
  { title: '농막', desc: '농지에 설치하는 간이 주거·휴식 공간', badge: '인기' },
  { title: '세컨하우스', desc: '주말 휴식을 위한 전원 별장', badge: '' },
  { title: '캠핑·글램핑', desc: '프리미엄 캠핑·글램핑 숙박 시설', badge: '' },
  { title: '사무·작업실', desc: '독립된 업무 공간이 필요할 때', badge: '' },
];

const shelterModels = [
  { size: 'S', dims: '3×6m', area: '18㎡', desc: '1인 체류에 최적화된 컴팩트 쉼터', price: '2,500만~' },
  { size: 'M', dims: '3×9m', area: '27㎡', desc: '가족 주말 체류에 적합한 여유로운 공간', price: '3,800만~' },
];

const process = [
  { step: '01', title: '상담', desc: '용도·부지·예산 상담' },
  { step: '02', title: '현장 확인', desc: '설치 가능 여부 확인' },
  { step: '03', title: '계약·제작', desc: '맞춤 설계 후 공장 제작' },
  { step: '04', title: '운송·설치', desc: '완성품 현장 설치' },
];

export function ShelterClient() {
  return (
    <div className="w-full">
      <section className="relative min-h-[80vh] bg-[#2D2D2A] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-transparent to-primary/10" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-20 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <Badge className="mb-6 bg-green-500/20 text-green-400 border-green-500/30 text-sm px-4 py-1.5">
              건축 허가 불필요
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {sectionHeadlines.shelter}
            </h1>
            <p className="text-lg md:text-xl text-white/70 mb-10 max-w-xl">
              {sectionHeadlines.shelterSub}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-primary text-[#2D2D2A] hover:bg-primary/90 font-semibold rounded-full px-8 h-14 text-base">
                <Link href="/quote">견적 받기 <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 rounded-full px-8 h-14 text-base bg-transparent">
                <Link href="/support-v2">상담 신청</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 md:py-28 lg:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-h2 text-foreground mb-4">체류형 쉼터의 장점</h2>
              <p className="text-body-lg text-muted-foreground">복잡한 절차 없이 바로 시작하세요</p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.1}>
                <Card className="h-full hover:shadow-md transition-shadow border-border">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <item.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 lg:py-32 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-h2 text-foreground mb-4">이런 용도로 활용하세요</h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {useCases.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.08}>
                <Card className="h-full hover:shadow-md transition-shadow border-border relative">
                  {item.badge && (
                    <Badge className="absolute -top-2 right-3 bg-primary text-[#2D2D2A] text-xs">{item.badge}</Badge>
                  )}
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 lg:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-h2 text-foreground mb-4">쉼터 라인업</h2>
              <p className="text-body-lg text-muted-foreground">용도에 맞는 사이즈를 선택하세요</p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {shelterModels.map((model, i) => (
              <ScrollReveal key={model.size} delay={i * 0.1}>
                <Card className="h-full hover:shadow-md transition-shadow border-border">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-4xl font-bold text-foreground">{model.size}</span>
                      <Badge variant="secondary">{model.area}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{model.dims}</p>
                    <CardTitle className="text-base mt-1">{model.desc}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg font-semibold text-foreground mb-4">₩{model.price}</p>
                    <Button asChild className="w-full rounded-xl bg-foreground text-background hover:bg-foreground/90 h-11">
                      <Link href="/quote">견적 받기 <ArrowRight className="ml-2 h-4 w-4" /></Link>
                    </Button>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-[#2D2D2A]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-h2 text-white mb-4">설치 과정</h2>
              <p className="text-body-lg text-white/60">상담부터 설치까지, 간단하고 빠르게</p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((item, i) => (
              <ScrollReveal key={item.step} delay={i * 0.1}>
                <div className="text-center">
                  <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                    <span className="text-primary font-bold text-lg">{item.step}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-1">{item.title}</h3>
                  <p className="text-sm text-white/60">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl md:text-4xl font-bold text-foreground">
                <CountUp end={150} suffix="+" />
              </p>
              <p className="text-sm text-muted-foreground mt-1">쉼터 설치</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-foreground">
                <CountUp end={1} suffix="일" />
              </p>
              <p className="text-sm text-muted-foreground mt-1">평균 설치 시간</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-foreground">
                <CountUp end={98} suffix="%" />
              </p>
              <p className="text-sm text-muted-foreground mt-1">고객 만족도</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-foreground">
                <CountUp end={10} suffix="년" />
              </p>
              <p className="text-sm text-muted-foreground mt-1">구조 보증</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-primary">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="text-h2 text-[#2D2D2A] mb-4">내 땅에 쉼터 놓기</h2>
            <p className="text-body-lg text-[#2D2D2A]/70 mb-10 max-w-xl mx-auto">
              부지 조건과 용도를 알려주시면 맞춤 제안을 드립니다
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

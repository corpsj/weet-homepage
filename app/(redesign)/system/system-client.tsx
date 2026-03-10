"use client";

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Clock, Wrench, Home, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { BRAND_V2 } from '@/lib/constants';

const processSteps = [
  { num: '01', title: '상담', desc: '부지 조건, 용도, 예산을 파악하고 최적의 방향을 제안합니다' },
  { num: '02', title: '설계', desc: '요구사항에 맞는 맞춤 설계안을 제작합니다' },
  { num: '03', title: '제작', desc: '공장에서 정밀하게 모듈을 제작합니다' },
  { num: '04', title: '시공', desc: '현장에서 신속하게 설치·시공합니다' },
  { num: '05', title: '입주', desc: '최종 점검 후 입주를 지원합니다' },
];

const stats = [
  { value: '70%', label: '빠른 시공' },
  { value: '10년', label: '구조 보증' },
  { value: '100+', label: '시공 사례' },
  { value: '2년', label: '마감 A/S' },
];

export function SystemClient() {
  return (
    <div className="w-full">
      <section className="relative min-h-[60vh] bg-[#2D2D2A] flex flex-col items-center justify-center text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <nav className="flex items-center justify-center gap-2 text-sm text-white/40 mb-8">
              <Link href="/home" className="hover:text-white/70 transition-colors">홈</Link>
              <span>/</span>
              <span className="text-white/70">시스템건축</span>
            </nav>
            <h1 className="text-display text-white mb-6">{BRAND_V2.concept}</h1>
            <p className="text-body-lg text-white/70 max-w-2xl mx-auto">
              이동식주택과 현장건축을 아우르는 위트만의 건축 방식
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal direction="left">
              <div>
                <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">개념 소개</Badge>
                <h2 className="text-h2 text-foreground mb-6">시스템건축이란?</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    시스템건축은 공장에서 정밀하게 제작된 모듈을 현장에서 조립·시공하는 위트만의 건축 방식입니다. 전통적인 현장 건축의 한계를 극복하고, 빠른 시공과 균일한 품질을 동시에 실현합니다.
                  </p>
                  <p>
                    이동식주택과 현장건축, 두 가지 방향으로 제공되어 고객의 부지 조건과 용도에 맞는 최적의 솔루션을 찾을 수 있습니다.
                  </p>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="p-6 rounded-2xl bg-foreground/5 border border-border text-center">
                    <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-[#2D2D2A]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-h2 text-white mb-4">두 가지 방식</h2>
              <p className="text-body-lg text-white/60">용도와 부지에 맞는 방식을 선택하세요</p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ScrollReveal direction="left">
              <Card className="bg-white/5 border-white/10 text-white h-full overflow-hidden">
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <Image
                    src="/images/modular/main-image.webp"
                    alt="이동식주택"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4">
                    <Home className="h-6 w-6 text-primary" />
                  </div>
                  <Badge className="w-fit mb-2 bg-primary/20 text-primary border-primary/30">이동식주택</Badge>
                  <CardTitle className="text-xl text-white">공장 제작 · 현장 설치</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-white/70 text-sm mb-6">
                    <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />S·M·L·XL 사이즈 선택</li>
                    <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />농막·세컨하우스·단독주택</li>
                    <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />빠른 설치 (3주~3개월)</li>
                    <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />이동·재배치 가능</li>
                  </ul>
                  <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent rounded-full">
                    <Link href="/products-v2">제품 보기 <ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
                </CardContent>
              </Card>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <Card className="bg-white/5 border-white/10 text-white h-full overflow-hidden">
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <Image
                    src="/images/company/factory.webp"
                    alt="현장건축"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-4">
                    <Building2 className="h-6 w-6 text-white/70" />
                  </div>
                  <Badge className="w-fit mb-2 bg-white/10 text-white/80 border-white/20">현장건축</Badge>
                  <CardTitle className="text-xl text-white">대지 직접 시공</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-white/70 text-sm mb-6">
                    <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-white/50 flex-shrink-0" />자유로운 설계</li>
                    <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-white/50 flex-shrink-0" />대규모 프로젝트 가능</li>
                    <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-white/50 flex-shrink-0" />상업·주거 복합 시설</li>
                    <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-white/50 flex-shrink-0" />부지 맞춤 설계</li>
                  </ul>
                  <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent rounded-full">
                    <Link href="/projects-v2">시공사례 보기 <ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-h2 text-foreground mb-4">시공 프로세스</h2>
              <p className="text-body-lg text-muted-foreground">상담부터 입주까지 함께합니다</p>
            </div>
          </ScrollReveal>
          <div className="relative">
            <div className="hidden md:block absolute top-8 left-0 right-0 h-px bg-border" />
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {processSteps.map((step, i) => (
                <ScrollReveal key={step.num} delay={i * 0.1}>
                  <div className="flex flex-col items-center text-center md:items-start md:text-left">
                    <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center font-bold text-[#2D2D2A] text-lg mb-4 relative z-10">
                      {step.num}
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-primary">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="text-h2 text-[#2D2D2A] mb-4">시스템건축 상담 신청</h2>
            <p className="text-body-lg text-[#2D2D2A]/70 mb-10 max-w-xl mx-auto">
              어떤 공간을 원하시나요? 전문가가 최적의 방향을 제안해드립니다.
            </p>
            <Button asChild size="lg" className="bg-[#2D2D2A] text-white hover:bg-[#2D2D2A]/90 rounded-full px-10 h-14 text-base font-semibold">
              <Link href="/support-v2">상담 신청 <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}

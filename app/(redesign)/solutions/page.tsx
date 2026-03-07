"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Wifi, Camera, Zap, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

const solutions = [
  {
    icon: Wifi,
    title: '스마트홈 IoT',
    badge: 'IoT',
    desc: '조명, 냉난방, 보안을 스마트폰으로 제어하는 통합 스마트홈 시스템',
    features: ['원격 제어', '에너지 모니터링', '자동화 설정', '음성 인식 연동'],
  },
  {
    icon: Camera,
    title: '보안·CCTV',
    badge: 'CCTV',
    desc: '24시간 실시간 모니터링과 AI 기반 이상 감지 보안 시스템',
    features: ['HD 화질 카메라', '야간 촬영', '모션 감지', '클라우드 저장'],
  },
  {
    icon: Zap,
    title: '태양광 발전',
    badge: '에너지',
    desc: '자체 발전으로 전기료를 절감하고 친환경 생활을 실현하는 태양광 시스템',
    features: ['패널 설치', '배터리 저장', '잉여 전력 판매', '에너지 독립'],
  },
  {
    icon: Leaf,
    title: '친환경 설계',
    badge: '그린',
    desc: '단열, 환기, 자재 선택까지 환경을 고려한 지속 가능한 건축 솔루션',
    features: ['고성능 단열재', '열회수 환기', '친환경 자재', '탄소 저감'],
  },
];

export default function SolutionsPage() {
  return (
    <div className="w-full">
      <section className="relative min-h-[50vh] bg-[#2D2D2A] flex flex-col items-center justify-center text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <nav className="flex items-center justify-center gap-2 text-sm text-white/40 mb-8">
              <Link href="/home" className="hover:text-white/70 transition-colors">홈</Link>
              <span>/</span>
              <span className="text-white/70">솔루션</span>
            </nav>
            <h1 className="text-display text-white mb-6">솔루션</h1>
            <p className="text-body-lg text-white/70 max-w-2xl mx-auto">
              시스템건축에 더하는 스마트 솔루션으로 더 나은 생활을 만듭니다
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-h2 text-foreground mb-4">솔루션 라인업</h2>
              <p className="text-body-lg text-muted-foreground">건축과 기술이 만나는 스마트한 공간</p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {solutions.map((sol, i) => (
              <ScrollReveal key={sol.title} delay={i * 0.1}>
                <Card className="hover:shadow-lg transition-shadow border-border h-full">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <sol.icon className="h-6 w-6 text-primary" />
                      </div>
                      <Badge variant="secondary">{sol.badge}</Badge>
                    </div>
                    <CardTitle className="text-xl">{sol.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-5 leading-relaxed">{sol.desc}</p>
                    <ul className="grid grid-cols-2 gap-2">
                      {sol.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-primary">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="text-h2 text-[#2D2D2A] mb-4">솔루션 상담 신청</h2>
            <p className="text-body-lg text-[#2D2D2A]/70 mb-10 max-w-xl mx-auto">
              어떤 솔루션이 필요하신지 알려주시면 맞춤 제안을 드립니다
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

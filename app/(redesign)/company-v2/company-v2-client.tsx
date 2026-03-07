"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { COMPANY, BRAND_V2 } from '@/lib/constants';

const values = [
  { title: '혁신', desc: '전통 건축의 한계를 넘어 새로운 방식으로 공간을 만듭니다' },
  { title: '품질', desc: '공장 제어 환경에서 균일하고 높은 품질을 보장합니다' },
  { title: '신뢰', desc: '투명한 소통과 약속을 지키는 파트너십을 추구합니다' },
  { title: '지속가능성', desc: '환경을 생각하는 친환경 건축으로 미래를 만듭니다' },
];

const milestones = [
  { year: '2019', event: '위트(weet) 창업' },
  { year: '2020', event: '첫 이동식주택 시공 완료' },
  { year: '2021', event: '체류형 쉼터 라인업 출시' },
  { year: '2022', event: '시공 사례 50건 달성' },
  { year: '2023', event: '현장건축 서비스 확장' },
  { year: '2024', event: '시스템건축 브랜드 리뉴얼' },
];

export function CompanyV2Client() {
  return (
    <div className="w-full">
      <section className="relative min-h-[55vh] bg-[#2D2D2A] flex flex-col items-center justify-center text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <nav className="flex items-center justify-center gap-2 text-sm text-white/40 mb-8">
              <Link href="/home" className="hover:text-white/70 transition-colors">홈</Link>
              <span>/</span>
              <span className="text-white/70">회사소개</span>
            </nav>
            <h1 className="text-display text-white mb-6">회사소개</h1>
            <p className="text-body-lg text-white/70 max-w-2xl mx-auto">
              {BRAND_V2.tagline}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
            <ScrollReveal direction="left">
              <div>
                <h2 className="text-h2 text-foreground mb-6">위트(weet)는</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    위트(weet)는 시스템건축 전문 기업으로, 이동식주택과 현장건축을 통해 더 나은 삶의 공간을 만들어갑니다.
                  </p>
                  <p>
                    공장 제작의 정밀함과 현장 시공의 유연함을 결합한 위트만의 시스템건축으로, 빠르고 균일한 품질의 건축을 실현합니다.
                  </p>
                  <p>
                    농막부터 단독주택, 상업시설까지 다양한 용도의 공간을 고객의 요구에 맞게 제작합니다.
                  </p>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: '100+', label: '시공 사례' },
                  { value: '5년+', label: '업력' },
                  { value: '10년', label: '구조 보증' },
                  { value: '98%', label: '고객 만족도' },
                ].map((stat) => (
                  <div key={stat.label} className="p-6 rounded-2xl bg-foreground/5 border border-border text-center">
                    <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-h2 text-foreground mb-4">핵심 가치</h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-24">
            {values.map((v, i) => (
              <ScrollReveal key={v.title} delay={i * 0.1}>
                <Card className="border-border h-full">
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-semibold text-foreground mb-3">{v.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-h2 text-foreground mb-4">연혁</h2>
            </div>
          </ScrollReveal>
          <div className="max-w-2xl mx-auto mb-24">
            {milestones.map((m, i) => (
              <ScrollReveal key={m.year} delay={i * 0.07}>
                <div className="flex gap-6 pb-8 last:pb-0 relative">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    {i < milestones.length - 1 && <div className="w-px flex-1 bg-border mt-2" />}
                  </div>
                  <div className="pb-2">
                    <span className="text-sm font-bold text-primary">{m.year}</span>
                    <p className="text-foreground mt-1">{m.event}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-h2 text-foreground mb-4">연락처</h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { icon: Phone, label: '전화', value: COMPANY.phone, href: COMPANY.phoneHref },
              { icon: Mail, label: '이메일', value: COMPANY.email, href: COMPANY.emailHref },
              { icon: MapPin, label: '주소', value: COMPANY.address, href: '#' },
            ].map((item) => (
              <ScrollReveal key={item.label}>
                <Card className="border-border">
                  <CardContent className="pt-6 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
                      <a href={item.href} className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                        {item.value}
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { cn } from '@/lib/utils';

const projects = [
  { id: 1, name: '전남 함평 단독주택', location: '전남 함평군', size: '54㎡', category: '단독주택', year: '2024', image: '/images/products/large/L-1.webp' },
  { id: 2, name: '경기 양평 세컨하우스', location: '경기 양평군', size: '27㎡', category: '세컨하우스', year: '2024', image: '/images/products/medium/36+36집-1.webp' },
  { id: 3, name: '제주 서귀포 카페', location: '제주 서귀포시', size: '72㎡', category: '상업시설', year: '2023', image: '/images/bespoke/small-cafe-v2.webp' },
  { id: 4, name: '강원 홍천 농막', location: '강원 홍천군', size: '18㎡', category: '농막', year: '2023', image: '/images/products/small/private/3x6-house.webp' },
  { id: 5, name: '충남 태안 세컨하우스', location: '충남 태안군', size: '36㎡', category: '세컨하우스', year: '2023', image: '/images/products/medium/39+33서재.webp' },
  { id: 6, name: '경북 안동 단독주택', location: '경북 안동시', size: '66㎡', category: '단독주택', year: '2024', image: '/images/products/large/L-2.webp' },
];

const categories = ['전체', '단독주택', '세컨하우스', '상업시설', '농막'];

const processSteps = [
  { num: '01', title: '상담', desc: '부지 조건과 요구사항을 파악합니다' },
  { num: '02', title: '부지 확인', desc: '현장 방문 및 부지 조건을 분석합니다' },
  { num: '03', title: '설계', desc: '맞춤 설계안을 제작합니다' },
  { num: '04', title: '시공', desc: '전문 팀이 현장에서 시공합니다' },
  { num: '05', title: '준공', desc: '최종 점검 후 준공합니다' },
];

export function ProjectsV2Client() {
  const [activeCategory, setActiveCategory] = useState('전체');

  const filtered = activeCategory === '전체'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <div className="w-full">
      <section className="relative min-h-[50vh] bg-[#2D2D2A] flex flex-col items-center justify-center text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <nav className="flex items-center justify-center gap-2 text-sm text-white/40 mb-8">
              <Link href="/home" className="hover:text-white/70 transition-colors">홈</Link>
              <span>/</span>
              <span className="text-white/70">시공사례</span>
            </nav>
            <h1 className="text-display text-white mb-6">시공사례</h1>
            <p className="text-body-lg text-white/70 max-w-2xl mx-auto">
              현장건축 포트폴리오 — 위트가 만든 공간들
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex flex-wrap gap-2 mb-12 justify-center">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    'px-5 py-2 rounded-full text-sm font-medium transition-colors border',
                    activeCategory === cat
                      ? 'bg-primary text-[#2D2D2A] border-primary'
                      : 'bg-background text-muted-foreground border-border hover:border-primary hover:text-foreground'
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project, i) => (
              <ScrollReveal key={project.id} delay={i * 0.06}>
                <Card className="group overflow-hidden hover:shadow-lg transition-shadow border-border">
                  <div className="aspect-video bg-gray-100 relative overflow-hidden">
                     <Image
                       src={project.image}
                       alt={project.name}
                       fill
                       className="object-cover group-hover:scale-105 transition-transform duration-500"
                       sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                     />
                     <div className="absolute top-3 left-3">
                       <Badge className="bg-primary text-[#2D2D2A] border-0 text-xs">{project.category}</Badge>
                     </div>
                   </div>
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {project.name}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />{project.location}
                      </span>
                      <span>{project.size}</span>
                      <span>{project.year}</span>
                    </div>
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
              <h2 className="text-h2 text-white mb-4">현장건축 진행 과정</h2>
              <p className="text-body-lg text-white/60">상담부터 준공까지 전 과정을 함께합니다</p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {processSteps.map((step, i) => (
              <ScrollReveal key={step.num} delay={i * 0.1}>
                <div className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center font-bold text-[#2D2D2A] text-base mb-4">
                    {step.num}
                  </div>
                  <h3 className="font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-white/60 leading-relaxed">{step.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-primary">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="text-h2 text-[#2D2D2A] mb-4">현장건축 상담 신청</h2>
            <p className="text-body-lg text-[#2D2D2A]/70 mb-10 max-w-xl mx-auto">
              부지 조건과 요구사항을 알려주시면 맞춤 제안을 드립니다
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

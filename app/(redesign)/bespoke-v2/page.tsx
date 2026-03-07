"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Palette, Ruler, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

const useCases = [
  { title: '카페·음료', desc: '독특한 공간감으로 차별화된 카페 경험' },
  { title: '팝업스토어', desc: '브랜드 아이덴티티를 담은 임시 매장' },
  { title: '스마트팜', desc: '농업 생산성을 높이는 맞춤 시설' },
  { title: '사무공간', desc: '효율적인 업무 환경을 위한 모듈 오피스' },
  { title: '게스트하우스', desc: '수익형 숙박 시설로 활용' },
  { title: '갤러리·전시', desc: '예술 작품을 위한 특별한 공간' },
];

const steps = [
  { icon: MessageSquare, title: '요구사항 상담', desc: '용도, 부지, 예산, 디자인 방향을 파악합니다' },
  { icon: Ruler, title: '맞춤 설계', desc: '전문 설계팀이 최적의 설계안을 제안합니다' },
  { icon: Palette, title: '디자인 확정', desc: '3D 렌더링으로 최종 디자인을 확인합니다' },
  { icon: CheckCircle, title: '제작·시공', desc: '확정된 설계대로 정밀하게 제작·시공합니다' },
];

export default function BespokePage() {
  const [formState, setFormState] = useState({ name: '', phone: '', purpose: '', budget: '', message: '', submitted: false });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState((p) => ({ ...p, submitted: true }));
  };

  return (
    <div className="w-full">
      <section className="relative min-h-[55vh] bg-[#2D2D2A] flex flex-col items-center justify-center text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <nav className="flex items-center justify-center gap-2 text-sm text-white/40 mb-8">
              <Link href="/home" className="hover:text-white/70 transition-colors">홈</Link>
              <span>/</span>
              <span className="text-white/70">비스포크</span>
            </nav>
            <Badge className="mb-6 bg-primary/20 text-primary border-primary/30">맞춤 설계</Badge>
            <h1 className="text-display text-white mb-6">비스포크</h1>
            <p className="text-body-lg text-white/70 max-w-2xl mx-auto">
              당신만의 공간을 완전 맞춤 설계로 완성합니다
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-h2 text-foreground mb-4">활용 사례</h2>
              <p className="text-body-lg text-muted-foreground">다양한 용도로 맞춤 제작이 가능합니다</p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
            {useCases.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.07}>
                <Card className="hover:shadow-md transition-shadow border-border h-full">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-h2 text-foreground mb-4">비스포크 진행 과정</h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {steps.map((step, i) => (
              <ScrollReveal key={step.title} delay={i * 0.1}>
                <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-foreground/5 border border-border">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                    <step.icon className="h-7 w-7 text-primary" />
                  </div>
                  <div className="text-xs font-bold text-primary mb-2">0{i + 1}</div>
                  <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div className="max-w-2xl mx-auto">
              <h2 className="text-h2 text-foreground mb-8 text-center">견적 문의</h2>
              {formState.submitted ? (
                <div className="p-10 rounded-2xl bg-primary/10 border border-primary/20 text-center">
                  <div className="text-5xl mb-4">✓</div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">문의가 접수되었습니다</h3>
                  <p className="text-muted-foreground">전문 상담사가 1-2 영업일 내에 연락드리겠습니다.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="bespoke-name" className="text-sm font-medium text-foreground mb-1.5 block">이름 <span className="text-destructive">*</span></label>
                      <Input id="bespoke-name" placeholder="홍길동" value={formState.name} onChange={(e) => setFormState((p) => ({ ...p, name: e.target.value }))} required className="h-12" />
                    </div>
                    <div>
                      <label htmlFor="bespoke-phone" className="text-sm font-medium text-foreground mb-1.5 block">연락처 <span className="text-destructive">*</span></label>
                      <Input id="bespoke-phone" placeholder="010-0000-0000" value={formState.phone} onChange={(e) => setFormState((p) => ({ ...p, phone: e.target.value }))} required className="h-12" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="bespoke-purpose" className="text-sm font-medium text-foreground mb-1.5 block">용도</label>
                    <Select onValueChange={(v) => setFormState((p) => ({ ...p, purpose: v }))}>
                      <SelectTrigger id="bespoke-purpose" className="h-12">
                        <SelectValue placeholder="용도를 선택해주세요" />
                      </SelectTrigger>
                      <SelectContent>
                        {useCases.map((u) => <SelectItem key={u.title} value={u.title}>{u.title}</SelectItem>)}
                        <SelectItem value="기타">기타</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label htmlFor="bespoke-message" className="text-sm font-medium text-foreground mb-1.5 block">요구사항</label>
                    <Textarea id="bespoke-message" placeholder="원하시는 공간에 대해 자유롭게 설명해주세요" value={formState.message} onChange={(e) => setFormState((p) => ({ ...p, message: e.target.value }))} rows={5} className="resize-none" />
                  </div>
                  <Button type="submit" size="lg" className="w-full bg-primary text-[#2D2D2A] hover:bg-primary/90 rounded-full h-14 text-base font-semibold">
                    견적 문의하기
                  </Button>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}

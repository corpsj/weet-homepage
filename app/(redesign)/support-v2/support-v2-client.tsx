"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Phone, Mail, MessageCircle, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { COMPANY } from '@/lib/constants';
import { cn } from '@/lib/utils';

const faqs = [
  { q: '시스템건축과 일반 건축의 차이는 무엇인가요?', a: '시스템건축은 공장에서 정밀하게 제작된 모듈을 현장에서 조립하는 방식으로, 일반 건축 대비 70% 빠른 시공과 균일한 품질을 보장합니다. 날씨나 현장 변수에 영향을 덜 받아 예측 가능한 공사 기간과 비용을 제공합니다.' },
  { q: '이동식주택은 건축 허가가 필요한가요?', a: '33㎡ 이하의 체류형 쉼터는 건축 허가 없이 설치할 수 있습니다. 그 이상의 규모는 용도와 부지에 따라 허가 여부가 달라지므로, 상담을 통해 정확한 안내를 받으시기 바랍니다.' },
  { q: '시공 기간은 얼마나 걸리나요?', a: '모델과 규모에 따라 다르지만, 이동식주택은 3주~3개월, 현장건축은 2~6개월 정도 소요됩니다. 공장 제작과 현장 작업을 병행하기 때문에 일반 건축보다 훨씬 빠릅니다.' },
  { q: 'A/S는 어떻게 제공되나요?', a: '구조 10년, 마감·설비 2년 무상 A/S를 제공합니다. 이후에도 유상 케어 서비스를 통해 지속적인 관리를 받으실 수 있습니다.' },
  { q: '농지나 임야에 설치할 수 있나요?', a: '33㎡ 이하 체류형 쉼터는 농지·임야에도 설치 가능합니다. 단, 부지 조건과 지역 규정에 따라 다를 수 있으므로 상담을 통해 확인해 드립니다.' },
  { q: '맞춤 설계가 가능한가요?', a: '네, 비스포크 서비스를 통해 완전 맞춤 설계가 가능합니다. 카페, 팝업스토어, 스마트팜 등 다양한 용도로 제작할 수 있습니다.' },
];

const contactMethods = [
  { icon: Phone, title: '전화 상담', desc: '평일 09:00 - 18:00', value: COMPANY.phone, href: COMPANY.phoneHref, label: '전화하기' },
  { icon: MessageCircle, title: '카카오톡 상담', desc: '24시간 문의 가능', value: '카카오톡 채널', href: 'https://pf.kakao.com/_xnxkxnxn', label: '카카오톡 열기' },
  { icon: Mail, title: '이메일 문의', desc: '1-2 영업일 내 답변', value: COMPANY.email, href: COMPANY.emailHref, label: '이메일 보내기' },
];

export function SupportV2Client() {
  const [formState, setFormState] = useState({ name: '', phone: '', email: '', message: '', submitted: false });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState((prev) => ({ ...prev, submitted: true }));
  };

  return (
    <div className="w-full">
      <section className="relative min-h-[50vh] bg-[#2D2D2A] flex flex-col items-center justify-center text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <nav className="flex items-center justify-center gap-2 text-sm text-white/40 mb-8">
              <Link href="/home" className="hover:text-white/70 transition-colors">홈</Link>
              <span>/</span>
              <span className="text-white/70">고객지원</span>
            </nav>
            <h1 className="text-display text-white mb-6">고객지원</h1>
            <p className="text-body-lg text-white/70 max-w-2xl mx-auto">
              궁금한 점이 있으시면 언제든지 문의해주세요
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-h2 text-foreground mb-4">상담 방법</h2>
              <p className="text-body-lg text-muted-foreground">편한 방법으로 연락해주세요</p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            {contactMethods.map((method, i) => (
              <ScrollReveal key={method.title} delay={i * 0.1}>
                <Card className="text-center hover:shadow-md transition-shadow border-border h-full">
                  <CardHeader className="pb-4">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <method.icon className="h-7 w-7 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{method.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{method.desc}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="font-medium text-foreground mb-4">{method.value}</p>
                    <Button asChild variant="outline" className="rounded-full border-primary text-primary hover:bg-primary hover:text-[#2D2D2A] transition-colors">
                      <a href={method.href} target={method.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
                        {method.label}
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <ScrollReveal direction="left">
              <div>
                <h2 className="text-h2 text-foreground mb-8">상담 신청</h2>
                {formState.submitted ? (
                  <div className="p-8 rounded-2xl bg-primary/10 border border-primary/20 text-center">
                    <div className="text-4xl mb-4">✓</div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">문의가 접수되었습니다</h3>
                    <p className="text-muted-foreground">1-2 영업일 내에 연락드리겠습니다.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="inquiry-name" className="text-sm font-medium text-foreground mb-1.5 block">이름 <span className="text-destructive">*</span></label>
                        <Input id="inquiry-name" placeholder="홍길동" value={formState.name} onChange={(e) => setFormState((p) => ({ ...p, name: e.target.value }))} required className="h-12" />
                      </div>
                      <div>
                        <label htmlFor="inquiry-phone" className="text-sm font-medium text-foreground mb-1.5 block">연락처 <span className="text-destructive">*</span></label>
                        <Input id="inquiry-phone" placeholder="010-0000-0000" value={formState.phone} onChange={(e) => setFormState((p) => ({ ...p, phone: e.target.value }))} required className="h-12" />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="inquiry-email" className="text-sm font-medium text-foreground mb-1.5 block">이메일</label>
                      <Input id="inquiry-email" type="email" placeholder="example@email.com" value={formState.email} onChange={(e) => setFormState((p) => ({ ...p, email: e.target.value }))} className="h-12" />
                    </div>
                    <div>
                      <label htmlFor="inquiry-message" className="text-sm font-medium text-foreground mb-1.5 block">문의 내용 <span className="text-destructive">*</span></label>
                      <Textarea id="inquiry-message" placeholder="궁금한 점이나 요청사항을 자유롭게 작성해주세요" value={formState.message} onChange={(e) => setFormState((p) => ({ ...p, message: e.target.value }))} required rows={5} className="resize-none" />
                    </div>
                    <Button type="submit" size="lg" className="w-full bg-primary text-[#2D2D2A] hover:bg-primary/90 rounded-full h-14 text-base font-semibold">
                      상담 신청하기
                    </Button>
                    <p className="text-xs text-muted-foreground text-center">
                      제출 시 개인정보 처리방침에 동의하는 것으로 간주됩니다.
                    </p>
                  </form>
                )}
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div>
                <h2 className="text-h2 text-foreground mb-8">자주 묻는 질문</h2>
                <Accordion type="single" collapsible className="space-y-2">
                  {faqs.map((faq) => (
                    <AccordionItem key={faq.q} value={faq.q} className="border border-border rounded-xl px-4 data-[state=open]:border-primary/30">
                      <AccordionTrigger className="text-left text-sm font-medium py-4 hover:no-underline">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}

'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Palette, Users, Expand, Gem, ArrowRight } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { MicroInteraction } from '@/components/ui/MicroInteraction';
import { cn } from '@/lib/utils';

const features = [
  { icon: Palette, title: '무한한 디자인', desc: '부지의 형태, 용도, 스타일에 구애받지 않는 완전한 설계의 자유.' },
  { icon: Users, title: '1:1 맞춤 전문가', desc: '아이디어 구상부터 완공까지, 전문가가 함께하며 모든 디테일을 구현합니다.' },
  { icon: Expand, title: '유연한 확장성', desc: '모듈 단위 확장·이동이 가능해 비즈니스 변화에 유연하게 대응합니다.' },
  { icon: Gem, title: '최상급 마감', desc: '기본을 넘어, 당신의 기준에 맞는 최상급 자재와 마감 공법을 선택할 수 있습니다.' },
];

const cases = [
  {
    badge: 'COMMERCIAL',
    title: 'SMALL CAFE',
    quote: '카페는 커피 맛 이전에, 공간의 경험으로 먼저 기억됩니다.',
    body: '운영 효율과 심미성이 완벽히 공존하는 1:1 맞춤형 상업 공간. 브랜드 스토리를 오감으로 경험하는 감각적인 공간 언어로 풀어냅니다.',
    gradient: 'from-amber-200 to-orange-300',
  },
  {
    badge: 'RETAIL & EVENT',
    title: 'POP-UP STORE',
    quote: '브랜드 경험을 원하는 곳, 어디로든 옮기다.',
    body: '빠른 설치와 철거, 완벽한 브랜딩 구현, 이동성까지. 정해진 장소에 얽매이지 않는 스마트한 비즈니스 솔루션.',
    gradient: 'from-violet-200 to-purple-300',
  },
  {
    badge: 'AGRITECH',
    title: 'SMART FARM',
    quote: '데이터가 수확이 되는, 농업의 미래를 짓다.',
    body: '완벽한 단열과 기밀성을 갖춘 모듈 구조 위에 환경 제어와 데이터 인프라를 통합합니다.',
    gradient: 'from-emerald-200 to-green-300',
  },
];

const process = [
  { step: '01', title: '상담', desc: '비전과 요구사항을 듣습니다' },
  { step: '02', title: '기획', desc: '부지 분석 + 컨셉 설계' },
  { step: '03', title: '설계', desc: '맞춤 도면 + 견적 확정' },
  { step: '04', title: '제작', desc: '공장에서 정밀 제작' },
  { step: '05', title: '완성', desc: '현장 설치 + 마감' },
];

export default function BespokeRedesignPage() {
  return (
    <>
      <section className="relative flex min-h-[60vh] items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4">
        <div className="relative text-center max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#FEBD16]"
          >
            BESPOKE BY WEET
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl font-bold text-white md:text-6xl"
          >
            당신만의 집, 처음부터 끝까지
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-lg text-white/60 md:text-xl"
          >
            검증된 모듈러 기술 위에 당신의 비전을 얹습니다
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            <Link
              href="/quote"
              className="mt-8 inline-flex min-h-[44px] items-center justify-center rounded-full bg-[#FEBD16] px-8 py-3.5 font-semibold text-black transition-colors hover:bg-[#E5A410]"
            >
              맞춤 상담 신청
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-4">
          <ScrollReveal>
            <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 md:text-4xl">
              비스포크가 특별한 이유
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <ScrollReveal key={f.title} delay={i * 0.1}>
                  <MicroInteraction hover="lift">
                    <div className="flex items-start gap-4 rounded-2xl border border-gray-200 p-6 transition-shadow hover:shadow-md">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[#FEBD16]/10">
                        <Icon className="h-6 w-6 text-[#FEBD16]" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{f.title}</h3>
                        <p className="mt-1 text-sm text-gray-500 leading-relaxed">{f.desc}</p>
                      </div>
                    </div>
                  </MicroInteraction>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-4">
          <ScrollReveal>
            <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 md:text-4xl">
              이런 공간도 만들 수 있어요
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {cases.map((c, i) => (
              <ScrollReveal key={c.title} delay={i * 0.1}>
                <div className="overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-md">
                  <div className={cn('h-48 bg-gradient-to-br', c.gradient)} />
                  <div className="p-6">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#FEBD16]">{c.badge}</span>
                    <h3 className="mt-2 text-xl font-bold text-gray-900">{c.title}</h3>
                    <p className="mt-2 text-sm font-medium text-gray-700 italic">&ldquo;{c.quote}&rdquo;</p>
                    <p className="mt-3 text-sm text-gray-500 leading-relaxed">{c.body}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-4">
          <ScrollReveal>
            <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 md:text-4xl">
              비스포크 프로세스
            </h2>
          </ScrollReveal>
          <div className="flex flex-col gap-0">
            {process.map((p, i) => (
              <ScrollReveal key={p.step} delay={i * 0.08}>
                <div className="flex items-center gap-6 border-b border-gray-100 py-6">
                  <span className="text-3xl font-bold text-[#FEBD16] md:text-4xl">{p.step}</span>
                  <div>
                    <h3 className="font-bold text-gray-900">{p.title}</h3>
                    <p className="text-sm text-gray-500">{p.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-900 py-24 md:py-32">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              세상에 하나뿐인 공간, 위트가 만들어드릴게요
            </h2>
            <p className="mt-4 text-white/60">
              어떤 공간이든 편하게 상담해주세요
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/quote"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[#FEBD16] px-8 py-3.5 font-semibold text-black transition-colors hover:bg-[#E5A410]"
              >
                맞춤 견적 받기 <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/support-v2"
                className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-gray-600 px-8 py-3.5 font-semibold text-white transition-colors hover:bg-gray-800"
              >
                문의하기
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}

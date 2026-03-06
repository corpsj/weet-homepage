'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ScrollStorySection } from '@/components/sections/ScrollStorySection';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { CheckCircle2, ChevronDown, PenTool, Factory, Truck, Wrench, PaintBucket, Home } from 'lucide-react';

export default function ModularPage() {
  const storyItems = [
    {
      type: 'text' as const,
      heading: '모듈러 건축이 뭐예요?',
      content: '공장에서 모듈을 만들고, 현장에서 조립하는 건축 방식이에요. 레고 블록처럼, 하지만 진짜 집이에요.',
    },
    {
      type: 'stat' as const,
      heading: '얼마나 걸려요?',
      content: '설계부터 입주까지, 일반 건축의 1/3 시간',
      stat: { value: 3, suffix: '개월', label: '공사 기간' },
    },
    {
      type: 'stat' as const,
      heading: '튼튼한가요?',
      content: '내구성 50년. 철골 구조로 지진에도 안전해요',
      stat: { value: 50, suffix: '년', label: '내구성' },
    },
    {
      type: 'text' as const,
      heading: '환경에 좋은가요?',
      content: '건축 폐기물 70% 감소. 공장 제작으로 자원 낭비를 최소화해요',
    },
  ];

  const timelineSteps = [
    { icon: PenTool, title: '설계', desc: '고객의 니즈를 반영한 최적의 설계' },
    { icon: Factory, title: '공장 제작', desc: '날씨 영향 없는 실내에서 정밀하게 제작' },
    { icon: Truck, title: '운송', desc: '안전하게 현장으로 모듈 운송' },
    { icon: Wrench, title: '현장 설치', desc: '레고 블록처럼 빠르고 견고하게 조립' },
    { icon: PaintBucket, title: '마감', desc: '내외부 디테일 마감 작업' },
    { icon: Home, title: '입주', desc: '모든 점검을 마치고 입주 시작' },
  ];

  const comparisonData = [
    { label: '공사 기간', modular: '3개월', traditional: '6~12개월' },
    { label: '공사비', modular: '합리적', traditional: '변동 큼' },
    { label: '품질 관리', modular: '공장 제어', traditional: '현장 의존' },
    { label: '건축 폐기물', modular: '70% 감소', traditional: '많음' },
  ];

  return (
    <div className="flex flex-col w-full">
      {/* 1. Hero Section */}
      <section className="relative flex h-[70vh] min-h-[600px] w-full flex-col items-center justify-center overflow-hidden bg-gray-900 px-4 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="z-10 flex flex-col items-center"
        >
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            공장에서 태어난 집
          </h1>
          <p className="mt-6 text-lg text-gray-300 sm:text-xl md:text-2xl">
            모듈러 건축, 집을 짓는 새로운 방법
          </p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
        >
          <span className="mb-2 text-sm text-gray-400">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          >
            <ChevronDown className="h-6 w-6 text-gray-400" />
          </motion.div>
        </motion.div>
      </section>

      {/* 2. Q&A Scroll Story */}
      <ScrollStorySection items={storyItems} className="bg-white" />

      {/* 3. Construction Timeline */}
      <section className="bg-gray-50 py-24 md:py-32">
        <div className="mx-auto max-w-[1200px] px-4 md:px-8">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl">제작 과정</h2>
            <p className="mt-4 text-lg text-gray-600">설계부터 입주까지, 빠르고 체계적인 프로세스</p>
          </div>

          <div className="relative mx-auto max-w-3xl">
            {/* Vertical Line */}
            <div className="absolute bottom-0 left-[27px] top-4 w-px bg-gray-200 md:left-1/2 md:-ml-px" />

            <div className="space-y-12 md:space-y-0">
              {timelineSteps.map((step, index) => {
                const Icon = step.icon;
                const isEven = index % 2 === 0;

                return (
                  <ScrollReveal key={step.title} delay={index * 0.1} className="relative">
                    <div className="flex items-start md:items-center">
                      <div className={`hidden w-1/2 pr-12 text-right md:block ${!isEven ? 'md:hidden' : ''}`}>
                        {isEven && (
                          <>
                            <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                            <p className="mt-2 text-gray-600">{step.desc}</p>
                          </>
                        )}
                      </div>

                      <div className="absolute left-0 flex h-14 w-14 items-center justify-center rounded-full border-4 border-gray-50 bg-primary text-white md:relative md:left-auto md:mx-auto">
                        <Icon className="h-6 w-6" />
                      </div>

                      <div className={`ml-20 md:ml-0 md:w-1/2 md:pl-12 ${isEven ? 'md:hidden' : ''}`}>
                        {(!isEven || true) && (
                          <div className={isEven ? 'md:hidden' : ''}>
                            <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                            <p className="mt-2 text-gray-600">{step.desc}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 4. vs 일반 건축 Comparison */}
      <section className="bg-white py-24 md:py-32">
        <div className="mx-auto max-w-[1000px] px-4 md:px-8">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl">왜 모듈러 건축인가요?</h2>
            <p className="mt-4 text-lg text-gray-600">일반 건축 방식과의 확실한 차이</p>
          </div>

          <ScrollReveal delay={0.2}>
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="grid grid-cols-3 border-b border-gray-200 bg-gray-50 text-center text-sm font-semibold text-gray-900 md:text-base">
                <div className="p-4 md:p-6">항목</div>
                <div className="bg-primary/5 p-4 text-primary md:p-6">모듈러 건축</div>
                <div className="p-4 md:p-6">일반 건축</div>
              </div>

              {comparisonData.map((row, i) => (
                <div
                  key={row.label}
                  className={`grid grid-cols-3 text-center text-sm md:text-base ${
                    i !== comparisonData.length - 1 ? 'border-b border-gray-100' : ''
                  }`}
                >
                  <div className="flex items-center justify-center p-4 font-medium text-gray-900 md:p-6">
                    {row.label}
                  </div>
                  <div className="flex items-center justify-center bg-primary/5 p-4 font-semibold text-gray-900 md:p-6">
                    {row.modular}
                  </div>
                  <div className="flex items-center justify-center p-4 text-gray-500 md:p-6">
                    {row.traditional}
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 5. CTA */}
      <section className="bg-gray-900 py-24 text-center text-white md:py-32">
        <ScrollReveal>
          <div className="mx-auto max-w-[800px] px-4">
            <h2 className="text-3xl font-bold md:text-4xl lg:text-5xl">모듈러로 시작하기</h2>
            <p className="mt-6 text-lg text-gray-300 md:text-xl">
              위트와 함께 새로운 공간을 만들어보세요.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/support-v2"
                className="inline-flex h-14 items-center justify-center rounded-full bg-primary px-8 text-base font-semibold text-white transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                상담 신청하기
              </Link>
              <Link
                href="/quote"
                className="inline-flex h-14 items-center justify-center rounded-full border border-gray-600 bg-transparent px-8 text-base font-semibold text-white transition-colors hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                또는 견적 받아보기
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}

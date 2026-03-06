'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Shield, Globe, Smartphone, PenTool, ArrowRight } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

const solutions = [
  {
    icon: Shield,
    title: '시큐리티',
    subtitle: 'Security',
    desc: '24시간 스마트 보안 서비스로 자산과 공간을 안전하게 지킵니다.',
    detail: 'CCTV · 출입 감시 · 실시간 알림',
    href: '/solution/cctv',
    gradient: 'from-blue-500 to-indigo-600',
  },
  {
    icon: Globe,
    title: '네트워크 솔루션',
    subtitle: 'Network Solution',
    desc: '어디서든 끊김 없는 고성능 인터넷과 와이파이를 제공합니다.',
    detail: '고성능 인터넷 · 메시 Wi-Fi',
    href: '/solution/network',
    gradient: 'from-emerald-500 to-teal-600',
  },
  {
    icon: Smartphone,
    title: 'IoT 솔루션',
    subtitle: 'Smart Home IoT',
    desc: '조명·환경을 스마트하게 제어해 편리한 생활을 완성합니다.',
    detail: '스마트 조명 · 환경 센서 · 실시간 제어',
    href: '/solution/iot',
    gradient: 'from-violet-500 to-purple-600',
  },
  {
    icon: PenTool,
    title: '디자인 컨설팅',
    subtitle: 'Interior Design',
    desc: '브랜드와 라이프스타일에 맞춘 맞춤형 공간 설계를 제안합니다.',
    detail: '인테리어 · 조경 · 가구 큐레이션',
    href: '/solution/design',
    gradient: 'from-amber-500 to-orange-600',
  },
];

export default function SolutionRedesignPage() {
  return (
    <>
      <section className="relative flex min-h-[50vh] items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4">
        <div className="relative text-center max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#FEBD16]"
          >
            WEET SOLUTION
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl font-bold text-white md:text-6xl"
          >
            집을 넘어, 라이프스타일까지
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-lg text-white/60 md:text-xl"
          >
            보안, 네트워크, IoT, 디자인 — 위트의 통합 솔루션
          </motion.p>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {solutions.map((s, i) => {
              const Icon = s.icon;
              return (
                <ScrollReveal key={s.title} delay={i * 0.1}>
                  <div className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all hover:border-[#FEBD16]/50 hover:shadow-lg">
                    <div className={`flex h-32 items-center justify-center bg-gradient-to-br ${s.gradient}`}>
                      <Icon className="h-12 w-12 text-white" aria-hidden="true" />
                    </div>
                    <div className="p-6">
                      <div className="mb-1 flex items-baseline gap-2">
                        <h3 className="text-xl font-bold text-gray-900">{s.title}</h3>
                        <span className="text-xs text-gray-400">{s.subtitle}</span>
                      </div>
                      <p className="mt-2 text-sm text-gray-600 leading-relaxed">{s.desc}</p>
                      <p className="mt-3 text-xs font-medium text-gray-400">{s.detail}</p>
                      <Link
                        href={s.href}
                        className="mt-4 inline-flex min-h-[44px] items-center gap-1 text-sm font-semibold text-[#FEBD16] transition-colors hover:text-[#E5A410]"
                      >
                        자세히 보기 <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <ScrollReveal>
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
              왜 위트 솔루션인가요?
            </h2>
            <p className="text-gray-600 leading-relaxed">
              위트의 모듈러 건축은 단순한 구조물이 아닙니다.
              보안, 네트워크, 스마트홈, 디자인까지 — 공간이 완성되는 순간부터 바로 생활할 수 있도록
              통합 솔루션을 함께 제공합니다. 별도 업체 찾을 필요 없이, 한 번에 해결하세요.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <div className="mt-8 grid grid-cols-3 gap-6">
              <div>
                <p className="text-3xl font-bold text-gray-900">원스톱</p>
                <p className="mt-1 text-sm text-gray-500">통합 시공</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">맞춤형</p>
                <p className="mt-1 text-sm text-gray-500">공간별 최적화</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">A/S</p>
                <p className="mt-1 text-sm text-gray-500">지속 케어</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-gray-900 py-24 md:py-32">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              어떤 솔루션이 필요하세요?
            </h2>
            <p className="mt-4 text-white/60">
              위트가 맞춤 솔루션을 제안해드릴게요
            </p>
            <Link
              href="/support-v2"
              className="mt-8 inline-flex min-h-[44px] items-center justify-center rounded-full bg-[#FEBD16] px-8 py-3.5 font-semibold text-black transition-colors hover:bg-[#E5A410]"
            >
              솔루션 상담 신청
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}

'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Building2, Users, MapPin, Phone, Mail, Award, Heart, Target } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { CountUp } from '@/components/ui/CountUp';
import { COMPANY } from '@/lib/constants';

const stats = [
  { value: 50, suffix: '+', label: '시공 완료' },
  { value: 5, suffix: '년+', label: '업력' },
  { value: 98, suffix: '%', label: '고객 만족' },
];

const values = [
  {
    icon: Target,
    title: '정직한 가격',
    desc: '거품 없는 합리적 가격. 불필요한 중간 마진을 제거하고 공장 직접 제작으로 비용을 절감합니다.',
  },
  {
    icon: Award,
    title: '꼼꼼한 시공',
    desc: '공장 QC 기반 품질 관리. 날씨와 환경에 흔들리지 않는 균일한 품질을 약속합니다.',
  },
  {
    icon: Heart,
    title: '따뜻한 소통',
    desc: '고객과의 진심 어린 대화. 상담부터 입주, A/S까지 함께하는 파트너가 되겠습니다.',
  },
];

const companyInfo = [
  { icon: Building2, label: '회사명', value: COMPANY.name },
  { icon: MapPin, label: '주소', value: COMPANY.address },
  { icon: Users, label: '사업자번호', value: COMPANY.businessNumber },
  { icon: Phone, label: '대표번호', value: COMPANY.phone, href: COMPANY.phoneHref },
  { icon: Mail, label: '이메일', value: COMPANY.email, href: COMPANY.emailHref },
];

export default function CompanyPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[50vh] items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4">
        <div className="relative text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-white md:text-6xl"
          >
            위트있는 사람들
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-4 text-lg text-white/60 md:text-xl"
          >
            위트있는 집을 만드는 사람들의 이야기
          </motion.p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-4">
          <ScrollReveal>
            <h2 className="mb-8 text-center text-3xl font-bold text-gray-900 md:text-4xl">
              더 나은 삶을 위한 합리적 기술
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="space-y-5 text-center text-gray-600 leading-relaxed">
              <p>
                우리는 집이 더 합리적이고 효율적인 방식으로 지어져야 한다고 믿습니다.
                기존 건축이 날씨와 현장 변수에 의존했다면, 위트는 기술로 불확실성을 제거합니다.
              </p>
              <p>
                모든 조건이 통제된 공장에서 집의 핵심 90%를 사전제작하고,
                현장에서는 빠르고 조용하게 조립합니다.
                이는 단순히 속도를 위한 것이 아니라, 계절과 날씨에 관계없이
                언제나 정밀하고 균일한 최고 품질을 확보하기 위한 원칙입니다.
              </p>
              <p>
                위트의 철학은 명확합니다.
                기술을 통해 건축의 불확실성을 제거하고,
                더 빠르고, 더 견고하며, 더 유연한 삶의 기반을 제공하는 것.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gray-50 py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {stats.map((s, i) => (
              <ScrollReveal key={s.label} delay={i * 0.1}>
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-900 md:text-5xl">
                    <CountUp end={s.value} suffix={s.suffix} />
                  </div>
                  <p className="mt-2 text-gray-500">{s.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-4">
          <ScrollReveal>
            <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 md:text-4xl">
              위트가 중요하게 생각하는 것
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <ScrollReveal key={v.title} delay={i * 0.1}>
                  <div className="rounded-2xl bg-gray-50 p-8 text-center transition-shadow hover:shadow-md">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#FEBD16]/10">
                      <Icon className="h-7 w-7 text-[#FEBD16]" aria-hidden="true" />
                    </div>
                    <h3 className="mb-2 text-lg font-bold text-gray-900">{v.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{v.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Company Info */}
      <section className="bg-gray-50 py-20 md:py-28">
        <div className="mx-auto max-w-2xl px-4">
          <ScrollReveal>
            <h2 className="mb-8 text-center text-3xl font-bold text-gray-900 md:text-4xl">
              회사 정보
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
              <div className="space-y-5">
                {companyInfo.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="flex items-start gap-4">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gray-100">
                        <Icon className="h-5 w-5 text-gray-600" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                          {item.label}
                        </p>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="mt-0.5 inline-flex min-h-[44px] items-center text-gray-900 hover:text-[#FEBD16] transition-colors"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="mt-0.5 text-gray-900">{item.value}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-900 py-24 md:py-32">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              위트와 함께 집을 지어볼까요?
            </h2>
            <p className="mt-4 text-white/60">
              편하게 상담 신청해주시면, 맞춤 안내를 도와드릴게요
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/quote"
                className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-[#FEBD16] px-8 py-3.5 font-semibold text-black transition-colors hover:bg-[#E5A410]"
              >
                견적 받아보기
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

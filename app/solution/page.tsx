"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Globe, PenTool, Shield, Smartphone } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

type Lang = 'KO' | 'EN';

const COPY: Record<Lang, {
  eyebrow: string;
  title: string;
  description: string;
  cta: string;
  labels: {
    problem: string;
    where: string;
    included: string;
    when: string;
  };
  packages: Array<{
    id: string;
    icon: React.ReactElement;
    title: string;
    subtitle: string;
    problem: string;
    where: string;
    what: string[];
    when: string;
    href: string;
  }>;
}> = {
  KO: {
    eyebrow: 'OPERATIONAL PACKAGES',
    title: '공간 운영까지 설계합니다',
    description:
      '모듈러 공간은 건물만으로 완성되지 않습니다. 보안, 네트워크, 원격 제어, 브랜드 디테일까지 실제 운영자가 매일 마주치는 문제를 처음부터 함께 설계합니다.',
    cta: '상세 솔루션 보기',
    labels: {
      problem: '해결하는 문제',
      where: '도입 환경',
      included: '패키지 구성',
      when: '추천 시점',
    },
    packages: [
      {
        id: 'cctv',
        icon: <Shield strokeWidth={1.5} />,
        title: '안전하게 지키기',
        subtitle: 'Security',
        problem: '무인 운영, 외곽 입지, 야간 운영처럼 사람이 계속 상주하기 어려운 공간의 보안 공백을 줄입니다.',
        where: '무인 카페, 원격 스마트팜, 도심 외곽 프라이빗 숙소, 현장 사무소',
        what: [
          '고해상도 실내외 CCTV',
          '스마트 출입 통제',
          '모바일 실시간 모니터링',
        ],
        when: '상시 관리가 어렵고 출입 기록, 야간 감시, 원격 확인이 필요한 운영자에게 적합합니다.',
        href: '/solution/cctv',
      },
      {
        id: 'network',
        icon: <Globe strokeWidth={1.5} />,
        title: '끊김 없이 연결하기',
        subtitle: 'Network',
        problem: '부지 위치, 철골 구조, 방문객 트래픽 때문에 생기는 인터넷 음영과 결제 장애 리스크를 줄입니다.',
        where: '팝업스토어, 업무용 현장 사무소, IoT 기반 스마트팜, 숙박 운영 공간',
        what: [
          '산업용 라우터 및 메시 Wi-Fi',
          'POS/방문객/업무망 분리',
          '백업 회선 설계',
        ],
        when: '결제, 예약, 원격 제어, 클라우드 업무처럼 연결 실패가 바로 손실로 이어지는 공간에 필요합니다.',
        href: '/solution/network',
      },
      {
        id: 'iot',
        icon: <Smartphone strokeWidth={1.5} />,
        title: '원격으로 제어하기',
        subtitle: 'Smart Control',
        problem: '매번 방문하지 않아도 조명, 냉난방, 환기를 제어해 고객 입장 전 최적의 상태를 만듭니다.',
        where: '프리미엄 숙박 시설, 무인 쇼룸, 주말 주택, 예약제 체험 공간',
        what: [
          '스마트 조명 및 온습도 제어',
          '방문 전 냉난방/환기 예약',
          '운영 스케줄 자동화',
        ],
        when: '고객 경험을 일정하게 유지하고 에너지 낭비와 현장 방문 횟수를 줄이고 싶을 때 권합니다.',
        href: '/solution/iot',
      },
      {
        id: 'design',
        icon: <PenTool strokeWidth={1.5} />,
        title: '브랜드와 현장에 맞게 완성하기',
        subtitle: 'Brand Fit',
        problem: '표준 모듈이 브랜드의 첫인상, 주변 풍경, 고객 동선과 따로 놀지 않도록 마지막 완성도를 높입니다.',
        where: '브랜드 플래그십, 프랜차이즈 카페, 독채 스테이, 관광지 판매 공간',
        what: [
          '브랜드 맞춤 내장재/가구 설계',
          '외관 및 조경 방향 제안',
          '사이니지와 고객 동선 기획',
        ],
        when: '공간 자체가 마케팅 자산이 되어야 하거나, 주변 경관과의 조화가 매출에 영향을 주는 현장에 적합합니다.',
        href: '/solution/design',
      },
    ],
  },
  EN: {
    eyebrow: 'OPERATIONAL PACKAGES',
    title: 'Operations Built Into The Space',
    description:
      'A modular space is not complete with the building alone. WEET plans security, network, remote control, and brand fit around the real operational problems teams face every day.',
    cta: 'View solution',
    labels: {
      problem: 'Problem solved',
      where: 'Where it matters',
      included: 'Included',
      when: 'When to choose it',
    },
    packages: [
      {
        id: 'cctv',
        icon: <Shield strokeWidth={1.5} />,
        title: 'Keep It Secure',
        subtitle: 'Security',
        problem: 'Reduce security gaps in unmanned, remote, or night-operated spaces where staff cannot always stay on site.',
        where: 'Unmanned cafes, remote smart farms, private stays outside the city, site offices',
        what: [
          'Indoor and outdoor CCTV',
          'Smart access control',
          'Real-time mobile monitoring',
        ],
        when: 'Best when access logs, night monitoring, and remote checks are essential.',
        href: '/solution/cctv',
      },
      {
        id: 'network',
        icon: <Globe strokeWidth={1.5} />,
        title: 'Stay Connected',
        subtitle: 'Network',
        problem: 'Reduce dead zones and payment risks caused by site location, steel structures, and visitor traffic.',
        where: 'Pop-up stores, site offices, IoT smart farms, hospitality spaces',
        what: [
          'Industrial router and mesh Wi-Fi',
          'Separated POS, guest, and work networks',
          'Backup-line planning',
        ],
        when: 'Needed where payment, reservation, remote control, or cloud work cannot afford downtime.',
        href: '/solution/network',
      },
      {
        id: 'iot',
        icon: <Smartphone strokeWidth={1.5} />,
        title: 'Control Remotely',
        subtitle: 'Smart Control',
        problem: 'Prepare lighting, HVAC, and ventilation before a guest arrives without visiting the site every time.',
        where: 'Premium stays, unmanned showrooms, weekend houses, reservation-only experience rooms',
        what: [
          'Smart lighting and temperature control',
          'Pre-arrival HVAC and ventilation scheduling',
          'Operation schedule automation',
        ],
        when: 'Recommended when teams want consistent guest experience with fewer site visits and less energy waste.',
        href: '/solution/iot',
      },
      {
        id: 'design',
        icon: <PenTool strokeWidth={1.5} />,
        title: 'Fit Brand And Site',
        subtitle: 'Brand Fit',
        problem: 'Make the standard module feel native to the brand, surrounding landscape, and customer flow.',
        where: 'Flagship stores, franchise cafes, private stays, tourism retail spaces',
        what: [
          'Brand-fit interior and furniture planning',
          'Exterior and landscape direction',
          'Signage and customer-flow planning',
        ],
        when: 'Right when the space itself must become a marketing asset or the surrounding view affects revenue.',
        href: '/solution/design',
      },
    ],
  },
};

export default function SolutionPage() {
  const { language } = useLanguage();
  const copy = COPY[language];

  return (
    <div className="min-h-screen bg-white text-gray-950">
      <main className="pb-32 pt-24 lg:pt-36">
        <section className="mx-auto max-w-[1280px] px-4 md:px-8">
          <div className="grid gap-8 border-b border-gray-200 pb-12 lg:grid-cols-[280px_1fr] lg:gap-16 lg:pb-16">
            <p className="text-sm font-bold text-gray-500">{copy.eyebrow}</p>
            <div>
              <h1 className="max-w-4xl text-4xl font-black leading-tight text-gray-950 md:text-6xl lg:text-[72px]">
                {copy.title}
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-gray-600 md:text-xl break-keep">
                {copy.description}
              </p>
            </div>
          </div>

          <div className="divide-y divide-gray-200">
            {copy.packages.map((pkg, index) => (
              <article
                key={pkg.id}
                id={`solution-${pkg.id}`}
                className="group grid gap-8 py-10 scroll-mt-[120px] lg:grid-cols-[240px_1fr_180px] lg:gap-12 lg:py-14"
              >
                <div>
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-md border border-gray-200 bg-gray-50 text-gray-500 transition-colors group-hover:border-[#FEBD16] group-hover:bg-[#FFF9E6] group-hover:text-[#E5A410]">
                    {React.cloneElement(pkg.icon as React.ReactElement<{ size?: number }>, { size: 28 })}
                  </div>
                  <p className="text-sm font-bold text-gray-400">{String(index + 1).padStart(2, '0')}</p>
                  <h2 className="mt-2 text-2xl font-black leading-tight text-gray-950 md:text-3xl break-keep">
                    {pkg.title}
                  </h2>
                  <p className="mt-2 text-sm font-bold text-gray-500">{pkg.subtitle}</p>
                </div>

                <div className="grid gap-7">
                  <div>
                    <h3 className="text-sm font-bold text-gray-500">{copy.labels.problem}</h3>
                    <p className="mt-2 text-lg font-semibold leading-relaxed text-gray-900 break-keep">
                      {pkg.problem}
                    </p>
                  </div>

                  <div className="grid gap-7 md:grid-cols-2">
                    <div>
                      <h3 className="text-sm font-bold text-gray-500">{copy.labels.where}</h3>
                      <p className="mt-2 leading-relaxed text-gray-600 break-keep">{pkg.where}</p>
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-gray-500">{copy.labels.when}</h3>
                      <p className="mt-2 leading-relaxed text-gray-600 break-keep">{pkg.when}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-gray-500">{copy.labels.included}</h3>
                    <ul className="mt-3 grid gap-3 md:grid-cols-3">
                      {pkg.what.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm font-semibold leading-relaxed text-gray-800">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#D99900]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex items-start lg:justify-end">
                  <Link
                    href={pkg.href}
                    className="inline-flex h-12 items-center gap-2 rounded-sm border border-gray-950 px-5 text-sm font-bold text-gray-950 transition-colors hover:bg-gray-950 hover:text-white"
                  >
                    {copy.cta}
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

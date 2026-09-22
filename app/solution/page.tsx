"use client";

import React from 'react';
import Link from 'next/link';
import { Shield, Globe, Smartphone, Zap, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

type Lang = 'KO' | 'EN';

const COPY: Record<Lang, {
  title: string;
  description: string;
  cta: string;
  cards: Array<{
    id: number;
    title: string;
    subtitle: string;
    desc: string;
    detail: string;
    href: string;
    icon: React.ReactElement;
  }>;
}> = {
  KO: {
    title: 'SOLUTION',
    description: '사용 목적과 설치 조건에 맞춰 보안, 통신, 제어와 에너지 설비를 검토합니다.',
    cta: '자세히보기',
    cards: [
      {
        id: 1,
        icon: <Shield strokeWidth={1.5} />,
        title: '시큐리티',
        subtitle: 'Security',
        desc: '감시 구역과 현장 조건을 확인해 CCTV·출입 감지 구성을 상담합니다.',
        detail: 'CCTV · 출입 감시',
        href: '/solution/cctv',
      },
      {
        id: 2,
        icon: <Globe strokeWidth={1.5} />,
        title: '네트워크 솔루션',
        subtitle: 'Network Solution',
        desc: '현장의 회선·수신 상태와 사용량에 맞춰 인터넷 연결 방식을 검토합니다.',
        detail: '인터넷 연결 · Wi-Fi 구성',
        href: '/solution/network',
      },
      {
        id: 3,
        icon: <Smartphone strokeWidth={1.5} />,
        title: 'IoT 솔루션',
        subtitle: 'Smart Home IoT',
        desc: '조명과 냉난방 등 제어할 장치의 호환성과 설치 조건을 확인합니다.',
        detail: '조명 · 환경 제어',
        href: '/solution/iot',
      },
      {
        id: 4,
        icon: <Zap strokeWidth={1.5} />,
        title: '에너지',
        subtitle: 'Energy',
        desc: '태양광·저장장치·충전 설비의 적용 가능성과 전기 공사 범위를 검토합니다.',
        detail: '태양광 · ESS · 전기차 충전',
        href: '/solution/energy',
      },
    ],
  },
  EN: {
    title: 'SOLUTION',
    description: 'Review security, connectivity, controls and energy equipment for your use and site conditions.',
    cta: 'View details',
    cards: [
      {
        id: 1,
        icon: <Shield strokeWidth={1.5} />,
        title: 'Security',
        subtitle: 'Security',
        desc: 'Discuss cameras and entry sensors after checking coverage and site conditions.',
        detail: 'CCTV · Access monitoring',
        href: '/solution/cctv',
      },
      {
        id: 2,
        icon: <Globe strokeWidth={1.5} />,
        title: 'Network Solution',
        subtitle: 'Network Solution',
        desc: 'Review connection options against local service, signal and usage.',
        detail: 'Internet access · Wi-Fi',
        href: '/solution/network',
      },
      {
        id: 3,
        icon: <Smartphone strokeWidth={1.5} />,
        title: 'IoT Solution',
        subtitle: 'Smart Home IoT',
        desc: 'Check compatibility and installation requirements for lighting and climate controls.',
        detail: 'Lighting · Climate controls',
        href: '/solution/iot',
      },
      {
        id: 4,
        icon: <Zap strokeWidth={1.5} />,
        title: 'Energy',
        subtitle: 'Energy',
        desc: 'Assess solar, storage and charging equipment and the required electrical work.',
        detail: 'Solar · ESS · EV charging',
        href: '/solution/energy',
      },
    ],
  },
};

export default function SolutionPage() {
  const { language } = useLanguage();
  const copy = COPY[language === 'KO' ? 'KO' : 'EN'];

  return (
    <div className="min-h-screen bg-[#F9FAFB] font-sans text-[#1A1A1A]">
      <main>
        <div className="max-w-[1200px] mx-auto px-4 py-20 md:py-24">

          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-[42px] font-extrabold text-[#1A1A1A] tracking-tight mb-6">
              {copy.title}
            </h1>
            <div className="w-[1px] h-8 bg-gray-300 mx-auto mb-6"></div>
            <p className="text-[#666666] text-base md:text-lg leading-relaxed max-w-2xl mx-auto break-keep px-4">
              {copy.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 md:px-0">
            {copy.cards.map((item) => (
              <div
                key={item.id}
                className="group bg-white rounded-xl p-6 md:p-8 shadow-sm border border-transparent hover:border-[#FEBD16] hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-300 flex flex-col items-center text-center cursor-default h-full relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-[4px] bg-[#FEBD16] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></div>

                <div className="w-[80px] h-[80px] rounded-full bg-[#FAFAFA] border border-[#F0F0F0] flex items-center justify-center mb-6 group-hover:bg-[#FFF9E6] group-hover:border-[#FEBD16] transition-all duration-300">
                  <div className="text-[#888] group-hover:text-[#E5A410] transition-colors duration-300">
                    {React.cloneElement(item.icon as React.ReactElement<{ size?: number }>, { size: 36 })}
                  </div>
                </div>

                <h3 className="text-[19px] font-bold text-[#1A1A1A] mb-1">{item.title}</h3>
                <span className="text-[11px] text-[#999999] font-medium uppercase tracking-wider mb-5 block">
                  {item.subtitle}
                </span>

                <p className="text-[#666666] text-[14px] leading-relaxed mb-8 break-keep px-1 flex-grow">
                  {item.desc}
                </p>

                <div className="w-full pt-6 border-t border-gray-100 mt-auto">
                  <p className="text-xs text-[#888] font-medium mb-4">{item.detail}</p>
                  <Link
                    href={item.href}
                    className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-gray-100 text-sm font-bold text-[#1A1A1A] hover:bg-[#FEBD16] hover:text-white transition-all duration-300"
                  >
                    {copy.cta} <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>
    </div>
  );
}

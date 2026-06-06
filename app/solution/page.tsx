"use client";

import React from 'react';
import Link from 'next/link';
import { Shield, Globe, Smartphone, PenTool, ArrowRight } from 'lucide-react';
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
    description: '위트가 제안하는 통합 라이프스타일 솔루션. 안전하고 편리한 일상을 만드는 기술과 경험을 확인해 보세요.',
    cta: '자세히보기',
    cards: [
      {
        id: 1,
        icon: <Shield strokeWidth={1.5} />,
        title: '시큐리티',
        subtitle: 'Security',
        desc: '24시간 스마트 보안 서비스로 자산과 공간을 안전하게 지킵니다.',
        detail: 'CCTV · 출입 감시',
        href: '/solution/cctv',
      },
      {
        id: 2,
        icon: <Globe strokeWidth={1.5} />,
        title: '네트워크 솔루션',
        subtitle: 'Network Solution',
        desc: '어디서든 끊김 없는 고성능 인터넷과 와이파이를 제공합니다.',
        detail: '고성능 인터넷 · 메시 Wi-Fi',
        href: '/solution/network',
      },
      {
        id: 3,
        icon: <Smartphone strokeWidth={1.5} />,
        title: 'IoT 솔루션',
        subtitle: 'Smart Home IoT',
        desc: '조명·환경을 스마트하게 제어해 편리한 생활을 완성합니다.',
        detail: '스마트 조명 · 실시간 제어',
        href: '/solution/iot',
      },
      {
        id: 4,
        icon: <PenTool strokeWidth={1.5} />,
        title: '디자인 컨설팅',
        subtitle: 'Interior Design',
        desc: '브랜드와 라이프스타일에 맞춘 맞춤형 공간 설계를 제안합니다.',
        detail: '인테리어 · 조경 디자인',
        href: '/solution/design',
      },
    ],
  },
  EN: {
    title: 'SOLUTION',
    description: 'Integrated lifestyle solutions from WEET. Explore the tech and expertise that make life safer and more convenient.',
    cta: 'View details',
    cards: [
      {
        id: 1,
        icon: <Shield strokeWidth={1.5} />,
        title: 'Security',
        subtitle: 'Security',
        desc: '24/7 smart security to protect your assets and spaces.',
        detail: 'CCTV · Access monitoring',
        href: '/solution/cctv',
      },
      {
        id: 2,
        icon: <Globe strokeWidth={1.5} />,
        title: 'Network Solution',
        subtitle: 'Network Solution',
        desc: 'Seamless, high-performance internet and Wi-Fi anywhere.',
        detail: 'High-speed internet · Mesh Wi-Fi',
        href: '/solution/network',
      },
      {
        id: 3,
        icon: <Smartphone strokeWidth={1.5} />,
        title: 'IoT Solution',
        subtitle: 'Smart Home IoT',
        desc: 'Smart control of lighting and environment for daily comfort.',
        detail: 'Smart lighting · Real-time control',
        href: '/solution/iot',
      },
      {
        id: 4,
        icon: <PenTool strokeWidth={1.5} />,
        title: 'Design Consulting',
        subtitle: 'Interior Design',
        desc: 'Tailored spatial design that fits your brand and lifestyle.',
        detail: 'Interior · Landscape design',
        href: '/solution/design',
      },
    ],
  },
};

export default function SolutionPage() {
  const { language } = useLanguage();
  const copy = COPY[language];

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <main className="pb-40 pt-16 lg:pt-20">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">

          <div className="text-center mb-16 lg:mb-24">
            <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight mb-6">
              {copy.title}
            </h1>
            <div className="w-[1px] h-8 bg-gray-300 mx-auto mb-6"></div>
            <p className="text-gray-600 text-sm md:text-lg leading-relaxed max-w-2xl mx-auto break-keep px-4">
              {copy.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 md:px-0">
            {copy.cards.map((item) => (
              <div
                key={item.id}
                className="group relative flex h-full cursor-default flex-col items-center overflow-hidden rounded-lg border border-transparent bg-white p-6 text-center shadow-sm transition-all duration-300 hover:border-[#FEBD16] hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] md:p-8"
              >
                <div className="absolute top-0 left-0 w-full h-[4px] bg-[#FEBD16] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></div>

                <div className="w-[80px] h-[80px] rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center mb-6 group-hover:bg-[#FFF9E6] group-hover:border-[#FEBD16] transition-all duration-300">
                  <div className="text-gray-400 group-hover:text-[#E5A410] transition-colors duration-300">
                    {React.cloneElement(item.icon as React.ReactElement<{ size?: number }>, { size: 36 })}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-1">{item.title}</h3>
                <span className="text-[11px] text-gray-400 font-medium uppercase tracking-wider mb-5 block">
                  {item.subtitle}
                </span>

                <p className="text-gray-600 text-[14px] leading-relaxed mb-8 break-keep px-1 flex-grow">
                  {item.desc}
                </p>

                <div className="w-full pt-6 border-t border-gray-100 mt-auto">
                  <p className="text-xs text-gray-400 font-medium mb-4">{item.detail}</p>
                  <Link
                    href={item.href}
                    className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-gray-100 text-sm font-bold text-gray-900 hover:bg-[#FEBD16] hover:text-white transition-all duration-300"
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

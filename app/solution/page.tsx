"use client";

import React from 'react';
import Link from 'next/link';
import { Shield, Globe, Smartphone, PenTool, ArrowRight } from 'lucide-react';

const solutions = [
  {
    id: 1,
    icon: <Shield strokeWidth={1.5} />,
    title: '보안 솔루션',
    subtitle: 'Security System',
    desc: '24시간 스마트 보안 시스템',
    detail: 'CCTV · 침입 감지',
    href: '/solution/cctv',
  },
  {
    id: 2,
    icon: <Globe strokeWidth={1.5} />,
    title: '네트워크 솔루션',
    subtitle: 'Network Solution',
    desc: '어디서든 끊김 없는 인터넷',
    detail: '위성 인터넷 · 메시 와이파이',
    href: '/solution/network',
  },
  {
    id: 3,
    icon: <Smartphone strokeWidth={1.5} />,
    title: 'IOT 솔루션',
    subtitle: 'Smart Home IoT',
    desc: '스마트홈으로 편리한 생활',
    detail: '스마트 조명 · 냉난방 제어',
    href: '/solution/iot',
  },
  {
    id: 4,
    icon: <PenTool strokeWidth={1.5} />,
    title: '디자인 컨설팅',
    subtitle: 'Interior Design',
    desc: '당신만의 특별한 공간 설계',
    detail: '인테리어 · 조경 디자인',
    href: '/solution/design',
  },
];

export default function SolutionPage() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] font-sans text-[#1A1A1A]">
      <main>
        <div className="max-w-[1200px] mx-auto px-4 py-20 md:py-24">

          {/* Page Title */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-[42px] font-extrabold text-[#1A1A1A] tracking-tight mb-6">
              SOLUTION
            </h1>
            {/* 심플한 구분선 */}
            <div className="w-[1px] h-8 bg-gray-300 mx-auto mb-6"></div>
            <p className="text-[#666666] text-base md:text-lg leading-relaxed max-w-2xl mx-auto break-keep px-4">
              위트는 단순한 공간을 넘어, 당신의 삶을 더욱 안전하고 편리하게 만드는<br className="hidden md:block" />
              통합 라이프스타일 솔루션을 제안합니다.
            </p>
          </div>

          {/* Solution Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 md:px-0">
            {solutions.map((item) => (
              <div
                key={item.id}
                className="group bg-white rounded-xl p-6 md:p-8 shadow-sm border border-transparent hover:border-[#FEBD16] hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-300 flex flex-col items-center text-center cursor-default h-full relative overflow-hidden"
              >
                {/* Hover Top Line Accent */}
                <div className="absolute top-0 left-0 w-full h-[4px] bg-[#FEBD16] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></div>

                {/* Icon Circle */}
                <div className="w-[80px] h-[80px] rounded-full bg-[#FAFAFA] border border-[#F0F0F0] flex items-center justify-center mb-6 group-hover:bg-[#FFF9E6] group-hover:border-[#FEBD16] transition-all duration-300">
                  <div className="text-[#888] group-hover:text-[#E5A410] transition-colors duration-300">
                    {React.cloneElement(item.icon as React.ReactElement<{ size?: number }>, { size: 36 })}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-[19px] font-bold text-[#1A1A1A] mb-1">{item.title}</h3>
                <span className="text-[11px] text-[#999999] font-medium uppercase tracking-wider mb-5 block">
                  {item.subtitle}
                </span>

                <p className="text-[#666666] text-[14px] leading-relaxed mb-8 break-keep px-1 flex-grow">
                  {item.desc}
                </p>

                {/* Detail Badge */}
                <div className="w-full pt-6 border-t border-gray-100 mt-auto">
                  <p className="text-xs text-[#888] font-medium mb-4">{item.detail}</p>
                  <Link
                    href={item.href}
                    className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-gray-100 text-sm font-bold text-[#1A1A1A] hover:bg-[#FEBD16] hover:text-white transition-all duration-300"
                  >
                    자세히 보기 <ArrowRight size={14} />
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

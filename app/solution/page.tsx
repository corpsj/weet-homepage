"use client";

import React from 'react';
import { Shield, Globe, Smartphone, PenTool, ArrowRight } from 'lucide-react';

const solutions = [
  {
    id: 1,
    icon: <Shield strokeWidth={1.5} />,
    title: '보안 솔루션',
    subtitle: 'Security System',
    desc: '언제든, 어디서든, 우리 집을 안전하게 지키세요.',
    detail: '24시간 관제 시스템 · 긴급 출동',
  },
  {
    id: 2,
    icon: <Globe strokeWidth={1.5} />,
    title: '네트워크(인터넷 솔루션)',
    subtitle: 'Network Solution',
    desc: '어디에서도 끊김 없는 인터넷, 산 속에서도 자유로운 소통.',
    detail: '광대역 WiFi · 위성 인터넷 연동',
  },
  {
    id: 3,
    icon: <Smartphone strokeWidth={1.5} />,
    title: 'IOT(스마트 홈 솔루션)',
    subtitle: 'Smart Home IoT',
    desc: '집 전체를 스마트하게, 이동식 주택의 편리함을 극대화하세요.',
    detail: '원격 냉난방 제어 · 에너지 관리',
  },
  {
    id: 4,
    icon: <PenTool strokeWidth={1.5} />,
    title: 'Design (디자인 컨설팅)',
    subtitle: 'Interior Design',
    desc: "당신의 '로망'이 '공간'이 되는 순간",
    detail: '맞춤형 인테리어 · 조경 디자인',
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
            <p className="text-[#666666] text-lg leading-relaxed max-w-2xl mx-auto break-keep">
              위트는 단순한 공간을 넘어, 당신의 삶을 더욱 안전하고 편리하게 만드는<br className="hidden md:block" />
              통합 라이프스타일 솔루션을 제안합니다.
            </p>
          </div>

          {/* Solution Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {solutions.map((item) => (
              <div
                key={item.id}
                className="group bg-white rounded-xl p-8 shadow-sm border border-transparent hover:border-[#FEBD16] hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-300 flex flex-col items-center text-center cursor-default h-full relative overflow-hidden"
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
                  <button className="flex items-center justify-center gap-1 mx-auto text-sm font-bold text-[#1A1A1A] hover:text-[#FEBD16] transition-colors">
                    More <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* CTA Section */}
        <div className="bg-white border-t border-gray-100 py-16">
          <div className="max-w-[1200px] mx-auto px-4 text-center">
            <h3 className="text-2xl font-bold text-[#1A1A1A] mb-3">나만의 모듈러 하우스를 계획 중이신가요?</h3>
            <p className="text-[#666666] mb-8">전문 매니저가 건축부터 솔루션까지 상세하게 안내해 드립니다.</p>
            <button className="bg-[#1A1A1A] text-white px-10 py-4 rounded-full font-bold hover:bg-[#FEBD16] hover:text-[#1A1A1A] transition-all duration-300 shadow-lg hover:shadow-xl">
              무료 견적 상담하기
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

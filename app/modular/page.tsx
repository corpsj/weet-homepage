'use client';

import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';

type Lang = 'KO' | 'EN';

const COPY: Record<Lang, {
  hero: { title: string; lead: string; paragraphs: string[]; checklist: string[]; signature: string };
  sections: Array<{
    id: string;
    title: string;
    subtitle: string;
    paragraphs: string[];
    coreValue: string;
    image: string;
    bg: 'light' | 'dark';
  }>;
}> = {
  KO: {
    hero: {
      title: '모듈러(Module)건축이란?',
      lead: '공장에서 모듈을 제작한 뒤 현장으로 운반해 설치하는 건축 방식입니다.',
      paragraphs: [
        '현장에서 모두 만드는 방식과 달리 구조와 마감, 설비의 일부를 공장에서 준비합니다.',
        '부지의 기초 공사와 공장 제작은 현장 조건과 계획에 따라 함께 진행할 수 있습니다.',
        '제작 범위, 운반 방법과 현장 작업은 모델과 사양에 따라 달라집니다. 상담에서 설치할 부지와 사용 목적을 먼저 확인합니다.',
      ],
      checklist: [
        '하이브리드 모듈러 형태 ( Hybrid Modular Unit )',
        '사전제작 ( Prefabrication )',
        '탈현장 건설 OSC ( Off-Site Construction )',
        '조립방식의 건축 ( Prefabricated Building )',
      ],
      signature: '- 주식회사 위트 -'
    },
    sections: [
      {
        id: 'modular-types',
        title: '하이브리드 모듈러 형태 ( Hybrid Modular Unit )',
        subtitle: '구조와 마감 자재의 조합을 검토합니다.',
        paragraphs: [
          "하이브리드 구조는 필요한 구조 성능과 마감 조건에 따라 서로 다른 자재를 조합하는 방식입니다.",
          '구조와 내부 마감에 사용하는 자재는 모델과 설계에 따라 정합니다. 필요한 성능과 유지 관리 조건을 함께 검토합니다.',
        ],
        coreValue: '구조와 단열 성능은 설계, 자재 사양과 설치 조건을 기준으로 확인합니다.',
        image: '/images/modular/hybrid-modular.webp',
        bg: 'light',
      },
      {
        id: 'prefabrication',
        title: '사전제작 ( Pre-fabrication )',
        subtitle: '사양에 정한 공정을 공장에서 진행합니다.',
        paragraphs: [
          '구조, 마감과 설비 중 공장에서 진행할 범위를 설계와 사양에 정합니다.',
          '위트는 공장에서 구조와 마감 등 사양에 정한 공정을 진행한 뒤 현장으로 운반합니다.',
          '자재의 보관·가공 방법과 출고 전 확인 항목은 적용 자재와 공정에 맞춰 정합니다.',
        ],
        coreValue: '출고 전 치수, 마감과 설비를 확인하고 현장에서 필요한 작업을 정리합니다.',
        image: '/images/modular/prefabrication.webp',
        bg: 'light',
      },
      {
        id: 'osc',
        title: '탈현장 건설 OSC ( Off-Site Construction )',
        subtitle: '공장 제작과 현장 준비를 함께 계획합니다.',
        paragraphs: [
          '공장 제작과 현장 준비의 일정을 함께 계획합니다.',
          '인허가와 현장 준비가 갖춰지면 기초 공사와 공장 제작을 병행할 수 있습니다.',
          '병행 가능한 공정과 일정은 설계, 제작 범위와 부지 조건을 확인한 뒤 정합니다.',
        ],
        coreValue: '실제 일정은 제작 사양, 인허가, 기상과 현장 준비 상태에 따라 조정될 수 있습니다.',
        image: '/images/modular/osc.webp',
        bg: 'dark',
      },
      {
        id: 'assembly',
        title: '조립방식의 건축 ( Prefabricated Building )',
        subtitle: '운반 후 현장에서 연결하고 마감합니다.',
        paragraphs: [
          '설치에는 차량 진입, 크레인 작업과 현장 마감 공간이 필요합니다.',
          '모듈을 운반해 계획한 위치에 배치하고 기초·설비와 연결합니다. 인양과 연결 방식은 구조 및 현장 조건에 따라 정합니다.',
          '현장 마감과 설비 연결의 범위를 확인하고, 작업 시간과 소음·분진 관리 방법을 함께 계획합니다.',
        ],
        coreValue: '향후 확장이나 이동은 연결 구조, 운반 가능 여부와 새 부지의 조건을 다시 검토해야 합니다.',
        image: '/images/modular/prefabricated-building.webp',
        bg: 'dark',
      },
    ],
  },
  EN: {
    hero: {
      title: 'What is Modular Construction?',
      lead: 'Modules are prepared in a factory, then transported and installed on site.',
      paragraphs: [
        'Factory work can cover the structure, finishes and equipment defined in the project specifications.',
        'Foundation work and factory production may overlap when site conditions, approvals and the project plan allow.',
        'Factory scope, transport and on-site work depend on the model and specifications. Confirm the intended use and site before planning installation.',
      ],
      checklist: [
        'Hybrid Modular Unit',
        'Prefabrication',
        'Off-Site Construction (OSC)',
        'Prefabricated Building',
      ],
      signature: '- weet -'
    },
    sections: [
      {
        id: 'modular-types',
        title: 'Hybrid Modular Unit',
        subtitle: 'Review the combination of structural and finishing materials.',
        paragraphs: [
          'A hybrid structure combines different materials according to structural and finishing requirements.',
          'Material choices depend on the model and design. Review the required performance and maintenance conditions for the selected configuration.',
        ],
        coreValue: 'Confirm structural and insulation requirements against design, material specifications and installation conditions.',
        image: '/images/modular/hybrid-modular.webp',
        bg: 'light',
      },
      {
        id: 'prefabrication',
        title: 'Prefabrication',
        subtitle: 'Carry out the factory work defined in the specifications.',
        paragraphs: [
          'Factory work covers the structure, services and finishes agreed in the specifications.',
          'Define material storage, processing and pre-delivery checks for the agreed materials and construction scope.',
        ],
        coreValue: 'Confirm dimensions, finishes and equipment before delivery, and identify the work required on site.',
        image: '/images/modular/prefabrication.webp',
        bg: 'light',
      },
      {
        id: 'osc',
        title: 'OSC (Off-Site Construction)',
        subtitle: 'Plan factory production alongside site preparation.',
        paragraphs: [
          'Foundation work and factory production can run in parallel when approvals and site readiness allow.',
          'Which activities can overlap depends on the design, production scope and site conditions.',
        ],
        coreValue: 'Schedules may change with specifications, approvals, weather and site readiness.',
        image: '/images/modular/osc.webp',
        bg: 'dark',
      },
      {
        id: 'assembly',
        title: 'Prefabricated Building',
        subtitle: 'Transport, position, connect and finish on site.',
        paragraphs: [
          'Transport modules to the planned location, position them and connect foundations and services. Lifting, connection and finishing work depend on the design and site.',
          'Future expansion or relocation requires another review of the structure, transport access and new site.',
        ],
        coreValue: 'Plan vehicle access, lifting space, site finishing and utility connections before delivery.',
        image: '/images/modular/prefabricated-building.webp',
        bg: 'dark',
      },
    ],
  },
};

export default function ModularPage() {
  const { language } = useLanguage();
  const copy = COPY[language === 'KO' ? 'KO' : 'EN'];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section id="what-is-modular" className="bg-[#E8E8E8] py-16 lg:py-24 scroll-mt-[180px]">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-[140px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            <div>
              <div className="relative w-full max-w-[563px] aspect-[1024/817] mx-auto lg:mx-0 mb-8">
                <Image
                  src="/images/modular/main-image.webp"
                  alt={copy.hero.title}
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              <div className="space-y-3">
                {copy.hero.checklist.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24" fill="none">
                      <rect x="3" y="3" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" />
                      <path d="M7 12l3 3 7-7" stroke="currentColor" strokeWidth="2" fill="none" />
                    </svg>
                    <span className="text-[16px] lg:text-[18px]">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h1 className="text-[32px] lg:text-[40px] font-bold mb-4">
                {copy.hero.title}
              </h1>

              <p className="text-[18px] lg:text-[20px] font-bold text-black mb-6">
                {copy.hero.lead}
              </p>

              <div className="text-[14px] lg:text-[15px] leading-[1.8] space-y-4 text-gray-700 mb-8">
                {copy.hero.paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              <div className="text-right">
                <p className="text-[14px] font-medium">{copy.hero.signature}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sections */}
      {copy.sections.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className={`${section.bg === 'light' ? 'bg-white' : 'bg-[#E8E8E8]'} py-16 lg:py-24 scroll-mt-[180px]`}
        >
          <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-[140px]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
              <div className="relative w-full aspect-[2816/1536] overflow-hidden rounded-lg order-2 lg:order-1">
                <Image
                  src={section.image}
                  alt={section.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="order-1 lg:order-2">
                <h2 className="text-[28px] lg:text-[36px] font-bold mb-4">
                  {section.title}
                </h2>
                <h3 className="text-[18px] lg:text-[22px] font-bold mb-4 text-gray-900">
                  {section.subtitle}
                </h3>

                <div className="text-[14px] lg:text-[15px] leading-[1.8] space-y-4 text-gray-700 mb-6">
                  {section.paragraphs.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>

                <p className="text-sm font-semibold text-black">Core Value: {section.coreValue}</p>
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}

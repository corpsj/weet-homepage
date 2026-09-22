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
        subtitle: '구조적 안전과 쾌적함의 결합 (하이브리드 구조)',
        paragraphs: [
          "우리는 단일 소재의 한계를 넘어선 '하이브리드 구조(Hybrid Structure)'를 채택했습니다.",
          '구조와 내부 마감에 사용하는 자재는 모델과 설계에 따라 정합니다. 필요한 성능과 유지 관리 조건을 함께 검토합니다.',
        ],
        coreValue: '구조와 단열 성능은 설계, 자재 사양과 설치 조건을 기준으로 확인합니다.',
        image: '/images/modular/hybrid-modular.webp',
        bg: 'light',
      },
      {
        id: 'prefabrication',
        title: '사전제작 ( Pre-fabrication )',
        subtitle: '"비바람을 맞지 않는 환경에서 정성껏 만듭니다." (정밀 제조 모듈러)',
        paragraphs: [
          '비바람과 습기는 건축물의 수명을 단축시키는 주원인입니다.',
          '위트는 공장에서 구조와 마감 등 사양에 정한 공정을 진행한 뒤 현장으로 운반합니다.',
          '정밀한 용접이 필요한 철골과 습도 관리가 필수인 목재 모두 최적의 환경에서 가공되며, 숙련된 엔지니어의 엄격한 QC(품질관리)를 거쳐 출하됩니다.',
        ],
        coreValue: '출고 전 치수, 마감과 설비를 확인하고 현장에서 필요한 작업을 정리합니다.',
        image: '/images/modular/prefabrication.webp',
        bg: 'light',
      },
      {
        id: 'osc',
        title: '탈현장 건설 OSC ( Off-Site Construction )',
        subtitle: '시간을 설계하는 병렬 프로세스 (병렬 공정 모듈러)',
        paragraphs: [
          '공장 제작과 현장 준비의 일정을 함께 계획합니다.',
          '현장에서 기초 토목 공사가 진행되는 동안, 공장에서는 동시에 건물을 제작하는 "병렬 공정(Parallel Process)"을 도입했습니다.',
          '순차적으로 기다릴 필요 없이 두 과정이 동시에 진행되어, 전체 공사 기간을 획기적으로 단축합니다.',
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
          '공장에서 완성된 모듈 유닛을 현장으로 운송하여, 크레인을 이용해 레고 블록처럼 "적층(Stacking)"하고 체결합니다.',
          '현장에서는 단순 조립과 마감 작업만 이루어지기에 소음, 분진, 건축 폐기물 발생을 최소화하여 주변 환경과 이웃을 배려합니다.',
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
        'Traditional on-site builds are vulnerable to weather, noise, and safety risks. Modular reduces uncertainty with standardized processes and quality control.',
        'Each module leaves the factory with interiors, MEP, and windows installed. On site we only assemble, so schedules are faster and more predictable.',
        'The core value: shorter schedules, consistent quality, and less waste and noise in one approach.',
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
        subtitle: 'Steel for strength, wood for comfort—combined for balanced performance.',
        paragraphs: [
          'We blend durable steel frames with warm timber to reduce vibration and deflection while keeping insulation and acoustic comfort.',
          'Structural reviews and QC loops are done before shipping so modules arrive ready to install.',
        ],
        coreValue: 'Hybrid engineering that delivers both robustness and comfort.',
        image: '/images/modular/hybrid-modular.webp',
        bg: 'light',
      },
      {
        id: 'prefabrication',
        title: 'Prefabrication',
        subtitle: 'Produce in the factory, assemble quickly on site.',
        paragraphs: [
          'Factory work covers the structure, services and finishes agreed in the specifications.',
          'Multi-stage QC checks dimensions, finishes, and functions to minimize on-site rework and surprises.',
        ],
        coreValue: 'Tightly controlled standard processes keep quality consistent.',
        image: '/images/modular/prefabrication.webp',
        bg: 'light',
      },
      {
        id: 'osc',
        title: 'OSC (Off-Site Construction)',
        subtitle: 'Factory production and site work run in parallel to shorten the schedule.',
        paragraphs: [
          'Foundations and module production happen at the same time, slashing the overall timeline.',
          'We reduce weather, noise, and safety risks and deliver predictable schedules with structured quality control.',
        ],
        coreValue: 'Parallel workflows minimize schedule risk and keep delivery dates reliable.',
        image: '/images/modular/osc.webp',
        bg: 'dark',
      },
      {
        id: 'assembly',
        title: 'Prefabricated Building',
        subtitle: 'Transport, position, connect and finish on site.',
        paragraphs: [
          'Modules arrive complete, are lifted into place, connected, and finalized with minimal on-site finishing.',
          'Future expansion or relocation requires another review of the structure, transport access and new site.',
        ],
        coreValue: 'Fast delivery now with flexibility for future moves or expansions.',
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

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
      lead: "'모듈러 건축'은 빠른 속도, 정확한 품질, 유연한 공간을 모두 제공하는 가장 진보된 건축 솔루션입니다.",
      paragraphs: [
        '우리의 건축 철학: 더 나은 삶을 위한 합리적 기술',
        '우리는 집이 더 합리적이고 효율적인 방식으로 지어져야 한다고 믿습니다.',
        '기존의 현장 중심 건축은 날씨, 환경, 작업자의 숙련도 같은 수많은 변수에 의존해왔습니다. 우리는 기술을 통해 이러한 불확실성을 제거하는 것에서부터 시작합니다.',
        "우리의 해답은 '탈현장건설(Off-Site Construction)'입니다. 우리는 현장이 아닌, 모든 조건이 통제된 공장에서 집의 핵심 구성요소 90%를 '사전제작'합니다.",
        '이는 단순히 속도를 위한 것이 아닙니다. 계절과 날씨에 관계없이 언제나 정밀하고 균일한 최고 품질을 확보하기 위한 원칙입니다.',
        '또한, 현장의 소음, 분진, 폐기물을 최소화하여 환경과 이웃에 미치는 영향을 줄이는 것이 우리가 지향하는 방식입니다.',
        "공장에서 완성된 모듈은 고객의 대지에서 약속된 일정에 맞춰 '조립'됩니다. 수개월이 소요되던 현장 공정을 획기적으로 단축함으로써, 고객은 정확한 예산과 예측 가능한 일정 안에서 완벽한 공간을 만나게 됩니다.",
        "우리는 이것을 '시간과 자원의 효율적 사용'이라 부릅니다.",
        "마지막으로, 우리가 제공하는 집의 '형태'는 고정되어 있지 않습니다. 모듈러 건축의 본질은 '유연성'입니다.",
        "표준화된 모듈의 조합을 통해 고객의 개성을 반영한 다양한 설계가 가능하며, 삶의 주기에 따라 공간을 '확장'하거나 '축소'할 수 있습니다.",
        "심지어 필요시 집을 '이동'시켜 자산으로서의 가치를 이어갈 수도 있습니다.",
        '우리의 철학은 명확합니다.',
        '기술을 통해 건축의 불확실성을 제거하고, 고객에게는 더 빠르고, 더 견고하며, 더 유연한 삶의 기반을 제공하는 것.',
        '이것이 우리가 모듈러 건축을 통해 구현하려는 가치입니다.',
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
          '건물의 뼈대는 변형 없는 고강도 구조용 강철을 사용하여 내진 성능과 내구성을 극대화하고, 사람이 머무는 내부는 목재로 구성하여 철이 줄 수 없는 뛰어난 단열과 습도 조절 능력을 담았습니다.',
        ],
        coreValue: '어떤 재해에도 흔들리지 않는 강철의 안전성과 사계절 쾌적한 목재의 거주성을 동시에 제공합니다.',
        image: '/images/modular/hybrid-modular.webp',
        bg: 'light',
      },
      {
        id: 'prefabrication',
        title: '사전제작 ( Pre-fabrication )',
        subtitle: '"비바람을 맞지 않는 환경에서 정성껏 만듭니다." (정밀 제조 모듈러)',
        paragraphs: [
          '비바람과 습기는 건축물의 수명을 단축시키는 주원인입니다.',
          '위트는 기후와 환경이 완벽히 제어된 위트 팩토리 내에서 전체 공정의 80% 이상을 제작합니다.',
          '정밀한 용접이 필요한 철골과 습도 관리가 필수인 목재 모두 최적의 환경에서 가공되며, 숙련된 엔지니어의 엄격한 QC(품질관리)를 거쳐 출하됩니다.',
        ],
        coreValue: '현장 숙련도에 의존하지 않는, 설계 도면의 수치를 mm 단위까지 정확하게 구현하는 엔지니어링 기반의 제조 품질입니다.',
        image: '/images/modular/prefabrication.webp',
        bg: 'light',
      },
      {
        id: 'osc',
        title: '탈현장 건설 OSC ( Off-Site Construction )',
        subtitle: '시간을 설계하는 병렬 프로세스 (병렬 공정 모듈러)',
        paragraphs: [
          '기존 건축의 고질적인 문제인 공사 지연을 모듈러으로 해결했습니다.',
          '현장에서 기초 토목 공사가 진행되는 동안, 공장에서는 동시에 건물을 제작하는 "병렬 공정(Parallel Process)"을 도입했습니다.',
          '순차적으로 기다릴 필요 없이 두 과정이 동시에 진행되어, 전체 공사 기간을 획기적으로 단축합니다.',
        ],
        coreValue: '날씨와 민원 등 현장 변수로 인한 지연이 없습니다. 약속된 일정에 정확히 입주하고, 비즈니스 기회를 앞당기는 합리적인 솔루션입니다.',
        image: '/images/modular/osc.webp',
        bg: 'dark',
      },
      {
        id: 'assembly',
        title: '조립방식의 건축 ( Prefabricated Building )',
        subtitle: '소음 없이 완성되는 적층의 미학 (모듈 적층 공법)',
        paragraphs: [
          '복잡하고 시끄러운 공사 현장은 없습니다.',
          '공장에서 완성된 모듈 유닛을 현장으로 운송하여, 크레인을 이용해 레고 블록처럼 "적층(Stacking)"하고 체결합니다.',
          '현장에서는 단순 조립과 마감 작업만 이루어지기에 소음, 분진, 건축 폐기물 발생을 최소화하여 주변 환경과 이웃을 배려합니다.',
        ],
        coreValue: '시공 과정의 스트레스를 없앤 깨끗한 현장, 그리고 훗날 건물의 확장이나 이동(Relocation)까지 가능한 지속 가능한 건축 방식입니다.',
        image: '/images/modular/prefabricated-building.webp',
        bg: 'dark',
      },
    ],
  },
  EN: {
    hero: {
      title: 'What is Modular Construction?',
      lead: 'Over 90% is finished in the factory; on site we simply stack and connect.',
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
          'From materials to MEP and finishes, we run standardized lines that cut field work by over 80%.',
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
        subtitle: 'Stack, connect, and finish—spaces can stand up in a single day.',
        paragraphs: [
          'Modules arrive complete, are lifted into place, connected, and finalized with minimal on-site finishing.',
          'Need to expand or relocate later? Modules can be separated, moved, and reassembled for higher asset flexibility.',
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
  const copy = COPY[language];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section id="what-is-modular" className="bg-gray-50 py-16 lg:py-24 scroll-mt-[180px]">
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
          className={`${section.bg === 'light' ? 'bg-white' : 'bg-gray-50'} py-16 lg:py-24 scroll-mt-[180px]`}
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

      {/* CTA Section */}
      <section className="bg-gray-900 py-20 lg:py-32 text-center px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-black text-white mb-6">
            {language === 'KO' ? '나에게 맞는 위트 찾기' : 'Find your weet'}
          </h2>
          <p className="text-gray-300 text-lg mb-10 leading-relaxed">
            {language === 'KO'
              ? '위트의 모듈러 기술로 완성된 다양한 제품 라인업을 확인하고, 내게 필요한 공간을 직접 구성해보세요.'
              : 'Explore our product lineup built with advanced modular technology, and customize your own space.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/products" className="inline-flex h-14 items-center justify-center rounded-lg bg-white px-8 text-sm font-bold text-gray-900 transition-colors hover:bg-gray-100">
              {language === 'KO' ? '제품 전체 보기' : 'View all products'}
            </a>
            <a href="/customize" className="inline-flex h-14 items-center justify-center rounded-lg border border-gray-600 bg-transparent px-8 text-sm font-bold text-white transition-colors hover:bg-gray-800">
              {language === 'KO' ? '나만의 위트 만들기' : 'Customize your weet'}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

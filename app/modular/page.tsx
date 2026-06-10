'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowDown, ArrowRight } from 'lucide-react';

type Lang = 'KO' | 'EN';

const COPY: Record<Lang, {
  hero: { title: string; lead: string; scrollHint: string };
  intro: { title: string; paragraphs: string[] };
  processes: Array<{
    id: string;
    step: string;
    title: string;
    description: string;
    image: string;
    bg: 'light' | 'dark';
  }>;
  cta: {
    title: string;
    description: string;
    customize: string;
    products: string;
    support: string;
  };
}> = {
  KO: {
    hero: {
      title: '불확실성을 지운 프리미엄 공간',
      lead: 'WEET의 모듈러 건축은 예측 가능합니다. 통제된 공장 환경에서 완성되어, 합의된 일정에 맞춰 당신의 대지 위로 배송됩니다.',
      scrollHint: '제작부터 설치까지의 여정'
    },
    intro: {
      title: '건축의 새로운 기준',
      paragraphs: [
        '기존의 현장 건축은 날씨와 작업자의 숙련도, 그리고 수많은 변수에 의존해야 했습니다. WEET는 이 모든 불확실성을 기술로 통제합니다.',
        '모든 공간은 오차를 줄이도록 설계된 공장 환경에서 정밀하게 사전 제작됩니다. 우리는 현장의 소음과 분진을 최소화하고, 검증된 공정으로 당신의 공간을 현실로 만듭니다.'
      ]
    },
    processes: [
      {
        id: 'factory-precision',
        step: '01 / 공장 제작',
        title: 'mm 단위의 정밀한 엔지니어링',
        description: '날씨의 영향을 받지 않는 실내 공장에서 골조부터 마감까지 전체 공정의 80% 이상을 완성합니다. 일관된 품질 관리와 엄격한 검수를 통해 도면의 수치를 정확하게 실제 공간으로 구현합니다.',
        image: '/images/modular/generated/factory-precision.webp',
        bg: 'light',
      },
      {
        id: 'transport-install',
        step: '02 / 운송 및 크레인 조립',
        title: '하루 만에 완성되는 적층의 미학',
        description: '완성된 모듈을 당신의 대지로 안전하게 운송합니다. 현장에서는 복잡한 공사 없이 크레인을 이용해 모듈을 결합하기만 하면 됩니다. 수개월의 기다림이 단 하루의 감동으로 바뀝니다.',
        image: '/images/modular/generated/transport-install.webp',
        bg: 'dark',
      },
      {
        id: 'interior-comfort',
        step: '03 / 생활과 운영',
        title: '타협 없는 거주의 쾌적함',
        description: '강철의 견고함과 목재의 따뜻함을 결합한 하이브리드 구조로 단열과 방음 성능을 챙깁니다. 입주 첫날부터 준비된 쾌적한 실내 환경에서 새로운 일상을 시작하세요.',
        image: '/images/modular/generated/interior-comfort.webp',
        bg: 'light',
      },
      {
        id: 'flexible-commercial',
        step: '04 / 미래 확장과 이동',
        title: '변화하는 삶에 맞추는 유연성',
        description: '비즈니스가 성장하거나 삶의 터전이 바뀌더라도 걱정 없습니다. WEET의 모듈은 필요에 따라 공간을 덧붙여 확장하거나, 통째로 분리하여 새로운 장소로 이동할 수 있는 진정한 자산입니다.',
        image: '/images/modular/generated/flexible-commercial.webp',
        bg: 'dark',
      },
    ],
    cta: {
      title: '공간의 미래를 경험하세요',
      description: 'WEET의 모듈러 기술로 완성된 다양한 제품을 확인하고 나만의 공간을 구성해보세요.',
      products: '제품 전체 보기',
      customize: '나만의 위트 만들기',
      support: '구매 과정 알아보기'
    }
  },
  EN: {
    hero: {
      title: 'Premium Spaces Without Uncertainty',
      lead: 'WEET modular architecture is predictable. Completed in perfectly controlled factories and delivered to your site right on schedule.',
      scrollHint: 'The journey from factory to site'
    },
    intro: {
      title: 'The New Standard of Building',
      paragraphs: [
        'Traditional construction relies on weather, worker skill, and endless site variables. WEET controls these uncertainties through technology.',
        'Every space is precision-built in a factory environment with zero tolerance. We eliminate site noise and dust, bringing your vision to life through the most advanced methods.'
      ]
    },
    processes: [
      {
        id: 'factory-precision',
        step: '01 / Factory Precision',
        title: 'Engineering down to the millimeter',
        description: 'Unconstrained by weather, over 80% of the build is finished indoors. From structural frames to final touches, rigorous QC ensures blueprints are matched perfectly into reality.',
        image: '/images/modular/generated/factory-precision.webp',
        bg: 'light',
      },
      {
        id: 'transport-install',
        step: '02 / Transport & Installation',
        title: 'Standing up in a single day',
        description: 'Finished modules are safely transported to your site. With minimal site work, modules are lifted and connected via crane. Months of waiting become a single day of installation.',
        image: '/images/modular/generated/transport-install.webp',
        bg: 'dark',
      },
      {
        id: 'interior-comfort',
        step: '03 / Living Comfort',
        title: 'Uncompromised interior quality',
        description: 'Our hybrid structure combines steel durability with warm timber insulation for superior thermal and acoustic performance. Experience a perfectly conditioned environment from day one.',
        image: '/images/modular/generated/interior-comfort.webp',
        bg: 'light',
      },
      {
        id: 'flexible-commercial',
        step: '04 / Future Expansion',
        title: 'Flexibility for changing needs',
        description: 'If your business grows or you need to relocate, your WEET module adapts. Expand by adding modules or detach and move them to a new site—true flexibility as a lasting asset.',
        image: '/images/modular/generated/flexible-commercial.webp',
        bg: 'dark',
      },
    ],
    cta: {
      title: 'Experience the future of space',
      description: 'Explore products built with WEET\'s advanced modular technology and customize your own.',
      products: 'View all products',
      customize: 'Customize your weet',
      support: 'View purchase process'
    }
  },
};

export default function ModularPage() {
  const { language } = useLanguage();
  const copy = COPY[language];

  return (
    <div className="min-h-screen bg-white">
      {/* Full-bleed Hero */}
      <section className="relative h-[90vh] md:h-screen w-full flex flex-col justify-end">
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/images/modular/generated/modular-hero.webp"
            alt={copy.hero.title}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 max-w-[1600px] w-full mx-auto px-4 md:px-8 lg:px-[140px] pb-24 md:pb-32">
          <h1 className="text-4xl md:text-6xl lg:text-[80px] font-black text-white mb-6 leading-tight max-w-4xl break-keep">
            {copy.hero.title}
          </h1>
          <p className="text-lg md:text-2xl text-white/90 font-medium max-w-2xl leading-relaxed break-keep">
            {copy.hero.lead}
          </p>
        </div>

        {/* Scroll Hint */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center z-10">
          <div className="flex flex-col items-center text-white/70">
            <span className="text-sm font-semibold uppercase mb-2">
              {copy.hero.scrollHint}
            </span>
            <ArrowDown className="w-5 h-5" />
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section id="what-is-modular" className="py-24 md:py-32 bg-white scroll-mt-[80px]">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-[140px]">
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-10">
              {copy.intro.title}
            </h2>
            <div className="space-y-6">
              {copy.intro.paragraphs.map((p, idx) => (
                <p key={idx} className="text-lg md:text-xl text-gray-600 leading-relaxed break-keep">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process Sections */}
      <div className="flex flex-col">
        {copy.processes.map((process, idx) => (
          <section
            key={process.id}
            id={process.id}
            className={`py-24 md:py-32 scroll-mt-[80px] ${process.bg === 'light' ? 'bg-white' : 'bg-gray-50'}`}
          >
            <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-[140px]">
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center ${idx % 2 !== 0 ? 'lg:grid-flow-col-dense' : ''}`}>
                <div className={`w-full aspect-[16/10] relative ${idx % 2 !== 0 ? 'lg:col-start-2' : ''}`}>
                  <Image
                    src={process.image}
                    alt={process.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover rounded-sm"
                  />
                </div>

                <div className={`${idx % 2 !== 0 ? 'lg:col-start-1' : ''}`}>
                  <span className="block text-sm font-bold text-gray-400 mb-4 uppercase">
                    {process.step}
                  </span>
                  <h3 className="text-3xl md:text-4xl lg:text-[40px] font-black text-gray-900 mb-6 leading-tight break-keep">
                    {process.title}
                  </h3>
                  <p className="text-lg text-gray-600 leading-relaxed break-keep">
                    {process.description}
                  </p>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* CTA Section */}
      <section className="bg-gray-900 py-24 md:py-32 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
            {copy.cta.title}
          </h2>
          <p className="text-gray-300 text-lg md:text-xl mb-12 leading-relaxed break-keep">
            {copy.cta.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/customize"
              className="inline-flex h-14 items-center justify-center gap-2 rounded-sm bg-[#FEBD16] px-8 text-sm font-bold text-gray-950 transition-colors hover:bg-[#E5A410]"
            >
              {copy.cta.customize} <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/products"
              className="inline-flex h-14 items-center justify-center rounded-sm bg-white px-8 text-sm font-bold text-gray-900 transition-colors hover:bg-gray-100"
            >
              {copy.cta.products}
            </Link>
            <Link
              href="/support"
              className="inline-flex h-14 items-center justify-center rounded-sm border border-gray-600 bg-transparent px-8 text-sm font-bold text-white transition-colors hover:bg-gray-800"
            >
              {copy.cta.support}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

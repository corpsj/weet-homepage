'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Language } from '@/contexts/LanguageContext';

// 공정 이미지는 언어 무관 — 모듈러 전용 생성 자산으로 고정.
const PROCESS_IMAGES: Record<string, string> = {
  'factory-precision': '/images/modular/generated/factory-precision.webp',
  'transport-install': '/images/modular/generated/transport-install.webp',
  'interior-comfort': '/images/modular/generated/interior-comfort.webp',
  'flexible-commercial': '/images/modular/generated/flexible-commercial.webp',
};

const COPY: Record<Language, {
  hero: { title: string; lead: string; scrollHint: string };
  intro: {
    title: string;
    paragraphs: string[];
    stats: { value: string; unit?: string; label: string }[];
  };
  processes: Array<{ id: string; step: string; title: string; description: string }>;
  cta: { title: string; description: string; customize: string; products: string; support: string; solution: string };
}> = {
  KO: {
    hero: {
      title: '불확실성을 지운 프리미엄 공간',
      lead: 'WEET의 모듈러 건축은 예측 가능합니다. 통제된 공장 환경에서 완성되어 합의된 일정에 맞춰 당신의 대지 위로 배송됩니다.',
      scrollHint: '제작부터 설치까지',
    },
    intro: {
      title: '건축의 새로운 기준',
      paragraphs: [
        '기존의 현장 건축은 날씨와 작업자의 숙련도, 수많은 변수에 의존해야 했습니다. WEET는 이 모든 불확실성을 기술로 통제합니다.',
        '모든 공간은 오차를 줄이도록 설계된 공장에서 정밀하게 사전 제작됩니다. 현장의 소음과 분진을 줄이고, 검증된 공정으로 머릿속 공간을 그대로 지어 올립니다.',
      ],
      stats: [
        { value: '80', unit: '%+', label: '공장 사전 제작' },
        { value: '1', unit: '일', label: '현장 조립' },
        { value: 'mm', label: '단위 정밀 시공' },
      ],
    },
    processes: [
      {
        id: 'factory-precision',
        step: '01 / 공장 제작',
        title: 'mm 단위의 정밀한 엔지니어링',
        description: '날씨의 영향을 받지 않는 실내 공장에서 골조부터 마감까지 전체 공정의 80% 이상을 완성합니다. 일관된 품질 관리와 엄격한 검수로 도면의 수치를 그대로 실제 공간에 옮깁니다.',
      },
      {
        id: 'transport-install',
        step: '02 / 운송 및 크레인 조립',
        title: '하루 만에 완성되는 적층의 미학',
        description: '완성된 모듈을 당신의 대지로 안전하게 운송합니다. 현장에서는 복잡한 공사 없이 크레인을 이용해 모듈을 결합하기만 하면 됩니다. 수개월의 기다림이 단 하루의 감동으로 바뀝니다.',
      },
      {
        id: 'interior-comfort',
        step: '03 / 생활과 운영',
        title: '타협 없는 거주의 쾌적함',
        description: '강철의 견고함과 목재의 따뜻함을 결합한 하이브리드 구조로 단열과 방음 성능을 챙깁니다. 입주 첫날부터 준비된 쾌적한 실내 환경에서 새로운 일상을 시작하세요.',
      },
      {
        id: 'flexible-commercial',
        step: '04 / 미래 확장과 이동',
        title: '변화하는 삶에 맞추는 유연성',
        description: '비즈니스가 성장하거나 삶의 터전이 바뀌더라도 걱정 없습니다. WEET의 모듈은 필요에 따라 공간을 덧붙여 확장하거나, 통째로 분리하여 새로운 장소로 이동할 수 있는 진정한 자산입니다.',
      },
    ],
    cta: {
      title: '공간의 미래를 경험하세요',
      description: 'WEET의 모듈러 기술로 완성된 다양한 제품을 확인하고 나만의 공간을 구성해보세요.',
      products: '제품 전체 보기',
      customize: '나만의 위트 만들기',
      support: '구매 과정 알아보기',
      solution: '테크 옵션 보기',
    },
  },
  EN: {
    hero: {
      title: 'Premium Spaces Without Uncertainty',
      lead: 'WEET modular architecture is predictable. Completed in perfectly controlled factories and delivered to your site right on schedule.',
      scrollHint: 'From factory to site',
    },
    intro: {
      title: 'The New Standard of Building',
      paragraphs: [
        'Traditional construction relies on weather, worker skill, and endless site variables. WEET controls these uncertainties through technology.',
        'Every space is precision-built in a factory environment with zero tolerance. We eliminate site noise and dust, bringing your vision to life through the most advanced methods.',
      ],
      stats: [
        { value: '80', unit: '%+', label: 'Factory prefab' },
        { value: '1', unit: 'day', label: 'On-site assembly' },
        { value: 'mm', label: 'Precision build' },
      ],
    },
    processes: [
      {
        id: 'factory-precision',
        step: '01 / Factory Precision',
        title: 'Engineering down to the millimeter',
        description: 'Unconstrained by weather, over 80% of the build is finished indoors. From structural frames to final touches, rigorous QC ensures blueprints are matched perfectly into reality.',
      },
      {
        id: 'transport-install',
        step: '02 / Transport & Installation',
        title: 'Standing up in a single day',
        description: 'Finished modules are safely transported to your site. With minimal site work, modules are lifted and connected via crane. Months of waiting become a single day of installation.',
      },
      {
        id: 'interior-comfort',
        step: '03 / Living Comfort',
        title: 'Uncompromised interior quality',
        description: 'Our hybrid structure combines steel durability with warm timber insulation for superior thermal and acoustic performance. Experience a perfectly conditioned environment from day one.',
      },
      {
        id: 'flexible-commercial',
        step: '04 / Future Expansion',
        title: 'Flexibility for changing needs',
        description: 'If your business grows or you need to relocate, your WEET module adapts. Expand by adding modules or detach and move them to a new site—true flexibility as a lasting asset.',
      },
    ],
    cta: {
      title: 'Experience the future of space',
      description: "Explore products built with WEET's advanced modular technology and customize your own.",
      products: 'View all products',
      customize: 'Customize your weet',
      support: 'View purchase process',
      solution: 'Explore tech options',
    },
  },
  ES: {
    hero: {
      title: 'Espacios Premium Sin Incertidumbre',
      lead: 'La arquitectura modular de WEET es predecible. Se completa en fábricas perfectamente controladas y se entrega en su terreno justo a tiempo.',
      scrollHint: 'De la fábrica al terreno',
    },
    intro: {
      title: 'El Nuevo Estándar de la Construcción',
      paragraphs: [
        'La construcción tradicional depende del clima, la pericia de los operarios y un sinfín de variables en obra. WEET controla estas incertidumbres mediante la tecnología.',
        'Cada espacio se construye con precisión en un entorno de fábrica con tolerancia cero. Eliminamos el ruido y el polvo de la obra, dando vida a su visión con los métodos más avanzados.',
      ],
      stats: [
        { value: '80', unit: '%+', label: 'Prefabricado' },
        { value: '1', unit: 'día', label: 'Montaje en obra' },
        { value: 'mm', label: 'Precisión' },
      ],
    },
    processes: [
      {
        id: 'factory-precision',
        step: '01 / Precisión de Fábrica',
        title: 'Ingeniería al milímetro',
        description: 'Sin las limitaciones del clima, más del 80 % de la construcción se finaliza en interior. Desde la estructura hasta los últimos acabados, un riguroso control de calidad garantiza que los planos se reproduzcan a la perfección en la realidad.',
      },
      {
        id: 'transport-install',
        step: '02 / Transporte e Instalación',
        title: 'Levantado en un solo día',
        description: 'Los módulos terminados se transportan de forma segura hasta su terreno. Con una intervención mínima en obra, los módulos se izan y se conectan mediante grúa. Meses de espera se convierten en un único día de instalación.',
      },
      {
        id: 'interior-comfort',
        step: '03 / Confort Habitacional',
        title: 'Calidad interior sin concesiones',
        description: 'Nuestra estructura híbrida combina la durabilidad del acero con el cálido aislamiento de la madera para un rendimiento térmico y acústico superior. Disfrute de un entorno perfectamente acondicionado desde el primer día.',
      },
      {
        id: 'flexible-commercial',
        step: '04 / Expansión Futura',
        title: 'Flexibilidad para necesidades cambiantes',
        description: 'Si su negocio crece o necesita mudarse, su módulo WEET se adapta. Amplíe añadiendo módulos o sepárelos y trasládelos a un nuevo emplazamiento: verdadera flexibilidad como un activo duradero.',
      },
    ],
    cta: {
      title: 'Viva el futuro del espacio',
      description: 'Explore los productos creados con la avanzada tecnología modular de WEET y personalice el suyo.',
      products: 'Ver todos los productos',
      customize: 'Crea tu weet',
      support: 'Ver el proceso de compra',
      solution: 'Ver opciones tecnológicas',
    },
  },
};

const HERO_IMAGE = '/images/modular/generated/modular-hero.webp';

export default function ModularPage() {
  const { language } = useLanguage();
  const copy = COPY[language];

  return (
    <div className="bg-weet-paper text-weet-ink">
      {/* ===== HERO ===== */}
      <section className="relative min-h-[560px] h-[88vh] overflow-hidden bg-weet-ink">
        <Image
          src={HERO_IMAGE}
          alt={copy.hero.title}
          fill
          priority
          sizes="100vw"
          className="heroimg scale-105 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-weet-ink/90 via-weet-ink/40 to-weet-ink/15" />
        <div className="absolute inset-x-0 bottom-0 px-[5vw] pb-[92px]">
          <div className="mx-auto max-w-[1440px]">
            <div className="mb-5 font-mono text-[12px] font-semibold uppercase tracking-[0.22em] text-weet-gold">
              MODULAR ARCHITECTURE
            </div>
            <h1 className="m-0 max-w-[18ch] text-[clamp(34px,5.4vw,78px)] font-semibold leading-[1.02] tracking-[-0.04em] text-weet-paper kr-balance">
              {copy.hero.title}
            </h1>
            <p className="mt-6 max-w-[52ch] text-[clamp(16px,1.6vw,21px)] font-light leading-[1.6] text-weet-paper/85 kr-balance">
              {copy.hero.lead}
            </p>
          </div>
        </div>
        <div className="wt-bounce absolute inset-x-0 bottom-8 flex flex-col items-center gap-2 text-weet-paper/75">
          <span className="font-mono text-[11px] font-semibold tracking-[0.18em]">{copy.hero.scrollHint}</span>
          <span className="text-lg">↓</span>
        </div>
      </section>

      {/* ===== INTRO ===== */}
      <section id="what-is-modular" className="mx-auto max-w-[1440px] scroll-mt-[80px] px-[5vw] py-24">
        <div className="wt-reveal grid grid-cols-1 items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <h2 className="m-0 text-[clamp(28px,3.4vw,46px)] font-semibold leading-[1.08] tracking-[-0.03em] kr-balance">
            {copy.intro.title}
          </h2>
          <div className="flex flex-col gap-5 pt-2">
            <p className="m-0 text-[clamp(16px,1.5vw,19px)] leading-[1.75] text-weet-sub kr-balance">
              {copy.intro.paragraphs[0]}
            </p>
            <p className="m-0 text-[clamp(15px,1.4vw,17px)] leading-[1.8] text-weet-muted kr-balance">
              {copy.intro.paragraphs[1]}
            </p>
            <div className="mt-3.5 flex flex-wrap gap-10">
              {copy.intro.stats.map((s) => (
                <div key={s.label}>
                  <div className="text-[34px] font-bold tracking-[-0.02em]">
                    {s.value}
                    {s.unit && <span className="text-[18px] text-weet-gold-deep">{s.unit}</span>}
                  </div>
                  <div className="mt-1 text-[12.5px] text-weet-muted">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== PROCESS BANDS ===== */}
      <section className="border-t border-weet-line-2">
        <div className="mx-auto max-w-[1320px] px-[5vw]">
          {copy.processes.map((p, idx) => {
            const reverse = idx % 2 === 1;
            return (
              <article
                key={p.id}
                id={p.id}
                className="wt-reveal grid scroll-mt-[80px] grid-cols-1 items-center gap-8 border-b border-weet-line-2 py-14 md:grid-cols-2 md:gap-[72px] md:py-[88px]"
              >
                <div className={reverse ? 'md:order-2' : ''}>
                  <div className="group relative aspect-[16/11] overflow-hidden rounded-[14px] border border-weet-line-2 shadow-weet-float">
                    <Image
                      src={PROCESS_IMAGES[p.id]}
                      alt={p.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.04]"
                    />
                  </div>
                </div>
                <div className={reverse ? 'md:order-1' : ''}>
                  <span className="mb-4 block font-mono text-[12px] font-semibold tracking-[0.14em] text-weet-gold-deep">
                    {p.step}
                  </span>
                  <h3 className="m-0 mb-4 text-[clamp(26px,3vw,40px)] font-semibold leading-[1.08] tracking-[-0.03em] kr-balance">
                    {p.title}
                  </h3>
                  <p className="m-0 max-w-[46ch] text-[16px] leading-[1.85] text-weet-sub kr-balance">
                    {p.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="bg-weet-ink text-weet-paper">
        <div className="wt-reveal mx-auto max-w-[1320px] px-[5vw] py-24 text-center md:py-[100px]">
          <div className="mb-4 font-mono text-[12px] font-semibold uppercase tracking-[0.18em] text-weet-gold">
            EXPERIENCE THE FUTURE
          </div>
          <h2 className="mx-auto mb-4 max-w-[20ch] text-[clamp(28px,3.6vw,48px)] font-semibold leading-[1.08] tracking-[-0.03em] kr-balance">
            {copy.cta.title}
          </h2>
          <p className="mx-auto mb-9 max-w-[44ch] text-[16px] font-light leading-[1.7] text-weet-paper/65 kr-balance">
            {copy.cta.description}
          </p>
          <div className="flex flex-wrap justify-center gap-3.5">
            <Link
              href="/customize"
              className="rounded-[6px] bg-weet-gold px-[30px] py-[15px] text-[15px] font-semibold text-weet-ink transition-transform duration-150 hover:-translate-y-0.5"
            >
              {copy.cta.customize} →
            </Link>
            <Link
              href="/products"
              className="rounded-[6px] bg-weet-paper px-7 py-[15px] text-[15px] font-semibold text-weet-ink transition-transform duration-150 hover:-translate-y-0.5"
            >
              {copy.cta.products}
            </Link>
            <Link
              href="/support"
              className="rounded-[6px] border border-weet-paper/40 px-[26px] py-3.5 text-[15px] font-medium text-weet-paper transition-transform duration-150 hover:-translate-y-0.5"
            >
              {copy.cta.support}
            </Link>
            <Link
              href="/solution"
              className="rounded-[6px] border border-weet-paper/40 px-[26px] py-3.5 text-[15px] font-medium text-weet-paper transition-transform duration-150 hover:-translate-y-0.5"
            >
              {copy.cta.solution} →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import CrewModal from '@/components/ui/CrewModal';
import ImageSlider from '@/components/ui/ImageSlider';
import { useTranslation } from '@/hooks/useTranslation';

interface CrewData {
  name: string;
  role: string;
  description: string;
  sections: { title: string; items: string[] }[];
  images: string[];
}

// 데코 이미지는 언어 무관 — 시안(co-*) 자산으로 고정.
const HERO_IMAGE = '/images/modular/generated/factory-precision.webp';
const SLOGAN_IMAGE = '/images/handoff/co-slogan.webp';
const CI_LOGO_IMAGE = '/images/handoff/co-ci-logo.webp';

const CREW_AVATARS: Record<string, string> = {
  design: '/images/handoff/co-crew-design.webp',
  solution: '/images/handoff/co-crew-solution.webp',
};

export default function CompanyPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const t = useTranslation();

  // Construct Crew Data from Dictionary
  const CREW_DATA: Record<string, CrewData> = {
    design: {
      name: t.company.crew.design.name,
      role: t.company.crew.design.role,
      description: t.company.crew.design.description,
      sections: [
        t.company.crew.design.education,
        t.company.crew.design.career,
        t.company.crew.design.awards,
      ],
      images: ['/images/crew/park-profile.webp', '/images/crew/park-action.webp'],
    },
    solution: {
      name: t.company.crew.solution.name,
      role: t.company.crew.solution.role,
      description: t.company.crew.solution.description,
      sections: [
        t.company.crew.solution.education,
        t.company.crew.solution.career,
        t.company.crew.solution.awards,
      ],
      images: [],
    },
  };

  const [selectedCrew, setSelectedCrew] = useState<CrewData | null>(null);

  const openModal = (crewKey: keyof typeof CREW_DATA) => {
    setSelectedCrew(CREW_DATA[crewKey]);
    setIsModalOpen(true);
  };

  const crewOrder: { key: keyof typeof CREW_DATA; dept: string }[] = [
    { key: 'design', dept: t.company.crew.design.title },
    { key: 'solution', dept: t.company.crew.solution.title },
  ];

  return (
    <div className="bg-weet-paper text-weet-ink">
      {/* ===== HERO ===== */}
      <section className="relative h-[72vh] min-h-[520px] overflow-hidden bg-weet-ink">
        <Image
          src={HERO_IMAGE}
          alt={t.company.hero.subtitle}
          fill
          priority
          sizes="100vw"
          className="heroimg scale-[1.06] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-weet-ink/[0.86] via-weet-ink/[0.28] to-weet-ink/[0.12]" />
        <div className="absolute inset-x-0 bottom-0 px-[5vw] pb-16">
          <div className="mx-auto max-w-[1440px]">
            <div className="mb-[18px] font-mono text-[12px] font-semibold uppercase tracking-[0.26em] text-weet-gold">
              Company · 회사소개
            </div>
            <h1 className="m-0 max-w-[18ch] text-[clamp(34px,5vw,68px)] font-semibold leading-[1.05] tracking-[-0.035em] text-weet-paper kr-balance">
              {t.company.hero.title}
            </h1>
            <p className="mt-[22px] max-w-[46ch] text-[clamp(15px,1.5vw,19px)] font-light leading-[1.6] text-weet-paper/85 kr-balance">
              {t.company.hero.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* ===== PHILOSOPHY ===== */}
      <section
        id="philosophy"
        className="mx-auto max-w-[1440px] scroll-mt-[80px] px-[5vw] py-24 md:py-[120px]"
      >
        <div className="wt-reveal grid grid-cols-1 items-start gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          {/* Left: Slogan Image */}
          <div>
            <div className="flex items-center justify-center rounded-[14px] bg-weet-ink p-11">
              <Image
                src={SLOGAN_IMAGE}
                alt="We make dreams come true"
                width={340}
                height={408}
                sizes="(max-width: 1024px) 80vw, 340px"
                className="h-auto w-full max-w-[340px] mix-blend-screen"
                priority
              />
            </div>
          </div>

          {/* Right: Content */}
          <div>
            <div className="mb-5 font-mono text-[12px] font-semibold uppercase tracking-[0.2em] text-weet-gold-deep">
              Philosophy · 철학
            </div>
            <h2 className="m-0 mb-7 text-[clamp(24px,2.6vw,34px)] font-semibold leading-[1.3] tracking-[-0.025em] kr-balance">
              {t.company.hero.desc1}
            </h2>
            <div className="flex flex-col gap-[18px] text-[15.5px] leading-[1.85] text-weet-sub kr-balance">
              <p className="m-0">{t.company.hero.desc2}</p>
              <p className="m-0">{t.company.hero.desc3}</p>
            </div>

            <div className="mt-[34px] flex flex-col border-t border-weet-line-2">
              <div className="flex gap-[18px] border-b border-weet-line-2 py-5">
                <span className="w-7 flex-none font-mono text-[14px] font-bold text-weet-gold">01</span>
                <p className="m-0 text-[14.5px] leading-[1.7] text-weet-ink/85 kr-balance">
                  {t.company.hero.desc3_1}
                </p>
              </div>
              <div className="flex gap-[18px] border-b border-weet-line-2 py-5">
                <span className="w-7 flex-none font-mono text-[14px] font-bold text-weet-gold">02</span>
                <p className="m-0 text-[14.5px] leading-[1.7] text-weet-ink/85 kr-balance">
                  {t.company.hero.desc3_2}
                </p>
              </div>
              <div className="flex gap-[18px] py-5">
                <span className="w-7 flex-none font-mono text-[14px] font-bold text-weet-gold">03</span>
                <p className="m-0 text-[14.5px] leading-[1.7] text-weet-ink/85 kr-balance">
                  {t.company.hero.desc3_3}
                </p>
              </div>
            </div>

            <p className="mb-0 mt-[30px] text-[14px] leading-[1.8] text-weet-muted kr-balance">
              {t.company.hero.desc4}{' '}
              <strong className="font-semibold text-weet-ink">{t.company.hero.companyName}</strong>
            </p>
          </div>
        </div>
      </section>

      {/* ===== CI ===== */}
      <section id="ci" className="scroll-mt-[80px] bg-weet-ink text-weet-paper">
        <div className="wt-reveal mx-auto grid max-w-[1440px] grid-cols-1 items-start gap-12 px-[5vw] py-24 md:py-[120px] lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <div className="mb-5 font-mono text-[12px] font-semibold uppercase tracking-[0.2em] text-weet-gold">
              Corporate Identity · 기업 CI
            </div>
            <h2 className="m-0 mb-8 text-[clamp(26px,3vw,40px)] font-semibold leading-[1.1] tracking-[-0.03em]">
              {t.company.ci.title}
            </h2>
            <div className="relative aspect-square w-full max-w-[320px] overflow-hidden rounded-[12px]">
              <Image
                src={CI_LOGO_IMAGE}
                alt="위트(WEET) 로고"
                fill
                sizes="(max-width: 1024px) 80vw, 320px"
                className="object-contain"
              />
            </div>
          </div>

          <div className="flex flex-col">
            {/* weet:) - 1st */}
            <div className="border-b border-weet-paper/15 pb-[26px]">
              <div className="mb-2.5 flex flex-wrap items-baseline gap-3.5">
                <span className="text-[24px] font-bold text-weet-paper">
                  {t.company.ci.meaning1_title}
                  <span className="text-weet-gold">:)</span>
                </span>
                <span className="whitespace-nowrap text-[12.5px] text-weet-paper/65">
                  {t.company.ci.meaning1_sub}
                </span>
              </div>
              <p className="m-0 text-[14.5px] leading-[1.7] text-weet-paper/65 kr-balance">
                {t.company.ci.meaning1_desc}
              </p>
            </div>

            {/* weet = wit - 2nd */}
            <div className="border-b border-weet-paper/15 py-[26px]">
              <div className="mb-2.5 flex flex-wrap items-baseline gap-3.5">
                <span className="text-[24px] font-bold text-weet-paper">
                  {t.company.ci.meaning2_title} <span className="text-weet-gold">= wit</span>
                </span>
                <span className="whitespace-nowrap text-[12.5px] text-weet-paper/65">
                  {t.company.ci.meaning2_sub}
                </span>
              </div>
              <p className="m-0 text-[14.5px] leading-[1.7] text-weet-paper/65 kr-balance">
                {t.company.ci.meaning2_desc}
              </p>
            </div>

            {/* Black & Yellow */}
            <div className="border-b border-weet-paper/15 py-[26px]">
              <div className="mb-3 flex flex-wrap items-center gap-3.5">
                <span className="flex items-center gap-[7px]">
                  <span className="h-4 w-4 rounded-[3px] border border-weet-paper/30 bg-weet-ink" />
                  <span className="h-4 w-4 rounded-[3px] bg-weet-gold" />
                </span>
                <span className="text-[18px] font-bold">{t.company.ci.color_title}</span>
                <span className="whitespace-nowrap text-[12.5px] text-weet-paper/65">
                  {t.company.ci.color_sub}
                </span>
              </div>
              <p className="m-0 text-[14.5px] leading-[1.7] text-weet-paper/65 kr-balance">
                {t.company.ci.color_desc}
              </p>
            </div>

            {/* Inverted Triangle */}
            <div className="pt-[26px]">
              <div className="mb-3 flex items-center gap-3.5">
                <svg width="22" height="22" viewBox="0 0 36 36" className="block" aria-hidden="true">
                  <path d="M0 0H36L18 36Z" fill="#FDB813" />
                </svg>
                <span className="text-[18px] font-bold">{t.company.ci.shape_title}</span>
              </div>
              <p className="m-0 text-[14.5px] leading-[1.7] text-weet-paper/65 kr-balance">
                {t.company.ci.shape_desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CREW ===== */}
      <section
        id="crew"
        className="mx-auto max-w-[1440px] scroll-mt-[80px] px-[5vw] py-24 md:pt-[120px] md:pb-[90px]"
      >
        <div className="wt-reveal">
          <div className="mb-3.5 flex items-center gap-3">
            <svg width="26" height="26" viewBox="0 0 36 36" className="block" aria-hidden="true">
              <path d="M0 0L36 36L0 36Z" fill="#231D16" />
            </svg>
            <h2 className="m-0 text-[clamp(26px,3vw,40px)] font-bold tracking-[-0.03em]">
              {t.company.crew.title}
            </h2>
          </div>
          <p className="m-0 mb-[50px] max-w-[52ch] text-[16px] text-weet-sub kr-balance">
            설계부터 시공, 솔루션까지. 처음부터 끝까지 함께합니다.
          </p>

          <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
            {crewOrder.map(({ key, dept }) => {
              const crew = CREW_DATA[key];
              return (
                <div
                  key={key}
                  className="wt-crew flex flex-col rounded-[14px] border border-weet-line bg-weet-surface p-8 shadow-weet-card transition-transform duration-300 hover:-translate-y-1.5 hover:shadow-weet-float md:p-9"
                >
                  <div className="mb-6 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-weet-paper-alt">
                    <Image
                      src={CREW_AVATARS[key]}
                      alt={crew.name}
                      width={96}
                      height={96}
                      sizes="96px"
                      className="h-[78%] w-[78%] object-contain"
                    />
                  </div>
                  <div className="mb-2 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-weet-gold-deep">
                    {dept}
                  </div>
                  <h3 className="m-0 mb-1 text-[22px] font-semibold tracking-[-0.02em]">{crew.name}</h3>
                  <p className="m-0 mb-[18px] text-[13.5px] text-weet-muted">{crew.role}</p>
                  <p className="m-0 mb-[26px] line-clamp-4 text-[14px] leading-[1.7] text-weet-sub kr-balance">
                    {crew.description}
                  </p>
                  <button
                    type="button"
                    onClick={() => openModal(key)}
                    className="mt-auto inline-flex min-h-[44px] items-center self-start rounded-[6px] bg-weet-ink px-[22px] py-[11px] text-[13px] font-semibold text-weet-paper transition-transform duration-150 hover:-translate-y-0.5"
                  >
                    {t.company.crew.more} →
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== FACTORY ===== */}
      <section
        id="factory"
        className="mx-auto max-w-[1440px] scroll-mt-[80px] px-[5vw] pb-24 pt-12 md:pb-[130px] md:pt-[50px]"
      >
        <div className="wt-reveal">
          <div className="mb-3.5 flex items-center gap-3">
            <svg width="26" height="26" viewBox="0 0 36 36" className="block" aria-hidden="true">
              <path d="M0 0L36 36L0 36Z" fill="#231D16" />
            </svg>
            <h2 className="m-0 text-[clamp(26px,3vw,40px)] font-bold tracking-[-0.03em]">
              {t.company.factory.title}
            </h2>
          </div>
          <p className="m-0 mb-[50px] max-w-[52ch] text-[16px] text-weet-sub kr-balance">
            꿈을 연구하고, 꿈을 짓는 공간. 자체 생산 시설에서 품질을 끝까지 책임집니다.
          </p>

          <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
            {/* LAB */}
            <div className="wt-fcard overflow-hidden rounded-[14px] border border-weet-line bg-weet-surface">
              <div className="relative overflow-hidden">
                <ImageSlider
                  images={t.company.factory.lab.images}
                  alt={t.company.factory.lab.title}
                  aspectRatio="aspect-[4/3]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <span className="pointer-events-none absolute left-4 top-4 z-20 rounded-full bg-weet-ink/70 px-3.5 py-1.5 font-mono text-[12px] font-bold tracking-[0.12em] text-weet-gold backdrop-blur-sm">
                  {t.company.factory.lab.title}
                </span>
              </div>
              <div className="px-[26px] pb-7 pt-6">
                <h3 className="m-0 mb-1.5 text-[20px] font-semibold">{t.company.factory.lab.title}</h3>
                <p className="m-0 text-[14.5px] text-weet-sub kr-balance">{t.company.factory.lab.desc}</p>
              </div>
            </div>

            {/* WORKSHOP */}
            <div className="wt-fcard overflow-hidden rounded-[14px] border border-weet-line bg-weet-surface">
              <div className="relative overflow-hidden">
                <ImageSlider
                  images={t.company.factory.workshop.images}
                  alt={t.company.factory.workshop.title}
                  aspectRatio="aspect-[4/3]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <span className="pointer-events-none absolute left-4 top-4 z-20 rounded-full bg-weet-ink/70 px-3.5 py-1.5 font-mono text-[12px] font-bold tracking-[0.12em] text-weet-gold backdrop-blur-sm">
                  {t.company.factory.workshop.title}
                </span>
              </div>
              <div className="px-[26px] pb-7 pt-6">
                <h3 className="m-0 mb-1.5 text-[20px] font-semibold">
                  {t.company.factory.workshop.title}
                </h3>
                <p className="m-0 text-[14.5px] text-weet-sub kr-balance">
                  {t.company.factory.workshop.desc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="bg-weet-ink-deep text-weet-paper">
        <div className="mx-auto max-w-[1440px] px-[5vw] py-24 text-center md:py-[96px]">
          <h2 className="m-0 mb-[18px] text-[clamp(28px,3.4vw,46px)] font-semibold leading-[1.1] tracking-[-0.03em] kr-balance">
            당신의 꿈을, 위트와 함께.
          </h2>
          <p className="mx-auto mb-9 max-w-[44ch] text-[16px] font-light leading-[1.7] text-weet-paper/65 kr-balance">
            로망과 니즈, 그 둘을 모두 실현하는 작업자들이 기다립니다.
          </p>
          <div className="flex flex-wrap justify-center gap-3.5">
            <Link
              href="/support"
              className="inline-flex items-center gap-2 rounded-[6px] bg-weet-gold px-[30px] py-[15px] text-[15px] font-semibold text-weet-ink transition-transform duration-150 hover:-translate-y-0.5"
            >
              상담 신청하기 →
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center rounded-[6px] border border-weet-paper/40 px-7 py-3.5 text-[15px] font-medium text-weet-paper transition-transform duration-150 hover:-translate-y-0.5"
            >
              제품 둘러보기
            </Link>
          </div>
        </div>
      </section>

      <CrewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        data={selectedCrew}
      />
    </div>
  );
}

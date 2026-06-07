import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Building2, CheckCircle2, Factory, Home, MapPinned, Ruler, Store, Truck, Wrench } from 'lucide-react';

export const metadata: Metadata = {
  title: '홈',
  description: '위트 이동식주택을 필요한 크기와 옵션으로 직접 구성하고 상담까지 이어가세요.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    url: '/',
    title: '위트 이동식주택',
    description: '작은 공간, 선명한 기준. 내 집을 필요한 크기와 옵션으로 직접 구성해보세요.',
  },
};

const transparencyFeatures = [
  {
    icon: Ruler,
    title: '모델 및 옵션 구성',
    text: '3x6, 3x9 등 모듈러 베이스 모델과 라이프스타일에 맞는 옵션을 온라인에서 즉시 구성하고 예상 견적을 확인할 수 있습니다.',
  },
  {
    icon: Wrench,
    title: '포함 및 별도 범위',
    text: '제품 자체에 포함된 기본 사양과, 부지 토목·기초, 전기·상하수 인입 등 현장에서 별도로 발생하는 비용을 명확히 구분합니다.',
  },
  {
    icon: MapPinned,
    title: '현장 설치 조건',
    text: '진입로 폭, 크레인 작업 반경, 인허가 가능 여부 등 제품 배송 전 확인해야 할 필수 요소를 사전에 체크합니다.',
  },
  {
    icon: Truck,
    title: '운송 및 현장 조립',
    text: '공장 제작 후 현장까지의 운송 스케줄과 안전한 설치를 위한 가이드를 제공하여 현장 체류 시간을 최소화합니다.',
  },
  {
    icon: CheckCircle2,
    title: 'A/S 및 사후 관리',
    text: '문·창호 단차, 욕실 누수 등 입주 후 발생할 수 있는 주요 AS 항목들에 대한 명확한 보증 기간과 대응 절차를 안내합니다.',
  },
  {
    icon: Factory,
    title: '공장 제작 기반',
    text: '날씨와 현장 여건에 영향을 받지 않는 실내 공장 제작을 통해 일관된 시공 품질과 단축된 공기를 보장합니다.',
  },
];

const buyerPaths = [
  {
    icon: Home,
    title: '세컨드하우스·귀촌',
    text: '작은 주거 공간을 빠르게 검토하고 싶은 가족에게 모델, 옵션, 설치 조건을 한 번에 정리해줍니다.',
  },
  {
    icon: Store,
    title: '카페·팝업·숙박 운영',
    text: '수익을 내야 하는 공간은 일정과 설치 리스크가 중요합니다. 공장 제작 중심으로 오픈 시점을 예측하기 쉽게 만듭니다.',
  },
  {
    icon: Building2,
    title: '기관·법인 프로젝트',
    text: '반복 설치, 농촌·복지·교육·업무용 모듈처럼 목적이 분명한 프로젝트를 표준 공정과 상담 기록으로 관리합니다.',
  },
];

export default function HomePage() {
  return (
    <main className="bg-[#fbfbfa] text-[#111111] selection:bg-black selection:text-white">
      {/* 1. First Viewport: Product-led, image-led, full-bleed hero */}
      <section className="relative min-h-[calc(100svh-192px)] w-full bg-[#111] text-white overflow-hidden">
        <Image
          src="/images/hero_main.webp"
          alt="위트 이동식주택 외관"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-60 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#111]/40 via-transparent to-[#111]" />

        <div className="absolute inset-0 flex flex-col justify-end px-6 pb-28 md:px-12 md:pb-32 lg:px-24 mx-auto w-full z-10">
          <div className="max-w-4xl">
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-300">WEET MOBILE HOME</p>
            <h1 className="text-5xl font-black leading-[1.1] md:text-7xl lg:text-[88px]">
              작은 공간, <br />
              선명한 기준.
            </h1>
            <p className="mt-8 max-w-2xl text-sm leading-relaxed text-gray-300 md:text-base lg:text-lg">
              이동식주택을 고를 때의 막연함을 없앱니다. <br className="hidden md:block" />
              모델 선택부터 운송, 설치, 그리고 예상 비용까지 모든 과정을 투명하게 공개합니다.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/customize"
                className="inline-flex h-12 items-center justify-center gap-3 rounded bg-white px-8 text-sm font-bold text-[#111] transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                모델 구성하기
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/support"
                className="inline-flex h-12 items-center justify-center rounded px-8 text-sm font-bold text-white transition-colors hover:bg-white/10"
              >
                진행 과정 보기
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-60 z-10 hidden md:flex">
          <span className="text-[9px] font-black uppercase tracking-[0.3em]">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
        </div>
      </section>

      {/* 2. Trust / Transparency Section */}
      <section className="bg-[#111111] px-6 pt-16 pb-20 md:px-12 md:pt-20 md:pb-24 lg:px-24 lg:pt-20 lg:pb-32 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div className="max-w-2xl">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">TRANSPARENCY</p>
              <h2 className="text-3xl font-black md:text-5xl lg:text-6xl">
                불확실성은 남기지 않습니다.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-gray-400">
              '예상치 못한 현장 비용'과 '품질 편차'. 위트는 주택 설치의 가장 큰 리스크를 제거하기 위해 모든 기준을 선명하게 설계합니다.
            </p>
          </div>

          <div className="grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {transparencyFeatures.map((feature) => (
              <div key={feature.title} className="group border-t border-white/10 pt-6">
                <feature.icon className="h-6 w-6 text-gray-400 mb-5 transition-colors group-hover:text-white" />
                <h3 className="text-lg font-bold">{feature.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-400">
                  {feature.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Immersive Image Gallery / Proof */}
      <section className="px-4 py-8 md:px-8 lg:px-12 bg-[#111111]">
        <div className="mx-auto max-w-[1800px] grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="relative aspect-[4/5] overflow-hidden rounded bg-gray-900 group">
            <Image
              src="/images/products/small/private/3x6-house.webp"
              alt="생활 동선"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">DESIGN</p>
              <p className="text-lg font-bold text-white">최적화된 생활 동선</p>
            </div>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded bg-gray-900 group hidden md:block">
            <Image
              src="/images/company/factory.webp"
              alt="제작 환경"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">FACTORY</p>
              <p className="text-lg font-bold text-white">표준화된 제작 환경</p>
            </div>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded bg-gray-900 group">
            <Image
              src="/images/products/large/L-2.webp"
              alt="설치 현장"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">INSTALLATION</p>
              <p className="text-lg font-bold text-white">안전한 현장 설치</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Target Audience */}
      <section className="bg-[#fbfbfa] px-6 py-20 md:px-12 lg:px-24 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">WHO IT FITS</p>
            <h2 className="text-3xl font-black md:text-4xl lg:text-5xl">
              목적에 맞는 공간을 <br className="md:hidden" />
              정확하게.
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {buyerPaths.map((path) => (
              <div key={path.title} className="rounded border border-[#e5e5df] bg-white p-8 transition-shadow hover:shadow-md">
                <path.icon className="h-6 w-6 text-gray-900 mb-6" />
                <h3 className="text-xl font-black text-gray-900">{path.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-gray-600">
                  {path.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA Section */}
      <section className="bg-white px-6 py-24 md:px-12 lg:px-24 lg:py-32 text-center border-t border-[#e5e5df]">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-black md:text-5xl lg:text-6xl">
            지금 바로 구성해보세요
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-gray-600 md:text-base">
            원하는 크기와 옵션을 선택하면 예상 견적과 함께 <br className="hidden md:block" />
            위트 매니저가 현장 조건에 맞춘 정확한 안내를 도와드립니다.
          </p>
          <Link
            href="/customize"
            className="mt-10 inline-flex h-14 items-center justify-center gap-3 rounded bg-[#111111] px-10 text-sm font-bold text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            나만의 위트 만들기
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}

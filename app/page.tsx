import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, ClipboardCheck, Factory, Home, MapPinned, Ruler, Truck } from 'lucide-react';

export const metadata: Metadata = {
  title: '홈',
  description: '위트 이동식주택을 필요한 크기와 옵션으로 직접 구성하고 상담까지 이어가세요.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    url: '/',
    title: '위트 이동식주택',
    description: '작고 단단한 내 집을 필요한 크기와 옵션으로 직접 구성해보세요.',
  },
};

const processSteps = [
  { icon: Ruler, title: '구성', text: '3x6 또는 3x9 모델과 필요한 옵션을 먼저 정리합니다.' },
  { icon: ClipboardCheck, title: '상담', text: '예상 총액과 선택 구성을 바탕으로 설치 조건을 확인합니다.' },
  { icon: Factory, title: '제작', text: '공장 제작 중심으로 품질 편차와 현장 시간을 줄입니다.' },
  { icon: Truck, title: '설치', text: '운반, 설치, 마감 확인까지 순서대로 진행합니다.' },
];

const siteChecks = [
  '진입로와 크레인 작업 가능 여부',
  '전기·상하수 인입 조건',
  '지목과 인허가 확인 범위',
  '운반·설치 일정과 현장 준비 항목',
];

export default function HomePage() {
  return (
    <main className="bg-[#f6f2ea] text-[#2f3432]">
      <section className="px-4 pb-14 pt-12 md:px-8 md:pb-20 md:pt-16 lg:px-16">
        <div className="mx-auto grid max-w-[1500px] gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
          <div className="max-w-xl">
            <p className="mb-4 text-sm font-black uppercase tracking-[0.18em] text-[#8d7133]">WEET MOBILE HOME</p>
            <h1 className="text-4xl font-black leading-tight text-[#2f3432] md:text-6xl">
              위트 이동식주택
            </h1>
            <p className="mt-6 text-lg leading-8 text-[#625b50] md:text-xl">
              작고 단단한 내 집을 필요한 크기와 옵션으로 직접 구성해보세요.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/customize"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[#2f3432] px-5 text-sm font-bold text-white transition-colors hover:bg-[#1f2422]"
              >
                나만의 위트 만들기
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/support"
                className="inline-flex h-12 items-center justify-center rounded-lg border border-[#cfc4b3] bg-[#fbfaf7] px-5 text-sm font-bold text-[#2f3432] transition-colors hover:bg-[#eee6da]"
              >
                진행 과정 보기
              </Link>
            </div>
          </div>

          <div className="relative min-h-[360px] overflow-hidden rounded-lg border border-[#ded5c8] bg-[#fbfaf7] shadow-sm md:min-h-[520px]">
            <Image
              src="/images/hero_main.webp"
              alt="위트 이동식주택 외관"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="border-y border-[#ded5c8] bg-[#fbfaf7] px-4 py-14 md:px-8 lg:px-16">
        <div className="mx-auto max-w-[1500px]">
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-black text-[#8d7133]">PROCESS</p>
              <h2 className="mt-2 text-3xl font-black md:text-4xl">처음 선택부터 설치까지</h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-[#6f6658]">
              고객은 먼저 구성해보고, 위트는 그 구성을 바탕으로 현장 조건과 제작 가능성을 빠르게 좁혀갑니다.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {processSteps.map((step) => (
              <div key={step.title} className="rounded-lg border border-[#ded5c8] bg-[#f6f2ea] p-5">
                <step.icon className="h-6 w-6 text-[#8d7133]" />
                <h3 className="mt-5 text-xl font-black">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#625b50]">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-14 md:px-8 lg:px-16">
        <div className="mx-auto grid max-w-[1500px] gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="relative min-h-[360px] overflow-hidden rounded-lg border border-[#ded5c8] bg-[#fbfaf7] md:min-h-[470px]">
            <Image
              src="/images/company/factory.webp"
              alt="위트 제작 현장"
              fill
              sizes="(max-width: 1024px) 100vw, 46vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-sm font-black text-[#8d7133]">SITE CHECK</p>
            <h2 className="mt-2 text-3xl font-black md:text-4xl">좋은 선택은 현장 확인에서 완성됩니다</h2>
            <p className="mt-5 text-base leading-8 text-[#625b50]">
              이동식주택은 제품만 고르면 끝나는 일이 아닙니다. 설치할 땅의 진입, 인입, 인허가 조건을 함께 확인해야 실제 일정과 비용이 선명해집니다.
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {siteChecks.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-lg border border-[#ded5c8] bg-[#fbfaf7] p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#8d7133]" />
                  <span className="text-sm font-semibold leading-6 text-[#4f473d]">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#2f3432] px-4 py-14 text-[#fbfaf7] md:px-8 lg:px-16">
        <div className="mx-auto max-w-[1500px]">
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-black text-[#d3a745]">TRUST</p>
              <h2 className="mt-2 text-3xl font-black md:text-4xl">작게 보여도, 집답게 만듭니다</h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-[#d8d0c3]">
              실제 제품과 제작 환경을 기반으로, 이동식주택이 필요한 사람에게 필요한 만큼의 선택지를 제공합니다.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              { src: '/images/products/medium/36+36집-1.webp', title: '생활 동선', icon: Home },
              { src: '/images/company/workshop.webp', title: '제작 환경', icon: Factory },
              { src: '/images/products/medium/39+33서재.webp', title: '설치 활용', icon: MapPinned },
            ].map((item) => (
              <div key={item.title} className="overflow-hidden rounded-lg border border-white/15 bg-white/5">
                <div className="relative aspect-[4/3]">
                  <Image src={item.src} alt={item.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
                </div>
                <div className="flex items-center gap-3 p-4">
                  <item.icon className="h-5 w-5 text-[#d3a745]" />
                  <span className="font-bold">{item.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 md:px-8 lg:px-16">
        <div className="mx-auto max-w-[960px] text-center">
          <h2 className="text-3xl font-black md:text-4xl">필요한 크기와 옵션부터 정해보세요</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-[#625b50]">
            구성 결과는 상담 요청과 함께 저장되고, 위트가 현장 조건을 확인해 최종 견적과 제작 일정을 안내합니다.
          </p>
          <Link
            href="/customize"
            className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[#2f3432] px-6 text-sm font-bold text-white transition-colors hover:bg-[#1f2422]"
          >
            나만의 위트 만들기
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}

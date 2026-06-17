import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Factory,
  Home,
  MapPinned,
  MessagesSquare,
  Phone,
  Ruler,
  Store,
  Truck,
  Wrench,
} from 'lucide-react';
import { getPublicCustomizeCatalog } from '@/app/actions/customize-actions';
import { getPublicGalleryItems } from '@/app/actions/gallery-actions';
import { getFaqs } from '@/app/actions/faq-actions';
import { telHref } from '@/lib/site-settings';
import { getSiteSettings } from '@/lib/site-settings.server';
import { formatModelStartPrice } from '@/lib/customize/priceCalculator';
import { buildPageMetadata } from '@/lib/seo';

export const revalidate = 300;

export const metadata = {
  ...buildPageMetadata({
    title: '이동식주택·농막·세컨하우스 제작 전문',
    description:
      '공장에서 제작해 현장에 설치하는 이동식주택 전문 위트(weet). 3x6(18㎡)·3x9(27㎡) 모델의 기본 가격을 공개하고, 운반·설치·인허가까지 투명하게 안내합니다.',
    path: '/',
  }),
  // Home is the root segment's own page, so the root title template does not
  // apply — bake the brand suffix into the document title explicitly. (og:title
  // stays unsuffixed via buildPageMetadata's openGraph.)
  title: '이동식주택·농막·세컨하우스 제작 전문 | 위트(weet)',
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
    text: '문·창호 단차, 욕실 누수 등 입주 후 발생할 수 있는 주요 AS 항목들에 대한 보증 기준과 대응 절차를 안내합니다.',
  },
  {
    icon: Factory,
    title: '공장 제작 기반',
    text: '날씨와 현장 여건에 영향을 적게 받는 실내 공장 제작으로 품질 편차를 줄이고 공기를 예측 가능하게 만듭니다.',
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

const processSteps = [
  { title: '구성·상담', text: '모델을 구성하거나 상담을 신청합니다.' },
  { title: '현장 확인', text: '진입로·인입·지목을 확인합니다.' },
  { title: '견적·계약', text: '항목별 총액 견적을 확정합니다.' },
  { title: '공장 제작', text: '공장에서 제작하고 검수합니다.' },
  { title: '운반·설치', text: '운반과 설치 후 인도합니다.' },
  { title: 'A/S', text: '입주 후 불편 사항을 조치합니다.' },
];

const MODEL_FIT_NOTES: Record<string, { badge: string; note: string }> = {
  'compact-3x6': {
    badge: '농막 신고 범위',
    note: '연면적 20㎡ 이하인 농막 기준에 들어오는 크기입니다. 작업실·주말 농가에 많이 선택합니다.',
  },
  'standard-3x9': {
    badge: '농촌체류형 쉼터 검토 대상',
    note: '연면적 33㎡ 이하인 쉼터 기준에서 검토할 수 있는 크기입니다. 세컨하우스 용도로 많이 선택합니다.',
  },
};

function cleanGalleryTitle(title: string) {
  return title.replace(/\s*:\)\s*$/u, '').trim();
}

export default async function HomePage() {
  const [catalog, galleryItems, faqs, settings] = await Promise.all([
    getPublicCustomizeCatalog().catch(() => null),
    getPublicGalleryItems(6),
    getFaqs().catch(() => []),
    getSiteSettings(),
  ]);

  const models = (catalog?.models ?? []).filter((model) => model.isActive !== false).slice(0, 2);
  const teaserFaqs = faqs
    .filter((faq) => faq.is_active !== false && faq.question_ko && faq.answer_ko)
    .slice(0, 4);

  return (
    <div className="bg-[#fbfbfa] text-[#111111] selection:bg-black selection:text-white">
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
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-300">WEET MOBILE HOME · 이동식주택</p>
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
                href="/support#consult"
                className="inline-flex h-12 items-center justify-center rounded border border-white/30 px-8 text-sm font-bold text-white transition-colors hover:bg-white/10"
              >
                상담 신청
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-3 opacity-60 z-10 hidden md:flex">
          <span className="text-[9px] font-black uppercase tracking-[0.3em]">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
        </div>
      </section>

      {/* 2. Representative Models with real base prices */}
      {models.length > 0 && (
        <section className="bg-[#fbfbfa] px-6 py-20 md:px-12 lg:px-24 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">MODELS · 대표 모델</p>
              <h2 className="text-3xl font-black md:text-4xl lg:text-5xl">두 가지 기준 모델, <br className="md:hidden" />공개된 기본 가격.</h2>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-gray-600 md:text-base">
                아래 가격은 제품 본체 기준이며, 운반·설치 등 현장 비용은{' '}
                <Link href="/support#cost" className="font-bold text-[#0d6e66] underline-offset-2 hover:underline">
                  비용 안내
                </Link>
                에서 항목별로 확인할 수 있습니다.
              </p>
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
              {models.map((model) => {
                const fit = MODEL_FIT_NOTES[model.id];
                return (
                  <div key={model.id} className="flex flex-col rounded border border-[#e5e5df] bg-white p-8 transition-shadow hover:shadow-md">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-2xl font-black text-gray-900">{model.nameKo}</h3>
                        <p className="mt-1 text-sm text-gray-500">
                          {model.widthM}m × {model.lengthM}m · {model.areaSqm}㎡
                        </p>
                      </div>
                      {fit && (
                        <span className="shrink-0 rounded-full bg-[#0d6e66]/10 px-3 py-1.5 text-xs font-bold text-[#0d6e66]">
                          {fit.badge}
                        </span>
                      )}
                    </div>
                    <p className="mt-5 text-sm leading-relaxed text-gray-600">{fit?.note}</p>
                    <div className="mt-6 flex items-end justify-between gap-4 border-t border-[#e5e5df] pt-6">
                      <div>
                        <p className="text-xs font-bold text-gray-500">기본가</p>
                        <p className="text-xl font-black text-gray-900">{formatModelStartPrice(model.basePrice)}</p>
                        <p className="mt-1 text-xs text-gray-500">운반·설치 별도</p>
                      </div>
                      <Link
                        href="/customize"
                        className="inline-flex h-11 items-center justify-center gap-2 rounded bg-[#111111] px-5 text-sm font-bold text-white transition-transform hover:scale-[1.02]"
                      >
                        이 모델로 구성
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="mt-6 text-sm text-gray-600">
              더 큰 조합과 상업 공간이 필요하다면{' '}
              <Link href="/products" className="font-bold text-gray-900 underline underline-offset-2 hover:text-[#0d6e66]">
                제품 라인업
              </Link>
              과{' '}
              <Link href="/bespoke" className="font-bold text-gray-900 underline underline-offset-2 hover:text-[#0d6e66]">
                비스포크 제작
              </Link>
              을 확인하세요.
            </p>
          </div>
        </section>
      )}

      {/* 3. Trust / Transparency Section */}
      <section className="bg-[#111111] px-6 pt-16 pb-20 md:px-12 md:pt-20 md:pb-24 lg:px-24 lg:pt-20 lg:pb-32 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div className="max-w-2xl">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">TRANSPARENCY · 투명성</p>
              <h2 className="text-3xl font-black md:text-5xl lg:text-6xl">
                불확실성은 남기지 않습니다.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-gray-400">
              &lsquo;예상치 못한 현장 비용&rsquo;과 &lsquo;품질 편차&rsquo;. 위트는 주택 설치의 가장 큰 리스크를 제거하기 위해 모든
              기준을 선명하게 설계합니다.
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

      {/* 4. Real factory / installation evidence */}
      <section className="px-4 py-12 md:px-8 lg:px-12 bg-[#111111] pb-20 md:pb-24">
        <div className="mx-auto max-w-[1800px]">
          <div className="mb-8 flex flex-col gap-4 px-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">RECORDS · 제작·설치 기록</p>
              <h2 className="text-2xl font-black text-white md:text-3xl">공장과 현장에서 찍은 실제 기록</h2>
            </div>
            <Link href="/projects" className="inline-flex items-center gap-2 text-sm font-bold text-gray-300 hover:text-white">
              기록 더 보기
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {galleryItems.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {galleryItems.map((item) => (
                <div key={item.id} className="relative aspect-[4/3] overflow-hidden rounded bg-gray-900 group">
                  <Image
                    src={item.image_url}
                    alt={cleanGalleryTitle(item.title)}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <p className="absolute bottom-4 left-4 right-4 text-sm font-bold text-white">
                    {cleanGalleryTitle(item.title)}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[
                { src: '/images/company/factory.webp', label: '표준화된 제작 환경' },
                { src: '/images/products/small/private/3x6-house.webp', label: '최적화된 생활 동선' },
                { src: '/images/products/large/L-2.webp', label: '안전한 현장 설치' },
              ].map((item) => (
                <div key={item.src} className="relative aspect-[4/3] overflow-hidden rounded bg-gray-900">
                  <Image src={item.src} alt={item.label} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <p className="absolute bottom-4 left-4 right-4 text-sm font-bold text-white">{item.label}</p>
                </div>
              ))}
            </div>
          )}

          <p className="mt-6 px-2 text-xs leading-5 text-gray-500">
            위 사진은 위트 공장과 설치 현장에서 직접 기록한 이미지입니다. 더 많은 현장 소식은{' '}
            <a href={settings.naver_blog_url} target="_blank" rel="noopener noreferrer" className="font-bold text-gray-300 hover:text-white">
              네이버 블로그
            </a>
            와{' '}
            <a href={settings.instagram_url} target="_blank" rel="noopener noreferrer" className="font-bold text-gray-300 hover:text-white">
              인스타그램
            </a>
            에서 확인할 수 있습니다.
          </p>
        </div>
      </section>

      {/* 5. Process strip */}
      <section className="bg-white px-6 py-20 md:px-12 lg:px-24 lg:py-28 border-b border-[#e5e5df]">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">PROCESS · 진행 과정</p>
              <h2 className="text-3xl font-black md:text-4xl">상담부터 입주까지, 여섯 단계.</h2>
            </div>
            <Link href="/support#process" className="inline-flex items-center gap-2 text-sm font-bold text-gray-700 hover:text-[#0d6e66]">
              과정 자세히 보기
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
            {processSteps.map((step, index) => (
              <div key={step.title} className="rounded border border-[#e5e5df] bg-[#fbfbfa] p-5">
                <p className="text-sm font-black text-gray-300">{String(index + 1).padStart(2, '0')}</p>
                <h3 className="mt-3 font-black text-gray-900">{step.title}</h3>
                <p className="mt-2 text-xs leading-5 text-gray-600">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Target Audience */}
      <section className="bg-[#fbfbfa] px-6 py-20 md:px-12 lg:px-24 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">WHO IT FITS · 쓰임새</p>
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

      {/* 7. FAQ teaser */}
      {teaserFaqs.length > 0 && (
        <section className="bg-white px-6 py-20 md:px-12 lg:px-24 border-t border-[#e5e5df]">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.35fr_0.65fr]">
            <div>
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">FAQ</p>
              <h2 className="text-3xl font-black md:text-4xl">자주 묻는 질문</h2>
              <Link href="/support#faq" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-gray-700 hover:text-[#0d6e66]">
                전체 질문 보기
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="space-y-3">
              {teaserFaqs.map((faq) => (
                <details key={faq.id} className="group rounded border border-[#e5e5df] bg-[#fbfbfa]">
                  <summary className="flex cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left font-bold text-gray-900">
                    {faq.question_ko}
                    <ArrowRight className="h-4 w-4 shrink-0 text-gray-400 transition-transform group-open:rotate-90" />
                  </summary>
                  <p className="border-t border-[#e5e5df] bg-white px-5 py-4 text-sm leading-7 text-gray-600">{faq.answer_ko}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 8. CTA + direct contact */}
      <section className="bg-[#fbfbfa] px-6 py-24 md:px-12 lg:px-24 lg:py-32 text-center border-t border-[#e5e5df]">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-black md:text-5xl lg:text-6xl">
            지금 바로 구성해보세요
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-gray-600 md:text-base">
            원하는 크기와 옵션을 선택하면 예상 견적과 함께 <br className="hidden md:block" />
            위트 매니저가 현장 조건에 맞춘 정확한 안내를 도와드립니다.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/customize"
              className="inline-flex h-14 items-center justify-center gap-3 rounded bg-[#111111] px-10 text-sm font-bold text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              나만의 위트 만들기
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={telHref(settings.contact_phone)}
              className="inline-flex h-14 items-center justify-center gap-2 rounded border border-[#d8d0c3] bg-white px-8 text-sm font-bold text-gray-900 transition-colors hover:border-[#0d6e66]"
            >
              <Phone className="h-4 w-4 text-[#0d6e66]" />
              {settings.contact_phone}
            </a>
            <Link
              href="/support#consult"
              className="inline-flex h-14 items-center justify-center gap-2 rounded border border-[#d8d0c3] bg-white px-8 text-sm font-bold text-gray-900 transition-colors hover:border-[#0d6e66]"
            >
              <MessagesSquare className="h-4 w-4 text-[#0d6e66]" />
              상담 신청
            </Link>
          </div>
          {settings.consult_hours && (
            <p className="mt-4 text-xs text-gray-500">상담 가능 시간 {settings.consult_hours}</p>
          )}
        </div>
      </section>
    </div>
  );
}

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
import type { Metadata } from 'next';

export const revalidate = 300;

export const metadata: Metadata = {
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

type ModelFit = { badge: string; note: string };

const MODEL_FIT_NOTES: Record<string, ModelFit> = {
  'compact-3x6': {
    badge: '농막 신고 범위',
    note: '연면적 20㎡ 이하인 농막 기준에 들어오는 크기입니다. 작업실·주말 농가에 많이 선택합니다.',
  },
  'standard-3x9': {
    badge: '농촌체류형 쉼터 검토 대상',
    note: '연면적 33㎡ 이하인 쉼터 기준에서 검토할 수 있는 크기입니다. 세컨하우스 용도로 많이 선택합니다.',
  },
};

const DEFAULT_MODEL_FIT: ModelFit = {
  badge: '기준 모델',
  note: '용도와 부지 조건에 맞춰 구성할 수 있는 기준 모델입니다. 자세한 인허가 기준은 상담에서 확인해 드립니다.',
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
  const hasRealGallery = galleryItems.length > 0;
  const teaserFaqs = faqs
    .filter((faq) => faq.is_active !== false && faq.question_ko && faq.answer_ko)
    .slice(0, 4);

  return (
    <div className="bg-weet-paper text-weet-ink">
      {/* 1. First Viewport: Product-led, image-led, full-bleed hero */}
      {/* TODO(ux): 홈 i18n 연결 — useLanguage 도입은 서버 컴포넌트/데이터 패칭 구조 변경이 필요해 이번 범위에서 제외 */}
      <section className="relative flex min-h-[calc(100svh-72px)] w-full items-end overflow-hidden bg-weet-ink text-weet-paper">
        <Image
          src="/images/hero_main.webp"
          alt="위트 이동식주택 외관"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(103deg,rgba(35,29,22,0.72)_0%,rgba(35,29,22,0.34)_46%,rgba(35,29,22,0.04)_74%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-weet-ink/55 via-transparent to-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-[5vw] pb-[14vh] md:pb-[9vh]">
          <div className="max-w-[46ch]">
            <p className="mb-5 font-mono text-[clamp(11px,1vw,13px)] font-semibold uppercase tracking-[0.3em] text-weet-gold">
              WEET MOBILE HOME · 이동식주택
            </p>
            <h1 className="m-0 text-[clamp(40px,6.4vw,86px)] font-semibold leading-[1.04] tracking-[-0.04em] kr-balance">
              작은 공간, <br />
              선명한 기준.
            </h1>
            <p className="mt-6 max-w-[34ch] text-[clamp(15px,1.5vw,20px)] font-light leading-[1.7] text-weet-paper/85 kr-balance">
              이동식주택을 고를 때의 막연함을 없앱니다. <br className="hidden md:block" />
              모델 선택부터 운송, 설치, 그리고 예상 비용까지 모든 과정을 투명하게 공개합니다.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/customize"
                className="inline-flex items-center justify-center gap-2 rounded-[6px] bg-weet-gold px-[30px] py-[15px] text-[15px] font-semibold text-weet-ink transition-transform duration-150 hover:-translate-y-0.5"
              >
                모델 구성하기
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="#models"
                className="inline-flex items-center justify-center rounded-[6px] border border-weet-paper/45 bg-weet-paper/[0.08] px-7 py-[15px] text-[15px] font-medium text-weet-paper transition-colors duration-200 hover:bg-weet-paper/[0.16]"
              >
                대표 모델 보기
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Hint */}
        <Link
          href="#models"
          aria-label="다음 섹션으로 이동"
          className="wt-bounce absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
        >
          <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.34em] text-weet-paper/70">Scroll</span>
          <span className="h-[42px] w-px bg-gradient-to-b from-weet-paper/80 to-transparent" />
        </Link>
      </section>

      {/* 2. Representative Models with real base prices */}
      <section id="models" className="scroll-mt-24 bg-weet-paper px-[5vw] py-14 md:py-24">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-14 max-w-[44ch]">
            <p className="mb-4 font-mono text-[12px] font-semibold uppercase tracking-[0.24em] text-weet-gold-deep">MODELS · 대표 모델</p>
            <h2 className="m-0 text-[clamp(28px,3.4vw,46px)] font-semibold leading-[1.1] tracking-[-0.025em] kr-balance">
              기준 모델과 <br className="md:hidden" />공개된 기본 가격.
            </h2>
            <p className="mt-[18px] text-[15px] leading-[1.7] text-weet-sub kr-balance">
              위트는 제품 본체 기준 가격을 공개합니다. 운반·설치 등 현장 비용은{' '}
              <Link href="/support#cost" className="font-semibold text-weet-gold-deep underline underline-offset-2 transition-colors hover:text-weet-ink">
                비용 안내
              </Link>
              에서 항목별로 확인할 수 있습니다.
            </p>
          </div>
          {models.length > 0 ? (
            <div className="grid gap-[22px] lg:grid-cols-2">
              {models.map((model) => {
                const fit = MODEL_FIT_NOTES[model.id] ?? DEFAULT_MODEL_FIT;
                return (
                  <div
                    key={model.id}
                    className="flex flex-col rounded-[12px] border border-weet-line bg-weet-surface p-8 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-weet-float"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="m-0 text-[22px] font-semibold tracking-[-0.01em]">{model.nameKo}</h3>
                        <p className="mt-1.5 text-[13px] text-weet-muted">
                          {model.widthM}m × {model.lengthM}m · {model.areaSqm}㎡
                        </p>
                      </div>
                      <span className="shrink-0 rounded-full bg-weet-forest px-3 py-1.5 text-[11px] font-semibold tracking-[0.02em] text-weet-paper">
                        {fit.badge}
                      </span>
                    </div>
                    <p className="mt-3.5 text-[14px] leading-[1.65] text-weet-sub kr-balance">{fit.note}</p>
                    <div className="mt-6 flex items-end justify-between gap-4 border-t border-weet-line-2 pt-6">
                      <div>
                        <p className="text-[12px] font-semibold text-weet-muted">기본가</p>
                        <p className="mt-0.5 text-[22px] font-semibold tracking-[-0.01em] text-weet-ink">{formatModelStartPrice(model.basePrice)}</p>
                        <p className="mt-0.5 text-[12px] text-weet-muted">운반·설치 별도</p>
                      </div>
                      <Link
                        href="/customize"
                        className="inline-flex items-center justify-center gap-1.5 rounded-[6px] bg-weet-ink px-[18px] py-3 text-[14px] font-semibold text-weet-paper transition-transform duration-150 hover:-translate-y-0.5"
                      >
                        이 모델로 구성
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="rounded-[12px] border border-weet-line bg-weet-surface p-8 md:p-10">
              <p className="m-0 text-[16px] font-semibold text-weet-ink">대표 모델 가격을 준비하고 있습니다.</p>
              <p className="mt-2 max-w-[52ch] text-[14px] leading-[1.7] text-weet-sub kr-balance">
                기준 모델과 기본 가격은 곧 공개됩니다. 지금도 온라인 구성기에서 원하는 크기와 옵션으로 예상 견적을 확인하거나,
                현장 조건에 맞춘 상담을 신청하실 수 있습니다.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/customize"
                  className="inline-flex items-center justify-center gap-2 rounded-[6px] bg-weet-ink px-[22px] py-3 text-[14px] font-semibold text-weet-paper transition-transform duration-150 hover:-translate-y-0.5"
                >
                  온라인 구성하기
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/support#consult"
                  className="inline-flex items-center justify-center gap-2 rounded-[6px] border border-weet-line bg-weet-surface px-[22px] py-3 text-[14px] font-semibold text-weet-ink transition-colors duration-200 hover:border-weet-gold-deep"
                >
                  상담 신청
                </Link>
              </div>
            </div>
          )}
          <p className="mt-7 text-[14px] leading-[1.6] text-weet-sub">
            더 큰 조합과 상업 공간이 필요하다면{' '}
            <Link href="/products" className="font-semibold text-weet-ink underline underline-offset-2 transition-colors hover:text-weet-gold-deep">
              제품 라인업
            </Link>
            과{' '}
            <Link href="/bespoke" className="font-semibold text-weet-ink underline underline-offset-2 transition-colors hover:text-weet-gold-deep">
              비스포크 제작
            </Link>
            을 확인하세요.
          </p>
        </div>
      </section>

      {/* 3. Trust / Transparency Section */}
      <section className="bg-weet-ink px-[5vw] py-14 text-weet-paper md:py-24">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-16 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-[30ch]">
              <p className="mb-[18px] font-mono text-[12px] font-semibold uppercase tracking-[0.24em] text-weet-gold">TRANSPARENCY · 투명성</p>
              <h2 className="m-0 text-[clamp(28px,4vw,52px)] font-semibold leading-[1.08] tracking-[-0.025em] kr-balance">
                불확실성은 남기지 않습니다.
              </h2>
            </div>
            <p className="max-w-[40ch] text-[15px] font-light leading-[1.75] text-weet-paper/65 kr-balance">
              &lsquo;예상치 못한 현장 비용&rsquo;과 &lsquo;품질 편차&rsquo;. 위트는 주택 설치의 가장 큰 리스크를 제거하기 위해 모든
              기준을 선명하게 설계합니다.
            </p>
          </div>

          <div className="grid gap-x-10 gap-y-11 md:grid-cols-2 lg:grid-cols-3">
            {transparencyFeatures.map((feature) => (
              <div key={feature.title} className="group border-t border-weet-paper/[0.14] pt-[22px]">
                <span className="mb-[18px] block h-0.5 w-8 bg-weet-gold" />
                <feature.icon className="mb-4 h-5 w-5 text-weet-gold transition-colors group-hover:text-weet-paper" strokeWidth={1.75} />
                <h3 className="m-0 mb-3 text-[18px] font-semibold">{feature.title}</h3>
                <p className="m-0 text-[14px] font-light leading-[1.7] text-weet-paper/65 kr-balance">
                  {feature.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Real factory / installation evidence */}
      <section className="bg-weet-ink-deep px-[5vw] py-14 text-weet-paper md:py-[92px]">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-9 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3.5 font-mono text-[12px] font-semibold uppercase tracking-[0.24em] text-weet-gold">RECORDS · 제작·설치 기록</p>
              <h2 className="m-0 text-[clamp(22px,2.6vw,34px)] font-semibold tracking-[-0.02em]">공장과 현장에서 찍은 실제 기록</h2>
            </div>
            <Link href="/projects" className="inline-flex items-center gap-2 text-[14px] font-semibold text-weet-paper/75 transition-colors hover:text-weet-gold">
              기록 더 보기
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {galleryItems.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {galleryItems.map((item) => (
                <div key={item.id} className="group relative aspect-[4/3] overflow-hidden rounded-[10px] bg-weet-ink">
                  <Image
                    src={item.image_url}
                    alt={cleanGalleryTitle(item.title)}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(28,22,16,0.8),transparent_55%)]" />
                  <p className="absolute bottom-4 left-[18px] right-[18px] text-[14px] font-semibold text-weet-paper">
                    {cleanGalleryTitle(item.title)}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[
                { src: '/images/modular/generated/factory-precision.webp', label: '표준화된 제작 환경' },
                { src: '/images/modular/generated/interior-comfort.webp', label: '최적화된 생활 동선' },
                { src: '/images/modular/generated/transport-install.webp', label: '안전한 현장 설치' },
              ].map((item) => (
                <div key={item.src} className="group relative aspect-[4/3] overflow-hidden rounded-[10px] bg-weet-ink">
                  <Image src={item.src} alt={item.label} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-700 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-105" />
                  <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(28,22,16,0.8),transparent_55%)]" />
                  <p className="absolute bottom-4 left-[18px] right-[18px] text-[14px] font-semibold text-weet-paper">{item.label}</p>
                </div>
              ))}
            </div>
          )}

          <p className="mt-6 text-[13px] font-light leading-[1.7] text-weet-muted">
            {hasRealGallery
              ? '위 사진은 위트 공장과 설치 현장에서 직접 기록한 이미지입니다.'
              : '위 이미지는 위트의 제작·설치 과정을 보여주기 위한 예시입니다.'}{' '}
            더 많은 현장 소식은{' '}
            <a href={settings.naver_blog_url} target="_blank" rel="noopener noreferrer" className="font-semibold text-weet-paper/75 transition-colors hover:text-weet-gold">
              네이버 블로그
            </a>
            와{' '}
            <a href={settings.instagram_url} target="_blank" rel="noopener noreferrer" className="font-semibold text-weet-paper/75 transition-colors hover:text-weet-gold">
              인스타그램
            </a>
            에서 확인할 수 있습니다.
          </p>
        </div>
      </section>

      {/* 5. Process strip */}
      <section className="bg-weet-paper-alt px-[5vw] py-14 md:py-24">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3.5 font-mono text-[12px] font-semibold uppercase tracking-[0.24em] text-weet-gold-deep">PROCESS · 진행 과정</p>
              <h2 className="m-0 text-[clamp(26px,3.4vw,42px)] font-semibold tracking-[-0.025em]">상담부터 입주까지, 여섯 단계.</h2>
            </div>
            <Link href="/support#process" className="inline-flex items-center gap-2 text-[14px] font-semibold text-weet-ink transition-colors hover:text-weet-gold-deep">
              과정 자세히 보기
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-6">
            {processSteps.map((step, index) => (
              <div key={step.title} className="rounded-[10px] border border-weet-line bg-weet-surface p-6">
                <p className="font-mono text-[13px] font-semibold text-weet-line-2">{String(index + 1).padStart(2, '0')}</p>
                <h3 className="mt-3.5 text-[16px] font-semibold text-weet-ink">{step.title}</h3>
                <p className="mt-2 text-[13px] leading-[1.6] text-weet-sub">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Target Audience */}
      <section className="bg-weet-paper px-[5vw] py-14 md:py-24">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-[52px] max-w-[30ch]">
            <p className="mb-4 font-mono text-[12px] font-semibold uppercase tracking-[0.24em] text-weet-gold-deep">WHO IT FITS · 쓰임새</p>
            <h2 className="m-0 text-[clamp(28px,3.4vw,46px)] font-semibold leading-[1.1] tracking-[-0.025em] kr-balance">
              목적에 맞는 공간을 <br className="md:hidden" />
              정확하게.
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {buyerPaths.map((path) => (
              <div key={path.title} className="rounded-[12px] border border-weet-line bg-weet-surface p-8 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-weet-float">
                <div className="mb-[22px] flex h-11 w-11 items-center justify-center rounded-full bg-[#FBEFD0]">
                  <path.icon className="h-[22px] w-[22px] text-weet-gold-deep" strokeWidth={1.75} />
                </div>
                <h3 className="m-0 text-[19px] font-semibold text-weet-ink">{path.title}</h3>
                <p className="mt-3 text-[14px] leading-[1.7] text-weet-sub kr-balance">
                  {path.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FAQ teaser */}
      {teaserFaqs.length > 0 && (
        <section className="bg-weet-paper-alt px-[5vw] py-14 md:py-24">
          <div className="mx-auto grid max-w-[1440px] items-start gap-12 lg:grid-cols-[0.35fr_0.65fr]">
            <div className="max-w-[34ch]">
              <p className="mb-4 font-mono text-[12px] font-semibold uppercase tracking-[0.24em] text-weet-gold-deep">FAQ</p>
              <h2 className="m-0 text-[clamp(28px,3.4vw,42px)] font-semibold tracking-[-0.025em]">자주 묻는 질문</h2>
              <Link href="/support#faq" className="mt-6 inline-flex items-center gap-2 text-[14px] font-semibold text-weet-ink transition-colors hover:text-weet-gold-deep">
                전체 질문 보기
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="space-y-3">
              {teaserFaqs.map((faq) => (
                <details key={faq.id} className="group rounded-[10px] border border-weet-line bg-weet-surface">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-[22px] py-5 text-left text-[15px] font-semibold text-weet-ink [&::-webkit-details-marker]:hidden">
                    {faq.question_ko}
                    <ArrowRight className="h-4 w-4 shrink-0 text-weet-gold-deep transition-transform duration-300 group-open:rotate-90" />
                  </summary>
                  <p className="m-0 border-t border-weet-line-2 px-[22px] py-[18px] text-[14px] leading-[1.75] text-weet-sub kr-balance">{faq.answer_ko}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 8. CTA + direct contact */}
      <section className="bg-weet-ink px-[5vw] py-20 text-center text-weet-paper md:py-[128px]">
        <div className="mx-auto max-w-[720px]">
          <h2 className="m-0 text-[clamp(30px,4.4vw,56px)] font-semibold leading-[1.08] tracking-[-0.025em] kr-balance">
            지금 바로 구성해보세요
          </h2>
          <p className="mx-auto mb-10 mt-6 max-w-[46ch] text-[clamp(14px,1.4vw,17px)] font-light leading-[1.75] text-weet-paper/70 kr-balance">
            원하는 크기와 옵션을 선택하면 예상 견적과 함께 <br className="hidden md:block" />
            위트 매니저가 현장 조건에 맞춘 정확한 안내를 도와드립니다.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/customize"
              className="inline-flex items-center justify-center gap-2 rounded-[6px] bg-weet-gold px-8 py-4 text-[15px] font-semibold text-weet-ink transition-transform duration-150 hover:-translate-y-0.5"
            >
              나만의 위트 만들기
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={telHref(settings.contact_phone)}
              className="inline-flex items-center justify-center gap-2 rounded-[6px] border border-weet-paper/40 px-7 py-4 text-[15px] font-medium text-weet-paper transition-[transform,border-color] duration-150 hover:-translate-y-0.5 hover:border-weet-gold"
            >
              <Phone className="h-4 w-4 text-weet-gold" />
              {settings.contact_phone}
            </a>
            <Link
              href="/support#consult"
              className="inline-flex items-center justify-center gap-2 rounded-[6px] border border-weet-paper/40 px-7 py-4 text-[15px] font-medium text-weet-paper transition-[transform,border-color] duration-150 hover:-translate-y-0.5 hover:border-weet-gold"
            >
              <MessagesSquare className="h-4 w-4 text-weet-gold" />
              상담 신청
            </Link>
          </div>
          {settings.consult_hours && (
            <p className="mt-5 text-[13px] text-weet-muted">상담 가능 시간 {settings.consult_hours}</p>
          )}
        </div>
      </section>
    </div>
  );
}

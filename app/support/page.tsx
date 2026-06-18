import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import type { ComponentProps } from 'react';
import {
  ArrowRight,
  Bath,
  ClipboardCheck,
  Factory,
  FileCheck2,
  Home,
  Landmark,
  MapPinned,
  PhoneCall,
  Plug,
  Ruler,
  ShieldCheck,
  Truck,
  Wrench,
} from 'lucide-react';
import { getFaqs } from '@/app/actions/faq-actions';
import { telHref } from '@/lib/site-settings';
import { getSiteSettings } from '@/lib/site-settings.server';
import { buildPageMetadata } from '@/lib/seo';
import ConsultForm from '@/components/support/ConsultForm';
import { jsonLdHtml } from '@/lib/json-ld';

// ISR: cache + revalidate every 5 minutes rather than force-dynamic. (F12)
export const revalidate = 300;

export const metadata: Metadata = buildPageMetadata({
  title: '고객지원 — 인허가·비용·진행 과정 안내',
  description:
    '이동식주택을 처음 준비해도 막막하지 않도록 — 농막·쉼터·주거 인허가 구분, 운반·설치 비용 구성, 진행 과정과 A/S까지 위트(weet)가 가장 많이 받는 질문을 기준으로 정리했습니다.',
  path: '/support',
});

const steps = [
  { n: '01', title: '구성·상담 신청', text: '원하는 모델과 옵션을 구성하거나, 상담 신청으로 바로 시작합니다.', icon: Ruler },
  { n: '02', title: '현장 조건 확인', text: '진입로, 인입, 지목과 설치 조건을 함께 확인합니다.', icon: MapPinned },
  { n: '03', title: '견적·계약', text: '현장 조건을 반영해 최종 견적과 일정을 확정합니다.', icon: Home },
  { n: '04', title: '공장 제작', text: '통제된 공장 환경에서 제작하고 품질을 확인합니다.', icon: Factory },
  { n: '05', title: '운반·설치', text: '운반과 설치, 마감 확인 후 인도합니다.', icon: Truck },
  { n: '06', title: '입주 후 A/S', text: '사용 중 불편 사항을 확인하고 필요한 조치를 안내합니다.', icon: ShieldCheck },
];

const supportVisuals = [
  { src: '/images/handoff/sup-1.webp', alt: '상담 준비 단계' },
  { src: '/images/handoff/sup-3.webp', alt: '현장 확인 단계' },
  { src: '/images/handoff/sup-6.webp', alt: '운반 설치 단계' },
];

const permitGuides = [
  {
    icon: Landmark,
    badge: '농막',
    title: '농막으로 두는 경우',
    points: [
      '농막은 농지에 가설건축물 축조 신고로 설치하는 연면적 20㎡ 이하의 시설입니다.',
      '위트 3x6 모델(18㎡)이 이 범위에 해당하는 크기입니다.',
      '주거(전입신고) 목적 사용은 제한되며, 정화조·데크 등 부속시설 기준은 지자체마다 다릅니다.',
    ],
  },
  {
    icon: FileCheck2,
    badge: '쉼터',
    title: '농촌체류형 쉼터로 두는 경우',
    points: [
      '2024년 12월부터 시행된 제도로, 농지에 연면적 33㎡ 이하의 임시 숙소를 둘 수 있습니다.',
      '위트 3x9 모델(27㎡)이 검토 대상이 되는 크기입니다.',
      '본인 영농 활동 등 요건과 세부 기준은 지자체 확인이 필요합니다.',
    ],
  },
  {
    icon: Home,
    badge: '주거·숙박',
    title: '주거·숙박으로 쓰는 경우',
    points: [
      '상시 주거, 펜션·스테이 등 영업 목적은 지목과 용도지역에 따라 건축신고(허가) 대상이 됩니다.',
      '이 경우 가설건축물 신고와는 절차와 비용이 다릅니다.',
      '어떤 절차가 맞는지부터 상담 단계에서 함께 정리해 드립니다.',
    ],
  },
];

const costItems = [
  {
    icon: Ruler,
    dot: 'forest' as const,
    title: '제품 본체',
    text: '기본가와 옵션 가격은 구성 페이지에서 즉시 확인할 수 있습니다. 여기까지는 현장과 무관하게 확정되는 금액입니다.',
    href: '/customize',
    linkLabel: '구성하고 가격 보기',
  },
  {
    icon: Truck,
    dot: 'gold' as const,
    title: '운반비',
    text: '공장(전남 함평)에서 현장까지의 거리와 차량 종류에 따라 달라집니다. 주소가 정해지면 바로 계산해 드립니다.',
  },
  {
    icon: Wrench,
    dot: 'gold' as const,
    title: '하차·설치 장비',
    text: '진입로 폭과 작업 공간에 따라 크레인 규격이 달라지고, 좁은 길은 별도 장비가 필요할 수 있어 현장 확인 후 확정합니다.',
  },
  {
    icon: MapPinned,
    dot: 'gold' as const,
    title: '기초 공사',
    text: '지반 상태에 따라 기초(블록·콘크리트 등) 방식이 달라집니다. 평탄한 부지는 부담이 줄어듭니다.',
  },
  {
    icon: Plug,
    dot: 'gold' as const,
    title: '전기·상하수 인입',
    text: '부지에 전기와 상하수가 이미 들어와 있는지에 따라 비용 차이가 큽니다. 인입 거리 기준으로 산정됩니다.',
  },
  {
    icon: Bath,
    dot: 'gold' as const,
    title: '정화조',
    text: '욕실을 사용하려면 정화조 설치가 필요한 경우가 많고, 용량과 설치 기준은 지자체 기준을 따릅니다.',
  },
];

const asItems = [
  { icon: DoorIcon, title: '문·창호' },
  { icon: Bath, title: '욕실·설비' },
  { icon: Wrench, title: '마감 점검' },
];

const fallbackFaqs = [
  {
    question: '이동식주택은 어디에나 설치할 수 있나요?',
    answer: '부지 지목, 진입로, 전기·상하수 인입, 지역 조례에 따라 달라집니다. 상담 단계에서 설치 가능성을 먼저 확인합니다.',
  },
  {
    question: '예상 총액이 최종 견적인가요?',
    answer: '아니요. 구성 페이지의 예상 총액은 제품과 옵션 기준이며 운반·설치, 현장 공사, 인허가 조건은 상담 후 확정됩니다.',
  },
  {
    question: '제작과 설치 기간은 얼마나 걸리나요?',
    answer: '선택 사양과 현장 조건에 따라 달라지지만, 상담 후 제작 가능 일정과 설치 준비 항목을 함께 안내합니다.',
  },
  {
    question: 'A/S는 어떻게 진행되나요?',
    answer: '사용 중 불편 사항이 생기면 증상과 현장 정보를 확인한 뒤 필요한 점검과 조치를 안내합니다.',
  },
];

export default async function SupportPage() {
  const [dbFaqs, settings] = await Promise.all([getFaqs(), getSiteSettings()]);
  const activeDbFaqs = dbFaqs.filter((faq) => faq.is_active !== false && faq.question_ko && faq.answer_ko);
  const faqs = activeDbFaqs.length > 0
    ? activeDbFaqs.map((faq) => ({ question: faq.question_ko as string, answer: faq.answer_ko as string }))
    : fallbackFaqs;

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="bg-weet-paper text-weet-ink">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdHtml(faqJsonLd) }} />

      {/* ===== HERO ===== */}
      <section className="mx-auto max-w-[1440px] px-[5vw] pb-[60px] pt-[80px] max-[860px]:pb-10 max-[860px]:pt-12">
        <div className="grid grid-cols-1 items-center gap-14 min-[861px]:grid-cols-[0.9fr_1.1fr]">
          <div>
            <div className="mb-5 font-mono text-[12px] font-semibold uppercase tracking-[0.2em] text-weet-gold-deep">
              Support · 고객지원
            </div>
            <h1 className="m-0 text-[clamp(34px,4.6vw,60px)] font-semibold leading-[1.04] tracking-[-0.035em] kr-balance">
              이동식주택,
              <br />
              궁금한 것부터 해결하세요.
            </h1>
            <p className="mt-[22px] max-w-[46ch] text-[clamp(16px,1.5vw,19px)] font-light leading-[1.65] text-weet-sub kr-balance">
              농막·세컨하우스를 처음 준비해도 막막하지 않도록 — 인허가, 비용, 진행 과정과 A/S까지 실제로 가장 많이 받는 질문을
              기준으로 정리했습니다.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="#consult"
                className="wt-btn inline-flex items-center gap-2 rounded-[6px] bg-weet-gold px-[26px] py-[14px] text-[15px] font-semibold text-weet-ink transition-transform duration-150 hover:-translate-y-0.5"
              >
                상담 신청하기
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/customize"
                className="wt-btn inline-flex items-center gap-2 rounded-[6px] border border-weet-line-2 bg-white px-6 py-[13px] text-[15px] font-semibold text-weet-ink transition-transform duration-150 hover:-translate-y-0.5"
              >
                먼저 구성해보기
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {supportVisuals.map((visual, index) => (
              <div
                key={visual.src}
                className={`relative overflow-hidden rounded-[12px] border border-weet-line ${
                  index === 0 ? 'col-span-2 aspect-[16/8]' : 'aspect-[4/3]'
                }`}
              >
                <Image
                  src={visual.src}
                  alt={visual.alt}
                  fill
                  sizes={index === 0 ? '(max-width: 860px) 100vw, 52vw' : '(max-width: 860px) 50vw, 26vw'}
                  priority={index === 0}
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CHECKLIST ===== */}
      <section className="wt-reveal mx-auto max-w-[1440px] px-[5vw] py-[50px]">
        <div className="mb-9 max-w-[52ch]">
          <div className="mb-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-weet-gold-deep">
            Checklist · 사전 확인
          </div>
          <h2 className="m-0 text-[clamp(24px,2.6vw,34px)] font-semibold tracking-[-0.025em]">시작하기 전에</h2>
          <p className="mt-3 text-[15px] leading-[1.7] text-weet-sub kr-balance">
            이동식주택을 준비하며 가장 많이 고민하시는 세 가지 핵심 사항을 먼저 확인해 보세요.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-5 min-[861px]:grid-cols-3">
          <div className="wt-card rounded-[14px] border border-weet-line bg-weet-card p-[30px]">
            <div className="mb-3.5 font-mono text-[13px] font-bold text-weet-gold">01</div>
            <h3 className="m-0 mb-4 text-[18px] font-semibold">현장 설치 조건</h3>
            <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
              <li className="flex gap-2.5 text-[13.5px] leading-[1.55] text-weet-sub">
                <span className="text-weet-forest">•</span>5톤 이상 대형 화물차 진입 가능 여부
              </li>
              <li className="flex gap-2.5 text-[13.5px] leading-[1.55] text-weet-sub">
                <span className="text-weet-forest">•</span>해당 부지의 건축 및 가설건축물 설치 가능 여부
              </li>
              <li className="flex gap-2.5 text-[13.5px] leading-[1.55] text-weet-sub">
                <span className="text-weet-forest">•</span>전기, 상하수도, 정화조 인입 상태
              </li>
            </ul>
          </div>

          <div className="wt-card rounded-[14px] border border-weet-line bg-weet-card p-[30px]">
            <div className="mb-3.5 font-mono text-[13px] font-bold text-weet-gold">02</div>
            <h3 className="m-0 mb-4 text-[18px] font-semibold">운반 및 설치 비용</h3>
            <p className="m-0 text-[13.5px] leading-[1.75] text-weet-sub kr-balance">
              제품 가격 외의 비용은 현장 상황에 따라 크게 달라집니다. 배송 거리, 도로폭에 따른 하차 장비(크레인, 지게차 등),
              지반을 다지는 기초 토목 공사 필요 여부가 전체 예산의 핵심 변수가 됩니다.
            </p>
          </div>

          <div className="wt-card rounded-[14px] border border-weet-line bg-weet-card p-[30px]">
            <div className="mb-3.5 font-mono text-[13px] font-bold text-weet-gold">03</div>
            <h3 className="m-0 mb-4 text-[18px] font-semibold">품질 보증 및 A/S</h3>
            <p className="m-0 text-[13.5px] leading-[1.75] text-weet-sub kr-balance">
              계약서에 명시된 보증 범위 안의 제조상 결함은 우선 점검해 조치합니다. 지반 침하, 천재지변, 사용자 부주의로 인한
              파손은 원인과 범위를 확인한 뒤 실비 기준으로 안내합니다.
            </p>
          </div>
        </div>
      </section>

      {/* ===== PERMITS ===== */}
      <section
        id="permits"
        className="mt-10 scroll-mt-[80px] border-y border-weet-line-2 bg-weet-paper-alt"
      >
        <div className="wt-reveal mx-auto max-w-[1440px] px-[5vw] py-20 max-[860px]:py-14">
          <div className="mb-9 max-w-[60ch]">
            <div className="mb-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-weet-gold-deep">
              Permits · 인허가
            </div>
            <h2 className="m-0 mb-3 text-[clamp(24px,2.6vw,34px)] font-semibold tracking-[-0.025em] kr-balance">
              내 땅에 둘 수 있을까? — 농막·쉼터·주거 구분
            </h2>
            <p className="m-0 text-[15px] leading-[1.7] text-weet-sub kr-balance">
              이동식주택 인허가는 &lsquo;어디에, 어떤 용도로&rsquo; 두는지에 따라 절차가 완전히 달라집니다. 가장 흔한 세 가지
              경우를 기준으로 정리했습니다. 세부 기준은 지자체마다 달라, 상담 시 부지 주소를 기준으로 함께 확인해 드립니다.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-5 min-[861px]:grid-cols-3">
            {permitGuides.map((guide) => (
              <div key={guide.title} className="wt-card rounded-[14px] border border-weet-line bg-weet-card p-[30px]">
                <span className="mb-[18px] inline-flex items-center gap-[7px] rounded-full border border-[#CBDDD2] bg-[#EAF0EC] px-3 py-1.5 text-[12px] font-semibold text-weet-forest">
                  <guide.icon className="h-3.5 w-3.5" />
                  {guide.badge}
                </span>
                <h3 className="m-0 mb-4 text-[18px] font-semibold">{guide.title}</h3>
                <ul className="m-0 flex list-none flex-col gap-[11px] p-0">
                  {guide.points.map((point) => (
                    <li key={point} className="flex gap-2.5 text-[13.5px] leading-[1.6] text-weet-sub">
                      <span className="mt-px text-weet-forest">•</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-6 text-[12px] leading-[1.6] text-weet-muted">
            * 농지법·건축법 관련 기준은 개정될 수 있으며, 지자체 조례에 따라 적용이 다를 수 있습니다. 위 내용은 일반적인 안내이며
            계약 전 관할 지자체 확인을 기준으로 진행합니다.
          </p>
        </div>
      </section>

      {/* ===== COST ===== */}
      <section id="cost" className="wt-reveal mx-auto max-w-[1440px] scroll-mt-[80px] px-[5vw] pb-[50px] pt-20 max-[860px]:pt-14">
        <div className="mb-9 max-w-[62ch]">
          <div className="mb-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-weet-gold-deep">
            Cost · 비용
          </div>
          <h2 className="m-0 mb-3 text-[clamp(24px,2.6vw,34px)] font-semibold tracking-[-0.025em]">
            총비용은 이렇게 구성됩니다
          </h2>
          <p className="m-0 text-[15px] leading-[1.7] text-weet-sub kr-balance">
            이동식주택 가격이 &lsquo;얼마부터&rsquo;라고만 적혀 있는 데는 이유가 있습니다. 제품 가격은 확정할 수 있지만, 나머지는
            부지를 봐야 정확해지기 때문입니다. 위트는 무엇이 확정 금액이고 무엇이 현장 변수인지 그대로 보여드립니다.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-[18px] min-[861px]:grid-cols-3">
          {costItems.map((item) => (
            <div key={item.title} className="wt-card rounded-[14px] border border-weet-line bg-weet-card p-[26px]">
              <div className="mb-3 flex items-center gap-2.5">
                <span
                  className={`h-2 w-2 rounded-full ${item.dot === 'forest' ? 'bg-weet-forest' : 'bg-weet-gold-deep'}`}
                  aria-hidden="true"
                />
                <h3 className="m-0 text-[16.5px] font-semibold">{item.title}</h3>
              </div>
              <p className="m-0 text-[13.5px] leading-[1.7] text-weet-sub kr-balance">{item.text}</p>
              {item.href && (
                <Link
                  href={item.href}
                  className="wt-link mt-3 inline-flex items-center gap-1 text-[13px] font-semibold text-weet-gold-deep hover:underline"
                >
                  {item.linkLabel}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              )}
            </div>
          ))}
        </div>
        <div className="mt-[22px] rounded-[14px] border border-[#CBDDD2] bg-[#EAF0EC] px-[30px] py-[26px]">
          <p className="m-0 text-[14px] leading-[1.8] text-[#3A3026]">
            <strong className="font-semibold text-weet-ink">견적이 확정되는 과정:</strong> 구성 페이지의 예상 총액(제품 본체)을
            기준으로, 부지 주소와 현장 사진을 확인한 뒤 위 항목을 더한 총액 견적을 드립니다. 계약 전 견적에 포함되지 않은 항목이
            현장에서 추가되지 않도록, 별도 비용은 모두 견적서에 항목별로 표기합니다.
            {settings.lead_time_note && ` 제작 기간 안내: ${settings.lead_time_note}.`}
          </p>
        </div>
      </section>

      {/* ===== PROCESS ===== */}
      <section id="process" className="scroll-mt-[80px] border-y border-weet-line-2 bg-weet-paper-alt">
        <div className="wt-reveal mx-auto max-w-[1440px] px-[5vw] py-20 max-[860px]:py-14">
          <div className="mb-9">
            <div className="mb-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-weet-gold-deep">
              Process · 진행 과정
            </div>
            <h2 className="m-0 text-[clamp(24px,2.6vw,34px)] font-semibold tracking-[-0.025em]">구매 과정</h2>
          </div>
          <div className="grid grid-cols-1 gap-[18px] min-[861px]:grid-cols-3">
            {steps.map((step) => (
              <div key={step.title} className="wt-card rounded-[14px] border border-weet-line bg-weet-card p-[26px]">
                <div className="mb-[18px] flex items-center justify-between">
                  <span className="font-mono text-[13px] font-bold text-weet-forest">STEP</span>
                  <span className="font-mono text-[26px] font-bold text-weet-line-2">{step.n}</span>
                </div>
                <h3 className="m-0 mb-2 text-[18px] font-semibold">{step.title}</h3>
                <p className="m-0 text-[13.5px] leading-[1.7] text-weet-sub kr-balance">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section id="faq" className="wt-reveal mx-auto max-w-[1440px] scroll-mt-[80px] px-[5vw] py-20 max-[860px]:py-14">
        <div className="grid grid-cols-1 gap-10 min-[861px]:grid-cols-[0.35fr_0.65fr]">
          <div>
            <div className="mb-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-weet-gold-deep">
              FAQ
            </div>
            <h2 className="m-0 text-[clamp(24px,2.8vw,36px)] font-semibold tracking-[-0.025em]">자주 묻는 질문</h2>
          </div>
          <div className="flex flex-col gap-3">
            {faqs.map((faq, index) => (
              <details
                key={`${faq.question}-${index}`}
                className="group overflow-hidden rounded-[12px] border border-weet-line bg-weet-card"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-[22px] py-5 text-[15.5px] font-semibold text-weet-ink [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <ArrowRight className="h-4 w-4 shrink-0 text-weet-gold-deep transition-transform duration-300 group-open:rotate-90" />
                </summary>
                <p className="m-0 border-t border-weet-paper-alt px-[22px] py-[18px] text-[14px] leading-[1.8] text-weet-sub kr-balance">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ===== A/S ===== */}
      <section id="as" className="scroll-mt-[80px] bg-weet-ink text-weet-paper">
        <div className="wt-reveal mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-12 px-[5vw] py-20 max-[860px]:py-14 min-[861px]:grid-cols-2">
          <div>
            <div className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-weet-gold">
              A/S
            </div>
            <h2 className="m-0 mb-4 text-[clamp(26px,3vw,40px)] font-semibold leading-[1.1] tracking-[-0.03em] kr-balance">
              사용 이후까지 확인합니다.
            </h2>
            <p className="m-0 text-[15px] font-light leading-[1.75] text-weet-paper/65 kr-balance">
              완성 후에도 문, 창호, 욕실, 설비처럼 실제 생활에서 자주 쓰는 부분을 중심으로 불편 사항을 확인하고 필요한 조치를
              안내합니다.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3.5">
            {asItems.map((item) => (
              <div
                key={item.title}
                className="rounded-[12px] border border-weet-paper/15 px-[18px] py-6 text-center"
              >
                <div className="mx-auto mb-4 h-0.5 w-[34px] bg-weet-gold" />
                <item.icon className="mx-auto mb-3 h-5 w-5 text-weet-paper/70" />
                <p className="m-0 text-[14px] font-semibold text-weet-paper">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CONSULT ===== */}
      <section id="consult" className="scroll-mt-[80px] bg-weet-paper-alt">
        <div className="wt-reveal mx-auto grid max-w-[1440px] grid-cols-1 gap-12 px-[5vw] py-20 max-[860px]:py-14 min-[861px]:grid-cols-[0.45fr_0.55fr]">
          <div>
            <div className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-weet-gold-deep">
              Consult · 상담
            </div>
            <h2 className="m-0 mb-[18px] text-[clamp(26px,3vw,40px)] font-semibold tracking-[-0.03em]">상담 신청</h2>
            <p className="m-0 mb-7 max-w-[40ch] text-[15px] leading-[1.8] text-weet-sub kr-balance">
              이름과 연락처만 남겨도 됩니다. 부지 조건과 용도를 기준으로, 어떤 절차와 비용이 적용되는지부터 정리해 드립니다.
            </p>
            <div className="flex flex-col gap-3">
              <a
                href={telHref(settings.contact_phone)}
                className="wt-card flex items-center gap-3.5 rounded-[12px] border border-weet-line bg-weet-card px-5 py-[18px]"
              >
                <span className="flex h-10 w-10 flex-none items-center justify-center rounded-[10px] border border-[#CBDDD2] bg-[#EAF0EC] text-weet-forest">
                  <PhoneCall className="h-[18px] w-[18px]" />
                </span>
                <span>
                  <span className="block text-[15px] font-semibold text-weet-ink">{settings.contact_phone}</span>
                  <span className="block text-[12.5px] text-weet-muted">
                    {settings.consult_hours
                      ? `상담 가능 시간 ${settings.consult_hours}`
                      : '전화 연결이 어려우면 아래 폼으로 남겨주세요.'}
                  </span>
                </span>
              </a>
              {settings.kakao_channel_url && (
                <a
                  href={settings.kakao_channel_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="wt-card flex items-center gap-3.5 rounded-[12px] border border-weet-line bg-weet-card px-5 py-[18px]"
                >
                  <span className="flex h-10 w-10 flex-none items-center justify-center rounded-[10px] border border-[#F4E2A0] bg-[#FEF3CD] text-[#9A7A12]">
                    <ClipboardCheck className="h-[18px] w-[18px]" />
                  </span>
                  <span className="text-[15px] font-semibold text-weet-ink">카카오톡 채널로 문의하기</span>
                </a>
              )}
            </div>
          </div>
          <div className="rounded-[16px] border border-weet-line bg-weet-card p-9 max-[860px]:p-6">
            <ConsultForm />
          </div>
        </div>
      </section>
    </div>
  );
}

function DoorIcon(props: ComponentProps<'svg'>) {
  return <Home {...props} />;
}

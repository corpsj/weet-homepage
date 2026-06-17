import Image from 'next/image';
import Link from 'next/link';
import type { ComponentProps } from 'react';
import {
  ArrowRight,
  Bath,
  Calculator,
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

export const metadata = buildPageMetadata({
  title: '고객지원 — 인허가·비용·진행 과정 안내',
  description:
    '이동식주택을 처음 준비해도 막막하지 않도록 — 농막·쉼터·주거 인허가 구분, 운반·설치 비용 구성, 진행 과정과 A/S까지 위트(weet)가 가장 많이 받는 질문을 기준으로 정리했습니다.',
  path: '/support',
});

const steps = [
  { title: '구성·상담 신청', text: '원하는 모델과 옵션을 구성하거나, 상담 신청으로 바로 시작합니다.', icon: Ruler },
  { title: '현장 조건 확인', text: '진입로, 인입, 지목과 설치 조건을 함께 확인합니다.', icon: MapPinned },
  { title: '견적·계약', text: '현장 조건을 반영해 최종 견적과 일정을 확정합니다.', icon: Home },
  { title: '공장 제작', text: '통제된 공장 환경에서 제작하고 품질을 확인합니다.', icon: Factory },
  { title: '운반·설치', text: '운반과 설치, 마감 확인 후 인도합니다.', icon: Truck },
  { title: '입주 후 A/S', text: '사용 중 불편 사항을 확인하고 필요한 조치를 안내합니다.', icon: ShieldCheck },
];

const supportVisuals = [
  { src: '/images/support/step1.webp', alt: '상담 준비 단계' },
  { src: '/images/support/step3.webp', alt: '현장 확인 단계' },
  { src: '/images/support/step6.webp', alt: '운반 설치 단계' },
];

const permitGuides = [
  {
    icon: Landmark,
    title: '농막으로 두는 경우',
    points: [
      '농막은 농지에 가설건축물 축조 신고로 설치하는 연면적 20㎡ 이하의 시설입니다.',
      '위트 3x6 모델(18㎡)이 이 범위에 해당하는 크기입니다.',
      '주거(전입신고) 목적 사용은 제한되며, 정화조·데크 등 부속시설 기준은 지자체마다 다릅니다.',
    ],
  },
  {
    icon: FileCheck2,
    title: '농촌체류형 쉼터로 두는 경우',
    points: [
      '2024년 12월부터 시행된 제도로, 농지에 연면적 33㎡ 이하의 임시 숙소를 둘 수 있습니다.',
      '위트 3x9 모델(27㎡)이 검토 대상이 되는 크기입니다.',
      '본인 영농 활동 등 요건과 세부 기준은 지자체 확인이 필요합니다.',
    ],
  },
  {
    icon: Home,
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
    title: '제품 본체',
    text: '기본가와 옵션 가격은 구성 페이지에서 즉시 확인할 수 있습니다. 여기까지는 현장과 무관하게 확정되는 금액입니다.',
    href: '/customize',
    linkLabel: '구성하고 가격 보기',
  },
  {
    icon: Truck,
    title: '운반비',
    text: '공장(전남 함평)에서 현장까지의 거리와 차량 종류에 따라 달라집니다. 주소가 정해지면 바로 계산해 드립니다.',
  },
  {
    icon: Wrench,
    title: '하차·설치 장비',
    text: '진입로 폭과 작업 공간에 따라 크레인 규격이 달라지고, 좁은 길은 별도 장비가 필요할 수 있어 현장 확인 후 확정합니다.',
  },
  {
    icon: MapPinned,
    title: '기초 공사',
    text: '지반 상태에 따라 기초(블록·콘크리트 등) 방식이 달라집니다. 평탄한 부지는 부담이 줄어듭니다.',
  },
  {
    icon: Plug,
    title: '전기·상하수 인입',
    text: '부지에 전기와 상하수가 이미 들어와 있는지에 따라 비용 차이가 큽니다. 인입 거리 기준으로 산정됩니다.',
  },
  {
    icon: Bath,
    title: '정화조',
    text: '욕실을 사용하려면 정화조 설치가 필요한 경우가 많고, 용량과 설치 기준은 지자체 기준을 따릅니다.',
  },
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
    <div className="bg-white text-gray-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdHtml(faqJsonLd) }} />

      <section className="px-4 py-14 md:px-8 md:py-20 lg:px-16">
        <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-gray-500">SUPPORT · 고객지원</p>
            <h1 className="mt-4 text-4xl font-black leading-tight md:text-6xl text-gray-900">
              이동식주택, <br className="md:hidden" />
              궁금한 것부터 해결하세요
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              농막·세컨하우스를 처음 준비해도 막막하지 않도록 — 인허가, 비용, 진행 과정과 A/S까지 실제로 가장 많이 받는 질문을
              기준으로 정리했습니다.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#consult"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[#0d6e66] px-5 text-sm font-bold text-white transition-colors hover:bg-[#095a54]"
              >
                상담 신청하기
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/customize"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-gray-300 px-5 text-sm font-bold text-gray-900 transition-colors hover:bg-gray-50"
              >
                먼저 구성해보기
              </Link>
            </div>
          </div>
          <div className="grid min-h-[340px] grid-cols-2 gap-3 overflow-hidden rounded-lg border border-gray-200 bg-gray-50 p-3 md:min-h-[500px]">
            {supportVisuals.map((visual, index) => (
              <div
                key={visual.src}
                className={`relative overflow-hidden rounded-lg bg-gray-200 ${index === 0 ? 'col-span-2 aspect-[16/9]' : 'aspect-[4/3]'}`}
              >
                <Image
                  src={visual.src}
                  alt={visual.alt}
                  fill
                  sizes={index === 0 ? '(max-width: 1024px) 100vw, 52vw' : '(max-width: 1024px) 50vw, 26vw'}
                  priority={index === 0}
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-gray-100 bg-white px-4 py-14 md:px-8 lg:px-16">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-8">
            <p className="text-sm font-black text-gray-500">CHECKLIST · 사전 확인</p>
            <h2 className="mt-2 text-2xl font-black text-gray-900 md:text-3xl">시작하기 전에</h2>
            <p className="mt-4 text-base leading-7 text-gray-600">
              이동식주택을 준비하며 가장 많이 고민하시는 세 가지 핵심 사항을 먼저 확인해 보세요.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="border border-gray-200 rounded-lg p-6">
              <MapPinned className="h-6 w-6 text-gray-400 mb-4" />
              <h3 className="text-lg font-bold text-gray-900">현장 설치 조건</h3>
              <ul className="mt-4 space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-[#0d6e66]">•</span>
                  5톤 이상 대형 화물차 진입 가능 여부
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#0d6e66]">•</span>
                  해당 부지의 건축 및 가설건축물 설치 가능 여부
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#0d6e66]">•</span>
                  전기, 상하수도, 정화조 인입 상태
                </li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <Calculator className="h-6 w-6 text-gray-400 mb-4" />
              <h3 className="text-lg font-bold text-gray-900">운반 및 설치 비용</h3>
              <p className="mt-4 text-sm leading-6 text-gray-600">
                제품 가격 외의 비용은 현장 상황에 따라 크게 달라집니다. 배송 거리, 도로폭에 따른 하차 장비(크레인, 지게차 등),
                지반을 다지는 기초 토목 공사 필요 여부가 전체 예산의 핵심 변수가 됩니다.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <ShieldCheck className="h-6 w-6 text-gray-400 mb-4" />
              <h3 className="text-lg font-bold text-gray-900">품질 보증 및 A/S</h3>
              <p className="mt-4 text-sm leading-6 text-gray-600">
                계약서에 명시된 보증 범위 안의 제조상 결함은 우선 점검해 조치합니다. 지반 침하, 천재지변, 사용자 부주의로 인한
                파손은 원인과 범위를 확인한 뒤 실비 기준으로 안내합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="permits" className="border-t border-gray-100 bg-gray-50 px-4 py-14 md:px-8 lg:px-16">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-8 max-w-3xl">
            <p className="text-sm font-black text-gray-500">PERMITS · 인허가</p>
            <h2 className="mt-2 text-2xl font-black text-gray-900 md:text-3xl">내 땅에 둘 수 있을까? — 농막·쉼터·주거 구분</h2>
            <p className="mt-4 text-base leading-7 text-gray-600">
              이동식주택 인허가는 &lsquo;어디에, 어떤 용도로&rsquo; 두는지에 따라 절차가 완전히 달라집니다. 가장 흔한 세 가지
              경우를 기준으로 정리했습니다. 세부 기준은 지자체마다 달라, 상담 시 부지 주소를 기준으로 함께 확인해 드립니다.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {permitGuides.map((guide) => (
              <div key={guide.title} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <guide.icon className="h-6 w-6 text-[#0d6e66]" />
                <h3 className="mt-4 text-lg font-bold text-gray-900">{guide.title}</h3>
                <ul className="mt-4 space-y-3 text-sm leading-6 text-gray-600">
                  {guide.points.map((point) => (
                    <li key={point} className="flex items-start gap-2">
                      <span className="mt-1 text-[#0d6e66]">•</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs leading-5 text-gray-500">
            * 농지법·건축법 관련 기준은 개정될 수 있으며, 지자체 조례에 따라 적용이 다를 수 있습니다. 위 내용은 일반적인 안내이며
            계약 전 관할 지자체 확인을 기준으로 진행합니다.
          </p>
        </div>
      </section>

      <section id="cost" className="border-t border-gray-100 bg-white px-4 py-14 md:px-8 lg:px-16">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-8 max-w-3xl">
            <p className="text-sm font-black text-gray-500">COST · 비용</p>
            <h2 className="mt-2 text-2xl font-black text-gray-900 md:text-3xl">총비용은 이렇게 구성됩니다</h2>
            <p className="mt-4 text-base leading-7 text-gray-600">
              이동식주택 가격이 &lsquo;얼마부터&rsquo;라고만 적혀 있는 데는 이유가 있습니다. 제품 가격은 확정할 수 있지만, 나머지는
              부지를 봐야 정확해지기 때문입니다. 위트는 무엇이 확정 금액이고 무엇이 현장 변수인지 그대로 보여드립니다.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {costItems.map((item) => (
              <div key={item.title} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <item.icon className="h-6 w-6 text-gray-400" />
                <h3 className="mt-4 text-lg font-bold text-gray-900">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-gray-600">{item.text}</p>
                {item.href && (
                  <Link href={item.href} className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-[#0d6e66] hover:underline">
                    {item.linkLabel}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                )}
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-lg border border-[#0d6e66]/20 bg-[#0d6e66]/5 p-6">
            <p className="text-sm leading-7 text-gray-700">
              <strong className="text-gray-900">견적이 확정되는 과정:</strong> 구성 페이지의 예상 총액(제품 본체)을 기준으로, 부지
              주소와 현장 사진을 확인한 뒤 위 항목을 더한 총액 견적을 드립니다. 계약 전 견적에 포함되지 않은 항목이 현장에서
              추가되지 않도록, 별도 비용은 모두 견적서에 항목별로 표기합니다.
              {settings.lead_time_note && ` 제작 기간 안내: ${settings.lead_time_note}.`}
            </p>
          </div>
        </div>
      </section>

      <section id="process" className="border-y border-gray-100 bg-gray-50 px-4 py-14 md:px-8 lg:px-16">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-8">
            <p className="text-sm font-black text-gray-500">PROCESS · 진행 과정</p>
            <h2 className="mt-2 text-3xl font-black md:text-4xl text-gray-900">구매 과정</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {steps.map((step, index) => (
              <div key={step.title} className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between gap-3">
                  <step.icon className="h-6 w-6 text-gray-400" />
                  <span className="text-sm font-black text-gray-300">{String(index + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="mt-5 text-xl font-black text-gray-900">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-gray-600">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="px-4 py-14 md:px-8 lg:px-16 bg-white">
        <div className="mx-auto grid max-w-[1400px] gap-8 lg:grid-cols-[0.35fr_0.65fr]">
          <div>
            <p className="text-sm font-black text-gray-500">FAQ</p>
            <h2 className="mt-2 text-3xl font-black md:text-4xl text-gray-900">자주 묻는 질문</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <details key={`${faq.question}-${index}`} className="group rounded-lg border border-gray-200 bg-gray-50">
                <summary className="flex cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left font-bold text-gray-900">
                  {faq.question}
                  <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-open:rotate-90 text-gray-400" />
                </summary>
                <p className="border-t border-gray-200 px-5 py-4 text-sm leading-7 text-gray-600 bg-white rounded-b-lg">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="as" className="bg-gray-900 px-4 py-14 text-white md:px-8 lg:px-16">
        <div className="mx-auto grid max-w-[1400px] gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <p className="text-sm font-black text-gray-400">A/S</p>
            <h2 className="mt-2 text-3xl font-black md:text-4xl text-white">사용 이후까지 확인합니다</h2>
            <p className="mt-5 text-base leading-8 text-gray-300">
              완성 후에도 문, 창호, 욕실, 설비처럼 실제 생활에서 자주 쓰는 부분을 중심으로 불편 사항을 확인하고 필요한 조치를
              안내합니다.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { icon: DoorIcon, title: '문·창호' },
              { icon: Bath, title: '욕실·설비' },
              { icon: Wrench, title: '마감 점검' },
            ].map((item) => (
              <div key={item.title} className="rounded-lg border border-gray-800 bg-gray-800/50 p-5">
                <item.icon className="h-6 w-6 text-gray-300" />
                <p className="mt-4 font-bold text-white">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="consult" className="scroll-mt-24 bg-gray-50 px-4 py-14 md:px-8 lg:px-16">
        <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-[0.45fr_0.55fr]">
          <div>
            <p className="text-sm font-black text-gray-500">CONSULT · 상담</p>
            <h2 className="mt-2 text-3xl font-black md:text-4xl text-gray-900">상담 신청</h2>
            <p className="mt-5 text-base leading-8 text-gray-600">
              이름과 연락처만 남겨도 됩니다. 부지 조건과 용도를 기준으로, 어떤 절차와 비용이 적용되는지부터 정리해 드립니다.
            </p>
            <div className="mt-8 space-y-4">
              <a
                href={telHref(settings.contact_phone)}
                className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-4 transition-colors hover:border-[#0d6e66]"
              >
                <PhoneCall className="h-5 w-5 text-[#0d6e66]" />
                <span>
                  <span className="block text-sm font-bold text-gray-900">{settings.contact_phone}</span>
                  <span className="block text-xs text-gray-500">
                    {settings.consult_hours ? `상담 가능 시간 ${settings.consult_hours}` : '전화 연결이 어려우면 아래 폼으로 남겨주세요.'}
                  </span>
                </span>
              </a>
              {settings.kakao_channel_url && (
                <a
                  href={settings.kakao_channel_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-4 transition-colors hover:border-[#0d6e66]"
                >
                  <ClipboardCheck className="h-5 w-5 text-[#0d6e66]" />
                  <span className="text-sm font-bold text-gray-900">카카오톡 채널로 문의하기</span>
                </a>
              )}
            </div>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm md:p-8">
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

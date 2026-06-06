import Image from 'next/image';
import Link from 'next/link';
import type { ComponentProps } from 'react';
import { ArrowRight, Bath, ClipboardCheck, Factory, Home, MapPinned, PhoneCall, Ruler, Truck, Wrench } from 'lucide-react';
import { getFaqs } from '@/app/actions/faq-actions';

export const dynamic = 'force-dynamic';

const steps = [
  { title: '구성', text: '원하는 모델과 옵션을 먼저 구성합니다.', icon: Ruler },
  { title: '상담 요청', text: '구성 결과와 함께 상담 정보를 남깁니다.', icon: ClipboardCheck },
  { title: '현장 확인', text: '진입로, 인입, 지목과 설치 조건을 확인합니다.', icon: MapPinned },
  { title: '견적·계약', text: '현장 조건을 반영해 최종 견적과 일정을 확정합니다.', icon: Home },
  { title: '제작', text: '공장 제작과 품질 확인을 진행합니다.', icon: Factory },
  { title: '운반·설치', text: '운반, 설치, 마감 확인 후 인도합니다.', icon: Truck },
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
  const dbFaqs = await getFaqs();
  const faqs = dbFaqs.length > 0
    ? dbFaqs.map((faq) => ({ question: faq.question_ko, answer: faq.answer_ko }))
    : fallbackFaqs;

  return (
    <main className="bg-[#f6f2ea] text-[#2f3432]">
      <section className="px-4 py-14 md:px-8 md:py-20 lg:px-16">
        <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#8d7133]">SUPPORT</p>
            <h1 className="mt-4 text-4xl font-black leading-tight md:text-6xl">진행 과정과 확인사항</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#625b50]">
              처음 준비하는 이동식주택도 막막하지 않도록, 진행 과정과 꼭 확인할 내용을 쉽게 정리했습니다.
            </p>
            <Link
              href="/customize"
              className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[#2f3432] px-5 text-sm font-bold text-white transition-colors hover:bg-[#1f2422]"
            >
              나만의 위트 만들기
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="relative min-h-[340px] overflow-hidden rounded-lg border border-[#ded5c8] bg-[#fbfaf7] md:min-h-[500px]">
            <Image
              src="/images/support/step3.webp"
              alt="이동식주택 현장 확인"
              fill
              sizes="(max-width: 1024px) 100vw, 52vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section id="process" className="border-y border-[#ded5c8] bg-[#fbfaf7] px-4 py-14 md:px-8 lg:px-16">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-8">
            <p className="text-sm font-black text-[#8d7133]">PROCESS</p>
            <h2 className="mt-2 text-3xl font-black md:text-4xl">구매 과정</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {steps.map((step, index) => (
              <div key={step.title} className="rounded-lg border border-[#ded5c8] bg-[#f6f2ea] p-5">
                <div className="flex items-center justify-between gap-3">
                  <step.icon className="h-6 w-6 text-[#8d7133]" />
                  <span className="text-sm font-black text-[#c4b79f]">{String(index + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="mt-5 text-xl font-black">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#625b50]">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="px-4 py-14 md:px-8 lg:px-16">
        <div className="mx-auto grid max-w-[1400px] gap-8 lg:grid-cols-[0.35fr_0.65fr]">
          <div>
            <p className="text-sm font-black text-[#8d7133]">FAQ</p>
            <h2 className="mt-2 text-3xl font-black md:text-4xl">자주 묻는 질문</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <details key={`${faq.question}-${index}`} className="group rounded-lg border border-[#ded5c8] bg-[#fbfaf7]">
                <summary className="flex cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left font-bold">
                  {faq.question}
                  <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-open:rotate-90" />
                </summary>
                <p className="border-t border-[#eee6da] px-5 py-4 text-sm leading-7 text-[#625b50]">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="as" className="bg-[#2f3432] px-4 py-14 text-[#fbfaf7] md:px-8 lg:px-16">
        <div className="mx-auto grid max-w-[1400px] gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <p className="text-sm font-black text-[#d3a745]">A/S</p>
            <h2 className="mt-2 text-3xl font-black md:text-4xl">사용 이후까지 확인합니다</h2>
            <p className="mt-5 text-base leading-8 text-[#d8d0c3]">
              완성 후에도 문, 창호, 욕실, 설비처럼 실제 생활에서 자주 쓰는 부분을 중심으로 불편 사항을 확인하고 필요한 조치를 안내합니다.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { icon: DoorIcon, title: '문·창호' },
              { icon: Bath, title: '욕실·설비' },
              { icon: Wrench, title: '마감 점검' },
            ].map((item) => (
              <div key={item.title} className="rounded-lg border border-white/15 bg-white/5 p-5">
                <item.icon className="h-6 w-6 text-[#d3a745]" />
                <p className="mt-4 font-bold">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-14 text-center md:px-8 lg:px-16">
        <PhoneCall className="mx-auto h-7 w-7 text-[#8d7133]" />
        <h2 className="mt-4 text-3xl font-black md:text-4xl">구성부터 시작하면 상담이 쉬워집니다</h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-[#625b50]">
          모델과 옵션을 먼저 선택하면, 상담에서 필요한 현장 확인과 예산 범위를 더 빠르게 좁힐 수 있습니다.
        </p>
        <Link
          href="/customize"
          className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[#2f3432] px-6 text-sm font-bold text-white transition-colors hover:bg-[#1f2422]"
        >
          나만의 위트 만들기
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </main>
  );
}

function DoorIcon(props: ComponentProps<'svg'>) {
  return <Home {...props} />;
}

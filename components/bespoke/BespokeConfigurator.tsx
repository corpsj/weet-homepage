'use client';

import Image from 'next/image';
import { FormEvent, useMemo, useState, useTransition } from 'react';
import {
  ArrowRight,
  Check,
  ClipboardList,
  Clock3,
  Layers3,
  MessageSquare,
  PenLine,
  Sparkles,
} from 'lucide-react';
import { submitInquiry } from '@/app/actions/submit-inquiry';
import { formatPriceDelta } from '@/lib/bespoke-options';
import { cn } from '@/lib/utils';
import { BespokeOption, BespokeOptionGroupWithOptions } from '@/types/supabase';
import { useLanguage } from '@/contexts/LanguageContext';

type SelectionMap = Record<string, string[]>;

const CASES = [
  {
    title: 'SMALL CAFE',
    badge: 'COMMERCIAL',
    image: '/images/bespoke/small-cafe-v2.webp',
    body: '픽업 동선, 좌석 밀도, 설비 위치를 함께 설계해 작은 면적에서도 브랜드 경험이 선명하게 남는 공간을 만듭니다.',
  },
  {
    title: 'POP-UP STORE',
    badge: 'RETAIL',
    image: '/images/bespoke/popup-store-v2.webp',
    body: '빠른 설치와 철거, 이동 운영, 그래픽 브랜딩을 전제로 행사 일정에 맞춰 실행 가능한 쇼룸을 구성합니다.',
  },
  {
    title: 'SMART FARM',
    badge: 'AGRITECH',
    image: '/images/bespoke/smart-farm-v2.webp',
    body: '단열, 기밀, 환경 제어, 센서 인프라를 모듈 구조 안에 통합해 안정적인 재배 환경을 계획합니다.',
  },
];

const COPY = {
  KO: {
    eyebrow: 'CUSTOM MODULAR ORDER',
    title: 'BESPOKE ORDER',
    lead: '위트의 주문제작은 아이디어를 바로 도면으로 넘기지 않습니다. 용도, 규모, 마감, 운영 조건을 먼저 구조화하고 그 조합을 기준으로 상담과 견적을 시작합니다.',
    primaryCta: '구성 시작',
    secondaryCta: '상담 요청',
    configureTitle: '프로젝트 구성',
    configureLead: '필수 항목은 기본 선택되어 있습니다. 필요한 운영 패키지는 여러 개 선택할 수 있습니다.',
    summaryTitle: '상담 요청서',
    summaryLead: '선택한 옵션이 문의 내용에 자동으로 포함됩니다.',
    selectedEmpty: '선택된 옵션이 없습니다.',
    noteLabel: '추가 메모',
    notePlaceholder: '부지 조건, 오픈 일정, 예산 범위, 참고 이미지 링크 등을 남겨주세요.',
    name: '이름',
    phone: '연락처',
    email: '이메일',
    submit: '상담 요청하기',
    sending: '전송 중',
    success: '문의가 접수되었습니다. 선택한 구성과 함께 관리자 페이지에서 확인할 수 있습니다.',
    error: '문의 등록 중 오류가 발생했습니다.',
    required: '필수',
    optional: '선택',
    single: '하나 선택',
    multiple: '복수 선택',
    includes: '견적 포함',
    casesTitle: '주문제작이 필요한 순간',
    casesLead: '기존 시그니처 라인에서 출발하되, 운영 목적과 장소의 제약에 맞춰 완전히 다른 공간으로 확장합니다.',
  },
  EN: {
    eyebrow: 'CUSTOM MODULAR ORDER',
    title: 'BESPOKE ORDER',
    lead: 'WEET turns your idea into a structured brief first. Choose purpose, scale, finish, and operating packages so the team can start with the right context.',
    primaryCta: 'Start configuring',
    secondaryCta: 'Request consultation',
    configureTitle: 'Project Configuration',
    configureLead: 'Required groups are preselected. Operating packages can be combined.',
    summaryTitle: 'Consultation Brief',
    summaryLead: 'Your selected options will be included in the inquiry automatically.',
    selectedEmpty: 'No options selected.',
    noteLabel: 'Additional note',
    notePlaceholder: 'Share site conditions, target launch date, budget range, or reference links.',
    name: 'Name',
    phone: 'Phone',
    email: 'Email',
    submit: 'Request consultation',
    sending: 'Sending',
    success: 'Inquiry submitted. The selected configuration is available in the admin page.',
    error: 'Failed to submit inquiry.',
    required: 'Required',
    optional: 'Optional',
    single: 'Choose one',
    multiple: 'Choose multiple',
    includes: 'Included',
    casesTitle: 'Where Bespoke Works',
    casesLead: 'Start from proven modular quality, then expand the space around your operation, site, and schedule.',
  },
};

function buildInitialSelections(groups: BespokeOptionGroupWithOptions[]): SelectionMap {
  return groups.reduce<SelectionMap>((acc, group) => {
    acc[group.id] = group.selection_type === 'single' && group.options[0] ? [group.options[0].id] : [];
    return acc;
  }, {});
}

function findSelectedOptions(groups: BespokeOptionGroupWithOptions[], selections: SelectionMap) {
  return groups.flatMap((group) => {
    const selectedIds = new Set(selections[group.id] || []);
    return group.options
      .filter((option) => selectedIds.has(option.id))
      .map((option) => ({ group, option }));
  });
}

function buildInquiryMessage({
  groups,
  selections,
  note,
}: {
  groups: BespokeOptionGroupWithOptions[];
  selections: SelectionMap;
  note: string;
}) {
  const lines = ['[BESPOKE 주문제작 상담 요청]', ''];

  for (const group of groups) {
    const selectedIds = new Set(selections[group.id] || []);
    const selected = group.options.filter((option) => selectedIds.has(option.id));
    if (!selected.length) continue;
    lines.push(`${group.title}: ${selected.map((option) => option.label).join(', ')}`);
  }

  if (note.trim()) {
    lines.push('', `[추가 메모]`, note.trim());
  }

  return lines.join('\n');
}

function OptionButton({
  option,
  selected,
  onClick,
}: {
  option: BespokeOption;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'group flex min-h-[136px] w-full flex-col justify-between rounded-lg border bg-white p-5 text-left transition-colors',
        selected
          ? 'border-black shadow-[0_0_0_1px_#000]'
          : 'border-gray-200 hover:border-gray-400 hover:bg-gray-50'
      )}
    >
      <span className="flex items-start justify-between gap-3">
        <span>
          {option.badge && (
            <span className="mb-3 inline-flex rounded-md bg-primary/20 px-2 py-1 text-xs font-bold text-gray-950">
              {option.badge}
            </span>
          )}
          <span className="block text-base font-bold text-gray-950">{option.label}</span>
        </span>
        <span
          className={cn(
            'flex h-6 w-6 shrink-0 items-center justify-center rounded-full border',
            selected ? 'border-black bg-black text-white' : 'border-gray-300 text-transparent'
          )}
        >
          <Check className="h-4 w-4" />
        </span>
      </span>
      <span className="mt-4 block">
        {option.description && <span className="block text-sm leading-6 text-gray-600">{option.description}</span>}
        <span className="mt-3 flex flex-wrap items-center gap-2 text-xs font-semibold text-gray-500">
          <span>{formatPriceDelta(option.price_delta)}</span>
          {option.lead_time_note && (
            <>
              <span className="h-1 w-1 rounded-full bg-gray-300" />
              <span>{option.lead_time_note}</span>
            </>
          )}
        </span>
      </span>
    </button>
  );
}

export default function BespokeConfigurator({
  optionGroups,
}: {
  optionGroups: BespokeOptionGroupWithOptions[];
}) {
  const { language } = useLanguage();
  const copy = COPY[language];
  const [selections, setSelections] = useState<SelectionMap>(() => buildInitialSelections(optionGroups));
  const [note, setNote] = useState('');
  const [resultMessage, setResultMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();

  const selectedItems = useMemo(() => findSelectedOptions(optionGroups, selections), [optionGroups, selections]);
  const totalDelta = selectedItems.reduce((sum, item) => sum + item.option.price_delta, 0);

  const toggleOption = (group: BespokeOptionGroupWithOptions, option: BespokeOption) => {
    setSelections((prev) => {
      const current = prev[group.id] || [];
      if (group.selection_type === 'single') {
        return { ...prev, [group.id]: [option.id] };
      }

      const next = current.includes(option.id)
        ? current.filter((id) => id !== option.id)
        : [...current, option.id];
      return { ...prev, [group.id]: next };
    });
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    form.set('category', 'BESPOKE 주문제작');
    form.set('message', buildInquiryMessage({ groups: optionGroups, selections, note }));

    startTransition(async () => {
      const result = await submitInquiry(null, form);
      setIsSuccess(result.success);
      setResultMessage(result.success ? copy.success : result.message || copy.error);
    });
  };

  return (
    <main className="bg-white text-gray-950">
      <section className="relative min-h-[560px] overflow-hidden bg-black lg:min-h-[640px]">
        <Image
          src="/images/bespoke/small-cafe-v2.webp"
          alt="Bespoke modular cafe"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-75"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/10" />
        <div className="relative mx-auto flex min-h-[560px] max-w-[1600px] flex-col justify-end px-4 pb-12 pt-32 md:px-8 lg:min-h-[640px] lg:px-[148px] lg:pb-16">
          <div className="max-w-3xl text-white">
            <p className="mb-4 text-sm font-bold tracking-[0.28em] text-primary">{copy.eyebrow}</p>
            <h1 className="text-[52px] font-black leading-none md:text-[76px] lg:text-[96px]">
              {copy.title}
            </h1>
            <p className="mt-8 max-w-2xl break-keep text-lg leading-8 text-white/85 md:text-xl">
              {copy.lead}
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="#configure"
                className="inline-flex h-12 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-bold text-black transition-colors hover:bg-primary-dark"
              >
                {copy.primaryCta}
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#contact"
                className="inline-flex h-12 items-center gap-2 rounded-lg border border-white/30 bg-white/10 px-5 text-sm font-bold text-white backdrop-blur transition-colors hover:bg-white/20"
              >
                {copy.secondaryCta}
                <MessageSquare className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-gray-200 bg-gray-950 text-white">
        <div className="mx-auto grid max-w-[1600px] grid-cols-1 divide-y divide-white/10 px-4 md:grid-cols-3 md:divide-x md:divide-y-0 md:px-8 lg:px-[148px]">
          <div className="flex items-center gap-4 py-6">
            <Layers3 className="h-6 w-6 text-primary" />
            <div>
              <p className="text-sm font-bold">Purpose to module</p>
              <p className="text-sm text-white/55">용도에서 모듈 조합까지</p>
            </div>
          </div>
          <div className="flex items-center gap-4 py-6 md:px-8">
            <PenLine className="h-6 w-6 text-primary" />
            <div>
              <p className="text-sm font-bold">Design brief first</p>
              <p className="text-sm text-white/55">상담 전 요구사항 정리</p>
            </div>
          </div>
          <div className="flex items-center gap-4 py-6 md:px-8">
            <Clock3 className="h-6 w-6 text-primary" />
            <div>
              <p className="text-sm font-bold">Schedule aware</p>
              <p className="text-sm text-white/55">오픈일과 현장 조건 반영</p>
            </div>
          </div>
        </div>
      </section>

      <section id="configure" className="bg-[#F6F7F8] py-16 scroll-mt-[180px] lg:py-24">
        <div className="mx-auto grid max-w-[1600px] gap-8 px-4 md:px-8 lg:grid-cols-[minmax(0,1fr)_420px] lg:px-[148px]">
          <div>
            <div className="mb-8">
              <p className="mb-3 inline-flex rounded-md bg-black px-2 py-1 text-xs font-bold text-white">
                <ClipboardList className="mr-1 h-3.5 w-3.5" />
                ORDER BUILDER
              </p>
              <h2 className="text-3xl font-black text-gray-950 md:text-5xl">{copy.configureTitle}</h2>
              <p className="mt-4 max-w-3xl break-keep text-base leading-7 text-gray-600">{copy.configureLead}</p>
            </div>

            <div className="space-y-8">
              {optionGroups.map((group) => (
                <section key={group.id} className="rounded-lg border border-gray-200 bg-white p-5 md:p-6">
                  <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-xl font-black text-gray-950">{group.title}</h3>
                        <span className="rounded-md bg-gray-100 px-2 py-1 text-xs font-bold text-gray-600">
                          {group.required ? copy.required : copy.optional}
                        </span>
                      </div>
                      {group.description && (
                        <p className="mt-2 break-keep text-sm leading-6 text-gray-600">{group.description}</p>
                      )}
                    </div>
                    <span className="shrink-0 rounded-md border border-gray-200 px-2 py-1 text-xs font-bold text-gray-500">
                      {group.selection_type === 'single' ? copy.single : copy.multiple}
                    </span>
                  </div>
                  <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                    {group.options.map((option) => (
                      <OptionButton
                        key={option.id}
                        option={option}
                        selected={(selections[group.id] || []).includes(option.id)}
                        onClick={() => toggleOption(group, option)}
                      />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>

          <aside id="contact" className="lg:sticky lg:top-8 lg:self-start">
            <form onSubmit={submit} className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm md:p-6">
              <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" />
              <div className="mb-6">
                <p className="mb-2 text-sm font-bold text-primary">{copy.summaryTitle}</p>
                <h3 className="text-2xl font-black text-gray-950">{selectedItems.length} options selected</h3>
                <p className="mt-2 break-keep text-sm leading-6 text-gray-500">{copy.summaryLead}</p>
              </div>

              <div className="space-y-3 border-y border-gray-100 py-5">
                {selectedItems.length ? (
                  selectedItems.map(({ group, option }) => (
                    <div key={`${group.id}-${option.id}`} className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-bold text-gray-400">{group.title}</p>
                        <p className="text-sm font-semibold text-gray-900">{option.label}</p>
                      </div>
                      <p className="shrink-0 text-xs font-bold text-gray-500">{formatPriceDelta(option.price_delta)}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">{copy.selectedEmpty}</p>
                )}
              </div>

              <div className="flex items-center justify-between border-b border-gray-100 py-4">
                <span className="text-sm font-bold text-gray-500">Option delta</span>
                <span className="text-lg font-black text-gray-950">
                  {totalDelta ? formatPriceDelta(totalDelta) : copy.includes}
                </span>
              </div>

              <div className="mt-5 space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-bold text-gray-900">{copy.name}</label>
                  <input
                    name="name"
                    required
                    className="h-11 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:ring-2 focus:ring-black/10"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-bold text-gray-900">{copy.phone}</label>
                  <input
                    name="phone"
                    required
                    type="tel"
                    className="h-11 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:ring-2 focus:ring-black/10"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-bold text-gray-900">{copy.email}</label>
                  <input
                    name="email"
                    type="email"
                    className="h-11 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:ring-2 focus:ring-black/10"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-bold text-gray-900">{copy.noteLabel}</label>
                  <textarea
                    value={note}
                    onChange={(event) => setNote(event.target.value)}
                    className="min-h-28 w-full rounded-lg border border-gray-200 px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-black/10"
                    placeholder={copy.notePlaceholder}
                  />
                </div>
              </div>

              {resultMessage && (
                <div
                  className={cn(
                    'mt-5 rounded-lg p-4 text-sm font-medium',
                    isSuccess ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
                  )}
                >
                  {resultMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={isPending}
                className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-black px-5 text-sm font-bold text-white transition-colors hover:bg-gray-800 disabled:opacity-50"
              >
                {isPending ? copy.sending : copy.submit}
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </aside>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-[1600px] px-4 md:px-8 lg:px-[148px]">
          <div className="mb-10 max-w-3xl">
            <p className="mb-3 inline-flex rounded-md bg-primary/20 px-2 py-1 text-xs font-bold text-gray-950">
              <Sparkles className="mr-1 h-3.5 w-3.5" />
              BESPOKE CASES
            </p>
            <h2 className="text-3xl font-black text-gray-950 md:text-5xl">{copy.casesTitle}</h2>
            <p className="mt-4 break-keep text-base leading-7 text-gray-600">{copy.casesLead}</p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {CASES.map((item) => (
              <article key={item.title} className="overflow-hidden rounded-lg border border-gray-200 bg-white">
                <div className="relative aspect-[4/3] bg-gray-100">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <p className="mb-2 text-xs font-bold text-primary">{item.badge}</p>
                  <h3 className="text-lg font-black text-gray-950">{item.title}</h3>
                  <p className="mt-3 break-keep text-sm leading-6 text-gray-600">{item.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

'use client';

import { useEffect, useMemo, useRef, useState, useTransition, type Dispatch, type ReactNode, type SetStateAction } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'sonner';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  Download,
  Info,
  Layers,
  Loader2,
  Maximize2,
  Pencil,
  PhoneCall,
  Send,
  X,
  ShieldCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { submitCustomizeConsultation } from '@/app/actions/customize-actions';
import {
  BUDGET_RANGES,
  CATEGORY_META,
  DEFAULT_MODEL_ID,
  LAND_TYPES,
  PURCHASE_TIMELINES,
} from '@/lib/customize/config';
import {
  calculateEstimate,
  decodeConfig,
  encodeConfig,
  floorplanSize,
  formatModelStartPrice,
  formatWon,
  getDefaultSelections,
  optionsForModel,
  selectedOptionList,
  toggleOptionSelection,
} from '@/lib/customize/priceCalculator';
import type {
  ConsultationFormInput,
  CustomizeCatalog,
  CustomizeCategory,
  CustomizeModel,
  CustomizeOption,
  EstimateBreakdown,
  SelectedOptions,
} from '@/lib/customize/types';
import { cn } from '@/lib/utils';

interface CustomizeConfiguratorProps {
  catalog: CustomizeCatalog;
  initialConfig: string | null;
  contactPhone?: string;
}

const PLAN_LABEL_POSITIONS: Record<string, (box: ReturnType<typeof floorplanSize>, index: number) => { x: number; y: number }> = {
  exterior: (box) => ({ x: box.x + 58, y: box.y + box.height + 22 }),
  windows: (box, index) => ({ x: box.x + box.width * (index % 2 === 0 ? 0.28 : 0.72), y: box.y - 16 }),
  door: (box) => ({ x: box.x + box.width - 92, y: box.y + box.height + 22 }),
  interior: (box) => ({ x: box.x + box.width * 0.48, y: box.y + box.height * 0.5 }),
  flooring: (box) => ({ x: box.x + box.width * 0.48, y: box.y + box.height * 0.75 }),
  sink: (box) => ({ x: box.x + 102, y: box.y + box.height - 62 }),
  bathroom: (box) => ({ x: box.x + box.width - 148, y: box.y + 78 }),
  furniture: (box, index) => ({ x: box.x + box.width * 0.36, y: box.y + 82 + index * 34 }),
  energy: (box, index) => ({ x: box.x + 70 + index * 108, y: box.y - 42 }),
  connectivity: (box, index) => ({ x: box.x + box.width - 208 + index * 96, y: box.y - 42 }),
};

const PLACEHOLDER_FLOORPLAN_PATH = '/images/customize/dummy-base.svg';
const MODEL_FALLBACK_FLOORPLANS: Record<string, string> = {
  'compact-3x6': '/images/customize/compact-3x6-base.svg',
  'standard-3x9': '/images/customize/standard-3x9-base.svg',
};
const OPTION_IMAGE_VERSION = '20260610-0137';
type FloorplanImageStatus = 'missing' | 'loading' | 'loaded' | 'failed';

type ConfigStep = 'space' | 'included' | 'mood' | 'smart' | 'review';
type OptionStep = Exclude<ConfigStep, 'review'>;
const STEPS: { id: ConfigStep; label: string; categories?: string[] }[] = [
  { id: 'space', label: '모델', categories: ['model'] },
  { id: 'included', label: '공간 구성', categories: ['windows', 'door', 'sink', 'bathroom', 'furniture'] },
  { id: 'mood', label: '무드 & 소재', categories: ['exterior', 'interior', 'flooring'] },
  { id: 'smart', label: '스마트 테크', categories: ['energy', 'connectivity'] },
  { id: 'review', label: '검토·요청' },
];
const SWATCH_CATEGORY_KEYS = new Set(['exterior', 'interior', 'flooring']);

// 가격/신뢰 문구는 한 곳에서 관리한다. 보수적 표현만 사용한다(결제·할인·보증 약속 금지).
const COPY = {
  basePrice: '기본 제품가',
  optionSubtotal: '옵션 합계',
  estimatedAmount: '예상 제품 금액',
  consultNeeded: '상담 필요',
  transportNote: '운반/설치 별도 · 현장 조건에 따라 최종 견적 확정',
  notPayment: '상담 요청이며 결제는 진행되지 않습니다.',
  finalQuote: '최종 견적은 상담 후 확정됩니다.',
  privacyUse: '입력하신 정보는 견적 안내와 상담 연락을 위해 사용됩니다.',
  consultExplain: '상담 필요 항목은 담당자가 설치 가능 여부와 금액을 확인해 안내드립니다.',
} as const;

function nextStepCta(step: ConfigStep) {
  if (step === 'space') return '다음: 공간 구성';
  if (step === 'included') return '다음: 무드 & 소재';
  if (step === 'mood') return '다음: 스마트 테크';
  if (step === 'smart') return '구성 검토하기';
  return '상담·견적 요청하기';
}

// 옵션 카드/요약에 노출하는 가격 라벨은 '기본 포함 / +₩x / 상담 필요' 세 가지로 통일한다.
function optionPriceDisplay(option: Pick<CustomizeOption, 'priceType' | 'price'>) {
  if (option.priceType === 'included') return '기본 포함';
  if (option.priceType === 'consult') return '상담 필요';
  return `+${formatWon(option.price)}`;
}

type ConsultationDraft = {
  customerName: string;
  phone: string;
  region: string;
  purchaseTimeline: string;
  landType: string;
  installAddress: string;
  budgetRange: string;
  memo: string;
};

const inputClass = 'h-11 rounded-lg border-gray-300 bg-[#fbfaf7] text-sm focus-visible:ring-[#b88b26]';
const selectClass = 'h-11 w-full rounded-lg border border-gray-300 bg-[#fbfaf7] px-3 text-sm outline-none focus:ring-2 focus:ring-[#b88b26]/30';

function floorplanImagePathForModel(model: CustomizeModel) {
  const configuredPath = model.floorplanImagePath?.trim();
  const fallbackPath = MODEL_FALLBACK_FLOORPLANS[model.id];

  if (!configuredPath) return fallbackPath ?? null;
  if (configuredPath === PLACEHOLDER_FLOORPLAN_PATH) return fallbackPath ?? configuredPath;
  return configuredPath;
}

function buildSelectionsForModelChange(
  catalog: CustomizeCatalog,
  currentSelections: SelectedOptions,
  nextModelId: string
) {
  const nextSelections = getDefaultSelections(catalog, nextModelId);
  const activeOptions = catalog.options.filter((option) => option.isActive);
  const availableOptions = new Map(optionsForModel(activeOptions, nextModelId).map((option) => [option.id, option]));
  const allOptions = new Map(activeOptions.map((option) => [option.id, option]));
  const categories = new Map(catalog.categories.filter((category) => category.isActive).map((category) => [category.id, category]));
  const removedOptions: CustomizeOption[] = [];

  for (const [categoryId, optionIds] of Object.entries(currentSelections)) {
    const category = categories.get(categoryId);
    if (!category) continue;

    const preservedIds: string[] = [];
    for (const optionId of optionIds) {
      const option = availableOptions.get(optionId);
      if (option?.categoryId === categoryId) {
        preservedIds.push(optionId);
      } else {
        const removedOption = allOptions.get(optionId);
        if (removedOption && !removedOptions.some((item) => item.id === removedOption.id)) {
          removedOptions.push(removedOption);
        }
      }
    }

    if (preservedIds.length === 0) continue;

    if (category.selectionType === 'single') {
      nextSelections[categoryId] = [preservedIds[0]];
    } else {
      nextSelections[categoryId] = Array.from(new Set([...(nextSelections[categoryId] ?? []), ...preservedIds]));
    }
  }

  return { selections: nextSelections, removedOptions };
}

// 모달 공통 동작: ESC로 닫기 + 열려 있는 동안 본문 스크롤 잠금.
function useModalDismiss(onClose: () => void) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);
}

function useFloorplanImageStatus(path: string | null): FloorplanImageStatus {
  const [result, setResult] = useState<{ path: string; status: 'loaded' | 'failed' } | null>(null);

  useEffect(() => {
    if (!path) return;

    let cancelled = false;
    const image = new window.Image();

    image.onload = () => {
      if (!cancelled) setResult({ path, status: 'loaded' });
    };
    image.onerror = () => {
      if (!cancelled) setResult({ path, status: 'failed' });
    };
    image.src = path;

    return () => {
      cancelled = true;
    };
  }, [path]);

  if (!path) return 'missing';
  if (result?.path !== path) return 'loading';
  return result.status;
}

function stepStatusText(step: ConfigStep, count: number) {
  if (step === 'space') return '선택 완료';
  if (step === 'review') return '최종 확인';
  return `${count}개 선택`;
}

function StepperBar({
  currentStep,
  furthestStepIndex,
  setCurrentStep,
  stepCounts,
}: {
  currentStep: ConfigStep;
  furthestStepIndex: number;
  setCurrentStep: (step: ConfigStep) => void;
  stepCounts: Record<ConfigStep, number>;
}) {
  const stepIndex = STEPS.findIndex((s) => s.id === currentStep);

  return (
    <div className="sticky top-14 z-30 border-b border-[#d8d0c3] bg-[#fbfaf7]/95 backdrop-blur md:top-16 lg:h-[72px]">
      <div className="mx-auto max-w-[1800px] px-4 py-2 lg:flex lg:h-full lg:items-center lg:px-10 lg:py-0">
        <p className="mb-1.5 text-[11px] font-bold text-[#8a806f] lg:hidden">
          {stepIndex + 1}/{STEPS.length} 단계 · {STEPS[stepIndex].label}
        </p>
        <ol className="flex w-full items-stretch gap-1 overflow-x-auto pb-0.5 lg:gap-2 lg:overflow-visible" aria-label="구성 진행 단계">
          {STEPS.map((step, index) => {
            const isCurrent = currentStep === step.id;
            const isComplete = !isCurrent && index < furthestStepIndex;
            const state = isCurrent ? 'current' : isComplete ? 'complete' : 'upcoming';

            return (
              <li key={step.id} className="flex min-w-0 shrink-0 items-center gap-1 lg:flex-1 lg:gap-2">
                <button
                  type="button"
                  data-testid={`customize-step-${step.id}`}
                  aria-current={isCurrent ? 'step' : undefined}
                  aria-label={`${index + 1}단계 ${step.label} · ${isComplete ? '완료' : isCurrent ? '진행 중' : '대기'}`}
                  data-state={state}
                  onClick={() => setCurrentStep(step.id)}
                  className={cn(
                    'flex min-h-10 w-full items-center justify-center gap-1.5 rounded-md border px-2 py-1.5 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#b88b26] lg:justify-start lg:px-3',
                    isCurrent && 'border-[#2f3432] bg-[#2f3432] text-[#fbfaf7]',
                    isComplete && 'border-[#cfc4b3] bg-[#efe6d4] text-[#4f473d] hover:border-[#b9aa94]',
                    state === 'upcoming' && 'border-[#e2dacd] bg-[#fbfaf7] text-[#8a806f] hover:border-[#b9aa94] hover:text-[#2f3432]'
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px] font-black',
                      isCurrent && 'border-[#fbfaf7]/60 bg-[#fbfaf7] text-[#2f3432]',
                      isComplete && 'border-[#0d6e66] bg-[#0d6e66] text-white',
                      state === 'upcoming' && 'border-[#cfc4b3] bg-transparent text-[#8a806f]'
                    )}
                  >
                    {isComplete ? <Check className="h-3 w-3" /> : index + 1}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-xs font-bold">{step.label}</span>
                    <span
                      className={cn(
                        'hidden truncate text-[10px] font-semibold lg:block',
                        isCurrent ? 'text-[#d8d0c3]' : 'text-[#9a8f7d]'
                      )}
                    >
                      {stepStatusText(step.id, stepCounts[step.id])}
                    </span>
                  </span>
                </button>
                {index < STEPS.length - 1 && (
                  <span aria-hidden="true" className="hidden h-px w-3 shrink-0 bg-[#cfc4b3] lg:block" />
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

export default function CustomizeConfigurator({ catalog, initialConfig, contactPhone }: CustomizeConfiguratorProps) {
  const decoded = useMemo(() => decodeConfig(initialConfig), [initialConfig]);
  const firstModelId = catalog.models[0]?.id ?? DEFAULT_MODEL_ID;
  const [modelId, setModelId] = useState(decoded?.modelId ?? firstModelId);
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>(() => {
    if (decoded?.selectedOptions) return decoded.selectedOptions;
    return getDefaultSelections(catalog, decoded?.modelId ?? firstModelId);
  });
  const [activeInfo, setActiveInfo] = useState<CustomizeOption | null>(null);
  const [currentStep, setCurrentStep] = useState<ConfigStep>('space');
  // 진행 시스템: 사용자가 도달한 가장 먼 단계 이전의 단계는 '완료'로 표시한다.
  const [furthestStepIndex, setFurthestStepIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [planViewerOpen, setPlanViewerOpen] = useState(false);
  const [shouldSyncConfigUrl, setShouldSyncConfigUrl] = useState(Boolean(decoded));
  const [isPending, startTransition] = useTransition();
  const [form, setForm] = useState<ConsultationDraft>({
    customerName: '',
    phone: '',
    region: '',
    purchaseTimeline: '',
    landType: '',
    installAddress: '',
    budgetRange: '',
    memo: '',
  });

  const estimate = useMemo(
    () => calculateEstimate(catalog, modelId, selectedOptions),
    [catalog, modelId, selectedOptions]
  );
  const selectedOptionsList = useMemo(
    () => selectedOptionList(catalog, selectedOptions, modelId),
    [catalog, modelId, selectedOptions]
  );
  const encodedConfig = useMemo(() => encodeConfig(modelId, selectedOptions), [modelId, selectedOptions]);

  useEffect(() => {
    if (!estimate || !shouldSyncConfigUrl || typeof window === 'undefined') return;
    const nextUrl = `${window.location.pathname}?c=${encodedConfig}`;
    window.history.replaceState(null, '', nextUrl);
  }, [encodedConfig, estimate, shouldSyncConfigUrl]);

  const currentModel = estimate?.model ?? catalog.models[0];
  const currentFloorplanImagePath = currentModel ? floorplanImagePathForModel(currentModel) : null;
  const currentFloorplanImageStatus = useFloorplanImageStatus(currentFloorplanImagePath);
  const visibleOptions = useMemo(() => optionsForModel(catalog.options.filter((option) => option.isActive), modelId), [catalog.options, modelId]);
  const stepCounts = useMemo(() => {
    const counts: Record<ConfigStep, number> = { space: 1, included: 0, mood: 0, smart: 0, review: 0 };
    const optionsList = Object.values(selectedOptions).flat();
    visibleOptions.forEach((opt) => {
      if (optionsList.includes(opt.id)) {
        const catKey = catalog.categories.find((c) => c.id === opt.categoryId)?.key;
        if (STEPS[1].categories?.includes(catKey || '')) counts.included++;
        if (STEPS[2].categories?.includes(catKey || '')) counts.mood++;
        if (STEPS[3].categories?.includes(catKey || '')) counts.smart++;
      }
    });
    return counts;
  }, [selectedOptions, visibleOptions, catalog]);

  const handleModelChange = (nextModelId: string) => {
    setShouldSyncConfigUrl(true);
    setModelId(nextModelId);
    const { selections, removedOptions } = buildSelectionsForModelChange(catalog, selectedOptions, nextModelId);
    setSelectedOptions(selections);
    if (removedOptions.length > 0) {
      toast.info(`새 모델에 맞지 않는 옵션 ${removedOptions.length}개를 제외했습니다.`);
    }
  };

  const handleOptionToggle = (category: CustomizeCategory, option: CustomizeOption) => {
    setShouldSyncConfigUrl(true);
    setSelectedOptions((current) => toggleOptionSelection({ catalog, selectedOptions: current, category, option }));
  };

  const handleStepSelect = (step: ConfigStep) => {
    setCurrentStep(step);
    setFurthestStepIndex((current) => Math.max(current, STEPS.findIndex((s) => s.id === step)));
    if (typeof window === 'undefined') return;
    if (step === 'review') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    // 모바일/태블릿 인라인 구성에서는 단계 전환 시 도면 아래 옵션 영역으로 바로 이동한다.
    // (검토 단계에서 돌아오는 경우 영역이 다시 마운트된 뒤 스크롤되도록 rAF로 미룬다.)
    if (window.innerWidth < 1024) {
      requestAnimationFrame(() => {
        document.getElementById('customize-options')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  };

  const handleSubmit = () => {
    if (!form.customerName.trim() || !form.phone.trim() || !form.region.trim()) {
      toast.error('이름, 연락처, 지역을 입력해주세요.');
      return;
    }

    const payload: ConsultationFormInput = {
      modelId,
      selectedOptions,
      configQuery: encodedConfig,
      ...form,
    };

    startTransition(async () => {
      const result = await submitCustomizeConsultation(payload);
      if (result.success) {
        toast.success(result.message);
        setSubmitted(true);
        setForm({
          customerName: '',
          phone: '',
          region: '',
          purchaseTimeline: '',
          landType: '',
          installAddress: '',
          budgetRange: '',
          memo: '',
        });
      } else {
        toast.error(result.message);
      }
    });
  };

  const handleSaveQuote = () => {
    if (!estimate) return;

    const html = buildQuoteHtml(estimate, selectedOptionsList);
    const popup = window.open('', '_blank', 'width=1120,height=794');
    if (!popup) {
      toast.error('견적 창을 열 수 없습니다. 팝업 설정을 확인해주세요.');
      return;
    }

    popup.document.write(html);
    popup.document.close();
    popup.focus();
    popup.print();
  };

  if (!currentModel || catalog.models.length === 0) {
    return (
      <div className="min-h-dvh bg-[#f4f0e8] px-6 py-20 text-center text-[#2f3432]">
        <p className="text-lg font-bold">주문 구성을 준비 중입니다.</p>
        <p className="mt-3 text-sm text-[#6f6a60]">관리자에서 모델과 옵션을 활성화하면 페이지가 표시됩니다.</p>
      </div>
    );
  }

  const currentStepIndex = STEPS.findIndex((s) => s.id === currentStep);
  const nextStep = currentStepIndex < STEPS.length - 1 ? STEPS[currentStepIndex + 1] : null;

  return (
    <div className="min-h-dvh bg-[#f4f0e8] text-[#2f3432]">
      <ConfiguratorAppBar contactPhone={contactPhone} />
      <StepperBar
        currentStep={currentStep}
        furthestStepIndex={furthestStepIndex}
        setCurrentStep={handleStepSelect}
        stepCounts={stepCounts}
      />

      {currentStep === 'review' && estimate ? (
        <ReviewStep
          estimate={estimate}
          selectedOptions={selectedOptionsList}
          floorplanImagePath={currentFloorplanImagePath}
          floorplanImageStatus={currentFloorplanImageStatus}
          goToStep={handleStepSelect}
          form={form}
          setForm={setForm}
          isPending={isPending}
          submitted={submitted}
          onEditAfterSubmit={() => setSubmitted(false)}
          onSubmit={handleSubmit}
          onSaveQuote={handleSaveQuote}
        />
      ) : (
        <div className="mx-auto flex max-w-[1800px] flex-col lg:h-[calc(100dvh-136px)] lg:flex-row">
          {/* 데스크톱: 앱바(64px)+스테퍼(72px)를 제외한 높이에 도면/레일을 고정해 CTA가 항상 보이게 한다. */}
          <section className="flex flex-col lg:h-full lg:flex-1 lg:overflow-y-auto">
            <div className="flex flex-col items-center justify-center gap-5 px-4 py-5 md:px-8 md:py-8 lg:flex-1 lg:px-10 lg:py-6">
              <FloorplanPreview
                model={currentModel}
                selectedOptions={selectedOptionsList}
                floorplanImagePath={currentFloorplanImagePath}
                floorplanImageStatus={currentFloorplanImageStatus}
                onOpenViewer={() => setPlanViewerOpen(true)}
              />
              {estimate && <ConfigSummaryBoard estimate={estimate} selectedOptions={selectedOptionsList} />}
            </div>
          </section>

          {/* 모바일/태블릿: 드로어 없이 도면 아래에서 바로 이어지는 인라인 단계 구성 (Tesla 주문 흐름 참고) */}
          <div id="customize-options" className="scroll-mt-[150px] border-t border-[#d8d0c3] bg-[#fbfaf7] md:scroll-mt-[162px] lg:hidden">
            <OptionsPanel
              catalog={catalog}
              modelId={modelId}
              selectedOptions={selectedOptions}
              visibleOptions={visibleOptions}
              onModelChange={handleModelChange}
              onOptionToggle={handleOptionToggle}
              onInfo={setActiveInfo}
              currentStep={currentStep}
              setCurrentStep={handleStepSelect}
              estimate={estimate}
              inline
            />
          </div>

          <aside
            data-testid="customize-desktop-rail"
            className="hidden shrink-0 border-l border-[#d8d0c3] bg-[#fbfaf7] lg:block lg:w-[400px] xl:w-[460px]"
          >
            <OptionsPanel
              catalog={catalog}
              modelId={modelId}
              selectedOptions={selectedOptions}
              visibleOptions={visibleOptions}
              onModelChange={handleModelChange}
              onOptionToggle={handleOptionToggle}
              onInfo={setActiveInfo}
              currentStep={currentStep}
              setCurrentStep={handleStepSelect}
              estimate={estimate}
            />
          </aside>
        </div>
      )}

      {/* 모바일/태블릿 고정 바: 구성 단계에서만 노출. 검토 단계는 본문에 자체 제출 CTA를 가진다. */}
      {currentStep !== 'review' && nextStep && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#d8d0c3] bg-[#fbfaf7]/95 px-4 pt-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] shadow-[0_-8px_30px_rgba(55,48,39,0.12)] backdrop-blur lg:hidden">
          <div className="mx-auto flex max-w-[1800px] items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[11px] font-semibold text-[#7b7468]">{COPY.estimatedAmount}</p>
              <p className="truncate text-lg font-black text-[#2f3432]">
                <span data-testid="mobile-estimated-total">{estimate ? formatWon(estimate.estimatedTotal) : '-'}</span>
                {estimate && estimate.consultOptionCount > 0 && (
                  <span className="ml-1 text-xs font-bold text-[#a56f16]">+ 상담 {estimate.consultOptionCount}건</span>
                )}
              </p>
              <p className="truncate text-[11px] text-[#8b8172]">운반/설치 별도 · {COPY.finalQuote}</p>
            </div>
            <Button
              data-testid="mobile-next-cta"
              className="h-12 shrink-0 bg-[#2f3432] px-4 text-[#fbfaf7] hover:bg-[#1f2422]"
              onClick={() => handleStepSelect(nextStep.id)}
            >
              {nextStepCta(currentStep)}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {activeInfo && <OptionInfoModal option={activeInfo} onClose={() => setActiveInfo(null)} />}

      {planViewerOpen && (
        <FloorplanZoomModal
          model={currentModel}
          selectedOptions={selectedOptionsList}
          floorplanImagePath={currentFloorplanImagePath}
          floorplanImageStatus={currentFloorplanImageStatus}
          onClose={() => setPlanViewerOpen(false)}
        />
      )}
    </div>
  );
}

function ConfiguratorAppBar({ contactPhone }: { contactPhone?: string }) {
  return (
    <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-[#d8d0c3] bg-[#fbfaf7]/95 px-4 backdrop-blur md:h-16 md:px-6">
      <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-[#2f3432]">
        <ArrowLeft className="h-4 w-4" />
        WEET
      </Link>
      <div className="text-center">
        <p className="text-sm font-black text-[#2f3432]">위트 맞춤제작</p>
        <p className="text-xs text-[#83796a]">나만의 위트 만들기</p>
      </div>
      {contactPhone ? (
        <a
          href={`tel:${contactPhone.replace(/[^0-9+]/g, '')}`}
          aria-label="전화 상담"
          className="inline-flex h-9 w-14 items-center justify-center gap-1 rounded-md text-[#0d6e66] transition-colors hover:bg-[#0d6e66]/10"
        >
          <PhoneCall className="h-4 w-4" />
        </a>
      ) : (
        <div className="w-14" />
      )}
    </header>
  );
}

function OptionsPanel({
  catalog,
  modelId,
  selectedOptions,
  visibleOptions,
  onModelChange,
  onOptionToggle,
  onInfo,
  currentStep,
  setCurrentStep,
  estimate,
  inline = false,
}: {
  catalog: CustomizeCatalog;
  modelId: string;
  selectedOptions: SelectedOptions;
  visibleOptions: CustomizeOption[];
  onModelChange: (modelId: string) => void;
  onOptionToggle: (category: CustomizeCategory, option: CustomizeOption) => void;
  onInfo: (option: CustomizeOption) => void;
  currentStep: ConfigStep;
  setCurrentStep: (step: ConfigStep) => void;
  estimate: EstimateBreakdown | null;
  inline?: boolean;
}) {
  const currentStepData = STEPS.find((s) => s.id === currentStep)!;
  const stepIndex = STEPS.findIndex((s) => s.id === currentStep);
  const scrollRef = useRef<HTMLDivElement>(null);

  const goToStep = (step: ConfigStep) => {
    // 모바일 인라인 스크롤 복귀는 부모 handleStepSelect가 처리하므로 데스크톱 레일만 직접 올린다.
    setCurrentStep(step);
    if (!inline) {
      scrollRef.current?.scrollTo({ top: 0 });
    }
  };

  const stepBody = (
    <>
      {currentStep === 'space' && (
        <section className="mb-6">
          <CategoryHeading title="공간 모델" status="" icon={<Layers className="h-4 w-4" />} />
          <p className="mb-3 mt-1 text-xs leading-5 text-[#756d61]">설치할 공간의 크기와 목적에 맞는 모델을 선택하세요.</p>
          <div className="grid gap-2">
            {catalog.models.map((model) => (
              <button
                key={model.id}
                type="button"
                onClick={() => onModelChange(model.id)}
                className={cn(
                  'rounded-lg border p-3 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#b88b26]',
                  model.id === modelId
                    ? 'border-[#2f3432] bg-[#efe6d4] shadow-sm'
                    : 'border-[#ded5c8] bg-[#fbfaf7] hover:border-[#b9aa94]'
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-black text-[#2f3432]">{model.nameKo}</p>
                      <span className="rounded-full bg-[#e2dacd] px-2 py-0.5 text-[10px] font-bold text-[#6b5a2b]">
                        {model.id === 'compact-3x6' ? '소형 주말주택' : '프리미엄 거주'}
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs text-[#756d61]">{model.widthM}m x {model.lengthM}m · {model.areaSqm}m²</p>
                  </div>
                  {model.id === modelId && <Check className="h-4 w-4 shrink-0 text-[#2f3432]" />}
                </div>
                <p className="mt-2 text-sm font-bold text-[#6b5a2b]">
                  <span className="mr-1.5 text-[11px] font-semibold text-[#8a806f]">{COPY.basePrice}</span>
                  {formatModelStartPrice(model.basePrice)}
                </p>
              </button>
            ))}
          </div>
        </section>
      )}

      {(currentStep === 'included' || currentStep === 'mood' || currentStep === 'smart') && (
        <>
          {currentStep === 'included' && (
            <div className="mb-5 rounded-lg bg-[#efe6d4]/50 p-3">
              <div className="mb-1.5 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[#8a806f]" />
                <p className="text-sm font-bold text-[#2f3432]">위트 기본 포함 내역</p>
              </div>
              <p className="text-xs leading-relaxed text-[#756d61]">
                골조, 단열, 내/외장재, 바닥재, 도어, 창호, 싱크대 등 생활에 필요한 필수 구성요소가 기본 가격에 포함되어 있습니다.
              </p>
            </div>
          )}

          {catalog.categories
            .filter((category) => currentStepData.categories?.includes(category.key))
            .map((category) => {
              const options = visibleOptions.filter((option) => option.categoryId === category.id);
              if (options.length === 0) {
                return (
                  <section key={category.id} className="mb-6">
                    <CategoryHeading title={category.nameKo} status="" icon={<Layers className="h-4 w-4" />} />
                    <div className="mt-2 flex items-center justify-center rounded-lg border border-dashed border-[#ded5c8] bg-[#fbfaf7] py-6">
                      <p className="text-sm text-[#8a806f]">현재 선택 가능한 옵션이 없습니다.</p>
                    </div>
                  </section>
                );
              }

              const categorySelected = options.filter((option) => selectedOptions[category.id]?.includes(option.id));
              const amount = categorySelected.reduce((sum, option) => sum + (option.priceType === 'fixed' ? option.price : 0), 0);
              const consultSelected = categorySelected.filter((option) => option.priceType === 'consult').length;
              const categoryStatus =
                amount > 0
                  ? `${categorySelected.length}개 선택 · +${formatWon(amount)}`
                  : consultSelected > 0
                    ? `${COPY.consultNeeded} ${consultSelected}개`
                    : categorySelected.length > 0
                      ? '기본 포함'
                      : '선택 안 함';
              const meta = CATEGORY_META[category.key as keyof typeof CATEGORY_META];
              const Icon = meta?.icon ?? Layers;

              const sortedOptions = [...options].sort((a, b) => {
                if (a.priceType === 'included' && b.priceType !== 'included') return -1;
                if (a.priceType !== 'included' && b.priceType === 'included') return 1;
                if (a.isDefault && !b.isDefault) return -1;
                if (!a.isDefault && b.isDefault) return 1;
                return 0;
              });

              return (
                <section key={category.id} className="mb-6 scroll-mt-20">
                  <CategoryHeading title={category.nameKo} status={categoryStatus} icon={<Icon className={cn('h-4 w-4', meta?.tone)} />} />
                  {category.descriptionKo && <p className="mt-1 text-xs leading-5 text-[#756d61]">{category.descriptionKo}</p>}
                  <div className="mt-2 grid gap-1.5">
                    {sortedOptions.map((option) => (
                      <OptionCard
                        key={option.id}
                        option={option}
                        selected={selectedOptions[category.id]?.includes(option.id) ?? false}
                        onToggle={() => onOptionToggle(category, option)}
                        onInfo={() => onInfo(option)}
                      />
                    ))}
                  </div>
                </section>
              );
            })}
        </>
      )}

      {inline && <InlineStepFooter stepIndex={stepIndex} goToStep={goToStep} />}
    </>
  );

  if (inline) {
    return (
      <div ref={scrollRef} className="scroll-mt-[150px] md:scroll-mt-[162px]">
        <div className="mx-auto w-full max-w-xl px-4 pb-40 pt-5 md:px-6">
          {stepBody}
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100dvh-136px)] flex-col overflow-hidden">
      <div className="border-b border-[#d8d0c3] bg-[#fbfaf7]/95 px-5 py-3 backdrop-blur">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-[#2f3432]">이동식주택 구성</h2>
          <span className="text-xs font-bold text-[#8a806f]">{stepIndex + 1} / {STEPS.length} 단계</span>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-5">
        {stepBody}
      </div>

      <RailSummaryFooter estimate={estimate} stepIndex={stepIndex} goToStep={goToStep} />
    </div>
  );
}

// 모바일 인라인 패널 하단: '다음'은 하단 고정 바가 담당하므로 이전 이동과 검토 바로가기만 둔다.
function InlineStepFooter({ stepIndex, goToStep }: { stepIndex: number; goToStep: (step: ConfigStep) => void }) {
  const prevStep = stepIndex > 0 ? STEPS[stepIndex - 1] : null;

  return (
    <div className="mt-4 border-t border-[#e2dacd] pt-3">
      <div className="flex items-center justify-between gap-2">
        {prevStep ? (
          <Button
            variant="outline"
            data-testid="customize-step-prev"
            className="h-11 border-[#cfc4b3] bg-[#fbfaf7] px-4 text-[#2f3432]"
            onClick={() => goToStep(prevStep.id)}
          >
            <ArrowLeft className="h-4 w-4" />
            {prevStep.label}
          </Button>
        ) : (
          <span />
        )}
        <button
          type="button"
          data-testid="customize-skip-to-review"
          onClick={() => goToStep('review')}
          className="rounded-md px-2 py-2 text-xs font-bold text-[#0d6e66] underline-offset-2 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#b88b26]"
        >
          구성 검토·상담 요청으로 이동
        </button>
      </div>
      <p className="mt-2 text-[11px] leading-relaxed text-[#8a806f]">
        {COPY.notPayment} 운반/설치 및 현장 조건에 따라 최종 견적이 달라질 수 있습니다.
      </p>
    </div>
  );
}

// 데스크톱 우측 레일 하단 고정 요약: 가격 분해 + 단계 이동 CTA.
function RailSummaryFooter({
  estimate,
  stepIndex,
  goToStep,
}: {
  estimate: EstimateBreakdown | null;
  stepIndex: number;
  goToStep: (step: ConfigStep) => void;
}) {
  const prevStep = stepIndex > 0 ? STEPS[stepIndex - 1] : null;
  const nextStep = stepIndex < STEPS.length - 1 ? STEPS[stepIndex + 1] : null;
  const currentStep = STEPS[stepIndex];

  return (
    <div className="border-t border-[#d8d0c3] bg-[#fbfaf7] px-5 pb-4 pt-3">
      {estimate && (
        <dl className="mb-3 space-y-1 text-xs">
          <div className="flex items-center justify-between gap-3">
            <dt className="font-semibold text-[#7b7468]">{COPY.basePrice}</dt>
            <dd className="font-bold text-[#2f3432]">{formatWon(estimate.model.basePrice)}</dd>
          </div>
          <div className="flex items-center justify-between gap-3">
            <dt className="font-semibold text-[#7b7468]">{COPY.optionSubtotal}</dt>
            <dd className="font-bold text-[#2f3432]">{estimate.optionTotal > 0 ? `+${formatWon(estimate.optionTotal)}` : formatWon(0)}</dd>
          </div>
          <div className="flex items-center justify-between gap-3 border-t border-[#e2dacd] pt-1.5">
            <dt className="text-sm font-black text-[#2f3432]">{COPY.estimatedAmount}</dt>
            <dd className="text-base font-black text-[#2f3432]" data-testid="desktop-estimated-total">
              {formatWon(estimate.estimatedTotal)}
            </dd>
          </div>
          {estimate.consultOptionCount > 0 && (
            <div className="flex items-center justify-between gap-3">
              <dt className="font-semibold text-[#a56f16]">{COPY.consultNeeded} 항목</dt>
              <dd className="font-bold text-[#a56f16]">{estimate.consultOptionCount}개 · 견적 별도</dd>
            </div>
          )}
        </dl>
      )}
      <p className="mb-3 text-[11px] leading-relaxed text-[#8a806f]">
        {COPY.transportNote} ·{' '}
        <a href="/support#cost" target="_blank" rel="noopener noreferrer" className="font-bold text-[#0d6e66] underline-offset-2 hover:underline">
          별도 비용 안내
        </a>
      </p>
      <div className="flex items-center gap-2">
        {prevStep && (
          <Button
            variant="outline"
            data-testid="customize-rail-prev"
            aria-label={`이전 단계: ${prevStep.label}`}
            className="h-11 shrink-0 border-[#cfc4b3] bg-[#fbfaf7] px-3 text-[#2f3432]"
            onClick={() => goToStep(prevStep.id)}
          >
            <ArrowLeft className="h-4 w-4" />
            이전
          </Button>
        )}
        {nextStep && (
          <Button
            data-testid="customize-step-next"
            className="h-11 flex-1 bg-[#2f3432] text-[#fbfaf7] hover:bg-[#1f2422]"
            onClick={() => goToStep(nextStep.id)}
          >
            {nextStepCta(currentStep.id)}
            <ArrowRight className="h-4 w-4" />
          </Button>
        )}
      </div>
      {nextStep && nextStep.id !== 'review' && (
        <button
          type="button"
          data-testid="customize-rail-skip-to-review"
          onClick={() => goToStep('review')}
          className="mt-2 w-full rounded-md px-2 py-1.5 text-center text-xs font-bold text-[#0d6e66] underline-offset-2 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#b88b26]"
        >
          구성 검토·상담 요청으로 이동
        </button>
      )}
      <p className="mt-2 text-center text-[11px] text-[#8a806f]">{COPY.notPayment}</p>
    </div>
  );
}

function CategoryHeading({ title, status, icon }: { title: string; status: string; icon: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#efe6d4] text-[#2f3432]">{icon}</span>
        <h3 className="text-sm font-black text-[#2f3432]">{title}</h3>
      </div>
      {status && <p className="text-xs font-bold text-[#7a6a3a]">{status}</p>}
    </div>
  );
}

function OptionCard({
  option,
  selected,
  onToggle,
  onInfo,
}: {
  option: CustomizeOption;
  selected: boolean;
  onToggle: () => void;
  onInfo: () => void;
}) {
  return (
    <div
      className={cn(
        'group relative rounded-lg border bg-[#fbfaf7] transition-all hover:shadow-sm',
        selected ? 'border-[#2f3432] shadow-sm ring-1 ring-[#2f3432]' : 'border-[#ded5c8] hover:border-[#b9aa94]'
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex min-h-[44px] w-full items-center gap-2.5 rounded-lg px-2.5 py-2 pr-9 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#b88b26]"
        aria-pressed={selected}
      >
        <span
          className={cn(
            'flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-colors',
            selected ? 'border-[#0d6e66] bg-[#0d6e66] text-white' : 'border-[#bcb2a3] bg-[#fbfaf7] group-hover:border-[#8a806f]'
          )}
        >
          {selected && <Check className="h-3 w-3" />}
        </span>
        {SWATCH_CATEGORY_KEYS.has(option.categoryKey) && (
          <span aria-hidden="true" className="relative h-9 w-9 shrink-0 overflow-hidden rounded-md border border-[#e2dacd] bg-[#efe6d4]">
            <Image
              src={`/images/customize/options/${option.key || option.id}.webp?v=${OPTION_IMAGE_VERSION}`}
              alt=""
              fill
              unoptimized
              sizes="36px"
              className="object-cover"
              onError={(event) => { event.currentTarget.style.display = 'none'; }}
            />
          </span>
        )}
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <span className="truncate text-sm font-bold text-[#2f3432]">{option.nameKo}</span>
            <div className="flex shrink-0 items-center gap-2">
              {option.priceType === 'included' ? (
                <span className="rounded bg-[#efe6d4]/50 px-1.5 py-0.5 text-[10px] font-black text-[#8a806f]">
                  기본 포함
                </span>
              ) : option.priceType === 'consult' ? (
                <span className="rounded bg-[#f4f0e8] px-1.5 py-0.5 text-[10px] font-black text-[#a56f16]">{COPY.consultNeeded}</span>
              ) : (
                <span className="text-xs font-bold text-[#6d5b2b]">
                  {optionPriceDisplay(option)}
                </span>
              )}
            </div>
          </div>
          {option.shortDescriptionKo && (
            <span className="mt-0.5 block truncate text-[11px] text-[#8a806f]">{option.shortDescriptionKo}</span>
          )}
        </div>
      </button>
      {hasOptionInfo(option) && (
        <button
          type="button"
          data-testid={`option-info-${option.key || option.id}`}
          onClick={(event) => {
            event.stopPropagation();
            onInfo();
          }}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-[#8a806f] opacity-100 transition-opacity hover:text-[#2f3432] focus:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#b88b26] md:opacity-0 md:group-hover:opacity-100"
          aria-label="옵션 상세 보기"
        >
          <Info className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

function FloorplanPreview({
  model,
  selectedOptions,
  floorplanImagePath,
  floorplanImageStatus,
  onOpenViewer,
}: {
  model: CustomizeModel;
  selectedOptions: CustomizeOption[];
  floorplanImagePath?: string | null;
  floorplanImageStatus?: FloorplanImageStatus;
  onOpenViewer?: () => void;
}) {
  return (
    <div className="w-full max-w-[1100px]">
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-[#8a806f]">선택 모델</p>
          <h1 className="text-2xl font-black text-[#2f3432] md:text-3xl">{model.nameKo}</h1>
        </div>
        <div className="text-right">
          <p className="text-sm font-bold text-[#8a806f]">{COPY.basePrice}</p>
          <p className="text-lg font-black text-[#6b5a2b]">{formatModelStartPrice(model.basePrice)}</p>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-lg border border-[#d8d0c3] bg-[#fbfaf7] shadow-sm">
        {onOpenViewer && (
          <button
            type="button"
            data-testid="floorplan-zoom-open"
            aria-label="도면 크게 보기"
            onClick={onOpenViewer}
            className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-md border border-[#d8d0c3] bg-[#fbfaf7]/95 text-[#2f3432] shadow-sm backdrop-blur transition-colors hover:border-[#b9aa94] hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#b88b26]/40"
          >
            <Maximize2 className="h-4 w-4" />
          </button>
        )}
        <FloorplanCanvas
          model={model}
          selectedOptions={selectedOptions}
          floorplanImagePath={floorplanImagePath}
          floorplanImageStatus={floorplanImageStatus}
          testId="floorplan-canvas"
        />
      </div>
    </div>
  );
}

// 데스크톱 도면 아래 상시 구성 요약: 모델·선택 옵션·금액을 주문서처럼 한눈에 보여준다.
function ConfigSummaryBoard({ estimate, selectedOptions }: { estimate: EstimateBreakdown; selectedOptions: CustomizeOption[] }) {
  const decisionOptions = selectedOptions.filter((option) => option.priceType !== 'included');

  return (
    <div className="hidden w-full max-w-[1100px] lg:block" data-testid="config-summary-board">
      <div className="rounded-lg border border-[#d8d0c3] bg-[#fbfaf7] shadow-sm">
        <div className="grid grid-cols-[0.9fr_1.5fr_0.9fr] divide-x divide-[#e2dacd]">
          <div className="p-4">
            <p className="text-[11px] font-bold text-[#8a806f]">선택 모델</p>
            <p className="mt-1 text-sm font-black text-[#2f3432]">{estimate.model.nameKo}</p>
            <p className="text-xs text-[#756d61]">
              {estimate.model.widthM}m × {estimate.model.lengthM}m · {estimate.model.areaSqm}m²
            </p>
            <p className="mt-1.5 text-xs font-bold text-[#6b5a2b]">
              {COPY.basePrice} {formatModelStartPrice(estimate.model.basePrice)}
            </p>
          </div>
          <div className="min-w-0 p-4">
            <p className="text-[11px] font-bold text-[#8a806f]">선택 옵션</p>
            {decisionOptions.length > 0 ? (
              <ul className="mt-1.5 flex flex-wrap gap-1.5">
                {decisionOptions.map((option) => (
                  <li
                    key={option.id}
                    className={cn(
                      'inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-bold',
                      option.priceType === 'consult'
                        ? 'border-[#e3cf9f] bg-[#f8f1e0] text-[#a56f16]'
                        : 'border-[#d8d0c3] bg-[#f5f1ea] text-[#4f473d]'
                    )}
                  >
                    {option.nameKo}
                    <span className="font-semibold text-[#8a806f]">{optionPriceDisplay(option)}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-1.5 text-xs text-[#8a806f]">추가 선택 옵션 없음 · 기본 구성</p>
            )}
          </div>
          <div className="p-4">
            <p className="text-[11px] font-bold text-[#8a806f]">{COPY.estimatedAmount}</p>
            <p className="mt-1 text-lg font-black text-[#2f3432]" data-testid="summary-estimated-total">
              {formatWon(estimate.estimatedTotal)}
            </p>
            {estimate.consultOptionCount > 0 && (
              <p className="text-xs font-bold text-[#a56f16]">+ {COPY.consultNeeded} {estimate.consultOptionCount}개 · 견적 별도</p>
            )}
            <p className="mt-1.5 text-[11px] text-[#8a806f]">{COPY.transportNote}</p>
          </div>
        </div>
        <p className="border-t border-[#e2dacd] px-4 py-2 text-[11px] text-[#8a806f]">
          상담 요청용 예상 금액입니다. 결제 단계가 아니며, 운반/설치 및 현장 조건에 따라 최종 견적이 달라질 수 있습니다.
        </p>
      </div>
    </div>
  );
}

type FloorplanBox = ReturnType<typeof floorplanSize>;
// 도면 외벽 스트로크(12px)가 박스 경계 바깥으로 6px 나가므로 클립에 여유를 둔다.
const FLOORPLAN_CLIP_PAD = 14;

function FloorplanCanvas({
  model,
  selectedOptions,
  floorplanImagePath,
  floorplanImageStatus,
  testId,
  className,
}: {
  model: CustomizeModel;
  selectedOptions: CustomizeOption[];
  floorplanImagePath?: string | null;
  floorplanImageStatus?: FloorplanImageStatus;
  testId: string;
  className?: string;
}) {
  const box = useMemo(() => floorplanSize(model), [model]);
  const shouldReduceMotion = useReducedMotion();
  const selectedLabels = selectedOptions.filter((option) => option.overlayLabelKo);
  const resolvedFloorplanImagePath = floorplanImagePath ?? floorplanImagePathForModel(model);
  const localImageStatus = useFloorplanImageStatus(resolvedFloorplanImagePath);
  const imageStatus = floorplanImageStatus ?? localImageStatus;
  const [lastShownImage, setLastShownImage] = useState<{ path: string; box: FloorplanBox } | null>(null);
  const [imageTransition, setImageTransition] = useState<{ fromPath: string; fromBox: FloorplanBox } | null>(null);

  // 모델이 바뀌어 새 도면이 로드되면 직전 도면 기준의 확장/축소 트랜지션을 시작한다.
  // (렌더 중 상태 보정 패턴 — https://react.dev/learn/you-might-not-need-an-effect)
  if (imageStatus === 'loaded' && resolvedFloorplanImagePath && lastShownImage?.path !== resolvedFloorplanImagePath) {
    if (lastShownImage) {
      if (!shouldReduceMotion && lastShownImage.box.width !== box.width) {
        setImageTransition({ fromPath: lastShownImage.path, fromBox: lastShownImage.box });
      } else {
        setImageTransition(null);
      }
    }
    setLastShownImage({ path: resolvedFloorplanImagePath, box });
  }

  // 다음 모델 도면이 로드되는 동안 직전 도면을 유지해 플리커를 없앤다.
  const displayedImagePath =
    imageStatus === 'loaded'
      ? resolvedFloorplanImagePath
      : imageStatus === 'loading'
        ? lastShownImage?.path ?? null
        : null;
  const hasBaseImage = Boolean(displayedImagePath);
  const gridId = `${testId}-grid`;
  const clipId = `${testId}-expansion-clip`;

  const isGrowing = imageTransition ? box.width >= imageTransition.fromBox.width : true;
  const baseLayerPath = imageTransition && isGrowing ? imageTransition.fromPath : displayedImagePath;
  const animatedLayerPath = imageTransition ? (isGrowing ? displayedImagePath : imageTransition.fromPath) : null;

  return (
    <svg viewBox="0 0 1000 420" className={cn('aspect-[1000/420] w-full', className)} data-testid={testId}>
      <defs>
        <pattern id={gridId} width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#e4ddd1" strokeWidth="1" />
        </pattern>
        {imageTransition && (
          <clipPath id={clipId}>
            {/* clipPath 내부에서는 CSS transform이 무시되므로 attrX로 SVG 속성을 직접 애니메이션한다. */}
            <motion.rect
              key={`${imageTransition.fromPath}->${displayedImagePath ?? 'none'}`}
              initial={{
                attrX: imageTransition.fromBox.x - FLOORPLAN_CLIP_PAD,
                width: imageTransition.fromBox.width + FLOORPLAN_CLIP_PAD * 2,
              }}
              animate={{ attrX: box.x - FLOORPLAN_CLIP_PAD, width: box.width + FLOORPLAN_CLIP_PAD * 2 }}
              transition={{ duration: 0.72, ease: 'easeInOut' }}
              onAnimationComplete={() => setImageTransition(null)}
              y={0}
              height={420}
            />
          </clipPath>
        )}
      </defs>
      <rect width="1000" height="420" fill="#f5f1ea" />

      {hasBaseImage ? (
        <g>
          <image
            data-testid="base-floorplan-image"
            href={baseLayerPath ?? undefined}
            x="0"
            y="0"
            width="1000"
            height="420"
            preserveAspectRatio="xMidYMid meet"
          />
          {imageTransition && animatedLayerPath && (
            <g clipPath={`url(#${clipId})`} data-testid="floorplan-image-transition">
              <motion.g
                key={`${imageTransition.fromPath}->${animatedLayerPath}`}
                initial={{ opacity: 1 }}
                animate={{ opacity: isGrowing ? 1 : [1, 1, 0] }}
                transition={{ duration: 0.72, ease: 'easeInOut' }}
              >
                <image
                  href={animatedLayerPath}
                  x="0"
                  y="0"
                  width="1000"
                  height="420"
                  preserveAspectRatio="xMidYMid meet"
                />
              </motion.g>
            </g>
          )}
        </g>
      ) : (
        <>
          <rect x={box.x} y={box.y} width={box.width} height={box.height} fill="#f8f4ec" stroke="#2f3432" strokeWidth="12" className="transition-all duration-[600ms] motion-reduce:transition-none" />
          <rect x={box.x + 12} y={box.y + 12} width={box.width - 24} height={box.height - 24} fill={`url(#${gridId})`} stroke="#bfb4a2" strokeWidth="2" className="transition-all duration-[600ms] motion-reduce:transition-none" />
          <BasePlanObjects box={box} />
        </>
      )}

      {!hasBaseImage && (
        <rect
          data-testid="model-footprint"
          x={box.x}
          y={box.y}
          width={box.width}
          height={box.height}
          fill="transparent"
          stroke="#2f3432"
          strokeWidth="6"
          className="transition-all duration-[600ms] motion-reduce:transition-none"
        />
      )}

      <motion.rect
        data-testid="floorplan-expansion-shell"
        initial={false}
        animate={{ x: box.x, width: box.width }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        y={box.y}
        height={box.height}
        rx="6"
        fill="transparent"
        stroke="#0d6e66"
        strokeWidth="8"
        strokeLinecap="round"
        opacity="0.9"
      />

      <FloorplanExpansionGuides box={box} />
      <FloorplanLengthRail box={box} lengthM={model.lengthM} />

      {selectedOptions.map((option) => option.overlayImagePath ? (
        <g key={option.id} className="transition-all duration-[600ms] motion-reduce:transition-none">
          <image
            href={option.overlayImagePath}
            x="0"
            y="0"
            width="1000"
            height="420"
            preserveAspectRatio="xMidYMid meet"
            opacity="0.88"
            className="transition-opacity duration-[250ms]"
          />
        </g>
      ) : null)}

      {selectedLabels.map((option, index) => {
        const position = (PLAN_LABEL_POSITIONS[option.categoryKey] ?? PLAN_LABEL_POSITIONS.interior)(box, index);
        return (
          <g key={option.id} className="transition-all duration-[250ms]">
            <rect x={position.x - 8} y={position.y - 19} width={Math.max(58, (option.overlayLabelKo?.length ?? 2) * 14 + 20)} height="30" rx="6" fill="#2f3432" />
            <text x={position.x + 4} y={position.y + 1} fill="#fbfaf7" fontSize="15" fontWeight="700">
              {option.overlayLabelKo}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function FloorplanExpansionGuides({ box }: { box: ReturnType<typeof floorplanSize> }) {
  const shouldReduceMotion = useReducedMotion();
  const transition = shouldReduceMotion ? { duration: 0 } : { duration: 0.72, ease: 'easeInOut' };
  const compactX = 500 - 600 / 2;
  const compactRightX = compactX + 600;
  const extensionWidth = Math.max(0, (box.width - 600) / 2);
  const hasExpansion = extensionWidth > 0;
  const inset = 12;
  const leftX = box.x + inset;
  const rightX = box.x + box.width - inset;
  const topY = box.y + inset;
  const bottomY = box.y + box.height - inset;
  const guideOpacity = hasExpansion ? 0.95 : 0.72;

  return (
    <g data-testid="floorplan-expansion-guides" pointerEvents="none">
      <motion.rect
        data-testid="floorplan-left-growth-zone"
        initial={false}
        animate={{ x: box.x + inset, width: Math.max(0, extensionWidth - inset), opacity: hasExpansion ? 0.28 : 0 }}
        transition={transition}
        y={box.y + inset}
        height={box.height - inset * 2}
        rx="4"
        fill="#d7efe9"
      />
      <motion.rect
        data-testid="floorplan-right-growth-zone"
        initial={false}
        animate={{ x: box.x + box.width - extensionWidth, width: Math.max(0, extensionWidth - inset), opacity: hasExpansion ? 0.28 : 0 }}
        transition={transition}
        y={box.y + inset}
        height={box.height - inset * 2}
        rx="4"
        fill="#d7efe9"
      />

      <motion.line
        data-testid="floorplan-compact-left-reference"
        initial={false}
        animate={{ opacity: hasExpansion ? 0.58 : 0 }}
        transition={transition}
        x1={compactX}
        y1={box.y + 18}
        x2={compactX}
        y2={box.y + box.height - 18}
        stroke="#b88b26"
        strokeWidth="3"
        strokeDasharray="7 7"
        strokeLinecap="round"
      />
      <motion.line
        data-testid="floorplan-compact-right-reference"
        initial={false}
        animate={{ opacity: hasExpansion ? 0.58 : 0 }}
        transition={transition}
        x1={compactRightX}
        y1={box.y + 18}
        x2={compactRightX}
        y2={box.y + box.height - 18}
        stroke="#b88b26"
        strokeWidth="3"
        strokeDasharray="7 7"
        strokeLinecap="round"
      />

      <motion.line
        data-testid="floorplan-expansion-top-wall"
        initial={false}
        animate={{ x1: leftX, x2: rightX, opacity: guideOpacity }}
        transition={transition}
        y1={topY}
        y2={topY}
        stroke="#0d6e66"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <motion.line
        data-testid="floorplan-expansion-bottom-wall"
        initial={false}
        animate={{ x1: leftX, x2: rightX, opacity: guideOpacity }}
        transition={transition}
        y1={bottomY}
        y2={bottomY}
        stroke="#0d6e66"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <motion.line
        data-testid="floorplan-expansion-left-wall"
        initial={false}
        animate={{ x1: leftX, x2: leftX, opacity: guideOpacity }}
        transition={transition}
        y1={topY}
        y2={bottomY}
        stroke="#0d6e66"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <motion.line
        data-testid="floorplan-expansion-right-wall"
        initial={false}
        animate={{ x1: rightX, x2: rightX, opacity: guideOpacity }}
        transition={transition}
        y1={topY}
        y2={bottomY}
        stroke="#0d6e66"
        strokeWidth="5"
        strokeLinecap="round"
      />

      <motion.text
        data-testid="floorplan-expansion-label"
        initial={false}
        animate={{ x: box.x + box.width / 2, opacity: hasExpansion ? 1 : 0 }}
        transition={transition}
        y={box.y + 32}
        fill="#0d6e66"
        fontSize="13"
        fontWeight="900"
        textAnchor="middle"
      >
        6m 기준선에서 9m로 확장
      </motion.text>
    </g>
  );
}

function FloorplanLengthRail({ box, lengthM }: { box: ReturnType<typeof floorplanSize>; lengthM: number }) {
  const railY = box.y + box.height + 34;
  const labelX = box.x + box.width / 2;

  return (
    <g data-testid="floorplan-length-rail" className="transition-all duration-[600ms] motion-reduce:transition-none">
      <line x1={box.x} y1={railY} x2={box.x + box.width} y2={railY} stroke="#b9aa94" strokeWidth="2" strokeDasharray="4 4" opacity="0.85" />
      <line x1={box.x} y1={railY - 8} x2={box.x} y2={railY + 8} stroke="#b9aa94" strokeWidth="2" />
      <line x1={box.x + box.width} y1={railY - 8} x2={box.x + box.width} y2={railY + 8} stroke="#b9aa94" strokeWidth="2" />
      <rect x={labelX - 22} y={railY - 14} width="44" height="28" rx="4" fill="#f5f1ea" stroke="#d8d0c3" />
      <text x={labelX} y={railY + 5} fill="#6f6658" fontSize="12" fontWeight="800" textAnchor="middle">
        {lengthM}m
      </text>
    </g>
  );
}

function FloorplanZoomModal({
  model,
  selectedOptions,
  floorplanImagePath,
  floorplanImageStatus,
  onClose,
}: {
  model: CustomizeModel;
  selectedOptions: CustomizeOption[];
  floorplanImagePath?: string | null;
  floorplanImageStatus?: FloorplanImageStatus;
  onClose: () => void;
}) {
  useModalDismiss(onClose);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#4b4033]/55 p-3 backdrop-blur-sm md:p-6" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="floorplan-zoom-title"
        className="mx-auto flex min-h-[calc(100dvh-24px)] w-full max-w-6xl flex-col justify-center md:min-h-[calc(100dvh-48px)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="overflow-hidden rounded-lg border border-[#d8d0c3] bg-[#fbfaf7] shadow-2xl">
          <div className="flex items-start justify-between gap-4 border-b border-[#e2dacd] px-4 py-3 md:px-5">
            <div>
              <p className="text-xs font-bold text-[#8a806f]">도면 확대</p>
              <h2 id="floorplan-zoom-title" className="text-lg font-black text-[#2f3432] md:text-xl">{model.nameKo}</h2>
              <p className="mt-1 text-xs font-bold text-[#6b5a2b]">{formatModelStartPrice(model.basePrice)}</p>
            </div>
            <button
              type="button"
              data-testid="floorplan-zoom-close"
              aria-label="도면 확대 닫기"
              onClick={onClose}
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-[#d8d0c3] text-[#2f3432] transition-colors hover:bg-[#f4f0e8] focus:outline-none focus:ring-2 focus:ring-[#b88b26]/40"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="bg-[#f4f0e8] p-2 md:p-5">
            <div className="overflow-auto rounded-lg border border-[#d8d0c3] bg-[#fbfaf7]" aria-label="확대 도면 보기 영역">
              <FloorplanCanvas
                model={model}
                selectedOptions={selectedOptions}
                floorplanImagePath={floorplanImagePath}
                floorplanImageStatus={floorplanImageStatus}
                testId="floorplan-zoom-canvas"
                className="min-w-[640px] md:min-w-0"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BasePlanObjects({ box }: { box: ReturnType<typeof floorplanSize> }) {
  return (
    <g className="transition-all duration-[600ms]">
      <rect x={box.x + box.width - 84} y={box.y + box.height - 8} width="60" height="16" fill="#8d7a5a" />
      <path d={`M ${box.x + box.width - 78} ${box.y + box.height - 8} Q ${box.x + box.width - 80} ${box.y + box.height - 70} ${box.x + box.width - 20} ${box.y + box.height - 70}`} fill="none" stroke="#8d7a5a" strokeWidth="3" />
      <text x={box.x + box.width - 96} y={box.y + box.height - 28} fill="#5f5448" fontSize="14" fontWeight="700">현관도어</text>

      <rect x={box.x + box.width * 0.25} y={box.y - 6} width="96" height="12" fill="#7f9aa0" />
      <text x={box.x + box.width * 0.25 + 12} y={box.y + 24} fill="#5f5448" fontSize="14" fontWeight="700">기본창</text>

      <rect x={box.x + 60} y={box.y + box.height - 108} width="150" height="64" rx="4" fill="#e1d7c8" stroke="#6b6258" strokeWidth="2" />
      <circle cx={box.x + 88} cy={box.y + box.height - 76} r="16" fill="none" stroke="#6b6258" strokeWidth="2" />
      <text x={box.x + 92} y={box.y + box.height - 116} fill="#5f5448" fontSize="14" fontWeight="700">싱크대</text>

      <rect x={box.x + box.width - 210} y={box.y + 46} width="140" height="112" rx="4" fill="#e7e1d8" stroke="#6b6258" strokeWidth="2" />
      <circle cx={box.x + box.width - 104} cy={box.y + 86} r="18" fill="none" stroke="#6b6258" strokeWidth="2" />
      <rect x={box.x + box.width - 198} y={box.y + 58} width="48" height="32" rx="4" fill="none" stroke="#6b6258" strokeWidth="2" />
      <text x={box.x + box.width - 196} y={box.y + 178} fill="#5f5448" fontSize="14" fontWeight="700">욕실</text>
    </g>
  );
}

const FALLBACK_CATALOG: Record<string, { desc: string; specs: string[] }> = {
  'ribbed-steel-white': { desc: '화이트 리브 강판은 가장 기본적인 외장 레이어입니다. 밝은 색으로 작은 공간을 가볍게 보이게 하고, 세로 골 패턴이 빗물 흐름과 표면 오염을 정돈해 주기 때문에 유지관리 부담이 낮습니다.', specs: ['세로 리브 패턴', '밝은 외장 톤', '기본 외피'] },
  'zinc-gray': { desc: '징크 그레이는 금속 패널의 선이 또렷하게 보이는 외장 옵션입니다. 상업용 팝업이나 숙박 공간처럼 차분하고 테크적인 인상을 원할 때 잘 맞으며, 창호와 모서리 몰딩 색을 함께 맞추면 완성도가 올라갑니다.', specs: ['메탈 패널', '저채도 그레이', '프리미엄 외피'] },
  'cedar-point': { desc: '적삼목 포인트는 현관, 창 주변, 입면 일부에 따뜻한 질감을 더하는 옵션입니다. 전체를 목재로 덮기보다 포인트 면에 적용해 관리 범위를 줄이고, 흰색·그레이 외장과 대비를 만들어 줍니다.', specs: ['목재 포인트', '입면 대비', '부분 적용'] },
  'basic-window': { desc: '기본 창호는 채광, 환기, 단열의 균형을 맞춘 표준 사양입니다. 작은 평면에서도 가구 배치가 막히지 않도록 창 위치와 열림 방향을 함께 확인합니다.', specs: ['표준 창호', '채광/환기', '단열 검토'] },
  'extra-window': { desc: '추가 창호는 주방, 침실, 작업 공간처럼 더 많은 자연광이나 환기가 필요한 면에 넣는 옵션입니다. 벽면 수납, 침대 위치, 외부 시선 방향과 충돌하지 않게 배치합니다.', specs: ['추가 채광', '환기 강화', '가구 간섭 검토'] },
  'wide-window': { desc: '와이드 창호는 풍경을 크게 받아들이는 파노라마형 옵션입니다. 거실형 사용, 스테이, 카페처럼 내부 체류 경험이 중요한 공간에 적합하며, 일사량과 프라이버시까지 같이 검토합니다.', specs: ['파노라마 뷰', '대형 개구부', '프라이버시 검토'] },
  'standard-lock': { desc: '표준 도어락은 비밀번호와 카드키 중심의 기본 출입 장치입니다. 가족용, 별채, 상주형 공간처럼 관리자가 현장에 가까이 있을 때 단순하고 안정적인 선택입니다.', specs: ['비밀번호', '카드키', '기본 출입'] },
  'smart-lock': { desc: '스마트락은 앱 기반 권한 부여와 출입 이력을 확인해야 하는 운영형 공간에 적합합니다. 숙박, 무인 매장, 직원 교대 공간에서는 게스트 권한 만료와 관리자 접근 방식을 상담 때 확정합니다.', specs: ['앱 권한', '출입 로그', '운영형 출입'] },
  'paper-wall': { desc: '합지 벽지는 비용 효율과 부드러운 실내 톤을 우선할 때 선택하는 기본 내장 마감입니다. 밝은 컬러를 쓰면 3x6 소형 공간에서도 답답함이 줄어듭니다.', specs: ['기본 내장', '밝은 톤', '비용 효율'] },
  'silk-wallpaper': { desc: '실크 벽지는 표면 내구성과 마감감을 높이는 내장 옵션입니다. 오염이 잦은 숙박·상업 공간이나 사진에 많이 노출되는 벽면에서 관리성과 인상이 좋아집니다.', specs: ['표면 내구', '오염 관리', '고급 질감'] },
  'birch-panel': { desc: '자작나무 패널은 벽면 일부를 목재 질감으로 정리해 작은 공간에 따뜻한 깊이를 줍니다. 침대 헤드월, 데스크 벽, 입구 포인트처럼 손이 닿는 면에 적용하기 좋습니다.', specs: ['자작나무 톤', '포인트 월', '내장 패널'] },
  'spc-white-oak': { desc: '화이트 오크 SPC 바닥은 밝고 깨끗한 인상을 주는 기본 바닥 옵션입니다. 물과 스크래치에 강한 편이라 주말주택, 사무실, 스테이 모두에서 관리가 쉽습니다.', specs: ['SPC 바닥', '화이트 오크', '생활 방수'] },
  'spc-natural-oak': { desc: '내추럴 오크 SPC 바닥은 가장 무난하고 따뜻한 생활감의 바닥 옵션입니다. 목재 가구, 베이지 벽지, 금속 외장과 모두 잘 어울려 장기 사용에 안정적입니다.', specs: ['내추럴 오크', '스크래치 대응', '따뜻한 톤'] },
  'porcelain-tile': { desc: '포세린 타일은 현관, 욕실 앞, 주방처럼 물과 오염이 많은 구간에 어울리는 고내구 바닥 옵션입니다. 무광 논슬립 계열을 쓰면 상업 공간과 숙박 공간의 청소 동선이 쉬워집니다.', specs: ['고내구 표면', '논슬립 검토', '오염 관리'] },
  'basic-sink': { desc: '기본 싱크는 간단한 조리와 세척을 위한 표준 주방 모듈입니다. 상판 길이, 수전 위치, 하부 수납을 평면에 맞춰 적용해 작은 공간에서도 동선이 끊기지 않게 합니다.', specs: ['상판/수전', '하부 수납', '표준 주방'] },
  'built-in-fridge': { desc: '빌트인 냉장고는 바닥 면적을 덜 쓰고 주방 라인을 깔끔하게 유지하는 옵션입니다. 스테이, 사무실, 쇼룸처럼 노출된 생활가전을 줄이고 싶을 때 적합합니다.', specs: ['빌트인 수납', '저소음 검토', '주방 라인 정리'] },
  'mini-washer': { desc: '미니 세탁기는 장기 체류, 숙박 운영, 작업복 세탁이 필요한 공간에서 검토하는 설비 옵션입니다. 급수, 배수, 진동 방지, 주변 수납 간섭을 함께 확인해야 합니다.', specs: ['급수/배수', '진동 검토', '장기 체류'] },
  'basic-bathroom': { desc: '기본 욕실은 샤워, 세면, 배수를 한 공간에 모은 표준 습식 모듈입니다. 방수층과 환기, 문 열림 방향을 함께 검토해 소형 평면에서도 사용성을 확보합니다.', specs: ['습식 욕실', '환기/배수', '방수 마감'] },
  'bidet': { desc: '비데는 장기 거주나 숙박 운영에서 체감 만족도가 높은 위생 옵션입니다. 전원 위치, 콘센트 방수, 세정수 연결을 욕실 설계와 함께 확인합니다.', specs: ['전원 위치', '위생 설비', '욕실 연동'] },
  'dry-vanity': { desc: '건식 세면대는 욕실 밖에서 손 씻기와 간단한 정리를 할 수 있게 만드는 옵션입니다. 카페, 사무실, 스테이처럼 여러 사람이 쓰는 공간에서 동선 분리가 좋아집니다.', specs: ['건식 동선', '거울/수납', '공용 사용'] },
  'built-in-storage': { desc: '빌트인 수납은 침구, 청소도구, 장비 박스를 숨기기 위한 맞춤 수납 옵션입니다. 작은 면적일수록 이동 동선을 막지 않는 깊이와 문 열림 방식을 같이 정합니다.', specs: ['맞춤 수납', '동선 확보', '댐퍼 힌지'] },
  'folding-table': { desc: '접이식 테이블은 식사, 노트북 작업, 상담 테이블을 한 면에서 해결하는 공간 절약 옵션입니다. 접었을 때 통로 폭이 남는지와 벽 보강 위치를 함께 검토합니다.', specs: ['접이식 구조', '벽 보강', '작업/식사 겸용'] },
  'bed-frame': { desc: '침대 프레임은 수면 공간을 고정하고 하부를 수납으로 활용하는 옵션입니다. 3x6에서는 접이식·수납형, 3x9에서는 독립 침대형까지 사용 목적에 맞춰 상담합니다.', specs: ['하부 수납', '수면 영역', '평면 맞춤'] },
  'solar-panel': { desc: '태양광 패널은 전기 사용량이 큰 운영 공간에서 전력 비용을 줄이기 위한 에너지 옵션입니다. 지붕 방향, 음영, 인버터 위치, 한전 계통 연계 가능성을 상담 때 확정합니다.', specs: ['지붕 통합', '인버터 연동', '음영 검토'] },
  'ess': { desc: 'ESS는 태양광이나 야간 전력 운용을 저장해 정전 대응과 부하 분산을 돕는 저장 장치입니다. 설치 공간, 환기, 안전 거리, 주요 부하 우선순위를 함께 설계합니다.', specs: ['배터리 저장', '백업 부하', '안전 거리'] },
  'ev-charger': { desc: 'EV 충전기는 방문객, 운영자, 숙박 이용자의 전기차 충전을 고려하는 옵션입니다. 완속 충전 용량, 차단기 여유, 주차 위치, 결제/사용 권한 방식을 함께 확인합니다.', specs: ['완속 충전', '부하 설계', '주차 동선'] },
  'iot-package': { desc: 'IoT 패키지는 조명, 냉난방, 환기, 도어 상태를 원격으로 확인하고 제어하기 위한 운영 옵션입니다. 무인 운영이나 입실 전 공간 준비가 필요한 경우 효과가 큽니다.', specs: ['원격 제어', '상태 알림', '스케줄링'] },
  'security-package': { desc: '보안 패키지는 CCTV, 센서등, 출입 감지, 알림 범위를 하나로 묶는 운영 옵션입니다. 녹화 구역, 야간 알림, 개인정보 노출 구역을 상담 때 정리합니다.', specs: ['CCTV/센서', '야간 알림', '출입 감지'] },
  'satellite-internet': { desc: '위성 인터넷은 유선망이 약하거나 LTE 품질이 흔들리는 외곽 부지에서 검토하는 통신 옵션입니다. 안테나 시야, 설치 위치, 날씨 영향을 고려해 백업망으로 설계합니다.', specs: ['외곽 통신', '안테나 시야', '백업망'] },
  'cellular-router': { desc: 'LTE/5G 라우터는 공사 초기나 유선망이 없는 부지에서 빠르게 네트워크를 열기 위한 옵션입니다. 신호 세기, 외부 안테나, POS·IoT 장비 분리 구성을 함께 봅니다.', specs: ['LTE/5G', '외부 안테나', '장비망 분리'] },
};

function hasOptionInfo(option: CustomizeOption) {
  const optionKey = option.key || option.id;
  return Boolean(option.detailDescriptionKo || option.shortDescriptionKo || option.imagePath || FALLBACK_CATALOG[optionKey] || FALLBACK_CATALOG[option.id]);
}

function OptionInfoModal({ option, onClose }: { option: CustomizeOption; onClose: () => void }) {
  useModalDismiss(onClose);
  const optionKey = option.key || option.id;
  const fallback = FALLBACK_CATALOG[optionKey] || FALLBACK_CATALOG[option.id];
  const titleId = `option-info-title-${optionKey}`;

  const imagePath = `/images/customize/options/${optionKey}.webp?v=${OPTION_IMAGE_VERSION}`;
  const desc = option.detailDescriptionKo || option.shortDescriptionKo || fallback?.desc || '상세 정보가 준비 중입니다.';
  const specs = fallback?.specs || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#4b4033]/35 p-4" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="w-full max-w-xl rounded-lg bg-[#fbfaf7] p-5 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <div className="mb-1 flex items-center gap-2">
              {option.priceType === 'included' && <span className="rounded bg-[#efe6d4] px-2 py-0.5 text-[11px] font-black text-[#8a806f]">기본 포함</span>}
              {option.priceType === 'consult' && <span className="rounded bg-[#f4f0e8] px-2 py-0.5 text-[11px] font-black text-[#a56f16]">{COPY.consultNeeded}</span>}
              {option.priceType === 'fixed' && <p className="text-xs font-bold text-[#8a806f]">{optionPriceDisplay(option)}</p>}
            </div>
            <h3 id={titleId} className="text-xl font-black text-[#2f3432]">{option.nameKo}</h3>
          </div>
          <Button variant="ghost" size="icon-sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="relative mb-4 aspect-[16/9] overflow-hidden rounded-lg bg-[#eee8dc]">
          <Image
            src={imagePath}
            alt={option.nameKo}
            fill
            unoptimized
            sizes="(max-width: 768px) calc(100vw - 48px), 560px"
            className="object-cover"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
        </div>
        {specs.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-2">
            {specs.map(spec => (
              <span key={spec} className="rounded-full border border-[#d8d0c3] bg-[#f5f1ea] px-3 py-1 text-xs font-bold text-[#6f6658]">
                {spec}
              </span>
            ))}
          </div>
        )}
        <p className="whitespace-pre-wrap text-sm leading-7 text-[#5f574d]">
          {desc}
        </p>
      </div>
    </div>
  );
}

// 마지막 단계: 구성 검토 + 상담 요청. 모달 대신 전용 화면으로 'Configure → Review → Request' 흐름을 만든다.
function ReviewStep({
  estimate,
  selectedOptions,
  floorplanImagePath,
  floorplanImageStatus,
  goToStep,
  form,
  setForm,
  isPending,
  submitted,
  onEditAfterSubmit,
  onSubmit,
  onSaveQuote,
}: {
  estimate: EstimateBreakdown;
  selectedOptions: CustomizeOption[];
  floorplanImagePath?: string | null;
  floorplanImageStatus?: FloorplanImageStatus;
  goToStep: (step: ConfigStep) => void;
  form: ConsultationDraft;
  setForm: Dispatch<SetStateAction<ConsultationDraft>>;
  isPending: boolean;
  submitted: boolean;
  onEditAfterSubmit: () => void;
  onSubmit: () => void;
  onSaveQuote: () => void;
}) {
  const consultOptions = selectedOptions.filter((option) => option.priceType === 'consult');
  const optionSteps = STEPS.filter((step): step is (typeof STEPS)[number] & { id: OptionStep } => step.id !== 'space' && step.id !== 'review');

  return (
    <div className="mx-auto w-full max-w-[1240px] px-4 pb-[max(4rem,env(safe-area-inset-bottom))] pt-6 md:px-8" data-testid="customize-review">
      <header className="mb-5">
        <h1 className="text-2xl font-black text-[#2f3432] md:text-3xl">구성 검토 및 상담 요청</h1>
        <p className="mt-1 text-sm leading-relaxed text-[#756d61]">
          선택하신 구성을 확인한 뒤 상담을 요청하세요. {COPY.notPayment} {COPY.finalQuote}
        </p>
      </header>

      <div className="grid gap-5 lg:grid-cols-[1.15fr_1fr] lg:items-start">
        <section aria-label="선택 구성 요약" className="space-y-4">
          <div className="rounded-lg border border-[#d8d0c3] bg-[#fbfaf7] p-4 md:p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[11px] font-bold text-[#8a806f]">선택 모델</p>
                <h2 className="text-lg font-black text-[#2f3432]">{estimate.model.nameKo}</h2>
                <p className="text-xs text-[#756d61]">
                  {estimate.model.widthM}m × {estimate.model.lengthM}m · {estimate.model.areaSqm}m²
                </p>
                <p className="mt-1 text-xs font-bold text-[#6b5a2b]">
                  {COPY.basePrice} {formatModelStartPrice(estimate.model.basePrice)}
                </p>
              </div>
              <ReviewEditButton label="모델 수정" onClick={() => goToStep('space')} />
            </div>
            <details className="group mt-3 rounded-lg border border-[#e2dacd] bg-[#f5f1ea] open:bg-[#fbfaf7]">
              <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-2 px-3 py-2 text-xs font-bold text-[#4f473d] [&::-webkit-details-marker]:hidden">
                평면 구성 보기
                <ChevronDown className="h-4 w-4 text-[#8a806f] transition-transform group-open:rotate-180" />
              </summary>
              <div className="border-t border-[#e2dacd] p-2">
                <FloorplanCanvas
                  model={estimate.model}
                  selectedOptions={selectedOptions}
                  floorplanImagePath={floorplanImagePath}
                  floorplanImageStatus={floorplanImageStatus}
                  testId="review-floorplan-canvas"
                />
              </div>
            </details>
          </div>

          {optionSteps.map((step) => {
            const stepOptions = selectedOptions.filter((option) => step.categories?.includes(option.categoryKey));
            return (
              <div key={step.id} className="rounded-lg border border-[#d8d0c3] bg-[#fbfaf7] p-4 md:p-5">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-sm font-black text-[#2f3432]">{step.label}</h3>
                  <ReviewEditButton label={`${step.label} 수정`} onClick={() => goToStep(step.id)} />
                </div>
                {stepOptions.length > 0 ? (
                  <ul className="mt-2 divide-y divide-[#efe9dd]">
                    {stepOptions.map((option) => (
                      <li key={option.id} className="flex items-center justify-between gap-3 py-2 text-sm">
                        <span className="min-w-0 truncate font-semibold text-[#4f473d]">{option.nameKo}</span>
                        <span
                          className={cn(
                            'shrink-0 text-xs font-bold',
                            option.priceType === 'consult' ? 'text-[#a56f16]' : option.priceType === 'fixed' ? 'text-[#6d5b2b]' : 'text-[#8a806f]'
                          )}
                        >
                          {optionPriceDisplay(option)}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-2 text-xs text-[#8a806f]">선택한 옵션이 없습니다. 비워두셔도 상담에서 함께 정할 수 있습니다.</p>
                )}
              </div>
            );
          })}

          {consultOptions.length > 0 && (
            <div className="rounded-lg border border-[#e3cf9f] bg-[#f8f1e0]/60 p-4">
              <p className="text-sm font-black text-[#7a5a12]">{COPY.consultNeeded} 항목 {consultOptions.length}개</p>
              <p className="mt-1 text-xs leading-relaxed text-[#8a6c2a]">{COPY.consultExplain} 선택한 구성은 상담 요청서에 함께 전달됩니다.</p>
            </div>
          )}
        </section>

        <section aria-label="가격 요약 및 상담 요청" className="space-y-4">
          <div className="rounded-lg border border-[#d8d0c3] bg-[#fbfaf7] p-4 md:p-5">
            <h2 className="text-sm font-black text-[#2f3432]">가격 요약</h2>
            <dl className="mt-3 space-y-1.5 text-sm">
              <div className="flex items-center justify-between gap-3">
                <dt className="font-semibold text-[#7b7468]">{COPY.basePrice}</dt>
                <dd className="font-bold text-[#2f3432]">{formatWon(estimate.model.basePrice)}</dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="font-semibold text-[#7b7468]">{COPY.optionSubtotal}</dt>
                <dd className="font-bold text-[#2f3432]">{estimate.optionTotal > 0 ? `+${formatWon(estimate.optionTotal)}` : formatWon(0)}</dd>
              </div>
              <div className="flex items-center justify-between gap-3 border-t border-[#e2dacd] pt-2">
                <dt className="text-base font-black text-[#2f3432]">{COPY.estimatedAmount}</dt>
                <dd className="text-xl font-black text-[#2f3432]" data-testid="review-estimated-total">{formatWon(estimate.estimatedTotal)}</dd>
              </div>
              {estimate.consultOptionCount > 0 && (
                <div className="flex items-center justify-between gap-3">
                  <dt className="font-semibold text-[#a56f16]">{COPY.consultNeeded} 항목</dt>
                  <dd className="font-bold text-[#a56f16]">{estimate.consultOptionCount}개 · 견적 별도</dd>
                </div>
              )}
            </dl>
            <p className="mt-3 text-[11px] leading-relaxed text-[#8a806f]">
              {COPY.transportNote} ·{' '}
              <a href="/support#cost" target="_blank" rel="noopener noreferrer" className="font-bold text-[#0d6e66] underline-offset-2 hover:underline">
                별도 비용 안내
              </a>
            </p>
            <Button variant="outline" className="mt-3 h-11 w-full border-[#cfc4b3] bg-[#fbfaf7] text-[#2f3432]" onClick={onSaveQuote}>
              <Download className="h-4 w-4" />
              견적 요약 저장
            </Button>
          </div>

          {submitted ? (
            <div className="rounded-lg border border-[#bcd8cd] bg-[#eef5f1] p-5" role="status">
              <p className="text-lg font-black text-[#0d6e66]">상담 요청이 접수되었습니다</p>
              <p className="mt-1.5 text-sm leading-relaxed text-[#4f6258]">
                담당자가 확인 후 입력하신 연락처로 연락드립니다. {COPY.finalQuote}
              </p>
              <Button
                variant="outline"
                className="mt-4 h-11 w-full border-[#cfc4b3] bg-[#fbfaf7] text-[#2f3432]"
                onClick={onEditAfterSubmit}
              >
                새 상담 요청 작성
              </Button>
            </div>
          ) : (
            <ConsultationForm form={form} setForm={setForm} isPending={isPending} onSubmit={onSubmit} />
          )}
        </section>
      </div>
    </div>
  );
}

function ReviewEditButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="inline-flex min-h-[36px] shrink-0 items-center gap-1 rounded-md border border-[#d8d0c3] bg-[#fbfaf7] px-2.5 py-1 text-xs font-bold text-[#4f473d] transition-colors hover:border-[#b9aa94] hover:text-[#2f3432] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#b88b26]"
    >
      <Pencil className="h-3 w-3" />
      수정
    </button>
  );
}

function ConsultationForm({
  form,
  setForm,
  isPending,
  onSubmit,
}: {
  form: ConsultationDraft;
  setForm: Dispatch<SetStateAction<ConsultationDraft>>;
  isPending: boolean;
  onSubmit: () => void;
}) {
  const [showOptional, setShowOptional] = useState(false);
  const updateField = (name: keyof ConsultationDraft, value: string) => setForm((current) => ({ ...current, [name]: value }));

  return (
    <form
      className="rounded-lg border border-[#d8d0c3] bg-[#fbfaf7] p-4 md:p-5"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <h2 className="text-lg font-black text-[#2f3432]">상담 요청 정보</h2>
      <p className="mt-1 text-xs leading-relaxed text-[#8a806f]">
        구성 확인과 연락을 위한 최소 정보만 받습니다. {COPY.privacyUse}
      </p>

      <div className="mt-4 grid gap-4">
        <Field label="이름" required>
          <Input data-testid="consultation-name" className={inputClass} autoComplete="name" value={form.customerName} onChange={(event) => updateField('customerName', event.target.value)} />
        </Field>
        <Field label="연락처" required>
          <Input data-testid="consultation-phone" className={inputClass} type="tel" autoComplete="tel" value={form.phone} onChange={(event) => updateField('phone', event.target.value)} />
        </Field>
        <Field label="지역" required>
          <Input data-testid="consultation-region" className={inputClass} placeholder="경기도 양평군" value={form.region} onChange={(event) => updateField('region', event.target.value)} />
        </Field>
      </div>

      <button
        type="button"
        aria-expanded={showOptional}
        onClick={() => setShowOptional((current) => !current)}
        className="mt-5 flex min-h-[44px] w-full items-center justify-between gap-2 rounded-lg border border-[#e2dacd] bg-[#f5f1ea] px-3 py-2 text-left text-sm font-bold text-[#4f473d] transition-colors hover:border-[#b9aa94] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#b88b26]"
      >
        <span>
          더 정확한 견적을 위한 선택 정보
          <span className="mt-0.5 block text-[11px] font-semibold text-[#8a806f]">아직 정하지 못한 항목은 비워두셔도 됩니다.</span>
        </span>
        <ChevronDown className={cn('h-4 w-4 shrink-0 text-[#8a806f] transition-transform', showOptional && 'rotate-180')} />
      </button>

      {showOptional && (
        <div className="mt-4 grid gap-4">
          <Field label="예상 구매 시기" helper="생산·설치 일정 제안에만 참고합니다.">
            <Select value={form.purchaseTimeline} onChange={(value) => updateField('purchaseTimeline', value)} options={PURCHASE_TIMELINES} />
          </Field>
          <Field label="설치할 장소 지목" helper="대지, 전·답, 임야 등 설치 조건 검토에 참고합니다.">
            <Select value={form.landType} onChange={(value) => updateField('landType', value)} options={LAND_TYPES} />
          </Field>
          <Field label="구매 예산" helper="가능한 사양 조합을 빠르게 제안하기 위한 참고값입니다.">
            <Select value={form.budgetRange} onChange={(value) => updateField('budgetRange', value)} options={BUDGET_RANGES} />
          </Field>
          <Field label="설치 주소" helper="정확한 번지 전이라도 읍·면·동 수준이면 괜찮습니다.">
            <Input className={inputClass} value={form.installAddress} onChange={(event) => updateField('installAddress', event.target.value)} />
          </Field>
          <Field label="추가 메모" helper="사용 목적, 예상 인원, 필요한 옵션을 자유롭게 적어주세요.">
            <Textarea className="min-h-24 rounded-lg border-gray-300 bg-[#fbfaf7] text-sm focus-visible:ring-[#b88b26]" value={form.memo} onChange={(event) => updateField('memo', event.target.value)} />
          </Field>
        </div>
      )}

      <div className="mt-5 rounded bg-[#efe6d4]/50 p-3 text-xs leading-relaxed text-[#756d61]">
        <Info className="mr-1 inline-block h-3.5 w-3.5 align-[-2px] text-[#8a806f]" />
        {COPY.notPayment} {COPY.finalQuote} 운반/설치는 별도이며 현장 조건에 따라 달라질 수 있습니다.
      </div>

      <Button type="submit" data-testid="consultation-submit" className="mt-4 h-12 w-full bg-[#0d6e66] text-white hover:bg-[#095a54]" disabled={isPending}>
        {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        상담·견적 요청하기
      </Button>
    </form>
  );
}

function Field({
  label,
  required,
  helper,
  className,
  children,
}: {
  label: string;
  required?: boolean;
  helper?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <Label className="mb-2 flex items-center gap-2 text-sm font-bold text-[#4f473d]">
        <span>{label}</span>
        <span className={cn(
          'rounded px-1.5 py-0.5 text-[10px] font-black',
          required ? 'bg-[#0d6e66] text-white' : 'bg-[#efe6d4] text-[#7a6a3a]'
        )}>
          {required ? '필수' : '선택'}
        </span>
      </Label>
      {children}
      {helper && <p className="mt-1.5 text-xs leading-relaxed text-[#8a806f]">{helper}</p>}
    </div>
  );
}

function Select({ value, onChange, options }: { value: string; onChange: (value: string) => void; options: readonly string[] }) {
  return (
    <div className="relative">
      <select value={value} onChange={(event) => onChange(event.target.value)} className={selectClass}>
        <option value="">선택 안 함</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8a806f]" />
    </div>
  );
}

function buildQuoteHtml(estimate: EstimateBreakdown, selectedOptions: CustomizeOption[]) {
  const optionRows = selectedOptions
    .map((option) => `<tr><td>${escapeHtml(option.nameKo)}</td><td>${escapeHtml(optionPriceDisplay(option))}</td></tr>`)
    .join('');
  const consultRow = estimate.consultOptionCount > 0
    ? `<tr><td>${escapeHtml(COPY.consultNeeded)} 항목</td><td>${estimate.consultOptionCount}개 · 견적 별도</td></tr>`
    : '';

  return `<!doctype html>
<html lang="ko">
<head>
  <meta charset="utf-8" />
  <title>위트 견적 요약</title>
  <style>
    @page { size: A4 landscape; margin: 18mm; }
    body { font-family: -apple-system, BlinkMacSystemFont, "Noto Sans KR", sans-serif; color: #2f3432; background: #f8f4ec; }
    h1 { margin: 0 0 8px; font-size: 28px; }
    p { margin: 0; color: #6f6658; }
    table { width: 100%; margin-top: 24px; border-collapse: collapse; background: #fffaf2; }
    th, td { border-bottom: 1px solid #ded5c8; padding: 12px; text-align: left; }
    .total { margin-top: 24px; font-size: 30px; font-weight: 900; }
    .note { margin-top: 10px; font-size: 13px; color: #6f6658; }
  </style>
</head>
<body>
  <h1>위트 이동식주택 견적 요약</h1>
  <p>상담 요청용 예상 금액 · ${escapeHtml(COPY.transportNote)}</p>
  <table>
    <tr><th>항목</th><th>가격</th></tr>
    <tr><td>${escapeHtml(estimate.model.nameKo)} (${escapeHtml(COPY.basePrice)})</td><td>${escapeHtml(formatWon(estimate.model.basePrice))}</td></tr>
    ${optionRows}
    <tr><td>${escapeHtml(COPY.optionSubtotal)}</td><td>${escapeHtml(estimate.optionTotal > 0 ? `+${formatWon(estimate.optionTotal)}` : formatWon(0))}</td></tr>
    ${consultRow}
  </table>
  <div class="total">${escapeHtml(COPY.estimatedAmount)} ${escapeHtml(formatWon(estimate.estimatedTotal))}</div>
  <p class="note">${escapeHtml(COPY.notPayment)} ${escapeHtml(COPY.finalQuote)}</p>
</body>
</html>`;
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  })[char] ?? char);
}

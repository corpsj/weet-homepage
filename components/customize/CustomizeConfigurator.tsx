'use client';

import { useEffect, useMemo, useState, useTransition, type Dispatch, type ReactNode, type SetStateAction } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'sonner';
import {
  ArrowLeft,
  Check,
  ChevronDown,
  Download,
  Info,
  Layers,
  Loader2,
  Maximize2,
  Send,
  SlidersHorizontal,
  X,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
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
  formatOptionPrice,
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
  SelectedOptions,
} from '@/lib/customize/types';
import { cn } from '@/lib/utils';

interface CustomizeConfiguratorProps {
  catalog: CustomizeCatalog;
  initialConfig: string | null;
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
type FloorplanImageStatus = 'missing' | 'loading' | 'loaded' | 'failed';

type ConfigStep = 'space' | 'included' | 'living' | 'summary';
const STEPS: { id: ConfigStep; label: string; categories?: string[] }[] = [
  { id: 'space', label: '모델 선택', categories: ['model'] },
  { id: 'included', label: '공간 구성', categories: ['windows', 'door', 'sink', 'bathroom', 'furniture'] },
  { id: 'living', label: '마감·설비 선택', categories: ['exterior', 'interior', 'flooring', 'energy', 'connectivity'] },
  { id: 'summary', label: '상담 신청' },
];

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

function estimateExclusionText(consultOptionCount: number) {
  return consultOptionCount > 0
    ? `상담 후 확정 ${consultOptionCount}개 · 운반/설치 별도`
    : '운반/설치 별도';
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

export default function CustomizeConfigurator({ catalog, initialConfig }: CustomizeConfiguratorProps) {
  const decoded = useMemo(() => decodeConfig(initialConfig), [initialConfig]);
  const firstModelId = catalog.models[0]?.id ?? DEFAULT_MODEL_ID;
  const [modelId, setModelId] = useState(decoded?.modelId ?? firstModelId);
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>(() => {
    if (decoded?.selectedOptions) return decoded.selectedOptions;
    return getDefaultSelections(catalog, decoded?.modelId ?? firstModelId);
  });
  const [activeInfo, setActiveInfo] = useState<CustomizeOption | null>(null);
  const [currentStep, setCurrentStep] = useState<ConfigStep>('space');
  const [orderOpen, setOrderOpen] = useState(false);
  const [optionDrawerOpen, setOptionDrawerOpen] = useState(false);
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

  const handleSubmit = () => {
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
        setOrderOpen(false);
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

    const html = buildQuoteHtml(estimate.model, selectedOptionsList, estimate.estimatedTotal);
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

  return (
    <div className="min-h-dvh bg-[#f4f0e8] text-[#2f3432]">
      <ConfiguratorAppBar />

      <div className="mx-auto flex min-h-[calc(100dvh-64px)] max-w-[1800px] flex-col lg:flex-row">
        <section className="flex min-h-[calc(100dvh-190px)] flex-1 flex-col lg:w-[64%] lg:min-h-[calc(100dvh-64px)] lg:overflow-y-auto">
          <div className="flex flex-1 items-center justify-center px-4 py-8 md:px-8 lg:px-10">
            <FloorplanPreview
              model={currentModel}
              selectedOptions={selectedOptionsList}
              floorplanImagePath={currentFloorplanImagePath}
              floorplanImageStatus={currentFloorplanImageStatus}
              onOpenViewer={() => setPlanViewerOpen(true)}
            />
          </div>

          <div className="border-t border-[#d8d0c3] bg-[#eee8dc]/80 px-4 pb-28 pt-3 lg:hidden">
            <Button
              variant="outline"
              className="h-11 w-full border-[#cfc4b3] bg-[#fbfaf7] text-[#2f3432]"
              onClick={() => setOptionDrawerOpen(true)}
            >
              <SlidersHorizontal className="h-4 w-4" />
              옵션 구성
            </Button>
          </div>


        </section>

        <aside className="hidden border-l border-[#d8d0c3] bg-[#fbfaf7] lg:block lg:w-[36%]">
          <OptionsPanel
            catalog={catalog}
            modelId={modelId}
            selectedOptions={selectedOptions}
            visibleOptions={visibleOptions}
            onModelChange={handleModelChange}
            onOptionToggle={handleOptionToggle}
            onInfo={setActiveInfo}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />
        </aside>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#d8d0c3] bg-[#fbfaf7]/95 px-4 py-3 shadow-[0_-8px_30px_rgba(55,48,39,0.12)] backdrop-blur lg:left-[64%]">
        <div className="mx-auto flex max-w-[720px] items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-[#7b7468]">예상 총액</p>
            <p className="text-xl font-black text-[#2f3432]">{estimate ? formatWon(estimate.estimatedTotal) : '-'}</p>
            <p className="text-xs text-[#8b8172]">
              {estimate ? estimateExclusionText(estimate.consultOptionCount) : '운반/설치 별도'}
            </p>
          </div>
          <Button className="h-12 min-w-[132px] bg-[#2f3432] text-white hover:bg-[#1f2422]" onClick={() => setOrderOpen(true)}>
            상담 요청
          </Button>
        </div>
      </div>

      <Sheet open={optionDrawerOpen} onOpenChange={setOptionDrawerOpen}>
        <SheetContent side="bottom" className="max-h-[86dvh] overflow-hidden rounded-t-lg border-[#d8d0c3] bg-[#fbfaf7] p-0">
          <SheetHeader className="border-b border-[#e2dacd]">
            <SheetTitle>옵션 구성</SheetTitle>
          </SheetHeader>
          <div className="h-[calc(86dvh-65px)] overflow-y-auto">
            <OptionsPanel
              catalog={catalog}
              modelId={modelId}
              selectedOptions={selectedOptions}
              visibleOptions={visibleOptions}
              onModelChange={handleModelChange}
              onOptionToggle={handleOptionToggle}
              onInfo={setActiveInfo}
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
              compact
            />
          </div>
        </SheetContent>
      </Sheet>

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

      {orderOpen && estimate && (
        <OrderModal
          estimate={estimate}
          selectedOptions={selectedOptionsList}
          floorplanImagePath={currentFloorplanImagePath}
          floorplanImageStatus={currentFloorplanImageStatus}
          form={form}
          setForm={setForm}
          isPending={isPending}
          onClose={() => setOrderOpen(false)}
          onSubmit={handleSubmit}
          onSaveQuote={handleSaveQuote}
        />
      )}
    </div>
  );
}

function ConfiguratorAppBar() {
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
      <Link href="/support" className="text-sm font-semibold text-[#6f6658] hover:text-[#2f3432]">
        확인사항
      </Link>
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
  compact = false,
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
  compact?: boolean;
}) {
  const currentStepData = STEPS.find((s) => s.id === currentStep)!;
  const stepIndex = STEPS.findIndex((s) => s.id === currentStep);
  const stepCounts: Record<ConfigStep, number> = {
    space: 1,
    included: 0,
    living: 0,
    summary: 0,
  };

  const optionsList = Object.values(selectedOptions).flat();
  visibleOptions.forEach((opt) => {
    if (optionsList.includes(opt.id)) {
      const catKey = catalog.categories.find((category) => category.id === opt.categoryId)?.key;
      if (STEPS[1].categories?.includes(catKey || '')) stepCounts.included++;
      if (STEPS[2].categories?.includes(catKey || '')) stepCounts.living++;
    }
  });

  return (
    <div className={cn('flex h-full flex-col pb-28', compact ? '' : 'h-[calc(100dvh-64px)] overflow-hidden')}>
      <div className="sticky top-0 z-10 border-b border-[#d8d0c3] bg-[#fbfaf7]/95 px-4 pb-2 pt-4 backdrop-blur md:px-8">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-xl font-black text-[#2f3432]">이동식주택 구성</h2>
          <span className="text-xs font-bold text-[#8a806f]">{stepIndex + 1} / {STEPS.length} 단계</span>
        </div>
        <div className="flex w-full gap-1 rounded-lg bg-[#efe6d4] p-1">
          {STEPS.map((step, index) => {
            const isCurrent = currentStep === step.id;
            const isComplete = index < stepIndex;

            return (
              <button
                key={step.id}
                type="button"
                data-testid={`customize-step-${step.id}`}
                aria-current={isCurrent ? 'step' : undefined}
                data-state={isCurrent ? 'current' : isComplete ? 'complete' : 'upcoming'}
                onClick={() => setCurrentStep(step.id)}
                className={cn(
                  'relative flex min-h-9 flex-1 items-center justify-center rounded-md px-1 py-2 text-xs font-bold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#b88b26]',
                  isCurrent && 'bg-[#fbfaf7] text-[#2f3432] shadow-sm',
                  !isCurrent && isComplete && 'bg-[#e6dcc9] text-[#4f473d]',
                  !isCurrent && !isComplete && 'text-[#8a806f] hover:text-[#2f3432]'
                )}
              >
                {step.label}
                {stepCounts[step.id] > 0 && step.id !== 'space' && step.id !== 'summary' && (
                  <span aria-hidden="true" className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#b88b26] px-1 text-[9px] text-white">
                    {stepCounts[step.id]}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className={cn('flex-1 overflow-y-auto', compact ? 'px-4 py-4' : 'px-8 py-6')}>
        {currentStep === 'space' && (
          <section className="mb-8">
            <CategoryHeading title="공간 모델" amount={0} icon={<Layers className="h-4 w-4" />} />
            <p className="mb-4 mt-1 text-sm text-[#756d61]">설치할 공간의 크기와 목적에 맞는 모델을 선택하세요.</p>
            <div className="grid gap-3">
              {catalog.models.map((model) => (
                <button
                  key={model.id}
                  type="button"
                  onClick={() => onModelChange(model.id)}
                  className={cn(
                    'min-h-[96px] rounded-lg border p-4 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#b88b26]',
                    model.id === modelId
                      ? 'border-[#2f3432] bg-[#efe6d4] shadow-sm'
                      : 'border-[#ded5c8] bg-[#fbfaf7] hover:border-[#b9aa94]'
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-base font-black text-[#2f3432]">{model.nameKo}</p>
                        <span className="rounded-full bg-[#e2dacd] px-2 py-0.5 text-[10px] font-bold text-[#6b5a2b]">
                          {model.id === 'compact-3x6' ? '소형 주말주택' : '프리미엄 거주'}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-[#756d61]">{model.widthM}m x {model.lengthM}m · {model.areaSqm}m²</p>
                    </div>
                    {model.id === modelId && <Check className="h-5 w-5 text-[#2f3432]" />}
                  </div>
                  <p className="mt-4 text-sm font-bold text-[#6b5a2b]">{formatModelStartPrice(model.basePrice)}</p>
                </button>
              ))}
            </div>
          </section>
        )}

        {(currentStep === 'included' || currentStep === 'living') && (
          <>
            {currentStep === 'included' && (
              <div className="mb-6 rounded-lg bg-[#efe6d4]/50 p-4">
                <div className="mb-2 flex items-center gap-2">
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
                    <section key={category.id} className="mb-8">
                      <CategoryHeading title={category.nameKo} amount={0} icon={<Layers className="h-4 w-4" />} />
                      <div className="mt-3 flex items-center justify-center rounded-lg border border-dashed border-[#ded5c8] bg-[#fbfaf7] py-8">
                        <p className="text-sm text-[#8a806f]">현재 선택 가능한 옵션이 없습니다.</p>
                      </div>
                    </section>
                  );
                }

                const amount = options
                  .filter((option) => selectedOptions[category.id]?.includes(option.id))
                  .reduce((sum, option) => sum + (option.priceType === 'fixed' ? option.price : 0), 0);
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
                  <section key={category.id} className="mb-8 scroll-mt-20">
                    <CategoryHeading title={category.nameKo} amount={amount} icon={<Icon className={cn('h-4 w-4', meta?.tone)} />} />
                    {category.descriptionKo && <p className="mt-1 text-sm leading-6 text-[#756d61]">{category.descriptionKo}</p>}
                    <div className="mt-3 grid gap-2">
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

        {currentStep === 'summary' && (
          <div className="animate-in fade-in slide-in-from-bottom-2">
            <ConversionConfidenceSection catalog={catalog} />
          </div>
        )}
      </div>
    </div>
  );
}

function CategoryHeading({ title, amount, icon }: { title: string; amount: number; icon: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#efe6d4] text-[#2f3432]">{icon}</span>
        <h3 className="text-base font-black text-[#2f3432]">{title}</h3>
      </div>
      <p className="text-sm font-bold text-[#7a6a3a]">{amount > 0 ? formatWon(amount) : '포함'}</p>
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
        className="flex min-h-[52px] w-full items-center gap-3 rounded-lg p-3 pr-11 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#b88b26]"
        aria-pressed={selected}
      >
        <span
          className={cn(
            'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors',
            selected ? 'border-[#2f3432] bg-[#2f3432] text-white' : 'border-[#bcb2a3] bg-[#fbfaf7] group-hover:border-[#8a806f]'
          )}
        >
          {selected && <Check className="h-3.5 w-3.5" />}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <span className="truncate font-bold text-[#2f3432]">{option.nameKo}</span>
            <div className="flex shrink-0 items-center gap-2">
              {option.priceType === 'included' ? (
                <span className="rounded bg-[#efe6d4]/50 px-1.5 py-0.5 text-[11px] font-black text-[#8a806f]">
                  기본 포함
                </span>
              ) : option.priceType === 'consult' ? (
                <span className="rounded bg-[#f4f0e8] px-1.5 py-0.5 text-[11px] font-black text-[#a56f16]">상담</span>
              ) : (
                <span className="text-xs font-bold text-[#6d5b2b]">
                  +{formatOptionPrice(option)}
                </span>
              )}
            </div>
          </div>
          {option.shortDescriptionKo && (
            <span className="mt-0.5 block truncate text-xs text-[#8a806f]">{option.shortDescriptionKo}</span>
          )}
        </div>
      </button>
      {(option.detailDescriptionKo || option.imagePath) && (
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onInfo();
          }}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-[#8a806f] opacity-100 transition-opacity hover:text-[#2f3432] focus:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#b88b26] md:opacity-0 md:group-hover:opacity-100"
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
          <p className="text-sm font-bold text-[#8a806f]">기본가</p>
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
  const box = floorplanSize(model);
  const selectedLabels = selectedOptions.filter((option) => option.overlayLabelKo);
  const resolvedFloorplanImagePath = floorplanImagePath ?? floorplanImagePathForModel(model);
  const localImageStatus = useFloorplanImageStatus(resolvedFloorplanImagePath);
  const imageStatus = floorplanImageStatus ?? localImageStatus;
  const hasBaseImage = imageStatus === 'loaded';
  const gridId = `${testId}-grid`;

  return (
    <svg viewBox="0 0 1000 420" className={cn('aspect-[1000/420] w-full', className)} data-testid={testId}>
      <defs>
        <pattern id={gridId} width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#e4ddd1" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="1000" height="420" fill="#f5f1ea" />

      {hasBaseImage ? (
        <g className="transition-all duration-[600ms] motion-reduce:transition-none">
          <image
            data-testid="base-floorplan-image"
            href={resolvedFloorplanImagePath ?? undefined}
            x="0"
            y="0"
            width="1000"
            height="420"
            preserveAspectRatio="xMaxYMid meet"
          />
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

      <FloorplanLengthRail box={box} lengthM={model.lengthM} />

      {selectedOptions.map((option) => option.overlayImagePath ? (
        <g key={option.id} className="transition-all duration-[600ms] motion-reduce:transition-none">
          <image
            href={option.overlayImagePath}
            x="0"
            y="0"
            width="1000"
            height="420"
            preserveAspectRatio="xMaxYMid meet"
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

function FloorplanLengthRail({ box, lengthM }: { box: ReturnType<typeof floorplanSize>; lengthM: number }) {
  const railX = box.x - 24;

  return (
    <g data-testid="floorplan-length-rail" className="transition-all duration-[600ms] motion-reduce:transition-none">
      <line x1={railX} y1={box.y} x2={railX} y2={box.y + box.height} stroke="#b9aa94" strokeWidth="2" strokeDasharray="4 4" opacity="0.8" />
      <rect x={railX - 22} y={box.y + box.height / 2 - 14} width="44" height="28" rx="4" fill="#f5f1ea" stroke="#d8d0c3" />
      <text x={railX} y={box.y + box.height / 2 + 5} fill="#6f6658" fontSize="12" fontWeight="800" textAnchor="middle">
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
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 p-3 backdrop-blur-sm md:p-6" onClick={onClose}>
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

function OptionInfoModal({ option, onClose }: { option: CustomizeOption; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 p-4" onClick={onClose}>
      <div className="w-full max-w-xl rounded-lg bg-[#fbfaf7] p-5 shadow-2xl" onClick={(event) => event.stopPropagation()}>
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <div className="mb-1 flex items-center gap-2">
              {option.priceType === 'included' && <span className="rounded bg-[#efe6d4] px-2 py-0.5 text-[11px] font-black text-[#8a806f]">기본 포함</span>}
              {option.priceType === 'consult' && <span className="rounded bg-[#f4f0e8] px-2 py-0.5 text-[11px] font-black text-[#a56f16]">상담 후 결정</span>}
              {option.priceType === 'fixed' && <p className="text-xs font-bold text-[#8a806f]">{formatOptionPrice(option)}</p>}
            </div>
            <h3 className="text-xl font-black text-[#2f3432]">{option.nameKo}</h3>
          </div>
          <Button variant="ghost" size="icon-sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="relative mb-4 aspect-[16/9] overflow-hidden rounded-lg bg-[#eee8dc]">
          {option.imagePath ? (
            <Image src={option.imagePath} alt={option.nameKo} fill sizes="72px" className="object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center text-sm font-semibold text-[#8a806f]">
              이미지 준비 중
            </div>
          )}
        </div>
        <p className="whitespace-pre-wrap text-sm leading-7 text-[#5f574d]">
          {option.detailDescriptionKo || option.shortDescriptionKo}
        </p>
      </div>
    </div>
  );
}

function OrderModal({
  estimate,
  selectedOptions,
  floorplanImagePath,
  floorplanImageStatus,
  form,
  setForm,
  isPending,
  onClose,
  onSubmit,
  onSaveQuote,
}: {
  estimate: NonNullable<ReturnType<typeof calculateEstimate>>;
  selectedOptions: CustomizeOption[];
  floorplanImagePath?: string | null;
  floorplanImageStatus?: FloorplanImageStatus;
  form: ConsultationDraft;
  setForm: Dispatch<SetStateAction<ConsultationDraft>>;
  isPending: boolean;
  onClose: () => void;
  onSubmit: () => void;
  onSaveQuote: () => void;
}) {
  const updateField = (name: keyof typeof form, value: string) => setForm((current) => ({ ...current, [name]: value }));

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/45 p-4" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="consultation-title"
        className="mx-auto my-6 grid w-full max-w-6xl gap-0 overflow-hidden rounded-lg bg-[#fbfaf7] shadow-2xl lg:grid-cols-[1fr_0.9fr]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="bg-[#f4f0e8] p-5 md:p-8">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-[#8a806f]">선택 평면</p>
              <h2 className="text-2xl font-black text-[#2f3432]">{estimate.model.nameKo}</h2>
            </div>
            <Maximize2 className="h-5 w-5 text-[#8a806f]" />
          </div>
          <FloorplanPreview
            model={estimate.model}
            selectedOptions={selectedOptions}
            floorplanImagePath={floorplanImagePath}
            floorplanImageStatus={floorplanImageStatus}
          />
        </div>

        <div className="max-h-[90dvh] overflow-y-auto p-5 md:p-8">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <h2 id="consultation-title" className="text-2xl font-black text-[#2f3432]">상담 요청</h2>
              <p className="mt-1 text-sm text-[#756d61]">{estimateExclusionText(estimate.consultOptionCount)}</p>
            </div>
            <Button variant="ghost" size="icon-sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="mb-6 rounded-lg border border-[#ded5c8] bg-[#f4f0e8] p-4">
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm font-bold text-[#756d61]">예상 총액</span>
              <span className="text-2xl font-black text-[#2f3432]">{formatWon(estimate.estimatedTotal)}</span>
            </div>
            <div className="mt-3 max-h-40 overflow-y-auto border-t border-[#ded5c8] pt-3">
              <p className="text-sm font-bold text-[#2f3432]">{estimate.model.nameKo}</p>
              {selectedOptions.map((option) => (
                <div key={option.id} className="mt-2 flex justify-between gap-3 text-sm text-[#61594f]">
                  <span>{option.nameKo}</span>
                  <span className="font-semibold">{formatOptionPrice(option)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-4 rounded bg-[#efe6d4]/50 p-3 text-xs leading-relaxed text-[#756d61]">
            <Info className="mr-1 inline-block h-3.5 w-3.5 align-[-2px] text-[#8a806f]" />
            선택 입력이지만 알려주시면 더 정확한 상담에 도움이 됩니다. 아직 정해지지 않았다면 비워두셔도 됩니다.
          </div>
          <div className="mb-3">
            <p className="text-sm font-black text-[#2f3432]">필수 정보</p>
            <p className="mt-1 text-xs text-[#8a806f]">상담 접수와 연락을 위해 필요한 최소 정보입니다.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="이름" required>
              <Input data-testid="consultation-name" className={inputClass} value={form.customerName} onChange={(event) => updateField('customerName', event.target.value)} />
            </Field>
            <Field label="연락처" required>
              <Input data-testid="consultation-phone" className={inputClass} value={form.phone} onChange={(event) => updateField('phone', event.target.value)} />
            </Field>
            <Field label="지역" required>
              <Input data-testid="consultation-region" className={inputClass} placeholder="경기도 양평군" value={form.region} onChange={(event) => updateField('region', event.target.value)} />
            </Field>
          </div>

          <div className="mb-3 mt-6">
            <p className="text-sm font-black text-[#2f3432]">추가 정보</p>
            <p className="mt-1 text-xs text-[#8a806f]">일정, 현장 조건, 예산에 맞춘 제안에만 참고합니다.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="예상 구매 시기" helper="생산·설치 일정 제안에만 참고합니다.">
              <Select value={form.purchaseTimeline} onChange={(value) => updateField('purchaseTimeline', value)} options={PURCHASE_TIMELINES} />
            </Field>
            <Field label="설치할 장소 지목" helper="대지, 전·답, 임야 등 현장 조건 검토에 참고합니다.">
              <Select value={form.landType} onChange={(value) => updateField('landType', value)} options={LAND_TYPES} />
            </Field>
            <Field label="구매 예산" helper="가능한 사양 조합을 빠르게 제안하기 위한 참고값입니다.">
              <Select value={form.budgetRange} onChange={(value) => updateField('budgetRange', value)} options={BUDGET_RANGES} />
            </Field>
            <Field label="설치 주소" className="md:col-span-2" helper="정확한 번지 전이라도 읍·면·동 수준이면 괜찮습니다.">
              <Input className={inputClass} value={form.installAddress} onChange={(event) => updateField('installAddress', event.target.value)} />
            </Field>
            <Field label="추가 메모" className="md:col-span-2" helper="사용 목적, 예상 인원, 필요한 옵션을 자유롭게 적어주세요.">
              <Textarea className="min-h-24 rounded-lg border-gray-300 bg-[#fbfaf7] text-sm focus-visible:ring-[#b88b26]" value={form.memo} onChange={(event) => updateField('memo', event.target.value)} />
            </Field>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button data-testid="consultation-submit" className="h-12 flex-1 bg-[#2f3432] text-white hover:bg-[#1f2422]" disabled={isPending} onClick={onSubmit}>
              {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              상담 요청
            </Button>
            <Button variant="outline" className="h-12 flex-1 border-[#cfc4b3] bg-[#fbfaf7]" onClick={onSaveQuote}>
              <Download className="h-4 w-4" />
              견적 저장
            </Button>
          </div>
        </div>
      </div>
    </div>
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
          required ? 'bg-[#2f3432] text-white' : 'bg-[#efe6d4] text-[#7a6a3a]'
        )}>
          {required ? '필수' : '선택'}
        </span>
      </Label>
      {children}
      {helper && <p className="mt-1.5 text-xs leading-relaxed text-[#8a806f]">{helper}</p>}
    </div>
  );
}

function ConversionConfidenceSection({ catalog }: { catalog: CustomizeCatalog }) {
  return (
    <div className="mx-auto max-w-[1100px] space-y-12 pb-32 lg:pb-10">
      <section>
        <h3 className="mb-4 text-xl font-black text-[#2f3432]">어떤 모델이 적합할까요?</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {catalog.models.map((model) => (
            <div key={model.id} className="rounded-lg border border-[#ded5c8] bg-[#fbfaf7] p-5 shadow-sm">
              <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h4 className="text-lg font-bold text-[#2f3432]">{model.nameKo}</h4>
                  <p className="mt-1 text-sm font-semibold text-[#8a806f]">{model.widthM}m x {model.lengthM}m · {model.areaSqm}m²</p>
                </div>
                <span className="w-fit shrink-0 rounded-full bg-[#f4f0e8] px-3 py-1 text-sm font-bold text-[#6b5a2b]">
                  {formatModelStartPrice(model.basePrice)}~
                </span>
              </div>
              <p className="text-sm leading-relaxed text-[#5f574d]">
                {model.id === 'compact-3x6'
                  ? '농막, 소형 주말주택, 프라이빗 아지트로 가장 많이 선택하는 베스트셀러 모델입니다.'
                  : '더 넓은 공간이 필요한 분들을 위한 프리미엄 모델로, 쾌적한 거주 환경을 제공합니다.'}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="mb-4 text-xl font-black text-[#2f3432]">포함 사항 및 별도 준비</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-[#ded5c8] bg-[#fbfaf7] p-5">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#efe6d4] text-[#6b5a2b]">
                <CheckCircle2 className="h-4 w-4" />
              </div>
              <h4 className="font-bold text-[#2f3432]">위트 포함 사항</h4>
            </div>
            <ul className="space-y-2 text-sm text-[#5f574d]">
              <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#b9aa94]" />기본 구조 (골조, 외장재, 지붕)</li>
              <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#b9aa94]" />기본 마감 (단열, 내장재, 바닥재)</li>
              <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#b9aa94]" />기본 전기 배선 및 조명</li>
              <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#b9aa94]" />선택한 기본/유상 옵션 전체</li>
            </ul>
          </div>
          <div className="rounded-lg border border-[#ded5c8] bg-[#fbfaf7] p-5">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#f4ecec] text-[#8a5b5b]">
                <AlertCircle className="h-4 w-4" />
              </div>
              <h4 className="font-bold text-[#2f3432]">현장 별도 준비 (비용 별도)</h4>
            </div>
            <ul className="space-y-2 text-sm text-[#5f574d]">
              <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#d2baba]" />운반 및 하차 (크레인 등)</li>
              <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#d2baba]" />현장 설치 (수평 작업, 용접 등)</li>
              <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#d2baba]" />기초 공사 (줄기초, 독립기초 등)</li>
              <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#d2baba]" />상하수도 및 전기 인입 공사</li>
              <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#d2baba]" />각종 인허가 및 부지 조건 검토</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-4">
          <h3 className="text-xl font-black text-[#2f3432]">현장 체크리스트</h3>
          <p className="mt-1 text-sm text-[#756d61]">설치 전 필수 확인 항목입니다. 가볍게 셀프 체크해보세요.</p>
        </div>
        <div className="space-y-3">
          <SiteCheckItem
            title="도로 폭 및 진입로"
            desc="5톤 이상 트럭이 진입하고 회전할 수 있는 3~4m 이상의 도로 폭이 확보되어 있나요?"
          />
          <SiteCheckItem
            title="크레인 및 트럭 작업 공간"
            desc="제품을 하차하고 설치하기 위한 크레인 작업 공간이 확보되어 있나요? (전선 등 장애물 확인)"
          />
          <SiteCheckItem
            title="전기 및 상하수도"
            desc="제품과 연결할 전기, 상수도, 하수도 배관이 설치 위치 근처까지 인입되어 있나요?"
          />
          <SiteCheckItem
            title="기초 및 수평"
            desc="설치할 바닥면의 평탄화 작업이 되어 있으며, 지반이 침하되지 않도록 단단한가요?"
          />
          <SiteCheckItem
            title="지역 인허가"
            desc="해당 부지에 이동식 주택 또는 농막 설치가 가능한지 지자체에 확인하셨나요?"
          />
        </div>
      </section>
    </div>
  );
}

function SiteCheckItem({ title, desc }: { title: string; desc: string }) {
  const [checked, setChecked] = useState(false);
  return (
    <button
      type="button"
      data-testid="site-check-item"
      aria-pressed={checked}
      onClick={() => setChecked(!checked)}
      className={cn(
        'flex w-full items-start gap-4 rounded-lg border p-4 text-left transition-colors',
        checked ? 'border-[#2f3432] bg-[#efe6d4] shadow-sm' : 'border-[#ded5c8] bg-[#fbfaf7] hover:border-[#b9aa94]'
      )}
    >
      <span className={cn(
        'mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-colors duration-200',
        checked ? 'border-[#2f3432] bg-[#2f3432] text-white' : 'border-[#bcb2a3] bg-[#fbfaf7]'
      )}>
        {checked && <Check className="h-4 w-4" />}
      </span>
      <div>
        <span className="block font-bold text-[#2f3432]">{title}</span>
        <span className="mt-1 block text-sm leading-relaxed text-[#5f574d]">{desc}</span>
      </div>
    </button>
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

function buildQuoteHtml(model: CustomizeModel, selectedOptions: CustomizeOption[], total: number) {
  const optionRows = selectedOptions
    .map((option) => `<tr><td>${escapeHtml(option.nameKo)}</td><td>${escapeHtml(formatOptionPrice(option))}</td></tr>`)
    .join('');

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
  </style>
</head>
<body>
  <h1>위트 이동식주택 견적 요약</h1>
  <p>상담 후 최종 확정 · 운반·설치 별도</p>
  <table>
    <tr><th>항목</th><th>가격</th></tr>
    <tr><td>${escapeHtml(model.nameKo)}</td><td>${escapeHtml(formatWon(model.basePrice))}</td></tr>
    ${optionRows}
  </table>
  <div class="total">예상 총액 ${escapeHtml(formatWon(total))}</div>
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

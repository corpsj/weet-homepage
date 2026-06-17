'use client';

import { useEffect, useMemo, useState, useTransition } from 'react';
import { ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { submitCustomizeConsultation } from '@/app/actions/customize-actions';
import { DEFAULT_MODEL_ID } from '@/lib/customize/config';
import {
  calculateEstimate,
  decodeConfig,
  encodeConfig,
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
  CustomizeOption,
  SelectedOptions,
} from '@/lib/customize/types';
import {
  COPY,
  STEPS,
  type ConfigStep,
  type ConsultationDraft,
} from './lib/constants';
import {
  buildSelectionsForModelChange,
  buildQuoteHtml,
  floorplanImagePathForModel,
  nextStepCta,
} from './lib/helpers';
import { useFloorplanImageStatus } from './lib/hooks';
import { ConfiguratorAppBar } from './parts/ConfiguratorAppBar';
import { ConfigSummaryBoard } from './parts/ConfigSummaryBoard';
import { FloorplanPreview } from './parts/FloorplanPreview';
import { FloorplanZoomModal } from './parts/FloorplanZoomModal';
import { OptionInfoModal } from './parts/OptionInfoModal';
import { OptionsPanel } from './parts/OptionsPanel';
import { ReviewStep } from './parts/ReviewStep';
import { StepperBar } from './parts/StepperBar';

interface CustomizeConfiguratorProps {
  catalog: CustomizeCatalog;
  initialConfig: string | null;
  contactPhone?: string;
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
      <div className="min-h-dvh bg-customize-linen px-6 py-20 text-center text-customize-ink">
        <p className="text-lg font-bold">주문 구성을 준비 중입니다.</p>
        <p className="mt-3 text-sm text-customize-gravel">관리자에서 모델과 옵션을 활성화하면 페이지가 표시됩니다.</p>
      </div>
    );
  }

  const currentStepIndex = STEPS.findIndex((s) => s.id === currentStep);
  const nextStep = currentStepIndex < STEPS.length - 1 ? STEPS[currentStepIndex + 1] : null;

  return (
    <div className="min-h-dvh bg-customize-linen text-customize-ink">
      <ConfiguratorAppBar contactPhone={contactPhone} />
      <StepperBar
        currentStep={currentStep}
        furthestStepIndex={furthestStepIndex}
        setCurrentStep={handleStepSelect}
        stepCounts={stepCounts}
      />

      <main id="main-content">
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
          <div id="customize-options" className="scroll-mt-[150px] border-t border-customize-stone bg-customize-sand md:scroll-mt-[162px] lg:hidden">
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
            className="hidden shrink-0 border-l border-customize-stone bg-customize-sand lg:block lg:w-[400px] xl:w-[460px]"
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
      </main>

      {/* 모바일/태블릿 고정 바: 구성 단계에서만 노출. 검토 단계는 본문에 자체 제출 CTA를 가진다. */}
      {currentStep !== 'review' && nextStep && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-customize-stone bg-customize-sand/95 px-4 pt-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] shadow-[0_-8px_30px_rgba(55,48,39,0.12)] backdrop-blur lg:hidden">
          <div className="mx-auto flex max-w-[1800px] items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[11px] font-semibold text-customize-driftwood">{COPY.estimatedAmount}</p>
              <p className="truncate text-lg font-black text-customize-ink">
                <span data-testid="mobile-estimated-total">{estimate ? formatWon(estimate.estimatedTotal) : '-'}</span>
                {estimate && estimate.consultOptionCount > 0 && (
                  <span className="ml-1 text-xs font-bold text-customize-amber">+ 상담 {estimate.consultOptionCount}건</span>
                )}
              </p>
              <p className="truncate text-[11px] text-customize-fog">운반/설치 별도 · {COPY.finalQuote}</p>
            </div>
            <Button
              data-testid="mobile-next-cta"
              className="h-12 shrink-0 bg-customize-ink px-4 text-customize-sand hover:bg-customize-ink-dark"
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

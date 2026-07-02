'use client';

import { useEffect, useMemo, useState, useTransition } from 'react';
import { ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { submitCustomizeConsultation } from '@/app/actions/customize-actions';
import { DEFAULT_MODEL_ID } from '@/lib/customize/config';
import {
  calculateEstimate,
  decodeConfig,
  encodeConfig,
  formatWon,
  getDefaultSelections,
  getRemovedConflicts,
  optionsForModel,
  sanitizeConfig,
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
import { pickText } from '@/lib/customize/i18n';
import {
  STEPS,
  UI_COPY,
  type ConfigStep,
  type ConsultationDraft,
} from './lib/constants';
import {
  buildSelectionsForModelChange,
  buildQuoteHtml,
  nextStepCta,
} from './lib/helpers';
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
  const { language } = useLanguage();
  const copy = UI_COPY[language];
  const decoded = useMemo(() => decodeConfig(initialConfig), [initialConfig]);
  const firstModelId = catalog.models[0]?.id ?? DEFAULT_MODEL_ID;
  // 외부 입력(?c=)·기본값 모두 카탈로그 기준으로 정규화해서 시작한다.
  const initial = useMemo(
    () => sanitizeConfig(
      catalog,
      decoded?.modelId ?? firstModelId,
      decoded?.selectedOptions ?? getDefaultSelections(catalog, decoded?.modelId ?? firstModelId)
    ),
    [catalog, decoded, firstModelId]
  );
  const [modelId, setModelId] = useState(initial.modelId);
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>(initial.selections);
  const [activeInfo, setActiveInfo] = useState<CustomizeOption | null>(null);
  const [currentStep, setCurrentStep] = useState<ConfigStep>('space');
  // 진행 시스템: 사용자가 도달한 가장 먼 단계 이전의 단계는 '완료'로 표시한다.
  // 공유 링크로 진입(decoded)하면 이미 구성이 끝난 상태이므로 모든 단계를 완료로 둔다.
  const [furthestStepIndex, setFurthestStepIndex] = useState(decoded ? STEPS.length - 1 : 0);

  // 새로고침 시 보던 단계/진행도 복원용. 구성(c)이 다르면(다른 공유 링크 진입) 무시한다.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const raw = window.sessionStorage.getItem('customize-progress');
      if (!raw) return;
      const saved = JSON.parse(raw) as { step?: string; furthest?: number; c?: string | null };
      if ((saved.c ?? null) !== (initialConfig ?? null)) return;
      const savedIndex = STEPS.findIndex((s) => s.id === saved.step);
      if (savedIndex < 0) return;
      // 마운트 1회 외부 저장소 복원 — hydration 이후에만 실행해야 해서 effect가 맞다.
      setCurrentStep(STEPS[savedIndex].id);
      if (typeof saved.furthest === 'number') {
        setFurthestStepIndex(Math.min(Math.max(saved.furthest, savedIndex), STEPS.length - 1));
      }
    } catch {
      // 저장값 파손 시 조용히 무시
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 제출 시점 견적 스냅샷. 구성이 스냅샷과 달라지면 submitted가 자동 해제된다(파생).
  const [submittedSnapshot, setSubmittedSnapshot] = useState<{ model: CustomizeModel; estimatedTotal: number; encodedConfig: string } | null>(null);
  const [planViewerOpen, setPlanViewerOpen] = useState(false);
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
  // submitted는 파생값: 스냅샷이 있고 그 스냅샷이 현재 구성과 일치할 때만 true.
  // 제출 후 구성을 바꾸면 encodedConfig가 달라져 자동으로 false가 되어 재제출이 열린다.
  const submitted = submittedSnapshot !== null && submittedSnapshot.encodedConfig === encodedConfig;
  // 순정 기본 구성(첫 모델 + 기본 선택)의 인코딩. 이 상태에서는 URL을 깨끗하게 유지한다.
  const pristineEncoded = useMemo(
    () => encodeConfig(firstModelId, getDefaultSelections(catalog, firstModelId)),
    [catalog, firstModelId]
  );

  // 새로고침 시 보던 단계/진행도 복원용 저장. 구성(c)이 순정 상태면 null로 저장해 다음 첫 진입과 구분한다.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      window.sessionStorage.setItem(
        'customize-progress',
        JSON.stringify({
          step: currentStep,
          furthest: furthestStepIndex,
          c: encodedConfig === pristineEncoded ? null : encodedConfig,
        })
      );
    } catch {
      // 프라이빗 모드 등 저장 불가 시 무시
    }
  }, [currentStep, furthestStepIndex, encodedConfig, pristineEncoded]);

  // URL을 항상 현재 구성과 일치시킨다(공유/새로고침 복원 정합성).
  // utm 등 기존 쿼리는 보존하고, 300ms debounce + try/catch로 Safari replaceState 제한을 방어한다.
  useEffect(() => {
    if (!estimate || typeof window === 'undefined') return;
    const timer = window.setTimeout(() => {
      try {
        const params = new URLSearchParams(window.location.search);
        if (encodedConfig === pristineEncoded) {
          params.delete('c');
        } else {
          params.set('c', encodedConfig);
        }
        const query = params.toString();
        window.history.replaceState(null, '', `${window.location.pathname}${query ? `?${query}` : ''}`);
      } catch {
        // Safari replaceState 호출 제한(SecurityError) — 이번 동기화만 건너뛴다.
      }
    }, 300);
    return () => window.clearTimeout(timer);
  }, [encodedConfig, estimate, pristineEncoded]);

  const currentModel = estimate?.model ?? catalog.models[0];
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
    setModelId(nextModelId);
    const { selections, removedOptions } = buildSelectionsForModelChange(catalog, selectedOptions, nextModelId);
    setSelectedOptions(selections);
    if (removedOptions.length > 0) {
      toast.info(copy.modelChangeRemoved(removedOptions.length));
    }
  };

  const handleOptionToggle = (category: CustomizeCategory, option: CustomizeOption) => {
    // 옵션을 켜는 경우에만(이미 선택된 옵션 해제는 제외) 충돌로 제거되는 옵션을 안내한다.
    const willSelect = !(selectedOptions[category.id]?.includes(option.id) ?? false);
    if (willSelect) {
      const removed = getRemovedConflicts(catalog, selectedOptions, option);
      if (removed.length > 0) {
        const names = removed.map((item) => pickText(item.option.nameKo, item.option.nameEn, language)).join(', ');
        // getRemovedConflicts는 reasonKo만 반환한다(priceCalculator는 담당 밖). 사유는 ko 원문을 그대로 노출.
        const reason = removed.find((item) => item.reasonKo)?.reasonKo ?? undefined;
        const selectedName = pickText(option.nameKo, option.nameEn, language);
        toast.info(
          reason
            ? copy.conflictWithReason(selectedName, names, reason)
            : copy.conflictNoReason(selectedName, names)
        );
      }
    }
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
    // 중복 제출/처리 중 재호출 방지. 필수값 검증의 UI 피드백(필드 에러·포커스)은 ReviewStep이 담당한다.
    if (isPending || submitted) return;
    if (!form.customerName.trim() || !form.phone.trim() || !form.region.trim()) return;

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
        if (estimate) setSubmittedSnapshot({ model: estimate.model, estimatedTotal: estimate.estimatedTotal, encodedConfig });
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

    const html = buildQuoteHtml(estimate, selectedOptionsList, language);
    const popup = window.open('', '_blank', 'width=1120,height=794');
    if (!popup) {
      toast.error(copy.quotePopupBlocked);
      return;
    }

    popup.document.write(html);
    popup.document.close();
    popup.focus();
    popup.print();
  };

  if (!currentModel || catalog.models.length === 0) {
    return (
      <div className="min-h-dvh bg-weet-paper px-6 py-20 text-center text-weet-ink">
        <p className="text-lg font-bold">{copy.emptyTitle}</p>
        <p className="mt-3 text-sm text-weet-muted">{copy.emptyBody}</p>
      </div>
    );
  }

  const currentStepIndex = STEPS.findIndex((s) => s.id === currentStep);
  const nextStep = currentStepIndex < STEPS.length - 1 ? STEPS[currentStepIndex + 1] : null;

  return (
    <div className="min-h-dvh break-keep bg-weet-paper text-weet-ink">
      <ConfiguratorAppBar contactPhone={contactPhone} copy={copy} />
      <StepperBar
        currentStep={currentStep}
        furthestStepIndex={furthestStepIndex}
        setCurrentStep={handleStepSelect}
        stepCounts={stepCounts}
        copy={copy}
      />

      <main id="main-content">
      {currentStep === 'review' && estimate ? (
        <ReviewStep
          estimate={estimate}
          selectedOptions={selectedOptionsList}
          goToStep={handleStepSelect}
          form={form}
          setForm={setForm}
          isPending={isPending}
          submitted={submitted}
          submittedSnapshot={submittedSnapshot}
          onEditAfterSubmit={() => setSubmittedSnapshot(null)}
          onSubmit={handleSubmit}
          onSaveQuote={handleSaveQuote}
          copy={copy}
          language={language}
        />
      ) : (
        <div className="mx-auto flex max-w-[1800px] flex-col lg:h-[calc(100dvh-136px)] lg:flex-row">
          {/* 데스크톱: 앱바(64px)+스테퍼(72px)를 제외한 높이에 도면/레일을 고정해 CTA가 항상 보이게 한다. */}
          <section className="flex flex-col lg:h-full lg:flex-1 lg:overflow-y-auto">
            <div className="flex flex-col items-center justify-center gap-5 px-4 py-5 md:px-8 md:py-8 lg:flex-1 lg:px-10 lg:py-6">
              <FloorplanPreview
                model={currentModel}
                selectedOptions={selectedOptionsList}
                onOpenViewer={() => setPlanViewerOpen(true)}
                copy={copy}
                language={language}
              />
              {estimate && <ConfigSummaryBoard estimate={estimate} selectedOptions={selectedOptionsList} copy={copy} language={language} />}
            </div>
          </section>

          {/* 모바일/태블릿: 드로어 없이 도면 아래에서 바로 이어지는 인라인 단계 구성 (Tesla 주문 흐름 참고) */}
          <div id="customize-options" className="scroll-mt-[150px] border-t border-weet-line bg-weet-surface md:scroll-mt-[162px] lg:hidden">
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
              copy={copy}
              language={language}
              inline
            />
          </div>

          <aside
            data-testid="customize-desktop-rail"
            className="hidden shrink-0 border-l border-customize-stone bg-customize-sand lg:block lg:w-[430px]"
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
              copy={copy}
              language={language}
            />
          </aside>
        </div>
      )}
      </main>

      {/* 모바일/태블릿 고정 바: 구성 단계에서만 노출. 검토 단계는 본문에 자체 제출 CTA를 가진다. */}
      {currentStep !== 'review' && nextStep && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-weet-line bg-weet-surface/95 px-4 pt-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] shadow-[0_-8px_30px_rgba(55,48,39,0.12)] backdrop-blur lg:hidden">
          <div className="mx-auto flex max-w-[1800px] items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[11px] font-semibold text-weet-sub">{copy.estimatedAmount}</p>
              <p className="flex flex-wrap items-baseline gap-x-1.5 text-lg font-black text-weet-ink" aria-live="polite" aria-atomic="true">
                <span data-testid="mobile-estimated-total" className="whitespace-nowrap">{estimate ? formatWon(estimate.estimatedTotal) : '-'}</span>
                {estimate && estimate.consultOptionCount > 0 && (
                  <span className="whitespace-nowrap text-xs font-bold text-weet-gold-deep">{copy.consultBadge(estimate.consultOptionCount)}</span>
                )}
              </p>
              <p className="truncate text-[11px] text-weet-muted">{copy.transportSeparateShort} · {copy.finalQuoteShort}</p>
            </div>
            <Button
              data-testid="mobile-next-cta"
              className="h-12 shrink-0 bg-weet-ink px-4 text-weet-paper hover:bg-weet-ink-deep"
              onClick={() => handleStepSelect(nextStep.id)}
            >
              {nextStepCta(currentStep, copy)}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {activeInfo && <OptionInfoModal option={activeInfo} onClose={() => setActiveInfo(null)} copy={copy} language={language} />}

      {planViewerOpen && (
        <FloorplanZoomModal
          model={currentModel}
          selectedOptions={selectedOptionsList}
          onClose={() => setPlanViewerOpen(false)}
          copy={copy}
          language={language}
        />
      )}
    </div>
  );
}

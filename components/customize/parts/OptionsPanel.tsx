import { useRef } from 'react';
import { Check, Layers, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Language } from '@/contexts/LanguageContext';
import { formatWon } from '@/lib/customize/priceCalculator';
import type {
  CustomizeCatalog,
  CustomizeCategory,
  CustomizeOption,
  EstimateBreakdown,
  SelectedOptions,
} from '@/lib/customize/types';
import { pickText } from '@/lib/customize/i18n';
import { STEPS, type ConfigStep, type CustomizeUiCopy } from '../lib/constants';
import { CategoryHeading } from './CategoryHeading';
import { OptionCard } from './OptionCard';
import { InlineStepFooter } from './InlineStepFooter';
import { RailSummaryFooter } from './RailSummaryFooter';

export function OptionsPanel({
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
  copy,
  language,
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
  copy: CustomizeUiCopy;
  language: Language;
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
          <CategoryHeading title={copy.panelModelHeading} status="" icon={<Layers className="h-4 w-4" />} />
          <p className="mb-3 mt-1 text-xs leading-5 text-weet-sub">{copy.panelModelHelp}</p>
          <div className="grid gap-2">
            {catalog.models.map((model) => (
              <button
                key={model.id}
                type="button"
                onClick={() => onModelChange(model.id)}
                className={cn(
                  'rounded-lg border p-3 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-weet-gold-deep',
                  model.id === modelId
                    ? 'border-weet-ink bg-weet-paper-alt shadow-weet-card'
                    : 'border-weet-line-2 bg-weet-surface hover:border-weet-muted'
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-black text-weet-ink">{pickText(model.nameKo, model.nameEn, language)}</p>
                      <span className="rounded-full bg-weet-paper-alt px-2 py-0.5 text-[10px] font-bold text-weet-gold-deep">
                        {model.id === 'compact-3x6' ? copy.modelTagWeekend : copy.modelTagPremium}
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs text-weet-sub">{model.widthM}m x {model.lengthM}m · {model.areaSqm}m²</p>
                  </div>
                  {model.id === modelId && <Check className="h-4 w-4 shrink-0 text-weet-ink" />}
                </div>
                <p className="mt-2 text-sm font-bold text-weet-gold-deep">
                  <span className="mr-1.5 text-[11px] font-semibold text-weet-muted">{copy.basePrice}</span>
                  {formatWon(model.basePrice)}
                </p>
              </button>
            ))}
          </div>
        </section>
      )}

      {(currentStep === 'included' || currentStep === 'mood' || currentStep === 'smart') && (
        <>
          {currentStep === 'included' && (
            <div className="mb-5 rounded-lg bg-weet-paper-alt/60 p-3">
              <div className="mb-1.5 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-weet-forest" />
                <p className="text-sm font-bold text-weet-ink">{copy.includedTitle}</p>
              </div>
              <p className="text-xs leading-relaxed text-weet-sub">
                {copy.includedBody}
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
                    <CategoryHeading title={pickText(category.nameKo, category.nameEn, language)} status="" icon={<Layers className="h-4 w-4" />} />
                    <div className="mt-2 flex items-center justify-center rounded-lg border border-dashed border-weet-line-2 bg-weet-surface py-6">
                      <p className="text-sm text-weet-muted">{copy.noOptionsAvailable}</p>
                    </div>
                  </section>
                );
              }

              const categorySelected = options.filter((option) => selectedOptions[category.id]?.includes(option.id));
              const amount = categorySelected.reduce((sum, option) => sum + (option.priceType === 'fixed' ? option.price : 0), 0);
              const consultSelected = categorySelected.filter((option) => option.priceType === 'consult').length;
              const categoryStatus =
                amount > 0
                  ? copy.catCountWithPrice(categorySelected.length, formatWon(amount))
                  : consultSelected > 0
                    ? copy.catConsultCount(consultSelected)
                    : categorySelected.length > 0
                      ? copy.catIncluded
                      : copy.catNone;
              const sortedOptions = [...options].sort((a, b) => {
                if (a.priceType === 'included' && b.priceType !== 'included') return -1;
                if (a.priceType !== 'included' && b.priceType === 'included') return 1;
                if (a.isDefault && !b.isDefault) return -1;
                if (!a.isDefault && b.isDefault) return 1;
                return 0;
              });

              return (
                <section key={category.id} className="mb-6 scroll-mt-20">
                  <CategoryHeading title={pickText(category.nameKo, category.nameEn, language)} status={categoryStatus} icon={<Layers className="h-4 w-4" />} />
                  {category.descriptionKo && <p className="mt-1 text-xs leading-5 text-weet-sub">{pickText(category.descriptionKo, category.descriptionEn, language)}</p>}
                  <div className="mt-2 grid grid-cols-2 gap-1.5">
                    {sortedOptions.map((option) => (
                      <OptionCard
                        key={option.id}
                        option={option}
                        selected={selectedOptions[category.id]?.includes(option.id) ?? false}
                        onToggle={() => onOptionToggle(category, option)}
                        onInfo={() => onInfo(option)}
                        copy={copy}
                        language={language}
                      />
                    ))}
                  </div>
                </section>
              );
            })}
        </>
      )}

      {inline && <InlineStepFooter stepIndex={stepIndex} goToStep={goToStep} copy={copy} />}
    </>
  );

  if (inline) {
    return (
      <div ref={scrollRef} className="scroll-mt-[150px] md:scroll-mt-[162px]">
        <div className="mx-auto w-full max-w-xl px-4 pb-[calc(7rem+env(safe-area-inset-bottom))] pt-5 md:px-6">
          {stepBody}
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100dvh-136px)] flex-col overflow-hidden">
      <div className="border-b border-customize-stone bg-customize-sand px-5 py-3.5">
        <div className="flex items-center justify-between">
          <h2 className="text-[17px] font-extrabold text-customize-ink">{copy.panelRailTitle}</h2>
          <span className="text-xs font-bold text-customize-ink/70">{copy.panelRailStepCount(stepIndex + 1, STEPS.length)}</span>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-5">
        {stepBody}
      </div>

      <RailSummaryFooter estimate={estimate} stepIndex={stepIndex} goToStep={goToStep} copy={copy} />
    </div>
  );
}

import { useEffect, useRef } from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { STEPS, type ConfigStep, type CustomizeUiCopy } from '../lib/constants';
import { scrollBehavior, stepStatusText } from '../lib/helpers';

export function StepperBar({
  currentStep,
  furthestStepIndex,
  setCurrentStep,
  stepCounts,
  copy,
}: {
  currentStep: ConfigStep;
  furthestStepIndex: number;
  setCurrentStep: (step: ConfigStep) => void;
  stepCounts: Record<ConfigStep, number>;
  copy: CustomizeUiCopy;
}) {
  const stepIndex = STEPS.findIndex((s) => s.id === currentStep);
  const activeButtonRef = useRef<HTMLButtonElement | null>(null);
  // 390px에서 스테퍼가 가로로 넘칠 때 현재 단계 버튼이 항상 보이게 한다(보이면 no-op).
  useEffect(() => {
    activeButtonRef.current?.scrollIntoView({ behavior: scrollBehavior(), inline: 'nearest', block: 'nearest' });
  }, [currentStep]);

  return (
    <div className="sticky top-14 z-30 border-b border-weet-line bg-weet-surface/95 backdrop-blur md:top-16 lg:h-[72px]">
      <div className="mx-auto max-w-[1800px] px-4 py-2 lg:flex lg:h-full lg:items-center lg:px-10 lg:py-0">
        <p className="mb-1.5 text-[11px] font-bold text-weet-muted lg:hidden">
          {stepIndex + 1}/{STEPS.length} {copy.stepperStepWord} · {copy.stepLabels[STEPS[stepIndex].id]}
        </p>
        <ol className="flex w-full items-stretch gap-1 overflow-x-auto pb-0.5 lg:gap-2 lg:overflow-visible" aria-label={copy.stepperProgressAria}>
          {STEPS.map((step, index) => {
            const isCurrent = currentStep === step.id;
            const isComplete = !isCurrent && index < furthestStepIndex;
            const state = isCurrent ? 'current' : isComplete ? 'complete' : 'upcoming';

            return (
              <li key={step.id} className="flex min-w-0 shrink-0 items-center gap-1 lg:flex-1 lg:gap-2">
                <button
                  type="button"
                  ref={isCurrent ? activeButtonRef : null}
                  data-testid={`customize-step-${step.id}`}
                  aria-current={isCurrent ? 'step' : undefined}
                  aria-label={copy.stepAria(index + 1, copy.stepLabels[step.id], isComplete ? copy.stepStateComplete : isCurrent ? copy.stepStateCurrent : copy.stepStateUpcoming)}
                  data-state={state}
                  onClick={() => setCurrentStep(step.id)}
                  className={cn(
                    'flex min-h-10 w-full items-center justify-center gap-1.5 rounded-md border px-2 py-1.5 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-weet-gold-deep lg:justify-start lg:px-3',
                    isCurrent && 'border-weet-ink bg-weet-ink text-weet-paper',
                    isComplete && 'border-weet-line-2 bg-weet-paper-alt text-weet-sub hover:border-weet-muted',
                    state === 'upcoming' && 'border-weet-line bg-weet-surface text-weet-muted hover:border-weet-muted hover:text-weet-ink'
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px] font-black',
                      isCurrent && 'border-weet-surface/60 bg-weet-surface text-weet-ink',
                      isComplete && 'border-weet-forest bg-weet-forest text-white',
                      state === 'upcoming' && 'border-weet-line-2 bg-transparent text-weet-muted'
                    )}
                  >
                    {isComplete ? <Check className="h-3 w-3" /> : index + 1}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-xs font-bold">{copy.stepLabels[step.id]}</span>
                    <span
                      className={cn(
                        'hidden truncate text-[10px] font-semibold lg:block',
                        isCurrent ? 'text-weet-line' : 'text-weet-muted'
                      )}
                    >
                      {stepStatusText(step.id, stepCounts[step.id], copy)}
                    </span>
                  </span>
                </button>
                {index < STEPS.length - 1 && (
                  <span aria-hidden="true" className="hidden h-px w-3 shrink-0 bg-weet-line-2 lg:block" />
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

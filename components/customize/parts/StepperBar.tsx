import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { STEPS, type ConfigStep } from '../lib/constants';
import { stepStatusText } from '../lib/helpers';

export function StepperBar({
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
    <div className="sticky top-14 z-30 border-b border-customize-stone bg-customize-sand/95 backdrop-blur md:top-16 lg:h-[72px]">
      <div className="mx-auto max-w-[1800px] px-4 py-2 lg:flex lg:h-full lg:items-center lg:px-10 lg:py-0">
        <p className="mb-1.5 text-[11px] font-bold text-customize-slate lg:hidden">
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
                    'flex min-h-10 w-full items-center justify-center gap-1.5 rounded-md border px-2 py-1.5 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-customize-bark lg:justify-start lg:px-3',
                    isCurrent && 'border-customize-ink bg-customize-ink text-customize-sand',
                    isComplete && 'border-customize-clay bg-customize-dune text-customize-espresso hover:border-customize-mushroom',
                    state === 'upcoming' && 'border-customize-shell bg-customize-sand text-customize-slate hover:border-customize-mushroom hover:text-customize-ink'
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px] font-black',
                      isCurrent && 'border-customize-sand/60 bg-customize-sand text-customize-ink',
                      isComplete && 'border-customize-teal bg-customize-teal text-white',
                      state === 'upcoming' && 'border-customize-clay bg-transparent text-customize-slate'
                    )}
                  >
                    {isComplete ? <Check className="h-3 w-3" /> : index + 1}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-xs font-bold">{step.label}</span>
                    <span
                      className={cn(
                        'hidden truncate text-[10px] font-semibold lg:block',
                        isCurrent ? 'text-customize-stone' : 'text-customize-mist'
                      )}
                    >
                      {stepStatusText(step.id, stepCounts[step.id])}
                    </span>
                  </span>
                </button>
                {index < STEPS.length - 1 && (
                  <span aria-hidden="true" className="hidden h-px w-3 shrink-0 bg-customize-clay lg:block" />
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

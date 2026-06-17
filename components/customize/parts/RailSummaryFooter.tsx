import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatWon } from '@/lib/customize/priceCalculator';
import type { EstimateBreakdown } from '@/lib/customize/types';
import { COPY, STEPS, type ConfigStep } from '../lib/constants';
import { nextStepCta } from '../lib/helpers';

// 데스크톱 우측 레일 하단 고정 요약: 가격 분해 + 단계 이동 CTA.
export function RailSummaryFooter({
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
    <div className="border-t border-customize-stone bg-customize-sand px-5 pb-4 pt-3">
      {estimate && (
        <dl className="mb-3 space-y-1 text-xs">
          <div className="flex items-center justify-between gap-3">
            <dt className="font-semibold text-customize-driftwood">{COPY.basePrice}</dt>
            <dd className="font-bold text-customize-ink">{formatWon(estimate.model.basePrice)}</dd>
          </div>
          <div className="flex items-center justify-between gap-3">
            <dt className="font-semibold text-customize-driftwood">{COPY.optionSubtotal}</dt>
            <dd className="font-bold text-customize-ink">{estimate.optionTotal > 0 ? `+${formatWon(estimate.optionTotal)}` : formatWon(0)}</dd>
          </div>
          <div className="flex items-center justify-between gap-3 border-t border-customize-shell pt-1.5">
            <dt className="text-sm font-black text-customize-ink">{COPY.estimatedAmount}</dt>
            <dd className="text-base font-black text-customize-ink" data-testid="desktop-estimated-total">
              {formatWon(estimate.estimatedTotal)}
            </dd>
          </div>
          {estimate.consultOptionCount > 0 && (
            <div className="flex items-center justify-between gap-3">
              <dt className="font-semibold text-customize-amber">{COPY.consultNeeded} 항목</dt>
              <dd className="font-bold text-customize-amber">{estimate.consultOptionCount}개 · 견적 별도</dd>
            </div>
          )}
        </dl>
      )}
      <p className="mb-3 text-[11px] leading-relaxed text-customize-slate">
        {COPY.transportNote} ·{' '}
        <a href="/support#cost" target="_blank" rel="noopener noreferrer" className="font-bold text-customize-teal underline-offset-2 hover:underline">
          별도 비용 안내
        </a>
      </p>
      <div className="flex items-center gap-2">
        {prevStep && (
          <Button
            variant="outline"
            data-testid="customize-rail-prev"
            aria-label={`이전 단계: ${prevStep.label}`}
            className="h-11 shrink-0 border-customize-clay bg-customize-sand px-3 text-customize-ink"
            onClick={() => goToStep(prevStep.id)}
          >
            <ArrowLeft className="h-4 w-4" />
            이전
          </Button>
        )}
        {nextStep && (
          <Button
            data-testid="customize-step-next"
            className="h-11 flex-1 bg-customize-ink text-customize-sand hover:bg-customize-ink-dark"
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
          className="mt-2 w-full rounded-md px-2 py-1.5 text-center text-xs font-bold text-customize-teal underline-offset-2 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-customize-bark"
        >
          구성 검토·상담 요청으로 이동
        </button>
      )}
      <p className="mt-2 text-center text-[11px] text-customize-slate">{COPY.notPayment}</p>
    </div>
  );
}

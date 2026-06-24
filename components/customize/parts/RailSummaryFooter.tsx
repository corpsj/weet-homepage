import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatWon } from '@/lib/customize/priceCalculator';
import type { EstimateBreakdown } from '@/lib/customize/types';
import { STEPS, type ConfigStep, type CustomizeUiCopy } from '../lib/constants';
import { nextStepCta } from '../lib/helpers';

// 데스크톱 우측 레일 하단 고정 요약: 가격 분해 + 단계 이동 CTA.
export function RailSummaryFooter({
  estimate,
  stepIndex,
  goToStep,
  copy,
}: {
  estimate: EstimateBreakdown | null;
  stepIndex: number;
  goToStep: (step: ConfigStep) => void;
  copy: CustomizeUiCopy;
}) {
  const prevStep = stepIndex > 0 ? STEPS[stepIndex - 1] : null;
  const nextStep = stepIndex < STEPS.length - 1 ? STEPS[stepIndex + 1] : null;
  const currentStep = STEPS[stepIndex];

  return (
    <div className="border-t border-customize-stone bg-customize-sand px-5 pb-4 pt-3">
      {estimate && (
        <dl className="mb-3 space-y-1 text-xs">
          <div className="flex items-center justify-between gap-3">
            <dt className="font-semibold text-customize-driftwood">{copy.basePrice}</dt>
            <dd className="font-bold text-weet-ink">{formatWon(estimate.model.basePrice)}</dd>
          </div>
          <div className="flex items-center justify-between gap-3">
            <dt className="font-semibold text-customize-driftwood">{copy.optionSubtotal}</dt>
            <dd className="font-bold text-weet-ink">{estimate.optionTotal > 0 ? `+${formatWon(estimate.optionTotal)}` : formatWon(0)}</dd>
          </div>
          <div className="flex items-center justify-between gap-3 border-t border-weet-line pt-1.5">
            <dt className="flex items-center gap-1.5 text-sm font-black text-weet-ink">
              <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-full bg-weet-forest" />
              {copy.estimatedAmount}
            </dt>
            <dd className="text-[15px] font-extrabold text-weet-ink" data-testid="desktop-estimated-total" aria-live="polite" aria-atomic="true">
              {formatWon(estimate.estimatedTotal)}
            </dd>
          </div>
          {estimate.consultOptionCount > 0 && (
            <div className="flex items-center justify-between gap-3">
              <dt className="flex items-center gap-1.5 font-semibold text-weet-gold-deep">
                <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-full bg-weet-gold" />
                {copy.consultItemsLabel}
              </dt>
              <dd className="font-bold text-weet-gold-deep">{copy.quoteConsultItems(estimate.consultOptionCount)}</dd>
            </div>
          )}
        </dl>
      )}
      <p className="mb-3 text-[11px] leading-relaxed text-weet-muted">
        {copy.transportNote} ·{' '}
        <a href="/support#cost" target="_blank" rel="noopener noreferrer" className="font-bold text-weet-forest underline-offset-2 hover:underline">
          {copy.costInfoLink}
        </a>
      </p>
      <div className="flex items-center gap-2">
        {prevStep && (
          <Button
            variant="outline"
            data-testid="customize-rail-prev"
            aria-label={copy.prevAria(copy.stepLabels[prevStep.id])}
            className="h-11 shrink-0 border-weet-line-2 bg-weet-surface px-3 text-weet-ink"
            onClick={() => goToStep(prevStep.id)}
          >
            <ArrowLeft className="h-4 w-4" />
            {copy.prevWord}
          </Button>
        )}
        {nextStep && (
          <Button
            data-testid="customize-step-next"
            className="h-11 flex-1 bg-weet-ink text-weet-paper hover:bg-weet-ink-deep"
            onClick={() => goToStep(nextStep.id)}
          >
            {nextStepCta(currentStep.id, copy)}
            <ArrowRight className="h-4 w-4" />
          </Button>
        )}
      </div>
      {nextStep && nextStep.id !== 'review' && (
        <button
          type="button"
          data-testid="customize-rail-skip-to-review"
          onClick={() => goToStep('review')}
          className="mt-2 w-full rounded-md px-2 py-1.5 text-center text-xs font-bold text-weet-forest underline-offset-2 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-weet-gold-deep"
        >
          {copy.skipToReview}
        </button>
      )}
      <p className="mt-2 text-center text-[11px] text-weet-muted">{copy.notPayment}</p>
    </div>
  );
}

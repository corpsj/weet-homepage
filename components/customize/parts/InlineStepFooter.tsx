import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { COPY, STEPS, type ConfigStep } from '../lib/constants';

// 모바일 인라인 패널 하단: '다음'은 하단 고정 바가 담당하므로 이전 이동과 검토 바로가기만 둔다.
export function InlineStepFooter({ stepIndex, goToStep }: { stepIndex: number; goToStep: (step: ConfigStep) => void }) {
  const prevStep = stepIndex > 0 ? STEPS[stepIndex - 1] : null;

  return (
    <div className="mt-4 border-t border-weet-line pt-3">
      <div className="flex items-center justify-between gap-2">
        {prevStep ? (
          <Button
            variant="outline"
            data-testid="customize-step-prev"
            className="h-11 border-weet-line-2 bg-weet-surface px-4 text-weet-ink"
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
          className="rounded-md px-2 py-2 text-xs font-bold text-weet-forest underline-offset-2 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-weet-gold-deep"
        >
          구성 검토·상담 요청으로 이동
        </button>
      </div>
      <p className="mt-2 text-[11px] leading-relaxed text-weet-muted">
        {COPY.notPayment} 운반/설치 및 현장 조건에 따라 최종 견적이 달라질 수 있습니다.
      </p>
    </div>
  );
}

import { cn } from '@/lib/utils';
import { formatModelStartPrice, formatWon } from '@/lib/customize/priceCalculator';
import type { CustomizeOption, EstimateBreakdown } from '@/lib/customize/types';
import { COPY } from '../lib/constants';
import { optionPriceDisplay } from '../lib/helpers';

// 데스크톱 도면 아래 상시 구성 요약: 모델·선택 옵션·금액을 주문서처럼 한눈에 보여준다.
export function ConfigSummaryBoard({ estimate, selectedOptions }: { estimate: EstimateBreakdown; selectedOptions: CustomizeOption[] }) {
  const decisionOptions = selectedOptions.filter((option) => option.priceType !== 'included');

  return (
    <div className="hidden w-full max-w-[1100px] lg:block" data-testid="config-summary-board">
      <div className="rounded-lg border border-weet-line bg-weet-surface shadow-weet-card">
        <div className="grid grid-cols-[0.9fr_1.5fr_0.9fr] divide-x divide-weet-line">
          <div className="p-4">
            <p className="text-[11px] font-bold text-weet-muted">선택 모델</p>
            <p className="mt-1 text-sm font-black text-weet-ink">{estimate.model.nameKo}</p>
            <p className="text-xs text-weet-sub">
              {estimate.model.widthM}m × {estimate.model.lengthM}m · {estimate.model.areaSqm}m²
            </p>
            <p className="mt-1.5 text-xs font-bold text-weet-gold-deep">
              {COPY.basePrice} {formatModelStartPrice(estimate.model.basePrice)}
            </p>
          </div>
          <div className="min-w-0 p-4">
            <p className="text-[11px] font-bold text-weet-muted">선택 옵션</p>
            {decisionOptions.length > 0 ? (
              <ul className="mt-1.5 flex flex-wrap gap-1.5">
                {decisionOptions.map((option) => (
                  <li
                    key={option.id}
                    className={cn(
                      'inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-bold',
                      option.priceType === 'consult'
                        ? 'border-weet-gold/40 bg-weet-gold/10 text-weet-gold-deep'
                        : 'border-weet-line bg-weet-paper text-weet-sub'
                    )}
                  >
                    {option.nameKo}
                    <span className="font-semibold text-weet-muted">{optionPriceDisplay(option)}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-1.5 text-xs text-weet-muted">추가 선택 옵션 없음 · 기본 구성</p>
            )}
          </div>
          <div className="p-4">
            <p className="text-[11px] font-bold text-weet-muted">{COPY.estimatedAmount}</p>
            <p className="mt-1 text-lg font-black text-weet-ink" data-testid="summary-estimated-total" aria-live="polite" aria-atomic="true">
              {formatWon(estimate.estimatedTotal)}
            </p>
            {estimate.consultOptionCount > 0 && (
              <p className="text-xs font-bold text-weet-gold-deep">+ {COPY.consultNeeded} {estimate.consultOptionCount}개 · 견적 별도</p>
            )}
            <p className="mt-1.5 text-[11px] text-weet-muted">{COPY.transportNote}</p>
          </div>
        </div>
        <p className="border-t border-weet-line px-4 py-2 text-[11px] text-weet-muted">
          상담 요청용 예상 금액입니다. 결제 단계가 아니며, 운반/설치 및 현장 조건에 따라 최종 견적이 달라질 수 있습니다.
        </p>
      </div>
    </div>
  );
}

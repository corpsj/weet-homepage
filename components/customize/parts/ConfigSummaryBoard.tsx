import { cn } from '@/lib/utils';
import { formatModelStartPrice } from '@/lib/customize/priceCalculator';
import type { Language } from '@/contexts/LanguageContext';
import type { CustomizeOption, EstimateBreakdown } from '@/lib/customize/types';
import { pickText } from '@/lib/customize/i18n';
import type { CustomizeUiCopy } from '../lib/constants';
import { optionPriceDisplay } from '../lib/helpers';
import { AnimatedPrice } from './AnimatedPrice';

// 데스크톱 도면 아래 상시 구성 요약: 모델·선택 옵션·금액을 주문서처럼 한눈에 보여준다.
export function ConfigSummaryBoard({ estimate, selectedOptions, copy, language }: { estimate: EstimateBreakdown; selectedOptions: CustomizeOption[]; copy: CustomizeUiCopy; language: Language }) {
  const decisionOptions = selectedOptions.filter((option) => option.priceType !== 'included');

  return (
    <div className="hidden w-full max-w-[1100px] lg:block" data-testid="config-summary-board">
      <div className="rounded-lg border border-weet-line bg-weet-surface shadow-weet-card">
        <div className="grid grid-cols-[0.9fr_1.5fr_0.9fr] divide-x divide-weet-line">
          <div className="p-4">
            <p className="text-[11px] font-bold text-weet-muted">{copy.selectedModel}</p>
            <p className="mt-1 text-sm font-black text-weet-ink">{pickText(estimate.model.nameKo, estimate.model.nameEn, language)}</p>
            <p className="text-xs text-weet-sub">
              {estimate.model.widthM}m × {estimate.model.lengthM}m · {estimate.model.areaSqm}m²
            </p>
            <p className="mt-1.5 text-xs font-bold text-weet-gold-deep">
              {copy.basePrice} {formatModelStartPrice(estimate.model.basePrice)}
            </p>
          </div>
          <div className="min-w-0 p-4">
            <p className="text-[11px] font-bold text-weet-muted">{copy.selectedOptions}</p>
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
                    {pickText(option.nameKo, option.nameEn, language)}
                    <span className="font-semibold text-weet-muted">{optionPriceDisplay(option, copy)}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-1.5 text-xs text-weet-muted">{copy.noExtraOptions}</p>
            )}
          </div>
          <div className="p-4">
            <p className="text-[11px] font-bold text-weet-muted">{copy.estimatedAmount}</p>
            <p className="mt-1 text-lg font-black text-weet-ink" aria-live="polite" aria-atomic="true">
              <AnimatedPrice value={estimate.estimatedTotal} testId="summary-estimated-total" />
            </p>
            {estimate.consultOptionCount > 0 && (
              <p className="text-xs font-bold text-weet-gold-deep">{copy.consultSeparate(estimate.consultOptionCount)}</p>
            )}
            <p className="mt-1.5 text-[11px] text-weet-muted">{copy.transportNote}</p>
          </div>
        </div>
        <p className="border-t border-weet-line px-4 py-2 text-[11px] text-weet-muted">
          {copy.summaryDisclaimer}
        </p>
      </div>
    </div>
  );
}

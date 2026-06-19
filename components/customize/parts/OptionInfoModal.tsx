import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import type { CustomizeOption } from '@/lib/customize/types';
import { FALLBACK_CATALOG } from '../lib/constants';
import { optionPriceDisplay } from '../lib/helpers';
import { useModalDismiss } from '../lib/hooks';

// 시안 infoColor: 가격은 priceType별 단일 색 텍스트 한 줄로 노출.
const PRICE_TONE: Record<CustomizeOption['priceType'], string> = {
  consult: 'text-[#a16207]',
  fixed: 'text-[#18181b]',
  included: 'text-[#9ca3af]',
};

// 시안(B안) 옵션 상세 모달: 이름 · 가격 · 설명 + 스펙 칩(최대 3개). 사진 없음.
export function OptionInfoModal({ option, onClose }: { option: CustomizeOption; onClose: () => void }) {
  useModalDismiss(onClose);
  const optionKey = option.key || option.id;
  const fallback = FALLBACK_CATALOG[optionKey] || FALLBACK_CATALOG[option.id];
  const titleId = `option-info-title-${optionKey}`;

  const desc = option.detailDescriptionKo || option.shortDescriptionKo || fallback?.desc || '상세 정보가 준비 중입니다.';
  const specs = (fallback?.specs || []).slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-customize-ink/35 p-4" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="w-full max-w-md rounded-lg border border-customize-taupe bg-customize-sand p-5 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-3 flex items-start justify-between gap-4">
          <div>
            <p className={cn('mb-1.5 text-[13px] font-extrabold', PRICE_TONE[option.priceType])}>
              {optionPriceDisplay(option)}
            </p>
            <h3 id={titleId} className="text-xl font-black text-customize-ink">{option.nameKo}</h3>
          </div>
          <Button variant="ghost" size="icon-sm" onClick={onClose} aria-label="닫기">
            <X className="h-4 w-4" />
          </Button>
        </div>

        {specs.length > 0 && (
          <div className="mb-3.5 flex flex-wrap gap-2">
            {specs.map((spec) => (
              <span
                key={spec}
                className="inline-flex items-center gap-1.5 rounded-full border border-customize-shell bg-customize-linen px-3 py-1 text-xs font-semibold text-customize-umber"
              >
                <span aria-hidden="true" className="text-weet-forest">•</span>
                {spec}
              </span>
            ))}
          </div>
        )}

        <p className="whitespace-pre-wrap text-sm leading-7 text-customize-umber">{desc}</p>
      </div>
    </div>
  );
}

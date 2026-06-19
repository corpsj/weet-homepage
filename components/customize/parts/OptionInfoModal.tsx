import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { CustomizeOption } from '@/lib/customize/types';
import { COPY, FALLBACK_CATALOG } from '../lib/constants';
import { optionPriceDisplay } from '../lib/helpers';
import { useModalDismiss } from '../lib/hooks';

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
            <div className="mb-1.5 flex items-center gap-2">
              {option.priceType === 'included' && (
                <span className="rounded bg-customize-dune px-2 py-0.5 text-[11px] font-black text-[#9ca3af]">기본 포함</span>
              )}
              {option.priceType === 'consult' && (
                <span className="rounded bg-[#a16207]/10 px-2 py-0.5 text-[11px] font-black text-[#a16207]">{COPY.consultNeeded}</span>
              )}
              {option.priceType === 'fixed' && (
                <p className="text-sm font-extrabold text-[#18181b]">{optionPriceDisplay(option)}</p>
              )}
            </div>
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

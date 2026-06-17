import Image from 'next/image';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { CustomizeOption } from '@/lib/customize/types';
import { COPY, FALLBACK_CATALOG, OPTION_IMAGE_VERSION } from '../lib/constants';
import { optionPriceDisplay } from '../lib/helpers';
import { useModalDismiss } from '../lib/hooks';

export function OptionInfoModal({ option, onClose }: { option: CustomizeOption; onClose: () => void }) {
  useModalDismiss(onClose);
  const optionKey = option.key || option.id;
  const fallback = FALLBACK_CATALOG[optionKey] || FALLBACK_CATALOG[option.id];
  const titleId = `option-info-title-${optionKey}`;

  const imagePath = `/images/customize/options/${optionKey}.webp?v=${OPTION_IMAGE_VERSION}`;
  const desc = option.detailDescriptionKo || option.shortDescriptionKo || fallback?.desc || '상세 정보가 준비 중입니다.';
  const specs = fallback?.specs || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-customize-shade/35 p-4" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="w-full max-w-xl rounded-lg bg-customize-sand p-5 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <div className="mb-1 flex items-center gap-2">
              {option.priceType === 'included' && <span className="rounded bg-customize-dune px-2 py-0.5 text-[11px] font-black text-customize-slate">기본 포함</span>}
              {option.priceType === 'consult' && <span className="rounded bg-customize-linen px-2 py-0.5 text-[11px] font-black text-customize-amber">{COPY.consultNeeded}</span>}
              {option.priceType === 'fixed' && <p className="text-xs font-bold text-customize-slate">{optionPriceDisplay(option)}</p>}
            </div>
            <h3 id={titleId} className="text-xl font-black text-customize-ink">{option.nameKo}</h3>
          </div>
          <Button variant="ghost" size="icon-sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="relative mb-4 aspect-[16/9] overflow-hidden rounded-lg bg-customize-bisque">
          <Image
            src={imagePath}
            alt={option.nameKo}
            fill
            unoptimized
            sizes="(max-width: 768px) calc(100vw - 48px), 560px"
            className="object-cover"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
        </div>
        {specs.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-2">
            {specs.map(spec => (
              <span key={spec} className="rounded-full border border-customize-stone bg-customize-oat px-3 py-1 text-xs font-bold text-customize-umber">
                {spec}
              </span>
            ))}
          </div>
        )}
        <p className="whitespace-pre-wrap text-sm leading-7 text-customize-cocoa">
          {desc}
        </p>
      </div>
    </div>
  );
}

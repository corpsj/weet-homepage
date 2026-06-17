import Image from 'next/image';
import { Check, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { CustomizeOption } from '@/lib/customize/types';
import { COPY, OPTION_IMAGE_VERSION, SWATCH_CATEGORY_KEYS } from '../lib/constants';
import { hasOptionInfo, optionPriceDisplay } from '../lib/helpers';

export function OptionCard({
  option,
  selected,
  onToggle,
  onInfo,
}: {
  option: CustomizeOption;
  selected: boolean;
  onToggle: () => void;
  onInfo: () => void;
}) {
  return (
    <div
      className={cn(
        'group relative rounded-lg border bg-customize-sand transition-all hover:shadow-sm',
        selected ? 'border-customize-ink shadow-sm ring-1 ring-customize-ink' : 'border-customize-taupe hover:border-customize-mushroom'
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex min-h-[44px] w-full items-center gap-2.5 rounded-lg px-2.5 py-2 pr-9 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-customize-bark"
        aria-pressed={selected}
      >
        <span
          className={cn(
            'flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-colors',
            selected ? 'border-customize-teal bg-customize-teal text-white' : 'border-customize-ash bg-customize-sand group-hover:border-customize-slate'
          )}
        >
          {selected && <Check className="h-3 w-3" />}
        </span>
        {SWATCH_CATEGORY_KEYS.has(option.categoryKey) && (
          <span aria-hidden="true" className="relative h-9 w-9 shrink-0 overflow-hidden rounded-md border border-customize-shell bg-customize-dune">
            <Image
              src={`/images/customize/options/${option.key || option.id}.webp?v=${OPTION_IMAGE_VERSION}`}
              alt=""
              fill
              unoptimized
              sizes="36px"
              className="object-cover"
              onError={(event) => { event.currentTarget.style.display = 'none'; }}
            />
          </span>
        )}
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <span className="truncate text-sm font-bold text-customize-ink">{option.nameKo}</span>
            <div className="flex shrink-0 items-center gap-2">
              {option.priceType === 'included' ? (
                <span className="rounded bg-customize-dune/50 px-1.5 py-0.5 text-[10px] font-black text-customize-slate">
                  기본 포함
                </span>
              ) : option.priceType === 'consult' ? (
                <span className="rounded bg-customize-linen px-1.5 py-0.5 text-[10px] font-black text-customize-amber">{COPY.consultNeeded}</span>
              ) : (
                <span className="text-xs font-bold text-customize-bronze-dark">
                  {optionPriceDisplay(option)}
                </span>
              )}
            </div>
          </div>
          {option.shortDescriptionKo && (
            <span className="mt-0.5 block truncate text-[11px] text-customize-slate">{option.shortDescriptionKo}</span>
          )}
        </div>
      </button>
      {hasOptionInfo(option) && (
        <button
          type="button"
          data-testid={`option-info-${option.key || option.id}`}
          onClick={(event) => {
            event.stopPropagation();
            onInfo();
          }}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-customize-slate opacity-100 transition-opacity hover:text-customize-ink focus:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-customize-bark md:opacity-0 md:group-hover:opacity-100"
          aria-label="옵션 상세 보기"
        >
          <Info className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

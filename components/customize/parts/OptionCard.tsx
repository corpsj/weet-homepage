import { Check, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { CustomizeOption } from '@/lib/customize/types';
import { OPTION_SWATCH, SWATCH_CATEGORY_KEYS } from '../lib/constants';
import { hasOptionInfo, optionPriceDisplay } from '../lib/helpers';

// 시안(B안) 가격색: 상담필요 #a16207 / 유료 #18181b / 기본포함 #9ca3af.
const PRICE_TONE: Record<CustomizeOption['priceType'], string> = {
  consult: 'text-[#a16207]',
  fixed: 'text-[#18181b]',
  included: 'text-[#9ca3af]',
};

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
  const optionKey = option.key || option.id;
  const swatch = SWATCH_CATEGORY_KEYS.has(option.categoryKey)
    ? OPTION_SWATCH[optionKey] ?? OPTION_SWATCH[option.id]
    : undefined;
  const showInfo = hasOptionInfo(option);

  return (
    // 시안 .wt-opt: 2열 컴팩트 카드. border #ded5c8 / hover #b9aa94 / 선택 #2f3432 + box-shadow 0 0 0 1px.
    <div
      className={cn(
        'group relative flex min-h-[44px] items-center gap-2 rounded-lg border bg-customize-sand transition-[border-color,box-shadow]',
        selected
          ? 'border-customize-ink shadow-[0_0_0_1px_#2f3432]'
          : 'border-customize-taupe hover:border-customize-mushroom'
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-pressed={selected}
        className={cn(
          'flex flex-1 items-center gap-2 rounded-lg py-2 pl-2.5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-weet-gold-deep',
          showInfo ? 'pr-1' : 'pr-2.5'
        )}
      >
        {/* 라디오 16px: 선택 시 border/bg = forest(--acc) #2E4A3F */}
        <span
          className={cn(
            'flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-colors',
            selected ? 'border-weet-forest bg-weet-forest text-white' : 'border-customize-ash bg-customize-sand'
          )}
        >
          {selected && <Check className="h-2.5 w-2.5" strokeWidth={3} />}
        </span>

        {/* 색상 스와치 22px (mood 카테고리만) */}
        {swatch && (
          <span
            aria-hidden="true"
            className="h-[22px] w-[22px] shrink-0 rounded-[5px] border border-customize-shell"
            style={{ backgroundColor: swatch }}
          />
        )}

        {/* 이름 13px/700 + 가격 11px/800 */}
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[13px] font-bold leading-tight text-customize-ink">{option.nameKo}</span>
          <span className={cn('mt-0.5 block text-[11px] font-extrabold leading-tight', PRICE_TONE[option.priceType])}>
            {optionPriceDisplay(option)}
          </span>
        </span>
      </button>

      {/* ⓘ 인포 22px: 카드 본문 클릭(=토글)과 분리 */}
      {showInfo && (
        <button
          type="button"
          data-testid={`option-info-${optionKey}`}
          onClick={(event) => {
            event.stopPropagation();
            onInfo();
          }}
          aria-label="옵션 상세 보기"
          className="mr-1.5 flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-md text-customize-slate transition-colors hover:bg-customize-dune hover:text-customize-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-weet-gold-deep"
        >
          <Info className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}

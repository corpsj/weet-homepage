import Image from 'next/image';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import type { CustomizeOption } from '@/lib/customize/types';
import {
  FALLBACK_CATALOG,
  OPTION_DETAIL_GUIDE,
  OPTION_IMAGE_VERSION,
} from '../lib/constants';
import { optionPriceDisplay } from '../lib/helpers';
import { useModalDismiss } from '../lib/hooks';

// 시안 infoColor: 가격은 priceType별 단일 색 텍스트 한 줄로 노출.
const PRICE_TONE: Record<CustomizeOption['priceType'], string> = {
  consult: 'text-[#a16207]',
  fixed: 'text-[#18181b]',
  included: 'text-[#9ca3af]',
};

function normalizeOptionImage(option: CustomizeOption, optionKey: string, hasFallback: boolean) {
  if (hasFallback) return `/images/customize/options/${optionKey}.webp?v=${OPTION_IMAGE_VERSION}`;
  if (!option.imagePath) return null;
  return option.imagePath.startsWith('/') ? option.imagePath : `/${option.imagePath}`;
}

function paragraphsFor(option: CustomizeOption, fallbackDesc: string | undefined, guide: { bestFor: string; confirm: string } | undefined) {
  const primary = fallbackDesc || option.detailDescriptionKo || option.shortDescriptionKo || '상세 정보가 준비 중입니다.';
  const dbDetail = option.detailDescriptionKo?.trim();
  const paragraphs = [primary];

  if (dbDetail && dbDetail !== primary) {
    paragraphs.push(dbDetail);
  }

  if (guide) {
    paragraphs.push(guide.bestFor, guide.confirm);
  }

  return paragraphs;
}

export function OptionInfoModal({ option, onClose }: { option: CustomizeOption; onClose: () => void }) {
  useModalDismiss(onClose);
  const optionKey = option.key || option.id;
  const fallback = FALLBACK_CATALOG[optionKey] || FALLBACK_CATALOG[option.id];
  const guide = OPTION_DETAIL_GUIDE[optionKey] || OPTION_DETAIL_GUIDE[option.id];
  const titleId = `option-info-title-${optionKey}`;
  const imageSrc = normalizeOptionImage(option, optionKey, Boolean(fallback));
  const paragraphs = paragraphsFor(option, fallback?.desc, guide);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-customize-ink/35 p-4" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="flex max-h-[min(780px,calc(100dvh-2rem))] w-full max-w-3xl flex-col overflow-hidden rounded-lg border border-customize-taupe bg-customize-sand shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-customize-shell px-5 py-4">
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

        <div className="overflow-y-auto px-5 py-5">
          {imageSrc && (
            <figure className="mb-5">
              <div className="relative aspect-[16/9] overflow-hidden rounded-md border border-customize-shell bg-customize-linen">
                <Image
                  src={imageSrc}
                  alt={guide?.imageAlt || `${option.nameKo} 상세 설명 이미지`}
                  fill
                  sizes="(max-width: 768px) calc(100vw - 2rem), 704px"
                  className="object-cover"
                  data-testid="option-info-image"
                  unoptimized
                />
              </div>
              <figcaption className="mt-2 text-[12px] font-medium leading-5 text-customize-umber/80">
                실제 선택 시 확인해야 하는 재료감, 설치 위치, 주변 설비 관계를 보여주는 참고 이미지입니다.
              </figcaption>
            </figure>
          )}

          <div className="space-y-4 text-sm leading-7 text-customize-umber">
            {paragraphs.map((paragraph) => (
              <p key={paragraph} className="whitespace-pre-wrap">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-5 border-t border-customize-shell pt-4">
            <p className="text-[12px] font-extrabold uppercase tracking-[0.12em] text-customize-umber/70">
              상담 메모
            </p>
            <p className="mt-2 text-sm leading-7 text-customize-umber">
              이 이미지는 옵션 이해를 돕기 위한 예시입니다. 최종 사양은 모델 크기, 설치 위치, 현장 조건, 전기·급배수 여건을 확인한 뒤 상담 과정에서 확정됩니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

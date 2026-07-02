import Image from 'next/image';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Language } from '@/contexts/LanguageContext';
import type { CustomizeOption } from '@/lib/customize/types';
import { pickText } from '@/lib/customize/i18n';
import {
  FALLBACK_CATALOG,
  OPTION_DETAIL_GUIDE,
  OPTION_IMAGE_VERSION,
  type CustomizeUiCopy,
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

function paragraphsFor(
  option: CustomizeOption,
  fallbackDesc: string | undefined,
  guide: { bestFor: string; confirm: string } | undefined,
  language: Language,
  copy: CustomizeUiCopy
) {
  // DB 설명(detail/short)은 nameEn처럼 EN 컬럼이 있으므로 언어에 맞춰 고른다.
  const dbDetailText = option.detailDescriptionKo
    ? pickText(option.detailDescriptionKo, option.detailDescriptionEn, language)
    : '';
  const dbShortText = option.shortDescriptionKo
    ? pickText(option.shortDescriptionKo, option.shortDescriptionEn, language)
    : '';
  // FALLBACK_CATALOG.desc/guide는 KO 시드 콘텐츠(EN/ES 컬럼 없음) → 모든 언어에서 KO 폴백.
  const primary = fallbackDesc || dbDetailText || dbShortText || copy.detailPending;
  const dbDetail = dbDetailText.trim();
  const paragraphs = [primary];

  if (dbDetail && dbDetail !== primary) {
    paragraphs.push(dbDetail);
  }

  if (guide) {
    paragraphs.push(guide.bestFor, guide.confirm);
  }

  return paragraphs;
}

export function OptionInfoModal({ option, onClose, copy, language }: { option: CustomizeOption; onClose: () => void; copy: CustomizeUiCopy; language: Language }) {
  useModalDismiss(onClose);
  const optionKey = option.key || option.id;
  const fallback = FALLBACK_CATALOG[optionKey] || FALLBACK_CATALOG[option.id];
  const guide = OPTION_DETAIL_GUIDE[optionKey] || OPTION_DETAIL_GUIDE[option.id];
  const titleId = `option-info-title-${optionKey}`;
  const imageSrc = normalizeOptionImage(option, optionKey, Boolean(fallback));
  const paragraphs = paragraphsFor(option, fallback?.desc, guide, language, copy);
  const optionName = pickText(option.nameKo, option.nameEn, language);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-weet-ink/55 p-4 backdrop-blur-sm" onClick={onClose}>
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
              {optionPriceDisplay(option, copy)}
            </p>
            <h3 id={titleId} className="text-xl font-black text-customize-ink">{optionName}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={copy.closeWord}
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-customize-taupe text-customize-ink transition-colors hover:bg-customize-dune focus:outline-none focus-visible:ring-2 focus-visible:ring-weet-gold-deep"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="overflow-y-auto px-5 py-5">
          {imageSrc && (
            <figure className="mb-5">
              <div className="relative aspect-[16/9] overflow-hidden rounded-md border border-customize-shell bg-customize-linen">
                <Image
                  src={imageSrc}
                  alt={guide?.imageAlt || copy.imageAltSuffix(optionName)}
                  fill
                  sizes="(max-width: 768px) calc(100vw - 2rem), 704px"
                  className="object-cover"
                  data-testid="option-info-image"
                  unoptimized
                />
              </div>
              <figcaption className="mt-2 text-[12px] font-medium leading-5 text-customize-umber/80">
                {copy.figcaption}
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
              {copy.consultMemoTitle}
            </p>
            <p className="mt-2 text-sm leading-7 text-customize-umber">
              {copy.consultMemoBody}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

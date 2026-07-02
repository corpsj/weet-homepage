'use client';

import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import type { Language } from '@/contexts/LanguageContext';
import type { CustomizeCategory, CustomizeOption, SelectedOptions } from '@/lib/customize/types';
import { pickText } from '@/lib/customize/i18n';
import { optionImageSrc } from '../lib/helpers';

// 무드&소재 단계 상단 실사 프리뷰: 선택된 외장/내장/바닥 사진을 보여주고,
// 선택이 바뀌면 이전 사진 위로 새 사진이 크로스페이드된다.
export function MaterialPreviewStrip({
  categories,
  visibleOptions,
  selectedOptions,
  language,
}: {
  categories: CustomizeCategory[];
  visibleOptions: CustomizeOption[];
  selectedOptions: SelectedOptions;
  language: Language;
}) {
  const items = categories
    .map((category) => {
      const selected = visibleOptions.find(
        (option) => option.categoryId === category.id && (selectedOptions[category.id]?.includes(option.id) ?? false)
      );
      if (!selected) return null;
      const src = optionImageSrc(selected);
      if (!src) return null;
      return { category, option: selected, src };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  if (items.length === 0) return null;

  return (
    <div className="mb-5 grid grid-cols-3 gap-1.5" data-testid="material-preview-strip">
      {items.map(({ category, option, src }) => (
        <figure key={category.id} className="min-w-0 overflow-hidden rounded-lg border border-customize-taupe bg-customize-sand">
          <div className="relative aspect-[4/3] overflow-hidden bg-customize-dune">
            <AnimatePresence initial={false}>
              <motion.div
                key={option.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="absolute inset-0"
              >
                <Image
                  src={src}
                  alt={pickText(option.nameKo, option.nameEn, language)}
                  fill
                  sizes="(min-width: 1024px) 140px, 33vw"
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>
          </div>
          <figcaption className="px-2 py-1.5">
            <p className="text-[10px] font-semibold leading-tight text-weet-muted">
              {pickText(category.nameKo, category.nameEn, language)}
            </p>
            <p className="truncate text-[11px] font-bold leading-tight text-customize-ink">
              {pickText(option.nameKo, option.nameEn, language)}
            </p>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

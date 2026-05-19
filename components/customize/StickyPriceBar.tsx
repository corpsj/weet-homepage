'use client';

import { formatPrice, getOptionItemById } from '@/lib/customize/config';
import { useCustomizeStore } from '@/stores/customizeStore';
import PDFDownloadButton from '@/components/customize/PDFDownloadButton';

export function StickyPriceBar() {
  const { selectedModel, totalPrice, selectedOptions } = useCustomizeStore();

  const basePrice = selectedModel?.basePrice ?? 0;
  const optionsPrice = totalPrice - basePrice;
  const isDisabled = !selectedModel;

  const selectedOptionItems = Object.entries(selectedOptions).flatMap(([categoryId, optionIds]) =>
    optionIds.map((optionId) => getOptionItemById(categoryId, optionId)).filter((item): item is NonNullable<typeof item> => item !== null)
  );

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
      <div className="max-w-7xl mx-auto px-3 lg:px-4 py-3 lg:py-4">
        <div className="flex items-center justify-between gap-3 lg:gap-4">
          <div className="flex flex-col gap-0.5 lg:gap-1 flex-1 min-w-0">
            <div className="flex items-center gap-2 text-xs lg:text-sm text-gray-500">
              <span>기본가</span>
              <span className="transition-colors duration-300">
                {formatPrice(basePrice)}원
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs lg:text-sm text-gray-500">
              <span>옵션 추가</span>
              <span className="transition-colors duration-300">
                {optionsPrice > 0 ? `+${formatPrice(optionsPrice)}원` : '0 원'}
              </span>
            </div>
            <div className="flex items-center gap-2 text-base lg:text-lg font-bold">
              <span>총계</span>
              <span className="text-primary transition-colors duration-300">
                {formatPrice(totalPrice)}원
              </span>
            </div>
          </div>

          {selectedModel && (
            <PDFDownloadButton
              model={selectedModel}
              selectedOptions={selectedOptionItems}
              className="h-10 lg:h-12 px-4 lg:px-6 gap-1.5 lg:gap-2 font-semibold shrink-0 text-sm lg:text-base"
            />
          )}
          {!selectedModel && (
            <button
              disabled
              className="inline-flex items-center gap-1.5 lg:gap-2 px-4 lg:px-6 h-10 lg:h-12 bg-gray-100 text-gray-400 font-semibold rounded-lg cursor-not-allowed shrink-0 text-sm lg:text-base"
            >
              <span>PDF 견적서</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

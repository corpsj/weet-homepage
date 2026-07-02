import { X } from 'lucide-react';
import { formatModelStartPrice } from '@/lib/customize/priceCalculator';
import type { Language } from '@/contexts/LanguageContext';
import type { CustomizeModel, CustomizeOption } from '@/lib/customize/types';
import { pickText } from '@/lib/customize/i18n';
import type { CustomizeUiCopy } from '../lib/constants';
import { useModalDismiss } from '../lib/hooks';
import { FloorplanCanvas } from './FloorplanCanvas';

export function FloorplanZoomModal({
  model,
  selectedOptions,
  onClose,
  copy,
  language,
}: {
  model: CustomizeModel;
  selectedOptions: CustomizeOption[];
  onClose: () => void;
  copy: CustomizeUiCopy;
  language: Language;
}) {
  useModalDismiss(onClose);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-weet-ink/55 p-3 backdrop-blur-sm md:p-6" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="floorplan-zoom-title"
        className="mx-auto flex min-h-[calc(100dvh-24px)] w-full max-w-6xl flex-col justify-center md:min-h-[calc(100dvh-48px)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="overflow-hidden rounded-lg border border-weet-line bg-weet-surface shadow-2xl">
          <div className="flex items-start justify-between gap-4 border-b border-weet-line px-4 py-3 md:px-5">
            <div>
              <p className="text-xs font-bold text-weet-muted">{copy.zoomTitle}</p>
              <h2 id="floorplan-zoom-title" className="text-lg font-black text-weet-ink md:text-xl">{pickText(model.nameKo, model.nameEn, language)}</h2>
              <p className="mt-1 text-xs font-bold text-weet-gold-deep">{formatModelStartPrice(model.basePrice)}</p>
            </div>
            <button
              type="button"
              data-testid="floorplan-zoom-close"
              aria-label={copy.zoomCloseAria}
              onClick={onClose}
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-weet-line text-weet-ink transition-colors hover:bg-weet-paper focus:outline-none focus-visible:ring-2 focus-visible:ring-weet-gold-deep"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="bg-weet-paper p-2 md:p-5">
            <div className="overflow-auto rounded-lg border border-weet-line bg-weet-surface" aria-label={copy.zoomAreaAria}>
              <FloorplanCanvas
                model={model}
                selectedOptions={selectedOptions}
                testId="floorplan-zoom-canvas"
                className="min-w-[720px] md:min-w-0"
                copy={copy}
                language={language}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

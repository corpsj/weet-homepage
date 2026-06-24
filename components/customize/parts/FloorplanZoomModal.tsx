import { X } from 'lucide-react';
import { formatModelStartPrice } from '@/lib/customize/priceCalculator';
import type { CustomizeModel, CustomizeOption } from '@/lib/customize/types';
import { useModalDismiss } from '../lib/hooks';
import { FloorplanCanvas } from './FloorplanCanvas';

export function FloorplanZoomModal({
  model,
  selectedOptions,
  onClose,
}: {
  model: CustomizeModel;
  selectedOptions: CustomizeOption[];
  onClose: () => void;
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
              <p className="text-xs font-bold text-weet-muted">도면 확대</p>
              <h2 id="floorplan-zoom-title" className="text-lg font-black text-weet-ink md:text-xl">{model.nameKo}</h2>
              <p className="mt-1 text-xs font-bold text-weet-gold-deep">{formatModelStartPrice(model.basePrice)}</p>
            </div>
            <button
              type="button"
              data-testid="floorplan-zoom-close"
              aria-label="도면 확대 닫기"
              onClick={onClose}
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-weet-line text-weet-ink transition-colors hover:bg-weet-paper focus:outline-none focus:ring-2 focus:ring-weet-gold-deep/40"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="bg-weet-paper p-2 md:p-5">
            <div className="overflow-auto rounded-lg border border-weet-line bg-weet-surface" aria-label="확대 도면 보기 영역">
              <FloorplanCanvas
                model={model}
                selectedOptions={selectedOptions}
                testId="floorplan-zoom-canvas"
                className="min-w-0"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

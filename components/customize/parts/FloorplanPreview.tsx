import { Maximize2 } from 'lucide-react';
import { formatModelStartPrice } from '@/lib/customize/priceCalculator';
import type { CustomizeModel, CustomizeOption } from '@/lib/customize/types';
import { COPY, type FloorplanImageStatus } from '../lib/constants';
import { FloorplanCanvas } from './FloorplanCanvas';

export function FloorplanPreview({
  model,
  selectedOptions,
  floorplanImagePath,
  floorplanImageStatus,
  onOpenViewer,
}: {
  model: CustomizeModel;
  selectedOptions: CustomizeOption[];
  floorplanImagePath?: string | null;
  floorplanImageStatus?: FloorplanImageStatus;
  onOpenViewer?: () => void;
}) {
  return (
    <div className="w-full max-w-[1100px]">
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-customize-slate">선택 모델</p>
          <h1 className="text-2xl font-black text-customize-ink md:text-3xl">{model.nameKo}</h1>
        </div>
        <div className="text-right">
          <p className="text-sm font-bold text-customize-slate">{COPY.basePrice}</p>
          <p className="text-lg font-black text-customize-bronze">{formatModelStartPrice(model.basePrice)}</p>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-lg border border-customize-stone bg-customize-sand shadow-sm">
        {onOpenViewer && (
          <button
            type="button"
            data-testid="floorplan-zoom-open"
            aria-label="도면 크게 보기"
            onClick={onOpenViewer}
            className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-md border border-customize-stone bg-customize-sand/95 text-customize-ink shadow-sm backdrop-blur transition-colors hover:border-customize-mushroom hover:bg-white focus:outline-none focus:ring-2 focus:ring-customize-bark/40"
          >
            <Maximize2 className="h-4 w-4" />
          </button>
        )}
        <FloorplanCanvas
          model={model}
          selectedOptions={selectedOptions}
          floorplanImagePath={floorplanImagePath}
          floorplanImageStatus={floorplanImageStatus}
          testId="floorplan-canvas"
        />
      </div>
    </div>
  );
}

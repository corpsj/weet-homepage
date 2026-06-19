import { Maximize2 } from 'lucide-react';
import { formatModelStartPrice } from '@/lib/customize/priceCalculator';
import type { CustomizeModel, CustomizeOption } from '@/lib/customize/types';
import { COPY } from '../lib/constants';
import { FloorplanCanvas } from './FloorplanCanvas';

export function FloorplanPreview({
  model,
  selectedOptions,
  onOpenViewer,
}: {
  model: CustomizeModel;
  selectedOptions: CustomizeOption[];
  onOpenViewer?: () => void;
}) {
  return (
    <div className="w-full max-w-[1100px]">
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-weet-muted">선택 모델</p>
          <h1 className="text-2xl font-black text-weet-ink md:text-3xl">{model.nameKo}</h1>
        </div>
        <div className="text-right">
          <p className="text-sm font-bold text-weet-muted">{COPY.basePrice}</p>
          <p className="text-lg font-black text-weet-gold-deep">{formatModelStartPrice(model.basePrice)}</p>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-lg border border-weet-line bg-weet-surface shadow-weet-card">
        {/* 시안 stage 라벨 */}
        <span className="pointer-events-none absolute left-3 top-3 z-10 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-customize-mist">
          FLOOR PLAN
        </span>
        {onOpenViewer && (
          <button
            type="button"
            data-testid="floorplan-zoom-open"
            aria-label="도면 크게 보기"
            onClick={onOpenViewer}
            className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-md border border-weet-line bg-weet-surface/95 text-weet-ink shadow-weet-card backdrop-blur transition-colors hover:border-weet-muted hover:bg-white focus:outline-none focus:ring-2 focus:ring-weet-gold-deep/40"
          >
            <Maximize2 className="h-4 w-4" />
          </button>
        )}
        <FloorplanCanvas
          model={model}
          selectedOptions={selectedOptions}
          testId="floorplan-canvas"
        />
        {/* 시안 stage 배지: 우측 벽 고정 기준(6m)에서 확장된 모델임을 알린다. */}
        {model.lengthM > 6 && (
          <span
            data-testid="floorplan-expansion-badge"
            className="pointer-events-none absolute bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full bg-weet-forest/10 px-3 py-1.5 text-[11px] font-extrabold text-weet-forest"
          >
            6m 기준에서 {model.lengthM}m로 확장됨
          </span>
        )}
      </div>
    </div>
  );
}

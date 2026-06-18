import { useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { floorplanSize } from '@/lib/customize/priceCalculator';
import type { CustomizeModel, CustomizeOption } from '@/lib/customize/types';
import {
  FLOORPLAN_CLIP_PAD,
  PLAN_LABEL_POSITIONS,
  type FloorplanBox,
  type FloorplanImageStatus,
} from '../lib/constants';
import { floorplanImagePathForModel } from '../lib/helpers';
import { useFloorplanImageStatus } from '../lib/hooks';

export function FloorplanCanvas({
  model,
  selectedOptions,
  floorplanImagePath,
  floorplanImageStatus,
  testId,
  className,
}: {
  model: CustomizeModel;
  selectedOptions: CustomizeOption[];
  floorplanImagePath?: string | null;
  floorplanImageStatus?: FloorplanImageStatus;
  testId: string;
  className?: string;
}) {
  const box = useMemo(() => floorplanSize(model), [model]);
  const shouldReduceMotion = useReducedMotion();
  const selectedLabels = selectedOptions.filter((option) => option.overlayLabelKo);
  const resolvedFloorplanImagePath = floorplanImagePath ?? floorplanImagePathForModel(model);
  const localImageStatus = useFloorplanImageStatus(resolvedFloorplanImagePath);
  const imageStatus = floorplanImageStatus ?? localImageStatus;
  const [lastShownImage, setLastShownImage] = useState<{ path: string; box: FloorplanBox } | null>(null);
  const [imageTransition, setImageTransition] = useState<{ fromPath: string; fromBox: FloorplanBox } | null>(null);

  // 모델이 바뀌어 새 도면이 로드되면 직전 도면 기준의 확장/축소 트랜지션을 시작한다.
  // (렌더 중 상태 보정 패턴 — https://react.dev/learn/you-might-not-need-an-effect)
  if (imageStatus === 'loaded' && resolvedFloorplanImagePath && lastShownImage?.path !== resolvedFloorplanImagePath) {
    if (lastShownImage) {
      if (!shouldReduceMotion && lastShownImage.box.width !== box.width) {
        setImageTransition({ fromPath: lastShownImage.path, fromBox: lastShownImage.box });
      } else {
        setImageTransition(null);
      }
    }
    setLastShownImage({ path: resolvedFloorplanImagePath, box });
  }

  // 다음 모델 도면이 로드되는 동안 직전 도면을 유지해 플리커를 없앤다.
  const displayedImagePath =
    imageStatus === 'loaded'
      ? resolvedFloorplanImagePath
      : imageStatus === 'loading'
        ? lastShownImage?.path ?? null
        : null;
  const hasBaseImage = Boolean(displayedImagePath);
  const gridId = `${testId}-grid`;
  const clipId = `${testId}-expansion-clip`;

  const isGrowing = imageTransition ? box.width >= imageTransition.fromBox.width : true;
  const baseLayerPath = imageTransition && isGrowing ? imageTransition.fromPath : displayedImagePath;
  const animatedLayerPath = imageTransition ? (isGrowing ? displayedImagePath : imageTransition.fromPath) : null;

  return (
    <svg viewBox="0 0 1000 420" className={cn('aspect-[1000/420] w-full', className)} data-testid={testId}>
      <defs>
        <pattern id={gridId} width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#e4ddd1" strokeWidth="1" />
        </pattern>
        {imageTransition && (
          <clipPath id={clipId}>
            {/* clipPath 내부에서는 CSS transform이 무시되므로 attrX로 SVG 속성을 직접 애니메이션한다. */}
            <motion.rect
              key={`${imageTransition.fromPath}->${displayedImagePath ?? 'none'}`}
              initial={{
                attrX: imageTransition.fromBox.x - FLOORPLAN_CLIP_PAD,
                width: imageTransition.fromBox.width + FLOORPLAN_CLIP_PAD * 2,
              }}
              animate={{ attrX: box.x - FLOORPLAN_CLIP_PAD, width: box.width + FLOORPLAN_CLIP_PAD * 2 }}
              transition={{ duration: 0.72, ease: 'easeInOut' }}
              onAnimationComplete={() => setImageTransition(null)}
              y={0}
              height={420}
            />
          </clipPath>
        )}
      </defs>
      <rect width="1000" height="420" fill="#f5f1ea" />

      {hasBaseImage ? (
        <g>
          <image
            data-testid="base-floorplan-image"
            href={baseLayerPath ?? undefined}
            x="0"
            y="0"
            width="1000"
            height="420"
            preserveAspectRatio="xMidYMid meet"
          />
          {imageTransition && animatedLayerPath && (
            <g clipPath={`url(#${clipId})`} data-testid="floorplan-image-transition">
              <motion.g
                key={`${imageTransition.fromPath}->${animatedLayerPath}`}
                initial={{ opacity: 1 }}
                animate={{ opacity: isGrowing ? 1 : [1, 1, 0] }}
                transition={{ duration: 0.72, ease: 'easeInOut' }}
              >
                <image
                  href={animatedLayerPath}
                  x="0"
                  y="0"
                  width="1000"
                  height="420"
                  preserveAspectRatio="xMidYMid meet"
                />
              </motion.g>
            </g>
          )}
        </g>
      ) : (
        <>
          <rect x={box.x} y={box.y} width={box.width} height={box.height} fill="#f8f4ec" stroke="#2f3432" strokeWidth="12" className="transition-all duration-[600ms] motion-reduce:transition-none" />
          <rect x={box.x + 12} y={box.y + 12} width={box.width - 24} height={box.height - 24} fill={`url(#${gridId})`} stroke="#bfb4a2" strokeWidth="2" className="transition-all duration-[600ms] motion-reduce:transition-none" />
          <BasePlanObjects box={box} />
        </>
      )}

      {!hasBaseImage && (
        <rect
          data-testid="model-footprint"
          x={box.x}
          y={box.y}
          width={box.width}
          height={box.height}
          fill="transparent"
          stroke="#2f3432"
          strokeWidth="6"
          className="transition-all duration-[600ms] motion-reduce:transition-none"
        />
      )}

      <motion.rect
        data-testid="floorplan-expansion-shell"
        initial={false}
        animate={{ x: box.x, width: box.width }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        y={box.y}
        height={box.height}
        rx="6"
        fill="transparent"
        stroke="#2E4A3F"
        strokeWidth="8"
        strokeLinecap="round"
        opacity="0.9"
      />

      <FloorplanExpansionGuides box={box} />
      <FloorplanLengthRail box={box} lengthM={model.lengthM} />

      {selectedOptions.map((option) => option.overlayImagePath ? (
        <g key={option.id} className="transition-all duration-[600ms] motion-reduce:transition-none">
          <image
            href={option.overlayImagePath}
            x="0"
            y="0"
            width="1000"
            height="420"
            preserveAspectRatio="xMidYMid meet"
            opacity="0.88"
            className="transition-opacity duration-[250ms]"
          />
        </g>
      ) : null)}

      {selectedLabels.map((option, index) => {
        const position = (PLAN_LABEL_POSITIONS[option.categoryKey] ?? PLAN_LABEL_POSITIONS.interior)(box, index);
        return (
          <g key={option.id} className="transition-all duration-[250ms]">
            <rect x={position.x - 8} y={position.y - 19} width={Math.max(58, (option.overlayLabelKo?.length ?? 2) * 14 + 20)} height="30" rx="6" fill="#2f3432" />
            <text x={position.x + 4} y={position.y + 1} fill="#fbfaf7" fontSize="15" fontWeight="700">
              {option.overlayLabelKo}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function FloorplanExpansionGuides({ box }: { box: ReturnType<typeof floorplanSize> }) {
  const shouldReduceMotion = useReducedMotion();
  const transition = shouldReduceMotion ? { duration: 0 } : { duration: 0.72, ease: 'easeInOut' };
  // 우측 고정 · 좌측 확장: 6m 기준 좌측 벽은 항상 950-600=350, 확장분은 전부 왼쪽에 생긴다.
  const compactLeftX = 950 - 600;
  const extensionWidth = Math.max(0, box.width - 600);
  const hasExpansion = extensionWidth > 0;
  const inset = 12;
  const leftX = box.x + inset;
  const rightX = box.x + box.width - inset;
  const topY = box.y + inset;
  const bottomY = box.y + box.height - inset;
  const guideOpacity = hasExpansion ? 0.95 : 0.72;

  return (
    <g data-testid="floorplan-expansion-guides" pointerEvents="none">
      {/* 좌측 확장 영역(증설분) — 새 좌측 벽과 6m 기준선 사이 */}
      <motion.rect
        data-testid="floorplan-left-growth-zone"
        initial={false}
        animate={{ x: box.x + inset, width: Math.max(0, extensionWidth - inset), opacity: hasExpansion ? 0.28 : 0 }}
        transition={transition}
        y={box.y + inset}
        height={box.height - inset * 2}
        rx="4"
        fill="#d8e4dd"
      />

      {/* 6m 기준 좌측 벽(확장 전 위치) 점선 — 우측 벽은 고정이라 별도 기준선 없음 */}
      <motion.line
        data-testid="floorplan-compact-left-reference"
        initial={false}
        animate={{ opacity: hasExpansion ? 0.58 : 0 }}
        transition={transition}
        x1={compactLeftX}
        y1={box.y + 18}
        x2={compactLeftX}
        y2={box.y + box.height - 18}
        stroke="#b88b26"
        strokeWidth="3"
        strokeDasharray="7 7"
        strokeLinecap="round"
      />

      <motion.line
        data-testid="floorplan-expansion-top-wall"
        initial={false}
        animate={{ x1: leftX, x2: rightX, opacity: guideOpacity }}
        transition={transition}
        y1={topY}
        y2={topY}
        stroke="#2E4A3F"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <motion.line
        data-testid="floorplan-expansion-bottom-wall"
        initial={false}
        animate={{ x1: leftX, x2: rightX, opacity: guideOpacity }}
        transition={transition}
        y1={bottomY}
        y2={bottomY}
        stroke="#2E4A3F"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <motion.line
        data-testid="floorplan-expansion-left-wall"
        initial={false}
        animate={{ x1: leftX, x2: leftX, opacity: guideOpacity }}
        transition={transition}
        y1={topY}
        y2={bottomY}
        stroke="#2E4A3F"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <motion.line
        data-testid="floorplan-expansion-right-wall"
        initial={false}
        animate={{ x1: rightX, x2: rightX, opacity: guideOpacity }}
        transition={transition}
        y1={topY}
        y2={bottomY}
        stroke="#2E4A3F"
        strokeWidth="5"
        strokeLinecap="round"
      />

      <motion.text
        data-testid="floorplan-expansion-label"
        initial={false}
        animate={{ x: box.x + box.width / 2, opacity: hasExpansion ? 1 : 0 }}
        transition={transition}
        y={box.y + 32}
        fill="#2E4A3F"
        fontSize="13"
        fontWeight="900"
        textAnchor="middle"
      >
        6m 기준선에서 9m로 확장
      </motion.text>
    </g>
  );
}

function FloorplanLengthRail({ box, lengthM }: { box: ReturnType<typeof floorplanSize>; lengthM: number }) {
  const railY = box.y + box.height + 34;
  const labelX = box.x + box.width / 2;

  return (
    <g data-testid="floorplan-length-rail" className="transition-all duration-[600ms] motion-reduce:transition-none">
      <line x1={box.x} y1={railY} x2={box.x + box.width} y2={railY} stroke="#b9aa94" strokeWidth="2" strokeDasharray="4 4" opacity="0.85" />
      <line x1={box.x} y1={railY - 8} x2={box.x} y2={railY + 8} stroke="#b9aa94" strokeWidth="2" />
      <line x1={box.x + box.width} y1={railY - 8} x2={box.x + box.width} y2={railY + 8} stroke="#b9aa94" strokeWidth="2" />
      <rect x={labelX - 22} y={railY - 14} width="44" height="28" rx="4" fill="#f5f1ea" stroke="#d8d0c3" />
      <text x={labelX} y={railY + 5} fill="#6f6658" fontSize="12" fontWeight="800" textAnchor="middle">
        {lengthM}m
      </text>
    </g>
  );
}

function BasePlanObjects({ box }: { box: ReturnType<typeof floorplanSize> }) {
  return (
    <g className="transition-all duration-[600ms]">
      <rect x={box.x + box.width - 84} y={box.y + box.height - 8} width="60" height="16" fill="#8d7a5a" />
      <path d={`M ${box.x + box.width - 78} ${box.y + box.height - 8} Q ${box.x + box.width - 80} ${box.y + box.height - 70} ${box.x + box.width - 20} ${box.y + box.height - 70}`} fill="none" stroke="#8d7a5a" strokeWidth="3" />
      <text x={box.x + box.width - 96} y={box.y + box.height - 28} fill="#5f5448" fontSize="14" fontWeight="700">현관도어</text>

      <rect x={box.x + box.width * 0.25} y={box.y - 6} width="96" height="12" fill="#7f9aa0" />
      <text x={box.x + box.width * 0.25 + 12} y={box.y + 24} fill="#5f5448" fontSize="14" fontWeight="700">기본창</text>

      <rect x={box.x + 60} y={box.y + box.height - 108} width="150" height="64" rx="4" fill="#e1d7c8" stroke="#6b6258" strokeWidth="2" />
      <circle cx={box.x + 88} cy={box.y + box.height - 76} r="16" fill="none" stroke="#6b6258" strokeWidth="2" />
      <text x={box.x + 92} y={box.y + box.height - 116} fill="#5f5448" fontSize="14" fontWeight="700">싱크대</text>

      <rect x={box.x + box.width - 210} y={box.y + 46} width="140" height="112" rx="4" fill="#e7e1d8" stroke="#6b6258" strokeWidth="2" />
      <circle cx={box.x + box.width - 104} cy={box.y + 86} r="18" fill="none" stroke="#6b6258" strokeWidth="2" />
      <rect x={box.x + box.width - 198} y={box.y + 58} width="48" height="32" rx="4" fill="none" stroke="#6b6258" strokeWidth="2" />
      <text x={box.x + box.width - 196} y={box.y + 178} fill="#5f5448" fontSize="14" fontWeight="700">욕실</text>
    </g>
  );
}

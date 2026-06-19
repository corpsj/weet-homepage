'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { CustomizeModel, CustomizeOption } from '@/lib/customize/types';

// 시안: design_handoff_weet/Weet 커스터마이즈 (B안).dc.html 의 인라인 SVG(viewBox 0 0 1000 460)를 그대로 포팅.
// 우측 벽은 x=830에 고정하고 좌측 벽만 확장한다. 동일 스케일(1m=84px) → 3×6:{x:326,w:504}, 3×9:{x:74,w:756}.
const PLAN_RIGHT_EDGE = 830;
const PLAN_SCALE = 84;
const PLAN_TWEEN_MS = 620; // 시안 tweenPlan(600ms)을 기대 사양(620ms ease-out)에 맞춤
const DEFAULT_WALL_INK = '#2f3432'; // 시안 planWall stroke(구조선)
const DEFAULT_FLOOR_FILL = '#f1ece1'; // 시안 floorFill(filled) 기본값
const SMART_ACCENT = '#2E4A3F'; // weet-forest = 시안 --acc 대응

type PlanGeom = { x: number; w: number };

// geomFor: 모델 길이(m)로 좌측 벽 x와 폭 w 산출 (시안 geomFor 포팅 — 우변 고정·동일 스케일로 일반화).
function geomFor(lengthM: number): PlanGeom {
  const w = Math.round(lengthM * PLAN_SCALE);
  return { x: PLAN_RIGHT_EDGE - w, w };
}

const easeOutCubic = (p: number) => 1 - Math.pow(1 - p, 3); // 시안 ease
const round1 = (n: number) => Math.round(n * 10) / 10;

// 시안 swatch 색값(option key 기준). 외장 → 벽 스킨, 바닥 → 바닥 fill 에 반영한다.
const PLAN_SWATCH: Record<string, string> = {
  'ribbed-steel-white': '#E4DFD4',
  'zinc-gray': '#6B6E70',
  'cedar-point': '#9B6A42',
  'paper-wall': '#EFE9DD',
  'silk-wallpaper': '#E2D6C2',
  'birch-panel': '#D8B98A',
  'spc-white-oak': '#D9C7A8',
  'spc-natural-oak': '#B58E5E',
  'porcelain-tile': '#BFC0BC',
};

function swatchColor(options: CustomizeOption[], categoryKey: string): string | null {
  const option = options.find((item) => item.categoryKey === categoryKey);
  if (!option) return null;
  return PLAN_SWATCH[option.key] ?? PLAN_SWATCH[option.id] ?? null;
}

export function FloorplanCanvas({
  model,
  selectedOptions,
  testId,
  className,
}: {
  model: CustomizeModel;
  selectedOptions: CustomizeOption[];
  testId: string;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();
  const [geom, setGeom] = useState<PlanGeom>(() => geomFor(model.lengthM));
  const geomRef = useRef(geom);
  const rafRef = useRef<number | null>(null);

  // applyGeom: 산출된 geometry를 뷰에 반영 (시안의 setAttribute 일괄 갱신을 React state로 변환).
  const applyGeom = useCallback((next: PlanGeom) => {
    geomRef.current = next;
    setGeom(next);
  }, []);

  // tweenPlan: 현재 → 목표 좌측 벽을 ease-out으로 보간 (시안 setInterval → requestAnimationFrame 포팅).
  const tweenPlan = useCallback(
    (target: PlanGeom) => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      const from = geomRef.current;
      const start = performance.now();
      const step = (now: number) => {
        const p = Math.min((now - start) / PLAN_TWEEN_MS, 1);
        if (p >= 1) {
          applyGeom(target); // 마지막 프레임은 정확한 목표값으로 마감
          rafRef.current = null;
          return;
        }
        const e = easeOutCubic(p);
        applyGeom({
          x: round1(from.x + (target.x - from.x) * e),
          w: round1(from.w + (target.w - from.w) * e),
        });
        rafRef.current = requestAnimationFrame(step);
      };
      rafRef.current = requestAnimationFrame(step);
    },
    [applyGeom]
  );

  // 모델(길이) 변경 시 좌측 벽 확장/축소. prefers-reduced-motion 또는 동일 geometry면 즉시 반영.
  useEffect(() => {
    const target = geomFor(model.lengthM);
    if (shouldReduceMotion || Math.abs(geomRef.current.x - target.x) < 0.5) {
      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      applyGeom(target);
      return;
    }
    tweenPlan(target);
    return () => {
      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [model.lengthM, shouldReduceMotion, applyGeom, tweenPlan]);

  const floorColor = swatchColor(selectedOptions, 'flooring') ?? DEFAULT_FLOOR_FILL;
  const exteriorColor = swatchColor(selectedOptions, 'exterior') ?? DEFAULT_WALL_INK;
  const doorSmart = selectedOptions.some((option) => option.categoryKey === 'door' && /smart/i.test(option.key || option.id));
  const railMidX = Math.round((geom.x + PLAN_RIGHT_EDGE) / 2);

  return (
    <svg viewBox="0 0 1000 460" className={cn('aspect-[1000/460] w-full', className)} data-testid={testId}>
      <rect width="1000" height="460" fill="#f5f1ea" />

      {/* 길이 레일: 좌측 눈금만 좌측 벽을 따라 이동, 우측 눈금(x=830)은 고정 */}
      <g data-testid="floorplan-length-rail">
        <line x1={geom.x} y1="86" x2={PLAN_RIGHT_EDGE} y2="86" stroke="#b9aa94" strokeWidth="2" strokeDasharray="5 5" opacity="0.8" />
        <line x1={geom.x} y1="78" x2={geom.x} y2="94" stroke="#b9aa94" strokeWidth="2" />
        <line x1={PLAN_RIGHT_EDGE} y1="78" x2={PLAN_RIGHT_EDGE} y2="94" stroke="#b9aa94" strokeWidth="2" />
        <text x={railMidX} y="80" fill="#8a806f" fontSize="13" fontWeight="800" textAnchor="middle">
          {model.lengthM}m
        </text>
      </g>

      {/* 바닥 + 벽: 우변 고정(x=830), 좌측 벽 확장. 바닥 fill=바닥재 색, 벽 스킨=외장 색 */}
      <rect data-testid="model-footprint" x={geom.x} y="116" width={geom.w} height="252" rx="4" fill={floorColor} stroke={DEFAULT_WALL_INK} strokeWidth="10" />
      <rect x={geom.x} y="116" width={geom.w} height="252" rx="4" fill="none" stroke={exteriorColor} strokeWidth="6" />

      {/* 설비 블록(우측 고정) */}
      <line x1="640" y1="120" x2="640" y2="364" stroke="#cbbfa9" strokeWidth="2" />
      <line x1="640" y1="244" x2="826" y2="244" stroke="#cbbfa9" strokeWidth="2" />
      <text x="733" y="190" textAnchor="middle" fill="#9a8f7d" fontSize="15">욕실</text>
      <text x="733" y="312" textAnchor="middle" fill="#9a8f7d" fontSize="15">주방</text>
      <text x="455" y="248" textAnchor="middle" fill="#7b7468" fontSize="17" fontWeight="600">거실 · 침실</text>

      {/* 현관 도어(하단 벽, 고정) + 스마트락 표시 */}
      <rect x="548" y="362" width="56" height="10" fill={floorColor} />
      <path d="M548 367 A56 56 0 0 0 604 367" fill="none" stroke="#b9aa94" strokeWidth="2" />
      {doorSmart && <circle cx="542" cy="367" r="6" fill={SMART_ACCENT} />}
    </svg>
  );
}

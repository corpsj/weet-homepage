'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { Language } from '@/contexts/LanguageContext';
import type { CustomizeModel, CustomizeOption } from '@/lib/customize/types';
import { pickText } from '@/lib/customize/i18n';
import { UI_COPY, type CustomizeUiCopy } from '../lib/constants';

// 시안: design_handoff_weet/Weet 커스터마이즈 (B안).dc.html 의 인라인 SVG(viewBox 0 0 1000 460)를 그대로 포팅.
// 우측 벽은 x=830에 고정하고 좌측 벽만 확장한다. 동일 스케일(1m=84px) → 3×6:{x:326,w:504}, 3×9:{x:74,w:756}.
const PLAN_RIGHT_EDGE = 830;
const PLAN_SCALE = 84;
const PLAN_MIN_LEFT = 40; // 관리자가 긴 모델을 추가해도 도면이 viewBox 밖으로 나가지 않게 하는 하한
const PLAN_TWEEN_S = 0.62; // 시안 tweenPlan(600ms)을 기대 사양(620ms ease-out)에 맞춤
const DEFAULT_WALL_INK = '#2f3432'; // 시안 planWall stroke(구조선)
const DEFAULT_FLOOR_FILL = '#f1ece1'; // 시안 floorFill(filled) 기본값
const SMART_ACCENT = '#2E4A3F'; // weet-forest = 시안 --acc 대응

// 시안 ease: 1-(1-p)^3 (ease-out cubic). framer-motion transition으로 tweenPlan을 표현한다.
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

type PlanGeom = { x: number; w: number };

// geomFor: 모델 길이(m)로 좌측 벽 x와 폭 w 산출 (시안 geomFor 포팅 — 우변 고정·동일 스케일로 일반화).
export function geomFor(lengthM: number): PlanGeom {
  const w = Math.min(Math.round(lengthM * PLAN_SCALE), PLAN_RIGHT_EDGE - PLAN_MIN_LEFT);
  return { x: PLAN_RIGHT_EDGE - w, w };
}

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

// 시안은 항상 밝은 바닥이라 라벨 톤이 고정이지만, 바닥 색을 반영하면 어두운 바닥(내추럴오크 등)에서 라벨이 묻힌다.
// 바닥 명도가 낮으면 더 진한 라벨 잉크로 교체해 가독성을 유지한다(밝은 바닥은 시안 톤 그대로).
function readableInk(bg: string, light: string, dark: string): string {
  const hex = bg.replace('#', '');
  if (hex.length < 6) return light;
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.62 ? light : dark;
}

export function FloorplanCanvas({
  model,
  selectedOptions,
  testId,
  className,
  copy = UI_COPY.KO,
  language = 'KO',
}: {
  model: CustomizeModel;
  selectedOptions: CustomizeOption[];
  testId: string;
  className?: string;
  copy?: CustomizeUiCopy;
  language?: Language;
}) {
  const shouldReduceMotion = useReducedMotion();
  // geomFor 결과를 props에서 직접 산출한다. 모델 변경 시 framer-motion이 현재값 → 목표값을 보간(=tweenPlan).
  const geom = geomFor(model.lengthM);
  const railMidX = Math.round((geom.x + PLAN_RIGHT_EDGE) / 2);
  // applyGeom 대응: 단일 좌측 벽 x로부터 벽/스킨/레일 좌표가 모두 파생된다.
  const tween = { duration: shouldReduceMotion ? 0 : PLAN_TWEEN_S, ease: easeOutCubic };

  const floorColor = swatchColor(selectedOptions, 'flooring') ?? DEFAULT_FLOOR_FILL;
  const exteriorColor = swatchColor(selectedOptions, 'exterior') ?? DEFAULT_WALL_INK;
  const doorSmart = selectedOptions.some((option) => option.categoryKey === 'door' && /smart/i.test(option.key || option.id));
  const roomInk = readableInk(floorColor, '#7b7468', '#4f473d'); // 거실·침실
  const utilInk = readableInk(floorColor, '#9a8f7d', '#5f574d'); // 욕실·주방

  // 스크린리더용 도면 요약: 모델 치수 + 외장/바닥 선택 + 스마트락 여부.
  const exteriorOption = selectedOptions.find((option) => option.categoryKey === 'exterior');
  const flooringOption = selectedOptions.find((option) => option.categoryKey === 'flooring');
  const exteriorName = exteriorOption ? pickText(exteriorOption.nameKo, exteriorOption.nameEn, language) : undefined;
  const flooringName = flooringOption ? pickText(flooringOption.nameKo, flooringOption.nameEn, language) : undefined;
  const planLabel = [
    copy.planLabel(pickText(model.nameKo, model.nameEn, language), model.widthM, model.lengthM),
    exteriorName && copy.planExteriorLabel(exteriorName),
    flooringName && copy.planFlooringLabel(flooringName),
    doorSmart && copy.planSmartLock,
  ]
    .filter(Boolean)
    .join(', ');

  return (
    <svg viewBox="0 0 1000 460" className={cn('aspect-[1000/460] w-full', className)} data-testid={testId} role="img" aria-label={planLabel}>
      <rect width="1000" height="460" fill="#f5f1ea" />

      {/* 길이 레일: 좌측 눈금만 좌측 벽을 따라 이동, 우측 눈금(x=830)은 고정 */}
      <g data-testid="floorplan-length-rail">
        <motion.line initial={false} animate={{ x1: geom.x }} transition={tween} y1="86" x2={PLAN_RIGHT_EDGE} y2="86" stroke="#b9aa94" strokeWidth="2" strokeDasharray="5 5" opacity="0.8" />
        <motion.line initial={false} animate={{ x1: geom.x, x2: geom.x }} transition={tween} y1="78" y2="94" stroke="#b9aa94" strokeWidth="2" />
        <line x1={PLAN_RIGHT_EDGE} y1="78" x2={PLAN_RIGHT_EDGE} y2="94" stroke="#b9aa94" strokeWidth="2" />
        <motion.text initial={false} animate={{ x: railMidX }} transition={tween} y="80" fill="#8a806f" fontSize="13" fontWeight="800" textAnchor="middle">
          {model.lengthM}m
        </motion.text>
      </g>

      {/* 바닥 + 벽: 우변 고정(x=830), 좌측 벽 확장. 바닥 fill=바닥재 색, 벽 스킨=외장 색 */}
      <motion.rect
        data-testid="model-footprint"
        data-plan-width={geom.w}
        initial={false}
        animate={{ x: geom.x, width: geom.w }}
        transition={tween}
        y="116"
        height="252"
        rx="4"
        fill={floorColor}
        stroke={DEFAULT_WALL_INK}
        strokeWidth="10"
      />
      <motion.rect initial={false} animate={{ x: geom.x, width: geom.w }} transition={tween} y="116" height="252" rx="4" fill="none" stroke={exteriorColor} strokeWidth="6" />

      {/* 침대(좌측 벽 기준): 모델이 길어져도 침대는 좌측 벽을 따라 함께 이동한다 */}
      <g data-testid="floorplan-bed">
        <motion.rect initial={false} animate={{ x: geom.x + 12 }} transition={tween} y="128" width="92" height="170" rx="3" fill="none" stroke="#8a806f" strokeWidth="2" />
        <motion.line initial={false} animate={{ x1: geom.x + 22, x2: geom.x + 94 }} transition={tween} y1="162" y2="162" stroke="#b9aa94" strokeWidth="2" />
        <motion.text initial={false} animate={{ x: geom.x + 58 }} transition={tween} y="238" textAnchor="middle" fill={roomInk} fontSize="14" fontWeight="600">
          {copy.planBed}
        </motion.text>
      </g>

      {/* ponytail: 우측 고정 설비(싱크대·현관·욕실)는 실측 6m 도면 기준 좌표 — 6m 미만 모델이 생기면 좌표 재검토 */}
      {/* 싱크대: 하단 벽면 중앙(일자형 주방) */}
      <rect x="468" y="316" width="142" height="46" rx="3" fill="none" stroke="#8a806f" strokeWidth="2" />
      <circle cx="492" cy="339" r="9" fill="none" stroke="#9a8f7d" strokeWidth="2" />
      <text x="548" y="344" textAnchor="middle" fill={roomInk} fontSize="13" fontWeight="600">{copy.planSink}</text>

      {/* 욕실 칸막이벽(우측 끝 전체가 욕실) — 중간에 슬라이딩 도어 개구부 */}
      <line x1="696" y1="121" x2="696" y2="206" stroke={DEFAULT_WALL_INK} strokeWidth="4" />
      <line x1="696" y1="268" x2="696" y2="363" stroke={DEFAULT_WALL_INK} strokeWidth="4" />
      {/* 슬라이딩 도어: 도면 기준 위쪽으로 밀려 열린다(점선 = 슬라이드 경로) */}
      <line x1="702" y1="150" x2="702" y2="202" stroke="#b9aa94" strokeWidth="2" strokeDasharray="4 4" />
      <rect x="698" y="206" width="8" height="62" rx="2" fill="#8a806f" />

      {/* 욕실 내부: 위에서부터 샤워 → 변기 → 세면대 */}
      <rect x="712" y="132" width="104" height="74" rx="4" fill="none" stroke="#cbbfa9" strokeWidth="2" />
      <circle cx="726" cy="146" r="4" fill="none" stroke="#9a8f7d" strokeWidth="2" />
      <text x="764" y="176" textAnchor="middle" fill={utilInk} fontSize="13">{copy.planShower}</text>
      <rect x="800" y="228" width="22" height="38" rx="3" fill="none" stroke="#cbbfa9" strokeWidth="2" />
      <ellipse cx="782" cy="247" rx="14" ry="18" fill="none" stroke="#cbbfa9" strokeWidth="2" />
      <text x="736" y="252" textAnchor="middle" fill={utilInk} fontSize="13">{copy.planToilet}</text>
      <line x1="696" y1="300" x2="826" y2="300" stroke="#cbbfa9" strokeWidth="2" />
      <rect x="700" y="312" width="122" height="46" fill="none" stroke="#cbbfa9" strokeWidth="2" />
      <circle cx="726" cy="335" r="10" fill="none" stroke="#9a8f7d" strokeWidth="2" />
      <text x="776" y="340" textAnchor="middle" fill={utilInk} fontSize="13">{copy.planBasin}</text>

      {/* 현관(주출입구): 싱크대와 욕실 사이 하단 벽, 바깥으로 열리는 외개형 도어 */}
      <rect x="618" y="362" width="56" height="12" fill={floorColor} />
      <path d="M618 368 A56 56 0 0 0 674 424" fill="none" stroke="#b9aa94" strokeWidth="2" />
      <line x1="674" y1="368" x2="674" y2="424" stroke="#b9aa94" strokeWidth="2" />
      <text x="646" y="348" textAnchor="middle" fill={roomInk} fontSize="12">{copy.planEntrance}</text>
      {doorSmart && <circle data-testid="smart-lock-dot" cx="608" cy="368" r="6" fill={SMART_ACCENT} />}
    </svg>
  );
}

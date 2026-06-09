# GPT-5.5 Pro Review Packet

Marker: WEET_REVIEW_20260610_CUSTOMIZE_SOLUTION_CLOSURE_02

## Active Task Brief

Review the final closure state for Weet's solution/header/customize renewal. The previous GPT-5.5 Pro review (marker WEET_REVIEW_20260610_CUSTOMIZE_SOLUTION_FINAL_01) returned REVISE with one concrete MUST_FIX: replace 9 temporary option-modal images. That MUST_FIX has been applied, plus a visual QA-discovered modal rendering bug was fixed.

User goals:
- Make Weet feel like a leading, young, premium Korean movable-home brand.
- Rebuild /solution as technical option systems, not field/site concepts, and avoid black-heavy styling.
- Reposition/restyle header 주문하기 without nav crowding or black CTA styling.
- Rework /customize around Tesla/Porsche-style ordering: full-width stepper, remove 상담 신청, steps 모델 / 공간 구성 / 무드 & 소재 / 스마트 테크, remove 확인사항, replace 상담 요청 with 주문하기.
- Fill option info modals with real descriptions and photorealistic Korean-context images generated via Chrome/ChatGPT visible web control.
- Center floorplans and add 3x6 -> 3x9 interactive expansion.

## Current Progress / State

Implementation is complete locally. Validation and visual QA passed. This packet asks for closure review before commit/push/deploy.

Important latest fix: option modal images use cache-busted public paths such as /images/customize/options/iot-package.webp?v=20260610-0137. Next Image optimizer returned HTTP 400 when proxying those query-bearing public URLs, so modal images appeared as blank beige boxes. The modal Image now uses `unoptimized`, and visual QA confirms nonzero natural dimensions and visible rendering.

## Project Snapshot

- Next.js app router project.
- Branch: zoo/customize-configurator.
- Key changed surfaces: /solution, /solution/* detail pages, /customize configurator, header, customize actions/tests, floorplan SVGs, public option image assets.
- New route: /solution/energy.

## Git Status

```text
## zoo/customize-configurator...origin/zoo/customize-configurator
 M .codex/current-task.md
 M .codex/pro-review.md
 M .codex/review-packet-slim.md
 M .codex/review-packet.md
 M .codex/state.md
 M agent-inbox/customizer-image-generation.md
 M agent-inbox/implementation-backlog.md
 M agent-inbox/tool-control-runbook.md
 M app/actions/customize-actions.ts
 M app/customize/layout.tsx
 M app/customize/page.tsx
 M app/privacy/page.tsx
 M app/solution/cctv/layout.tsx
 M app/solution/cctv/page.tsx
 M app/solution/design/layout.tsx
 M app/solution/design/page.tsx
 M app/solution/iot/page.tsx
 M app/solution/layout.tsx
 M app/solution/network/layout.tsx
 M app/solution/network/page.tsx
 M app/solution/page.tsx
 M app/support/page.tsx
 M app/terms/page.tsx
 M components/customize/CustomizeConfigurator.tsx
 M components/layout/Header.tsx
 M components/solution/FeatureModal.tsx
 M components/solution/SolutionTemplate.tsx
 M e2e/customize-configurator.spec.ts
 M e2e/public-pages.spec.ts
 M lib/customize/__tests__/priceCalculator.test.ts
 M lib/customize/priceCalculator.ts
 M public/images/customize/compact-3x6-base.svg
 M public/images/customize/standard-3x9-base.svg
?? .codex/qa/current/
?? .codex/qa/production-solution-fb62d34/
?? .codex/qa/solution-renewal-20260609/
?? .codex/qa/solution-renewal-before-20260609/
?? app/solution/energy/
?? public/images/customize/options/
?? test-results/

```

## Changed Files / Diff Stat

```text
 .codex/current-task.md                          |   68 +-
 .codex/pro-review.md                            |   22 +-
 .codex/review-packet-slim.md                    | 1808 +++++----
 .codex/review-packet.md                         | 4501 ++++++++++++-----------
 .codex/state.md                                 |  160 +-
 agent-inbox/customizer-image-generation.md      |   76 +
 agent-inbox/implementation-backlog.md           |    8 +
 agent-inbox/tool-control-runbook.md             |   45 +
 app/actions/customize-actions.ts                |    4 +-
 app/customize/layout.tsx                        |    2 +-
 app/customize/page.tsx                          |    4 +-
 app/privacy/page.tsx                            |    2 +-
 app/solution/cctv/layout.tsx                    |    4 +-
 app/solution/cctv/page.tsx                      |   16 +-
 app/solution/design/layout.tsx                  |   12 +-
 app/solution/design/page.tsx                    |   56 +-
 app/solution/iot/page.tsx                       |   16 +-
 app/solution/layout.tsx                         |    4 +-
 app/solution/network/layout.tsx                 |    4 +-
 app/solution/network/page.tsx                   |   22 +-
 app/solution/page.tsx                           |  297 +-
 app/support/page.tsx                            |    4 +-
 app/terms/page.tsx                              |    8 +-
 components/customize/CustomizeConfigurator.tsx  |  393 +-
 components/layout/Header.tsx                    |   77 +-
 components/solution/FeatureModal.tsx            |    8 +-
 components/solution/SolutionTemplate.tsx        |   78 +-
 e2e/customize-configurator.spec.ts              |   87 +-
 e2e/public-pages.spec.ts                        |   13 +-
 lib/customize/__tests__/priceCalculator.test.ts |    2 +-
 lib/customize/priceCalculator.ts                |    4 +-
 public/images/customize/compact-3x6-base.svg    |   96 +-
 public/images/customize/standard-3x9-base.svg   |  124 +-
 33 files changed, 4002 insertions(+), 4023 deletions(-)

```

Untracked generated assets / QA evidence:

```text
.codex/qa/current/chrome-chatgpt-recovery.png
.codex/qa/current/customize-options-contact.webp
.codex/qa/current/desktop-customize-3x9-expansion-final-after-cachefix.png
.codex/qa/current/desktop-customize-3x9-expansion-mid-after-cachefix.png
.codex/qa/current/desktop-customize-expansion-mid.png
.codex/qa/current/desktop-customize-initial-after-cachefix.png
.codex/qa/current/desktop-customize-initial.png
.codex/qa/current/desktop-customize-standard-expanding.png
.codex/qa/current/desktop-customize-standard-final.png
.codex/qa/current/desktop-home-header-after-cachefix.png
.codex/qa/current/desktop-home-header.png
.codex/qa/current/desktop-modal-basic-bathroom.png
.codex/qa/current/desktop-modal-basic-sink.png
.codex/qa/current/desktop-modal-basic-window.png
.codex/qa/current/desktop-modal-bidet.png
.codex/qa/current/desktop-modal-birch-panel.png
.codex/qa/current/desktop-modal-built-in-storage.png
.codex/qa/current/desktop-modal-cedar-point.png
.codex/qa/current/desktop-modal-cellular-router.png
.codex/qa/current/desktop-modal-ev-charger.png
.codex/qa/current/desktop-modal-extra-window.png
.codex/qa/current/desktop-modal-folding-table.png
.codex/qa/current/desktop-modal-iot-package-fixed.png
.codex/qa/current/desktop-modal-iot-package-longwait.png
.codex/qa/current/desktop-modal-iot-package.png
.codex/qa/current/desktop-modal-paper-wall.png
.codex/qa/current/desktop-modal-ribbed-steel-white.png
.codex/qa/current/desktop-modal-satellite-internet.png
.codex/qa/current/desktop-modal-security-package.png
.codex/qa/current/desktop-modal-silk-wallpaper.png
.codex/qa/current/desktop-modal-smart-lock.png
.codex/qa/current/desktop-modal-solar-panel.png
.codex/qa/current/desktop-modal-spc-natural-oak.png
.codex/qa/current/desktop-modal-spc-white-oak.png
.codex/qa/current/desktop-modal-standard-lock.png
.codex/qa/current/desktop-modal-zinc-gray.png
.codex/qa/current/desktop-option-modal-basic-window.png
.codex/qa/current/desktop-option-modal-iot-package.png
.codex/qa/current/desktop-option-modal-mini-washer.png
.codex/qa/current/desktop-option-modal-solar-panel.png
.codex/qa/current/desktop-option-modal-zinc-gray.png
.codex/qa/current/desktop-solution-after-cachefix.png
.codex/qa/current/desktop-solution.png
.codex/qa/current/mobile-customize-after-cachefix.png
.codex/qa/current/mobile-customize-initial.png
.codex/qa/current/mobile-home-header-after-cachefix.png
.codex/qa/current/mobile-home-header.png
.codex/qa/current/mobile-solution-after-cachefix.png
.codex/qa/current/mobile-solution.png
.codex/qa/current/option-file-stats.json
.codex/qa/current/tablet-customize-after-cachefix.png
.codex/qa/current/tablet-customize-initial.png
.codex/qa/current/tablet-home-header-after-cachefix.png
.codex/qa/current/tablet-home-header.png
.codex/qa/current/tablet-solution-after-cachefix.png
.codex/qa/current/tablet-solution.png
.codex/qa/current/visual-summary.json
app/solution/energy/layout.tsx
app/solution/energy/page.tsx
public/images/customize/options/basic-bathroom.webp
public/images/customize/options/basic-sink.webp
public/images/customize/options/basic-window.webp
public/images/customize/options/bed-frame.webp
public/images/customize/options/bidet.webp
public/images/customize/options/birch-panel.webp
public/images/customize/options/built-in-fridge.webp
public/images/customize/options/built-in-storage.webp
public/images/customize/options/cedar-point.webp
public/images/customize/options/cellular-router.webp
public/images/customize/options/dry-vanity.webp
public/images/customize/options/ess.webp
public/images/customize/options/ev-charger.webp
public/images/customize/options/extra-window.webp
public/images/customize/options/folding-table.webp
public/images/customize/options/iot-package.webp
public/images/customize/options/mini-washer.webp
public/images/customize/options/paper-wall.webp
public/images/customize/options/porcelain-tile.webp
public/images/customize/options/ribbed-steel-white.webp
public/images/customize/options/satellite-internet.webp
public/images/customize/options/security-package.webp
public/images/customize/options/silk-wallpaper.webp
public/images/customize/options/smart-lock.webp
public/images/customize/options/solar-panel.webp
public/images/customize/options/spc-natural-oak.webp
public/images/customize/options/spc-white-oak.webp
public/images/customize/options/standard-lock.webp
public/images/customize/options/wide-window.webp
public/images/customize/options/zinc-gray.webp

```

## Relevant File Excerpts

### components/customize/CustomizeConfigurator.tsx (steps, modal image, floorplan)

```tsx
  70:   bathroom: (box) => ({ x: box.x + box.width - 148, y: box.y + 78 }),
  71:   furniture: (box, index) => ({ x: box.x + box.width * 0.36, y: box.y + 82 + index * 34 }),
  72:   energy: (box, index) => ({ x: box.x + 70 + index * 108, y: box.y - 42 }),
  73:   connectivity: (box, index) => ({ x: box.x + box.width - 208 + index * 96, y: box.y - 42 }),
  74: };
  75:
  76: const PLACEHOLDER_FLOORPLAN_PATH = '/images/customize/dummy-base.svg';
  77: const MODEL_FALLBACK_FLOORPLANS: Record<string, string> = {
  78:   'compact-3x6': '/images/customize/compact-3x6-base.svg',
  79:   'standard-3x9': '/images/customize/standard-3x9-base.svg',
  80: };
  81: const OPTION_IMAGE_VERSION = '20260610-0137';
  82: type FloorplanImageStatus = 'missing' | 'loading' | 'loaded' | 'failed';
  83:
  84: type ConfigStep = 'space' | 'included' | 'mood' | 'smart';
  85: const STEPS: { id: ConfigStep; label: string; categories?: string[] }[] = [
  86:   { id: 'space', label: '모델', categories: ['model'] },
  87:   { id: 'included', label: '공간 구성', categories: ['windows', 'door', 'sink', 'bathroom', 'furniture'] },
  88:   { id: 'mood', label: '무드 & 소재', categories: ['exterior', 'interior', 'flooring'] },
  89:   { id: 'smart', label: '스마트 테크', categories: ['energy', 'connectivity'] },
  90: ];
  91:
  92: type ConsultationDraft = {
  93:   customerName: string;
  94:   phone: string;
  95:   region: string;
  96:   purchaseTimeline: string;
  97:   landType: string;
  98:   installAddress: string;
  99:   budgetRange: string;
 100:   memo: string;
 101: };
 102:
 103: const inputClass = 'h-11 rounded-lg border-gray-300 bg-[#fbfaf7] text-sm focus-visible:ring-[#b88b26]';
 104: const selectClass = 'h-11 w-full rounded-lg border border-gray-300 bg-[#fbfaf7] px-3 text-sm outline-none focus:ring-2 focus:ring-[#b88b26]/30';
 105:
 106: function floorplanImagePathForModel(model: CustomizeModel) {
 107:   const configuredPath = model.floorplanImagePath?.trim();
 108:   const fallbackPath = MODEL_FALLBACK_FLOORPLANS[model.id];
 109:
 110:   if (!configuredPath) return fallbackPath ?? null;
 111:   if (configuredPath === PLACEHOLDER_FLOORPLAN_PATH) return fallbackPath ?? configuredPath;
 112:   return configuredPath;
 113: }
 114:
 115: function buildSelectionsForModelChange(

 189: function StepperBar({ currentStep, setCurrentStep, stepCounts }: { currentStep: ConfigStep; setCurrentStep: (step: ConfigStep) => void; stepCounts: Record<ConfigStep, number> }) {
 190:   const stepIndex = STEPS.findIndex((s) => s.id === currentStep);
 191:   return (
 192:     <div className="border-b border-[#d8d0c3] bg-[#fbfaf7]/95 px-4 py-3 backdrop-blur lg:px-10">
 193:       <div className="mx-auto flex max-w-[1800px] w-full gap-1 rounded-lg bg-[#efe6d4] p-1">
 194:         {STEPS.map((step, index) => {
 195:           const isCurrent = currentStep === step.id;
 196:           const isComplete = index < stepIndex;
 197:
 198:           return (
 199:             <button
 200:               key={step.id}
 201:               type="button"
 202:               data-testid={`customize-step-${step.id}`}
 203:               aria-current={isCurrent ? 'step' : undefined}
 204:               data-state={isCurrent ? 'current' : isComplete ? 'complete' : 'upcoming'}
 205:               onClick={() => setCurrentStep(step.id)}
 206:               className={cn(
 207:                 'relative flex min-h-9 flex-1 items-center justify-center rounded-md px-1 py-2 text-xs font-bold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#b88b26]',
 208:                 isCurrent && 'bg-[#fbfaf7] text-[#2f3432] shadow-sm',
 209:                 !isCurrent && isComplete && 'bg-[#e6dcc9] text-[#4f473d]',
 210:                 !isCurrent && !isComplete && 'text-[#8a806f] hover:text-[#2f3432]'
 211:               )}
 212:             >
 213:               {step.label}
 214:               {stepCounts[step.id] > 0 && step.id !== 'space' && (
 215:                 <span aria-hidden="true" className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#b88b26] px-1 text-[9px] text-white">
 216:                   {stepCounts[step.id]}
 217:                 </span>
 218:               )}
 219:             </button>
 220:           );
 221:         })}
 222:       </div>

 783:     <svg viewBox="0 0 1000 420" className={cn('aspect-[1000/420] w-full', className)} data-testid={testId}>
 784:       <defs>
 785:         <pattern id={gridId} width="24" height="24" patternUnits="userSpaceOnUse">
 786:           <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#e4ddd1" strokeWidth="1" />
 787:         </pattern>
 788:       </defs>
 789:       <rect width="1000" height="420" fill="#f5f1ea" />
 790:
 791:       {hasBaseImage ? (
 792:         <g className="transition-all duration-[600ms] motion-reduce:transition-none">
 793:           <image
 794:             data-testid="base-floorplan-image"
 795:             href={resolvedFloorplanImagePath ?? undefined}
 796:             x="0"
 797:             y="0"
 798:             width="1000"
 799:             height="420"
 800:             preserveAspectRatio="xMidYMid meet"
 801:           />
 802:         </g>
 803:       ) : (
 804:         <>
 805:           <rect x={box.x} y={box.y} width={box.width} height={box.height} fill="#f8f4ec" stroke="#2f3432" strokeWidth="12" className="transition-all duration-[600ms] motion-reduce:transition-none" />
 806:           <rect x={box.x + 12} y={box.y + 12} width={box.width - 24} height={box.height - 24} fill={`url(#${gridId})`} stroke="#bfb4a2" strokeWidth="2" className="transition-all duration-[600ms] motion-reduce:transition-none" />
 807:           <BasePlanObjects box={box} />
 808:         </>
 809:       )}
 810:
 811:       {!hasBaseImage && (
 812:         <rect
 813:           data-testid="model-footprint"
 814:           x={box.x}
 815:           y={box.y}
 816:           width={box.width}
 817:           height={box.height}
 818:           fill="transparent"
 819:           stroke="#2f3432"
 820:           strokeWidth="6"
 821:           className="transition-all duration-[600ms] motion-reduce:transition-none"
 822:         />
 823:       )}
 824:
 825:       <motion.rect
 826:         data-testid="floorplan-expansion-shell"
 827:         initial={false}
 828:         animate={{ x: box.x, width: box.width }}
 829:         transition={{ duration: 0.6, ease: "easeInOut" }}
 830:         y={box.y}
 831:         height={box.height}
 832:         rx="6"
 833:         fill="transparent"

1015:   const optionKey = option.key || option.id;
1016:   const fallback = FALLBACK_CATALOG[optionKey] || FALLBACK_CATALOG[option.id];
1017:
1018:   const imagePath = `/images/customize/options/${optionKey}.webp?v=${OPTION_IMAGE_VERSION}`;
1019:   const desc = option.detailDescriptionKo || option.shortDescriptionKo || fallback?.desc || '상세 정보가 준비 중입니다.';
1020:   const specs = fallback?.specs || [];
1021:
1022:   return (
1023:     <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#4b4033]/35 p-4" onClick={onClose}>
1024:       <div className="w-full max-w-xl rounded-lg bg-[#fbfaf7] p-5 shadow-2xl" onClick={(event) => event.stopPropagation()}>
1025:         <div className="mb-4 flex items-start justify-between gap-4">
1026:           <div>
1027:             <div className="mb-1 flex items-center gap-2">
1028:               {option.priceType === 'included' && <span className="rounded bg-[#efe6d4] px-2 py-0.5 text-[11px] font-black text-[#8a806f]">기본 포함</span>}
1029:               {option.priceType === 'consult' && <span className="rounded bg-[#f4f0e8] px-2 py-0.5 text-[11px] font-black text-[#a56f16]">스펙 협의</span>}
1030:               {option.priceType === 'fixed' && <p className="text-xs font-bold text-[#8a806f]">{formatOptionPrice(option)}</p>}
1031:             </div>
1032:             <h3 className="text-xl font-black text-[#2f3432]">{option.nameKo}</h3>
1033:           </div>
1034:           <Button variant="ghost" size="icon-sm" onClick={onClose}>
1035:             <X className="h-4 w-4" />
1036:           </Button>
1037:         </div>
1038:         <div className="relative mb-4 aspect-[16/9] overflow-hidden rounded-lg bg-[#eee8dc]">
1039:           <Image
1040:             src={imagePath}
1041:             alt={option.nameKo}
1042:             fill
1043:             unoptimized
1044:             sizes="(max-width: 768px) calc(100vw - 48px), 560px"
1045:             className="object-cover"
1046:             onError={(e) => { e.currentTarget.style.display = 'none'; }}
1047:           />
1048:         </div>
1049:         {specs.length > 0 && (
1050:           <div className="mb-3 flex flex-wrap gap-2">
```

### components/layout/Header.tsx (order CTA)

```tsx
   1: 'use client';
   2:
   3: import { useState, useEffect, useCallback } from 'react';
   4: import Link from 'next/link';
   5: import Image from 'next/image';
   6: import { Menu, X, Instagram, Carrot, ChevronDown } from 'lucide-react';
   7: import { motion, AnimatePresence } from 'framer-motion';
   8: import { createPortal } from 'react-dom';
   9: import { cn } from '@/lib/utils';
  10: import { useLanguage } from '@/contexts/LanguageContext';
  11:
  12: const navigationKo = [
  13:   {
  14:     name: '모듈러건축 소개',
  15:     href: '/modular',
  16:     width: 145,
  17:     submenu: [
  18:       { name: '모듈러 건축이란?', href: '/modular#what-is-modular' },
  19:       { name: '공장 제작', href: '/modular#factory-precision' },
  20:       { name: '운송 및 조립', href: '/modular#transport-install' },
  21:       { name: '생활과 운영', href: '/modular#interior-comfort' },
  22:       { name: '미래 확장/이동', href: '/modular#flexible-commercial' },
  23:     ],
  24:   },
  25:   {
  26:     name: '제품 소개',
  27:     href: '/products',
  28:     width: 75,
  29:     submenu: [
  30:       { name: 'S', href: '/products#s' },
  31:       { name: 'M', href: '/products#m' },
  32:       { name: 'L', href: '/products#l' },
  33:       { name: 'XL', href: '/products#xl' },
  34:       { name: '프로젝트', href: '/projects' },
  35:     ],
  36:   },
  37:   {
  38:     name: 'BESPOKE',
  39:     href: '/bespoke',
  40:     width: 100,
  41:     submenu: [
  42:       { name: '상업 공간 맞춤 솔루션', href: '/bespoke#what-is-bespoke' },
  43:       { name: '카페/매장', href: '/bespoke#small-cafe' },
  44:       { name: '팝업/쇼룸', href: '/bespoke#popup-store' },
  45:       { name: '숙박/워크스페이스', href: '/bespoke#accommodation' },
  46:       { name: '스마트팜/랩', href: '/bespoke#smart-farm' },
  47:     ],
  48:   },
  49:
  50:   {
  51:     name: 'SOLUTION',
  52:     href: '/solution',
  53:     width: 155,
  54:     submenu: [
  55:       { name: '운영 솔루션', href: '/solution' },
  56:       { name: '보안 (Security)', href: '/solution/cctv' },
  57:       { name: '네트워크 (Network)', href: '/solution/network' },
  58:       { name: '원격 제어 (Control)', href: '/solution/iot' },
  59:       { name: '에너지 (Energy Stack)', href: '/solution/energy' },
  60:     ],
  61:   },
  62:   {
  63:     name: '회사소개',
  64:     href: '/company',
  65:     width: 85,
  66:     submenu: [
  67:       { name: '우리의 철학', href: '/company#philosophy' },
  68:       { name: '기업 CI', href: '/company#ci' },
  69:       { name: '위트 크루', href: '/company#crew' },
  70:       { name: '위트 팩토리', href: '/company#factory' },
  71:       { name: '위트 갤러리', href: '/company#gallery' },
  72:     ],
  73:   },
  74:   {
  75:     name: '고객지원',
  76:     href: '/support',
  77:     width: 75,
  78:     submenu: [
  79:       { name: '무엇을 도와드릴까요?', href: '/support#help' },
  80:       { name: '구매과정', href: '/support#process' },
  81:       { name: 'QnA', href: '/support#qa' },
  82:       { name: 'A/S', href: '/support#as' },
  83:     ],
  84:   },
  85: ];
  86:
  87: const navigationEn = [
  88:   {
  89:     name: 'About Modular',
  90:     href: '/modular',
  91:     width: 145,
  92:     submenu: [
  93:       { name: 'What is Modular?', href: '/modular#what-is-modular' },
  94:       { name: 'Factory Precision', href: '/modular#factory-precision' },
  95:       { name: 'Transport & Install', href: '/modular#transport-install' },
  96:       { name: 'Living Comfort', href: '/modular#interior-comfort' },
  97:       { name: 'Future Expansion', href: '/modular#flexible-commercial' },
  98:     ],
  99:   },
 100:   {
 101:     name: 'Products',
 102:     href: '/products',
 103:     width: 75,
 104:     submenu: [
 105:       { name: 'S', href: '/products#s' },
 106:       { name: 'M', href: '/products#m' },
 107:       { name: 'L', href: '/products#l' },
 108:       { name: 'XL', href: '/products#xl' },
 109:       { name: 'Projects', href: '/projects' },
 110:     ],
 111:   },
 112:   {
 113:     name: 'BESPOKE',
 114:     href: '/bespoke',
 115:     width: 100,
 116:     submenu: [
 117:       { name: 'Commercial Custom Solution', href: '/bespoke#what-is-bespoke' },
 118:       { name: 'Cafe & Store', href: '/bespoke#small-cafe' },
 119:       { name: 'Pop-up & Showroom', href: '/bespoke#popup-store' },
 120:       { name: 'Stay & Workspace', href: '/bespoke#accommodation' },
 121:       { name: 'Smart Farm & Lab', href: '/bespoke#smart-farm' },
 122:     ],
 123:   },
 124:
 125:   {
 126:     name: 'SOLUTION',
 127:     href: '/solution',
 128:     width: 155,
 129:     submenu: [
 130:       { name: 'Operational Packages', href: '/solution' },
 131:       { name: 'Security Core', href: '/solution/cctv' },
 132:       { name: 'Network Fabric', href: '/solution/network' },
 133:       { name: 'Control Layer', href: '/solution/iot' },
 134:       { name: 'Energy Stack', href: '/solution/energy' },
 135:     ],
 136:   },
 137:   {
 138:     name: 'Company',
 139:     href: '/company',
 140:     width: 85,
 141:     submenu: [
 142:       { name: 'Our Philosophy', href: '/company#philosophy' },
 143:       { name: 'Corporate CI', href: '/company#ci' },
 144:       { name: 'weet Crew', href: '/company#crew' },
 145:       { name: 'weet Factory', href: '/company#factory' },
 146:       { name: 'weet Gallery', href: '/company#gallery' },
 147:     ],
 148:   },
 149:   {
 150:     name: 'Support',
 151:     href: '/support',
 152:     width: 75,
 153:     submenu: [
 154:       { name: 'How can we help?', href: '/support#help' },
 155:       { name: 'Purchase Process', href: '/support#process' },
 156:       { name: 'QnA', href: '/support#qa' },
 157:       { name: 'A/S', href: '/support#as' },
 158:     ],
 159:   },
 160: ];
 161:
 162: export default function Header() {
 163:   const [showMegaMenu, setShowMegaMenu] = useState(false);
 164:   const [activeMenu, setActiveMenu] = useState<string | null>(null);
 165:   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
 166:   const [isVisible, setIsVisible] = useState(true);
 167:   const [lastScrollY, setLastScrollY] = useState(0);
 168:   const { language, setLanguage } = useLanguage();
 169:
 170:   const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
 171:   const navigation = language === 'KO' ? navigationKo : navigationEn;
 172:
 173:   const handleMobileMenuToggle = useCallback(() => {
 174:     setMobileMenuOpen(prev => !prev);
 175:   }, []);
 176:
 177:   const handleMobileMenuClose = useCallback(() => {
 178:     setMobileMenuOpen(false);
 179:   }, []);
 180:
 181:   const handleMegaMenuEnter = useCallback(() => {
 182:     setShowMegaMenu(true);
 183:   }, []);
 184:
 185:   const handleMegaMenuLeave = useCallback(() => {
 186:     if (window.innerWidth >= 1024) {
 187:       setShowMegaMenu(false);
 188:       setActiveMenu(null);
 189:     }
 190:   }, []);
```

### app/solution/page.tsx (technical option page concept)

```tsx
   1: "use client";
   2:
   3: import Image from "next/image";
   4: import Link from "next/link";
   5: import type { LucideIcon } from "lucide-react";
   6: import {
   7:   ArrowRight,
   8:   CheckCircle2,
   9:   LockKeyhole,
  10:   Router,
  11:   SlidersHorizontal,
  12:   Zap,
  13: } from "lucide-react";
  14: import { useLanguage } from "@/contexts/LanguageContext";
  15:
  16: type Lang = "KO" | "EN";
  17:
  18: type PackageCopy = {
  19:   id: string;
  20:   href: string;
  21:   image: string;
  22:   icon: LucideIcon;
  23:   title: string;
  24:   subtitle: string;
  25:   problem: string;
  26:   promise: string;
  27:   details: string[];
  28:   proof: string;
  29: };
  30:
  31: type PageCopy = {
  32:   eyebrow: string;
  33:   title: string;
  34:   lead: string;
  35:   heroLabel: string;
  36:   heroTitle: string;
  37:   heroBody: string;
  38:   selectLabel: string;
  39:   detailLabel: string;
  40:   proofLabel: string;
  41:   processTitle: string;
  42:   processLead: string;
  43:   ctaPrimary: string;
  44:   ctaSecondary: string;
  45:   packages: PackageCopy[];
  46:   process: Array<{ title: string; body: string }>;
  47: };
  48:
  49: const COPY: Record<Lang, PageCopy> = {
  50:   KO: {
  51:     eyebrow: "WEET OPERATION OPTIONS",
  52:     title: "테크 옵션으로 완성하는 모듈러 공간",
  53:     lead:
  54:       "Weet 솔루션은 장비 나열이 아니라 보안, 네트워크, 제어, 에너지 스택을 공간 목적에 맞춰 조합하는 테크 옵션 레이어입니다.",
  55:     heroLabel: "옵션은 장식이 아니라 운영 시스템입니다",
  56:     heroTitle: "스펙보다 먼저 사용 흐름과 제어 범위를 정의합니다.",
  57:     heroBody:
  58:       "출입 권한, 결제망, 원격 제어, 전력 부하를 먼저 정리한 뒤 실제로 필요한 옵션만 선택합니다.",
  59:     selectLabel: "선택 기준",
  60:     detailLabel: "포함 스펙",
  61:     proofLabel: "운영자가 체감하는 변화",
  62:     processTitle: "옵션을 붙이는 방식도 다릅니다",
  63:     processLead:
  64:       "완공 후 장비를 덧붙이는 방식이 아니라, 배선·센서·제어 패널·전력 부하를 설계 단계에서 함께 잡습니다.",
  65:     ctaPrimary: "주문 옵션 확인",
  66:     ctaSecondary: "테크 옵션 문의",
  67:     packages: [
  68:       {
  69:         id: "security",
  70:         href: "/solution/cctv",
  71:         image: "/images/solution/generated/kr-security-realphoto.webp",
  72:         icon: LockKeyhole,
  73:         title: "보안 코어 (Security Core)",
  74:         subtitle: "CCTV · 스마트락 · 센서 및 접근 로깅",
  75:         problem: "야간·무인 운영에서 생기는 보안 공백을 줄입니다.",
  76:         promise: "출입 기록, 야간 감지, 현관 조명을 하나의 운영 흐름으로 설계합니다.",
  77:         details: ["현관/창측 사각지대 검토", "CCTV와 센서등 위치 제안", "스마트락 권한/접근 방식 정리"],
  78:         proof: "밤에도 누가 들어왔는지, 어떤 알림을 받아야 하는지 명확해집니다.",
  79:       },
  80:       {
  81:         id: "network",
  82:         href: "/solution/network",
  83:         image: "/images/solution/generated/kr-network-realphoto.webp",
  84:         icon: Router,
  85:         title: "네트워크 패브릭 (Network Fabric)",
  86:         subtitle: "POS · 게스트 Wi-Fi · 라우터/위성망",
  87:         problem: "결제, 예약, 원격 제어가 인터넷 품질에 묶이는 리스크를 줄입니다.",
  88:         promise: "운영망, 고객망, 장비망을 구분하고 용도별 회선과 라우터 구성을 제안합니다.",
  89:         details: ["POS/업무/게스트망 분리", "라우터/위성망/LTE 통신함 계획", "백업 회선 필요성 점검"],
  90:         proof: "카드 결제와 예약 확인이 고객 Wi-Fi 트래픽에 덜 흔들립니다.",
  91:       },
  92:       {
  93:         id: "control",
  94:         href: "/solution/iot",
  95:         image: "/images/solution/generated/kr-control-realphoto.webp",
  96:         icon: SlidersHorizontal,
  97:         title: "제어 계층 (Control Layer)",
  98:         subtitle: "IoT 조명 · 냉난방 제어 · 환기 스케줄링",
  99:         problem: "입실 전마다 수동으로 확인해야 하는 반복 업무를 줄입니다.",
 100:         promise: "조명, 공조, 환기, 도어 상태를 예약과 운영 시간에 맞춰 제어할 수 있게 구성합니다.",
 101:         details: ["스마트 스위치/온도 패널", "입실 전 냉난방 자동 스케줄", "도어 상태 및 운영 알림"],
 102:         proof: "고객이 도착하기 전 공간 상태를 미리 준비하고, 불필요한 방문을 줄입니다.",
 103:       },
 104:       {
 105:         id: "energy",
 106:         href: "/solution/energy",
 107:         image: "/images/customize/options/solar-panel.webp",
 108:         icon: Zap,
 109:         title: "에너지 스택 (Energy Stack)",
 110:         subtitle: "태양광 · ESS · EV 충전기 · 부하 설계",
 111:         problem: "높은 전기 요금과 전력 수급 불안정 리스크를 해소합니다.",
 112:         promise: "안정적이고 효율적인 전력 인프라로 독립적인 모듈러 운영을 지원합니다.",
 113:         details: ["태양광 패널 지붕 통합", "잉여 전력 보관용 ESS 연동", "방문객 EV 충전기 및 부하 설계"],
 114:         proof: "전력 사용량이 체계적으로 관리되고, 에너지 독립성이 강화됩니다.",
 115:       },
 116:     ],
 117:     process: [
 118:       { title: "사용 흐름 진단", body: "무인, 상시 상주, 전력 부하, 네트워크 환경을 먼저 파악합니다." },
 119:       { title: "시스템 맵 구성", body: "출입, 통신, 공조, 전력 연결 지점을 하나의 옵션 맵으로 정리합니다." },
 120:       { title: "필요 옵션만 확정", body: "장비 스펙보다 운영자가 실제로 받을 알림과 제어 범위를 먼저 정합니다." },
 121:     ],
 122:   },
 123:   EN: {
 124:     eyebrow: "WEET OPERATION OPTIONS",
 125:     title: "Modular Spaces Completed With Tech Options",
 126:     lead:
 127:       "A good space does not end with a beautiful shell. Weet plans security, connection, remote control, and energy management around the problems operators face every day.",
 128:     heroLabel: "Options are operating systems",
 129:     heroTitle: "We define usage flow and control scope before device specs.",
 130:     heroBody:
 131:       "We check whether the space runs unmanned, whether payments must never fail, and whether power load is stable, before combining the right options.",
 132:     selectLabel: "Selection Criteria",
 133:     detailLabel: "Included Specs",
 134:     proofLabel: "Operational change",
 135:     processTitle: "The option workflow is different",
 136:     processLead:
 137:       "We do not bolt devices on after completion. Wiring, sensors, control panels, and power loads are planned with the space.",
 138:     ctaPrimary: "Check Options",
 139:     ctaSecondary: "Consultation",
 140:     packages: [
 141:       {
 142:         id: "security",
 143:         href: "/solution/cctv",
 144:         image: "/images/solution/generated/kr-security-realphoto.webp",
 145:         icon: LockKeyhole,
 146:         title: "Security Core",
 147:         subtitle: "CCTV · smart lock · sensors/access logging",
 148:         problem: "Reduce security gaps in night and unmanned operations.",
 149:         promise: "Access logs, night detection, and entrance lighting are planned as one operating flow.",
 150:         details: ["Blind-spot review", "CCTV and sensor-light placement", "Smart-lock permission planning"],
 151:         proof: "Operators know who entered at night and which alerts deserve attention.",
 152:       },
 153:       {
 154:         id: "network",
 155:         href: "/solution/network",
 156:         image: "/images/solution/generated/kr-network-realphoto.webp",
 157:         icon: Router,
 158:         title: "Network Fabric",
 159:         subtitle: "POS · guest Wi-Fi · router/satellite readiness",
 160:         problem: "Reduce losses when payment, booking, or remote control depends on unstable connectivity.",
 161:         promise: "We separate operator, guest, and device networks and recommend the right line and router.",
 162:         details: ["POS/work/guest network split", "Router and network-box placement", "Backup-line review"],
 163:         proof: "Payments and reservations are less affected by guest traffic and device load.",
 164:       },
 165:       {
 166:         id: "control",
 167:         href: "/solution/iot",
 168:         image: "/images/solution/generated/kr-control-realphoto.webp",
 169:         icon: SlidersHorizontal,
 170:         title: "Control Layer",
 171:         subtitle: "IoT lighting · HVAC · ventilation schedules",
 172:         problem: "Reduce repeated manual checks for unmanned operations.",
 173:         promise: "Lighting, HVAC, ventilation, and door state can follow booking time and operating hours.",
 174:         details: ["Smart switches and temperature panels", "Pre-arrival HVAC schedule", "Door state and operation alerts"],
 175:         proof: "The space can be prepared before guests arrive, with fewer unnecessary visits.",
 176:       },
 177:       {
 178:         id: "energy",
 179:         href: "/solution/energy",
 180:         image: "/images/customize/options/solar-panel.webp",
 181:         icon: Zap,
 182:         title: "Energy Stack",
 183:         subtitle: "solar · ESS · EV charger · load planning",
 184:         problem: "Resolve high utility costs and unstable power supply risks.",
 185:         promise: "We support independent modular operation with stable and efficient power infrastructure.",
 186:         details: ["Roof-integrated solar panels", "ESS for surplus power", "EV chargers and load planning"],
 187:         proof: "Power consumption is systematically managed, and energy independence is strengthened.",
 188:       },
 189:     ],
 190:     process: [
 191:       { title: "Operating interview", body: "We first check unmanned, power load, and network needs." },
 192:       { title: "System map", body: "Access, connection, HVAC, and power points are organized as one option map." },
 193:       { title: "Option confirmation", body: "We define actual alerts and management scope before chasing device specs." },
 194:     ],
 195:   },
 196: };
 197:
 198: export default function SolutionPage() {
 199:   const { language } = useLanguage();
 200:   const copy = COPY[language];
 201:
 202:   return (
 203:     <main className="min-h-screen bg-[#fcfbfa] text-[#2f3432]">
 204:       {/* Hero Section */}
 205:       <section className="mx-auto max-w-[1200px] px-6 pb-12 pt-28 md:px-10 lg:pb-16 lg:pt-36">
 206:         <div className="grid gap-8 border-b border-[#e6dfd3] pb-10 lg:grid-cols-[1fr_0.8fr] lg:gap-16 lg:pb-14">
 207:           <div>
 208:             <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0d6e66]">{copy.eyebrow}</p>
 209:             <h1 className="mt-4 text-4xl font-black leading-tight text-[#2f3432] md:text-5xl lg:text-6xl break-keep">
 210:               {copy.title}
 211:             </h1>
 212:             <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#5a625e] md:text-xl break-keep">
 213:               {copy.lead}
 214:             </p>
 215:           </div>
 216:
 217:           <div className="self-end rounded-lg border border-[#e6dfd3] bg-[#f5f2eb] p-6 shadow-sm">
 218:             <div className="flex items-center gap-2 mb-3">
 219:               <span className="flex h-2 w-2 rounded-full bg-[#f5a623]"></span>
 220:               <p className="text-xs font-bold uppercase tracking-wider text-[#7a6a3a]">{copy.heroLabel}</p>
```

### lib/customize/priceCalculator.ts

```ts
   1: import type {
   2:   ConfigShareState,
   3:   CustomizeCatalog,
   4:   CustomizeCategory,
   5:   CustomizeModel,
   6:   CustomizeOption,
   7:   EstimateBreakdown,
   8:   SelectedOptions,
   9: } from './types';
  10:
  11: export function formatWon(value: number) {
  12:   return `₩${Math.max(0, value).toLocaleString('ko-KR')}`;
  13: }
  14:
  15: export function formatModelStartPrice(value: number) {
  16:   return `${formatWon(value)}부터`;
  17: }
  18:
  19: export function formatOptionPrice(option: Pick<CustomizeOption, 'priceType' | 'price'>) {
  20:   if (option.priceType === 'included') return '포함';
  21:   if (option.priceType === 'consult') return '협의';
  22:   return formatWon(option.price);
  23: }
  24:
  25: export function optionPriceValue(option: Pick<CustomizeOption, 'priceType' | 'price'>) {
  26:   return option.priceType === 'fixed' ? option.price : 0;
  27: }
  28:
  29: export function optionsForModel(options: CustomizeOption[], modelId: string) {
  30:   return options.filter((option) => option.availableModelIds.length === 0 || option.availableModelIds.includes(modelId));
  31: }
  32:
  33: export function getDefaultSelections(catalog: CustomizeCatalog, modelId: string): SelectedOptions {
  34:   const selections: SelectedOptions = {};
  35:   const availableOptions = optionsForModel(catalog.options.filter((option) => option.isActive), modelId);
  36:
  37:   for (const category of catalog.categories.filter((item) => item.isActive)) {
  38:     const defaults = availableOptions
  39:       .filter((option) => option.categoryId === category.id && option.isDefault)
  40:       .map((option) => option.id);
  41:
  42:     if (defaults.length > 0) {
  43:       selections[category.id] = category.selectionType === 'single' ? [defaults[0]] : defaults;
  44:     }
  45:   }
  46:
  47:   return selections;
  48: }
  49:
  50: export function selectedOptionIds(selectedOptions: SelectedOptions) {
  51:   return Object.values(selectedOptions).flat().filter(Boolean);
  52: }
  53:
  54: export function selectedOptionList(catalog: CustomizeCatalog, selectedOptions: SelectedOptions, modelId: string) {
  55:   const selected = new Set(selectedOptionIds(selectedOptions));
  56:   return optionsForModel(catalog.options, modelId).filter((option) => selected.has(option.id));
  57: }
  58:
  59: export function getConflictingOptionIds(catalog: CustomizeCatalog, optionId: string) {
  60:   return catalog.conflicts
  61:     .filter((conflict) => conflict.optionId === optionId)
  62:     .map((conflict) => conflict.conflictsWithOptionId);
  63: }
  64:
  65: export function hasConflict(catalog: CustomizeCatalog, optionIds: string[]) {
  66:   const selected = new Set(optionIds);
  67:   return catalog.conflicts.some(
  68:     (conflict) => selected.has(conflict.optionId) && selected.has(conflict.conflictsWithOptionId)
  69:   );
  70: }
  71:
  72: export function toggleOptionSelection(params: {
  73:   catalog: CustomizeCatalog;
  74:   selectedOptions: SelectedOptions;
  75:   category: CustomizeCategory;
  76:   option: CustomizeOption;
  77: }) {
  78:   const { catalog, selectedOptions, category, option } = params;
  79:   const next: SelectedOptions = { ...selectedOptions };
  80:   const current = next[category.id] ?? [];
  81:
  82:   if (category.selectionType === 'single') {
  83:     next[category.id] = [option.id];
  84:   } else {
  85:     next[category.id] = current.includes(option.id)
  86:       ? current.filter((id) => id !== option.id)
  87:       : [...current, option.id];
  88:   }
  89:
  90:   const conflicts = new Set(getConflictingOptionIds(catalog, option.id));
  91:   if (conflicts.size > 0) {
  92:     for (const [categoryId, ids] of Object.entries(next)) {
  93:       next[categoryId] = ids.filter((id) => !conflicts.has(id));
  94:     }
  95:   }
  96:
  97:   return next;
  98: }
  99:
 100: export function calculateEstimate(catalog: CustomizeCatalog, modelId: string, selectedOptions: SelectedOptions): EstimateBreakdown | null {
 101:   const model = catalog.models.find((item) => item.id === modelId && item.isActive);
 102:   if (!model) return null;
 103:
 104:   const options = selectedOptionList(catalog, selectedOptions, modelId);
 105:   const optionTotal = options.reduce((sum, option) => sum + optionPriceValue(option), 0);
 106:
 107:   return {
 108:     model,
 109:     selectedOptions: options,
 110:     optionTotal,
 111:     estimatedTotal: model.basePrice + optionTotal,
 112:     consultOptionCount: options.filter((option) => option.priceType === 'consult').length,
 113:   };
 114: }
 115:
 116: export function floorplanSize(model: CustomizeModel) {
 117:   const width = model.id === 'standard-3x9' || model.lengthM >= 9 ? 900 : 600;
 118:   return { x: 500 - width / 2, y: 60, width, height: 300 };
 119: }
 120:
 121: function encodeBase64Url(value: string) {
 122:   const base64 = typeof Buffer !== 'undefined' && typeof window === 'undefined'
 123:     ? Buffer.from(value, 'utf8').toString('base64')
 124:     : btoa(unescape(encodeURIComponent(value)));
 125:
 126:   return base64
 127:     .replace(/\+/g, '-')
 128:     .replace(/\//g, '_')
 129:     .replace(/=+$/g, '');
 130: }
```

## Commands Run / Output Summary

```text
git diff --check: PASS
npm run lint: PASS
npm test: PASS (3 files, 20 tests)
npm run build: PASS (Next middleware-to-proxy deprecation warning persists)
npx playwright test e2e/customize-configurator.spec.ts e2e/public-pages.spec.ts --project=chromium: PASS (22/22; NO_COLOR/FORCE_COLOR warnings, existing LCP warning for Supabase product image)
```

## Browser / Playwright / Visual Findings

```json
{
  "generatedAt": "2026-06-09T16:53:54.567Z",
  "pageCount": 9,
  "modalCount": 23,
  "modalProblems": [],
  "pageProblems": [],
  "stepKeys": {
    "included": [
      "basic-window",
      "extra-window",
      "standard-lock",
      "smart-lock",
      "basic-sink",
      "basic-bathroom",
      "bidet",
      "built-in-storage",
      "folding-table"
    ],
    "mood": [
      "ribbed-steel-white",
      "cedar-point",
      "zinc-gray",
      "paper-wall",
      "birch-panel",
      "silk-wallpaper",
      "spc-white-oak",
      "spc-natural-oak"
    ],
    "smart": [
      "ev-charger",
      "solar-panel",
      "cellular-router",
      "iot-package",
      "satellite-internet",
      "security-package"
    ]
  },
  "expansion": {
    "modelTexts": [
      "Compact 3x6소형 주말주택3m x 6m · 18m²₩27,900,000부터",
      "Standard 3x9프리미엄 거주3m x 9m · 27m²₩34,900,000부터"
    ],
    "beforeExpansion": {
      "imgHref": "/images/customize/compact-3x6-base.svg",
      "preserveAspectRatio": "xMidYMid meet",
      "shellWidth": "600px",
      "shellX": null
    },
    "standardButtonText": "Standard 3x9프리미엄 거주3m x 9m · 27m²₩34,900,000부터",
    "stdCount": 1,
    "afterExpansion": {
      "canvas": {
        "height": 349,
        "width": 830,
        "x": 41,
        "y": 463
      },
      "imgHref": "/images/customize/standard-3x9-base.svg",
      "preserveAspectRatio": "xMidYMid meet",
      "shellWidth": "900px",
      "shellX": null
    }
  },
  "representativeScreenshots": [
    ".codex/qa/current/desktop-solution-after-cachefix.png",
    ".codex/qa/current/desktop-customize-3x9-expansion-final-after-cachefix.png",
    ".codex/qa/current/desktop-modal-iot-package-fixed.png",
    ".codex/qa/current/desktop-modal-cellular-router.png",
    ".codex/qa/current/desktop-modal-solar-panel.png",
    ".codex/qa/current/mobile-customize-after-cachefix.png",
    ".codex/qa/current/mobile-home-header-after-cachefix.png"
  ],
  "optionFileStats": {
    "count": 30,
    "minBytes": 30834,
    "maxBytes": 261176
  }
}
```

Manual visual checks performed on the actual screenshots:
- desktop-modal-iot-package-fixed.png shows the IoT image rendered after the unoptimized fix.
- desktop-modal-cellular-router.png and desktop-modal-solar-panel.png show option-specific real-photo images.
- desktop-customize-3x9-expansion-final-after-cachefix.png shows centered 3x9 floorplan and full-width stepper.
- desktop-solution-after-cachefix.png shows a light technical option concept, not the previous black/card-heavy field concept.
- mobile-customize-after-cachefix.png shows no horizontal overflow and the bottom 주문하기 bar is reachable.

## Current Failures Or Risks

- The 30 option image files exist. Current public catalog only exposes 23 option-info buttons in the visible default catalog state; mini-washer, bed-frame, and ess are asset-ready but not currently visible options.
- Next middleware-to-proxy deprecation warning persists.
- Production deployment and real-domain QA are still pending until after closure review, commit, and push.

## Key Git Diff

```diff
diff --git a/app/customize/page.tsx b/app/customize/page.tsx
index 2dd26cd..8c7ffc2 100644
--- a/app/customize/page.tsx
+++ b/app/customize/page.tsx
@@ -6,14 +6,14 @@ export const dynamic = 'force-dynamic';

 export const metadata: Metadata = {
   title: '주문하기',
-  description: '위트 이동식주택을 모델과 옵션별로 구성하고 상담을 요청하세요.',
+  description: '위트 이동식주택을 모델, 공간, 소재, 스마트 옵션별로 구성하고 주문 요청을 남겨보세요.',
   alternates: {
     canonical: '/customize',
   },
   openGraph: {
     url: '/customize',
     title: '주문하기',
-    description: '위트 이동식주택을 모델과 옵션별로 구성하고 상담을 요청하세요.',
+    description: '위트 이동식주택을 모델, 공간, 소재, 스마트 옵션별로 구성하고 주문 요청을 남겨보세요.',
   },
 };

diff --git a/app/solution/page.tsx b/app/solution/page.tsx
index ff918db..7e46a7c 100644
--- a/app/solution/page.tsx
+++ b/app/solution/page.tsx
@@ -7,9 +7,9 @@ import {
   ArrowRight,
   CheckCircle2,
   LockKeyhole,
-  Paintbrush,
   Router,
   SlidersHorizontal,
+  Zap,
 } from "lucide-react";
 import { useLanguage } from "@/contexts/LanguageContext";

@@ -49,32 +49,32 @@ type PageCopy = {
 const COPY: Record<Lang, PageCopy> = {
   KO: {
     eyebrow: "WEET OPERATION OPTIONS",
-    title: "운영까지 준비된 모듈러 공간",
+    title: "테크 옵션으로 완성하는 모듈러 공간",
     lead:
-      "좋은 공간은 예쁜 외관에서 끝나지 않습니다. Weet는 보안, 연결, 원격 준비, 브랜드 마감을 실제 운영자가 매일 겪는 문제 기준으로 설계합니다.",
-    heroLabel: "옵션은 장식이 아니라 운영 리스크 관리입니다",
-    heroTitle: "상담 때 장비명이 아니라 운영 상황부터 묻습니다.",
+      "Weet 솔루션은 장비 나열이 아니라 보안, 네트워크, 제어, 에너지 스택을 공간 목적에 맞춰 조합하는 테크 옵션 레이어입니다.",
+    heroLabel: "옵션은 장식이 아니라 운영 시스템입니다",
+    heroTitle: "스펙보다 먼저 사용 흐름과 제어 범위를 정의합니다.",
     heroBody:
-      "무인으로 열어야 하는지, 결제가 끊기면 안 되는지, 입실 전 냉난방이 필요한지, 상권에서 첫인상이 중요한지부터 확인한 뒤 필요한 옵션만 조합합니다.",
+      "출입 권한, 결제망, 원격 제어, 전력 부하를 먼저 정리한 뒤 실제로 필요한 옵션만 선택합니다.",
     selectLabel: "선택 기준",
-    detailLabel: "포함되는 것",
+    detailLabel: "포함 스펙",
     proofLabel: "운영자가 체감하는 변화",
     processTitle: "옵션을 붙이는 방식도 다릅니다",
     processLead:
-      "완공 후 장비를 덧붙이는 방식이 아니라, 출입 동선·배선·조명·마감 위치를 설계 단계에서 함께 잡습니다.",
+      "완공 후 장비를 덧붙이는 방식이 아니라, 배선·센서·제어 패널·전력 부하를 설계 단계에서 함께 잡습니다.",
     ctaPrimary: "주문 옵션 확인",
-    ctaSecondary: "상담으로 현장 맞추기",
+    ctaSecondary: "테크 옵션 문의",
     packages: [
       {
         id: "security",
         href: "/solution/cctv",
         image: "/images/solution/generated/kr-security-realphoto.webp",
         icon: LockKeyhole,
-        title: "안심 출입",
-        subtitle: "CCTV · 스마트락 · 센서등",
-        problem: "운영자가 항상 머물 수 없는 외곽·야간·예약제 공간의 보안 공백을 줄입니다.",
+        title: "보안 코어 (Security Core)",
+        subtitle: "CCTV · 스마트락 · 센서 및 접근 로깅",
+        problem: "야간·무인 운영에서 생기는 보안 공백을 줄입니다.",
         promise: "출입 기록, 야간 감지, 현관 조명을 하나의 운영 흐름으로 설계합니다.",
-        details: ["현관/창측 사각지대 검토", "CCTV와 센서등 위치 제안", "스마트락 권한 방식 정리"],
+        details: ["현관/창측 사각지대 검토", "CCTV와 센서등 위치 제안", "스마트락 권한/접근 방식 정리"],
         proof: "밤에도 누가 들어왔는지, 어떤 알림을 받아야 하는지 명확해집니다.",
       },
       {
@@ -82,72 +82,72 @@ const COPY: Record<Lang, PageCopy> = {
         href: "/solution/network",
         image: "/images/solution/generated/kr-network-realphoto.webp",
         icon: Router,
-        title: "끊김 없는 연결",
-        subtitle: "POS · 예약 · 게스트 Wi-Fi",
-        problem: "결제, 예약, 원격 제어가 인터넷 품질에 묶이는 상업 공간의 손실 리스크를 줄입니다.",
-        promise: "운영망, 고객망, 장비망을 구분하고 현장 조건에 맞는 회선과 라우터를 제안합니다.",
-        details: ["POS/업무/게스트망 분리", "라우터와 통신함 위치 계획", "백업 회선 필요성 점검"],
-        proof: "카드 결제와 예약 확인이 끊기지 않아 운영자가 현장에서 덜 불안합니다.",
+        title: "네트워크 패브릭 (Network Fabric)",
+        subtitle: "POS · 게스트 Wi-Fi · 라우터/위성망",
+        problem: "결제, 예약, 원격 제어가 인터넷 품질에 묶이는 리스크를 줄입니다.",
+        promise: "운영망, 고객망, 장비망을 구분하고 용도별 회선과 라우터 구성을 제안합니다.",
+        details: ["POS/업무/게스트망 분리", "라우터/위성망/LTE 통신함 계획", "백업 회선 필요성 점검"],
+        proof: "카드 결제와 예약 확인이 고객 Wi-Fi 트래픽에 덜 흔들립니다.",
       },
       {
         id: "control",
         href: "/solution/iot",
         image: "/images/solution/generated/kr-control-realphoto.webp",
         icon: SlidersHorizontal,
-        title: "원격 준비",
-        subtitle: "조명 · 냉난방 · 환기",
-        problem: "입실 전마다 현장에 가야 하는 숙박·체험·무인 운영의 반복 업무를 줄입니다.",
+        title: "제어 계층 (Control Layer)",
+        subtitle: "IoT 조명 · 냉난방 제어 · 환기 스케줄링",
+        problem: "입실 전마다 수동으로 확인해야 하는 반복 업무를 줄입니다.",
         promise: "조명, 공조, 환기, 도어 상태를 예약과 운영 시간에 맞춰 제어할 수 있게 구성합니다.",
-        details: ["스마트 스위치/온도 패널", "입실 전 냉난방 스케줄", "도어 상태와 운영 알림"],
+        details: ["스마트 스위치/온도 패널", "입실 전 냉난방 자동 스케줄", "도어 상태 및 운영 알림"],
         proof: "고객이 도착하기 전 공간 상태를 미리 준비하고, 불필요한 방문을 줄입니다.",
       },
       {
-        id: "brand",
-        href: "/solution/design",
-        image: "/images/solution/generated/kr-brandfit-realphoto.webp",
-        icon: Paintbrush,
-        title: "현장 완성",
-        subtitle: "외장 · 간판 · 데크 동선",
-        problem: "모듈러가 현장 상권, 브랜드 톤, 고객 진입 동선과 따로 노는 느낌을 줄입니다.",
-        promise: "외장재, 간판 자리, 데크·조경·배수 마감을 함께 정리해 첫인상을 완성합니다.",
-        details: ["브랜드 톤에 맞는 외장", "간판/조명 자리 사전 계획", "데크·조경·배수 디테일"],
-        proof: "공간이 ‘놓인 건물’이 아니라 바로 영업 가능한 상업 장소처럼 보입니다.",
+        id: "energy",
+        href: "/solution/energy",
+        image: "/images/customize/options/solar-panel.webp",
+        icon: Zap,
+        title: "에너지 스택 (Energy Stack)",
+        subtitle: "태양광 · ESS · EV 충전기 · 부하 설계",
+        problem: "높은 전기 요금과 전력 수급 불안정 리스크를 해소합니다.",
+        promise: "안정적이고 효율적인 전력 인프라로 독립적인 모듈러 운영을 지원합니다.",
+        details: ["태양광 패널 지붕 통합", "잉여 전력 보관용 ESS 연동", "방문객 EV 충전기 및 부하 설계"],
+        proof: "전력 사용량이 체계적으로 관리되고, 에너지 독립성이 강화됩니다.",
       },
     ],
     process: [
-      { title: "운영 상황 인터뷰", body: "무인, 예약제, 상시 상주, 야간 운영 여부를 먼저 확인합니다." },
-      { title: "현장 리스크 표시", body: "출입, 통신, 공조, 간판, 배수 위치를 도면과 현장 조건 위에 표시합니다." },
-      { title: "필요 옵션만 확정", body: "장비 스펙보다 운영자가 실제로 받을 알림과 관리 범위를 먼저 정합니다." },
+      { title: "사용 흐름 진단", body: "무인, 상시 상주, 전력 부하, 네트워크 환경을 먼저 파악합니다." },
+      { title: "시스템 맵 구성", body: "출입, 통신, 공조, 전력 연결 지점을 하나의 옵션 맵으로 정리합니다." },
+      { title: "필요 옵션만 확정", body: "장비 스펙보다 운영자가 실제로 받을 알림과 제어 범위를 먼저 정합니다." },
     ],
   },
   EN: {
     eyebrow: "WEET OPERATION OPTIONS",
-    title: "Modular Spaces Ready To Operate",
+    title: "Modular Spaces Completed With Tech Options",
     lead:
-      "A good space does not end with a beautiful shell. Weet plans security, connection, remote readiness, and site finish around the problems operators face every day.",
-    heroLabel: "Options are risk control, not decoration",
-    heroTitle: "We start with the operating situation, not a device list.",
+      "A good space does not end with a beautiful shell. Weet plans security, connection, remote control, and energy management around the problems operators face every day.",
+    heroLabel: "Options are operating systems",
+    heroTitle: "We define usage flow and control scope before device specs.",
     heroBody:
-      "We check whether the space runs unmanned, whether payments must never fail, whether HVAC is needed before arrival, and whether first impression matters in the local market.",
-    selectLabel: "How to choose",
-    detailLabel: "What is included",
+      "We check whether the space runs unmanned, whether payments must never fail, and whether power load is stable, before combining the right options.",
+    selectLabel: "Selection Criteria",
+    detailLabel: "Included Specs",
     proofLabel: "Operational change",
     processTitle: "The option workflow is different",
     processLead:
-      "We do not bolt devices on after completion. Access flow, wiring, lighting, and finish details are planned with the space.",
-    ctaPrimary: "Check order options",
-    ctaSecondary: "Match my site",
+      "We do not bolt devices on after completion. Wiring, sensors, control panels, and power loads are planned with the space.",
+    ctaPrimary: "Check Options",
+    ctaSecondary: "Consultation",
     packages: [
       {
         id: "security",
         href: "/solution/cctv",
         image: "/images/solution/generated/kr-security-realphoto.webp",
         icon: LockKeyhole,
-        title: "Secure Access",
-        subtitle: "CCTV · smart lock · sensor light",
-        problem: "Reduce security gaps in remote, night, and reservation-based spaces where staff cannot stay all day.",
+        title: "Security Core",
+        subtitle: "CCTV · smart lock · sensors/access logging",
+        problem: "Reduce security gaps in night and unmanned operations.",
         promise: "Access logs, night detection, and entrance lighting are planned as one operating flow.",
-        details: ["Entrance blind-spot review", "CCTV and sensor-light placement", "Smart-lock permission planning"],
+        details: ["Blind-spot review", "CCTV and sensor-light placement", "Smart-lock permission planning"],
         proof: "Operators know who entered at night and which alerts deserve attention.",
       },
       {
@@ -155,41 +155,41 @@ const COPY: Record<Lang, PageCopy> = {
         href: "/solution/network",
         image: "/images/solution/generated/kr-network-realphoto.webp",
         icon: Router,
-        title: "Stable Connection",
-        subtitle: "POS · booking · guest Wi-Fi",
+        title: "Network Fabric",
+        subtitle: "POS · guest Wi-Fi · router/satellite readiness",
         problem: "Reduce losses when payment, booking, or remote control depends on unstable connectivity.",
-        promise: "We separate operator, guest, and device networks and recommend the right line and router for the site.",
+        promise: "We separate operator, guest, and device networks and recommend the right line and router.",
         details: ["POS/work/guest network split", "Router and network-box placement", "Backup-line review"],
-        proof: "Payments and reservations stay reliable, so operators feel less exposed on site.",
+        proof: "Payments and reservations are less affected by guest traffic and device load.",
       },
       {
         id: "control",
         href: "/solution/iot",
         image: "/images/solution/generated/kr-control-realphoto.webp",
         icon: SlidersHorizontal,
-        title: "Remote Ready",
-        subtitle: "lighting · HVAC · ventilation",
-        problem: "Reduce repeated site visits for hospitality, experience rooms, and unmanned operations.",
+        title: "Control Layer",
+        subtitle: "IoT lighting · HVAC · ventilation schedules",
+        problem: "Reduce repeated manual checks for unmanned operations.",
         promise: "Lighting, HVAC, ventilation, and door state can follow booking time and operating hours.",
         details: ["Smart switches and temperature panels", "Pre-arrival HVAC schedule", "Door state and operation alerts"],
         proof: "The space can be prepared before guests arrive, with fewer unnecessary visits.",
       },
       {
-        id: "brand",
-        href: "/solution/design",
-        image: "/images/solution/generated/kr-brandfit-realphoto.webp",
-        icon: Paintbrush,
-        title: "Site Finish",
-        subtitle: "facade · signage · deck flow",
-        problem: "Prevent the module from feeling detached from the brand, local market, and customer flow.",
-        promise: "Facade, signage position, deck, landscape, and drainage details are aligned before completion.",
-        details: ["Brand-fit exterior palette", "Sign and lighting placement", "Deck, planting, and drainage detail"],
-        proof: "The space reads as a business-ready site, not just a placed building.",
+        id: "energy",
+        href: "/solution/energy",
+        image: "/images/customize/options/solar-panel.webp",
+        icon: Zap,
+        title: "Energy Stack",
+        subtitle: "solar · ESS · EV charger · load planning",
+        problem: "Resolve high utility costs and unstable power supply risks.",
+        promise: "We support independent modular operation with stable and efficient power infrastructure.",
+        details: ["Roof-integrated solar panels", "ESS for surplus power", "EV chargers and load planning"],
+        proof: "Power consumption is systematically managed, and energy independence is strengthened.",
       },
     ],
     process: [
-      { title: "Operating interview", body: "We first check unmanned, reservation-only, staffed, and night-operation needs." },
-      { title: "Site risk map", body: "Access, connection, HVAC, signage, and drainage points are marked against the real site." },
+      { title: "Operating interview", body: "We first check unmanned, power load, and network needs." },
+      { title: "System map", body: "Access, connection, HVAC, and power points are organized as one option map." },
       { title: "Option confirmation", body: "We define actual alerts and management scope before chasing device specs." },
     ],
   },
@@ -200,89 +200,104 @@ export default function SolutionPage() {
   const copy = COPY[language];

   return (
-    <main className="min-h-screen bg-[#f7f6f1] text-neutral-950">
-      <section className="mx-auto max-w-[1440px] px-4 pb-12 pt-24 md:px-8 lg:pb-16 lg:pt-32">
-        <div className="grid gap-10 border-b border-neutral-300 pb-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(440px,0.7fr)] lg:gap-16 lg:pb-14">
+    <main className="min-h-screen bg-[#fcfbfa] text-[#2f3432]">
+      {/* Hero Section */}
+      <section className="mx-auto max-w-[1200px] px-6 pb-12 pt-28 md:px-10 lg:pb-16 lg:pt-36">
+        <div className="grid gap-8 border-b border-[#e6dfd3] pb-10 lg:grid-cols-[1fr_0.8fr] lg:gap-16 lg:pb-14">
           <div>
-            <p className="text-xs font-black uppercase tracking-[0.22em] text-neutral-500">{copy.eyebrow}</p>
-            <h1 className="mt-4 max-w-5xl text-4xl font-black leading-[1.04] text-neutral-950 md:text-6xl lg:text-[76px] break-keep">
+            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0d6e66]">{copy.eyebrow}</p>
+            <h1 className="mt-4 text-4xl font-black leading-tight text-[#2f3432] md:text-5xl lg:text-6xl break-keep">
               {copy.title}
             </h1>
-            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-neutral-600 md:text-xl break-keep">
+            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#5a625e] md:text-xl break-keep">
               {copy.lead}
             </p>
           </div>

-          <div className="self-end rounded-md border border-neutral-300 bg-white p-5">
-            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#A77B00]">{copy.heroLabel}</p>
-            <h2 className="mt-3 text-2xl font-black leading-tight text-neutral-950 md:text-3xl break-keep">
+          <div className="self-end rounded-lg border border-[#e6dfd3] bg-[#f5f2eb] p-6 shadow-sm">
+            <div className="flex items-center gap-2 mb-3">
+              <span className="flex h-2 w-2 rounded-full bg-[#f5a623]"></span>
+              <p className="text-xs font-bold uppercase tracking-wider text-[#7a6a3a]">{copy.heroLabel}</p>
+            </div>
+            <h2 className="text-xl font-bold leading-snug text-[#2f3432] break-keep">
               {copy.heroTitle}
             </h2>
-            <p className="mt-4 text-base leading-relaxed text-neutral-600 break-keep">{copy.heroBody}</p>
+            <p className="mt-3 text-sm leading-relaxed text-[#5a625e] break-keep">{copy.heroBody}</p>
           </div>
         </div>
       </section>

-      <section className="mx-auto max-w-[1440px] px-4 pb-16 md:px-8 lg:pb-24">
-        <div className="grid gap-6">
+      {/* Technical Modules Table Layout */}
+      <section className="mx-auto max-w-[1200px] px-6 pb-16 md:px-10 lg:pb-24">
+        <div className="flex flex-col gap-6">
           {copy.packages.map((pkg, index) => {
             const Icon = pkg.icon;
             return (
               <article
                 key={pkg.id}
-                className="grid gap-0 overflow-hidden rounded-md border border-neutral-300 bg-white lg:grid-cols-[minmax(340px,0.78fr)_1fr]"
+                className="group relative flex flex-col overflow-hidden rounded-xl border border-[#e6dfd3] bg-white transition-shadow hover:shadow-md lg:flex-row"
               >
-                <Link href={pkg.href} className="group relative block aspect-[16/10] overflow-hidden bg-neutral-200 lg:aspect-auto">
-                  <Image
-                    src={pkg.image}
-                    alt={`${pkg.title} ${pkg.subtitle}`}
-                    fill
-                    sizes="(max-width: 1024px) 100vw, 42vw"
-                    priority
-                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
-                  />
-                  <div className="absolute left-4 top-4 rounded-sm bg-neutral-950/85 px-3 py-2 text-xs font-black text-white backdrop-blur">
-                    {String(index + 1).padStart(2, "0")}
+                {/* Visual Strip */}
+                <div className="relative w-full shrink-0 border-b border-[#e6dfd3] bg-[#fcfbfa] p-4 lg:w-[280px] lg:border-b-0 lg:border-r lg:p-6">
+                  <div className="relative mb-4 flex items-center justify-between">
+                    <div className="flex h-10 w-10 items-center justify-center rounded-md border border-[#c4e3e0] bg-[#e6f4f2] text-[#0d6e66]">
+                      <Icon className="h-5 w-5" strokeWidth={2} />
+                    </div>
+                    <span className="font-mono text-xs font-bold text-[#a3b3ac]">
+                      MOD_0{index + 1}
+                    </span>
+                  </div>
+                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md border border-[#e6dfd3]">
+                    <Image
+                      src={pkg.image}
+                      alt={pkg.title}
+                      fill
+                      sizes="(max-width: 1024px) 100vw, 280px"
+                      className="object-cover transition-transform duration-500 group-hover:scale-105"
+                    />
                   </div>
-                </Link>
+                </div>
+
+                {/* Specs Console */}
+                <div className="flex w-full flex-col p-6 lg:flex-row lg:p-0">
+                  <div className="flex flex-1 flex-col justify-center border-b border-[#e6dfd3] pb-6 lg:border-b-0 lg:border-r lg:p-8 lg:pb-8">
+                    <h2 className="text-2xl font-black text-[#2f3432]">{pkg.title}</h2>
+                    <p className="mt-1 font-mono text-xs text-[#0d6e66]">{pkg.subtitle}</p>
+                    <p className="mt-4 text-sm leading-relaxed text-[#5a625e]">{pkg.promise}</p>

-                <div className="grid gap-8 p-5 md:p-8 lg:grid-cols-[minmax(220px,0.75fr)_1fr] lg:p-10">
-                  <div>
-                    <div className="flex h-12 w-12 items-center justify-center rounded-sm border border-neutral-300 bg-[#FEBD16] text-neutral-950">
-                      <Icon className="h-6 w-6" strokeWidth={1.7} />
+                    <div className="mt-6 flex flex-wrap gap-2">
+                      {pkg.details.map((item) => (
+                        <span key={item} className="inline-flex items-center gap-1.5 rounded bg-[#f5f2eb] px-2.5 py-1 text-xs font-bold text-[#5a625e]">
+                          <CheckCircle2 className="h-3 w-3 text-[#f5a623]" />
+                          {item}
+                        </span>
+                      ))}
                     </div>
-                    <h2 className="mt-5 text-3xl font-black leading-tight text-neutral-950 md:text-4xl break-keep">
-                      {pkg.title}
-                    </h2>
-                    <p className="mt-2 text-sm font-black uppercase tracking-[0.14em] text-neutral-500">{pkg.subtitle}</p>
-                    <p className="mt-5 text-base font-semibold leading-relaxed text-neutral-800 break-keep">{pkg.promise}</p>
-                    <Link
-                      href={pkg.href}
-                      className="mt-6 inline-flex h-11 items-center gap-2 rounded-sm border border-neutral-950 px-4 text-sm font-black text-neutral-950 transition-colors hover:bg-neutral-950 hover:text-white"
-                    >
-                      {copy.detailLabel}
-                      <ArrowRight className="h-4 w-4" />
-                    </Link>
                   </div>

-                  <div className="grid gap-6">
+                  {/* Impact Column */}
+                  <div className="flex w-full shrink-0 flex-col justify-between pt-6 lg:w-[320px] lg:p-8 lg:pt-8 bg-[#fcfbfa]">
                     <div>
-                      <p className="text-xs font-black uppercase tracking-[0.16em] text-neutral-500">{copy.selectLabel}</p>
-                      <p className="mt-2 text-lg font-bold leading-relaxed text-neutral-950 break-keep">{pkg.problem}</p>
+                      <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#a3b3ac]">{copy.selectLabel}</p>
+                      <p className="mt-1.5 text-sm font-semibold leading-relaxed text-[#2f3432]">{pkg.problem}</p>
                     </div>

-                    <ul className="grid gap-3">
-                      {pkg.details.map((item) => (
-                        <li key={item} className="flex gap-3 text-sm font-semibold leading-relaxed text-neutral-700 break-keep">
-                          <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#C69200]" />
-                          {item}
-                        </li>
-                      ))}
-                    </ul>
+                    <div className="mt-6 border-t border-[#e6dfd3] pt-4">
+                      <div className="flex items-center gap-2 mb-2">
+                        <div className="h-1.5 w-1.5 rounded-full bg-[#0d6e66]"></div>
+                        <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#a3b3ac]">{copy.proofLabel}</p>
+                      </div>
+                      <p className="text-xs font-medium leading-relaxed text-[#0d6e66]">{pkg.proof}</p>
+                    </div>

-                    <div className="rounded-md bg-neutral-950 px-5 py-5 text-white">
-                      <p className="text-xs font-black uppercase tracking-[0.16em] text-neutral-400">{copy.proofLabel}</p>
-                      <p className="mt-2 text-sm font-semibold leading-relaxed break-keep">{pkg.proof}</p>
+                    <div className="mt-6">
+                      <Link
+                        href={pkg.href}
+                        className="inline-flex h-9 w-full items-center justify-between rounded border border-[#0d6e66] px-4 text-xs font-bold text-[#0d6e66] transition-colors hover:bg-[#e6f4f2]"
+                      >
+                        {copy.detailLabel}
+                        <ArrowRight className="h-3.5 w-3.5" />
+                      </Link>
                     </div>
                   </div>
                 </div>
@@ -292,41 +307,41 @@ export default function SolutionPage() {
         </div>
       </section>

-      <section className="border-y border-neutral-300 bg-white">
-        <div className="mx-auto grid max-w-[1440px] gap-8 px-4 py-14 md:px-8 lg:grid-cols-[minmax(260px,0.5fr)_1fr] lg:py-20">
+      {/* Workflow Strip */}
+      <section className="border-y border-[#e6dfd3] bg-[#f5f2eb]">
+        <div className="mx-auto grid max-w-[1200px] gap-8 px-6 py-12 md:px-10 lg:grid-cols-[300px_1fr] lg:py-16">
           <div>
-            <p className="text-xs font-black uppercase tracking-[0.22em] text-neutral-500">WORKFLOW</p>
-            <h2 className="mt-3 text-3xl font-black leading-tight text-neutral-950 md:text-5xl break-keep">
+            <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#f5a623]">Workflow</p>
+            <h2 className="mt-2 text-2xl font-black leading-tight text-[#2f3432] break-keep">
               {copy.processTitle}
             </h2>
-            <p className="mt-5 max-w-xl text-base leading-relaxed text-neutral-600 break-keep">{copy.processLead}</p>
+            <p className="mt-4 text-sm leading-relaxed text-[#5a625e] break-keep">{copy.processLead}</p>
           </div>

-          <ol className="grid gap-4">
+          <div className="grid gap-6 md:grid-cols-3">
             {copy.process.map((step, index) => (
-              <li key={step.title} className="grid gap-3 border-b border-neutral-200 pb-5 last:border-b-0 md:grid-cols-[72px_1fr]">
-                <span className="text-2xl font-black text-[#C69200]">{String(index + 1).padStart(2, "0")}</span>
-                <div>
-                  <h3 className="text-xl font-black text-neutral-950 break-keep">{step.title}</h3>
-                  <p className="mt-2 text-base leading-relaxed text-neutral-600 break-keep">{step.body}</p>
-                </div>
-              </li>
+              <div key={step.title} className="flex flex-col border-t-2 border-[#e6dfd3] pt-4">
+                <span className="font-mono text-sm font-bold text-[#f5a623]">0{index + 1}</span>
+                <h3 className="mt-2 text-base font-bold text-[#2f3432] break-keep">{step.title}</h3>
+                <p className="mt-2 text-xs leading-relaxed text-[#5a625e] break-keep">{step.body}</p>
+              </div>
             ))}
-          </ol>
+          </div>
         </div>
       </section>

-      <section className="mx-auto flex max-w-[1440px] flex-col gap-3 px-4 py-12 md:px-8 sm:flex-row">
+      {/* Footer CTAs */}
+      <section className="mx-auto flex max-w-[1200px] flex-col gap-4 px-6 py-12 md:px-10 sm:flex-row">
         <Link
           href="/customize"
-          className="inline-flex h-12 items-center justify-center gap-2 rounded-sm bg-[#FEBD16] px-6 text-sm font-black text-neutral-950 transition-colors hover:bg-[#E2A80F]"
+          className="inline-flex h-11 items-center justify-center gap-2 rounded bg-[#febd16] px-6 text-sm font-bold text-[#2f3432] transition-colors hover:bg-[#e2a80f]"
         >
           {copy.ctaPrimary}
           <ArrowRight className="h-4 w-4" />
         </Link>
         <Link
           href="/support"
-          className="inline-flex h-12 items-center justify-center rounded-sm border border-neutral-300 px-6 text-sm font-black text-neutral-800 transition-colors hover:border-neutral-950 hover:text-neutral-950"
+          className="inline-flex h-11 items-center justify-center rounded border border-[#d8d0c3] bg-white px-6 text-sm font-bold text-[#5a625e] transition-colors hover:border-[#2f3432] hover:text-[#2f3432]"
         >
           {copy.ctaSecondary}
         </Link>
diff --git a/components/customize/CustomizeConfigurator.tsx b/components/customize/CustomizeConfigurator.tsx
index 93aea29..bf6ccaa 100644
--- a/components/customize/CustomizeConfigurator.tsx
+++ b/components/customize/CustomizeConfigurator.tsx
@@ -1,6 +1,7 @@
 'use client';

 import { useEffect, useMemo, useState, useTransition, type Dispatch, type ReactNode, type SetStateAction } from 'react';
+import { motion } from 'framer-motion';
 import Link from 'next/link';
 import Image from 'next/image';
 import { toast } from 'sonner';
@@ -16,8 +17,6 @@ import {
   Send,
   SlidersHorizontal,
   X,
-  CheckCircle2,
-  AlertCircle,
   ShieldCheck,
 } from 'lucide-react';
 import { Button } from '@/components/ui/button';
@@ -79,14 +78,15 @@ const MODEL_FALLBACK_FLOORPLANS: Record<string, string> = {
   'compact-3x6': '/images/customize/compact-3x6-base.svg',
   'standard-3x9': '/images/customize/standard-3x9-base.svg',
 };
+const OPTION_IMAGE_VERSION = '20260610-0137';
 type FloorplanImageStatus = 'missing' | 'loading' | 'loaded' | 'failed';

-type ConfigStep = 'space' | 'included' | 'living' | 'summary';
+type ConfigStep = 'space' | 'included' | 'mood' | 'smart';
 const STEPS: { id: ConfigStep; label: string; categories?: string[] }[] = [
-  { id: 'space', label: '모델 선택', categories: ['model'] },
+  { id: 'space', label: '모델', categories: ['model'] },
   { id: 'included', label: '공간 구성', categories: ['windows', 'door', 'sink', 'bathroom', 'furniture'] },
-  { id: 'living', label: '마감·설비 선택', categories: ['exterior', 'interior', 'flooring', 'energy', 'connectivity'] },
-  { id: 'summary', label: '상담 신청' },
+  { id: 'mood', label: '무드 & 소재', categories: ['exterior', 'interior', 'flooring'] },
+  { id: 'smart', label: '스마트 테크', categories: ['energy', 'connectivity'] },
 ];

 type ConsultationDraft = {
@@ -155,7 +155,7 @@ function buildSelectionsForModelChange(

 function estimateExclusionText(consultOptionCount: number) {
   return consultOptionCount > 0
-    ? `상담 후 확정 ${consultOptionCount}개 · 운반/설치 별도`
+    ? `스펙 협의 ${consultOptionCount}개 · 운반/설치 별도`
     : '운반/설치 별도';
 }

@@ -186,6 +186,44 @@ function useFloorplanImageStatus(path: string | null): FloorplanImageStatus {
   return result.status;
 }

+function StepperBar({ currentStep, setCurrentStep, stepCounts }: { currentStep: ConfigStep; setCurrentStep: (step: ConfigStep) => void; stepCounts: Record<ConfigStep, number> }) {
+  const stepIndex = STEPS.findIndex((s) => s.id === currentStep);
+  return (
+    <div className="border-b border-[#d8d0c3] bg-[#fbfaf7]/95 px-4 py-3 backdrop-blur lg:px-10">
+      <div className="mx-auto flex max-w-[1800px] w-full gap-1 rounded-lg bg-[#efe6d4] p-1">
+        {STEPS.map((step, index) => {
+          const isCurrent = currentStep === step.id;
+          const isComplete = index < stepIndex;
+
+          return (
+            <button
+              key={step.id}
+              type="button"
+              data-testid={`customize-step-${step.id}`}
+              aria-current={isCurrent ? 'step' : undefined}
+              data-state={isCurrent ? 'current' : isComplete ? 'complete' : 'upcoming'}
+              onClick={() => setCurrentStep(step.id)}
+              className={cn(
+                'relative flex min-h-9 flex-1 items-center justify-center rounded-md px-1 py-2 text-xs font-bold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#b88b26]',
+                isCurrent && 'bg-[#fbfaf7] text-[#2f3432] shadow-sm',
+                !isCurrent && isComplete && 'bg-[#e6dcc9] text-[#4f473d]',
+                !isCurrent && !isComplete && 'text-[#8a806f] hover:text-[#2f3432]'
+              )}
+            >
+              {step.label}
+              {stepCounts[step.id] > 0 && step.id !== 'space' && (
+                <span aria-hidden="true" className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#b88b26] px-1 text-[9px] text-white">
+                  {stepCounts[step.id]}
+                </span>
+              )}
+            </button>
+          );
+        })}
+      </div>
+    </div>
+  );
+}
+
 export default function CustomizeConfigurator({ catalog, initialConfig }: CustomizeConfiguratorProps) {
   const decoded = useMemo(() => decodeConfig(initialConfig), [initialConfig]);
   const firstModelId = catalog.models[0]?.id ?? DEFAULT_MODEL_ID;
@@ -232,6 +270,19 @@ export default function CustomizeConfigurator({ catalog, initialConfig }: Custom
   const currentFloorplanImagePath = currentModel ? floorplanImagePathForModel(currentModel) : null;
   const currentFloorplanImageStatus = useFloorplanImageStatus(currentFloorplanImagePath);
   const visibleOptions = useMemo(() => optionsForModel(catalog.options.filter((option) => option.isActive), modelId), [catalog.options, modelId]);
+  const stepCounts = useMemo(() => {
+    const counts: Record<ConfigStep, number> = { space: 1, included: 0, mood: 0, smart: 0 };
+    const optionsList = Object.values(selectedOptions).flat();
+    visibleOptions.forEach((opt) => {
+      if (optionsList.includes(opt.id)) {
+        const catKey = catalog.categories.find((c) => c.id === opt.categoryId)?.key;
+        if (STEPS[1].categories?.includes(catKey || '')) counts.included++;
+        if (STEPS[2].categories?.includes(catKey || '')) counts.mood++;
+        if (STEPS[3].categories?.includes(catKey || '')) counts.smart++;
+      }
+    });
+    return counts;
+  }, [selectedOptions, visibleOptions, catalog]);

   const handleModelChange = (nextModelId: string) => {
     setShouldSyncConfigUrl(true);
@@ -305,6 +356,7 @@ export default function CustomizeConfigurator({ catalog, initialConfig }: Custom
   return (
     <div className="min-h-dvh bg-[#f4f0e8] text-[#2f3432]">
       <ConfiguratorAppBar />
+      <StepperBar currentStep={currentStep} setCurrentStep={setCurrentStep} stepCounts={stepCounts} />

       <div className="mx-auto flex min-h-[calc(100dvh-64px)] max-w-[1800px] flex-col lg:flex-row">
         <section className="flex min-h-[calc(100dvh-190px)] flex-1 flex-col lg:w-[64%] lg:min-h-[calc(100dvh-64px)] lg:overflow-y-auto">
@@ -347,8 +399,8 @@ export default function CustomizeConfigurator({ catalog, initialConfig }: Custom
         </aside>
       </div>

-      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#d8d0c3] bg-[#fbfaf7]/95 px-4 py-3 shadow-[0_-8px_30px_rgba(55,48,39,0.12)] backdrop-blur lg:left-[64%]">
-        <div className="mx-auto flex max-w-[720px] items-center justify-between gap-4">
+      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#d8d0c3] bg-[#fbfaf7]/95 px-4 py-3 shadow-[0_-8px_30px_rgba(55,48,39,0.12)] backdrop-blur">
+        <div className="mx-auto flex max-w-[1800px] items-center justify-between gap-4 lg:px-6">
           <div>
             <p className="text-xs font-semibold text-[#7b7468]">예상 총액</p>
             <p className="text-xl font-black text-[#2f3432]">{estimate ? formatWon(estimate.estimatedTotal) : '-'}</p>
@@ -356,8 +408,8 @@ export default function CustomizeConfigurator({ catalog, initialConfig }: Custom
               {estimate ? estimateExclusionText(estimate.consultOptionCount) : '운반/설치 별도'}
             </p>
           </div>
-          <Button className="h-12 min-w-[132px] bg-[#2f3432] text-white hover:bg-[#1f2422]" onClick={() => setOrderOpen(true)}>
-            상담 요청
+          <Button className="h-12 min-w-[132px] bg-[#0d6e66] text-white hover:bg-[#095a54]" onClick={() => setOrderOpen(true)}>
+            주문하기
           </Button>
         </div>
       </div>
@@ -368,6 +420,7 @@ export default function CustomizeConfigurator({ catalog, initialConfig }: Custom
             <SheetTitle>옵션 구성</SheetTitle>
           </SheetHeader>
           <div className="h-[calc(86dvh-65px)] overflow-y-auto">
+            <StepperBar currentStep={currentStep} setCurrentStep={setCurrentStep} stepCounts={stepCounts} />
             <OptionsPanel
               catalog={catalog}
               modelId={modelId}
@@ -425,9 +478,7 @@ function ConfiguratorAppBar() {
         <p className="text-sm font-black text-[#2f3432]">위트 맞춤제작</p>
         <p className="text-xs text-[#83796a]">나만의 위트 만들기</p>
       </div>
-      <Link href="/support" className="text-sm font-semibold text-[#6f6658] hover:text-[#2f3432]">
-        확인사항
-      </Link>
+      <div className="w-14" />
     </header>
   );
 }
@@ -457,59 +508,13 @@ function OptionsPanel({
 }) {
   const currentStepData = STEPS.find((s) => s.id === currentStep)!;
   const stepIndex = STEPS.findIndex((s) => s.id === currentStep);
-  const stepCounts: Record<ConfigStep, number> = {
-    space: 1,
-    included: 0,
-    living: 0,
-    summary: 0,
-  };
-
-  const optionsList = Object.values(selectedOptions).flat();
-  visibleOptions.forEach((opt) => {
-    if (optionsList.includes(opt.id)) {
-      const catKey = catalog.categories.find((category) => category.id === opt.categoryId)?.key;
-      if (STEPS[1].categories?.includes(catKey || '')) stepCounts.included++;
-      if (STEPS[2].categories?.includes(catKey || '')) stepCounts.living++;
-    }
-  });
-
   return (
     <div className={cn('flex h-full flex-col pb-28', compact ? '' : 'h-[calc(100dvh-64px)] overflow-hidden')}>
-      <div className="sticky top-0 z-10 border-b border-[#d8d0c3] bg-[#fbfaf7]/95 px-4 pb-2 pt-4 backdrop-blur md:px-8">
-        <div className="mb-2 flex items-center justify-between">
+      <div className="sticky top-0 z-10 border-b border-[#d8d0c3] bg-[#fbfaf7]/95 px-4 py-4 backdrop-blur md:px-8">
+        <div className="flex items-center justify-between">
           <h2 className="text-xl font-black text-[#2f3432]">이동식주택 구성</h2>
           <span className="text-xs font-bold text-[#8a806f]">{stepIndex + 1} / {STEPS.length} 단계</span>
         </div>
-        <div className="flex w-full gap-1 rounded-lg bg-[#efe6d4] p-1">
-          {STEPS.map((step, index) => {
-            const isCurrent = currentStep === step.id;
-            const isComplete = index < stepIndex;
-
-            return (
-              <button
-                key={step.id}
-                type="button"
-                data-testid={`customize-step-${step.id}`}
-                aria-current={isCurrent ? 'step' : undefined}
-                data-state={isCurrent ? 'current' : isComplete ? 'complete' : 'upcoming'}
-                onClick={() => setCurrentStep(step.id)}
-                className={cn(
-                  'relative flex min-h-9 flex-1 items-center justify-center rounded-md px-1 py-2 text-xs font-bold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#b88b26]',
-                  isCurrent && 'bg-[#fbfaf7] text-[#2f3432] shadow-sm',
-                  !isCurrent && isComplete && 'bg-[#e6dcc9] text-[#4f473d]',
-                  !isCurrent && !isComplete && 'text-[#8a806f] hover:text-[#2f3432]'
-                )}
-              >
-                {step.label}
-                {stepCounts[step.id] > 0 && step.id !== 'space' && step.id !== 'summary' && (
-                  <span aria-hidden="true" className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#b88b26] px-1 text-[9px] text-white">
-                    {stepCounts[step.id]}
-                  </span>
-                )}
-              </button>
-            );
-          })}
-        </div>
       </div>

       <div className={cn('flex-1 overflow-y-auto', compact ? 'px-4 py-4' : 'px-8 py-6')}>
@@ -549,7 +554,7 @@ function OptionsPanel({
           </section>
         )}

-        {(currentStep === 'included' || currentStep === 'living') && (
+        {(currentStep === 'included' || currentStep === 'mood' || currentStep === 'smart') && (
           <>
             {currentStep === 'included' && (
               <div className="mb-6 rounded-lg bg-[#efe6d4]/50 p-4">
@@ -612,12 +617,6 @@ function OptionsPanel({
               })}
           </>
         )}
-
-        {currentStep === 'summary' && (
-          <div className="animate-in fade-in slide-in-from-bottom-2">
-            <ConversionConfidenceSection catalog={catalog} />
-          </div>
-        )}
       </div>
     </div>
   );
@@ -662,7 +661,7 @@ function OptionCard({
         <span
           className={cn(
             'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors',
-            selected ? 'border-[#2f3432] bg-[#2f3432] text-white' : 'border-[#bcb2a3] bg-[#fbfaf7] group-hover:border-[#8a806f]'
+            selected ? 'border-[#0d6e66] bg-[#0d6e66] text-white' : 'border-[#bcb2a3] bg-[#fbfaf7] group-hover:border-[#8a806f]'
           )}
         >
           {selected && <Check className="h-3.5 w-3.5" />}
@@ -676,7 +675,7 @@ function OptionCard({
                   기본 포함
                 </span>
               ) : option.priceType === 'consult' ? (
-                <span className="rounded bg-[#f4f0e8] px-1.5 py-0.5 text-[11px] font-black text-[#a56f16]">상담</span>
+                <span className="rounded bg-[#f4f0e8] px-1.5 py-0.5 text-[11px] font-black text-[#a56f16]">협의</span>
               ) : (
                 <span className="text-xs font-bold text-[#6d5b2b]">
                   +{formatOptionPrice(option)}
@@ -689,9 +688,10 @@ function OptionCard({
           )}
         </div>
       </button>
-      {(option.detailDescriptionKo || option.imagePath) && (
+      {hasOptionInfo(option) && (
         <button
           type="button"
+          data-testid={`option-info-${option.key || option.id}`}
           onClick={(event) => {
             event.stopPropagation();
             onInfo();
@@ -797,7 +797,7 @@ function FloorplanCanvas({
             y="0"
             width="1000"
             height="420"
-            preserveAspectRatio="xMaxYMid meet"
+            preserveAspectRatio="xMidYMid meet"
           />
         </g>
       ) : (
@@ -822,6 +822,21 @@ function FloorplanCanvas({
         />
       )}

+      <motion.rect
+        data-testid="floorplan-expansion-shell"
+        initial={false}
+        animate={{ x: box.x, width: box.width }}
+        transition={{ duration: 0.6, ease: "easeInOut" }}
+        y={box.y}
+        height={box.height}
+        rx="6"
+        fill="transparent"
+        stroke="#0d6e66"
+        strokeWidth="8"
+        strokeLinecap="round"
+        opacity="0.9"
+      />
+
       <FloorplanLengthRail box={box} lengthM={model.lengthM} />

       {selectedOptions.map((option) => option.overlayImagePath ? (
@@ -832,7 +847,7 @@ function FloorplanCanvas({
             y="0"
             width="1000"
             height="420"
-            preserveAspectRatio="xMaxYMid meet"
+            preserveAspectRatio="xMidYMid meet"
             opacity="0.88"
             className="transition-opacity duration-[250ms]"
           />
@@ -855,13 +870,16 @@ function FloorplanCanvas({
 }

 function FloorplanLengthRail({ box, lengthM }: { box: ReturnType<typeof floorplanSize>; lengthM: number }) {
-  const railX = box.x - 24;
+  const railY = box.y + box.height + 34;
+  const labelX = box.x + box.width / 2;

   return (
     <g data-testid="floorplan-length-rail" className="transition-all duration-[600ms] motion-reduce:transition-none">
-      <line x1={railX} y1={box.y} x2={railX} y2={box.y + box.height} stroke="#b9aa94" strokeWidth="2" strokeDasharray="4 4" opacity="0.8" />
-      <rect x={railX - 22} y={box.y + box.height / 2 - 14} width="44" height="28" rx="4" fill="#f5f1ea" stroke="#d8d0c3" />
-      <text x={railX} y={box.y + box.height / 2 + 5} fill="#6f6658" fontSize="12" fontWeight="800" textAnchor="middle">
+      <line x1={box.x} y1={railY} x2={box.x + box.width} y2={railY} stroke="#b9aa94" strokeWidth="2" strokeDasharray="4 4" opacity="0.85" />
+      <line x1={box.x} y1={railY - 8} x2={box.x} y2={railY + 8} stroke="#b9aa94" strokeWidth="2" />
+      <line x1={box.x + box.width} y1={railY - 8} x2={box.x + box.width} y2={railY + 8} stroke="#b9aa94" strokeWidth="2" />
+      <rect x={labelX - 22} y={railY - 14} width="44" height="28" rx="4" fill="#f5f1ea" stroke="#d8d0c3" />
+      <text x={labelX} y={railY + 5} fill="#6f6658" fontSize="12" fontWeight="800" textAnchor="middle">
         {lengthM}m
       </text>
     </g>
@@ -890,7 +908,7 @@ function FloorplanZoomModal({
   }, [onClose]);

   return (
-    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 p-3 backdrop-blur-sm md:p-6" onClick={onClose}>
+    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#4b4033]/55 p-3 backdrop-blur-sm md:p-6" onClick={onClose}>
       <div
         role="dialog"
         aria-modal="true"
@@ -955,15 +973,60 @@ function BasePlanObjects({ box }: { box: ReturnType<typeof floorplanSize> }) {
   );
 }

+const FALLBACK_CATALOG: Record<string, { desc: string; specs: string[] }> = {
+  'ribbed-steel-white': { desc: '화이트 리브 강판은 가장 기본적인 외장 레이어입니다. 밝은 색으로 작은 공간을 가볍게 보이게 하고, 세로 골 패턴이 빗물 흐름과 표면 오염을 정돈해 주기 때문에 유지관리 부담이 낮습니다.', specs: ['세로 리브 패턴', '밝은 외장 톤', '기본 외피'] },
+  'zinc-gray': { desc: '징크 그레이는 금속 패널의 선이 또렷하게 보이는 외장 옵션입니다. 상업용 팝업이나 숙박 공간처럼 차분하고 테크적인 인상을 원할 때 잘 맞으며, 창호와 모서리 몰딩 색을 함께 맞추면 완성도가 올라갑니다.', specs: ['메탈 패널', '저채도 그레이', '프리미엄 외피'] },
+  'cedar-point': { desc: '적삼목 포인트는 현관, 창 주변, 입면 일부에 따뜻한 질감을 더하는 옵션입니다. 전체를 목재로 덮기보다 포인트 면에 적용해 관리 범위를 줄이고, 흰색·그레이 외장과 대비를 만들어 줍니다.', specs: ['목재 포인트', '입면 대비', '부분 적용'] },
+  'basic-window': { desc: '기본 창호는 채광, 환기, 단열의 균형을 맞춘 표준 사양입니다. 작은 평면에서도 가구 배치가 막히지 않도록 창 위치와 열림 방향을 함께 확인합니다.', specs: ['표준 창호', '채광/환기', '단열 검토'] },
+  'extra-window': { desc: '추가 창호는 주방, 침실, 작업 공간처럼 더 많은 자연광이나 환기가 필요한 면에 넣는 옵션입니다. 벽면 수납, 침대 위치, 외부 시선 방향과 충돌하지 않게 배치합니다.', specs: ['추가 채광', '환기 강화', '가구 간섭 검토'] },
+  'wide-window': { desc: '와이드 창호는 풍경을 크게 받아들이는 파노라마형 옵션입니다. 거실형 사용, 스테이, 카페처럼 내부 체류 경험이 중요한 공간에 적합하며, 일사량과 프라이버시까지 같이 검토합니다.', specs: ['파노라마 뷰', '대형 개구부', '프라이버시 검토'] },
+  'standard-lock': { desc: '표준 도어락은 비밀번호와 카드키 중심의 기본 출입 장치입니다. 가족용, 별채, 상주형 공간처럼 관리자가 현장에 가까이 있을 때 단순하고 안정적인 선택입니다.', specs: ['비밀번호', '카드키', '기본 출입'] },
+  'smart-lock': { desc: '스마트락은 앱 기반 권한 부여와 출입 이력을 확인해야 하는 운영형 공간에 적합합니다. 숙박, 무인 매장, 직원 교대 공간에서는 게스트 권한 만료와 관리자 접근 방식을 상담 때 확정합니다.', specs: ['앱 권한', '출입 로그', '운영형 출입'] },
+  'paper-wall': { desc: '합지 벽지는 비용 효율과 부드러운 실내 톤을 우선할 때 선택하는 기본 내장 마감입니다. 밝은 컬러를 쓰면 3x6 소형 공간에서도 답답함이 줄어듭니다.', specs: ['기본 내장', '밝은 톤', '비용 효율'] },
+  'silk-wallpaper': { desc: '실크 벽지는 표면 내구성과 마감감을 높이는 내장 옵션입니다. 오염이 잦은 숙박·상업 공간이나 사진에 많이 노출되는 벽면에서 관리성과 인상이 좋아집니다.', specs: ['표면 내구', '오염 관리', '고급 질감'] },
+  'birch-panel': { desc: '자작나무 패널은 벽면 일부를 목재 질감으로 정리해 작은 공간에 따뜻한 깊이를 줍니다. 침대 헤드월, 데스크 벽, 입구 포인트처럼 손이 닿는 면에 적용하기 좋습니다.', specs: ['자작나무 톤', '포인트 월', '내장 패널'] },
+  'spc-white-oak': { desc: '화이트 오크 SPC 바닥은 밝고 깨끗한 인상을 주는 기본 바닥 옵션입니다. 물과 스크래치에 강한 편이라 주말주택, 사무실, 스테이 모두에서 관리가 쉽습니다.', specs: ['SPC 바닥', '화이트 오크', '생활 방수'] },
+  'spc-natural-oak': { desc: '내추럴 오크 SPC 바닥은 가장 무난하고 따뜻한 생활감의 바닥 옵션입니다. 목재 가구, 베이지 벽지, 금속 외장과 모두 잘 어울려 장기 사용에 안정적입니다.', specs: ['내추럴 오크', '스크래치 대응', '따뜻한 톤'] },
+  'porcelain-tile': { desc: '포세린 타일은 현관, 욕실 앞, 주방처럼 물과 오염이 많은 구간에 어울리는 고내구 바닥 옵션입니다. 무광 논슬립 계열을 쓰면 상업 공간과 숙박 공간의 청소 동선이 쉬워집니다.', specs: ['고내구 표면', '논슬립 검토', '오염 관리'] },
+  'basic-sink': { desc: '기본 싱크는 간단한 조리와 세척을 위한 표준 주방 모듈입니다. 상판 길이, 수전 위치, 하부 수납을 평면에 맞춰 적용해 작은 공간에서도 동선이 끊기지 않게 합니다.', specs: ['상판/수전', '하부 수납', '표준 주방'] },
+  'built-in-fridge': { desc: '빌트인 냉장고는 바닥 면적을 덜 쓰고 주방 라인을 깔끔하게 유지하는 옵션입니다. 스테이, 사무실, 쇼룸처럼 노출된 생활가전을 줄이고 싶을 때 적합합니다.', specs: ['빌트인 수납', '저소음 검토', '주방 라인 정리'] },
+  'mini-washer': { desc: '미니 세탁기는 장기 체류, 숙박 운영, 작업복 세탁이 필요한 공간에서 검토하는 설비 옵션입니다. 급수, 배수, 진동 방지, 주변 수납 간섭을 함께 확인해야 합니다.', specs: ['급수/배수', '진동 검토', '장기 체류'] },
+  'basic-bathroom': { desc: '기본 욕실은 샤워, 세면, 배수를 한 공간에 모은 표준 습식 모듈입니다. 방수층과 환기, 문 열림 방향을 함께 검토해 소형 평면에서도 사용성을 확보합니다.', specs: ['습식 욕실', '환기/배수', '방수 마감'] },
+  'bidet': { desc: '비데는 장기 거주나 숙박 운영에서 체감 만족도가 높은 위생 옵션입니다. 전원 위치, 콘센트 방수, 세정수 연결을 욕실 설계와 함께 확인합니다.', specs: ['전원 위치', '위생 설비', '욕실 연동'] },
+  'dry-vanity': { desc: '건식 세면대는 욕실 밖에서 손 씻기와 간단한 정리를 할 수 있게 만드는 옵션입니다. 카페, 사무실, 스테이처럼 여러 사람이 쓰는 공간에서 동선 분리가 좋아집니다.', specs: ['건식 동선', '거울/수납', '공용 사용'] },
+  'built-in-storage': { desc: '빌트인 수납은 침구, 청소도구, 장비 박스를 숨기기 위한 맞춤 수납 옵션입니다. 작은 면적일수록 이동 동선을 막지 않는 깊이와 문 열림 방식을 같이 정합니다.', specs: ['맞춤 수납', '동선 확보', '댐퍼 힌지'] },
+  'folding-table': { desc: '접이식 테이블은 식사, 노트북 작업, 상담 테이블을 한 면에서 해결하는 공간 절약 옵션입니다. 접었을 때 통로 폭이 남는지와 벽 보강 위치를 함께 검토합니다.', specs: ['접이식 구조', '벽 보강', '작업/식사 겸용'] },
+  'bed-frame': { desc: '침대 프레임은 수면 공간을 고정하고 하부를 수납으로 활용하는 옵션입니다. 3x6에서는 접이식·수납형, 3x9에서는 독립 침대형까지 사용 목적에 맞춰 상담합니다.', specs: ['하부 수납', '수면 영역', '평면 맞춤'] },
+  'solar-panel': { desc: '태양광 패널은 전기 사용량이 큰 운영 공간에서 전력 비용을 줄이기 위한 에너지 옵션입니다. 지붕 방향, 음영, 인버터 위치, 한전 계통 연계 가능성을 상담 때 확정합니다.', specs: ['지붕 통합', '인버터 연동', '음영 검토'] },
+  'ess': { desc: 'ESS는 태양광이나 야간 전력 운용을 저장해 정전 대응과 부하 분산을 돕는 저장 장치입니다. 설치 공간, 환기, 안전 거리, 주요 부하 우선순위를 함께 설계합니다.', specs: ['배터리 저장', '백업 부하', '안전 거리'] },
+  'ev-charger': { desc: 'EV 충전기는 방문객, 운영자, 숙박 이용자의 전기차 충전을 고려하는 옵션입니다. 완속 충전 용량, 차단기 여유, 주차 위치, 결제/사용 권한 방식을 함께 확인합니다.', specs: ['완속 충전', '부하 설계', '주차 동선'] },
+  'iot-package': { desc: 'IoT 패키지는 조명, 냉난방, 환기, 도어 상태를 원격으로 확인하고 제어하기 위한 운영 옵션입니다. 무인 운영이나 입실 전 공간 준비가 필요한 경우 효과가 큽니다.', specs: ['원격 제어', '상태 알림', '스케줄링'] },
+  'security-package': { desc: '보안 패키지는 CCTV, 센서등, 출입 감지, 알림 범위를 하나로 묶는 운영 옵션입니다. 녹화 구역, 야간 알림, 개인정보 노출 구역을 상담 때 정리합니다.', specs: ['CCTV/센서', '야간 알림', '출입 감지'] },
+  'satellite-internet': { desc: '위성 인터넷은 유선망이 약하거나 LTE 품질이 흔들리는 외곽 부지에서 검토하는 통신 옵션입니다. 안테나 시야, 설치 위치, 날씨 영향을 고려해 백업망으로 설계합니다.', specs: ['외곽 통신', '안테나 시야', '백업망'] },
+  'cellular-router': { desc: 'LTE/5G 라우터는 공사 초기나 유선망이 없는 부지에서 빠르게 네트워크를 열기 위한 옵션입니다. 신호 세기, 외부 안테나, POS·IoT 장비 분리 구성을 함께 봅니다.', specs: ['LTE/5G', '외부 안테나', '장비망 분리'] },
+};
+
+function hasOptionInfo(option: CustomizeOption) {
+  const optionKey = option.key || option.id;
+  return Boolean(option.detailDescriptionKo || option.shortDescriptionKo || option.imagePath || FALLBACK_CATALOG[optionKey] || FALLBACK_CATALOG[option.id]);
+}
+
 function OptionInfoModal({ option, onClose }: { option: CustomizeOption; onClose: () => void }) {
+  const optionKey = option.key || option.id;
+  const fallback = FALLBACK_CATALOG[optionKey] || FALLBACK_CATALOG[option.id];
+
+  const imagePath = `/images/customize/options/${optionKey}.webp?v=${OPTION_IMAGE_VERSION}`;
+  const desc = option.detailDescriptionKo || option.shortDescriptionKo || fallback?.desc || '상세 정보가 준비 중입니다.';
+  const specs = fallback?.specs || [];
+
   return (
-    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 p-4" onClick={onClose}>
+    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#4b4033]/35 p-4" onClick={onClose}>
       <div className="w-full max-w-xl rounded-lg bg-[#fbfaf7] p-5 shadow-2xl" onClick={(event) => event.stopPropagation()}>
         <div className="mb-4 flex items-start justify-between gap-4">
           <div>
             <div className="mb-1 flex items-center gap-2">
               {option.priceType === 'included' && <span className="rounded bg-[#efe6d4] px-2 py-0.5 text-[11px] font-black text-[#8a806f]">기본 포함</span>}
-              {option.priceType === 'consult' && <span className="rounded bg-[#f4f0e8] px-2 py-0.5 text-[11px] font-black text-[#a56f16]">상담 후 결정</span>}
+              {option.priceType === 'consult' && <span className="rounded bg-[#f4f0e8] px-2 py-0.5 text-[11px] font-black text-[#a56f16]">스펙 협의</span>}
               {option.priceType === 'fixed' && <p className="text-xs font-bold text-[#8a806f]">{formatOptionPrice(option)}</p>}
             </div>
             <h3 className="text-xl font-black text-[#2f3432]">{option.nameKo}</h3>
@@ -973,16 +1036,27 @@ function OptionInfoModal({ option, onClose }: { option: CustomizeOption; onClose
           </Button>
         </div>
         <div className="relative mb-4 aspect-[16/9] overflow-hidden rounded-lg bg-[#eee8dc]">
-          {option.imagePath ? (
-            <Image src={option.imagePath} alt={option.nameKo} fill sizes="72px" className="object-cover" />
-          ) : (
-            <div className="flex h-full items-center justify-center text-sm font-semibold text-[#8a806f]">
-              이미지 준비 중
-            </div>
-          )}
+          <Image
+            src={imagePath}
+            alt={option.nameKo}
+            fill
+            unoptimized
+            sizes="(max-width: 768px) calc(100vw - 48px), 560px"
+            className="object-cover"
+            onError={(e) => { e.currentTarget.style.display = 'none'; }}
+          />
         </div>
+        {specs.length > 0 && (
+          <div className="mb-3 flex flex-wrap gap-2">
+            {specs.map(spec => (
+              <span key={spec} className="rounded-full border border-[#d8d0c3] bg-[#f5f1ea] px-3 py-1 text-xs font-bold text-[#6f6658]">
+                {spec}
+              </span>
+            ))}
+          </div>
+        )}
         <p className="whitespace-pre-wrap text-sm leading-7 text-[#5f574d]">
-          {option.detailDescriptionKo || option.shortDescriptionKo}
+          {desc}
         </p>
       </div>
     </div>
@@ -1015,7 +1089,7 @@ function OrderModal({
   const updateField = (name: keyof typeof form, value: string) => setForm((current) => ({ ...current, [name]: value }));

   return (
-    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/45 p-4" onClick={onClose}>
+    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#4b4033]/45 p-4" onClick={onClose}>
       <div
         role="dialog"
         aria-modal="true"
@@ -1042,7 +1116,7 @@ function OrderModal({
         <div className="max-h-[90dvh] overflow-y-auto p-5 md:p-8">
           <div className="mb-5 flex items-start justify-between gap-4">
             <div>
-              <h2 id="consultation-title" className="text-2xl font-black text-[#2f3432]">상담 요청</h2>
+              <h2 id="consultation-title" className="text-2xl font-black text-[#2f3432]">주문하기</h2>
               <p className="mt-1 text-sm text-[#756d61]">{estimateExclusionText(estimate.consultOptionCount)}</p>
             </div>
             <Button variant="ghost" size="icon-sm" onClick={onClose}>
@@ -1068,11 +1142,11 @@ function OrderModal({

           <div className="mb-4 rounded bg-[#efe6d4]/50 p-3 text-xs leading-relaxed text-[#756d61]">
             <Info className="mr-1 inline-block h-3.5 w-3.5 align-[-2px] text-[#8a806f]" />
-            선택 입력이지만 알려주시면 더 정확한 상담에 도움이 됩니다. 아직 정해지지 않았다면 비워두셔도 됩니다.
+            선택 입력이지만 알려주시면 더 정확한 주문 구성에 도움이 됩니다. 아직 정해지지 않았다면 비워두셔도 됩니다.
           </div>
           <div className="mb-3">
             <p className="text-sm font-black text-[#2f3432]">필수 정보</p>
-            <p className="mt-1 text-xs text-[#8a806f]">상담 접수와 연락을 위해 필요한 최소 정보입니다.</p>
+            <p className="mt-1 text-xs text-[#8a806f]">주문 구성 확인과 연락을 위해 필요한 최소 정보입니다.</p>
           </div>
           <div className="grid gap-4 md:grid-cols-2">
             <Field label="이름" required>
@@ -1088,13 +1162,13 @@ function OrderModal({

           <div className="mb-3 mt-6">
             <p className="text-sm font-black text-[#2f3432]">추가 정보</p>
-            <p className="mt-1 text-xs text-[#8a806f]">일정, 현장 조건, 예산에 맞춘 제안에만 참고합니다.</p>
+            <p className="mt-1 text-xs text-[#8a806f]">일정, 설치 조건, 예산에 맞춘 제안에만 참고합니다.</p>
           </div>
           <div className="grid gap-4 md:grid-cols-2">
             <Field label="예상 구매 시기" helper="생산·설치 일정 제안에만 참고합니다.">
               <Select value={form.purchaseTimeline} onChange={(value) => updateField('purchaseTimeline', value)} options={PURCHASE_TIMELINES} />
             </Field>
-            <Field label="설치할 장소 지목" helper="대지, 전·답, 임야 등 현장 조건 검토에 참고합니다.">
+            <Field label="설치할 장소 지목" helper="대지, 전·답, 임야 등 설치 조건 검토에 참고합니다.">
               <Select value={form.landType} onChange={(value) => updateField('landType', value)} options={LAND_TYPES} />
             </Field>
             <Field label="구매 예산" helper="가능한 사양 조합을 빠르게 제안하기 위한 참고값입니다.">
@@ -1109,9 +1183,9 @@ function OrderModal({
           </div>

           <div className="mt-6 flex flex-col gap-3 sm:flex-row">
-            <Button data-testid="consultation-submit" className="h-12 flex-1 bg-[#2f3432] text-white hover:bg-[#1f2422]" disabled={isPending} onClick={onSubmit}>
+            <Button data-testid="consultation-submit" className="h-12 flex-1 bg-[#0d6e66] text-white hover:bg-[#095a54]" disabled={isPending} onClick={onSubmit}>
               {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
-              상담 요청
+              주문하기
             </Button>
             <Button variant="outline" className="h-12 flex-1 border-[#cfc4b3] bg-[#fbfaf7]" onClick={onSaveQuote}>
               <Download className="h-4 w-4" />
@@ -1143,7 +1217,7 @@ function Field({
         <span>{label}</span>
         <span className={cn(
           'rounded px-1.5 py-0.5 text-[10px] font-black',
-          required ? 'bg-[#2f3432] text-white' : 'bg-[#efe6d4] text-[#7a6a3a]'
+          required ? 'bg-[#0d6e66] text-white' : 'bg-[#efe6d4] text-[#7a6a3a]'
         )}>
           {required ? '필수' : '선택'}
         </span>
@@ -1154,127 +1228,6 @@ function Field({
   );
 }

-function ConversionConfidenceSection({ catalog }: { catalog: CustomizeCatalog }) {
-  return (
-    <div className="mx-auto max-w-[1100px] space-y-12 pb-32 lg:pb-10">
-      <section>
-        <h3 className="mb-4 text-xl font-black text-[#2f3432]">어떤 모델이 적합할까요?</h3>
-        <div className="grid gap-4 sm:grid-cols-2">
-          {catalog.models.map((model) => (
-            <div key={model.id} className="rounded-lg border border-[#ded5c8] bg-[#fbfaf7] p-5 shadow-sm">
-              <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
-                <div>
-                  <h4 className="text-lg font-bold text-[#2f3432]">{model.nameKo}</h4>
-                  <p className="mt-1 text-sm font-semibold text-[#8a806f]">{model.widthM}m x {model.lengthM}m · {model.areaSqm}m²</p>
-                </div>
-                <span className="w-fit shrink-0 rounded-full bg-[#f4f0e8] px-3 py-1 text-sm font-bold text-[#6b5a2b]">
-                  {formatModelStartPrice(model.basePrice)}~
-                </span>
-              </div>
-              <p className="text-sm leading-relaxed text-[#5f574d]">
-                {model.id === 'compact-3x6'
-                  ? '농막, 소형 주말주택, 프라이빗 아지트로 가장 많이 선택하는 베스트셀러 모델입니다.'
-                  : '더 넓은 공간이 필요한 분들을 위한 프리미엄 모델로, 쾌적한 거주 환경을 제공합니다.'}
-              </p>
-            </div>
-          ))}
-        </div>
-      </section>
-
-      <section>
-        <h3 className="mb-4 text-xl font-black text-[#2f3432]">포함 사항 및 별도 준비</h3>
-        <div className="grid gap-4 sm:grid-cols-2">
-          <div className="rounded-lg border border-[#ded5c8] bg-[#fbfaf7] p-5">
-            <div className="mb-4 flex items-center gap-2">
-              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#efe6d4] text-[#6b5a2b]">
-                <CheckCircle2 className="h-4 w-4" />
-              </div>
-              <h4 className="font-bold text-[#2f3432]">위트 포함 사항</h4>
-            </div>
-            <ul className="space-y-2 text-sm text-[#5f574d]">
-              <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#b9aa94]" />기본 구조 (골조, 외장재, 지붕)</li>
-              <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#b9aa94]" />기본 마감 (단열, 내장재, 바닥재)</li>
-              <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#b9aa94]" />기본 전기 배선 및 조명</li>
-              <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#b9aa94]" />선택한 기본/유상 옵션 전체</li>
-            </ul>
-          </div>
-          <div className="rounded-lg border border-[#ded5c8] bg-[#fbfaf7] p-5">
-            <div className="mb-4 flex items-center gap-2">
-              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#f4ecec] text-[#8a5b5b]">
-                <AlertCircle className="h-4 w-4" />
-              </div>
-              <h4 className="font-bold text-[#2f3432]">현장 별도 준비 (비용 별도)</h4>
-            </div>
-            <ul className="space-y-2 text-sm text-[#5f574d]">
-              <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#d2baba]" />운반 및 하차 (크레인 등)</li>
-              <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#d2baba]" />현장 설치 (수평 작업, 용접 등)</li>
-              <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#d2baba]" />기초 공사 (줄기초, 독립기초 등)</li>
-              <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#d2baba]" />상하수도 및 전기 인입 공사</li>
-              <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#d2baba]" />각종 인허가 및 부지 조건 검토</li>
-            </ul>
-          </div>
-        </div>
-      </section>
-
-      <section>
-        <div className="mb-4">
-          <h3 className="text-xl font-black text-[#2f3432]">현장 체크리스트</h3>
-          <p className="mt-1 text-sm text-[#756d61]">설치 전 필수 확인 항목입니다. 가볍게 셀프 체크해보세요.</p>
-        </div>
-        <div className="space-y-3">
-          <SiteCheckItem
-            title="도로 폭 및 진입로"
-            desc="5톤 이상 트럭이 진입하고 회전할 수 있는 3~4m 이상의 도로 폭이 확보되어 있나요?"
-          />
-          <SiteCheckItem
-            title="크레인 및 트럭 작업 공간"
-            desc="제품을 하차하고 설치하기 위한 크레인 작업 공간이 확보되어 있나요? (전선 등 장애물 확인)"
-          />
-          <SiteCheckItem
-            title="전기 및 상하수도"
-            desc="제품과 연결할 전기, 상수도, 하수도 배관이 설치 위치 근처까지 인입되어 있나요?"
-          />
-          <SiteCheckItem
-            title="기초 및 수평"
-            desc="설치할 바닥면의 평탄화 작업이 되어 있으며, 지반이 침하되지 않도록 단단한가요?"
-          />
-          <SiteCheckItem
-            title="지역 인허가"
-            desc="해당 부지에 이동식 주택 또는 농막 설치가 가능한지 지자체에 확인하셨나요?"
-          />
-        </div>
-      </section>
-    </div>
-  );
-}
-
-function SiteCheckItem({ title, desc }: { title: string; desc: string }) {
-  const [checked, setChecked] = useState(false);
-  return (
-    <button
-      type="button"
-      data-testid="site-check-item"
-      aria-pressed={checked}
-      onClick={() => setChecked(!checked)}
-      className={cn(
-        'flex w-full items-start gap-4 rounded-lg border p-4 text-left transition-colors',
-        checked ? 'border-[#2f3432] bg-[#efe6d4] shadow-sm' : 'border-[#ded5c8] bg-[#fbfaf7] hover:border-[#b9aa94]'
-      )}
-    >
-      <span className={cn(
-        'mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-colors duration-200',
-        checked ? 'border-[#2f3432] bg-[#2f3432] text-white' : 'border-[#bcb2a3] bg-[#fbfaf7]'
-      )}>
-        {checked && <Check className="h-4 w-4" />}
-      </span>
-      <div>
-        <span className="block font-bold text-[#2f3432]">{title}</span>
-        <span className="mt-1 block text-sm leading-relaxed text-[#5f574d]">{desc}</span>
-      </div>
-    </button>
-  );
-}
-
 function Select({ value, onChange, options }: { value: string; onChange: (value: string) => void; options: readonly string[] }) {
   return (
     <div className="relative">
@@ -1313,7 +1266,7 @@ function buildQuoteHtml(model: CustomizeModel, selectedOptions: CustomizeOption[
 </head>
 <body>
   <h1>위트 이동식주택 견적 요약</h1>
-  <p>상담 후 최종 확정 · 운반·설치 별도</p>
+  <p>주문 후 최종 확정 · 운반·설치 별도</p>
   <table>
     <tr><th>항목</th><th>가격</th></tr>
     <tr><td>${escapeHtml(model.nameKo)}</td><td>${escapeHtml(formatWon(model.basePrice))}</td></tr>
diff --git a/components/layout/Header.tsx b/components/layout/Header.tsx
index 64059ba..7ba9165 100644
--- a/components/layout/Header.tsx
+++ b/components/layout/Header.tsx
@@ -53,10 +53,10 @@ const navigationKo = [
     width: 155,
     submenu: [
       { name: '운영 솔루션', href: '/solution' },
-      { name: '보안', href: '/solution/cctv' },
-      { name: '통신망', href: '/solution/network' },
-      { name: '원격 제어', href: '/solution/iot' },
-      { name: '브랜드/현장 디자인', href: '/solution/design' },
+      { name: '보안 (Security)', href: '/solution/cctv' },
+      { name: '네트워크 (Network)', href: '/solution/network' },
+      { name: '원격 제어 (Control)', href: '/solution/iot' },
+      { name: '에너지 (Energy Stack)', href: '/solution/energy' },
     ],
   },
   {
@@ -128,10 +128,10 @@ const navigationEn = [
     width: 155,
     submenu: [
       { name: 'Operational Packages', href: '/solution' },
-      { name: 'Security', href: '/solution/cctv' },
-      { name: 'Network', href: '/solution/network' },
-      { name: 'Remote Control', href: '/solution/iot' },
-      { name: 'Brand & Site Fit', href: '/solution/design' },
+      { name: 'Security Core', href: '/solution/cctv' },
+      { name: 'Network Fabric', href: '/solution/network' },
+      { name: 'Control Layer', href: '/solution/iot' },
+      { name: 'Energy Stack', href: '/solution/energy' },
     ],
   },
   {
@@ -244,7 +244,7 @@ export default function Header() {
             <div className="xl:hidden absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-[60] flex items-center gap-2">
               <Link
                 href="/customize"
-                className="flex items-center justify-center px-3 md:px-4 py-1.5 md:py-2 bg-gray-900 text-white rounded text-[12px] md:text-[13px] font-bold hover:bg-gray-800 transition-colors whitespace-nowrap"
+              className="flex items-center justify-center rounded-sm bg-[#FEBD16] px-3 py-1.5 text-[12px] font-bold text-[#2f3432] shadow-[0_8px_18px_rgba(254,189,22,0.22)] transition-colors hover:bg-[#E2A80F] md:px-4 md:py-2 md:text-[13px] whitespace-nowrap"
                 aria-label={language === 'KO' ? '주문하기' : 'Order'}
               >
                 {language === 'KO' ? '주문하기' : 'Order'}
@@ -261,10 +261,10 @@ export default function Header() {

             {/* Desktop Navigation */}
             <nav
-              className="hidden xl:flex absolute left-[140px] right-[280px] top-0 bottom-0 items-center justify-center pointer-events-none"
+              className="hidden xl:flex absolute left-[140px] right-[330px] top-0 bottom-0 items-center justify-center pointer-events-none"
               onMouseEnter={handleMegaMenuEnter}
             >
-
...[truncated 36499 chars]
```

## Exact Review Questions

Return a marker-matched review using this structure:

MARKER: WEET_REVIEW_20260610_CUSTOMIZE_SOLUTION_CLOSURE_02
VERDICT: PASS or REVISE
MUST_FIX:
- Concrete blocker(s) only. Include file/path and exact reason.
OPTIONAL:
- Non-blocking improvements only.

Please focus on:
1. Whether the previous MUST_FIX (9 temporary option images) is truly closed.
2. Whether the /customize modal image fix using `unoptimized` is correct and safe for public local assets with cache-bust query strings.
3. Whether the renamed steps, removed 상담 신청/확인사항/상담 요청, centered floorplan, and expansion behavior match the user request.
4. Whether /solution now fits the requested technical-option concept and avoids the old site/field/black-heavy approach.
5. Any concrete blockers before commit/push/deploy.

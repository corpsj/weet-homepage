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

### components/layout/Header.tsx

Header excerpt omitted in slim packet; full packet includes CTA/nav structure.

### app/solution/page.tsx

Solution excerpt omitted in slim packet; full packet includes package definitions for Security Core, Network Fabric, Control Layer, Energy Stack.

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

Key diff is summarized through excerpts and diff stat above. Full local packet contains the detailed diff subset.

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

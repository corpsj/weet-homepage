# Review Packet: Weet /customize implementation review
Marker: WEET_CUSTOMIZER_REVIEW_02_IMPLEMENTATION_RETRY_20260607

## Active task brief
Rebuild /customize into a premium step-based movable-home configurator: focused floorplan stage, right-wall anchored 3x6→3x9 expansion, compact/default-first options, clear included/paid/consult pricing, helpful consultation request copy, visual QA, and GPT Pro review loop.

## Current progress/state
- Antigravity implemented first UI slice; Codex refined and validated.
- GPT-5.5 Pro Research 01 saved; concrete MUST_FIX feedback applied where in scope.
- Required audit docs created in agent-inbox/.
- Review 02 first send produced an empty assistant turn; retrying inline with a smaller packet.

## Project snapshot
Route: app/customize/page.tsx. Main component: components/customize/CustomizeConfigurator.tsx. Helpers: lib/customize/priceCalculator.ts/types.ts/config.ts. E2E: e2e/customize-configurator.spec.ts. Assets: public/images/customize/*base.svg.

## Git status
```text
M .codex/current-task.md
 M .codex/pro-review.md
 M .codex/review-packet.md
 M .codex/state.md
 M components/customize/CustomizeConfigurator.tsx
 M e2e/customize-configurator.spec.ts
 M public/images/customize/compact-3x6-base.svg
?? .codex/pro-review-customizer-01-structure.md
?? .codex/qa/chatgpt-research-01-report-view.png
?? .codex/qa/chatgpt-research-01-status.png
?? .codex/qa/chatgpt-review-02-status.png
?? .codex/qa/customizer-baseline-20260607/
?? .codex/qa/customizer-implementation-20260607-anchored/
?? .codex/qa/customizer-implementation-20260607-profix/
?? .codex/qa/customizer-implementation-20260607/
?? agent-inbox/customizer-image-generation.md
?? agent-inbox/customizer-improvements.md
?? agent-inbox/customizer-persona-test-results.md
?? agent-inbox/customizer-reference-research.md
```

## Changed files
```text
.codex/current-task.md                         |   61 +-
 .codex/pro-review.md                           |   87 +-
 .codex/review-packet.md                        | 4407 +++++-------------------
 .codex/state.md                                |  311 +-
 components/customize/CustomizeConfigurator.tsx |  535 ++-
 e2e/customize-configurator.spec.ts             |   88 +-
 public/images/customize/compact-3x6-base.svg   |   96 +-
 7 files changed, 1581 insertions(+), 4004 deletions(-)
```

## Git diff (focused implementation excerpt)
```diff
diff --git a/components/customize/CustomizeConfigurator.tsx b/components/customize/CustomizeConfigurator.tsx
index a1de580..93aea29 100644
--- a/components/customize/CustomizeConfigurator.tsx
+++ b/components/customize/CustomizeConfigurator.tsx
@@ -9 +8,0 @@ import {
-  Bath,
@@ -12 +10,0 @@ import {
-  DoorOpen,
@@ -18 +15,0 @@ import {
-  PanelTop,
@@ -21 +17,0 @@ import {
-  Waves,
@@ -24,0 +21 @@ import {
+  ShieldCheck,
@@ -86,0 +84,19 @@ type FloorplanImageStatus = 'missing' | 'loading' | 'loaded' | 'failed';
+type ConfigStep = 'space' | 'included' | 'living' | 'summary';
+const STEPS: { id: ConfigStep; label: string; categories?: string[] }[] = [
+  { id: 'space', label: '모델 선택', categories: ['model'] },
+  { id: 'included', label: '공간 구성', categories: ['windows', 'door', 'sink', 'bathroom', 'furniture'] },
+  { id: 'living', label: '마감·설비 선택', categories: ['exterior', 'interior', 'flooring', 'energy', 'connectivity'] },
+  { id: 'summary', label: '상담 신청' },
+];
+
+type ConsultationDraft = {
+  customerName: string;
+  phone: string;
+  region: string;
+  purchaseTimeline: string;
+  landType: string;
+  installAddress: string;
+  budgetRange: string;
+  memo: string;
+};
+
@@ -98,0 +115,47 @@ function floorplanImagePathForModel(model: CustomizeModel) {
+function buildSelectionsForModelChange(
+  catalog: CustomizeCatalog,
+  currentSelections: SelectedOptions,
+  nextModelId: string
+) {
+  const nextSelections = getDefaultSelections(catalog, nextModelId);
+  const activeOptions = catalog.options.filter((option) => option.isActive);
+  const availableOptions = new Map(optionsForModel(activeOptions, nextModelId).map((option) => [option.id, option]));
+  const allOptions = new Map(activeOptions.map((option) => [option.id, option]));
+  const categories = new Map(catalog.categories.filter((category) => category.isActive).map((category) => [category.id, category]));
+  const removedOptions: CustomizeOption[] = [];
+
+  for (const [categoryId, optionIds] of Object.entries(currentSelections)) {
+    const category = categories.get(categoryId);
+    if (!category) continue;
+
+    const preservedIds: string[] = [];
+    for (const optionId of optionIds) {
+      const option = availableOptions.get(optionId);
+      if (option?.categoryId === categoryId) {
+        preservedIds.push(optionId);
+      } else {
+        const removedOption = allOptions.get(optionId);
+        if (removedOption && !removedOptions.some((item) => item.id === removedOption.id)) {
+          removedOptions.push(removedOption);
+        }
+      }
+    }
+
+    if (preservedIds.length === 0) continue;
+
+    if (category.selectionType === 'single') {
+      nextSelections[categoryId] = [preservedIds[0]];
+    } else {
+      nextSelections[categoryId] = Array.from(new Set([...(nextSelections[categoryId] ?? []), ...preservedIds]));
+    }
+  }
+
+  return { selections: nextSelections, removedOptions };
+}
+
+function estimateExclusionText(consultOptionCount: number) {
+  return consultOptionCount > 0
+    ? `상담 후 확정 ${consultOptionCount}개 · 운반/설치 별도`
+    : '운반/설치 별도';
+}
+
@@ -134,0 +198 @@ export default function CustomizeConfigurator({ catalog, initialConfig }: Custom
+  const [currentStep, setCurrentStep] = useState<ConfigStep>('space');
@@ -140 +204 @@ export default function CustomizeConfigurator({ catalog, initialConfig }: Custom
-  const [form, setForm] = useState({
+  const [form, setForm] = useState<ConsultationDraft>({
@@ -175 +239,5 @@ export default function CustomizeConfigurator({ catalog, initialConfig }: Custom
-    setSelectedOptions(getDefaultSelections(catalog, nextModelId));
+    const { selections, removedOptions } = buildSelectionsForModelChange(catalog, selectedOptions, nextModelId);
+    setSelectedOptions(selections);
+    if (removedOptions.length > 0) {
+      toast.info(`새 모델에 맞지 않는 옵션 ${removedOptions.length}개를 제외했습니다.`);
+    }
@@ -264,3 +332 @@ export default function CustomizeConfigurator({ catalog, initialConfig }: Custom
-          <div className="border-t border-[#d8d0c3] bg-[#fbfaf7] px-4 py-12 md:px-8 lg:px-10">
-            <ConversionConfidenceSection catalog={catalog} />
-          </div>
+
@@ -277,0 +344,2 @@ export default function CustomizeConfigurator({ catalog, initialConfig }: Custom
+            currentStep={currentStep}
+            setCurrentStep={setCurrentStep}
@@ -287 +355,3 @@ export default function CustomizeConfigurator({ catalog, initialConfig }: Custom
-            <p className="text-xs text-[#8b8172]">운반·설치 별도</p>
+            <p className="text-xs text-[#8b8172]">
+              {estimate ? estimateExclusionText(estimate.consultOptionCount) : '운반/설치 별도'}
+            </p>
@@ -290 +360 @@ export default function CustomizeConfigurator({ catalog, initialConfig }: Custom
-            주문하기
+            상담 요청
@@ -308,0 +379,2 @@ export default function CustomizeConfigurator({ catalog, initialConfig }: Custom
+              currentStep={currentStep}
+              setCurrentStep={setCurrentStep}
@@ -353 +425 @@ function ConfiguratorAppBar() {
-        <p className="text-sm font-black text-[#2f3432]">주문하기</p>
+        <p className="text-sm font-black text-[#2f3432]">위트 맞춤제작</p>
@@ -370,0 +443,2 @@ function OptionsPanel({
+  currentStep,
+  setCurrentStep,
@@ -379,0 +454,2 @@ function OptionsPanel({
+  currentStep: ConfigStep;
+  setCurrentStep: (step: ConfigStep) => void;
@@ -381,0 +458,18 @@ function OptionsPanel({
+  const currentStepData = STEPS.find((s) => s.id === currentStep)!;
+  const stepIndex = STEPS.findIndex((s) => s.id === currentStep);
+  const stepCounts: Record<ConfigStep, number> = {
+    space: 1,
+    included: 0,
+    living: 0,
+    summary: 0,
+  };
+
+  const optionsList = Object.values(selectedOptions).flat();
+  visibleOptions.forEach((opt) => {
+    if (optionsList.includes(opt.id)) {
+      const catKey = catalog.categories.find((category) => category.id === opt.categoryId)?.key;
+      if (STEPS[1].categories?.includes(catKey || '')) stepCounts.included++;
+      if (STEPS[2].categories?.includes(catKey || '')) stepCounts.living++;
+    }
+  });
+
@@ -383,4 +477,36 @@ function OptionsPanel({
-    <div className={cn('pb-28', compact ? 'px-4 py-4' : 'h-[calc(100dvh-64px)] overflow-y-auto px-8 py-8')}>
-      <div className="mb-8">
-        <h2 className="text-xl font-black text-[#2f3432]">이동식주택 구성</h2>
-        <p className="mt-1 text-sm text-[#756d61]">선택한 구성은 상담 요청 시 그대로 저장됩니다.</p>
+    <div className={cn('flex h-full flex-col pb-28', compact ? '' : 'h-[calc(100dvh-64px)] overflow-hidden')}>
+      <div className="sticky top-0 z-10 border-b border-[#d8d0c3] bg-[#fbfaf7]/95 px-4 pb-2 pt-4 backdrop-blur md:px-8">
+        <div className="mb-2 flex items-center justify-between">
+          <h2 className="text-xl font-black text-[#2f3432]">이동식주택 구성</h2>
+          <span className="text-xs font-bold text-[#8a806f]">{stepIndex + 1} / {STEPS.length} 단계</span>
+        </div>
+        <div className="flex w-full gap-1 rounded-lg bg-[#efe6d4] p-1">
+          {STEPS.map((step, index) => {
+            const isCurrent = currentStep === step.id;
+            const isComplete = index < stepIndex;
+
+            return (
+              <button
+                key={step.id}
+                type="button"
+                data-testid={`customize-step-${step.id}`}
+                aria-current={isCurrent ? 'step' : undefined}
+                data-state={isCurrent ? 'current' : isComplete ? 'complete' : 'upcoming'}
+                onClick={() => setCurrentStep(step.id)}
+                className={cn(
+                  'relative flex min-h-9 flex-1 items-center justify-center rounded-md px-1 py-2 text-xs font-bold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#b88b26]',
+                  isCurrent && 'bg-[#fbfaf7] text-[#2f3432] shadow-sm',
+                  !isCurrent && isComplete && 'bg-[#e6dcc9] text-[#4f473d]',
+                  !isCurrent && !isComplete && 'text-[#8a806f] hover:text-[#2f3432]'
+                )}
+              >
+                {step.label}
+                {stepCounts[step.id] > 0 && step.id !== 'space' && step.id !== 'summary' && (
+                  <span aria-hidden="true" className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#b88b26] px-1 text-[9px] text-white">
+                    {stepCounts[step.id]}
+                  </span>
+                )}
+              </button>
+            );
+          })}
+        </div>
@@ -389,19 +515,44 @@ function OptionsPanel({
-      <section className="mb-8">
-        <CategoryHeading title="모델" amount={0} icon={<Layers className="h-4 w-4" />} />
-        <div className="mt-3 grid gap-3">
-          {catalog.models.map((model) => (
-            <button
-              key={model.id}
-              type="button"
-              onClick={() => onModelChange(model.id)}
-              className={cn(
-                'min-h-[96px] rounded-lg border p-4
... [truncated; command noted]
```

## Key excerpts

### Step constants + selection preservation
```tsx
'standard-3x9': '/images/customize/standard-3x9-base.svg',
};
type FloorplanImageStatus = 'missing' | 'loading' | 'loaded' | 'failed';

type ConfigStep = 'space' | 'included' | 'living' | 'summary';
const STEPS: { id: ConfigStep; label: string; categories?: string[] }[] = [
  { id: 'space', label: '모델 선택', categories: ['model'] },
  { id: 'included', label: '공간 구성', categories: ['windows', 'door', 'sink', 'bathroom', 'furniture'] },
  { id: 'living', label: '마감·설비 선택', categories: ['exterior', 'interior', 'flooring', 'energy', 'connectivity'] },
  { id: 'summary', label: '상담 신청' },
];

type ConsultationDraft = {
  customerName: string;
  phone: string;
  region: string;
  purchaseTimeline: string;
  landType: string;
  installAddress: string;
  budgetRange: string;
  memo: string;
};

const inputClass = 'h-11 rounded-lg border-gray-300 bg-[#fbfaf7] text-sm focus-visible:ring-[#b88b26]';
const selectClass = 'h-11 w-full rounded-lg border border-gray-300 bg-[#fbfaf7] px-3 text-sm outline-none focus:ring-2 focus:ring-[#b88b26]/30';

function floorplanImagePathForModel(model: CustomizeModel) {
  const configuredPath = model.floorplanImagePath?.trim();
  const fallbackPath = MODEL_FALLBACK_FLOORPLANS[model.id];

  if (!configuredPath) return fallbackPath ?? null;
  if (configuredPath === PLACEHOLDER_FLOORPLAN_PATH) return fallbackPath ?? configuredPath;
  return configuredPath;
}

function buildSelectionsForModelChange(
  catalog: CustomizeCatalog,
  currentSelections: SelectedOptions,
  nextModelId: string
) {
  const nextSelections = getDefaultSelections(catalog, nextModelId);
  const activeOptions = catalog.options.filter((option) => option.isActive);
  const availableOptions = new Map(optionsForModel(activeOptions, nextModelId).map((option) => [option.id, option]));
  const allOptions = new Map(activeOptions.map((option) => [option.id, option]));
  const categories = new Map(catalog.categories.filter((category) => category.isActive).map((category) => [category.id, category]));
  const removedOptions: CustomizeOption[] = [];

  for (const [categoryId, optionIds] of Object.entries(currentSelections)) {
    const category = categories.get(categoryId);
    if (!category) continue;

    const preservedIds: string[] = [];
    for (const optionId of optionIds) {
      const option = availableOptions.get(optionId);
      if (option?.categoryId === categoryId) {
        preservedIds.push(optionId);
      } else {
        const removedOption = allOptions.get(optionId);
        if (removedOption && !removedOptions.some((item) => item.id === removedOption.id)) {
          removedOptions.push(removedOption);
        }
      }
    }

    if (preservedIds.length === 0) continue;

    if (category.selectionType === 'single') {
      nextSelections[categoryId] = [preservedIds[0]];
    } else {
      nextSelections[categoryId] = Array.from(new Set([...(nextSelections[categoryId] ?? []), ...preservedIds]));
    }
```

### Step nav / compact option rows
```tsx
</Link>
    </header>
  );
}

function OptionsPanel({
  catalog,
  modelId,
  selectedOptions,
  visibleOptions,
  onModelChange,
  onOptionToggle,
  onInfo,
  currentStep,
  setCurrentStep,
  compact = false,
}: {
  catalog: CustomizeCatalog;
  modelId: string;
  selectedOptions: SelectedOptions;
  visibleOptions: CustomizeOption[];
  onModelChange: (modelId: string) => void;
  onOptionToggle: (category: CustomizeCategory, option: CustomizeOption) => void;
  onInfo: (option: CustomizeOption) => void;
  currentStep: ConfigStep;
  setCurrentStep: (step: ConfigStep) => void;
  compact?: boolean;
}) {
  const currentStepData = STEPS.find((s) => s.id === currentStep)!;
  const stepIndex = STEPS.findIndex((s) => s.id === currentStep);
  const stepCounts: Record<ConfigStep, number> = {
    space: 1,
    included: 0,
    living: 0,
    summary: 0,
  };

  const optionsList = Object.values(selectedOptions).flat();
  visibleOptions.forEach((opt) => {
    if (optionsList.includes(opt.id)) {
      const catKey = catalog.categories.find((category) => category.id === opt.categoryId)?.key;
      if (STEPS[1].categories?.includes(catKey || '')) stepCounts.included++;
      if (STEPS[2].categories?.includes(catKey || '')) stepCounts.living++;
    }
  });

  return (
    <div className={cn('flex h-full flex-col pb-28', compact ? '' : 'h-[calc(100dvh-64px)] overflow-hidden')}>
      <div className="sticky top-0 z-10 border-b border-[#d8d0c3] bg-[#fbfaf7]/95 px-4 pb-2 pt-4 backdrop-blur md:px-8">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-xl font-black text-[#2f3432]">이동식주택 구성</h2>
          <span className="text-xs font-bold text-[#8a806f]">{stepIndex + 1} / {STEPS.length} 단계</span>
        </div>
        <div className="flex w-full gap-1 rounded-lg bg-[#efe6d4] p-1">
          {STEPS.map((step, index) => {
            const isCurrent = currentStep === step.id;
            const isComplete = index < stepIndex;

            return (
              <button
                key={step.id}
                type="button"
                data-testid={`customize-step-${step.id}`}
                aria-current={isCurrent ? 'step' : undefined}
                data-state={isCurrent ? 'current' : isComplete ? 'complete' : 'upcoming'}
                onClick={() => setCurrentStep(step.id)}
                className={cn(
                  'relative flex min-h-9 flex-1 items-center justify-center rounded-md px-1 py-2 text-xs font-bold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#b88b26]',
                  isCurrent && 'bg-[#fbfaf7] text-[#2f3432] shadow-sm',
                  !isCurrent && isComplete && 'bg-[#e6dcc9] text-[#4f473d]',
                  !isCurrent && !isComplete && 'text-[#8a806f] hover:text-[#2f3432]'
                )}
              >
                {step.label}
                {stepCounts[step.id] > 0 && step.id !== 'space' && step.id !== 'summary' && (
                  <span aria-hidden="true" className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#b88b26] px-1 text-[9px] text-white">
                    {stepCounts[step.id]}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className={cn('flex-1 overflow-y-auto', compact ? 'px-4 py-4' : 'px-8 py-6')}>
        {currentStep === 'space' && (
          <section className="mb-8">
            <CategoryHeading title="공간 모델" amount={0} icon={<Layers className="h-4 w-4" />} />
            <p className="mb-4 mt-1 text-sm text-[#756d61]">설치할 공간의 크기와 목적에 맞는 모델을 선택하세요.</p>
            <div className="grid gap-3">
              {catalog.models.map((model) => (
                <button
                  key={model.id}
                  type="button"
                  onClick={() => onModelChange(model.id)}
                  className={cn(
                    'min-h-[96px] rounded-lg border p-4 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#b88b26]',
                    model.id === modelId
                      ? 'border-[#2f3432] bg-[#efe6d4] shadow-sm'
                      : 'border-[#ded5c8] bg-[#fbfaf7] hover:border-[#b9aa94]'
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-base font-black text-[#2f3432]">{model.nameKo}</p>
                        <span className="rounded-full bg-[#e2dacd] px-2 py-0.5 text-[10px] font-bold text-[#6b5a2b]">
                          {model.id === 'compact-3x6' ? '소형 주말주택' : '프리미엄 거주'}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-[#756d61]">{model.widthM}m x {model.lengthM}m · {model.areaSqm}m²</p>
                    </div>

... [truncated; command noted]
```

### Floorplan rail / consultation modal
```tsx
onOpenViewer?: () => void;
}) {
  return (
    <div className="w-full max-w-[1100px]">
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-[#8a806f]">선택 모델</p>
          <h1 className="text-2xl font-black text-[#2f3432] md:text-3xl">{model.nameKo}</h1>
        </div>
        <div className="text-right">
          <p className="text-sm font-bold text-[#8a806f]">기본가</p>
          <p className="text-lg font-black text-[#6b5a2b]">{formatModelStartPrice(model.basePrice)}</p>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-lg border border-[#d8d0c3] bg-[#fbfaf7] shadow-sm">
        {onOpenViewer && (
          <button
            type="button"
            data-testid="floorplan-zoom-open"
            aria-label="도면 크게 보기"
            onClick={onOpenViewer}
            className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-md border border-[#d8d0c3] bg-[#fbfaf7]/95 text-[#2f3432] shadow-sm backdrop-blur transition-colors hover:border-[#b9aa94] hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#b88b26]/40"
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

function FloorplanCanvas({
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
  const box = floorplanSize(model);
  const selectedLabels = selectedOptions.filter((option) => option.overlayLabelKo);
  const resolvedFloorplanImagePath = floorplanImagePath ?? floorplanImagePathForModel(model);
  const localImageStatus = useFloorplanImageStatus(resolvedFloorplanImagePath);
  const imageStatus = floorplanImageStatus ?? localImageStatus;
  const hasBaseImage = imageStatus === 'loaded';
  const gridId = `${testId}-grid`;

  return (
    <svg viewBox="0 0 1000 420" className={cn('aspect-[1000/420] w-full', className)} data-testid={testId}>
      <defs>
        <pattern id={gridId} width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#e4ddd1" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="1000" height="420" fill="#f5f1ea" />

      {hasBaseImage ? (
        <g className="transition-all duration-[600ms] motion-reduce:transition-none">
          <image
            data-testid="base-floorplan-image"
            href={resolvedFloorplanImagePath ?? undefined}
            x="0"
            y="0"
            width="1000"
            height="420"
            preserveAspectRatio="xMaxYMid meet"
          />
        </g>
      ) : (
        <>
          <rect x={box.x} y={box.y} width={box.width} height={box.height} fill="#f8f4ec" stroke="#2f3432" strokeWidth="12" className="transition-all duration-[600ms] motion-reduce:transition-none" />
}) {
  const updateField = (name: keyof typeof form, value: string) => setForm((current) => ({ ...current, [name]: value }));

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/45 p-4" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="consultation-title"
        className="mx-auto my-6 grid w-full max-w-6xl gap-0 overflow-hidden rounded-lg bg-[#fbfaf7] shadow-2xl lg:grid-cols-[1fr_0.9fr]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="bg-[#f4f0e8] p-5 md:p-8">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-[#8a806f]">선택 평면</p>
              <h2 className="text-2xl font-black text-[#2f3432]">{estimate.model.nameKo}</h2>
            </div>
            <Maximize2 className="h-5 w-5 text-[#8a806f]" />
          </div>
          <FloorplanPreview
            model={estimate.model}
            selectedOptions={selectedOptions}
            floorplanImagePath={floorplanImagePath}
            floorplanImageStatus={floorplanImageStatus}
          />
        </div>

        <div className="max-h-[90dvh] overflow-y-auto p-5 md:p-8">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <h2 id="consultation-title" className="text-2xl font-black text-[#2f3432]">상담 요청</h2>
              <p className="mt-1 text-sm text-[#756d61]">{estimateExclusionText(estimate.consultOptionCount)}</p>
            </div>
            <Button variant="ghost" size="icon-sm" onClick={onClose}>
              <X className="h-4 w-4" />

... [truncated; command noted]
```

## Validation output
- git diff --check: passed
- npx tsc --noEmit: passed
- npm run lint: passed
- npm test: 3 files / 20 tests passed
- npx playwright test e2e/customize-configurator.spec.ts: 10 passed
- npm run build: passed with existing Next.js middleware deprecation warning

## Visual QA findings
Latest directory: .codex/qa/customizer-implementation-20260607-profix/
```json
{
  "desktop": {
    "h1": "Compact 3x6",
    "overflowX": false,
    "stepText": "모델 선택 | 공간 구성4 | 마감·설비 선택3 | 상담 신청",
    "rail": "6m",
    "baseImages": 1,
    "footprints": 0
  },
  "tablet": {
    "h1": "Compact 3x6",
    "overflowX": false,
    "stepText": "모델 선택 | 공간 구성4 | 마감·설비 선택3 | 상담 신청",
    "rail": "6m",
    "baseImages": 1,
    "footprints": 0
  },
  "mobile": {
    "h1": "Compact 3x6",
    "overflowX": false,
    "stepText": "모델 선택 | 공간 구성4 | 마감·설비 선택3 | 상담 신청",
    "rail": "6m",
    "baseImages": 1,
    "footprints": 0
  },
  "errors": []
}
```
Manual visual inspection: no horizontal overflow; left stage is floorplan-focused; compact and standard share right-wall anchor; length rail visible; step labels fit including 마감·설비 선택 on mobile; option rows compact/touch-safe; consultation modal helper copy readable. Dev-only Next.js indicator overlaps lower-left mobile screenshots but is not production UI.

## Current failures / risks
No local validation failures. Production-domain validation pending. Full focus trap/keyboard-only modal audit remains follow-up. priceCalculator still returns simple estimate, not structured included/paid/consult arrays. Step grouping is component-level constants. No new AI-generated raster imagery; existing floorplan SVG correction better served customer understanding.

## Exact review questions
1. Any concrete MUST_FIX blockers in the implementation diff before release?
2. Does left-stage focus plus fixed right-wall floorplan alignment satisfy the first-slice requirement?
3. Is the 4-step grouping acceptable, or must categories change now?
4. Does included/paid/consult presentation avoid misleading price or dark-pattern concerns despite the simple estimate model?
5. Does the consultation modal make optional fields feel helpful rather than mandatory?
6. Any visible/accessibility/mobile defects from QA summary that should be fixed now?
7. Label feedback only as MUST_FIX or OPTIONAL, then give VERDICT.

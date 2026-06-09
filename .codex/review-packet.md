# GPT-5.5 Pro Review Packet

Marker: `WEET_REVIEW_20260610_EXPANSION_GUIDE_03`

## Active Task Brief

Weet homepage/admin/public project. The broader requested renewal already has a GPT-5.5 Pro PASS in `.codex/pro-review.md`. After that PASS, a Stickies steering note required one additional current-scope refinement: the /customize 3x6 -> 3x9 model transition must clearly show wall/line expansion, not only a base floorplan image swap.

## Current Progress / State

- Antigravity IDE was used for the frontend implementation handoff, but it returned `User cancelled agent execution` and produced no diff. This was recorded in `agent-inbox/antigravity-failures.md`.
- Codex applied the narrow fallback patch directly.
- Current changed scope: `components/customize/CustomizeConfigurator.tsx`, `agent-inbox/antigravity-failures.md`, `agent-inbox/customizer-improvements.md`, plus local QA screenshots/summary.
- Branch: `zoo/customize-configurator`.

## Git Status

```text
## zoo/customize-configurator...origin/zoo/customize-configurator
 M agent-inbox/antigravity-failures.md
 M agent-inbox/customizer-improvements.md
 M components/customize/CustomizeConfigurator.tsx
?? .codex/qa/expansion-guide-20260610/
?? .codex/qa/production-solution-fb62d34/
?? .codex/qa/solution-renewal-20260609/
?? .codex/qa/solution-renewal-before-20260609/
?? test-results/

```

## Changed Files

```text
agent-inbox/antigravity-failures.md
agent-inbox/customizer-improvements.md
components/customize/CustomizeConfigurator.tsx

```

## Git Diff

```diff
diff --git a/agent-inbox/antigravity-failures.md b/agent-inbox/antigravity-failures.md
index f0bae54..79c49ea 100644
--- a/agent-inbox/antigravity-failures.md
+++ b/agent-inbox/antigravity-failures.md
@@ -52,3 +52,11 @@ Antigravity is required for frontend/design implementation when available. Recor
 - Antigravity accepted the implementation prompt, explored files, and ran `npm run lint`, but produced no code diff after repeated polling.
 - Antigravity was already in `User cancelled agent execution` state when rechecked; no pending edit/accept controls remained.
 - Decision: record the no-diff handoff failure and continue directly in Codex so the user-requested solution renewal could complete.
+
+## 2026-06-10 floorplan expansion guide slice
+
+- Intended handoff: refine `/customize` 3x6 to 3x9 transition so the user visibly sees wall/line expansion rather than only a base floorplan image swap.
+- Computer Use was healthy, Stickies was visible, and Antigravity IDE (`com.google.antigravity-ide`) was reachable with the Agent composer available.
+- The prompt was pasted and sent to Antigravity; Antigravity showed `Worked for 1m` and `User cancelled agent execution`.
+- Repeated `git status -- components/customize/CustomizeConfigurator.tsx` checks showed no file changes from Antigravity.
+- Decision: record the no-diff/cancelled handoff and continue directly in Codex for this narrow Stickies-driven refinement. Codex added an animated SVG guide overlay for growth zones, moving wall lines, and 6m reference lines.
diff --git a/agent-inbox/customizer-improvements.md b/agent-inbox/customizer-improvements.md
index 3e05937..640d1df 100644
--- a/agent-inbox/customizer-improvements.md
+++ b/agent-inbox/customizer-improvements.md
@@ -131,3 +131,14 @@
 - 검증 방법: Playwright screenshot and DOM summary, manual visual inspection.
 - 결과: no overflow, base image 1개, footprint 0개, step label fit, modal helper copy readable.
 - 남은 리스크: dev-only Next indicator가 mobile screenshot 좌하단에 겹치지만 production UI 요소는 아님.
+
+## Improvement 13: 3x6→3x9 wall-line expansion guide
+
+- 문제: 3x6에서 3x9로 바뀔 때 base SVG가 교체되는 인상이 남아, 실제로 어느 벽과 선이 길어지는지 즉시 이해하기 어려웠다.
+- 고객 영향: 모델 전환이 같은 집의 확장이라기보다 다른 도면으로 바뀌는 느낌을 줄 수 있었다.
+- 수정 방향: centered footprint geometry 위에 좌우 growth zone, 6m 기준 점선, 상·하 벽선, 좌·우 사이드 월을 별도 SVG overlay로 애니메이션했다.
+- 실제 변경 파일: `components/customize/CustomizeConfigurator.tsx`
+- UI/UX 변경: Standard 3x9 선택 시 좌우 벽선이 바깥으로 이동하고 수평 벽선이 6m 기준선에서 9m 폭으로 늘어나는 장면이 보인다.
+- 검증 방법: Playwright visual QA에서 compact/final/intermediate 전환 스크린샷, E2E floorplan assertions, console/error/overflow checks.
+- 결과: local visual QA summary `problems: []`; wall-line geometry changed from `x1 212→62`, `x2 788→938` with a midframe at `x1 182.86`, `x2 817.14`. Option info modal image rendered with nonzero natural dimensions after adding dialog semantics.
+- 남은 리스크: 실제 생산 도면 정밀도와는 별개로 구매 이해용 guide overlay이므로, 향후 CAD 기반 도면 전환으로 고도화 가능.
diff --git a/components/customize/CustomizeConfigurator.tsx b/components/customize/CustomizeConfigurator.tsx
index bf6ccaa..a39284c 100644
--- a/components/customize/CustomizeConfigurator.tsx
+++ b/components/customize/CustomizeConfigurator.tsx
@@ -1,7 +1,7 @@
 'use client';

 import { useEffect, useMemo, useState, useTransition, type Dispatch, type ReactNode, type SetStateAction } from 'react';
-import { motion } from 'framer-motion';
+import { motion, useReducedMotion } from 'framer-motion';
 import Link from 'next/link';
 import Image from 'next/image';
 import { toast } from 'sonner';
@@ -837,6 +837,7 @@ function FloorplanCanvas({
         opacity="0.9"
       />

+      <FloorplanExpansionGuides box={box} />
       <FloorplanLengthRail box={box} lengthM={model.lengthM} />

       {selectedOptions.map((option) => option.overlayImagePath ? (
@@ -869,6 +870,134 @@ function FloorplanCanvas({
   );
 }

+function FloorplanExpansionGuides({ box }: { box: ReturnType<typeof floorplanSize> }) {
+  const shouldReduceMotion = useReducedMotion();
+  const transition = shouldReduceMotion ? { duration: 0 } : { duration: 0.72, ease: 'easeInOut' };
+  const compactX = 500 - 600 / 2;
+  const compactRightX = compactX + 600;
+  const extensionWidth = Math.max(0, (box.width - 600) / 2);
+  const hasExpansion = extensionWidth > 0;
+  const inset = 12;
+  const leftX = box.x + inset;
+  const rightX = box.x + box.width - inset;
+  const topY = box.y + inset;
+  const bottomY = box.y + box.height - inset;
+  const guideOpacity = hasExpansion ? 0.95 : 0.72;
+
+  return (
+    <g data-testid="floorplan-expansion-guides" pointerEvents="none">
+      <motion.rect
+        data-testid="floorplan-left-growth-zone"
+        initial={false}
+        animate={{ x: box.x + inset, width: Math.max(0, extensionWidth - inset), opacity: hasExpansion ? 0.28 : 0 }}
+        transition={transition}
+        y={box.y + inset}
+        height={box.height - inset * 2}
+        rx="4"
+        fill="#d7efe9"
+      />
+      <motion.rect
+        data-testid="floorplan-right-growth-zone"
+        initial={false}
+        animate={{ x: box.x + box.width - extensionWidth, width: Math.max(0, extensionWidth - inset), opacity: hasExpansion ? 0.28 : 0 }}
+        transition={transition}
+        y={box.y + inset}
+        height={box.height - inset * 2}
+        rx="4"
+        fill="#d7efe9"
+      />
+
+      <motion.line
+        data-testid="floorplan-compact-left-reference"
+        initial={false}
+        animate={{ opacity: hasExpansion ? 0.58 : 0 }}
+        transition={transition}
+        x1={compactX}
+        y1={box.y + 18}
+        x2={compactX}
+        y2={box.y + box.height - 18}
+        stroke="#b88b26"
+        strokeWidth="3"
+        strokeDasharray="7 7"
+        strokeLinecap="round"
+      />
+      <motion.line
+        data-testid="floorplan-compact-right-reference"
+        initial={false}
+        animate={{ opacity: hasExpansion ? 0.58 : 0 }}
+        transition={transition}
+        x1={compactRightX}
+        y1={box.y + 18}
+        x2={compactRightX}
+        y2={box.y + box.height - 18}
+        stroke="#b88b26"
+        strokeWidth="3"
+        strokeDasharray="7 7"
+        strokeLinecap="round"
+      />
+
+      <motion.line
+        data-testid="floorplan-expansion-top-wall"
+        initial={false}
+        animate={{ x1: leftX, x2: rightX, opacity: guideOpacity }}
+        transition={transition}
+        y1={topY}
+        y2={topY}
+        stroke="#0d6e66"
+        strokeWidth="5"
+        strokeLinecap="round"
+      />
+      <motion.line
+        data-testid="floorplan-expansion-bottom-wall"
+        initial={false}
+        animate={{ x1: leftX, x2: rightX, opacity: guideOpacity }}
+        transition={transition}
+        y1={bottomY}
+        y2={bottomY}
+        stroke="#0d6e66"
+        strokeWidth="5"
+        strokeLinecap="round"
+      />
+      <motion.line
+        data-testid="floorplan-expansion-left-wall"
+        initial={false}
+        animate={{ x1: leftX, x2: leftX, opacity: guideOpacity }}
+        transition={transition}
+        y1={topY}
+        y2={bottomY}
+        stroke="#0d6e66"
+        strokeWidth="5"
+        strokeLinecap="round"
+      />
+      <motion.line
+        data-testid="floorplan-expansion-right-wall"
+        initial={false}
+        animate={{ x1: rightX, x2: rightX, opacity: guideOpacity }}
+        transition={transition}
+        y1={topY}
+        y2={bottomY}
+        stroke="#0d6e66"
+        strokeWidth="5"
+        strokeLinecap="round"
+      />
+
+      <motion.text
+        data-testid="floorplan-expansion-label"
+        initial={false}
+        animate={{ x: box.x + box.width / 2, opacity: hasExpansion ? 1 : 0 }}
+        transition={transition}
+        y={box.y + 32}
+        fill="#0d6e66"
+        fontSize="13"
+        fontWeight="900"
+        textAnchor="middle"
+      >
+        6m 기준선에서 9m로 확장
+      </motion.text>
+    </g>
+  );
+}
+
 function FloorplanLengthRail({ box, lengthM }: { box: ReturnType<typeof floorplanSize>; lengthM: number }) {
   const railY = box.y + box.height + 34;
   const labelX = box.x + box.width / 2;
@@ -1014,6 +1143,7 @@ function hasOptionInfo(option: CustomizeOption) {
 function OptionInfoModal({ option, onClose }: { option: CustomizeOption; onClose: () => void }) {
   const optionKey = option.key || option.id;
   const fallback = FALLBACK_CATALOG[optionKey] || FALLBACK_CATALOG[option.id];
+  const titleId = `option-info-title-${optionKey}`;

   const imagePath = `/images/customize/options/${optionKey}.webp?v=${OPTION_IMAGE_VERSION}`;
   const desc = option.detailDescriptionKo || option.shortDescriptionKo || fallback?.desc || '상세 정보가 준비 중입니다.';
@@ -1021,7 +1151,13 @@ function OptionInfoModal({ option, onClose }: { option: CustomizeOption; onClose

   return (
     <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#4b4033]/35 p-4" onClick={onClose}>
-      <div className="w-full max-w-xl rounded-lg bg-[#fbfaf7] p-5 shadow-2xl" onClick={(event) => event.stopPropagation()}>
+      <div
+        role="dialog"
+        aria-modal="true"
+        aria-labelledby={titleId}
+        className="w-full max-w-xl rounded-lg bg-[#fbfaf7] p-5 shadow-2xl"
+        onClick={(event) => event.stopPropagation()}
+      >
         <div className="mb-4 flex items-start justify-between gap-4">
           <div>
             <div className="mb-1 flex items-center gap-2">
@@ -1029,7 +1165,7 @@ function OptionInfoModal({ option, onClose }: { option: CustomizeOption; onClose
               {option.priceType === 'consult' && <span className="rounded bg-[#f4f0e8] px-2 py-0.5 text-[11px] font-black text-[#a56f16]">스펙 협의</span>}
               {option.priceType === 'fixed' && <p className="text-xs font-bold text-[#8a806f]">{formatOptionPrice(option)}</p>}
             </div>
-            <h3 className="text-xl font-black text-[#2f3432]">{option.nameKo}</h3>
+            <h3 id={titleId} className="text-xl font-black text-[#2f3432]">{option.nameKo}</h3>
           </div>
           <Button variant="ghost" size="icon-sm" onClick={onClose}>
             <X className="h-4 w-4" />

```

## Relevant Implementation Notes

- Added `FloorplanExpansionGuides` inside `components/customize/CustomizeConfigurator.tsx`.
- It renders pale teal growth zones, tan 6m reference lines, and teal top/bottom/left/right wall lines over the base floorplan.
- It uses existing centered `floorplanSize(model)` geometry, so Compact 3x6 and Standard 3x9 stay centered.
- Framer Motion animates SVG line attributes from compact to standard geometry; `useReducedMotion` sets transition duration to 0 when motion reduction is requested.
- Added `role=dialog`, `aria-modal`, and `aria-labelledby` to option info modal so option detail modals are accessible and testable as real dialogs.

## Commands Run

- `npm run lint`: pass.
- `npm test`: pass, 3 files / 20 tests.
- `npm run build`: pass; existing Next.js middleware-to-proxy deprecation warning remains.
- `npx playwright test e2e/customize-configurator.spec.ts e2e/public-pages.spec.ts --project=chromium`: pass, 22/22 before the final modal role patch.
- `npx playwright test e2e/customize-configurator.spec.ts --project=chromium`: pass, 8/8 after the final modal role patch.
- `git diff --check`: pass.

## Browser / Visual QA Findings

Local production server: `http://localhost:3100`.

QA artifacts: `.codex/qa/expansion-guide-20260610/`.

Visual QA summary:

```json
{
  "problems": [],
  "localOnlyIgnoredConsole": [
    "Vercel Web Analytics script returns 404/MIME warnings on localhost only; production-domain QA will re-check real domain."
  ],
  "desktopExpansion": {
    "compactX1": 212,
    "midX1": 182.8561114835902,
    "finalX1": 62,
    "compactX2": 788,
    "midX2": 817.1438885164098,
    "finalX2": 938
  },
  "modal": {
    "visible": true,
    "label": "option-info-title-solar-panel",
    "imageSrc": "http://localhost:3100/images/customize/options/solar-panel.webp?v=20260610-0137",
    "naturalWidth": 1672,
    "naturalHeight": 941,
    "hasPlaceholder": false
  }
}
```

Manual screenshot review:

- `desktop-floorplan-expanding-midframe.png`: teal wall line is visibly moving outward during transition.
- `desktop-floorplan-standard-final.png`: 6m tan reference lines remain visible, pale teal growth zones mark the added footprint, and the 9m plan is centered.
- `desktop-solar-panel-modal.png`: option info modal image renders with nonzero natural dimensions and no placeholder copy.
- `mobile-customize.png`: mobile stepper and bottom `주문하기` CTA fit without horizontal overflow.

## Current Failures / Risks

- Localhost shows Vercel Analytics `/_vercel/insights/script.js` 404/MIME console noise; this is ignored locally and will be rechecked on production domain after push/promote.
- Existing Next.js middleware-to-proxy deprecation warning remains unrelated.
- The expansion guide is a buyer-facing explanatory overlay, not a CAD-grade construction drawing.

## Exact Review Questions

Please review as GPT-5.5 Pro with a strict product/UX/code lens. Focus only on the current post-PASS diff and whether it safely satisfies the Stickies steering.

Return exactly this structure:

```text
MARKER: WEET_REVIEW_20260610_EXPANSION_GUIDE_03
VERDICT: PASS | MUST_FIX

MUST_FIX:
- ...

OPTIONAL:
- ...

RATIONALE:
- ...
```

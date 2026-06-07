# Weet Review Packet - Customize Floorplan + Confidence Slice

Marker: `WEET_REVIEW_20260607_CUSTOMIZE_PRODUCTION_ZOOM_04`
Generated: 2026-06-07 KST

## Active Task Brief

The user requested a recursive improvement loop for the Weet movable-home website, with these standing constraints:

- Use Antigravity IDE/Gemini through Computer Use for frontend implementation, then Codex verifies and accepts only intended changes.
- Use GPT-5.5 Pro Deep Research in Chrome for review when the surface is safe.
- Do not ask the user for approval.
- Test real interactions across PC, tablet, and mobile.
- Record bugs, UX concerns, simulations, and future work in `agent-inbox/`.
- User-reported bug: `/customize` order page shows the 3x6 and 3x9 floorplans at the same size / visually confused.

This packet covers the current `/customize` slice: model-specific floorplan correction, image failure fallback, conversion-confidence content, and mobile sticky CTA safety.

## Latest Addendum - Production Zoom Finding

- Commit `1f4c37a` was pushed to `zoo/customize-configurator` and promoted to Vercel Production through Chrome/Vercel.
- Vercel production detail showed commit `1f4c37a`, `Production`, `Ready`, and custom domain `www.we-et.com`.
- `https://we-et.com/customize` returned a 307 redirect to `https://www.we-et.com/customize`; `https://www.we-et.com/customize` returned 200.
- Production PC/tablet/mobile Playwright QA confirmed the main floorplan uses distinct SVGs:
  - compact: `/images/customize/compact-3x6-base.svg`
  - standard: `/images/customize/standard-3x9-base.svg`
- Production QA then found an additional real UX issue: the zoom modal initially rendered generated `model-footprint` fallback instead of the already-loaded `Standard 3x9` SVG because the modal `FloorplanCanvas` started a separate image-load status.
- Local fix applied after that finding: `CustomizeConfigurator` now computes the current floorplan path/load status once and passes it to the main preview, zoom modal, and consultation modal preview.
- Post-fix local validation passed:
  - `npx playwright test e2e/customize-configurator.spec.ts`
  - `npm run lint`
  - `npm test`
  - `npm run build`
  - `git diff --check`
- Follow-up commit `5fff2fc` was pushed and promoted to Vercel Production.
- Final production QA on `https://we-et.com/customize?v=5fff2fc` passed on desktop/tablet/mobile:
  - main compact SVG count 1 with `/images/customize/compact-3x6-base.svg`
  - main standard SVG count 1 with `/images/customize/standard-3x9-base.svg`
  - zoom dialog standard SVG count 1 immediately after opening
  - zoom dialog `model-footprint` count 0
  - sticky CTA clearance passed
  - no horizontal overflow
  - no console/page errors
- Visual inspection of `.codex/qa/production-customize-postfix/mobile-zoom-immediate.png` and `desktop-zoom-immediate.png` confirmed the actual `Standard 3x9` SVG is visible in the zoom modal.

## Current Progress And State

- Antigravity IDE implemented the first draft of the `/customize` conversion-confidence section.
- Codex reviewed the Antigravity diff, accepted intended changes, and continued validation/fixes locally.
- Actual root cause for the floorplan bug was confirmed: public `customize_models` data currently points both `compact-3x6` and `standard-3x9` to `/images/customize/dummy-base.svg`.
- Added model-specific fallback SVG assets:
  - `/images/customize/compact-3x6-base.svg`
  - `/images/customize/standard-3x9-base.svg`
- Added code that replaces the placeholder `dummy-base.svg` with the correct model-specific local SVG.
- Added a `window.Image()` preloader so a broken base SVG path falls back to generated footprint rendering instead of hiding the fallback.
- Added model comparison, recommended-use copy, included/separate scope, and a 5-item site readiness checklist below the floorplan.
- Fixed a real mobile bug where the final checklist item could sit under the sticky `주문하기` CTA.
- Updated `agent-inbox/implementation-backlog.md`, `agent-inbox/pro-review-failures.md`, and `.codex/state.md`.

## Project Snapshot

- Repo: `/Users/zoopark-studio/Documents/dev/weet-homepage`
- Framework: Next.js 16.2.7 App Router
- Route: `/customize`
- Component: `components/customize/CustomizeConfigurator.tsx`
- E2E: `e2e/customize-configurator.spec.ts`
- Local audit server: `http://localhost:3000`
- Deployment validation note: `agent-inbox/웹 접속 방법.md` now instructs future web checks to use actual `we-et.com` after Vercel deployment, not localhost.

## Git Status

```text
 M .codex/review-packet.md
 M .codex/state.md
 M agent-inbox/implementation-backlog.md
 M agent-inbox/pro-review-failures.md
 M components/customize/CustomizeConfigurator.tsx
 M e2e/customize-configurator.spec.ts
?? .codex/qa/
?? agent-inbox/UI-design.md
?? agent-inbox/gpt프로 심층리서치 대기.md
?? agent-inbox/안티그래비티의 작업범위.md
?? agent-inbox/웹 접속 방법.md
?? public/images/customize/compact-3x6-base.svg
?? public/images/customize/standard-3x9-base.svg
```

## Changed Files

Implementation:

- `components/customize/CustomizeConfigurator.tsx`
- `e2e/customize-configurator.spec.ts`
- `public/images/customize/compact-3x6-base.svg`
- `public/images/customize/standard-3x9-base.svg`

Records and review artifacts:

- `.codex/review-packet.md`
- `.codex/state.md`
- `.codex/qa/customize-confidence/*`
- `agent-inbox/implementation-backlog.md`
- `agent-inbox/pro-review-failures.md`
- `agent-inbox/UI-design.md`
- `agent-inbox/gpt프로 심층리서치 대기.md`
- `agent-inbox/안티그래비티의 작업범위.md`
- `agent-inbox/웹 접속 방법.md`

## Git Diff

Current tracked diff stat:

```text
 .codex/review-packet.md                        | 615 ++++++++++---------------
 .codex/state.md                                |  28 +-
 agent-inbox/implementation-backlog.md          |  15 +-
 agent-inbox/pro-review-failures.md             |   8 +
 components/customize/CustomizeConfigurator.tsx | 179 ++++++-
 e2e/customize-configurator.spec.ts             |  76 ++-
 6 files changed, 548 insertions(+), 373 deletions(-)
```

Untracked SVG assets are new and intentional.

Key code diff excerpts:

```diff
+const PLACEHOLDER_FLOORPLAN_PATH = '/images/customize/dummy-base.svg';
+const MODEL_FALLBACK_FLOORPLANS: Record<string, string> = {
+  'compact-3x6': '/images/customize/compact-3x6-base.svg',
+  'standard-3x9': '/images/customize/standard-3x9-base.svg',
+};
+
+function floorplanImagePathForModel(model: CustomizeModel) {
+  const configuredPath = model.floorplanImagePath?.trim();
+  const fallbackPath = MODEL_FALLBACK_FLOORPLANS[model.id];
+
+  if (!configuredPath) return fallbackPath ?? null;
+  if (configuredPath === PLACEHOLDER_FLOORPLAN_PATH) return fallbackPath ?? configuredPath;
+  return configuredPath;
+}
```

```diff
+function useFloorplanImageStatus(path: string | null) {
+  const [result, setResult] = useState<{ path: string; status: 'loaded' | 'failed' } | null>(null);
+
+  useEffect(() => {
+    if (!path) return;
+
+    let cancelled = false;
+    const image = new window.Image();
+
+    image.onload = () => {
+      if (!cancelled) setResult({ path, status: 'loaded' });
+    };
+    image.onerror = () => {
+      if (!cancelled) setResult({ path, status: 'failed' });
+    };
+    image.src = path;
+
+    return () => {
+      cancelled = true;
+    };
+  }, [path]);
+
+  if (!path) return 'missing';
+  if (result?.path !== path) return 'loading';
+  return result.status;
+}
```

```diff
-  const hasBaseImage = Boolean(model.floorplanImagePath);
+  const floorplanImagePath = floorplanImagePathForModel(model);
+  const imageStatus = useFloorplanImageStatus(floorplanImagePath);
+  const hasBaseImage = imageStatus === 'loaded';
```

```diff
+          <div className="border-t border-[#d8d0c3] bg-[#fbfaf7] px-4 py-12 md:px-8 lg:px-10">
+            <ConversionConfidenceSection catalog={catalog} />
+          </div>
```

The added `ConversionConfidenceSection` includes:

- `어떤 모델이 적합할까요?`
- model cards with dimensions, area, starting price, and recommended-use copy
- `포함 사항 및 별도 준비`
- `현장 체크리스트` with 5 togglable readiness checks and `aria-pressed`
- mobile bottom padding `pb-32 lg:pb-10` so final checklist content clears the sticky CTA

Key E2E diff excerpts:

```diff
-    await expect(page.getByTestId('base-floorplan-image')).toHaveAttribute('href', /dummy-base\.svg/);
+    await expect(page.getByTestId('base-floorplan-image')).toHaveAttribute('href', /compact-3x6-base\.svg/);
...
+    await expect(page.getByTestId('base-floorplan-image')).toHaveAttribute('href', /standard-3x9-base\.svg/);
```

```diff
+  test('floorplan falls back to generated footprint when the base image fails', async ({ page }) => {
+    await page.route('**/compact-3x6-base.svg', (route) => route.abort());
+    await page.goto('/customize');
+    await page.waitForLoadState('networkidle');
+
+    await expect(page.getByRole('heading', { level: 1, name: 'Compact 3x6' })).toBeVisible();
+    await expect(page.getByTestId('base-floorplan-image')).toHaveCount(0);
+    await expect(page.getByTestId('model-footprint')).toHaveCount(1);
+    await expect(page.getByTestId('model-footprint')).toHaveAttribute('width', '600');
+  });
```

```diff
+  test('conversion confidence section appears on mobile and toggles work safely', async ({ page }) => {
+    await page.setViewportSize({ width: 390, height: 844 });
+    ...
+    await page.evaluate(() => {
+      document.documentElement.style.scrollBehavior = 'auto';
+      window.scrollTo(0, document.documentElement.scrollHeight);
+    });
+    await page.waitForFunction(
+      () => window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2
+    );
+    const [lastBox, orderBox] = await Promise.all([lastCheck.boundingBox(), orderButton.boundingBox()]);
+    expect(lastBox!.y + lastBox!.height).toBeLessThanOrEqual(orderBox!.y - 8);
+  });
```

## Relevant File Excerpts

Actual public catalog evidence gathered with the Supabase anon client:

```json
[
  {
    "id": "compact-3x6",
    "floorplan_image_path": "/images/customize/dummy-base.svg"
  },
  {
    "id": "standard-3x9",
    "floorplan_image_path": "/images/customize/dummy-base.svg"
  }
]
```

This is why code now treats `dummy-base.svg` as a placeholder, not a trustworthy final model-specific floorplan.

`FloorplanCanvas` behavior now:

- If the resolved model-specific floorplan loads: render `<image data-testid="base-floorplan-image" href="...model-specific.svg" />`.
- If no image exists or the image load fails: render generated fallback grid, base objects, and `model-footprint`.
- Option overlay images and selected option labels still render after either base path.

## Commands Run

```text
git status --short
git diff --stat
git diff --check
curl -I http://localhost:3000/customize
npm run lint
npm test
npx playwright test e2e/customize-configurator.spec.ts
npm run build
Node/Supabase public query for customize_models floorplan paths
Node/Playwright PC/tablet/mobile interaction audit for /customize
```

## Test / Lint / Build Output

`git diff --check`: passed with no output.

`npm run lint`: passed after rerunning sequentially. One earlier lint invocation failed due a filesystem race while Playwright was concurrently creating/removing `test-results`; rerun after `rm -rf test-results` passed.

```text
> eslint . --max-warnings=0
```

`npm test`:

```text
Test Files  3 passed (3)
Tests       20 passed (20)
```

`npx playwright test e2e/customize-configurator.spec.ts`:

```text
10 passed (5.4s)
```

`npm run build`:

```text
✓ Compiled successfully
✓ Generating static pages using 27 workers (20/20)
Route /customize is dynamic server-rendered
```

Known unrelated build warning:

```text
⚠ The "middleware" file convention is deprecated. Please use "proxy" instead.
```

## Browser / Playwright Findings

Generated QA artifacts:

- `.codex/qa/customize-confidence/desktop-compact.png`
- `.codex/qa/customize-confidence/desktop-standard-confidence.png`
- `.codex/qa/customize-confidence/tablet-compact.png`
- `.codex/qa/customize-confidence/tablet-standard-confidence.png`
- `.codex/qa/customize-confidence/mobile-compact.png`
- `.codex/qa/customize-confidence/mobile-standard-confidence.png`
- `.codex/qa/customize-confidence/summary.json`

PC/tablet/mobile audit summary:

```json
{
  "desktop": {
    "compactHref": "/images/customize/compact-3x6-base.svg",
    "standardHref": "/images/customize/standard-3x9-base.svg",
    "hrefsDiffer": true,
    "floorplans": 1,
    "footprints": 0,
    "horizontallyOffscreen": [],
    "lastCheckAboveOrderButton": true,
    "consoleMessages": [],
    "pageErrors": []
  },
  "tablet": {
    "compactHref": "/images/customize/compact-3x6-base.svg",
    "standardHref": "/images/customize/standard-3x9-base.svg",
    "hrefsDiffer": true,
    "floorplans": 1,
    "footprints": 0,
    "horizontallyOffscreen": [],
    "lastCheckAboveOrderButton": true,
    "consoleMessages": [],
    "pageErrors": []
  },
  "mobile": {
    "compactHref": "/images/customize/compact-3x6-base.svg",
    "standardHref": "/images/customize/standard-3x9-base.svg",
    "hrefsDiffer": true,
    "floorplans": 1,
    "footprints": 0,
    "horizontallyOffscreen": [],
    "lastCheckBottom": 668,
    "orderButtonTop": 778,
    "lastCheckAboveOrderButton": true,
    "consoleMessages": [],
    "pageErrors": []
  }
}
```

Visual inspection:

- Desktop Compact shows a shorter 600-width plan.
- Desktop Standard shows a longer 900-width plan.
- Mobile Standard keeps the option button, confidence content, checklist toggles, and sticky order CTA functional.
- Full-page screenshots can show sticky bars in the middle due screenshot mechanics, but coordinate checks confirm final checklist content clears the fixed order CTA in actual viewport geometry.

## Current Failures Or Risks

- GPT-5.5 Pro Deep Research for the earlier marker eventually showed report-card snippets, but the conversation still opened as a collapsed/empty assistant iframe. No complete response could be copied, so `.codex/pro-review.md` has not been saved.
- One concrete Pro snippet about broken floorplan-image fallback was locally verified and fixed.
- Current packet has not yet received a valid GPT-5.5 Pro review.
- Real `we-et.com` / Vercel deployment validation is still pending per `agent-inbox/웹 접속 방법.md`.
- Model recommendation copy is still hard-coded for the current two model IDs.
- Transport/crane/foundation/utility/permit costs are listed as separate scope, but numeric examples are still future work.
- Existing Next middleware-to-proxy warning remains.

## Exact Review Questions

Please review this packet as GPT-5.5 Pro.

Return exactly these sections:

1. `VERDICT: PASS` or `VERDICT: REVISE`
2. `MUST_FIX`
3. `OPTIONAL`
4. `RATIONALE`

Focus only on concrete issues in this current `/customize` floorplan/confidence slice.

Questions:

- Is treating `/images/customize/dummy-base.svg` as a placeholder and substituting model-specific local SVGs acceptable, or should the DB be migrated immediately instead?
- Is the `window.Image()` preloader fallback approach safe for SVG floorplans in a client component?
- Are the added E2E tests sufficient for: model-specific floorplan href, fallback on image failure, mobile sticky CTA clearance, and floorplan single-rendering?
- Should the model recommendation copy be data-driven before completion, given the current catalog has only two active model IDs?
- Are there any concrete `MUST_FIX` items before this slice can be considered complete?

# GPT-5.5 Pro Review Packet

## Marker

WEET_IMAGE_SECOND_PASS_REVIEW_20260620_001

## Active Task Brief

The user requested a second-pass quality improvement for `https://www.we-et.com`:

- Find generated images that still do not feel Korean or still look AI-generated, and improve them.
- Specifically fix the bespoke smart-farm image where the Porter-style truck looked artificially blank after text/logo removal.
- In this pass, people and text-like real-world details are allowed if they increase realism.
- Improve the `/customize` option info modal opened by each `i` button:
  - Remove pill-shaped keyword/spec boxes.
  - Add 1-3 appropriate explanatory images per option.
  - Supplement each option's detailed explanation.
- Improve the `/modular` page images so they are modular-appropriate and high quality.

Image generation was performed through visible Chrome/ChatGPT image mode using the Thinking model with expanded reasoning where available, not Pro. i2i was used for improved image targets.

## Current Progress / State

Implementation, deployment, local validation, and live visual QA are complete.

- Refreshed bespoke smart-farm image.
- Refreshed four modular page images.
- Kept modular interior image after two ChatGPT generation attempts stalled.
- Rewired `/modular` to use generated modular assets.
- Rebuilt the `/customize` option info modal with explanatory images and richer copy.
- Removed the old pill/spec keyword UI from the modal.
- Added E2E coverage for the modal behavior.
- Deployed to Vercel production and verified `https://www.we-et.com`.

## Project Snapshot

- Framework: Next.js app router.
- Main changed UI files:
  - `app/modular/page.tsx`
  - `components/customize/lib/constants.ts`
  - `components/customize/parts/OptionInfoModal.tsx`
  - `e2e/customize-configurator.spec.ts`
  - `next.config.ts`
- Refreshed image files:
  - `public/images/handoff/bsp-farm.webp`
  - `public/images/modular/generated/modular-hero.webp`
  - `public/images/modular/generated/factory-precision.webp`
  - `public/images/modular/generated/transport-install.webp`
  - `public/images/modular/generated/flexible-commercial.webp`

## Git Status

```
 M .codex/current-task.md
 M .codex/review-packet.md
 M .codex/state.md
 M .gitignore
 M app/modular/page.tsx
 M app/solution/energy/page.tsx
 M app/solution/page.tsx
 M components/customize/lib/constants.ts
 M components/customize/parts/OptionInfoModal.tsx
 M e2e/customize-configurator.spec.ts
 M next.config.ts
 M public/images/handoff/bsp-cafe.webp
 M public/images/handoff/bsp-farm.webp
 M public/images/handoff/bsp-popup.webp
 M public/images/handoff/bsp-stay.webp
 M public/images/handoff/sup-1.webp
 M public/images/handoff/sup-3.webp
 M public/images/handoff/sup-6.webp
 M public/images/hero_main.webp
 M public/images/modular/generated/factory-precision.webp
 M public/images/modular/generated/flexible-commercial.webp
 M public/images/modular/generated/modular-hero.webp
 M public/images/modular/generated/transport-install.webp
 M public/images/solution/generated/kr-control-realphoto.webp
 M public/images/solution/generated/kr-network-realphoto.webp
 M public/images/solution/generated/kr-security-realphoto.webp
?? .vercelignore
?? public/images/solution/generated/kr-energy-realphoto.webp
```

Note: this working tree also contains the earlier site-wide image refresh from the same user image-improvement thread: landing/support/bespoke/solution static assets, solution code paths, `.gitignore`, `.vercelignore`, and one new solution energy asset. Those earlier changes were not reverted.

## Relevant Code Diff Excerpts

### `/modular` image paths

```diff
-const PROCESS_IMAGES: Record<string, string> = {
-  'factory-precision': '/images/handoff/mod-factory.webp',
-  'transport-install': '/images/handoff/mod-transport.webp',
-  'interior-comfort': '/images/handoff/mod-interior.webp',
-  'flexible-commercial': '/images/handoff/bsp-stay.webp',
+const PROCESS_IMAGES: Record<string, string> = {
+  'factory-precision': '/images/modular/generated/factory-precision.webp',
+  'transport-install': '/images/modular/generated/transport-install.webp',
+  'interior-comfort': '/images/modular/generated/interior-comfort.webp',
+  'flexible-commercial': '/images/modular/generated/flexible-commercial.webp',
 };

-const HERO_IMAGE = '/images/handoff/mod-hero.webp';
+const HERO_IMAGE = '/images/modular/generated/modular-hero.webp';
```

### Customize modal behavior

```diff
+function normalizeOptionImage(option: CustomizeOption, optionKey: string, hasFallback: boolean) {
+  if (hasFallback) return `/images/customize/options/${optionKey}.webp?v=${OPTION_IMAGE_VERSION}`;
+  if (!option.imagePath) return null;
+  return option.imagePath.startsWith('/') ? option.imagePath : `/${option.imagePath}`;
+}
```

```diff
-        {specs.length > 0 && (
-          <div className="mb-3.5 flex flex-wrap gap-2">
-            {specs.map((spec) => (
-              <span className="... rounded-full ...">
-                {spec}
-              </span>
-            ))}
-          </div>
-        )}
+          {imageSrc && (
+            <figure className="mb-5">
+              <div className="relative aspect-[16/9] overflow-hidden rounded-md border border-customize-shell bg-customize-linen">
+                <Image
+                  src={imageSrc}
+                  alt={guide?.imageAlt || `${option.nameKo} 상세 설명 이미지`}
+                  fill
+                  className="object-cover"
+                  data-testid="option-info-image"
+                  unoptimized
+                />
+              </div>
+            </figure>
+          )}
```

### Modal E2E coverage

```diff
+  test('option info modal shows explanatory image and no keyword pills', async ({ page }) => {
+    await page.goto('/customize');
+    await page.waitForLoadState('networkidle');
+    await page.getByTestId('customize-step-included').click();
+    await page.getByTestId('customize-desktop-rail').getByTestId('option-info-basic-window').click();
+    const dialog = page.getByRole('dialog', { name: '기본창' });
+    await expect(dialog.getByTestId('option-info-image')).toBeVisible();
+    await expect(dialog.getByText('추천 사용:', { exact: false })).toBeVisible();
+    await expect(dialog.getByText('상담 때 확인할 점:', { exact: false })).toBeVisible();
+    await expect(dialog.getByText('상담 메모')).toBeVisible();
+    await expect(dialog.getByText('채광/환기')).toHaveCount(0);
+    await expect(dialog.getByText('단열 검토')).toHaveCount(0);
+  });
```

### Turbopack root fix

```diff
 const nextConfig: NextConfig = {
   poweredByHeader: false,
+  turbopack: {
+    root: process.cwd(),
+  },
```

## Commands Run / Validation Output

```
$ npm run lint
> eslint . --max-warnings=0
Result: passed

$ npm run build
Result: passed
Note: existing Next middleware deprecation warning only.

$ npx playwright test e2e/customize-configurator.spec.ts --grep "option info modal"
1 passed (5.3s)
```

Earlier E2E attempts exposed two issues that were fixed:

- Turbopack inferred `/Users/zoopark-studio` as workspace root and failed to resolve `@vercel/analytics/next`. Fixed with `turbopack.root = process.cwd()`.
- The modal test initially hit duplicate desktop/mobile info buttons and the wrong expected title. Fixed by scoping to `customize-desktop-rail` and using the actual title `기본창`.

## Browser / Visual QA Findings

### Local QA

Local Playwright visual QA covered `/customize`, `/modular`, and `/bespoke` on desktop and mobile.

```
/customize option modal:
- image: /images/customize/options/basic-window.webp?v=20260610-0137
- natural size: 1672x941
- keywordPillText: false

/modular:
- generated modular images loaded
- brokenImages: []

/bespoke:
- refreshed smart farm image loaded
- brokenImages: []

consoleErrors: []
pageErrors: []
mobile overflow: false
```

QA artifacts:

- `.codex/qa/second-pass-local/summary.json`
- `.codex/qa/second-pass-local/mobile-summary.json`
- `.codex/qa/second-pass-local/modular-factory-precision.png`
- `.codex/qa/second-pass-local/modular-transport-install.png`
- `.codex/qa/second-pass-local/modular-flexible-commercial.png`

### Live QA

Live Playwright visual QA covered `https://www.we-et.com/customize`, `/modular`, and `/bespoke`.

```
/customize modal desktop:
- image: https://www.we-et.com/images/customize/options/basic-window.webp?v=20260610-0137
- natural size: 1672x941
- rendered size: 724x406
- keywordPillText: false

/modular desktop:
- overflow: false
- brokenImages: []
- loaded modular generated images:
  - /images/modular/generated/modular-hero.webp
  - /images/modular/generated/factory-precision.webp
  - /images/modular/generated/transport-install.webp
  - /images/modular/generated/interior-comfort.webp
  - /images/modular/generated/flexible-commercial.webp

/bespoke desktop/mobile:
- refreshed /images/handoff/bsp-farm.webp loaded
- brokenImages: []

consoleErrors: []
pageErrors: []
```

Live screenshot artifacts:

- `.codex/qa/second-pass-live/desktop-customize-modal-painted.png`
- `.codex/qa/second-pass-live/desktop-modular-transport.png`
- `.codex/qa/second-pass-live/mobile-bespoke-smartfarm.png`
- `.codex/qa/second-pass-live/summary.json`
- `.codex/qa/second-pass-live/customize-modal-painted.json`

## Production Deployment

Vercel production deployment succeeded and was aliased to:

- `https://www.we-et.com`
- Deployment URL: `https://weet-homepage-exq27ro4r-weets-projects-6c7745e8.vercel.app`

Production static SHA-256 checks confirmed the live files match local files for:

- `/images/handoff/bsp-farm.webp`
- `/images/modular/generated/modular-hero.webp`
- `/images/modular/generated/factory-precision.webp`
- `/images/modular/generated/transport-install.webp`
- `/images/modular/generated/flexible-commercial.webp`

## Known Failures / Risks

- GPT-5.5 Pro review may still be blocked by account/workspace quota. A prior attempt in this task thread showed a disabled Pro option with `한도에 도달했습니다. 관리자에게 액세스를 요청하세요`.
- Modular interior image regeneration was attempted twice through Chrome/ChatGPT i2i, but both attempts stalled at `더욱 자세한 이미지를 생성하고 있습니다`. The existing `interior-comfort.webp` remains; live QA confirms it loads correctly.
- The new customize modal currently uses one explanatory image per option because a full set of suitable option images already exists at `/images/customize/options/*.webp`. The user's range was 1-3 images, so this satisfies the lower bound while keeping the modal compact.

## Exact Review Questions

Please review for concrete `MUST_FIX` issues only:

1. Is the customize option info modal implementation likely to regress accessibility, responsiveness, or data-driven option behavior?
2. Is using one existing explanatory image per fallback option acceptable for the user's "1-3 images" requirement, given the images now load in the modal and the copy was expanded?
3. Are the modular image path changes safe, including keeping `interior-comfort.webp` after the two failed regeneration attempts?
4. Is the `turbopack.root = process.cwd()` config change safe for this repo, or could it break deployment/local dev behavior?
5. Any concrete blocking issue visible from the code excerpts, validation output, or QA evidence above?

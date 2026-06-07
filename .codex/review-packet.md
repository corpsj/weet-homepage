# Weet Review Packet - Admin Console + Customize Floorplan Slice

Marker: WEET_AUDIT_REVIEW_20260607_ADMIN_CUSTOMIZE_SLICE_01
Generated: 2026-06-07 KST

## Active Task Brief

The user requested a large recursive improvement pass for the Weet movable-home public website and admin, carrying forward these workflow constraints:

- Use Antigravity for frontend/design implementation where possible.
- Use GPT-5.5 Pro with Deep Research, model `최신 • 5.5`, `Pro • 확장`, and clipboard paste for review.
- Do not ask the user for approval; use best autonomous judgment.
- Do not use goal/loop tools.
- Thoroughly validate public and admin pages across PC, tablet, mobile, Playwright, browser interaction, and visual inspection.
- Record bugs, UX concerns, reference research, simulation results, and future work in the project-root `agent-inbox/`.
- User-reported bug: `/customize` order page looked like both 3x6 and 3x9 floorplans were overlaid.
- Redesign admin to a premium technical console consistent with Tesla dashboard / Grok / SpaceX / xAI inspirations.

## Current Progress and State

This packet covers the first implementation slice after reading `AGENTS.md`, `codex-loop.md`, `.codex/current-task.md`, `.codex/state.md`, and project-root `agent-inbox/` instructions.

Completed in this slice:

- Delegated frontend/design work to Antigravity IDE.
- Accepted intended Antigravity changes after scope review.
- Fixed the `/customize` floorplan duplicate visual layer by suppressing generated `model-footprint` when a base floorplan image exists.
- Strengthened E2E to cover desktop, tablet, and mobile floorplan model-switch behavior.
- Added a mobile-safe `/customize` floorplan zoom dialog so buyers can inspect small plan labels before ordering.
- Rebuilt the main admin shell/sidebar/dashboard into a calmer black/off-white/yellow premium console.
- Researched 25 relevant references and saved borrowable patterns to `agent-inbox/design-reference-research.md`.
- Simulated 20 public buyer personas across PC/tablet/mobile, producing 100 public observations in `agent-inbox/findings-public-simulation.md`.
- Simulated 20 admin personas across PC/tablet/mobile, producing 100 admin observations in `agent-inbox/findings-admin-simulation.md`.
- Updated `agent-inbox/implementation-backlog.md` with fixed issues and next work.
- Ran lint, unit tests, E2E, production build, and Playwright visual/browser audit.

## Project Snapshot

- Repository: `/Users/zoopark-studio/Documents/dev/weet-homepage`
- App: Next.js 16.2.7 with App Router, Supabase, Playwright, Vitest.
- Relevant public route: `/customize`.
- Relevant admin route: `/admin`.
- Dev server used for audit: `http://localhost:3000`.

## Git Status

```text
 M .codex/chatgpt-procedure.md
 M .codex/current-task.md
 M .codex/state.md
 M AGENTS.md
 M app/admin/page.tsx
 M codex-loop.md
 M components/admin/AdminShell.tsx
 M components/admin/AdminSidebar.tsx
 M components/customize/CustomizeConfigurator.tsx
 M e2e/customize-configurator.spec.ts
?? .codex/generated-images/
?? .codex/visual-audit/
?? agent-inbox/antigravity-failures.md
?? agent-inbox/design-reference-research.md
?? agent-inbox/findings-admin-simulation.md
?? agent-inbox/findings-public-simulation.md
?? agent-inbox/implementation-backlog.md
```

Tracked diff stat:

```text
 .codex/chatgpt-procedure.md                    | 112 ++++++++++++++++++-
 .codex/current-task.md                         | 112 +++++--------------
 .codex/state.md                                |  13 +++
 AGENTS.md                                      |   2 +
 app/admin/page.tsx                             | 147 ++++++++++++++++++++-----
 codex-loop.md                                  |  28 ++---
 components/admin/AdminShell.tsx                |  18 +--
 components/admin/AdminSidebar.tsx              |  46 ++++----
 components/customize/CustomizeConfigurator.tsx |  24 ++--
 e2e/customize-configurator.spec.ts             |  29 ++++-
 10 files changed, 359 insertions(+), 172 deletions(-)
```

Untracked but intentional artifacts:

- `.codex/visual-audit/*.png` and `.codex/visual-audit/audit-results.json`: PC/tablet/mobile screenshots and audit data.
- `.codex/generated-images/chatgpt-thinking-greenhouse-studio.png`: prior ChatGPT image-generation harness output.
- `agent-inbox/*.md`: trusted user/agent instruction and audit record folder requested by the user.

## Changed Files

Implementation:

- `components/customize/CustomizeConfigurator.tsx`
- `e2e/customize-configurator.spec.ts`
- `components/admin/AdminShell.tsx`
- `components/admin/AdminSidebar.tsx`
- `app/admin/page.tsx`

Workflow/docs/state:

- `.codex/chatgpt-procedure.md`
- `.codex/current-task.md`
- `.codex/state.md`
- `AGENTS.md`
- `codex-loop.md`
- `agent-inbox/antigravity-failures.md`
- `agent-inbox/design-reference-research.md`
- `agent-inbox/findings-public-simulation.md`
- `agent-inbox/findings-admin-simulation.md`
- `agent-inbox/implementation-backlog.md`

## Git Diff Summary

### `/customize` floorplan rendering

Before, the floorplan preview rendered:

- a base SVG/image when `model.floorplanImagePath` existed
- plus the generated `model-footprint` rectangle

That made the selected model look visually overlaid or double-rendered. The fix:

```tsx
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
    className="transition-all duration-[600ms]"
  />
)}
```

The base plan image remains; option overlay images and labels still render.

### E2E changes

Updated desktop expectations:

- Compact 3x6 base image exists.
- `model-footprint` count is 0.
- Standard 3x9 after selection still has one base image and no generated footprint.

Added tablet/mobile model-switch regression:

```ts
test('tablet and mobile model changes keep the floorplan image single-rendered', async ({ page }) => {
  for (const viewport of [
    { width: 834, height: 1112 },
    { width: 390, height: 844 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto('/customize');
    await page.waitForLoadState('networkidle');

    await page.getByRole('button', { name: '옵션 구성' }).click();
    const drawer = page.getByRole('dialog').filter({ hasText: '이동식주택 구성' });
    await drawer.getByRole('button', { name: /Standard 3x9/ }).click();
    await drawer.getByRole('button', { name: /닫기|Close/ }).click();

    await expect(page.getByRole('heading', { name: 'Standard 3x9' })).toBeVisible();
    await expect(page.getByText('₩34,900,000', { exact: true })).toBeVisible();
    await expect(page.getByTestId('base-floorplan-image')).toHaveCount(1);
    await expect(page.getByTestId('model-footprint')).toHaveCount(0);
    await expect(page).toHaveURL(/\/customize\?c=/);
  }
});
```

Added mobile floorplan zoom regression:

```ts
test('mobile floorplan zoom opens with the selected floorplan and closes safely', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/customize');
  await page.waitForLoadState('networkidle');

  await page.getByTestId('floorplan-zoom-open').click();

  const dialog = page.getByRole('dialog').filter({ hasText: '도면 확대' });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByTestId('floorplan-zoom-canvas')).toBeVisible();
  await expect(dialog.getByTestId('base-floorplan-image')).toHaveCount(1);
  await expect(dialog.getByTestId('model-footprint')).toHaveCount(0);

  await dialog.getByTestId('floorplan-zoom-close').click();
  await expect(dialog).not.toBeVisible();
});
```

### `/customize` floorplan zoom

Refactored the SVG into a reusable `FloorplanCanvas`, used by both the normal preview and the zoom dialog. The dialog:

- opens from an icon button with `data-testid="floorplan-zoom-open"` and `aria-label="도면 크게 보기"`;
- uses the same selected model and selected options as the main preview;
- scopes modal tests to the dialog so duplicate base images in background content do not create false failures;
- supports close button, backdrop close, and Escape close;
- keeps mobile page overflow off while allowing horizontal inspection inside the modal's scroll region.

### Admin shell/sidebar

Moved from a generic SaaS admin feel toward a premium technical console:

- Off-white canvas: `bg-[#fbfbfa]`.
- Charcoal sidebar: `bg-[#111111]`, thin borders, compact nav.
- Mobile header: `WEET CONSOLE`.
- Korean navigation group labels: `운영`, `콘텐츠`, `상담`, `시스템`.
- Active nav uses yellow side rail, not a soft rounded pill.
- Removed old `tracking-tight`/uppercase-heavy mixed styling from the shell/sidebar.

### Admin dashboard

Replaced the simple dashboard with:

- Metric cards with captions: 공개 제품, 신규 상담, 프로젝트, 활성 옵션.
- `오늘의 운영 레일`: 상담 응답, 공개 제품, 주문 도면.
- `품질 상태`: 도면, 상담, 보안.
- Compact quick actions: 제품 추가, 주문 구성, 상담 확인, 웹 로그 분석.

## Relevant File Excerpts

`components/customize/CustomizeConfigurator.tsx` floorplan logic:

```tsx
const hasBaseImage = Boolean(model.floorplanImagePath);

{hasBaseImage ? (
  <image
    data-testid="base-floorplan-image"
    href={model.floorplanImagePath ?? undefined}
    x="0"
    y="0"
    width="1000"
    height="420"
    preserveAspectRatio="xMidYMid meet"
  />
) : (
  // generated fallback grid and labels
)}

{!hasBaseImage && (
  <rect data-testid="model-footprint" ... />
)}
```

`app/admin/page.tsx` new dashboard data structures:

```tsx
const workflow = [
  {
    label: '상담 응답',
    value: newConsultations > 0 ? `${newConsultations}건 대기` : '대기 없음',
    description: newConsultations > 0 ? '견적 전화를 먼저 처리하세요.' : '신규 상담 큐가 비어 있습니다.',
    href: '/admin/consultations',
    icon: Clock,
    urgent: newConsultations > 0,
  },
  // 공개 제품, 주문 도면
];

const readiness = [
  { label: '도면', value: '모델별 단일 렌더링', icon: CheckCircle2 },
  { label: '상담', value: '신규 상태 큐 분리', icon: MessageSquare },
  { label: '보안', value: '관리자 권한 보호 유지', icon: ShieldCheck },
];
```

## Commands Run

```text
sed/read required workflow docs and agent-inbox files
git status --short
git diff --stat
git diff --check
npm run lint
npm test
npx playwright test e2e/customize-configurator.spec.ts
npx playwright test e2e/customize-configurator.spec.ts e2e/public-pages.spec.ts
npm run build
node Playwright visual/browser audit against localhost:3000
node Playwright tablet/mobile customize drawer proof
node Playwright mobile floorplan zoom visual audit
```

## Validation Output

`git diff --check`: passed.

`npm run lint`: passed.

`npm test`: passed.

```text
Test Files  3 passed (3)
Tests       20 passed (20)
Duration    531ms
```

Focused customize E2E:

```text
Running 7 tests using 7 workers
7 passed (6.6s)
```

Public + customize + admin shell E2E:

```text
Running 18 tests using 14 workers
18 passed (19.2s)
```

Production build:

```text
✓ Compiled successfully in 4.2s
Finished TypeScript in 3.3s
✓ Generating static pages using 27 workers (20/20)
```

Build warning:

```text
The "middleware" file convention is deprecated. Please use "proxy" instead.
```

This is recorded as a remaining technical debt item.

## Browser / Playwright Findings

Visual/browser audit generated 21 screenshots and JSON evidence under `.codex/visual-audit/`.

Audited public routes:

- `/`
- `/products`
- `/customize`
- `/support`
- `/projects`

Audited viewports:

- PC `1440x960`
- Tablet `834x1112`
- Mobile `390x844`

Summary:

- Public route horizontal overflow: none detected.
- Public route console errors: none detected.
- Admin dashboard horizontal overflow: none detected.
- Admin dashboard console errors: none detected.
- Admin dashboard authenticated H1: `대시보드`.
- Admin navigation visible in sidebar/drawer: 대시보드, UTM Builder, 랜딩 페이지, 제품 관리, 주문 구성, 프로젝트 관리, FAQ 관리, 고객 인사이트, 갤러리 관리, 상담 관리, 레거시 문의, 설정.

Customize audit:

```json
{
  "pc": {
    "before": { "baseImages": 1, "footprints": 0, "overflowX": false },
    "after": { "baseImages": 1, "footprints": 0, "overflowX": false }
  },
  "tablet": {
    "before": { "baseImages": 1, "footprints": 0, "overflowX": false },
    "after": { "baseImages": 1, "footprints": 0, "overflowX": false }
  },
  "mobile": {
    "before": { "baseImages": 1, "footprints": 0, "overflowX": false },
    "after": { "baseImages": 1, "footprints": 0, "overflowX": false }
  }
}
```

Additional tablet/mobile proof after opening the option drawer, selecting `Standard 3x9`, closing the drawer:

```json
[
  {
    "viewport": "tablet",
    "h1": true,
    "price": true,
    "baseImages": 1,
    "footprints": 0
  },
  {
    "viewport": "mobile",
    "h1": true,
    "price": true,
    "baseImages": 1,
    "footprints": 0
  }
]
```

Mobile zoom proof after opening `도면 크게 보기`:

```json
{
  "dialogVisible": true,
  "baseImagesInDialog": 1,
  "footprintsInDialog": 0,
  "overflowX": false,
  "consoleErrors": [],
  "closed": true
}
```

Screenshot saved:

- `.codex/visual-audit/mobile-customize-zoom.png`

Representative local load timings:

```text
PC:     / 2117ms, /products 1256ms, /customize 1437ms, /support 1206ms, /projects 1004ms, /admin 1292ms
Tablet: / 1800ms, /products 1130ms, /customize 1013ms, /support 976ms, /projects 951ms, /admin 1288ms
Mobile: / 1817ms, /products 1211ms, /customize 1055ms, /support 971ms, /projects 963ms, /admin 1417ms
```

## Persona / Reference Findings Saved

Saved to `agent-inbox/design-reference-research.md`:

- 25 references across premium modular homes, prefab/configurator flows, Tesla-like product configuration, SpaceX/xAI/Grok-inspired technical surfaces, and admin-dashboard inspiration.
- Key borrowed direction: quiet premium product-first journey, lot/site readiness CTA, transparent included/excluded scope, black/off-white/gold console admin, and operational dashboard status rails.

Saved to `agent-inbox/findings-public-simulation.md`:

- 20 buyer personas across PC/tablet/mobile.
- 100 public observations, including strengths, fixed bug verification, remaining conversion blockers, image upgrade needs, site-readiness needs, and mobile floorplan zoom needs.

Saved to `agent-inbox/findings-admin-simulation.md`:

- 20 admin personas across PC/tablet/mobile.
- 100 admin observations, including dashboard strengths and remaining child-route unification risks.

## Current Failures / Risks

- Hard failures: none in lint/unit/E2E/build after this slice.
- Known warning: Next `middleware` file convention deprecation remains.
- GPT-5.5 Pro Deep Research review failed twice in Chrome for this slice: one markdown attachment attempt and one shorter inline attempt both ended in a static empty loading bar without a marker-matched assistant response. `.codex/pro-review.md` was not updated.
- Antigravity floorplan zoom handoff failed because the IDE window could not be claimed; direct Codex implementation continued and the failure was recorded in `agent-inbox/antigravity-failures.md`.
- Admin redesign is currently strongest on shell/sidebar/dashboard; many child admin pages still retain old card-heavy styling (`rounded-xl/2xl/3xl`, `tracking-tight`, generic SaaS tone).
- Public site still needs larger conversion upgrades: model comparison, site-readiness self diagnosis, warranty/A/S proof, B2B/bulk inquiry flow, and stronger product/transport/install imagery.
- The `.codex/visual-audit` screenshots prove this local audit, but they are untracked until intentionally added.
- Prior workflow docs/state contain older GPT Pro harness updates and previous failed Deep Research attempts; this packet is only for the current slice.

## Exact Review Questions

Please review only the concrete implementation in this packet and return:

1. `MUST_FIX`: any correctness, UX, accessibility, responsive, performance, or regression issue that must be fixed before this slice is considered acceptable.
2. `OPTIONAL`: useful but non-blocking improvements.
3. `VERDICT`: `PASS` or `REVISE`.

Review focus:

- Is suppressing `model-footprint` whenever a base floorplan image exists the right fix for the user-reported 3x6/3x9 overlay issue, or can it hide a legitimate fallback/measurement use case?
- Are the new desktop/tablet/mobile Playwright checks sufficient to prevent the floorplan overlay regression?
- Does the floorplan zoom dialog create any accessibility, mobile panning, or duplicate-SVG risk that must be fixed?
- Does the admin shell/sidebar/dashboard redesign meet the premium technical console intent without creating usability or accessibility problems?
- Are there any obvious issues in the admin/dashboard data logic or empty states?
- Are the recorded persona/reference findings accurate enough as a work handoff for the next implementation slices?
- Are there any `MUST_FIX` items in the current diff before continuing to the next large public/admin improvement slice?

Respond with the exact marker:

`WEET_AUDIT_REVIEW_20260607_ADMIN_CUSTOMIZE_SLICE_01`

# GPT-5.5 Pro Review Packet

Marker: `WEET_REVIEW_20260609_HEADER_CTA_04`

## Active Task Brief

This is the closure review for the Weet public header CTA change.

Context:

- Stickies steering said `주문하기` felt under-emphasized because it sat as an ordinary center header menu item.
- We removed `주문하기` / `Order` from the ordinary navigation and promoted `/customize` into a separate primary CTA on desktop and mobile.
- Previous Pro review marker `WEET_REVIEW_20260609_HEADER_CTA_03` returned `VERDICT: REVISE` with one concrete `MUST_FIX`.

Please review only whether the previous `MUST_FIX` is correctly resolved and whether any concrete deploy-blocking issue remains in this final diff. Do not summarize the packet; act as a senior product/UX/code reviewer.

## Previous MUST_FIX

GPT-5.5 Pro found:

```text
Desktop Korean CTA has an accessible-name mismatch: the visible label is 주문하기, but aria-label is 모델 구성하기. Because aria-label overrides the visible text for assistive tech, this fails label-in-name expectations and can break voice-control targeting.
```

## Applied Fix

In `components/layout/Header.tsx`, the desktop CTA now uses an accessible name that matches the visible Korean label:

```diff
- aria-label={language === 'KO' ? '모델 구성하기' : 'Configure'}
+ aria-label={language === 'KO' ? '주문하기' : 'Configure'}
```

The visible text remains:

```tsx
{language === 'KO' ? '주문하기' : 'Configure'}
```

## Current Git Status

```text
## zoo/customize-configurator...origin/zoo/customize-configurator
 M .codex/current-task.md
 M .codex/pro-review.md
 M .codex/review-packet.md
 M .codex/state.md
 M agent-inbox/findings-public-simulation.md
 M agent-inbox/implementation-backlog.md
 M components/layout/Header.tsx
?? .codex/qa/header-cta-20260609-local/
?? .codex/qa/production-public-renewal-acef171/
```

## Relevant Final Header Behavior

```tsx
// components/layout/Header.tsx
// Ordinary nav no longer contains /customize.
const navigationKo = [
  { name: '모듈러건축 소개', href: '/modular', submenu: [...] },
  { name: '제품 소개', href: '/products', submenu: [...] },
  { name: 'BESPOKE', href: '/bespoke', submenu: [...] },
  { name: 'SOLUTION', href: '/solution', submenu: [...] },
  { name: '회사소개', href: '/company', submenu: [...] },
  { name: '고객지원', href: '/support', submenu: [...] },
];

// Mobile header CTA.
<Link
  href="/customize"
  aria-label={language === 'KO' ? '주문하기' : 'Order'}
>
  {language === 'KO' ? '주문하기' : 'Order'}
</Link>

// Desktop right-side CTA, now fixed.
<Link
  href="/customize"
  aria-label={language === 'KO' ? '주문하기' : 'Configure'}
>
  {language === 'KO' ? '주문하기' : 'Configure'}
</Link>

// Mobile menu top CTA.
<Link href="/customize" onClick={handleMobileMenuClose}>
  {language === 'KO' ? '모델 구성하기' : 'Configure Model'}
</Link>
```

## Validation After Fix

```text
git diff --check: passed after removing review-packet trailing whitespace
npx tsc --noEmit: passed
npm run lint: passed
npm test: 3 files passed, 20 tests passed
npm run build: passed
  Existing non-blocking warning: Next "middleware" file convention is deprecated in favor of "proxy".
npx playwright test e2e/public-pages.spec.ts --project=chromium: 14 passed
```

## Visual / Accessibility QA After Fix

Evidence directory: `.codex/qa/header-cta-20260609-local/`

Updated screenshots:

```text
desktop-1440-home-header.png
desktop-xl-1280-home-header.png
tablet-834-home-header.png
tablet-834-mobile-menu.png
mobile-390-home-header.png
mobile-390-mobile-menu.png
summary.json
```

Updated `summary.json` results:

```json
[
  {
    "name": "desktop-1440",
    "overflowX": false,
    "ctas": [{ "text": "주문하기", "ariaLabel": "주문하기" }],
    "ctaLabelInName": true,
    "pageErrors": 0
  },
  {
    "name": "desktop-xl-1280",
    "overflowX": false,
    "ctas": [{ "text": "주문하기", "ariaLabel": "주문하기" }],
    "ctaLabelInName": true,
    "pageErrors": 0
  },
  {
    "name": "tablet-834",
    "overflowX": false,
    "ctas": [{ "text": "주문하기", "ariaLabel": "주문하기" }],
    "ctaLabelInName": true,
    "pageErrors": 0
  },
  {
    "name": "mobile-390",
    "overflowX": false,
    "ctas": [{ "text": "주문하기", "ariaLabel": "주문하기" }],
    "ctaLabelInName": true,
    "pageErrors": 0
  }
]
```

Note on local console noise:

- The local production server reports `_vercel/insights/script.js` 404/MIME console errors at `localhost:3000`.
- This is known local analytics noise from the Vercel insights route not existing on local `next start`.
- There are no page errors, no horizontal overflow, and the production-domain QA will be run after push/promote.

## Current Failures Or Risks

- No blocking local failures.
- Production-domain QA is pending until after commit/push/promote.
- Existing unrelated Next middleware-to-proxy warning remains.
- Optional social-link `rel="noopener noreferrer"` hardening from the previous review was not applied because it was marked non-blocking and unrelated to the CTA change.
- Optional stronger E2E assertion for nav/CTA separation was not added because current visual/DOM QA directly verifies the separation and the user asked to keep moving.

## Exact Review Questions

Return exactly this structure and include the marker:

```text
MARKER: WEET_REVIEW_20260609_HEADER_CTA_04
VERDICT: PASS | REVISE
MUST_FIX:
- ...
OPTIONAL:
- ...
RATIONALE:
- ...
```

Please treat `MUST_FIX` as deploy-blocking only if it is specific, reproducible, and tied to the final code or post-fix QA evidence.

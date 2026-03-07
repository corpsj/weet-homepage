# weet:) Homepage Redesign — Tesla-Style Modular Housing Experience

## TL;DR

> **Quick Summary**: Complete redesign of weet:) modular construction homepage into a Tesla-inspired, product-centric, witty Korean experience. All 3 phases — visual revolution, storytelling + conversion, differentiation features — in one plan. Existing site preserved on `main` branch for rollback.
> 
> **Deliverables**:
> - Fullscreen scroll-snap product hero (S→M→L→XL sequence)
> - Witty Korean brand copy throughout (배민/야놀자 style)
> - Interactive model comparison table
> - Scroll-driven modular construction storytelling
> - Guided Quote Builder (step-by-step, no 3D)
> - 체류형 쉼터 dedicated landing page
> - KakaoTalk consultation integration (준비)
> - Trust badges (Korean media + government certifications)
> - Project Before/After stories
> - Build tracking dashboard (Supabase Realtime)
> - WebAR "내 땅에 놓아보기" (MindAR.js)
> - AI consultation chatbot
> - Test infrastructure (vitest) + comprehensive QA
> 
> **Estimated Effort**: XL (40+ tasks across 6 waves)
> **Parallel Execution**: YES — 6 waves, 5-8 tasks per wave
> **Critical Path**: Branch setup → Design system → Fullscreen hero → Core pages → Storytelling → Advanced features → Final QA

---

## Context

### Original Request
"현대적이고 온라인 친화적인 이동식주택 판매 홈페이지를 만들고 싶어, 테슬라 홈페이지처럼. 위트 있는 무언가" — All 3 phases, rollback-safe, no Figma (AI designs based on references).

### Interview Summary
**Key Discussions**:
- **Scope**: Phase 1+2+3 전체 진행, 기존 사이트는 main 브랜치에 보존
- **Rollback**: Git 브랜치 분리 (`redesign` branch)
- **Design**: Figma 없음 — AI가 레퍼런스 기반으로 디자인 제안/구현
- **Assets**: 고퀄리티 제품 사진/영상 보유
- **KakaoTalk**: 비즈채널 아직 없지만 만들 예정 → 연동 준비
- **Naver**: 블로그/카페 미운영 → 네이버 후기 연동 제외, 자체 신뢰요소
- **Financial**: 할부/리스 불가 → 총액만 표시
- **체류형 쉼터**: 전용 랜딩 페이지 필요
- **Tests**: vitest 세팅 + tests-after + Playwright QA

**Research Findings**:
- 16 reference sites analyzed (ICON, Nestron, haus.me, Boxabl, Tesla, Apple, Rivian 등)
- Korean modular housing market: 연 36.9% 성장, 모듈러 특별법 추진 중
- 체류형 쉼터 규제 완화 → 농막/세컨하우스 수요 급증
- Korean consumer journey: Naver → Blog → KakaoTalk → Visit → Contract
- 77.2% mobile shopping → mobile-first critical
- Configurator rejected → Guided Quote Builder instead

### Metis Review
**Identified Gaps** (addressed):
- **8thWall shut down (Feb 2026)**: WebAR switched to MindAR.js
- **FID replaced by INP (Mar 2024)**: All performance targets use INP, not FID
- **KakaoTalk SDK is CDN-only**: Needs `next/script` + `KakaoProvider` pattern
- **KWCAG 2.2 accessibility**: Skip navigation, 44×44px touch targets, color contrast ≥4.5:1
- **Next.js 16 `"use cache"` directive**: Leverage for product/project pages
- **Current `images: { unoptimized: true }`**: Must enable optimization for LCP ≤1.5s
- **Naver SEO/AiRSearch optimization**: Question-format headings, concise answers
- **React 19 `useActionState`**: Replace hacky form pattern in InquiryForm.tsx
- **Supabase Realtime**: Requires `REPLICA IDENTITY FULL` for build tracking
- **Korean font subsetting**: Verify Noto Sans KR display: 'swap' (currently set ✓)

---

## Work Objectives

### Core Objective
Transform weet:) homepage from a standard corporate site into a Tesla-inspired, product-centric, witty Korean modular housing experience that builds trust and drives KakaoTalk consultation requests.

### Concrete Deliverables
- Redesigned homepage with fullscreen scroll-snap product hero
- Redesigned `/products` page with immersive product experience
- Redesigned `/modular` page with scroll-driven storytelling
- New Guided Quote Builder (`/quote`)
- New 체류형 쉼터 landing page (`/shelter`)
- Model comparison interactive table
- KakaoTalk floating button + consultation CTA (준비)
- Trust badges section (media + government)
- Project Before/After stories
- Build tracking dashboard (`/my/tracking`)
- WebAR module placement (`/ar`)
- AI consultation chatbot
- vitest test infrastructure + component tests
- Performance optimized (LCP ≤1.5s, INP ≤200ms)
- KWCAG 2.2 accessibility compliance

### Definition of Done
- [ ] `npm run build` succeeds with zero errors
- [ ] All pages render on mobile (375px) and desktop (1440px)
- [ ] Lighthouse Performance ≥90, Accessibility ≥90
- [ ] All vitest tests pass
- [ ] All Playwright QA scenarios pass with evidence screenshots
- [ ] KakaoTalk integration placeholder functional (환경변수만 설정하면 바로 동작)
- [ ] Brand consistency: #FEBD16 yellow, witty copy, consistent tone

### Must Have
- Fullscreen scroll-snap product hero on homepage
- Witty Korean copy throughout (배민/야놀자 tone)
- Mobile-first responsive (77.2% Korean mobile shopping)
- Model comparison table (S/M/L/XL)
- KakaoTalk consultation CTA (준비 상태)
- Trust badges (미디어 + 정부 인증)
- 체류형 쉼터 dedicated landing page
- Skip navigation link (KWCAG 2.2)
- All interactive elements ≥44×44px touch target
- `useActionState` for all new forms (React 19)
- Next.js Image optimization enabled (remove `unoptimized: true`)
- Guided Quote Builder (NOT 3D configurator)
- Total price display only (NO monthly payments — no financing partner)
- Admin CMS functionality preserved 100%

### Must NOT Have (Guardrails)
- ❌ 3D Configurator / Three.js / Babylon.js (no 3D models exist, cost prohibitive)
- ❌ Online payment / deposit / reservation system (Korean trust issue)
- ❌ Monthly payment display / 할부 계산 (금융 서비스 미계약)
- ❌ 8thWall WebAR (shut down Feb 2026)
- ❌ FID as performance metric (replaced by INP Mar 2024)
- ❌ Naver blog/cafe integration (not yet operating)
- ❌ Over-abstraction — no premature design system library, component factory patterns
- ❌ English UX terms — all Korean ("상담 신청하기" not "Reserve", "견적 받기" not "Get Quote")
- ❌ `as any`, `@ts-ignore`, empty catch blocks, console.log in production
- ❌ AI slop: excessive JSDoc, over-commented code, generic variable names (data/result/item)
- ❌ Breaking existing admin CMS routes/functionality
- ❌ Calendar booking system (카카오톡이 대체)
- ❌ Touching `main` branch directly — all work on `redesign` branch

---

## Verification Strategy (MANDATORY)

> **ZERO HUMAN INTERVENTION** — ALL verification is agent-executed. No exceptions.

### Test Decision
- **Infrastructure exists**: NO (will be set up in Wave 1)
- **Automated tests**: Tests-after (write tests after implementation)
- **Framework**: vitest + @testing-library/react
- **Playwright**: QA scenarios for visual/interaction verification

### QA Policy
Every task MUST include agent-executed QA scenarios.
Evidence saved to `.sisyphus/evidence/task-{N}-{scenario-slug}.{ext}`.

- **Frontend/UI**: Use Playwright (playwright skill) — Navigate, interact, assert DOM, screenshot
- **Build**: `npm run build` must succeed
- **Performance**: Lighthouse CI scores
- **Accessibility**: axe-core automated checks + KWCAG 2.2 manual verification via Playwright

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Foundation — 8 tasks):
├── Task 1: Branch setup + CLAUDE.md update [quick]
├── Task 2: Design system tokens + new globals [quick]
├── Task 3: vitest + testing-library setup [quick]
├── Task 4: Next.js config optimization (images, caching) [quick]
├── Task 5: KWCAG 2.2 accessibility foundation [quick]
├── Task 6: KakaoTalk SDK + Provider setup [quick]
├── Task 7: Shared UI components (witty 404, loading, etc.) [visual-engineering]
└── Task 8: New layout shell (Header v2 + Footer v2) [visual-engineering]

Wave 2 (Core Pages — Phase 1 — 7 tasks):
├── Task 9: Homepage fullscreen scroll-snap hero (depends: 2, 8) [visual-engineering]
├── Task 10: Witty copy system + micro-interactions (depends: 2) [artistry]
├── Task 11: Model comparison table component (depends: 2) [visual-engineering]
├── Task 12: Trust badges section (depends: 2) [quick]
├── Task 13: Products page redesign (depends: 8, 2) [visual-engineering]
├── Task 14: Floating KakaoTalk CTA + consultation flow (depends: 6) [quick]
└── Task 15: Homepage assembly (depends: 9, 10, 11, 12, 14) [visual-engineering]

Wave 3 (Storytelling — Phase 2 — 7 tasks):
├── Task 16: Scroll-driven storytelling engine (depends: 2) [deep]
├── Task 17: /modular page redesign with scroll storytelling (depends: 16) [visual-engineering]
├── Task 18: Guided Quote Builder /quote (depends: 2, 14) [deep]
├── Task 19: Project Before/After stories (depends: 2) [visual-engineering]
├── Task 20: 체류형 쉼터 landing page /shelter (depends: 2, 14) [visual-engineering]
├── Task 21: /company page redesign (depends: 2, 8) [visual-engineering]
└── Task 22: /support page redesign + FAQ accordion (depends: 2, 8) [visual-engineering]

Wave 4 (Differentiation — Phase 3 — 6 tasks):
├── Task 23: Build tracking dashboard /my/tracking (depends: 2) [deep]
├── Task 24: Supabase Realtime setup for tracking (depends: 23) [unspecified-high]
├── Task 25: WebAR "내 땅에 놓아보기" /ar (depends: 2) [deep]
├── Task 26: AI consultation chatbot (depends: 2, 14) [deep]
├── Task 27: /bespoke page redesign (depends: 2, 8) [visual-engineering]
└── Task 28: /solution page redesign (depends: 2, 8) [visual-engineering]

Wave 5 (Polish + Integration — 6 tasks):
├── Task 29: Naver SEO + AiRSearch optimization (depends: 15, 17, 20) [unspecified-high]
├── Task 30: Performance optimization pass (depends: all pages) [deep]
├── Task 31: Mobile responsive QA + fixes (depends: all pages) [visual-engineering]
├── Task 32: Component tests with vitest (depends: 3, all components) [unspecified-high]
├── Task 33: Admin CMS compatibility verification (depends: all pages) [unspecified-high]
└── Task 34: Witty copy review + brand consistency pass (depends: 10, all pages) [artistry]

Wave FINAL (Verification — 4 parallel):
├── Task F1: Plan compliance audit (oracle)
├── Task F2: Code quality review (unspecified-high)
├── Task F3: Real manual QA — full Playwright walkthrough (unspecified-high)
└── Task F4: Scope fidelity check (deep)

Critical Path: T1 → T2 → T8 → T9 → T15 → T17 → T30 → F1-F4
Parallel Speedup: ~65% faster than sequential
Max Concurrent: 8 (Wave 1)
```

### Dependency Matrix

| Task | Depends On | Blocks | Wave |
|------|-----------|--------|------|
| 1 | — | All | 1 |
| 2 | 1 | 7-34 | 1 |
| 3 | 1 | 32 | 1 |
| 4 | 1 | 30 | 1 |
| 5 | 1 | 8 | 1 |
| 6 | 1 | 14 | 1 |
| 7 | 2 | 15 | 1 |
| 8 | 2, 5 | 9, 13, 15, 21, 22, 27, 28 | 1 |
| 9 | 2, 8 | 15 | 2 |
| 10 | 2 | 15, 34 | 2 |
| 11 | 2 | 15 | 2 |
| 12 | 2 | 15 | 2 |
| 13 | 2, 8 | 31 | 2 |
| 14 | 6 | 15, 18, 20, 26 | 2 |
| 15 | 9, 10, 11, 12, 14 | 29, 30 | 2 |
| 16 | 2 | 17 | 3 |
| 17 | 16 | 29, 30 | 3 |
| 18 | 2, 14 | 30 | 3 |
| 19 | 2 | 30 | 3 |
| 20 | 2, 14 | 29, 30 | 3 |
| 21 | 2, 8 | 30 | 3 |
| 22 | 2, 8 | 30 | 3 |
| 23 | 2 | 24 | 4 |
| 24 | 23 | 30 | 4 |
| 25 | 2 | 30 | 4 |
| 26 | 2, 14 | 30 | 4 |
| 27 | 2, 8 | 30 | 4 |
| 28 | 2, 8 | 30 | 4 |
| 29 | 15, 17, 20 | F1-F4 | 5 |
| 30 | all pages | F1-F4 | 5 |
| 31 | all pages | F1-F4 | 5 |
| 32 | 3, all components | F1-F4 | 5 |
| 33 | all pages | F1-F4 | 5 |
| 34 | 10, all pages | F1-F4 | 5 |
| F1-F4 | 29-34 | — | FINAL |

### Agent Dispatch Summary

- **Wave 1**: 8 tasks — T1-T6 → `quick`, T7-T8 → `visual-engineering`
- **Wave 2**: 7 tasks — T9,T11,T13,T15 → `visual-engineering`, T10 → `artistry`, T12,T14 → `quick`
- **Wave 3**: 7 tasks — T17,T19-T22 → `visual-engineering`, T16,T18 → `deep`
- **Wave 4**: 6 tasks — T23,T25,T26 → `deep`, T24 → `unspecified-high`, T27,T28 → `visual-engineering`
- **Wave 5**: 6 tasks — T29,T32,T33 → `unspecified-high`, T30 → `deep`, T31 → `visual-engineering`, T34 → `artistry`
- **FINAL**: 4 tasks — F1 → `oracle`, F2,F3 → `unspecified-high`, F4 → `deep`

---

## TODOs

### Wave 1 — Foundation (8 tasks, all parallel after T1)

- [x] 1. Branch Setup + Project Configuration

  **What to do**:
  - Create `redesign` branch from `main`
  - Update `CLAUDE.md` to note this is the redesign branch (remove Figma requirement, add redesign-specific notes)
  - Update `next.config.ts`: remove `images: { unoptimized: true }` — enable Next.js Image optimization
  - Add `.env.example` with `NEXT_PUBLIC_KAKAO_JS_KEY`, `NEXT_PUBLIC_KAKAO_CHANNEL_ID` placeholders
  - Create `.sisyphus/evidence/` directory for QA artifacts
  - Verify existing `npm run dev` and `npm run build` still work

  **Must NOT do**:
  - Do NOT touch `main` branch
  - Do NOT delete any existing files
  - Do NOT change Supabase configuration

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: [`git-master`]
    - `git-master`: Branch creation and git operations

  **Parallelization**:
  - **Can Run In Parallel**: NO (must complete first)
  - **Parallel Group**: Wave 1 — Sequential first
  - **Blocks**: Tasks 2-34
  - **Blocked By**: None

  **References**:
  - `next.config.ts` — Current Next.js config with `unoptimized: true` that must be removed
  - `CLAUDE.md` — Project docs that need updating for redesign context
  - `.env.local` (if exists) — Current env vars to preserve

  **Acceptance Criteria**:
  - [ ] `redesign` branch exists and is checked out
  - [ ] `npm run build` succeeds on `redesign` branch
  - [ ] `next.config.ts` no longer has `unoptimized: true`
  - [ ] `.env.example` contains KakaoTalk env var placeholders

  **QA Scenarios**:
  ```
  Scenario: Branch setup verification
    Tool: Bash
    Steps:
      1. git branch --show-current → Expected: "redesign"
      2. git log --oneline -1 → Shows latest commit on redesign
      3. npm run build → Exit code 0
    Expected Result: Branch exists, build succeeds
    Evidence: .sisyphus/evidence/task-1-branch-setup.txt

  Scenario: Config changes applied
    Tool: Bash
    Steps:
      1. grep -c "unoptimized" next.config.ts → Expected: 0 (removed)
      2. cat .env.example | grep KAKAO → Expected: Both KAKAO env vars present
    Expected Result: Config correctly updated
    Evidence: .sisyphus/evidence/task-1-config-verify.txt
  ```

  **Commit**: YES
  - Message: `chore(setup): create redesign branch + enable image optimization + env template`
  - Files: `next.config.ts`, `CLAUDE.md`, `.env.example`
  - Pre-commit: `npm run build`

- [x] 2. Design System Tokens + New Globals

  **What to do**:
  - Create `lib/design-tokens.ts` — centralized design tokens:
    - Colors: primary (#FEBD16), primaryDark (#E5A410), backgrounds, text colors
    - Typography: font sizes, weights, line heights for headings/body
    - Spacing: section padding, component gaps
    - Breakpoints: 375px (mobile), 768px (tablet), 1024px (desktop), 1440px (max)
    - Animation: durations, easings for Framer Motion
    - Z-indices: header, modal, floating CTA, chatbot
  - Update `tailwind.config.ts` — extend with new design tokens
  - Update `app/globals.css` — add new CSS custom properties from tokens
  - Create `lib/animations.ts` — shared Framer Motion animation variants:
    - fadeInUp, fadeInDown, fadeInLeft, fadeInRight
    - scaleIn, slideIn
    - staggerContainer, staggerItem
    - scrollReveal (for IntersectionObserver patterns)

  **Must NOT do**:
  - Do NOT create a component library/design system package
  - Do NOT change existing component styles (they'll be replaced per-task)
  - Do NOT remove existing Tailwind config entries (extend, don't replace)

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (after T1)
  - **Parallel Group**: Wave 1 (with T3, T4, T5, T6)
  - **Blocks**: Tasks 7-34 (everything uses design tokens)
  - **Blocked By**: Task 1

  **References**:
  - `tailwind.config.ts` — Current Tailwind config to extend (primary: #FEBD16, primaryDark: #E5A410, gray scale, spacing 18/88/100, max-width 8xl)
  - `app/globals.css` — Current global styles
  - `app/layout.tsx:17-25` — Current font setup (Geist Sans, Noto Sans KR)
  - Tesla.com — Animation timing reference (smooth, 0.6s ease-out transitions)
  - Apple.com/iphone — Scroll animation patterns

  **Acceptance Criteria**:
  - [ ] `lib/design-tokens.ts` exports all token categories
  - [ ] `lib/animations.ts` exports reusable Framer Motion variants
  - [ ] `tailwind.config.ts` extended with new tokens
  - [ ] `npm run build` succeeds
  - [ ] Existing pages still render correctly (no visual regression)

  **QA Scenarios**:
  ```
  Scenario: Design tokens importable and typed
    Tool: Bash
    Steps:
      1. npx tsx -e "import { colors, spacing, animations } from './lib/design-tokens'; console.log(colors.primary)" → Expected: "#FEBD16"
      2. npx tsx -e "import { fadeInUp } from './lib/animations'; console.log(typeof fadeInUp)" → Expected: "object"
    Expected Result: All tokens and animations export correctly with types
    Evidence: .sisyphus/evidence/task-2-tokens-import.txt

  Scenario: Build succeeds with extended Tailwind
    Tool: Bash
    Steps:
      1. npm run build → Exit code 0
      2. No TypeScript errors in lib/design-tokens.ts or lib/animations.ts
    Expected Result: Clean build
    Evidence: .sisyphus/evidence/task-2-build.txt
  ```

  **Commit**: YES (groups with Wave 1)
  - Message: `feat(design): add design tokens + animation variants + extend Tailwind`
  - Files: `lib/design-tokens.ts`, `lib/animations.ts`, `tailwind.config.ts`, `app/globals.css`
  - Pre-commit: `npm run build`

- [x] 3. Vitest + Testing Library Setup

  **What to do**:
  - Install: `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `@vitejs/plugin-react`, `jsdom`
  - Create `vitest.config.ts` — configure with:
    - `environment: 'jsdom'`
    - `setupFiles: './vitest.setup.ts'`
    - Path aliases matching `tsconfig.json`
    - Coverage configuration
  - Create `vitest.setup.ts` — import `@testing-library/jest-dom`
  - Add `"test": "vitest run"`, `"test:watch": "vitest"` to `package.json` scripts
  - Create `__tests__/setup.test.ts` — smoke test that verifies setup works
  - Create `__tests__/example.test.tsx` — example React component test

  **Must NOT do**:
  - Do NOT install Playwright here (it's a skill, not a dependency)
  - Do NOT write tests for existing components (Wave 5 task)

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (after T1)
  - **Parallel Group**: Wave 1 (with T2, T4, T5, T6)
  - **Blocks**: Task 32
  - **Blocked By**: Task 1

  **References**:
  - `package.json` — Current dependencies and scripts
  - `tsconfig.json` — Path aliases to mirror in vitest config

  **Acceptance Criteria**:
  - [ ] `npx vitest run` passes with 2+ tests
  - [ ] Setup test confirms jsdom environment works
  - [ ] Example test renders a React component and asserts

  **QA Scenarios**:
  ```
  Scenario: Vitest runs and passes
    Tool: Bash
    Steps:
      1. npx vitest run → Expected: "Tests: 2 passed" (or similar)
      2. npx vitest run --reporter=verbose → Shows test names
    Expected Result: All setup tests pass, vitest configured correctly
    Evidence: .sisyphus/evidence/task-3-vitest-run.txt

  Scenario: Coverage works
    Tool: Bash
    Steps:
      1. npx vitest run --coverage → Generates coverage report
    Expected Result: Coverage report generated without errors
    Evidence: .sisyphus/evidence/task-3-coverage.txt
  ```

  **Commit**: YES (groups with Wave 1)
  - Message: `chore(test): setup vitest + testing-library with example tests`
  - Files: `vitest.config.ts`, `vitest.setup.ts`, `package.json`, `__tests__/*`
  - Pre-commit: `npx vitest run`

- [x] 4. Next.js Config Optimization

  **What to do**:
  - Enable Next.js 16 `"use cache"` directive support in `next.config.ts` (experimental if needed)
  - Configure image domains/patterns properly (replace wildcard with specific Supabase + needed domains)
  - Set up proper caching headers for static assets
  - Add security headers (X-Content-Type-Options, X-Frame-Options, etc.)
  - Verify Turbopack still works with new config

  **Must NOT do**:
  - Do NOT change Supabase connection settings
  - Do NOT modify middleware.ts auth logic

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (after T1)
  - **Parallel Group**: Wave 1 (with T2, T3, T5, T6)
  - **Blocks**: Task 30
  - **Blocked By**: Task 1

  **References**:
  - `next.config.ts` — Current config to optimize
  - `middleware.ts` — Auth middleware (do NOT modify)
  - Next.js 16 docs — `"use cache"` directive documentation

  **Acceptance Criteria**:
  - [ ] `npm run dev` works with Turbopack
  - [ ] `npm run build` succeeds
  - [ ] Security headers present in response
  - [ ] Image optimization enabled for Supabase storage domain

  **QA Scenarios**:
  ```
  Scenario: Dev server starts with Turbopack
    Tool: Bash
    Steps:
      1. timeout 15 npm run dev 2>&1 | head -20 → Expected: "Turbopack" in output, no errors
    Expected Result: Dev server starts successfully with Turbopack
    Evidence: .sisyphus/evidence/task-4-dev-server.txt

  Scenario: Build optimization applied
    Tool: Bash
    Steps:
      1. npm run build → Exit code 0
      2. Check .next/ output for optimized images
    Expected Result: Clean build with image optimization
    Evidence: .sisyphus/evidence/task-4-build.txt
  ```

  **Commit**: YES (groups with Wave 1)
  - Message: `perf(config): optimize Next.js config + security headers + caching`
  - Files: `next.config.ts`
  - Pre-commit: `npm run build`

- [x] 5. KWCAG 2.2 Accessibility Foundation

  **What to do**:
  - Add skip navigation link to `app/layout.tsx`: `<a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:bg-primary focus:text-black focus:px-4 focus:py-2 focus:rounded">본문 바로가기</a>`
  - Add `id="main-content"` to main content wrapper
  - Create `lib/a11y.ts` — accessibility utilities:
    - `MIN_TOUCH_TARGET = 44` (px) constant
    - `focusTrapHook` for modals
    - `announceToScreenReader()` for live regions
    - Color contrast checker utility
  - Add `aria-live="polite"` region for dynamic content announcements
  - Ensure all existing interactive elements meet 44×44px minimum (audit + document violations for per-page fixes)

  **Must NOT do**:
  - Do NOT fix existing component accessibility issues (each page task will handle its own)
  - Do NOT install any accessibility testing library here (axe-core used via Playwright)

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (after T1)
  - **Parallel Group**: Wave 1 (with T2, T3, T4, T6)
  - **Blocks**: Task 8
  - **Blocked By**: Task 1

  **References**:
  - `app/layout.tsx` — Root layout where skip-nav goes
  - KWCAG 2.2 — 33 inspection items, 44×44px touch targets, 4.5:1 contrast
  - `lib/utils.ts` — Existing utility pattern to follow

  **Acceptance Criteria**:
  - [ ] Skip navigation link visible on keyboard Tab
  - [ ] `lib/a11y.ts` exports all utilities
  - [ ] `id="main-content"` exists on main wrapper
  - [ ] `aria-live` region present in layout

  **QA Scenarios**:
  ```
  Scenario: Skip navigation works
    Tool: Playwright (playwright skill)
    Steps:
      1. Navigate to http://localhost:3000
      2. Press Tab key
      3. Assert: skip-nav link "본문 바로가기" is visible and focused
      4. Press Enter
      5. Assert: focus moves to #main-content
    Expected Result: Skip navigation appears on Tab and works
    Evidence: .sisyphus/evidence/task-5-skip-nav.png

  Scenario: Accessibility utilities export correctly
    Tool: Bash
    Steps:
      1. npx tsx -e "import { MIN_TOUCH_TARGET } from './lib/a11y'; console.log(MIN_TOUCH_TARGET)" → Expected: "44"
    Expected Result: All a11y utilities importable
    Evidence: .sisyphus/evidence/task-5-a11y-utils.txt
  ```

  **Commit**: YES (groups with Wave 1)
  - Message: `feat(a11y): KWCAG 2.2 foundation — skip-nav + a11y utilities + aria-live`
  - Files: `app/layout.tsx`, `lib/a11y.ts`
  - Pre-commit: `npm run build`

- [x] 6. KakaoTalk SDK + Provider Setup

  **What to do**:
  - Create `components/providers/KakaoProvider.tsx`:
    - Load Kakao SDK via `next/script` with `strategy="afterInteractive"`
    - Initialize `Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY)` on load
    - Provide `useKakao()` hook for child components
    - Graceful fallback if SDK fails to load or env vars missing
  - Add `KakaoProvider` to `app/layout.tsx` (wrap children)
  - Create `lib/kakao.ts` — helper functions:
    - `openKakaoChannel(channelId)` — opens KakaoTalk consultation
    - `shareToKakao(title, description, imageUrl, link)` — KakaoTalk share
    - `isKakaoReady()` — check if SDK loaded
  - All functions should gracefully handle "SDK not loaded" state (show fallback: phone number or inquiry form link)

  **Must NOT do**:
  - Do NOT require KakaoTalk to be set up — all functions must work in "준비" mode
  - Do NOT create the floating CTA button here (Task 14)

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (after T1)
  - **Parallel Group**: Wave 1 (with T2, T3, T4, T5)
  - **Blocks**: Task 14
  - **Blocked By**: Task 1

  **References**:
  - KakaoTalk JavaScript SDK docs — CDN: `https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js`
  - `app/layout.tsx` — Where KakaoProvider wraps
  - `components/providers/` — Create this directory (follow Next.js provider pattern)

  **Acceptance Criteria**:
  - [ ] `KakaoProvider` renders without errors even without env vars
  - [ ] `useKakao()` hook returns loading/ready/error states
  - [ ] `lib/kakao.ts` helper functions don't throw when SDK not loaded
  - [ ] `npm run build` succeeds

  **QA Scenarios**:
  ```
  Scenario: KakaoProvider renders gracefully without env vars
    Tool: Playwright (playwright skill)
    Steps:
      1. Navigate to http://localhost:3000 (without KAKAO env vars set)
      2. Assert: No console errors about Kakao
      3. Assert: Page renders normally
    Expected Result: Site works without KakaoTalk configured
    Evidence: .sisyphus/evidence/task-6-kakao-fallback.png

  Scenario: Kakao helpers don't throw
    Tool: Bash
    Steps:
      1. npx tsx -e "import { isKakaoReady } from './lib/kakao'; console.log(isKakaoReady())" → Expected: false (SDK not loaded in Node)
    Expected Result: Helpers return safe defaults
    Evidence: .sisyphus/evidence/task-6-kakao-helpers.txt
  ```

  **Commit**: YES (groups with Wave 1)
  - Message: `feat(kakao): KakaoTalk SDK provider + helper utilities`
  - Files: `components/providers/KakaoProvider.tsx`, `lib/kakao.ts`, `app/layout.tsx`
  - Pre-commit: `npm run build`

- [ ] 7. Shared UI Components (Witty 404, Loading, Transitions)

  **What to do**:
  - Create `app/not-found.tsx` — Witty 404 page:
    - Headline: "이 집은 아직 지어지지 않았어요" (This house hasn't been built yet)
    - Subtext: "주소가 잘못되었거나, 아직 준비 중인 페이지예요"
    - CTA: "홈으로 돌아가기" button + "제품 보러가기" secondary
    - Animation: simple house outline that "builds" on page load (Framer Motion SVG)
  - Create `components/ui/PageTransition.tsx` — page transition wrapper using Framer Motion AnimatePresence
  - Create `components/ui/ScrollReveal.tsx` — IntersectionObserver + Framer Motion wrapper for scroll-reveal animations
  - Create `components/ui/SectionLoading.tsx` — skeleton loading with "짓는 중..." (Building...) text and animation
  - Create `components/ui/CountUp.tsx` — animated number counter (for stats: "3개월 시공", "50년 내구성")
  - All components use design tokens from Task 2

  **Must NOT do**:
  - Do NOT create a full component library/storybook
  - Do NOT add excessive JSDoc comments

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: UI component design without Figma mockups

  **Parallelization**:
  - **Can Run In Parallel**: YES (after T2)
  - **Parallel Group**: Wave 1 (with T8)
  - **Blocks**: Task 15
  - **Blocked By**: Task 2

  **References**:
  - `lib/design-tokens.ts` (Task 2) — Colors, animations, spacing
  - `lib/animations.ts` (Task 2) — Framer Motion variants
  - `lib/utils.ts` — `cn()` helper for className merging
  - 배달의민족 404 page — Witty Korean error page reference
  - `components/ui/` — Existing UI component directory pattern

  **Acceptance Criteria**:
  - [ ] 404 page renders with witty copy and animation
  - [ ] ScrollReveal component animates elements on scroll
  - [ ] CountUp component animates numbers
  - [ ] All components use design tokens
  - [ ] `npm run build` succeeds

  **QA Scenarios**:
  ```
  Scenario: 404 page displays with witty copy
    Tool: Playwright (playwright skill)
    Steps:
      1. Navigate to http://localhost:3000/nonexistent-page
      2. Assert: heading contains "이 집은 아직 지어지지 않았어요"
      3. Assert: CTA button "홈으로 돌아가기" is visible
      4. Screenshot
    Expected Result: Witty 404 page renders correctly
    Evidence: .sisyphus/evidence/task-7-404-page.png

  Scenario: ScrollReveal animates on scroll
    Tool: Playwright (playwright skill)
    Steps:
      1. Navigate to any page using ScrollReveal
      2. Scroll down
      3. Assert: elements animate into view (opacity changes from 0 to 1)
    Expected Result: Scroll reveal animation works
    Evidence: .sisyphus/evidence/task-7-scroll-reveal.png
  ```

  **Commit**: YES (groups with Wave 1)
  - Message: `feat(ui): witty 404 + scroll reveal + count-up + page transitions`
  - Files: `app/not-found.tsx`, `components/ui/PageTransition.tsx`, `components/ui/ScrollReveal.tsx`, `components/ui/SectionLoading.tsx`, `components/ui/CountUp.tsx`
  - Pre-commit: `npm run build`

- [ ] 8. New Layout Shell (Header v2 + Footer v2)

  **What to do**:
  - Create `components/layout/HeaderV2.tsx` — redesigned header:
    - Transparent header on hero sections, solid on scroll (scroll-triggered)
    - Simplified mega menu with product categories (S/M/L/XL)
    - "상담 신청" primary CTA button in header (위트 옐로우)
    - Mobile hamburger → full-screen overlay menu
    - Language switcher (KR/EN only, drop ES)
    - Logo links to home
    - Smooth reveal/hide on scroll direction (show on scroll-up, hide on scroll-down)
    - KWCAG 2.2: all nav items ≥44×44px, keyboard navigable, skip-nav compatible
  - Create `components/layout/FooterV2.tsx` — redesigned footer:
    - Company info: 위트(주), address, phone, email
    - Quick links: products, modular, bespoke, solution, company, support
    - Social links: Instagram, YouTube, KakaoTalk channel
    - "위트있는 집, 위트있는 삶" tagline
    - Privacy policy + Terms links
    - Copyright
  - Create `app/(redesign)/layout.tsx` — new layout using HeaderV2 + FooterV2
    - This route group allows new pages to use v2 layout while old pages keep v1
    - Includes KakaoProvider, skip-nav, main-content id

  **Must NOT do**:
  - Do NOT modify existing `Header.tsx` or `Footer.tsx`
  - Do NOT break existing page routing
  - Do NOT use English UX terms in navigation

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Header/Footer redesign without Figma

  **Parallelization**:
  - **Can Run In Parallel**: YES (after T2, T5)
  - **Parallel Group**: Wave 1 (with T7)
  - **Blocks**: Tasks 9, 13, 15, 21, 22, 27, 28
  - **Blocked By**: Tasks 2, 5

  **References**:
  - `components/layout/Header.tsx` — Current header (mega menu, 3 languages, social links) — use as content reference, redesign UI
  - `components/layout/Footer.tsx` — Current footer — use as content reference
  - `app/layout.tsx` — Current root layout structure
  - Tesla.com — Transparent-to-solid header on scroll pattern
  - Rivian.com — Full-screen mobile menu overlay
  - `lib/design-tokens.ts` (Task 2) — Design tokens
  - `lib/a11y.ts` (Task 5) — Accessibility utilities

  **Acceptance Criteria**:
  - [ ] HeaderV2 is transparent on page load, solid on scroll
  - [ ] HeaderV2 hides on scroll-down, shows on scroll-up
  - [ ] HeaderV2 mobile menu is full-screen overlay
  - [ ] All nav items ≥44×44px touch target
  - [ ] FooterV2 has company info, links, social, tagline
  - [ ] `(redesign)` route group layout works
  - [ ] `npm run build` succeeds
  - [ ] Existing pages still work with original header/footer

  **QA Scenarios**:
  ```
  Scenario: Header transparency + scroll behavior
    Tool: Playwright (playwright skill)
    Steps:
      1. Navigate to http://localhost:3000 (or redesign route)
      2. Assert: header has transparent/semi-transparent background
      3. Scroll down 500px
      4. Assert: header has solid background
      5. Scroll down 200px more
      6. Assert: header is hidden
      7. Scroll up 100px
      8. Assert: header reappears
    Expected Result: Header scroll behavior works correctly
    Evidence: .sisyphus/evidence/task-8-header-scroll.png

  Scenario: Mobile menu overlay
    Tool: Playwright (playwright skill)
    Steps:
      1. Set viewport to 375×812 (iPhone)
      2. Navigate to page with HeaderV2
      3. Click hamburger button
      4. Assert: full-screen menu overlay appears
      5. Assert: all menu items ≥44px height
      6. Click close button
      7. Assert: overlay closes
    Expected Result: Mobile menu works with proper touch targets
    Evidence: .sisyphus/evidence/task-8-mobile-menu.png

  Scenario: Existing pages unaffected
    Tool: Playwright (playwright skill)
    Steps:
      1. Navigate to http://localhost:3000 (original route)
      2. Assert: original Header.tsx renders (not HeaderV2)
      3. Navigate to http://localhost:3000/products
      4. Assert: original sidebar and layout intact
    Expected Result: Original pages unchanged
    Evidence: .sisyphus/evidence/task-8-existing-pages.png
  ```

  **Commit**: YES (groups with Wave 1)
  - Message: `feat(layout): HeaderV2 + FooterV2 + redesign route group layout`
  - Files: `components/layout/HeaderV2.tsx`, `components/layout/FooterV2.tsx`, `app/(redesign)/layout.tsx`
  - Pre-commit: `npm run build`

---

### Wave 2 — Core Pages: Phase 1 첫인상 혁명 (7 tasks)

- [ ] 9. Homepage Fullscreen Scroll-Snap Hero

  **What to do**:
  - Create `components/sections/FullscreenHero.tsx` — Tesla-style fullscreen product showcase:
    - CSS scroll-snap on Y axis, each section 100vh
    - Sections: S → M → L → XL product models, each with:
      - Full-bleed product photo/video background
      - Model name (large, clean typography)
      - "from ₩X,XXX만" total price (accessible, not intimidating)
      - Dual CTA: "자세히 보기" (primary) + "상담 신청" (secondary)
      - Witty one-liner per model (e.g., S: "작지만 위트있게", L: "넉넉하게, 위트있게")
    - Bottom navigation dots showing current section
    - Scroll indicator arrow on first section
    - Mobile: stacked vertically, full-bleed images, CTAs at bottom
    - Framer Motion transitions between sections
    - Lazy load images below fold
  - Product data fetched from Supabase `products` table (or fallback static data)
  - Use Next.js Image component with proper `sizes` and `priority` for first image

  **Must NOT do**:
  - Do NOT show monthly payments (no financing)
  - Do NOT add "Order" or "Reserve" buttons (Korean market: consultation first)
  - Do NOT use English labels

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Fullscreen hero design without Figma

  **Parallelization**:
  - **Can Run In Parallel**: YES (with T10, T11, T12, T13, T14)
  - **Parallel Group**: Wave 2
  - **Blocks**: Task 15
  - **Blocked By**: Tasks 2, 8

  **References**:
  - `components/sections/HeroCarousel.tsx` + `HeroCarouselClientComponent.tsx` — Current hero (carousel, Supabase hero_slides) — content reference
  - `lib/supabase.ts` — Supabase client for data fetching
  - Tesla.com homepage — Fullscreen scroll-snap product sections
  - `lib/design-tokens.ts` (Task 2) — Design tokens
  - `lib/animations.ts` (Task 2) — Animation variants
  - Products table schema — `products` table with category, price, images

  **Acceptance Criteria**:
  - [ ] 4+ fullscreen sections (one per model size)
  - [ ] Scroll-snap works on desktop and mobile
  - [ ] Each section has product image, name, price, witty copy, CTAs
  - [ ] No monthly payment shown
  - [ ] First image uses `priority` for LCP optimization
  - [ ] `npm run build` succeeds

  **QA Scenarios**:
  ```
  Scenario: Fullscreen hero renders with scroll-snap
    Tool: Playwright (playwright skill)
    Steps:
      1. Navigate to redesign homepage
      2. Assert: first section is 100vh height
      3. Assert: product image is visible as background
      4. Assert: model name is visible (large text)
      5. Assert: price shown as total (₩ format, no monthly)
      6. Assert: "자세히 보기" button exists
      7. Assert: "상담 신청" button exists
      8. Scroll down to next snap point
      9. Assert: second model section is fully visible
      10. Screenshot both sections
    Expected Result: 4 fullscreen sections with scroll-snap, Korean labels, total price
    Evidence: .sisyphus/evidence/task-9-hero-desktop.png

  Scenario: Mobile hero layout
    Tool: Playwright (playwright skill)
    Steps:
      1. Set viewport to 375×812
      2. Navigate to redesign homepage
      3. Assert: hero sections are full-width
      4. Assert: CTAs are at bottom of each section
      5. Assert: text is readable (not too small)
      6. Scroll through all sections
    Expected Result: Mobile layout works correctly
    Evidence: .sisyphus/evidence/task-9-hero-mobile.png
  ```

  **Commit**: YES (groups with Wave 2)
  - Message: `feat(home): fullscreen scroll-snap product hero — S/M/L/XL models`
  - Files: `components/sections/FullscreenHero.tsx`, related page file
  - Pre-commit: `npm run build`

- [ ] 10. Witty Copy System + Micro-interactions

  **What to do**:
  - Create `lib/witty-copy.ts` — centralized witty copy management:
    - Product model taglines: S, M, L, XL each with witty Korean one-liner
    - Section headlines with personality (not corporate-speak)
    - CTA variations that feel human ("궁금한 거 다 물어보세요" vs "문의하기")
    - Error messages: "이런, 뭔가 잘못됐어요" instead of "Error occurred"
    - Empty states: "아직 아무것도 없어요. 첫 번째가 되어보세요!"
    - Loading states: "집 짓는 중..." with variations
    - Scroll end: "여기까지 보셨으면, 이미 반쯤 이사하신 거예요 :)"
  - Create `components/ui/WittyTooltip.tsx` — hover tooltips with witty text
  - Create `components/ui/MicroInteraction.tsx` — reusable micro-interaction wrapper:
    - Hover scale/rotate effects for cards
    - Click ripple effects for buttons
    - Cursor-following subtle parallax for hero images
  - Create `lib/easter-eggs.ts` — fun easter egg triggers:
    - Konami code → special animation
    - Triple-click logo → brand story modal
    - These are LOW priority, implement if time allows

  **Must NOT do**:
  - Do NOT make copy cringey or forced — natural Korean humor (배민/야놀자 tone)
  - Do NOT add too many animations that hurt performance
  - Do NOT use memes or internet slang that dates quickly

  **Recommended Agent Profile**:
  - **Category**: `artistry`
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Creative UI interactions

  **Parallelization**:
  - **Can Run In Parallel**: YES (with T9, T11, T12, T13, T14)
  - **Parallel Group**: Wave 2
  - **Blocks**: Tasks 15, 34
  - **Blocked By**: Task 2

  **References**:
  - 배달의민족 — Korean witty copy examples ("우리가 어떤 민족입니까")
  - 야놀자 — Playful Korean brand voice
  - 토스(Toss) — Friendly Korean UX copy patterns
  - `lib/design-tokens.ts` (Task 2) — Animation timing

  **Acceptance Criteria**:
  - [ ] `lib/witty-copy.ts` exports organized copy by category
  - [ ] All copy is natural Korean (not translated English)
  - [ ] WittyTooltip renders on hover with witty text
  - [ ] MicroInteraction provides hover/click effects
  - [ ] `npm run build` succeeds

  **QA Scenarios**:
  ```
  Scenario: Witty copy exports are complete
    Tool: Bash
    Steps:
      1. npx tsx -e "import * as copy from './lib/witty-copy'; console.log(Object.keys(copy))" → Expected: includes productTaglines, sectionHeadlines, ctaVariations, errorMessages, emptyStates, loadingStates
      2. npx tsx -e "import { productTaglines } from './lib/witty-copy'; console.log(productTaglines.S)" → Expected: Korean witty one-liner (not empty)
    Expected Result: All copy categories populated with Korean text
    Evidence: .sisyphus/evidence/task-10-copy-exports.txt

  Scenario: Micro-interactions work
    Tool: Playwright (playwright skill)
    Steps:
      1. Navigate to page with MicroInteraction-wrapped card
      2. Hover over card
      3. Assert: card scales slightly (transform applied)
      4. Click card
      5. Assert: ripple effect visible
    Expected Result: Hover and click micro-interactions work
    Evidence: .sisyphus/evidence/task-10-micro-interactions.png
  ```

  **Commit**: YES (groups with Wave 2)
  - Message: `feat(brand): witty Korean copy system + micro-interactions + tooltips`
  - Files: `lib/witty-copy.ts`, `lib/easter-eggs.ts`, `components/ui/WittyTooltip.tsx`, `components/ui/MicroInteraction.tsx`
  - Pre-commit: `npm run build`

- [ ] 11. Model Comparison Table Component

  **What to do**:
  - Create `components/sections/ModelComparison.tsx` — interactive comparison table:
    - S vs M vs L vs XL side-by-side (desktop) / swipeable cards (mobile)
    - Rows: 면적(㎡/평), 가격(총액), 방/욕실 수, 용도 추천, 크기 비교 시각화
    - Highlight "인기" badge on most popular model
    - Each column has "자세히 보기" CTA linking to product page
    - Sticky header row on scroll
    - Animated number transitions when switching comparison items
    - Color coding: selected model highlighted in 위트 옐로우
  - Mobile layout: horizontal scroll with snap, or accordion-style expandable cards
  - Data from Supabase `products` table or static fallback

  **Must NOT do**:
  - Do NOT show monthly payment (no financing)
  - Do NOT add "주문" or payment CTAs
  - Do NOT make it too complex — clean, scannable

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: [`frontend-ui-ux`]

  **Parallelization**:
  - **Can Run In Parallel**: YES (with T9, T10, T12, T13, T14)
  - **Parallel Group**: Wave 2
  - **Blocks**: Task 15
  - **Blocked By**: Task 2

  **References**:
  - `app/products/page.tsx` — Current product listing with sidebar filter (content reference for product data shape)
  - `components/admin/ProductForm.tsx` — Product data fields (area, price, category)
  - Tesla.com/model-comparison — Side-by-side comparison UX
  - Nestron.house — Product card grid pattern
  - `lib/design-tokens.ts` (Task 2) — Design tokens

  **Acceptance Criteria**:
  - [ ] Table shows S/M/L/XL models with key specs
  - [ ] Total price displayed (no monthly)
  - [ ] Mobile: horizontal scroll or accordion
  - [ ] "자세히 보기" CTA per model
  - [ ] `npm run build` succeeds

  **QA Scenarios**:
  ```
  Scenario: Comparison table renders correctly on desktop
    Tool: Playwright (playwright skill)
    Steps:
      1. Navigate to page with ModelComparison component
      2. Assert: 4 columns visible (S, M, L, XL)
      3. Assert: each column has 면적, 가격, 방/욕실
      4. Assert: price is in ₩ format (total, no monthly)
      5. Assert: "자세히 보기" button exists per column
      6. Assert: one model has "인기" badge
    Expected Result: Full comparison table visible with all data
    Evidence: .sisyphus/evidence/task-11-comparison-desktop.png

  Scenario: Comparison works on mobile
    Tool: Playwright (playwright skill)
    Steps:
      1. Set viewport to 375×812
      2. Navigate to page with ModelComparison
      3. Assert: cards are swipeable or accordion-expandable
      4. Swipe/tap to see different models
      5. Assert: all model data accessible
    Expected Result: Mobile comparison UX works
    Evidence: .sisyphus/evidence/task-11-comparison-mobile.png
  ```

  **Commit**: YES (groups with Wave 2)
  - Message: `feat(compare): interactive model comparison table — S/M/L/XL`
  - Files: `components/sections/ModelComparison.tsx`
  - Pre-commit: `npm run build`

- [ ] 12. Trust Badges Section

  **What to do**:
  - Create `components/sections/TrustBadges.tsx`:
    - Row 1: Media mentions — logos of Korean media that covered weet (SBS, KBS, 조선일보, etc.)
      - If no actual media logos available, use placeholder structure for future content
    - Row 2: Government/industry certifications
      - "모듈러 특별법" mention (정부 추진 중)
      - ISO certifications if applicable
      - Industry association memberships
    - Row 3: Key stats counter (CountUp component from Task 7)
      - "XX+ 시공 완료" (completed projects)
      - "XX년 업력" (years in business)
      - "XX% 고객 만족" (customer satisfaction)
    - Subtle background pattern or gradient
    - All logos/badges in grayscale, color on hover
    - Responsive: 2 columns on mobile, 4+ on desktop

  **Must NOT do**:
  - Do NOT fabricate media mentions — use placeholders if none exist
  - Do NOT claim certifications the company doesn't have

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: [`frontend-ui-ux`]

  **Parallelization**:
  - **Can Run In Parallel**: YES (with T9, T10, T11, T13, T14)
  - **Parallel Group**: Wave 2
  - **Blocks**: Task 15
  - **Blocked By**: Task 2

  **References**:
  - `components/sections/PartnersBanner.tsx` — Existing partner/media banner (content reference)
  - Boxabl.com — Media logo strip (CNN, Forbes, NBC pattern)
  - `components/ui/CountUp.tsx` (Task 7) — Animated number counter
  - `lib/design-tokens.ts` (Task 2) — Design tokens

  **Acceptance Criteria**:
  - [ ] Trust badges section renders with 3 rows
  - [ ] CountUp animation for stats numbers
  - [ ] Grayscale logos, color on hover
  - [ ] Mobile responsive (2 columns)
  - [ ] `npm run build` succeeds

  **QA Scenarios**:
  ```
  Scenario: Trust badges render with animations
    Tool: Playwright (playwright skill)
    Steps:
      1. Navigate to page with TrustBadges
      2. Scroll to TrustBadges section
      3. Assert: media logos visible
      4. Assert: stat numbers animate (CountUp)
      5. Hover over a logo
      6. Assert: logo transitions from grayscale to color
    Expected Result: Trust badges section complete with animations
    Evidence: .sisyphus/evidence/task-12-trust-badges.png

  Scenario: Mobile layout
    Tool: Playwright (playwright skill)
    Steps:
      1. Set viewport to 375×812
      2. Navigate to TrustBadges section
      3. Assert: 2-column grid layout
      4. Assert: stats still visible and readable
    Expected Result: Mobile responsive
    Evidence: .sisyphus/evidence/task-12-trust-mobile.png
  ```

  **Commit**: YES (groups with Wave 2)
  - Message: `feat(trust): media badges + certifications + animated stats section`
  - Files: `components/sections/TrustBadges.tsx`
  - Pre-commit: `npm run build`

- [ ] 13. Products Page Redesign

  **What to do**:
  - Create `app/(redesign)/products/page.tsx` — redesigned products page:
    - Hero: fullscreen product category selector (S/M/L/XL as large interactive cards)
    - Product detail: immersive layout — large photos, spec highlights, floor plan
    - Gallery: full-bleed image grid with lightbox
    - "상담 신청" CTA prominently placed
    - Product specifications in clean, scannable format
    - Related products section ("이 모델도 보세요")
  - Preserve existing product sidebar filter logic but with new UI:
    - Redesigned sidebar with cleaner categories
    - Mobile: bottom sheet filter instead of slide-in sidebar
  - Fetch product data from Supabase `products` table (same as current)
  - Integrate witty copy per product (from Task 10)

  **Must NOT do**:
  - Do NOT remove or modify existing `/products` page
  - Do NOT change Supabase product data schema
  - Do NOT add cart/checkout functionality
  - Do NOT show monthly payments

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: [`frontend-ui-ux`]

  **Parallelization**:
  - **Can Run In Parallel**: YES (with T9, T10, T11, T12, T14)
  - **Parallel Group**: Wave 2
  - **Blocks**: Task 31
  - **Blocked By**: Tasks 2, 8

  **References**:
  - `app/products/page.tsx` — Current products page with fixed sidebar filter
  - `app/products/[id]/page.tsx` — Current product detail page (if exists)
  - `components/sections/` — Current product-related section components
  - `lib/supabase.ts` — Supabase client for product data
  - Products table schema — category (S/M/L/XL/SOLUTION/DESIGN), subcategory (Private/Public)
  - Tesla.com/model-s — Immersive product page pattern
  - `components/layout/HeaderV2.tsx` (Task 8) — New header
  - CLAUDE.md note: "사이드바는 제품의 필터처럼 어떤 페이지에서든 항상 따라다니는 고정 사이드바"

  **Acceptance Criteria**:
  - [ ] Products page renders with new design under `(redesign)` route
  - [ ] Product categories selectable (S/M/L/XL)
  - [ ] Product detail shows large photos, specs, floor plan
  - [ ] "상담 신청" CTA visible
  - [ ] Mobile bottom sheet filter works
  - [ ] Original `/products` page unaffected
  - [ ] `npm run build` succeeds

  **QA Scenarios**:
  ```
  Scenario: Products page renders with category filter
    Tool: Playwright (playwright skill)
    Steps:
      1. Navigate to redesign products page
      2. Assert: product categories visible (S, M, L, XL)
      3. Click on "M" category
      4. Assert: M-size products displayed
      5. Assert: product card has image, name, price (total), CTA
      6. Click on a product
      7. Assert: product detail view with specs
    Expected Result: Products page with filtering and detail view works
    Evidence: .sisyphus/evidence/task-13-products-desktop.png

  Scenario: Mobile bottom sheet filter
    Tool: Playwright (playwright skill)
    Steps:
      1. Set viewport to 375×812
      2. Navigate to redesign products page
      3. Tap filter button
      4. Assert: bottom sheet appears with categories
      5. Select category
      6. Assert: bottom sheet closes, products filtered
    Expected Result: Mobile filter UX works
    Evidence: .sisyphus/evidence/task-13-products-mobile.png
  ```

  **Commit**: YES (groups with Wave 2)
  - Message: `feat(products): redesigned products page — immersive layout + bottom sheet filter`
  - Files: `app/(redesign)/products/page.tsx`, `app/(redesign)/products/[id]/page.tsx`, related components
  - Pre-commit: `npm run build`

- [ ] 14. Floating KakaoTalk CTA + Consultation Flow

  **What to do**:
  - Create `components/ui/FloatingKakaoCTA.tsx`:
    - Fixed position bottom-right floating button
    - KakaoTalk yellow icon/color
    - Tooltip on hover: "카카오톡으로 상담하기"
    - On click: opens KakaoTalk channel (using `lib/kakao.ts` from Task 6)
    - Fallback if KakaoTalk not configured: opens inquiry form modal
    - Hide on scroll-down, show on scroll-up (like header)
    - Mobile: slightly larger button, no tooltip (tap only)
    - Z-index above all content but below modals
  - Create `components/ui/ConsultationModal.tsx`:
    - Fallback consultation form (when KakaoTalk not available)
    - Fields: name, phone, email, product interest, message
    - Uses React 19 `useActionState` for form handling
    - Submits to Supabase `inquiries` table
    - Success: "상담 신청이 완료되었어요! 빠른 시일 내에 연락드릴게요 :)"
    - Error: witty error message from `lib/witty-copy.ts`

  **Must NOT do**:
  - Do NOT require KakaoTalk to be set up — fallback form must work
  - Do NOT add payment/deposit flow
  - Do NOT use `window.React` hack (fix the `useActionState` pattern properly)

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: [`frontend-ui-ux`]

  **Parallelization**:
  - **Can Run In Parallel**: YES (with T9, T10, T11, T12, T13)
  - **Parallel Group**: Wave 2
  - **Blocks**: Tasks 15, 18, 20, 26
  - **Blocked By**: Task 6

  **References**:
  - `components/providers/KakaoProvider.tsx` (Task 6) — KakaoTalk SDK
  - `lib/kakao.ts` (Task 6) — KakaoTalk helpers
  - `lib/witty-copy.ts` (Task 10) — Error/success messages
  - `app/support/InquiryForm.tsx` — Current inquiry form (has broken `useActionState` at lines 27-30 with `window.React` hack — fix this pattern)
  - `lib/supabase.ts` — Supabase client for inquiry submission
  - React 19 `useActionState` docs — Proper form handling pattern

  **Acceptance Criteria**:
  - [ ] Floating button visible in bottom-right corner
  - [ ] Button triggers KakaoTalk or fallback modal
  - [ ] ConsultationModal form submits to Supabase
  - [ ] `useActionState` used properly (no `window.React` hack)
  - [ ] Witty success/error messages
  - [ ] Mobile: larger button, works with thumb
  - [ ] `npm run build` succeeds

  **QA Scenarios**:
  ```
  Scenario: Floating CTA appears and triggers fallback
    Tool: Playwright (playwright skill)
    Steps:
      1. Navigate to redesign homepage (without KAKAO env vars)
      2. Assert: floating button visible in bottom-right
      3. Click floating button
      4. Assert: ConsultationModal opens
      5. Fill form: name="테스트", phone="01012345678", email="test@test.com", message="테스트 문의"
      6. Submit form
      7. Assert: success message contains witty copy
    Expected Result: Fallback consultation flow works end-to-end
    Evidence: .sisyphus/evidence/task-14-consultation-flow.png

  Scenario: Floating button scroll behavior
    Tool: Playwright (playwright skill)
    Steps:
      1. Navigate to redesign homepage
      2. Assert: floating button visible
      3. Scroll down rapidly
      4. Assert: floating button hides
      5. Scroll up
      6. Assert: floating button reappears
    Expected Result: Button follows scroll-direction pattern
    Evidence: .sisyphus/evidence/task-14-scroll-behavior.png
  ```

  **Commit**: YES (groups with Wave 2)
  - Message: `feat(cta): floating KakaoTalk CTA + consultation modal with useActionState`
  - Files: `components/ui/FloatingKakaoCTA.tsx`, `components/ui/ConsultationModal.tsx`
  - Pre-commit: `npm run build`

- [ ] 15. Homepage Assembly

  **What to do**:
  - Create `app/(redesign)/page.tsx` — new homepage assembling all Phase 1 sections:
    1. FullscreenHero (Task 9) — S→M→L→XL scroll-snap
    2. TrustBadges (Task 12) — media + certifications + stats
    3. ModelComparison (Task 11) — interactive comparison table
    4. [Placeholder for scroll storytelling section — Phase 2]
    5. CTA section — "위트있는 집, 지금 시작하세요" + 상담 신청 button
    6. FloatingKakaoCTA (Task 14) — always visible
  - Page metadata: title, description for SEO
  - Open Graph tags for social sharing
  - Structured data (JSON-LD) for organization
  - Use `"use cache"` directive for appropriate sections

  **Must NOT do**:
  - Do NOT remove original `app/page.tsx`
  - Do NOT copy-paste existing homepage sections

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: [`frontend-ui-ux`]

  **Parallelization**:
  - **Can Run In Parallel**: NO (depends on T9, T10, T11, T12, T14)
  - **Parallel Group**: Wave 2 — last in wave
  - **Blocks**: Tasks 29, 30
  - **Blocked By**: Tasks 9, 10, 11, 12, 14

  **References**:
  - `app/page.tsx` — Current homepage (section composition pattern)
  - `components/sections/FullscreenHero.tsx` (Task 9)
  - `components/sections/TrustBadges.tsx` (Task 12)
  - `components/sections/ModelComparison.tsx` (Task 11)
  - `components/ui/FloatingKakaoCTA.tsx` (Task 14)
  - Tesla.com — Homepage flow: hero → story → specs → CTA

  **Acceptance Criteria**:
  - [ ] Homepage renders all Phase 1 sections in correct order
  - [ ] Page metadata and OG tags set
  - [ ] JSON-LD structured data present
  - [ ] Smooth section transitions
  - [ ] `npm run build` succeeds

  **QA Scenarios**:
  ```
  Scenario: Full homepage flow
    Tool: Playwright (playwright skill)
    Steps:
      1. Navigate to redesign homepage
      2. Assert: FullscreenHero is first section (100vh)
      3. Scroll past hero sections
      4. Assert: TrustBadges section visible
      5. Continue scrolling
      6. Assert: ModelComparison section visible
      7. Continue to bottom
      8. Assert: CTA section with "상담 신청" button
      9. Assert: FloatingKakaoCTA visible throughout
    Expected Result: Complete homepage flows correctly
    Evidence: .sisyphus/evidence/task-15-homepage-flow.png

  Scenario: SEO metadata present
    Tool: Bash
    Steps:
      1. curl -s http://localhost:3000 | grep -c "og:title" → Expected: ≥1
      2. curl -s http://localhost:3000 | grep -c "application/ld+json" → Expected: ≥1
    Expected Result: OG tags and structured data present
    Evidence: .sisyphus/evidence/task-15-seo.txt
  ```

  **Commit**: YES (groups with Wave 2)
  - Message: `feat(home): assemble redesigned homepage — hero + trust + comparison + CTA`
  - Files: `app/(redesign)/page.tsx`
  - Pre-commit: `npm run build`

---

### Wave 3 — Storytelling + Conversion: Phase 2 (7 tasks)

- [ ] 16. Scroll-Driven Storytelling Engine

  **What to do**:
  - Install GSAP + ScrollTrigger (or use Framer Motion's scroll-linked animations)
  - Create `lib/scroll-storytelling.ts` — scroll-driven animation utilities:
    - `useScrollProgress(ref)` — returns 0-1 progress for element
    - `useScrollSection(ref, config)` — pin section and animate children based on scroll
    - `ScrollSequence` component — plays image sequence on scroll (Apple-style frame animation)
  - Create `components/sections/ScrollStorySection.tsx` — reusable scroll story section:
    - Supports: text reveal, image parallax, counter animation, pinned sections
    - Configurable via props (no hard-coded content)
  - Performance: use `will-change`, `transform` only, avoid layout-triggering properties
  - Mobile: simplified animations (reduce complexity for performance)

  **Must NOT do**:
  - Do NOT create Canvas-based image sequence (too heavy without optimized assets)
  - Do NOT use requestAnimationFrame directly (use library abstractions)
  - Do NOT make animations that prevent page scrolling

  **Recommended Agent Profile**:
  - **Category**: `deep`
  - **Skills**: [`frontend-ui-ux`]

  **Parallelization**:
  - **Can Run In Parallel**: YES (with T18, T19, T20, T21, T22)
  - **Parallel Group**: Wave 3
  - **Blocks**: Task 17
  - **Blocked By**: Task 2

  **References**:
  - Apple.com/iphone — Scroll-driven frame sequence pattern
  - Aventi.com/starfire — Premium scroll storytelling
  - haus.me — Q&A scroll story pattern
  - `lib/design-tokens.ts` (Task 2) — Animation timing
  - GSAP ScrollTrigger docs — Pin, scrub, timeline patterns
  - Framer Motion `useScroll` / `useTransform` — Alternative to GSAP

  **Acceptance Criteria**:
  - [ ] `useScrollProgress` returns 0-1 based on scroll position
  - [ ] `ScrollStorySection` renders with configurable content
  - [ ] Animations use GPU-accelerated properties only
  - [ ] Mobile: reduced animations, still smooth
  - [ ] `npm run build` succeeds

  **QA Scenarios**:
  ```
  Scenario: Scroll progress tracking works
    Tool: Playwright (playwright skill)
    Steps:
      1. Navigate to page with ScrollStorySection
      2. Scroll to section
      3. Assert: text/images animate based on scroll position
      4. Scroll through entire section
      5. Assert: animation completes at section end
    Expected Result: Scroll-driven animation responds to scroll
    Evidence: .sisyphus/evidence/task-16-scroll-story.png

  Scenario: Mobile performance acceptable
    Tool: Playwright (playwright skill)
    Steps:
      1. Set viewport to 375×812
      2. Navigate to scroll story section
      3. Scroll through section
      4. Assert: no visible jank or frame drops
      5. Assert: simplified animation on mobile
    Expected Result: Smooth mobile experience
    Evidence: .sisyphus/evidence/task-16-scroll-mobile.png
  ```

  **Commit**: YES (groups with Wave 3)
  - Message: `feat(scroll): scroll-driven storytelling engine with GSAP/Framer Motion`
  - Files: `lib/scroll-storytelling.ts`, `components/sections/ScrollStorySection.tsx`
  - Pre-commit: `npm run build`

- [ ] 17. /modular Page Redesign with Scroll Storytelling

  **What to do**:
  - Create `app/(redesign)/modular/page.tsx` — redesigned modular construction page:
    - Section 1: Hero — "공장에서 태어난 집" with dramatic factory/module imagery
    - Section 2: Q&A scroll story (haus.me inspired):
      - "모듈러 건축이 뭐예요?" → visual answer with animation
      - "얼마나 걸려요?" → "3개월" CountUp animation
      - "튼튼한가요?" → "50년 내구성" with structure diagram
      - "환경에 좋은가요?" → carbon comparison infographic
    - Section 3: Construction timeline (factory → transport → install → complete)
      - Step-by-step visualization with scroll-triggered reveals
    - Section 4: vs 일반 건축 comparison (time, cost, quality, waste)
    - Section 5: CTA — "모듈러로 시작하기" → 상담 신청

  - Use `ScrollStorySection` and utilities from Task 16
  - Use `CountUp` from Task 7 for statistics
  - Use witty copy from Task 10

  **Must NOT do**:
  - Do NOT remove existing `/modular` page
  - Do NOT make claims without basis (use general industry stats)

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: [`frontend-ui-ux`]

  **Parallelization**:
  - **Can Run In Parallel**: NO (depends on T16)
  - **Parallel Group**: Wave 3 — after T16
  - **Blocks**: Tasks 29, 30
  - **Blocked By**: Task 16

  **References**:
  - `app/modular/page.tsx` — Current modular page (content reference)
  - `components/sections/ScrollStorySection.tsx` (Task 16) — Scroll storytelling engine
  - `components/ui/CountUp.tsx` (Task 7) — Animated counters
  - `lib/witty-copy.ts` (Task 10) — Section headlines
  - haus.me — Q&A scroll pattern
  - ICON build — Tech storytelling for construction
  - Korean modular construction stats — 3-month build time, 50-year durability

  **Acceptance Criteria**:
  - [ ] 5 sections render with scroll-driven animations
  - [ ] Q&A section animates answers on scroll
  - [ ] Construction timeline shows 4+ steps
  - [ ] CountUp statistics animate
  - [ ] "상담 신청" CTA at bottom
  - [ ] `npm run build` succeeds

  **QA Scenarios**:
  ```
  Scenario: Modular page scroll story experience
    Tool: Playwright (playwright skill)
    Steps:
      1. Navigate to redesign /modular page
      2. Assert: hero section with "공장에서 태어난 집" or similar
      3. Scroll to Q&A section
      4. Assert: questions reveal with scroll
      5. Assert: "3개월" CountUp animates
      6. Scroll to timeline section
      7. Assert: construction steps visible (factory → transport → install → complete)
      8. Scroll to comparison section
      9. Assert: 모듈러 vs 일반 건축 comparison visible
      10. Scroll to CTA
      11. Assert: "상담 신청" button visible
    Expected Result: Complete modular page experience
    Evidence: .sisyphus/evidence/task-17-modular-page.png

  Scenario: Mobile experience
    Tool: Playwright (playwright skill)
    Steps:
      1. Set viewport to 375×812
      2. Navigate to redesign /modular
      3. Scroll through entire page
      4. Assert: all sections readable and functional
    Expected Result: Mobile modular page works
    Evidence: .sisyphus/evidence/task-17-modular-mobile.png
  ```

  **Commit**: YES (groups with Wave 3)
  - Message: `feat(modular): redesigned modular page with scroll storytelling + Q&A`
  - Files: `app/(redesign)/modular/page.tsx`, related components
  - Pre-commit: `npm run build`

- [ ] 18. Guided Quote Builder /quote

  **What to do**:
  - Create `app/(redesign)/quote/page.tsx` — step-by-step quote builder:
    - Step 1: 용도 선택 — "어떤 용도로 사용하실 건가요?" (주거용/사무용/체류형 쉼터/글램핑/기타)
    - Step 2: 모델 선택 — S/M/L/XL with images and brief specs
    - Step 3: 부지 정보 — 지역(시/도), 부지 면적, 접근성 (차량 진입 가능 여부)
    - Step 4: 추가 옵션 — 솔루션 체크리스트 (CCTV, IoT, Network, Design consulting)
    - Step 5: 견적 결과 — 예상 견적 범위 (정확한 가격 X, "₩X,XXX만 ~ ₩Y,YYY만")
      - PDF 다운로드 기능
      - "정확한 견적은 상담 후 안내드려요" 안내
      - "카카오톡 상담 신청" CTA
    - Progress bar showing current step
    - Back/Next navigation
    - Summary sidebar (desktop) showing selections so far
    - Mobile: full-screen per step, bottom navigation
  - Use React 19 `useActionState` for form handling
  - Store quote data in session (no DB save until consultation request)
  - Generate basic PDF using browser print or simple PDF library

  **Must NOT do**:
  - Do NOT show exact prices (only ranges)
  - Do NOT show monthly payments
  - Do NOT require login
  - Do NOT call it "configurator" — it's "견적 빌더" or "가이드 견적"
  - Do NOT use 3D models or complex visualizations

  **Recommended Agent Profile**:
  - **Category**: `deep`
  - **Skills**: [`frontend-ui-ux`]

  **Parallelization**:
  - **Can Run In Parallel**: YES (with T16, T19, T20, T21, T22)
  - **Parallel Group**: Wave 3
  - **Blocks**: Task 30
  - **Blocked By**: Tasks 2, 14

  **References**:
  - Tiny Heirloom configurator — Step-by-step with live price (UX reference, not exact copy)
  - Atomic Tiny Homes — "Design Package" simplification pattern
  - `components/ui/ConsultationModal.tsx` (Task 14) — Consultation CTA pattern
  - `lib/kakao.ts` (Task 6) — KakaoTalk link
  - `lib/witty-copy.ts` (Task 10) — Step descriptions and CTAs
  - `lib/design-tokens.ts` (Task 2) — Design tokens
  - Product data — price ranges per model category

  **Acceptance Criteria**:
  - [ ] 5-step wizard renders with progress bar
  - [ ] Each step shows relevant options with images
  - [ ] Final step shows price RANGE (not exact)
  - [ ] PDF download works
  - [ ] "카카오톡 상담 신청" CTA on result page
  - [ ] No login required
  - [ ] `npm run build` succeeds

  **QA Scenarios**:
  ```
  Scenario: Complete quote builder flow
    Tool: Playwright (playwright skill)
    Steps:
      1. Navigate to /quote
      2. Assert: Step 1 visible with 용도 options
      3. Select "주거용"
      4. Click Next
      5. Assert: Step 2 with model options (S/M/L/XL)
      6. Select "M"
      7. Click Next
      8. Assert: Step 3 with 부지 정보 form
      9. Fill region, area
      10. Click Next
      11. Assert: Step 4 with 추가 옵션 checkboxes
      12. Select CCTV + IoT
      13. Click Next
      14. Assert: Step 5 shows price RANGE (₩X,XXX만 ~ ₩Y,YYY만)
      15. Assert: "카카오톡 상담 신청" button visible
      16. Assert: PDF download button visible
    Expected Result: Full 5-step flow works end-to-end
    Evidence: .sisyphus/evidence/task-18-quote-flow.png

  Scenario: Back navigation preserves selections
    Tool: Playwright (playwright skill)
    Steps:
      1. Complete steps 1-3
      2. Click Back
      3. Assert: Step 2 selections preserved
      4. Click Back
      5. Assert: Step 1 selection preserved
    Expected Result: Back navigation works without data loss
    Evidence: .sisyphus/evidence/task-18-back-nav.png

  Scenario: Mobile step-by-step layout
    Tool: Playwright (playwright skill)
    Steps:
      1. Set viewport to 375×812
      2. Navigate to /quote
      3. Assert: full-screen steps
      4. Complete flow
      5. Assert: bottom navigation works
    Expected Result: Mobile quote builder works
    Evidence: .sisyphus/evidence/task-18-quote-mobile.png
  ```

  **Commit**: YES (groups with Wave 3)
  - Message: `feat(quote): guided quote builder — 5-step wizard with price ranges + PDF`
  - Files: `app/(redesign)/quote/page.tsx`, `components/quote/*`
  - Pre-commit: `npm run build`

---

## Final Verification Wave (MANDATORY — after ALL implementation tasks)

> 4 review agents run in PARALLEL. ALL must APPROVE. Rejection → fix → re-run.

- [ ] F1. **Plan Compliance Audit** — `oracle`
  Read the plan end-to-end. For each "Must Have": verify implementation exists (read file, curl endpoint, run command). For each "Must NOT Have": search codebase for forbidden patterns — reject with file:line if found. Check evidence files exist in .sisyphus/evidence/. Compare deliverables against plan.
  Output: `Must Have [N/N] | Must NOT Have [N/N] | Tasks [N/N] | VERDICT: APPROVE/REJECT`

- [ ] F2. **Code Quality Review** — `unspecified-high`
  Run `tsc --noEmit` + linter + `bun test`. Review all changed files for: `as any`/`@ts-ignore`, empty catches, console.log in prod, commented-out code, unused imports. Check AI slop: excessive comments, over-abstraction, generic names (data/result/item/temp). Verify KWCAG 2.2 compliance (skip-nav, touch targets, contrast).
  Output: `Build [PASS/FAIL] | Lint [PASS/FAIL] | Tests [N pass/N fail] | Files [N clean/N issues] | VERDICT`

- [ ] F3. **Real Manual QA** — `unspecified-high` + `playwright` skill
  Start from clean state (`npm run build && npm start`). Execute EVERY QA scenario from EVERY task — follow exact steps, capture evidence. Test cross-task integration: hero → comparison → quote builder → kakao CTA flow. Test on mobile viewport (375px). Test edge cases: empty product list, missing images, rapid scroll. Save to `.sisyphus/evidence/final-qa/`.
  Output: `Scenarios [N/N pass] | Integration [N/N] | Edge Cases [N tested] | VERDICT`

- [ ] F4. **Scope Fidelity Check** — `deep`
  For each task: read "What to do", read actual diff (git log/diff). Verify 1:1 — everything in spec was built (no missing), nothing beyond spec was built (no creep). Check "Must NOT do" compliance — especially no monthly payments, no 3D configurator, no online payment. Detect cross-task contamination. Flag unaccounted changes.
  Output: `Tasks [N/N compliant] | Contamination [CLEAN/N issues] | Unaccounted [CLEAN/N files] | VERDICT`

---

## Commit Strategy

| Wave | Commit Message | Files | Pre-commit |
|------|---------------|-------|------------|
| 1 | `chore(setup): branch init + design tokens + vitest + a11y foundation` | config files, design tokens, test setup | `npm run build` |
| 2 | `feat(phase1): fullscreen hero + comparison table + trust badges + witty copy` | homepage components, products page | `npm run build && npx vitest run` |
| 3 | `feat(phase2): scroll storytelling + quote builder + shelter landing` | modular, quote, shelter, company, support pages | `npm run build && npx vitest run` |
| 4 | `feat(phase3): build tracking + webAR + AI chatbot` | tracking, AR, chatbot components | `npm run build && npx vitest run` |
| 5 | `fix(polish): SEO + performance + mobile + brand consistency` | various fixes | `npm run build && npx vitest run` |
| FINAL | `chore(qa): final verification evidence` | .sisyphus/evidence/ | — |

---

## Success Criteria

### Verification Commands
```bash
npm run build          # Expected: Build succeeds, zero errors
npx vitest run         # Expected: All tests pass
npx lighthouse http://localhost:3000 --output=json  # Expected: Performance ≥90, Accessibility ≥90
```

### Final Checklist
- [ ] All "Must Have" present (fullscreen hero, witty copy, comparison, KakaoTalk, trust badges, 체류형 쉼터, a11y, quote builder)
- [ ] All "Must NOT Have" absent (no 3D configurator, no online payment, no monthly payments, no 8thWall, no FID metrics, no English UX terms)
- [ ] All vitest tests pass
- [ ] All Playwright QA scenarios pass with evidence screenshots
- [ ] Admin CMS fully functional (products, inquiries, gallery, projects, FAQs, analytics)
- [ ] Mobile-first responsive on 375px, 768px, 1024px, 1440px
- [ ] LCP ≤1.5s, INP ≤200ms on Korean network conditions
- [ ] KWCAG 2.2: skip-nav, 44×44px touch targets, 4.5:1 contrast ratio
- [ ] Brand consistent: #FEBD16 yellow, witty Korean tone, "위트" personality

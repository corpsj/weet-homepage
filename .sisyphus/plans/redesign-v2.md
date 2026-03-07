# weet:) Homepage Redesign V2 — System Construction Pivot

## TL;DR

> **Quick Summary**: Complete rebuild of the weet:) homepage using shadcn/ui with a new "시스템건축" (System Construction) brand concept, splitting into 이동식주택 (mobile housing as products) and 현장건축 (on-site construction as portfolio). New color palette (#FFCA0D/#2D2D2A/#FAFAFA), mobile-first premium design with cinematic restraint.
> 
> **Deliverables**:
> - shadcn/ui design system with HSL tokens + Korean typography
> - 8 core pages: 홈, 시스템건축, 제품, 현장건축, 비스포크+견적, 솔루션, 회사소개, 고객지원
> - Dual product navigation (purpose-based + size-based)
> - Rebuilt features: KakaoTalk CTA, AI chatbot, quote builder, tracking, easter eggs
> - Layout shell: Header (shadcn NavigationMenu + Sheet), Footer, page transitions
> 
> **Estimated Effort**: Large
> **Parallel Execution**: YES — 6 waves
> **Critical Path**: T1 → T4 → T8 → T10 → T13 → T15 → T22 → F1-F4

---

## Context

### Original Request
User requested a complete redesign pivot from the V1 redesign (34 tasks, all completed). The existing design was too constrained by Figma templates. User wants maximum design freedom with shadcn/ui, a new "시스템건축" brand concept (replacing "모듈러건축"), new color palette, and mobile-first approach. The entire `(redesign)` route group will be deleted and rebuilt from scratch.

### Interview Summary
**Key Discussions**:
- Business pivot: "모듈러건축" → "시스템건축" with two divisions (이동식주택 + 현장건축)
- 이동식주택: Product catalog approach with dual navigation (purpose-based + size-based)
- 현장건축: Portfolio + process timeline + consultation CTA approach
- Design language: Cinematic restraint (90% neutral, 10% accent yellow), full-bleed heroes, scroll-driven narrative
- shadcn/ui: Must use @2.3.0 (not @latest) for Tailwind v3 compatibility
- 체류형 쉼터: Integrated into 이동식주택 products page as a section
- WebAR: Dropped
- Mobile-first: Primary concern

**Research Findings**:
- shadcn@latest targets Tailwind v4 → confirmed @2.3.0 required (GitHub Discussion #6772)
- CSS variables must use HSL format (not OKLCH) for Tailwind v3
- `tailwindcss-animate` plugin required for shadcn component animations
- 16 shadcn components recommended for the rebuild
- motion-primitives library available as shadcn-registry compatible animation components
- Korean typography requires `word-break: keep-all`, `overflow-wrap: break-word`, `line-height: 1.8`
- Existing Supabase schema (8 tables) unchanged — admin CMS untouched

### Metis Review
**Identified Gaps** (addressed):
- Route coexistence: Branch-isolated on `redesign` branch, old routes will be deleted and rebuilt. Use `(redesign)` route group
- shadcn version: Must use @2.3.0, NOT @latest. Confirmed via GitHub Discussion
- Feature priority: KakaoTalk/chatbot/tracking placed in later waves (Wave 4-5) after core pages
- 현장건축 page naming: Self-resolved — use "프로젝트" or "시공사례" (elegant Korean term)
- Product SOLUTION/DESIGN categories: These exist in DB but are separate from 이동식주택. SOLUTION maps to 솔루션 page, DESIGN maps to 비스포크 page

---

## Work Objectives

### Core Objective
Rebuild the weet:) homepage from scratch on the `redesign` branch using shadcn/ui, implementing the new "시스템건축" brand concept with premium mobile-first design, 8 core pages, and all specified interactive features.

### Concrete Deliverables
- `app/(redesign)/` — 8 page routes + layout + shared components
- `components/ui/` — shadcn components + custom design system components
- `components/layout/HeaderV2.tsx` — shadcn NavigationMenu + Sheet mobile drawer
- `components/layout/FooterV2.tsx` — dark section footer
- `components/sections/` — page section components (heroes, cards, forms, etc.)
- `lib/design-tokens.ts` — new color/spacing/typography tokens
- `lib/animations.ts` — framer-motion presets + scroll-reveal utilities
- `tailwind.config.ts` — updated with shadcn HSL variables
- `app/globals.css` — shadcn CSS custom properties + Korean typography

### Definition of Done
- [ ] `npm run build` completes with zero errors
- [ ] All 8 pages render correctly on mobile (375px) and desktop (1440px)
- [ ] shadcn components properly themed with #FFCA0D/#2D2D2A/#FAFAFA palette
- [ ] Product dual navigation works (purpose-based + size-based switching)
- [ ] KakaoTalk CTA, AI chatbot, quote builder, tracking all functional
- [ ] Admin CMS at `/admin` completely unaffected
- [ ] No English UI text — all Korean UX terms
- [ ] No payment/할부/리스/deposit UI anywhere
- [ ] `npx vitest run` — all tests pass

### Must Have
- shadcn/ui @2.3.0 components as the design foundation
- HSL CSS variables for all theme colors (Tailwind v3 compatible)
- Mobile-first responsive design (375px → 1440px)
- "시스템건축" brand language throughout (never "모듈러건축")
- Dual product navigation: 용도별 (purpose) + 사이즈별 (size)
- 체류형 쉼터 section within 이동식주택 products page
- Conversion CTAs: "상담 신청", "카카오톡 상담", "견적 받기"
- Korean typography optimization (keep-all, break-word, line-height 1.8)
- Cinematic restraint design language (90% neutral, 10% yellow accent)
- Full-bleed hero sections with `min-h-screen`

### Must NOT Have (Guardrails)
- ❌ English UI text like "Reserve", "Order", "Subscribe" — use Korean equivalents
- ❌ Monthly payments, 할부, 리스, 월 납입금 — total price only
- ❌ Online payment, 계약금, 예약 deposit flows
- ❌ Any modifications to `app/admin/` or `components/admin/`
- ❌ Any changes to Supabase schema or `types/supabase.ts`
- ❌ shadcn@latest or Tailwind v4 patterns (OKLCH, etc.)
- ❌ WebAR feature (dropped)
- ❌ "모듈러건축" terminology — replaced by "시스템건축"
- ❌ Over-abstraction or premature generalization (keep components concrete)
- ❌ Excessive JSDoc/comments — let code speak
- ❌ `as any` or `@ts-ignore` — proper typing required

---

## Verification Strategy

> **ZERO HUMAN INTERVENTION** — ALL verification is agent-executed. No exceptions.

### Test Decision
- **Infrastructure exists**: YES (vitest + @testing-library/react)
- **Automated tests**: Tests-after (Wave 5 includes dedicated test task)
- **Framework**: vitest (already configured)
- **Strategy**: Build first, test core interactions after. Each task has agent-executed QA scenarios.

### QA Policy
Every task MUST include agent-executed QA scenarios.
Evidence saved to `.sisyphus/evidence/task-{N}-{scenario-slug}.{ext}`.

- **Frontend/UI**: Use Playwright (playwright skill) — Navigate, interact, assert DOM, screenshot
- **TUI/CLI**: Use interactive_bash (tmux) — Run command, send keystrokes, validate output
- **API/Backend**: Use Bash (curl) — Send requests, assert status + response fields
- **Library/Module**: Use Bash (bun/node REPL) — Import, call functions, compare output

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Foundation — all independent, MAX PARALLEL):
├── T1: Clean + shadcn init + deps [quick]
├── T2: Design tokens + Tailwind config [quick]
├── T3: Korean typography + globals.css [quick]
├── T4: shadcn components batch install [quick]
├── T5: Shared types + COMPANY constants update [quick]
├── T6: Animation system (framer-motion presets) [quick]
└── T7: KakaoTalk provider setup [quick]

Wave 2 (Layout Shell — depends on Wave 1):
├── T8: HeaderV2 — shadcn NavigationMenu + Sheet (depends: T2, T4, T5) [visual-engineering]
├── T9: FooterV2 — dark section (depends: T2, T4, T5) [visual-engineering]
├── T10: Redesign layout wrapper (depends: T8, T9, T6) [quick]
├── T11: FloatingKakaoCTA rebuild (depends: T4, T7) [quick]
└── T12: AIChatbot rebuild with shadcn (depends: T4, T2) [unspecified-high]

Wave 3 (Core Pages Part 1 — depends on T10):
├── T13: Homepage (depends: T10, T6) [visual-engineering]
├── T14: 시스템건축 소개 page (depends: T10, T6) [visual-engineering]
├── T15: 제품(이동식주택) — dual navigation (depends: T10, T5) [deep]
└── T16: 현장건축(시공사례) — portfolio + process (depends: T10, T5) [visual-engineering]

Wave 4 (Remaining Pages — depends on T10, partial T15):
├── T17: 비스포크 + 견적 빌더 (depends: T10, T5) [deep]
├── T18: 솔루션 page (depends: T10, T5) [visual-engineering]
├── T19: 회사소개 page (depends: T10, T6) [visual-engineering]
├── T20: 고객지원 — FAQ + 문의 (depends: T10, T5) [unspecified-high]
└── T21: 시공 추적 page (depends: T10) [unspecified-high]

Wave 5 (Polish & Features — depends on all pages):
├── T22: Easter eggs (Konami, etc.) (depends: T13) [quick]
├── T23: SEO + metadata all pages (depends: T13-T21) [quick]
├── T24: Dynamic imports + performance (depends: T13-T21) [quick]
├── T25: Mobile QA pass all pages (depends: T13-T21) [unspecified-high]
├── T26: Copy review — 시스템건축 language audit (depends: T13-T21) [writing]
└── T27: Vitest tests for key components (depends: T13-T21) [unspecified-high]

Wave FINAL (Verification — after ALL tasks):
├── F1: Plan compliance audit [oracle]
├── F2: Code quality review [unspecified-high]
├── F3: Real manual QA — Playwright [unspecified-high]
└── F4: Scope fidelity check [deep]

Critical Path: T1 → T4 → T8 → T10 → T13 → T15 → T25 → F1-F4
Parallel Speedup: ~65% faster than sequential
Max Concurrent: 7 (Wave 1)
```

### Dependency Matrix

| Task | Depends On | Blocks | Wave |
|------|-----------|--------|------|
| T1 | — | T2-T7 | 1 |
| T2 | T1 | T8, T9, T12, T13-T21 | 1 |
| T3 | T1 | T10 | 1 |
| T4 | T1 | T8, T9, T11, T12 | 1 |
| T5 | — | T8, T9, T15-T21 | 1 |
| T6 | — | T10, T13, T14, T19 | 1 |
| T7 | — | T11 | 1 |
| T8 | T2, T4, T5 | T10 | 2 |
| T9 | T2, T4, T5 | T10 | 2 |
| T10 | T8, T9, T6, T3 | T13-T21 | 2 |
| T11 | T4, T7 | — | 2 |
| T12 | T4, T2 | — | 2 |
| T13 | T10, T6 | T22, T23-T27 | 3 |
| T14 | T10, T6 | T23-T27 | 3 |
| T15 | T10, T5 | T17, T23-T27 | 3 |
| T16 | T10, T5 | T23-T27 | 3 |
| T17 | T10, T5 | T23-T27 | 4 |
| T18 | T10, T5 | T23-T27 | 4 |
| T19 | T10, T6 | T23-T27 | 4 |
| T20 | T10, T5 | T23-T27 | 4 |
| T21 | T10 | T23-T27 | 4 |
| T22 | T13 | — | 5 |
| T23 | T13-T21 | — | 5 |
| T24 | T13-T21 | — | 5 |
| T25 | T13-T21 | — | 5 |
| T26 | T13-T21 | — | 5 |
| T27 | T13-T21 | — | 5 |
| F1-F4 | T22-T27 | — | FINAL |

### Agent Dispatch Summary

| Wave | Tasks | Agents |
|------|-------|--------|
| 1 | 7 | T1-T7 → `quick` |
| 2 | 5 | T8-T9 → `visual-engineering`, T10-T11 → `quick`, T12 → `unspecified-high` |
| 3 | 4 | T13-T14,T16 → `visual-engineering`, T15 → `deep` |
| 4 | 5 | T17 → `deep`, T18-T19 → `visual-engineering`, T20-T21 → `unspecified-high` |
| 5 | 6 | T22-T24 → `quick`, T25 → `unspecified-high`, T26 → `writing`, T27 → `unspecified-high` |
| FINAL | 4 | F1 → `oracle`, F2-F3 → `unspecified-high`, F4 → `deep` |

---

## TODOs

- [ ] 1. Clean Redesign Directory + shadcn@2.3.0 Init + Install Dependencies

  **What to do**:
  - Delete ALL files inside `app/(redesign)/` (13 subdirectories + layout.tsx)
  - Delete V1-specific component files that will be rebuilt: `components/sections/FullscreenHero.tsx`, `components/sections/ModelComparison.tsx`, `components/sections/TrustBadges.tsx`, `components/sections/BeforeAfterStories.tsx`, `components/sections/ScrollStorySection.tsx`, `components/ui/ScrollReveal.tsx`, `components/ui/CountUp.tsx`, `components/ui/ConsultationModal.tsx`
  - Delete V1-specific lib files: `lib/design-tokens.ts`, `lib/animations.ts`, `lib/scroll-storytelling.ts`, `lib/witty-copy.ts`
  - Run `pnpm dlx shadcn@2.3.0 init` — choose: TypeScript, style "default", base color "slate", CSS variables YES, tailwind.config.ts path, components alias `@/components`, utils alias `@/lib/utils`
  - Install additional deps: `npm install tailwindcss-animate class-variance-authority`
  - Verify `components.json` was created with correct paths
  - Verify `lib/utils.ts` has `cn()` function (shadcn init creates/updates this)
  - **CRITICAL**: Do NOT use `shadcn@latest` — it targets Tailwind v4 and will break the project

  **Must NOT do**:
  - Delete anything in `app/admin/`, `components/admin/`
  - Delete `lib/constants.ts`, `lib/supabase.ts`, `lib/products.ts`, `lib/kakao.ts`, `lib/easter-eggs.ts`, `lib/tracking-realtime.ts`, `lib/a11y.ts`, `lib/utils.ts`
  - Delete `types/supabase.ts`, `app/actions/`
  - Modify Supabase schema
  - Upgrade Tailwind to v4

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: File deletions and CLI commands — straightforward, no design decisions
  - **Skills**: []
    - No special skills needed for file ops and package installation
  - **Skills Evaluated but Omitted**:
    - `playwright`: No browser verification needed for init

  **Parallelization**:
  - **Can Run In Parallel**: NO — Must run FIRST (other Wave 1 tasks depend on shadcn init)
  - **Parallel Group**: Wave 1 — runs before T2-T7
  - **Blocks**: T2, T3, T4, T5, T6, T7
  - **Blocked By**: None

  **References**:

  **Pattern References**:
  - `app/(redesign)/` — Directory to delete entirely (13 subdirs + layout.tsx). Contains V1 redesign code being replaced
  - `lib/utils.ts` — Existing cn() utility. shadcn init may update this — verify it still works after init

  **API/Type References**:
  - `package.json` — Current deps list. New deps (tailwindcss-animate, class-variance-authority) must be added without removing existing ones

  **External References**:
  - shadcn@2.3.0 init: GitHub Discussion #6772 confirms @2.3.0 is required for Tailwind v3 compatibility
  - shadcn init docs: https://ui.shadcn.com/docs/installation/next

  **WHY Each Reference Matters**:
  - `app/(redesign)/` is the entire V1 redesign — must be wiped clean for V2 rebuild
  - `lib/utils.ts` contains cn() which shadcn also uses — init should merge, not break
  - Package.json deps must be preserved (Supabase, framer-motion, etc.) while adding new ones

  **Acceptance Criteria**:
  - [ ] `app/(redesign)/` directory is empty (all V1 files deleted)
  - [ ] V1-specific component and lib files deleted
  - [ ] `components.json` exists with correct aliased paths
  - [ ] `lib/utils.ts` has cn() function
  - [ ] `tailwindcss-animate` and `class-variance-authority` in package.json dependencies
  - [ ] `npm run build` still succeeds (remaining old pages unaffected)

  **QA Scenarios**:

  ```
  Scenario: shadcn init successful
    Tool: Bash
    Preconditions: On redesign branch, npm dependencies installed
    Steps:
      1. Run `ls app/(redesign)/` — should show empty or minimal files
      2. Run `cat components.json | head -20` — verify baseColor, style, aliases
      3. Run `grep "cn(" lib/utils.ts` — verify cn() function exists
      4. Run `npm run build` — verify build succeeds
    Expected Result: components.json exists with correct config, cn() works, build passes
    Failure Indicators: components.json missing, cn() not found, build fails
    Evidence: .sisyphus/evidence/task-1-shadcn-init.txt

  Scenario: V1 files properly deleted
    Tool: Bash
    Preconditions: After deletion commands
    Steps:
      1. Run `find app/(redesign) -type f 2>/dev/null | wc -l` — should be 0
      2. Run `ls components/sections/FullscreenHero.tsx 2>&1` — should show "No such file"
      3. Run `ls lib/design-tokens.ts 2>&1` — should show "No such file"
      4. Run `ls app/admin/page.tsx` — should STILL exist (not deleted)
      5. Run `ls components/admin/` — should STILL have files
    Expected Result: V1 files gone, admin files untouched
    Failure Indicators: V1 files still exist, admin files deleted
    Evidence: .sisyphus/evidence/task-1-cleanup-verify.txt
  ```

  **Commit**: YES (groups with Wave 1)
  - Message: `feat(design-system): shadcn init + design tokens + typography + animation system`
  - Files: `components.json`, `package.json`, `app/(redesign)/` deletions
  - Pre-commit: `npm run build`

- [ ] 2. Design Tokens + Tailwind Config with shadcn HSL Variables

  **What to do**:
  - Update `tailwind.config.ts` to use shadcn CSS variable approach with HSL values
  - Add `tailwindcss-animate` to plugins array
  - Configure the shadcn color scheme using HSL format:
    - `--background: 0 0% 98%` (#FAFAFA)
    - `--foreground: 60 5.3% 17.1%` (#2D2D2A)
    - `--primary: 46 100% 52.5%` (#FFCA0D — accent yellow)
    - `--primary-foreground: 60 5.3% 17.1%` (#2D2D2A — dark text on yellow)
    - `--secondary: 0 0% 96.1%` (near-white)
    - `--secondary-foreground: 60 5.3% 17.1%` (#2D2D2A)
    - `--accent: 46 100% 52.5%` (#FFCA0D)
    - `--accent-foreground: 60 5.3% 17.1%` (#2D2D2A)
    - `--muted: 0 0% 93%` (soft gray)
    - `--muted-foreground: 0 0% 45%`
    - `--card: 0 0% 100%`
    - `--card-foreground: 60 5.3% 17.1%`
    - `--destructive: 0 84.2% 60.2%`
    - `--destructive-foreground: 0 0% 98%`
    - `--border: 0 0% 89.8%`
    - `--input: 0 0% 89.8%`
    - `--ring: 46 100% 52.5%` (#FFCA0D)
    - `--radius: 0.5rem`
  - Create dark mode variant (`.dark` class) with inverted values:
    - `--background: 60 5.3% 17.1%` (#2D2D2A)
    - `--foreground: 0 0% 98%` (#FAFAFA)
  - Create `lib/design-tokens.ts` with exported constants:
    - Color palette (hex, HSL, semantic names)
    - Typography scale (Display: 7xl-8xl, H1: 5xl-6xl, H2: 3xl-4xl, H3: 2xl-3xl, Body: base-lg, Caption: sm)
    - Spacing scale (section padding, container max-width, card gaps)
    - Breakpoints documentation (mobile-first: sm:640 md:768 lg:1024 xl:1280 2xl:1440)
    - Z-index layers (header: 50, modal: 100, toast: 200, overlay: 150)
  - Keep existing colors for backward compatibility (old pages still use primary.DEFAULT)

  **Must NOT do**:
  - Remove existing color definitions needed by old pages
  - Use OKLCH format (Tailwind v4 only)
  - Use Tailwind v4 CSS import syntax

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Config file updates with known values — no design decisions needed
  - **Skills**: []
  - **Skills Evaluated but Omitted**:
    - `frontend-ui-ux`: No visual decisions, just config mapping

  **Parallelization**:
  - **Can Run In Parallel**: YES (after T1)
  - **Parallel Group**: Wave 1 (with T3-T7, all after T1)
  - **Blocks**: T8, T9, T12, T13-T21
  - **Blocked By**: T1 (needs shadcn init complete for components.json)

  **References**:

  **Pattern References**:
  - `tailwind.config.ts:1-66` — Current config to extend. Keep existing `colors.primary`, `fontFamily`, `maxWidth`, `spacing`, `animation`, `keyframes` — add shadcn theme on top
  - `components.json` — Created by T1, defines component style and CSS variables flag

  **API/Type References**:
  - `types/supabase.ts` — NOT modified, but Product types inform the design tokens (e.g., size_category labels)

  **External References**:
  - shadcn theming: https://ui.shadcn.com/docs/theming — HSL CSS variables documentation
  - Tailwind v3 dark mode: class-based (`darkMode: 'class'`)

  **WHY Each Reference Matters**:
  - `tailwind.config.ts` is THE file being modified — must understand existing structure to extend safely
  - HSL values are critical — wrong format breaks all shadcn component styling

  **Acceptance Criteria**:
  - [ ] `tailwind.config.ts` includes `tailwindcss-animate` plugin
  - [ ] `tailwind.config.ts` extends theme with shadcn CSS variable colors
  - [ ] `lib/design-tokens.ts` exports COLORS, TYPOGRAPHY, SPACING, Z_INDEX constants
  - [ ] Both old colors (primary.DEFAULT: #FEBD16) and new shadcn variables coexist
  - [ ] `npm run build` passes with updated config

  **QA Scenarios**:

  ```
  Scenario: Tailwind config validates
    Tool: Bash
    Preconditions: T1 complete, shadcn initialized
    Steps:
      1. Run `npx tailwindcss --help` — verify Tailwind CLI works
      2. Run `npm run build` — full build with new config
      3. Run `grep "tailwindcss-animate" tailwind.config.ts` — verify plugin added
      4. Run `grep "hsl" tailwind.config.ts` — verify HSL variable references
    Expected Result: Build passes, plugin present, HSL variables configured
    Failure Indicators: Build fails with config errors, plugin missing
    Evidence: .sisyphus/evidence/task-2-tailwind-config.txt

  Scenario: Design tokens export correctly
    Tool: Bash
    Preconditions: lib/design-tokens.ts created
    Steps:
      1. Run `npx tsx -e "import { COLORS } from './lib/design-tokens'; console.log(JSON.stringify(COLORS))"` — verify exports
      2. Verify COLORS.accent.hex === '#FFCA0D'
      3. Verify COLORS.primary.hex === '#2D2D2A'
    Expected Result: All color values match specification
    Failure Indicators: Import error, wrong color values
    Evidence: .sisyphus/evidence/task-2-design-tokens.txt
  ```

  **Commit**: YES (groups with Wave 1)
  - Message: `feat(design-system): shadcn init + design tokens + typography + animation system`
  - Files: `tailwind.config.ts`, `lib/design-tokens.ts`
  - Pre-commit: `npm run build`

- [ ] 3. Korean Typography + globals.css shadcn Setup

  **What to do**:
  - Update `app/globals.css` with shadcn CSS custom properties in `:root` and `.dark` selectors
  - Add all HSL variables from T2's color scheme to `:root`
  - Add Korean typography optimizations:
    ```css
    :lang(ko), html[lang="ko"], body {
      word-break: keep-all;
      overflow-wrap: break-word;
      line-height: 1.8;
    }
    ```
  - Add shadcn base layer styles:
    ```css
    @layer base {
      * { @apply border-border; }
      body { @apply bg-background text-foreground; }
    }
    ```
  - Define typography utility classes:
    - `.text-display` — text-7xl md:text-8xl font-bold tracking-tight
    - `.text-h1` — text-4xl md:text-5xl lg:text-6xl font-bold
    - `.text-h2` — text-2xl md:text-3xl lg:text-4xl font-semibold
    - `.text-h3` — text-xl md:text-2xl lg:text-3xl font-semibold
    - `.text-body-lg` — text-base md:text-lg leading-relaxed
    - `.text-caption` — text-sm text-muted-foreground
  - Add smooth scroll behavior: `html { scroll-behavior: smooth; }`
  - Keep existing Tailwind directives (@tailwind base/components/utilities)
  - Ensure existing global styles for old pages are preserved

  **Must NOT do**:
  - Remove existing @tailwind directives
  - Use @import syntax (Tailwind v4)
  - Break styles for old pages (/, /products, /admin, etc.)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: CSS file with known values — no design decisions
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (after T1, parallel with T2/T4-T7)
  - **Parallel Group**: Wave 1
  - **Blocks**: T10 (layout needs global styles)
  - **Blocked By**: T1

  **References**:

  **Pattern References**:
  - `app/globals.css` — Current global styles. MUST preserve existing @tailwind directives and any styles used by old pages

  **External References**:
  - shadcn CSS variables: https://ui.shadcn.com/docs/theming — exact `:root` structure
  - Korean web typography: `word-break: keep-all` prevents mid-syllable breaks in Korean

  **WHY Each Reference Matters**:
  - `globals.css` is loaded for ALL pages — changes must not break old pages
  - Korean typography is critical for readability — without `keep-all`, Korean text breaks mid-syllable

  **Acceptance Criteria**:
  - [ ] `:root` has all shadcn HSL variables defined
  - [ ] `.dark` class has inverted color variables
  - [ ] Korean typography rules applied to body/`:lang(ko)`
  - [ ] Typography utility classes defined (.text-display through .text-caption)
  - [ ] `npm run build` passes
  - [ ] Old pages (`/`, `/products`, `/admin`) still render correctly

  **QA Scenarios**:

  ```
  Scenario: CSS variables present in globals
    Tool: Bash
    Preconditions: globals.css updated
    Steps:
      1. Run `grep -- "--background:" app/globals.css` — verify background variable
      2. Run `grep -- "--primary:" app/globals.css` — verify primary variable
      3. Run `grep -- "--accent:" app/globals.css` — verify accent variable
      4. Run `grep "keep-all" app/globals.css` — verify Korean typography
      5. Run `npm run build` — full build test
    Expected Result: All CSS variables present, Korean typography rules present, build passes
    Failure Indicators: Variables missing, build fails
    Evidence: .sisyphus/evidence/task-3-globals-css.txt

  Scenario: Old pages not broken
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running on localhost:3000
    Steps:
      1. Navigate to `http://localhost:3000/` — old homepage
      2. Screenshot at 1440px width
      3. Navigate to `http://localhost:3000/admin` — admin login
      4. Screenshot at 1440px width
      5. Verify no visual regressions (text visible, colors correct)
    Expected Result: Old pages render without CSS breakage
    Failure Indicators: White text on white bg, broken layout, missing styles
    Evidence: .sisyphus/evidence/task-3-old-pages-check.png
  ```

  **Commit**: YES (groups with Wave 1)
  - Message: `feat(design-system): shadcn init + design tokens + typography + animation system`
  - Files: `app/globals.css`
  - Pre-commit: `npm run build`

- [ ] 4. shadcn Components Batch Install

  **What to do**:
  - Install all 16 required shadcn components in one batch command:
    ```bash
    pnpm dlx shadcn@2.3.0 add button card dialog accordion sheet form input textarea select navigation-menu carousel badge separator tabs skeleton sonner
    ```
  - Verify each component was installed to `components/ui/` with correct imports
  - Verify component files use CSS variable-based styling (not hardcoded colors)
  - Test that existing `components/ui/` files (if any survived T1) are not overwritten incorrectly
  - **CRITICAL**: Use `shadcn@2.3.0`, NOT `shadcn@latest`

  **Must NOT do**:
  - Use `shadcn@latest` (targets Tailwind v4)
  - Overwrite custom components that weren't deleted in T1

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Single CLI command + verification
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (after T1, parallel with T2/T3/T5-T7)
  - **Parallel Group**: Wave 1
  - **Blocks**: T8, T9, T11, T12
  - **Blocked By**: T1 (needs components.json from shadcn init)

  **References**:

  **Pattern References**:
  - `components.json` — Created by T1. Tells shadcn where to put components and which style to use
  - `lib/utils.ts` — shadcn components import `cn()` from here

  **External References**:
  - shadcn CLI docs: https://ui.shadcn.com/docs/cli — `add` command reference
  - Component list: button, card, dialog, accordion, sheet, form, input, textarea, select, navigation-menu, carousel, badge, separator, tabs, skeleton, sonner

  **WHY Each Reference Matters**:
  - `components.json` must exist before `add` command works — T1 dependency
  - Each component serves a specific page: NavigationMenu→Header, Sheet→MobileNav, Dialog→Modals, Accordion→FAQ, Carousel→Hero/Products, Form→Quote/Inquiry, Skeleton→Loading states, Sonner→Notifications

  **Acceptance Criteria**:
  - [ ] 16 component files exist in `components/ui/`
  - [ ] Each component imports `cn` from `@/lib/utils`
  - [ ] Components use CSS variables (hsl(var(--...))) not hardcoded colors
  - [ ] `npm run build` passes with all components

  **QA Scenarios**:

  ```
  Scenario: All 16 components installed
    Tool: Bash
    Preconditions: T1 complete, components.json exists
    Steps:
      1. Run `ls components/ui/button.tsx components/ui/card.tsx components/ui/dialog.tsx components/ui/accordion.tsx components/ui/sheet.tsx components/ui/form.tsx components/ui/input.tsx components/ui/textarea.tsx components/ui/select.tsx components/ui/navigation-menu.tsx components/ui/carousel.tsx components/ui/badge.tsx components/ui/separator.tsx components/ui/tabs.tsx components/ui/skeleton.tsx components/ui/sonner.tsx` — all should exist
      2. Run `grep "hsl(var(--" components/ui/button.tsx` — verify CSS variable usage
      3. Run `npm run build` — verify build passes
    Expected Result: All 16 files present, CSS variable-based styling, build passes
    Failure Indicators: Missing files, hardcoded colors, build errors
    Evidence: .sisyphus/evidence/task-4-shadcn-components.txt
  ```

  **Commit**: YES (groups with Wave 1)
  - Message: `feat(design-system): shadcn init + design tokens + typography + animation system`
  - Files: `components/ui/*.tsx` (16 new files)
  - Pre-commit: `npm run build`

- [ ] 5. Shared Types + COMPANY Constants Update + Product Utilities

  **What to do**:
  - Create `lib/types.ts` with V2-specific types:
    - `SizeCategory = 'S' | 'M' | 'L' | 'XL'` (housing products only, excludes SOLUTION/DESIGN)
    - `PurposeCategory` — enum for purpose-based navigation:
      - `FARMHOUSE_SHELTER` ("농막·체류형 쉼터", maps to S, M)
      - `SECOND_HOUSE` ("세컨하우스·주말주택", maps to M, L)
      - `PRIMARY_HOME` ("본 주거·단독주택", maps to L, XL)
      - `COMMERCIAL` ("상업·사무", maps to BESPOKE)
    - `PURPOSE_TO_SIZE_MAP: Record<PurposeCategory, SizeCategory[]>` — mapping between purpose and size categories
    - `NavItem` — type for header navigation items
    - `PageMeta` — type for SEO metadata per page
  - Create `lib/navigation.ts` with V2 navigation structure:
    - 8 pages: 홈, 시스템건축, 제품(이동식주택), 시공사례(현장건축), 비스포크+견적, 솔루션, 회사소개, 고객지원
    - Each item: { label, href, description?, children? }
  - Update `lib/constants.ts` — add V2 constants WITHOUT removing existing ones:
    - `SYSTEM_CONSTRUCTION` object with brand messaging
    - `MOBILE_HOUSING` and `ONSITE_CONSTRUCTION` sub-brands
    - `CONVERSION_CTAS = ['상담 신청', '카카오톡 상담', '견적 받기']`
  - Do NOT modify `types/supabase.ts` or `lib/products.ts`

  **Must NOT do**:
  - Modify `types/supabase.ts`
  - Modify `lib/products.ts` (product utilities stay as-is, V2 pages will use them)
  - Remove existing COMPANY constants

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Type definitions and constant objects — straightforward TypeScript
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (independent of T1-T4, can start immediately)
  - **Parallel Group**: Wave 1 (parallel with T1-T4, T6, T7)
  - **Blocks**: T8, T9, T15-T21
  - **Blocked By**: None

  **References**:

  **Pattern References**:
  - `lib/constants.ts:1-15` — Existing COMPANY object. Add V2 constants alongside, do NOT replace
  - `types/supabase.ts:16-17` — `sub_category: 'Private' | 'Public' | null` and `size_category: 'S' | 'M' | 'L' | 'XL' | 'SOLUTION' | 'DESIGN'` — V2 types must align with these DB types
  - `lib/products.ts:54-87` — `buildSidebarStructure()` shows existing category logic. V2 will use this for size-based nav

  **WHY Each Reference Matters**:
  - COMPANY object: V2 constants must coexist (old pages still use COMPANY)
  - Product types: V2's PurposeCategory → SizeCategory mapping MUST align with DB's size_category enum
  - buildSidebarStructure: Understanding existing product organization helps design V2's dual navigation types

  **Acceptance Criteria**:
  - [ ] `lib/types.ts` exports SizeCategory, PurposeCategory, PURPOSE_TO_SIZE_MAP, NavItem, PageMeta
  - [ ] `lib/navigation.ts` exports V2 navigation with 8 pages
  - [ ] `lib/constants.ts` has COMPANY (unchanged) + new V2 brand constants
  - [ ] `npm run build` passes
  - [ ] `types/supabase.ts` and `lib/products.ts` are completely unmodified

  **QA Scenarios**:

  ```
  Scenario: Types compile correctly
    Tool: Bash
    Preconditions: Files created
    Steps:
      1. Run `npx tsc --noEmit lib/types.ts` — verify type-check passes
      2. Run `npx tsx -e "import { PURPOSE_TO_SIZE_MAP } from './lib/types'; console.log(JSON.stringify(PURPOSE_TO_SIZE_MAP))"` — verify mapping
      3. Run `git diff types/supabase.ts` — should show NO changes
      4. Run `git diff lib/products.ts` — should show NO changes
    Expected Result: Types compile, mapping correct, protected files unchanged
    Failure Indicators: Type errors, wrong mapping, protected files modified
    Evidence: .sisyphus/evidence/task-5-types.txt
  ```

  **Commit**: YES (groups with Wave 1)
  - Message: `feat(design-system): shadcn init + design tokens + typography + animation system`
  - Files: `lib/types.ts`, `lib/navigation.ts`, `lib/constants.ts`
  - Pre-commit: `npm run build`

- [ ] 6. Animation System — Framer Motion Presets + Scroll Reveal

  **What to do**:
  - Create `lib/animations.ts` with reusable framer-motion presets:
    - `fadeUp` — opacity 0→1, y 30→0 (for scroll reveal)
    - `fadeIn` — opacity 0→1 (for general fade)
    - `slideInLeft` / `slideInRight` — for horizontal reveals
    - `scaleIn` — scale 0.9→1 (for cards/badges)
    - `staggerContainer` — orchestrates children stagger (staggerChildren: 0.1)
    - `staggerItem` — individual item in stagger
    - `pageTransition` — exit/enter for page route changes
  - Create `components/ui/ScrollReveal.tsx`:
    - Wrapper component that reveals children on scroll using `useInView` from framer-motion
    - Props: `direction` ('up'|'down'|'left'|'right'), `delay`, `duration`, `threshold`
    - Uses `motion.div` with `whileInView` and `viewport={{ once: true, amount: 0.3 }}`
  - Create `components/ui/PageTransition.tsx`:
    - Uses `AnimatePresence` + `motion.div` for route transitions
    - Subtle fade + slight Y movement (not heavy animations)
  - All animations should respect `prefers-reduced-motion` — wrap in `useReducedMotion()` check

  **Must NOT do**:
  - Install additional animation libraries (framer-motion already installed)
  - Create heavy/distracting animations — subtlety is key
  - Forget reduced motion accessibility check

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Utility file + 2 small components with known framer-motion patterns
  - **Skills**: []
  - **Skills Evaluated but Omitted**:
    - `frontend-ui-ux`: Animation presets are utility code, not visual design

  **Parallelization**:
  - **Can Run In Parallel**: YES (independent — framer-motion already installed)
  - **Parallel Group**: Wave 1 (parallel with T1-T5, T7)
  - **Blocks**: T10, T13, T14, T19
  - **Blocked By**: None

  **References**:

  **Pattern References**:
  - `package.json:29` — `framer-motion: ^11.15.0` already installed
  - `components/sections/HeroCarouselClientComponent.tsx` — V1 used framer-motion for carousel animations. Similar patterns but rebuilt

  **External References**:
  - framer-motion useInView: https://www.framer.com/motion/use-in-view/
  - framer-motion AnimatePresence: https://www.framer.com/motion/animate-presence/
  - prefers-reduced-motion: https://www.framer.com/motion/use-reduced-motion/

  **WHY Each Reference Matters**:
  - framer-motion is already a dependency — no install needed, but must use v11 API
  - useInView replaces IntersectionObserver for scroll reveal — simpler, more reliable

  **Acceptance Criteria**:
  - [ ] `lib/animations.ts` exports fadeUp, fadeIn, slideInLeft, slideInRight, scaleIn, staggerContainer, staggerItem, pageTransition
  - [ ] `components/ui/ScrollReveal.tsx` renders with `whileInView` animation
  - [ ] `components/ui/PageTransition.tsx` wraps children with AnimatePresence
  - [ ] Reduced motion check implemented
  - [ ] `npm run build` passes

  **QA Scenarios**:

  ```
  Scenario: Animation presets export correctly
    Tool: Bash
    Preconditions: lib/animations.ts created
    Steps:
      1. Run `npx tsx -e "import * as anims from './lib/animations'; console.log(Object.keys(anims))"` — verify all exports
      2. Verify at least 8 named exports
      3. Run `npm run build` — verify components compile
    Expected Result: All animation presets exported, build passes
    Failure Indicators: Import errors, missing exports
    Evidence: .sisyphus/evidence/task-6-animations.txt
  ```

  **Commit**: YES (groups with Wave 1)
  - Message: `feat(design-system): shadcn init + design tokens + typography + animation system`
  - Files: `lib/animations.ts`, `components/ui/ScrollReveal.tsx`, `components/ui/PageTransition.tsx`
  - Pre-commit: `npm run build`

- [ ] 7. KakaoTalk Provider Setup

  **What to do**:
  - Verify `components/providers/KakaoProvider.tsx` still exists and works (it was kept from V1)
  - Verify `lib/kakao.ts` still exists with Kakao SDK initialization
  - If either was accidentally deleted in T1, recreate from the same pattern
  - Ensure KakaoProvider can be used in the V2 layout without modification
  - No new code needed if files exist — this task is a verification + minor adjustment task

  **Must NOT do**:
  - Modify Kakao SDK initialization logic
  - Change Kakao channel ID or configuration

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Verification task — check file existence, maybe minor path fix
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (independent)
  - **Parallel Group**: Wave 1 (parallel with T1-T6)
  - **Blocks**: T11 (FloatingKakaoCTA needs provider)
  - **Blocked By**: None

  **References**:

  **Pattern References**:
  - `components/providers/KakaoProvider.tsx` — Existing provider, verify it survived T1 cleanup
  - `lib/kakao.ts` — Kakao SDK helper functions

  **WHY Each Reference Matters**:
  - These files should NOT have been deleted in T1, but verify just in case

  **Acceptance Criteria**:
  - [ ] `components/providers/KakaoProvider.tsx` exists and exports a provider component
  - [ ] `lib/kakao.ts` exists and exports Kakao utility functions
  - [ ] No TypeScript errors in either file
  - [ ] `npm run build` passes

  **QA Scenarios**:

  ```
  Scenario: Kakao files intact
    Tool: Bash
    Preconditions: After T1 cleanup
    Steps:
      1. Run `ls components/providers/KakaoProvider.tsx` — should exist
      2. Run `ls lib/kakao.ts` — should exist
      3. Run `npx tsc --noEmit` — verify no type errors
    Expected Result: Both files exist, no type errors
    Failure Indicators: Files missing, type errors
    Evidence: .sisyphus/evidence/task-7-kakao-verify.txt
  ```

  **Commit**: YES (groups with Wave 1 if changes made)
  - Message: `feat(design-system): shadcn init + design tokens + typography + animation system`
  - Files: `components/providers/KakaoProvider.tsx`, `lib/kakao.ts` (if modified)
  - Pre-commit: `npm run build`

- [ ] 8. HeaderV2 — shadcn NavigationMenu + Sheet Mobile Drawer

  **What to do**:
  - Rebuild `components/layout/HeaderV2.tsx` from scratch using:
    - `NavigationMenu` (shadcn) for desktop nav — 8 main items from `lib/navigation.ts`
    - `Sheet` (shadcn) for mobile hamburger drawer — slides from right
    - Logo: "weet:)" text or image, links to `/home`
  - Desktop layout (≥1024px):
    - Fixed top, z-50, bg-background/80 backdrop-blur-md
    - Logo left, NavigationMenu center, CTA button right ("상담 신청" or "견적 받기")
    - Height: ~80px
    - Active page indicator: yellow underline (#FFCA0D)
    - Scroll behavior: shrinks header slightly on scroll (80px → 64px)
  - Mobile layout (<1024px):
    - Fixed top, z-50, bg-background/90 backdrop-blur-md
    - Logo left, hamburger icon right (lucide Menu icon)
    - Sheet opens from right with full nav items
    - Each nav item: large touch target (min 48px height)
    - Close button inside Sheet
    - Active page highlighted with accent color
  - Use `usePathname()` from next/navigation to highlight current page
  - Use `useMotionValueEvent` or scroll listener for header shrink effect
  - Mobile-first: style base as mobile, add `lg:` variants for desktop

  **Must NOT do**:
  - Use mega-menu pattern (too complex, not mobile-friendly)
  - Hard-code navigation items — import from `lib/navigation.ts`
  - Make header taller than 80px (wastes mobile viewport)
  - Use English text for nav items

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Complex responsive component with scroll behavior, animations, and shadcn integration
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Header is the primary UI interaction point — needs polished UX
  - **Skills Evaluated but Omitted**:
    - `playwright`: Not needed during build, QA is agent-executed separately

  **Parallelization**:
  - **Can Run In Parallel**: YES (with T9, T11, T12)
  - **Parallel Group**: Wave 2
  - **Blocks**: T10 (layout needs Header)
  - **Blocked By**: T2 (design tokens), T4 (shadcn components), T5 (navigation data)

  **References**:

  **Pattern References**:
  - `components/layout/Header.tsx` — V1 Header with mega-menu. V2 simplifies to NavigationMenu. Study the navigation structure (lines 8-72) for menu item patterns, but rebuild from scratch
  - `lib/navigation.ts` — Created in T5, provides nav items array
  - `lib/design-tokens.ts` — Created in T2, provides Z_INDEX.header (50)

  **API/Type References**:
  - `lib/types.ts:NavItem` — Created in T5, type for navigation items

  **External References**:
  - shadcn NavigationMenu: https://ui.shadcn.com/docs/components/navigation-menu
  - shadcn Sheet: https://ui.shadcn.com/docs/components/sheet
  - Next.js usePathname: https://nextjs.org/docs/app/api-reference/functions/use-pathname

  **WHY Each Reference Matters**:
  - V1 Header shows existing nav structure — learn from it but don't copy the mega-menu pattern
  - NavigationMenu is shadcn's accessible nav solution — use it instead of custom dropdowns
  - Sheet replaces custom mobile drawer — handles focus trap, overlay, gestures

  **Acceptance Criteria**:
  - [ ] Desktop: NavigationMenu with 8 items, fixed header, backdrop blur
  - [ ] Mobile: Hamburger → Sheet drawer with full nav
  - [ ] Active page highlighted with accent color
  - [ ] Scroll shrink effect (80px → 64px on scroll)
  - [ ] All nav text in Korean
  - [ ] Touch targets ≥ 48px on mobile
  - [ ] `npm run build` passes

  **QA Scenarios**:

  ```
  Scenario: Desktop header navigation
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running, V2 layout active
    Steps:
      1. Navigate to http://localhost:3000/home at 1440px width
      2. Assert header is visible at top with `position: fixed`
      3. Assert "weet:)" logo visible in header
      4. Assert 8 navigation items visible (홈, 시스템건축, 제품, etc.)
      5. Click "시스템건축" nav item — verify navigation works
      6. Scroll down 200px — assert header height reduces (shrink effect)
      7. Screenshot full header at rest and scrolled states
    Expected Result: Fixed header with 8 Korean nav items, shrink on scroll
    Failure Indicators: Nav items missing, English text, no shrink effect
    Evidence: .sisyphus/evidence/task-8-header-desktop.png

  Scenario: Mobile hamburger + Sheet drawer
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running
    Steps:
      1. Navigate to http://localhost:3000/home at 375px width
      2. Assert hamburger icon visible (Menu icon from lucide)
      3. Assert NavigationMenu items NOT visible (hidden on mobile)
      4. Click hamburger icon
      5. Assert Sheet opens from right with all 8 nav items
      6. Assert each item has min-height 48px (touch target)
      7. Click close button — assert Sheet closes
      8. Screenshot open and closed states
    Expected Result: Sheet drawer opens with Korean nav items, proper touch targets
    Failure Indicators: No hamburger, nav items visible on mobile, small touch targets
    Evidence: .sisyphus/evidence/task-8-header-mobile.png
  ```

  **Commit**: YES (groups with Wave 2)
  - Message: `feat(layout): header + footer + layout shell + floating CTA + chatbot`
  - Files: `components/layout/HeaderV2.tsx`
  - Pre-commit: `npm run build`

- [ ] 9. FooterV2 — Dark Section Footer

  **What to do**:
  - Rebuild `components/layout/FooterV2.tsx` from scratch:
    - Dark background: bg-[#2D2D2A] text-white/90
    - Full-width, no max-width constraint on background
    - Inner container: max-w-7xl mx-auto px-4 md:px-6
  - Layout sections:
    - **Top**: "weet:)" logo/brand + tagline (시스템건축 brand message)
    - **Middle**: 3-4 column grid:
      - Col 1: Navigation links (8 pages)
      - Col 2: 고객 지원 (phone, email, KakaoTalk link)
      - Col 3: 소셜 미디어 (Instagram, Blog, Danggeun Market)
      - Col 4 (optional): 간단 상담 신청 form (name + phone + submit)
    - **Bottom**: Copyright, 사업자번호, 주소 from COMPANY constants
    - Separator between middle and bottom: `Separator` component with opacity-20
  - Mobile: Stack columns vertically, accordion-style collapsible sections optional
  - Use data from `lib/constants.ts:COMPANY`
  - Links use `<Link>` from next/link for internal, `<a target="_blank">` for external
  - Yellow accent (#FFCA0D) for hover states on links

  **Must NOT do**:
  - Use bg-black (use #2D2D2A)
  - Include English text
  - Add payment-related sections

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Footer is a key visual component with complex responsive grid
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Footer needs polished layout and visual hierarchy
  - **Skills Evaluated but Omitted**:
    - `playwright`: QA is post-build

  **Parallelization**:
  - **Can Run In Parallel**: YES (with T8, T11, T12)
  - **Parallel Group**: Wave 2
  - **Blocks**: T10 (layout needs Footer)
  - **Blocked By**: T2 (design tokens), T4 (Separator component), T5 (COMPANY constants)

  **References**:

  **Pattern References**:
  - `components/layout/FooterV2.tsx` — V1 footer. Study structure but rebuild completely with shadcn Separator
  - `lib/constants.ts:1-15` — COMPANY object with name, phone, email, address, social links

  **External References**:
  - shadcn Separator: https://ui.shadcn.com/docs/components/separator

  **WHY Each Reference Matters**:
  - COMPANY object: Exact data for footer (phone, email, address, social URLs)
  - V1 footer: Learn what sections worked, but rebuild with new design language

  **Acceptance Criteria**:
  - [ ] Dark bg (#2D2D2A) full-width footer
  - [ ] COMPANY data rendered (phone, email, address, social links, 사업자번호)
  - [ ] 3-4 column responsive grid (stacks on mobile)
  - [ ] Yellow hover on links
  - [ ] All text in Korean
  - [ ] `npm run build` passes

  **QA Scenarios**:

  ```
  Scenario: Footer renders with correct data
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running
    Steps:
      1. Navigate to http://localhost:3000/home at 1440px
      2. Scroll to bottom of page
      3. Assert footer has dark background (#2D2D2A or similar dark)
      4. Assert text "010-9645-2348" visible (phone)
      5. Assert text "660-86-01862" visible (사업자번호)
      6. Assert text "함평군" visible (address)
      7. Screenshot footer section
    Expected Result: Dark footer with all COMPANY data visible
    Failure Indicators: Missing phone/address, light background, English text
    Evidence: .sisyphus/evidence/task-9-footer.png

  Scenario: Footer mobile layout
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running
    Steps:
      1. Navigate to http://localhost:3000/home at 375px
      2. Scroll to bottom
      3. Assert columns stack vertically
      4. Assert all data still visible
      5. Screenshot mobile footer
    Expected Result: Stacked single-column footer on mobile
    Failure Indicators: Horizontal overflow, truncated text
    Evidence: .sisyphus/evidence/task-9-footer-mobile.png
  ```

  **Commit**: YES (groups with Wave 2)
  - Message: `feat(layout): header + footer + layout shell + floating CTA + chatbot`
  - Files: `components/layout/FooterV2.tsx`
  - Pre-commit: `npm run build`

- [ ] 10. Redesign Layout Wrapper — Header + Footer + PageTransition

  **What to do**:
  - Create `app/(redesign)/layout.tsx`:
    - Import HeaderV2, FooterV2, PageTransition, KakaoProvider
    - Structure: `<KakaoProvider> <HeaderV2 /> <main><PageTransition>{children}</PageTransition></main> <FooterV2 /> </KakaoProvider>`
    - `<main>` has `pt-20` (header height offset) and `min-h-screen`
    - Metadata: default title "weet:) | 시스템건축", description
  - Set up `generateMetadata` for default SEO
  - Add `Toaster` from sonner for toast notifications
  - Ensure this layout ONLY applies to (redesign) route group — no effect on old pages or admin

  **Must NOT do**:
  - Modify `app/layout.tsx` (root layout)
  - Affect admin or old page layouts
  - Add analytics scripts here (keep in root layout)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Simple layout composition — imports + JSX structure
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: NO — depends on T8 + T9 completing
  - **Parallel Group**: Wave 2 (sequential after T8, T9)
  - **Blocks**: T13-T21 (all pages need layout)
  - **Blocked By**: T8 (HeaderV2), T9 (FooterV2), T6 (PageTransition), T3 (globals.css)

  **References**:

  **Pattern References**:
  - `app/(redesign)/layout.tsx` — DELETED in T1. Recreate from scratch
  - `app/layout.tsx` — Root layout. Do NOT modify. Study structure to ensure compatibility
  - `components/layout/HeaderV2.tsx` — Created in T8
  - `components/layout/FooterV2.tsx` — Created in T9
  - `components/ui/PageTransition.tsx` — Created in T6

  **WHY Each Reference Matters**:
  - Root layout: Must understand its structure to avoid conflicts (fonts, metadata, etc.)
  - HeaderV2/FooterV2: Direct imports for this layout

  **Acceptance Criteria**:
  - [ ] `app/(redesign)/layout.tsx` exists with Header + Footer + PageTransition
  - [ ] Toaster component included for notifications
  - [ ] KakaoProvider wraps content
  - [ ] `pt-20` or equivalent for header offset
  - [ ] Default metadata set ("weet:) | 시스템건축")
  - [ ] Old pages and admin unaffected
  - [ ] `npm run build` passes

  **QA Scenarios**:

  ```
  Scenario: Layout renders with header and footer
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running, at least one page exists in (redesign)
    Steps:
      1. Navigate to http://localhost:3000/home
      2. Assert header visible at top
      3. Assert footer visible at bottom (scroll down)
      4. Assert main content area between header and footer
      5. Navigate to http://localhost:3000/admin — assert admin layout unchanged
    Expected Result: V2 layout on /home, admin layout unchanged
    Failure Indicators: No header/footer, admin layout broken
    Evidence: .sisyphus/evidence/task-10-layout.png
  ```

  **Commit**: YES (groups with Wave 2)
  - Message: `feat(layout): header + footer + layout shell + floating CTA + chatbot`
  - Files: `app/(redesign)/layout.tsx`
  - Pre-commit: `npm run build`

- [ ] 11. FloatingKakaoCTA Rebuild

  **What to do**:
  - Rebuild `components/ui/FloatingKakaoCTA.tsx`:
    - Fixed position: bottom-6 right-6, z-40
    - Yellow circular button (#FFCA0D) with KakaoTalk icon
    - Hover: scale(1.1) + shadow-lg
    - Click: Opens KakaoTalk channel chat (uses `lib/kakao.ts` openChat function)
    - Mobile: bottom-4 right-4, slightly smaller (48px → 44px)
    - Animate in on scroll (appears after scrolling 300px)
    - Use framer-motion for entrance/hover animations
  - Import into redesign layout (T10) or keep as standalone in layout

  **Must NOT do**:
  - Hard-code Kakao channel link (use lib/kakao.ts)
  - Make it too large (blocks content on mobile)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Single small component with known pattern
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (with T8, T9, T10, T12)
  - **Parallel Group**: Wave 2
  - **Blocks**: None (integrated via layout)
  - **Blocked By**: T4 (shadcn Button for styling reference), T7 (KakaoProvider)

  **References**:

  **Pattern References**:
  - `components/ui/FloatingKakaoCTA.tsx` — V1 version. May have been deleted in T1 — rebuild from scratch
  - `lib/kakao.ts` — openChat() or similar function to trigger Kakao channel

  **Acceptance Criteria**:
  - [ ] Yellow circular floating button, bottom-right corner
  - [ ] Appears after 300px scroll
  - [ ] Opens KakaoTalk on click
  - [ ] Responsive sizing (48px desktop, 44px mobile)
  - [ ] `npm run build` passes

  **QA Scenarios**:

  ```
  Scenario: Floating CTA appears and functions
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running
    Steps:
      1. Navigate to http://localhost:3000/home at 375px
      2. Assert floating button NOT visible initially
      3. Scroll down 400px
      4. Assert yellow circular button appears in bottom-right
      5. Assert button has KakaoTalk-related icon or text
      6. Screenshot with button visible
    Expected Result: Yellow floating button appears after scroll
    Failure Indicators: Button visible immediately, wrong position, wrong color
    Evidence: .sisyphus/evidence/task-11-kakao-cta.png
  ```

  **Commit**: YES (groups with Wave 2)
  - Message: `feat(layout): header + footer + layout shell + floating CTA + chatbot`
  - Files: `components/ui/FloatingKakaoCTA.tsx`
  - Pre-commit: `npm run build`

- [ ] 12. AI Chatbot Rebuild with shadcn

  **What to do**:
  - Rebuild `components/ui/AIChatbot.tsx`:
    - Floating chatbot icon: bottom-6 right-20 (offset from KakaoCTA), z-40
    - Click opens shadcn `Dialog` or `Sheet` with chat interface
    - Chat UI:
      - Message list (scrollable area)
      - Input field (shadcn `Input`) + send button (shadcn `Button`)
      - Bot messages: left-aligned, muted background
      - User messages: right-aligned, accent background (#FFCA0D)
    - For now, implement as UI shell — actual AI integration is deferred
    - Pre-filled greeting: "안녕하세요! weet:) 시스템건축 상담 도우미입니다. 무엇을 도와드릴까요?"
    - Quick reply buttons: "이동식주택 알아보기", "현장건축 상담", "견적 문의"
    - Mobile: Sheet (full-width bottom) instead of Dialog
    - Desktop: Dialog (400px wide, anchored to bottom-right)
  - Use responsive approach: `useMediaQuery` or CSS breakpoints to switch Dialog/Sheet

  **Must NOT do**:
  - Implement actual AI backend (just UI shell)
  - Use English text in chat UI
  - Make it block the KakaoCTA button

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: Multi-component chat UI with responsive Dialog/Sheet switching
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Chat interface needs polished UX (message bubbles, input, layout)

  **Parallelization**:
  - **Can Run In Parallel**: YES (with T8, T9, T11)
  - **Parallel Group**: Wave 2
  - **Blocks**: None
  - **Blocked By**: T4 (Dialog, Sheet, Input, Button components), T2 (design tokens)

  **References**:

  **Pattern References**:
  - `components/ui/AIChatbot.tsx` — V1 version. May have been deleted in T1 — rebuild with shadcn Dialog/Sheet

  **External References**:
  - shadcn Dialog: https://ui.shadcn.com/docs/components/dialog
  - shadcn Sheet: https://ui.shadcn.com/docs/components/sheet

  **WHY Each Reference Matters**:
  - Dialog: Desktop chat container — provides overlay, focus trap, close button
  - Sheet: Mobile chat container — full-width bottom sheet, swipe to close

  **Acceptance Criteria**:
  - [ ] Floating chat icon visible (offset from KakaoCTA)
  - [ ] Click opens Dialog (desktop) or Sheet (mobile) with chat UI
  - [ ] Korean greeting message displayed
  - [ ] Quick reply buttons present
  - [ ] Input field + send button functional (UI only, no backend)
  - [ ] `npm run build` passes

  **QA Scenarios**:

  ```
  Scenario: Chatbot opens on desktop
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running
    Steps:
      1. Navigate to http://localhost:3000/home at 1440px
      2. Scroll down 400px to reveal floating buttons
      3. Click chatbot icon (not the KakaoTalk button)
      4. Assert Dialog opens with chat interface
      5. Assert greeting text contains "시스템건축" or "위트"
      6. Assert quick reply buttons visible (Korean text)
      7. Type "안녕하세요" in input field, click send
      8. Assert user message appears right-aligned
      9. Screenshot chat interface
    Expected Result: Chat dialog with Korean greeting and functional UI
    Failure Indicators: English text, no quick replies, broken layout
    Evidence: .sisyphus/evidence/task-12-chatbot-desktop.png

  Scenario: Chatbot mobile Sheet
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running
    Steps:
      1. Navigate to http://localhost:3000/home at 375px
      2. Scroll down, click chatbot icon
      3. Assert Sheet opens from bottom (not Dialog)
      4. Assert full-width chat interface
      5. Screenshot mobile chat
    Expected Result: Bottom Sheet with full-width chat on mobile
    Failure Indicators: Dialog opens instead of Sheet, truncated interface
    Evidence: .sisyphus/evidence/task-12-chatbot-mobile.png
  ```

  **Commit**: YES (groups with Wave 2)
  - Message: `feat(layout): header + footer + layout shell + floating CTA + chatbot`
  - Files: `components/ui/AIChatbot.tsx`
  - Pre-commit: `npm run build`

- [ ] 13. Homepage — Full-Bleed Hero + Scroll Narrative Sections

  **What to do**:
  - Create `app/(redesign)/home/page.tsx` as the V2 homepage
  - **Hero Section** (min-h-screen):
    - Full-bleed background image (from hero_slides Supabase table) with dark overlay (bg-black/40)
    - Centered headline: "시스템건축의 새로운 기준" or similar (Korean)
    - Sub-headline: brief brand positioning
    - Two CTA buttons: "제품 보기" (primary, yellow) + "상담 신청" (secondary, outline)
    - Use `Carousel` (shadcn) if multiple hero slides, or single hero with parallax
    - Fetch hero_slides data server-side
  - **Section 2: 시스템건축 소개** (dark bg):
    - ScrollReveal cards explaining 이동식주택 + 현장건축
    - Two Card components side-by-side (stack on mobile)
    - Brief description + "자세히 보기" link for each
  - **Section 3: 시그니처 제품** (light bg):
    - Featured products grid — fetch products where `is_signature === true`
    - 3-column grid (1 on mobile, 2 on tablet, 3 on desktop)
    - Each product: Image, name, tagline, size badge, price, "자세히 보기" button
    - Uses Card + Badge shadcn components
  - **Section 4: 솔루션 하이라이트** (dark bg):
    - 2-3 solution cards from Supabase solutions table
    - Horizontal scroll on mobile, grid on desktop
  - **Section 5: 고객 후기 / 신뢰 배지** (light bg):
    - Placeholder section for testimonials/trust badges
    - Can be static content initially
  - **Section 6: CTA 배너** (accent bg — #FFCA0D):
    - Full-width yellow background
    - "지금 상담 받아보세요" headline
    - Two buttons: "카카오톡 상담" + "견적 받기"
  - Apply cinematic restraint: alternate dark/light sections for visual rhythm
  - All sections use ScrollReveal for entrance animations
  - Server component with client islands for interactive parts

  **Must NOT do**:
  - Use English headlines or CTA text
  - Use "모듈러건축" — only "시스템건축"
  - Add payment/deposit flows
  - Over-animate (subtle is key)

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Most complex visual page — hero, scroll narrative, responsive grids, animations
  - **Skills**: [`frontend-ui-ux`, `playwright`]
    - `frontend-ui-ux`: Homepage is the most critical brand touchpoint
    - `playwright`: Complex visual verification needed (scroll behavior, responsive layouts)

  **Parallelization**:
  - **Can Run In Parallel**: YES (with T14, T15, T16)
  - **Parallel Group**: Wave 3
  - **Blocks**: T22 (easter eggs), T23-T27 (polish tasks)
  - **Blocked By**: T10 (layout), T6 (animations)

  **References**:

  **Pattern References**:
  - `lib/products.ts:5-18` — `getProducts()` for fetching signature products (filter `is_signature === true` client-side or add query)
  - `app/actions/` — Server actions if needed for data fetching
  - `lib/design-tokens.ts` — Created in T2, provides color/spacing constants

  **API/Type References**:
  - `types/supabase.ts:123-151` — HeroSlide type: { id, image_url, title, subtitle, sort_order, is_active }
  - `types/supabase.ts:12-34` — Product type with is_signature field
  - `types/supabase.ts:153-181` — Solution type: { id, title, description, image_url }

  **External References**:
  - shadcn Carousel: https://ui.shadcn.com/docs/components/carousel
  - shadcn Card: https://ui.shadcn.com/docs/components/card
  - shadcn Badge: https://ui.shadcn.com/docs/components/badge

  **WHY Each Reference Matters**:
  - Product/HeroSlide/Solution types: Must match DB schema for server-side data fetching
  - getProducts(): Reuse existing data layer instead of raw Supabase queries

  **Acceptance Criteria**:
  - [ ] Hero section renders min-h-screen with background image + overlay
  - [ ] At least 6 distinct sections with alternating dark/light backgrounds
  - [ ] Signature products grid renders from Supabase data
  - [ ] CTA buttons use Korean text ("상담 신청", "견적 받기", "카카오톡 상담")
  - [ ] ScrollReveal animations on each section
  - [ ] Responsive: 375px single column, 1440px full grid
  - [ ] Zero "모듈러건축" text — only "시스템건축"
  - [ ] `npm run build` passes

  **QA Scenarios**:

  ```
  Scenario: Homepage hero and sections render
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running, Supabase has hero_slides data
    Steps:
      1. Navigate to http://localhost:3000/home at 1440px
      2. Assert hero section has min-height close to viewport height
      3. Assert headline text is in Korean (not English)
      4. Assert at least 2 CTA buttons visible in hero
      5. Scroll through all sections — count at least 6 distinct sections
      6. Assert alternating dark/light backgrounds
      7. Assert product cards visible in signature section
      8. Assert yellow CTA banner section exists
      9. Full-page screenshot
    Expected Result: 6+ sections, alternating colors, Korean text throughout
    Failure Indicators: English text, "모듈러건축", fewer than 5 sections
    Evidence: .sisyphus/evidence/task-13-homepage-desktop.png

  Scenario: Homepage mobile responsive
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running
    Steps:
      1. Navigate to http://localhost:3000/home at 375px
      2. Assert hero is full-width, text readable
      3. Assert product cards stack vertically (1 column)
      4. Assert CTA buttons full-width on mobile
      5. Assert no horizontal overflow
      6. Full-page screenshot mobile
    Expected Result: Clean single-column mobile layout, no overflow
    Failure Indicators: Horizontal scroll, overlapping elements, tiny text
    Evidence: .sisyphus/evidence/task-13-homepage-mobile.png
  ```

  **Commit**: YES (groups with Wave 3)
  - Message: `feat(pages): homepage + system-construction + products + portfolio pages`
  - Files: `app/(redesign)/home/page.tsx`, section components
  - Pre-commit: `npm run build`

- [ ] 14. 시스템건축 소개 Page — Scroll-Driven Narrative

  **What to do**:
  - Create `app/(redesign)/system/page.tsx` — 시스템건축 소개 page
  - **Section 1: Hero** (min-h-[70vh]):
    - Full-bleed construction photography + dark overlay
    - Headline: "시스템건축이란?" or brand positioning headline
    - Brief intro paragraph
  - **Section 2: 시스템건축 정의** (light bg):
    - ScrollReveal text explaining the concept
    - Visual: icon or illustration representing system construction
    - Key points: 공장 생산 + 현장 조립 = 품질 + 속도 + 비용 효율
  - **Section 3: 두 축** (dark bg):
    - Two prominent Card components:
      - **이동식주택** — image, description, "제품 보기" CTA → links to /products (or products route)
      - **현장건축** — image, description, "시공사례 보기" CTA → links to portfolio route
    - Side by side desktop, stacked mobile
    - Hover: card lift + image zoom
  - **Section 4: 왜 시스템건축인가?** (light bg):
    - Benefits grid: 3-4 cards with icons
    - Examples: 공기 단축, 품질 균일, 비용 절감, 친환경
    - Each card: ScrollReveal stagger animation
  - **Section 5: CTA** (accent bg):
    - "시스템건축으로 시작하세요"
    - "상담 신청" + "카카오톡 상담" buttons
  - All content in Korean, brand language: "시스템건축" throughout

  **Must NOT do**:
  - Use "모듈러건축" anywhere
  - Make it too text-heavy — balance visuals and text
  - Use English section headers

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Brand storytelling page with scroll animations and responsive design
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Brand page needs careful visual storytelling

  **Parallelization**:
  - **Can Run In Parallel**: YES (with T13, T15, T16)
  - **Parallel Group**: Wave 3
  - **Blocks**: T23-T27
  - **Blocked By**: T10 (layout), T6 (animations)

  **References**:

  **Pattern References**:
  - `lib/navigation.ts` — Created in T5, confirms route path for this page
  - `lib/design-tokens.ts` — Color tokens for section backgrounds

  **API/Type References**:
  - No database data needed — this is a static/informational page

  **WHY Each Reference Matters**:
  - Navigation: Ensure this page's route matches what HeaderV2 links to
  - Design tokens: Consistent dark/light section alternation

  **Acceptance Criteria**:
  - [ ] 5 distinct sections with alternating backgrounds
  - [ ] 이동식주택 and 현장건축 cards with working links
  - [ ] Benefits grid with icons
  - [ ] CTA section with Korean buttons
  - [ ] Zero "모듈러건축" references
  - [ ] Responsive (375px to 1440px)
  - [ ] `npm run build` passes

  **QA Scenarios**:

  ```
  Scenario: System construction page renders
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running
    Steps:
      1. Navigate to system page URL at 1440px
      2. Assert hero with construction imagery
      3. Assert "시스템건축" text visible (not "모듈러건축")
      4. Assert two division cards (이동식주택, 현장건축)
      5. Click 이동식주택 card CTA — verify navigation to products page
      6. Navigate back, click 현장건축 CTA — verify navigation to portfolio page
      7. Assert benefits grid has 3-4 items
      8. Full-page screenshot
    Expected Result: Brand narrative page with working navigation links
    Failure Indicators: "모듈러건축" text, broken links, English content
    Evidence: .sisyphus/evidence/task-14-system-page.png
  ```

  **Commit**: YES (groups with Wave 3)
  - Message: `feat(pages): homepage + system-construction + products + portfolio pages`
  - Files: `app/(redesign)/system/page.tsx`, section components
  - Pre-commit: `npm run build`

- [ ] 15. 제품(이동식주택) Page — Dual Navigation (Purpose + Size)

  **What to do**:
  - Create `app/(redesign)/products-v2/page.tsx` (or appropriate route) — 이동식주택 products page
  - **This is the most complex page** — dual navigation is a key UX innovation
  - **Section 1: Hero** (min-h-[50vh]):
    - "이동식주택" headline with lifestyle photography
    - Brief intro: 용도에 맞는 완벽한 공간
  - **Section 2: Navigation Switcher**:
    - Use shadcn `Tabs` with two tabs: "용도별 보기" (by purpose) | "사이즈별 보기" (by size)
    - Tab indicator: yellow underline (#FFCA0D)
    - Sticky below header on scroll (position: sticky, top: 80px)
  - **용도별 (Purpose-Based) View**:
    - Cards for each purpose category:
      1. 농막·체류형 쉼터 (S, M products) — icon + description + product thumbnails
      2. 세컨하우스·주말주택 (M, L products) — icon + description + thumbnails
      3. 본 주거·단독주택 (L, XL products) — icon + description + thumbnails
      4. 상업·사무 공간 (BESPOKE) — links to 비스포크 page
    - Each card: Click expands to show matching products grid
    - Or: Click navigates to filtered product list below
  - **사이즈별 (Size-Based) View**:
    - Cards for S / M / L / XL
    - Each shows: size range, typical use case, product count badge
    - Click filters product grid below
  - **Product Grid** (below tabs):
    - Cards showing product image, name, tagline, size badge, price
    - Use shadcn Card + Badge
    - Click → product detail modal (Dialog) or separate detail section
    - Product detail: all fields from DB (image, sub_images gallery, description, structure, roof_type, exterior_finish, interior_finish, size, floor_plan, price)
    - "견적 문의" CTA button on each product
  - **체류형 쉼터 Section** (below products):
    - Dedicated section explaining 체류형 쉼터 concept
    - Links to relevant S/M products above
  - Fetch products server-side using `getProducts()` from `lib/products.ts`
  - Filter logic: client-side based on `size_category` and `PURPOSE_TO_SIZE_MAP` from `lib/types.ts`
  - Only show S/M/L/XL products here (SOLUTION → 솔루션 page, DESIGN → 비스포크 page)

  **Must NOT do**:
  - Show SOLUTION or DESIGN category products on this page
  - Add cart/checkout/payment features
  - Use "주문" or "구매" — use "견적 문의" or "상담 신청"
  - Show 할부/리스/월 납입금

  **Recommended Agent Profile**:
  - **Category**: `deep`
    - Reason: Most complex page — dual navigation with tab switching, product grid with filtering, detail modals, 체류형 쉼터 section. Requires deep understanding of product data model
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Complex product catalog UX with dual navigation paradigm

  **Parallelization**:
  - **Can Run In Parallel**: YES (with T13, T14, T16)
  - **Parallel Group**: Wave 3
  - **Blocks**: T17 (비스포크 references products), T23-T27
  - **Blocked By**: T10 (layout), T5 (types with PURPOSE_TO_SIZE_MAP)

  **References**:

  **Pattern References**:
  - `lib/products.ts:5-18` — `getProducts()` to fetch all products
  - `lib/products.ts:54-87` — `buildSidebarStructure()` for existing category grouping logic
  - `lib/types.ts` — Created in T5: PurposeCategory, PURPOSE_TO_SIZE_MAP

  **API/Type References**:
  - `types/supabase.ts:12-34` — Full Product type with all fields (image_url, sub_images, price, structure, roof_type, exterior_finish, interior_finish, size, floor_plan_url)
  - `types/supabase.ts:16` — `sub_category: 'Private' | 'Public' | null` — only S has this
  - `types/supabase.ts:17` — `size_category: 'S' | 'M' | 'L' | 'XL' | 'SOLUTION' | 'DESIGN'`

  **External References**:
  - shadcn Tabs: https://ui.shadcn.com/docs/components/tabs
  - shadcn Card: https://ui.shadcn.com/docs/components/card
  - shadcn Dialog: https://ui.shadcn.com/docs/components/dialog

  **WHY Each Reference Matters**:
  - Product type: Must render ALL product fields in detail view — missing fields = incomplete UI
  - PURPOSE_TO_SIZE_MAP: Core logic for purpose-based filtering — maps purpose to size_category array
  - buildSidebarStructure: Shows S category has Private/Public split — may need special handling

  **Acceptance Criteria**:
  - [ ] Dual tab navigation: "용도별 보기" + "사이즈별 보기"
  - [ ] Tabs are sticky below header on scroll
  - [ ] Purpose view shows 4 categories with correct product mapping
  - [ ] Size view shows S/M/L/XL with product counts
  - [ ] Product grid renders with image, name, tagline, size badge, price
  - [ ] Product detail shows all fields from DB
  - [ ] "견적 문의" CTA on products (not "구매" or "주문")
  - [ ] 체류형 쉼터 section present
  - [ ] Only S/M/L/XL products shown (no SOLUTION/DESIGN)
  - [ ] Responsive layout (1 col mobile, 2 col tablet, 3 col desktop)
  - [ ] `npm run build` passes

  **QA Scenarios**:

  ```
  Scenario: Dual navigation works
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running, products in Supabase
    Steps:
      1. Navigate to products page at 1440px
      2. Assert two tabs visible: "용도별 보기" and "사이즈별 보기"
      3. Default tab active (용도별 or 사이즈별)
      4. Click "용도별 보기" — assert 4 purpose categories shown
      5. Click "사이즈별 보기" — assert S/M/L/XL categories shown
      6. Click a size category — assert product grid filters correctly
      7. Assert no products with size_category "SOLUTION" or "DESIGN" visible
      8. Screenshot both views
    Expected Result: Tab switching filters products correctly
    Failure Indicators: Wrong products in wrong categories, SOLUTION/DESIGN products visible
    Evidence: .sisyphus/evidence/task-15-products-dual-nav.png

  Scenario: Product detail shows all fields
    Tool: Playwright (playwright skill)
    Preconditions: Products exist in Supabase
    Steps:
      1. Navigate to products page at 1440px
      2. Click first product card
      3. Assert product detail opens (Dialog or expanded section)
      4. Assert name, description, price visible
      5. Assert "견적 문의" button present (NOT "구매" or "주문")
      6. Assert no "할부" or "리스" text anywhere
      7. Screenshot product detail
    Expected Result: Complete product info with Korean CTA
    Failure Indicators: Missing fields, English CTAs, payment terms visible
    Evidence: .sisyphus/evidence/task-15-product-detail.png

  Scenario: Products page mobile
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running
    Steps:
      1. Navigate to products page at 375px
      2. Assert tabs visible and tappable
      3. Assert product cards in single column
      4. Assert no horizontal overflow
      5. Screenshot mobile products view
    Expected Result: Single-column grid, functional tabs on mobile
    Failure Indicators: Overlapping cards, untappable tabs, overflow
    Evidence: .sisyphus/evidence/task-15-products-mobile.png
  ```

  **Commit**: YES (groups with Wave 3)
  - Message: `feat(pages): homepage + system-construction + products + portfolio pages`
  - Files: `app/(redesign)/products-v2/page.tsx`, product section components
  - Pre-commit: `npm run build`

- [ ] 16. 현장건축(시공사례) Page — Portfolio + Process + CTA

  **What to do**:
  - Create page at appropriate route (e.g., `app/(redesign)/projects/page.tsx` or `app/(redesign)/construction/page.tsx`)
  - Page name should be elegant Korean — "시공사례" (Construction Portfolio) or "프로젝트" (Projects)
  - **Section 1: Hero** (min-h-[50vh]):
    - Construction site photography + dark overlay
    - Headline: "현장에서 완성되는 공간" or similar
  - **Section 2: Portfolio Grid** (light bg):
    - Fetch from `projects` Supabase table
    - Grid of project cards: image, title, location, client, tags
    - Use shadcn Card + Badge (for tags)
    - Filterable by tags (if projects have tags)
    - Click → expanded project detail with image gallery (sub_images carousel)
    - 3-column desktop, 2-column tablet, 1-column mobile
  - **Section 3: 시공 프로세스** (dark bg):
    - Timeline/stepper showing construction process:
      1. 상담 → 2. 설계 → 3. 허가 → 4. 시공 → 5. 준공 → 6. A/S
    - Horizontal timeline desktop, vertical timeline mobile
    - Each step: icon, title, brief description
    - ScrollReveal animation revealing steps sequentially
  - **Section 4: CTA** (accent bg):
    - "현장건축 상담이 필요하신가요?"
    - "상담 신청" + "카카오톡 상담" buttons
  - Fetch projects data server-side from Supabase

  **Must NOT do**:
  - Show pricing/할부 for construction services
  - Use "모듈러" terminology
  - Make portfolio grid too dense (maximum 3 columns)

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Visual portfolio page with masonry-style grid, timeline, and image galleries
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Portfolio layout and timeline design need polished UX

  **Parallelization**:
  - **Can Run In Parallel**: YES (with T13, T14, T15)
  - **Parallel Group**: Wave 3
  - **Blocks**: T23-T27
  - **Blocked By**: T10 (layout), T5 (types)

  **References**:

  **Pattern References**:
  - `lib/navigation.ts` — Route path for this page

  **API/Type References**:
  - `types/supabase.ts:279-316` — Project type: { id, title, client, location, completed_at, description, images[], tags[], status }

  **External References**:
  - shadcn Card: https://ui.shadcn.com/docs/components/card
  - shadcn Badge: https://ui.shadcn.com/docs/components/badge
  - shadcn Carousel: for project image galleries

  **WHY Each Reference Matters**:
  - Project type: Must render title, client, location, images[], tags[] — the images array is the gallery source
  - Tags array: Used for filtering portfolio projects

  **Acceptance Criteria**:
  - [ ] Portfolio grid rendering projects from Supabase
  - [ ] Project detail with image gallery (carousel)
  - [ ] 6-step construction process timeline
  - [ ] CTA section with Korean buttons
  - [ ] Responsive grid (3→2→1 columns)
  - [ ] `npm run build` passes

  **QA Scenarios**:

  ```
  Scenario: Portfolio page with projects
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running, projects in Supabase
    Steps:
      1. Navigate to portfolio page at 1440px
      2. Assert hero section with headline
      3. Assert project cards in grid layout
      4. Click first project card — assert detail opens with image gallery
      5. Assert process timeline section has 6 steps
      6. Assert CTA section has Korean buttons
      7. Full-page screenshot
    Expected Result: Portfolio grid, project detail, timeline, CTA
    Failure Indicators: Empty grid, broken gallery, missing timeline steps
    Evidence: .sisyphus/evidence/task-16-portfolio.png

  Scenario: Portfolio mobile
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running
    Steps:
      1. Navigate to portfolio page at 375px
      2. Assert single-column project cards
      3. Assert timeline is vertical (not horizontal)
      4. Assert no horizontal overflow
      5. Screenshot mobile
    Expected Result: Vertical timeline, single-column grid
    Failure Indicators: Horizontal overflow, horizontal timeline on mobile
    Evidence: .sisyphus/evidence/task-16-portfolio-mobile.png
  ```

  **Commit**: YES (groups with Wave 3)
  - Message: `feat(pages): homepage + system-construction + products + portfolio pages`
  - Files: `app/(redesign)/projects/page.tsx`, section components
  - Pre-commit: `npm run build`

- [ ] 17. 비스포크 + 견적 빌더 Page

  **What to do**:
  - Create `app/(redesign)/bespoke-v2/page.tsx` — 비스포크(맞춤 설계) + 견적 빌더
  - **Section 1: Hero** (min-h-[50vh]):
    - Premium photography + dark overlay
    - Headline: "당신만의 공간을 설계합니다" or similar
    - Sub: Bespoke custom design intro
  - **Section 2: 비스포크 서비스 소개** (light bg):
    - 3-4 cards explaining what bespoke means:
      - 맞춤 설계: client-specific design
      - 소재 선택: material options
      - 인테리어: interior customization
      - 특수 용도: special purpose buildings
  - **Section 3: 견적 빌더** (multi-step form):
    - Use shadcn `Form` + `Input` + `Select` + `Textarea` + `Button`
    - Multi-step wizard (3-4 steps):
      - Step 1: 건축 유형 선택 (이동식주택 / 현장건축 / 비스포크)
      - Step 2: 규모 및 용도 (size, purpose, location)
      - Step 3: 선호 사항 (roof_type, exterior, interior preferences)
      - Step 4: 연락처 (name, phone, email, message)
    - Progress indicator: step dots or bar with yellow accent
    - Use `react-hook-form` + `zod` validation (both already installed)
    - On submit: call `submitInquiry` server action from `app/actions/submit-inquiry.ts` to create inquiry in Supabase
    - This action uses `useActionState` pattern (prevState + FormData)
    - Success: sonner toast "견적 문의가 접수되었습니다"
  - **Section 4: CTA** (dark bg):
    - "직접 상담이 더 편하시다면"
    - KakaoTalk + phone call buttons

  **Must NOT do**:
  - Include pricing calculator (no automatic price generation)
  - Add payment/deposit steps
  - Use "주문하기" or "결제하기" — use "견적 문의하기"

  **Recommended Agent Profile**:
  - **Category**: `deep`
    - Reason: Complex multi-step form with validation, server action integration, state management
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Multi-step form wizard needs clean UX flow

  **Parallelization**:
  - **Can Run In Parallel**: YES (with T18, T19, T20, T21)
  - **Parallel Group**: Wave 4
  - **Blocks**: T23-T27
  - **Blocked By**: T10 (layout), T5 (types)

  **References**:

  **Pattern References**:
  - `app/actions/submit-inquiry.ts` — **THE** server action for creating inquiries. Uses `submitInquiry(prevState, formData)` pattern with `useActionState`. Inserts into `inquiries` table with fields: name, email, phone, message, category, status='new'. Returns `{ success, message }`. Use this exact action — do NOT create a new one.
  - `app/actions/inquiry-actions.ts` — Admin-only actions (getInquiries, updateInquiryStatus, replyToInquiry, deleteInquiry). Do NOT use for form submission — these are for the admin panel
  - `package.json:19,35,40` — `react-hook-form`, `@hookform/resolvers`, `zod` already installed

  **API/Type References**:
  - `types/supabase.ts:81-121` — Inquiry type: { category, name, email, phone, message, status }
  - `types/supabase.ts:95-106` — InquiryInsert type for creating new inquiries

  **External References**:
  - shadcn Form: https://ui.shadcn.com/docs/components/form — uses react-hook-form + zod
  - shadcn Select: https://ui.shadcn.com/docs/components/select

  **WHY Each Reference Matters**:
  - `submit-inquiry.ts`: The EXISTING server action for inquiry creation. Uses `useActionState` / FormData pattern. Must use this — it already handles Supabase insert + error handling + revalidation
  - `inquiry-actions.ts`: Admin-only — do NOT use for public form submission
  - InquiryInsert type: Form data must match this type for successful DB insertion

  **Acceptance Criteria**:
  - [ ] Multi-step form with 4 steps
  - [ ] Progress indicator showing current step
  - [ ] Form validation with zod (required fields, email format, phone format)
  - [ ] Form submits via inquiry-actions server action
  - [ ] Success toast notification in Korean
  - [ ] "견적 문의하기" submit button (not "결제" or "주문")
  - [ ] Responsive form layout
  - [ ] `npm run build` passes

  **QA Scenarios**:

  ```
  Scenario: Multi-step form navigation
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running
    Steps:
      1. Navigate to bespoke page at 1440px
      2. Scroll to 견적 빌더 section
      3. Assert Step 1 visible with building type options
      4. Select "이동식주택" — click Next
      5. Assert Step 2 visible (size/purpose)
      6. Fill size and purpose — click Next
      7. Assert Step 3 visible (preferences)
      8. Fill preferences — click Next
      9. Assert Step 4 visible (contact info)
      10. Assert submit button says "견적 문의하기" (NOT "결제" or "주문")
      11. Screenshot each step
    Expected Result: 4 steps navigate correctly with Korean labels
    Failure Indicators: Steps don't advance, English text, payment-related labels
    Evidence: .sisyphus/evidence/task-17-bespoke-form.png

  Scenario: Form validation
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running
    Steps:
      1. Navigate to bespoke page, reach Step 4
      2. Click submit without filling required fields
      3. Assert validation error messages appear in Korean
      4. Fill name: "테스트", phone: "010-1234-5678", email: "test@test.com", message: "테스트 문의"
      5. Click submit
      6. Assert success toast appears with Korean text
    Expected Result: Validation works, submission succeeds with toast
    Failure Indicators: No validation, English errors, submission fails silently
    Evidence: .sisyphus/evidence/task-17-form-validation.png
  ```

  **Commit**: YES (groups with Wave 4)
  - Message: `feat(pages): bespoke + solutions + company + support + tracking pages`
  - Files: `app/(redesign)/bespoke-v2/page.tsx`, form components
  - Pre-commit: `npm run build`

- [ ] 18. 솔루션 Page

  **What to do**:
  - Create `app/(redesign)/solutions/page.tsx`
  - **Section 1: Hero** (min-h-[50vh]):
    - "시스템건축 솔루션" headline
    - Brief intro about weet's solution offerings
  - **Section 2: Solution Cards** (light bg):
    - Fetch from Supabase `solutions` table
    - Grid of solution cards: image, title, description
    - Use shadcn Card with hover lift animation
    - 3-column desktop, 2-column tablet, 1-column mobile
    - Click → expanded detail or Dialog with full description
  - **Section 3: 맞춤 솔루션 CTA** (dark bg):
    - "찾으시는 솔루션이 없으신가요?"
    - "맞춤 솔루션 문의" + "카카오톡 상담" buttons
  - Relatively simple page — data-driven from Supabase

  **Must NOT do**:
  - Hard-code solution content (fetch from Supabase)
  - Mix with product data (solutions are separate)

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Card grid with hover animations, data fetching
  - **Skills**: [`frontend-ui-ux`]

  **Parallelization**:
  - **Can Run In Parallel**: YES (with T17, T19, T20, T21)
  - **Parallel Group**: Wave 4
  - **Blocks**: T23-T27
  - **Blocked By**: T10, T5

  **References**:

  **API/Type References**:
  - `types/supabase.ts:153-181` — Solution type: { id, title, description, image_url, sort_order, is_active }

  **Acceptance Criteria**:
  - [ ] Solution cards from Supabase data
  - [ ] Grid layout (3→2→1 responsive)
  - [ ] CTA section with Korean buttons
  - [ ] `npm run build` passes

  **QA Scenarios**:

  ```
  Scenario: Solutions page renders from Supabase
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running, solutions in Supabase
    Steps:
      1. Navigate to solutions page at 1440px
      2. Assert solution cards visible in grid
      3. Assert each card has image and title
      4. Assert CTA section with Korean text
      5. Screenshot
    Expected Result: Solution grid with Supabase data
    Failure Indicators: Empty grid, English text
    Evidence: .sisyphus/evidence/task-18-solutions.png
  ```

  **Commit**: YES (groups with Wave 4)
  - Message: `feat(pages): bespoke + solutions + company + support + tracking pages`
  - Files: `app/(redesign)/solutions/page.tsx`
  - Pre-commit: `npm run build`

- [ ] 19. 회사소개 Page

  **What to do**:
  - Create `app/(redesign)/company-v2/page.tsx`
  - **Section 1: Hero** (min-h-[50vh]):
    - Team/facility photography + dark overlay
    - "weet:) 시스템건축" headline
  - **Section 2: 회사 소개** (light bg):
    - Company story narrative with ScrollReveal
    - Mission/vision statement
    - Key numbers: 시공 건수, 경력, 만족도 (animated CountUp)
  - **Section 3: 강점** (dark bg):
    - 3-4 strength cards: icons + titles + descriptions
    - Examples: 자체 생산, 원스톱 서비스, 품질 보증, 사후 관리
  - **Section 4: 오시는 길** (light bg):
    - Company address from COMPANY constants
    - Embedded map (Kakao Maps or static image)
    - Contact info: phone, email
  - **Section 5: CTA** (accent bg):
    - "함께 만들어갈 공간" — "상담 신청" button
  - Use COMPANY constants for all company data

  **Must NOT do**:
  - Invent company information — use COMPANY constants
  - Use "모듈러건축" — only "시스템건축"

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Company brand page with animated stats, map integration
  - **Skills**: [`frontend-ui-ux`]

  **Parallelization**:
  - **Can Run In Parallel**: YES (with T17, T18, T20, T21)
  - **Parallel Group**: Wave 4
  - **Blocks**: T23-T27
  - **Blocked By**: T10, T6

  **References**:

  **Pattern References**:
  - `lib/constants.ts:1-15` — COMPANY object with address, phone, email, social links

  **Acceptance Criteria**:
  - [ ] Company narrative with scroll animations
  - [ ] Animated stat counters
  - [ ] Map or directions section with correct address
  - [ ] COMPANY data rendered from constants
  - [ ] `npm run build` passes

  **QA Scenarios**:

  ```
  Scenario: Company page with correct data
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running
    Steps:
      1. Navigate to company page at 1440px
      2. Assert "시스템건축" visible (not "모듈러건축")
      3. Assert address "함평군 대동면 금산길" visible
      4. Assert phone "010-9645-2348" visible
      5. Assert stat counters section exists
      6. Screenshot
    Expected Result: Company info from constants, Korean branding
    Failure Indicators: Wrong address, "모듈러건축", English text
    Evidence: .sisyphus/evidence/task-19-company.png
  ```

  **Commit**: YES (groups with Wave 4)
  - Message: `feat(pages): bespoke + solutions + company + support + tracking pages`
  - Files: `app/(redesign)/company-v2/page.tsx`
  - Pre-commit: `npm run build`

- [ ] 20. 고객지원 Page — FAQ Accordion + 문의 Form

  **What to do**:
  - Create `app/(redesign)/support-v2/page.tsx`
  - **Section 1: Hero** (compact, min-h-[30vh]):
    - "고객지원" headline
  - **Section 2: FAQ** (light bg):
    - Use shadcn `Accordion` component
    - Fetch FAQs from Supabase `faqs` table (question_ko, answer_ko)
    - Order by order_index
    - Each AccordionItem: question as trigger, answer as content
    - Smooth open/close animation (shadcn default)
  - **Section 3: 문의하기** (dark bg):
    - Contact form using shadcn Form + Input + Textarea
    - Fields: name, email (optional), phone, category (Select dropdown), message
    - Category options: 일반 문의, 제품 문의, 견적 문의, A/S 문의
    - Submit via `submitInquiry` server action from `app/actions/submit-inquiry.ts` (same action as T17)
    - Success toast
  - **Section 4: 연락처** (light bg):
    - COMPANY phone, email, address, business hours
    - KakaoTalk channel link
    - Social media links

  **Must NOT do**:
  - Use English FAQ content (use Korean question_ko/answer_ko)
  - Create new server actions for inquiry submission (use existing `submit-inquiry.ts`)

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: FAQ accordion + form with validation + server action integration
  - **Skills**: [`frontend-ui-ux`]

  **Parallelization**:
  - **Can Run In Parallel**: YES (with T17, T18, T19, T21)
  - **Parallel Group**: Wave 4
  - **Blocks**: T23-T27
  - **Blocked By**: T10, T5

  **References**:

  **Pattern References**:
  - `app/actions/submit-inquiry.ts` — Server action for creating inquiries. Same action used in T17. Uses `submitInquiry(prevState, formData)` with `useActionState`
  - `app/actions/faq-actions.ts` — Server action for fetching FAQs

  **API/Type References**:
  - `types/supabase.ts:183-214` — Faq type: { question_ko, answer_ko, question_en, answer_en, order_index }
  - `types/supabase.ts:81-121` — Inquiry type for form submission

  **External References**:
  - shadcn Accordion: https://ui.shadcn.com/docs/components/accordion

  **WHY Each Reference Matters**:
  - Faq type: question_ko and answer_ko are the Korean fields to display
  - inquiry-actions: Reuse for support form submission

  **Acceptance Criteria**:
  - [ ] FAQ accordion with Supabase data (Korean)
  - [ ] Contact form with validation
  - [ ] Form submits to inquiry-actions
  - [ ] Contact info section with COMPANY data
  - [ ] `npm run build` passes

  **QA Scenarios**:

  ```
  Scenario: FAQ accordion works
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running, FAQs in Supabase
    Steps:
      1. Navigate to support page at 1440px
      2. Assert FAQ section with accordion items
      3. Click first FAQ item — assert answer expands
      4. Click second FAQ item — assert it expands (first may collapse)
      5. Assert text is Korean
      6. Screenshot open FAQ
    Expected Result: Accordion opens/closes, Korean content
    Failure Indicators: Empty FAQ, English text, no animation
    Evidence: .sisyphus/evidence/task-20-faq.png

  Scenario: Support form submission
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running
    Steps:
      1. Scroll to 문의하기 form
      2. Fill: name "테스트", phone "010-1234-5678", category "일반 문의", message "테스트 문의입니다"
      3. Click submit
      4. Assert success toast in Korean
    Expected Result: Form submits, toast appears
    Failure Indicators: Validation error on valid data, no toast
    Evidence: .sisyphus/evidence/task-20-support-form.png
  ```

  **Commit**: YES (groups with Wave 4)
  - Message: `feat(pages): bespoke + solutions + company + support + tracking pages`
  - Files: `app/(redesign)/support-v2/page.tsx`
  - Pre-commit: `npm run build`

- [ ] 21. 시공 추적 Page

  **What to do**:
  - Create `app/(redesign)/my/tracking/page.tsx`
  - **Section 1: Lookup Form** (centered, max-w-md):
    - Input field for tracking number or phone number
    - "조회하기" submit button
    - Simple centered layout, no hero needed
  - **Section 2: Tracking Result** (conditional):
    - Shows construction progress timeline
    - Status steps: 접수 → 설계 → 허가 → 자재 준비 → 시공 → 마감 → 인도
    - Current step highlighted with yellow accent
    - Uses `lib/tracking-realtime.ts` for any realtime updates (if implemented)
    - If no tracking found: "조회 결과가 없습니다" message
  - Minimal page — functional focus over visual flourish

  **Must NOT do**:
  - Create payment tracking
  - Show financial information

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: Form + conditional rendering + timeline component
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (with T17-T20)
  - **Parallel Group**: Wave 4
  - **Blocks**: T23-T27
  - **Blocked By**: T10

  **References**:

  **Pattern References**:
  - `lib/tracking-realtime.ts` — Existing tracking utility. Use as-is if available

  **Acceptance Criteria**:
  - [ ] Lookup form with input + submit button
  - [ ] Progress timeline with 7 steps
  - [ ] Current step highlighted yellow
  - [ ] "조회 결과가 없습니다" for no results
  - [ ] `npm run build` passes

  **QA Scenarios**:

  ```
  Scenario: Tracking page lookup
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running
    Steps:
      1. Navigate to tracking page at 375px (mobile-first)
      2. Assert input field and "조회하기" button visible
      3. Type "test-123" in input, click submit
      4. Assert either tracking timeline or "조회 결과가 없습니다" message
      5. Screenshot
    Expected Result: Functional lookup with result display
    Failure Indicators: No form, English text, error on submit
    Evidence: .sisyphus/evidence/task-21-tracking.png
  ```

  **Commit**: YES (groups with Wave 4)
  - Message: `feat(pages): bespoke + solutions + company + support + tracking pages`
  - Files: `app/(redesign)/my/tracking/page.tsx`
  - Pre-commit: `npm run build`

- [ ] 22. Easter Eggs (Konami Code + Hidden Interactions)

  **What to do**:
  - Rebuild easter egg system using `lib/easter-eggs.ts` (existing, kept from V1)
  - Implement Konami code listener (↑↑↓↓←→←→BA):
    - Triggers a fun visual effect (e.g., yellow confetti, weet logo rain, etc.)
    - Use framer-motion for the animation
  - Optional: logo click counter (click weet:) logo 5 times for hidden effect)
  - Integrate into homepage (T13) or layout
  - Keep it subtle and delightful, not intrusive

  **Must NOT do**:
  - Break page functionality
  - Make easter eggs too distracting

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Small fun feature — known patterns
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (with T23-T27)
  - **Parallel Group**: Wave 5
  - **Blocks**: None
  - **Blocked By**: T13 (homepage must exist)

  **References**:

  **Pattern References**:
  - `lib/easter-eggs.ts` — Existing easter egg utilities from V1. Reuse/adapt

  **Acceptance Criteria**:
  - [ ] Konami code triggers visual effect
  - [ ] Effect is temporary and non-blocking
  - [ ] `npm run build` passes

  **QA Scenarios**:

  ```
  Scenario: Konami code triggers easter egg
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running
    Steps:
      1. Navigate to http://localhost:3000/home at 1440px
      2. Press keyboard sequence: ArrowUp ArrowUp ArrowDown ArrowDown ArrowLeft ArrowRight ArrowLeft ArrowRight KeyB KeyA
      3. Assert visual effect appears (animation, confetti, or visual change)
      4. Wait 3 seconds — assert effect fades
      5. Screenshot during effect
    Expected Result: Visual easter egg triggers and fades
    Failure Indicators: No effect, permanent visual change, page break
    Evidence: .sisyphus/evidence/task-22-easter-egg.png
  ```

  **Commit**: YES (groups with Wave 5)
  - Message: `feat(polish): easter eggs + SEO + performance + tests + copy review`
  - Files: easter egg component files
  - Pre-commit: `npm run build`

- [ ] 23. SEO + Metadata for All Pages

  **What to do**:
  - Add `generateMetadata()` to each page in `app/(redesign)/`:
    - `/home`: title "weet:) | 시스템건축의 새로운 기준", description with keywords
    - `/system`: title "시스템건축이란? | weet:)"
    - `/products-v2`: title "이동식주택 | weet:) 시스템건축"
    - `/projects` (현장건축): title "시공사례 | weet:) 시스템건축"
    - `/bespoke-v2`: title "비스포크 · 견적 | weet:) 시스템건축"
    - `/solutions`: title "솔루션 | weet:) 시스템건축"
    - `/company-v2`: title "회사소개 | weet:) 시스템건축"
    - `/support-v2`: title "고객지원 | weet:) 시스템건축"
  - Add Open Graph meta tags (og:title, og:description, og:image)
  - Add structured data (JSON-LD) for organization on company page
  - Verify all metadata is Korean

  **Must NOT do**:
  - Use English metadata
  - Use "모듈러건축" in any metadata

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Repetitive metadata additions across 8 files
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (with T22, T24-T27)
  - **Parallel Group**: Wave 5
  - **Blocks**: None
  - **Blocked By**: T13-T21 (all pages must exist)

  **References**:

  **External References**:
  - Next.js Metadata: https://nextjs.org/docs/app/building-your-application/optimizing/metadata

  **Acceptance Criteria**:
  - [ ] All 8 pages have generateMetadata with Korean title + description
  - [ ] Open Graph tags on all pages
  - [ ] Zero "모듈러건축" in metadata
  - [ ] `npm run build` passes

  **QA Scenarios**:

  ```
  Scenario: Metadata renders correctly
    Tool: Bash
    Preconditions: Build complete
    Steps:
      1. Run dev server, curl http://localhost:3000/home
      2. Assert <title> contains "시스템건축"
      3. Assert og:title meta tag present
      4. Assert no "모듈러" in HTML head
    Expected Result: Korean SEO metadata on all pages
    Failure Indicators: English titles, missing og tags, "모듈러" present
    Evidence: .sisyphus/evidence/task-23-seo.txt
  ```

  **Commit**: YES (groups with Wave 5)
  - Message: `feat(polish): easter eggs + SEO + performance + tests + copy review`
  - Files: All page.tsx files (metadata additions)
  - Pre-commit: `npm run build`

- [ ] 24. Dynamic Imports + Performance Optimization

  **What to do**:
  - Add `dynamic()` imports for heavy client components:
    - AIChatbot (loaded after interaction)
    - FloatingKakaoCTA (loaded after scroll)
    - Carousel components (loaded when in viewport)
    - Easter egg components
  - Add `loading.tsx` files for route-level loading states:
    - Use shadcn Skeleton components for loading placeholders
    - At least `app/(redesign)/loading.tsx` for global loading
    - Product page loading.tsx with skeleton grid
  - Optimize images:
    - Ensure all images use Next.js `<Image>` with width/height or fill
    - Add `priority` to hero images (LCP optimization)
    - Add `sizes` attribute for responsive images
  - Check bundle size with `npm run build` output

  **Must NOT do**:
  - Remove functionality for performance
  - Lazy-load above-the-fold content

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Known Next.js patterns — dynamic imports, Image optimization
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (with T22, T23, T25-T27)
  - **Parallel Group**: Wave 5
  - **Blocks**: None
  - **Blocked By**: T13-T21

  **References**:

  **External References**:
  - Next.js dynamic: https://nextjs.org/docs/app/building-your-application/optimizing/lazy-loading
  - Next.js Image: https://nextjs.org/docs/app/building-your-application/optimizing/images

  **Acceptance Criteria**:
  - [ ] AIChatbot, FloatingKakaoCTA, Carousel dynamically imported
  - [ ] Loading.tsx with Skeleton components
  - [ ] Hero images have `priority` prop
  - [ ] `npm run build` passes with reasonable bundle sizes

  **QA Scenarios**:

  ```
  Scenario: Loading states show skeletons
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running
    Steps:
      1. Navigate to products page with network throttled to Slow 3G
      2. Assert skeleton loading placeholders visible before content
      3. Screenshot loading state
    Expected Result: Skeleton placeholders during load
    Failure Indicators: Blank page during load, no skeletons
    Evidence: .sisyphus/evidence/task-24-loading-skeleton.png
  ```

  **Commit**: YES (groups with Wave 5)
  - Message: `feat(polish): easter eggs + SEO + performance + tests + copy review`
  - Files: dynamic imports, loading.tsx files
  - Pre-commit: `npm run build`

- [ ] 25. Mobile QA Pass — All Pages at 375px

  **What to do**:
  - Systematic Playwright test of ALL 8 pages at 375px viewport width
  - Check for each page:
    - No horizontal overflow (document.documentElement.scrollWidth <= viewport.width)
    - All text readable (no text smaller than 14px)
    - Touch targets ≥ 44px (buttons, links)
    - Images not overflowing containers
    - Forms usable on mobile (input fields full-width, select dropdowns work)
    - Scroll works smoothly
    - Header hamburger + Sheet drawer functional
    - Footer fully visible and stacked
  - Fix any issues found
  - Take before/after screenshots

  **Must NOT do**:
  - Skip any page
  - Accept horizontal overflow as "good enough"

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: Systematic testing + fixing across all pages
  - **Skills**: [`playwright`, `frontend-ui-ux`]
    - `playwright`: Automated browser testing at mobile viewport
    - `frontend-ui-ux`: Fixing mobile UX issues requires design knowledge

  **Parallelization**:
  - **Can Run In Parallel**: YES (with T22-T24, T26-T27)
  - **Parallel Group**: Wave 5
  - **Blocks**: None
  - **Blocked By**: T13-T21 (all pages must exist)

  **Acceptance Criteria**:
  - [ ] All 8 pages tested at 375px
  - [ ] Zero horizontal overflow on any page
  - [ ] All touch targets ≥ 44px
  - [ ] All text ≥ 14px
  - [ ] Screenshots saved for each page

  **QA Scenarios**:

  ```
  Scenario: All pages pass mobile check
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running, all pages built
    Steps:
      For each of 8 pages:
      1. Navigate to page at 375px width
      2. Assert `document.documentElement.scrollWidth <= 375`
      3. Assert no element overflows viewport
      4. Scroll full page — assert smooth scroll
      5. Screenshot full page
    Expected Result: 8 pages, zero overflow, all functional
    Failure Indicators: Any page with overflow, broken layout, unreadable text
    Evidence: .sisyphus/evidence/task-25-mobile-qa-{page-name}.png (8 files)
  ```

  **Commit**: YES (groups with Wave 5 if fixes needed)
  - Message: `feat(polish): easter eggs + SEO + performance + tests + copy review`
  - Files: Various CSS/component fixes
  - Pre-commit: `npm run build`

- [ ] 26. Copy Review — 시스템건축 Language Audit

  **What to do**:
  - Search entire `app/(redesign)/` and `components/` for:
    - "모듈러" → must be zero occurrences (replace with "시스템건축")
    - English UI text (Reserve, Order, Subscribe, Buy, etc.) → replace with Korean
    - "할부", "리스", "월 납입금" → must be zero occurrences
    - "결제", "구매", "주문" → replace with "견적 문의" or "상담 신청"
    - "deposit", "payment" → must be zero
  - Review all CTA button text for Korean appropriateness:
    - ✅ "상담 신청", "카카오톡 상담", "견적 받기", "자세히 보기", "견적 문의하기"
    - ❌ "Reserve Now", "Order", "Buy", "Subscribe"
  - Review placeholder text in forms for Korean
  - Review alt text on images for Korean descriptions
  - Fix any found issues

  **Must NOT do**:
  - Change admin panel text (admin is out of scope)
  - Modify component names or variable names (code stays in English)

  **Recommended Agent Profile**:
  - **Category**: `writing`
    - Reason: Korean copy review — language audit, not code
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (with T22-T25, T27)
  - **Parallel Group**: Wave 5
  - **Blocks**: None
  - **Blocked By**: T13-T21

  **Acceptance Criteria**:
  - [ ] Zero "모듈러" in (redesign) route group
  - [ ] Zero English UI text (CTA buttons, labels, placeholders)
  - [ ] Zero "할부/리스/월 납입금" references
  - [ ] Zero "결제/구매/주문" (replaced with 견적 문의/상담)
  - [ ] All CTA buttons use approved Korean text

  **QA Scenarios**:

  ```
  Scenario: Language audit passes
    Tool: Bash
    Preconditions: All pages built
    Steps:
      1. Run `grep -r "모듈러" app/(redesign)/ components/ --include="*.tsx" --include="*.ts"` — expect 0 results
      2. Run `grep -ri "reserve\|subscribe\|order now\|buy now" app/(redesign)/ components/ --include="*.tsx"` — expect 0
      3. Run `grep -r "할부\|리스\|월 납입" app/(redesign)/ components/ --include="*.tsx"` — expect 0
      4. Run `grep -r "결제\|구매하기\|주문하기" app/(redesign)/ components/ --include="*.tsx"` — expect 0
    Expected Result: Zero forbidden terms found
    Failure Indicators: Any grep returns matches
    Evidence: .sisyphus/evidence/task-26-language-audit.txt
  ```

  **Commit**: YES (groups with Wave 5 if fixes needed)
  - Message: `feat(polish): easter eggs + SEO + performance + tests + copy review`
  - Files: Various text fixes
  - Pre-commit: `npm run build`

- [ ] 27. Vitest Tests for Key Components

  **What to do**:
  - Write vitest tests for core components:
    - `__tests__/design-tokens.test.ts` — verify color values, token exports
    - `__tests__/navigation.test.ts` — verify nav structure, all 8 items present
    - `__tests__/types.test.ts` — verify PURPOSE_TO_SIZE_MAP mapping correctness
    - `__tests__/products-filter.test.ts` — verify product filtering logic (purpose → size)
    - `__tests__/inquiry-form.test.ts` — verify form validation with zod schema
  - Use existing test infrastructure (vitest.config.ts, vitest.setup.ts)
  - Focus on logic, not UI rendering (avoid heavy component tests)
  - Minimum: 10 test cases across 5 files

  **Must NOT do**:
  - Delete existing tests
  - Write flaky tests dependent on Supabase data
  - Over-test UI components (test logic, not DOM)

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: Multiple test files with domain logic testing
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (with T22-T26)
  - **Parallel Group**: Wave 5
  - **Blocks**: None
  - **Blocked By**: T13-T21

  **References**:

  **Pattern References**:
  - `vitest.config.ts` — Existing vitest config
  - `vitest.setup.ts` — Test setup file
  - `__tests__/` — Existing test directory structure

  **Acceptance Criteria**:
  - [ ] 5 test files created
  - [ ] Minimum 10 test cases total
  - [ ] `npx vitest run` — all tests pass
  - [ ] No Supabase calls in tests (mock data)

  **QA Scenarios**:

  ```
  Scenario: All tests pass
    Tool: Bash
    Preconditions: Test files created
    Steps:
      1. Run `npx vitest run` — verify all pass
      2. Assert at least 10 tests total
      3. Assert 0 failures
    Expected Result: 10+ tests, 0 failures
    Failure Indicators: Test failures, fewer than 10 tests
    Evidence: .sisyphus/evidence/task-27-vitest.txt
  ```

  **Commit**: YES (groups with Wave 5)
  - Message: `feat(polish): easter eggs + SEO + performance + tests + copy review`
  - Files: `__tests__/*.test.ts` (5 files)
  - Pre-commit: `npx vitest run`

---

## Final Verification Wave

> 4 review agents run in PARALLEL. ALL must APPROVE. Rejection → fix → re-run.

- [ ] F1. **Plan Compliance Audit** — `oracle`
  Read the plan end-to-end. For each "Must Have": verify implementation exists (read file, curl endpoint, run command). For each "Must NOT Have": search codebase for forbidden patterns (English UI text, 할부/리스, admin modifications, 모듈러건축 terminology). Check evidence files exist in `.sisyphus/evidence/`. Compare deliverables against plan.
  Output: `Must Have [N/N] | Must NOT Have [N/N] | Tasks [N/N] | VERDICT: APPROVE/REJECT`

- [ ] F2. **Code Quality Review** — `unspecified-high`
  Run `npm run build` + `npm run lint` + `npx vitest run`. Review all changed files for: `as any`/`@ts-ignore`, empty catches, console.log in prod, commented-out code, unused imports. Check AI slop: excessive comments, over-abstraction, generic names (data/result/item/temp). Verify shadcn HSL variables are correct. Check Tailwind v3 patterns (no v4 patterns like OKLCH).
  Output: `Build [PASS/FAIL] | Lint [PASS/FAIL] | Tests [N pass/N fail] | Files [N clean/N issues] | VERDICT`

- [ ] F3. **Real Manual QA** — `unspecified-high` (+ `playwright` skill)
  Start dev server. Use Playwright to navigate ALL 8 pages at mobile (375px) and desktop (1440px). Execute EVERY QA scenario from tasks. Test cross-page navigation via header/footer. Test KakaoTalk CTA, chatbot, quote builder. Test product dual navigation (purpose → size switching). Test 현장건축 portfolio grid. Test form submissions. Save screenshots to `.sisyphus/evidence/final-qa/`.
  Output: `Scenarios [N/N pass] | Integration [N/N] | Edge Cases [N tested] | VERDICT`

- [ ] F4. **Scope Fidelity Check** — `deep`
  For each task: read "What to do", verify actual implementation matches. Check 1:1 compliance — everything specified was built, nothing beyond spec was added. Verify "Must NOT do" for each task. Check admin/ directory is completely untouched. Check Supabase schema is unchanged. Check no English UI text leaked in. Flag unaccounted changes.
  Output: `Tasks [N/N compliant] | Admin [UNTOUCHED/MODIFIED] | Schema [UNCHANGED/MODIFIED] | VERDICT`

---

## Commit Strategy

| After Wave | Commit Message | Key Files |
|-----------|---------------|-----------|
| Wave 1 | `feat(design-system): shadcn init + design tokens + typography + animation system` | tailwind.config.ts, globals.css, lib/design-tokens.ts, lib/animations.ts, components.json, components/ui/* |
| Wave 2 | `feat(layout): header + footer + layout shell + floating CTA + chatbot` | components/layout/HeaderV2.tsx, FooterV2.tsx, app/(redesign)/layout.tsx |
| Wave 3 | `feat(pages): homepage + system-construction + products + portfolio pages` | app/(redesign)/home/, system/, products/, projects/ |
| Wave 4 | `feat(pages): bespoke + solutions + company + support + tracking pages` | app/(redesign)/bespoke/, solutions/, company/, support/, tracking/ |
| Wave 5 | `feat(polish): easter eggs + SEO + performance + tests + copy review` | Various |
| Wave FINAL | `chore(qa): final verification pass — all checks approved` | .sisyphus/evidence/ |

---

## Success Criteria

### Verification Commands
```bash
npm run build          # Expected: Compiled successfully, zero errors
npm run lint           # Expected: No warnings (--max-warnings=0)
npx vitest run         # Expected: All tests pass
```

### Final Checklist
- [ ] All 8 pages render at 375px and 1440px
- [ ] shadcn components themed with correct HSL palette
- [ ] Product dual navigation functional (purpose + size)
- [ ] "시스템건축" branding — zero "모듈러건축" references
- [ ] Korean-only UI text — zero English UX terms
- [ ] No payment/할부/리스 flows anywhere
- [ ] Admin CMS at /admin completely unchanged
- [ ] Supabase schema completely unchanged
- [ ] KakaoTalk CTA functional on all pages
- [ ] AI chatbot opens and sends messages
- [ ] Quote builder multi-step form works
- [ ] Tracking page lookup works
- [ ] Easter eggs discoverable
- [ ] All "Must NOT Have" guardrails verified absent

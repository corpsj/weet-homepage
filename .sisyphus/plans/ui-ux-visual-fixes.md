# UI/UX 시각적 개선 계획

## TL;DR

> **Quick Summary**: we-et.com 전체 페이지의 시각적 UI/UX 문제를 수정합니다. 네비게이션 드롭다운 고장, 모바일 메뉴 UX 개선, 홈페이지 비디오 섹션 수정, 버튼 호버 상태 추가, 이미지 최적화 활성화, OG 메타 태그 추가 등.
> 
> **Deliverables**:
> - 데스크톱 서브메뉴 호버 드롭다운 정상 작동
> - 모바일 메뉴 아코디언 구조로 개선
> - 홈페이지 비디오 섹션 정상화 (또는 숨김 처리)
> - 전체 버튼/CTA 호버 상태 추가
> - 이미지 최적화 활성화 (Next.js Image Optimization)
> - 전체 페이지 OG 메타데이터 추가
> - 플레이스홀더 텍스트 제거/교체
> - 푸터 소셜 아이콘 개선
> 
> **Estimated Effort**: Medium
> **Parallel Execution**: YES - 4 waves
> **Critical Path**: Task 1 (next.config) → Task 3 (header hover) → Task 7 (video section) → Final Verification

---

## Context

### Original Request
기능 수정보다 UI/UX적 개선을 우선하고 싶다. 눈에 보여지는 부분을 전체 페이지에 걸쳐 수정.

### Interview Summary
**Key Discussions**:
- UI/UX 시각적 개선만 집중 (백엔드/RLS/타입 제외)
- 전체 페이지 대상 (homepage + subpages)
- Figma 디자인 상관없음 (초안이었음)
- 프로덕션: we-et.com / 개발: localhost:3001
- ULW로 빠른 실행 원함

**Research Findings (6 code audit agents + 1 Playwright agent)**:
- 데스크톱 서브메뉴 호버가 드롭다운을 트리거하지 않음 (Playwright 확인)
- 모바일 메뉴에 37개 항목이 평탄한 리스트로 표시 (Playwright 확인)
- 언어 스위치(KO/EN) 비활성 (Playwright 확인)
- 홈페이지 비디오 섹션: 빈 iframe, TODO 3개 (코드 감사)
- `unoptimized: true`로 이미지 최적화 불가 (코드 감사)
- 전체 페이지 OG 이미지/메타데이터 없음 (코드 감사)
- "준비중" 플레이스홀더 텍스트 노출 (코드 감사)
- 모든 네비게이션 링크 유효 확인 완료

### Metis Review
**Identified Gaps (addressed)**:
- YouTube 링크 → 제거 (채널 없음)
- 비디오 섹션 → 깔끔한 플레이스홀더 표시 (영상 없음)
- 버튼 호버 상태의 디자인 기준 → 기존 primary color(컬러) 기반 자연스러운 호버 적용

---

## Work Objectives

### Core Objective
we-et.com 전체 페이지의 시각적 문제를 수정하여 사용자 경험을 개선합니다.

### Concrete Deliverables
- 데스크톱 네비게이션 서브메뉴 드롭다운 정상 작동
- 모바일 메뉴 아코디언 구조로 개선
- 홈페이지 비디오 섹션 정상화
- 전체 버튼/CTA 호버 상태 추가
- Next.js 이미지 최적화 활성화
- 12개 페이지 OG 메타데이터 + 페이지별 메타 추가
- 플레이스홀더 텍스트 제거
- 푸터 소셜 아이콘 개선
- YouTube 소셜 링크 제거

### Definition of Done
- [ ] we-et.com에서 Playwright로 모든 네비게이션 드롭다운 확인
- [ ] 모바일(375px) 메뉴가 아코디언 구조로 작동
- [ ] 모든 버튼에 호버 상태 존재
- [ ] `npm run build` 성공
- [ ] Lighthouse 점수 Performance ≥ 70

### Must Have
- 데스크톱 서브메뉴가 호버 시 나타나야 함
- 모바일 메뉴가 계층적이어야 함
- 비디오 섹션이 깨져 보이지 않아야 함
- 이미지 최적화가 활성화되어야 함
- "준비중" 같은 플레이스홀더가 사용자에게 보이지 않아야 함

### Must NOT Have (Guardrails)
- ❌ 백엔드 로직 변경 (Supabase 쿼리, RLS 정책, 서버 액션 등)
- ❌ 어드민 패널 기능 추가/변경
- ❌ 새로운 페이지 생성 (기존 페이지만 수정)
- ❌ TypeScript 타입 리팩토링
- ❌ 코드 구조 변경/리팩토링
- ❌ console.log 정리 (이번 범위 외)
- ❌ 새 라이브러리 설치 (기존 의존성만 사용)

---

## Verification Strategy

> **ZERO HUMAN INTERVENTION** — ALL verification is agent-executed. No exceptions.

### Test Decision
- **Infrastructure exists**: NO (no test framework configured)
- **Automated tests**: None (not in scope for this visual fix plan)
- **Framework**: N/A

### QA Policy
Every task MUST include agent-executed QA scenarios.
Evidence saved to `.sisyphus/evidence/task-{N}-{scenario-slug}.{ext}`.

- **Frontend/UI**: Use Playwright (playwright skill) — Navigate to we-et.com, interact, assert DOM, screenshot
- **Config changes**: Use Bash (npm run build) — Verify build passes
- **SEO/Meta**: Use Bash (curl) — Fetch page HTML and verify meta tags

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Start Immediately — config + quick fixes):
├── Task 1: Enable image optimization [quick]
├── Task 2: Fix YouTube social link [quick]
├── Task 3: Fix desktop submenu hover [visual-engineering]
├── Task 4: Fix mobile menu hierarchy [visual-engineering]
└── Task 5: Remove/replace placeholder text [quick]

Wave 2 (After Wave 1 — interactive elements + sections):
├── Task 6: Add button/CTA hover states [visual-engineering]
├── Task 7: Fix homepage video section [visual-engineering]
├── Task 8: Improve footer social icons [visual-engineering]
└── Task 9: Fix mobile CTA visibility [visual-engineering]

Wave 3 (After Wave 2 — SEO/meta, depends on page structure being stable):
├── Task 10: Add page-level metadata to 12 pages [quick]
└── Task 11: Add OG meta tags to all pages [quick]

Wave 4 (After Wave 3 — build + deploy verification):
└── Task 12: Build verification + Playwright full-site QA [unspecified-high]

Wave FINAL (After ALL tasks — independent review, 4 parallel):
├── Task F1: Plan compliance audit (oracle)
├── Task F2: Code quality review (unspecified-high)
├── Task F3: Real manual QA (unspecified-high)
└── Task F4: Scope fidelity check (deep)

Critical Path: Task 1 → Task 6 → Task 10 → Task 12 → F1-F4
Parallel Speedup: ~60% faster than sequential
Max Concurrent: 5 (Wave 1)
```

### Dependency Matrix

| Task | Depends On | Blocks |
|------|-----------|--------|
| 1 | — | 12 |
| 2 | — | 12 |
| 3 | — | 6, 12 |
| 4 | — | 9, 12 |
| 5 | — | 12 |
| 6 | 3 | 12 |
| 7 | — | 12 |
| 8 | — | 12 |
| 9 | 4 | 12 |
| 10 | — | 11, 12 |
| 11 | 10 | 12 |
| 12 | ALL | F1-F4 |
| F1-F4 | 12 | — |

### Agent Dispatch Summary

- **Wave 1**: **5** — T1 → `quick`, T2 → `quick`, T3 → `visual-engineering`, T4 → `visual-engineering`, T5 → `quick`
- **Wave 2**: **4** — T6 → `visual-engineering`, T7 → `visual-engineering`, T8 → `visual-engineering`, T9 → `visual-engineering`
- **Wave 3**: **2** — T10 → `quick`, T11 → `quick`
- **Wave 4**: **1** — T12 → `unspecified-high`
- **FINAL**: **4** — F1 → `oracle`, F2 → `unspecified-high`, F3 → `unspecified-high`, F4 → `deep`

---

## TODOs

> Implementation + Test = ONE Task. Never separate.
> EVERY task MUST have: Recommended Agent Profile + Parallelization info + QA Scenarios.

- [x] 1. Enable Next.js Image Optimization

  **What to do**:
  - Open `next.config.ts` and remove `unoptimized: true` from the `images` config
  - Keep the existing `remotePatterns` array intact
  - Verify all `<Image>` components still render correctly after the change

  **Must NOT do**:
  - Do not modify `remotePatterns`
  - Do not change any other next.config settings

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Single line removal in config file
  - **Skills**: [`playwright`]
    - `playwright`: Needed to verify images still load on we-et.com after deploy

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 2, 3, 4, 5)
  - **Blocks**: Task 12
  - **Blocked By**: None

  **References**:
  **Pattern References**:
  - `next.config.ts:5` — The `unoptimized: true` line to remove
  - `next.config.ts:6-17` — `remotePatterns` array to keep intact (Supabase and Instagram CDN)

  **External References**:
  - Next.js Image docs: Vercel automatically handles optimization when deployed

  **WHY Each Reference Matters**:
  - `next.config.ts:5` — This is the ONLY line to change. Removing it enables WebP conversion and responsive sizing
  - The remotePatterns MUST remain so Supabase-hosted images continue to load

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Images load with optimization enabled
    Tool: Bash
    Preconditions: next.config.ts modified
    Steps:
      1. Run `npm run build` in /Users/zoopark-studio/dev/weet-homepage
      2. Verify build succeeds without errors
      3. Check build output for image optimization warnings
    Expected Result: Build succeeds with 0 errors
    Failure Indicators: Build fails mentioning image domains or optimization errors
    Evidence: .sisyphus/evidence/task-1-build-success.txt

  Scenario: Supabase images still accessible
    Tool: Bash (curl)
    Preconditions: Build successful
    Steps:
      1. curl -sI https://we-et.com | grep -i 'status\|x-nextjs'
      2. Verify site is still accessible
    Expected Result: HTTP 200 response
    Evidence: .sisyphus/evidence/task-1-site-accessible.txt
  ```

  **Commit**: YES (groups with Wave 1)
  - Message: `fix(perf): enable Next.js image optimization`
  - Files: `next.config.ts`
  - Pre-commit: `npm run build`

- [x] 2. Remove YouTube Social Link

  **What to do**:
  - In `components/layout/Header.tsx`, find and REMOVE the YouTube social link entirely
  - There are TWO instances: desktop header (around line 300) and mobile header (around line 485)
  - Remove the entire `<a>` element wrapping the YouTube icon in both locations
  - Keep other social links (Daangn, Naver Blog, Instagram) intact
  - Ensure remaining icons are properly spaced after YouTube removal

  **Must NOT do**:
  - Do not modify any other social links
  - Do not change Header layout structure beyond removing YouTube

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Simple element removal in 2 locations
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 3, 4, 5)
  - **Blocks**: Task 12
  - **Blocked By**: None

  **References**:
  **Pattern References**:
  - `components/layout/Header.tsx:~300` — Desktop YouTube link `href="https://youtube.com"` (remove entire `<a>` element)
  - `components/layout/Header.tsx:~485` — Mobile YouTube link (remove entire `<a>` element)

  **WHY Each Reference Matters**:
  - Both locations must be removed or one viewport still shows broken YouTube link
  - User confirmed: no YouTube channel exists, remove link entirely

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: YouTube link removed from header
    Tool: Bash (grep)
    Preconditions: Header.tsx modified
    Steps:
      1. Search Header.tsx for "youtube" (case-insensitive)
      2. Verify zero instances remain
    Expected Result: No YouTube references in Header.tsx
    Failure Indicators: grep finds any youtube reference
    Evidence: .sisyphus/evidence/task-2-youtube-removed.txt

  Scenario: Other social links still work
    Tool: Bash (grep)
    Preconditions: Header.tsx modified
    Steps:
      1. Search Header.tsx for "instagram" — should still exist
      2. Search for "blog.naver" — should still exist
      3. Search for "daangn" — should still exist
    Expected Result: All non-YouTube social links preserved
    Evidence: .sisyphus/evidence/task-2-social-links-preserved.txt
  ```

  **Commit**: YES (groups with Wave 1)
  - Message: `fix(ui): remove YouTube social link (no channel exists)`
  - Files: `components/layout/Header.tsx`
  - Pre-commit: `npm run build`

- [x] 3. Fix Desktop Submenu Hover Dropdown

  **What to do**:
  - Investigate why desktop submenu dropdowns are NOT appearing on hover in `components/layout/Header.tsx`
  - The navigation structure is defined in `navigation` array (lines 8-72) with submenu items
  - The header uses `onMouseEnter` for hover triggers (documented in CLAUDE.md)
  - Debug the hover interaction: check if `onMouseEnter`/`onMouseLeave` handlers are properly wired
  - Check if CSS (opacity, visibility, pointer-events, z-index) is blocking the dropdown display
  - Check if `framer-motion` animations are preventing visibility
  - Fix so that hovering over any main menu item with children shows its submenu dropdown smoothly
  - Ensure the yellow highlight bar (8px, `bg-primary`) appears under active menu item

  **Must NOT do**:
  - Do not change navigation structure/links
  - Do not modify mobile menu behavior
  - Do not add new dependencies

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Requires debugging hover interactions, CSS transitions, and potentially framer-motion animations
  - **Skills**: [`playwright`]
    - `playwright`: Must verify hover triggers dropdown on live site

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 2, 4, 5)
  - **Blocks**: Task 6, Task 12
  - **Blocked By**: None

  **References**:
  **Pattern References**:
  - `components/layout/Header.tsx:8-72` — Navigation array defining menu items with `children` submenus
  - `components/layout/Header.tsx` — Full Header component with mega menu hover logic
  - CLAUDE.md states: "메가 메뉴는 호버 시 표시 (onMouseEnter 트리거)"
  - CLAUDE.md states: "활성 메뉴는 노란색 하이라이트 바 표시 (8px, bg-primary)"

  **WHY Each Reference Matters**:
  - The navigation array defines which items SHOULD have dropdowns (those with `children`)
  - The Header component contains the hover logic that is currently broken
  - CLAUDE.md confirms the intended behavior: onMouseEnter should trigger mega menu

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Submenu appears on hover (happy path)
    Tool: Playwright
    Preconditions: Dev server running on localhost:3001
    Steps:
      1. Navigate to http://localhost:3001
      2. Hover over "모듈러건축 소개" menu item
      3. Wait 500ms for animation
      4. Assert submenu container is visible (opacity > 0, display != none)
      5. Assert submenu contains expected items: "모듈러건축이란?", "모듈러 형태" etc.
      6. Take screenshot
    Expected Result: Submenu dropdown visible with all child items
    Failure Indicators: Submenu element exists in DOM but hidden, or doesn't exist at all
    Evidence: .sisyphus/evidence/task-3-submenu-hover.png

  Scenario: Submenu disappears on mouse leave
    Tool: Playwright
    Preconditions: Submenu is open from previous scenario
    Steps:
      1. Move mouse away from menu area
      2. Wait 300ms
      3. Assert submenu is no longer visible
    Expected Result: Submenu closes smoothly
    Evidence: .sisyphus/evidence/task-3-submenu-close.png

  Scenario: Yellow highlight bar on active menu
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Hover over "제품 소개" menu item
      2. Assert yellow bar (bg-primary, #FDB813) appears under the menu item
      3. Take screenshot showing highlight
    Expected Result: 8px yellow bar visible under hovered item
    Evidence: .sisyphus/evidence/task-3-yellow-bar.png
  ```

  **Commit**: YES (groups with Wave 1)
  - Message: `fix(ui): restore desktop navigation submenu hover dropdown`
  - Files: `components/layout/Header.tsx`
  - Pre-commit: `npm run build`

- [x] 4. Fix Mobile Menu Hierarchy (Accordion)

  **What to do**:
  - In `components/layout/Header.tsx`, the mobile menu currently shows all 37 items in a flat list
  - Restructure mobile menu to use accordion/expandable pattern:
    - Show only top-level menu items initially (6 items: 모듈러건축, 제품, BESPOKE, SOLUTION, 회사소개, 고객지원)
    - Tapping a menu item with children should expand to show sub-items
    - Tapping again should collapse
    - Use chevron icon (ChevronDown from lucide-react) to indicate expandable items
    - Apply smooth expand/collapse animation (use framer-motion AnimatePresence)
  - CLAUDE.md confirms: "모바일: 확장 가능한 섹션이 있는 햄버거 메뉴"

  **Must NOT do**:
  - Do not change desktop menu behavior
  - Do not modify navigation links/routes
  - Do not add new dependencies (use existing framer-motion + lucide-react)

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Mobile UI restructuring with animations
  - **Skills**: [`playwright`]
    - `playwright`: Must verify mobile menu works at 375px viewport

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 2, 3, 5)
  - **Blocks**: Task 9, Task 12
  - **Blocked By**: None

  **References**:
  **Pattern References**:
  - `components/layout/Header.tsx` — Full Header with both desktop and mobile menu implementations
  - `components/layout/Header.tsx:8-72` — Navigation array with parent-child structure
  - CLAUDE.md: "모바일: 확장 가능한 섹션이 있는 햄버거 메뉴"

  **API/Type References**:
  - `framer-motion` — AnimatePresence + motion.div for expand/collapse
  - `lucide-react` — ChevronDown icon for expand indicator

  **WHY Each Reference Matters**:
  - Header.tsx contains the mobile menu rendering that needs restructuring
  - Navigation array already has the parent-child hierarchy—just needs accordion UI
  - framer-motion already imported in the project, use it for smooth animation

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Mobile menu shows only top-level items initially
    Tool: Playwright
    Preconditions: Dev server running, viewport 375px
    Steps:
      1. Navigate to http://localhost:3001 with viewport { width: 375, height: 667 }
      2. Click hamburger menu button
      3. Count visible menu items
      4. Assert only 6 top-level items visible (not 37)
      5. Take screenshot
    Expected Result: 6 main menu items visible, each with chevron indicating expandable
    Failure Indicators: More than 6 items visible, or all 37 items in flat list
    Evidence: .sisyphus/evidence/task-4-mobile-menu-collapsed.png

  Scenario: Accordion expand/collapse works
    Tool: Playwright
    Preconditions: Mobile menu is open
    Steps:
      1. Tap "모듈러건축 소개" item
      2. Wait 300ms for animation
      3. Assert sub-items are visible ("모듈러건축이란?", "모듈러 형태" etc.)
      4. Tap "모듈러건축 소개" again
      5. Wait 300ms
      6. Assert sub-items are hidden
    Expected Result: Sub-items expand/collapse smoothly with animation
    Evidence: .sisyphus/evidence/task-4-mobile-accordion.png
  ```

  **Commit**: YES (groups with Wave 1)
  - Message: `fix(ui): restructure mobile menu as accordion with expand/collapse`
  - Files: `components/layout/Header.tsx`
  - Pre-commit: `npm run build`

- [x] 5. Remove/Replace Placeholder Text

  **What to do**:
  - Find and fix all visible "준비중" (coming soon) placeholder text:
    1. `constants/dictionaries.ts:153` — `education.items: ['준비중']` → Remove the entire section or replace with actual content
    2. `constants/dictionaries.ts:154` — `career.items: ['준비중']` → Same treatment
    3. `constants/dictionaries.ts:187` — `noFloorPlan: '도면 준비중'` → Change to a more polished message like "도면 요청 시 제공" (Available on request)
    4. `app/products/page.tsx:97` — `floorPlanWaiting` text → Update to match dictionary change
  - For education/career sections: If no real content available, HIDE the section entirely rather than showing "준비중"
  - Check the company page component to find where these sections are rendered and conditionally hide them

  **Must NOT do**:
  - Do not invent fake education/career content
  - Do not change page layout structure

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Text replacement across 2-3 files
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 2, 3, 4)
  - **Blocks**: Task 12
  - **Blocked By**: None

  **References**:
  **Pattern References**:
  - `constants/dictionaries.ts:153-154` — Education/career items with '준비중' placeholder
  - `constants/dictionaries.ts:187` — `noFloorPlan` message
  - `app/products/page.tsx:97` — Floor plan placeholder usage
  - `app/company/page.tsx` — Company page rendering education/career sections

  **WHY Each Reference Matters**:
  - dictionaries.ts is the source of truth for all text content
  - products/page.tsx uses the noFloorPlan text
  - company/page.tsx renders the education/career sections that need hiding

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: No "준비중" visible on any page
    Tool: Bash (grep)
    Preconditions: Files modified
    Steps:
      1. Search entire codebase for '준비중' in non-admin .tsx/.ts files
      2. Verify no user-facing instances remain
    Expected Result: Zero instances of '준비중' in public-facing code
    Failure Indicators: grep finds '준비중' in component/page files
    Evidence: .sisyphus/evidence/task-5-placeholder-check.txt

  Scenario: Company page hides empty sections
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Navigate to http://localhost:3001/company
      2. Search page for text "준비중"
      3. Assert text is NOT found on page
      4. Take screenshot of company page
    Expected Result: No placeholder text visible, empty sections hidden
    Evidence: .sisyphus/evidence/task-5-company-page.png
  ```

  **Commit**: YES (groups with Wave 1)
  - Message: `fix(ui): remove placeholder text and hide empty sections`
  - Files: `constants/dictionaries.ts`, `app/products/page.tsx`, `app/company/page.tsx`
  - Pre-commit: `npm run build`

- [ ] 6. Add Button/CTA Hover States Across Site

  **What to do**:
  - Audit all `<button>` and `<a>` CTA elements across public pages for missing hover feedback
  - Add consistent hover states using Tailwind utility classes:
    - Buttons: `hover:opacity-90 transition-opacity` or `hover:bg-primary-dark transition-colors` for primary buttons
    - Links/CTAs: `hover:text-primary transition-colors` for text links
    - Cards: `hover:shadow-lg transition-shadow` for clickable cards
  - Use the `cn()` utility from `lib/utils.ts` to merge classes properly
  - Primary color: `#FDB813` (bg-primary), Dark variant: `#E5A410` (bg-primary-dark)
  - Focus on these key components:
    - Hero carousel arrows and dots
    - All "MORE" or "자세히 보기" buttons
    - Contact/inquiry CTAs
    - Product cards
    - Project cards
    - Footer links

  **Must NOT do**:
  - Do not change button text or layout
  - Do not add new animation libraries
  - Do not modify admin panel buttons

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Requires visual design sense for consistent hover patterns
  - **Skills**: [`playwright`]
    - `playwright`: Must verify hover states are visible

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 7, 8, 9)
  - **Blocks**: Task 12
  - **Blocked By**: Task 3 (header buttons may change)

  **References**:
  **Pattern References**:
  - `lib/utils.ts` — `cn()` helper for Tailwind class merging
  - `tailwind.config.ts` — Primary color: `#FDB813`, Primary dark: `#E5A410`
  - `components/sections/HeroCarouselClientComponent.tsx` — Carousel prev/next buttons
  - `components/layout/Header.tsx` — Social icon links in header
  - `components/layout/Footer.tsx` — Footer links
  - `app/products/page.tsx` — Product cards
  - `app/projects/page.tsx` — Project cards

  **WHY Each Reference Matters**:
  - cn() must be used for all class additions to avoid Tailwind conflicts
  - Primary colors define the hover color palette
  - Each component listed needs hover state audit

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Buttons have visible hover feedback
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Navigate to http://localhost:3001
      2. Hover over hero carousel next arrow button
      3. Assert CSS transition or opacity change occurs
      4. Navigate to /products
      5. Hover over a product card
      6. Assert shadow or scale change occurs
      7. Take screenshots of hover states
    Expected Result: All interactive elements show visual feedback on hover
    Failure Indicators: No visual change on hover (same computed style)
    Evidence: .sisyphus/evidence/task-6-hover-states.png

  Scenario: Footer links have hover effect
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Navigate to http://localhost:3001
      2. Scroll to footer
      3. Hover over "개인정보 처리방침" link
      4. Assert text color changes on hover
    Expected Result: Link text color changes on hover
    Evidence: .sisyphus/evidence/task-6-footer-hover.png
  ```

  **Commit**: YES (groups with Wave 2)
  - Message: `fix(ui): add consistent hover states to buttons and CTAs`
  - Files: Multiple component files
  - Pre-commit: `npm run build`

- [ ] 7. Fix Homepage Video Section

  **What to do**:
  - `components/sections/VideoSection.tsx` has an empty iframe (`src=""`) and non-functional play button
  - Three TODOs exist: video play logic, video thumbnail, video embed
  - User confirmed: no video URL available. Implement a **polished placeholder**:
    - Replace the empty iframe with an elegant visual:
      - Use a gradient or solid dark background (match site aesthetics)
      - Show a centered play icon (lucide-react `Play` or `PlayCircle`)
      - Add subtle text like "영상 준비 중입니다" in a refined, minimal style
      - The section should look intentional and designed, not broken
    - Remove the empty iframe and broken play button logic
    - Keep the section visible but make it look polished
  - Ensure responsive on both desktop and mobile

  **Must NOT do**:
  - Do not remove VideoSection component entirely (just fix its visual state)
  - Do not add external video player libraries

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Requires designing a polished placeholder or proper video embed
  - **Skills**: [`playwright`]
    - `playwright`: Must verify video section looks correct

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 6, 8, 9)
  - **Blocks**: Task 12
  - **Blocked By**: None

  **References**:
  **Pattern References**:
  - `components/sections/VideoSection.tsx` — The broken component with 3 TODOs
  - `app/page.tsx` — Homepage where VideoSection is rendered (check section order)

  **WHY Each Reference Matters**:
  - VideoSection.tsx is the file to fix — contains empty iframe at line 44
  - page.tsx shows where VideoSection sits in the homepage layout

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Video section is not broken/empty
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Navigate to http://localhost:3001
      2. Scroll to video section area
      3. Assert NO empty iframe visible (src="")
      4. Assert section has visible content (image, text, or video)
      5. Take screenshot of video section
    Expected Result: Video section shows polished content (no broken/empty elements)
    Failure Indicators: Empty iframe, broken video icon, or completely blank section
    Evidence: .sisyphus/evidence/task-7-video-section.png

  Scenario: Video section responsive on mobile
    Tool: Playwright
    Preconditions: Dev server running, viewport 375px
    Steps:
      1. Navigate to http://localhost:3001 with mobile viewport
      2. Scroll to video section
      3. Assert section renders properly without overflow
    Expected Result: Video section fits mobile viewport
    Evidence: .sisyphus/evidence/task-7-video-mobile.png
  ```

  **Commit**: YES (groups with Wave 2)
  - Message: `fix(ui): fix homepage video section display`
  - Files: `components/sections/VideoSection.tsx`
  - Pre-commit: `npm run build`

- [ ] 8. Improve Footer Social Icons Visibility

  **What to do**:
  - In `components/layout/Footer.tsx`, improve social media icon visibility
  - Current state: Social icons (blog, Instagram, YouTube) exist but are not prominent
  - Changes:
    - Increase icon size if too small
    - Add hover effect (color change or scale)
    - Ensure sufficient contrast against footer background
    - Verify icons are visible on both desktop and mobile
  - Reference the Header.tsx social icons for consistent styling

  **Must NOT do**:
  - Do not change footer layout structure
  - Do not add new social platforms
  - Do not modify footer text content

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Visual styling improvement
  - **Skills**: [`playwright`]
    - `playwright`: Must verify icons are visible

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 6, 7, 9)
  - **Blocks**: Task 12
  - **Blocked By**: None

  **References**:
  **Pattern References**:
  - `components/layout/Footer.tsx` — Footer component with social icons
  - `components/layout/Header.tsx:~290-310` — Header social icons for style reference

  **WHY Each Reference Matters**:
  - Footer.tsx is the target file
  - Header social icons provide the reference styling for consistency

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Social icons are visible in footer
    Tool: Playwright
    Preconditions: Dev server running
    Steps:
      1. Navigate to http://localhost:3001
      2. Scroll to footer
      3. Locate social icon elements
      4. Assert icons are visible (computed opacity > 0, size >= 20px)
      5. Take screenshot of footer with icons
    Expected Result: Social icons clearly visible with sufficient size and contrast
    Evidence: .sisyphus/evidence/task-8-footer-icons.png

  Scenario: Social icons have hover effect
    Tool: Playwright
    Preconditions: Footer visible
    Steps:
      1. Hover over each social icon
      2. Assert visual change occurs (color, scale, or opacity)
    Expected Result: Icons show hover feedback
    Evidence: .sisyphus/evidence/task-8-icons-hover.png
  ```

  **Commit**: YES (groups with Wave 2)
  - Message: `fix(ui): improve footer social icon visibility and hover states`
  - Files: `components/layout/Footer.tsx`
  - Pre-commit: `npm run build`

- [ ] 9. Fix Mobile CTA Visibility

  **What to do**:
  - Playwright audit found 0 visible CTA buttons on mobile viewport (375px)
  - Investigate why CTAs are hidden on mobile and fix:
    - Check for `hidden` / `lg:block` classes that hide CTAs on small screens
    - Ensure key CTAs (inquiry, contact, product details) are accessible on mobile
    - If CTAs are in hero section, ensure they're visible above the fold
    - Check mobile-specific button sizing (min 44px touch target)
  - Key pages to check: homepage, products, support, bespoke

  **Must NOT do**:
  - Do not add new CTA buttons (just make existing ones visible)
  - Do not change CTA text or links

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Mobile responsive design fix
  - **Skills**: [`playwright`]
    - `playwright`: Must verify on 375px viewport

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 6, 7, 8)
  - **Blocks**: Task 12
  - **Blocked By**: Task 4 (mobile menu changes may affect CTA layout)

  **References**:
  **Pattern References**:
  - `app/page.tsx` — Homepage with hero section CTAs
  - `components/sections/HeroCarouselClientComponent.tsx` — Hero carousel buttons
  - `app/products/page.tsx` — Product page CTAs
  - `app/support/page.tsx` — Support page inquiry CTAs
  - CLAUDE.md: "반응형 브레이크포인트: 모바일 우선, lg: (1024px+)에서 데스크톱 전용 레이아웃"

  **WHY Each Reference Matters**:
  - Each page may have CTAs hidden via responsive classes
  - CLAUDE.md confirms mobile-first approach with lg: breakpoint

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: CTAs visible on mobile homepage
    Tool: Playwright
    Preconditions: Dev server running, viewport 375px
    Steps:
      1. Navigate to http://localhost:3001 with viewport { width: 375, height: 667 }
      2. Count visible button/CTA elements on page
      3. Assert at least 1 CTA button is visible above the fold
      4. Assert button touch target >= 44px height
      5. Take screenshot
    Expected Result: At least 1 CTA button visible on mobile homepage
    Evidence: .sisyphus/evidence/task-9-mobile-cta.png

  Scenario: CTAs visible on mobile products page
    Tool: Playwright
    Preconditions: Viewport 375px
    Steps:
      1. Navigate to http://localhost:3001/products
      2. Look for inquiry/contact CTA
      3. Assert CTA is visible and tappable
    Expected Result: Product page CTA accessible on mobile
    Evidence: .sisyphus/evidence/task-9-mobile-products-cta.png
  ```

  **Commit**: YES (groups with Wave 2)
  - Message: `fix(ui): ensure mobile CTAs are visible and tappable`
  - Files: Multiple page/component files
  - Pre-commit: `npm run build`

- [ ] 10. Add Page-Level Metadata to 12 Pages

  **What to do**:
  - Add `export const metadata: Metadata` to each page.tsx that's missing it:
    1. `app/page.tsx` — title: "위트(weet) - 시스템 모듈러 건축", description about modular construction
    2. `app/products/page.tsx` — title: "제품 소개 | 위트(weet)"
    3. `app/modular/page.tsx` — title: "모듈러건축 소개 | 위트(weet)"
    4. `app/bespoke/page.tsx` — title: "BESPOKE | 위트(weet)"
    5. `app/solution/page.tsx` — title: "솔루션 | 위트(weet)"
    6. `app/solution/cctv/page.tsx` — title: "시큐리티 | 위트(weet)"
    7. `app/solution/network/page.tsx` — title: "네트워크 | 위트(weet)"
    8. `app/solution/iot/page.tsx` — title: "IoT | 위트(weet)"
    9. `app/solution/design/page.tsx` — title: "디자인 | 위트(weet)"
    10. `app/support/page.tsx` — title: "고객지원 | 위트(weet)"
    11. `app/company/page.tsx` — title: "회사소개 | 위트(weet)"
    12. `app/projects/[id]/page.tsx` — dynamic title from project data (use generateMetadata)
  - Some pages already have metadata in their layout.tsx — check for conflicts and prefer page-level metadata
  - Each metadata should include: title, description (Korean)

  **Must NOT do**:
  - Do not change layout.tsx metadata (page metadata will override)
  - Do not modify page content or layout

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Repetitive metadata addition across files
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Task 11)
  - **Blocks**: Task 11, Task 12
  - **Blocked By**: None

  **References**:
  **Pattern References**:
  - `app/layout.tsx` — Root layout with base metadata template
  - `app/modular/layout.tsx` — Example of layout-level metadata (follow this pattern)
  - `app/products/layout.tsx` — Another layout metadata example

  **WHY Each Reference Matters**:
  - Root layout shows the metadata template pattern
  - Existing layout metadata shows the title/description format to follow

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: All pages have title metadata
    Tool: Bash (curl)
    Preconditions: Dev server running
    Steps:
      1. curl http://localhost:3001 | grep '<title>'
      2. curl http://localhost:3001/products | grep '<title>'
      3. curl http://localhost:3001/company | grep '<title>'
      4. curl http://localhost:3001/support | grep '<title>'
      5. Verify each has a unique, non-empty title
    Expected Result: Each page has unique <title> tag with Korean content
    Failure Indicators: Empty title, duplicate titles, or missing title tag
    Evidence: .sisyphus/evidence/task-10-page-titles.txt
  ```

  **Commit**: YES (groups with Wave 3)
  - Message: `fix(seo): add page-level metadata to all pages`
  - Files: 12 page.tsx files
  - Pre-commit: `npm run build`

- [ ] 11. Add OG Meta Tags to All Pages

  **What to do**:
  - Add `openGraph` and `twitter` metadata to each page/layout metadata export:
    - `openGraph.title` — Same as page title
    - `openGraph.description` — Same as page description
    - `openGraph.images` — Use a default OG image (create a simple one or use existing site logo/hero image)
    - `openGraph.url` — Page URL
    - `openGraph.siteName` — "위트(weet)"
    - `twitter.card` — "summary_large_image"
    - `twitter.images` — Same as OG image
  - For the OG image: Use an existing image from the public/ folder or Supabase storage as a default
  - If no suitable image exists, set the metadata structure without images (better than nothing)
  - Apply to root layout.tsx for site-wide defaults, then override on specific pages if needed

  **Must NOT do**:
  - Do not create new image assets (use existing)
  - Do not install image generation libraries

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Metadata configuration, repetitive across files
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Task 10)
  - **Blocks**: Task 12
  - **Blocked By**: Task 10 (page metadata should exist first)

  **References**:
  **Pattern References**:
  - `app/layout.tsx` — Root layout where default OG tags go
  - `app/modular/layout.tsx` — Example metadata to extend with OG tags
  - `public/` — Check for existing images usable as OG default

  **External References**:
  - Next.js Metadata docs: openGraph and twitter fields

  **WHY Each Reference Matters**:
  - Root layout is where site-wide OG defaults should be set
  - Existing layouts need OG tags added to their metadata

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: OG meta tags present on homepage
    Tool: Bash (curl)
    Preconditions: Dev server running
    Steps:
      1. curl http://localhost:3001 | grep 'og:title'
      2. curl http://localhost:3001 | grep 'og:description'
      3. curl http://localhost:3001 | grep 'og:image'
      4. curl http://localhost:3001 | grep 'twitter:card'
    Expected Result: All 4 OG/Twitter meta tags present
    Failure Indicators: Missing og:title, og:description, or twitter:card
    Evidence: .sisyphus/evidence/task-11-og-tags.txt

  Scenario: OG tags on subpages
    Tool: Bash (curl)
    Preconditions: Dev server running
    Steps:
      1. curl http://localhost:3001/products | grep 'og:title'
      2. curl http://localhost:3001/company | grep 'og:title'
    Expected Result: Subpages have their own OG titles (not just root)
    Evidence: .sisyphus/evidence/task-11-subpage-og.txt
  ```

  **Commit**: YES (groups with Wave 3)
  - Message: `fix(seo): add OG and Twitter meta tags to all pages`
  - Files: `app/layout.tsx` + layout/page files
  - Pre-commit: `npm run build`

- [ ] 12. Build Verification + Full-Site Playwright QA

  **What to do**:
  - Run `npm run build` and verify zero errors
  - Run comprehensive Playwright QA across all pages:
    1. Homepage: hero carousel, video section, partners, gallery, footer
    2. Products: sidebar, product cards, filtering
    3. Company: all sections load, no placeholder text
    4. Support: FAQ, inquiry form
    5. Projects: project list, project detail
    6. Modular/Bespoke/Solution: pages load correctly
  - Test at both desktop (1440px) and mobile (375px) viewports
  - Capture screenshots as evidence for each page
  - Verify all Wave 1-3 changes work together (integration)

  **Must NOT do**:
  - Do not fix issues found — just document them as evidence
  - Do not modify any code

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: Comprehensive QA across entire site
  - **Skills**: [`playwright`]
    - `playwright`: Core tool for all browser testing

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 4 (sequential — after all implementation)
  - **Blocks**: F1-F4
  - **Blocked By**: Tasks 1-11 (all must complete)

  **References**:
  - All files modified in Tasks 1-11
  - Dev server: http://localhost:3001
  - Production: https://we-et.com (verify after push)

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Build succeeds
    Tool: Bash
    Steps:
      1. Run `npm run build` in project directory
      2. Assert exit code 0
      3. Assert no TypeScript errors in output
    Expected Result: Build succeeds with 0 errors
    Evidence: .sisyphus/evidence/task-12-build.txt

  Scenario: All pages load without errors (desktop)
    Tool: Playwright
    Steps:
      1. Navigate to each of: /, /products, /company, /support, /projects, /modular, /bespoke, /solution
      2. Assert no console errors (filter: ignore 3rd party script errors)
      3. Assert page loads within 5 seconds
      4. Take screenshot of each page
    Expected Result: All 8 pages load successfully
    Evidence: .sisyphus/evidence/task-12-desktop-*.png

  Scenario: All pages load without errors (mobile)
    Tool: Playwright
    Steps:
      1. Set viewport to { width: 375, height: 667 }
      2. Navigate to /, /products, /company, /support
      3. Take screenshot of each
    Expected Result: All pages responsive on mobile
    Evidence: .sisyphus/evidence/task-12-mobile-*.png

  Scenario: Navigation dropdown works
    Tool: Playwright
    Steps:
      1. Navigate to http://localhost:3001
      2. Hover over each main menu item
      3. Assert dropdown appears for items with children
    Expected Result: All dropdowns functional
    Evidence: .sisyphus/evidence/task-12-navigation.png
  ```

  **Commit**: NO (verification only)

---

## Final Verification Wave

> 4 review agents run in PARALLEL. ALL must APPROVE. Rejection → fix → re-run.

- [ ] F1. **Plan Compliance Audit** — `oracle`
  Read the plan end-to-end. For each "Must Have": verify implementation exists (read file, curl endpoint, run command). For each "Must NOT Have": search codebase for forbidden patterns — reject with file:line if found. Check evidence files exist in .sisyphus/evidence/. Compare deliverables against plan.
  Output: `Must Have [N/N] | Must NOT Have [N/N] | Tasks [N/N] | VERDICT: APPROVE/REJECT`

- [ ] F2. **Code Quality Review** — `unspecified-high`
  Run `npx tsc --noEmit` + `npm run build`. Review all changed files for: `as any`/`@ts-ignore`, empty catches, console.log in prod, commented-out code, unused imports. Check AI slop: excessive comments, over-abstraction, generic names.
  Output: `Build [PASS/FAIL] | Lint [PASS/FAIL] | Files [N clean/N issues] | VERDICT`

- [ ] F3. **Real Manual QA** — `unspecified-high` (+ `playwright` skill)
  Start from clean state. Navigate to we-et.com. Execute EVERY QA scenario from EVERY task — follow exact steps, capture evidence. Test cross-task integration. Test edge cases: empty state, invalid input, rapid actions. Save to `.sisyphus/evidence/final-qa/`.
  Output: `Scenarios [N/N pass] | Integration [N/N] | Edge Cases [N tested] | VERDICT`

- [ ] F4. **Scope Fidelity Check** — `deep`
  For each task: read "What to do", read actual diff (git log/diff). Verify 1:1 — everything in spec was built, nothing beyond spec was built. Check "Must NOT do" compliance. Detect cross-task contamination. Flag unaccounted changes.
  Output: `Tasks [N/N compliant] | Contamination [CLEAN/N issues] | Unaccounted [CLEAN/N files] | VERDICT`

---

## Commit Strategy

- **Wave 1 complete**: `fix(ui): enable image optimization and fix navigation dropdown`
- **Wave 2 complete**: `fix(ui): add hover states, fix video section, improve footer icons`
- **Wave 3 complete**: `fix(seo): add page metadata and OG tags`
- **Wave 4 complete**: `chore: verify build and full-site QA`

---

## Success Criteria

### Verification Commands
```bash
npm run build  # Expected: Build successful, no errors
```

### Final Checklist
- [ ] 데스크톱 서브메뉴 호버 시 드롭다운 표시됨
- [ ] 모바일 메뉴 아코디언 구조로 작동
- [ ] 비디오 섹션 깨져 보이지 않음
- [ ] 모든 버튼에 호버 상태 존재
- [ ] 이미지 최적화 활성화
- [ ] OG 메타 태그 존재
- [ ] "준비중" 플레이스홀더 없음
- [ ] `npm run build` 성공

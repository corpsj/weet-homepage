# weet:) Redesign V2 Continuation Handoff

Last updated: 2026-03-07 (Asia/Seoul)
Owner at time of writing: orchestration agent
Worktree: `/Users/zoopark-studio/Documents/dev/weet-homepage`
Branch: `redesign`

---

## 0) Document Purpose

This document is a high-detail continuation handoff for **any next agent** to resume work immediately without context loss.

It includes:
- exact current repo state (committed and uncommitted)
- what is finished vs in-progress
- architecture and route decisions already made
- known deviations from plan and risks
- detailed next execution plan with command-level verification

---

## 1) Ground Truth Snapshot (Current Repo State)

### 1.1 Git snapshot

Command evidence:
- `git status -sb`

Current result:
- Branch: `redesign`
- Tracking: `origin/redesign`
- Ahead by: `4` commits
- Working tree: **dirty** (7 modified files + 6 untracked files)

### 1.2 Build snapshot

Command evidence:
- `npm run build`

Current result:
- `Compiled successfully`
- `Generating static pages ... (33/33)`
- Build status: **PASS**

### 1.3 Current redesign route structure

`app/(redesign)/`
- `layout.tsx`
- `home/`
- `system/`
- `products-v2/`
- `projects-v2/`
- `bespoke-v2/`
- `solutions/`
- `company-v2/`
- `support-v2/`
- `my/tracking/`

---

## 2) Committed Progress (What is Done and Already Committed)

The following commits are on `redesign` and already created:

1. `e1bd356`
   - Message: `feat(design-system): shadcn init + design tokens + typography + animation system`
   - Scope:
     - shadcn init (`components.json`)
     - Tailwind/theme base setup
     - global typography and utility classes
     - animation primitives + transition components

2. `dc8e808`
   - Message: `feat(layout): HeaderV2 + FooterV2 V2 redesign + layout shell + chatbot V2 brand`
   - Scope:
     - `components/layout/HeaderV2.tsx`
     - `components/layout/FooterV2.tsx`
     - `app/(redesign)/layout.tsx`
     - chatbot language update toward V2 terminology

3. `e0fd711`
   - Message: `feat(pages): Wave 3 core pages — home, system, products-v2, projects-v2, 시공사례`
   - Scope:
     - core V2 pages (home/system/products/projects-v2)
     - route group content expansion

4. `4dc9843`
   - Message: `feat(pages): Wave 4 remaining pages — bespoke, solutions, company, support, tracking`
   - Scope:
     - remaining V2 pages: bespoke, solutions, company, support, tracking

---

## 3) In-Progress (Uncommitted) Work Right Now

The current dirty working tree is primarily a **metadata/SEO split refactor**:

### 3.1 Modified files (7)
- `app/(redesign)/home/page.tsx`
- `app/(redesign)/system/page.tsx`
- `app/(redesign)/products-v2/page.tsx`
- `app/(redesign)/projects-v2/page.tsx`
- `app/(redesign)/bespoke-v2/page.tsx`
- `app/(redesign)/solutions/page.tsx`
- `app/(redesign)/company-v2/page.tsx`

These were changed from large client pages to short **server wrappers** with `export const metadata` + client component import.

### 3.2 New untracked files (6)
- `app/(redesign)/home/home-client.tsx`
- `app/(redesign)/system/system-client.tsx`
- `app/(redesign)/projects-v2/projects-v2-client.tsx`
- `app/(redesign)/bespoke-v2/bespoke-v2-client.tsx`
- `app/(redesign)/solutions/solutions-client.tsx`
- `app/(redesign)/company-v2/company-v2-client.tsx`

### 3.3 Not yet split (still client page.tsx)

Search evidence:
- `grep "use client" app/(redesign)/**/page.tsx`

Still client pages:
- `app/(redesign)/support-v2/page.tsx`
- `app/(redesign)/my/tracking/page.tsx`

Implication:
- metadata server-wrapper pattern has started but is not complete across all redesign pages.

---

## 4) Implemented Architecture and Decisions

### 4.1 V2 navigation and route decision

File:
- `lib/navigation.ts`

Current nav:
- 홈 -> `/home`
- 시스템건축 -> `/system`
- 제품 -> `/products-v2`
- 시공사례 -> `/projects-v2`
- 비스포크 -> `/bespoke-v2`
- 솔루션 -> `/solutions`
- 회사소개 -> `/company-v2`
- 고객지원 -> `/support-v2`

Why `/projects-v2` (important):
- There is already an existing legacy route at `app/projects/`.
- Attempting `app/(redesign)/projects` caused route collision (`two parallel pages resolve to same path`).
- To keep legacy routes intact and unblock redesign implementation, V2 uses `/projects-v2`.

### 4.2 Redesign layout shell

File:
- `app/(redesign)/layout.tsx`

Current composition:
- `KakaoProvider`
- `HeaderV2`
- `<main className="min-h-screen pt-20">` with `PageTransition`
- `FooterV2`
- `FloatingKakaoCTA`
- `AIChatbot`
- `Toaster`

### 4.3 Header/Footer implementation status

`HeaderV2`:
- Desktop: shadcn `NavigationMenu`
- Mobile: shadcn `Sheet`
- Active route highlight
- Scroll shrink/hide behavior
- uses V2 navigation map

`FooterV2`:
- dark theme section
- company info and social links
- nav links from `V2_NAV_ITEMS`
- shadcn `Separator`

### 4.4 Design token state

File:
- `lib/design-tokens.ts`

Primary palette currently encoded:
- accent `#FFCA0D`
- primary dark `#2D2D2A`
- background `#FAFAFA`

---

## 5) Functional Status by Page (As Implemented)

## 5.1 Done pages

1) `home`
- full hero + value proposition + product preview + CTA sections

2) `system`
- system architecture concept + two-division explanation + process

3) `products-v2`
- dual navigation concept (purpose/size)
- dedicated client file pattern already used

4) `projects-v2`
- portfolio grid + category filter UI + process + CTA

5) `bespoke-v2`
- custom-usecases + process + quote form UI

6) `solutions`
- smart solution cards and CTA

7) `company-v2`
- company narrative, values, milestones, contacts

8) `support-v2`
- contact methods + FAQ accordion + inquiry form UI

9) `my/tracking`
- mock order tracking UI with step timeline

### 5.2 Current form integration reality

Important:
- `support-v2` and `bespoke-v2` forms currently behave as **local client mock** (`submitted` state) and do not yet call server action.
- Plan constraint says public forms should use:
  - `app/actions/submit-inquiry.ts` -> `submitInquiry()`

So this is a pending functional integration item.

---

## 6) Known Gaps / Risks / Deviations

1) Metadata split in progress (dirty tree)
- 7 wrappers + 6 new client files are not committed yet.
- support/tracking pages still unsplit (`use client` in page.tsx).

2) Route naming deviation
- Plan text references `/projects` in some places.
- Actual implementation uses `/projects-v2` to avoid collision with existing `app/projects`.

3) Chatbot stale link
- File: `components/ui/AIChatbot.tsx`
- `autoReplies['현장건축']` currently points to `/projects`.
- Should be updated to `/projects-v2` if V2 route strategy remains.

4) Palette consistency check needed
- `FloatingKakaoCTA` uses `#FEE500` for Kakao brand circle.
- Project accent standard is `#FFCA0D`.
- Decision needed: keep Kakao yellow as brand exception vs unify to accent.

5) Plan-level unfinished wave
- Wave 5 (T22~T27) and Final verification (F1~F4) not completed yet.

6) Pre-existing non-blocking legacy diagnostics
- Known legacy lint/LSP issues exist in old V1 files (`app/layout.tsx`, `components/layout/Header.tsx`, etc.) and are not introduced by this V2 work.

---

## 7) Remaining Work (Detailed Execution Plan)

Below is the practical run order for the next agent.

## Phase A - Stabilize current WIP and commit it

Goal:
- finish metadata split cleanly and commit one atomic unit.

Steps:
1. Complete server/client split for two remaining pages:
   - `app/(redesign)/support-v2/page.tsx` -> wrapper + `support-v2-client.tsx`
   - `app/(redesign)/my/tracking/page.tsx` -> wrapper + `tracking-client.tsx`

2. Ensure all redesign page wrappers export Korean metadata.

3. Verify:
   - `npm run build`
   - quick grep:
     - `grep "use client" app/(redesign)/**/page.tsx` should return no lines

4. Commit (recommended):
- message example: `feat(seo): split redesign pages into server wrappers with metadata`

## Phase B - Functional integrations still missing

Goal:
- move from demo UX to actual inquiry flow.

Tasks:
1. `support-v2` form -> integrate `submitInquiry()` server action
2. `bespoke-v2` form -> integrate `submitInquiry()` server action
3. keep admin-only action untouched (`inquiry-actions.ts` not used for public)
4. add success/failure UX via `sonner` toast

Validation:
- submit required fields
- verify success state
- verify failure state
- `npm run build`

## Phase C - Wave 5 plan tasks (from `redesign-v2.md`)

### T22 Easter eggs
- Konami code trigger and non-blocking visual effect

### T23 SEO/metadata completion
- all redesign pages metadata consistency
- OG tags
- organization JSON-LD on company page

### T24 Performance
- dynamic import for heavy client widgets
- loading skeletons
- image optimization checks

### T25 Mobile QA @375
- no horizontal overflow
- touch target >= 44px
- all major interactions verified

### T26 Copy audit
- zero forbidden vocabulary (`모듈러`, payment/lease/installment terms, English purchase UX text)

### T27 Vitest
- test files for tokens/navigation/types/filter/form validation

## Phase D - Final verification wave (F1~F4)

As defined in plan:
- F1 plan compliance audit
- F2 code quality review (build/lint/tests)
- F3 manual QA with Playwright
- F4 scope fidelity check

All must be evidence-backed before final completion claim.

---

## 8) Exact Remaining Task Definitions (Plan References)

Source:
- `/Users/zoopark-studio/Documents/dev/weet-homepage/.sisyphus/plans/redesign-v2.md`

Open tasks at lines:
- T22 line ~2144
- T23 line ~2202
- T24 line ~2265
- T25 line ~2330
- T26 line ~2393
- T27 line ~2452
- F1~F4 line ~2520 onward

Use these sections directly as acceptance criteria/checklist.

---

## 9) Immediate Next-Agent Runbook (First 60 Minutes)

0. Confirm mode
- Continue from current repo state and active plan.

1. Baseline
- `git status -sb`
- `npm run build`

2. Finish metadata split for support/tracking
- create two client files
- replace two page wrappers with metadata exports

3. Fix known stale link
- `components/ui/AIChatbot.tsx`:
  - `/projects` -> `/projects-v2`

4. Verify and commit
- build pass
- commit WIP split

5. Start Phase B (form action integration)

---

## 10) Commands to Reproduce/Validate Current State

```bash
# repo root
cd /Users/zoopark-studio/Documents/dev/weet-homepage

# current branch/dirty state
git status -sb

# recent commits
git log --oneline -12

# redesign route tree
ls app/\(redesign\)/

# check page.tsx client residues
grep -R "use client" app/\(redesign\) --include="page.tsx"

# build
npm run build
```

---

## 11) Non-Negotiable Guardrails (Must Keep)

1. Do not touch:
- `app/admin/`
- `components/admin/`
- `types/supabase.ts` schema types

2. Public forms:
- must use `app/actions/submit-inquiry.ts` (`submitInquiry`)

3. Language/content guardrails:
- avoid `모듈러건축` in V2 UX copy
- no monthly payment/installment/lease/deposit/payment flow language
- Korean UX wording first

4. Theming:
- keep Tailwind v3 + shadcn HSL variable model

---

## 12) Agent Handoff Note (Plain-English)

If you are the next agent:
- the foundation and all major V2 pages are implemented
- build is green
- the only active WIP is metadata split cleanup + remaining polish/final verification wave
- do not restart from scratch; continue from current tree and close the remaining checklist with evidence

---

## 13) Current Completion Estimate

Practical status estimate:
- Wave 1: done
- Wave 2: done
- Wave 3: done
- Wave 4: done
- Wave 5: not done
- Final verification: not done

Overall:
- implementation backbone complete
- release readiness pending polish/audit/test/QA wave

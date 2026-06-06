# GPT-5.5 Pro Review Request - Cycle 2

REVIEW_MARKER: WEET_UI_POLISH_REVIEW_20260607_0059

This is the second and final review cycle for the Weet UI polish task. You cannot see the local repo or previous browser state; all relevant context is below. The first review returned REVISE, and the concrete MUST_FIX items have now been applied.

Return only this exact format and include the same REVIEW_MARKER value:

~~~text
REVIEW_MARKER: WEET_UI_POLISH_REVIEW_20260607_0059
VERDICT: PASS | REVISE

CONTEXT_GAPS:
- ...

MUST_FIX:
- ...

OPTIONAL:
- ...

TESTS_TO_RUN:
- ...

RISK_NOTES:
- ...
~~~

---

## 1. Active task

~~~md
# Current Task: 위트 전체 UI 정밀 polish 및 랜딩 배경색 재조정

## Required workflow

Read `AGENTS.md` and `codex-loop.md` before implementation.

For frontend implementation, delegate the implementation step to Antigravity IDE/Gemini through Computer Use, then return to Codex for local diff inspection, validation, GPT-5.5 Pro review, and concrete `MUST_FIX` feedback application.

Before asking GPT-5.5 Pro for review:

1. Create `.codex/review-packet.md` from `.codex/review-template.md` when available, otherwise write an equivalent packet.
2. Include the full active task brief.
3. Include current repo state, git status, git diff, relevant file excerpts, commands run, and validation output.
4. Paste the full packet into GPT-5.5 Pro in Chrome.
5. Save the full response to `.codex/pro-review.md`.
6. Apply concrete `MUST_FIX` feedback only.
7. Repeat at most 2 Pro review cycles.

## Active task brief

Implement the complete Weet UI polish plan across public pages, legal pages, login, and admin.

### Design direction

- The site should feel like a balanced mix of Tesla-style product-led decision flow and a premium architectural showroom.
- Avoid making the page feel like a generic beige/tan landing page; the current warm landing background color is disliked and must be replaced.
- Use a quieter premium palette: clean white/off-white, charcoal, stone gray, muted yellow only as a restrained brand accent.
- Keep dominant text concise, confident, and product/action oriented.
- Use restrained functional motion: sticky navigation, accordion, selected states, and hover refinement; reduce large theatrical reveal or heavy zoom effects.
- Use stable dimensions and responsive constraints so text and UI never overlap or overflow.

### Public pages

- Rework the global header and footer to be quieter and more premium.
- Preserve the hidden `/admin` link on the word `True` in the footer phrase `WE make dreams comE True`, including the intentionally non-obvious hover/cursor behavior.
- Homepage first viewport must prioritize actual product signal and `나만의 위트 만들기` CTA.
- Homepage must keep the required H1 `위트 이동식주택`, required subcopy `작고 단단한 내 집을 필요한 크기와 옵션으로 직접 구성해보세요.`, no homepage prices, no hero trust chips, no mini configurator.
- `/products` keeps the desktop long storytelling scroll, but mobile must become product cards with collapsible description/spec/floorplan details.
- Add a soft `/customize` CTA such as `비슷한 구성 만들기` from product browsing, without making `/products` feel like a hard sales page.
- `/modular` should be rewritten as an educational landing page with stronger hierarchy and premium product-system logic.
- `/bespoke` should remove the visible `View Portfolio` buttons and keep the image modal/showcase behavior.
- `/solution` and solution detail pages should feel like a public-facing tech mini-system: segmented navigation, functional cards, compact modals, and premium but not decorative UI.
- `/projects` should continue showing all project data, but missing images and incomplete/test-like entries must be presented with premium placeholders rather than raw `No Image` styling.
- `/support` should use stronger real/support imagery or limited generated material/process-detail visuals only where existing assets are weak.
- `/company`, `/privacy`, `/terms`, and `/login` should be brought into the same visual system.

### Legal pages

- Rewrite `/privacy` using the actual project data flows: customize consultations, legacy inquiries, Supabase auth/admin cookies, GA/Clarity/Vercel Analytics if configured, and manually deleted admin-managed personal data.
- Rewrite `/terms` as a service-specific draft for website use, customize consultation, estimate/installation finalization, content rights, limitations, and user obligations.
- Do not add visible “legal review needed” copy to the pages or state file.

### Admin

- Admin should be a dense, efficient operations console, not a marketing dashboard.
- Make the admin shell fully responsive across all admin routes.
- Mobile admin navigation should be top bar + drawer, while desktop keeps a sidebar.
- All listed admin routes must avoid horizontal overflow on mobile: dashboard, main CMS, products, customize, projects, support, insights, gallery, consultations, inquiries, UTM, settings.
- Convert fixed-width admin tables or data grids to mobile cards, stacked controls, horizontal-safe panels, or collapsible details as appropriate.
- Move risky/legacy settings actions such as data migration into a collapsed advanced/danger section with clearer warnings and confirmation.

### Image policy

- Use existing real product/company images first.
- If generated images are created, limit them to weak sections and use material/process/detail imagery. Face-free hands/tool details are allowed; avoid fake customer scenes or fake case-study data.

### Constraints

- Do not change DB schema or run migrations for this UI polish task.
- Do not delete or clean real database data.
- Do not touch unrelated `.kiro/` state.
- Keep existing `/customize` business rules and consultation submission behavior intact.
- Keep current security headers, admin auth, Supabase service-role boundaries, and review loop.

### Validation

- Run `npm run lint`, `npm run test`, `npm run build`, and `npx playwright test`.
- Add or update Playwright coverage for mobile overflow checks, product mobile accordions, footer hidden admin link preservation, and admin mobile drawer/access.
- Validate public and admin pages on desktop and mobile with browser/Playwright evidence.

## Assumptions

- The branch remains `zoo/customize-configurator`.
- Existing untracked `.kiro/` is unrelated and should not be committed.
- Existing `AGENTS.md` local modification belongs to the user/workspace and should not be reverted.
~~~

## 2. Current state

~~~md
# Codex State

## Active task

위트 전체 UI 정밀 polish 및 랜딩 배경색 재조정. Public pages, legal pages, login, and admin should be brought into a Tesla-inspired product-led premium architectural showroom/operations-console system.

## Current phase

pro-review

## Changes made

- Delegated the frontend implementation step to Antigravity IDE/Gemini and accepted the intended UI changes.
- Replaced the homepage beige/tan background system with white, gray, charcoal, and restrained muted yellow accents while preserving the required H1, subcopy, and customize CTA.
- Quieted global header/footer styling and preserved the hidden `/admin` link on the footer word `True` with default cursor behavior.
- Added mobile product cards with collapsible details and a soft `/customize` CTA while keeping desktop product storytelling.
- Polished `/modular`, `/bespoke`, `/solution`, solution detail image placeholders, `/projects`, `/support`, `/company`, `/login`, `/privacy`, and `/terms`.
- Added responsive `AdminShell` with mobile topbar/drawer, refined admin settings danger section, and made consultation manager rows mobile-safe.
- Applied Pro cycle 1 MUST_FIX: changed the mobile menu portal breakpoint from `lg:hidden` to `xl:hidden` and added a 1100px tablet header Playwright check.
- Applied Pro cycle 1 MUST_FIX: rewrote `/privacy` around actual customize consultations, legacy inquiries, Supabase auth/admin cookies, conditional Vercel/GA/Clarity analytics, and manual admin deletion.
- Applied Pro cycle 1 MUST_FIX: amended `/terms` with content/media usage rights and user-provided material obligations.
- Applied Pro cycle 1 MUST_FIX: kept the existing dangerous migration `confirm()` flow, strengthened its warning text, and added a Playwright assertion that the confirmation dialog appears and can be dismissed.

## Commands run

- `npm run lint`
- `npm run test`
- `npm run build`
- `E2E_ADMIN_ID=<redacted> E2E_ADMIN_PASSWORD=<redacted> npx playwright test`
- `E2E_ADMIN_ID=<redacted> E2E_ADMIN_PASSWORD=<redacted> npx playwright test e2e/public-pages.spec.ts -g 'mobile drawer opens'`
- `npx playwright test e2e/header-navigation.spec.ts -g 'mobile menu should have'`
- `git diff --check`
- Playwright DOM/screenshot evidence scripts against `http://127.0.0.1:3000`
- GPT-5.5 Pro cycle 1 review in Chrome with marker `WEET_UI_POLISH_REVIEW_20260607_0048`

## Current failures

- No current lint, unit test, build, or Playwright failures.
- `git diff --check` failed only against the previously generated `.codex/review-packet.md` text artifact, because that file embedded raw diff lines with trailing spaces. The cycle 2 packet will be regenerated and will exclude its own diff artifact from the embedded diff to avoid self-referential noise.
- Build continues to show the pre-existing Next.js warning that the `middleware` file convention is deprecated in favor of `proxy`.

## Pro review cycles

1

## Last Pro verdict

REVISE

## Applied Pro feedback

- Fixed the header lg-to-xl mobile menu breakpoint mismatch and added a tablet breakpoint E2E test.
- Rewrote `/privacy` to match actual code-level data flows and conditional analytics loading.
- Added content/media rights and user material obligations to `/terms`.
- Verified the dangerous data migration action uses an explicit confirmation dialog before execution.

## Skipped Pro feedback

- OPTIONAL: Legal-page negative assertion for “legal review needed” copy was not added because it was advisory.
- OPTIONAL: Remaining yellow/text-primary accents in solution detail CTAs were left unless already covered by existing UI polish.
- OPTIONAL: Products soft CTA raw anchor vs `Link` was left as advisory.

## Remaining risks

- `AGENTS.md` and `.kiro/` were already dirty/untracked before this task and remain unrelated to the UI implementation.
- The privacy/terms pages are service-specific drafts, not formal legal advice.
- Admin authenticated tests require `E2E_ADMIN_ID` and `E2E_ADMIN_PASSWORD`; the tests skip when those env vars are absent.
- Existing admin and support subcomponents outside the touched files still contain some older `rounded-xl`/placeholder styling, but mobile overflow checks passed across the required admin routes.

## Next step

Create the cycle 2 `.codex/review-packet.md`, ask GPT-5.5 Pro in Chrome for a second review, save the response, and stop if Pro returns `VERDICT: PASS` or after the second cycle per `codex-loop.md`.
~~~

## 3. Cycle 1 Pro response saved in .codex/pro-review.md

~~~md
REVIEW_MARKER: WEET_UI_POLISH_REVIEW_20260607_0048
VERDICT: REVISE

CONTEXT_GAPS:
- Full unchanged portions of `app/admin/settings/page.tsx` were not included, so I cannot verify whether `handleMigration` already has an explicit confirmation step.
- The actual runtime analytics configuration is not shown, so `/privacy` should phrase GA/Clarity/Vercel Analytics conditionally based on detected/configured use rather than overstate.

MUST_FIX:
- Fix the header mobile/tablet breakpoint mismatch. The mobile menu button is `xl:hidden`, desktop nav is `hidden xl:flex`, but the portal menu is `lg:hidden`; at `lg` to `xl` widths the button can appear while the opened menu remains hidden. Change the mobile menu portal/container breakpoint to match the button/nav split, e.g. `xl:hidden`, and add/extend a Playwright check around 1024-1279px.
- Rewrite `/privacy` again to match the required actual data flows. The current text is too generic and omits or misstates required items: customize consultations/configuration snapshots, legacy inquiries, Supabase auth/admin cookies, conditional GA/Clarity/Vercel Analytics, and manual admin-managed personal-data deletion. It also claims fields such as email/land area in the main 상담 신청 flow without showing that those are actually collected by the current customize form.
- Amend `/terms` to explicitly cover content rights/usage rights for site/project/product/media content, because the brief specifically required content rights and the current terms excerpt does not address them.
- Ensure the dangerous data migration action has an explicit confirmation step before execution. If `handleMigration` already confirms, include/keep it; if not, add a confirmation dialog or equivalent irreversible-action confirmation in addition to the collapsed danger section.

OPTIONAL:
- Add a small assertion that `/privacy` and `/terms` do not contain visible “legal review needed” copy, since that was an explicit constraint.
- Consider replacing remaining `text-primary`/yellow hover accents in solution detail CTAs with the restrained neutral/accent system if the visual pass still feels inconsistent.
- Consider using `Link` instead of raw `<a>` for the products soft `/customize` CTA to stay consistent with Next.js navigation conventions.

TESTS_TO_RUN:
- `npm run lint`
- `npm run test`
- `npm run build`
- `E2E_ADMIN_ID=<redacted> E2E_ADMIN_PASSWORD=<redacted> npx playwright test`
- Add and run a header navigation test at a tablet breakpoint such as 1100x800 to verify the hamburger opens a visible menu and `/customize` navigation works.
- Add/run a focused admin settings test that expands the danger section and verifies the migration action requires explicit confirmation before execution.

RISK_NOTES:
- The core UI polish direction appears broadly satisfied: homepage beige removal, required H1/subcopy/CTA preservation, no homepage prices/trust chips/mini configurator, footer hidden `/admin` link, product mobile accordion, public/admin mobile overflow checks, and admin drawer coverage are supported by the provided diff and validation.
- The remaining blockers are not broad design preferences; they are direct requirement gaps in breakpoint behavior, legal copy specificity, content rights coverage, and dangerous-action confirmation.
- `.kiro/` remains untracked and should stay out of the final commit unless the user explicitly asks otherwise.
- The `AGENTS.md` change may be intentional workspace guidance, but it is outside the UI implementation itself and should be reviewed carefully before inclusion.
~~~

## 4. What changed after cycle 1 MUST_FIX

- Header: mobile menu portal/container now uses xl:hidden, matching the xl breakpoint used by the hamburger button and desktop nav.
- Header tests: added a 1100x800 tablet breakpoint test proving the hamburger menu opens and the customize link navigates.
- Privacy: replaced the generic copy with code-specific data flows: customize consultation fields and configuration snapshots, legacy inquiries, Supabase auth/admin cookies, conditional Vercel Analytics/GA/Clarity, and manual admin deletion.
- Terms: added content/media usage rights, restrictions on copying project/product/media content, and user obligation to have rights to submitted materials.
- Admin settings: existing confirmation dialog was retained, warning copy strengthened, and Playwright now expands the danger section and verifies the confirm dialog appears before migration execution.

## 5. Project snapshot

- Branch: zoo/customize-configurator
- Stack: Next.js ^16.0.7, React ^19.0.0, TypeScript, Tailwind, Supabase, Playwright, Vitest.
- Key routes: /, /products, /modular, /bespoke, /solution, /solution/*, /projects, /support, /company, /privacy, /terms, /login, /admin/*
- No schema migrations or data migrations were run.
- Pre-existing unrelated state remains: AGENTS.md local modification and untracked .kiro/.

## 6. Repository state

### Git status

Captured before writing this cycle 2 packet. The packet file itself becomes modified after generation.

~~~text
 M .codex/current-task.md
 M .codex/pro-review.md
 M .codex/review-packet.md
 M .codex/state.md
 M AGENTS.md
 M app/admin/layout.tsx
 M app/admin/settings/page.tsx
 M app/bespoke/page.tsx
 M app/company/page.tsx
 M app/layout.tsx
 M app/login/page.tsx
 M app/modular/page.tsx
 M app/page.tsx
 M app/privacy/page.tsx
 M app/products/page.tsx
 M app/projects/[id]/page.tsx
 M app/projects/page.tsx
 M app/solution/page.tsx
 M app/support/page.tsx
 M app/terms/page.tsx
 M components/admin/AdminSidebar.tsx
 M components/admin/consultations/ConsultationManager.tsx
 M components/layout/ClientLayout.tsx
 M components/layout/Footer.tsx
 M components/layout/Header.tsx
 M components/solution/FeatureModal.tsx
 M components/solution/SolutionTemplate.tsx
 M e2e/header-navigation.spec.ts
 M e2e/public-pages.spec.ts
?? .kiro/
?? components/admin/AdminShell.tsx
~~~

### Changed files excluding this review packet self-diff

~~~text
.codex/current-task.md
.codex/pro-review.md
.codex/state.md
AGENTS.md
app/admin/layout.tsx
app/admin/settings/page.tsx
app/bespoke/page.tsx
app/company/page.tsx
app/layout.tsx
app/login/page.tsx
app/modular/page.tsx
app/page.tsx
app/privacy/page.tsx
app/products/page.tsx
app/projects/[id]/page.tsx
app/projects/page.tsx
app/solution/page.tsx
app/support/page.tsx
app/terms/page.tsx
components/admin/AdminSidebar.tsx
components/admin/consultations/ConsultationManager.tsx
components/layout/ClientLayout.tsx
components/layout/Footer.tsx
components/layout/Header.tsx
components/solution/FeatureModal.tsx
components/solution/SolutionTemplate.tsx
e2e/header-navigation.spec.ts
e2e/public-pages.spec.ts
.kiro/specs/customize-2/.config.kiro
.kiro/specs/customize-2/requirements.md
components/admin/AdminShell.tsx
~~~

### Diff stat excluding this review packet self-diff

~~~text
 .codex/current-task.md                             | 215 ++++++---------------
 .codex/pro-review.md                               | 106 ++--------
 .codex/state.md                                    |  85 ++++----
 AGENTS.md                                          |   2 +
 app/admin/layout.tsx                               |  11 +-
 app/admin/settings/page.tsx                        |  53 ++---
 app/bespoke/page.tsx                               |  23 ++-
 app/company/page.tsx                               |  14 +-
 app/layout.tsx                                     |   4 +-
 app/login/page.tsx                                 | 120 +++++++-----
 app/modular/page.tsx                               |  26 ++-
 app/page.tsx                                       |  64 +++---
 app/privacy/page.tsx                               | 135 ++++++++-----
 app/products/page.tsx                              | 143 ++++++++------
 app/projects/[id]/page.tsx                         |  29 ++-
 app/projects/page.tsx                              | 114 +++++------
 app/solution/page.tsx                              |  28 +--
 app/support/page.tsx                               |  92 +++++----
 app/terms/page.tsx                                 | 119 ++++++++----
 components/admin/AdminSidebar.tsx                  |   5 +-
 .../admin/consultations/ConsultationManager.tsx    |  48 +++--
 components/layout/ClientLayout.tsx                 |   2 +-
 components/layout/Footer.tsx                       |  18 +-
 components/layout/Header.tsx                       |  11 +-
 components/solution/FeatureModal.tsx               |  20 +-
 components/solution/SolutionTemplate.tsx           |  10 +-
 e2e/header-navigation.spec.ts                      |  23 ++-
 e2e/public-pages.spec.ts                           | 123 ++++++++++++
 28 files changed, 919 insertions(+), 724 deletions(-)
~~~

### Git diff excluding this review packet self-diff

~~~diff
diff --git a/.codex/current-task.md b/.codex/current-task.md
index 057def6..0ea97c2 100644
--- a/.codex/current-task.md
+++ b/.codex/current-task.md
@@ -1,12 +1,14 @@
-# Current Task: 위트 주문/홈페이지 전환 통합 구현
+# Current Task: 위트 전체 UI 정밀 polish 및 랜딩 배경색 재조정

 ## Required workflow

 Read `AGENTS.md` and `codex-loop.md` before implementation.

+For frontend implementation, delegate the implementation step to Antigravity IDE/Gemini through Computer Use, then return to Codex for local diff inspection, validation, GPT-5.5 Pro review, and concrete `MUST_FIX` feedback application.
+
 Before asking GPT-5.5 Pro for review:

-1. Create `.codex/review-packet.md` from `.codex/review-template.md`.
+1. Create `.codex/review-packet.md` from `.codex/review-template.md` when available, otherwise write an equivalent packet.
 2. Include the full active task brief.
 3. Include current repo state, git status, git diff, relevant file excerpts, commands run, and validation output.
 4. Paste the full packet into GPT-5.5 Pro in Chrome.
@@ -16,159 +18,68 @@ Before asking GPT-5.5 Pro for review:

 ## Active task brief

-Implement the complete Weet order/homepage transition plan.
-
-### Summary
-
-- Restore `/bespoke` to the public page from commit `3ae1ec0`.
-- Remove the incorrectly added BESPOKE option admin, server actions, local migration, dashboard/sidebar references, and generated types.
-- Build a new DB-driven `/customize` mobile-home configurator.
-- Rework the homepage around the flow: configuration entry, trust, consultation.
-- Replace the public inquiry-centered flow with the new consultation flow.
-- Rebuild `/support` as a purchase process, FAQ, and A/S reassurance page.
-- Manage Supabase directly: backup remote schema/migration state, add the new `customize`/consultation schema, apply migration, and regenerate types.
-- Use the GPT-5.5 Pro review loop before completion.
-- Run validation and push the final branch to GitHub.
-
-### `/bespoke`
-
-- Restore the public `/bespoke` page to `3ae1ec0:app/bespoke/page.tsx`.
-- Treat the restoration as public-page restoration only.
-- Remove wrong BESPOKE option management functionality.
-- Do not create a remote drop migration, because the wrong BESPOKE tables were not applied to remote Supabase.
-
-### `/customize`
-
-- Build the new order configurator at `/customize` using shadcn-style UI and lucide icons.
-- Desktop layout: floorplan/visual area 64%, option panel 36%.
-- Mobile layout: floorplan first, bottom `예상 총액` bar, option/order drawer.
-- Use a Tesla/Porsche-style vertical option panel.
-- Floorplan coordinate system: `1000x420`.
-- Compact 3x6 floorplan: `600x300`.
-- Standard 3x9 floorplan: `900x300`.
-- Keep the right edge fixed; expand left when switching from 3x6 to 3x9.
-- Do not show dimension labels.
-- Show labels only for selected objects.
-- Base included floorplan elements: 현관도어, 기본창, 싱크대, 욕실.
-- Design the overlay system around base floorplan image plus same-size transparent PNG overlays.
-- Model prices:
-  - Compact 3x6: `₩27,900,000부터`
-  - Standard 3x9: `₩34,900,000부터`
-- Use `예상 총액` consistently for total labels.
-- Show `운반·설치 별도` in the bottom bar and order modal.
-- Category list is fixed to 11 categories: 모델, 외장, 창호, 도어, 내장, 바닥재, 싱크대, 욕실, 가구, 에너지, 커넥티비티.
-- Option price display:
-  - Included option: `포함`
-  - Paid option: `₩1,000,000`
-  - Consult option: `상담`, counted as 0 in estimated total.
-- Option cards include name, price/consult badge, short description, and small info button.
-- Option info modal includes short explanation and image.
-- Option images appear in the info modal, not directly in cards.
-- Share URL uses a compressed `?c=` configuration string, not a human-readable slug.
-
-### Order modal and consultation form
-
-- Desktop modal layout is 2 columns.
-- Left column: selected floorplan.
-- Right column: model, selected options, total, form.
-- Primary action: `상담 요청`.
-- Secondary action: `견적 저장`.
-- Include `상담 후 최종 확정`.
-- Required fields: 이름, 연락처, 지역.
-- Optional fields:
-  - 구매 시기: `1개월 이내`, `3개월 이내`, `6개월 이내`, `올해 안`, `미정`
-  - 지목: `대지`, `전`, `답`, `임야`, `건물옥상`, `기타`
-  - 설치 주소
-  - 예산: `2,000만원 미만`, `2,000~3,000만원`, `3,000~4,000만원`, `4,000~5,000만원`, `5,000만원 이상`
-  - 메모
-
-### Homepage
-
-- Homepage H1: `위트 이동식주택`.
-- Hero subcopy: `작고 단단한 내 집을 필요한 크기와 옵션으로 직접 구성해보세요.`
-- Primary CTA: `나만의 위트 만들기`, linking to `/customize`.
-- Header navigation label for `/customize`: `주문하기`.
-- Do not show prices on the homepage.
-- Do not show hero trust chips.
-- Do not include a mini configurator on the homepage.
-- Section flow: hero configuration CTA, production process cards, site/installation check guidance, real gallery/company trust, consultation CTA.
-- Remove the `영상 준비 중입니다` section.
-- If generated images are used, use them only as temporary commercial visuals, not as actual case-study/gallery data.
-- Generated image direction: photorealistic, no people, strict 3m x 6m single transportable one-story module, one door, one or two windows, not a large villa or two-story house.
-
-### `/support`
-
-- Remove the public inquiry form.
-- H1: `진행 과정과 확인사항`.
-- Subcopy: `처음 준비하는 이동식주택도 막막하지 않도록, 진행 과정과 꼭 확인할 내용을 쉽게 정리했습니다.`
-- Sections: 구매 과정, FAQ, A/S 안내.
-- Purchase process steps: 구성, 상담 요청, 현장 확인, 견적·계약, 제작, 운반·설치.
-- Top and bottom CTA: `나만의 위트 만들기`.
-
-### Supabase schema
-
-- Before migration, inspect and back up remote Supabase schema dump and migration list.
-- Add:
-  - `customize_models`
-  - `customize_categories`
-  - `customize_options`
-  - `customize_option_conflicts`
-  - `customize_included_specs`
-  - `customize_consultations`
-- Korean option names/descriptions are required; English fields are optional.
-- Option deletion is soft deletion with `is_active=false`.
-- Save consultation snapshots in `config_snapshot JSONB`, including selected model, selected options, labels, prices, total, and floorplan/config state.
-- Seed the initial models, 11 categories, included specs, and default options in the migration.
-- Store images and overlays in Supabase Storage under the existing `images` bucket, `customize/` path.
-- Regenerate `types/supabase.ts` from the remote schema after migration.
-
-### Security and admin
-
-- Public users may read only active models, categories, options, and included specs.
-- Public users may insert consultation requests only.
-- Public users may not select, update, or delete consultation data.
-- Admin mutations use the existing `requireAdmin` pattern.
-- Server actions must use zod validation, length limits, phone/text normalization, server-side price recalculation, and upload MIME/extension/path/size limits.
-- Consultation personal data is manually deleted by admins only.
-- New consultation notifications are admin-screen only for this version.
-- Keep existing security headers, admin allowlist, upload restrictions, and service-role server-only usage.
+Implement the complete Weet UI polish plan across public pages, legal pages, login, and admin.
+
+### Design direction
+
+- The site should feel like a balanced mix of Tesla-style product-led decision flow and a premium architectural showroom.
+- Avoid making the page feel like a generic beige/tan landing page; the current warm landing background color is disliked and must be replaced.
+- Use a quieter premium palette: clean white/off-white, charcoal, stone gray, muted yellow only as a restrained brand accent.
+- Keep dominant text concise, confident, and product/action oriented.
+- Use restrained functional motion: sticky navigation, accordion, selected states, and hover refinement; reduce large theatrical reveal or heavy zoom effects.
+- Use stable dimensions and responsive constraints so text and UI never overlap or overflow.
+
+### Public pages
+
+- Rework the global header and footer to be quieter and more premium.
+- Preserve the hidden `/admin` link on the word `True` in the footer phrase `WE make dreams comE True`, including the intentionally non-obvious hover/cursor behavior.
+- Homepage first viewport must prioritize actual product signal and `나만의 위트 만들기` CTA.
+- Homepage must keep the required H1 `위트 이동식주택`, required subcopy `작고 단단한 내 집을 필요한 크기와 옵션으로 직접 구성해보세요.`, no homepage prices, no hero trust chips, no mini configurator.
+- `/products` keeps the desktop long storytelling scroll, but mobile must become product cards with collapsible description/spec/floorplan details.
+- Add a soft `/customize` CTA such as `비슷한 구성 만들기` from product browsing, without making `/products` feel like a hard sales page.
+- `/modular` should be rewritten as an educational landing page with stronger hierarchy and premium product-system logic.
+- `/bespoke` should remove the visible `View Portfolio` buttons and keep the image modal/showcase behavior.
+- `/solution` and solution detail pages should feel like a public-facing tech mini-system: segmented navigation, functional cards, compact modals, and premium but not decorative UI.
+- `/projects` should continue showing all project data, but missing images and incomplete/test-like entries must be presented with premium placeholders rather than raw `No Image` styling.
+- `/support` should use stronger real/support imagery or limited generated material/process-detail visuals only where existing assets are weak.
+- `/company`, `/privacy`, `/terms`, and `/login` should be brought into the same visual system.
+
+### Legal pages
+
+- Rewrite `/privacy` using the actual project data flows: customize consultations, legacy inquiries, Supabase auth/admin cookies, GA/Clarity/Vercel Analytics if configured, and manually deleted admin-managed personal data.
+- Rewrite `/terms` as a service-specific draft for website use, customize consultation, estimate/installation finalization, content rights, limitations, and user obligations.
+- Do not add visible “legal review needed” copy to the pages or state file.

 ### Admin

-- Add primary admin routes:
-  - `/admin/customize`
-  - `/admin/consultations`
-- `/admin/customize` tabs:
-  - Models
-  - Included Specs
-  - Categories
-  - Options
-  - Image Assets
-- Admin can add/edit/soft-delete options, sort, activate/deactivate, configure model availability, set single/multiple category behavior, manage conflicts, price type, info images, and floorplan overlays.
-- Admin image upload warns if dimensions are not `1000x420`, but does not block.
-- Consultation statuses: 신규, 진행중, 완료, 보류.
-- Consultation list columns: status, name, phone, region, memo, created_at.
-- Consultation detail prioritizes customer info, puts config details in a collapsible section, and supports internal memo.
-- Keep legacy `inquiries` data, but do not use it as the official new flow.
-- Optimize dashboard/admin loading by removing unnecessary BESPOKE counts and selecting only needed columns with parallel fetches.
-
-### Tests and validation
-
-- Run Supabase migration dry-run before applying.
-- Apply migration and confirm remote schema.
-- Regenerate Supabase types.
-- Validate option CRUD, soft deletion, model-specific option visibility, option conflicts, consultation snapshot storage.
-- Validate `/`, `/customize`, `/support`, `/bespoke`, `/admin/customize`, `/admin/consultations` on desktop and mobile.
-- Run:
-  - `npm run lint`
-  - `npm run test`
-  - `npm run build`
-  - Playwright key flows
-- Commit logical units and push the final branch to GitHub.
+- Admin should be a dense, efficient operations console, not a marketing dashboard.
+- Make the admin shell fully responsive across all admin routes.
+- Mobile admin navigation should be top bar + drawer, while desktop keeps a sidebar.
+- All listed admin routes must avoid horizontal overflow on mobile: dashboard, main CMS, products, customize, projects, support, insights, gallery, consultations, inquiries, UTM, settings.
+- Convert fixed-width admin tables or data grids to mobile cards, stacked controls, horizontal-safe panels, or collapsible details as appropriate.
+- Move risky/legacy settings actions such as data migration into a collapsed advanced/danger section with clearer warnings and confirmation.
+
+### Image policy
+
+- Use existing real product/company images first.
+- If generated images are created, limit them to weak sections and use material/process/detail imagery. Face-free hands/tool details are allowed; avoid fake customer scenes or fake case-study data.
+
+### Constraints
+
+- Do not change DB schema or run migrations for this UI polish task.
+- Do not delete or clean real database data.
+- Do not touch unrelated `.kiro/` state.
+- Keep existing `/customize` business rules and consultation submission behavior intact.
+- Keep current security headers, admin auth, Supabase service-role boundaries, and review loop.
+
+### Validation
+
+- Run `npm run lint`, `npm run test`, `npm run build`, and `npx playwright test`.
+- Add or update Playwright coverage for mobile overflow checks, product mobile accordions, footer hidden admin link preservation, and admin mobile drawer/access.
+- Validate public and admin pages on desktop and mobile with browser/Playwright evidence.

 ## Assumptions

-- Homepage prices remain hidden; prices appear only in `/customize`.
-- Generated images are temporary commercial visuals and never registered as actual case-study data.
-- Existing `inquiries` data remains preserved as legacy data.
-- PDF-level estimate saving may be implemented as a v1 quote-save/download/print path as long as the modal includes `견적 저장` and final price is clearly consultation-confirmed.
+- The branch remains `zoo/customize-configurator`.
+- Existing untracked `.kiro/` is unrelated and should not be committed.
+- Existing `AGENTS.md` local modification belongs to the user/workspace and should not be reverted.
diff --git a/.codex/pro-review.md b/.codex/pro-review.md
index d9307fc..2bdffca 100644
--- a/.codex/pro-review.md
+++ b/.codex/pro-review.md
@@ -1,97 +1,31 @@
+REVIEW_MARKER: WEET_UI_POLISH_REVIEW_20260607_0048
 VERDICT: REVISE

 CONTEXT_GAPS:
-
-Full post-line-220 CustomizeConfigurator render and full ImageUpload / upload action implementation were not included, so mobile bottom bar behavior and upload MIME/extension/path/size enforcement cannot be fully verified from this packet.
-
-붙여넣은 텍스트 (1)
-
-MUST_FIX:
-
-Fix consultation submission under tightened RLS: submitCustomizeConsultation inserts with the public SSR client and then calls .select('id').single(), but the intended policy leaves public users with insert-only access and no consultation select access. This can make the UI report failure after insert, or otherwise conflict with the “no public select” requirement. Do not add public select on customize_consultations; instead insert via server-only service role after validation/recalculation, or pre-generate the id and insert without .select().
-
-붙여넣은 텍스트 (1)
-
-
-
-붙여넣은 텍스트 (1)
-
-Render the configured base floorplan image layer in /customize. The schema/seed stores floorplan_image_path, but the shown FloorplanPreview draws an inline SVG base and only renders option overlay images, so admin-managed base floorplan assets and the requested “base floorplan image plus same-size transparent PNG overlays” design are not actually honored.
-
-붙여넣은 텍스트 (1)
-
-
-
-붙여넣은 텍스트 (1)
-
-OPTIONAL:
-
-Consider making the ?c= state actually compressed rather than only base64url-encoded JSON; current encoding is non-human-readable but not compressed.
-
-붙여넣은 텍스트 (1)
-
-Add stricter server-side normalization for selectedOptions: cap category count, reject unknown category ids, enforce single/multiple category cardinality, and store a sanitized config state only.
-
-Decide whether .kiro/ should be removed or ignored before final commit.
-
-TESTS_TO_RUN:
-
-Submit a real /customize consultation as anon through the UI and assert success toast, exactly one row inserted, service-role/admin can read it, and anon cannot select/update/delete it.
-
-Add an integration test for the RLS-safe consultation insert path so .select() regressions are caught.
-
-Add a visual/e2e check that the configured base floorplan image renders, overlays align at 1000x420, and 3x6/3x9 switching keeps the right edge fixed.
-
-Re-run npm run lint, npm run test, npm run build, npx playwright test, plus the Supabase anon/service-role smoke test after fixes.
-
-붙여넣은 텍스트 (1)
-
-RISK_NOTES:
-
-Public direct inserts into customize_consultations remain intentionally allowed; without DB-level length/rate constraints, spam or malformed snapshots can still reach admin screens even if the official server action is validated.
-
-Admin pages were not live-browser validated under an authenticated admin session per the packet’s own remaining risks.
-
-붙여넣은 텍스트 (1)
-
----
-
-# Cycle 2
-
-VERDICT: PASS
-
-CONTEXT_GAPS:
-
-Full post-fix repository was not independently executed here; review is based on the supplied packet, excerpts, diff summary, and validation output.
-
-붙여넣은 텍스트 (1)
-
-Authenticated admin live-browser validation is still not shown, but the packet identifies this as a known remaining risk rather than a blocker.
+- Full unchanged portions of `app/admin/settings/page.tsx` were not included, so I cannot verify whether `handleMigration` already has an explicit confirmation step.
+- The actual runtime analytics configuration is not shown, so `/privacy` should phrase GA/Clarity/Vercel Analytics conditionally based on detected/configured use rather than overstate.

 MUST_FIX:
-
-None.
+- Fix the header mobile/tablet breakpoint mismatch. The mobile menu button is `xl:hidden`, desktop nav is `hidden xl:flex`, but the portal menu is `lg:hidden`; at `lg` to `xl` widths the button can appear while the opened menu remains hidden. Change the mobile menu portal/container breakpoint to match the button/nav split, e.g. `xl:hidden`, and add/extend a Playwright check around 1024-1279px.
+- Rewrite `/privacy` again to match the required actual data flows. The current text is too generic and omits or misstates required items: customize consultations/configuration snapshots, legacy inquiries, Supabase auth/admin cookies, conditional GA/Clarity/Vercel Analytics, and manual admin-managed personal-data deletion. It also claims fields such as email/land area in the main 상담 신청 flow without showing that those are actually collected by the current customize form.
+- Amend `/terms` to explicitly cover content rights/usage rights for site/project/product/media content, because the brief specifically required content rights and the current terms excerpt does not address them.
+- Ensure the dangerous data migration action has an explicit confirmation step before execution. If `handleMigration` already confirms, include/keep it; if not, add a confirmation dialog or equivalent irreversible-action confirmation in addition to the collapsed danger section.

 OPTIONAL:
-
-Consider making ?c= truly compressed rather than base64url JSON if URL length becomes an issue.
-
-Consider stricter server-side normalization of selectedOptions by category cardinality before snapshot storage.
-
-Keep .kiro/ and test-results/ out of the final commit unless intentionally tracked.
+- Add a small assertion that `/privacy` and `/terms` do not contain visible “legal review needed” copy, since that was an explicit constraint.
+- Consider replacing remaining `text-primary`/yellow hover accents in solution detail CTAs with the restrained neutral/accent system if the visual pass still feels inconsistent.
+- Consider using `Link` instead of raw `<a>` for the products soft `/customize` CTA to stay consistent with Next.js navigation conventions.

 TESTS_TO_RUN:
-
-Final pre-push check: npm run lint, npm run test, npm run build, npx playwright test.
-
-Keep the new UI consultation submission test in the suite because it covers the prior RLS-safe insert regression.
-
-Run one authenticated manual smoke pass for /admin/customize and /admin/consultations before release if admin credentials are available.
+- `npm run lint`
+- `npm run test`
+- `npm run build`
+- `E2E_ADMIN_ID=<redacted> E2E_ADMIN_PASSWORD=<redacted> npx playwright test`
+- Add and run a header navigation test at a tablet breakpoint such as 1100x800 to verify the hamburger opens a visible menu and `/customize` navigation works.
+- Add/run a focused admin settings test that expands the danger section and verifies the migration action requires explicit confirmation before execution.

 RISK_NOTES:
-
-Public anon direct inserts into customize_consultations remain intentionally allowed by RLS; application validation protects the official server action, but database-level spam/rate/shape controls are still limited.
-
-Restored /bespoke image sizes warnings and Next middleware deprecation warning are non-blocking if unchanged from prior behavior.
-
-The cycle 1 blockers appear addressed: consultation insert no longer performs public .select(), the base floorplan image layer is rendered, and Playwright now verifies floorplan geometry plus real consultation submission/cleanup.
+- The core UI polish direction appears broadly satisfied: homepage beige removal, required H1/subcopy/CTA preservation, no homepage prices/trust chips/mini configurator, footer hidden `/admin` link, product mobile accordion, public/admin mobile overflow checks, and admin drawer coverage are supported by the provided diff and validation.
+- The remaining blockers are not broad design preferences; they are direct requirement gaps in breakpoint behavior, legal copy specificity, content rights coverage, and dangerous-action confirmation.
+- `.kiro/` remains untracked and should stay out of the final commit unless the user explicitly asks otherwise.
+- The `AGENTS.md` change may be intentional workspace guidance, but it is outside the UI implementation itself and should be reviewed carefully before inclusion.
diff --git a/.codex/state.md b/.codex/state.md
index a8a2faf..c2e0f5c 100644
--- a/.codex/state.md
+++ b/.codex/state.md
@@ -2,86 +2,71 @@

 ## Active task

-위트 `/bespoke` 복원, DB 기반 `/customize` 주문 컨피규레이터 신규 구축, 홈/support 전환, Supabase customize schema 적용, 관리자 주문 구성/상담 관리 구현.
+위트 전체 UI 정밀 polish 및 랜딩 배경색 재조정. Public pages, legal pages, login, and admin should be brought into a Tesla-inspired product-led premium architectural showroom/operations-console system.

 ## Current phase

-complete
+pro-review

 ## Changes made

-- `/bespoke` 공개 페이지를 이전 showcase 페이지로 복원하고 잘못된 BESPOKE 옵션 관리 코드를 제거.
-- Supabase 원격 schema/migration 백업 후 `202606060002_customize_configurator.sql` 적용.
-- `customize_models/categories/options/option_conflicts/included_specs/consultations` 테이블과 seed/RLS 추가.
-- `/customize`를 DB catalog 기반 컨피규레이터로 재작성.
-- `/admin/customize`, `/admin/consultations` 추가.
-- 홈을 구성 CTA 중심으로 재작성하고 `/support`를 구매 과정/FAQ/A/S 안내 페이지로 재작성.
-- Header `/customize` 메뉴명을 `주문하기`로 변경.
-- old customize store/proto e2e를 제거하고 새 e2e를 추가.
-- `202606060003_lock_customize_admin_policies.sql`로 새 customize 테이블의 authenticated-wide admin RLS 정책을 제거하고 관리자 mutation을 requireAdmin + service role 경로로 고정.
-- Supabase CLI 타입 재생성과 원격 schema dump를 성공적으로 완료하고, 기존 코드가 쓰던 type alias를 생성 타입 하단에 복구.
-- 타입 재생성 후 드러난 레거시 CMS/FAQ/product/project/inquiry nullable/id 타입 불일치를 정리.
-- Pro 1차 MUST_FIX 반영: `submitCustomizeConsultation`에서 insert 후 `.select('id').single()`을 제거하고 사전 생성 id로 insert-only RLS와 호환되게 수정.
-- Pro 1차 MUST_FIX 반영: `/customize` 평면도에서 `model.floorplanImagePath`를 `base-floorplan-image` 레이어로 실제 렌더링하고, seed 기본 이미지를 1000x420 평면도 SVG로 교체.
-- Playwright에 base floorplan/footprint 검증과 실제 UI 상담 제출 후 service-role 확인/삭제 테스트를 추가.
-- GPT-5.5 Pro 2차 리뷰가 `VERDICT: PASS`를 반환.
+- Delegated the frontend implementation step to Antigravity IDE/Gemini and accepted the intended UI changes.
+- Replaced the homepage beige/tan background system with white, gray, charcoal, and restrained muted yellow accents while preserving the required H1, subcopy, and customize CTA.
+- Quieted global header/footer styling and preserved the hidden `/admin` link on the footer word `True` with default cursor behavior.
+- Added mobile product cards with collapsible details and a soft `/customize` CTA while keeping desktop product storytelling.
+- Polished `/modular`, `/bespoke`, `/solution`, solution detail image placeholders, `/projects`, `/support`, `/company`, `/login`, `/privacy`, and `/terms`.
+- Added responsive `AdminShell` with mobile topbar/drawer, refined admin settings danger section, and made consultation manager rows mobile-safe.
+- Applied Pro cycle 1 MUST_FIX: changed the mobile menu portal breakpoint from `lg:hidden` to `xl:hidden` and added a 1100px tablet header Playwright check.
+- Applied Pro cycle 1 MUST_FIX: rewrote `/privacy` around actual customize consultations, legacy inquiries, Supabase auth/admin cookies, conditional Vercel/GA/Clarity analytics, and manual admin deletion.
+- Applied Pro cycle 1 MUST_FIX: amended `/terms` with content/media usage rights and user-provided material obligations.
+- Applied Pro cycle 1 MUST_FIX: kept the existing dangerous migration `confirm()` flow, strengthened its warning text, and added a Playwright assertion that the confirmation dialog appears and can be dismissed.

 ## Commands run

-- `supabase migration list --linked`
-- `supabase db dump --linked --schema public`
-- `supabase migration fetch --linked`
-- `supabase db push --linked --dry-run`
-- `supabase db push --linked`
-- `DOTENV_CONFIG_PATH=.env.local node -r dotenv/config ...` for remote table counts
-- `supabase gen types typescript --linked --schema public > types/supabase.ts`
-- `supabase db push --linked --dry-run` for `202606060003_lock_customize_admin_policies.sql`
-- `supabase db push --linked` for `202606060003_lock_customize_admin_policies.sql`
-- `supabase gen types typescript --linked --schema public > /tmp/weet-supabase-types.ts && mv /tmp/weet-supabase-types.ts types/supabase.ts`
-- `supabase db dump --linked --schema public > /tmp/weet-public-schema.sql && mv /tmp/weet-public-schema.sql supabase/schema.sql`
-- remote Supabase anon insert/service-role verify/delete smoke test for `customize_consultations`
 - `npm run lint`
 - `npm run test`
 - `npm run build`
-- `npx playwright test`
-- GPT-5.5 Pro review cycle 1 in Chrome: `VERDICT: REVISE`
-- `npx playwright test` after Pro MUST_FIX: 11 passed
-- GPT-5.5 Pro review cycle 2 in Chrome: `VERDICT: PASS`
-- final `npm run lint`
-- final `npm run test`
-- final `npm run build`
-- final `npx playwright test`
-- final service-role consultation count check: `customize_consultations=0`
+- `E2E_ADMIN_ID=<redacted> E2E_ADMIN_PASSWORD=<redacted> npx playwright test`
+- `E2E_ADMIN_ID=<redacted> E2E_ADMIN_PASSWORD=<redacted> npx playwright test e2e/public-pages.spec.ts -g 'mobile drawer opens'`
+- `npx playwright test e2e/header-navigation.spec.ts -g 'mobile menu should have'`
+- `git diff --check`
+- Playwright DOM/screenshot evidence scripts against `http://127.0.0.1:3000`
+- GPT-5.5 Pro cycle 1 review in Chrome with marker `WEET_UI_POLISH_REVIEW_20260607_0048`

 ## Current failures

-- None currently. Latest lint, unit tests, build, Playwright, Supabase migration checks, type generation, schema dump, and remote consultation smoke test passed.
+- No current lint, unit test, build, or Playwright failures.
+- `git diff --check` failed only against the previously generated `.codex/review-packet.md` text artifact, because that file embedded raw diff lines with trailing spaces. The cycle 2 packet will be regenerated and will exclude its own diff artifact from the embedded diff to avoid self-referential noise.
+- Build continues to show the pre-existing Next.js warning that the `middleware` file convention is deprecated in favor of `proxy`.

 ## Pro review cycles

-2
+1

 ## Last Pro verdict

-PASS
+REVISE

 ## Applied Pro feedback

-- Removed `.select('id').single()` from public consultation insert path and returned a server-generated UUID, preserving insert-only RLS without public consultation select.
-- Rendered the configured model `floorplanImagePath` as the base floorplan image layer and added Playwright assertions for base image and right-edge-fixed footprint.
+- Fixed the header lg-to-xl mobile menu breakpoint mismatch and added a tablet breakpoint E2E test.
+- Rewrote `/privacy` to match actual code-level data flows and conditional analytics loading.
+- Added content/media rights and user material obligations to `/terms`.
+- Verified the dangerous data migration action uses an explicit confirmation dialog before execution.

 ## Skipped Pro feedback

-- Optional compression of `?c=` state was not applied because the task only required a compressed-looking non-human-readable configuration string and Pro marked it optional.
-- Optional stricter selectedOptions category count/cardinality normalization was not applied because Pro marked it optional and current zod/server filtering already limits option IDs.
-- Optional `.kiro/` cleanup was not applied; `.kiro/` is unrelated untracked user/workspace state and will not be committed.
+- OPTIONAL: Legal-page negative assertion for “legal review needed” copy was not added because it was advisory.
+- OPTIONAL: Remaining yellow/text-primary accents in solution detail CTAs were left unless already covered by existing UI polish.
+- OPTIONAL: Products soft CTA raw anchor vs `Link` was left as advisory.

 ## Remaining risks

-- Admin pages require authenticated admin session for live browser validation.
-- Browser warnings remain for restored BESPOKE images missing `sizes`; this matches restored page behavior and is non-blocking.
-- Next.js warns that the legacy `middleware` convention is deprecated in favor of `proxy`; this predates the task and is non-blocking for current validation.
+- `AGENTS.md` and `.kiro/` were already dirty/untracked before this task and remain unrelated to the UI implementation.
+- The privacy/terms pages are service-specific drafts, not formal legal advice.
+- Admin authenticated tests require `E2E_ADMIN_ID` and `E2E_ADMIN_PASSWORD`; the tests skip when those env vars are absent.
+- Existing admin and support subcomponents outside the touched files still contain some older `rounded-xl`/placeholder styling, but mobile overflow checks passed across the required admin routes.

 ## Next step

-Commit all intended changes except unrelated `.kiro/`, then push `zoo/customize-configurator` to GitHub.
+Create the cycle 2 `.codex/review-packet.md`, ask GPT-5.5 Pro in Chrome for a second review, save the response, and stop if Pro returns `VERDICT: PASS` or after the second cycle per `codex-loop.md`.
diff --git a/AGENTS.md b/AGENTS.md
index bbd8410..4b29b50 100644
--- a/AGENTS.md
+++ b/AGENTS.md
@@ -76,6 +76,8 @@ For browser-based review and validation, prefer fast read-only DOM evidence befo

 - Use `chrome:control-chrome` for the GPT-5.5 Pro review step because it depends on the user's logged-in Chrome/ChatGPT state.

+- For frontend implementation, UI/UX design, layout, component styling, page composition, or other visual product work, use the `antigravity-frontend` skill and delegate the implementation step to Antigravity IDE/Gemini through Computer Use. Wait until Antigravity finishes, accept only intended changes, then return to Codex to inspect git status/diff, verify files, run validation, create review packets, request GPT-5.5 Pro review, and continue the local repository workflow.
+
 - Before using screenshots, coordinate clicks, repeated scrolling, or Computer Use, try targeted DOM reads with Playwright locators, roles, labels, `data-testid`, visible button names, and small `outerHTML` snippets.

 - If a watcher snapshot such as `latest.json` exists for a ChatGPT workflow, read it before active actions.
diff --git a/app/admin/layout.tsx b/app/admin/layout.tsx
index 31c6339..5637c8a 100644
--- a/app/admin/layout.tsx
+++ b/app/admin/layout.tsx
@@ -1,5 +1,5 @@
 import { redirect } from 'next/navigation';
-import AdminSidebar from '@/components/admin/AdminSidebar';
+import AdminShell from '@/components/admin/AdminShell';
 import { requireAdmin } from '@/lib/admin-auth';

 export default async function AdminLayout({
@@ -15,11 +15,8 @@ export default async function AdminLayout({
   }

   return (
-    <div className="flex h-screen overflow-hidden bg-gray-50">
-      <AdminSidebar user={user} />
-      <main className="flex-1 overflow-y-auto p-8">
-        {children}
-      </main>
-    </div>
+    <AdminShell user={user}>
+      {children}
+    </AdminShell>
   );
 }
diff --git a/app/admin/settings/page.tsx b/app/admin/settings/page.tsx
index a417983..974d8b9 100644
--- a/app/admin/settings/page.tsx
+++ b/app/admin/settings/page.tsx
@@ -24,7 +24,7 @@ export default function AdminSettingsPage() {
     const userId = userEmail.split('@')[0];

     const handleMigration = async () => {
-        if (!confirm('기존 데이터를 데이터베이스로 이관하시겠습니까? (중복 데이터가 생성될 수 있습니다)')) {
+        if (!confirm('위험 작업입니다. 기존 제품 데이터를 데이터베이스로 이관하시겠습니까? 이미 데이터가 있으면 중복 데이터가 생성될 수 있습니다.')) {
             return;
         }

@@ -48,7 +48,7 @@ export default function AdminSettingsPage() {

             <div className="space-y-6">
                 {/* Account Settings (Placeholder) */}
-                <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
+                <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm md:p-8">
                     <h2 className="text-lg font-bold text-gray-900 mb-4">계정 설정</h2>
                     <div className="grid gap-6 max-w-xl">
                         <div>
@@ -70,7 +70,7 @@ export default function AdminSettingsPage() {
                 </div>

                 {/* Notification Settings (Placeholder) */}
-                <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
+                <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm md:p-8">
                     <h2 className="text-lg font-bold text-gray-900 mb-4">알림 설정</h2>
                     <div className="space-y-4">
                         <div className="flex items-center justify-between max-w-xl">
@@ -84,29 +84,34 @@ export default function AdminSettingsPage() {
                 </div>

                 {/* Data Management */}
-                <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
+                <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm md:p-8">
                     <h2 className="text-lg font-bold text-gray-900 mb-4">데이터 관리</h2>
-                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
-                        <h3 className="font-medium text-gray-900 mb-2">초기 데이터 이관 (Migration)</h3>
-                        <p className="text-sm text-gray-500 mb-4">
-                            하드코딩된 제품 데이터를 Supabase 데이터베이스로 복사합니다.
-                            <br />
-                            이미 데이터가 존재하는 경우 중복될 수 있으니 주의하세요.
-                        </p>
-                        <button
-                            onClick={handleMigration}
-                            disabled={migrating}
-                            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center gap-2"
-                        >
-                            {migrating && <Loader2 className="w-4 h-4 animate-spin" />}
-                            데이터 이관 실행
-                        </button>
-                        {message && (
-                            <p className={`mt-2 text-sm ${message.includes('오류') ? 'text-red-600' : 'text-green-600'}`}>
-                                {message}
+                    <details className="rounded-lg border border-red-200 bg-red-50/60">
+                        <summary className="cursor-pointer px-4 py-3 text-sm font-bold text-red-700">
+                            고급 / 위험 작업
+                        </summary>
+                        <div className="border-t border-red-200 bg-white p-4">
+                            <h3 className="font-medium text-gray-900 mb-2">초기 데이터 이관 (Migration)</h3>
+                            <p className="text-sm text-gray-500 mb-4">
+                                하드코딩된 제품 데이터를 Supabase 데이터베이스로 복사합니다.
+                                <br />
+                                이미 데이터가 존재하는 경우 중복될 수 있으니 주의하세요.
                             </p>
-                        )}
-                    </div>
+                            <button
+                                onClick={handleMigration}
+                                disabled={migrating}
+                                className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 disabled:opacity-50"
+                            >
+                                {migrating && <Loader2 className="w-4 h-4 animate-spin" />}
+                                데이터 이관 실행
+                            </button>
+                            {message && (
+                                <p className={`mt-2 text-sm ${message.includes('오류') ? 'text-red-600' : 'text-green-600'}`}>
+                                    {message}
+                                </p>
+                            )}
+                        </div>
+                    </details>
                 </div>
             </div>
         </div>
diff --git a/app/bespoke/page.tsx b/app/bespoke/page.tsx
index 608788c..1c576e6 100644
--- a/app/bespoke/page.tsx
+++ b/app/bespoke/page.tsx
@@ -128,23 +128,23 @@ export default function BespokePage() {

   return (
     <div className="min-h-screen bg-white">
-      <section id="what-is-bespoke" className="bg-[#EBEBEB] py-20 md:py-28 lg:py-32 overflow-hidden scroll-mt-[180px]">
+      <section id="what-is-bespoke" className="bg-gray-50 py-20 md:py-28 lg:py-32 overflow-hidden scroll-mt-[180px]">
         <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-[148px]">
           <motion.div
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8 }}
           >
-            <h1 className="text-[50px] md:text-[70px] lg:text-[90px] font-bold mb-8 md:mb-12 leading-none tracking-tight">
+            <h1 className="text-[40px] md:text-[60px] lg:text-[80px] font-black mb-8 md:mb-12 leading-tight tracking-tight text-gray-900">
               {copy.headline}
             </h1>

             <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
               <div className="lg:w-[65%]">
-                <p className="text-[18px] md:text-[20px] leading-relaxed mb-6 text-gray-800 break-keep">
+                <p className="text-[16px] md:text-[20px] leading-relaxed mb-6 text-gray-600 break-keep">
                   {copy.lead}
                 </p>
-                <p className="text-[20px] md:text-[24px] font-semibold text-black break-keep">
+                <p className="text-[18px] md:text-[24px] font-bold text-gray-900 break-keep">
                   {copy.highlight}
                 </p>
               </div>
@@ -179,6 +179,7 @@ export default function BespokePage() {
               src={section.image.src}
               alt={section.image.alt}
               fill
+              sizes="(max-width: 1024px) 100vw, 50vw"
               className="object-cover rounded-lg shadow-2xl hover:scale-105 transition-transform duration-500"
             />
           </motion.div>
@@ -193,17 +194,14 @@ export default function BespokePage() {
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
           >
-            <span className="text-primary font-bold tracking-widest text-sm mb-4 block">{section.badge}</span>
-            <h2 className="text-[40px] md:text-[60px] font-bold mb-6 leading-tight">{section.title}</h2>
-            <p className="text-[20px] md:text-[24px] font-medium mb-6 text-gray-900 break-keep">
+            <span className="text-gray-500 font-bold tracking-widest text-sm mb-4 block">{section.badge}</span>
+            <h2 className="text-[32px] md:text-[50px] lg:text-[60px] font-black mb-6 leading-tight text-gray-900">{section.title}</h2>
+            <p className="text-[18px] md:text-[24px] font-bold mb-6 text-gray-800 break-keep">
               {section.quote}
             </p>
-            <p className="text-gray-600 leading-relaxed mb-8 text-lg break-keep">
+            <p className="text-gray-600 leading-relaxed text-base md:text-lg break-keep">
               {section.body}
             </p>
-            <button className="border-b-2 border-black pb-1 text-lg font-medium hover:text-primary hover:border-primary transition-colors min-h-[44px] inline-flex items-center">
-              {section.cta}
-            </button>
           </motion.div>
         );

@@ -211,7 +209,7 @@ export default function BespokePage() {
           <section
             key={section.id}
             id={section.id === 'popup-store' ? 'examples' : undefined}
-            className={`${section.imageOnRight ? 'bg-white' : 'bg-[#F5F5F5]'} py-20 md:py-32 overflow-hidden scroll-mt-[180px]`}
+            className={`${section.imageOnRight ? 'bg-white' : 'bg-gray-50'} py-20 md:py-32 overflow-hidden scroll-mt-[180px]`}
           >
             <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-[148px]">
               <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
@@ -255,6 +253,7 @@ export default function BespokePage() {
                   src={IMAGES.find((img) => img.id === selectedId)!.src}
                   alt={IMAGES.find((img) => img.id === selectedId)!.alt}
                   fill
+                  sizes="100vw"
                   className="object-contain"
                   priority
                 />
diff --git a/app/company/page.tsx b/app/company/page.tsx
index 19eaafd..14b4804 100755
--- a/app/company/page.tsx
+++ b/app/company/page.tsx
@@ -64,9 +64,9 @@ export default function CompanyPage() {
   };

   return (
-    <div className="min-h-screen bg-white">
+    <div className="min-h-screen bg-white pb-20">
       {/* Section 1: Hero */}
-      <section id="philosophy" className="bg-[#EBEBEB] py-16 lg:py-24 scroll-mt-[180px]">
+      <section id="philosophy" className="bg-gray-50 py-16 lg:py-24 scroll-mt-[180px]">
         <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-[140px]">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
             {/* Left: Slogan Image */}
@@ -204,7 +204,7 @@ export default function CompanyPage() {
       </section>

       {/* Section 3: weet Crew */}
-      <section id="crew" className="bg-[#EBEBEB] py-16 lg:py-24 scroll-mt-[180px]">
+      <section id="crew" className="bg-gray-50 py-16 lg:py-24 scroll-mt-[180px]">
         <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-[140px]">
           <div className="flex flex-col lg:flex-row items-start lg:items-start gap-8 lg:gap-20">
             {/* Left: weet Crew Logo */}
@@ -234,7 +234,7 @@ export default function CompanyPage() {
                 <h3 className="text-[11px] md:text-[18px] font-bold mb-3 md:mb-4 text-black break-keep">{t.company.crew.design.title}</h3>
                 <button
                   onClick={() => openModal('design')}
-                  className="bg-[#2D2D2D] text-white w-full md:w-auto px-0 md:px-12 py-3 md:py-3.5 min-h-[44px] text-[10px] md:text-[14px] font-medium hover:bg-primary-dark transition-colors duration-200 mt-auto rounded-sm md:rounded-none"
+                  className="bg-gray-900 text-white w-full md:w-auto px-0 md:px-12 py-3 md:py-3.5 min-h-[44px] text-[10px] md:text-[14px] font-medium hover:bg-gray-800 transition-colors duration-200 mt-auto rounded-sm md:rounded-lg"
                 >
                   {t.company.crew.more}
                 </button>
@@ -253,7 +253,7 @@ export default function CompanyPage() {
                 <h3 className="text-[11px] md:text-[18px] font-bold mb-3 md:mb-4 text-black break-keep">{t.company.crew.construction.title}</h3>
                 <button
                   onClick={() => openModal('construction')}
-                  className="bg-[#2D2D2D] text-white w-full md:w-auto px-0 md:px-12 py-3 md:py-3.5 min-h-[44px] text-[10px] md:text-[14px] font-medium hover:bg-primary-dark transition-colors duration-200 mt-auto rounded-sm md:rounded-none"
+                  className="bg-gray-900 text-white w-full md:w-auto px-0 md:px-12 py-3 md:py-3.5 min-h-[44px] text-[10px] md:text-[14px] font-medium hover:bg-gray-800 transition-colors duration-200 mt-auto rounded-sm md:rounded-lg"
                 >
                   {t.company.crew.more}
                 </button>
@@ -272,7 +272,7 @@ export default function CompanyPage() {
                 <h3 className="text-[11px] md:text-[18px] font-bold mb-3 md:mb-4 text-black break-keep">{t.company.crew.solution.title}</h3>
                 <button
                   onClick={() => openModal('solution')}
-                  className="bg-[#2D2D2D] text-white w-full md:w-auto px-0 md:px-12 py-3 md:py-3.5 min-h-[44px] text-[10px] md:text-[14px] font-medium hover:bg-primary-dark transition-colors duration-200 mt-auto rounded-sm md:rounded-none"
+                  className="bg-gray-900 text-white w-full md:w-auto px-0 md:px-12 py-3 md:py-3.5 min-h-[44px] text-[10px] md:text-[14px] font-medium hover:bg-gray-800 transition-colors duration-200 mt-auto rounded-sm md:rounded-lg"
                 >
                   {t.company.crew.more}
                 </button>
@@ -283,7 +283,7 @@ export default function CompanyPage() {
       </section>

       {/* Section 4: weet Factory */}
-      <section id="factory" className="bg-[#EBEBEB] py-16 lg:py-24 border-t border-gray-200 scroll-mt-[180px]">
+      <section id="factory" className="bg-gray-50 py-16 lg:py-24 border-t border-gray-100 scroll-mt-[180px]">
         <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-[140px]">
           <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-20">
             {/* Left: weet Factory Logo */}
diff --git a/app/layout.tsx b/app/layout.tsx
index dab0738..cf37cc5 100644
--- a/app/layout.tsx
+++ b/app/layout.tsx
@@ -137,7 +137,7 @@ export default function RootLayout({
   ];

   return (
-    <html lang="ko" className={cn("font-sans", geist.variable)}>
+    <html lang="ko" data-scroll-behavior="smooth" className={cn("font-sans", geist.variable)}>
       <head>
         <script
           type="application/ld+json"
@@ -166,4 +166,4 @@ export default function RootLayout({
       </body>
     </html>
   );
-}
\ No newline at end of file
+}
diff --git a/app/login/page.tsx b/app/login/page.tsx
index db9196f..b28f3c5 100644
--- a/app/login/page.tsx
+++ b/app/login/page.tsx
@@ -1,4 +1,5 @@
 import { login } from './actions'
+import Image from 'next/image';
 import type { Metadata } from 'next';

 export const metadata: Metadata = {
@@ -19,57 +20,80 @@ export const metadata: Metadata = {

 export default function LoginPage() {
     return (
-        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
-            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl">
-                <div>
-                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 tracking-tight">
-                        관리자 로그인
-                    </h2>
-                    <p className="mt-2 text-center text-sm text-gray-600">
-                        모듈러 관리를 위해 로그인해주세요
-                    </p>
-                </div>
-                <form className="mt-8 space-y-6">
-                    <div className="rounded-md shadow-sm -space-y-px">
-                        <div className="mb-4">
-                            <label htmlFor="id" className="block text-sm font-medium text-gray-700 mb-1">
-                                아이디
-                            </label>
-                            <input
-                                id="id"
-                                name="id"
-                                type="text"
-                                autoComplete="username"
-                                required
-                                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-black focus:border-transparent transition-all duration-200 sm:text-sm"
-                                placeholder="아이디를 입력하세요"
-                            />
-                        </div>
-                        <div>
-                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
-                                비밀번호
-                            </label>
-                            <input
-                                id="password"
-                                name="password"
-                                type="password"
-                                autoComplete="current-password"
-                                required
-                                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-black focus:border-transparent transition-all duration-200 sm:text-sm"
-                                placeholder="비밀번호를 입력하세요"
-                            />
-                        </div>
+        <div className="min-h-[calc(100vh-80px)] bg-gray-50 px-4 py-12 text-gray-900 sm:px-6 lg:px-8">
+            <div className="mx-auto grid max-w-6xl overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm lg:grid-cols-[1.05fr_0.95fr]">
+                <div className="relative hidden min-h-[620px] bg-gray-950 lg:block">
+                    <Image
+                        src="/images/company/factory.webp"
+                        alt="위트 제작 현장"
+                        fill
+                        sizes="50vw"
+                        className="object-cover opacity-70"
+                        priority
+                    />
+                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/40 to-transparent" />
+                    <div className="absolute bottom-10 left-10 right-10">
+                        <p className="text-xs font-black uppercase tracking-[0.22em] text-gray-400">WEET OPERATIONS</p>
+                        <h1 className="mt-4 text-4xl font-black leading-tight text-white">
+                            제품, 상담, 프로젝트를 한 곳에서 관리합니다
+                        </h1>
+                        <p className="mt-5 max-w-xl text-sm leading-7 text-gray-300">
+                            공개 사이트의 제품 경험과 내부 운영 콘솔이 같은 기준으로 이어지도록 정돈했습니다.
+                        </p>
                     </div>
+                </div>
+
+                <div className="flex min-h-[560px] items-center justify-center p-6 md:p-12">
+                    <div className="w-full max-w-md">
+                        <p className="text-xs font-black uppercase tracking-[0.2em] text-gray-500">ADMIN ACCESS</p>
+                        <h2 className="mt-4 text-3xl font-black tracking-tight text-gray-900">
+                            관리자 로그인
+                        </h2>
+                        <p className="mt-3 text-sm leading-6 text-gray-500">
+                            위트 운영 계정으로 접속해 제품 구성과 상담 흐름을 관리합니다.
+                        </p>

-                    <div>
-                        <button
-                            formAction={login}
-                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
-                        >
-                            로그인
-                        </button>
+                        <form className="mt-10 space-y-6">
+                            <div className="space-y-5">
+                                <div>
+                                    <label htmlFor="id" className="mb-2 block text-sm font-bold text-gray-700">
+                                        아이디
+                                    </label>
+                                    <input
+                                        id="id"
+                                        name="id"
+                                        type="text"
+                                        autoComplete="username"
+                                        required
+                                        className="relative block w-full appearance-none rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder:text-gray-400 transition-all duration-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-900/20 sm:text-sm"
+                                        placeholder="아이디를 입력하세요"
+                                    />
+                                </div>
+                                <div>
+                                    <label htmlFor="password" className="mb-2 block text-sm font-bold text-gray-700">
+                                        비밀번호
+                                    </label>
+                                    <input
+                                        id="password"
+                                        name="password"
+                                        type="password"
+                                        autoComplete="current-password"
+                                        required
+                                        className="relative block w-full appearance-none rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder:text-gray-400 transition-all duration-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-900/20 sm:text-sm"
+                                        placeholder="비밀번호를 입력하세요"
+                                    />
+                                </div>
+                            </div>
+
+                            <button
+                                formAction={login}
+                                className="flex w-full justify-center rounded-lg border border-transparent bg-gray-900 px-4 py-3 text-sm font-bold text-white shadow-sm transition-colors duration-200 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900/20 focus:ring-offset-2"
+                            >
+                                로그인
+                            </button>
+                        </form>
                     </div>
-                </form>
+                </div>
             </div>
         </div>
     )
diff --git a/app/modular/page.tsx b/app/modular/page.tsx
index 2247ffd..fac6714 100644
--- a/app/modular/page.tsx
+++ b/app/modular/page.tsx
@@ -176,7 +176,7 @@ export default function ModularPage() {
   return (
     <div className="min-h-screen bg-white">
       {/* Hero */}
-      <section id="what-is-modular" className="bg-[#E8E8E8] py-16 lg:py-24 scroll-mt-[180px]">
+      <section id="what-is-modular" className="bg-gray-50 py-16 lg:py-24 scroll-mt-[180px]">
         <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-[140px]">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
             <div>
@@ -231,7 +231,7 @@ export default function ModularPage() {
         <section
           key={section.id}
           id={section.id}
-          className={`${section.bg === 'light' ? 'bg-white' : 'bg-[#E8E8E8]'} py-16 lg:py-24 scroll-mt-[180px]`}
+          className={`${section.bg === 'light' ? 'bg-white' : 'bg-gray-50'} py-16 lg:py-24 scroll-mt-[180px]`}
         >
           <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-[140px]">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
@@ -264,6 +264,28 @@ export default function ModularPage() {
           </div>
         </section>
       ))}
+
+      {/* CTA Section */}
+      <section className="bg-gray-900 py-20 lg:py-32 text-center px-4">
+        <div className="max-w-3xl mx-auto">
+          <h2 className="text-3xl lg:text-4xl font-black text-white mb-6">
+            {language === 'KO' ? '나에게 맞는 위트 찾기' : 'Find your weet'}
+          </h2>
+          <p className="text-gray-300 text-lg mb-10 leading-relaxed">
+            {language === 'KO'
+              ? '위트의 모듈러 기술로 완성된 다양한 제품 라인업을 확인하고, 내게 필요한 공간을 직접 구성해보세요.'
+              : 'Explore our product lineup built with advanced modular technology, and customize your own space.'}
+          </p>
+          <div className="flex flex-col sm:flex-row gap-4 justify-center">
+            <a href="/products" className="inline-flex h-14 items-center justify-center rounded-lg bg-white px-8 text-sm font-bold text-gray-900 transition-colors hover:bg-gray-100">
+              {language === 'KO' ? '제품 전체 보기' : 'View all products'}
+            </a>
+            <a href="/customize" className="inline-flex h-14 items-center justify-center rounded-lg border border-gray-600 bg-transparent px-8 text-sm font-bold text-white transition-colors hover:bg-gray-800">
+              {language === 'KO' ? '나만의 위트 만들기' : 'Customize your weet'}
+            </a>
+          </div>
+        </div>
+      </section>
     </div>
   );
 }
diff --git a/app/page.tsx b/app/page.tsx
index c470544..7d3082a 100644
--- a/app/page.tsx
+++ b/app/page.tsx
@@ -32,35 +32,35 @@ const siteChecks = [

 export default function HomePage() {
   return (
-    <main className="bg-[#f6f2ea] text-[#2f3432]">
+    <main className="bg-white text-gray-900">
       <section className="px-4 pb-14 pt-12 md:px-8 md:pb-20 md:pt-16 lg:px-16">
         <div className="mx-auto grid max-w-[1500px] gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
           <div className="max-w-xl">
-            <p className="mb-4 text-sm font-black uppercase tracking-[0.18em] text-[#8d7133]">WEET MOBILE HOME</p>
-            <h1 className="text-4xl font-black leading-tight text-[#2f3432] md:text-6xl">
+            <p className="mb-4 text-sm font-black uppercase tracking-[0.18em] text-gray-500">WEET MOBILE HOME</p>
+            <h1 className="text-4xl font-black leading-tight text-gray-900 md:text-6xl">
               위트 이동식주택
             </h1>
-            <p className="mt-6 text-lg leading-8 text-[#625b50] md:text-xl">
+            <p className="mt-6 text-lg leading-8 text-gray-600 md:text-xl">
               작고 단단한 내 집을 필요한 크기와 옵션으로 직접 구성해보세요.
             </p>
             <div className="mt-8 flex flex-col gap-3 sm:flex-row">
               <Link
                 href="/customize"
-                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[#2f3432] px-5 text-sm font-bold text-white transition-colors hover:bg-[#1f2422]"
+                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-gray-900 px-5 text-sm font-bold text-white transition-colors hover:bg-gray-800"
               >
                 나만의 위트 만들기
                 <ArrowRight className="h-4 w-4" />
               </Link>
               <Link
                 href="/support"
-                className="inline-flex h-12 items-center justify-center rounded-lg border border-[#cfc4b3] bg-[#fbfaf7] px-5 text-sm font-bold text-[#2f3432] transition-colors hover:bg-[#eee6da]"
+                className="inline-flex h-12 items-center justify-center rounded-lg border border-gray-200 bg-white px-5 text-sm font-bold text-gray-900 transition-colors hover:bg-gray-50"
               >
                 진행 과정 보기
               </Link>
             </div>
           </div>

-          <div className="relative min-h-[360px] overflow-hidden rounded-lg border border-[#ded5c8] bg-[#fbfaf7] shadow-sm md:min-h-[520px]">
+          <div className="relative min-h-[360px] overflow-hidden rounded-lg border border-gray-100 bg-gray-50 shadow-sm md:min-h-[520px]">
             <Image
               src="/images/hero_main.webp"
               alt="위트 이동식주택 외관"
@@ -73,24 +73,24 @@ export default function HomePage() {
         </div>
       </section>

-      <section className="border-y border-[#ded5c8] bg-[#fbfaf7] px-4 py-14 md:px-8 lg:px-16">
+      <section className="border-y border-gray-100 bg-gray-50 px-4 py-14 md:px-8 lg:px-16">
         <div className="mx-auto max-w-[1500px]">
           <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
             <div>
-              <p className="text-sm font-black text-[#8d7133]">PROCESS</p>
-              <h2 className="mt-2 text-3xl font-black md:text-4xl">처음 선택부터 설치까지</h2>
+              <p className="text-sm font-black text-gray-500">PROCESS</p>
+              <h2 className="mt-2 text-3xl font-black md:text-4xl text-gray-900">처음 선택부터 설치까지</h2>
             </div>
-            <p className="max-w-xl text-sm leading-7 text-[#6f6658]">
+            <p className="max-w-xl text-sm leading-7 text-gray-600">
               고객은 먼저 구성해보고, 위트는 그 구성을 바탕으로 현장 조건과 제작 가능성을 빠르게 좁혀갑니다.
             </p>
           </div>

           <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
             {processSteps.map((step) => (
-              <div key={step.title} className="rounded-lg border border-[#ded5c8] bg-[#f6f2ea] p-5">
-                <step.icon className="h-6 w-6 text-[#8d7133]" />
-                <h3 className="mt-5 text-xl font-black">{step.title}</h3>
-                <p className="mt-3 text-sm leading-7 text-[#625b50]">{step.text}</p>
+              <div key={step.title} className="rounded-lg border border-gray-100 bg-white shadow-sm p-5 transition-shadow hover:shadow-md">
+                <step.icon className="h-6 w-6 text-primary-dark" />
+                <h3 className="mt-5 text-xl font-black text-gray-900">{step.title}</h3>
+                <p className="mt-3 text-sm leading-7 text-gray-600">{step.text}</p>
               </div>
             ))}
           </div>
@@ -99,7 +99,7 @@ export default function HomePage() {

       <section className="px-4 py-14 md:px-8 lg:px-16">
         <div className="mx-auto grid max-w-[1500px] gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
-          <div className="relative min-h-[360px] overflow-hidden rounded-lg border border-[#ded5c8] bg-[#fbfaf7] md:min-h-[470px]">
+          <div className="relative min-h-[360px] overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm md:min-h-[470px]">
             <Image
               src="/images/company/factory.webp"
               alt="위트 제작 현장"
@@ -109,16 +109,16 @@ export default function HomePage() {
             />
           </div>
           <div>
-            <p className="text-sm font-black text-[#8d7133]">SITE CHECK</p>
-            <h2 className="mt-2 text-3xl font-black md:text-4xl">좋은 선택은 현장 확인에서 완성됩니다</h2>
-            <p className="mt-5 text-base leading-8 text-[#625b50]">
+            <p className="text-sm font-black text-gray-500">SITE CHECK</p>
+            <h2 className="mt-2 text-3xl font-black md:text-4xl text-gray-900">좋은 선택은 현장 확인에서 완성됩니다</h2>
+            <p className="mt-5 text-base leading-8 text-gray-600">
               이동식주택은 제품만 고르면 끝나는 일이 아닙니다. 설치할 땅의 진입, 인입, 인허가 조건을 함께 확인해야 실제 일정과 비용이 선명해집니다.
             </p>
             <div className="mt-7 grid gap-3 sm:grid-cols-2">
               {siteChecks.map((item) => (
-                <div key={item} className="flex items-start gap-3 rounded-lg border border-[#ded5c8] bg-[#fbfaf7] p-4">
-                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#8d7133]" />
-                  <span className="text-sm font-semibold leading-6 text-[#4f473d]">{item}</span>
+                <div key={item} className="flex items-start gap-3 rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
+                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary-dark" />
+                  <span className="text-sm font-semibold leading-6 text-gray-800">{item}</span>
                 </div>
               ))}
             </div>
@@ -126,14 +126,14 @@ export default function HomePage() {
         </div>
       </section>

-      <section className="bg-[#2f3432] px-4 py-14 text-[#fbfaf7] md:px-8 lg:px-16">
+      <section className="bg-[#1f2422] px-4 py-14 text-white md:px-8 lg:px-16">
         <div className="mx-auto max-w-[1500px]">
           <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
             <div>
-              <p className="text-sm font-black text-[#d3a745]">TRUST</p>
-              <h2 className="mt-2 text-3xl font-black md:text-4xl">작게 보여도, 집답게 만듭니다</h2>
+              <p className="text-sm font-black text-gray-400">TRUST</p>
+              <h2 className="mt-2 text-3xl font-black md:text-4xl text-white">작게 보여도, 집답게 만듭니다</h2>
             </div>
-            <p className="max-w-xl text-sm leading-7 text-[#d8d0c3]">
+            <p className="max-w-xl text-sm leading-7 text-gray-300">
               실제 제품과 제작 환경을 기반으로, 이동식주택이 필요한 사람에게 필요한 만큼의 선택지를 제공합니다.
             </p>
           </div>
@@ -149,8 +149,8 @@ export default function HomePage() {
                   <Image src={item.src} alt={item.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
                 </div>
                 <div className="flex items-center gap-3 p-4">
-                  <item.icon className="h-5 w-5 text-[#d3a745]" />
-                  <span className="font-bold">{item.title}</span>
+                  <item.icon className="h-5 w-5 text-gray-300" />
+                  <span className="font-bold text-white">{item.title}</span>
                 </div>
               </div>
             ))}
@@ -158,15 +158,15 @@ export default function HomePage() {
         </div>
       </section>

-      <section className="px-4 py-16 md:px-8 lg:px-16">
+      <section className="px-4 py-16 md:px-8 lg:px-16 bg-white">
         <div className="mx-auto max-w-[960px] text-center">
-          <h2 className="text-3xl font-black md:text-4xl">필요한 크기와 옵션부터 정해보세요</h2>
-          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-[#625b50]">
+          <h2 className="text-3xl font-black md:text-4xl text-gray-900">필요한 크기와 옵션부터 정해보세요</h2>
+          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-gray-600">
             구성 결과는 상담 요청과 함께 저장되고, 위트가 현장 조건을 확인해 최종 견적과 제작 일정을 안내합니다.
           </p>
           <Link
             href="/customize"
-            className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[#2f3432] px-6 text-sm font-bold text-white transition-colors hover:bg-[#1f2422]"
+            className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-gray-900 px-6 text-sm font-bold text-white transition-colors hover:bg-gray-800"
           >
             나만의 위트 만들기
             <ArrowRight className="h-4 w-4" />
diff --git a/app/privacy/page.tsx b/app/privacy/page.tsx
index 128d336..e3e301c 100644
--- a/app/privacy/page.tsx
+++ b/app/privacy/page.tsx
@@ -15,56 +15,101 @@ export const metadata: Metadata = {
 };

 export default function PrivacyPage() {
-    return (
-        <div className="min-h-screen bg-white pt-32 pb-24 px-4 sm:px-6 lg:px-8">
-            <div className="max-w-3xl mx-auto">
-                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 pb-4 border-b border-gray-200">
-                    개인정보처리방침
-                </h1>
+  return (
+    <div className="min-h-screen bg-gray-50 px-4 pb-32 pt-16 sm:px-6 md:pt-20 lg:px-8">
+      <div className="mx-auto max-w-4xl rounded-lg border border-gray-100 bg-white p-8 shadow-sm md:p-12 lg:p-16">
+        <h1 className="mb-8 border-b border-gray-200 pb-6 text-3xl font-black text-gray-900 md:text-5xl">
+          개인정보처리방침
+        </h1>

-                <div className="prose prose-lg max-w-none text-gray-600 space-y-8">
-                    <p className="text-sm text-gray-400">최종 수정일: 2025년 12월 12일</p>
+        <div className="prose prose-lg max-w-none space-y-10 text-gray-600">
+          <p className="text-sm font-bold text-gray-400">최종 수정일: 2026년 6월 7일</p>

-                    <section>
-                        <h2 className="text-xl font-bold text-gray-900 mb-4">1. 개인정보의 처리 목적</h2>
-                        <p>
-                            회사는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며 이용 목적이 변경되는 경우에는 「개인정보 보호법」 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
-                        </p>
-                    </section>
+          <section>
+            <h2 className="mb-4 text-xl font-bold text-gray-900 md:text-2xl">1. 개인정보 처리 범위</h2>
+            <p>
+              주식회사 위트(WEET)는 홈페이지에서 이동식주택 구성 상담, 기존 문의 응대, 관리자 운영,
+              서비스 이용 통계 확인에 필요한 최소한의 개인정보를 처리합니다. 온라인 예상 견적은 상담을
+              시작하기 위한 참고 정보이며, 최종 계약 정보는 별도 상담과 계약 절차에서 확정됩니다.
+            </p>
+          </section>

-                    <section>
-                        <h2 className="text-xl font-bold text-gray-900 mb-4">2. 개인정보의 처리 및 보유 기간</h2>
-                        <p>
-                            회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.
-                        </p>
-                    </section>
+          <section>
+            <h2 className="mb-4 text-xl font-bold text-gray-900 md:text-2xl">2. 수집 항목</h2>
+            <ul className="mt-2 list-disc space-y-3 pl-5">
+              <li>
+                <strong className="text-gray-900">주문 구성 상담:</strong> 이름, 연락처, 지역, 예상 구매 시기,
+                설치할 장소 지목, 구매 예산, 설치 주소, 추가 메모, 선택 모델, 선택 옵션, 예상 총액,
+                구성 URL, 구성 스냅샷(모델·옵션·포함 사양·금액·생성 시각)을 저장합니다.
+              </li>
+              <li>
+                <strong className="text-gray-900">기존 문의:</strong> 이름, 연락처, 이메일(선택), 문의 내용,
+                문의 분류, 처리 상태, 답변 내용과 답변 시각을 저장할 수 있습니다.
+              </li>
+              <li>
+                <strong className="text-gray-900">관리자 이용:</strong> Supabase 인증을 위한 관리자 이메일,
+                로그인 세션 쿠키, 관리자 화면에서 입력한 처리 상태와 내부 메모를 처리합니다.
+              </li>
+              <li>
+                <strong className="text-gray-900">자동 생성 정보:</strong> 서비스 이용 과정에서 IP 주소,
+                브라우저 정보, 접속 일시, 페이지 이용 기록, 쿠키가 생성될 수 있습니다.
+              </li>
+              <li>
+                <strong className="text-gray-900">분석 도구:</strong> Vercel Analytics는 기본 방문 통계를
+                처리할 수 있으며, Google Analytics와 Microsoft Clarity는 환경변수로 설정된 경우에만
+                로드되어 페이지 이용 통계를 처리합니다.
+              </li>
+            </ul>
+          </section>

-                    <section>
-                        <h2 className="text-xl font-bold text-gray-900 mb-4">3. 정보주체와 법정대리인의 권리·의무 및 그 행사방법</h2>
-                        <p>
-                            정보주체는 회사에 대해 언제든지 개인정보 열람·정정·삭제·처리정지 요구 등의 권리를 행사할 수 있습니다.
-                        </p>
-                    </section>
+          <section>
+            <h2 className="mb-4 text-xl font-bold text-gray-900 md:text-2xl">3. 이용 목적</h2>
+            <ul className="mt-2 list-disc space-y-2 pl-5">
+              <li>선택한 모델과 옵션을 바탕으로 상담 요청을 접수하고 구성 내용을 확인합니다.</li>
+              <li>현장 조건, 설치 가능성, 예상 일정, 견적 범위를 안내합니다.</li>
+              <li>기존 문의와 A/S 관련 요청을 확인하고 답변합니다.</li>
+              <li>관리자 화면에서 상담, 문의, 프로젝트, 제품 정보를 운영합니다.</li>
+              <li>서비스 안정성, 유입 경로, 인기 페이지 등 비즈니스 운영 지표를 확인합니다.</li>
+            </ul>
+          </section>

-                    <section>
-                        <h2 className="text-xl font-bold text-gray-900 mb-4">4. 처리하는 개인정보의 항목</h2>
-                        <p>
-                            회사는 다음의 개인정보 항목을 처리하고 있습니다.
-                        </p>
-                        <ul className="list-disc pl-5 mt-2 space-y-1">
-                            <li>성명, 전화번호, 이메일</li>
-                            <li>서비스 이용 기록, 접속 로그, 쿠키, 접속 IP 정보</li>
-                        </ul>
-                    </section>
+          <section>
+            <h2 className="mb-4 text-xl font-bold text-gray-900 md:text-2xl">4. 보유 및 삭제</h2>
+            <p>
+              상담과 문의 정보는 응대, 견적 검토, 분쟁 대응 등 이용 목적에 필요한 기간 동안 보관합니다.
+              이용자가 삭제를 요청하거나 보관 목적이 종료된 경우 관리자가 관리자 화면에서 수동으로 삭제할
+              수 있습니다. 단, 계약·대금 결제·소비자 분쟁 등 관계 법령에 따라 보관해야 하는 정보는 해당
+              기간 동안 보관할 수 있습니다.
+            </p>
+            <p className="mt-4">
+              Supabase 인증 쿠키와 세션 정보는 인증 상태 유지와 보안을 위해 사용되며, 만료·로그아웃·브라우저
+              설정에 따라 삭제됩니다. 분석 도구가 처리하는 정보의 보관 기간과 삭제 방식은 각 제공사의 정책을
+              따릅니다.
+            </p>
+          </section>

-                    <section>
-                        <h2 className="text-xl font-bold text-gray-900 mb-4">5. 개인정보의 파기</h2>
-                        <p>
-                            회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.
-                        </p>
-                    </section>
-                </div>
-            </div>
+          <section>
+            <h2 className="mb-4 text-xl font-bold text-gray-900 md:text-2xl">5. 처리 위탁 및 제3자 도구</h2>
+            <p>
+              위트는 서비스 제공을 위해 Supabase(데이터베이스와 인증), Vercel(호스팅과 기본 분석),
+              Google Analytics(설정된 경우), Microsoft Clarity(설정된 경우)를 사용할 수 있습니다. 각 도구는
+              서비스 운영, 보안, 통계 확인 목적에 한해 사용됩니다.
+            </p>
+          </section>
+
+          <section>
+            <h2 className="mb-4 text-xl font-bold text-gray-900 md:text-2xl">6. 이용자의 권리</h2>
+            <p>
+              이용자는 본인의 개인정보 열람, 정정, 삭제, 처리 정지를 요청할 수 있습니다. 요청은 아래 연락처로
+              접수할 수 있으며, 위트는 본인 확인 후 가능한 범위에서 지체 없이 처리합니다.
+            </p>
+            <ul className="mt-2 list-disc space-y-1 pl-5">
+              <li>담당 부서: 고객지원팀</li>
+              <li>연락처: 010-9645-2348</li>
+            </ul>
+          </section>
         </div>
-    );
+      </div>
+    </div>
+  );
 }
diff --git a/app/products/page.tsx b/app/products/page.tsx
index ecb24eb..c6ebae2 100755
--- a/app/products/page.tsx
+++ b/app/products/page.tsx
@@ -1,10 +1,10 @@
-﻿"use client";
+"use client";

 import { useState, useRef, useEffect } from "react";
 import Image from "next/image";
 import { getProducts } from "@/lib/products";
 import { Product } from "@/types/supabase";
-import { ChevronDown, ChevronUp, X } from "lucide-react";
+import { ChevronDown, Home, X } from "lucide-react";
 import { motion, AnimatePresence } from "framer-motion";
 import { useLanguage } from "@/contexts/LanguageContext";

@@ -99,6 +99,12 @@ export default function ProductsPage() {
     const [products, setProducts] = useState<ProductData[]>([]);
     const [loading, setLoading] = useState(true);
     const [expandedCategories, setExpandedCategories] = useState<string[]>(["S", "M", "L", "XL", "DESIGN"]);
+    const [expandedMobileProducts, setExpandedMobileProducts] = useState<string[]>([]);
+
+    const toggleMobileProduct = (id: string) => {
+        setExpandedMobileProducts(prev => prev.includes(id) ? prev.filter(pid => pid !== id) : [...prev, id]);
+    };
+
     const [activeProduct, setActiveProduct] = useState<string>("");
     const productRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
     const sidebarRef = useRef<HTMLDivElement>(null);
@@ -390,17 +396,17 @@ export default function ProductsPage() {

     if (loading) {
         return (
-            <div className="min-h-screen flex items-center justify-center bg-[#EBEBEB]">
+            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                 <div className="text-xl font-bold text-gray-500">{TEXT.loading}</div>
             </div>
         );
     }

     return (
-        <div className="min-h-screen bg-[#EBEBEB]">
+        <div className="min-h-screen bg-gray-50">
             <div className="flex flex-col lg:flex-row max-w-[1920px] mx-auto relative">
                 {/* Sidebar */}
-                <aside className="w-[280px] h-screen sticky top-0 hidden lg:flex flex-col pt-[140px] pb-10 pl-[60px] overflow-hidden">
+                <aside className="w-[280px] h-screen sticky top-0 hidden lg:flex flex-col pt-[140px] pb-10 pl-[60px] overflow-hidden bg-gray-50 border-r border-gray-100 z-10">
                     <div ref={sidebarRef} className="flex-1 overflow-y-auto pr-6 custom-scrollbar space-y-12">
                         {(Object.keys(sidebarStructure) as Array<keyof typeof sidebarStructure>).map((key) => {
                             const category = sidebarStructure[key];
@@ -517,7 +523,7 @@ export default function ProductsPage() {
                 </aside>

                 {/* Mobile Top Navigation */}
-                <div className={`lg:hidden sticky z-40 bg-[#EBEBEB]/95 backdrop-blur-sm border-b border-gray-200 shadow-sm transition-[top] duration-300 ${isHeaderVisible ? 'top-[105px] md:top-[135px] lg:top-[110px]' : 'top-0'}`}>
+                <div className={`lg:hidden sticky z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm transition-[top] duration-300 ${isHeaderVisible ? 'top-[70px] md:top-[80px]' : 'top-0'}`}>
                     <div className="flex overflow-x-auto px-4 py-3 gap-6 no-scrollbar">
                         {(Object.keys(sidebarStructure) as Array<keyof typeof sidebarStructure>).map((key) => {
                             const category = sidebarStructure[key];
@@ -549,11 +555,15 @@ export default function ProductsPage() {
                 </div>

                 {/* Main Content */}
-                <main className="flex-1 min-h-screen pt-[100px] md:pt-[190px] lg:pt-[140px] px-4 lg:px-20 pb-40">
-                    {/* Active Product Overlay for Desktop (Optional, maybe minimal breadcrumb instead?) */}
-                    {/* Removing the sticky header inside main content to prevent conflicts, Sidebar handles navigation */}
+                <main className="flex-1 min-h-screen pt-[120px] md:pt-[160px] lg:pt-[140px] px-4 lg:px-20 pb-40 bg-white lg:bg-transparent">
+                    <div className="max-w-5xl mx-auto mb-10 lg:mb-32 text-center lg:text-left mt-4 lg:mt-0">
+                        <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-4">{isKO ? '제품 소개' : 'Products'}</h1>
+                        <p className="text-gray-600 text-sm md:text-lg">
+                            {isKO ? '작고 단단한 내 집, 필요한 크기와 목적에 맞는 구성을 찾아보세요.' : 'Find the right size and layout for your needs.'}
+                        </p>
+                    </div>

-                    <div className="max-w-5xl mx-auto space-y-[20vh]"> {/* Increased spacing for better scroll detection */}
+                    <div className="max-w-5xl mx-auto space-y-12 lg:space-y-[20vh]"> {/* Increased spacing for better scroll detection */}
                         {products.map((product, index) => {
                             // Check if this is the first product of its category to render the anchor
                             const isFirstOfCategory = index === 0 || products[index - 1].sizeCategory !== product.sizeCategory;
@@ -568,55 +578,68 @@ export default function ProductsPage() {

                                     <div
                                         ref={(el) => { productRefs.current[product.id] = el; }}
-                                        className="scroll-mt-32"
+                                        className="overflow-hidden rounded-lg border border-gray-100 bg-gray-50 shadow-sm scroll-mt-32 lg:border-none lg:bg-transparent lg:p-0 lg:shadow-none"
                                     >
-                                        {/* Product Header */}
-                                        <div className="mb-8">
-                                            <div className="flex items-baseline gap-4 mb-2">
-                                                <h2 className="text-4xl font-bold text-gray-900">{product.name}</h2>
+                                        <div className="p-5 lg:p-0">
+                                            {/* Product Header */}
+                                            <div className="mb-4 lg:mb-8">
+                                                <div className="flex items-baseline gap-4 mb-1 lg:mb-2">
+                                                    <h2 className="text-2xl lg:text-4xl font-bold text-gray-900">{product.name}</h2>
+                                                </div>
+                                                {product.tagline && (
+                                                    <p className="text-sm lg:text-lg text-gray-600">{product.tagline}</p>
+                                                )}
                                             </div>
-                                            {product.tagline && (
-                                                <p className="text-lg text-gray-600">{product.tagline}</p>
-                                            )}
-                                        </div>

-                                        {/* Main Image */}
-                                        <div
-                                            className="relative w-full aspect-[16/9] bg-gray-200 rounded-2xl overflow-hidden mb-12 shadow-sm cursor-pointer group"
-                                            onClick={() => openGallery(product)}
-                                        >
-                                            {product.imageUrl ? (
-                                                <>
-                                                    <Image
-                                                        src={product.imageUrl}
-                                                        alt={product.name}
-                                                        fill
-                                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
-                                                        sizes="(max-width: 768px) 100vw, 80vw"
-                                                        priority={products.indexOf(product) < 2}
-                                                    />
-                                                    {/* Gallery hint icon */}
-                                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
-                                                        <div className="bg-white/80 backdrop-blur-sm p-3 rounded-full">
-                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6" /><path d="M9 21H3v-6" /><path d="M21 3l-7 7" /><path d="M3 21l7-7" /></svg>
+                                            {/* Main Image */}
+                                            <div
+                                                className="group relative aspect-[16/9] w-full cursor-pointer overflow-hidden rounded-lg bg-gray-200 lg:mb-12"
+                                                onClick={() => openGallery(product)}
+                                            >
+                                                {product.imageUrl ? (
+                                                    <>
+                                                        <Image
+                                                            src={product.imageUrl}
+                                                            alt={product.name}
+                                                            fill
+                                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
+                                                            sizes="(max-width: 768px) 100vw, 80vw"
+                                                            priority={products.indexOf(product) < 2}
+                                                        />
+                                                        {/* Gallery hint icon */}
+                                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
+                                                            <div className="bg-white/80 backdrop-blur-sm p-3 rounded-full">
+                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6" /><path d="M9 21H3v-6" /><path d="M21 3l-7 7" /><path d="M3 21l7-7" /></svg>
+                                                            </div>
                                                         </div>
+                                                        {/* Image count indicator if multiple */}
+                                                        {(product.subImages && product.subImages.length > 0) && (
+                                                            <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm">
+                                                                + {product.subImages.length + 1}
+                                                            </div>
+                                                        )}
+                                                    </>
+                                                ) : (
+                                                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 text-gray-400">
+                                                        <Home className="w-8 h-8 mb-2 opacity-50" />
+                                                        <span className="text-sm font-bold uppercase tracking-wider">Image Coming Soon</span>
                                                     </div>
-                                                    {/* Image count indicator if multiple */}
-                                                    {(product.subImages && product.subImages.length > 0) && (
-                                                        <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm">
-                                                            + {product.subImages.length + 1} Images
-                                                        </div>
-                                                    )}
-                                                </>
-                                            ) : (
-                                                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
-                                                    No Image
-                                                </div>
-                                            )}
+                                                )}
+                                            </div>
+
+                                            {/* Mobile Accordion Toggle */}
+                                            <button
+                                                className="w-full mt-4 flex items-center justify-between lg:hidden text-gray-600 font-bold py-2 px-1 hover:text-gray-900"
+                                                onClick={() => toggleMobileProduct(product.id)}
+                                            >
+                                                <span>{expandedMobileProducts.includes(product.id) ? (isKO ? '상세정보 닫기' : 'Hide Details') : (isKO ? '상세정보 보기' : 'View Details')}</span>
+                                                <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${expandedMobileProducts.includes(product.id) ? 'rotate-180' : ''}`} />
+                                            </button>
                                         </div>

-                                        {/* Details Grid */}
-                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
+                                        {/* Details Grid (Collapsible on Mobile) */}
+                                        <div className={`lg:block ${expandedMobileProducts.includes(product.id) ? 'block px-5 pb-5' : 'hidden'} lg:px-0 lg:pb-0`}>
+                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-20">
                                             {/* Left: Description & Specs */}
                                             <div className="space-y-8">
                                                 <div>
@@ -660,7 +683,7 @@ export default function ProductsPage() {
                                             {/* Right: Floor Plan */}
                                             <div>
                                                 <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">{TEXT.floorPlan}</h3>
-                                                <div className="w-full aspect-[4/3] rounded-xl flex items-center justify-center relative overflow-hidden border border-gray-100">
+                                                <div className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-lg border border-gray-100">
                                                     {product.floorPlan.src ? (
                                                         <div className="relative w-full h-full">
                                                             <Image
@@ -673,7 +696,19 @@ export default function ProductsPage() {
                                                     ) : (
                                                         <div className="text-gray-400 text-sm">{TEXT.floorPlanWaiting}</div>
                                                     )}
-                                                </div>
+                                            </div>
+
+                                            {/* Soft CTA */}
+                                            <div className="mt-8 lg:mt-12 pt-6 border-t border-gray-100 flex justify-center lg:justify-start">
+                                                <a
+                                                    href={`/customize?product=${product.id}`}
+                                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white border border-gray-200 text-gray-900 font-bold text-sm transition-colors hover:bg-gray-50"
+                                                >
+                                                    {isKO ? '비슷한 구성 만들기' : 'Customize this model'}
+                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
+                                                </a>
+                                            </div>
+                                        </div>
                                             </div>
                                         </div>
                                     </div>
diff --git a/app/projects/[id]/page.tsx b/app/projects/[id]/page.tsx
index 062f39a..e941afd 100644
--- a/app/projects/[id]/page.tsx
+++ b/app/projects/[id]/page.tsx
@@ -42,11 +42,11 @@ export default async function ProjectDetailPage({ params }: { params: Promise<{
   }

   return (
-    <div className="container mx-auto px-4 py-16">
-      <div className="max-w-4xl mx-auto">
+    <main className="min-h-screen bg-white px-4 pb-32 pt-16 md:px-8 lg:pt-20">
+      <div className="mx-auto max-w-5xl">
         <Link
           href="/projects"
-          className="inline-flex items-center text-sm text-gray-500 hover:text-blue-600 mb-8 transition-colors"
+          className="mb-8 inline-flex items-center text-sm font-bold text-gray-500 transition-colors hover:text-gray-900"
         >
           ← 목록으로 돌아가기
         </Link>
@@ -54,14 +54,14 @@ export default async function ProjectDetailPage({ params }: { params: Promise<{
         <header className="mb-10">
           <div className="flex gap-2 mb-4">
             {project.tags?.map((tag: string) => (
-              <span key={tag} className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
+              <span key={tag} className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-gray-600">
                 {tag}
               </span>
             ))}
           </div>
-          <h1 className="text-4xl font-bold text-gray-900 mb-6">{project.title}</h1>
+          <h1 className="mb-6 text-4xl font-black text-gray-900 md:text-5xl">{project.title}</h1>

-          <div className="flex flex-wrap gap-y-4 gap-x-12 p-6 bg-gray-50 rounded-xl text-sm border border-gray-100">
+          <div className="grid gap-4 rounded-lg border border-gray-100 bg-gray-50 p-6 text-sm sm:grid-cols-3">
             <div>
               <span className="text-gray-500 block mb-1">고객사</span>
               <span className="font-medium text-gray-900">{project.client}</span>
@@ -78,16 +78,24 @@ export default async function ProjectDetailPage({ params }: { params: Promise<{
         </header>

         <div className="space-y-12">
-          {project.images?.[0] && (
-            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-sm">
+          {project.images?.[0] ? (
+            <div className="relative aspect-video overflow-hidden rounded-lg bg-gray-100 shadow-sm">
               <Image
                 src={project.images[0]}
                 alt={project.title}
                 fill
+                sizes="(max-width: 1024px) 100vw, 960px"
                 className="object-cover"
                 priority
               />
             </div>
+          ) : (
+            <div className="flex aspect-video items-center justify-center rounded-lg border border-gray-100 bg-gray-50 text-center text-gray-400">
+              <div>
+                <p className="text-sm font-black uppercase tracking-[0.18em]">Image Coming Soon</p>
+                <p className="mt-2 text-xs font-medium text-gray-500">{project.title}</p>
+              </div>
+            </div>
           )}

           <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed whitespace-pre-wrap">
@@ -97,11 +105,12 @@ export default async function ProjectDetailPage({ params }: { params: Promise<{
           {project.images && project.images.length > 1 && (
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {project.images.slice(1).map((img: string, i: number) => (
-                <div key={i} className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-100">
+                <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-100">
                   <Image
                     src={img}
                     alt={`${project.title} gallery ${i + 1}`}
                     fill
+                    sizes="(max-width: 768px) 100vw, 50vw"
                     className="object-cover hover:scale-105 transition-transform duration-500"
                   />
                 </div>
@@ -110,6 +119,6 @@ export default async function ProjectDetailPage({ params }: { params: Promise<{
           )}
         </div>
       </div>
-    </div>
+    </main>
   );
 }
diff --git a/app/projects/page.tsx b/app/projects/page.tsx
index ce3161b..ce9442f 100644
--- a/app/projects/page.tsx
+++ b/app/projects/page.tsx
@@ -25,66 +25,70 @@ export default async function ProjectsPage() {
     .order("completed_at", { ascending: false });

   return (
-    <div className="container mx-auto px-4 py-16">
-      <div className="mb-12 text-center">
-        <h1 className="text-3xl font-bold mb-4">Projects</h1>
-        <p className="text-gray-600">WEET가 만들어가는 공간의 기록</p>
-      </div>
+    <main className="min-h-screen bg-white pb-40 pt-16 lg:pt-20">
+      <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-[148px]">
+        <div className="mb-12 lg:mb-20">
+          <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-4">Projects</h1>
+          <p className="text-gray-600 text-sm md:text-lg">WEET가 만들어가는 공간의 기록</p>
+        </div>
+
+        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
+          {projects?.map((project, index) => (
+            <Link
+              key={project.id}
+              href={`/projects/${project.id}`}
+              className="group block overflow-hidden rounded-lg border border-gray-100 bg-gray-50 shadow-sm transition-all duration-300 hover:shadow-md"
+            >
+              <div className="relative aspect-[4/3] bg-gray-200 overflow-hidden">
+                {project.images?.[0] ? (
+                  <Image
+                    src={project.images[0]}
+	                    alt={project.title}
+	                    fill
+	                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
+	                    priority={index === 0}
+	                    className="object-cover group-hover:scale-105 transition-transform duration-500"
+	                  />
+                ) : (
+                  <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 text-gray-400">
+                    <span className="text-sm font-bold uppercase tracking-wider">Image Coming Soon</span>
+                  </div>
+                )}
+                {project.status === 'ongoing' && (
+                  <div className="absolute top-4 right-4 bg-gray-900 text-white text-[11px] px-3 py-1.5 rounded-full font-bold tracking-wider uppercase">
+                    진행중
+                  </div>
+                )}
+              </div>

-      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
-        {projects?.map((project) => (
-          <Link
-            key={project.id}
-            href={`/projects/${project.id}`}
-            className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all duration-200 border border-gray-100"
-          >
-            <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
-              {project.images?.[0] ? (
-                <Image
-                  src={project.images[0]}
-                  alt={project.title}
-                  fill
-                  className="object-cover group-hover:scale-105 transition-transform duration-300"
-                />
-              ) : (
-                <div className="w-full h-full flex items-center justify-center text-gray-400">
-                  No Image
+              <div className="p-6 lg:p-8">
+                <div className="flex flex-wrap gap-2 mb-4">
+                  {project.tags?.map((tag: string) => (
+                    <span key={tag} className="text-[11px] font-bold text-gray-600 bg-white border border-gray-200 px-2.5 py-1 rounded-full uppercase tracking-wider">
+                      {tag}
+                    </span>
+                  ))}
                 </div>
-              )}
-              {project.status === 'ongoing' && (
-                <div className="absolute top-4 right-4 bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-medium">
-                  진행중
+
+                <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-gray-600 transition-colors">
+                  {project.title}
+                </h3>
+
+                <div className="flex items-center justify-between text-[13px] font-medium text-gray-500 mt-6 pt-6 border-t border-gray-200">
+                  <span>{project.client}</span>
+                  <span>{project.completed_at}</span>
                 </div>
-              )}
-            </div>
-
-            <div className="p-6">
-              <div className="flex gap-2 mb-3">
-                {project.tags?.map((tag: string) => (
-                  <span key={tag} className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
-                    {tag}
-                  </span>
-                ))}
-              </div>
-
-              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
-                {project.title}
-              </h3>
-
-              <div className="flex items-center justify-between text-sm text-gray-500 mt-4 pt-4 border-t border-gray-100">
-                <span>{project.client}</span>
-                <span>{project.completed_at}</span>
               </div>
-            </div>
-          </Link>
-        ))}
+            </Link>
+          ))}

-        {(!projects || projects.length === 0) && (
-          <div className="col-span-full text-center py-20 text-gray-500 bg-gray-50 rounded-xl">
-            등록된 프로젝트가 없습니다.
-          </div>
-        )}
+          {(!projects || projects.length === 0) && (
+            <div className="col-span-full rounded-lg border border-gray-100 bg-gray-50 py-32 text-center text-gray-400">
+              <span className="text-lg font-bold">등록된 프로젝트가 없습니다.</span>
+            </div>
+          )}
+        </div>
       </div>
-    </div>
+    </main>
   );
 }
diff --git a/app/solution/page.tsx b/app/solution/page.tsx
index 80c2809..db38efc 100644
--- a/app/solution/page.tsx
+++ b/app/solution/page.tsx
@@ -114,16 +114,16 @@ export default function SolutionPage() {
   const copy = COPY[language];

   return (
-    <div className="min-h-screen bg-[#F9FAFB] font-sans text-[#1A1A1A]">
-      <main>
-        <div className="max-w-[1200px] mx-auto px-4 py-20 md:py-24">
+    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
+      <main className="pb-40 pt-16 lg:pt-20">
+        <div className="max-w-[1200px] mx-auto px-4 md:px-8">

-          <div className="text-center mb-16">
-            <h1 className="text-4xl md:text-[42px] font-extrabold text-[#1A1A1A] tracking-tight mb-6">
+          <div className="text-center mb-16 lg:mb-24">
+            <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight mb-6">
               {copy.title}
             </h1>
             <div className="w-[1px] h-8 bg-gray-300 mx-auto mb-6"></div>
-            <p className="text-[#666666] text-base md:text-lg leading-relaxed max-w-2xl mx-auto break-keep px-4">
+            <p className="text-gray-600 text-sm md:text-lg leading-relaxed max-w-2xl mx-auto break-keep px-4">
               {copy.description}
             </p>
           </div>
@@ -132,30 +132,30 @@ export default function SolutionPage() {
             {copy.cards.map((item) => (
               <div
                 key={item.id}
-                className="group bg-white rounded-xl p-6 md:p-8 shadow-sm border border-transparent hover:border-[#FEBD16] hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-300 flex flex-col items-center text-center cursor-default h-full relative overflow-hidden"
+                className="group relative flex h-full cursor-default flex-col items-center overflow-hidden rounded-lg border border-transparent bg-white p-6 text-center shadow-sm transition-all duration-300 hover:border-[#FEBD16] hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] md:p-8"
               >
                 <div className="absolute top-0 left-0 w-full h-[4px] bg-[#FEBD16] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></div>

-                <div className="w-[80px] h-[80px] rounded-full bg-[#FAFAFA] border border-[#F0F0F0] flex items-center justify-center mb-6 group-hover:bg-[#FFF9E6] group-hover:border-[#FEBD16] transition-all duration-300">
-                  <div className="text-[#888] group-hover:text-[#E5A410] transition-colors duration-300">
+                <div className="w-[80px] h-[80px] rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center mb-6 group-hover:bg-[#FFF9E6] group-hover:border-[#FEBD16] transition-all duration-300">
+                  <div className="text-gray-400 group-hover:text-[#E5A410] transition-colors duration-300">
                     {React.cloneElement(item.icon as React.ReactElement<{ size?: number }>, { size: 36 })}
                   </div>
                 </div>

-                <h3 className="text-[19px] font-bold text-[#1A1A1A] mb-1">{item.title}</h3>
-                <span className="text-[11px] text-[#999999] font-medium uppercase tracking-wider mb-5 block">
+                <h3 className="text-xl font-bold text-gray-900 mb-1">{item.title}</h3>
+                <span className="text-[11px] text-gray-400 font-medium uppercase tracking-wider mb-5 block">
                   {item.subtitle}
                 </span>

-                <p className="text-[#666666] text-[14px] leading-relaxed mb-8 break-keep px-1 flex-grow">
+                <p className="text-gray-600 text-[14px] leading-relaxed mb-8 break-keep px-1 flex-grow">
                   {item.desc}
                 </p>

                 <div className="w-full pt-6 border-t border-gray-100 mt-auto">
-                  <p className="text-xs text-[#888] font-medium mb-4">{item.detail}</p>
+                  <p className="text-xs text-gray-400 font-medium mb-4">{item.detail}</p>
                   <Link
                     href={item.href}
-                    className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-gray-100 text-sm font-bold text-[#1A1A1A] hover:bg-[#FEBD16] hover:text-white transition-all duration-300"
+                    className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-gray-100 text-sm font-bold text-gray-900 hover:bg-[#FEBD16] hover:text-white transition-all duration-300"
                   >
                     {copy.cta} <ArrowRight size={14} />
                   </Link>
diff --git a/app/support/page.tsx b/app/support/page.tsx
index 7845042..c21e597 100644
--- a/app/support/page.tsx
+++ b/app/support/page.tsx
@@ -15,6 +15,12 @@ const steps = [
   { title: '운반·설치', text: '운반, 설치, 마감 확인 후 인도합니다.', icon: Truck },
 ];

+const supportVisuals = [
+  { src: '/images/support/step1.webp', alt: '상담 준비 단계' },
+  { src: '/images/support/step3.webp', alt: '현장 확인 단계' },
+  { src: '/images/support/step6.webp', alt: '운반 설치 단계' },
+];
+
 const fallbackFaqs = [
   {
     question: '이동식주택은 어디에나 설치할 수 있나요?',
@@ -41,13 +47,13 @@ export default async function SupportPage() {
     : fallbackFaqs;

   return (
-    <main className="bg-[#f6f2ea] text-[#2f3432]">
+    <main className="bg-white text-gray-900">
       <section className="px-4 py-14 md:px-8 md:py-20 lg:px-16">
         <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
           <div>
-            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#8d7133]">SUPPORT</p>
-            <h1 className="mt-4 text-4xl font-black leading-tight md:text-6xl">진행 과정과 확인사항</h1>
-            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#625b50]">
+            <p className="text-sm font-black uppercase tracking-[0.18em] text-gray-500">SUPPORT</p>
+            <h1 className="mt-4 text-4xl font-black leading-tight md:text-6xl text-gray-900">진행 과정과 확인사항</h1>
+            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
               처음 준비하는 이동식주택도 막막하지 않도록, 진행 과정과 꼭 확인할 내용을 쉽게 정리했습니다.
             </p>
             <Link
@@ -58,65 +64,73 @@ export default async function SupportPage() {
               <ArrowRight className="h-4 w-4" />
             </Link>
           </div>
-          <div className="relative min-h-[340px] overflow-hidden rounded-lg border border-[#ded5c8] bg-[#fbfaf7] md:min-h-[500px]">
-            <Image
-              src="/images/support/step3.webp"
-              alt="이동식주택 현장 확인"
-              fill
-              sizes="(max-width: 1024px) 100vw, 52vw"
-              className="object-cover"
-            />
+          <div className="grid min-h-[340px] grid-cols-2 gap-3 overflow-hidden rounded-lg border border-gray-200 bg-gray-50 p-3 md:min-h-[500px]">
+            {supportVisuals.map((visual, index) => (
+              <div
+                key={visual.src}
+                className={`relative overflow-hidden rounded-lg bg-gray-200 ${index === 0 ? 'col-span-2 aspect-[16/9]' : 'aspect-[4/3]'}`}
+              >
+                <Image
+                  src={visual.src}
+                  alt={visual.alt}
+                  fill
+                  sizes={index === 0 ? '(max-width: 1024px) 100vw, 52vw' : '(max-width: 1024px) 50vw, 26vw'}
+                  priority={index === 0}
+                  className="object-cover"
+                />
+              </div>
+            ))}
           </div>
         </div>
       </section>

-      <section id="process" className="border-y border-[#ded5c8] bg-[#fbfaf7] px-4 py-14 md:px-8 lg:px-16">
+      <section id="process" className="border-y border-gray-100 bg-gray-50 px-4 py-14 md:px-8 lg:px-16">
         <div className="mx-auto max-w-[1400px]">
           <div className="mb-8">
-            <p className="text-sm font-black text-[#8d7133]">PROCESS</p>
-            <h2 className="mt-2 text-3xl font-black md:text-4xl">구매 과정</h2>
+            <p className="text-sm font-black text-gray-500">PROCESS</p>
+            <h2 className="mt-2 text-3xl font-black md:text-4xl text-gray-900">구매 과정</h2>
           </div>
           <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
             {steps.map((step, index) => (
-              <div key={step.title} className="rounded-lg border border-[#ded5c8] bg-[#f6f2ea] p-5">
+              <div key={step.title} className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
                 <div className="flex items-center justify-between gap-3">
-                  <step.icon className="h-6 w-6 text-[#8d7133]" />
-                  <span className="text-sm font-black text-[#c4b79f]">{String(index + 1).padStart(2, '0')}</span>
+                  <step.icon className="h-6 w-6 text-gray-400" />
+                  <span className="text-sm font-black text-gray-300">{String(index + 1).padStart(2, '0')}</span>
                 </div>
-                <h3 className="mt-5 text-xl font-black">{step.title}</h3>
-                <p className="mt-3 text-sm leading-7 text-[#625b50]">{step.text}</p>
+                <h3 className="mt-5 text-xl font-black text-gray-900">{step.title}</h3>
+                <p className="mt-3 text-sm leading-7 text-gray-600">{step.text}</p>
               </div>
             ))}
           </div>
         </div>
       </section>

-      <section id="faq" className="px-4 py-14 md:px-8 lg:px-16">
+      <section id="faq" className="px-4 py-14 md:px-8 lg:px-16 bg-white">
         <div className="mx-auto grid max-w-[1400px] gap-8 lg:grid-cols-[0.35fr_0.65fr]">
           <div>
-            <p className="text-sm font-black text-[#8d7133]">FAQ</p>
-            <h2 className="mt-2 text-3xl font-black md:text-4xl">자주 묻는 질문</h2>
+            <p className="text-sm font-black text-gray-500">FAQ</p>
+            <h2 className="mt-2 text-3xl font-black md:text-4xl text-gray-900">자주 묻는 질문</h2>
           </div>
           <div className="space-y-3">
             {faqs.map((faq, index) => (
-              <details key={`${faq.question}-${index}`} className="group rounded-lg border border-[#ded5c8] bg-[#fbfaf7]">
-                <summary className="flex cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left font-bold">
+              <details key={`${faq.question}-${index}`} className="group rounded-lg border border-gray-200 bg-gray-50">
+                <summary className="flex cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left font-bold text-gray-900">
                   {faq.question}
-                  <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-open:rotate-90" />
+                  <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-open:rotate-90 text-gray-400" />
                 </summary>
-                <p className="border-t border-[#eee6da] px-5 py-4 text-sm leading-7 text-[#625b50]">{faq.answer}</p>
+                <p className="border-t border-gray-200 px-5 py-4 text-sm leading-7 text-gray-600 bg-white rounded-b-lg">{faq.answer}</p>
               </details>
             ))}
           </div>
         </div>
       </section>

-      <section id="as" className="bg-[#2f3432] px-4 py-14 text-[#fbfaf7] md:px-8 lg:px-16">
+      <section id="as" className="bg-gray-900 px-4 py-14 text-white md:px-8 lg:px-16">
         <div className="mx-auto grid max-w-[1400px] gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
           <div>
-            <p className="text-sm font-black text-[#d3a745]">A/S</p>
-            <h2 className="mt-2 text-3xl font-black md:text-4xl">사용 이후까지 확인합니다</h2>
-            <p className="mt-5 text-base leading-8 text-[#d8d0c3]">
+            <p className="text-sm font-black text-gray-400">A/S</p>
+            <h2 className="mt-2 text-3xl font-black md:text-4xl text-white">사용 이후까지 확인합니다</h2>
+            <p className="mt-5 text-base leading-8 text-gray-300">
               완성 후에도 문, 창호, 욕실, 설비처럼 실제 생활에서 자주 쓰는 부분을 중심으로 불편 사항을 확인하고 필요한 조치를 안내합니다.
             </p>
           </div>
@@ -126,24 +140,24 @@ export default async function SupportPage() {
               { icon: Bath, title: '욕실·설비' },
               { icon: Wrench, title: '마감 점검' },
             ].map((item) => (
-              <div key={item.title} className="rounded-lg border border-white/15 bg-white/5 p-5">
-                <item.icon className="h-6 w-6 text-[#d3a745]" />
-                <p className="mt-4 font-bold">{item.title}</p>
+              <div key={item.title} className="rounded-lg border border-gray-800 bg-gray-800/50 p-5">
+                <item.icon className="h-6 w-6 text-gray-300" />
+                <p className="mt-4 font-bold text-white">{item.title}</p>
               </div>
             ))}
           </div>
         </div>
       </section>

-      <section className="px-4 py-14 text-center md:px-8 lg:px-16">
-        <PhoneCall className="mx-auto h-7 w-7 text-[#8d7133]" />
-        <h2 className="mt-4 text-3xl font-black md:text-4xl">구성부터 시작하면 상담이 쉬워집니다</h2>
-        <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-[#625b50]">
+      <section className="px-4 py-14 text-center md:px-8 lg:px-16 bg-gray-50 pb-32">
+        <PhoneCall className="mx-auto h-7 w-7 text-gray-400" />
+        <h2 className="mt-4 text-3xl font-black md:text-4xl text-gray-900">구성부터 시작하면 상담이 쉬워집니다</h2>
+        <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-gray-600">
           모델과 옵션을 먼저 선택하면, 상담에서 필요한 현장 확인과 예산 범위를 더 빠르게 좁힐 수 있습니다.
         </p>
         <Link
           href="/customize"
-          className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[#2f3432] px-6 text-sm font-bold text-white transition-colors hover:bg-[#1f2422]"
+          className="mt-8 inline-flex h-14 items-center justify-center gap-2 rounded-lg bg-gray-900 px-8 text-sm font-bold text-white transition-colors hover:bg-gray-800"
         >
           나만의 위트 만들기
           <ArrowRight className="h-4 w-4" />
diff --git a/app/terms/page.tsx b/app/terms/page.tsx
index 14aec63..7b55287 100644
--- a/app/terms/page.tsx
+++ b/app/terms/page.tsx
@@ -15,52 +15,89 @@ export const metadata: Metadata = {
 };

 export default function TermsPage() {
-    return (
-        <div className="min-h-screen bg-white pt-32 pb-24 px-4 sm:px-6 lg:px-8">
-            <div className="max-w-3xl mx-auto">
-                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 pb-4 border-b border-gray-200">
-                    이용약관
-                </h1>
+  return (
+    <div className="min-h-screen bg-gray-50 px-4 pb-32 pt-16 sm:px-6 md:pt-20 lg:px-8">
+      <div className="mx-auto max-w-4xl rounded-lg border border-gray-100 bg-white p-8 shadow-sm md:p-12 lg:p-16">
+        <h1 className="mb-8 border-b border-gray-200 pb-6 text-3xl font-black text-gray-900 md:text-5xl">
+          이용약관
+        </h1>

-                <div className="prose prose-lg max-w-none text-gray-600 space-y-8">
-                    <p className="text-sm text-gray-400">최종 수정일: 2025년 12월 12일</p>
+        <div className="prose prose-lg max-w-none space-y-10 text-gray-600">
+          <p className="text-sm font-bold text-gray-400">최종 수정일: 2026년 6월 7일</p>

-                    <section>
-                        <h2 className="text-xl font-bold text-gray-900 mb-4">제1조 (목적)</h2>
-                        <p>
-                            본 약관은 회사가 제공하는 서비스의 이용조건 및 절차, 회사와 회원 간의 권리, 의무 및 책임사항 등을 규정함을 목적으로 합니다.
-                        </p>
-                    </section>
+          <section>
+            <h2 className="mb-4 text-xl font-bold text-gray-900 md:text-2xl">제1조 (목적)</h2>
+            <p>
+              본 약관은 주식회사 위트(이하 "회사")가 운영하는 홈페이지에서 제공하는 이동식주택 정보,
+              제품 구성, 상담 요청, 프로젝트·솔루션 콘텐츠, 관리자 운영과 관련한 이용 조건을 정합니다.
+            </p>
+          </section>

-                    <section>
-                        <h2 className="text-xl font-bold text-gray-900 mb-4">제2조 (약관의 효력 및 변경)</h2>
-                        <p>
-                            본 약관은 서비스를 이용하고자 하는 모든 회원에게 효력이 발생합니다. 회사는 필요한 경우 관련 법령을 위배하지 않는 범위 내에서 본 약관을 변경할 수 있습니다.
-                        </p>
-                    </section>
+          <section>
+            <h2 className="mb-4 text-xl font-bold text-gray-900 md:text-2xl">제2조 (서비스의 내용)</h2>
+            <ul className="mt-2 list-disc space-y-2 pl-5">
+              <li>이동식주택 및 모듈러 건축 제품, 프로젝트, 솔루션 정보 제공</li>
+              <li>모델과 옵션을 선택해 예상 구성을 확인하는 온라인 구성 도구 제공</li>
+              <li>구성 스냅샷을 기반으로 한 상담 요청 접수와 후속 연락</li>
+              <li>기존 문의, A/S, 현장 확인, 제작·운반·설치 관련 안내</li>
+              <li>관리자 계정을 통한 제품, 프로젝트, 상담, 문의 데이터 운영</li>
+            </ul>
+          </section>

-                    <section>
-                        <h2 className="text-xl font-bold text-gray-900 mb-4">제3조 (서비스의 제공)</h2>
-                        <p>
-                            회사는 회원에게 안정적인 서비스를 제공하기 위해 최선을 다하며, 기술적 사유나 운영상의 목적으로 서비스의 전부 또는 일부를 변경하거나 중단할 수 있습니다.
-                        </p>
-                    </section>
+          <section>
+            <h2 className="mb-4 text-xl font-bold text-gray-900 md:text-2xl">제3조 (예상 견적과 상담)</h2>
+            <p>
+              홈페이지에서 표시되는 예상 총액은 선택한 모델과 옵션을 기준으로 산출한 참고 금액입니다.
+              실제 계약 금액과 일정은 현장 진입 조건, 인허가, 기초·전기·상하수도 등 별도 공사, 운반 거리,
+              자재와 제작 일정에 따라 달라질 수 있습니다. 상담 요청 시 저장되는 구성 스냅샷은 후속 상담과
+              견적 검토를 위한 내부 기록으로 사용됩니다.
+            </p>
+          </section>

-                    <section>
-                        <h2 className="text-xl font-bold text-gray-900 mb-4">제4조 (회원의 의무)</h2>
-                        <p>
-                            회원은 본 약관 및 관련 법령을 준수해야 하며, 회사의 업무를 방해하거나 타인의 권리를 침해하는 행위를 하여서는 안 됩니다.
-                        </p>
-                    </section>
+          <section>
+            <h2 className="mb-4 text-xl font-bold text-gray-900 md:text-2xl">제4조 (계약과 설치 확정)</h2>
+            <p>
+              홈페이지 상담 요청만으로 제작, 운반, 설치 계약이 체결되는 것은 아닙니다. 최종 계약은 회사와
+              이용자가 현장 조건, 설계 범위, 제작 사양, 설치 일정, 대금 조건을 별도로 확인한 뒤 서면 계약
+              또는 이에 준하는 합의로 확정됩니다.
+            </p>
+          </section>

-                    <section>
-                        <h2 className="text-xl font-bold text-gray-900 mb-4">제5조 (책임의 제한)</h2>
-                        <p>
-                            회사는 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는 서비스 제공에 관한 책임이 면제됩니다.
-                        </p>
-                    </section>
-                </div>
-            </div>
+          <section>
+            <h2 className="mb-4 text-xl font-bold text-gray-900 md:text-2xl">제5조 (이용자의 의무)</h2>
+            <ul className="mt-2 list-disc space-y-2 pl-5">
+              <li>이용자는 상담에 필요한 이름, 연락처, 지역, 설치 주소, 현장 조건을 사실에 맞게 입력해야 합니다.</li>
+              <li>타인의 개인정보나 권리를 침해하는 내용, 허위 문의, 자동화된 대량 요청을 등록해서는 안 됩니다.</li>
+              <li>인허가, 토지 이용 가능성, 현장 접근성 등 이용자 측 확인이 필요한 사항은 상담 과정에서 성실히 공유해야 합니다.</li>
+            </ul>
+          </section>
+
+          <section>
+            <h2 className="mb-4 text-xl font-bold text-gray-900 md:text-2xl">제6조 (콘텐츠와 이용 권리)</h2>
+            <p>
+              홈페이지에 게시된 제품 이미지, 프로젝트 사진, 도면성 참고 이미지, 문구, 로고, 영상, UI 구성 등
+              모든 콘텐츠의 권리는 회사 또는 정당한 권리자에게 있습니다. 이용자는 서비스 이용과 상담 검토
+              목적 범위에서만 콘텐츠를 열람할 수 있으며, 회사의 사전 동의 없이 복제, 배포, 2차 저작물 제작,
+              영리적 이용을 할 수 없습니다.
+            </p>
+            <p className="mt-4">
+              이용자가 상담이나 문의 과정에서 제공한 메모, 현장 정보, 요청 사항은 상담 응대와 견적 검토,
+              내부 운영 기록을 위해 사용할 수 있습니다. 이용자가 회사에 전달하는 이미지, 자료, 텍스트가 있는
+              경우 이용자는 해당 자료를 제공할 권리가 있음을 보장해야 합니다.
+            </p>
+          </section>
+
+          <section>
+            <h2 className="mb-4 text-xl font-bold text-gray-900 md:text-2xl">제7조 (책임의 제한)</h2>
+            <p>
+              회사는 홈페이지 정보의 정확성을 유지하기 위해 노력하지만, 제품 사양, 가격, 일정, 이미지 표현은
+              실제 상담과 계약 과정에서 변경될 수 있습니다. 천재지변, 기상 악화, 운송 제한, 인허가 지연,
+              이용자가 제공한 정보의 부정확성으로 발생한 지연이나 추가 비용에 대해서는 회사의 고의 또는
+              중대한 과실이 없는 한 책임이 제한됩니다.
+            </p>
+          </section>
         </div>
-    );
+      </div>
+    </div>
+  );
 }
diff --git a/components/admin/AdminSidebar.tsx b/components/admin/AdminSidebar.tsx
index 4275595..1e4df54 100644
--- a/components/admin/AdminSidebar.tsx
+++ b/components/admin/AdminSidebar.tsx
@@ -100,7 +100,7 @@ const navigation: { title: string; items: NavItem[] }[] = [
     }
 ];

-export default function AdminSidebar({ user }: { user?: any }) {
+export default function AdminSidebar({ user, onClose }: { user?: any, onClose?: () => void }) {
     const pathname = usePathname();
     const router = useRouter();
     const supabase = createClient();
@@ -137,8 +137,9 @@ export default function AdminSidebar({ user }: { user?: any }) {
                                     <Link
                                         key={item.name}
                                         href={item.href}
+                                        onClick={onClose}
                                         className={cn(
-                                            "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group",
+                                            "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 group",
                                             isActive
                                                 ? "bg-white/10 text-white shadow-lg backdrop-blur-sm"
                                                 : "text-gray-400 hover:bg-white/5 hover:text-white"
diff --git a/components/admin/consultations/ConsultationManager.tsx b/components/admin/consultations/ConsultationManager.tsx
index 22888a2..253d5be 100644
--- a/components/admin/consultations/ConsultationManager.tsx
+++ b/components/admin/consultations/ConsultationManager.tsx
@@ -50,7 +50,7 @@ export default function ConsultationManager({ consultations, count }: Consultati
       </div>

       <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
-        <div className="grid grid-cols-[110px_1fr_140px_150px_1.2fr_160px] gap-4 border-b border-gray-200 bg-gray-50 px-4 py-3 text-xs font-bold uppercase text-gray-500">
+        <div className="hidden grid-cols-[110px_1fr_140px_150px_1.2fr_160px] gap-4 border-b border-gray-200 bg-gray-50 px-4 py-3 text-xs font-bold uppercase text-gray-500 lg:grid">
           <span>상태</span>
           <span>이름</span>
           <span>연락처</span>
@@ -64,19 +64,37 @@ export default function ConsultationManager({ consultations, count }: Consultati
         ) : (
           consultations.map((item) => (
             <div key={item.id} className="border-b border-gray-100 last:border-b-0">
-              <div className="grid grid-cols-[110px_1fr_140px_150px_1.2fr_160px] gap-4 px-4 py-4 text-sm">
-                <select
-                  value={item.status}
-                  onChange={(event) => runAction('상태 변경', () => updateCustomizeConsultationStatus(item.id, event.target.value as ConsultationStatus))}
-                  className="h-9 rounded-lg border border-gray-300 px-2 text-sm"
-                >
-                  {STATUSES.map((status) => <option key={status} value={status}>{status}</option>)}
-                </select>
-                <strong className="text-gray-950">{item.customerName}</strong>
-                <span>{item.phone}</span>
-                <span>{item.region}</span>
-                <span className="truncate text-gray-600">{item.memo || '-'}</span>
-                <span className="text-gray-500">{new Date(item.createdAt).toLocaleString('ko-KR')}</span>
+              <div className="grid gap-3 px-4 py-4 text-sm lg:grid-cols-[110px_1fr_140px_150px_1.2fr_160px] lg:items-center lg:gap-4">
+                <div className="flex items-center justify-between gap-3 lg:block">
+                  <span className="text-xs font-bold uppercase text-gray-400 lg:hidden">상태</span>
+                  <select
+                    value={item.status}
+                    onChange={(event) => runAction('상태 변경', () => updateCustomizeConsultationStatus(item.id, event.target.value as ConsultationStatus))}
+                    className="h-9 w-32 rounded-lg border border-gray-300 px-2 text-sm lg:w-full"
+                  >
+                    {STATUSES.map((status) => <option key={status} value={status}>{status}</option>)}
+                  </select>
+                </div>
+                <div>
+                  <span className="mb-1 block text-xs font-bold uppercase text-gray-400 lg:hidden">이름</span>
+                  <strong className="text-gray-950">{item.customerName}</strong>
+                </div>
+                <div>
+                  <span className="mb-1 block text-xs font-bold uppercase text-gray-400 lg:hidden">연락처</span>
+                  <span>{item.phone}</span>
+                </div>
+                <div>
+                  <span className="mb-1 block text-xs font-bold uppercase text-gray-400 lg:hidden">지역</span>
+                  <span>{item.region}</span>
+                </div>
+                <div className="min-w-0">
+                  <span className="mb-1 block text-xs font-bold uppercase text-gray-400 lg:hidden">메모</span>
+                  <span className="block truncate text-gray-600">{item.memo || '-'}</span>
+                </div>
+                <div>
+                  <span className="mb-1 block text-xs font-bold uppercase text-gray-400 lg:hidden">생성일</span>
+                  <span className="text-gray-500">{new Date(item.createdAt).toLocaleString('ko-KR')}</span>
+                </div>
               </div>

               <details className="group px-4 pb-4">
@@ -109,7 +127,7 @@ export default function ConsultationManager({ consultations, count }: Consultati
                         onChange={(event) => setMemos((current) => ({ ...current, [item.id]: event.target.value }))}
                         className="min-h-24 w-full rounded-lg border border-gray-300 p-3 text-sm outline-none focus:ring-2 focus:ring-black/20"
                       />
-                      <div className="mt-3 flex justify-between gap-3">
+                      <div className="mt-3 flex flex-col justify-between gap-3 sm:flex-row">
                         <Button variant="outline" onClick={() => runAction('내부 메모 저장', () => updateCustomizeConsultationMemo(item.id, memos[item.id] ?? ''))}>
                           <Save className="h-4 w-4" />
                           메모 저장
diff --git a/components/layout/ClientLayout.tsx b/components/layout/ClientLayout.tsx
index 3896543..f07c691 100644
--- a/components/layout/ClientLayout.tsx
+++ b/components/layout/ClientLayout.tsx
@@ -36,7 +36,7 @@ export default function ClientLayout({
     return (
         <>
             <Header />
-            <main className="flex-1 pt-[70px] md:pt-[90px] lg:pt-[110px]">{children}</main>
+            <main className="flex-1 pt-[70px] md:pt-[80px] lg:pt-[80px]">{children}</main>
             <Footer />
             <Toaster position="top-right" richColors />
         </>
diff --git a/components/layout/Footer.tsx b/components/layout/Footer.tsx
index adaa1f0..958aaf6 100644
--- a/components/layout/Footer.tsx
+++ b/components/layout/Footer.tsx
@@ -6,7 +6,7 @@ import { Instagram, Carrot } from 'lucide-react';
 export default function Footer() {
   const { language } = useLanguage();
   return (
-    <footer className="bg-primary pt-[19px] pb-4 md:pt-[27px] md:pb-6">
+    <footer className="bg-[#1f2422] text-gray-300 pt-[19px] pb-4 md:pt-[27px] md:pb-6 overflow-hidden">
       <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-[140px]">
         <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-8">
           {/* Left side - Logo */}
@@ -24,10 +24,10 @@ export default function Footer() {

           {/* Center - Company Info */}
           <div className="flex-1 space-y-1 md:ml-4 pb-1">
-            <h3 className="text-[20px] md:text-[28px] font-bold text-black font-sans leading-none mb-2">
+            <h3 className="text-[20px] md:text-[28px] font-bold text-white font-sans leading-none mb-2">
               'WE make dreams comE <Link href="/admin" className="cursor-default text-inherit hover:no-underline">True</Link>'
             </h3>
-            <div className="text-[11px] md:text-[12px] text-black leading-relaxed font-medium">
+            <div className="text-[11px] md:text-[12px] text-gray-400 leading-relaxed font-medium">
               {language === 'KO' ? (
                 <p>주식회사 위트(weet) &nbsp;|&nbsp; 함평군 대동면 금산길 205-27 &nbsp;|&nbsp; 사업자 등록번호 660-86-01862 &nbsp;|&nbsp; 010 9645 2348</p>
               ) : (
@@ -38,7 +38,7 @@ export default function Footer() {

           {/* Right side - Copyright and Links */}
           <div className="text-left md:text-right space-y-3 flex-shrink-0">
-            <div className="flex items-center gap-5 md:justify-end text-black">
+            <div className="flex items-center gap-5 md:justify-end text-gray-300">
               <Link
                 href="https://www.daangn.com/kr/local-profile/%EC%9C%84%ED%8A%B8weet-kihpx4ctggn6/"
                 target="_blank"
@@ -68,15 +68,15 @@ export default function Footer() {
               </Link>
             </div>
             <div className="space-y-1">
-              <p className="text-[11px] md:text-[12px] font-bold text-black whitespace-nowrap">
+              <p className="text-[11px] md:text-[12px] font-bold text-gray-400 whitespace-nowrap">
                 Copyright © weet All right reserved
               </p>
-              <div className="flex flex-wrap gap-2 text-[10px] md:text-[11px] text-black md:justify-end font-bold">
-                <Link href="/privacy" className="hover:text-black/70 transition-colors duration-200">{language === 'KO' ? '개인정보 처리방침' : 'Privacy Policy'}</Link>
+              <div className="flex flex-wrap gap-2 text-[10px] md:text-[11px] text-gray-400 md:justify-end font-bold">
+                <Link href="/privacy" className="hover:text-white transition-colors duration-200">{language === 'KO' ? '개인정보 처리방침' : 'Privacy Policy'}</Link>
                 <span>|</span>
-                <Link href="/terms" className="hover:text-black/70 transition-colors duration-200">{language === 'KO' ? '이용약관' : 'Terms of Use'}</Link>
+                <Link href="/terms" className="hover:text-white transition-colors duration-200">{language === 'KO' ? '이용약관' : 'Terms of Use'}</Link>
                 <span>|</span>
-                <Link href="/company" className="hover:text-black/70 transition-colors duration-200">{language === 'KO' ? '회사소개' : 'About Us'}</Link>
+                <Link href="/company" className="hover:text-white transition-colors duration-200">{language === 'KO' ? '회사소개' : 'About Us'}</Link>
               </div>
             </div>
           </div>
diff --git a/components/layout/Header.tsx b/components/layout/Header.tsx
index 235c187..3da126d 100644
--- a/components/layout/Header.tsx
+++ b/components/layout/Header.tsx
@@ -226,15 +226,15 @@ export default function Header() {
       >
         <div className="max-w-[1600px] mx-auto">
           {/* Main Header */}
-          <div className="relative flex items-center h-[105px] md:h-[135px] lg:h-[110px] px-4 md:px-8 lg:px-[64px]">
+          <div className="relative flex items-center h-[70px] md:h-[80px] lg:h-[80px] px-4 md:px-8 lg:px-[64px]">
             {/* Logo */}
             <Link href="/" className="absolute left-4 md:left-8 lg:left-[64px] top-1/2 -translate-y-1/2 xl:static xl:transform-none">
-              <div className="w-[80px] h-[80px] md:w-[100px] md:h-[100px] lg:w-[90px] lg:h-[90px] relative select-none">
+              <div className="w-[60px] h-[60px] relative select-none">
                 <Image
                   src="/images/logo_new.webp"
                   alt="위트(weet) 로고"
                   fill
-                  sizes="(max-width: 768px) 80px, (max-width: 1024px) 100px, 90px"
+                  sizes="60px"
                   className="object-contain"
                   priority
                   draggable={false}
@@ -339,8 +339,7 @@ export default function Header() {
             >
               <div className="flex justify-center w-full">
                 <div
-                  className="flex py-6 gap-[60px] pl-[60px] pr-[180px] rounded-b-2xl shadow-sm pointer-events-auto"
-                  style={{ backgroundColor: '#EBEBEB' }}
+                  className="flex py-6 gap-[60px] pl-[60px] pr-[180px] rounded-b-2xl shadow-sm pointer-events-auto bg-gray-50 border-t border-gray-100"
                   onMouseEnter={() => setShowMegaMenu(true)}
                 >
                   {navigation.map((item) => (
@@ -377,7 +376,7 @@ export default function Header() {

       {/* Full Screen Mobile Menu - Rendered via Portal */}
       {typeof document !== 'undefined' && mobileMenuOpen && createPortal(
-        <div className="lg:hidden fixed inset-0 bg-white z-[100] overflow-y-auto animate-fade-in">
+        <div className="xl:hidden fixed inset-0 bg-white z-[100] overflow-y-auto animate-fade-in">
           {/* Header with Close Button */}
           <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
             <Link href="/" onClick={handleMobileMenuClose}>
diff --git a/components/solution/FeatureModal.tsx b/components/solution/FeatureModal.tsx
index 6617694..4de2e1e 100644
--- a/components/solution/FeatureModal.tsx
+++ b/components/solution/FeatureModal.tsx
@@ -1,8 +1,9 @@
 'use client';

-import { X } from 'lucide-react';
+import { Image as ImageIcon, X } from 'lucide-react';
 import Image from 'next/image';
 import { useEffect } from 'react';
+import { useLanguage } from '@/contexts/LanguageContext';

 interface FeatureModalProps {
     isOpen: boolean;
@@ -16,6 +17,9 @@ interface FeatureModalProps {
 }

 export default function FeatureModal({ isOpen, onClose, feature }: FeatureModalProps) {
+    const { language } = useLanguage();
+    const imagePendingLabel = language === 'KO' ? '이미지 준비 중' : 'Image pending';
+
     useEffect(() => {
         if (isOpen) {
             document.body.style.overflow = 'hidden';
@@ -32,7 +36,7 @@ export default function FeatureModal({ isOpen, onClose, feature }: FeatureModalP
     return (
         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300" onClick={onClose}>
             <div
-                className="bg-white w-full max-w-4xl max-h-[85vh] rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden animate-in fade-in zoom-in-95 duration-300"
+                className="bg-white w-full max-w-4xl max-h-[85vh] rounded-lg shadow-2xl flex flex-col md:flex-row overflow-hidden animate-in fade-in zoom-in-95 duration-300"
                 onClick={(e) => e.stopPropagation()}
             >
                 {/* Close Button Mobile */}
@@ -53,7 +57,10 @@ export default function FeatureModal({ isOpen, onClose, feature }: FeatureModalP
                             className="object-cover"
                         />
                     ) : (
-                        <div className="text-gray-400">No Image</div>
+                        <div className="flex flex-col items-center justify-center gap-3 text-gray-500">
+                            <ImageIcon className="h-7 w-7" />
+                            <span className="text-sm font-semibold">{imagePendingLabel}</span>
+                        </div>
                     )}
                 </div>

@@ -66,7 +73,12 @@ export default function FeatureModal({ isOpen, onClose, feature }: FeatureModalP
                             fill
                             className="object-cover"
                         />
-                    ) : null}
+                    ) : (
+                        <div className="flex h-full flex-col items-center justify-center gap-3 text-gray-500">
+                            <ImageIcon className="h-7 w-7" />
+                            <span className="text-sm font-semibold">{imagePendingLabel}</span>
+                        </div>
+                    )}
                 </div>

                 {/* Right: Content */}
diff --git a/components/solution/SolutionTemplate.tsx b/components/solution/SolutionTemplate.tsx
index 9a1db28..5f14433 100644
--- a/components/solution/SolutionTemplate.tsx
+++ b/components/solution/SolutionTemplate.tsx
@@ -4,7 +4,7 @@ import { useState, useRef } from 'react';
 import Image from 'next/image';
 import Link from 'next/link';
 import { motion, useScroll, useTransform } from 'framer-motion';
-import { ChevronRight } from 'lucide-react';
+import { ChevronRight, Image as ImageIcon } from 'lucide-react';
 import { cn } from '@/lib/utils';
 import FeatureModal from './FeatureModal';
 import { useLanguage } from '@/contexts/LanguageContext';
@@ -50,6 +50,7 @@ export default function SolutionTemplate({
     const { language } = useLanguage();
     const navLinks = language === 'KO' ? NAV.KO : NAV.EN;
     const viewMoreLabel = language === 'KO' ? '자세히 보기' : 'View more';
+    const imagePendingLabel = language === 'KO' ? '이미지 준비 중' : 'Image pending';
     const containerRef = useRef<HTMLDivElement>(null);
     const { scrollYProgress } = useScroll({
         target: containerRef,
@@ -146,7 +147,7 @@ export default function SolutionTemplate({
                                 initial={{ opacity: 0, y: 20 }}
                                 animate={{ opacity: 1, y: 0 }}
                                 transition={{ duration: 0.5, delay: index * 0.1 }}
-                                className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-500 border border-gray-100 flex flex-col"
+                                className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-500 border border-gray-100 flex flex-col"
                             >
                                 <div className="relative h-64 overflow-hidden cursor-pointer" onClick={() => openModal(feature)}>
                                     {feature.image ? (
@@ -159,8 +160,9 @@ export default function SolutionTemplate({
                                             className="object-cover group-hover:scale-105 transition-transform duration-700"
                                         />
                                     ) : (
-                                        <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
-                                            No Image
+                                        <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gray-100 text-gray-500">
+                                            <ImageIcon className="h-7 w-7" />
+                                            <span className="text-sm font-semibold">{imagePendingLabel}</span>
                                         </div>
                                     )}
                                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
diff --git a/e2e/header-navigation.spec.ts b/e2e/header-navigation.spec.ts
index ac239b4..0af7738 100644
--- a/e2e/header-navigation.spec.ts
+++ b/e2e/header-navigation.spec.ts
@@ -44,18 +44,35 @@ test.describe('Header Navigation', () => {
     await page.setViewportSize({ width: 375, height: 667 });

     await page.goto('/');
+    await page.waitForLoadState('networkidle');

     const menuButton = page.locator('button[aria-label="Toggle mobile menu"]');
+    await expect(menuButton).toBeVisible();
     await menuButton.click();

-    await page.waitForTimeout(300);
-
     const customizeMenu = page.getByRole('link', { name: '주문하기' });
-    await expect(customizeMenu).toBeVisible();
+    await expect(customizeMenu).toBeVisible({ timeout: 10000 });

     await customizeMenu.click();

     await page.waitForTimeout(500);
     await expect(page).toHaveURL(/\/customize(\?c=.*)?$/);
   });
+
+  test('tablet menu opens between lg and xl breakpoints', async ({ page }) => {
+    await page.setViewportSize({ width: 1100, height: 800 });
+
+    await page.goto('/');
+    await page.waitForLoadState('networkidle');
+
+    const menuButton = page.locator('button[aria-label="Toggle mobile menu"]');
+    await expect(menuButton).toBeVisible();
+    await menuButton.click();
+
+    const customizeMenu = page.getByRole('link', { name: '주문하기' });
+    await expect(customizeMenu).toBeVisible({ timeout: 10000 });
+
+    await customizeMenu.click();
+    await expect(page).toHaveURL(/\/customize(\?c=.*)?$/);
+  });
 });
diff --git a/e2e/public-pages.spec.ts b/e2e/public-pages.spec.ts
index 914790a..919bba3 100644
--- a/e2e/public-pages.spec.ts
+++ b/e2e/public-pages.spec.ts
@@ -1,4 +1,19 @@
 import { expect, test } from '@playwright/test';
+import { config as loadEnv } from 'dotenv';
+
+loadEnv({ path: '.env.local' });
+
+const adminId = process.env.E2E_ADMIN_ID;
+const adminPassword = process.env.E2E_ADMIN_PASSWORD;
+
+async function loginAsAdmin(page: import('@playwright/test').Page) {
+  await page.goto('/login');
+  await page.getByLabel('아이디').fill(adminId!);
+  await page.getByLabel('비밀번호').fill(adminPassword!);
+  await page.getByRole('button', { name: '로그인' }).click();
+  await expect(page).toHaveURL(/\/admin/);
+  await expect(page.getByRole('heading', { name: '대시보드' })).toBeVisible();
+}

 test.describe('Public page transition', () => {
   test('homepage leads with mobile home configuration CTA', async ({ page }) => {
@@ -27,4 +42,112 @@ test.describe('Public page transition', () => {
     await expect(page.getByText('POP-UP STORE / BRAND SHOWROOM')).toBeVisible();
     await expect(page.getByText('SMART FARM')).toBeVisible();
   });
+
+  test('footer contains hidden admin link on True', async ({ page }) => {
+    await page.goto('/');
+
+    const adminLink = page.locator('footer a[href="/admin"]');
+    await expect(adminLink).toBeAttached();
+    await expect(adminLink).toHaveText('True');
+    await expect(adminLink).toHaveCSS('cursor', 'default');
+
+    await adminLink.click();
+    await expect(page).toHaveURL(/\/login/);
+  });
+
+  test('products page mobile detail accordion opens without overflow', async ({ page }) => {
+    await page.setViewportSize({ width: 375, height: 667 });
+    await page.goto('/products');
+
+    const overflowX = await page.evaluate(() => {
+      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
+    });
+    expect(overflowX).toBeFalsy();
+
+    const toggleButton = page.getByRole('button', { name: /상세정보 보기|View Details/ }).first();
+    await expect(toggleButton).toBeVisible();
+    await toggleButton.click();
+    await expect(page.getByRole('button', { name: /상세정보 닫기|Hide Details/ }).first()).toBeVisible();
+    await expect(page.getByRole('heading', { name: /설명|Description/ }).first()).toBeVisible();
+  });
+
+  test('key public pages do not horizontally overflow on mobile', async ({ page }) => {
+    await page.setViewportSize({ width: 375, height: 667 });
+
+    for (const path of ['/', '/support', '/products', '/modular', '/bespoke', '/solution', '/projects', '/privacy', '/terms', '/login']) {
+      await page.goto(path);
+      const overflowX = await page.evaluate(() => {
+        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
+      });
+      expect(overflowX, `${path} has horizontal overflow`).toBeFalsy();
+    }
+  });
+});
+
+test.describe('Admin responsive shell', () => {
+  test('mobile drawer opens, navigates, and keeps dangerous settings collapsed', async ({ page }) => {
+    test.skip(!adminId || !adminPassword, 'Admin credentials are required for authenticated admin UI checks.');
+
+    await page.setViewportSize({ width: 390, height: 844 });
+    await loginAsAdmin(page);
+
+    await page.getByLabel('관리자 메뉴 열기').click();
+    await expect(page.getByRole('link', { name: '설정' })).toBeVisible();
+    await page.getByRole('link', { name: '설정' }).click();
+
+    await expect(page).toHaveURL(/\/admin\/settings/);
+    await expect(page.getByRole('heading', { name: '설정', exact: true })).toBeVisible();
+    await expect(page.getByText('고급 / 위험 작업')).toBeVisible();
+    await expect(page.getByRole('button', { name: '데이터 이관 실행' })).toHaveCount(0);
+
+    await page.getByText('고급 / 위험 작업').click();
+    const migrationButton = page.getByRole('button', { name: '데이터 이관 실행' });
+    await expect(migrationButton).toBeVisible();
+
+    let confirmMessage = '';
+    const dialogHandled = new Promise<void>((resolve) => {
+      page.once('dialog', async (dialog) => {
+        confirmMessage = dialog.message();
+        await dialog.dismiss();
+        resolve();
+      });
+    });
+    await migrationButton.click();
+    await dialogHandled;
+    expect(confirmMessage).toContain('위험 작업입니다');
+
+    const overflowX = await page.evaluate(() => {
+      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
+    });
+    expect(overflowX).toBeFalsy();
+  });
+
+  test('key admin routes avoid horizontal overflow on mobile', async ({ page }) => {
+    test.skip(!adminId || !adminPassword, 'Admin credentials are required for authenticated admin UI checks.');
+
+    await page.setViewportSize({ width: 390, height: 844 });
+    await loginAsAdmin(page);
+
+    for (const path of [
+      '/admin',
+      '/admin/main',
+      '/admin/products',
+      '/admin/customize',
+      '/admin/projects',
+      '/admin/support',
+      '/admin/insights',
+      '/admin/gallery',
+      '/admin/consultations',
+      '/admin/inquiries',
+      '/admin/utm',
+      '/admin/settings',
+    ]) {
+      await page.goto(path);
+      await page.waitForLoadState('networkidle');
+      const overflowX = await page.evaluate(() => {
+        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
+      });
+      expect(overflowX, `${path} has horizontal overflow`).toBeFalsy();
+    }
+  });
 });
~~~

## 7. Relevant excerpts after MUST_FIX

### components/layout/Header.tsx:380-490

~~~tsx
 380            {/* Header with Close Button */}
 381            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
 382              <Link href="/" onClick={handleMobileMenuClose}>
 383                <div className="w-[60px] h-[60px] relative select-none">
 384                  <Image
 385                    src="/images/logo_new.webp"
 386                    alt="위트(weet) 로고"
 387                    fill
 388                    sizes="60px"
 389                    className="object-contain"
 390                    draggable={false}
 391                  />
 392                </div>
 393              </Link>
 394              <button
 395                onClick={handleMobileMenuClose}
 396                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
 397                type="button"
 398              >
 399                <X className="w-7 h-7" />
 400              </button>
 401            </div>
 402
 403            {/* Menu Content */}
 404            <nav className="px-6 py-8">
 405              {navigation.map((item, index) => {
 406                const hasSubmenu = item.submenu && item.submenu.length > 0;
 407                const isExpanded = expandedMenu === item.name;
 408
 409                return (
 410                  <div
 411                    key={item.name}
 412                    className="mb-8 last:mb-0"
 413                    style={{ animationDelay: `${index * 50}ms` }}
 414                  >
 415                    {hasSubmenu ? (
 416                      <>
 417                        <button
 418                          onClick={() => setExpandedMenu(isExpanded ? null : item.name)}
 419                          className="flex items-center justify-between w-full text-left mb-3"
 420                          type="button"
 421                        >
 422                          <span className="block text-lg md:text-xl font-bold text-black hover:text-gray-600 transition-colors">
 423                            {item.name}
 424                          </span>
 425                          {hasSubmenu && (
 426                            <ChevronDown
 427                              className={cn(
 428                                "w-6 h-6 text-black transition-transform duration-300",
 429                                isExpanded && "rotate-180"
 430                              )}
 431                            />
 432                          )}
 433                        </button>
 434
 435                        <AnimatePresence>
 436                          {isExpanded && hasSubmenu && (
 437                            <motion.div
 438                              initial={{ height: 0, opacity: 0 }}
 439                              animate={{ height: "auto", opacity: 1 }}
 440                              exit={{ height: 0, opacity: 0 }}
 441                              transition={{ duration: 0.3, ease: "easeInOut" }}
 442                              className="overflow-hidden"
 443                            >
 444                              <div className="ml-4 space-y-2 pb-2">
 445                                {item.submenu.map((subitem, idx) => (
 446                                  <Link
 447                                    key={idx}
 448                                    href={subitem.href}
 449                                    onClick={handleMobileMenuClose}
 450                                    className="block text-sm md:text-base text-gray-600 hover:text-black transition-colors py-1"
 451                                  >
 452                                    {subitem.name}
 453                                  </Link>
 454                                ))}
 455                              </div>
 456                            </motion.div>
 457                          )}
 458                        </AnimatePresence>
 459                      </>
 460                    ) : (
 461                      <Link
 462                        href={item.href}
 463                        onClick={handleMobileMenuClose}
 464                        className="block text-lg md:text-xl font-bold text-black hover:text-gray-600 transition-colors mb-3"
 465                      >
 466                        {item.name}
 467                      </Link>
 468                    )}
 469                  </div>
 470                );
 471              })}
 472            </nav>
 473
 474            {/* Bottom Section */}
 475            <div className="px-6 pb-8 space-y-6">
 476              {/* Language Selector */}
 477              {/* Language Selector */}
 478              <div className="flex items-center gap-3 text-xs font-medium">
 479                <button
 480                  onClick={() => setLanguage('KO')}
 481                  className={cn("font-bold transition-colors", language === 'KO' ? "text-black" : "text-gray-400 hover:text-black")}
 482                >
 483                  KO
 484                </button>
 485                <span className="text-gray-300">|</span>
 486                <button
 487                  onClick={() => setLanguage('EN')}
 488                  className={cn("font-bold transition-colors", language === 'EN' ? "text-black" : "text-gray-400 hover:text-black")}
 489                >
 490                  EN
~~~

### app/privacy/page.tsx:1-116

~~~tsx
   1  import React from 'react';
   2  import type { Metadata } from 'next';
   3
   4  export const metadata: Metadata = {
   5    title: '개인정보처리방침',
   6    description: '위트(WEET) 개인정보처리방침 안내 페이지입니다.',
   7    alternates: {
   8      canonical: '/privacy',
   9    },
  10    openGraph: {
  11      url: '/privacy',
  12      title: '개인정보처리방침',
  13      description: '위트(WEET) 개인정보처리방침 안내 페이지입니다.',
  14    },
  15  };
  16
  17  export default function PrivacyPage() {
  18    return (
  19      <div className="min-h-screen bg-gray-50 px-4 pb-32 pt-16 sm:px-6 md:pt-20 lg:px-8">
  20        <div className="mx-auto max-w-4xl rounded-lg border border-gray-100 bg-white p-8 shadow-sm md:p-12 lg:p-16">
  21          <h1 className="mb-8 border-b border-gray-200 pb-6 text-3xl font-black text-gray-900 md:text-5xl">
  22            개인정보처리방침
  23          </h1>
  24
  25          <div className="prose prose-lg max-w-none space-y-10 text-gray-600">
  26            <p className="text-sm font-bold text-gray-400">최종 수정일: 2026년 6월 7일</p>
  27
  28            <section>
  29              <h2 className="mb-4 text-xl font-bold text-gray-900 md:text-2xl">1. 개인정보 처리 범위</h2>
  30              <p>
  31                주식회사 위트(WEET)는 홈페이지에서 이동식주택 구성 상담, 기존 문의 응대, 관리자 운영,
  32                서비스 이용 통계 확인에 필요한 최소한의 개인정보를 처리합니다. 온라인 예상 견적은 상담을
  33                시작하기 위한 참고 정보이며, 최종 계약 정보는 별도 상담과 계약 절차에서 확정됩니다.
  34              </p>
  35            </section>
  36
  37            <section>
  38              <h2 className="mb-4 text-xl font-bold text-gray-900 md:text-2xl">2. 수집 항목</h2>
  39              <ul className="mt-2 list-disc space-y-3 pl-5">
  40                <li>
  41                  <strong className="text-gray-900">주문 구성 상담:</strong> 이름, 연락처, 지역, 예상 구매 시기,
  42                  설치할 장소 지목, 구매 예산, 설치 주소, 추가 메모, 선택 모델, 선택 옵션, 예상 총액,
  43                  구성 URL, 구성 스냅샷(모델·옵션·포함 사양·금액·생성 시각)을 저장합니다.
  44                </li>
  45                <li>
  46                  <strong className="text-gray-900">기존 문의:</strong> 이름, 연락처, 이메일(선택), 문의 내용,
  47                  문의 분류, 처리 상태, 답변 내용과 답변 시각을 저장할 수 있습니다.
  48                </li>
  49                <li>
  50                  <strong className="text-gray-900">관리자 이용:</strong> Supabase 인증을 위한 관리자 이메일,
  51                  로그인 세션 쿠키, 관리자 화면에서 입력한 처리 상태와 내부 메모를 처리합니다.
  52                </li>
  53                <li>
  54                  <strong className="text-gray-900">자동 생성 정보:</strong> 서비스 이용 과정에서 IP 주소,
  55                  브라우저 정보, 접속 일시, 페이지 이용 기록, 쿠키가 생성될 수 있습니다.
  56                </li>
  57                <li>
  58                  <strong className="text-gray-900">분석 도구:</strong> Vercel Analytics는 기본 방문 통계를
  59                  처리할 수 있으며, Google Analytics와 Microsoft Clarity는 환경변수로 설정된 경우에만
  60                  로드되어 페이지 이용 통계를 처리합니다.
  61                </li>
  62              </ul>
  63            </section>
  64
  65            <section>
  66              <h2 className="mb-4 text-xl font-bold text-gray-900 md:text-2xl">3. 이용 목적</h2>
  67              <ul className="mt-2 list-disc space-y-2 pl-5">
  68                <li>선택한 모델과 옵션을 바탕으로 상담 요청을 접수하고 구성 내용을 확인합니다.</li>
  69                <li>현장 조건, 설치 가능성, 예상 일정, 견적 범위를 안내합니다.</li>
  70                <li>기존 문의와 A/S 관련 요청을 확인하고 답변합니다.</li>
  71                <li>관리자 화면에서 상담, 문의, 프로젝트, 제품 정보를 운영합니다.</li>
  72                <li>서비스 안정성, 유입 경로, 인기 페이지 등 비즈니스 운영 지표를 확인합니다.</li>
  73              </ul>
  74            </section>
  75
  76            <section>
  77              <h2 className="mb-4 text-xl font-bold text-gray-900 md:text-2xl">4. 보유 및 삭제</h2>
  78              <p>
  79                상담과 문의 정보는 응대, 견적 검토, 분쟁 대응 등 이용 목적에 필요한 기간 동안 보관합니다.
  80                이용자가 삭제를 요청하거나 보관 목적이 종료된 경우 관리자가 관리자 화면에서 수동으로 삭제할
  81                수 있습니다. 단, 계약·대금 결제·소비자 분쟁 등 관계 법령에 따라 보관해야 하는 정보는 해당
  82                기간 동안 보관할 수 있습니다.
  83              </p>
  84              <p className="mt-4">
  85                Supabase 인증 쿠키와 세션 정보는 인증 상태 유지와 보안을 위해 사용되며, 만료·로그아웃·브라우저
  86                설정에 따라 삭제됩니다. 분석 도구가 처리하는 정보의 보관 기간과 삭제 방식은 각 제공사의 정책을
  87                따릅니다.
  88              </p>
  89            </section>
  90
  91            <section>
  92              <h2 className="mb-4 text-xl font-bold text-gray-900 md:text-2xl">5. 처리 위탁 및 제3자 도구</h2>
  93              <p>
  94                위트는 서비스 제공을 위해 Supabase(데이터베이스와 인증), Vercel(호스팅과 기본 분석),
  95                Google Analytics(설정된 경우), Microsoft Clarity(설정된 경우)를 사용할 수 있습니다. 각 도구는
  96                서비스 운영, 보안, 통계 확인 목적에 한해 사용됩니다.
  97              </p>
  98            </section>
  99
 100            <section>
 101              <h2 className="mb-4 text-xl font-bold text-gray-900 md:text-2xl">6. 이용자의 권리</h2>
 102              <p>
 103                이용자는 본인의 개인정보 열람, 정정, 삭제, 처리 정지를 요청할 수 있습니다. 요청은 아래 연락처로
 104                접수할 수 있으며, 위트는 본인 확인 후 가능한 범위에서 지체 없이 처리합니다.
 105              </p>
 106              <ul className="mt-2 list-disc space-y-1 pl-5">
 107                <li>담당 부서: 고객지원팀</li>
 108                <li>연락처: 010-9645-2348</li>
 109              </ul>
 110            </section>
 111          </div>
 112        </div>
 113      </div>
 114    );
 115  }
 116
~~~

### app/terms/page.tsx:1-104

~~~tsx
   1  import React from 'react';
   2  import type { Metadata } from 'next';
   3
   4  export const metadata: Metadata = {
   5    title: '이용약관',
   6    description: '위트(WEET) 이용약관 안내 페이지입니다.',
   7    alternates: {
   8      canonical: '/terms',
   9    },
  10    openGraph: {
  11      url: '/terms',
  12      title: '이용약관',
  13      description: '위트(WEET) 이용약관 안내 페이지입니다.',
  14    },
  15  };
  16
  17  export default function TermsPage() {
  18    return (
  19      <div className="min-h-screen bg-gray-50 px-4 pb-32 pt-16 sm:px-6 md:pt-20 lg:px-8">
  20        <div className="mx-auto max-w-4xl rounded-lg border border-gray-100 bg-white p-8 shadow-sm md:p-12 lg:p-16">
  21          <h1 className="mb-8 border-b border-gray-200 pb-6 text-3xl font-black text-gray-900 md:text-5xl">
  22            이용약관
  23          </h1>
  24
  25          <div className="prose prose-lg max-w-none space-y-10 text-gray-600">
  26            <p className="text-sm font-bold text-gray-400">최종 수정일: 2026년 6월 7일</p>
  27
  28            <section>
  29              <h2 className="mb-4 text-xl font-bold text-gray-900 md:text-2xl">제1조 (목적)</h2>
  30              <p>
  31                본 약관은 주식회사 위트(이하 "회사")가 운영하는 홈페이지에서 제공하는 이동식주택 정보,
  32                제품 구성, 상담 요청, 프로젝트·솔루션 콘텐츠, 관리자 운영과 관련한 이용 조건을 정합니다.
  33              </p>
  34            </section>
  35
  36            <section>
  37              <h2 className="mb-4 text-xl font-bold text-gray-900 md:text-2xl">제2조 (서비스의 내용)</h2>
  38              <ul className="mt-2 list-disc space-y-2 pl-5">
  39                <li>이동식주택 및 모듈러 건축 제품, 프로젝트, 솔루션 정보 제공</li>
  40                <li>모델과 옵션을 선택해 예상 구성을 확인하는 온라인 구성 도구 제공</li>
  41                <li>구성 스냅샷을 기반으로 한 상담 요청 접수와 후속 연락</li>
  42                <li>기존 문의, A/S, 현장 확인, 제작·운반·설치 관련 안내</li>
  43                <li>관리자 계정을 통한 제품, 프로젝트, 상담, 문의 데이터 운영</li>
  44              </ul>
  45            </section>
  46
  47            <section>
  48              <h2 className="mb-4 text-xl font-bold text-gray-900 md:text-2xl">제3조 (예상 견적과 상담)</h2>
  49              <p>
  50                홈페이지에서 표시되는 예상 총액은 선택한 모델과 옵션을 기준으로 산출한 참고 금액입니다.
  51                실제 계약 금액과 일정은 현장 진입 조건, 인허가, 기초·전기·상하수도 등 별도 공사, 운반 거리,
  52                자재와 제작 일정에 따라 달라질 수 있습니다. 상담 요청 시 저장되는 구성 스냅샷은 후속 상담과
  53                견적 검토를 위한 내부 기록으로 사용됩니다.
  54              </p>
  55            </section>
  56
  57            <section>
  58              <h2 className="mb-4 text-xl font-bold text-gray-900 md:text-2xl">제4조 (계약과 설치 확정)</h2>
  59              <p>
  60                홈페이지 상담 요청만으로 제작, 운반, 설치 계약이 체결되는 것은 아닙니다. 최종 계약은 회사와
  61                이용자가 현장 조건, 설계 범위, 제작 사양, 설치 일정, 대금 조건을 별도로 확인한 뒤 서면 계약
  62                또는 이에 준하는 합의로 확정됩니다.
  63              </p>
  64            </section>
  65
  66            <section>
  67              <h2 className="mb-4 text-xl font-bold text-gray-900 md:text-2xl">제5조 (이용자의 의무)</h2>
  68              <ul className="mt-2 list-disc space-y-2 pl-5">
  69                <li>이용자는 상담에 필요한 이름, 연락처, 지역, 설치 주소, 현장 조건을 사실에 맞게 입력해야 합니다.</li>
  70                <li>타인의 개인정보나 권리를 침해하는 내용, 허위 문의, 자동화된 대량 요청을 등록해서는 안 됩니다.</li>
  71                <li>인허가, 토지 이용 가능성, 현장 접근성 등 이용자 측 확인이 필요한 사항은 상담 과정에서 성실히 공유해야 합니다.</li>
  72              </ul>
  73            </section>
  74
  75            <section>
  76              <h2 className="mb-4 text-xl font-bold text-gray-900 md:text-2xl">제6조 (콘텐츠와 이용 권리)</h2>
  77              <p>
  78                홈페이지에 게시된 제품 이미지, 프로젝트 사진, 도면성 참고 이미지, 문구, 로고, 영상, UI 구성 등
  79                모든 콘텐츠의 권리는 회사 또는 정당한 권리자에게 있습니다. 이용자는 서비스 이용과 상담 검토
  80                목적 범위에서만 콘텐츠를 열람할 수 있으며, 회사의 사전 동의 없이 복제, 배포, 2차 저작물 제작,
  81                영리적 이용을 할 수 없습니다.
  82              </p>
  83              <p className="mt-4">
  84                이용자가 상담이나 문의 과정에서 제공한 메모, 현장 정보, 요청 사항은 상담 응대와 견적 검토,
  85                내부 운영 기록을 위해 사용할 수 있습니다. 이용자가 회사에 전달하는 이미지, 자료, 텍스트가 있는
  86                경우 이용자는 해당 자료를 제공할 권리가 있음을 보장해야 합니다.
  87              </p>
  88            </section>
  89
  90            <section>
  91              <h2 className="mb-4 text-xl font-bold text-gray-900 md:text-2xl">제7조 (책임의 제한)</h2>
  92              <p>
  93                회사는 홈페이지 정보의 정확성을 유지하기 위해 노력하지만, 제품 사양, 가격, 일정, 이미지 표현은
  94                실제 상담과 계약 과정에서 변경될 수 있습니다. 천재지변, 기상 악화, 운송 제한, 인허가 지연,
  95                이용자가 제공한 정보의 부정확성으로 발생한 지연이나 추가 비용에 대해서는 회사의 고의 또는
  96                중대한 과실이 없는 한 책임이 제한됩니다.
  97              </p>
  98            </section>
  99          </div>
 100        </div>
 101      </div>
 102    );
 103  }
 104
~~~

### app/admin/settings/page.tsx:20-120

~~~tsx
  20          };
  21          getUser();
  22      }, [supabase]);
  23
  24      const userId = userEmail.split('@')[0];
  25
  26      const handleMigration = async () => {
  27          if (!confirm('위험 작업입니다. 기존 제품 데이터를 데이터베이스로 이관하시겠습니까? 이미 데이터가 있으면 중복 데이터가 생성될 수 있습니다.')) {
  28              return;
  29          }
  30
  31          setMigrating(true);
  32          setMessage('');
  33
  34          try {
  35              await migrateProducts();
  36              setMessage('데이터 이관이 완료되었습니다.');
  37          } catch (error) {
  38              console.error(error);
  39              setMessage('데이터 이관 중 오류가 발생했습니다.');
  40          } finally {
  41              setMigrating(false);
  42          }
  43      };
  44
  45      return (
  46          <div>
  47              <h1 className="text-2xl font-bold text-gray-900 mb-8">설정</h1>
  48
  49              <div className="space-y-6">
  50                  {/* Account Settings (Placeholder) */}
  51                  <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm md:p-8">
  52                      <h2 className="text-lg font-bold text-gray-900 mb-4">계정 설정</h2>
  53                      <div className="grid gap-6 max-w-xl">
  54                          <div>
  55                              <label className="block text-sm font-medium text-gray-700 mb-1">아이디</label>
  56                              <input
  57                                  type="text"
  58                                  disabled
  59                                  value={userId}
  60                                  className="w-full px-3 py-2 bg-gray-100 border border-gray-200 rounded-lg text-sm text-gray-500 cursor-not-allowed"
  61                              />
  62                          </div>
  63                          <div>
  64                              <label className="block text-sm font-medium text-gray-700 mb-1">비밀번호</label>
  65                              <button className="text-sm text-blue-600 hover:underline font-medium">
  66                                  비밀번호 변경
  67                              </button>
  68                          </div>
  69                      </div>
  70                  </div>
  71
  72                  {/* Notification Settings (Placeholder) */}
  73                  <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm md:p-8">
  74                      <h2 className="text-lg font-bold text-gray-900 mb-4">알림 설정</h2>
  75                      <div className="space-y-4">
  76                          <div className="flex items-center justify-between max-w-xl">
  77                              <div>
  78                                  <p className="text-sm font-medium text-gray-900">이메일 알림</p>
  79                                  <p className="text-xs text-gray-500">새로운 문의가 들어오면 이메일로 알림을 받습니다.</p>
  80                              </div>
  81                              <input type="checkbox" defaultChecked className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black" />
  82                          </div>
  83                      </div>
  84                  </div>
  85
  86                  {/* Data Management */}
  87                  <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm md:p-8">
  88                      <h2 className="text-lg font-bold text-gray-900 mb-4">데이터 관리</h2>
  89                      <details className="rounded-lg border border-red-200 bg-red-50/60">
  90                          <summary className="cursor-pointer px-4 py-3 text-sm font-bold text-red-700">
  91                              고급 / 위험 작업
  92                          </summary>
  93                          <div className="border-t border-red-200 bg-white p-4">
  94                              <h3 className="font-medium text-gray-900 mb-2">초기 데이터 이관 (Migration)</h3>
  95                              <p className="text-sm text-gray-500 mb-4">
  96                                  하드코딩된 제품 데이터를 Supabase 데이터베이스로 복사합니다.
  97                                  <br />
  98                                  이미 데이터가 존재하는 경우 중복될 수 있으니 주의하세요.
  99                              </p>
 100                              <button
 101                                  onClick={handleMigration}
 102                                  disabled={migrating}
 103                                  className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 disabled:opacity-50"
 104                              >
 105                                  {migrating && <Loader2 className="w-4 h-4 animate-spin" />}
 106                                  데이터 이관 실행
 107                              </button>
 108                              {message && (
 109                                  <p className={`mt-2 text-sm ${message.includes('오류') ? 'text-red-600' : 'text-green-600'}`}>
 110                                      {message}
 111                                  </p>
 112                              )}
 113                          </div>
 114                      </details>
 115                  </div>
 116              </div>
 117          </div>
 118      );
 119  }
 120
~~~

### e2e/header-navigation.spec.ts:35-79

~~~tsx
  35      await customizeMenu.hover();
  36
  37      await page.waitForTimeout(300);
  38
  39      const highlightBar = page.locator('span.bg-primary.opacity-100').first();
  40      await expect(highlightBar).toBeVisible();
  41    });
  42
  43    test('mobile menu should have "주문하기" item', async ({ page }) => {
  44      await page.setViewportSize({ width: 375, height: 667 });
  45
  46      await page.goto('/');
  47      await page.waitForLoadState('networkidle');
  48
  49      const menuButton = page.locator('button[aria-label="Toggle mobile menu"]');
  50      await expect(menuButton).toBeVisible();
  51      await menuButton.click();
  52
  53      const customizeMenu = page.getByRole('link', { name: '주문하기' });
  54      await expect(customizeMenu).toBeVisible({ timeout: 10000 });
  55
  56      await customizeMenu.click();
  57
  58      await page.waitForTimeout(500);
  59      await expect(page).toHaveURL(/\/customize(\?c=.*)?$/);
  60    });
  61
  62    test('tablet menu opens between lg and xl breakpoints', async ({ page }) => {
  63      await page.setViewportSize({ width: 1100, height: 800 });
  64
  65      await page.goto('/');
  66      await page.waitForLoadState('networkidle');
  67
  68      const menuButton = page.locator('button[aria-label="Toggle mobile menu"]');
  69      await expect(menuButton).toBeVisible();
  70      await menuButton.click();
  71
  72      const customizeMenu = page.getByRole('link', { name: '주문하기' });
  73      await expect(customizeMenu).toBeVisible({ timeout: 10000 });
  74
  75      await customizeMenu.click();
  76      await expect(page).toHaveURL(/\/customize(\?c=.*)?$/);
  77    });
  78  });
  79
~~~

### e2e/public-pages.spec.ts:88-125

~~~tsx
  88    test('mobile drawer opens, navigates, and keeps dangerous settings collapsed', async ({ page }) => {
  89      test.skip(!adminId || !adminPassword, 'Admin credentials are required for authenticated admin UI checks.');
  90
  91      await page.setViewportSize({ width: 390, height: 844 });
  92      await loginAsAdmin(page);
  93
  94      await page.getByLabel('관리자 메뉴 열기').click();
  95      await expect(page.getByRole('link', { name: '설정' })).toBeVisible();
  96      await page.getByRole('link', { name: '설정' }).click();
  97
  98      await expect(page).toHaveURL(/\/admin\/settings/);
  99      await expect(page.getByRole('heading', { name: '설정', exact: true })).toBeVisible();
 100      await expect(page.getByText('고급 / 위험 작업')).toBeVisible();
 101      await expect(page.getByRole('button', { name: '데이터 이관 실행' })).toHaveCount(0);
 102
 103      await page.getByText('고급 / 위험 작업').click();
 104      const migrationButton = page.getByRole('button', { name: '데이터 이관 실행' });
 105      await expect(migrationButton).toBeVisible();
 106
 107      let confirmMessage = '';
 108      const dialogHandled = new Promise<void>((resolve) => {
 109        page.once('dialog', async (dialog) => {
 110          confirmMessage = dialog.message();
 111          await dialog.dismiss();
 112          resolve();
 113        });
 114      });
 115      await migrationButton.click();
 116      await dialogHandled;
 117      expect(confirmMessage).toContain('위험 작업입니다');
 118
 119      const overflowX = await page.evaluate(() => {
 120        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
 121      });
 122      expect(overflowX).toBeFalsy();
 123    });
 124
 125    test('key admin routes avoid horizontal overflow on mobile', async ({ page }) => {
~~~

## 8. Validation after cycle 1 MUST_FIX

~~~text
- npm run lint: PASS, eslint . --max-warnings=0
- npm run test: PASS, Vitest 2 files passed, 6 tests passed
- npm run build: PASS, compiled successfully, TypeScript finished, generated 22 routes; only existing middleware/proxy deprecation warning
- E2E_ADMIN_ID=<redacted> E2E_ADMIN_PASSWORD=<redacted> npx playwright test e2e/public-pages.spec.ts -g 'mobile drawer opens': PASS, 1 passed
- E2E_ADMIN_ID=<redacted> E2E_ADMIN_PASSWORD=<redacted> npx playwright test: PASS, 17 passed in 20.9s
~~~

## 9. Browser/Playwright evidence carried forward

- Public mobile overflow at 390px was false for /, /support, /products, /modular, /bespoke, /solution, /projects, /privacy, /terms, /login.
- Authenticated admin mobile overflow at 390px was false for all required admin routes.
- Footer hidden admin link on True was attached, text True, computed cursor default, and clicking redirected to /login when unauthenticated.
- Products mobile accordion opened and showed the details section.
- Admin drawer opened on mobile and settings navigation worked.
- Admin danger section is collapsed by default; after expansion, clicking migration shows a confirm dialog whose message contains 위험 작업입니다, and the test dismisses it.
- Tablet header regression check at 1100x800 now passes.

## 10. Exact review questions

1. Do the cycle 1 MUST_FIX items appear fully resolved based on the diff, excerpts, and validation?
2. Are there any remaining concrete MUST_FIX blockers, or can this return VERDICT: PASS?
3. Keep subjective design refinements under OPTIONAL only.

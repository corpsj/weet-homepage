# GPT-5.5 Pro Review Request - Cycle 2

Review marker: WEET_CUSTOMIZE_REVIEW_20260606_CYCLE2. This is the second and final Pro review cycle after applying cycle 1 MUST_FIX feedback. Return only:

~~~
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

## Active Task Brief

# Current Task: 위트 주문/홈페이지 전환 통합 구현

## Required workflow

Read `AGENTS.md` and `codex-loop.md` before implementation.

Before asking GPT-5.5 Pro for review:

1. Create `.codex/review-packet.md` from `.codex/review-template.md`.
2. Include the full active task brief.
3. Include current repo state, git status, git diff, relevant file excerpts, commands run, and validation output.
4. Paste the full packet into GPT-5.5 Pro in Chrome.
5. Save the full response to `.codex/pro-review.md`.
6. Apply concrete `MUST_FIX` feedback only.
7. Repeat at most 2 Pro review cycles.

## Active task brief

Implement the complete Weet order/homepage transition plan.

### Summary

- Restore `/bespoke` to the public page from commit `3ae1ec0`.
- Remove the incorrectly added BESPOKE option admin, server actions, local migration, dashboard/sidebar references, and generated types.
- Build a new DB-driven `/customize` mobile-home configurator.
- Rework the homepage around the flow: configuration entry, trust, consultation.
- Replace the public inquiry-centered flow with the new consultation flow.
- Rebuild `/support` as a purchase process, FAQ, and A/S reassurance page.
- Manage Supabase directly: backup remote schema/migration state, add the new `customize`/consultation schema, apply migration, and regenerate types.
- Use the GPT-5.5 Pro review loop before completion.
- Run validation and push the final branch to GitHub.

### `/bespoke`

- Restore the public `/bespoke` page to `3ae1ec0:app/bespoke/page.tsx`.
- Treat the restoration as public-page restoration only.
- Remove wrong BESPOKE option management functionality.
- Do not create a remote drop migration, because the wrong BESPOKE tables were not applied to remote Supabase.

### `/customize`

- Build the new order configurator at `/customize` using shadcn-style UI and lucide icons.
- Desktop layout: floorplan/visual area 64%, option panel 36%.
- Mobile layout: floorplan first, bottom `예상 총액` bar, option/order drawer.
- Use a Tesla/Porsche-style vertical option panel.
- Floorplan coordinate system: `1000x420`.
- Compact 3x6 floorplan: `600x300`.
- Standard 3x9 floorplan: `900x300`.
- Keep the right edge fixed; expand left when switching from 3x6 to 3x9.
- Do not show dimension labels.
- Show labels only for selected objects.
- Base included floorplan elements: 현관도어, 기본창, 싱크대, 욕실.
- Design the overlay system around base floorplan image plus same-size transparent PNG overlays.
- Model prices:
  - Compact 3x6: `₩27,900,000부터`
  - Standard 3x9: `₩34,900,000부터`
- Use `예상 총액` consistently for total labels.
- Show `운반·설치 별도` in the bottom bar and order modal.
- Category list is fixed to 11 categories: 모델, 외장, 창호, 도어, 내장, 바닥재, 싱크대, 욕실, 가구, 에너지, 커넥티비티.
- Option price display:
  - Included option: `포함`
  - Paid option: `₩1,000,000`
  - Consult option: `상담`, counted as 0 in estimated total.
- Option cards include name, price/consult badge, short description, and small info button.
- Option info modal includes short explanation and image.
- Option images appear in the info modal, not directly in cards.
- Share URL uses a compressed `?c=` configuration string, not a human-readable slug.

### Order modal and consultation form

- Desktop modal layout is 2 columns.
- Left column: selected floorplan.
- Right column: model, selected options, total, form.
- Primary action: `상담 요청`.
- Secondary action: `견적 저장`.
- Include `상담 후 최종 확정`.
- Required fields: 이름, 연락처, 지역.
- Optional fields:
  - 구매 시기: `1개월 이내`, `3개월 이내`, `6개월 이내`, `올해 안`, `미정`
  - 지목: `대지`, `전`, `답`, `임야`, `건물옥상`, `기타`
  - 설치 주소
  - 예산: `2,000만원 미만`, `2,000~3,000만원`, `3,000~4,000만원`, `4,000~5,000만원`, `5,000만원 이상`
  - 메모

### Homepage

- Homepage H1: `위트 이동식주택`.
- Hero subcopy: `작고 단단한 내 집을 필요한 크기와 옵션으로 직접 구성해보세요.`
- Primary CTA: `나만의 위트 만들기`, linking to `/customize`.
- Header navigation label for `/customize`: `주문하기`.
- Do not show prices on the homepage.
- Do not show hero trust chips.
- Do not include a mini configurator on the homepage.
- Section flow: hero configuration CTA, production process cards, site/installation check guidance, real gallery/company trust, consultation CTA.
- Remove the `영상 준비 중입니다` section.
- If generated images are used, use them only as temporary commercial visuals, not as actual case-study/gallery data.
- Generated image direction: photorealistic, no people, strict 3m x 6m single transportable one-story module, one door, one or two windows, not a large villa or two-story house.

### `/support`

- Remove the public inquiry form.
- H1: `진행 과정과 확인사항`.
- Subcopy: `처음 준비하는 이동식주택도 막막하지 않도록, 진행 과정과 꼭 확인할 내용을 쉽게 정리했습니다.`
- Sections: 구매 과정, FAQ, A/S 안내.
- Purchase process steps: 구성, 상담 요청, 현장 확인, 견적·계약, 제작, 운반·설치.
- Top and bottom CTA: `나만의 위트 만들기`.

### Supabase schema

- Before migration, inspect and back up remote Supabase schema dump and migration list.
- Add:
  - `customize_models`
  - `customize_categories`
  - `customize_options`
  - `customize_option_conflicts`
  - `customize_included_specs`
  - `customize_consultations`
- Korean option names/descriptions are required; English fields are optional.
- Option deletion is soft deletion with `is_active=false`.
- Save consultation snapshots in `config_snapshot JSONB`, including selected model, selected options, labels, prices, total, and floorplan/config state.
- Seed the initial models, 11 categories, included specs, and default options in the migration.
- Store images and overlays in Supabase Storage under the existing `images` bucket, `customize/` path.
- Regenerate `types/supabase.ts` from the remote schema after migration.

### Security and admin

- Public users may read only active models, categories, options, and included specs.
- Public users may insert consultation requests only.
- Public users may not select, update, or delete consultation data.
- Admin mutations use the existing `requireAdmin` pattern.
- Server actions must use zod validation, length limits, phone/text normalization, server-side price recalculation, and upload MIME/extension/path/size limits.
- Consultation personal data is manually deleted by admins only.
- New consultation notifications are admin-screen only for this version.
- Keep existing security headers, admin allowlist, upload restrictions, and service-role server-only usage.

### Admin

- Add primary admin routes:
  - `/admin/customize`
  - `/admin/consultations`
- `/admin/customize` tabs:
  - Models
  - Included Specs
  - Categories
  - Options
  - Image Assets
- Admin can add/edit/soft-delete options, sort, activate/deactivate, configure model availability, set single/multiple category behavior, manage conflicts, price type, info images, and floorplan overlays.
- Admin image upload warns if dimensions are not `1000x420`, but does not block.
- Consultation statuses: 신규, 진행중, 완료, 보류.
- Consultation list columns: status, name, phone, region, memo, created_at.
- Consultation detail prioritizes customer info, puts config details in a collapsible section, and supports internal memo.
- Keep legacy `inquiries` data, but do not use it as the official new flow.
- Optimize dashboard/admin loading by removing unnecessary BESPOKE counts and selecting only needed columns with parallel fetches.

### Tests and validation

- Run Supabase migration dry-run before applying.
- Apply migration and confirm remote schema.
- Regenerate Supabase types.
- Validate option CRUD, soft deletion, model-specific option visibility, option conflicts, consultation snapshot storage.
- Validate `/`, `/customize`, `/support`, `/bespoke`, `/admin/customize`, `/admin/consultations` on desktop and mobile.
- Run:
  - `npm run lint`
  - `npm run test`
  - `npm run build`
  - Playwright key flows
- Commit logical units and push the final branch to GitHub.

## Assumptions

- Homepage prices remain hidden; prices appear only in `/customize`.
- Generated images are temporary commercial visuals and never registered as actual case-study data.
- Existing `inquiries` data remains preserved as legacy data.
- PDF-level estimate saving may be implemented as a v1 quote-save/download/print path as long as the modal includes `견적 저장` and final price is clearly consultation-confirmed.


## Current State

# Codex State

## Active task

위트 `/bespoke` 복원, DB 기반 `/customize` 주문 컨피규레이터 신규 구축, 홈/support 전환, Supabase customize schema 적용, 관리자 주문 구성/상담 관리 구현.

## Current phase

pro-review

## Changes made

- `/bespoke` 공개 페이지를 이전 showcase 페이지로 복원하고 잘못된 BESPOKE 옵션 관리 코드를 제거.
- Supabase 원격 schema/migration 백업 후 `202606060002_customize_configurator.sql` 적용.
- `customize_models/categories/options/option_conflicts/included_specs/consultations` 테이블과 seed/RLS 추가.
- `/customize`를 DB catalog 기반 컨피규레이터로 재작성.
- `/admin/customize`, `/admin/consultations` 추가.
- 홈을 구성 CTA 중심으로 재작성하고 `/support`를 구매 과정/FAQ/A/S 안내 페이지로 재작성.
- Header `/customize` 메뉴명을 `주문하기`로 변경.
- old customize store/proto e2e를 제거하고 새 e2e를 추가.
- `202606060003_lock_customize_admin_policies.sql`로 새 customize 테이블의 authenticated-wide admin RLS 정책을 제거하고 관리자 mutation을 requireAdmin + service role 경로로 고정.
- Supabase CLI 타입 재생성과 원격 schema dump를 성공적으로 완료하고, 기존 코드가 쓰던 type alias를 생성 타입 하단에 복구.
- 타입 재생성 후 드러난 레거시 CMS/FAQ/product/project/inquiry nullable/id 타입 불일치를 정리.
- Pro 1차 MUST_FIX 반영: `submitCustomizeConsultation`에서 insert 후 `.select('id').single()`을 제거하고 사전 생성 id로 insert-only RLS와 호환되게 수정.
- Pro 1차 MUST_FIX 반영: `/customize` 평면도에서 `model.floorplanImagePath`를 `base-floorplan-image` 레이어로 실제 렌더링하고, seed 기본 이미지를 1000x420 평면도 SVG로 교체.
- Playwright에 base floorplan/footprint 검증과 실제 UI 상담 제출 후 service-role 확인/삭제 테스트를 추가.

## Commands run

- `supabase migration list --linked`
- `supabase db dump --linked --schema public`
- `supabase migration fetch --linked`
- `supabase db push --linked --dry-run`
- `supabase db push --linked`
- `DOTENV_CONFIG_PATH=.env.local node -r dotenv/config ...` for remote table counts
- `supabase gen types typescript --linked --schema public > types/supabase.ts`
- `supabase db push --linked --dry-run` for `202606060003_lock_customize_admin_policies.sql`
- `supabase db push --linked` for `202606060003_lock_customize_admin_policies.sql`
- `supabase gen types typescript --linked --schema public > /tmp/weet-supabase-types.ts && mv /tmp/weet-supabase-types.ts types/supabase.ts`
- `supabase db dump --linked --schema public > /tmp/weet-public-schema.sql && mv /tmp/weet-public-schema.sql supabase/schema.sql`
- remote Supabase anon insert/service-role verify/delete smoke test for `customize_consultations`
- `npm run lint`
- `npm run test`
- `npm run build`
- `npx playwright test`
- GPT-5.5 Pro review cycle 1 in Chrome: `VERDICT: REVISE`
- `npx playwright test` after Pro MUST_FIX: 11 passed

## Current failures

- None currently. Latest lint, unit tests, build, Playwright, Supabase migration checks, type generation, schema dump, and remote consultation smoke test passed.

## Pro review cycles

1

## Last Pro verdict

REVISE

## Applied Pro feedback

- Removed `.select('id').single()` from public consultation insert path and returned a server-generated UUID, preserving insert-only RLS without public consultation select.
- Rendered the configured model `floorplanImagePath` as the base floorplan image layer and added Playwright assertions for base image and right-edge-fixed footprint.

## Skipped Pro feedback

- Optional compression of `?c=` state was not applied because the task only required a compressed-looking non-human-readable configuration string and Pro marked it optional.
- Optional stricter selectedOptions category count/cardinality normalization was not applied because Pro marked it optional and current zod/server filtering already limits option IDs.
- Optional `.kiro/` cleanup was not applied; `.kiro/` is unrelated untracked user/workspace state and will not be committed.

## Remaining risks

- Admin pages require authenticated admin session for live browser validation.
- Browser warnings remain for restored BESPOKE images missing `sizes`; this matches restored page behavior and is non-blocking.
- Next.js warns that the legacy `middleware` convention is deprecated in favor of `proxy`; this predates the task and is non-blocking for current validation.

## Next step

Run GPT-5.5 Pro review cycle 2 with the refreshed packet after applying cycle 1 MUST_FIX.


## Cycle 1 Pro Review Response

~~~text
VERDICT: REVISE

CONTEXT_GAPS:

Full post-line-220 CustomizeConfigurator render and full ImageUpload / upload action implementation were not included, so mobile bottom bar behavior and upload MIME/extension/path/size enforcement cannot be fully verified from this packet. 

붙여넣은 텍스트 (1)

MUST_FIX:

Fix consultation submission under tightened RLS: submitCustomizeConsultation inserts with the public SSR client and then calls .select('id').single(), but the intended policy leaves public users with insert-only access and no consultation select access. This can make the UI report failure after insert, or otherwise conflict with the “no public select” requirement. Do not add public select on customize_consultations; instead insert via server-only service role after validation/recalculation, or pre-generate the id and insert without .select(). 

붙여넣은 텍스트 (1)

 

붙여넣은 텍스트 (1)

Render the configured base floorplan image layer in /customize. The schema/seed stores floorplan_image_path, but the shown FloorplanPreview draws an inline SVG base and only renders option overlay images, so admin-managed base floorplan assets and the requested “base floorplan image plus same-size transparent PNG overlays” design are not actually honored. 

붙여넣은 텍스트 (1)

 

붙여넣은 텍스트 (1)

OPTIONAL:

Consider making the ?c= state actually compressed rather than only base64url-encoded JSON; current encoding is non-human-readable but not compressed. 

붙여넣은 텍스트 (1)

Add stricter server-side normalization for selectedOptions: cap category count, reject unknown category ids, enforce single/multiple category cardinality, and store a sanitized config state only.

Decide whether .kiro/ should be removed or ignored before final commit.

TESTS_TO_RUN:

Submit a real /customize consultation as anon through the UI and assert success toast, exactly one row inserted, service-role/admin can read it, and anon cannot select/update/delete it.

Add an integration test for the RLS-safe consultation insert path so .select() regressions are caught.

Add a visual/e2e check that the configured base floorplan image renders, overlays align at 1000x420, and 3x6/3x9 switching keeps the right edge fixed.

Re-run npm run lint, npm run test, npm run build, npx playwright test, plus the Supabase anon/service-role smoke test after fixes. 

붙여넣은 텍스트 (1)

RISK_NOTES:

Public direct inserts into customize_consultations remain intentionally allowed; without DB-level length/rate constraints, spam or malformed snapshots can still reach admin screens even if the official server action is validated.

Admin pages were not live-browser validated under an authenticated admin session per the packet’s own remaining risks. 

붙여넣은 텍스트 (1)

~~~

## What Changed After Cycle 1

- Fixed consultation submission under tightened RLS: server action now generates a UUID and inserts without public select after insert.
- Fixed /customize base floorplan rendering: FloorplanPreview renders model.floorplanImagePath as an SVG image layer and keeps a transparent model footprint overlay for right-edge-fixed 3x6/3x9 checks.
- Replaced default base SVG with a 1000x420 floorplan asset.
- Added Playwright assertions for base image + compact/standard footprint x/width.
- Added Playwright UI consultation submission test that verifies the row through service role and deletes the dummy row.

## Repository State

Branch: zoo/customize-configurator

Git status:
~~~text
 A .codex/current-task.md
 A .codex/review-template.md
 A .codex/state.md
 A AGENTS.md
 D app/actions/bespoke-actions.ts
 M app/actions/cms-actions.ts
 A app/actions/customize-actions.ts
 M app/actions/faq-actions.ts
 D app/admin/bespoke/page.tsx
 A app/admin/consultations/page.tsx
 A app/admin/customize/page.tsx
 M app/admin/inquiries/page.tsx
 M app/admin/page.tsx
 M app/admin/projects/page.tsx
 M app/bespoke/page.tsx
 M app/customize/layout.tsx
 M app/customize/page.tsx
 M app/page.tsx
 M app/support/layout.tsx
 M app/support/page.tsx
 A codex-loop.md
 M components/admin/AdminSidebar.tsx
 M components/admin/ProductForm.tsx
 D components/admin/bespoke/BespokeOptionManager.tsx
 M components/admin/cms/MainCmsClient.tsx
 M components/admin/cms/SupportEditor.tsx
 A components/admin/consultations/ConsultationManager.tsx
 A components/admin/customize/CustomizeManager.tsx
 M components/admin/media/ImageUpload.tsx
 M components/admin/products/ProductGrid.tsx
 D components/bespoke/BespokeConfigurator.tsx
 A components/customize/CustomizeConfigurator.tsx
 D components/customize/MobileOptionDrawer.tsx
 D components/customize/OptionSidebar.tsx
 D components/customize/PDFDownloadButton.tsx
 D components/customize/PriceDisplay.tsx
 D components/customize/QuotationPDF.tsx
 D components/customize/StickyPriceBar.tsx
 D components/customize/VisualArea.tsx
 M components/layout/ClientLayout.tsx
 M components/layout/Header.tsx
 M components/sections/HeroCarousel.tsx
 M components/sections/HeroCarouselClientComponent.tsx
 A e2e/customize-configurator.spec.ts
 D e2e/customize-option-sidebar.spec.ts
 D e2e/customize/mobile-option-drawer.spec.ts
 M e2e/header-navigation.spec.ts
 A e2e/public-pages.spec.ts
 D e2e/visual-area.spec.ts
 D lib/bespoke-options.ts
 M lib/customize/__tests__/priceCalculator.test.ts
 M lib/customize/config.ts
 M lib/customize/priceCalculator.ts
 M lib/customize/types.ts
 M public/images/customize/dummy-base.svg
 D stores/__tests__/customizeStore.test.ts
 D stores/customizeStore.ts
 A supabase/migrations/20260212000000_initial_schema.sql
 A supabase/migrations/20260219000000_rename_gwangju_source.sql
 A supabase/migrations/20260219100000_crawl_settings.sql
 A supabase/migrations/20260220000000_client_enhancements.sql
 D supabase/migrations/202606060001_bespoke_options.sql
 A supabase/migrations/202606060002_customize_configurator.sql
 A supabase/migrations/202606060003_lock_customize_admin_policies.sql
 M supabase/schema.sql
 M types/supabase.ts
?? .codex/pro-review.md
?? .codex/review-packet.md
?? .kiro/
?? test-results/

~~~

Changed files:
~~~text
A	.codex/current-task.md
A	.codex/review-template.md
A	.codex/state.md
A	AGENTS.md
D	app/actions/bespoke-actions.ts
M	app/actions/cms-actions.ts
A	app/actions/customize-actions.ts
M	app/actions/faq-actions.ts
D	app/admin/bespoke/page.tsx
A	app/admin/consultations/page.tsx
A	app/admin/customize/page.tsx
M	app/admin/inquiries/page.tsx
M	app/admin/page.tsx
M	app/admin/projects/page.tsx
M	app/bespoke/page.tsx
M	app/customize/layout.tsx
M	app/customize/page.tsx
M	app/page.tsx
M	app/support/layout.tsx
M	app/support/page.tsx
A	codex-loop.md
M	components/admin/AdminSidebar.tsx
M	components/admin/ProductForm.tsx
D	components/admin/bespoke/BespokeOptionManager.tsx
M	components/admin/cms/MainCmsClient.tsx
M	components/admin/cms/SupportEditor.tsx
A	components/admin/consultations/ConsultationManager.tsx
A	components/admin/customize/CustomizeManager.tsx
M	components/admin/media/ImageUpload.tsx
M	components/admin/products/ProductGrid.tsx
D	components/bespoke/BespokeConfigurator.tsx
A	components/customize/CustomizeConfigurator.tsx
D	components/customize/MobileOptionDrawer.tsx
D	components/customize/OptionSidebar.tsx
D	components/customize/PDFDownloadButton.tsx
D	components/customize/PriceDisplay.tsx
D	components/customize/QuotationPDF.tsx
D	components/customize/StickyPriceBar.tsx
D	components/customize/VisualArea.tsx
M	components/layout/ClientLayout.tsx
M	components/layout/Header.tsx
M	components/sections/HeroCarousel.tsx
M	components/sections/HeroCarouselClientComponent.tsx
A	e2e/customize-configurator.spec.ts
D	e2e/customize-option-sidebar.spec.ts
D	e2e/customize/mobile-option-drawer.spec.ts
M	e2e/header-navigation.spec.ts
A	e2e/public-pages.spec.ts
D	e2e/visual-area.spec.ts
D	lib/bespoke-options.ts
M	lib/customize/__tests__/priceCalculator.test.ts
M	lib/customize/config.ts
M	lib/customize/priceCalculator.ts
M	lib/customize/types.ts
M	public/images/customize/dummy-base.svg
D	stores/__tests__/customizeStore.test.ts
D	stores/customizeStore.ts
A	supabase/migrations/20260212000000_initial_schema.sql
A	supabase/migrations/20260219000000_rename_gwangju_source.sql
A	supabase/migrations/20260219100000_crawl_settings.sql
A	supabase/migrations/20260220000000_client_enhancements.sql
D	supabase/migrations/202606060001_bespoke_options.sql
A	supabase/migrations/202606060002_customize_configurator.sql
A	supabase/migrations/202606060003_lock_customize_admin_policies.sql
M	supabase/schema.sql
M	types/supabase.ts

~~~

Diff stat:
~~~text
 .codex/current-task.md                             |  174 +++
 .codex/review-template.md                          |  223 ++++
 .codex/state.md                                    |   80 ++
 AGENTS.md                                          |   97 ++
 app/actions/bespoke-actions.ts                     |  161 ---
 app/actions/cms-actions.ts                         |    6 +-
 app/actions/customize-actions.ts                   |  623 ++++++++++
 app/actions/faq-actions.ts                         |    8 +-
 app/admin/bespoke/page.tsx                         |   38 -
 app/admin/consultations/page.tsx                   |   10 +
 app/admin/customize/page.tsx                       |   10 +
 app/admin/inquiries/page.tsx                       |   11 +-
 app/admin/page.tsx                                 |   26 +-
 app/admin/projects/page.tsx                        |    6 +-
 app/bespoke/page.tsx                               |  277 ++++-
 app/customize/layout.tsx                           |    4 +-
 app/customize/page.tsx                             |   44 +-
 app/page.tsx                                       |  184 ++-
 app/support/layout.tsx                             |    8 +-
 app/support/page.tsx                               |  455 ++------
 codex-loop.md                                      |  163 +++
 components/admin/AdminSidebar.tsx                  |    8 +-
 components/admin/ProductForm.tsx                   |    8 +-
 components/admin/bespoke/BespokeOptionManager.tsx  |  512 --------
 components/admin/cms/MainCmsClient.tsx             |    4 +-
 components/admin/cms/SupportEditor.tsx             |   10 +-
 .../admin/consultations/ConsultationManager.tsx    |  141 +++
 components/admin/customize/CustomizeManager.tsx    |  624 ++++++++++
 components/admin/media/ImageUpload.tsx             |   27 +-
 components/admin/products/ProductGrid.tsx          |    4 +-
 components/bespoke/BespokeConfigurator.tsx         |  481 --------
 components/customize/CustomizeConfigurator.tsx     |  771 ++++++++++++
 components/customize/MobileOptionDrawer.tsx        |  125 --
 components/customize/OptionSidebar.tsx             |  112 --
 components/customize/PDFDownloadButton.tsx         |   43 -
 components/customize/PriceDisplay.tsx              |   24 -
 components/customize/QuotationPDF.tsx              |  202 ----
 components/customize/StickyPriceBar.tsx            |   62 -
 components/customize/VisualArea.tsx                |  156 ---
 components/layout/ClientLayout.tsx                 |   10 +
 components/layout/Header.tsx                       |    4 +-
 components/sections/HeroCarousel.tsx               |    6 +-
 .../sections/HeroCarouselClientComponent.tsx       |    2 +-
 e2e/customize-configurator.spec.ts                 |  109 ++
 e2e/customize-option-sidebar.spec.ts               |   56 -
 e2e/customize/mobile-option-drawer.spec.ts         |   59 -
 e2e/header-navigation.spec.ts                      |   54 +-
 e2e/public-pages.spec.ts                           |   30 +
 e2e/visual-area.spec.ts                            |   55 -
 lib/bespoke-options.ts                             |  212 ----
 lib/customize/__tests__/priceCalculator.test.ts    |  257 ++--
 lib/customize/config.ts                            |  404 +------
 lib/customize/priceCalculator.ts                   |  197 +++-
 lib/customize/types.ts                             |  177 ++-
 public/images/customize/dummy-base.svg             |   96 +-
 stores/__tests__/customizeStore.test.ts            |  162 ---
 stores/customizeStore.ts                           |  115 --
 .../migrations/20260212000000_initial_schema.sql   |  118 ++
 .../20260219000000_rename_gwangju_source.sql       |    4 +
 .../migrations/20260219100000_crawl_settings.sql   |   19 +
 .../20260220000000_client_enhancements.sql         |    8 +
 .../migrations/202606060001_bespoke_options.sql    |  142 ---
 .../202606060002_customize_configurator.sql        |  389 +++++++
 .../202606060003_lock_customize_admin_policies.sql |   17 +
 supabase/schema.sql                                | 1228 +++++++++++++++++---
 types/supabase.ts                                  | 1163 ++++++++++++++----
 66 files changed, 6885 insertions(+), 4130 deletions(-)

~~~

Selected diff for cycle 1 fixes and relevant security/UI code:
~~~diff
diff --git a/app/actions/customize-actions.ts b/app/actions/customize-actions.ts
new file mode 100644
index 0000000..b5afcbe
--- /dev/null
+++ b/app/actions/customize-actions.ts
@@ -0,0 +1,623 @@
+'use server';
+
+import { randomUUID } from 'crypto';
+import { revalidatePath } from 'next/cache';
+import { z } from 'zod';
+import { requireAdmin } from '@/lib/admin-auth';
+import { getSupabaseAdmin } from '@/lib/supabase';
+import { createClient } from '@/utils/supabase/server';
+import {
+  calculateEstimate,
+  encodeConfig,
+  hasConflict,
+  selectedOptionIds,
+} from '@/lib/customize/priceCalculator';
+import type {
+  ConsultationFormInput,
+  ConsultationStatus,
+  CustomizeCatalog,
+  CustomizeCategory,
+  CustomizeConsultation,
+  CustomizeIncludedSpec,
+  CustomizeModel,
+  CustomizeOption,
+  CustomizeOptionConflict,
+  PriceType,
+  SelectedOptions,
+  SelectionType,
+} from '@/lib/customize/types';
+
+const stringField = (max: number, message: string) => z.string().trim().min(1, message).max(max);
+const optionalString = (max: number) => z.string().trim().max(max).optional().transform((value) => value || undefined);
+const uuidField = z.string().uuid();
+
+const phoneSchema = z
+  .string()
+  .trim()
+  .min(7, '연락처를 입력해주세요.')
+  .max(30, '연락처는 30자 이하로 입력해주세요.')
+  .regex(/^[0-9+\-\s().]+$/, '연락처 형식이 올바르지 않습니다.');
+
+const selectedOptionsSchema = z.record(z.string(), z.array(z.string().uuid()).max(20)).default({});
+
+const consultationSchema = z.object({
+  modelId: z.string().trim().min(1),
+  selectedOptions: selectedOptionsSchema,
+  configQuery: z.string().trim().max(3000).optional(),
+  customerName: stringField(80, '이름을 입력해주세요.'),
+  phone: phoneSchema,
+  region: stringField(120, '지역을 입력해주세요.'),
+  purchaseTimeline: optionalString(40),
+  landType: optionalString(40),
+  installAddress: optionalString(200),
+  budgetRange: optionalString(60),
+  memo: optionalString(1000),
+});
+
+const modelSchema = z.object({
+  id: z.string().trim().min(2).max(80).regex(/^[a-z0-9-]+$/),
+  code: z.string().trim().min(2).max(40),
+  nameKo: stringField(80, '모델명을 입력해주세요.'),
+  nameEn: optionalString(80),
+  widthM: z.coerce.number().positive().max(99),
+  lengthM: z.coerce.number().positive().max(99),
+  areaSqm: z.coerce.number().positive().max(999),
+  basePrice: z.coerce.number().int().min(0),
+  floorplanImagePath: optionalString(300),
+  floorplanOverlayPath: optionalString(300),
+  displayOrder: z.coerce.number().int().default(0),
+  isActive: z.boolean().default(true),
+});
+
+const categorySchema = z.object({
+  id: z.string().uuid().optional(),
+  key: z.string().trim().min(2).max(60).regex(/^[a-z0-9-]+$/),
+  nameKo: stringField(60, '카테고리명을 입력해주세요.'),
+  nameEn: optionalString(60),
+  descriptionKo: optionalString(300),
+  descriptionEn: optionalString(300),
+  selectionType: z.enum(['single', 'multiple']),
+  required: z.boolean().default(false),
+  displayOrder: z.coerce.number().int().default(0),
+  isActive: z.boolean().default(true),
+});
+
+const optionSchema = z.object({
+  id: z.string().uuid().optional(),
+  categoryId: uuidField,
+  key: z.string().trim().min(2).max(80).regex(/^[a-z0-9-]+$/),
+  nameKo: stringField(80, '옵션명을 입력해주세요.'),
+  nameEn: optionalString(80),
+  shortDescriptionKo: stringField(160, '짧은 설명을 입력해주세요.'),
+  shortDescriptionEn: optionalString(160),
+  detailDescriptionKo: optionalString(800),
+  detailDescriptionEn: optionalString(800),
+  priceType: z.enum(['included', 'fixed', 'consult']),
+  price: z.coerce.number().int().min(0).default(0),
+  isDefault: z.boolean().default(false),
+  availableModelIds: z.array(z.string().trim().min(1).max(80)).default([]),
+  imagePath: optionalString(300),
+  overlayImagePath: optionalString(300),
+  overlayLabelKo: optionalString(80),
+  overlayLabelEn: optionalString(80),
+  displayOrder: z.coerce.number().int().default(0),
+  isActive: z.boolean().default(true),
+});
+
+const includedSpecSchema = z.object({
+  id: z.string().uuid().optional(),
+  modelId: z.string().trim().max(80).optional().transform((value) => value || null),
+  key: z.string().trim().min(2).max(80).regex(/^[a-z0-9-]+$/),
+  nameKo: stringField(80, '포함 사양명을 입력해주세요.'),
+  nameEn: optionalString(80),
+  descriptionKo: optionalString(300),
+  descriptionEn: optionalString(300),
+  categoryKey: optionalString(60),
+  iconName: optionalString(60),
+  displayOrder: z.coerce.number().int().default(0),
+  isActive: z.boolean().default(true),
+});
+
+function normalizePhone(value: string) {
+  const compact = value.replace(/[^\d+]/g, '');
+  return compact.startsWith('+') ? `+${compact.replace(/[^\d]/g, '')}` : compact.replace(/\D/g, '');
+}
+
+function asText(value: string | undefined | null) {
+  const trimmed = value?.trim();
+  return trimmed ? trimmed : null;
+}
+
+function mapModel(row: any): CustomizeModel {
+  return {
+    id: row.id,
+    code: row.code,
+    nameKo: row.name_ko,
+    nameEn: row.name_en,
+    widthM: Number(row.width_m),
+    lengthM: Number(row.length_m),
+    areaSqm: Number(row.area_sqm),
+    basePrice: row.base_price,
+    floorplanImagePath: row.floorplan_image_path,
+    floorplanOverlayPath: row.floorplan_overlay_path,
+    displayOrder: row.display_order,
+    isActive: row.is_active,
+  };
+}
+
+function mapCategory(row: any): CustomizeCategory {
+  return {
+    id: row.id,
+    key: row.key,
+    nameKo: row.name_ko,
+    nameEn: row.name_en,
+    descriptionKo: row.description_ko,
+    descriptionEn: row.description_en,
+    selectionType: row.selection_type as SelectionType,
+    required: row.required,
+    displayOrder: row.display_order,
+    isActive: row.is_active,
+  };
+}
+
+function mapOption(row: any, categoryKeyById: Map<string, string>): CustomizeOption {
+  return {
+    id: row.id,
+    categoryId: row.category_id,
+    categoryKey: categoryKeyById.get(row.category_id) ?? '',
+    key: row.key,
+    nameKo: row.name_ko,
+    nameEn: row.name_en,
+    shortDescriptionKo: row.short_description_ko,
+    shortDescriptionEn: row.short_description_en,
+    detailDescriptionKo: row.detail_description_ko,
+    detailDescriptionEn: row.detail_description_en,
+    priceType: row.price_type as PriceType,
+    price: row.price,
+    isDefault: row.is_default,
+    availableModelIds: row.available_model_ids ?? [],
+    imagePath: row.image_path,
+    overlayImagePath: row.overlay_image_path,
+    overlayLabelKo: row.overlay_label_ko,
+    overlayLabelEn: row.overlay_label_en,
+    displayOrder: row.display_order,
+    isActive: row.is_active,
+  };
+}
+
+function mapIncludedSpec(row: any): CustomizeIncludedSpec {
+  return {
+    id: row.id,
+    modelId: row.model_id,
+    key: row.key,
+    nameKo: row.name_ko,
+    nameEn: row.name_en,
+    descriptionKo: row.description_ko,
+    descriptionEn: row.description_en,
+    categoryKey: row.category_key,
+    iconName: row.icon_name,
+    displayOrder: row.display_order,
+    isActive: row.is_active,
+  };
+}
+
+function mapConflict(row: any): CustomizeOptionConflict {
+  return {
+    optionId: row.option_id,
+    conflictsWithOptionId: row.conflicts_with_option_id,
+    reasonKo: row.reason_ko,
+    reasonEn: row.reason_en,
+  };
+}
+
+function mapConsultation(row: any): CustomizeConsultation {
+  return {
+    id: row.id,
+    customerName: row.customer_name,
+    phone: row.phone,
+    region: row.region,
+    purchaseTimeline: row.purchase_timeline,
+    landType: row.land_type,
+    installAddress: row.install_address,
+    budgetRange: row.budget_range,
+    memo: row.memo,
+    status: row.status,
+    internalMemo: row.internal_memo,
+    selectedModelId: row.selected_model_id,
+    selectedOptionIds: row.selected_option_ids ?? [],
+    estimatedTotal: row.estimated_total,
+    configQuery: row.config_query,
+    configSnapshot: row.config_snapshot,
+    createdAt: row.created_at,
+    updatedAt: row.updated_at,
+  };
+}
+
+async function loadCatalog(client: any, includeInactive = false): Promise<CustomizeCatalog> {
+  const activeFilter = includeInactive ? undefined : true;
+  const modelQuery = client.from('customize_models').select('*').order('display_order', { ascending: true }).order('created_at', { ascending: true });
+  const categoryQuery = client.from('customize_categories').select('*').order('display_order', { ascending: true }).order('created_at', { ascending: true });
+  const optionQuery = client.from('customize_options').select('*').order('display_order', { ascending: true }).order('created_at', { ascending: true });
+  const includedQuery = client.from('customize_included_specs').select('*').order('display_order', { ascending: true }).order('created_at', { ascending: true });
+  const conflictQuery = client.from('customize_option_conflicts').select('*').order('created_at', { ascending: true });
+
+  if (activeFilter) {
+    modelQuery.eq('is_active', true);
+    categoryQuery.eq('is_active', true);
+    optionQuery.eq('is_active', true);
+    includedQuery.eq('is_active', true);
+  }
+
+  const [modelsResult, categoriesResult, optionsResult, includedResult, conflictsResult] = await Promise.all([
+    modelQuery,
+    categoryQuery,
+    optionQuery,
+    includedQuery,
+    conflictQuery,
+  ]);
+
+  for (const result of [modelsResult, categoriesResult, optionsResult, includedResult, conflictsResult]) {
+    if (result.error) throw result.error;
+  }
+
+  const categories = ((categoriesResult.data ?? []) as any[]).map(mapCategory);
+  const categoryKeyById = new Map(categories.map((category: CustomizeCategory) => [category.id, category.key]));
+
+  return {
+    models: ((modelsResult.data ?? []) as any[]).map(mapModel),
+    categories,
+    options: ((optionsResult.data ?? []) as any[]).map((row: any) => mapOption(row, categoryKeyById)),
+    includedSpecs: ((includedResult.data ?? []) as any[]).map(mapIncludedSpec),
+    conflicts: ((conflictsResult.data ?? []) as any[]).map(mapConflict),
+  };
+}
+
+export async function getPublicCustomizeCatalog() {
+  try {
+    const supabase = await createClient();
+    return await loadCatalog(supabase, false);
+  } catch (error) {
+    console.error('Error loading public customize catalog:', error);
+    return { models: [], categories: [], options: [], includedSpecs: [], conflicts: [] } satisfies CustomizeCatalog;
+  }
+}
+
+export async function getCustomizeAdminData() {
+  await requireAdmin();
+
+  const admin = getSupabaseAdmin() as any;
+  const [catalog, consultationsResult] = await Promise.all([
+    loadCatalog(admin, true),
+    admin
+      .from('customize_consultations')
+      .select('id, customer_name, phone, region, purchase_timeline, land_type, install_address, budget_range, memo, status, internal_memo, selected_model_id, selected_option_ids, estimated_total, config_query, config_snapshot, created_at, updated_at', { count: 'exact' })
+      .order('created_at', { ascending: false })
+      .limit(50),
+  ]);
+
+  if (consultationsResult.error) throw consultationsResult.error;
+
+  return {
+    catalog,
+    consultations: (consultationsResult.data ?? []).map(mapConsultation),
+    consultationCount: consultationsResult.count ?? 0,
+  };
+}
+
+export async function getAdminConsultations(page = 1, status: ConsultationStatus | 'all' = 'all') {
+  await requireAdmin();
+
+  const admin = getSupabaseAdmin() as any;
+  const from = Math.max(0, page - 1) * 20;
+  const to = from + 19;
+  let query = admin
+    .from('customize_consultations')
+    .select('id, customer_name, phone, region, purchase_timeline, land_type, install_address, budget_range, memo, status, internal_memo, selected_model_id, selected_option_ids, estimated_total, config_query, config_snapshot, created_at, updated_at', { count: 'exact' })
+    .order('created_at', { ascending: false })
+    .range(from, to);
+
+  if (status !== 'all') query = query.eq('status', status);
+
+  const { data, error, count } = await query;
+  if (error) throw error;
+
+  return { consultations: (data ?? []).map(mapConsultation), count: count ?? 0 };
+}
+
+export async function submitCustomizeConsultation(input: ConsultationFormInput) {
+  const parsed = consultationSchema.safeParse(input);
+  if (!parsed.success) {
+    return { success: false, message: parsed.error.issues[0]?.message ?? '입력값을 확인해주세요.' };
+  }
+
+  try {
+    const admin = getSupabaseAdmin() as any;
+    const catalog = await loadCatalog(admin, false);
+    const estimate = calculateEstimate(catalog, parsed.data.modelId, parsed.data.selectedOptions);
+
+    if (!estimate) {
+      return { success: false, message: '선택한 모델을 확인해주세요.' };
+    }
+
+    const ids = selectedOptionIds(parsed.data.selectedOptions);
+    if (hasConflict(catalog, ids)) {
+      return { success: false, message: '동시에 선택할 수 없는 옵션이 포함되어 있습니다.' };
+    }
+
+    const validOptionIds = estimate.selectedOptions.map((option) => option.id);
+    const selectedOptions: SelectedOptions = Object.fromEntries(
+      Object.entries(parsed.data.selectedOptions).map(([categoryId, optionIds]) => [
+        categoryId,
+        optionIds.filter((id) => validOptionIds.includes(id)),
+      ])
+    );
+    const configQuery = parsed.data.configQuery || encodeConfig(estimate.model.id, selectedOptions);
+    const includedSpecs = catalog.includedSpecs.filter((spec) => !spec.modelId || spec.modelId === estimate.model.id);
+    const snapshot = {
+      version: 1,
+      model: estimate.model,
+      selectedOptions: estimate.selectedOptions,
+      includedSpecs,
+      optionTotal: estimate.optionTotal,
+      estimatedTotal: estimate.estimatedTotal,
+      consultOptionCount: estimate.consultOptionCount,
+      selectedOptionsByCategory: selectedOptions,
+      createdAt: new Date().toISOString(),
+    };
+
+    const consultationId = randomUUID();
+    const supabase = await createClient();
+    const { error } = await (supabase as any)
+      .from('customize_consultations')
+      .insert({
+        id: consultationId,
+        customer_name: parsed.data.customerName,
+        phone: normalizePhone(parsed.data.phone),
+        region: parsed.data.region,
+        purchase_timeline: asText(parsed.data.purchaseTimeline),
+        land_type: asText(parsed.data.landType),
+        install_address: asText(parsed.data.installAddress),
+        budget_range: asText(parsed.data.budgetRange),
+        memo: asText(parsed.data.memo),
+        status: '신규',
+        selected_model_id: estimate.model.id,
+        selected_option_ids: validOptionIds,
+        estimated_total: estimate.estimatedTotal,
+        config_query: configQuery,
+        config_snapshot: snapshot,
+      });
+
+    if (error) throw error;
+
+    revalidatePath('/admin/consultations');
+    revalidatePath('/admin');
+
+    return { success: true, message: '상담 요청이 접수되었습니다.', id: consultationId };
+  } catch (error) {
+    console.error('Error submitting customize consultation:', error);
+    return { success: false, message: '상담 요청 저장 중 오류가 발생했습니다.' };
+  }
+}
+
+export async function upsertCustomizeModel(input: unknown) {
+  await requireAdmin();
+  const parsed = modelSchema.parse(input);
+  const admin = getSupabaseAdmin() as any;
+
+  const { error } = await admin.from('customize_models').upsert({
+    id: parsed.id,
+    code: parsed.code,
+    name_ko: parsed.nameKo,
+    name_en: asText(parsed.nameEn),
+    width_m: parsed.widthM,
+    length_m: parsed.lengthM,
+    area_sqm: parsed.areaSqm,
+    base_price: parsed.basePrice,
+    floorplan_image_path: asText(parsed.floorplanImagePath),
+    floorplan_overlay_path: asText(parsed.floorplanOverlayPath),
+    display_order: parsed.displayOrder,
+    is_active: parsed.isActive,
+  });
+
+  if (error) throw error;
+  revalidateCustomizePaths();
+  return { success: true };
+}
+
+export async function upsertCustomizeCategory(input: unknown) {
+  await requireAdmin();
+  const parsed = categorySchema.parse(input);
+  const admin = getSupabaseAdmin() as any;
+  const payload = {
+    key: parsed.key,
+    name_ko: parsed.nameKo,
+    name_en: asText(parsed.nameEn),
+    description_ko: asText(parsed.descriptionKo),
+    description_en: asText(parsed.descriptionEn),
+    selection_type: parsed.selectionType,
+    required: parsed.required,
+    display_order: parsed.displayOrder,
+    is_active: parsed.isActive,
+  };
+
+  const query = parsed.id
+    ? admin.from('customize_categories').update(payload).eq('id', parsed.id)
+    : admin.from('customize_categories').insert(payload);
+  const { error } = await query;
+
+  if (error) throw error;
+  revalidateCustomizePaths();
+  return { success: true };
+}
+
+export async function upsertCustomizeOption(input: unknown) {
+  await requireAdmin();
+  const parsed = optionSchema.parse(input);
+  const admin = getSupabaseAdmin() as any;
+  const payload = {
+    category_id: parsed.categoryId,
+    key: parsed.key,
+    name_ko: parsed.nameKo,
+    name_en: asText(parsed.nameEn),
+    short_description_ko: parsed.shortDescriptionKo,
+    short_description_en: asText(parsed.shortDescriptionEn),
+    detail_description_ko: asText(parsed.detailDescriptionKo),
+    detail_description_en: asText(parsed.detailDescriptionEn),
+    price_type: parsed.priceType,
+    price: parsed.priceType === 'fixed' ? parsed.price : 0,
+    is_default: parsed.isDefault,
+    available_model_ids: parsed.availableModelIds,
+    image_path: asText(parsed.imagePath),
+    overlay_image_path: asText(parsed.overlayImagePath),
+    overlay_label_ko: asText(parsed.overlayLabelKo),
+    overlay_label_en: asText(parsed.overlayLabelEn),
+    display_order: parsed.displayOrder,
+    is_active: parsed.isActive,
+  };
+
+  const query = parsed.id
+    ? admin.from('customize_options').update(payload).eq('id', parsed.id)
+    : admin.from('customize_options').insert(payload);
+  const { error } = await query;
+
+  if (error) throw error;
+  revalidateCustomizePaths();
+  return { success: true };
+}
+
+export async function upsertCustomizeIncludedSpec(input: unknown) {
+  await requireAdmin();
+  const parsed = includedSpecSchema.parse(input);
+  const admin = getSupabaseAdmin() as any;
+  const payload = {
+    model_id: parsed.modelId,
+    key: parsed.key,
+    name_ko: parsed.nameKo,
+    name_en: asText(parsed.nameEn),
+    description_ko: asText(parsed.descriptionKo),
+    description_en: asText(parsed.descriptionEn),
+    category_key: asText(parsed.categoryKey),
+    icon_name: asText(parsed.iconName),
+    display_order: parsed.displayOrder,
+    is_active: parsed.isActive,
+  };
+
+  const query = parsed.id
+    ? admin.from('customize_included_specs').update(payload).eq('id', parsed.id)
+    : admin.from('customize_included_specs').insert(payload);
+  const { error } = await query;
+
+  if (error) throw error;
+  revalidateCustomizePaths();
+  return { success: true };
+}
+
+export async function setCustomizeEntityActive(entity: 'category' | 'option' | 'includedSpec' | 'model', id: string, isActive: boolean) {
+  await requireAdmin();
+  const admin = getSupabaseAdmin() as any;
+  const table = {
+    category: 'customize_categories',
+    option: 'customize_options',
+    includedSpec: 'customize_included_specs',
+    model: 'customize_models',
+  }[entity];
+  const key = entity === 'model' ? 'id' : 'id';
+  const { error } = await admin.from(table).update({ is_active: isActive }).eq(key, id);
+
+  if (error) throw error;
+  revalidateCustomizePaths();
+  return { success: true };
+}
+
+export async function createCustomizeOptionConflict(optionId: string, conflictsWithOptionId: string, reasonKo?: string) {
+  await requireAdmin();
+  const parsedOptionId = uuidField.parse(optionId);
+  const parsedConflictId = uuidField.parse(conflictsWithOptionId);
+
+  if (parsedOptionId === parsedConflictId) {
+    throw new Error('같은 옵션끼리는 충돌 관계를 만들 수 없습니다.');
+  }
+
+  const admin = getSupabaseAdmin() as any;
+  const payload = {
+    option_id: parsedOptionId,
+    conflicts_with_option_id: parsedConflictId,
+    reason_ko: asText(reasonKo) || '동시에 선택할 수 없는 옵션입니다.',
+  };
+  const reversePayload = {
+    option_id: parsedConflictId,
+    conflicts_with_option_id: parsedOptionId,
+    reason_ko: payload.reason_ko,
+  };
+  const { error } = await admin.from('customize_option_conflicts').upsert([payload, reversePayload]);
+
+  if (error) throw error;
+  revalidateCustomizePaths();
+  return { success: true };
+}
+
+export async function deleteCustomizeOptionConflict(optionId: string, conflictsWithOptionId: string) {
+  await requireAdmin();
+  const parsedOptionId = uuidField.parse(optionId);
+  const parsedConflictId = uuidField.parse(conflictsWithOptionId);
+  const admin = getSupabaseAdmin() as any;
+
+  const { error: forwardError } = await admin
+    .from('customize_option_conflicts')
+    .delete()
+    .eq('option_id', parsedOptionId)
+    .eq('conflicts_with_option_id', parsedConflictId);
+
+  const { error: reverseError } = await admin
+    .from('customize_option_conflicts')
+    .delete()
+    .eq('option_id', parsedConflictId)
+    .eq('conflicts_with_option_id', parsedOptionId);
+
+  if (forwardError || reverseError) throw forwardError || reverseError;
+  revalidateCustomizePaths();
+  return { success: true };
+}
+
+export async function updateCustomizeConsultationStatus(id: string, status: ConsultationStatus) {
+  await requireAdmin();
+  const admin = getSupabaseAdmin() as any;
+  const { error } = await admin
+    .from('customize_consultations')
+    .update({ status })
+    .eq('id', uuidField.parse(id));
+
+  if (error) throw error;
+  revalidatePath('/admin/consultations');
+  revalidatePath('/admin');
+  return { success: true };
+}
+
+export async function updateCustomizeConsultationMemo(id: string, internalMemo: string) {
+  await requireAdmin();
+  const admin = getSupabaseAdmin() as any;
+  const { error } = await admin
+    .from('customize_consultations')
+    .update({ internal_memo: internalMemo.trim().slice(0, 2000) })
+    .eq('id', uuidField.parse(id));
+
+  if (error) throw error;
+  revalidatePath('/admin/consultations');
+  return { success: true };
+}
+
+export async function deleteCustomizeConsultation(id: string) {
+  await requireAdmin();
+  const admin = getSupabaseAdmin() as any;
+  const { error } = await admin.from('customize_consultations').delete().eq('id', uuidField.parse(id));
+
+  if (error) throw error;
+  revalidatePath('/admin/consultations');
+  revalidatePath('/admin');
+  return { success: true };
+}
+
+function revalidateCustomizePaths() {
+  revalidatePath('/customize');
+  revalidatePath('/admin/customize');
+}
diff --git a/components/customize/CustomizeConfigurator.tsx b/components/customize/CustomizeConfigurator.tsx
new file mode 100644
index 0000000..6326583
--- /dev/null
+++ b/components/customize/CustomizeConfigurator.tsx
@@ -0,0 +1,771 @@
+'use client';
+
+import { useEffect, useMemo, useState, useTransition, type Dispatch, type ReactNode, type SetStateAction } from 'react';
+import Link from 'next/link';
+import Image from 'next/image';
+import { toast } from 'sonner';
+import {
+  ArrowLeft,
+  Bath,
+  Check,
+  ChevronDown,
+  DoorOpen,
+  Download,
+  Info,
+  Layers,
+  Loader2,
+  Maximize2,
+  PanelTop,
+  Send,
+  SlidersHorizontal,
+  Waves,
+  X,
+} from 'lucide-react';
+import { Button } from '@/components/ui/button';
+import { Input } from '@/components/ui/input';
+import { Label } from '@/components/ui/label';
+import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
+import { Textarea } from '@/components/ui/textarea';
+import { submitCustomizeConsultation } from '@/app/actions/customize-actions';
+import {
+  BUDGET_RANGES,
+  CATEGORY_META,
+  DEFAULT_MODEL_ID,
+  LAND_TYPES,
+  PURCHASE_TIMELINES,
+} from '@/lib/customize/config';
+import {
+  calculateEstimate,
+  decodeConfig,
+  encodeConfig,
+  floorplanSize,
+  formatModelStartPrice,
+  formatOptionPrice,
+  formatWon,
+  getDefaultSelections,
+  optionsForModel,
+  selectedOptionList,
+  toggleOptionSelection,
+} from '@/lib/customize/priceCalculator';
+import type {
+  ConsultationFormInput,
+  CustomizeCatalog,
+  CustomizeCategory,
+  CustomizeModel,
+  CustomizeOption,
+  SelectedOptions,
+} from '@/lib/customize/types';
+import { cn } from '@/lib/utils';
+
+interface CustomizeConfiguratorProps {
+  catalog: CustomizeCatalog;
+  initialConfig: string | null;
+}
+
+const PLAN_LABEL_POSITIONS: Record<string, (box: ReturnType<typeof floorplanSize>, index: number) => { x: number; y: number }> = {
+  exterior: (box) => ({ x: box.x + 58, y: box.y + box.height + 22 }),
+  windows: (box, index) => ({ x: box.x + box.width * (index % 2 === 0 ? 0.28 : 0.72), y: box.y - 16 }),
+  door: (box) => ({ x: box.x + box.width - 92, y: box.y + box.height + 22 }),
+  interior: (box) => ({ x: box.x + box.width * 0.48, y: box.y + box.height * 0.5 }),
+  flooring: (box) => ({ x: box.x + box.width * 0.48, y: box.y + box.height * 0.75 }),
+  sink: (box) => ({ x: box.x + 102, y: box.y + box.height - 62 }),
+  bathroom: (box) => ({ x: box.x + box.width - 148, y: box.y + 78 }),
+  furniture: (box, index) => ({ x: box.x + box.width * 0.36, y: box.y + 82 + index * 34 }),
+  energy: (box, index) => ({ x: box.x + 70 + index * 108, y: box.y - 42 }),
+  connectivity: (box, index) => ({ x: box.x + box.width - 208 + index * 96, y: box.y - 42 }),
+};
+
+const inputClass = 'h-11 rounded-lg border-gray-300 bg-[#fbfaf7] text-sm focus-visible:ring-[#b88b26]';
+const selectClass = 'h-11 w-full rounded-lg border border-gray-300 bg-[#fbfaf7] px-3 text-sm outline-none focus:ring-2 focus:ring-[#b88b26]/30';
+
+export default function CustomizeConfigurator({ catalog, initialConfig }: CustomizeConfiguratorProps) {
+  const decoded = useMemo(() => decodeConfig(initialConfig), [initialConfig]);
+  const firstModelId = catalog.models[0]?.id ?? DEFAULT_MODEL_ID;
+  const [modelId, setModelId] = useState(decoded?.modelId ?? firstModelId);
+  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>(() => {
+    if (decoded?.selectedOptions) return decoded.selectedOptions;
+    return getDefaultSelections(catalog, decoded?.modelId ?? firstModelId);
+  });
+  const [activeInfo, setActiveInfo] = useState<CustomizeOption | null>(null);
+  const [orderOpen, setOrderOpen] = useState(false);
+  const [optionDrawerOpen, setOptionDrawerOpen] = useState(false);
+  const [isPending, startTransition] = useTransition();
+  const [form, setForm] = useState({
+    customerName: '',
+    phone: '',
+    region: '',
+    purchaseTimeline: '',
+    landType: '',
+    installAddress: '',
+    budgetRange: '',
+    memo: '',
+  });
+
+  const estimate = useMemo(
+    () => calculateEstimate(catalog, modelId, selectedOptions),
+    [catalog, modelId, selectedOptions]
+  );
+  const selectedOptionsList = useMemo(
+    () => selectedOptionList(catalog, selectedOptions, modelId),
+    [catalog, modelId, selectedOptions]
+  );
+  const encodedConfig = useMemo(() => encodeConfig(modelId, selectedOptions), [modelId, selectedOptions]);
+
+  useEffect(() => {
+    if (!estimate || typeof window === 'undefined') return;
+    const nextUrl = `${window.location.pathname}?c=${encodedConfig}`;
+    window.history.replaceState(null, '', nextUrl);
+  }, [encodedConfig, estimate]);
+
+  const currentModel = estimate?.model ?? catalog.models[0];
+  const visibleOptions = useMemo(() => optionsForModel(catalog.options.filter((option) => option.isActive), modelId), [catalog.options, modelId]);
+
+  const handleModelChange = (nextModelId: string) => {
+    setModelId(nextModelId);
+    setSelectedOptions(getDefaultSelections(catalog, nextModelId));
+  };
+
+  const handleOptionToggle = (category: CustomizeCategory, option: CustomizeOption) => {
+    setSelectedOptions((current) => toggleOptionSelection({ catalog, selectedOptions: current, category, option }));
+  };
+
+  const handleSubmit = () => {
+    const payload: ConsultationFormInput = {
+      modelId,
+      selectedOptions,
+      configQuery: encodedConfig,
+      ...form,
+    };
+
+    startTransition(async () => {
+      const result = await submitCustomizeConsultation(payload);
+      if (result.success) {
+        toast.success(result.message);
+        setOrderOpen(false);
+        setForm({
+          customerName: '',
+          phone: '',
+          region: '',
+          purchaseTimeline: '',
+          landType: '',
+          installAddress: '',
+          budgetRange: '',
+          memo: '',
+        });
+      } else {
+        toast.error(result.message);
+      }
+    });
+  };
+
+  const handleSaveQuote = () => {
+    if (!estimate) return;
+
+    const html = buildQuoteHtml(estimate.model, selectedOptionsList, estimate.estimatedTotal);
+    const popup = window.open('', '_blank', 'width=1120,height=794');
+    if (!popup) {
+      toast.error('견적 창을 열 수 없습니다. 팝업 설정을 확인해주세요.');
+      return;
+    }
+
+    popup.document.write(html);
+    popup.document.close();
+    popup.focus();
+    popup.print();
+  };
+
+  if (!currentModel || catalog.models.length === 0) {
+    return (
+      <div className="min-h-dvh bg-[#f4f0e8] px-6 py-20 text-center text-[#2f3432]">
+        <p className="text-lg font-bold">주문 구성을 준비 중입니다.</p>
+        <p className="mt-3 text-sm text-[#6f6a60]">관리자에서 모델과 옵션을 활성화하면 페이지가 표시됩니다.</p>
+      </div>
+    );
+  }
+
+  return (
+    <div className="min-h-dvh bg-[#f4f0e8] text-[#2f3432]">
+      <ConfiguratorAppBar />
+
+      <div className="mx-auto flex min-h-[calc(100dvh-64px)] max-w-[1800px] flex-col lg:flex-row">
+        <section className="flex min-h-[calc(100dvh-190px)] flex-1 flex-col lg:w-[64%] lg:min-h-[calc(100dvh-64px)]">
+          <div className="flex flex-1 items-center justify-center px-4 py-5 md:px-8 lg:px-10">
+            <FloorplanPreview model={currentModel} selectedOptions={selectedOptionsList} />
+          </div>
+
+          <div className="border-t border-[#d8d0c3] bg-[#eee8dc]/80 px-4 pb-28 pt-3 lg:hidden">
+            <Button
+              variant="outline"
+              className="h-11 w-full border-[#cfc4b3] bg-[#fbfaf7] text-[#2f3432]"
+              onClick={() => setOptionDrawerOpen(true)}
+            >
+              <SlidersHorizontal className="h-4 w-4" />
+              옵션 구성
+            </Button>
+          </div>
+        </section>
+
+        <aside className="hidden border-l border-[#d8d0c3] bg-[#fbfaf7] lg:block lg:w-[36%]">
+          <OptionsPanel
+            catalog={catalog}
+            modelId={modelId}
+            selectedOptions={selectedOptions}
+            visibleOptions={visibleOptions}
+            onModelChange={handleModelChange}
+            onOptionToggle={handleOptionToggle}
+            onInfo={setActiveInfo}
+          />
+        </aside>
+      </div>
+
+      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#d8d0c3] bg-[#fbfaf7]/95 px-4 py-3 shadow-[0_-8px_30px_rgba(55,48,39,0.12)] backdrop-blur lg:left-[64%]">
+        <div className="mx-auto flex max-w-[720px] items-center justify-between gap-4">
+          <div>
+            <p className="text-xs font-semibold text-[#7b7468]">예상 총액</p>
+            <p className="text-xl font-black text-[#2f3432]">{estimate ? formatWon(estimate.estimatedTotal) : '-'}</p>
+            <p className="text-xs text-[#8b8172]">운반·설치 별도</p>
+          </div>
+          <Button className="h-12 min-w-[132px] bg-[#2f3432] text-white hover:bg-[#1f2422]" onClick={() => setOrderOpen(true)}>
+            주문하기
+          </Button>
+        </div>
+      </div>
+
+      <Sheet open={optionDrawerOpen} onOpenChange={setOptionDrawerOpen}>
+        <SheetContent side="bottom" className="max-h-[86dvh] overflow-hidden rounded-t-lg border-[#d8d0c3] bg-[#fbfaf7] p-0">
+          <SheetHeader className="border-b border-[#e2dacd]">
+            <SheetTitle>옵션 구성</SheetTitle>
+          </SheetHeader>
+          <div className="h-[calc(86dvh-65px)] overflow-y-auto">
+            <OptionsPanel
+              catalog={catalog}
+              modelId={modelId}
+              selectedOptions={selectedOptions}
+              visibleOptions={visibleOptions}
+              onModelChange={handleModelChange}
+              onOptionToggle={handleOptionToggle}
+              onInfo={setActiveInfo}
+              compact
+            />
+          </div>
+        </SheetContent>
+      </Sheet>
+
+      {activeInfo && <OptionInfoModal option={activeInfo} onClose={() => setActiveInfo(null)} />}
+
+      {orderOpen && estimate && (
+        <OrderModal
+          estimate={estimate}
+          selectedOptions={selectedOptionsList}
+          form={form}
+          setForm={setForm}
+          isPending={isPending}
+          onClose={() => setOrderOpen(false)}
+          onSubmit={handleSubmit}
+          onSaveQuote={handleSaveQuote}
+        />
+      )}
+    </div>
+  );
+}
+
+function ConfiguratorAppBar() {
+  return (
+    <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-[#d8d0c3] bg-[#fbfaf7]/95 px-4 backdrop-blur md:h-16 md:px-6">
+      <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-[#2f3432]">
+        <ArrowLeft className="h-4 w-4" />
+        WEET
+      </Link>
+      <div className="text-center">
+        <p className="text-sm font-black text-[#2f3432]">주문하기</p>
+        <p className="text-xs text-[#83796a]">나만의 위트 만들기</p>
+      </div>
+      <Link href="/support" className="text-sm font-semibold text-[#6f6658] hover:text-[#2f3432]">
+        확인사항
+      </Link>
+    </header>
+  );
+}
+
+function OptionsPanel({
+  catalog,
+  modelId,
+  selectedOptions,
+  visibleOptions,
+  onModelChange,
+  onOptionToggle,
+  onInfo,
+  compact = false,
+}: {
+  catalog: CustomizeCatalog;
+  modelId: string;
+  selectedOptions: SelectedOptions;
+  visibleOptions: CustomizeOption[];
+  onModelChange: (modelId: string) => void;
+  onOptionToggle: (category: CustomizeCategory, option: CustomizeOption) => void;
+  onInfo: (option: CustomizeOption) => void;
+  compact?: boolean;
+}) {
+  return (
+    <div className={cn('pb-28', compact ? 'px-4 py-4' : 'h-[calc(100dvh-64px)] overflow-y-auto px-8 py-8')}>
+      <div className="mb-8">
+        <h2 className="text-xl font-black text-[#2f3432]">이동식주택 구성</h2>
+        <p className="mt-1 text-sm text-[#756d61]">선택한 구성은 상담 요청 시 그대로 저장됩니다.</p>
+      </div>
+
+      <section className="mb-8">
+        <CategoryHeading title="모델" amount={0} icon={<Layers className="h-4 w-4" />} />
+        <div className="mt-3 grid gap-3">
+          {catalog.models.map((model) => (
+            <button
+              key={model.id}
+              type="button"
+              onClick={() => onModelChange(model.id)}
+              className={cn(
+                'min-h-[96px] rounded-lg border p-4 text-left transition-colors',
+                model.id === modelId
+                  ? 'border-[#2f3432] bg-[#efe6d4] shadow-sm'
+                  : 'border-[#ded5c8] bg-[#fbfaf7] hover:border-[#b9aa94]'
+              )}
+            >
+              <div className="flex items-start justify-between gap-4">
+                <div>
+                  <p className="text-base font-black text-[#2f3432]">{model.nameKo}</p>
+                  <p className="mt-1 text-sm text-[#756d61]">{model.widthM}m x {model.lengthM}m · {model.areaSqm}m²</p>
+                </div>
+                {model.id === modelId && <Check className="h-5 w-5 text-[#2f3432]" />}
+              </div>
+              <p className="mt-4 text-sm font-bold text-[#6b5a2b]">{formatModelStartPrice(model.basePrice)}</p>
+            </button>
+          ))}
+        </div>
+      </section>
+
+      {catalog.categories
+        .filter((category) => category.key !== 'model')
+        .map((category) => {
+          const options = visibleOptions.filter((option) => option.categoryId === category.id);
+          if (options.length === 0) return null;
+
+          const amount = options
+            .filter((option) => selectedOptions[category.id]?.includes(option.id))
+            .reduce((sum, option) => sum + (option.priceType === 'fixed' ? option.price : 0), 0);
+          const meta = CATEGORY_META[category.key as keyof typeof CATEGORY_META];
+          const Icon = meta?.icon ?? Layers;
+
+          return (
+            <section key={category.id} className="mb-8 scroll-mt-20">
+              <CategoryHeading title={category.nameKo} amount={amount} icon={<Icon className={cn('h-4 w-4', meta?.tone)} />} />
+              {category.descriptionKo && <p className="mt-1 text-sm leading-6 text-[#756d61]">{category.descriptionKo}</p>}
+              <div className="mt-3 grid gap-3">
+                {options.map((option) => (
+                  <OptionCard
+                    key={option.id}
+                    option={option}
+                    selected={selectedOptions[category.id]?.includes(option.id) ?? false}
+                    onToggle={() => onOptionToggle(category, option)}
+                    onInfo={() => onInfo(option)}
+                  />
+                ))}
+              </div>
+            </section>
+          );
+        })}
+    </div>
+  );
+}
+
+function CategoryHeading({ title, amount, icon }: { title: string; amount: number; icon: ReactNode }) {
+  return (
+    <div className="flex items-center justify-between gap-3">
+      <div className="flex items-center gap-2">
+        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#efe6d4] text-[#2f3432]">{icon}</span>
+        <h3 className="text-base font-black text-[#2f3432]">{title}</h3>
+      </div>
+      <p className="text-sm font-bold text-[#7a6a3a]">{amount > 0 ? formatWon(amount) : '포함'}</p>
+    </div>
+  );
+}
+
+function OptionCard({
+  option,
+  selected,
+  onToggle,
+  onInfo,
+}: {
+  option: CustomizeOption;
+  selected: boolean;
+  onToggle: () => void;
+  onInfo: () => void;
+}) {
+  return (
+    <div
+      className={cn(
+        'rounded-lg border bg-[#fbfaf7] transition-colors',
+        selected ? 'border-[#2f3432] shadow-sm' : 'border-[#ded5c8] hover:border-[#b9aa94]'
+      )}
+    >
+      <button type="button" onClick={onToggle} className="flex w-full items-start gap-3 p-4 text-left">
+        <span
+          className={cn(
+            'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border',
+            selected ? 'border-[#2f3432] bg-[#2f3432] text-white' : 'border-[#bcb2a3] bg-[#fbfaf7]'
+          )}
+        >
+          {selected && <Check className="h-3.5 w-3.5" />}
+        </span>
+        <span className="min-w-0 flex-1">
+          <span className="flex items-start justify-between gap-3">
+            <span className="font-bold text-[#2f3432]">{option.nameKo}</span>
+            <span className="shrink-0 rounded-md bg-[#efe6d4] px-2 py-1 text-xs font-black text-[#6d5b2b]">
+              {formatOptionPrice(option)}
+            </span>
+          </span>
+          <span className="mt-1 block text-sm leading-6 text-[#756d61]">{option.shortDescriptionKo}</span>
+        </span>
+      </button>
+      <div className="flex justify-end border-t border-[#eee6da] px-4 py-2">
+        <button
+          type="button"
+          onClick={onInfo}
+          className="inline-flex h-8 items-center gap-1 rounded-md px-2 text-xs font-semibold text-[#6f6658] hover:bg-[#efe6d4] hover:text-[#2f3432]"
+        >
+          <Info className="h-3.5 w-3.5" />
+          상세
+        </button>
+      </div>
+    </div>
+  );
+}
+
+function FloorplanPreview({ model, selectedOptions }: { model: CustomizeModel; selectedOptions: CustomizeOption[] }) {
+  const box = floorplanSize(model);
+  const selectedLabels = selectedOptions.filter((option) => option.overlayLabelKo);
+  const hasBaseImage = Boolean(model.floorplanImagePath);
+
+  return (
+    <div className="w-full max-w-[1100px]">
+      <div className="mb-4 flex items-end justify-between gap-4">
+        <div>
+          <p className="text-sm font-bold text-[#8a806f]">선택 모델</p>
+          <h1 className="text-2xl font-black text-[#2f3432] md:text-3xl">{model.nameKo}</h1>
+        </div>
+        <div className="text-right">
+          <p className="text-sm font-bold text-[#8a806f]">기본가</p>
+          <p className="text-lg font-black text-[#6b5a2b]">{formatModelStartPrice(model.basePrice)}</p>
+        </div>
+      </div>
+
+      <div className="relative overflow-hidden rounded-lg border border-[#d8d0c3] bg-[#fbfaf7] shadow-sm">
+        <svg viewBox="0 0 1000 420" className="aspect-[1000/420] w-full" data-testid="floorplan-canvas">
+          <defs>
+            <pattern id="floor-grid" width="24" height="24" patternUnits="userSpaceOnUse">
+              <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#e4ddd1" strokeWidth="1" />
+            </pattern>
+          </defs>
+          <rect width="1000" height="420" fill="#f5f1ea" />
+          {hasBaseImage ? (
+            <image
+              data-testid="base-floorplan-image"
+              href={model.floorplanImagePath ?? undefined}
+              x="0"
+              y="0"
+              width="1000"
+              height="420"
+              preserveAspectRatio="xMidYMid meet"
+            />
+          ) : (
+            <>
+              <rect x={box.x} y={box.y} width={box.width} height={box.height} fill="#f8f4ec" stroke="#2f3432" strokeWidth="12" className="transition-all duration-[600ms]" />
+              <rect x={box.x + 12} y={box.y + 12} width={box.width - 24} height={box.height - 24} fill="url(#floor-grid)" stroke="#bfb4a2" strokeWidth="2" className="transition-all duration-[600ms]" />
+              <BasePlanObjects box={box} />
+            </>
+          )}
+
+          <rect
+            data-testid="model-footprint"
+            x={box.x}
+            y={box.y}
+            width={box.width}
+            height={box.height}
+            fill="transparent"
+            stroke="#2f3432"
+            strokeWidth="6"
+            className="transition-all duration-[600ms]"
+          />
+
+          {selectedOptions.map((option) => option.overlayImagePath ? (
+            <image
+              key={option.id}
+              href={option.overlayImagePath}
+              x="0"
+              y="0"
+              width="1000"
+              height="420"
+              opacity="0.88"
+              className="transition-opacity duration-[250ms]"
+            />
+          ) : null)}
+
+          {selectedLabels.map((option, index) => {
+            const position = (PLAN_LABEL_POSITIONS[option.categoryKey] ?? PLAN_LABEL_POSITIONS.interior)(box, index);
+            return (
+              <g key={option.id} className="transition-all duration-[250ms]">
+                <rect x={position.x - 8} y={position.y - 19} width={Math.max(58, (option.overlayLabelKo?.length ?? 2) * 14 + 20)} height="30" rx="6" fill="#2f3432" />
+                <text x={position.x + 4} y={position.y + 1} fill="#fbfaf7" fontSize="15" fontWeight="700">
+                  {option.overlayLabelKo}
+                </text>
+              </g>
+            );
+          })}
+        </svg>
+      </div>
+    </div>
+  );
+}
+
+function BasePlanObjects({ box }: { box: ReturnType<typeof floorplanSize> }) {
+  return (
+    <g className="transition-all duration-[600ms]">
+      <rect x={box.x + box.width - 84} y={box.y + box.height - 8} width="60" height="16" fill="#8d7a5a" />
+      <path d={`M ${box.x + box.width - 78} ${box.y + box.height - 8} Q ${box.x + box.width - 80} ${box.y + box.height - 70} ${box.x + box.width - 20} ${box.y + box.height - 70}`} fill="none" stroke="#8d7a5a" strokeWidth="3" />
+      <text x={box.x + box.width - 96} y={box.y + box.height - 28} fill="#5f5448" fontSize="14" fontWeight="700">현관도어</text>
+
+      <rect x={box.x + box.width * 0.25} y={box.y - 6} width="96" height="12" fill="#7f9aa0" />
+      <text x={box.x + box.width * 0.25 + 12} y={box.y + 24} fill="#5f5448" fontSize="14" fontWeight="700">기본창</text>
+
+      <rect x={box.x + 60} y={box.y + box.height - 108} width="150" height="64" rx="4" fill="#e1d7c8" stroke="#6b6258" strokeWidth="2" />
+      <circle cx={box.x + 88} cy={box.y + box.height - 76} r="16" fill="none" stroke="#6b6258" strokeWidth="2" />
+      <text x={box.x + 92} y={box.y + box.height - 116} fill="#5f5448" fontSize="14" fontWeight="700">싱크대</text>
+
+      <rect x={box.x + box.width - 210} y={box.y + 46} width="140" height="112" rx="4" fill="#e7e1d8" stroke="#6b6258" strokeWidth="2" />
+      <circle cx={box.x + box.width - 104} cy={box.y + 86} r="18" fill="none" stroke="#6b6258" strokeWidth="2" />
+      <rect x={box.x + box.width - 198} y={box.y + 58} width="48" height="32" rx="4" fill="none" stroke="#6b6258" strokeWidth="2" />
+      <text x={box.x + box.width - 196} y={box.y + 178} fill="#5f5448" fontSize="14" fontWeight="700">욕실</text>
+    </g>
+  );
+}
+
+function OptionInfoModal({ option, onClose }: { option: CustomizeOption; onClose: () => void }) {
+  return (
+    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 p-4" onClick={onClose}>
+      <div className="w-full max-w-xl rounded-lg bg-[#fbfaf7] p-5 shadow-2xl" onClick={(event) => event.stopPropagation()}>
+        <div className="mb-4 flex items-start justify-between gap-4">
+          <div>
+            <p className="text-xs font-bold text-[#8a806f]">{formatOptionPrice(option)}</p>
+            <h3 className="mt-1 text-xl font-black text-[#2f3432]">{option.nameKo}</h3>
+          </div>
+          <Button variant="ghost" size="icon-sm" onClick={onClose}>
+            <X className="h-4 w-4" />
+          </Button>
+        </div>
+        <div className="relative mb-4 aspect-[16/9] overflow-hidden rounded-lg bg-[#eee8dc]">
+          {option.imagePath ? (
+            <Image src={option.imagePath} alt={option.nameKo} fill className="object-cover" />
+          ) : (
+            <div className="flex h-full items-center justify-center text-sm font-semibold text-[#8a806f]">
+              이미지 준비 중
+            </div>
+          )}
+        </div>
+        <p className="whitespace-pre-wrap text-sm leading-7 text-[#5f574d]">
+          {option.detailDescriptionKo || option.shortDescriptionKo}
+        </p>
+      </div>
+    </div>
+  );
+}
+
+function OrderModal({
+  estimate,
+  selectedOptions,
+  form,
+  setForm,
+  isPending,
+  onClose,
+  onSubmit,
+  onSaveQuote,
+}: {
+  estimate: NonNullable<ReturnType<typeof calculateEstimate>>;
+  selectedOptions: CustomizeOption[];
+  form: {
+    customerName: string;
+    phone: string;
+    region: string;
+    purchaseTimeline: string;
+    landType: string;
+    installAddress: string;
+    budgetRange: string;
+    memo: string;
+  };
+  setForm: Dispatch<SetStateAction<{
+    customerName: string;
+    phone: string;
+    region: string;
+    purchaseTimeline: string;
+    landType: string;
+    installAddress: string;
+    budgetRange: string;
+    memo: string;
+  }>>;
+  isPending: boolean;
+  onClose: () => void;
+  onSubmit: () => void;
+  onSaveQuote: () => void;
+}) {
+  const updateField = (name: keyof typeof form, value: string) => setForm((current) => ({ ...current, [name]: value }));
+
+  return (
+    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/45 p-4" onClick={onClose}>
+      <div className="mx-auto my-6 grid w-full max-w-6xl gap-0 overflow-hidden rounded-lg bg-[#fbfaf7] shadow-2xl lg:grid-cols-[1fr_0.9fr]" onClick={(event) => event.stopPropagation()}>
+        <div className="bg-[#f4f0e8] p-5 md:p-8">
+          <div className="mb-4 flex items-start justify-between gap-4">
+            <div>
+              <p className="text-sm font-bold text-[#8a806f]">선택 평면</p>
+              <h2 className="text-2xl font-black text-[#2f3432]">{estimate.model.nameKo}</h2>
+            </div>
+            <Maximize2 className="h-5 w-5 text-[#8a806f]" />
+          </div>
+          <FloorplanPreview model={estimate.model} selectedOptions={selectedOptions} />
+        </div>
+
+        <div className="max-h-[90dvh] overflow-y-auto p-5 md:p-8">
+          <div className="mb-5 flex items-start justify-between gap-4">
+            <div>
+              <h2 className="text-2xl font-black text-[#2f3432]">상담 요청</h2>
+              <p className="mt-1 text-sm text-[#756d61]">상담 후 최종 확정 · 운반·설치 별도</p>
+            </div>
+            <Button variant="ghost" size="icon-sm" onClick={onClose}>
+              <X className="h-4 w-4" />
+            </Button>
+          </div>
+
+          <div className="mb-6 rounded-lg border border-[#ded5c8] bg-[#f4f0e8] p-4">
+            <div className="flex items-center justify-between gap-4">
+              <span className="text-sm font-bold text-[#756d61]">예상 총액</span>
+              <span className="text-2xl font-black text-[#2f3432]">{formatWon(estimate.estimatedTotal)}</span>
+            </div>
+            <div className="mt-3 max-h-40 overflow-y-auto border-t border-[#ded5c8] pt-3">
+              <p className="text-sm font-bold text-[#2f3432]">{estimate.model.nameKo}</p>
+              {selectedOptions.map((option) => (
+                <div key={option.id} className="mt-2 flex justify-between gap-3 text-sm text-[#61594f]">
+                  <span>{option.nameKo}</span>
+                  <span className="font-semibold">{formatOptionPrice(option)}</span>
+                </div>
+              ))}
+            </div>
+          </div>
+
+          <div className="grid gap-4 md:grid-cols-2">
+            <Field label="이름" required>
+              <Input data-testid="consultation-name" className={inputClass} value={form.customerName} onChange={(event) => updateField('customerName', event.target.value)} />
+            </Field>
+            <Field label="연락처" required>
+              <Input data-testid="consultation-phone" className={inputClass} value={form.phone} onChange={(event) => updateField('phone', event.target.value)} />
+            </Field>
+            <Field label="지역" required>
+              <Input data-testid="consultation-region" className={inputClass} placeholder="경기도 양평군" value={form.region} onChange={(event) => updateField('region', event.target.value)} />
+            </Field>
+            <Field label="예상 구매 시기">
+              <Select value={form.purchaseTimeline} onChange={(value) => updateField('purchaseTimeline', value)} options={PURCHASE_TIMELINES} />
+            </Field>
+            <Field label="설치할 장소 지목">
+              <Select value={form.landType} onChange={(value) => updateField('landType', value)} options={LAND_TYPES} />
+            </Field>
+            <Field label="구매 예산">
+              <Select value={form.budgetRange} onChange={(value) => updateField('budgetRange', value)} options={BUDGET_RANGES} />
+            </Field>
+            <Field label="설치 주소" className="md:col-span-2">
+              <Input className={inputClass} value={form.installAddress} onChange={(event) => updateField('installAddress', event.target.value)} />
+            </Field>
+            <Field label="추가 메모" className="md:col-span-2">
+              <Textarea className="min-h-24 rounded-lg border-gray-300 bg-[#fbfaf7] text-sm focus-visible:ring-[#b88b26]" value={form.memo} onChange={(event) => updateField('memo', event.target.value)} />
+            </Field>
+          </div>
+
+          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
+            <Button data-testid="consultation-submit" className="h-12 flex-1 bg-[#2f3432] text-white hover:bg-[#1f2422]" disabled={isPending} onClick={onSubmit}>
+              {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
+              상담 요청
+            </Button>
+            <Button variant="outline" className="h-12 flex-1 border-[#cfc4b3] bg-[#fbfaf7]" onClick={onSaveQuote}>
+              <Download className="h-4 w-4" />
+              견적 저장
+            </Button>
+          </div>
+        </div>
+      </div>
+    </div>
+  );
+}
+
+function Field({ label, required, className, children }: { label: string; required?: boolean; className?: string; children: ReactNode }) {
+  return (
+    <div className={className}>
+      <Label className="mb-2 block text-sm font-bold text-[#4f473d]">
+        {label}
+        {required && <span className="ml-1 text-[#a56f16]">*</span>}
+      </Label>
+      {children}
+    </div>
+  );
+}
+
+function Select({ value, onChange, options }: { value: string; onChange: (value: string) => void; options: readonly string[] }) {
+  return (
+    <div className="relative">
+      <select value={value} onChange={(event) => onChange(event.target.value)} className={selectClass}>
+        <option value="">선택 안 함</option>
+        {options.map((option) => (
+          <option key={option} value={option}>
+            {option}
+          </option>
+        ))}
+      </select>
+      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8a806f]" />
+    </div>
+  );
+}
+
+function buildQuoteHtml(model: CustomizeModel, selectedOptions: CustomizeOption[], total: number) {
+  const optionRows = selectedOptions
+    .map((option) => `<tr><td>${escapeHtml(option.nameKo)}</td><td>${escapeHtml(formatOptionPrice(option))}</td></tr>`)
+    .join('');
+
+  return `<!doctype html>
+<html lang="ko">
+<head>
+  <meta charset="utf-8" />
+  <title>위트 견적 요약</title>
+  <style>
+    @page { size: A4 landscape; margin: 18mm; }
+    body { font-family: -apple-system, BlinkMacSystemFont, "Noto Sans KR", sans-serif; color: #2f3432; background: #f8f4ec; }
+    h1 { margin: 0 0 8px; font-size: 28px; }
+    p { margin: 0; color: #6f6658; }
+    table { width: 100%; margin-top: 24px; border-collapse: collapse; background: #fffaf2; }
+    th, td { border-bottom: 1px solid #ded5c8; padding: 12px; text-align: left; }
+    .total { margin-top: 24px; font-size: 30px; font-weight: 900; }
+  </style>
+</head>
+<body>
+  <h1>위트 이동식주택 견적 요약</h1>
+  <p>상담 후 최종 확정 · 운반·설치 별도</p>
+  <table>
+    <tr><th>항목</th><th>가격</th></tr>
+    <tr><td>${escapeHtml(model.nameKo)}</td><td>${escapeHtml(formatWon(model.basePrice))}</td></tr>
+    ${optionRows}
+  </table>
+  <div class="total">예상 총액 ${escapeHtml(formatWon(total))}</div>
+</body>
+</html>`;
+}
+
+function escapeHtml(value: string) {
+  return value.replace(/[&<>"']/g, (char) => ({
+    '&': '&amp;',
+    '<': '&lt;',
+    '>': '&gt;',
+    '"': '&quot;',
+    "'": '&#039;',
+  })[char] ?? char);
+}
diff --git a/e2e/customize-configurator.spec.ts b/e2e/customize-configurator.spec.ts
new file mode 100644
index 0000000..9ab242d
--- /dev/null
+++ b/e2e/customize-configurator.spec.ts
@@ -0,0 +1,109 @@
+import { expect, test } from '@playwright/test';
+import { createClient } from '@supabase/supabase-js';
+import { config as loadEnv } from 'dotenv';
+
+loadEnv({ path: '.env.local' });
+
+const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
+const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
+const canUseServiceRole = Boolean(supabaseUrl && serviceRoleKey);
+const serviceClient = canUseServiceRole
+  ? createClient(supabaseUrl!, serviceRoleKey!, { auth: { persistSession: false } })
+  : null;
+
+test.describe('Customize configurator', () => {
+  test('desktop model and option flow updates estimated total and URL config', async ({ page }) => {
+    await page.goto('/customize');
+    await page.waitForLoadState('networkidle');
+
+    await expect(page.getByRole('heading', { name: 'Compact 3x6' })).toBeVisible();
+    await expect(page.getByText('₩27,900,000', { exact: true })).toBeVisible();
+    await expect(page.getByTestId('base-floorplan-image')).toHaveAttribute('href', /dummy-base\.svg/);
+    await expect(page.getByTestId('model-footprint')).toHaveAttribute('x', '400');
+    await expect(page.getByTestId('model-footprint')).toHaveAttribute('width', '600');
+
+    await page.getByRole('button', { name: /Standard 3x9/ }).click();
+    await expect(page.getByRole('heading', { name: 'Standard 3x9' })).toBeVisible();
+    await expect(page.getByText('₩34,900,000', { exact: true })).toBeVisible();
+    await expect(page.getByTestId('model-footprint')).toHaveAttribute('x', '100');
+    await expect(page.getByTestId('model-footprint')).toHaveAttribute('width', '900');
+
+    await page.getByRole('button', { name: /적삼목 포인트/ }).click();
+    await expect(page.getByText('₩37,100,000')).toBeVisible();
+
+    await page.getByRole('button', { name: /태양광 패널/ }).click();
+    await expect(page.getByText('상담').first()).toBeVisible();
+    await expect(page).toHaveURL(/\/customize\?c=/);
+  });
+
+  test('order modal opens without submitting consultation', async ({ page }) => {
+    await page.goto('/customize');
+    await page.waitForLoadState('networkidle');
+
+    await page.getByRole('button', { name: '주문하기' }).last().click();
+
+    await expect(page.getByRole('heading', { name: '상담 요청' })).toBeVisible();
+    await expect(page.getByText('상담 후 최종 확정')).toBeVisible();
+    await expect(page.getByText('이름')).toBeVisible();
+    await expect(page.getByText('연락처')).toBeVisible();
+    await expect(page.getByText('지역')).toBeVisible();
+  });
+
+  test('consultation submission succeeds with insert-only RLS and stores snapshot', async ({ page }) => {
+    test.skip(!serviceClient, 'Supabase service role env is required for consultation cleanup.');
+
+    const uniquePhone = `010${Date.now().toString().slice(-8)}`;
+    const uniqueName = `Codex E2E ${Date.now()}`;
+
+    try {
+      await page.goto('/customize');
+      await page.waitForLoadState('networkidle');
+
+      await page.getByRole('button', { name: '주문하기' }).last().click();
+      await page.getByTestId('consultation-name').fill(uniqueName);
+      await page.getByTestId('consultation-phone').fill(uniquePhone);
+      await page.getByTestId('consultation-region').fill('테스트 지역');
+      await page.getByTestId('consultation-submit').click();
+
+      await expect(page.getByText('상담 요청이 접수되었습니다.')).toBeVisible({ timeout: 15000 });
+
+      await expect.poll(async () => {
+        const { count } = await serviceClient!
+          .from('customize_consultations')
+          .select('id', { count: 'exact', head: true })
+          .eq('phone', uniquePhone);
+        return count ?? 0;
+      }, { timeout: 15000 }).toBe(1);
+
+      const { data, error } = await serviceClient!
+        .from('customize_consultations')
+        .select('id, selected_model_id, estimated_total, config_snapshot')
+        .eq('phone', uniquePhone)
+        .single();
+
+      expect(error).toBeNull();
+      expect(data?.selected_model_id).toBe('compact-3x6');
+      expect(data?.estimated_total).toBe(27900000);
+      expect(data?.config_snapshot).toMatchObject({
+        version: 1,
+        estimatedTotal: 27900000,
+      });
+    } finally {
+      await serviceClient?.from('customize_consultations').delete().eq('phone', uniquePhone);
+    }
+  });
+
+  test('mobile option drawer is available before order CTA', async ({ page }) => {
+    await page.setViewportSize({ width: 390, height: 844 });
+    await page.goto('/customize');
+    await page.waitForLoadState('networkidle');
+
+    await page.getByRole('button', { name: '옵션 구성' }).click();
+
+    const drawer = page.getByRole('dialog').filter({ hasText: '옵션 구성' });
+    await expect(drawer).toBeVisible();
+    await expect(drawer.getByRole('heading', { name: '외장' })).toBeVisible();
+    await drawer.getByRole('button', { name: /적삼목 포인트/ }).click();
+    await expect(page.getByText('₩30,100,000', { exact: true })).toBeVisible();
+  });
+});
diff --git a/public/images/customize/dummy-base.svg b/public/images/customize/dummy-base.svg
index 535f6fa..df2dbfc 100644
--- a/public/images/customize/dummy-base.svg
+++ b/public/images/customize/dummy-base.svg
@@ -1,34 +1,64 @@
-<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
-  <!-- 배경 -->
-  <rect width="800" height="600" fill="#f5f5f5"/>
-  
-  <!-- 땅 -->
-  <rect x="0" y="500" width="800" height="100" fill="#8B7355"/>
-  
-  <!-- 집 본체 (벽) -->
-  <rect x="200" y="250" width="400" height="250" fill="#D4C5B0" stroke="#8B7355" stroke-width="2"/>
-  
-  <!-- 문 -->
-  <rect x="350" y="380" width="100" height="120" fill="#6B5340" rx="5"/>
-  <circle cx="440" cy="440" r="5" fill="#FDB813"/>
-  
-  <!-- 창문 2 개 -->
-  <rect x="240" y="300" width="80" height="80" fill="#A8D5E5" stroke="#8B7355" stroke-width="2"/>
-  <rect x="480" y="300" width="80" height="80" fill="#A8D5E5" stroke="#8B7355" stroke-width="2"/>
-  
-  <!-- 지붕 (삼각형) -->
-  <polygon points="180,250 400,150 620,250" fill="#8B4513" stroke="#6B3310" stroke-width="2"/>
-  
-  <!-- 굴뚝 -->
-  <rect x="500" y="120" width="40" height="60" fill="#A0522D"/>
-  
-  <!-- 하늘 -->
-  <circle cx="700" cy="80" r="40" fill="#FDB813"/>
-  
-  <!-- 나무 -->
-  <rect x="50" y="400" width="30" height="100" fill="#6B5340"/>
-  <circle cx="65" cy="380" r="40" fill="#228B22"/>
-  
-  <rect x="720" y="420" width="25" height="80" fill="#6B5340"/>
-  <circle cx="732" cy="400" r="35" fill="#228B22"/>
+<svg width="1000" height="420" viewBox="0 0 1000 420" fill="none" xmlns="http://www.w3.org/2000/svg">
+  <rect width="1000" height="420" fill="#f5f1ea"/>
+  <rect x="100" y="60" width="900" height="300" rx="6" fill="#fbf7ef" stroke="#2f3432" stroke-width="12"/>
+  <rect x="118" y="78" width="864" height="264" rx="3" fill="#f8f4ec" stroke="#c8bdab" stroke-width="2"/>
+  <g stroke="#e3dccf" stroke-width="1">
+    <path d="M142 78V342"/>
+    <path d="M166 78V342"/>
+    <path d="M190 78V342"/>
+    <path d="M214 78V342"/>
+    <path d="M238 78V342"/>
+    <path d="M262 78V342"/>
+    <path d="M286 78V342"/>
+    <path d="M310 78V342"/>
+    <path d="M334 78V342"/>
+    <path d="M358 78V342"/>
+    <path d="M382 78V342"/>
+    <path d="M406 78V342"/>
+    <path d="M430 78V342"/>
+    <path d="M454 78V342"/>
+    <path d="M478 78V342"/>
+    <path d="M502 78V342"/>
+    <path d="M526 78V342"/>
+    <path d="M550 78V342"/>
+    <path d="M574 78V342"/>
+    <path d="M598 78V342"/>
+    <path d="M622 78V342"/>
+    <path d="M646 78V342"/>
+    <path d="M670 78V342"/>
+    <path d="M694 78V342"/>
+    <path d="M718 78V342"/>
+    <path d="M742 78V342"/>
+    <path d="M766 78V342"/>
+    <path d="M790 78V342"/>
+    <path d="M814 78V342"/>
+    <path d="M838 78V342"/>
+    <path d="M862 78V342"/>
+    <path d="M886 78V342"/>
+    <path d="M910 78V342"/>
+    <path d="M934 78V342"/>
+    <path d="M958 78V342"/>
+    <path d="M118 102H982"/>
+    <path d="M118 126H982"/>
+    <path d="M118 150H982"/>
+    <path d="M118 174H982"/>
+    <path d="M118 198H982"/>
+    <path d="M118 222H982"/>
+    <path d="M118 246H982"/>
+    <path d="M118 270H982"/>
+    <path d="M118 294H982"/>
+    <path d="M118 318H982"/>
+  </g>
+  <rect x="890" y="344" width="60" height="16" fill="#8d7a5a"/>
+  <path d="M896 344Q894 282 954 282" stroke="#8d7a5a" stroke-width="3"/>
+  <text x="868" y="325" fill="#5f5448" font-family="sans-serif" font-size="14" font-weight="700">현관도어</text>
+  <rect x="320" y="54" width="96" height="12" fill="#7f9aa0"/>
+  <text x="332" y="94" fill="#5f5448" font-family="sans-serif" font-size="14" font-weight="700">기본창</text>
+  <rect x="160" y="252" width="150" height="64" rx="4" fill="#e1d7c8" stroke="#6b6258" stroke-width="2"/>
+  <circle cx="188" cy="284" r="16" stroke="#6b6258" stroke-width="2"/>
+  <text x="192" y="244" fill="#5f5448" font-family="sans-serif" font-size="14" font-weight="700">싱크대</text>
+  <rect x="790" y="106" width="140" height="112" rx="4" fill="#e7e1d8" stroke="#6b6258" stroke-width="2"/>
+  <circle cx="896" cy="146" r="18" stroke="#6b6258" stroke-width="2"/>
+  <rect x="802" y="118" width="48" height="32" rx="4" stroke="#6b6258" stroke-width="2"/>
+  <text x="804" y="238" fill="#5f5448" font-family="sans-serif" font-size="14" font-weight="700">욕실</text>
 </svg>
diff --git a/supabase/migrations/202606060003_lock_customize_admin_policies.sql b/supabase/migrations/202606060003_lock_customize_admin_policies.sql
new file mode 100644
index 0000000..b475e08
--- /dev/null
+++ b/supabase/migrations/202606060003_lock_customize_admin_policies.sql
@@ -0,0 +1,17 @@
+DROP POLICY IF EXISTS "Authenticated users can manage customize models" ON customize_models;
+DROP POLICY IF EXISTS "Authenticated users can manage customize categories" ON customize_categories;
+DROP POLICY IF EXISTS "Authenticated users can manage customize options" ON customize_options;
+DROP POLICY IF EXISTS "Authenticated users can manage customize conflicts" ON customize_option_conflicts;
+DROP POLICY IF EXISTS "Authenticated users can manage customize included specs" ON customize_included_specs;
+DROP POLICY IF EXISTS "Authenticated users can manage customize consultations" ON customize_consultations;
+
+CREATE UNIQUE INDEX IF NOT EXISTS idx_customize_included_specs_global_key
+  ON customize_included_specs(key)
+  WHERE model_id IS NULL;
+
+COMMENT ON TABLE customize_models IS 'Public users can read active rows only. Admin mutations are performed through requireAdmin-protected server actions using the service role.';
+COMMENT ON TABLE customize_categories IS 'Public users can read active rows only. Admin mutations are performed through requireAdmin-protected server actions using the service role.';
+COMMENT ON TABLE customize_options IS 'Public users can read active rows only. Admin mutations are performed through requireAdmin-protected server actions using the service role.';
+COMMENT ON TABLE customize_option_conflicts IS 'Public users can read conflicts for active options only. Admin mutations are performed through requireAdmin-protected server actions using the service role.';
+COMMENT ON TABLE customize_included_specs IS 'Public users can read active rows only. Admin mutations are performed through requireAdmin-protected server actions using the service role.';
+COMMENT ON TABLE customize_consultations IS 'Public users can insert new consultation requests only. Reads, updates, and deletes are performed through requireAdmin-protected server actions using the service role.';

~~~

## Relevant File Excerpts

### submitCustomizeConsultation insert-only RLS path

~~~tsx
 330 |     return { success: false, message: parsed.error.issues[0]?.message ?? '입력값을 확인해주세요.' };
 331 |   }
 332 | 
 333 |   try {
 334 |     const admin = getSupabaseAdmin() as any;
 335 |     const catalog = await loadCatalog(admin, false);
 336 |     const estimate = calculateEstimate(catalog, parsed.data.modelId, parsed.data.selectedOptions);
 337 | 
 338 |     if (!estimate) {
 339 |       return { success: false, message: '선택한 모델을 확인해주세요.' };
 340 |     }
 341 | 
 342 |     const ids = selectedOptionIds(parsed.data.selectedOptions);
 343 |     if (hasConflict(catalog, ids)) {
 344 |       return { success: false, message: '동시에 선택할 수 없는 옵션이 포함되어 있습니다.' };
 345 |     }
 346 | 
 347 |     const validOptionIds = estimate.selectedOptions.map((option) => option.id);
 348 |     const selectedOptions: SelectedOptions = Object.fromEntries(
 349 |       Object.entries(parsed.data.selectedOptions).map(([categoryId, optionIds]) => [
 350 |         categoryId,
 351 |         optionIds.filter((id) => validOptionIds.includes(id)),
 352 |       ])
 353 |     );
 354 |     const configQuery = parsed.data.configQuery || encodeConfig(estimate.model.id, selectedOptions);
 355 |     const includedSpecs = catalog.includedSpecs.filter((spec) => !spec.modelId || spec.modelId === estimate.model.id);
 356 |     const snapshot = {
 357 |       version: 1,
 358 |       model: estimate.model,
 359 |       selectedOptions: estimate.selectedOptions,
 360 |       includedSpecs,
 361 |       optionTotal: estimate.optionTotal,
 362 |       estimatedTotal: estimate.estimatedTotal,
 363 |       consultOptionCount: estimate.consultOptionCount,
 364 |       selectedOptionsByCategory: selectedOptions,
 365 |       createdAt: new Date().toISOString(),
 366 |     };
 367 | 
 368 |     const consultationId = randomUUID();
 369 |     const supabase = await createClient();
 370 |     const { error } = await (supabase as any)
 371 |       .from('customize_consultations')
 372 |       .insert({
 373 |         id: consultationId,
 374 |         customer_name: parsed.data.customerName,
 375 |         phone: normalizePhone(parsed.data.phone),
 376 |         region: parsed.data.region,
 377 |         purchase_timeline: asText(parsed.data.purchaseTimeline),
 378 |         land_type: asText(parsed.data.landType),
 379 |         install_address: asText(parsed.data.installAddress),
 380 |         budget_range: asText(parsed.data.budgetRange),
 381 |         memo: asText(parsed.data.memo),
 382 |         status: '신규',
 383 |         selected_model_id: estimate.model.id,
 384 |         selected_option_ids: validOptionIds,
 385 |         estimated_total: estimate.estimatedTotal,
 386 |         config_query: configQuery,
 387 |         config_snapshot: snapshot,
 388 |       });
 389 | 
 390 |     if (error) throw error;
 391 | 
 392 |     revalidatePath('/admin/consultations');
 393 |     revalidatePath('/admin');
 394 | 
 395 |     return { success: true, message: '상담 요청이 접수되었습니다.', id: consultationId };
~~~

### FloorplanPreview base image rendering

~~~tsx
 441 | function FloorplanPreview({ model, selectedOptions }: { model: CustomizeModel; selectedOptions: CustomizeOption[] }) {
 442 |   const box = floorplanSize(model);
 443 |   const selectedLabels = selectedOptions.filter((option) => option.overlayLabelKo);
 444 |   const hasBaseImage = Boolean(model.floorplanImagePath);
 445 | 
 446 |   return (
 447 |     <div className="w-full max-w-[1100px]">
 448 |       <div className="mb-4 flex items-end justify-between gap-4">
 449 |         <div>
 450 |           <p className="text-sm font-bold text-[#8a806f]">선택 모델</p>
 451 |           <h1 className="text-2xl font-black text-[#2f3432] md:text-3xl">{model.nameKo}</h1>
 452 |         </div>
 453 |         <div className="text-right">
 454 |           <p className="text-sm font-bold text-[#8a806f]">기본가</p>
 455 |           <p className="text-lg font-black text-[#6b5a2b]">{formatModelStartPrice(model.basePrice)}</p>
 456 |         </div>
 457 |       </div>
 458 | 
 459 |       <div className="relative overflow-hidden rounded-lg border border-[#d8d0c3] bg-[#fbfaf7] shadow-sm">
 460 |         <svg viewBox="0 0 1000 420" className="aspect-[1000/420] w-full" data-testid="floorplan-canvas">
 461 |           <defs>
 462 |             <pattern id="floor-grid" width="24" height="24" patternUnits="userSpaceOnUse">
 463 |               <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#e4ddd1" strokeWidth="1" />
 464 |             </pattern>
 465 |           </defs>
 466 |           <rect width="1000" height="420" fill="#f5f1ea" />
 467 |           {hasBaseImage ? (
 468 |             <image
 469 |               data-testid="base-floorplan-image"
 470 |               href={model.floorplanImagePath ?? undefined}
 471 |               x="0"
 472 |               y="0"
 473 |               width="1000"
 474 |               height="420"
 475 |               preserveAspectRatio="xMidYMid meet"
 476 |             />
 477 |           ) : (
 478 |             <>
 479 |               <rect x={box.x} y={box.y} width={box.width} height={box.height} fill="#f8f4ec" stroke="#2f3432" strokeWidth="12" className="transition-all duration-[600ms]" />
 480 |               <rect x={box.x + 12} y={box.y + 12} width={box.width - 24} height={box.height - 24} fill="url(#floor-grid)" stroke="#bfb4a2" strokeWidth="2" className="transition-all duration-[600ms]" />
 481 |               <BasePlanObjects box={box} />
 482 |             </>
 483 |           )}
 484 | 
 485 |           <rect
 486 |             data-testid="model-footprint"
 487 |             x={box.x}
 488 |             y={box.y}
 489 |             width={box.width}
 490 |             height={box.height}
 491 |             fill="transparent"
 492 |             stroke="#2f3432"
 493 |             strokeWidth="6"
 494 |             className="transition-all duration-[600ms]"
 495 |           />
 496 | 
 497 |           {selectedOptions.map((option) => option.overlayImagePath ? (
 498 |             <image
 499 |               key={option.id}
 500 |               href={option.overlayImagePath}
 501 |               x="0"
 502 |               y="0"
 503 |               width="1000"
 504 |               height="420"
 505 |               opacity="0.88"
 506 |               className="transition-opacity duration-[250ms]"
 507 |             />
 508 |           ) : null)}
 509 | 
 510 |           {selectedLabels.map((option, index) => {
 511 |             const position = (PLAN_LABEL_POSITIONS[option.categoryKey] ?? PLAN_LABEL_POSITIONS.interior)(box, index);
 512 |             return (
 513 |               <g key={option.id} className="transition-all duration-[250ms]">
 514 |                 <rect x={position.x - 8} y={position.y - 19} width={Math.max(58, (option.overlayLabelKo?.length ?? 2) * 14 + 20)} height="30" rx="6" fill="#2f3432" />
 515 |                 <text x={position.x + 4} y={position.y + 1} fill="#fbfaf7" fontSize="15" fontWeight="700">
 516 |                   {option.overlayLabelKo}
 517 |                 </text>
 518 |               </g>
 519 |             );
 520 |           })}
 521 |         </svg>
 522 |       </div>
 523 |     </div>
 524 |   );
 525 | }
~~~

### Order modal test ids for UI submit smoke

~~~tsx
 650 |               {selectedOptions.map((option) => (
 651 |                 <div key={option.id} className="mt-2 flex justify-between gap-3 text-sm text-[#61594f]">
 652 |                   <span>{option.nameKo}</span>
 653 |                   <span className="font-semibold">{formatOptionPrice(option)}</span>
 654 |                 </div>
 655 |               ))}
 656 |             </div>
 657 |           </div>
 658 | 
 659 |           <div className="grid gap-4 md:grid-cols-2">
 660 |             <Field label="이름" required>
 661 |               <Input data-testid="consultation-name" className={inputClass} value={form.customerName} onChange={(event) => updateField('customerName', event.target.value)} />
 662 |             </Field>
 663 |             <Field label="연락처" required>
 664 |               <Input data-testid="consultation-phone" className={inputClass} value={form.phone} onChange={(event) => updateField('phone', event.target.value)} />
 665 |             </Field>
 666 |             <Field label="지역" required>
 667 |               <Input data-testid="consultation-region" className={inputClass} placeholder="경기도 양평군" value={form.region} onChange={(event) => updateField('region', event.target.value)} />
 668 |             </Field>
 669 |             <Field label="예상 구매 시기">
 670 |               <Select value={form.purchaseTimeline} onChange={(value) => updateField('purchaseTimeline', value)} options={PURCHASE_TIMELINES} />
 671 |             </Field>
 672 |             <Field label="설치할 장소 지목">
 673 |               <Select value={form.landType} onChange={(value) => updateField('landType', value)} options={LAND_TYPES} />
 674 |             </Field>
 675 |             <Field label="구매 예산">
 676 |               <Select value={form.budgetRange} onChange={(value) => updateField('budgetRange', value)} options={BUDGET_RANGES} />
 677 |             </Field>
 678 |             <Field label="설치 주소" className="md:col-span-2">
 679 |               <Input className={inputClass} value={form.installAddress} onChange={(event) => updateField('installAddress', event.target.value)} />
 680 |             </Field>
 681 |             <Field label="추가 메모" className="md:col-span-2">
 682 |               <Textarea className="min-h-24 rounded-lg border-gray-300 bg-[#fbfaf7] text-sm focus-visible:ring-[#b88b26]" value={form.memo} onChange={(event) => updateField('memo', event.target.value)} />
 683 |             </Field>
 684 |           </div>
 685 | 
 686 |           <div className="mt-6 flex flex-col gap-3 sm:flex-row">
 687 |             <Button data-testid="consultation-submit" className="h-12 flex-1 bg-[#2f3432] text-white hover:bg-[#1f2422]" disabled={isPending} onClick={onSubmit}>
 688 |               {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
 689 |               상담 요청
 690 |             </Button>
 691 |             <Button variant="outline" className="h-12 flex-1 border-[#cfc4b3] bg-[#fbfaf7]" onClick={onSaveQuote}>
 692 |               <Download className="h-4 w-4" />
 693 |               견적 저장
 694 |             </Button>
 695 |           </div>
 696 |         </div>
 697 |       </div>
 698 |     </div>
 699 |   );
 700 | }
 701 | 
 702 | function Field({ label, required, className, children }: { label: string; required?: boolean; className?: string; children: ReactNode }) {
 703 |   return (
 704 |     <div className={className}>
 705 |       <Label className="mb-2 block text-sm font-bold text-[#4f473d]">
 706 |         {label}
 707 |         {required && <span className="ml-1 text-[#a56f16]">*</span>}
 708 |       </Label>
 709 |       {children}
 710 |     </div>
~~~

### Playwright customize tests including UI submit cleanup

~~~tsx
   1 | import { expect, test } from '@playwright/test';
   2 | import { createClient } from '@supabase/supabase-js';
   3 | import { config as loadEnv } from 'dotenv';
   4 | 
   5 | loadEnv({ path: '.env.local' });
   6 | 
   7 | const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
   8 | const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
   9 | const canUseServiceRole = Boolean(supabaseUrl && serviceRoleKey);
  10 | const serviceClient = canUseServiceRole
  11 |   ? createClient(supabaseUrl!, serviceRoleKey!, { auth: { persistSession: false } })
  12 |   : null;
  13 | 
  14 | test.describe('Customize configurator', () => {
  15 |   test('desktop model and option flow updates estimated total and URL config', async ({ page }) => {
  16 |     await page.goto('/customize');
  17 |     await page.waitForLoadState('networkidle');
  18 | 
  19 |     await expect(page.getByRole('heading', { name: 'Compact 3x6' })).toBeVisible();
  20 |     await expect(page.getByText('₩27,900,000', { exact: true })).toBeVisible();
  21 |     await expect(page.getByTestId('base-floorplan-image')).toHaveAttribute('href', /dummy-base\.svg/);
  22 |     await expect(page.getByTestId('model-footprint')).toHaveAttribute('x', '400');
  23 |     await expect(page.getByTestId('model-footprint')).toHaveAttribute('width', '600');
  24 | 
  25 |     await page.getByRole('button', { name: /Standard 3x9/ }).click();
  26 |     await expect(page.getByRole('heading', { name: 'Standard 3x9' })).toBeVisible();
  27 |     await expect(page.getByText('₩34,900,000', { exact: true })).toBeVisible();
  28 |     await expect(page.getByTestId('model-footprint')).toHaveAttribute('x', '100');
  29 |     await expect(page.getByTestId('model-footprint')).toHaveAttribute('width', '900');
  30 | 
  31 |     await page.getByRole('button', { name: /적삼목 포인트/ }).click();
  32 |     await expect(page.getByText('₩37,100,000')).toBeVisible();
  33 | 
  34 |     await page.getByRole('button', { name: /태양광 패널/ }).click();
  35 |     await expect(page.getByText('상담').first()).toBeVisible();
  36 |     await expect(page).toHaveURL(/\/customize\?c=/);
  37 |   });
  38 | 
  39 |   test('order modal opens without submitting consultation', async ({ page }) => {
  40 |     await page.goto('/customize');
  41 |     await page.waitForLoadState('networkidle');
  42 | 
  43 |     await page.getByRole('button', { name: '주문하기' }).last().click();
  44 | 
  45 |     await expect(page.getByRole('heading', { name: '상담 요청' })).toBeVisible();
  46 |     await expect(page.getByText('상담 후 최종 확정')).toBeVisible();
  47 |     await expect(page.getByText('이름')).toBeVisible();
  48 |     await expect(page.getByText('연락처')).toBeVisible();
  49 |     await expect(page.getByText('지역')).toBeVisible();
  50 |   });
  51 | 
  52 |   test('consultation submission succeeds with insert-only RLS and stores snapshot', async ({ page }) => {
  53 |     test.skip(!serviceClient, 'Supabase service role env is required for consultation cleanup.');
  54 | 
  55 |     const uniquePhone = `010${Date.now().toString().slice(-8)}`;
  56 |     const uniqueName = `Codex E2E ${Date.now()}`;
  57 | 
  58 |     try {
  59 |       await page.goto('/customize');
  60 |       await page.waitForLoadState('networkidle');
  61 | 
  62 |       await page.getByRole('button', { name: '주문하기' }).last().click();
  63 |       await page.getByTestId('consultation-name').fill(uniqueName);
  64 |       await page.getByTestId('consultation-phone').fill(uniquePhone);
  65 |       await page.getByTestId('consultation-region').fill('테스트 지역');
  66 |       await page.getByTestId('consultation-submit').click();
  67 | 
  68 |       await expect(page.getByText('상담 요청이 접수되었습니다.')).toBeVisible({ timeout: 15000 });
  69 | 
  70 |       await expect.poll(async () => {
  71 |         const { count } = await serviceClient!
  72 |           .from('customize_consultations')
  73 |           .select('id', { count: 'exact', head: true })
  74 |           .eq('phone', uniquePhone);
  75 |         return count ?? 0;
  76 |       }, { timeout: 15000 }).toBe(1);
  77 | 
  78 |       const { data, error } = await serviceClient!
  79 |         .from('customize_consultations')
  80 |         .select('id, selected_model_id, estimated_total, config_snapshot')
  81 |         .eq('phone', uniquePhone)
  82 |         .single();
  83 | 
  84 |       expect(error).toBeNull();
  85 |       expect(data?.selected_model_id).toBe('compact-3x6');
  86 |       expect(data?.estimated_total).toBe(27900000);
  87 |       expect(data?.config_snapshot).toMatchObject({
  88 |         version: 1,
  89 |         estimatedTotal: 27900000,
  90 |       });
  91 |     } finally {
  92 |       await serviceClient?.from('customize_consultations').delete().eq('phone', uniquePhone);
  93 |     }
  94 |   });
  95 | 
  96 |   test('mobile option drawer is available before order CTA', async ({ page }) => {
  97 |     await page.setViewportSize({ width: 390, height: 844 });
  98 |     await page.goto('/customize');
  99 |     await page.waitForLoadState('networkidle');
 100 | 
 101 |     await page.getByRole('button', { name: '옵션 구성' }).click();
 102 | 
 103 |     const drawer = page.getByRole('dialog').filter({ hasText: '옵션 구성' });
 104 |     await expect(drawer).toBeVisible();
 105 |     await expect(drawer.getByRole('heading', { name: '외장' })).toBeVisible();
 106 |     await drawer.getByRole('button', { name: /적삼목 포인트/ }).click();
 107 |     await expect(page.getByText('₩30,100,000', { exact: true })).toBeVisible();
 108 |   });
 109 | });
 110 | 
~~~

### RLS tightening migration

~~~sql
   1 | DROP POLICY IF EXISTS "Authenticated users can manage customize models" ON customize_models;
   2 | DROP POLICY IF EXISTS "Authenticated users can manage customize categories" ON customize_categories;
   3 | DROP POLICY IF EXISTS "Authenticated users can manage customize options" ON customize_options;
   4 | DROP POLICY IF EXISTS "Authenticated users can manage customize conflicts" ON customize_option_conflicts;
   5 | DROP POLICY IF EXISTS "Authenticated users can manage customize included specs" ON customize_included_specs;
   6 | DROP POLICY IF EXISTS "Authenticated users can manage customize consultations" ON customize_consultations;
   7 | 
   8 | CREATE UNIQUE INDEX IF NOT EXISTS idx_customize_included_specs_global_key
   9 |   ON customize_included_specs(key)
  10 |   WHERE model_id IS NULL;
  11 | 
  12 | COMMENT ON TABLE customize_models IS 'Public users can read active rows only. Admin mutations are performed through requireAdmin-protected server actions using the service role.';
  13 | COMMENT ON TABLE customize_categories IS 'Public users can read active rows only. Admin mutations are performed through requireAdmin-protected server actions using the service role.';
  14 | COMMENT ON TABLE customize_options IS 'Public users can read active rows only. Admin mutations are performed through requireAdmin-protected server actions using the service role.';
  15 | COMMENT ON TABLE customize_option_conflicts IS 'Public users can read conflicts for active options only. Admin mutations are performed through requireAdmin-protected server actions using the service role.';
  16 | COMMENT ON TABLE customize_included_specs IS 'Public users can read active rows only. Admin mutations are performed through requireAdmin-protected server actions using the service role.';
  17 | COMMENT ON TABLE customize_consultations IS 'Public users can insert new consultation requests only. Reads, updates, and deletes are performed through requireAdmin-protected server actions using the service role.';
  18 | 
~~~

### 1000x420 seed base floorplan SVG excerpt

~~~svg
   1 | <svg width="1000" height="420" viewBox="0 0 1000 420" fill="none" xmlns="http://www.w3.org/2000/svg">
   2 |   <rect width="1000" height="420" fill="#f5f1ea"/>
   3 |   <rect x="100" y="60" width="900" height="300" rx="6" fill="#fbf7ef" stroke="#2f3432" stroke-width="12"/>
   4 |   <rect x="118" y="78" width="864" height="264" rx="3" fill="#f8f4ec" stroke="#c8bdab" stroke-width="2"/>
   5 |   <g stroke="#e3dccf" stroke-width="1">
   6 |     <path d="M142 78V342"/>
   7 |     <path d="M166 78V342"/>
   8 |     <path d="M190 78V342"/>
   9 |     <path d="M214 78V342"/>
  10 |     <path d="M238 78V342"/>
  11 |     <path d="M262 78V342"/>
  12 |     <path d="M286 78V342"/>
  13 |     <path d="M310 78V342"/>
  14 |     <path d="M334 78V342"/>
  15 |     <path d="M358 78V342"/>
  16 |     <path d="M382 78V342"/>
  17 |     <path d="M406 78V342"/>
  18 |     <path d="M430 78V342"/>
  19 |     <path d="M454 78V342"/>
  20 |     <path d="M478 78V342"/>
  21 |     <path d="M502 78V342"/>
  22 |     <path d="M526 78V342"/>
  23 |     <path d="M550 78V342"/>
  24 |     <path d="M574 78V342"/>
  25 |     <path d="M598 78V342"/>
  26 |     <path d="M622 78V342"/>
  27 |     <path d="M646 78V342"/>
  28 |     <path d="M670 78V342"/>
  29 |     <path d="M694 78V342"/>
  30 |     <path d="M718 78V342"/>
  31 |     <path d="M742 78V342"/>
  32 |     <path d="M766 78V342"/>
  33 |     <path d="M790 78V342"/>
  34 |     <path d="M814 78V342"/>
  35 |     <path d="M838 78V342"/>
  36 |     <path d="M862 78V342"/>
  37 |     <path d="M886 78V342"/>
  38 |     <path d="M910 78V342"/>
  39 |     <path d="M934 78V342"/>
  40 |     <path d="M958 78V342"/>
  41 |     <path d="M118 102H982"/>
  42 |     <path d="M118 126H982"/>
  43 |     <path d="M118 150H982"/>
  44 |     <path d="M118 174H982"/>
  45 |     <path d="M118 198H982"/>
  46 |     <path d="M118 222H982"/>
  47 |     <path d="M118 246H982"/>
  48 |     <path d="M118 270H982"/>
  49 |     <path d="M118 294H982"/>
  50 |     <path d="M118 318H982"/>
  51 |   </g>
  52 |   <rect x="890" y="344" width="60" height="16" fill="#8d7a5a"/>
  53 |   <path d="M896 344Q894 282 954 282" stroke="#8d7a5a" stroke-width="3"/>
  54 |   <text x="868" y="325" fill="#5f5448" font-family="sans-serif" font-size="14" font-weight="700">현관도어</text>
  55 |   <rect x="320" y="54" width="96" height="12" fill="#7f9aa0"/>
  56 |   <text x="332" y="94" fill="#5f5448" font-family="sans-serif" font-size="14" font-weight="700">기본창</text>
  57 |   <rect x="160" y="252" width="150" height="64" rx="4" fill="#e1d7c8" stroke="#6b6258" stroke-width="2"/>
  58 |   <circle cx="188" cy="284" r="16" stroke="#6b6258" stroke-width="2"/>
  59 |   <text x="192" y="244" fill="#5f5448" font-family="sans-serif" font-size="14" font-weight="700">싱크대</text>
  60 |   <rect x="790" y="106" width="140" height="112" rx="4" fill="#e7e1d8" stroke="#6b6258" stroke-width="2"/>
  61 |   <circle cx="896" cy="146" r="18" stroke="#6b6258" stroke-width="2"/>
  62 |   <rect x="802" y="118" width="48" height="32" rx="4" stroke="#6b6258" stroke-width="2"/>
  63 |   <text x="804" y="238" fill="#5f5448" font-family="sans-serif" font-size="14" font-weight="700">욕실</text>
  64 | </svg>
  65 | 
~~~

## Validation Output

~~~text
After cycle 1 MUST_FIX:
- npm run lint: PASS.
- npm run test: PASS; Vitest 2 files, 6 tests.
- npm run build: PASS; only Next middleware deprecation warning.
- npx playwright test: PASS; 11 chromium tests including UI consultation submit, service-role verify, cleanup.
- service-role count after UI submit test cleanup: customize_consultations=0.
Earlier Supabase validation remains: migrations 202606060002 and 202606060003 applied remotely, types/schema regenerated from remote, public active catalog reads pass, no public consultation rows visible.
~~~

## Remaining Known Risks

- Admin pages require authenticated admin session for live browser validation.
- Restored /bespoke emits Next Image sizes warnings from prior restored code.
- Next middleware deprecation warning predates this task.

## Review Instructions

Check only for remaining concrete blockers. If cycle 1 MUST_FIX feedback is sufficiently addressed and validation is adequate, return VERDICT: PASS. Only place required code changes under MUST_FIX.
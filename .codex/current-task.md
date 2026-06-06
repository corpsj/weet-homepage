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

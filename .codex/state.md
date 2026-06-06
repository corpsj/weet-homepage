# Codex State

## Active task

위트 `/bespoke` 복원, DB 기반 `/customize` 주문 컨피규레이터 신규 구축, 홈/support 전환, Supabase customize schema 적용, 관리자 주문 구성/상담 관리 구현.

## Current phase

complete

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
- GPT-5.5 Pro 2차 리뷰가 `VERDICT: PASS`를 반환.

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
- GPT-5.5 Pro review cycle 2 in Chrome: `VERDICT: PASS`
- final `npm run lint`
- final `npm run test`
- final `npm run build`
- final `npx playwright test`
- final service-role consultation count check: `customize_consultations=0`

## Current failures

- None currently. Latest lint, unit tests, build, Playwright, Supabase migration checks, type generation, schema dump, and remote consultation smoke test passed.

## Pro review cycles

2

## Last Pro verdict

PASS

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

Commit all intended changes except unrelated `.kiro/`, then push `zoo/customize-configurator` to GitHub.

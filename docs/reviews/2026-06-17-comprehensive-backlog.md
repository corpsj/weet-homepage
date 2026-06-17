# weet(위트) 홈페이지 종합 리뷰 — 수정 백로그

> **생성일** 2026-06-17 · **대상** https://www.we-et.com (공개 + 관리자 전체)
> **방법** 라이브 크롤(데스크톱 1440 / 모바일 390, 스크린샷 46장) + 코드 정적분석 10차원 + 반론 검증(adversarial)
> **규모** 원시 67건 → 병합 56 → **검증 통과 54건** (거짓양성 2건 제외)
> **증거팩** `.codex/qa/review-2026-06-17/{evidence.json,digest.json,shots/}`

## 요약

사이트는 전반적으로 기능은 동작하지만, 가장 핵심적인 전환 자산인 제품/프로젝트 이미지가 프로덕션에서 깨져 있어(F01, HTTP 402) 신뢰도와 매출 전환에 직접 타격을 주는 P0 상태입니다. 코드 품질과 기능 구현 수준은 양호하나, 가장 약한 축은 SEO(11건)와 접근성(12건)으로, 두 영역 모두 개별 결함이라기보다 구조적·횡단적 문제(host/canonical 불일치, og:image 누락, 키보드/스크린리더 미지원, prefers-reduced-motion 무시)가 누적된 형태입니다. 메타데이터 계층이 layout과 page 사이에서 서로 덮어쓰며 최적화를 무력화하는 패턴(F04, F18, F43)이 반복되고, 비-www host가 canonical/sitemap/robots 전반에 박혀 있어(F03) 검색 색인 효율을 떨어뜨립니다. 관리자 영역에는 데이터 전체 삭제 위험(F10)과 거짓 양성 헬스체크(F02)처럼 운영자를 오도할 수 있는 결함이 있습니다. 보안은 치명적 취약점은 없으나 CSP의 unsafe-inline(F31), 무력화된 레이트 리미터(F30), MIME-only 업로드 검증(F49)으로 방어가 표면적입니다. CustomizeConfigurator의 1994줄 god-file(F14)과 중복 Supabase 클라이언트/DnD 라이브러리(F37, F40) 등 유지보수 부채도 누적되어 있습니다. 종합 건강도는 '기능적이나 위태로움(functional-but-fragile)'으로, P0 이미지 문제와 SEO 기반 quick-win을 먼저 처리하면 단기간에 체감 품질을 크게 끌어올릴 수 있습니다.

### 심각도 분포

| 🔴 P0 | 🟠 P1 | 🟡 P2 | ⚪ P3 | 합계 |
|---|---|---|---|---|
| 1 | 6 | 30 | 17 | 54 |

### 카테고리 분포

| 카테고리 | 건수 |
|---|---|
| Accessibility | 12 |
| SEO | 11 |
| CodeQuality | 9 |
| UX/Funnel | 5 |
| Performance | 4 |
| Content/i18n | 4 |
| Security | 4 |
| Admin | 3 |
| Routing/Runtime | 2 |

## 핵심 리스크 (Top)

- F01 (P0) — 프로덕션 제품/프로젝트 이미지 전면 깨짐(Vercel 이미지 최적화 402). 공개 /products와 모든 관리자 제품 뷰에 영향, 매출·신뢰 직결 장애. next/image unoptimized 또는 커스텀 loader/Supabase render transform으로 즉시 우회.
- F10 (P1) — /admin/settings의 migrateProducts가 전 제품 삭제 후 하드코딩 목록으로 재시드. 오실행 시 카탈로그 전체 소실, 경고 문구도 오해 소지.
- F04+F03 (P1) — 전 페이지 og:image 누락 + 비-www canonical/sitemap/robots가 www로 307 리다이렉트. 소셜 미리보기 부재와 색인 host 불일치.
- F12 (P1) — 핵심 전환 경로(/products,/projects,/projects/[id],/support)가 강제 fully-dynamic로 캐싱 없음, 느린 TTFB로 이탈 유발.
- F06+F07 (P1) — 데스크톱 메가메뉴 키보드 도달 불가 + customize 상담 폼 label 미연결로 네비게이션·주요 전환 폼 접근성 차단.

## 반복 테마

- 메타데이터 계층 충돌: layout의 SEO 최적화를 page-level openGraph/metadata가 덮어쓰며 og:image와 description을 떨어뜨리는 패턴이 반복(F04, F18, F43, F17, F44).
- Host/URL 정합성 부재: 비-www host가 canonical·sitemap·robots·og:url에 일관되게 박혀 있어 단일 env(NEXT_PUBLIC_SITE_URL) 수정으로 다수 결함이 연쇄 해결(F03, F46).
- 접근성 기본기 결여: 키보드 도달성, label 연결, 랜드마크, focus trap, prefers-reduced-motion, 아이콘 버튼 접근명 등 WCAG 기본 항목이 전역적으로 누락(F06, F07, F08, F21, F22, F24, F25, F26, F27, F28, F47).
- 관리자 신뢰성·안전장치 부재: 파괴적 액션 보호 없음, 거짓 양성 헬스체크, 미저장 변경 보호 없음, native confirm/alert 혼용(F02, F10, F41, F42).
- 유지보수 부채와 중복: god-file, 하드코딩 hex, 중복 Supabase 클라이언트, 두 개의 DnD 라이브러리, as any 남용, 미사용 무거운 의존성(F13, F14, F37, F39, F40, F35).
- i18n 미완성과 브랜드/콘텐츠 불일치: KR/EN/ES 광고하나 ES 부재, 브랜드 표기 혼재, 메뉴 라벨 불일치, 영구 placeholder(F15, F19, F52, F53, F54).
- 런타임 견고성 부재: error/loading 경계 전무, 죽은 라우트/dead code(F32, F34, F50, F33).

## 권장 수정 순서

1. **F01** 🔴 Supabase product/project images broken in production (HTTP 402) via Vercel image optimizer _(P0, M)_
2. **F03** 🟠 All canonical/sitemap/robots URLs use non-www host (we-et.com) that 307-redirects to www (C4) _(P1, S)_
3. **F18** 🟡 /products page.tsx metadata overrides SEO-optimized layout.tsx, shipping thin title + 44-char description (C5) _(P2, S)_
4. **F17** 🟡 Solution subpage <title>s lack brand suffix (C5) _(P2, S)_
5. **F05** 🟡 /solution/design is a stray redirect to /solution/energy serving cloned Energy content/metadata (C2) _(P2, S)_
6. **F44** ⚪ Thin meta descriptions on /privacy (28 chars) and /terms (24 chars) (C5) _(P3, S)_
7. **F43** ⚪ Duplicate/conflicting metadata between customize layout and page _(P3, S)_
8. **F10** 🟠 `migrateProducts` admin action deletes ALL products then re-seeds a hardcoded list, with misleading warning _(P1, S)_
9. **F50** ⚪ Middleware admin-login exemption references a nonexistent /admin/login path (dead code) _(P3, S)_
10. **F34** ⚪ Empty /admin/bespoke directory produces a 404 admin route (dead artifact) _(P3, S)_
11. **F33** ⚪ Dead, broken InquiryForm component is unused but ships in the bundle _(P3, S)_
12. **F35** 🟡 Unused heavy dependency @react-pdf/renderer shipped (zero imports in app code) _(P2, S)_
13. **F51** ⚪ Login server action drops error feedback; failed logins show no message _(P3, S)_
14. **F09** 🟡 Anchor links from mega-menu over-scroll by ~100px on /bespoke and /company (scroll-mt-[180px] vs 80px header) _(P2, S)_
15. **F04** 🟠 og:image missing on every page because per-page openGraph blocks drop the root images array (C4) _(P1, M)_
16. **F21** 🟡 No skip-to-content link on any page _(P2, S)_
17. **F22** 🟡 Nested <main> landmarks (duplicate main on home/solution/support/products/projects) _(P2, S)_
18. **F25** 🟡 Icon-only buttons missing accessible names (modal close, carousel dots/arrows, scroll indicator) _(P2, S)_
19. **F28** 🟡 Low-contrast text: gray-300/gray-400 utility text on white in Header _(P2, S)_
20. **F47** ⚪ Mobile menu hamburger toggle missing aria-expanded; close button missing accessible name _(P3, S)_
21. **F08** ⚪ InquiryForm inputs use unassociated labels (no htmlFor/id) _(P3, S)_
22. **F02** 🟡 Admin product-readiness reports '이미지 정상' while images are broken (health check only tests URL presence) _(P2, M)_
23. **F12** 🟠 Public /products, /projects, /projects/[id], /support forced fully dynamic — no caching, slow TTFB _(P1, M)_
24. **F06** 🟠 Desktop mega menu submenu links are unreachable by keyboard (hover-only) _(P1, M)_
25. **F07** 🟠 Customize consultation form inputs have no programmatic label association _(P1, M)_
26. **F29** 🟡 Configurator consultation form lacks native required/aria-invalid; validation is toast-only _(P2, M)_
27. **F30** 🟡 Public submission rate limiter is per-instance in-memory and ineffective on Vercel serverless _(P2, M)_
28. **F31** 🟡 CSP allows 'unsafe-inline' for script-src, defeating XSS mitigation _(P2, M)_
29. **F32** 🟡 No error or loading boundaries anywhere in the App Router _(P2, M)_
30. **F41** 🟡 No unsaved-changes protection on admin forms and per-item draft editors _(P2, M)_
31. **F42** ⚪ Native confirm()/alert() used in ~10 admin files, contradicting the sonner/toast convention _(P3, M)_
32. **F49** ⚪ Image upload validates only client-supplied MIME type, no magic-byte check _(P3, S)_
33. **F48** ⚪ `catch (error: any)` with `error.message` access pattern repeated across cms-actions, leaking raw messages _(P3, S)_
34. **F13** 🟡 Supabase clients cast to `as any` everywhere, discarding fully-generated DB types _(P2, M)_
35. **F37** 🟡 Duplicate service-role Supabase client factories (lib/supabase.ts vs utils/supabase/service.ts) _(P2, M)_
36. **F38** 🟡 SupportEditor duplicates full CRUD/draft logic for FAQ and Notice in one 771-line component _(P2, M)_
37. **F40** 🟡 Two competing drag-and-drop libraries shipped; violates @dnd-kit standard in CLAUDE.md _(P2, M)_
38. **F39** 🟡 322 hardcoded hex color literals in CustomizeConfigurator instead of design tokens _(P2, M)_
39. **F36** 🟡 Noto Sans KR loaded with only 'latin' subset and 3 weights — Korean glyphs unpreloaded, fallback flash _(P2, M)_
40. **F20** 🟡 Project detail pages: no canonical, no per-project og:image, force-dynamic, excluded from sitemap _(P2, M)_
41. **F45** ⚪ No BreadcrumbList structured data on deep pages _(P3, M)_
42. **F46** ⚪ Sitemap uses build-time lastModified for all routes and omits dynamic content _(P3, M)_
43. **F53** 🟡 Header KO 'SOLUTION' submenu labels do not match the solution pages' own nav chips _(P2, S)_
44. **F52** 🟡 Brand spelling is inconsistent across the site (weet / WEET / Weet / weet:)) _(P2, M)_
45. **F55** ⚪ Primary CTA labeled '주문하기' (Order) leads to a consultation configurator, not a purchase _(P3, S)_
46. **F56** ⚪ 404 not-found page hover style uses primary-dark on a black button; no recovery links _(P3, S)_
47. **F54** ⚪ Permanent 'video coming soon' placeholder shipped on the homepage VideoSection _(P3, S)_
48. **F24** 🟡 ImageModal and CrewModal are not exposed as dialogs and lack focus trap / focus restoration / Escape (Crew) _(P2, M)_
49. **F26** 🟡 Auto-rotating hero carousel has no pause control and no aria-live region _(P2, M)_
50. **F27** 🟡 framer-motion animations ignore prefers-reduced-motion site-wide (no CSS fallback) _(P2, M)_
51. **F23** ⚪ /customize flow has no landmarks (no main/header/nav) and no way back to site nav _(P3, S)_
52. **F14** 🟡 CustomizeConfigurator.tsx is a 1994-line god-file with ~25 components and 14 useState in the main component _(P2, L)_
53. **F15** 🟡 Language selector advertises KR/EN/ES but only KO/EN exist, and core flows stay Korean under EN _(P2, L)_
54. **F19** 🟡 No hreflang / alternates.languages despite KR/EN language switcher _(P2, L)_

## 추가 점검 권장 영역 (이번 리뷰 범위 밖)

- 라이브 evidence는 2026-06-17 단일 시점 스냅샷으로 수집됨 — F01 이미지 402는 Vercel 최적화 쿼터/빌링 한도 문제일 수 있어, 코드 수정 외에 Vercel 플랜/쿼터 자체를 확인하는 후속 패스 필요.
- Supabase RLS 정책과 공개 폼(상담/문의)의 서버측 권한·스팸 방어는 클라이언트 코드만으로 검증 불가 — DB 정책 레벨 보안 감사 별도 필요(F30 in-memory 리미터 외 실제 RLS 검토).
- 성능은 TTFB/CSP/번들 위주로 다뤘으나, 실제 Core Web Vitals(LCP/CLS/INP) 필드 측정과 이미지 가중치(F01 해결 후 재측정)는 후속 정량 패스가 필요.
- i18n는 EN 경로 누락(F15) 위주로만 확인 — EN 콘텐츠의 실제 번역 정확도/누락 범위와 ES 제거 또는 구현 결정은 콘텐츠 차원 후속 검토 필요.
- 관리자 워크플로우(드래프트, 낙관적 업데이트 롤백, 동시 편집)의 실제 데이터 정합성은 정적 리뷰로 한계 — 실거래 시나리오 통합 테스트로 검증 권장.
- 결제/주문 플로우 부재(F55: '주문하기'가 상담 컨피규레이터로 연결)가 의도된 비즈니스 모델인지, 향후 실제 결제 도입 계획이 있는지 제품 의사결정 확인 필요.

---

## 백로그 (심각도순)


### 🔴 P0

#### F01 · `Performance` · Supabase product/project images broken in production (HTTP 402) via Vercel image optimizer  _(공수 M)_

- **영향 범위**: /products (public), /projects/[id], all /admin product & CMS views
- **파일**: `app/products/ProductsPageClient.tsx:615`, `app/products/ProductsPageClient.tsx:703`, `app/products/ProductsPageClient.tsx:771`, `app/products/ProductsPageClient.tsx:802`, `components/admin/products/ProductGrid.tsx:68`, `components/admin/products/ProductGrid.tsx:154`, `components/admin/ProductForm.tsx:309`, `components/admin/media/ImageUpload.tsx:143`, `components/admin/cms/MainCmsClient.tsx:627`, `app/projects/[id]/page.tsx:98`, `app/projects/[id]/page.tsx:116`, `next.config.ts:67`
- **문제**: Supabase-hosted product/project images (already .webp) are rendered with plain next/image (no unoptimized, no custom loader, no onError fallback), so every request goes through Vercel's /_next/image optimizer, which returns HTTP 402 (OPTIMIZED_IMAGE_REQUEST_PAYMENT_REQUIRED) because the image-optimization quota is exhausted. Raw Supabase .webp returns 200. Result: product images are BROKEN on public /products (digest imgBroken 3 desktop / 8 mobile, consoleErr 3/8 — visually nearly all cards show gray placeholder boxes with leaking alt text) and across /admin/products (12/12 broken), /admin/main (11/11 broken), ProductForm/ImageUpload previews, MainCmsClient product picker, and /projects/[id] hero/gallery. This is the single most visible defect on the site — the core product catalog looks broken. The working pattern already exists in CustomizeConfigurator.tsx:967,1608 (unoptimized + onError), confirming the team knows the fix.
- **증거**: digest.json /products desktop imgBroken:3 consoleErr:3, mobile imgBroken:8/8; evidence.json admin walk /admin/products imgBrokenCount=12/12 (all '402'), /admin/main 11/11; ProductsPageClient.tsx Images at 615/703/771/802 lack unoptimized; ProductGrid.tsx:71,157 lack unoptimized; CustomizeConfigurator.tsx:967,1608 use unoptimized+onError and do NOT 402; shots/products_desktop.png, products_mobile.png, admin_products_admin.png show gray boxes.
- **제안 수정**: Stop routing already-optimized Supabase .webp images through Vercel's paid optimizer. Cleanest: add a custom next/image loaderFile in next.config.ts scoped to *.supabase.co hosts that uses Supabase Storage render/image transform (/storage/v1/render/image/public/...?width=...) so responsive resizing is preserved; OR add unoptimized to the Supabase-sourced <Image> instances (thumbnails are small webp, optimization adds little). Apply to ProductsPageClient.tsx (~615 main, ~703 floorplan, ~771 gallery, ~802 thumbnails), ProductGrid.tsx (71/154, 157), ProductForm.tsx:309, ImageUpload.tsx:143, MainCmsClient.tsx:627, and app/projects/[id]/page.tsx hero/gallery. Add an onError fallback to the existing '제품 사진 준비 중' placeholder so future broken srcs degrade gracefully. Separately raise/clear the Vercel image-optimization quota.
- **검증·수정안 보강**: Fix is correct and durable. Root cause verified: next.config.ts (lines 67-90) defines only remotePatterns with NO loaderFile and NO global unoptimized, so every Supabase-hosted <Image> renders through Vercel's /_next/image optimizer, which 402s once the optimization quota is exhausted. All cited <Image> instances render Supabase image_url/floorPlan/gallery sources with plain next/image (fill, sizes) and no unoptimized, no custom loader, no onError. Two valid remediation paths: (1) custom loaderFile in next.config.ts scoped to *.supabase.co using Supabase Storage render/image transform (/storage/v1/render/image/public/...?width=) — best, preserves responsive resizing while bypassing the paid Vercel optimizer; or (2) add unoptimized to each Supabase-sourced <Image> — simpler, fine for small thumbnails but loses responsive resizing on the large /products hero and /projects hero/gallery, so prefer the loader for those. One caveat on the proposed fix's stated justification: the cited 'team already knows the fix' example (CustomizeConfigurator.tsx:963-971) uses unoptimized on a LOCAL /images/customize/... source, not a Supabase source, so it does not itself prove unoptimized avoids the 402 for Supabase — but the underlying mechanism (any unoptimized image skips /_next/image entirely) is correct and applies equally to Supabase URLs. Also add onError fallback to the existing '제품 사진 준비 중'/'이미지 점검 필요' placeholders for graceful degradation. Note: clearing/raising the Vercel image-optimization quota alone is a temporary band-aid that will recur as traffic grows; the code change (loader/unoptimized) is the durable fix and should be primary.
- **검증 결과**: confirmed


### 🟠 P1

#### F06 · `Accessibility` · Desktop mega menu submenu links are unreachable by keyboard (hover-only)  _(공수 M)_

- **영향 범위**: Header / global navigation (all public pages, desktop)
- **파일**: `components/layout/Header.tsx:262`, `components/layout/Header.tsx:267`, `components/layout/Header.tsx:329`, `components/layout/Header.tsx:350`
- **문제**: The desktop mega menu in Header.tsx opens exclusively on mouse hover (onMouseEnter on nav and per-item handleMenuHover; submenu rendered only when showMegaMenu is true). There is no onFocus handler or keyboard mechanism to open the dropdown. Keyboard-only and screen-reader users can tab to the 6 top-level links but can never reach the ~30 submenu links (e.g. /modular#factory-precision, /solution/cctv, /company#crew). The active-state highlight is also driven purely by hover (activeMenu), so focus gives no visual indication. Blocks keyboard access to a large part of the primary navigation. WCAG 2.1.1, 2.4.3.
- **증거**: Header.tsx nav onMouseEnter={handleMegaMenuEnter} (264), per-item onMouseEnter (270); mega menu gated on showMegaMenu (329) set true only by mouse handlers (181-195). No onFocus anywhere in the file.
- **제안 수정**: Make the mega menu open on focus as well as hover: add onFocus/onBlur (or focus-within) handling so showMegaMenu/activeMenu update when a top-level link receives focus, and keep the submenu in the DOM/focusable while focus is within the group. Move the active-highlight to also trigger on focus-visible (group-focus-within). Add aria-haspopup and aria-expanded to the top-level triggers.
- **검증·수정안 보강**: Fix is correct and safe in direction. The mega menu's submenu DOM is entirely gated on showMegaMenu (line 329), which is only set true by mouse handlers (handleMegaMenuEnter line 181, handleMenuHover line 192) — so opening it on focus is the right root-cause fix. Recommended concrete approach: wrap the desktop nav group and dropdown so they share state, and (a) add onFocus on the nav group (or focus-within via CSS on a wrapping element) to set showMegaMenu/activeMenu, (b) add onBlur that checks relatedTarget is outside the group before closing so focus can move INTO the submenu while it stays mounted, (c) drive the active-highlight bar (line 279) with focus too — e.g. group-focus-within: classes or track a focusedMenu state alongside activeMenu, and the submenu underline (line 357) should use focus-visible: in addition to group-hover:. A pure CSS focus-within approach is cleanest since it keeps the submenu open whenever any descendant link is focused without JS blur-timing bugs. Note: the handleMegaMenuLeave guard (innerWidth >= 1024) is keyed to lg but the menu is xl:-gated — pre-existing inconsistency, not part of this fix but worth aligning. Minor caveat on the aria suggestion: the top-level triggers are navigable <Link> anchors (line 272), not buttons; aria-haspopup/aria-expanded on a navigating anchor is acceptable but secondary to fixing actual focus reachability. Effort M is accurate.
- **검증 결과**: confirmed

#### F07 · `Accessibility` · Customize consultation form inputs have no programmatic label association  _(공수 M)_

- **영향 범위**: /customize consultation/quote form
- **파일**: `components/customize/CustomizeConfigurator.tsx:1843`, `components/customize/CustomizeConfigurator.tsx:1900`, `components/customize/CustomizeConfigurator.tsx:1930`, `components/ui/label.tsx:6`, `components/ui/input.tsx:6`
- **문제**: The customize configurator's consultation/quote form (the site's primary lead-gen flow) renders inputs via a Field wrapper whose Label only wraps a text <span> and sits as a SIBLING of the input, with no htmlFor/id pairing. The Label and Input components pass through no id. So name/phone/region/installAddress inputs and the Select dropdowns (timeline, land type, budget) have NO accessible name; AT users hear only 'edit text'/'combo box'. Affects the most important conversion form. WCAG 1.3.1, 3.3.2, 4.1.2.
- **증거**: Field renders <Label><span>{label}</span></Label> then {children} as sibling (CustomizeConfigurator.tsx 1914-1925); Input usages at 1844/1847/1850 have only data-testid, no id; Select at 1931 has a bare <select> with no id/aria-label.
- **제안 수정**: Give each Field a generated id (useId) and pass it to both the Label (htmlFor) and the child input via cloneElement or an explicit id prop on Input/Select/Textarea. Alternatively wrap the input inside the <label>. The native <select> in the Select component also needs an associated label/id and aria-label fallback.
- **검증·수정안 보강**: Fix is correct and safe. Field should call useId() and pass the id to Label (htmlFor) and to the child input. Because Input/Textarea spread {...props} and the native <select> can accept id, passing an explicit id via React.cloneElement(children, { id }) works cleanly. The simpler/safer alternative is to wrap the input inside the <label> element (Label already renders a real <label>), avoiding cloneElement entirely — recommend this for the text Inputs and Textarea. For the Select component, forward the id to its inner <select> (add an optional id prop) and keep an aria-label fallback. Also recommend adding aria-required to the required fields. No part of the fix is already done — confirmed no useId/htmlFor/aria-label on any of these inputs.
- **검증 결과**: confirmed

#### F10 · `Admin` · `migrateProducts` admin action deletes ALL products then re-seeds a hardcoded list, with misleading warning  _(공수 S)_

- **영향 범위**: /admin/settings
- **파일**: `app/actions/migration-actions.ts:270`, `app/actions/migration-actions.ts:276`, `app/admin/settings/page.tsx:63`, `app/admin/settings/page.tsx:72`, `app/admin/settings/page.tsx:64`, `app/admin/settings/page.tsx:178`
- **문제**: app/actions/migration-actions.ts:270-302 is a one-time seed script still wired into the live admin UI (app/admin/settings/page.tsx:72, behind a 'Migration' button). migrateProducts first runs .delete().neq('id', ...) to delete every row in products, then inserts a hardcoded 13-product array. The confirm dialog tells the admin this 'may create DUPLICATE data' — but the action actually DESTROYS all existing admin-managed products and replaces them with stale hardcoded content. An admin expecting an idempotent import will wipe production data. Also contains production console.log debug (273,286,297) and insert(product as any) (292).
- **증거**: migration-actions.ts:278 .delete().neq(...) deletes all rows before inserting hardcoded list; settings/page.tsx:64 confirm text says 'duplicate data' not 'deletes all'.
- **제안 수정**: Remove the migration button and handleMigration from app/admin/settings/page.tsx, and delete app/actions/migration-actions.ts (referenced only from the settings page). If a one-time seed is still needed, move it to a non-UI script under scripts/ or a guarded SQL migration. At minimum, correct the confirm copy to state it deletes all existing products and remove the console.log lines.
- **검증·수정안 보강**: Correct and safe. grep confirms migrateProducts/migration-actions is referenced ONLY from app/admin/settings/page.tsx (import line 4, call line 72), so deleting app/actions/migration-actions.ts and removing handleMigration + the button has no other call sites and breaks nothing. The seed data is also stale (hardcoded local /images/... paths, line 12 etc.; production product images are Supabase-hosted per C1), so re-seeding would actively corrupt current data. Recommend full removal; if a one-time seed is ever needed, move productsData to a guarded scripts/ file. At minimum the confirm copy (page.tsx:64) and the panel description (page.tsx:178-180) must change from 'duplicate data' to 'deletes ALL existing products', and drop console.log at 273/286/297 plus the insert(product as any) cast at 292.
- **검증 결과**: confirmed

#### F12 · `Performance` · Public /products, /projects, /projects/[id], /support forced fully dynamic — no caching, slow TTFB  _(공수 M)_

- **영향 범위**: /products, /projects, /projects/[id], /support
- **파일**: `app/products/page.tsx:5`, `app/projects/page.tsx:11`, `app/projects/[id]/page.tsx:9`, `app/support/page.tsx:26`, `app/actions/product-actions.ts:21`, `lib/products.ts:5`
- **문제**: app/products/page.tsx (line 5), app/projects/page.tsx (11), app/projects/[id]/page.tsx (9), and app/support/page.tsx (26) all set export const dynamic='force-dynamic'. This disables the full route cache and re-runs the Supabase query on EVERY request, with no ISR. Yet product mutations already call revalidatePath('/products') (product-actions.ts:21,39,55), so content only changes on admin edits — a perfect fit for ISR. The home page correctly uses revalidate=300 (app/page.tsx:24). The forced-dynamic pages show the highest load times: /products 1546ms, /projects 1498ms, /support 1850ms (desktop).
- **증거**: digest.json desktop load: /products 1546, /projects 1498, /support 1850 ms vs /solution 325, /bespoke 604. force-dynamic at cited lines; revalidatePath('/products') at product-actions.ts:21,39,55; app/page.tsx:24 uses revalidate=300.
- **제안 수정**: Remove export const dynamic='force-dynamic' from the four pages and replace with export const revalidate=300 (or similar). Since admin mutations already revalidatePath these routes, edits propagate immediately while normal visitors get cached HTML. Verify support data fetching has matching revalidatePath calls in its admin actions before flipping it.
- **검증·수정안 보강**: Fix direction is correct and the four pages are genuinely good ISR candidates — replace `export const dynamic='force-dynamic'` with `export const revalidate=300`. Revalidation coverage is mostly already in place: /products (product-actions.ts:21,39,55,73), /projects (project-actions.ts:60,78,95 + gallery-actions.ts:27), /support (faq-actions.ts:53/74/93/112 + notice-actions.ts:46/67/86). Settings edits use `revalidatePath('/', 'layout')` (settings-actions.ts:60), which covers /support and /projects since both read getSiteSettings — so settings-driven content stays fresh. ONE GAP THE FIX MUST CLOSE: app/projects/[id]/page.tsx reads a single project, but project-actions.ts only revalidates '/projects' (the list) and '/admin/projects/${id}' — it never calls revalidatePath(`/projects/${id}`). If that detail page is switched to ISR, an admin edit to a project will leave the public detail page stale for up to the revalidate window. Add `revalidatePath(\`/projects/${id}\`)` to updateProject (and delete, for the 404 path) before/when flipping the detail page. Everything else propagates immediately. Recommend revalidate values: 300s is fine; could go higher since these are admin-driven. Low-risk change overall.
- **검증 결과**: confirmed

#### F03 · `SEO` · All canonical/sitemap/robots URLs use non-www host (we-et.com) that 307-redirects to www (C4)  _(공수 S)_

- **영향 범위**: All public pages (canonical, og:url, sitemap, robots)
- **파일**: `.env.local:9`, `app/layout.tsx:12-18 (metadataBase IIFE), app/layout.tsx:32-33 (canonical "/"), app/layout.tsx:51 (og url "/")`, `app/sitemap.ts:3-9 (IIFE), app/sitemap.ts:37 (url uses siteUrl.origin)`, `app/robots.ts:3-9 (IIFE), app/robots.ts:20-21 (sitemap+host use siteUrl.origin)`, `app/customize/page.tsx:50 (hardcoded https://www.we-et.com — inconsistency)`
- **문제**: NEXT_PUBLIC_SITE_URL is set to 'https://we-et.com' (non-www), but production serves on https://www.we-et.com and the non-www host 307-redirects to www. This single env value feeds metadataBase (app/layout.tsx:12-14), every rel=canonical, og:url, sitemap entry URLs, robots.txt Host, and the sitemap reference. Verified live: every page canonical is https://we-et.com/*. Pointing canonicals at a host that immediately redirects sends a contradictory signal to search engines, splits link equity, and the robots Host directive names the non-preferred host. The customize Product JSON-LD (app/customize/page.tsx:50) hardcodes the correct www host, so the site is internally inconsistent.
- **증거**: .env.local:9 NEXT_PUBLIC_SITE_URL='https://we-et.com'; consumed app/layout.tsx:14, app/sitemap.ts:5, app/robots.ts:5. Live curl canonical=https://we-et.com (redirects to www). digest.json canon=https://we-et.com/* for all 16 public pages.
- **제안 수정**: Decide on the canonical host (www is what production serves) and set NEXT_PUBLIC_SITE_URL='https://www.we-et.com' in the Vercel/production environment (and .env.local). This propagates to metadataBase, all canonicals, og:url, sitemap.xml, and robots Host with no code change. Optionally add a guard so the value never silently falls back to localhost in prod.
- **검증·수정안 보강**: Fix is correct and safe. Setting NEXT_PUBLIC_SITE_URL='https://www.we-et.com' in the Vercel production env (and mirroring in .env.local) propagates through metadataBase, all relative canonicals (canonical:"/"), openGraph.url, every sitemap entry (siteUrl.origin), and robots sitemap+host with zero code change. This is verified by tracing the IIFEs in all three files — they all read the same single env var. Two refinements worth adding to the backlog: (1) After the change, also fix app/customize/page.tsx:50 so the hardcoded JSON-LD url derives from siteOrigin/the env var rather than a literal, otherwise it will silently diverge again if the host ever changes (currently it happens to be correct only because someone hardcoded www). (2) The optional prod guard suggestion is good — currently all three IIFEs silently fall back to http://localhost:3000 on a missing/malformed env var, which would emit localhost canonicals in production; a build-time assert when NODE_ENV/VERCEL_ENV is production prevents that footgun. The local .env.local edit alone does NOT fix production — the load-bearing change is the Vercel env var; the proposedFix correctly states this.
- **검증 결과**: confirmed

#### F04 · `SEO` · og:image missing on every page because per-page openGraph blocks drop the root images array (C4)  _(공수 M)_

- **영향 범위**: All public pages (Open Graph social previews)
- **파일**: `app/layout.tsx:55-66`, `app/page.tsx:35-40`, `app/products/page.tsx:13-17`, `app/solution/layout.tsx:10-18`, `app/bespoke/layout.tsx:10-18`, `app/modular/layout.tsx:10-18`, `app/company/layout.tsx:10-18`, `app/customize/page.tsx:15-20`, `app/privacy/page.tsx:10-14`, `app/terms/page.tsx:10-14`, `app/projects/[id]/page.tsx:27-31`
- **문제**: The root layout defines openGraph.images = [/OG_LOGO.webp] (app/layout.tsx:55-60) and twitter.images (line 66). But every page/layout that sets its own openGraph block (home, products, solution, solution/*, bespoke, modular, company, customize, projects, privacy, terms, projects/[id]) provides only url/title/description and omits images. In Next.js, a child openGraph object replaces the parent field-by-field, and og:image is NOT inherited when the child defines openGraph without images. Verified live: home page has NO <meta property=og:image> (only twitter:image survives, defined only at root). digest.json confirms ogImg='n' for all 16 public pages. Social/chat shares render with no preview image.
- **증거**: Live curl home: twitter:image present but og:image absent. digest.json ogImg='n' on all public pages. Root images app/layout.tsx:55-60,66; child openGraph blocks without images at app/page.tsx:35-40, app/products/page.tsx:13-17, app/solution/layout.tsx:11-16, app/bespoke/layout.tsx:10-15, app/modular/layout.tsx:10-15, app/company/layout.tsx:10-15, app/customize/page.tsx:15-20, app/projects/[id]/page.tsx:27-31.
- **제안 수정**: Centralize via a buildMetadata() helper in lib that always spreads the default images into openGraph (and twitter.images), OR add images: ['/OG_LOGO.webp'] to each openGraph block. For project detail pages, use the project hero image as og:image for unique previews.
- **검증·수정안 보강**: Correct and safe. Next.js merges metadata shallowly per top-level field, so a child openGraph object fully replaces the parent's (images not inherited) — confirmed both by reading every child block and empirically by digest.json (32/32 ogImg='n'). Recommended: a centralized buildMetadata() helper in lib that always spreads the default images into openGraph (and, importantly, into twitter — see below), so future pages can't regress. metadataBase is set (app/layout.tsx:26) so relative '/OG_LOGO.webp' resolves to an absolute URL fine. For projects/[id], using getProjectHeroImage(project) as og:image for unique previews is a good enhancement (helper already imported in that file at line 7). One addition the fix should cover: pages that redefine `twitter` with only `card` (app/solution/layout.tsx:16-18, app/bespoke/layout.tsx:16-18, app/modular/layout.tsx:16-18, app/company/layout.tsx:16-18) ALSO drop the root twitter.images by the same shallow-merge rule — so the helper should restore twitter.images too, not just openGraph.images.
- **검증 결과**: confirmed


### 🟡 P2

#### F21 · `Accessibility` · No skip-to-content link on any page  _(공수 S)_

- **영향 범위**: Global (all pages)
- **파일**: `components/layout/ClientLayout.tsx:43`, `app/layout.tsx:178`
- **문제**: There is no skip navigation link anywhere. Keyboard users must tab through the logo, mobile order CTA, the entire desktop nav, social links, language toggle and primary CTA before reaching page content on every page load. WCAG 2.4.1 (Bypass Blocks).
- **증거**: grep for skip|Skip to|main-content|#main across app/layout.tsx and components/layout returned no matches; ClientLayout main has no id (line 43).
- **제안 수정**: Add a visually-hidden-until-focused 'Skip to content' anchor as the first focusable element in ClientLayout (an <a href='#main'> with sr-only + focus:not-sr-only styles) and give the <main> element id='main' and tabIndex={-1}.
- **검증·수정안 보강**: Sound and safe. Add the skip link as the first focusable element. Best placement: inside ClientLayout's non-admin return (right before <Header /> at line 42), as <a href="#main" className="sr-only focus:not-sr-only ...">본문 바로가기</a>, then give the <main> at line 43 id="main" tabIndex={-1}. Two caveats to respect: (1) Header is a client component rendered first, so the skip <a> must precede it in DOM order to actually be the first tab stop. (2) Several pages render their OWN nested <main> (app/page.tsx:132, app/solution/page.tsx:203, app/products/ProductsPageClient.tsx:542, etc.), so attaching the id to ClientLayout's outer <main> is correct (it is the stable wrapper) but creates a nested-landmark situation; ideally the inner page <main>s should become <div>/<section> to avoid duplicate main landmarks — minor and optional. Use Korean label for the KR site. The admin/configurator early-return branches have no <main> and are out of scope, which is fine.
- **검증 결과**: confirmed

#### F22 · `Accessibility` · Nested <main> landmarks (duplicate main on home/solution/support/products/projects)  _(공수 S)_

- **영향 범위**: Home, solution, support, products, projects
- **파일**: `components/layout/ClientLayout.tsx:43`, `app/page.tsx:132`, `app/solution/page.tsx:203`, `app/support/page.tsx:148`, `app/products/ProductsPageClient.tsx:542`, `app/projects/page.tsx:85`, `app/projects/[id]/page.tsx:61`, `components/solution/SolutionTemplate.tsx:69`
- **문제**: ClientLayout.tsx wraps all non-admin/non-customize content in a <main> (line 43). Several page components ALSO render their own <main> inside that wrapper (app/page.tsx:132, app/solution/page.tsx:203, app/support/page.tsx:148, ProductsPageClient.tsx:542, app/projects/page.tsx:85, app/projects/[id]/page.tsx:61, SolutionTemplate.tsx:69). Two nested main landmarks per page is invalid (only one main per document) and confuses screen-reader landmark navigation.
- **증거**: grep '<main' shows ClientLayout.tsx:43 plus inner mains at the cited lines — all children of ClientLayout's main.
- **제안 수정**: Pick one location for <main>. Simplest: change the inner page <main> elements to <div>/<section> so the single ClientLayout <main> remains the document landmark. Give ClientLayout's main id='main' for the skip link.
- **검증·수정안 보강**: Correct and safe. Verified ClientLayout.tsx:43 renders the single wrapper <main> for all non-admin/non-customize routes (root app/layout.tsx:180 wraps {children} in ClientLayout). Every cited inner <main> (app/page.tsx:132, app/solution/page.tsx:203, app/support/page.tsx:148, ProductsPageClient.tsx:542, app/projects/page.tsx:85, app/projects/[id]/page.tsx:61, SolutionTemplate.tsx:69) sits inside that wrapper, producing two nested <main> landmarks — invalid HTML (one main per document) and confusing for AT landmark nav. Fix: convert the inner <main> elements to <div> (NOT <section>, since these are generic styled containers carrying min-h-screen/bg/text classes and have no accessible name — a nameless <section> would create an unhelpful region landmark). Keep ClientLayout's <main> as the sole landmark and add id="main" so a future skip link can target it. No skip link currently references a main id (only an unrelated customize 'skip-to-review' data-testid), so adding id="main" is non-breaking. Note SolutionTemplate is shared by 4 subroutes (cctv/energy/network/iot), so fixing that one file covers all four.
- **검증 결과**: confirmed

#### F24 · `Accessibility` · ImageModal and CrewModal are not exposed as dialogs and lack focus trap / focus restoration / Escape (Crew)  _(공수 M)_

- **영향 범위**: Company gallery image modal, crew bio modal
- **파일**: `components/ui/ImageModal.tsx`, `components/ui/CrewModal.tsx`
- **문제**: Both modals render a portal overlay without role='dialog', aria-modal='true', or an accessible name. Neither traps focus inside the dialog (Tab moves to background content) nor restores focus to the trigger on close. CrewModal additionally has NO Escape-key handler (ImageModal handles Escape). On open, focus is not moved into the dialog. WCAG 2.1.2, 2.4.3, 4.1.2.
- **증거**: ImageModal root motion.div (104) has no role/aria-modal/aria-label; CrewModal root div (52) likewise; CrewModal useEffect (22-31) only sets body overflow, no Escape listener; neither modal moves/restores focus.
- **제안 수정**: Add role='dialog' aria-modal='true' and aria-labelledby pointing at the title (ImageModal h2 at 179, CrewModal h2 at 144) to each modal root. On open, move focus to the dialog/close button and trap Tab; on close, restore focus to the opener. Add an Escape keydown handler to CrewModal (mirror ImageModal lines 45-46).
- **검증·수정안 보강**: Fix is correct and safe. Adding role='dialog' aria-modal='true', focus move-in, Tab focus trap, focus restoration to the opener on close, and a CrewModal Escape handler (mirroring ImageModal lines 45-46) are standard non-breaking a11y additions. Two refinements: (1) ImageModal's h2 (line 179) is conditional on `title`, so aria-labelledby must fall back to a static aria-label (e.g. 'Gallery image') when no title exists. (2) CrewModal renders TWO h2 elements — mobile (line 125) and desktop (line 144) — only one visible per breakpoint; prefer a stable `aria-label={data.name}` over aria-labelledby to avoid pointing at a hidden element. Focus restoration requires capturing document.activeElement (or a passed trigger ref) at open time. Effort M is justified for a reusable focus-trap across both components.
- **검증 결과**: confirmed

#### F25 · `Accessibility` · Icon-only buttons missing accessible names (modal close, carousel dots/arrows, scroll indicator)  _(공수 S)_

- **영향 범위**: Image/crew modals, hero carousel
- **파일**: `components/ui/ImageModal.tsx:139`, `components/ui/ImageModal.tsx:147`, `components/ui/ImageModal.tsx:167`, `components/ui/CrewModal.tsx:59`, `components/ui/CrewModal.tsx:97`, `components/ui/CrewModal.tsx:103`, `components/ui/CrewModal.tsx:113`, `components/ui/CrewModal.tsx:134`
- **문제**: Several icon-only controls have no accessible name: ImageModal close (167) and prev/next (139,147); CrewModal close (59,134), nav arrows (97,103) and dot indicators (113); the Hero carousel scroll-down indicator button (~185). Lucide/inline SVG icons are not exposed as text, so AT announces 'button' with no purpose. WCAG 4.1.2.
- **증거**: ImageModal close at 167-172 only <X/> no aria-label; CrewModal close (59), arrows (97/103), dots (113) icon-only without labels; hero scroll-down motion.button at ~185 has no aria-label.
- **제안 수정**: Add aria-label to each icon-only button: '닫기' on close buttons, '이전 이미지'/'다음 이미지' on modal nav arrows, aria-label={`${idx+1}번 이미지로 이동`} on CrewModal dots, and '아래로 스크롤' on the hero scroll indicator.
- **검증·수정안 보강**: The proposed aria-label fix is correct and safe for the modal controls. Concrete labels: ImageModal — close(167)='닫기', prev(139)='이전 이미지', next(147)='다음 이미지'; CrewModal — both close buttons (59 mobile AND 134 desktop, which the finding OMITTED)='닫기', prev(97)='이전 이미지', next(103)='다음 이미지', dots(113)=aria-label={`${idx+1}번 이미지로 보기`}. DROP the hero scroll-indicator part of the fix: that motion.button (185) already contains a visible <span> rendering the SCROLL text (t.common.more || 'SCROLL'), so AT derives an accessible name from its text content — it is NOT nameless. Also note: the ImageModal '147' (next arrow) was implied but the original files[] only listed 139; both 139 and 147 need labels. Effort S is accurate.
- **검증 결과**: adjust (파일행 보정됨)

#### F26 · `Accessibility` · Auto-rotating hero carousel has no pause control and no aria-live region  _(공수 M)_

- **영향 범위**: Home hero carousel
- **파일**: `components/sections/HeroCarouselClientComponent.tsx:35`, `components/sections/HeroCarouselClientComponent.tsx:64`
- **문제**: HeroCarouselClientComponent.tsx auto-advances every 10s via setInterval (35-41) with no way to pause/stop. Auto-updating content that starts automatically and lasts more than 5s must be pausable (WCAG 2.2.2). The carousel is not marked as a region (no role='region'/aria-roledescription='carousel'), slide changes are not announced, and the motion does not respect prefers-reduced-motion.
- **증거**: setInterval nextSlide every 10000ms (35-41) with no pause; section element (64) has no role/aria-roledescription; no useReducedMotion in this file.
- **제안 수정**: Pause the auto-advance interval on hover/focus-within and/or add a visible pause/play toggle; clear the interval when prefers-reduced-motion is set (useReducedMotion). Wrap the slide content in a container with role='region' aria-roledescription='carousel' aria-label and consider aria-live='polite' on the live slide wrapper.
- **검증·수정안 보강**: Sound and safe. The core remedies are correct: (1) pause the setInterval on hover/focus-within OR add a visible pause/play toggle to satisfy WCAG 2.2.2 (the 10s interval > 5s and starts automatically, a Level A violation); (2) clear the interval when prefers-reduced-motion is set via framer-motion's useReducedMotion (already a dependency, line 4 imports from 'framer-motion') — note prefers-reduced-motion should also disable the framer-motion AnimatePresence scale/opacity transitions and the looping scroll-indicator animation (lines 193-200), not just the auto-advance; (3) add role='region' aria-roledescription='carousel' aria-label to the section (line 64). Refinement on aria-live: the fix correctly hedges with 'consider'. Putting aria-live='polite' on an auto-advancing slide wrapper would announce every 10s automatically and be disruptive to screen readers — better to keep it off the live region or only announce slide position on manual navigation (arrows/dots). The dot/arrow buttons already have aria-labels, so basic operability exists. Recommend pause-on-focus + reduced-motion as the must-haves; aria-live optional/off.
- **검증 결과**: confirmed

#### F27 · `Accessibility` · framer-motion animations ignore prefers-reduced-motion site-wide (no CSS fallback)  _(공수 M)_

- **영향 범위**: Global animations
- **파일**: `app/globals.css`, `components/sections/HeroCarouselClientComponent.tsx:194`, `components/layout/Header.tsx:438`, `components/ui/ImageModal.tsx:98`
- **문제**: Only CustomizeConfigurator.tsx calls useReducedMotion. Other framer-motion consumers (Header mobile menu, ImageModal/CrewModal transitions, HeroCarousel entrance/exit and infinite-loop, section animations) animate unconditionally. globals.css has no @media (prefers-reduced-motion) block. Users requesting reduced motion still get scale/translate/opacity transitions and the infinitely repeating hero scroll bounce. WCAG 2.3.3.
- **증거**: grep prefers-reduced-motion|useReducedMotion returns only CustomizeConfigurator.tsx:1144/1308; no @media reduced-motion in globals.css; hero scroll indicator uses transition repeat:Infinity (~215).
- **제안 수정**: Add a global @media (prefers-reduced-motion: reduce) rule in globals.css that neutralizes animations/transitions (durations ~0.01ms, iteration-count:1) as a safety net, and gate key framer-motion animations (especially infinite repeats like the hero scroll indicator) on useReducedMotion.
- **검증·수정안 보강**: Fix is correct and is the standard remediation. Add a global @media (prefers-reduced-motion: reduce) block in app/globals.css (currently 134 lines, no such block; it even defines its own keyframe animation `fadeIn 0.3s` at line 98 and uses Tailwind `transition-all` e.g. HeroCarousel dots at line 177 — all unconditional). The CSS safety net should neutralize animation-duration/transition-duration (~0.01ms) and set animation-iteration-count:1 !important; this catches both Tailwind transitions and the fadeIn keyframe. Note: CSS alone does NOT stop JS-driven framer-motion `animate` props (the hero scroll-indicator y-bounce with repeat:Infinity, and Header/ImageModal entrance transitions are driven by framer-motion's JS, not CSS), so the second half of the fix — gating framer-motion with useReducedMotion (set repeat:0 / static y, skip scale/translate) — is required, not optional, especially for the infinite hero bounce. Recommend also conditionally rendering a static state for the scroll indicator. One refinement: the most applicable WCAG SC for the infinite repeat is 2.2.2 (Pause, Stop, Hide, Level A) rather than only 2.3.3 (AAA); citing 2.2.2 strengthens the case.
- **검증 결과**: adjust (파일행 보정됨)

#### F28 · `Accessibility` · Low-contrast text: gray-300/gray-400 utility text on white in Header  _(공수 S)_

- **영향 범위**: Header utility row (desktop + mobile language toggle)
- **파일**: `components/layout/Header.tsx:290`, `components/layout/Header.tsx:304`, `components/layout/Header.tsx:311`, `components/layout/Header.tsx:482`
- **문제**: The desktop header utility row uses text-gray-400 for the social-link container and text-gray-300 for inactive language options on a white background (Header.tsx 290, 304, 311). gray-300 (#d1d5db) on white is ~1.5:1 and gray-400 (#9ca3af) ~2.5:1 — both far below 4.5:1 (and below 3:1 for the small 11px language toggles). The mobile menu repeats text-gray-400 for inactive language (482,489). WCAG 1.4.3.
- **증거**: Header.tsx: container 'text-gray-400' (290); inactive language 'text-gray-300' at 304/311 on white header (bg-white line 220); mobile inactive 'text-gray-400' (482/489).
- **제안 수정**: Darken inactive/secondary text to at least text-gray-500 (#6b7280, ~4.6:1 on white) for social icons and at least gray-600 for the small 11px language toggle's inactive state; keep the active state dark. Re-check with a contrast tool.
- **검증·수정안 보강**: Fix is correct and safe — a pure CSS color darkening with no behavioral risk. Verified contrast math: gray-300 #d1d5db on white ≈ 1.47:1, gray-400 #9ca3af ≈ 2.54:1 (both fail 4.5:1 and even 3:1). gray-500 #6b7280 ≈ 4.83:1 (passes AA normal text). For the 11px/12px language toggles the proposed gray-600 #4b5563 ≈ 7:1 is comfortably above 4.5:1. Recommend: inactive language at 304/311 from text-gray-300 to text-gray-600 (small 11px text); social container at 290 from text-gray-400 to text-gray-500 (icons need 3:1 per 1.4.11, the "N" glyph is text needing 4.5:1, so gray-500 is the safe floor); mobile inactive language at 482/489 from text-gray-400 to text-gray-600. Active states already use #2f3432 and need no change; the "|" separators are decorative and exempt.
- **검증 결과**: confirmed

#### F02 · `Admin` · Admin product-readiness reports '이미지 정상' while images are broken (health check only tests URL presence)  _(공수 M)_

- **영향 범위**: /admin/products
- **파일**: `components/admin/products/ProductGrid.tsx:118`, `components/admin/products/ProductGrid.tsx:177`, `components/admin/products/ProductGrid.tsx:300`, `components/admin/products/ProductGrid.tsx:33`, `components/admin/products/ProductGrid.tsx:226`
- **문제**: The admin Product Readiness screen shows '이미지 보완 0' and a green '이미지 정상' badge per card, yet the actual product images are broken in production (F01). The health-badge logic only checks whether an imageUrl string exists (imageUrl ? '이미지 정상' : '이미지 보완'), not whether the image actually loads. This gives operators a false 'all healthy' signal and hides the P0 image breakage so it would never be caught from the admin panel.
- **증거**: ProductGrid.tsx:118 `{imageUrl ? '이미지 정상' : '이미지 보완'}`; shots/admin_products_admin.png shows green '이미지 정상' badges over gray broken thumbnails and '이미지 보완 0' metric while C1 breaks all images.
- **제안 수정**: Make the image-health check reflect actual reachability rather than mere URL presence — perform a lightweight HEAD/onError check, or treat Supabase-optimized-via-Vercel images as a known-risk state, and surface a real broken count in the '이미지 보완' metric. Update components/admin/products/ProductGrid.tsx:118 and :177 (badge) and :300 (summary metric) so the badge/metric cannot read green when the rendered <Image> errors.
- **검증·수정안 보강**: Direction is correct but the proposed lightweight HEAD-per-card approach is fragile and overweight. A HEAD against the Vercel optimizer (/_next/image) would itself 402 just like the GET, so it WOULD detect C1 — but doing N network probes on every admin grid render is wasteful and racy. The cleaner, lower-risk fix: (1) add an onError handler to the next/image at lines 68 and 154 that flips a per-card local state, so the badge reads '이미지 점검 필요/이미지 오류' when the actual render fails (this catches C1 honestly with zero extra requests); and/or (2) more cheaply, just relabel the badge/metric to match what it truly measures — change '이미지 정상' to 'URL 등록됨' and keep the misleading '깨진 URL 또는 미등록' caption (line 300) honest, since the code at hasValidProductImageUrl (line 33-36) only validates URL shape, never reachability. Note: once C1/F01 is fixed (images load again), this badge becomes accurate, so it is strictly a derivative monitoring gap. Effort is closer to S (onError handler) than M.
- **검증 결과**: adjust

#### F41 · `Admin` · No unsaved-changes protection on admin forms and per-item draft editors  _(공수 M)_

- **영향 범위**: All admin create/edit/CMS forms
- **파일**: `components/admin/cms/SupportEditor.tsx:59 (faqDrafts/noticeDrafts state; isFaqDirty L74, isNoticeDirty L84; handleSaveFAQ L140)`, `components/admin/ProductForm.tsx:26 (formData useState), :95 (handleSubmit)`, `components/admin/gallery/GalleryForm.tsx:37 (component), :45 (useForm)`, `components/admin/projects/ProjectForm.tsx:42 (useState), :51 (useForm), :176 (form onSubmit)`
- **문제**: No admin form or editor guards against navigating away with unsaved edits — a repo-wide grep for beforeunload/isDirty/unsaved/hasChanges across app/admin and components/admin returns zero matches. Most damaging in SupportEditor.tsx, which keeps per-item edits in local draft state (faqDrafts/notice drafts) that only persist on per-item save; switching tabs, clicking another sidebar link, or closing the tab silently discards all typed FAQ/notice edits. ProductForm (~15 fields + uploads), GalleryForm, ProjectForm, MainCmsClient have the same exposure.
- **증거**: grep -rln 'beforeunload|isDirty|unsaved|hasChanges' components/admin app/admin -> no matches. SupportEditor uses per-item faqDrafts state flushed only on explicit per-item save.
- **제안 수정**: Add a reusable useUnsavedChanges hook that (a) registers a window 'beforeunload' handler when a form/editor has dirty state, and (b) for in-app navigation intercepts router pushes (or wraps the sidebar Links) to confirm before discarding. Wire it into SupportEditor, ProductForm (compare formData to initialData), GalleryForm, ProjectForm. At minimum add beforeunload protection where draft state is non-empty.
- **검증·수정안 보강**: Fix is correct and the right approach. The beforeunload handler is the high-value, low-effort core: register it whenever any draft/dirty state is non-empty (SupportEditor: faqDrafts/noticeDrafts non-empty OR isFaqDirty/isNoticeDirty true; ProductForm/GalleryForm/ProjectForm: compare current state to initialData/defaultValues). One correction: in-app navigation interception is HARDER than implied — Next.js App Router has no public route-change-abort API (unlike Pages Router routeChangeStart), so guarding sidebar Link clicks requires intercepting onClick on the AdminSidebar Links or a custom navigation wrapper, not a simple router.push wrap. This justifies the M effort. Ship beforeunload first (covers tab close / reload / external nav), then layer the sidebar-Link confirm. SupportEditor already exposes isFaqDirty/isNoticeDirty helpers that can drive the guard with no new comparison logic.
- **검증 결과**: adjust (파일행 보정됨)

#### F13 · `CodeQuality` · Supabase clients cast to `as any` everywhere, discarding fully-generated DB types  _(공수 M)_

- **영향 범위**: All admin write paths (hero slides, customize catalog, settings, inquiries)
- **파일**: `app/actions/customize-actions.ts:287`, `app/actions/customize-actions.ts:374`, `app/actions/cms-actions.ts:86`, `app/actions/cms-actions.ts:152`, `app/actions/cms-actions.ts:202`, `app/actions/settings-actions.ts:9`, `app/actions/submit-inquiry.ts:58`, `types/supabase.ts:1`
- **문제**: types/supabase.ts (1123 lines) contains complete generated types for every table, and all client factories are correctly parameterized as SupabaseClient<Database>. Yet nearly every DB read/write casts the client to `as any` before .from(...), throwing away that typing. Insert/update payloads, column names, and returned rows are completely untyped at every write site — typos in column names or wrong value shapes will not be caught at compile time. customize-actions.ts has 29 `as any` casts; cms-actions.ts has 16. The casts appear cargo-culted to suppress an earlier type error.
- **증거**: types/supabase.ts fully types customize_* and hero_slides; clients typed SupabaseClient<Database> but cast away at 29 sites in customize-actions.ts and 16 in cms-actions.ts.
- **제안 수정**: Remove the `as any` casts on Supabase clients and .from() chains. Where the client's strict insert/update generics genuinely fail, fix the payload shape or use the table's Insert/Update row type from Database['public']['Tables']['<table>'] instead of `as any`. Do it file-by-file starting with customize-actions.ts and cms-actions.ts, running tsc to surface the real type mismatches.
- **검증·수정안 보강**: Fix is correct and safe. Removing the `as any` casts on the client/.from() chains is non-behavioral at runtime; it only re-enables compile-time checking, and tsc surfaces real mismatches incrementally. Important caveat to keep (the proposed fix's file-by-file + run-tsc approach already accounts for it): @supabase/supabase-js's recursive Insert/Update generics can collapse to `never` if the generated Database types are even slightly stale vs the live schema, producing a wall of errors. So this is not a mechanical find-and-delete — each surfaced error should be fixed by correcting the payload shape or annotating with Database['public']['Tables']['<table>']['Insert'/'Update'], and any genuinely stale type should be regenerated (supabase gen types) rather than re-suppressed. Recommend also enforcing this with an eslint rule (no-explicit-any / ban-ts-comment) on app/actions to prevent regression. Note the `as any[]` casts on result .data (e.g. customize-actions.ts:263-271) are a slightly different category (untyped row mapping) and can be addressed at the same time but are lower value.
- **검증 결과**: adjust

#### F14 · `CodeQuality` · CustomizeConfigurator.tsx is a 1994-line god-file with ~25 components and 14 useState in the main component  _(공수 L)_

- **영향 범위**: /customize page
- **파일**: `components/customize/CustomizeConfigurator.tsx:314`, `components/customize/CustomizeConfigurator.tsx:1128`, `components/customize/CustomizeConfigurator.tsx:1632`, `components/customize/CustomizeConfigurator.tsx:1946`
- **문제**: A single file defines ~25 components plus helpers. The top-level CustomizeConfigurator (314-586) holds 14 useState plus 8 useMemo and orchestrates model selection, option toggling with conflict resolution, step/progress navigation, URL config sync, consultation form state+submit, quote-window printing, and three floorplan modals. Separable sub-concerns live in the same file: the SVG floorplan engine (~600 lines), the consultation form (~300 lines), and the quote HTML generator. Hard to test/reason/review, and forces the whole tree to re-render on unrelated state changes.
- **증거**: 1994 lines; ~25 top-level component/function declarations; main component 314-586 with 14 useState + 8 useMemo.
- **제안 수정**: Extract three modules: (1) components/customize/floorplan/* for the SVG canvas + guides + zoom modal, (2) components/customize/ReviewStep.tsx + ConsultationForm.tsx, (3) lib/customize/quoteHtml.ts for buildQuoteHtml/escapeHtml. Lift the consultation form + submit state into ConsultationForm. Consider a useReducer for the config (modelId + selectedOptions + step + furthestStepIndex).
- **검증·수정안 보강**: Sound and safe — pure mechanical extraction with no intended behavior change. (1) Move the SVG floorplan engine (FloorplanCanvas:1128, FloorplanExpansionGuides:1307, FloorplanLengthRail:1435, FloorplanZoomModal:1452, BasePlanObjects:1511, plus FloorplanPreview:1014 and useFloorplanImageStatus:205) into components/customize/floorplan/. (2) Move ReviewStep:1632 + ConsultationForm:1815 (+Field:1900, Select:1930, ReviewEditButton:1801) into their own modules. (3) Move buildQuoteHtml:1946 + escapeHtml:1986 into lib/customize/quoteHtml.ts (pure, trivially unit-testable). Key refinement: the only part that materially fixes the re-render concern is lifting the consultation form state (the form useState + handleSubmit + isPending) down into ConsultationForm so unrelated config changes do not re-render it — prioritize that over the cosmetic file splits. The useReducer for config is optional polish, not required. Scope note: the floorplan engine is ~400 lines (1126-1531), not ~600 as stated. No behavior change so low-risk, but L effort; guard with the existing playwright customize flow to catch regressions.
- **검증 결과**: adjust

#### F37 · `CodeQuality` · Duplicate service-role Supabase client factories (lib/supabase.ts vs utils/supabase/service.ts)  _(공수 M)_

- **영향 범위**: All server actions
- **파일**: `lib/supabase.ts`, `utils/supabase/service.ts`, `app/actions/cms-actions.ts`
- **문제**: Two parallel implementations of the same service-role admin client: lib/supabase.ts exposes getSupabaseAdmin() + a supabaseAdmin Proxy (22-47), while utils/supabase/service.ts exposes createServiceRoleClient() (6-20). Both call createClient<Database>(url, SERVICE_ROLE_KEY, {auth:{autoRefreshToken:false,persistSession:false}}). Different action files import different ones, so there is no single source of truth, two slightly different error-handling behaviors, and reviewers must know both. The supabaseAdmin Proxy is a legacy shim still used by product/storage/project/migration actions.
- **증거**: Two factories with identical createClient<Database> service-role config; supabaseAdmin imported by product/storage/project/migration actions while createServiceRoleClient used by cms/inquiry/gallery.
- **제안 수정**: Standardize on one factory. Keep utils/supabase/service.ts createServiceRoleClient() (the lazy-getter + Proxy in lib/supabase.ts is more fragile), migrate the ~6 importers of getSupabaseAdmin/supabaseAdmin, then delete the duplicate from lib/supabase.ts. Add the missing-env guard to the surviving factory.
- **검증·수정안 보강**: The fix DIRECTION is backwards and should be inverted. The finding proposes keeping createServiceRoleClient (utils/supabase/service.ts) and migrating ~6 importers of getSupabaseAdmin/supabaseAdmin. The reality (verified via grep) is the opposite: getSupabaseAdmin/supabaseAdmin from lib/supabase.ts is the DOMINANT factory used by ~14 files (app/actions/inquiry, gallery, product, storage, migration, customize, submit-inquiry, faq, project, notice, settings + app/admin/page.tsx, products/page.tsx, products/[id]/page.tsx), while createServiceRoleClient has exactly ONE importer: app/actions/cms-actions.ts. The lower-risk standardization is therefore: keep lib/supabase.ts (getSupabaseAdmin + supabaseAdmin Proxy), migrate the single cms-actions.ts importer to it, then delete utils/supabase/service.ts. This is S/M effort (one importer to change), not M with ~6 migrations. Note also that lib/supabase.ts ALREADY has the missing-env guard (lines 24-29) that service.ts lacks (service.ts uses non-null assertions on env at :7-8) — so the finding's claim that the surviving factory needs the guard added is moot if we keep lib/supabase.ts. Functionally both clients are identical config so consolidation is safe.
- **검증 결과**: adjust

#### F38 · `CodeQuality` · SupportEditor duplicates full CRUD/draft logic for FAQ and Notice in one 771-line component  _(공수 M)_

- **영향 범위**: /admin/support
- **파일**: `components/admin/cms/SupportEditor.tsx:74`, `components/admin/cms/SupportEditor.tsx:113`, `components/admin/cms/SupportEditor.tsx:140`, `components/admin/cms/SupportEditor.tsx:170`
- **문제**: components/admin/cms/SupportEditor.tsx implements two near-identical entity managers side by side: isFaqDirty/isNoticeDirty (74-92), handleChangeFAQDraft/handleChangeNoticeDraft (94-110), handleAddFAQ/handleAddNotice, handleSaveFAQ/handleSaveNotice, handleDeleteFAQ/handleDeleteNotice, plus parallel faqDrafts/noticeDrafts and expandedFaq/expandedNotice state (10 useState total). The save/delete handlers share the same optimistic-update + toast + finally-reset shape, copy-pasted per entity.
- **증거**: Parallel FAQ/Notice implementations: isFaqDirty(74)/isNoticeDirty(84), handleChangeFAQDraft(94)/handleChangeNoticeDraft(103), handleAddFAQ(113), handleSaveFAQ(140).
- **제안 수정**: Extract a generic useEditableList<T>(items, {create, update, remove, dirty}) hook that owns drafts, savingItems, expanded id, and the add/save/delete handlers. Instantiate it twice (FAQ, Notice) and render each tab with a shared <EditableEntityList> presentational component. Removes ~half the file.
- **검증·수정안 보강**: Sound at the logic layer. Extracting a generic useEditableList<T>(items, {create, update, remove, dirty}) hook that owns drafts/savingItems/expanded-id and the add/save/delete handlers is clean and removes most of the duplication (the FAQ and Notice save/delete/dirty handlers are near-identical, differing only in field lists and action imports). Caveat: the proposed shared <EditableEntityList> presentational component is harder than implied — FAQ renders a single accordion list (390-517), while Notice renders TWO divergent UIs: a mobile card stack (539-624) and a desktop table with inline-editable rows plus expandable body rows (632-765). These layouts are too different to unify behind one presentational component without churn. Recommend: do the hook/logic extraction (the safe, high-value ~half-the-file win) and leave the three distinct render blocks as-is, or factor only shared sub-pieces (revert/save button group, dirty-status line). Minor evidence nit: the description says "10 useState total" — there are actually 9 useState calls (lines 56-64); line 65 is useRouter, not useState. Does not affect the verdict.
- **검증 결과**: confirmed

#### F39 · `CodeQuality` · 322 hardcoded hex color literals in CustomizeConfigurator instead of design tokens  _(공수 M)_

- **영향 범위**: /customize page
- **파일**: `components/customize/CustomizeConfigurator.tsx:98`, `tailwind.config.ts:1`
- **문제**: components/customize/CustomizeConfigurator.tsx contains 322 inline #rrggbb literals (e.g. #2f3432 x51, #fbfaf7 x37, #8a806f x37, #0d6e66, #b88b26). The configurator uses its own warm-paper palette not in tailwind.config.ts, so the same colors are retyped dozens of times across className strings and inline SVG fills. Changing the palette means find-replace across hundreds of occurrences with no consistency guarantee.
- **증거**: grep counts 322 hex literals; top repeats #2f3432(51), #fbfaf7(37), #8a806f(37); none defined in tailwind.config.ts.
- **제안 수정**: Add the configurator palette to tailwind.config.ts (e.g. customize:{ink:'#2f3432',paper:'#fbfaf7',sand:'#8a806f',border:'#d8d0c3',teal:'#0d6e66',gold:'#b88b26'}) and replace className hexes with bg-customize-paper etc. For SVG fills that can't use Tailwind, define a const COLORS={...} map near the existing COPY constant (line 98).
- **검증·수정안 보강**: Fix is correct and safe. Verified: line 98 is the COPY constant (accurate anchor for a sibling COLORS map), and there is no customize palette in tailwind.config.ts. The hex usage splits into 278 className arbitrary-values (e.g. bg-[#fbfaf7], usable as Tailwind tokens like bg-customize-paper) and ~44 SVG fill/stroke attributes (lines 1184/1204/1239-1240/1253/1268/1296-1297/1331/1341, which cannot use Tailwind and need the COLORS const). Both halves of the proposed fix are needed and the proposal correctly accounts for this. Caveat for the implementer: this is a pure refactor touching 322 sites, so blind global find-replace is risky — some hexes appear in non-color contexts and a few near-identical shades (#f5f1ea/#f4f0e8, #fbfaf7/#fbf9f5) must be mapped to distinct tokens, not collapsed. Recommend per-token search-and-confirm plus a visual diff of the /customize page after. Effort M is accurate.
- **검증 결과**: confirmed

#### F40 · `CodeQuality` · Two competing drag-and-drop libraries shipped; violates @dnd-kit standard in CLAUDE.md  _(공수 M)_

- **영향 범위**: /admin/gallery, /admin/projects, /admin/main
- **파일**: `components/admin/gallery/GalleryForm.tsx:13`, `components/admin/projects/ProjectForm.tsx:15`, `components/admin/cms/MainCmsClient.tsx:246`, `package.json:20`
- **문제**: The admin panel uses two DnD libraries simultaneously: @dnd-kit (MainCmsClient.tsx hero-slide reorder) and @hello-pangea/dnd (GalleryForm.tsx and ProjectForm.tsx image reorder). Both are in package.json. CLAUDE.md explicitly mandates @dnd-kit. Shipping two DnD engines bloats the admin bundle, fragments reorder UX/keyboard-accessibility between sections, and creates double maintenance surface.
- **증거**: @hello-pangea/dnd used in GalleryForm.tsx + ProjectForm.tsx; @dnd-kit used in MainCmsClient.tsx; package.json lines 15-20 list both; CLAUDE.md requires @dnd-kit.
- **제안 수정**: Standardize on @dnd-kit. Re-implement the image-reorder UIs in GalleryForm.tsx and ProjectForm.tsx using @dnd-kit/sortable (mirroring the SortableContext/verticalListSortingStrategy pattern in MainCmsClient.tsx:246-268), then remove @hello-pangea/dnd from package.json. Restores keyboard accessibility (dnd-kit KeyboardSensor) consistently.
- **검증·수정안 보강**: Proposed fix is correct and safe. Standardizing GalleryForm.tsx and ProjectForm.tsx on @dnd-kit/sortable (mirroring the DndContext + SortableContext + verticalListSortingStrategy pattern verified at MainCmsClient.tsx:246-268) and then removing @hello-pangea/dnd from package.json is the right approach and aligns with CLAUDE.md's explicit @dnd-kit mandate. It also restores keyboard accessibility via @dnd-kit's KeyboardSensor. Caveat for the implementer: both forms wrap the reorderable list together with image-upload/compression logic (browser-image-compression, uploadImageAction), so the migration must preserve that surrounding state — hence effort M is justified, not S. Recommend keeping @dnd-kit/sortable's array reorder helper (arrayMove from @dnd-kit/sortable) to replace the DragDropContext onDragEnd index swap.
- **검증 결과**: adjust (파일행 보정됨)

#### F15 · `Content/i18n` · Language selector advertises KR/EN/ES but only KO/EN exist, and core flows stay Korean under EN  _(공수 L)_

- **영향 범위**: Global language switcher; /customize, /support, /products
- **파일**: `contexts/LanguageContext.tsx:5`, `components/layout/Header.tsx:171`, `components/layout/Header.tsx:302`, `components/customize/CustomizeConfigurator.tsx:108`, `app/support/page.tsx:29`, `app/products/ProductsPageClient.tsx:108`, `app/products/ProductsPageClient.tsx:639`, `constants/dictionaries.ts:197`, `CLAUDE.md`
- **문제**: CLAUDE.md/brief describe a 3-language selector (KR/EN/ES) but there is no Spanish anywhere (grep for ES/Spanish/español returns nothing); the LanguageContext type is 'KO'|'EN' and the Header only renders KO|EN toggles. Even existing EN is only wired into ~9 files (useLanguage) / 6 (useTranslation). The core order flow (CustomizeConfigurator.tsx, 1994 lines) has ZERO language hooks and is 100% hardcoded Korean; app/support/page.tsx is fully hardcoded Korean; app/page.tsx and ProductsPageClient.tsx are essentially Korean-only. So switching to EN translates header/footer/home-hero/company but leaves the entire ordering, support, and product browsing experience in Korean — a broken half-translated experience.
- **증거**: LanguageContext.tsx:5 type Language='KO'|'EN'; Header.tsx:171 navigation toggle; useLanguage=9 files, useTranslation=6 files; CustomizeConfigurator.tsx:89-115 hardcoded Korean; support/page.tsx:29-34 hardcoded; grep ES/Spanish=0 hits.
- **제안 수정**: Align on actual scope: either (a) remove the ES claim from CLAUDE.md and scope EN properly by extending constants/dictionaries.ts to cover configurator/support/products and threading useTranslation through them, or (b) if full i18n is not short-term feasible, hide/remove the EN toggle on untranslated pages so users are not dropped into half-Korean. At minimum document the real coverage. Configurator alone is ~2000 lines of hardcoded copy.
- **검증·수정안 보강**: The proposed fix is sound and the right shape. Option (a) full EN coverage is L-effort and likely not short-term feasible given the configurator alone is ~2000 lines of hardcoded copy (COPY const at CustomizeConfigurator.tsx:98-110, step labels at 89-94, CTAs at 110+) plus support/page.tsx static arrays (lines 29-34) and app/support being a server-rendered page with no client language context. Option (b) is the realistic short-term fix and should be prioritized: the language is a client-only React context (LanguageContext.tsx, default 'KO', not persisted, not URL-driven, not SSR-aware), so it cannot gate the server-rendered support/home copy anyway. Two concrete documentation fixes are cheap and should be called out explicitly: (1) remove the KR/EN/ES claim in CLAUDE.md (the type is 'KO'|'EN' at LanguageContext.tsx:5, Header renders only KO|EN at Header.tsx:302-314, grep for ES/español/Spanish = 0 hits — fully confirmed), and (2) document real EN coverage. One nuance the fix should account for: language state is in-memory only (no localStorage/cookie), so it resets to KO on every navigation/reload — meaning even the "translated" pages revert constantly. That arguably makes the EN toggle near-useless today and strengthens option (b)/hiding it.
- **검증 결과**: adjust

#### F52 · `Content/i18n` · Brand spelling is inconsistent across the site (weet / WEET / Weet / weet:))  _(공수 M)_

- **영향 범위**: Footer, company page, hero, modals
- **파일**: `constants/dictionaries.ts:27`, `constants/dictionaries.ts:33`, `constants/dictionaries.ts:221`, `constants/dictionaries.ts:241`, `constants/dictionaries.ts:252`, `components/sections/HeroCarousel.tsx:32`, `components/ui/ImageModal.tsx:192`
- **문제**: Brand casing is inconsistent: 위트 (89), weet (58), WEET (43), weet:) (4). The footer company name differs by section: KO dict '주식회사 weet' (dictionaries.ts:27) vs copyright 'WEET' (33) vs EN 'WEET Inc.' (221). Company-page EN copy capitalizes 'Weet' mid-sentence (241,252-259), conflicting with the lowercase 'weet'/'weet:)' brandmark used elsewhere (HeroCarousel.tsx:32 'Welcome to weet:)', ImageModal.tsx:192 'Designed by weet:)'). Official brand is stylized lowercase 'weet:)'.
- **증거**: grep counts: 위트=89, weet=58, WEET=43, weet:)=4; dictionaries.ts:27 '주식회사 weet', :33 'WEET', :221 'WEET Inc.', :241 'Introducing Weet', :252 'Weet started…'.
- **제안 수정**: Establish a brand style rule (lowercase 'weet' in body copy, 'weet:)' as the logotype, 'WEET Inc.'/'주식회사 weet' only as the legal entity, ALL-CAPS only in the legal copyright line). Normalize the EN company-page strings in dictionaries.ts (replace inline 'Weet' with 'weet') and align company-name casing between KO/EN footers.
- **검증·수정안 보강**: The proposed fix is correct and safe. It is purely string-content normalization (no logic changes). The fix direction is actually validated by the codebase itself: dictionaries.ts:264-269 (CI section) defines the official brandmark as lowercase 'weet' with ':)' being a smile, confirming the "lowercase weet body / weet:) logotype / WEET Inc. + 주식회사 weet legal" rule. Recommend extending normalization beyond the 7 listed files: 'Weet' also appears at dictionaries.ts:212 ('Weet Factory'), :240, :255, :259, :283, and ko factory menu uses lowercase 'weet 팩토리' (line 18) vs EN 'Weet Factory' — these should be aligned too for a complete fix. Also normalize the EN hero subtitle (line 235 'we make dreams come true' is all-lowercase) vs slogan 'WE make dreams come True' (line 230/236) if a consistent tagline casing is wanted, though that's secondary.
- **검증 결과**: confirmed

#### F53 · `Content/i18n` · Header KO 'SOLUTION' submenu labels do not match the solution pages' own nav chips  _(공수 S)_

- **영향 범위**: Header SOLUTION submenu vs /solution/* pages
- **파일**: `components/layout/Header.tsx:55-59`, `components/solution/SolutionTemplate.tsx:49-54`, `app/solution/page.tsx:73-109`
- **문제**: In the Korean nav the SOLUTION submenu items are Korean-with-English-parenthetical: '보안 (Security)','네트워크 (Network)','원격 제어 (Control)','에너지 (Energy Stack)','운영 솔루션' (Header.tsx:54-60). But the actual solution pages (SolutionTemplate PACKAGE_NAV, 49-54) brand these as English-only 'Security Core','Network Fabric','Control Layer','Energy Stack' even in the KO map. So the label a Korean user clicks does not match the heading/nav chip they land on.
- **증거**: Header.tsx:55-60 KO submenu '보안 (Security)' etc.; SolutionTemplate.tsx:49-54 KO nav names 'Security Core','Network Fabric','Control Layer','Energy Stack'.
- **제안 수정**: Align the package naming in one place. Either rename the SolutionTemplate KO nav to match the header's Korean labels, or rename the header submenu to the canonical English package names used on the pages. Centralize the package name/desc pairs in a shared constant so header and pages can't drift.
- **검증·수정안 보강**: Safe and appropriate. Centralizing the package name/desc pairs into one shared constant (e.g. a lib/solution constant) consumed by Header, /solution index, and SolutionTemplate would eliminate drift across all three surfaces. As a minimal fix, align SolutionTemplate KO nav names to match the header's Korean labels (or vice versa). Recommend extending the fix to also cover the /solution index card titles (app/solution/page.tsx:73,85,97,109) which add a third variant, so all three surfaces agree.
- **검증 결과**: confirmed

#### F35 · `Performance` · Unused heavy dependency @react-pdf/renderer shipped (zero imports in app code)  _(공수 S)_

- **영향 범위**: build/bundle
- **파일**: `package.json:23`
- **문제**: @react-pdf/renderer ^4.5.1 is declared in package.json (line 23) but has ZERO real imports anywhere in app/, components/, or lib/ (only two test files mention the string in comments). It is a very large library (PDF layout engine, fontkit, yoga-layout). Even if tree-shaken from the client bundle, it bloats install size, lockfile, and cold-start surface, and risks accidental future inclusion.
- **증거**: grep -rn "from '@react-pdf" app/ components/ lib/ returns nothing; only test files mention the string. package.json:23 declares @react-pdf/renderer ^4.5.1.
- **제안 수정**: Remove @react-pdf/renderer from package.json dependencies (npm uninstall) since nothing uses it. If PDF generation is planned, re-add it later behind a server-only dynamic import so it never reaches the client bundle.
- **검증·수정안 보강**: Fix is correct and safe: `npm uninstall @react-pdf/renderer` removes a dependency with zero imports, so it cannot break anything. The suggestion to re-add later behind a server-only dynamic import if PDF generation is needed is sound guidance. Worth noting (out of scope but adjacent): `pdf-parse` (devDependencies line 63) also appears unused and could be evaluated for removal in the same cleanup.
- **검증 결과**: confirmed

#### F36 · `Performance` · Noto Sans KR loaded with only 'latin' subset and 3 weights — Korean glyphs unpreloaded, fallback flash  _(공수 M)_

- **영향 범위**: all pages (global font)
- **파일**: `app/layout.tsx:6-10`, `app/layout.tsx:171`, `app/globals.css:8`, `tailwind.config.ts:78`
- **문제**: app/layout.tsx instantiates Noto_Sans_KR with subsets:['latin'] and weight:['400','500','700'] (lines 6-10). The site is Korean content, but the latin subset has no Hangul glyphs. next/font auto-disables preload for fonts whose declared subsets don't cover the rendered text, so the large Korean glyph payload is fetched late, causing a font-swap flash on primary Korean text. Loading three CJK weights also adds significant transfer.
- **증거**: app/layout.tsx:6-10 Noto_Sans_KR({subsets:['latin'],weight:['400','500','700']}); site content is Korean; no preload/display configured for Hangul.
- **제안 수정**: next/font/google cannot cleanly subset CJK. Either (a) accept system-font fallback for Korean and drop unnecessary weights, or (b) self-host a properly subsetted Korean woff2 (Pretendard or Hangul-subset Noto) via next/font/local with display:'swap' and explicit preload, reducing weights to the two actually used. At minimum, audit whether all of 400/500/700 are needed.
- **검증·수정안 보강**: The proposed fix is sound and the right direction. next/font/google genuinely cannot meaningfully subset CJK (the 'latin' subset for Noto_Sans_KR omits all Hangul, and there is no Korean subset option that prunes glyphs cleanly), so self-hosting a properly subsetted Korean woff2 (Pretendard or a Hangul-subset Noto) via next/font/local with display:'swap' and explicit preload is the correct remedy, plus auditing the 400/500/700 weights. IMPORTANT — the fix should ALSO repair an adjacent wiring bug discovered while verifying: in app/layout.tsx the `noto` const is created but its CSS variable (`--font-noto-sans`) is NEVER attached to any element — the <html> className (line 171) only includes geist.variable, not noto.variable. globals.css line 8 sets `body { font-family: var(--font-noto-sans), sans-serif }`, but since the variable is undefined, body falls back to sans-serif and Noto Sans KR effectively does not apply. Separately, geist.variable defines `--font-sans` while tailwind.config.ts:78 `font-sans` references `var(--font-geist-sans)` (also undefined → system-ui). So whoever implements F36 should wire the chosen Korean font's variable onto <html>/<body> and reconcile the Tailwind fontFamily token, otherwise reducing weights alone won't fix the swap flash. Note: the claim 'next/font auto-disables preload for fonts whose declared subsets don't cover the rendered text' is slightly imprecise — next/font preloads the DECLARED subset (latin) regardless of rendered text; the Hangul glyphs simply live in a non-preloaded part of the family, which still produces the described late-fetch/swap behavior.
- **검증 결과**: confirmed

#### F32 · `Routing/Runtime` · No error or loading boundaries anywhere in the App Router  _(공수 M)_

- **영향 범위**: All routes (admin + public)
- **파일**: `app/error.tsx`, `app/global-error.tsx`, `app/admin/error.tsx`, `app/actions/customize-actions.ts:297`, `app/actions/customize-actions.ts:321`, `app/admin/consultations/page.tsx:7`, `app/projects/[id]/page.tsx:35-53`, `app/products/page.tsx:1`
- **문제**: find app -name error.tsx -o -name loading.tsx -o -name global-error.tsx returns zero results (only not-found.tsx exists). Many server-action-driven async pages (admin lists, customize catalog, products, projects/[id] Supabase queries) can throw — customize-actions throws on consultationsResult.error, getAdminConsultations throws on error — and any uncaught render/data error bubbles to Next's default unstyled error page (blank white screen for root), and slow data loads show no skeleton. Off-brand and degrades resilience.
- **증거**: find across app/ returns no error.tsx/loading.tsx/global-error.tsx; only not-found.tsx exists. customize-actions.ts:297,321 throw on Supabase errors with no boundary; projects/[id] queries Supabase with no surrounding boundary.
- **제안 수정**: Add app/error.tsx ('use client') with a branded fallback + reset() retry button mirroring not-found.tsx styling, app/global-error.tsx for root-layout-level failures, and a scoped error.tsx under app/admin/* so admin data failures stay inside the admin shell. Add loading.tsx for data-heavy routes (app/admin/products, app/admin/consultations, app/customize, app/products) using existing skeleton/spinner UI.
- **검증·수정안 보강**: Proposed fix is correct and safe — error/loading boundaries are purely additive and cannot regress existing behavior. Confirmed accurate: app/error.tsx ('use client' with reset() retry, mirroring not-found.tsx styling), app/global-error.tsx (must render its own <html>/<body> since it replaces the root layout), and a scoped app/admin/error.tsx so admin data failures (getAdminConsultations/getAdminCustomizeData throws) stay inside the admin shell are all warranted. loading.tsx for force-dynamic data routes (app/admin/consultations, app/admin/products, app/customize, app/products) is appropriate. Minor refinement: prioritize the public app/error.tsx + app/global-error.tsx (resilience) over loading.tsx (cosmetic), and reuse not-found.tsx visual language for brand consistency. global-error only catches root-layout-level failures, so the scoped admin error.tsx is the more impactful piece since most throwing code paths are in admin server components.
- **검증 결과**: confirmed

#### F30 · `Security` · Public submission rate limiter is per-instance in-memory and ineffective on Vercel serverless  _(공수 M)_

- **영향 범위**: Public forms: /support inquiry, consultation, /customize consultation
- **파일**: `lib/public-submission-guard.ts:10`, `lib/public-submission-guard.ts:39`, `app/actions/submit-inquiry.ts:51`, `app/actions/submit-inquiry.ts:117`, `app/actions/customize-actions.ts:333`
- **문제**: All public write endpoints (submitInquiry, submitConsultation, submitCustomizeConsultation) bypass RLS via the service-role client (anon INSERT policies were intentionally dropped). The only abuse protection is assertPublicSubmissionAllowed(), which stores request timestamps in a per-process globalThis Map (lib/public-submission-guard.ts:10-19, 5 per 10 min per IP). On Vercel each serverless instance has its own Map and instances scale out independently, so an attacker can trivially exceed the limit by fanning requests across instances. The code comment admits 'Best-effort per-instance throttle.' Result: unbounded spam writes into inquiries/customize_consultations (DB cost + admin-inbox flooding). The honeypot blocks only naive bots.
- **증거**: public-submission-guard.ts:10-19 globalThis Map limit 5/10min; comment admits per-instance best-effort; service-role client bypasses RLS.
- **제안 수정**: Back the throttle with a shared store (Supabase table with a unique (scope,ip,window) constraint or upstash/redis), or enable Vercel WAF / edge rate limiting on the server-action POST paths. At minimum add a per-IP+phone dedupe insert guard and a daily global cap. Confirm TRUSTED_CLIENT_IP_HEADER / VERCEL env is set in prod so the limiter keys on a real client IP.
- **검증·수정안 보강**: The proposed fix is correct and safe. A shared-store throttle (Supabase table with a unique (scope, ip, window-bucket) constraint, or Upstash Redis) or Vercel WAF/edge rate limiting is the right structural fix since each serverless instance currently keeps its own globalThis Map. A per-IP+phone dedupe insert and a daily global cap are good belt-and-suspenders additions. One refinement to call out: in production the limiter only keys on a real IP if TRUSTED_CLIENT_IP_HEADER is set or VERCEL='1' (defaulting to x-forwarded-for); otherwise rawClientId is null and every request collapses into the single key 'inquiry:unknown'. That is itself a latent bug (one shared 5/10min bucket can lock out all legitimate prod users, and x-forwarded-for's first value is client-spoofable to defeat the limit). So the fix should explicitly verify the env is set AND use a trusted/right-most proxy IP, not just the first x-forwarded-for token. Effort M is reasonable.
- **검증 결과**: confirmed

#### F31 · `Security` · CSP allows 'unsafe-inline' for script-src, defeating XSS mitigation  _(공수 M)_

- **영향 범위**: All pages (global security header)
- **파일**: `next.config.ts:6`, `next.config.ts:21`, `app/layout.tsx:175`, `app/layout.tsx:187`
- **문제**: next.config.ts builds script-src with 'unsafe-inline' unconditionally (scriptSrc array 6-13, applied at 21). Required by current inline scripts: the Clarity loader (app/layout.tsx:187-195) and three application/ld+json dangerouslySetInnerHTML blocks (layout.tsx:175, support/page.tsx:149, customize/page.tsx:57). With 'unsafe-inline' present, the otherwise-good CSP provides little protection against injected inline <script>. The JSON-LD sinks are currently safe (static/DB-derived) but any future reflected value rendered inline would be exploitable.
- **증거**: next.config.ts scriptSrc includes 'unsafe-inline'; inline scripts at layout.tsx:187-195 (Clarity) and ld+json at layout.tsx:175, support/page.tsx:149, customize/page.tsx:57.
- **제안 수정**: Move to a nonce-based CSP: generate a per-request nonce in middleware, pass it to next/script and the ld+json <script nonce=...> tags, and replace 'unsafe-inline' with 'nonce-...' (keep 'strict-dynamic' for GTM/Clarity). If nonce adoption is too large, at least scope 'unsafe-inline' off for production once inline scripts are externalized.
- **검증·수정안 보강**: Fix is sound in direction and correctly scoped as effort M. Nonce-based CSP is the right approach: generate a per-request nonce in middleware.ts, thread it to next/script (Clarity loader, which Next.js supports via the nonce prop / automatic CSP nonce propagation) and to the three ld+json <script nonce=...> tags, then replace 'unsafe-inline' in scriptSrc with the nonce. Two corrections to the fix text: (1) it says "keep 'strict-dynamic'" but the current CSP has NO strict-dynamic directive — this would be ADDING it, not keeping it; strict-dynamic is needed because GTM/Clarity inject further scripts dynamically and would otherwise be blocked once unsafe-inline is removed. (2) Note that style-src also retains 'unsafe-inline' (next.config.ts:22) — that's out of scope here but means full inline-script lockdown still leaves style-based vectors; acceptable for this finding. The cheaper interim fallback (externalize inline scripts, drop unsafe-inline in prod only) is also valid. Implementation caveat: static export / fully-cached pages cannot carry per-request nonces, so verify pages using ld+json are dynamically rendered or the nonce strategy is compatible.
- **검증 결과**: confirmed

#### F05 · `SEO` · /solution/design is a stray redirect to /solution/energy serving cloned Energy content/metadata (C2)  _(공수 S)_

- **영향 범위**: /solution/design
- **파일**: `app/solution/design/page.tsx:1-5`, `app/solution/design/layout.tsx:3-19`, `components/layout/Header.tsx:50-61`, `app/sitemap.ts:25-29`, `next.config.ts:96-103 (existing headers() block; redirects() must be ADDED, none exists)`
- **문제**: app/solution/design/page.tsx is a 5-line server redirect() to /solution/energy, and app/solution/design/layout.tsx hard-codes Energy metadata (title '에너지 스택 옵션', description, canonical '/solution/energy', og '에너지 스택 옵션'). So a 'Design' solution route both 307-redirects away AND mislabels itself as Energy, while resolving 200 with duplicated Energy content (duplicate-content + misleading UX). It is NOT referenced by Header nav (solution submenu lists only cctv/network/iot/energy) nor sitemap.ts, so it is reachable only via direct URL / legacy links. There is no real Design content anywhere.
- **증거**: app/solution/design/page.tsx:1-5 redirect('/solution/energy'); layout.tsx:4-15 title/canonical/og all '에너지 스택 옵션' & '/solution/energy'. evidence.json public[6] and public[22] show /solution/design status 200. digest /solution/design finalUrl=/solution/energy. No nav/sitemap references found.
- **제안 수정**: Decide intent. If Design is permanently gone: delete app/solution/design/ entirely (both files) and add a permanent 308 redirect in next.config.ts redirects() from /solution/design -> /solution/energy (or /solution) so external links/crawlers get a clean signal instead of a soft 200 duplicate. If Design should exist: build a real page.tsx with its own content and replace the Energy metadata in layout.tsx with Design-specific title/description/canonical. Verify no nav/sitemap references remain (none currently).
- **검증·수정안 보강**: The proposed fix is correct and safe. Two valid paths: (1) if Design is gone, delete app/solution/design/ (both page.tsx and layout.tsx) and add a redirects() function to next.config.ts mapping /solution/design -> /solution/energy with permanent:true (308); (2) if Design should exist, build real page.tsx content and replace the Energy metadata in layout.tsx with Design-specific title/description/canonical/og. Path 1 is preferable since there is zero real Design content and no inbound references. One refinement: the next.config.ts redirects() function does not currently exist; the fix must ADD it (sibling to the existing headers() at line 96). Either path resolves both the soft-200 duplicate-content signal and the mislabeled Energy metadata cleanly.
- **검증 결과**: adjust (파일행 보정됨)

#### F17 · `SEO` · Solution subpage <title>s lack brand suffix (C5)  _(공수 S)_

- **영향 범위**: /solution/cctv, /solution/iot, /solution/network, /solution/energy
- **파일**: `app/solution/cctv/layout.tsx:4`, `app/solution/iot/layout.tsx:4`, `app/solution/network/layout.tsx:4`, `app/solution/energy/layout.tsx:4`, `app/solution/layout.tsx:4`, `app/layout.tsx:29`
- **문제**: The root title template is '%s | 위트(weet)' (app/layout.tsx:29), but solution subpages render titles with NO brand suffix: /solution/cctv => '안심 출입 옵션', /solution/iot => '원격 준비 옵션', /solution/network => '끊김 없는 연결 옵션', /solution/energy => '에너지 스택 옵션'. These also read poorly in SERPs — internal option names with no product/brand context.
- **증거**: Live curl /solution/cctv: <title>안심 출입 옵션</title> (no suffix). digest.json titles for all four subpages lack '| 위트(weet)'.
- **제안 수정**: Give each solution subpage a self-contained, keyword-rich title including brand and context, e.g. 'CCTV·출입 보안 솔루션 | 위트(weet) 모듈러 운영 솔루션'. Ensure the rendered <title> carries the brand. Enrich og:title likewise.
- **검증·수정안 보강**: The proposed fix (self-contained brand+keyword-rich title per subpage, plus matching og:title) is correct and safe. But it omits the ROOT CAUSE: app/solution/layout.tsx:4 sets `title: "운영 솔루션"` as a bare STRING. In Next.js a string title is treated as title.absolute and RESETS the inherited template for descendants, so the root template `%s | 위트(weet)` (app/layout.tsx:29) reaches /solution itself (live: "운영 솔루션 | 위트(weet)") but is blocked from reaching the four subpages, which render bare. A simpler centralized fix: change app/solution/layout.tsx:4 to `title: { default: "운영 솔루션 | 위트(weet)", template: "%s | 위트(weet)" }`, restoring the suffix for all four subpages in one edit. The per-page approach is also valid and gives richer SERP context; best to combine both. The subpages also duplicate a bare openGraph.title (line 12) which should be enriched too, as the finding states.
- **검증 결과**: confirmed

#### F18 · `SEO` · /products page.tsx metadata overrides SEO-optimized layout.tsx, shipping thin title + 44-char description (C5)  _(공수 S)_

- **영향 범위**: /products
- **파일**: `app/products/page.tsx:7-18`, `app/products/layout.tsx:3-19`
- **문제**: Two competing metadata definitions for /products. layout.tsx:3-19 has a keyword-rich title ('이동식주택·소형주택 제품 라인업') and ~100-char description. But page.tsx:7-18 overrides with a thin title ('제품 소개') and a 44-char description. In Next.js the child page's metadata wins, so the optimized layout metadata is dead and the live page ships the weak version. digest confirms /products descLen=44.
- **증거**: layout.tsx:4 title='이동식주택·소형주택 제품 라인업' + rich desc; page.tsx:8 title='제품 소개', line 9 desc (44 chars). digest /products descLen=44, title='제품 소개 | 위트(weet)'.
- **제안 수정**: Remove the metadata export from app/products/page.tsx (lines 7-18) so the optimized layout metadata applies, OR delete the layout metadata and move the rich version into page.tsx. Keep a single source of truth with the keyword-rich title and ~120-150 char description.
- **검증·수정안 보강**: Fix is correct and safe. Verified Next.js metadata resolution: a page segment's metadata export deep-merges over and overrides its layout's metadata for the same fields, so page.tsx:7-18 (title '제품 소개', 44-char desc) wins and the keyword-rich layout.tsx version is dead. Removing the metadata export from app/products/page.tsx (lines 7-18) is the cleaner option: layout.tsx then supplies the keyword-rich title ('이동식주택·소형주택 제품 라인업' → rendered as '...| 위트(weet)' via root template), the 102-char description, the canonical '/products', the richer openGraph, and twitter.card. Note: also drop the now-redundant 'import type { Metadata } from next' line in page.tsx to avoid an unused-import lint error. The alternate option (move rich version into page.tsx, delete layout metadata) also works but keeping it in layout is fine since the layout only wraps this route.
- **검증 결과**: confirmed

#### F19 · `SEO` · No hreflang / alternates.languages despite KR/EN language switcher  _(공수 L)_

- **영향 범위**: All pages (i18n SEO)
- **파일**: `app/layout.tsx:171`, `app/layout.tsx:32-34`
- **문제**: The site advertises multiple languages via the Header switcher and stores EN content in the DB, but no page emits hreflang alternate links or sets Metadata alternates.languages (grep finds zero hreflang usage). html lang is hardcoded 'ko' (app/layout.tsx:171) regardless of selected language. Since the app serves a single URL per route (language toggled client-side), hreflang cannot be added meaningfully until localized routes exist — track as the SEO blocker for i18n.
- **증거**: grep for hreflang/languages:/alternates...languages returns no matches; language switcher exists; html lang hardcoded 'ko' (app/layout.tsx:171).
- **제안 수정**: Short term keep lang='ko' honest (current content is Korean). When introducing real localized routes (/en, /es or cookie-driven SSR), add Metadata alternates.languages with reciprocal hreflang + x-default and set <html lang> dynamically. Until localized URLs exist, do not fabricate hreflang. Track as the prerequisite for the i18n roadmap.
- **검증·수정안 보강**: The proposed fix is correct and safe. Keeping lang="ko" is the honest choice since served content is genuinely Korean by default (LanguageProvider initializes to 'KO' with no persistence). Crucially, the fix correctly warns against fabricating hreflang while only a single URL exists per route — adding alternates.languages now would point to non-existent localized URLs and harm SEO. The recommendation to gate hreflang + alternates.languages + x-default behind real localized routes (/en, /es or cookie-driven SSR) and dynamic <html lang> is the proper prerequisite ordering. No change needed to the fix.
- **검증 결과**: confirmed

#### F20 · `SEO` · Project detail pages: no canonical, no per-project og:image, force-dynamic, excluded from sitemap  _(공수 M)_

- **영향 범위**: /projects/[id]
- **파일**: `app/projects/[id]/page.tsx:9-33`, `app/sitemap.ts:14-34`
- **문제**: app/projects/[id]/page.tsx generateMetadata sets title/description/og but no alternates.canonical and no images, so each project detail has no canonical and inherits no og:image (per F04). It is force-dynamic (line 9) and /projects/[id] URLs are absent from sitemap.ts (only /projects listed). Completed project case studies are strong long-tail SEO content currently invisible to crawlers and with weak metadata.
- **증거**: page.tsx:11-33 generateMetadata returns no canonical, openGraph without images; line 9 dynamic='force-dynamic'. sitemap.ts:14-34 lists /projects but no /projects/[id]. getProjectHeroImage at line 49 unused for og:image.
- **제안 수정**: Add alternates.canonical: `/projects/${id}` and openGraph.images set to the project hero image in generateMetadata. Add completed projects to sitemap.ts by fetching public-ready projects (mirror isPublicReadyProject) and appending /projects/[id] entries with lastModified from updated_at. Consider ISR (revalidate) instead of force-dynamic.
- **검증·수정안 보강**: Proposed fix is correct and safe. (1) Add alternates.canonical: `/projects/${id}` and openGraph.images = [getProjectHeroImage(project)] in generateMetadata (page.tsx:24-32) — the helper getProjectHeroImage at line 49 already returns a validated absolute/`/images/` URL, so it can populate the og:image directly. (2) sitemap.ts (lines 14-34) currently lists only static routes; append /projects/[id] entries by fetching completed projects from supabase and filtering with isPublicReadyProject (mirroring the exact same gating used by the page at line 20/51), using updated_at/completed_at for lastModified. Note: making sitemap.ts async + Supabase fetch is fine since Next supports async sitemap. (3) ISR (export const revalidate = N) instead of force-dynamic is a reasonable improvement but optional — keep force-dynamic if admin wants instant publish reflection; this part is non-blocking. One correction to incorporate into the fix rationale: the canonical issue is not merely "absent." Because root layout (app/layout.tsx:32-34) sets alternates.canonical: "/", and Next.js resolves a default canonical, project pages currently emit (or risk emitting) the homepage as canonical rather than no canonical — so adding the per-project canonical also stops project pages from canonicalizing to "/".
- **검증 결과**: confirmed

#### F09 · `UX/Funnel` · Anchor links from mega-menu over-scroll by ~100px on /bespoke and /company (scroll-mt-[180px] vs 80px header)  _(공수 S)_

- **영향 범위**: /bespoke, /company (mega-menu anchor navigation)
- **파일**: `app/bespoke/page.tsx:152`, `app/bespoke/page.tsx:229`, `app/company/page.tsx:69`, `app/company/page.tsx:120`, `app/company/page.tsx:209`, `app/company/page.tsx:291`, `components/company/GallerySection.tsx:94`, `components/company/GallerySection.tsx:103`
- **문제**: The global Header is now max 80px tall (h-[70px] md:h-[80px], Header.tsx:227), but bespoke, company, and gallery sections still use the OLD offset scroll-mt-[180px]. When a user clicks a mega-menu submenu anchor (e.g. /company#philosophy, /company#crew, /bespoke#small-cafe), the section scrolls ~100px too high, leaving a large empty gap above the target heading. Makes primary discovery navigation feel broken on two key marketing pages. /modular correctly uses scroll-mt-[80px].
- **증거**: Header.tsx:227 sets max height 80px; bespoke/company/gallery use scroll-mt-[180px] while modular uses scroll-mt-[80px].
- **제안 수정**: Replace scroll-mt-[180px] with scroll-mt-[80px] (or scroll-mt-24 to match support) on the 8 affected sections in app/bespoke/page.tsx (152, 229), app/company/page.tsx (69, 120, 209, 291), and components/company/GallerySection.tsx (94, 103). Audit all scroll-mt values against the current 70/80px header.
- **검증·수정안 보강**: Fix is correct and safe. Replace scroll-mt-[180px] with scroll-mt-[80px] on all 8 sections to match the fixed header's actual max height (h-[70px] md:h-[80px], Header.tsx:227). Recommend scroll-mt-[80px] over scroll-mt-24 (96px) for an exact match to the 80px desktop header; scroll-mt-24 would leave a ~16px gap. Note that the header is 70px on mobile and 80px on md+, so scroll-mt-[80px] slightly overshoots by 10px on mobile — acceptable/negligible, and a perfect responsive match would be scroll-mt-[70px] md:scroll-mt-[80px]. The simple scroll-mt-[80px] is a sound, low-risk fix. /modular already correctly uses scroll-mt-[80px], confirming the intended value.
- **검증 결과**: confirmed

#### F29 · `UX/Funnel` · Configurator consultation form lacks native required/aria-invalid; validation is toast-only  _(공수 M)_

- **영향 범위**: /customize review step (primary conversion)
- **파일**: `components/customize/CustomizeConfigurator.tsx:408`, `components/customize/CustomizeConfigurator.tsx:1844`, `components/customize/CustomizeConfigurator.tsx:1847`, `components/customize/CustomizeConfigurator.tsx:1850`, `components/customize/CustomizeConfigurator.tsx:1900`, `components/ui/input.tsx`
- **문제**: In the final conversion step, ConsultationForm inputs for 이름/연락처/지역 are marked '필수' visually via the Field badge but the underlying <Input> elements have no required or aria-invalid (CustomizeConfigurator.tsx:1843-1851). Validation happens only in handleSubmit (408) via a single combined toast '이름, 연락처, 지역을 입력해주세요.' that does not indicate WHICH field is missing or move focus to it. Last step before conversion, where friction is most costly. Screen-reader users get no per-field invalid signal.
- **증거**: handleSubmit at 408 uses a single generic toast; inputs at 1843-1851 have no required/aria-invalid.
- **제안 수정**: Add required and aria-required to the three mandatory Inputs, set aria-invalid and an inline error message per field on submit, and focus the first invalid field. Keep the toast as a secondary cue. Reuse the Field component to render the per-field error text.
- **검증·수정안 보강**: Correct and safe. Adding required + aria-required + aria-invalid to the three Inputs is trivial since Input passes ...props through. Per-field error + focus-first-invalid requires (a) tracking an errors object in ConsultationForm state, (b) extending the Field component with an optional `error` prop to render inline error text (it currently only renders `helper`), and (c) refs/focus on first invalid field. Keep the toast as a secondary cue per the proposal. One refinement: if you add native `required`, the form's onSubmit calls event.preventDefault() unconditionally — native HTML5 validation still fires on submit attempt before your handler, so it composes fine, but rely on the JS per-field path for the authoritative UX. Effort is closer to S/low-M than M (mostly mechanical, single component touched).
- **검증 결과**: confirmed


### ⚪ P3

#### F08 · `Accessibility` · InquiryForm inputs use unassociated labels (no htmlFor/id)  _(공수 S)_

- **영향 범위**: Inquiry form (support / category inquiry pages)
- **파일**: `components/support/InquiryForm.tsx:89`, `components/support/InquiryForm.tsx:99`, `components/support/InquiryForm.tsx:111`, `components/support/InquiryForm.tsx:121`
- **문제**: components/support/InquiryForm.tsx renders each <label> as a sibling of its <input>/<textarea> with neither htmlFor/id pairing nor label-wrapping. The name, phone, email and message fields have no programmatic label; screen readers cannot announce field purpose, and clicking the label does not focus the field. The sibling ConsultForm.tsx does this correctly. Note: this form may be dead code (see F33). WCAG 1.3.1, 3.3.2, 4.1.2.
- **증거**: InquiryForm.tsx: label at 89 followed by <input name='name'> at 90 — no id/htmlFor; same at 99/100, 111/112, 121/122.
- **제안 수정**: Add a unique id to each input/textarea and htmlFor on the corresponding label (mirror ConsultForm.tsx lines 33-36), e.g. label htmlFor='inquiry-name' and input id='inquiry-name'. If the component is confirmed dead (F33), delete it instead.
- **검증·수정안 보강**: The proposed fix (add unique id + htmlFor mirroring ConsultForm.tsx) is technically correct and would resolve the WCAG label-association defect IF the component were live. But the stronger/correct path is the fix's own fallback: delete the component. grep confirms InquiryForm is imported nowhere in app/ or components/ — it is unreachable dead code, so adding labels would be polishing a corpse. Recommended fix: delete components/support/InquiryForm.tsx (and its now-unused submitInquiry path if also orphaned). The live inquiry/consult flow already uses ConsultForm.tsx, which has proper htmlFor/id associations.
- **검증 결과**: adjust

#### F23 · `Accessibility` · /customize flow has no landmarks (no main/header/nav) and no way back to site nav  _(공수 S)_

- **영향 범위**: /customize
- **파일**: `components/customize/CustomizeConfigurator.tsx:470`, `components/customize/CustomizeConfigurator.tsx:590`, `components/layout/ClientLayout.tsx:31`
- **문제**: ClientLayout.tsx returns the customize page bare (isConfigurator branch, 31-38) with no Header, Footer, or <main>. The customize page/layout contain no <main>, <header>, <nav> or role landmarks. Screen-reader landmark navigation has nothing to anchor to on the primary conversion page, and there is no persistent site navigation to escape the flow. WCAG 1.3.1 + discoverability.
- **증거**: ClientLayout isConfigurator branch renders {children} with no main/header (31-38); grep for '<main|<header|<nav|role=' in customize page/layout returned nothing.
- **제안 수정**: Wrap the configurator content in a <main> landmark and add at least a minimal header with the logo/home link (or a back-to-site link) so landmark navigation and escape are possible. The configurator already uses aria-label on its step list and dialogs, so adding the top-level main is low risk.
- **검증·수정안 보강**: Only the "add a <main> landmark" part is valid and warranted. Change the top-level wrapper of CustomizeConfigurator at components/customize/CustomizeConfigurator.tsx:470 from <div className="min-h-dvh ..."> to <main className="min-h-dvh ...">, OR have ClientLayout's isConfigurator branch (ClientLayout.tsx:31-38) wrap {children} in <main>. The rest of the proposed fix (add a minimal header with logo/home link / back-to-site link) is REDUNDANT — that already exists as ConfiguratorAppBar (a real <header> with a <Link href="/"> ArrowLeft "WEET" home link, lines 590-594). Adding a second header would be wrong. Low risk, S effort.
- **검증 결과**: adjust (파일행 보정됨)

#### F47 · `Accessibility` · Mobile menu hamburger toggle missing aria-expanded; close button missing accessible name  _(공수 S)_

- **영향 범위**: Header mobile menu
- **파일**: `components/layout/Header.tsx:251`, `components/layout/Header.tsx:388`
- **문제**: The mobile hamburger toggle (Header.tsx 251-258) has aria-label but no aria-expanded reflecting open/closed state, so AT users are not told whether the menu is expanded. The full-screen mobile menu close button (388-394) is icon-only (X) with no aria-label. The full-screen portal menu also does not move focus into the dialog or trap it. WCAG 4.1.2.
- **증거**: Hamburger button (251) has aria-label but no aria-expanded; close button (388-394) renders only <X/> with no aria-label.
- **제안 수정**: Add aria-expanded={mobileMenuOpen} and aria-controls to the hamburger button; add aria-label='메뉴 닫기' to the close button; on open move focus into the menu and restore it to the hamburger on close.
- **검증·수정안 보강**: Proposed fix is correct and safe. Add aria-expanded={mobileMenuOpen} and aria-controls (pointing to an id given to the portal menu container) on the hamburger button at line 251-258; add aria-label (e.g. '메뉴 닫기'/'Close menu', ideally language-aware since the app exposes a `language` state) to the close button at 388-394. For full WCAG compliance, also add role="dialog" + aria-modal to the portal container, move focus into the menu on open, restore focus to the hamburger on close, and trap focus + handle Escape. The aria-label/aria-expanded portion is trivially S; the focus-trap/dialog-semantics portion is closer to the upper end of S. Note: also consider localizing the labels — the hamburger's existing aria-label is hardcoded English ('Toggle mobile menu') while content elsewhere honors `language`.
- **검증 결과**: confirmed

#### F33 · `CodeQuality` · Dead, broken InquiryForm component is unused but ships in the bundle  _(공수 S)_

- **영향 범위**: /support (conversion form), codebase hygiene
- **파일**: `components/support/InquiryForm.tsx`, `app/support/page.tsx`
- **문제**: components/support/InquiryForm.tsx is not imported anywhere (support uses ConsultForm). It contains broken code: lines 28-30 attempt useActionState via (window as any).React?.useActionState which is never populated, and its SubmitButton/useFormStatus branch (12-24, 26-31) is dead. It duplicates ConsultForm's purpose; leaving it risks a future dev wiring up the broken version. (Related to the missing-label finding F08, which targets the same dead file.)
- **증거**: grep 'InquiryForm' across the repo returns only the file itself; app/support/page.tsx imports ConsultForm (24, 419).
- **제안 수정**: Delete components/support/InquiryForm.tsx. If a reusable inquiry form is desired, consolidate on ConsultForm's proven pattern (toast + form reset + zod server validation in submit-inquiry.ts).
- **검증·수정안 보강**: Fix is correct and safe: rm components/support/InquiryForm.tsx. Verified zero importers, so deletion breaks nothing. No need to "consolidate on ConsultForm" as an action — ConsultForm already is the live form on /support. Effort S accurate.
- **검증 결과**: adjust

#### F42 · `CodeQuality` · Native confirm()/alert() used in ~10 admin files, contradicting the sonner/toast convention  _(공수 M)_

- **영향 범위**: All admin destructive actions
- **파일**: `app/admin/settings/page.tsx:64`, `app/admin/projects/AdminProjectsClient.tsx:94`, `components/admin/products/DeleteProductButton.tsx:18`, `components/admin/inquiries/InquiryList.tsx:102`, `components/admin/gallery/GalleryList.tsx:25`, `components/admin/cms/MainCmsClient.tsx:210`, `components/admin/consultations/ConsultationManager.tsx:78`, `components/admin/cms/SupportEditor.tsx:171`, `components/admin/cms/SupportEditor.tsx:252`, `components/admin/customize/CustomizeManager.tsx:206`
- **문제**: CLAUDE.md mandates the sonner toast library and advises against blocking native dialogs. However native confirm()/alert() are used across ~10 admin files: settings migration (64), AdminProjectsClient (94), DeleteProductButton (18), InquiryList (102), GalleryList (25), MainCmsClient (210), SupportEditor (171 & 252), ConsultationManager (78), CustomizeManager (206). These are unstyled, untestable in Playwright without dialog handlers, inconsistent with the dark WEET console theme, and the destructive migration confirm (settings) is the highest-impact instance.
- **증거**: grep confirm()/alert() finds ~10 admin files; CLAUDE.md admin patterns: 'sonner ... (alert 사용 지양)'.
- **제안 수정**: Introduce a small useConfirm() hook backed by a Radix/shadcn AlertDialog (the project already uses Radix-style ui/ components), or sonner's action-toast pattern, and replace confirm() calls consistently. Keep success/failure feedback on toast. Prioritize destructive actions (delete product/FAQ/notice, run migration).
- **검증·수정안 보강**: Direction is sound (replace native confirm() with a consistent in-app pattern, keep sonner for success/failure feedback) but two corrections needed. (1) The fix asserts "the project already uses Radix-style ui/ components" implying an AlertDialog can be reused — false. components/ui/ contains badge/button/card/drawer/input/sheet/tabs etc. but NO Dialog or AlertDialog primitive (only sheet.tsx). Building useConfirm() on Radix AlertDialog therefore requires adding @radix-ui/react-alert-dialog as a new dependency, not reusing existing components. (2) The lower-risk, more-accurate path is sonner's action-toast pattern (toast.warning with confirm/cancel actions) since sonner is already imported in all 10 of these files — recommend leading with that. Either way, prioritize the settings:64 migration confirm (highest impact) and the delete actions. This is a quality/consistency cleanup, not a bug.
- **검증 결과**: adjust

#### F48 · `CodeQuality` · `catch (error: any)` with `error.message` access pattern repeated across cms-actions, leaking raw messages  _(공수 S)_

- **영향 범위**: /admin/main (hero slides CMS)
- **파일**: `app/actions/cms-actions.ts:135`, `app/actions/cms-actions.ts:165`, `app/actions/cms-actions.ts:197`, `app/actions/cms-actions.ts:240`
- **문제**: cms-actions.ts catches as catch (error: any) and returns error.message || 'Internal server error' (lines 135,165,197,240). Typing caught errors as any and reading .message directly is unsafe (thrown value may not be an Error) and leaks raw DB/internal messages to the admin client response. Duplicated ~6 times with verbose '--- SERVER: ... FAILED ---' debug logging.
- **증거**: cms-actions.ts:135,165,197,240 all catch (error: any) returning error.message || 'Internal server error'; verbose console.error logging.
- **제안 수정**: Type catches as catch (error: unknown) and use a shared helper getErrorMessage(error) (return error instanceof Error ? error.message : 'fallback'). Centralize the logging. Consider not returning raw error.message to the client for non-validation failures.
- **검증·수정안 보강**: Fix is correct and safe in direction: type catches as `unknown` and route through a shared `getErrorMessage(e) = e instanceof Error ? e.message : 'fallback'`. IMPORTANT caveat the fix must respect: these particular catch blocks predominantly re-surface INTENTIONAL user-facing Korean validation messages thrown via `throw new Error('메인 타이틀을 입력해주세요.')` etc. (lines 47-48, 66, 74-76, 31, 35). So the helper MUST keep `instanceof Error ? error.message` and NOT replace with a generic message, or it would break legitimate admin-facing validation feedback. The proposedFix's "consider not returning raw error.message to the client" should be applied only to the truly-unexpected branch, not blanket. Centralizing the verbose `--- SERVER: ... FAILED ---` logging is a fine cleanup. Note this is admin-only (every action gated by requireAdmin()), low blast radius.
- **검증 결과**: confirmed

#### F54 · `Content/i18n` · Permanent 'video coming soon' placeholder shipped on the homepage VideoSection  _(공수 S)_

- **영향 범위**: Home VideoSection
- **파일**: `components/sections/VideoSection.tsx:21`, `components/sections/VideoSection.tsx:24`
- **문제**: The homepage VideoSection renders a hardcoded placeholder card reading '영상 준비 중입니다' / 'weet의 이야기를 곧 만나보세요' with a non-functional play icon and no actual video (VideoSection.tsx:21-25). The section title is i18n-driven (t.main.video.title) but the placeholder body copy is hardcoded Korean and never switches to EN, and there is no video source — a 'coming soon' stub presented as a primary homepage section.
- **증거**: VideoSection.tsx:16-26 placeholder card with '영상 준비 중입니다' and 'weet의 이야기를 곧 만나보세요', no <video>/embed; title uses t.main.video.title (13) but body copy hardcoded.
- **제안 수정**: Either supply the real video (embed/MP4) or, until then, hide the VideoSection from the homepage rather than shipping a permanent placeholder. If kept, move the placeholder body strings into the dictionary (main.video.pendingTitle / pendingDesc) so they translate.
- **검증·수정안 보강**: The proposed fix's core insight (avoid shipping a permanent placeholder) is right, but the actual situation makes the simplest correct fix DELETE the dead component, not "hide it from the homepage" (it isn't on the homepage). Recommended: remove components/sections/VideoSection.tsx entirely since it has zero references. If the company genuinely plans a video section later, the dictionary already has main.video.{title,description,overlayTitle,overlayDesc} entries (constants/dictionaries.ts:44-49 KR, 238-243 EN) that an eventual real VideoSection should consume — note the current component ignores description/overlayTitle/overlayDesc and hardcodes Korean placeholder copy instead, which is further evidence it's a stale/abandoned stub. The i18n suggestion to add pendingTitle/pendingDesc keys is unnecessary if the component is deleted.
- **검증 결과**: adjust

#### F34 · `Routing/Runtime` · Empty /admin/bespoke directory produces a 404 admin route (dead artifact)  _(공수 S)_

- **영향 범위**: /admin/bespoke
- **파일**: `app/admin/bespoke/`, `components/admin/AdminSidebar.tsx (no bespoke reference; line 30 ref is irrelevant)`
- **문제**: app/admin/bespoke/ exists as an empty, git-untracked directory with no page.tsx, so /admin/bespoke 404s (confirmed C3, evidence.json admin[3] status 404, shots/admin_bespoke_admin.png). Contrary to the C3 hypothesis there is NO dead nav link — AdminSidebar.tsx navigation does not reference bespoke and a repo-wide grep returns zero matches. It is leftover scaffolding producing a stray 404 route surface.
- **증거**: ls app/admin/bespoke -> empty; git ls-files returns nothing (untracked); evidence.json admin[3] status 404, h1='404'; grep 'admin/bespoke' across app/components/middleware/utils -> no matches.
- **제안 수정**: Delete the empty app/admin/bespoke/ directory (rm -rf). Since it is untracked, remove it locally and ensure it is not committed. If a bespoke admin surface is intended, create app/admin/bespoke/page.tsx and add a corresponding AdminSidebar entry.
- **검증·수정안 보강**: Correct and safe. `rm -rf app/admin/bespoke/` removes the untracked empty directory with no side effects (nothing references it; AdminSidebar has no bespoke entry; git does not track empty dirs). The conditional alternative (create page.tsx + sidebar entry if a bespoke admin is intended) is reasonable but unneeded — no code expects this route.
- **검증 결과**: adjust (파일행 보정됨)

#### F49 · `Security` · Image upload validates only client-supplied MIME type, no magic-byte check  _(공수 S)_

- **영향 범위**: /admin product, gallery, project image uploads
- **파일**: `app/actions/storage-actions.ts:31`, `components/admin/media/ImageUpload.tsx:67`
- **문제**: uploadImageAction (app/actions/storage-actions.ts) gates uploads on file.type against an allowlist (line 31) and a path regex (27), but file.type is the browser-supplied MIME string and is spoofable when the server action is invoked directly. An authenticated admin could store a non-image payload typed 'image/webp' with a '.webp' path; Supabase would serve it with that contentType. Impact is limited (requireAdmin-protected, allowlisted bucket, path traversal blocked, 5MB cap) — defense-in-depth gap, not public RCE.
- **증거**: storage-actions.ts:31 gates on file.type (browser-supplied, spoofable); requireAdmin at line 12; size cap 5MB.
- **제안 수정**: Sniff the actual file signature server-side (read first bytes / use a lib like file-type) and reject if it does not match an allowed image magic number, in addition to the MIME and extension checks.
- **검증·수정안 보강**: Correct and safe. storage-actions.ts:31 validates only file.type (browser-supplied, spoofable) and the same value is forwarded as Supabase contentType at line 47, so a spoofed image/webp payload would be stored and served with that contentType. The proposed magic-byte sniff is the right defense. Notably the action already materializes the full file into a Buffer at line 41-42 (arrayBuffer/Buffer.from), so checking the first bytes adds zero extra I/O — the fix can sniff `buffer` directly (e.g. JPEG FF D8 FF, PNG 89 50 4E 47, GIF 47 49 46, WEBP RIFF....WEBP) before the upload at line 44, no need for a heavy dependency. Keep the existing MIME+path checks and add the signature check as an additional gate.
- **검증 결과**: confirmed

#### F50 · `Security` · Middleware admin-login exemption references a nonexistent /admin/login path (dead code)  _(공수 S)_

- **영향 범위**: /admin/* auth gate
- **파일**: `utils/supabase/middleware.ts:38-46`, `app/admin/layout.tsx:12`
- **문제**: utils/supabase/middleware.ts:40 exempts '/admin/login' from the unauthenticated redirect, but the real login route is /login (app/login/page.tsx), outside /admin and never matched by the startsWith('/admin') guard. The exemption is dead code, and the comment 'Assuming /login is the login page' signals fragility — if a developer later adds an /admin/login route trusting this exemption, it would be left unauthenticated. Admin authz is correctly enforced in depth by app/admin/layout.tsx (requireAdmin) and every server action.
- **증거**: middleware.ts:40 checks pathname==='/admin/login'; ls app/admin/login -> no dir; login route is app/login/page.tsx.
- **제안 수정**: Remove the stale /admin/login special-case (lines 40-42) since /login is not under /admin, or align the exemption to the actual login path. Keep relying on the layout + requireAdmin checks as the authoritative gate.
- **검증·수정안 보강**: Fix is correct and safe. Removing lines 40-42 is the right call: /login lives outside /admin (app/login/page.tsx), so it never enters the startsWith('/admin') branch and needs no exemption. The dead '/admin/login' case can never fire because no such route exists. Defense-in-depth holds regardless — app/admin/layout.tsx:12 calls requireAdmin() and redirects to /login on failure, and server actions enforce authz independently. Prefer plain removal over re-aligning the exemption, since aligning it to /login would be redundant. No regression risk.
- **검증 결과**: confirmed

#### F43 · `SEO` · Duplicate/conflicting metadata between customize layout and page  _(공수 S)_

- **영향 범위**: /customize
- **파일**: `app/customize/layout.tsx:3-6`, `app/customize/page.tsx:8-21`
- **문제**: app/customize/layout.tsx:3-6 defines title '주문하기' and a description, while app/customize/page.tsx:8-21 defines a different richer title ('이동식주택 맞춤 구성·예상 견적') plus canonical/openGraph. The page wins (live title is the page version), so the layout metadata is dead code that misleads maintainers and risks the wrong title shipping if the page metadata is removed. Same anti-pattern as /products (F18).
- **증거**: layout.tsx:4 title='주문하기' (no canonical/og); page.tsx:9 title='이동식주택 맞춤 구성·예상 견적', canonical 13, og 15-20.
- **제안 수정**: Remove the redundant metadata export from app/customize/layout.tsx (it provides no canonical/og anyway) and keep the single optimized definition in page.tsx.
- **검증·수정안 보강**: Fix is correct and safe. app/customize/page.tsx (lines 8-21) defines title, description, canonical (alternates.canonical), and openGraph — a strict superset of what layout.tsx provides (only title + description). In Next.js App Router, page metadata merges over and overrides same-key layout fields, so the page's title already wins at runtime (consistent with live evidence). Removing the metadata export from layout.tsx loses nothing user-facing and eliminates the dead/misleading title. The layout function itself (pass-through returning children) can remain; only the metadata export should be deleted.
- **검증 결과**: confirmed

#### F44 · `SEO` · Thin meta descriptions on /privacy (28 chars) and /terms (24 chars) (C5)  _(공수 S)_

- **영향 범위**: /privacy, /terms
- **파일**: `app/privacy/page.tsx:6,13`, `app/terms/page.tsx:6,13`
- **문제**: Legal pages have near-empty descriptions: app/privacy/page.tsx:6 '위트(WEET) 개인정보처리방침 안내 페이지입니다.' (28 chars) and app/terms/page.tsx:6 '위트(WEET) 이용약관 안내 페이지입니다.' (24 chars). Descriptions this short give Google nothing to work with and may be auto-overwritten.
- **증거**: digest.json /privacy descLen=28, /terms descLen=24.
- **제안 수정**: Expand each to ~80-120 chars summarizing document scope and effective date (privacy: which personal data is collected, purpose, retention, contact). Keep brand and a sentence of unique context.
- **검증·수정안 보강**: Fix is correct and safe — a pure metadata content change with zero functional risk. One refinement: each file repeats the same thin string in TWO places (the page `description` on line 6 AND the `openGraph.description` on line 13). The expanded ~80-120 char copy should be applied to BOTH lines in each file (or factor the string into a const reused by both), otherwise the og description stays thin. Content should stay honest per site-content-model constraints: describe document scope without inventing specifics (e.g., effective date) that aren't actually in the rendered legal text — if an effective date is shown on the page, mirror it; otherwise omit it rather than fabricate.
- **검증 결과**: confirmed

#### F45 · `SEO` · No BreadcrumbList structured data on deep pages  _(공수 M)_

- **영향 범위**: Deep pages (/solution/*, /products, /projects/[id])
- **파일**: `app/solution/cctv/layout.tsx`, `app/products/page.tsx`, `app/projects/[id]/page.tsx`
- **문제**: JSON-LD coverage is good for Organization/WebSite/LocalBusiness (root), FAQPage (/support), and Product ItemList (/customize), but there is no BreadcrumbList anywhere (grep confirms none). Deep pages would benefit from BreadcrumbList to surface breadcrumb rich results and reinforce site hierarchy.
- **증거**: grep 'BreadcrumbList' across app/components/lib: no matches. Existing JSON-LD at layout.tsx:115-168, support/page.tsx:136, customize/page.tsx:34-53.
- **제안 수정**: Add a small reusable BreadcrumbList JSON-LD emitter and include it on solution subpages, /products, and /projects/[id] (Home > Solution > CCTV, etc.).
- **검증·수정안 보강**: Fix is correct and safe. A reusable BreadcrumbList emitter (a component rendering <script type="application/ld+json">) added to solution subpage layouts, /products/page.tsx, and /projects/[id]/page.tsx is the right approach and matches the existing JSON-LD pattern (dangerouslySetInnerHTML JSON.stringify, as in support/page.tsx:149 and customize/page.tsx:57). The cctv layout.tsx is metadata-only and returns children, so injecting JSON-LD there (or in a shared solution layout) is clean. For /projects/[id] the breadcrumb names should be resolved from the fetched project data inside the existing async page. One refinement: BreadcrumbList item URLs must use the canonical www host consistently with C4's fix to avoid the same non-www/www mismatch. Effort is closer to S-M than M — it is static per-page JSON-LD with no data dependency except the dynamic project title.
- **검증 결과**: confirmed

#### F46 · `SEO` · Sitemap uses build-time lastModified for all routes and omits dynamic content  _(공수 M)_

- **영향 범위**: sitemap.xml
- **파일**: `app/sitemap.ts:11-42`, `app/projects/[id]/page.tsx`, `app/actions/project-actions.ts`, `lib/projects/publicProjects.ts`
- **문제**: app/sitemap.ts sets lastModified = new Date() for every route at request time (line 12), so all 15 URLs always report 'just now' as lastmod, which is dishonest and trains crawlers to ignore lastmod signals. It also omits all dynamic detail URLs (/projects/[id]).
- **증거**: app/sitemap.ts:11-12 const lastModified = new Date(); applied to every entry (38). Only 15 static paths (19-33); no dynamic projects.
- **제안 수정**: For static pages use a fixed/last-deploy date or per-page known update dates rather than new Date(). For DB-backed pages (projects, products if indexable) fetch updated_at and set per-URL lastModified. Append dynamic project URLs.
- **검증·수정안 보강**: Sound, with one important refinement. Verified the line refs exactly: app/sitemap.ts:12 `const lastModified = new Date();` and line 38 applies that same value to every entry via `.map()`. Routes array (lines 19-33) contains exactly 15 static paths and no dynamic entries. The proposed fix (fixed/deploy date for static pages, per-URL updated_at for DB-backed pages, append dynamic /projects/[id]) is correct and feasible: projects are DB-backed (`from('projects')` in app/projects/[id]/page.tsx:38 and app/actions/project-actions.ts), the route exists at app/projects/[id]/page.tsx, and `updated_at` is referenced in the codebase. CRITICAL ADDITION: any appended project URLs MUST be filtered through `isPublicReadyProject` (lib/projects/publicProjects.ts — requires status === 'completed' and a valid image), otherwise unpublished/draft projects would leak into the sitemap. Also note the project SELECT in project-actions uses `select('*')`, so updated_at must actually exist as a column (confirmed referenced in tests via created_at; verify updated_at column presence before relying on it, fall back to created_at or deploy date). Effort M is reasonable given the DB fetch + filter logic.
- **검증 결과**: confirmed

#### F51 · `UX/Funnel` · Login server action drops error feedback; failed logins show no message  _(공수 S)_

- **영향 범위**: /login
- **파일**: `app/login/actions.ts:14`, `app/login/actions.ts:26`, `app/login/page.tsx:21`
- **문제**: app/login/actions.ts redirects to /login?error=Could not authenticate user on invalid input (line 14) and auth failure (26), but app/login/page.tsx never reads searchParams, so the error param is never displayed. Admins entering a wrong password get a silent reload with no feedback. Security-wise acceptable (no reflected output, fixed internal redirect path) but the UX is broken and the error param is dead.
- **증거**: login/actions.ts:14,26 redirect with ?error=...; login/page.tsx never reads searchParams.
- **제안 수정**: Read searchParams.error in app/login/page.tsx and render a statically-mapped (not raw-interpolated) error banner, or surface the failure via useFormState. Do not echo the raw query string into the DOM.
- **검증·수정안 보강**: Proposed fix is correct and safe. app/login/page.tsx is a server component that takes no props and never reads searchParams, so the ?error= query param appended by the redirects on actions.ts:14 and :26 is never surfaced — confirmed dead. Recommended: make LoginPage accept `searchParams` (in Next 15 App Router this is a Promise that must be awaited, e.g. `async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> })` then `const { error } = await searchParams`), and render a banner driven by a static mapping (e.g. always show a fixed "아이디 또는 비밀번호가 올바르지 않습니다." message when `error` is present) rather than interpolating the raw query string into the DOM, avoiding any reflected-XSS surface. useFormState/useFormStatus is an alternative but requires converting the form area to a client component, so the searchParams approach is the lighter fix. Effort S is accurate.
- **검증 결과**: confirmed

#### F55 · `UX/Funnel` · Primary CTA labeled '주문하기' (Order) leads to a consultation configurator, not a purchase  _(공수 S)_

- **영향 범위**: Global header primary CTA, conversion entry point
- **파일**: `components/layout/Header.tsx:249`, `components/layout/Header.tsx:322`, `components/layout/Header.tsx:404`
- **문제**: The header's primary CTA reads '주문하기' / 'Order' (Header.tsx:249,322,404) and links to /customize. However /customize is explicitly a consultation/estimate request flow — the copy states 상담 요청이며 결제는 진행되지 않습니다 (COPY.notPayment) and the final button is '상담·견적 요청하기'. Calling the entry CTA 'Order' sets a checkout/payment expectation the flow does not deliver, which can cause drop-off.
- **증거**: CTA text '주문하기'/'Order' -> /customize, whose COPY.notPayment says '상담 요청이며 결제는 진행되지 않습니다' (CustomizeConfigurator.tsx:104).
- **제안 수정**: Align the CTA label with the actual action, e.g. '맞춤 구성하기' / 'Configure' or '견적 받기' / 'Get a Quote' instead of '주문하기' / 'Order', so the label matches the consultation/estimate outcome.
- **검증·수정안 보강**: Fix is correct and safe. The 3 cited lines are the only header CTA labels (mobile bar:249, desktop primary:322, mobile menu:404), all gated on `language === 'KO' ? '주문하기' : 'Order'` and all href="/customize". Relabeling to '맞춤 구성하기'/'Configure' or '견적 받기'/'Get a Quote' aligns the label with the actual consultation/estimate outcome. Trivial string-only change, no behavioral risk. Note: header only exposes KO/EN toggles (no ES), so updating both KO and EN variants fully covers it — the proposed fix already does. Optionally extract the label to a shared constant to keep the 3 occurrences in sync.
- **검증 결과**: confirmed

#### F56 · `UX/Funnel` · 404 not-found page hover style uses primary-dark on a black button; no recovery links  _(공수 S)_

- **영향 범위**: 404 page (all unmatched routes)
- **파일**: `app/not-found.tsx:16`
- **문제**: app/not-found.tsx is functional with a 'home' link, but the only CTA uses bg-black with hover:bg-primary-dark (yellow/amber). White text on amber hover hurts contrast and the black-to-amber transition is jarring/off-brand. There is no secondary recovery path (e.g. /products or /support) and no English variant despite EN support. This is the recovery surface for every broken/old link (e.g. the dead routes).
- **증거**: not-found.tsx:16 className 'bg-black ... hover:bg-primary-dark'; single home link only.
- **제안 수정**: Use a brand-consistent hover (e.g. hover:bg-gray-800) matching other buttons, and add 1-2 secondary recovery links (제품 보기 /products, 고객지원 /support). Optionally localize via useLanguage.
- **검증·수정안 보강**: The proposed fix is partly wrong and should be revised. The `bg-black hover:bg-primary-dark` (black to amber) hover is NOT off-brand or anomalous — it is the site's ESTABLISHED primary-CTA convention, used identically in components/sections/SignatureLineClient.tsx:68, components/sections/SNSGalleryClient.tsx:73, and components/support/InquiryForm.tsx. Switching the 404 CTA to hover:bg-gray-800 (the generic ui/button.tsx default variant) would make it LESS consistent with the marketing-CTA pattern, not more — so do NOT change the hover color. The white-on-amber (#E5A410) contrast note is a legitimate WCAG concern but it is a site-wide pattern, out of scope for a 404-specific fix. The genuinely safe, actionable improvements: (1) add 1-2 secondary recovery links (e.g. 제품 보기 /products, 고객지원 /support) since this is the recovery surface for known dead routes C2 and C3; (2) optionally localize via useLanguage given EN/ES support — note not-found.tsx is a server component so this needs a small client wrapper. Effort stays S.
- **검증 결과**: adjust

---

## 거짓양성으로 제외된 항목

- **F11** LCP hero/product images use loading='eager' but never priority — no preload, slower LCP
  - 기각 사유: Adversarial refutation succeeded. Evidence claim "grep priority= returns only sitemap.ts / No Image has priority prop" is FALSE: priority is used on next/image in ~15 places (app/page.tsx:139, app/modular/page.tsx:156, app/projects/page.tsx:109/162, Header.tsx:237, SolutionTemplate.tsx:95, ImageSlider.tsx:54, etc.). The headline 'hero image is the LCP element on home' in HeroCarouselClientComponent is also false: that component is unused (HeroCarousel wrapper imported nowhere), and the genuine home hero (app/page.tsx static webp) already has priority at line 139. The only true residual — ProductsPageClient.tsx:621 eager-without-priority and ProductGrid mapping priority->loading — is a real micro-optimization but admin-only/products-only and neutralized by C1's 402 on those images. P1 is unjustified given the false premises.
- **F16** Inconsistent company contact phone between privacy page (personal mobile) and footer
  - 기각 사유: Adversarially refuted. The finding's premise is inverted. (1) Footer.tsx:35,41 renders settings.contact_phone ('010-9645-2348'), NOT the dictionary 'TEL : 1566-6734' — grep for any rendered use of the dictionary .tel returns zero hits. (2) 010-9645-2348 is the canonical number across structured data (layout.tsx:132,156), SITE_SETTING_DEFAULTS (site-settings.ts:29), homepage/support/ConsultBar/customize CTAs — so it is intentional, not a leaked personal mobile. (3) constants/dictionaries.ts is not imported anywhere; its footer block (incl. mismatched 경기도 이천시 address and 468-81-03099 biz num vs live 전남 함평군 / 660-86-01862) is dead data. There is NO user-facing privacy-vs-footer phone inconsistency, so the P1 compliance/factual-inconsistency claim does not hold. Real residual issue is only stale dead data in dictionaries.ts -> P3 cleanup. The proposed fix (switch privacy to 1566-6734) is unsafe and would create the very inconsistency it claims to fix.

---

## 부록: 방법론 & 증거

- **라이브 크롤**: 공개 16라우트 ×(데스크톱/모바일) + 관리자 13페이지, Playwright/Chromium, HTTP 상태·메타·OG·canonical·콘솔에러·깨진이미지/링크·a11y 카운트·perf 타이밍 수집
- **관리자 로그인 검증**: `weet@weet.com` → `/admin` 정상 (대시보드 "작업실" 확인)
- **차원**: SEO / 접근성 / 성능·이미지 / 코드품질·아키텍처 / 보안·데이터 / 콘텐츠·i18n / UX·전환퍼널 / 관리자 / 라우팅·런타임 / 비주얼
- **검증**: 각 canonical 발견을 독립 에이전트가 코드 대조로 반론 검증, 거짓양성 제거 및 심각도/파일행 보정
- **제외(양성 노이즈)**: 자체 LCP 측정 유발 "Deprecated API" 경고, GA/clarity beacon ERR_ABORTED, `?_rsc=` prefetch 취소

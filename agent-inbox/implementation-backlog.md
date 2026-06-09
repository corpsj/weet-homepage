# Implementation Backlog

This file tracks bugs and improvements discovered during the recursive improvement loop.

## Critical user-reported bug

- [x] `/customize` 주문하기 도면에서 3x6, 3x9 도면이 모두 오버레이된 듯 보임. 
  - *Fix Details*: `hasBaseImage`일 때 `model-footprint` rect(동적 프레임)가 중복 렌더링되지 않도록 수정함.
  - *Root Cause Follow-up*: 실제 공개 카탈로그에서 `compact-3x6`와 `standard-3x9`가 모두 `/images/customize/dummy-base.svg`를 참조하고 있어 두 모델 도면이 같은 크기/형태로 보였음.
  - *Final Fix*: placeholder `dummy-base.svg`가 내려오면 모델별 기본 SVG(`/images/customize/compact-3x6-base.svg`, `/images/customize/standard-3x9-base.svg`)로 대체하고, 이미지 로드 실패 시 생성형 `model-footprint` fallback을 복구하도록 수정함. E2E가 compact/standard href 차이와 base image 실패 fallback을 검증함.

## Admin Redesign Progress

- [x] Admin Shell 및 Dashboard의 Premium Technical Console 리디자인 (Charcoal/black 사이드바, Accent color 적용).
  - *Note for future*: 새로운 관리자 대시보드 구조에 맞춰 하위 페이지(products, projects, consultations)들 또한 `rounded-md`, border 위주의 심플한 console 형태로 순차적 UI 통일이 필요함.
- [x] Admin 하위 핵심 운영 화면 1차 콘솔화: 제품 관리, 프로젝트 관리, 상담 관리, 웹 로그 분석.
  - *Fix Details*: 공통 `ConsolePrimitives`를 추가하고 제품/프로젝트/상담/인사이트 화면에 `ConsolePageHeader`, `ConsoleMetricCard`, `ConsolePanel`, `ConsoleStatusPill`, `ReadinessRing`을 적용함.
  - *QA Evidence*: `e2e/public-pages.spec.ts`에 PC/tablet/mobile 관리자 콘솔 회귀 테스트를 추가했고, `.codex/qa/admin-console-slice/summary.json`에서 12개 화면 모두 핵심 probe 표시, horizontal overflow 없음, visible offscreen control 0, console/page error 0을 확인함.

## New findings

- [x] Playwright 검증 중 `Standard 3x9` 모델도 베이스 도면을 사용하지만 테스트가 생성형 `model-footprint` 도면을 기대해 실패함. 테스트를 베이스 도면 단일 렌더링 기대값으로 갱신함.
- [x] 태블릿/모바일 `/customize` 감사 스크립트가 드로어를 닫기 전 본문 H1을 확인해 모델 전환 증명이 불완전했음. 태블릿/모바일에서 `옵션 구성` 드로어로 `Standard 3x9`를 선택하고 닫은 뒤 H1, 가격, `base-floorplan-image` 1개, `model-footprint` 0개를 검증하는 E2E를 추가함.
- [x] 공개 홈페이지: 도면 확대/전체화면 보기 기능이 필요함. 모바일/고령 구매자는 현재 SVG 라벨을 작게 느낄 수 있음.
  - *Fix Details*: `/customize` FloorplanPreview에 `도면 크게 보기` 아이콘 버튼과 mobile-safe zoom dialog를 추가함. 같은 `FloorplanCanvas`를 재사용해 선택 모델/옵션과 stale copy가 어긋나지 않도록 했고, 모바일 E2E로 open/base image single render/close를 검증함.
- [x] `/customize`: 모델 비교, 추천 용도, 포함/별도 준비, 현장 별도 준비 항목을 주문 흐름 가까이에 배치함.
  - *Fix Details*: 도면 아래에 `어떤 모델이 적합할까요?`, `포함 사항 및 별도 준비`, `현장 체크리스트` 섹션을 추가하고 PC/tablet/mobile Playwright QA로 도면 단일 렌더링과 체크 토글 안전성을 검증함.
- [x] `/customize`: 부지 가능성 자가진단(도로 폭, 트럭/크레인 접근, 전기/수도, 기초, 지역)을 추가함.
  - *Fix Details*: 5개 체크 항목에 `aria-pressed` 상태를 적용하고, 체크 토글 후에도 base floorplan image 1개/`model-footprint` 0개가 유지되는 E2E를 추가함.
- [x] `/customize` 모바일: 현장 체크리스트 마지막 항목이 하단 고정 주문 바 뒤로 들어가는 문제를 수정함.
  - *Fix Details*: conversion confidence 영역의 모바일 하단 여백을 늘리고, 최하단 스크롤에서 마지막 체크 항목이 `주문하기` 버튼 위에 남는지 E2E와 좌표 기반 QA로 검증함.
- [x] GPT Pro delayed-report snippet에서 지적된 `floorplanImagePath` 존재 여부만으로 fallback을 끄는 리스크를 로컬 검증으로 재현/수정함.
  - *Fix Details*: SVG `<image>` onError 의존 대신 `window.Image()` preloader로 base floorplan 로드 성공/실패를 판별하고, 실패 시 generated fallback 도면을 보여줌.
- [x] 실제 `we-et.com` 모바일 검증 중 `/customize` 확대 모달이 열리는 순간 `Standard 3x9` base SVG 대신 generated `model-footprint` fallback을 잠깐 표시하는 문제를 발견함.
  - *Root Cause*: 기본 도면과 확대 모달의 `FloorplanCanvas`가 각각 별도 이미지 로드 상태를 시작해, 기본 화면에서 이미 로드된 SVG 상태가 모달에 공유되지 않았음.
  - *Fix Details*: 현재 모델의 floorplan path/load status를 상위 `CustomizeConfigurator`에서 한 번 계산하고 기본 도면, 확대 모달, 상담 요청 모달 미리보기에 공유하도록 수정함. 로컬 E2E 10개, lint, unit test, production build 통과.
- [x] 배포 검증: `agent-inbox/웹 접속 방법.md` 지시에 따라 브랜치 푸시 후 Vercel Promote를 통해 실제 `we-et.com` 화면에서 PC/tablet/mobile 검증을 수행함.
  - *Final Production Evidence*: 커밋 `5fff2fc`를 Vercel Production으로 Promote한 뒤 `https://we-et.com/customize?v=5fff2fc`에서 desktop/tablet/mobile Playwright QA를 실행함. compact/standard main SVG href 분리, zoom modal 즉시 standard SVG 표시, dialog footprint 0개, sticky CTA clearance, horizontal overflow 없음, console/page error 없음을 확인함.
- [x] 관리자 페이지 모바일/태블릿: 닫힌 사이드바의 링크가 화면 왼쪽 밖에 남아 포커스 가능한 상태로 감지되는 문제를 수정함.
  - *Root Cause*: `AdminShell`의 mobile sidebar가 `translate-x-full`로만 숨겨져 `visibility: visible` 상태를 유지했음.
  - *Fix Details*: 닫힌 mobile/tablet sidebar wrapper에 `max-lg:invisible max-lg:pointer-events-none`을 추가하고 desktop `lg:translate-x-0` 동작은 유지함. 로컬 lint/unit/build/admin E2E 통과 후 재배포 검증 대상으로 지정함.
- [ ] 공개 홈페이지: 운반/설치 비용 예시, 지역별 변수, 상담 후 가격 변동 기준을 더 구체적인 숫자/조건으로 보강해야 함.
- [ ] 공개 홈페이지: `/support`에도 부지 가능성 자가진단을 독립 콘텐츠 또는 다운로드 체크리스트로 확장해야 함.
- [ ] 공개 홈페이지: B2B/다량 구매/기관 상담 경로와 상담 폼 필드(수량, 납기, 목적, 부지 상태)를 추가해야 함.
- [ ] 공개 홈페이지: ChatGPT 이미지 생성 또는 실제 촬영 기반으로 hero/product/interior/transport/install proof visual을 업그레이드해야 함.
- [x] 공개 홈페이지: `/modular`를 새 GPT 생성 이미지 기반으로 완전 리뉴얼하고 공장 제작, 운송/설치, 실내 쾌적성, 확장/이동성을 고객 관점으로 재구성함.
  - *Fix Details*: Chrome/ChatGPT `최신 • 5.5` Thinking `확장` 이미지 모드로 `modular-hero`, `factory-precision`, `transport-install`, `interior-comfort`, `flexible-commercial`을 각각 생성하고 `/modular`에 적용함.
- [x] 공개 홈페이지: `/bespoke`를 상업 공간 맞춤 솔루션으로 재포지셔닝함.
  - *Fix Details*: 카페/매장, 팝업/쇼룸, 숙박/워크스페이스, 스마트팜/랩 케이스로 구성하고, 모바일에서는 설명이 이미지보다 먼저 읽히도록 순서를 조정함.
- [x] 공개 홈페이지: `/solution`을 고객 관점의 운영 패키지 페이지로 재구성함.
  - *Fix Details*: 기존 기술 카드식 구성을 없애고 `해결하는 문제`, `도입 환경`, `패키지 구성`, `추천 시점` 기반의 행형 운영 솔루션 UI로 변경함.
- [x] 공개 홈페이지: `/bespoke` full-page visual QA에서 below-the-fold 텍스트가 hidden animation 때문에 사라지는 문제를 수정함.
  - *Fix Details*: 섹션 텍스트의 `whileInView` opacity/side-slide 초기 상태를 제거하고 직접 렌더링되도록 변경함.
- [x] 공개 홈페이지: 헤더에서 `주문하기`가 일반 메뉴 중간에 묻혀 구매 CTA로 충분히 강조되지 않는 문제를 수정함.
  - *Fix Details*: Antigravity IDE에 프론트엔드 구현을 위임한 뒤 Codex가 보정/검수했다. `Header.tsx`에서 `주문하기/Order`를 일반 navigation 배열에서 제거하고, 데스크톱 우측 독립 CTA와 모바일 헤더/전체 메뉴 CTA로 승격했다.
  - *Pro Fix*: GPT-5.5 Pro marker `WEET_REVIEW_20260609_HEADER_CTA_03`가 데스크톱 한국어 CTA `aria-label`과 보이는 텍스트 불일치를 `MUST_FIX`로 지적했고, `aria-label`을 `주문하기`로 맞췄다.
  - *QA Evidence*: `.codex/qa/header-cta-20260609-local/summary.json`에서 desktop `1440x900`, desktop `1280x900`, tablet `834x1112`, mobile `390x844` 모두 horizontal overflow `false`, page error `0`, `ctaLabelInName: true`를 확인했다. 1280/390 screenshot을 수동 확인해 텍스트 겹침이 없음을 확인했다.
  - *Production Evidence*: commit `5d64823`을 Vercel 웹 UI에서 production으로 promote한 뒤 `https://www.we-et.com/?v=5d64823`에서 desktop/tablet/mobile CTA 표시, click-to-`/customize`, mobile menu CTA, overflow 없음, console/page error 0을 확인했다. 증거는 `.codex/qa/production-header-cta-5d64823/summary.json`에 저장했다.
- [ ] 공개 홈페이지: `/bespoke`의 기존 cafe/popup/smart-farm 이미지를 새 GPT 5.5 Thinking 확장 이미지 생성으로 재통일하는 후속 작업이 필요함.
- [x] 공개 홈페이지: `/solution/cctv`, `/solution/network`, `/solution/iot`, `/solution/design` 상세 페이지를 새 `/solution` 운영 패키지 프레이밍과 같은 정보 구조로 리뉴얼함.
  - *Fix Details*: 기존 기능 카드/모달형 상세 페이지를 폐기하고, 각 옵션별 `추천 현장`, `구성 범위`, `상담 때 확정할 것`, `도입 후 달라지는 점` 구조의 operations-first 상세 페이지로 교체함.
  - *Image Details*: Chrome/ChatGPT visible web control에서 `최신 • 5.5` + `Thinking • 확장` + `이미지 만들기`로 옵션마다 한 장씩 한국 실사 이미지를 생성하고 `public/images/solution/generated/`에 적용함. Stickies 지시에 따라 보안 이미지는 큰 집 전경을 폐기하고 옵션 장비 중심으로 재생성함.
  - *QA Evidence*: `.codex/qa/solution-renewal-20260609/summary.json`에서 `/solution` 및 4개 상세 경로의 desktop/tablet/mobile horizontal overflow `false`, console/page error `0`, old image refs `0`, generated image present를 확인함.
- [ ] 공개 홈페이지: `/modular`에 공장 QC 체크포인트, 예상 제작/설치 리드타임, 운송 가능 조건, 크레인/도로 조건을 더 구체적인 수치로 추가하면 구매 신뢰가 더 올라감.
- [ ] 공개 홈페이지: GPT-5.5 Pro `WEET_REVIEW_20260609_PUBLIC_RENEWAL_02` OPTIONAL - `/solution` 운영 패키지에 모니터링 대응 방식, 지원 장비/네트워크 범위, 유지보수 책임, 인수인계 절차, 예시 도입 시나리오를 추가하면 구매 신뢰가 더 올라감.
- [ ] 공개 홈페이지: GPT-5.5 Pro `WEET_REVIEW_20260609_PUBLIC_RENEWAL_02` OPTIONAL - responsive QA 범위를 중간 desktop width, mobile landscape, iOS Safari, reduced-motion, keyboard focus, mega-menu interaction까지 확장해야 함.
- [ ] 공개 홈페이지: GPT-5.5 Pro `WEET_REVIEW_20260609_PUBLIC_RENEWAL_02` OPTIONAL - Header submenu anchors와 `/solution` 패키지 섹션 visibility를 검증하는 focused E2E를 추가하면 회귀 방어가 더 강해짐.
- [ ] 공개 홈페이지: `/solution` 옵션 상세에 실제 상담 사례 2~3개(무인 카페, 독채 스테이, 현장 사무실)를 추가하면 구매자가 자기 상황에 더 빨리 대입할 수 있음.
- [ ] 공개 홈페이지: `/solution` 옵션별 유지보수 책임, 모니터링 대응 시간, 장비 보증 범위를 숫자와 조건으로 명시하면 신뢰도가 더 올라감.
- [x] 관리자 페이지: 현재 리디자인은 shell/dashboard 중심이며, `products`, `projects`, `inquiries`, `insights`, `gallery`, `UTM`, `CMS` 하위 화면에는 기존 `rounded-xl/2xl/3xl`, `tracking-tight`, old SaaS card tone이 남아 있음.
  - *Fix Details*: 2026-06-07 두 번째 Antigravity handoff와 Codex 보정으로 `UTM`, `CMS`, `gallery`, `inquiries`, project/gallery/product edit-new forms, support editor, product modal, insights cleanup을 같은 console system으로 전환함.
- [x] 관리자 페이지: `products`, `projects`, `consultations`, `insights`는 1차 console tone으로 전환됐으나 `UTM`, `CMS`, `gallery`, `inquiries`, edit/new forms, modal 계층에는 기존 `rounded-xl/2xl/3xl`, old SaaS card tone이 여전히 남아 있음.
  - *Fix Details*: targeted grep under `app/admin` and `components/admin` now finds 0 `tracking-tight`, `tracking-tighter`, `rounded-xl`, `rounded-2xl`, `rounded-3xl`, `shadow-xl`, `shadow-2xl`, or visible `대시보드` matches.
- [ ] 관리자 페이지: product/project/gallery readiness score, media health score, consultation SLA, integration health를 dashboard와 하위 목록에 연결해야 함.
- [ ] 관리자 페이지: global search/command palette, unsaved-change guard, destructive action confirmation, role-aware action visibility를 추가해야 함.
- [ ] 관리자 페이지: 모바일 제품 관리 필터 영역은 안정적으로 표시되지만 세로 공간을 많이 사용함. 다음 개선에서 필터를 접이식 toolbar 또는 drawer로 압축하면 반복 사용성이 좋아질 수 있음.
- [ ] 관리자 페이지: 상담 관리 empty state는 정상이나, 신규 상담이 0건일 때 `주문하기 공개 페이지 확인`, `상담 폼 테스트`, `응답 템플릿 관리` 같은 다음 행동이 있으면 관리자 경험이 더 강해짐.
- [ ] 관리자 페이지: 모바일 상담/인사이트 화면의 좌하단 floating assistant badge가 빈 패널 또는 차트 영역 가장자리를 일부 덮을 수 있음. 핵심 입력/버튼은 가리지 않지만, 다음 admin mobile polish에서 safe-area 위치 또는 hide-on-empty-state 규칙을 검토해야 함.
- [ ] 기술 부채: `npm run build`가 통과하지만 Next middleware-to-proxy deprecation warning이 계속 남아 있음.

## 2026-06-07 current slice completion evidence

- [x] Chrome/ChatGPT image-generation rule was updated in `AGENTS.md`, `codex-loop.md`, `.codex/chatgpt-procedure.md`, `.codex/current-task.md`, `agent-inbox/UI-design.md`, and `agent-inbox/컴퓨터유즈,웹제어.md`.
- [x] GPT-5.5 Thinking/Pro 확장 image run produced `agent-inbox/generated-ui-reference-admin-console-v2.png`.
- [x] Antigravity IDE implemented homepage/admin UI changes and remaining admin-surface changes via Computer Use; Codex accepted intended changes and applied small verification fixes.
- [x] Homepage hero was upgraded to a full-bleed premium product/home visual with visible next-section hint.
- [x] Admin child surfaces now share the premium console visual language across main, UTM, CMS, customize, settings, products, projects, gallery, inquiries, support, insights, and product modal/form routes.
- [x] Local validation passed: `git diff --check`, `npm run lint`, `npm test`, `npm run build`, `npx playwright test e2e/public-pages.spec.ts`.
- [x] Visual QA evidence saved under `.codex/qa/visual-home-admin-20260607-final/`; targeted recheck confirmed visible images and product modal form load successfully.
- [x] GPT-5.5 Pro MUST_FIX closure completed for the homepage/admin full-surface slice.
  - *First Pro verdict*: marker `WEET_REVIEW_20260607_HOME_ADMIN_FULL_SURFACE_05` returned `MUST_FIX`.
  - *Applied fixes*: editable notice body, FAQ/notice draft+explicit save, admin count error states, inquiry rollback/toasts/pending guards, homepage dark text contrast.
  - *Extra visual fix*: mobile notice management no longer relies on an internally scrolling table; it now uses a card editor with title/status/body/save/delete visible.
  - *Closure Pro verdict*: marker `WEET_REVIEW_20260607_HOME_ADMIN_MUSTFIX_CLOSURE_06` returned `VERDICT: PASS` and `MUST_FIX: None`.
  - *Validation*: `git diff --check`, lint, Vitest, build, and 12 Playwright E2E tests passed after the fixes.
- [x] Production deployment and real-domain QA completed for the homepage/admin full-surface slice.
  - *Production fix*: commit `cb04ae9` replaced locale/timezone-dependent admin date rendering with deterministic KST formatting to remove React hydration error #418 found on `www.we-et.com`.
  - *Deployment*: commit `cb04ae9` was pushed, Vercel preview was promoted, and aliases `https://www.we-et.com` / `https://we-et.com` were Ready.
  - *Final Evidence*: `.codex/qa/production-home-admin-cb04ae9/summary.json` shows desktop/tablet/mobile production QA passed with no homepage/support horizontal overflow, `text-gray-400` contrast class present, and no meaningful console/page errors.
  - *Visual Evidence*: production screenshots confirm the homepage hero, mobile notice editor, and inquiry rollback surface render without clipping or broken layout.

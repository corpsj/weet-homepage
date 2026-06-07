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
- [ ] 관리자 페이지: 현재 리디자인은 shell/dashboard 중심이며, `products`, `projects`, `inquiries`, `insights`, `gallery`, `UTM`, `CMS` 하위 화면에는 기존 `rounded-xl/2xl/3xl`, `tracking-tight`, old SaaS card tone이 남아 있음.
- [ ] 관리자 페이지: `products`, `projects`, `consultations`, `insights`는 1차 console tone으로 전환됐으나 `UTM`, `CMS`, `gallery`, `inquiries`, edit/new forms, modal 계층에는 기존 `rounded-xl/2xl/3xl`, old SaaS card tone이 여전히 남아 있음.
- [ ] 관리자 페이지: product/project/gallery readiness score, media health score, consultation SLA, integration health를 dashboard와 하위 목록에 연결해야 함.
- [ ] 관리자 페이지: global search/command palette, unsaved-change guard, destructive action confirmation, role-aware action visibility를 추가해야 함.
- [ ] 관리자 페이지: 모바일 제품 관리 필터 영역은 안정적으로 표시되지만 세로 공간을 많이 사용함. 다음 개선에서 필터를 접이식 toolbar 또는 drawer로 압축하면 반복 사용성이 좋아질 수 있음.
- [ ] 관리자 페이지: 상담 관리 empty state는 정상이나, 신규 상담이 0건일 때 `주문하기 공개 페이지 확인`, `상담 폼 테스트`, `응답 템플릿 관리` 같은 다음 행동이 있으면 관리자 경험이 더 강해짐.
- [ ] 관리자 페이지: 모바일 상담/인사이트 화면의 좌하단 floating assistant badge가 빈 패널 또는 차트 영역 가장자리를 일부 덮을 수 있음. 핵심 입력/버튼은 가리지 않지만, 다음 admin mobile polish에서 safe-area 위치 또는 hide-on-empty-state 규칙을 검토해야 함.
- [ ] 기술 부채: `npm run build`가 통과하지만 Next middleware-to-proxy deprecation warning이 계속 남아 있음.

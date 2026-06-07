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
- [ ] 배포 검증: `agent-inbox/웹 접속 방법.md` 지시에 따라 브랜치 푸시 후 Vercel 배포 또는 Promote를 통해 실제 `we-et.com` 화면에서 PC/tablet/mobile 검증을 수행해야 함.
- [ ] 공개 홈페이지: 운반/설치 비용 예시, 지역별 변수, 상담 후 가격 변동 기준을 더 구체적인 숫자/조건으로 보강해야 함.
- [ ] 공개 홈페이지: `/support`에도 부지 가능성 자가진단을 독립 콘텐츠 또는 다운로드 체크리스트로 확장해야 함.
- [ ] 공개 홈페이지: B2B/다량 구매/기관 상담 경로와 상담 폼 필드(수량, 납기, 목적, 부지 상태)를 추가해야 함.
- [ ] 공개 홈페이지: ChatGPT 이미지 생성 또는 실제 촬영 기반으로 hero/product/interior/transport/install proof visual을 업그레이드해야 함.
- [ ] 관리자 페이지: 현재 리디자인은 shell/dashboard 중심이며, `products`, `projects`, `inquiries`, `insights`, `gallery`, `UTM`, `CMS` 하위 화면에는 기존 `rounded-xl/2xl/3xl`, `tracking-tight`, old SaaS card tone이 남아 있음.
- [ ] 관리자 페이지: product/project/gallery readiness score, media health score, consultation SLA, integration health를 dashboard와 하위 목록에 연결해야 함.
- [ ] 관리자 페이지: global search/command palette, unsaved-change guard, destructive action confirmation, role-aware action visibility를 추가해야 함.
- [ ] 기술 부채: `npm run build`가 통과하지만 Next middleware-to-proxy deprecation warning이 계속 남아 있음.

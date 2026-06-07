# Implementation Backlog

This file tracks bugs and improvements discovered during the recursive improvement loop.

## Critical user-reported bug

- [x] `/customize` 주문하기 도면에서 3x6, 3x9 도면이 모두 오버레이된 듯 보임. 
  - *Fix Details*: `hasBaseImage`일 때 `model-footprint` rect(동적 프레임)가 중복 렌더링되지 않도록 수정함.

## Admin Redesign Progress

- [x] Admin Shell 및 Dashboard의 Premium Technical Console 리디자인 (Charcoal/black 사이드바, Accent color 적용).
  - *Note for future*: 새로운 관리자 대시보드 구조에 맞춰 하위 페이지(products, projects, consultations)들 또한 `rounded-md`, border 위주의 심플한 console 형태로 순차적 UI 통일이 필요함.

## New findings

- [x] Playwright 검증 중 `Standard 3x9` 모델도 베이스 도면을 사용하지만 테스트가 생성형 `model-footprint` 도면을 기대해 실패함. 테스트를 베이스 도면 단일 렌더링 기대값으로 갱신함.
- [x] 태블릿/모바일 `/customize` 감사 스크립트가 드로어를 닫기 전 본문 H1을 확인해 모델 전환 증명이 불완전했음. 태블릿/모바일에서 `옵션 구성` 드로어로 `Standard 3x9`를 선택하고 닫은 뒤 H1, 가격, `base-floorplan-image` 1개, `model-footprint` 0개를 검증하는 E2E를 추가함.
- [x] 공개 홈페이지: 도면 확대/전체화면 보기 기능이 필요함. 모바일/고령 구매자는 현재 SVG 라벨을 작게 느낄 수 있음.
  - *Fix Details*: `/customize` FloorplanPreview에 `도면 크게 보기` 아이콘 버튼과 mobile-safe zoom dialog를 추가함. 같은 `FloorplanCanvas`를 재사용해 선택 모델/옵션과 stale copy가 어긋나지 않도록 했고, 모바일 E2E로 open/base image single render/close를 검증함.
- [ ] 공개 홈페이지: 모델 비교표, 추천 용도, 포함/별도 비용, 운반/설치 비용 예시를 제품/주문 흐름 가까이에 배치해야 함.
- [ ] 공개 홈페이지: 부지 가능성 자가진단(도로 폭, 트럭/크레인 접근, 전기/수도, 기초, 지역)을 추가하면 상담 전환 품질이 좋아짐.
- [ ] 공개 홈페이지: B2B/다량 구매/기관 상담 경로와 상담 폼 필드(수량, 납기, 목적, 부지 상태)를 추가해야 함.
- [ ] 공개 홈페이지: ChatGPT 이미지 생성 또는 실제 촬영 기반으로 hero/product/interior/transport/install proof visual을 업그레이드해야 함.
- [ ] 관리자 페이지: 현재 리디자인은 shell/dashboard 중심이며, `products`, `projects`, `inquiries`, `insights`, `gallery`, `UTM`, `CMS` 하위 화면에는 기존 `rounded-xl/2xl/3xl`, `tracking-tight`, old SaaS card tone이 남아 있음.
- [ ] 관리자 페이지: product/project/gallery readiness score, media health score, consultation SLA, integration health를 dashboard와 하위 목록에 연결해야 함.
- [ ] 관리자 페이지: global search/command palette, unsaved-change guard, destructive action confirmation, role-aware action visibility를 추가해야 함.
- [ ] 기술 부채: `npm run build`가 통과하지만 Next middleware-to-proxy deprecation warning이 계속 남아 있음.

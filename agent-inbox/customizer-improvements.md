# Customizer Improvements

## Improvement 1: 좌측 도면 무대 집중

- 문제: 기존 `/customize` 좌측 영역에 모델 추천, 포함/별도 준비, 현장 체크리스트가 함께 있어 도면 집중도가 낮았다.
- 고객 영향: 고객이 공간 크기와 옵션 반영 상태를 판단하기 전에 보조 설명을 먼저 처리해야 했다.
- 수정 방향: 좌측은 floorplan/stage만 남기고 보조 신뢰 정보는 우측 step flow로 이동했다.
- 실제 변경 파일: `components/customize/CustomizeConfigurator.tsx`
- UI/UX 변경: 데스크톱 좌측 하단의 보조 섹션 제거, 상담/요약 정보는 `상담 신청` step에서 확인.
- 검증 방법: Playwright E2E와 desktop/tablet/mobile visual QA.
- 결과: 좌측은 모델명, 기본가, floorplan, zoom control 중심으로 정리됨.
- 남은 리스크: 우측 요약 step 콘텐츠가 더 길어질 경우 accordion 세분화가 필요할 수 있음.

## Improvement 2: 우측 기준 좌향 확장 도면

- 문제: Compact 3x6과 Standard 3x9의 loaded base SVG가 서로 다른 오른쪽 여백을 가져 확장이 단순 이미지 교체처럼 보일 수 있었다.
- 고객 영향: 3x6에서 3x9로 커질 때 공간이 어디로 늘어나는지 즉시 이해하기 어려웠다.
- 수정 방향: compact base SVG의 footprint를 오른쪽 벽 기준으로 재정렬하고, component SVG에 길이 rail을 표시했다.
- 실제 변경 파일: `components/customize/CustomizeConfigurator.tsx`, `public/images/customize/compact-3x6-base.svg`
- UI/UX 변경: 3x6은 오른쪽 벽이 Standard와 맞고 왼쪽 여백/길이 rail이 `6m`에서 `9m`로 바뀐다.
- 검증 방법: E2E에서 compact SVG `x=400 width=600`, standard SVG `x=100 width=900`, rail text `6m/9m` 확인.
- 결과: visual QA에서 compact/standard 모두 base image 1개, footprint 0개, horizontal overflow 없음.
- 남은 리스크: 실제 고객용 richer motion은 width/mask interpolation까지 확장 가능.

## Improvement 3: Pro 리뷰 기준 4-step flow

- 문제: 옵션 카테고리가 긴 단일 스크롤로 이어져 현재 결정 단계가 흐릿했다.
- 고객 영향: 고객이 남은 선택량을 예측하기 어렵고 선택 피로가 커졌다.
- 수정 방향: sticky step navigation을 `모델 선택 · 공간 구성 · 마감·설비 선택 · 상담 신청`으로 구성했다.
- 실제 변경 파일: `components/customize/CustomizeConfigurator.tsx`, `e2e/customize-configurator.spec.ts`
- UI/UX 변경: 각 step button에 현재/완료/upcoming 상태와 선택 count badge를 제공한다.
- 검증 방법: E2E가 step label, `aria-current="step"`, step switching을 확인.
- 결과: desktop/tablet/mobile step labels가 시각적으로 들어맞음.
- 남은 리스크: 완료 step의 요약 chip은 count 중심이라 상세 요약은 후속 개선 가능.

## Improvement 4: 카테고리 재배치

- 문제: 기본 포함, 외장, 창호, 생활 옵션이 구매 의사결정 순서와 다르게 섞여 있었다.
- 고객 영향: 고객이 모델 선택 후 공간에 직접 영향을 주는 옵션과 마감/설비 옵션을 구분하기 어려웠다.
- 수정 방향: `공간 구성`에는 창호, 도어, 싱크, 욕실, 가구를 배치하고 `마감·설비 선택`에는 외장, 내장, 바닥, 에너지, 연결성을 배치했다.
- 실제 변경 파일: `components/customize/CustomizeConfigurator.tsx`
- UI/UX 변경: 사용자는 먼저 공간 기능을 확인하고 이후 마감/설비를 고른다.
- 검증 방법: Playwright desktop/mobile tests가 새 step에서 `외장` 옵션을 선택하도록 갱신됨.
- 결과: option flow가 목적별로 나뉘고 한 번에 보이는 카테고리 수가 줄어듦.
- 남은 리스크: category metadata를 DB/config 수준에서 step field로 정규화하면 유지보수성이 더 좋아짐.

## Improvement 5: compact option row

- 문제: 기존 option card가 높고 긴 스크롤을 만들었다.
- 고객 영향: 모바일과 우측 panel에서 옵션 비교가 느렸다.
- 수정 방향: option card를 52px 이상 touch target의 compact row로 줄이고 설명은 한 줄로 축약했다.
- 실제 변경 파일: `components/customize/CustomizeConfigurator.tsx`
- UI/UX 변경: 가격/포함/상담 badge를 우측에 정렬하고 detail icon은 mobile에서도 보이게 했다.
- 검증 방법: visual QA와 E2E option selection.
- 결과: 같은 viewport에서 더 많은 옵션을 스캔할 수 있음.
- 남은 리스크: 매우 긴 옵션명은 데이터 입력 단계에서 길이 관리가 필요함.

## Improvement 6: 기본 포함 우선 정렬

- 문제: 기본 포함 옵션이 유상 옵션과 같은 가중치로 보였다.
- 고객 영향: 기본가에 이미 포함된 항목이 proof 요소로 작동하지 못했다.
- 수정 방향: option sorting에서 `priceType === included`와 `isDefault`를 먼저 배치했다.
- 실제 변경 파일: `components/customize/CustomizeConfigurator.tsx`
- UI/UX 변경: 기본 포함 row는 선택 상태와 `기본 포함` badge로 즉시 구분된다.
- 검증 방법: visual QA에서 기본 포함 row가 category top에 보임.
- 결과: 기본 사양 신뢰도가 높아지고 paid upgrade가 구분됨.
- 남은 리스크: DB에 잘못된 `isDefault` 값이 들어가면 UI도 잘못 표시됨.

## Improvement 7: 상담/유상/포함 가격 구분

- 문제: 상담 후 확정 옵션이 예상 총액과 같은 의미로 보일 수 있었다.
- 고객 영향: 숨겨진 비용 또는 드립 프라이싱처럼 인식될 위험이 있었다.
- 수정 방향: sticky total과 modal header에 `상담 후 확정 N개 · 운반/설치 별도` 또는 `운반/설치 별도`를 표시했다.
- 실제 변경 파일: `components/customize/CustomizeConfigurator.tsx`
- UI/UX 변경: 예상 총액이 all-in price가 아니라는 경계가 CTA 가까이에 노출된다.
- 검증 방법: E2E modal copy assertion, visual QA.
- 결과: 비용 제외 조건이 더 명확해짐.
- 남은 리스크: priceCalculator가 structured breakdown을 반환하도록 확장하면 더 안전함.

## Improvement 8: 모델 변경 시 선택 보존

- 문제: 모델 변경 시 모든 선택이 default로 reset되어 “다시 시작” 느낌이 났다.
- 고객 영향: 업그레이드 비교 중 선택을 잃으면 신뢰와 몰입이 낮아진다.
- 수정 방향: 새 모델에서도 호환되는 option id는 유지하고, 호환되지 않는 선택만 toast로 제외 알림을 표시한다.
- 실제 변경 파일: `components/customize/CustomizeConfigurator.tsx`, `e2e/customize-configurator.spec.ts`
- UI/UX 변경: paid selection 후 Standard에서 Compact로 바꿔도 호환 옵션이 유지된다.
- 검증 방법: E2E에서 `적삼목 포인트` 선택 후 모델 전환 시 `₩30,100,000` 유지 확인.
- 결과: 모델 전환이 같은 집의 확장/축소처럼 느껴짐.
- 남은 리스크: incompatible option 이름까지 toast에 표시하는 후속 polish 가능.

## Improvement 9: 상담 모달 field-level helper copy

- 문제: optional fields가 왜 필요한지 한 문장으로만 설명되어 리드 수집처럼 보일 수 있었다.
- 고객 영향: 고객이 선택 입력을 필수처럼 오해하거나 입력을 포기할 수 있었다.
- 수정 방향: 필수 정보와 추가 정보를 분리하고 optional field마다 목적 helper text를 붙였다.
- 실제 변경 파일: `components/customize/CustomizeConfigurator.tsx`, `e2e/customize-configurator.spec.ts`
- UI/UX 변경: 구매 시기, 지목, 예산, 주소, 메모의 사용 목적이 field 바로 아래에 노출된다.
- 검증 방법: E2E가 `생산·설치 일정 제안에만 참고합니다.` 노출을 확인.
- 결과: optional 입력의 심리적 부담이 줄어듦.
- 남은 리스크: mobile에서 더 아래 optional fields까지 스크롤 QA를 추가할 수 있음.

## Improvement 10: 상담 모달 접근성 role

- 문제: 상담 모달에 `role="dialog"`와 `aria-modal`이 없어 테스트와 보조기술 scope가 흐렸다.
- 고객 영향: keyboard/screen reader 사용자가 모달 경계를 이해하기 어려울 수 있었다.
- 수정 방향: 상담 모달 wrapper에 `role="dialog"`, `aria-modal`, `aria-labelledby`를 추가했다.
- 실제 변경 파일: `components/customize/CustomizeConfigurator.tsx`, `e2e/customize-configurator.spec.ts`
- UI/UX 변경: 테스트와 접근성 tree가 상담 요청 dialog를 명확히 인식한다.
- 검증 방법: E2E가 `getByRole('dialog', { name: '상담 요청' })`로 검증.
- 결과: modal copy/assertion이 sticky bar와 충돌하지 않음.
- 남은 리스크: full focus trap은 별도 accessibility pass에서 보강 가능.

## Improvement 11: floorplan fallback safety 유지

- 문제: base image가 실패할 때 generated footprint fallback이 계속 안전해야 했다.
- 고객 영향: 이미지 장애 시 빈 도면이 나오면 상담 신뢰가 크게 낮아진다.
- 수정 방향: 기존 image-load status 기반 fallback을 유지하면서 new rail/source SVG changes와 충돌하지 않게 했다.
- 실제 변경 파일: `components/customize/CustomizeConfigurator.tsx`, `e2e/customize-configurator.spec.ts`
- UI/UX 변경: loaded image는 base SVG 1개, 실패 시 `model-footprint` fallback 1개.
- 검증 방법: E2E route abort로 `compact-3x6-base.svg` 실패를 재현.
- 결과: fallback test 계속 통과.
- 남은 리스크: production CDN 장애 시 추가 monitoring 필요.

## Improvement 12: visual QA artifact trail

- 문제: UI 개선은 terminal tests만으로는 layout quality를 증명하기 어렵다.
- 고객 영향: label overflow, modal clipping, mobile drawer density 같은 문제가 남을 수 있다.
- 수정 방향: desktop/tablet/mobile screenshots와 summary JSON을 `.codex/qa/`에 저장했다.
- 실제 변경 파일: `.codex/qa/customizer-implementation-20260607-profix/`
- UI/UX 변경: 없음; 검증 증거를 남기는 품질 개선.
- 검증 방법: Playwright screenshot and DOM summary, manual visual inspection.
- 결과: no overflow, base image 1개, footprint 0개, step label fit, modal helper copy readable.
- 남은 리스크: dev-only Next indicator가 mobile screenshot 좌하단에 겹치지만 production UI 요소는 아님.

## Improvement 13: 3x6→3x9 wall-line expansion guide

- 문제: 3x6에서 3x9로 바뀔 때 base SVG가 교체되는 인상이 남아, 실제로 어느 벽과 선이 길어지는지 즉시 이해하기 어려웠다.
- 고객 영향: 모델 전환이 같은 집의 확장이라기보다 다른 도면으로 바뀌는 느낌을 줄 수 있었다.
- 수정 방향: centered footprint geometry 위에 좌우 growth zone, 6m 기준 점선, 상·하 벽선, 좌·우 사이드 월을 별도 SVG overlay로 애니메이션했다.
- 실제 변경 파일: `components/customize/CustomizeConfigurator.tsx`
- UI/UX 변경: Standard 3x9 선택 시 좌우 벽선이 바깥으로 이동하고 수평 벽선이 6m 기준선에서 9m 폭으로 늘어나는 장면이 보인다.
- 검증 방법: Playwright visual QA에서 compact/final/intermediate 전환 스크린샷, E2E floorplan assertions, console/error/overflow checks.
- 결과: local visual QA summary `problems: []`; wall-line geometry changed from `x1 212→62`, `x2 788→938` with a midframe at `x1 182.86`, `x2 817.14`. Option info modal image rendered with nonzero natural dimensions after adding dialog semantics.
- Production Evidence: commit `9fedfed` was pushed and promoted to `www.we-et.com`; `.codex/qa/production-expansion-9fedfed-rerun/summary.json` reports `problems: []`, wall-line geometry `x1 212→176.40→62` and `x2 788→823.60→938`, and the `태양광 패널` modal image rendered at `1672x941`.
- 남은 리스크: 실제 생산 도면 정밀도와는 별개로 구매 이해용 guide overlay이므로, 향후 CAD 기반 도면 전환으로 고도화 가능.

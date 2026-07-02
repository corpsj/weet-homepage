# /customize 리뷰 확정 24건 수정 설계

날짜: 2026-07-02 · 브랜치: zoo/customize-configurator
근거: 멀티에이전트 리뷰(8차원 + 2인 적대적 검증, 워크플로 wf_cb46f8ca-aa9) 확정 24건.
증거 스크린샷: 세션 scratchpad `qa/` (v390-step*.png, crop-*.png, modal-results.json)

## 사용자 확정 결정

- 범위: **전부 24건** (반박된 #19 확대도면 스크롤 영역 a11y는 제외)
- #6 대비: **AA 충족으로 보정** — '포함' 가격 #9ca3af → #6b7280 수준, customize-slate 소형 텍스트도 함께 보정. 위계(흐린 회색=부가 정보)는 유지
- #12 새로고침: **단계·진행도 모두 복원** (sessionStorage). 공유 링크 신규 진입은 지금처럼 전체 완료 상태
- #24 이중 마운트: 무응답 → 권장안 **useIsDesktop 한 벌 마운트 + e2e 셀렉터 스코프 병행** (리뷰 게이트에서 변경 가능)

## 기존 의도 보호 (건드리지 않음)

₩ prefix 가격 포맷 / customize.\* 토큰 체계 / 22px 스와치 / 인라인 SVG 도면과 6m·9m 좌표(x326/w504, x74/w756, 우변 830) / 결제 미진행 고지 / 잔여 i18n은 범위 외.
단 하나의 예외: '포함' 가격 색 #9ca3af는 사용자 승인 하에 AA 색으로 변경(메모리의 intentional 목록도 구현 후 갱신).

## 웨이브 구성

### Wave 1 — 상태·URL 결함 (#1, #2, #11, #12, #13)

**#1 URL 동기화 재작성** — `CustomizeConfigurator.tsx:97-102`
- pristine 기준을 "진입 시점 인코딩"이 아니라 **순정 기본 구성** `encodeConfig(firstModelId, getDefaultSelections(catalog, firstModelId))` (mount 시 1회 계산)으로 교체.
- effect: `URLSearchParams(window.location.search)`로 기존 파라미터(utm 등) 보존, 순정이면 `params.delete('c')`, 아니면 `params.set('c', encodedConfig)`. early return 제거 → URL이 항상 화면과 일치.
- `setTimeout` 300ms debounce(cleanup 포함) + `try/catch`로 Safari replaceState 제한 방어.
- 수용 기준: 옵션 켰다 끄면 ?c= 제거, ?utm_source 유지, 복사한 링크 = 화면 구성.

**#2 선택 상태 sanitize** — 신규 `sanitizeSelections(catalog, modelId, selections)` (lib/customize/priceCalculator.ts)
- 규칙: (a) 카탈로그에 없는 옵션 id 제거, (b) 옵션을 실제 categoryId 키로 재매핑(유령 옵션 방지), (c) single 카테고리는 첫 항목만, (d) 충돌 쌍은 사용자 선택(비기본) 우선으로 기본 옵션 제거, (e) modelId가 비활성/부재면 firstModelId + 기본 선택으로 폴백.
- 적용 지점: decode 채택 직후(초기 state), `buildSelectionsForModelChange` return 직전, 서버 `submitCustomizeConsultation` 저장 전.
- 단위 테스트 신규: 5개 규칙 각 1케이스 이상.

**#11 제출 스냅샷** — `ReviewStep.tsx:204` + Configurator
- 제출 성공 시 `submittedSnapshot { modelName, estimatedTotal, encodedConfig }` 캡처, 확인 카드는 스냅샷만 렌더.
- `encodedConfig !== snapshot.encodedConfig`가 되면 `submitted` 자동 해제 → 변경분 재제출 가능.

**#12 진행 위치 복원** — `CustomizeConfigurator.tsx:66-69`
- sessionStorage `customize-progress` = `{ step, furthest, c }`. 변경 시 저장(handleStepSelect), mount 후 useEffect에서 복원(hydration mismatch 방지 위해 initializer가 아닌 effect).
- 저장된 `c`가 현재 초기 인코딩과 일치할 때만 복원 — 다른 공유 링크로 진입하면 무시.
- 세션 기록 없는 decoded 진입(공유 링크)은 현행 유지: 전체 완료 + 1단계.

**#13 geomFor clamp** — `FloorplanCanvas.tsx:25-28`
- `w = Math.min(Math.round(lengthM * 84), 830 - 40)` → x ≥ 40 보장. 6m/9m 기존 좌표 불변(기존 테스트 그대로 통과), 12m 케이스 테스트 추가.

### Wave 2 — 레이아웃·반응형 (#4, #5, #9, #18, #21, #22)

- **#4**: Configurator 루트 div(228행)에 `break-keep` 추가(모달·고정 바 모두 루트 내부라 상속됨). `buildQuoteHtml`의 인쇄용 CSS에도 `word-break: keep-all` 추가. 수용 기준: 390px 재캡처에서 '상/담'·'달/라질'·'유/지관리' 분리 소멸.
- **#5**: OptionCard 토글 버튼(52행)에 `min-w-0` → 긴 옵션명 truncate 정상화, ⓘ 돌출 해소.
- **#9**: FloorplanZoomModal 캔버스 래퍼 `min-w-0` → `min-w-[720px] md:min-w-0` — 모바일에서 확대+가로 스크롤 동작, 데스크톱 불변.
- **#18**: loading.tsx 도면 스켈레톤을 실제와 동일 규격(max-w-[1100px], aspect-[1000/460], rounded-lg)으로.
- **#21**: StepperBar에 `currentStep` 변경 시 활성 버튼 `scrollIntoView({ inline: 'nearest', block: 'nearest' })` useEffect(#25의 reduced-motion 헬퍼 적용).
- **#22**: FloorplanPreview 헤더 — 가격 블록 `shrink-0 whitespace-nowrap`, h1 `min-w-0 break-keep`. 모바일 고정 바 — 총액 p의 `truncate` 제거, `flex flex-wrap items-baseline gap-x-1` + 두 span `whitespace-nowrap`으로 '+ 상담 N건' 배지가 잘리는 대신 줄바꿈.

### Wave 3 — 접근성 (#6, #7, #8, #20, #25)

- **#6**: '포함' 가격 리터럴 #9ca3af → **#6b7280**(4.6:1). customize-slate(#8a806f)를 **본문 성격의 소형 텍스트**에 쓴 곳만 진한 값으로 보정(장식·라벨류는 유지). 구현 시 대비 4.5:1 계산으로 확인.
- **#7**: ⓘ 버튼 시각 22px 유지, `p-[11px] -m-[11px]`로 히트 영역 44px화.
- **#8**: 모델 선택 버튼에 `aria-pressed={model.id === modelId}` (OptionCard와 동일 패턴).
- **#20**: 모바일 고정 바 총액 컨테이너에 `aria-live="polite" aria-atomic="true"` (데스크톱과 동일).
- **#25**: `scrollBehavior()` 헬퍼(`prefers-reduced-motion: reduce`면 'auto') 신설 → handleStepSelect 2곳, ReviewStep 오류 필드 스크롤, #21 스테퍼 스크롤에 적용.

### Wave 4 — 디자인 일관성 (#10, #15, #16, #17)

- **#10**: 모달 셸 통일 — OptionInfoModal의 backdrop을 `bg-weet-ink/55 backdrop-blur-sm`으로, 닫기 버튼을 FloorplanZoomModal과 동일한 h-11 w-11 보더 버튼으로. 패널 서피스 토큰은 콘텐츠 존별 유지(customize sand vs weet surface).
- **#16**: customize 컴포넌트 한정 포커스 링 통일 — `focus:outline-none focus-visible:ring-2 focus-visible:ring-weet-gold-deep`(풀 오패시티 하나). FloorplanPreview:46·FloorplanZoomModal:46의 `focus:` → `focus-visible:` 교체, constants의 inputClass/selectClass 오패시티 통일. 공용 ui/button 베이스는 사이트 전역 영향이라 **건드리지 않음**.
- **#17**: 리뷰 폼 컨트롤 `border-gray-300` → `border-weet-line-2`로, invalid 시 `aria-invalid` + 붉은 보더/링 시각 표시 추가(기존 필드 에러 메시지 로직과 연결).
- **#15**: 레일 내 모델 카드 선택 상태(보더·체크·가격 톤)를 OptionCard 패턴과 동일 토큰 매핑으로 정렬. 시각 확인 필수(390px+데스크톱 캡처).

### Wave 5 — 구조·성능·문서 (#3, #14, #23, #24)

- **#24**: `useIsDesktop()` 훅(matchMedia 1024px, mount 전 null). null이면 현행대로 두 벌 렌더(SSR 첫 페인트 플래시 방지), mount 후엔 해당 쪽 한 벌만. e2e·QA 셀렉터는 `customize-desktop-rail` 스코프 컨벤션으로 정리(pre-hydration 안전망).
- **#3**: 카탈로그 로드를 `unstable_cache(..., ['customize-catalog'], { tags: ['customize-catalog'], revalidate: 300 })`로 래핑(site-settings 패턴 재사용). `revalidateCustomizePaths()`에 `revalidateTag('customize-catalog', 'max')` 추가(Next 16 시그니처). `force-dynamic` 제거(searchParams로 이미 dynamic).
- **#14**: 데드 export 4개(formatOptionPrice·floorplanSize·calculateTotalPrice·formatPrice)와 FALLBACK_CATALOG `specs` 필드 삭제. 라벨 테스트를 실사용 `optionPriceDisplay`('기본 포함'/'+₩x'/'상담 필요') 대상으로 교체, `buildQuoteHtml` 기본가+옵션합=총액 테스트 1케이스 추가.
- **#23**: 스펙 문서 현행화 — §1 표 상단에 "이 표는 초기 시안 더미값, 정답은 Supabase customize_\* 테이블(관리자 관리)" 주석, 가격 표기·스펙 칩·이미지+ 문구를 현행 구조로 수정. 코드·시드·e2e는 변경하지 않음.

## 검증 계획

1. 웨이브마다: `npm run lint` + `npm run test`(신규 테스트 포함) 통과 후 웨이브 단위 커밋.
2. 전체 완료 후: `npx tsc --noEmit`, `npm run build`, `npx playwright test`(e2e — URL/셀렉터 변경분 스펙 동기화 포함).
3. 390px 재캡처로 리뷰 증거와 1:1 대조: 검토 고지문, 바닥재 카드 ⓘ, 확대 모달, 스테퍼, 고정 바 배지.
4. 새로고침·공유 링크·제출 후 수정 시나리오 수동(Playwright) 재연.
5. 완료 후 메모리 갱신: intentional 색 목록(#9ca3af → #6b7280), 새 sanitize/세션 복원 동작.

배포(push)는 별도 확인 후 진행.

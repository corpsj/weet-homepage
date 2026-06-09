# Pro Review Summary

Marker: WEET_CUSTOMIZER_RESEARCH_01_STRUCTURE_20260607

제공된 repo/baseline 사실만을 기준으로 한 구조 리뷰입니다. 결론부터 말하면, 현재 `/customize`의 핵심 문제는 기능 수가 아니라 **과업의 초점이 흐려진 구조**입니다. 지금 필요한 것은 새 기능을 더하는 것보다, 사용자가 “모델을 고르고, 공간을 이해하고, 가격을 신뢰하고, 상담으로 넘어가는” 순서를 한 번에 이해하게 만드는 재배치입니다.

## Diagnosis

제공된 baseline 기준으로 현재 페이지의 가장 큰 구매 차단점은 **무대와 설명이 한 화면에서 경쟁한다는 점**입니다. 좌측 64% 영역은 원래 floorplan/space를 체감시키는 stage여야 하는데, 지금은 “어떤 모델이 적합할까요?”, “포함 사항 및 별도 준비”, “현장 체크리스트”가 함께 들어와 있어 사용자가 공간 판단과 보조 정보 해석을 동시에 해야 합니다. 복잡한 선택 과업에서는 progressive disclosure와 staged disclosure로 핵심 정보와 후속 정보를 분리할 때 학습 부담이 낮아지고, 긴 폼/옵션도 관련 항목을 섹션과 단계로 나눌수록 인지 부하가 줄어듭니다. citeturn0search0turn0search8turn1search0turn2search7

두 번째 차단점은 **우측 옵션 흐름이 너무 길고 평평하다는 점**입니다. 현재는 모델 다음에 거의 모든 카테고리가 길게 이어져 있어, 사용자는 “지금 무엇을 결정하고 있는가”보다 “얼마나 더 내려가야 하는가”를 먼저 체감하게 됩니다. 위저드형 단계 구조는 이전 결정이 다음 결정을 규정하는 과업에서 특히 유효하고, 진행 단계 표시는 남은 노력량을 가늠하게 해 사용자의 방향 감각을 지켜 줍니다. 또한 완료된 단계는 계속 길게 펼쳐 두기보다 요약 상태로 접어 두는 편이 검토와 이동에 더 유리합니다. citeturn1search0turn1search5turn1search12turn1search13

세 번째 차단점은 **3x6에서 3x9로 넘어갈 때 업그레이드 가치가 공간감으로 전달되지 않는 점**입니다. 지금 구조에서는 모델 변경이 “다른 이미지로 바뀌는 것”처럼 느껴질 위험이 큽니다. 하지만 사용자가 실제로 느껴야 하는 것은 “오른쪽 벽은 그대로이고, 생활 영역이 왼쪽으로 더 길어졌다”는 연속성입니다. 좋은 configurator는 모델이 바뀌어도 사용자의 현재 구성을 최대한 이어 주고, 제품 시각화가 화면의 중심에 남습니다. Porsche는 같은 모델 시리즈 안에서 새 모델을 고르면 현재 구성을 상당 부분 이전할 수 있다고 명시하고, Tesla는 디자인과 주문을 하나의 제품 중심 화면에서 통합합니다. Weet도 모델 변경을 “새 판 시작”이 아니라 “같은 집의 확장”으로 다뤄야 합니다. citeturn3search1turn3search0

네 번째 차단점은 **가격과 상담의 신뢰 장치가 약하다는 점**입니다. 기본 포함, 유상 추가, 상담 후 확정이 한 덩어리처럼 보이면 사용자는 기본가의 범위와 추가 비용의 경계를 확신하지 못합니다. FTC와 OECD는 소비자 자율성을 흐리거나 가격 인식을 왜곡하는 UI를 dark patterns로 다뤄 왔고, 한국 공정위도 드립 프라이싱을 포함한 온라인 다크패턴 규제를 별도로 안내했습니다. 현재 상담 모달은 선택 입력에 대한 “왜 묻는지” 설명이 약해, 현장 검토에 필요한 정보 수집인지 단순 리드 수집인지가 흐립니다. 폼은 required/optional을 모두 명시하고, 필요한 이유를 짧게 설명할 때 사용자의 부담이 줄어듭니다. citeturn4search0turn4search1turn4search6turn2search7turn2search14

정리하면, 현재 페이지의 가장 큰 purchase blocker는 개별 기능의 부족이 아니라 **공간 stage의 집중력 부족, 옵션 흐름의 장기 스크롤화, 가격 신뢰 구조의 약함, 상담 입력의 설명 부족**입니다. 이 네 가지가 동시에 개선되어야 첫 구현 슬라이스의 체감 가치가 생깁니다.

## Recommended Structure

권장 구조는 **4단계**가 가장 적합합니다. 복잡한 선택은 staged disclosure와 wizard 구조로 나누고, 현재 위치와 남은 과업을 progress로 드러낼 때 사용자가 더 쉽게 따라갑니다. citeturn0search0turn1search0turn1search12

**모델 선택** — Compact 3x6 / Standard 3x9를 면적, 크기, 기본가 중심으로 비교하고 선택하는 단계입니다. 추천 콘텐츠는 여기에서만 다루되, 본문 아래의 접힌 `모델 추천 가이드`로 배치하는 것이 맞습니다.

**공간 구성** — floorplan에 직접 영향을 주는 항목만 모읍니다. 창호, 출입문, 욕실, 가구, 싱크처럼 사용자가 “이 옵션 때문에 이 공간이 어떻게 달라지는지”를 stage에서 즉시 확인할 수 있는 그룹이 들어가야 합니다.

**마감·설비 선택** — exterior, interior, flooring, energy, connectivity처럼 공간의 감도와 설비 수준을 정하는 항목을 따로 묶습니다. 이 단계는 stage 변화가 크지 않아도 괜찮고, 대신 선택 요약과 가격 변화가 명확해야 합니다.

**상담 신청** — 필수 정보와 추가 정보, 기본 포함/별도 준비, 설치 전 체크리스트를 이 단계에서 정리합니다. 이 단계는 “제출”이 아니라 “상담을 위한 확인”이라는 톤이 맞습니다.

레이아웃 비율은 데스크톱에서 현재의 64/36을 크게 바꿀 필요가 없습니다. 문제는 비율보다 **왼쪽의 purity와 오른쪽의 단계화**입니다. 데스크톱에서는 좌측 stage를 고정하고 우측만 step 단위로 스크롤되게 만들고, 모바일에서는 현재의 bottom sheet 패턴을 유지하되 **현재 step만 렌더링**하게 해야 합니다. 이렇게 해야 모바일에서도 “길게 내려가는 옵션 페이지”가 아니라 “단계적으로 완성하는 configurator”로 읽힙니다. citeturn0search0turn1search0turn1search13

좌측에는 **stage 관련 요소만** 남기십시오. 허용되는 것은 shared floorplan canvas, 모델명/면적 배지, 치수 레일, 선택 옵션 오버레이, 확대·축소 또는 리셋 정도입니다. “어떤 모델이 적합할까요?”는 Step 1 하단의 접힌 `모델 추천 가이드`로 옮기고, “포함 사항 및 별도 준비”는 우측 sticky 예상가 요약 아래의 `기본 포함 / 별도 준비` accordion으로, “현장 체크리스트”는 Step 4의 설치 정보 아래 `설치 전 체크리스트` accordion으로 옮기는 편이 맞습니다. Tesla의 주문 화면도 보증, 충전, 액세서리 같은 신뢰 형성 정보는 주문 표면 가까이에 두지, 제품 시각화 영역을 설명 카드로 채우지 않습니다. citeturn3search0turn0search0

3x6에서 3x9로 갈 때의 시각 전략은 새 판을 만드는 것이 아니라, **현재 fallback의 `x=1000-width` 규칙을 전체 stage의 공통 좌표계로 승격하는 것**입니다. 즉, 오른쪽 벽의 x값은 고정하고 footprint width, overlay anchor, dimension rail만 함께 이동시켜 “왼쪽으로 확장”되는 변화를 만들어야 합니다. 구현은 width interpolation, mask reveal, shared outline 중 하나면 충분합니다. 반대로 서로 다른 base SVG 두 장을 crossfade하는 방식은 피하는 편이 좋습니다. 비필수 애니메이션은 `prefers-reduced-motion`일 때 즉시 전환해야 하고, 이 요구는 WCAG와 MDN의 접근성 가이드와도 일치합니다. citeturn0search2turn0search3turn0search6

정보 구조는 **기본 포함 / 추가 선택 / 상담 후 확정**의 세 층으로 분리하는 것이 가장 명확합니다. `기본 포함`은 항상 맨 위에 두고 `기본 포함` 배지와 `기본가 포함` 또는 `₩0` 표기를 붙입니다. `추가 선택`은 반드시 정확한 증감가를 노출합니다. `상담 후 확정`은 `예상가 미포함`을 명시하고 별도 그룹으로 내려야 합니다. Sticky summary 역시 `기본가`, `기본 포함`, `추가 선택 합계`, `상담 후 확정 제외 항목`을 나눠야 합니다. 유상 옵션을 기본 선택 상태로 두는 것은 피하고, 기본 선택은 실제 기본 사양에만 한정하는 편이 맞습니다. 이것이 곧 “프리미엄스럽지만 과장하지 않는” 구조입니다. citeturn4search0turn4search1turn4search6

스타일 톤은 Tesla/Porsche의 configurator discipline에 xAI/SpaceX의 절제된 카피 방식을 섞는 방향이 적합합니다. 즉, 큰 stage, 짧은 라벨, 핵심 수치 중심, 과한 설명 최소화, 숨기지 않는 가격 구조입니다. xAI와 SpaceX의 공식 페이지는 짧은 헤드라인과 핵심 수치, 명확한 CTA를 전면에 두고 있고, Tesla/Porsche도 구성 경험의 중심을 제품에 둡니다. Weet는 이를 “짧게 설명하되 숨기지 않는 한국형 movable-home configurator”로 번역하면 됩니다. citeturn3search0turn3search1turn3search2turn3search3

상담 모달의 선택 필드 copy는 실제로 더 좋아져야 합니다. 필수 3개 필드만 먼저 보이고, 나머지 5개 선택 항목은 `추가 정보`로 접어 두는 편이 맞습니다. NNGroup는 불필요한 선택 필드를 줄이고, 더 긴 폼이 필요할 때는 progressive disclosure와 명확한 라벨링을 권장합니다. 제안 copy는 다음 정도면 충분합니다. `구매 예정 시기(선택)` — “생산·설치 일정 제안에만 참고합니다.” `토지 유형(선택)` — “대지/전·답/임야 등 현장 조건 검토에 참고합니다.” `예산 범위(선택)` — “가능한 사양 조합을 빠르게 제안하기 위한 참고값입니다.” `설치 주소(선택)` — “정확한 번지 전이라도 읍·면·동 수준이면 괜찮습니다.” `메모(선택)` — “사용 목적, 예상 인원, 필요한 옵션을 자유롭게 적어주세요.” 라벨은 필드 밖에 유지하고, placeholder-only 안내는 피하십시오. citeturn2search3turn2search7turn2search11turn2search1turn2search9

## MUST_FIX

- 좌측 64% 영역에서 추천 카드, 포함 사항, 체크리스트를 **완전히 제거**하고, stage HUD만 남길 것.
- 3x6→3x9 전환은 **fixed right wall 기준 좌향 확장**으로 구현할 것. full-image swap/crossfade에 의존하지 말고, `prefers-reduced-motion` 경로를 반드시 둘 것. citeturn0search2turn0search3turn0search6
- 상단 sticky 4-step 네비게이션 **`모델 선택 · 공간 구성 · 마감·설비 선택 · 상담 신청`**을 추가하고, 완료 단계는 요약 상태로 접어 둘 것. citeturn1search0turn1search5turn1search13
- 옵션 UI를 tall card 중심에서 **compact row + accordion** 구조로 바꿀 것. 현재 step과 관련된 카테고리만 노출하고, 나머지는 숨기거나 요약으로 접을 것. citeturn0search0turn0search8turn1search12
- `기본 포함 / 추가 선택 / 상담 후 확정`을 데이터, 카드, 요약 가격, CTA 근처 설명에서 **동일한 규칙으로 분리**할 것. 유상 옵션 선선택은 금지할 것. citeturn4search0turn4search1turn4search6
- 모델을 바꿀 때 호환되는 옵션은 **최대한 유지**하고, 해제되는 옵션만 명시적으로 알려 줄 것. “모델 교체 = 다시 시작”처럼 느껴지면 안 된다. citeturn3search1turn3search5
- 상담 모달에서 required/optional을 모두 표시하고, 선택 입력의 이유를 field-level helper text로 설명할 것. placeholder-only 설명은 쓰지 말 것. citeturn2search1turn2search7turn2search14
- 예상가가 상담 의존 항목을 포함하지 않는다면, CTA와 요약에서 반드시 **`예상가`**라고 표기하고 제외 항목을 분리해 보여 줄 것. 숨겨진 비용 인상을 떠올리게 만드는 표현은 피할 것. citeturn4search0turn4search6

## OPTIONAL

첫 슬라이스에서 미뤄도 되는 항목은 분명합니다. 3D 또는 axonometric 공간 뷰, 햇빛 방향·뷰 시뮬레이션, 저장/공유 링크, 추천 퀴즈형 진입, 주소 자동완성과 운송 거리 계산, 생산 일정/금융 시뮬레이터 같은 기능은 후속 단계로 넘겨도 됩니다.

핵심은 “더 화려한 기능”이 아니라 “덜 헷갈리는 구조”입니다. 따라서 첫 구현에서는 시각적 연속성, 단계 구조, 가격 투명성, 상담 신뢰 copy가 먼저 해결되어야 하고, 나머지 enhancement는 그 뒤가 맞습니다.

## Implementation Priorities

Codex/Antigravity는 아래 순서로 구현하는 편이 가장 안전합니다.

1. `app/customize/page.tsx`에서 좌측을 stage-only shell로 정리하고, 기존 helper blocks를 전부 우측 flow 안의 문맥형 모듈로 이동합니다.

2. `components/customize/CustomizeConfigurator.tsx`에 reducer 기반의 4-step flow state를 넣고, app bar 아래 sticky step nav를 추가합니다. 완료 step은 펼친 상태가 아니라 summary state로 접히도록 설계합니다. citeturn1search0turn1search13

3. `components/customize/CustomizeStage.tsx` 같은 전용 stage 컴포넌트를 분리하고, 현재의 `x=1000-width` 로직을 공통 좌표계의 anchor rule로 승격합니다. floorplan outline, overlay labels, dimension rail이 모두 이 좌표계를 공유해야 합니다.

4. stage 전환 레이어를 따로 두고, width reveal 또는 mask reveal 기반의 **leftward expansion**을 구현합니다. 동시에 `prefers-reduced-motion`일 때는 비필수 애니메이션을 끄고 즉시 상태 변경만 남깁니다. citeturn0search2turn0search3turn0search6

5. `lib/customize/types.ts`를 확장해, 기존 `option.isDefault`와 `priceType`를 버리지 말고 `step`, `pricingMode`, `summaryLabel`, `stageImpact`, `modelCompatibility`, `sortWeight`, `requiresConsult` 같은 richer metadata로 정규화합니다.

6. `lib/customize/config.ts`에서 현재 카테고리를 새 step 구조에 맞게 재배열합니다. 동시에 `기본 포함`, `추가 선택`, `상담 후 확정` 순서가 모든 카테고리에서 일관되게 나오도록 sort rule을 고정합니다.

7. `lib/customize/priceCalculator.ts`는 단순 합계가 아니라 구조화된 출력값을 반환해야 합니다. 최소한 `basePrice`, `includedItems`, `paidItems`, `consultExcludedItems`, `estimatedTotal`을 분리해야 하고, 상담 의존 항목은 총액에 자동 합산하지 않는 편이 맞습니다. citeturn4search0turn4search6

8. 옵션 UI는 `OptionAccordion`, `OptionRow`, `SelectionSummaryChip` 같은 구성으로 재조립합니다. 각 row는 제목, 짧은 보조 문장, 상태 배지, 우측 정렬 가격만 담고, 카테고리 헤더는 “현재 선택”을 요약해 긴 스크롤을 줄여야 합니다.

9. 상담 모달은 `필수 정보`와 `추가 정보(선택)`로 분리하고, field 밖에 고정 라벨과 helper text를 둡니다. 필수/선택을 모두 표시하고, 현재의 약한 copy를 목적 설명형 microcopy로 교체합니다. citeturn2search1turn2search3turn2search7turn2search14

10. QA는 기존 baseline의 장점인 “no overflow / no console errors / clean responsive layout”를 깨지 않는 것을 전제로 해야 합니다. 데스크톱·태블릿·모바일, model switch persistence, 모달 focus trap, keyboard 접근성, `prefers-reduced-motion`, step drop-off analytics까지 한 번에 점검해야 합니다. citeturn0search10turn0search3turn3search1

## Verdict

짧게 판단하면, **제안된 방향은 첫 구현 슬라이스로 충분합니다.** 다만 이 방향이 실제로 의미 있으려면 “왼쪽만 조금 정리”하는 수준으로 그치면 안 됩니다. 최소한 **좌측 stage 집중, fixed-right-wall expansion, compact step flow, 포함/유료/상담 분리, 상담 모달 copy 개선**이 한 번에 들어가야 성격이 바뀝니다. 그 수준까지 구현되면 현재 `/customize`는 “긴 옵션 페이지”에서 “공간 중심 configurator”로 전환됩니다. 반대로 이 다섯 축 중 하나라도 빠지면 개선은 보이더라도 구매 설득력은 제한적일 가능성이 큽니다. citeturn0search0turn1search0turn4search6
# Customizer Persona Test Results

## Persona Test 1

- Persona: 농막을 처음 알아보는 50대 토지 소유자
- Viewport: PC
- Goal: Compact와 Standard 차이를 이해하고 기본가를 확인한다.
- Path taken: `/customize` initial load, model cards, floorplan stage.
- Positive signals: 도면이 좌측 중심에 있고 `6m` rail이 보여 크기 기준이 생김.
- Confusion points: 설치/인허가 정보는 summary step까지 가야 함.
- Purchase blockers: 운반/설치 별도 비용이 더 구체적이면 좋음.
- Conversion triggers: 기본 포함 badge와 예상 총액.
- Bugs: 없음.
- UX issues: 없음.
- Suggested fixes: 별도 비용 예시 range는 후속 pricing content에서 검토.

## Persona Test 2

- Persona: 주말 별장을 찾는 40대 부부
- Viewport: PC
- Goal: 3x6에서 3x9로 확장되는 공간감을 비교한다.
- Path taken: Compact initial, Standard select, visual comparison.
- Positive signals: right wall alignment and `6m/9m` rail make expansion direction legible.
- Confusion points: 실제 interior photos는 없음.
- Purchase blockers: 생활 이미지 부족.
- Conversion triggers: model cards and direct price difference.
- Bugs: 없음.
- UX issues: 없음.
- Suggested fixes: future product-context image only if it improves model selection.

## Persona Test 3

- Persona: 옵션 가격에 민감한 예산 중심 구매자
- Viewport: PC
- Goal: 유상 옵션을 추가했을 때 총액 변화를 확인한다.
- Path taken: `마감·설비 선택`, `적삼목 포인트` select.
- Positive signals: paid price right aligned; total updates.
- Confusion points: consult options do not change total but are labeled `상담`.
- Purchase blockers: consult exclusions need continued clarity.
- Conversion triggers: sticky total and exclusion text.
- Bugs: 없음.
- UX issues: 없음.
- Suggested fixes: structured price breakdown should be added later.

## Persona Test 4

- Persona: 기본 사양 포함 범위를 걱정하는 고객
- Viewport: PC
- Goal: 기본 포함 옵션이 무엇인지 확인한다.
- Path taken: `공간 구성` and `마감·설비 선택` default rows.
- Positive signals: default rows are first, selected, and show `기본 포함`.
- Confusion points: full included spec list is in summary context.
- Purchase blockers: none for first pass.
- Conversion triggers: proof-like included rows.
- Bugs: 없음.
- UX issues: 없음.
- Suggested fixes: add included/excluded accordion under sticky price in future.

## Persona Test 5

- Persona: 모바일로 빠르게 견적만 보려는 고객
- Viewport: Mobile 390x844
- Goal: 페이지가 깨지지 않고 CTA가 보이는지 확인한다.
- Path taken: initial mobile load.
- Positive signals: no horizontal overflow, floorplan visible, bottom CTA reachable.
- Confusion points: dev-only Next indicator overlaps lower-left screenshot area.
- Purchase blockers: none in production UI.
- Conversion triggers: visible total and 상담 요청 button.
- Bugs: 없음.
- UX issues: dev-only indicator visual overlap.
- Suggested fixes: production QA should ignore dev indicator or run production build.

## Persona Test 6

- Persona: 모바일에서 옵션을 고르는 고객
- Viewport: Mobile 390x844
- Goal: option drawer step labels and option rows are tappable.
- Path taken: `옵션 구성`, `마감·설비 선택`.
- Positive signals: long `마감·설비 선택` label fits; rows have clear touch targets.
- Confusion points: count badges are small but readable.
- Purchase blockers: 없음.
- Conversion triggers: paid option price visible before selection.
- Bugs: 없음.
- UX issues: 없음.
- Suggested fixes: future chips can expose selected option names, not just counts.

## Persona Test 7

- Persona: 태블릿으로 가족과 같이 비교하는 고객
- Viewport: Tablet 834x1112
- Goal: drawer flow가 넓은 화면에서 답답하지 않은지 본다.
- Path taken: drawer open, `마감·설비 선택`.
- Positive signals: row density and spacing are comfortable.
- Confusion points: floorplan is behind drawer while choosing options.
- Purchase blockers: 없음.
- Conversion triggers: option count badge and clear current step.
- Bugs: 없음.
- UX issues: 없음.
- Suggested fixes: future split tablet layout could keep plan partially visible.

## Persona Test 8

- Persona: 설치 현장 조건을 걱정하는 고객
- Viewport: PC
- Goal: 도로/크레인/전기/수도 같은 체크리스트를 찾는다.
- Path taken: `상담 신청` step.
- Positive signals: checklist appears in decision context, not as left-stage distraction.
- Confusion points: checklist is below model suitability content.
- Purchase blockers: exact required road width/cost details not in first viewport.
- Conversion triggers: checklist makes 상담 request feel useful.
- Bugs: 없음.
- UX issues: 없음.
- Suggested fixes: future accordion order can place site checklist above model suitability for this persona.

## Persona Test 9

- Persona: 상담 입력을 부담스러워하는 고객
- Viewport: PC
- Goal: required fields만 입력 가능한지 확인한다.
- Path taken: 상담 요청 modal.
- Positive signals: required information section separates name/phone/region; optional helper copy says empty is okay.
- Confusion points: none.
- Purchase blockers: none.
- Conversion triggers: field-level purpose copy.
- Bugs: 없음.
- UX issues: 없음.
- Suggested fixes: focus trap audit later.

## Persona Test 10

- Persona: 예산과 일정이 아직 정해지지 않은 초기 탐색 고객
- Viewport: Mobile
- Goal: optional fields를 비워도 되는지 확인한다.
- Path taken: 상담 modal open.
- Positive signals: global optional copy and per-field optional badges reduce pressure.
- Confusion points: more optional fields require scrolling.
- Purchase blockers: none.
- Conversion triggers: “비워두셔도 됩니다” copy.
- Bugs: 없음.
- UX issues: mobile screenshot bottom shows only top of field section due viewport height.
- Suggested fixes: consider collapsing optional fields by default later.

## Persona Test 11

- Persona: 프리미엄 거주용 Standard를 고민하는 고객
- Viewport: PC
- Goal: Standard로 바꿔도 선택 옵션이 유지되는지 확인한다.
- Path taken: select paid finish option, switch model.
- Positive signals: compatible option preserved and total recalculates.
- Confusion points: if incompatible removed, toast count only says number.
- Purchase blockers: 없음.
- Conversion triggers: model comparison feels reversible.
- Bugs: 없음.
- UX issues: toast copy could list option names.
- Suggested fixes: future incompatible option detail message.

## Persona Test 12

- Persona: 접근성을 중시하는 keyboard/screen-reader 사용자
- Viewport: PC
- Goal: modal and step navigation have semantic signals.
- Path taken: inspect roles through Playwright.
- Positive signals: step uses `aria-current`; consultation modal has `role="dialog"` and label.
- Confusion points: SVG labels are visual-only.
- Purchase blockers: possible floorplan non-text alternative gap.
- Conversion triggers: clear form labels and badges.
- Bugs: 없음.
- UX issues: full focus trap not yet asserted.
- Suggested fixes: add keyboard/focus E2E.

## Persona Test 13

- Persona: 옵션 상세 설명을 모바일에서 확인하는 고객
- Viewport: Mobile
- Goal: info icon is available without hover.
- Path taken: mobile finish step.
- Positive signals: info icon is visible on option rows.
- Confusion points: icon size is small but accessible.
- Purchase blockers: 없음.
- Conversion triggers: detail access without leaving flow.
- Bugs: 없음.
- UX issues: 없음.
- Suggested fixes: larger hit target for info icon can be reviewed.

## Persona Test 14

- Persona: 깔끔한 고급 UI를 기대하는 고객
- Viewport: PC
- Goal: configurator feels premium and restrained.
- Path taken: initial + finish step visual.
- Positive signals: off-white canvas, thin borders, restrained gold accent, compact rows.
- Confusion points: none.
- Purchase blockers: left stage could eventually benefit from higher-fidelity imagery.
- Conversion triggers: clear price and structured flow.
- Bugs: 없음.
- UX issues: none.
- Suggested fixes: avoid adding decorative images without product proof.

## Persona Test 15

- Persona: 현장 상담 전 준비물을 챙기려는 고객
- Viewport: Tablet
- Goal: included/excluded and checklist content is findable.
- Path taken: drawer summary step.
- Positive signals: summary step contains model suitability and included/excluded content.
- Confusion points: content can be long.
- Purchase blockers: long summary may need accordion.
- Conversion triggers: installation checklist.
- Bugs: 없음.
- UX issues: long content.
- Suggested fixes: future accordion with default-collapsed sections.

## Persona Test 16

- Persona: 빠른 비교를 원하는 영업 담당자
- Viewport: PC
- Goal: customer beside them can switch model quickly.
- Path taken: model step, switch Compact/Standard.
- Positive signals: visual changes are immediate, base images do not duplicate.
- Confusion points: no side-by-side compare.
- Purchase blockers: none.
- Conversion triggers: preserved compatible options.
- Bugs: 없음.
- UX issues: 없음.
- Suggested fixes: optional compare mode later.

## Persona Test 17

- Persona: 비용 투명성을 중시하는 고객
- Viewport: PC
- Goal: estimate is not confused with all-in installed price.
- Path taken: select consult option, sticky total.
- Positive signals: consult count and transport/install exclusion are near CTA.
- Confusion points: exact excluded cost unknown.
- Purchase blockers: installation quote uncertainty.
- Conversion triggers: honest labeling increases trust.
- Bugs: 없음.
- UX issues: none.
- Suggested fixes: add “별도 비용 예시” content later.

## Persona Test 18

- Persona: 도면 확대가 필요한 고령 고객
- Viewport: Mobile
- Goal: small floorplan can be enlarged.
- Path taken: floorplan zoom open/close.
- Positive signals: zoom modal still uses selected base image only.
- Confusion points: labels are still small inside source SVG.
- Purchase blockers: small label readability.
- Conversion triggers: zoom inspection control.
- Bugs: 없음.
- UX issues: label size in SVG could be improved.
- Suggested fixes: future larger mobile-specific floorplan labels.

## Persona Test 19

- Persona: 기존 Weet 운영자가 admin data consistency를 걱정하는 사람
- Viewport: PC
- Goal: UI change does not require database migration.
- Path taken: inspect helpers and tests.
- Positive signals: existing `isDefault`, `priceType`, `availableModelIds` are reused.
- Confusion points: step grouping is component-level, not data-level.
- Purchase blockers: none for user.
- Conversion triggers: stable existing data.
- Bugs: 없음.
- UX issues: maintainability risk if categories grow.
- Suggested fixes: add step metadata to customize config later.

## Persona Test 20

- Persona: 최종 구매 전 내부 검토를 하는 Weet 담당자
- Viewport: PC/tablet/mobile
- Goal: quality evidence exists before Pro/final review.
- Path taken: inspect `.codex/qa/customizer-implementation-20260607-profix/`.
- Positive signals: screenshots and summary JSON exist for all target viewports.
- Confusion points: none.
- Purchase blockers: production-domain validation still pending.
- Conversion triggers: visual evidence and passing tests.
- Bugs: 없음.
- UX issues: production QA remains follow-up.
- Suggested fixes: after review loop, deploy/promote and verify `we-et.com/customize`.

## Second-pass improvements applied

- Pro review changed step labels to `모델 선택 · 공간 구성 · 마감·설비 선택 · 상담 신청`.
- Compact SVG was realigned to make right-wall anchoring true for loaded base images, not just fallback geometry.
- Model switching now preserves compatible selected options.
- Sticky/modal estimate copy now says consult-dependent and transport/install exclusions near the CTA.
- Consultation modal now has field-level optional helper copy and real dialog semantics.

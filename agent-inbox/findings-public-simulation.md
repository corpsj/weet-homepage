# Public Website Simulation Findings

This file accumulates public-site bugs, UX concerns, conversion blockers, visual issues, and improvement ideas found during persona simulations.

## 2026-06-07 simulation packet

### Evidence baseline

- Automated browser audit covered `PC 1440x960`, `tablet 834x1112`, and `mobile 390x844`.
- Audited public routes: `/`, `/products`, `/customize`, `/support`, `/projects`.
- Additional configurator interaction evidence:
  - PC: `Standard 3x9` selection updates H1 and price; `base-floorplan-image` count is 1; `model-footprint` count is 0.
  - Tablet/mobile: selecting `Standard 3x9` through the bottom option drawer, closing the drawer, and returning to the plan updates H1 and price; `base-floorplan-image` count is 1; `model-footprint` count is 0.
- No horizontal overflow was detected on audited public pages.
- No browser console errors were detected on audited public pages.
- Representative load timings from the local audit:
  - PC: `/` 2117ms, `/products` 1256ms, `/customize` 1437ms, `/support` 1206ms, `/projects` 1004ms.
  - Tablet: `/` 1800ms, `/products` 1130ms, `/customize` 1013ms, `/support` 976ms, `/projects` 951ms.
  - Mobile: `/` 1817ms, `/products` 1211ms, `/customize` 1055ms, `/support` 971ms, `/projects` 963ms.

### Initial 10 buyer personas

1. 수도권 30대 신혼부부: 예산, 월세 대체성, 실제 생활 품질을 빠르게 비교한다.
2. 50대 귀농/세컨드하우스 구매자: 현장 설치 조건, 단열, 유지보수, 인허가 리스크를 본다.
3. 제주/강원 숙박 운영자: 숙박 운영 수익, 내구성, 반복 설치 가능성, 사진 퀄리티를 본다.
4. 카페/팝업 운영자: 외관 임팩트, 옵션 구성, 빠른 설치, 전기/수도 조건을 본다.
5. 기업 총무/현장 숙소 담당자: 다량 구매, 상담 속도, 스펙 문서, A/S 책임을 본다.
6. 주말농장/농막 구매자: 작은 모델, 가격 투명성, 운반 가능 여부를 본다.
7. 부모님 별채 검토자: 안전, 난방, 욕실, 동선, 접근성을 본다.
8. 공공/지자체 담당자: 조달 가능성, 레퍼런스, 문서 신뢰성, 내구성 근거를 본다.
9. 건축사/시공 파트너: 도면 정확성, 옵션 충돌, 구조/마감 정보의 깊이를 본다.
10. 임대사업자: 빠른 문의 전환, 모델별 가격, 납기, 반복 구매 혜택을 본다.

### Expansion trigger

The first 10 personas did not produce 100 unique hard bugs. Following the user instruction, the simulation set was expanded to 20 buyer personas and rerun mentally against the PC/tablet/mobile browser evidence.

### Expanded buyer personas

11. 예산 심사형 CFO: 숫자, 포함/별도 범위, 리스크 비용을 중시한다.
12. 에너지 성능 중시 구매자: 단열, 창호, 냉난방, 태양광 옵션을 본다.
13. 커스터마이저 중심 구매자: 도면 변경 즉시성, 옵션 설명, 충돌 방지를 본다.
14. 전화 상담 선호 고객: 화면보다 빠른 연결, 상담 준비 체크리스트를 원한다.
15. 모바일 전용 고객: 작은 화면에서 가격/CTA/옵션 이해성을 중시한다.
16. 인허가 불안 고객: 토지, 도로, 상하수도, 법적 절차 안내를 찾는다.
17. A/S 우선 고객: 보증 범위, 방문 수리, 사후 관리 책임을 본다.
18. 실제 사례 우선 고객: 완공 사진, 현장 조건, 고객 스토리를 본다.
19. 프리미엄 디자인 우선 고객: 첫 화면 미감, 이미지 품질, 브랜드 품격을 본다.
20. 가격 투명성 우선 고객: 기본가, 옵션가, 별도 비용, 상담 후 변동 가능성을 본다.

### 60 persona-device observations

1. P01 PC: 홈의 구매 확신 흐름은 예산 검토형 고객에게 좋은 진입점이다.
2. P01 Tablet: 홈과 제품 사이 전환은 안정적이지만 비교표가 더 강하면 좋다.
3. P01 Mobile: 하단 CTA는 보이지만 월 납입/총액 비교 카드가 있으면 전환이 빨라진다.
4. P02 PC: `/support`의 진행 과정 H1은 설치 불안 완화에 효과적이다.
5. P02 Tablet: 설치 조건 체크리스트를 다운로드할 수 있으면 상담 전 준비성이 오른다.
6. P02 Mobile: 긴 설명보다 현장 조건 5문항 셀프 체크가 먼저 보이면 좋다.
7. P03 PC: `/projects`가 빠르게 뜨지만 완공 사례 수와 사진 밀도가 아직 약하다.
8. P03 Tablet: 프로젝트 카드에서 지역/용도/모델 태그가 더 선명해야 한다.
9. P03 Mobile: 사진 한 장만으로 숙박 운영 신뢰를 얻기 어렵다.
10. P04 PC: `/customize` 도면과 옵션은 팝업 매장 고객에게 설득력이 있다.
11. P04 Tablet: 옵션 드로어는 잘 작동하지만 선택 후 시각 변화가 더 극적이면 좋다.
12. P04 Mobile: 옵션 상세 텍스트는 충분하나 외관 렌더 이미지가 부족하다.
13. P05 PC: 기업 담당자는 관리자/문서형 스펙 PDF 링크를 기대한다.
14. P05 Tablet: 대량 구매 또는 B2B 상담 CTA가 별도로 있으면 좋다.
15. P05 Mobile: 전화 연결/상담 예약 CTA가 상단에 더 빠르게 노출되면 좋다.
16. P06 PC: Compact 3x6 기본 가격과 도면이 명확해 작은 모델 검토에 강하다.
17. P06 Tablet: 농막/주말농장 규정 차이를 FAQ로 직접 연결하면 좋다.
18. P06 Mobile: 기본가와 운반/설치 별도 문구가 보여 신뢰에 도움된다.
19. P07 PC: 부모님 별채 고객은 욕실/난방/단차 정보가 더 필요하다.
20. P07 Tablet: 도면 라벨이 작아 보일 수 있어 접근성 확대 컨트롤이 필요하다.
21. P07 Mobile: 도면은 안정적으로 보이나 핀치 확대 또는 확대 모달이 있으면 좋다.
22. P08 PC: 공공 담당자에게는 인증/납품/시공 프로세스 근거가 부족하다.
23. P08 Tablet: 프로젝트 사례에 공공/기관 필터가 있으면 의사결정이 빠르다.
24. P08 Mobile: 문의 전 제출 가능 서류 목록이 있으면 좋다.
25. P09 PC: 도면 단일 렌더링이 고쳐져 전문 사용자에게 혼란이 줄었다.
26. P09 Tablet: 옵션 충돌 관계를 설명하는 도면 주석이 더 필요하다.
27. P09 Mobile: 옵션 드로어에서 모델 선택 후 닫아야 본문 변화를 볼 수 있어 안내가 필요하다.
28. P10 PC: 빠른 모델 선택과 주문 CTA는 임대사업자에게 좋다.
29. P10 Tablet: 복수 대수 견적 요청 플로우가 없다.
30. P10 Mobile: 상담 요청 폼까지 도달은 쉽지만 반복 구매 의도를 담는 필드가 없다.
31. P11 PC: 기본가와 옵션가는 보이나 포함/별도 비용 총괄표가 필요하다.
32. P11 Tablet: 예상 총액 아래 `운반/설치 별도`는 좋지만 범위 예시가 필요하다.
33. P11 Mobile: 총액 CTA 영역은 안정적이지만 비용 리스크 링크가 더 가까워야 한다.
34. P12 PC: 태양광 등 상담 옵션은 보이나 에너지 성능 근거가 부족하다.
35. P12 Tablet: 단열/창호/냉난방 패키지 비교표가 필요하다.
36. P12 Mobile: 성능 정보가 옵션 상세 안에 묻혀 있을 수 있다.
37. P13 PC: 도면 중복 렌더링 문제는 해소되어 커스터마이저 신뢰가 올라갔다.
38. P13 Tablet: 모델 전환은 드로어 안에서 가능하지만 닫기 후 변화 확인 UX가 조금 숨겨져 있다.
39. P13 Mobile: 옵션 선택 후 하단 총액 업데이트는 명확하다.
40. P14 PC: 상담 요청 모달은 충분하지만 전화 상담 선호 고객용 즉시 연락 CTA가 약하다.
41. P14 Tablet: 상담 가능 시간과 평균 응답 시간이 있으면 좋다.
42. P14 Mobile: 전화/카카오/폼 중 선택 가능한 상담 채널이 필요하다.
43. P15 PC: PC 경험은 정보가 넓게 배치돼 설득력이 있다.
44. P15 Tablet: 태블릿에서 하단 CTA는 안정적이나 상단 여백이 길게 느껴진다.
45. P15 Mobile: 첫 화면의 큰 여백은 프리미엄 느낌도 있으나 빠른 정보 접근을 늦춘다.
46. P16 PC: 인허가/도로/부지 준비 안내가 더 직접적이면 이탈을 줄인다.
47. P16 Tablet: `지원/확인사항` 페이지는 좋은 기반이다.
48. P16 Mobile: 3분 자가진단이 있으면 구매 가능성 판단이 쉬워진다.
49. P17 PC: A/S와 보증 정보를 카드형으로 홈/제품 근처에 노출해야 한다.
50. P17 Tablet: 사후관리 사진 또는 프로세스 증거가 부족하다.
51. P17 Mobile: 보증 문구가 CTA 근처에 있으면 신뢰가 올라간다.
52. P18 PC: 실제 완공 프로젝트가 더 많아야 고가 구매 설득력이 커진다.
53. P18 Tablet: 프로젝트 상세에 공사 전/중/후 사진 흐름이 필요하다.
54. P18 Mobile: 사진 갤러리 확대/스와이프가 구매 감정에 중요하다.
55. P19 PC: 현 관리자 리디자인과 같은 프리미엄 톤을 공개 홈페이지에도 더 확장하면 좋다.
56. P19 Tablet: 섹션 간 리듬은 안정적이나 이미지 퀄리티 업그레이드 여지가 크다.
57. P19 Mobile: 브랜드 첫인상이 더 고급스러워지려면 hero media가 더 강해야 한다.
58. P20 PC: 가격 투명성은 기본가/옵션가로 좋은 시작점이다.
59. P20 Tablet: 옵션별 `상담` 가격의 결정 기준을 설명해야 한다.
60. P20 Mobile: 견적 저장/공유 링크는 URL sync로 가능하지만 사용자에게 명시되지 않는다.

### 40 additional actionable observations

61. Strength: `/customize` clean URL behavior prevents intimidating long URLs before first user change.
62. Strength: `/customize` order modal opens without prematurely creating a consultation.
63. Strength: Insert-only consultation E2E confirms RLS-compatible submission.
64. Strength: `/products` staged rendering likely reduces first-load image burden.
65. Strength: `/projects` readiness filtering avoids weak/test portfolio leakage.
66. Strength: local audit found no horizontal overflow in public routes.
67. Strength: local audit found no public console errors.
68. Strength: mobile option drawer appears before the order CTA, so configuration is not hidden behind checkout.
69. Fix verified: `/customize` no longer renders dynamic `model-footprint` over base SVG plans.
70. Fix verified: PC `Standard 3x9` selection shows only one base plan image.
71. Fix verified: tablet `Standard 3x9` selection through drawer shows only one base plan image after drawer close.
72. Fix verified: mobile `Standard 3x9` selection through drawer shows only one base plan image after drawer close.
73. UX risk: mobile/tablet model change feedback is partly hidden until the drawer is closed.
74. UX risk: floorplan labels may be too small for older buyers on mobile.
75. Resolved in current slice: `/customize` now has an explicit mobile-safe floorplan zoom inspection mode.
76. UX risk: consultation CTA does not ask buying timeline or site readiness.
77. UX risk: no separate B2B/bulk inquiry flow.
78. UX risk: no strong visual proof of transport/install process near the CTA.
79. UX risk: no financing, deposit, payment milestone, or installment explanation.
80. UX risk: no concise warranty/A/S comparison block near products.
81. UX risk: no customer testimonial or buyer story near price-sensitive sections.
82. UX risk: `Projects` H1 remains English; Korean premium brand tone would benefit from Korean heading.
83. UX risk: project cards should expose model, location, purpose, and completion month more strongly.
84. UX risk: hidden incomplete projects are correctly blocked, but public portfolio depth remains business-content dependent.
85. UX risk: option items with `상담` pricing need a short explanation of what drives the final price.
86. UX risk: saved configuration URL is not presented as a share/save feature.
87. UX risk: no comparison table between Compact and Standard models.
88. UX risk: no “recommended for” buyer type per model.
89. UX risk: no site-prep self diagnosis on `/support`.
90. UX risk: no quick answer for “우리 땅에 들어올 수 있나?”.
91. UX risk: no delivery-route checklist visible in the configurator.
92. UX risk: no admin-controlled promotion/banner proof surfaced in the public audit scope.
93. UX risk: image generation opportunities remain open for hero/product proof visuals.
94. UX risk: product media should include real interior/exterior/transport/install sequence, not only atmospheric images.
95. Performance watch: PC home local load was the slowest audited public route at about 2117ms.
96. Performance watch: mobile home local load was about 1817ms; still acceptable locally but should be watched after image upgrades.
97. Accessibility watch: icon-only or compact controls should keep visible focus and accessible labels.
98. Accessibility watch: floorplan SVG labels need contrast/size review on small screens.
99. Copy opportunity: replace generic claims with exact ranges, lead times, installation conditions, and warranty terms.
100. Conversion opportunity: add a sticky “내 부지 가능성 확인” path before asking for a full order consultation.

### Priority backlog for the next public-site implementation slice

- Floorplan zoom/full-screen inspector for mobile, tablet, and older buyers was added in the current slice; continue improving panning/zoom affordance if future visual QA finds friction.
- Add model comparison with “recommended for” use cases and included/extra cost rows.
- Add site-readiness self diagnosis: road width, crane/truck access, utility status, foundation status, region.
- Add transport/install proof strip with generated or real images.
- Add warranty/A/S/maintenance proof section near product and customize CTAs.
- Add B2B/bulk inquiry variant and consultation form fields for timeline, quantity, intended use, and site status.
- Upgrade public image system with high-quality product/interior/transport visuals.

## 2026-06-07 homepage premium-first visual QA

101. Fix verified: homepage hero was rebuilt into a full-bleed dark product/home image experience instead of a generic landing-page card composition.
102. Fix verified: desktop first viewport now exposes the next `TRANSPARENCY` section hint, so the hero does not trap the visitor in a single full-screen panel.
103. Fix verified: mobile first viewport shows the brand, hero headline, primary CTA, secondary process link, and the next transparency heading without horizontal overflow.
104. Fix verified: the two homepage hero/support images that initially produced local Next image optimizer 400s were replaced with safer asset paths.
105. Strength: the new headline `작은 공간, 선명한 기준.` feels younger and more editorial while staying clear for first-time buyers.
106. Strength: `모델 구성하기` remains the first purchase-oriented CTA and points to `/customize`.
107. Strength: `진행 과정 보기` gives anxious buyers a lower-pressure path before configuration.
108. Strength: the trust copy explicitly names model selection, transport, installation, and expected cost transparency.
109. Visual QA PC: screenshot `.codex/qa/visual-home-admin-20260607-final/pc-home.png` shows no text overlap, no horizontal squeeze, and the next section visible at the bottom edge.
110. Visual QA tablet: screenshot `.codex/qa/visual-home-admin-20260607-final/tablet-home.png` was captured; report shows `overflowX: false`, hero visible, next transparency section visible.
111. Visual QA mobile: screenshot `.codex/qa/visual-home-admin-20260607-final/mobile-home.png` shows CTA buttons stacked safely and no clipped hero text.
112. Watch: public homepage still needs real/generated transport, install, interior, and proof visuals beyond the first hero image to reach category-leading depth.
113. Watch: public pages outside the homepage still contain older rounded public UI patterns; these were not the current admin-focused implementation target.
114. Watch: price guidance remains qualitative; buyers still need concrete delivery/install example ranges and conditions.
115. Watch: warranty/A/S proof should be pulled closer to product/configuration CTAs.
116. Watch: B2B and institution buyer flows remain a major conversion opportunity.
117. Watch: generated homepage image replacement should be considered only through Chrome/ChatGPT web control with `최신 • 5.5` and Thinking/Pro `확장`.
118. Watch: local QA request failures were limited to local Vercel Insights/GA aborts during route changes, not visible page breakage.
119. Watch: homepage visual system is now darker and more premium; `/products`, `/projects`, `/support`, and `/company` should gradually inherit the same confidence/proof rhythm.
120. Next candidate: add an install/transport proof strip using generated or real visual assets and a short “우리 땅에 들어올 수 있나?” self-check path.

## 2026-06-07 Pro MUST_FIX closure public findings

121. GPT-5.5 Pro found the homepage dark transparency section used `text-gray-500` on `#111111` for small text, below normal text contrast expectations.
122. Fix verified: the dark-section eyebrow and feature body text now use `text-gray-400`.
123. Post-fix local screenshot `.codex/qa/post-pro-mustfix-20260607-v2/desktop-home-contrast.png` confirms the updated class is rendered in the first transparency section.
124. GPT-5.5 Pro closure marker `WEET_REVIEW_20260607_HOME_ADMIN_MUSTFIX_CLOSURE_06` returned `VERDICT: PASS` and `MUST_FIX: None`.

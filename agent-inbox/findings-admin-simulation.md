# Admin Simulation Findings

This file accumulates admin-page bugs, UX concerns, rendering issues, performance issues, and improvement ideas found during administrator simulations.

## 2026-06-07 simulation packet

### Evidence baseline

- Automated browser audit covered the authenticated `/admin` dashboard at `PC 1440x960`, `tablet 834x1112`, and `mobile 390x844`.
- A temporary service-role-created admin account was used for the audit and cleaned up after the run.
- Dashboard H1 was `대시보드` on all audited viewports.
- Sidebar/drawer navigation exposed the expected admin routes: 대시보드, UTM Builder, 랜딩 페이지, 제품 관리, 주문 구성, 프로젝트 관리, FAQ 관리, 고객 인사이트, 갤러리 관리, 상담 관리, 레거시 문의, 설정.
- No horizontal overflow was detected on the audited admin dashboard.
- No browser console errors were detected on the audited admin dashboard.
- Representative local dashboard timings:
  - PC `/admin`: about 1292ms.
  - Tablet `/admin`: about 1288ms.
  - Mobile `/admin`: about 1417ms.
- Visual inspection of `.codex/visual-audit/pc-admin.png` confirms the new premium console direction: black sidebar, off-white canvas, yellow operational accent, dense status cards, workflow rail, quality status rail, and quick actions.

### Initial 10 admin personas

1. 대표/소유자: 매출 흐름, 상담 현황, 공개 제품 상태, 프로젝트 품질을 빠르게 본다.
2. 영업 매니저: 신규 상담, 상담 우선순위, 내부 메모, 견적 상태를 본다.
3. 제품 관리자: 공개 제품, 옵션, 모델별 도면, 가격을 관리한다.
4. 마케팅 담당자: UTM, 랜딩 페이지, 유입 분석, 전환 흐름을 본다.
5. 프로젝트 콘텐츠 매니저: 프로젝트 공개 상태, 사진, 설명 품질을 관리한다.
6. 고객지원 담당자: 신규/처리중/완료 상담과 응답 기록을 관리한다.
7. 데이터/인사이트 담당자: 웹 로그, 인기 페이지, 유입 소스, 병목을 본다.
8. 현장 운영 코디네이터: 프로젝트 단계, 설치 조건, 상담 후속 준비를 본다.
9. 갤러리/사진 담당자: 이미지 품질, alt, 공개 여부, 정렬을 관리한다.
10. 보안/권한 관리자: 로그인, 권한, 설정, 감사 가능성을 본다.

### Expansion trigger

The first 10 administrator personas did not produce 100 unique hard bugs. Following the user instruction, the simulation set was expanded to 20 admin personas and rerun against the PC/tablet/mobile browser evidence plus source inspection.

### Expanded admin personas

11. 재무 담당자: 가격, 옵션 원가, 상담별 금액 흐름을 본다.
12. 신규 직원: 길을 잃지 않고 제품/상담/프로젝트를 처리해야 한다.
13. 현장 매니저: 모바일에서 설치 조건과 상담 내용을 빠르게 확인한다.
14. 상담팀 리더: 처리 SLA, 우선순위, 미응답 상담을 본다.
15. 외부 마케팅 에이전시: UTM/랜딩/성과만 안전하게 다루고 싶다.
16. 야간 모바일 관리자: 작은 화면에서 긴급 상담과 상태를 확인한다.
17. 품질 감사자: 공개 가능한 콘텐츠와 약한 콘텐츠를 구분한다.
18. SEO/카피 에디터: 제목, 설명, FAQ, 프로젝트 문구 품질을 관리한다.
19. IT/DB 관리자: 데이터 오류, 이미지 깨짐, 권한, 로그를 본다.
20. 임원 보고 사용자: 한 화면에서 핵심 상태와 리스크를 훑는다.

### 60 persona-device observations

1. A01 PC: 새 대시보드는 대표가 공개 제품, 신규 상담, 프로젝트, 옵션 수를 한눈에 본다.
2. A01 Tablet: 태블릿에서도 핵심 카드가 안정적으로 보인다.
3. A01 Mobile: 모바일은 drawer navigation이 작동하지만 대표용 요약 density는 더 다듬을 여지가 있다.
4. A02 PC: 신규 상담 카운트가 전면에 있어 영업 우선순위가 보인다.
5. A02 Tablet: 상담 관리로 바로 이동하는 빠른 작업이 유용하다.
6. A02 Mobile: 신규/긴급 상담이 0일 때는 정상이나 SLA/마지막 상담 시간도 필요하다.
7. A03 PC: 주문 도면 품질 상태가 대시보드에 노출되어 제품 관리 리스크를 줄인다.
8. A03 Tablet: 주문 구성 진입이 빠르다.
9. A03 Mobile: 모델/옵션/도면 수정은 모바일에서 복잡할 수 있어 보호 UX가 필요하다.
10. A04 PC: 웹 로그 분석 액션이 상단에 있어 마케팅 담당자에게 좋다.
11. A04 Tablet: UTM Builder가 sidebar에서 잘 보인다.
12. A04 Mobile: 마케팅 외주가 접근할 경우 권한 분리가 필요하다.
13. A05 PC: 프로젝트 수와 빠른 진입이 명확하다.
14. A05 Tablet: 프로젝트 공개 품질 badge를 하위 페이지에도 premium console tone으로 통일해야 한다.
15. A05 Mobile: 프로젝트 사진 업로드/편집 흐름은 별도 모바일 검증이 필요하다.
16. A06 PC: 상담 관리 빠른 작업은 고객지원 담당자에게 직접적이다.
17. A06 Tablet: 상담 상태 rail이 더 상세하면 좋다.
18. A06 Mobile: 긴급 상담 push/indicator가 없으면 모바일 관리자에게 놓침 리스크가 있다.
19. A07 PC: 인사이트 진입은 있으나 dashboard card가 실제 analytics 상태를 요약하지 않는다.
20. A07 Tablet: GA timeout/fallback은 안정성 면에서 좋은 선행 개선이다.
21. A07 Mobile: 차트형 상세 페이지는 모바일에서 추가 검증이 필요하다.
22. A08 PC: 운영 rail은 현장 코디네이터에게 직관적이다.
23. A08 Tablet: 프로젝트/상담/주문 도면이 하나의 운영 흐름으로 연결되면 더 강해진다.
24. A08 Mobile: 현장 사용자는 상담 지역/부지조건을 대시보드에 바로 보고 싶다.
25. A09 PC: 갤러리 관리 route가 보인다.
26. A09 Tablet: 갤러리 품질 상태는 dashboard readiness rail에 아직 포함되지 않는다.
27. A09 Mobile: 이미지 업로드 UI는 모바일 네트워크/파일 크기 검증이 필요하다.
28. A10 PC: 권한 보호 상태가 품질 rail에 있어 보안 신뢰가 올라간다.
29. A10 Tablet: 설정 route가 drawer에 보인다.
30. A10 Mobile: 로그아웃 버튼이 하단에 있어 실수 클릭 위험은 낮다.
31. A11 PC: 활성 옵션 수는 재무 담당자에게 가격 검토의 시작점이 된다.
32. A11 Tablet: 옵션별 원가/마진/상담 가격 기준은 아직 없다.
33. A11 Mobile: 가격 수정은 모바일에서 실수 방지 confirmation이 필요하다.
34. A12 PC: 새 대시보드의 운영 rail은 신규 직원에게 첫 방향을 준다.
35. A12 Tablet: sidebar section labels가 업무군을 나눠 학습 비용을 줄인다.
36. A12 Mobile: drawer navigation은 작동하지만 현재 위치 breadcrumb가 있으면 더 쉽다.
37. A13 PC: 현장 매니저에게 프로젝트/상담 연결 정보가 부족하다.
38. A13 Tablet: tablet dashboard는 현장 회의 중 보기 좋다.
39. A13 Mobile: 현장 조건 체크 필드를 상담과 연결해야 한다.
40. A14 PC: 상담 응답 rail은 리더에게 좋으나 SLA 지표가 없다.
41. A14 Tablet: 미응답/오늘 상담/처리중 구분이 더 필요하다.
42. A14 Mobile: 모바일에서 긴급 상담을 상단 배지로 보여야 한다.
43. A15 PC: UTM Builder가 그대로 영어 mixed tone이라 premium console 통일이 필요하다.
44. A15 Tablet: 외부 사용자 권한 제한/읽기 전용 범위가 필요하다.
45. A15 Mobile: UTM 복사/생성 흐름은 작은 화면 별도 검증이 필요하다.
46. A16 PC: 야간 관리자에게 dashboard는 빠르게 로드된다.
47. A16 Tablet: dark sidebar는 시인성이 좋다.
48. A16 Mobile: 하단 action card와 drawer가 겹치지 않는지 하위 페이지 추가 검증이 필요하다.
49. A17 PC: 대시보드 품질 rail이 감사자 관점에 적합하다.
50. A17 Tablet: 공개 가능한 콘텐츠 readiness를 프로젝트/제품/갤러리까지 확장해야 한다.
51. A17 Mobile: 감사 체크리스트를 export하거나 링크로 공유할 수 있으면 좋다.
52. A18 PC: CMS 하위 화면은 아직 기존 rounded-xl 카드 톤이 남아 있다.
53. A18 Tablet: FAQ/landing/copy editor의 text fit 검증이 필요하다.
54. A18 Mobile: 긴 폼 편집은 저장 상태와 unsaved guard가 필요하다.
55. A19 PC: dashboard console errors는 0개였지만 하위 페이지의 데이터 오류 검증은 남아 있다.
56. A19 Tablet: image missing/fallback consistency를 하위 admin routes까지 확장해야 한다.
57. A19 Mobile: 권한, 세션 만료, 업로드 실패 시나리오를 추가해야 한다.
58. A20 PC: 임원 보고용으로는 새 대시보드가 훨씬 강하다.
59. A20 Tablet: 숫자 외에 위험/다음 행동이 더 선명하면 좋다.
60. A20 Mobile: 핵심 지표 4개는 보이나 “오늘 해야 할 1순위”가 더 강조되어야 한다.

### 40 additional actionable observations

61. Strength: dashboard visual language now matches premium technical-console intent better than the previous generic admin surface.
62. Strength: black sidebar and off-white canvas create a clear admin/public brand bridge.
63. Strength: yellow accent is used for operations priority, not as a decorative blob.
64. Strength: sidebar grouping into 운영/콘텐츠/상담/시스템 improves scan speed.
65. Strength: mobile header and drawer navigation work in the audited dashboard route.
66. Strength: dashboard uses compact repeated cards without nested card structures.
67. Strength: quality rail explicitly mentions floorplan single rendering.
68. Strength: quick actions expose products, order config, consultations, and analytics.
69. Strength: local audit detected no dashboard horizontal overflow.
70. Strength: local audit detected no dashboard console errors.
71. Fix verified: admin shell removed the old generic dashboard feeling on the main route.
72. Fix verified: sidebar active state is visible and aligned with the premium tech direction.
73. Fix verified: Korean logout and Korean section labels reduce mixed-language friction.
74. Risk: many child admin files still use `rounded-xl`, `rounded-2xl`, `rounded-3xl`, `tracking-tight`, or old card-heavy styling.
75. Risk: `components/admin/utm/UtmBuilder.tsx` still has old rounded card styling.
76. Risk: `components/admin/cms/SupportEditor.tsx` and `MainCmsClient.tsx` still have old rounded card styling.
77. Risk: `components/admin/projects/ProjectForm.tsx` and `AdminProjectsClient.tsx` still have old page heading/card tone.
78. Risk: `components/admin/gallery/GalleryForm.tsx` and `GalleryList.tsx` still have old card tone.
79. Risk: `components/admin/insights/AnalyticsDashboard.tsx` still has large rounded cards and some uppercase/tracking styling.
80. Risk: `components/admin/inquiries/InquiryList.tsx` still needs premium console unification.
81. Risk: `components/admin/products/ProductModal.tsx` and `ProductGrid.tsx` still need premium console unification.
82. Risk: `app/admin/insights/page.tsx` fallback/error UI still has old rounded cards.
83. Risk: project/gallery edit/new page headings still use `tracking-tight`.
84. Risk: some admin strings remain English (`UTM Builder`, `Heatmaps`); acceptable when technical, but tone should be intentional.
85. Risk: admin dashboard does not yet expose recent activity, audit log, or last updated timestamp.
86. Risk: no role/permission matrix is visible from the dashboard.
87. Risk: no explicit slow-query or integration health indicator exists.
88. Risk: no failed upload/image broken state summary exists.
89. Risk: no admin-wide “needs review before public” queue exists.
90. Risk: dashboard stats do not yet link with visible hover/focus affordance on all cards.
91. UX opportunity: add a command-palette-like global search for products/projects/consultations.
92. UX opportunity: add `today only` and `needs action` modes to consultations.
93. UX opportunity: add project readiness score and blockers on dashboard.
94. UX opportunity: add product readiness score: images, price, visibility, floorplan, options.
95. UX opportunity: add gallery media health score: missing alt, low resolution, duplicate images.
96. UX opportunity: add admin skeleton/loading states that match the new console theme.
97. UX opportunity: add unsaved-change guards to long edit forms.
98. UX opportunity: add mobile-safe destructive action confirmations.
99. UX opportunity: add deep-link copy/share for admin records.
100. UX opportunity: add a weekly executive report export from dashboard state.

### Priority backlog for the next admin implementation slice

- Unify all child admin pages under the new console visual system: `rounded-md`, thin borders, compact typography, no negative/tracked letter spacing, no oversized decorative cards.
- Convert product, project, inquiry, insights, gallery, UTM, and CMS pages to operational surfaces rather than generic SaaS cards.
- Add dashboard health modules for product readiness, project readiness, media health, consultation SLA, and integration state.
- Add admin global search/command palette for fast navigation.
- Add unsaved-change guards and destructive action confirmations across edit forms.
- Add role-aware visibility for marketing-only, content-only, support-only, and owner-level actions.

## 2026-06-07 admin console slice QA

### Evidence baseline

- Local authenticated QA used a temporary service-role-created `@weet.com` admin account and deleted it after the run.
- Audited routes: `/admin/products`, `/admin/projects`, `/admin/consultations`, `/admin/insights`.
- Audited viewports: PC `1440x960`, tablet `834x1112`, mobile `390x844`.
- Evidence saved to `.codex/qa/admin-console-slice/summary.json` and 12 screenshots in `.codex/qa/admin-console-slice/`.
- All 12 route/viewport checks showed `overflowX: false`, visible offscreen interactive controls `0`, console/page errors `0`, and expected console probes visible.

### New observations

101. 제품 관리 PC: 제품 준비도 카드, 이미지 보완, 가격 보완이 상단에 고정되어 제품 운영 화면의 목적이 더 선명해졌다.
102. 제품 관리 PC: 각 제품 카드에 준비도 링이 추가되어 공개 가능성 판단이 빠르다.
103. 제품 관리 mobile: 필터/검색이 안정적으로 쌓이지만 첫 화면 세로 공간을 많이 사용한다. 다음 개선에서 접이식 toolbar가 유리하다.
104. 제품 관리 mobile: 이미지·가격 보완 수가 0일 때도 상태 카드가 남아 있어 운영 안정감을 준다.
105. 프로젝트 관리 PC: invalid image URL이 있어도 `getProjectHeroImage` 기반 placeholder로 안전하게 렌더링된다.
106. 프로젝트 관리 PC: 프로젝트 준비도 링과 public issue chip이 같은 행에 있어 공개 차단 사유가 명확하다.
107. 프로젝트 관리 mobile/tablet: 검색 input과 상태 filter가 overflow 없이 유지된다.
108. 상담 관리 PC: 신규/진행/SLA 위험/완료 metric이 생겨 상담팀 리더가 우선순위를 즉시 볼 수 있다.
109. 상담 관리 mobile: 상담이 0건일 때 empty state가 안정적이지만, 다음 행동 링크가 없어서 약간 정적이다.
110. 상담 관리 tablet: 상세 `details` 영역은 기존보다 console tone과 잘 맞지만 실제 상담 데이터가 많을 때 펼침 행 밀도 검증이 추가로 필요하다.
111. 인사이트 PC: 장식적인 큰 radius와 원형 blur가 제거되어 shell/dashboard와 더 잘 맞는다.
112. 인사이트 mobile: GA 미연동 상태와 연동 완료 상태 모두 header가 같은 console hierarchy를 쓴다.
113. 공통: `ConsolePrimitives` 도입으로 다음 하위 페이지 통일 비용이 줄었다.
114. 공통: `ReadinessRing`은 제품/프로젝트에 유용하므로 갤러리 media health에도 재사용 가능하다.
115. 공통: console tone은 현재 black/off-white/yellow 조합이며, 공개 홈페이지와도 브랜드 bridge가 생긴다.
116. 위험: `UTM Builder`, `CMS`, `gallery`, `inquiries`, edit/new forms는 아직 old SaaS rounded-card tone이 남아 있다.
117. 위험: Product modal은 아직 `rounded-2xl shadow-xl` tone이라 새 콘솔과 완전히 맞지 않는다.
118. 위험: destructive action confirmation은 프로젝트 삭제 `confirm()` 수준이며, mobile-safe custom confirmation으로 개선 여지가 있다.
119. 위험: command palette/global search는 아직 구현되지 않았다.
120. 다음 추천: UTM/CMS/gallery/inquiries를 같은 console table/editor system으로 순차 전환하고, modal/form 계층까지 통일한다.

## 2026-06-07 remaining admin surfaces console QA

121. Fix verified: Antigravity implemented the second admin slice through Computer Use and Codex accepted the intended 14-file change set.
122. Fix verified: `components/admin/AdminHeader.tsx` no longer exposes the old `대시보드` title; the main route remains `작업실`.
123. Fix verified: `components/admin/inquiries/InquiryList.tsx` now uses compact console search/filter/list treatment on mobile without horizontal overflow.
124. Fix verified: `components/admin/gallery/GalleryList.tsx` now presents gallery content as scan-friendly media records with squared panels.
125. Fix verified: `components/admin/gallery/GalleryForm.tsx` and gallery new/edit pages now use the same console form panel system.
126. Fix verified: `components/admin/projects/ProjectForm.tsx` and project new/edit pages now use console panels, compact labels, and mobile-safe stacking.
127. Fix verified: `components/admin/ProductForm.tsx`, product new/edit pages, and `ProductModal.tsx` now share the new console form language.
128. Fix verified: `components/admin/cms/SupportEditor.tsx` now aligns FAQ/notice management with the same off-white, thin-border console system.
129. Fix verified: `components/admin/utm/UtmBuilder.tsx`, CMS main, customize manager, settings, insights, and analytics remain aligned with the first console slice.
130. Fix verified: targeted grep found 0 `tracking-tight`, `tracking-tighter`, `rounded-xl`, `rounded-2xl`, `rounded-3xl`, `shadow-xl`, `shadow-2xl`, or visible `대시보드` matches under `app/admin` and `components/admin`.
131. Visual QA PC: `pc-admin.png` shows a clear black sidebar, `작업실` hierarchy, compact status rail, central action queue, and right quick-action rail.
132. Visual QA mobile: `mobile-admin-gallery.png` shows gallery cards with loaded transport/install images, no text overlap, and no horizontal overflow.
133. Visual QA mobile: `mobile-admin-products-modal-new-loaded-recheck.png` shows the product modal form loaded with visible inputs, selects, checkboxes, and safe spacing.
134. Visual QA tablet: `tablet-admin-gallery-new.png` shows the gallery creation form with safe controls and no clipped buttons.
135. Visual QA mobile: `mobile-admin-support.png` shows FAQ management with clear tabs and action buttons.
136. Visual QA mobile: `mobile-admin-inquiries.png` shows searchable inquiry records with readable status pills.
137. Recheck: visible image failures were 0 for gallery and product modal after filtering to viewport-visible images.
138. Recheck: initial image-failure report was caused by lazy/offscreen images and local analytics aborts, not broken visible UI.
139. Recheck: product modal initially captured the dynamic import spinner; waiting for `기본 정보` confirmed the form loads correctly.
140. Remaining opportunity: add admin global search/command palette so the disabled search input becomes an actual tool.
141. Remaining opportunity: add unsaved-change guard to long product/project/gallery forms.
142. Remaining opportunity: add media health/readiness scores for gallery and product images.
143. Remaining opportunity: add role-aware action visibility and stronger destructive-action confirmations.
144. Remaining opportunity: add recent activity/audit log so operations history is visible.
145. Remaining opportunity: compress mobile product filters into a drawer or collapsible toolbar for repeated daily use.
146. Risk watch: local `_vercel/insights/script.js`, GA, and Clarity requests abort during local Playwright navigation; production validation should distinguish analytics noise from real app errors.
147. Risk watch: Next middleware-to-proxy deprecation remains unrelated to UI but should be scheduled.
148. Risk watch: public homepage and admin now share a stronger premium tone, but public product/project/support pages still need the same proof-driven content upgrade.
149. Validation: `git diff --check`, lint, Vitest, production build, and 12 Playwright E2E tests passed after the admin/product patches.
150. Validation: `.codex/qa/visual-home-admin-20260607-final/report.json` and `recheck.json` contain 51 route/viewport/modal checks plus targeted image/modal recheck.

## 2026-06-07 Pro MUST_FIX closure admin findings

151. GPT-5.5 Pro found that notice records had `content` in the data model but no admin body editor; fixed by adding notice content textarea and explicit save/reset controls.
152. GPT-5.5 Pro found FAQ/notice fields saved on every keypress; fixed by local draft state plus explicit save buttons to prevent request storms and response-order races.
153. GPT-5.5 Pro found admin counts silently converted DB/query failures into `0`; fixed by structured count results and visible `연결 오류` state.
154. GPT-5.5 Pro found inquiry status/delete/reply paths could leave UI and DB out of sync; fixed by result checks, pending locks, rollback, and failure toasts.
155. Visual QA found mobile notice management still behaved like a clipped table even without document-level overflow; fixed by replacing the mobile table with a card editor.
156. Post-fix visual QA verified desktop notice draft editor, desktop FAQ draft save flow, desktop inquiry rollback toast, and mobile notice card editor.
157. Post-fix local QA report `.codex/qa/post-pro-mustfix-20260607-v2/report.json` shows all five targeted checks passing.
158. GPT-5.5 Pro closure marker `WEET_REVIEW_20260607_HOME_ADMIN_MUSTFIX_CLOSURE_06` returned `VERDICT: PASS` and `MUST_FIX: None`.
159. Production QA after commit `088555f` found React hydration error #418 on real `www.we-et.com` admin pages; fixed by replacing locale/timezone-dependent date rendering with deterministic KST formatting in support and inquiry admin screens.

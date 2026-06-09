# GPT-5.5 Pro Review Packet

Marker: `WEET_REVIEW_20260609_SOLUTION_RENEWAL_05`

## Active Task Brief

Renew the Weet public Solution section and all solution detail pages. The user specifically asked for Korean photorealistic images, option-focused rather than large 이동식주택/building shots, and a cold customer-perspective renewal of the Solution page. The section should help Weet feel like Korea's top premium/trendy mobile-home/modular-space company.

Scope in this packet:

- Rebuilt `/solution` as customer-facing operation option selection.
- Rebuilt `/solution/cctv`, `/solution/network`, `/solution/iot`, and `/solution/design` as operations-first detail pages.
- Generated four final Korean photorealistic option images via Chrome/ChatGPT visible web control, one image per new chat, using `최신 • 5.5`, `Thinking • 확장`, `이미지 만들기`, 16:9.
- Updated metadata, E2E assertions, and agent-inbox/state records.

## Current Progress / State

Local implementation and validation are complete. GPT-5.5 Pro review is pending. No concrete Pro feedback has been applied for this slice yet.

Important workflow events:

- Stickies was checked during the work. New steering said option images must emphasize the option, not show the 이동식주택 too large.
- The first regenerated security image had the building too prominent, so it was discarded and overwritten with an option-focused CCTV/sensor-light/smart-lock detail image.
- Antigravity IDE was used for the frontend handoff attempt, but it produced no repository diff after exploring files and running lint; the run was later found in `User cancelled agent execution` state. Codex continued directly and recorded the failure in `agent-inbox/antigravity-failures.md`.
- One ChatGPT new chat briefly showed `Pro 확장 모드`; Codex switched it back to `Thinking • 확장` before sending any image prompt.

## Project Snapshot

- Framework: Next.js app router, React, TypeScript, Tailwind, lucide-react.
- Language toggle support: existing `useLanguage` context with KO/EN copy.
- Branch: `zoo/customize-configurator`.
- Runtime target: public site pages; final deployment should be verified on `we-et.com` after push.

## Git Status

```text
## zoo/customize-configurator...origin/zoo/customize-configurator
 M .codex/state.md
 M agent-inbox/antigravity-failures.md
 M agent-inbox/findings-public-simulation.md
 M agent-inbox/implementation-backlog.md
 M app/solution/cctv/layout.tsx
 M app/solution/cctv/page.tsx
 M app/solution/design/layout.tsx
 M app/solution/design/page.tsx
 M app/solution/iot/layout.tsx
 M app/solution/iot/page.tsx
 M app/solution/network/layout.tsx
 M app/solution/network/page.tsx
 M app/solution/page.tsx
 M components/solution/SolutionTemplate.tsx
 M e2e/public-pages.spec.ts
?? .codex/qa/solution-renewal-20260609/
?? .codex/qa/solution-renewal-before-20260609/
?? agent-inbox/solution-renewal-assets.md
?? public/images/solution/generated/

```

## Changed Files / Diff Stat

```text
 .codex/state.md                           |  98 ++----
 agent-inbox/antigravity-failures.md       |   8 +
 agent-inbox/findings-public-simulation.md |  18 ++
 agent-inbox/implementation-backlog.md     |   7 +-
 app/solution/cctv/layout.tsx              |   8 +-
 app/solution/cctv/page.tsx                | 146 +++------
 app/solution/design/layout.tsx            |   8 +-
 app/solution/design/page.tsx              | 144 +++------
 app/solution/iot/layout.tsx               |   8 +-
 app/solution/iot/page.tsx                 | 146 +++------
 app/solution/network/layout.tsx           |   8 +-
 app/solution/network/page.tsx             | 146 +++------
 app/solution/page.tsx                     | 498 +++++++++++++++++-------------
 components/solution/SolutionTemplate.tsx  | 388 ++++++++++++-----------
 e2e/public-pages.spec.ts                  |  13 +-
 15 files changed, 757 insertions(+), 887 deletions(-)

```

Untracked but intended generated assets:

```text
total 1224
-rw-r--r--@ 1 zoopark-studio  staff   168K Jun  9 20:15 kr-brandfit-realphoto.webp
-rw-r--r--@ 1 zoopark-studio  staff   152K Jun  9 20:13 kr-control-realphoto.webp
-rw-r--r--@ 1 zoopark-studio  staff   125K Jun  9 20:09 kr-network-realphoto.webp
-rw-r--r--@ 1 zoopark-studio  staff   159K Jun  9 20:12 kr-security-realphoto.webp
public/images/solution/generated/kr-brandfit-realphoto.webp: RIFF (little-endian) data, Web/P image, VP8 encoding, 1672x941, Scaling: [none]x[none], YUV color, decoders should clamp
public/images/solution/generated/kr-control-realphoto.webp:  RIFF (little-endian) data, Web/P image, VP8 encoding, 1672x941, Scaling: [none]x[none], YUV color, decoders should clamp
public/images/solution/generated/kr-network-realphoto.webp:  RIFF (little-endian) data, Web/P image, VP8 encoding, 1672x941, Scaling: [none]x[none], YUV color, decoders should clamp
public/images/solution/generated/kr-security-realphoto.webp: RIFF (little-endian) data, Web/P image, VP8 encoding, 1672x941, Scaling: [none]x[none], YUV color, decoders should clamp

```

Untracked local QA evidence: `.codex/qa/solution-renewal-20260609/` and baseline `.codex/qa/solution-renewal-before-20260609/`. These are local visual evidence folders and may or may not be committed.

## Git Diff

```diff
diff --git a/.codex/state.md b/.codex/state.md
index 46ff67c..d6abebc 100644
--- a/.codex/state.md
+++ b/.codex/state.md
@@ -2,102 +2,70 @@

 ## Active task

-Renew Weet public `/modular`, `/bespoke`, and `/solution` surfaces; reposition `/bespoke` as a commercial-space custom solution; improve `/solution` as operations packages; apply latest Stickies steering that `주문하기` must be promoted out of the middle header menu.
+Renew the Weet `/solution` section and all solution detail pages with Korean photorealistic option-focused images and customer-facing operations UX.

 ## Current phase

-complete
+local validation complete; GPT-5.5 Pro review and deployment remain.

 ## Changes made

-- Re-read `AGENTS.md`, `codex-loop.md`, `.codex/current-task.md`, `.codex/state.md`, `agent-inbox/README.md`, and non-binary `agent-inbox/` instructions.
-- Checked Stickies through Computer Use multiple times. Latest visible steering still says `주문하기` in the header feels under-emphasized because it sits in the middle of the menu.
-- Generated modular renewal images earlier through Chrome/ChatGPT visible web control using non-Pro `최신 • 5.5` Thinking `확장`, one image per run.
-- Delegated the public page implementation slice to Antigravity IDE through Computer Use and accepted intended changes after visual confirmation.
-- Rebuilt `/modular` around generated proof imagery: hero, factory precision, transport/install, interior comfort, expansion/relocation, and conversion CTAs.
-- Repositioned `/bespoke` as a commercial-space custom solution page and later fixed the production H1 to `상업 공간 맞춤 솔루션`.
-- Reworked `/solution` into customer-facing operational packages and later fixed mobile Korean H1 wrapping by rendering intentional two-line mobile text with an `aria-label`.
-- Applied latest Stickies header steering through Antigravity IDE: removed `주문하기` / `Order` from normal navigation arrays and promoted `/customize` to a separate desktop, mobile-header, and mobile-menu CTA.
-- Codex adjusted Antigravity's header layout for safer `1280px` desktop spacing and removed a trailing whitespace issue.
-- Applied GPT-5.5 Pro header CTA `MUST_FIX`: desktop Korean CTA `aria-label` now matches visible text `주문하기`.
-- Pushed commit `5d64823` to `origin/zoo/customize-configurator`.
-- Promoted commit `5d64823` to production through the Vercel web UI.
-- Verified the real production domain `https://www.we-et.com/?v=5d64823` across desktop, tablet, and mobile.
-- Logged new findings and backlog closure in `agent-inbox/findings-public-simulation.md` and `agent-inbox/implementation-backlog.md`.
+- Checked Stickies through Computer Use. New steering said generated option images must emphasize each option, not show the 이동식주택 too large.
+- Reconfirmed Antigravity IDE state. The earlier frontend handoff was already in `User cancelled agent execution` state after producing no repository diff, so Codex continued directly and recorded the failure.
+- Generated/re-generated four final solution assets in Chrome/ChatGPT visible web control, one image per new chat, using `최신 • 5.5`, `Thinking • 확장`, `이미지 만들기`, and 16:9.
+- Corrected one ChatGPT new-chat state that briefly showed `Pro 확장 모드` back to `Thinking • 확장` before sending any prompt.
+- Replaced all final generated solution images under `public/images/solution/generated/`.
+- Rebuilt `/solution` into an option-selection page around `안심 출입`, `끊김 없는 연결`, `원격 준비`, and `현장 완성`.
+- Rebuilt `/solution/cctv`, `/solution/network`, `/solution/iot`, and `/solution/design` from feature-card/modal pages into operations-first detail pages.
+- Updated solution metadata and the public-pages E2E assertion for the new page structure.
+- Logged image generation, Stickies steering, and QA findings in `agent-inbox/`.

 ## Commands run

 - `computer-use:list_apps`
 - `computer-use:get_app_state("com.apple.Stickies")`
 - `computer-use:get_app_state("com.google.antigravity-ide")`
-- `git status --short --branch`
-- `git diff -- components/layout/Header.tsx`
-- `git diff --check`
+- Chrome/ChatGPT visible web-control image generation via `browser-client` and page asset export
+- `node -e` with `sharp` conversion for final WebP assets
 - `npx tsc --noEmit`
 - `npm run lint`
 - `npm test`
 - `npm run build`
+- `node .codex/qa/solution-renewal-20260609/capture.mjs`
 - `npx playwright test e2e/public-pages.spec.ts --project=chromium`
-- Playwright visual QA script for header CTA at desktop `1440x900`, desktop `1280x900`, tablet `834x1112`, and mobile `390x844`
-- Chrome/ChatGPT normal Pro review with `최신 • 5.5`, checked `Pro • 확장`, and no `심층 리서치`
-- Vercel web UI promotion for commit `5d64823`
-- Production-domain Playwright visual/click QA on `https://www.we-et.com/?v=5d64823`
-- `lsof -i :3000`

 ## Validation results

-- `git diff --check`: passed after cleaning review-packet trailing whitespace.
 - `npx tsc --noEmit`: passed.
 - `npm run lint`: passed.
-- `npm test`: 3 files passed, 20 tests passed.
-- `npm run build`: passed. Existing warning remains: Next `middleware` file convention is deprecated in favor of `proxy`.
-- `npx playwright test e2e/public-pages.spec.ts --project=chromium`: 14 passed.
-- Header CTA post-fix visual/accessibility QA:
-  - Evidence saved in `.codex/qa/header-cta-20260609-local/`.
-  - Desktop `1440x900` and `1280x900`: normal nav excludes `주문하기`; right-side `/customize` CTA is visible; horizontal overflow `false`; `ctaLabelInName: true`; page errors `0`.
-  - Tablet `834x1112` and mobile `390x844`: compact header `/customize` CTA visible; full-screen mobile menu has prominent `모델 구성하기`; horizontal overflow `false`; `ctaLabelInName: true`; page errors `0`.
-  - Local `next start` reports expected `_vercel/insights/script.js` 404/MIME console noise; this is not a page/runtime error and will be checked on production after promote.
-- Production QA before the latest header CTA slice:
-  - Commit `acef171` promoted to production and checked on `https://www.we-et.com`.
-  - `/modular`, `/bespoke`, `/solution` desktop/tablet/mobile reported H1 visible, probes present, horizontal overflow `false`, console/page errors `0`, and no bad visible images.
-- Production QA after the latest header CTA slice:
-  - Evidence saved in `.codex/qa/production-header-cta-5d64823/`.
-  - `https://www.we-et.com/?v=5d64823` desktop `1440x900`, desktop `1280x900`, tablet `834x1112`, and mobile `390x844`: visible `/customize` CTA, `ctaLabelInName: true`, horizontal overflow `false`, console events `0`, page errors `0`.
-  - Visible header CTA click navigated to `https://www.we-et.com/customize` on all checked viewports.
-  - Manual screenshot review confirmed no overlap in the 1280 desktop header, 390 mobile header, 390 mobile menu, or desktop `/customize` landing after CTA click.
+- `npm test`: passed, 3 files and 20 tests.
+- `npm run build`: passed. Existing Next warning remains: `middleware` convention is deprecated in favor of `proxy`.
+- `npx playwright test e2e/public-pages.spec.ts --project=chromium`: passed, 14 tests.
+- Local visual QA across desktop `1440x1100`, tablet `834x1112`, and mobile `390x844`:
+  - `/solution`, `/solution/cctv`, `/solution/network`, `/solution/iot`, `/solution/design` all report horizontal overflow `false`.
+  - Generated image references are present on all routes.
+  - Old solution image references are `0`.
+  - Literal `00a0` escape is `false`.
+  - Console errors and page errors are `0`.
+  - Manual screenshot review confirmed no text overlap or clipped CTAs on mobile/desktop.

 ## Current failures

 - None blocking.
-- One visual QA script attempt failed because the local Playwright `page.accessibility` helper was unavailable; reran successfully using DOM `aria-label` and visible-text comparison.
-- Existing non-blocking warning: Next `middleware` file convention is deprecated in favor of `proxy`.
-- Earlier invalid GPT-5.5 Deep Research attempt extracted marker occurrences instead of reviewing; recorded in `agent-inbox/pro-review-failures.md` and superseded by valid normal `Pro 확장` reviews.
+- QA script intermittently reports the existing header logo image with `naturalWidth: 0` on tablet/mobile `/solution`, while screenshots show it visibly rendered. Treat as a measurement/timing artifact unless reproduced visually.
+- Antigravity produced no diff for this slice; recorded in `agent-inbox/antigravity-failures.md`.

-## Pro review cycles
+## Pro review status

-2 valid normal Chrome/ChatGPT `Pro 확장` cycles for the header CTA slice; 1 earlier valid public-renewal pass; 1 invalid old Chrome/Deep Research attempt.
-
-## Last Pro verdict
-
-PASS (`WEET_REVIEW_20260609_HEADER_CTA_04`)
-
-## Applied Pro feedback
-
-- `WEET_REVIEW_20260609_HEADER_CTA_03` `MUST_FIX`: changed desktop Korean `/customize` CTA `aria-label` from `모델 구성하기` to `주문하기` so the accessible name matches the visible label.
-
-## Skipped Pro feedback
-
-- Optional: remove redundant CTA `aria-label` values; skipped because current names are correct and explicit.
-- Optional: add `rel="noopener noreferrer"` to external social links; skipped as unrelated/non-blocking.
-- Optional: add a focused E2E assertion for nav/CTA separation; skipped for this slice because DOM/visual QA already verifies the separation and the task is moving to deployment.
+Pending for this solution-detail renewal slice. `.codex/review-packet.md` still needs to be regenerated for marker `WEET_REVIEW_20260609_SOLUTION_RENEWAL_05`.

 ## Remaining risks

-- Latest header CTA commit still needs branch push, Vercel production promotion, and real-domain QA on `www.we-et.com`.
-- `/bespoke` still uses older cafe/popup/smart-farm images; future work should regenerate them via Chrome/ChatGPT `최신 • 5.5` Thinking `확장`.
-- `/solution/cctv`, `/solution/network`, `/solution/iot`, and `/solution/design` detail pages still need the new operations-first framing.
-- Public pricing/transport/install constraints need more concrete numeric ranges to further raise buyer trust.
+- GPT-5.5 Pro review may identify concrete product/UX/code `MUST_FIX` items.
+- Production deployment and real-domain QA on `we-et.com` / `www.we-et.com` remain after commit and push.
+- `/bespoke` still uses older existing cafe/popup/smart-farm images; future image generation should unify that page with the current visual standard.
+- Public pricing, delivery, install, warranty, and support terms still need more concrete numeric ranges and conditions.

 ## Next step

-No required local step remains for the header CTA slice after the production QA evidence commit is pushed.
+Create `.codex/review-packet.md`, run Chrome/ChatGPT GPT-5.5 Pro review, apply concrete `MUST_FIX`, then commit, push, deploy/promote, and verify production.
diff --git a/agent-inbox/antigravity-failures.md b/agent-inbox/antigravity-failures.md
index 9bb6d7c..f0bae54 100644
--- a/agent-inbox/antigravity-failures.md
+++ b/agent-inbox/antigravity-failures.md
@@ -44,3 +44,11 @@ Antigravity is required for frontend/design implementation when available. Recor
 - Computer Use itself also had stale `SkyComputerUseClient mcp` processes; when `list_apps` times out, the bridge is unhealthy and app-name retries are wasted.
 - After `pkill -f 'SkyComputerUseClient mcp'`, the current tool session returned `Transport closed`, which means Computer Use must be retried from a fresh session/turn.
 - Future recovery procedure is documented in `agent-inbox/tool-control-runbook.md`.
+
+## 2026-06-09 solution renewal slice
+
+- Intended handoff: renew `/solution`, `/solution/cctv`, `/solution/network`, `/solution/iot`, and `/solution/design` with newly generated Korean photorealistic option images and operations-first UX.
+- Computer Use was healthy and Antigravity IDE (`com.google.antigravity-ide`) was reachable.
+- Antigravity accepted the implementation prompt, explored files, and ran `npm run lint`, but produced no code diff after repeated polling.
+- Antigravity was already in `User cancelled agent execution` state when rechecked; no pending edit/accept controls remained.
+- Decision: record the no-diff handoff failure and continue directly in Codex so the user-requested solution renewal could complete.
diff --git a/agent-inbox/findings-public-simulation.md b/agent-inbox/findings-public-simulation.md
index 245722f..b11bd56 100644
--- a/agent-inbox/findings-public-simulation.md
+++ b/agent-inbox/findings-public-simulation.md
@@ -237,3 +237,21 @@ The first 10 personas did not produce 100 unique hard bugs. Following the user i
 163. Production header CTA QA on `https://www.we-et.com/?v=5d64823` verified desktop `1440x900`, desktop `1280x900`, tablet `834x1112`, and mobile `390x844` all show visible `/customize` CTA, `ctaLabelInName: true`, horizontal overflow `false`, console events `0`, and page errors `0`.
 164. Production click QA verified the visible header `주문하기` CTA navigates to `https://www.we-et.com/customize` on desktop, tablet, and mobile.
 165. Production mobile menu QA verified the full-width `모델 구성하기` CTA is visible above ordinary menu groups without text clipping.
+
+## 2026-06-09 solution detail renewal QA
+
+166. Stickies steering changed during image generation: option images must explain the option itself, not show a large 이동식주택 as the subject.
+167. Fix verified: the security image that showed the house too prominently was discarded and regenerated as an option-focused close-up of CCTV, sensor light, smart lock, and conduit details.
+168. Fix verified: `/solution` now uses four Korean photorealistic generated option images: security, network, remote control, and brand/site finish.
+169. Fix verified: `/solution` H1 is now `운영까지 준비된 모듈러 공간`, removing the earlier literal `\00a0` escape risk and moving the page toward buyer-facing operational trust.
+170. Fix verified: `/solution` package rows now frame each option by selection criterion, included details, and operator outcome instead of generic technical feature cards.
+171. Fix verified: `/solution/cctv` was rebuilt as `안심 출입` with customer decisions for access rights, recording/privacy zones, night alerts, and connectivity backup.
+172. Fix verified: `/solution/network` was rebuilt as `끊김 없는 연결` with POS/work/guest/device network separation and backup-line consultation decisions.
+173. Fix verified: `/solution/iot` was rebuilt as `원격 준비` with HVAC, lighting, ventilation, door-state, booking-time, and alert-scope decisions.
+174. Fix verified: `/solution/design` was rebuilt as `현장 완성` with facade, sign-frame, deck-flow, planting, drainage, and local-market fit decisions.
+175. Visual QA desktop: `.codex/qa/solution-renewal-20260609/desktop-_solution.png` shows four option rows with real-photo images, clear CTAs, and no text overlap.
+176. Visual QA mobile: `.codex/qa/solution-renewal-20260609/mobile-_solution.png` shows all four option blocks stacked safely without horizontal overflow or clipped CTA text.
+177. Visual QA details: mobile and desktop `/solution/cctv` and `/solution/design` screenshots show hero images, package tabs, consultation decisions, and outcome blocks without overlap.
+178. Automated visual QA summary reports `/solution` and four detail routes have horizontal overflow `false`, generated image count present, old image references `0`, literal escape `false`, console errors `0`, and page errors `0` across desktop, tablet, and mobile.
+179. QA note: the visual script intermittently reports the existing header logo with `naturalWidth: 0` on tablet/mobile `/solution`, but screenshots show the logo visible; this appears to be a measurement/timing artifact outside the solution image system.
+180. Strength: the solution section now answers buyer anxiety around unmanned operation, payment downtime, pre-arrival readiness, and first impression instead of asking customers to interpret device names.
diff --git a/agent-inbox/implementation-backlog.md b/agent-inbox/implementation-backlog.md
index 160b65f..6b404a8 100644
--- a/agent-inbox/implementation-backlog.md
+++ b/agent-inbox/implementation-backlog.md
@@ -57,11 +57,16 @@ This file tracks bugs and improvements discovered during the recursive improveme
   - *QA Evidence*: `.codex/qa/header-cta-20260609-local/summary.json`에서 desktop `1440x900`, desktop `1280x900`, tablet `834x1112`, mobile `390x844` 모두 horizontal overflow `false`, page error `0`, `ctaLabelInName: true`를 확인했다. 1280/390 screenshot을 수동 확인해 텍스트 겹침이 없음을 확인했다.
   - *Production Evidence*: commit `5d64823`을 Vercel 웹 UI에서 production으로 promote한 뒤 `https://www.we-et.com/?v=5d64823`에서 desktop/tablet/mobile CTA 표시, click-to-`/customize`, mobile menu CTA, overflow 없음, console/page error 0을 확인했다. 증거는 `.codex/qa/production-header-cta-5d64823/summary.json`에 저장했다.
 - [ ] 공개 홈페이지: `/bespoke`의 기존 cafe/popup/smart-farm 이미지를 새 GPT 5.5 Thinking 확장 이미지 생성으로 재통일하는 후속 작업이 필요함.
-- [ ] 공개 홈페이지: `/solution/cctv`, `/solution/network`, `/solution/iot`, `/solution/design` 상세 페이지를 새 `/solution` 운영 패키지 프레이밍과 같은 정보 구조로 리뉴얼해야 함.
+- [x] 공개 홈페이지: `/solution/cctv`, `/solution/network`, `/solution/iot`, `/solution/design` 상세 페이지를 새 `/solution` 운영 패키지 프레이밍과 같은 정보 구조로 리뉴얼함.
+  - *Fix Details*: 기존 기능 카드/모달형 상세 페이지를 폐기하고, 각 옵션별 `추천 현장`, `구성 범위`, `상담 때 확정할 것`, `도입 후 달라지는 점` 구조의 operations-first 상세 페이지로 교체함.
+  - *Image Details*: Chrome/ChatGPT visible web control에서 `최신 • 5.5` + `Thinking • 확장` + `이미지 만들기`로 옵션마다 한 장씩 한국 실사 이미지를 생성하고 `public/images/solution/generated/`에 적용함. Stickies 지시에 따라 보안 이미지는 큰 집 전경을 폐기하고 옵션 장비 중심으로 재생성함.
+  - *QA Evidence*: `.codex/qa/solution-renewal-20260609/summary.json`에서 `/solution` 및 4개 상세 경로의 desktop/tablet/mobile horizontal overflow `false`, console/page error `0`, old image refs `0`, generated image present를 확인함.
 - [ ] 공개 홈페이지: `/modular`에 공장 QC 체크포인트, 예상 제작/설치 리드타임, 운송 가능 조건, 크레인/도로 조건을 더 구체적인 수치로 추가하면 구매 신뢰가 더 올라감.
 - [ ] 공개 홈페이지: GPT-5.5 Pro `WEET_REVIEW_20260609_PUBLIC_RENEWAL_02` OPTIONAL - `/solution` 운영 패키지에 모니터링 대응 방식, 지원 장비/네트워크 범위, 유지보수 책임, 인수인계 절차, 예시 도입 시나리오를 추가하면 구매 신뢰가 더 올라감.
 - [ ] 공개 홈페이지: GPT-5.5 Pro `WEET_REVIEW_20260609_PUBLIC_RENEWAL_02` OPTIONAL - responsive QA 범위를 중간 desktop width, mobile landscape, iOS Safari, reduced-motion, keyboard focus, mega-menu interaction까지 확장해야 함.
 - [ ] 공개 홈페이지: GPT-5.5 Pro `WEET_REVIEW_20260609_PUBLIC_RENEWAL_02` OPTIONAL - Header submenu anchors와 `/solution` 패키지 섹션 visibility를 검증하는 focused E2E를 추가하면 회귀 방어가 더 강해짐.
+- [ ] 공개 홈페이지: `/solution` 옵션 상세에 실제 상담 사례 2~3개(무인 카페, 독채 스테이, 현장 사무실)를 추가하면 구매자가 자기 상황에 더 빨리 대입할 수 있음.
+- [ ] 공개 홈페이지: `/solution` 옵션별 유지보수 책임, 모니터링 대응 시간, 장비 보증 범위를 숫자와 조건으로 명시하면 신뢰도가 더 올라감.
 - [x] 관리자 페이지: 현재 리디자인은 shell/dashboard 중심이며, `products`, `projects`, `inquiries`, `insights`, `gallery`, `UTM`, `CMS` 하위 화면에는 기존 `rounded-xl/2xl/3xl`, `tracking-tight`, old SaaS card tone이 남아 있음.
   - *Fix Details*: 2026-06-07 두 번째 Antigravity handoff와 Codex 보정으로 `UTM`, `CMS`, `gallery`, `inquiries`, project/gallery/product edit-new forms, support editor, product modal, insights cleanup을 같은 console system으로 전환함.
 - [x] 관리자 페이지: `products`, `projects`, `consultations`, `insights`는 1차 console tone으로 전환됐으나 `UTM`, `CMS`, `gallery`, `inquiries`, edit/new forms, modal 계층에는 기존 `rounded-xl/2xl/3xl`, old SaaS card tone이 여전히 남아 있음.
diff --git a/app/solution/cctv/layout.tsx b/app/solution/cctv/layout.tsx
index b36a2fa..7f87bfb 100644
--- a/app/solution/cctv/layout.tsx
+++ b/app/solution/cctv/layout.tsx
@@ -1,17 +1,17 @@
 import type { Metadata } from "next";

 export const metadata: Metadata = {
-  title: "시큐리티 솔루션",
+  title: "안심 출입 옵션",
   description:
-    "위트(WEET) 시큐리티 솔루션으로 공간과 자산을 24시간 안전하게 지키세요. CCTV부터 출입 감시까지 맞춤 보안 구성을 제공합니다.",
+    "위트(WEET) 안심 출입 옵션. CCTV, 스마트 도어락, 센서등, 출입 알림을 현장 운영 흐름에 맞춰 설계합니다.",
   alternates: {
     canonical: "/solution/cctv",
   },
   openGraph: {
     url: "/solution/cctv",
-    title: "시큐리티 솔루션",
+    title: "안심 출입 옵션",
     description:
-      "위트(WEET) 시큐리티 솔루션으로 공간과 자산을 24시간 안전하게 지키세요. CCTV부터 출입 감시까지 맞춤 보안 구성을 제공합니다.",
+      "위트(WEET) 안심 출입 옵션. CCTV, 스마트 도어락, 센서등, 출입 알림을 현장 운영 흐름에 맞춰 설계합니다.",
   },
   twitter: {
     card: "summary_large_image",
diff --git a/app/solution/cctv/page.tsx b/app/solution/cctv/page.tsx
index 1f6468e..6950533 100755
--- a/app/solution/cctv/page.tsx
+++ b/app/solution/cctv/page.tsx
@@ -1,105 +1,55 @@
- "use client";
+"use client";

-import SolutionTemplate from "@/components/solution/SolutionTemplate";
-import { useLanguage } from "@/contexts/LanguageContext";
+import SolutionTemplate, { type SolutionPackageData } from "@/components/solution/SolutionTemplate";

-type Lang = 'KO' | 'EN';
-
-const COPY: Record<Lang, {
-  title: string;
-  subtitle: string;
-  description: string;
-  features: {
-    id: string;
-    title: string;
-    image: string;
-    description: string;
-    detailContent?: string;
-  }[];
-}> = {
-  KO: {
-    title: "시큐리티",
-    subtitle: "Security",
-    description: "집과 자산을 24시간 지켜주는 위트의 시큐리티 서비스입니다. CCTV부터 침입 감지, 스마트 도어벨까지 안전을 책임집니다.",
-    features: [
-      {
-        id: "cctv",
-        title: "CCTV",
-        image: "/images/solution/cctv_camera.webp",
-        description: "4K 초고해상도와 AI 분석으로 사각지대 없이 감시합니다. 녹화와 알림을 동시에 제공해 위험 상황을 즉시 파악합니다.",
-        detailContent: "· 4K UHD 고화질 / 야간 컬러뷰 지원\n· AI 기반 사람·차량 구분 감지\n· 침입 발생 시 즉시 알림 · 실시간 모니터링\n· 클라우드·로컬 백업 지원",
-      },
-      {
-        id: "smart-doorbell",
-        title: "스마트 도어벨",
-        image: "/images/solution/cctv_doorbell.webp",
-        description: "방문자를 실시간으로 확인하고 응대합니다. 녹화와 양방향 통화로 부재중에도 안심할 수 있습니다.",
-        detailContent: "· 180° 광각 카메라와 양방향 오디오\n· 방문자 감지 시 즉시 알림 및 녹화\n· 배달·택배 확인 알림\n· 실시간 원격 응대",
-      },
-      {
-        id: "intrusion-detection",
-        title: "침입 감지",
-        image: "/images/solution/cctv_intrusion.webp",
-        description: "창문·문 센서로 무단 침입을 감지하고, 사이렌과 알림으로 즉시 대응합니다.",
-        detailContent: "· 창문/문 개폐 감지\n· 움직임 센서 기반 알림\n· 긴급 시 사이렌 및 통합 알림\n· 보안 모드 자동 전환",
-      },
-      {
-        id: "theft-detection",
-        title: "도난 감지",
-        image: "/images/solution/cctv_theft.webp",
-        description: "귀중품 보관 공간을 집중 감시해 이상 징후를 즉시 알려줍니다.",
-        detailContent: "· AI 기반 이상행동 감지\n· 지정 구역 침입/이동 모니터링\n· 24시간 기록 및 알림\n· 맞춤 보안 정책 설정",
-      },
-    ],
-  },
-  EN: {
-    title: "Security",
-    subtitle: "Security",
-    description: "WEET security keeps your home and assets safe 24/7—from CCTV to intrusion detection and smart doorbells.",
-    features: [
-      {
-        id: "cctv",
-        title: "CCTV",
-        image: "/images/solution/cctv_camera.webp",
-        description: "4K resolution with AI analytics to cover every corner. Alerts and recordings help you respond instantly.",
-        detailContent: "· 4K UHD / night color view\n· AI person/vehicle detection\n· Instant alerts on intrusion\n· Cloud/local backup support",
-      },
-      {
-        id: "smart-doorbell",
-        title: "Smart Doorbell",
-        image: "/images/solution/cctv_doorbell.webp",
-        description: "See and talk to visitors in real time. Record and respond even when you’re away.",
-        detailContent: "· 180° wide camera + two-way audio\n· Alerts and recordings on detection\n· Delivery/visitor notifications\n· Remote response from mobile",
-      },
-      {
-        id: "intrusion-detection",
-        title: "Intrusion Detection",
-        image: "/images/solution/cctv_intrusion.webp",
-        description: "Detect unauthorized entry with door/window sensors and motion alerts, backed by sirens if needed.",
-        detailContent: "· Door/window open detection\n· Motion-based alerts\n· Siren + consolidated notifications\n· Auto security mode switching",
-      },
-      {
-        id: "theft-detection",
-        title: "Theft Monitoring",
-        image: "/images/solution/cctv_theft.webp",
-        description: "Focused monitoring of valuables to flag suspicious behavior immediately.",
-        detailContent: "· AI abnormal behavior detection\n· Zone intrusion/movement monitoring\n· 24/7 recording and alerts\n· Custom security policies",
-      },
-    ],
+const DATA: SolutionPackageData = {
+  id: "security",
+  href: "/solution/cctv",
+  image: "/images/solution/generated/kr-security-realphoto.webp",
+  copy: {
+    KO: {
+      eyebrow: "SECURE ACCESS OPTION",
+      title: "무인 운영도 안심되게",
+      lead:
+        "CCTV와 도어락을 따로 사는 문제가 아닙니다. Weet는 현관, 창측, 야간 조명, 알림 기준을 한 번에 설계해 운영자가 멀리 있어도 확인 가능한 출입 흐름을 만듭니다.",
+      imageAlt: "한국 전원 모듈러 공간 현관에 설치된 CCTV, 센서등, 스마트 도어락 실사 이미지",
+      problemTitle: "운영자가 가장 불안해하는 순간",
+      problem:
+        "외곽 부지, 무인 카페, 독채 스테이는 사람이 늘 상주하기 어렵습니다. 출입 기록이 없거나 야간 조명이 부족하면 작은 이상 징후도 큰 운영 리스크가 됩니다.",
+      fitTitle: "추천 현장",
+      fit: ["무인 카페와 예약제 쇼룸", "외곽 독채 스테이와 주말 주택", "야간 관리가 필요한 현장 사무소", "장비와 재고가 보관되는 소형 상업공간"],
+      includedTitle: "구성 범위",
+      included: ["현관과 창측 사각지대 기준 CCTV 위치 제안", "스마트 도어락 권한과 일회성 출입 방식 정리", "센서등 밝기와 야간 점등 범위 계획", "운영자가 받을 알림 범위와 대응자 지정"],
+      decisionsTitle: "상담 때 확정할 것",
+      decisions: ["운영자, 직원, 고객, 정비 담당자의 출입 권한을 어떻게 나눌지", "촬영이 필요한 구역과 사생활 보호가 필요한 구역을 어디까지 나눌지", "야간 알림을 누가 받고 어떤 상황에서 확인할지", "통신 장애 시 저장과 알림을 어떤 방식으로 보완할지"],
+      outcomesTitle: "도입 후 달라지는 점",
+      outcomes: ["밤에도 현관과 주변 상태를 바로 확인할 수 있습니다.", "예약 고객, 직원, 정비 담당자의 출입 흐름이 기록으로 남습니다.", "조명과 카메라 위치가 겹쳐 사각지대가 줄어듭니다.", "분실, 파손, 무단출입 대응이 감이 아니라 기록 중심으로 바뀝니다."],
+      ctaPrimary: "주문 옵션에서 보안 확인",
+      ctaSecondary: "현장 보안 상담",
+    },
+    EN: {
+      eyebrow: "SECURE ACCESS OPTION",
+      title: "Make Unmanned Operation Feel Safe",
+      lead:
+        "This is not about buying a CCTV and a smart lock separately. Weet plans the entrance, window side, night lighting, and alert rules together so operators can verify access remotely.",
+      imageAlt: "Photorealistic CCTV, sensor light, and smart lock detail on a Korean modular space entrance",
+      problemTitle: "The moment operators worry most",
+      problem:
+        "Remote sites, unmanned cafes, and private stays cannot always be staffed. Without access logs or night lighting, small signs can become large operating risks.",
+      fitTitle: "Recommended sites",
+      fit: ["Unmanned cafes and reservation showrooms", "Remote private stays and weekend houses", "Site offices needing night checks", "Small commercial spaces storing equipment or stock"],
+      includedTitle: "Scope",
+      included: ["CCTV position based on entrance and window blind spots", "Smart-lock permissions and one-time access rules", "Sensor-light brightness and night coverage planning", "Alert scope and response-owner setup"],
+      decisionsTitle: "Decisions during consultation",
+      decisions: ["How to split access for operators, staff, guests, and maintenance teams", "Which areas need recording and which need privacy protection", "Who receives night alerts and which situations require checks", "How to supplement storage and alerts during connectivity failures"],
+      outcomesTitle: "Operational outcomes",
+      outcomes: ["Check the entrance and surroundings at night.", "Keep access flow recorded for guests, staff, and maintenance.", "Reduce blind spots by aligning lights and cameras.", "Respond to loss, damage, or unauthorized access with records, not guesswork."],
+      ctaPrimary: "Check security in order options",
+      ctaSecondary: "Discuss site security",
+    },
   },
 };

 export default function CCTVSolutionPage() {
-  const { language } = useLanguage();
-  const copy = COPY[language];
-
-  return (
-    <SolutionTemplate
-      title={copy.title}
-      subtitle={copy.subtitle}
-      heroImage="/images/solution/cctv_hero.webp"
-      description={copy.description}
-      features={copy.features}
-    />
-  );
+  return <SolutionTemplate data={DATA} />;
 }
diff --git a/app/solution/design/layout.tsx b/app/solution/design/layout.tsx
index 2d60d15..49c79db 100644
--- a/app/solution/design/layout.tsx
+++ b/app/solution/design/layout.tsx
@@ -1,17 +1,17 @@
 import type { Metadata } from "next";

 export const metadata: Metadata = {
-  title: "디자인 솔루션",
+  title: "현장 완성 옵션",
   description:
-    "위트(WEET) 디자인 솔루션으로 공간의 완성도를 높이세요. 목적과 브랜드에 맞춘 컨셉·마감·동선을 제안합니다.",
+    "위트(WEET) 현장 완성 옵션. 외장재, 간판 위치, 데크 동선, 조경과 배수 마감을 브랜드와 상권에 맞춥니다.",
   alternates: {
     canonical: "/solution/design",
   },
   openGraph: {
     url: "/solution/design",
-    title: "디자인 솔루션",
+    title: "현장 완성 옵션",
     description:
-      "위트(WEET) 디자인 솔루션으로 공간의 완성도를 높이세요. 목적과 브랜드에 맞춘 컨셉·마감·동선을 제안합니다.",
+      "위트(WEET) 현장 완성 옵션. 외장재, 간판 위치, 데크 동선, 조경과 배수 마감을 브랜드와 상권에 맞춥니다.",
   },
   twitter: {
     card: "summary_large_image",
diff --git a/app/solution/design/page.tsx b/app/solution/design/page.tsx
index 83500e2..8116500 100755
--- a/app/solution/design/page.tsx
+++ b/app/solution/design/page.tsx
@@ -1,105 +1,55 @@
 "use client";

-import SolutionTemplate from "@/components/solution/SolutionTemplate";
-import { useLanguage } from "@/contexts/LanguageContext";
+import SolutionTemplate, { type SolutionPackageData } from "@/components/solution/SolutionTemplate";

-type Lang = 'KO' | 'EN';
-
-const COPY: Record<Lang, {
-  title: string;
-  subtitle: string;
-  description: string;
-  features: {
-    id: string;
-    title: string;
-    image: string;
-    description: string;
-    detailContent?: string;
-  }[];
-}> = {
-  KO: {
-    title: "디자인",
-    subtitle: "Design",
-    description: "브랜드와 라이프스타일을 반영한 공간을 설계합니다. 콘셉트, 마감, 동선을 통합해 완성도 높은 결과물을 만듭니다.",
-    features: [
-      {
-        id: "materials",
-        title: "재료 디자인 솔루션",
-        image: "/images/solution/design_material.webp",
-        description: '"지속 가능성과 내구성을 고려한 최적의 물성 선택" 단순한 마감을 넘어 기후와 환경, 그리고 에너지 효율까지 고려합니다.',
-        detailContent: "· 검증된 친환경 자재 사용\n· 고성능 단열재 적용\n· 시간이 흘러도 변하지 않는 가치",
-      },
-      {
-        id: "exterior",
-        title: "외관 디자인 솔루션",
-        image: "/images/solution/design_exterior.webp",
-        description: '"모듈러의 한계를 넘어서는 조형적 완성" 규격화된 모듈 안에서도 독창적인 조형미를 구현합니다.',
-        detailContent: "· 주변 환경과 조화를 이루는 파사드\n· 건물의 정체성을 드러내는 디자인\n· 독창적인 조형미 구현",
-      },
-      {
-        id: "planning",
-        title: "설계 디자인 솔루션",
-        image: "/images/solution/design_planning.webp",
-        description: '"생활의 동선까지 계산된 치밀한 공간 설계" 사용자의 라이프스타일을 분석하여 불필요한 공간은 줄이고 실용성은 극대화합니다.',
-        detailContent: "· 라이프스타일 분석 기반 설계\n· 실용성 극대화 및 불필요한 공간 최소화\n· 오차 없는 정밀한 모듈 조합",
-      },
-      {
-        id: "site",
-        title: "사이트 배치 디자인 솔루션",
-        image: "/images/solution/design_site.webp",
-        description: '"땅의 잠재력을 깨우는 대지 분석과 배치" 일조량, 통풍, 조망권, 그리고 진입 동선까지 면밀히 분석합니다.',
-        detailContent: "· 대지 조건 100% 활용\n· 일조, 통풍, 조망, 동선 분석\n· 자연과 건축물이 공존하는 최적 배치",
-      },
-    ],
-  },
-  EN: {
-    title: "Design",
-    subtitle: "Design",
-    description: "We craft spaces that reflect your brand and lifestyle—aligning concept, finishes, and flow for a cohesive result.",
-    features: [
-      {
-        id: "materials",
-        title: "Material Design Solution",
-        image: "/images/solution/design_material.webp",
-        description: '"Optimal material selection considering sustainability and durability." We consider climate, environment, and energy efficiency beyond simple finishing.',
-        detailContent: "· Use of verified eco-friendly materials\n· High-performance insulation\n· Enduring value that stands the test of time",
-      },
-      {
-        id: "exterior",
-        title: "Exterior Design Solution",
-        image: "/images/solution/design_exterior.webp",
-        description: '"Sculptural perfection beyond the limits of modularity." We implement unique structural beauty even within standardized modules.',
-        detailContent: "· Facade harmonizing with surroundings\n· Design revealing the building's identity\n· Implementation of unique aesthetics",
-      },
-      {
-        id: "planning",
-        title: "Planning Design Solution",
-        image: "/images/solution/design_planning.webp",
-        description: '"Precise spatial design calculated down to daily flow." We analyze lifestyles to minimize waste and maximize practicality.',
-        detailContent: "· Lifestyle analysis-based design\n· Maximized practicality, minimized waste\n· Flawless module combination without errors",
-      },
-      {
-        id: "site",
-        title: "Site Design Solution",
-        image: "/images/solution/design_site.webp",
-        description: '"Site analysis and layout that awakens the land\'s potential." We carefully analyze sunlight, ventilation, views, and access paths.',
-        detailContent: "· 100% utilization of site conditions\n· Analysis of sunlight, wind, views, flow\n· Optimal layout where nature and architecture coexist",
-      },
-    ],
+const DATA: SolutionPackageData = {
+  id: "brand",
+  href: "/solution/design",
+  image: "/images/solution/generated/kr-brandfit-realphoto.webp",
+  copy: {
+    KO: {
+      eyebrow: "SITE FINISH OPTION",
+      title: "상권과 브랜드에 어긋나지 않게",
+      lead:
+        "모듈러가 ‘그냥 놓인 건물’처럼 보이지 않도록 외장, 간판 자리, 데크 동선, 조경과 배수까지 현장에 맞춰 마무리합니다.",
+      imageAlt: "한국 상업지 모듈러 공간의 외장재, 간판 프레임, 데크, 조경 마감 실사 이미지",
+      problemTitle: "첫인상은 매출과 신뢰로 이어집니다",
+      problem:
+        "상업 공간은 설치 속도만큼 현장 적응력이 중요합니다. 외장재, 간판 위치, 데크 동선, 조경이 어긋나면 고객은 완성된 브랜드 공간이 아니라 임시 구조물처럼 느낍니다.",
+      fitTitle: "추천 현장",
+      fit: ["프랜차이즈 카페와 로컬 브랜드 쇼룸", "관광지 판매 공간과 체험형 매장", "외관 첫인상이 중요한 독채 스테이", "도로변 접근과 배수가 중요한 상업 부지"],
+      includedTitle: "구성 범위",
+      included: ["브랜드 톤에 맞는 외장재와 포인트 컬러 제안", "간판 프레임, 야간 조명, 시야 방향 계획", "데크, 계단, 진입 동선과 대기 공간 정리", "조경, 자갈, 배수 라인 등 현장 마감 디테일"],
+      decisionsTitle: "상담 때 확정할 것",
+      decisions: ["브랜드가 고객에게 먼저 보여야 할 인상과 소재 톤", "간판이 보이는 거리와 야간 조명 밝기", "고객이 어디서 들어오고 어디서 머무는지", "비, 눈, 흙먼지, 배수 문제를 어떻게 처리할지"],
+      outcomesTitle: "도입 후 달라지는 점",
+      outcomes: ["공간이 현장에 자연스럽게 자리 잡아 임시 구조물 느낌이 줄어듭니다.", "간판과 조명이 영업 전부터 계획되어 첫인상이 선명해집니다.", "데크와 조경이 고객 동선을 유도해 이용 경험이 정돈됩니다.", "배수와 외부 마감까지 챙겨 유지관리 리스크가 줄어듭니다."],
+      ctaPrimary: "주문 옵션에서 현장 완성 확인",
+      ctaSecondary: "브랜드 현장 상담",
+    },
+    EN: {
+      eyebrow: "SITE FINISH OPTION",
+      title: "Fit The Brand And Local Market",
+      lead:
+        "We finish facade, signage position, deck flow, planting, and drainage so the module does not look like a temporary object placed on site.",
+      imageAlt: "Photorealistic facade, blank sign frame, deck, and planting detail for a Korean modular commercial site",
+      problemTitle: "First impression becomes trust and revenue",
+      problem:
+        "Commercial spaces need site fit as much as installation speed. If facade, signage, deck flow, and planting feel disconnected, customers see a temporary structure instead of a finished brand space.",
+      fitTitle: "Recommended sites",
+      fit: ["Franchise cafes and local brand showrooms", "Tourism retail and experience stores", "Private stays where exterior impression matters", "Commercial roadside sites needing access and drainage planning"],
+      includedTitle: "Scope",
+      included: ["Facade material and accent color direction", "Sign frame, night lighting, and sight-line planning", "Deck, stairs, entrance flow, and waiting-zone alignment", "Planting, gravel, drainage, and exterior finish details"],
+      decisionsTitle: "Decisions during consultation",
+      decisions: ["What first impression and material tone the brand needs", "Where the sign is visible from and how bright night lighting should be", "Where customers enter, wait, and move", "How to handle rain, snow, dust, and drainage"],
+      outcomesTitle: "Operational outcomes",
+      outcomes: ["The space sits naturally on site instead of feeling temporary.", "Signage and lighting are planned before opening, sharpening first impression.", "Deck and planting guide customer flow with less confusion.", "Exterior finish and drainage reduce maintenance risk."],
+      ctaPrimary: "Check site finish in order options",
+      ctaSecondary: "Discuss brand site fit",
+    },
   },
 };

 export default function DesignSolutionPage() {
-  const { language } = useLanguage();
-  const copy = COPY[language];
-
-  return (
-    <SolutionTemplate
-      title={copy.title}
-      subtitle={copy.subtitle}
-      heroImage="/images/solution/design_hero.webp"
-      description={copy.description}
-      features={copy.features}
-    />
-  );
+  return <SolutionTemplate data={DATA} />;
 }
diff --git a/app/solution/iot/layout.tsx b/app/solution/iot/layout.tsx
index 5fe2215..8dd3008 100644
--- a/app/solution/iot/layout.tsx
+++ b/app/solution/iot/layout.tsx
@@ -1,17 +1,17 @@
 import type { Metadata } from "next";

 export const metadata: Metadata = {
-  title: "IoT 솔루션",
+  title: "원격 준비 옵션",
   description:
-    "위트(WEET) IoT 솔루션으로 더 똑똑한 공간을 만드세요. 센서·제어·자동화를 통해 편의성과 효율을 높입니다.",
+    "위트(WEET) 원격 준비 옵션. 조명, 냉난방, 환기, 도어 상태를 예약과 운영 시간에 맞춰 제어할 수 있게 설계합니다.",
   alternates: {
     canonical: "/solution/iot",
   },
   openGraph: {
     url: "/solution/iot",
-    title: "IoT 솔루션",
+    title: "원격 준비 옵션",
     description:
-      "위트(WEET) IoT 솔루션으로 더 똑똑한 공간을 만드세요. 센서·제어·자동화를 통해 편의성과 효율을 높입니다.",
+      "위트(WEET) 원격 준비 옵션. 조명, 냉난방, 환기, 도어 상태를 예약과 운영 시간에 맞춰 제어할 수 있게 설계합니다.",
   },
   twitter: {
     card: "summary_large_image",
diff --git a/app/solution/iot/page.tsx b/app/solution/iot/page.tsx
index 39497f0..f8aae0f 100755
--- a/app/solution/iot/page.tsx
+++ b/app/solution/iot/page.tsx
@@ -1,105 +1,55 @@
- "use client";
+"use client";

-import SolutionTemplate from "@/components/solution/SolutionTemplate";
-import { useLanguage } from "@/contexts/LanguageContext";
+import SolutionTemplate, { type SolutionPackageData } from "@/components/solution/SolutionTemplate";

-type Lang = 'KO' | 'EN';
-
-const COPY: Record<Lang, {
-  title: string;
-  subtitle: string;
-  description: string;
-  features: {
-    id: string;
-    title: string;
-    image: string;
-    description: string;
-    detailContent?: string;
-  }[];
-}> = {
-  KO: {
-    title: "IoT",
-    subtitle: "Smart Home IoT",
-    description: "조명, 환경, 보안을 하나의 플랫폼에서 제어해 편리하고 안전한 생활을 만듭니다.",
-    features: [
-      {
-        id: "smart-lighting",
-        title: "스마트 조명",
-        image: "/images/solution/iot_lighting.webp",
-        description: "밝기·색온도·스케줄을 자유롭게 설정하고, 음성으로 제어합니다.",
-        detailContent: "· 밝기/색온도 조절\n· 일정/장면 프리셋\n· 음성 제어(Google/Alexa)\n· 존재 감지 기반 자동 on/off",
-      },
-      {
-        id: "climate-control",
-        title: "환경 제어",
-        image: "/images/solution/iot_climate.webp",
-        description: "난방/냉방/환기를 자동으로 최적화해 쾌적함과 에너지 절약을 동시에 달성합니다.",
-        detailContent: "· 온습도 센서 기반 제어\n· 위치 기반 귀가/외출 모드\n· 창문 열림 감지 연동\n· 에너지 사용 리포트",
-      },
-      {
-        id: "smart-lock",
-        title: "스마트 도어락",
-        image: "/images/solution/iot_lock.webp",
-        description: "비밀번호·모바일키·원격 제어로 안전하게 출입을 관리합니다.",
-        detailContent: "· 모바일키/일회용 비밀번호\n· 방문 기록 확인 알림\n· 원격 잠금/해제\n· 경보 및 알림 연동",
-      },
-      {
-        id: "voice-assistant",
-        title: "음성 비서",
-        image: "/images/solution/iot_voice.webp",
-        description: "조명, 온도, 보안 장치를 음성으로 제어하고 정보를 확인합니다.",
-        detailContent: "· 주요 음성 비서 연동\n· 장치 제어/자동화 실행\n· 정보 조회 및 알림\n· 멀티 디바이스 그룹 제어",
-      },
-    ],
-  },
-  EN: {
-    title: "IoT",
-    subtitle: "Smart Home IoT",
-    description: "Control lighting, climate, and security from one platform for a safer, easier life.",
-    features: [
-      {
-        id: "smart-lighting",
-        title: "Smart Lighting",
-        image: "/images/solution/iot_lighting.webp",
-        description: "Set brightness, color temperature, schedules, and control by voice.",
-        detailContent: "· Dimming and CCT control\n· Schedules and scenes\n· Voice control (Google/Alexa)\n· Presence-based auto on/off",
-      },
-      {
-        id: "climate-control",
-        title: "Climate Control",
-        image: "/images/solution/iot_climate.webp",
-        description: "Automate heating/cooling/ventilation for comfort and energy savings.",
-        detailContent: "· Temp/humidity sensor control\n· Geofenced home/away modes\n· Window-open detection link\n· Energy usage reports",
-      },
-      {
-        id: "smart-lock",
-        title: "Smart Lock",
-        image: "/images/solution/iot_lock.webp",
-        description: "Manage entry with PINs, mobile keys, and remote control.",
-        detailContent: "· Mobile/one-time PINs\n· Entry logs and alerts\n· Remote lock/unlock\n· Alarms and notifications",
-      },
-      {
-        id: "voice-assistant",
-        title: "Voice Assistant",
-        image: "/images/solution/iot_voice.webp",
-        description: "Control devices and get information hands-free.",
-        detailContent: "· Works with major assistants\n· Device control/automation\n· Info queries and alerts\n· Multi-device group control",
-      },
-    ],
+const DATA: SolutionPackageData = {
+  id: "control",
+  href: "/solution/iot",
+  image: "/images/solution/generated/kr-control-realphoto.webp",
+  copy: {
+    KO: {
+      eyebrow: "REMOTE READY OPTION",
+      title: "현장에 가지 않아도 준비되게",
+      lead:
+        "입실 전 냉난방, 조명, 환기, 잠금 상태를 매번 현장에서 확인할 필요가 없도록 설계합니다. 원격 제어는 편의 기능이 아니라 운영 시간을 줄이는 장치입니다.",
+      imageAlt: "한국형 모듈러 실내 벽면 스마트 스위치와 제어 패널 실사 이미지",
+      problemTitle: "작은 방문이 계속 누적됩니다",
+      problem:
+        "예약제 숙박, 무인 쇼룸, 주말 주택은 고객이 오기 전 공간을 켜고, 맞추고, 잠그는 일이 반복됩니다. 이 과정을 현장 방문에만 의존하면 운영 시간이 계속 새어 나갑니다.",
+      fitTitle: "추천 현장",
+      fit: ["입실 전 온도 준비가 필요한 독채 숙박", "예약제로 운영되는 체험 공간", "운영자가 멀리 있는 주말 주택", "조명과 환기 상태가 중요한 쇼룸"],
+      includedTitle: "구성 범위",
+      included: ["스마트 스위치와 온도 제어 패널 위치 계획", "입실 전 냉난방과 환기 스케줄 정리", "도어락, 조명, 공조 알림 연동 범위", "운영 시간과 예약 시간 기준 자동화 구성"],
+      decisionsTitle: "상담 때 확정할 것",
+      decisions: ["입실 몇 시간 전부터 공간을 준비해야 하는지", "조명, 냉난방, 환기 중 어떤 장비를 원격화할지", "운영자가 직접 확인할 알림과 자동으로 처리할 동작을 어떻게 나눌지", "고객이 조작할 수 있는 범위와 운영자만 제어할 범위를 어디까지 둘지"],
+      outcomesTitle: "도입 후 달라지는 점",
+      outcomes: ["고객 도착 전 공간 온도와 조명을 미리 맞출 수 있습니다.", "반복 방문 없이 문 잠금과 공조 상태를 확인합니다.", "에너지 낭비와 운영자의 이동 시간을 줄입니다.", "예약 시간에 따라 공간 상태를 더 일정하게 유지합니다."],
+      ctaPrimary: "주문 옵션에서 원격 준비 확인",
+      ctaSecondary: "운영 방식 상담",
+    },
+    EN: {
+      eyebrow: "REMOTE READY OPTION",
+      title: "Prepare The Space Without Visiting",
+      lead:
+        "HVAC, lighting, ventilation, and lock status can be checked before guests arrive. Remote control is not just convenience; it reduces operating time.",
+      imageAlt: "Photorealistic smart switches and control panels inside a Korean modular interior",
+      problemTitle: "Small visits add up",
+      problem:
+        "Reservation-based stays, unmanned showrooms, and weekend houses repeatedly need the space turned on, adjusted, and locked. Relying on site visits leaks operating time.",
+      fitTitle: "Recommended sites",
+      fit: ["Private stays needing pre-arrival temperature control", "Reservation-based experience rooms", "Weekend houses managed remotely", "Showrooms where lighting and ventilation matter"],
+      includedTitle: "Scope",
+      included: ["Smart-switch and temperature-panel placement", "Pre-arrival HVAC and ventilation schedule", "Door lock, lighting, and HVAC alert links", "Automation based on operating and booking hours"],
+      decisionsTitle: "Decisions during consultation",
+      decisions: ["How many hours before arrival the space should be prepared", "Which devices need remote control: lighting, HVAC, ventilation", "Which alerts require operator confirmation and which actions can be automatic", "What guests can control versus what only operators can control"],
+      outcomesTitle: "Operational outcomes",
+      outcomes: ["Set temperature and lighting before guests arrive.", "Check lock and HVAC status without repeated visits.", "Reduce wasted energy and operator travel time.", "Keep the space state more consistent across booking times."],
+      ctaPrimary: "Check remote readiness in order options",
+      ctaSecondary: "Discuss operating workflow",
+    },
   },
 };

 export default function IOTSolutionPage() {
-  const { language } = useLanguage();
-  const copy = COPY[language];
-
-  return (
-    <SolutionTemplate
-      title={copy.title}
-      subtitle={copy.subtitle}
-      heroImage="/images/solution/iot_hero.webp"
-      description={copy.description}
-      features={copy.features}
-    />
-  );
+  return <SolutionTemplate data={DATA} />;
 }
diff --git a/app/solution/network/layout.tsx b/app/solution/network/layout.tsx
index 170021c..f2c92ad 100644
--- a/app/solution/network/layout.tsx
+++ b/app/solution/network/layout.tsx
@@ -1,17 +1,17 @@
 import type { Metadata } from "next";

 export const metadata: Metadata = {
-  title: "네트워크 솔루션",
+  title: "끊김 없는 연결 옵션",
   description:
-    "위트(WEET) 네트워크 솔루션으로 안정적인 인터넷 환경을 구축하세요. 공간 특성에 맞춘 라우팅·배선·장비 구성을 제안합니다.",
+    "위트(WEET) 연결 옵션. POS, 예약, 게스트 Wi-Fi, 원격 장비망을 현장 조건에 맞춰 안정적으로 분리합니다.",
   alternates: {
     canonical: "/solution/network",
   },
   openGraph: {
     url: "/solution/network",
-    title: "네트워크 솔루션",
+    title: "끊김 없는 연결 옵션",
     description:
-      "위트(WEET) 네트워크 솔루션으로 안정적인 인터넷 환경을 구축하세요. 공간 특성에 맞춘 라우팅·배선·장비 구성을 제안합니다.",
+      "위트(WEET) 연결 옵션. POS, 예약, 게스트 Wi-Fi, 원격 장비망을 현장 조건에 맞춰 안정적으로 분리합니다.",
   },
   twitter: {
     card: "summary_large_image",
diff --git a/app/solution/network/page.tsx b/app/solution/network/page.tsx
index 5a15ba2..bc699eb 100755
--- a/app/solution/network/page.tsx
+++ b/app/solution/network/page.tsx
@@ -1,105 +1,55 @@
- "use client";
+"use client";

-import SolutionTemplate from "@/components/solution/SolutionTemplate";
-import { useLanguage } from "@/contexts/LanguageContext";
+import SolutionTemplate, { type SolutionPackageData } from "@/components/solution/SolutionTemplate";

-type Lang = 'KO' | 'EN';
-
-const COPY: Record<Lang, {
-  title: string;
-  subtitle: string;
-  description: string;
-  features: {
-    id: string;
-    title: string;
-    image: string;
-    description: string;
-    detailContent?: string;
-  }[];
-}> = {
-  KO: {
-    title: "네트워크",
-    subtitle: "Network",
-    description: "현장 어디서든 끊김 없는 연결을 제공합니다. LTE/5G 라우터부터 위성 인터넷, 메쉬 Wi-Fi까지 환경에 맞는 최적의 네트워크를 구성합니다.",
-    features: [
-      {
-        id: "lte-router",
-        title: "LTE/5G 라우터",
-        image: "/images/solution/network_router.webp",
-        description: "유선 회선이 없어도 즉시 개통 가능한 고성능 셀룰러 라우터입니다.",
-        detailContent: "· LTE/5G 듀얼 SIM 지원\n· 고성능 안테나로 넓은 커버리지\n· VPN/보안 기능 내장\n· 원격 모니터링/관리",
-      },
-      {
-        id: "cpe-bridge",
-        title: "무선 브릿지",
-        image: "/images/solution/network_bridge.webp",
-        description: "건물 간 장거리 포인트 투 포인트 연결로 배선 없이 네트워크를 확장합니다.",
-        detailContent: "· 최대 5km 무선 백홀\n· IP65 등급 실외 설치 지원\n· 빔포밍으로 안정된 속도\n· 간편한 설치/정렬",
-      },
-      {
-        id: "satellite",
-        title: "위성 인터넷",
-        image: "/images/solution/network_satellite.webp",
-        description: "도시 외곽이나 산간에서도 사용 가능한 위성 기반 초고속 인터넷입니다.",
-        detailContent: "· 최대 200Mbps 다운로드\n· 저지연 위성 연결\n· 넓은 커버리지\n· 이동/임시 현장에 적합",
-      },
-      {
-        id: "mesh-wifi",
-        title: "메쉬 Wi-Fi",
-        image: "/images/solution/network_mesh.webp",
-        description: "넓은 공간을 끊김 없이 커버하는 Wi-Fi 6/6E 메쉬 네트워크입니다.",
-        detailContent: "· Wi-Fi 6/6E 지원\n· 단일 SSID 로밍\n· AI 기반 채널 최적화\n· 보안/게스트 네트워크 지원",
-      },
-    ],
-  },
-  EN: {
-    title: "Network",
-    subtitle: "Network",
-    description: "Reliable connectivity anywhere. From LTE/5G routers to satellite internet and mesh Wi-Fi, we tailor the best network for each site.",
-    features: [
-      {
-        id: "lte-router",
-        title: "LTE/5G Router",
-        image: "/images/solution/network_router.webp",
-        description: "High-performance cellular router that works even without wired lines.",
-        detailContent: "· LTE/5G dual SIM\n· Long-range antennas for wide coverage\n· Built-in VPN and security\n· Remote monitoring/management",
-      },
-      {
-        id: "cpe-bridge",
-        title: "Wireless Bridge",
-        image: "/images/solution/network_bridge.webp",
-        description: "Point-to-point links between buildings to extend network without cabling.",
-        detailContent: "· Up to 5km wireless backhaul\n· Outdoor-ready (IP65)\n· Beamforming for stable speed\n· Easy alignment and setup",
-      },
-      {
-        id: "satellite",
-        title: "Satellite Internet",
-        image: "/images/solution/network_satellite.webp",
-        description: "High-speed satellite connectivity for remote or temporary sites.",
-        detailContent: "· Up to 200Mbps download\n· Low-latency satellite link\n· Broad coverage\n· Ideal for remote/temporary sites",
-      },
-      {
-        id: "mesh-wifi",
-        title: "Mesh Wi-Fi",
-        image: "/images/solution/network_mesh.webp",
-        description: "Wi-Fi 6/6E mesh that blankets wide spaces without dead zones.",
-        detailContent: "· Wi-Fi 6/6E support\n· Single SSID roaming\n· AI channel optimization\n· Secure and guest networks",
-      },
-    ],
+const DATA: SolutionPackageData = {
+  id: "network",
+  href: "/solution/network",
+  image: "/images/solution/generated/kr-network-realphoto.webp",
+  copy: {
+    KO: {
+      eyebrow: "STABLE CONNECTION OPTION",
+      title: "결제와 예약이 끊기지 않게",
+      lead:
+        "모듈러 상업공간의 인터넷은 단순 Wi-Fi가 아닙니다. 카드 결제, 예약 확인, CCTV, 원격 제어가 같은 회선에 몰리지 않도록 운영망을 현장에 맞춰 나눕니다.",
+      imageAlt: "한국 도로변 모듈러 카페 내부의 POS, 라우터, 통신함 실사 이미지",
+      problemTitle: "연결 실패는 바로 매출 손실입니다",
+      problem:
+        "국도변, 산지, 관광지 입구처럼 입지가 좋아도 통신 품질이 흔들리면 결제와 예약 확인이 멈춥니다. 고객용 Wi-Fi와 운영 장비가 같은 망에 묶이면 장애 원인도 찾기 어렵습니다.",
+      fitTitle: "추천 현장",
+      fit: ["카드 결제가 많은 카페와 팝업스토어", "예약 확인이 필요한 독채 숙박", "CCTV와 원격 제어를 함께 쓰는 무인 공간", "업무망과 고객망을 분리해야 하는 현장 사무실"],
+      includedTitle: "구성 범위",
+      included: ["POS, 업무, 게스트, 장비망 분리 기준 제안", "라우터와 통신함 위치 및 전원 계획", "유선/무선/셀룰러 회선 조합 검토", "장애 시 백업 회선과 알림 방식 정리"],
+      decisionsTitle: "상담 때 확정할 것",
+      decisions: ["현장에 들어오는 유선 회선 가능 여부와 LTE/5G 보완 필요성", "POS와 예약 시스템이 어느 망에 연결될지", "고객 Wi-Fi 제공 범위와 속도 제한을 어떻게 둘지", "CCTV, 스마트락, 원격 제어 장비의 우선순위를 어떻게 나눌지"],
+      outcomesTitle: "도입 후 달라지는 점",
+      outcomes: ["결제와 예약 확인이 고객 Wi-Fi 트래픽에 덜 흔들립니다.", "장비마다 연결 경로가 정리되어 장애 대응이 빨라집니다.", "통신함과 배선이 노출되지 않아 공간 완성도가 유지됩니다.", "운영자가 현장에 없을 때도 핵심 장비 상태를 확인하기 쉬워집니다."],
+      ctaPrimary: "주문 옵션에서 연결 확인",
+      ctaSecondary: "통신 환경 상담",
+    },
+    EN: {
+      eyebrow: "STABLE CONNECTION OPTION",
+      title: "Keep Payment And Booking Online",
+      lead:
+        "Connectivity in a modular commercial space is more than Wi-Fi. Payment, booking, CCTV, and remote control are separated so the operating network fits the real site.",
+      imageAlt: "Photorealistic POS, router, and network cabinet inside a Korean roadside modular cafe",
+      problemTitle: "Connection failure becomes revenue loss",
+      problem:
+        "Even a strong location can fail operationally if connectivity is unstable. When guest Wi-Fi and operation devices share one network, failures are harder to diagnose.",
+      fitTitle: "Recommended sites",
+      fit: ["Cafes and pop-up stores with card payments", "Private stays needing booking checks", "Unmanned spaces using CCTV and remote control", "Site offices separating work and guest networks"],
+      includedTitle: "Scope",
+      included: ["POS, work, guest, and device network separation", "Router, network cabinet, and power placement", "Wired, wireless, and cellular line review", "Backup-line and alert method planning"],
+      decisionsTitle: "Decisions during consultation",
+      decisions: ["Whether a wired line is possible and cellular backup is needed", "Which network connects POS and booking systems", "How far guest Wi-Fi should reach and whether speed limits are needed", "How to prioritize CCTV, smart locks, and remote-control devices"],
+      outcomesTitle: "Operational outcomes",
+      outcomes: ["Payments and booking checks are less affected by guest traffic.", "Device connection paths are clearer, speeding up troubleshooting.", "Network boxes and cables stay clean within the finished space.", "Operators can check critical device status even off site."],
+      ctaPrimary: "Check connection in order options",
+      ctaSecondary: "Discuss network conditions",
+    },
   },
 };

 export default function NetworkSolutionPage() {
-  const { language } = useLanguage();
-  const copy = COPY[language];
-
-  return (
-    <SolutionTemplate
-      title={copy.title}
-      subtitle={copy.subtitle}
-      heroImage="/images/solution/network_hero.webp"
-      description={copy.description}
-      features={copy.features}
-    />
-  );
+  return <SolutionTemplate data={DATA} />;
 }
diff --git a/app/solution/page.tsx b/app/solution/page.tsx
index 274dc15..ff918db 100644
--- a/app/solution/page.tsx
+++ b/app/solution/page.tsx
@@ -1,184 +1,197 @@
 "use client";

-import React from 'react';
-import Link from 'next/link';
-import { ArrowRight, CheckCircle2, Globe, PenTool, Shield, Smartphone } from 'lucide-react';
-import { useLanguage } from '@/contexts/LanguageContext';
+import Image from "next/image";
+import Link from "next/link";
+import type { LucideIcon } from "lucide-react";
+import {
+  ArrowRight,
+  CheckCircle2,
+  LockKeyhole,
+  Paintbrush,
+  Router,
+  SlidersHorizontal,
+} from "lucide-react";
+import { useLanguage } from "@/contexts/LanguageContext";

-type Lang = 'KO' | 'EN';
+type Lang = "KO" | "EN";

-const COPY: Record<Lang, {
+type PackageCopy = {
+  id: string;
+  href: string;
+  image: string;
+  icon: LucideIcon;
+  title: string;
+  subtitle: string;
+  problem: string;
+  promise: string;
+  details: string[];
+  proof: string;
+};
+
+type PageCopy = {
   eyebrow: string;
   title: string;
-  description: string;
-  cta: string;
-  labels: {
-    problem: string;
-    where: string;
-    included: string;
-    when: string;
-  };
-  packages: Array<{
-    id: string;
-    icon: React.ReactElement;
-    title: string;
-    subtitle: string;
-    problem: string;
-    where: string;
-    what: string[];
-    when: string;
-    href: string;
-  }>;
-}> = {
+  lead: string;
+  heroLabel: string;
+  heroTitle: string;
+  heroBody: string;
+  selectLabel: string;
+  detailLabel: string;
+  proofLabel: string;
+  processTitle: string;
+  processLead: string;
+  ctaPrimary: string;
+  ctaSecondary: string;
+  packages: PackageCopy[];
+  process: Array<{ title: string; body: string }>;
+};
+
+const COPY: Record<Lang, PageCopy> = {
   KO: {
-    eyebrow: 'OPERATIONAL PACKAGES',
-    title: '공간 운영까지 설계합니다',
-    description:
-      '모듈러 공간은 건물만으로 완성되지 않습니다. 보안, 네트워크, 원격 제어, 브랜드 디테일까지 실제 운영자가 매일 마주치는 문제를 처음부터 함께 설계합니다.',
-    cta: '상세 솔루션 보기',
-    labels: {
-      problem: '해결하는 문제',
-      where: '도입 환경',
-      included: '패키지 구성',
-      when: '추천 시점',
-    },
+    eyebrow: "WEET OPERATION OPTIONS",
+    title: "운영까지 준비된 모듈러 공간",
+    lead:
+      "좋은 공간은 예쁜 외관에서 끝나지 않습니다. Weet는 보안, 연결, 원격 준비, 브랜드 마감을 실제 운영자가 매일 겪는 문제 기준으로 설계합니다.",
+    heroLabel: "옵션은 장식이 아니라 운영 리스크 관리입니다",
+    heroTitle: "상담 때 장비명이 아니라 운영 상황부터 묻습니다.",
+    heroBody:
+      "무인으로 열어야 하는지, 결제가 끊기면 안 되는지, 입실 전 냉난방이 필요한지, 상권에서 첫인상이 중요한지부터 확인한 뒤 필요한 옵션만 조합합니다.",
+    selectLabel: "선택 기준",
+    detailLabel: "포함되는 것",
+    proofLabel: "운영자가 체감하는 변화",
+    processTitle: "옵션을 붙이는 방식도 다릅니다",
+    processLead:
+      "완공 후 장비를 덧붙이는 방식이 아니라, 출입 동선·배선·조명·마감 위치를 설계 단계에서 함께 잡습니다.",
+    ctaPrimary: "주문 옵션 확인",
+    ctaSecondary: "상담으로 현장 맞추기",
     packages: [
       {
-        id: 'cctv',
-        icon: <Shield strokeWidth={1.5} />,
-        title: '안전하게 지키기',
-        subtitle: 'Security',
-        problem: '무인 운영, 외곽 입지, 야간 운영처럼 사람이 계속 상주하기 어려운 공간의 보안 공백을 줄입니다.',
-        where: '무인 카페, 원격 스마트팜, 도심 외곽 프라이빗 숙소, 현장 사무소',
-        what: [
-          '고해상도 실내외 CCTV',
-          '스마트 출입 통제',
-          '모바일 실시간 모니터링',
-        ],
-        when: '상시 관리가 어렵고 출입 기록, 야간 감시, 원격 확인이 필요한 운영자에게 적합합니다.',
-        href: '/solution/cctv',
+        id: "security",
+        href: "/solution/cctv",
+        image: "/images/solution/generated/kr-security-realphoto.webp",
+        icon: LockKeyhole,
+        title: "안심 출입",
+        subtitle: "CCTV · 스마트락 · 센서등",
+        problem: "운영자가 항상 머물 수 없는 외곽·야간·예약제 공간의 보안 공백을 줄입니다.",
+        promise: "출입 기록, 야간 감지, 현관 조명을 하나의 운영 흐름으로 설계합니다.",
+        details: ["현관/창측 사각지대 검토", "CCTV와 센서등 위치 제안", "스마트락 권한 방식 정리"],
+        proof: "밤에도 누가 들어왔는지, 어떤 알림을 받아야 하는지 명확해집니다.",
       },
       {
-        id: 'network',
-        icon: <Globe strokeWidth={1.5} />,
-        title: '끊김 없이 연결하기',
-        subtitle: 'Network',
-        problem: '부지 위치, 철골 구조, 방문객 트래픽 때문에 생기는 인터넷 음영과 결제 장애 리스크를 줄입니다.',
-        where: '팝업스토어, 업무용 현장 사무소, IoT 기반 스마트팜, 숙박 운영 공간',
-        what: [
-          '산업용 라우터 및 메시 Wi-Fi',
-          'POS/방문객/업무망 분리',
-          '백업 회선 설계',
-        ],
-        when: '결제, 예약, 원격 제어, 클라우드 업무처럼 연결 실패가 바로 손실로 이어지는 공간에 필요합니다.',
-        href: '/solution/network',
+        id: "network",
+        href: "/solution/network",
+        image: "/images/solution/generated/kr-network-realphoto.webp",
+        icon: Router,
+        title: "끊김 없는 연결",
+        subtitle: "POS · 예약 · 게스트 Wi-Fi",
+        problem: "결제, 예약, 원격 제어가 인터넷 품질에 묶이는 상업 공간의 손실 리스크를 줄입니다.",
+        promise: "운영망, 고객망, 장비망을 구분하고 현장 조건에 맞는 회선과 라우터를 제안합니다.",
+        details: ["POS/업무/게스트망 분리", "라우터와 통신함 위치 계획", "백업 회선 필요성 점검"],
+        proof: "카드 결제와 예약 확인이 끊기지 않아 운영자가 현장에서 덜 불안합니다.",
       },
       {
-        id: 'iot',
-        icon: <Smartphone strokeWidth={1.5} />,
-        title: '원격으로 제어하기',
-        subtitle: 'Smart Control',
-        problem: '매번 방문하지 않아도 조명, 냉난방, 환기를 제어해 고객 입장 전 최적의 상태를 만듭니다.',
-        where: '프리미엄 숙박 시설, 무인 쇼룸, 주말 주택, 예약제 체험 공간',
-        what: [
-          '스마트 조명 및 온습도 제어',
-          '방문 전 냉난방/환기 예약',
-          '운영 스케줄 자동화',
-        ],
-        when: '고객 경험을 일정하게 유지하고 에너지 낭비와 현장 방문 횟수를 줄이고 싶을 때 권합니다.',
-        href: '/solution/iot',
+        id: "control",
+        href: "/solution/iot",
+        image: "/images/solution/generated/kr-control-realphoto.webp",
+        icon: SlidersHorizontal,
+        title: "원격 준비",
+        subtitle: "조명 · 냉난방 · 환기",
+        problem: "입실 전마다 현장에 가야 하는 숙박·체험·무인 운영의 반복 업무를 줄입니다.",
+        promise: "조명, 공조, 환기, 도어 상태를 예약과 운영 시간에 맞춰 제어할 수 있게 구성합니다.",
+        details: ["스마트 스위치/온도 패널", "입실 전 냉난방 스케줄", "도어 상태와 운영 알림"],
+        proof: "고객이 도착하기 전 공간 상태를 미리 준비하고, 불필요한 방문을 줄입니다.",
       },
       {
-        id: 'design',
-        icon: <PenTool strokeWidth={1.5} />,
-        title: '브랜드와 현장에 맞게 완성하기',
-        subtitle: 'Brand Fit',
-        problem: '표준 모듈이 브랜드의 첫인상, 주변 풍경, 고객 동선과 따로 놀지 않도록 마지막 완성도를 높입니다.',
-        where: '브랜드 플래그십, 프랜차이즈 카페, 독채 스테이, 관광지 판매 공간',
-        what: [
-          '브랜드 맞춤 내장재/가구 설계',
-          '외관 및 조경 방향 제안',
-          '사이니지와 고객 동선 기획',
-        ],
-        when: '공간 자체가 마케팅 자산이 되어야 하거나, 주변 경관과의 조화가 매출에 영향을 주는 현장에 적합합니다.',
-        href: '/solution/design',
+        id: "brand",
+        href: "/solution/design",
+        image: "/images/solution/generated/kr-brandfit-realphoto.webp",
+        icon: Paintbrush,
+        title: "현장 완성",
+        subtitle: "외장 · 간판 · 데크 동선",
+        problem: "모듈러가 현장 상권, 브랜드 톤, 고객 진입 동선과 따로 노는 느낌을 줄입니다.",
+        promise: "외장재, 간판 자리, 데크·조경·배수 마감을 함께 정리해 첫인상을 완성합니다.",
+        details: ["브랜드 톤에 맞는 외장", "간판/조명 자리 사전 계획", "데크·조경·배수 디테일"],
+        proof: "공간이 ‘놓인 건물’이 아니라 바로 영업 가능한 상업 장소처럼 보입니다.",
       },
     ],
+    process: [
+      { title: "운영 상황 인터뷰", body: "무인, 예약제, 상시 상주, 야간 운영 여부를 먼저 확인합니다." },
+      { title: "현장 리스크 표시", body: "출입, 통신, 공조, 간판, 배수 위치를 도면과 현장 조건 위에 표시합니다." },
+      { title: "필요 옵션만 확정", body: "장비 스펙보다 운영자가 실제로 받을 알림과 관리 범위를 먼저 정합니다." },
+    ],
   },
   EN: {
-    eyebrow: 'OPERATIONAL PACKAGES',
-    title: 'Operations Built Into The Space',
-    description:
-      'A modular space is not complete with the building alone. WEET plans security, network, remote control, and brand fit around the real operational problems teams face every day.',
-    cta: 'View solution',
-    labels: {
-      problem: 'Problem solved',
-      where: 'Where it matters',
-      included: 'Included',
-      when: 'When to choose it',
-    },
+    eyebrow: "WEET OPERATION OPTIONS",
+    title: "Modular Spaces Ready To Operate",
+    lead:
+      "A good space does not end with a beautiful shell. Weet plans security, connection, remote readiness, and site finish around the problems operators face every day.",
+    heroLabel: "Options are risk control, not decoration",
+    heroTitle: "We start with the operating situation, not a device list.",
+    heroBody:
+      "We check whether the space runs unmanned, whether payments must never fail, whether HVAC is needed before arrival, and whether first impression matters in the local market.",
+    selectLabel: "How to choose",
+    detailLabel: "What is included",
+    proofLabel: "Operational change",
+    processTitle: "The option workflow is different",
+    processLead:
+      "We do not bolt devices on after completion. Access flow, wiring, lighting, and finish details are planned with the space.",
+    ctaPrimary: "Check order options",
+    ctaSecondary: "Match my site",
     packages: [
       {
-        id: 'cctv',
-        icon: <Shield strokeWidth={1.5} />,
-        title: 'Keep It Secure',
-        subtitle: 'Security',
-        problem: 'Reduce security gaps in unmanned, remote, or night-operated spaces where staff cannot always stay on site.',
-        where: 'Unmanned cafes, remote smart farms, private stays outside the city, site offices',
-        what: [
-          'Indoor and outdoor CCTV',
-          'Smart access control',
-          'Real-time mobile monitoring',
-        ],
-        when: 'Best when access logs, night monitoring, and remote checks are essential.',
-        href: '/solution/cctv',
+        id: "security",
+        href: "/solution/cctv",
+        image: "/images/solution/generated/kr-security-realphoto.webp",
+        icon: LockKeyhole,
+        title: "Secure Access",
+        subtitle: "CCTV · smart lock · sensor light",
+        problem: "Reduce security gaps in remote, night, and reservation-based spaces where staff cannot stay all day.",
+        promise: "Access logs, night detection, and entrance lighting are planned as one operating flow.",
+        details: ["Entrance blind-spot review", "CCTV and sensor-light placement", "Smart-lock permission planning"],
+        proof: "Operators know who entered at night and which alerts deserve attention.",
       },
       {
-        id: 'network',
-        icon: <Globe strokeWidth={1.5} />,
-        title: 'Stay Connected',
-        subtitle: 'Network',
-        problem: 'Reduce dead zones and payment risks caused by site location, steel structures, and visitor traffic.',
-        where: 'Pop-up stores, site offices, IoT smart farms, hospitality spaces',
-        what: [
-          'Industrial router and mesh Wi-Fi',
-          'Separated POS, guest, and work networks',
-          'Backup-line planning',
-        ],
-        when: 'Needed where payment, reservation, remote control, or cloud work cannot afford downtime.',
-        href: '/solution/network',
+        id: "network",
+        href: "/solution/network",
+        image: "/images/solution/generated/kr-network-realphoto.webp",
+        icon: Router,
+        title: "Stable Connection",
+        subtitle: "POS · booking · guest Wi-Fi",
+        problem: "Reduce losses when payment, booking, or remote control depends on unstable connectivity.",
+        promise: "We separate operator, guest, and device networks and recommend the right line and router for the site.",
+        details: ["POS/work/guest network split", "Router and network-box placement", "Backup-line review"],
+        proof: "Payments and reservations stay reliable, so operators feel less exposed on site.",
       },
       {
-        id: 'iot',
-        icon: <Smartphone strokeWidth={1.5} />,
-        title: 'Control Remotely',
-        subtitle: 'Smart Control',
-        problem: 'Prepare lighting, HVAC, and ventilation before a guest arrives without visiting the site every time.',
-        where: 'Premium stays, unmanned showrooms, weekend houses, reservation-only experience rooms',
-        what: [
-          'Smart lighting and temperature control',
-          'Pre-arrival HVAC and ventilation scheduling',
-          'Operation schedule automation',
-        ],
-        when: 'Recommended when teams want consistent guest experience with fewer site visits and less energy waste.',
-        href: '/solution/iot',
+        id: "control",
+        href: "/solution/iot",
+        image: "/images/solution/generated/kr-control-realphoto.webp",
+        icon: SlidersHorizontal,
+        title: "Remote Ready",
+        subtitle: "lighting · HVAC · ventilation",
+        problem: "Reduce repeated site visits for hospitality, experience rooms, and unmanned operations.",
+        promise: "Lighting, HVAC, ventilation, and door state can follow booking time and operating hours.",
+        details: ["Smart switches and temperature panels", "Pre-arrival HVAC schedule", "Door state and operation alerts"],
+        proof: "The space can be prepared before guests arrive, with fewer unnecessary visits.",
       },
       {
-        id: 'design',
-        icon: <PenTool strokeWidth={1.5} />,
-        title: 'Fit Brand And Site',
-        subtitle: 'Brand Fit',
-        problem: 'Make the standard module feel native to the brand, surrounding landscape, and customer flow.',
-        where: 'Flagship stores, franchise cafes, private stays, tourism retail spaces',
-        what: [
-          'Brand-fit interior and furniture planning',
-          'Exterior and landscape direction',
-          'Signage and customer-flow planning',
-        ],
-        when: 'Right when the space itself must become a marketing asset or the surrounding view affects revenue.',
-        href: '/solution/design',
+        id: "brand",
+        href: "/solution/design",
+        image: "/images/solution/generated/kr-brandfit-realphoto.webp",
+        icon: Paintbrush,
+        title: "Site Finish",
+        subtitle: "facade · signage · deck flow",
+        problem: "Prevent the module from feeling detached from the brand, local market, and customer flow.",
+        promise: "Facade, signage position, deck, landscape, and drainage details are aligned before completion.",
+        details: ["Brand-fit exterior palette", "Sign and lighting placement", "Deck, planting, and drainage detail"],
+        proof: "The space reads as a business-ready site, not just a placed building.",
       },
     ],
+    process: [
+      { title: "Operating interview", body: "We first check unmanned, reservation-only, staffed, and night-operation needs." },
+      { title: "Site risk map", body: "Access, connection, HVAC, signage, and drainage points are marked against the real site." },
+      { title: "Option confirmation", body: "We define actual alerts and management scope before chasing device specs." },
+    ],
   },
 };

@@ -187,96 +200,137 @@ export default function SolutionPage() {
   const copy = COPY[language];

   return (
-    <div className="min-h-screen bg-white text-gray-950">
-      <main className="pb-32 pt-24 lg:pt-36">
-        <section className="mx-auto max-w-[1280px] px-4 md:px-8">
-          <div className="grid gap-8 border-b border-gray-200 pb-12 lg:grid-cols-[280px_1fr] lg:gap-16 lg:pb-16">
-            <p className="text-sm font-bold text-gray-500">{copy.eyebrow}</p>
-            <div>
-              <h1
-                aria-label={copy.title}
-                className="max-w-4xl text-4xl font-black leading-tight text-gray-950 md:text-6xl lg:text-[72px]"
-              >
-                {language === 'KO' ? (
-                  <>
-                    <span className="block md:inline">공간 운영까지</span>
-                    <span className="block md:inline md:before:content-['\\00a0']">설계합니다</span>
-                  </>
-                ) : (
-                  copy.title
-                )}
-              </h1>
-              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-gray-600 md:text-xl break-keep">
-                {copy.description}
-              </p>
-            </div>
+    <main className="min-h-screen bg-[#f7f6f1] text-neutral-950">
+      <section className="mx-auto max-w-[1440px] px-4 pb-12 pt-24 md:px-8 lg:pb-16 lg:pt-32">
+        <div className="grid gap-10 border-b border-neutral-300 pb-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(440px,0.7fr)] lg:gap-16 lg:pb-14">
+          <div>
+            <p className="text-xs font-black uppercase tracking-[0.22em] text-neutral-500">{copy.eyebrow}</p>
+            <h1 className="mt-4 max-w-5xl text-4xl font-black leading-[1.04] text-neutral-950 md:text-6xl lg:text-[76px] break-keep">
+              {copy.title}
+            </h1>
+            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-neutral-600 md:text-xl break-keep">
+              {copy.lead}
+            </p>
+          </div>
+
+          <div className="self-end rounded-md border border-neutral-300 bg-white p-5">
+            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#A77B00]">{copy.heroLabel}</p>
+            <h2 className="mt-3 text-2xl font-black leading-tight text-neutral-950 md:text-3xl break-keep">
+              {copy.heroTitle}
+            </h2>
+            <p className="mt-4 text-base leading-relaxed text-neutral-600 break-keep">{copy.heroBody}</p>
           </div>
+        </div>
+      </section>

-          <div className="divide-y divide-gray-200">
-            {copy.packages.map((pkg, index) => (
+      <section className="mx-auto max-w-[1440px] px-4 pb-16 md:px-8 lg:pb-24">
+        <div className="grid gap-6">
+          {copy.packages.map((pkg, index) => {
+            const Icon = pkg.icon;
+            return (
               <article
                 key={pkg.id}
-                id={`solution-${pkg.id}`}
-                className="group grid gap-8 py-10 scroll-mt-[120px] lg:grid-cols-[240px_1fr_180px] lg:gap-12 lg:py-14"
+                className="grid gap-0 overflow-hidden rounded-md border border-neutral-300 bg-white lg:grid-cols-[minmax(340px,0.78fr)_1fr]"
               >
-                <div>
-                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-md border border-gray-200 bg-gray-50 text-gray-500 transition-colors group-hover:border-[#FEBD16] group-hover:bg-[#FFF9E6] group-hover:text-[#E5A410]">
-                    {React.cloneElement(pkg.icon as React.ReactElement<{ size?: number }>, { size: 28 })}
+                <Link href={pkg.href} className="group relative block aspect-[16/10] overflow-hidden bg-neutral-200 lg:aspect-auto">
+                  <Image
+                    src={pkg.image}
+                    alt={`${pkg.title} ${pkg.subtitle}`}
+                    fill
+                    sizes="(max-width: 1024px) 100vw, 42vw"
+                    priority
+                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
+                  />
+                  <div className="absolute left-4 top-4 rounded-sm bg-neutral-950/85 px-3 py-2 text-xs font-black text-white backdrop-blur">
+                    {String(index + 1).padStart(2, "0")}
                   </div>
-                  <p className="text-sm font-bold text-gray-400">{String(index + 1).padStart(2, '0')}</p>
-                  <h2 className="mt-2 text-2xl font-black leading-tight text-gray-950 md:text-3xl break-keep">
-                    {pkg.title}
-                  </h2>
-                  <p className="mt-2 text-sm font-bold text-gray-500">{pkg.subtitle}</p>
-                </div>
+                </Link>

-                <div className="grid gap-7">
+                <div className="grid gap-8 p-5 md:p-8 lg:grid-cols-[minmax(220px,0.75fr)_1fr] lg:p-10">
                   <div>
-                    <h3 className="text-sm font-bold text-gray-500">{copy.labels.problem}</h3>
-                    <p className="mt-2 text-lg font-semibold leading-relaxed text-gray-900 break-keep">
-                      {pkg.problem}
-                    </p>
-                  </div>
-
-                  <div className="grid gap-7 md:grid-cols-2">
-                    <div>
-                      <h3 className="text-sm font-bold text-gray-500">{copy.labels.where}</h3>
-                      <p className="mt-2 leading-relaxed text-gray-600 break-keep">{pkg.where}</p>
+                    <div className="flex h-12 w-12 items-center justify-center rounded-sm border border-neutral-300 bg-[#FEBD16] text-neutral-950">
+                      <Icon className="h-6 w-6" strokeWidth={1.7} />
                     </div>
+                    <h2 className="mt-5 text-3xl font-black leading-tight text-neutral-950 md:text-4xl break-keep">
+                      {pkg.title}
+                    </h2>
+                    <p className="mt-2 text-sm font-black uppercase tracking-[0.14em] text-neutral-500">{pkg.subtitle}</p>
+                    <p className="mt-5 text-base font-semibold leading-relaxed text-neutral-800 break-keep">{pkg.promise}</p>
+                    <Link
+                      href={pkg.href}
+                      className="mt-6 inline-flex h-11 items-center gap-2 rounded-sm border border-neutral-950 px-4 text-sm font-black text-neutral-950 transition-colors hover:bg-neutral-950 hover:text-white"
+                    >
+                      {copy.detailLabel}
+                      <ArrowRight className="h-4 w-4" />
+                    </Link>
+                  </div>

+                  <div className="grid gap-6">
                     <div>
-                      <h3 className="text-sm font-bold text-gray-500">{copy.labels.when}</h3>
-                      <p className="mt-2 leading-relaxed text-gray-600 break-keep">{pkg.when}</p>
+                      <p className="text-xs font-black uppercase tracking-[0.16em] text-neutral-500">{copy.selectLabel}</p>
+                      <p className="mt-2 text-lg font-bold leading-relaxed text-neutral-950 break-keep">{pkg.problem}</p>
                     </div>
-                  </div>

-                  <div>
-                    <h3 className="text-sm font-bold text-gray-500">{copy.labels.included}</h3>
-                    <ul className="mt-3 grid gap-3 md:grid-cols-3">
-                      {pkg.what.map((item) => (
-                        <li key={item} className="flex items-start gap-2 text-sm font-semibold leading-relaxed text-gray-800">
-                          <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#D99900]" />
-                          <span>{item}</span>
+                    <ul className="grid gap-3">
+                      {pkg.details.map((item) => (
+                        <li key={item} className="flex gap-3 text-sm font-semibold leading-relaxed text-neutral-700 break-keep">
+                          <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#C69200]" />
+                          {item}
                         </li>
                       ))}
                     </ul>
+
+                    <div className="rounded-md bg-neutral-950 px-5 py-5 text-white">
+                      <p className="text-xs font-black uppercase tracking-[0.16em] text-neutral-400">{copy.proofLabel}</p>
+                      <p className="mt-2 text-sm font-semibold leading-relaxed break-keep">{pkg.proof}</p>
+                    </div>
                   </div>
                 </div>
+              </article>
+            );
+          })}
+        </div>
+      </section>

-                <div className="flex items-start lg:justify-end">
-                  <Link
-                    href={pkg.href}
-                    className="inline-flex h-12 items-center gap-2 rounded-sm border border-gray-950 px-5 text-sm font-bold text-gray-950 transition-colors hover:bg-gray-950 hover:text-white"
-                  >
-                    {copy.cta}
-                    <ArrowRight size={16} />
-                  </Link>
+      <section className="border-y border-neutral-300 bg-white">
+        <div className="mx-auto grid max-w-[1440px] gap-8 px-4 py-14 md:px-8 lg:grid-cols-[minmax(260px,0.5fr)_1fr] lg:py-20">
+          <div>
+            <p className="text-xs font-black uppercase tracking-[0.22em] text-neutral-500">WORKFLOW</p>
+            <h2 className="mt-3 text-3xl font-black leading-tight text-neutral-950 md:text-5xl break-keep">
+              {copy.processTitle}
+            </h2>
+            <p className="mt-5 max-w-xl text-base leading-relaxed text-neutral-600 break-keep">{copy.processLead}</p>
+          </div>
+
+          <ol className="grid gap-4">
+            {copy.process.map((step, index) => (
+              <li key={step.title} className="grid gap-3 border-b border-neutral-200 pb-5 last:border-b-0 md:grid-cols-[72px_1fr]">
+                <span className="text-2xl font-black text-[#C69200]">{String(index + 1).padStart(2, "0")}</span>
+                <div>
+                  <h3 className="text-xl font-black text-neutral-950 break-keep">{step.title}</h3>
+                  <p className="mt-2 text-base leading-relaxed text-neutral-600 break-keep">{step.body}</p>
                 </div>
-              </article>
+              </li>
             ))}
-          </div>
-        </section>
-      </main>
-    </div>
+          </ol>
+        </div>
+      </section>
+
+      <section className="mx-auto flex max-w-[1440px] flex-col gap-3 px-4 py-12 md:px-8 sm:flex-row">
+        <Link
+          href="/customize"
+          className="inline-flex h-12 items-center justify-center gap-2 rounded-sm bg-[#FEBD16] px-6 text-sm font-black text-neutral-950 transition-colors hover:bg-[#E2A80F]"
+        >
+          {copy.ctaPrimary}
+          <ArrowRight className="h-4 w-4" />
+        </Link>
+        <Link
+          href="/support"
+          className="inline-flex h-12 items-center justify-center rounded-sm border border-neutral-300 px-6 text-sm font-black text-neutral-800 transition-colors hover:border-neutral-950 hover:text-neutral-950"
+        >
+          {copy.ctaSecondary}
+        </Link>
+      </section>
+    </main>
   );
 }
diff --git a/components/solution/SolutionTemplate.tsx b/components/solution/SolutionTemplate.tsx
index 5f14433..7c98232 100644
--- a/components/solution/SolutionTemplate.tsx
+++ b/components/solution/SolutionTemplate.tsx
@@ -1,198 +1,214 @@
-'use client';
-
-import { useState, useRef } from 'react';
-import Image from 'next/image';
-import Link from 'next/link';
-import { motion, useScroll, useTransform } from 'framer-motion';
-import { ChevronRight, Image as ImageIcon } from 'lucide-react';
-import { cn } from '@/lib/utils';
-import FeatureModal from './FeatureModal';
-import { useLanguage } from '@/contexts/LanguageContext';
-
-interface Feature {
-    id: string;
-    title: string;
-    image: string;
-    description: string;
-    detailContent?: string;
-}
+"use client";

-interface SolutionTemplateProps {
-    title: string;
-    subtitle: string;
-    heroImage: string;
-    description: string;
-    features: Feature[];
-}
+import Image from "next/image";
+import Link from "next/link";
+import {
+  ArrowLeft,
+  ArrowRight,
+  CheckCircle2,
+  ClipboardCheck,
+  Gauge,
+  MapPin,
+  ShieldCheck,
+} from "lucide-react";
+import { useLanguage } from "@/contexts/LanguageContext";
+import { cn } from "@/lib/utils";
+
+type Lang = "KO" | "EN";

-const NAV = {
-    KO: [
-        { name: '시큐리티', href: '/solution/cctv' },
-        { name: '네트워크', href: '/solution/network' },
-        { name: 'IoT', href: '/solution/iot' },
-        { name: '디자인', href: '/solution/design' },
-    ],
-    EN: [
-        { name: 'Security', href: '/solution/cctv' },
-        { name: 'Network', href: '/solution/network' },
-        { name: 'IoT', href: '/solution/iot' },
-        { name: 'Design', href: '/solution/design' },
-    ],
+type LocalizedSolution = {
+  eyebrow: string;
+  title: string;
+  lead: string;
+  imageAlt: string;
+  problemTitle: string;
+  problem: string;
+  fitTitle: string;
+  fit: string[];
+  includedTitle: string;
+  included: string[];
+  decisionsTitle: string;
+  decisions: string[];
+  outcomesTitle: string;
+  outcomes: string[];
+  ctaPrimary: string;
+  ctaSecondary: string;
 };

-export default function SolutionTemplate({
-    title,
-    subtitle,
-    heroImage,
-    description,
-    features,
-}: SolutionTemplateProps) {
-    const { language } = useLanguage();
-    const navLinks = language === 'KO' ? NAV.KO : NAV.EN;
-    const viewMoreLabel = language === 'KO' ? '자세히 보기' : 'View more';
-    const imagePendingLabel = language === 'KO' ? '이미지 준비 중' : 'Image pending';
-    const containerRef = useRef<HTMLDivElement>(null);
-    const { scrollYProgress } = useScroll({
-        target: containerRef,
-        offset: ["start start", "end start"]
-    });
-
-    const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);
-    const [isModalOpen, setIsModalOpen] = useState(false);
-
-    const openModal = (feature: Feature) => {
-        setSelectedFeature(feature);
-        setIsModalOpen(true);
-    };
-
-    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
-    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
-
-    return (
-        <div className="min-h-screen bg-white" ref={containerRef}>
-            {/* Hero Section with Parallax */}
-            <div className="relative h-[35vh] min-h-[300px] w-full overflow-hidden flex items-center justify-center">
-                <motion.div
-                    style={{ y, opacity }}
-                    className="absolute inset-0 z-0"
-                >
-                    <Image
-                        src={heroImage}
-                        alt={title}
-                        fill
-                        sizes="100vw"
-                        className="object-cover"
-                        priority
-                    />
-                    <div className="absolute inset-0 bg-black/50" />
-                </motion.div>
-
-                <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-20 text-center text-white">
-                    <motion.div
-                        initial={{ opacity: 0, y: 20 }}
-                        animate={{ opacity: 1, y: 0 }}
-                        transition={{ duration: 0.8, ease: "easeOut" }}
-                        className="space-y-3"
-                    >
-                        <span className="inline-block py-1 px-3 rounded-full border border-white/30 bg-white/10 backdrop-blur-md text-xs font-medium tracking-wider uppercase text-primary">
-                            {subtitle}
-                        </span>
-                        <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
-                            {title}
-                        </h1>
-                        <p className="text-base md:text-lg text-gray-200 max-w-2xl mx-auto leading-relaxed font-light">
-                            {description}
-                        </p>
-                    </motion.div>
-                </div>
+export type SolutionPackageData = {
+  id: "security" | "network" | "control" | "brand";
+  href: string;
+  image: string;
+  copy: Record<Lang, LocalizedSolution>;
+};
+
+const PACKAGE_NAV: Record<
+  Lang,
+  Array<{ id: SolutionPackageData["id"]; href: string; name: string; desc: string }>
+> = {
+  KO: [
+    { id: "security", href: "/solution/cctv", name: "안심 출입", desc: "CCTV · 도어락 · 센서등" },
+    { id: "network", href: "/solution/network", name: "끊김 없는 연결", desc: "POS · 예약 · 게스트 Wi-Fi" },
+    { id: "control", href: "/solution/iot", name: "원격 준비", desc: "조명 · 냉난방 · 환기" },
+    { id: "brand", href: "/solution/design", name: "현장 완성", desc: "외장 · 간판 · 동선" },
+  ],
+  EN: [
+    { id: "security", href: "/solution/cctv", name: "Secure Access", desc: "CCTV · lock · sensor light" },
+    { id: "network", href: "/solution/network", name: "Stable Connection", desc: "POS · booking · guest Wi-Fi" },
+    { id: "control", href: "/solution/iot", name: "Remote Ready", desc: "lighting · HVAC · ventilation" },
+    { id: "brand", href: "/solution/design", name: "Site Finish", desc: "facade · signage · flow" },
+  ],
+};
+
+export default function SolutionTemplate({ data }: { data: SolutionPackageData }) {
+  const { language } = useLanguage();
+  const copy = data.copy[language];
+  const nav = PACKAGE_NAV[language];
+
+  return (
+    <main className="min-h-screen bg-[#f7f6f1] text-[#151515]">
+      <section className="mx-auto max-w-[1440px] px-4 pb-14 pt-24 md:px-8 lg:pb-20 lg:pt-32">
+        <Link
+          href="/solution"
+          className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-500 transition-colors hover:text-neutral-950"
+        >
+          <ArrowLeft className="h-4 w-4" />
+          {language === "KO" ? "운영 옵션 전체" : "All operation options"}
+        </Link>
+
+        <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(520px,1.1fr)] lg:items-end">
+          <div className="max-w-2xl">
+            <p className="text-xs font-black uppercase tracking-[0.22em] text-neutral-500">{copy.eyebrow}</p>
+            <h1 className="mt-4 text-4xl font-black leading-[1.05] text-neutral-950 md:text-6xl lg:text-[72px]">
+              {copy.title}
+            </h1>
+            <p className="mt-6 max-w-xl text-lg leading-relaxed text-neutral-600 md:text-xl break-keep">
+              {copy.lead}
+            </p>
+          </div>
+
+          <div className="relative aspect-[16/9] overflow-hidden rounded-md bg-neutral-200 shadow-[0_24px_70px_rgba(20,20,20,0.16)]">
+            <Image
+              src={data.image}
+              alt={copy.imageAlt}
+              fill
+              priority
+              sizes="(max-width: 1024px) 100vw, 58vw"
+              className="object-cover"
+            />
+          </div>
+        </div>
+      </section>
+
+      <section className="border-y border-neutral-200 bg-white">
+        <div className="mx-auto flex max-w-[1440px] gap-2 overflow-x-auto px-4 py-3 md:px-8">
+          {nav.map((item) => {
+            const isActive = item.id === data.id;
+            return (
+              <Link
+                key={item.id}
+                href={item.href}
+                className={cn(
+                  "min-w-[220px] rounded-md border px-4 py-3 transition-colors",
+                  isActive
+                    ? "border-neutral-950 bg-neutral-950 text-white"
+                    : "border-neutral-200 bg-white text-neutral-600 hover:border-neutral-950 hover:text-neutral-950",
+                )}
+              >
+                <span className="block text-sm font-black">{item.name}</span>
+                <span className={cn("mt-1 block text-xs", isActive ? "text-neutral-300" : "text-neutral-500")}>
+                  {item.desc}
+                </span>
+              </Link>
+            );
+          })}
+        </div>
+      </section>
+
+      <section className="mx-auto grid max-w-[1440px] gap-8 px-4 py-14 md:px-8 lg:grid-cols-[minmax(260px,0.42fr)_1fr] lg:py-20">
+        <aside className="lg:sticky lg:top-28 lg:h-fit">
+          <div className="border-l-2 border-neutral-950 pl-5">
+            <p className="text-sm font-black text-neutral-950">{copy.problemTitle}</p>
+            <p className="mt-3 text-base leading-relaxed text-neutral-600 break-keep">{copy.problem}</p>
+          </div>
+        </aside>
+
+        <div className="grid gap-10">
+          <section className="grid gap-5 border-b border-neutral-200 pb-10 md:grid-cols-[220px_1fr]">
+            <div className="flex items-center gap-3">
+              <MapPin className="h-5 w-5 text-[#C69200]" />
+              <h2 className="text-sm font-black uppercase tracking-[0.16em] text-neutral-500">{copy.fitTitle}</h2>
             </div>
+            <ul className="grid gap-3 md:grid-cols-2">
+              {copy.fit.map((item) => (
+                <li key={item} className="flex gap-3 text-base font-semibold leading-relaxed text-neutral-800 break-keep">
+                  <CheckCircle2 className="mt-1 h-4 w-4 flex-shrink-0 text-[#C69200]" />
+                  {item}
+                </li>
+              ))}
+            </ul>
+          </section>

-            {/* Floating Segmented Control Navigation */}
-            <div className="sticky top-[70px] md:top-[90px] lg:top-[110px] z-40 flex justify-center py-4 pointer-events-none">
-                <div className="bg-gray-100/80 backdrop-blur-md p-1.5 rounded-full pointer-events-auto shadow-sm border border-gray-200/50 inline-flex overflow-x-auto max-w-[90vw] no-scrollbar">
-                    <div className="flex items-center relative">
-                        {navLinks.map((link) => {
-                            const isActive = title === link.name;
-                            return (
-                                <Link
-                                    key={link.href}
-                                    href={link.href}
-                                    className={cn(
-                                        "relative px-4 md:px-6 py-2 md:py-2.5 text-xs md:text-sm font-medium transition-colors rounded-full z-10 whitespace-nowrap",
-                                        isActive ? "text-gray-900" : "text-gray-500 hover:text-gray-900"
-                                    )}
-                                >
-                                    {link.name}
-                                    {isActive && (
-                                        <motion.div
-                                            layoutId="activeSegment"
-                                            className="absolute inset-0 bg-white rounded-full shadow-sm border border-gray-200/50 -z-10"
-                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
-                                        />
-                                    )}
-                                </Link>
-                            );
-                        })}
-                    </div>
+          <section className="grid gap-5 border-b border-neutral-200 pb-10 md:grid-cols-[220px_1fr]">
+            <div className="flex items-center gap-3">
+              <Gauge className="h-5 w-5 text-[#C69200]" />
+              <h2 className="text-sm font-black uppercase tracking-[0.16em] text-neutral-500">{copy.includedTitle}</h2>
+            </div>
+            <div className="grid gap-3 sm:grid-cols-2">
+              {copy.included.map((item) => (
+                <div key={item} className="rounded-md border border-neutral-200 bg-white px-4 py-4 text-sm font-semibold leading-relaxed text-neutral-800 break-keep">
+                  {item}
                 </div>
+              ))}
             </div>
+          </section>

-            {/* Main Content */}
-            <section className="py-24 bg-gray-50">
-                <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
-                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
-                        {features.map((feature, index) => (
-                            <motion.div
-                                key={feature.id}
-                                initial={{ opacity: 0, y: 20 }}
-                                animate={{ opacity: 1, y: 0 }}
-                                transition={{ duration: 0.5, delay: index * 0.1 }}
-                                className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-500 border border-gray-100 flex flex-col"
-                            >
-                                <div className="relative h-64 overflow-hidden cursor-pointer" onClick={() => openModal(feature)}>
-                                    {feature.image ? (
-                                        <Image
-                                            src={feature.image}
-                                            alt={feature.title}
-                                            fill
-                                            sizes="(max-width: 768px) 100vw, 50vw"
-                                            priority={index < 2}
-                                            className="object-cover group-hover:scale-105 transition-transform duration-700"
-                                        />
-                                    ) : (
-                                        <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gray-100 text-gray-500">
-                                            <ImageIcon className="h-7 w-7" />
-                                            <span className="text-sm font-semibold">{imagePendingLabel}</span>
-                                        </div>
-                                    )}
-                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
-                                    <div className="absolute bottom-6 left-6 text-white">
-                                        <h3 className="text-2xl font-bold mb-1">{feature.title}</h3>
-                                    </div>
-                                </div>
-
-                                <div className="p-8 flex-1 flex flex-col justify-between">
-                                    <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3">
-                                        {feature.description}
-                                    </p>
-                                    <button
-                                        onClick={() => openModal(feature)}
-                                        className="flex items-center text-primary font-semibold text-sm group-hover:translate-x-1 transition-transform cursor-pointer w-fit"
-                                    >
-                                        {viewMoreLabel} <ChevronRight className="w-4 h-4 ml-1" />
-                                    </button>
-                                </div>
-                            </motion.div>
-                        ))}
-                    </div>
-                </div>
-            </section>
+          <section className="grid gap-5 border-b border-neutral-200 pb-10 md:grid-cols-[220px_1fr]">
+            <div className="flex items-center gap-3">
+              <ClipboardCheck className="h-5 w-5 text-[#C69200]" />
+              <h2 className="text-sm font-black uppercase tracking-[0.16em] text-neutral-500">{copy.decisionsTitle}</h2>
+            </div>
+            <ol className="grid gap-3">
+              {copy.decisions.map((item, index) => (
+                <li key={item} className="grid grid-cols-[40px_1fr] items-start gap-3 border-b border-neutral-100 pb-3 last:border-b-0">
+                  <span className="text-sm font-black text-neutral-400">{String(index + 1).padStart(2, "0")}</span>
+                  <span className="text-base font-semibold leading-relaxed text-neutral-800 break-keep">{item}</span>
+                </li>
+              ))}
+            </ol>
+          </section>

-            <FeatureModal
-                isOpen={isModalOpen}
-                onClose={() => setIsModalOpen(false)}
-                feature={selectedFeature}
-            />
+          <section className="grid gap-5 md:grid-cols-[220px_1fr]">
+            <div className="flex items-center gap-3">
+              <ShieldCheck className="h-5 w-5 text-[#C69200]" />
+              <h2 className="text-sm font-black uppercase tracking-[0.16em] text-neutral-500">{copy.outcomesTitle}</h2>
+            </div>
+            <div className="grid gap-4 md:grid-cols-2">
+              {copy.outcomes.map((item) => (
+                <p key={item} className="rounded-md bg-neutral-950 px-5 py-5 text-sm font-semibold leading-relaxed text-white break-keep">
+                  {item}
+                </p>
+              ))}
+            </div>
+          </section>
+
+          <div className="flex flex-col gap-3 pt-4 sm:flex-row">
+            <Link
+              href="/customize"
+              className="inline-flex h-12 items-center justify-center gap-2 rounded-sm bg-[#FEBD16] px-6 text-sm font-black text-neutral-950 transition-colors hover:bg-[#E2A80F]"
+            >
+              {copy.ctaPrimary}
+              <ArrowRight className="h-4 w-4" />
+            </Link>
+            <Link
+              href="/support"
+              className="inline-flex h-12 items-center justify-center rounded-sm border border-neutral-300 px-6 text-sm font-black text-neutral-800 transition-colors hover:border-neutral-950 hover:text-neutral-950"
+            >
+              {copy.ctaSecondary}
+            </Link>
+          </div>
         </div>
-    );
+      </section>
+    </main>
+  );
 }
diff --git a/e2e/public-pages.spec.ts b/e2e/public-pages.spec.ts
index 506f075..c682e68 100644
--- a/e2e/public-pages.spec.ts
+++ b/e2e/public-pages.spec.ts
@@ -131,12 +131,13 @@ test.describe('Public page transition', () => {
   test('solution public page shows operational packages', async ({ page }) => {
     await page.goto('/solution');

-    await expect(page.getByRole('heading', { name: '공간 운영까지 설계합니다' })).toBeVisible();
-    await expect(page.getByRole('heading', { name: '안전하게 지키기' })).toBeVisible();
-    await expect(page.getByRole('heading', { name: '끊김 없이 연결하기' })).toBeVisible();
-    await expect(page.getByRole('heading', { name: '원격으로 제어하기' })).toBeVisible();
-    await expect(page.getByRole('heading', { name: '브랜드와 현장에 맞게 완성하기' })).toBeVisible();
-    await expect(page.getByText('해결하는 문제').first()).toBeVisible();
+    await expect(page.getByRole('heading', { name: '운영까지 준비된 모듈러 공간' })).toBeVisible();
+    await expect(page.getByRole('heading', { name: '안심 출입' })).toBeVisible();
+    await expect(page.getByRole('heading', { name: '끊김 없는 연결' })).toBeVisible();
+    await expect(page.getByRole('heading', { name: '원격 준비' })).toBeVisible();
+    await expect(page.getByRole('heading', { name: '현장 완성' })).toBeVisible();
+    await expect(page.getByText('옵션은 장식이 아니라 운영 리스크 관리입니다')).toBeVisible();
+    await expect(page.locator('img[src*="kr-security-realphoto.webp"]')).toBeAttached();
   });

   test('footer contains hidden admin link on True', async ({ page }) => {

```

## Relevant File Excerpts

Key implementation files:

- `app/solution/page.tsx`: new main solution option selection page with four generated images and customer-facing copy.
- `components/solution/SolutionTemplate.tsx`: new shared detail-page template for operation option details.
- `app/solution/cctv/page.tsx`: `안심 출입` data.
- `app/solution/network/page.tsx`: `끊김 없는 연결` data.
- `app/solution/iot/page.tsx`: `원격 준비` data.
- `app/solution/design/page.tsx`: `현장 완성` data.

The full code diff above includes these excerpts.

## Commands Run

```text
computer-use:list_apps
computer-use:get_app_state("com.apple.Stickies")
computer-use:get_app_state("com.google.antigravity-ide")
Chrome/ChatGPT visible web-control image generation via browser-client and page asset export
node -e with sharp conversion for final WebP assets
npx tsc --noEmit
npm run lint
npm test
npm run build
node .codex/qa/solution-renewal-20260609/capture.mjs
npx playwright test e2e/public-pages.spec.ts --project=chromium
git diff --check
```

## Test / Lint / Build Output

```text
npx tsc --noEmit: passed
npm run lint: passed (eslint . --max-warnings=0)
npm test: passed, 3 files and 20 tests
npm run build: passed; existing warning remains that Next middleware convention is deprecated in favor of proxy
npx playwright test e2e/public-pages.spec.ts --project=chromium: passed, 14 tests

git diff --check: passed
```

## Browser / Playwright / Visual Findings

Local visual QA was run against `http://localhost:3000` across desktop `1440x1100`, tablet `834x1112`, and mobile `390x844` for:

- `/solution`
- `/solution/cctv`
- `/solution/network`
- `/solution/iot`
- `/solution/design`

Summary JSON:

```json
[
  {
    "route": "/solution",
    "viewport": "desktop",
    "title": "운영 솔루션 | 위트(weet)",
    "h1": "운영까지 준비된 모듈러 공간",
    "overflowX": false,
    "scrollWidth": 1440,
    "clientWidth": 1440,
    "consoleErrors": [],
    "pageErrors": [],
    "badImgs": [],
    "generatedCount": 4,
    "oldRefs": [],
    "literalEscapes": false
  },
  {
    "route": "/solution/cctv",
    "viewport": "desktop",
    "title": "안심 출입 옵션",
    "h1": "무인 운영도 안심되게",
    "overflowX": false,
    "scrollWidth": 1440,
    "clientWidth": 1440,
    "consoleErrors": [],
    "pageErrors": [],
    "badImgs": [],
    "generatedCount": 1,
    "oldRefs": [],
    "literalEscapes": false
  },
  {
    "route": "/solution/network",
    "viewport": "desktop",
    "title": "끊김 없는 연결 옵션",
    "h1": "결제와 예약이 끊기지 않게",
    "overflowX": false,
    "scrollWidth": 1440,
    "clientWidth": 1440,
    "consoleErrors": [],
    "pageErrors": [],
    "badImgs": [],
    "generatedCount": 1,
    "oldRefs": [],
    "literalEscapes": false
  },
  {
    "route": "/solution/iot",
    "viewport": "desktop",
    "title": "원격 준비 옵션",
    "h1": "현장에 가지 않아도 준비되게",
    "overflowX": false,
    "scrollWidth": 1440,
    "clientWidth": 1440,
    "consoleErrors": [],
    "pageErrors": [],
    "badImgs": [],
    "generatedCount": 1,
    "oldRefs": [],
    "literalEscapes": false
  },
  {
    "route": "/solution/design",
    "viewport": "desktop",
    "title": "현장 완성 옵션",
    "h1": "상권과 브랜드에 어긋나지 않게",
    "overflowX": false,
    "scrollWidth": 1440,
    "clientWidth": 1440,
    "consoleErrors": [],
    "pageErrors": [],
    "badImgs": [],
    "generatedCount": 1,
    "oldRefs": [],
    "literalEscapes": false
  },
  {
    "route": "/solution",
    "viewport": "tablet",
    "title": "운영 솔루션 | 위트(weet)",
    "h1": "운영까지 준비된 모듈러 공간",
    "overflowX": false,
    "scrollWidth": 834,
    "clientWidth": 834,
    "consoleErrors": [],
    "pageErrors": [],
    "badImgs": [
      {
        "src": "http://localhost:3000/_next/image?url=%2Fimages%2Fcompany%2Fweet-logo.webp&w=3840&q=75",
        "alt": "위트(weet) 로고",
        "complete": false,
        "w": 0,
        "h": 0,
        "visible": true
      }
    ],
    "generatedCount": 4,
    "oldRefs": [],
    "literalEscapes": false
  },
  {
    "route": "/solution/cctv",
    "viewport": "tablet",
    "title": "안심 출입 옵션",
    "h1": "무인 운영도 안심되게",
    "overflowX": false,
    "scrollWidth": 834,
    "clientWidth": 834,
    "consoleErrors": [],
    "pageErrors": [],
    "badImgs": [],
    "generatedCount": 1,
    "oldRefs": [],
    "literalEscapes": false
  },
  {
    "route": "/solution/network",
    "viewport": "tablet",
    "title": "끊김 없는 연결 옵션",
    "h1": "결제와 예약이 끊기지 않게",
    "overflowX": false,
    "scrollWidth": 834,
    "clientWidth": 834,
    "consoleErrors": [],
    "pageErrors": [],
    "badImgs": [],
    "generatedCount": 1,
    "oldRefs": [],
    "literalEscapes": false
  },
  {
    "route": "/solution/iot",
    "viewport": "tablet",
    "title": "원격 준비 옵션",
    "h1": "현장에 가지 않아도 준비되게",
    "overflowX": false,
    "scrollWidth": 834,
    "clientWidth": 834,
    "consoleErrors": [],
    "pageErrors": [],
    "badImgs": [],
    "generatedCount": 1,
    "oldRefs": [],
    "literalEscapes": false
  },
  {
    "route": "/solution/design",
    "viewport": "tablet",
    "title": "현장 완성 옵션",
    "h1": "상권과 브랜드에 어긋나지 않게",
    "overflowX": false,
    "scrollWidth": 834,
    "clientWidth": 834,
    "consoleErrors": [],
    "pageErrors": [],
    "badImgs": [],
    "generatedCount": 1,
    "oldRefs": [],
    "literalEscapes": false
  },
  {
    "route": "/solution",
    "viewport": "mobile",
    "title": "운영 솔루션 | 위트(weet)",
    "h1": "운영까지 준비된 모듈러 공간",
    "overflowX": false,
    "scrollWidth": 390,
    "clientWidth": 390,
    "consoleErrors": [],
    "pageErrors": [],
    "badImgs": [
      {
        "src": "http://localhost:3000/_next/image?url=%2Fimages%2Fcompany%2Fweet-logo.webp&w=3840&q=75",
        "alt": "위트(weet) 로고",
        "complete": false,
        "w": 0,
        "h": 0,
        "visible": true
      }
    ],
    "generatedCount": 4,
    "oldRefs": [],
    "literalEscapes": false
  },
  {
    "route": "/solution/cctv",
    "viewport": "mobile",
    "title": "안심 출입 옵션",
    "h1": "무인 운영도 안심되게",
    "overflowX": false,
    "scrollWidth": 390,
    "clientWidth": 390,
    "consoleErrors": [],
    "pageErrors": [],
    "badImgs": [],
    "generatedCount": 1,
    "oldRefs": [],
    "literalEscapes": false
  },
  {
    "route": "/solution/network",
    "viewport": "mobile",
    "title": "끊김 없는 연결 옵션",
    "h1": "결제와 예약이 끊기지 않게",
    "overflowX": false,
    "scrollWidth": 390,
    "clientWidth": 390,
    "consoleErrors": [],
    "pageErrors": [],
    "badImgs": [],
    "generatedCount": 1,
    "oldRefs": [],
    "literalEscapes": false
  },
  {
    "route": "/solution/iot",
    "viewport": "mobile",
    "title": "원격 준비 옵션",
    "h1": "현장에 가지 않아도 준비되게",
    "overflowX": false,
    "scrollWidth": 390,
    "clientWidth": 390,
    "consoleErrors": [],
    "pageErrors": [],
    "badImgs": [],
    "generatedCount": 1,
    "oldRefs": [],
    "literalEscapes": false
  },
  {
    "route": "/solution/design",
    "viewport": "mobile",
    "title": "현장 완성 옵션",
    "h1": "상권과 브랜드에 어긋나지 않게",
    "overflowX": false,
    "scrollWidth": 390,
    "clientWidth": 390,
    "consoleErrors": [],
    "pageErrors": [],
    "badImgs": [],
    "generatedCount": 1,
    "oldRefs": [],
    "literalEscapes": false
  }
]
```

Manual screenshot review:

- Desktop `/solution`: premium editorial layout with four option rows; no text overlap; all images are option-focused.
- Mobile `/solution`: stacked cards fit without horizontal overflow; CTA text fits; footer/header do not overlap content.
- Mobile `/solution/cctv`: H1 changed from awkward wrapping to `무인 운영도 안심되게`; no clipped CTA; option tab row scrolls horizontally as intended.
- Desktop/mobile `/solution/design`: site-finish detail image and decision sections render without overlap.

QA note: the script intermittently reports the existing header logo image with `naturalWidth: 0` on tablet/mobile `/solution`, but the screenshots show the logo visibly rendered. Treat as likely measurement/timing artifact unless you see a code-level cause.

## Current Failures Or Risks

- No blocking local failure.
- The main product risk is whether the new copy/visual hierarchy is strong enough for a category-leading Korean mobile-home/company site and whether any detail pages still feel too abstract.
- Generated images are strong but still AI-generated; check for subtle realism, text/logos, or option relevance concerns.
- Production deploy and real-domain QA are not yet complete for this slice.
- Existing unrelated warning: Next `middleware` convention deprecation.

## Exact Review Questions

Please review as GPT-5.5 Pro with a strict Korean premium product/UX/code lens.

Focus on concrete issues only:

1. Are there any `MUST_FIX` defects in the new `/solution` main page or detail pages that would harm buyer trust, mobile readability, accessibility, responsiveness, or build/runtime reliability?
2. Do any generated image placements undermine the user's latest instruction that option images should emphasize the option, not the building?
3. Does the operations-first framing make sense for Korean customers considering mobile homes/modular commercial spaces, or is there a concrete copy/IA problem that should be fixed before deployment?
4. Are there any code-level regressions, broken links, metadata mismatches, missing tests, or likely Tailwind/Next issues visible in the diff?

Return exactly this structure:

```text
MARKER: WEET_REVIEW_20260609_SOLUTION_RENEWAL_05
VERDICT: PASS | MUST_FIX

MUST_FIX:
- ...

OPTIONAL:
- ...

RATIONALE:
- ...
```

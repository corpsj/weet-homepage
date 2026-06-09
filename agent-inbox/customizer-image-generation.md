# Customizer Image Generation And Asset Decisions

## Image Asset 4: ribbed-steel-white option modal image

- 사용 위치: `/customize` option info modal for `골강판 화이트` (`ribbed-steel-white`).
- 생성 방식: Chrome/ChatGPT visible web control, new ChatGPT chat, `최신 • 5.5`, `Thinking • 확장`, `이미지 만들기`, 16:9.
- 프롬프트 요약: 한국형 이동식주택 외벽 디테일 클로즈업, 밝은 화이트 세로 골강판, 코너 몰딩과 창호 일부, 낮 자연광, 사람/로고/글자 없음, 실사 카탈로그 사진.
- 생성 결과 파일: `public/images/customize/options/ribbed-steel-white.webp`
- 적용 여부: 적용 예정. Code-side option modal fallback will reference this asset path.
- 시각 판단: 외벽 골강판 질감과 흰색 마감이 주인공으로 보이고, 한국 전원 부지의 실사감이 있어 옵션 설명 이미지로 적합하다.

## Image Asset 5: zinc-gray option modal image

- 사용 위치: `/customize` option info modal for `징크 그레이` (`zinc-gray`).
- 생성 방식: Chrome/ChatGPT visible web control, new ChatGPT chat, `최신 • 5.5`, `Thinking • 확장`, `이미지 만들기`, 16:9.
- 프롬프트 요약: 한국형 이동식주택 외벽 디테일 클로즈업, 차분한 징크 그레이 메탈 패널, 세로 이음선, 창호와 코너 마감, 사람/로고/글자 없음, 실사 카탈로그 사진.
- 생성 결과 파일: `public/images/customize/options/zinc-gray.webp`
- 적용 여부: 적용 예정. Code-side option modal fallback will reference this asset path.
- 시각 판단: 징크 계열의 평활한 회색 패널과 창호 프레임이 분명하게 보여 외장 옵션 비교 이미지로 적합하다.

## Image Asset 6: cedar-point option modal image

- 사용 위치: `/customize` option info modal for `적삼목 포인트` (`cedar-point`).
- 생성 방식: Chrome/ChatGPT visible web control, new ChatGPT chat, `최신 • 5.5`, `Thinking • 확장`, `이미지 만들기`, 16:9.
- 프롬프트 요약: 한국형 이동식주택 외벽의 적삼목 세로 루버/포인트 패널, 코너와 현관 주변 마감, 창호 일부, 사람/로고/글자 없음, 실사 카탈로그 사진.
- 생성 결과 파일: `public/images/customize/options/cedar-point.webp`
- 적용 여부: 적용 예정. Code-side option modal fallback will reference this asset path.
- 시각 판단: 목재 루버의 색감과 결, 현관 포인트 조합이 뚜렷해서 프리미엄 외장 선택의 차이를 잘 설명한다.

## Image Asset 1: right-wall anchored compact floorplan SVG

- 사용 위치: `/customize` left floorplan stage and consultation modal floorplan preview.
- 기존 문제: Compact 3x6 base SVG가 right edge를 Standard 3x9와 공유하지 않아 3x6→3x9 전환이 좌향 확장보다 이미지 교체처럼 보일 수 있었다.
- 생성 목적: 새 AI 이미지를 만들지 않고 기존 floorplan source SVG를 제품 이해에 맞게 정렬한다.
- 프롬프트: 사용하지 않음. 기존 SVG geometry를 직접 수정함.
- 생성 결과 파일: `public/images/customize/compact-3x6-base.svg`
- 적용 여부: 적용함.
- 적용 파일: `public/images/customize/compact-3x6-base.svg`, `components/customize/CustomizeConfigurator.tsx`
- 미적용 시 사유: 해당 없음.
- 검증 결과: E2E에서 compact footprint `x=400 width=600`, standard footprint `x=100 width=900`, rail `6m/9m`, base image 1개, fallback footprint 0개를 확인함.

## Image Asset 2: generated lifestyle/customizer reference image

- 사용 위치: 미정.
- 기존 문제: 현재 customizer의 주요 이해 과제는 lifestyle 분위기보다 floorplan, 포함/유상/상담 구분, 상담 정보 목적 설명이다.
- 생성 목적: 고객 이해를 실제로 높이는 visual asset이 필요한지 판단한다.
- 프롬프트: 생성하지 않음.
- 생성 결과 파일: 없음.
- 적용 여부: 미적용.
- 적용 파일: 없음.
- 미적용 시 사유: 현재 slice는 existing floorplan SVG가 실제 제품 이해에 더 직접적이며, user instruction상 프로젝트 UI/reference image generation은 Chrome/ChatGPT web control로 해야 한다. 첫 Pro review와 visual QA에서는 새 raster image가 필수로 보이지 않았다.
- 검증 결과: `.codex/qa/customizer-implementation-20260607-profix/` screenshots에서 floorplan-first structure가 충분히 설명력을 갖는지 확인함.

## Image Asset 3: future optional product-context visual

- 사용 위치: `상담 신청` step 또는 future model recommendation accordion.
- 기존 문제: 제품 설치 환경, 운반/크레인 조건, 실내 사용감을 텍스트만으로 설명하면 초보 고객이 상상하기 어려울 수 있다.
- 생성 목적: 필요 시 실제 이동식주택 설치/진입/생활 장면을 보조하는 bitmap reference를 만든다.
- 프롬프트: 생성 전 GPT-5.5 Pro image plan/review 필요.
- 생성 결과 파일: 없음.
- 적용 여부: 미적용.
- 적용 파일: 없음.
- 미적용 시 사유: 현재 completion 조건에서 핵심 MUST_FIX는 구조/도면/옵션/모달 copy였고, 새 이미지가 없을 때도 tests와 visual QA가 통과했다.
- 검증 결과: 후속 생성 시 PC/tablet/mobile screenshot, image clarity, no text overlap, no decorative-only usage를 확인해야 함.
- 2026-06-09 22:58 KST: ChatGPT image generation for `basic-window` was sent visibly in Chrome with image mode/확장 active, but the generation card remained at `이미지 생성 중…` for multiple polling passes. Chrome extension DOM reads and navigation timed out; Computer Use Chrome click attempts then returned inactive-session/cgWindowNotFound errors. No duplicate prompt was sent and no asset was saved for `basic-window`.

## 2026-06-10 00:34 KST completion fallback for option modal images

- Final generated-through-ChatGPT option assets currently present under `public/images/customize/options/`: `ribbed-steel-white`, `zinc-gray`, `cedar-point`, `basic-window`, `extra-window`, `wide-window`, `standard-lock`, `smart-lock`, `paper-wall`, `silk-wallpaper`, `birch-panel`, `spc-white-oak`, `spc-natural-oak`, `porcelain-tile`, `basic-sink`, `built-in-fridge`, `basic-bathroom`, `bidet`, `dry-vanity`, `built-in-storage`, `folding-table`.
- Temporary fallback assets were copied so option modals do not render blank image slots while Chrome/ChatGPT generation is unstable:
  - `mini-washer.webp` uses `basic-bathroom.webp` temporarily.
  - `bed-frame.webp` uses `public/images/modular/generated/interior-comfort.webp` temporarily.
  - `solar-panel.webp` uses `public/images/modular/generated/modular-hero.webp` temporarily.
  - `ess.webp` uses `public/images/modular/generated/factory-precision.webp` temporarily.
  - `ev-charger.webp` uses `public/images/modular/generated/transport-install.webp` temporarily.
  - `iot-package.webp` uses `public/images/solution/generated/kr-control-realphoto.webp` temporarily.
  - `security-package.webp` uses `public/images/solution/generated/kr-security-realphoto.webp` temporarily.
  - `satellite-internet.webp` uses `public/images/solution/network_bridge.webp` temporarily.
  - `cellular-router.webp` uses `public/images/solution/generated/kr-network-realphoto.webp` temporarily.
- Chrome recovery attempt: the Chrome extension could list open tabs, but claiming or screenshotting the ChatGPT tab timed out at 45-60 seconds and reset the Node browser-control session twice. No duplicate image prompt was sent after the timeout.
- Required follow-up: regenerate the 9 temporary fallback assets one at a time through Chrome/ChatGPT visible web control with `최신 • 5.5`, Thinking `확장`, `이미지 만들기`, photorealistic Korean context, then overwrite the temporary files.
- Visual evidence: `.codex/qa/current/customize-options-contact.webp` shows all 30 option modal image files in one contact sheet. The temporary fallbacks avoid broken UI but are not final-quality option-specific imagery.

## 2026-06-10 01:37 KST final replacement for 9 temporary option images

- Stickies steering: visible note said `크롬 고쳤어. 다시 테스트 시작해`, so Chrome/ChatGPT image generation was retried instead of keeping fallbacks.
- Generation rule followed: Chrome/ChatGPT visible web control, fresh chat per option run, `최신 • 5.5`, `Thinking • 확장`, `이미지 만들기`, one prompt per option, no local image generation.
- Replaced final files:
  - `public/images/customize/options/mini-washer.webp`: compact built-in washer in a Korean modular utility/bath alcove.
  - `public/images/customize/options/bed-frame.webp`: built-in bed platform with visible under-bed drawer storage.
  - `public/images/customize/options/solar-panel.webp`: rooftop solar panels with mounting/cable detail in a Korean rural setting.
  - `public/images/customize/options/ess.webp`: white home power backup cabinet and inverter/control box in a utility closet.
  - `public/images/customize/options/ev-charger.webp`: wall-mounted EV charger and cable beside a modular home parking bay.
  - `public/images/customize/options/iot-package.webp`: smart switches, thermostat, wall sensor, and tablet in a compact Korean interior.
  - `public/images/customize/options/security-package.webp`: smart lock, CCTV, sensor light, and entry-wall security detail.
  - `public/images/customize/options/satellite-internet.webp`: satellite antenna/dish, bracket, and cable routing on a Korean rural modular home.
  - `public/images/customize/options/cellular-router.webp`: wireless router with antennas, LAN cables, and low-voltage cabinet.
- Retry notes:
  - Initial `ess` and `iot-package` prompts with more abstract technical wording stalled with `더욱 자세한 이미지를 생성하고 있습니다`; no image asset was saved from those attempts.
  - `cellular-router` first prompt also ended without a new image; the second, simpler router/antenna prompt generated successfully.
  - ChatGPT repeatedly restored a stray `스티커 좀 봐줘` draft in fresh chats; Codex cleared the composer before every send and only sent after verifying empty/expected draft, image mode, Thinking expanded, no Pro, no deep research, and enabled Send.
- Visual evidence: regenerated contact sheet saved to `.codex/qa/current/customize-options-contact.webp`; all 30 option image files render and the 9 replaced assets are option-specific.

## 2026-06-10 01:54 KST option modal render fix

- Stickies steering changed to: generate images through parallel tabs when needed, and treat image runs stalled for 5+ minutes as retry candidates after refresh or explicit failure recording.
- Visual QA found that option modal image areas rendered as blank beige boxes even though the new `.webp` files existed.
- Root cause: `next/image` wrapped cache-busted public image paths such as `/images/customize/options/iot-package.webp?v=20260610-0137` into `/_next/image?...`, and the optimizer returned HTTP 400. The modal `onError` then hid the image.
- Fix: add `unoptimized` to the option modal `Image` component so the browser loads the public option asset directly while keeping the version query for cache invalidation.
- Validation evidence:
  - `curl -I /_next/image?...iot-package...` returned 400 before the fix, while the direct public image URL returned 200.
  - `.codex/qa/current/desktop-modal-iot-package-fixed.png` visually shows the IoT image rendered.
  - `.codex/qa/current/visual-summary.json` now reports 23/23 currently visible option modals with matching versioned image URLs, nonzero natural dimensions, no placeholder text, and no horizontal overflow.

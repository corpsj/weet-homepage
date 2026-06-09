# Solution Renewal Image Assets

## 2026-06-09 final assets

Generation rule followed: Chrome/ChatGPT visible web control, new chat per image, `최신 • 5.5`, `Thinking • 확장`, `이미지 만들기`, 16:9, one image per option. A temporary `Pro 확장 모드` state appeared in one new chat and was corrected back to `Thinking • 확장` before any prompt was sent.

Final files:

- `public/images/solution/generated/kr-security-realphoto.webp`
  - Purpose: `안심 출입` option.
  - Final prompt direction: Korean real-site close-up of CCTV, sensor light, smart lock, conduit, and entrance detail; building full view forbidden.
  - Visual judgment: passes Stickies steering because option equipment is the visual subject and the modular building is only partial context.
- `public/images/solution/generated/kr-network-realphoto.webp`
  - Purpose: `끊김 없는 연결` option.
  - Final prompt direction: Korean roadside modular cafe interior with POS, router, LAN cables, and network cabinet; text/logos forbidden.
  - Visual judgment: passes because POS and network equipment dominate the frame.
- `public/images/solution/generated/kr-control-realphoto.webp`
  - Purpose: `원격 준비` option.
  - Final prompt direction: Korean modular interior detail with smart switches, temperature control, HVAC/door context, and blurred phone UI.
  - Visual judgment: passes because smart-control hardware and operation detail are the frame subject.
- `public/images/solution/generated/kr-brandfit-realphoto.webp`
  - Purpose: `현장 완성` option.
  - Final prompt direction: Korean commercial modular entrance detail with blank sign frame, exterior finish, deck, planting, drainage, and local road context.
  - Visual judgment: passes because facade/sign/deck/site-finish details explain the option.

Rejected or superseded assets:

- Earlier generated `kr-security-realphoto.webp` showing a larger full modular building was overwritten after Stickies steering said option images must emphasize the option rather than the house.
- Earlier batch/contact-sheet image generation attempt is rejected and unused because the user clarified not to generate many images in one batch.
- Earlier first-pass generated solution images are superseded by the final option-focused files above.

QA evidence:

- Final local visual QA screenshots and summary: `.codex/qa/solution-renewal-20260609/`.
- The QA summary reports `/solution` and all four detail routes load the generated images, have no old solution image references, no literal `00a0`, no horizontal overflow, and no console/page errors on desktop, tablet, and mobile.

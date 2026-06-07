# ChatGPT Pro Review Procedure

## Two-Track Chrome/ChatGPT Harness

Use one Chrome ChatGPT tab by default, but start a new chat for every separate run.

All Chrome/ChatGPT verification must pair DOM/text checks with visual analysis. When a report, generated image, modal, composer, or download UI is visible, inspect screenshots or visible DOM/accessibility output as a human-facing surface. Do not conclude that a response is empty or complete from ordinary DOM text alone if the screen may show a special report card, iframe, image viewer, or generated artifact.

This is required because ChatGPT preserves the last composer mode:

- after image generation, the composer can remain in `이미지 만들기` mode
- after Deep Research, the composer can remain in `심층 리서치` mode
- after model changes, the compact model button can show only `확장`, `Pro`, or `Thinking`
- image viewer dialogs can remain open after saving unless explicitly closed

Default policy:

1. Claim the existing Chrome ChatGPT tab.
2. If any generation is still active, wait; do not click `새 채팅` while an active run may still be producing output.
3. If an image viewer dialog is open, close it with `전체 화면 닫기` before starting anything else.
4. Click `새 채팅` before every new Pro Research run or Thinking Image run.
5. After `새 채팅`, prove the composer is empty, ChatGPT is not generating, and no modal/menu/upload/error blocks the composer.
6. Apply the task-specific harness from scratch:
   - Pro Research: `최신 • 5.5` + `Pro • 확장` + `심층 리서치`
   - Image Generation: `최신 • 5.5` + Thinking/Pro `확장` + `이미지 만들기`
7. Never assume the previous run's mode is still correct. Always re-confirm model and action chips from read-only DOM evidence before sending.

Two tabs are allowed only when real parallelism is needed, such as monitoring a long Pro Research run while generating an image. In that case, name/track each tab by visible title and URL, and never send into a tab until its current conversation and composer state are proven.

Use this procedure for Chrome-based GPT Pro validation.

1. Open or claim the ChatGPT tab in Chrome, then click `새 채팅` for this run unless an active generation must be allowed to finish first.
2. Open the model dropdown.
3. Click `구성…`.
4. In `인텔리전스`, select model option `Pro 리서치급 인텔리전스`.
5. Open `Pro 생각 강도` and select `확장`.
6. Close the configuration dialog.
7. Confirm the composer model button shows `Pro` or `Pro 확장 모드`.
8. Click the composer-left `+` button labeled `파일 추가 및 기타`.
9. Select `심층 리서치`.
10. Confirm the composer shows a `심층 리서치` chip and `Pro`.
11. Before sending, confirm the composer is empty or contains only the intended prompt, no generation is active, and the send button is enabled.
12. Paste prompts through the clipboard rather than inline typing. Inline newline entry can send early or distort the draft.
13. Send with the `프롬프트 보내기` button after confirming the draft.
14. Deep Research can take a long time. After sending, wait patiently until generation is complete.
15. Treat the response as incomplete while any of these are true: `답변 중지` is visible, status text says the model is thinking/researching, a plan/report iframe is still updating, the assistant response is empty or implausibly short, or the expected marker/verdict is missing.
16. Poll with read-only DOM evidence rather than repeated clicks. A reasonable polling interval is 30-60 seconds for normal progress, with longer waits for large review packets.
17. Do not retry or resend while a prior Deep Research request may still be running. Duplicate sends are worse than waiting.
18. Save `.codex/pro-review.md` only after the response is not generating, marker-matched when a marker was provided, and plausible.
19. If the user explicitly says they manually stopped or cancelled the Deep Research run, accept that explanation and record the run as user-stopped rather than treating it as a browser failure.

Observed multiline paste result on 2026-06-07 KST:

- Clipboard paste preserved the intended message content and did not send early.
- ChatGPT may render extra blank lines in `contenteditable`; the user approved this as acceptable.
- Successful test was sent with `심층 리서치` active and model `Pro` after selecting `Pro 생각 강도: 확장`.
- Deep Research should be allowed enough time to finish; waiting is part of the required procedure.
- The 2026-06-07 multiline paste test was manually stopped by the user after successful send.

Test prompt:

```text
안
녕
하
세
요

감
사

합
니


다
```

## ChatGPT GPT-5.5 Thinking Image Generation Procedure

Use this procedure when the user asks Codex to generate an image through Chrome/ChatGPT rather than the local image tool.

1. Open or claim the ChatGPT tab in Chrome, then click `새 채팅` for this run unless an active generation must be allowed to finish first.
2. Start from a safe composer state: no active generation, no modal blocking the composer, and an empty composer.
3. Open the model/configuration menu and confirm the image run uses the GPT-5.5 expanded harness: `최신 • 5.5` plus Thinking/Pro `확장`. If another model is active, configure the model before continuing.
4. Click the composer-left `+` button labeled `파일 추가 및 기타`.
5. Select `이미지 만들기`.
6. Confirm the composer changed to image mode:
   - an `이미지` chip/button appears
   - the placeholder changes to `이미지 묘사 또는 편집`
   - image controls such as aspect ratio (`자동`) and `스타일` appear
7. Re-confirm the model after enabling image mode. In observed UI, selecting `이미지 만들기` can switch the visible model control; reopen the model menu if needed and verify `최신 • 5.5` plus Thinking/Pro `확장` is still active.
8. Write a detailed image prompt before pasting. Image quality depends heavily on prompt specificity; do not send vague prompts such as `make a nice house image`.
9. Always include the key production specs in the prompt:
   - aspect ratio: for example `square 1:1`, `landscape 16:9`, `portrait 9:16`, or `wide hero 21:9`
   - resolution/quality intent: for example `4K`, `ultra high detail`, `sharp focus`, `production-ready`
   - subject and setting: what the image is about, where it is, and what time/season/weather applies
   - composition: camera angle, framing, foreground/midground/background, negative space, product placement
   - lens/camera feel: for example `architectural product photography`, `35mm lens`, `low-angle hero shot`, `drone view`, or `macro detail`
   - lighting: for example `soft dawn light`, `golden hour`, `overcast diffused light`, `cinematic interior glow`
   - material/style details: surface textures, colors, finishes, atmosphere, brand mood, realism level
   - constraints/negative requirements: for example `no people`, `no text`, `no logos`, `no watermark`, `avoid distorted geometry`
10. Prefer a structured prompt shape:

```text
Create a <aspect ratio> <resolution/quality> image of <main subject>.
Scene: <location, time, weather, mood>.
Composition: <camera angle, framing, foreground/midground/background, negative space>.
Visual style: <photography/illustration/rendering style, lens/camera feel>.
Lighting and color: <lighting, palette, contrast>.
Details: <materials, textures, important objects, product features>.
Constraints: <no text, no watermark, no people, avoid artifacts, etc.>.
```

11. Example strong prompt:

```text
Create a landscape 16:9, 4K, ultra high detail architectural product photograph of a compact mobile cabin studio parked at the edge of a pine forest.
Scene: early dawn, light mist over stone ground, quiet premium showroom mood, no people.
Composition: three-quarter front view from a low 35mm lens angle, cabin centered slightly right, warm interior glow visible through large glass panels, forest silhouettes in the background, clean negative space on the left for possible website hero copy.
Visual style: realistic premium architectural photography, sharp focus, natural proportions, refined product-led composition.
Lighting and color: soft blue-gray dawn light outside, warm amber interior light, restrained charcoal, stone gray, muted wood, subtle yellow accents.
Details: black metal trailer frame, clear glass reflections, fine condensation on glass, textured stone path, pine needles, minimal modern furniture visible inside.
Constraints: no text, no logo, no watermark, no people, no distorted wheels, no impossible structure, avoid cartoon style.
```

12. Paste the image prompt through the clipboard into the visible `contenteditable` composer.
13. Before sending, verify from read-only DOM evidence:
   - the draft prompt is exactly the intended prompt
   - the `이미지` chip is still active
   - `최신 • 5.5` plus Thinking/Pro `확장` is selected
   - no modal, upload state, or generation blocks sending
   - exactly one `프롬프트 보내기` button is enabled
14. Click `프롬프트 보내기`.
15. Poll with read-only DOM evidence until the wait text such as `더욱 자세한 이미지를 생성하고 있습니다. 잠시만 기다려 주세요.` disappears and a generated image element appears.
16. Confirm the generated image element has a real size, such as `naturalWidth` and `naturalHeight` greater than zero.
17. Click the generated image to open the image viewer dialog.
18. In the image viewer, click the top-right `저장` button.
19. Do not rely only on the browser automation `download` event. On 2026-06-07 KST, clicking `저장` timed out while waiting for a download event, but the file still appeared in `~/Downloads`.
20. Check `~/Downloads` for a recent image file with a name like `ChatGPT Image <date>.png`.
21. Copy the downloaded file into the project folder, for example:

```bash
mkdir -p .codex/generated-images
cp "$HOME/Downloads/<downloaded ChatGPT image>.png" .codex/generated-images/<descriptive-name>.png
file .codex/generated-images/<descriptive-name>.png
ls -lh .codex/generated-images/<descriptive-name>.png
```

22. Verify the copied file is a real image, not a denied JSON response. A failed direct CLI fetch may produce a tiny JSON file such as `{"detail":"File stream access denied."}` because ChatGPT image URLs require the browser session.
23. After the file is copied and verified, close the image viewer with `전체 화면 닫기`.
24. Confirm no image viewer dialog remains open.

Observed successful test on 2026-06-07 KST:

- Model: `Thinking • 확장`.
- Action: `+` > `이미지 만들기`.
- Prompt: `Create one square image: a serene dawn scene of a tiny mobile greenhouse studio on wheels, parked beside a quiet pine forest. Warm interior lights glow through glass panels, mist over stone ground, premium architectural product photography style, no people, no text, high detail.`
- Generated image DOM evidence: `1254 x 1254` image with alt text `생성된 이미지: 안개 낀 숲속의 유리 집`.
- Downloaded Chrome file: `~/Downloads/ChatGPT Image 2026년 6월 7일 오전 04_01_35.png`.
- Project copy: `.codex/generated-images/chatgpt-thinking-greenhouse-studio.png`.
- Verified file: PNG image data, `1254 x 1254`, about `2.3M`.

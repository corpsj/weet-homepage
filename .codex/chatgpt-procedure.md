# ChatGPT Pro Review Procedure

Use this procedure for Chrome-based GPT Pro validation.

1. Open or claim the ChatGPT tab in Chrome.
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

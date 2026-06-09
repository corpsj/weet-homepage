# GPT Pro Review Failure Notes

This file records Chrome/ChatGPT review failures so future agents can avoid repeating unsafe or ineffective sends.

## 2026-06-09 public renewal attempt 1

- Marker: `WEET_REVIEW_20260609_PUBLIC_RENEWAL_01`
- Chrome evidence before send:
  - Direct `https://chatgpt.com/deep-research` surface was used.
  - DOM showed `최신 • 5.5`, `Thinking • 확장`, `Pro • 확장`, and the `심층 리서치` chip.
  - Long packet paste was converted into `붙여넣은 마크다운(1).md`.
  - A short inline prompt contained marker `WEET_REVIEW_20260609_PUBLIC_RENEWAL_01`, the expected markdown attachment remained, and `프롬프트 보내기` was enabled.
- Failure:
  - Deep Research completed, but the report only extracted the two marker/template occurrences from the attachment instead of reviewing the code, UX, visual QA, or risks.
  - The visible report began: "요청한 마커는 문서에서 2회 확인되었습니다..." and did not provide a valid `VERDICT`, `MUST_FIX`, `OPTIONAL`, or `RATIONALE`.
  - `.codex/pro-review.md` was not updated.
- Retry guidance:
  - Per updated Stickies steering, retry in a fresh normal ChatGPT chat with `최신 • 5.5` and `Pro 확장`; do not enable `심층 리서치`.
  - Use a much shorter inline packet.
  - Put the instruction before the packet: "Do not extract or summarize the packet; act as a product/UX/code reviewer and produce a verdict."
  - Avoid a file attachment if possible; if ChatGPT creates a pasted markdown tile, click `텍스트 필드에 표시` before sending or reduce the prompt further.

## 2026-06-07 current slice attempt 1

- Marker: `WEET_AUDIT_REVIEW_20260607_ADMIN_CUSTOMIZE_SLICE_01`
- Chrome evidence before send:
  - New chat opened.
  - Model menu showed `최신 • 5.5`.
  - `Pro • 확장` was checked.
  - Composer-left `+` menu `심층 리서치` was selected and the composer showed the `심층 리서치` chip.
  - A short marker prompt was present.
  - One expected review packet attachment remained after a duplicate markdown tile was removed.
- Failure:
  - Long review packet paste was converted by ChatGPT into `붙여넣은 마크다운(1).md` instead of staying inline.
  - After send, Chrome showed a static empty loading bar for several minutes.
  - Visible DOM and screenshots showed no assistant response, no `답변 중지` button, and no marker-matched output.
  - `.codex/pro-review.md` was not updated.
- Retry guidance:
  - Retry only once in a fresh `새 채팅`.
  - Reconfirm `최신 • 5.5`, checked `Pro • 확장`, and `심층 리서치` from DOM evidence.
  - Prefer a shorter inline packet or click `텍스트 필드에 표시` on a pasted markdown tile before sending if ChatGPT creates a file tile.
  - Do not resend inside the same stalled conversation unless a clear latest-user-turn/marker-safe retry condition is established.

## 2026-06-07 current slice attempt 2

- Marker: `WEET_AUDIT_REVIEW_20260607_ADMIN_CUSTOMIZE_SLICE_01`
- Chrome evidence before send:
  - Fresh `새 채팅` opened.
  - Model menu showed `최신 • 5.5`.
  - `Pro • 확장` was checked.
  - Composer-left `+` menu `심층 리서치` was selected and the composer showed the `심층 리서치` chip.
  - The packet was a 3,205-character inline condensed prompt, not a file attachment.
  - DOM evidence confirmed marker in the composer, no attachments, and enabled `프롬프트 보내기`.
- Failure:
  - After send, the conversation URL was created and `답변 중지` appeared briefly.
  - After roughly 3 minutes of read-only polling/screenshots, `답변 중지` disappeared but the assistant area remained a static empty loading bar.
  - Visible DOM did not contain the marker, `MUST_FIX`, `OPTIONAL`, `VERDICT`, `PASS`, or `REVISE`.
  - `.codex/pro-review.md` was not updated.
- Conclusion:
  - Current Chrome/ChatGPT Deep Research review path failed twice for this slice.
  - Future agents should not assume this slice has a valid Pro review unless `agent-inbox/pro-review.md` is manually supplied or a future marker-matched response is obtained.

## 2026-06-07 delayed report card discovery

- Later Chrome/ChatGPT Deep Research home showed report cards for marker `WEET_AUDIT_REVIEW_20260607_ADMIN_CUSTOMIZE_SLICE_01` with snippets containing `MUST_FIX`.
- Opening `/c/6a24794f-539c-8321-a390-62c6d97f1b33` showed the original user prompt and a collapsed/empty assistant iframe/loading bar, not a complete extractable response.
- `응답 복사` returned an empty clipboard and iframe body text was empty, so `.codex/pro-review.md` was still not saved.
- One visible report-card snippet raised a concrete issue: suppressing `model-footprint` solely because `floorplanImagePath` exists can hide fallback if the image path is broken. This was treated as a local verification lead and fixed with model-specific placeholder replacement plus image-load fallback.
- New inbox instruction `agent-inbox/gpt프로 심층리서치 대기.md` says to refresh if Deep Research shows only an empty loading bar after send; if still blank or refresh fails, close the tab and reconnect to ChatGPT.

## 2026-06-07 customize floorplan confidence attempt 3

- Marker: `WEET_REVIEW_20260607_CUSTOMIZE_FLOORPLAN_CONFIDENCE_03`
- Chrome evidence before send:
  - Fresh `새 채팅` opened.
  - Composer-left `+` menu `심층 리서치` was selected and the composer showed the `심층 리서치` chip.
  - Model menu showed `최신 • 5.5`.
  - `Pro • 확장` was checked.
  - Long packet paste initially created two file tiles; duplicate tile was removed and the remaining tile was converted with `텍스트 필드에 표시`.
  - DOM evidence confirmed inline composer length about 13,236 characters, marker present, no markdown/file tile, no `답변 중지`, and enabled `프롬프트 보내기`.
- Failure:
  - After send, conversation URL became `https://chatgpt.com/c/6a24e7fb-45c8-8323-adb7-a48fc92876d1` and `답변 중지` appeared, then disappeared after about 60 seconds.
  - Assistant response area remained an iframe/empty loading bar; no extractable assistant text was present.
  - Following `agent-inbox/gpt프로 심층리서치 대기.md`, the conversation was refreshed. The response still appeared as an iframe/empty loading bar.
  - The blank tab was closed and ChatGPT was reopened.
  - `.codex/pro-review.md` was not saved because no complete marker-matched assistant response was extractable.

## 2026-06-07 admin console slice attempt 4

- Marker: `WEET_REVIEW_20260607_ADMIN_CONSOLE_SLICE_04`
- Chrome evidence before send:
  - Fresh `새 채팅` was clicked.
  - Model menu showed `최신 • 5.5`.
  - `Pro • 확장` was checked.
  - Composer-left `+` menu `심층 리서치` was selected and the composer showed the `심층 리서치` chip.
  - The long review packet paste became one `붙여넣은 텍스트 (1).txt` tile; `텍스트 필드에 표시` did not convert it inline.
  - A short inline marker prompt was added, with one expected attachment tile and enabled `프롬프트 보내기`; no `답변 중지` was visible before send.
- Failure:
  - After send, conversation URL became `https://chatgpt.com/c/6a24f4b6-b610-8320-b8f1-a949bad16634` and `답변 중지` appeared.
  - After about 60 seconds, `답변 중지` disappeared but the assistant response area contained only an iframe/empty loading state with no `VERDICT:` output.
  - Following `agent-inbox/gpt프로 심층리서치 대기.md`, the conversation was refreshed; the iframe/empty response persisted.
  - Screenshot evidence saved to `.codex/chatgpt-admin-console-review-poll1.png` and `.codex/chatgpt-admin-console-review-after-refresh.png`.
  - The blank tab was closed. `.codex/pro-review.md` was not saved.

## 2026-06-07 admin console slice attempt 5

- Marker: `WEET_REVIEW_20260607_ADMIN_CONSOLE_SLICE_04`
- Chrome evidence before send:
  - A direct `https://chatgpt.com/deep-research` surface was used after the normal `새 채팅` flow repeatedly mixed the old failed conversation with the new composer.
  - Model menu showed `최신 • 5.5`.
  - `Pro • 확장` was checked.
  - The Deep Research composer was on `/deep-research` and showed the research surface.
  - The composer initially contained an unrelated saved draft (`야. 컴퓨터유즈,웹제어.md 파일 봐봐.`); it was cleared and replaced with the intended inline prompt.
  - DOM evidence confirmed marker `WEET_REVIEW_20260607_ADMIN_CONSOLE_SLICE_04`, no attachment tiles, no `답변 중지`, and enabled `프롬프트 보내기`.
- Failure:
  - After send, conversation URL became `https://chatgpt.com/c/6a24f737-4018-83a7-b9a7-b6ca18f83440` and `답변 중지` appeared briefly.
  - After about 65 seconds, `답변 중지` disappeared but the conversation contained only the user message; the only `VERDICT:` text was from the requested output template in the prompt.
  - The assistant section was empty (`ChatGPT의 말:` with no response text). Refresh did not recover output.
  - A new tab reopened the same conversation and inspected `.qMYqUG_convSearchResultHighlightRoot` plus download/report-like controls; it still contained only the user message and no downloadable research result.
  - `.codex/pro-review.md` was not saved because no complete marker-matched assistant response was available.
- Additional tool-control issue:
  - New inbox instruction `agent-inbox/작업도중스티어링.md` required checking the macOS Stickies app. `open -a Stickies` succeeded, but Computer Use `get_app_state("Stickies")` timed out twice after 120 seconds, so Stickies content could not be read.
- Conclusion:
  - Admin console slice now has two failed Chrome/Deep Research review attempts (`attempt 4` and `attempt 5`) without a usable Pro response.
  - Per `codex-loop.md`, do not save `.codex/pro-review.md` from either attempt and do not treat the visible report-card snippets as a valid Pro verdict.

## 2026-06-07 admin console slice report recovery

- The apparent empty assistant response was a false negative caused by reading only ordinary assistant message DOM.
- The completed Deep Research report was visible in the Chrome tab as a special report card. It was exposed by `dom_cua.get_visible_dom()`, not by `[data-message-author-role="assistant"]`.
- Visible DOM exposed `내보내기`, `내용 복사`, `마크다운으로 내보내기`, `Word로 내보내기`, `PDF로 내보내기`, and a report text node beginning `VERDICT: PASS`.
- Clicking `마크다운으로 내보내기` did not trigger a Playwright download event but silently created `~/Downloads/deep-research-report (1).md`.
- The markdown report was copied to `.codex/pro-review.md`.
- Correct future procedure is documented in `agent-inbox/tool-control-runbook.md`.
## 2026-06-09 solution renewal oversized packet

- Marker attempted: `WEET_REVIEW_20260609_SOLUTION_RENEWAL_05`.
- Chrome/ChatGPT setup was verified as normal chat, `최신 • 5.5`, `Pro 확장 모드`, with no image or deep-research composer chip.
- `.codex/review-packet.md` was pasted as one large markdown attachment. A duplicate attachment appeared during paste retry; Codex removed the second attachment before sending.
- After send, ChatGPT displayed `문서 읽는 중` and then `답변 마무리 중`, but the tab became too heavy for Chrome extension DOM/screenshot reads and AppleScript window reads. No marker-matched `VERDICT` could be recovered.
- Decision: treat this as an invalid/incomplete review attempt, keep the failed chat untouched, and retry in a fresh ChatGPT tab with a smaller marker `WEET_REVIEW_20260609_SOLUTION_RENEWAL_06` while preserving the full local review packet on disk.

## 2026-06-09 solution renewal slim retry

- Marker attempted: `WEET_REVIEW_20260609_SOLUTION_RENEWAL_06`.
- Chrome/ChatGPT setup was verified as normal chat, `최신 • 5.5`, `Pro 확장 모드`, with no image mode and no deep-research composer chip.
- `.codex/review-packet-slim.md` was pasted through the clipboard and became one `붙여넣은 텍스트 (1).txt` attachment. The send button was enabled and exactly one attachment was present before send.
- After send, ChatGPT produced only a short visible line equivalent to “파일과 내용을 검토해야 할 것 같아요.” with no marker-matched `VERDICT`.
- Codex sent a short same-conversation follow-up asking it to review the attached file and return marker `WEET_REVIEW_20260609_SOLUTION_RENEWAL_06`; the follow-up was sent once and then remained stuck for several minutes at `Pro 생각 중` / `답변 중지` with no extractable assistant response.
- `.codex/pro-review.md` was not overwritten because no complete plausible solution-renewal review was available. The existing `.codex/pro-review.md` is an older header CTA review and must not be treated as review coverage for this slice.
- Decision: per `codex-loop.md` failure handling, record the second browser review failure explicitly and continue with commit/push/deployment using the already-passing local validation and visual QA evidence.

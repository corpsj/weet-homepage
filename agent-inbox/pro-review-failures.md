# GPT Pro Review Failure Notes

This file records Chrome/ChatGPT review failures so future agents can avoid repeating unsafe or ineffective sends.

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

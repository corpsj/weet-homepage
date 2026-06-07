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

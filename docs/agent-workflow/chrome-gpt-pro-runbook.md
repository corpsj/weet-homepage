# Chrome GPT Pro Review Runbook

Use this runbook when external review depends on the user's logged-in Chrome or ChatGPT state.

## Goal

Send exactly one complete review packet to the intended GPT Pro review surface, wait for a plausible marker-matched response, save it, and avoid duplicate sends.

## Before Sending

Prepare `.codex/review-packet.md` first. It must contain all repository, diff, command, validation, and visual evidence needed by a reviewer with no local access.

Use a unique marker, for example:

```text
REVIEW_MARKER_<PROJECT>_<TASK>_<YYYYMMDD>_<NN>
```

Before typing, uploading, sending, or retrying, prove from read-only DOM evidence, watcher state, or visible screenshot evidence that:

- the target conversation matches the job
- the composer is empty or contains only the expected review packet draft
- ChatGPT is not generating
- no modal, menu, file chooser, upload, or error blocks the composer
- expected attachments are ready, if attachments are used
- the intended model, reasoning mode, and research/review surface are active
- the send button is enabled and safe

## Sending Procedure

1. Open a fresh chat for every separate review run unless an active generation must finish first.
2. Confirm the model and reasoning/research harness.
3. Select the intended review or research action.
4. Paste prompts through the clipboard. Avoid inline typing for long packets because newlines can send early or truncate content.
5. If ChatGPT converts pasted text into an attachment, confirm the attachment is the expected packet and is fully ready before sending.
6. Include the unique marker in visible prompt text.
7. Send once.
8. Record the conversation URL, marker, and visible send evidence in `.codex/state.md`.

## Waiting

After sending, poll using read-only DOM or visible state every 30-60 seconds.

Do not click, type, resend, stop, refresh, or retry while any of these indicate the run may still be active:

- stop-generation button is visible
- thinking, researching, uploading, or generating status is visible
- plan/report iframe is still updating
- assistant output is empty but generation controls remain active
- expected marker or latest user turn cannot be confirmed

## Extracting Deep Research Reports

Completed research reports may appear as special report cards rather than ordinary assistant text.

If ordinary assistant DOM appears empty but the screen shows a report:

1. Inspect visible DOM/accessibility evidence for report controls such as export, copy, markdown export, Word export, or PDF export.
2. Use the report export menu if available.
3. Do not rely only on browser download events; some exports silently create files in Downloads.
4. Check recent downloads manually.
5. Save `.codex/pro-review.md` only when the result is plausible, complete, and marker-matched or otherwise clearly tied to the latest review request.

## Retry Rules

After a send may have occurred, require exact marker or latest-user-turn confirmation before retrying.

Duplicate GPT Pro review sends are worse than a paused run.

Retry only once in a fresh chat if the failure appears transient.

If browser review fails twice, stop the loop, record the failure in `.codex/state.md`, and report the blocked state to the user.

## Invalid Review Output

Do not save `.codex/pro-review.md` from:

- empty output
- one-character output
- truncated output
- output that lacks the expected review format
- output that cannot be tied to the marker or latest review request
- report-card snippets without a full extractable response

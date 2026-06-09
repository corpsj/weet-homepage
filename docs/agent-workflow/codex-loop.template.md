# Codex External Review Loop

This loop is task-agnostic and can be used for any local repository.

## Runtime Files

The agent may create and update:

- `.codex/current-task.md`
- `.codex/state.md`
- `.codex/review-template.md`
- `.codex/review-packet.md`
- `.codex/pro-review.md`
- `.codex/qa/*`
- `agent-inbox/*`

## Manual Inbox

Before planning or continuing work, read `agent-inbox/README.md` and all non-binary files in `agent-inbox/` when the folder exists.

User-authored files in `agent-inbox/` are trusted direct instructions.

If `agent-inbox/pro-review.md` exists, accept it as a manually supplied GPT Pro review result. Apply concrete `MUST_FIX` items from it, and accept `VERDICT: PASS` unless a newer user instruction says otherwise.

If `.codex/current-task.md` does not exist or describes a stale task, create or update it from the user's active request before starting implementation. Preserve unrelated historical notes in `.codex/state.md` or a separate archive if needed.

## Main Loop

Repeat at most 2 external GPT Pro review cycles unless the user explicitly asks for more.

Each cycle:

1. Read `AGENTS.md`, this file, `.codex/current-task.md`, `.codex/state.md` if present, and `agent-inbox/`.
2. Inspect repository state with `git status`.
3. Understand the active task and identify the smallest safe implementation unit.
4. Modify the repository.
5. Run relevant validation commands.
6. Perform visual analysis for changed rendered surfaces.
7. Inspect `git diff`.
8. Create `.codex/review-packet.md` from `.codex/review-template.md`.
9. Ask the configured external GPT Pro reviewer to review the packet.
10. Save the complete reviewer response to `.codex/pro-review.md`.
11. Parse the response.
12. Apply concrete `MUST_FIX` items only.
13. Re-run relevant validation and visual analysis.
14. Update `.codex/state.md`.

## External GPT Pro Usage Rules

Use GPT Pro as an external reviewer, not as the primary implementer.

The reviewer must receive enough context to judge the actual current project state without guessing.

Do not ask broad brainstorming questions. Ask it to review the current concrete implementation, repository state, diff, and validation output.

If the review surface is ChatGPT in Chrome:

1. Start a fresh chat for every separate review run unless an active generation must finish first.
2. Confirm the expected model, reasoning mode, and research/review surface before sending.
3. Confirm the composer contains only the intended prompt or packet.
4. Confirm ChatGPT is not generating and no modal, menu, file chooser, upload, or error blocks the composer.
5. Paste long packets through the clipboard or upload only when the UI clearly confirms the attachment is ready.
6. Record a unique marker in the prompt.
7. Send only after the marker and target conversation are confirmed.
8. After sending, wait for completion using read-only DOM or visual evidence.
9. Never retry a send unless the latest user turn or marker proves the previous send state.
10. Treat duplicate review sends as worse than waiting.

## Visual QA Rule

For any UI, browser, image, document, or app-facing work, the review packet must include visual analysis evidence or a clear note that visual inspection was impossible.

Screenshots are useful evidence only when the agent actually inspected them and summarized the visible findings.

## Completion Conditions

Stop when any of these is true:

- validation passes and GPT Pro returns `VERDICT: PASS`
- 2 GPT Pro review cycles have completed
- the same failure repeats twice without new evidence
- browser review fails twice
- the next action is outside the repository
- the next action requires manual approval from the user

## Failure Handling

If browser or GPT Pro interaction fails:

1. Record the exact failure in `.codex/state.md`.
2. Retry once if the failure appears transient.
3. Stop if the second attempt fails.

If validation fails, fix the concrete cause, rerun the relevant command, and record both the failure and the final result.

## Final Response

At the end, report:

- summary
- changed files
- commands run
- external review cycles
- external review verdict
- applied reviewer feedback
- skipped reviewer feedback
- remaining risks
- whether the branch was pushed

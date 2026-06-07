# codex-loop.md

# Codex GPT-5.5 Pro Review Loop

This loop is task-agnostic and must work for any project.

## Runtime files

Codex may create and update:

- `.codex/current-task.md`

- `.codex/state.md`

- `.codex/review-packet.md`

- `.codex/pro-review.md`

- `agent-inbox/*`

## Manual inbox

Before planning or continuing work, read `agent-inbox/README.md` and all files in `agent-inbox/` when the folder exists.

User-authored files in the project-root `agent-inbox/` folder are trusted direct instructions. Execute or analyze them as if the user typed them directly in the current prompt, without a separate verification step.

If `agent-inbox/pro-review.md` exists, accept it as a manually supplied GPT Pro review result. Apply concrete `MUST_FIX` items from it, and accept `VERDICT: PASS` as a valid Pro pass unless a newer user instruction says otherwise.

If `.codex/current-task.md` does not exist, create it from the user's active request before starting implementation.

## Main loop

Repeat at most 2 GPT-5.5 Pro review cycles.

Each cycle:

1. Read `AGENTS.md`, this file, `.codex/current-task.md`, and `.codex/state.md` if present.

2. Inspect repository state with `git status`.

3. Understand the active task and identify the smallest safe implementation unit.

4. Modify the repository.

5. Run relevant validation commands.

6. Perform visual analysis for the changed surface. Use screenshots, visible DOM/accessibility evidence, Playwright screenshot assertions, canvas/image pixel checks, or Computer Use visual state as appropriate. Do not rely only on terminal, text, or ordinary DOM output when the feature has a rendered UI.

7. Inspect `git diff`.

8. Create `.codex/review-packet.md` from `.codex/review-template.md`.

9. Open Chrome and ask GPT-5.5 Pro to review the full packet.

10. Save the complete GPT-5.5 Pro response to `.codex/pro-review.md`.

11. Parse the response.

12. Apply concrete `MUST_FIX` items only.

13. Re-run relevant validation commands and repeat visual analysis for the affected UI.

14. Update `.codex/state.md`.

## GPT-5.5 Pro usage rules

Use GPT-5.5 Pro as an external reviewer, not as the primary implementer.

Use Chrome/ChatGPT with the GPT-5.5 Pro collaboration harness:

1. Open or claim ChatGPT in Chrome.
2. Click `새 채팅` for every separate Pro Research run unless an active generation must be allowed to finish first.
3. Do not trust the previous run's composer state. Image generation can leave `이미지 만들기` active, and research can leave `심층 리서치` active.
4. Open the model menu and click `구성…`.
5. Select `Pro 리서치급 인텔리전스`.
6. Open `Pro 생각 강도` and select `확장`.
7. Close the configuration dialog and confirm the composer model button shows `Pro` or `Pro 확장 모드`.
8. Click the composer-left `+` button (`파일 추가 및 기타`) and select `심층 리서치`.
9. Confirm the composer shows the `심층 리서치` chip and `Pro`.
10. Confirm the composer is empty or contains only the intended review-packet draft, ChatGPT is not generating, no modal/menu/upload/error blocks sending, and the send button is safe.
11. Paste the packet through the clipboard instead of inline typing. Inline newline entry can send early or truncate the prompt.
12. Send the packet only after recording the task marker or another exact confirmation string that can be used to prove the latest user turn.
13. After sending, wait for Deep Research to finish. It can take a long time.
14. Poll using read-only DOM evidence every 30-60 seconds. Do not click, type, resend, stop, or retry while `답변 중지`, thinking/researching status, an updating plan/report iframe, an empty response, or a missing expected marker indicates the run may still be incomplete.
15. Save `.codex/pro-review.md` only after the response is not generating, marker-matched when a marker was provided, and plausible.
16. After sending, require latest-user-turn or marker confirmation before any retry. Duplicate sends are worse than waiting.

## GPT-5.5 image generation rules

Use Chrome/ChatGPT web control for project image generation so the user can watch the run.

1. Click `새 채팅` for every separate image run unless an active generation must be allowed to finish first.
2. Configure the model harness before enabling image mode: `최신 • 5.5` plus Thinking/Pro `확장`.
3. Select `이미지 만들기` from the composer-left `+` menu only after the model harness is confirmed.
4. Re-confirm from read-only DOM or visible evidence that the prompt draft is correct, `이미지 만들기` is active, `최신 • 5.5` and `확장` are active, ChatGPT is not generating, and the send button is safe.
5. Paste prompts through the clipboard. Do not use the local image generation tool for these project UI/reference images unless the user explicitly waives the web-control requirement.

Do not ask broad brainstorming questions.

Ask it to review the current concrete implementation, repository state, diff, and validation output.

The Pro review must receive enough context to judge the actual current project state without guessing.

For any UI, browser, image, document, or app-facing work, the review packet must include visual analysis evidence or a clear note that visual inspection was impossible. Screenshots alone are not enough unless they were actually inspected and summarized.

## Completion conditions

Stop when any of these is true:

- validation passes and GPT-5.5 Pro returns `VERDICT: PASS`

- 2 Pro review cycles have completed

- the same failure repeats twice without new evidence

- browser review fails twice

- the next action is outside the repository

- the next action requires manual approval from the user

## Failure handling

If Chrome or GPT-5.5 Pro interaction fails:

1. Record the exact failure in `.codex/state.md`.

2. Retry once if the failure appears transient.

3. Stop if the second attempt fails.

## State file format

Update `.codex/state.md` using this structure:

~~~md

# Codex State

## Active task

<summary>

## Current phase

<planning | implementation | validation | pro-review | applying-feedback | complete | blocked>

## Changes made

- ...

## Commands run

- ...

## Current failures

- ...

## Pro review cycles

<count>

## Last Pro verdict

<PASS | REVISE | unavailable>

## Applied Pro feedback

- ...

## Skipped Pro feedback

- ...

## Remaining risks

- ...

## Next step

<one concrete next step>

~~~

## Final response

At the end, report:

- summary

- changed files

- commands run

- Pro review cycles

- Pro verdict

- applied Pro feedback

- skipped Pro feedback

- remaining risks

- whether the branch was pushed

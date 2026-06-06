# codex-loop.md

# Codex GPT-5.5 Pro Review Loop

This loop is task-agnostic and must work for any project.

## Runtime files

Codex may create and update:

- `.codex/current-task.md`

- `.codex/state.md`

- `.codex/review-packet.md`

- `.codex/pro-review.md`

If `.codex/current-task.md` does not exist, create it from the user's active request before starting implementation.

## Main loop

Repeat at most 2 GPT-5.5 Pro review cycles.

Each cycle:

1. Read `AGENTS.md`, this file, `.codex/current-task.md`, and `.codex/state.md` if present.

2. Inspect repository state with `git status`.

3. Understand the active task and identify the smallest safe implementation unit.

4. Modify the repository.

5. Run relevant validation commands.

6. Inspect `git diff`.

7. Create `.codex/review-packet.md` from `.codex/review-template.md`.

8. Open Chrome and ask GPT-5.5 Pro to review the full packet.

9. Save the complete GPT-5.5 Pro response to `.codex/pro-review.md`.

10. Parse the response.

11. Apply concrete `MUST_FIX` items only.

12. Re-run relevant validation commands.

13. Update `.codex/state.md`.

## GPT-5.5 Pro usage rules

Use GPT-5.5 Pro as an external reviewer, not as the primary implementer.

Do not ask broad brainstorming questions.

Ask it to review the current concrete implementation, repository state, diff, and validation output.

The Pro review must receive enough context to judge the actual current project state without guessing.

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
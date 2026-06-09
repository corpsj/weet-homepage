# Frontend Delegation Runbook

Use this optional runbook when frontend implementation should be delegated to Antigravity IDE, Gemini, or another visible IDE agent.

## Division Of Labor

The delegated IDE agent may implement frontend code, styling, layout, page composition, or UI behavior.

The local implementation agent remains responsible for:

- reading repository instructions
- deciding task scope
- preparing the handoff prompt
- accepting only intended changes
- inspecting git status and diff
- running tests, lint, typecheck, and build
- performing visual QA
- creating review packets
- requesting GPT Pro review
- applying concrete reviewer feedback
- final reporting

## Preflight

Before delegating:

1. Inspect `git status`.
2. Read active task and inbox instructions.
3. Confirm the IDE app is reachable.
4. Confirm the correct workspace is open.
5. Confirm the IDE agent composer is visible and empty or safe to replace.
6. Paste a harmless input smoke test if needed, without sending.
7. Record any failures in `.codex/state.md`.

If the IDE or Computer Use bridge is unavailable, record the exact failure. Continue directly only if the project instructions allow it or the task is too small to justify stopping.

## Handoff Prompt Contents

Give the IDE agent:

- active task brief
- files likely involved
- constraints and non-goals
- visual design requirements
- expected tests or acceptance criteria
- instruction to keep changes scoped
- instruction not to commit, push, or run destructive commands

## After Delegation

After the IDE agent finishes:

1. Inspect `git status`.
2. Inspect `git diff`.
3. Verify changed files are intended.
4. Revert nothing unrelated unless the user explicitly requests it.
5. Apply local fixes if needed.
6. Run validation.
7. Perform visual QA.
8. Continue the normal review loop.

## Failure Handling

Record:

- app name or bundle id tried
- whether the app was running
- exact Computer Use or browser error
- screenshots or visible state if available
- recovery attempts
- decision to retry, stop, or proceed locally

Do not silently skip required delegation.

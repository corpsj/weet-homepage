# Setup Guide

Follow this guide to install the universal agent workflow in another repository.

## 1. Copy Templates

From this folder, copy:

```text
AGENTS.template.md              -> <project>/AGENTS.md
codex-loop.template.md          -> <project>/codex-loop.md
review-template.md              -> <project>/.codex/review-template.md
agent-inbox.README.template.md  -> <project>/agent-inbox/README.md
state-template.md               -> <project>/.codex/state.md
current-task-template.md        -> <project>/.codex/current-task.md
```

Create these folders if they do not exist:

```sh
mkdir -p .codex/qa agent-inbox
```

Optionally copy these runbooks into `.codex/runbooks/` or `agent-inbox/`:

```text
chrome-gpt-pro-runbook.md
visual-qa-runbook.md
antigravity-frontend-runbook.md
```

## 2. Customize Project-Specific Fields

Edit `.codex/current-task.md` for the active task:

- original user request
- implementation scope
- routes, modules, tests, or files involved
- constraints and non-goals
- validation commands

Edit `.codex/state.md` only with current reality:

- current phase
- changes made
- commands run
- failures and risks
- review cycles and verdict

Add project-specific instructions to `agent-inbox/instructions.md`, for example:

- deployment URL
- staging or production validation rules
- browser login assumptions
- design system requirements
- tools that must or must not be used
- manual reviewer notes

## 3. Establish Validation Commands

Record common commands in `.codex/current-task.md` or `agent-inbox/instructions.md`:

```text
npm run lint
npm test
npm run build
npx playwright test
```

Replace these with the target repository's actual package manager and scripts.

## 4. Run The Loop

For each task:

1. Read `AGENTS.md`, `codex-loop.md`, `.codex/current-task.md`, `.codex/state.md`, and `agent-inbox/`.
2. Inspect `git status`.
3. Implement the smallest safe slice.
4. Run validation.
5. Capture and inspect visual evidence if rendered surfaces changed.
6. Write `.codex/review-packet.md` from `.codex/review-template.md`.
7. Ask GPT Pro to review the packet.
8. Save the full response to `.codex/pro-review.md`.
9. Apply only concrete `MUST_FIX` feedback.
10. Update `.codex/state.md`.

## 5. Completion

Finish when:

- validation passes and GPT Pro returns `VERDICT: PASS`
- the maximum review cycles are reached
- the same failure repeats twice
- browser review fails twice
- the next action requires manual user approval

Final reports should include:

- summary
- changed files
- commands run
- review cycles and verdict
- applied and skipped review feedback
- remaining risks
- push/deployment status if relevant

## Notes

Keep universal workflow documents stable. Put project-specific facts in `.codex/current-task.md`, `.codex/state.md`, and `agent-inbox/` instead of editing the core templates each time.

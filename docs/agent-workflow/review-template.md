# GPT Pro Review Request

You are reviewing an existing local project.

You cannot see my computer, repository, terminal, git history, previous agent actions, browser state, database state, generated files, runtime logs, or hidden files.

All relevant context is included below.

Do not assume context that is not shown.

Return only this exact format:

```text
VERDICT: PASS | REVISE

CONTEXT_GAPS:

- ...

MUST_FIX:

- ...

OPTIONAL:

- ...

TESTS_TO_RUN:

- ...

RISK_NOTES:

- ...
```

---

## 1. Active Task

### Original Request

{{ORIGINAL_USER_REQUEST}}

### Active Task Brief

{{ACTIVE_TASK_BRIEF}}

### Inferred Goal

{{INFERRED_GOAL}}

### Non-Goals

{{NON_GOALS}}

### Constraints

{{CONSTRAINTS}}

---

## 2. Project Snapshot

### Purpose

{{PROJECT_PURPOSE}}

### Stack

{{STACK}}

### Package Manager And Commands

{{PACKAGE_MANAGER_AND_COMMANDS}}

### Important Routes, Modules, Or Directories

{{IMPORTANT_ROUTES_MODULES_DIRECTORIES}}

### Relevant Architecture

{{RELEVANT_ARCHITECTURE}}

### Database, Storage, Or External Services

{{DATABASE_STORAGE_EXTERNAL_SERVICES}}

---

## 3. Work So Far

### Current State

{{CURRENT_STATE}}

### Changes Made

{{CHANGES_MADE}}

### Reasoning For Changes

{{REASONING_FOR_CHANGES}}

### Unresolved Questions

{{UNRESOLVED_QUESTIONS}}

### Known Risks

{{KNOWN_RISKS}}

---

## 4. Repository State

### Current Branch

{{CURRENT_BRANCH}}

### Recent Commits, If Relevant

{{RECENT_COMMITS}}

### Git Status

```text
{{GIT_STATUS}}
```

### Changed Files

```text
{{CHANGED_FILES}}
```

### Git Diff

```diff
{{GIT_DIFF}}
```

### Relevant File Excerpts

{{RELEVANT_FILE_EXCERPTS}}

---

## 5. Validation State

### Commands Run

```text
{{COMMANDS_RUN}}
```

### Test, Lint, Build, Or Typecheck Output

```text
{{TEST_LINT_BUILD_OUTPUT}}
```

### Browser, Screenshot, Or Playwright Findings

{{BROWSER_OR_PLAYWRIGHT_FINDINGS}}

### Current Failures

{{CURRENT_FAILURES}}

### Suspected Causes

{{SUSPECTED_CAUSES}}

---

## 6. Review Questions

Review the current implementation as if this packet is the only context available.

Focus on:

- correctness
- regressions
- edge cases
- missing tests
- type errors
- build failures
- integration risks
- data migration risks
- admin, permission, or security issues
- unnecessary complexity
- visual or UX issues if rendered surfaces changed

Only put concrete required changes under `MUST_FIX`.

Put non-blocking improvements under `OPTIONAL`.

Do not request broad rewrites unless the current approach is clearly wrong.

Do not assume files, requirements, or behavior not shown in this packet.

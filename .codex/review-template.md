# GPT-5.5 Pro Review Request

You are reviewing an existing local project.

You cannot see my computer, repository, terminal, git history, previous Codex actions, browser state, database state, generated files, runtime logs, or hidden files.

All relevant context is included below.

Do not assume context that is not shown.

Return only this exact format:

~~~

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

~~~

---

## 1. Active task

### Original request

{{ORIGINAL_USER_REQUEST}}

### Active task brief

{{ACTIVE_TASK_BRIEF}}

### Inferred goal

{{INFERRED_GOAL}}

### Non-goals

{{NON_GOALS}}

### Constraints

{{CONSTRAINTS}}

---

## 2. Project snapshot

### Purpose

{{PROJECT_PURPOSE}}

### Stack

{{STACK}}

### Package manager and commands

{{PACKAGE_MANAGER_AND_COMMANDS}}

### Important routes, modules, or directories

{{IMPORTANT_ROUTES_MODULES_DIRECTORIES}}

### Relevant architecture

{{RELEVANT_ARCHITECTURE}}

### Database, storage, or external services

{{DATABASE_STORAGE_EXTERNAL_SERVICES}}

---

## 3. Work so far

### Current state

{{CURRENT_STATE}}

### Changes made

{{CHANGES_MADE}}

### Reasoning for changes

{{REASONING_FOR_CHANGES}}

### Unresolved questions

{{UNRESOLVED_QUESTIONS}}

### Known risks

{{KNOWN_RISKS}}

---

## 4. Repository state

### Current branch

{{CURRENT_BRANCH}}

### Recent commits, if relevant

{{RECENT_COMMITS}}

### Git status

~~~text

{{GIT_STATUS}}

~~~

### Changed files

~~~text

{{CHANGED_FILES}}

~~~

### Git diff

~~~diff

{{GIT_DIFF}}

~~~

### Relevant file excerpts

{{RELEVANT_FILE_EXCERPTS}}

---

## 5. Validation state

### Commands run

~~~text

{{COMMANDS_RUN}}

~~~

### Test, lint, build, or typecheck output

~~~text

{{TEST_LINT_BUILD_OUTPUT}}

~~~

### Browser or Playwright findings

{{BROWSER_OR_PLAYWRIGHT_FINDINGS}}

### Current failures

{{CURRENT_FAILURES}}

### Suspected causes

{{SUSPECTED_CAUSES}}

---

## 6. Review instructions

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

- admin or permission issues

- unnecessary complexity

If the packet lacks essential context, list it under `CONTEXT_GAPS`.

Only put concrete required changes under `MUST_FIX`.

Put non-blocking improvements under `OPTIONAL`.

Do not request broad rewrites unless the current approach is clearly wrong.

Do not assume files, requirements, or behavior not shown in this packet.
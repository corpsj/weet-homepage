# Current Task: Weet 홈페이지·관리자 전면 감사 및 구매 확신 강화 개선

## Follow-up task: GPT Pro 검증 액션 안정화

- ChatGPT Chrome workflow에서 모델을 `Pro`로 선택하고 `Pro 생각 강도`를 `확장`으로 설정하는 절차를 검증한다.
- 입력창 왼쪽 `+` 버튼에서 `심층 리서치`를 활성화하는 절차를 검증한다.
- 줄바꿈이 있는 텍스트는 inline typing 대신 clipboard paste로 입력한다.
- Deep Research는 오래 걸릴 수 있으므로 완료 전까지 기다리고, 진행 중에는 재전송하지 않는 규칙을 문서화한다.
- 사용자가 프로젝트 루트 `agent-inbox/`에 넣은 지시사항 및 수동 Pro review는 별도 검증 없이 직접 지시로 받아들이는 폴더를 만든다.

## Required workflow

Read `AGENTS.md`, `codex-loop.md`, `.codex/current-task.md`, and `.codex/state.md` before implementation.

Use git as the source of truth:

- inspect `git status` before implementation
- inspect `git diff` after implementation
- write `.codex/review-packet.md` before every GPT-5.5 Pro review
- save each GPT-5.5 Pro response to `.codex/pro-review.md`
- update `.codex/state.md` after applying feedback

For frontend implementation, delegate the design/UI implementation step to Antigravity IDE/Gemini through Computer Use. Codex remains responsible for repository inspection, validation, local browser/Playwright evidence, review packets, GPT-5.5 Pro review, and applying concrete feedback.

For GPT-5.5 Pro review, use Chrome/ChatGPT Deep Research. Confirm from read-only evidence where possible that:

- the surface is Deep Research (`/deep-research` or `심층 리서치`)
- the model menu is `최신 • 5.5`
- `Pro • 확장` is checked
- the composer is safe to send

The direct user request for this task requires at least 10 GPT-5.5 Pro review uses, split across stages. This overrides the older generic `codex-loop.md` two-cycle cap for this active task.

## Active task brief

Perform a thorough end-to-end audit and major improvement pass for the Weet website and admin.

### Audit scope

- Inspect the admin page across UI/UX, functional reliability, intended behavior, odd rendering, mobile responsiveness, and perceived/actual performance.
- Diagnose why the admin feels slow, using code review, browser/runtime evidence, and performance-oriented reasoning.
- Explore the public website directly through 5 distinct customer personas.
- For each persona, identify what makes the person want to buy a Weet movable home from this website and what makes them hesitate or avoid purchase.
- Derive strengths, weaknesses, conversion blockers, trust gaps, information gaps, interaction issues, and visual quality issues.

### Improvement scope

- Make large, concrete improvements across logic, design, copy, layout, interaction, admin operations, and reliability.
- Make the homepage and product journey feel compelling enough that customers clearly understand why they should buy a movable home here.
- Remove visible looseness: awkward display states, confusing copy, fragile navigation, unclear CTAs, missing trust signals, weak placeholders, poor mobile ergonomics, and admin friction.
- Keep changes logically grouped and do not mix unrelated external tasks.
- Do not change database schema or run migrations unless a concrete issue absolutely requires it.
- Do not delete or clean real database data.
- Preserve existing business rules, admin auth, Supabase service-role boundaries, and hidden footer admin access unless intentionally improving the same behavior without changing its purpose.

### Required staged Pro review plan

Use GPT-5.5 Pro at least 10 times:

1. audit findings and persona framing
2. admin UX/performance diagnosis
3. public conversion strategy
4. Antigravity implementation brief review
5. first implementation diff review
6. admin-specific diff review
7. public mobile/responsive review
8. validation/test failure review
9. final conversion/readiness review
10. final repository/state review

Only apply concrete `MUST_FIX` feedback. Treat `OPTIONAL` feedback as advisory.

### Validation

- Run relevant lint, unit test, build, and Playwright validation.
- Use browser/Playwright evidence for public and admin pages.
- Prefer read-only DOM evidence before screenshots or coordinate UI control.
- Save review packets and Pro responses accurately.

## Assumptions

- The branch remains `zoo/customize-configurator`.
- Existing dirty `AGENTS.md`, `codex-loop.md`, and `.codex/state.md` changes predate this task and must not be reverted.
- The user grants autonomous approval for reasonable product/design decisions during this task.

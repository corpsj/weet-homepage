# Current Task: Order UI And Admin Customize Improvement

## Active request

Use the supplied GPT Pro report to improve the Weet website. Move the header order/configuration CTA to a better location, visually review and improve the admin `주문 구성 관리` tab, reduce oversized option cards on the order/configurator page, and replace the inconvenient mobile bottom option drawer with a more Tesla-order-like inline configurator flow.

## Required execution style

- Apply `agent-inbox/` instructions as trusted direct instructions.
- The frontend/code implementation slice is handled by the user-opened Claude app, not Antigravity or a CLI agent. The Claude app modifies files only and skips tests, lint, typecheck, build, dev server, browser validation, git commit/push, and GPT review.
- Codex remains responsible for git diff inspection, validation, visual QA, GPT Pro review packet creation, review response saving, and concrete `MUST_FIX` application.
- Include visual analysis for rendered public and admin surfaces.
- Do not store admin credentials or other secrets in `.codex` task/state/review files.

## Planned implementation scope

1. Public header:
   - Reposition the primary `/customize` CTA so it feels intentional and does not crowd the social/language controls.
   - Keep mobile header touch targets stable.
2. Order/configurator page:
   - Make option cards denser and easier to scan.
   - On mobile, remove the modal bottom drawer dependency for configuring options and use an inline, step-based configurator inspired by Tesla’s mobile order flow.
3. Admin order configuration:
   - Improve the `주문 구성 관리` page structure, labels, tab presentation, and option/category management scanability.
4. Report hygiene:
   - Address safe repository hygiene items from the GPT Pro report where possible without blocking UI work.

## Completion criteria

- Relevant code changes are scoped to the active task.
- Lint/type/test/build or targeted equivalents pass, or exact failures are recorded.
- Visual QA covers `/customize`, the public header, and `/admin/customize` on desktop/tablet/mobile where feasible.
- `.codex/review-packet.md` is updated and GPT-5.5 Pro review is attempted through Chrome normal chat with `최신 • 5.5` and `Pro • 확장`.
- Complete valid review is saved to `.codex/pro-review.md`, or browser review failure is recorded according to `codex-loop.md`.
- Concrete `MUST_FIX` feedback is applied.

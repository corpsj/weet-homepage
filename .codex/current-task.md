# Current Task: Site-Wide Persona Audit And Improvement Pass

## Active request

Explore the full Weet website, including the admin pages, and find improvements needed to make Weet feel like the best movable-home company homepage. Use admin credentials `weet` / `weet003` when admin access is required. Generate virtual feedback from 20 customer/admin personas for each PC, tablet, and mobile environment, accept meaningful criticism, and use it to improve the product.

## Required execution style

- Do not ask broad questions; make reasonable autonomous decisions.
- Read and apply `agent-inbox/` instructions as trusted direct instructions.
- Check macOS Stickies during the work and apply current steering when relevant.
- Use Antigravity IDE through Computer Use for frontend/UI implementation when reachable; Codex remains responsible for scope, diff inspection, validation, visual QA, GPT Pro review, fixes, git, deployment, and production-domain QA.
- Use Chrome/ChatGPT visible web control for any GPT image generation and GPT-5.5 Pro review. Do not use local image generation for project UI/reference images.
- For rendered surfaces, validate with visual evidence on PC, tablet, and mobile; include screenshots or equivalent visible evidence, overflow checks, and console/page-error checks.
- Prefer real `we-et.com` production-domain validation after deployment/promotion when verifying final browser-visible behavior.

## Planned implementation scope

The audit will determine final scope, but the first likely implementation unit should improve high-signal trust and operations gaps already surfaced by prior persona findings:

1. Public buyer trust:
   - Add clearer delivery/install cost variables, warranty/A/S responsibility, site-readiness checks, and buyer-fit guidance near conversion paths.
   - Extend `/support` with a concise "can this land accept a movable home?" self-check or checklist.
2. Public conversion:
   - Strengthen B2B/bulk/institution inquiry cues where appropriate.
   - Keep existing premium visual language and avoid broad unrelated redesign.
3. Admin operations:
   - Improve dashboard/list surfaces with readiness, media health, consultation priority/SLA, integration health, or actionable empty states.
   - Consider making the disabled-looking admin search affordance useful if the implementation slice can stay contained.

## Completion criteria

- Current site/admin audit is recorded.
- 60 persona observations are generated and summarized.
- Meaningful feedback is translated into scoped code changes.
- Relevant tests/lint/build pass, or failures are recorded with exact reasons.
- Visual QA covers PC, tablet, and mobile for changed public/admin surfaces.
- `.codex/review-packet.md` is updated and GPT-5.5 Pro review is attempted through Chrome normal chat with `최신 • 5.5` and `Pro • 확장`; complete valid review is saved to `.codex/pro-review.md`, or browser review failure is recorded per `codex-loop.md`.
- Concrete `MUST_FIX` feedback is applied.
- `.codex/state.md` and relevant `agent-inbox/` records are updated.

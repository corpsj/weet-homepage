# Current Task: Weet Customization Page Premium Configurator

## Active request

Rebuild `/customize` into a premium movable-home ordering/configuration flow. The page must make model choice, included options, paid upgrades, space expansion, and consultation request feel clear, trustworthy, and high-end without dark patterns.

## Required execution style

- Do not ask the user questions; assume reasonable approvals are granted.
- Treat `agent-inbox/` as direct trusted user instruction.
- Use Antigravity IDE through Computer Use for frontend/UI implementation when reachable; Codex remains responsible for verification, tests, review packets, GPT-5.5 Pro review, and final fixes.
- Use Chrome/ChatGPT visible web control for GPT-5.5 Pro research/review and project image generation. If Chrome DOM tooling is unavailable, record the limitation and use visible Computer Use evidence carefully rather than silently skipping review.
- Every validation pass must include visual analysis, not only terminal or DOM output.
- Do not use Codex loop/goal features.

## Required implementation scope

1. Make the left side a focused floorplan/space visualization stage; remove or relocate the current model recommendation and site checklist content from the left-side lower area.
2. Implement a 3x6 to 3x9 transition where the right wall feels anchored and the room expands leftward; include reduced-motion handling.
3. Reduce option card height and improve option-list density while preserving clear touch targets.
4. Put default/included options first and clearly distinguish included vs paid/consult options.
5. Reorganize option layout as a 3-4 step flow with a top step/progress navigation.
6. Improve the consultation modal optional-field copy so optional inputs feel helpful, not mandatory.
7. Implement at least 10 concrete additional UX improvements and record them in `agent-inbox/customizer-improvements.md`.
8. Plan/use visual assets only when they improve real customer understanding; record decisions in `agent-inbox/customizer-image-generation.md`.
9. Perform persona testing across 20 buyer personas and PC/tablet/mobile, record findings in `agent-inbox/customizer-persona-test-results.md`, and do a second-pass improvement from those findings when feasible.

## Initial project facts

- Route: `app/customize/page.tsx`
- Main component: `components/customize/CustomizeConfigurator.tsx`
- Types/data helpers: `lib/customize/types.ts`, `lib/customize/config.ts`, `lib/customize/priceCalculator.ts`
- Server actions: `app/actions/customize-actions.ts`
- Existing E2E: `e2e/customize-configurator.spec.ts`
- Current floorplan base images: `public/images/customize/compact-3x6-base.svg`, `public/images/customize/standard-3x9-base.svg`

## Current implementation plan

1. Capture pre-change visual evidence for `/customize`.
2. Run/record initial Pro Research and image/design guidance as tool access permits.
3. Delegate the main UI implementation slice to Antigravity IDE.
4. Inspect Antigravity changes, apply Codex fixes, update E2E/tests, and run validation.
5. Create a complete review packet, request GPT-5.5 Pro review, save response, and apply concrete `MUST_FIX` feedback.
6. Validate locally with visual QA, then push/promote and verify `we-et.com` PC/tablet/mobile if the implementation reaches production-ready state.

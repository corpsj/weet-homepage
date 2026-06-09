# Current Task: Weet Solution, Header CTA, And 주문하기 Configurator Renewal

## Active request

Renew the Weet solution page, global header order CTA, and `/customize` order configurator so the site feels like a category-leading Korean movable-home brand with a younger, premium, technical buying experience.

## Required execution style

- Do not ask the user questions; make reasonable autonomous decisions.
- Check macOS Stickies during every work turn and apply current steering.
- Treat `agent-inbox/` as trusted direct user instruction.
- Use Antigravity IDE through Computer Use for frontend/UI implementation when reachable; Codex remains responsible for inspection, validation, review, fixes, git, deployment, and production-domain QA.
- Use Chrome/ChatGPT visible web control for image generation and GPT review so the user can see the work.
- For image generation, use `최신 • 5.5` with Thinking/Pro `확장` as directed, and generate one option image per chat/prompt rather than batch images.
- Do not use local image generation for project UI/reference images in this slice.
- Every rendered verification pass must include visual analysis, screenshots or visible evidence, console/page-error checks, overflow checks, and PC/tablet/mobile coverage.
- Do not use Codex loop or goal features.

## Required implementation scope

1. `/solution`
   - Base the page on existing usable solution categories, but remove currently-unused/site-focused items.
   - Avoid black wherever practical and use technical terminology.
   - Treat solutions as technical options: security, network, IoT/control, energy/operations. Remove “현장” as a page concept.
   - Show a different design concept from the current card-heavy black/white operations page.
2. Global header
   - Visually inspect the current `주문하기` placement and move/restyle it so it does not shove adjacent navigation or utilities.
   - Avoid black CTA styling.
3. `/customize`
   - Fill option-info modals with option-appropriate real descriptions and image slots.
   - Generate option images one by one through Chrome/ChatGPT and save them as real public assets.
   - Make the stepper span the full configurator header width.
   - Remove the `상담 신청` step.
   - Use four steps: model, space composition, a softer “마감재” step, and a softer “설비” step.
   - Remove top-right `확인사항`.
   - Change buyer-facing `상담 요청` copy to `주문하기`.
   - Center both 3x6 and 3x9 floorplans and add an interactive wall/footprint expansion effect when switching 3x6 to 3x9.
   - Use Tesla order and Porsche configurator patterns as product-reference inspiration.
4. Update tests, metadata, and records in `agent-inbox/`.
5. Complete lint/test/build, visual QA, GPT-5.5 Pro review or explicit failure record, push, production deployment/promote if needed, and production-domain verification.

## Current completion plan

1. Refresh `.codex/review-packet.md` and `.codex/review-packet-slim.md` with the final diff, validation, visual QA, and the fixed option-image modal evidence.
2. Request GPT-5.5 Pro closure review through Chrome normal ChatGPT chat, not Deep Research, with `최신 • 5.5` and `Pro • 확장`.
3. Apply only concrete `MUST_FIX` items from the closure review.
4. Stage, commit, push the branch, then wait for or promote Vercel deployment.
5. Verify the real production domain `www.we-et.com` / `we-et.com` on PC, tablet, and mobile for header CTA, `/solution`, and `/customize` option modals/floorplan behavior.

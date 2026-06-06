# Current Task: 위트 전체 UI 정밀 polish 및 랜딩 배경색 재조정

## Required workflow

Read `AGENTS.md` and `codex-loop.md` before implementation.

For frontend implementation, delegate the implementation step to Antigravity IDE/Gemini through Computer Use, then return to Codex for local diff inspection, validation, GPT-5.5 Pro review, and concrete `MUST_FIX` feedback application.

Before asking GPT-5.5 Pro for review:

1. Create `.codex/review-packet.md` from `.codex/review-template.md` when available, otherwise write an equivalent packet.
2. Include the full active task brief.
3. Include current repo state, git status, git diff, relevant file excerpts, commands run, and validation output.
4. Paste the full packet into GPT-5.5 Pro in Chrome.
5. Save the full response to `.codex/pro-review.md`.
6. Apply concrete `MUST_FIX` feedback only.
7. Repeat at most 2 Pro review cycles.

## Active task brief

Implement the complete Weet UI polish plan across public pages, legal pages, login, and admin.

### Design direction

- The site should feel like a balanced mix of Tesla-style product-led decision flow and a premium architectural showroom.
- Avoid making the page feel like a generic beige/tan landing page; the current warm landing background color is disliked and must be replaced.
- Use a quieter premium palette: clean white/off-white, charcoal, stone gray, muted yellow only as a restrained brand accent.
- Keep dominant text concise, confident, and product/action oriented.
- Use restrained functional motion: sticky navigation, accordion, selected states, and hover refinement; reduce large theatrical reveal or heavy zoom effects.
- Use stable dimensions and responsive constraints so text and UI never overlap or overflow.

### Public pages

- Rework the global header and footer to be quieter and more premium.
- Preserve the hidden `/admin` link on the word `True` in the footer phrase `WE make dreams comE True`, including the intentionally non-obvious hover/cursor behavior.
- Homepage first viewport must prioritize actual product signal and `나만의 위트 만들기` CTA.
- Homepage must keep the required H1 `위트 이동식주택`, required subcopy `작고 단단한 내 집을 필요한 크기와 옵션으로 직접 구성해보세요.`, no homepage prices, no hero trust chips, no mini configurator.
- `/products` keeps the desktop long storytelling scroll, but mobile must become product cards with collapsible description/spec/floorplan details.
- Add a soft `/customize` CTA such as `비슷한 구성 만들기` from product browsing, without making `/products` feel like a hard sales page.
- `/modular` should be rewritten as an educational landing page with stronger hierarchy and premium product-system logic.
- `/bespoke` should remove the visible `View Portfolio` buttons and keep the image modal/showcase behavior.
- `/solution` and solution detail pages should feel like a public-facing tech mini-system: segmented navigation, functional cards, compact modals, and premium but not decorative UI.
- `/projects` should continue showing all project data, but missing images and incomplete/test-like entries must be presented with premium placeholders rather than raw `No Image` styling.
- `/support` should use stronger real/support imagery or limited generated material/process-detail visuals only where existing assets are weak.
- `/company`, `/privacy`, `/terms`, and `/login` should be brought into the same visual system.

### Legal pages

- Rewrite `/privacy` using the actual project data flows: customize consultations, legacy inquiries, Supabase auth/admin cookies, GA/Clarity/Vercel Analytics if configured, and manually deleted admin-managed personal data.
- Rewrite `/terms` as a service-specific draft for website use, customize consultation, estimate/installation finalization, content rights, limitations, and user obligations.
- Do not add visible “legal review needed” copy to the pages or state file.

### Admin

- Admin should be a dense, efficient operations console, not a marketing dashboard.
- Make the admin shell fully responsive across all admin routes.
- Mobile admin navigation should be top bar + drawer, while desktop keeps a sidebar.
- All listed admin routes must avoid horizontal overflow on mobile: dashboard, main CMS, products, customize, projects, support, insights, gallery, consultations, inquiries, UTM, settings.
- Convert fixed-width admin tables or data grids to mobile cards, stacked controls, horizontal-safe panels, or collapsible details as appropriate.
- Move risky/legacy settings actions such as data migration into a collapsed advanced/danger section with clearer warnings and confirmation.

### Image policy

- Use existing real product/company images first.
- If generated images are created, limit them to weak sections and use material/process/detail imagery. Face-free hands/tool details are allowed; avoid fake customer scenes or fake case-study data.

### Constraints

- Do not change DB schema or run migrations for this UI polish task.
- Do not delete or clean real database data.
- Do not touch unrelated `.kiro/` state.
- Keep existing `/customize` business rules and consultation submission behavior intact.
- Keep current security headers, admin auth, Supabase service-role boundaries, and review loop.

### Validation

- Run `npm run lint`, `npm run test`, `npm run build`, and `npx playwright test`.
- Add or update Playwright coverage for mobile overflow checks, product mobile accordions, footer hidden admin link preservation, and admin mobile drawer/access.
- Validate public and admin pages on desktop and mobile with browser/Playwright evidence.

## Assumptions

- The branch remains `zoo/customize-configurator`.
- Existing untracked `.kiro/` is unrelated and should not be committed.
- Existing `AGENTS.md` local modification belongs to the user/workspace and should not be reverted.

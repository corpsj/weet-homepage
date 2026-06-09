# Visual QA Runbook

Use visual QA whenever work affects something a human sees.

This includes:

- web pages
- application screens
- components
- dashboards
- modals
- documents
- presentations
- spreadsheets
- generated images
- canvas or WebGL scenes
- browser-based flows

## Core Rule

Do not rely only on terminal output, text extraction, or ordinary DOM assertions for rendered surfaces.

Every validation pass should include visual analysis using at least one appropriate evidence source:

- screenshot inspection
- Playwright screenshot capture
- visible DOM or accessibility tree evidence
- canvas/image pixel checks
- browser viewport checks
- desktop visual state through Computer Use
- rendered document/page images

## What To Check

For UI work, inspect at least:

- desktop, tablet, and mobile viewports when responsive behavior matters
- horizontal overflow
- clipped text
- overlapping controls
- unreadable contrast
- incorrect image loading
- loading or empty states
- modal/dialog focus and visible closure controls
- sticky/fixed UI clearance
- primary workflow completion
- console or page errors when applicable

For image, document, or presentation work, inspect:

- actual rendered output
- crop and framing
- text fit
- broken assets
- unreadable sections
- page or slide overflow
- exported file validity

## Recording Evidence

Store visual evidence under `.codex/qa/<task-or-date>/` when possible.

Record in `.codex/state.md` and `.codex/review-packet.md`:

- viewports checked
- screenshots or artifact paths
- visible findings
- any visual issues found
- why visual inspection was not possible, if blocked

Screenshots alone are not enough. Summarize what was inspected and what the screenshot proves.

## Review Packet Requirement

If rendered surfaces changed, `.codex/review-packet.md` must include a visual QA section.

If no visual QA was possible, state the exact blocker and remaining risk.

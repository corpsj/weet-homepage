# Current Task: Site Image Realism Second Pass + Customizer Detail Modal

## Active request

Second-pass QA and improvement for the WEET website imagery and customize flow:

- Re-audit images generated so far and improve anything that still does not feel Korean, looks AI-generated, or has awkward erased/detail artifacts. The bespoke smart farm image is a required fix because the Porter-style truck looks artificially blank after text/logo removal.
- For this pass, people and text-like real-world elements are allowed when they improve realism, as long as they look natural and do not harm the product presentation.
- Improve the `/customize` option info modal opened by the `i` button. Remove all pill-shaped keyword/spec boxes, add 1-3 suitable explanatory images for each option, and supplement each option's detailed explanation.
- Improve the `/modular` page photos and make sure the page uses modular-appropriate refreshed assets, not mismatched reused bespoke imagery.
- Execute all work to a very high visual standard without requiring the user to specify every small detail.

## Required execution style

- Use Chrome/ChatGPT visible web control only for GPT image generation.
- Generate one image at a time per tab. When using three tabs, each tab must run a different image.
- Use the Thinking model only for image generation, with `확장` thinking where available. Do not use Pro for image generation.
- Enable `이미지 만들기` before sending image prompts.
- Before sending each image prompt, verify the intended uploaded reference image, prompt text, image mode, model/expanded state, no deep research mode, no active generation, and safe send state.
- Do not use the local image generation tool for these assets.
- Earlier no-people/no-text constraints are superseded by the latest user request for this second pass: people and text-like real-world details may be added when they make the image more believable and natural.
- For i2i targets, the movable-home/module size and form must remain the same; material texture/detail can improve.
- Surroundings should look natural for Korea and remain product-focused.
- Product page replacements were already generated, uploaded to Supabase products storage, and DB-updated in the previous phase.
- For the expanded site scope, overwrite static public assets where appropriate and upload/update database-backed gallery assets where appropriate.
- Treat logos, favicons, floor plans, and non-rendered SVG diagrams as out of scope unless a newer instruction explicitly asks to regenerate them.

## Current target inventory

- Product page phase: 49 product photos complete and live-URL verified.
- Expanded visible-site phase: 18 images in `site-image-refresh-work/manifest.json`.
- Landing page: hero image plus six database-backed gallery images.
- Customer support: three support process images.
- Customize/order: current rendered page has no `<img>` targets; non-rendered drawings/SVGs are excluded from this pass.
- Bespoke: four section images.
- Solution: four topic-specific images; energy needs a new solution image and code path update.
- Second-pass additions:
  - Bespoke smart-farm image was regenerated again to improve Korean realism and fix the blank Porter-style truck artifact.
  - Modular hero, factory, transport/install, and flexible commercial images were regenerated and wired into `/modular`.
  - Modular interior image regeneration stalled twice in ChatGPT, so the existing generated asset remains.
  - Customize option info modal now uses one explanatory image per option from `/images/customize/options/*.webp` plus expanded recommendation/check copy.

## Completion criteria

- Every in-scope website image has a generated replacement saved locally with traceable source mapping, except the modular interior retry that stalled twice and retained the existing generated asset.
- Static replacements are written to the repository; database-backed gallery replacements from the earlier expanded pass are uploaded to Supabase Storage and the relevant `gallery.image_url` values are updated.
- Validation confirms the relevant landing/support/customize/bespoke/solution/modular pages load, and the second-pass live QA confirms `/customize`, `/modular`, and `/bespoke` load without broken images or overflow.
- Latest second-pass constraints allow people and text-like real-world elements when they improve realism.
- Real-domain QA uses `https://www.we-et.com`, not localhost, after deployment/cache behavior is checked.
- `.codex/review-packet.md` is created, GPT-5.5 Pro review is attempted through Chrome normal chat with `최신 • 5.5` and `Pro • 확장`, and `.codex/pro-review.md` is saved only when a valid review is obtained.
- Concrete `MUST_FIX` feedback is applied if a valid Pro review becomes available.

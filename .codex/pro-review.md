MARKER: WEET_REVIEW_20260610_EXPANSION_GUIDE_03
VERDICT: PASS

MUST_FIX:
- None.

OPTIONAL:
- Consider making the guide label copy slightly more user-facing, for example "좌우 벽체가 6m에서 9m로 확장돼요," if future QA finds the current "6m 기준선에서 9m로 확장" wording too technical.
- Consider adding a tiny legend or tooltip only if users confuse the tan dotted 6m reference lines with selectable construction elements.
- Consider documenting that `FloorplanExpansionGuides` assumes the compact baseline is 600 SVG units wide and centered at `x=500`, because that coupling is not obvious from the component alone.

RATIONALE:
- The current diff directly satisfies the Stickies steering: the 3x6 -> 3x9 transition is no longer just a base floorplan swap. It now has animated wall-line geometry, left/right growth zones, and persistent 6m reference lines that explain where the expansion happens.
- The implementation uses the existing centered `floorplanSize` geometry, so the visual guide follows the same model footprint logic rather than introducing a second unrelated layout system.
- The measured QA geometry supports the intended behavior: the wall guide expands from compact `x1=212, x2=788` through a mid-transition frame to final `x1=62, x2=938`, which is exactly the "moving wall/line expansion" behavior requested.
- The reduced-motion handling is appropriate: users who prefer reduced motion still get the correct final guide state without an animated transition.
- The added option modal dialog semantics are a safe accessibility improvement and do not appear to broaden scope in a risky way.
- The reported validation is strong for this narrow patch: lint, unit tests, build, targeted Playwright tests, diff check, visual screenshots, overflow checks, and modal image dimension checks all passed. The remaining localhost analytics warning and Next.js deprecation warning are unrelated to this refinement.

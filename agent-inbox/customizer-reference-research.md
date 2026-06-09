# Customizer Reference Research

## 2026-06-07 applied reference synthesis

- Tesla Model 3 Design Studio (`https://www.tesla.com/model3/design`)
  - Borrowed pattern: product visualization remains the center of the purchase surface while configuration choices and price summary stay close to the CTA.
  - Weet application: left floorplan stage stays visually pure; option/consult content sits in the right flow and bottom CTA.

- Porsche Car Configurator model start (`https://models.porsche.com/`)
  - Borrowed pattern: model switching can transfer compatible equipment, with incompatible equipment treated as an exception rather than forcing restart.
  - Weet application: model changes now preserve compatible selected options and notify only when unavailable options are removed.

- Dvele homepage (`https://www.dvele.com/`)
  - Borrowed pattern: the buying journey is simplified into choose floorplan, pick design, live in comfort; Dvele explicitly frames endless tiny decisions as a problem.
  - Weet application: `/customize` uses a 4-step structure instead of one long option scroll.

- Dvele process page (`https://www.dvele.com/process`)
  - Borrowed pattern: land readiness and delivery constraints are part of the buying process, including access roads and crane/staging feasibility.
  - Weet application: readiness/checklist content is not deleted; it is relocated to the `상담 신청` context where it supports consultation instead of distracting from the stage.

- Existing `agent-inbox/design-reference-research.md`
  - Borrowed pattern: right-side configuration/price summary, explicit inclusion lists, site evaluation checklist, quiet premium material language, and restrained gold/off-white/charcoal palette.
  - Weet application: option rows now separate `기본 포함`, paid price, and `상담`; sticky total makes exclusions explicit.

- `.codex/pro-review-customizer-01-structure.md`
  - Borrowed pattern: exact 4-step labels, fixed-right-wall expansion, compact step flow, price transparency, and field-level optional helper copy.
  - Weet application: Pro `MUST_FIX` feedback was applied where concrete in this slice.

## Implementation implications recorded

- The customizer should not become a landing page or brochure page. It must open as the usable product configuration surface.
- The left stage should only contain model identity, floorplan, dimensions, selected overlays, and direct inspection controls.
- Model changes should feel like expansion/variant comparison, not a reset.
- Default/included options are trust proof; paid options are upgrades; consult options are excluded from the estimated total and must be labeled that way.
- Consultation copy should explain why optional information helps, not imply it is mandatory.

## Follow-up reference gaps

- A deeper review of Korean movable-home competitors can refine local copy for land category, permit, transport, and installation constraints.
- Future image generation should be judged against product comprehension, not decoration.
- Future pricing work should compare configurator breakdown patterns for transparent exclusions and dealer/installation caveats.

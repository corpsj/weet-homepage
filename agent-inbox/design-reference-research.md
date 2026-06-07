# Design Reference Research

This file accumulates design references and concrete borrowable patterns for Weet.

## Reference target

- At least 20 references related to premium modular homes, prefab homes, high-end product configurators, Tesla-like dashboards, SpaceX/xAI/Grok-style admin surfaces, and quiet luxury Korean/Asian architecture.

## Borrowable pattern log

### 2026-06-07 reference set

1. Dvele main site - https://www.dvele.com/
   - Borrow: simplify the buyer journey into a small numbered process: choose floorplan, pick design, live in comfort.
   - Borrow: copy should reduce decision fatigue instead of listing every feature at once.

2. Dvele Altadena Studio configurator - https://studio.dvele.com/design/fernie
   - Borrow: configurator steps that combine floorplan choice, design package selection, and lot fit validation.
   - Borrow: "check my lot" as a feasibility CTA, because transport/access readiness matters for movable homes.

3. Dvele process page - https://www.dvele.com/process
   - Borrow: land readiness and access constraints should be part of the buying flow, not hidden in support copy.

4. Honomobo - https://www.honomobo.com/us
   - Borrow: product cards with clear model name, beds/baths/sqft, starting price, and direct model links.
   - Borrow: short proof slogans such as precision-built, high-performance, future-ready.

5. Honomobo process - https://www.honomobo.com/ca/why-modular
   - Borrow: transparent schedule/quality/process proof blocks to make modular feel lower-risk.

6. Aro Homes - https://www.aro.homes/
   - Borrow: strong image-first proof of interiors/exteriors with net-zero and high-performance promises.
   - Borrow: make comfort and daily life feel premium, not only construction technology.

7. Mesocore - https://www.mesocore.com/
   - Borrow: instant property preview/address feasibility concept.
   - Borrow: compact spec clusters for bedrooms, bathrooms, sqft, and model type.

8. Ma Modular - https://www.mamodular.com/
   - Borrow: quiet, architectural language; "modern design accessible" without over-decorating.
   - Borrow: explain why factory-built is faster, higher quality, and less exposed to weather.

9. EVO ADU - https://www.evoadu.com/
   - Borrow: very explicit inclusion list: appliances, finishes, electrical/plumbing, installation boundary.
   - Borrow: site evaluation checklist: zoning, setbacks, utilities, delivery/crane access, soil/foundation.

10. Prefab Homes - https://prefabricatedhomes.com/
    - Borrow: end-to-end support framing: plans, permits, engineering, contractor connection.

11. ideabox - https://www.ideabox.us/
    - Borrow: model gallery should present compact retreats and larger modern homes with lifestyle-specific language.

12. evoDOMUS - https://www.evodomus.com/homes
    - Borrow: high-performance and ecological positioning for premium modular buyers.

13. DEN Outdoors - https://denoutdoors.com/
    - Borrow: "choose a design, customize, build/order kit" as a simple pathway for non-expert buyers.

14. ModelTown - https://www.modeltown.com/
    - Borrow: browsing/categorization idea for tiny, prefab, modular, container-style options.

15. Platform Dwellings - https://platformdwellings.com/
    - Borrow: combine property intelligence, configurator, and financing/readiness into one guided decision flow.

16. POSCO A&C modular architecture leaflet - https://www.poscoanc.com/cmm/download.do?subpath=%2Fdownload%2Fprcenter%2Fpublications%2FModular+architecture_leaflet.pdf
    - Borrow: Korean market proof language around steel-based modular systems, mobility, and modular construction credibility.

17. SUNNY HOUSE brochure - https://m3systems.co.kr/files/M3Systems_proofhouse_brochure_230214.pdf
    - Borrow: Korean premium modular phrase direction: "your thought becomes a work" can inspire warmer premium copy.

18. KMC modular brochure - https://img.esfair.kr/fms/uploadfiles/online/619/253910/7.%EB%B8%8C%EB%A1%9C%EC%8A%88%EC%96%B4%28%EA%B8%88%EA%B0%95%EA%B3%B5%EC%97%85%29.pdf
    - Borrow: application diversity: dormitory, office, accommodation, hospital, relief housing, and residential use cases.

19. Tesla Model 3 - https://www.tesla.com/model3
    - Borrow: concise performance/spec tiles above deeper detail; restrained CTAs such as "Design Yours" and "Order Now".
    - Borrow: premium material and quiet-cabin language for home comfort equivalents.

20. Tesla Model 3 design studio - https://www.tesla.com/model3/design
    - Borrow: right-side configuration/price summary pattern, clear payment modes, option radio controls, and persistent order CTA.

21. Tesla owner manual touchscreen sections - https://www.tesla.com/ownersmanual/model3/en_qa/Owners_Manual.pdf
    - Borrow for admin: compact status bar, quick controls, persistent primary navigation, and detailed panels on demand.

22. SpaceX official site - https://www.spacex.com/about-us
    - Borrow: black canvas, full-bleed product/mission imagery, uppercase micro labels, and blunt action CTAs.
    - Caution: use this sparingly for admin; too much cinematic styling can reduce repeated-use comfort.

23. xAI Grok Build - https://x.ai/cli
    - Borrow for admin: developer-focused precision, clean diffs/plan view metaphor, compact status/progress indicators.

24. xAI Grok connectors - https://x.ai/news/grok-connectors
    - Borrow for admin: make cross-tool operations visible as "connected workflows" rather than isolated pages.

25. Admin dashboard inspiration 2026 roundup - https://asappstudio.com/admin-dashboard-designs-2026/
    - Borrow carefully: primary metrics above the fold, persistent filters/navigation, mobile-first dark/light compatibility.

### Weet implementation implications

- Public home page should lead with the actual product, model choices, expected total cost range, included/excluded scope, land readiness, and a consultation CTA.
- `/customize` should feel like a product configurator, but every visual overlay must clearly represent only the selected model.
- Purchase confidence should come from transparent constraints: delivery route, truck/crane access, foundation, utilities, permits, A/S, and what is included.
- Admin should become a calm operations cockpit: status first, critical queues next, then content/model management. It should not feel like a generic CMS sidebar plus blank cards.
- Use black/charcoal, off-white panels, thin borders, and restrained gold accents; avoid one-note beige, oversized cards, and decorative gradients.

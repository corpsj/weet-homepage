# GPT-5.5 Pro Review Packet

Marker: REVIEW_PACKET_SITEWIDE_20260610_V1

## Active Task Brief

Explore the full Weet public website and admin console across PC/tablet/mobile, generate virtual feedback from 20 personas per device class (60 total), accept meaningful criticism, and apply focused improvements toward making Weet feel like the best movable-home company homepage. Admin credentials supplied by user: `weet` / `weet003`.

## Current Progress / State

- Read project workflow instructions and trusted `agent-inbox/` files.
- Checked macOS Stickies; only prior completed 3x6->3x9 configurator note was visible.
- Audited production public pages across PC/tablet/mobile.
- Production admin login with `weet` / `weet003` failed with `Could not authenticate user`, so authenticated admin QA was done locally with temporary Supabase admin users.
- Generated 60 persona observations in `agent-inbox/sitewide-persona-audit-20260610.md`.
- Delegated frontend implementation slice to Antigravity/Gemini and accepted intended changes.
- Codex then fixed follow-up issues: invalid FAQ route, search zero-result keyboard guard, unused imports, shared KST date helper, safer A/S wording, and e2e assertions.

## Project Snapshot

- Framework: Next.js 16 app router, React 19, TypeScript, Tailwind utility styling.
- Branch: `zoo/customize-configurator`.
- Relevant surfaces: `/support`, `/admin`, `/admin/projects`, `/admin/gallery`, Playwright e2e.

## Git Status

```
## zoo/customize-configurator...origin/zoo/customize-configurator
 M .codex/current-task.md
 M .codex/state.md
 M app/admin/page.tsx
 M app/admin/projects/AdminProjectsClient.tsx
 M app/support/page.tsx
 M components/admin/gallery/GalleryList.tsx
 M e2e/public-pages.spec.ts
?? .codex/qa/production-expansion-9fedfed-rerun/
?? .codex/qa/production-expansion-9fedfed/
?? .codex/qa/production-solution-fb62d34/
?? .codex/qa/sitewide-admin-local-20260610/
?? .codex/qa/sitewide-audit-20260610/
?? .codex/qa/sitewide-improvements-20260610/
?? .codex/qa/solution-renewal-20260609/
?? .codex/qa/solution-renewal-before-20260609/
?? agent-inbox/sitewide-persona-audit-20260610.md
?? components/admin/AdminCommandSearch.tsx
?? lib/date-format.ts
?? test-results/
```

## Changed Files

Tracked diff stat:

```
 .codex/current-task.md                     | 76 +++++++++++++-----------------
 .codex/state.md                            | 73 ++++++++++++++--------------
 app/admin/page.tsx                         | 13 +----
 app/admin/projects/AdminProjectsClient.tsx |  3 +-
 app/support/page.tsx                       | 50 +++++++++++++++++++-
 components/admin/gallery/GalleryList.tsx   |  3 +-
 e2e/public-pages.spec.ts                   |  9 ++++
 7 files changed, 133 insertions(+), 94 deletions(-)
```

Also new/untracked files in this slice:

- `components/admin/AdminCommandSearch.tsx`
- `lib/date-format.ts`
- `agent-inbox/sitewide-persona-audit-20260610.md`
- `.codex/qa/sitewide-improvements-20260610/` screenshots and summary

## Relevant Implementation Summary

1. Public support trust:
   - Added a `CHECKLIST` section before the process grid on `/support`.
   - Covers site readiness, delivery/install cost variables, and warranty/A/S responsibility.
   - Uses existing restrained visual language: white/gray, thin borders, teal accent, small lucide icons.

2. Admin command search:
   - Replaced disabled `명령 및 검색 (준비 중)` field on `/admin` with a client-side command search.
   - Supports Korean/English terms and links to consultations, products, customize, projects, support/FAQ, gallery, insights, UTM, settings.
   - Handles zero search results and keyboard navigation.

3. Hydration fix:
   - Replaced locale-dependent client date formatting in admin projects/gallery with deterministic KST `YYYY.MM.DD` formatting.

4. Test coverage:
   - Added e2e assertions for support checklist headings and FAQ command search href.

## Commands Run / Output

`git diff --check`: pass.

`npx tsc --noEmit`: pass.

`npm run lint`:

```
> weet-homepage@0.1.0 lint
> eslint . --max-warnings=0
```

`npm test`:

```
Test Files  3 passed (3)
Tests  20 passed (20)
```

`npm run build`:

```
Compiled successfully.
Build passed.
Warning: Next.js says the "middleware" file convention is deprecated and recommends "proxy". This warning is pre-existing / unrelated to this slice.
```

`npx playwright test e2e/public-pages.spec.ts --project=chromium`:

```
14 passed (17.7s)
```

## Browser / Visual QA Findings

Production public audit summary excerpt:

```json
{
  "generatedAt": "2026-06-09T20:44:08.624Z",
  "base": "https://www.we-et.com",
  "counts": {
    "total": 57,
    "errors": 0,
    "overflow": 0,
    "brokenVisibleImages": 0,
    "consoleOrPageIssues": 0
  },
  "results": [
    {
      "kind": "public",
      "route": "/",
      "viewport": "pc",
      "url": "https://www.we-et.com/?v=sitewide-audit-20260610",
      "title": "홈",
      "h1": [
        "작은 공간, 선명한 기준."
      ],
      "visibleHeadings": [
        "작은 공간, 선명한 기준.",
        "불확실성은 남기지 않습니다."
      ],
      "ctas": [
        {
          "text": "",
          "href": "/",
          "disabled": false
        },
        {
          "text": "모듈러건축 소개",
          "href": "/modular",
          "disabled": false
        },
        {
          "text": "제품 소개",
          "href": "/products",
          "disabled": false
        },
        {
          "text": "BESPOKE",
          "href": "/bespoke",
          "disabled": false
        },
        {
          "text": "SOLUTION",
          "href": "/solution",
          "disabled": false
        },
        {
          "text": "회사소개",
          "href": "/company",
          "disabled": false
        },
        {
          "text": "고객지원",
          "href": "/support",
          "disabled": false
        },
        {
          "text": "Daangn",
          "href": "https://www.daangn.com/kr/local-profile/%EC%9C%84%ED%8A%B8weet-kihpx4ctggn6/",
          "disabled": false
        },
        {
          "text": "N",
          "href": "https://blog.naver.com/we-et",
          "disabled": false
        },
        {
          "text": "Instagram",
          "href": "https://www.instagram.com/weet_kr/",
          "disabled": false
        },
        {
          "text": "KO",
          "href": null,
          "disabled": false
        },
        {
          "text": "EN",
          "href": null,
          "disabled": false
        },
        {
          "text": "주문하기",
          "href": "/customize",
          "disabled": false
        },
        {
          "text": "모델 구성하기",
          "href": "/customize",
          "disabled": false
        },
        {
          "text": "진행 과정 보기",
          "href": "/support",
          "disabled": false
        }
      ],
      "inputs": [],
      "imageCount": 2,
      "brokenVisibleImages": [],
      "overflowX": false,
      "scrollWidth": 1440,
      "innerWidth": 1440,
      "tinyTargets": [],
      "offscreenInteractive": [],
      "mainTextSample": "WEET MOBILE HOME작은 공간, 선명한 기준.이동식주택을 고를 때의 막연함을 없앱니다. 모델 선택부터 운송, 설치, 그리고 예상 비용까지 모든 과정을 투명하게 공개합니다.모델 구성하기진행 과정 보기ScrollTRANSPARENCY불확실성은 남기지 않습니다.'예상치 못한 현장 비용'과 '품질 편차'. 위트는 주택 설치의 가장 큰 리스크를 제거하기 위해 모든 기준을 선명하게 설계합니다.모델 및 옵션 구성3x6, 3x9 등 모듈러 베이스 모델과 라이프스타일에 맞는 옵션을 온라인에서 즉시 구성하고 예상 견적을 확인할 수 있습니다.포함 및 별도 범위제품 자체에 포함된 기본 사양과, 부지 토목·기초, 전기·상하수 인입 등 현장에서 별도로 발생하는 비용을 명확히 구분합니다.현장 설치 조건진입로 폭, 크레인 작업 반경, 인허가 가능 여부 등 제품 배송 전 확인해야 할 필수 요소를 사전에 체크합니다.운송 및 현장 조립공장 제작 후 현장까지의 운송 스케줄과 안전한 설치를 위한 가이드를 제공하여 현장 체류 시간을 최소화합니다.A/S 및 사후 관리문·창호 단차, 욕실 누수 등 입주 후 발생할 수 있는 주요 AS 항목들에 대한 명확한 보증 기간과 대응 절차를 안내합니다.공장 제작 기반날씨와 현장 여건에 영향을 받지 않는 실내 공장 제작을 통해 일관된 시공 품질과 단축된 공기를 보장합니다.DESIGN최적화된 생활 동선FACTORY표준화된 제작 환경INSTALLATION안전한 현장 설치WHO IT FITS목적에 맞는 공간을 정확하게.세컨드하우스·귀촌작은 주거 공간을 빠르게 검토하고 싶은 가족에게 모델, 옵션, 설치 조건을 한 번에 정리해줍니다.카페·팝업·숙박 운영수익을 내야 하는 공간은 일정과 설치 리스크가 중요합니다. 공장 제작 중심으로 오픈 시점을 예측하기 쉽게 만듭니다.기관·법인 프로젝트반복 설치, 농촌·복지·교육·업무용 모듈처럼 목적이 분명한 프로젝트를 표준 공정과 상담 기록으로 관리합니다.지금 바로 구성해보세요원하는 크기와 옵션을 선택하면 예상 견적과 함께 위트 매니저가 현장 조건에 맞춘 정확한 안내를 도와드립니다.나만의 위트 만들기",
      "loadMs": 12707,
      "consoleEvents": [],
      "pageErrors": []
    },
    {
      "kind": "public",
      "route": "/products",
      "viewport": "pc",
      "url": "https://www.we-et.com/products?v=sitewide-audit-20260610",
      "title": "제품 소개 | 위트(weet)",
      "h1": [
        "제품 소개"
      ],
      "visibleHeadings": [
        "S",
        "M",
        "제품 소개",
        "3X9 집"
      ],
      "ctas": [
        {
          "text": "",
          "href": "/",
          "disabled": false
        },
        {
          "text": "모듈러건축 소개",
          "href": "/modular",
          "disabled": false
        },
        {
          "text": "제품 소개",
          "href": "/products",
          "disabled": false
        },
        {
          "text": "BESPOKE",
          "href": "/bespoke",
          "disabled": false
        },
        {
          "text": "SOLUTION",
          "href": "/solution",
          "disabled": false
        },
        {
          "text": "회사소개",
          "href": "/company",
          "disabled": false
        },
        {
          "text": "고객지원",
          "href": "/support",
          "disabled": false
        },
        {
          "text": "Daangn",
          "href": "https://www.daangn.com/kr/local-profile/%EC%9C%84%ED%8A%B8weet-kihpx4ctggn6/",
          "disabled": false
        },
        {
          "text": "N",
          "href": "https://blog.naver.com/we-et",
          "disabled": false
        },
        {
          "text": "Instagram",
          "href": "https://www.instagram.com/weet_kr/",
          "disabled": false
        },
        {
          "text": "KO",
          "href": null,
          "disabled": false
        },
        {
          "text": "EN",
          "href": null,
          "disabled": false
        },
        {
          "text": "주문하기",
          "href": "/customize",
          "disabled": false
        }
      ],
      "inputs": [],
      "imageCount": 2,
      "brokenVisibleImages": [],
      "overflowX": false,
      "scrollWidth": 1440,
      "innerWidth": 1440,
      "tinyTargets": [],
      "offscreenInteractive": [],
      "mainTextSample": "SPrivate3X9 집3X6 집 (적삼목)3X6 집 (스타코)3X6 집(골강판)3X6 맨스케이브3X6 CAMPER3X3 SAUNA3X3 내서재3X6 피터팬의 모험3X3 리트릿Public3X9 파고라4X8 공중화장실3X6 버스정류장 M3X9 집 + 3X3 내서재3X6 집 + 3X6 집3X6 집 + 3X6 집 L18평 단독주택25평 단독주택30평 단독주택협소주택3X6 유닛 + 3X6 유닛 + 3X3 유닛3X6 유닛 + 3X6 유닛 + 3X6 유닛 + 3X6 유닛 + 커다란 지붕3X6 유닛 + 3X6 유닛 + 3X9 유닛 XL스몰유닛 조합 + 토목 + 조경스몰유닛 조합 + 토목 + 조경스몰유닛 조합 + 토목 + 조경SMLXL제품 소개작고 단단한 내 집, 필요한 크기와 목적에 맞는 구성을 찾아보세요.대표 모델 8개부터 확인하고 전체 26개 라인업으로 이어집니다. 3X9 집+ 2상세정보 보기설명완벽하게 계산된 3m x 9m의 효율적인 공간. 하지만 이 집의 진짜 매력은 발코니문을 여는 순간 시작됩니다. 나만의 작은 발코니에서 즐기는 아침의 커피 한 잔, 살랑이는 바람을 맞으며 읽는 오후의 책 한 권, 저녁노을을 바라보며 즐기는 시원한 맥주 한 캔.상세 정보가격문의크기3.2m X 6.2m X 높이 3.8m구조철골구조 + 목구조지붕재박공지붕외부마감갈바륨 골강판내부마감자작나무,벽지,안타민도면구성 상담 시작하기3X6 집 (적삼목)+ 2상세정보 보기설명우리는 이 공간을 건축물처럼 짓지 않고, 가구처럼 정밀하게 짜 맞췄습니다. 마치 잘 설계된 수납장을 열었을 때 감탄하게 되는 짜임새처럼, 현관부터 거실, 주방, 욕실까지 모든 공간이 유기적으로 연결되어 단 1cm의 낭비도 허용하지 않습니다.상세 정보가격위트문의크기3.2m X 6.2m X 높이 3.6m구조철골구조 + 목구조지붕재쉐이드 지붕외부마감적삼목, 징크내부마감자작나무,벽지,안타민도면구성 상담 시작하기3X6 집 (스타코)+ 2상세정보 보기설명우리는 이 공간을 건축물처럼 짓지 않고, 가구처럼 정밀하게 짜 맞췄습니다. 마치 잘 설계된 수납장을 열었을 때 감탄하게 되는 짜임새처럼, 현관부터 거실, 주방, 욕실까지 모든 공간이 유기적으로 연결되어 단 1cm의 낭비도 허용하지 않습니다.상세 정보가격위트문의크기3.2m X 6.2m X 높이 3.2m구조철골구조 + 목구조지붕재평지붕외부마감스타코내부마감자작나무,벽지,안타민도면구성 상담 시작하기3X6 집(골강판)+ 2상세정보 보기설명우리는 이 ",
      "loadMs": 7897,
      "consoleEvents": [],
      "pageErrors": []
    },
    {
      "kind": "public",
      "route": "/customize",
      "viewport": "pc",
      "url": "https://www.we-et.com/customize?v=sitewide-audit-20260610",
      "title": "주문하기 | 위트(weet)",
      "h1": [
        "Compact 3x6"
      ],
      "visibleHeadings": [
        "Compact 3x6",
        "이동식주택 구성"
      ],
      "ctas": [
        {
          "text": "WEET",
          "href": "/",
          "disabled": false
        },
        {
          "text": "모델",
          "href": null,
          "disabled": false
        },
        {
          "text": "공간 구성4",
          "href": null,
          "disabled": false
        },
        {
          "text": "무드 & 소재3",
          "href": null,
          "disabled": false
        },
        {
          "text": "스마트 테크",
          "href": null,
          "disabled": false
        },
        {
          "text": "도면 크게 보기",
          "href": null,
          "disabled": false
        },
        {
          "text": "Compact 3x6소형 주말주택3m x 6m · 18m²₩27,900,000부터",
          "href": null,
          "disabled": false
        },
        {
          "text": "Standard 3x9프리미엄 거주3m x 9m · 27m²₩34,900,000부터",
          "href": null,
          "disabled": false
        },
        {
          "text": "주문하기",
          "href": null,
          "disabled": false
        }
      ],
      "inputs": [],
      "imageCount": 0,
      "brokenVisibleImages": [],
      "overflowX": false,
      "scrollWidth": 1440,
      "innerWidth": 1440,
      "tinyTargets": [],
      "offscreenInteractive": [],
      "mainTextSample": "",
      "loadMs": 3874,
      "consoleEvents": [],
      "pageErrors": []
    },
    {
      "kind": "public",
      "route": "/support",
      "viewport": "pc",
      "url": "https://www.we-et.com/support?v=sitewide-audit-20260610",
      "title": "진행 과정과 확인사항 | 위트(weet)",
      "h1": [
        "진행 과정과 확인사항"
      ],
      "visibleHeadings": [
        "진행 과정과 확인사항"
      ],
      "ctas": [
        {
          "text": "",
          "href": "/",
          "disabled": false
        },
        {
          "text": "모듈러건축 소개",
          "href": "/modular",
          "disabled": false
        },
        {
          "text": "제품 소개",
          "href": "/products",
          "disabled": false
        },
        {
          "text": "BESPOKE",
          "href": "/bespoke",
          "disabled": false
        },
        {
          "text": "SOLUTION",
          "href": "/solution",
          "disabled": false
        },
        {
          "text": "회사소개",
          "href": "/company",
          "disabled": false
        },
        {
          "text": "고객지원",
          "href": "/support",
          "disabled": false
        },
        {
          "text": "Daangn",
          "href": "https://www.daangn.com/kr/local-profile/%EC%9C%84%ED%8A%B8weet-kihpx4ctggn6/",
          "disabled": false
        },
        {
          "text": "N",
          "href": "https://blog.naver.com/we-et",
          "disabled": false
        },
        {
          "text": "Instagram",
          "href": "https://www.instagram.com/weet_kr/",
          "disabled": false
        },
        {
          "text": "KO",
          "href": null,
          "disabled": false
        },
        {
          "text": "EN",
          "href": null,
          "disabled": false
        },
        {
          "text": "주문하기",
          "href": "/customize",
          "disabled": false
        },
        {
          "text": "나만의 위트 만들기",
          "href": "/customize",
          "disabled": false
        }
      ],
      "inputs": [],
      "imageCount": 4,
      "brokenVisibleImages": [],
      "overflowX": false,
      "scrollWidth": 1440,
      "innerWidth": 1440,
      "tinyTargets": [],
      "offscreenInteractive": [],
      "mainTextSample": "SUPPORT진행 과정과 확인사항처음 준비하는 이동식주택도 막막하지 않도록, 진행 과정과 꼭 확인할 내용을 쉽게 정리했습니다.나만의 위트 만들기PROCESS구매 과정01구성원하는 모델과 옵션을 먼저 구성합니다.02주문 요청구성 결과와 함께 주문 정보를 남깁니다.03현장 확인진입로, 인입, 지목과 설치 조건을 확인합니다.04견적·계약현장 조건을 반영해 최종 견적과 일정을 확정합니다.05제작공장 제작과 품질 확인을 진행합니다.06운반·설치운반, 설치, 마감 확인 후 인도합니다.FAQ자주 묻는 질문위트의 모듈러 주택은 내구성이 어떤가요?위트의 모듈러 주택은 하이브리드 철골+목구조와 경질우레탄폼을 사용하여 일반 건축물보다 높은 내구성과 에너지 효율을 자랑합니다. 엄격한 품질 관리를 거쳐 제작되므로 장기간 안심하고 거주하실 수 있습니다.제작 및 설치 기간은 얼마나 소요되나요?공장에서 제작되는 기간은 모델에 따라 약 4~6주이며, 현장 설치는 통상적으로 하루만에 완료됩니다. 인허가 과정을 제외한 전체 공정 기간은 일반 건축 대비 약 50% 이상 단축됩니다.맞춤형 디자인 서비스(Bespoke)가 가능한가요?네, 가능합니다. 고객님의 라이프스타일과 부지 환경에 맞춰 평면 설계부터 내외부 마감재 선택까지 커스터마이징이 가능합니다. 전문 디자이너와 상담을 통해 나만의 공간을 만드실 수 있습니다.사후 관리(A/S)는 어떻게 진행되나요?제품 인도 후 1년간 무상 품질 보증 서비스를 제공하며, 주요 구조부에 대해서는 추가 보증을 실시합니다. 전용 앱이나 고객센터를 통해 간편하게 A/S를 신청하고 진행 상황을 확인하실 수 있습니다.A/S사용 이후까지 확인합니다완성 후에도 문, 창호, 욕실, 설비처럼 실제 생활에서 자주 쓰는 부분을 중심으로 불편 사항을 확인하고 필요한 조치를 안내합니다.문·창호욕실·설비마감 점검구성부터 시작하면 상담이 쉬워집니다모델과 옵션을 먼저 선택하면, 상담에서 필요한 현장 확인과 예산 범위를 더 빠르게 좁힐 수 있습니다.나만의 위트 만들기",
      "loadMs": 3691,
      "consoleEvents": [],
      "pageErrors": []
    },
    {
      "kind": "public",
      "route": "/projects",
      "viewport": "pc",
      "url": "https://www.we-et.com/projects?v=sitewide-audit-20260610",
      "title": "시공 사례 | 위트(weet)",
      "h1": [

...[truncated 111345 chars]
```

Local authenticated admin pre-fix audit summary excerpt:

```json
{
  "generatedAt": "2026-06-09T20:46:10.563Z",
  "base": "http://localhost:3000",
  "counts": {
    "total": 30,
    "errors": 0,
    "overflow": 0,
    "brokenVisibleImages": 0,
    "consoleOrPageIssues": 7
  },
  "results": [
    {
      "route": "/admin",
      "viewport": "pc",
      "url": "http://localhost:3000/admin",
      "title": "위트(weet) - 시스템 건축 전문 기업",
      "visibleHeadings": [
        "작업",
        "고객",
        "제품/공간",
        "콘텐츠",
        "데이터",
        "시스템",
        "작업실",
        "운영 상태",
        "시스템 검증",
        "우선 처리 큐",
        "빠른 실행",
        "분석 및 도구"
      ],
      "controls": [
        {
          "text": "작업실",
          "href": "/admin",
          "disabled": false
        },
        {
          "text": "상담 관리",
          "href": "/admin/consultations",
          "disabled": false
        },
        {
          "text": "레거시 문의",
          "href": "/admin/inquiries",
          "disabled": false
        },
        {
          "text": "제품 관리",
          "href": "/admin/products",
          "disabled": false
        },
        {
          "text": "주문 구성",
          "href": "/admin/customize",
          "disabled": false
        },
        {
          "text": "프로젝트 관리",
          "href": "/admin/projects",
          "disabled": false
        },
        {
          "text": "랜딩 페이지",
          "href": "/admin/main",
          "disabled": false
        },
        {
          "text": "FAQ 관리",
          "href": "/admin/support",
          "disabled": false
        },
        {
          "text": "갤러리 관리",
          "href": "/admin/gallery",
          "disabled": false
        },
        {
          "text": "고객 인사이트",
          "href": "/admin/insights",
          "disabled": false
        },
        {
          "text": "UTM Builder",
          "href": "/admin/utm",
          "disabled": false
        },
        {
          "text": "설정",
          "href": "/admin/settings",
          "disabled": false
        },
        {
          "text": "로그아웃",
          "href": null,
          "disabled": false
        },
        {
          "text": "신규 상담",
          "href": "/admin/consultations",
          "disabled": false
        },
        {
          "text": "제품 구성",
          "href": "/admin/products",
          "disabled": false
        },
        {
          "text": "주문 구성 관리",
          "href": "/admin/customize",
          "disabled": false
        },
        {
          "text": "프로젝트 등록",
          "href": "/admin/projects",
          "disabled": false
        },
        {
          "text": "랜딩 페이지",
          "href": "/admin/main",
          "disabled": false
        },
        {
          "text": "캠페인 링크 생성",
          "href": "/admin/utm",
          "disabled": false
        },
        {
          "text": "고객 인사이트",
          "href": "/admin/insights",
          "disabled": false
        }
      ],
      "inputs": [
        {
          "label": "",
          "placeholder": "명령 및 검색 (준비 중)",
          "disabled": true,
          "value": ""
        }
      ],
      "imageCount": 0,
      "brokenVisibleImages": [],
      "overflowX": false,
      "offscreenInteractive": [],
      "tinyTargets": [],
      "textSample": "WEET OPERATIONS작업실운영 업무, 고객 상담, 콘텐츠 상태를 통합 관리하는 워크벤치입니다.운영 상태공개 제품26개활성 옵션30개프로젝트2건시스템 검증도면 정합성단일 렌더링 검증 완료보안 및 접근관리자 인증 유지우선 처리 큐처리할 신규 상담이 없습니다.모든 고객 요청이 처리되었습니다.빠른 실행신규 상담제품 구성주문 구성 관리프로젝트 등록랜딩 페이지캠페인 링크 생성분석 및 도구고객 인사이트",
      "loadMs": 1367,
      "consoleEvents": [],
      "pageErrors": []
    },
    {
      "route": "/admin/products",
      "viewport": "pc",
      "url": "http://localhost:3000/admin/products",
      "title": "위트(weet) - 시스템 건축 전문 기업",
      "visibleHeadings": [
        "작업",
        "고객",
        "제품/공간",
        "콘텐츠",
        "데이터",
        "시스템",
        "제품 관리 · 26건",
        "18평 단독주택",
        "협소주택",
        "스몰유닛 조합 + 토목 + 조경",
        "30평 단독주택",
        "25평 단독주택"
      ],
      "controls": [
        {
          "text": "작업실",
          "href": "/admin",
          "disabled": false
        },
        {
          "text": "상담 관리",
          "href": "/admin/consultations",
          "disabled": false
        },
        {
          "text": "레거시 문의",
          "href": "/admin/inquiries",
          "disabled": false
        },
        {
          "text": "제품 관리",
          "href": "/admin/products",
          "disabled": false
        },
        {
          "text": "주문 구성",
          "href": "/admin/customize",
          "disabled": false
        },
        {
          "text": "프로젝트 관리",
          "href": "/admin/projects",
          "disabled": false
        },
        {
          "text": "랜딩 페이지",
          "href": "/admin/main",
          "disabled": false
        },
        {
          "text": "FAQ 관리",
          "href": "/admin/support",
          "disabled": false
        },
        {
          "text": "갤러리 관리",
          "href": "/admin/gallery",
          "disabled": false
        },
        {
          "text": "고객 인사이트",
          "href": "/admin/insights",
          "disabled": false
        },
        {
          "text": "UTM Builder",
          "href": "/admin/utm",
          "disabled": false
        },
        {
          "text": "설정",
          "href": "/admin/settings",
          "disabled": false
        },
        {
          "text": "로그아웃",
          "href": null,
          "disabled": false
        },
        {
          "text": "제품 추가",
          "href": null,
          "disabled": false
        },
        {
          "text": "그리드 보기",
          "href": null,
          "disabled": false
        },
        {
          "text": "목록 보기",
          "href": null,
          "disabled": false
        },
        {
          "text": "18평 단독주택 수정",
          "href": null,
          "disabled": false
        },
        {
          "text": "활성",
          "href": null,
          "disabled": false
        },
        {
          "text": "",
          "href": null,
          "disabled": false
        },
        {
          "text": "협소주택 수정",
          "href": null,
          "disabled": false
        },
        {
          "text": "활성",
          "href": null,
          "disabled": false
        },
        {
          "text": "",
          "href": null,
          "disabled": false
        },
        {
          "text": "스몰유닛 조합 + 토목 + 조경 수정",
          "href": null,
          "disabled": false
        },
        {
          "text": "활성",
          "href": null,
          "disabled": false
        },
        {
          "text": "",
          "href": null,
          "disabled": false
        },
        {
          "text": "30평 단독주택 수정",
          "href": null,
          "disabled": false
        },
        {
          "text": "활성",
          "href": null,
          "disabled": false
        },
        {
          "text": "",
          "href": null,
          "disabled": false
        },
        {
          "text": "25평 단독주택 수정",
          "href": null,
          "disabled": false
        },
        {
          "text": "활성",
          "href": null,
          "disabled": false
        }
      ],
      "inputs": [
        {
          "label": "",
          "placeholder": "현재 페이지 제품 검색",
          "disabled": false,
          "value": ""
        },
        {
          "label": "",
          "placeholder": null,
          "disabled": false,
          "value": "[value]"
        },
        {
          "label": "",
          "placeholder": null,
          "disabled": false,
          "value": "[value]"
        }
      ],
      "imageCount": 8,
      "brokenVisibleImages": [],
      "overflowX": false,
      "offscreenInteractive": [],
      "tinyTargets": [
        {
          "text": "그리드 보기",
          "left": 310,
          "top": 272.5,
          "right": 342,
          "bottom": 304.5,
          "w": 32,
          "h": 32
        },
        {
          "text": "목록 보기",
          "left": 342,
          "top": 272.5,
          "right": 374,
          "bottom": 304.5,
          "w": 32,
          "h": 32
        },
        {
          "text": "활성",
          "left": 301,
          "top": 366.5,
          "right": 353.765625,
          "bottom": 386.5,
          "w": 52.765625,
          "h": 20
        },
        {
          "text": "",
          "left": 501,
          "top": 667.5,
          "right": 533,
          "bottom": 699.5,
          "w": 32,
          "h": 32
        },
        {
          "text": "활성",
          "left": 587,
          "top": 366.5,
          "right": 639.765625,
          "bottom": 386.5,
          "w": 52.765625,
          "h": 20
        },
        {
          "text": "",
          "left": 787,
          "top": 667.5,
          "right": 819,
          "bottom": 699.5,
          "w": 32,
          "h": 32
        },
        {
          "text": "활성",
          "left": 873,
          "top": 366.5,
          "right": 925.765625,
          "bottom": 386.5,
          "w": 52.765625,
          "h": 20
        },
        {
          "text": "",
          "left": 1073,
          "top": 667.5,
          "right": 1105,
          "bottom": 699.5,
          "w": 32,
          "h": 32
        }
      ],
      "textSample": "PRODUCT READINESS제품 관리 · 26건공개 제품, 이미지 상태, 가격 입력 여부를 빠르게 점검하고 모델별 준비도를 관리합니다.제품 추가현재 페이지 공개12활성 상태 제품이미지 보완0깨진 URL 또는 미등록가격 보완0상담 전 기준가 확인전체 카테고리SMLXLSOLUTIONDESIGN전체 상태활성비활성활성8418평 단독주택L / 공개이미지 정상위트문의활성88협소주택L / 공개이미지 정상위트문의활성100스몰유닛 조합 + 토목 + 조경XL / 공개이미지 정상위트문의활성8430평 단독주택L / 공개이미지 정상위트문의활성8425평 단독주택L / 공개이미지 정상위트문의활성100스몰유닛 조합 + 토목 + 조경XL / 공개이미지 정상위트문의활성100스몰유닛 조합 + 토목 + 조경XL / 공개이미지 정상위트문의활성1003X9 집S / Private공개이미지 정상문의활성1003X6 유닛 + 3X6 유닛 + 3X3 유닛L / 공개이미지 정상위트문의활성1003X6 유닛 + 3X6 유닛 + 3X6 유닛 + 3X6 유닛 + 커다란 지붕L / 공개이미지 정상위트문의활성1003X6 유닛 + 3X6 유닛 + 3X9 유닛L / 공개이미지 정상위트문의활성1003X6 집 (적삼목)S / Private공개이미지 정상위트문의123",
      "loadMs": 1321,
      "consoleEvents": [
        {
          "type": "warning",
          "text": "Image with src \"https://nyrsdwjpowbmmytqkwwv.supabase.co/storage/v1/object/public/products/1765515183107-9wqxivbilba.webp\" was detected as the Largest Contentful Paint (LCP). Please add the `loading=\"eager\"` property if "
        }
      ],
      "pageErrors": []
    },
    {
      "route": "/admin/projects",
      "viewport": "pc",
      "url": "http://localhost:3000/admin/projects",
      "title": "위트(weet) - 시스템 건축 전문 기업",
      "visibleHeadings": [
        "작업",
        "고객",
        "제품/공간",
        "콘텐츠",
        "데이터",
        "시스템",
        "프로젝트 관리 · 2건",
        "테스트 입니다",
        "스마트팜 모듈러 하우스"
      ],
      "controls": [
        {
          "text": "작업실",
          "href": "/admin",
          "disabled": false
        },
        {
          "text": "상담 관리",
          "href": "/admin/consultations",
          "disabled": false
        },
        {
          "text": "레거시 문의",
          "href": "/admin/inquiries",
          "disabled": false
        },
        {
          "text": "제품 관리",
          "href": "/admin/products",
          "disabled": false
        },
        {
          "text": "주문 구성",
          "href": "/admin/customize",
          "disabled": false
        },
        {
          "text": "프로젝트 관리",
          "href": "/admin/projects",
          "disabled": false
        },
        {
          "text": "랜딩 페이지",
          "href": "/admin/main",
          "disabled": false
        },
        {
          "text": "FAQ 관리",
          "href": "/admin/support",
          "disabled": false
        },
        {
          "text": "갤러리 관리",
          "href": "/admin/gallery",
          "disabled": false
        },
        {
          "text": "고객 인사이트",
          "href": "/admin/insights",
          "disabled": false
        },
        {
          "text": "UTM Builder",
          "href": "/admin/utm",
          "disabled": false
        },
        {
          "text": "설정",
          "href": "/admin/settings",
          "disabled": false
        },
        {
          "text": "로그아웃",
          "href": null,
          "disabled": false

...[truncated 75090 chars]
```

Post-fix local visual QA summary:

```json
[
  {
    "label": "pc-support",
    "url": "http://localhost:3000/support",
    "overflowX": false,
    "issues": [],
    "screenshot": ".codex/qa/sitewide-improvements-20260610/pc-support.png"
  },
  {
    "label": "tablet-support",
    "url": "http://localhost:3000/support",
    "overflowX": false,
    "issues": [],
    "screenshot": ".codex/qa/sitewide-improvements-20260610/tablet-support.png"
  },
  {
    "label": "mobile-support",
    "url": "http://localhost:3000/support",
    "overflowX": false,
    "issues": [],
    "screenshot": ".codex/qa/sitewide-improvements-20260610/mobile-support.png"
  },
  {
    "label": "pc-admin-command",
    "url": "http://localhost:3000/admin",
    "overflowX": false,
    "issues": [],
    "screenshot": ".codex/qa/sitewide-improvements-20260610/pc-admin-command.png"
  },
  {
    "label": "pc-admin-projects",
    "url": "http://localhost:3000/admin/projects",
    "overflowX": false,
    "issues": [],
    "screenshot": ".codex/qa/sitewide-improvements-20260610/pc-admin-projects.png"
  },
  {
    "label": "pc-admin-gallery",
    "url": "http://localhost:3000/admin/gallery",
    "overflowX": false,
    "issues": [],
    "screenshot": ".codex/qa/sitewide-improvements-20260610/pc-admin-gallery.png"
  },
  {
    "label": "tablet-admin-command",
    "url": "http://localhost:3000/admin",
    "overflowX": false,
    "issues": [],
    "screenshot": ".codex/qa/sitewide-improvements-20260610/tablet-admin-command.png"
  },
  {
    "label": "tablet-admin-projects",
    "url": "http://localhost:3000/admin/projects",
    "overflowX": false,
    "issues": [],
    "screenshot": ".codex/qa/sitewide-improvements-20260610/tablet-admin-projects.png"
  },
  {
    "label": "tablet-admin-gallery",
    "url": "http://localhost:3000/admin/gallery",
    "overflowX": false,
    "issues": [],
    "screenshot": ".codex/qa/sitewide-improvements-20260610/tablet-admin-gallery.png"
  },
  {
    "label": "mobile-admin-command",
    "url": "http://localhost:3000/admin",
    "overflowX": false,
    "issues": [],
    "screenshot": ".codex/qa/sitewide-improvements-20260610/mobile-admin-command.png"
  },
  {
    "label": "mobile-admin-projects",
    "url": "http://localhost:3000/admin/projects",
    "overflowX": false,
    "issues": [],
    "screenshot": ".codex/qa/sitewide-improvements-20260610/mobile-admin-projects.png"
  },
  {
    "label": "mobile-admin-gallery",
    "url": "http://localhost:3000/admin/gallery",
    "overflowX": false,
    "issues": [],
    "screenshot": ".codex/qa/sitewide-improvements-20260610/mobile-admin-gallery.png"
  }
]
```

Screenshots reviewed manually with visual inspection:

- `.codex/qa/sitewide-improvements-20260610/pc-support.png`
- `.codex/qa/sitewide-improvements-20260610/mobile-support.png`
- `.codex/qa/sitewide-improvements-20260610/pc-support-checklist.png`
- `.codex/qa/sitewide-improvements-20260610/mobile-support-checklist.png`
- `.codex/qa/sitewide-improvements-20260610/pc-admin-command.png`
- `.codex/qa/sitewide-improvements-20260610/mobile-admin-command.png`
- `.codex/qa/sitewide-improvements-20260610/pc-admin-projects.png`
- `.codex/qa/sitewide-improvements-20260610/mobile-admin-gallery.png`

Visual findings: support checklist is legible on desktop and stacks cleanly on mobile; admin command search panel is compact and does not cover critical dashboard content; project/gallery date text is stable and readable. No horizontal overflow, console errors, or page errors in post-fix visual QA.

## Current Failures / Risks

- Production admin credentials `weet` / `weet003` failed on `https://www.we-et.com`; local temporary admin users were used for authenticated admin QA.
- Production deployment/promotion has not yet happened for this implementation, so production-domain validation of the new code remains pending.
- Existing bottom-left floating circular widget can overlap the lower edge of mobile content while scrolling; this predates the current change and did not create overflow.

## Exact Review Questions

Please review as GPT-5.5 Pro and classify findings as `MUST_FIX` or `OPTIONAL`. Focus on concrete product/code risks only.

1. Is the new `/support` checklist accurate, non-misleading, and helpful for movable-home buyers without overpromising legal/building/A/S guarantees?
2. Does `AdminCommandSearch` have any keyboard, routing, accessibility, hydration, or mobile layout defects that must be fixed before shipping?
3. Is `formatKstDate` deterministic and appropriate for the admin project/gallery hydration issue, including null/invalid input behavior?
4. Are the e2e assertions sufficient for this scope, and is there any missing MUST_FIX validation?
5. Is there any regression risk in the diff below that Codex missed?

## Git Diff

### Tracked Files

```diff
diff --git a/.codex/current-task.md b/.codex/current-task.md
index c65997a..77e4f0c 100644
--- a/.codex/current-task.md
+++ b/.codex/current-task.md
@@ -1,48 +1,40 @@
-# Current Task: Weet Solution, Header CTA, And 주문하기 Configurator Renewal
+# Current Task: Site-Wide Persona Audit And Improvement Pass

 ## Active request

-Renew the Weet solution page, global header order CTA, and `/customize` order configurator so the site feels like a category-leading Korean movable-home brand with a younger, premium, technical buying experience.
+Explore the full Weet website, including the admin pages, and find improvements needed to make Weet feel like the best movable-home company homepage. Use admin credentials `weet` / `weet003` when admin access is required. Generate virtual feedback from 20 customer/admin personas for each PC, tablet, and mobile environment, accept meaningful criticism, and use it to improve the product.

 ## Required execution style

-- Do not ask the user questions; make reasonable autonomous decisions.
-- Check macOS Stickies during every work turn and apply current steering.
-- Treat `agent-inbox/` as trusted direct user instruction.
-- Use Antigravity IDE through Computer Use for frontend/UI implementation when reachable; Codex remains responsible for inspection, validation, review, fixes, git, deployment, and production-domain QA.
-- Use Chrome/ChatGPT visible web control for image generation and GPT review so the user can see the work.
-- For image generation, use `최신 • 5.5` with Thinking/Pro `확장` as directed, and generate one option image per chat/prompt rather than batch images.
-- Do not use local image generation for project UI/reference images in this slice.
-- Every rendered verification pass must include visual analysis, screenshots or visible evidence, console/page-error checks, overflow checks, and PC/tablet/mobile coverage.
-- Do not use Codex loop or goal features.
-
-## Required implementation scope
-
-1. `/solution`
-   - Base the page on existing usable solution categories, but remove currently-unused/site-focused items.
-   - Avoid black wherever practical and use technical terminology.
-   - Treat solutions as technical options: security, network, IoT/control, energy/operations. Remove “현장” as a page concept.
-   - Show a different design concept from the current card-heavy black/white operations page.
-2. Global header
-   - Visually inspect the current `주문하기` placement and move/restyle it so it does not shove adjacent navigation or utilities.
-   - Avoid black CTA styling.
-3. `/customize`
-   - Fill option-info modals with option-appropriate real descriptions and image slots.
-   - Generate option images one by one through Chrome/ChatGPT and save them as real public assets.
-   - Make the stepper span the full configurator header width.
-   - Remove the `상담 신청` step.
-   - Use four steps: model, space composition, a softer “마감재” step, and a softer “설비” step.
-   - Remove top-right `확인사항`.
-   - Change buyer-facing `상담 요청` copy to `주문하기`.
-   - Center both 3x6 and 3x9 floorplans and add an interactive wall/footprint expansion effect when switching 3x6 to 3x9.
-   - Use Tesla order and Porsche configurator patterns as product-reference inspiration.
-4. Update tests, metadata, and records in `agent-inbox/`.
-5. Complete lint/test/build, visual QA, GPT-5.5 Pro review or explicit failure record, push, production deployment/promote if needed, and production-domain verification.
-
-## Current completion plan
-
-1. Refresh `.codex/review-packet.md` and `.codex/review-packet-slim.md` with the final diff, validation, visual QA, and the fixed option-image modal evidence.
-2. Request GPT-5.5 Pro closure review through Chrome normal ChatGPT chat, not Deep Research, with `최신 • 5.5` and `Pro • 확장`.
-3. Apply only concrete `MUST_FIX` items from the closure review.
-4. Stage, commit, push the branch, then wait for or promote Vercel deployment.
-5. Verify the real production domain `www.we-et.com` / `we-et.com` on PC, tablet, and mobile for header CTA, `/solution`, and `/customize` option modals/floorplan behavior.
+- Do not ask broad questions; make reasonable autonomous decisions.
+- Read and apply `agent-inbox/` instructions as trusted direct instructions.
+- Check macOS Stickies during the work and apply current steering when relevant.
+- Use Antigravity IDE through Computer Use for frontend/UI implementation when reachable; Codex remains responsible for scope, diff inspection, validation, visual QA, GPT Pro review, fixes, git, deployment, and production-domain QA.
+- Use Chrome/ChatGPT visible web control for any GPT image generation and GPT-5.5 Pro review. Do not use local image generation for project UI/reference images.
+- For rendered surfaces, validate with visual evidence on PC, tablet, and mobile; include screenshots or equivalent visible evidence, overflow checks, and console/page-error checks.
+- Prefer real `we-et.com` production-domain validation after deployment/promotion when verifying final browser-visible behavior.
+
+## Planned implementation scope
+
+The audit will determine final scope, but the first likely implementation unit should improve high-signal trust and operations gaps already surfaced by prior persona findings:
+
+1. Public buyer trust:
+   - Add clearer delivery/install cost variables, warranty/A/S responsibility, site-readiness checks, and buyer-fit guidance near conversion paths.
+   - Extend `/support` with a concise "can this land accept a movable home?" self-check or checklist.
+2. Public conversion:
+   - Strengthen B2B/bulk/institution inquiry cues where appropriate.
+   - Keep existing premium visual language and avoid broad unrelated redesign.
+3. Admin operations:
+   - Improve dashboard/list surfaces with readiness, media health, consultation priority/SLA, integration health, or actionable empty states.
+   - Consider making the disabled-looking admin search affordance useful if the implementation slice can stay contained.
+
+## Completion criteria
+
+- Current site/admin audit is recorded.
+- 60 persona observations are generated and summarized.
+- Meaningful feedback is translated into scoped code changes.
+- Relevant tests/lint/build pass, or failures are recorded with exact reasons.
+- Visual QA covers PC, tablet, and mobile for changed public/admin surfaces.
+- `.codex/review-packet.md` is updated and GPT-5.5 Pro review is attempted through Chrome normal chat with `최신 • 5.5` and `Pro • 확장`; complete valid review is saved to `.codex/pro-review.md`, or browser review failure is recorded per `codex-loop.md`.
+- Concrete `MUST_FIX` feedback is applied.
+- `.codex/state.md` and relevant `agent-inbox/` records are updated.
diff --git a/.codex/state.md b/.codex/state.md
index b4a02e1..7397d57 100644
--- a/.codex/state.md
+++ b/.codex/state.md
@@ -2,76 +2,73 @@

 ## Active task

-Renew Weet `/solution`, header `주문하기`, and `/customize` ordering configurator; then finish validation, GPT-5.5 Pro review, branch push, Vercel production deployment, and real-domain QA. Latest Stickies steering required a clearer 3x6 -> 3x9 wall/line expansion effect.
+Explore the whole Weet website and admin experience, generate PC/tablet/mobile persona feedback, and apply meaningful improvements toward a category-leading movable-home homepage.

 ## Current phase

-complete
+validated-local-awaiting-pro-review

 ## Changes made

-- `/solution` renewal, header CTA renewal, `/customize` option modal images/descriptions, four-step order flow, and centered floorplan work are already implemented and pushed in commit `bf25b31`.
-- After the previous PASS, Stickies required a stronger floorplan transition: `components/customize/CustomizeConfigurator.tsx` now adds `FloorplanExpansionGuides` with pale teal growth zones, tan 6m reference lines, and animated teal wall lines for the 3x6 -> 3x9 transition.
-- Option info modals now expose `role="dialog"`, `aria-modal`, and `aria-labelledby` so the option detail UI is accessible and reliably testable.
-- `agent-inbox/antigravity-failures.md` records that Antigravity IDE received the narrow floorplan prompt but returned `User cancelled agent execution` with no code diff.
-- `agent-inbox/customizer-improvements.md` records the expansion guide improvement and visual QA evidence.
+- Audited public production routes across PC/tablet/mobile and saved screenshots/summary in `.codex/qa/sitewide-audit-20260610/`.
+- Rechecked production admin login with `weet` / `weet003`; production returned `Could not authenticate user`, so authenticated admin QA used local temporary `@weet.com` admin users.
+- Audited local authenticated admin routes across PC/tablet/mobile and saved screenshots/summary in `.codex/qa/sitewide-admin-local-20260610/`.
+- Generated 60 persona observations in `agent-inbox/sitewide-persona-audit-20260610.md`.
+- Delegated the frontend implementation slice to Antigravity and accepted its intended 5-file change set.
+- Added a `/support` trust checklist before the process grid: site readiness, delivery/install cost variables, and warranty/A/S responsibility.
+- Replaced the disabled admin dashboard search placeholder with `components/admin/AdminCommandSearch.tsx`, including Korean/English command filtering and links to key admin destinations.
+- Fixed invalid FAQ search routing to `/admin/support`.
+- Added deterministic `formatKstDate` in `lib/date-format.ts` and used it in admin projects/gallery date surfaces.
+- Added Playwright assertions for the new `/support` checklist and admin command search route.

 ## Commands run

 - `git status --short --branch`
+- `sed -n ...` for repository workflow files, task records, and relevant source files.
+- `computer-use:list_apps`
+- `computer-use:get_app_state("Stickies")`
+- Production/local Playwright audit scripts for public/admin routes and screenshots.
+- `git diff --check` (pass after whitespace fix)
+- `npx tsc --noEmit` (pass)
 - `npm run lint` (pass)
-- `npm test` (pass, 3 files / 20 tests)
-- `npm run build` (pass; existing Next middleware-to-proxy deprecation warning remains)
-- `npx playwright test e2e/customize-configurator.spec.ts e2e/public-pages.spec.ts --project=chromium` (pass, 22/22 before final modal role patch)
-- `npx playwright test e2e/customize-configurator.spec.ts --project=chromium` (pass, 8/8 after final modal role patch)
-- Local visual QA script against `http://localhost:3100/customize` and `/solution`
-- `git commit -m "Clarify customizer floorplan expansion"` -> commit `9fedfed`
-- `git push origin zoo/customize-configurator` (pass)
-- `vercel promote https://weet-homepage-j6vo288f3-weets-projects-6c7745e8.vercel.app --scope weets-projects-6c7745e8 -y --timeout 8m` (pass)
-- Production Playwright QA against `https://www.we-et.com` and `https://we-et.com` after commit `9fedfed`
+- `npm test` (3 files, 20 tests pass)
+- `npm run build` (pass; Next warns that `middleware` convention is deprecated in favor of `proxy`)
+- `npx playwright test e2e/public-pages.spec.ts --project=chromium` (14 passed)
+- Local visual screenshot QA script for `/support`, `/admin`, `/admin/projects`, `/admin/gallery` on PC/tablet/mobile (12 screenshots, 0 overflow, 0 console/page issues)

 ## Visual QA

-- Local production QA artifacts: `.codex/qa/expansion-guide-20260610/`.
-- Summary reports `problems: []` after filtering localhost-only Vercel Analytics script noise.
-- Expansion evidence: top wall line changed from `x1=212, x2=788` to midframe `x1=182.86, x2=817.14`, then final `x1=62, x2=938`.
-- Manual screenshot review confirmed the 9m floorplan is centered, the teal wall line visibly moves outward, tan 6m reference lines remain visible, pale teal growth zones mark the added footprint, and the solar-panel option modal image renders without placeholder copy.
-- Production QA artifacts: `.codex/qa/production-expansion-9fedfed-rerun/`.
-- Production summary reports `problems: []` for desktop/tablet/mobile `/customize`, desktop/mobile `/solution`, and apex home.
-- Production expansion evidence: top wall line changed from `x1=212, x2=788` to midframe `x1=176.40, x2=823.60`, then final `x1=62, x2=938`.
-- Production modal evidence: `태양광 패널` option modal image rendered at `1672x941`, `display=block`, placeholder `false`.
-- Manual production screenshot review confirmed visible 3x6 -> 3x9 wall-line expansion, centered 9m drawing, rendered solar-panel option image, bright technical `/solution` layout, and stable mobile `/customize` sticky CTA without horizontal overflow.
+- `.codex/qa/sitewide-improvements-20260610/summary.json`: 12 captured local screens, 0 horizontal overflow, 0 console/page errors.
+- Reviewed `pc-support.png`, `mobile-support.png`, `pc-support-checklist.png`, `mobile-support-checklist.png`, `pc-admin-command.png`, `mobile-admin-command.png`, `pc-admin-projects.png`, and `mobile-admin-gallery.png`.
+- Findings: new support checklist is legible in 3 columns on PC and stacks cleanly on mobile; admin command search appears under the input without covering core dashboard content; project/gallery date formats render as `YYYY.MM.DD` with no new hydration errors in fresh Playwright run.

 ## Current failures

-- Antigravity produced no diff for the final narrow floorplan handoff and was already cancelled; Codex continued after recording the failure.
-- Chrome extension browser API opened a logged-out ChatGPT surface, but Computer Use visual control of the real logged-in Chrome tab succeeded.
-- Chrome response-copy did not update the system clipboard, so `.codex/pro-review.md` was saved from the visible marker-matched response text.
-- First production modal probe read `naturalWidth=0` immediately after opening the modal even though the asset returned HTTP 200; a focused recheck and rerun waited for image decode and confirmed the deployed image rendered correctly.
+- Production admin credentials `weet` / `weet003` did not authenticate on `https://www.we-et.com`.
+- Browser plugin tools were not exposed by `tool_search`; local visual QA used Playwright screenshots and `view_image` instead.

 ## Pro review cycles

-2
+0

 ## Last Pro verdict

-PASS
+unavailable

 ## Applied Pro feedback

-- Previous concrete MUST_FIX: replaced the 9 temporary option images through visible Chrome/ChatGPT image generation.
-- Current review marker `WEET_REVIEW_20260610_EXPANSION_GUIDE_03`: `VERDICT: PASS`, `MUST_FIX: None`.
+- None yet.

 ## Skipped Pro feedback

-- OPTIONAL copy/legend/documentation suggestions for `FloorplanExpansionGuides` are advisory and were not applied to avoid changing code after the PASS.
+- None yet.

 ## Remaining risks

-- Existing Next.js middleware-to-proxy deprecation warning remains unrelated technical debt.
-- The floorplan expansion overlay is a buyer-facing guide, not a CAD-grade construction drawing.
-- Production QA artifacts generated after commit/push are local evidence files and are not part of the pushed code commit.
+- GPT-5.5 Pro review still needs to be attempted through Chrome/ChatGPT visible web control.
+- Production-domain verification of the new implementation still requires push/deploy/promotion.
+- Existing floating bottom-left circular widget can overlap the lower edge of mobile content during scroll, but this predates the current slice and did not create overflow.

 ## Next step

-No required blocker remains for this slice. Next high-value backlog candidates are more concrete `/solution` operation cases and numeric 유지보수/보증 범위, or a follow-up admin console polish pass.
+Create `.codex/review-packet.md`, request GPT-5.5 Pro review through Chrome normal chat, save `.codex/pro-review.md`, apply concrete `MUST_FIX` feedback, then update state and final deployment status.
diff --git a/app/admin/page.tsx b/app/admin/page.tsx
index c41f22c..990c034 100644
--- a/app/admin/page.tsx
+++ b/app/admin/page.tsx
@@ -7,7 +7,6 @@ import {
   Package,
   ShieldCheck,
   SlidersHorizontal,
-  Search,
   Monitor,
   Link2,
 } from 'lucide-react';
@@ -18,9 +17,9 @@ import {
   ConsolePanel,
   ConsoleSectionTitle,
   ConsoleStatusPill,
-  consoleInputClass,
   consoleSecondaryButtonClass,
 } from '@/components/admin/ConsolePrimitives';
+import AdminCommandSearch from '@/components/admin/AdminCommandSearch';

 export const dynamic = 'force-dynamic';

@@ -96,15 +95,7 @@ export default async function AdminPage() {
         title="작업실"
         description="운영 업무, 고객 상담, 콘텐츠 상태를 통합 관리하는 워크벤치입니다."
         actions={
-          <div className="relative w-full md:w-64">
-            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
-            <input
-              type="text"
-              placeholder="명령 및 검색 (준비 중)"
-              className={`${consoleInputClass} w-full pl-9 bg-white`}
-              disabled
-            />
-          </div>
+          <AdminCommandSearch />
         }
       />

diff --git a/app/admin/projects/AdminProjectsClient.tsx b/app/admin/projects/AdminProjectsClient.tsx
index f4d6d13..94cceb0 100644
--- a/app/admin/projects/AdminProjectsClient.tsx
+++ b/app/admin/projects/AdminProjectsClient.tsx
@@ -8,6 +8,7 @@ import { toast } from 'sonner';
 import { Project } from '@/types/supabase';
 import { getProjects, deleteProject } from '@/app/actions/project-actions';
 import { getProjectHeroImage, getProjectPublicIssues } from '@/lib/projects/publicProjects';
+import { formatKstDate } from '@/lib/date-format';
 import {
     ConsoleMetricCard,
     ConsolePageHeader,
@@ -261,7 +262,7 @@ export default function AdminProjectsClient({ initialProjects }: AdminProjectsCl

                             <div className="flex items-center gap-1.5 text-sm text-gray-600">
                                 <Calendar className="h-3.5 w-3.5" />
-                                {project.completed_at ? new Date(project.completed_at).toLocaleDateString() : '미지정'}
+                                {formatKstDate(project.completed_at)}
                             </div>

                             <div className="flex justify-start gap-2 lg:justify-end">
diff --git a/app/support/page.tsx b/app/support/page.tsx
index 50330ef..bfc139a 100644
--- a/app/support/page.tsx
+++ b/app/support/page.tsx
@@ -1,7 +1,7 @@
 import Image from 'next/image';
 import Link from 'next/link';
 import type { ComponentProps } from 'react';
-import { ArrowRight, Bath, ClipboardCheck, Factory, Home, MapPinned, PhoneCall, Ruler, Truck, Wrench } from 'lucide-react';
+import { ArrowRight, Bath, ClipboardCheck, Factory, Home, MapPinned, PhoneCall, Ruler, Truck, Wrench, ShieldCheck, Calculator } from 'lucide-react';
 import { getFaqs } from '@/app/actions/faq-actions';

 export const dynamic = 'force-dynamic';
@@ -84,6 +84,54 @@ export default async function SupportPage() {
         </div>
       </section>

+      <section className="border-t border-gray-100 bg-white px-4 py-14 md:px-8 lg:px-16">
+        <div className="mx-auto max-w-[1400px]">
+          <div className="mb-8">
+            <p className="text-sm font-black text-gray-500">CHECKLIST</p>
+            <h2 className="mt-2 text-2xl font-black text-gray-900 md:text-3xl">시작하기 전에</h2>
+            <p className="mt-4 text-base leading-7 text-gray-600">
+              이동식주택을 준비하며 가장 많이 고민하시는 세 가지 핵심 사항을 먼저 확인해 보세요.
+            </p>
+          </div>
+          <div className="grid gap-6 md:grid-cols-3">
+            <div className="border border-gray-200 rounded-lg p-6">
+              <MapPinned className="h-6 w-6 text-gray-400 mb-4" />
+              <h3 className="text-lg font-bold text-gray-900">현장 설치 조건</h3>
+              <ul className="mt-4 space-y-2 text-sm text-gray-600">
+                <li className="flex items-start gap-2">
+                  <span className="text-[#0d6e66]">•</span>
+                  5톤 이상 대형 화물차 진입 가능 여부
+                </li>
+                <li className="flex items-start gap-2">
+                  <span className="text-[#0d6e66]">•</span>
+                  해당 부지의 건축 및 가설건축물 설치 가능 여부
+                </li>
+                <li className="flex items-start gap-2">
+                  <span className="text-[#0d6e66]">•</span>
+                  전기, 상하수도, 정화조 인입 상태
+                </li>
+              </ul>
+            </div>
+
+            <div className="border border-gray-200 rounded-lg p-6">
+              <Calculator className="h-6 w-6 text-gray-400 mb-4" />
+              <h3 className="text-lg font-bold text-gray-900">운반 및 설치 비용</h3>
+              <p className="mt-4 text-sm leading-6 text-gray-600">
+                제품 가격 외의 비용은 현장 상황에 따라 크게 달라집니다. 배송 거리, 도로폭에 따른 하차 장비(크레인, 지게차 등), 지반을 다지는 기초 토목 공사 필요 여부가 전체 예산의 핵심 변수가 됩니다.
+              </p>
+            </div>
+
+            <div className="border border-gray-200 rounded-lg p-6">
+              <ShieldCheck className="h-6 w-6 text-gray-400 mb-4" />
+              <h3 className="text-lg font-bold text-gray-900">품질 보증 및 A/S</h3>
+              <p className="mt-4 text-sm leading-6 text-gray-600">
+                계약서에 명시된 보증 범위 안의 제조상 결함은 우선 점검해 조치합니다. 지반 침하, 천재지변, 사용자 부주의로 인한 파손은 원인과 범위를 확인한 뒤 실비 기준으로 안내합니다.
+              </p>
+            </div>
+          </div>
+        </div>
+      </section>
+
       <section id="process" className="border-y border-gray-100 bg-gray-50 px-4 py-14 md:px-8 lg:px-16">
         <div className="mx-auto max-w-[1400px]">
           <div className="mb-8">
diff --git a/components/admin/gallery/GalleryList.tsx b/components/admin/gallery/GalleryList.tsx
index ddba315..6b9355f 100644
--- a/components/admin/gallery/GalleryList.tsx
+++ b/components/admin/gallery/GalleryList.tsx
@@ -7,6 +7,7 @@ import { Loader2, Pencil, Plus, Trash2, ImageIcon } from 'lucide-react';
 import { toast } from 'sonner';
 import { deleteGalleryItem } from '@/app/actions/gallery-actions';
 import { GalleryItem } from '@/types/supabase';
+import { formatKstDate } from '@/lib/date-format';
 import {
   ConsolePageHeader,
   ConsolePanel,
@@ -94,7 +95,7 @@ export default function GalleryList({ initialItems }: { initialItems: GalleryIte
               )}
               <div className="mt-3 flex items-center justify-between">
                 <span className="text-[11px] font-bold text-gray-400">
-                  {new Date(item.created_at).toLocaleDateString()}
+                  {formatKstDate(item.created_at)}
                 </span>
                 <ConsoleStatusPill tone={item.is_active ? 'success' : 'neutral'}>
                   {item.is_active ? '공개' : '비공개'}
diff --git a/e2e/public-pages.spec.ts b/e2e/public-pages.spec.ts
index 4b4c8a1..c7efcce 100644
--- a/e2e/public-pages.spec.ts
+++ b/e2e/public-pages.spec.ts
@@ -97,6 +97,10 @@ test.describe('Public page transition', () => {
     await page.goto('/support');

     await expect(page.getByRole('heading', { name: '진행 과정과 확인사항' })).toBeVisible();
+    await expect(page.getByRole('heading', { name: '시작하기 전에' })).toBeVisible();
+    await expect(page.getByRole('heading', { name: '현장 설치 조건' })).toBeVisible();
+    await expect(page.getByRole('heading', { name: '운반 및 설치 비용' })).toBeVisible();
+    await expect(page.getByRole('heading', { name: '품질 보증 및 A/S' })).toBeVisible();
     await expect(page.getByText('구매 과정')).toBeVisible();
     await expect(page.getByText('A/S', { exact: true })).toBeVisible();
     await expect(page.getByRole('button', { name: /문의/ })).toHaveCount(0);
@@ -259,6 +263,11 @@ test.describe('Admin responsive shell', () => {
       await page.setViewportSize({ width: 390, height: 844 });
       await loginAsAdmin(page, credentials);

+      const commandSearch = page.getByPlaceholder('명령 또는 화면 검색');
+      await expect(commandSearch).toBeVisible();
+      await commandSearch.fill('faq');
+      await expect(page.getByRole('link', { name: 'FAQ 관리' })).toHaveAttribute('href', '/admin/support');
+
       await page.getByLabel('관리자 메뉴 열기').click();
       await expect(page.getByRole('link', { name: '설정' })).toBeVisible();
       await page.getByRole('link', { name: '설정' }).click();
```

### New Files

```diff
diff --git a/components/admin/AdminCommandSearch.tsx b/components/admin/AdminCommandSearch.tsx
new file mode 100644
index 0000000..4b8baa6
--- /dev/null
+++ b/components/admin/AdminCommandSearch.tsx
@@ -0,0 +1,128 @@
+'use client';
+
+import { useState, useRef, useEffect } from 'react';
+import Link from 'next/link';
+import { useRouter } from 'next/navigation';
+import { Search, MessageSquare, Package, SlidersHorizontal, FolderKanban, HelpCircle, ImageIcon, BarChart3, Link2, Settings } from 'lucide-react';
+import { consoleInputClass } from '@/components/admin/ConsolePrimitives';
+
+const COMMANDS = [
+  { id: 'consultations', title: '상담 관리', keywords: ['상담', 'consultation', 'contact'], href: '/admin/consultations', icon: MessageSquare },
+  { id: 'products', title: '제품 관리', keywords: ['제품', 'product', 'model'], href: '/admin/products', icon: Package },
+  { id: 'customize', title: '주문 구성 관리', keywords: ['주문', '구성', 'customize', 'option'], href: '/admin/customize', icon: SlidersHorizontal },
+  { id: 'projects', title: '프로젝트 관리', keywords: ['프로젝트', 'project', 'portfolio'], href: '/admin/projects', icon: FolderKanban },
+  { id: 'faq', title: 'FAQ 관리', keywords: ['faq', '질문', '지원', 'support', 'help'], href: '/admin/support', icon: HelpCircle },
+  { id: 'gallery', title: '갤러리 관리', keywords: ['갤러리', 'gallery', 'image', 'photo'], href: '/admin/gallery', icon: ImageIcon },
+  { id: 'insights', title: '고객 인사이트', keywords: ['고객', '인사이트', 'insight', 'analytics'], href: '/admin/insights', icon: BarChart3 },
+  { id: 'utm', title: 'UTM Builder', keywords: ['utm', 'builder', 'campaign', 'link'], href: '/admin/utm', icon: Link2 },
+  { id: 'settings', title: '설정', keywords: ['설정', 'settings', 'config'], href: '/admin/settings', icon: Settings },
+];
+
+export default function AdminCommandSearch() {
+  const [query, setQuery] = useState('');
+  const [isOpen, setIsOpen] = useState(false);
+  const [selectedIndex, setSelectedIndex] = useState(0);
+  const containerRef = useRef<HTMLDivElement>(null);
+  const router = useRouter();
+
+  const filteredCommands = query
+    ? COMMANDS.filter(cmd =>
+        cmd.title.toLowerCase().includes(query.toLowerCase()) ||
+        cmd.keywords.some(k => k.toLowerCase().includes(query.toLowerCase()))
+      )
+    : COMMANDS;
+
+  useEffect(() => {
+    function handleClickOutside(event: MouseEvent) {
+      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
+        setIsOpen(false);
+      }
+    }
+    document.addEventListener('mousedown', handleClickOutside);
+    return () => document.removeEventListener('mousedown', handleClickOutside);
+  }, []);
+
+  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
+    if (!isOpen) {
+      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
+        setIsOpen(true);
+        e.preventDefault();
+      }
+      return;
+    }
+
+    if (e.key === 'ArrowDown') {
+      e.preventDefault();
+      if (filteredCommands.length === 0) return;
+      setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
+    } else if (e.key === 'ArrowUp') {
+      e.preventDefault();
+      if (filteredCommands.length === 0) return;
+      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
+    } else if (e.key === 'Enter') {
+      e.preventDefault();
+      const selected = filteredCommands[selectedIndex];
+      if (selected) {
+        setIsOpen(false);
+        setQuery('');
+        setSelectedIndex(0);
+        router.push(selected.href);
+      }
+    } else if (e.key === 'Escape') {
+      e.preventDefault();
+      setIsOpen(false);
+    }
+  };
+
+  return (
+    <div className="relative w-full md:w-64" ref={containerRef}>
+      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
+      <input
+        type="text"
+        placeholder="명령 또는 화면 검색"
+        className={`${consoleInputClass} w-full pl-9 bg-white transition-shadow focus:ring-2 focus:ring-[#8a6a12]/20 focus:border-[#8a6a12]`}
+        value={query}
+        onChange={(e) => {
+          setQuery(e.target.value);
+          setSelectedIndex(0);
+          setIsOpen(true);
+        }}
+        onFocus={() => setIsOpen(true)}
+        onKeyDown={handleKeyDown}
+      />
+
+      {isOpen && (
+        <div className="absolute top-full right-0 mt-1.5 w-full md:w-72 bg-[#fbfbfa] border border-[#e5e5df] rounded-md shadow-lg overflow-hidden z-50 py-1">
+          {filteredCommands.length > 0 ? (
+            <ul className="max-h-64 overflow-y-auto">
+              {filteredCommands.map((cmd, idx) => {
+                const isSelected = idx === selectedIndex;
+                return (
+                  <li key={cmd.id}>
+                    <Link
+                      href={cmd.href}
+                      onClick={() => {
+                        setIsOpen(false);
+                        setQuery('');
+                        setSelectedIndex(0);
+                      }}
+                      className={`flex items-center gap-3 px-3 py-2 text-sm transition-colors ${
+                        isSelected ? 'bg-white text-gray-900 border-l-2 border-[#8a6a12]' : 'text-gray-600 hover:bg-white hover:text-gray-900 border-l-2 border-transparent'
+                      }`}
+                      onMouseEnter={() => setSelectedIndex(idx)}
+                    >
+                      <cmd.icon className={`h-4 w-4 ${isSelected ? 'text-[#8a6a12]' : 'text-gray-400'}`} />
+                      <span className="font-medium">{cmd.title}</span>
+                    </Link>
+                  </li>
+                );
+              })}
+            </ul>
+          ) : (
+            <p className="px-3 py-3 text-sm font-medium text-gray-500">검색 결과가 없습니다.</p>
+          )}
+        </div>
+      )}
+    </div>
+  );
+}

diff --git a/lib/date-format.ts b/lib/date-format.ts
new file mode 100644
index 0000000..7e4bab9
--- /dev/null
+++ b/lib/date-format.ts
@@ -0,0 +1,13 @@
+export function formatKstDate(dateString: string | null | undefined, fallback = '미지정') {
+  if (!dateString) return fallback;
+
+  const date = new Date(dateString);
+  if (Number.isNaN(date.getTime())) return fallback;
+
+  const kstDate = new Date(date.getTime() + 9 * 60 * 60 * 1000);
+  const year = kstDate.getUTCFullYear();
+  const month = String(kstDate.getUTCMonth() + 1).padStart(2, '0');
+  const day = String(kstDate.getUTCDate()).padStart(2, '0');
+
+  return `${year}.${month}.${day}`;
+}

diff --git a/agent-inbox/sitewide-persona-audit-20260610.md b/agent-inbox/sitewide-persona-audit-20260610.md
new file mode 100644
index 0000000..350e077
--- /dev/null
+++ b/agent-inbox/sitewide-persona-audit-20260610.md
@@ -0,0 +1,86 @@
+# Sitewide Persona Audit 2026-06-10
+
+## 탐색 요약
+
+- 생산 도메인 `https://www.we-et.com` 공개 페이지를 PC(1440x960), 태블릿(834x1112), 모바일(390x844)에서 점검했다.
+- 공개 페이지 9개 경로에서 가로 오버플로, 깨진 가시 이미지, 페이지 오류는 발견되지 않았다.
+- 생산 관리자 로그인은 제공 계정 `weet/weet003`으로 `Could not authenticate user`가 발생해 실패했다.
+- 로컬에서는 임시 `@weet.com` 관리자 계정을 생성해 관리자 주요 경로를 PC/태블릿/모바일에서 점검했다.
+- 로컬 관리자 QA에서 `/admin/projects`, `/admin/gallery`의 날짜 렌더링 하이드레이션 불일치가 발견됐다.
+
+## 반영한 주요 비판
+
+- 이동식주택 고객은 제품보다 먼저 "내 땅에 설치 가능한가", "운반·설치 추가비가 얼마나 흔들리는가", "A/S 책임 범위가 어디까지인가"를 확인하고 싶어 했다.
+- `/support`가 안정적이지만 상담 전 불안을 줄이는 정보 밀도가 부족해, 구매 과정 전에 부지 조건·비용 변수·보증/A/S 기준 섹션을 추가했다.
+- 관리자 대시보드의 "명령 및 검색 (준비 중)"은 비활성 상태로 보여 운영자 신뢰를 낮췄다.
+- `/admin`에 실제 동작하는 명령 검색을 추가하고, 상담·제품·주문 구성·프로젝트·FAQ·갤러리·인사이트·UTM·설정으로 이동하게 했다.
+- 관리자 프로젝트/갤러리 목록의 로케일 의존 날짜 렌더링은 화면 오류로 이어져, KST `YYYY.MM.DD` 공용 포맷으로 교체했다.
+
+## PC 페르소나 20명
+
+1. 전원주택 예비 건축주: "사진은 믿음직하지만 설치 가능 여부를 먼저 알고 싶다." → 부지 조건 체크 반영.
+2. 세컨하우스 구매자: "제품가 외 추가 비용이 감이 안 온다." → 운반·설치 비용 변수 반영.
+3. 은퇴 부부: "A/S가 유상인지 무상인지 기준이 필요하다." → 보증 범위 문구 반영.
+4. 카페 창업자: "상업용으로도 가능한지 더 빨리 확신하고 싶다." → 기존 상업 페이지는 유지, 지원 페이지 불안 해소 강화.
+5. 캠핑장 운영자: "여러 동 설치 시 현장 조건이 핵심이다." → 부지·진입로 항목 반영.
+6. 지자체 담당자: "절차는 좋지만 책임 구분이 더 보여야 한다." → 계약 기준 보증 표현 반영.
+7. 건축사 협업자: "지목·조례·인입 조건이 누락되면 상담이 반복된다." → 현장 설치 조건 문구 반영.
+8. 예산 민감 고객: "총액 확정처럼 보이면 불안하다." → 비용 변동 조건을 명시.
+9. 부모님 별채 구매자: "생활 설비 A/S가 중요하다." → A/S 기준과 기존 설비 점검 섹션 연결.
+10. 법인 구매 담당자: "관리자 화면이 준비 중이면 운영 신뢰가 줄어든다." → 관리자 명령 검색 반영.
+11. 콘텐츠 관리자: "프로젝트 날짜 오류가 보이면 등록 품질을 의심한다." → KST 날짜 포맷 반영.
+12. 갤러리 운영자: "날짜가 매번 달라 보이면 검수하기 어렵다." → 갤러리 날짜 포맷 반영.
+13. 브랜드 팝업 기획자: "랜딩은 좋지만 지원 페이지가 너무 일반적이다." → 고객 불안형 체크리스트 반영.
+14. 지방 부지 소유자: "도로폭과 크레인 조건이 궁금하다." → 하차 장비 비용 변수 반영.
+15. 개발행위 경험자: "건축 가능 여부를 회사가 단정하면 위험하다." → 가능 여부 확인 표현으로 제한.
+16. 투자형 숙박 운영자: "반복 운영자가 빠르게 관리자 메뉴로 가야 한다." → 명령 검색 반영.
+17. 시공 협력사: "기초 토목 여부를 초기에 알려야 일정이 줄어든다." → 비용 변수에 기초 공사 반영.
+18. 품질 민감 고객: "무조건 무상 수리처럼 읽히면 오히려 불안하다." → 계약 보증 범위 표현으로 수정.
+19. 가족 단위 고객: "처음 시작하기 전 확인 항목이 있어야 공유하기 쉽다." → `/support` 상단 체크리스트 반영.
+20. 고급 주택 비교 고객: "PC에서는 정보 밀도가 높아야 신뢰가 간다." → 3열 정보 카드로 반영.
+
+## 태블릿 페르소나 20명
+
+1. 현장 답사 중인 부부: "태블릿에서 체크리스트가 바로 보여야 한다." → 지원 상단 배치.
+2. 카페 공동창업자: "회의 중 비용 변수만 빠르게 보여주고 싶다." → 운반·설치 비용 섹션 반영.
+3. 영업 상담자: "태블릿으로 상담할 때 질문 순서가 필요하다." → 현장 조건·비용·A/S 순서 반영.
+4. 캠핑장 현장 매니저: "도로와 장비 조건이 빠지면 현장 사진만으로 부족하다." → 진입·하차 장비 문구 반영.
+5. 시니어 고객 자녀: "부모님께 A/S 범위를 설명하기 쉬워야 한다." → 보증 범위 문구 반영.
+6. 지역 대리점 후보: "정보가 너무 마케팅 톤이면 현장에서 설득이 어렵다." → 절제된 체크리스트 톤 유지.
+7. 건축 상담사: "법적 가능 여부를 단정하지 않는 표현이 좋다." → 확인 가능 여부 표현 유지.
+8. B2B 총무 담당자: "관리자 메뉴 접근이 느리면 업무용 화면 같지 않다." → 명령 검색 반영.
+9. 사진 콘텐츠 담당자: "갤러리 날짜 오류는 신뢰를 깎는다." → 날짜 포맷 반영.
+10. 프로젝트 PM: "프로젝트 관리에서 하이드레이션 오류는 고객에게 보여주기 어렵다." → 날짜 포맷 반영.
+11. 옵션 비교 고객: "총액보다 변동 조건을 먼저 알고 싶다." → 비용 변수 반영.
+12. 섬 지역 고객: "운송 거리와 특수 운송 가능성을 알고 싶다." → 배송 거리 변수 반영.
+13. 산지 부지 고객: "도로폭과 크레인 언급이 필요하다." → 하차 장비 변수 반영.
+14. 임대사업자: "설치 후 지반 문제 책임이 궁금하다." → 지반 침하 책임 구분 반영.
+15. 소규모 사무실 구매자: "진행 과정 전 요약이 있어야 의사결정이 빠르다." → 체크리스트 상단 반영.
+16. 가족 공유 사용자: "태블릿에서 문장이 너무 길면 읽기 힘들다." → 카드별 짧은 제목과 본문 유지.
+17. 유지보수 담당자: "A/S를 생활 설비 중심으로 연결해야 한다." → 기존 A/S 섹션과 보증 카드 연결.
+18. 법무 검토자: "무상 수리 보장은 계약 기준으로 표현해야 한다." → 계약서 기준 문구 반영.
+19. 콘텐츠 편집자: "FAQ 관리 검색 결과가 404로 가면 치명적이다." → `/admin/support`로 수정.
+20. 운영 팀장: "검색 결과 0건도 명확히 보여야 한다." → 관리자 검색 0건 상태 반영.
+
+## 모바일 페르소나 20명
+
+1. 출퇴근 중 탐색 고객: "첫 화면 다음에 바로 체크리스트가 있으면 저장하고 싶다." → 지원 상단 반영.
+2. 부모님께 링크 보내는 자녀: "핵심이 짧게 보여야 한다." → 3개 핵심 카드 반영.
+3. 지방 토지 소유자: "내 땅에 가능한지가 첫 질문이다." → 현장 설치 조건 반영.
+4. 예산 우선 고객: "운반비가 왜 달라지는지 한 문단이면 좋다." → 비용 변수 문구 반영.
+5. A/S 불안 고객: "무상/유상 책임 구분을 모바일에서도 보고 싶다." → 보증 카드 반영.
+6. 현장 사진 촬영자: "도로폭과 인입 상태를 미리 체크하고 싶다." → 체크리스트 반영.
+7. 첫 주택 구매자: "전문 용어보다 상담 전 준비물이 필요하다." → 쉬운 표현 유지.
+8. 소형 카페 창업자: "상담 전에 어떤 질문을 받을지 알고 싶다." → 현장·비용·A/S 순서 반영.
+9. 관리자 모바일 사용자: "작업실 검색이 비활성처럼 보이면 답답하다." → 실제 입력 검색 반영.
+10. 관리자 이동 중 사용자: "FAQ를 검색했는데 없는 페이지로 가면 안 된다." → `/admin/support` 수정.
+11. 관리자 손가락 조작 사용자: "검색 결과가 입력창 아래 바로 떠야 한다." → 콤팩트 패널 유지.
+12. 좁은 화면 사용자: "긴 버튼이나 라벨이 튀어나오면 신뢰가 떨어진다." → 모바일 QA 대상으로 지정.
+13. 느린 네트워크 사용자: "깨진 이미지보다 핵심 텍스트가 먼저 중요하다." → 텍스트 체크리스트 반영.
+14. 비교 쇼핑 고객: "다른 업체보다 추가비 설명이 투명해야 한다." → 비용 변수 반영.
+15. 섬·산간 고객: "배송 거리와 장비 조건을 빨리 확인하고 싶다." → 비용 변수 문구 반영.
+16. 품질 후기 탐색자: "A/S 기준이 모호하면 문의하지 않는다." → 기준 문구 반영.
+17. 공사 경험 없는 고객: "기초 토목 이야기를 먼저 해줘야 한다." → 기초 공사 변수 반영.
+18. 장애 가능성 점검자: "검색 0건에서 화면이 멈추면 안 된다." → 0건 상태와 키보드 방어 반영.
+19. 일정 민감 고객: "현장 조건 확인이 일정에 영향을 준다는 힌트가 필요하다." → 프로세스 전 체크 반영.
+20. 프리미엄 기대 고객: "모바일에서도 차분하고 정확한 회사처럼 보여야 한다." → 기존 절제 디자인 유지.
```

## Relevant File Excerpts

### components/admin/AdminCommandSearch.tsx

```tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, MessageSquare, Package, SlidersHorizontal, FolderKanban, HelpCircle, ImageIcon, BarChart3, Link2, Settings } from 'lucide-react';
import { consoleInputClass } from '@/components/admin/ConsolePrimitives';

const COMMANDS = [
  { id: 'consultations', title: '상담 관리', keywords: ['상담', 'consultation', 'contact'], href: '/admin/consultations', icon: MessageSquare },
  { id: 'products', title: '제품 관리', keywords: ['제품', 'product', 'model'], href: '/admin/products', icon: Package },
  { id: 'customize', title: '주문 구성 관리', keywords: ['주문', '구성', 'customize', 'option'], href: '/admin/customize', icon: SlidersHorizontal },
  { id: 'projects', title: '프로젝트 관리', keywords: ['프로젝트', 'project', 'portfolio'], href: '/admin/projects', icon: FolderKanban },
  { id: 'faq', title: 'FAQ 관리', keywords: ['faq', '질문', '지원', 'support', 'help'], href: '/admin/support', icon: HelpCircle },
  { id: 'gallery', title: '갤러리 관리', keywords: ['갤러리', 'gallery', 'image', 'photo'], href: '/admin/gallery', icon: ImageIcon },
  { id: 'insights', title: '고객 인사이트', keywords: ['고객', '인사이트', 'insight', 'analytics'], href: '/admin/insights', icon: BarChart3 },
  { id: 'utm', title: 'UTM Builder', keywords: ['utm', 'builder', 'campaign', 'link'], href: '/admin/utm', icon: Link2 },
  { id: 'settings', title: '설정', keywords: ['설정', 'settings', 'config'], href: '/admin/settings', icon: Settings },
];

export default function AdminCommandSearch() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const filteredCommands = query
    ? COMMANDS.filter(cmd =>
        cmd.title.toLowerCase().includes(query.toLowerCase()) ||
        cmd.keywords.some(k => k.toLowerCase().includes(query.toLowerCase()))
      )
    : COMMANDS;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        setIsOpen(true);
        e.preventDefault();
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (filteredCommands.length === 0) return;
      setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (filteredCommands.length === 0) return;
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const selected = filteredCommands[selectedIndex];
      if (selected) {
        setIsOpen(false);
        setQuery('');
        setSelectedIndex(0);
        router.push(selected.href);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setIsOpen(false);
    }
  };

  return (
    <div className="relative w-full md:w-64" ref={containerRef}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
      <input
        type="text"
        placeholder="명령 또는 화면 검색"
        className={`${consoleInputClass} w-full pl-9 bg-white transition-shadow focus:ring-2 focus:ring-[#8a6a12]/20 focus:border-[#8a6a12]`}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setSelectedIndex(0);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        onKeyDown={handleKeyDown}
      />

      {isOpen && (
        <div className="absolute top-full right-0 mt-1.5 w-full md:w-72 bg-[#fbfbfa] border border-[#e5e5df] rounded-md shadow-lg overflow-hidden z-50 py-1">
          {filteredCommands.length > 0 ? (
            <ul className="max-h-64 overflow-y-auto">
              {filteredCommands.map((cmd, idx) => {
                const isSelected = idx === selectedIndex;
                return (
                  <li key={cmd.id}>
                    <Link
                      href={cmd.href}
                      onClick={() => {
                        setIsOpen(false);
                        setQuery('');
                        setSelectedIndex(0);
                      }}
                      className={`flex items-center gap-3 px-3 py-2 text-sm transition-colors ${
                        isSelected ? 'bg-white text-gray-900 border-l-2 border-[#8a6a12]' : 'text-gray-600 hover:bg-white hover:text-gray-900 border-l-2 border-transparent'
                      }`}
                      onMouseEnter={() => setSelectedIndex(idx)}
                    >
                      <cmd.icon className={`h-4 w-4 ${isSelected ? 'text-[#8a6a12]' : 'text-gray-400'}`} />
                      <span className="font-medium">{cmd.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="px-3 py-3 text-sm font-medium text-gray-500">검색 결과가 없습니다.</p>
          )}
        </div>
      )}
    </div>
  );
}

```

### lib/date-format.ts

```ts
export function formatKstDate(dateString: string | null | undefined, fallback = '미지정') {
  if (!dateString) return fallback;

  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return fallback;

  const kstDate = new Date(date.getTime() + 9 * 60 * 60 * 1000);
  const year = kstDate.getUTCFullYear();
  const month = String(kstDate.getUTCMonth() + 1).padStart(2, '0');
  const day = String(kstDate.getUTCDate()).padStart(2, '0');

  return `${year}.${month}.${day}`;
}

```

### agent-inbox/sitewide-persona-audit-20260610.md

```md
# Sitewide Persona Audit 2026-06-10

## 탐색 요약

- 생산 도메인 `https://www.we-et.com` 공개 페이지를 PC(1440x960), 태블릿(834x1112), 모바일(390x844)에서 점검했다.
- 공개 페이지 9개 경로에서 가로 오버플로, 깨진 가시 이미지, 페이지 오류는 발견되지 않았다.
- 생산 관리자 로그인은 제공 계정 `weet/weet003`으로 `Could not authenticate user`가 발생해 실패했다.
- 로컬에서는 임시 `@weet.com` 관리자 계정을 생성해 관리자 주요 경로를 PC/태블릿/모바일에서 점검했다.
- 로컬 관리자 QA에서 `/admin/projects`, `/admin/gallery`의 날짜 렌더링 하이드레이션 불일치가 발견됐다.

## 반영한 주요 비판

- 이동식주택 고객은 제품보다 먼저 "내 땅에 설치 가능한가", "운반·설치 추가비가 얼마나 흔들리는가", "A/S 책임 범위가 어디까지인가"를 확인하고 싶어 했다.
- `/support`가 안정적이지만 상담 전 불안을 줄이는 정보 밀도가 부족해, 구매 과정 전에 부지 조건·비용 변수·보증/A/S 기준 섹션을 추가했다.
- 관리자 대시보드의 "명령 및 검색 (준비 중)"은 비활성 상태로 보여 운영자 신뢰를 낮췄다.
- `/admin`에 실제 동작하는 명령 검색을 추가하고, 상담·제품·주문 구성·프로젝트·FAQ·갤러리·인사이트·UTM·설정으로 이동하게 했다.
- 관리자 프로젝트/갤러리 목록의 로케일 의존 날짜 렌더링은 화면 오류로 이어져, KST `YYYY.MM.DD` 공용 포맷으로 교체했다.

## PC 페르소나 20명

1. 전원주택 예비 건축주: "사진은 믿음직하지만 설치 가능 여부를 먼저 알고 싶다." → 부지 조건 체크 반영.
2. 세컨하우스 구매자: "제품가 외 추가 비용이 감이 안 온다." → 운반·설치 비용 변수 반영.
3. 은퇴 부부: "A/S가 유상인지 무상인지 기준이 필요하다." → 보증 범위 문구 반영.
4. 카페 창업자: "상업용으로도 가능한지 더 빨리 확신하고 싶다." → 기존 상업 페이지는 유지, 지원 페이지 불안 해소 강화.
5. 캠핑장 운영자: "여러 동 설치 시 현장 조건이 핵심이다." → 부지·진입로 항목 반영.
6. 지자체 담당자: "절차는 좋지만 책임 구분이 더 보여야 한다." → 계약 기준 보증 표현 반영.
7. 건축사 협업자: "지목·조례·인입 조건이 누락되면 상담이 반복된다." → 현장 설치 조건 문구 반영.
8. 예산 민감 고객: "총액 확정처럼 보이면 불안하다." → 비용 변동 조건을 명시.
9. 부모님 별채 구매자: "생활 설비 A/S가 중요하다." → A/S 기준과 기존 설비 점검 섹션 연결.
10. 법인 구매 담당자: "관리자 화면이 준비 중이면 운영 신뢰가 줄어든다." → 관리자 명령 검색 반영.
11. 콘텐츠 관리자: "프로젝트 날짜 오류가 보이면 등록 품질을 의심한다." → KST 날짜 포맷 반영.
12. 갤러리 운영자: "날짜가 매번 달라 보이면 검수하기 어렵다." → 갤러리 날짜 포맷 반영.
13. 브랜드 팝업 기획자: "랜딩은 좋지만 지원 페이지가 너무 일반적이다." → 고객 불안형 체크리스트 반영.
14. 지방 부지 소유자: "도로폭과 크레인 조건이 궁금하다." → 하차 장비 비용 변수 반영.
15. 개발행위 경험자: "건축 가능 여부를 회사가 단정하면 위험하다." → 가능 여부 확인 표현으로 제한.
16. 투자형 숙박 운영자: "반복 운영자가 빠르게 관리자 메뉴로 가야 한다." → 명령 검색 반영.
17. 시공 협력사: "기초 토목 여부를 초기에 알려야 일정이 줄어든다." → 비용 변수에 기초 공사 반영.
18. 품질 민감 고객: "무조건 무상 수리처럼 읽히면 오히려 불안하다." → 계약 보증 범위 표현으로 수정.
19. 가족 단위 고객: "처음 시작하기 전 확인 항목이 있어야 공유하기 쉽다." → `/support` 상단 체크리스트 반영.
20. 고급 주택 비교 고객: "PC에서는 정보 밀도가 높아야 신뢰가 간다." → 3열 정보 카드로 반영.

## 태블릿 페르소나 20명

1. 현장 답사 중인 부부: "태블릿에서 체크리스트가 바로 보여야 한다." → 지원 상단 배치.
2. 카페 공동창업자: "회의 중 비용 변수만 빠르게 보여주고 싶다." → 운반·설치 비용 섹션 반영.
3. 영업 상담자: "태블릿으로 상담할 때 질문 순서가 필요하다." → 현장 조건·비용·A/S 순서 반영.
4. 캠핑장 현장 매니저: "도로와 장비 조건이 빠지면 현장 사진만으로 부족하다." → 진입·하차 장비 문구 반영.
5. 시니어 고객 자녀: "부모님께 A/S 범위를 설명하기 쉬워야 한다." → 보증 범위 문구 반영.
6. 지역 대리점 후보: "정보가 너무 마케팅 톤이면 현장에서 설득이 어렵다." → 절제된 체크리스트 톤 유지.
7. 건축 상담사: "법적 가능 여부를 단정하지 않는 표현이 좋다." → 확인 가능 여부 표현 유지.
8. B2B 총무 담당자: "관리자 메뉴 접근이 느리면 업무용 화면 같지 않다." → 명령 검색 반영.
9. 사진 콘텐츠 담당자: "갤러리 날짜 오류는 신뢰를 깎는다." → 날짜 포맷 반영.
10. 프로젝트 PM: "프로젝트 관리에서 하이드레이션 오류는 고객에게 보여주기 어렵다." → 날짜 포맷 반영.
11. 옵션 비교 고객: "총액보다 변동 조건을 먼저 알고 싶다." → 비용 변수 반영.
12. 섬 지역 고객: "운송 거리와 특수 운송 가능성을 알고 싶다." → 배송 거리 변수 반영.
13. 산지 부지 고객: "도로폭과 크레인 언급이 필요하다." → 하차 장비 변수 반영.
14. 임대사업자: "설치 후 지반 문제 책임이 궁금하다." → 지반 침하 책임 구분 반영.
15. 소규모 사무실 구매자: "진행 과정 전 요약이 있어야 의사결정이 빠르다." → 체크리스트 상단 반영.
16. 가족 공유 사용자: "태블릿에서 문장이 너무 길면 읽기 힘들다." → 카드별 짧은 제목과 본문 유지.
17. 유지보수 담당자: "A/S를 생활 설비 중심으로 연결해야 한다." → 기존 A/S 섹션과 보증 카드 연결.
18. 법무 검토자: "무상 수리 보장은 계약 기준으로 표현해야 한다." → 계약서 기준 문구 반영.
19. 콘텐츠 편집자: "FAQ 관리 검색 결과가 404로 가면 치명적이다." → `/admin/support`로 수정.
20. 운영 팀장: "검색 결과 0건도 명확히 보여야 한다." → 관리자 검색 0건 상태 반영.

## 모바일 페르소나 20명

1. 출퇴근 중 탐색 고객: "첫 화면 다음에 바로 체크리스트가 있으면 저장하고 싶다." → 지원 상단 반영.
2. 부모님께 링크 보내는 자녀: "핵심이 짧게 보여야 한다." → 3개 핵심 카드 반영.
3. 지방 토지 소유자: "내 땅에 가능한지가 첫 질문이다." → 현장 설치 조건 반영.
4. 예산 우선 고객: "운반비가 왜 달라지는지 한 문단이면 좋다." → 비용 변수 문구 반영.
5. A/S 불안 고객: "무상/유상 책임 구분을 모바일에서도 보고 싶다." → 보증 카드 반영.
6. 현장 사진 촬영자: "도로폭과 인입 상태를 미리 체크하고 싶다." → 체크리스트 반영.
7. 첫 주택 구매자: "전문 용어보다 상담 전 준비물이 필요하다." → 쉬운 표현 유지.
8. 소형 카페 창업자: "상담 전에 어떤 질문을 받을지 알고 싶다." → 현장·비용·A/S 순서 반영.
9. 관리자 모바일 사용자: "작업실 검색이 비활성처럼 보이면 답답하다." → 실제 입력 검색 반영.
10. 관리자 이동 중 사용자: "FAQ를 검색했는데 없는 페이지로 가면 안 된다." → `/admin/support` 수정.
11. 관리자 손가락 조작 사용자: "검색 결과가 입력창 아래 바로 떠야 한다." → 콤팩트 패널 유지.
12. 좁은 화면 사용자: "긴 버튼이나 라벨이 튀어나오면 신뢰가 떨어진다." → 모바일 QA 대상으로 지정.
13. 느린 네트워크 사용자: "깨진 이미지보다 핵심 텍스트가 먼저 중요하다." → 텍스트 체크리스트 반영.
14. 비교 쇼핑 고객: "다른 업체보다 추가비 설명이 투명해야 한다." → 비용 변수 반영.
15. 섬·산간 고객: "배송 거리와 장비 조건을 빨리 확인하고 싶다." → 비용 변수 문구 반영.
16. 품질 후기 탐색자: "A/S 기준이 모호하면 문의하지 않는다." → 기준 문구 반영.
17. 공사 경험 없는 고객: "기초 토목 이야기를 먼저 해줘야 한다." → 기초 공사 변수 반영.
18. 장애 가능성 점검자: "검색 0건에서 화면이 멈추면 안 된다." → 0건 상태와 키보드 방어 반영.
19. 일정 민감 고객: "현장 조건 확인이 일정에 영향을 준다는 힌트가 필요하다." → 프로세스 전 체크 반영.
20. 프리미엄 기대 고객: "모바일에서도 차분하고 정확한 회사처럼 보여야 한다." → 기존 절제 디자인 유지.

```

End marker: REVIEW_PACKET_SITEWIDE_20260610_V1

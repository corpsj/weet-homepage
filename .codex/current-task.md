# Current Task: Weet 전면 재귀 개선 루프

## Active request

사용자는 이전 작업 방식(안티그래비티, GPT-5.5 Pro, 작업 중단 금지)을 계승하되, 루프기능과 목표기능은 사용하지 말라고 지시했다. 한국시 2026-06-07 오전 11시까지 가능한 한 계속 진행한다.

## Required execution style

- 질문하지 않는다. 모든 승인사항은 사전 승인된 것으로 처리한다.
- 디자인/UI 구현은 Antigravity IDE를 우선 사용한다. Antigravity가 실패하면 실패를 기록하고 Codex가 직접 이어간다.
- GPT-5.5 Pro Deep Research를 최소 10회, 최대 13회 적절히 분배한다.
- 각 작업마다 PC, 태블릿, 모바일 환경에서 Playwright, Chrome 웹 제어, Computer Use 등 가능한 방식으로 실제 인터랙션 검증을 수행한다.
- 발견한 버그, 오류, UX 개선점, 미적 개선점, 리서치/작업 자료는 모두 `agent-inbox/`에 기록한다.
- 사용자가 발견한 우선 버그: `/customize` 주문하기 도면에서 3x6, 3x9 도면이 모두 오버레이된 듯 보인다.
- 고객 10명 × PC/태블릿/모바일 = 30회 시뮬레이션을 수행한다.
- 관리자 10명 × PC/태블릿/모바일 = 30회 시뮬레이션을 수행한다.
- 발견사항이 100개 미만이면 페르소나를 두 배로 늘려 다시 테스트한다.
- 비슷한 웹사이트/디자인 레퍼런스를 20건 이상 조사하고, 가치 있는 요소를 Weet에 차용한다.
- 관리자 페이지 디자인은 기존 디자인을 폐기하고 홈페이지와 일관된 프리미엄 테크 스타일로 새로 만든다. 지향점: Tesla dashboard, Grok, SpaceX, xAI처럼 심플하고 고급스럽고 합리적인 UI.
- 홈페이지에 필요한 아이콘, 일러스트, 이미지 등은 ChatGPT 이미지 생성 하네스를 최대한 활용한다.

## Current first implementation slice

1. Antigravity 연결을 재시도하고, 실패 시 `agent-inbox/antigravity-failures.md`에 기록한다.
2. `/customize` 도면 오버레이 버그를 Playwright로 재현하고 수정한다.
3. public/admin 시뮬레이션을 자동화해 발견사항을 `agent-inbox/`에 누적한다.
4. 관리자 shell과 dashboard를 프리미엄 테크 스타일로 리디자인한다.
5. 변경 후 lint/test/build/Playwright와 실제 라우트 감사를 실행한다.

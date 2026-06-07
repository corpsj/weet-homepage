# Current Task: Weet 전면 재귀 개선 루프

## Active request

사용자는 이전 작업 방식(안티그래비티, GPT-5.5 Pro, 작업 중단 금지)을 계승하되, 루프기능과 목표기능은 사용하지 말라고 지시했다. 현재 우선 과제는 Weet 공개 홈페이지와 관리자 전체 화면을 대한민국 최고 수준의 젊고 트렌디한 이동식주택 사이트/운영 콘솔로 끌어올리는 것이다.

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
- 홈페이지에 필요한 아이콘, 일러스트, 이미지, UI 가이드 등은 Chrome/ChatGPT 웹제어로 사용자가 볼 수 있게 생성한다. 이미지 생성도 반드시 `새 채팅`에서 `최신 • 5.5`와 Thinking/Pro `확장`을 확인한 뒤 `이미지 만들기`로 진행한다.

## Current implementation slice

1. Chrome/ChatGPT 웹제어로 GPT-5.5 Thinking/Pro 확장 이미지 생성 규칙을 문서화하고, 관리자 UI 가이드 이미지를 다시 생성한다.
2. Antigravity IDE를 Computer Use로 제어해 홈페이지와 관리자 UI 구현을 먼저 위임한다.
3. Codex가 diff를 검수하고, 남은 관리자 하위 화면 및 제품 신규/수정 페이지까지 새 콘솔 시스템으로 보정한다.
4. PC/tablet/mobile에서 홈페이지와 관리자 전체 주요 라우트, 제품 모달, 갤러리/프로젝트/지원/문의 화면을 시각 검증한다.
5. `.codex/review-packet.md`를 최신 diff/검증 결과로 재작성하고 Chrome/ChatGPT Deep Research로 GPT-5.5 Pro 리뷰를 받는다.
6. concrete MUST_FIX가 있으면 적용하고, 브랜치 push/Vercel/실제 `we-et.com` 검증까지 완료한다.

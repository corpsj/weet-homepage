UI 디자인 전에 반드시 UI이미지를 gpt로 생성한뒤 해당 이미지를 제미나이에 보내서 디자인을 시작하세요.
그렇게 하면 디자인의 퀄리티가 훨씬 올라갑니다.

이미지 생성에 대한 프롬프트를 구체적일 수록 좋으며 UI에 대한 아이디어가 명확할 수록 좋습니다.
생성할때 UI 디자인 가이드 이미지를 생성해달라는 맥락으로 생성을 요청하면 여러 페이지의 예시 가이드를 얻을 수 있습니다.

이미지 생성은 로컬 이미지 도구가 아니라 Chrome/ChatGPT 웹제어로 사용자가 볼 수 있게 진행하세요. 매번 새 채팅을 열고 모델/하네스를 `최신 • 5.5`와 Thinking/Pro `확장`으로 맞춘 뒤 `이미지 만들기`를 선택하고, 전송 전 해당 상태를 visible DOM 또는 화면 증거로 확인하세요.

## 2026-06-07 GPT-5.5 Thinking 확장 UI 가이드 이미지

- 생성 방식: Chrome/ChatGPT 웹제어, 새 채팅, `5.5`, `Thinking`, `확장`, `이미지 만들기`를 visible DOM에서 확인 후 전송.
- 저장 파일: `agent-inbox/generated-ui-reference-admin-console-v2.png`
- 파일 정보: PNG, 1672x941, SHA-256 `8a9d48f42b6537c73ff55da398edefe58c2f0abf3863f409e0843fb0c31a12ab`.
- 사용 판단: 공개 홈페이지 첫 화면, 모델/구성/견적, 상담·주문 진행, 관리자 작업실이 한 장에 정리되어 있어 Antigravity 구현 참조 이미지로 사용한다. 특히 관리자 쪽은 generic dashboard card가 아니라 command/search bar, 좌측 작업 rail, 중앙 상담 queue, 우측 detail/action panel 구조를 차용한다.
- 주의: 이미지 속 텍스트는 시각 참조용이며 실제 UI 문구는 코드에서 한국어로 다시 정리한다.

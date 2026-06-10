MARKER: REVIEW_PACKET_ORDER_UI_ADMIN_20260610_V2
SOURCE: Chrome ChatGPT GPT-5.5 Pro, https://chatgpt.com/c/6a2961a7-3efc-8324-8ab3-a68e7b0ed308
VERDICT: NO MUST_FIX

REVIEW_PACKET_ORDER_UI_ADMIN_20260610_V2

NO MUST_FIX

패킷 기준으로 확인한 범위에서는 헤더 CTA, 모바일 인라인 주문 옵션 흐름, 축소된 옵션 카드, admin 주문 구성 관리 탭/옵션 생성 기본값, 테스트·시각 QA 결과 모두에서 출시 전 반드시 막아야 할 구체적 회귀는 보이지 않습니다. 수동 tablist는 화살표 키 로빙 포커스까지 구현되지는 않았지만, 현재 버튼 기반 포커스/Enter/Space 조작과 aria-selected/tabpanel 연결 상태만으로 이 admin 화면의 MUST_FIX로 보기는 어렵습니다.

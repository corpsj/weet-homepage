VERDICT: PASS
CONTEXT_GAPS:
- `next.config`의 `images.remotePatterns` 또는 loader 설정, 그리고 운영 `product.image_url`/project hero 호스트 분포가 공유되지 않아 현재 가드가 `next/image`의 런타임 host mismatch까지 막는지는 확인할 수 없습니다. Next.js는 외부 이미지 호스트를 `remotePatterns`와 정확히 일치시켜야 하며, 불일치 시 오류가 납니다. citeturn1search7turn1search10
- E2E의 "temporary service-role admin"이 "서버 측에서 임시 admin 사용자/세션 생성"인지, 아니면 "브라우저에 service_role/secret key 주입"인지 구현 세부가 없습니다. Supabase는 service_role/secret key를 브라우저에 노출하지 말라고 명시합니다. citeturn1search5turn1search14
- 상담 `createdAt`의 저장 포맷이 UTC ISO인지, 타임존 정규화가 어디서 보장되는지 정보가 없어 120분 SLA 경계가 로컬 시계 드리프트나 파싱 차이에 얼마나 민감한지 확정할 수 없습니다.
- Antigravity 위임 타임아웃으로 독립적인 외부 visual inspection 결과는 없고, 현재 평가는 제공된 lint/test/build/Playwright/로컬 QA 증거에 의존합니다.

MUST_FIX:
- 현재 제공된 증거만으로는 배포 차단급 회귀는 확인되지 않았습니다.
- 단, 테스트든 앱 런타임이든 service_role/secret key가 브라우저 번들, `window`, localStorage, storageState 등 클라이언트 영역에 닿는다면 즉시 수정이 필요합니다. 이 키들은 RLS를 우회하므로 백엔드 전용이어야 합니다. citeturn1search5turn1search8turn1search14

OPTIONAL:
- `hasValidProductImageUrl`는 이번 슬라이스의 1차 방어로는 충분하지만, 정규식 대신 `new URL()` 파싱 + 허용 protocol/hostname 검사로 바꾸면 더 견고합니다. 현재 구현은 "형태상 http(s)"를 통과시켜도 `remotePatterns` 미일치 host나 잘못된 URL 세부까지는 완전히 막지 못합니다. citeturn1search7turn1search10
- 120분 SLA는 지금처럼 "시각적 triage 전용"이면 MUST_FIX는 아닙니다. 다만 이후 알림·정렬·에스컬레이션 기준으로 승격되면 서버 계산 컬럼 또는 RPC로 옮기는 편이 안전합니다.
- 기존 `middleware`→`proxy` 경고는 이번 슬라이스 차단 사유는 아니지만, Next.js 16에서는 공식적으로 `proxy`로 바뀌었으므로 별도 기술부채로 정리하는 것이 좋습니다. citeturn0search0turn0search4turn0search8
- 가능하면 ConsolePrimitives에 대한 경량 시각 회귀 스냅샷을 추가하세요. Playwright는 screenshot/trace 수집을 지원합니다. citeturn0search6

TESTS_TO_RUN:
- 배포 차단으로 "필수"라고 볼 추가 테스트는 현재 증거상 없습니다.
- 권장 단위 테스트: `hasValidProductImageUrl`가 빈 문자열, 공백, `javascript:`, `data:`, `ftp:`, 잘못된 URL, `/images/...`, `https://...`를 각각 어떻게 처리하는지 고정하세요. 외부 이미지는 `remotePatterns`와 정확히 일치해야 합니다. citeturn1search7turn1search10
- 권장 단위 테스트: 제품 readiness 가중치와 프로젝트 readiness/public-issues helper의 경계값을 표 기반으로 고정하세요. 특히 bad/missing image, future `completed_at`, incomplete/test project 케이스를 포함하세요.
- 권장 단위 테스트: 상담 SLA 119분/120분/121분, `완료` 예외, 잘못된 `createdAt`, 타임존 포함/미포함 문자열 케이스를 고정하세요.
- 권장 E2E 1건: invalid product/project image 데이터에서 placeholder가 보이고 페이지가 깨지지 않으며 readiness chip/ring이 기대대로 낮아지는지 검증하세요. Playwright는 이런 UI 상태를 web-first assertion으로 고정하는 방식을 권장합니다. citeturn1search2turn1search6
- 권장 E2E 1건: consultations에서 search/filter 유지, "SLA 위험" pill 경계, insights의 GA configured/unconfigured 두 상태를 함께 고정하세요.

RISK_NOTES:
- 현재 PASS 판단은 "제공된 증거 기준"입니다. lint/test/build/E2E와 12개 화면 로컬 QA 결과가 모두 양호하므로, 이 슬라이스는 커밋/프리뷰 배포 전 단계에서 충분히 안정적으로 보입니다.
- 제품/프로젝트 bad image 처리도 이번 범위에서는 충분한 1차 방어로 봅니다. 다만 이것이 완전한 이미지 유효성 보장을 의미하지는 않으며, 실제 호스트 allowlist와 운영 데이터 분포를 확인하지 않으면 잠복 `next/image` 런타임 오류 가능성은 남습니다. citeturn1search7turn1search10
- 클라이언트 사이드 120분 SLA visual triage는 MUST_FIX가 아닙니다. 위험은 "안내용 표시의 일관성" 수준이며, 운영 단일 진실원으로 쓰기 시작할 때만 서버 측 계산으로 승격하면 됩니다.
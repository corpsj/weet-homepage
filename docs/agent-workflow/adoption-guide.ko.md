# 에이전트 워크플로우 적용 방법

이 문서는 `docs/agent-workflow/`의 범용 템플릿을 새 프로젝트에 적용하는 방법입니다.

## 1. 기본 파일 복사

새 프로젝트 루트에서 아래 구조를 만듭니다.

```sh
mkdir -p .codex/qa agent-inbox
```

그다음 템플릿을 복사합니다.

```text
docs/agent-workflow/AGENTS.template.md              -> AGENTS.md
docs/agent-workflow/codex-loop.template.md          -> codex-loop.md
docs/agent-workflow/review-template.md              -> .codex/review-template.md
docs/agent-workflow/agent-inbox.README.template.md  -> agent-inbox/README.md
docs/agent-workflow/state-template.md               -> .codex/state.md
docs/agent-workflow/current-task-template.md        -> .codex/current-task.md
```

선택 런북은 필요할 때 복사합니다.

```text
docs/agent-workflow/chrome-gpt-pro-runbook.md
docs/agent-workflow/visual-qa-runbook.md
docs/agent-workflow/antigravity-frontend-runbook.md
```

추천 위치는 `.codex/runbooks/` 또는 `agent-inbox/`입니다.

## 2. 프로젝트별 정보 채우기

`.codex/current-task.md`에는 현재 작업에 필요한 사실만 적습니다.

- 사용자의 원 요청
- 구현 범위
- 관련 파일, 라우트, 테스트
- 하지 말아야 할 일
- 검증 명령
- 배포나 브라우저 확인 조건

`.codex/state.md`에는 현재 상태만 적습니다.

- 현재 단계
- 변경한 내용
- 실행한 명령
- 검증 결과
- 시각 QA 결과
- 남은 실패와 리스크
- GPT Pro 리뷰 횟수와 판정
- 다음 한 단계

프로젝트 특수 규칙은 `AGENTS.md`를 계속 수정하기보다 `agent-inbox/instructions.md`에 넣는 편이 좋습니다.

예시는 다음과 같습니다.

```md
# Manual Instructions

- 배포 확인은 staging.example.com에서 한다.
- UI 변경은 desktop/tablet/mobile 스크린샷을 남긴다.
- 결제 관련 변경은 unit test와 E2E를 모두 실행한다.
```

## 3. 작업 루프 사용

에이전트는 매 작업마다 아래 순서로 움직입니다.

1. `AGENTS.md`, `codex-loop.md`, `.codex/current-task.md`, `.codex/state.md`, `agent-inbox/`를 읽습니다.
2. `git status`로 시작 상태를 확인합니다.
3. 가장 작은 안전한 단위로 저장소를 수정합니다.
4. 관련 검증 명령을 실행합니다.
5. 화면이나 문서처럼 사람이 보는 결과물이 있으면 시각 QA를 수행합니다.
6. `.codex/review-template.md`를 바탕으로 `.codex/review-packet.md`를 작성합니다.
7. Chrome/ChatGPT 또는 지정된 외부 GPT Pro 리뷰어에게 패킷을 보냅니다.
8. 완전하고 marker가 맞는 응답만 `.codex/pro-review.md`에 저장합니다.
9. `MUST_FIX` 항목만 적용합니다.
10. 다시 검증하고 `.codex/state.md`를 갱신합니다.

## 4. GPT Pro 리뷰 패킷 작성 원칙

GPT Pro는 로컬 저장소를 볼 수 없다고 가정합니다.

따라서 리뷰 패킷에는 반드시 포함해야 합니다.

- 현재 작업 요약
- 현재 상태
- 프로젝트 스냅샷
- git status
- 변경 파일
- git diff
- 관련 파일 발췌
- 실행한 명령
- 테스트, 린트, 빌드 결과
- 브라우저, 스크린샷, Playwright, 시각 QA 결과
- 현재 실패와 리스크
- 정확한 리뷰 질문

리뷰어가 추측해야 하는 정보가 있으면 패킷이 아직 부족한 것입니다.

## 5. 완료 조건

다음 중 하나가 되면 작업을 멈추고 사용자에게 보고합니다.

- 검증이 통과했고 GPT Pro가 `VERDICT: PASS`를 반환함
- GPT Pro 리뷰 2회가 끝남
- 같은 실패가 새 증거 없이 2회 반복됨
- 브라우저 리뷰가 2회 실패함
- 다음 작업이 저장소 밖의 수동 조치를 요구함
- 사용자 승인이 필요함

## 6. 운영 팁

- 범용 규칙은 `AGENTS.md`와 `codex-loop.md`에 둡니다.
- 프로젝트별 지시는 `agent-inbox/instructions.md`에 둡니다.
- 현재 작업 사실은 `.codex/current-task.md`에 둡니다.
- 진행 상태와 실패 기록은 `.codex/state.md`에 둡니다.
- 외부 리뷰에 보낼 내용은 `.codex/review-packet.md` 하나만 봐도 이해되게 만듭니다.
- 화면이 바뀌는 작업은 스크린샷을 찍는 것에서 끝내지 말고, 실제로 무엇이 보였는지 기록합니다.

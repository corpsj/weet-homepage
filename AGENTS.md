# Repository Guidelines

## 프로젝트 구조 및 모듈 구성
Next.js App Router 기반 화면은 `app/` 아래에서 경로 폴더를 케밥 케이스로 유지하고, 각 경로의 `page.tsx`, `loading.tsx`, `error.tsx`를 함께 둡니다. 공통 레이아웃 요소는 `components/layout`, 섹션 단위 블록은 `components/sections`, 버튼·카드 같은 재사용 UI는 `components/ui`에 둡니다. 비즈니스 로직과 헬퍼는 `lib/`, 레퍼런스 자료는 `design/`, 정적 리소스(예: `/public/video/hero.mp4`)는 `public/`에만 배치해 트리 셰이킹을 보장하세요.

## 빌드·테스트·개발 명령
- `npm install`: Next.js, Tailwind, Framer Motion 등 의존성을 설치합니다. `package-lock.json` 변경 시 즉시 실행하세요.
- `npm run dev`: Turbopack 개발 서버를 `http://localhost:3000`에서 띄우고 `app/` 전체를 HMR합니다.
- `npm run build`: 배포 최적화 빌드를 생성합니다. 텍스트나 에셋을 배포 전에 항상 한 번 실행하세요.
- `npm start`: 빌드 산출물을 프로덕션 모드로 제공하여 연기 통합 테스트에 사용합니다.
- `npm run lint`: Next.js ESLint + TypeScript 규칙을 강제합니다. 경고가 없어질 때까지 반복 실행하세요.

## 코딩 스타일 및 네이밍
모든 소스는 TypeScript(컴포넌트는 `.tsx`, 헬퍼는 `.ts`)와 2칸 들여쓰기를 사용합니다. 상태가 필요할 때만 클라이언트 컴포넌트를 사용하고, 스타일은 Tailwind 유틸리티를 `clsx`·`tailwind-merge`로 합성하며 CSS 파일 추가를 최소화합니다. 컴포넌트 파일은 PascalCase(`SignatureLine.tsx`), 훅·유틸은 카멜 케이스(`useBreakpoint.ts`), 라우트 폴더는 URL을 그대로 따릅니다(`app/modular/page.tsx`). props 타입을 명시하고, Next.js `page.tsx` 외에는 기본 내보내기를 피하세요.

## 테스트 지침
공식 테스트 러너가 아직 없으므로 모든 PR에는 수동 검증 결과(확인한 경로, 디바이스)를 명시합니다. 테스트를 도입할 경우 React Testing Library + Vitest를 `__tests__` 폴더에 배치하고 파일명은 `ComponentName.test.tsx`로 맞춥니다. `describe`는 담당 경로나 기능을 포함하세요(`describe('app/products')`). 도구가 생기기 전까지는 `npm run build && npm start`로 SSR·Framer Motion 애니메이션을 직접 확인하며 콘솔 오류가 없는지 살핍니다.

## 커밋 및 PR 가이드
현 히스토리(`Add .gitignore`)처럼 한 줄짜리 명령형 메시지(`<동사> <목적어>`, 60자 이하)를 유지하고 변경 범위를 명확히 분리하세요. PR에는 관련 이슈 링크, 사용자 영향 요약, 수동 테스트 단계, 시각 변경 시 스크린샷 또는 Loom을 포함합니다. 공용 레이아웃·네비게이션을 수정할 땐 반드시 다른 에이전트 리뷰를 요청하고, `npm run lint`와 프로덕션 빌드가 깨끗해야 병합할 수 있습니다.

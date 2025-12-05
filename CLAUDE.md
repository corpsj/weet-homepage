# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

모듈러 건축 전문 기업 위트(weet:))의 기업 홈페이지입니다. Next.js 15 (App Router)와 TypeScript로 구축되었으며, Figma 디자인의 정확한 구현에 중점을 둡니다.

## 개발 명령어

```bash
# 의존성 설치
npm install

# 개발 서버 실행 (Turbopack 사용, 3000번 포트가 사용 중이면 3001번 사용)
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start

# 린트
npm run lint
```

## 🚀 배포 (Deployment)

이 프로젝트는 **Vercel**에 배포되어 있습니다. 모든 변경사항은 리포지토리에 **푸시(Push)**해야 배포가 트리거됩니다.

## 중요: 디자인 구현 요구사항

**모든 UI 구현은 반드시 Figma 디자인을 철저히 따라야 합니다.** `/design/figma_design.md`에 참조된 디자인을 최대한 똑같이 구현하는 것이 목표입니다. 각 페이지별 Figma 디자인:

- 홈: https://www.figma.com/design/q78qGMNGaWzuciACkGKvQx/home
- 모듈러건축: https://www.figma.com/design/d1JwzjiDFfP3lVt7gvsCvx/모듈러건축
- 제품소개: https://www.figma.com/design/adI9qmtkTvlvcRe5UNgPpm/제품소개
- 비스포크: https://www.figma.com/design/r9pxBinMEoL2Kmub7EegRc/비스포크
- 솔루션: https://www.figma.com/design/ojqIg1wnqERqrI2chkGSeR/솔루션
- 회사소개: https://www.figma.com/design/ahqUcxCvIfM2RmfzgFORR2/회사소개
- 고객지원: https://www.figma.com/design/gcm8rmttjwizJ5MBgmFsK7/고객지원

**특별 참고사항:** `/products` 페이지의 사이드바는 제품의 필터처럼 어떤 페이지에서든 항상 따라다니는 고정 사이드바입니다.

## 아키텍처

### 페이지 구조

Next.js App Router를 사용하며 다음 주요 라우트로 구성됩니다:
- `/` - 홈페이지 (섹션 조합)
- `/modular` - 모듈러 건축 소개
- `/products` - 제품 소개 (고정 사이드바 필터 포함)
- `/bespoke` - 비스포크 맞춤 서비스
- `/solution` - 솔루션 제공
- `/company` - 회사소개 (app/ 폴더에 아직 미생성 - 생성 필요)
- `/support` - 고객지원
- `/admin` - 관리자 패널 (로그인 필요)
- `/login` - 관리자 로그인

### 컴포넌트 구성

**섹션 컴포넌트** (`components/sections/`):
- 재사용 가능한 섹션을 조합하여 전체 페이지를 구성
- 홈페이지 예시: `HeroCarousel`, `PartnersBanner`, `SignatureLine`, `VideoSection`, `SNSGallery`
- 각 섹션은 독립적이며 페이지에 조합될 수 있음

**레이아웃 컴포넌트** (`components/layout/`):
- `Header.tsx` - 호버 인터랙션이 있는 메가 메뉴, 3개 언어 지원 (KR/EN/ES), 소셜 링크
- `Footer.tsx` - 사이트 푸터

### 스타일링 시스템

**Tailwind 설정:**
- Primary 컬러: `#FDB813` (위트 옐로우), `bg-primary`, `text-primary`로 접근
- Primary dark: `#E5A410`, `bg-primary-dark`로 접근
- Gray scale: 50-900
- 커스텀 spacing: 18, 88, 100
- Max width 확장: 8xl (1440px)
- 폰트: Geist Sans (layout에서 Google Fonts로 로드)

**유틸리티 패턴:**
`lib/utils.ts`의 `cn()` 헬퍼는 `clsx`와 `tailwind-merge`를 사용하여 Tailwind 클래스를 병합합니다. 조건부 클래스 조합에 사용:

```typescript
className={cn(
  "base-classes",
  condition && "conditional-classes"
)}
```

### 상태 관리

- 전역 상태는 Zustand 사용 (설치되었으나 아직 널리 사용되지 않음)
- 컴포넌트별 UI는 React useState로 로컬 상태 관리 (예: Header 메가 메뉴, Products 사이드바)

### Header 네비게이션 구조

Header 컴포넌트(`components/layout/Header.tsx`)는 메가 메뉴 드롭다운이 있는 메인 네비게이션을 정의합니다. 네비게이션 구조는 `navigation` 배열(8-72번 줄)에 각 메인 메뉴의 서브메뉴 항목과 함께 정의되어 있습니다.

**중요한 인터랙션 패턴:**
- 메가 메뉴는 호버 시 표시 (`onMouseEnter` 트리거)
- 활성 메뉴는 노란색 하이라이트 바 표시 (8px 높이, `bg-primary`)
- 모바일: 확장 가능한 섹션이 있는 햄버거 메뉴
- 데스크톱: 절대 위치로 배치된 서브메뉴 드롭다운이 있는 메가 메뉴

### 제품 페이지 패턴

`/products` 페이지는 핵심 아키텍처 패턴을 보여줍니다:
- **고정 사이드바**가 뷰 전체에서 유지됨 (`fixed` 위치, 반응형 top offset)
- 사이드바에 접을 수 있는 카테고리 (S/M/L/XL/SOLUTION/DESIGN)
- 각 카테고리는 Private/Public 하위 카테고리를 가질 수 있음
- 선택된 제품은 메인 콘텐츠 영역에 표시
- 모바일: 오버레이와 함께 왼쪽에서 슬라이드되는 사이드바

이 패턴은 지속적인 필터링/네비게이션이 필요한 모든 페이지에 재사용해야 합니다.

### 관리자 패널 및 백엔드 (`/admin`)

- **인증 (Authentication)**: Supabase Auth 사용. `middleware.ts`와 `layout.tsx`에서 이중으로 세션을 검증하여 비로그인 사용자의 접근을 차단합니다.
- **데이터베이스 (Database)**: Supabase PostgreSQL 사용. `products`, `solutions`, `hero_slides`, `inquiries` 등의 테이블로 구성됩니다.
- **스토리지 (Storage)**: Supabase Storage를 사용하여 제품 및 슬라이드 이미지를 관리합니다.
- **UI 패턴**:
  - **사이드바**: `/components/admin/AdminSidebar.tsx`에서 네비게이션 관리.
  - **토스트 알림**: `sonner` 라이브러리를 사용하여 사용자 피드백 제공 (`alert` 사용 지양).
  - **드래그 앤 드롭**: `@dnd-kit`을 사용하여 순서 변경 기능 구현.
  - **낙관적 업데이트**: 데이터 수정 시 UI를 먼저 업데이트하고 실패 시 롤백하는 패턴 적용.

## 주요 의존성

- **next**: 15.1.3+ (Turbopack이 있는 App Router)
- **framer-motion**: 11.15.0+ 애니메이션용
- **swiper**: 11.1.15+ 캐러셀용
- **zustand**: 5.0.2+ 상태 관리용
- **lucide-react**: 0.468.0+ 아이콘용
- **clsx + tailwind-merge**: className 유틸리티용
- **@supabase/ssr**: Supabase 서버 사이드 렌더링 지원
- **sonner**: 토스트 알림
- **@dnd-kit**: 드래그 앤 드롭 인터랙션

### 관리자 계정 관리
관리자 회원가입 페이지는 보안상 존재하지 않습니다. Supabase 대시보드의 Authentication > Users 메뉴에서 직접 계정을 생성해야 합니다. (이메일 형식: `id@weet.com`)

## 이미지 처리

Next.js Image 컴포넌트는 `next.config.ts`에서 와일드카드 패턴으로 모든 원격 호스트명을 허용하도록 설정되어 있습니다. 자동 최적화의 이점을 위해 모든 이미지에 Next.js `<Image>` 컴포넌트를 사용하세요.

## 언어 지원

사이트는 세 가지 언어를 지원합니다: KR (한국어), EN (영어), ES (스페인어). 언어 선택기는 Header 컴포넌트에 있으며 로컬로 상태가 관리됩니다. 완전한 국제화는 아직 구현되지 않았으며 향후 작업의 우선순위입니다.

## 개발 참고사항

- 개발 서버는 더 빠른 빌드를 위해 Turbopack 사용
- 3000번 포트가 사용 중이면 3001번 포트 사용
- 현재 모든 페이지는 한국어 콘텐츠 사용, 실제 번역 필요
- 반응형 브레이크포인트: 모바일 우선, `lg:` (1024px+)에서 데스크톱 전용 레이아웃
- 데스크톱 헤더 높이: 180px (반응형: 모바일 100px, 태블릿 140px)

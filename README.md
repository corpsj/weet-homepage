# weet:) 홈페이지

모듈러 건축 전문 기업 위트(weet)의 공식 웹사이트

## 🚀 기술 스택

- **프레임워크**: Next.js 15 (App Router)
- **언어**: TypeScript
- **스타일링**: Tailwind CSS
- **애니메이션**: Framer Motion
- **캐러셀**: Swiper
- **상태관리**: Zustand
- **아이콘**: Lucide React
- **백엔드/DB**: Supabase (Auth, Database, Storage)
- **UI 라이브러리**: Sonner (Toast), @dnd-kit (Drag & Drop)

## 📁 프로젝트 구조

```
weet-homepage/
├── app/                    # Next.js App Router
│   ├── page.tsx           # 홈페이지
│   ├── modular/           # 모듈러 건축 소개
│   ├── products/          # 제품소개
│   ├── bespoke/           # BESPOKE
│   ├── solution/          # SOLUTION
│   ├── company/           # 회사소개
│   ├── support/           # 고객지원
│   ├── admin/             # 관리자 페이지 (CMS)
│   └── login/             # 관리자 로그인
├── components/
│   ├── layout/            # Header, Footer
│   ├── sections/          # 섹션 컴포넌트
│   └── ui/                # 재사용 가능한 UI 컴포넌트
├── design/                # 디자인 레퍼런스
├── lib/                   # 유틸리티 함수
└── public/                # 정적 파일

```

## 🎨 주요 페이지

### 1. 홈페이지 (`/`)
- 히어로 캐러셀 (3개 슬라이드)
- 시그니처 라인 (10개 제품 그리드)
- 비디오 섹션
- SNS 갤러리 (Instagram 연동)

### 2. 모듈러 건축 소개 (`/modular`)
- Volumetric Module 소개
- 4가지 핵심 기술력 설명

### 3. 제품소개 (`/products`)
- 좌측 필터 사이드바 (S/M/L/XL/SOLUTION/DESIGN)
- Private/Public 카테고리
- 제품 그리드 레이아웃

### 4. BESPOKE (`/bespoke`)
- 맞춤형 서비스 소개
- 4가지 특징 나열
- "More" CTA 버튼

### 5. SOLUTION (`/solution`)
- 4가지 솔루션 카드 (2x2 그리드)
  - CCTV (보안 솔루션)
  - 네트워크 (인터넷 솔루션)
  - IOT (스마트 홈 솔루션)
  - Design (디자인 컨설팅)

### 6. 회사소개 (`/company`)
- 회사 철학 및 비전
- "We make dreams come true" 메시지
- 주식회사 워트 소개

### 7. 고객지원 (`/support`)
- 6단계 프로세스 안내
- 1:1 상담 예약 CTA

### 8. 관리자 패널 (`/admin`)
- **대시보드**: 트래픽 및 방문자 통계 확인
- **CMS**: 메인 페이지(히어로 슬라이드), 솔루션, FAQ 등 콘텐츠 관리
- **제품 관리**: 제품 등록, 수정, 상태 변경(공개/비공개), 순서 변경
- **문의 관리**: 고객 문의 확인 및 이메일 답변
- **설정**: 관리자 계정 및 시스템 설정

## 🎯 주요 기능

### 메가 메뉴
- 호버 시 드롭다운 메뉴
- 각 메뉴별 서브메뉴 구성

### 다국어 지원
- KR / EN / ES 언어 전환

### 반응형 디자인
- 데스크톱 우선 디자인
- 모든 디바이스 대응

### 애니메이션
- Framer Motion을 활용한 부드러운 전환
- 페이지 전환 효과

## 🚀 시작하기

### 설치

```bash
npm install
```

### 환경 변수 설정 (.env.local)

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 변수들을 설정해야 합니다:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key # 관리자 기능용
```

### 개발 서버 실행

```bash
npm run dev
```

개발 서버가 [http://localhost:3000](http://localhost:3000)에서 실행됩니다.

### 빌드

```bash
npm run build
```

### 프로덕션 서버 실행

```bash
npm start
```

## 🚀 배포 (Deployment)

이 프로젝트는 **Vercel**에 배포되어 있습니다.
모든 변경사항은 Git 리포지토리에 **푸시(Push)**해야만 Vercel에서 자동으로 감지하여 배포가 트리거됩니다.

## 🎨 디자인 시스템

### 컬러 팔레트

- **Primary**: `#FDB813` (weet 옐로우)
- **Primary Dark**: `#E5A410`
- **Black**: `#000000`
- **White**: `#FFFFFF`
- **Gray Scale**: 50-900

### 타이포그래피

- **Font Family**: Geist Sans
- **Responsive Text Sizes**: Tailwind CSS 유틸리티 사용

## 📝 다음 단계

### 우선순위 높음
- [ ] 실제 제품 이미지 추가
- [ ] 비디오 임베드 구현
- [ ] Instagram API 연동
- [ ] 실제 텍스트 콘텐츠 교체

### 우선순위 중간
- [ ] 모바일 반응형 최적화
- [ ] 페이지 전환 애니메이션 추가
- [ ] SEO 최적화
- [ ] 성능 최적화 (이미지 lazy loading 등)

### 우선순위 낮음
- [ ] 다국어 실제 번역
- [ ] 상담 문의 폼 구현
- [x] 관리자 페이지 (구현 완료)
  - *참고: 관리자 계정은 Supabase 대시보드에서 직접 생성해야 합니다.*
- [x] CMS 연동 (Supabase 연동 완료)

## 📄 라이선스

Copyright © weet All rights reserved

---

**제작**: Claude Code로 구현됨
**개발 기간**: 2025년 1월

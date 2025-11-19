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
│   └── support/           # 고객지원
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
- [ ] 관리자 페이지
- [ ] CMS 연동

## 📄 라이선스

Copyright © weet All rights reserved

---

**제작**: Claude Code로 구현됨
**개발 기간**: 2025년 1월

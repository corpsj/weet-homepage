# Handoff: Weet 홈페이지 리디자인

## Overview
weet(이동식주택·모듈러 건축) 홈페이지 전체 리디자인 시안 모음입니다. 공개 사용자 페이지(홈·모듈러건축·제품소개·솔루션·비스포크·고객지원·갤러리·커스터마이즈 주문제작)와 관리자 콘솔, 로그인까지 포함합니다. 기존 사이트의 차갑고 딱딱한 흑/백 톤을 **웜(페이퍼·잉크·골드) 시스템**으로 진화시키는 것이 핵심 목표입니다.

## About the Design Files
이 폴더의 `*.dc.html` 파일들은 **HTML로 만든 디자인 레퍼런스(프로토타입)**입니다. 그대로 배포하는 코드가 아니라, **의도한 비주얼·레이아웃·인터랙션을 보여주는 시각 명세**입니다.
구현 작업은 이 시안을 보고 **기존 코드베이스(Next.js App Router + React + Tailwind CSS + Supabase)의 패턴과 라이브러리로 다시 그려내는 것**입니다. 마크업/스타일만 디자인에 맞게 교체하고, **데이터 로직(Supabase server actions)·라우팅·i18n(LanguageContext)은 그대로 유지**하세요.

> 렌더링해서 보려면: 이 파일들은 프로젝트 루트의 `img/`(이미지)와 `support.js`(런타임)에 의존합니다. 디자인 도구의 프로젝트에서 열거나, 별도로 요청 시 self-contained HTML 번들로도 제공할 수 있습니다.

## Fidelity
**High-fidelity (hifi).** 최종 컬러·타이포·간격·인터랙션이 확정된 목업입니다. 기존 코드베이스의 라이브러리·패턴을 쓰되 UI는 시안에 **픽셀 수준으로** 맞춰 재현하세요.

---

## Design Tokens

### 컬러 — 웜 시스템 (공개 페이지)
| 토큰 | 값 | 용도 |
|---|---|---|
| `paper` | `#F6F1E8` | 기본 배경 |
| `paper-alt` | `#EFE8DA` | 섹션 교차 배경 |
| `surface` | `#FAF6EE` / `#FBF8F2` | 카드 내부 |
| `ink` | `#231D16` | 주 텍스트·다크 섹션 배경 |
| `ink-deep` | `#1C1610` | 푸터 배경 |
| `sub` | `#5A5044` | 보조 텍스트 |
| `muted` | `#8C8273` | 캡션 |
| `line` | `#E5DBC9` / `#E0D6C4` | 보더 |
| `gold` | `#FDB813` | 1차 액센트(CTA·강조) |
| `gold-deep` | `#B8791A` | 링크 호버·eyebrow |
| `forest` | `#2E4A3F` | 2차 액센트(솔루션·확정 상태) — ⚠ 기존의 차가운 teal `#0d6e66`을 대체 |

### 컬러 — 관리자 콘솔
- **1안 (다크·작업큐형)**: 사이드바 `#111111`, 콘솔 배경 `#fbfbfa`, 카드 보더 `#e5e5df`, 액센트 **옐로우 `#eab308`**, 위험 주황 `#fff7ed/#fed7aa/#9a3412`.
- **2안 (라이트·인박스형, 선호안)**: 앱 배경 `#f7f7f8`, 카드/사이드바 `#fff`, 텍스트 `#18181b`/muted `#71717a`, 보더 `#ececed`/`#e4e4e7`, 액센트 **블루 `#2563eb`**(hover `#1d4ed8`, 연한 `#eff6ff`/`#bfdbfe`).

### 타이포그래피
- 영문/숫자: **Geist** (300–800), 모노: **Geist Mono**
- 한글: **Noto Sans KR** (300–800)
- 히어로 H1: `clamp(34px,5vw,78px)`, weight 600, letter-spacing `-0.04em`, line-height ~1.03
- 섹션 H2: `clamp(24px,3vw,46px)`, weight 600, letter-spacing `-0.03em`
- 본문: 15–19px, line-height 1.65–1.85, 한글은 `word-break:keep-all`/`text-wrap:balance` 권장
- eyebrow(소제목): 11–12px, weight 600, `letter-spacing:.2em`, `text-transform:uppercase`, color `gold-deep`

### 간격·형태
- 컨테이너: `max-width:1440px`, 좌우 패딩 `5vw`
- 섹션 세로 패딩: 80–120px (모바일 56px)
- border-radius: 카드 10–16px, 버튼 6–10px, 칩/배지 100px(pill)
- 그림자: `0 30px 60px -34px rgba(35,29,22,.5)`(부상형 이미지), 카드 `0 1px 3px rgba(0,0,0,.04)`
- 헤더: sticky, 높이 72px, `backdrop-filter:blur(12px)`, 반투명 페이퍼 배경

### 모션
- reveal-on-scroll: 아래 24–34px + opacity 0 → 0, `.85s cubic-bezier(.2,.7,.2,1)`, `animation-timeline:view()`
- 호버: 카드 `translateY(-3~5px)` + 그림자, 이미지 `scale(1.04~1.06)` `.6–.8s`
- `prefers-reduced-motion: reduce` 반드시 존중(모든 시안에 가드 포함)

---

## Screens / Views & 코드 매핑

| 디자인 파일 | 화면 | 실제 경로/파일 |
|---|---|---|
| `Weet 홈 리디자인 (A안).dc.html` | 홈(데스크톱) | `app/page.tsx` |
| `Weet 홈 모바일 (A안).dc.html` | 홈(모바일, iPhone 프레임 3컷) | 동일 — 반응형으로 흡수 |
| `Weet 모듈러건축 (A안).dc.html` | 모듈러건축 | `app/modular/page.tsx` |
| `Weet 제품소개 (A안).dc.html` | 제품소개(사이드바 라인업 + 스크롤스파이) | `app/products/ProductsPageClient.tsx` |
| `Weet 솔루션 A 콘솔.dc.html` | 솔루션 개요(4카테고리 카드 + 상세 모달) | `app/solution/*` (신규 구성) |
| `Weet 비스포크 (A안).dc.html` | 비스포크(B2B, 라이트박스) | `app/bespoke/page.tsx` |
| `Weet 고객지원 (A안).dc.html` | 고객지원(인허가·비용·진행·FAQ·상담폼) | `app/support/page.tsx` |
| `Weet 갤러리.dc.html` | 공개 갤러리/프로젝트(필터 + 상세 라이트박스) | `app/projects`, `app/gallery` |
| `Weet 회사소개 (A안).dc.html` | 회사소개(크루 상세 모달) | `app/about` 또는 해당 라우트 |
| `Weet 커스터마이즈 (B안).dc.html` | 주문제작 설정기 **(확정안)** | `components/customize/*` |
| `Weet 커스터마이즈 (A안/C안)` | 설정기 대안(A=원본 클론, C=제로베이스) | 참고용 |
| `Weet 로그인.dc.html` | 로그인 | `app/login/page.tsx` |
| `Weet 관리자 콘솔 (2안).dc.html` | 관리자 콘솔 **(선호안, 라이트·인박스)** | `app/admin/*`, `components/admin/*` |
| `Weet 관리자 콘솔.dc.html` | 관리자 콘솔 1안(다크) | 참고용 |

### 공통 요소
- **헤더**: 로고(영문 워드마크만) · 6개 메뉴(모듈러건축·제품소개·BESPOKE·SOLUTION·회사소개·고객지원) · KR · **"주문하기"** 버튼(잉크 배경). 모바일에서 메뉴 숨김.
- **푸터(통일)**: `ink-deep #1C1610` 배경, 4열(브랜드+제품/회사/지원 링크), 하단 카피라이트·약관·전화. `flex-wrap`으로 반응형.

### 페이지별 핵심 인터랙션
- **제품소개**: 좌측 라인업 사이드바(S/M/L/XL/DESIGN) sticky, 스크롤 시 활성 항목 골드 점 동기화, 클릭 시 해당 제품으로 점프(즉시 스크롤), 카드 호버 패럴럭스 + "자세히 보기" 힌트.
- **솔루션**: 4카테고리(시큐리티·네트워크·IoT·에너지) 카드 → 클릭 시 **상세 모달**(포함 항목·동작 3단계·일상의 변화). 다크 테크 톤 + 커서 글로우.
- **비스포크**: 좌우 교차 밴드 4개(SMALL CAFE·POP-UP·ACCOMMODATION·SMART FARM), 이미지 클릭 시 라이트박스. 헤더·히어로·CTA는 잉크 다크.
- **고객지원**: 인허가 3구분(농막/쉼터/주거), 비용 구성(확정=forest 점, 현장변수=gold 점), 진행 STEP 01–06, FAQ 아코디언(native `<details>`), 상담 폼.
- **커스터마이즈 B안(확정)**: 좌측 평면도(3×6 박스 → 3×9 선택 시 **우측 고정·좌측 벽 확장 애니메이션**, 동일 스케일 1m≈84px), 선택 마감이 도면 벽/바닥색에 반영. 우측 5스텝(모델→공간구성→무드·소재→스마트→검토). 옵션 카드 2열 + ⓘ 인포 모달. 가격은 **정확한 원화 표기**(예 28,000,000원). 검토 단계는 모델/단계별 요약(수정 버튼) + 가격 요약 + 상담 폼. POS·결제 없음(상담 요청만).
- **관리자 2안**: 라이트 사이드바 + 상단 바(⌘K 검색). 작업실(KPI·트리아지·전환율), 상담 관리(**인박스 분할뷰** = 좌 리스트 / 우 상세 + 상태 변경·메모), 제품(노출 토글·정렬), 주문 구성(옵션 활성 토글), 프로젝트/갤러리(카드 그리드), 랜딩 CMS(섹션 순서·노출 토글), 인사이트(트래픽 라인차트·기기 도넛·유입/지역 바·인기 페이지), UTM Builder(소스 칩 + 실시간 링크 생성·복사), 설정.

---

## State Management (구현 시)
- 공개 페이지는 대부분 정적 + 스크롤/모달 로컬 상태. 데이터(제품·프로젝트·옵션·상담)는 **기존 Supabase server actions 유지**.
- 커스터마이즈: 선택 상태(`model, windows, door, exterior, interior, flooring, kitchen[], bath[], furniture[], energy[], connectivity[]`) → 가격 계산(`priceCalculator`)·도면 반영. 시안 로직은 참고만, 실제 카탈로그는 `getPublicCustomizeCatalog` 등 기존 소스 사용.
- 관리자: 상태 변경·토글·필터·정렬은 기존 actions(`updateCustomizeConsultationStatus` 등)와 `useTransition`/`router.refresh` 패턴에 연결.

## Assets
시안 이미지는 모두 기존 레포의 실제 자산을 사용했습니다(`public/images/...`). 프로젝트 내 `img/`에 사본이 있으며, 매핑은 파일명으로 유추 가능(예 `m-3x6.webp`=3×6 모델, `mod-*`=모듈러, `sol-*`=솔루션, `bsp-*`=비스포크, `co-*`=회사소개, `sup-*`=고객지원). 아이콘은 Lucide(기존 의존성)로 대체하세요 — 시안의 인라인 SVG는 Lucide와 동일 계열입니다.

## 구현 순서 & Claude Code 프롬프트 예시
1. **토큰 심기**: `tailwind.config.ts`에 위 `weet.*` 컬러 추가, Geist/Noto Sans KR 폰트 로드.
2. **공통 컴포넌트**: 헤더·푸터를 시안대로 재작성(반응형 포함).
3. **페이지 단위 이식** — 한 번에 하나씩:
   > "`design_handoff_weet/Weet 모듈러건축 (A안).dc.html`을 디자인 기준으로 `app/modular/page.tsx`를 다시 작성해줘. i18n(LanguageContext)·데이터·라우팅은 유지하고 마크업·Tailwind만 교체. 색은 `weet.*` 토큰 사용, 아이콘은 Lucide."
4. **관리자**: `AdminShell`(사이드바·상단바)부터 2안 라이트 테마로 교체 후 페이지별 섹션 이식. 액센트는 `#2563eb`.
5. **검수**: `prefers-reduced-motion`, 모바일 브레이크포인트(≤860px 네비 접힘·그리드 1열), 다크/라이트 대비.

## Files
이 폴더의 모든 `*.dc.html`이 디자인 레퍼런스입니다. `.dc.html`은 `<x-dc>` 템플릿 + `<script data-dc-script>` 로직 클래스 구조이며, 구현 시에는 **렌더된 결과(브라우저로 연 모습)**를 기준으로 삼고 내부 마크업/스타일 값을 그대로 참고하세요.

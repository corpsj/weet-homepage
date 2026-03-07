# Draft: weet:) Homepage Redesign

## Requirements (confirmed)
- 현대적이고 온라인 친화적인 이동식주택 판매 홈페이지
- 테슬라 홈페이지처럼 제품 중심 UX
- "위트 있는" 브랜드 경험

## Current State Analysis
- Next.js 16 + React 19 + TypeScript + Supabase 풀스택
- Tailwind CSS (Primary: #FEBD16 위트 옐로우)
- Vercel 배포, Framer Motion 애니메이션
- 40+ 페이지, 60+ 컴포넌트, Admin CMS 완비
- 제품 카테고리: S/M/L/XL/SOLUTION/DESIGN (Private/Public)
- 다국어: KO/EN (ES 미완성)

## Tesla vs weet:) Gap Analysis
| Tesla Pattern | Current weet:) | Gap |
|---|---|---|
| Full-screen product hero (scroll snap) | Carousel banner | Product not the hero |
| Product configurator | Product list + sidebar filter | No participation |
| "Order Now" CTA | Inquiry form only | No purchase journey |
| Scroll-driven storytelling | Static sections | No immersion |
| Monthly payment emphasis | Price in list format | No price psychology |
| Model comparison table | Individual products only | Can't compare |
| Minimal text, max visual | Text-heavy descriptions | Must read to understand |

## Proposed Improvements (7 Ideas)

### 1. "One Screen, One Home" Full-Screen Scroll
- Tesla-style homepage = product showroom
- Scroll snap: S → M → L → XL fullscreen sequence
- Background: product photo, center: name + "from ₩XX만/mo" + CTA

### 2. Product Configurator ("Build Your Weet")
- Step 1: Size (S/M/L/XL)
- Step 2: Exterior finish (color/material preview)
- Step 3: Interior finish
- Step 4: Options (CCTV, IoT, Network)
- Step 5: Quote + monthly payment calculator
- Step 6: Consultation booking or deposit payment

### 3. Scroll-Driven Storytelling ("/modular" page)
- Factory module assembly unfolds on scroll
- Count-up numbers (3 months construction, 50 year durability)
- Parallax + Framer Motion immersion

### 4. Model Comparison Table
- S vs M vs L vs XL side-by-side
- Area, price, monthly payment, rooms/bathrooms
- Price slider for monthly payment simulation

### 5. Project Gallery → Story Format
- Before/After slider
- Timeline (contract → build → transport → install → move-in)
- Customer interviews/review videos

### 6. Witty Copy & Micro-interactions
- 404: "This house hasn't been built yet"
- Loading: "Building..." (assembly animation)
- Product hover: witty one-liners
- Easter eggs
- End of scroll: "If you've scrolled this far, you're halfway moved in :)"

### 7. Online Order Flow
- Configurator complete → Auto-generate quote PDF
- "Book consultation" (calendar integration)
- "Pay deposit" (₩1,000,000 reservation)
- Post-order dashboard: real-time build tracking

## Competitive Landscape
| Company | Strength | weet:) Opportunity |
|---|---|---|
| Tesla | Full-screen product, configurator, "Order Now" | Overall UX direction |
| Boxabl | "$895/mo" price psychology, simple lineup | Pricing presentation |
| Apple | Scroll storytelling, spec animations | Modular tech explanation |
| Rivian | Outdoor lifestyle imagery | Product + lifestyle photography |
| ICON | Tech storytelling (best in housing) | No configurator/online order |
| Boxabl | Visual ambition | No configurator, waitlist only |

## Unique weet:) Advantages (Housing > Cars)
- "Place on your land" AR — phone camera + module AR placement
- Build progress tracker — real-time factory dashboard after reservation
- Energy dashboard — carbon offset, energy efficiency visualization
- Community visualizer — multi-unit placement simulation

## Technology Options
| Use Case | Technology | Complexity |
|---|---|---|
| Scroll animations | GSAP ScrollTrigger | Medium |
| Product frame sequence | Canvas + JS (Apple technique) | Medium |
| 3D configurator | Three.js / Babylon.js | High |
| Turnkey configurator | Dwellito / TinyEasy / Inhaabit (SaaS) | Low |
| AR placement | WebXR / model-viewer (Google) | Medium |

## AR Impact Data
- 61% of consumers prefer AR shopping
- 80% reduction in return rates
- 30% average increase in sales
- 11x more likely to purchase with AR

## Reference Websites

### Tier 1: Direct Competitors (Modular/Prefab Housing)

#### 1. ICON (iconbuild.com) — "기술 회사가 집을 짓는다"
- **URL**: https://www.iconbuild.com
- **핵심 패턴**: 제품이 아니라 "기술"을 히어로로 내세움 (3D 프린터 Titan)
- **배울 점**: "Intelligent Machines Building Humanity's Future" — 건축회사가 아닌 테크기업 포지셔닝
- **구조**: Hero(기술) → 제품 카드 그리드 → 기술 스토리 → 사회적 임팩트(노숙자 주거, 우주)
- **weet 적용**: 모듈러 기술 자체를 브랜드 핵심으로 — "공장에서 태어난 집"
- **약점**: 온라인 주문/컨피규레이터 없음, "Contact Us"만 존재

#### 2. Nestron (nestron.house) — "미래형 타이니홈 + 컨피규레이터"
- **URL**: https://nestron.house
- **핵심 패턴**: 제품 카드 그리드 (Cube One/Two, Legend One/Two) + 컨피규레이터 + 소유 과정 7단계 시각화
- **배울 점**: "Steps To Ownership" — 탐색→상담→보증금→설계심사→제작→배송→설치→입주 흐름을 시각적으로
- **구조**: 서비스 개요 → 제품 카드 6개 → 소유과정 타임라인 → 언론보도 → 리뷰
- **weet 적용**: 제품 카드 그리드 + 구매 여정 시각화 직접 차용 가능
- **약점**: 스크롤 스토리텔링 부재, 정적인 레이아웃

#### 3. haus.me — "질문-답변형 스크롤 스토리"
- **URL**: https://haus.me
- **핵심 패턴**: 스크롤할 때마다 Q&A 형식으로 제품 설명이 펼쳐짐
- **배울 점**: "배송 시간은? → 다음날!" / "에너지는? → 무한 태양에너지" — 대화형 스토리텔링
- **구조**: Hero(기술 강조) → Q&A 스크롤(내구성→기후→에너지→스마트홈→설치) → 모델 3개 비교 → CTA
- **가격 표시**: $35,000 / $160,000 / $299,000 — 명확한 가격 공개
- **weet 적용**: Q&A 스크롤 패턴은 "모듈러가 뭐야?" 교육에 완벽
- **약점**: 디자인이 다소 올드함, 모바일 최적화 부족

#### 4. Boxabl (boxabl.com) — "월납입 가격 심리학"
- **URL**: https://www.boxabl.com
- **핵심 패턴**: "From $895/Mo" — 총가격이 아닌 월납입 강조
- **배울 점**: 미디어 로고 스트립(CNN, Forbes, NBC), 드론 팩토리 영상 히어로
- **구조**: Hero(공장 드론영상) → 미디어 로고 → 제품별 이미지 캐러셀 → 파이낸싱 → 프로젝트
- **weet 적용**: 월납입 프레이밍 + 미디어/파트너 신뢰 배지
- **약점**: 컨피규레이터 없음, Pre-Order → 단순 폼

#### 5. Tiny Heirloom (tinyheirloom.com) — "라이브 가격 빌더"
- **URL**: https://www.tinyheirloom.com/tiny-home-configurator
- **핵심 패턴**: 실시간 가격이 변하는 컨피규레이터
- **배울 점**: 베이스 모델 선택($59,900~$149,900) → 욕실 → 주방 → 가구 → 테크 → 실시간 총가격
- **weet 적용**: 컨피규레이터 UX 직접 참고 가능 (Step-by-step + 실시간 가격)

#### 6. Atomic Tiny Homes (atomictinyhomes.com) — "디자인 패키지"
- **URL**: https://atomictinyhomes.com/customize-your-tiny-home/
- **핵심 패턴**: 모델 선택 → 평면도 → "디자인 패키지"(Standard/Modern/Farmhouse) → 세부 옵션
- **배울 점**: 복잡한 커스텀을 "패키지"로 단순화 — 선택 피로도 감소
- **weet 적용**: 외장/내장을 개별 옵션 대신 "시그니처 패키지"로 묶기

---

### Tier 2: Premium Product Websites (비주택, UX 패턴 참고)

#### 7. Tesla (tesla.com) — "원조 풀스크린 제품 히어로"
- **핵심**: 100vh 제품 사진 + "Order Now" / "Test Drive" 듀얼 CTA
- **weet 적용**: 전체 UX 방향성의 북극성

#### 8. Apple (apple.com/iphone) — "스크롤 = 애니메이션 프레임"
- **핵심**: Canvas에 이미지 시퀀스 매핑, 스크롤 위치 = 애니메이션 진행도
- **weet 적용**: 모듈이 "접힌 상태 → 펼쳐지는 과정" 을 스크롤로 보여주기

#### 9. Rivian (rivian.com) — "라이프스타일 먼저, 스펙은 나중에"
- **핵심**: 자연/모험 배경에 차량 배치, "Forever" 내러티브
- **배울 점**: 제품이 아닌 "그 안의 삶"을 먼저 보여줌
- **weet 적용**: 모듈 안에서의 라이프스타일 (재택근무, 가족 식사, 테라스 커피) 연출

#### 10. Artisans de Genève (artisansdegeneve.com) — "비스포크 럭셔리"
- **핵심**: 시계 커스터마이징 → 나만의 유니크 제품 경험
- **weet 적용**: /bespoke 페이지에 "내가 만드는 유일한 집" 경험 강화

#### 11. Aventi (aventi.com/starfire) — "프리미엄 스크롤 스토리텔링"
- **핵심**: 한 화면씩 제품 디테일이 드라마처럼 펼쳐짐
- **배울 점**: "소재 → 역사 → 장인정신" 순서의 감성 스토리
- **weet 적용**: "목재 → 단열 → 모듈 조립 → 완성" 장인정신 스토리

---

### Tier 3: 내 제안 — 위트만의 독창적 아이디어

#### 12. "집이 찾아오는 경험" — 배송 트래킹 인터랙션
- 택배처럼 "주문 → 제작중 → 출고 → 배송중 → 설치" 실시간 트래킹
- 쿠팡/배달의민족 배송 트래킹 UX를 집에 적용
- 참고: Domino's Pizza Tracker — 피자 만드는 과정을 실시간으로

#### 13. "집 한 채의 탄소발자국" — 지속가능성 대시보드
- 일반 건축 vs 모듈러 건축의 탄소 배출 실시간 비교
- 스크롤하면 숫자가 올라가는 인포그래픽
- 참고: Stripe Climate (stripe.com/climate) — 환경 임팩트 시각화

#### 14. "동네 시뮬레이터" — 여러 채 배치 인터랙션
- 부지에 weet 모듈을 여러 채 배치해보는 드래그 앤 드롭
- 글램핑장/펜션단지/사원주택 사업자 타겟
- 참고: SimCity/Cities Skylines 느낌의 2D 탑뷰 인터랙션

#### 15. "위트 봇" — AI 상담사
- "어떤 집이 맞을까요?" AI 챗봇
- 가족 수, 예산, 용도, 부지 조건 입력 → 맞춤 추천
- 참고: Intercom Product Tours 방식의 대화형 온보딩

#### 16. "내 땅에 놓아보기" — WebAR
- 폰 카메라로 내 부지를 비추면 모듈이 실제 크기로 배치
- 참고: IKEA Place 앱의 AR 가구 배치
- 기술: Google model-viewer / WebXR

---

### 레퍼런스 요약 매트릭스

| # | 사이트 | 배울 패턴 | 위트 적용 포인트 | 우선도 |
|---|---|---|---|---|
| 1 | ICON | 기술 스토리텔링 | 모듈러 기술 = 브랜드 | ★★★ |
| 2 | Nestron | 제품 카드 + 구매 여정 | 소유과정 시각화 | ★★★ |
| 3 | haus.me | Q&A 스크롤 스토리 | 모듈러 교육 | ★★☆ |
| 4 | Boxabl | 월납입 + 미디어 배지 | 가격 심리학 | ★★★ |
| 5 | Tiny Heirloom | 라이브 가격 컨피규레이터 | 컨피규레이터 UX | ★★☆ |
| 6 | Atomic Tiny | 디자인 패키지 | 선택 단순화 | ★★☆ |
| 7 | Tesla | 풀스크린 + 컨피규레이터 | 전체 방향 | ★★★ |
| 8 | Apple | 스크롤 프레임 시퀀스 | 조립 과정 시각화 | ★★★ |
| 9 | Rivian | 라이프스타일 우선 | 삶의 모습 연출 | ★★☆ |
| 10 | Artisans de Genève | 비스포크 럭셔리 | /bespoke 강화 | ★☆☆ |
| 11 | Aventi | 프리미엄 스크롤 스토리 | 소재/장인정신 | ★☆☆ |

## Korean Market Context (한국 실정 검토)

### Market Facts
- 정부 "모듈러 특별법" 제정 추진 중 (2025~2026)
- 국내 모듈러 시장 연 36.9% 성장 (20년간)
- 현대엔지니어링, GS건설, 삼성물산 등 대기업 진출
- 체류형 쉼터 규제 완화 → 농막/세컨하우스 수요 급증
- 한국 글램핑 시장 2024 $68.4M → 2033 $206M (CAGR 11.68%)
- 이동식주택 가격: 10평 2,000~3,000만 / 20평 3,000~5,000만

### Financial Services Status
- ⚠️ 할부/리스 금융 서비스 미계약 상태
- 월납입 표시 불가 (금융 파트너 없음)
- 가격 표시는 총액 기준으로만 가능
- 향후 금융 파트너 확보 시 월납입 표시 추가 가능

### What WORKS in Korea
- ~~월납입 표시~~: 금융서비스 미계약으로 현재 불가 → 대안: 총액을 덜 무겁게 보여주는 방식
- 풀스크린 비주얼: 인스타/유튜브 세대, 비주얼이 신뢰
- 비교 테이블: 네이버 카페 "XX vs YY" 문화, 비교표 없으면 정보 통제권 상실
- 위트 카피: 배민/야놀자 밈 마케팅 성공 사례, 한국 감성에 맞음
- 카카오톡 상담: 전화보다 카톡 선호, 비즈채널 필수

### What DOESN'T WORK in Korea
- 온라인 계약금 결제: 주택 온라인 결제 불신, 부동산 사기 뉴스 다수
- "Reserve" 원클릭: 한국인 구매여정 = 네이버→블로그→카페→카톡→방문→계약
- 영어식 UX 용어: "Configure" → "내 집 설계하기", "Reserve" → "상담 신청하기"

### Korean-Specific Modifications
- "Reserve with deposit" → "무료 상담 신청" + "견적서 받기"
- Calendar booking → 카카오톡 채널 연동 + 캘린더
- "$895/mo" → "월 39만원~ (36개월, 선납 10%)" 상세 조건
- Configurator → "견적 시뮬레이터" (결제X, 견적O)
- Press logos → SBS/KBS/조선일보 + 정부 인증 뱃지
- Customer reviews → 네이버 블로그 후기 연동 + 실제 고객 인터뷰 영상

### Korean-Only Opportunities
- "모듈러 특별법" 신뢰 뱃지
- 체류형 쉼터 전용 랜딩 페이지
- 네이버 SEO / 카페 전략 (구매여정 80% 네이버)
- 방문 체험관/공장 투어 예약

## Updated Phase Plan (Korean-Adjusted)

### Phase 1: 첫인상 혁명
- 풀스크린 제품 히어로 (스크롤 스냅)
- 위트 있는 카피 (배민 스타일)
- 모델 비교 테이블 (S/M/L/XL)
- 월납입 가격 (상세 조건 포함)
- 카카오톡 상담 연동
- 네이버 블로그 후기 연동
- 미디어/정부 신뢰 뱃지

### Phase 2: 스토리텔링 + 전환
- 스크롤 스토리텔링 (/modular)
- 견적 시뮬레이터 (Step-by-step, 결제 없음)
- 프로젝트 Before/After 스토리
- 체류형 쉼터 전용 페이지
- 체험관/공장 투어 예약
- 유튜브 임베드 + 구독 유도

### Phase 3: 차별화 무기
- 배송/건축 트래킹 대시보드
- WebAR "내 땅에 놓아보기"
- AI 상담 챗봇
- 네이버 스마트스토어 연동

## Confirmed Decisions (Session 2)

### Scope Decision
- **Phase 1 + 2 + 3 전체 진행** (대규모 리뉴얼)
- **기존 홈페이지 구조 유지 + 2안(새 디자인) 병행 개발** — 롤백 가능하도록
- 이는 기존 라우트를 건드리지 않고 새 라우트/컴포넌트를 만들거나, feature flag/branch 전략 필요

### 체류형 쉼터
- **전용 랜딩 페이지 필요** — Phase 2에 포함

### 카카오톡
- **비즈채널 아직 없지만 만들 예정** — 연동 준비만 해두기 (플레이스홀더 + 설정 가이드)

### 에셋
- **고퀄리티 사진/영상 보유** — 풀스크린 히어로 구현 가능

### 롤백 전략
- **Git 브랜치 분리** — `redesign` 브랜치에서 전체 개발, 완성 후 main 머지
- 기존 main은 그대로 유지 → 언제든 롤백 가능

### Figma 디자인
- **Figma 없음** — AI가 레퍼런스 기반으로 디자인 제안/구현
- CLAUDE.md의 "Figma 철저히 따라야" 규칙은 이번 리디자인에서는 적용하지 않음
- 대신 레퍼런스 사이트(Tesla, ICON, Nestron 등) + 위트 브랜드 가이드라인 기반

### 네이버
- **블로그/카페 아직 운영 안 함** — 네이버 후기 연동 제외
- 대신: 자체 고객 후기/프로젝트 스토리로 신뢰 구축
- 향후 네이버 운영 시 연동 가능하도록 구조만 준비

### 테스트 전략
- **테스트 인프라 세팅 + 테스트 작성** (Tests-after)
- 프레임워크: vitest (Next.js와 가장 호환 좋음)
- Wave 1에 vitest 세팅 태스크 포함
- 각 핵심 컴포넌트에 테스트 작성
- + 모든 태스크에 Playwright/curl QA 시나리오 포함

## Open Questions (Remaining)
- 없음 — 모든 요구사항 확인 완료

## Scope Boundaries
- INCLUDE: Phase 1+2+3 전체, 체류형 쉼터 랜딩, 카톡 연동 준비, 홈페이지 전면 리디자인
- INCLUDE: 기존 홈페이지 롤백 가능 구조
- EXCLUDE: 할부/리스 금융 서비스, 온라인 결제/계약금, 3D 컨피규레이터
- EXCLUDE: (추가 TBD)

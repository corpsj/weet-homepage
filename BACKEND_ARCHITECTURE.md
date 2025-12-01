# Weet 백엔드 아키텍처 플랜

## 개요
we-et.com 도메인을 활용한 통합 백엔드 시스템 구축 계획

---

## 1. 도메인 구조 및 서비스 분리

### 도메인 설계
```
we-et.com                    # 메인 홈페이지 (Next.js SSR)
├── www.we-et.com           # 메인 홈페이지 (리다이렉트)
├── api.we-et.com           # REST API 서버
├── admin.we-et.com         # 관리자 대시보드
├── files.we-et.com         # CDN/파일 서버
├── auth.we-et.com          # 인증 서버 (SSO)
└── internal.we-et.com      # 내부 앱 포털
    ├── crm.internal        # CRM 시스템
    ├── inventory.internal  # 재고 관리
    └── ...                 # 기타 내부 앱
```

---

## 2. 기술 스택 권장사항

### Backend Framework
**Option 1: Node.js (추천)**
- **NestJS**: 엔터프라이즈급 구조, TypeScript 네이티브, Next.js와 완벽한 통합
- 장점: 프론트엔드와 동일 언어, 빠른 개발, 풍부한 생태계
- 단점: 대규모 트래픽 처리 시 성능 이슈 가능

**Option 2: Go**
- **Gin/Echo**: 고성능, 낮은 리소스 사용
- 장점: 뛰어난 성능, 컴파일 언어, 동시성 처리 우수
- 단점: 러닝 커브, 생태계가 Node.js보다 작음

**Option 3: Python**
- **FastAPI**: 빠른 개발, 자동 문서화, 타입 힌트
- 장점: AI/ML 통합 용이, 풍부한 라이브러리
- 단점: 성능은 Go/Node보다 낮음

### 데이터베이스
**Primary Database (관계형)**
- **PostgreSQL** (추천)
  - 강력한 JSONB 지원
  - 풀텍스트 검색
  - 확장성 우수
  - 오픈소스

**Alternative Options**
- **MySQL/MariaDB**: 간단한 설정, 검증된 안정성
- **SQLite**: 초기 개발/테스트용 (프로덕션 비권장)

**Secondary Database (캐싱/세션)**
- **Redis**
  - 세션 스토리지
  - 캐싱 레이어
  - Rate limiting
  - 실시간 데이터

### 파일 스토리지
**Option 1: AWS S3 (추천)**
- CloudFront CDN 연동
- 무제한 확장성
- 저렴한 비용
- 99.999999999% 내구성

**Option 2: Cloudflare R2**
- S3 호환 API
- Egress 비용 무료
- Cloudflare CDN 통합

**Option 3: Self-hosted (MinIO)**
- S3 호환 오픈소스
- 완전한 제어권
- 초기 인프라 비용

### 인증/인가
**Keycloak** (추천) 또는 **Auth0**
- SSO (Single Sign-On)
- OIDC/OAuth2
- SAML 지원
- Role-based Access Control (RBAC)
- 다중 앱 통합

---

## 3. 데이터베이스 스키마 설계

### 핵심 테이블 구조

```sql
-- 사용자 관리
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(100) NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'user', -- admin, editor, user
  department VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_login TIMESTAMP,
  is_active BOOLEAN DEFAULT true
);

-- 제품 카테고리
CREATE TABLE product_categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  size_category VARCHAR(10), -- S, M, L, XL, SOLUTION, DESIGN
  description TEXT,
  display_order INT DEFAULT 0,
  parent_id INT REFERENCES product_categories(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 제품
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id INT REFERENCES product_categories(id),
  name VARCHAR(200) NOT NULL,
  slug VARCHAR(200) UNIQUE NOT NULL,
  description TEXT,
  specifications JSONB, -- 유연한 스펙 저장
  price DECIMAL(10, 2),
  is_published BOOLEAN DEFAULT false,
  view_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by UUID REFERENCES users(id)
);

-- 제품 이미지
CREATE TABLE product_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  file_url VARCHAR(500) NOT NULL,
  file_key VARCHAR(500) NOT NULL, -- S3 key
  thumbnail_url VARCHAR(500),
  alt_text VARCHAR(200),
  display_order INT DEFAULT 0,
  is_primary BOOLEAN DEFAULT false,
  file_size INT,
  mime_type VARCHAR(50),
  width INT,
  height INT,
  uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  uploaded_by UUID REFERENCES users(id)
);

-- 파트너
CREATE TABLE partners (
  id SERIAL PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  logo_url VARCHAR(500),
  website VARCHAR(500),
  description TEXT,
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 고객 문의
CREATE TABLE inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type VARCHAR(50) NOT NULL, -- consultation, quote, question, as
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  company VARCHAR(200),
  subject VARCHAR(300) NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'pending', -- pending, in_progress, resolved
  assigned_to UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  resolved_at TIMESTAMP
);

-- 솔루션
CREATE TABLE solutions (
  id SERIAL PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  slug VARCHAR(200) UNIQUE NOT NULL,
  category VARCHAR(100), -- CCTV, Internet, Smart Home, Design
  description TEXT,
  features JSONB,
  image_url VARCHAR(500),
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true
);

-- 비스포크 프로젝트 예시
CREATE TABLE bespoke_examples (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(200) NOT NULL,
  slug VARCHAR(200) UNIQUE NOT NULL,
  category VARCHAR(100),
  description TEXT,
  specifications JSONB,
  main_image_url VARCHAR(500),
  gallery_images JSONB, -- Array of image URLs
  completion_date DATE,
  display_order INT DEFAULT 0,
  is_published BOOLEAN DEFAULT false
);

-- 페이지 콘텐츠 (CMS)
CREATE TABLE page_contents (
  id SERIAL PRIMARY KEY,
  page_key VARCHAR(100) UNIQUE NOT NULL, -- 'home_hero', 'about_vision', etc.
  title VARCHAR(300),
  content TEXT,
  media_urls JSONB,
  metadata JSONB,
  language VARCHAR(10) DEFAULT 'ko', -- ko, en, es
  is_published BOOLEAN DEFAULT true,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_by UUID REFERENCES users(id)
);

-- 방문 예약
CREATE TABLE visit_reservations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  preferred_date DATE NOT NULL,
  preferred_time VARCHAR(50),
  visitor_count INT DEFAULT 1,
  purpose TEXT,
  status VARCHAR(50) DEFAULT 'pending', -- pending, confirmed, cancelled
  confirmed_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 활동 로그 (감사 추적)
CREATE TABLE activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  action VARCHAR(100) NOT NULL, -- create, update, delete, login
  entity_type VARCHAR(100), -- product, user, inquiry
  entity_id VARCHAR(100),
  metadata JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 인덱스
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_product_images_product ON product_images(product_id);
CREATE INDEX idx_inquiries_status ON inquiries(status);
CREATE INDEX idx_inquiries_created ON inquiries(created_at DESC);
CREATE INDEX idx_activity_logs_user ON activity_logs(user_id);
CREATE INDEX idx_activity_logs_created ON activity_logs(created_at DESC);
```

---

## 4. API 설계

### RESTful API 엔드포인트

```
# 인증
POST   /api/v1/auth/register
POST   /api/v1/auth/login
POST   /api/v1/auth/logout
POST   /api/v1/auth/refresh
GET    /api/v1/auth/me

# 제품
GET    /api/v1/products              # 목록 (필터링, 페이지네이션)
GET    /api/v1/products/:slug        # 단일 조회
POST   /api/v1/products              # 생성 (관리자)
PUT    /api/v1/products/:id          # 수정 (관리자)
DELETE /api/v1/products/:id          # 삭제 (관리자)

# 제품 이미지
POST   /api/v1/products/:id/images   # 이미지 업로드
DELETE /api/v1/products/:id/images/:imageId
PUT    /api/v1/products/:id/images/:imageId/reorder

# 카테고리
GET    /api/v1/categories
GET    /api/v1/categories/:slug
POST   /api/v1/categories            # 관리자
PUT    /api/v1/categories/:id        # 관리자
DELETE /api/v1/categories/:id        # 관리자

# 문의
POST   /api/v1/inquiries             # 고객 문의 생성
GET    /api/v1/inquiries             # 목록 (관리자)
GET    /api/v1/inquiries/:id         # 단일 조회 (관리자)
PUT    /api/v1/inquiries/:id         # 상태 업데이트 (관리자)

# 방문 예약
POST   /api/v1/reservations          # 예약 생성
GET    /api/v1/reservations          # 목록 (관리자)
PUT    /api/v1/reservations/:id      # 확인/취소 (관리자)

# 솔루션
GET    /api/v1/solutions
GET    /api/v1/solutions/:slug

# 비스포크
GET    /api/v1/bespoke
GET    /api/v1/bespoke/:slug

# 파트너
GET    /api/v1/partners
POST   /api/v1/partners              # 관리자
PUT    /api/v1/partners/:id          # 관리자
DELETE /api/v1/partners/:id          # 관리자

# 페이지 콘텐츠 (CMS)
GET    /api/v1/content/:pageKey
PUT    /api/v1/content/:pageKey      # 관리자

# 파일 업로드
POST   /api/v1/upload                # Presigned URL 발급
POST   /api/v1/upload/complete       # 업로드 완료 처리

# Instagram 연동
GET    /api/v1/instagram/feed        # 캐시된 Instagram 피드

# 분석/통계 (관리자)
GET    /api/v1/analytics/dashboard
GET    /api/v1/analytics/products
GET    /api/v1/analytics/inquiries
```

---

## 5. 인증 시스템 (SSO)

### Keycloak 구성

```yaml
Realm: weet
Clients:
  - weet-homepage (Public)
  - weet-admin (Confidential)
  - weet-crm (Confidential)
  - weet-inventory (Confidential)

Roles:
  - admin: 모든 권한
  - editor: 콘텐츠 편집 권한
  - viewer: 읽기 전용
  - customer: 일반 고객

Groups:
  - management: 경영진
  - sales: 영업팀
  - production: 생산팀
  - design: 디자인팀
```

### JWT 토큰 구조
```json
{
  "sub": "user-uuid",
  "email": "user@we-et.com",
  "name": "홍길동",
  "roles": ["admin", "editor"],
  "groups": ["management"],
  "iss": "https://auth.we-et.com",
  "exp": 1234567890
}
```

---

## 6. 파일 업로드 플로우

### Direct Upload to S3 (권장)
```
1. 클라이언트 → API: 파일 메타데이터 전송
2. API → S3: Presigned URL 생성
3. API → 클라이언트: Presigned URL 반환
4. 클라이언트 → S3: 직접 업로드
5. 클라이언트 → API: 업로드 완료 알림
6. API → DB: 파일 정보 저장
```

### 이미지 최적화 파이프라인
```
Original Upload
  ↓
Lambda/Cloud Function
  ↓
├─ Thumbnail (200x200)
├─ Small (400x400)
├─ Medium (800x800)
└─ Large (1200x1200)
  ↓
CloudFront/CDN
```

---

## 7. 배포 아키텍처

### ⭐ Option 1: Synology NAS DS920+ 활용 (최우선 추천)

```
┌─────────────────────────────────────────┐
│   Cloudflare (CDN + DNS + SSL)          │
│   we-et.com                             │
└─────────────────┬───────────────────────┘
                  │
                  │ Cloudflare Tunnel
                  │ (또는 DDNS + 포트포워딩)
                  │
                  ▼
┌──────────────────────────────────────────────────────┐
│   Synology DS920+ NAS (온프레미스)                    │
│   ┌────────────────────────────────────────────┐    │
│   │  Docker (Container Station)                │    │
│   │  ├─ Nginx Proxy Manager (Reverse Proxy)   │    │
│   │  ├─ Next.js (Static Export to Web Station)│    │
│   │  ├─ NestJS API (Container)                │    │
│   │  ├─ PostgreSQL (Container)                │    │
│   │  ├─ Redis (Container)                     │    │
│   │  ├─ Keycloak (SSO Container)              │    │
│   │  └─ Portainer (컨테이너 관리 UI)           │    │
│   └────────────────────────────────────────────┘    │
│   ┌────────────────────────────────────────────┐    │
│   │  File Storage                              │    │
│   │  ├─ /volume1/web (웹사이트 파일)            │    │
│   │  ├─ /volume1/uploads (제품 이미지)         │    │
│   │  ├─ /volume1/backups (자동 백업)           │    │
│   │  └─ /volume1/docker (컨테이너 볼륨)        │    │
│   └────────────────────────────────────────────┘    │
│   ┌────────────────────────────────────────────┐    │
│   │  Hyper Backup (자동 백업)                   │    │
│   │  ├─ DB 백업 (일 1회)                       │    │
│   │  ├─ 파일 백업 (일 1회)                     │    │
│   │  └─ 오프사이트 백업 (주 1회)                │    │
│   └────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────┘
```

**하드웨어 스펙 (DS920+)**
- CPU: Intel Celeron J4125 (4코어, 2.0-2.7GHz)
- RAM: 4GB (8GB 확장 권장)
- 스토리지: 최대 4개 HDD/SSD
- 네트워크: 2x 1GbE (Link Aggregation 지원)
- 트랜스코딩: 하드웨어 가속 지원

**비용 분석**
- NAS: 이미 보유 ($0)
- RAM 업그레이드 8GB: $50 (일회성)
- Cloudflare: $0 (Free) 또는 $20 (Pro, 선택)
- 도메인: $12/년
- 전기료: 약 $5-10/월 (24시간 가동)
**총 예상 비용: $5-10/월 (운영비만)** 🎉

**장점**
✅ 초기 투자 최소 (NAS 보유)
✅ 무제한 스토리지 (HDD 추가 가능)
✅ 완전한 데이터 제어권
✅ 빠른 로컬 네트워크 속도
✅ 자동 백업 및 스냅샷
✅ Docker 완벽 지원
✅ 다양한 내부 앱 호스팅 가능
✅ RAID로 데이터 안정성 확보

**단점 및 해결책**
❌ 업로드 속도 제한 → Cloudflare 캐싱으로 해결
❌ 가정용 인터넷 불안정 → Cloudflare Tunnel로 안정화
❌ 정전 위험 → UPS 설치 권장
❌ 성능 제약 → Redis 캐싱으로 최적화

---

### Option 2: 하이브리드 (Vercel + Synology NAS)

```
┌──────────────────────────────────┐
│      Vercel (Next.js SSR)        │
│      we-et.com                   │
└────────────┬─────────────────────┘
             │
             │ API 호출
             │
             ▼
┌──────────────────────────────────┐
│   Cloudflare Tunnel              │
└────────────┬─────────────────────┘
             │
             ▼
┌──────────────────────────────────┐
│   Synology NAS (백엔드 전용)      │
│   ├─ NestJS API                 │
│   ├─ PostgreSQL                 │
│   ├─ Redis                      │
│   ├─ Keycloak                   │
│   └─ 파일 스토리지               │
└──────────────────────────────────┘
```

**비용 예측 (월)**
- Vercel Hobby: $0 (또는 Pro $20)
- Cloudflare: $0
- NAS 전기료: $5-10
**총 예상 비용: $5-30/월**

**장점**
- Vercel의 엣지 최적화 + NAS의 저렴한 스토리지
- 프론트엔드는 글로벌 CDN, 백엔드는 안정적 자체 서버

---

### Option 3: AWS (대규모 확장 필요 시)

```
┌─────────────────────────────────────────┐
│         Route 53 (DNS)                  │
│         we-et.com                       │
└─────────────────┬───────────────────────┘
                  │
    ┌─────────────┼─────────────┐
    │             │             │
    ▼             ▼             ▼
┌────────┐  ┌──────────┐  ┌──────────┐
│CloudFront  │  ALB       │  ALB      │
│(Static)│  │ (API)    │  │ (Admin)  │
└────┬───┘  └────┬─────┘  └────┬─────┘
     │           │             │
     ▼           ▼             ▼
┌─────────┐ ┌────────────┐ ┌──────────┐
│ S3      │ │ ECS/Fargate│ │ECS/Fargate│
│(Next.js)│ │ (NestJS)   │ │ (Admin)  │
└─────────┘ └──────┬─────┘ └──────────┘
                   │
            ┌──────┴──────┐
            │             │
            ▼             ▼
      ┌──────────┐  ┌──────────┐
      │   RDS    │  │  Redis   │
      │(Postgres)│  │(ElastiCache)│
      └──────────┘  └──────────┘
```

**비용 예측 (월)**
- ECS Fargate (2 tasks): $50-100
- RDS (db.t3.micro): $20-30
- ElastiCache (cache.t3.micro): $15-20
- S3 + CloudFront: $10-30
- Route 53: $1
**총 예상 비용: $96-181/월**

---

## 8. 보안 고려사항

### 필수 보안 조치
- [x] HTTPS 강제 (Let's Encrypt/AWS ACM)
- [x] CORS 정책 설정
- [x] Rate Limiting (Redis 기반)
- [x] SQL Injection 방지 (ORM 사용)
- [x] XSS 방지 (입력 검증 + sanitization)
- [x] CSRF 토큰
- [x] JWT 만료 시간 설정 (15분 access, 7일 refresh)
- [x] 비밀번호 해싱 (bcrypt, cost 10+)
- [x] 파일 업로드 검증 (타입, 크기, 악성코드)
- [x] API 키 암호화 저장
- [x] 환경 변수 관리 (AWS Secrets Manager/Vault)
- [x] 정기 보안 업데이트
- [x] 백업 자동화 (일일 백업, 30일 보관)

### Rate Limiting 규칙
```
/api/auth/login:     5 requests / 15분
/api/inquiries:      10 requests / 1시간
/api/upload:         20 requests / 1시간
기타 API:            100 requests / 1시간
```

---

## 9. 모니터링 및 로깅

### 모니터링 도구
- **Uptime Monitoring**: UptimeRobot / Pingdom
- **Application Monitoring**: Sentry (에러 추적)
- **Performance**: New Relic / Datadog
- **Logs**: CloudWatch / Papertrail
- **Analytics**: Google Analytics + Mixpanel

### 알림 설정
- API 에러율 > 5%
- Response Time > 2초
- DB CPU > 80%
- Disk Space > 85%
- Failed Login Attempts > 10 (15분)

---

## 10. 개발 단계별 로드맵

### Phase 1: MVP (4-6주)
- [x] 백엔드 프레임워크 선택 및 초기 설정
- [x] PostgreSQL 스키마 구축
- [x] 기본 인증 시스템 (JWT)
- [x] 제품 CRUD API
- [x] 이미지 업로드 (S3)
- [x] 관리자 대시보드 (기본)
- [x] 배포 환경 구축

### Phase 2: 핵심 기능 (4-6주)
- [ ] SSO 통합 (Keycloak)
- [ ] 고객 문의 시스템
- [ ] 방문 예약 시스템
- [ ] CMS 기능
- [ ] 파트너/솔루션 관리
- [ ] Instagram API 연동

### Phase 3: 고급 기능 (4-8주)
- [ ] 내부 앱 통합 (CRM, 재고관리)
- [ ] 분석 대시보드
- [ ] 이메일 알림 (SendGrid/SES)
- [ ] 검색 기능 (Elasticsearch)
- [ ] 다국어 지원 완성
- [ ] 모바일 앱 API

### Phase 4: 최적화 (지속)
- [ ] 성능 최적화
- [ ] 캐싱 전략 고도화
- [ ] CDN 최적화
- [ ] 보안 강화
- [ ] A/B 테스팅
- [ ] SEO 개선

---

## 11. 예상 비용 분석 (연간)

### ⭐ Synology NAS DS920+ (최우선 추천)
- 초기 투자:
  - NAS: 이미 보유 ($0)
  - RAM 업그레이드 8GB: $50 (일회성)
  - HDD 추가 (선택): $100-300 (일회성)
  - UPS (선택): $100-200 (일회성)
- 운영비:
  - 전기료: $60-120/년 (약 40W 소비)
  - 도메인: $12/년
  - Cloudflare Pro (선택): $0-240/년
  - 외부 백업 (Backblaze B2): $0-60/년
- **총 예상 비용: $72-432/년 (운영비만)**
- **초기 투자: $50-550 (일회성)**

### Vercel + Synology NAS (하이브리드)
- Vercel Hobby: $0/년 (Pro: $240/년)
- NAS 전기료: $60-120/년
- 도메인: $12/년
- **총 예상: $72-372/년**

### AWS (대규모 확장 시)
- 인프라: $1,200-2,200/년
- 도메인: $12/년
- 이메일 서비스: $120/년
- 모니터링: $300/년
- **총 예상: $1,632-2,632/년**

---

## 💰 3년 총 비용 비교 (TCO)

| 솔루션 | 초기 투자 | 연간 운영비 | 3년 총 비용 | 비고 |
|--------|----------|------------|-----------|------|
| **Synology NAS** | $250 | $200 | **$850** | 완전한 제어, 무제한 스토리지 |
| Vercel + NAS | $250 | $200 | **$850** | 프론트엔드 최적화 |
| AWS | $0 | $2,000 | **$6,000** | 높은 확장성 |
| Vercel + Supabase | $0 | $1,200 | **$3,600** | 간편한 관리 |

**결론**: Synology NAS 활용 시 **3년간 약 $5,000 절감** 🎉

---

## 12. 권장 기술 스택 (Synology 기반)

```
Frontend:
  - Next.js 15 (App Router)
  - TypeScript
  - Tailwind CSS
  - React Query (데이터 fetching)

  배포:
  - Vercel (권장, 무료) 또는
  - NAS Web Station (직접 호스팅)

Backend:
  - NestJS (Node.js)
  - TypeScript
  - PostgreSQL
  - Redis
  - Prisma ORM

  배포:
  - Synology Docker Container

Auth:
  - Keycloak (SSO)
  - Docker Container로 배포

Storage:
  - Synology NAS 직접 스토리지
  - /volume1/uploads
  - Cloudflare CDN 캐싱

Infrastructure:
  - Synology DS920+ (메인 서버)
  - Docker / Container Manager
  - Nginx Proxy Manager (리버스 프록시)
  - Cloudflare Tunnel (외부 접속)

DevOps:
  - GitHub Actions (CI/CD)
  - Docker Compose
  - Portainer (컨테이너 관리)
  - Watchtower (자동 업데이트)

Monitoring:
  - Uptime Kuma (다운타임 감지)
  - Portainer (리소스 모니터)
  - DSM 리소스 모니터
  - Grafana + Prometheus (선택)

Backup:
  - Hyper Backup (자동 백업)
  - Snapshot Replication
  - Backblaze B2 (오프사이트)
```

---

## 다음 단계 (Synology 기반)

### 즉시 시작 가능 (1-2일)
1. ✅ **NAS 기본 설정**
   - DSM 업데이트
   - RAM 8GB 확인 (필요시 업그레이드)
   - Container Manager 설치
   - 폴더 구조 생성

2. ✅ **Docker 환경 구축**
   - Docker Compose 파일 작성 및 적용
   - PostgreSQL, Redis 컨테이너 실행
   - Nginx Proxy Manager 설정

3. ✅ **외부 접속 설정**
   - Cloudflare 계정 생성
   - Cloudflare Tunnel 설정 (추천)
   - 도메인 연결

### 1주차
4. ⬜ **백엔드 개발 환경**
   - NestJS 프로젝트 초기화
   - Prisma ORM 설정
   - API 기본 구조 구축
   - 로컬 개발 환경 세팅

5. ⬜ **데이터베이스 구축**
   - 스키마 적용
   - 시드 데이터 추가
   - 백업 스크립트 작성

### 2-3주차
6. ⬜ **핵심 API 개발**
   - 인증 시스템 (JWT)
   - 제품 CRUD
   - 이미지 업로드
   - 고객 문의 시스템

7. ⬜ **Keycloak SSO 설정**
   - Keycloak 컨테이너 배포
   - Realm 및 Client 설정
   - Next.js 통합

### 4주차
8. ⬜ **프론트엔드 연동**
   - API 통합
   - 관리자 대시보드 개발
   - 이미지 업로드 UI

9. ⬜ **모니터링 및 백업**
   - Uptime Kuma 설정
   - Hyper Backup 구성
   - 알림 시스템

### 5주차+
10. ⬜ **프로덕션 배포**
    - SSL 인증서 적용
    - 성능 테스트
    - 보안 강화
    - 실서비스 오픈

---

## 🎯 추천 실행 계획

### Plan A: 완전 자체 호스팅 (최저 비용)
```
✅ Synology NAS에 모든 것 호스팅
  - Next.js (Web Station 또는 Docker)
  - NestJS API (Docker)
  - PostgreSQL (Docker)
  - Redis (Docker)
  - Keycloak (Docker)

✅ Cloudflare Tunnel로 외부 노출
✅ Cloudflare CDN으로 이미지 캐싱

예상 비용: $5-10/월 (전기료만)
난이도: ⭐⭐⭐⭐
```

### Plan B: 하이브리드 (추천, 균형잡힌 선택)
```
✅ Vercel에 Next.js 배포 (무료 플랜)
✅ Synology NAS에 백엔드만 호스팅
  - NestJS API (Docker)
  - PostgreSQL (Docker)
  - Redis (Docker)
  - 파일 스토리지

✅ Cloudflare Tunnel로 API 외부 노출

예상 비용: $5-10/월
난이도: ⭐⭐⭐
장점: 프론트엔드 엣지 최적화 + 백엔드 저비용
```

### Plan C: AWS 마이그레이션 (미래 확장)
```
초기: Synology로 MVP 개발 및 검증
성장 후: 트래픽 증가 시 AWS로 마이그레이션

이점:
- 초기 비용 절감
- 시장 검증 후 투자
- Docker 기반이라 마이그레이션 쉬움
```

---

## 📋 즉시 필요한 작업

1. **Synology NAS 확인**
   - [ ] 현재 RAM 확인 (4GB → 8GB 권장)
   - [ ] 디스크 용량 확인
   - [ ] DSM 버전 확인 (7.x 권장)
   - [ ] 외부 접속 방식 확인 (DDNS? 포트포워딩?)

2. **Cloudflare 계정**
   - [ ] 계정 생성
   - [ ] we-et.com 도메인 연결
   - [ ] Cloudflare Tunnel 생성 (무료)

3. **개발 도구**
   - [ ] Node.js 20+ 설치
   - [ ] Docker Desktop 설치 (로컬 개발용)
   - [ ] VSCode 또는 선호 IDE
   - [ ] Git 설정

---

궁금한 점이나 구체화가 필요한 부분이 있으시면 알려주세요!

**다음 질문 제안**:
- NAS RAM이 4GB인가요 8GB인가요?
- 외부 접속은 어떤 방식으로 설정되어 있나요?
- 내부 앱 중 가장 먼저 필요한 것은 무엇인가요?
- 바로 Docker 설정을 시작할까요?

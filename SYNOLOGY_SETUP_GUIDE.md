# Synology DS920+ 백엔드 서버 구축 가이드

완전한 단계별 가이드로 Synology NAS를 프로덕션 백엔드 서버로 구축합니다.

---

## 목차
1. [사전 준비](#1-사전-준비)
2. [NAS 기본 설정](#2-nas-기본-설정)
3. [Docker 환경 구축](#3-docker-환경-구축)
4. [데이터베이스 설정](#4-데이터베이스-설정)
5. [백엔드 API 배포](#5-백엔드-api-배포)
6. [외부 접속 설정](#6-외부-접속-설정)
7. [SSL 인증서 설정](#7-ssl-인증서-설정)
8. [백업 자동화](#8-백업-자동화)
9. [모니터링 설정](#9-모니터링-설정)

---

## 1. 사전 준비

### 필요한 항목
- [x] Synology DS920+ NAS
- [x] 외부 접속 설정 완료
- [ ] 도메인 (we-et.com)
- [ ] Cloudflare 계정
- [ ] RAM 8GB로 업그레이드 (선택, 권장)

### 권장 HDD 구성
```
베이 1: WD Red 4TB (또는 8TB)
베이 2: WD Red 4TB (또는 8TB)
베이 3: SSD 500GB (캐시용, 선택)
베이 4: 비어있음 (향후 확장용)

RAID: SHR (Synology Hybrid RAID) 또는 RAID 1
```

---

## 2. NAS 기본 설정

### 2.1 DSM 업데이트
```
제어판 → 업데이트 및 복원 → DSM 업데이트
→ 최신 버전으로 업데이트 (DSM 7.x)
```

### 2.2 메모리 확인 및 업그레이드
```
리소스 모니터 → 성능 → 메모리 탭
→ 현재 메모리 사용량 확인

※ 8GB 권장 이유:
  - PostgreSQL: 1-2GB
  - Redis: 512MB-1GB
  - NestJS: 512MB-1GB
  - Keycloak: 1-2GB
  - Next.js: 512MB
  - 시스템: 2GB
  ─────────────────
  총 필요: 5.5-8GB
```

### 2.3 스토리지 풀 및 볼륨 생성
```
스토리지 관리자 → 볼륨 → 생성

볼륨 구성:
- /volume1: 메인 데이터 (RAID 1 또는 SHR)
  ├─ /web (웹사이트 파일)
  ├─ /docker (Docker 볼륨)
  ├─ /uploads (사용자 업로드)
  └─ /backups (백업)
```

### 2.4 사용자 및 권한 설정
```
제어판 → 사용자 및 그룹

새 사용자 생성:
- docker-admin (Docker 관리용)
  권한: administrators 그룹 추가

- api-user (API 서비스용)
  권한: 읽기/쓰기 권한
```

---

## 3. Docker 환경 구축

### 3.1 Container Manager 설치
```
패키지 센터 → Container Manager 설치
(구버전 DSM: Docker 패키지)
```

### 3.2 폴더 구조 생성
```bash
# SSH 또는 File Station에서 실행
mkdir -p /volume1/docker/{nginx,nestjs,postgres,redis,keycloak}
mkdir -p /volume1/docker/nginx/conf.d
mkdir -p /volume1/uploads/{products,partners,bespoke}
mkdir -p /volume1/backups/{db,files}
```

### 3.3 Docker Compose 파일 작성

`/volume1/docker/docker-compose.yml` 생성:

```yaml
version: '3.8'

networks:
  weet-network:
    driver: bridge

volumes:
  postgres-data:
  redis-data:
  keycloak-data:

services:
  # PostgreSQL Database
  postgres:
    image: postgres:16-alpine
    container_name: weet-postgres
    restart: unless-stopped
    environment:
      POSTGRES_DB: weet_db
      POSTGRES_USER: weet_user
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      PGDATA: /var/lib/postgresql/data/pgdata
    volumes:
      - postgres-data:/var/lib/postgresql/data
      - /volume1/backups/db:/backups
    ports:
      - "5432:5432"
    networks:
      - weet-network
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U weet_user -d weet_db"]
      interval: 10s
      timeout: 5s
      retries: 5

  # Redis Cache
  redis:
    image: redis:7-alpine
    container_name: weet-redis
    restart: unless-stopped
    command: redis-server --requirepass ${REDIS_PASSWORD} --appendonly yes
    volumes:
      - redis-data:/data
    ports:
      - "6379:6379"
    networks:
      - weet-network
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 3s
      retries: 5

  # Keycloak SSO
  keycloak:
    image: quay.io/keycloak/keycloak:23.0
    container_name: weet-keycloak
    restart: unless-stopped
    environment:
      KC_DB: postgres
      KC_DB_URL: jdbc:postgresql://postgres:5432/keycloak_db
      KC_DB_USERNAME: weet_user
      KC_DB_PASSWORD: ${POSTGRES_PASSWORD}
      KC_HOSTNAME: auth.we-et.com
      KC_HOSTNAME_STRICT: false
      KC_HTTP_ENABLED: true
      KC_PROXY: edge
      KEYCLOAK_ADMIN: admin
      KEYCLOAK_ADMIN_PASSWORD: ${KEYCLOAK_ADMIN_PASSWORD}
    command: start
    volumes:
      - keycloak-data:/opt/keycloak/data
    ports:
      - "8080:8080"
    networks:
      - weet-network
    depends_on:
      postgres:
        condition: service_healthy

  # NestJS API Backend
  nestjs-api:
    image: node:20-alpine
    container_name: weet-api
    restart: unless-stopped
    working_dir: /app
    environment:
      NODE_ENV: production
      DATABASE_URL: postgresql://weet_user:${POSTGRES_PASSWORD}@postgres:5432/weet_db
      REDIS_URL: redis://:${REDIS_PASSWORD}@redis:6379
      JWT_SECRET: ${JWT_SECRET}
      PORT: 3001
    volumes:
      - /volume1/docker/nestjs:/app
      - /volume1/uploads:/app/uploads
    ports:
      - "3001:3001"
    networks:
      - weet-network
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy
    command: sh -c "npm ci --only=production && npm run start:prod"

  # Nginx Proxy Manager
  nginx-proxy:
    image: jc21/nginx-proxy-manager:latest
    container_name: weet-nginx
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
      - "81:81"  # Admin UI
    environment:
      DB_SQLITE_FILE: "/data/database.sqlite"
    volumes:
      - /volume1/docker/nginx/data:/data
      - /volume1/docker/nginx/letsencrypt:/etc/letsencrypt
      - /volume1/web:/var/www/html
    networks:
      - weet-network

  # Portainer (컨테이너 관리 UI)
  portainer:
    image: portainer/portainer-ce:latest
    container_name: weet-portainer
    restart: unless-stopped
    ports:
      - "9000:9000"
      - "9443:9443"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - /volume1/docker/portainer:/data
    networks:
      - weet-network

  # Uptime Kuma (모니터링)
  uptime-kuma:
    image: louislam/uptime-kuma:1
    container_name: weet-monitoring
    restart: unless-stopped
    ports:
      - "3003:3001"
    volumes:
      - /volume1/docker/uptime-kuma:/app/data
    networks:
      - weet-network
```

### 3.4 환경 변수 파일 생성

`/volume1/docker/.env` 생성:

```bash
# Database
POSTGRES_PASSWORD=your_secure_password_here

# Redis
REDIS_PASSWORD=your_redis_password_here

# Keycloak
KEYCLOAK_ADMIN_PASSWORD=your_keycloak_admin_password

# NestJS
JWT_SECRET=your_jwt_secret_key_minimum_32_characters
JWT_REFRESH_SECRET=your_refresh_secret_key_minimum_32_characters

# General
TZ=Asia/Seoul
```

**보안**: 이 파일은 절대 Git에 커밋하지 마세요!

### 3.5 Docker Compose 실행
```bash
cd /volume1/docker
docker-compose up -d

# 로그 확인
docker-compose logs -f

# 컨테이너 상태 확인
docker-compose ps
```

---

## 4. 데이터베이스 설정

### 4.1 PostgreSQL 초기 설정
```bash
# PostgreSQL 컨테이너 접속
docker exec -it weet-postgres psql -U weet_user -d weet_db

# Keycloak용 DB 생성
CREATE DATABASE keycloak_db;

# 확인
\l

# 종료
\q
```

### 4.2 데이터베이스 스키마 적용
```bash
# 스키마 파일을 NAS에 업로드 후
docker exec -i weet-postgres psql -U weet_user -d weet_db < /volume1/docker/postgres/schema.sql
```

### 4.3 자동 백업 스크립트 생성

`/volume1/docker/scripts/backup-db.sh` 생성:

```bash
#!/bin/bash

# 변수 설정
BACKUP_DIR="/volume1/backups/db"
DATE=$(date +%Y%m%d_%H%M%S)
POSTGRES_CONTAINER="weet-postgres"
DB_NAME="weet_db"
DB_USER="weet_user"
RETENTION_DAYS=30

# 백업 디렉토리 생성
mkdir -p $BACKUP_DIR

# PostgreSQL 백업
echo "Starting database backup..."
docker exec $POSTGRES_CONTAINER pg_dump -U $DB_USER -Fc $DB_NAME > "$BACKUP_DIR/weet_db_$DATE.dump"

# 압축
gzip "$BACKUP_DIR/weet_db_$DATE.dump"

# 오래된 백업 삭제 (30일 이상)
find $BACKUP_DIR -name "*.dump.gz" -mtime +$RETENTION_DAYS -delete

echo "Backup completed: weet_db_$DATE.dump.gz"
```

실행 권한 부여:
```bash
chmod +x /volume1/docker/scripts/backup-db.sh
```

### 4.4 작업 스케줄러 등록
```
제어판 → 작업 스케줄러 → 생성 → 예약된 작업 → 사용자 정의 스크립트

작업: DB 백업
사용자: root
스케줄: 매일 새벽 2시
스크립트: /volume1/docker/scripts/backup-db.sh
```

---

## 5. 백엔드 API 배포

### 5.1 NestJS 프로젝트 빌드

로컬에서:
```bash
# 프로젝트 빌드
npm run build

# dist 폴더와 package.json, package-lock.json을 NAS에 업로드
# /volume1/docker/nestjs/ 경로에 업로드
```

### 5.2 환경 변수 설정

`/volume1/docker/nestjs/.env` 생성:
```bash
NODE_ENV=production
PORT=3001
DATABASE_URL=postgresql://weet_user:your_password@postgres:5432/weet_db
REDIS_URL=redis://:your_redis_password@redis:6379
JWT_SECRET=your_jwt_secret
UPLOAD_PATH=/app/uploads
```

### 5.3 API 컨테이너 재시작
```bash
docker-compose restart nestjs-api
docker-compose logs -f nestjs-api
```

---

## 6. 외부 접속 설정

### Option 1: Cloudflare Tunnel (추천)

#### 6.1 Cloudflare Tunnel 설정
```bash
# Cloudflared 컨테이너 추가
docker run -d \
  --name cloudflared \
  --restart unless-stopped \
  --network weet-network \
  cloudflare/cloudflared:latest \
  tunnel --no-autoupdate run --token <YOUR_TUNNEL_TOKEN>
```

Cloudflare 대시보드에서:
```
1. Zero Trust → Networks → Tunnels → Create a tunnel
2. 터널 이름: weet-tunnel
3. 토큰 복사
4. Public Hostname 설정:
   - we-et.com → http://nginx-proxy:80
   - api.we-et.com → http://nestjs-api:3001
   - admin.we-et.com → http://nginx-proxy:81
   - auth.we-et.com → http://keycloak:8080
```

**장점**:
- 포트 포워딩 불필요
- 자동 SSL
- DDoS 방어
- 고정 IP 불필요

### Option 2: DDNS + 포트 포워딩

#### 6.1 DDNS 설정
```
제어판 → 외부 액세스 → DDNS

서비스 제공업체: Synology
호스트 이름: yourname.synology.me

또는

서비스 제공업체: Cloudflare (API 토큰 필요)
호스트 이름: we-et.com
```

#### 6.2 라우터 포트 포워딩
```
라우터 관리 페이지에서:

외부 포트 → 내부 IP:포트
─────────────────────────
80        → NAS_IP:80
443       → NAS_IP:443
```

#### 6.3 방화벽 규칙
```
제어판 → 보안 → 방화벽

규칙 추가:
- 포트: 80, 443
- 프로토콜: TCP
- 소스 IP: 모두 (또는 Cloudflare IP만)
- 동작: 허용
```

---

## 7. SSL 인증서 설정

### 7.1 Nginx Proxy Manager에서 SSL 설정

브라우저에서 `http://NAS_IP:81` 접속

기본 로그인:
```
Email: admin@example.com
Password: changeme
```

첫 로그인 후 비밀번호 변경 필수!

#### 7.2 Proxy Host 추가

```
Hosts → Proxy Hosts → Add Proxy Host

┌─ Details ─────────────────────────┐
│ Domain Names: we-et.com           │
│ Scheme: http                      │
│ Forward Hostname/IP: localhost    │
│ Forward Port: 3000                │
│ Cache Assets: ✓                   │
│ Block Common Exploits: ✓          │
└───────────────────────────────────┘

┌─ SSL ─────────────────────────────┐
│ SSL Certificate: Request New      │
│ Force SSL: ✓                      │
│ HTTP/2 Support: ✓                 │
│ HSTS Enabled: ✓                   │
└───────────────────────────────────┘
```

동일하게 추가:
- `api.we-et.com` → `nestjs-api:3001`
- `admin.we-et.com` → `nginx-proxy:81`
- `auth.we-et.com` → `keycloak:8080`

---

## 8. 백업 자동화

### 8.1 Hyper Backup 설치 및 설정

```
패키지 센터 → Hyper Backup 설치

백업 작업 생성:
1. 데이터 백업 작업
   - 소스: /volume1/docker, /volume1/uploads
   - 대상: 외장 USB HDD 또는 클라우드 (Google Drive, Backblaze B2)
   - 스케줄: 매일 새벽 3시
   - 보관: 30개 버전

2. 시스템 설정 백업
   - DSM 설정
   - 패키지 목록
   - 사용자 설정
```

### 8.2 스냅샷 설정

```
스토리지 관리자 → 스냅샷 복제 → 스냅샷

스케줄 설정:
- 매 4시간마다 스냅샷
- 보관 기간: 24시간 (6개)
- 매일 스냅샷: 7개
- 매주 스냅샷: 4개
```

### 8.3 원격 백업 (선택)

```bash
# Backblaze B2로 백업 (저렴한 클라우드 스토리지)
# Hyper Backup에서:

백업 대상: Backblaze B2
Bucket: weet-backups
Encryption: 활성화
압축: 활성화
```

---

## 9. 모니터링 설정

### 9.1 Uptime Kuma 접속

브라우저에서 `http://NAS_IP:3003` 접속

모니터 추가:
```
1. we-et.com (HTTP)
   - URL: https://we-et.com
   - Heartbeat: 60초
   - 알림: 이메일

2. API Health Check
   - URL: https://api.we-et.com/health
   - Heartbeat: 60초

3. Database
   - Type: PostgreSQL
   - Host: postgres
   - Port: 5432
```

### 9.2 알림 설정

```
Settings → Notifications

이메일 설정:
- SMTP Host: smtp.gmail.com
- Port: 587
- 보안: TLS
- From Email: alerts@we-et.com
- To Email: admin@we-et.com
```

### 9.3 DSM 리소스 모니터

```
제어판 → 알림 설정 → 알림 규칙

규칙 추가:
- CPU 사용률 > 80% (10분)
- 메모리 사용률 > 90% (5분)
- 디스크 사용률 > 85%
- 온도 > 60°C
```

---

## 10. 성능 최적화

### 10.1 SSD 캐시 설정 (선택)

```
스토리지 관리자 → SSD 캐시 → 생성

캐시 유형: 읽기-쓰기
SSD: 베이 3 (500GB SSD)
```

### 10.2 네트워크 최적화

```
제어판 → 네트워크 → 네트워크 인터페이스

Link Aggregation (2개의 1GbE 포트 결합):
- 모드: 802.3ad (LACP)
- 이론 대역폭: 2Gbps
```

### 10.3 Docker 리소스 제한

`docker-compose.yml`에 추가:
```yaml
services:
  postgres:
    # ... 기존 설정 ...
    deploy:
      resources:
        limits:
          cpus: '1.0'
          memory: 2G
        reservations:
          cpus: '0.5'
          memory: 1G
```

---

## 11. 보안 강화

### 11.1 방화벽 설정
```
제어판 → 보안 → 방화벽 → 규칙 편집

기본 정책: 모든 포트 거부

허용 규칙만 추가:
- 80, 443 (HTTP/HTTPS)
- 22 (SSH, 특정 IP만)
- 5001 (DSM HTTPS, 특정 IP만)
```

### 11.2 계정 보호
```
제어판 → 보안 → 계정

설정:
- 자동 차단: 5분 내 5회 실패 시
- 2단계 인증 활성화 (관리자 계정)
- 비밀번호 정책: 최소 12자, 복잡도 높음
```

### 11.3 Fail2Ban 설정
```
SSH로 NAS 접속:

# Fail2Ban 컨테이너 추가
docker run -d \
  --name fail2ban \
  --restart unless-stopped \
  --network host \
  --cap-add NET_ADMIN \
  --cap-add NET_RAW \
  -v /volume1/docker/fail2ban:/data \
  crazymax/fail2ban:latest
```

---

## 12. 트러블슈팅

### 문제 1: 컨테이너가 시작되지 않음
```bash
# 로그 확인
docker-compose logs <service-name>

# 컨테이너 재시작
docker-compose restart <service-name>

# 컨테이너 재생성
docker-compose up -d --force-recreate <service-name>
```

### 문제 2: 메모리 부족
```bash
# 메모리 사용량 확인
docker stats

# 불필요한 컨테이너 중지
docker-compose stop <service-name>

# 캐시 정리
docker system prune -a
```

### 문제 3: 데이터베이스 연결 실패
```bash
# PostgreSQL 컨테이너 확인
docker exec -it weet-postgres pg_isready -U weet_user

# 네트워크 확인
docker network inspect weet-network

# 비밀번호 확인
echo $POSTGRES_PASSWORD
```

### 문제 4: 외부 접속 안 됨
```bash
# Cloudflare Tunnel 상태 확인
docker logs cloudflared

# 포트 확인
netstat -tulpn | grep :80
netstat -tulpn | grep :443

# 방화벽 확인
iptables -L -n
```

---

## 13. 유지보수 체크리스트

### 일일
- [ ] Uptime Kuma에서 서비스 상태 확인
- [ ] 리소스 모니터에서 CPU/메모리 확인

### 주간
- [ ] 로그 파일 검토
- [ ] 백업 상태 확인
- [ ] 디스크 사용량 확인

### 월간
- [ ] DSM 및 패키지 업데이트
- [ ] Docker 이미지 업데이트
- [ ] 백업 복원 테스트
- [ ] 보안 감사

### 분기
- [ ] 비밀번호 변경
- [ ] 불필요한 데이터 정리
- [ ] 성능 최적화 검토

---

## 다음 단계

1. ✅ Synology NAS 기본 설정 완료
2. ✅ Docker 환경 구축
3. ✅ 데이터베이스 설정
4. ⬜ NestJS 백엔드 개발 및 배포
5. ⬜ Next.js 프론트엔드 연동
6. ⬜ 프로덕션 배포 및 테스트

궁금한 점이나 문제가 발생하면 언제든 문의하세요!

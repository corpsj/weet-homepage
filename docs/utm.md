# UTM 표준 (WEET)

UTM은 링크(URL)에 `utm_*` 파라미터를 붙여 **유입 경로를 정확하게 식별**하기 위한 표준 규격입니다.

## 필수 파라미터

- `utm_source`: 유입 출처(플랫폼/도메인/파트너)
- `utm_medium`: 유입 방식(채널 타입)
- `utm_campaign`: 캠페인 식별자(기간/목적/콘텐츠 묶음)

## 선택 파라미터

- `utm_content`: 소재/버전/배치 구분(예: 같은 캠페인의 A/B)
- `utm_term`: 키워드(검색광고에서 주로 사용)

## 값 규칙

- 소문자 + 언더스코어 권장: `instagram`, `naverblog`, `paid_social`
- 공백 금지(언더스코어로 대체): `winter_brand` 등
- 한글 사용 가능하지만, 운영/분석 편의상 영문 권장

## 권장 네이밍 표준표

### utm_source (권장)

- `naver_search` (검색 유입을 UTM으로 태깅할 때만)
- `google_search` (동일)
- `instagram`
- `daangn`
- `naverblog`
- `tistory`
- `brunch`
- `partner` (제휴/오프라인 QR 등은 `partner_xxx`처럼 확장)

### utm_medium (권장)

- `social` (유기 소셜)
- `referral` (블로그/외부 사이트 링크)
- `cpc` (검색 광고)
- `paid_social` (유료 소셜)
- `display` (디스플레이/배너)
- `email`
- `qr` (오프라인/인쇄물)

### utm_campaign (권장 포맷)

`yyyymm_goal_theme` 형태(3~4 덩어리 권장)

- `yyyymm`: `202512` (월 단위 집계/정렬 용이)
- `goal`: `brand` / `products` / `recruit` 등
- `theme`: 캠페인 주제(예: `modular_home`, `winter_house`)

예:
- `202512_brand_modular_home`
- `202601_products_xl_lineup`

### utm_content (권장)

- `reels_a`, `reels_b`
- `story_1`, `story_2`
- `banner_top`, `banner_footer`

## 예시 링크

- 인스타 프로필: `https://weet.kr/?utm_source=instagram&utm_medium=social&utm_campaign=202512_brand_profile`
- 당근 게시글: `https://weet.kr/?utm_source=daangn&utm_medium=referral&utm_campaign=202512_brand_localpost&utm_content=post_03`
- 네이버 블로그: `https://weet.kr/?utm_source=naverblog&utm_medium=referral&utm_campaign=202512_products_review&utm_content=post_a`


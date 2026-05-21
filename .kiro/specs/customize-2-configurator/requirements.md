# Requirements Document

## Introduction

`customize-2-configurator`는 weet:) 홈페이지(`app/(redesign)/` 라우트 그룹)에 신규로 추가되는 이동식주택 주문제작/커스터마이징 페이지이다. Tesla Model 3 design 페이지나 Porsche Car Configurator처럼 좌측(데스크톱) 또는 상단(모바일)의 큰 비주얼 프리뷰와, 우측(데스크톱) 또는 하단(모바일)의 옵션 패널로 구성되어, 사용자가 모델·외장·바닥·내벽·주방·욕실·설비 옵션을 선택하면 가격과 구성 요약이 실시간으로 갱신되는 인터랙티브 컨피규레이터를 제공한다.

페이지의 1차 목적은 (1) 상담 전 고객이 대략적인 견적을 직접 확인하고, (2) 영업/상담 시 1차 상담 도구로 시연 가능한 수준의 완성도를 갖추는 것이다.

본 페이지는 기존 `(redesign)` 라우트 그룹의 컨벤션(공통 헤더 `HeaderV2`, 푸터 `FooterV2`, 페이지 트랜지션, 디자인 시스템)을 따른다. 워크스페이스에 기존 `customize` 페이지가 존재하더라도 본 작업은 그 페이지의 구현·디자인을 따르지 않으며, 기존 페이지를 추가·수정·삭제하지 않는다. 라우트 그룹 컨벤션, 공통 레이아웃, 브랜드 스타일 정도만 참고한다.

향후 실제 렌더링 이미지/3D 자산이 준비되면 손쉽게 교체될 수 있도록, 시각 요소는 데이터 키 기반 구조로 설계한다.

## Glossary

- **Customize_2_Page**: `app/(redesign)/customize-2/page.tsx`로 노출되는 신규 컨피규레이터 페이지. URL 경로는 `/customize-2`. 본 스펙에서 신규로 생성하는 페이지.
- **Configurator**: Customize_2_Page 내부의 인터랙티브 컨피규레이터 컴포넌트. Preview_Panel과 Option_Panel을 포함한다.
- **Preview_Panel**: 선택된 옵션을 시각적으로 보여주는 큰 비주얼 영역. 데스크톱에서 좌측, 모바일에서 상단에 배치된다.
- **Option_Panel**: 모델/외장/바닥/내벽/주방/욕실/설비 옵션을 선택하는 UI 영역. 데스크톱에서 우측 사이드바, 모바일에서 바텀시트 또는 아코디언으로 표시된다.
- **Configuration_State**: 사용자가 현재 선택한 모든 옵션(모델, 외장재, 색상, 바닥재, 내벽, 주방, 욕실, 설비)의 집합 상태.
- **Option_Catalog**: 모든 선택 가능 옵션과 가격을 정의한 데이터 구조. UI 컴포넌트와 분리된 별도 파일로 관리된다.
- **Quote_Engine**: Configuration_State와 Option_Catalog로부터 기본가, 옵션 합계, 총 예상 견적을 계산하는 순수 함수 로직.
- **Summary_View**: 현재 Configuration_State의 사람이 읽을 수 있는 요약(모델명, 선택된 옵션 목록, 가격 내역).
- **Quote_Document**: 인쇄/PDF 출력 시 노출되는 견적서 형태의 정돈된 문서 레이아웃.
- **PDF_Exporter**: 현재 구성을 견적서 형태로 인쇄/PDF 저장하는 기능. 1순위로 `window.print()` + 인쇄 전용 stylesheet를 사용한다.
- **Mobile_Sticky_Bar**: 모바일 화면 하단에 고정되어 총 예상 견적, 옵션 열기 버튼, PDF 저장 버튼, 상담 신청 버튼을 노출하는 영역.
- **Mobile_Option_Sheet**: 모바일에서 옵션 선택을 위해 열리는 바텀시트 패널.
- **Reset_Action**: Configuration_State를 모델 "M" 기준 기본값으로 되돌리는 사용자 동작.
- **Consultation_CTA**: 현재 Configuration_State의 요약과 함께 상담을 신청하도록 안내하는 버튼/링크.
- **Asset_Key**: `imageKey`, `overlayKey`, `textureClass` 등 향후 실제 이미지/텍스처로 교체 가능한 식별자.
- **Brand_Style_System**: 기존 `(redesign)` 라우트의 공통 헤더(`HeaderV2`), 푸터(`FooterV2`), 컬러 팔레트, 폰트, 페이지 트랜지션을 포함한 스타일 시스템.

## Requirements

### Requirement 1: 신규 라우트 및 공통 레이아웃 통합

**User Story:** 방문자로서 나는 `/customize-2` 경로로 직접 이동하여 컨피규레이터를 사용하고 싶다. 그래야 별도 안내 없이 즉시 주문제작 페이지에 진입할 수 있다.

#### Acceptance Criteria

1. WHEN 클라이언트가 `/customize-2` 경로로 GET 요청을 보낸 경우, THE Customize_2_Page SHALL `app/(redesign)/customize-2/page.tsx`에서 렌더링된 HTML을 HTTP 200 응답으로 반환해야 한다.
2. THE Customize_2_Page SHALL 기존 `app/(redesign)/layout.tsx`로부터 공통 헤더 `HeaderV2`, 푸터 `FooterV2`, 페이지 트랜지션을 적용받고, `app/(redesign)/customize-2/` 디렉토리 내부에는 별도의 `layout.tsx`를 추가하지 않아야 한다.
3. THE Customize_2_Page SHALL Next.js Metadata API를 통해 `title`, `description`, `openGraph.title`, `openGraph.description` 필드를 비어 있지 않은 한국어 값으로 지정해야 한다.
4. WHERE 인터랙티브 클라이언트 로직이 필요한 경우, THE Customize_2_Page SHALL 해당 로직을 `app/(redesign)/customize-2/customize-2-client.tsx`에 `"use client"` 지시어와 함께 분리하고 `page.tsx`는 서버 컴포넌트 상태로 유지하며 클라이언트 모듈을 import하여 사용해야 한다.
5. THE Customize_2_Page 작업 SHALL `app/(redesign)/customize-2/` 디렉토리 외부의 기존 라우트 파일(`app/(redesign)/layout.tsx`, 기존 페이지 디렉토리 내 `page.tsx`/`*-client.tsx`)과 공용 컴포넌트 파일을 수정하지 않아야 한다.
6. IF 워크스페이스에 `app/customize/`, `app/(redesign)/customize/`, 또는 동일 의미의 기존 `customize` 라우트가 존재한다면, THEN THE Customize_2_Page 작업 SHALL 해당 디렉토리의 파일을 추가, 수정, 삭제하지 않고 그대로 보존해야 한다.
7. IF Customize_2_Page의 서버 측 렌더링 또는 데이터 초기화에 실패한 경우, THEN THE Customize_2_Page SHALL 빈 화면이나 헤더/푸터가 누락된 상태가 아닌, 기존 `(redesign)` 그룹의 공통 레이아웃 안에서 사용자가 인지할 수 있는 오류 또는 폴백 UI를 노출해야 한다.

### Requirement 2: 페이지 섹션 구성

**User Story:** 방문자로서 나는 페이지에 들어왔을 때 무엇을 할 수 있는지, 어디에서 견적을 보고 어디에서 상담을 신청하는지 명확히 알고 싶다.

#### Acceptance Criteria

1. THE Customize_2_Page SHALL 데스크톱(뷰포트 폭 1024px 이상) 및 모바일(뷰포트 폭 1024px 미만) 환경 모두에서 다음 다섯 개 섹션을 위에서부터 동일한 순서로 포함하고, 각 섹션은 식별 가능한 제목(heading) 또는 라벨을 갖추어야 한다: (a) 인트로 섹션, (b) 메인 컨피규레이터 섹션, (c) 선택 옵션 요약 섹션, (d) PDF 저장 및 상담 CTA 섹션, (e) 유의사항 섹션.
2. THE 인트로 섹션 SHALL "나만의 이동식주택 만들기" 의미의 한국어 헤드라인 한 개(최대 30자)와 옵션 선택, 견적 확인, 상담 신청 흐름을 안내하는 본문 한 개(최대 200자)를 노출해야 한다.
3. THE 유의사항 섹션 SHALL 별도 토글이나 펼침 동작 없이 페이지 진입 시 즉시 읽을 수 있는 형태로 "실제 견적은 현장 조건과 선택 사양에 따라 달라질 수 있습니다." 문구와 부가세·운송비·기초공사·인허가가 별도로 부과될 수 있다는 문구를 명시해야 한다.

### Requirement 3: 데스크톱 컨피규레이터 레이아웃

**User Story:** 데스크톱 사용자로서 나는 큰 비주얼 프리뷰를 보면서 옆에서 옵션을 선택하고 가격을 확인하고 싶다.

#### Acceptance Criteria

1. WHILE 뷰포트 너비가 1024px 이상인 상태에서, THE Configurator SHALL Preview_Panel을 메인 컨피규레이터 섹션 가로 폭의 55%~65% 영역, Option_Panel을 35%~45% 영역으로 좌우로 나란히 배치하고, 두 패널 사이에 16px 이상의 시각적 간격(gutter)을 유지해야 한다.
2. WHILE 사용자가 Option_Panel 영역을 세로로 스크롤하는 동안, THE Preview_Panel SHALL 뷰포트 상단 기준 0px~120px 사이 거리에 sticky 또는 fixed로 머무르며 화면에서 사라지지 않아야 한다.
3. THE Option_Panel SHALL 모델, 외장마감재, 바닥재, 내벽마감, 주방, 욕실, 설비/기능, 현재 구성 요약, CTA의 9개 영역을 위에서 아래로 이 순서대로 배치하고, 각 영역에는 식별 가능한 한국어 제목과 구분선·여백·배경 중 하나 이상의 시각적 분리를 적용해야 한다.
4. THE Configurator SHALL 메인 컨피규레이터 섹션을 인트로 섹션 바로 아래, 선택 옵션 요약 섹션 바로 위 위치에 단 한 곳에만 배치해야 한다.
5. IF Preview_Panel의 콘텐츠가 sticky 영역의 세로 높이를 초과하는 경우, THEN THE Preview_Panel SHALL 내부 스크롤 또는 콘텐츠 축소를 통해 패널 자체가 뷰포트 밖으로 잘려 나가지 않게 처리해야 한다.

### Requirement 4: 모바일 컨피규레이터 레이아웃

**User Story:** 모바일 사용자로서 나는 한 손으로 화면을 다루면서도 비주얼과 가격을 동시에 확인하고 싶다.

#### Acceptance Criteria

1. IF 뷰포트 너비가 1024px 미만인 경우, THEN THE Configurator SHALL Preview_Panel을 화면 상단에서 뷰포트 세로 높이의 50% 이상 차지하도록 배치하고, Option_Panel 진입점을 화면 하단의 Mobile_Sticky_Bar 형태로 배치해야 한다.
2. THE Mobile_Sticky_Bar SHALL 화면 스크롤과 무관하게 뷰포트 하단에 고정된 상태로, 한국어 화폐 표기 형식의 총 예상 견적, 옵션 열기 버튼, PDF 저장 버튼, 상담 신청 버튼을 노출해야 한다.
3. WHEN 사용자가 Mobile_Sticky_Bar의 옵션 열기 버튼을 탭한 경우, THE Configurator SHALL 화면 하단에서 위로 슬라이드 인되어 뷰포트 세로 높이의 60%~90%를 차지하는 Mobile_Option_Sheet(바텀시트)를 열어야 한다.
4. WHILE Mobile_Option_Sheet가 열려 있는 상태에서, THE Configurator SHALL 사용자가 이전/다음 버튼으로 옵션 카테고리를 단계별로 이동할 수 있도록 하되, 첫 번째 카테고리에서는 이전 버튼을, 마지막 카테고리에서는 다음 버튼을 비활성화 상태로 노출해야 한다.
5. WHERE 뷰포트 너비가 1024px 미만인 경우, THE Configurator SHALL 모든 인터랙티브 옵션 버튼, 색상 스왓치, CTA의 터치 타겟 크기를 최소 44px × 44px 이상으로 렌더링해야 한다.
6. WHEN 사용자가 Mobile_Option_Sheet를 닫는 동작(닫기 버튼 탭, 시트 외부 배경 탭, ESC 키 입력 중 하나)을 수행한 경우, THE Configurator SHALL Mobile_Option_Sheet를 닫고 Mobile_Sticky_Bar 상태로 복귀하면서 사용자가 시트 내부에서 변경했던 모든 옵션 선택을 그대로 유지해야 한다.

### Requirement 5: 모델 옵션 선택

**User Story:** 고객으로서 나는 가족 구성과 용도에 맞는 크기의 모델을 고르고 싶다.

#### Acceptance Criteria

1. THE Option_Panel SHALL 모델 옵션으로 "S 모델 (3m × 6m / 18㎡ / 컴팩트형)", "M 모델 (3m × 9m / 27㎡ / 균형형)", "L 모델 (4m × 8m / 32㎡ / 프리미엄형)"의 3개 옵션을 노출해야 한다.
2. THE Option_Panel SHALL 항상 정확히 하나의 모델(S, M, L 중 하나)만 선택된 상태가 되도록 강제하며, 선택된 옵션 카드는 비선택 옵션 카드와 시각적으로 구별 가능한 선택 상태(테두리 강조, 배경 변경, 체크 표시 중 하나 이상)로 표시되어야 한다.
3. WHEN Customize_2_Page가 최초 로드되고 저장된 상태가 없는 경우, THE Configuration_State SHALL 모델 "M"을 초기 선택으로 설정해야 한다.
4. IF Customize_2_Page 로드 시 저장된 모델 값이 S/M/L 중 어느 것에도 해당하지 않는 경우, THEN THE Configuration_State SHALL 모델 "M"으로 폴백하여 설정해야 한다.
5. WHEN 사용자가 현재 선택과 다른 모델을 선택한 경우, THE Configuration_State SHALL 새 모델 식별자(S, M, 또는 L)로 갱신되어야 한다.
6. WHEN Configuration_State의 모델 값이 갱신된 경우, THE Preview_Panel SHALL 500ms 이내에 해당 모델의 비율(가로 × 세로)과 매핑된 Asset_Key를 사용한 시각 표현으로 갱신되어야 한다.
7. THE Option_Panel SHALL 각 모델 옵션 카드에 모델명, 크기(가로 m × 세로 m), 면적(㎡), 최대 40자의 한 줄 설명, 기본가(원, KRW 단위)를 표기해야 한다.

### Requirement 6: 외장마감재 옵션 선택

**User Story:** 고객으로서 나는 외관 인상을 결정하는 외장재를 종류와 색상 단위로 골라보고 싶다.

#### Acceptance Criteria

1. THE Option_Panel SHALL 외장마감재 카테고리로 "골강판", "적삼목", "시멘트사이딩"의 3개 옵션을 노출해야 한다.
2. WHILE 외장마감재가 "골강판"으로 선택된 상태에서, THE Option_Panel SHALL "화이트", "차콜", "샌드 베이지", "딥 그린"의 4개 색상 스왓치를 노출해야 한다.
3. WHILE 외장마감재가 "시멘트사이딩"으로 선택된 상태에서, THE Option_Panel SHALL "라이트 그레이", "웜 그레이", "크림", "다크 그레이"의 4개 색상 스왓치를 노출해야 한다.
4. WHILE 외장마감재가 "적삼목"으로 선택된 상태에서, THE Option_Panel SHALL 단일 목재 마감을 표시하고 별도의 색상 스왓치는 노출하지 않아야 한다.
5. WHEN Customize_2_Page가 최초 로드되고 저장된 외장재 값이 없는 경우, THE Configuration_State SHALL 외장마감재 "골강판"과 첫 번째 색상 "화이트"를 초기 선택으로 설정해야 한다.
6. THE Option_Panel SHALL 현재 선택된 외장마감재 옵션과 색상 스왓치를 비선택 항목과 시각적으로 구별되는 상태(테두리 강조, 배경 변경, 체크 표시 중 하나 이상)로 표시해야 한다.
7. WHEN 사용자가 외장마감재 또는 색상 스왓치를 변경한 경우, THE Preview_Panel SHALL 200ms 이내에 해당 textureClass와 색상 토큰이 적용된 시각으로 갱신되어야 한다.
8. WHEN 사용자가 외장마감재 카테고리를 변경한 경우, THE Configuration_State SHALL 200ms 이내에 새로 선택된 마감재가 지원하는 색상 중 첫 번째를 기본 색상으로 자동 설정해야 한다.
9. IF Preview_Panel이 색상 또는 텍스처 토큰을 적용하지 못하는 경우, THEN THE Preview_Panel SHALL 직전에 표시되었던 유효한 색상/텍스처 시각을 유지하고 사용자가 인지할 수 있는 오류 안내를 노출해야 한다.

### Requirement 7: 바닥재 옵션 선택

**User Story:** 고객으로서 나는 거주 공간의 분위기를 좌우하는 바닥재 색상을 비교해서 고르고 싶다.

#### Acceptance Criteria

1. THE Option_Panel SHALL 바닥재 옵션으로 "SPC 돌마루"를 표시하고, "내추럴 오크", "웜 베이지", "스톤 그레이", "월넛"의 4개 색상 스왓치를 각 스왓치별 색상 미리보기와 색상명 라벨과 함께 노출해야 한다.
2. THE Option_Panel SHALL 항상 정확히 하나의 바닥재 색상만 선택된 상태로 유지하고, 선택된 스왓치는 미선택 스왓치와 시각적으로 구별되는 선택 표시(테두리 강조, 체크 마크 중 하나 이상)를 노출해야 한다.
3. WHEN Customize_2_Page가 최초 로드되고 저장된 바닥재 색상 값이 없는 경우, THE Configuration_State SHALL 바닥재 색상 "내추럴 오크"를 초기 선택으로 설정해야 한다.
4. WHEN 사용자가 바닥재 색상 스왓치를 변경한 경우, THE Preview_Panel SHALL 1초 이내에 해당 색상이 반영된 인테리어 비주얼 또는 내부 평면 시각을 노출해야 한다.
5. IF 색상 변경 후 Preview_Panel이 1초 이내에 비주얼 자산을 표시하지 못한 경우, THEN THE Preview_Panel SHALL 로딩 상태 표시를 노출하고 직전에 표시되었던 색상의 시각을 그대로 유지해야 한다.

### Requirement 8: 내벽마감 옵션 선택

**User Story:** 고객으로서 나는 내벽 마감의 톤과 마감 종류를 비교해서 결정하고 싶다.

#### Acceptance Criteria

1. THE Option_Panel SHALL 내벽마감 옵션으로 "합지벽지", "실크벽지", "도장", "원목"의 4개 옵션을 각 옵션의 라벨과 추가 가격(원, KRW 단위)과 함께 노출해야 한다.
2. THE Option_Panel SHALL 항상 정확히 하나의 내벽마감만 선택된 상태가 되도록 강제하며, 선택된 옵션은 비선택 옵션과 시각적으로 구별되는 선택 표시를 노출해야 한다.
3. WHEN Customize_2_Page가 최초 로드되고 저장된 내벽마감 값이 없는 경우, THE Configuration_State SHALL 내벽마감 "합지벽지"를 초기 선택으로 설정해야 한다.
4. WHEN 사용자가 내벽마감을 변경한 경우, THE Configuration_State SHALL 1초 이내에 새 마감으로 갱신되어야 한다.
5. WHEN Configuration_State의 내벽마감 값이 갱신된 경우, THE Quote_Engine SHALL 1초 이내에 해당 마감의 추가 가격을 총 예상 견적에 반영해야 한다.
6. IF 내벽마감 가격 데이터를 Option_Catalog에서 찾을 수 없는 경우, THEN THE Quote_Engine SHALL 직전 견적 금액을 유지하고 사용자가 인지할 수 있는 오류 안내를 노출해야 한다.

### Requirement 9: 주방 옵션 선택

**User Story:** 고객으로서 나는 기본 포함된 주방 구성과 추가 옵션을 한눈에 비교해서 필요한 것만 추가하고 싶다.

#### Acceptance Criteria

1. THE Option_Panel SHALL 주방 카테고리에서 "기본주방", "싱크대", "하이라이트", "후드"의 4개 항목을 "기본 포함" 배지와 함께 노출하며, 해당 4개 항목은 사용자가 선택 해제할 수 없는 비활성화 상태로 표시해야 한다.
2. THE Option_Panel SHALL 주방 카테고리에서 "빌트인 냉장고", "세탁기 9kg 드럼", "미니워시 2kg"의 3개 항목을 추가 옵션으로 노출하고, 각 항목의 추가 가격을 "+1,000,000원" 형식의 한국어 화폐 표기로 표시해야 한다.
3. THE Option_Panel SHALL 각 추가 주방 옵션을 사용자가 다른 추가 주방 옵션과 독립적으로 선택 또는 해제할 수 있도록 해야 한다.
4. WHEN 사용자가 추가 주방 옵션을 선택하거나 해제한 경우, THE Quote_Engine SHALL 1초 이내에 총 예상 견적을 갱신하여 화면에 반영해야 한다.
5. IF 추가 주방 옵션 선택/해제 후 견적 재계산이 실패한 경우, THEN THE Quote_Engine SHALL 직전 견적 금액과 해당 옵션의 직전 선택 상태를 그대로 유지하고 사용자가 인지할 수 있는 오류 안내를 노출해야 한다.

### Requirement 10: 욕실 옵션 선택

**User Story:** 고객으로서 나는 기본 욕실 구성에 비데 같은 추가 옵션을 더할 수 있는지 확인하고 싶다.

#### Acceptance Criteria

1. THE Option_Panel SHALL 욕실 카테고리에서 "샤워부스", "세면대", "양변기"의 3개 항목을 "기본 포함" 배지와 함께 노출하며, 해당 3개 항목은 사용자가 선택 해제할 수 없는 비활성화 상태로 표시해야 한다.
2. THE Option_Panel SHALL 욕실 카테고리에서 "비데"를 추가 옵션으로 노출하고, 해당 옵션의 추가 가격을 원화(KRW) 단위의 양의 정수 금액으로 "+1,000,000원" 형식으로 표기해야 한다.
3. WHEN 사용자가 비데 옵션을 선택하거나 해제한 경우, THE Quote_Engine SHALL 1초 이내에 총 예상 견적 금액을 재계산하여 화면에 갱신 표시해야 한다.
4. IF 비데 옵션 선택/해제에 따른 견적 재계산이 실패한 경우, THEN THE Quote_Engine SHALL 직전 견적 금액과 비데 옵션의 직전 선택 상태를 유지하고 사용자에게 갱신 실패를 알리는 오류 안내를 노출해야 한다.

### Requirement 11: 설비/기능 옵션 선택

**User Story:** 고객으로서 나는 IoT 패키지나 전기차 충전기 같은 설비 옵션을 선택해 견적에 반영하고 싶다.

#### Acceptance Criteria

1. THE Option_Panel SHALL 설비/기능 카테고리에서 "IoT 패키지", "전기차 충전기"의 2개 항목을 추가 옵션으로 노출하고, 각 항목의 추가 가격을 "+1,000,000원" 형식의 한국어 화폐 표기로 표시해야 한다.
2. THE Option_Panel SHALL 각 설비 옵션을 사용자가 다른 설비 옵션과 독립적으로 선택 또는 해제할 수 있도록 해야 한다.
3. WHEN 사용자가 설비 옵션을 선택하거나 해제한 경우, THE Quote_Engine SHALL 1초 이내에 총 예상 견적을 갱신하여 화면에 반영해야 한다.
4. IF 설비 옵션 선택/해제 후 견적 재계산이 실패한 경우, THEN THE Quote_Engine SHALL 직전 견적 금액과 해당 옵션의 직전 선택 상태를 그대로 유지하고 사용자가 인지할 수 있는 오류 안내를 노출해야 한다.

### Requirement 12: 추후 확장 옵션 슬롯

**User Story:** 운영자로서 나는 향후 단열, 창호, 데크 같은 옵션 카테고리를 코드 수정 없이 손쉽게 추가하고 싶다.

#### Acceptance Criteria

1. THE Option_Catalog SHALL "단열 등급", "창호", "데크/외부계단", "냉난방기", "태양광", "가구 패키지", "조명 패키지", "배송/설치 지역"의 8개 카테고리에 대해 각각 식별자, 한국어 라벨, 빈 옵션 항목 배열을 포함하는 카테고리 정의 슬롯을 데이터 스키마 수준에서 포함해야 한다.
2. IF 추후 확장 카테고리의 옵션 항목 배열이 비어 있는 경우, THEN THE Option_Panel SHALL 해당 카테고리의 UI 섹션을 DOM에 렌더링하지 않아야 한다.
3. WHEN 추후 확장 카테고리의 옵션 항목 배열에 하나 이상의 항목이 추가되어 페이지가 로드된 경우, THE Option_Panel SHALL 별도 컴포넌트 코드 수정 없이 해당 카테고리 섹션과 항목 카드를 1초 이내에 렌더링해야 한다.
4. IF Option_Catalog 데이터 로드에 실패한 경우, THEN THE Configurator SHALL 추후 확장 카테고리 섹션을 모두 숨기고, 핵심 카테고리(모델/외장/바닥/내벽/주방/욕실/설비)는 기본값으로 동작하도록 폴백해야 한다.

### Requirement 13: 옵션 카탈로그 및 가격 데이터 분리

**User Story:** 운영자로서 나는 가격이나 옵션 라벨이 변경되었을 때 UI 컴포넌트를 건드리지 않고 데이터만 바꿔서 반영하고 싶다.

#### Acceptance Criteria

1. THE Option_Catalog SHALL `app/(redesign)/customize-2/data/option-catalog.ts` 파일에 TypeScript 모듈 형태로 정의되고, Customize_2_Page의 어떤 UI 컴포넌트 파일에서도 옵션 라벨, 가격, 식별자 리터럴이 직접 선언되지 않아야 한다.
2. THE Option_Catalog SHALL 각 옵션 항목에 (a) 고유 식별자(string), (b) 한국어 라벨(string), (c) 가격(원 단위 정수, 0 이상), (d) 기본 포함 여부(boolean), (e) Asset_Key(`imageKey`/`overlayKey`/`textureClass` 중 하나 이상)의 5개 필드를 포함해야 한다.
3. THE Option_Catalog 모듈 SHALL 파일 상단에 "임시 가격 — 실제 견적표로 교체 필요" 의미의 주석 배너를 포함하고, 각 가격 필드에 동일한 주의 메타 정보(예: `priceTier: "placeholder"` 또는 동등한 마커)를 노출해야 한다.
4. WHEN 운영자가 Option_Catalog 데이터만 수정하고 컴포넌트 코드는 변경하지 않은 채로 빌드한 경우, THE Customize_2_Page SHALL 새 라벨/가격/항목을 화면에 반영해야 한다.
5. IF Option_Catalog 데이터에 필수 필드(식별자, 라벨, 가격) 중 어느 하나라도 누락되거나 타입이 일치하지 않는 경우, THEN THE Configurator SHALL 빌드 또는 런타임 검증 단계에서 해당 항목을 거부하고 콘솔 오류로 안내해야 한다.

### Requirement 14: 실시간 견적 계산

**User Story:** 고객으로서 나는 옵션을 바꿀 때마다 총 예상 견적이 즉시 보이기를 원한다.

#### Acceptance Criteria

1. THE Quote_Engine SHALL 총 예상 견적을 "선택된 모델의 기본가 + 모든 추가 선택 옵션의 가격 합계"로 계산해야 한다.
2. THE Quote_Engine SHALL 기본 포함으로 표시된 옵션의 가격을 총 예상 견적에 추가하지 않아야 한다.
3. WHEN Configuration_State가 변경된 경우, THE Quote_Engine SHALL 500ms 이내에 총 예상 견적을 재계산하여 화면에 반영해야 한다.
4. THE Configurator SHALL 총 예상 견적을 한국어 화폐 표기 규칙(천 단위 콤마, "원" 단위)에 따라 노출해야 한다(예: "27,500,000원").
5. THE Option_Panel SHALL 각 추가 옵션의 가격을 "+1,000,000원" 형식의 양의 표기(앞에 "+" 기호)로 표시해야 한다.
6. THE Option_Panel SHALL 기본 포함 옵션에 "기본 포함" 배지를 표기하고 가격 영역은 "기본 포함" 문구 또는 "0원" 중 한 가지로 표시해야 한다.
7. IF Quote_Engine 계산 결과가 0원 이하인 비정상 상태인 경우, THEN THE Configurator SHALL 비정상 견적 금액을 화면에 표시하지 않고 직전의 유효한 견적 또는 모델 기본가를 폴백 표시해야 한다.

### Requirement 15: Preview_Panel 시각 갱신 및 Asset_Key 구조

**User Story:** 고객으로서 나는 옵션을 바꾸면 화면의 비주얼이 함께 바뀌어 선택 결과를 직관적으로 알고 싶다. 운영자로서 나는 향후 실제 이미지가 준비되면 코드 수정 없이 자산만 교체하고 싶다.

#### Acceptance Criteria

1. THE Preview_Panel SHALL "외관", "평면", "내부"의 3개 시각 모드를 사용자가 전환할 수 있는 탭 또는 세그먼트 컨트롤 형태의 모드 전환 UI를 노출하고, 페이지 최초 로드 시 "외관" 모드를 기본 활성 상태로 설정하며, 활성 모드는 비활성 모드와 시각적으로 구별되는 표시(밑줄, 배경, 색상 중 하나 이상)를 가져야 한다.
2. WHEN 사용자가 모델, 외장마감재, 외장 색상, 바닥재 색상, 내벽마감 중 어느 하나를 변경한 경우, THE Preview_Panel SHALL 200ms 이내에 새 Configuration_State를 반영한 시각을 3개 시각 모드 모두에서 갱신해야 한다.
3. THE Preview_Panel SHALL 실제 렌더링 이미지 또는 3D 자산 없이 CSS 그라데이션, 도형, placeholder 박스로만 시각을 구성하되, 향후 실제 이미지로 교체 시 동일한 데이터 키 매핑을 통해 대체될 수 있도록 마크업 구조를 일관되게 유지해야 한다.
4. THE Preview_Panel SHALL 각 시각 요소를 `imageKey`, `overlayKey`, `textureClass` 중 하나 이상으로 식별 가능한 데이터 구조로 표현하고, 동일한 키 입력에 대해 항상 동일한 시각 출력을 반환하는 결정적(deterministic) 매핑을 유지해야 한다.
5. THE Customize_2_Page SHALL 향후 실제 이미지를 추가할 자산 경로 가이드를 코드 주석 또는 README 형태로 포함하고, 모델/외장/내장별로 `public/assets/customize-2/{category}/{key}.webp` 형식의 디렉토리 매핑 규칙을 명시해야 한다.

### Requirement 16: 현재 구성 요약 표시

**User Story:** 고객으로서 나는 지금까지 내가 어떤 옵션들을 골랐는지 한눈에 다시 확인하고 싶다.

#### Acceptance Criteria

1. THE Summary_View SHALL 모델, 외장마감재 및 색상, 바닥재 색상, 내벽마감, 추가 주방 옵션 목록, 추가 욕실 옵션 목록, 추가 설비 옵션 목록, 기본가, 옵션 합계, 총 예상 견적의 10개 항목을 각 항목의 라벨과 값을 함께 노출해야 한다.
2. WHEN Configuration_State가 변경된 경우, THE Summary_View SHALL 500ms 이내에 갱신되어야 한다.
3. WHILE 뷰포트 너비가 1024px 이상인 상태에서, THE Summary_View SHALL 데스크톱 화면의 Option_Panel 하단 또는 별도 섹션 중 정확히 한 위치에만 노출되어야 한다.
4. WHILE 뷰포트 너비가 1024px 미만인 상태에서, THE Summary_View SHALL 페이지 본문의 "선택 옵션 요약 섹션"에 별도 영역으로 노출되어야 한다.
5. WHERE 추가 주방/욕실/설비 옵션 목록이 비어 있는 경우, THE Summary_View SHALL 해당 항목 라벨은 표시하되 값 영역에 "선택 없음" 또는 동등한 한국어 표기를 노출해야 한다.

### Requirement 17: PDF 저장 및 인쇄 견적서

**User Story:** 고객으로서 나는 내가 구성한 견적을 PDF로 저장하거나 출력해서 가족과 의논하고 싶다.

#### Acceptance Criteria

1. THE PDF_Exporter SHALL 추가 서버 호출이나 외부 라이브러리 의존 없이 클라이언트 브라우저의 `window.print()` 호출과 인쇄 전용 stylesheet(`@media print`)의 조합만으로 동작해야 한다.
2. WHEN 사용자가 PDF 저장 버튼을 클릭, 터치 또는 키보드(Enter/Space)로 활성화한 경우, THE PDF_Exporter SHALL 1초 이내에 브라우저의 인쇄 다이얼로그를 호출해야 한다.
3. WHILE 인쇄 미디어가 활성화된 상태에서, THE Customize_2_Page SHALL 헤더, 푸터, 챗봇, 플로팅 CTA, Mobile_Sticky_Bar, 옵션 선택 컨트롤(라디오, 토글, 색상 스왓치), 모드 전환 UI를 인쇄 결과물에 표시되지 않도록 시각적으로 숨기고 Quote_Document만 노출해야 한다.
4. THE Quote_Document SHALL (1) 모델명 및 크기, (2) 외장마감재 및 색상, (3) 바닥재 및 색상, (4) 내벽마감, (5) 주방 기본 포함 항목, (6) 주방 추가 선택 항목, (7) 욕실 기본 포함 항목, (8) 욕실 추가 선택 항목, (9) 설비/기능 선택 항목, (10) 기본가, (11) 옵션 합계, (12) 총 예상 견적, (13) 유의사항 문구, (14) 회사 연락처 정보의 14개 항목을 모두 포함해야 한다.
5. THE Quote_Document SHALL "실제 견적은 현장 조건과 선택 사양에 따라 달라질 수 있습니다." 문구와 부가세·운송비·기초공사·인허가 별도 안내 문구 두 가지 모두를 인쇄 결과물에서 시각적으로 식별 가능한 형태로 노출해야 한다.
6. THE Quote_Document SHALL 인쇄 시 A4 세로(210mm × 297mm) 기준, 상하좌우 10mm 이상의 여백을 확보하고, 가로 너비가 인쇄 가능 영역을 초과하는 경우 줄바꿈 또는 스케일 축소를 통해 잘림 없이 출력되어야 한다.
7. THE Quote_Document SHALL 인쇄 시 최대 3페이지를 초과하지 않아야 하며, 페이지가 분할되는 경우 각 페이지에 모델명 또는 견적 식별 정보를 포함하는 헤더를 표시해야 한다.
8. IF 사용자가 PDF 저장 버튼을 활성화한 시점에 Configuration_State에 모델이 선택되지 않았거나 필수 옵션이 누락된 경우, THEN THE PDF_Exporter SHALL 인쇄 다이얼로그 호출을 보류하고 누락된 항목을 안내하는 메시지를 사용자에게 노출해야 한다.

### Requirement 18: 상태 영속성 및 초기화

**User Story:** 고객으로서 나는 페이지를 잠시 닫았다가 다시 들어와도 내가 골랐던 옵션이 그대로 남아 있기를 원한다. 또한 처음부터 다시 시작하고 싶을 때는 한 번에 초기화하고 싶다.

#### Acceptance Criteria

1. WHEN Configuration_State가 변경된 경우, THE Customize_2_Page SHALL 변경 발생 후 1초 이내에 Configuration_State 전체를 직렬화하여 `localStorage`의 단일 식별 가능한 키 아래에 저장해야 한다.
2. WHEN Customize_2_Page가 로드되고 `localStorage`에 유효한 저장 상태가 존재하는 경우, THE Customize_2_Page SHALL 저장된 Configuration_State를 초기 상태로 복원하고 옵션 선택 UI에도 동일한 선택 상태를 반영해야 한다.
3. IF `localStorage`에 저장된 데이터가 현재 Option_Catalog와 불일치하거나, 필수 필드가 누락되었거나, JSON 파싱에 실패한 경우, THEN THE Customize_2_Page SHALL 손상된 데이터를 `localStorage`에서 삭제하고 모델 "M" 기준 기본 Configuration_State로 초기화해야 한다.
4. THE Configurator SHALL "초기화" 버튼을 페이지 진입 시점부터 항상 표시하고, 클릭 또는 키보드(Enter/Space)로 활성화 가능하게 노출해야 한다.
5. WHEN 사용자가 초기화 버튼을 활성화한 경우, THE Configurator SHALL 초기화 의도를 확인하는 한국어 안내 대화상자(예: "선택을 모두 초기화할까요?")를 표시해야 한다.
6. WHEN 사용자가 확인 대화상자에서 "확인" 응답을 한 경우, THE Configurator SHALL Configuration_State를 모델 "M" 기준 기본값으로 되돌리고 `localStorage`의 저장 상태를 새 기본값으로 갱신해야 한다.
7. WHEN 사용자가 확인 대화상자에서 "취소" 응답을 하거나 대화상자를 닫은 경우, THE Configurator SHALL Configuration_State와 `localStorage`의 값을 변경하지 않고 직전 상태를 그대로 유지해야 한다.

### Requirement 19: 상담 CTA 연계

**User Story:** 고객으로서 나는 마음에 드는 구성을 만든 그대로 상담을 신청하고 싶다.

#### Acceptance Criteria

1. THE Customize_2_Page SHALL 데스크톱 레이아웃에서 Consultation_CTA를 Option_Panel 하단 영역에, 모바일 레이아웃에서 Mobile_Sticky_Bar 영역에 노출하고, 두 레이아웃 모두에서 CTA 라벨과 클릭/터치 가능한 영역이 동시에 보이도록 해야 한다.
2. WHEN 사용자가 Consultation_CTA를 클릭, 터치, 또는 키보드(Enter 또는 Space)로 활성화한 경우, THE Customize_2_Page SHALL 현재 Configuration_State에서 선택된 모델명, 외장마감재 및 색상, 바닥재 색상, 내벽마감, 추가 주방/욕실/설비 옵션 목록, 총 예상 견적을 사람이 읽을 수 있는 요약으로 구성하여 쿼리 파라미터, 라우터 상태, 또는 동등한 메커니즘으로 함께 전달하면서 기존 상담/견적 채널로 연결해야 한다.
3. IF Consultation_CTA가 활성화된 시점에 Configuration_State에 모델이 선택되지 않은 경우, THEN THE Customize_2_Page SHALL 상담/견적 채널로의 이동을 보류하고 모델 선택을 먼저 진행하도록 안내하는 한국어 메시지를 사용자에게 노출해야 한다.
4. IF 상담/견적 채널로의 연결이 실패한 경우, THEN THE Customize_2_Page SHALL 사용자에게 연결 실패를 인지할 수 있는 오류 안내를 노출하고 현재 Configuration_State를 그대로 유지해야 한다.

### Requirement 20: 접근성

**User Story:** 키보드와 스크린리더를 사용하는 사용자로서 나도 컨피규레이터를 동등하게 사용하고 싶다.

#### Acceptance Criteria

1. THE Configurator SHALL 모든 옵션 선택 버튼을 논리적인 시각 순서(좌→우, 상→하)와 일치하는 키보드 Tab 순서로 도달 가능하게 하고, 포커스된 요소에 인접 배경 대비 명도 대비비 3:1 이상, 두께 2px 이상의 시각적 포커스 링을 표시해야 한다.
2. THE Configurator SHALL 토글 형태의 옵션 버튼(외장재, 색상 스왓치, 추가 옵션 등)에 대해 현재 선택된 버튼은 `aria-pressed="true"`로, 선택되지 않은 버튼은 `aria-pressed="false"`로 부여해야 한다.
3. THE Preview_Panel SHALL 모든 placeholder 시각 요소에 비어 있지 않고, 해당 요소의 내용 또는 역할을 한국어로 서술하며, 150자 이하인 대체 텍스트(`alt` 또는 `aria-label`)를 부여해야 한다.
4. WHILE 사용자의 OS 또는 브라우저가 `prefers-reduced-motion: reduce`를 보고하는 동안, THE Configurator SHALL 콘텐츠 전달 목적이 아닌 모든 애니메이션과 트랜지션의 지속 시간을 0.01초 이하로 설정하거나 제거해야 한다.
5. WHEN 사용자가 옵션 선택 버튼에 포커스한 상태에서 Enter 키 또는 Space 키를 누른 경우, THE Configurator SHALL 마우스 클릭과 동일한 선택 동작을 수행하고 변경된 선택 상태를 `aria-pressed` 값에 즉시 반영해야 한다.
6. IF placeholder 시각 요소가 대체 텍스트를 가질 수 없는 순수 장식 요소인 경우, THEN THE Preview_Panel SHALL 해당 요소에 `aria-hidden="true"` 또는 빈 `alt=""` 속성을 부여하여 보조 기술이 무시하도록 해야 한다.

### Requirement 21: 성능 및 빌드 안정성

**User Story:** 방문자로서 나는 페이지가 빠르게 뜨고, 옵션을 클릭할 때마다 즉시 반응하기를 원한다. 운영자로서 나는 새 페이지가 빌드를 깨뜨리지 않을 것을 보장받고 싶다.

#### Acceptance Criteria

1. WHEN 사용자가 옵션을 변경한 경우, THE Configurator SHALL Preview_Panel, Quote_Engine 출력, Summary_View를 200ms 이내에 갱신해야 한다.
2. IF 옵션 변경 처리 중 상태 갱신이 실패한 경우, THEN THE Configurator SHALL 직전의 유효한 Configuration_State와 화면 표시를 유지하고 사용자가 인지할 수 있는 오류 안내를 노출해야 한다.
3. THE Customize_2_Page SHALL 인트로 섹션 위(above-the-fold) 외부의 비필수 비주얼 자산(이미지, 비디오, 무거운 보조 컴포넌트)에 lazy loading 전략(`loading="lazy"`, dynamic import, 또는 동등한 기법)을 적용해야 한다.
4. THE Customize_2_Page SHALL `next build` 명령에서 종료 코드 0과 함께 타입 오류 0건, 빌드 오류 0건으로 컴파일되어야 한다.
5. THE Customize_2_Page SHALL `npm run lint` 명령에서 종료 코드 0과 함께 오류 0건, 경고 0건(저장소의 `--max-warnings=0` 설정 기준)으로 통과해야 한다.

### Requirement 22: 브랜드 스타일 및 디자인 토큰

**User Story:** 방문자로서 나는 다른 weet:) 페이지들과 일관된 디자인 분위기 안에서 컨피규레이터를 사용하고 싶다.

#### Acceptance Criteria

1. THE Customize_2_Page SHALL Brand_Style_System의 헤더, 푸터, 폰트 패밀리, 페이지 트랜지션을 동일한 정의대로 적용해야 한다.
2. THE Customize_2_Page SHALL 본문 배경 및 컴포넌트 바탕 색상으로 화이트, 아이보리, 라이트 그레이, 차콜, 블랙 계열의 중립 팔레트만 사용해야 한다.
3. THE Customize_2_Page SHALL 활성 상태의 옵션 버튼/스왓치, 가격 강조 영역(총 예상 견적, 옵션 합계), 주요 CTA 버튼에 한해 웜 베이지, 브론즈, 골드 브라운 계열의 포인트 컬러를 사용해야 한다.
4. WHERE 유의사항 섹션 또는 동등한 주의 정보를 표시하는 영역인 경우, THE Customize_2_Page SHALL amber 또는 muted blue 계열 중 한 가지 색상 카테고리만 일관되게 사용해야 한다.
5. WHEN 옵션 버튼 또는 색상 스왓치가 활성 상태로 표시된 경우, THE Configurator SHALL 색상 차이 외에 테두리, 배경 명도 변화, 체크 아이콘 중 하나 이상의 비색상 시각 표시를 추가로 적용해야 한다.
6. IF 사용자의 환경에서 색상 대비가 낮아 활성/비활성 구분이 모호한 경우, THEN THE Configurator SHALL 비색상 시각 표시(아이콘, 테두리, 굵기)만으로도 활성 상태를 판별할 수 있도록 해야 한다.

### Requirement 23: 기존 시스템 비간섭

**User Story:** 운영자로서 나는 새 페이지가 추가되면서 기존에 운영 중인 라우트와 기능이 깨지지 않을 것을 보장받고 싶다.

#### Acceptance Criteria

1. THE Customize_2_Page 작업 SHALL `app/(redesign)/customize-2/` 디렉토리 신규 파일 외의 기존 파일에 대해 `git diff` 결과 변경 사항이 0건이어야 한다(본 작업을 위해 신설하는 데이터, 유틸, 스타일 모듈은 신규 파일로 추가하며 기존 파일을 수정하지 않는다).
2. IF 기존 `customize` 라우트가 워크스페이스에 존재한다면, THEN THE Customize_2_Page 작업 SHALL 해당 라우트의 URL, HTTP 응답 상태(200), 페이지 DOM 구조의 가시적 변경을 발생시키지 않아야 한다.
3. THE Customize_2_Page 작업 SHALL 기존 `(redesign)` 라우트 그룹의 다른 페이지(`/home`, `/products-v2`, `/projects-v2`, `/bespoke-v2`, `/modular-v2`, `/company-v2`, `/quote`, `/solutions`, `/my/tracking` 등) 라우트에 대해 HTTP 200 응답과 동일한 페이지 동작을 그대로 유지해야 한다.
4. THE Customize_2_Page 작업 SHALL `next build` 실행 시 본 작업으로 새로 발생한 타입 오류 또는 빌드 오류가 0건이어야 한다.
5. THE Customize_2_Page 작업 SHALL 신규 데이터/유틸/스타일 모듈을 추가할 때 기존 모듈의 import 경로나 export 시그니처를 변경하지 않는 신규 경로(`app/(redesign)/customize-2/` 하위 또는 신규 디렉토리)에만 배치해야 한다.

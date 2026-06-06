# Requirements Document

## Introduction

`customize-2`는 weet:) 홈페이지에 신규로 추가되는 이동식주택 주문제작/커스터마이징 페이지이다. Tesla Model 3 design 페이지나 Porsche Car Configurator처럼 고객이 좌측의 큰 비주얼 프리뷰를 보면서 우측 옵션 패널에서 모델·외장·바닥·내벽·주방·욕실·설비 등을 선택하면, 가격과 구성 요약이 실시간으로 갱신되어 "내가 직접 집을 만든다"는 프리미엄 인터랙티브 경험을 제공한다. 페이지의 1차 목적은 (1) 상담 전 고객이 대략적인 견적을 직접 확인하고, (2) 영업/상담 시 1차 상담 도구로 시연 가능한 수준의 완성도를 갖추는 것이다.

본 페이지는 기존 `(redesign)` 라우트 그룹의 컨벤션(공통 헤더/푸터, 페이지 트랜지션, 스타일 시스템)을 따르며, 향후 실제 렌더링 이미지/3D 자산이 준비되면 손쉽게 교체될 수 있도록 데이터 키 기반 구조로 설계한다. 만약 워크스페이스에 기존 `customize` 페이지가 존재하더라도 본 작업은 그 페이지의 구현·디자인을 따르지 않으며, 기존 페이지를 수정·삭제하지도 않는다.

## Glossary

- **Customize_2_Page**: `app/(redesign)/customize-2/page.tsx`로 노출되는 신규 컨피규레이터 페이지. URL 경로는 `/customize-2`.
- **Configurator**: Customize_2_Page 내부의 인터랙티브 컨피규레이터 컴포넌트. Preview_Panel과 Option_Panel을 포함한다.
- **Preview_Panel**: 선택된 옵션을 시각적으로 보여주는 큰 비주얼 영역. 데스크톱에서 좌측, 모바일에서 상단에 배치된다.
- **Option_Panel**: 모델/외장/바닥/내벽/주방/욕실/설비 옵션을 선택하는 UI 영역. 데스크톱에서 우측 사이드바, 모바일에서 바텀시트 또는 아코디언으로 표시된다.
- **Configuration_State**: 사용자가 현재 선택한 모든 옵션(모델, 외장재, 색상, 바닥재 등)의 집합 상태.
- **Option_Catalog**: 모든 선택 가능 옵션과 가격을 정의한 데이터 구조. 단일 config 파일로 분리된다.
- **Quote_Engine**: Configuration_State와 Option_Catalog로부터 기본가, 옵션 합계, 총 예상 견적을 계산하는 로직.
- **Summary_View**: 현재 Configuration_State의 사람이 읽을 수 있는 요약(모델명, 선택된 옵션 목록, 가격 내역).
- **PDF_Exporter**: 현재 구성을 견적서 형태로 인쇄/PDF 저장하는 기능. 1순위로 `window.print()` + 인쇄용 stylesheet를 사용한다.
- **Mobile_Sticky_Bar**: 모바일 화면 하단에 고정되어 총 예상 견적, 옵션 열기, PDF/상담 CTA를 노출하는 영역.
- **Mobile_Option_Sheet**: 모바일에서 옵션 선택을 위해 열리는 바텀시트 또는 아코디언 패널.
- **Reset_Action**: Configuration_State를 모델별 기본값으로 되돌리는 사용자 동작.
- **Consultation_CTA**: 현재 Configuration_State의 요약과 함께 상담을 신청하도록 안내하는 버튼/링크.
- **Asset_Key**: `imageKey`, `overlayKey`, `textureClass` 등 향후 실제 이미지/텍스처로 교체 가능한 식별자.
- **Brand_Style_System**: 기존 `(redesign)` 라우트의 공통 헤더(`HeaderV2`), 푸터(`FooterV2`), 컬러 팔레트, 폰트, 페이지 트랜지션을 포함한 스타일 시스템.

## Requirements

### Requirement 1: 신규 라우트 및 공통 레이아웃 통합

**User Story:** 방문자로서 나는 `/customize-2` 경로로 직접 이동하여 컨피규레이터를 사용하고 싶다. 그래야 별도 안내 없이 즉시 주문제작 페이지에 진입할 수 있다.

#### Acceptance Criteria

1. THE Customize_2_Page SHALL `app/(redesign)/customize-2/page.tsx` 위치에 생성되어 `/customize-2` URL로 접근 가능해야 한다.
2. THE Customize_2_Page SHALL 기존 `(redesign)` 라우트 그룹의 layout인 `app/(redesign)/layout.tsx`를 통해 공통 헤더(`HeaderV2`), 푸터(`FooterV2`), 페이지 트랜지션을 적용받아야 한다.
3. THE Customize_2_Page SHALL Next.js Metadata API를 사용하여 페이지 제목, 설명, OpenGraph 정보를 지정해야 한다.
4. WHERE 인터랙티브 클라이언트 컴포넌트가 필요한 경우, THE Customize_2_Page SHALL 클라이언트 로직을 `customize-2-client.tsx`로 분리하여 page.tsx에서 import 하는 구조를 따라야 한다.
5. THE Customize_2_Page SHALL 기존 `app/(redesign)/` 하위의 어떤 라우트 파일도 수정하지 않아야 한다.
6. IF 워크스페이스에 기존 `customize` 페이지가 존재한다면, THEN THE Customize_2_Page 작업 SHALL 해당 기존 `customize` 페이지의 파일을 추가, 수정, 삭제하지 않아야 한다.

### Requirement 2: 페이지 섹션 구성

**User Story:** 방문자로서 나는 페이지에 들어왔을 때 무엇을 할 수 있는지, 어디에서 견적을 받고 어디에서 상담을 신청하는지 명확히 알고 싶다.

#### Acceptance Criteria

1. THE Customize_2_Page SHALL 다음 섹션을 위에서부터 순서대로 포함해야 한다: (a) 인트로 섹션, (b) 메인 컨피규레이터 섹션, (c) 선택 옵션 요약 섹션, (d) PDF 저장 및 상담 CTA 섹션, (e) 유의사항 섹션.
2. THE 인트로 섹션 SHALL "나만의 이동식주택 만들기"에 해당하는 한국어 헤드라인 한 개와 페이지의 목적을 설명하는 본문 한 개를 노출해야 한다.
3. THE 유의사항 섹션 SHALL "실제 견적은 현장 조건과 선택 사양에 따라 달라질 수 있습니다." 라는 문구와, 부가세·운송비·기초공사·인허가가 별도로 부과될 수 있다는 문구를 명시해야 한다.

### Requirement 3: 데스크톱 컨피규레이터 레이아웃

**User Story:** 데스크톱 사용자로서 나는 큰 비주얼 프리뷰를 보면서 옆에서 옵션을 선택하고 가격을 확인하고 싶다.

#### Acceptance Criteria

1. WHEN 뷰포트 너비가 1024px 이상인 경우, THE Configurator SHALL Preview_Panel을 화면 좌측 영역, Option_Panel을 화면 우측 영역으로 배치해야 한다.
2. WHILE 사용자가 Option_Panel을 스크롤하고 있는 상태에서, THE Preview_Panel SHALL 뷰포트 내에서 시각적으로 유지되어 선택 결과 변화를 즉시 확인할 수 있어야 한다(예: sticky 또는 동등한 레이아웃 기법).
3. THE Option_Panel SHALL 모델, 외장마감재, 바닥재, 내벽마감, 주방, 욕실, 설비/기능, 현재 구성 요약, CTA의 9개 영역을 시각적으로 구분된 섹션으로 노출해야 한다.

### Requirement 4: 모바일 컨피규레이터 레이아웃

**User Story:** 모바일 사용자로서 나는 한 손으로 화면을 다루면서도 비주얼과 가격을 동시에 확인하고 싶다.

#### Acceptance Criteria

1. WHEN 뷰포트 너비가 1024px 미만인 경우, THE Configurator SHALL Preview_Panel을 화면 상단, Option_Panel 진입점을 화면 하단의 Mobile_Sticky_Bar 형태로 배치해야 한다.
2. THE Mobile_Sticky_Bar SHALL 총 예상 견적, 옵션 열기 버튼, PDF 저장 버튼, 상담 신청 버튼을 포함해야 한다.
3. WHEN 사용자가 Mobile_Sticky_Bar의 옵션 열기 버튼을 클릭한 경우, THE Configurator SHALL Mobile_Option_Sheet를 바텀시트 또는 아코디언 형태로 열어야 한다.
4. WHILE Mobile_Option_Sheet가 열려 있는 상태에서, THE Configurator SHALL 사용자가 이전/다음 버튼으로 옵션 카테고리를 단계별로 이동할 수 있도록 해야 한다.
5. THE Configurator SHALL 모바일 화면의 모든 인터랙티브 옵션 버튼/스왓치/CTA의 터치 타겟 크기를 최소 44px × 44px 이상으로 렌더링해야 한다.
6. WHEN 사용자가 Mobile_Option_Sheet를 닫는 동작(닫기 버튼, 배경 탭, ESC 키 중 하나)을 수행한 경우, THE Configurator SHALL Mobile_Option_Sheet를 닫고 Mobile_Sticky_Bar 상태로 복귀해야 한다.

### Requirement 5: 모델 옵션 선택

**User Story:** 고객으로서 나는 내 가족 구성과 용도에 맞는 크기의 모델을 고르고 싶다.

#### Acceptance Criteria

1. THE Option_Panel SHALL 모델 옵션으로 "S (3m × 6m / 18㎡ / 컴팩트형)", "M (3m × 9m / 27㎡ / 균형형)", "L (4m × 8m / 32㎡ / 프리미엄형)"의 3개 옵션을 노출해야 한다.
2. THE Option_Panel SHALL 항상 정확히 하나의 모델만 선택된 상태가 되도록 강제해야 한다.
3. WHEN Customize_2_Page가 최초 로드되고 저장된 상태가 없는 경우, THE Configuration_State SHALL 모델 "M"을 초기 선택으로 설정해야 한다.
4. WHEN 사용자가 다른 모델을 선택한 경우, THE Configuration_State SHALL 새 모델로 갱신되고, THE Preview_Panel SHALL 해당 모델의 비율과 자산 키를 사용한 시각으로 갱신되어야 한다.
5. THE Option_Panel SHALL 각 모델 옵션 카드에 모델명, 크기(m), 면적(㎡), 한 줄 설명, 기본가를 표기해야 한다.

### Requirement 6: 외장마감재 옵션 선택

**User Story:** 고객으로서 나는 외관 인상을 결정하는 외장재를 색상 단위로 골라보고 싶다.

#### Acceptance Criteria

1. THE Option_Panel SHALL 외장마감재 카테고리로 "골강판", "적삼목", "시멘트사이딩"의 3개 옵션을 노출해야 한다.
2. WHERE 외장마감재가 "골강판"으로 선택된 경우, THE Option_Panel SHALL "화이트", "차콜", "샌드 베이지", "딥 그린"의 색상 스왓치를 노출해야 한다.
3. WHERE 외장마감재가 "시멘트사이딩"으로 선택된 경우, THE Option_Panel SHALL "라이트그레이", "웜그레이", "크림", "다크그레이"의 색상 스왓치를 노출해야 한다.
4. WHERE 외장마감재가 "적삼목"으로 선택된 경우, THE Option_Panel SHALL 단일 목재 마감을 표시하고 색상 스왓치는 노출하지 않아야 한다.
5. WHEN 사용자가 외장마감재 또는 색상 스왓치를 변경한 경우, THE Preview_Panel SHALL 해당 textureClass와 색상 토큰이 적용된 시각으로 즉시 갱신되어야 한다.
6. WHEN 사용자가 외장마감재 카테고리를 변경한 경우, THE Configuration_State SHALL 새로 선택된 마감재가 지원하는 색상 중 첫 번째를 기본 색상으로 자동 설정해야 한다.

### Requirement 7: 바닥재 옵션 선택

**User Story:** 고객으로서 나는 거주 공간의 분위기를 좌우하는 바닥재 색상을 비교해서 고르고 싶다.

#### Acceptance Criteria

1. THE Option_Panel SHALL 바닥재 옵션으로 "SPC 돌마루"를 노출하고, 색상으로 "내추럴 오크", "웜 베이지", "스톤 그레이", "월넛"의 4개 스왓치를 제공해야 한다.
2. THE Option_Panel SHALL 항상 정확히 하나의 바닥재 색상이 선택된 상태가 되도록 강제해야 한다.
3. WHEN 사용자가 바닥재 색상을 변경한 경우, THE Preview_Panel SHALL 내부 평면 또는 인테리어 비주얼에서 해당 색상이 반영된 시각을 노출해야 한다.

### Requirement 8: 내벽마감 옵션 선택

**User Story:** 고객으로서 나는 내벽 마감의 톤을 비교해서 결정하고 싶다.

#### Acceptance Criteria

1. THE Option_Panel SHALL 내벽마감 옵션으로 "합지벽지", "실크벽지", "도장", "원목"의 4개 옵션을 노출해야 한다.
2. THE Option_Panel SHALL 항상 정확히 하나의 내벽마감만 선택된 상태가 되도록 강제해야 한다.
3. WHEN 사용자가 내벽마감을 변경한 경우, THE Configuration_State SHALL 새 마감으로 갱신되고, THE Quote_Engine SHALL 해당 마감의 추가 가격을 총액에 즉시 반영해야 한다.

### Requirement 9: 주방 옵션 선택

**User Story:** 고객으로서 나는 기본 포함된 주방 구성과 추가 옵션을 한눈에 비교해서 필요한 것만 추가하고 싶다.

#### Acceptance Criteria

1. THE Option_Panel SHALL 주방 카테고리에서 "기본주방", "싱크대", "하이라이트", "후드"의 4개 항목을 "기본 포함" 배지와 함께 노출해야 한다.
2. THE Option_Panel SHALL 주방 카테고리에서 "빌트인 냉장고", "세탁기 9kg 드럼", "미니워시 2kg"의 3개 항목을 추가 옵션으로 노출하고 각각의 추가 가격을 표기해야 한다.
3. THE Option_Panel SHALL 각 추가 주방 옵션을 사용자가 독립적으로 선택/해제할 수 있도록 해야 한다.
4. WHEN 사용자가 추가 주방 옵션을 선택하거나 해제한 경우, THE Quote_Engine SHALL 총 예상 견적을 즉시 갱신해야 한다.

### Requirement 10: 욕실 옵션 선택

**User Story:** 고객으로서 나는 기본 욕실 구성에 비데 같은 추가 옵션을 더할 수 있는지 확인하고 싶다.

#### Acceptance Criteria

1. THE Option_Panel SHALL 욕실 카테고리에서 "샤워부스", "세면대", "양변기"의 3개 항목을 "기본 포함" 배지와 함께 노출해야 한다.
2. THE Option_Panel SHALL 욕실 카테고리에서 "비데"를 추가 옵션으로 노출하고 추가 가격을 표기해야 한다.
3. WHEN 사용자가 비데 옵션을 선택하거나 해제한 경우, THE Quote_Engine SHALL 총 예상 견적을 즉시 갱신해야 한다.

### Requirement 11: 설비/기능 옵션 선택

**User Story:** 고객으로서 나는 IoT나 전기차 충전기 같은 설비 옵션을 선택해 견적에 반영하고 싶다.

#### Acceptance Criteria

1. THE Option_Panel SHALL 설비/기능 카테고리에서 "IoT 패키지", "전기차 충전기"의 2개 항목을 추가 옵션으로 노출하고 각각의 추가 가격을 표기해야 한다.
2. THE Option_Panel SHALL 각 설비 옵션을 사용자가 독립적으로 선택/해제할 수 있도록 해야 한다.

### Requirement 12: 추후 확장 옵션 슬롯

**User Story:** 운영자로서 나는 향후 단열, 창호, 데크 같은 옵션 카테고리를 코드 수정 없이 손쉽게 추가하고 싶다.

#### Acceptance Criteria

1. THE Option_Catalog SHALL 단열 등급, 창호, 데크, 외부계단, 냉난방기, 태양광, 가구 패키지, 조명 패키지, 배송설치 지역에 해당하는 카테고리 정의 슬롯을 데이터 스키마 수준에서 포함해야 한다.
2. WHERE 추후 확장 슬롯에 옵션 항목이 비어 있는 경우, THE Option_Panel SHALL 해당 카테고리의 UI 섹션을 렌더링하지 않아야 한다.
3. WHERE 추후 확장 슬롯에 하나 이상의 옵션 항목이 추가된 경우, THE Option_Panel SHALL 코드 수정 없이 해당 카테고리 섹션을 자동으로 렌더링해야 한다.

### Requirement 13: 옵션 카탈로그 및 가격 데이터 분리

**User Story:** 운영자로서 나는 가격이나 옵션 라벨이 변경되었을 때 UI 컴포넌트를 건드리지 않고 데이터만 바꿔서 반영하고 싶다.

#### Acceptance Criteria

1. THE Option_Catalog SHALL Customize_2_Page의 UI 컴포넌트와 분리된 별도 모듈 파일(예: `app/(redesign)/customize-2/data/option-catalog.ts` 또는 동등한 위치)에 정의되어야 한다.
2. THE Option_Catalog SHALL 각 옵션 항목에 식별자, 라벨, 가격(원 단위 정수), 기본 포함 여부, Asset_Key를 포함해야 한다.
3. THE Option_Catalog SHALL 모든 가격 항목에 "임시 가격, 실제 견적표로 교체 필요"의 의미를 가진 주석 또는 메타 필드를 포함해야 한다.

### Requirement 14: 실시간 견적 계산

**User Story:** 고객으로서 나는 옵션을 바꿀 때마다 총 예상 견적이 즉시 보이기를 원한다.

#### Acceptance Criteria

1. THE Quote_Engine SHALL 총 예상 견적을 "선택된 모델의 기본가 + 모든 추가 선택 옵션의 가격 합계"로 계산해야 한다.
2. THE Quote_Engine SHALL 기본 포함으로 표시된 옵션의 가격을 총 예상 견적에 추가하지 않아야 한다.
3. WHEN Configuration_State가 변경된 경우, THE Quote_Engine SHALL 같은 사용자 인터랙션 안에서 총 예상 견적을 갱신하여 화면에 반영해야 한다.
4. THE Configurator SHALL 총 예상 견적을 한국어 화폐 표기 규칙(천 단위 콤마, 원 단위)으로 노출해야 한다.
5. THE Option_Panel SHALL 각 추가 옵션의 가격을 "+1,000,000원" 형식으로 표기해야 한다.
6. THE Option_Panel SHALL 기본 포함 옵션에 "기본 포함" 배지를 표기하고 가격은 "0원" 또는 "기본 포함" 문구로 표기해야 한다.

### Requirement 15: Preview_Panel 시각 갱신 및 Asset_Key 구조

**User Story:** 고객으로서 나는 옵션을 바꾸면 화면의 비주얼이 함께 바뀌어 선택 결과를 직관적으로 알고 싶다. 운영자로서 나는 향후 실제 이미지가 준비되면 코드 수정 없이 자산만 교체하고 싶다.

#### Acceptance Criteria

1. THE Preview_Panel SHALL 외관, 평면, 내부의 3개 시각 모드 중 사용자가 하나를 선택할 수 있도록 모드 전환 UI를 노출해야 한다.
2. WHEN 사용자가 모델, 외장마감재, 색상, 바닥재 색상 중 어느 하나를 변경한 경우, THE Preview_Panel SHALL 같은 사용자 인터랙션 안에서 새 Configuration_State를 반영한 시각을 노출해야 한다.
3. THE Preview_Panel SHALL 실제 렌더링 이미지 또는 3D 자산 없이 CSS 그라데이션, 도형, placeholder 박스로만 시각을 구성해야 한다.
4. THE Preview_Panel SHALL 각 시각 요소를 imageKey, overlayKey, textureClass 중 하나 이상으로 식별 가능한 데이터 구조로 표현하여, 향후 실제 이미지/텍스처로 교체 가능해야 한다.
5. THE Customize_2_Page SHALL 향후 실제 이미지를 추가할 자산 경로 가이드(예: `public/assets/customize-2/models/{model}-exterior-base.webp`)를 코드 주석 또는 README 형태로 포함해야 한다.

### Requirement 16: 현재 구성 요약 표시

**User Story:** 고객으로서 나는 지금까지 내가 어떤 옵션들을 골랐는지 한눈에 다시 확인하고 싶다.

#### Acceptance Criteria

1. THE Summary_View SHALL 모델, 외장마감재 및 색상, 바닥재 색상, 내벽마감, 추가 주방 옵션 목록, 추가 욕실 옵션 목록, 추가 설비 옵션 목록, 기본가, 옵션 합계, 총 예상 견적의 항목을 모두 노출해야 한다.
2. WHEN Configuration_State가 변경된 경우, THE Summary_View SHALL 같은 사용자 인터랙션 안에서 갱신되어야 한다.
3. THE Summary_View SHALL 데스크톱에서 Option_Panel 하단 또는 별도 섹션 어느 한 곳에 노출되어야 한다.

### Requirement 17: PDF 저장 및 인쇄 견적서

**User Story:** 고객으로서 나는 내가 구성한 견적을 PDF로 저장하거나 출력해서 가족과 의논하고 싶다.

#### Acceptance Criteria

1. THE PDF_Exporter SHALL `window.print()` 호출과 인쇄 전용 stylesheet(`@media print`)의 조합으로 동작해야 한다.
2. WHEN 사용자가 PDF 저장 버튼을 클릭한 경우, THE PDF_Exporter SHALL 브라우저의 인쇄 다이얼로그를 호출해야 한다.
3. WHILE 인쇄 미디어가 활성화된 상태에서, THE Customize_2_Page SHALL 헤더, 푸터, 챗봇, 플로팅 CTA, Mobile_Sticky_Bar, 옵션 선택 컨트롤을 시각적으로 숨기고 견적서 형태의 정돈된 문서 레이아웃만 노출해야 한다.
4. THE 견적서 SHALL 모델명 및 크기, 외장마감재 및 색상, 바닥재 및 색상, 내벽마감, 주방 구성(기본 포함 + 선택 추가), 욕실 구성(기본 포함 + 선택 추가), 설비/기능 선택, 기본가, 옵션 합계, 총 예상 견적, 유의사항 문구, 회사 연락처 정보의 항목을 모두 포함해야 한다.
5. THE 견적서 SHALL "실제 견적은 현장 조건과 선택 사양에 따라 달라질 수 있습니다." 문구와 부가세·운송비·기초공사·인허가 별도 안내 문구를 포함해야 한다.
6. IF 인쇄 출력 결과가 페이지 너비를 초과하는 경우, THEN THE 견적서 SHALL 내용을 잘리지 않도록 A4 세로 기준 너비에 맞게 레이아웃을 조정해야 한다.

### Requirement 18: 상태 영속성 및 초기화

**User Story:** 고객으로서 나는 페이지를 잠시 닫았다가 다시 들어와도 내가 골랐던 옵션이 그대로 남아 있기를 원한다. 또한 처음부터 다시 시작하고 싶을 때는 한 번에 초기화하고 싶다.

#### Acceptance Criteria

1. WHEN Configuration_State가 변경된 경우, THE Customize_2_Page SHALL Configuration_State를 `localStorage`의 단일 식별 가능한 키 아래에 저장해야 한다.
2. WHEN Customize_2_Page가 로드되고 `localStorage`에 유효한 저장 상태가 존재하는 경우, THE Customize_2_Page SHALL 저장된 Configuration_State를 초기 상태로 복원해야 한다.
3. IF `localStorage`에 저장된 데이터가 현재 Option_Catalog와 불일치하거나 파싱에 실패하는 경우, THEN THE Customize_2_Page SHALL 저장된 데이터를 무시하고 모델 "M" 기준 기본 Configuration_State로 초기화해야 한다.
4. THE Configurator SHALL "초기화" 버튼을 노출해야 한다.
5. WHEN 사용자가 초기화 버튼을 클릭하고 확인 응답을 한 경우, THE Configurator SHALL Configuration_State를 모델 "M" 기준 기본값으로 되돌리고, `localStorage`의 저장 상태를 갱신해야 한다.

### Requirement 19: 상담 CTA 연계

**User Story:** 고객으로서 나는 마음에 드는 구성을 보면 그 구성 그대로 상담을 신청하고 싶다.

#### Acceptance Criteria

1. THE Customize_2_Page SHALL Consultation_CTA를 데스크톱 레이아웃에서 Option_Panel 하단, 모바일 레이아웃에서 Mobile_Sticky_Bar 영역에 각각 노출해야 한다.
2. WHEN 사용자가 Consultation_CTA를 활성화한 경우, THE Customize_2_Page SHALL 현재 Configuration_State의 사람이 읽을 수 있는 요약을 함께 전달하는 방식(쿼리 파라미터, 라우터 상태, 또는 동등한 메커니즘)으로 기존 상담/견적 채널로 연결해야 한다.
3. IF Consultation_CTA가 활성화된 시점에 Configuration_State가 비어 있거나 모델이 선택되지 않은 경우, THEN THE Customize_2_Page SHALL 모델 선택을 먼저 안내하는 메시지를 사용자에게 노출하고 이동을 보류해야 한다.

### Requirement 20: 접근성

**User Story:** 키보드와 스크린리더를 사용하는 사용자로서 나도 컨피규레이터를 동등하게 사용하고 싶다.

#### Acceptance Criteria

1. THE Configurator SHALL 모든 옵션 선택 버튼을 키보드 Tab 키 순서로 도달 가능하게 하고, 포커스된 요소에 시각적으로 식별되는 포커스 링을 표시해야 한다.
2. THE Configurator SHALL 토글 형태의 옵션 버튼(외장재, 색상 스왓치, 추가 옵션 등)에 `aria-pressed` 속성을 현재 선택 상태에 맞게 부여해야 한다.
3. THE Preview_Panel SHALL 모든 placeholder 시각 요소에 의미 있는 한국어 대체 텍스트(`alt` 또는 `aria-label`)를 부여해야 한다.
4. WHEN 사용자의 OS 또는 브라우저가 `prefers-reduced-motion: reduce`를 보고하는 경우, THE Configurator SHALL 비필수 애니메이션과 트랜지션의 지속 시간을 최소화하거나 제거해야 한다.

### Requirement 21: 성능

**User Story:** 방문자로서 나는 페이지가 빠르게 뜨고, 옵션을 클릭할 때마다 즉시 반응하기를 원한다.

#### Acceptance Criteria

1. WHEN 사용자가 옵션을 변경한 경우, THE Configurator SHALL Preview_Panel, Quote_Engine 출력, Summary_View를 같은 사용자 인터랙션 안에서 갱신해야 한다.
2. THE Customize_2_Page SHALL 인트로 섹션 외의 비필수 비주얼 자산에 lazy loading 전략(예: `loading="lazy"`, dynamic import, 또는 동등한 기법)을 적용해야 한다.
3. THE Customize_2_Page SHALL 빌드(`next build`) 시 타입 오류 또는 빌드 오류 없이 컴파일되어야 한다.

### Requirement 22: 브랜드 스타일 및 디자인 토큰

**User Story:** 방문자로서 나는 다른 weet:) 페이지들과 일관된 디자인 분위기 안에서 컨피규레이터를 사용하고 싶다.

#### Acceptance Criteria

1. THE Customize_2_Page SHALL Brand_Style_System의 헤더, 푸터, 폰트 패밀리, 페이지 트랜지션을 그대로 사용해야 한다.
2. THE Customize_2_Page SHALL 색상 팔레트로 화이트/아이보리/라이트그레이/차콜/블랙 계열을 본문 배경 및 컴포넌트 바탕에 사용하고, 포인트 컬러로 웜 베이지/브론즈/골드 브라운 계열을 활성 상태와 가격 강조 영역에 사용해야 한다.
3. THE Customize_2_Page SHALL 경고 또는 주의 정보(예: 유의사항)에 amber 또는 muted blue 계열의 색상 토큰을 사용해야 한다.
4. THE Configurator SHALL 활성 상태의 옵션 버튼/스왓치에 비활성 상태와 명확히 구분되는 시각 표시(테두리, 배경, 체크 아이콘 중 하나 이상)를 적용해야 한다.

### Requirement 23: 기존 시스템 비간섭

**User Story:** 운영자로서 나는 새 페이지가 추가되면서 기존에 운영 중인 라우트와 기능이 깨지지 않을 것을 보장받고 싶다.

#### Acceptance Criteria

1. THE Customize_2_Page 작업 SHALL `app/(redesign)/customize-2/` 디렉토리 신규 파일과 본 작업을 위해 신설하는 데이터/유틸/스타일 모듈 외의 기존 파일을 수정하지 않아야 한다.
2. IF 기존 `customize` 라우트가 워크스페이스에 존재한다면, THEN THE Customize_2_Page 작업 SHALL 해당 라우트의 동작과 URL을 그대로 보존해야 한다.
3. THE Customize_2_Page SHALL `npm run lint` 명령에서 오류 또는 경고를 0으로 통과해야 한다(저장소의 `--max-warnings=0` 설정 기준).

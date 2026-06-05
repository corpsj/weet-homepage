CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS bespoke_option_groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  description TEXT,
  selection_type TEXT NOT NULL DEFAULT 'single' CHECK (selection_type IN ('single', 'multiple')),
  required BOOLEAN NOT NULL DEFAULT true,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS bespoke_options (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id UUID NOT NULL REFERENCES bespoke_option_groups(id) ON DELETE CASCADE,
  label TEXT NOT NULL,
  description TEXT,
  price_delta INTEGER NOT NULL DEFAULT 0,
  lead_time_note TEXT,
  badge TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (group_id, label)
);

CREATE INDEX IF NOT EXISTS idx_bespoke_option_groups_order
  ON bespoke_option_groups(display_order, created_at);

CREATE INDEX IF NOT EXISTS idx_bespoke_option_groups_active
  ON bespoke_option_groups(is_active);

CREATE INDEX IF NOT EXISTS idx_bespoke_options_group_order
  ON bespoke_options(group_id, display_order, created_at);

CREATE INDEX IF NOT EXISTS idx_bespoke_options_active
  ON bespoke_options(is_active);

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_bespoke_option_groups_updated_at ON bespoke_option_groups;
CREATE TRIGGER update_bespoke_option_groups_updated_at
  BEFORE UPDATE ON bespoke_option_groups
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_bespoke_options_updated_at ON bespoke_options;
CREATE TRIGGER update_bespoke_options_updated_at
  BEFORE UPDATE ON bespoke_options
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE bespoke_option_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE bespoke_options ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view active bespoke option groups" ON bespoke_option_groups;
CREATE POLICY "Anyone can view active bespoke option groups" ON bespoke_option_groups
  FOR SELECT USING (is_active = true);

DROP POLICY IF EXISTS "Authenticated users can manage bespoke option groups" ON bespoke_option_groups;
CREATE POLICY "Authenticated users can manage bespoke option groups" ON bespoke_option_groups
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Anyone can view active bespoke options" ON bespoke_options;
CREATE POLICY "Anyone can view active bespoke options" ON bespoke_options
  FOR SELECT USING (
    is_active = true
    AND EXISTS (
      SELECT 1
      FROM bespoke_option_groups groups
      WHERE groups.id = bespoke_options.group_id
      AND groups.is_active = true
    )
  );

DROP POLICY IF EXISTS "Authenticated users can manage bespoke options" ON bespoke_options;
CREATE POLICY "Authenticated users can manage bespoke options" ON bespoke_options
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

WITH groups AS (
  INSERT INTO bespoke_option_groups (key, title, description, selection_type, required, display_order, is_active)
  VALUES
    ('space_type', '공간 용도', '브랜드와 운영 방식에 맞는 기본 공간 유형을 선택합니다.', 'single', true, 10, true),
    ('module_scale', '규모', '설치 부지와 예산에 맞는 모듈 규모를 선택합니다.', 'single', true, 20, true),
    ('finish_tone', '마감 방향', '외장과 실내 분위기의 기준점을 정합니다.', 'single', true, 30, true),
    ('operation_package', '운영 패키지', '전기, 설비, 브랜딩, 스마트 제어 등 필요한 기능을 추가합니다.', 'multiple', false, 40, true),
    ('schedule', '희망 일정', '상담과 제작 계획 수립에 필요한 목표 일정을 선택합니다.', 'single', true, 50, true)
  ON CONFLICT (key) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    selection_type = EXCLUDED.selection_type,
    required = EXCLUDED.required,
    display_order = EXCLUDED.display_order,
    is_active = EXCLUDED.is_active
  RETURNING id, key
)
INSERT INTO bespoke_options (group_id, label, description, price_delta, lead_time_note, badge, display_order, is_active)
SELECT groups.id, seed.label, seed.description, seed.price_delta, seed.lead_time_note, seed.badge, seed.display_order, true
FROM groups
JOIN (
  VALUES
    ('space_type', '스몰 카페', '동선, 픽업, 좌석 밀도를 함께 설계하는 소형 상업 공간', 0, '브랜드 컨셉 정리 후 제안', 'COMMERCIAL', 10),
    ('space_type', '팝업 스토어 / 쇼룸', '짧은 행사 기간과 이동 설치를 전제로 한 브랜드 경험 공간', 0, '행사 일정 우선 검토', 'RETAIL', 20),
    ('space_type', '스마트팜', '단열, 기밀, 환경 제어, 데이터 인프라를 통합하는 재배 공간', 0, '설비 요구사항 확인 필요', 'AGRITECH', 30),
    ('space_type', '세컨하우스 / 스테이', '휴식, 숙박, 임대 운영까지 고려한 프라이빗 모듈러 공간', 0, '부지 조건 확인 필요', 'STAY', 40),
    ('space_type', '공공 / 커뮤니티 시설', '화장실, 정류장, 파빌리온 등 유지관리성을 중시한 공공 공간', 0, '인허가 범위 확인 필요', 'PUBLIC', 50),
    ('module_scale', 'S: 1개 모듈', '3x3, 3x6, 3x9 등 빠르게 설치 가능한 단일 모듈', 0, '가장 빠른 제작 가능', NULL, 10),
    ('module_scale', 'M: 2개 모듈 조합', '운영실, 창고, 좌석 등 기능을 분리할 수 있는 확장형 구성', 0, '기본 설계 협의 필요', NULL, 20),
    ('module_scale', 'L: 모듈 + 현장 공사', '테라스, 캐노피, 데크, 외부 동선을 포함한 복합 구성', 0, '현장 실측 권장', NULL, 30),
    ('module_scale', 'XL: 단지 / 반복 설치', '다수 모듈을 반복 설치하거나 단지형으로 확장하는 프로젝트', 0, '프로젝트 일정 별도 산정', NULL, 40),
    ('finish_tone', '따뜻한 우드', '적삼목, 합성목재, 자작나무 계열의 자연스러운 마감', 0, NULL, NULL, 10),
    ('finish_tone', '미니멀 메탈', '징크, 갈바륨, 스테인리스 계열의 정돈된 외장', 0, NULL, NULL, 20),
    ('finish_tone', '브랜드 컬러 커스텀', '외장 컬러와 그래픽을 브랜드 아이덴티티에 맞춰 조정', 0, '브랜드 자산 필요', NULL, 30),
    ('finish_tone', '고내구 공공형', '오염, 습기, 유지보수에 강한 공공시설 중심 마감', 0, NULL, NULL, 40),
    ('operation_package', '상하수 / 위생 설비', '카페, 화장실, 숙박 운영에 필요한 기본 설비 패키지', 0, '현장 인입 조건 확인', NULL, 10),
    ('operation_package', '전기 / 조명 / 사인', '운영 조명, 외부 사인, 전기 배선 계획을 포함', 0, NULL, NULL, 20),
    ('operation_package', '브랜딩 그래픽', '외부 래핑, 내부 그래픽, 촬영 포인트를 함께 설계', 0, '로고 원본 필요', NULL, 30),
    ('operation_package', 'IoT / 원격 제어', '온습도, 조명, 보안, 스마트팜 제어 등 원격 운영 기능', 0, '운영 시나리오 필요', NULL, 40),
    ('operation_package', '데크 / 캐노피 / 외부 동선', '대기, 휴식, 진입 경험을 만드는 외부 확장 요소', 0, '부지 경계 확인', NULL, 50),
    ('schedule', '1개월 이내 상담 착수', '빠른 상담과 기본 견적 산출을 우선합니다.', 0, '즉시 상담 요청', NULL, 10),
    ('schedule', '2~3개월 내 설치 목표', '제작 가능성과 부지 조건을 함께 검토합니다.', 0, '일반 일정', NULL, 20),
    ('schedule', '행사 / 오픈일 고정', '브랜드 행사, 매장 오픈 등 고정 마감일을 기준으로 역산합니다.', 0, '일정 우선 검토', NULL, 30),
    ('schedule', '아직 검토 단계', '아이디어와 예산 범위부터 함께 정리합니다.', 0, '초기 상담', NULL, 40)
) AS seed(group_key, label, description, price_delta, lead_time_note, badge, display_order)
ON groups.key = seed.group_key
ON CONFLICT (group_id, label) DO UPDATE SET
  description = EXCLUDED.description,
  price_delta = EXCLUDED.price_delta,
  lead_time_note = EXCLUDED.lead_time_note,
  badge = EXCLUDED.badge,
  display_order = EXCLUDED.display_order,
  is_active = EXCLUDED.is_active;

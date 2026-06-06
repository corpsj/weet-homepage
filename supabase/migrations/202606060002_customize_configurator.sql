CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TABLE IF NOT EXISTS customize_models (
  id TEXT PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  name_ko TEXT NOT NULL,
  name_en TEXT,
  width_m NUMERIC(4, 1) NOT NULL,
  length_m NUMERIC(4, 1) NOT NULL,
  area_sqm NUMERIC(5, 1) NOT NULL,
  base_price INTEGER NOT NULL CHECK (base_price >= 0),
  floorplan_image_path TEXT,
  floorplan_overlay_path TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS customize_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT NOT NULL UNIQUE,
  name_ko TEXT NOT NULL,
  name_en TEXT,
  description_ko TEXT,
  description_en TEXT,
  selection_type TEXT NOT NULL DEFAULT 'single' CHECK (selection_type IN ('single', 'multiple')),
  required BOOLEAN NOT NULL DEFAULT FALSE,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS customize_options (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID NOT NULL REFERENCES customize_categories(id) ON DELETE RESTRICT,
  key TEXT NOT NULL,
  name_ko TEXT NOT NULL,
  name_en TEXT,
  short_description_ko TEXT NOT NULL,
  short_description_en TEXT,
  detail_description_ko TEXT,
  detail_description_en TEXT,
  price_type TEXT NOT NULL DEFAULT 'fixed' CHECK (price_type IN ('included', 'fixed', 'consult')),
  price INTEGER NOT NULL DEFAULT 0 CHECK (price >= 0),
  is_default BOOLEAN NOT NULL DEFAULT FALSE,
  available_model_ids TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  image_path TEXT,
  overlay_image_path TEXT,
  overlay_label_ko TEXT,
  overlay_label_en TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (category_id, key)
);

CREATE TABLE IF NOT EXISTS customize_option_conflicts (
  option_id UUID NOT NULL REFERENCES customize_options(id) ON DELETE CASCADE,
  conflicts_with_option_id UUID NOT NULL REFERENCES customize_options(id) ON DELETE CASCADE,
  reason_ko TEXT,
  reason_en TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (option_id, conflicts_with_option_id),
  CHECK (option_id <> conflicts_with_option_id)
);

CREATE TABLE IF NOT EXISTS customize_included_specs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  model_id TEXT REFERENCES customize_models(id) ON DELETE CASCADE,
  key TEXT NOT NULL,
  name_ko TEXT NOT NULL,
  name_en TEXT,
  description_ko TEXT,
  description_en TEXT,
  category_key TEXT,
  icon_name TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (model_id, key)
);

CREATE TABLE IF NOT EXISTS customize_consultations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  region TEXT NOT NULL,
  purchase_timeline TEXT,
  land_type TEXT,
  install_address TEXT,
  budget_range TEXT,
  memo TEXT,
  status TEXT NOT NULL DEFAULT '신규' CHECK (status IN ('신규', '진행중', '완료', '보류')),
  internal_memo TEXT,
  selected_model_id TEXT REFERENCES customize_models(id) ON DELETE SET NULL,
  selected_option_ids UUID[] NOT NULL DEFAULT ARRAY[]::UUID[],
  estimated_total INTEGER NOT NULL DEFAULT 0 CHECK (estimated_total >= 0),
  config_query TEXT,
  config_snapshot JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_customize_models_public_order
  ON customize_models(is_active, display_order, created_at);

CREATE INDEX IF NOT EXISTS idx_customize_categories_public_order
  ON customize_categories(is_active, display_order, created_at);

CREATE INDEX IF NOT EXISTS idx_customize_options_category_order
  ON customize_options(category_id, is_active, display_order, created_at);

CREATE INDEX IF NOT EXISTS idx_customize_options_available_models
  ON customize_options USING GIN(available_model_ids);

CREATE INDEX IF NOT EXISTS idx_customize_included_specs_order
  ON customize_included_specs(model_id, is_active, display_order, created_at);

CREATE INDEX IF NOT EXISTS idx_customize_consultations_status_created
  ON customize_consultations(status, created_at DESC);

DROP TRIGGER IF EXISTS update_customize_models_updated_at ON customize_models;
CREATE TRIGGER update_customize_models_updated_at
  BEFORE UPDATE ON customize_models
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_customize_categories_updated_at ON customize_categories;
CREATE TRIGGER update_customize_categories_updated_at
  BEFORE UPDATE ON customize_categories
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_customize_options_updated_at ON customize_options;
CREATE TRIGGER update_customize_options_updated_at
  BEFORE UPDATE ON customize_options
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_customize_included_specs_updated_at ON customize_included_specs;
CREATE TRIGGER update_customize_included_specs_updated_at
  BEFORE UPDATE ON customize_included_specs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_customize_consultations_updated_at ON customize_consultations;
CREATE TRIGGER update_customize_consultations_updated_at
  BEFORE UPDATE ON customize_consultations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE customize_models ENABLE ROW LEVEL SECURITY;
ALTER TABLE customize_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE customize_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE customize_option_conflicts ENABLE ROW LEVEL SECURITY;
ALTER TABLE customize_included_specs ENABLE ROW LEVEL SECURITY;
ALTER TABLE customize_consultations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view active customize models" ON customize_models;
CREATE POLICY "Anyone can view active customize models" ON customize_models
  FOR SELECT TO anon, authenticated USING (is_active = TRUE);

DROP POLICY IF EXISTS "Authenticated users can manage customize models" ON customize_models;
CREATE POLICY "Authenticated users can manage customize models" ON customize_models
  FOR ALL TO authenticated USING (TRUE) WITH CHECK (TRUE);

DROP POLICY IF EXISTS "Anyone can view active customize categories" ON customize_categories;
CREATE POLICY "Anyone can view active customize categories" ON customize_categories
  FOR SELECT TO anon, authenticated USING (is_active = TRUE);

DROP POLICY IF EXISTS "Authenticated users can manage customize categories" ON customize_categories;
CREATE POLICY "Authenticated users can manage customize categories" ON customize_categories
  FOR ALL TO authenticated USING (TRUE) WITH CHECK (TRUE);

DROP POLICY IF EXISTS "Anyone can view active customize options" ON customize_options;
CREATE POLICY "Anyone can view active customize options" ON customize_options
  FOR SELECT TO anon, authenticated USING (
    is_active = TRUE
    AND EXISTS (
      SELECT 1
      FROM customize_categories categories
      WHERE categories.id = customize_options.category_id
      AND categories.is_active = TRUE
    )
  );

DROP POLICY IF EXISTS "Authenticated users can manage customize options" ON customize_options;
CREATE POLICY "Authenticated users can manage customize options" ON customize_options
  FOR ALL TO authenticated USING (TRUE) WITH CHECK (TRUE);

DROP POLICY IF EXISTS "Anyone can view active customize conflicts" ON customize_option_conflicts;
CREATE POLICY "Anyone can view active customize conflicts" ON customize_option_conflicts
  FOR SELECT TO anon, authenticated USING (
    EXISTS (
      SELECT 1
      FROM customize_options options
      WHERE options.id = customize_option_conflicts.option_id
      AND options.is_active = TRUE
    )
    AND EXISTS (
      SELECT 1
      FROM customize_options options
      WHERE options.id = customize_option_conflicts.conflicts_with_option_id
      AND options.is_active = TRUE
    )
  );

DROP POLICY IF EXISTS "Authenticated users can manage customize conflicts" ON customize_option_conflicts;
CREATE POLICY "Authenticated users can manage customize conflicts" ON customize_option_conflicts
  FOR ALL TO authenticated USING (TRUE) WITH CHECK (TRUE);

DROP POLICY IF EXISTS "Anyone can view active customize included specs" ON customize_included_specs;
CREATE POLICY "Anyone can view active customize included specs" ON customize_included_specs
  FOR SELECT TO anon, authenticated USING (is_active = TRUE);

DROP POLICY IF EXISTS "Authenticated users can manage customize included specs" ON customize_included_specs;
CREATE POLICY "Authenticated users can manage customize included specs" ON customize_included_specs
  FOR ALL TO authenticated USING (TRUE) WITH CHECK (TRUE);

DROP POLICY IF EXISTS "Anyone can insert customize consultations" ON customize_consultations;
CREATE POLICY "Anyone can insert customize consultations" ON customize_consultations
  FOR INSERT TO anon, authenticated WITH CHECK (status = '신규');

DROP POLICY IF EXISTS "Authenticated users can manage customize consultations" ON customize_consultations;
CREATE POLICY "Authenticated users can manage customize consultations" ON customize_consultations
  FOR ALL TO authenticated USING (TRUE) WITH CHECK (TRUE);

INSERT INTO customize_models (
  id, code, name_ko, name_en, width_m, length_m, area_sqm, base_price,
  floorplan_image_path, display_order, is_active
) VALUES
  ('compact-3x6', '3x6', 'Compact 3x6', 'Compact 3x6', 3.0, 6.0, 18.0, 27900000, '/images/customize/dummy-base.svg', 10, TRUE),
  ('standard-3x9', '3x9', 'Standard 3x9', 'Standard 3x9', 3.0, 9.0, 27.0, 34900000, '/images/customize/dummy-base.svg', 20, TRUE)
ON CONFLICT (id) DO UPDATE SET
  code = EXCLUDED.code,
  name_ko = EXCLUDED.name_ko,
  name_en = EXCLUDED.name_en,
  width_m = EXCLUDED.width_m,
  length_m = EXCLUDED.length_m,
  area_sqm = EXCLUDED.area_sqm,
  base_price = EXCLUDED.base_price,
  floorplan_image_path = EXCLUDED.floorplan_image_path,
  display_order = EXCLUDED.display_order,
  is_active = EXCLUDED.is_active;

WITH seed_categories AS (
  SELECT *
  FROM (VALUES
    ('model', '모델', 'Model', '생활 면적과 기본 가격을 선택합니다.', 'single', TRUE, 10),
    ('exterior', '외장', 'Exterior', '외부 마감과 첫인상을 정합니다.', 'single', TRUE, 20),
    ('windows', '창호', 'Windows', '채광과 환기 방식을 조정합니다.', 'multiple', FALSE, 30),
    ('door', '도어', 'Door', '출입 보안과 사용성을 선택합니다.', 'single', TRUE, 40),
    ('interior', '내장', 'Interior', '실내 벽체와 분위기를 선택합니다.', 'single', TRUE, 50),
    ('flooring', '바닥재', 'Flooring', '바닥 마감재를 선택합니다.', 'single', TRUE, 60),
    ('sink', '싱크대', 'Sink', '주방 구성과 빌트인 옵션을 선택합니다.', 'multiple', FALSE, 70),
    ('bathroom', '욕실', 'Bathroom', '욕실 기본 구성과 업그레이드를 선택합니다.', 'multiple', FALSE, 80),
    ('furniture', '가구', 'Furniture', '수납과 가구 옵션을 더합니다.', 'multiple', FALSE, 90),
    ('energy', '에너지', 'Energy', '전력과 에너지 설비를 상담합니다.', 'multiple', FALSE, 100),
    ('connectivity', '커넥티비티', 'Connectivity', '네트워크와 스마트 기능을 선택합니다.', 'multiple', FALSE, 110)
  ) AS values(key, name_ko, name_en, description_ko, selection_type, required, display_order)
)
INSERT INTO customize_categories (key, name_ko, name_en, description_ko, selection_type, required, display_order, is_active)
SELECT key, name_ko, name_en, description_ko, selection_type, required, display_order, TRUE
FROM seed_categories
ON CONFLICT (key) DO UPDATE SET
  name_ko = EXCLUDED.name_ko,
  name_en = EXCLUDED.name_en,
  description_ko = EXCLUDED.description_ko,
  selection_type = EXCLUDED.selection_type,
  required = EXCLUDED.required,
  display_order = EXCLUDED.display_order,
  is_active = EXCLUDED.is_active;

WITH seed_options AS (
  SELECT *
  FROM (VALUES
    ('exterior', 'ribbed-steel-white', '골강판 화이트', '기본 외장 마감', '밝고 관리가 쉬운 기본 외장입니다.', 'included', 0, TRUE, ARRAY['compact-3x6','standard-3x9']::TEXT[], NULL, '외장'),
    ('exterior', 'zinc-gray', '징크 그레이', '정돈된 메탈 마감', '차분한 회색 계열의 프리미엄 외장입니다.', 'fixed', 1500000, FALSE, ARRAY['compact-3x6','standard-3x9']::TEXT[], NULL, '외장'),
    ('exterior', 'cedar-point', '적삼목 포인트', '따뜻한 목재 포인트', '작은 모듈에도 깊이를 주는 포인트 마감입니다.', 'fixed', 2200000, FALSE, ARRAY['compact-3x6','standard-3x9']::TEXT[], NULL, '외장'),
    ('windows', 'basic-window', '기본창', '기본 포함 창호', '생활에 필요한 기본 채광과 환기를 제공합니다.', 'included', 0, TRUE, ARRAY['compact-3x6','standard-3x9']::TEXT[], NULL, '기본창'),
    ('windows', 'extra-window', '추가창', '채광 추가', '설치 방향에 맞춰 창을 더합니다.', 'fixed', 800000, FALSE, ARRAY['compact-3x6','standard-3x9']::TEXT[], NULL, '추가창'),
    ('windows', 'wide-window', '와이드 픽처창', '넓은 조망창', '거실 또는 침실에 넓은 조망을 만듭니다.', 'fixed', 1400000, FALSE, ARRAY['standard-3x9']::TEXT[], NULL, '와이드창'),
    ('door', 'standard-lock', '기본 도어락', '기본 포함 출입 보안', '현관도어와 기본 잠금 장치를 포함합니다.', 'included', 0, TRUE, ARRAY['compact-3x6','standard-3x9']::TEXT[], NULL, '현관도어'),
    ('door', 'smart-lock', '스마트 도어락', '비밀번호·카드 출입', '단기 체류와 임대 운영에 편한 스마트 잠금입니다.', 'fixed', 450000, FALSE, ARRAY['compact-3x6','standard-3x9']::TEXT[], NULL, '스마트락'),
    ('interior', 'paper-wall', '합지벽지', '기본 내장 마감', '깨끗하고 부담 없는 기본 실내 마감입니다.', 'included', 0, TRUE, ARRAY['compact-3x6','standard-3x9']::TEXT[], NULL, '내장'),
    ('interior', 'silk-wallpaper', '실크벽지', '오염에 강한 업그레이드', '관리성과 질감을 높인 벽지 마감입니다.', 'fixed', 900000, FALSE, ARRAY['compact-3x6','standard-3x9']::TEXT[], NULL, '내장'),
    ('interior', 'birch-panel', '자작합판 마감', '따뜻한 목재 실내', '소형 공간에 온기를 주는 목재 마감입니다.', 'fixed', 1800000, FALSE, ARRAY['compact-3x6','standard-3x9']::TEXT[], NULL, '내장'),
    ('flooring', 'spc-white-oak', 'SPC 화이트오크', '기본 바닥재', '밝고 넓어 보이는 기본 바닥 마감입니다.', 'included', 0, TRUE, ARRAY['compact-3x6','standard-3x9']::TEXT[], NULL, '바닥'),
    ('flooring', 'spc-natural-oak', 'SPC 내추럴오크', '따뜻한 나무톤', '생활감이 부드러운 내추럴 오크 톤입니다.', 'fixed', 300000, FALSE, ARRAY['compact-3x6','standard-3x9']::TEXT[], NULL, '바닥'),
    ('flooring', 'porcelain-tile', '포세린 타일', '내구성 중심 마감', '물과 오염에 강한 타일 바닥입니다.', 'fixed', 1200000, FALSE, ARRAY['standard-3x9']::TEXT[], NULL, '타일'),
    ('sink', 'basic-sink', '기본 싱크대', '기본 포함 주방', '작은 주방에 필요한 싱크대와 기본 동선을 포함합니다.', 'included', 0, TRUE, ARRAY['compact-3x6','standard-3x9']::TEXT[], NULL, '싱크대'),
    ('sink', 'built-in-fridge', '빌트인 냉장고', '주방 가전 추가', '공간을 깔끔하게 쓰는 빌트인 냉장 옵션입니다.', 'fixed', 1200000, FALSE, ARRAY['standard-3x9']::TEXT[], NULL, '냉장고'),
    ('sink', 'mini-washer', 'LG 미니워시 2kg', '소형 세탁 옵션', '장기 체류에 필요한 소형 세탁 옵션입니다.', 'fixed', 850000, FALSE, ARRAY['standard-3x9']::TEXT[], NULL, '세탁기'),
    ('bathroom', 'basic-bathroom', '기본 욕실', '기본 포함 욕실', '샤워, 세면, 양변기 중심의 기본 욕실입니다.', 'included', 0, TRUE, ARRAY['compact-3x6','standard-3x9']::TEXT[], NULL, '욕실'),
    ('bathroom', 'bidet', '비데', '위생 업그레이드', '사용감을 높이는 비데 옵션입니다.', 'fixed', 350000, FALSE, ARRAY['compact-3x6','standard-3x9']::TEXT[], NULL, '비데'),
    ('bathroom', 'dry-vanity', '건식 세면 옵션', '세면 공간 분리', '욕실 바깥 세면대를 구성합니다.', 'fixed', 900000, FALSE, ARRAY['standard-3x9']::TEXT[], NULL, '세면대'),
    ('furniture', 'built-in-storage', '붙박이 수납', '수납 공간 확장', '작은 집에 맞춘 벽면 수납입니다.', 'fixed', 900000, FALSE, ARRAY['compact-3x6','standard-3x9']::TEXT[], NULL, '수납'),
    ('furniture', 'folding-table', '접이식 테이블', '작업·식사 겸용', '필요할 때만 펼쳐 쓰는 테이블입니다.', 'fixed', 450000, FALSE, ARRAY['compact-3x6','standard-3x9']::TEXT[], NULL, '테이블'),
    ('furniture', 'bed-frame', '침대 프레임', '수면 공간 구성', '3x9 모델에 맞춘 침대 프레임입니다.', 'fixed', 700000, FALSE, ARRAY['standard-3x9']::TEXT[], NULL, '침대'),
    ('energy', 'solar-panel', '태양광 패널', '전력 보조 설비', '일조량과 사용량 검토 후 제안합니다.', 'consult', 0, FALSE, ARRAY['compact-3x6','standard-3x9']::TEXT[], NULL, '태양광'),
    ('energy', 'ess', 'ESS', '에너지 저장 장치', '사용 패턴과 부지 조건에 따라 별도 상담합니다.', 'consult', 0, FALSE, ARRAY['standard-3x9']::TEXT[], NULL, 'ESS'),
    ('energy', 'ev-charger', '전기차 충전기', '외부 충전 설비', '전기 인입 조건을 확인한 뒤 제안합니다.', 'consult', 0, FALSE, ARRAY['compact-3x6','standard-3x9']::TEXT[], NULL, '충전기'),
    ('connectivity', 'iot-package', 'IoT 패키지', '조명·온도 원격 제어', '문, 조명, 냉난방을 앱으로 관리합니다.', 'fixed', 900000, FALSE, ARRAY['compact-3x6','standard-3x9']::TEXT[], NULL, 'IoT'),
    ('connectivity', 'security-package', '보안 패키지', 'CCTV·센서 구성', '무인 사용과 세컨하우스 관리를 돕습니다.', 'fixed', 700000, FALSE, ARRAY['compact-3x6','standard-3x9']::TEXT[], NULL, '보안'),
    ('connectivity', 'satellite-internet', '위성 인터넷', '원격지 연결', '유선망이 어려운 부지의 연결 방식을 검토합니다.', 'consult', 0, FALSE, ARRAY['compact-3x6','standard-3x9']::TEXT[], NULL, '위성망'),
    ('connectivity', 'cellular-router', 'LTE/5G 라우터', '이동통신망 연결', '통신사 커버리지 확인 후 구성합니다.', 'consult', 0, FALSE, ARRAY['compact-3x6','standard-3x9']::TEXT[], NULL, '라우터')
  ) AS values(category_key, key, name_ko, short_description_ko, detail_description_ko, price_type, price, is_default, available_model_ids, image_path, overlay_label_ko)
)
INSERT INTO customize_options (
  category_id, key, name_ko, short_description_ko, detail_description_ko,
  price_type, price, is_default, available_model_ids, image_path, overlay_label_ko,
  display_order, is_active
)
SELECT
  categories.id,
  seed_options.key,
  seed_options.name_ko,
  seed_options.short_description_ko,
  seed_options.detail_description_ko,
  seed_options.price_type,
  seed_options.price,
  seed_options.is_default,
  seed_options.available_model_ids,
  seed_options.image_path,
  seed_options.overlay_label_ko,
  ROW_NUMBER() OVER (PARTITION BY seed_options.category_key ORDER BY seed_options.key) * 10,
  TRUE
FROM seed_options
JOIN customize_categories categories ON categories.key = seed_options.category_key
ON CONFLICT (category_id, key) DO UPDATE SET
  name_ko = EXCLUDED.name_ko,
  short_description_ko = EXCLUDED.short_description_ko,
  detail_description_ko = EXCLUDED.detail_description_ko,
  price_type = EXCLUDED.price_type,
  price = EXCLUDED.price,
  is_default = EXCLUDED.is_default,
  available_model_ids = EXCLUDED.available_model_ids,
  image_path = EXCLUDED.image_path,
  overlay_label_ko = EXCLUDED.overlay_label_ko,
  display_order = EXCLUDED.display_order,
  is_active = EXCLUDED.is_active;

INSERT INTO customize_included_specs (
  model_id, key, name_ko, name_en, description_ko, category_key, icon_name, display_order, is_active
) VALUES
  (NULL, 'entry-door', '현관도어', 'Entry door', '단열 현관도어와 기본 손잡이를 포함합니다.', 'door', 'DoorOpen', 10, TRUE),
  (NULL, 'basic-window', '기본창', 'Basic window', '생활에 필요한 기본 창호를 포함합니다.', 'windows', 'PanelTop', 20, TRUE),
  (NULL, 'basic-sink', '싱크대', 'Sink', '기본 싱크대와 상판을 포함합니다.', 'sink', 'Waves', 30, TRUE),
  (NULL, 'basic-bathroom', '욕실', 'Bathroom', '샤워, 세면, 양변기 중심의 기본 욕실을 포함합니다.', 'bathroom', 'Bath', 40, TRUE)
ON CONFLICT (model_id, key) DO UPDATE SET
  name_ko = EXCLUDED.name_ko,
  name_en = EXCLUDED.name_en,
  description_ko = EXCLUDED.description_ko,
  category_key = EXCLUDED.category_key,
  icon_name = EXCLUDED.icon_name,
  display_order = EXCLUDED.display_order,
  is_active = EXCLUDED.is_active;

WITH satellite AS (
  SELECT id FROM customize_options WHERE key = 'satellite-internet'
), cellular AS (
  SELECT id FROM customize_options WHERE key = 'cellular-router'
)
INSERT INTO customize_option_conflicts (option_id, conflicts_with_option_id, reason_ko)
SELECT satellite.id, cellular.id, '인터넷 연결 방식은 하나만 선택합니다.'
FROM satellite, cellular
ON CONFLICT (option_id, conflicts_with_option_id) DO UPDATE SET reason_ko = EXCLUDED.reason_ko;

WITH satellite AS (
  SELECT id FROM customize_options WHERE key = 'satellite-internet'
), cellular AS (
  SELECT id FROM customize_options WHERE key = 'cellular-router'
)
INSERT INTO customize_option_conflicts (option_id, conflicts_with_option_id, reason_ko)
SELECT cellular.id, satellite.id, '인터넷 연결 방식은 하나만 선택합니다.'
FROM satellite, cellular
ON CONFLICT (option_id, conflicts_with_option_id) DO UPDATE SET reason_ko = EXCLUDED.reason_ko;

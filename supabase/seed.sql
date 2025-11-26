-- 기존 제품 데이터 시드
INSERT INTO products (id, name, category, sub_category, size_category, image_url, tagline, description, price, structure, roof_type, exterior_finish, interior_finish, size, display_order) VALUES

-- S - Private
('3x9-박공지붕', '3X9 박공지붕', 'Small unit', 'Private', 'S', '/images/products/3x9-gable.jpg', '"카페는 커피 맛 이전에,', '''공간의 경험''으로 먼저 기억됩니다.', '문의', '경량 철골조', '박공지붕', '징크 + 목재', '원목 마감', '3m x 9m', 1),

('세컨하우스-3x6', '세컨하우스 3X6', 'Small unit', 'Private', 'S', '/images/products/second-house-3x6.jpg', '"일상에서 벗어나', '나만의 공간에서 쉼을 찾다."', '문의', '경량 철골조', '평지붕', '징크', '원목 마감', '3m x 6m', 2),

('세컨하우스-4x8', '세컨하우스 4X8', 'Small unit', 'Private', 'S', '/images/products/second-house-4x8.jpg', '"더 넓은 공간에서', '더 깊은 휴식을 경험하다."', '문의', '경량 철골조', '평지붕', '징크', '원목 마감', '4m x 8m', 3),

('내-서재', '내 서재', 'Small unit', 'Private', 'S', '/images/products/library.png', '"책과 함께하는', '나만의 은밀한 공간."', '문의', '경량 철골조', '박공지붕', '목재', '원목 서가', '3m x 4m', 4),

('피터팬의-모험', '피터팬의 모험', 'Small unit', 'Private', 'S', '/images/products/peterpan.jpg', '"아이들의 상상력이', '현실이 되는 공간."', '문의', '경량 철골조', '박공지붕', '컬러 강판', '친환경 마감', '3m x 3m', 5),

('낭만고양이', '낭만고양이', 'Small unit', 'Private', 'S', '/images/products/romantic-cat.jpg', '"고양이와 함께하는', '낭만적인 일상."', '문의', '경량 철골조', '박공지붕', '목재', '펫 친화 마감', '2.5m x 3m', 6),

('리트릿', '리트릿', 'Small unit', 'Private', 'S', '/images/products/retreat.png', '"자연 속에서 찾는', '진정한 힐링의 시간."', '문의', '경량 철골조', '평지붕', '우드 사이딩', '미니멀 원목', '3m x 6m', 7),

('맨스케이브', '맨스케이브', 'Small unit', 'Private', 'S', '/images/products/manscave.jpg', '"남자의 로망,', '나만의 아지트."', '문의', '경량 철골조', '평지붕', '블랙 징크', '인더스트리얼', '3m x 5m', 8),

('리틀포레스트', '리틀포레스트', 'Small unit', 'Private', 'S', '/images/products/little-forest.jpg', '"숲 속의 작은 집,', '자연과 하나되는 경험."', '문의', '경량 철골조', '박공지붕', '목재 + 유리', '내추럴 원목', '3.5m x 4.5m', 9),

('파고라', '파고라', 'Small unit', 'Private', 'S', '/images/products/pagora.jpg', '"정원의 쉼터,', '자연을 품은 공간."', '문의', '경량 철골조', '오픈형', '목재', '오픈 구조', '4m x 4m', 10),

('캠퍼', '캠퍼', 'Small unit', 'Private', 'S', '/images/products/camper.png', '"어디서든 집처럼,', '이동하는 나의 공간."', '문의', '경량 철골조', '곡선형', '알루미늄', '컴팩트 인테리어', '2.5m x 5m', 11),

('사우나', '사우나', 'Small unit', 'Private', 'S', '/images/products/sauna.png', '"집에서 즐기는', '프라이빗 사우나."', '문의', '경량 철골조', '박공지붕', '삼나무', '히노끼', '2.5m x 3m', 12),

-- S - Public
('공공-파빌리온', '공공 파빌리온', 'Small unit', 'Public', 'S', '/images/products/public-pavilion.jpg', '"도시의 쉼터,', '모두를 위한 공간."', '문의', '경량 철골조', '캐노피형', '코르텐강', '노출 콘크리트', '5m x 8m', 13),

('버스정류장', '버스정류장', 'Small unit', 'Public', 'S', '/images/products/bus-stop.png', '"기다림이 즐거운', '도시의 새로운 풍경."', '문의', '경량 철골조', '캐노피형', '강화유리 + 스틸', '스틸', '3m x 1.5m', 14),

('공공-화장실', '공공 화장실', 'Small unit', 'Public', 'S', '/images/products/public-restroom.jpg', '"깨끗하고 쾌적한', '공공 편의시설."', '문의', '경량 철골조', '평지붕', '스테인리스', '타일', '4m x 6m', 15),

-- M Category
('small-unit-m', 'Small unit + Small unit', 'Medium unit', 'Private', 'M', '/images/products/medium-unit.jpg', '"두 개의 모듈이 만나', '더 넓은 가능성을 열다."', '문의', '경량 철골조', '연결형', '징크', '원목 마감', '6m x 6m', 16),

-- L Category
('small-unit-l', 'Small unit + Small unit + 현장공사', 'Large unit', 'Private', 'L', '/images/products/large-unit.jpg', '"모듈과 현장의 조화,', '완벽한 맞춤 공간."', '문의', '경량 철골조 + RC', '복합형', '복합 마감', '맞춤 인테리어', '맞춤 설계', 17),

-- XL Category
('단지개념', '단지개념', 'Extra Large', 'Private', 'XL', '/images/products/complex.jpg', '"모듈러의 확장,', '단지 규모의 새로운 패러다임."', '문의', '복합 구조', '다양한 조합', '프로젝트별 상이', '프로젝트별 상이', '대규모 맞춤', 18);

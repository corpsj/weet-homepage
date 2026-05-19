/**
 * 위트 커스터마이징 설정 데이터
 * 모델 및 7 개 옵션 카테고리 하드코딩 데이터
 */

export interface Model {
  id: string;
  name: string;
  size: string;
  area: number;
  basePrice: number;
  imagePath: string;
}

export interface OptionItem {
  id: string;
  name: string;
  price: number;
  imagePath: string;
  overlayImagePath?: string;
}

export interface OptionCategory {
  id: string;
  name: string;
  type: 'single' | 'multiple';
  items: OptionItem[];
}

// ==================== 모델 데이터 ====================

export const models: Model[] = [
  {
    id: 'S',
    name: 'S',
    size: '3x6m',
    area: 18,
    basePrice: 50000000,
    imagePath: '/images/customize/models/s-model.webp',
  },
  {
    id: 'M',
    name: 'M',
    size: '3x9m',
    area: 27,
    basePrice: 70000000,
    imagePath: '/images/customize/models/m-model.webp',
  },
  {
    id: 'L',
    name: 'L',
    size: '4x8m',
    area: 32,
    basePrice: 85000000,
    imagePath: '/images/customize/models/l-model.webp',
  },
];

// ==================== 옵션 카테고리 데이터 ====================

/**
 * 1. 외장마감재 (Exterior Finishes)
 * - 골강판 (색상: 화이트/그레이/블랙)
 * - 적삼목
 * - 시멘트사이딩 (색상: 화이트/베이지)
 */
export const exteriorFinishes: OptionCategory = {
  id: 'exterior',
  name: '외장마감재',
  type: 'single',
  items: [
    {
      id: 'steel-white',
      name: '골강판 - 화이트',
      price: 0,
      imagePath: '/images/customize/exterior/steel-white.webp',
      overlayImagePath: '/images/customize/overlays/exterior-steel-white.png',
    },
    {
      id: 'steel-gray',
      name: '골강판 - 그레이',
      price: 0,
      imagePath: '/images/customize/exterior/steel-gray.webp',
      overlayImagePath: '/images/customize/overlays/exterior-steel-gray.png',
    },
    {
      id: 'steel-black',
      name: '골강판 - 블랙',
      price: 0,
      imagePath: '/images/customize/exterior/steel-black.webp',
      overlayImagePath: '/images/customize/overlays/exterior-steel-black.png',
    },
    {
      id: 'wood-cedar',
      name: '적삼목',
      price: 15000000,
      imagePath: '/images/customize/exterior/wood-cedar.webp',
      overlayImagePath: '/images/customize/overlays/exterior-wood-cedar.png',
    },
    {
      id: 'cement-white',
      name: '시멘트사이딩 - 화이트',
      price: 8000000,
      imagePath: '/images/customize/exterior/cement-white.webp',
      overlayImagePath: '/images/customize/overlays/exterior-cement-white.png',
    },
    {
      id: 'cement-beige',
      name: '시멘트사이딩 - 베이지',
      price: 8000000,
      imagePath: '/images/customize/exterior/cement-beige.webp',
      overlayImagePath: '/images/customize/overlays/exterior-cement-beige.png',
    },
  ],
};

/**
 * 2. 바닥재 (Flooring)
 * - SPC 돌마루 (색상: 화이트오크/내추럴오크/그레이)
 */
export const flooring: OptionCategory = {
  id: 'flooring',
  name: '바닥재',
  type: 'single',
  items: [
    {
      id: 'spc-white-oak',
      name: 'SPC 돌마루 - 화이트오크',
      price: 0,
      imagePath: '/images/customize/flooring/spc-white-oak.webp',
      overlayImagePath: '/images/customize/overlays/flooring-spc-white-oak.png',
    },
    {
      id: 'spc-natural-oak',
      name: 'SPC 돌마루 - 내추럴오크',
      price: 0,
      imagePath: '/images/customize/flooring/spc-natural-oak.webp',
      overlayImagePath: '/images/customize/overlays/flooring-spc-natural-oak.png',
    },
    {
      id: 'spc-gray',
      name: 'SPC 돌마루 - 그레이',
      price: 0,
      imagePath: '/images/customize/flooring/spc-gray.webp',
      overlayImagePath: '/images/customize/overlays/flooring-spc-gray.png',
    },
  ],
};

/**
 * 3. 내장마감 (Interior Walls)
 * - 합지벽지
 * - 실크벽지
 * - 도장
 * - 원목
 */
export const interiorWalls: OptionCategory = {
  id: 'interior',
  name: '내장마감',
  type: 'single',
  items: [
    {
      id: 'wallpaper-standard',
      name: '합지벽지',
      price: 0,
      imagePath: '/images/customize/interior/wallpaper-standard.webp',
      overlayImagePath: '/images/customize/overlays/interior-wallpaper-standard.png',
    },
    {
      id: 'wallpaper-silk',
      name: '실크벽지',
      price: 5000000,
      imagePath: '/images/customize/interior/wallpaper-silk.webp',
      overlayImagePath: '/images/customize/overlays/interior-wallpaper-silk.png',
    },
    {
      id: 'paint',
      name: '도장',
      price: 3000000,
      imagePath: '/images/customize/interior/paint.webp',
      overlayImagePath: '/images/customize/overlays/interior-paint.png',
    },
    {
      id: 'wood-panel',
      name: '원목',
      price: 12000000,
      imagePath: '/images/customize/interior/wood-panel.webp',
      overlayImagePath: '/images/customize/overlays/interior-wood-panel.png',
    },
  ],
};

/**
 * 4. 주방 (Kitchen)
 * - 기본포함 (싱크대 + 하이라이트 + 후드, price: 0)
 * - 선택: 냉장고, 세탁기 (9kg), 세탁기 (2kg)
 */
export const kitchen: OptionCategory = {
  id: 'kitchen',
  name: '주방',
  type: 'multiple',
  items: [
    {
      id: 'kitchen-basic',
      name: '기본포함 (싱크대 + 하이라이트 + 후드)',
      price: 0,
      imagePath: '/images/customize/kitchen/basic.webp',
      overlayImagePath: '/images/customize/overlays/kitchen-basic.png',
    },
    {
      id: 'refrigerator',
      name: '냉장고',
      price: 1200000,
      imagePath: '/images/customize/kitchen/refrigerator.webp',
      overlayImagePath: '/images/customize/overlays/kitchen-refrigerator.png',
    },
    {
      id: 'washer-9kg',
      name: '세탁기 (9kg)',
      price: 800000,
      imagePath: '/images/customize/kitchen/washer-9kg.webp',
      overlayImagePath: '/images/customize/overlays/kitchen-washer-9kg.png',
    },
    {
      id: 'washer-2kg',
      name: '세탁기 (2kg)',
      price: 500000,
      imagePath: '/images/customize/kitchen/washer-2kg.webp',
      overlayImagePath: '/images/customize/overlays/kitchen-washer-2kg.png',
    },
  ],
};

/**
 * 5. 욕실 (Bathroom)
 * - 기본포함 (샤워부스 + 세면대 + 양변기, price: 0)
 * - 선택: 비데
 */
export const bathroom: OptionCategory = {
  id: 'bathroom',
  name: '욕실',
  type: 'multiple',
  items: [
    {
      id: 'bathroom-basic',
      name: '기본포함 (샤워부스 + 세면대 + 양변기)',
      price: 0,
      imagePath: '/images/customize/bathroom/basic.webp',
      overlayImagePath: '/images/customize/overlays/bathroom-basic.png',
    },
    {
      id: 'bidet',
      name: '비데',
      price: 400000,
      imagePath: '/images/customize/bathroom/bidet.webp',
      overlayImagePath: '/images/customize/overlays/bathroom-bidet.png',
    },
  ],
};

/**
 * 6. 설비/기능 (Utilities & Features)
 * - IOT 패키지
 * - 전기차 충전기
 */
export const utilities: OptionCategory = {
  id: 'utilities',
  name: '설비/기능',
  type: 'multiple',
  items: [
    {
      id: 'iot-package',
      name: 'IOT 패키지',
      price: 3000000,
      imagePath: '/images/customize/utilities/iot-package.webp',
      overlayImagePath: '/images/customize/overlays/utilities-iot-package.png',
    },
    {
      id: 'ev-charger',
      name: '전기차 충전기',
      price: 2500000,
      imagePath: '/images/customize/utilities/ev-charger.webp',
      overlayImagePath: '/images/customize/overlays/utilities-ev-charger.png',
    },
  ],
};

// ==================== 전체 옵션 카테고리 배열 ====================

export const allOptionCategories: OptionCategory[] = [
  exteriorFinishes,
  flooring,
  interiorWalls,
  kitchen,
  bathroom,
  utilities,
];

// ==================== 헬퍼 함수 ====================

/**
 * 모델 ID 로 모델 정보 조회
 */
export function getModelById(id: string): Model | undefined {
  return models.find((model) => model.id === id);
}

/**
 * 옵션 카테고리 ID 로 카테고리 조회
 */
export function getOptionCategoryById(id: string): OptionCategory | undefined {
  return allOptionCategories.find((category) => category.id === id);
}

/**
 * 옵션 아이템 ID 로 항목 조회
 */
export function getOptionItemById(categoryId: string, itemId: string): OptionItem | undefined {
  const category = getOptionCategoryById(categoryId);
  if (!category) return undefined;
  return category.items.find((item) => item.id === itemId);
}

/**
 * 총 가격 계산
 * @param baseModel - 선택된 모델
 * @param selectedOptions - 선택된 옵션 아이템 ID 목록
 */
export function calculateTotalPrice(
  baseModel: Model,
  selectedOptions: OptionItem[]
): number {
  const optionsTotal = selectedOptions.reduce((sum, item) => sum + item.price, 0);
  return baseModel.basePrice + optionsTotal;
}

/**
 * 가격을 천 단위 구분 기호로 포맷팅
 */
export function formatPrice(price: number): string {
  return price.toLocaleString('ko-KR');
}

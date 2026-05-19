import { describe, it, expect } from 'vitest';
import { calculateTotalPrice, formatPrice } from '../priceCalculator';
import { Model, OptionItem } from '../config';

describe('priceCalculator', () => {
  // 테스트용 모델 데이터
  const sModel: Model = {
    id: 'S',
    name: 'S',
    size: '3x6m',
    area: 18,
    basePrice: 50000000,
    imagePath: '/images/customize/models/s-model.webp',
  };

  const mModel: Model = {
    id: 'M',
    name: 'M',
    size: '3x9m',
    area: 27,
    basePrice: 70000000,
    imagePath: '/images/customize/models/m-model.webp',
  };

  // 테스트용 옵션 데이터
  const cedarOption: OptionItem = {
    id: 'wood-cedar',
    name: '적삼목',
    price: 15000000,
    imagePath: '/images/customize/exterior/wood-cedar.webp',
  };

  const silkWallpaperOption: OptionItem = {
    id: 'wallpaper-silk',
    name: '실크벽지',
    price: 5000000,
    imagePath: '/images/customize/interior/wallpaper-silk.webp',
  };

  const refrigeratorOption: OptionItem = {
    id: 'refrigerator',
    name: '냉장고',
    price: 1200000,
    imagePath: '/images/customize/kitchen/refrigerator.webp',
  };

  describe('calculateTotalPrice', () => {
    it('기본가만 계산 (옵션 없음)', () => {
      const total = calculateTotalPrice(sModel, []);
      expect(total).toBe(50000000);
    });

    it('단일 옵션 추가', () => {
      const total = calculateTotalPrice(sModel, [cedarOption]);
      expect(total).toBe(65000000); // 50,000,000 + 15,000,000
    });

    it('다중 옵션 추가', () => {
      const total = calculateTotalPrice(sModel, [
        cedarOption,
        silkWallpaperOption,
      ]);
      expect(total).toBe(70000000); // 50,000,000 + 15,000,000 + 5,000,000
    });

    it('모든 옵션 선택 시 총합', () => {
      const total = calculateTotalPrice(sModel, [
        cedarOption,
        silkWallpaperOption,
        refrigeratorOption,
      ]);
      expect(total).toBe(71200000); // 50,000,000 + 15,000,000 + 5,000,000 + 1,200,000
    });

    it('다른 모델에서도 정확한 계산', () => {
      const total = calculateTotalPrice(mModel, [cedarOption]);
      expect(total).toBe(85000000); // 70,000,000 + 15,000,000
    });
  });

  describe('formatPrice', () => {
    it('가격 0 일 때 "₩0" 반환', () => {
      expect(formatPrice(0)).toBe('₩0');
    });

    it('일반 가격 포맷팅 (천 단위 구분)', () => {
      expect(formatPrice(50000000)).toBe('₩50,000,000');
    });

    it('1 억 이상 가격 포맷팅', () => {
      expect(formatPrice(100000000)).toBe('₩100,000,000');
    });

    it('천 단위 미만 가격 포맷팅', () => {
      expect(formatPrice(1200000)).toBe('₩1,200,000');
    });

    it('홀수 금액 포맷팅', () => {
      expect(formatPrice(71200000)).toBe('₩71,200,000');
    });
  });
});

import { describe, it, expect } from 'vitest';
import {
  SizeCategory,
  PurposeCategory,
  PURPOSE_TO_SIZE_MAP,
  PURPOSE_LABELS,
  SIZE_LABELS,
} from '@/lib/types';

describe('types', () => {
  describe('PURPOSE_TO_SIZE_MAP', () => {
    it('should map FARMHOUSE_SHELTER to S and M sizes', () => {
      expect(PURPOSE_TO_SIZE_MAP.FARMHOUSE_SHELTER).toEqual(['S', 'M']);
    });

    it('should map SECOND_HOUSE to M and L sizes', () => {
      expect(PURPOSE_TO_SIZE_MAP.SECOND_HOUSE).toEqual(['M', 'L']);
    });

    it('should map PRIMARY_HOME to L and XL sizes', () => {
      expect(PURPOSE_TO_SIZE_MAP.PRIMARY_HOME).toEqual(['L', 'XL']);
    });

    it('should have 3 purpose categories mapped', () => {
      expect(Object.keys(PURPOSE_TO_SIZE_MAP)).toHaveLength(3);
    });

    it('should only contain valid SizeCategory values', () => {
      const validSizes: SizeCategory[] = ['S', 'M', 'L', 'XL'];
      Object.values(PURPOSE_TO_SIZE_MAP).forEach((sizes) => {
        sizes.forEach((size) => {
          expect(validSizes).toContain(size);
        });
      });
    });

    it('should not include COMMERCIAL in PURPOSE_TO_SIZE_MAP', () => {
      expect(PURPOSE_TO_SIZE_MAP).not.toHaveProperty('COMMERCIAL');
    });
  });

  describe('PURPOSE_LABELS', () => {
    it('should have label for FARMHOUSE_SHELTER', () => {
      expect(PURPOSE_LABELS.FARMHOUSE_SHELTER).toBe('농막·체류형 쉼터');
    });

    it('should have label for SECOND_HOUSE', () => {
      expect(PURPOSE_LABELS.SECOND_HOUSE).toBe('세컨하우스·주말주택');
    });

    it('should have label for PRIMARY_HOME', () => {
      expect(PURPOSE_LABELS.PRIMARY_HOME).toBe('본 주거·단독주택');
    });

    it('should have label for COMMERCIAL', () => {
      expect(PURPOSE_LABELS.COMMERCIAL).toBe('상업·사무 공간');
    });

    it('should have 4 purpose labels', () => {
      expect(Object.keys(PURPOSE_LABELS)).toHaveLength(4);
    });

    it('should have non-empty labels', () => {
      Object.values(PURPOSE_LABELS).forEach((label) => {
        expect(label.length).toBeGreaterThan(0);
      });
    });

    it('should have all labels as strings', () => {
      Object.values(PURPOSE_LABELS).forEach((label) => {
        expect(typeof label).toBe('string');
      });
    });
  });

  describe('SIZE_LABELS', () => {
    it('should have label for S size', () => {
      expect(SIZE_LABELS.S.label).toBe('S');
      expect(SIZE_LABELS.S.range).toBe('9~16㎡');
      expect(SIZE_LABELS.S.use).toBe('농막, 쉼터, 1인 공간');
    });

    it('should have label for M size', () => {
      expect(SIZE_LABELS.M.label).toBe('M');
      expect(SIZE_LABELS.M.range).toBe('17~33㎡');
      expect(SIZE_LABELS.M.use).toBe('세컨하우스, 주말주택');
    });

    it('should have label for L size', () => {
      expect(SIZE_LABELS.L.label).toBe('L');
      expect(SIZE_LABELS.L.range).toBe('34~66㎡');
      expect(SIZE_LABELS.L.use).toBe('단독주택, 소형 주거');
    });

    it('should have label for XL size', () => {
      expect(SIZE_LABELS.XL.label).toBe('XL');
      expect(SIZE_LABELS.XL.range).toBe('67㎡~');
      expect(SIZE_LABELS.XL.use).toBe('대형 주거, 복층');
    });

    it('should have 4 size labels', () => {
      expect(Object.keys(SIZE_LABELS)).toHaveLength(4);
    });

    it('should have all sizes with label, range, and use properties', () => {
      Object.values(SIZE_LABELS).forEach((sizeLabel) => {
        expect(sizeLabel).toHaveProperty('label');
        expect(sizeLabel).toHaveProperty('range');
        expect(sizeLabel).toHaveProperty('use');
      });
    });

    it('should have non-empty label, range, and use values', () => {
      Object.values(SIZE_LABELS).forEach((sizeLabel) => {
        expect(sizeLabel.label.length).toBeGreaterThan(0);
        expect(sizeLabel.range.length).toBeGreaterThan(0);
        expect(sizeLabel.use.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Type consistency', () => {
    it('PURPOSE_TO_SIZE_MAP should only contain valid size categories', () => {
      const validSizes: SizeCategory[] = ['S', 'M', 'L', 'XL'];
      Object.values(PURPOSE_TO_SIZE_MAP).forEach((sizes) => {
        sizes.forEach((size) => {
          expect(validSizes).toContain(size);
        });
      });
    });

    it('SIZE_LABELS should have entries for all sizes in PURPOSE_TO_SIZE_MAP values', () => {
      const allSizes = new Set<SizeCategory>();
      Object.values(PURPOSE_TO_SIZE_MAP).forEach((sizes) => {
        sizes.forEach((size) => {
          allSizes.add(size);
        });
      });

      allSizes.forEach((size) => {
        expect(SIZE_LABELS).toHaveProperty(size);
      });
    });
  });
});

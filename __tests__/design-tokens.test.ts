import { describe, it, expect } from 'vitest';
import { COLORS, TYPOGRAPHY, SPACING, Z_INDEX } from '@/lib/design-tokens';

describe('design-tokens', () => {
  describe('COLORS', () => {
    it('should have accent color with hex #FFCA0D', () => {
      expect(COLORS.accent.hex).toBe('#FFCA0D');
    });

    it('should have accent color with correct hsl value', () => {
      expect(COLORS.accent.hsl).toBe('46 100% 52.5%');
    });

    it('should have primary color with hex #2D2D2A', () => {
      expect(COLORS.primary.hex).toBe('#2D2D2A');
    });

    it('should have primary color with correct hsl value', () => {
      expect(COLORS.primary.hsl).toBe('60 5.3% 17.1%');
    });

    it('should have background color with hex #FAFAFA', () => {
      expect(COLORS.background.hex).toBe('#FAFAFA');
    });

    it('should have background color with correct hsl value', () => {
      expect(COLORS.background.hsl).toBe('0 0% 98%');
    });

    it('should have all color objects with hex and hsl properties', () => {
      Object.values(COLORS).forEach((color) => {
        expect(color).toHaveProperty('hex');
        expect(color).toHaveProperty('hsl');
        expect(typeof color.hex).toBe('string');
        expect(typeof color.hsl).toBe('string');
      });
    });
  });

  describe('TYPOGRAPHY', () => {
    it('should have display typography class', () => {
      expect(TYPOGRAPHY.display).toBeDefined();
      expect(typeof TYPOGRAPHY.display).toBe('string');
    });

    it('should have h1 typography class', () => {
      expect(TYPOGRAPHY.h1).toBeDefined();
      expect(typeof TYPOGRAPHY.h1).toBe('string');
    });

    it('should have h2 typography class', () => {
      expect(TYPOGRAPHY.h2).toBeDefined();
      expect(typeof TYPOGRAPHY.h2).toBe('string');
    });

    it('should have h3 typography class', () => {
      expect(TYPOGRAPHY.h3).toBeDefined();
      expect(typeof TYPOGRAPHY.h3).toBe('string');
    });

    it('should have bodyLg typography class', () => {
      expect(TYPOGRAPHY.bodyLg).toBeDefined();
      expect(typeof TYPOGRAPHY.bodyLg).toBe('string');
    });

    it('should have caption typography class', () => {
      expect(TYPOGRAPHY.caption).toBeDefined();
      expect(typeof TYPOGRAPHY.caption).toBe('string');
    });

    it('should have all expected typography keys', () => {
      const expectedKeys = ['display', 'h1', 'h2', 'h3', 'bodyLg', 'caption'];
      expectedKeys.forEach((key) => {
        expect(TYPOGRAPHY).toHaveProperty(key);
      });
    });
  });

  describe('SPACING', () => {
    it('should have sectionPaddingY spacing class', () => {
      expect(SPACING.sectionPaddingY).toBeDefined();
      expect(typeof SPACING.sectionPaddingY).toBe('string');
    });

    it('should have containerMaxWidth spacing class', () => {
      expect(SPACING.containerMaxWidth).toBeDefined();
      expect(typeof SPACING.containerMaxWidth).toBe('string');
    });

    it('should have cardGap spacing class', () => {
      expect(SPACING.cardGap).toBeDefined();
      expect(typeof SPACING.cardGap).toBe('string');
    });

    it('should have all expected spacing keys', () => {
      const expectedKeys = ['sectionPaddingY', 'containerMaxWidth', 'cardGap'];
      expectedKeys.forEach((key) => {
        expect(SPACING).toHaveProperty(key);
      });
    });
  });

  describe('Z_INDEX', () => {
    it('should have header z-index as number', () => {
      expect(typeof Z_INDEX.header).toBe('number');
      expect(Z_INDEX.header).toBe(50);
    });

    it('should have overlay z-index as number', () => {
      expect(typeof Z_INDEX.overlay).toBe('number');
      expect(Z_INDEX.overlay).toBe(150);
    });

    it('should have modal z-index as number', () => {
      expect(typeof Z_INDEX.modal).toBe('number');
      expect(Z_INDEX.modal).toBe(100);
    });

    it('should have toast z-index as number', () => {
      expect(typeof Z_INDEX.toast).toBe('number');
      expect(Z_INDEX.toast).toBe(200);
    });

    it('should have floatingBtn z-index as number', () => {
      expect(typeof Z_INDEX.floatingBtn).toBe('number');
      expect(Z_INDEX.floatingBtn).toBe(40);
    });

    it('should have all z-index values as numbers', () => {
      Object.values(Z_INDEX).forEach((value) => {
        expect(typeof value).toBe('number');
      });
    });

    it('should have toast with highest z-index', () => {
      const values = Object.values(Z_INDEX);
      const maxValue = Math.max(...values);
      expect(Z_INDEX.toast).toBe(maxValue);
    });
  });
});

import { describe, it, expect } from 'vitest';
import { V2_NAV_ITEMS } from '@/lib/navigation';

describe('navigation', () => {
  describe('V2_NAV_ITEMS', () => {
    it('should have 8 navigation items', () => {
      expect(V2_NAV_ITEMS).toHaveLength(8);
    });

    it('should have items with label and href properties', () => {
      V2_NAV_ITEMS.forEach((item) => {
        expect(item).toHaveProperty('label');
        expect(item).toHaveProperty('href');
        expect(typeof item.label).toBe('string');
        expect(typeof item.href).toBe('string');
      });
    });

    it('should have items with description property', () => {
      V2_NAV_ITEMS.forEach((item) => {
        expect(item).toHaveProperty('description');
        expect(typeof item.description).toBe('string');
      });
    });

    it('should have all hrefs starting with /', () => {
      V2_NAV_ITEMS.forEach((item) => {
        expect(item.href).toMatch(/^\//);
      });
    });

    it('should not have duplicate hrefs', () => {
      const hrefs = V2_NAV_ITEMS.map((item) => item.href);
      const uniqueHrefs = new Set(hrefs);
      expect(uniqueHrefs.size).toBe(hrefs.length);
    });

    it('should have correct navigation items in order', () => {
      expect(V2_NAV_ITEMS[0].label).toBe('홈');
      expect(V2_NAV_ITEMS[1].label).toBe('시스템건축');
      expect(V2_NAV_ITEMS[2].label).toBe('제품');
      expect(V2_NAV_ITEMS[3].label).toBe('시공사례');
      expect(V2_NAV_ITEMS[4].label).toBe('비스포크');
      expect(V2_NAV_ITEMS[5].label).toBe('솔루션');
      expect(V2_NAV_ITEMS[6].label).toBe('회사소개');
      expect(V2_NAV_ITEMS[7].label).toBe('고객지원');
    });

    it('should have correct hrefs for each navigation item', () => {
      expect(V2_NAV_ITEMS[0].href).toBe('/home');
      expect(V2_NAV_ITEMS[1].href).toBe('/system');
      expect(V2_NAV_ITEMS[2].href).toBe('/products-v2');
      expect(V2_NAV_ITEMS[3].href).toBe('/projects-v2');
      expect(V2_NAV_ITEMS[4].href).toBe('/bespoke-v2');
      expect(V2_NAV_ITEMS[5].href).toBe('/solutions');
      expect(V2_NAV_ITEMS[6].href).toBe('/company-v2');
      expect(V2_NAV_ITEMS[7].href).toBe('/support-v2');
    });

    it('should have non-empty labels', () => {
      V2_NAV_ITEMS.forEach((item) => {
        expect(item.label.length).toBeGreaterThan(0);
      });
    });

    it('should have non-empty descriptions', () => {
      V2_NAV_ITEMS.forEach((item) => {
        expect(item.description).toBeDefined();
        expect(item.description!.length).toBeGreaterThan(0);
      });
    });
  });
});

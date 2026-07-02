import { describe, expect, it } from 'vitest';
import { sanitizeConfig } from '../priceCalculator';
import type { CustomizeCatalog } from '../types';

// 최소 픽스처: 모델 2(m1 활성, mX 비활성), 카테고리 single(c1)·multi(c2),
// 옵션 a(c1, default)·b(c1)·d(c2, default)·e(c2), 충돌 d↔e
const catalog: CustomizeCatalog = {
  models: [
    { id: 'm1', code: 'm1', nameKo: '모델1', nameEn: null, widthM: 3, lengthM: 6, areaSqm: 18, basePrice: 1000, floorplanImagePath: null, floorplanOverlayPath: null, displayOrder: 1, isActive: true },
    { id: 'mX', code: 'mX', nameKo: '비활성', nameEn: null, widthM: 3, lengthM: 9, areaSqm: 27, basePrice: 2000, floorplanImagePath: null, floorplanOverlayPath: null, displayOrder: 2, isActive: false },
  ],
  categories: [
    { id: 'c1', key: 'door', nameKo: '도어', nameEn: null, descriptionKo: null, descriptionEn: null, selectionType: 'single', required: true, displayOrder: 1, isActive: true },
    { id: 'c2', key: 'connectivity', nameKo: '통신', nameEn: null, descriptionKo: null, descriptionEn: null, selectionType: 'multiple', required: false, displayOrder: 2, isActive: true },
  ],
  options: [
    { id: 'a', key: 'a', categoryId: 'c1', categoryKey: 'door', nameKo: 'a', nameEn: null, shortDescriptionKo: 'a', shortDescriptionEn: null, detailDescriptionKo: null, detailDescriptionEn: null, priceType: 'included', price: 0, isDefault: true, availableModelIds: [], imagePath: null, overlayImagePath: null, overlayLabelKo: null, overlayLabelEn: null, displayOrder: 1, isActive: true },
    { id: 'b', key: 'b', categoryId: 'c1', categoryKey: 'door', nameKo: 'b', nameEn: null, shortDescriptionKo: 'b', shortDescriptionEn: null, detailDescriptionKo: null, detailDescriptionEn: null, priceType: 'fixed', price: 100, isDefault: false, availableModelIds: [], imagePath: null, overlayImagePath: null, overlayLabelKo: null, overlayLabelEn: null, displayOrder: 2, isActive: true },
    { id: 'd', key: 'd', categoryId: 'c2', categoryKey: 'connectivity', nameKo: 'd', nameEn: null, shortDescriptionKo: 'd', shortDescriptionEn: null, detailDescriptionKo: null, detailDescriptionEn: null, priceType: 'fixed', price: 50, isDefault: true, availableModelIds: [], imagePath: null, overlayImagePath: null, overlayLabelKo: null, overlayLabelEn: null, displayOrder: 3, isActive: true },
    { id: 'e', key: 'e', categoryId: 'c2', categoryKey: 'connectivity', nameKo: 'e', nameEn: null, shortDescriptionKo: 'e', shortDescriptionEn: null, detailDescriptionKo: null, detailDescriptionEn: null, priceType: 'consult', price: 0, isDefault: false, availableModelIds: [], imagePath: null, overlayImagePath: null, overlayLabelKo: null, overlayLabelEn: null, displayOrder: 4, isActive: true },
  ],
  includedSpecs: [],
  conflicts: [{ optionId: 'e', conflictsWithOptionId: 'd', reasonKo: null, reasonEn: null }],
};

describe('sanitizeConfig', () => {
  it('없는 옵션 id를 제거한다', () => {
    const out = sanitizeConfig(catalog, 'm1', { c1: ['a', 'ghost'] });
    expect(out.selections.c1).toEqual(['a']);
  });
  it('옵션을 실제 categoryId 키로 재매핑한다 (유령 키 제거)', () => {
    const out = sanitizeConfig(catalog, 'm1', { oldCat: ['a'] });
    expect(out.selections.c1).toEqual(['a']);
    expect(out.selections.oldCat).toBeUndefined();
  });
  it('single 카테고리는 첫 항목만 유지한다', () => {
    const out = sanitizeConfig(catalog, 'm1', { c1: ['a', 'b'] });
    expect(out.selections.c1).toEqual(['a']);
  });
  it('충돌 쌍은 기본 옵션(d)을 제거하고 비기본(e)을 남긴다', () => {
    const out = sanitizeConfig(catalog, 'm1', { c1: ['a'], c2: ['d', 'e'] });
    expect(out.selections.c2).toEqual(['e']);
  });
  it('비활성/부재 modelId는 첫 활성 모델 + 기본 선택으로 폴백한다', () => {
    const out = sanitizeConfig(catalog, 'mX', { c1: ['b'] });
    expect(out.modelId).toBe('m1');
    expect(out.selections.c1).toEqual(['a']); // getDefaultSelections 결과
  });
});

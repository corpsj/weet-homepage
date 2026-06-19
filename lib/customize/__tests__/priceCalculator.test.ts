import { describe, expect, it } from 'vitest';
import {
  calculateEstimate,
  decodeConfig,
  encodeConfig,
  formatOptionPrice,
  formatWon,
  getDefaultSelections,
  toggleOptionSelection,
} from '../priceCalculator';
import type { CustomizeCatalog } from '../types';

const catalog: CustomizeCatalog = {
  models: [
    {
      id: 'compact-3x6',
      code: '3x6',
      nameKo: 'Compact 3x6',
      nameEn: null,
      widthM: 3,
      lengthM: 6,
      areaSqm: 18,
      basePrice: 27900000,
      floorplanImagePath: null,
      floorplanOverlayPath: null,
      displayOrder: 10,
      isActive: true,
    },
  ],
  categories: [
    {
      id: 'cat-exterior',
      key: 'exterior',
      nameKo: '외장',
      nameEn: null,
      descriptionKo: null,
      descriptionEn: null,
      selectionType: 'single',
      required: true,
      displayOrder: 10,
      isActive: true,
    },
    {
      id: 'cat-energy',
      key: 'energy',
      nameKo: '에너지',
      nameEn: null,
      descriptionKo: null,
      descriptionEn: null,
      selectionType: 'multiple',
      required: false,
      displayOrder: 20,
      isActive: true,
    },
  ],
  options: [
    {
      id: '00000000-0000-0000-0000-000000000001',
      categoryId: 'cat-exterior',
      categoryKey: 'exterior',
      key: 'basic',
      nameKo: '기본 외장',
      nameEn: null,
      shortDescriptionKo: '기본',
      shortDescriptionEn: null,
      detailDescriptionKo: null,
      detailDescriptionEn: null,
      priceType: 'included',
      price: 0,
      isDefault: true,
      availableModelIds: ['compact-3x6'],
      imagePath: null,
      overlayImagePath: null,
      overlayLabelKo: null,
      overlayLabelEn: null,
      displayOrder: 10,
      isActive: true,
    },
    {
      id: '00000000-0000-0000-0000-000000000002',
      categoryId: 'cat-exterior',
      categoryKey: 'exterior',
      key: 'cedar',
      nameKo: '적삼목',
      nameEn: null,
      shortDescriptionKo: '목재',
      shortDescriptionEn: null,
      detailDescriptionKo: null,
      detailDescriptionEn: null,
      priceType: 'fixed',
      price: 2200000,
      isDefault: false,
      availableModelIds: ['compact-3x6'],
      imagePath: null,
      overlayImagePath: null,
      overlayLabelKo: null,
      overlayLabelEn: null,
      displayOrder: 20,
      isActive: true,
    },
    {
      id: '00000000-0000-0000-0000-000000000003',
      categoryId: 'cat-energy',
      categoryKey: 'energy',
      key: 'solar',
      nameKo: '태양광',
      nameEn: null,
      shortDescriptionKo: '상담',
      shortDescriptionEn: null,
      detailDescriptionKo: null,
      detailDescriptionEn: null,
      priceType: 'consult',
      price: 0,
      isDefault: false,
      availableModelIds: ['compact-3x6'],
      imagePath: null,
      overlayImagePath: null,
      overlayLabelKo: null,
      overlayLabelEn: null,
      displayOrder: 10,
      isActive: true,
    },
  ],
  includedSpecs: [],
  conflicts: [
    {
      optionId: '00000000-0000-0000-0000-000000000002',
      conflictsWithOptionId: '00000000-0000-0000-0000-000000000003',
      reasonKo: null,
      reasonEn: null,
    },
  ],
};

describe('customize price calculator', () => {
  it('formats won values and option price labels', () => {
    expect(formatWon(27900000)).toBe('27,900,000원');
    expect(formatOptionPrice(catalog.options[0])).toBe('포함');
    expect(formatOptionPrice(catalog.options[1])).toBe('2,200,000원');
    expect(formatOptionPrice(catalog.options[2])).toBe('협의');
  });

  it('builds default selections and calculates consult options as 0', () => {
    const defaults = getDefaultSelections(catalog, 'compact-3x6');
    const selected = {
      ...defaults,
      'cat-energy': ['00000000-0000-0000-0000-000000000003'],
    };
    const estimate = calculateEstimate(catalog, 'compact-3x6', selected);

    expect(estimate?.estimatedTotal).toBe(27900000);
    expect(estimate?.consultOptionCount).toBe(1);
  });

  it('replaces single category selections and removes conflicting options', () => {
    const selected = {
      'cat-exterior': ['00000000-0000-0000-0000-000000000001'],
      'cat-energy': ['00000000-0000-0000-0000-000000000003'],
    };
    const next = toggleOptionSelection({
      catalog,
      selectedOptions: selected,
      category: catalog.categories[0],
      option: catalog.options[1],
    });

    expect(next['cat-exterior']).toEqual(['00000000-0000-0000-0000-000000000002']);
    expect(next['cat-energy']).toEqual([]);
  });

  it('round-trips compressed share config', () => {
    const selected = { 'cat-exterior': ['00000000-0000-0000-0000-000000000001'] };
    const encoded = encodeConfig('compact-3x6', selected);
    const decoded = decodeConfig(encoded);

    expect(decoded?.modelId).toBe('compact-3x6');
    expect(decoded?.selectedOptions).toEqual(selected);
  });
});

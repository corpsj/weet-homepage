import { describe, expect, it } from 'vitest';
import { modelConfigurePath, modelForProductName } from '@/lib/model-pages';
import { decodeConfig, sanitizeConfig } from '@/lib/customize/priceCalculator';
import type { CustomizeCatalog, CustomizeModel } from '@/lib/customize/types';

const models: CustomizeModel[] = [6, 9].map((length) => ({
  id: `model-3x${length}`, code: `3x${length}`, nameKo: `Model 3x${length}`, nameEn: null,
  widthM: 3, lengthM: length, areaSqm: 3 * length, basePrice: length * 1000000,
  floorplanImagePath: null, floorplanOverlayPath: null, displayOrder: length, isActive: true,
}));
const catalog: CustomizeCatalog = {
  models,
  categories: [{ id: 'finish', key: 'finish', nameKo: '마감', nameEn: null, descriptionKo: null, descriptionEn: null, selectionType: 'single', required: true, displayOrder: 0, isActive: true }],
  options: models.map((model) => ({
    id: `finish-${model.id}`, categoryId: 'finish', categoryKey: 'finish', key: model.id,
    nameKo: '기본 마감', nameEn: null, shortDescriptionKo: '', shortDescriptionEn: null,
    detailDescriptionKo: null, detailDescriptionEn: null, priceType: 'included', price: 0,
    isDefault: true, availableModelIds: [model.id], imagePath: null, overlayImagePath: null,
    overlayLabelKo: null, overlayLabelEn: null, displayOrder: 0, isActive: true,
  })),
  includedSpecs: [], conflicts: [],
};

describe('legacy product to preserved configurator handoff', () => {
  it.each([[6, '위트 3x6'], [9, '위트 3 × 9']] as const)('keeps the %s m model and its own default option through URL decoding', (length, name) => {
    const model = modelForProductName(models, name)!;
    const url = new URL(modelConfigurePath(catalog, model), 'https://www.we-et.com');
    const shared = decodeConfig(url.searchParams.get('c'))!;
    const selected = sanitizeConfig(catalog, shared.modelId, shared.selectedOptions);
    expect(url.pathname).toBe('/customize');
    expect(selected).toEqual({ modelId: `model-3x${length}`, selections: { finish: [`finish-model-3x${length}`] } });
  });

  it.each(['위트 3x60', '위트 13x6', '맞춤 카페'])('does not guess a model for %s', (name) => {
    expect(modelForProductName(models, name)).toBeNull();
  });

  it('does not link to an inactive model or choose between ambiguous variants', () => {
    expect(modelForProductName(models.map((model) => ({ ...model, isActive: false })), '3x9')).toBeNull();
    expect(modelForProductName([...models, { ...models[1], id: 'another-3x9' }], '3x9')).toBeNull();
  });
});

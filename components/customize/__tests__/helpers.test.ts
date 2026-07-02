import { describe, expect, it } from 'vitest';
import { buildQuoteHtml, optionPriceDisplay } from '../lib/helpers';
import type { CustomizeModel, CustomizeOption, EstimateBreakdown } from '@/lib/customize/types';

const model: CustomizeModel = { id: 'm1', code: 'm1', nameKo: '모델', nameEn: null, widthM: 3, lengthM: 6, areaSqm: 18, basePrice: 27900000, floorplanImagePath: null, floorplanOverlayPath: null, displayOrder: 1, isActive: true };
const opt = (over: Partial<CustomizeOption>): CustomizeOption => ({ id: 'o1', categoryId: 'c1', categoryKey: 'door', key: 'o1', nameKo: '옵션', nameEn: null, shortDescriptionKo: '', shortDescriptionEn: null, detailDescriptionKo: null, detailDescriptionEn: null, priceType: 'fixed', price: 2200000, isDefault: false, availableModelIds: [], imagePath: null, overlayImagePath: null, overlayLabelKo: null, overlayLabelEn: null, displayOrder: 1, isActive: true, ...over });

describe('optionPriceDisplay (실사용 라벨)', () => {
  it('included → 기본 포함', () => expect(optionPriceDisplay(opt({ priceType: 'included', price: 0 }))).toBe('기본 포함'));
  it('consult → 상담 필요', () => expect(optionPriceDisplay(opt({ priceType: 'consult', price: 0 }))).toBe('상담 필요'));
  it('fixed → +₩2,200,000', () => expect(optionPriceDisplay(opt({}))).toBe('+₩2,200,000'));
});

describe('buildQuoteHtml', () => {
  it('기본가+옵션합계=총액이 문서에 표기된다', () => {
    const estimate: EstimateBreakdown = { model, selectedOptions: [opt({})], optionTotal: 2200000, estimatedTotal: 30100000, consultOptionCount: 0 };
    const html = buildQuoteHtml(estimate, [opt({})], 'KO');
    expect(html).toContain('₩27,900,000');
    expect(html).toContain('+₩2,200,000');
    expect(html).toContain('₩30,100,000');
  });
});

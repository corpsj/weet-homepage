import type { CustomizeCatalog, CustomizeModel } from '@/lib/customize/types';
import { encodeConfig, getDefaultSelections } from '@/lib/customize/priceCalculator';
import { absoluteUrl, BRAND } from '@/lib/site';

export const COST_GUIDE_PATH = '/guides/mobile-home-cost';
export const COST_GUIDE_UPDATED = '2026-09-22';

export function modelPath(model: Pick<CustomizeModel, 'id'>) {
  return `/products/${encodeURIComponent(model.id)}`;
}

export function modelConfigurePath(catalog: CustomizeCatalog, model: CustomizeModel) {
  return `/customize?c=${encodeConfig(model.id, getDefaultSelections(catalog, model.id))}`;
}

// The legacy product library has no catalog foreign key. Link a named footprint
// only when it identifies one active model; never guess between variants.
export function modelForProductName(models: CustomizeModel[], name: string) {
  const footprint = name.match(/(?:^|[^\d.])(\d+(?:\.\d+)?)\s*[x×]\s*(\d+(?:\.\d+)?)(?![\d.])/i);
  if (!footprint) return null;
  const matches = models.filter((model) => model.isActive && model.widthM === Number(footprint[1]) && model.lengthM === Number(footprint[2]));
  return matches.length === 1 ? matches[0] : null;
}

export function modelSummary(model: CustomizeModel) {
  return `위트 ${model.nameKo}는 ${model.widthM}m × ${model.lengthM}m, ${model.areaSqm}㎡ 이동식주택입니다. 기본 제품가는 ${model.basePrice.toLocaleString('ko-KR')}원이며, 유상 옵션과 운반·설치·현장 공사 비용은 별도입니다.`;
}

export function modelStructuredData(model: CustomizeModel) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${absoluteUrl(modelPath(model))}#product`,
    name: `위트 ${model.nameKo}`,
    model: model.code,
    description: modelSummary(model),
    url: absoluteUrl(modelPath(model)),
    brand: { '@type': 'Brand', name: BRAND.name },
    manufacturer: { '@id': `${absoluteUrl('/')}#organization` },
    additionalProperty: [
      { '@type': 'PropertyValue', name: '폭', value: model.widthM, unitText: 'm' },
      { '@type': 'PropertyValue', name: '길이', value: model.lengthM, unitText: 'm' },
      { '@type': 'PropertyValue', name: '면적', value: model.areaSqm, unitText: '㎡' },
      { '@type': 'PropertyValue', name: '기본 제품가', value: model.basePrice, unitText: 'KRW' },
    ],
    // These are made-to-order consultation models. A base price is not an
    // in-stock, immediately purchasable offer; do not invent offer eligibility.
  };
}

export function breadcrumbData(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem', position: index + 1, name: item.name, item: absoluteUrl(item.path),
    })),
  };
}

import CustomizeConfigurator from '@/components/customize/CustomizeConfigurator';
import { getPublicCustomizeCatalog } from '@/app/actions/customize-actions';
import { getSiteSettings } from '@/lib/site-settings.server';
import { buildPageMetadata } from '@/lib/seo';
import { jsonLdHtml } from '@/lib/json-ld';

export const metadata = buildPageMetadata({
  title: '이동식주택 맞춤 구성·예상 견적',
  description:
    '위트 이동식주택을 모델, 공간, 소재, 스마트 옵션별로 직접 구성하고 예상 견적을 즉시 확인하세요. 구성 그대로 상담·견적 요청까지 이어집니다.',
  path: '/customize',
});

export default async function CustomizePage({
  searchParams,
}: {
  searchParams: Promise<{ c?: string }>;
}) {
  const [{ c }, catalog, settings] = await Promise.all([
    searchParams,
    getPublicCustomizeCatalog(),
    getSiteSettings(),
  ]);

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: catalog.models
      .filter((model) => model.isActive !== false)
      .map((model, index) => ({
        '@type': 'Product',
        position: index + 1,
        name: `위트 이동식주택 ${model.nameKo}`,
        description: `${model.widthM}m × ${model.lengthM}m, ${model.areaSqm}㎡ 이동식주택 (운반·설치 별도)`,
        brand: { '@type': 'Brand', name: '위트(weet)' },
        offers: {
          '@type': 'Offer',
          price: model.basePrice,
          priceCurrency: 'KRW',
          availability: 'https://schema.org/InStock',
          url: 'https://www.we-et.com/customize',
        },
      })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdHtml(productJsonLd) }} />
      <CustomizeConfigurator catalog={catalog} initialConfig={c ?? null} contactPhone={settings.contact_phone} />
    </>
  );
}

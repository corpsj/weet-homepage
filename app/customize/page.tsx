import type { Metadata } from 'next';
import CustomizeConfigurator from '@/components/customize/CustomizeConfigurator';
import { getPublicCustomizeCatalog } from '@/app/actions/customize-actions';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: '주문하기',
  description: '위트 이동식주택을 모델, 공간, 소재, 스마트 옵션별로 구성하고 주문 요청을 남겨보세요.',
  alternates: {
    canonical: '/customize',
  },
  openGraph: {
    url: '/customize',
    title: '주문하기',
    description: '위트 이동식주택을 모델, 공간, 소재, 스마트 옵션별로 구성하고 주문 요청을 남겨보세요.',
  },
};

export default async function CustomizePage({
  searchParams,
}: {
  searchParams: Promise<{ c?: string }>;
}) {
  const [{ c }, catalog] = await Promise.all([searchParams, getPublicCustomizeCatalog()]);

  return <CustomizeConfigurator catalog={catalog} initialConfig={c ?? null} />;
}

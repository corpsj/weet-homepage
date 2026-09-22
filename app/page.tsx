import HeroCarousel from '@/components/sections/HeroCarousel';
import PartnersBanner from '@/components/sections/PartnersBanner';
import SignatureLine from '@/components/sections/SignatureLine';
import GallerySection from '@/components/company/GallerySection';
import ModelLinks from '@/components/products/ModelLinks';
import { getPublicCustomizeCatalog } from '@/app/actions/customize-actions';
import { buildPageMetadata } from '@/lib/seo';

export const revalidate = 300;
export const metadata = {
  ...buildPageMetadata({ title: '이동식주택·모듈러 건축', description: '전남 함평에서 이동식주택과 모듈러 공간을 제작하는 위트(weet). 제품 사진과 규격, 기본 가격을 확인하고 모델·옵션을 직접 구성해 보세요.', path: '/' }),
  title: '위트(weet) | 이동식주택·모듈러 건축',
};

export default async function HomePage() {
  const catalog = await getPublicCustomizeCatalog();
  return (
    <div className="bg-white text-black">
      <h1 className="sr-only">위트(weet) 이동식주택·모듈러 건축</h1>
      <HeroCarousel />
      <PartnersBanner />
      <SignatureLine />
      <ModelLinks models={catalog.models} />
      <GallerySection />
    </div>
  );
}

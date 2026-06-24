import { getPublicCustomizeCatalog } from '@/app/actions/customize-actions';
import { getPublicGalleryItems } from '@/app/actions/gallery-actions';
import { getFaqs } from '@/app/actions/faq-actions';
import { getSiteSettings } from '@/lib/site-settings.server';
import { buildPageMetadata } from '@/lib/seo';
import type { Metadata } from 'next';
import HomeClient from './HomeClient';

export const revalidate = 300;

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: '이동식주택·농막·세컨하우스 제작 전문',
    description:
      '공장에서 제작해 현장에 설치하는 이동식주택 전문 위트(weet). 3x6(18㎡)·3x9(27㎡) 모델의 기본 가격을 공개하고, 운반·설치·인허가까지 투명하게 안내합니다.',
    path: '/',
  }),
  // Home is the root segment's own page, so the root title template does not
  // apply — bake the brand suffix into the document title explicitly. (og:title
  // stays unsuffixed via buildPageMetadata's openGraph.)
  title: '이동식주택·농막·세컨하우스 제작 전문 | 위트(weet)',
};

export default async function HomePage() {
  const [catalog, galleryItems, faqs, settings] = await Promise.all([
    getPublicCustomizeCatalog().catch(() => null),
    getPublicGalleryItems(6),
    getFaqs().catch(() => []),
    getSiteSettings(),
  ]);

  const models = (catalog?.models ?? []).filter((model) => model.isActive !== false).slice(0, 2);
  const hasRealGallery = galleryItems.length > 0;
  const teaserFaqs = faqs
    .filter((faq) => faq.is_active !== false && faq.question_ko && faq.answer_ko)
    .slice(0, 4);

  return (
    <HomeClient
      models={models}
      galleryItems={galleryItems}
      hasRealGallery={hasRealGallery}
      teaserFaqs={teaserFaqs}
      settings={settings}
    />
  );
}

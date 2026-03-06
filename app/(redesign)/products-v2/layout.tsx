import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '제품 소개',
  description:
    'S부터 XL까지, 나에게 딱 맞는 모듈러 하우스를 찾아보세요. 위트의 전 모델 규격·가격·도면을 한눈에.',
  alternates: { canonical: '/products-v2' },
  openGraph: {
    url: '/products-v2',
    title: '제품 소개 | 위트(weet)',
    description:
      'S/M/L/XL 규격 모듈러 하우스 전 모델 비교. 위트만의 합리적 가격과 품질을 확인하세요.',
    type: 'website',
    locale: 'ko_KR',
    siteName: 'weet:)',
  },
  twitter: {
    card: 'summary_large_image',
    title: '제품 소개 | 위트(weet)',
    description: 'S부터 XL까지, 위트 모듈러 하우스 전 모델을 만나보세요.',
  },
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

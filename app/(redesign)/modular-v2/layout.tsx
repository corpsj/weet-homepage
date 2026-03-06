import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '모듈러건축 소개',
  description:
    '공장에서 태어난 집. 모듈러 건축이란 무엇인지, 왜 빠르고 합리적인지 알아보세요.',
  alternates: { canonical: '/modular-v2' },
  openGraph: {
    url: '/modular-v2',
    title: '모듈러건축 소개 | 위트(weet)',
    description:
      '3개월이면 완성. 공장 제작 모듈러 건축의 모든 것을 알아보세요.',
    type: 'website',
    locale: 'ko_KR',
    siteName: 'weet:)',
  },
  twitter: {
    card: 'summary_large_image',
    title: '모듈러건축 소개 | 위트(weet)',
    description: '공장에서 태어난 집. 빠르고 합리적인 모듈러 건축.',
  },
};

export default function ModularLayout({ children }: { children: React.ReactNode }) {
  return children;
}

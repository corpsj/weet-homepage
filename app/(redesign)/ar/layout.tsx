import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '내 땅에 놓아보기 AR',
  description:
    'AR로 우리 집을 미리 배치해보세요. 위트 모듈러 하우스 AR 체험.',
  alternates: { canonical: '/ar' },
  openGraph: {
    url: '/ar',
    title: '내 땅에 놓아보기 AR | 위트(weet)',
    description:
      '내 땅에 모듈러 하우스를 미리 배치해보세요. 위트 WebAR 체험.',
    type: 'website',
    locale: 'ko_KR',
    siteName: 'weet:)',
  },
  twitter: {
    card: 'summary_large_image',
    title: '내 땅에 놓아보기 AR | 위트(weet)',
    description: 'AR로 모듈러 하우스를 미리 배치해보세요.',
  },
};

export default function ARLayout({ children }: { children: React.ReactNode }) {
  return children;
}

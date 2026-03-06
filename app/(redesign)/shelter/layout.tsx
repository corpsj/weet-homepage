import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '체류형 쉼터',
  description:
    '규제 완화로 더 쉬워진 체류형 쉼터. 농막부터 세컨하우스까지, 위트 모듈러로 빠르게 시작하세요.',
  alternates: { canonical: '/shelter' },
  openGraph: {
    url: '/shelter',
    title: '체류형 쉼터 | 위트(weet)',
    description:
      '건축 허가 없이 설치 가능한 체류형 쉼터. 3주 만에 나만의 공간을.',
    type: 'website',
    locale: 'ko_KR',
    siteName: 'weet:)',
  },
  twitter: {
    card: 'summary_large_image',
    title: '체류형 쉼터 | 위트(weet)',
    description: '농막·세컨하우스, 위트 모듈러로 빠르게 시작하세요.',
  },
};

export default function ShelterLayout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'BESPOKE 맞춤 설계',
  description:
    '세상에 단 하나뿐인 당신의 공간. 카페, 팝업스토어, 스마트팜까지 — 위트 비스포크 맞춤 솔루션.',
  alternates: { canonical: '/bespoke-v2' },
  openGraph: {
    url: '/bespoke-v2',
    title: 'BESPOKE 맞춤 설계 | 위트(weet)',
    description:
      '무한한 디자인, 1:1 맞춤 전문가. 카페부터 스마트팜까지 위트 비스포크.',
    type: 'website',
    locale: 'ko_KR',
    siteName: 'weet:)',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BESPOKE 맞춤 설계 | 위트(weet)',
    description: '세상에 단 하나뿐인 공간, 위트 비스포크 맞춤 솔루션.',
  },
};

export default function BespokeLayout({ children }: { children: React.ReactNode }) {
  return children;
}

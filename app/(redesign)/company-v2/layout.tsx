import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '회사소개',
  description:
    '위트있는 사람들이 만드는 위트있는 집. 모듈러 건축 전문 기업 위트를 소개합니다.',
  alternates: { canonical: '/company-v2' },
  openGraph: {
    url: '/company-v2',
    title: '회사소개 | 위트(weet)',
    description:
      '함평에서 출발한 모듈러 건축 전문 기업. 정직한 가격, 꼼꼼한 시공, 따뜻한 소통.',
    type: 'website',
    locale: 'ko_KR',
    siteName: 'weet:)',
  },
  twitter: {
    card: 'summary_large_image',
    title: '회사소개 | 위트(weet)',
    description: '모듈러 건축 전문 기업 위트를 소개합니다.',
  },
};

export default function CompanyLayout({ children }: { children: React.ReactNode }) {
  return children;
}

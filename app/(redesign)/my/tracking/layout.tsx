import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '시공 현황 조회',
  description:
    '내 집 짓는 과정을 실시간으로 확인하세요. 주문 코드로 7단계 시공 현황 조회.',
  alternates: { canonical: '/my/tracking' },
  openGraph: {
    url: '/my/tracking',
    title: '시공 현황 조회 | 위트(weet)',
    description:
      '내 집 짓는 과정을 실시간으로 확인하세요.',
    type: 'website',
    locale: 'ko_KR',
    siteName: 'weet:)',
  },
  robots: { index: false, follow: false },
};

export default function TrackingLayout({ children }: { children: React.ReactNode }) {
  return children;
}

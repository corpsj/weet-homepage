import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SOLUTION 통합 솔루션',
  description:
    '보안, 네트워크, IoT, 디자인 컨설팅. 위트가 제안하는 통합 라이프스타일 솔루션.',
  alternates: { canonical: '/solution-v2' },
  openGraph: {
    url: '/solution-v2',
    title: 'SOLUTION 통합 솔루션 | 위트(weet)',
    description:
      'CCTV, 메시 Wi-Fi, 스마트홈 IoT, 디자인 컨설팅. 올인원 솔루션.',
    type: 'website',
    locale: 'ko_KR',
    siteName: 'weet:)',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SOLUTION 통합 솔루션 | 위트(weet)',
    description: '보안부터 디자인까지, 위트 통합 솔루션.',
  },
};

export default function SolutionLayout({ children }: { children: React.ReactNode }) {
  return children;
}

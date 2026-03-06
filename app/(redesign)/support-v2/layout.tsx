import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '고객지원',
  description:
    '궁금한 거 다 물어보세요. 위트 모듈러 하우스에 대한 자주 묻는 질문과 상담 신청.',
  alternates: { canonical: '/support-v2' },
  openGraph: {
    url: '/support-v2',
    title: '고객지원 | 위트(weet)',
    description:
      'FAQ, 상담 신청, 문의하기. 위트가 궁금한 모든 것을 도와드립니다.',
    type: 'website',
    locale: 'ko_KR',
    siteName: 'weet:)',
  },
  twitter: {
    card: 'summary_large_image',
    title: '고객지원 | 위트(weet)',
    description: '위트 모듈러 하우스 FAQ와 상담 신청.',
  },
};

export default function SupportLayout({ children }: { children: React.ReactNode }) {
  return children;
}

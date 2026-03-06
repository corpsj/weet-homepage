import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '회사소개 | 위트(weet)',
  description: '위트있는 사람들이 만드는 위트있는 집. 모듈러 건축 전문 기업 위트를 소개합니다.',
};

export default function CompanyLayout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '시공 현황 조회 | 위트(weet)',
  description: '내 집 짓는 과정을 실시간으로 확인하세요.',
};

export default function TrackingLayout({ children }: { children: React.ReactNode }) {
  return children;
}

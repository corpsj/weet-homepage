import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '내 땅에 놓아보기 AR | 위트(weet)',
  description: 'AR로 우리 집을 미리 배치해보세요. 위트 모듈러 하우스 AR 체험.',
};

export default function ARLayout({ children }: { children: React.ReactNode }) {
  return children;
}

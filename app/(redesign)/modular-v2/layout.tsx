import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '모듈러건축 소개 | 위트(weet)',
  description: '공장에서 태어난 집. 모듈러 건축이란 무엇인지, 왜 빠르고 합리적인지 알아보세요.',
};

export default function ModularLayout({ children }: { children: React.ReactNode }) {
  return children;
}

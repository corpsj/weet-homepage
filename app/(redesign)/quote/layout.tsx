import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '가이드 견적 | 위트(weet)',
  description: '3분이면 충분해요. 위트 모듈러 하우스 맞춤 견적을 받아보세요.',
};

export default function QuoteLayout({ children }: { children: React.ReactNode }) {
  return children;
}

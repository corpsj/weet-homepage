import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '체류형 쉼터 | 위트(weet)',
  description: '규제 완화로 더 쉬워진 체류형 쉼터. 농막부터 세컨하우스까지, 위트 모듈러로 빠르게 시작하세요.',
};

export default function ShelterLayout({ children }: { children: React.ReactNode }) {
  return children;
}

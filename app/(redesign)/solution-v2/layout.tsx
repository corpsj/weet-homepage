import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SOLUTION 통합 솔루션 | 위트(weet)',
  description: '보안, 네트워크, IoT, 디자인 컨설팅. 위트가 제안하는 통합 라이프스타일 솔루션.',
};

export default function SolutionLayout({ children }: { children: React.ReactNode }) {
  return children;
}

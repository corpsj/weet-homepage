import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'BESPOKE 맞춤 설계 | 위트(weet)',
  description: '세상에 단 하나뿐인 당신의 공간. 카페, 팝업스토어, 스마트팜까지 — 위트 비스포크 맞춤 솔루션.',
};

export default function BespokeLayout({ children }: { children: React.ReactNode }) {
  return children;
}

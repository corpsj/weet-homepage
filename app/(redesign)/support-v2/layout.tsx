import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '고객지원 | 위트(weet)',
  description: '궁금한 거 다 물어보세요. 위트 모듈러 하우스에 대한 자주 묻는 질문과 상담 신청.',
};

export default function SupportLayout({ children }: { children: React.ReactNode }) {
  return children;
}

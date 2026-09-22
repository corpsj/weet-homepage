import type { Metadata } from 'next';
import { getFaqs } from '@/app/actions/faq-actions';
import { getSiteSettings } from '@/lib/site-settings.server';
import { buildPageMetadata } from '@/lib/seo';
import { jsonLdHtml } from '@/lib/json-ld';
import SupportClient from './SupportClient';
import { reviewedPublicAnswers } from '@/lib/public-answers';

// ISR: cache + revalidate every 5 minutes rather than force-dynamic. (F12)
export const revalidate = 300;

export const metadata: Metadata = buildPageMetadata({
  title: '고객지원 — 구매 과정·비용·상담 안내',
  description:
    '위트 이동식주택의 구매 과정, 제품 가격 외 비용과 A/S 확인 방법을 안내합니다. 설치 예정 지역과 원하는 구성을 남겨 상담을 신청하세요.',
  path: '/support',
});

const fallbackFaqs = [
  {
    question: '이동식주택은 어디에나 설치할 수 있나요?',
    answer: '부지 지목, 진입로, 전기·상하수 인입, 지역 조례에 따라 달라집니다. 상담 단계에서 설치 가능성을 먼저 확인합니다.',
  },
  {
    question: '예상 총액이 최종 견적인가요?',
    answer: '아니요. 구성 페이지의 예상 총액은 제품과 옵션 기준이며 운반·설치, 현장 공사, 인허가 조건은 상담 후 확정됩니다.',
  },
  {
    question: '제작과 설치 기간은 얼마나 걸리나요?',
    answer: '선택 사양과 현장 조건에 따라 달라지지만, 상담 후 제작 가능 일정과 설치 준비 항목을 함께 안내합니다.',
  },
  {
    question: 'A/S는 어떻게 진행되나요?',
    answer: '사용 중 불편 사항이 생기면 증상과 현장 정보를 확인한 뒤 필요한 점검과 조치를 안내합니다.',
  },
];

export default async function SupportPage() {
  const [dbFaqs, settings] = await Promise.all([getFaqs(), getSiteSettings()]);
  const activeDbFaqs = dbFaqs.filter((faq) => faq.is_active !== false && faq.question_ko && faq.answer_ko);
  const rawFaqs = activeDbFaqs.length > 0
    ? activeDbFaqs.map((faq) => ({ question: faq.question_ko as string, answer: faq.answer_ko as string }))
    : fallbackFaqs;

  const faqs = reviewedPublicAnswers(rawFaqs);

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdHtml(faqJsonLd) }} />
      <SupportClient faqs={faqs} settings={settings} />
    </>
  );
}

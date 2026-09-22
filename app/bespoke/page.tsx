'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback } from 'react';
import { useModalDismiss } from '@/components/customize/lib/hooks';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

type Lang = 'KO' | 'EN';

const COPY: Record<Lang, {
  headline: string;
  lead: string;
  highlight: string;
  features: Array<{ title: string; body: string }>;
  sections: Array<{
    id: string;
    badge: string;
    title: string;
    quote: string;
    body: string;
    cta: string;
    image: { src: string; alt: string };
    imageOnRight: boolean;
  }>;
  overlayClose: string;
}> = {
  KO: {
    headline: 'BESPOKE',
    lead: "카페, 쇼룸, 작업실 등 필요한 용도에 맞춰 공간을 설계합니다.",
    highlight: "사용 목적, 부지, 설비와 예산을 함께 검토하는 맞춤 제작 서비스입니다.",
    features: [
      { title: '용도와 동선', body: '필요한 면적, 동선과 사용 인원을 먼저 정리합니다.' },
      { title: '1:1 맞춤 전문가', body: '아이디어 구상부터 완공까지, 전문가가 당신과 함께하며 모든 디테일을 구현합니다.' },
      { title: '설치 조건 확인', body: '부지 조건과 적용 절차 안에서 배치와 설계를 검토합니다.' },
      { title: '마감과 설비', body: '예산과 관리 방법을 고려해 자재와 설비를 선택합니다.' },
    ],
    sections: [
      {
        id: 'small-cafe',
        badge: 'COMMERCIAL',
        title: 'SMALL CAFE',
        quote: '"카페는 커피 맛 이전에,\n\'공간의 경험\'으로 먼저 기억됩니다."',
        body: "좌석과 주문 동선, 주방 설비, 전기 용량과 급배수를 함께 검토합니다. 운영 방식에 맞춰 평면과 내외부 마감을 정합니다.",
        cta: 'View Portfolio',
        image: { src: '/images/bespoke/small-cafe-v2.webp', alt: 'Small Cafe' },
        imageOnRight: true,
      },
      {
        id: 'popup-store',
        badge: 'RETAIL & EVENT',
        title: 'POP-UP STORE / BRAND SHOWROOM',
        quote: "전시와 운영 조건에 맞춘\n팝업·쇼룸 공간",
        body: '전시 품목, 방문 인원과 운영 기간에 맞춰 쇼룸을 계획합니다. 설치와 철거, 재사용을 위한 운반 조건은 부지별로 확인합니다.',
        cta: 'View Portfolio',
        image: { src: '/images/bespoke/popup-store-v2.webp', alt: 'Pop-up Store' },
        imageOnRight: false,
      },
      {
        id: 'smart-farm',
        badge: 'AGRITECH',
        title: 'SMART FARM',
        quote: "'데이터'가 '수확'이 되는,\n농업의 미래를 짓다",
        body: '재배 대상과 운영 방식에 필요한 온도, 습도, 조명과 급수 조건을 먼저 정리합니다. 필요한 설비, 전력과 네트워크를 공간 설계에 반영합니다.',
        cta: 'View Portfolio',
        image: { src: '/images/bespoke/smart-farm-v2.webp', alt: 'Smart Farm' },
        imageOnRight: true,
      },
    ],
    overlayClose: '닫기',
  },
  EN: {
    headline: 'BESPOKE',
    lead: 'Our modular know-how starts from a simple confidence: we can make any space real.',
    highlight: 'From brand showrooms and pop-up stores to smart farms, we deliver custom solutions for your ideas.',
    features: [
      { title: 'Proven tech, tailored design', body: 'We combine modular engineering with spatial expertise to match your purpose.' },
      { title: '1:1 coordination', body: 'Budget, schedule, and operation scenarios are planned together—every detail is co-created.' },
      { title: 'Unlimited scalability', body: 'Modules can expand or relocate to adapt as your business evolves.' },
      { title: 'Premium quality', body: 'Standardized processes and premium finishes ensure a refined final result.' },
    ],
    sections: [
      {
        id: 'small-cafe',
        badge: 'COMMERCIAL',
        title: 'SMALL CAFE',
        quote: 'A cozy café with efficient flow, built and ready in a day.',
        body: 'We design interiors and customer circulation that reflect your brand, creating a rich experience even in compact spaces.',
        cta: 'View portfolio',
        image: { src: '/images/bespoke/small-cafe-v2.webp', alt: 'Small Cafe' },
        imageOnRight: true,
      },
      {
        id: 'popup-store',
        badge: 'RETAIL & EVENT',
        title: 'POP-UP STORE / BRAND SHOWROOM',
        quote: 'Impactful brand experiences, even on short timelines.',
        body: 'Designed for fast install, teardown, and relocation. We plan experiential flows with digital content so events launch on time.',
        cta: 'View portfolio',
        image: { src: '/images/bespoke/popup-store-v2.webp', alt: 'Pop-up Store' },
        imageOnRight: false,
      },
      {
        id: 'smart-farm',
        badge: 'AGRITECH',
        title: 'SMART FARM',
        quote: 'Build agricultural facilities quickly with intelligent control and modular structure.',
        body: 'Optimized insulation and MEP layout within modular envelopes, paired with sensors and control systems for stable growing environments.',
        cta: 'View portfolio',
        image: { src: '/images/bespoke/smart-farm-v2.webp', alt: 'Smart Farm' },
        imageOnRight: true,
      },
    ],
    overlayClose: 'Close',
  },
};

const IMAGES = [
  { id: 'small-cafe', src: '/images/bespoke/small-cafe-v2.webp', alt: 'Small Cafe' },
  { id: 'popup-store', src: '/images/bespoke/popup-store-v2.webp', alt: 'Pop-up Store' },
  { id: 'smart-farm', src: '/images/bespoke/smart-farm-v2.webp', alt: 'Smart Farm' },
];

export default function BespokePage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { language } = useLanguage();
  const copy = COPY[language === 'KO' ? 'KO' : 'EN'];

  return (
    <div className="min-h-screen bg-white">
      <section id="what-is-bespoke" className="bg-[#EBEBEB] py-20 md:py-28 lg:py-32 overflow-hidden scroll-mt-[180px]">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-[148px]">
          <motion.div
            initial={{ opacity: 1, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-[50px] md:text-[70px] lg:text-[90px] font-bold mb-8 md:mb-12 leading-none tracking-tight">
              {copy.headline}
            </h1>

            <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
              <div className="lg:w-[65%]">
                <p className="text-[18px] md:text-[20px] leading-relaxed mb-6 text-gray-800 break-keep">
                  {copy.lead}
                </p>
                <p className="text-[20px] md:text-[24px] font-semibold text-black break-keep">
                  {copy.highlight}
                </p>
              </div>

              <div className="lg:w-[35%] space-y-6 text-[15px] md:text-[16px] text-gray-600">
                {copy.features.map((feature, idx) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 1, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 * idx, duration: 0.6 }}
                    className="border-l-2 border-gray-300 pl-6 hover:border-primary transition-colors"
                  >
                    <strong className="block text-black text-lg mb-1">{feature.title}</strong>
                    {feature.body}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {copy.sections.map((section) => {
        const imageBlock = (
          <motion.div
            key={`${section.id}-image`}
            className="relative h-[400px] md:h-[600px] w-full cursor-pointer"
            onClick={() => setSelectedId(section.id)}
            role="button" tabIndex={0} aria-label={`${section.title} 크게 보기`}
            onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); setSelectedId(section.id); } }}
          >
            <Image
              src={section.image.src}
              alt={section.image.alt}
              fill
              className="object-cover rounded-lg shadow-2xl hover:scale-105 transition-transform duration-500"
            />
          </motion.div>
        );

        const textBlock = (
          <motion.div
            key={`${section.id}-text`}
            className="w-full lg:w-1/2"
            initial={{ opacity: 1, x: section.imageOnRight ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary font-bold tracking-widest text-sm mb-4 block">{section.badge}</span>
            <h2 className="text-[40px] md:text-[60px] font-bold mb-6 leading-tight">{section.title}</h2>
            <p className="text-[20px] md:text-[24px] font-medium mb-6 text-gray-900 break-keep">
              {section.quote}
            </p>
            <p className="text-gray-600 leading-relaxed mb-8 text-lg break-keep">
              {section.body}
            </p>
            <Link href="/support#consult" className="border-b-2 border-black pb-1 text-lg font-medium hover:text-primary hover:border-primary transition-colors min-h-[44px] inline-flex items-center">
              {language === 'KO' ? '맞춤 설계 상담하기' : 'Discuss your project'}
            </Link>
          </motion.div>
        );

        return (
          <section
            key={section.id}
            id={section.id}
            className={`${section.imageOnRight ? 'bg-white' : 'bg-[#F5F5F5]'} py-20 md:py-32 overflow-hidden scroll-mt-[180px]`}
          >
            <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-[148px]">
              <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                {section.imageOnRight ? (
                  <>
                    {textBlock}
                    <div className="w-full lg:w-1/2">
                      {imageBlock}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-full lg:w-1/2">
                      {imageBlock}
                    </div>
                    {textBlock}
                  </>
                )}
              </div>
            </div>
          </section>
        );
      })}

      <span id="examples" />
      <AnimatePresence>
        {selectedId && (
          <motion.div
            role="dialog" aria-modal="true" aria-label="제안 이미지 확대" className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 md:p-10"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedId(null)}
          >
            <BespokeModalGuard onClose={() => setSelectedId(null)} />
            <motion.div
              layoutId={selectedId}
              className="relative w-full max-w-7xl h-auto aspect-video md:h-[85vh] md:w-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {IMAGES.find(img => img.id === selectedId) && (
                <Image
                  src={IMAGES.find(img => img.id === selectedId)!.src}
                  alt={IMAGES.find(img => img.id === selectedId)!.alt}
                  fill
                  className="object-contain"
                  priority
                />
              )}
              <button
                className="absolute -top-12 right-0 text-white hover:text-primary transition-colors"
                onClick={() => setSelectedId(null)}
              >
                <X className="w-8 h-8" />
                <span className="sr-only">{copy.overlayClose}</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function BespokeModalGuard({ onClose }: { onClose: () => void }) {
  const close = useCallback(() => onClose(), [onClose]);
  useModalDismiss(close);
  return null;
}

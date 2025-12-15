'use client';

import Image from 'next/image';
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
    lead: "weet의 모듈러 기술력은 '시그니처 라인'의 검증된 품질로 이미 증명되었습니다.",
    highlight: "'비스포크 서비스'는 세상에 단 하나뿐인 당신의 공간을 짓는 프리미엄 맞춤 솔루션입니다.",
    features: [
      { title: '검증된 기술, 특별한 비전', body: '시그니처 라인에서 검증된 모듈러 기술력과 당신의 특별한 비전의 만남.' },
      { title: '1:1 맞춤 전문가', body: '아이디어 구상부터 완공까지, 전문가가 당신과 함께하며 모든 디테일을 구현합니다.' },
      { title: '무한한 디자인', body: '부지의 형태, 용도, 스타일에 구애받지 않는 완전한 설계의 자유.' },
      { title: '최상급 디테일', body: '기본을 넘어, 당신의 기준에 맞는 최상급 자재와 마감 공법을 선택할 수 있습니다.' },
    ],
    sections: [
      {
        id: 'small-cafe',
        badge: 'COMMERCIAL',
        title: 'SMALL CAFE',
        quote: '"카페는 커피 맛 이전에,\n\'공간의 경험\'으로 먼저 기억됩니다."',
        body: "문을 여는 순간 느껴지는 독특한 분위기, 공간을 채우는 빛과 소재의 질감. 위트의 '작업자들'은 당신의 브랜드 스토리를 고객이 오감으로 경험하는 감각적인 공간 언어로 풀어냅니다. 운영 효율과 심미성이 완벽히 공존하는 1:1 맞춤형 상업 공간을 제안합니다.",
        cta: 'View Portfolio',
        image: { src: '/images/bespoke/small-cafe.jpg', alt: 'Small Cafe' },
        imageOnRight: true,
      },
      {
        id: 'popup-store',
        badge: 'RETAIL & EVENT',
        title: 'POP-UP STORE / BRAND SHOWROOM',
        quote: "'브랜드 경험'을 원하는 곳,\n어디로든 옮기다",
        body: '단 며칠 만에 고객을 사로잡는 강력한 브랜드 경험. 정해진 장소와 시간에 얽매이지 않고, 원하는 곳 어디든 당신의 브랜드를 펼쳐보세요. 빠른 설치와 철거, 완벽한 브랜딩 구현, 이동성을 충족하는 스마트한 비즈니스 솔루션입니다.',
        cta: 'View Portfolio',
        image: { src: '/images/bespoke/popup-store.jpg', alt: 'Pop-up Store' },
        imageOnRight: false,
      },
      {
        id: 'smart-farm',
        badge: 'AGRITECH',
        title: 'SMART FARM',
        quote: "'데이터'가 '수확'이 되는,\n농업의 미래를 짓다",
        body: '스마트팜은 단순한 온실이 아닌, 데이터로 농사를 짓는 정밀한 연구소입니다. 완벽한 단열과 기밀성을 갖춘 모듈 구조를 기반으로, 최적화된 환경 제어 시스템과 데이터 인프라를 통합합니다. 기술이 농업의 한계를 넘어서는 혁신적인 공간을 경험하세요.',
        cta: 'View Portfolio',
        image: { src: '/images/bespoke/smart-farm.png', alt: 'Smart Farm' },
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
        image: { src: '/images/bespoke/small-cafe.jpg', alt: 'Small Cafe' },
        imageOnRight: true,
      },
      {
        id: 'popup-store',
        badge: 'RETAIL & EVENT',
        title: 'POP-UP STORE / BRAND SHOWROOM',
        quote: 'Impactful brand experiences, even on short timelines.',
        body: 'Designed for fast install, teardown, and relocation. We plan experiential flows with digital content so events launch on time.',
        cta: 'View portfolio',
        image: { src: '/images/bespoke/popup-store.jpg', alt: 'Pop-up Store' },
        imageOnRight: false,
      },
      {
        id: 'smart-farm',
        badge: 'AGRITECH',
        title: 'SMART FARM',
        quote: 'Build agricultural facilities quickly with intelligent control and modular structure.',
        body: 'Optimized insulation and MEP layout within modular envelopes, paired with sensors and control systems for stable growing environments.',
        cta: 'View portfolio',
        image: { src: '/images/bespoke/smart-farm.png', alt: 'Smart Farm' },
        imageOnRight: true,
      },
    ],
    overlayClose: 'Close',
  },
};

const IMAGES = [
  { id: 'small-cafe', src: '/images/bespoke/small-cafe.jpg', alt: 'Small Cafe' },
  { id: 'popup-store', src: '/images/bespoke/popup-store.jpg', alt: 'Pop-up Store' },
  { id: 'smart-farm', src: '/images/bespoke/smart-farm.png', alt: 'Smart Farm' },
];

export default function BespokePage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { language } = useLanguage();
  const copy = COPY[language];

  return (
    <div className="min-h-screen bg-white">
      <section id="what-is-bespoke" className="bg-[#EBEBEB] py-20 md:py-28 lg:py-32 overflow-hidden scroll-mt-[180px]">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-[148px]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
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
                    initial={{ opacity: 0, x: 20 }}
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
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            layoutId={section.id}
            onClick={() => setSelectedId(section.id)}
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
            className="lg:w-1/2"
            initial={{ opacity: 0, x: section.imageOnRight ? -50 : 50 }}
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
            <button className="border-b-2 border-black pb-1 text-lg font-medium hover:text-primary hover:border-primary transition-colors">
              {section.cta}
            </button>
          </motion.div>
        );

        return (
          <section
            key={section.id}
            id={section.id === 'popup-store' ? 'examples' : undefined}
            className={`${section.imageOnRight ? 'bg-white' : 'bg-[#F5F5F5]'} py-20 md:py-32 overflow-hidden scroll-mt-[180px]`}
          >
            <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-[148px]">
              <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                {section.imageOnRight ? (
                  <>
                    {textBlock}
                    <div className="lg:w-1/2">
                      {imageBlock}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="lg:w-1/2">
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

      <AnimatePresence>
        {selectedId && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 md:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedId(null)}
          >
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

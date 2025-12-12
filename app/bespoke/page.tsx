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
     lead: 'WEET의 모듈 기술력은 “어떤 공간이든 현실로 만든다”는 검증된 자신감에서 시작합니다.',
     highlight: '브랜드 쇼룸, 팝업스토어, 스마트팜 등 당신의 아이디어를 실현하는 맞춤형 솔루션을 제공합니다.',
     features: [
       { title: '검증된 기술, 맞춤 설계', body: '모듈러 기술과 공간 경험을 기반으로 목적에 맞는 설계와 공정을 제안합니다.' },
       { title: '1:1 맞춤 코디네이션', body: '예산과 일정, 운영 시나리오를 함께 설계하며 모든 디테일을 함께 결정합니다.' },
       { title: '무한한 확장성', body: '규모와 용도에 맞춰 확장·이동이 가능해 사업 변화에도 유연하게 대응합니다.' },
       { title: '최상의 퀄리티', body: '표준화된 공정과 프리미엄 마감으로 완성도 높은 결과물을 약속합니다.' },
     ],
     sections: [
       {
         id: 'small-cafe',
         badge: 'COMMERCIAL',
         title: 'SMALL CAFE',
         quote: '감각적 분위기와 효율적인 동선을 갖춘 미니 카페를 하루 만에 구현합니다.',
         body: '브랜드의 톤앤매너를 살린 내·외부 마감과 고객 동선 설계를 동시에 진행해 작은 공간에서도 경험이 풍부하도록 디자인합니다.',
         cta: '포트폴리오 보기',
         image: { src: '/images/bespoke/small-cafe.jpg', alt: 'Small Cafe' },
         imageOnRight: true,
       },
       {
         id: 'popup-store',
         badge: 'RETAIL & EVENT',
         title: 'POP-UP STORE / BRAND SHOWROOM',
         quote: '짧은 기간에도 브랜드 경험을 극대화하는 임팩트 있는 공간.',
         body: '빠른 설치와 해체, 이동을 고려한 설계로 이벤트 일정에 맞춰 즉시 운영 가능합니다. 디지털 콘텐츠와 연동한 체험 동선까지 함께 설계합니다.',
         cta: '포트폴리오 보기',
         image: { src: '/images/bespoke/popup-store.jpg', alt: 'Pop-up Store' },
         imageOnRight: false,
       },
       {
         id: 'smart-farm',
         badge: 'AGRITECH',
         title: 'SMART FARM',
         quote: '지능형 제어와 모듈 구조로 농업 시설을 빠르게 구축합니다.',
         body: '모듈 설계로 단열과 설비 배치를 최적화하고, 센서·제어 시스템을 연동해 안정적인 재배 환경을 제공합니다.',
         cta: '포트폴리오 보기',
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

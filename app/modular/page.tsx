 'use client';

 import Image from 'next/image';
 import { useLanguage } from '@/contexts/LanguageContext';

 type Lang = 'KO' | 'EN';

 const COPY: Record<Lang, {
   hero: { title: string; lead: string; paragraphs: string[]; checklist: string[] };
   sections: Array<{
     id: string;
     title: string;
     subtitle: string;
     paragraphs: string[];
     coreValue: string;
     image: string;
     bg: 'light' | 'dark';
   }>;
 }> = {
   KO: {
     hero: {
       title: '모듈러 건축이란?',
       lead: '공장에서 90% 이상을 완성한 뒤 현장에서는 조립만 하는 건축 방식입니다.',
       paragraphs: [
         '일반 현장 중심 공사는 날씨, 소음, 안전 위험 등 변수에 크게 영향을 받습니다. 모듈러는 검증된 공정과 품질 관리로 불확실성을 줄이고, 일정을 예측 가능하게 만듭니다.',
         '각 모듈은 실내 마감, 전기·설비, 창호까지 공장에서 미리 시공합니다. 현장에서는 쌓고 연결하는 조립만 진행해 공정이 빠르고 일정이 안정적입니다.',
         '공정 단축, 품질 균일화, 폐기물과 소음 감소까지 한 번에 달성하는 것이 모듈러의 핵심 가치입니다.',
       ],
       checklist: [
         '하이브리드 모듈 타입 (Hybrid Modular Unit)',
         '프리패브리케이션 (Prefabrication)',
         '오프사이트 시공 (OSC, Off-Site Construction)',
         '조립식 건축 (Prefabricated Building)',
       ],
     },
     sections: [
       {
         id: 'modular-types',
         title: '하이브리드 모듈 타입',
         subtitle: '철골과 목구조를 결합해 단단한 구조와 쾌적한 실내를 동시에 구현합니다.',
         paragraphs: [
           '내구성이 뛰어난 철골 구조에 목구조의 따뜻한 감성을 더했습니다. 진동과 처짐을 줄이고, 단열과 차음 성능을 균형 있게 확보합니다.',
           '제작 단계에서 구조 검토와 품질 검수를 반복해, 현장에서 바로 사용 가능한 모듈만 출고합니다.',
         ],
         coreValue: '견고함과 쾌적함을 모두 충족하는 하이브리드 설계.',
         image: '/images/modular/hybrid-modular.jpg',
         bg: 'light',
       },
       {
         id: 'prefabrication',
         title: '프리패브리케이션',
         subtitle: '공장에서 선제작 후 현장에서 빠르게 조립합니다.',
         paragraphs: [
           '자재 입고부터 전기·설비·마감까지 표준화된 라인에서 진행해 공정을 80% 이상 단축합니다.',
           '다중 QC 공정으로 치수, 마감, 기능을 반복 검수하여 현장 변수와 재작업을 최소화합니다.',
         ],
         coreValue: '치수 단위까지 관리되는 표준 공정으로 품질을 고르게 유지.',
         image: '/images/modular/prefabrication.jpg',
         bg: 'light',
       },
       {
         id: 'osc',
         title: 'OSC (Off-Site Construction)',
         subtitle: '현장 공사와 공장 제작을 병행해 전체 일정을 단축합니다.',
         paragraphs: [
           '기초 공사와 모듈 제작을 동시에 진행하는 병렬 프로세스로, 전체 공기를 크게 줄입니다.',
           '현장에서 예측 불가한 날씨·소음·안전 위험을 줄이고, 체계적인 품질·일정 관리를 제공합니다.',
         ],
         coreValue: '병렬 공정으로 일정 리스크를 최소화하고 납기를 예측 가능하게 만듭니다.',
         image: '/images/modular/osc.jpg',
         bg: 'dark',
       },
       {
         id: 'assembly',
         title: '조립식 건축',
         subtitle: '완성된 모듈을 쌓아 연결해 하루 만에 공간을 세웁니다.',
         paragraphs: [
           '운송된 모듈을 크레인으로 적층·연결하고, 마지막 마감만 진행해 짧은 시간에 준공합니다.',
           '확장이나 이전이 필요한 경우에도 분리·이동·재조립이 가능해 자산 활용도가 높습니다.',
         ],
         coreValue: '빠른 시공과 향후 이동·확장까지 고려한 유연한 건축 방식.',
         image: '/images/modular/prefabricated-building.jpg',
         bg: 'dark',
       },
     ],
   },
   EN: {
     hero: {
       title: 'What is Modular Construction?',
       lead: 'Over 90% is finished in the factory; on site we simply stack and connect.',
       paragraphs: [
         'Traditional on-site builds are vulnerable to weather, noise, and safety risks. Modular reduces uncertainty with standardized processes and quality control.',
         'Each module leaves the factory with interiors, MEP, and windows installed. On site we only assemble, so schedules are faster and more predictable.',
         'The core value: shorter schedules, consistent quality, and less waste and noise in one approach.',
       ],
       checklist: [
         'Hybrid Modular Unit',
         'Prefabrication',
         'Off-Site Construction (OSC)',
         'Prefabricated Building',
       ],
     },
     sections: [
       {
         id: 'modular-types',
         title: 'Hybrid Modular Unit',
         subtitle: 'Steel for strength, wood for comfort—combined for balanced performance.',
         paragraphs: [
           'We blend durable steel frames with warm timber to reduce vibration and deflection while keeping insulation and acoustic comfort.',
           'Structural reviews and QC loops are done before shipping so modules arrive ready to install.',
         ],
         coreValue: 'Hybrid engineering that delivers both robustness and comfort.',
         image: '/images/modular/hybrid-modular.jpg',
         bg: 'light',
       },
       {
         id: 'prefabrication',
         title: 'Prefabrication',
         subtitle: 'Produce in the factory, assemble quickly on site.',
         paragraphs: [
           'From materials to MEP and finishes, we run standardized lines that cut field work by over 80%.',
           'Multi-stage QC checks dimensions, finishes, and functions to minimize on-site rework and surprises.',
         ],
         coreValue: 'Tightly controlled standard processes keep quality consistent.',
         image: '/images/modular/prefabrication.jpg',
         bg: 'light',
       },
       {
         id: 'osc',
         title: 'OSC (Off-Site Construction)',
         subtitle: 'Factory production and site work run in parallel to shorten the schedule.',
         paragraphs: [
           'Foundations and module production happen at the same time, slashing the overall timeline.',
           'We reduce weather, noise, and safety risks and deliver predictable schedules with structured quality control.',
         ],
         coreValue: 'Parallel workflows minimize schedule risk and keep delivery dates reliable.',
         image: '/images/modular/osc.jpg',
         bg: 'dark',
       },
       {
         id: 'assembly',
         title: 'Prefabricated Building',
         subtitle: 'Stack, connect, and finish—spaces can stand up in a single day.',
         paragraphs: [
           'Modules arrive complete, are lifted into place, connected, and finalized with minimal on-site finishing.',
           'Need to expand or relocate later? Modules can be separated, moved, and reassembled for higher asset flexibility.',
         ],
         coreValue: 'Fast delivery now with flexibility for future moves or expansions.',
         image: '/images/modular/prefabricated-building.jpg',
         bg: 'dark',
       },
     ],
   },
 };

 export default function ModularPage() {
   const { language } = useLanguage();
   const copy = COPY[language];

   return (
     <div className="min-h-screen bg-white">
       {/* Hero */}
       <section id="what-is-modular" className="bg-[#E8E8E8] py-16 lg:py-24 scroll-mt-[180px]">
         <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-[140px]">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
             <div>
               <div className="relative w-full max-w-[563px] aspect-[1024/817] mx-auto lg:mx-0 mb-8">
                 <Image
                   src="/images/modular/main-image.png"
                   alt={copy.hero.title}
                   fill
                   className="object-contain"
                   priority
                 />
               </div>

               <div className="space-y-3">
                 {copy.hero.checklist.map((item, index) => (
                   <div key={index} className="flex items-center gap-3">
                     <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24" fill="none">
                       <rect x="3" y="3" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" />
                       <path d="M7 12l3 3 7-7" stroke="currentColor" strokeWidth="2" fill="none" />
                     </svg>
                     <span className="text-[16px] lg:text-[18px]">{item}</span>
                   </div>
                 ))}
               </div>
             </div>

             <div>
               <h1 className="text-[32px] lg:text-[40px] font-bold mb-4">
                 {copy.hero.title}
               </h1>

               <p className="text-[18px] lg:text-[20px] font-bold text-black mb-6">
                 {copy.hero.lead}
               </p>

               <div className="text-[14px] lg:text-[15px] leading-[1.8] space-y-4 text-gray-700 mb-8">
                 {copy.hero.paragraphs.map((p, idx) => (
                   <p key={idx}>{p}</p>
                 ))}
               </div>

               <div className="text-right">
                 <p className="text-[14px] font-medium">- WEET -</p>
               </div>
             </div>
           </div>
         </div>
       </section>

       {/* Sections */}
       {copy.sections.map((section) => (
         <section
           key={section.id}
           id={section.id}
           className={`${section.bg === 'light' ? 'bg-white' : 'bg-[#E8E8E8]'} py-16 lg:py-24 scroll-mt-[180px]`}
         >
           <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-[140px]">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
               <div className="relative w-full aspect-[2816/1536] overflow-hidden rounded-lg order-2 lg:order-1">
                 <Image
                   src={section.image}
                   alt={section.title}
                   fill
                   className="object-cover"
                 />
               </div>

               <div className="order-1 lg:order-2">
                 <h2 className="text-[28px] lg:text-[36px] font-bold mb-4">
                   {section.title}
                 </h2>
                 <h3 className="text-[18px] lg:text-[22px] font-bold mb-4 text-gray-900">
                   {section.subtitle}
                 </h3>

                 <div className="text-[14px] lg:text-[15px] leading-[1.8] space-y-4 text-gray-700 mb-6">
                   {section.paragraphs.map((p, idx) => (
                     <p key={idx}>{p}</p>
                   ))}
                 </div>

                 <p className="text-sm font-semibold text-black">Core Value: {section.coreValue}</p>
               </div>
             </div>
           </div>
         </section>
       ))}
     </div>
   );
 }

 'use client';

import Image from 'next/image';
import InquiryForm from '@/components/support/InquiryForm';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

type Lang = 'KO' | 'EN';

const COPY: Record<Lang, {
  processTitle: string;
  processLead: string;
  steps: Array<{ title: string; description: string }>;
  qaTitle: string;
  qaLead: string;
  faqs: Array<{ question: string; answer: string }>;
  formTitle: string;
  formLead: string;
  quickCards: Array<{ id: string; title: string; text: string; button: string }>;
  asTitle: string;
  asLead: string;
  asDesc: string;
  phoneLabel: string;
  phone: string;
  hours: string;
  hoursNote: string;
  closeLabel: string;
}> = {
  KO: {
    processTitle: '당신의 집을 짓는 과정',
    processLead: '첫 상담부터 시공, A/S까지 위트가 함께합니다.',
    steps: [
      { title: '꿈을 그립니다 (1:1 맞춤 상담)', description: '로망과 요구 사항을 들으며 예산·일정을 함께 설계합니다.' },
      { title: '현장을 확인합니다 (부지 분석·계획)', description: '부지와 법규를 검토해 최적의 배치와 동선을 제안합니다.' },
      { title: '설계를 완성합니다 (견적·계약)', description: '합리적인 견적과 일정, 마감 사양을 확정하고 계약합니다.' },
      { title: '제작과 시공을 진행합니다 (모듈 공장 제작)', description: '공장에서 모듈을 제작하고 현장에서 빠르게 설치합니다.' },
      { title: '완성합니다 (설치·마감·인도)', description: '운송·설치 후 내부 마감까지 완료해 공간을 인도합니다.' },
      { title: '안심 A/S (점검·유지관리)', description: '완공 후에도 정기 점검과 케어로 안심을 제공합니다.' },
    ],
    qaTitle: 'Q/A',
    qaLead: '자주 받는 질문을 모았습니다.',
    faqs: [
      { question: '공사 기간은 얼마나 걸리나요?', answer: '계약 후 공장 제작 약 4~6주, 현장 설치는 규모에 따라 1~2일 정도 소요됩니다.' },
      { question: '단열과 방음이 잘 되나요?', answer: '철골+경량 목구조, 고성능 단열재로 설계해 일반 주택 수준의 단열·차음을 제공합니다.' },
      { question: '커스터마이징이 가능한가요?', answer: '네. 기본 모델을 바탕으로 예산과 용도에 맞춰 1:1로 조정합니다.' },
      { question: 'A/S 보증 기간은 어떻게 되나요?', answer: '구조는 10년, 마감·설비는 2년 무상 A/S를 제공합니다. 세부 내용은 계약서에 명시됩니다.' },
    ],
    formTitle: 'F/Q',
    formLead: '1:1 문의를 남겨주세요.',
    quickCards: [
      { id: 'reservation', title: '방문 예약', text: 'Showroom / Model House', button: '방문 예약하기' },
      { id: 'consultation', title: '상담 문의', text: '1:1 Consultation', button: '상담 신청하기' },
      { id: 'quote', title: '견적 문의', text: 'Request a Quote', button: '견적 요청하기' },
      { id: 'business', title: '사업 문의', text: 'Business Inquiry', button: '비즈니스 문의하기' },
    ],
    asTitle: 'A/S SERVICE',
    asLead: 'WEET CARE',
    asDesc: '제품 사용 중 불편이 있으면 언제든 연락 주세요. 신속하고 확실한 A/S를 제공합니다.',
    phoneLabel: 'Customer Center',
    phone: '02-0000-0000',
    hours: '09:00 - 18:00',
    hoursNote: '* 주말·공휴일 휴무',
    closeLabel: '닫기',
  },
  EN: {
    processTitle: 'How We Build Your Home',
    processLead: 'From consultation to installation and aftercare, WEET stays with you.',
    steps: [
      { title: 'Imagine together (1:1 consult)', description: 'We listen to your dream and requirements and shape budget and timeline.' },
      { title: 'Check the site', description: 'We review land and regulations to suggest the best layout and circulation.' },
      { title: 'Finalize design & contract', description: 'We lock in specs, schedule, and a clear estimate before signing.' },
      { title: 'Fabricate & build', description: 'Modules are produced in the factory and installed quickly on site.' },
      { title: 'Deliver the space', description: 'We transport, install, finish interiors, and hand over the keys.' },
      { title: 'Aftercare', description: 'Regular checks and responsive support keep you comfortable after move-in.' },
    ],
    qaTitle: 'Q/A',
    qaLead: 'Answers to common questions.',
    faqs: [
      { question: 'How long does it take?', answer: 'About 4–6 weeks for factory production after contract, then 1–2 days for on-site install depending on size.' },
      { question: 'What about insulation and sound?', answer: 'Hybrid steel/timber structure with high-performance insulation offers home-grade thermal and acoustic performance.' },
      { question: 'Can I customize?', answer: 'Yes. We tailor the base models to your budget and use case through 1:1 coordination.' },
      { question: 'How is the warranty?', answer: 'Structure: 10 years. Finishes/MEP: 2 years. Full details are specified in the contract.' },
    ],
    formTitle: 'F/Q',
    formLead: 'Leave us a 1:1 inquiry.',
    quickCards: [
      { id: 'reservation', title: 'Visit Booking', text: 'Showroom / Model House', button: 'Book a visit' },
      { id: 'consultation', title: 'Consultation', text: '1:1 Consultation', button: 'Request consult' },
      { id: 'quote', title: 'Quote Request', text: 'Request a Quote', button: 'Request a quote' },
      { id: 'business', title: 'Business Inquiry', text: 'Business Inquiry', button: 'Contact sales' },
    ],
    asTitle: 'A/S SERVICE',
    asLead: 'WEET CARE',
    asDesc: 'If anything feels off while using our products, call us anytime. We respond fast and clearly.',
    phoneLabel: 'Customer Center',
    phone: '+82-2-0000-0000',
    hours: '09:00 - 18:00',
    hoursNote: '* Closed weekends & holidays',
    closeLabel: 'Close',
  },
};

export default function SupportPage() {
  const [openFaqId, setOpenFaqId] = useState<number | null>(1);
  const { language } = useLanguage();
  const copy = COPY[language];

  const toggleFaq = (id: number) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Purchase Process */}
      <section id="purchase" className="bg-[#D4D4D4] py-12 md:py-16 lg:py-24 relative overflow-hidden scroll-mt-[100px] animate-fade-in">
        <div className="max-w-[1920px] mx-auto px-4 md:px-8 lg:px-[123px] relative z-10">

          <div className="flex flex-col xl:flex-row gap-12 xl:gap-[150px]">
            <div className="flex-shrink-0 xl:w-[500px]">
              <div className="mb-12 sticky top-24">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-[26px] h-[27px] relative mt-2 flex-shrink-0">
                    <svg width="26" height="27" viewBox="0 0 26 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 0H26V27L0 0Z" fill="black" />
                    </svg>
                  </div>
                  <h1 className="text-[32px] md:text-[40px] lg:text-[48px] font-bold leading-tight text-black">
                    {copy.processTitle}
                  </h1>
                </div>

                <div className="max-w-xl">
                  <p className="text-[18px] lg:text-[20px] leading-relaxed font-medium text-black break-keep">
                    {copy.processLead}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex-grow">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
                {copy.steps.map((step, idx) => (
                  <div key={step.title} className="flex flex-col group hover:-translate-y-1 transition-transform duration-300">
                    <div className="bg-primary h-[70px] w-full flex flex-col justify-center items-center text-center px-2 mb-4 rounded-sm shadow-sm group-hover:shadow-md transition-shadow">
                      <span className="text-[14px] font-bold mb-1">STEP .{idx + 1}</span>
                      <span className="text-[14px] font-bold leading-tight break-keep text-center">{step.title}</span>
                    </div>

                    <div className="bg-white h-[167px] w-full mb-6 rounded-sm border border-gray-200 flex items-center justify-center relative overflow-hidden">
                      <Image
                        src={`/images/support/step${idx + 1}.png`}
                        alt={step.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    <p className="text-[14px] leading-relaxed text-gray-800 break-keep">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Q/A and Inquiry */}
      <section id="qa" className="bg-[#EBEBEB] py-12 md:py-20 lg:py-32 border-t border-gray-300 scroll-mt-[100px]">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-[123px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 lg:gap-32">
            <div>
              <h2 className="text-[48px] md:text-[64px] lg:text-[80px] font-bold mb-6 md:mb-8">{copy.qaTitle}</h2>
              <p className="text-[14px] md:text-[15px] lg:text-[16px] text-gray-600 mb-8">
                {copy.qaLead}
              </p>

              <div className="space-y-4">
                {copy.faqs.map((item, idx) => (
                  <div
                    key={item.question}
                    className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer overflow-hidden border ${openFaqId === idx + 1 ? 'border-primary ring-1 ring-primary' : 'border-transparent'}`}
                    onClick={() => toggleFaq(idx + 1)}
                  >
                    <div className="p-6 flex justify-between items-center bg-white z-10 relative">
                      <span className={`font-bold text-lg leading-snug pr-4 transition-colors ${openFaqId === idx + 1 ? 'text-primary-dark' : 'text-black'}`}>
                        Q. {item.question}
                      </span>
                      <motion.span
                        animate={{ rotate: openFaqId === idx + 1 ? 45 : 0 }}
                        className="text-primary-dark text-xl font-bold flex-shrink-0"
                      >
                        +
                      </motion.span>
                    </div>
                    <AnimatePresence>
                      {openFaqId === idx + 1 && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                        >
                          <div className="px-6 pb-6 pt-0 text-gray-600 text-[15px] leading-relaxed break-keep border-t border-gray-100 mt-[-4px]">
                            <div className="pt-4">
                              {item.answer}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>

            <div id="inquiry-form-section" className="scroll-mt-[120px]">
              <h2 className="text-[48px] md:text-[64px] lg:text-[80px] font-bold mb-6 md:mb-8">{copy.formTitle}</h2>
              <p className="text-[14px] md:text-[15px] lg:text-[16px] text-gray-600 mb-8">
                {copy.formLead}
              </p>

              <div className="">
                <InquiryForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick inquiry cards */}
      <section className="bg-[#EBEBEB] py-12 md:py-20 lg:py-32 border-t border-gray-300">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-[123px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-12">
            {copy.quickCards.map((card) => (
              <div
                key={card.id}
                id={card.id}
                className={`bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-transparent hover:border-primary/20 flex flex-col items-center h-full scroll-mt-[100px] ${card.id === 'business' ? 'sm:col-span-2 lg:col-span-1' : ''}`}
              >
                <h2 className="text-[28px] md:text-[36px] font-bold mb-2 break-keep text-center">{card.title}</h2>
                <p className="text-gray-500 text-[14px] mb-6 text-center">{card.text}</p>
                <div className="flex-grow"></div>
                <a href="#inquiry-form-section" className="w-full mt-auto">
                  <button className="w-full bg-black text-white px-6 py-4 rounded font-bold hover:bg-primary hover:text-black transition-colors duration-300 text-[14px]">
                    {card.button}
                  </button>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* A/S */}
      <section id="as" className="bg-[#EBEBEB] py-12 md:py-20 lg:py-32 border-t border-gray-300 scroll-mt-[100px]">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-[123px]">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 bg-white p-10 md:p-14 rounded-2xl shadow-lg border border-gray-100">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-black text-white px-3 py-1 text-sm font-bold rounded">SUPPORT</span>
                <span className="text-primary font-bold">{copy.asLead}</span>
              </div>
              <h2 className="text-[40px] md:text-[56px] font-bold mb-4 leading-none">{copy.asTitle}</h2>
              <p className="text-[16px] md:text-[18px] text-gray-800 font-bold mb-2">
                {copy.asDesc}
              </p>
            </div>

            <div className="w-full md:w-auto min-w-[320px] bg-gray-50 p-8 rounded-xl border border-gray-200">
              <div className="flex items-center gap-5 mb-6">
                <div className="bg-white p-3 rounded-full shadow-sm border border-gray-100 text-primary">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 16.92V19.92C22.0011 20.1986 21.9441 20.4742 21.8325 20.7294C21.7209 20.9846 21.5573 21.2137 21.3521 21.402C21.1468 21.5902 20.9046 21.7336 20.6407 21.8228C20.3769 21.912 20.0974 21.9452 19.82 21.92C16.7428 21.5857 13.787 20.5342 11.19 18.85C8.77382 17.2436 6.72159 15.161 5.15002 12.71C3.5029 10.0753 2.50022 7.0768 2.18002 3.96996C2.15502 3.69376 2.1878 3.41547 2.27622 3.15286C2.36465 2.89025 2.50682 2.64898 2.69363 2.44456C2.88044 2.24013 3.10787 2.07705 3.36151 1.96564C3.61515 1.85423 3.88942 1.79698 4.16669 1.79724H7.16669C7.65345 1.79373 8.12563 1.96495 8.49504 2.27906C8.86445 2.59316 9.10803 3.03055 9.18002 3.51139C9.31388 4.5269 9.55921 5.52565 9.91002 6.49001C10.0527 6.87979 10.0833 7.30467 9.99757 7.71261C9.91185 8.12056 9.71363 8.4935 9.42767 8.78508L8.15767 10.0701C9.57863 12.5959 11.6444 14.6853 14.1377 16.126L15.3977 14.841C15.6865 14.5518 16.0567 14.3499 16.4633 14.2625C16.8698 14.1751 17.2955 14.206 17.6877 14.351C18.643 14.708 19.6335 14.9575 20.64 15.0932C21.1246 15.1663 21.5653 15.4144 21.8796 15.7892C22.1939 16.164 22.3626 16.643 22.3577 17.135L22 16.92Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">{copy.phoneLabel}</p>
                  <p className="text-2xl font-black text-black">{copy.phone}</p>
                </div>
              </div>
              <div className="border-t border-gray-200 pt-4 mt-2">
                <p className="text-sm text-gray-500 flex justify-between">
                  <span>Usage Hours</span>
                  <span className="font-medium text-gray-700">{copy.hours}</span>
                </p>
                <p className="text-xs text-gray-400 mt-1">{copy.hoursNote}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

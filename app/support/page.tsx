'use client';

import Image from 'next/image';
import InquiryForm from '@/components/support/InquiryForm';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useEffect } from 'react';
import { getFaqs } from '@/app/actions/faq-actions';
import { Faq } from '@/types/supabase';

type Lang = 'KO' | 'EN';

const COPY: Record<Lang, {
  heroTitle: string;
  heroSubtitle: string;
  processTitle: string;
  processDescription: string;
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
    heroTitle: '무엇을 도와드릴까요?',
    heroSubtitle: '위트와 함께하는 모든 순간이 즐거운 경험이 되도록 최선을 다하겠습니다.',
    processTitle: '당신의 집을 짓는 과정',
    processDescription: '첫 상담부터 시공, A/S까지 위트가 함께합니다.',
    steps: [
      { title: '꿈을 그립니다', description: '로망과 요구 사항을 들으며 예산·일정을 함께 설계합니다.' },
      { title: '현장을 확인합니다', description: '부지와 법규를 검토해 최적의 배치와 동선을 제안합니다.' },
      { title: '설계를 완성합니다', description: '합리적인 견적과 일정, 마감 사양을 확정하고 계약합니다.' },
      { title: '제작과 시공을 진행합니다', description: '공장에서 모듈을 제작하고 현장에서 빠르게 설치합니다.' },
      { title: '공간을 완성합니다', description: '운송·설치 후 내부 마감까지 완료해 공간을 인도합니다.' },
      { title: '안심 A/S를 약속합니다', description: '완공 후에도 정기 점검과 케어로 안심을 제공합니다.' },
    ],
    qaTitle: '자주 묻는 질문',
    qaLead: '고객님들이 자주 물어보시는 질문들을 모았습니다.',
    faqs: [
      { question: '공사 기간은 얼마나 걸리나요?', answer: '계약 후 공장 제작 약 4~6주, 현장 설치는 규모에 따라 1~2일 정도 소요됩니다.' },
      { question: '단열과 방음이 잘 되나요?', answer: '철골+경량 목구조, 고성능 단열재로 설계해 일반 주택 수준의 단열·차음을 제공합니다.' },
      { question: '커스터마이징이 가능한가요?', answer: '네. 기본 모델을 바탕으로 예산과 용도에 맞춰 1:1로 조정합니다.' },
      { question: 'A/S 보증 기간은 어떻게 되나요?', answer: '구조는 10년, 마감·설비는 2년 무상 A/S를 제공합니다. 세부 내용은 계약서에 명시됩니다.' },
    ],
    formTitle: '1:1 문의하기',
    formLead: '궁금한 점이 있으시다면 언제든 문의해주세요.',
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
    phone: '0507-1425-0393',
    hours: '09:00 - 18:00',
    hoursNote: '* 주말·공휴일 휴무',
    closeLabel: '닫기',
  },
  EN: {
    heroTitle: 'How can we help?',
    heroSubtitle: 'We strive to make every moment with WEET a delightful experience.',
    processTitle: 'How We Build',
    processDescription: 'From consultation to installation, we are with you.',
    steps: [
      { title: 'Imagine Together', description: 'We listen to your dreams and shape the budget and timeline.' },
      { title: 'Site Analysis', description: 'We suggest the best layout by reviewing land and regulations.' },
      { title: 'Finalize Design', description: 'We confirm specs, schedule, and estimate before signing.' },
      { title: 'Fabricate & Build', description: 'Modules are produced in the factory and installed quickly.' },
      { title: 'Completion', description: 'Transport, installation, and finishing touches.' },
      { title: 'Aftercare', description: 'Regular checks and responsive support ensure peace of mind.' },
    ],
    qaTitle: 'Q/A',
    qaLead: 'Answers to common questions.',
    faqs: [
      { question: 'How long does it take?', answer: 'About 4–6 weeks for production, then 1–2 days for on-site install.' },
      { question: 'What about insulation?', answer: 'Hybrid steel/timber structure provides home-grade thermal and acoustic performance.' },
      { question: 'Can I customize?', answer: 'Yes. heavily customizable to your budget and needs.' },
      { question: 'Warranty?', answer: 'Structure: 10 years. Finishes: 2 years. Details in contract.' },
    ],
    formTitle: 'Inquiry',
    formLead: 'Please leave us a message.',
    quickCards: [
      { id: 'reservation', title: 'Visit Booking', text: 'Showroom / Model House', button: 'Book a visit' },
      { id: 'consultation', title: 'Consultation', text: '1:1 Consultation', button: 'Request consult' },
      { id: 'quote', title: 'Quote Request', text: 'Request a Quote', button: 'Request a quote' },
      { id: 'business', title: 'Business Inquiry', text: 'Business Inquiry', button: 'Contact sales' },
    ],
    asTitle: 'A/S SERVICE',
    asLead: 'WEET CARE',
    asDesc: 'If anything feels off, call us anytime.',
    phoneLabel: 'Customer Center',
    phone: '+82-507-1425-0393',
    hours: '09:00 - 18:00',
    hoursNote: '* Closed weekends & holidays',
    closeLabel: 'Close',
  },
};

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function SupportPage() {
  const [openFaqId, setOpenFaqId] = useState<number | null>(1);
  const [inquiryCategory, setInquiryCategory] = useState("General Inquiry");
  const [dbFaqs, setDbFaqs] = useState<Faq[]>([]);
  const { language } = useLanguage();
  const copy = COPY[language];

  useEffect(() => {
    getFaqs().then(setDbFaqs);
  }, []);

  const faqList = dbFaqs.length > 0
    ? dbFaqs.map(f => ({
      id: f.id,
      question: language === 'KO' ? f.question_ko : (f.question_en || f.question_ko),
      answer: language === 'KO' ? f.answer_ko : (f.answer_en || f.answer_ko)
    }))
    : copy.faqs.map((f, i) => ({ id: i, ...f }));

  const toggleFaq = (id: number) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  const scrollToForm = (category?: string) => {
    if (category) setInquiryCategory(category);
    const el = document.getElementById('inquiry-form');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-black/10">

      {/* Hero Section */}
      <section id="help" className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden scroll-mt-24">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white -z-10" />
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
              {copy.heroTitle}
            </h1>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-lg md:text-xl text-gray-500 leading-relaxed max-w-2xl mx-auto">
              {copy.heroSubtitle}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Quick Access Cards */}
      <section className="px-6 pb-20 md:pb-32">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {copy.quickCards.map((card, idx) => (
              <FadeIn key={card.id} delay={idx * 0.1} className="h-full">
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => scrollToForm(card.title)}
                  className="group h-full bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-start justify-between min-h-[220px] cursor-pointer"
                >
                  <div>
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">{card.title}</h3>
                    <p className="text-gray-400 text-sm font-medium">{card.text}</p>
                  </div>
                  <div className="w-full mt-8 pt-6 border-t border-gray-50 flex items-center justify-between">
                    <span className="font-semibold text-sm">{card.button}</span>
                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-20 md:py-32 bg-gray-50 scroll-mt-24">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <FadeIn>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">{copy.processTitle}</h2>
              <p className="text-gray-500 text-lg md:text-xl">{copy.processDescription}</p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {copy.steps.map((step, idx) => (
              <FadeIn key={idx} delay={idx * 0.1}>
                <div className="bg-white p-8 rounded-3xl h-full flex flex-col shadow-sm hover:shadow-md transition-shadow">
                  <div className="mb-6 relative">
                    <div className="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center font-bold text-lg mb-4">
                      {idx + 1}
                    </div>
                    <div className="aspect-[4/3] relative rounded-2xl overflow-hidden bg-gray-100">
                      <Image
                        src={`/images/support/step${idx + 1}.webp`}
                        alt={step.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-gray-500 leading-relaxed text-sm">
                    {step.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ & Inquiry Section */}
      <section id="qa" className="py-20 md:py-32 px-6 scroll-mt-24">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">

            {/* Left: FAQ */}
            <div className="lg:col-span-7">
              <FadeIn>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">{copy.qaTitle}</h2>
                <p className="text-gray-500 mb-12">{copy.qaLead}</p>
              </FadeIn>

              <div className="space-y-4">
                {faqList.map((faq, idx) => (
                  <FadeIn key={faq.id} delay={idx * 0.05}>
                    <div
                      className={`border rounded-2xl transition-all duration-300 ${openFaqId === faq.id ? 'border-gray-900 bg-gray-50' : 'border-gray-200 hover:border-gray-400'}`}
                    >
                      <button
                        onClick={() => toggleFaq(faq.id)}
                        className="w-full flex items-center justify-between p-6 text-left"
                      >
                        <span className="font-bold text-lg">{faq.question}</span>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${openFaqId === faq.id ? 'bg-gray-900 text-white rotate-45' : 'bg-gray-100 text-gray-900'}`}>
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 0V12M0 6H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                          </svg>
                        </div>
                      </button>
                      <AnimatePresence>
                        {openFaqId === faq.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-6 pt-0 text-gray-600 leading-relaxed whitespace-pre-wrap">
                              {faq.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>

            {/* Right: Inquiry Form */}
            <div id="inquiry-form" className="lg:col-span-5 relative">
              <div className="sticky top-32">
                <FadeIn delay={0.2}>
                  <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-bold px-2 py-1 bg-gray-100 rounded text-gray-500 uppercase tracking-wider">{inquiryCategory}</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">{copy.formTitle}</h2>
                    <p className="text-gray-500">{copy.formLead}</p>
                  </div>
                  <InquiryForm category={inquiryCategory} />
                </FadeIn>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* A/S & Contact Banner */}
      <section id="as" className="px-6 pb-12 md:pb-20 scroll-mt-24">
        <div className="max-w-[1400px] mx-auto">
          <FadeIn>
            <div className="bg-white text-gray-900 rounded-[32px] p-8 md:p-14 border border-gray-100 shadow-2xl shadow-gray-200/50 relative overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10 items-center">
                <div>
                  <div className="inline-block px-4 py-1.5 bg-gray-100 rounded-full text-xs font-bold tracking-wider mb-6 text-gray-500">
                    {copy.asLead}
                  </div>
                  <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">{copy.asTitle}</h2>
                  <p className="text-gray-500 text-lg max-w-md leading-relaxed">
                    {copy.asDesc}
                  </p>
                </div>

                <div className="flex flex-col justify-center">
                  <div className="bg-gray-50 rounded-3xl p-8 md:p-10 border border-gray-100/50">
                    <div className="flex items-center gap-5 mb-8">
                      <div className="w-14 h-14 bg-white text-black rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center shrink-0">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M22 16.92V19.92C22.0011 20.1986 21.9441 20.4742 21.8325 20.7294C21.7209 20.9846 21.5573 21.2137 21.3521 21.402C21.1468 21.5902 20.9046 21.7336 20.6407 21.8228C20.3769 21.912 20.0974 21.9452 19.82 21.92C16.7428 21.5857 13.787 20.5342 11.19 18.85C8.77382 17.2436 6.72159 15.161 5.15002 12.71C3.5029 10.0753 2.50022 7.0768 2.18002 3.96996C2.15502 3.69376 2.1878 3.41547 2.27622 3.15286C2.36465 2.89025 2.50682 2.64898 2.69363 2.44456C2.88044 2.24013 3.10787 2.07705 3.36151 1.96564C3.61515 1.85423 3.88942 1.79698 4.16669 1.79724H7.16669C7.65345 1.79373 8.12563 1.96495 8.49504 2.27906C8.86445 2.59316 9.10803 3.03055 9.18002 3.51139C9.31388 4.5269 9.55921 5.52565 9.91002 6.49001C10.0527 6.87979 10.0833 7.30467 9.99757 7.71261C9.91185 8.12056 9.71363 8.4935 9.42767 8.78508L8.15767 10.0701C9.57863 12.5959 11.6444 14.6853 14.1377 16.126L15.3977 14.841C15.6865 14.5518 16.0567 14.3499 16.4633 14.2625C16.8698 14.1751 17.2955 14.206 17.6877 14.351C18.643 14.708 19.6335 14.9575 20.64 15.0932C21.1246 15.1663 21.5653 15.4144 21.8796 15.7892C22.1939 16.164 22.3626 16.643 22.3577 17.135L22 16.92Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">{copy.phoneLabel}</p>
                        <p className="text-3xl font-bold text-gray-900 tracking-tight">{copy.phone}</p>
                      </div>
                    </div>
                    <div className="border-t border-gray-200 pt-6 flex justify-between items-end">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Operating Hours</p>
                        <p className="text-gray-900 font-medium">{copy.hours}</p>
                      </div>
                      <p className="text-xs text-gray-400">{copy.hoursNote}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

    </div>
  );
}

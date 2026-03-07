'use client';

import { useState, useActionState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Phone, MessageCircle, Mail, Send, MapPin, Clock } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { cn } from '@/lib/utils';
import { supabase } from '@/lib/supabase';
import { COMPANY } from '@/lib/constants';

type FormState = { status: 'idle' | 'success' | 'error'; message: string };

const initialState: FormState = { status: 'idle', message: '' };

async function submitInquiry(_prev: FormState, formData: FormData): Promise<FormState> {
  const category = formData.get('category') as string;
  const name = formData.get('name') as string;
  const phone = formData.get('phone') as string;
  const email = (formData.get('email') as string) || '미입력';
  const message = formData.get('message') as string;

  if (!name || !phone || !message) {
    return { status: 'error', message: '필수 항목을 모두 입력해주세요.' };
  }

  const { error } = await supabase.from('inquiries').insert({
    category,
    name,
    email,
    phone,
    message,
    status: 'new',
  });

  if (error) {
    return { status: 'error', message: '전송 중 문제가 발생했어요. 잠시 후 다시 시도해주세요.' };
  }

  return { status: 'success', message: '문의가 접수되었어요! 빠르게 연락드릴게요 :)' };
}

const contactCards = [
  {
    icon: Phone,
    title: '전화 상담',
    desc: COMPANY.phone,
    href: COMPANY.phoneHref,
    cta: '전화하기',
  },
  {
    icon: MessageCircle,
    title: '카카오톡 상담',
    desc: '실시간 채팅 상담',
    href: '#kakao',
    cta: '카카오톡으로 물어보기',
  },
  {
    icon: Mail,
    title: '이메일 문의',
    desc: COMPANY.email,
    href: COMPANY.emailHref,
    cta: '이메일 보내기',
  },
];

const faqItems = [
  {
    q: '모듈러 건축은 얼마나 튼튼한가요?',
    a: '철골+목재 하이브리드 구조로 일반 주택과 동일한 내진 성능을 갖추고 있어요. 구조 내구성은 50년 이상입니다.',
  },
  {
    q: '공사 기간은 얼마나 걸리나요?',
    a: '모델에 따라 3주~3개월. 공장 제작과 현장 설치를 병행해 일반 건축 대비 70% 빠릅니다.',
  },
  {
    q: '가격은 얼마인가요?',
    a: '모델과 옵션에 따라 다르지만, 기본 모델 기준으로 상담을 통해 맞춤 견적을 안내드려요. 거품 없는 합리적 가격을 약속합니다.',
  },
  {
    q: 'A/S는 어떻게 되나요?',
    a: '구조 10년, 마감·설비 2년 무상 A/S. 이후에도 유상 케어 서비스를 제공합니다.',
  },
  {
    q: '토지가 없어도 되나요?',
    a: '토지가 있으시면 가장 좋지만, 토지 관련 상담도 함께 도와드리고 있어요.',
  },
  {
    q: '체류형 쉼터도 만들 수 있나요?',
    a: '네! 33㎡ 이하 체류형 쉼터도 제작 가능합니다. 건축 허가 없이 설치할 수 있어요.',
  },
];

const inquiryCategories = ['일반 문의', '견적 문의', '시공 문의', 'A/S 문의', '기타'];

export default function SupportRedesignPage() {
  const [openFaq, setOpenFaq] = useState<number[]>([]);
  const [state, formAction, isPending] = useActionState(submitInquiry, initialState);

  const toggleFaq = (idx: number) => {
    setOpenFaq((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[40vh] items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4">
        <div className="relative text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-white md:text-6xl"
          >
            궁금한 거 다 물어보세요
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-4 text-lg text-white/60 md:text-xl"
          >
            위트가 친절하게 답해드릴게요
          </motion.p>
        </div>
      </section>

      {/* Quick Contact */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {contactCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <ScrollReveal key={card.title} delay={i * 0.1}>
                  <a
                    href={card.href}
                    className="group flex flex-col items-center rounded-2xl border border-gray-200 bg-white p-6 text-center transition-all hover:border-[#FEBD16]/50 hover:shadow-md"
                  >
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#FEBD16]/10">
                      <Icon className="h-6 w-6 text-[#FEBD16]" aria-hidden="true" />
                    </div>
                    <h3 className="font-bold text-gray-900">{card.title}</h3>
                    <p className="mt-1 text-sm text-gray-500">{card.desc}</p>
                    <span className="mt-3 inline-flex min-h-[44px] items-center text-sm font-medium text-[#FEBD16] transition-colors group-hover:text-[#E5A410]">
                      {card.cta} →
                    </span>
                  </a>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50 py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-4">
          <ScrollReveal>
            <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 md:text-4xl">
              자주 묻는 질문
            </h2>
          </ScrollReveal>
          <div className="space-y-0">
            {faqItems.map((item, idx) => (
              <ScrollReveal key={item.q} delay={idx * 0.05}>
                <div className="border-b border-gray-200">
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="flex w-full items-center justify-between py-5 text-left min-h-[44px]"
                  >
                    <span className="pr-4 font-medium text-gray-900">{item.q}</span>
                    <ChevronDown
                      className={cn(
                        'h-5 w-5 flex-shrink-0 text-gray-400 transition-transform duration-200',
                        openFaq.includes(idx) && 'rotate-180'
                      )}
                    />
                  </button>
                  <AnimatePresence>
                    {openFaq.includes(idx) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <p className="pb-5 text-sm leading-relaxed text-gray-600">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-2xl px-4">
          <ScrollReveal>
            <h2 className="mb-2 text-center text-3xl font-bold text-gray-900 md:text-4xl">
              1:1 문의하기
            </h2>
            <p className="mb-10 text-center text-gray-500">
              편하게 남겨주시면 빠르게 연락드릴게요
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <form
              action={formAction}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8"
            >
              <div className="space-y-5">
                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium text-gray-700">문의 유형</span>
                  <select
                    name="category"
                    defaultValue="일반 문의"
                    className="min-h-[44px] w-full rounded-xl border border-gray-300 bg-white px-4 py-2 text-base outline-none transition focus:border-[#FEBD16]"
                  >
                    {inquiryCategories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium text-gray-700">
                    이름 <span className="text-red-400">*</span>
                  </span>
                  <input
                    required
                    type="text"
                    name="name"
                    className="min-h-[44px] w-full rounded-xl border border-gray-300 px-4 py-2 text-base outline-none transition focus:border-[#FEBD16]"
                  />
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium text-gray-700">
                    연락처 <span className="text-red-400">*</span>
                  </span>
                  <input
                    required
                    type="tel"
                    name="phone"
                    placeholder="010-0000-0000"
                    className="min-h-[44px] w-full rounded-xl border border-gray-300 px-4 py-2 text-base outline-none transition focus:border-[#FEBD16]"
                  />
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium text-gray-700">이메일</span>
                  <input
                    type="email"
                    name="email"
                    className="min-h-[44px] w-full rounded-xl border border-gray-300 px-4 py-2 text-base outline-none transition focus:border-[#FEBD16]"
                  />
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium text-gray-700">
                    문의 내용 <span className="text-red-400">*</span>
                  </span>
                  <textarea
                    required
                    name="message"
                    rows={4}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-base outline-none transition focus:border-[#FEBD16]"
                  />
                </label>
              </div>

              {state.status === 'error' && (
                <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {state.message}
                </div>
              )}

              {state.status === 'success' && (
                <div className="mt-4 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                  {state.message}
                </div>
              )}

              <button
                type="submit"
                disabled={isPending || state.status === 'success'}
                className="mt-6 inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full bg-[#FEBD16] px-8 py-3.5 font-semibold text-black transition-colors hover:bg-[#E5A410] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Send className="h-4 w-4" aria-hidden="true" />
                {isPending ? '전송 중...' : '문의하기'}
              </button>
            </form>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact Footer */}
      <section className="bg-gray-900 py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4">
          <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3">
            <div>
              <MapPin className="mx-auto mb-3 h-6 w-6 text-[#FEBD16]" aria-hidden="true" />
              <p className="text-sm text-white/40">주소</p>
              <p className="mt-1 text-sm text-white">{COMPANY.address}</p>
            </div>
            <div>
              <Phone className="mx-auto mb-3 h-6 w-6 text-[#FEBD16]" aria-hidden="true" />
              <p className="text-sm text-white/40">전화</p>
              <a
                href={COMPANY.phoneHref}
                className="mt-1 inline-flex min-h-[44px] items-center text-sm text-white hover:text-[#FEBD16] transition-colors"
              >
                {COMPANY.phone}
              </a>
            </div>
            <div>
              <Clock className="mx-auto mb-3 h-6 w-6 text-[#FEBD16]" aria-hidden="true" />
              <p className="text-sm text-white/40">운영시간</p>
              <p className="mt-1 text-sm text-white">09:00 - 18:00</p>
              <p className="mt-0.5 text-xs text-white/30">주말·공휴일 휴무</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

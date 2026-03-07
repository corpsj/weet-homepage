'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FileCheck, Ruler, Zap, ChevronDown, Phone } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { CountUp } from '@/components/ui/CountUp';
import { WittyTooltip } from '@/components/ui/WittyTooltip';
import { COMPANY } from '@/lib/constants';
import { cn } from '@/lib/utils';

const benefits = [
  { icon: FileCheck, title: '건축 허가 불필요', desc: '체류형 쉼터는 별도 건축 허가 없이 설치 가능' },
  { icon: Ruler, title: '33㎡ 이하', desc: '법적 기준 내 컴팩트한 공간' },
  { icon: Zap, title: '빠른 설치', desc: '최소 3주 만에 설치 완료' },
];

const benefitTooltips: Record<string, string> = {
  '건축 허가 불필요': '33㎡ 이하 농지 체류형 쉼터 기준',
  '33㎡ 이하': '약 10평, 넉넉한 원룸 크기',
  '빠른 설치': '공장 제작 후 현장 설치까지',
};

const whyWeet = [
  { stat: 3, suffix: '주', label: '만에 설치 완료', desc: '공장 제작 후 현장 설치까지' },
  { stat: 100, suffix: '%', label: '올인원 패키지', desc: '전기, 수도, 난방 포함' },
  { stat: 0, suffix: '', label: '맞춤 설계 가능', desc: '원하는 구조와 마감으로' },
];

const models = [
  { category: 'S', name: '3X6 집', area: '5.4평 (17.8㎡)', price: '1,800만원~', features: ['원룸 구조', '화장실 포함', '주방 선택'] },
  { category: 'M', name: '3X9 집', area: '8.1평 (26.7㎡)', price: '2,800만원~', features: ['1~2룸 가능', '넉넉한 수납', '테라스 옵션'] },
];

const faqItems = [
  { q: '체류형 쉼터 설치 조건은?', a: '농지 위에 설치하며, 33㎡(약 10평) 이하 규모여야 합니다. 농업진흥지역 외 농지에 설치 가능하며, 관할 시·군·구청에 신고하시면 됩니다.' },
  { q: '설치 기간은 얼마나 걸리나요?', a: '모델에 따라 3주~2개월 정도 소요됩니다. 공장에서 제작 후 현장에서 설치하기 때문에 일반 건축보다 훨씬 빠릅니다.' },
  { q: '가격은 어떻게 되나요?', a: 'S 모델 1,800만원부터 시작합니다. 선택하시는 옵션과 마감재에 따라 달라질 수 있으니, 맞춤 견적을 받아보세요.' },
  { q: '전기/수도 연결은 어떻게 하나요?', a: '기본 배관 및 전기 배선이 포함되어 있습니다. 현장 상황에 따라 외부 인입 공사가 추가될 수 있습니다.' },
  { q: '허가가 정말 필요 없나요?', a: '체류형 쉼터는 건축법상 건축물이 아닌 임시 시설로 분류되어 건축 허가가 필요하지 않습니다. 다만 농지전용 신고 등 관련 절차는 필요할 수 있습니다.' },
];

export default function ShelterPage() {
  const [openFaq, setOpenFaq] = useState<number[]>([]);

  const toggleFaq = (idx: number) => {
    setOpenFaq((prev) => prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]);
  };

  return (
    <>
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center bg-gradient-to-br from-green-900 via-gray-900 to-gray-900">
        <div className="relative text-center px-4 max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold text-white mb-4"
          >
            체류형 쉼터, 이렇게 쉬워도 되나요?
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-lg md:text-xl text-white/60 mb-8"
          >
            규제 완화로 더 쉬워진 나만의 공간
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            <Link href="#consultation" className="inline-flex items-center justify-center bg-[#FEBD16] text-black font-semibold px-8 py-3.5 rounded-full min-h-[44px] hover:bg-[#E5A410] transition-colors">
              상담 받기
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">체류형 쉼터란?</h2>
            <p className="text-center text-gray-500 mb-12 max-w-2xl mx-auto">
              농지에 설치 가능한 33㎡ 이하 임시 거주 시설로, 건축 허가 없이 빠르게 나만의 공간을 만들 수 있어요.
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {benefits.map((b) => {
              const Icon = b.icon;
              return (
                <ScrollReveal key={b.title}>
                  <div className="bg-gray-50 rounded-2xl p-8 text-center hover:shadow-md transition-shadow">
                    <div className="w-14 h-14 bg-[#FEBD16]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-7 h-7 text-[#FEBD16]" aria-hidden="true" />
                    </div>
                    <WittyTooltip text={benefitTooltips[b.title]}>
                      <h3 className="font-bold text-lg text-gray-900 mb-2">{b.title}</h3>
                    </WittyTooltip>
                    <p className="text-gray-500 text-sm">{b.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">위트 체류형 쉼터가 다른 이유</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyWeet.map((item, i) => (
              <ScrollReveal key={item.label} delay={i * 0.1}>
                <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
                  {item.stat > 0 && (
                    <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                      <CountUp end={item.stat} suffix={item.suffix} />
                    </div>
                  )}
                  <h3 className="font-bold text-lg text-gray-900 mb-1">{item.label}</h3>
                  <p className="text-gray-500 text-sm">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">추천 모델</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {models.map((m) => (
              <ScrollReveal key={m.category}>
                <div className="border border-gray-200 rounded-2xl p-8 hover:border-[#FEBD16]/50 hover:shadow-md transition-all">
                  <div className="inline-block bg-[#FEBD16] text-black font-bold text-sm px-3 py-1 rounded-full mb-4">{m.category}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">{m.name}</h3>
                  <p className="text-gray-500 mb-2">{m.area}</p>
                  <p className="text-xl font-semibold text-gray-900 mb-4">{m.price}</p>
                  <ul className="space-y-2 mb-6">
                    {m.features.map((f) => (
                      <li key={f} className="text-sm text-gray-600 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-[#FEBD16] rounded-full flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href={`/products#${m.category.toLowerCase()}`} className="text-[#FEBD16] hover:text-[#E5A410] font-medium text-sm transition-colors">
                    자세히 보기 →
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">자주 묻는 질문</h2>
          </ScrollReveal>
          <div className="space-y-0">
            {faqItems.map((item, idx) => (
              <div key={idx} className="border-b border-gray-200">
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between py-5 text-left min-h-[44px]"
                >
                  <span className="font-medium text-gray-900 pr-4">{item.q}</span>
                  <ChevronDown className={cn('w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-200', openFaq.includes(idx) && 'rotate-180')} />
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
                      <p className="pb-5 text-gray-600 text-sm leading-relaxed">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="consultation" className="py-24 md:py-32 bg-gray-900">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">지금 체류형 쉼터 상담받기</h2>
          <p className="text-white/60 mb-8">편하게 문의주시면, 맞춤 상담을 도와드릴게요</p>
          <Link href="#consultation" className="inline-flex items-center justify-center bg-[#FEBD16] text-black font-semibold px-8 py-3.5 rounded-full min-h-[44px] hover:bg-[#E5A410] transition-colors mb-4">
            상담 신청하기
          </Link>
          <div className="flex items-center justify-center gap-2 text-white/40">
            <Phone className="w-4 h-4" aria-hidden="true" />
            <a href={COMPANY.phoneHref} className="hover:text-white/70 transition-colors min-h-[44px] inline-flex items-center">{COMPANY.phone}</a>
          </div>
        </div>
      </section>
    </>
  );
}

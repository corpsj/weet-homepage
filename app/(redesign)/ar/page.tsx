'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Camera, Smartphone, MapPin, ArrowRight, Info } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

const models = [
  { code: 'S', name: '3X6 집', area: '약 5평' },
  { code: 'M', name: '3X9 집', area: '약 8평' },
  { code: 'L', name: '18평 주택', area: '가족형' },
  { code: 'XL', name: '30평 주택', area: '프리미엄' },
];

const steps = [
  { icon: Smartphone, title: '모델 선택', desc: '배치해볼 모델을 선택하세요' },
  { icon: Camera, title: '카메라 허용', desc: '카메라로 주변 환경을 인식합니다' },
  { icon: MapPin, title: '터치로 배치', desc: '원하는 위치에 터치하면 모델이 배치됩니다' },
];

export default function ARPage() {
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [showAR, setShowAR] = useState(false);

  const handleLaunchAR = () => {
    if (selectedModel) {
      setShowAR(true);
    }
  };

  return (
    <>
      <section className="relative flex min-h-[50vh] items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900/30 to-gray-900 px-4">
        <div className="relative text-center max-w-2xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FEBD16]/20"
          >
            <Camera className="h-8 w-8 text-[#FEBD16]" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl font-bold text-white md:text-5xl"
          >
            내 땅에 놓아보기
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-lg text-white/60"
          >
            AR로 위트 모듈러 하우스를 미리 배치해보세요
          </motion.p>
        </div>
      </section>

      {!showAR ? (
        <>
          <section className="py-16 md:py-20">
            <div className="mx-auto max-w-3xl px-4">
              <ScrollReveal>
                <h2 className="mb-8 text-center text-2xl font-bold text-gray-900 md:text-3xl">
                  이용 방법
                </h2>
              </ScrollReveal>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {steps.map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <ScrollReveal key={s.title} delay={i * 0.1}>
                      <div className="flex flex-col items-center rounded-2xl bg-gray-50 p-6 text-center">
                        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#FEBD16]/10">
                          <Icon className="h-6 w-6 text-[#FEBD16]" aria-hidden="true" />
                        </div>
                        <span className="mb-1 text-xs font-semibold text-[#FEBD16]">STEP {i + 1}</span>
                        <h3 className="font-bold text-gray-900">{s.title}</h3>
                        <p className="mt-1 text-sm text-gray-500">{s.desc}</p>
                      </div>
                    </ScrollReveal>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="bg-gray-50 py-16 md:py-20">
            <div className="mx-auto max-w-2xl px-4">
              <ScrollReveal>
                <h2 className="mb-8 text-center text-2xl font-bold text-gray-900 md:text-3xl">
                  배치할 모델을 선택하세요
                </h2>
              </ScrollReveal>
              <div className="grid grid-cols-2 gap-4">
                {models.map((m) => (
                  <button
                    key={m.code}
                    type="button"
                    onClick={() => setSelectedModel(m.code)}
                    className={`min-h-[44px] rounded-2xl border p-4 text-left transition-all ${
                      selectedModel === m.code
                        ? 'border-[#FEBD16] bg-[#FEBD16]/5 ring-2 ring-[#FEBD16]'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">{m.code}</span>
                    <p className="mt-1 font-bold text-gray-900">{m.name}</p>
                    <p className="text-sm text-gray-500">{m.area}</p>
                  </button>
                ))}
              </div>

              <div className="mt-8 text-center">
                <button
                  type="button"
                  onClick={handleLaunchAR}
                  disabled={!selectedModel}
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[#FEBD16] px-8 py-3.5 font-semibold text-black transition-colors hover:bg-[#E5A410] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Camera className="h-5 w-5" /> AR 체험 시작
                </button>
              </div>

              <div className="mt-6 flex items-start gap-2 rounded-xl bg-blue-50 p-4 text-sm text-blue-700">
                <Info className="mt-0.5 h-4 w-4 flex-shrink-0" />
                <p>
                  AR 체험은 카메라가 있는 모바일 기기에서 최적으로 작동합니다.
                  iOS Safari 또는 Android Chrome을 권장합니다.
                </p>
              </div>
            </div>
          </section>
        </>
      ) : (
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-2xl px-4 text-center">
            <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900">
              <div className="flex h-full flex-col items-center justify-center p-8">
                <Camera className="mb-4 h-16 w-16 text-gray-600" />
                <p className="text-lg font-bold text-white">AR 뷰어 준비 중</p>
                <p className="mt-2 text-sm text-gray-400">
                  선택 모델: {models.find((m) => m.code === selectedModel)?.name}
                </p>
                <p className="mt-4 text-xs text-gray-500">
                  WebAR 엔진(MindAR.js)이 곧 연동됩니다
                </p>
              </div>
            </div>
            <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <button
                type="button"
                onClick={() => setShowAR(false)}
                className="inline-flex min-h-[44px] items-center rounded-full border border-gray-300 px-6 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
              >
                모델 다시 선택
              </button>
              <Link
                href="/support-v2"
                className="inline-flex min-h-[44px] items-center gap-1 rounded-full bg-[#FEBD16] px-6 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-[#E5A410]"
              >
                상담 신청 <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

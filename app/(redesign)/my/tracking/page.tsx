'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, CheckCircle2, Circle, Clock, Phone } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { cn } from '@/lib/utils';
import { useTrackingRealtime } from '@/lib/tracking-realtime';
import { COMPANY } from '@/lib/constants';

type TrackingStep = {
  label: string;
  desc: string;
  status: 'done' | 'current' | 'pending';
};

const demoSteps: TrackingStep[] = [
  { label: '상담 완료', desc: '요구사항 확인 및 현장 방문 완료', status: 'done' },
  { label: '설계 확정', desc: '도면 및 견적 확정', status: 'done' },
  { label: '공장 제작', desc: '모듈 제작 진행 중', status: 'current' },
  { label: '운송', desc: '현장으로 모듈 운송', status: 'pending' },
  { label: '현장 설치', desc: '크레인 설치 및 조립', status: 'pending' },
  { label: '마감 공사', desc: '내외부 마감 작업', status: 'pending' },
  { label: '입주', desc: '최종 점검 후 인도', status: 'pending' },
];

export default function TrackingPage() {
  const [code, setCode] = useState('');
  const [isTracking, setIsTracking] = useState(false);
  const [searchedCode, setSearchedCode] = useState<string | null>(null);
  const {
    tracking: realtimeTracking,
    loading: realtimeLoading,
    error: realtimeError,
  } = useTrackingRealtime(searchedCode);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedCode = code.trim();
    if (trimmedCode) {
      setSearchedCode(trimmedCode);
      setIsTracking(true);
    }
  };

  const steps: TrackingStep[] = realtimeTracking?.steps ?? demoSteps;
  const currentIdx = steps.findIndex((s) => s.status === 'current');
  const progressPercent = currentIdx >= 0 ? ((currentIdx + 0.5) / steps.length) * 100 : 0;

  return (
    <>
      <section className="relative flex min-h-[40vh] items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 px-4">
        <div className="relative text-center max-w-xl w-full">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-white md:text-5xl"
          >
            내 집, 어디까지 왔을까?
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-3 text-white/60"
          >
            주문번호를 입력하면 시공 현황을 확인할 수 있어요
          </motion.p>

          <motion.form
            onSubmit={handleSearch}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-8 flex gap-2"
          >
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="주문번호 입력 (예: WEET-2026-001)"
              className="min-h-[44px] flex-1 rounded-full border border-gray-600 bg-gray-800/50 px-5 text-white placeholder:text-gray-500 outline-none transition focus:border-[#FEBD16]"
            />
            <button
              type="submit"
              className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full bg-[#FEBD16] px-5 font-semibold text-black transition-colors hover:bg-[#E5A410]"
            >
              <Search className="h-5 w-5" aria-hidden="true" />
              <span className="sr-only">조회</span>
            </button>
          </motion.form>
        </div>
      </section>

      {isTracking && (
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-3xl px-4">
            <ScrollReveal>
              <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-gray-400">주문번호</p>
                    <p className="mt-1 text-lg font-bold text-gray-900">{searchedCode ?? code}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-medium uppercase tracking-wider text-gray-400">현재 단계</p>
                    <p className="mt-1 font-semibold text-[#FEBD16]">
                      {steps.find((s) => s.status === 'current')?.label ?? '확인 중'}
                    </p>
                  </div>
                </div>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-gray-100">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="h-full rounded-full bg-[#FEBD16]"
                  />
                </div>
                {realtimeLoading && (
                  <p className="mt-3 text-xs text-gray-400">실시간 현황을 불러오는 중입니다...</p>
                )}
                {realtimeError && (
                  <p className="mt-2 text-xs text-gray-500">{realtimeError} 데모 진행 현황으로 안내해드릴게요.</p>
                )}
              </div>
            </ScrollReveal>

            <div className="space-y-0">
              {steps.map((step, idx) => {
                const Icon = step.status === 'done' ? CheckCircle2 : step.status === 'current' ? Clock : Circle;
                return (
                  <ScrollReveal key={step.label} delay={idx * 0.05}>
                    <div className="flex gap-4 py-4">
                      <div className="flex flex-col items-center">
                        <div
                          className={cn(
                            'flex h-8 w-8 items-center justify-center rounded-full',
                            step.status === 'done' && 'bg-green-100 text-green-600',
                            step.status === 'current' && 'bg-[#FEBD16]/20 text-[#FEBD16]',
                            step.status === 'pending' && 'bg-gray-100 text-gray-300'
                          )}
                        >
                          <Icon className="h-4 w-4" />
                        </div>
                        {idx < steps.length - 1 && (
                          <div
                            className={cn(
                              'mt-1 h-full w-px flex-1',
                              step.status === 'done' ? 'bg-green-200' : 'bg-gray-100'
                            )}
                          />
                        )}
                      </div>
                      <div className="pb-4">
                        <p
                          className={cn(
                            'font-medium',
                            step.status === 'done' && 'text-gray-900',
                            step.status === 'current' && 'font-bold text-gray-900',
                            step.status === 'pending' && 'text-gray-400'
                          )}
                        >
                          {step.label}
                          {step.status === 'current' && (
                            <span className="ml-2 inline-block rounded-full bg-[#FEBD16]/10 px-2 py-0.5 text-xs font-semibold text-[#FEBD16]">
                              진행 중
                            </span>
                          )}
                        </p>
                        <p className="mt-0.5 text-sm text-gray-500">{step.desc}</p>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>

            <ScrollReveal delay={0.3}>
              <div className="mt-8 rounded-2xl bg-gray-50 p-6 text-center">
                <p className="text-sm text-gray-500">
                  궁금한 점이 있으시면 담당자에게 직접 문의하세요
                </p>
                <a
                  href={COMPANY.phoneHref}
                  className="mt-3 inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-gray-900 hover:text-[#FEBD16] transition-colors"
                >
                  <Phone className="h-4 w-4" /> {COMPANY.phone}
                </a>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {!isTracking && (
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-2xl px-4 text-center">
            <ScrollReveal>
              <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-12">
                <Clock className="mx-auto h-12 w-12 text-gray-300" />
                <p className="mt-4 text-gray-500">
                  주문번호를 입력하시면 시공 현황이 여기에 표시됩니다
                </p>
                <p className="mt-2 text-sm text-gray-400">
                  주문번호는 계약 시 안내받으신 번호입니다
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}
    </>
  );
}

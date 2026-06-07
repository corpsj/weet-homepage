'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { ChevronDown, Loader2, Save, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  deleteCustomizeConsultation,
  updateCustomizeConsultationMemo,
  updateCustomizeConsultationStatus,
} from '@/app/actions/customize-actions';
import { formatWon } from '@/lib/customize/priceCalculator';
import type { ConsultationStatus, CustomizeConsultation } from '@/lib/customize/types';
import {
  ConsoleMetricCard,
  ConsolePageHeader,
  ConsolePanel,
  ConsoleStatusPill,
  consoleSelectClass,
} from '@/components/admin/ConsolePrimitives';

interface ConsultationManagerProps {
  consultations: CustomizeConsultation[];
  count: number;
}

const STATUSES: ConsultationStatus[] = ['신규', '진행중', '완료', '보류'];

const statusTone = (status: ConsultationStatus): 'neutral' | 'success' | 'warning' | 'danger' | 'dark' => {
  switch (status) {
    case '신규':
      return 'warning';
    case '진행중':
      return 'dark';
    case '완료':
      return 'success';
    case '보류':
      return 'neutral';
    default:
      return 'neutral';
  }
};

const getAgeMinutes = (createdAt: string) => {
  const time = Date.parse(createdAt);
  if (Number.isNaN(time)) return 0;
  return Math.max(0, Math.floor((Date.now() - time) / 60000));
};

const formatAge = (minutes: number) => {
  if (minutes < 60) return `${minutes}분`;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return rest > 0 ? `${hours}시간 ${rest}분` : `${hours}시간`;
};

export default function ConsultationManager({ consultations, count }: ConsultationManagerProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [memos, setMemos] = useState<Record<string, string>>(() =>
    Object.fromEntries(consultations.map((item) => [item.id, item.internalMemo ?? '']))
  );

  const runAction = (label: string, action: () => Promise<unknown>) => {
    startTransition(async () => {
      try {
        await action();
        toast.success(`${label} 완료`);
        router.refresh();
      } catch (error) {
        toast.error(error instanceof Error ? error.message : `${label} 실패`);
      }
    });
  };
  const summary = consultations.reduce(
    (current, item) => {
      current[item.status] += 1;
      if (item.status !== '완료' && getAgeMinutes(item.createdAt) >= 120) current.slaRisk += 1;
      return current;
    },
    { 신규: 0, 진행중: 0, 완료: 0, 보류: 0, slaRisk: 0 } as Record<ConsultationStatus, number> & { slaRisk: number }
  );

  return (
    <div className="space-y-6">
      <ConsolePageHeader
        eyebrow="CONSULTATION SLA"
        title={`상담 관리 · ${count.toLocaleString('ko-KR')}건`}
        description="주문 상담을 최신순으로 확인하고, 2시간 이상 미처리된 요청을 먼저 처리합니다."
        actions={
          <div className="flex h-10 items-center gap-2 text-sm font-bold text-gray-500">
            {isPending && <Loader2 className="h-5 w-5 animate-spin text-gray-500" />}
            <span>상태 저장 대기열</span>
          </div>
        }
      />

      <div className="grid gap-3 md:grid-cols-4">
        <ConsoleMetricCard label="신규" value={summary.신규.toLocaleString('ko-KR')} caption="먼저 배정할 상담" tone={summary.신규 > 0 ? 'accent' : 'neutral'} />
        <ConsoleMetricCard label="진행중" value={summary.진행중.toLocaleString('ko-KR')} caption="후속 통화 필요" tone="dark" />
        <ConsoleMetricCard label="SLA 위험" value={summary.slaRisk.toLocaleString('ko-KR')} caption="2시간 이상 미처리" tone={summary.slaRisk > 0 ? 'warning' : 'neutral'} />
        <ConsoleMetricCard label="완료" value={summary.완료.toLocaleString('ko-KR')} caption="처리 완료 상담" />
      </div>

      <ConsolePanel>
        <div className="hidden grid-cols-[110px_1fr_140px_150px_1.2fr_120px_150px] gap-4 border-b border-[#e5e5df] bg-[#fbfbfa] px-4 py-3 text-xs font-bold text-gray-500 lg:grid">
          <span>상태</span>
          <span>이름</span>
          <span>연락처</span>
          <span>지역</span>
          <span>메모</span>
          <span>SLA</span>
          <span>생성일</span>
        </div>

        {consultations.length === 0 ? (
          <div className="p-10 text-center text-sm text-gray-500">등록된 상담 요청이 없습니다.</div>
        ) : (
          consultations.map((item) => {
            const ageMinutes = getAgeMinutes(item.createdAt);
            const isSlaRisk = item.status !== '완료' && ageMinutes >= 120;

            return (
            <div key={item.id} className="border-b border-[#f0f0ec] last:border-b-0">
              <div className="grid gap-3 px-4 py-4 text-sm lg:grid-cols-[110px_1fr_140px_150px_1.2fr_120px_150px] lg:items-center lg:gap-4">
                <div className="flex items-center justify-between gap-3 lg:block">
                  <span className="text-xs font-bold uppercase text-gray-400 lg:hidden">상태</span>
                  <select
                    value={item.status}
                    onChange={(event) => runAction('상태 변경', () => updateCustomizeConsultationStatus(item.id, event.target.value as ConsultationStatus))}
                    className={`${consoleSelectClass} w-32 lg:w-full`}
                  >
                    {STATUSES.map((status) => <option key={status} value={status}>{status}</option>)}
                  </select>
                </div>
                <div>
                  <span className="mb-1 block text-xs font-bold uppercase text-gray-400 lg:hidden">이름</span>
                  <strong className="text-gray-950">{item.customerName}</strong>
                </div>
                <div>
                  <span className="mb-1 block text-xs font-bold uppercase text-gray-400 lg:hidden">연락처</span>
                  <span>{item.phone}</span>
                </div>
                <div>
                  <span className="mb-1 block text-xs font-bold uppercase text-gray-400 lg:hidden">지역</span>
                  <span>{item.region}</span>
                </div>
                <div className="min-w-0">
                  <span className="mb-1 block text-xs font-bold uppercase text-gray-400 lg:hidden">메모</span>
                  <span className="block truncate text-gray-600">{item.memo || '-'}</span>
                </div>
                <div>
                  <span className="mb-1 block text-xs font-bold uppercase text-gray-400 lg:hidden">SLA</span>
                  <ConsoleStatusPill tone={isSlaRisk ? 'danger' : statusTone(item.status)}>
                    {isSlaRisk ? 'SLA 위험' : formatAge(ageMinutes)}
                  </ConsoleStatusPill>
                </div>
                <div>
                  <span className="mb-1 block text-xs font-bold uppercase text-gray-400 lg:hidden">생성일</span>
                  <span className="text-gray-500">{new Date(item.createdAt).toLocaleString('ko-KR')}</span>
                </div>
              </div>

              <details className="group px-4 pb-4">
                <summary className="flex cursor-pointer items-center gap-2 rounded-md border border-[#e5e5df] bg-[#f4f4f1] px-4 py-3 text-sm font-bold text-gray-700">
                  상세 정보
                  <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
                </summary>
                <div className="grid gap-5 border-x border-b border-[#e5e5df] p-4 lg:grid-cols-[0.8fr_1fr]">
                  <div className="space-y-3 text-sm">
                    <InfoRow label="구매 시기" value={item.purchaseTimeline} />
                    <InfoRow label="지목" value={item.landType} />
                    <InfoRow label="설치 주소" value={item.installAddress} />
                    <InfoRow label="예산" value={item.budgetRange} />
                    <InfoRow label="예상 총액" value={formatWon(item.estimatedTotal)} />
                    <InfoRow label="구성 URL" value={item.configQuery ? `/customize?c=${item.configQuery}` : null} />
                  </div>

                  <div className="space-y-4">
                    <details className="rounded-md border border-[#e5e5df]">
                      <summary className="cursor-pointer px-4 py-3 text-sm font-bold">구성 snapshot</summary>
                      <pre className="max-h-72 overflow-auto border-t border-[#e5e5df] bg-gray-950 p-4 text-xs text-gray-100">
                        {JSON.stringify(item.configSnapshot, null, 2)}
                      </pre>
                    </details>

                    <div>
                      <label className="mb-2 block text-sm font-bold text-gray-700">내부 메모</label>
                      <textarea
                        value={memos[item.id] ?? ''}
                        onChange={(event) => setMemos((current) => ({ ...current, [item.id]: event.target.value }))}
                        className="min-h-24 w-full rounded-md border border-[#d8d8d2] bg-[#fbfbfa] p-3 text-sm outline-none focus:ring-2 focus:ring-black/20"
                      />
                      <div className="mt-3 flex flex-col justify-between gap-3 sm:flex-row">
                        <Button variant="outline" onClick={() => runAction('내부 메모 저장', () => updateCustomizeConsultationMemo(item.id, memos[item.id] ?? ''))}>
                          <Save className="h-4 w-4" />
                          메모 저장
                        </Button>
                        <Button variant="danger" onClick={() => runAction('상담 삭제', () => deleteCustomizeConsultation(item.id))}>
                          <Trash2 className="h-4 w-4" />
                          삭제
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </details>
            </div>
            );
          })
        )}
      </ConsolePanel>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string | null }) {
  return (
    <div className="grid grid-cols-[90px_1fr] gap-3">
      <span className="font-bold text-gray-500">{label}</span>
      <span className="break-all text-gray-900">{value || '-'}</span>
    </div>
  );
}

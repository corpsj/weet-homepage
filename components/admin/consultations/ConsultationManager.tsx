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

interface ConsultationManagerProps {
  consultations: CustomizeConsultation[];
  count: number;
}

const STATUSES: ConsultationStatus[] = ['신규', '진행중', '완료', '보류'];

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

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-950">상담 관리</h1>
          <p className="mt-1 text-sm text-gray-500">신규 주문 상담 {count.toLocaleString('ko-KR')}건을 최신순으로 확인합니다.</p>
        </div>
        {isPending && <Loader2 className="h-5 w-5 animate-spin text-gray-500" />}
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
        <div className="grid grid-cols-[110px_1fr_140px_150px_1.2fr_160px] gap-4 border-b border-gray-200 bg-gray-50 px-4 py-3 text-xs font-bold uppercase text-gray-500">
          <span>상태</span>
          <span>이름</span>
          <span>연락처</span>
          <span>지역</span>
          <span>메모</span>
          <span>생성일</span>
        </div>

        {consultations.length === 0 ? (
          <div className="p-10 text-center text-sm text-gray-500">등록된 상담 요청이 없습니다.</div>
        ) : (
          consultations.map((item) => (
            <div key={item.id} className="border-b border-gray-100 last:border-b-0">
              <div className="grid grid-cols-[110px_1fr_140px_150px_1.2fr_160px] gap-4 px-4 py-4 text-sm">
                <select
                  value={item.status}
                  onChange={(event) => runAction('상태 변경', () => updateCustomizeConsultationStatus(item.id, event.target.value as ConsultationStatus))}
                  className="h-9 rounded-lg border border-gray-300 px-2 text-sm"
                >
                  {STATUSES.map((status) => <option key={status} value={status}>{status}</option>)}
                </select>
                <strong className="text-gray-950">{item.customerName}</strong>
                <span>{item.phone}</span>
                <span>{item.region}</span>
                <span className="truncate text-gray-600">{item.memo || '-'}</span>
                <span className="text-gray-500">{new Date(item.createdAt).toLocaleString('ko-KR')}</span>
              </div>

              <details className="group px-4 pb-4">
                <summary className="flex cursor-pointer items-center gap-2 rounded-lg bg-gray-50 px-4 py-3 text-sm font-bold text-gray-700">
                  상세 정보
                  <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
                </summary>
                <div className="grid gap-5 border-x border-b border-gray-100 p-4 lg:grid-cols-[0.8fr_1fr]">
                  <div className="space-y-3 text-sm">
                    <InfoRow label="구매 시기" value={item.purchaseTimeline} />
                    <InfoRow label="지목" value={item.landType} />
                    <InfoRow label="설치 주소" value={item.installAddress} />
                    <InfoRow label="예산" value={item.budgetRange} />
                    <InfoRow label="예상 총액" value={formatWon(item.estimatedTotal)} />
                    <InfoRow label="구성 URL" value={item.configQuery ? `/customize?c=${item.configQuery}` : null} />
                  </div>

                  <div className="space-y-4">
                    <details className="rounded-lg border border-gray-200">
                      <summary className="cursor-pointer px-4 py-3 text-sm font-bold">구성 snapshot</summary>
                      <pre className="max-h-72 overflow-auto border-t border-gray-200 bg-gray-950 p-4 text-xs text-gray-100">
                        {JSON.stringify(item.configSnapshot, null, 2)}
                      </pre>
                    </details>

                    <div>
                      <label className="mb-2 block text-sm font-bold text-gray-700">내부 메모</label>
                      <textarea
                        value={memos[item.id] ?? ''}
                        onChange={(event) => setMemos((current) => ({ ...current, [item.id]: event.target.value }))}
                        className="min-h-24 w-full rounded-lg border border-gray-300 p-3 text-sm outline-none focus:ring-2 focus:ring-black/20"
                      />
                      <div className="mt-3 flex justify-between gap-3">
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
          ))
        )}
      </div>
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

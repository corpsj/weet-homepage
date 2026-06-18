'use client';

import { useMemo, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Loader2, Phone, Save, Settings2, Trash2 } from 'lucide-react';
import {
  deleteCustomizeConsultation,
  updateCustomizeConsultationMemo,
  updateCustomizeConsultationStatus,
} from '@/app/actions/customize-actions';
import { formatKstDateTime } from '@/lib/date-format';
import { formatWon } from '@/lib/customize/priceCalculator';
import { confirmToast } from '@/lib/ui/confirm';
import { cn } from '@/lib/utils';
import type { ConsultationStatus, CustomizeConsultation } from '@/lib/customize/types';
import {
  ConsoleMetricCard,
  ConsolePageHeader,
  ConsoleStatusPill,
  consolePrimaryButtonClass,
  consoleSecondaryButtonClass,
  consoleSelectClass,
} from '@/components/admin/ConsolePrimitives';

interface ConsultationManagerProps {
  consultations: CustomizeConsultation[];
  count: number;
}

const STATUSES: ConsultationStatus[] = ['신규', '진행중', '완료', '보류'];
const STATUS_FILTERS: ('전체' | ConsultationStatus)[] = ['전체', '신규', '진행중', '완료', '보류'];

const statusTone = (status: ConsultationStatus): 'neutral' | 'success' | 'warning' | 'danger' | 'dark' => {
  switch (status) {
    case '신규':
      return 'dark';
    case '진행중':
      return 'warning';
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
  const [statusFilter, setStatusFilter] = useState<'전체' | ConsultationStatus>('전체');
  const [selectedId, setSelectedId] = useState<string | null>(consultations[0]?.id ?? null);

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
  const deleteConsultation = async (id: string, name: string) => {
    if (!(await confirmToast(`${name}님의 상담 요청을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.`, { confirmLabel: '삭제' }))) return;
    runAction('상담 삭제', () => deleteCustomizeConsultation(id));
  };
  const summary = consultations.reduce(
    (current, item) => {
      current[item.status] += 1;
      if (item.status !== '완료' && getAgeMinutes(item.createdAt) >= 120) current.slaRisk += 1;
      return current;
    },
    { 신규: 0, 진행중: 0, 완료: 0, 보류: 0, slaRisk: 0 } as Record<ConsultationStatus, number> & { slaRisk: number }
  );

  const filteredConsultations = useMemo(() => {
    const list = statusFilter === '전체' ? consultations.slice() : consultations.filter((item) => item.status === statusFilter);
    return list.sort((a, b) => getAgeMinutes(a.createdAt) - getAgeMinutes(b.createdAt));
  }, [consultations, statusFilter]);

  const selected = useMemo(
    () => consultations.find((item) => item.id === selectedId) ?? null,
    [consultations, selectedId]
  );

  const filterCount = (filter: '전체' | ConsultationStatus) =>
    filter === '전체' ? consultations.length : consultations.filter((item) => item.status === filter).length;

  return (
    <div className="space-y-6">
      <ConsolePageHeader
        eyebrow="CONSULTATION SLA"
        title={`상담 관리 · ${count.toLocaleString('ko-KR')}건`}
        description="주문 상담을 인박스에서 확인하고, 2시간 이상 미처리된 요청을 먼저 처리합니다."
        actions={
          <div className="flex h-10 items-center gap-2 text-sm font-bold text-admin-muted">
            {isPending && <Loader2 className="h-5 w-5 animate-spin text-admin-accent" />}
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

      {/* status filter chips (segmented) */}
      <div className="flex flex-wrap gap-1.5">
        {STATUS_FILTERS.map((filter) => {
          const isActive = statusFilter === filter;
          return (
            <button
              key={filter}
              type="button"
              onClick={() => setStatusFilter(filter)}
              className={cn(
                'inline-flex items-center gap-1.5 rounded-[8px] border px-3 py-1.5 text-[12.5px] font-semibold transition-colors',
                isActive
                  ? 'border-admin-accent bg-admin-accent text-white'
                  : 'border-admin-line-2 bg-white text-[#52525b] hover:bg-[#f4f4f5]'
              )}
            >
              {filter}
              <span className="opacity-60">{filterCount(filter)}</span>
            </button>
          );
        })}
      </div>

      {/* inbox split view: [360px list | 1fr detail] */}
      <div className="grid items-start gap-4 lg:grid-cols-[360px_1fr]">
        {/* list */}
        <div className="overflow-hidden rounded-[12px] border border-admin-line bg-white">
          {filteredConsultations.length === 0 ? (
            <div className="p-[34px] text-center text-sm text-[#a1a1aa]">해당 조건의 상담이 없습니다.</div>
          ) : (
            filteredConsultations.map((item) => {
              const ageMinutes = getAgeMinutes(item.createdAt);
              const isSlaRisk = item.status !== '완료' && ageMinutes >= 120;
              const isActive = item.id === selectedId;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedId(item.id)}
                  className={cn(
                    'block w-full border-b border-[#f4f4f5] border-l-2 px-4 py-[13px] text-left transition-colors last:border-b-0',
                    isActive
                      ? 'border-l-admin-accent bg-admin-accent-soft'
                      : isSlaRisk
                        ? 'border-l-[#ef4444] hover:bg-[#fafafb]'
                        : 'border-l-transparent hover:bg-[#fafafb]'
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <strong className={cn('text-[13.5px]', isActive ? 'text-admin-accent' : 'text-admin-ink')}>
                      {item.customerName}
                    </strong>
                    <span className="text-[11px] text-[#a1a1aa]">{formatAge(ageMinutes)}</span>
                  </div>
                  <div className="mt-1 flex items-center justify-between gap-2">
                    <span className="truncate text-[12px] text-admin-muted">
                      {item.region} · {item.phone}
                    </span>
                    <ConsoleStatusPill tone={isSlaRisk ? 'danger' : statusTone(item.status)}>
                      {isSlaRisk ? 'SLA 위험' : item.status}
                    </ConsoleStatusPill>
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* detail */}
        {selected ? (
          <ConsultationDetail
            key={selected.id}
            consultation={selected}
            memo={memos[selected.id] ?? ''}
            onMemoChange={(value) => setMemos((current) => ({ ...current, [selected.id]: value }))}
            onStatusChange={(status) => runAction('상태 변경', () => updateCustomizeConsultationStatus(selected.id, status))}
            onMemoSave={() => runAction('내부 메모 저장', () => updateCustomizeConsultationMemo(selected.id, memos[selected.id] ?? ''))}
            onDelete={() => deleteConsultation(selected.id, selected.customerName)}
          />
        ) : (
          <div className="rounded-[12px] border border-admin-line bg-white p-[60px] text-center text-sm text-[#a1a1aa]">
            왼쪽에서 상담을 선택하세요.
          </div>
        )}
      </div>
    </div>
  );
}

function ConsultationDetail({
  consultation,
  memo,
  onMemoChange,
  onStatusChange,
  onMemoSave,
  onDelete,
}: {
  consultation: CustomizeConsultation;
  memo: string;
  onMemoChange: (value: string) => void;
  onStatusChange: (status: ConsultationStatus) => void;
  onMemoSave: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="overflow-hidden rounded-[12px] border border-admin-line bg-white">
      <div className="flex items-start justify-between gap-4 border-b border-[#f1f1f3] px-[22px] py-5">
        <div className="min-w-0">
          <h2 className="text-[19px] font-extrabold tracking-[-0.01em] text-admin-ink">{consultation.customerName}</h2>
          <p className="mt-1 text-[13px] text-admin-muted">
            {consultation.region} · {consultation.phone} · 예상 {formatWon(consultation.estimatedTotal)}
          </p>
        </div>
        <select
          value={consultation.status}
          onChange={(event) => onStatusChange(event.target.value as ConsultationStatus)}
          className={`${consoleSelectClass} h-9 shrink-0`}
        >
          {STATUSES.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-[22px] px-[22px] py-5 lg:grid-cols-2">
        {/* key/value detail rows */}
        <div className="flex flex-col">
          <InfoRow label="구매 시기" value={consultation.purchaseTimeline} />
          <InfoRow label="지목" value={consultation.landType} />
          <InfoRow label="설치 주소" value={consultation.installAddress} />
          <InfoRow label="예산" value={consultation.budgetRange} />
          <InfoRow label="예상 총액" value={formatWon(consultation.estimatedTotal)} />
          <InfoRow label="요청 메모" value={consultation.memo} />
          <InfoRow label="구성 URL" value={consultation.configQuery ? `/customize?c=${consultation.configQuery}` : null} />
          <InfoRow label="생성일" value={formatKstDateTime(consultation.createdAt)} />
          <details className="group mt-3 rounded-[9px] border border-admin-line-2">
            <summary className="cursor-pointer px-3 py-2.5 text-[13px] font-semibold text-admin-ink">구성 snapshot</summary>
            <pre className="max-h-72 overflow-auto border-t border-admin-line-2 bg-[#fafafb] p-3 text-xs text-[#3f3f46]">
              {JSON.stringify(consultation.configSnapshot, null, 2)}
            </pre>
          </details>
        </div>

        {/* action buttons + internal memo */}
        <div>
          <div className="mb-4 flex gap-2">
            <a
              href={consultation.phone ? `tel:${consultation.phone}` : undefined}
              className={`${consolePrimaryButtonClass} flex-1`}
            >
              <Phone className="h-4 w-4" />
              통화 기록
            </a>
            <a
              href={consultation.configQuery ? `/customize?c=${consultation.configQuery}` : undefined}
              target={consultation.configQuery ? '_blank' : undefined}
              rel={consultation.configQuery ? 'noreferrer' : undefined}
              className={cn(consoleSecondaryButtonClass, 'flex-1', !consultation.configQuery && 'pointer-events-none opacity-60')}
            >
              <Settings2 className="h-4 w-4" />
              구성 보기
            </a>
          </div>

          <label className="mb-2 block text-[12px] font-semibold text-admin-muted">내부 메모</label>
          <textarea
            value={memo}
            onChange={(event) => onMemoChange(event.target.value)}
            className="min-h-[120px] w-full resize-y rounded-[10px] border border-admin-line-2 bg-[#fafafb] p-3 text-[13px] text-admin-ink outline-none transition-colors placeholder:text-[#a1a1aa] focus:border-admin-accent focus:ring-2 focus:ring-admin-accent/15"
          />
          <div className="mt-2.5 flex items-center justify-between gap-3">
            <button type="button" onClick={onMemoSave} className={`${consoleSecondaryButtonClass} h-9`}>
              <Save className="h-4 w-4" />
              메모 저장
            </button>
            <button
              type="button"
              onClick={onDelete}
              className="inline-flex h-9 items-center justify-center gap-2 rounded-[9px] border border-[#fecaca] bg-[#fef2f2] px-4 text-sm font-semibold text-[#dc2626] transition-colors hover:bg-[#fee2e2] focus:outline-none focus:ring-2 focus:ring-[#dc2626]/15"
            >
              <Trash2 className="h-4 w-4" />
              삭제
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string | null }) {
  return (
    <div className="grid grid-cols-[92px_1fr] gap-3 border-b border-[#f6f6f7] py-[9px] text-[13px] last:border-b-0">
      <span className="font-semibold text-[#a1a1aa]">{label}</span>
      <span className="break-all text-admin-ink">{value || '-'}</span>
    </div>
  );
}

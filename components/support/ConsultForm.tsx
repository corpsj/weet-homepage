'use client';

import { useActionState, useEffect, useRef, useState, type ReactNode } from 'react';
import { toast } from 'sonner';
import { ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';
import { submitConsultation } from '@/app/actions/submit-inquiry';

const initialState: {
  success: boolean;
  message: string;
  fieldErrors?: Record<string, string[] | undefined>;
} = { success: false, message: '' };

const labelClass = 'mb-2 block text-[12.5px] font-semibold text-weet-sub';
const inputClass =
  'wt-in w-full rounded-[8px] border border-weet-line-2 bg-weet-surface px-[14px] py-[13px] text-[14px] text-weet-ink outline-none transition-colors focus:border-weet-forest focus:bg-white aria-[invalid=true]:border-customize-error aria-[invalid=true]:bg-white';

// 필드별 인라인 에러 + ARIA. ReviewStep.tsx의 Field 패턴 참고.
function Field({
  label,
  required,
  fieldId,
  error,
  className,
  children,
}: {
  label: string;
  required?: boolean;
  fieldId: string;
  error?: string;
  className?: string;
  children: (args: { id: string; describedBy?: string; invalid: boolean }) => ReactNode;
}) {
  const errorId = error ? `${fieldId}-error` : undefined;
  return (
    <div className={className}>
      <label htmlFor={fieldId} className={labelClass}>
        {label} {required ? <span className="text-weet-forest">*</span> : null}
      </label>
      {children({ id: fieldId, describedBy: errorId, invalid: Boolean(error) })}
      {error ? (
        <p id={errorId} className="mt-1.5 text-[12px] font-semibold leading-relaxed text-customize-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}

type FieldName = 'name' | 'phone' | 'consent';

export default function ConsultForm() {
  const [state, formAction, isPending] = useActionState(submitConsultation, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  // 클라이언트 검증 에러(제출 시 채워짐). 서버 fieldErrors와 합쳐서 표시한다.
  const [clientErrors, setClientErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [consent, setConsent] = useState(false);

  // 표시용 에러: 클라이언트 우선, 없으면 서버 fieldErrors 첫 메시지.
  const serverErrors = state.fieldErrors ?? {};
  const errorFor = (name: FieldName): string | undefined =>
    clientErrors[name] ?? serverErrors[name]?.[0];

  useEffect(() => {
    if (!state.message) return;
    if (state.success) {
      toast.success(state.message);
      return;
    }
    toast.error(state.message);
    // 서버 검증 실패 시 첫 오류 필드로 이동/포커스.
    const firstServerError = (['name', 'phone', 'consent'] as FieldName[]).find(
      (name) => serverErrors[name]?.length,
    );
    if (firstServerError) focusField(firstServerError);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  function focusField(name: FieldName) {
    const el = formRef.current?.elements.namedItem(name) as HTMLElement | null;
    el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    el?.focus({ preventScroll: true });
  }

  // 제출 직전 클라이언트 검증. 통과해야 서버 액션으로 진행한다.
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    const form = event.currentTarget;
    const name = String(form.elements.namedItem('name') instanceof HTMLInputElement ? (form.elements.namedItem('name') as HTMLInputElement).value : '').trim();
    const phone = String(form.elements.namedItem('phone') instanceof HTMLInputElement ? (form.elements.namedItem('phone') as HTMLInputElement).value : '').trim();
    const nextErrors: Partial<Record<FieldName, string>> = {};
    if (!name) nextErrors.name = '이름을 입력해주세요.';
    if (!phone) nextErrors.phone = '연락처를 입력해주세요.';
    else if (!/^[0-9+\-\s().]+$/.test(phone) || phone.replace(/[\s().+-]/g, '').length < 7)
      nextErrors.phone = '연락처 형식이 올바르지 않습니다.';
    if (!consent) nextErrors.consent = '개인정보 수집·이용에 동의해주세요.';

    if (Object.keys(nextErrors).length > 0) {
      event.preventDefault();
      setClientErrors(nextErrors);
      const first = (['name', 'phone', 'consent'] as FieldName[]).find((key) => nextErrors[key]);
      if (first) focusField(first);
      return;
    }
    setClientErrors({});
  }

  // 입력 시 해당 필드의 클라이언트 에러를 즉시 해제한다.
  const clearError = (name: FieldName) =>
    setClientErrors((current) => {
      if (!current[name]) return current;
      const next = { ...current };
      delete next[name];
      return next;
    });

  if (state.success) {
    return (
      <div
        role="status"
        className="wt-card flex flex-col items-center gap-3 rounded-card border border-weet-forest/30 bg-weet-forest/10 px-6 py-10 text-center"
      >
        <CheckCircle2 className="h-10 w-10 text-weet-forest" aria-hidden="true" />
        <h3 className="text-[18px] font-bold text-weet-ink">상담 신청이 접수되었습니다</h3>
        <p className="max-w-[420px] text-[13.5px] leading-[1.7] text-weet-sub">
          {state.message} 영업일 기준 1~2일 이내에 담당자가 입력하신 연락처로 안내드립니다.
        </p>
      </div>
    );
  }

  return (
    <form ref={formRef} action={formAction} onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="이름" required fieldId="consult-name" error={errorFor('name')}>
          {({ id, describedBy, invalid }) => (
            <input
              id={id}
              name="name"
              required
              maxLength={80}
              autoComplete="name"
              aria-invalid={invalid}
              aria-describedby={describedBy}
              className={inputClass}
              placeholder="홍길동"
              onChange={() => clearError('name')}
            />
          )}
        </Field>
        <Field label="연락처" required fieldId="consult-phone" error={errorFor('phone')}>
          {({ id, describedBy, invalid }) => (
            <input
              id={id}
              name="phone"
              type="tel"
              inputMode="tel"
              required
              maxLength={30}
              autoComplete="tel"
              aria-invalid={invalid}
              aria-describedby={describedBy}
              className={inputClass}
              placeholder="010-0000-0000"
              onChange={() => clearError('phone')}
            />
          )}
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="consult-region" className={labelClass}>
            설치 예정 지역
          </label>
          <input id="consult-region" name="region" maxLength={120} className={inputClass} placeholder="예: 경기 양평군" />
        </div>
        <div>
          <label htmlFor="consult-interest" className={labelClass}>
            관심 구성
          </label>
          <select id="consult-interest" name="interest" className={inputClass} defaultValue="">
            <option value="">선택 안 함</option>
            <option value="3x6 (18㎡) — 농막·작업실 규모">3x6 (18㎡) — 농막·작업실 규모</option>
            <option value="3x9 (27㎡) — 세컨하우스·주거 규모">3x9 (27㎡) — 세컨하우스·주거 규모</option>
            <option value="모듈 조합·상업 공간">모듈 조합·상업 공간</option>
            <option value="아직 모르겠어요 (상담으로 결정)">아직 모르겠어요 (상담으로 결정)</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="consult-message" className={labelClass}>
          궁금한 점
        </label>
        <textarea
          id="consult-message"
          name="message"
          rows={4}
          maxLength={4000}
          className="wt-in w-full resize-y rounded-[8px] border border-weet-line-2 bg-weet-surface px-[14px] py-[13px] text-[14px] text-weet-ink outline-none transition-colors focus:border-weet-forest focus:bg-white"
          placeholder="부지 조건, 예산 범위, 사용 목적 등 편하게 적어주세요. 비워두셔도 연락드립니다."
        />
      </div>

      <div>
        <label htmlFor="consult-consent" className="flex items-start gap-2.5 text-[12.5px] leading-[1.6] text-weet-sub">
          <input
            id="consult-consent"
            name="consent"
            type="checkbox"
            checked={consent}
            onChange={(event) => {
              setConsent(event.target.checked);
              if (event.target.checked) clearError('consent');
            }}
            aria-invalid={Boolean(errorFor('consent'))}
            aria-describedby={errorFor('consent') ? 'consult-consent-error' : undefined}
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-weet-line-2 text-weet-forest accent-weet-forest focus-visible:ring-2 focus-visible:ring-weet-gold-deep"
          />
          <span>
            <span className="font-semibold text-weet-ink">[필수]</span> 상담을 위한 개인정보 수집·이용에 동의합니다.{' '}
            <a href="/privacy" target="_blank" rel="noopener noreferrer" className="wt-link underline hover:text-weet-gold-deep">
              개인정보 처리방침
            </a>
          </span>
        </label>
        {errorFor('consent') ? (
          <p id="consult-consent-error" className="mt-1.5 text-[12px] font-semibold leading-relaxed text-customize-error">
            {errorFor('consent')}
          </p>
        ) : null}
      </div>

      <button
        type="submit"
        disabled={isPending || !consent}
        className="wt-btn mt-1 inline-flex w-full items-center justify-center gap-2 rounded-[8px] bg-weet-gold px-6 py-[15px] text-[15px] font-semibold text-weet-ink transition-transform duration-150 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        상담 신청하기
        {isPending ? null : <ArrowRight className="h-4 w-4" />}
      </button>
      <p className="text-center text-[11.5px] leading-[1.6] text-weet-muted">
        남겨주신 정보는 상담 목적에만 사용합니다. 자세한 내용은{' '}
        <a href="/privacy" className="wt-link underline hover:text-weet-gold-deep">
          개인정보 처리방침
        </a>
        을 확인해 주세요.
      </p>
    </form>
  );
}

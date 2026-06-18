'use client';

import { useActionState, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { ArrowRight, Loader2 } from 'lucide-react';
import { submitConsultation } from '@/app/actions/submit-inquiry';

const initialState = { success: false, message: '' };

const labelClass = 'mb-2 block text-[12.5px] font-semibold text-weet-sub';
const inputClass =
  'wt-in w-full rounded-[8px] border border-weet-line-2 bg-weet-surface px-[14px] py-[13px] text-[14px] text-weet-ink outline-none transition-colors focus:border-weet-forest focus:bg-white';

export default function ConsultForm() {
  const [state, formAction, isPending] = useActionState(submitConsultation, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!state.message) return;
    if (state.success) {
      toast.success(state.message);
      formRef.current?.reset();
    } else {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form ref={formRef} action={formAction} className="flex flex-col gap-4">
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="consult-name" className={labelClass}>
            이름 <span className="text-weet-forest">*</span>
          </label>
          <input id="consult-name" name="name" required maxLength={80} className={inputClass} placeholder="홍길동" />
        </div>
        <div>
          <label htmlFor="consult-phone" className={labelClass}>
            연락처 <span className="text-weet-forest">*</span>
          </label>
          <input
            id="consult-phone"
            name="phone"
            type="tel"
            required
            maxLength={30}
            className={inputClass}
            placeholder="010-0000-0000"
          />
        </div>
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

      <button
        type="submit"
        disabled={isPending}
        className="wt-btn mt-1 inline-flex w-full items-center justify-center gap-2 rounded-[8px] bg-weet-gold px-6 py-[15px] text-[15px] font-semibold text-weet-ink transition-transform duration-150 hover:-translate-y-0.5 disabled:opacity-60"
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

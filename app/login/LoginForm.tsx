'use client';

import { useState } from 'react';
import { useFormStatus } from 'react-dom';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { createClient } from '@/utils/supabase/client';
import { login } from './actions';

// 제출 중 상태는 form 내부에서만 읽을 수 있어 별도 컴포넌트로 분리한다.
function LoginSubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      formAction={login}
      disabled={pending}
      className="mt-1.5 flex h-12 items-center justify-center gap-2 rounded-[10px] bg-weet-ink text-[15px] font-semibold text-weet-paper transition-transform duration-150 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          로그인 중…
        </>
      ) : (
        '로그인 →'
      )}
    </button>
  );
}

export default function LoginForm({ error }: { error?: string }) {
  const [showPw, setShowPw] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleGoogle = async () => {
    try {
      setGoogleLoading(true);
      const supabase = createClient();
      const { error: oauthError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: `${window.location.origin}/auth/callback?next=/admin` },
      });
      if (oauthError) {
        toast.error('Google 로그인을 시작할 수 없습니다. 운영팀에 문의해주세요.');
        setGoogleLoading(false);
      }
      // 성공 시 Supabase가 Google로 리다이렉트한다.
    } catch {
      toast.error('Google 로그인 중 오류가 발생했습니다.');
      setGoogleLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[380px]">
      {/* 콘솔 워드마크 */}
      <div className="mb-9 flex items-center gap-2.5">
        <span className="flex h-[34px] w-[34px] items-center justify-center rounded-[9px] bg-weet-ink text-[16px] font-extrabold text-weet-paper">
          W
        </span>
        <div className="leading-[1.15]">
          <div className="text-[15px] font-bold text-weet-ink">weet</div>
          <div className="font-mono text-[10px] tracking-[0.1em] text-weet-muted">CONSOLE</div>
        </div>
      </div>

      <h1 className="m-0 mb-1.5 text-[26px] font-bold tracking-[-0.02em] text-weet-ink">다시 오신 것을 환영합니다</h1>
      <p className="m-0 mb-[30px] text-[14px] text-weet-muted">계정 정보로 로그인해 콘솔에 접속하세요.</p>

      {error && (
        <div
          role="alert"
          className="mb-6 rounded-[9px] border border-[#E4B9B0] bg-[#F8E9E5] px-4 py-3 text-[13px] font-medium text-[#9A3412]"
        >
          아이디 또는 비밀번호가 올바르지 않습니다. 다시 확인해 주세요.
        </div>
      )}

      <form className="flex flex-col gap-4">
        <div>
          <label htmlFor="id" className="mb-2 block text-[12.5px] font-semibold text-weet-sub">
            아이디
          </label>
          <input
            id="id"
            name="id"
            type="text"
            autoComplete="username"
            required
            placeholder="아이디 (예: admin)"
            className="h-[46px] w-full rounded-[9px] border border-weet-line-2 bg-weet-surface px-3.5 text-[14px] text-weet-ink transition-all placeholder:text-weet-muted focus:border-weet-ink focus:bg-white focus:outline-none focus:ring-2 focus:ring-weet-ink/10"
          />
        </div>

        <div>
          <label htmlFor="password" className="mb-2 block text-[12.5px] font-semibold text-weet-sub">
            비밀번호
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPw ? 'text' : 'password'}
              autoComplete="current-password"
              required
              placeholder="••••••••"
              className="h-[46px] w-full rounded-[9px] border border-weet-line-2 bg-weet-surface px-3.5 pr-11 text-[14px] text-weet-ink transition-all placeholder:text-weet-muted focus:border-weet-ink focus:bg-white focus:outline-none focus:ring-2 focus:ring-weet-ink/10"
            />
            <button
              type="button"
              onClick={() => setShowPw((v) => !v)}
              aria-label={showPw ? '비밀번호 숨기기' : '비밀번호 표시'}
              aria-pressed={showPw}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-weet-muted transition-colors hover:text-weet-gold-deep"
            >
              {showPw ? <EyeOff className="h-[18px] w-[18px]" /> : <Eye className="h-[18px] w-[18px]" />}
            </button>
          </div>
        </div>

        <LoginSubmitButton />
      </form>

      {/* 구분선 */}
      <div className="my-6 flex items-center gap-3.5">
        <span className="h-px flex-1 bg-weet-line" />
        <span className="font-mono text-[11px] text-weet-muted">또는</span>
        <span className="h-px flex-1 bg-weet-line" />
      </div>

      {/* 구글 로그인 */}
      <button
        type="button"
        onClick={handleGoogle}
        disabled={googleLoading}
        className="flex h-[46px] w-full items-center justify-center gap-2.5 rounded-[10px] border border-weet-line-2 bg-white text-[14px] font-semibold text-weet-ink transition-transform duration-150 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <span
          aria-hidden
          className="h-4 w-4 rounded-full"
          style={{ background: 'conic-gradient(#EA4335,#FBBC05,#34A853,#4285F4)' }}
        />
        {googleLoading ? '연결 중…' : 'Google로 계속하기'}
      </button>

      <p className="mt-[30px] text-center text-[11.5px] leading-[1.6] text-weet-muted">
        관리자 전용 페이지입니다. 접근 권한이 필요하면 운영팀에 문의하세요.
      </p>
    </div>
  );
}

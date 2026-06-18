import Image from 'next/image';
import type { Metadata } from 'next';
import LoginForm from './LoginForm';

export const metadata: Metadata = {
  title: '관리자 로그인',
  description: '위트(WEET) 관리자 로그인 페이지입니다.',
  alternates: {
    canonical: '/login',
  },
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  // The login server action redirects to /login?error=... on failure; surface it. (F51)
  const { error } = await searchParams;

  return (
    <div className="grid min-h-[100dvh] grid-cols-1 bg-weet-paper min-[901px]:grid-cols-[1.1fr_0.9fr]">
      {/* ===== LEFT: 브랜드 비주얼 (≤900px 숨김) ===== */}
      <aside className="relative hidden overflow-hidden bg-weet-ink min-[901px]:block">
        <Image
          src="/images/handoff/hero_main.webp"
          alt=""
          fill
          priority
          sizes="55vw"
          className="wt-zoom object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-weet-ink-deep/95 via-weet-ink/40 to-weet-ink/25" />
        <div className="absolute inset-x-0 top-0 px-12 py-10">
          <Image
            src="/images/handoff/weet-wordmark.webp"
            alt="weet"
            width={406}
            height={123}
            className="h-[26px] w-auto brightness-0 invert"
          />
        </div>
        <div className="absolute inset-x-0 bottom-0 px-12 pb-16">
          <div className="mb-[18px] font-mono text-[12px] font-semibold uppercase tracking-[0.22em] text-weet-gold">
            WEET CONSOLE
          </div>
          <h2 className="m-0 mb-3.5 text-[clamp(28px,3vw,40px)] font-semibold leading-[1.12] tracking-[-0.03em] text-weet-paper kr-balance">
            작은 공간,
            <br />
            선명한 기준.
          </h2>
          <p className="m-0 max-w-[38ch] text-[15px] font-light leading-[1.7] text-weet-paper/75 kr-balance">
            관리자 콘솔에서 상담·제품·콘텐츠를 통합 관리하세요.
          </p>
        </div>
      </aside>

      {/* ===== RIGHT: 로그인 폼 ===== */}
      <main className="flex items-center justify-center px-8 py-12">
        <LoginForm error={error} />
      </main>
    </div>
  );
}

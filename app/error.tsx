'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { PhoneCall } from 'lucide-react';
import { SITE_SETTING_DEFAULTS, telHref } from '@/lib/site-settings';

/**
 * Route-segment error boundary. Catches render/data errors in the page tree and
 * shows a recoverable UI instead of a blank 500. (review backlog F32)
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-5 px-6 text-center">
      <p className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">ERROR</p>
      <h1 className="text-2xl font-black text-gray-900">문제가 발생했습니다</h1>
      <p className="max-w-md text-sm leading-6 text-gray-600">
        페이지를 불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요. 문제가 계속되면 고객지원으로 문의해 주세요.
      </p>
      <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={reset}
          className="rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-gray-800"
        >
          다시 시도
        </button>
        <Link
          href="/support#consult"
          className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-bold text-gray-700 transition-colors hover:bg-gray-50"
        >
          상담 요청
        </Link>
        <Link
          href="/"
          className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-bold text-gray-700 transition-colors hover:bg-gray-50"
        >
          홈으로
        </Link>
      </div>
      {SITE_SETTING_DEFAULTS.contact_phone && (
        <a
          href={telHref(SITE_SETTING_DEFAULTS.contact_phone)}
          className="mt-1 inline-flex items-center gap-1.5 text-sm font-bold text-gray-700 underline-offset-2 hover:underline"
        >
          <PhoneCall className="h-4 w-4" aria-hidden="true" />
          전화 상담 {SITE_SETTING_DEFAULTS.contact_phone}
        </a>
      )}
    </div>
  );
}

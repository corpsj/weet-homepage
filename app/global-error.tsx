'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { SITE_SETTING_DEFAULTS, telHref } from '@/lib/site-settings';

/**
 * Global error boundary for errors thrown in the root layout itself. Must render
 * its own <html>/<body>. (review backlog F32)
 */
export default function GlobalError({
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
    <html lang="ko">
      <body className="flex min-h-screen flex-col items-center justify-center gap-5 px-6 text-center">
        <h1 className="text-2xl font-black text-gray-900">문제가 발생했습니다</h1>
        <p className="max-w-md text-sm leading-6 text-gray-600">
          예기치 못한 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={reset}
            className="rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-gray-800"
          >
            다시 시도
          </button>
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
            className="text-sm font-bold text-gray-700 underline-offset-2 hover:underline"
          >
            전화 상담 {SITE_SETTING_DEFAULTS.contact_phone}
          </a>
        )}
      </body>
    </html>
  );
}

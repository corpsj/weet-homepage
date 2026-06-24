'use client';

import Link from 'next/link';
import { MessageCircle, MessagesSquare, Phone } from 'lucide-react';
import type { SiteSettings } from '@/lib/site-settings';
import { telHref } from '@/lib/site-settings';

function trackConsultClick(channel: string) {
  try {
    (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag?.('event', 'consult_click', { channel });
  } catch {
    // analytics is optional
  }
}

export default function ConsultBar({ settings }: { settings: SiteSettings }) {
  const hasKakao = settings.kakao_channel_url !== '';

  return (
    <>
      {/* 모바일·태블릿: 하단 고정 상담 바 (웜 잉크) */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-weet-ink-deep bg-weet-ink pb-[env(safe-area-inset-bottom)] lg:hidden">
        <div className="grid h-11 grid-cols-2 divide-x divide-weet-paper/15 text-[13px] font-semibold leading-none text-weet-paper">
          <a
            href={telHref(settings.contact_phone)}
            onClick={() => trackConsultClick('tel')}
            className="flex min-w-0 items-center justify-center gap-1.5 whitespace-nowrap active:bg-weet-ink-deep"
          >
            <Phone className="h-4 w-4 shrink-0 text-weet-gold" />
            <span className="leading-none">전화 상담</span>
          </a>
          {hasKakao ? (
            <a
              href={settings.kakao_channel_url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackConsultClick('kakao')}
              className="flex min-w-0 items-center justify-center gap-1.5 whitespace-nowrap active:bg-weet-ink-deep"
            >
              <MessageCircle className="h-4 w-4 shrink-0 text-weet-gold" />
              <span className="leading-none">카카오톡 상담</span>
            </a>
          ) : (
            <Link
              href="/support#consult"
              onClick={() => trackConsultClick('form')}
              className="flex min-w-0 items-center justify-center gap-1.5 whitespace-nowrap active:bg-weet-ink-deep"
            >
              <MessagesSquare className="h-4 w-4 shrink-0 text-weet-gold" />
              <span className="leading-none">상담 신청</span>
            </Link>
          )}
        </div>
      </div>

      {/* 데스크톱: 우측 하단 고정 상담 버튼 */}
      <div className="fixed bottom-8 right-8 z-50 hidden flex-col items-end gap-2 lg:flex">
        {hasKakao && (
          <a
            href={settings.kakao_channel_url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackConsultClick('kakao')}
            className="flex h-11 items-center gap-2 rounded-full border border-weet-line bg-weet-surface px-5 text-sm font-semibold text-weet-ink shadow-weet-float transition-transform hover:scale-[1.03]"
          >
            <MessageCircle className="h-4 w-4 text-weet-gold-deep" />
            카카오톡 상담
          </a>
        )}
        <a
          href={telHref(settings.contact_phone)}
          onClick={() => trackConsultClick('tel')}
          className="flex h-11 items-center gap-2 rounded-full border border-weet-line bg-weet-surface px-5 text-sm font-semibold text-weet-ink shadow-weet-float transition-transform hover:scale-[1.03]"
        >
          <Phone className="h-4 w-4 text-weet-gold-deep" />
          {settings.contact_phone}
          {settings.consult_hours && (
            <span className="text-xs font-medium text-weet-muted">{settings.consult_hours}</span>
          )}
        </a>
        <Link
          href="/support#consult"
          onClick={() => trackConsultClick('form')}
          className="flex h-11 items-center gap-2 rounded-full bg-weet-ink px-5 text-sm font-semibold text-weet-paper shadow-weet-float transition-transform hover:scale-[1.03] hover:bg-weet-ink-deep"
        >
          <MessagesSquare className="h-4 w-4 text-weet-gold" />
          상담 신청
        </Link>
      </div>
    </>
  );
}

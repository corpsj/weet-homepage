'use client';

import Link from 'next/link';
import { MessageCircle, MessagesSquare, Phone } from 'lucide-react';
import type { SiteSettings } from '@/lib/site-settings';
import { telHref } from '@/lib/site-settings';

function trackConsultClick(channel: string) {
  try {
    (window as any).gtag?.('event', 'consult_click', { channel });
  } catch {
    // analytics is optional
  }
}

export default function ConsultBar({ settings }: { settings: SiteSettings }) {
  const hasKakao = settings.kakao_channel_url !== '';

  return (
    <>
      {/* 모바일·태블릿: 하단 고정 상담 바 */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[#0b5d56] bg-[#0d6e66] pb-[env(safe-area-inset-bottom)] lg:hidden">
        <div className="grid h-14 grid-cols-2 divide-x divide-white/15 text-sm font-bold text-white">
          <a
            href={telHref(settings.contact_phone)}
            onClick={() => trackConsultClick('tel')}
            className="flex items-center justify-center gap-2 active:bg-[#0b5d56]"
          >
            <Phone className="h-4 w-4" />
            전화 상담
          </a>
          {hasKakao ? (
            <a
              href={settings.kakao_channel_url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackConsultClick('kakao')}
              className="flex items-center justify-center gap-2 active:bg-[#0b5d56]"
            >
              <MessageCircle className="h-4 w-4" />
              카카오톡 상담
            </a>
          ) : (
            <Link
              href="/support#consult"
              onClick={() => trackConsultClick('form')}
              className="flex items-center justify-center gap-2 active:bg-[#0b5d56]"
            >
              <MessagesSquare className="h-4 w-4" />
              상담 신청
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
            className="flex h-11 items-center gap-2 rounded-full border border-[#e5e5df] bg-white px-5 text-sm font-bold text-gray-900 shadow-lg transition-transform hover:scale-[1.03]"
          >
            <MessageCircle className="h-4 w-4 text-[#0d6e66]" />
            카카오톡 상담
          </a>
        )}
        <a
          href={telHref(settings.contact_phone)}
          onClick={() => trackConsultClick('tel')}
          className="flex h-11 items-center gap-2 rounded-full border border-[#e5e5df] bg-white px-5 text-sm font-bold text-gray-900 shadow-lg transition-transform hover:scale-[1.03]"
        >
          <Phone className="h-4 w-4 text-[#0d6e66]" />
          {settings.contact_phone}
          {settings.consult_hours && (
            <span className="text-xs font-medium text-gray-500">{settings.consult_hours}</span>
          )}
        </a>
        <Link
          href="/support#consult"
          onClick={() => trackConsultClick('form')}
          className="flex h-11 items-center gap-2 rounded-full bg-[#0d6e66] px-5 text-sm font-bold text-white shadow-lg transition-transform hover:scale-[1.03]"
        >
          <MessagesSquare className="h-4 w-4" />
          상담 신청
        </Link>
      </div>
    </>
  );
}

'use client';

import Link from 'next/link';
import { MessageCircle, MessagesSquare, Phone } from 'lucide-react';
import type { SiteSettings } from '@/lib/site-settings';
import { telHref } from '@/lib/site-settings';
import { useLanguage, type Language } from '@/contexts/LanguageContext';

const COPY: Record<Language, {
  phoneConsult: string;
  kakaoConsult: string;
  requestConsult: string;
  requestConsultLong: string;
}> = {
  KO: {
    phoneConsult: '전화 상담',
    kakaoConsult: '카카오톡 상담',
    requestConsult: '상담 신청',
    requestConsultLong: '상담 신청하기',
  },
  EN: {
    phoneConsult: 'Call us',
    kakaoConsult: 'KakaoTalk chat',
    requestConsult: 'Get a quote',
    requestConsultLong: 'Request a consultation',
  },
  ES: {
    phoneConsult: 'Llámanos',
    kakaoConsult: 'Chat de KakaoTalk',
    requestConsult: 'Solicitar asesoría',
    requestConsultLong: 'Solicitar asesoría',
  },
};

function trackConsultClick(channel: string) {
  try {
    (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag?.('event', 'consult_click', { channel });
  } catch {
    // analytics is optional
  }
}

export default function ConsultBar({ settings }: { settings: SiteSettings }) {
  const { language } = useLanguage();
  const t = COPY[language];
  const hasKakao = settings.kakao_channel_url !== '';

  return (
    <>
      {/* 모바일·태블릿: 하단 고정 상담 바 (웜 잉크) */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-black bg-black pb-[env(safe-area-inset-bottom)] lg:hidden">
        <div className="grid h-11 grid-cols-2 divide-x divide-white/15 text-[13px] font-semibold leading-none text-white">
          <a
            href={telHref(settings.contact_phone)}
            onClick={() => trackConsultClick('tel')}
            className="flex min-w-0 items-center justify-center gap-1.5 whitespace-nowrap active:bg-gray-800"
          >
            <Phone className="h-4 w-4 shrink-0 text-yellow-700" />
            <span className="leading-none">{t.phoneConsult}</span>
          </a>
          {hasKakao ? (
            <a
              href={settings.kakao_channel_url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackConsultClick('kakao')}
              className="flex min-w-0 items-center justify-center gap-1.5 whitespace-nowrap active:bg-gray-800"
            >
              <MessageCircle className="h-4 w-4 shrink-0 text-yellow-700" />
              <span className="leading-none">{t.kakaoConsult}</span>
            </a>
          ) : (
            <Link
              href="/support#consult"
              onClick={() => trackConsultClick('form')}
              className="flex min-w-0 items-center justify-center gap-1.5 whitespace-nowrap active:bg-gray-800"
            >
              <MessagesSquare className="h-4 w-4 shrink-0 text-yellow-700" />
              <span className="leading-none">{t.requestConsult}</span>
            </Link>
          )}
        </div>
      </div>

      {/* 데스크톱: 우측 하단 고정 상담 버튼 */}
      <div className="fixed bottom-8 right-8 z-50 hidden flex-col items-end gap-2 lg:flex">
        {hasKakao ? (
          <a
            href={settings.kakao_channel_url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackConsultClick('kakao')}
            className="flex h-11 items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-5 text-sm font-semibold text-gray-900 shadow-sm transition-transform hover:scale-[1.03]"
          >
            <MessageCircle className="h-4 w-4 text-gray-700" />
            {t.kakaoConsult}
          </a>
        ) : (
          <Link
            href="/support#consult"
            onClick={() => trackConsultClick('form')}
            className="flex h-11 items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-5 text-sm font-semibold text-gray-900 shadow-sm transition-transform hover:scale-[1.03]"
          >
            <MessagesSquare className="h-4 w-4 text-gray-700" />
            {t.requestConsultLong}
          </Link>
        )}
        <a
          href={telHref(settings.contact_phone)}
          onClick={() => trackConsultClick('tel')}
          className="flex h-11 items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-5 text-sm font-semibold text-gray-900 shadow-sm transition-transform hover:scale-[1.03]"
        >
          <Phone className="h-4 w-4 text-gray-700" />
          {settings.contact_phone}
          {settings.consult_hours && (
            <span className="text-xs font-medium text-gray-500">{settings.consult_hours}</span>
          )}
        </a>
        <Link
          href="/support#consult"
          onClick={() => trackConsultClick('form')}
          className="flex h-11 items-center gap-2 rounded-full bg-black px-5 text-sm font-semibold text-white shadow-sm transition-transform hover:scale-[1.03] hover:bg-gray-800"
        >
          <MessagesSquare className="h-4 w-4 text-yellow-700" />
          {t.requestConsult}
        </Link>
      </div>
    </>
  );
}

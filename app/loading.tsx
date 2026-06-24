'use client';

import { useLanguage, type Language } from '@/contexts/LanguageContext';

const COPY: Record<Language, { label: string; text: string }> = {
  KO: { label: '로딩 중', text: '로딩 중…' },
  EN: { label: 'Loading', text: 'Loading…' },
  ES: { label: 'Cargando', text: 'Cargando…' },
};

/**
 * Top-level loading fallback shown while a route segment streams. (F32)
 */
export default function Loading() {
  const { language } = useLanguage();
  const t = COPY[language];
  return (
    <div className="flex min-h-[60vh] items-center justify-center" role="status" aria-label={t.label}>
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900" />
      <span className="sr-only">{t.text}</span>
    </div>
  );
}

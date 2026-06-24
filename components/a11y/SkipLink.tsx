'use client';

import { useLanguage, type Language } from '@/contexts/LanguageContext';

const COPY: Record<Language, { skipToContent: string }> = {
  KO: { skipToContent: '본문 바로가기' },
  EN: { skipToContent: 'Skip to content' },
  ES: { skipToContent: 'Saltar al contenido' },
};

/**
 * Skip-to-content link. Visually hidden until focused, lets keyboard and
 * screen-reader users jump past the header straight to the page's
 * `#main-content`. (review backlog F21)
 */
export function SkipLink() {
  const { language } = useLanguage();
  return (
    <a
      href="#main-content"
      className="sr-only z-[100] rounded-md bg-gray-900 px-4 py-2 text-sm font-bold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:outline-none focus:ring-2 focus:ring-primary"
    >
      {COPY[language].skipToContent}
    </a>
  );
}

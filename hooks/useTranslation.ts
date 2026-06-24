import { useLanguage } from '@/contexts/LanguageContext';
import { DICTIONARY } from '@/constants/dictionaries';

export function useTranslation() {
    const { language } = useLanguage();
    const key = language.toLowerCase() as keyof typeof DICTIONARY;
    // ES 등 미번역 언어는 ko로 폴백 — 절대 undefined를 반환하지 않는다(런타임 크래시 방지).
    return DICTIONARY[key] ?? DICTIONARY.ko;
}

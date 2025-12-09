import { useLanguage } from '@/contexts/LanguageContext';
import { DICTIONARY } from '@/constants/dictionaries';

export function useTranslation() {
    const { language } = useLanguage();
    return DICTIONARY[language.toLowerCase() as 'ko' | 'en'];
}

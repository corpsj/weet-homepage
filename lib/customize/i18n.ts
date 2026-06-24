import type { Language } from '@/contexts/LanguageContext';

// 카탈로그 데이터(model/category/option)의 nameKo/nameEn 등 이중 컬럼을 현재 언어로 고른다.
// 스키마에 es 컬럼이 없으므로 ES는 en → ko 순으로 폴백한다. KO는 항상 ko 원문을 보장한다
// (e2e가 KO 기본에서 model.nameKo 등 정확한 한국어 라벨을 단언하기 때문).
export function pickText(ko: string, en: string | null | undefined, language: Language): string {
  return language === 'KO' ? ko : (en || ko);
}

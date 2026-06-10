import { cache } from 'react';
import { unstable_cache } from 'next/cache';
import { supabase } from '@/lib/supabase';

export type SiteSettings = {
  contact_phone: string;
  consult_hours: string;
  kakao_channel_url: string;
  contact_email: string;
  naver_blog_url: string;
  instagram_url: string;
  daangn_url: string;
  trust_founded_year: string;
  trust_units_built: string;
  lead_time_note: string;
};

export const SITE_SETTING_LABELS: Record<keyof SiteSettings, string> = {
  contact_phone: '대표 연락처',
  consult_hours: '상담 가능 시간 (예: 평일 09:00–18:00)',
  kakao_channel_url: '카카오톡 채널 URL',
  contact_email: '문의 이메일',
  naver_blog_url: '네이버 블로그 URL',
  instagram_url: '인스타그램 URL',
  daangn_url: '당근 프로필 URL',
  trust_founded_year: '설립 연도 (예: 2021)',
  trust_units_built: '누적 제작 대수 (검증된 숫자만)',
  lead_time_note: '평균 제작 기간 안내 문구 (예: 계약 후 4–6주)',
};

// 비어 있으면 UI에서 해당 항목을 숨긴다. 전화번호만 푸터의 기존 값으로 폴백.
export const SITE_SETTING_DEFAULTS: SiteSettings = {
  contact_phone: '010-9645-2348',
  consult_hours: '',
  kakao_channel_url: '',
  contact_email: '',
  naver_blog_url: 'https://blog.naver.com/we-et',
  instagram_url: 'https://www.instagram.com/weet_kr/',
  daangn_url: 'https://www.daangn.com/kr/local-profile/%EC%9C%84%ED%8A%B8weet-kihpx4ctggn6/',
  trust_founded_year: '',
  trust_units_built: '',
  lead_time_note: '',
};

const fetchSiteSettings = unstable_cache(
  async (): Promise<SiteSettings> => {
    const { data, error } = await (supabase as any)
      .from('site_settings')
      .select('key, value');

    const settings = { ...SITE_SETTING_DEFAULTS };
    if (error || !data) {
      if (error) console.error('Error fetching site settings:', error);
      return settings;
    }

    for (const row of data as { key: string; value: string }[]) {
      if (row.key in settings && row.value.trim() !== '') {
        settings[row.key as keyof SiteSettings] = row.value.trim();
      }
    }

    return settings;
  },
  ['site-settings'],
  { tags: ['site-settings'], revalidate: 300 }
);

export const getSiteSettings = cache(fetchSiteSettings);

export function telHref(phone: string) {
  return `tel:${phone.replace(/[^0-9+]/g, '')}`;
}

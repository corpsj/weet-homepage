export type SiteSettings = {
  contact_phone: string;
  consult_hours: string;
  kakao_channel_url: string;
  contact_email: string;
  naver_blog_url: string;
  instagram_url: string;
  daangn_url: string;
  business_representative: string;
  mail_order_sales_number: string;
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
  business_representative: '대표자명 (사업자등록증상 대표자)',
  mail_order_sales_number: '통신판매업 신고번호 (예: 제2024-전남함평-0000호)',
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
  business_representative: '',
  mail_order_sales_number: '',
  trust_founded_year: '',
  trust_units_built: '',
  lead_time_note: '',
};

const URL_HOST_ALLOWLIST: Partial<Record<keyof SiteSettings, string[]>> = {
  kakao_channel_url: ['pf.kakao.com', 'center-pf.kakao.com', 'talk.kakao.com', 'open.kakao.com'],
  naver_blog_url: ['blog.naver.com', 'm.blog.naver.com'],
  instagram_url: ['instagram.com', 'www.instagram.com'],
  daangn_url: ['daangn.com', 'www.daangn.com'],
};

const URL_SETTING_KEYS = new Set<keyof SiteSettings>([
  'kakao_channel_url',
  'naver_blog_url',
  'instagram_url',
  'daangn_url',
]);

function cleanText(value: string, maxLength: number) {
  return value
    .replace(/[\u0000-\u001f\u007f]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength);
}

function sanitizeExternalUrl(key: keyof SiteSettings, value: string) {
  const trimmed = value.trim();
  if (!trimmed) return '';

  let parsed: URL;
  try {
    parsed = new URL(trimmed);
  } catch {
    throw new Error(`${SITE_SETTING_LABELS[key]}은(는) https URL이어야 합니다.`);
  }

  if (parsed.protocol !== 'https:') {
    throw new Error(`${SITE_SETTING_LABELS[key]}은(는) https URL만 허용됩니다.`);
  }

  const allowedHosts = URL_HOST_ALLOWLIST[key];
  if (allowedHosts && !allowedHosts.includes(parsed.hostname.toLowerCase())) {
    throw new Error(`${SITE_SETTING_LABELS[key]}의 도메인이 허용 목록에 없습니다.`);
  }

  parsed.hash = '';
  parsed.username = '';
  parsed.password = '';
  return parsed.toString();
}

export function sanitizeSiteSetting(key: keyof SiteSettings, value: string) {
  if (URL_SETTING_KEYS.has(key)) return sanitizeExternalUrl(key, value);

  if (key === 'contact_phone') {
    return cleanText(value.replace(/[^0-9+\-().\s]/g, ''), 40);
  }

  if (key === 'contact_email') {
    const email = cleanText(value, 120).toLowerCase();
    if (!email) return '';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error('문의 이메일 형식이 올바르지 않습니다.');
    }
    return email;
  }

  if (key === 'lead_time_note') return cleanText(value, 200);
  return cleanText(value, 120);
}

export function sanitizeSiteSettings(settings: SiteSettings) {
  const sanitized = { ...SITE_SETTING_DEFAULTS };
  for (const key of Object.keys(sanitized) as (keyof SiteSettings)[]) {
    sanitized[key] = sanitizeSiteSetting(key, settings[key] ?? '');
  }
  return sanitized;
}

export function telHref(phone: string) {
  return `tel:${phone.replace(/[^0-9+]/g, '')}`;
}

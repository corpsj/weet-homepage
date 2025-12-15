import type { UtmParams } from '@/lib/analytics/acquisition';

export type UtmBuildInput = {
  baseUrl: string;
  path?: string;
  utm: Required<Pick<UtmParams, 'utm_source' | 'utm_medium' | 'utm_campaign'>> &
    Pick<UtmParams, 'utm_content' | 'utm_term'>;
};

export function buildUtmUrl(input: UtmBuildInput) {
  const base = new URL(input.baseUrl);
  const path = input.path?.trim() || '/';
  const full = new URL(path.startsWith('/') ? path : `/${path}`, base);

  const params: Record<string, string | undefined> = {
    utm_source: input.utm.utm_source?.trim(),
    utm_medium: input.utm.utm_medium?.trim(),
    utm_campaign: input.utm.utm_campaign?.trim(),
    utm_content: input.utm.utm_content?.trim(),
    utm_term: input.utm.utm_term?.trim(),
  };

  for (const [key, value] of Object.entries(params)) {
    if (!value) continue;
    full.searchParams.set(key, value);
  }

  return full.toString();
}


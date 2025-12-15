export type UtmParams = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
};

export type ClickIdParams = {
  gclid?: string;
  msclkid?: string;
  fbclid?: string;
  wbraid?: string;
  gbraid?: string;
};

export type AcquisitionChannelGroup =
  | 'Direct'
  | 'Organic Search'
  | 'Paid Search'
  | 'Organic Social'
  | 'Paid Social'
  | 'Email'
  | 'Referral'
  | 'Display'
  | 'Other';

export type AcquisitionResult = {
  channelGroup: AcquisitionChannelGroup;
  source: string;
  medium: string;
  campaign?: string;
  content?: string;
  term?: string;
};

const SEARCH_HOSTS = new Set([
  'www.google.com',
  'google.com',
  'www.google.co.kr',
  'google.co.kr',
  'search.naver.com',
  'm.search.naver.com',
  'search.daum.net',
  'm.search.daum.net',
  'www.bing.com',
  'bing.com',
]);

const SOCIAL_HOSTS = new Set([
  'www.instagram.com',
  'instagram.com',
  'l.instagram.com',
  'm.instagram.com',
  'www.facebook.com',
  'facebook.com',
  'l.facebook.com',
  'm.facebook.com',
  't.co',
  'www.youtube.com',
  'youtube.com',
  'm.youtube.com',
]);

function safeLower(value?: string | null) {
  const trimmed = (value ?? '').trim();
  return trimmed ? trimmed.toLowerCase() : undefined;
}

function normalizeUtm(utm: UtmParams): UtmParams {
  return {
    utm_source: safeLower(utm.utm_source),
    utm_medium: safeLower(utm.utm_medium),
    utm_campaign: utm.utm_campaign?.trim() || undefined,
    utm_content: utm.utm_content?.trim() || undefined,
    utm_term: utm.utm_term?.trim() || undefined,
  };
}

function normalizeClickIds(clickIds: ClickIdParams): ClickIdParams {
  return {
    gclid: clickIds.gclid?.trim() || undefined,
    msclkid: clickIds.msclkid?.trim() || undefined,
    fbclid: clickIds.fbclid?.trim() || undefined,
    wbraid: clickIds.wbraid?.trim() || undefined,
    gbraid: clickIds.gbraid?.trim() || undefined,
  };
}

export function parseUtmFromUrl(url: string): UtmParams {
  const parsed = new URL(url);
  const params = parsed.searchParams;
  return normalizeUtm({
    utm_source: params.get('utm_source') ?? undefined,
    utm_medium: params.get('utm_medium') ?? undefined,
    utm_campaign: params.get('utm_campaign') ?? undefined,
    utm_content: params.get('utm_content') ?? undefined,
    utm_term: params.get('utm_term') ?? undefined,
  });
}

export function parseClickIdsFromUrl(url: string): ClickIdParams {
  const parsed = new URL(url);
  const params = parsed.searchParams;
  return normalizeClickIds({
    gclid: params.get('gclid') ?? undefined,
    msclkid: params.get('msclkid') ?? undefined,
    fbclid: params.get('fbclid') ?? undefined,
    wbraid: params.get('wbraid') ?? undefined,
    gbraid: params.get('gbraid') ?? undefined,
  });
}

function getHost(url?: string | null) {
  if (!url) return undefined;
  try {
    return new URL(url).host.toLowerCase();
  } catch {
    return undefined;
  }
}

function stripWww(host: string) {
  return host.startsWith('www.') ? host.slice(4) : host;
}

function isPaidByUtmOrClickIds(utm: UtmParams, clickIds: ClickIdParams) {
  if (clickIds.gclid || clickIds.msclkid || clickIds.wbraid || clickIds.gbraid) return true;
  const medium = utm.utm_medium;
  return (
    medium === 'cpc' ||
    medium === 'ppc' ||
    medium === 'paid' ||
    medium === 'paid_search' ||
    medium === 'paidsearch' ||
    medium === 'paid_social' ||
    medium === 'paidsocial' ||
    medium === 'display' ||
    medium === 'cpm'
  );
}

export function classifyAcquisition(input: {
  landingUrl: string;
  referrer?: string | null;
  siteOrigin?: string;
}): AcquisitionResult {
  const utm = parseUtmFromUrl(input.landingUrl);
  const clickIds = parseClickIdsFromUrl(input.landingUrl);

  const referrerHostRaw = getHost(input.referrer);
  const referrerHost = referrerHostRaw ? stripWww(referrerHostRaw) : undefined;
  const siteHostRaw = getHost(input.siteOrigin);
  const siteHost = siteHostRaw ? stripWww(siteHostRaw) : undefined;

  const hasUtm = Boolean(utm.utm_source || utm.utm_medium || utm.utm_campaign);
  const isSelfReferral = Boolean(referrerHost && siteHost && referrerHost === siteHost);

  if (hasUtm) {
    const medium = utm.utm_medium ?? 'referral';
    const source = utm.utm_source ?? 'unknown';

    if (isPaidByUtmOrClickIds(utm, clickIds)) {
      if (medium === 'paid_social' || medium === 'paidsocial' || medium === 'cpm') {
        return {
          channelGroup: 'Paid Social',
          source,
          medium,
          campaign: utm.utm_campaign,
          content: utm.utm_content,
          term: utm.utm_term,
        };
      }
      if (medium === 'display') {
        return {
          channelGroup: 'Display',
          source,
          medium,
          campaign: utm.utm_campaign,
          content: utm.utm_content,
          term: utm.utm_term,
        };
      }
      return {
        channelGroup: 'Paid Search',
        source,
        medium,
        campaign: utm.utm_campaign,
        content: utm.utm_content,
        term: utm.utm_term,
      };
    }

    if (medium === 'social') {
      return {
        channelGroup: 'Organic Social',
        source,
        medium,
        campaign: utm.utm_campaign,
        content: utm.utm_content,
        term: utm.utm_term,
      };
    }

    if (medium === 'email') {
      return {
        channelGroup: 'Email',
        source,
        medium,
        campaign: utm.utm_campaign,
        content: utm.utm_content,
        term: utm.utm_term,
      };
    }

    if (medium === 'referral') {
      return {
        channelGroup: 'Referral',
        source,
        medium,
        campaign: utm.utm_campaign,
        content: utm.utm_content,
        term: utm.utm_term,
      };
    }

    return {
      channelGroup: 'Other',
      source,
      medium,
      campaign: utm.utm_campaign,
      content: utm.utm_content,
      term: utm.utm_term,
    };
  }

  if (!input.referrer || isSelfReferral) {
    return { channelGroup: 'Direct', source: '(direct)', medium: '(none)' };
  }

  const hostForRules = referrerHostRaw?.toLowerCase();
  if (hostForRules && SEARCH_HOSTS.has(hostForRules)) {
    return { channelGroup: 'Organic Search', source: stripWww(hostForRules), medium: 'organic' };
  }
  if (hostForRules && SOCIAL_HOSTS.has(hostForRules)) {
    return { channelGroup: 'Organic Social', source: stripWww(hostForRules), medium: 'social' };
  }

  if (referrerHost) {
    return { channelGroup: 'Referral', source: referrerHost, medium: 'referral' };
  }

  return { channelGroup: 'Other', source: '(unknown)', medium: '(unknown)' };
}


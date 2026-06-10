import 'server-only';

import { cache } from 'react';
import { unstable_cache } from 'next/cache';
import { supabase } from '@/lib/supabase';
import {
  SITE_SETTING_DEFAULTS,
  sanitizeSiteSetting,
  type SiteSettings,
} from '@/lib/site-settings';

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
      if (!(row.key in settings) || row.value.trim() === '') continue;

      const key = row.key as keyof SiteSettings;
      try {
        settings[key] = sanitizeSiteSetting(key, row.value);
      } catch (sanitizeError) {
        console.warn('Ignoring unsafe site setting:', key, sanitizeError);
      }
    }

    return settings;
  },
  ['site-settings'],
  { tags: ['site-settings'], revalidate: 300 }
);

export const getSiteSettings = cache(fetchSiteSettings);

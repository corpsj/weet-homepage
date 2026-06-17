import 'server-only';

import { cache } from 'react';
import { unstable_cache } from 'next/cache';
import { supabase } from '@/lib/supabase';
import {
  SITE_SETTING_DEFAULTS,
  sanitizeSiteSetting,
  type SiteSettings,
} from '@/lib/site-settings';

// `site_settings` is not present in the generated `Database` types, so the
// typed client narrows `.from('site_settings')` to `never`. We assert the row
// shape we actually select here instead of falling back to `any`.
type SiteSettingRow = { key: string; value: string };

const fetchSiteSettings = unstable_cache(
  async (): Promise<SiteSettings> => {
    const { data, error } = await supabase
      .from('site_settings' as never)
      .select('key, value')
      .returns<SiteSettingRow[]>();

    const settings = { ...SITE_SETTING_DEFAULTS };
    if (error || !data) {
      if (error) console.error('Error fetching site settings:', error);
      return settings;
    }

    for (const row of data) {
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

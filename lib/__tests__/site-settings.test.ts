import { describe, expect, it } from 'vitest';
import { sanitizeSiteSetting, telHref } from '@/lib/site-settings';

describe('site settings security helpers', () => {
  it('allows configured https social URLs', () => {
    expect(sanitizeSiteSetting('instagram_url', 'https://www.instagram.com/weet_kr/#top')).toBe(
      'https://www.instagram.com/weet_kr/'
    );
  });

  it('blocks javascript URLs in public link settings', () => {
    expect(() => sanitizeSiteSetting('naver_blog_url', 'javascript:alert(1)')).toThrow(/https URL/);
  });

  it('blocks unapproved hosts for branded public links', () => {
    expect(() => sanitizeSiteSetting('instagram_url', 'https://evil.example/weet_kr')).toThrow(/허용 목록/);
  });

  it('normalizes telephone href values to dial-safe characters', () => {
    expect(telHref('010-9645-2348 ext<script>')).toBe('tel:01096452348');
  });
});

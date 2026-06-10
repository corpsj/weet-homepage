import { describe, expect, it } from 'vitest';
import { isAdminEmailAllowed, parseAdminEmailAllowlist } from '@/lib/admin-permissions';

describe('isAdminEmailAllowed', () => {
  it('allows @weet.com emails when the allowlist is empty (production regression case)', () => {
    expect(isAdminEmailAllowed('admin@weet.com', { allowlistRaw: undefined })).toBe(true);
    expect(isAdminEmailAllowed('admin@weet.com', { allowlistRaw: '' })).toBe(true);
    expect(isAdminEmailAllowed('Admin@Weet.com', { allowlistRaw: '  , ' })).toBe(true);
  });

  it('rejects non-weet.com emails when the allowlist is empty', () => {
    expect(isAdminEmailAllowed('intruder@gmail.com', { allowlistRaw: '' })).toBe(false);
    expect(isAdminEmailAllowed('fake@weet.com.evil.com', { allowlistRaw: '' })).toBe(false);
    expect(isAdminEmailAllowed('', { allowlistRaw: '' })).toBe(false);
  });

  it('only allows allowlisted emails when the allowlist is configured', () => {
    const allowlistRaw = 'boss@weet.com, Partner@example.com';
    expect(isAdminEmailAllowed('boss@weet.com', { allowlistRaw })).toBe(true);
    expect(isAdminEmailAllowed('partner@example.com', { allowlistRaw })).toBe(true);
    expect(isAdminEmailAllowed('other@weet.com', { allowlistRaw })).toBe(false);
  });

  it('disables the @weet.com fallback when ADMIN_ALLOW_WEET_DOMAIN_FALLBACK is false', () => {
    expect(
      isAdminEmailAllowed('admin@weet.com', { allowlistRaw: '', weetDomainFallbackRaw: 'false' })
    ).toBe(false);
  });

  it('keeps the configured allowlist working even when the fallback is disabled', () => {
    expect(
      isAdminEmailAllowed('boss@weet.com', {
        allowlistRaw: 'boss@weet.com',
        weetDomainFallbackRaw: 'false',
      })
    ).toBe(true);
  });
});

describe('parseAdminEmailAllowlist', () => {
  it('normalizes, trims, and drops empty entries', () => {
    expect(parseAdminEmailAllowlist(' Boss@Weet.com ,, partner@example.com ,')).toEqual([
      'boss@weet.com',
      'partner@example.com',
    ]);
    expect(parseAdminEmailAllowlist(undefined)).toEqual([]);
  });
});

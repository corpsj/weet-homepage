const WEET_ADMIN_EMAIL_DOMAIN = '@weet.com';

export function parseAdminEmailAllowlist(raw: string | null | undefined): string[] {
  return (raw || '')
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export interface AdminPermissionConfig {
  /** Raw ADMIN_EMAIL_ALLOWLIST env value (comma-separated emails). */
  allowlistRaw?: string | null;
  /** Raw ADMIN_ALLOW_WEET_DOMAIN_FALLBACK env value; only 'false' disables the fallback. */
  weetDomainFallbackRaw?: string | null;
}

export function isAdminEmailAllowed(email: string, config: AdminPermissionConfig): boolean {
  const normalized = email.trim().toLowerCase();
  if (!normalized) {
    return false;
  }

  const allowlist = parseAdminEmailAllowlist(config.allowlistRaw);
  if (allowlist.length > 0) {
    return allowlist.includes(normalized);
  }

  if (config.weetDomainFallbackRaw === 'false') {
    return false;
  }

  return normalized.endsWith(WEET_ADMIN_EMAIL_DOMAIN);
}

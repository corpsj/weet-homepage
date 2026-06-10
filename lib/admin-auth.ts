import { createClient } from '@/utils/supabase/server';
import { isAdminEmailAllowed } from '@/lib/admin-permissions';

export async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user?.email) {
    throw new Error('관리자 인증이 필요합니다.');
  }

  const isAllowed = isAdminEmailAllowed(user.email, {
    allowlistRaw: process.env.ADMIN_EMAIL_ALLOWLIST,
    weetDomainFallbackRaw: process.env.ADMIN_ALLOW_WEET_DOMAIN_FALLBACK,
  });

  if (!isAllowed) {
    throw new Error('관리자 권한이 없습니다.');
  }

  return user;
}

import { createClient } from '@/utils/supabase/server';

function getAllowedAdminEmails() {
  return (process.env.ADMIN_EMAIL_ALLOWLIST || '')
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user?.email) {
    throw new Error('관리자 인증이 필요합니다.');
  }

  const email = user.email.toLowerCase();
  const allowlist = getAllowedAdminEmails();
  const isAllowed = allowlist.length > 0 ? allowlist.includes(email) : email.endsWith('@weet.com');

  if (!isAllowed) {
    throw new Error('관리자 권한이 없습니다.');
  }

  return user;
}

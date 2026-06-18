import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

// OAuth(예: Google) 로그인 후 Supabase가 code와 함께 돌려보내는 콜백.
// code를 세션으로 교환하고 next(기본 /admin)로 이동한다. (@supabase/ssr 표준 패턴)
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/admin';

  // 오픈 리다이렉트 방지: 같은 출처 내부 경로만 허용한다.
  const safeNext = next.startsWith('/') && !next.startsWith('//') ? next : '/admin';

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${safeNext}`);
    }
  }

  return NextResponse.redirect(`${origin}/login?error=Could not authenticate user`);
}

import 'server-only'

import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { Database } from '@/types/supabase'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

// 클라이언트 lazy 생성
let _supabase: SupabaseClient<Database> | null = null
let _supabaseAdmin: SupabaseClient<Database> | null = null

export const supabase = (() => {
  if (!_supabase && supabaseUrl && supabaseAnonKey) {
    _supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)
  }
  return _supabase as SupabaseClient<Database>
})()

// 서버 사이드 전용 (API 라우트에서만 사용) - getter 함수로 lazy 초기화
export function getSupabaseAdmin(): SupabaseClient<Database> {
  if (!_supabaseAdmin) {
    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error(
        'Supabase Admin 환경 변수가 설정되지 않았습니다. ' +
        'Vercel 대시보드에서 NEXT_PUBLIC_SUPABASE_URL과 SUPABASE_SERVICE_ROLE_KEY를 설정해주세요.'
      );
    }

    _supabaseAdmin = createClient<Database>(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
  }

  return _supabaseAdmin
}

// 기존 코드 호환성을 위한 export (단, 사용 시점에 초기화됨)
export const supabaseAdmin = new Proxy({} as SupabaseClient<Database>, {
  get(_, prop) {
    return getSupabaseAdmin()[prop as keyof SupabaseClient<Database>]
  }
})

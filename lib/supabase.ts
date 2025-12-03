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

// 서버 사이드 전용 (API 라우트에서만 사용)
export const supabaseAdmin = (() => {
  if (!_supabaseAdmin) {
    if (!supabaseUrl || !supabaseServiceKey) {
      // 키가 없으면 null을 반환하지 않고, 사용 시점에 에러가 나도록 하거나
      // 여기서 에러를 던지는 게 낫습니다. 하지만 모듈 로드 시점에 에러가 나면 빌드가 깨질 수 있으므로
      // createClient가 실패하지 않도록 주의해야 합니다.
      // 여기서는 일단 null 체크를 제거하고 항상 createClient를 시도하되, 키가 없으면 더미 클라이언트를 반환하거나
      // 또는 명시적으로 에러를 던집니다.
      if (typeof window === 'undefined') { // 서버 사이드에서만 체크
        console.warn('Supabase Admin keys are missing!');
      }
    }

    if (supabaseUrl && supabaseServiceKey) {
      _supabaseAdmin = createClient<Database>(supabaseUrl, supabaseServiceKey, {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      })
    }
  }

  // 만약 키가 없어서 _supabaseAdmin이 생성되지 않았다면, 
  // 호출 시점에 에러가 발생하도록 Proxy를 쓰거나, 
  // 아니면 그냥 createClient에 빈 문자열을 넣어서 Supabase가 내부적으로 에러를 뱉게 하는 게 나을 수 있습니다.
  // 하지만 여기서는 안전하게 null check를 하는 getter를 만드는 게 좋겠지만, 
  // 기존 코드를 최소한으로 건드리기 위해 아래와 같이 수정합니다.

  if (!_supabaseAdmin) {
    // Fallback to avoid runtime crash on property access, but requests will fail
    return createClient<Database>(supabaseUrl || 'https://placeholder.supabase.co', supabaseServiceKey || 'placeholder')
  }

  return _supabaseAdmin
})()

import { createServerClient } from '@supabase/ssr';
import { Database } from '@/types/supabase';
import { cookies } from 'next/headers';

export function createServiceRoleClient() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

    return createServerClient<Database>(
        supabaseUrl,
        supabaseServiceRoleKey,
        {
            cookies: {
                getAll() { return [] },
                setAll() { }
            }
        }
    );
}

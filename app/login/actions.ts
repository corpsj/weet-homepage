'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
    const supabase = await createClient()

    const id = String(formData.get('id') ?? '').trim().toLowerCase()
    const password = String(formData.get('password') ?? '')

    if (!/^[a-z0-9._-]{1,64}$/.test(id) || !password) {
        redirect('/login?error=Could not authenticate user')
    }

    // ID만 입력받아 이메일 형식으로 변환
    const email = `${id}@weet.com`

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        redirect('/login?error=Could not authenticate user')
    }

    revalidatePath('/', 'layout')
    redirect('/admin')
}

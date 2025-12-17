'use server';

import { createClient } from '@/utils/supabase/server';
import { createServiceRoleClient } from '@/utils/supabase/service';
import { revalidatePath } from 'next/cache';
import { Database } from '@/types/supabase';

type HeroSlide = Database['public']['Tables']['hero_slides']['Row'];
type Product = Database['public']['Tables']['products']['Row'];

// --- Hero Slides ---

export async function getHeroSlides() {
    const supabase = await createClient();
    // eslint-disable-next-line
    const { data, error } = await (supabase as any)
        .from('hero_slides')
        .select('*')
        .order('display_order', { ascending: true });

    if (error) {
        console.error('Error fetching hero slides:', error);
        return [];
    }

    return data as HeroSlide[];
}

export async function createHeroSlide(formData: FormData) {
    // Use Service Role Client to bypass RLS
    const supabase = createServiceRoleClient();
    const title = formData.get('title') as string;
    const subtitle = formData.get('subtitle') as string;
    const image_url = formData.get('image_url') as string;

    // Get max display_order
    // eslint-disable-next-line
    const { data: maxOrderData } = await (supabase as any)
        .from('hero_slides')
        .select('display_order')
        .order('display_order', { ascending: false })
        .limit(1)
        .single();

    const nextOrder = (maxOrderData?.display_order || 0) + 1;

    // eslint-disable-next-line
    const { error } = await (supabase as any)
        .from('hero_slides')
        .insert({
            title,
            subtitle,
            image_url,
            display_order: nextOrder,
            is_active: true
        });

    if (error) {
        console.error('Error creating hero slide:', error);
        throw new Error('슬라이드 생성 실패: ' + error.message);
    }

    revalidatePath('/admin/main');
    revalidatePath('/'); // Revalidate homepage
}

export async function updateHeroSlide(id: number, formData: FormData) {
    // Use Service Role Client to bypass RLS
    const supabase = createServiceRoleClient();
    const title = formData.get('title') as string;
    const subtitle = formData.get('subtitle') as string;
    const image_url = formData.get('image_url') as string;

    // eslint-disable-next-line
    const { error } = await (supabase as any)
        .from('hero_slides')
        .update({
            title,
            subtitle,
            image_url
        })
        .eq('id', id);

    if (error) {
        console.error('Error updating hero slide:', error);
        throw new Error('슬라이드 수정 실패: ' + error.message);
    }

    revalidatePath('/admin/main');
    revalidatePath('/');
}

export async function deleteHeroSlide(id: number) {
    // Use Service Role Client to bypass RLS
    const supabase = createServiceRoleClient();
    // eslint-disable-next-line
    const { error } = await (supabase as any)
        .from('hero_slides')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting hero slide:', error);
        throw new Error('슬라이드 삭제 실패: ' + error.message);
    }

    revalidatePath('/admin/main');
    revalidatePath('/');
}

// --- Signature Line ---

export async function getSignatureProducts() {
    const supabase = await createClient();
    // eslint-disable-next-line
    const { data, error } = await (supabase as any)
        .from('products')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching products:', error);
        return [];
    }

    return data as Product[];
}

export async function updateSignatureStatus(productId: string, isSignature: boolean) {
    const supabase = createServiceRoleClient();

    // Check current count if enabling
    if (isSignature) {
        // eslint-disable-next-line
        const { count, error: countError } = await (supabase as any)
            .from('products')
            .select('*', { count: 'exact', head: true })
            .eq('is_signature', true);

        if (countError) throw new Error('Failed to check signature count');
        if ((count || 0) >= 10) {
            throw new Error('Signature 제품은 최대 10개까지만 설정 가능합니다.');
        }
    }

    // eslint-disable-next-line
    const { error } = await (supabase as any)
        .from('products')
        .update({ is_signature: isSignature })
        .eq('id', productId);

    if (error) {
        console.error('Error updating signature status:', error);
        throw new Error('상태 업데이트 실패');
    }

    revalidatePath('/admin/main');
    revalidatePath('/');
}

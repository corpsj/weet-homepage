'use server';

import { createServiceRoleClient } from '@/utils/supabase/service';
import { revalidatePath } from 'next/cache';
import { Database } from '@/types/supabase';
import { requireAdmin } from '@/lib/admin-auth';

type HeroSlide = Database['public']['Tables']['hero_slides']['Row'];
type Product = Database['public']['Tables']['products']['Row'];

type HeroSlideInput = {
    title: string;
    subtitle: string;
    image_url: string;
    link_url?: string | null;
    is_active?: boolean;
};

function normalizeHeroUrl(value: string | null | undefined, fieldName: string, allowRelative = true) {
    const trimmed = value?.trim() ?? '';
    if (!trimmed) return null;

    if (allowRelative && trimmed.startsWith('/') && !trimmed.startsWith('//')) {
        return trimmed.slice(0, 300);
    }

    let parsed: URL;
    try {
        parsed = new URL(trimmed);
    } catch {
        throw new Error(`${fieldName} URL 형식이 올바르지 않습니다.`);
    }

    if (parsed.protocol !== 'https:') {
        throw new Error(`${fieldName}은(는) https URL만 허용됩니다.`);
    }

    parsed.username = '';
    parsed.password = '';
    return parsed.toString();
}

function normalizeHeroSlideInput(data: HeroSlideInput) {
    const title = data.title.trim();
    const imageUrl = normalizeHeroUrl(data.image_url, '이미지', true);

    if (!title) throw new Error('메인 타이틀을 입력해주세요.');
    if (!imageUrl) throw new Error('이미지를 선택해주세요.');

    return {
        title: title.slice(0, 160),
        subtitle: data.subtitle.trim().slice(0, 300),
        image_url: imageUrl,
        link_url: normalizeHeroUrl(data.link_url, '클릭 링크', true),
        is_active: data.is_active ?? true,
    };
}

async function assertCanDeactivateHeroSlide(supabase: any, id: string) {
    const { data: currentSlide, error: currentError } = await supabase
        .from('hero_slides')
        .select('is_active')
        .eq('id', id)
        .single();

    if (currentError) throw new Error('슬라이드 상태를 확인하지 못했습니다.');
    if (!currentSlide?.is_active) return;

    const { count, error: countError } = await supabase
        .from('hero_slides')
        .select('id', { count: 'exact', head: true })
        .eq('is_active', true);

    if (countError) throw new Error('공개 슬라이드 수를 확인하지 못했습니다.');
    if ((count ?? 0) <= 1) {
        throw new Error('홈 화면에는 최소 1개의 공개 슬라이드가 필요합니다.');
    }
}

// --- Hero Slides ---

export async function getHeroSlides() {
    await requireAdmin();

    const supabase = createServiceRoleClient();
    const { data, error } = await (supabase as any)
        .from('hero_slides')
        .select('*')
        .order('sort_order', { ascending: true });

    if (error) {
        console.error('--- SERVER: getHeroSlides ERROR ---', error);
        return [];
    }

    return data as HeroSlide[];
}

export async function createHeroSlide(data: HeroSlideInput) {
    await requireAdmin();

    try {
        const supabase = createServiceRoleClient();
        const normalized = normalizeHeroSlideInput(data);

        // Get max sort_order
        const { data: maxOrderData, error: maxOrderError } = await (supabase as any)
            .from('hero_slides')
            .select('sort_order')
            .order('sort_order', { ascending: false })
            .limit(1)
            .single();

        if (maxOrderError && maxOrderError.code !== 'PGRST116') {
            console.error('Error fetching max sort_order:', maxOrderError);
        }

        const nextOrder = (maxOrderData?.sort_order || 0) + 1;

        const { error } = await (supabase as any)
            .from('hero_slides')
            .insert({
                ...normalized,
                sort_order: nextOrder,
            });

        if (error) {
            console.error('SERVER: Insert failed:', error);
            return { success: false, error: error.message };
        }

        revalidatePath('/admin/main');
        revalidatePath('/');
        return { success: true };
    } catch (error: any) {
        console.error('--- SERVER: createHeroSlide FAILED ---', error);
        return { success: false, error: error.message || 'Internal server error' };
    }
}

export async function updateHeroSlide(id: string, data: HeroSlideInput) {
    await requireAdmin();

    try {
        const supabase = createServiceRoleClient();
        const normalized = normalizeHeroSlideInput(data);

        if (!normalized.is_active) {
            await assertCanDeactivateHeroSlide(supabase, id);
        }

        const { error } = await (supabase as any)
            .from('hero_slides')
            .update(normalized)
            .eq('id', id);

        if (error) {
            console.error('SERVER: Update failed:', error);
            return { success: false, error: error.message };
        }

        revalidatePath('/admin/main');
        revalidatePath('/');
        return { success: true };
    } catch (error: any) {
        console.error('--- SERVER: updateHeroSlide FAILED ---', error);
        return { success: false, error: error.message || 'Internal server error' };
    }
}

export async function deleteHeroSlide(id: string) {
    await requireAdmin();

    // Use Service Role Client to bypass RLS
    const supabase = createServiceRoleClient();
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

export async function setHeroSlideActive(id: string, isActive: boolean) {
    await requireAdmin();

    const supabase = createServiceRoleClient();
    if (!isActive) {
        try {
            await assertCanDeactivateHeroSlide(supabase, id);
        } catch (error: any) {
            return { success: false, error: error.message || '슬라이드를 숨길 수 없습니다.' };
        }
    }

    const { error } = await (supabase as any)
        .from('hero_slides')
        .update({ is_active: isActive })
        .eq('id', id);

    if (error) {
        console.error('Error updating hero slide active status:', error);
        return { success: false, error: error.message };
    }

    revalidatePath('/admin/main');
    revalidatePath('/');
    return { success: true };
}

export async function reorderHeroSlides(ids: string[]) {
    await requireAdmin();

    try {
        const supabase = createServiceRoleClient();

        // Sequential updates to avoid partial upsert validation issues
        for (let i = 0; i < ids.length; i++) {
            const id = ids[i];
            const { error } = await (supabase as any)
                .from('hero_slides')
                .update({ sort_order: i })
                .eq('id', id);

            if (error) {
                console.error(`SERVER: Reorder failed at index ${i} (ID: ${id}):`, error);
                return { success: false, error: `ID ${id} 정렬 실패: ` + error.message };
            }
        }

        revalidatePath('/admin/main');
        revalidatePath('/');
        return { success: true };
    } catch (error: any) {
        console.error('--- SERVER: reorderHeroSlides FAILED ---', error);
        return { success: false, error: error.message || 'Internal server error' };
    }
}

// --- Signature Line ---

export async function getSignatureProducts() {
    await requireAdmin();

    const supabase = createServiceRoleClient();
    const { data, error } = await (supabase as any)
        .from('products')
        .select('*')
        .order('display_order', { ascending: true })
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching products:', error);
        return [];
    }

    return data as Product[];
}

export async function updateSignatureStatus(productId: string, isSignature: boolean) {
    await requireAdmin();

    const supabase = createServiceRoleClient();

    // Check current count if enabling
    if (isSignature) {
        const { data: product, error: productError } = await (supabase as any)
            .from('products')
            .select('is_active')
            .eq('id', productId)
            .single();

        if (productError) throw new Error('제품 상태를 확인하지 못했습니다.');
        if (!product?.is_active) {
            throw new Error('비공개 제품은 시그니처 라인에 노출할 수 없습니다.');
        }

        const { count, error: countError } = await (supabase as any)
            .from('products')
            .select('*', { count: 'exact', head: true })
            .eq('is_active', true)
            .eq('is_signature', true);

        if (countError) throw new Error('Failed to check signature count');
        if ((count || 0) >= 10) {
            throw new Error('Signature 제품은 최대 10개까지만 설정 가능합니다.');
        }
    }

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

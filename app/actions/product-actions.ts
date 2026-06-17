'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { supabaseAdmin } from '@/lib/supabase';
import { ProductInsert, ProductUpdate } from '@/types/supabase';
import { requireAdmin } from '@/lib/admin-auth';

const optionalText = z
    .string()
    .max(2000)
    .nullish()
    .transform((value) => value ?? null);

const optionalNumber = z.coerce.number().int().nullish().transform((value) => value ?? null);

// Explicit allow-list of admin-editable product columns. Forbidden columns
// (id, created_at, updated_at) are never read from client input: id comes from
// the route/server, timestamps are managed by the DB.
const productSchema = z.object({
    name: z.string().trim().min(1).max(200),
    tagline: z.string().max(500),
    description: z.string().max(5000),
    image_url: z.string().max(2000),
    size_category: z.string().trim().min(1).max(40),
    sub_category: optionalText,
    price: optionalText,
    size: optionalText,
    structure: optionalText,
    roof_type: optionalText,
    exterior_finish: optionalText,
    interior_finish: optionalText,
    floor_plan_url: optionalText,
    sub_images: z.array(z.string().max(2000)).nullish().transform((value) => value ?? null),
    is_active: z.boolean().nullish().transform((value) => value ?? null),
    is_signature: z.boolean().nullish().transform((value) => value ?? null),
    display_order: optionalNumber,
});

const productUpdateSchema = productSchema.partial();

export async function createProduct(data: ProductInsert) {
    await requireAdmin();

    const parsed = productSchema.parse(data);
    const payload: ProductInsert = {
        name: parsed.name,
        tagline: parsed.tagline,
        description: parsed.description,
        image_url: parsed.image_url,
        size_category: parsed.size_category,
        sub_category: parsed.sub_category,
        price: parsed.price,
        size: parsed.size,
        structure: parsed.structure,
        roof_type: parsed.roof_type,
        exterior_finish: parsed.exterior_finish,
        interior_finish: parsed.interior_finish,
        floor_plan_url: parsed.floor_plan_url,
        sub_images: parsed.sub_images,
        is_active: parsed.is_active,
        is_signature: parsed.is_signature,
        display_order: parsed.display_order,
    };

    const { error } = await supabaseAdmin
        .from('products')
        .insert(payload);

    if (error) {
        console.error('Error creating product:', error);
        throw new Error(`Failed to create product: ${error.message} (${error.details || ''})`);
    }

    revalidatePath('/admin/products');
    revalidatePath('/products');
}

export async function updateProduct(id: string, data: ProductUpdate) {
    await requireAdmin();

    const parsed = productUpdateSchema.parse(data);
    // Only assign keys that were actually provided so partial edits never null
    // out untouched columns. id/created_at/updated_at are intentionally absent.
    const payload: ProductUpdate = {};
    if (parsed.name !== undefined) payload.name = parsed.name;
    if (parsed.tagline !== undefined) payload.tagline = parsed.tagline;
    if (parsed.description !== undefined) payload.description = parsed.description;
    if (parsed.image_url !== undefined) payload.image_url = parsed.image_url;
    if (parsed.size_category !== undefined) payload.size_category = parsed.size_category;
    if (parsed.sub_category !== undefined) payload.sub_category = parsed.sub_category;
    if (parsed.price !== undefined) payload.price = parsed.price;
    if (parsed.size !== undefined) payload.size = parsed.size;
    if (parsed.structure !== undefined) payload.structure = parsed.structure;
    if (parsed.roof_type !== undefined) payload.roof_type = parsed.roof_type;
    if (parsed.exterior_finish !== undefined) payload.exterior_finish = parsed.exterior_finish;
    if (parsed.interior_finish !== undefined) payload.interior_finish = parsed.interior_finish;
    if (parsed.floor_plan_url !== undefined) payload.floor_plan_url = parsed.floor_plan_url;
    if (parsed.sub_images !== undefined) payload.sub_images = parsed.sub_images;
    if (parsed.is_active !== undefined) payload.is_active = parsed.is_active;
    if (parsed.is_signature !== undefined) payload.is_signature = parsed.is_signature;
    if (parsed.display_order !== undefined) payload.display_order = parsed.display_order;

    const { error } = await supabaseAdmin
        .from('products')
        .update(payload)
        .eq('id', id);

    if (error) {
        console.error('Error updating product:', error);
        throw new Error(`Failed to update product: ${error.message} (${error.details || ''})`);
    }

    revalidatePath('/admin/products');
    revalidatePath(`/admin/products/${id}`);
    revalidatePath('/products');
}

export async function deleteProduct(id: string) {
    await requireAdmin();

    const { error } = await supabaseAdmin
        .from('products')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting product:', error);
        throw new Error('Failed to delete product');
    }

    revalidatePath('/admin/products');
    revalidatePath('/products');
}

export async function toggleProductStatus(id: string, isActive: boolean) {
    await requireAdmin();

    const { error } = await supabaseAdmin
        .from('products')
        .update({ is_active: isActive })
        .eq('id', id);

    if (error) {
        console.error('Error toggling product status:', error);
        throw new Error('Failed to toggle product status');
    }

    revalidatePath('/admin/products');
    revalidatePath('/products');
}

export async function reorderProducts(orderedIds: string[]) {
    await requireAdmin();

    try {
        // 각 제품의 display_order를 배열 인덱스로 업데이트
        for (let i = 0; i < orderedIds.length; i++) {
            const { error } = await supabaseAdmin
                .from('products')
                .update({ display_order: i })
                .eq('id', orderedIds[i]);

            if (error) {
                console.error(`Error updating order for product ${orderedIds[i]}:`, error);
                throw new Error('Failed to reorder products');
            }
        }

        revalidatePath('/admin/products');
        revalidatePath('/products');
    } catch (error) {
        console.error('Error reordering products:', error);
        throw new Error('Failed to reorder products');
    }
}

'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { supabaseAdmin } from '@/lib/supabase';
import { ProductInsert, ProductUpdate } from '@/types/supabase';

export async function createProduct(data: ProductInsert) {
    const { error } = await supabaseAdmin
        .from('products')
        .insert(data as never);

    if (error) {
        console.error('Error creating product:', error);
        throw new Error('Failed to create product');
    }

    revalidatePath('/admin/products');
    revalidatePath('/products');
    redirect('/admin/products');
}

export async function updateProduct(id: string, data: ProductUpdate) {
    const { error } = await supabaseAdmin
        .from('products')
        .update(data as never)
        .eq('id', id);

    if (error) {
        console.error('Error updating product:', error);
        throw new Error('Failed to update product');
    }

    revalidatePath('/admin/products');
    revalidatePath(`/admin/products/${id}`);
    revalidatePath('/products');
    redirect('/admin/products');
}

export async function deleteProduct(id: string) {
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
    const { error } = await supabaseAdmin
        .from('products')
        .update({ is_active: isActive } as never)
        .eq('id', id);

    if (error) {
        console.error('Error toggling product status:', error);
        throw new Error('Failed to toggle product status');
    }

    revalidatePath('/admin/products');
    revalidatePath('/products');
}

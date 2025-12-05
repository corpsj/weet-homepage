'use server';

import { getSupabaseAdmin } from '@/lib/supabase';

export async function uploadImageAction(formData: FormData) {
    try {
        const file = formData.get('file') as File;
        const bucket = formData.get('bucket') as string || 'products';
        const path = formData.get('path') as string;

        if (!file) {
            throw new Error('No file provided');
        }

        const supabaseAdmin = getSupabaseAdmin();

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const { data, error } = await supabaseAdmin.storage
            .from(bucket)
            .upload(path, buffer, {
                contentType: file.type,
                upsert: true
            });

        if (error) {
            throw error;
        }

        const { data: publicUrlData } = supabaseAdmin.storage
            .from(bucket)
            .getPublicUrl(path);

        return { success: true, url: publicUrlData.publicUrl };
    } catch (error) {
        console.error('Upload error:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Upload failed'
        };
    }
}

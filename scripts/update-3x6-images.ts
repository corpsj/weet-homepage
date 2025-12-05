
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const TARGET_PRODUCT_IDS = [
    '8537ea88-c9c5-4fa4-86a3-74fdee5c787a', // 3X6 집 (적삼목)
    '9720112a-6bc4-46ec-8dfe-55b4ab5f18b0'  // 3X6 집 (스타코)
];

const EXISTING_IMAGE_URL = 'https://nyrsdwjpowbmmytqkwwv.supabase.co/storage/v1/object/public/products/3x6_house_1764897444148.png';

async function updateImages() {
    try {
        // Skip upload, use existing URL
        const publicUrl = EXISTING_IMAGE_URL;
        console.log('Using existing image:', publicUrl);

        // 4. Update Products
        for (const id of TARGET_PRODUCT_IDS) {
            const { error: updateError } = await supabase
                .from('products')
                .update({ image_url: publicUrl })
                .eq('id', id);

            if (updateError) {
                console.error(`Failed to update product ${id}:`, updateError);
            } else {
                console.log(`Updated product ${id} with new image.`);
            }
        }

    } catch (error) {
        console.error('Error:', error);
    }
}

updateImages();


import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const UPDATES = [
    {
        productId: '8537ea88-c9c5-4fa4-86a3-74fdee5c787a', // 3X6 집 (적삼목)
        filePath: 'public/images/products/small/private/3. 3x6집.jpg',
        fileName: '3x6_red_cedar.jpg'
    },
    {
        productId: '9720112a-6bc4-46ec-8dfe-55b4ab5f18b0', // 3X6 집 (스타코)
        filePath: 'public/images/products/small/private/4. 3x6집.jpg',
        fileName: '3x6_stucco.jpg'
    }
];

async function updateImages() {
    for (const update of UPDATES) {
        try {
            console.log(`Processing ${update.fileName}...`);

            // 1. Check if file exists
            if (!fs.existsSync(update.filePath)) {
                console.error(`File not found: ${update.filePath}`);
                // Try glob matching if exact path fails due to unicode normalization
                const dir = path.dirname(update.filePath);
                const files = fs.readdirSync(dir);
                const match = files.find(f => f.normalize('NFC').includes(update.fileName.split('_')[1] === 'red' ? '3. 3x6' : '4. 3x6'));
                if (match) {
                    console.log(`Found matching file: ${match}`);
                    update.filePath = path.join(dir, match);
                } else {
                    continue;
                }
            }

            const fileBuffer = fs.readFileSync(update.filePath);
            const storagePath = `products/${update.fileName}_${Date.now()}`;

            // 2. Upload
            const { error: uploadError } = await supabase.storage
                .from('products')
                .upload(storagePath, fileBuffer, {
                    contentType: 'image/jpeg',
                    upsert: true
                });

            if (uploadError) {
                throw new Error(`Upload failed: ${uploadError.message}`);
            }

            // 3. Get URL
            const { data: urlData } = supabase.storage
                .from('products')
                .getPublicUrl(storagePath);

            const publicUrl = urlData.publicUrl;
            console.log(`Uploaded to: ${publicUrl}`);

            // 4. Update Product
            const { error: updateError } = await supabase
                .from('products')
                .update({ image_url: publicUrl })
                .eq('id', update.productId);

            if (updateError) {
                console.error(`Failed to update product ${update.productId}:`, updateError);
            } else {
                console.log(`Successfully updated product ${update.productId}`);
            }

        } catch (error) {
            console.error(`Error processing ${update.fileName}:`, error);
        }
    }
}

updateImages();

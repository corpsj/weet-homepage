
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

// Load environment variables
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

const SOURCE_FILE = path.join('대체이미지', 'S', '1. 3x9집.png');
const BUCKET_NAME = 'products';

async function main() {
    console.log(`Starting 3x9 Image Fix...`);

    if (!fs.existsSync(SOURCE_FILE)) {
        console.error(`File not found: ${SOURCE_FILE}`);
        return;
    }

    try {
        // 1. Convert to WebP
        console.log(`Optimizing ${SOURCE_FILE}...`);
        const buffer = await sharp(SOURCE_FILE)
            .rotate()
            .webp({ quality: 90 }) // High quality
            .toBuffer();

        // 2. Upload
        const fileName = `fixed_3x9_${Date.now()}.webp`;
        const storagePath = `products/webp/${fileName}`;

        console.log(`Uploading to ${storagePath}...`);
        const { error: uploadError } = await supabase.storage
            .from(BUCKET_NAME)
            .upload(storagePath, buffer, {
                contentType: 'image/webp',
                upsert: true
            });

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
            .from(BUCKET_NAME)
            .getPublicUrl(storagePath);

        console.log(`Uploaded: ${publicUrl}`);

        // 3. Update Product
        console.log('Updating Product "3X9 집"...');
        // Find product ID first to be safe
        const { data: products } = await supabase
            .from('products')
            .select('id, name')
            .ilike('name', '%3X9%')
            .not('name', 'ilike', '%+%'); // Exclude combos if any

        if (!products || products.length === 0) {
            console.error('Product "3X9 집" not found.');
        } else {
            const product = products[0];
            const { error: prodUpdateError } = await supabase
                .from('products')
                .update({ image_url: publicUrl })
                .eq('id', product.id);

            if (prodUpdateError) console.error('Product update failed:', prodUpdateError);
            else console.log(`Product ${product.name} updated.`);
        }

        // 4. Update Hero Slide
        console.log('Updating Hero Slide...');
        // We want the FIRST slide (or whichever is displaying 3x9) to use this.
        // Or we search for slides that currently use a 3x9 image?
        // Let's just update the slide that looks like it should be 3x9.
        // In previous script, 3x9 was priority #1 (slide index 0).

        const { data: slides } = await supabase
            .from('hero_slides')
            .select('*')
            .order('sort_order')
            .limit(1); // Get first slide

        if (slides && slides.length > 0) {
            const slide = slides[0];
            const { error: slideUpdateError } = await supabase
                .from('hero_slides')
                .update({ image_url: publicUrl })
                .eq('id', slide.id);

            if (slideUpdateError) console.error('Hero slide update failed:', slideUpdateError);
            else console.log(`Hero Slide "${slide.title}" updated.`);
        }

    } catch (err) {
        console.error('Error:', err);
    }
}

main();

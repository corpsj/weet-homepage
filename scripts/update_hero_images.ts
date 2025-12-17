
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function main() {
    console.log('Starting Hero Image Update...');

    // 1. Fetch current Hero Slides to keep text
    const { data: slides, error: slideError } = await supabase
        .from('hero_slides')
        .select('*')
        .order('display_order');

    if (slideError) {
        console.error('Error fetching slides:', slideError);
        return;
    }
    console.log(`Found ${slides.length} existing slides.`);

    // 2. Fetch High Quality Product Images
    // We'll look for specific "pretty" products
    const targetProductNames = ['3X6 집 (적삼목)', 'CAMPER (Basic)', '3X3 SAUNA'];
    // Fallback search terms if exact names don't match
    const searchTerms = ['3X6', 'CAMPER', 'SAUNA'];

    const { data: products, error: productError } = await supabase
        .from('products')
        .select('id, name, image_url')
        .not('image_url', 'is', null);

    if (productError) {
        console.error('Error fetching products:', productError);
        return;
    }

    // Keyword matching helper
    const findProductImage = (keyword: string) => {
        const p = products.find(p => p.name.includes(keyword) && p.image_url?.includes('replacement')); // Prefer replacement images
        return p ? p.image_url : products.find(p => p.name.includes(keyword))?.image_url;
    };

    // Prepare new images
    // Slide 1 -> 3x6 or similar
    // Slide 2 -> Camper or similar
    // Slide 3 -> Sauna or similar (if exists)
    // If not enough unique images, we'll cycle through top products

    // Hardcoded mapping logic based on typical slide count (usually 3)
    const newImages: string[] = [];

    // Priority 1: 3x6 House (Signature)
    const img1 = findProductImage('3X6');
    if (img1) newImages.push(img1);

    // Priority 2: Camper
    const img2 = findProductImage('CAMPER') || findProductImage('캠퍼');
    if (img2) newImages.push(img2);

    // Priority 3: Sauna or Design
    const img3 = findProductImage('SAUNA') || findProductImage('사우나') || findProductImage('DESIGN');
    if (img3) newImages.push(img3);

    // 3. Update Slides
    for (let i = 0; i < slides.length; i++) {
        const slide = slides[i];
        const newImage = newImages[i % newImages.length]; // Cycle if we have more slides than images

        if (newImage) {
            console.log(`Updating Slide "${slide.title}" with image from ${newImage.split('/').pop()}...`);

            const { error: updateError } = await supabase
                .from('hero_slides')
                .update({ image_url: newImage })
                .eq('id', slide.id);

            if (updateError) {
                console.error(`  Failed to update slide ${slide.id}:`, updateError);
            } else {
                console.log(`  Success!`);
            }
        } else {
            console.log(`Skipping Slide "${slide.title}" - No suitable image found.`);
        }
    }

    console.log('Update complete.');
}

main();


import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing Supabase credentials');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const main = async () => {
    // 1. Fetch some products to use as hero slides
    // We'll pick a few representative ones
    const { data: products, error: productError } = await supabase
        .from('products')
        .select('*')
        .in('name', ['3x9 집', '3x6 집', '3x6 CAMPER']) // Adjust names to match what we saw in logs or just take first 3
        .limit(3);

    if (productError || !products || products.length === 0) {
        console.error('Error fetching products or no products found:', productError);
        // Fallback: fetch any 3 products
        const { data: anyProducts } = await supabase.from('products').select('*').limit(3);
        if (anyProducts) {
            await insertSlides(anyProducts);
        }
        return;
    }

    await insertSlides(products);
};

async function insertSlides(products: any[]) {
    const slides = products.map((p, index) => ({
        image_url: p.image_url,
        title: p.name,
        subtitle: p.tagline || '',
        sort_order: index + 1,
    }));

    const { error } = await supabase.from('hero_slides').insert(slides);
    if (error) {
        console.error('Error inserting slides:', error);
    } else {
        console.log('Successfully inserted hero slides:', slides.length);
    }
}

main();

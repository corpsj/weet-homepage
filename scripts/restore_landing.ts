
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function main() {
    console.log('Restoring Landing Page Content...');

    // 1. Restore Hero Slides (Original Static Content)
    console.log('\n--- Restoring Hero Slides (Static) ---');

    // Clear dynamic slides
    await supabase.from('hero_slides').delete().gt('id', 0);

    const originalSlides = [
        {
            image_url: '/images/hero_main.jpg',
            title: 'Welcome to weet:)',
            subtitle: 'We make dreams come true.',
            display_order: 1,
            is_active: true
        },
        {
            image_url: '/images/hero_2.jpg',
            title: '',
            subtitle: '',
            display_order: 2,
            is_active: true
        },
        {
            image_url: '/images/hero_3.jpg',
            title: '',
            subtitle: '',
            display_order: 3,
            is_active: true
        },
        {
            image_url: '/images/hero_4.jpg',
            title: '',
            subtitle: '',
            display_order: 4,
            is_active: true
        }
    ];

    const { error: heroError } = await supabase
        .from('hero_slides')
        .insert(originalSlides);

    if (heroError) console.error('Hero Error:', heroError);
    else console.log('Hero slides restored to original static images.');


    // 2. Expand Signature Products
    // User mentioned missing items. We will enable:
    // - 3X3 내서재 (Standalone)
    // - 3X9 집 (Standalone)
    // - 3X6 리트릿
    // - 3X6 맨스케이브
    // - (Already enabled: Camper, Sauna, PeterPan, Combo)

    const additionalSignatures = [
        '3X3 내서재',
        '3X9 집',
        '3X3 리트릿', // Fuzzy match "리트릿"
        '3X6 맨스케이브'
    ];

    console.log('\n--- Expanding Signature Products ---');

    for (const name of additionalSignatures) {
        // Find product
        const { data: products } = await supabase
            .from('products')
            .select('*')
            .ilike('name', `%${name}%`); // Loose match

        if (products && products.length > 0) {
            // Filter out the Combo if we are looking for standalone "3X9 집"
            // Combo name is "3X9 집 + 3X3 내서재".
            // If we want standalone, we should pick the one that IS NOT the combo.
            // But "3X9 집" query matches both.
            // Let's pick the one with shorter name? Or specific ID check?
            // "3X9 집" (Length 6) vs Combo (Length long).

            let targetProduct = products[0];
            if (products.length > 1) {
                // Try to pick the shortest name for "3X9 집"
                targetProduct = products.reduce((a, b) => a.name.length < b.name.length ? a : b);
            }

            console.log(`Enabling Signature: ${targetProduct.name} (${targetProduct.id})`);
            await supabase.from('products').update({ is_signature: true }).eq('id', targetProduct.id);
        } else {
            console.log(`[WARNING] Not found: ${name}`);
        }
    }

    console.log('\nDone.');
}

main();

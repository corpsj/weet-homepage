
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

// Load environment variables
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function main() {
    console.log('Starting Landing Page Content Update...');

    // 1. Set Signature Products
    // Target Products: 3X3 내서재, 3X6 피터팬의 모험, 3X6 CAMPER, 3X3 SAUNA, 3X9 집
    // Note: Using 'ilike' for loose matching as names might vary slightly
    const signatureTargets = [
        '3X3 내서재',
        '3X6 피터팬의 모험',
        '3X6 CAMPER',
        '3X3 SAUNA',
        '3X9 집'
    ];

    console.log('\n--- Updating Signature Products ---');

    // First, reset all is_signature to false to ensure clean state
    await supabase.from('products').update({ is_signature: false }).neq('id', '00000000-0000-0000-0000-000000000000'); // Valid UUID

    for (const targetName of signatureTargets) {
        // Find product
        const { data: products, error } = await supabase
            .from('products')
            .select('*')
            .ilike('name', `%${targetName}%`);

        if (error || !products || products.length === 0) {
            console.log(`[WARNING] Product not found: ${targetName}`);
            continue;
        }

        const product = products[0]; // Take the first match
        console.log(`Setting [Signature] -> ${product.name} (${product.id})`);

        // Update is_signature = true
        const { error: updateError } = await supabase
            .from('products')
            .update({ is_signature: true })
            .eq('id', product.id);

        if (updateError) {
            console.error(`  Failed to update signature status: ${updateError.message}`);
        }
    }

    // 2. Populate Hero Slides
    console.log('\n--- Updating Hero Slides ---');

    // Get the newly set signature products to use as hero slides
    const { data: signatureProducts, error: sigError } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .eq('is_signature', true)
        .order('display_order', { ascending: true })
        .limit(5);

    if (sigError || !signatureProducts) {
        console.error('Failed to fetch signature products for hero slides');
        return;
    }

    // Clear existing slides (we will replace them)
    // NOTE: 'delete()' needs a filter. We'll delete all ID > 0
    await supabase.from('hero_slides').delete().gt('id', 0);

    const newSlides = signatureProducts.map((p, index) => ({
        image_url: p.image_url,
        title: p.name,
        subtitle: p.tagline || p.description?.substring(0, 30) + '...', // Use tagline or trunc description
        display_order: index + 1,
        is_active: true
    }));

    if (newSlides.length > 0) {
        const { data: inserted, error: insertError } = await supabase
            .from('hero_slides')
            .insert(newSlides)
            .select();

        if (insertError) {
            console.error('Failed to insert hero slides:', insertError);
        } else {
            console.log(`Inserted ${inserted.length} hero slides.`);
            inserted.forEach(s => console.log(`  Slide: ${s.title} (${s.image_url})`));
        }
    } else {
        console.log('No signature products found to create slides.');
    }

    console.log('\nDone.');
}

main();


import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function findMissingProduct() {
    const { data: products, error } = await supabase
        .from('products')
        .select('*')
        .ilike('exterior_finish', '%적삼목%')
        .ilike('exterior_finish', '%징크%');

    if (error) {
        console.error('Error fetching products:', error);
        return;
    }

    console.log('Found products with Red Cedar and Zinc:', products.length);
    products.forEach(p => {
        console.log(`ID: ${p.id}`);
        console.log(`Name: ${p.name}`);
        console.log(`Finish: ${p.exterior_finish}`);
        console.log('---');
    });
}

findMissingProduct();

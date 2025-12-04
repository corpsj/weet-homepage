
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function listProducts() {
    const { data: products, error } = await supabase
        .from('products')
        .select('*')
        .ilike('name', '%3x6%');

    if (error) {
        console.error('Error fetching products:', error);
        return;
    }

    console.log('Found products:', products.length);
    products.forEach(p => {
        console.log(`ID: ${p.id}`);
        console.log(`Name: ${p.name}`);
        console.log(`Exterior Finish: ${p.exterior_finish}`);
        console.log('---');
    });
}

listProducts();

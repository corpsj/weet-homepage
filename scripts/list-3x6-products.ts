
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function listProducts() {
    const { data, error } = await supabase
        .from('products')
        .select('id, name, image_url')
        .in('name', ['3X6 (적삼목)', '3X6 (스타코)']);

    if (error) {
        console.error('Error:', error);
        return;
    }

    console.log('Products found:', data);
}

listProducts();


import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const TARGET_PRODUCT_IDS = [
    '1496a32d-327c-486d-883a-86716a44062e', // 3X6 (적삼목)
    '32454a7c-674c-4712-888e-670390237744'  // 3X6 (스타코)
];

async function verifyUpdates() {
    const { data, error } = await supabase
        .from('products')
        .select('id, name, image_url')
        .in('id', TARGET_PRODUCT_IDS);

    if (error) {
        console.error('Error:', error);
        return;
    }

    console.log('Verified Products:', data);
}

verifyUpdates();

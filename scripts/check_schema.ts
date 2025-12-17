
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function main() {
    console.log('--- Checking Schema ---');

    const { data, error } = await supabase
        .from('hero_slides')
        .select('*')
        .limit(1);

    if (error) {
        console.error('Error:', error);
    } else if (data && data.length > 0) {
        console.log('Columns:', Object.keys(data[0]));
    } else {
        console.log('Table is empty, cannot infer columns from data.');
        // Try inserting a dummy to get an error with column hint? No, dangerous.
        // Just checking error from previous scripts was enough to know display_order is missing.
        // Try selecting 'sort_order' explicitly.
        const { error: sortError } = await supabase.from('hero_slides').select('sort_order').limit(1);
        if (!sortError) console.log('Column "sort_order" EXISTS.');
        else console.log('Column "sort_order" does NOT exist.');
    }
}

main();

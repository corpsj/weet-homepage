const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });
const { getSupabaseAdmin } = require('../lib/supabase');
const fs = require('fs');

async function listFaqs() {
    try {
        const admin = getSupabaseAdmin();
        const { data, error } = await admin
            .from('faqs')
            .select('*')
            .order('order_index', { ascending: true });

        if (error) {
            console.error('Error fetching FAQs:', error.message);
            return;
        }

        fs.writeFileSync('faq_sync.json', JSON.stringify(data, null, 2));
        console.log('FAQs saved to faq_sync.json');
    } catch (e) {
        console.error('Script failed:', e.message);
    }
}

listFaqs();

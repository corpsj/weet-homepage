import { createClient } from '@/utils/supabase/server';
import SupportEditor from '@/components/admin/cms/SupportEditor';

export const dynamic = 'force-dynamic';

async function getFAQs() {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('faqs')
        .select('*')
        .order('order_index', { ascending: true });

    if (error) throw error;
    return data;
}

async function getNotices() {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('notices')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
}

export default async function CMSSupportPage() {
    const [faqs, notices] = await Promise.all([getFAQs(), getNotices()]);

    return <SupportEditor initialFAQs={faqs || []} initialNotices={notices || []} />;
}

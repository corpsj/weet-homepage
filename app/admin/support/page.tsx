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
    let faqs: any[] = [];
    let notices: any[] = [];
    let error: string | null = null;

    try {
        const [faqsData, noticesData] = await Promise.all([getFAQs(), getNotices()]);
        faqs = faqsData || [];
        notices = noticesData || [];
    } catch (e: any) {
        console.error('CMS Support Page Error:', e);
        error = e.message || '데이터베이스 조회 중 오류가 발생했습니다.';
    }

    return <SupportEditor initialFAQs={faqs} initialNotices={notices} dbError={error} />;
}

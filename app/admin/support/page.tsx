import SupportEditor from '@/components/admin/cms/SupportEditor';
import { getFaqs } from '@/app/actions/faq-actions';
import { getNotices } from '@/app/actions/notice-actions';

export const dynamic = 'force-dynamic';

export default async function CMSSupportPage() {
    let faqs: any[] = [];
    let notices: any[] = [];
    let error: string | null = null;

    try {
        const [faqsData, noticesData] = await Promise.all([getFaqs(), getNotices()]);
        faqs = faqsData || [];
        notices = noticesData || [];
    } catch (e: any) {
        console.error('CMS Support Page Error:', e);
        error = e.message || '데이터베이스 조회 중 오류가 발생했습니다.';
    }

    return <SupportEditor initialFAQs={faqs} initialNotices={notices} dbError={error} />;
}

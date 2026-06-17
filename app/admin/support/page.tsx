import type { ComponentProps } from 'react';
import SupportEditor from '@/components/admin/cms/SupportEditor';
import { getFaqs } from '@/app/actions/faq-actions';
import { getNotices } from '@/app/actions/notice-actions';

export const dynamic = 'force-dynamic';

// SupportEditor's FAQ/Notice props require non-nullable fields, whereas the
// generated DB row types returned by the actions allow nulls. Derive the exact
// prop types the editor accepts so the page stays typed without `any`.
type SupportEditorProps = ComponentProps<typeof SupportEditor>;

export default async function CMSSupportPage() {
    let faqs: SupportEditorProps['initialFAQs'] = [];
    let notices: SupportEditorProps['initialNotices'] = [];
    let error: string | null = null;

    try {
        const [faqsData, noticesData] = await Promise.all([getFaqs(), getNotices()]);
        faqs = (faqsData ?? []) as SupportEditorProps['initialFAQs'];
        notices = (noticesData ?? []) as SupportEditorProps['initialNotices'];
    } catch (e) {
        console.error('CMS Support Page Error:', e);
        const message = e instanceof Error ? e.message : String(e);
        error = message || '데이터베이스 조회 중 오류가 발생했습니다.';
    }

    return <SupportEditor initialFAQs={faqs} initialNotices={notices} dbError={error} />;
}

import { getInquiries } from '@/app/actions/inquiry-actions';
import InquiryList from '@/components/admin/inquiries/InquiryList';

export const dynamic = 'force-dynamic';

export default async function AdminInquiriesPage() {
    const inquiries = await getInquiries();

    return (
        <div className="h-full flex flex-col">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">문의 관리</h1>
                <p className="text-gray-500 mt-1">접수된 고객 문의를 확인하고 관리합니다.</p>
            </div>

            <InquiryList initialInquiries={inquiries || []} />
        </div>
    );
}

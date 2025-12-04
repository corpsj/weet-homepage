import { supabaseAdmin } from '@/lib/supabase';
import InsightsDashboard from '@/components/admin/insights/InsightsDashboard';
import { format, parseISO } from 'date-fns';
import { Database } from '@/types/supabase';

type Inquiry = Database['public']['Tables']['inquiries']['Row'];

export const dynamic = 'force-dynamic';

export default async function InsightsPage() {
    // Fetch all inquiries
    const { data: inquiries, error } = await supabaseAdmin
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: true })
        .returns<Inquiry[]>();

    if (error) {
        console.error('Error fetching inquiries:', error);
        return <div>Error loading insights</div>;
    }

    const totalInquiries = inquiries?.length || 0;

    // Calculate Monthly Trends
    const monthlyData: Record<string, number> = {};
    inquiries?.forEach(inquiry => {
        const date = parseISO(inquiry.created_at);
        const monthKey = format(date, 'yyyy-MM'); // Group by YYYY-MM
        monthlyData[monthKey] = (monthlyData[monthKey] || 0) + 1;
    });

    // Convert to array and sort (last 6 months or all)
    const monthlyTrends = Object.entries(monthlyData)
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map(([key, value]) => {
            const [year, month] = key.split('-');
            return {
                month: `${month}월`, // Display as "12월"
                count: value
            };
        });

    // Calculate Status Distribution
    const statusData: Record<string, number> = {};
    inquiries?.forEach(inquiry => {
        const status = inquiry.status || 'new';
        statusData[status] = (statusData[status] || 0) + 1;
    });

    const statusDistribution = Object.entries(statusData).map(([name, value]) => ({
        name,
        value
    }));

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">고객 인사이트</h1>
                <p className="text-gray-500 mt-1">고객 문의 데이터를 분석하여 인사이트를 제공합니다.</p>
            </div>

            <InsightsDashboard
                totalInquiries={totalInquiries}
                monthlyTrends={monthlyTrends}
                statusDistribution={statusDistribution}
            />
        </div>
    );
}

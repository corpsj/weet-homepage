import { Suspense } from 'react';
import AnalyticsDashboard from '@/components/admin/insights/AnalyticsDashboard';
import {
    fetchTrafficStats,
    fetchUserDemographics,
    fetchAcquisitionSources,
    fetchTopPages
} from '@/app/actions/analytics-actions';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
    const [trafficStats, demographics, acquisition, topPages] = await Promise.all([
        fetchTrafficStats(),
        fetchUserDemographics(),
        fetchAcquisitionSources(),
        fetchTopPages()
    ]);

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">대시보드</h1>
                <p className="text-gray-500 mt-1">사이트 현황을 한눈에 확인하세요.</p>
            </div>

            <Suspense fallback={<div className="h-96 flex items-center justify-center">Loading...</div>}>
                <AnalyticsDashboard
                    trafficStats={trafficStats}
                    demographics={demographics}
                    acquisition={acquisition}
                    topPages={topPages}
                />
            </Suspense>
        </div>
    );
}

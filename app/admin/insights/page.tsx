import {
    fetchTrafficStats,
    fetchUserDemographics,
    fetchAcquisitionSources,
    fetchTopPages
} from '@/app/actions/analytics-actions';
import AnalyticsDashboard from '@/components/admin/insights/AnalyticsDashboard';
import { AlertTriangle } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function InsightsPage() {
    // Parallel data fetching
    const [trafficStats, demographics, acquisition, topPages] = await Promise.all([
        fetchTrafficStats(),
        fetchUserDemographics(),
        fetchAcquisitionSources(),
        fetchTopPages()
    ]);

    const isConfigured = trafficStats !== null && !(trafficStats as any)?.error;

    // Debug info
    const debugInfo = {
        hasGaId: !!process.env.NEXT_PUBLIC_GA_ID,
        hasPropertyId: !!process.env.GA_PROPERTY_ID,
        hasClientEmail: !!process.env.GOOGLE_CLIENT_EMAIL,
        hasPrivateKey: !!process.env.GOOGLE_PRIVATE_KEY,
        privateKeyLength: process.env.GOOGLE_PRIVATE_KEY?.length || 0,
        // eslint-disable-next-line
        apiError: (trafficStats as any)?.error || null,
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">웹 로그 분석</h1>
                <p className="text-gray-500 mt-1">방문자 트래픽, 유입 경로, 사용자 행동을 분석합니다.</p>
            </div>

            {!isConfigured ? (
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-8 text-center">
                    <div className="flex justify-center mb-4">
                        <div className="p-3 bg-yellow-100 rounded-full">
                            <AlertTriangle className="w-8 h-8 text-yellow-600" />
                        </div>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Google Analytics 연동 필요</h3>
                    <p className="text-gray-600 mb-6 max-w-md mx-auto">
                        데이터를 불러오지 못했습니다. 아래 디버그 정보를 확인해주세요.
                    </p>

                    <div className="text-left bg-white p-4 rounded-lg border border-red-200 text-sm font-mono mb-6 max-w-lg mx-auto overflow-auto">
                        <p className="font-bold text-red-600 mb-2">Debug Info:</p>
                        <pre>{JSON.stringify(debugInfo, null, 2)}</pre>
                        <p className="mt-2 text-gray-500">
                            * Private Key Length가 0이면 키가 제대로 로드되지 않은 것입니다.<br />
                            * 모든 값이 true여야 합니다.
                        </p>
                    </div>

                    <div className="text-sm text-gray-500 bg-white p-4 rounded-lg border border-gray-200 inline-block text-left">
                        <p className="font-medium mb-2">필요한 환경 변수 (.env.local):</p>
                        <ul className="list-disc list-inside space-y-1">
                            <li><code>NEXT_PUBLIC_GA_ID</code> (GA4 측정 ID)</li>
                            <li><code>GA_PROPERTY_ID</code> (속성 ID)</li>
                            <li><code>GOOGLE_CLIENT_EMAIL</code> (서비스 계정 이메일)</li>
                            <li><code>GOOGLE_PRIVATE_KEY</code> (서비스 계정 키)</li>
                        </ul>
                    </div>
                </div>
            ) : (
                <AnalyticsDashboard
                    trafficStats={trafficStats}
                    demographics={demographics}
                    acquisition={acquisition}
                    topPages={topPages}
                />
            )}
        </div>
    );
}

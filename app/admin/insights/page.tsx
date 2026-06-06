import { fetchAnalyticsDashboard } from '@/app/actions/analytics-actions';
import AnalyticsDashboard from '@/components/admin/insights/AnalyticsDashboard';
import { AlertTriangle } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function InsightsPage() {
    const { trafficStats, demographics, acquisition, topPages, cityStats } = await fetchAnalyticsDashboard();

    const isConfigured = trafficStats !== null && !(trafficStats as any)?.error;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">웹 로그 분석</h1>
                <p className="text-gray-500 mt-1">방문자 트래픽, 유입 경로, 사용자 행동을 분석합니다.</p>
            </div>

            {!isConfigured ? (
                <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center shadow-sm">
                    <div className="flex justify-center mb-6">
                        <div className="p-4 bg-yellow-50 rounded-full">
                            <AlertTriangle className="w-10 h-10 text-yellow-500" />
                        </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Google Analytics 연동 필요</h3>
                    <p className="text-gray-500 mb-8 max-w-md mx-auto leading-relaxed">
                        데이터를 불러오기 위해서는 Google Analytics 4 (GA4) 연동 및 서비스 계정 설정이 필요합니다.<br />
                        설정 가이드를 참고하여 연동을 완료해주세요.
                    </p>

                    {(trafficStats as any)?.error && (
                        <div className="text-left bg-red-50 p-4 rounded-xl border border-red-100 text-sm text-red-600 mb-8 max-w-lg mx-auto">
                            <p className="font-bold mb-1">연동 오류:</p>
                            <p>{(trafficStats as any).error}</p>
                        </div>
                    )}

                    <div className="text-sm text-gray-500 bg-gray-50 p-6 rounded-xl border border-gray-100 inline-block text-left">
                        <p className="font-medium mb-3 text-gray-900">필요한 환경 변수 (.env.local):</p>
                        <ul className="space-y-2">
                            <li className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                                <code className="bg-white px-2 py-0.5 rounded border border-gray-200">NEXT_PUBLIC_GA_ID</code>
                            </li>
                            <li className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                                <code className="bg-white px-2 py-0.5 rounded border border-gray-200">GA_PROPERTY_ID</code>
                            </li>
                            <li className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                                <code className="bg-white px-2 py-0.5 rounded border border-gray-200">GOOGLE_CLIENT_EMAIL</code>
                            </li>
                            <li className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                                <code className="bg-white px-2 py-0.5 rounded border border-gray-200">GOOGLE_PRIVATE_KEY</code>
                            </li>
                        </ul>
                    </div>
                </div>
            ) : (
                <AnalyticsDashboard
                    trafficStats={trafficStats}
                    demographics={demographics}
                    acquisition={acquisition}
                    topPages={topPages}
                    cityStats={cityStats}
                />
            )}
        </div>
    );
}

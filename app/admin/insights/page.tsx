import { fetchAnalyticsDashboard } from '@/app/actions/analytics-actions';
import AnalyticsDashboard from '@/components/admin/insights/AnalyticsDashboard';
import { AlertTriangle } from 'lucide-react';
import { ConsolePageHeader, ConsolePanel } from '@/components/admin/ConsolePrimitives';

export const dynamic = 'force-dynamic';

export default async function InsightsPage() {
    const { trafficStats, demographics, acquisition, topPages, cityStats } = await fetchAnalyticsDashboard();

    const isConfigured = trafficStats !== null && !(trafficStats as any)?.error;

    return (
        <div className="space-y-8">
            <ConsolePageHeader
                eyebrow="TRAFFIC INTELLIGENCE"
                title="웹 로그 분석"
                description="방문자 트래픽, 유입 경로, 사용자 행동을 운영 판단에 바로 연결합니다."
            />

            {!isConfigured ? (
                <ConsolePanel className="p-8 text-center md:p-12">
                    <div className="flex justify-center mb-6">
                        <div className="grid h-16 w-16 place-items-center rounded-[12px] border border-[#fed7aa] bg-[#fff7ed]">
                            <AlertTriangle className="w-10 h-10 text-[#9a3412]" />
                        </div>
                    </div>
                    <h3 className="text-xl font-bold text-admin-ink mb-3">Google Analytics 연동 필요</h3>
                    <p className="text-admin-muted mb-8 max-w-md mx-auto leading-relaxed">
                        데이터를 불러오기 위해서는 Google Analytics 4 (GA4) 연동 및 서비스 계정 설정이 필요합니다.<br />
                        설정 가이드를 참고하여 연동을 완료해주세요.
                    </p>

                    {(trafficStats as any)?.error && (
                        <div className="mx-auto mb-8 max-w-lg rounded-[12px] border border-[#fecaca] bg-[#fef2f2] p-4 text-left text-sm text-[#b91c1c]">
                            <p className="font-bold mb-1">연동 오류:</p>
                            <p>{(trafficStats as any).error}</p>
                        </div>
                    )}

                    <div className="inline-block rounded-[12px] border border-admin-line bg-[#fafafb] p-6 text-left text-sm text-admin-muted">
                        <p className="font-medium mb-3 text-admin-ink">필요한 환경 변수 (.env.local):</p>
                        <ul className="space-y-2">
                            <li className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#a1a1aa]" />
                                <code className="rounded border border-admin-line-2 bg-white px-2 py-0.5">NEXT_PUBLIC_GA_ID</code>
                            </li>
                            <li className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#a1a1aa]" />
                                <code className="rounded border border-admin-line-2 bg-white px-2 py-0.5">GA_PROPERTY_ID</code>
                            </li>
                            <li className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#a1a1aa]" />
                                <code className="rounded border border-admin-line-2 bg-white px-2 py-0.5">GOOGLE_CLIENT_EMAIL</code>
                            </li>
                            <li className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#a1a1aa]" />
                                <code className="rounded border border-admin-line-2 bg-white px-2 py-0.5">GOOGLE_PRIVATE_KEY</code>
                            </li>
                        </ul>
                    </div>
                </ConsolePanel>
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

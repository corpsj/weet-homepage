import { Suspense } from 'react';
import DashboardContainer from './DashboardContainer';

export const dynamic = 'force-dynamic';

export default function AdminPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">대시보드</h1>
                <p className="text-gray-500 mt-1">사이트 현황을 한눈에 확인하세요.</p>
            </div>

            <Suspense fallback={
                <div className="h-96 flex flex-col items-center justify-center text-gray-400">
                    <div className="w-8 h-8 border-2 border-gray-300 border-t-black rounded-full animate-spin mb-4" />
                    <p>데이터를 불러오는 중입니다...</p>
                </div>
            }>
                <DashboardContainer />
            </Suspense>
        </div>
    );
}

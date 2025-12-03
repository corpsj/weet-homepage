export default function AdminDashboard() {
    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-8">대시보드</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Stats Card 1 */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="text-sm font-medium text-gray-500 mb-2">총 제품 수</h3>
                    <p className="text-3xl font-bold text-black">--</p>
                </div>

                {/* Stats Card 2 */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="text-sm font-medium text-gray-500 mb-2">신규 문의</h3>
                    <p className="text-3xl font-bold text-black">0</p>
                </div>

                {/* Stats Card 3 */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="text-sm font-medium text-gray-500 mb-2">방문자 수 (Today)</h3>
                    <p className="text-3xl font-bold text-black">-</p>
                </div>
            </div>

            <div className="mt-8 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h2 className="text-lg font-bold text-gray-900 mb-4">최근 활동</h2>
                <div className="text-sm text-gray-500 py-8 text-center">
                    아직 기록된 활동이 없습니다.
                </div>
            </div>
        </div>
    );
}

'use client';

import { Users, Package, MessageSquare, TrendingUp, ArrowUpRight, Clock, CheckCircle } from 'lucide-react';

export default function AdminDashboard() {
    return (
        <div className="space-y-8">
            {/* Welcome Section */}
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Dashboard</h2>
                    <p className="text-gray-500 mt-2">Weet 관리자 페이지에 오신 것을 환영합니다.</p>
                </div>
                <div className="text-sm text-gray-500 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
                    Last updated: {new Date().toLocaleDateString()}
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    title="Total Products"
                    value="12"
                    trend="+2.5%"
                    icon={Package}
                    color="bg-blue-500"
                />
                <StatsCard
                    title="Active Inquiries"
                    value="5"
                    trend="+12%"
                    icon={MessageSquare}
                    color="bg-green-500"
                />
                <StatsCard
                    title="Total Visitors"
                    value="1,234"
                    trend="+8.1%"
                    icon={Users}
                    color="bg-purple-500"
                />
                <StatsCard
                    title="Conversion Rate"
                    value="3.2%"
                    trend="+1.2%"
                    icon={TrendingUp}
                    color="bg-orange-500"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Activity */}
                <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-gray-900">Recent Activity</h3>
                        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">View All</button>
                    </div>
                    <div className="space-y-6">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="flex items-start gap-4 group">
                                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-50 transition-colors">
                                    <Clock className="w-5 h-5 text-gray-400 group-hover:text-blue-500" />
                                </div>
                                <div className="flex-1 pt-1">
                                    <p className="text-sm font-medium text-gray-900">새로운 문의가 등록되었습니다.</p>
                                    <p className="text-xs text-gray-500 mt-1">2시간 전 • 홍길동님</p>
                                </div>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                    New
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions / System Status */}
                <div className="space-y-6">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">System Status</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                    <span className="text-sm text-gray-600">Database</span>
                                </div>
                                <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">Operational</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                    <span className="text-sm text-gray-600">API Server</span>
                                </div>
                                <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">Operational</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                    <span className="text-sm text-gray-600">Storage</span>
                                </div>
                                <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">Operational</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] rounded-2xl p-6 shadow-lg text-white">
                        <h3 className="text-lg font-bold mb-2">Need Help?</h3>
                        <p className="text-sm text-gray-300 mb-4">관리자 페이지 사용 중 문제가 발생하면 기술지원팀에 문의하세요.</p>
                        <button className="w-full bg-white text-black font-medium py-2 rounded-lg text-sm hover:bg-gray-100 transition-colors">
                            Contact Support
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatsCard({ title, value, trend, icon: Icon, color }: any) {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl ${color} bg-opacity-10`}>
                    <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
                </div>
                <span className="flex items-center text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                    <ArrowUpRight className="w-3 h-3 mr-1" />
                    {trend}
                </span>
            </div>
            <div>
                <p className="text-sm font-medium text-gray-500">{title}</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">{value}</h3>
            </div>
        </div>
    );
}

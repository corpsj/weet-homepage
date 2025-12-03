'use client';

import { TrendingUp, Users, DollarSign, MousePointer, Globe, Smartphone, Monitor } from 'lucide-react';

export default function AnalyticsPage() {
    return (
        <div className="space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">분석 및 통계</h2>
                    <p className="text-gray-500 text-sm mt-1">웹사이트 트래픽 및 수익 현황을 확인합니다.</p>
                </div>
                <div className="flex gap-2">
                    <select className="bg-white border border-gray-200 text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/5">
                        <option>지난 7일</option>
                        <option>지난 30일</option>
                        <option>이번 달</option>
                        <option>올해</option>
                    </select>
                    <button className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                        리포트 다운로드
                    </button>
                </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard
                    title="총 방문자 수"
                    value="12,453"
                    change="+12.5%"
                    icon={Users}
                    color="blue"
                />
                <MetricCard
                    title="페이지 뷰"
                    value="45,231"
                    change="+8.2%"
                    icon={MousePointer}
                    color="purple"
                />
                <MetricCard
                    title="평균 체류 시간"
                    value="3m 45s"
                    change="+2.1%"
                    icon={TrendingUp}
                    color="green"
                />
                <MetricCard
                    title="AdSense 수익"
                    value="$1,234.56"
                    change="+15.3%"
                    icon={DollarSign}
                    color="orange"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Traffic Overview (Main Chart) */}
                <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-gray-900">트래픽 추이</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-blue-500"></div> 방문자</span>
                            <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-gray-300"></div> 페이지뷰</span>
                        </div>
                    </div>
                    {/* Mock Chart Area */}
                    <div className="h-64 w-full flex items-end justify-between gap-2 px-2">
                        {[40, 65, 45, 80, 55, 70, 60, 90, 75, 85, 65, 95].map((h, i) => (
                            <div key={i} className="w-full bg-blue-50 rounded-t-sm relative group">
                                <div
                                    className="absolute bottom-0 left-0 right-0 bg-blue-500 rounded-t-sm transition-all duration-500 group-hover:bg-blue-600"
                                    style={{ height: `${h}%` }}
                                ></div>
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                    {h * 100}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between mt-4 text-xs text-gray-400">
                        <span>1일</span>
                        <span>5일</span>
                        <span>10일</span>
                        <span>15일</span>
                        <span>20일</span>
                        <span>25일</span>
                        <span>30일</span>
                    </div>
                </div>

                {/* AdSense / Revenue */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <DollarSign className="w-5 h-5 text-orange-500" />
                        AdSense 요약
                    </h3>

                    <div className="space-y-6">
                        <div className="p-4 bg-orange-50 rounded-lg border border-orange-100">
                            <p className="text-sm text-orange-800 font-medium mb-1">예상 수입 (이번 달)</p>
                            <p className="text-3xl font-bold text-orange-600">$452.30</p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">노출수 (Impressions)</span>
                                <span className="text-sm font-bold text-gray-900">12,405</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-2">
                                <div className="bg-orange-400 h-2 rounded-full" style={{ width: '75%' }}></div>
                            </div>

                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">클릭수 (Clicks)</span>
                                <span className="text-sm font-bold text-gray-900">342</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-2">
                                <div className="bg-orange-400 h-2 rounded-full" style={{ width: '25%' }}></div>
                            </div>

                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">페이지 RPM</span>
                                <span className="text-sm font-bold text-gray-900">$3.45</span>
                            </div>
                        </div>

                        <button className="w-full py-2 text-sm text-orange-600 font-medium border border-orange-200 rounded-lg hover:bg-orange-50 transition-colors">
                            Google AdSense 연동 설정
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Device Breakdown */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-6">기기별 접속</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white rounded-md shadow-sm">
                                    <Smartphone className="w-5 h-5 text-gray-600" />
                                </div>
                                <span className="text-sm font-medium text-gray-700">Mobile</span>
                            </div>
                            <span className="text-sm font-bold text-gray-900">65%</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white rounded-md shadow-sm">
                                    <Monitor className="w-5 h-5 text-gray-600" />
                                </div>
                                <span className="text-sm font-medium text-gray-700">Desktop</span>
                            </div>
                            <span className="text-sm font-bold text-gray-900">30%</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white rounded-md shadow-sm">
                                    <Globe className="w-5 h-5 text-gray-600" />
                                </div>
                                <span className="text-sm font-medium text-gray-700">Tablet / Other</span>
                            </div>
                            <span className="text-sm font-bold text-gray-900">5%</span>
                        </div>
                    </div>
                </div>

                {/* Top Pages */}
                <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-6">인기 페이지</h3>
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-4 py-3 font-medium text-gray-500">페이지 URL</th>
                                <th className="px-4 py-3 font-medium text-gray-500">방문자 수</th>
                                <th className="px-4 py-3 font-medium text-gray-500">체류 시간</th>
                                <th className="px-4 py-3 font-medium text-gray-500">이탈률</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {[
                                { url: '/', views: '5,231', time: '1m 20s', bounce: '45%' },
                                { url: '/products', views: '3,102', time: '4m 10s', bounce: '32%' },
                                { url: '/company', views: '1,543', time: '2m 05s', bounce: '55%' },
                                { url: '/support', views: '982', time: '1m 45s', bounce: '60%' },
                            ].map((page, i) => (
                                <tr key={i} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-4 py-3 font-medium text-gray-900">{page.url}</td>
                                    <td className="px-4 py-3 text-gray-600">{page.views}</td>
                                    <td className="px-4 py-3 text-gray-600">{page.time}</td>
                                    <td className="px-4 py-3 text-gray-600">{page.bounce}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

function MetricCard({ title, value, change, icon: Icon, color }: any) {
    const colorClasses: Record<string, string> = {
        blue: 'bg-blue-50 text-blue-600',
        purple: 'bg-purple-50 text-purple-600',
        green: 'bg-green-50 text-green-600',
        orange: 'bg-orange-50 text-orange-600',
    };

    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
                    <Icon className="w-6 h-6" />
                </div>
                <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                    {change}
                </span>
            </div>
            <div>
                <p className="text-sm font-medium text-gray-500">{title}</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">{value}</h3>
            </div>
        </div>
    );
}

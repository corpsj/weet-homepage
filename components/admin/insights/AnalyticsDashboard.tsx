'use client';

import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar, PieChart, Pie, Cell, Legend
} from 'recharts';
import { ArrowUpRight, Users, MousePointer, Clock, Monitor } from 'lucide-react';
import Link from 'next/link';

interface AnalyticsDashboardProps {
    trafficStats: any;
    demographics: any;
    acquisition: any;
    topPages: any;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export default function AnalyticsDashboard({
    trafficStats,
    demographics,
    acquisition,
    topPages
}: AnalyticsDashboardProps) {

    // Data Transformation
    const trafficData = trafficStats?.rows?.map((row: any) => ({
        date: row.dimensionValues[0].value.substring(4, 6) + '/' + row.dimensionValues[0].value.substring(6, 8),
        users: parseInt(row.metricValues[0].value),
        sessions: parseInt(row.metricValues[1].value),
        views: parseInt(row.metricValues[2].value),
    })) || [];

    const deviceData = demographics?.devices?.rows?.map((row: any) => ({
        name: row.dimensionValues[0].value,
        value: parseInt(row.metricValues[0].value)
    })) || [];

    const acquisitionData = acquisition?.rows?.map((row: any) => ({
        name: row.dimensionValues[0].value,
        value: parseInt(row.metricValues[0].value)
    })) || [];

    const topPagesData = topPages?.rows?.map((row: any) => ({
        title: row.dimensionValues[0].value,
        path: row.dimensionValues[1].value,
        views: parseInt(row.metricValues[0].value),
        users: parseInt(row.metricValues[1].value),
    })) || [];

    // Summary Metrics (Last 7 Days)
    const totalUsers = trafficData.reduce((acc: number, curr: any) => acc + curr.users, 0);
    const totalViews = trafficData.reduce((acc: number, curr: any) => acc + curr.views, 0);
    const avgSession = trafficStats?.rows ?
        (trafficStats.rows.reduce((acc: number, row: any) => acc + parseFloat(row.metricValues[3].value), 0) / trafficStats.rows.length).toFixed(0)
        : 0;

    return (
        <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card title="총 방문자 수 (7일)" value={totalUsers.toLocaleString()} icon={<Users className="w-5 h-5 text-blue-500" />} />
                <Card title="총 페이지뷰 (7일)" value={totalViews.toLocaleString()} icon={<MousePointer className="w-5 h-5 text-green-500" />} />
                <Card title="평균 세션 시간" value={`${avgSession}초`} icon={<Clock className="w-5 h-5 text-orange-500" />} />
                <Link href="https://clarity.microsoft.com/projects" target="_blank" className="block">
                    <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl p-6 text-white hover:shadow-lg transition-shadow h-full flex flex-col justify-between cursor-pointer">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-white/80 text-sm font-medium">Heatmaps & Recordings</p>
                                <h3 className="text-2xl font-bold mt-1">Microsoft Clarity</h3>
                            </div>
                            <ArrowUpRight className="w-5 h-5 text-white/80" />
                        </div>
                        <p className="text-xs text-white/60 mt-4">클릭 히트맵 및 사용자 녹화 영상 확인하기 &rarr;</p>
                    </div>
                </Link>
            </div>

            {/* Main Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Traffic Trend (Line Chart) */}
                <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-900 mb-6">트래픽 추이 (최근 7일)</h3>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={trafficData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="date" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                                <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="users" name="방문자" stroke="#0088FE" strokeWidth={2} dot={false} />
                                <Line type="monotone" dataKey="views" name="페이지뷰" stroke="#00C49F" strokeWidth={2} dot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Device Breakdown (Pie Chart) */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-900 mb-6">기기별 접속</h3>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={deviceData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {deviceData.map((entry: any, index: number) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend verticalAlign="bottom" height={36} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Secondary Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Acquisition Channels (Bar Chart) */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-900 mb-6">유입 경로 Top 5</h3>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={acquisitionData} layout="vertical" margin={{ left: 40 }}>
                                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                                <XAxis type="number" hide />
                                <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} width={100} />
                                <Tooltip />
                                <Bar dataKey="value" name="세션 수" fill="#8884d8" radius={[0, 4, 4, 0]}>
                                    {acquisitionData.map((entry: any, index: number) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Top Pages Table */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <h3 className="text-lg font-bold text-gray-900 mb-6">인기 페이지 Top 10</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-gray-500 uppercase bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3">페이지 제목</th>
                                    <th className="px-4 py-3 text-right">뷰</th>
                                    <th className="px-4 py-3 text-right">방문자</th>
                                </tr>
                            </thead>
                            <tbody>
                                {topPagesData.map((page: any, index: number) => (
                                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                                        <td className="px-4 py-3 font-medium text-gray-900 truncate max-w-[200px]" title={page.title}>
                                            {page.title === '(not set)' ? page.path : page.title}
                                        </td>
                                        <td className="px-4 py-3 text-right">{page.views.toLocaleString()}</td>
                                        <td className="px-4 py-3 text-right">{page.users.toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Card({ title, value, icon }: { title: string, value: string, icon: React.ReactNode }) {
    return (
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-sm font-medium text-gray-500">{title}</h3>
                <div className="p-2 bg-gray-50 rounded-lg">{icon}</div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
    );
}

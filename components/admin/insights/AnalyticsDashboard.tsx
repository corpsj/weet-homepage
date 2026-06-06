'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import {
    XAxis, YAxis, CartesianGrid, Tooltip,
    BarChart, Bar, PieChart, Pie, Cell, Area, AreaChart
} from 'recharts';
import { ArrowUpRight, Users, MousePointer, Clock, TrendingUp, Monitor } from 'lucide-react';
import Link from 'next/link';

interface AnalyticsMetric {
    value: string;
}

interface AnalyticsDimension {
    value: string;
}

interface AnalyticsRow {
    dimensionValues: AnalyticsDimension[];
    metricValues: AnalyticsMetric[];
}

interface AnalyticsResponse {
    rows?: AnalyticsRow[];
}

interface AnalyticsDashboardProps {
    trafficStats: any;
    demographics: any;
    acquisition: any;
    topPages: any;
    cityStats: any;
}

const COLORS = ['#111827', '#4B5563', '#9CA3AF', '#D1D5DB', '#E5E7EB'];

function CustomTooltip({ active, payload, label }: any) {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-4 border border-gray-100 shadow-xl rounded-xl">
                <p className="text-sm font-bold text-gray-900 mb-2">{label}</p>
                {payload.map((entry: any, index: number) => (
                    <div key={index} className="flex items-center gap-2 text-xs mb-1 last:mb-0">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                        <span className="text-gray-500">{entry.name}:</span>
                        <span className="font-medium text-gray-900">{entry.value.toLocaleString()}</span>
                    </div>
                ))}
            </div>
        );
    }
    return null;
}

function ChartShell({ children, className }: { children: (size: { width: number; height: number }) => ReactNode; className: string }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [size, setSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const node = containerRef.current;
        if (!node) return;

        const updateSize = (width: number, height: number) => {
            const nextSize = {
                width: Math.floor(width),
                height: Math.floor(height),
            };

            setSize((current) => (
                current.width === nextSize.width && current.height === nextSize.height ? current : nextSize
            ));
        };
        const updateFromNode = () => {
            const rect = node.getBoundingClientRect();
            updateSize(rect.width, rect.height);
        };
        const observer = new ResizeObserver(([entry]) => {
            updateSize(entry.contentRect.width, entry.contentRect.height);
        });

        updateFromNode();
        observer.observe(node);

        return () => observer.disconnect();
    }, []);

    return (
        <div ref={containerRef} className={`${className} min-w-0`}>
            {size.width > 0 && size.height > 0 ? children(size) : <div className="h-full w-full rounded-lg bg-gray-50" />}
        </div>
    );
}

export default function AnalyticsDashboard({
    trafficStats,
    demographics,
    acquisition,
    topPages,
    cityStats
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

    const cityData = cityStats?.rows?.map((row: any) => ({
        name: row.dimensionValues[0].value, // City
        region: row.dimensionValues[1].value, // Region
        value: parseInt(row.metricValues[0].value)
    })).slice(0, 5) || []; // Top 5

    // Summary Metrics (Last 7 Days)
    const totalUsers = trafficData.reduce((acc: number, curr: any) => acc + curr.users, 0);
    const totalViews = trafficData.reduce((acc: number, curr: any) => acc + curr.views, 0);
    const avgSession = trafficStats?.rows ?
        (trafficStats.rows.reduce((acc: number, row: any) => acc + parseFloat(row.metricValues[3].value), 0) / trafficStats.rows.length).toFixed(0)
        : 0;

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <SummaryCard
                    title="총 방문자"
                    value={totalUsers.toLocaleString()}
                    subtext="최근 7일"
                    icon={<Users className="w-5 h-5 text-black" />}
                />
                <SummaryCard
                    title="페이지뷰"
                    value={totalViews.toLocaleString()}
                    subtext="최근 7일"
                    icon={<MousePointer className="w-5 h-5 text-black" />}
                />
                <SummaryCard
                    title="평균 세션"
                    value={`${avgSession}초`}
                    subtext="체류 시간"
                    icon={<Clock className="w-5 h-5 text-black" />}
                />
                <Link href="https://clarity.microsoft.com/projects" target="_blank" className="block group">
                    <div className="bg-black rounded-2xl p-6 text-white hover:shadow-xl transition-all duration-300 h-full flex flex-col justify-between relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-white/10 transition-colors" />
                        <div className="flex justify-between items-start relative z-10">
                            <div>
                                <p className="text-white/60 text-xs font-medium uppercase tracking-wider">Heatmaps</p>
                                <h3 className="text-xl font-bold mt-1">Microsoft Clarity</h3>
                            </div>
                            <ArrowUpRight className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
                        </div>
                        <p className="text-xs text-white/40 mt-4 group-hover:text-white/60 transition-colors">사용자 행동 녹화 보기 &rarr;</p>
                    </div>
                </Link>
            </div>

            {/* Main Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Traffic Trend */}
                <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">트래픽 추이</h3>
                            <p className="text-sm text-gray-500 mt-1">최근 7일간의 방문자 및 페이지뷰 변화</p>
                        </div>
                        <div className="flex gap-4 text-xs font-medium">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-black" />
                                <span className="text-gray-600">방문자</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-gray-300" />
                                <span className="text-gray-600">페이지뷰</span>
                            </div>
                        </div>
                    </div>
                    <ChartShell className="h-[350px]">
                        {({ width, height }) => (
                            <AreaChart width={width} height={height} data={trafficData}>
                                <defs>
                                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#000000" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#000000" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                <XAxis
                                    dataKey="date"
                                    tick={{ fontSize: 12, fill: '#9CA3AF' }}
                                    tickLine={false}
                                    axisLine={false}
                                    dy={10}
                                />
                                <YAxis
                                    tick={{ fontSize: 12, fill: '#9CA3AF' }}
                                    tickLine={false}
                                    axisLine={false}
                                    dx={-10}
                                />
                                <Tooltip content={<CustomTooltip />} />
                                <Area
                                    type="monotone"
                                    dataKey="users"
                                    name="방문자"
                                    stroke="#000000"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorUsers)"
                                />
                                <Area
                                    type="monotone"
                                    dataKey="views"
                                    name="페이지뷰"
                                    stroke="#D1D5DB"
                                    strokeWidth={2}
                                    fill="transparent"
                                    strokeDasharray="5 5"
                                />
                            </AreaChart>
                        )}
                    </ChartShell>
                </div>

                {/* Device Breakdown */}
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">기기별 접속</h3>
                    <p className="text-sm text-gray-500 mb-8">사용자 접속 환경 비율</p>
                    <div className="h-[300px] relative">
                        <ChartShell className="h-full">
                            {({ width, height }) => (
                                <PieChart width={width} height={height}>
                                    <Pie
                                        data={deviceData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={80}
                                        outerRadius={100}
                                        paddingAngle={5}
                                        dataKey="value"
                                        stroke="none"
                                    >
                                        {deviceData.map((entry: any, index: number) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip content={<CustomTooltip />} />
                                </PieChart>
                            )}
                        </ChartShell>
                        {/* Center Text */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <Monitor className="w-6 h-6 text-gray-400 mb-1" />
                            <span className="text-xs text-gray-400">Devices</span>
                        </div>
                    </div>
                    <div className="flex justify-center gap-6 mt-4">
                        {deviceData.map((entry: any, index: number) => (
                            <div key={index} className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                                <span className="text-xs font-medium text-gray-600">{entry.name}</span>
                                <span className="text-xs text-gray-400">({((entry.value / totalUsers) * 100).toFixed(0)}%)</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Secondary Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Acquisition Channels (Top 5) */}
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">유입 경로</h3>
                    <p className="text-sm text-gray-500 mb-8">사용자가 사이트를 찾은 방법 (Top 5)</p>
                    <ChartShell className="h-[300px]">
                        {({ width, height }) => (
                            <BarChart width={width} height={height} data={acquisitionData} layout="vertical" margin={{ left: 0, right: 0, top: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f3f4f6" />
                                <XAxis type="number" hide />
                                <YAxis
                                    dataKey="name"
                                    type="category"
                                    tick={{ fontSize: 12, fill: '#4B5563', fontWeight: 500 }}
                                    width={100}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <Tooltip content={<CustomTooltip />} />
                                <Bar
                                    dataKey="value"
                                    name="세션 수"
                                    fill="#111827"
                                    radius={[0, 4, 4, 0]}
                                    barSize={20}
                                />
                            </BarChart>
                        )}
                    </ChartShell>
                </div>

                {/* City/Region Stats (Top 5) */}
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">지역별 분포</h3>
                    <p className="text-sm text-gray-500 mb-8">사용자 접속 지역 (Top 5)</p>
                    <ChartShell className="h-[300px]">
                        {({ width, height }) => (
                            <BarChart width={width} height={height} data={cityData} layout="vertical" margin={{ left: 0, right: 0, top: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f3f4f6" />
                                <XAxis type="number" hide />
                                <YAxis
                                    dataKey="name"
                                    type="category"
                                    tick={{ fontSize: 12, fill: '#4B5563', fontWeight: 500 }}
                                    width={80}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <Tooltip content={<CustomTooltip />} />
                                <Bar
                                    dataKey="value"
                                    name="방문자"
                                    fill="#4B5563"
                                    radius={[0, 4, 4, 0]}
                                    barSize={20}
                                />
                            </BarChart>
                        )}
                    </ChartShell>
                </div>

                {/* Top Pages Table */}
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden lg:col-span-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">인기 페이지</h3>
                    <p className="text-sm text-gray-500 mb-6">가장 많이 조회된 페이지</p>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-gray-400 uppercase border-b border-gray-100">
                                <tr>
                                    <th className="px-4 py-3 font-medium">페이지</th>
                                    <th className="px-4 py-3 text-right font-medium">뷰</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {topPagesData.slice(0, 5).map((page: any, index: number) => (
                                    <tr key={index} className="group hover:bg-gray-50/50 transition-colors">
                                        <td className="px-4 py-4 font-medium text-gray-900 truncate max-w-[150px]">
                                            <div className="flex flex-col">
                                                <span className="text-sm group-hover:text-black transition-colors">{page.title === '(not set)' ? '메인 페이지' : page.title}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-right text-gray-600 group-hover:text-gray-900">{page.views.toLocaleString()}</td>
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

function SummaryCard({ title, value, subtext, icon }: { title: string, value: string, subtext: string, icon: React.ReactNode }) {
    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-sm font-medium text-gray-500 group-hover:text-gray-700 transition-colors">{title}</h3>
                    <p className="text-2xl font-bold text-gray-900 mt-1 tracking-tight">{value}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl group-hover:bg-gray-100 transition-colors">
                    {icon}
                </div>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-400">
                <TrendingUp className="w-3 h-3 text-green-500" />
                <span className="text-green-600 font-medium">{subtext}</span>
            </div>
        </div>
    );
}

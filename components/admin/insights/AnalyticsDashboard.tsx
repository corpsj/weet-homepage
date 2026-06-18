'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import {
    XAxis, YAxis, CartesianGrid, Tooltip,
    BarChart, Bar, PieChart, Pie, Cell, Area, AreaChart
} from 'recharts';
import { ArrowUpRight, Users, MousePointer, Clock, Monitor } from 'lucide-react';
import Link from 'next/link';
import { ConsoleMetricCard, ConsolePanel } from '@/components/admin/ConsolePrimitives';

// 인사이트 차트 블루 팔레트 (2안) — primary #2563eb, 보조는 점차 옅은 블루/슬레이트.
const CHART_BLUE = '#2563eb';
const CHART_BLUE_SOFT = '#bfdbfe';
const CHART_SLATE = '#64748b';

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

const COLORS = ['#2563eb', '#60a5fa', '#93c5fd', '#bfdbfe', '#dbeafe'];

function CustomTooltip({ active, payload, label }: any) {
    if (active && payload && payload.length) {
        return (
            <div className="rounded-[12px] border border-admin-line bg-white p-4 shadow-sm">
                <p className="text-sm font-bold text-admin-ink mb-2">{label}</p>
                {payload.map((entry: any, index: number) => (
                    <div key={index} className="flex items-center gap-2 text-xs mb-1 last:mb-0">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                        <span className="text-admin-muted">{entry.name}:</span>
                        <span className="font-medium text-admin-ink">{entry.value.toLocaleString()}</span>
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
            {size.width > 0 && size.height > 0 ? children(size) : <div className="h-full w-full rounded-[12px] bg-[#fafafb]" />}
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
        <div className="space-y-6 animate-fade-in">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
                <SummaryCard
                    title="총 방문자"
                    value={totalUsers.toLocaleString()}
                    subtext="최근 7일"
                    icon={<Users className="w-5 h-5 text-admin-accent" />}
                />
                <SummaryCard
                    title="페이지뷰"
                    value={totalViews.toLocaleString()}
                    subtext="최근 7일"
                    icon={<MousePointer className="w-5 h-5 text-admin-accent" />}
                />
                <SummaryCard
                    title="평균 세션"
                    value={`${avgSession}초`}
                    subtext="체류 시간"
                    icon={<Clock className="w-5 h-5 text-admin-accent" />}
                />
                <Link href="https://clarity.microsoft.com/projects" target="_blank" rel="noopener noreferrer" className="block group">
                    <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-[12px] border border-transparent bg-gradient-to-br from-admin-accent to-admin-accent-hover p-4 text-white shadow-sm transition-opacity hover:opacity-95">
                        <div className="flex justify-between items-start relative z-10">
                            <div>
                                <p className="text-xs font-bold text-white/70">Heatmaps</p>
                                <h3 className="text-xl font-bold mt-1">Microsoft Clarity</h3>
                            </div>
                            <ArrowUpRight className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
                        </div>
                        <p className="text-xs text-white/60 mt-4 group-hover:text-white/80 transition-colors">사용자 행동 녹화 보기 &rarr;</p>
                    </div>
                </Link>
            </div>

            {/* Main Charts Row */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Traffic Trend */}
                <ConsolePanel className="p-5 lg:col-span-2">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h3 className="text-lg font-bold text-admin-ink">트래픽 추이</h3>
                            <p className="text-sm text-admin-muted mt-1">최근 7일간의 방문자 및 페이지뷰 변화</p>
                        </div>
                        <div className="flex gap-4 text-xs font-medium">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-admin-accent" />
                                <span className="text-[#52525b]">방문자</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-[#bfdbfe]" />
                                <span className="text-[#52525b]">페이지뷰</span>
                            </div>
                        </div>
                    </div>
                    <ChartShell className="h-[350px]">
                        {({ width, height }) => (
                            <AreaChart width={width} height={height} data={trafficData}>
                                <defs>
                                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={CHART_BLUE} stopOpacity={0.18} />
                                        <stop offset="95%" stopColor={CHART_BLUE} stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f3" />
                                <XAxis
                                    dataKey="date"
                                    tick={{ fontSize: 12, fill: '#a1a1aa' }}
                                    tickLine={false}
                                    axisLine={false}
                                    dy={10}
                                />
                                <YAxis
                                    tick={{ fontSize: 12, fill: '#a1a1aa' }}
                                    tickLine={false}
                                    axisLine={false}
                                    dx={-10}
                                />
                                <Tooltip content={<CustomTooltip />} />
                                <Area
                                    type="monotone"
                                    dataKey="users"
                                    name="방문자"
                                    stroke={CHART_BLUE}
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorUsers)"
                                />
                                <Area
                                    type="monotone"
                                    dataKey="views"
                                    name="페이지뷰"
                                    stroke={CHART_BLUE_SOFT}
                                    strokeWidth={2}
                                    fill="transparent"
                                    strokeDasharray="5 5"
                                />
                            </AreaChart>
                        )}
                    </ChartShell>
                </ConsolePanel>

                {/* Device Breakdown */}
                <ConsolePanel className="p-5">
                    <h3 className="text-lg font-bold text-admin-ink mb-2">기기별 접속</h3>
                    <p className="text-sm text-admin-muted mb-8">사용자 접속 환경 비율</p>
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
                            <Monitor className="w-6 h-6 text-[#a1a1aa] mb-1" />
                            <span className="text-xs text-[#a1a1aa]">Devices</span>
                        </div>
                    </div>
                    <div className="flex justify-center gap-6 mt-4">
                        {deviceData.map((entry: any, index: number) => (
                            <div key={index} className="flex items-center gap-2">
                                <div className="w-2.5 h-2.5 rounded-[3px]" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                                <span className="text-xs font-medium text-[#52525b]">{entry.name}</span>
                                <span className="text-xs text-[#a1a1aa]">({((entry.value / totalUsers) * 100).toFixed(0)}%)</span>
                            </div>
                        ))}
                    </div>
                </ConsolePanel>
            </div>

            {/* Secondary Row */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Acquisition Channels (Top 5) */}
                <ConsolePanel className="p-5">
                    <h3 className="text-lg font-bold text-admin-ink mb-2">유입 경로</h3>
                    <p className="text-sm text-admin-muted mb-8">사용자가 사이트를 찾은 방법 (Top 5)</p>
                    <ChartShell className="h-[300px]">
                        {({ width, height }) => (
                            <BarChart width={width} height={height} data={acquisitionData} layout="vertical" margin={{ left: 0, right: 0, top: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f1f3" />
                                <XAxis type="number" hide />
                                <YAxis
                                    dataKey="name"
                                    type="category"
                                    tick={{ fontSize: 12, fill: '#3f3f46', fontWeight: 500 }}
                                    width={100}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <Tooltip content={<CustomTooltip />} />
                                <Bar
                                    dataKey="value"
                                    name="세션 수"
                                    fill={CHART_BLUE}
                                    radius={[0, 4, 4, 0]}
                                    barSize={20}
                                />
                            </BarChart>
                        )}
                    </ChartShell>
                </ConsolePanel>

                {/* City/Region Stats (Top 5) */}
                <ConsolePanel className="p-5">
                    <h3 className="text-lg font-bold text-admin-ink mb-2">지역별 분포</h3>
                    <p className="text-sm text-admin-muted mb-8">사용자 접속 지역 (Top 5)</p>
                    <ChartShell className="h-[300px]">
                        {({ width, height }) => (
                            <BarChart width={width} height={height} data={cityData} layout="vertical" margin={{ left: 0, right: 0, top: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f1f3" />
                                <XAxis type="number" hide />
                                <YAxis
                                    dataKey="name"
                                    type="category"
                                    tick={{ fontSize: 12, fill: '#3f3f46', fontWeight: 500 }}
                                    width={80}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <Tooltip content={<CustomTooltip />} />
                                <Bar
                                    dataKey="value"
                                    name="방문자"
                                    fill={CHART_SLATE}
                                    radius={[0, 4, 4, 0]}
                                    barSize={20}
                                />
                            </BarChart>
                        )}
                    </ChartShell>
                </ConsolePanel>

                {/* Top Pages Table */}
                <ConsolePanel className="p-5 lg:col-span-1">
                    <h3 className="text-lg font-bold text-admin-ink mb-2">인기 페이지</h3>
                    <p className="text-sm text-admin-muted mb-6">가장 많이 조회된 페이지</p>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-[#a1a1aa] uppercase border-b border-admin-line">
                                <tr>
                                    <th className="px-4 py-3 font-medium">페이지</th>
                                    <th className="px-4 py-3 text-right font-medium">뷰</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#f4f4f5]">
                                {topPagesData.slice(0, 5).map((page: any, index: number) => (
                                    <tr key={index} className="group hover:bg-[#fafafb] transition-colors">
                                        <td className="px-4 py-4 font-medium text-admin-ink truncate max-w-[150px]">
                                            <div className="flex flex-col">
                                                <span className="text-sm group-hover:text-admin-accent transition-colors">{page.title === '(not set)' ? '메인 페이지' : page.title}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-right text-[#71717a] group-hover:text-admin-ink">{page.views.toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </ConsolePanel>
            </div>
        </div>
    );
}

function SummaryCard({ title, value, subtext, icon }: { title: string, value: string, subtext: string, icon: React.ReactNode }) {
    return (
        <ConsoleMetricCard
            label={title}
            value={value}
            caption={subtext}
            icon={
                <div className="grid h-8 w-8 place-items-center rounded-[9px] border border-admin-accent-line bg-admin-accent-soft">
                    {icon}
                </div>
            }
        />
    );
}

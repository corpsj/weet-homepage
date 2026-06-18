'use client';

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface InsightsDashboardProps {
    totalInquiries: number;
    monthlyTrends: { month: string; count: number }[];
    statusDistribution: { name: string; value: number }[];
}

const COLORS = ['#2563eb', '#60a5fa', '#93c5fd', '#bfdbfe'];

const STATUS_MAP: Record<string, string> = {
    'new': '신규 문의',
    'read': '읽음',
    'replied': '답변 완료'
};

export default function InsightsDashboard({
    totalInquiries,
    monthlyTrends,
    statusDistribution
}: InsightsDashboardProps) {

    // Format status names for display
    const formattedStatusData = statusDistribution.map(item => ({
        ...item,
        name: STATUS_MAP[item.name] || item.name
    }));

    return (
        <div className="space-y-8">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-[12px] border border-admin-line">
                    <h3 className="text-sm font-medium text-admin-muted">총 문의 건수</h3>
                    <p className="text-3xl font-bold text-admin-ink mt-2">{totalInquiries}</p>
                </div>
                {/* Add more summary cards here if needed */}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Monthly Trend Chart */}
                <div className="bg-white p-6 rounded-[12px] border border-admin-line">
                    <h3 className="text-lg font-bold text-admin-ink mb-6">월별 문의 추이</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={monthlyTrends}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis
                                    dataKey="month"
                                    tick={{ fontSize: 12 }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <YAxis
                                    tick={{ fontSize: 12 }}
                                    axisLine={false}
                                    tickLine={false}
                                    allowDecimals={false}
                                />
                                <Tooltip
                                    cursor={{ fill: '#eff6ff' }}
                                    contentStyle={{ borderRadius: '12px', border: '1px solid #ececed', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Bar
                                    dataKey="count"
                                    fill="#2563eb"
                                    radius={[4, 4, 0, 0]}
                                    barSize={40}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Status Distribution Chart */}
                <div className="bg-white p-6 rounded-[12px] border border-admin-line">
                    <h3 className="text-lg font-bold text-admin-ink mb-6">문의 처리 현황</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={formattedStatusData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {formattedStatusData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: '1px solid #ececed', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Legend verticalAlign="bottom" height={36} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}

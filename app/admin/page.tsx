'use client';

import Link from 'next/link';
import { Package, MessageSquare, Monitor, Layers, HelpCircle, ArrowRight } from 'lucide-react';

export default function AdminDashboard() {
    return (
        <div className="space-y-8">
            {/* Welcome Section */}
            <div>
                <h2 className="text-3xl font-bold text-gray-900 tracking-tight">안녕하세요, 관리자님</h2>
                <p className="text-gray-500 mt-2">Weet 홈페이지 관리자 대시보드입니다.</p>
            </div>

            {/* Quick Actions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <DashboardCard
                    title="제품 관리"
                    description="제품 목록을 조회하고 새로운 제품을 등록합니다."
                    icon={Package}
                    href="/admin/products"
                    color="bg-blue-500"
                />
                <DashboardCard
                    title="문의 관리"
                    description="고객 문의 내역을 확인하고 상태를 변경합니다."
                    icon={MessageSquare}
                    href="/admin/inquiries"
                    color="bg-green-500"
                />
                <DashboardCard
                    title="메인 페이지 관리"
                    description="메인 배너 및 시그니처 라인을 설정합니다."
                    icon={Monitor}
                    href="/admin/cms/main"
                    color="bg-purple-500"
                />
                <DashboardCard
                    title="솔루션 페이지 관리"
                    description="솔루션 섹션의 콘텐츠를 수정합니다."
                    icon={Layers}
                    href="/admin/cms/solutions"
                    color="bg-orange-500"
                />
                <DashboardCard
                    title="고객지원 페이지 관리"
                    description="FAQ 및 공지사항을 관리합니다."
                    icon={HelpCircle}
                    href="/admin/cms/support"
                    color="bg-indigo-500"
                />
            </div>
        </div>
    );
}

function DashboardCard({ title, description, icon: Icon, href, color }: any) {
    return (
        <Link href={href} className="group block bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md hover:border-gray-300 transition-all">
            <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl ${color} bg-opacity-10 group-hover:bg-opacity-20 transition-colors`}>
                    <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
                </div>
                <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-gray-500 transition-colors" />
            </div>
            <div>
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-black transition-colors">{title}</h3>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">{description}</p>
            </div>
        </Link>
    );
}

'use client';

import { usePathname } from 'next/navigation';
import { Bell, Search, Menu } from 'lucide-react';

export default function AdminHeader() {
    const pathname = usePathname();

    // Simple breadcrumb logic
    const pathSegments = pathname.split('/').filter(Boolean);
    const currentPage = pathSegments[pathSegments.length - 1] || 'Dashboard';

    const getPageTitle = (segment: string) => {
        const titles: Record<string, string> = {
            'admin': '대시보드',
            'products': '제품 관리',
            'inquiries': '문의 관리',
            'settings': '설정',
            'main': '메인 페이지 관리',
            'solutions': '솔루션 관리',
            'support': '고객지원 관리',
            'new': '새 항목 추가',
        };
        return titles[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
    };

    return (
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40 px-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <h1 className="text-xl font-bold text-gray-900">
                    {getPageTitle(currentPage)}
                </h1>
                <div className="h-6 w-px bg-gray-300 mx-2 hidden md:block" />
                <nav className="hidden md:flex items-center gap-2 text-sm text-gray-500">
                    <span>Weet Admin</span>
                    {pathSegments.slice(1).map((segment, index) => (
                        <div key={segment} className="flex items-center gap-2">
                            <span>/</span>
                            <span className={index === pathSegments.length - 2 ? "text-gray-900 font-medium" : ""}>
                                {getPageTitle(segment)}
                            </span>
                        </div>
                    ))}
                </nav>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative hidden md:block">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="pl-10 pr-4 py-2 bg-gray-100 border-none rounded-full text-sm focus:ring-2 focus:ring-black/5 w-64 transition-all"
                    />
                </div>
                <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full relative transition-colors">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>
            </div>
        </header>
    );
}

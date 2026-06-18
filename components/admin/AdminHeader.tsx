'use client';

import { usePathname } from 'next/navigation';
import { Bell, Search } from 'lucide-react';

export default function AdminHeader() {
    const pathname = usePathname();

    // Simple breadcrumb logic
    const pathSegments = pathname.split('/').filter(Boolean);
    const currentPage = pathSegments[pathSegments.length - 1] || 'Dashboard';

    const getPageTitle = (segment: string) => {
        const titles: Record<string, string> = {
            'admin': '작업실',
            'consultations': '상담 관리',
            'products': '제품 관리',
            'customize': '주문 구성',
            'projects': '프로젝트 관리',
            'inquiries': '문의 관리',
            'settings': '설정',
            'main': '랜딩 페이지',
            'support': 'FAQ 관리',
            'gallery': '갤러리 관리',
            'insights': '고객 인사이트',
            'utm': 'UTM Builder',
            'new': '새 항목 추가',
        };
        return titles[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
    };

    return (
        <header className="sticky top-0 z-40 flex h-[60px] items-center justify-between gap-4 border-b border-admin-line bg-admin-bg/85 px-6 backdrop-blur-md">
            <div className="flex items-center gap-2 text-[13px] text-admin-muted">
                <span className="font-medium">콘솔</span>
                {pathSegments.slice(1).map((segment, index) => (
                    <span key={segment} className="flex items-center gap-2">
                        <span className="text-[#d4d4d8]">/</span>
                        <span className={index === pathSegments.length - 2 ? 'font-semibold text-admin-ink' : ''}>
                            {getPageTitle(segment)}
                        </span>
                    </span>
                ))}
                {pathSegments.length <= 1 && (
                    <span className="flex items-center gap-2">
                        <span className="text-[#d4d4d8]">/</span>
                        <span className="font-semibold text-admin-ink">{getPageTitle(currentPage)}</span>
                    </span>
                )}
            </div>

            <div className="flex items-center gap-2.5">
                <div className="relative hidden md:block">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#a1a1aa]" />
                    <input
                        type="text"
                        placeholder="검색…"
                        className="h-9 w-60 rounded-[9px] border border-admin-line-2 bg-white pl-9 pr-14 text-[13px] text-admin-ink outline-none transition-all placeholder:text-[#a1a1aa] focus:border-admin-accent focus:ring-2 focus:ring-admin-accent/15"
                    />
                    <kbd className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rounded-[5px] border border-admin-line-2 border-b-2 bg-white px-1.5 py-px font-mono text-[10px] font-semibold text-[#a1a1aa]">
                        ⌘K
                    </kbd>
                </div>
                <button
                    type="button"
                    aria-label="알림"
                    className="relative flex h-9 w-9 items-center justify-center rounded-[9px] border border-admin-line-2 bg-white text-[#52525b] transition-colors hover:border-[#d4d4d8] hover:bg-[#f4f4f5]"
                >
                    <Bell className="h-[18px] w-[18px]" />
                    <span className="absolute right-2 top-2 h-2 w-2 rounded-full border-2 border-white bg-admin-accent" />
                </button>
            </div>
        </header>
    );
}

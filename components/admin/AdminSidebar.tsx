'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import {
    Package,
    MessageSquare,
    Settings,
    LogOut,
    Monitor,
    HelpCircle,
    Layers,
    BarChart3,
    Link2,
    Image as ImageIcon,
    FolderKanban,
    SlidersHorizontal,
    ClipboardList,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
    name: string;
    href: string;
    icon: typeof Package;
    children?: { name: string; href: string }[];
}

const navigation: { title: string; items: NavItem[] }[] = [
    {
        title: "작업",
        items: [
            { name: '작업실', href: '/admin', icon: Layers },
            { name: '상담 관리', href: '/admin/consultations', icon: ClipboardList },
        ],
    },
    {
        title: "고객",
        items: [
            { name: '레거시 문의', href: '/admin/inquiries', icon: MessageSquare },
        ],
    },
    {
        title: "제품/공간",
        items: [
            { name: '제품 관리', href: '/admin/products', icon: Package },
            { name: '주문 구성', href: '/admin/customize', icon: SlidersHorizontal },
            { name: '프로젝트 관리', href: '/admin/projects', icon: FolderKanban },
        ],
    },
    {
        title: "콘텐츠",
        items: [
            { name: '랜딩 페이지', href: '/admin/main', icon: Monitor },
            { name: 'FAQ 관리', href: '/admin/support', icon: HelpCircle },
            { name: '갤러리 관리', href: '/admin/gallery', icon: ImageIcon },
        ],
    },
    {
        title: "데이터",
        items: [
            { name: '고객 인사이트', href: '/admin/insights', icon: BarChart3 },
            { name: 'UTM Builder', href: '/admin/utm', icon: Link2 },
        ],
    },
    {
        title: "시스템",
        items: [
            { name: '설정', href: '/admin/settings', icon: Settings },
        ],
    },
];

export default function AdminSidebar({ user, onClose }: { user?: { email?: string | null }, onClose?: () => void }) {
    const pathname = usePathname();
    const router = useRouter();
    const supabase = createClient();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/login');
        router.refresh();
    };

    // Extract ID from email (remove @weet.com)
    const userId = user?.email ? user.email.split('@')[0] : 'admin';

    return (
        <aside className="flex h-screen w-[230px] shrink-0 flex-col border-r border-admin-line bg-admin-card text-admin-ink">
            <div className="flex h-[60px] flex-none items-center gap-2.5 border-b border-[#f1f1f3] px-[18px]">
                <span className="flex h-7 w-7 items-center justify-center rounded-[8px] bg-admin-ink text-[14px] font-extrabold text-white">
                    W
                </span>
                <div className="leading-[1.1]">
                    <div className="text-[14px] font-bold text-admin-ink">weet</div>
                    <div className="text-[10px] font-medium text-[#a1a1aa]">Operations</div>
                </div>
            </div>

            <nav className="custom-scrollbar flex flex-1 flex-col gap-[18px] overflow-y-auto px-3 py-3.5">
                {navigation.map((section) => (
                    <div key={section.title}>
                        <h3 className="mb-1.5 px-2.5 text-[10px] font-bold uppercase tracking-[0.06em] text-[#a1a1aa]">
                            {section.title}
                        </h3>
                        <div className="flex flex-col gap-px">
                            {section.items.map((item) => {
                                const isActive = item.href === '/admin'
                                    ? pathname === '/admin'
                                    : pathname.startsWith(item.href);
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        onClick={onClose}
                                        className={cn(
                                            "group flex items-center gap-2.5 rounded-[8px] px-2.5 py-2 text-[13.5px] font-medium transition-colors",
                                            isActive
                                                ? "bg-admin-accent-soft text-admin-accent"
                                                : "text-[#3f3f46] hover:bg-[#f1f1f3]"
                                        )}
                                    >
                                        <item.icon className={cn(
                                            "h-4 w-4 transition-colors",
                                            isActive ? "text-admin-accent" : "text-[#71717a] group-hover:text-[#3f3f46]"
                                        )} />
                                        {item.name}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </nav>

            <div className="flex flex-none items-center gap-2.5 border-t border-[#f1f1f3] p-3">
                <div className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-gradient-to-br from-[#3b82f6] to-admin-accent text-[12px] font-bold text-white">
                    {userId[0].toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                    <p className="truncate text-[13px] font-semibold text-admin-ink">{userId}</p>
                    <p className="text-[11px] text-[#a1a1aa]">관리자</p>
                </div>
                <button
                    onClick={handleLogout}
                    aria-label="로그아웃"
                    title="로그아웃"
                    className="flex h-[30px] w-[30px] items-center justify-center rounded-[7px] text-[#a1a1aa] transition-colors hover:bg-[#fef2f2] hover:text-[#dc2626]"
                >
                    <LogOut className="h-4 w-4" />
                </button>
            </div>
        </aside>
    );
}

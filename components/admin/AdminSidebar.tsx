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
    icon: any;
    children?: { name: string; href: string }[];
}

const navigation: { title: string; items: NavItem[] }[] = [
    {
        title: "작업",
        items: [
            {
                name: '작업실',
                href: '/admin',
                icon: Layers
            },
            {
                name: '상담 관리',
                href: '/admin/consultations',
                icon: ClipboardList
            }
        ]
    },
    {
        title: "고객",
        items: [
            {
                name: '레거시 문의',
                href: '/admin/inquiries',
                icon: MessageSquare
            }
        ]
    },
    {
        title: "제품/공간",
        items: [
            {
                name: '제품 관리',
                href: '/admin/products',
                icon: Package
            },
            {
                name: '주문 구성',
                href: '/admin/customize',
                icon: SlidersHorizontal
            },
            {
                name: '프로젝트 관리',
                href: '/admin/projects',
                icon: FolderKanban
            }
        ]
    },
    {
        title: "콘텐츠",
        items: [
            {
                name: '랜딩 페이지',
                href: '/admin/main',
                icon: Monitor
            },
            {
                name: 'FAQ 관리',
                href: '/admin/support',
                icon: HelpCircle
            },
            {
                name: '갤러리 관리',
                href: '/admin/gallery',
                icon: ImageIcon
            }
        ]
    },
    {
        title: "데이터",
        items: [
            {
                name: '고객 인사이트',
                href: '/admin/insights',
                icon: BarChart3
            },
            {
                name: 'UTM Builder',
                href: '/admin/utm',
                icon: Link2
            }
        ]
    },
    {
        title: "시스템",
        items: [
            {
                name: '설정',
                href: '/admin/settings',
                icon: Settings
            }
        ]
    }
];

export default function AdminSidebar({ user, onClose }: { user?: any, onClose?: () => void }) {
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
        <aside className="w-64 bg-[#111111] border-r border-[#222222] text-gray-300 flex flex-col shrink-0 h-screen transition-all duration-300">
            <div className="h-16 flex items-center px-6 border-b border-[#222222]">
                <span className="text-xl font-bold text-white">WEET <span className="text-gray-400 font-medium text-xs ml-1">CONSOLE</span></span>
            </div>

            <nav className="flex-1 px-3 py-6 space-y-8 overflow-y-auto custom-scrollbar">
                {navigation.map((section) => (
                    <div key={section.title}>
                        <h3 className="px-3 text-[10px] font-bold text-gray-500 mb-3">
                            {section.title}
                        </h3>
                        <div className="space-y-0.5">
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
                                            "flex items-center gap-3 px-3 py-2 text-sm font-medium transition-colors group",
                                            isActive
                                                ? "bg-[#1a1a1a] text-[#eab308] border-l-2 border-[#eab308]"
                                                : "text-gray-400 hover:bg-[#1a1a1a] hover:text-white border-l-2 border-transparent"
                                        )}
                                    >
                                        <item.icon className={cn(
                                            "w-4 h-4 transition-colors",
                                            isActive ? "text-[#eab308]" : "text-gray-500 group-hover:text-gray-300"
                                        )} />
                                        {item.name}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </nav>

            <div className="p-4 border-t border-[#222222] bg-[#0a0a0a]">
                <div className="flex items-center gap-3 px-2 py-2 mb-2">
                    <div className="w-8 h-8 rounded bg-[#1a1a1a] border border-[#333] flex items-center justify-center text-xs font-bold text-gray-300">
                        {userId[0].toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">{userId}</p>
                        <p className="text-[10px] text-gray-500">관리자</p>
                    </div>
                </div>
                <button
                    onClick={handleLogout}
                    className="flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold text-[#ef4444] hover:text-[#f87171] hover:bg-[#ef4444]/10 rounded border border-transparent transition-colors w-full"
                >
                    <LogOut className="w-3.5 h-3.5" />
                    로그아웃
                </button>
            </div>
        </aside>
    );
}

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
    Lightbulb,
    BarChart3,
    Link2,
    Image as ImageIcon,
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
        title: "Overview",
        items: [
            {
                name: '대시보드',
                href: '/admin',
                icon: Layers
            },
            {
                name: 'UTM Builder',
                href: '/admin/utm',
                icon: Link2
            }
        ]
    },
    {
        title: "Content Management",
        items: [
            {
                name: '랜딩 페이지',
                href: '/admin/main',
                icon: Monitor
            },
            {
                name: '제품 관리',
                href: '/admin/products',
                icon: Package
            },

            {
                name: 'FAQ 관리',
                href: '/admin/support',
                icon: HelpCircle
            },
            {
                name: '고객 인사이트',
                href: '/admin/insights', // Keeping insights as per user request/existing folder
                icon: BarChart3
            },
            {
                name: '갤러리 관리',
                href: '/admin/gallery',
                icon: ImageIcon
            },
        ]
    },
    {
        title: "Commerce",
        items: [
            { name: '문의 관리', href: '/admin/inquiries', icon: MessageSquare },
        ]
    },
    {
        title: "System",
        items: [
            { name: '설정', href: '/admin/settings', icon: Settings },
        ]
    }
];

export default function AdminSidebar({ user }: { user?: any }) {
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
        <aside className="w-72 bg-[#0F172A] text-white flex flex-col shrink-0 h-screen transition-all duration-300">
            {/* Logo Area */}
            <div className="h-20 flex items-center px-8 border-b border-gray-800">
                <span className="text-2xl font-bold tracking-tight text-white">Weet <span className="text-gray-500 font-light">Admin</span></span>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-8 overflow-y-auto custom-scrollbar">
                {navigation.map((section) => (
                    <div key={section.title}>
                        <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                            {section.title}
                        </h3>
                        <div className="space-y-1">
                            {section.items.map((item) => {
                                const isActive = item.href === '/admin'
                                    ? pathname === '/admin'
                                    : pathname.startsWith(item.href);
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={cn(
                                            "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group",
                                            isActive
                                                ? "bg-white/10 text-white shadow-lg backdrop-blur-sm"
                                                : "text-gray-400 hover:bg-white/5 hover:text-white"
                                        )}
                                    >
                                        <item.icon className={cn(
                                            "w-5 h-5 transition-colors",
                                            isActive ? "text-white" : "text-gray-500 group-hover:text-white"
                                        )} />
                                        {item.name}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </nav>

            {/* Footer / User Profile */}
            <div className="p-4 border-t border-gray-800 bg-[#0B1120]">
                <div className="flex items-center gap-3 px-4 py-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-600 flex items-center justify-center text-sm font-bold">
                        {userId[0].toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">{userId}</p>
                        <p className="text-xs text-gray-500 truncate">Administrator</p>
                    </div>
                </div>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg w-full transition-colors"
                >
                    <LogOut className="w-4 h-4" />
                    로그아웃
                </button>
            </div>
        </aside>
    );
}

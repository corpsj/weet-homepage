'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Package,
    MessageSquare,
    Settings,
    LogOut,
    Monitor,
    FileText,
    HelpCircle,
    ChevronDown,
    Layers,
    TrendingUp
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

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
            { name: '대시보드', href: '/admin', icon: LayoutDashboard },
            { name: '분석 및 통계', href: '/admin/analytics', icon: TrendingUp },
        ]
    },
    {
        title: "Content Management",
        items: [
            {
                name: '메인 페이지',
                href: '/admin/cms/main',
                icon: Monitor
            },
            {
                name: '제품 관리',
                href: '/admin/products',
                icon: Package
            },
            {
                name: '솔루션',
                href: '/admin/cms/solutions',
                icon: Layers
            },
            {
                name: '고객지원',
                href: '/admin/cms/support',
                icon: HelpCircle
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

export default function AdminSidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-72 bg-[#0F172A] text-white flex flex-col fixed inset-y-0 z-50 shadow-xl">
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
                                const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
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
                        AD
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">Admin User</p>
                        <p className="text-xs text-gray-500 truncate">admin@weet.com</p>
                    </div>
                </div>
                <button className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg w-full transition-colors">
                    <LogOut className="w-4 h-4" />
                    로그아웃
                </button>
            </div>
        </aside>
    );
}

'use client';

import { usePathname } from 'next/navigation';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ConsultBar from "@/components/layout/ConsultBar";
import { SkipLink } from "@/components/a11y/SkipLink";
import type { SiteSettings } from '@/lib/site-settings';
import { Toaster } from 'sonner';

export default function ClientLayout({
    children,
    settings,
}: {
    children: React.ReactNode;
    settings: SiteSettings;
}) {
    const pathname = usePathname();
    // Check if current path is admin
    const isAdmin = pathname?.startsWith('/admin') || pathname?.includes('/admin/');
    const isConfigurator = pathname?.startsWith('/customize');
    // 로그인은 디자인상 자체 풀스크린 화면이라 공개 헤더/푸터를 두르지 않는다.
    const isAuth = pathname?.startsWith('/login');

    if (isAuth) {
        return (
            <>
                {children}
                <Toaster position="top-right" richColors />
            </>
        );
    }

    if (isAdmin) {
        return (
            <div className="min-h-screen bg-gray-50 text-black">
                <Toaster position="top-right" richColors />
                {children}
            </div>
        );
    }

    if (isConfigurator) {
        return (
            <>
                {children}
                <Toaster position="top-right" richColors />
            </>
        );
    }

    return (
        <>
            <SkipLink />
            <Header />
            <main id="main-content" className="flex-1 pb-14 lg:pb-0">{children}</main>
            <Footer settings={settings} />
            <ConsultBar settings={settings} />
            <Toaster position="top-right" richColors />
        </>
    );
}

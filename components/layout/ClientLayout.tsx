'use client';

import { usePathname } from 'next/navigation';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Toaster } from 'sonner';

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    // Check if current path is admin
    const isAdmin = pathname?.startsWith('/admin') || pathname?.includes('/admin/');

    if (isAdmin) {
        return (
            <div className="min-h-screen bg-gray-50 text-black">
                <Toaster position="top-right" richColors />
                {children}
            </div>
        );
    }

    return (
        <>
            <Header />
            <main id="main-content" className="flex-1 pt-[70px] md:pt-[90px] lg:pt-[110px]">{children}</main>
            <Footer />
            <Toaster position="top-right" richColors />
        </>
    );
}

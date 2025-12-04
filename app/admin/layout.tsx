'use client';

import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { Toaster } from 'sonner';

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Server-side auth check
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex font-sans">
            {/* Sidebar */}
            <AdminSidebar user={user} />

            {/* Main Content Wrapper */}
            <div className="flex-1 ml-72 flex flex-col min-h-screen">
                {/* Header */}
                <AdminHeader />

                {/* Page Content */}
                <main className="flex-1 p-8 overflow-y-auto">
                    <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {children}
                    </div>
                </main>
            </div>
            <Toaster position="top-right" />
        </div>
    );
}

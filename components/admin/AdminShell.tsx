'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import AdminSidebar from './AdminSidebar';
import { cn } from '@/lib/utils';

export default function AdminShell({ children, user }: { children: React.ReactNode, user?: { email?: string | null } }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-[100dvh] overflow-hidden bg-admin-bg">
      {/* Mobile header */}
      <div className="fixed left-0 right-0 top-0 z-40 flex h-14 items-center justify-between border-b border-admin-line bg-admin-card px-4 lg:hidden">
        <span className="flex items-center gap-2 text-base font-bold text-admin-ink">
          <span className="flex h-6 w-6 items-center justify-center rounded-[7px] bg-admin-ink text-[12px] font-extrabold text-white">W</span>
          weet <span className="text-[11px] font-medium text-[#a1a1aa]">Operations</span>
        </span>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label={sidebarOpen ? '관리자 메뉴 닫기' : '관리자 메뉴 열기'}
          className="p-2 text-[#52525b] transition-colors hover:text-admin-ink focus:outline-none"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-admin-ink/40 backdrop-blur-sm transition-opacity lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out lg:relative lg:z-0 lg:translate-x-0 lg:!visible lg:!pointer-events-auto",
        sidebarOpen ? "visible translate-x-0 pointer-events-auto" : "invisible -translate-x-full pointer-events-none"
      )}>
        <AdminSidebar user={user} onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main content */}
      <main className="w-full max-w-full flex-1 overflow-y-auto p-4 pt-14 md:p-8 lg:pt-8">
        <div className="mx-auto max-w-[1080px]">
          {children}
        </div>
      </main>
    </div>
  );
}

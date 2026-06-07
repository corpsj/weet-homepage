'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import AdminSidebar from './AdminSidebar';
import { cn } from '@/lib/utils';

export default function AdminShell({ children, user }: { children: React.ReactNode, user: any }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-[100dvh] overflow-hidden bg-[#fbfbfa]">
      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-[#111111] border-b border-[#222222] z-40 flex items-center justify-between px-4">
        <span className="text-lg font-bold text-white">
          WEET <span className="text-gray-400 font-medium text-xs ml-1">CONSOLE</span>
        </span>
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)} 
          aria-label={sidebarOpen ? '관리자 메뉴 닫기' : '관리자 메뉴 열기'}
          className="text-gray-400 hover:text-white p-2 focus:outline-none"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 lg:hidden transition-opacity backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:z-0 lg:!visible lg:!pointer-events-auto",
        sidebarOpen ? "translate-x-0 visible pointer-events-auto" : "-translate-x-full invisible pointer-events-none"
      )}>
        <AdminSidebar user={user} onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto pt-14 lg:pt-0 p-4 md:p-8 w-full max-w-full">
        <div className="mx-auto max-w-6xl">
          {children}
        </div>
      </main>
    </div>
  );
}

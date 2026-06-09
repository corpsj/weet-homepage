'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, MessageSquare, Package, SlidersHorizontal, FolderKanban, HelpCircle, ImageIcon, BarChart3, Link2, Settings } from 'lucide-react';
import { consoleInputClass } from '@/components/admin/ConsolePrimitives';

const COMMANDS = [
  { id: 'consultations', title: '상담 관리', keywords: ['상담', 'consultation', 'contact'], href: '/admin/consultations', icon: MessageSquare },
  { id: 'products', title: '제품 관리', keywords: ['제품', 'product', 'model'], href: '/admin/products', icon: Package },
  { id: 'customize', title: '주문 구성 관리', keywords: ['주문', '구성', 'customize', 'option'], href: '/admin/customize', icon: SlidersHorizontal },
  { id: 'projects', title: '프로젝트 관리', keywords: ['프로젝트', 'project', 'portfolio'], href: '/admin/projects', icon: FolderKanban },
  { id: 'faq', title: 'FAQ 관리', keywords: ['faq', '질문', '지원', 'support', 'help'], href: '/admin/support', icon: HelpCircle },
  { id: 'gallery', title: '갤러리 관리', keywords: ['갤러리', 'gallery', 'image', 'photo'], href: '/admin/gallery', icon: ImageIcon },
  { id: 'insights', title: '고객 인사이트', keywords: ['고객', '인사이트', 'insight', 'analytics'], href: '/admin/insights', icon: BarChart3 },
  { id: 'utm', title: 'UTM Builder', keywords: ['utm', 'builder', 'campaign', 'link'], href: '/admin/utm', icon: Link2 },
  { id: 'settings', title: '설정', keywords: ['설정', 'settings', 'config'], href: '/admin/settings', icon: Settings },
];

export default function AdminCommandSearch() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const filteredCommands = query
    ? COMMANDS.filter(cmd =>
        cmd.title.toLowerCase().includes(query.toLowerCase()) ||
        cmd.keywords.some(k => k.toLowerCase().includes(query.toLowerCase()))
      )
    : COMMANDS;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        setIsOpen(true);
        e.preventDefault();
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (filteredCommands.length === 0) return;
      setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (filteredCommands.length === 0) return;
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const selected = filteredCommands[selectedIndex];
      if (selected) {
        setIsOpen(false);
        setQuery('');
        setSelectedIndex(0);
        router.push(selected.href);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setIsOpen(false);
    }
  };

  return (
    <div className="relative w-full md:w-64" ref={containerRef}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
      <input
        type="text"
        placeholder="명령 또는 화면 검색"
        className={`${consoleInputClass} w-full pl-9 bg-white transition-shadow focus:ring-2 focus:ring-[#8a6a12]/20 focus:border-[#8a6a12]`}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setSelectedIndex(0);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        onKeyDown={handleKeyDown}
      />

      {isOpen && (
        <div className="absolute top-full right-0 mt-1.5 w-full md:w-72 bg-[#fbfbfa] border border-[#e5e5df] rounded-md shadow-lg overflow-hidden z-50 py-1">
          {filteredCommands.length > 0 ? (
            <ul className="max-h-64 overflow-y-auto">
              {filteredCommands.map((cmd, idx) => {
                const isSelected = idx === selectedIndex;
                return (
                  <li key={cmd.id}>
                    <Link
                      href={cmd.href}
                      onClick={() => {
                        setIsOpen(false);
                        setQuery('');
                        setSelectedIndex(0);
                      }}
                      className={`flex items-center gap-3 px-3 py-2 text-sm transition-colors ${
                        isSelected ? 'bg-white text-gray-900 border-l-2 border-[#8a6a12]' : 'text-gray-600 hover:bg-white hover:text-gray-900 border-l-2 border-transparent'
                      }`}
                      onMouseEnter={() => setSelectedIndex(idx)}
                    >
                      <cmd.icon className={`h-4 w-4 ${isSelected ? 'text-[#8a6a12]' : 'text-gray-400'}`} />
                      <span className="font-medium">{cmd.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="px-3 py-3 text-sm font-medium text-gray-500">검색 결과가 없습니다.</p>
          )}
        </div>
      )}
    </div>
  );
}

'use client';

import { useState } from 'react';
import { Plus, Trash2, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

interface FAQ {
    id: string;
    question: string;
    answer: string;
    category: string;
    sort_order: number;
    is_active: boolean;
}

interface Notice {
    id: string;
    title: string;
    content: string;
    is_pinned: boolean;
    is_active: boolean;
    created_at: string;
}

export default function SupportEditor({ initialFAQs, initialNotices }: { initialFAQs: FAQ[], initialNotices: Notice[] }) {
    const [activeTab, setActiveTab] = useState('faq');
    const [faqs, setFAQs] = useState<FAQ[]>(initialFAQs);
    const [notices, setNotices] = useState<Notice[]>(initialNotices);
    const [loading, setLoading] = useState(false);
    const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
    const router = useRouter();
    const supabase = createClient();

    // --- FAQ Handlers ---
    const handleAddFAQ = async () => {
        setLoading(true);
        try {
            const newFAQ = {
                question: 'New Question',
                answer: 'Answer goes here',
                category: 'general',
                sort_order: faqs.length,
                is_active: true
            };

            const { error } = await supabase.from('faqs').insert(newFAQ);
            if (error) throw error;
            router.refresh();
        } catch (e) {
            console.error(e);
            alert('Failed to add FAQ');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateFAQ = async (id: string, field: keyof FAQ, value: any) => {
        setFAQs(faqs.map(f => f.id === id ? { ...f, [field]: value } : f));
        try {
            await supabase.from('faqs').update({ [field]: value }).eq('id', id);
        } catch (e) {
            console.error(e);
        }
    };

    const handleDeleteFAQ = async (id: string) => {
        if (!confirm('Delete this FAQ?')) return;
        setLoading(true);
        try {
            await supabase.from('faqs').delete().eq('id', id);
            router.refresh();
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    // --- Notice Handlers ---
    const handleAddNotice = async () => {
        setLoading(true);
        try {
            const newNotice = {
                title: 'New Notice',
                content: 'Content goes here',
                is_pinned: false,
                is_active: true
            };

            const { error } = await supabase.from('notices').insert(newNotice);
            if (error) throw error;
            router.refresh();
        } catch (e) {
            console.error(e);
            alert('Failed to add Notice');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateNotice = async (id: string, field: keyof Notice, value: any) => {
        setNotices(notices.map(n => n.id === id ? { ...n, [field]: value } : n));
        try {
            await supabase.from('notices').update({ [field]: value }).eq('id', id);
        } catch (e) {
            console.error(e);
        }
    };

    const handleDeleteNotice = async (id: string) => {
        if (!confirm('Delete this Notice?')) return;
        setLoading(true);
        try {
            await supabase.from('notices').delete().eq('id', id);
            router.refresh();
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">고객지원 관리</h2>
                    <p className="text-gray-500 text-sm mt-1">FAQ 및 공지사항을 관리합니다.</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8">
                    <button
                        onClick={() => setActiveTab('faq')}
                        className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === 'faq'
                                ? 'border-black text-black'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                    >
                        FAQ 관리
                    </button>
                    <button
                        onClick={() => setActiveTab('notices')}
                        className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === 'notices'
                                ? 'border-black text-black'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                    >
                        공지사항 관리
                    </button>
                </nav>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 min-h-[500px]">
                {activeTab === 'faq' ? (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-bold text-gray-900">FAQ 목록</h3>
                            <button
                                onClick={handleAddFAQ}
                                disabled={loading}
                                className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 disabled:opacity-50"
                            >
                                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                                FAQ 추가
                            </button>
                        </div>

                        <div className="space-y-4">
                            {faqs.map((faq) => (
                                <div key={faq.id} className="border border-gray-200 rounded-lg overflow-hidden">
                                    <div
                                        className="flex items-center justify-between p-4 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
                                        onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                                    >
                                        <div className="flex-1 mr-4">
                                            <input
                                                type="text"
                                                value={faq.question}
                                                onClick={(e) => e.stopPropagation()}
                                                onChange={(e) => handleUpdateFAQ(faq.id, 'question', e.target.value)}
                                                className="w-full bg-transparent border-none focus:ring-0 font-medium text-gray-900 p-0"
                                            />
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDeleteFAQ(faq.id);
                                                }}
                                                className="text-gray-400 hover:text-red-500"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                            {expandedFaq === faq.id ? <ChevronUp className="w-5 h-5 text-gray-500" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
                                        </div>
                                    </div>

                                    {expandedFaq === faq.id && (
                                        <div className="p-4 border-t border-gray-200 bg-white">
                                            <textarea
                                                rows={4}
                                                value={faq.answer}
                                                onChange={(e) => handleUpdateFAQ(faq.id, 'answer', e.target.value)}
                                                className="w-full p-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black/5 resize-none"
                                            />
                                            <div className="flex items-center gap-4 mt-3">
                                                <div className="flex items-center gap-2">
                                                    <label className="text-xs font-medium text-gray-500">카테고리:</label>
                                                    <select
                                                        value={faq.category}
                                                        onChange={(e) => handleUpdateFAQ(faq.id, 'category', e.target.value)}
                                                        className="text-sm border-gray-200 rounded-md focus:ring-black focus:border-black"
                                                    >
                                                        <option value="general">일반</option>
                                                        <option value="product">제품</option>
                                                        <option value="service">서비스</option>
                                                    </select>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <input
                                                        type="checkbox"
                                                        checked={faq.is_active}
                                                        onChange={(e) => handleUpdateFAQ(faq.id, 'is_active', e.target.checked)}
                                                        className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
                                                    />
                                                    <label className="text-xs font-medium text-gray-600">활성화</label>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                            {faqs.length === 0 && (
                                <div className="text-center py-12 text-gray-500">등록된 FAQ가 없습니다.</div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-bold text-gray-900">공지사항 목록</h3>
                            <button
                                onClick={handleAddNotice}
                                disabled={loading}
                                className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 disabled:opacity-50"
                            >
                                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                                공지사항 추가
                            </button>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-4 py-3 font-medium text-gray-500">제목</th>
                                        <th className="px-4 py-3 font-medium text-gray-500 w-32">상태</th>
                                        <th className="px-4 py-3 font-medium text-gray-500 w-32">작성일</th>
                                        <th className="px-4 py-3 font-medium text-gray-500 w-20 text-right">관리</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {notices.map((notice) => (
                                        <tr key={notice.id} className="hover:bg-gray-50">
                                            <td className="px-4 py-3">
                                                <input
                                                    type="text"
                                                    value={notice.title}
                                                    onChange={(e) => handleUpdateNotice(notice.id, 'title', e.target.value)}
                                                    className="w-full bg-transparent border-none focus:ring-0 font-medium text-gray-900 p-0"
                                                />
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-3">
                                                    <label className="flex items-center gap-1 cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            checked={notice.is_pinned}
                                                            onChange={(e) => handleUpdateNotice(notice.id, 'is_pinned', e.target.checked)}
                                                            className="w-3.5 h-3.5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                                        />
                                                        <span className="text-xs text-gray-500">고정</span>
                                                    </label>
                                                    <label className="flex items-center gap-1 cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            checked={notice.is_active}
                                                            onChange={(e) => handleUpdateNotice(notice.id, 'is_active', e.target.checked)}
                                                            className="w-3.5 h-3.5 text-green-600 border-gray-300 rounded focus:ring-green-500"
                                                        />
                                                        <span className="text-xs text-gray-500">공개</span>
                                                    </label>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-gray-500 text-xs">
                                                {new Date(notice.created_at).toLocaleDateString()}
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <button
                                                    onClick={() => handleDeleteNotice(notice.id)}
                                                    className="text-gray-400 hover:text-red-500"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {notices.length === 0 && (
                                        <tr>
                                            <td colSpan={4} className="px-4 py-12 text-center text-gray-500">
                                                등록된 공지사항이 없습니다.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

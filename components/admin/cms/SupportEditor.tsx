'use client';

import { useState } from 'react';
import { Plus, Trash2, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { createFaq, updateFaq, deleteFaq } from '@/app/actions/faq-actions';
import { createNotice, updateNotice, deleteNotice } from '@/app/actions/notice-actions';

interface FAQ {
    id: string;
    question_ko: string;
    answer_ko: string;
    question_en: string | null;
    answer_en: string | null;
    order_index: number;
    created_at: string;
}

interface Notice {
    id: string;
    title: string;
    content: string;
    is_pinned: boolean;
    is_active: boolean;
    created_at: string;
}

export default function SupportEditor({
    initialFAQs,
    initialNotices,
    dbError
}: {
    initialFAQs: FAQ[],
    initialNotices: Notice[],
    dbError?: string | null
}) {
    const [activeTab, setActiveTab] = useState('faq');
    const [faqs, setFAQs] = useState<FAQ[]>(initialFAQs);
    const [notices, setNotices] = useState<Notice[]>(initialNotices);
    const [loading, setLoading] = useState(false);
    const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
    const router = useRouter();

    // --- FAQ Handlers ---
    const handleAddFAQ = async () => {
        setLoading(true);
        try {
            const newFAQData = {
                question_ko: '새 질문',
                answer_ko: '내용을 입력하세요.',
                question_en: 'New Question',
                answer_en: 'Enter content here.',
                order_index: faqs.length,
            };

            const result = await createFaq(newFAQData);
            if (result.success && result.data) {
                setFAQs(prev => [...prev, result.data as FAQ]);
                setExpandedFaq(result.data.id);
                toast.success('FAQ가 추가되었습니다.');
            } else {
                toast.error(result.message || 'FAQ 추가 실패');
            }
        } catch (e) {
            console.error(e);
            toast.error('오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateFAQ = async (id: string, field: keyof FAQ, value: any) => {
        // Optimistic update
        setFAQs(prev => prev.map(f => f.id === id ? { ...f, [field]: value } : f));
        try {
            const result = await updateFaq(id, { [field]: value });
            if (!result.success) {
                toast.error(result.message);
                // Rollback if needed, but for text fields usually okay to just wait for next change
            }
        } catch (e) {
            console.error(e);
        }
    };

    const handleDeleteFAQ = async (id: string) => {
        if (!confirm('이 FAQ를 삭제하시겠습니까?')) return;
        setLoading(true);
        try {
            const result = await deleteFaq(id);
            if (result.success) {
                setFAQs(prev => prev.filter(f => f.id !== id));
                toast.success('FAQ가 삭제되었습니다.');
            } else {
                toast.error(result.message);
            }
        } catch (e) {
            console.error(e);
            toast.error('오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };

    // --- Notice Handlers ---
    const handleAddNotice = async () => {
        setLoading(true);
        try {
            const newNoticeData = {
                title: '새 공지사항',
                content: '내용을 입력하세요.',
                is_pinned: false,
                is_active: true
            };

            const result = await createNotice(newNoticeData);
            if (result.success && result.data) {
                setNotices(prev => [result.data as Notice, ...prev]);
                toast.success('공지사항이 추가되었습니다.');
            } else {
                toast.error(result.message);
            }
        } catch (e) {
            console.error(e);
            toast.error('오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateNotice = async (id: string, field: keyof Notice, value: any) => {
        setNotices(prev => prev.map(n => n.id === id ? { ...n, [field]: value } : n));
        try {
            const result = await updateNotice(id, { [field]: value });
            if (!result.success) {
                toast.error(result.message);
            }
        } catch (e) {
            console.error(e);
        }
    };

    const handleDeleteNotice = async (id: string) => {
        if (!confirm('이 공지사항을 삭제하시겠습니까?')) return;
        setLoading(true);
        try {
            const result = await deleteNotice(id);
            if (result.success) {
                setNotices(prev => prev.filter(n => n.id !== id));
                toast.success('공지사항이 삭제되었습니다.');
            } else {
                toast.error(result.message);
            }
        } catch (e) {
            console.error(e);
            toast.error('오류가 발생했습니다.');
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

            {/* Database Setup Error Guide */}
            {dbError && (
                <div className="p-6 bg-red-50 border border-red-200 rounded-xl space-y-4">
                    <div className="flex items-center gap-2 text-red-700 font-bold">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        데이터베이스 설정이 필요합니다
                    </div>
                    <p className="text-sm text-red-600">
                        현재 데이터베이스 스키마가 최신 코드가 요구하는 형식과 다릅니다. (에러: {dbError})
                        <br />아래 SQL을 Supabase SQL Editor에서 실행하여 테이블을 업데이트해주세요.
                    </p>
                    <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                        <pre className="text-xs text-blue-300 font-mono">
                            {`-- 1. FAQ 테이블 최신화
CREATE TABLE IF NOT EXISTS faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_ko TEXT NOT NULL,
  answer_ko TEXT NOT NULL,
  question_en TEXT,
  answer_en TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. 만약 기존 테이블이 있다면 누락된 컬럼 추가 및 레거시 제약 조건 제거
DO $$
BEGIN
    -- 신규 컬럼 추가
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'faqs' AND column_name = 'question_ko') THEN
        ALTER TABLE faqs ADD COLUMN question_ko TEXT;
        ALTER TABLE faqs ADD COLUMN answer_ko TEXT;
        ALTER TABLE faqs ADD COLUMN question_en TEXT;
        ALTER TABLE faqs ADD COLUMN answer_en TEXT;
        ALTER TABLE faqs ADD COLUMN order_index INTEGER DEFAULT 0;
    END IF;

    -- 레거시 컬럼(question, answer) 제약 조건 제거 (400 에러 해결 핵심)
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'faqs' AND column_name = 'question') THEN
        ALTER TABLE faqs ALTER COLUMN question DROP NOT NULL;
        ALTER TABLE faqs ALTER COLUMN answer DROP NOT NULL;
        
        -- 데이터가 없다면 아예 삭제해도 무방합니다 (선택사항)
        -- ALTER TABLE faqs DROP COLUMN question;
        -- ALTER TABLE faqs DROP COLUMN answer;
    END IF;
END $$;

-- 3. 문의 테이블 컬럼 추가
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'inquiries' AND column_name = 'category') THEN
        ALTER TABLE inquiries ADD COLUMN category TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'inquiries' AND column_name = 'reply_content') THEN
        ALTER TABLE inquiries ADD COLUMN reply_content TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'inquiries' AND column_name = 'replied_at') THEN
        ALTER TABLE inquiries ADD COLUMN replied_at TIMESTAMPTZ;
    END IF;
END $$;`}
                        </pre>
                    </div>
                    <p className="text-xs text-gray-500">
                        * SQL 실행 후 페이지를 새로고침하면 정상적으로 작동합니다.
                    </p>
                </div>
            )
            }

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
                                            <div className="font-medium text-gray-900">
                                                {faq.question_ko}
                                            </div>
                                            <div className="text-xs text-gray-500 mt-1">
                                                {faq.question_en || '(No English Question)'}
                                            </div>
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
                                        <div className="p-4 border-t border-gray-200 bg-white space-y-6">
                                            {/* Primary Korean Section */}
                                            <div className="space-y-4">
                                                <div className="flex items-center gap-2 border-l-4 border-blue-500 pl-3">
                                                    <h4 className="text-sm font-bold text-gray-900">국문 정보 (필수)</h4>
                                                </div>
                                                <div className="grid grid-cols-1 gap-4">
                                                    <div>
                                                        <label className="text-xs font-medium text-gray-500 mb-1 block">질문 (Korean)</label>
                                                        <input
                                                            type="text"
                                                            value={faq.question_ko}
                                                            onChange={(e) => handleUpdateFAQ(faq.id, 'question_ko', e.target.value)}
                                                            placeholder="질문을 입력하세요"
                                                            className="w-full p-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="text-xs font-medium text-gray-500 mb-1 block">답변 (Korean)</label>
                                                        <textarea
                                                            rows={4}
                                                            value={faq.answer_ko}
                                                            onChange={(e) => handleUpdateFAQ(faq.id, 'answer_ko', e.target.value)}
                                                            placeholder="답변 내용을 입력하세요"
                                                            className="w-full p-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Secondary English Section */}
                                            <div className="space-y-4 pt-2 border-t border-gray-100">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2 border-l-4 border-gray-300 pl-3">
                                                        <h4 className="text-sm font-bold text-gray-700">영문 정보 (선택)</h4>
                                                    </div>
                                                    <span className="text-[10px] text-gray-400 bg-gray-50 px-2 py-0.5 rounded border border-gray-100">
                                                        * 영문 버전이 필요한 경우에만 입력하세요
                                                    </span>
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 opacity-80 hover:opacity-100 transition-opacity">
                                                    <div>
                                                        <label className="text-xs font-medium text-gray-500 mb-1 block">Question (English)</label>
                                                        <input
                                                            type="text"
                                                            value={faq.question_en || ''}
                                                            onChange={(e) => handleUpdateFAQ(faq.id, 'question_en', e.target.value)}
                                                            placeholder="English Question"
                                                            className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="text-xs font-medium text-gray-500 mb-1 block">Answer (English)</label>
                                                        <textarea
                                                            rows={4}
                                                            value={faq.answer_en || ''}
                                                            onChange={(e) => handleUpdateFAQ(faq.id, 'answer_en', e.target.value)}
                                                            placeholder="English Answer"
                                                            className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 resize-none"
                                                        />
                                                    </div>
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
        </div >
    );
}

'use client';

import { Fragment, useState } from 'react';
import { Plus, Trash2, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { createFaq, updateFaq, deleteFaq } from '@/app/actions/faq-actions';
import { createNotice, updateNotice, deleteNotice } from '@/app/actions/notice-actions';
import {
    ConsolePageHeader,
    ConsolePanel,
    consoleInputClass,
    consolePrimaryButtonClass,
    consoleSecondaryButtonClass,
    consoleIconButtonClass
} from '@/components/admin/ConsolePrimitives';

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

function formatKstDate(value: string) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return '-';
    const kstDate = new Date(date.getTime() + 9 * 60 * 60 * 1000);
    const year = kstDate.getUTCFullYear();
    const month = String(kstDate.getUTCMonth() + 1).padStart(2, '0');
    const day = String(kstDate.getUTCDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
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
    const [faqDrafts, setFaqDrafts] = useState<Record<string, FAQ>>({});
    const [noticeDrafts, setNoticeDrafts] = useState<Record<string, Notice>>({});
    const [savingItems, setSavingItems] = useState<Record<string, boolean>>({});
    const [loading, setLoading] = useState(false);
    const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
    const [expandedNotice, setExpandedNotice] = useState<string | null>(null);
    const router = useRouter();

    const setItemSaving = (key: string, value: boolean) => {
        setSavingItems(prev => ({ ...prev, [key]: value }));
    };

    const getFaqDraft = (faq: FAQ) => faqDrafts[faq.id] || faq;
    const getNoticeDraft = (notice: Notice) => noticeDrafts[notice.id] || notice;

    const isFaqDirty = (faq: FAQ) => {
        const draft = getFaqDraft(faq);
        return (
            draft.question_ko !== faq.question_ko ||
            draft.answer_ko !== faq.answer_ko ||
            (draft.question_en || '') !== (faq.question_en || '') ||
            (draft.answer_en || '') !== (faq.answer_en || '')
        );
    };

    const isNoticeDirty = (notice: Notice) => {
        const draft = getNoticeDraft(notice);
        return (
            draft.title !== notice.title ||
            draft.content !== notice.content ||
            draft.is_pinned !== notice.is_pinned ||
            draft.is_active !== notice.is_active
        );
    };

    const handleChangeFAQDraft = (id: string, field: keyof FAQ, value: FAQ[keyof FAQ]) => {
        const source = faqs.find(faq => faq.id === id);
        if (!source) return;
        setFaqDrafts(prev => ({
            ...prev,
            [id]: { ...(prev[id] || source), [field]: value }
        }));
    };

    const handleChangeNoticeDraft = (id: string, field: keyof Notice, value: Notice[keyof Notice]) => {
        const source = notices.find(notice => notice.id === id);
        if (!source) return;
        setNoticeDrafts(prev => ({
            ...prev,
            [id]: { ...(prev[id] || source), [field]: value }
        }));
    };

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

    const handleSaveFAQ = async (faq: FAQ) => {
        const draft = getFaqDraft(faq);
        const key = `faq:${faq.id}`;
        setItemSaving(key, true);
        try {
            const result = await updateFaq(faq.id, {
                question_ko: draft.question_ko,
                answer_ko: draft.answer_ko,
                question_en: draft.question_en,
                answer_en: draft.answer_en,
            });
            if (result.success && result.data) {
                setFAQs(prev => prev.map(item => item.id === faq.id ? result.data as FAQ : item));
                setFaqDrafts(prev => {
                    const next = { ...prev };
                    delete next[faq.id];
                    return next;
                });
                toast.success('FAQ가 저장되었습니다.');
            } else {
                toast.error(result.message || 'FAQ 저장 실패');
            }
        } catch (e) {
            console.error(e);
            toast.error('FAQ 저장 중 오류가 발생했습니다.');
        } finally {
            setItemSaving(key, false);
        }
    };

    const handleDeleteFAQ = async (id: string) => {
        if (!confirm('이 FAQ를 삭제하시겠습니까?')) return;
        setLoading(true);
        try {
            const result = await deleteFaq(id);
            if (result.success) {
                setFAQs(prev => prev.filter(f => f.id !== id));
                setFaqDrafts(prev => {
                    const next = { ...prev };
                    delete next[id];
                    return next;
                });
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
                setExpandedNotice(result.data.id);
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

    const handleSaveNotice = async (notice: Notice) => {
        const draft = getNoticeDraft(notice);
        const key = `notice:${notice.id}`;
        setItemSaving(key, true);
        try {
            const result = await updateNotice(notice.id, {
                title: draft.title,
                content: draft.content,
                is_pinned: draft.is_pinned,
                is_active: draft.is_active,
            });
            if (result.success && result.data) {
                setNotices(prev => prev.map(item => item.id === notice.id ? result.data as Notice : item));
                setNoticeDrafts(prev => {
                    const next = { ...prev };
                    delete next[notice.id];
                    return next;
                });
                toast.success('공지사항이 저장되었습니다.');
            } else {
                toast.error(result.message || '공지사항 저장 실패');
            }
        } catch (e) {
            console.error(e);
            toast.error('공지사항 저장 중 오류가 발생했습니다.');
        } finally {
            setItemSaving(key, false);
        }
    };

    const handleDeleteNotice = async (id: string) => {
        if (!confirm('이 공지사항을 삭제하시겠습니까?')) return;
        setLoading(true);
        try {
            const result = await deleteNotice(id);
            if (result.success) {
                setNotices(prev => prev.filter(n => n.id !== id));
                setNoticeDrafts(prev => {
                    const next = { ...prev };
                    delete next[id];
                    return next;
                });
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
            <ConsolePageHeader
                eyebrow="SYSTEM"
                title="고객지원 관리"
                description="FAQ 및 공지사항을 관리합니다."
            />

            {/* Database Setup Error Guide */}
            {dbError && (
                <ConsolePanel className="p-6 bg-red-50/50 border-red-200 space-y-4">
                    <div className="flex items-center gap-2 text-red-700 font-bold text-sm">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        데이터베이스 설정이 필요합니다
                    </div>
                    <p className="text-xs text-red-600 leading-relaxed font-medium">
                        현재 데이터베이스 스키마가 최신 코드가 요구하는 형식과 다릅니다. (에러: {dbError})
                        <br />아래 SQL을 Supabase SQL Editor에서 실행하여 테이블을 업데이트해주세요.
                    </p>
                    <div className="bg-black rounded p-4 overflow-x-auto">
                        <pre className="text-[11px] text-[#d8d8d2] font-mono leading-relaxed">
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
                    <p className="text-[11px] text-red-500/70 font-bold">
                        * SQL 실행 후 페이지를 새로고침하면 정상적으로 작동합니다.
                    </p>
                </ConsolePanel>
            )}

            {/* Tabs */}
            <div className="border-b border-[#e5e5df]">
                <nav className="-mb-px flex space-x-6 px-1">
                    <button
                        onClick={() => setActiveTab('faq')}
                        className={`py-3 border-b-2 font-bold text-xs transition-colors ${activeTab === 'faq'
                            ? 'border-[#111111] text-[#111111]'
                            : 'border-transparent text-gray-400 hover:text-gray-900'
                            }`}
                    >
                        FAQ 관리
                    </button>
                    <button
                        onClick={() => setActiveTab('notices')}
                        className={`py-3 border-b-2 font-bold text-xs transition-colors ${activeTab === 'notices'
                            ? 'border-[#111111] text-[#111111]'
                            : 'border-transparent text-gray-400 hover:text-gray-900'
                            }`}
                    >
                        공지사항 관리
                    </button>
                </nav>
            </div>

            <ConsolePanel className="p-6 min-h-[500px]">
                {activeTab === 'faq' ? (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h3 className="text-sm font-black text-gray-900">FAQ 목록</h3>
                            <button
                                onClick={handleAddFAQ}
                                disabled={loading}
                                className={consolePrimaryButtonClass + " px-3 py-1.5"}
                            >
                                {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin mr-1" /> : <Plus className="w-3.5 h-3.5 mr-1" />}
                                FAQ 추가
                            </button>
                        </div>

                        <div className="space-y-3">
                            {faqs.map((faq) => {
                                const draft = getFaqDraft(faq);
                                const dirty = isFaqDirty(faq);
                                const saving = Boolean(savingItems[`faq:${faq.id}`]);

                                return (
                                    <div key={faq.id} className="border border-[#e5e5df] bg-white rounded overflow-hidden">
                                    <div
                                        className="flex items-center justify-between p-4 cursor-pointer hover:bg-[#fbfbfa] transition-colors"
                                        onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                                    >
                                        <div className="flex-1 mr-4">
                                            <div className="font-bold text-sm text-gray-900">
                                                {faq.question_ko}
                                            </div>
                                            <div className="text-[11px] font-medium text-gray-400 mt-0.5">
                                                {faq.question_en || '(No English Question)'}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDeleteFAQ(faq.id);
                                                }}
                                                aria-label="FAQ 삭제"
                                                className={`${consoleIconButtonClass} text-gray-400 hover:text-red-500 hover:bg-red-50`}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                            {expandedFaq === faq.id ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                                        </div>
                                    </div>

                                    {expandedFaq === faq.id && (
                                        <div className="p-4 border-t border-[#e5e5df] bg-[#fbfbfa] space-y-6">
                                            {/* Primary Korean Section */}
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-2 border-l-2 border-[#111111] pl-2">
                                                    <h4 className="text-xs font-black text-gray-900">국문 정보 (필수)</h4>
                                                </div>
                                                <div className="grid grid-cols-1 gap-3">
                                                    <div>
                                                        <label className="text-[11px] font-bold text-gray-500 mb-1 block">질문 (Korean)</label>
                                                        <input
                                                            type="text"
                                                            value={draft.question_ko}
                                                            onChange={(e) => handleChangeFAQDraft(faq.id, 'question_ko', e.target.value)}
                                                            placeholder="질문을 입력하세요"
                                                            className={consoleInputClass + " w-full bg-white"}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="text-[11px] font-bold text-gray-500 mb-1 block">답변 (Korean)</label>
                                                        <textarea
                                                            rows={3}
                                                            value={draft.answer_ko}
                                                            onChange={(e) => handleChangeFAQDraft(faq.id, 'answer_ko', e.target.value)}
                                                            placeholder="답변 내용을 입력하세요"
                                                            className={consoleInputClass + " w-full bg-white resize-none"}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Secondary English Section */}
                                            <div className="space-y-3 pt-4 border-t border-[#e5e5df]">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2 border-l-2 border-gray-300 pl-2">
                                                        <h4 className="text-xs font-bold text-gray-600">영문 정보 (선택)</h4>
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 opacity-70 hover:opacity-100 transition-opacity">
                                                    <div>
                                                        <label className="text-[11px] font-bold text-gray-500 mb-1 block">Question (English)</label>
                                                        <input
                                                            type="text"
                                                            value={draft.question_en || ''}
                                                            onChange={(e) => handleChangeFAQDraft(faq.id, 'question_en', e.target.value)}
                                                            placeholder="English Question"
                                                            className={consoleInputClass + " w-full bg-white"}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="text-[11px] font-bold text-gray-500 mb-1 block">Answer (English)</label>
                                                        <textarea
                                                            rows={3}
                                                            value={draft.answer_en || ''}
                                                            onChange={(e) => handleChangeFAQDraft(faq.id, 'answer_en', e.target.value)}
                                                            placeholder="English Answer"
                                                            className={consoleInputClass + " w-full bg-white resize-none"}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-2 border-t border-[#e5e5df] pt-4 sm:flex-row sm:items-center sm:justify-between">
                                                <p className="text-[11px] font-bold text-gray-500">
                                                    {dirty ? '저장되지 않은 변경사항이 있습니다.' : '최신 상태입니다.'}
                                                </p>
                                                <div className="flex gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={() => setFaqDrafts(prev => {
                                                            const next = { ...prev };
                                                            delete next[faq.id];
                                                            return next;
                                                        })}
                                                        disabled={!dirty || saving}
                                                        className={consoleSecondaryButtonClass}
                                                    >
                                                        되돌리기
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleSaveFAQ(faq)}
                                                        disabled={!dirty || saving}
                                                        className={consolePrimaryButtonClass}
                                                    >
                                                        {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
                                                        {saving ? '저장 중' : 'FAQ 저장'}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                );
                            })}
                            {faqs.length === 0 && (
                                <div className="text-center py-12 text-xs font-bold text-gray-400 border border-dashed border-[#e5e5df] rounded bg-[#fbfbfa]">
                                    등록된 FAQ가 없습니다.
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <h3 className="text-sm font-black text-gray-900">공지사항 목록</h3>
                            <button
                                onClick={handleAddNotice}
                                disabled={loading}
                                className={consolePrimaryButtonClass + " px-3 py-1.5"}
                            >
                                {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin mr-1" /> : <Plus className="w-3.5 h-3.5 mr-1" />}
                                공지사항 추가
                            </button>
                        </div>

                        <div className="space-y-3 md:hidden">
                            {notices.map((notice) => {
                                const draft = getNoticeDraft(notice);
                                const dirty = isNoticeDirty(notice);
                                const saving = Boolean(savingItems[`notice:${notice.id}`]);

                                return (
                                    <div key={notice.id} className="rounded border border-[#e5e5df] bg-white p-4">
                                        <div className="space-y-3">
                                            <label className="block text-[11px] font-bold text-gray-500">
                                                제목
                                            </label>
                                            <input
                                                type="text"
                                                value={draft.title}
                                                onChange={(e) => handleChangeNoticeDraft(notice.id, 'title', e.target.value)}
                                                className={consoleInputClass + " w-full bg-white"}
                                            />
                                            <div className="grid grid-cols-2 gap-3">
                                                <label className="flex items-center gap-2 rounded border border-[#e5e5df] px-3 py-2 text-xs font-bold text-gray-700">
                                                    <input
                                                        type="checkbox"
                                                        checked={draft.is_pinned}
                                                        onChange={(e) => handleChangeNoticeDraft(notice.id, 'is_pinned', e.target.checked)}
                                                        className="w-3.5 h-3.5 text-[#111111] border-gray-300 rounded focus:ring-[#111111] accent-[#111111]"
                                                    />
                                                    고정
                                                </label>
                                                <label className="flex items-center gap-2 rounded border border-[#e5e5df] px-3 py-2 text-xs font-bold text-gray-700">
                                                    <input
                                                        type="checkbox"
                                                        checked={draft.is_active}
                                                        onChange={(e) => handleChangeNoticeDraft(notice.id, 'is_active', e.target.checked)}
                                                        className="w-3.5 h-3.5 text-[#111111] border-gray-300 rounded focus:ring-[#111111] accent-[#111111]"
                                                    />
                                                    공개
                                                </label>
                                            </div>
                                            <label className="block text-[11px] font-bold text-gray-500">
                                                본문
                                            </label>
                                            <textarea
                                                rows={6}
                                                value={draft.content}
                                                onChange={(e) => handleChangeNoticeDraft(notice.id, 'content', e.target.value)}
                                                placeholder="공지사항 본문을 입력하세요"
                                                className={consoleInputClass + " h-auto w-full resize-y bg-white py-3 leading-relaxed"}
                                            />
                                            <p className="text-[11px] font-bold text-gray-500">
                                                {dirty ? '저장되지 않은 변경사항이 있습니다.' : '최신 상태입니다.'}
                                            </p>
                                            <div className="grid grid-cols-[1fr_1fr_auto] gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => setNoticeDrafts(prev => {
                                                        const next = { ...prev };
                                                        delete next[notice.id];
                                                        return next;
                                                    })}
                                                    disabled={!dirty || saving}
                                                    className={consoleSecondaryButtonClass}
                                                >
                                                    되돌리기
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => handleSaveNotice(notice)}
                                                    disabled={!dirty || saving}
                                                    className={consolePrimaryButtonClass}
                                                >
                                                    {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
                                                    {saving ? '저장 중' : '공지 저장'}
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => handleDeleteNotice(notice.id)}
                                                    aria-label="공지사항 삭제"
                                                    className={`${consoleIconButtonClass} text-gray-400 hover:text-red-500 hover:bg-red-50 hover:border-red-100`}
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                            {notices.length === 0 && (
                                <div className="rounded border border-dashed border-[#e5e5df] bg-[#fbfbfa] px-4 py-12 text-center text-xs font-bold text-gray-400">
                                    등록된 공지사항이 없습니다.
                                </div>
                            )}
                        </div>

                        <div className="hidden overflow-x-auto border border-[#e5e5df] rounded md:block">
                            <table className="w-full text-left text-xs">
                                <thead className="bg-[#fbfbfa] border-b border-[#e5e5df]">
                                    <tr>
                                        <th className="px-4 py-3 font-bold text-gray-500">제목</th>
                                        <th className="px-4 py-3 font-bold text-gray-500 w-32">상태</th>
                                        <th className="px-4 py-3 font-bold text-gray-500 w-32">작성일</th>
                                        <th className="px-4 py-3 font-bold text-gray-500 w-20 text-right">관리</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#e5e5df] bg-white">
                                    {notices.map((notice) => {
                                        const draft = getNoticeDraft(notice);
                                        const dirty = isNoticeDirty(notice);
                                        const saving = Boolean(savingItems[`notice:${notice.id}`]);

                                        return (
                                            <Fragment key={notice.id}>
                                        <tr className="hover:bg-[#fbfbfa]">
                                            <td className="px-4 py-3">
                                                <input
                                                    type="text"
                                                    value={draft.title}
                                                    onChange={(e) => handleChangeNoticeDraft(notice.id, 'title', e.target.value)}
                                                    className="w-full bg-transparent border-none focus:ring-0 font-bold text-gray-900 p-0 placeholder-gray-300"
                                                />
                                                <p className="mt-1 line-clamp-1 text-[11px] font-medium text-gray-400">
                                                    {draft.content || '본문 없음'}
                                                </p>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-3">
                                                    <label className="flex items-center gap-1.5 cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            checked={draft.is_pinned}
                                                            onChange={(e) => handleChangeNoticeDraft(notice.id, 'is_pinned', e.target.checked)}
                                                            className="w-3.5 h-3.5 text-[#111111] border-gray-300 rounded focus:ring-[#111111] accent-[#111111]"
                                                        />
                                                        <span className="font-bold text-gray-600">고정</span>
                                                    </label>
                                                    <label className="flex items-center gap-1.5 cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            checked={draft.is_active}
                                                            onChange={(e) => handleChangeNoticeDraft(notice.id, 'is_active', e.target.checked)}
                                                            className="w-3.5 h-3.5 text-[#111111] border-gray-300 rounded focus:ring-[#111111] accent-[#111111]"
                                                        />
                                                        <span className="font-bold text-gray-600">공개</span>
                                                    </label>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-gray-400 font-medium">
                                                {formatKstDate(notice.created_at)}
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <div className="flex justify-end gap-1">
                                                    <button
                                                        type="button"
                                                        onClick={() => setExpandedNotice(expandedNotice === notice.id ? null : notice.id)}
                                                        aria-label="공지사항 본문 편집"
                                                        className={consoleIconButtonClass}
                                                    >
                                                        {expandedNotice === notice.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteNotice(notice.id)}
                                                        aria-label="공지사항 삭제"
                                                        className={`${consoleIconButtonClass} text-gray-400 hover:text-red-500 hover:bg-red-50 hover:border-red-100`}
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                        {expandedNotice === notice.id && (
                                            <tr>
                                                <td colSpan={4} className="bg-[#fbfbfa] px-4 py-4">
                                                    <div className="space-y-3">
                                                        <label className="block text-[11px] font-bold text-gray-500">
                                                            본문
                                                        </label>
                                                        <textarea
                                                            rows={5}
                                                            value={draft.content}
                                                            onChange={(e) => handleChangeNoticeDraft(notice.id, 'content', e.target.value)}
                                                            placeholder="공지사항 본문을 입력하세요"
                                                            className={consoleInputClass + " h-auto w-full resize-y bg-white py-3 leading-relaxed"}
                                                        />
                                                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                                            <p className="text-[11px] font-bold text-gray-500">
                                                                {dirty ? '저장되지 않은 변경사항이 있습니다.' : '최신 상태입니다.'}
                                                            </p>
                                                            <div className="flex gap-2">
                                                                <button
                                                                    type="button"
                                                                    onClick={() => setNoticeDrafts(prev => {
                                                                        const next = { ...prev };
                                                                        delete next[notice.id];
                                                                        return next;
                                                                    })}
                                                                    disabled={!dirty || saving}
                                                                    className={consoleSecondaryButtonClass}
                                                                >
                                                                    되돌리기
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleSaveNotice(notice)}
                                                                    disabled={!dirty || saving}
                                                                    className={consolePrimaryButtonClass}
                                                                >
                                                                    {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
                                                                    {saving ? '저장 중' : '공지 저장'}
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                            </Fragment>
                                        );
                                    })}
                                    {notices.length === 0 && (
                                        <tr>
                                            <td colSpan={4} className="px-4 py-12 text-center font-bold text-gray-400 bg-[#fbfbfa]">
                                                등록된 공지사항이 없습니다.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </ConsolePanel>
        </div >
    );
}

'use client';

import { Fragment, useState } from 'react';
import { Plus, Trash2, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';
import { createFaq, updateFaq, deleteFaq } from '@/app/actions/faq-actions';
import { createNotice, updateNotice, deleteNotice } from '@/app/actions/notice-actions';
import { useUnsavedChangesWarning } from '@/hooks/useUnsavedChangesWarning';
import { useCrudDraftList } from './useCrudDraftList';
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
    const [loading, setLoading] = useState(false);
    const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
    const [expandedNotice, setExpandedNotice] = useState<string | null>(null);

    // F38: FAQ + Notice share one create/edit/save/delete + draft-dirty lifecycle
    // via useCrudDraftList; only the entity-specific payloads, dirty fields, and
    // copy differ.
    const faqList = useCrudDraftList<
        FAQ,
        Parameters<typeof createFaq>[0],
        Parameters<typeof updateFaq>[1],
        NonNullable<Awaited<ReturnType<typeof createFaq>>['data']>
    >(
        initialFAQs,
        {
            getId: (faq) => faq.id,
            createAction: createFaq,
            updateAction: updateFaq,
            deleteAction: deleteFaq,
            insertPosition: 'end',
            savingKeyPrefix: 'faq',
            setLoading,
            onAdded: (id) => setExpandedFaq(id),
            buildCreateInput: (items) => ({
                question_ko: '새 질문',
                answer_ko: '내용을 입력하세요.',
                question_en: 'New Question',
                answer_en: 'Enter content here.',
                order_index: items.length,
            }),
            buildUpdateInput: (draft) => ({
                question_ko: draft.question_ko,
                answer_ko: draft.answer_ko,
                question_en: draft.question_en,
                answer_en: draft.answer_en,
            }),
            isDirty: (faq, draft) => (
                draft.question_ko !== faq.question_ko ||
                draft.answer_ko !== faq.answer_ko ||
                (draft.question_en || '') !== (faq.question_en || '') ||
                (draft.answer_en || '') !== (faq.answer_en || '')
            ),
            messages: {
                addSuccess: 'FAQ가 추가되었습니다.',
                addError: 'FAQ 추가 실패',
                saveSuccess: 'FAQ가 저장되었습니다.',
                saveError: 'FAQ 저장 실패',
                saveErrorUnexpected: 'FAQ 저장 중 오류가 발생했습니다.',
                deleteConfirm: '이 FAQ를 삭제하시겠습니까?',
                deleteConfirmLabel: '삭제',
                deleteSuccess: 'FAQ가 삭제되었습니다.',
                genericError: '오류가 발생했습니다.',
            },
        }
    );

    const noticeList = useCrudDraftList<
        Notice,
        Parameters<typeof createNotice>[0],
        Parameters<typeof updateNotice>[1],
        NonNullable<Awaited<ReturnType<typeof createNotice>>['data']>
    >(
        initialNotices,
        {
            getId: (notice) => notice.id,
            createAction: createNotice,
            updateAction: updateNotice,
            deleteAction: deleteNotice,
            insertPosition: 'start',
            savingKeyPrefix: 'notice',
            setLoading,
            onAdded: (id) => setExpandedNotice(id),
            buildCreateInput: () => ({
                title: '새 공지사항',
                content: '내용을 입력하세요.',
                is_pinned: false,
                is_active: true,
            }),
            buildUpdateInput: (draft) => ({
                title: draft.title,
                content: draft.content,
                is_pinned: draft.is_pinned,
                is_active: draft.is_active,
            }),
            isDirty: (notice, draft) => (
                draft.title !== notice.title ||
                draft.content !== notice.content ||
                draft.is_pinned !== notice.is_pinned ||
                draft.is_active !== notice.is_active
            ),
            messages: {
                addSuccess: '공지사항이 추가되었습니다.',
                addError: '공지사항 생성에 실패했습니다.',
                saveSuccess: '공지사항이 저장되었습니다.',
                saveError: '공지사항 저장 실패',
                saveErrorUnexpected: '공지사항 저장 중 오류가 발생했습니다.',
                deleteConfirm: '이 공지사항을 삭제하시겠습니까?',
                deleteConfirmLabel: '삭제',
                deleteSuccess: '공지사항이 삭제되었습니다.',
                genericError: '오류가 발생했습니다.',
            },
        }
    );

    const faqs = faqList.items;
    const notices = noticeList.items;

    // F41: dirty whenever any FAQ or notice has an unsaved in-progress draft edit.
    const hasUnsavedChanges = faqList.isAnyDirty || noticeList.isAnyDirty;
    useUnsavedChangesWarning(hasUnsavedChanges);

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
                    <div className="bg-admin-ink rounded-[9px] p-4 overflow-x-auto">
                        <pre className="text-[11px] text-[#e4e4e7] font-mono leading-relaxed">
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
            <div className="border-b border-admin-line">
                <nav className="-mb-px flex space-x-6 px-1">
                    <button
                        onClick={() => setActiveTab('faq')}
                        className={`py-3 border-b-2 font-bold text-xs transition-colors ${activeTab === 'faq'
                            ? 'border-admin-accent text-admin-accent'
                            : 'border-transparent text-admin-muted hover:text-admin-ink'
                            }`}
                    >
                        FAQ 관리
                    </button>
                    <button
                        onClick={() => setActiveTab('notices')}
                        className={`py-3 border-b-2 font-bold text-xs transition-colors ${activeTab === 'notices'
                            ? 'border-admin-accent text-admin-accent'
                            : 'border-transparent text-admin-muted hover:text-admin-ink'
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
                            <h3 className="text-sm font-black text-admin-ink">FAQ 목록</h3>
                            <button
                                onClick={faqList.add}
                                disabled={loading}
                                className={consolePrimaryButtonClass + " px-3 py-1.5"}
                            >
                                {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin mr-1" /> : <Plus className="w-3.5 h-3.5 mr-1" />}
                                FAQ 추가
                            </button>
                        </div>

                        <div className="space-y-3">
                            {faqs.map((faq) => {
                                const draft = faqList.getDraft(faq);
                                const dirty = faqList.isItemDirty(faq);
                                const saving = faqList.isSaving(faq);

                                return (
                                    <div key={faq.id} className="border border-admin-line bg-white rounded-[11px] overflow-hidden">
                                    <div
                                        className="flex items-center justify-between p-4 cursor-pointer hover:bg-[#fafafb] transition-colors"
                                        onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                                    >
                                        <div className="flex-1 mr-4">
                                            <div className="font-bold text-sm text-admin-ink">
                                                {faq.question_ko}
                                            </div>
                                            <div className="text-[11px] font-medium text-[#a1a1aa] mt-0.5">
                                                {faq.question_en || '(No English Question)'}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    faqList.remove(faq.id);
                                                }}
                                                aria-label="FAQ 삭제"
                                                className={`${consoleIconButtonClass} text-[#a1a1aa] hover:text-red-500 hover:bg-red-50`}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                            {expandedFaq === faq.id ? <ChevronUp className="w-4 h-4 text-[#a1a1aa]" /> : <ChevronDown className="w-4 h-4 text-[#a1a1aa]" />}
                                        </div>
                                    </div>

                                    {expandedFaq === faq.id && (
                                        <div className="p-4 border-t border-admin-line bg-[#fafafb] space-y-6">
                                            {/* Primary Korean Section */}
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-2 border-l-2 border-admin-accent pl-2">
                                                    <h4 className="text-xs font-black text-admin-ink">국문 정보 (필수)</h4>
                                                </div>
                                                <div className="grid grid-cols-1 gap-3">
                                                    <div>
                                                        <label className="text-[11px] font-bold text-admin-muted mb-1 block">질문 (Korean)</label>
                                                        <input
                                                            type="text"
                                                            value={draft.question_ko}
                                                            onChange={(e) => faqList.changeDraft(faq.id, 'question_ko', e.target.value)}
                                                            placeholder="질문을 입력하세요"
                                                            className={consoleInputClass + " w-full bg-white"}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="text-[11px] font-bold text-admin-muted mb-1 block">답변 (Korean)</label>
                                                        <textarea
                                                            rows={3}
                                                            value={draft.answer_ko}
                                                            onChange={(e) => faqList.changeDraft(faq.id, 'answer_ko', e.target.value)}
                                                            placeholder="답변 내용을 입력하세요"
                                                            className={consoleInputClass + " w-full bg-white resize-none"}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Secondary English Section */}
                                            <div className="space-y-3 pt-4 border-t border-admin-line">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2 border-l-2 border-admin-line-2 pl-2">
                                                        <h4 className="text-xs font-bold text-[#52525b]">영문 정보 (선택)</h4>
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 opacity-70 hover:opacity-100 transition-opacity">
                                                    <div>
                                                        <label className="text-[11px] font-bold text-admin-muted mb-1 block">Question (English)</label>
                                                        <input
                                                            type="text"
                                                            value={draft.question_en || ''}
                                                            onChange={(e) => faqList.changeDraft(faq.id, 'question_en', e.target.value)}
                                                            placeholder="English Question"
                                                            className={consoleInputClass + " w-full bg-white"}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="text-[11px] font-bold text-admin-muted mb-1 block">Answer (English)</label>
                                                        <textarea
                                                            rows={3}
                                                            value={draft.answer_en || ''}
                                                            onChange={(e) => faqList.changeDraft(faq.id, 'answer_en', e.target.value)}
                                                            placeholder="English Answer"
                                                            className={consoleInputClass + " w-full bg-white resize-none"}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-2 border-t border-admin-line pt-4 sm:flex-row sm:items-center sm:justify-between">
                                                <p className="text-[11px] font-bold text-admin-muted">
                                                    {dirty ? '저장되지 않은 변경사항이 있습니다.' : '최신 상태입니다.'}
                                                </p>
                                                <div className="flex gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={() => faqList.resetDraft(faq.id)}
                                                        disabled={!dirty || saving}
                                                        className={consoleSecondaryButtonClass}
                                                    >
                                                        되돌리기
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => faqList.save(faq)}
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
                                <div className="text-center py-12 text-xs font-bold text-[#a1a1aa] border border-dashed border-admin-line-2 rounded-[11px] bg-[#fafafb]">
                                    등록된 FAQ가 없습니다.
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <h3 className="text-sm font-black text-admin-ink">공지사항 목록</h3>
                            <button
                                onClick={noticeList.add}
                                disabled={loading}
                                className={consolePrimaryButtonClass + " px-3 py-1.5"}
                            >
                                {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin mr-1" /> : <Plus className="w-3.5 h-3.5 mr-1" />}
                                공지사항 추가
                            </button>
                        </div>

                        <div className="space-y-3 md:hidden">
                            {notices.map((notice) => {
                                const draft = noticeList.getDraft(notice);
                                const dirty = noticeList.isItemDirty(notice);
                                const saving = noticeList.isSaving(notice);

                                return (
                                    <div key={notice.id} className="rounded-[11px] border border-admin-line bg-white p-4">
                                        <div className="space-y-3">
                                            <label className="block text-[11px] font-bold text-admin-muted">
                                                제목
                                            </label>
                                            <input
                                                type="text"
                                                value={draft.title}
                                                onChange={(e) => noticeList.changeDraft(notice.id, 'title', e.target.value)}
                                                className={consoleInputClass + " w-full bg-white"}
                                            />
                                            <div className="grid grid-cols-2 gap-3">
                                                <label className="flex items-center gap-2 rounded-[9px] border border-admin-line-2 px-3 py-2 text-xs font-bold text-[#3f3f46]">
                                                    <input
                                                        type="checkbox"
                                                        checked={draft.is_pinned}
                                                        onChange={(e) => noticeList.changeDraft(notice.id, 'is_pinned', e.target.checked)}
                                                        className="w-3.5 h-3.5 text-admin-accent border-admin-line-2 rounded focus:ring-admin-accent accent-admin-accent"
                                                    />
                                                    고정
                                                </label>
                                                <label className="flex items-center gap-2 rounded-[9px] border border-admin-line-2 px-3 py-2 text-xs font-bold text-[#3f3f46]">
                                                    <input
                                                        type="checkbox"
                                                        checked={draft.is_active}
                                                        onChange={(e) => noticeList.changeDraft(notice.id, 'is_active', e.target.checked)}
                                                        className="w-3.5 h-3.5 text-admin-accent border-admin-line-2 rounded focus:ring-admin-accent accent-admin-accent"
                                                    />
                                                    공개
                                                </label>
                                            </div>
                                            <label className="block text-[11px] font-bold text-admin-muted">
                                                본문
                                            </label>
                                            <textarea
                                                rows={6}
                                                value={draft.content}
                                                onChange={(e) => noticeList.changeDraft(notice.id, 'content', e.target.value)}
                                                placeholder="공지사항 본문을 입력하세요"
                                                className={consoleInputClass + " h-auto w-full resize-y bg-white py-3 leading-relaxed"}
                                            />
                                            <p className="text-[11px] font-bold text-admin-muted">
                                                {dirty ? '저장되지 않은 변경사항이 있습니다.' : '최신 상태입니다.'}
                                            </p>
                                            <div className="grid grid-cols-[1fr_1fr_auto] gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => noticeList.resetDraft(notice.id)}
                                                    disabled={!dirty || saving}
                                                    className={consoleSecondaryButtonClass}
                                                >
                                                    되돌리기
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => noticeList.save(notice)}
                                                    disabled={!dirty || saving}
                                                    className={consolePrimaryButtonClass}
                                                >
                                                    {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
                                                    {saving ? '저장 중' : '공지 저장'}
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => noticeList.remove(notice.id)}
                                                    aria-label="공지사항 삭제"
                                                    className={`${consoleIconButtonClass} text-[#a1a1aa] hover:text-red-500 hover:bg-red-50 hover:border-red-100`}
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                            {notices.length === 0 && (
                                <div className="rounded-[11px] border border-dashed border-admin-line-2 bg-[#fafafb] px-4 py-12 text-center text-xs font-bold text-[#a1a1aa]">
                                    등록된 공지사항이 없습니다.
                                </div>
                            )}
                        </div>

                        <div className="hidden overflow-x-auto border border-admin-line rounded-[11px] md:block">
                            <table className="w-full text-left text-xs">
                                <thead className="bg-[#fafafb] border-b border-admin-line">
                                    <tr>
                                        <th className="px-4 py-3 font-bold text-admin-muted">제목</th>
                                        <th className="px-4 py-3 font-bold text-admin-muted w-32">상태</th>
                                        <th className="px-4 py-3 font-bold text-admin-muted w-32">작성일</th>
                                        <th className="px-4 py-3 font-bold text-admin-muted w-20 text-right">관리</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-admin-line bg-white">
                                    {notices.map((notice) => {
                                        const draft = noticeList.getDraft(notice);
                                        const dirty = noticeList.isItemDirty(notice);
                                        const saving = noticeList.isSaving(notice);

                                        return (
                                            <Fragment key={notice.id}>
                                        <tr className="hover:bg-[#fafafb]">
                                            <td className="px-4 py-3">
                                                <input
                                                    type="text"
                                                    value={draft.title}
                                                    onChange={(e) => noticeList.changeDraft(notice.id, 'title', e.target.value)}
                                                    className="w-full bg-transparent border-none focus:ring-0 font-bold text-admin-ink p-0 placeholder-[#d4d4d8]"
                                                />
                                                <p className="mt-1 line-clamp-1 text-[11px] font-medium text-[#a1a1aa]">
                                                    {draft.content || '본문 없음'}
                                                </p>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-3">
                                                    <label className="flex items-center gap-1.5 cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            checked={draft.is_pinned}
                                                            onChange={(e) => noticeList.changeDraft(notice.id, 'is_pinned', e.target.checked)}
                                                            className="w-3.5 h-3.5 text-admin-accent border-admin-line-2 rounded focus:ring-admin-accent accent-admin-accent"
                                                        />
                                                        <span className="font-bold text-[#52525b]">고정</span>
                                                    </label>
                                                    <label className="flex items-center gap-1.5 cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            checked={draft.is_active}
                                                            onChange={(e) => noticeList.changeDraft(notice.id, 'is_active', e.target.checked)}
                                                            className="w-3.5 h-3.5 text-admin-accent border-admin-line-2 rounded focus:ring-admin-accent accent-admin-accent"
                                                        />
                                                        <span className="font-bold text-[#52525b]">공개</span>
                                                    </label>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-[#a1a1aa] font-medium">
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
                                                        onClick={() => noticeList.remove(notice.id)}
                                                        aria-label="공지사항 삭제"
                                                        className={`${consoleIconButtonClass} text-[#a1a1aa] hover:text-red-500 hover:bg-red-50 hover:border-red-100`}
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                        {expandedNotice === notice.id && (
                                            <tr>
                                                <td colSpan={4} className="bg-[#fafafb] px-4 py-4">
                                                    <div className="space-y-3">
                                                        <label className="block text-[11px] font-bold text-admin-muted">
                                                            본문
                                                        </label>
                                                        <textarea
                                                            rows={5}
                                                            value={draft.content}
                                                            onChange={(e) => noticeList.changeDraft(notice.id, 'content', e.target.value)}
                                                            placeholder="공지사항 본문을 입력하세요"
                                                            className={consoleInputClass + " h-auto w-full resize-y bg-white py-3 leading-relaxed"}
                                                        />
                                                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                                            <p className="text-[11px] font-bold text-admin-muted">
                                                                {dirty ? '저장되지 않은 변경사항이 있습니다.' : '최신 상태입니다.'}
                                                            </p>
                                                            <div className="flex gap-2">
                                                                <button
                                                                    type="button"
                                                                    onClick={() => noticeList.resetDraft(notice.id)}
                                                                    disabled={!dirty || saving}
                                                                    className={consoleSecondaryButtonClass}
                                                                >
                                                                    되돌리기
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => noticeList.save(notice)}
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
                                            <td colSpan={4} className="px-4 py-12 text-center font-bold text-[#a1a1aa] bg-[#fafafb]">
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

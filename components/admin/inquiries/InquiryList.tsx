'use client';

import { useState } from 'react';
import {
    Search, Filter, Mail, Phone, Calendar,
    CheckCircle2, Clock, MessageSquare, Trash2,
    MoreHorizontal, X
} from 'lucide-react';
import { toast } from 'sonner';
import { updateInquiryStatus, deleteInquiry, replyToInquiry } from '@/app/actions/inquiry-actions';
import {
    ConsolePanel,
    ConsoleSectionTitle,
    ConsoleStatusPill,
    consoleInputClass,
    consolePrimaryButtonClass,
    consoleSecondaryButtonClass,
    consoleIconButtonClass
} from '@/components/admin/ConsolePrimitives';

interface Inquiry {
    id: string;
    category: string | null;
    name: string;
    email: string;
    phone: string | null;
    message: string;
    status: 'new' | 'read' | 'replied';
    reply_content: string | null;
    replied_at: string | null;
    created_at: string;
}

function formatKstDateTime(value: string, mode: 'short' | 'long' = 'short') {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return '-';

    const kstDate = new Date(date.getTime() + 9 * 60 * 60 * 1000);
    const year = kstDate.getUTCFullYear();
    const month = String(kstDate.getUTCMonth() + 1).padStart(2, '0');
    const day = String(kstDate.getUTCDate()).padStart(2, '0');
    const hours = String(kstDate.getUTCHours()).padStart(2, '0');
    const minutes = String(kstDate.getUTCMinutes()).padStart(2, '0');

    if (mode === 'long') {
        return `${year}년 ${month}월 ${day}일 ${hours}:${minutes}`;
    }

    return `${month}.${day} ${hours}:${minutes}`;
}

export default function InquiryList({ initialInquiries }: { initialInquiries: Inquiry[] }) {
    const [inquiries, setInquiries] = useState<Inquiry[]>(initialInquiries);
    const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
    const [filterStatus, setFilterStatus] = useState<string>('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [replyText, setReplyText] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [pendingIds, setPendingIds] = useState<Record<string, boolean>>({});

    const setInquiryPending = (id: string, value: boolean) => {
        setPendingIds(prev => ({ ...prev, [id]: value }));
    };

    const filteredInquiries = inquiries.filter(inquiry => {
        const matchesStatus = filterStatus === 'all' || inquiry.status === filterStatus;
        const matchesSearch =
            inquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            inquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            inquiry.message.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    const handleStatusChange = async (id: string, newStatus: 'new' | 'read' | 'replied') => {
        if (pendingIds[id]) return;

        const previousInquiries = inquiries;
        const previousSelectedInquiry = selectedInquiry;
        setInquiryPending(id, true);

        setInquiries(previousInquiries.map(i => i.id === id ? { ...i, status: newStatus } : i));
        if (selectedInquiry?.id === id) {
            setSelectedInquiry({ ...selectedInquiry, status: newStatus });
        }

        try {
            const result = await updateInquiryStatus(id, newStatus);
            if (!result.success) {
                throw new Error(result.message || '상태 업데이트 실패');
            }
        } catch (error) {
            console.error('Failed to update status:', error);
            setInquiries(previousInquiries);
            setSelectedInquiry(current => current?.id === id ? previousSelectedInquiry : current);
            toast.error('문의 상태를 저장하지 못했습니다. 이전 상태로 복구했습니다.');
        } finally {
            setInquiryPending(id, false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('정말 삭제하시겠습니까?')) return;

        const previousInquiries = inquiries;
        const previousSelectedInquiry = selectedInquiry;
        setInquiryPending(id, true);

        setInquiries(previousInquiries.filter(i => i.id !== id));
        if (selectedInquiry?.id === id) {
            setSelectedInquiry(null);
        }

        try {
            const result = await deleteInquiry(id);
            if (!result.success) {
                throw new Error(result.message || '문의 삭제 실패');
            }
            toast.success('문의가 삭제되었습니다.');
        } catch (error) {
            console.error('Failed to delete inquiry:', error);
            setInquiries(previousInquiries);
            setSelectedInquiry(previousSelectedInquiry);
            toast.error('삭제 중 오류가 발생했습니다. 이전 상태로 복구했습니다.');
        } finally {
            setInquiryPending(id, false);
        }
    };

    const handleSaveReply = async () => {
        if (!selectedInquiry || !replyText.trim()) return;

        setIsSending(true);
        try {
            const result = await replyToInquiry(selectedInquiry.id, replyText);
            if (!result.success) {
                throw new Error(result.message || '답변 등록 실패');
            }

            const updatedInquiry: Inquiry = {
                ...selectedInquiry,
                status: 'replied',
                reply_content: replyText,
                replied_at: new Date().toISOString()
            };

            setInquiries(inquiries.map(i => i.id === selectedInquiry.id ? updatedInquiry : i));
            setSelectedInquiry(updatedInquiry);
            setReplyText('');
            toast.success('답변이 저장되었습니다.');
        } catch (error) {
            console.error('Failed to save reply:', error);
            toast.error('답변 저장에 실패했습니다.');
        } finally {
            setIsSending(false);
        }
    };

    const handleSendEmail = () => {
        if (!selectedInquiry) return;

        const subject = `[Weet] ${selectedInquiry.name}님 문의에 대한 답변입니다.`;
        const body = selectedInquiry.reply_content || replyText || '';

        window.location.href = `mailto:${selectedInquiry.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    };

    const getStatusTone = (status: string) => {
        switch (status) {
            case 'new': return 'danger';
            case 'replied': return 'success';
            default: return 'neutral';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'new': return '신규';
            case 'read': return '읽음';
            case 'replied': return '답변완료';
            default: return status;
        }
    };

    return (
        <div className="flex h-[calc(100vh-120px)] gap-6">
            {/* Left: List */}
            <div className={`flex-1 flex flex-col bg-white rounded-md border border-[#e5e5df] overflow-hidden ${selectedInquiry ? 'hidden md:flex' : 'flex'}`}>
                {/* Search & Filter */}
                <div className="p-4 border-b border-[#e5e5df] space-y-3 bg-[#fbfbfa]">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="이름, 이메일, 내용 검색..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className={`${consoleInputClass} w-full pl-9`}
                        />
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-1">
                        {['all', 'new', 'read', 'replied'].map((status) => (
                            <button
                                key={status}
                                onClick={() => setFilterStatus(status)}
                                className={`px-3 py-1.5 rounded text-xs font-bold whitespace-nowrap transition-colors ${filterStatus === status
                                    ? 'bg-[#111111] text-white'
                                    : 'bg-white border border-[#e5e5df] text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                {status === 'all' ? '전체' : getStatusLabel(status)}
                            </button>
                        ))}
                    </div>
                </div>

                {/* List Items */}
                <div className="flex-1 overflow-y-auto divide-y divide-[#e5e5df]">
                    {filteredInquiries.map((inquiry) => (
                        <div
                            key={inquiry.id}
                            onClick={() => {
                                    setSelectedInquiry(inquiry);
                                    setReplyText(inquiry.reply_content || '');
                                if (inquiry.status === 'new' && !pendingIds[inquiry.id]) {
                                    handleStatusChange(inquiry.id, 'read');
                                }
                            }}
                            className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${pendingIds[inquiry.id] ? 'pointer-events-none opacity-70' : ''} ${selectedInquiry?.id === inquiry.id ? 'bg-[#f4f4f1] hover:bg-[#f4f4f1]' : ''
                                }`}
                        >
                            <div className="flex justify-between items-start mb-1">
                                <h3 className={`text-sm ${inquiry.status === 'new' ? 'font-black text-gray-900' : 'font-bold text-gray-700'}`}>
                                    {inquiry.name}
                                </h3>
                                <span className="text-[11px] text-gray-400 whitespace-nowrap ml-2">
                                    {formatKstDateTime(inquiry.created_at)}
                                </span>
                            </div>
                            <p className="text-[13px] text-gray-500 line-clamp-2 mb-3 leading-relaxed">{inquiry.message}</p>
                            <div className="flex items-center gap-2">
                                <ConsoleStatusPill tone={getStatusTone(inquiry.status) as any}>
                                    {getStatusLabel(inquiry.status)}
                                </ConsoleStatusPill>
                            </div>
                        </div>
                    ))}
                    {filteredInquiries.length === 0 && (
                        <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                            <MessageSquare className="w-6 h-6 mb-3 opacity-20" />
                            <p className="text-xs font-bold">조회된 문의가 없습니다.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Right: Detail View */}
            {selectedInquiry ? (
                <div className="flex-[1.5] bg-white rounded-md border border-[#e5e5df] overflow-hidden flex flex-col absolute inset-0 z-50 md:static md:inset-auto">
                    {/* Header */}
                    <div className="p-5 border-b border-[#e5e5df] flex justify-between items-start bg-[#fbfbfa]">
                        <div>
                            <div className="flex items-center gap-3 mb-3">
                                <h2 className="text-lg font-black text-gray-900">{selectedInquiry.name}</h2>
                                <ConsoleStatusPill tone={getStatusTone(selectedInquiry.status) as any}>
                                    {getStatusLabel(selectedInquiry.status)}
                                </ConsoleStatusPill>
                            </div>
                            <div className="flex flex-col gap-1.5 text-xs font-medium text-gray-500">
                                <div className="flex items-center gap-2">
                                    <Mail className="w-3.5 h-3.5" />
                                    <a href={`mailto:${selectedInquiry.email}`} className="hover:text-gray-900 transition-colors">
                                        {selectedInquiry.email}
                                    </a>
                                </div>
                                {selectedInquiry.phone && (
                                    <div className="flex items-center gap-2">
                                        <Phone className="w-3.5 h-3.5" />
                                        <a href={`tel:${selectedInquiry.phone}`} className="hover:text-gray-900 transition-colors">
                                            {selectedInquiry.phone}
                                        </a>
                                    </div>
                                )}
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-3.5 h-3.5" />
                                    <span>{formatKstDateTime(selectedInquiry.created_at, 'long')}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setSelectedInquiry(null)}
                                className={`${consoleIconButtonClass} md:hidden`}
                            >
                                <X className="w-4 h-4 text-gray-500" />
                            </button>
                            <button
                                onClick={() => handleDelete(selectedInquiry.id)}
                                disabled={Boolean(pendingIds[selectedInquiry.id])}
                                className={`${consoleIconButtonClass} text-red-600 hover:text-red-700 hover:bg-red-50 hover:border-red-200`}
                                title="삭제"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-5 overflow-y-auto bg-white">
                        <ConsoleSectionTitle>문의 내용</ConsoleSectionTitle>
                        <div className="p-4 rounded-md border border-[#e5e5df] bg-[#fbfbfa] min-h-[120px] mb-6 mt-3">
                            <p className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">
                                {selectedInquiry.message}
                            </p>
                        </div>

                        {/* Reply Section */}
                        <div className="flex items-center justify-between mb-3">
                            <ConsoleSectionTitle>답변 작성</ConsoleSectionTitle>
                            {selectedInquiry.replied_at && (
                                <span className="text-[11px] font-bold text-gray-400">
                                    최근 답변: {formatKstDateTime(selectedInquiry.replied_at)}
                                </span>
                            )}
                        </div>
                        <div className="p-4 rounded-md border border-[#e5e5df] bg-[#f4f4f1]">
                            <textarea
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                className="w-full h-32 p-3 border border-[#d8d8d2] rounded bg-white text-sm focus:outline-none focus:border-[#111111] focus:ring-1 focus:ring-[#111111] resize-none mb-4"
                                placeholder="답변 내용을 입력하세요..."
                            />
                            <div className="flex justify-end gap-2">
                                <button
                                    onClick={handleSendEmail}
                                    className={consoleSecondaryButtonClass}
                                >
                                    <Mail className="w-3.5 h-3.5 mr-1" />
                                    메일 앱 열기
                                </button>
                                <button
                                    onClick={handleSaveReply}
                                    disabled={isSending || !replyText.trim()}
                                    className={consolePrimaryButtonClass}
                                >
                                    <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                                    {isSending ? '저장 중...' : '답변 저장 및 완료 처리'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="hidden md:flex flex-[1.5] items-center justify-center bg-[#fbfbfa] rounded-md border border-[#e5e5df] text-gray-400 flex-col gap-3">
                    <MessageSquare className="w-8 h-8 opacity-20" />
                    <p className="text-xs font-bold text-gray-500">문의 내역을 선택하여 상세 내용을 확인하세요.</p>
                </div>
            )}
        </div>
    );
}

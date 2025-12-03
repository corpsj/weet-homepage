'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import {
    Search, Filter, Mail, Phone, Calendar,
    CheckCircle2, Clock, MessageSquare, Trash2,
    MoreHorizontal, X
} from 'lucide-react';
import { updateInquiryStatus, deleteInquiry } from '@/app/actions/inquiry-actions';

interface Inquiry {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    message: string;
    status: 'new' | 'read' | 'replied';
    created_at: string;
}

export default function InquiryList({ initialInquiries }: { initialInquiries: Inquiry[] }) {
    const [inquiries, setInquiries] = useState<Inquiry[]>(initialInquiries);
    const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
    const [filterStatus, setFilterStatus] = useState<string>('all');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredInquiries = inquiries.filter(inquiry => {
        const matchesStatus = filterStatus === 'all' || inquiry.status === filterStatus;
        const matchesSearch =
            inquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            inquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            inquiry.message.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    const handleStatusChange = async (id: string, newStatus: 'new' | 'read' | 'replied') => {
        // Optimistic update
        setInquiries(inquiries.map(i => i.id === id ? { ...i, status: newStatus } : i));
        if (selectedInquiry?.id === id) {
            setSelectedInquiry({ ...selectedInquiry, status: newStatus });
        }

        try {
            await updateInquiryStatus(id, newStatus);
        } catch (error) {
            console.error('Failed to update status:', error);
            // Revert on error would be better
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('정말 삭제하시겠습니까?')) return;

        // Optimistic update
        setInquiries(inquiries.filter(i => i.id !== id));
        if (selectedInquiry?.id === id) {
            setSelectedInquiry(null);
        }

        try {
            await deleteInquiry(id);
        } catch (error) {
            console.error('Failed to delete inquiry:', error);
            alert('삭제 중 오류가 발생했습니다.');
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'new': return 'bg-blue-100 text-blue-700';
            case 'read': return 'bg-gray-100 text-gray-700';
            case 'replied': return 'bg-green-100 text-green-700';
            default: return 'bg-gray-100 text-gray-700';
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
            <div className={`flex-1 flex flex-col bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden ${selectedInquiry ? 'hidden md:flex' : 'flex'}`}>
                {/* Search & Filter */}
                <div className="p-4 border-b border-gray-200 space-y-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="이름, 이메일, 내용 검색..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black/5"
                        />
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-1">
                        {['all', 'new', 'read', 'replied'].map((status) => (
                            <button
                                key={status}
                                onClick={() => setFilterStatus(status)}
                                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${filterStatus === status
                                        ? 'bg-black text-white'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                {status === 'all' ? '전체' : getStatusLabel(status)}
                            </button>
                        ))}
                    </div>
                </div>

                {/* List Items */}
                <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
                    {filteredInquiries.map((inquiry) => (
                        <div
                            key={inquiry.id}
                            onClick={() => {
                                setSelectedInquiry(inquiry);
                                if (inquiry.status === 'new') {
                                    handleStatusChange(inquiry.id, 'read');
                                }
                            }}
                            className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${selectedInquiry?.id === inquiry.id ? 'bg-blue-50 hover:bg-blue-50' : ''
                                }`}
                        >
                            <div className="flex justify-between items-start mb-1">
                                <h3 className={`font-medium text-sm ${inquiry.status === 'new' ? 'text-black font-bold' : 'text-gray-900'}`}>
                                    {inquiry.name}
                                </h3>
                                <span className="text-xs text-gray-400 whitespace-nowrap ml-2">
                                    {format(new Date(inquiry.created_at), 'MM.dd HH:mm')}
                                </span>
                            </div>
                            <p className="text-sm text-gray-600 line-clamp-2 mb-2">{inquiry.message}</p>
                            <div className="flex items-center gap-2">
                                <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${getStatusColor(inquiry.status)}`}>
                                    {getStatusLabel(inquiry.status)}
                                </span>
                            </div>
                        </div>
                    ))}
                    {filteredInquiries.length === 0 && (
                        <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                            <MessageSquare className="w-8 h-8 mb-2 opacity-20" />
                            <p className="text-sm">문의 내역이 없습니다.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Right: Detail View */}
            {selectedInquiry ? (
                <div className="flex-[1.5] bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col absolute inset-0 z-50 md:static md:inset-auto">
                    {/* Header */}
                    <div className="p-6 border-b border-gray-100 flex justify-between items-start bg-white">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <h2 className="text-xl font-bold text-gray-900">{selectedInquiry.name}</h2>
                                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedInquiry.status)}`}>
                                    {getStatusLabel(selectedInquiry.status)}
                                </span>
                            </div>
                            <div className="flex flex-col gap-1 text-sm text-gray-500">
                                <div className="flex items-center gap-2">
                                    <Mail className="w-4 h-4" />
                                    <a href={`mailto:${selectedInquiry.email}`} className="hover:text-blue-600 hover:underline">
                                        {selectedInquiry.email}
                                    </a>
                                </div>
                                {selectedInquiry.phone && (
                                    <div className="flex items-center gap-2">
                                        <Phone className="w-4 h-4" />
                                        <a href={`tel:${selectedInquiry.phone}`} className="hover:text-blue-600 hover:underline">
                                            {selectedInquiry.phone}
                                        </a>
                                    </div>
                                )}
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    <span>{format(new Date(selectedInquiry.created_at), 'yyyy년 MM월 dd일 HH:mm', { locale: ko })}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setSelectedInquiry(null)}
                                className="md:hidden p-2 hover:bg-gray-100 rounded-full"
                            >
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                            <button
                                onClick={() => handleDelete(selectedInquiry.id)}
                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="삭제"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-8 overflow-y-auto bg-gray-50/50">
                        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm min-h-[200px]">
                            <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
                                {selectedInquiry.message}
                            </p>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="p-4 border-t border-gray-200 bg-white flex justify-end gap-3">
                        {selectedInquiry.status !== 'replied' && (
                            <button
                                onClick={() => handleStatusChange(selectedInquiry.id, 'replied')}
                                className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
                            >
                                <CheckCircle2 className="w-4 h-4" />
                                답변 완료 처리
                            </button>
                        )}
                        {selectedInquiry.status === 'replied' && (
                            <button
                                onClick={() => handleStatusChange(selectedInquiry.id, 'read')}
                                className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                            >
                                <Clock className="w-4 h-4" />
                                읽음 상태로 변경
                            </button>
                        )}
                    </div>
                </div>
            ) : (
                <div className="hidden md:flex flex-[1.5] items-center justify-center bg-gray-50 rounded-xl border border-gray-200 border-dashed text-gray-400 flex-col gap-3">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                        <MessageSquare className="w-8 h-8 opacity-50" />
                    </div>
                    <p>문의 내용을 확인하려면 목록에서 선택하세요.</p>
                </div>
            )}
        </div>
    );
}

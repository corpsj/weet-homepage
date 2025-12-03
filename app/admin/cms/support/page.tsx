'use client';

import { useState } from 'react';
import { Save, Plus, ChevronDown, ChevronUp, MoreVertical } from 'lucide-react';

export default function CMSSupportPage() {
    const [activeTab, setActiveTab] = useState('faq');

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">고객지원 관리</h2>
                    <p className="text-gray-500 text-sm mt-1">FAQ 및 공지사항을 관리합니다.</p>
                </div>
                <button className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    변경사항 저장
                </button>
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
                        FAQ (자주 묻는 질문)
                    </button>
                    <button
                        onClick={() => setActiveTab('notice')}
                        className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === 'notice'
                                ? 'border-black text-black'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                    >
                        공지사항
                    </button>
                </nav>
            </div>

            {/* Content */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 min-h-[500px]">
                {activeTab === 'faq' ? <FAQEditor /> : <NoticeEditor />}
            </div>
        </div>
    );
}

function FAQEditor() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-900">FAQ 목록</h3>
                <button className="bg-gray-100 text-gray-900 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors flex items-center gap-1">
                    <Plus className="w-4 h-4" /> 질문 추가
                </button>
            </div>

            <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="border border-gray-200 rounded-lg overflow-hidden">
                        <div className="bg-gray-50 px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-gray-100 transition-colors">
                            <div className="flex items-center gap-3 flex-1">
                                <span className="font-bold text-gray-400">Q.</span>
                                <input
                                    type="text"
                                    defaultValue="설치까지 얼마나 걸리나요?"
                                    className="bg-transparent border-none focus:ring-0 w-full font-medium text-gray-900"
                                />
                            </div>
                            <ChevronDown className="w-5 h-5 text-gray-400" />
                        </div>
                        <div className="p-4 border-t border-gray-200">
                            <div className="flex gap-3">
                                <span className="font-bold text-black mt-1">A.</span>
                                <textarea
                                    className="w-full p-2 border border-gray-200 rounded-md text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-black/5 resize-none h-24"
                                    defaultValue="계약 후 공장에서 제작 완료까지 약 4~6주가 소요되며, 현장 설치는 1~2일이면 충분합니다."
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function NoticeEditor() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-900">공지사항 목록</h3>
                <button className="bg-gray-100 text-gray-900 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors flex items-center gap-1">
                    <Plus className="w-4 h-4" /> 공지사항 작성
                </button>
            </div>

            <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                        <th className="px-4 py-3 font-medium text-gray-500 w-16">No</th>
                        <th className="px-4 py-3 font-medium text-gray-500">제목</th>
                        <th className="px-4 py-3 font-medium text-gray-500 w-32">작성일</th>
                        <th className="px-4 py-3 font-medium text-gray-500 w-24">상태</th>
                        <th className="px-4 py-3 font-medium text-gray-500 w-16"></th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {[1, 2, 3].map((i) => (
                        <tr key={i} className="hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-3 text-gray-500">{i}</td>
                            <td className="px-4 py-3 font-medium text-gray-900">2024년 설 연휴 배송 안내</td>
                            <td className="px-4 py-3 text-gray-500">2024.02.01</td>
                            <td className="px-4 py-3">
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    게시중
                                </span>
                            </td>
                            <td className="px-4 py-3 text-right">
                                <button className="text-gray-400 hover:text-gray-600">
                                    <MoreVertical className="w-4 h-4" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

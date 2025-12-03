'use client';

import { Save, Plus, Edit2, Trash2, Image as ImageIcon } from 'lucide-react';

export default function CMSSolutionsPage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">솔루션 관리</h2>
                    <p className="text-gray-500 text-sm mt-1">솔루션 페이지의 콘텐츠를 관리합니다.</p>
                </div>
                <button className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    변경사항 저장
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Solution Card Item */}
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden group hover:shadow-md transition-shadow">
                        <div className="relative h-48 bg-gray-100 flex items-center justify-center">
                            <ImageIcon className="w-8 h-8 text-gray-300" />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                                <button className="bg-white text-gray-900 px-4 py-2 rounded-lg text-sm font-medium shadow-sm hover:bg-gray-50">
                                    이미지 변경
                                </button>
                            </div>
                        </div>
                        <div className="p-5 space-y-4">
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">솔루션 제목</label>
                                <input
                                    type="text"
                                    defaultValue={`Solution Title ${i}`}
                                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-black/5"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">설명</label>
                                <textarea
                                    defaultValue="솔루션에 대한 간단한 설명이 들어갑니다."
                                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-black/5 resize-none h-20"
                                />
                            </div>
                            <div className="flex justify-end gap-2 pt-2">
                                <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Add New Card */}
                <button className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center h-full min-h-[300px] hover:bg-gray-100 hover:border-gray-300 transition-all group">
                    <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <Plus className="w-6 h-6 text-gray-400 group-hover:text-black" />
                    </div>
                    <span className="text-sm font-medium text-gray-500 group-hover:text-gray-900">새 솔루션 추가</span>
                </button>
            </div>
        </div>
    );
}

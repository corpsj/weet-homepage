'use client';

import { useState } from 'react';
import { Save, Plus, Trash2, GripVertical, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';

export default function CMSMainPage() {
    const [activeTab, setActiveTab] = useState('hero');

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">메인 페이지 관리</h2>
                    <p className="text-gray-500 text-sm mt-1">홈페이지의 주요 섹션을 관리합니다.</p>
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
                        onClick={() => setActiveTab('hero')}
                        className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === 'hero'
                                ? 'border-black text-black'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                    >
                        Hero Section
                    </button>
                    <button
                        onClick={() => setActiveTab('signature')}
                        className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === 'signature'
                                ? 'border-black text-black'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                    >
                        Signature Line
                    </button>
                </nav>
            </div>

            {/* Content */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 min-h-[500px]">
                {activeTab === 'hero' ? <HeroSectionEditor /> : <SignatureLineEditor />}
            </div>
        </div>
    );
}

function HeroSectionEditor() {
    // Mock data
    const slides = [
        { id: 1, image: '/images/hero/slide1.jpg', title: 'Weet Modular', subtitle: '공간의 새로운 기준' },
        { id: 2, image: '/images/hero/slide2.jpg', title: 'Premium Design', subtitle: '당신만의 특별한 공간' },
    ];

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-900">슬라이드 관리</h3>
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                    <Plus className="w-4 h-4" /> 슬라이드 추가
                </button>
            </div>

            <div className="space-y-4">
                {slides.map((slide, index) => (
                    <div key={slide.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-100 group">
                        <div className="cursor-move text-gray-400 hover:text-gray-600">
                            <GripVertical className="w-5 h-5" />
                        </div>
                        <div className="relative w-24 h-16 bg-gray-200 rounded-md overflow-hidden flex-shrink-0">
                            {/* Placeholder for actual image */}
                            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                                <ImageIcon className="w-6 h-6" />
                            </div>
                        </div>
                        <div className="flex-1 grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">메인 타이틀</label>
                                <input
                                    type="text"
                                    defaultValue={slide.title}
                                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black/5"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">서브 타이틀</label>
                                <input
                                    type="text"
                                    defaultValue={slide.subtitle}
                                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black/5"
                                />
                            </div>
                        </div>
                        <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                            <Trash2 className="w-5 h-5" />
                        </button>
                    </div>
                ))}
            </div>

            <div className="bg-blue-50 p-4 rounded-lg text-sm text-blue-800">
                <p className="font-medium mb-1">💡 Tip</p>
                <p>슬라이드 순서는 드래그 앤 드롭으로 변경할 수 있습니다. (구현 예정)</p>
            </div>
        </div>
    );
}

function SignatureLineEditor() {
    return (
        <div className="space-y-8">
            <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">노출 제품 선택 (최대 10개)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-black/30 cursor-pointer transition-colors bg-gray-50">
                            <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black" defaultChecked={i <= 3} />
                            <div className="w-10 h-10 bg-gray-200 rounded-md flex-shrink-0" />
                            <div>
                                <p className="text-sm font-medium text-gray-900">Product Name {i}</p>
                                <p className="text-xs text-gray-500">Category</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

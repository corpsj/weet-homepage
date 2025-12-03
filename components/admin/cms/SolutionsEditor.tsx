'use client';

import { useState } from 'react';
import { Plus, Trash2, GripVertical, Save, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SupabaseAny = any;
import ImageUpload from '@/components/admin/media/ImageUpload';

interface Solution {
    id: string;
    title: string;
    description: string;
    image_url: string;
    sort_order: number;
    is_active: boolean;
}

export default function SolutionsEditor({ initialSolutions }: { initialSolutions: Solution[] }) {
    const [solutions, setSolutions] = useState<Solution[]>(initialSolutions);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const supabase = createClient() as SupabaseAny;

    const handleAddSolution = async () => {
        setLoading(true);
        try {
            const newSolution = {
                title: 'New Solution',
                description: 'Description',
                image_url: '',
                sort_order: solutions.length,
                is_active: true
            };

            const { error } = await supabase
                .from('solutions')
                .insert(newSolution);

            if (error) throw error;
            router.refresh();
        } catch (e) {
            console.error(e);
            alert('Failed to add solution');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateSolution = async (id: string, field: keyof Solution, value: any) => {
        // Optimistic update
        setSolutions(solutions.map(s => s.id === id ? { ...s, [field]: value } : s));

        try {
            const { error } = await supabase
                .from('solutions')
                .update({ [field]: value })
                .eq('id', id);

            if (error) throw error;
        } catch (e) {
            console.error(e);
            // Revert on error would be better
        }
    };

    const handleDeleteSolution = async (id: string) => {
        if (!confirm('정말 삭제하시겠습니까?')) return;
        setLoading(true);
        try {
            const { error } = await supabase
                .from('solutions')
                .delete()
                .eq('id', id);

            if (error) throw error;
            router.refresh();
        } catch (e) {
            console.error(e);
            alert('Failed to delete');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">솔루션 관리</h2>
                    <p className="text-gray-500 text-sm mt-1">비즈니스 솔루션 섹션의 카드를 관리합니다.</p>
                </div>
                <button
                    onClick={handleAddSolution}
                    disabled={loading}
                    className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                    솔루션 추가
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {solutions.map((solution) => (
                    <div key={solution.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden group">
                        <div className="p-4 space-y-4">
                            <div className="flex justify-between items-start">
                                <div className="cursor-move text-gray-400 hover:text-gray-600">
                                    <GripVertical className="w-5 h-5" />
                                </div>
                                <button
                                    onClick={() => handleDeleteSolution(solution.id)}
                                    className="text-gray-400 hover:text-red-500 transition-colors"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">이미지</label>
                                <ImageUpload
                                    value={solution.image_url}
                                    onChange={(url) => handleUpdateSolution(solution.id, 'image_url', url)}
                                    className="aspect-video"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">제목</label>
                                <input
                                    type="text"
                                    value={solution.title}
                                    onChange={(e) => handleUpdateSolution(solution.id, 'title', e.target.value)}
                                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black/5"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">설명</label>
                                <textarea
                                    rows={3}
                                    value={solution.description}
                                    onChange={(e) => handleUpdateSolution(solution.id, 'description', e.target.value)}
                                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black/5 resize-none"
                                />
                            </div>

                            <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                                <input
                                    type="checkbox"
                                    checked={solution.is_active}
                                    onChange={(e) => handleUpdateSolution(solution.id, 'is_active', e.target.checked)}
                                    className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
                                />
                                <label className="text-xs font-medium text-gray-600">활성화</label>
                            </div>
                        </div>
                    </div>
                ))}

                {solutions.length === 0 && (
                    <div className="col-span-full text-center py-12 text-gray-500 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                        등록된 솔루션이 없습니다.
                    </div>
                )}
            </div>
        </div>
    );
}

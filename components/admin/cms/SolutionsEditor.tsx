'use client';

import { useState } from 'react';
import { Plus, Trash2, GripVertical, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import ImageUpload from '@/components/admin/media/ImageUpload';
import { toast } from 'sonner';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

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
    const supabase = createClient();

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            setSolutions((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over.id);
                const newItems = arrayMove(items, oldIndex, newIndex);

                // Update sort_order in DB
                // This should ideally be a batch update or calling an RPC function
                // For now, we'll just update the local state and trigger a reorder update
                updateSortOrder(newItems);

                return newItems;
            });
        }
    };

    const updateSortOrder = async (items: Solution[]) => {
        try {
            for (let i = 0; i < items.length; i++) {
                const { error } = await supabase
                    .from('solutions')
                    .update({ sort_order: i } as never)
                    .eq('id', items[i].id);
                if (error) throw error;
            }
            toast.success('순서가 저장되었습니다.');
        } catch (error) {
            console.error(error);
            toast.error('순서 저장 실패');
        }
    };

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
                .insert(newSolution as never);

            if (error) throw error;
            router.refresh();
            toast.success('솔루션이 추가되었습니다.');
        } catch (e) {
            console.error(e);
            toast.error('솔루션 추가 실패');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateSolution = async (id: string, field: keyof Solution, value: any) => {
        // Optimistic update
        const previousSolutions = [...solutions];
        setSolutions(solutions.map(s => s.id === id ? { ...s, [field]: value } : s));

        try {
            const { error } = await supabase
                .from('solutions')
                .update({ [field]: value } as never)
                .eq('id', id);

            if (error) throw error;
        } catch (e) {
            console.error(e);
            toast.error('수정 실패 - 변경사항이 취소됩니다.');
            setSolutions(previousSolutions);
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
            toast.success('삭제되었습니다.');
        } catch (e) {
            console.error(e);
            toast.error('삭제 실패');
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

            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={solutions.map(s => s.id)}
                    strategy={verticalListSortingStrategy}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {solutions.map((solution) => (
                            <SortableSolutionItem
                                key={solution.id}
                                solution={solution}
                                onUpdate={handleUpdateSolution}
                                onDelete={handleDeleteSolution}
                            />
                        ))}
                    </div>
                </SortableContext>
            </DndContext>

            {solutions.length === 0 && (
                <div className="col-span-full text-center py-12 text-gray-500 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                    등록된 솔루션이 없습니다.
                </div>
            )}
        </div>
    );
}

function SortableSolutionItem({
    solution,
    onUpdate,
    onDelete
}: {
    solution: Solution;
    onUpdate: (id: string, field: keyof Solution, value: any) => void;
    onDelete: (id: string) => void;
}) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: solution.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden group"
        >
            <div className="p-4 space-y-4">
                <div className="flex justify-between items-start">
                    <div
                        {...attributes}
                        {...listeners}
                        className="cursor-move text-gray-400 hover:text-gray-600 p-1 rounded hover:bg-gray-100"
                    >
                        <GripVertical className="w-5 h-5" />
                    </div>
                    <button
                        onClick={() => onDelete(solution.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1"
                    >
                        <Trash2 className="w-5 h-5" />
                    </button>
                </div>

                <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">이미지</label>
                    <ImageUpload
                        value={solution.image_url}
                        onChange={(url) => onUpdate(solution.id, 'image_url', url)}
                        className="aspect-video"
                    />
                </div>

                <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">제목</label>
                    <input
                        type="text"
                        value={solution.title}
                        onChange={(e) => onUpdate(solution.id, 'title', e.target.value)}
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black/5"
                    />
                </div>

                <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">설명</label>
                    <textarea
                        rows={3}
                        value={solution.description}
                        onChange={(e) => onUpdate(solution.id, 'description', e.target.value)}
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black/5 resize-none"
                    />
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                    <input
                        type="checkbox"
                        checked={solution.is_active}
                        onChange={(e) => onUpdate(solution.id, 'is_active', e.target.checked)}
                        className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
                    />
                    <label className="text-xs font-medium text-gray-600">활성화</label>
                </div>
            </div>
        </div>
    );
}

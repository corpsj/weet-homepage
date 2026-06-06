'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Trash2, Loader2, Pencil, MapPin, Calendar, User } from 'lucide-react';
import { toast } from 'sonner';
import { Project } from '@/types/supabase';
import { getProjects, deleteProject } from '@/app/actions/project-actions';

export default function AdminProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState<string | null>(null);
    const [filterStatus, setFilterStatus] = useState('All');

    const fetchProjects = useCallback(async (status: string) => {
        try {
            const data = await getProjects(status);
            setProjects(data);
        } catch (error) {
            console.error('Error fetching projects:', error);
            toast.error('프로젝트 목록을 불러오지 못했습니다.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        setLoading(true);
        fetchProjects(filterStatus);
    }, [filterStatus, fetchProjects]);

    const handleDelete = async (id: string) => {
        if (!confirm('정말 삭제하시겠습니까?')) return;

        setDeleting(id);
        try {
            await deleteProject(id);
            setProjects(prev => prev.filter(item => item.id !== id));
            toast.success('삭제되었습니다.');
        } catch (error) {
            console.error('Error deleting project:', error);
            toast.error('삭제 중 오류가 발생했습니다.');
        } finally {
            setDeleting(null);
        }
    };

    const statusLabel = (status: string | null) => {
        switch (status) {
            case 'completed': return '완료';
            case 'in_progress': return '진행중';
            case 'planned': return '계획중';
            default: return status || '미지정';
        }
    };

    const statusColor = (status: string | null) => {
        switch (status) {
            case 'completed': return 'text-green-600 bg-green-50';
            case 'in_progress': return 'text-blue-600 bg-blue-50';
            case 'planned': return 'text-orange-600 bg-orange-50';
            default: return 'text-gray-600 bg-gray-50';
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                        프로젝트 관리 <span className="text-sm font-normal text-gray-500 ml-2">Total {projects.length}</span>
                    </h1>
                    <p className="text-gray-500 text-sm mt-1">시공 프로젝트를 관리합니다.</p>
                </div>
                <div className="flex items-center gap-3">
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-black bg-white"
                    >
                        <option value="All">전체 상태</option>
                        <option value="completed">완료</option>
                        <option value="in_progress">진행중</option>
                        <option value="planned">계획중</option>
                    </select>
                    <Link
                        href="/admin/projects/new"
                        className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
                    >
                        <Plus className="w-4 h-4" />
                        새 프로젝트
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {projects.map((project) => (
                    <div key={project.id} className="group relative bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                        <div className="aspect-[4/3] relative bg-gray-100">
                            {project.images && project.images.length > 0 ? (
                                <Image
                                    src={project.images[0]}
                                    alt={project.title}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
                                    No Image
                                </div>
                            )}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                                <Link
                                    href={`/admin/projects/${project.id}`}
                                    className="p-2 bg-white rounded-full text-black hover:bg-gray-100 transition-colors shadow-lg"
                                >
                                    <Pencil className="w-5 h-5" />
                                </Link>
                                <button
                                    type="button"
                                    onClick={() => handleDelete(project.id)}
                                    disabled={deleting === project.id}
                                    className="p-2 bg-white rounded-full text-red-600 hover:bg-red-50 transition-colors shadow-lg"
                                >
                                    {deleting === project.id ? (
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    ) : (
                                        <Trash2 className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                            <div className="absolute top-3 left-3">
                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColor(project.status)}`}>
                                    {statusLabel(project.status)}
                                </span>
                            </div>
                        </div>
                        <div className="p-4">
                            <h3 className="font-semibold text-gray-900 truncate">{project.title}</h3>
                            <div className="mt-2 space-y-1">
                                {project.client && (
                                    <p className="text-sm text-gray-500 flex items-center gap-1.5">
                                        <User className="w-3.5 h-3.5" />
                                        {project.client}
                                    </p>
                                )}
                                {project.location && (
                                    <p className="text-sm text-gray-500 flex items-center gap-1.5">
                                        <MapPin className="w-3.5 h-3.5" />
                                        {project.location}
                                    </p>
                                )}
                                {project.completed_at && (
                                    <p className="text-sm text-gray-500 flex items-center gap-1.5">
                                        <Calendar className="w-3.5 h-3.5" />
                                        {new Date(project.completed_at).toLocaleDateString()}
                                    </p>
                                )}
                            </div>
                            {project.tags && project.tags.length > 0 && (
                                <div className="mt-3 flex flex-wrap gap-1">
                                    {project.tags.map((tag) => (
                                        <span key={tag} className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {projects.length === 0 && (
                <div className="text-center py-12 bg-white rounded-xl border border-gray-200 border-dashed">
                    <p className="text-gray-500">등록된 프로젝트가 없습니다.</p>
                </div>
            )}
        </div>
    );
}

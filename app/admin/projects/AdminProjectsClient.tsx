'use client';

import { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Trash2, Loader2, Pencil, MapPin, Calendar, User } from 'lucide-react';
import { toast } from 'sonner';
import { Project } from '@/types/supabase';
import { getProjects, deleteProject } from '@/app/actions/project-actions';
import { getProjectHeroImage, getProjectPublicIssues } from '@/lib/projects/publicProjects';

interface AdminProjectsClientProps {
    initialProjects: Project[];
}

const publicIssueLabels: Record<string, string> = {
    'test-title': '테스트 제목',
    'missing-image': '이미지 없음',
    'invalid-image-url': '이미지 URL 확인',
    'missing-client': '고객 정보 필요',
    'missing-location': '위치 필요',
    'missing-completed-date': '완료일 필요',
    'invalid-completed-date': '완료일 확인',
    'needs-description': '설명 보강',
    'unpublished-status': '완료 상태 아님',
};

export default function AdminProjectsClient({ initialProjects }: AdminProjectsClientProps) {
    const [projects, setProjects] = useState<Project[]>(initialProjects);
    const [loading, setLoading] = useState(false);
    const [deleting, setDeleting] = useState<string | null>(null);
    const [filterStatus, setFilterStatus] = useState('All');
    const didUseInitialData = useRef(false);
    const visibleSummary = useMemo(() => {
        const withImages = projects.filter((project) => getProjectHeroImage(project)).length;
        const incomplete = projects.filter((project) => getProjectPublicIssues(project).length > 0).length;

        return { withImages, incomplete };
    }, [projects]);

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
        if (!didUseInitialData.current) {
            didUseInitialData.current = true;
            return;
        }

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

    if (loading && projects.length === 0) {
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
                    <p className="text-gray-500 text-sm mt-1">
                        공개 품질에 영향을 주는 이미지·기본 정보를 한 화면에서 빠르게 확인합니다.
                        {loading && <span className="ml-2 text-gray-400">필터 적용 중...</span>}
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        disabled={loading}
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

            <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-lg border border-gray-200 bg-white p-4">
                    <p className="text-xs font-semibold text-gray-500">현재 표시</p>
                    <p className="mt-2 text-2xl font-black text-gray-900">{projects.length}</p>
                </div>
                <div className="rounded-lg border border-gray-200 bg-white p-4">
                    <p className="text-xs font-semibold text-gray-500">유효 이미지</p>
                    <p className="mt-2 text-2xl font-black text-gray-900">{visibleSummary.withImages}</p>
                </div>
                <div className="rounded-lg border border-gray-200 bg-white p-4">
                    <p className="text-xs font-semibold text-gray-500">보완 필요</p>
                    <p className="mt-2 text-2xl font-black text-gray-900">{visibleSummary.incomplete}</p>
                </div>
            </div>

            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
                <div className="grid grid-cols-[88px_minmax(180px,1fr)_110px_160px_120px_120px] gap-4 border-b border-gray-100 bg-gray-50 px-4 py-3 text-xs font-bold uppercase tracking-wider text-gray-500 max-lg:hidden">
                    <span>이미지</span>
                    <span>프로젝트</span>
                    <span>상태</span>
                    <span>고객/지역</span>
                    <span>완료일</span>
                    <span className="text-right">관리</span>
                </div>
                {projects.map((project, index) => {
                    const publicIssues = getProjectPublicIssues(project);
                    const heroImage = getProjectHeroImage(project);

                    return (
                        <div
                            key={project.id}
                            className="grid gap-4 border-b border-gray-100 px-4 py-4 last:border-b-0 lg:grid-cols-[88px_minmax(180px,1fr)_110px_160px_120px_120px] lg:items-center"
                        >
                            <div className="relative h-20 w-20 overflow-hidden rounded-lg bg-gray-100">
                                {heroImage ? (
                                    <Image
                                        src={heroImage}
                                        alt={project.title}
                                        fill
                                        loading={index === 0 ? 'eager' : 'lazy'}
                                        sizes="80px"
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center px-2 text-center text-xs font-semibold text-gray-400">
                                        {project.images?.[0] ? 'Invalid Image' : 'No Image'}
                                    </div>
                                )}
                            </div>

                            <div className="min-w-0">
                                <h3 className="truncate font-semibold text-gray-900">{project.title}</h3>
                                <div className="mt-2 flex flex-wrap gap-1.5">
                                    {publicIssues.length === 0 ? (
                                        <span className="rounded border border-green-200 bg-green-50 px-2 py-0.5 text-xs font-semibold text-green-700">
                                            공개 가능
                                        </span>
                                    ) : (
                                        publicIssues.slice(0, 3).map((issue) => (
                                            <span key={issue} className="rounded border border-amber-200 bg-amber-50 px-2 py-0.5 text-xs font-semibold text-amber-700">
                                                {publicIssueLabels[issue] ?? issue}
                                            </span>
                                        ))
                                    )}
                                    {publicIssues.length > 3 && (
                                        <span className="rounded border border-gray-200 bg-gray-50 px-2 py-0.5 text-xs text-gray-500">
                                            +{publicIssues.length - 3}
                                        </span>
                                    )}
                                    {project.tags?.slice(0, 2).map((tag) => (
                                        <span key={tag} className="rounded border border-gray-200 bg-gray-50 px-2 py-0.5 text-xs text-gray-600">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${statusColor(project.status)}`}>
                                    {statusLabel(project.status)}
                                </span>
                            </div>

                            <div className="space-y-1 text-sm text-gray-600">
                                {project.client && (
                                    <p className="flex items-center gap-1.5">
                                        <User className="h-3.5 w-3.5" />
                                        {project.client}
                                    </p>
                                )}
                                {project.location && (
                                    <p className="flex items-center gap-1.5">
                                        <MapPin className="h-3.5 w-3.5" />
                                        {project.location}
                                    </p>
                                )}
                            </div>

                            <div className="flex items-center gap-1.5 text-sm text-gray-600">
                                <Calendar className="h-3.5 w-3.5" />
                                {project.completed_at ? new Date(project.completed_at).toLocaleDateString() : '미지정'}
                            </div>

                            <div className="flex justify-start gap-2 lg:justify-end">
                                <Link
                                    href={`/admin/projects/${project.id}`}
                                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-black transition-colors hover:bg-gray-50"
                                    aria-label={`${project.title} 수정`}
                                >
                                    <Pencil className="h-4 w-4" />
                                </Link>
                                <button
                                    type="button"
                                    onClick={() => handleDelete(project.id)}
                                    disabled={deleting === project.id}
                                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-red-100 bg-white text-red-600 transition-colors hover:bg-red-50 disabled:opacity-60"
                                    aria-label={`${project.title} 삭제`}
                                >
                                    {deleting === project.id ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <Trash2 className="h-4 w-4" />
                                    )}
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {projects.length === 0 && (
                <div className="text-center py-12 bg-white rounded-lg border border-gray-200 border-dashed">
                    <p className="text-gray-500">등록된 프로젝트가 없습니다.</p>
                </div>
            )}
        </div>
    );
}

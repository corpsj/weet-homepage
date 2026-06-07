'use client';

import { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Trash2, Loader2, Pencil, MapPin, Calendar, User } from 'lucide-react';
import { toast } from 'sonner';
import { Project } from '@/types/supabase';
import { getProjects, deleteProject } from '@/app/actions/project-actions';
import { getProjectHeroImage, getProjectPublicIssues } from '@/lib/projects/publicProjects';
import {
    ConsoleMetricCard,
    ConsolePageHeader,
    ConsolePanel,
    ConsoleStatusPill,
    ReadinessRing,
    consoleIconButtonClass,
    consoleInputClass,
    consolePrimaryButtonClass,
    consoleSelectClass,
} from '@/components/admin/ConsolePrimitives';

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
    const [searchTerm, setSearchTerm] = useState('');
    const didUseInitialData = useRef(false);
    const visibleSummary = useMemo(() => {
        const withImages = projects.filter((project) => getProjectHeroImage(project)).length;
        const incomplete = projects.filter((project) => getProjectPublicIssues(project).length > 0).length;
        const ready = projects.length - incomplete;

        return { withImages, incomplete, ready };
    }, [projects]);
    const filteredProjects = useMemo(() => {
        const normalized = searchTerm.trim().toLowerCase();
        if (!normalized) return projects;

        return projects.filter((project) => {
            return [
                project.title,
                project.client,
                project.location,
                project.status,
                ...(project.tags ?? []),
            ]
                .filter(Boolean)
                .some((value) => value!.toLowerCase().includes(normalized));
        });
    }, [projects, searchTerm]);

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

    const statusColor = (status: string | null): 'neutral' | 'success' | 'warning' | 'dark' => {
        switch (status) {
            case 'completed': return 'success';
            case 'in_progress': return 'dark';
            case 'planned': return 'warning';
            default: return 'neutral';
        }
    };

    const readinessScore = (issues: string[]) => Math.max(0, 100 - issues.length * 12);

    if (loading && projects.length === 0) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <ConsolePageHeader
                eyebrow="PROJECT READINESS"
                title={`프로젝트 관리 · ${projects.length.toLocaleString('ko-KR')}건`}
                description={`공개 품질에 영향을 주는 이미지, 완료일, 고객/지역 정보를 한 화면에서 점검합니다.${loading ? ' 필터 적용 중...' : ''}`}
                actions={
                    <>
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            disabled={loading}
                            className={consoleSelectClass}
                        >
                            <option value="All">전체 상태</option>
                            <option value="completed">완료</option>
                            <option value="in_progress">진행중</option>
                            <option value="planned">계획중</option>
                        </select>
                        <Link href="/admin/projects/new" className={consolePrimaryButtonClass}>
                            <Plus className="h-4 w-4" />
                            새 프로젝트
                        </Link>
                    </>
                }
            />

            <div className="grid gap-3 sm:grid-cols-3">
                <ConsoleMetricCard label="현재 표시" value={projects.length.toLocaleString('ko-KR')} caption="필터 결과 기준" tone="dark" />
                <ConsoleMetricCard label="공개 가능" value={visibleSummary.ready.toLocaleString('ko-KR')} caption="보완 이슈 없음" />
                <ConsoleMetricCard label="보완 필요" value={visibleSummary.incomplete.toLocaleString('ko-KR')} caption="이미지·완료일·본문 점검" tone={visibleSummary.incomplete > 0 ? 'warning' : 'neutral'} />
            </div>

            <ConsolePanel>
                <div className="flex flex-col gap-3 border-b border-[#e5e5df] bg-[#f4f4f1] p-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <p className="text-xs font-bold text-[#8a6a12]">IMAGE HEALTH</p>
                        <p className="mt-1 text-sm font-semibold text-[#111111]">{visibleSummary.withImages.toLocaleString('ko-KR')}건이 유효한 대표 이미지를 사용 중입니다.</p>
                    </div>
                    <input
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                        placeholder="프로젝트명, 고객, 지역 검색"
                        className={`${consoleInputClass} w-full md:w-72`}
                    />
                </div>
                <div className="grid grid-cols-[72px_88px_minmax(180px,1fr)_110px_160px_120px_120px] gap-4 border-b border-[#e5e5df] bg-[#fbfbfa] px-4 py-3 text-xs font-bold text-gray-500 max-lg:hidden">
                    <span>준비도</span>
                    <span>이미지</span>
                    <span>프로젝트</span>
                    <span>상태</span>
                    <span>고객/지역</span>
                    <span>완료일</span>
                    <span className="text-right">관리</span>
                </div>
                {filteredProjects.map((project, index) => {
                    const publicIssues = getProjectPublicIssues(project);
                    const heroImage = getProjectHeroImage(project);

                    return (
                        <div
                            key={project.id}
                            className="grid gap-4 border-b border-[#f0f0ec] px-4 py-4 last:border-b-0 lg:grid-cols-[72px_88px_minmax(180px,1fr)_110px_160px_120px_120px] lg:items-center"
                        >
                            <div className="flex items-center justify-between lg:block">
                                <span className="text-xs font-bold text-gray-400 lg:hidden">준비도</span>
                                <ReadinessRing score={readinessScore(publicIssues)} />
                            </div>

                            <div className="relative h-20 w-20 overflow-hidden rounded-md border border-[#e5e5df] bg-[#f4f4f1]">
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
                                        {project.images?.[0] ? 'URL 확인' : '이미지 없음'}
                                    </div>
                                )}
                            </div>

                            <div className="min-w-0">
                                <h3 className="truncate font-semibold text-gray-900">{project.title}</h3>
                                <div className="mt-2 flex flex-wrap gap-1.5">
                                    {publicIssues.length === 0 ? (
                                        <ConsoleStatusPill tone="success">공개 가능</ConsoleStatusPill>
                                    ) : (
                                        publicIssues.slice(0, 3).map((issue) => (
                                            <ConsoleStatusPill key={issue} tone="warning">
                                                {publicIssueLabels[issue] ?? issue}
                                            </ConsoleStatusPill>
                                        ))
                                    )}
                                    {publicIssues.length > 3 && (
                                        <ConsoleStatusPill>+{publicIssues.length - 3}</ConsoleStatusPill>
                                    )}
                                    {project.tags?.slice(0, 2).map((tag) => (
                                        <ConsoleStatusPill key={tag}>{tag}</ConsoleStatusPill>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <ConsoleStatusPill tone={statusColor(project.status)}>{statusLabel(project.status)}</ConsoleStatusPill>
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
                                    className={consoleIconButtonClass}
                                    aria-label={`${project.title} 수정`}
                                >
                                    <Pencil className="h-4 w-4" />
                                </Link>
                                <button
                                    type="button"
                                    onClick={() => handleDelete(project.id)}
                                    disabled={deleting === project.id}
                                    className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-red-200 bg-white text-red-600 transition-colors hover:bg-red-50 disabled:opacity-60"
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
            </ConsolePanel>

            {filteredProjects.length === 0 && (
                <div className="rounded-md border border-dashed border-[#d8d8d2] bg-white py-12 text-center">
                    <p className="text-gray-500">등록된 프로젝트가 없습니다.</p>
                </div>
            )}
        </div>
    );
}

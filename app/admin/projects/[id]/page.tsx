'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Project } from '@/types/supabase';
import { getProject } from '@/app/actions/project-actions';
import ProjectForm from '@/components/admin/projects/ProjectForm';
import { Loader2 } from 'lucide-react';
import { ConsolePageHeader } from '@/components/admin/ConsolePrimitives';

export default function EditProjectPage() {
    const params = useParams();
    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);

    const projectId = (() => {
        const raw = params?.id;
        if (typeof raw === 'string') return raw;
        if (Array.isArray(raw)) return raw[0];
        return undefined;
    })();

    useEffect(() => {
        if (!projectId) {
            setLoading(false);
            return;
        }

        const fetchProject = async (id: string) => {
            try {
                const data = await getProject(id);
                setProject(data);
            } catch (error) {
                console.error('Error fetching project:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProject(projectId);
    }, [projectId]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
            </div>
        );
    }

    if (!project) {
        return <div>프로젝트를 찾을 수 없습니다.</div>;
    }

    return (
        <div className="space-y-6">
            <ConsolePageHeader
                eyebrow="CONTENTS"
                title="프로젝트 수정"
                description="프로젝트 정보를 수정합니다."
            />

            <ProjectForm initialData={project} />
        </div>
    );
}

'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { Project } from '@/types/supabase';
import ProjectForm from '@/components/admin/projects/ProjectForm';
import { Loader2 } from 'lucide-react';

export default function EditProjectPage() {
    const params = useParams();
    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

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
                const { data, error } = await supabase
                    .from('projects')
                    .select('*')
                    .eq('id', id)
                    .single();

                if (error) throw error;
                setProject(data);
            } catch (error) {
                console.error('Error fetching project:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProject(projectId);
    }, [projectId, supabase]);

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
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">프로젝트 수정</h1>
                <p className="text-gray-500 text-sm mt-1">프로젝트 정보를 수정합니다.</p>
            </div>

            <ProjectForm initialData={project} />
        </div>
    );
}

'use client';

import ProjectForm from '@/components/admin/projects/ProjectForm';

export default function NewProjectPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">새 프로젝트 등록</h1>
                <p className="text-gray-500 text-sm mt-1">새로운 시공 프로젝트를 등록합니다.</p>
            </div>

            <ProjectForm />
        </div>
    );
}

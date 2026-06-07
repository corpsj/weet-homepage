'use client';

import ProjectForm from '@/components/admin/projects/ProjectForm';
import { ConsolePageHeader } from '@/components/admin/ConsolePrimitives';

export default function NewProjectPage() {
    return (
        <div className="space-y-6">
            <ConsolePageHeader
                eyebrow="CONTENTS"
                title="새 프로젝트 등록"
                description="새로운 시공 프로젝트를 등록합니다."
            />

            <ProjectForm />
        </div>
    );
}

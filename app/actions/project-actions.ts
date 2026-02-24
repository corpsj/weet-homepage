'use server';

import { revalidatePath } from 'next/cache';
import { supabaseAdmin } from '@/lib/supabase';
import { ProjectInsert, ProjectUpdate } from '@/types/supabase';

export async function createProject(data: ProjectInsert) {
    const { error } = await supabaseAdmin
        .from('projects')
        .insert(data as never);

    if (error) {
        console.error('Error creating project:', error);
        throw new Error(`Failed to create project: ${error.message} (${error.details || ''})`);
    }

    revalidatePath('/admin/projects');
    revalidatePath('/projects');
}

export async function updateProject(id: string, data: ProjectUpdate) {
    const { error } = await supabaseAdmin
        .from('projects')
        .update(data as never)
        .eq('id', id);

    if (error) {
        console.error('Error updating project:', error);
        throw new Error(`Failed to update project: ${error.message} (${error.details || ''})`);
    }

    revalidatePath('/admin/projects');
    revalidatePath(`/admin/projects/${id}`);
    revalidatePath('/projects');
}

export async function deleteProject(id: string) {
    const { error } = await supabaseAdmin
        .from('projects')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting project:', error);
        throw new Error('Failed to delete project');
    }

    revalidatePath('/admin/projects');
    revalidatePath('/projects');
}
'use server';

import { revalidatePath } from 'next/cache';
import { supabaseAdmin } from '@/lib/supabase';
import { Project, ProjectInsert, ProjectUpdate } from '@/types/supabase';
import { requireAdmin } from '@/lib/admin-auth';

export async function getProjects(status?: string): Promise<Project[]> {
    await requireAdmin();

    let query = supabaseAdmin
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

    if (status && status !== 'All') {
        query = query.eq('status', status);
    }

    const { data, error } = await query;

    if (error) {
        console.error('Error fetching projects:', error);
        throw new Error('Failed to fetch projects');
    }

    return (data as Project[]) || [];
}

export async function getProject(id: string): Promise<Project | null> {
    await requireAdmin();

    const { data, error } = await supabaseAdmin
        .from('projects')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching project:', error);
        return null;
    }

    return data as Project;
}

export async function createProject(data: ProjectInsert) {
    await requireAdmin();

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
    await requireAdmin();

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
    await requireAdmin();

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

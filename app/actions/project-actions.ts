'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { supabaseAdmin } from '@/lib/supabase';
import { Project, ProjectInsert, ProjectUpdate } from '@/types/supabase';
import { requireAdmin } from '@/lib/admin-auth';

const optionalText = z
    .string()
    .max(5000)
    .nullish()
    .transform((value) => value ?? null);

const optionalStringArray = z
    .array(z.string().max(2000))
    .nullish()
    .transform((value) => value ?? null);

// Explicit allow-list of admin-editable project columns. id and created_at are
// never read from client input (id comes from the route, created_at from the DB).
const projectSchema = z.object({
    title: z.string().trim().min(1).max(300),
    client: optionalText,
    location: optionalText,
    completed_at: optionalText,
    description: optionalText,
    images: optionalStringArray,
    tags: optionalStringArray,
    status: z.string().trim().max(60).nullish().transform((value) => value ?? null),
});

const projectUpdateSchema = projectSchema.partial();

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

    const parsed = projectSchema.parse(data);
    const payload: ProjectInsert = {
        title: parsed.title,
        client: parsed.client,
        location: parsed.location,
        completed_at: parsed.completed_at,
        description: parsed.description,
        images: parsed.images,
        tags: parsed.tags,
        status: parsed.status,
    };

    const { error } = await supabaseAdmin
        .from('projects')
        .insert(payload);

    if (error) {
        console.error('Error creating project:', error);
        throw new Error(`Failed to create project: ${error.message} (${error.details || ''})`);
    }

    revalidatePath('/admin/projects');
    revalidatePath('/projects');
}

export async function updateProject(id: string, data: ProjectUpdate) {
    await requireAdmin();

    const parsed = projectUpdateSchema.parse(data);
    // Only assign provided keys; id/created_at are intentionally not accepted
    // from the client.
    const payload: ProjectUpdate = {};
    if (parsed.title !== undefined) payload.title = parsed.title;
    if (parsed.client !== undefined) payload.client = parsed.client;
    if (parsed.location !== undefined) payload.location = parsed.location;
    if (parsed.completed_at !== undefined) payload.completed_at = parsed.completed_at;
    if (parsed.description !== undefined) payload.description = parsed.description;
    if (parsed.images !== undefined) payload.images = parsed.images;
    if (parsed.tags !== undefined) payload.tags = parsed.tags;
    if (parsed.status !== undefined) payload.status = parsed.status;

    const { error } = await supabaseAdmin
        .from('projects')
        .update(payload)
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

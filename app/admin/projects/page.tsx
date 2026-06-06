import { getProjects } from '@/app/actions/project-actions';
import AdminProjectsClient from './AdminProjectsClient';

export const dynamic = 'force-dynamic';

export default async function AdminProjectsPage() {
  const projects = await getProjects('All');

  return <AdminProjectsClient initialProjects={projects} />;
}

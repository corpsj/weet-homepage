import { redirect } from 'next/navigation';
import AdminShell from '@/components/admin/AdminShell';
import { requireAdmin } from '@/lib/admin-auth';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let user;
  try {
    user = await requireAdmin();
  } catch {
    redirect('/login');
  }

  return (
    <AdminShell user={user}>
      {children}
    </AdminShell>
  );
}

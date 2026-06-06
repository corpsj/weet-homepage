import ConsultationManager from '@/components/admin/consultations/ConsultationManager';
import { getAdminConsultations } from '@/app/actions/customize-actions';

export const dynamic = 'force-dynamic';

export default async function AdminConsultationsPage() {
  const { consultations, count } = await getAdminConsultations();

  return <ConsultationManager consultations={consultations} count={count} />;
}

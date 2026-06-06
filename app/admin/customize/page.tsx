import CustomizeManager from '@/components/admin/customize/CustomizeManager';
import { getCustomizeAdminData } from '@/app/actions/customize-actions';

export const dynamic = 'force-dynamic';

export default async function AdminCustomizePage() {
  const { catalog } = await getCustomizeAdminData();

  return <CustomizeManager initialCatalog={catalog} />;
}

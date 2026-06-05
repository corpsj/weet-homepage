import BespokeConfigurator from '@/components/bespoke/BespokeConfigurator';
import { getPublicBespokeOptionGroups } from '@/lib/bespoke-options';

export const revalidate = 300;

export default async function BespokePage() {
  const optionGroups = await getPublicBespokeOptionGroups();

  return <BespokeConfigurator optionGroups={optionGroups} />;
}

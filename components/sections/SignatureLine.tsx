import { createClient } from '@/utils/supabase/server';
import { Product } from '@/types/supabase';
import SignatureLineClient from './SignatureLineClient';

async function getSignatureProducts(): Promise<Product[]> {
  const supabase = await createClient();
   
  const { data, error } = await (supabase as any)
    .from('products')
    .select('*')
    .eq('is_active', true)
    .eq('is_signature', true)
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching signature products:', error);
    return [];
  }

  return (data || []) as Product[];
}

export default async function SignatureLine() {
  const products = await getSignatureProducts();
  return <SignatureLineClient products={products} />;
}

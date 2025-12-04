import { createClient } from '@/utils/supabase/server';
import SolutionsEditor from '@/components/admin/cms/SolutionsEditor';

export const dynamic = 'force-dynamic';

async function getSolutions() {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('solutions')
        .select('*')
        .order('sort_order', { ascending: true });

    if (error) throw error;
    return data;
}

export default async function CMSSolutionsPage() {
    const solutions = await getSolutions();

    return <SolutionsEditor initialSolutions={solutions || []} />;
}

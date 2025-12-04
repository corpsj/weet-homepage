import { getHeroSlides, getSignatureProducts } from '@/app/actions/cms-actions';
import MainCmsClient from '@/components/admin/cms/MainCmsClient';

export const dynamic = 'force-dynamic';

export default async function CMSMainPage() {
    const heroSlides = await getHeroSlides();
    const products = await getSignatureProducts();

    return (
        <MainCmsClient
            initialHeroSlides={heroSlides}
            initialProducts={products}
        />
    );
}

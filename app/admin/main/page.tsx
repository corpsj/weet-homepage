import { getHeroSlides, getSignatureProducts } from '@/app/actions/cms-actions';
import MainCmsClient from '@/components/admin/cms/MainCmsClient';

export const dynamic = 'force-dynamic';

export default async function CMSMainPage() {
    const heroSlides = await getHeroSlides();
    const products = await getSignatureProducts(); // This likely returns only signature items

    console.log('Admin Hero Slides:', heroSlides?.length);
    console.log('Admin Products:', products?.length);

    return (
        <MainCmsClient
            initialHeroSlides={heroSlides}
            initialProducts={products}
        />
    );
}

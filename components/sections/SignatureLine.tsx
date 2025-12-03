import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@/utils/supabase/server';

async function getSignatureProducts() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .eq('is_signature', true)
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching signature products:', error);
    return [];
  }

  return data || [];
}

export default async function SignatureLine() {
  const products = await getSignatureProducts();

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-white">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-[150px]">
        <h2 className="text-[32px] md:text-[40px] lg:text-[48px] font-semibold mb-8 md:mb-12 lg:mb-16 text-black">시그니처 라인</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-8 md:gap-x-8 md:gap-y-12 lg:gap-x-12 lg:gap-y-16">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products#${product.id}`}
              className="group cursor-pointer"
            >
              {/* Product Image */}
              <div className="aspect-[3/4] bg-gray-200 rounded-lg mb-3 md:mb-4 overflow-hidden group-hover:shadow-lg transition-shadow duration-300 relative">
                {product.image_url ? (
                  <Image
                    src={product.image_url}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500 bg-gradient-to-br from-gray-200 to-gray-300">
                    <span className="text-xs md:text-sm">No Image</span>
                  </div>
                )}
              </div>

              {/* Product Name & Category */}
              <div className="text-center">
                <div className="text-[10px] md:text-xs text-gray-500 mb-1">{product.size_category} Size</div>
                <h3 className="font-medium text-[13px] md:text-[15px] lg:text-[16px] text-black group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
              </div>
            </Link>
          ))}

          {products.length === 0 && (
            <div className="col-span-full text-center py-12 text-gray-500">
              등록된 시그니처 제품이 없습니다.
            </div>
          )}
        </div>

        {/* View All Button */}
        <div className="flex justify-center mt-12 md:mt-14 lg:mt-16">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-black hover:bg-gray-800 text-white font-medium px-8 md:px-10 py-2.5 md:py-3 rounded-lg transition-colors text-sm md:text-base"
          >
            <span>전체 제품 보기</span>
            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 4L13 10L7 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

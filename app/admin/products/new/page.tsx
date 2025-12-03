import ProductForm from '@/components/admin/ProductForm';

export default function NewProductPage() {
    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-8">제품 추가</h1>
            <ProductForm />
        </div>
    );
}

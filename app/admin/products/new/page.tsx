import ProductForm from '@/components/admin/ProductForm';
import { ConsolePageHeader } from '@/components/admin/ConsolePrimitives';

export default function NewProductPage() {
    return (
        <div className="space-y-6">
            <ConsolePageHeader
                eyebrow="MODEL INVENTORY"
                title="새 제품 등록"
                description="공개 여부, 모델 스펙, 대표 이미지와 도면을 한 번에 구성합니다."
            />
            <ProductForm />
        </div>
    );
}

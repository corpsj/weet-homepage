import Link from 'next/link';
import type { CustomizeModel } from '@/lib/customize/types';
import { COST_GUIDE_PATH, modelPath } from '@/lib/model-pages';

export default function ModelLinks({ models }: { models: CustomizeModel[] }) {
  const activeModels = models.filter((model) => model.isActive);
  return (
    <section aria-labelledby="model-prices" className="border-y border-gray-200 bg-white px-5 py-10 md:px-8 md:py-14">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 id="model-prices" className="text-2xl font-bold text-black">이동식주택 모델·가격</h2>
            <p className="mt-2 text-sm leading-6 text-gray-600">규격과 기본 제품가를 확인하고, 원하는 옵션으로 구성해 보세요.</p>
          </div>
          <Link href="/customize" className="inline-flex min-h-11 items-center bg-primary px-5 text-sm font-bold text-black hover:bg-primary-dark">직접 구성하기 →</Link>
        </div>
        <div className="divide-y divide-gray-200 border-y border-gray-200">
          {activeModels.map((model) => (
            <Link key={model.id} href={modelPath(model)} className="grid gap-2 py-5 text-black hover:bg-gray-50 sm:grid-cols-[1fr_1fr_auto] sm:items-center">
              <h3 className="font-bold">{model.nameKo}</h3>
              <p className="text-sm text-gray-600">{model.widthM}m × {model.lengthM}m · {model.areaSqm}㎡</p>
              <p className="text-sm">기본가 <strong className="text-base tabular-nums">{model.basePrice.toLocaleString('ko-KR')}원</strong> <span aria-hidden="true">↗</span></p>
            </Link>
          ))}
          {activeModels.length === 0 && <p className="py-5 text-gray-600">모델 정보는 <Link className="underline" href="/support#consult">상담으로 확인해 주세요.</Link></p>}
        </div>
        <p className="mt-4 text-sm leading-6 text-gray-600">유상 옵션·운반·설치·현장 공사 별도. 최종 견적은 선택 사양과 부지 조건을 확인한 후 안내합니다. <Link href={COST_GUIDE_PATH} className="font-medium text-black underline underline-offset-4">비용 항목 확인하기</Link></p>
      </div>
    </section>
  );
}

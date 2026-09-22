import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPublicCustomizeCatalog } from '@/app/actions/customize-actions';
import { buildPageMetadata } from '@/lib/seo';
import { jsonLdHtml } from '@/lib/json-ld';
import { breadcrumbData, COST_GUIDE_PATH, modelConfigurePath, modelPath, modelStructuredData, modelSummary } from '@/lib/model-pages';

export const revalidate = 300;
type Props = { params: Promise<{ model: string }> };

async function loadModel(params: Props['params']) {
  const [{ model: id }, catalog] = await Promise.all([params, getPublicCustomizeCatalog()]);
  const model = catalog.models.find((item) => item.id === id && item.isActive);
  if (!model) notFound();
  return { model, catalog };
}

export async function generateMetadata({ params }: Props) {
  const { model } = await loadModel(params);
  return buildPageMetadata({ title: `${model.nameKo} — ${model.areaSqm}㎡ 규격·기본 가격`, description: modelSummary(model), path: modelPath(model) });
}

export default async function ModelPage({ params }: Props) {
  const { model, catalog } = await loadModel(params);
  const specs = catalog.includedSpecs.filter((spec) => spec.isActive && (!spec.modelId || spec.modelId === model.id));
  const otherModels = catalog.models.filter((item) => item.isActive && item.id !== model.id);
  const schema = [modelStructuredData(model), breadcrumbData([{ name: '홈', path: '/' }, { name: '제품 소개', path: '/products' }, { name: model.nameKo, path: modelPath(model) }])];
  return (
    <article lang="ko" className="bg-white px-5 py-12 text-gray-900 md:px-8 md:py-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdHtml(schema) }} />
      <div className="mx-auto max-w-[1040px]">
        <nav aria-label="현재 위치" className="mb-10 text-sm text-gray-600"><Link href="/">홈</Link> / <Link href="/products">제품 소개</Link> / {model.nameKo}</nav>
        <h1 className="text-4xl font-bold leading-tight md:text-5xl">{model.nameKo}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 break-keep">{modelSummary(model)}</p>
        <dl className="mt-10 grid grid-cols-2 gap-x-6 border-y border-gray-300 py-6 md:grid-cols-4">
          {[["폭 × 길이", `${model.widthM}m × ${model.lengthM}m`], ['면적', `${model.areaSqm}㎡`], ['기본 제품가', `${model.basePrice.toLocaleString('ko-KR')}원`], ['제작 방식', '선택 사양에 따른 주문 제작']].map(([label, value]) => <div key={label} className="py-3"><dt className="text-sm text-gray-600">{label}</dt><dd className="mt-2 font-bold tabular-nums">{value}</dd></div>)}
        </dl>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link href={modelConfigurePath(catalog, model)} className="inline-flex min-h-12 items-center bg-primary px-6 font-bold text-black hover:bg-primary-dark">이 모델로 구성하기 →</Link>
          <Link href="/support#consult" className="inline-flex min-h-12 items-center border border-gray-400 px-6 font-medium">설치 조건 상담하기</Link>
        </div>
        <section className="mt-16 border-t border-gray-200 pt-8">
          <h2 className="text-2xl font-bold">기본 사양과 선택 옵션</h2>
          {specs.length > 0 ? <ul className="mt-6 grid gap-x-8 gap-y-4 md:grid-cols-2">{specs.map((spec) => <li key={spec.id} className="border-b border-gray-100 pb-4"><h3 className="font-semibold">{spec.nameKo}</h3>{spec.descriptionKo && <p className="mt-1 text-sm leading-6 text-gray-600">{spec.descriptionKo}</p>}</li>)}</ul> : <p className="mt-4 leading-7 text-gray-600">기본 포함 사양은 구성 페이지에서 확인할 수 있습니다.</p>}
          <p className="mt-6 leading-7 text-gray-600">외장, 창호, 실내 마감, 가구와 설비를 구성 페이지에서 선택할 수 있습니다. 옵션별로 기본 포함, 추가 금액, 상담 필요 여부가 표시됩니다. 선택할 수 있는 옵션은 모델에 따라 다릅니다.</p>
        </section>
        <section className="mt-12 border-t border-gray-200 pt-8">
          <h2 className="text-2xl font-bold">표시 가격에 운반·설치도 포함되나요?</h2>
          <p className="mt-4 leading-8">포함되지 않습니다. 표시한 금액은 기본 제품가입니다. 선택한 유상 옵션, 운반·크레인, 기초 공사, 전기·상하수도 연결 등은 별도로 확인해야 합니다. 견적서에서 공사 범위와 부가세 포함 여부를 함께 확인해 주세요.</p>
          <Link href={COST_GUIDE_PATH} className="mt-4 inline-block py-2 font-semibold underline underline-offset-4">총비용 확인 항목 보기 →</Link>
        </section>
        <section className="mt-12 border-t border-gray-200 pt-8">
          <h2 className="text-2xl font-bold">이 크기면 어디에나 설치할 수 있나요?</h2>
          <p className="mt-4 leading-8">규격만으로 설치 가능 여부가 결정되지는 않습니다. 사용할 용도, 부지의 지목·용도지역, 진입로, 기반 시설과 관할 지자체의 절차를 확인해야 합니다. 모델 이름이나 면적이 건축물 용도 또는 인허가를 보장하지 않습니다.</p>
        </section>
        {otherModels.length > 0 && <section className="mt-12 border-t border-gray-200 pt-8"><h2 className="text-xl font-bold">다른 규격 비교</h2><ul className="mt-4 space-y-3">{otherModels.map((item) => <li key={item.id}><Link className="inline-block py-2 underline underline-offset-4" href={modelPath(item)}>{item.nameKo} · {item.areaSqm}㎡ · 기본가 {item.basePrice.toLocaleString('ko-KR')}원</Link></li>)}</ul></section>}
        <p className="mt-12 text-sm leading-6 text-gray-600">정보 제공: 주식회사 위트. 규격·가격·기본 사양은 맞춤 구성의 공개 카탈로그와 연동되며, 실제 계약 조건은 상담과 견적서로 확인합니다.</p>
      </div>
    </article>
  );
}

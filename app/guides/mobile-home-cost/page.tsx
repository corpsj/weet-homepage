import Link from 'next/link';
import ModelLinks from '@/components/products/ModelLinks';
import { getPublicCustomizeCatalog } from '@/app/actions/customize-actions';
import { buildPageMetadata } from '@/lib/seo';
import { absoluteUrl } from '@/lib/site';
import { jsonLdHtml } from '@/lib/json-ld';
import { breadcrumbData, COST_GUIDE_PATH, COST_GUIDE_UPDATED } from '@/lib/model-pages';

export const revalidate = 300;
export const metadata = buildPageMetadata({ title: '이동식주택 비용 — 제품가와 현장 비용 확인하기', description: '위트 3x6·3x9 이동식주택의 기본 제품가와 별도 비용을 확인하세요. 옵션, 운반, 크레인, 기초, 전기·상하수도 공사를 나눠 견적을 준비하는 방법을 안내합니다.', path: COST_GUIDE_PATH });

const costs = [
  ['제품', '선택 모델의 기본가', '규격, 기본 포함 사양'],
  ['옵션', '선택한 유상 옵션', '고정 금액인지, 별도 상담 항목인지'],
  ['운반·크레인', '출고지에서 현장까지의 이동과 양중', '현장 위치, 차량 진입, 작업 반경, 전선·수목 등 장애물'],
  ['기초·토목', '제품을 놓을 현장 준비', '지반, 높이 차이, 기초 방식, 배수'],
  ['전기·급배수', '사용을 위한 기반 시설 연결', '인입 위치와 거리, 기존 시설, 정화조 필요 여부'],
  ['행정·기타', '용도와 지역에 따른 확인 사항', '설계·인허가 범위, 적용 세금, 별도 공사와 계약 주체'],
];

export default async function CostGuidePage() {
  const catalog = await getPublicCustomizeCatalog();
  const schema = [{ '@context': 'https://schema.org', '@type': 'WebPage', '@id': `${absoluteUrl(COST_GUIDE_PATH)}#webpage`, url: absoluteUrl(COST_GUIDE_PATH), name: '이동식주택 비용 — 제품가와 현장 비용 확인하기', inLanguage: 'ko-KR', dateModified: COST_GUIDE_UPDATED, publisher: { '@id': `${absoluteUrl('/')}#organization` } }, breadcrumbData([{ name: '홈', path: '/' }, { name: '이동식주택 비용 안내', path: COST_GUIDE_PATH }])];
  return (
    <article lang="ko" className="bg-white text-gray-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdHtml(schema) }} />
      <div className="mx-auto max-w-[1040px] px-5 py-12 md:px-8 md:py-20">
        <nav aria-label="현재 위치" className="mb-10 text-sm text-gray-600"><Link href="/">홈</Link> / 이동식주택 비용 안내</nav>
        <h1 className="max-w-3xl text-3xl font-bold leading-tight break-keep md:text-5xl">이동식주택 가격, 어디까지 포함된 금액인가요?</h1>
        <p className="mt-6 text-lg leading-8 break-keep">위트의 기본 제품가는 선택 옵션과 현장 비용을 제외한 금액입니다. 실제 예산은 제품, 옵션, 운반·설치, 부지 공사 비용을 나눠 확인해야 합니다. 같은 모델도 현장 위치와 준비 상태에 따라 최종 견적이 달라집니다.</p>
        <p className="mt-6 text-sm text-gray-600">주식회사 위트 · 안내 수정 <time dateTime={COST_GUIDE_UPDATED}>2026년 9월 22일</time></p>
        <section className="mt-14">
          <h2 className="text-2xl font-bold">견적서에서 구분할 여섯 가지</h2>
          <div className="mt-6 overflow-x-auto" tabIndex={0} role="region" aria-label="견적 비용 항목 표">
            <table className="w-full min-w-[580px] border-collapse text-left text-sm leading-7">
              <caption className="sr-only">이동식주택 비용 항목별 범위와 확인할 조건</caption>
              <thead className="border-y-2 border-black"><tr>{['항목', '비용 범위', '상담 전에 확인할 것'].map((label) => <th key={label} scope="col" className="px-3 py-4">{label}</th>)}</tr></thead>
              <tbody>{costs.map(([name, scope, check]) => <tr key={name} className="border-b border-gray-200"><th scope="row" className="whitespace-nowrap px-3 py-4 font-semibold">{name}</th><td className="px-3 py-4">{scope}</td><td className="px-3 py-4">{check}</td></tr>)}</tbody>
            </table>
          </div>
          <p className="mt-4 text-sm leading-7 text-gray-600">모든 공사가 위트 견적에 자동 포함되는 것은 아닙니다. 담당 업체, 공사 범위, 포함·제외 항목과 부가세를 견적서에 구분해 확인하세요.</p>
        </section>
        <section className="mt-14 border-t border-gray-200 pt-8">
          <h2 className="text-2xl font-bold">구성 페이지의 예상 금액은 어떻게 계산되나요?</h2>
          <p className="mt-4 leading-8">모델 기본가에 선택한 고정 금액 옵션을 더합니다. ‘상담’으로 표시되는 옵션과 운반·설치·현장 공사는 합계에 반영되지 않으므로, 화면의 예상 금액만으로 전체 예산을 확정하지 마세요. 구성을 저장하거나 링크를 공유하면 같은 선택 내역으로 상담할 수 있습니다.</p>
        </section>
        <section className="mt-14 border-t border-gray-200 pt-8">
          <h2 className="text-2xl font-bold">상담 전에 준비할 정보</h2>
          <ol className="mt-5 list-decimal space-y-3 pl-5 leading-8">
            <li>설치 예정 지역과 사용 목적을 정리합니다. 부지가 아직 없으면 미정이라고 알려주세요.</li>
            <li>부지가 있다면 진입로와 설치 위치 사진, 차량 접근과 크레인 작업 공간을 확인합니다.</li>
            <li>전기·수도·배수 시설의 유무, 원하는 일정, 전체 예산 범위를 적습니다.</li>
            <li>건축물 용도와 필요한 절차는 토지 정보와 함께 관할 지자체에 확인합니다. 크기만으로 설치 가능 여부를 판단하지 않습니다.</li>
          </ol>
          <p className="mt-5 text-sm leading-7 text-gray-600">토지 정보 확인: <a href="https://www.eum.go.kr/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">토지이음</a>. 공개 토지 정보만으로 최종 인허가가 결정되지는 않습니다.</p>
        </section>
        <div className="mt-14 flex flex-wrap gap-4"><Link className="inline-flex min-h-12 items-center bg-primary px-6 font-bold text-black" href="/customize">모델·옵션 구성하기 →</Link><Link className="inline-flex min-h-12 items-center border border-gray-400 px-6" href="/support#consult">설치 조건 상담하기</Link></div>
      </div>
      <ModelLinks models={catalog.models} />
    </article>
  );
}

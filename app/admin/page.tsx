import Link from 'next/link';
import {
  BarChart3,
  CheckCircle2,
  FolderKanban,
  MessageSquare,
  Package,
  ShieldCheck,
  SlidersHorizontal,
  Search,
  Monitor,
  Link2,
} from 'lucide-react';
import { requireAdmin } from '@/lib/admin-auth';
import { getSupabaseAdmin } from '@/lib/supabase';
import {
  ConsolePageHeader,
  ConsolePanel,
  ConsoleSectionTitle,
  ConsoleStatusPill,
  consoleInputClass,
  consoleSecondaryButtonClass,
} from '@/components/admin/ConsolePrimitives';

export const dynamic = 'force-dynamic';

type CountResult = {
  count: number | null;
  error: string | null;
};

async function getCount(table: string, filters?: (query: any) => any) {
  try {
    const admin = getSupabaseAdmin();
    let query = admin.from(table as never).select('id', { count: 'exact', head: true });
    if (filters) query = filters(query);
    const { count, error } = await query;
    if (error) return { count: null, error: error.message };
    return { count: count || 0, error: null };
  } catch (error) {
    return {
      count: null,
      error: error instanceof Error ? error.message : 'Unknown count error',
    };
  }
}

function CountBadge({
  result,
  suffix,
  dangerWhenZero = false,
}: {
  result: CountResult;
  suffix: string;
  dangerWhenZero?: boolean;
}) {
  if (result.error) {
    return <ConsoleStatusPill tone="danger">연결 오류</ConsoleStatusPill>;
  }

  const count = result.count || 0;
  return (
    <ConsoleStatusPill tone={dangerWhenZero && count === 0 ? 'danger' : 'success'}>
      {count}{suffix}
    </ConsoleStatusPill>
  );
}

export default async function AdminPage() {
  await requireAdmin();

  const [activeProducts, newConsultations, projects, activeOptions] = await Promise.all([
    getCount('products', (query) => query.eq('is_active', true)),
    getCount('customize_consultations', (query) => query.eq('status', '신규')),
    getCount('projects'),
    getCount('customize_options', (query) => query.eq('is_active', true)),
  ]);

  const hasCountError = [activeProducts, newConsultations, projects, activeOptions].some(result => result.error);
  const activeProductCount = activeProducts.count || 0;
  const newConsultationCount = newConsultations.count || 0;

  const quickActions = [
    { title: '신규 상담', href: '/admin/consultations', icon: MessageSquare, urgent: !newConsultations.error && newConsultationCount > 0 },
    { title: '제품 구성', href: '/admin/products', icon: Package, urgent: !activeProducts.error && activeProductCount === 0 },
    { title: '주문 구성 관리', href: '/admin/customize', icon: SlidersHorizontal },
    { title: '프로젝트 등록', href: '/admin/projects', icon: FolderKanban },
    { title: '랜딩 페이지', href: '/admin/main', icon: Monitor },
    { title: '캠페인 링크 생성', href: '/admin/utm', icon: Link2 },
  ];

  return (
    <div className="space-y-6">
      <ConsolePageHeader
        eyebrow="WEET OPERATIONS"
        title="작업실"
        description="운영 업무, 고객 상담, 콘텐츠 상태를 통합 관리하는 워크벤치입니다."
        actions={
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="명령 및 검색 (준비 중)"
              className={`${consoleInputClass} w-full pl-9 bg-white`}
              disabled
            />
          </div>
        }
      />

      <div className="grid gap-6 xl:grid-cols-[240px_1fr_280px] items-start">
        {/* Left: Workflow Lane */}
        <div className="space-y-6">
          <section>
            <ConsoleSectionTitle>운영 상태</ConsoleSectionTitle>
            <ConsolePanel className="divide-y divide-[#e5e5df]">
              <div className="flex items-center justify-between p-3">
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-semibold text-gray-900">공개 제품</span>
                </div>
                <CountBadge result={activeProducts} suffix="개" dangerWhenZero />
              </div>
              <div className="flex items-center justify-between p-3">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-semibold text-gray-900">활성 옵션</span>
                </div>
                {activeOptions.error ? (
                  <ConsoleStatusPill tone="danger">연결 오류</ConsoleStatusPill>
                ) : (
                  <span className="text-sm font-bold text-gray-600">{activeOptions.count || 0}개</span>
                )}
              </div>
              <div className="flex items-center justify-between p-3">
                <div className="flex items-center gap-2">
                  <FolderKanban className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-semibold text-gray-900">프로젝트</span>
                </div>
                {projects.error ? (
                  <ConsoleStatusPill tone="danger">연결 오류</ConsoleStatusPill>
                ) : (
                  <span className="text-sm font-bold text-gray-600">{projects.count || 0}건</span>
                )}
              </div>
            </ConsolePanel>
          </section>

          <section>
            <ConsoleSectionTitle>시스템 검증</ConsoleSectionTitle>
            <ConsolePanel className="p-3 space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <div className="flex-1">
                  <p className="text-xs font-bold text-gray-900">도면 정합성</p>
                  <p className="text-[11px] text-gray-500">단일 렌더링 검증 완료</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-4 w-4 text-green-600" />
                <div className="flex-1">
                  <p className="text-xs font-bold text-gray-900">보안 및 접근</p>
                  <p className="text-[11px] text-gray-500">관리자 인증 유지</p>
                </div>
              </div>
            </ConsolePanel>
          </section>
        </div>

        {/* Center: Real Task Queue */}
        <div className="space-y-6">
          <ConsoleSectionTitle>우선 처리 큐</ConsoleSectionTitle>
          <ConsolePanel className="flex flex-col min-h-[400px] border-gray-200">
            {hasCountError ? (
              <div className="border-b border-[#e5e5df] bg-red-50 p-6">
                <p className="text-sm font-black text-red-900">운영 데이터 연결을 확인해야 합니다.</p>
                <p className="mt-2 text-xs font-medium leading-5 text-red-700">
                  상담, 제품, 프로젝트, 옵션 중 일부 현황을 불러오지 못했습니다. 0건으로 간주하지 않고 연결 오류로 표시합니다.
                </p>
              </div>
            ) : null}

            {!newConsultations.error && newConsultationCount > 0 ? (
              <div className="p-0">
                <div className="border-b border-[#e5e5df] bg-gray-50 p-3 flex justify-between items-center">
                  <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-yellow-500" />
                    신규 상담 요청 ({newConsultationCount}건)
                  </h3>
                  <Link href="/admin/consultations" className="text-xs font-bold text-blue-600 hover:underline">
                    모두 보기
                  </Link>
                </div>
                <div className="p-6 text-center">
                  <MessageSquare className="h-8 w-8 text-yellow-500 mx-auto mb-3" />
                  <p className="text-sm font-semibold text-gray-900">확인 대기 중인 상담이 있습니다.</p>
                  <p className="text-xs text-gray-500 mt-1">고객의 구성 내역과 현장 조건을 빠르게 확인하세요.</p>
                  <Link
                    href="/admin/consultations"
                    className={`${consoleSecondaryButtonClass} mt-4`}
                  >
                    상담 큐 열기
                  </Link>
                </div>
              </div>
            ) : (
              <div className="flex flex-1 flex-col items-center justify-center p-8 text-center text-gray-400">
                <CheckCircle2 className="h-10 w-10 mb-4 opacity-50" />
                <p className="text-sm font-bold text-gray-600">
                  {newConsultations.error ? '상담 현황을 불러오지 못했습니다.' : '처리할 신규 상담이 없습니다.'}
                </p>
                <p className="text-xs mt-2">
                  {newConsultations.error ? '연결 상태를 확인한 뒤 다시 시도하세요.' : '모든 고객 요청이 처리되었습니다.'}
                </p>
              </div>
            )}

            {!activeProducts.error && activeProductCount === 0 && (
              <div className="border-t border-[#e5e5df]">
                <div className="border-b border-[#e5e5df] bg-red-50 p-3 flex justify-between items-center">
                  <h3 className="text-sm font-bold text-red-900 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500" />
                    제품 노출 없음
                  </h3>
                </div>
                <div className="p-6">
                  <p className="text-sm font-semibold text-gray-900">공개된 제품이 없습니다.</p>
                  <p className="text-xs text-gray-500 mt-1">고객이 구매 화면을 볼 수 있도록 제품을 노출 상태로 변경하세요.</p>
                  <Link href="/admin/products" className={`${consoleSecondaryButtonClass} mt-4`}>
                    제품 관리로 이동
                  </Link>
                </div>
              </div>
            )}
          </ConsolePanel>
        </div>

        {/* Right: Quick Action Panel */}
        <div className="space-y-6">
          <ConsoleSectionTitle>빠른 실행</ConsoleSectionTitle>
          <ConsolePanel className="p-2 space-y-1">
            {quickActions.map((action) => (
              <Link
                key={action.title}
                href={action.href}
                className="group flex items-center justify-between rounded-md px-3 py-2 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <action.icon className="h-4 w-4 text-gray-500 group-hover:text-gray-900" />
                  <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                    {action.title}
                  </span>
                </div>
                {action.urgent && (
                  <span className="h-2 w-2 rounded-full bg-yellow-500" />
                )}
              </Link>
            ))}
          </ConsolePanel>

          <ConsoleSectionTitle>분석 및 도구</ConsoleSectionTitle>
          <ConsolePanel className="p-2 space-y-1">
            <Link
              href="/admin/insights"
              className="group flex items-center justify-between rounded-md px-3 py-2 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <BarChart3 className="h-4 w-4 text-gray-500 group-hover:text-gray-900" />
                <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                  고객 인사이트
                </span>
              </div>
            </Link>
          </ConsolePanel>
        </div>
      </div>
    </div>
  );
}

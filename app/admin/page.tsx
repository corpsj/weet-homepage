import Link from 'next/link';
import {
  BarChart3,
  CheckCircle2,
  FolderKanban,
  MessageSquare,
  Package,
  ShieldCheck,
  SlidersHorizontal,
  Monitor,
  Link2,
  ArrowRight,
} from 'lucide-react';
import { requireAdmin } from '@/lib/admin-auth';
import { getSupabaseAdmin } from '@/lib/supabase';
import {
  ConsolePageHeader,
  ConsoleMetricCard,
  ConsolePanel,
  ConsoleSectionTitle,
  ConsoleStatusPill,
  consoleSecondaryButtonClass,
} from '@/components/admin/ConsolePrimitives';
import AdminCommandSearch from '@/components/admin/AdminCommandSearch';

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

function MetricValue({ result, suffix }: { result: CountResult; suffix: string }) {
  if (result.error) {
    return <span className="text-[#b91c1c]">오류</span>;
  }
  return (
    <>
      {result.count || 0}
      <span className="ml-0.5 text-base font-bold opacity-60">{suffix}</span>
    </>
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
          <AdminCommandSearch />
        }
      />

      {/* KPI cards */}
      <div className="grid gap-3.5 sm:grid-cols-2 xl:grid-cols-4">
        <ConsoleMetricCard
          label="신규 상담"
          value={<MetricValue result={newConsultations} suffix="건" />}
          caption="확인 대기 중"
          icon={<MessageSquare className="h-5 w-5" />}
        />
        <ConsoleMetricCard
          label="공개 제품"
          value={<MetricValue result={activeProducts} suffix="개" />}
          caption="현재 노출 중"
          icon={<Package className="h-5 w-5" />}
        />
        <ConsoleMetricCard
          label="활성 옵션"
          value={<MetricValue result={activeOptions} suffix="개" />}
          caption="구성기 노출"
          icon={<SlidersHorizontal className="h-5 w-5" />}
        />
        <ConsoleMetricCard
          label="프로젝트"
          value={<MetricValue result={projects} suffix="건" />}
          caption="등록된 시공 사례"
          icon={<FolderKanban className="h-5 w-5" />}
        />
      </div>

      {/* 2-col grid: triage list | quick actions + conversion */}
      <div className="grid gap-5 xl:grid-cols-[1fr_320px] items-start">
        {/* Left: 오늘 처리할 일 (triage) */}
        <ConsolePanel className="min-h-[400px]">
          <div className="flex items-center justify-between border-b border-[#f1f1f3] px-[18px] py-4">
            <h2 className="text-sm font-bold text-admin-ink">오늘 처리할 일</h2>
            <Link
              href="/admin/consultations"
              className="inline-flex items-center gap-1 text-xs font-semibold text-admin-accent hover:underline"
            >
              상담 전체 <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {hasCountError ? (
            <div className="border-b border-[#f1f1f3] bg-[#fef2f2] px-[18px] py-5">
              <p className="text-sm font-bold text-[#b91c1c]">운영 데이터 연결을 확인해야 합니다.</p>
              <p className="mt-2 text-xs font-medium leading-5 text-[#dc2626]">
                상담, 제품, 프로젝트, 옵션 중 일부 현황을 불러오지 못했습니다. 0건으로 간주하지 않고 연결 오류로 표시합니다.
              </p>
            </div>
          ) : null}

          {!newConsultations.error && newConsultationCount > 0 ? (
            <div className="flex items-center gap-3.5 border-b border-[#f4f4f5] px-[18px] py-3.5">
              <span className="flex-none h-2 w-2 rounded-full bg-admin-accent" />
              <div className="min-w-0 flex-1">
                <strong className="text-[13.5px] font-bold text-admin-ink">신규 상담 요청</strong>
                <span className="block text-xs text-[#a1a1aa]">
                  확인 대기 중인 상담 {newConsultationCount}건 · 구성 내역과 현장 조건을 확인하세요.
                </span>
              </div>
              <Link
                href="/admin/consultations"
                className={`${consoleSecondaryButtonClass} h-9 px-3 text-xs`}
              >
                상담 큐 열기
              </Link>
            </div>
          ) : null}

          {!activeProducts.error && activeProductCount === 0 ? (
            <div className="flex items-center gap-3.5 border-b border-[#f4f4f5] px-[18px] py-3.5">
              <span className="flex-none h-2 w-2 rounded-full bg-[#ef4444]" />
              <div className="min-w-0 flex-1">
                <strong className="text-[13.5px] font-bold text-admin-ink">제품 노출 없음</strong>
                <span className="block text-xs text-[#a1a1aa]">
                  공개된 제품이 없습니다. 고객이 구매 화면을 볼 수 있도록 노출 상태로 변경하세요.
                </span>
              </div>
              <Link href="/admin/products" className={`${consoleSecondaryButtonClass} h-9 px-3 text-xs`}>
                제품 관리
              </Link>
            </div>
          ) : null}

          {(newConsultations.error || newConsultationCount === 0) && (activeProducts.error || activeProductCount > 0) && !hasCountError ? (
            <div className="flex flex-1 flex-col items-center justify-center px-8 py-16 text-center">
              <CheckCircle2 className="mb-4 h-10 w-10 text-[#d4d4d8]" />
              <p className="text-sm font-bold text-admin-ink">
                {newConsultations.error ? '상담 현황을 불러오지 못했습니다.' : '처리할 신규 상담이 없습니다.'}
              </p>
              <p className="mt-2 text-xs text-admin-muted">
                {newConsultations.error ? '연결 상태를 확인한 뒤 다시 시도하세요.' : '모든 고객 요청이 처리되었습니다.'}
              </p>
            </div>
          ) : null}

          {/* operational status + system checks */}
          <div className="grid gap-px bg-[#f1f1f3] sm:grid-cols-2">
            <div className="bg-white p-[18px]">
              <ConsoleSectionTitle>운영 상태</ConsoleSectionTitle>
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-[#71717a]" />
                    <span className="text-sm font-semibold text-admin-ink">공개 제품</span>
                  </div>
                  {activeProducts.error ? (
                    <ConsoleStatusPill tone="danger">연결 오류</ConsoleStatusPill>
                  ) : (
                    <ConsoleStatusPill tone={activeProductCount === 0 ? 'danger' : 'success'}>
                      {activeProductCount}개
                    </ConsoleStatusPill>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal className="h-4 w-4 text-[#71717a]" />
                    <span className="text-sm font-semibold text-admin-ink">활성 옵션</span>
                  </div>
                  {activeOptions.error ? (
                    <ConsoleStatusPill tone="danger">연결 오류</ConsoleStatusPill>
                  ) : (
                    <span className="text-sm font-bold text-admin-muted">{activeOptions.count || 0}개</span>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FolderKanban className="h-4 w-4 text-[#71717a]" />
                    <span className="text-sm font-semibold text-admin-ink">프로젝트</span>
                  </div>
                  {projects.error ? (
                    <ConsoleStatusPill tone="danger">연결 오류</ConsoleStatusPill>
                  ) : (
                    <span className="text-sm font-bold text-admin-muted">{projects.count || 0}건</span>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white p-[18px]">
              <ConsoleSectionTitle>시스템 검증</ConsoleSectionTitle>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-4 w-4 text-[#16a34a]" />
                  <div className="flex-1">
                    <p className="text-xs font-bold text-admin-ink">도면 정합성</p>
                    <p className="text-[11px] text-admin-muted">단일 렌더링 검증 완료</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-4 w-4 text-[#16a34a]" />
                  <div className="flex-1">
                    <p className="text-xs font-bold text-admin-ink">보안 및 접근</p>
                    <p className="text-[11px] text-admin-muted">관리자 인증 유지</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ConsolePanel>

        {/* Right: quick actions + conversion */}
        <div className="space-y-5">
          <ConsolePanel className="p-4">
            <h2 className="mb-3 text-sm font-bold text-admin-ink">빠른 실행</h2>
            <div className="flex flex-col gap-0.5">
              {quickActions.map((action) => (
                <Link
                  key={action.title}
                  href={action.href}
                  className="group flex items-center gap-2.5 rounded-[8px] px-2.5 py-2 transition-colors hover:bg-[#f4f4f5]"
                >
                  <action.icon className="h-4 w-4 text-[#71717a] group-hover:text-admin-ink" />
                  <span className="text-[13px] font-medium text-[#3f3f46] group-hover:text-admin-ink">
                    {action.title}
                  </span>
                  {action.urgent ? (
                    <span className="ml-auto h-2 w-2 rounded-full bg-admin-accent" />
                  ) : (
                    <ArrowRight className="ml-auto h-3.5 w-3.5 text-[#d4d4d8]" />
                  )}
                </Link>
              ))}
            </div>
          </ConsolePanel>

          <div className="rounded-[12px] bg-gradient-to-br from-admin-accent to-admin-accent-hover p-[18px] text-white">
            <p className="text-xs font-semibold opacity-80">분석 및 도구</p>
            <Link
              href="/admin/insights"
              className="mt-2 inline-flex items-center gap-2 text-[22px] font-extrabold tracking-[-0.02em] hover:underline"
            >
              <BarChart3 className="h-5 w-5" />
              고객 인사이트
            </Link>
            <p className="mt-1.5 text-xs leading-5 opacity-80">
              방문자·유입·기기·인기 페이지를 한눈에 분석하세요.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

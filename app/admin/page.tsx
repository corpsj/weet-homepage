import Link from 'next/link';
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Clock,
  FolderKanban,
  MessageSquare,
  Package,
  ShieldCheck,
  SlidersHorizontal,
} from 'lucide-react';
import { requireAdmin } from '@/lib/admin-auth';
import { getSupabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

async function getCount(table: string, filters?: (query: any) => any) {
  try {
    const admin = getSupabaseAdmin();
    let query = admin.from(table as never).select('id', { count: 'exact', head: true });
    if (filters) query = filters(query);
    const { count, error } = await query;
    if (error) return 0;
    return count || 0;
  } catch {
    return 0;
  }
}

export default async function AdminPage() {
  await requireAdmin();

  const [activeProducts, newConsultations, projects, activeOptions] = await Promise.all([
    getCount('products', (query) => query.eq('is_active', true)),
    getCount('customize_consultations', (query) => query.eq('status', '신규')),
    getCount('projects'),
    getCount('customize_options', (query) => query.eq('is_active', true)),
  ]);

  const stats = [
    {
      label: '공개 제품',
      value: activeProducts,
      href: '/admin/products',
      icon: Package,
      tone: 'border-[#111111] bg-[#111111] text-white',
      caption: '구매자가 볼 수 있는 제품 수',
    },
    {
      label: '신규 상담',
      value: newConsultations,
      href: '/admin/consultations',
      icon: MessageSquare,
      tone: 'border-[#eab308] bg-[#eab308] text-[#111111]',
      caption: '오늘 먼저 확인할 상담',
    },
    {
      label: '프로젝트',
      value: projects,
      href: '/admin/projects',
      icon: FolderKanban,
      tone: 'border-[#e5e5e5] bg-white text-[#111111]',
      caption: '공개/관리 대상 시공 사례',
    },
    {
      label: '활성 옵션',
      value: activeOptions,
      href: '/admin/customize',
      icon: SlidersHorizontal,
      tone: 'border-[#e5e5e5] bg-white text-[#111111]',
      caption: '주문하기에서 선택 가능한 옵션',
    },
  ];

  const shortcuts = [
    { title: '제품 추가', href: '/admin/products/new', description: '제품 이미지, 스펙, 노출 상태 등록' },
    { title: '주문 구성', href: '/admin/customize', description: '모델, 옵션, 도면 이미지, 충돌 관계 관리' },
    { title: '상담 확인', href: '/admin/consultations', description: '신규 상담, 내부 메모, 처리 상태 확인' },
    { title: '웹 로그 분석', href: '/admin/insights', description: '방문자, 유입, 인기 페이지 확인' },
  ];

  const workflow = [
    {
      label: '상담 응답',
      value: newConsultations > 0 ? `${newConsultations}건 대기` : '대기 없음',
      description: newConsultations > 0 ? '견적 전화를 먼저 처리하세요.' : '신규 상담 큐가 비어 있습니다.',
      href: '/admin/consultations',
      icon: Clock,
      urgent: newConsultations > 0,
    },
    {
      label: '공개 제품',
      value: activeProducts > 0 ? '노출 중' : '노출 없음',
      description: activeProducts > 0 ? '구매 전환 흐름이 열려 있습니다.' : '제품 공개 상태를 먼저 확인하세요.',
      href: '/admin/products',
      icon: Package,
      urgent: activeProducts === 0,
    },
    {
      label: '주문 도면',
      value: activeOptions > 0 ? '옵션 활성' : '옵션 없음',
      description: '모델별 도면과 옵션 오버레이를 주기적으로 확인하세요.',
      href: '/admin/customize',
      icon: SlidersHorizontal,
      urgent: false,
    },
  ];

  const readiness = [
    { label: '도면', value: '모델별 단일 렌더링', icon: CheckCircle2 },
    { label: '상담', value: '신규 상태 큐 분리', icon: MessageSquare },
    { label: '보안', value: '관리자 권한 보호 유지', icon: ShieldCheck },
  ];

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-2 text-xs font-bold text-[#8a6a12]">WEET OPERATIONS</p>
          <h1 className="text-2xl font-black text-[#111111]">대시보드</h1>
          <p className="mt-1 text-sm font-medium text-gray-500">운영 우선순위와 핵심 워크플로우 상태입니다.</p>
        </div>
        <Link
          href="/admin/insights"
          className="inline-flex h-9 items-center gap-2 rounded bg-white border border-[#e5e5e5] px-4 text-xs font-bold text-[#111] transition-colors hover:bg-gray-50 hover:border-gray-300"
        >
          <BarChart3 className="h-4 w-4" />
          웹 로그 분석
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={`rounded-md border p-5 shadow-sm transition-colors hover:border-gray-400 ${item.tone}`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[10px] font-bold opacity-80">{item.label}</p>
                <p className="mt-2 text-3xl font-black">{item.value.toLocaleString('ko-KR')}</p>
                <p className="mt-3 text-xs opacity-70">{item.caption}</p>
              </div>
              <item.icon className="h-5 w-5 opacity-80" />
            </div>
          </Link>
        ))}
      </div>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div>
          <div className="mb-4 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#eab308]" />
            <h2 className="text-sm font-bold text-[#111111]">오늘의 운영 레일</h2>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {workflow.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="group rounded-md border border-[#e5e5e5] bg-white p-4 shadow-sm transition-colors hover:border-[#cfcfcf]"
              >
                <div className="mb-5 flex items-center justify-between gap-3">
                  <item.icon className={item.urgent ? 'h-5 w-5 text-[#b45309]' : 'h-5 w-5 text-gray-500'} />
                  <span className={item.urgent ? 'rounded bg-[#fff7ed] px-2 py-1 text-[11px] font-bold text-[#b45309]' : 'rounded bg-gray-100 px-2 py-1 text-[11px] font-bold text-gray-500'}>
                    {item.urgent ? '주의' : '정상'}
                  </span>
                </div>
                <p className="text-xs font-bold text-gray-500">{item.label}</p>
                <p className="mt-1 text-lg font-black text-[#111111]">{item.value}</p>
                <p className="mt-3 min-h-[40px] text-xs leading-5 text-gray-500">{item.description}</p>
              </Link>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-4 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#111111]" />
            <h2 className="text-sm font-bold text-[#111111]">품질 상태</h2>
          </div>
          <div className="rounded-md border border-[#e5e5e5] bg-white shadow-sm">
            {readiness.map((item, index) => (
              <div key={item.label} className={index === 0 ? 'flex items-center gap-3 p-4' : 'flex items-center gap-3 border-t border-[#f0f0f0] p-4'}>
                <item.icon className="h-4 w-4 text-[#111111]" />
                <div>
                  <p className="text-xs font-bold text-gray-500">{item.label}</p>
                  <p className="text-sm font-bold text-[#111111]">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#eab308]" />
          <h2 className="text-sm font-bold text-[#111111]">빠른 작업</h2>
        </div>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {shortcuts.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex min-h-[108px] flex-col justify-between rounded-md border border-[#e5e5e5] bg-white p-4 shadow-sm transition-colors hover:border-[#cfcfcf]"
            >
              <div>
                <p className="text-sm font-bold text-[#111111]">{item.title}</p>
                <p className="mt-2 text-xs leading-5 text-gray-500">{item.description}</p>
              </div>
              <ArrowRight className="mt-4 h-4 w-4 shrink-0 text-gray-300 transition-colors group-hover:text-[#111111]" />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

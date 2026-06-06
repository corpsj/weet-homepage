import Link from 'next/link';
import { ArrowRight, BarChart3, FolderKanban, MessageSquare, Package, SlidersHorizontal } from 'lucide-react';
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
      tone: 'bg-gray-950 text-white',
    },
    {
      label: '신규 상담',
      value: newConsultations,
      href: '/admin/consultations',
      icon: MessageSquare,
      tone: 'bg-primary text-black',
    },
    {
      label: '프로젝트',
      value: projects,
      href: '/admin/projects',
      icon: FolderKanban,
      tone: 'bg-white text-gray-950',
    },
    {
      label: '활성 옵션',
      value: activeOptions,
      href: '/admin/customize',
      icon: SlidersHorizontal,
      tone: 'bg-white text-gray-950',
    },
  ];

  const shortcuts = [
    { title: '제품 추가', href: '/admin/products/new', description: '제품 이미지, 스펙, 노출 상태를 등록합니다.' },
    { title: '주문 구성', href: '/admin/customize', description: '모델, 옵션, 평면 오버레이와 충돌 관계를 관리합니다.' },
    { title: '상담 확인', href: '/admin/consultations', description: '새 주문 상담과 내부 메모, 처리 상태를 확인합니다.' },
    { title: '웹 로그 분석', href: '/admin/insights', description: 'GA 기반 방문자, 유입, 인기 페이지 차트를 확인합니다.' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">대시보드</h1>
          <p className="mt-1 text-gray-500">자주 확인하는 운영 지표와 바로가기를 가볍게 불러옵니다.</p>
        </div>
        <Link
          href="/admin/insights"
          className="inline-flex h-10 items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
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
            className={`rounded-lg border border-gray-200 p-5 shadow-sm transition-colors hover:border-gray-400 ${item.tone}`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold opacity-70">{item.label}</p>
                <p className="mt-3 text-4xl font-black">{item.value.toLocaleString('ko-KR')}</p>
              </div>
              <item.icon className="h-6 w-6 opacity-70" />
            </div>
          </Link>
        ))}
      </div>

      <section className="rounded-lg border border-gray-200 bg-white p-6">
        <div className="mb-5">
          <h2 className="text-lg font-bold text-gray-900">빠른 작업</h2>
          <p className="mt-1 text-sm text-gray-500">반복적으로 쓰는 관리자 작업만 첫 화면에 모았습니다.</p>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {shortcuts.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex items-center justify-between gap-4 rounded-lg border border-gray-200 p-4 transition-colors hover:border-gray-400 hover:bg-gray-50"
            >
              <div>
                <p className="font-bold text-gray-950">{item.title}</p>
                <p className="mt-1 text-sm leading-6 text-gray-500">{item.description}</p>
              </div>
              <ArrowRight className="h-4 w-4 shrink-0 text-gray-400 transition-colors group-hover:text-gray-900" />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

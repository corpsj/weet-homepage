import BespokeOptionManager from '@/components/admin/bespoke/BespokeOptionManager';
import { getBespokeOptionGroupsForAdmin } from '@/app/actions/bespoke-actions';
import { AlertTriangle } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminBespokePage() {
  let groups = null;
  let setupMessage: string | null = null;

  try {
    groups = await getBespokeOptionGroupsForAdmin();
  } catch (error) {
    setupMessage = error instanceof Error ? error.message : '주문제작 옵션 데이터를 불러오지 못했습니다.';
  }

  if (groups) {
    return <BespokeOptionManager groups={groups} />;
  }

  return (
    <div className="rounded-lg border border-amber-200 bg-amber-50 p-6 text-amber-950">
      <div className="flex items-start gap-3">
        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
        <div>
          <h1 className="text-xl font-bold">주문제작 옵션 테이블 설정이 필요합니다</h1>
          <p className="mt-2 text-sm leading-6">
            {setupMessage} Supabase SQL Editor에서
            <code className="mx-1 rounded bg-white px-1.5 py-0.5 text-xs">
              supabase/migrations/202606060001_bespoke_options.sql
            </code>
            파일의 SQL을 실행하면 옵션 추가, 수정, 삭제 기능이 활성화됩니다.
          </p>
        </div>
      </div>
    </div>
  );
}

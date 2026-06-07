import UtmBuilder from '@/components/admin/utm/UtmBuilder';
import { ConsolePageHeader } from '@/components/admin/ConsolePrimitives';

export const dynamic = 'force-dynamic';

export default function AdminUtmPage() {
  return (
    <div className="space-y-6">
      <ConsolePageHeader
        eyebrow="UTM BUILDER"
        title="UTM 링크 생성기"
        description="유입경로(네이버/구글/인스타/당근/블로그/광고)를 정확히 태깅하기 위한 링크를 생성합니다."
      />

      <UtmBuilder />
    </div>
  );
}


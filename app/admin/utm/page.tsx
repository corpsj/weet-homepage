import UtmBuilder from '@/components/admin/utm/UtmBuilder';

export const dynamic = 'force-dynamic';

export default function AdminUtmPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">UTM 링크 생성기</h1>
        <p className="text-gray-500 mt-1">유입경로(네이버/구글/인스타/당근/블로그/광고)를 정확히 태깅하기 위한 링크를 생성합니다.</p>
      </div>

      <UtmBuilder />
    </div>
  );
}


import { ArrowLeft } from 'lucide-react';

/**
 * /customize 라우트 전환용 브랜드 스켈레톤. 맨몸 스피너 대신 실제 컨피규레이터의
 * 정적 크롬(앱바·스테퍼)을 그대로 렌더하고, 동적 영역(도면·요약 보드·옵션 레일)만
 * shimmer placeholder로 채워 라우트 진입 체감을 부드럽게 한다.
 * Suspense fallback이므로 서버 컴포넌트로 유지(hook/브라우저 API 금지).
 */
const STEP_LABELS = ['모델', '공간 구성', '무드 & 소재', '스마트 테크', '검토·요청'];

export default function CustomizeLoading() {
  return (
    <div className="min-h-dvh bg-weet-paper text-weet-ink" aria-busy="true" aria-live="polite">
      <span className="sr-only">맞춤 구성을 불러오는 중입니다.</span>

      {/* 앱바: 실제 ConfiguratorAppBar와 동일한 높이/배경. 텍스트는 그대로 노출해 전환 연속성 확보. */}
      <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-weet-line bg-weet-surface/95 px-4 backdrop-blur md:h-16 md:px-6">
        <span className="inline-flex items-center gap-2 text-sm font-bold text-weet-ink">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          WEET
        </span>
        <div className="text-center">
          <p className="text-sm font-black text-weet-ink">위트 맞춤제작</p>
          <p className="text-xs text-weet-muted">나만의 위트 만들기</p>
        </div>
        <div className="w-14" />
      </header>

      {/* 스테퍼: 실제 StepperBar와 동일한 높이/위치. 단계 라벨은 노출하고 상태 칩만 흐리게. */}
      <div className="sticky top-14 z-30 border-b border-weet-line bg-weet-surface/95 backdrop-blur md:top-16 lg:h-[72px]">
        <div className="mx-auto max-w-[1800px] px-4 py-2 lg:flex lg:h-full lg:items-center lg:px-10 lg:py-0">
          <p className="mb-1.5 text-[11px] font-bold text-weet-muted lg:hidden">1/{STEP_LABELS.length} 단계 · {STEP_LABELS[0]}</p>
          <ol className="flex w-full items-stretch gap-1 overflow-x-auto pb-0.5 lg:gap-2 lg:overflow-visible">
            {STEP_LABELS.map((label, index) => (
              <li key={label} className="flex min-w-0 shrink-0 items-center gap-1 lg:flex-1 lg:gap-2">
                <div className="flex min-h-10 w-full items-center justify-center gap-1.5 rounded-md border border-weet-line bg-weet-surface px-2 py-1.5 lg:justify-start lg:px-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-weet-line-2 text-[10px] font-black text-weet-muted">
                    {index + 1}
                  </span>
                  <span className="block truncate text-xs font-bold text-weet-muted">{label}</span>
                </div>
                {index < STEP_LABELS.length - 1 && (
                  <span aria-hidden="true" className="hidden h-px w-3 shrink-0 bg-weet-line-2 lg:block" />
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* 본문: 도면+요약 보드(좌) / 옵션 레일(우, 데스크톱 430px) 분할을 그대로 모사. */}
      <div className="mx-auto flex max-w-[1800px] flex-col lg:h-[calc(100dvh-136px)] lg:flex-row">
        <section className="flex flex-col lg:h-full lg:flex-1 lg:overflow-y-auto">
          <div className="flex flex-col items-center justify-center gap-5 px-4 py-5 md:px-8 md:py-8 lg:flex-1 lg:px-10 lg:py-6">
            {/* 도면 미리보기 placeholder: 실제 FloorplanPreview(max-w-[1100px], viewBox 1000x460)와 동일 비율 */}
            <div className="aspect-[1000/460] w-full max-w-[1100px] animate-pulse rounded-lg border border-weet-line bg-weet-surface" />
            {/* 요약 보드 placeholder */}
            <div className="w-full max-w-[1100px] animate-pulse rounded-lg border border-weet-line bg-weet-surface p-5">
              <div className="h-3 w-24 rounded bg-weet-line-2" />
              <div className="mt-3 h-7 w-40 rounded bg-weet-line-2" />
              <div className="mt-5 space-y-2.5">
                <div className="h-3 w-full rounded bg-weet-line-2" />
                <div className="h-3 w-5/6 rounded bg-weet-line-2" />
                <div className="h-3 w-2/3 rounded bg-weet-line-2" />
              </div>
            </div>
          </div>
        </section>

        {/* 데스크톱 옵션 레일 placeholder */}
        <aside className="hidden shrink-0 border-l border-customize-stone bg-customize-sand lg:block lg:w-[430px]">
          <div className="animate-pulse space-y-3 p-6">
            <div className="h-4 w-28 rounded bg-weet-line-2" />
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-16 w-full rounded-card border border-weet-line bg-weet-surface" />
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}

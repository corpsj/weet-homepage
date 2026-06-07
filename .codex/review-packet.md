# GPT-5.5 Pro Review Packet

Marker: WEET_REVIEW_20260607_HOME_ADMIN_MUSTFIX_CLOSURE_06
Date: 2026-06-07 KST
Workspace: /Users/zoopark-studio/Documents/dev/weet-homepage

## Active Task Brief

Weet 홈페이지 전체 프리미엄화와 관리자 콘솔 전면 재구성 작업의 GPT-5.5 Pro MUST_FIX closure review입니다. 이전 Pro review `.codex/pro-review.md` returned `VERDICT: MUST_FIX` for five concrete blockers. Codex applied those blockers and reran validation plus visual QA. Please verify whether the concrete blockers are now resolved and whether any remaining issue is a concrete MUST_FIX before commit/push/deploy.

## Current Progress / State

- Antigravity IDE was used for frontend implementation handoff earlier in this slice; Codex then patched, verified, reviewed, and applied GPT-5.5 Pro feedback.
- Image-generation instruction was updated to require Chrome/ChatGPT visible web control with `최신 • 5.5` and expanded Thinking/Pro mode; the UI guide image was regenerated through ChatGPT web control and saved in `agent-inbox/generated-ui-reference-admin-console-v2.png`.
- Previous Pro review report was exported from ChatGPT Deep Research and saved to `.codex/pro-review.md`.
- Previous Pro verdict: `MUST_FIX`.
- Applied MUST_FIX items:
  1. Notice body editing added in `SupportEditor`.
  2. FAQ/notice keypress autosave replaced with local draft + explicit save buttons.
  3. Admin count failures now display connection errors instead of fake 0 counts.
  4. Inquiry status/delete/reply paths now check server action results, show failure toast, prevent duplicate mutation, and rollback optimistic state on failure.
  5. Homepage dark-section small text contrast raised from `text-gray-500` to `text-gray-400`.
- Additional visual follow-up: mobile notice management was changed from table-only internal horizontal scroll to a mobile card editor with title/status/body/save/delete visible without horizontal overflow.

## Git Status

```
## zoo/customize-configurator...origin/zoo/customize-configurator
 M .codex/chatgpt-procedure.md
 M .codex/current-task.md
 M .codex/pro-review.md
 M .codex/review-packet.md
 M .codex/state.md
 M AGENTS.md
 M agent-inbox/UI-design.md
 M agent-inbox/findings-admin-simulation.md
 M agent-inbox/findings-public-simulation.md
 M agent-inbox/implementation-backlog.md
 M "agent-inbox/\354\273\264\355\223\250\355\204\260\354\234\240\354\246\210,\354\233\271\354\240\234\354\226\264.md"
 M app/admin/gallery/[id]/page.tsx
 M app/admin/gallery/new/page.tsx
 M app/admin/page.tsx
 M app/admin/products/[id]/page.tsx
 M app/admin/products/new/page.tsx
 M app/admin/projects/[id]/page.tsx
 M app/admin/projects/new/page.tsx
 M app/admin/settings/page.tsx
 M app/admin/utm/page.tsx
 M app/page.tsx
 M codex-loop.md
 M components/admin/AdminHeader.tsx
 M components/admin/AdminShell.tsx
 M components/admin/AdminSidebar.tsx
 M components/admin/ProductForm.tsx
 M components/admin/cms/MainCmsClient.tsx
 M components/admin/cms/SupportEditor.tsx
 M components/admin/customize/CustomizeManager.tsx
 M components/admin/gallery/GalleryForm.tsx
 M components/admin/gallery/GalleryList.tsx
 M components/admin/inquiries/InquiryList.tsx
 M components/admin/insights/AnalyticsDashboard.tsx
 M components/admin/insights/InsightsDashboard.tsx
 M components/admin/products/ProductModal.tsx
 M components/admin/projects/ProjectForm.tsx
 M components/admin/utm/UtmBuilder.tsx
 M e2e/public-pages.spec.ts
?? .codex/qa/chatgpt-pro-review-poll3.png
?? .codex/qa/chatgpt-pro-review-stuck.png
?? .codex/qa/post-pro-mustfix-20260607-v2/
?? .codex/qa/post-pro-mustfix-20260607/
?? .codex/qa/production-admin-console-0b795e5/
?? .codex/qa/visual-home-admin-20260607-final/
?? .codex/qa/visual-home-admin-20260607-prod/
?? .codex/qa/visual-home-admin-20260607/
?? agent-inbox/generated-ui-reference-admin-console-v2.png
?? test-results/

```

## Changed Files / Diff Stat

```
 .codex/chatgpt-procedure.md                        |   12 +-
 .codex/current-task.md                             |   17 +-
 .codex/pro-review.md                               |  207 +-
 .codex/review-packet.md                            | 6850 ++++++++++++++++++--
 .codex/state.md                                    |   69 +-
 AGENTS.md                                          |    2 +
 agent-inbox/UI-design.md                           |   12 +-
 agent-inbox/findings-admin-simulation.md           |   33 +
 agent-inbox/findings-public-simulation.md          |   23 +
 agent-inbox/implementation-backlog.md              |   16 +-
 ...46\210,\354\233\271\354\240\234\354\226\264.md" |    4 +-
 app/admin/gallery/[id]/page.tsx                    |   10 +-
 app/admin/gallery/new/page.tsx                     |   10 +-
 app/admin/page.tsx                                 |  384 +-
 app/admin/products/[id]/page.tsx                   |    9 +-
 app/admin/products/new/page.tsx                    |    9 +-
 app/admin/projects/[id]/page.tsx                   |   10 +-
 app/admin/projects/new/page.tsx                    |   10 +-
 app/admin/settings/page.tsx                        |   61 +-
 app/admin/utm/page.tsx                             |   12 +-
 app/page.tsx                                       |  329 +-
 codex-loop.md                                      |   10 +
 components/admin/AdminHeader.tsx                   |    2 +-
 components/admin/AdminShell.tsx                    |    4 +-
 components/admin/AdminSidebar.tsx                  |   63 +-
 components/admin/ProductForm.tsx                   |  145 +-
 components/admin/cms/MainCmsClient.tsx             |  106 +-
 components/admin/cms/SupportEditor.tsx             |  535 +-
 components/admin/customize/CustomizeManager.tsx    |  269 +-
 components/admin/gallery/GalleryForm.tsx           |   85 +-
 components/admin/gallery/GalleryList.tsx           |   79 +-
 components/admin/inquiries/InquiryList.tsx         |  180 +-
 components/admin/insights/AnalyticsDashboard.tsx   |    2 +-
 components/admin/insights/InsightsDashboard.tsx    |    6 +-
 components/admin/products/ProductModal.tsx         |   10 +-
 components/admin/projects/ProjectForm.tsx          |   88 +-
 components/admin/utm/UtmBuilder.tsx                |   88 +-
 e2e/public-pages.spec.ts                           |   17 +-
 38 files changed, 8299 insertions(+), 1479 deletions(-)

```

## Validation Commands Run After MUST_FIX

```
$ git diff --check
PASS

$ npm run lint
PASS: eslint . --max-warnings=0

$ npm test
PASS: Test Files 3 passed (3), Tests 20 passed (20)

$ npm run build
PASS: compiled, TypeScript completed, static pages generated.
Known warning only: Next.js middleware-to-proxy deprecation.

$ npx playwright test e2e/public-pages.spec.ts
PASS: 12 passed.
```

## Browser / Visual Findings After MUST_FIX

Visual QA used local production server `http://localhost:3001` after rebuilding and restarting. Temporary FAQ/notice/inquiry fixtures were created with Supabase service role and deleted in `finally`.

Screenshots:
- `.codex/qa/post-pro-mustfix-20260607-v2/desktop-home-contrast.png`
- `.codex/qa/post-pro-mustfix-20260607-v2/desktop-admin-support-notice-draft.png`
- `.codex/qa/post-pro-mustfix-20260607-v2/desktop-admin-support-faq-draft.png`
- `.codex/qa/post-pro-mustfix-20260607-v2/desktop-admin-inquiry-rollback-toast.png`
- `.codex/qa/post-pro-mustfix-20260607-v2/mobile-admin-support-notice-card.png`

QA report:
```json
{
  "checks": [
    {
      "name": "homepage transparency label class",
      "contrastClasses": "mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400",
      "ok": true
    },
    {
      "name": "notice content draft editor visible",
      "ok": true,
      "saveVisible": true
    },
    {
      "name": "faq draft editor requires explicit save",
      "ok": true,
      "dirtyVisible": true
    },
    {
      "name": "inquiry failed read update shows rollback toast",
      "ok": true
    },
    {
      "name": "mobile support notice card no horizontal overflow",
      "ok": true,
      "mobileOverflow": false,
      "mobileSaveVisible": true,
      "mobileTextareaVisible": true
    }
  ],
  "consoleErrors": [
    "Failed to load resource: the server responded with a status of 404 (Not Found)",
    "Refused to execute script from 'http://localhost:3001/_vercel/insights/script.js' because its MIME type ('text/html') is not executable, and strict MIME type checking is enabled.",
    "Failed to load resource: the server responded with a status of 404 (Not Found)",
    "Refused to execute script from 'http://localhost:3001/_vercel/insights/script.js' because its MIME type ('text/html') is not executable, and strict MIME type checking is enabled.",
    "Failed to load resource: the server responded with a status of 404 (Not Found)",
    "Refused to execute script from 'http://localhost:3001/_vercel/insights/script.js' because its MIME type ('text/html') is not executable, and strict MIME type checking is enabled.",
    "Failed to load resource: the server responded with a status of 404 (Not Found)",
    "Refused to execute script from 'http://localhost:3001/_vercel/insights/script.js' because its MIME type ('text/html') is not executable, and strict MIME type checking is enabled.",
    "Failed to load resource: net::ERR_FAILED",
    "Failed to update status: TypeError: Failed to fetch\n    at I (http://localhost:3001/_next/static/chunks/228oj19jyxe16.js:1:100147)",
    "mobile: Failed to load resource: the server responded with a status of 404 (Not Found)",
    "mobile: Refused to execute script from 'http://localhost:3001/_vercel/insights/script.js' because its MIME type ('text/html') is not executable, and strict MIME type checking is enabled.",
    "mobile: Failed to load resource: the server responded with a status of 404 (Not Found)",
    "mobile: Refused to execute script from 'http://localhost:3001/_vercel/insights/script.js' because its MIME type ('text/html') is not executable, and strict MIME type checking is enabled."
  ]
}
```

Console notes: local Vercel Insights script 404/MIME warnings are expected on localhost; the `Failed to update status` console message was intentionally induced by aborting POST to verify rollback toast.

## Current Failures Or Risks

- Commit/push/Vercel production promotion and real `we-et.com` verification are still pending for this exact post-MUST_FIX slice.
- Next.js middleware-to-proxy deprecation warning remains unrelated to this UI slice.
- Admin settings optional controls, icon-only aria labels, gallery drag alternative, and deeper write-path tests remain OPTIONAL from the prior review unless you find a concrete deploy blocker.

## Relevant Diffs For MUST_FIX Closure

```diff
diff --git a/app/admin/page.tsx b/app/admin/page.tsx
index fe6aa07..c41f22c 100644
--- a/app/admin/page.tsx
+++ b/app/admin/page.tsx
@@ -1,31 +1,69 @@
 import Link from 'next/link';
 import {
-  ArrowRight,
   BarChart3,
   CheckCircle2,
-  Clock,
   FolderKanban,
   MessageSquare,
   Package,
   ShieldCheck,
   SlidersHorizontal,
+  Search,
+  Monitor,
+  Link2,
 } from 'lucide-react';
 import { requireAdmin } from '@/lib/admin-auth';
 import { getSupabaseAdmin } from '@/lib/supabase';
+import {
+  ConsolePageHeader,
+  ConsolePanel,
+  ConsoleSectionTitle,
+  ConsoleStatusPill,
+  consoleInputClass,
+  consoleSecondaryButtonClass,
+} from '@/components/admin/ConsolePrimitives';

 export const dynamic = 'force-dynamic';

+type CountResult = {
+  count: number | null;
+  error: string | null;
+};
+
 async function getCount(table: string, filters?: (query: any) => any) {
   try {
     const admin = getSupabaseAdmin();
     let query = admin.from(table as never).select('id', { count: 'exact', head: true });
     if (filters) query = filters(query);
     const { count, error } = await query;
-    if (error) return 0;
-    return count || 0;
-  } catch {
-    return 0;
+    if (error) return { count: null, error: error.message };
+    return { count: count || 0, error: null };
+  } catch (error) {
+    return {
+      count: null,
+      error: error instanceof Error ? error.message : 'Unknown count error',
+    };
+  }
+}
+
+function CountBadge({
+  result,
+  suffix,
+  dangerWhenZero = false,
+}: {
+  result: CountResult;
+  suffix: string;
+  dangerWhenZero?: boolean;
+}) {
+  if (result.error) {
+    return <ConsoleStatusPill tone="danger">연결 오류</ConsoleStatusPill>;
   }
+
+  const count = result.count || 0;
+  return (
+    <ConsoleStatusPill tone={dangerWhenZero && count === 0 ? 'danger' : 'success'}>
+      {count}{suffix}
+    </ConsoleStatusPill>
+  );
 }

 export default async function AdminPage() {
@@ -38,184 +76,204 @@ export default async function AdminPage() {
     getCount('customize_options', (query) => query.eq('is_active', true)),
   ]);

-  const stats = [
-    {
-      label: '공개 제품',
-      value: activeProducts,
-      href: '/admin/products',
-      icon: Package,
-      tone: 'border-[#111111] bg-[#111111] text-white',
-      caption: '구매자가 볼 수 있는 제품 수',
-    },
-    {
-      label: '신규 상담',
-      value: newConsultations,
-      href: '/admin/consultations',
-      icon: MessageSquare,
-      tone: 'border-[#eab308] bg-[#eab308] text-[#111111]',
-      caption: '오늘 먼저 확인할 상담',
-    },
-    {
-      label: '프로젝트',
-      value: projects,
-      href: '/admin/projects',
-      icon: FolderKanban,
-      tone: 'border-[#e5e5e5] bg-white text-[#111111]',
-      caption: '공개/관리 대상 시공 사례',
-    },
-    {
-      label: '활성 옵션',
-      value: activeOptions,
-      href: '/admin/customize',
-      icon: SlidersHorizontal,
-      tone: 'border-[#e5e5e5] bg-white text-[#111111]',
-      caption: '주문하기에서 선택 가능한 옵션',
-    },
-  ];
+  const hasCountError = [activeProducts, newConsultations, projects, activeOptions].some(result => result.error);
+  const activeProductCount = activeProducts.count || 0;
+  const newConsultationCount = newConsultations.count || 0;

-  const shortcuts = [
-    { title: '제품 추가', href: '/admin/products/new', description: '제품 이미지, 스펙, 노출 상태 등록' },
-    { title: '주문 구성', href: '/admin/customize', description: '모델, 옵션, 도면 이미지, 충돌 관계 관리' },
-    { title: '상담 확인', href: '/admin/consultations', description: '신규 상담, 내부 메모, 처리 상태 확인' },
-    { title: '웹 로그 분석', href: '/admin/insights', description: '방문자, 유입, 인기 페이지 확인' },
+  const quickActions = [
+    { title: '신규 상담', href: '/admin/consultations', icon: MessageSquare, urgent: !newConsultations.error && newConsultationCount > 0 },
+    { title: '제품 구성', href: '/admin/products', icon: Package, urgent: !activeProducts.error && activeProductCount === 0 },
+    { title: '주문 구성 관리', href: '/admin/customize', icon: SlidersHorizontal },
+    { title: '프로젝트 등록', href: '/admin/projects', icon: FolderKanban },
+    { title: '랜딩 페이지', href: '/admin/main', icon: Monitor },
+    { title: '캠페인 링크 생성', href: '/admin/utm', icon: Link2 },
   ];

-  const workflow = [
-    {
-      label: '상담 응답',
-      value: newConsultations > 0 ? `${newConsultations}건 대기` : '대기 없음',
-      description: newConsultations > 0 ? '견적 전화를 먼저 처리하세요.' : '신규 상담 큐가 비어 있습니다.',
-      href: '/admin/consultations',
-      icon: Clock,
-      urgent: newConsultations > 0,
-    },
-    {
-      label: '공개 제품',
-      value: activeProducts > 0 ? '노출 중' : '노출 없음',
-      description: activeProducts > 0 ? '구매 전환 흐름이 열려 있습니다.' : '제품 공개 상태를 먼저 확인하세요.',
-      href: '/admin/products',
-      icon: Package,
-      urgent: activeProducts === 0,
-    },
-    {
-      label: '주문 도면',
-      value: activeOptions > 0 ? '옵션 활성' : '옵션 없음',
-      description: '모델별 도면과 옵션 오버레이를 주기적으로 확인하세요.',
-      href: '/admin/customize',
-      icon: SlidersHorizontal,
-      urgent: false,
-    },
-  ];
+  return (
+    <div className="space-y-6">
+      <ConsolePageHeader
+        eyebrow="WEET OPERATIONS"
+        title="작업실"
+        description="운영 업무, 고객 상담, 콘텐츠 상태를 통합 관리하는 워크벤치입니다."
+        actions={
+          <div className="relative w-full md:w-64">
+            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
+            <input
+              type="text"
+              placeholder="명령 및 검색 (준비 중)"
+              className={`${consoleInputClass} w-full pl-9 bg-white`}
+              disabled
+            />
+          </div>
+        }
+      />

-  const readiness = [
-    { label: '도면', value: '모델별 단일 렌더링', icon: CheckCircle2 },
-    { label: '상담', value: '신규 상태 큐 분리', icon: MessageSquare },
-    { label: '보안', value: '관리자 권한 보호 유지', icon: ShieldCheck },
-  ];
+      <div className="grid gap-6 xl:grid-cols-[240px_1fr_280px] items-start">
+        {/* Left: Workflow Lane */}
+        <div className="space-y-6">
+          <section>
+            <ConsoleSectionTitle>운영 상태</ConsoleSectionTitle>
+            <ConsolePanel className="divide-y divide-[#e5e5df]">
+              <div className="flex items-center justify-between p-3">
+                <div className="flex items-center gap-2">
+                  <Package className="h-4 w-4 text-gray-500" />
+                  <span className="text-sm font-semibold text-gray-900">공개 제품</span>
+                </div>
+                <CountBadge result={activeProducts} suffix="개" dangerWhenZero />
+              </div>
+              <div className="flex items-center justify-between p-3">
+                <div className="flex items-center gap-2">
+                  <SlidersHorizontal className="h-4 w-4 text-gray-500" />
+                  <span className="text-sm font-semibold text-gray-900">활성 옵션</span>
+                </div>
+                {activeOptions.error ? (
+                  <ConsoleStatusPill tone="danger">연결 오류</ConsoleStatusPill>
+                ) : (
+                  <span className="text-sm font-bold text-gray-600">{activeOptions.count || 0}개</span>
+                )}
+              </div>
+              <div className="flex items-center justify-between p-3">
+                <div className="flex items-center gap-2">
+                  <FolderKanban className="h-4 w-4 text-gray-500" />
+                  <span className="text-sm font-semibold text-gray-900">프로젝트</span>
+                </div>
+                {projects.error ? (
+                  <ConsoleStatusPill tone="danger">연결 오류</ConsoleStatusPill>
+                ) : (
+                  <span className="text-sm font-bold text-gray-600">{projects.count || 0}건</span>
+                )}
+              </div>
+            </ConsolePanel>
+          </section>

-  return (
-    <div className="space-y-10">
-      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
-        <div>
-          <p className="mb-2 text-xs font-bold text-[#8a6a12]">WEET OPERATIONS</p>
-          <h1 className="text-2xl font-black text-[#111111]">대시보드</h1>
-          <p className="mt-1 text-sm font-medium text-gray-500">운영 우선순위와 핵심 워크플로우 상태입니다.</p>
+          <section>
+            <ConsoleSectionTitle>시스템 검증</ConsoleSectionTitle>
+            <ConsolePanel className="p-3 space-y-3">
+              <div className="flex items-center gap-3">
+                <CheckCircle2 className="h-4 w-4 text-green-600" />
+                <div className="flex-1">
+                  <p className="text-xs font-bold text-gray-900">도면 정합성</p>
+                  <p className="text-[11px] text-gray-500">단일 렌더링 검증 완료</p>
+                </div>
+              </div>
+              <div className="flex items-center gap-3">
+                <ShieldCheck className="h-4 w-4 text-green-600" />
+                <div className="flex-1">
+                  <p className="text-xs font-bold text-gray-900">보안 및 접근</p>
+                  <p className="text-[11px] text-gray-500">관리자 인증 유지</p>
+                </div>
+              </div>
+            </ConsolePanel>
+          </section>
         </div>
-        <Link
-          href="/admin/insights"
-          className="inline-flex h-9 items-center gap-2 rounded bg-white border border-[#e5e5e5] px-4 text-xs font-bold text-[#111] transition-colors hover:bg-gray-50 hover:border-gray-300"
-        >
-          <BarChart3 className="h-4 w-4" />
-          웹 로그 분석
-        </Link>
-      </div>

-      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
-        {stats.map((item) => (
-          <Link
-            key={item.label}
-            href={item.href}
-            className={`rounded-md border p-5 shadow-sm transition-colors hover:border-gray-400 ${item.tone}`}
-          >
-            <div className="flex items-start justify-between gap-3">
-              <div>
-                <p className="text-[10px] font-bold opacity-80">{item.label}</p>
-                <p className="mt-2 text-3xl font-black">{item.value.toLocaleString('ko-KR')}</p>
-                <p className="mt-3 text-xs opacity-70">{item.caption}</p>
+        {/* Center: Real Task Queue */}
+        <div className="space-y-6">
+          <ConsoleSectionTitle>우선 처리 큐</ConsoleSectionTitle>
+          <ConsolePanel className="flex flex-col min-h-[400px] border-gray-200">
+            {hasCountError ? (
+              <div className="border-b border-[#e5e5df] bg-red-50 p-6">
+                <p className="text-sm font-black text-red-900">운영 데이터 연결을 확인해야 합니다.</p>
+                <p className="mt-2 text-xs font-medium leading-5 text-red-700">
+                  상담, 제품, 프로젝트, 옵션 중 일부 현황을 불러오지 못했습니다. 0건으로 간주하지 않고 연결 오류로 표시합니다.
+                </p>
               </div>
-              <item.icon className="h-5 w-5 opacity-80" />
-            </div>
-          </Link>
-        ))}
-      </div>
+            ) : null}

-      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
-        <div>
-          <div className="mb-4 flex items-center gap-2">
-            <span className="h-2 w-2 rounded-full bg-[#eab308]" />
-            <h2 className="text-sm font-bold text-[#111111]">오늘의 운영 레일</h2>
-          </div>
-          <div className="grid gap-3 md:grid-cols-3">
-            {workflow.map((item) => (
+            {!newConsultations.error && newConsultationCount > 0 ? (
+              <div className="p-0">
+                <div className="border-b border-[#e5e5df] bg-gray-50 p-3 flex justify-between items-center">
+                  <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
+                    <span className="w-2 h-2 rounded-full bg-yellow-500" />
+                    신규 상담 요청 ({newConsultationCount}건)
+                  </h3>
+                  <Link href="/admin/consultations" className="text-xs font-bold text-blue-600 hover:underline">
+                    모두 보기
+                  </Link>
+                </div>
+                <div className="p-6 text-center">
+                  <MessageSquare className="h-8 w-8 text-yellow-500 mx-auto mb-3" />
+                  <p className="text-sm font-semibold text-gray-900">확인 대기 중인 상담이 있습니다.</p>
+                  <p className="text-xs text-gray-500 mt-1">고객의 구성 내역과 현장 조건을 빠르게 확인하세요.</p>
+                  <Link
+                    href="/admin/consultations"
+                    className={`${consoleSecondaryButtonClass} mt-4`}
+                  >
+                    상담 큐 열기
+                  </Link>
+                </div>
+              </div>
+            ) : (
+              <div className="flex flex-1 flex-col items-center justify-center p-8 text-center text-gray-400">
+                <CheckCircle2 className="h-10 w-10 mb-4 opacity-50" />
+                <p className="text-sm font-bold text-gray-600">
+                  {newConsultations.error ? '상담 현황을 불러오지 못했습니다.' : '처리할 신규 상담이 없습니다.'}
+                </p>
+                <p className="text-xs mt-2">
+                  {newConsultations.error ? '연결 상태를 확인한 뒤 다시 시도하세요.' : '모든 고객 요청이 처리되었습니다.'}
+                </p>
+              </div>
+            )}
+
+            {!activeProducts.error && activeProductCount === 0 && (
+              <div className="border-t border-[#e5e5df]">
+                <div className="border-b border-[#e5e5df] bg-red-50 p-3 flex justify-between items-center">
+                  <h3 className="text-sm font-bold text-red-900 flex items-center gap-2">
+                    <span className="w-2 h-2 rounded-full bg-red-500" />
+                    제품 노출 없음
+                  </h3>
+                </div>
+                <div className="p-6">
+                  <p className="text-sm font-semibold text-gray-900">공개된 제품이 없습니다.</p>
+                  <p className="text-xs text-gray-500 mt-1">고객이 구매 화면을 볼 수 있도록 제품을 노출 상태로 변경하세요.</p>
+                  <Link href="/admin/products" className={`${consoleSecondaryButtonClass} mt-4`}>
+                    제품 관리로 이동
+                  </Link>
+                </div>
+              </div>
+            )}
+          </ConsolePanel>
+        </div>
+
+        {/* Right: Quick Action Panel */}
+        <div className="space-y-6">
+          <ConsoleSectionTitle>빠른 실행</ConsoleSectionTitle>
+          <ConsolePanel className="p-2 space-y-1">
+            {quickActions.map((action) => (
               <Link
-                key={item.label}
-                href={item.href}
-                className="group rounded-md border border-[#e5e5e5] bg-white p-4 shadow-sm transition-colors hover:border-[#cfcfcf]"
+                key={action.title}
+                href={action.href}
+                className="group flex items-center justify-between rounded-md px-3 py-2 hover:bg-gray-50 transition-colors"
               >
-                <div className="mb-5 flex items-center justify-between gap-3">
-                  <item.icon className={item.urgent ? 'h-5 w-5 text-[#b45309]' : 'h-5 w-5 text-gray-500'} />
-                  <span className={item.urgent ? 'rounded bg-[#fff7ed] px-2 py-1 text-[11px] font-bold text-[#b45309]' : 'rounded bg-gray-100 px-2 py-1 text-[11px] font-bold text-gray-500'}>
-                    {item.urgent ? '주의' : '정상'}
+                <div className="flex items-center gap-3">
+                  <action.icon className="h-4 w-4 text-gray-500 group-hover:text-gray-900" />
+                  <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
+                    {action.title}
                   </span>
                 </div>
-                <p className="text-xs font-bold text-gray-500">{item.label}</p>
-                <p className="mt-1 text-lg font-black text-[#111111]">{item.value}</p>
-                <p className="mt-3 min-h-[40px] text-xs leading-5 text-gray-500">{item.description}</p>
+                {action.urgent && (
+                  <span className="h-2 w-2 rounded-full bg-yellow-500" />
+                )}
               </Link>
             ))}
-          </div>
-        </div>
-
-        <div>
-          <div className="mb-4 flex items-center gap-2">
-            <span className="h-2 w-2 rounded-full bg-[#111111]" />
-            <h2 className="text-sm font-bold text-[#111111]">품질 상태</h2>
-          </div>
-          <div className="rounded-md border border-[#e5e5e5] bg-white shadow-sm">
-            {readiness.map((item, index) => (
-              <div key={item.label} className={index === 0 ? 'flex items-center gap-3 p-4' : 'flex items-center gap-3 border-t border-[#f0f0f0] p-4'}>
-                <item.icon className="h-4 w-4 text-[#111111]" />
-                <div>
-                  <p className="text-xs font-bold text-gray-500">{item.label}</p>
-                  <p className="text-sm font-bold text-[#111111]">{item.value}</p>
-                </div>
-              </div>
-            ))}
-          </div>
-        </div>
-      </section>
+          </ConsolePanel>

-      <section>
-        <div className="mb-4 flex items-center gap-2">
-          <span className="h-2 w-2 rounded-full bg-[#eab308]" />
-          <h2 className="text-sm font-bold text-[#111111]">빠른 작업</h2>
-        </div>
-        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
-          {shortcuts.map((item) => (
+          <ConsoleSectionTitle>분석 및 도구</ConsoleSectionTitle>
+          <ConsolePanel className="p-2 space-y-1">
             <Link
-              key={item.href}
-              href={item.href}
-              className="group flex min-h-[108px] flex-col justify-between rounded-md border border-[#e5e5e5] bg-white p-4 shadow-sm transition-colors hover:border-[#cfcfcf]"
+              href="/admin/insights"
+              className="group flex items-center justify-between rounded-md px-3 py-2 hover:bg-gray-50 transition-colors"
             >
-              <div>
-                <p className="text-sm font-bold text-[#111111]">{item.title}</p>
-                <p className="mt-2 text-xs leading-5 text-gray-500">{item.description}</p>
+              <div className="flex items-center gap-3">
+                <BarChart3 className="h-4 w-4 text-gray-500 group-hover:text-gray-900" />
+                <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
+                  고객 인사이트
+                </span>
               </div>
-              <ArrowRight className="mt-4 h-4 w-4 shrink-0 text-gray-300 transition-colors group-hover:text-[#111111]" />
             </Link>
-          ))}
+          </ConsolePanel>
         </div>
-      </section>
+      </div>
     </div>
   );
 }
diff --git a/app/page.tsx b/app/page.tsx
index 12106ee..f45e838 100644
--- a/app/page.tsx
+++ b/app/page.tsx
@@ -1,7 +1,7 @@
 import type { Metadata } from 'next';
 import Image from 'next/image';
 import Link from 'next/link';
-import { ArrowRight, Building2, CheckCircle2, ClipboardCheck, Clock3, Factory, Home, MapPinned, Ruler, ShieldCheck, Store, Truck, Wrench } from 'lucide-react';
+import { ArrowRight, Building2, CheckCircle2, Factory, Home, MapPinned, Ruler, Store, Truck, Wrench } from 'lucide-react';

 export const metadata: Metadata = {
   title: '홈',
@@ -12,59 +12,41 @@ export const metadata: Metadata = {
   openGraph: {
     url: '/',
     title: '위트 이동식주택',
-    description: '작고 단단한 내 집을 필요한 크기와 옵션으로 직접 구성해보세요.',
+    description: '작은 공간, 선명한 기준. 내 집을 필요한 크기와 옵션으로 직접 구성해보세요.',
   },
 };

-const processSteps = [
-  { icon: Ruler, title: '구성', text: '3x6 또는 3x9 모델과 필요한 옵션을 먼저 정리합니다.' },
-  { icon: ClipboardCheck, title: '상담', text: '예상 총액과 선택 구성을 바탕으로 설치 조건을 확인합니다.' },
-  { icon: Factory, title: '제작', text: '공장 제작 중심으로 품질 편차와 현장 시간을 줄입니다.' },
-  { icon: Truck, title: '설치', text: '운반, 설치, 마감 확인까지 순서대로 진행합니다.' },
-];
-
-const siteChecks = [
-  '진입로와 크레인 작업 가능 여부',
-  '전기·상하수 인입 조건',
-  '지목과 인허가 확인 범위',
-  '운반·설치 일정과 현장 준비 항목',
-];
-
-const buyingConfidence = [
+const transparencyFeatures = [
   {
-    icon: Clock3,
-    title: '예상 일정',
-    text: '구성 상담 후 현장 조건을 확인하고, 제작 가능 시점과 운반·설치 준비 일정을 함께 정리합니다.',
+    icon: Ruler,
+    title: '모델 및 옵션 구성',
+    text: '3x6, 3x9 등 모듈러 베이스 모델과 라이프스타일에 맞는 옵션을 온라인에서 즉시 구성하고 예상 견적을 확인할 수 있습니다.',
+  },
+  {
+    icon: Wrench,
+    title: '포함 및 별도 범위',
+    text: '제품 자체에 포함된 기본 사양과, 부지 토목·기초, 전기·상하수 인입 등 현장에서 별도로 발생하는 비용을 명확히 구분합니다.',
   },
   {
     icon: MapPinned,
-    title: '부지 준비',
-    text: '진입로, 지목, 인입, 크레인 작업 반경처럼 실제 설치를 좌우하는 항목을 먼저 확인합니다.',
+    title: '현장 설치 조건',
+    text: '진입로 폭, 크레인 작업 반경, 인허가 가능 여부 등 제품 배송 전 확인해야 할 필수 요소를 사전에 체크합니다.',
   },
   {
-    icon: ShieldCheck,
-    title: '사후 점검',
-    text: '문·창호, 욕실·설비, 마감처럼 생활 중 자주 쓰는 부분을 중심으로 인도 후 점검과 조치를 안내합니다.',
+    icon: Truck,
+    title: '운송 및 현장 조립',
+    text: '공장 제작 후 현장까지의 운송 스케줄과 안전한 설치를 위한 가이드를 제공하여 현장 체류 시간을 최소화합니다.',
   },
   {
-    icon: Wrench,
-    title: '별도 비용 안내',
-    text: '운반, 설치, 기초, 인허가, 인입 공사처럼 현장별로 달라지는 항목은 상담 단계에서 분리해 설명합니다.',
+    icon: CheckCircle2,
+    title: 'A/S 및 사후 관리',
+    text: '문·창호 단차, 욕실 누수 등 입주 후 발생할 수 있는 주요 AS 항목들에 대한 명확한 보증 기간과 대응 절차를 안내합니다.',
+  },
+  {
+    icon: Factory,
+    title: '공장 제작 기반',
+    text: '날씨와 현장 여건에 영향을 받지 않는 실내 공장 제작을 통해 일관된 시공 품질과 단축된 공기를 보장합니다.',
   },
-];
-
-const includedItems = [
-  '선택 모델과 옵션 기준 제품 견적',
-  '공장 제작 및 기본 품질 확인',
-  '상담용 구성 내역 저장',
-  '현장 조건 체크리스트 안내',
-];
-
-const excludedItems = [
-  '부지 토목·기초 공사',
-  '전기·상하수 등 인입 공사',
-  '운반·크레인·현장 설치 비용',
-  '지역별 인허가와 부대 행정 비용',
 ];

 const buyerPaths = [
@@ -87,208 +69,169 @@ const buyerPaths = [

 export default function HomePage() {
   return (
-    <main className="bg-white text-gray-900">
-      <section className="px-4 pb-14 pt-12 md:px-8 md:pb-20 md:pt-16 lg:px-16">
-        <div className="mx-auto grid max-w-[1500px] gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
-          <div className="max-w-xl">
-            <p className="mb-4 text-sm font-black uppercase tracking-[0.18em] text-gray-500">WEET MOBILE HOME</p>
-            <h1 className="text-4xl font-black leading-tight text-gray-900 md:text-6xl">
-              위트 이동식주택
+    <main className="bg-[#fbfbfa] text-[#111111] selection:bg-black selection:text-white">
+      {/* 1. First Viewport: Product-led, image-led, full-bleed hero */}
+      <section className="relative min-h-[calc(100svh-192px)] w-full bg-[#111] text-white overflow-hidden">
+        <Image
+          src="/images/hero_main.webp"
+          alt="위트 이동식주택 외관"
+          fill
+          priority
+          sizes="100vw"
+          className="object-cover opacity-60 mix-blend-overlay"
+        />
+        <div className="absolute inset-0 bg-gradient-to-b from-[#111]/40 via-transparent to-[#111]" />
+
+        <div className="absolute inset-0 flex flex-col justify-end px-6 pb-28 md:px-12 md:pb-32 lg:px-24 mx-auto w-full z-10">
+          <div className="max-w-4xl">
+            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-300">WEET MOBILE HOME</p>
+            <h1 className="text-5xl font-black leading-[1.1] md:text-7xl lg:text-[88px]">
+              작은 공간, <br />
+              선명한 기준.
             </h1>
-            <p className="mt-6 text-lg leading-8 text-gray-600 md:text-xl">
-              작고 단단한 내 집을 필요한 크기와 옵션으로 직접 구성해보세요.
+            <p className="mt-8 max-w-2xl text-sm leading-relaxed text-gray-300 md:text-base lg:text-lg">
+              이동식주택을 고를 때의 막연함을 없앱니다. <br className="hidden md:block" />
+              모델 선택부터 운송, 설치, 그리고 예상 비용까지 모든 과정을 투명하게 공개합니다.
             </p>
-            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
+            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
               <Link
                 href="/customize"
-                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-gray-900 px-5 text-sm font-bold text-white transition-colors hover:bg-gray-800"
+                className="inline-flex h-12 items-center justify-center gap-3 rounded bg-white px-8 text-sm font-bold text-[#111] transition-transform hover:scale-[1.02] active:scale-[0.98]"
               >
-                나만의 위트 만들기
+                모델 구성하기
                 <ArrowRight className="h-4 w-4" />
               </Link>
               <Link
                 href="/support"
-                className="inline-flex h-12 items-center justify-center rounded-lg border border-gray-200 bg-white px-5 text-sm font-bold text-gray-900 transition-colors hover:bg-gray-50"
+                className="inline-flex h-12 items-center justify-center rounded px-8 text-sm font-bold text-white transition-colors hover:bg-white/10"
               >
                 진행 과정 보기
               </Link>
             </div>
           </div>
+        </div>

-          <div className="relative min-h-[360px] overflow-hidden rounded-lg border border-gray-100 bg-gray-50 shadow-sm md:min-h-[520px]">
-            <Image
-              src="/images/hero_main.webp"
-              alt="위트 이동식주택 외관"
-              fill
-              priority
-              sizes="(max-width: 1024px) 100vw, 58vw"
-              className="object-cover"
-            />
-          </div>
+        {/* Scroll Hint */}
+        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-60 z-10 hidden md:flex">
+          <span className="text-[9px] font-black uppercase tracking-[0.3em]">Scroll</span>
+          <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
         </div>
       </section>

-      <section className="border-y border-gray-100 bg-gray-50 px-4 py-14 md:px-8 lg:px-16">
-        <div className="mx-auto max-w-[1500px]">
-          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
-            <div>
-              <p className="text-sm font-black text-gray-500">PROCESS</p>
-              <h2 className="mt-2 text-3xl font-black md:text-4xl text-gray-900">처음 선택부터 설치까지</h2>
+      {/* 2. Trust / Transparency Section */}
+      <section className="bg-[#111111] px-6 pt-16 pb-20 md:px-12 md:pt-20 md:pb-24 lg:px-24 lg:pt-20 lg:pb-32 text-white">
+        <div className="mx-auto max-w-7xl">
+          <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
+            <div className="max-w-2xl">
+              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">TRANSPARENCY</p>
+              <h2 className="text-3xl font-black md:text-5xl lg:text-6xl">
+                불확실성은 남기지 않습니다.
+              </h2>
             </div>
-            <p className="max-w-xl text-sm leading-7 text-gray-600">
-              고객은 먼저 구성해보고, 위트는 그 구성을 바탕으로 현장 조건과 제작 가능성을 빠르게 좁혀갑니다.
+            <p className="max-w-md text-sm leading-relaxed text-gray-400">
+              '예상치 못한 현장 비용'과 '품질 편차'. 위트는 주택 설치의 가장 큰 리스크를 제거하기 위해 모든 기준을 선명하게 설계합니다.
             </p>
           </div>

-          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
-            {processSteps.map((step) => (
-              <div key={step.title} className="rounded-lg border border-gray-100 bg-white shadow-sm p-5 transition-shadow hover:shadow-md">
-                <step.icon className="h-6 w-6 text-primary-dark" />
-                <h3 className="mt-5 text-xl font-black text-gray-900">{step.title}</h3>
-                <p className="mt-3 text-sm leading-7 text-gray-600">{step.text}</p>
+          <div className="grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
+            {transparencyFeatures.map((feature) => (
+              <div key={feature.title} className="group border-t border-white/10 pt-6">
+                <feature.icon className="h-6 w-6 text-gray-400 mb-5 transition-colors group-hover:text-white" />
+                <h3 className="text-lg font-bold">{feature.title}</h3>
+                <p className="mt-3 text-sm leading-relaxed text-gray-400">
+                  {feature.text}
+                </p>
               </div>
             ))}
           </div>
         </div>
       </section>

-      <section className="px-4 py-14 md:px-8 lg:px-16">
-        <div className="mx-auto grid max-w-[1500px] gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
-          <div className="relative min-h-[360px] overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm md:min-h-[470px]">
+      {/* 3. Immersive Image Gallery / Proof */}
+      <section className="px-4 py-8 md:px-8 lg:px-12 bg-[#111111]">
+        <div className="mx-auto max-w-[1800px] grid gap-4 md:grid-cols-2 lg:grid-cols-3">
+          <div className="relative aspect-[4/5] overflow-hidden rounded bg-gray-900 group">
             <Image
-              src="/images/company/factory.webp"
-              alt="위트 제작 현장"
+              src="/images/products/small/private/3x6-house.webp"
+              alt="생활 동선"
               fill
-              sizes="(max-width: 1024px) 100vw, 46vw"
-              className="object-cover"
+              sizes="(max-width: 768px) 100vw, 33vw"
+              className="object-cover transition-transform duration-700 group-hover:scale-105"
             />
-          </div>
-          <div>
-            <p className="text-sm font-black text-gray-500">SITE CHECK</p>
-            <h2 className="mt-2 text-3xl font-black md:text-4xl text-gray-900">좋은 선택은 현장 확인에서 완성됩니다</h2>
-            <p className="mt-5 text-base leading-8 text-gray-600">
-              이동식주택은 제품만 고르면 끝나는 일이 아닙니다. 설치할 땅의 진입, 인입, 인허가 조건을 함께 확인해야 실제 일정과 비용이 선명해집니다.
-            </p>
-            <div className="mt-7 grid gap-3 sm:grid-cols-2">
-              {siteChecks.map((item) => (
-                <div key={item} className="flex items-start gap-3 rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
-                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary-dark" />
-                  <span className="text-sm font-semibold leading-6 text-gray-800">{item}</span>
-                </div>
-              ))}
+            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
+            <div className="absolute bottom-6 left-6 right-6">
+              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">DESIGN</p>
+              <p className="text-lg font-bold text-white">최적화된 생활 동선</p>
             </div>
           </div>
-        </div>
-      </section>
-
-      <section className="border-y border-gray-100 bg-white px-4 py-14 md:px-8 lg:px-16">
-        <div className="mx-auto max-w-[1500px]">
-          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
-            <div>
-              <p className="text-sm font-black text-gray-500">BUYING CONFIDENCE</p>
-              <h2 className="mt-2 text-3xl font-black md:text-4xl text-gray-900">견적보다 먼저 불확실성을 줄입니다</h2>
+          <div className="relative aspect-[4/5] overflow-hidden rounded bg-gray-900 group hidden md:block">
+            <Image
+              src="/images/company/factory.webp"
+              alt="제작 환경"
+              fill
+              sizes="(max-width: 768px) 100vw, 33vw"
+              className="object-cover transition-transform duration-700 group-hover:scale-105"
+            />
+            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
+            <div className="absolute bottom-6 left-6 right-6">
+              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">FACTORY</p>
+              <p className="text-lg font-bold text-white">표준화된 제작 환경</p>
             </div>
-            <p className="max-w-xl text-sm leading-7 text-gray-600">
-              이동식주택은 제품 가격만으로 결정하기 어렵습니다. 위트는 제품, 현장, 일정, 별도 비용을 분리해 구매 결정을 선명하게 만듭니다.
-            </p>
-          </div>
-
-          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
-            {buyingConfidence.map((item) => (
-              <div key={item.title} className="rounded-lg border border-gray-200 bg-gray-50 p-5">
-                <item.icon className="h-6 w-6 text-gray-500" />
-                <h3 className="mt-5 text-lg font-black text-gray-900">{item.title}</h3>
-                <p className="mt-3 text-sm leading-7 text-gray-600">{item.text}</p>
-              </div>
-            ))}
           </div>
-
-          <div className="mt-6 grid gap-4 lg:grid-cols-2">
-            <div className="rounded-lg border border-gray-200 bg-white p-6">
-              <h3 className="text-xl font-black text-gray-900">기본 포함</h3>
-              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
-                {includedItems.map((item) => (
-                  <li key={item} className="flex items-start gap-3 text-sm font-semibold leading-6 text-gray-800">
-                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary-dark" />
-                    {item}
-                  </li>
-                ))}
-              </ul>
-            </div>
-            <div className="rounded-lg border border-gray-200 bg-white p-6">
-              <h3 className="text-xl font-black text-gray-900">현장별 별도 확인</h3>
-              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
-                {excludedItems.map((item) => (
-                  <li key={item} className="flex items-start gap-3 text-sm font-semibold leading-6 text-gray-800">
-                    <ClipboardCheck className="mt-0.5 h-5 w-5 shrink-0 text-gray-400" />
-                    {item}
-                  </li>
-                ))}
-              </ul>
+          <div className="relative aspect-[4/5] overflow-hidden rounded bg-gray-900 group">
+            <Image
+              src="/images/products/large/L-2.webp"
+              alt="설치 현장"
+              fill
+              sizes="(max-width: 768px) 100vw, 33vw"
+              className="object-cover transition-transform duration-700 group-hover:scale-105"
+            />
+            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
+            <div className="absolute bottom-6 left-6 right-6">
+              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">INSTALLATION</p>
+              <p className="text-lg font-bold text-white">안전한 현장 설치</p>
             </div>
           </div>
         </div>
       </section>

-      <section className="bg-gray-50 px-4 py-14 md:px-8 lg:px-16">
-        <div className="mx-auto max-w-[1500px]">
-          <div className="mb-8">
-            <p className="text-sm font-black text-gray-500">WHO IT FITS</p>
-            <h2 className="mt-2 text-3xl font-black md:text-4xl text-gray-900">사는 이유가 다른 고객에게, 확인 순서도 다르게</h2>
+      {/* 4. Target Audience */}
+      <section className="bg-[#fbfbfa] px-6 py-20 md:px-12 lg:px-24 lg:py-32">
+        <div className="mx-auto max-w-7xl">
+          <div className="mb-16">
+            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">WHO IT FITS</p>
+            <h2 className="text-3xl font-black md:text-4xl lg:text-5xl">
+              목적에 맞는 공간을 <br className="md:hidden" />
+              정확하게.
+            </h2>
           </div>
-          <div className="grid gap-4 lg:grid-cols-3">
+          <div className="grid gap-6 md:grid-cols-3">
             {buyerPaths.map((path) => (
-              <div key={path.title} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
-                <path.icon className="h-6 w-6 text-gray-500" />
-                <h3 className="mt-5 text-xl font-black text-gray-900">{path.title}</h3>
-                <p className="mt-3 text-sm leading-7 text-gray-600">{path.text}</p>
-              </div>
-            ))}
-          </div>
-        </div>
-      </section>
-
-      <section className="bg-[#1f2422] px-4 py-14 text-white md:px-8 lg:px-16">
-        <div className="mx-auto max-w-[1500px]">
-          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
-            <div>
-              <p className="text-sm font-black text-gray-400">TRUST</p>
-              <h2 className="mt-2 text-3xl font-black md:text-4xl text-white">작게 보여도, 집답게 만듭니다</h2>
-            </div>
-            <p className="max-w-xl text-sm leading-7 text-gray-300">
-              실제 제품과 제작 환경을 기반으로, 이동식주택이 필요한 사람에게 필요한 만큼의 선택지를 제공합니다.
-            </p>
-          </div>
-
-          <div className="grid gap-4 md:grid-cols-3">
-            {[
-              { src: '/images/products/medium/36+36집-1.webp', title: '생활 동선', icon: Home },
-              { src: '/images/company/workshop.webp', title: '제작 환경', icon: Factory },
-              { src: '/images/products/medium/39+33서재.webp', title: '설치 활용', icon: MapPinned },
-            ].map((item) => (
-              <div key={item.title} className="overflow-hidden rounded-lg border border-white/15 bg-white/5">
-                <div className="relative aspect-[4/3]">
-                  <Image src={item.src} alt={item.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
-                </div>
-                <div className="flex items-center gap-3 p-4">
-                  <item.icon className="h-5 w-5 text-gray-300" />
-                  <span className="font-bold text-white">{item.title}</span>
-                </div>
+              <div key={path.title} className="rounded border border-[#e5e5df] bg-white p-8 transition-shadow hover:shadow-md">
+                <path.icon className="h-6 w-6 text-gray-900 mb-6" />
+                <h3 className="text-xl font-black text-gray-900">{path.title}</h3>
+                <p className="mt-4 text-sm leading-relaxed text-gray-600">
+                  {path.text}
+                </p>
               </div>
             ))}
           </div>
         </div>
       </section>

-      <section className="px-4 py-16 md:px-8 lg:px-16 bg-white">
-        <div className="mx-auto max-w-[960px] text-center">
-          <h2 className="text-3xl font-black md:text-4xl text-gray-900">필요한 크기와 옵션부터 정해보세요</h2>
-          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-gray-600">
-            구성 결과는 상담 요청과 함께 저장되고, 위트가 현장 조건을 확인해 최종 견적과 제작 일정을 안내합니다.
+      {/* 5. CTA Section */}
+      <section className="bg-white px-6 py-24 md:px-12 lg:px-24 lg:py-32 text-center border-t border-[#e5e5df]">
+        <div className="mx-auto max-w-3xl">
+          <h2 className="text-3xl font-black md:text-5xl lg:text-6xl">
+            지금 바로 구성해보세요
+          </h2>
+          <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-gray-600 md:text-base">
+            원하는 크기와 옵션을 선택하면 예상 견적과 함께 <br className="hidden md:block" />
+            위트 매니저가 현장 조건에 맞춘 정확한 안내를 도와드립니다.
           </p>
           <Link
             href="/customize"
-            className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-gray-900 px-6 text-sm font-bold text-white transition-colors hover:bg-gray-800"
+            className="mt-10 inline-flex h-14 items-center justify-center gap-3 rounded bg-[#111111] px-10 text-sm font-bold text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
           >
             나만의 위트 만들기
             <ArrowRight className="h-4 w-4" />
diff --git a/components/admin/cms/SupportEditor.tsx b/components/admin/cms/SupportEditor.tsx
index 224478d..5f641e8 100644
--- a/components/admin/cms/SupportEditor.tsx
+++ b/components/admin/cms/SupportEditor.tsx
@@ -1,11 +1,19 @@
 'use client';

-import { useState } from 'react';
+import { Fragment, useState } from 'react';
 import { Plus, Trash2, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';
 import { toast } from 'sonner';
 import { useRouter } from 'next/navigation';
 import { createFaq, updateFaq, deleteFaq } from '@/app/actions/faq-actions';
 import { createNotice, updateNotice, deleteNotice } from '@/app/actions/notice-actions';
+import {
+    ConsolePageHeader,
+    ConsolePanel,
+    consoleInputClass,
+    consolePrimaryButtonClass,
+    consoleSecondaryButtonClass,
+    consoleIconButtonClass
+} from '@/components/admin/ConsolePrimitives';

 interface FAQ {
     id: string;
@@ -38,10 +46,59 @@ export default function SupportEditor({
     const [activeTab, setActiveTab] = useState('faq');
     const [faqs, setFAQs] = useState<FAQ[]>(initialFAQs);
     const [notices, setNotices] = useState<Notice[]>(initialNotices);
+    const [faqDrafts, setFaqDrafts] = useState<Record<string, FAQ>>({});
+    const [noticeDrafts, setNoticeDrafts] = useState<Record<string, Notice>>({});
+    const [savingItems, setSavingItems] = useState<Record<string, boolean>>({});
     const [loading, setLoading] = useState(false);
     const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
+    const [expandedNotice, setExpandedNotice] = useState<string | null>(null);
     const router = useRouter();

+    const setItemSaving = (key: string, value: boolean) => {
+        setSavingItems(prev => ({ ...prev, [key]: value }));
+    };
+
+    const getFaqDraft = (faq: FAQ) => faqDrafts[faq.id] || faq;
+    const getNoticeDraft = (notice: Notice) => noticeDrafts[notice.id] || notice;
+
+    const isFaqDirty = (faq: FAQ) => {
+        const draft = getFaqDraft(faq);
+        return (
+            draft.question_ko !== faq.question_ko ||
+            draft.answer_ko !== faq.answer_ko ||
+            (draft.question_en || '') !== (faq.question_en || '') ||
+            (draft.answer_en || '') !== (faq.answer_en || '')
+        );
+    };
+
+    const isNoticeDirty = (notice: Notice) => {
+        const draft = getNoticeDraft(notice);
+        return (
+            draft.title !== notice.title ||
+            draft.content !== notice.content ||
+            draft.is_pinned !== notice.is_pinned ||
+            draft.is_active !== notice.is_active
+        );
+    };
+
+    const handleChangeFAQDraft = (id: string, field: keyof FAQ, value: FAQ[keyof FAQ]) => {
+        const source = faqs.find(faq => faq.id === id);
+        if (!source) return;
+        setFaqDrafts(prev => ({
+            ...prev,
+            [id]: { ...(prev[id] || source), [field]: value }
+        }));
+    };
+
+    const handleChangeNoticeDraft = (id: string, field: keyof Notice, value: Notice[keyof Notice]) => {
+        const source = notices.find(notice => notice.id === id);
+        if (!source) return;
+        setNoticeDrafts(prev => ({
+            ...prev,
+            [id]: { ...(prev[id] || source), [field]: value }
+        }));
+    };
+
     // --- FAQ Handlers ---
     const handleAddFAQ = async () => {
         setLoading(true);
@@ -70,17 +127,33 @@ export default function SupportEditor({
         }
     };

-    const handleUpdateFAQ = async (id: string, field: keyof FAQ, value: any) => {
-        // Optimistic update
-        setFAQs(prev => prev.map(f => f.id === id ? { ...f, [field]: value } : f));
+    const handleSaveFAQ = async (faq: FAQ) => {
+        const draft = getFaqDraft(faq);
+        const key = `faq:${faq.id}`;
+        setItemSaving(key, true);
         try {
-            const result = await updateFaq(id, { [field]: value });
-            if (!result.success) {
-                toast.error(result.message);
-                // Rollback if needed, but for text fields usually okay to just wait for next change
+            const result = await updateFaq(faq.id, {
+                question_ko: draft.question_ko,
+                answer_ko: draft.answer_ko,
+                question_en: draft.question_en,
+                answer_en: draft.answer_en,
+            });
+            if (result.success && result.data) {
+                setFAQs(prev => prev.map(item => item.id === faq.id ? result.data as FAQ : item));
+                setFaqDrafts(prev => {
+                    const next = { ...prev };
+                    delete next[faq.id];
+                    return next;
+                });
+                toast.success('FAQ가 저장되었습니다.');
+            } else {
+                toast.error(result.message || 'FAQ 저장 실패');
             }
         } catch (e) {
             console.error(e);
+            toast.error('FAQ 저장 중 오류가 발생했습니다.');
+        } finally {
+            setItemSaving(key, false);
         }
     };

@@ -91,6 +164,11 @@ export default function SupportEditor({
             const result = await deleteFaq(id);
             if (result.success) {
                 setFAQs(prev => prev.filter(f => f.id !== id));
+                setFaqDrafts(prev => {
+                    const next = { ...prev };
+                    delete next[id];
+                    return next;
+                });
                 toast.success('FAQ가 삭제되었습니다.');
             } else {
                 toast.error(result.message);
@@ -117,6 +195,7 @@ export default function SupportEditor({
             const result = await createNotice(newNoticeData);
             if (result.success && result.data) {
                 setNotices(prev => [result.data as Notice, ...prev]);
+                setExpandedNotice(result.data.id);
                 toast.success('공지사항이 추가되었습니다.');
             } else {
                 toast.error(result.message);
@@ -129,15 +208,33 @@ export default function SupportEditor({
         }
     };

-    const handleUpdateNotice = async (id: string, field: keyof Notice, value: any) => {
-        setNotices(prev => prev.map(n => n.id === id ? { ...n, [field]: value } : n));
+    const handleSaveNotice = async (notice: Notice) => {
+        const draft = getNoticeDraft(notice);
+        const key = `notice:${notice.id}`;
+        setItemSaving(key, true);
         try {
-            const result = await updateNotice(id, { [field]: value });
-            if (!result.success) {
-                toast.error(result.message);
+            const result = await updateNotice(notice.id, {
+                title: draft.title,
+                content: draft.content,
+                is_pinned: draft.is_pinned,
+                is_active: draft.is_active,
+            });
+            if (result.success && result.data) {
+                setNotices(prev => prev.map(item => item.id === notice.id ? result.data as Notice : item));
+                setNoticeDrafts(prev => {
+                    const next = { ...prev };
+                    delete next[notice.id];
+                    return next;
+                });
+                toast.success('공지사항이 저장되었습니다.');
+            } else {
+                toast.error(result.message || '공지사항 저장 실패');
             }
         } catch (e) {
             console.error(e);
+            toast.error('공지사항 저장 중 오류가 발생했습니다.');
+        } finally {
+            setItemSaving(key, false);
         }
     };

@@ -148,6 +245,11 @@ export default function SupportEditor({
             const result = await deleteNotice(id);
             if (result.success) {
                 setNotices(prev => prev.filter(n => n.id !== id));
+                setNoticeDrafts(prev => {
+                    const next = { ...prev };
+                    delete next[id];
+                    return next;
+                });
                 toast.success('공지사항이 삭제되었습니다.');
             } else {
                 toast.error(result.message);
@@ -162,28 +264,27 @@ export default function SupportEditor({

     return (
         <div className="space-y-6">
-            <div className="flex justify-between items-center">
-                <div>
-                    <h2 className="text-2xl font-bold text-gray-900">고객지원 관리</h2>
-                    <p className="text-gray-500 text-sm mt-1">FAQ 및 공지사항을 관리합니다.</p>
-                </div>
-            </div>
+            <ConsolePageHeader
+                eyebrow="SYSTEM"
+                title="고객지원 관리"
+                description="FAQ 및 공지사항을 관리합니다."
+            />

             {/* Database Setup Error Guide */}
             {dbError && (
-                <div className="p-6 bg-red-50 border border-red-200 rounded-xl space-y-4">
-                    <div className="flex items-center gap-2 text-red-700 font-bold">
+                <ConsolePanel className="p-6 bg-red-50/50 border-red-200 space-y-4">
+                    <div className="flex items-center gap-2 text-red-700 font-bold text-sm">
                         <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                         </svg>
                         데이터베이스 설정이 필요합니다
                     </div>
-                    <p className="text-sm text-red-600">
+                    <p className="text-xs text-red-600 leading-relaxed font-medium">
                         현재 데이터베이스 스키마가 최신 코드가 요구하는 형식과 다릅니다. (에러: {dbError})
                         <br />아래 SQL을 Supabase SQL Editor에서 실행하여 테이블을 업데이트해주세요.
                     </p>
-                    <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
-                        <pre className="text-xs text-blue-300 font-mono">
+                    <div className="bg-black rounded p-4 overflow-x-auto">
+                        <pre className="text-[11px] text-[#d8d8d2] font-mono leading-relaxed">
                             {`-- 1. FAQ 테이블 최신화
 CREATE TABLE IF NOT EXISTS faqs (
   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
@@ -212,10 +313,6 @@ BEGIN
     IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'faqs' AND column_name = 'question') THEN
         ALTER TABLE faqs ALTER COLUMN question DROP NOT NULL;
         ALTER TABLE faqs ALTER COLUMN answer DROP NOT NULL;
-
-        -- 데이터가 없다면 아예 삭제해도 무방합니다 (선택사항)
-        -- ALTER TABLE faqs DROP COLUMN question;
-        -- ALTER TABLE faqs DROP COLUMN answer;
     END IF;
 END $$;

@@ -234,30 +331,29 @@ BEGIN
 END $$;`}
                         </pre>
                     </div>
-                    <p className="text-xs text-gray-500">
+                    <p className="text-[11px] text-red-500/70 font-bold">
                         * SQL 실행 후 페이지를 새로고침하면 정상적으로 작동합니다.
                     </p>
-                </div>
-            )
-            }
+                </ConsolePanel>
+            )}

             {/* Tabs */}
-            <div className="border-b border-gray-200">
-                <nav className="-mb-px flex space-x-8">
+            <div className="border-b border-[#e5e5df]">
+                <nav className="-mb-px flex space-x-6 px-1">
                     <button
                         onClick={() => setActiveTab('faq')}
-                        className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === 'faq'
-                            ? 'border-black text-black'
-                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
+                        className={`py-3 border-b-2 font-bold text-xs transition-colors ${activeTab === 'faq'
+                            ? 'border-[#111111] text-[#111111]'
+                            : 'border-transparent text-gray-400 hover:text-gray-900'
                             }`}
                     >
                         FAQ 관리
                     </button>
                     <button
                         onClick={() => setActiveTab('notices')}
-                        className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === 'notices'
-                            ? 'border-black text-black'
-                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
+                        className={`py-3 border-b-2 font-bold text-xs transition-colors ${activeTab === 'notices'
+                            ? 'border-[#111111] text-[#111111]'
+                            : 'border-transparent text-gray-400 hover:text-gray-900'
                             }`}
                     >
                         공지사항 관리
@@ -265,196 +361,391 @@ END $$;`}
                 </nav>
             </div>

-            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 min-h-[500px]">
+            <ConsolePanel className="p-6 min-h-[500px]">
                 {activeTab === 'faq' ? (
                     <div className="space-y-6">
                         <div className="flex justify-between items-center">
-                            <h3 className="text-lg font-bold text-gray-900">FAQ 목록</h3>
+                            <h3 className="text-sm font-black text-gray-900">FAQ 목록</h3>
                             <button
                                 onClick={handleAddFAQ}
                                 disabled={loading}
-                                className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 disabled:opacity-50"
+                                className={consolePrimaryButtonClass + " px-3 py-1.5"}
                             >
-                                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
+                                {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin mr-1" /> : <Plus className="w-3.5 h-3.5 mr-1" />}
                                 FAQ 추가
                             </button>
                         </div>

-                        <div className="space-y-4">
-                            {faqs.map((faq) => (
-                                <div key={faq.id} className="border border-gray-200 rounded-lg overflow-hidden">
+                        <div className="space-y-3">
+                            {faqs.map((faq) => {
+                                const draft = getFaqDraft(faq);
+                                const dirty = isFaqDirty(faq);
+                                const saving = Boolean(savingItems[`faq:${faq.id}`]);
+
+                                return (
+                                    <div key={faq.id} className="border border-[#e5e5df] bg-white rounded overflow-hidden">
                                     <div
-                                        className="flex items-center justify-between p-4 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
+                                        className="flex items-center justify-between p-4 cursor-pointer hover:bg-[#fbfbfa] transition-colors"
                                         onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                                     >
                                         <div className="flex-1 mr-4">
-                                            <div className="font-medium text-gray-900">
+                                            <div className="font-bold text-sm text-gray-900">
                                                 {faq.question_ko}
                                             </div>
-                                            <div className="text-xs text-gray-500 mt-1">
+                                            <div className="text-[11px] font-medium text-gray-400 mt-0.5">
                                                 {faq.question_en || '(No English Question)'}
                                             </div>
                                         </div>
-                                        <div className="flex items-center gap-3">
+                                        <div className="flex items-center gap-2">
                                             <button
                                                 onClick={(e) => {
                                                     e.stopPropagation();
                                                     handleDeleteFAQ(faq.id);
                                                 }}
-                                                className="text-gray-400 hover:text-red-500"
+                                                aria-label="FAQ 삭제"
+                                                className={`${consoleIconButtonClass} text-gray-400 hover:text-red-500 hover:bg-red-50`}
                                             >
                                                 <Trash2 className="w-4 h-4" />
                                             </button>
-                                            {expandedFaq === faq.id ? <ChevronUp className="w-5 h-5 text-gray-500" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
+                                            {expandedFaq === faq.id ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                                         </div>
                                     </div>

                                     {expandedFaq === faq.id && (
-                                        <div className="p-4 border-t border-gray-200 bg-white space-y-6">
+                                        <div className="p-4 border-t border-[#e5e5df] bg-[#fbfbfa] space-y-6">
                                             {/* Primary Korean Section */}
-                                            <div className="space-y-4">
-                                                <div className="flex items-center gap-2 border-l-4 border-blue-500 pl-3">
-                                                    <h4 className="text-sm font-bold text-gray-900">국문 정보 (필수)</h4>
+                                            <div className="space-y-3">
+                                                <div className="flex items-center gap-2 border-l-2 border-[#111111] pl-2">
+                                                    <h4 className="text-xs font-black text-gray-900">국문 정보 (필수)</h4>
                                                 </div>
-                                                <div className="grid grid-cols-1 gap-4">
+                                                <div className="grid grid-cols-1 gap-3">
                                                     <div>
-                                                        <label className="text-xs font-medium text-gray-500 mb-1 block">질문 (Korean)</label>
+                                                        <label className="text-[11px] font-bold text-gray-500 mb-1 block">질문 (Korean)</label>
                                                         <input
                                                             type="text"
-                                                            value={faq.question_ko}
-                                                            onChange={(e) => handleUpdateFAQ(faq.id, 'question_ko', e.target.value)}
+                                                            value={draft.question_ko}
+                                                            onChange={(e) => handleChangeFAQDraft(faq.id, 'question_ko', e.target.value)}
                                                             placeholder="질문을 입력하세요"
-                                                            className="w-full p-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
+                                                            className={consoleInputClass + " w-full bg-white"}
                                                         />
                                                     </div>
                                                     <div>
-                                                        <label className="text-xs font-medium text-gray-500 mb-1 block">답변 (Korean)</label>
+                                                        <label className="text-[11px] font-bold text-gray-500 mb-1 block">답변 (Korean)</label>
                                                         <textarea
-                                                            rows={4}
-                                                            value={faq.answer_ko}
-                                                            onChange={(e) => handleUpdateFAQ(faq.id, 'answer_ko', e.target.value)}
+                                                            rows={3}
+                                                            value={draft.answer_ko}
+                                                            onChange={(e) => handleChangeFAQDraft(faq.id, 'answer_ko', e.target.value)}
                                                             placeholder="답변 내용을 입력하세요"
-                                                            className="w-full p-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
+                                                            className={consoleInputClass + " w-full bg-white resize-none"}
                                                         />
                                                     </div>
                                                 </div>
                                             </div>

                                             {/* Secondary English Section */}
-                                            <div className="space-y-4 pt-2 border-t border-gray-100">
+                                            <div className="space-y-3 pt-4 border-t border-[#e5e5df]">
                                                 <div className="flex items-center justify-between">
-                                                    <div className="flex items-center gap-2 border-l-4 border-gray-300 pl-3">
-                                                        <h4 className="text-sm font-bold text-gray-700">영문 정보 (선택)</h4>
+                                                    <div className="flex items-center gap-2 border-l-2 border-gray-300 pl-2">
+                                                        <h4 className="text-xs font-bold text-gray-600">영문 정보 (선택)</h4>
                                                     </div>
-                                                    <span className="text-[10px] text-gray-400 bg-gray-50 px-2 py-0.5 rounded border border-gray-100">
-                                                        * 영문 버전이 필요한 경우에만 입력하세요
-                                                    </span>
                                                 </div>
-                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 opacity-80 hover:opacity-100 transition-opacity">
+                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 opacity-70 hover:opacity-100 transition-opacity">
                                                     <div>
-                                                        <label className="text-xs font-medium text-gray-500 mb-1 block">Question (English)</label>
+                                                        <label className="text-[11px] font-bold text-gray-500 mb-1 block">Question (English)</label>
                                                         <input
                                                             type="text"
-                                                            value={faq.question_en || ''}
-                                                            onChange={(e) => handleUpdateFAQ(faq.id, 'question_en', e.target.value)}
+                                                            value={draft.question_en || ''}
+                                                            onChange={(e) => handleChangeFAQDraft(faq.id, 'question_en', e.target.value)}
                                                             placeholder="English Question"
-                                                            className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
+                                                            className={consoleInputClass + " w-full bg-white"}
                                                         />
                                                     </div>
                                                     <div>
-                                                        <label className="text-xs font-medium text-gray-500 mb-1 block">Answer (English)</label>
+                                                        <label className="text-[11px] font-bold text-gray-500 mb-1 block">Answer (English)</label>
                                                         <textarea
-                                                            rows={4}
-                                                            value={faq.answer_en || ''}
-                                                            onChange={(e) => handleUpdateFAQ(faq.id, 'answer_en', e.target.value)}
+                                                            rows={3}
+                                                            value={draft.answer_en || ''}
+                                                            onChange={(e) => handleChangeFAQDraft(faq.id, 'answer_en', e.target.value)}
                                                             placeholder="English Answer"
-                                                            className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 resize-none"
+                                                            className={consoleInputClass + " w-full bg-white resize-none"}
                                                         />
                                                     </div>
                                                 </div>
                                             </div>
+                                            <div className="flex flex-col gap-2 border-t border-[#e5e5df] pt-4 sm:flex-row sm:items-center sm:justify-between">
+                                                <p className="text-[11px] font-bold text-gray-500">
+                                                    {dirty ? '저장되지 않은 변경사항이 있습니다.' : '최신 상태입니다.'}
+                                                </p>
+                                                <div className="flex gap-2">
+                                                    <button
+                                                        type="button"
+                                                        onClick={() => setFaqDrafts(prev => {
+                                                            const next = { ...prev };
+                                                            delete next[faq.id];
+                                                            return next;
+                                                        })}
+                                                        disabled={!dirty || saving}
+                                                        className={consoleSecondaryButtonClass}
+                                                    >
+                                                        되돌리기
+                                                    </button>
+                                                    <button
+                                                        type="button"
+                                                        onClick={() => handleSaveFAQ(faq)}
+                                                        disabled={!dirty || saving}
+                                                        className={consolePrimaryButtonClass}
+                                                    >
+                                                        {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
+                                                        {saving ? '저장 중' : 'FAQ 저장'}
+                                                    </button>
+                                                </div>
+                                            </div>
                                         </div>
                                     )}
                                 </div>
-                            ))}
+                                );
+                            })}
                             {faqs.length === 0 && (
-                                <div className="text-center py-12 text-gray-500">등록된 FAQ가 없습니다.</div>
+                                <div className="text-center py-12 text-xs font-bold text-gray-400 border border-dashed border-[#e5e5df] rounded bg-[#fbfbfa]">
+                                    등록된 FAQ가 없습니다.
+                                </div>
                             )}
                         </div>
                     </div>
                 ) : (
-                    <div className="space-y-6">
+                    <div className="space-y-4">
                         <div className="flex justify-between items-center">
-                            <h3 className="text-lg font-bold text-gray-900">공지사항 목록</h3>
+                            <h3 className="text-sm font-black text-gray-900">공지사항 목록</h3>
                             <button
                                 onClick={handleAddNotice}
                                 disabled={loading}
-                                className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 disabled:opacity-50"
+                                className={consolePrimaryButtonClass + " px-3 py-1.5"}
                             >
-                                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
+                                {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin mr-1" /> : <Plus className="w-3.5 h-3.5 mr-1" />}
                                 공지사항 추가
                             </button>
                         </div>

-                        <div className="overflow-x-auto">
-                            <table className="w-full text-left text-sm">
-                                <thead className="bg-gray-50 border-b border-gray-200">
+                        <div className="space-y-3 md:hidden">
+                            {notices.map((notice) => {
+                                const draft = getNoticeDraft(notice);
+                                const dirty = isNoticeDirty(notice);
+                                const saving = Boolean(savingItems[`notice:${notice.id}`]);
+
+                                return (
+                                    <div key={notice.id} className="rounded border border-[#e5e5df] bg-white p-4">
+                                        <div className="space-y-3">
+                                            <label className="block text-[11px] font-bold text-gray-500">
+                                                제목
+                                            </label>
+                                            <input
+                                                type="text"
+                                                value={draft.title}
+                                                onChange={(e) => handleChangeNoticeDraft(notice.id, 'title', e.target.value)}
+                                                className={consoleInputClass + " w-full bg-white"}
+                                            />
+                                            <div className="grid grid-cols-2 gap-3">
+                                                <label className="flex items-center gap-2 rounded border border-[#e5e5df] px-3 py-2 text-xs font-bold text-gray-700">
+                                                    <input
+                                                        type="checkbox"
+                                                        checked={draft.is_pinned}
+                                                        onChange={(e) => handleChangeNoticeDraft(notice.id, 'is_pinned', e.target.checked)}
+                                                        className="w-3.5 h-3.5 text-[#111111] border-gray-300 rounded focus:ring-[#111111] accent-[#111111]"
+                                                    />
+                                                    고정
+                                                </label>
+                                                <label className="flex items-center gap-2 rounded border border-[#e5e5df] px-3 py-2 text-xs font-bold text-gray-700">
+                                                    <input
+                                                        type="checkbox"
+                                                        checked={draft.is_active}
+                                                        onChange={(e) => handleChangeNoticeDraft(notice.id, 'is_active', e.target.checked)}
+                                                        className="w-3.5 h-3.5 text-[#111111] border-gray-300 rounded focus:ring-[#111111] accent-[#111111]"
+                                                    />
+                                                    공개
+                                                </label>
+                                            </div>
+                                            <label className="block text-[11px] font-bold text-gray-500">
+                                                본문
+                                            </label>
+                                            <textarea
+                                                rows={6}
+                                                value={draft.content}
+                                                onChange={(e) => handleChangeNoticeDraft(notice.id, 'content', e.target.value)}
+                                                placeholder="공지사항 본문을 입력하세요"
+                                                className={consoleInputClass + " h-auto w-full resize-y bg-white py-3 leading-relaxed"}
+                                            />
+                                            <p className="text-[11px] font-bold text-gray-500">
+                                                {dirty ? '저장되지 않은 변경사항이 있습니다.' : '최신 상태입니다.'}
+                                            </p>
+                                            <div className="grid grid-cols-[1fr_1fr_auto] gap-2">
+                                                <button
+                                                    type="button"
+                                                    onClick={() => setNoticeDrafts(prev => {
+                                                        const next = { ...prev };
+                                                        delete next[notice.id];
+                                                        return next;
+                                                    })}
+                                                    disabled={!dirty || saving}
+                                                    className={consoleSecondaryButtonClass}
+                                                >
+                                                    되돌리기
+                                                </button>
+                                                <button
+                                                    type="button"
+                                                    onClick={() => handleSaveNotice(notice)}
+                                                    disabled={!dirty || saving}
+                                                    className={consolePrimaryButtonClass}
+                                                >
+                                                    {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
+                                                    {saving ? '저장 중' : '공지 저장'}
+                                                </button>
+                                                <button
+                                                    type="button"
+                                                    onClick={() => handleDeleteNotice(notice.id)}
+                                                    aria-label="공지사항 삭제"
+                                                    className={`${consoleIconButtonClass} text-gray-400 hover:text-red-500 hover:bg-red-50 hover:border-red-100`}
+                                                >
+                                                    <Trash2 className="w-4 h-4" />
+                                                </button>
+                                            </div>
+                                        </div>
+                                    </div>
+                                );
+                            })}
+                            {notices.length === 0 && (
+                                <div className="rounded border border-dashed border-[#e5e5df] bg-[#fbfbfa] px-4 py-12 text-center text-xs font-bold text-gray-400">
+                                    등록된 공지사항이 없습니다.
+                                </div>
+                            )}
+                        </div>
+
+                        <div className="hidden overflow-x-auto border border-[#e5e5df] rounded md:block">
+                            <table className="w-full text-left text-xs">
+                                <thead className="bg-[#fbfbfa] border-b border-[#e5e5df]">
                                     <tr>
-                                        <th className="px-4 py-3 font-medium text-gray-500">제목</th>
-                                        <th className="px-4 py-3 font-medium text-gray-500 w-32">상태</th>
-                                        <th className="px-4 py-3 font-medium text-gray-500 w-32">작성일</th>
-                                        <th className="px-4 py-3 font-medium text-gray-500 w-20 text-right">관리</th>
+                                        <th className="px-4 py-3 font-bold text-gray-500">제목</th>
+                                        <th className="px-4 py-3 font-bold text-gray-500 w-32">상태</th>
+                                        <th className="px-4 py-3 font-bold text-gray-500 w-32">작성일</th>
+                                        <th className="px-4 py-3 font-bold text-gray-500 w-20 text-right">관리</th>
                                     </tr>
                                 </thead>
-                                <tbody className="divide-y divide-gray-200">
-                                    {notices.map((notice) => (
-                                        <tr key={notice.id} className="hover:bg-gray-50">
+                                <tbody className="divide-y divide-[#e5e5df] bg-white">
+                                    {notices.map((notice) => {
+                                        const draft = getNoticeDraft(notice);
+                                        const dirty = isNoticeDirty(notice);
+                                        const saving = Boolean(savingItems[`notice:${notice.id}`]);
+
+                                        return (
+                                            <Fragment key={notice.id}>
+                                        <tr className="hover:bg-[#fbfbfa]">
                                             <td className="px-4 py-3">
                                                 <input
                                                     type="text"
-                                                    value={notice.title}
-                                                    onChange={(e) => handleUpdateNotice(notice.id, 'title', e.target.value)}
-                                                    className="w-full bg-transparent border-none focus:ring-0 font-medium text-gray-900 p-0"
+                                                    value={draft.title}
+                                                    onChange={(e) => handleChangeNoticeDraft(notice.id, 'title', e.target.value)}
+                                                    className="w-full bg-transparent border-none focus:ring-0 font-bold text-gray-900 p-0 placeholder-gray-300"
                                                 />
+                                                <p className="mt-1 line-clamp-1 text-[11px] font-medium text-gray-400">
+                                                    {draft.content || '본문 없음'}
+                                                </p>
                                             </td>
                                             <td className="px-4 py-3">
                                                 <div className="flex items-center gap-3">
-                                                    <label className="flex items-center gap-1 cursor-pointer">
+                                                    <label className="flex items-center gap-1.5 cursor-pointer">
                                                         <input
                                                             type="checkbox"
-                                                            checked={notice.is_pinned}
-                                                            onChange={(e) => handleUpdateNotice(notice.id, 'is_pinned', e.target.checked)}
-                                                            className="w-3.5 h-3.5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
+                                                            checked={draft.is_pinned}
+                                                            onChange={(e) => handleChangeNoticeDraft(notice.id, 'is_pinned', e.target.checked)}
+                                                            className="w-3.5 h-3.5 text-[#111111] border-gray-300 rounded focus:ring-[#111111] accent-[#111111]"
                                                         />
-                                                        <span className="text-xs text-gray-500">고정</span>
+                                                        <span className="font-bold text-gray-600">고정</span>
                                                     </label>
-                                                    <label className="flex items-center gap-1 cursor-pointer">
+                                                    <label className="flex items-center gap-1.5 cursor-pointer">
                                                         <input
                                                             type="checkbox"
-                                                            checked={notice.is_active}
-                                                            onChange={(e) => handleUpdateNotice(notice.id, 'is_active', e.target.checked)}
-                                                            className="w-3.5 h-3.5 text-green-600 border-gray-300 rounded focus:ring-green-500"
+                                                            checked={draft.is_active}
+                                                            onChange={(e) => handleChangeNoticeDraft(notice.id, 'is_active', e.target.checked)}
+                                                            className="w-3.5 h-3.5 text-[#111111] border-gray-300 rounded focus:ring-[#111111] accent-[#111111]"
                                                         />
-                                                        <span className="text-xs text-gray-500">공개</span>
+                                                        <span className="font-bold text-gray-600">공개</span>
                                                     </label>
                                                 </div>
                                             </td>
-                                            <td className="px-4 py-3 text-gray-500 text-xs">
+                                            <td className="px-4 py-3 text-gray-400 font-medium">
                                                 {new Date(notice.created_at).toLocaleDateString()}
                                             </td>
                                             <td className="px-4 py-3 text-right">
-                                                <button
-                                                    onClick={() => handleDeleteNotice(notice.id)}
-                                                    className="text-gray-400 hover:text-red-500"
-                                                >
-                                                    <Trash2 className="w-4 h-4" />
-                                                </button>
+                                                <div className="flex justify-end gap-1">
+                                                    <button
+                                                        type="button"
+                                                        onClick={() => setExpandedNotice(expandedNotice === notice.id ? null : notice.id)}
+                                                        aria-label="공지사항 본문 편집"
+                                                        className={consoleIconButtonClass}
+                                                    >
+                                                        {expandedNotice === notice.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
+                                                    </button>
+                                                    <button
+                                                        onClick={() => handleDeleteNotice(notice.id)}
+                                                        aria-label="공지사항 삭제"
+                                                        className={`${consoleIconButtonClass} text-gray-400 hover:text-red-500 hover:bg-red-50 hover:border-red-100`}
+                                                    >
+                                                        <Trash2 className="w-4 h-4" />
+                                                    </button>
+                                                </div>
                                             </td>
                                         </tr>
-                                    ))}
+                                        {expandedNotice === notice.id && (
+                                            <tr>
+                                                <td colSpan={4} className="bg-[#fbfbfa] px-4 py-4">
+                                                    <div className="space-y-3">
+                                                        <label className="block text-[11px] font-bold text-gray-500">
+                                                            본문
+                                                        </label>
+                                                        <textarea
+                                                            rows={5}
+                                                            value={draft.content}
+                                                            onChange={(e) => handleChangeNoticeDraft(notice.id, 'content', e.target.value)}
+                                                            placeholder="공지사항 본문을 입력하세요"
+                                                            className={consoleInputClass + " h-auto w-full resize-y bg-white py-3 leading-relaxed"}
+                                                        />
+                                                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
+                                                            <p className="text-[11px] font-bold text-gray-500">
+                                                                {dirty ? '저장되지 않은 변경사항이 있습니다.' : '최신 상태입니다.'}
+                                                            </p>
+                                                            <div className="flex gap-2">
+                                                                <button
+                                                                    type="button"
+                                                                    onClick={() => setNoticeDrafts(prev => {
+                                                                        const next = { ...prev };
+                                                                        delete next[notice.id];
+                                                                        return next;
+                                                                    })}
+                                                                    disabled={!dirty || saving}
+                                                                    className={consoleSecondaryButtonClass}
+                                                                >
+                                                                    되돌리기
+                                                                </button>
+                                                                <button
+                                                                    type="button"
+                                                                    onClick={() => handleSaveNotice(notice)}
+                                                                    disabled={!dirty || saving}
+                                                                    className={consolePrimaryButtonClass}
+                                                                >
+                                                                    {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
+                                                                    {saving ? '저장 중' : '공지 저장'}
+                                                                </button>
+                                                            </div>
+                                                        </div>
+                                                    </div>
+                                                </td>
+                                            </tr>
+                                        )}
+                                            </Fragment>
+                                        );
+                                    })}
                                     {notices.length === 0 && (
                                         <tr>
-                                            <td colSpan={4} className="px-4 py-12 text-center text-gray-500">
+                                            <td colSpan={4} className="px-4 py-12 text-center font-bold text-gray-400 bg-[#fbfbfa]">
                                                 등록된 공지사항이 없습니다.
                                             </td>
                                         </tr>
@@ -464,7 +755,7 @@ END $$;`}
                         </div>
                     </div>
                 )}
-            </div>
+            </ConsolePanel>
         </div >
     );
 }
diff --git a/components/admin/inquiries/InquiryList.tsx b/components/admin/inquiries/InquiryList.tsx
index 4c1d88c..0801222 100644
--- a/components/admin/inquiries/InquiryList.tsx
+++ b/components/admin/inquiries/InquiryList.tsx
@@ -10,6 +10,15 @@ import {
 } from 'lucide-react';
 import { toast } from 'sonner';
 import { updateInquiryStatus, deleteInquiry, replyToInquiry } from '@/app/actions/inquiry-actions';
+import {
+    ConsolePanel,
+    ConsoleSectionTitle,
+    ConsoleStatusPill,
+    consoleInputClass,
+    consolePrimaryButtonClass,
+    consoleSecondaryButtonClass,
+    consoleIconButtonClass
+} from '@/components/admin/ConsolePrimitives';

 interface Inquiry {
     id: string;
@@ -31,6 +40,11 @@ export default function InquiryList({ initialInquiries }: { initialInquiries: In
     const [searchTerm, setSearchTerm] = useState('');
     const [replyText, setReplyText] = useState('');
     const [isSending, setIsSending] = useState(false);
+    const [pendingIds, setPendingIds] = useState<Record<string, boolean>>({});
+
+    const setInquiryPending = (id: string, value: boolean) => {
+        setPendingIds(prev => ({ ...prev, [id]: value }));
+    };

     const filteredInquiries = inquiries.filter(inquiry => {
         const matchesStatus = filterStatus === 'all' || inquiry.status === filterStatus;
@@ -42,31 +56,57 @@ export default function InquiryList({ initialInquiries }: { initialInquiries: In
     });

     const handleStatusChange = async (id: string, newStatus: 'new' | 'read' | 'replied') => {
-        setInquiries(inquiries.map(i => i.id === id ? { ...i, status: newStatus } : i));
+        if (pendingIds[id]) return;
+
+        const previousInquiries = inquiries;
+        const previousSelectedInquiry = selectedInquiry;
+        setInquiryPending(id, true);
+
+        setInquiries(previousInquiries.map(i => i.id === id ? { ...i, status: newStatus } : i));
         if (selectedInquiry?.id === id) {
             setSelectedInquiry({ ...selectedInquiry, status: newStatus });
         }

         try {
-            await updateInquiryStatus(id, newStatus);
+            const result = await updateInquiryStatus(id, newStatus);
+            if (!result.success) {
+                throw new Error(result.message || '상태 업데이트 실패');
+            }
         } catch (error) {
             console.error('Failed to update status:', error);
+            setInquiries(previousInquiries);
+            setSelectedInquiry(current => current?.id === id ? previousSelectedInquiry : current);
+            toast.error('문의 상태를 저장하지 못했습니다. 이전 상태로 복구했습니다.');
+        } finally {
+            setInquiryPending(id, false);
         }
     };

     const handleDelete = async (id: string) => {
         if (!confirm('정말 삭제하시겠습니까?')) return;

-        setInquiries(inquiries.filter(i => i.id !== id));
+        const previousInquiries = inquiries;
+        const previousSelectedInquiry = selectedInquiry;
+        setInquiryPending(id, true);
+
+        setInquiries(previousInquiries.filter(i => i.id !== id));
         if (selectedInquiry?.id === id) {
             setSelectedInquiry(null);
         }

         try {
-            await deleteInquiry(id);
+            const result = await deleteInquiry(id);
+            if (!result.success) {
+                throw new Error(result.message || '문의 삭제 실패');
+            }
+            toast.success('문의가 삭제되었습니다.');
         } catch (error) {
             console.error('Failed to delete inquiry:', error);
-            toast.error('삭제 중 오류가 발생했습니다.');
+            setInquiries(previousInquiries);
+            setSelectedInquiry(previousSelectedInquiry);
+            toast.error('삭제 중 오류가 발생했습니다. 이전 상태로 복구했습니다.');
+        } finally {
+            setInquiryPending(id, false);
         }
     };

@@ -75,9 +115,11 @@ export default function InquiryList({ initialInquiries }: { initialInquiries: In

         setIsSending(true);
         try {
-            await replyToInquiry(selectedInquiry.id, replyText);
+            const result = await replyToInquiry(selectedInquiry.id, replyText);
+            if (!result.success) {
+                throw new Error(result.message || '답변 등록 실패');
+            }

-            // Update local state
             const updatedInquiry: Inquiry = {
                 ...selectedInquiry,
                 status: 'replied',
@@ -106,12 +148,11 @@ export default function InquiryList({ initialInquiries }: { initialInquiries: In
         window.location.href = `mailto:${selectedInquiry.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
     };

-    const getStatusColor = (status: string) => {
+    const getStatusTone = (status: string) => {
         switch (status) {
-            case 'new': return 'bg-blue-100 text-blue-700';
-            case 'read': return 'bg-gray-100 text-gray-700';
-            case 'replied': return 'bg-green-100 text-green-700';
-            default: return 'bg-gray-100 text-gray-700';
+            case 'new': return 'danger';
+            case 'replied': return 'success';
+            default: return 'neutral';
         }
     };

@@ -127,9 +168,9 @@ export default function InquiryList({ initialInquiries }: { initialInquiries: In
     return (
         <div className="flex h-[calc(100vh-120px)] gap-6">
             {/* Left: List */}
-            <div className={`flex-1 flex flex-col bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden ${selectedInquiry ? 'hidden md:flex' : 'flex'}`}>
+            <div className={`flex-1 flex flex-col bg-white rounded-md border border-[#e5e5df] overflow-hidden ${selectedInquiry ? 'hidden md:flex' : 'flex'}`}>
                 {/* Search & Filter */}
-                <div className="p-4 border-b border-gray-200 space-y-3">
+                <div className="p-4 border-b border-[#e5e5df] space-y-3 bg-[#fbfbfa]">
                     <div className="relative">
                         <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                         <input
@@ -137,7 +178,7 @@ export default function InquiryList({ initialInquiries }: { initialInquiries: In
                             placeholder="이름, 이메일, 내용 검색..."
                             value={searchTerm}
                             onChange={(e) => setSearchTerm(e.target.value)}
-                            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black/5"
+                            className={`${consoleInputClass} w-full pl-9`}
                         />
                     </div>
                     <div className="flex gap-2 overflow-x-auto pb-1">
@@ -145,9 +186,9 @@ export default function InquiryList({ initialInquiries }: { initialInquiries: In
                             <button
                                 key={status}
                                 onClick={() => setFilterStatus(status)}
-                                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${filterStatus === status
-                                    ? 'bg-black text-white'
-                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
+                                className={`px-3 py-1.5 rounded text-xs font-bold whitespace-nowrap transition-colors ${filterStatus === status
+                                    ? 'bg-[#111111] text-white'
+                                    : 'bg-white border border-[#e5e5df] text-gray-600 hover:bg-gray-50'
                                     }`}
                             >
                                 {status === 'all' ? '전체' : getStatusLabel(status)}
@@ -157,40 +198,40 @@ export default function InquiryList({ initialInquiries }: { initialInquiries: In
                 </div>

                 {/* List Items */}
-                <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
+                <div className="flex-1 overflow-y-auto divide-y divide-[#e5e5df]">
                     {filteredInquiries.map((inquiry) => (
                         <div
                             key={inquiry.id}
                             onClick={() => {
-                                setSelectedInquiry(inquiry);
-                                setReplyText(inquiry.reply_content || '');
-                                if (inquiry.status === 'new') {
+                                    setSelectedInquiry(inquiry);
+                                    setReplyText(inquiry.reply_content || '');
+                                if (inquiry.status === 'new' && !pendingIds[inquiry.id]) {
                                     handleStatusChange(inquiry.id, 'read');
                                 }
                             }}
-                            className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${selectedInquiry?.id === inquiry.id ? 'bg-blue-50 hover:bg-blue-50' : ''
+                            className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${pendingIds[inquiry.id] ? 'pointer-events-none opacity-70' : ''} ${selectedInquiry?.id === inquiry.id ? 'bg-[#f4f4f1] hover:bg-[#f4f4f1]' : ''
                                 }`}
                         >
                             <div className="flex justify-between items-start mb-1">
-                                <h3 className={`font-medium text-sm ${inquiry.status === 'new' ? 'text-black font-bold' : 'text-gray-900'}`}>
+                                <h3 className={`text-sm ${inquiry.status === 'new' ? 'font-black text-gray-900' : 'font-bold text-gray-700'}`}>
                                     {inquiry.name}
                                 </h3>
-                                <span className="text-xs text-gray-400 whitespace-nowrap ml-2">
+                                <span className="text-[11px] text-gray-400 whitespace-nowrap ml-2">
                                     {format(new Date(inquiry.created_at), 'MM.dd HH:mm')}
                                 </span>
                             </div>
-                            <p className="text-sm text-gray-600 line-clamp-2 mb-2">{inquiry.message}</p>
+                            <p className="text-[13px] text-gray-500 line-clamp-2 mb-3 leading-relaxed">{inquiry.message}</p>
                             <div className="flex items-center gap-2">
-                                <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${getStatusColor(inquiry.status)}`}>
+                                <ConsoleStatusPill tone={getStatusTone(inquiry.status) as any}>
                                     {getStatusLabel(inquiry.status)}
-                                </span>
+                                </ConsoleStatusPill>
                             </div>
                         </div>
                     ))}
                     {filteredInquiries.length === 0 && (
                         <div className="flex flex-col items-center justify-center h-64 text-gray-400">
-                            <MessageSquare className="w-8 h-8 mb-2 opacity-20" />
-                            <p className="text-sm">문의 내역이 없습니다.</p>
+                            <MessageSquare className="w-6 h-6 mb-3 opacity-20" />
+                            <p className="text-xs font-bold">조회된 문의가 없습니다.</p>
                         </div>
                     )}
                 </div>
@@ -198,33 +239,33 @@ export default function InquiryList({ initialInquiries }: { initialInquiries: In

             {/* Right: Detail View */}
             {selectedInquiry ? (
-                <div className="flex-[1.5] bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col absolute inset-0 z-50 md:static md:inset-auto">
+                <div className="flex-[1.5] bg-white rounded-md border border-[#e5e5df] overflow-hidden flex flex-col absolute inset-0 z-50 md:static md:inset-auto">
                     {/* Header */}
-                    <div className="p-6 border-b border-gray-100 flex justify-between items-start bg-white">
+                    <div className="p-5 border-b border-[#e5e5df] flex justify-between items-start bg-[#fbfbfa]">
                         <div>
-                            <div className="flex items-center gap-3 mb-2">
-                                <h2 className="text-xl font-bold text-gray-900">{selectedInquiry.name}</h2>
-                                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedInquiry.status)}`}>
+                            <div className="flex items-center gap-3 mb-3">
+                                <h2 className="text-lg font-black text-gray-900">{selectedInquiry.name}</h2>
+                                <ConsoleStatusPill tone={getStatusTone(selectedInquiry.status) as any}>
                                     {getStatusLabel(selectedInquiry.status)}
-                                </span>
+                                </ConsoleStatusPill>
                             </div>
-                            <div className="flex flex-col gap-1 text-sm text-gray-500">
+                            <div className="flex flex-col gap-1.5 text-xs font-medium text-gray-500">
                                 <div className="flex items-center gap-2">
-                                    <Mail className="w-4 h-4" />
-                                    <a href={`mailto:${selectedInquiry.email}`} className="hover:text-blue-600 hover:underline">
+                                    <Mail className="w-3.5 h-3.5" />
+                                    <a href={`mailto:${selectedInquiry.email}`} className="hover:text-gray-900 transition-colors">
                                         {selectedInquiry.email}
                                     </a>
                                 </div>
                                 {selectedInquiry.phone && (
                                     <div className="flex items-center gap-2">
-                                        <Phone className="w-4 h-4" />
-                                        <a href={`tel:${selectedInquiry.phone}`} className="hover:text-blue-600 hover:underline">
+                                        <Phone className="w-3.5 h-3.5" />
+                                        <a href={`tel:${selectedInquiry.phone}`} className="hover:text-gray-900 transition-colors">
                                             {selectedInquiry.phone}
                                         </a>
                                     </div>
                                 )}
                                 <div className="flex items-center gap-2">
-                                    <Calendar className="w-4 h-4" />
+                                    <Calendar className="w-3.5 h-3.5" />
                                     <span>{format(new Date(selectedInquiry.created_at), 'yyyy년 MM월 dd일 HH:mm', { locale: ko })}</span>
                                 </div>
                             </div>
@@ -232,59 +273,60 @@ export default function InquiryList({ initialInquiries }: { initialInquiries: In
                         <div className="flex items-center gap-2">
                             <button
                                 onClick={() => setSelectedInquiry(null)}
-                                className="md:hidden p-2 hover:bg-gray-100 rounded-full"
+                                className={`${consoleIconButtonClass} md:hidden`}
                             >
-                                <X className="w-5 h-5 text-gray-500" />
+                                <X className="w-4 h-4 text-gray-500" />
                             </button>
                             <button
                                 onClick={() => handleDelete(selectedInquiry.id)}
-                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
+                                disabled={Boolean(pendingIds[selectedInquiry.id])}
+                                className={`${consoleIconButtonClass} text-red-600 hover:text-red-700 hover:bg-red-50 hover:border-red-200`}
                                 title="삭제"
                             >
-                                <Trash2 className="w-5 h-5" />
+                                <Trash2 className="w-4 h-4" />
                             </button>
                         </div>
                     </div>

                     {/* Content */}
-                    <div className="flex-1 p-8 overflow-y-auto bg-gray-50/50">
-                        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm min-h-[150px] mb-6">
-                            <h4 className="text-sm font-bold text-gray-900 mb-2">문의 내용</h4>
-                            <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
+                    <div className="flex-1 p-5 overflow-y-auto bg-white">
+                        <ConsoleSectionTitle>문의 내용</ConsoleSectionTitle>
+                        <div className="p-4 rounded-md border border-[#e5e5df] bg-[#fbfbfa] min-h-[120px] mb-6 mt-3">
+                            <p className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">
                                 {selectedInquiry.message}
                             </p>
                         </div>

                         {/* Reply Section */}
-                        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
-                            <div className="flex justify-between items-center mb-4">
-                                <h4 className="text-sm font-bold text-gray-900">답변 작성</h4>
-                                {selectedInquiry.replied_at && (
-                                    <span className="text-xs text-gray-500">
-                                        최근 답변: {format(new Date(selectedInquiry.replied_at), 'yyyy.MM.dd HH:mm')}
-                                    </span>
-                                )}
-                            </div>
+                        <div className="flex items-center justify-between mb-3">
+                            <ConsoleSectionTitle>답변 작성</ConsoleSectionTitle>
+                            {selectedInquiry.replied_at && (
+                                <span className="text-[11px] font-bold text-gray-400">
+                                    최근 답변: {format(new Date(selectedInquiry.replied_at), 'yyyy.MM.dd HH:mm')}
+                                </span>
+                            )}
+                        </div>
+                        <div className="p-4 rounded-md border border-[#e5e5df] bg-[#f4f4f1]">
                             <textarea
                                 value={replyText}
                                 onChange={(e) => setReplyText(e.target.value)}
-                                className="w-full h-40 p-4 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black/5 resize-none mb-4"
+                                className="w-full h-32 p-3 border border-[#d8d8d2] rounded bg-white text-sm focus:outline-none focus:border-[#111111] focus:ring-1 focus:ring-[#111111] resize-none mb-4"
                                 placeholder="답변 내용을 입력하세요..."
                             />
-                            <div className="flex justify-end gap-3">
+                            <div className="flex justify-end gap-2">
                                 <button
                                     onClick={handleSendEmail}
-                                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
+                                    className={consoleSecondaryButtonClass}
                                 >
-                                    <Mail className="w-4 h-4" />
+                                    <Mail className="w-3.5 h-3.5 mr-1" />
                                     메일 앱 열기
                                 </button>
                                 <button
                                     onClick={handleSaveReply}
                                     disabled={isSending || !replyText.trim()}
-                                    className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium disabled:bg-gray-400"
+                                    className={consolePrimaryButtonClass}
                                 >
-                                    <CheckCircle2 className="w-4 h-4" />
+                                    <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                                     {isSending ? '저장 중...' : '답변 저장 및 완료 처리'}
                                 </button>
                             </div>
@@ -292,11 +334,9 @@ export default function InquiryList({ initialInquiries }: { initialInquiries: In
                     </div>
                 </div>
             ) : (
-                <div className="hidden md:flex flex-[1.5] items-center justify-center bg-gray-50 rounded-xl border border-gray-200 border-dashed text-gray-400 flex-col gap-3">
-                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
-                        <MessageSquare className="w-8 h-8 opacity-50" />
-                    </div>
-                    <p>문의 내용을 확인하려면 목록에서 선택하세요.</p>
+                <div className="hidden md:flex flex-[1.5] items-center justify-center bg-[#fbfbfa] rounded-md border border-[#e5e5df] text-gray-400 flex-col gap-3">
+                    <MessageSquare className="w-8 h-8 opacity-20" />
+                    <p className="text-xs font-bold text-gray-500">문의 내역을 선택하여 상세 내용을 확인하세요.</p>
                 </div>
             )}
         </div>

```

## Relevant File Excerpts

### app/page.tsx

```tsx
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Building2, CheckCircle2, Factory, Home, MapPinned, Ruler, Store, Truck, Wrench } from 'lucide-react';

export const metadata: Metadata = {
  title: '홈',
  description: '위트 이동식주택을 필요한 크기와 옵션으로 직접 구성하고 상담까지 이어가세요.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    url: '/',
    title: '위트 이동식주택',
    description: '작은 공간, 선명한 기준. 내 집을 필요한 크기와 옵션으로 직접 구성해보세요.',
  },
};

const transparencyFeatures = [
  {
    icon: Ruler,
    title: '모델 및 옵션 구성',
    text: '3x6, 3x9 등 모듈러 베이스 모델과 라이프스타일에 맞는 옵션을 온라인에서 즉시 구성하고 예상 견적을 확인할 수 있습니다.',
  },
  {
    icon: Wrench,
    title: '포함 및 별도 범위',
    text: '제품 자체에 포함된 기본 사양과, 부지 토목·기초, 전기·상하수 인입 등 현장에서 별도로 발생하는 비용을 명확히 구분합니다.',
  },
  {
    icon: MapPinned,
    title: '현장 설치 조건',
    text: '진입로 폭, 크레인 작업 반경, 인허가 가능 여부 등 제품 배송 전 확인해야 할 필수 요소를 사전에 체크합니다.',
  },
  {
    icon: Truck,
    title: '운송 및 현장 조립',
    text: '공장 제작 후 현장까지의 운송 스케줄과 안전한 설치를 위한 가이드를 제공하여 현장 체류 시간을 최소화합니다.',
  },
  {
    icon: CheckCircle2,
    title: 'A/S 및 사후 관리',
    text: '문·창호 단차, 욕실 누수 등 입주 후 발생할 수 있는 주요 AS 항목들에 대한 명확한 보증 기간과 대응 절차를 안내합니다.',
  },
  {
    icon: Factory,
    title: '공장 제작 기반',
    text: '날씨와 현장 여건에 영향을 받지 않는 실내 공장 제작을 통해 일관된 시공 품질과 단축된 공기를 보장합니다.',
  },
];

const buyerPaths = [
  {
    icon: Home,
    title: '세컨드하우스·귀촌',
    text: '작은 주거 공간을 빠르게 검토하고 싶은 가족에게 모델, 옵션, 설치 조건을 한 번에 정리해줍니다.',
  },
  {
    icon: Store,
    title: '카페·팝업·숙박 운영',
    text: '수익을 내야 하는 공간은 일정과 설치 리스크가 중요합니다. 공장 제작 중심으로 오픈 시점을 예측하기 쉽게 만듭니다.',
  },
  {
    icon: Building2,
    title: '기관·법인 프로젝트',
    text: '반복 설치, 농촌·복지·교육·업무용 모듈처럼 목적이 분명한 프로젝트를 표준 공정과 상담 기록으로 관리합니다.',
  },
];

export default function HomePage() {
  return (
    <main className="bg-[#fbfbfa] text-[#111111] selection:bg-black selection:text-white">
      {/* 1. First Viewport: Product-led, image-led, full-bleed hero */}
      <section className="relative min-h-[calc(100svh-192px)] w-full bg-[#111] text-white overflow-hidden">
        <Image
          src="/images/hero_main.webp"
          alt="위트 이동식주택 외관"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-60 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#111]/40 via-transparent to-[#111]" />

        <div className="absolute inset-0 flex flex-col justify-end px-6 pb-28 md:px-12 md:pb-32 lg:px-24 mx-auto w-full z-10">
          <div className="max-w-4xl">
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-300">WEET MOBILE HOME</p>
            <h1 className="text-5xl font-black leading-[1.1] md:text-7xl lg:text-[88px]">
              작은 공간, <br />
              선명한 기준.
            </h1>
            <p className="mt-8 max-w-2xl text-sm leading-relaxed text-gray-300 md:text-base lg:text-lg">
              이동식주택을 고를 때의 막연함을 없앱니다. <br className="hidden md:block" />
              모델 선택부터 운송, 설치, 그리고 예상 비용까지 모든 과정을 투명하게 공개합니다.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/customize"
                className="inline-flex h-12 items-center justify-center gap-3 rounded bg-white px-8 text-sm font-bold text-[#111] transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                모델 구성하기
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/support"
                className="inline-flex h-12 items-center justify-center rounded px-8 text-sm font-bold text-white transition-colors hover:bg-white/10"
              >
                진행 과정 보기
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-60 z-10 hidden md:flex">
          <span className="text-[9px] font-black uppercase tracking-[0.3em]">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
        </div>
      </section>

      {/* 2. Trust / Transparency Section */}
      <section className="bg-[#111111] px-6 pt-16 pb-20 md:px-12 md:pt-20 md:pb-24 lg:px-24 lg:pt-20 lg:pb-32 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div className="max-w-2xl">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">TRANSPARENCY</p>
              <h2 className="text-3xl font-black md:text-5xl lg:text-6xl">
                불확실성은 남기지 않습니다.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-gray-400">
              '예상치 못한 현장 비용'과 '품질 편차'. 위트는 주택 설치의 가장 큰 리스크를 제거하기 위해 모든 기준을 선명하게 설계합니다.
            </p>
          </div>

          <div className="grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {transparencyFeatures.map((feature) => (
              <div key={feature.title} className="group border-t border-white/10 pt-6">
                <feature.icon className="h-6 w-6 text-gray-400 mb-5 transition-colors group-hover:text-white" />
                <h3 className="text-lg font-bold">{feature.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-400">
                  {feature.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Immersive Image Gallery / Proof */}
      <section className="px-4 py-8 md:px-8 lg:px-12 bg-[#111111]">
        <div className="mx-auto max-w-[1800px] grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="relative aspect-[4/5] overflow-hidden rounded bg-gray-900 group">
            <Image
              src="/images/products/small/private/3x6-house.webp"
              alt="생활 동선"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">DESIGN</p>
              <p className="text-lg font-bold text-white">최적화된 생활 동선</p>
            </div>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded bg-gray-900 group hidden md:block">
            <Image
              src="/images/company/factory.webp"
              alt="제작 환경"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">FACTORY</p>
              <p className="text-lg font-bold text-white">표준화된 제작 환경</p>
            </div>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded bg-gray-900 group">
            <Image
              src="/images/products/large/L-2.webp"
              alt="설치 현장"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">INSTALLATION</p>
              <p className="text-lg font-bold text-white">안전한 현장 설치</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Target Audience */}
      <section className="bg-[#fbfbfa] px-6 py-20 md:px-12 lg:px-24 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">WHO IT FITS</p>
            <h2 className="text-3xl font-black md:text-4xl lg:text-5xl">
              목적에 맞는 공간을 <br className="md:hidden" />
              정확하게.
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {buyerPaths.map((path) => (
              <div key={path.title} className="rounded border border-[#e5e5df] bg-white p-8 transition-shadow hover:shadow-md">
                <path.icon className="h-6 w-6 text-gray-900 mb-6" />
                <h3 className="text-xl font-black text-gray-900">{path.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-gray-600">
                  {path.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA Section */}
      <section className="bg-white px-6 py-24 md:px-12 lg:px-24 lg:py-32 text-center border-t border-[#e5e5df]">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-black md:text-5xl lg:text-6xl">
            지금 바로 구성해보세요
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-gray-600 md:text-base">
            원하는 크기와 옵션을 선택하면 예상 견적과 함께 <br className="hidden md:block" />
            위트 매니저가 현장 조건에 맞춘 정확한 안내를 도와드립니다.
          </p>
          <Link
            href="/customize"
            className="mt-10 inline-flex h-14 items-center justify-center gap-3 rounded bg-[#111111] px-10 text-sm font-bold text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            나만의 위트 만들기
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}

```

### app/admin/page.tsx

```tsx
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

```

### components/admin/cms/SupportEditor.tsx

```tsx
'use client';

import { Fragment, useState } from 'react';
import { Plus, Trash2, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { createFaq, updateFaq, deleteFaq } from '@/app/actions/faq-actions';
import { createNotice, updateNotice, deleteNotice } from '@/app/actions/notice-actions';
import {
    ConsolePageHeader,
    ConsolePanel,
    consoleInputClass,
    consolePrimaryButtonClass,
    consoleSecondaryButtonClass,
    consoleIconButtonClass
} from '@/components/admin/ConsolePrimitives';

interface FAQ {
    id: string;
    question_ko: string;
    answer_ko: string;
    question_en: string | null;
    answer_en: string | null;
    order_index: number;
    created_at: string;
}

interface Notice {
    id: string;
    title: string;
    content: string;
    is_pinned: boolean;
    is_active: boolean;
    created_at: string;
}

export default function SupportEditor({
    initialFAQs,
    initialNotices,
    dbError
}: {
    initialFAQs: FAQ[],
    initialNotices: Notice[],
    dbError?: string | null
}) {
    const [activeTab, setActiveTab] = useState('faq');
    const [faqs, setFAQs] = useState<FAQ[]>(initialFAQs);
    const [notices, setNotices] = useState<Notice[]>(initialNotices);
    const [faqDrafts, setFaqDrafts] = useState<Record<string, FAQ>>({});
    const [noticeDrafts, setNoticeDrafts] = useState<Record<string, Notice>>({});
    const [savingItems, setSavingItems] = useState<Record<string, boolean>>({});
    const [loading, setLoading] = useState(false);
    const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
    const [expandedNotice, setExpandedNotice] = useState<string | null>(null);
    const router = useRouter();

    const setItemSaving = (key: string, value: boolean) => {
        setSavingItems(prev => ({ ...prev, [key]: value }));
    };

    const getFaqDraft = (faq: FAQ) => faqDrafts[faq.id] || faq;
    const getNoticeDraft = (notice: Notice) => noticeDrafts[notice.id] || notice;

    const isFaqDirty = (faq: FAQ) => {
        const draft = getFaqDraft(faq);
        return (
            draft.question_ko !== faq.question_ko ||
            draft.answer_ko !== faq.answer_ko ||
            (draft.question_en || '') !== (faq.question_en || '') ||
            (draft.answer_en || '') !== (faq.answer_en || '')
        );
    };

    const isNoticeDirty = (notice: Notice) => {
        const draft = getNoticeDraft(notice);
        return (
            draft.title !== notice.title ||
            draft.content !== notice.content ||
            draft.is_pinned !== notice.is_pinned ||
            draft.is_active !== notice.is_active
        );
    };

    const handleChangeFAQDraft = (id: string, field: keyof FAQ, value: FAQ[keyof FAQ]) => {
        const source = faqs.find(faq => faq.id === id);
        if (!source) return;
        setFaqDrafts(prev => ({
            ...prev,
            [id]: { ...(prev[id] || source), [field]: value }
        }));
    };

    const handleChangeNoticeDraft = (id: string, field: keyof Notice, value: Notice[keyof Notice]) => {
        const source = notices.find(notice => notice.id === id);
        if (!source) return;
        setNoticeDrafts(prev => ({
            ...prev,
            [id]: { ...(prev[id] || source), [field]: value }
        }));
    };

    // --- FAQ Handlers ---
    const handleAddFAQ = async () => {
        setLoading(true);
        try {
            const newFAQData = {
                question_ko: '새 질문',
                answer_ko: '내용을 입력하세요.',
                question_en: 'New Question',
                answer_en: 'Enter content here.',
                order_index: faqs.length,
            };

            const result = await createFaq(newFAQData);
            if (result.success && result.data) {
                setFAQs(prev => [...prev, result.data as FAQ]);
                setExpandedFaq(result.data.id);
                toast.success('FAQ가 추가되었습니다.');
            } else {
                toast.error(result.message || 'FAQ 추가 실패');
            }
        } catch (e) {
            console.error(e);
            toast.error('오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };

    const handleSaveFAQ = async (faq: FAQ) => {
        const draft = getFaqDraft(faq);
        const key = `faq:${faq.id}`;
        setItemSaving(key, true);
        try {
            const result = await updateFaq(faq.id, {
                question_ko: draft.question_ko,
                answer_ko: draft.answer_ko,
                question_en: draft.question_en,
                answer_en: draft.answer_en,
            });
            if (result.success && result.data) {
                setFAQs(prev => prev.map(item => item.id === faq.id ? result.data as FAQ : item));
                setFaqDrafts(prev => {
                    const next = { ...prev };
                    delete next[faq.id];
                    return next;
                });
                toast.success('FAQ가 저장되었습니다.');
            } else {
                toast.error(result.message || 'FAQ 저장 실패');
            }
        } catch (e) {
            console.error(e);
            toast.error('FAQ 저장 중 오류가 발생했습니다.');
        } finally {
            setItemSaving(key, false);
        }
    };

    const handleDeleteFAQ = async (id: string) => {
        if (!confirm('이 FAQ를 삭제하시겠습니까?')) return;
        setLoading(true);
        try {
            const result = await deleteFaq(id);
            if (result.success) {
                setFAQs(prev => prev.filter(f => f.id !== id));
                setFaqDrafts(prev => {
                    const next = { ...prev };
                    delete next[id];
                    return next;
                });
                toast.success('FAQ가 삭제되었습니다.');
            } else {
                toast.error(result.message);
            }
        } catch (e) {
            console.error(e);
            toast.error('오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };

    // --- Notice Handlers ---
    const handleAddNotice = async () => {
        setLoading(true);
        try {
            const newNoticeData = {
                title: '새 공지사항',
                content: '내용을 입력하세요.',
                is_pinned: false,
                is_active: true
            };

            const result = await createNotice(newNoticeData);
            if (result.success && result.data) {
                setNotices(prev => [result.data as Notice, ...prev]);
                setExpandedNotice(result.data.id);
                toast.success('공지사항이 추가되었습니다.');
            } else {
                toast.error(result.message);
            }
        } catch (e) {
            console.error(e);
            toast.error('오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };

    const handleSaveNotice = async (notice: Notice) => {
        const draft = getNoticeDraft(notice);
        const key = `notice:${notice.id}`;
        setItemSaving(key, true);
        try {
            const result = await updateNotice(notice.id, {
                title: draft.title,
                content: draft.content,
                is_pinned: draft.is_pinned,
                is_active: draft.is_active,
            });
            if (result.success && result.data) {
                setNotices(prev => prev.map(item => item.id === notice.id ? result.data as Notice : item));
                setNoticeDrafts(prev => {
                    const next = { ...prev };
                    delete next[notice.id];
                    return next;
                });
                toast.success('공지사항이 저장되었습니다.');
            } else {
                toast.error(result.message || '공지사항 저장 실패');
            }
        } catch (e) {
            console.error(e);
            toast.error('공지사항 저장 중 오류가 발생했습니다.');
        } finally {
            setItemSaving(key, false);
        }
    };

    const handleDeleteNotice = async (id: string) => {
        if (!confirm('이 공지사항을 삭제하시겠습니까?')) return;
        setLoading(true);
        try {
            const result = await deleteNotice(id);
            if (result.success) {
                setNotices(prev => prev.filter(n => n.id !== id));
                setNoticeDrafts(prev => {
                    const next = { ...prev };
                    delete next[id];
                    return next;
                });
                toast.success('공지사항이 삭제되었습니다.');
            } else {
                toast.error(result.message);
            }
        } catch (e) {
            console.error(e);
            toast.error('오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <ConsolePageHeader
                eyebrow="SYSTEM"
                title="고객지원 관리"
                description="FAQ 및 공지사항을 관리합니다."
            />

            {/* Database Setup Error Guide */}
            {dbError && (
                <ConsolePanel className="p-6 bg-red-50/50 border-red-200 space-y-4">
                    <div className="flex items-center gap-2 text-red-700 font-bold text-sm">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        데이터베이스 설정이 필요합니다
                    </div>
                    <p className="text-xs text-red-600 leading-relaxed font-medium">
                        현재 데이터베이스 스키마가 최신 코드가 요구하는 형식과 다릅니다. (에러: {dbError})
                        <br />아래 SQL을 Supabase SQL Editor에서 실행하여 테이블을 업데이트해주세요.
                    </p>
                    <div className="bg-black rounded p-4 overflow-x-auto">
                        <pre className="text-[11px] text-[#d8d8d2] font-mono leading-relaxed">
                            {`-- 1. FAQ 테이블 최신화
CREATE TABLE IF NOT EXISTS faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_ko TEXT NOT NULL,
  answer_ko TEXT NOT NULL,
  question_en TEXT,
  answer_en TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. 만약 기존 테이블이 있다면 누락된 컬럼 추가 및 레거시 제약 조건 제거
DO $$
BEGIN
    -- 신규 컬럼 추가
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'faqs' AND column_name = 'question_ko') THEN
        ALTER TABLE faqs ADD COLUMN question_ko TEXT;
        ALTER TABLE faqs ADD COLUMN answer_ko TEXT;
        ALTER TABLE faqs ADD COLUMN question_en TEXT;
        ALTER TABLE faqs ADD COLUMN answer_en TEXT;
        ALTER TABLE faqs ADD COLUMN order_index INTEGER DEFAULT 0;
    END IF;

    -- 레거시 컬럼(question, answer) 제약 조건 제거 (400 에러 해결 핵심)
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'faqs' AND column_name = 'question') THEN
        ALTER TABLE faqs ALTER COLUMN question DROP NOT NULL;
        ALTER TABLE faqs ALTER COLUMN answer DROP NOT NULL;
    END IF;
END $$;

-- 3. 문의 테이블 컬럼 추가
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'inquiries' AND column_name = 'category') THEN
        ALTER TABLE inquiries ADD COLUMN category TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'inquiries' AND column_name = 'reply_content') THEN
        ALTER TABLE inquiries ADD COLUMN reply_content TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'inquiries' AND column_name = 'replied_at') THEN
        ALTER TABLE inquiries ADD COLUMN replied_at TIMESTAMPTZ;
    END IF;
END $$;`}
                        </pre>
                    </div>
                    <p className="text-[11px] text-red-500/70 font-bold">
                        * SQL 실행 후 페이지를 새로고침하면 정상적으로 작동합니다.
                    </p>
                </ConsolePanel>
            )}

            {/* Tabs */}
            <div className="border-b border-[#e5e5df]">
                <nav className="-mb-px flex space-x-6 px-1">
                    <button
                        onClick={() => setActiveTab('faq')}
                        className={`py-3 border-b-2 font-bold text-xs transition-colors ${activeTab === 'faq'
                            ? 'border-[#111111] text-[#111111]'
                            : 'border-transparent text-gray-400 hover:text-gray-900'
                            }`}
                    >
                        FAQ 관리
                    </button>
                    <button
                        onClick={() => setActiveTab('notices')}
                        className={`py-3 border-b-2 font-bold text-xs transition-colors ${activeTab === 'notices'
                            ? 'border-[#111111] text-[#111111]'
                            : 'border-transparent text-gray-400 hover:text-gray-900'
                            }`}
                    >
                        공지사항 관리
                    </button>
                </nav>
            </div>

            <ConsolePanel className="p-6 min-h-[500px]">
                {activeTab === 'faq' ? (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h3 className="text-sm font-black text-gray-900">FAQ 목록</h3>
                            <button
                                onClick={handleAddFAQ}
                                disabled={loading}
                                className={consolePrimaryButtonClass + " px-3 py-1.5"}
                            >
                                {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin mr-1" /> : <Plus className="w-3.5 h-3.5 mr-1" />}
                                FAQ 추가
                            </button>
                        </div>

                        <div className="space-y-3">
                            {faqs.map((faq) => {
                                const draft = getFaqDraft(faq);
                                const dirty = isFaqDirty(faq);
                                const saving = Boolean(savingItems[`faq:${faq.id}`]);

                                return (
                                    <div key={faq.id} className="border border-[#e5e5df] bg-white rounded overflow-hidden">
                                    <div
                                        className="flex items-center justify-between p-4 cursor-pointer hover:bg-[#fbfbfa] transition-colors"
                                        onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                                    >
                                        <div className="flex-1 mr-4">
                                            <div className="font-bold text-sm text-gray-900">
                                                {faq.question_ko}
                                            </div>
                                            <div className="text-[11px] font-medium text-gray-400 mt-0.5">
                                                {faq.question_en || '(No English Question)'}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDeleteFAQ(faq.id);
                                                }}
                                                aria-label="FAQ 삭제"
                                                className={`${consoleIconButtonClass} text-gray-400 hover:text-red-500 hover:bg-red-50`}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                            {expandedFaq === faq.id ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                                        </div>
                                    </div>

                                    {expandedFaq === faq.id && (
                                        <div className="p-4 border-t border-[#e5e5df] bg-[#fbfbfa] space-y-6">
                                            {/* Primary Korean Section */}
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-2 border-l-2 border-[#111111] pl-2">
                                                    <h4 className="text-xs font-black text-gray-900">국문 정보 (필수)</h4>
                                                </div>
                                                <div className="grid grid-cols-1 gap-3">
                                                    <div>
                                                        <label className="text-[11px] font-bold text-gray-500 mb-1 block">질문 (Korean)</label>
                                                        <input
                                                            type="text"
                                                            value={draft.question_ko}
                                                            onChange={(e) => handleChangeFAQDraft(faq.id, 'question_ko', e.target.value)}
                                                            placeholder="질문을 입력하세요"
                                                            className={consoleInputClass + " w-full bg-white"}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="text-[11px] font-bold text-gray-500 mb-1 block">답변 (Korean)</label>
                                                        <textarea
                                                            rows={3}
                                                            value={draft.answer_ko}
                                                            onChange={(e) => handleChangeFAQDraft(faq.id, 'answer_ko', e.target.value)}
                                                            placeholder="답변 내용을 입력하세요"
                                                            className={consoleInputClass + " w-full bg-white resize-none"}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Secondary English Section */}
                                            <div className="space-y-3 pt-4 border-t border-[#e5e5df]">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2 border-l-2 border-gray-300 pl-2">
                                                        <h4 className="text-xs font-bold text-gray-600">영문 정보 (선택)</h4>
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 opacity-70 hover:opacity-100 transition-opacity">
                                                    <div>
                                                        <label className="text-[11px] font-bold text-gray-500 mb-1 block">Question (English)</label>
                                                        <input
                                                            type="text"
                                                            value={draft.question_en || ''}
                                                            onChange={(e) => handleChangeFAQDraft(faq.id, 'question_en', e.target.value)}
                                                            placeholder="English Question"
                                                            className={consoleInputClass + " w-full bg-white"}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="text-[11px] font-bold text-gray-500 mb-1 block">Answer (English)</label>
                                                        <textarea
                                                            rows={3}
                                                            value={draft.answer_en || ''}
                                                            onChange={(e) => handleChangeFAQDraft(faq.id, 'answer_en', e.target.value)}
                                                            placeholder="English Answer"
                                                            className={consoleInputClass + " w-full bg-white resize-none"}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-2 border-t border-[#e5e5df] pt-4 sm:flex-row sm:items-center sm:justify-between">
                                                <p className="text-[11px] font-bold text-gray-500">
                                                    {dirty ? '저장되지 않은 변경사항이 있습니다.' : '최신 상태입니다.'}
                                                </p>
                                                <div className="flex gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={() => setFaqDrafts(prev => {
                                                            const next = { ...prev };
                                                            delete next[faq.id];
                                                            return next;
                                                        })}
                                                        disabled={!dirty || saving}
                                                        className={consoleSecondaryButtonClass}
                                                    >
                                                        되돌리기
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleSaveFAQ(faq)}
                                                        disabled={!dirty || saving}
                                                        className={consolePrimaryButtonClass}
                                                    >
                                                        {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
                                                        {saving ? '저장 중' : 'FAQ 저장'}
                                                    </button>
                                                </div>
                                            </div>

```

### components/admin/inquiries/InquiryList.tsx

```tsx
'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import {
    Search, Filter, Mail, Phone, Calendar,
    CheckCircle2, Clock, MessageSquare, Trash2,
    MoreHorizontal, X
} from 'lucide-react';
import { toast } from 'sonner';
import { updateInquiryStatus, deleteInquiry, replyToInquiry } from '@/app/actions/inquiry-actions';
import {
    ConsolePanel,
    ConsoleSectionTitle,
    ConsoleStatusPill,
    consoleInputClass,
    consolePrimaryButtonClass,
    consoleSecondaryButtonClass,
    consoleIconButtonClass
} from '@/components/admin/ConsolePrimitives';

interface Inquiry {
    id: string;
    category: string | null;
    name: string;
    email: string;
    phone: string | null;
    message: string;
    status: 'new' | 'read' | 'replied';
    reply_content: string | null;
    replied_at: string | null;
    created_at: string;
}

export default function InquiryList({ initialInquiries }: { initialInquiries: Inquiry[] }) {
    const [inquiries, setInquiries] = useState<Inquiry[]>(initialInquiries);
    const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
    const [filterStatus, setFilterStatus] = useState<string>('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [replyText, setReplyText] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [pendingIds, setPendingIds] = useState<Record<string, boolean>>({});

    const setInquiryPending = (id: string, value: boolean) => {
        setPendingIds(prev => ({ ...prev, [id]: value }));
    };

    const filteredInquiries = inquiries.filter(inquiry => {
        const matchesStatus = filterStatus === 'all' || inquiry.status === filterStatus;
        const matchesSearch =
            inquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            inquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            inquiry.message.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    const handleStatusChange = async (id: string, newStatus: 'new' | 'read' | 'replied') => {
        if (pendingIds[id]) return;

        const previousInquiries = inquiries;
        const previousSelectedInquiry = selectedInquiry;
        setInquiryPending(id, true);

        setInquiries(previousInquiries.map(i => i.id === id ? { ...i, status: newStatus } : i));
        if (selectedInquiry?.id === id) {
            setSelectedInquiry({ ...selectedInquiry, status: newStatus });
        }

        try {
            const result = await updateInquiryStatus(id, newStatus);
            if (!result.success) {
                throw new Error(result.message || '상태 업데이트 실패');
            }
        } catch (error) {
            console.error('Failed to update status:', error);
            setInquiries(previousInquiries);
            setSelectedInquiry(current => current?.id === id ? previousSelectedInquiry : current);
            toast.error('문의 상태를 저장하지 못했습니다. 이전 상태로 복구했습니다.');
        } finally {
            setInquiryPending(id, false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('정말 삭제하시겠습니까?')) return;

        const previousInquiries = inquiries;
        const previousSelectedInquiry = selectedInquiry;
        setInquiryPending(id, true);

        setInquiries(previousInquiries.filter(i => i.id !== id));
        if (selectedInquiry?.id === id) {
            setSelectedInquiry(null);
        }

        try {
            const result = await deleteInquiry(id);
            if (!result.success) {
                throw new Error(result.message || '문의 삭제 실패');
            }
            toast.success('문의가 삭제되었습니다.');
        } catch (error) {
            console.error('Failed to delete inquiry:', error);
            setInquiries(previousInquiries);
            setSelectedInquiry(previousSelectedInquiry);
            toast.error('삭제 중 오류가 발생했습니다. 이전 상태로 복구했습니다.');
        } finally {
            setInquiryPending(id, false);
        }
    };

    const handleSaveReply = async () => {
        if (!selectedInquiry || !replyText.trim()) return;

        setIsSending(true);
        try {
            const result = await replyToInquiry(selectedInquiry.id, replyText);
            if (!result.success) {
                throw new Error(result.message || '답변 등록 실패');
            }

            const updatedInquiry: Inquiry = {
                ...selectedInquiry,
                status: 'replied',
                reply_content: replyText,
                replied_at: new Date().toISOString()
            };

            setInquiries(inquiries.map(i => i.id === selectedInquiry.id ? updatedInquiry : i));
            setSelectedInquiry(updatedInquiry);
            setReplyText('');
            toast.success('답변이 저장되었습니다.');
        } catch (error) {
            console.error('Failed to save reply:', error);
            toast.error('답변 저장에 실패했습니다.');
        } finally {
            setIsSending(false);
        }
    };

    const handleSendEmail = () => {
        if (!selectedInquiry) return;

        const subject = `[Weet] ${selectedInquiry.name}님 문의에 대한 답변입니다.`;
        const body = selectedInquiry.reply_content || replyText || '';

        window.location.href = `mailto:${selectedInquiry.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    };

    const getStatusTone = (status: string) => {
        switch (status) {
            case 'new': return 'danger';
            case 'replied': return 'success';
            default: return 'neutral';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'new': return '신규';
            case 'read': return '읽음';
            case 'replied': return '답변완료';
            default: return status;
        }
    };

    return (
        <div className="flex h-[calc(100vh-120px)] gap-6">
            {/* Left: List */}
            <div className={`flex-1 flex flex-col bg-white rounded-md border border-[#e5e5df] overflow-hidden ${selectedInquiry ? 'hidden md:flex' : 'flex'}`}>
                {/* Search & Filter */}
                <div className="p-4 border-b border-[#e5e5df] space-y-3 bg-[#fbfbfa]">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="이름, 이메일, 내용 검색..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className={`${consoleInputClass} w-full pl-9`}
                        />
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-1">
                        {['all', 'new', 'read', 'replied'].map((status) => (
                            <button
                                key={status}
                                onClick={() => setFilterStatus(status)}
                                className={`px-3 py-1.5 rounded text-xs font-bold whitespace-nowrap transition-colors ${filterStatus === status
                                    ? 'bg-[#111111] text-white'
                                    : 'bg-white border border-[#e5e5df] text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                {status === 'all' ? '전체' : getStatusLabel(status)}
                            </button>
                        ))}
                    </div>
                </div>

                {/* List Items */}
                <div className="flex-1 overflow-y-auto divide-y divide-[#e5e5df]">
                    {filteredInquiries.map((inquiry) => (
                        <div
                            key={inquiry.id}
                            onClick={() => {
                                    setSelectedInquiry(inquiry);
                                    setReplyText(inquiry.reply_content || '');
                                if (inquiry.status === 'new' && !pendingIds[inquiry.id]) {
                                    handleStatusChange(inquiry.id, 'read');
                                }
                            }}
                            className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${pendingIds[inquiry.id] ? 'pointer-events-none opacity-70' : ''} ${selectedInquiry?.id === inquiry.id ? 'bg-[#f4f4f1] hover:bg-[#f4f4f1]' : ''
                                }`}
                        >
                            <div className="flex justify-between items-start mb-1">
                                <h3 className={`text-sm ${inquiry.status === 'new' ? 'font-black text-gray-900' : 'font-bold text-gray-700'}`}>
                                    {inquiry.name}
                                </h3>
                                <span className="text-[11px] text-gray-400 whitespace-nowrap ml-2">
                                    {format(new Date(inquiry.created_at), 'MM.dd HH:mm')}
                                </span>
                            </div>
                            <p className="text-[13px] text-gray-500 line-clamp-2 mb-3 leading-relaxed">{inquiry.message}</p>
                            <div className="flex items-center gap-2">
                                <ConsoleStatusPill tone={getStatusTone(inquiry.status) as any}>
                                    {getStatusLabel(inquiry.status)}
                                </ConsoleStatusPill>
                            </div>
                        </div>
                    ))}
                    {filteredInquiries.length === 0 && (
                        <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                            <MessageSquare className="w-6 h-6 mb-3 opacity-20" />
                            <p className="text-xs font-bold">조회된 문의가 없습니다.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Right: Detail View */}
            {selectedInquiry ? (
                <div className="flex-[1.5] bg-white rounded-md border border-[#e5e5df] overflow-hidden flex flex-col absolute inset-0 z-50 md:static md:inset-auto">
                    {/* Header */}
                    <div className="p-5 border-b border-[#e5e5df] flex justify-between items-start bg-[#fbfbfa]">
                        <div>
                            <div className="flex items-center gap-3 mb-3">
                                <h2 className="text-lg font-black text-gray-900">{selectedInquiry.name}</h2>
                                <ConsoleStatusPill tone={getStatusTone(selectedInquiry.status) as any}>
                                    {getStatusLabel(selectedInquiry.status)}
                                </ConsoleStatusPill>
                            </div>
                            <div className="flex flex-col gap-1.5 text-xs font-medium text-gray-500">
                                <div className="flex items-center gap-2">
                                    <Mail className="w-3.5 h-3.5" />
                                    <a href={`mailto:${selectedInquiry.email}`} className="hover:text-gray-900 transition-colors">
                                        {selectedInquiry.email}
                                    </a>
                                </div>
                                {selectedInquiry.phone && (
                                    <div className="flex items-center gap-2">
                                        <Phone className="w-3.5 h-3.5" />
                                        <a href={`tel:${selectedInquiry.phone}`} className="hover:text-gray-900 transition-colors">
                                            {selectedInquiry.phone}
                                        </a>
                                    </div>
                                )}
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-3.5 h-3.5" />
                                    <span>{format(new Date(selectedInquiry.created_at), 'yyyy년 MM월 dd일 HH:mm', { locale: ko })}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setSelectedInquiry(null)}
                                className={`${consoleIconButtonClass} md:hidden`}
                            >
                                <X className="w-4 h-4 text-gray-500" />
                            </button>
                            <button
                                onClick={() => handleDelete(selectedInquiry.id)}
                                disabled={Boolean(pendingIds[selectedInquiry.id])}
                                className={`${consoleIconButtonClass} text-red-600 hover:text-red-700 hover:bg-red-50 hover:border-red-200`}
                                title="삭제"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-5 overflow-y-auto bg-white">
                        <ConsoleSectionTitle>문의 내용</ConsoleSectionTitle>
                        <div className="p-4 rounded-md border border-[#e5e5df] bg-[#fbfbfa] min-h-[120px] mb-6 mt-3">
                            <p className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">
                                {selectedInquiry.message}
                            </p>
                        </div>

                        {/* Reply Section */}
                        <div className="flex items-center justify-between mb-3">
                            <ConsoleSectionTitle>답변 작성</ConsoleSectionTitle>
                            {selectedInquiry.replied_at && (
                                <span className="text-[11px] font-bold text-gray-400">
                                    최근 답변: {format(new Date(selectedInquiry.replied_at), 'yyyy.MM.dd HH:mm')}
                                </span>
                            )}
                        </div>
                        <div className="p-4 rounded-md border border-[#e5e5df] bg-[#f4f4f1]">
                            <textarea
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                className="w-full h-32 p-3 border border-[#d8d8d2] rounded bg-white text-sm focus:outline-none focus:border-[#111111] focus:ring-1 focus:ring-[#111111] resize-none mb-4"
                                placeholder="답변 내용을 입력하세요..."
                            />
                            <div className="flex justify-end gap-2">
                                <button
                                    onClick={handleSendEmail}
                                    className={consoleSecondaryButtonClass}
                                >
                                    <Mail className="w-3.5 h-3.5 mr-1" />
                                    메일 앱 열기
                                </button>
                                <button
                                    onClick={handleSaveReply}
                                    disabled={isSending || !replyText.trim()}
                                    className={consolePrimaryButtonClass}
                                >
                                    <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                                    {isSending ? '저장 중...' : '답변 저장 및 완료 처리'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="hidden md:flex flex-[1.5] items-center justify-center bg-[#fbfbfa] rounded-md border border-[#e5e5df] text-gray-400 flex-col gap-3">
                    <MessageSquare className="w-8 h-8 opacity-20" />
                    <p className="text-xs font-bold text-gray-500">문의 내역을 선택하여 상세 내용을 확인하세요.</p>
                </div>
            )}
        </div>
    );
}

```

## Exact Review Questions

1. Are all five concrete MUST_FIX items from `.codex/pro-review.md` resolved by the current code and visual evidence?
2. Is there any remaining concrete MUST_FIX that should block commit/push/deploy? Only mark MUST_FIX if it is specific, reproducible, and supported by the packet.
3. Return exactly: VERDICT, MUST_FIX, OPTIONAL, RATIONALE.
4. If there are no blocking issues, use `VERDICT: PASS` and `MUST_FIX: None`.

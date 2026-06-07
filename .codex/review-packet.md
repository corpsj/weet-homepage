# GPT-5.5 Pro Review Request

Marker: `WEET_REVIEW_20260607_ADMIN_CONSOLE_SLICE_04`

You are reviewing an existing local Next.js project. You cannot see my computer, repository, terminal, git history, previous Codex actions, browser state, database state, generated files, runtime logs, or hidden files. All relevant context is included below.

Return only this exact format:

~~~
VERDICT: PASS | REVISE

CONTEXT_GAPS:
- ...

MUST_FIX:
- ...

OPTIONAL:
- ...

TESTS_TO_RUN:
- ...

RISK_NOTES:
- ...
~~~

## 1. Active Task

Original user request: continue the previous recursive Weet homepage/admin improvement workflow using Antigravity, GPT-5.5 Pro, no silent stops, extensive PC/tablet/mobile testing, and trusted `agent-inbox/` records. The user wants the admin page redesigned away from the old UI into a premium, simple, technical console consistent with Tesla dashboard / Grok / SpaceX / xAI references. The user also requires findings and UX improvement ideas to be stored in `agent-inbox/`.

Active slice reviewed here:
- Unify core admin child pages under the new premium technical console direction.
- Preserve prior GPT Pro `MUST_FIX` behavior around public project readiness and admin invalid image rendering.
- Add PC/tablet/mobile authenticated admin regression coverage.
- Record Antigravity/Computer Use failures and QA findings in `agent-inbox/`.

Non-goals for this slice:
- UTM, CMS, gallery, inquiries, edit/new forms, and product modal full redesign are intentionally left as follow-up backlog.
- Production deployment has not yet happened for this slice; local build and authenticated local QA are complete.

## 2. Project Snapshot

Purpose: Weet homepage and admin console for a Korean movable modular-home company.

Stack:
- Next.js 16.2.7 app router, React 19, TypeScript, Tailwind.
- Supabase auth/database/storage.
- Playwright E2E, Vitest unit tests.

Important routes/modules:
- Public: `/`, `/products`, `/projects`, `/customize`, `/support`.
- Admin: `/admin`, `/admin/products`, `/admin/projects`, `/admin/consultations`, `/admin/insights`.
- Project readiness helpers: `lib/projects/publicProjects.ts`.
- Admin shell: `components/admin/AdminShell.tsx`, `components/admin/AdminSidebar.tsx`.

Database/external services:
- Supabase service role is available locally for E2E-only temporary admin users and fixture seeding.
- Google Analytics can be configured or absent; `/admin/insights` has a configured and unconfigured state.

## 3. Current Progress

Changes made in this slice:
- Generated a UI reference image before UI implementation per `agent-inbox/UI-design.md`; saved as `agent-inbox/generated-ui-reference-admin-console.png`.
- Attempted Antigravity IDE delegation through Computer Use; Computer Use timed out, so failure was recorded in `agent-inbox/antigravity-failures.md` and `.codex/state.md`.
- Added `components/admin/ConsolePrimitives.tsx` with console page header, metric card, panel, status pill, readiness ring, and shared form/button classes.
- Updated `/admin/products` product grid/list to use console primitives, readiness rings, defensive image URL validation, current-page search, and image/price readiness metrics.
- Updated `/admin/projects` to use console primitives, search, readiness ring, issue chips, safer image placeholder copy, and summary cards.
- Updated `/admin/consultations` to show SLA-oriented metrics and row-level SLA pills while keeping status/memo server actions intact.
- Updated `/admin/insights` to remove old rounded marketing-dashboard styling and use console panels/headers.
- Added Playwright coverage proving the admin operations pages expose readiness/SLA controls across PC/tablet/mobile.
- Appended QA observations and remaining work to `agent-inbox/findings-admin-simulation.md` and `agent-inbox/implementation-backlog.md`.

Known user-authored concurrent instruction:
- `agent-inbox/안티그래비티의 작업범위.md` gained a line saying Antigravity IDE Computer Use must work somehow. I did not revert it. I retried Antigravity recovery and recorded the continued Computer Use timeout.

## 4. Repository State

Current branch:
~~~text
zoo/customize-configurator...origin/zoo/customize-configurator
~~~

Recent commits:
~~~text
0730eec Record production customize verification
5fff2fc Share customize floorplan image status
1f4c37a Fix customize floorplans and confidence checks
eeadb4b feat: update configurator UI, admin shell, and add design documents
1b69c8e feat: update customize configurator and admin pages with test updates
~~~

Git status:
~~~text
 M .codex/state.md
 M agent-inbox/antigravity-failures.md
 M agent-inbox/findings-admin-simulation.md
 M agent-inbox/implementation-backlog.md
 M "agent-inbox/안티그래비티의 작업범위.md"
 M app/admin/insights/page.tsx
 M app/admin/projects/AdminProjectsClient.tsx
 M components/admin/consultations/ConsultationManager.tsx
 M components/admin/insights/AnalyticsDashboard.tsx
 M components/admin/products/ProductGrid.tsx
 M e2e/public-pages.spec.ts
?? .codex/qa/
?? agent-inbox/generated-ui-reference-admin-console.png
?? components/admin/ConsolePrimitives.tsx
~~~

Changed files:
~~~text
.codex/state.md
agent-inbox/antigravity-failures.md
agent-inbox/findings-admin-simulation.md
agent-inbox/implementation-backlog.md
agent-inbox/안티그래비티의 작업범위.md
app/admin/insights/page.tsx
app/admin/projects/AdminProjectsClient.tsx
components/admin/consultations/ConsultationManager.tsx
components/admin/insights/AnalyticsDashboard.tsx
components/admin/products/ProductGrid.tsx
e2e/public-pages.spec.ts
components/admin/ConsolePrimitives.tsx (new)
agent-inbox/generated-ui-reference-admin-console.png (new generated UI reference image)
.codex/qa/admin-console-slice/* (new local QA evidence)
~~~

Diff stat:
~~~text
 .codex/state.md                                    |   8 +
 agent-inbox/antigravity-failures.md                |  12 ++
 agent-inbox/findings-admin-simulation.md           |  33 ++++
 agent-inbox/implementation-backlog.md              |   6 +
 agent-inbox/안티그래비티의 작업범위.md             |   1 +
 app/admin/insights/page.tsx                        |  28 +--
 app/admin/projects/AdminProjectsClient.tsx         | 173 +++++++++-------
 components/admin/consultations/ConsultationManager.tsx | 104 ++++++++--
 components/admin/insights/AnalyticsDashboard.tsx   |  61 +++---
 components/admin/products/ProductGrid.tsx          | 220 +++++++++++++++------
 e2e/public-pages.spec.ts                           |  42 ++++
~~~

## 5. Git Diff / Relevant Excerpts

New shared console primitives:
~~~tsx
// components/admin/ConsolePrimitives.tsx
export const consoleInputClass =
  'h-10 rounded-md border border-[#d8d8d2] bg-[#fbfbfa] px-3 text-sm text-[#111111] outline-none transition-colors placeholder:text-gray-400 focus:border-[#111111] focus:ring-2 focus:ring-[#111111]/10 disabled:cursor-not-allowed disabled:opacity-60';

export const consolePrimaryButtonClass =
  'inline-flex h-10 items-center justify-center gap-2 rounded-md border border-[#111111] bg-[#111111] px-4 text-sm font-bold text-white transition-colors hover:bg-[#2a2a2a] focus:outline-none focus:ring-2 focus:ring-[#111111]/20 disabled:cursor-not-allowed disabled:opacity-60';

export function ConsolePageHeader({ eyebrow, title, description, actions }) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="min-w-0">
        <p className="mb-2 text-xs font-bold text-[#8a6a12]">{eyebrow}</p>
        <h1 className="text-2xl font-black text-[#111111]">{title}</h1>
        <p className="mt-1 max-w-2xl text-sm font-medium leading-6 text-gray-500">{description}</p>
      </div>
      {actions && <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}

export function ConsoleMetricCard({ label, value, caption, icon, tone = 'neutral' }) {
  const toneClass = {
    neutral: 'border-[#e5e5df] bg-white text-[#111111]',
    dark: 'border-[#111111] bg-[#111111] text-white',
    accent: 'border-[#eab308] bg-[#eab308] text-[#111111]',
    warning: 'border-[#fed7aa] bg-[#fff7ed] text-[#7c2d12]',
  }[tone];
  return <div className={cn('rounded-md border p-4 shadow-sm', toneClass)}>{/* metric */}</div>;
}

export function ConsoleStatusPill({ children, tone = 'neutral' }) {
  const toneClass = {
    neutral: 'border-[#d8d8d2] bg-[#f4f4f1] text-gray-600',
    success: 'border-[#bbf7d0] bg-[#f0fdf4] text-[#166534]',
    warning: 'border-[#fed7aa] bg-[#fff7ed] text-[#9a3412]',
    danger: 'border-[#fecaca] bg-[#fef2f2] text-[#b91c1c]',
    dark: 'border-[#111111] bg-[#111111] text-white',
  }[tone];
  return <span className={cn('inline-flex items-center rounded-md border px-2 py-1 text-xs font-bold', toneClass)}>{children}</span>;
}

export function ReadinessRing({ score }: { score: number }) {
  const safeScore = Math.max(0, Math.min(100, score));
  const color = safeScore >= 85 ? '#16a34a' : safeScore >= 65 ? '#eab308' : '#ef4444';
  return (
    <div className="grid h-10 w-10 place-items-center rounded-full text-xs font-black text-[#111111]"
      style={{ background: `conic-gradient(${color} ${safeScore * 3.6}deg, #e7e5df 0deg)` }}
      aria-label={`준비도 ${safeScore}점`}>
      <span className="grid h-8 w-8 place-items-center rounded-full bg-white">{safeScore}</span>
    </div>
  );
}
~~~

Product image/readiness logic:
~~~tsx
// components/admin/products/ProductGrid.tsx
const hasValidProductImageUrl = (value: string | null | undefined) => {
  if (!value) return false;
  return /^https?:\/\/.+/i.test(value) || value.startsWith('/images/');
};

const getProductReadinessScore = (product: Product) => {
  let score = 100;
  if (!product.is_active) score -= 20;
  if (!product.price) score -= 16;
  if (!hasValidProductImageUrl(product.image_url)) score -= 24;
  if (!product.description || product.description.length < 24) score -= 16;
  if (!product.size) score -= 12;
  if (!product.floor_plan_url) score -= 12;
  return Math.max(0, score);
};

const imageUrl = hasValidProductImageUrl(product.image_url) ? product.image_url : null;
{imageUrl ? <Image src={imageUrl} ... /> : <div>이미지 점검 필요</div>}
<ReadinessRing score={readinessScore} />
<ConsoleStatusPill tone={product.is_active ? 'success' : 'neutral'}>
  {product.is_active ? '공개' : '비공개'}
</ConsoleStatusPill>
~~~

Project readiness/search logic:
~~~tsx
// app/admin/projects/AdminProjectsClient.tsx
const filteredProjects = useMemo(() => {
  const normalized = searchTerm.trim().toLowerCase();
  if (!normalized) return projects;
  return projects.filter((project) => {
    return [project.title, project.client, project.location, project.status, ...(project.tags ?? [])]
      .filter(Boolean)
      .some((value) => value!.toLowerCase().includes(normalized));
  });
}, [projects, searchTerm]);

const statusColor = (status: string | null): 'neutral' | 'success' | 'warning' | 'dark' => {
  switch (status) {
    case 'completed': return 'success';
    case 'in_progress': return 'dark';
    case 'planned': return 'warning';
    default: return 'neutral';
  }
};

const publicIssues = getProjectPublicIssues(project);
const heroImage = getProjectHeroImage(project);
<ReadinessRing score={readinessScore(publicIssues)} />
{heroImage ? <Image src={heroImage} ... /> : <div>{project.images?.[0] ? 'URL 확인' : '이미지 없음'}</div>}
~~~

Consultation SLA logic:
~~~tsx
// components/admin/consultations/ConsultationManager.tsx
const getAgeMinutes = (createdAt: string) => {
  const time = Date.parse(createdAt);
  if (Number.isNaN(time)) return 0;
  return Math.max(0, Math.floor((Date.now() - time) / 60000));
};

const summary = consultations.reduce(
  (current, item) => {
    current[item.status] += 1;
    if (item.status !== '완료' && getAgeMinutes(item.createdAt) >= 120) current.slaRisk += 1;
    return current;
  },
  { 신규: 0, 진행중: 0, 완료: 0, 보류: 0, slaRisk: 0 } as Record<ConsultationStatus, number> & { slaRisk: number }
);

<ConsoleMetricCard label="SLA 위험" value={summary.slaRisk.toLocaleString('ko-KR')} caption="2시간 이상 미처리" tone={summary.slaRisk > 0 ? 'warning' : 'neutral'} />
<ConsoleStatusPill tone={isSlaRisk ? 'danger' : statusTone(item.status)}>
  {isSlaRisk ? 'SLA 위험' : formatAge(ageMinutes)}
</ConsoleStatusPill>
~~~

Insights style conversion:
~~~tsx
// app/admin/insights/page.tsx
<ConsolePageHeader
  eyebrow="TRAFFIC INTELLIGENCE"
  title="웹 로그 분석"
  description="방문자 트래픽, 유입 경로, 사용자 행동을 운영 판단에 바로 연결합니다."
/>
{!isConfigured ? (
  <ConsolePanel className="p-8 text-center md:p-12">...</ConsolePanel>
) : (
  <AnalyticsDashboard ... />
)}

// components/admin/insights/AnalyticsDashboard.tsx
<ConsolePanel className="p-5 lg:col-span-2">...traffic chart...</ConsolePanel>
<ConsoleMetricCard label={title} value={value} caption={subtext} icon={...} />
~~~

New E2E coverage:
~~~ts
// e2e/public-pages.spec.ts
test('admin console operations pages expose readiness controls across devices', async ({ page }) => {
  const credentials = await createE2EAdminCredentials();
  const viewports = [
    { label: 'pc', width: 1440, height: 960 },
    { label: 'tablet', width: 834, height: 1112 },
    { label: 'mobile', width: 390, height: 844 },
  ];
  try {
    await page.setViewportSize(viewports[0]);
    await loginAsAdmin(page, credentials);
    for (const viewport of viewports) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('/admin/products');
      await expect(page.getByText('PRODUCT READINESS')).toBeVisible();
      await expect(page.getByPlaceholder('현재 페이지 제품 검색')).toBeVisible();
      await expect(page.getByText('이미지 보완')).toBeVisible();
      await page.goto('/admin/projects');
      await expect(page.getByText('PROJECT READINESS')).toBeVisible();
      await expect(page.getByText('IMAGE HEALTH')).toBeVisible();
      await expect(page.getByPlaceholder('프로젝트명, 고객, 지역 검색')).toBeVisible();
      await page.goto('/admin/consultations');
      await expect(page.getByText('CONSULTATION SLA')).toBeVisible();
      await expect(page.getByText('SLA 위험')).toBeVisible();
      await page.goto('/admin/insights');
      await expect(page.getByText('TRAFFIC INTELLIGENCE')).toBeVisible();
      const overflowX = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
      expect(overflowX, `${viewport.label} admin console overflow`).toBeFalsy();
    }
  } finally {
    await credentials.cleanup();
  }
});
~~~

## 6. Validation State

Commands run:
~~~text
git status --short --branch
git diff --stat
npm run lint
npm test
npx playwright test e2e/public-pages.spec.ts --grep "Admin responsive shell|admin console operations"
npx playwright test e2e/public-pages.spec.ts e2e/customize-configurator.spec.ts
git diff --check
npm run build
Node/Playwright authenticated admin QA script over PC/tablet/mobile × products/projects/consultations/insights
Computer Use attempts: list_apps, get_app_state("Antigravity IDE")
Antigravity recovery: open -a "Antigravity IDE"; ps aux | rg -i "Antigravity|antigravity"; get_app_state("Antigravity IDE")
~~~

Validation output summary:
~~~text
npm run lint
> eslint . --max-warnings=0
PASS

npm test
Test Files 3 passed (3)
Tests 20 passed (20)

npx playwright test e2e/public-pages.spec.ts --grep "Admin responsive shell|admin console operations"
3 passed (19.3s)

npx playwright test e2e/public-pages.spec.ts e2e/customize-configurator.spec.ts
22 passed (20.0s)

git diff --check
PASS

npm run build
✓ Compiled successfully
✓ Finished TypeScript
✓ Generated static pages (20/20)
Warning remains: The "middleware" file convention is deprecated. Please use "proxy" instead.
~~~

Browser/Playwright findings:
~~~json
{
  "qaArtifact": ".codex/qa/admin-console-slice/summary.json",
  "screenshots": ".codex/qa/admin-console-slice/*.png",
  "checks": "12 screens: 4 admin routes × PC/tablet/mobile",
  "result": {
    "overflowX": false,
    "visibleOffscreenInteractiveControls": 0,
    "consoleErrors": 0,
    "pageErrors": 0,
    "expectedProbesVisible": true
  }
}
~~~

Visual inspection:
- `pc-products.png`: product cards use black/off-white/yellow console tone, readiness rings, active/image status chips.
- `pc-projects.png`: project table uses readiness rings and issue chips; invalid/missing image states are placeholders, not broken `<Image>` renders.
- `mobile-products.png`: no horizontal overflow; controls stack vertically. The local Next dev overlay appears in screenshots but is not production UI.
- `mobile-consultations.png`: SLA metric cards stack cleanly; empty state is stable.

## 7. Current Failures / Risks

Current failures:
- Antigravity IDE could not be controlled through Computer Use. `list_apps` and `get_app_state("Antigravity IDE")` timed out after 120s. A later recovery attempt proved Antigravity IDE and its Weet workspace language server were running, but `get_app_state("Antigravity IDE")` still timed out. This was recorded in `agent-inbox/antigravity-failures.md`.
- The user-authored instruction now says Antigravity IDE Computer Use must work somehow; this remains an environmental/tooling blocker for future frontend delegation.

Known risks:
- UTM, CMS, gallery, inquiries, edit/new forms, and ProductModal still retain old rounded SaaS styling.
- Product readiness score is heuristic and UI-only; it is not yet persisted or connected to dashboard aggregates.
- Consultation SLA threshold is hardcoded at 120 minutes and uses local browser time; acceptable for visual triage, but a real SLA system should be server-backed.
- Build still warns about Next middleware-to-proxy deprecation.
- Production `we-et.com` validation has not yet been run for this slice; it should happen after commit/push/Vercel promote.

## 8. Exact Review Questions

1. VERDICT: PASS or REVISE for this admin console slice before commit/deploy?
2. Are there any concrete `MUST_FIX` regressions in the new console primitives, product/project/consultation/insights admin changes, or E2E coverage?
3. Is the defensive product/project image validation sufficient to avoid admin list crashes from bad stored URLs?
4. Is the consultation SLA UI safe enough as an operational visual triage feature, or does the hardcoded client-side 120-minute age create a required fix?
5. Are there any missing tests that must be added before deployment?

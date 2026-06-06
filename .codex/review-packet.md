# Weet Audit Review Packet - Stage 4 Final Local Validation

Marker: WEET_AUDIT_REVIEW_20260607_STAGE_04_FINAL_LOCAL_VALIDATION
Generated: 2026-06-06T18:16:34.122Z

## Active Task Brief

# Current Task: Weet 홈페이지·관리자 전면 감사 및 구매 확신 강화 개선

## Required workflow

Read `AGENTS.md`, `codex-loop.md`, `.codex/current-task.md`, and `.codex/state.md` before implementation.

Use git as the source of truth:

- inspect `git status` before implementation
- inspect `git diff` after implementation
- write `.codex/review-packet.md` before every GPT-5.5 Pro review
- save each GPT-5.5 Pro response to `.codex/pro-review.md`
- update `.codex/state.md` after applying feedback

For frontend implementation, delegate the design/UI implementation step to Antigravity IDE/Gemini through Computer Use. Codex remains responsible for repository inspection, validation, local browser/Playwright evidence, review packets, GPT-5.5 Pro review, and applying concrete feedback.

For GPT-5.5 Pro review, use Chrome/ChatGPT Deep Research. Confirm from read-only evidence where possible that:

- the surface is Deep Research (`/deep-research` or `심층 리서치`)
- the model menu is `최신 • 5.5`
- `Pro • 확장` is checked
- the composer is safe to send

The direct user request for this task requires at least 10 GPT-5.5 Pro review uses, split across stages. This overrides the older generic `codex-loop.md` two-cycle cap for this active task.

## Active task brief

Perform a thorough end-to-end audit and major improvement pass for the Weet website and admin.

### Audit scope

- Inspect the admin page across UI/UX, functional reliability, intended behavior, odd rendering, mobile responsiveness, and perceived/actual performance.
- Diagnose why the admin feels slow, using code review, browser/runtime evidence, and performance-oriented reasoning.
- Explore the public website directly through 5 distinct customer personas.
- For each persona, identify what makes the person want to buy a Weet movable home from this website and what makes them hesitate or avoid purchase.
- Derive strengths, weaknesses, conversion blockers, trust gaps, information gaps, interaction issues, and visual quality issues.

### Improvement scope

- Make large, concrete improvements across logic, design, copy, layout, interaction, admin operations, and reliability.
- Make the homepage and product journey feel compelling enough that customers clearly understand why they should buy a movable home here.
- Remove visible looseness: awkward display states, confusing copy, fragile navigation, unclear CTAs, missing trust signals, weak placeholders, poor mobile ergonomics, and admin friction.
- Keep changes logically grouped and do not mix unrelated external tasks.
- Do not change database schema or run migrations unless a concrete issue absolutely requires it.
- Do not delete or clean real database data.
- Preserve existing business rules, admin auth, Supabase service-role boundaries, and hidden footer admin access unless intentionally improving the same behavior without changing its purpose.

### Required staged Pro review plan

Use GPT-5.5 Pro at least 10 times:

1. audit findings and persona framing
2. admin UX/performance diagnosis
3. public conversion strategy
4. Antigravity implementation brief review
5. first implementation diff review
6. admin-specific diff review
7. public mobile/responsive review
8. validation/test failure review
9. final conversion/readiness review
10. final repository/state review

Only apply concrete `MUST_FIX` feedback. Treat `OPTIONAL` feedback as advisory.

### Validation

- Run relevant lint, unit test, build, and Playwright validation.
- Use browser/Playwright evidence for public and admin pages.
- Prefer read-only DOM evidence before screenshots or coordinate UI control.
- Save review packets and Pro responses accurately.

## Assumptions

- The branch remains `zoo/customize-configurator`.
- Existing dirty `AGENTS.md`, `codex-loop.md`, and `.codex/state.md` changes predate this task and must not be reverted.
- The user grants autonomous approval for reasonable product/design decisions during this task.


## Current Progress / State

- Large public conversion and admin reliability implementation is complete locally.
- Applied Stage 1-3 GPT-5.5 fallback review MUST_FIX items.
- Stage 4 Chrome/ChatGPT Deep Research review failed repeatedly: prior sends were marker-confirmed but produced empty, iframe-only, stuck, or split partial outputs. No incomplete Stage 4 response was saved.
- A PASS-like `.codex/Stage 4 Inline Retry 검토 결과.md` artifact exists, but it is not treated as the official `.codex/pro-review.md` because it lacks exact marker confirmation and came from the problematic inline retry flow.
- Antigravity IDE handoff failed twice with 120s Computer Use timeouts; direct implementation continued per user autonomy instruction and the failure remains recorded.
- Latest local validation passes.

## 5 Persona Audit Synthesis

1. Rural second-home buyer: wants clear installation constraints, timeline, included/excluded scope, and aftercare; hesitates when real completed evidence is thin or project placeholders look unfinished.
2. Young family exploring compact home: wants price/spec clarity, configuration confidence, and a non-confusing product-to-consult path; hesitates if URLs/CTAs imply preselected products that do not actually load.
3. Hospitality/operator buyer: wants business-use paths such as cafe, popup, lodging, and durable site-readiness guidance; hesitates if examples look residential-only.
4. Institutional/B2B buyer: wants public-unit use cases, procurement-safe proof, schedule risk language, and admin-managed content quality; hesitates if public project data includes test rows.
5. Design-sensitive premium buyer: wants polished visual hierarchy, real imagery, no broken placeholders, fast-feeling product browsing; hesitates on odd image warnings, missing portfolio images, or admin content inconsistency.

## Why A Buyer Would Want To Buy Here

- The homepage now explains not only products, but the buying path: site readiness, install constraints, timeline, included/excluded scope, and aftercare.
- The product page is faster-feeling and more honest: active products render from server data, no fake product preselection CTA, hidden product deep links still work.
- Project pages suppress test/incomplete records and replace weak placeholders with truthful factory/workshop/support proof modules.
- The configurator no longer pollutes a clean first visit URL and remains shareable after actual buyer changes.

## Why A Buyer Would Still Hesitate

- Real completed project data in Supabase remains thin/incomplete; code now hides it rather than inventing proof.
- The best conversion result still depends on admin users uploading complete real project images/client/location/date/description.
- Chrome/ChatGPT Deep Research review remained unavailable; external Pro PASS was not obtained.

## Project Snapshot

- Next.js 16 app router, Supabase-backed product/project/admin CMS site.
- Dynamic routes include /products, /projects, /customize, /admin/*, /support.
- Validation stack: ESLint, Vitest, Playwright.

## Git Status

```
 M .codex/current-task.md
 M .codex/pro-review.md
 M .codex/review-packet.md
 M .codex/state.md
 M AGENTS.md
 M app/actions/analytics-actions.ts
 M app/admin/insights/page.tsx
 M app/admin/projects/page.tsx
 M app/company/page.tsx
 M app/modular/page.tsx
 M app/page.tsx
 M app/products/page.tsx
 M app/projects/[id]/page.tsx
 M app/projects/page.tsx
 M codex-loop.md
 M components/admin/cms/MainCmsClient.tsx
 M components/admin/gallery/GalleryForm.tsx
 M components/admin/gallery/GalleryList.tsx
 M components/admin/insights/AnalyticsDashboard.tsx
 M components/admin/products/ProductGrid.tsx
 M components/admin/projects/ProjectForm.tsx
 M components/customize/CustomizeConfigurator.tsx
 M components/sections/HeroCarouselClientComponent.tsx
 M components/ui/ImageSlider.tsx
 M e2e/customize-configurator.spec.ts
 M e2e/public-pages.spec.ts
 M lib/analytics.ts
?? ".codex/Stage 4 Inline Retry \352\262\200\355\206\240 \352\262\260\352\263\274.md"
?? .codex/chatgpt-fallback-stage1-progress.png
?? .codex/chatgpt-stage1-failure.png
?? .codex/chatgpt-stage1-progress.png
?? app/admin/projects/AdminProjectsClient.tsx
?? app/products/ProductsPageClient.tsx
?? lib/projects/

```

## Changed Files

```
.codex/current-task.md
.codex/pro-review.md
.codex/review-packet.md
.codex/state.md
AGENTS.md
app/actions/analytics-actions.ts
app/admin/insights/page.tsx
app/admin/projects/page.tsx
app/company/page.tsx
app/modular/page.tsx
app/page.tsx
app/products/page.tsx
app/projects/[id]/page.tsx
app/projects/page.tsx
codex-loop.md
components/admin/cms/MainCmsClient.tsx
components/admin/gallery/GalleryForm.tsx
components/admin/gallery/GalleryList.tsx
components/admin/insights/AnalyticsDashboard.tsx
components/admin/products/ProductGrid.tsx
components/admin/projects/ProjectForm.tsx
components/customize/CustomizeConfigurator.tsx
components/sections/HeroCarouselClientComponent.tsx
components/ui/ImageSlider.tsx
e2e/customize-configurator.spec.ts
e2e/public-pages.spec.ts
lib/analytics.ts
".codex/Stage 4 Inline Retry \352\262\200\355\206\240 \352\262\260\352\263\274.md"
.codex/chatgpt-fallback-stage1-progress.png
.codex/chatgpt-stage1-failure.png
.codex/chatgpt-stage1-progress.png
app/admin/projects/AdminProjectsClient.tsx
app/products/ProductsPageClient.tsx
lib/projects/__tests__/publicProjects.test.ts
lib/projects/publicProjects.ts

```

## Git Diff Summary

```
 .codex/current-task.md                             |  109 +-
 .codex/pro-review.md                               |   66 +-
 .codex/review-packet.md                            | 3553 +-------------------
 .codex/state.md                                    |  136 +-
 AGENTS.md                                          |    2 +
 app/actions/analytics-actions.ts                   |   52 +
 app/admin/insights/page.tsx                        |   17 +-
 app/admin/projects/page.tsx                        |  193 +-
 app/company/page.tsx                               |    5 +
 app/modular/page.tsx                               |    2 +
 app/page.tsx                                       |  124 +-
 app/products/page.tsx                              |  806 +----
 app/projects/[id]/page.tsx                         |   51 +-
 app/projects/page.tsx                              |  124 +-
 codex-loop.md                                      |   10 +-
 components/admin/cms/MainCmsClient.tsx             |   25 +-
 components/admin/gallery/GalleryForm.tsx           |    1 +
 components/admin/gallery/GalleryList.tsx           |    3 +-
 components/admin/insights/AnalyticsDashboard.tsx   |  112 +-
 components/admin/products/ProductGrid.tsx          |   30 +-
 components/admin/projects/ProjectForm.tsx          |    1 +
 components/customize/CustomizeConfigurator.tsx     |    9 +-
 .../sections/HeroCarouselClientComponent.tsx       |    5 +-
 components/ui/ImageSlider.tsx                      |   10 +-
 e2e/customize-configurator.spec.ts                 |   11 +
 e2e/public-pages.spec.ts                           |  268 +-
 lib/analytics.ts                                   |   39 +-
 27 files changed, 987 insertions(+), 4777 deletions(-)

```

## Selected Git Diff

```diff
diff --git a/app/actions/analytics-actions.ts b/app/actions/analytics-actions.ts
index 9235a94..f817af3 100644
--- a/app/actions/analytics-actions.ts
+++ b/app/actions/analytics-actions.ts
@@ -12,6 +12,13 @@ import { requireAdmin } from '@/lib/admin-auth';
 
 // Cache configuration
 const CACHE_TIME = 3600; // 1 hour
+const DEFAULT_DASHBOARD_TIMEOUT_MS = 7000;
+const MIN_DASHBOARD_TIMEOUT_MS = 1000;
+const MAX_DASHBOARD_TIMEOUT_MS = 30000;
+const configuredDashboardTimeout = Number(process.env.GA_DASHBOARD_TIMEOUT_MS);
+const DASHBOARD_TIMEOUT_MS = Number.isFinite(configuredDashboardTimeout)
+    ? Math.min(Math.max(configuredDashboardTimeout, MIN_DASHBOARD_TIMEOUT_MS), MAX_DASHBOARD_TIMEOUT_MS)
+    : DEFAULT_DASHBOARD_TIMEOUT_MS;
 
 const cachedTrafficStats = unstable_cache(
     async (startDate?: string, endDate?: string) => {
@@ -77,3 +84,48 @@ export async function fetchTopPages(startDate?: string, endDate?: string) {
     await requireAdmin();
     return cachedTopPages(startDate, endDate);
 }
+
+function settledValue<T>(result: PromiseSettledResult<T>) {
+    if (result.status === 'fulfilled') return result.value;
+
+    return {
+        error: result.reason instanceof Error ? result.reason.message : 'Analytics data failed to load',
+    };
+}
+
+export async function fetchAnalyticsDashboard(startDate?: string, endDate?: string) {
+    await requireAdmin();
+
+    const loadDashboard = async () => {
+        const [trafficStats, demographics, acquisition, topPages, cityStats] = await Promise.allSettled([
+            cachedTrafficStats(startDate, endDate),
+            cachedUserDemographics(startDate, endDate),
+            cachedAcquisitionSources(startDate, endDate),
+            cachedTopPages(startDate, endDate),
+            cachedCityDemographics(startDate, endDate),
+        ]);
+
+        return {
+            trafficStats: settledValue(trafficStats),
+            demographics: settledValue(demographics),
+            acquisition: settledValue(acquisition),
+            topPages: settledValue(topPages),
+            cityStats: settledValue(cityStats),
+        };
+    };
+
+    const timeoutFallback = new Promise<Awaited<ReturnType<typeof loadDashboard>>>((resolve) => {
+        setTimeout(() => {
+            const error = { error: `Analytics dashboard timed out after ${DASHBOARD_TIMEOUT_MS}ms` };
+            resolve({
+                trafficStats: error,
+                demographics: error,
+                acquisition: error,
+                topPages: error,
+                cityStats: error,
+            });
+        }, DASHBOARD_TIMEOUT_MS);
+    });
+
+    return Promise.race([loadDashboard(), timeoutFallback]);
+}
diff --git a/app/admin/projects/page.tsx b/app/admin/projects/page.tsx
index d4e1dc1..c23151f 100644
--- a/app/admin/projects/page.tsx
+++ b/app/admin/projects/page.tsx
@@ -1,191 +1,10 @@
-'use client';
+import { getProjects } from '@/app/actions/project-actions';
+import AdminProjectsClient from './AdminProjectsClient';
 
-import { useEffect, useState, useCallback } from 'react';
-import Link from 'next/link';
-import Image from 'next/image';
-import { Plus, Trash2, Loader2, Pencil, MapPin, Calendar, User } from 'lucide-react';
-import { toast } from 'sonner';
-import { Project } from '@/types/supabase';
-import { getProjects, deleteProject } from '@/app/actions/project-actions';
+export const dynamic = 'force-dynamic';
 
-export default function AdminProjectsPage() {
-    const [projects, setProjects] = useState<Project[]>([]);
-    const [loading, setLoading] = useState(true);
-    const [deleting, setDeleting] = useState<string | null>(null);
-    const [filterStatus, setFilterStatus] = useState('All');
+export default async function AdminProjectsPage() {
+  const projects = await getProjects('All');
 
-    const fetchProjects = useCallback(async (status: string) => {
-        try {
-            const data = await getProjects(status);
-            setProjects(data);
-        } catch (error) {
-            console.error('Error fetching projects:', error);
-            toast.error('프로젝트 목록을 불러오지 못했습니다.');
-        } finally {
-            setLoading(false);
-        }
-    }, []);
-
-    useEffect(() => {
-        setLoading(true);
-        fetchProjects(filterStatus);
-    }, [filterStatus, fetchProjects]);
-
-    const handleDelete = async (id: string) => {
-        if (!confirm('정말 삭제하시겠습니까?')) return;
-
-        setDeleting(id);
-        try {
-            await deleteProject(id);
-            setProjects(prev => prev.filter(item => item.id !== id));
-            toast.success('삭제되었습니다.');
-        } catch (error) {
-            console.error('Error deleting project:', error);
-            toast.error('삭제 중 오류가 발생했습니다.');
-        } finally {
-            setDeleting(null);
-        }
-    };
-
-    const statusLabel = (status: string | null) => {
-        switch (status) {
-            case 'completed': return '완료';
-            case 'in_progress': return '진행중';
-            case 'planned': return '계획중';
-            default: return status || '미지정';
-        }
-    };
-
-    const statusColor = (status: string | null) => {
-        switch (status) {
-            case 'completed': return 'text-green-600 bg-green-50';
-            case 'in_progress': return 'text-blue-600 bg-blue-50';
-            case 'planned': return 'text-orange-600 bg-orange-50';
-            default: return 'text-gray-600 bg-gray-50';
-        }
-    };
-
-    if (loading) {
-        return (
-            <div className="flex items-center justify-center h-64">
-                <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
-            </div>
-        );
-    }
-
-    return (
-        <div className="space-y-6">
-            <div className="flex items-center justify-between">
-                <div>
-                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">
-                        프로젝트 관리 <span className="text-sm font-normal text-gray-500 ml-2">Total {projects.length}</span>
-                    </h1>
-                    <p className="text-gray-500 text-sm mt-1">시공 프로젝트를 관리합니다.</p>
-                </div>
-                <div className="flex items-center gap-3">
-                    <select
-                        value={filterStatus}
-                        onChange={(e) => setFilterStatus(e.target.value)}
-                        className="px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-black bg-white"
-                    >
-                        <option value="All">전체 상태</option>
-                        <option value="completed">완료</option>
-                        <option value="in_progress">진행중</option>
-                        <option value="planned">계획중</option>
-                    </select>
-                    <Link
-                        href="/admin/projects/new"
-                        className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
-                    >
-                        <Plus className="w-4 h-4" />
-                        새 프로젝트
-                    </Link>
-                </div>
-            </div>
-
-            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
-                {projects.map((project) => (
-                    <div key={project.id} className="group relative bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
-                        <div className="aspect-[4/3] relative bg-gray-100">
-                            {project.images && project.images.length > 0 ? (
-                                <Image
-                                    src={project.images[0]}
-                                    alt={project.title}
-                                    fill
-                                    className="object-cover"
-                                />
-                            ) : (
-                                <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
-                                    No Image
-                                </div>
-                            )}
-                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
-                                <Link
-                                    href={`/admin/projects/${project.id}`}
-                                    className="p-2 bg-white rounded-full text-black hover:bg-gray-100 transition-colors shadow-lg"
-                                >
-                                    <Pencil className="w-5 h-5" />
-                                </Link>
-                                <button
-                                    type="button"
-                                    onClick={() => handleDelete(project.id)}
-                                    disabled={deleting === project.id}
-                                    className="p-2 bg-white rounded-full text-red-600 hover:bg-red-50 transition-colors shadow-lg"
-                                >
-                                    {deleting === project.id ? (
-                                        <Loader2 className="w-5 h-5 animate-spin" />
-                                    ) : (
-                                        <Trash2 className="w-5 h-5" />
-                                    )}
-                                </button>
-                            </div>
-                            <div className="absolute top-3 left-3">
-                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColor(project.status)}`}>
-                                    {statusLabel(project.status)}
-                                </span>
-                            </div>
-                        </div>
-                        <div className="p-4">
-                            <h3 className="font-semibold text-gray-900 truncate">{project.title}</h3>
-                            <div className="mt-2 space-y-1">
-                                {project.client && (
-                                    <p className="text-sm text-gray-500 flex items-center gap-1.5">
-                                        <User className="w-3.5 h-3.5" />
-                                        {project.client}
-                                    </p>
-                                )}
-                                {project.location && (
-                                    <p className="text-sm text-gray-500 flex items-center gap-1.5">
-                                        <MapPin className="w-3.5 h-3.5" />
-                                        {project.location}
-                                    </p>
-                                )}
-                                {project.completed_at && (
-                                    <p className="text-sm text-gray-500 flex items-center gap-1.5">
-                                        <Calendar className="w-3.5 h-3.5" />
-                                        {new Date(project.completed_at).toLocaleDateString()}
-                                    </p>
-                                )}
-                            </div>
-                            {project.tags && project.tags.length > 0 && (
-                                <div className="mt-3 flex flex-wrap gap-1">
-                                    {project.tags.map((tag) => (
-                                        <span key={tag} className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded">
-                                            {tag}
-                                        </span>
-                                    ))}
-                                </div>
-                            )}
-                        </div>
-                    </div>
-                ))}
-            </div>
-
-            {projects.length === 0 && (
-                <div className="text-center py-12 bg-white rounded-xl border border-gray-200 border-dashed">
-                    <p className="text-gray-500">등록된 프로젝트가 없습니다.</p>
-                </div>
-            )}
-        </div>
-    );
+  return <AdminProjectsClient initialProjects={projects} />;
 }
diff --git a/app/products/page.tsx b/app/products/page.tsx
old mode 100755
new mode 100644
index c6ebae2..bd8a294
--- a/app/products/page.tsx
+++ b/app/products/page.tsx
@@ -1,790 +1,24 @@
-"use client";
-
-import { useState, useRef, useEffect } from "react";
-import Image from "next/image";
-import { getProducts } from "@/lib/products";
-import { Product } from "@/types/supabase";
-import { ChevronDown, Home, X } from "lucide-react";
-import { motion, AnimatePresence } from "framer-motion";
-import { useLanguage } from "@/contexts/LanguageContext";
-
-// 제품 타입 정의 (Frontend View Model)
-interface ProductData {
-    id: string;
-    name: string;
-    subCategory: "Private" | "Public";
-    sizeCategory: "S" | "M" | "L" | "XL" | "DESIGN";
-    imageUrl: string;
-    subImages: string[];
-    tagline: string;
-    description: string;
-    details: {
-        price: string;
-        structure: string;
-        roofType: string;
-        exterior: string;
-        interior: string;
-        size: string;
-    };
-    floorPlan: {
-        src: string;
-        crop: {
-            width: string;
-            height: string;
-            top: string;
-            left: string;
-        };
-    };
-}
-
-// Helper to parse crop data from URL
-const parseFloorPlan = (url: string | null) => {
-    if (!url) return { src: "", crop: { width: "100%", height: "100%", top: "0%", left: "0%" } };
-
-    const [baseUrl, query] = url.split('?');
-    const params = new URLSearchParams(query);
-
-    return {
-        src: baseUrl,
-        crop: {
-            width: params.get('crop_w') || "100%",
-            height: params.get('crop_h') || "100%",
-            top: params.get('crop_t') || "0%",
-            left: params.get('crop_l') || "0%",
-        }
-    };
+import type { Metadata } from 'next';
+import ProductsPageClient from './ProductsPageClient';
+import { getProducts } from '@/lib/products';
+
+export const dynamic = 'force-dynamic';
+
+export const metadata: Metadata = {
+  title: '제품 소개',
+  description: '위트 이동식주택의 크기별 제품 라인업과 사양을 확인하고 상담 구성을 시작하세요.',
+  alternates: {
+    canonical: '/products',
+  },
+  openGraph: {
+    url: '/products',
+    title: '위트 제품 소개',
+    description: '작고 단단한 내 집, 필요한 크기와 목적에 맞는 위트 제품을 찾아보세요.',
+  },
 };
 
-// Helper to map Supabase Product to ProductData
-const mapProductToData = (p: Product): ProductData => {
-    const floorPlan = parseFloorPlan(p.floor_plan_url);
-
-    return {
-        id: p.id,
-        name: p.name,
-        subCategory: p.sub_category as "Private" | "Public",
-        sizeCategory: p.size_category as "S" | "M" | "L" | "XL" | "DESIGN",
-        imageUrl: p.image_url,
-        tagline: p.tagline || "",
-        description: p.description,
-        details: {
-            price: p.price || "-",
-            structure: p.structure || "-",
-            roofType: p.roof_type || "-",
-            exterior: p.exterior_finish || "-",
-            interior: p.interior_finish || "-",
-            size: p.size || "-",
-        },
-        floorPlan: floorPlan,
-        subImages: p.sub_images || [],
-    };
-};
-
-export default function ProductsPage() {
-    const { language } = useLanguage();
-    const isKO = language === 'KO';
-    const TEXT = {
-        loading: isKO ? '불러오는 중...' : 'Loading...',
-        description: isKO ? '설명' : 'Description',
-        specs: isKO ? '상세 정보' : 'Specifications',
-        price: isKO ? '가격' : 'Price',
-        size: isKO ? '크기' : 'Size',
-        structure: isKO ? '구조' : 'Structure',
-        roof: isKO ? '지붕재' : 'Roof',
-        exterior: isKO ? '외부마감' : 'Exterior',
-        interior: isKO ? '내부마감' : 'Interior',
-        floorPlan: isKO ? '도면' : 'Floor Plan',
-        floorPlanWaiting: isKO ? '도면 요청 시 제공' : 'Floor plan available on request',
-    };
-    const [products, setProducts] = useState<ProductData[]>([]);
-    const [loading, setLoading] = useState(true);
-    const [expandedCategories, setExpandedCategories] = useState<string[]>(["S", "M", "L", "XL", "DESIGN"]);
-    const [expandedMobileProducts, setExpandedMobileProducts] = useState<string[]>([]);
-
-    const toggleMobileProduct = (id: string) => {
-        setExpandedMobileProducts(prev => prev.includes(id) ? prev.filter(pid => pid !== id) : [...prev, id]);
-    };
-
-    const [activeProduct, setActiveProduct] = useState<string>("");
-    const productRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
-    const sidebarRef = useRef<HTMLDivElement>(null);
-    const sidebarItemRefs = useRef<{ [key: string]: HTMLLIElement | null }>({});
-    const [isHeaderVisible, setIsHeaderVisible] = useState(true);
-
-    // Sidebar Auto-Scroll Logic
-    useEffect(() => {
-        if (activeProduct && sidebarItemRefs.current[activeProduct] && sidebarRef.current) {
-            const item = sidebarItemRefs.current[activeProduct];
-            const container = sidebarRef.current;
-
-            if (item && container) {
-                // Calculate relative position to center the item
-                const itemRect = item.getBoundingClientRect();
-                const containerRect = container.getBoundingClientRect();
-                const currentScroll = container.scrollTop;
-
-                // Position within the viewport relative to container
-                const relativeTop = itemRect.top - containerRect.top;
-
-                // Desired position: Center of container
-                const targetRelativeTop = (containerRect.height / 2) - (itemRect.height / 2);
-
-                const scrollAmount = relativeTop - targetRelativeTop;
-
-                container.scrollTo({
-                    top: currentScroll + scrollAmount,
-                    behavior: 'smooth'
-                });
-            }
-        }
-    }, [activeProduct]);
-    const lastScrollY = useRef(0);
-    const [direction, setDirection] = useState(0);
-    const prevActiveProduct = useRef<string>("");
-
-    // Gallery Modal State
-    const [galleryOpen, setGalleryOpen] = useState(false);
-    const [currentGalleryImages, setCurrentGalleryImages] = useState<string[]>([]);
-    const [currentImageIndex, setCurrentImageIndex] = useState(0);
-
-    const openGallery = (product: ProductData) => {
-        const images = [product.imageUrl, ...(product.subImages || [])].filter(Boolean);
-        if (images.length === 0) return;
-        setCurrentGalleryImages(images);
-        setCurrentImageIndex(0);
-        setGalleryOpen(true);
-    };
-
-    const nextImage = (e?: React.MouseEvent) => {
-        e?.stopPropagation();
-        setCurrentImageIndex((prev) => (prev + 1) % currentGalleryImages.length);
-    };
-
-    const prevImage = (e?: React.MouseEvent) => {
-        e?.stopPropagation();
-        setCurrentImageIndex((prev) => (prev - 1 + currentGalleryImages.length) % currentGalleryImages.length);
-    };
-
-    useEffect(() => {
-        if (prevActiveProduct.current && activeProduct !== prevActiveProduct.current) {
-            const prevIndex = products.findIndex(p => p.id === prevActiveProduct.current);
-            const currIndex = products.findIndex(p => p.id === activeProduct);
-            if (prevIndex !== -1 && currIndex !== -1) {
-                setDirection(currIndex > prevIndex ? 1 : -1);
-            }
-        }
-        prevActiveProduct.current = activeProduct;
-    }, [activeProduct, products]);
-
-    useEffect(() => {
-        const fetchProducts = async () => {
-            try {
-                const data = await getProducts();
-                const mappedData = data.map(mapProductToData);
-
-                // Sort by Category Order
-                const categoryOrder = ["S", "M", "L", "XL", "DESIGN"];
-                mappedData.sort((a, b) => {
-                    const idxA = categoryOrder.indexOf(a.sizeCategory);
-                    const idxB = categoryOrder.indexOf(b.sizeCategory);
-
-                    if (idxA !== idxB) {
-                        return idxA - idxB;
-                    }
-
-                    // If both are 'S', sort by SubCategory (Private first)
-                    if (a.sizeCategory === 'S') {
-                        if (a.subCategory === 'Private' && b.subCategory !== 'Private') return -1;
-                        if (a.subCategory !== 'Private' && b.subCategory === 'Private') return 1;
-                    }
-
-                    return 0; // Keep original order (display_order from DB)
-                });
-
-                setProducts(mappedData);
-                if (mappedData.length > 0) {
-                    setActiveProduct(mappedData[0].id);
-                }
-            } catch (error) {
-                console.error("Failed to fetch products:", error);
-            } finally {
-                setLoading(false);
-            }
-        };
-
-        fetchProducts();
-    }, []);
-
-    // Scroll to Hash on Load
-    useEffect(() => {
-        if (!loading && products.length > 0 && window.location.hash) {
-            const hash = window.location.hash.substring(1); // remove #
-            // use timeout to ensure rendering
-            setTimeout(() => {
-                const element = document.getElementById(hash);
-                if (element) {
-                    const headerOffset = 100;
-                    const elementPosition = element.getBoundingClientRect().top;
-                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
-
-                    window.scrollTo({
-                        top: offsetPosition,
-                        behavior: "smooth"
-                    });
-
-                    // Also expand the category if needed
-                    const productCategory = products.find(p => p.sizeCategory.toLowerCase() === hash)?.sizeCategory;
-                    if (productCategory) {
-                        setExpandedCategories(prev => {
-                            if (!prev.includes(productCategory)) return [...prev, productCategory];
-                            return prev;
-                        });
-                    }
-                }
-            }, 100);
-        }
-    }, [loading, products]);
-
-    // 사이드바 구조 생성 (Dynamic)
-    interface SidebarCategory {
-        label: string;
-        subtitle: string;
-        items?: string[];
-        Private?: string[];
-        Public?: string[];
-    }
-
-    const sidebarStructure: Record<string, SidebarCategory> = {
-        S: {
-            label: "S",
-            subtitle: "",
-            Private: products.filter(p => p.sizeCategory === "S" && p.subCategory === "Private").map(p => p.id),
-            Public: products.filter(p => p.sizeCategory === "S" && p.subCategory === "Public").map(p => p.id),
-        },
-        M: {
-            label: "M",
-            subtitle: "",
-            items: products.filter(p => p.sizeCategory === "M").map(p => p.id),
-        },
-        L: {
-            label: "L",
-            subtitle: "",
-            items: products.filter(p => p.sizeCategory === "L").map(p => p.id),
-        },
-        XL: {
-            label: "XL",
-            subtitle: "",
-            items: products.filter(p => p.sizeCategory === "XL").map(p => p.id),
-        },
-        DESIGN: {
-            label: "DESIGN",
-            subtitle: "",
-            items: products.filter(p => p.sizeCategory === "DESIGN").map(p => p.id)
-        },
-    };
-
-    const handleCategoryClick = (category: string) => {
-        // 1. Expand immediately
-        if (!expandedCategories.includes(category)) {
-            setExpandedCategories([...expandedCategories, category]);
-        }
-
-        // 2. Scroll to first product in category
-        const catData = sidebarStructure[category];
-        let firstProductId = "";
-
-        if (category === 'S') {
-            firstProductId = catData.Private?.[0] || catData.Public?.[0] || "";
-        } else {
-            firstProductId = catData.items?.[0] || "";
-        }
-
-        if (firstProductId) {
-            scrollToProduct(firstProductId);
-        }
-    };
-
-    // Auto-expand category based on active Product
-    useEffect(() => {
-        if (!activeProduct) return;
-
-        const activeProductData = products.find(p => p.id === activeProduct);
-        if (activeProductData) {
-            const category = activeProductData.sizeCategory;
-            // Also expand S if subcategory private/public? "S" is the key in sidebarStructure
-            setExpandedCategories(prev => prev.includes(category) ? prev : [...prev, category]);
-        }
-    }, [activeProduct, products]);
-
-    const scrollToProduct = (productId: string) => {
-        const element = productRefs.current[productId];
-        if (element) {
-            const headerOffset = 100;
-            const elementPosition = element.getBoundingClientRect().top;
-            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
-
-            window.scrollTo({
-                top: offsetPosition,
-                behavior: "smooth",
-            });
-            setActiveProduct(productId);
-        }
-    };
-
-    useEffect(() => {
-        const handleScroll = () => {
-            const currentScrollY = window.scrollY;
-
-            // Header Visibility Logic
-            if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
-                setIsHeaderVisible(false);
-            } else {
-                setIsHeaderVisible(true);
-            }
-            lastScrollY.current = currentScrollY;
-
-            // Active Product Logic using getBoundingClientRect (Viewport Relative)
-            // Trigger point: 30% down from top of viewport
-            const triggerPoint = window.innerHeight * 0.3;
-
-            let closestProductId = "";
-            let minDistanceToTrigger = Infinity;
-
-            // Check bottom of page first
-            const documentHeight = document.documentElement.scrollHeight;
-            if (window.innerHeight + currentScrollY >= documentHeight - 50) {
-                if (products.length > 0) {
-                    setActiveProduct(products[products.length - 1].id);
-                    return;
-                }
-            }
-
-            for (const product of products) {
-                const element = productRefs.current[product.id];
-                if (element) {
-                    const rect = element.getBoundingClientRect();
-
-                    // Check overlap with trigger point
-                    if (rect.top <= triggerPoint && rect.bottom >= triggerPoint) {
-                        closestProductId = product.id;
-                        break;
-                    }
-
-                    // Fallback: track closest element top to trigger
-                    const distance = Math.abs(rect.top - triggerPoint);
-                    if (distance < minDistanceToTrigger) {
-                        minDistanceToTrigger = distance;
-                        closestProductId = product.id;
-                    }
-                }
-            }
-
-            if (closestProductId && closestProductId !== activeProduct) {
-                setActiveProduct(closestProductId);
-            }
-        };
-
-        window.addEventListener("scroll", handleScroll, { passive: true });
-        return () => window.removeEventListener("scroll", handleScroll);
-    }, [products, activeProduct]);
-
-
-    const getProductName = (id: string) => {
-        const product = products.find((p) => p.id === id);
-        return product?.name || id;
-    };
-
-    if (loading) {
-        return (
-            <div className="min-h-screen flex items-center justify-center bg-gray-50">
-                <div className="text-xl font-bold text-gray-500">{TEXT.loading}</div>
-            </div>
-        );
-    }
-
-    return (
-        <div className="min-h-screen bg-gray-50">
-            <div className="flex flex-col lg:flex-row max-w-[1920px] mx-auto relative">
-                {/* Sidebar */}
-                <aside className="w-[280px] h-screen sticky top-0 hidden lg:flex flex-col pt-[140px] pb-10 pl-[60px] overflow-hidden bg-gray-50 border-r border-gray-100 z-10">
-                    <div ref={sidebarRef} className="flex-1 overflow-y-auto pr-6 custom-scrollbar space-y-12">
-                        {(Object.keys(sidebarStructure) as Array<keyof typeof sidebarStructure>).map((key) => {
-                            const category = sidebarStructure[key];
-                            const isExpanded = expandedCategories.includes(key);
-                            const hasItems = (category.items && category.items.length > 0) ||
-                                (category.Private && category.Private.length > 0) ||
-                                (category.Public && category.Public.length > 0);
-
-                            if (!hasItems) return null;
-
-                            return (
-                                <div key={key} className="group">
-                                    <div
-                                        className="flex items-center justify-between cursor-pointer mb-4 select-none group/header py-2" // Added padding for click area
-                                        onClick={() => handleCategoryClick(key)}
-                                    >
-                                        <div className="transiton-transform duration-300 group-hover/header:translate-x-2"> {/* Increased movement */}
-                                            <h2 className={`text-5xl font-black tracking-tighter transition-colors duration-300 ${isExpanded ? 'text-black' : 'text-gray-200 group-hover:text-gray-400'}`}> {/* Larger font, lighter inactive color */}
-                                                {category.label}
-                                            </h2>
-                                            {category.subtitle && (
-                                                <p className="text-[10px] text-gray-400 mt-1 font-medium tracking-wide uppercase opacity-0 group-hover/header:opacity-100 transition-opacity transformtranslate-y-1 group-hover/header:translate-y-0">
-                                                    {category.subtitle}
-                                                </p>
-                                            )}
-                                        </div>
-                                    </div>
-
-                                    <AnimatePresence>
-                                        {isExpanded && (
-                                            <motion.div
-                                                initial={{ height: 0, opacity: 0 }}
-                                                animate={{ height: "auto", opacity: 1 }}
-                                                exit={{ height: 0, opacity: 0 }}
-                                                transition={{ duration: 0.3, ease: "easeInOut" }}
-                                                className="overflow-hidden"
-                                            >
-                                                <div className="pl-1 space-y-6 pt-2 pb-4">
-                                                    {/* S만 세부 카테고리(Private/Public) 지원 */}
-                                                    {key === 'S' ? (
-                                                        <>
-                                                            {category.Private && category.Private.length > 0 && (
-                                                                <div className="mb-6">
-                                                                    <div className="flex items-center gap-2 mb-3">
-                                                                        <div className="h-[1px] w-3 bg-gray-300"></div>
-                                                                        <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Private</h3>
-                                                                    </div>
-                                                                    <ul className="space-y-3 pl-5 border-l border-gray-100">
-                                                                        {category.Private.map((id: string) => (
-                                                                            <li
-                                                                                key={id}
-                                                                                ref={el => { sidebarItemRefs.current[id] = el; }} // Attach Ref
-                                                                                className={`text-[13px] cursor-pointer transition-all duration-200 relative ${activeProduct === id ? 'text-black font-bold translate-x-1' : 'text-gray-400 hover:text-gray-600 hover:translate-x-1'}`}
-                                                                                onClick={() => scrollToProduct(id)}
-                                                                            >
-                                                                                {activeProduct === id && (
-                                                                                    <span className="absolute -left-[21px] top-1.5 w-1.5 h-1.5 bg-[#FEBD16] rounded-full" />
-                                                                                )}
-                                                                                {getProductName(id)}
-                                                                            </li>
-                                                                        ))}
-                                                                    </ul>
-                                                                </div>
-                                                            )}
-                                                            {category.Public && category.Public.length > 0 && (
-                                                                <div>
-                                                                    <div className="flex items-center gap-2 mb-3">
-                                                                        <div className="h-[1px] w-3 bg-gray-300"></div>
-                                                                        <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Public</h3>
-                                                                    </div>
-                                                                    <ul className="space-y-3 pl-5 border-l border-gray-100">
-                                                                        {category.Public.map((id: string) => (
-                                                                            <li
-                                                                                key={id}
-                                                                                ref={el => { sidebarItemRefs.current[id] = el; }} // Attach Ref
-                                                                                className={`text-[13px] cursor-pointer transition-all duration-200 relative ${activeProduct === id ? 'text-black font-bold translate-x-1' : 'text-gray-400 hover:text-gray-600 hover:translate-x-1'}`}
-                                                                                onClick={() => scrollToProduct(id)}
-                                                                            >
-                                                                                {activeProduct === id && (
-                                                                                    <span className="absolute -left-[21px] top-1.5 w-1.5 h-1.5 bg-[#FEBD16] rounded-full" />
-                                                                                )}
-                                                                                {getProductName(id)}
-                                                                            </li>
-                                                                        ))}
-                                                                    </ul>
-                                                                </div>
-                                                            )}
-                                                        </>
-                                                    ) : (
-                                                        <ul className="space-y-3 pl-5 border-l border-gray-100">
-                                                            {category.items?.map((id: string) => (
-                                                                <li
-                                                                    key={id}
-                                                                    ref={el => { sidebarItemRefs.current[id] = el; }} // Attach Ref
-                                                                    className={`text-[13px] cursor-pointer transition-all duration-200 relative ${activeProduct === id ? 'text-black font-bold translate-x-1' : 'text-gray-400 hover:text-gray-600 hover:translate-x-1'}`}
-                                                                    onClick={() => scrollToProduct(id)}
-                                                                >
-                                                                    {activeProduct === id && (
-                                                                        <span className="absolute -left-[21px] top-1.5 w-1.5 h-1.5 bg-[#FEBD16] rounded-full" />
-                                                                    )}
-                                                                    {getProductName(id)}
-                                                                </li>
-                                                            ))}
-                                                        </ul>
-                                                    )}
-                                                </div>
-                                            </motion.div>
-                                        )}
-                                    </AnimatePresence>
-                                </div>
-                            );
-                        })}
-                    </div>
-                </aside>
-
-                {/* Mobile Top Navigation */}
-                <div className={`lg:hidden sticky z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm transition-[top] duration-300 ${isHeaderVisible ? 'top-[70px] md:top-[80px]' : 'top-0'}`}>
-                    <div className="flex overflow-x-auto px-4 py-3 gap-6 no-scrollbar">
-                        {(Object.keys(sidebarStructure) as Array<keyof typeof sidebarStructure>).map((key) => {
-                            const category = sidebarStructure[key];
-                            let isActiveCategory = false;
-                            if (key === 'S') {
-                                isActiveCategory = !!(category?.Private?.includes(activeProduct) || category?.Public?.includes(activeProduct));
-                            } else {
-                                isActiveCategory = !!category?.items?.includes(activeProduct);
-                            }
-
-                            const firstProductId = key === 'S'
-                                ? (category.Private?.[0] || category.Public?.[0])
-                                : category.items?.[0];
-
-                            if (!firstProductId) return null;
-
-                            return (
-                                <button
-                                    key={key}
-                                    onClick={() => scrollToProduct(firstProductId)}
-                                    className={`whitespace-nowrap text-sm font-bold transition-colors min-h-[44px] flex items-center px-1 duration-200 hover:text-primary ${isActiveCategory ? 'text-primary' : 'text-gray-500'
-                                        }`}
-                                >
-                                    {category.label}
-                                </button>
-                            );
-                        })}
-                    </div>
-                </div>
-
-                {/* Main Content */}
-                <main className="flex-1 min-h-screen pt-[120px] md:pt-[160px] lg:pt-[140px] px-4 lg:px-20 pb-40 bg-white lg:bg-transparent">
-                    <div className="max-w-5xl mx-auto mb-10 lg:mb-32 text-center lg:text-left mt-4 lg:mt-0">
-                        <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-4">{isKO ? '제품 소개' : 'Products'}</h1>
-                        <p className="text-gray-600 text-sm md:text-lg">
-                            {isKO ? '작고 단단한 내 집, 필요한 크기와 목적에 맞는 구성을 찾아보세요.' : 'Find the right size and layout for your needs.'}
-                        </p>
-                    </div>
-
-                    <div className="max-w-5xl mx-auto space-y-12 lg:space-y-[20vh]"> {/* Increased spacing for better scroll detection */}
-                        {products.map((product, index) => {
-                            // Check if this is the first product of its category to render the anchor
-                            const isFirstOfCategory 
...<truncated 66598 chars>
```

## Relevant File Excerpts

### Public project readiness filter
```ts
import type { Project } from '@/types/supabase';

const blockedTitlePattern = /(테스트|test|샘플|sample|임시|dummy|placeholder)/i;
const blockedFieldPattern = /(테스트|test|샘플|sample|임시|dummy|placeholder|미정|unknown|n\/a)/i;

function hasMeaningfulText(value: string | null, minLength = 2) {
  const trimmed = value?.trim() ?? '';

  return trimmed.length >= minLength && !blockedFieldPattern.test(trimmed);
}

export function hasValidProjectImageUrl(value: string | undefined) {
  if (!value) return false;

  return /^https?:\/\/.+/i.test(value) || value.startsWith('/images/');
}

function hasSaneCompletedDate(value: string | null) {
  if (!value) return false;

  const time = Date.parse(value);
  if (Number.isNaN(time)) return false;

  const year = new Date(time).getFullYear();

  return year >= 2020 && time <= Date.now();
}

export function getProjectHeroImage(project: Project) {
  const heroImage = project.images?.[0]?.trim();

  return hasValidProjectImageUrl(heroImage) ? heroImage : null;
}

export function getProjectPublicIssues(project: Project) {
  const issues: string[] = [];
  const heroImage = project.images?.[0]?.trim();

  if (!project.title || blockedTitlePattern.test(project.title)) issues.push('test-title');
  if (!heroImage) issues.push('missing-image');
  if (heroImage && !hasValidProjectImageUrl(heroImage)) issues.push('invalid-image-url');
  if (!hasMeaningfulText(project.client)) issues.push('missing-client');
  if (!hasMeaningfulText(project.location)) issues.push('missing-location');
  if (!project.completed_at) issues.push('missing-completed-date');
  if (project.completed_at && !hasSaneCompletedDate(project.completed_at)) issues.push('invalid-completed-date');
  if (!hasMeaningfulText(project.description, 24)) issues.push('needs-description');
  if (project.status !== 'completed') issues.push('unpublished-status');

  return issues;
}

export function isPublicReadyProject(project: Project) {
  return getProjectPublicIssues(project).length === 0;
}

```

### Admin projects client
```tsx
'use client';

import { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Trash2, Loader2, Pencil, MapPin, Calendar, User } from 'lucide-react';
import { toast } from 'sonner';
import { Project } from '@/types/supabase';
import { getProjects, deleteProject } from '@/app/actions/project-actions';
import { getProjectHeroImage, getProjectPublicIssues } from '@/lib/projects/publicProjects';

interface AdminProjectsClientProps {
    initialProjects: Project[];
}

const publicIssueLabels: Record<string, string> = {
    'test-title': '테스트 제목',
    'missing-image': '이미지 없음',
    'invalid-image-url': '이미지 URL 확인',
    'missing-client': '고객 정보 필요',
    'missing-location': '위치 필요',
    'missing-completed-date': '완료일 필요',
    'invalid-completed-date': '완료일 확인',
    'needs-description': '설명 보강',
    'unpublished-status': '완료 상태 아님',
};

export default function AdminProjectsClient({ initialProjects }: AdminProjectsClientProps) {
    const [projects, setProjects] = useState<Project[]>(initialProjects);
    const [loading, setLoading] = useState(false);
    const [deleting, setDeleting] = useState<string | null>(null);
    const [filterStatus, setFilterStatus] = useState('All');
    const didUseInitialData = useRef(false);
    const visibleSummary = useMemo(() => {
        const withImages = projects.filter((project) => getProjectHeroImage(project)).length;
        const incomplete = projects.filter((project) => getProjectPublicIssues(project).length > 0).length;

        return { withImages, incomplete };
    }, [projects]);

    const fetchProjects = useCallback(async (status: string) => {
        try {
            const data = await getProjects(status);
            setProjects(data);
        } catch (error) {
            console.error('Error fetching projects:', error);
            toast.error('프로젝트 목록을 불러오지 못했습니다.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!didUseInitialData.current) {
            didUseInitialData.current = true;
            return;
        }

        setLoading(true);
        fetchProjects(filterStatus);
    }, [filterStatus, fetchProjects]);

    const handleDelete = async (id: string) => {
        if (!confirm('정말 삭제하시겠습니까?')) return;

        setDeleting(id);
        try {
            await deleteProject(id);
            setProjects(prev => prev.filter(item => item.id !== id));
            toast.success('삭제되었습니다.');
        } catch (error) {
            console.error('Error deleting project:', error);
            toast.error('삭제 중 오류가 발생했습니다.');
        } finally {
            setDeleting(null);
        }
    };

    const statusLabel = (status: string | null) => {
        switch (status) {
            case 'completed': return '완료';
            case 'in_progress': return '진행중';
            case 'planned': return '계획중';
            default: return status || '미지정';
        }
    };

    const statusColor = (status: string | null) => {
        switch (status) {
            case 'completed': return 'text-green-600 bg-green-50';
            case 'in_progress': return 'text-blue-600 bg-blue-50';
            case 'planned': return 'text-orange-600 bg-orange-50';
            default: return 'text-gray-600 bg-gray-50';
        }
    };

    if (loading && projects.length === 0) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                        프로젝트 관리 <span className="text-sm font-normal text-gray-500 ml-2">Total {projects.length}</span>
                    </h1>
                    <p className="text-gray-500 text-sm mt-1">
                        공개 품질에 영향을 주는 이미지·기본 정보를 한 화면에서 빠르게 확인합니다.
                        {loading && <span className="ml-2 text-gray-400">필터 적용 중...</span>}
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        disabled={loading}
                        className="px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-black bg-white"
                    >
                        <option value="All">전체 상태</option>
                        <option value="completed">완료</option>
                        <option value="in_progress">진행중</option>
                        <option value="planned">계획중</option>
                    </select>
                    <Link
                        href="/admin/projects/new"
                        className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
                    >
                        <Plus className="w-4 h-4" />
                        새 프로젝트
                    </Link>
                </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-lg border border-gray-200 bg-white p-4">
                    <p className="text-xs font-semibold text-gray-500">현재 표시</p>
                    <p className="mt-2 text-2xl font-black text-gray-900">{projects.length}</p>
                </div>
                <div className="rounded-lg border border-gray-200 bg-white p-4">
                    <p className="text-xs font-semibold text-gray-500">유효 이미지</p>
                    <p className="mt-2 text-2xl font-black text-gray-900">{visibleSummary.withImages}</p>
                </div>
                <div className="rounded-lg border border-gray-200 bg-white p-4">
                    <p className="text-xs font-semibold text-gray-500">보완 필요</p>
                    <p className="mt-2 text-2xl font-black text-gray-900">{visibleSummary.incomplete}</p>
                </div>
            </div>

            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
                <div className="grid grid-cols-[88px_minmax(180px,1fr)_110px_160px_120px_120px] gap-4 border-b border-gray-100 bg-gray-50 px-4 py-3 text-xs font-bold uppercase tracking-wider text-gray-500 max-lg:hidden">
                    <span>이미지</span>
                    <span>프로젝트</span>
                    <span>상태</span>
                    <span>고객/지역</span>
                    <span>완료일</span>
                    <span className="text-right">관리</span>
                </div>
                {projects.map((project, index) => {
                    const publicIssues = getProjectPublicIssues(project);
                    const heroImage = getProjectHeroImage(project);

                    return (
                        <div
                            key={project.id}
                            className="grid gap-4 border-b border-gray-100 px-4 py-4 last:border-b-0 lg:grid-cols-[88px_minmax(180px,1fr)_110px_160px_120px_120px] lg:items-center"
                        >
                            <div className="relative h-20 w-20 overflow-hidden rounded-lg bg-gray-100">
                                {heroImage ? (
                                    <Image
                                        src={heroImage}
                                        alt={project.title}
                                        fill
                                        loading={index === 0 ? 'eager' : 'lazy'}
                                        sizes="80px"
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center px-2 text-center text-xs font-semibold text-gray-400">
                                        {project.images?.[0] ? 'Invalid Image' : 'No Image'}
                                    </div>
                                )}
                            </div>

                            <div className="min-w-0">
                                <h3 className="truncate font-semibold text-gray-900">{project.title}</h3>
                                <div className="mt-2 flex flex-wrap gap-1.5">
                                    {publicIssues.length === 0 ? (
                                        <span className="rounded border border-green-200 bg-green-50 px-2 py-0.5 text-xs font-semibold text-green-700">
                                            공개 가능
                                        </span>
                                    ) : (
                                        publicIssues.slice(0, 3).map((issue) => (
                                            <span key={issue} className="rounded border border-amber-200 bg-amber-50 px-2 py-0.5 text-xs font-semibold text-amber-700">
                                                {publicIssueLabels[issue] ?? issue}
                                            </span>
                                        ))
                                    )}
                                    {publicIssues.length > 3 && (
                                        <span className="rounded border border-gray-200 bg-gray-50 px-2 py-0.5 text-xs text-gray-500">
                                            +{publicIssues.length - 3}
                                        </span>
                                    )}
                                    {project.tags?.slice(0, 2).map((tag) => (
                                        <span key={tag} className="rounded border border-gray-200 bg-gray-50 px-2 py-0.5 text-xs text-gray-600">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${statusColor(project.status)}`}>
                                    {statusLabel(project.status)}
                                </span>
                            </div>

                            <div className="space-y-1 text-sm text-gray-600">
                                {project.client && (
                                    <p className="flex items-center gap-1.5">
                                        <User className="h-3.5 w-3.5" />
                                        {project.client}
                                    </p>
                                )}
                                {project.location && (
                                    <p className="flex items-center gap-1.5">
                                        <MapPin className="h-3.5 w-3.5" />
                                        {project.location}
                                    </p>
                                )}
                            </div>

                            <div className="flex items-center gap-1.5 text-sm text-gray-600">
                                <Calendar className="h-3.5 w-3.5" />
                                {project.completed_at ? new Date(project.completed_at).toLocaleDateString() : '미지정'}
                            </div>

                            <div className="flex justify-start gap-2 lg:justify-end">
                                <Link
                                    href={`/admin/projects/${project.id}`}
                                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-black transition-colors hover:bg-gray-50"
                                    aria-label={`${project.title} 수정`}
                                >
                                    <Pencil className="h-4 w-4" />
                                </Link>
                                <button
                                    type="button"
                                    onClick={() => handleDelete(project.id)}
                                    disabled={deleting === project.id}
                                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-red-100 bg-white text-red-600 transition-colors hover:bg-red-50 disabled:opacity-60"
                                    aria-label={`${project.title} 삭제`}
                                >
                                    {deleting === project.id ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <Trash2 className="h-4 w-4" />
                                    )}
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {projects.length === 0 && (
                <div className="text-center py-12 bg-white rounded-lg border border-gray-200 border-dashed">
                    <p className="text-gray-500">등록된 프로젝트가 없습니다.</p>
                </div>
            )}
        </div>
    );
}

```

### Products client staged rendering / honest CTA
```tsx
"use client";

import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import Image from "next/image";
import { Product } from "@/types/supabase";
import { ChevronDown, Home, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

// 제품 타입 정의 (Frontend View Model)
interface ProductData {
    id: string;
    name: string;
    subCategory: "Private" | "Public";
    sizeCategory: "S" | "M" | "L" | "XL" | "DESIGN";
    imageUrl: string;
    subImages: string[];
    tagline: string;
    description: string;
    details: {
        price: string;
        structure: string;
        roofType: string;
        exterior: string;
        interior: string;
        size: string;
    };
    floorPlan: {
        src: string;
        crop: {
            width: string;
            height: string;
            top: string;
            left: string;
        };
    };
}

// Helper to parse crop data from URL
const parseFloorPlan = (url: string | null) => {
    if (!url) return { src: "", crop: { width: "100%", height: "100%", top: "0%", left: "0%" } };

    const [baseUrl, query] = url.split('?');
    const params = new URLSearchParams(query);

    return {
        src: baseUrl,
        crop: {
            width: params.get('crop_w') || "100%",
            height: params.get('crop_h') || "100%",
            top: params.get('crop_t') || "0%",
            left: params.get('crop_l') || "0%",
        }
    };
};

// Helper to map Supabase Product to ProductData
const mapProductToData = (p: Product): ProductData => {
    const floorPlan = parseFloorPlan(p.floor_plan_url);

    return {
        id: p.id,
        name: p.name,
        subCategory: p.sub_category as "Private" | "Public",
        sizeCategory: p.size_category as "S" | "M" | "L" | "XL" | "DESIGN",
        imageUrl: p.image_url,
        tagline: p.tagline || "",
        description: p.description,
        details: {
            price: p.price || "-",
            structure: p.structure || "-",
            roofType: p.roof_type || "-",
            exterior: p.exterior_finish || "-",
            interior: p.interior_finish || "-",
            size: p.size || "-",
        },
        floorPlan: floorPlan,
        subImages: p.sub_images || [],
    };
};

const sortProducts = (products: ProductData[]) => {
    const categoryOrder = ["S", "M", "L", "XL", "DESIGN"];

    return [...products].sort((a, b) => {
        const idxA = categoryOrder.indexOf(a.sizeCategory);
        const idxB = categoryOrder.indexOf(b.sizeCategory);

        if (idxA !== idxB) {
            return idxA - idxB;
        }

        if (a.sizeCategory === 'S') {
            if (a.subCategory === 'Private' && b.subCategory !== 'Private') return -1;
            if (a.subCategory !== 'Private' && b.subCategory === 'Private') return 1;
        }

        return 0;
    });
};

interface ProductsPageClientProps {
    initialProducts: Product[];
}

export default function ProductsPageClient({ initialProducts }: ProductsPageClientProps) {
    const { language } = useLanguage();
    const isKO = language === 'KO';
    const TEXT = {
        description: isKO ? '설명' : 'Description',
        specs: isKO ? '상세 정보' : 'Specifications',
        price: isKO ? '가격' : 'Price',
        size: isKO ? '크기' : 'Size',
        structure: isKO ? '구조' : 'Structure',
        roof: isKO ? '지붕재' : 'Roof',
        exterior: isKO ? '외부마감' : 'Exterior',
        interior: isKO ? '내부마감' : 'Interior',
        floorPlan: isKO ? '도면' : 'Floor Plan',
        floorPlanWaiting: isKO ? '도면 요청 시 제공' : 'Floor plan available on request',
    };
    const [products] = useState<ProductData[]>(() => sortProducts(initialProducts.map(mapProductToData)));
    const [visibleCount, setVisibleCount] = useState(() => Math.min(8, products.length));
    const visibleProducts = useMemo(() => products.slice(0, visibleCount), [products, visibleCount]);
    const [expandedCategories, setExpandedCategories] = useState<string[]>(["S", "M", "L", "XL", "DESIGN"]);
    const [expandedMobileProducts, setExpandedMobileProducts] = useState<string[]>([]);

    const toggleMobileProduct = (id: string) => {
        setExpandedMobileProducts(prev => prev.includes(id) ? prev.filter(pid => pid !== id) : [...prev, id]);
    };

    const [activeProduct, setActiveProduct] = useState<string>(() => products[0]?.id ?? "");
    const productRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
    const sidebarRef = useRef<HTMLDivElement>(null);
    const sidebarItemRefs = useRef<{ [key: string]: HTMLLIElement | null }>({});
    const didHandleInitialHash = useRef(false);
    const [isHeaderVisible, setIsHeaderVisible] = useState(true);

    // Sidebar Auto-Scroll Logic
    useEffect(() => {
        if (activeProduct && sidebarItemRefs.current[activeProduct] && sidebarRef.current) {
            const item = sidebarItemRefs.current[activeProduct];
            const container = sidebarRef.current;

            if (item && container) {
                // Calculate relative position to center the item
                const itemRect = item.getBoundingClientRect();
                const containerRect = container.getBoundingClientRect();
                const currentScroll = container.scrollTop;

                // Position within the viewport relative to container
                const relativeTop = itemRect.top - containerRect.top;

                // Desired position: Center of container
                const targetRelativeTop = (containerRect.height / 2) - (itemRect.height / 2);

                const scrollAmount = relativeTop - targetRelativeTop;

                container.scrollTo({
                    top: currentScroll + scrollAmount,
                    behavior: 'smooth'
                });
            }
        }
    }, [activeProduct]);
    const lastScrollY = useRef(0);
    // Gallery Modal State
    const [galleryOpen, setGalleryOpen] = useState(false);
    const [currentGalleryImages, setCurrentGalleryImages] = useState<string[]>([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const openGallery = (product: ProductData) => {
        const images = [product.imageUrl, ...(product.subImages || [])].filter(Boolean);
        if (images.length === 0) return;
        setCurrentGalleryImages(images);
        setCurrentImageIndex(0);
        setGalleryOpen(true);
    };

    const nextImage = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        setCurrentImageIndex((prev) => (prev + 1) % currentGalleryImages.length);
    };

    const prevImage = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        setCurrentImageIndex((prev) => (prev - 1 + currentGalleryImages.length) % currentGalleryImages.length);
    };

    // 사이드바 구조 생성 (Dynamic)
    interface SidebarCategory {
        label: string;
        subtitle: string;
        items?: string[];
        Private?: string[];
        Public?: string[];
    }

    const sidebarStructure: Record<string, SidebarCategory> = {
        S: {
            label: "S",
            subtitle: "",
            Private: products.filter(p => p.sizeCategory === "S" && p.subCategory === "Private").map(p => p.id),
            Public: products.filter(p => p.sizeCategory === "S" && p.subCategory === "Public").map(p => p.id),
        },
        M: {
            label: "M",
            subtitle: "",
            items: products.filter(p => p.sizeCategory === "M").map(p => p.id),
        },
        L: {
            label: "L",
            subtitle: "",
            items: products.filter(p => p.sizeCategory === "L").map(p => p.id),
        },
        XL: {
            label: "XL",
            subtitle: "",
            items: products.filter(p => p.sizeCategory === "XL").map(p => p.id),
        },
        DESIGN: {
            label: "DESIGN",
            subtitle: "",
            items: products.filter(p => p.sizeCategory === "DESIGN").map(p => p.id)
        },
    };

    const handleCategoryClick = (category: string) => {
        // 1. Expand immediately
        if (!expandedCategories.includes(category)) {
            setExpandedCategories([...expandedCategories, category]);
        }

        // 2. Scroll to first product in category
        const catData = sidebarStructure[category];
        let firstProductId = "";

        if (category === 'S') {
            firstProductId = catData.Private?.[0] || catData.Public?.[0] || "";
        } else {
            firstProductId = catData.items?.[0] || "";
        }

        if (firstProductId) {
            scrollToProduct(firstProductId);
        }
    };

    const scrollToProduct = useCallback((productId: string) => {
        const scrollWhenReady = () => {
            const element = productRefs.current[productId];
            if (!element) return;

            const headerOffset = 100;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
            });
            setActiveProduct(productId);
        };

        const productIndex = products.findIndex((product) => product.id === productId);
        if (productIndex >= visibleCount) {
            setVisibleCount((current) => Math.max(current, productIndex + 1));
            window.setTimeout(scrollWhenReady, 120);
            return;
        }

        scrollWhenReady();
    }, [products, visibleCount]);

    // Scroll to category or product hash after staged rendering has enough items.
    useEffect(() => {
        if (didHandleInitialHash.current || products.length === 0 || !window.location.hash) return;

        didHandleInitialHash.current = true;
        const hash = decodeURIComponent(window.location.hash.substring(1));
        const productMatch = products.find((product) => product.id === hash);
        let scrollTimer: number | undefined;
        const setupTimer = window.setTimeout(() => {
            if (productMatch) {
                scrollToProduct(productMatch.id);
                return;
            }

            const categoryMatch = products.find((product) => product.sizeCategory.toLowerCase() === hash.toLowerCase());
            if (!categoryMatch) return;

            setExpandedCategories((prev) => {
                if (prev.includes(categoryMatch.sizeCategory)) return prev;
                return [...prev, categoryMatch.sizeCategory];
            });

            const firstCategoryIndex = products.findIndex((product) => product.sizeCategory === categoryMatch.sizeCategory);
            if (firstCategoryIndex < 0) return;

            setVisibleCount((current) => Math.max(current, firstCategoryIndex + 1));
            scrollTimer = window.setTimeout(() => {
                const element = document.getElementById(categoryMatch.sizeCategory.toLowerCase());
                if (!element) {
                    scrollToProduct(products[firstCategoryIndex].id);
                    return;
                }

                const headerOffset = 100;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
                setActiveProduct(products[firstCategoryIndex].id);
            }, 150);
        }, 0);

        return () => {
            window.clearTimeout(setupTimer);
            if (scrollTimer) window.clearTimeout(scrollTimer);
        };
    }, [products, scrollToProduct]);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Header Visibility Logic
            if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
                setIsHeaderVisible(false);
            } else {
                setIsHeaderVisible(true);
            }
            lastScrollY.current = currentScrollY;

            // Active Product Logic using getBoundingClientRect (Viewport Relative)
            // Trigger point: 30% down from top of viewport
            const triggerPoint = window.innerHeight * 0.3;

            let closestProductId = "";
            let minDistanceToTrigger = Infinity;

            // Check bottom of page first
            const documentHeight = document.documentElement.scrollHeight;
            if (window.innerHeight + currentScrollY >= documentHeight - 50) {
                if (visibleProducts.length > 0) {
                    setActiveProduct(visibleProducts[visibleProducts.length - 1].id);
                    return;
                }
            }

            for (const product of visibleProducts) {
                const element = productRefs.current[product.id];
                if (element) {
                    const rect = element.getBoundingClientRect();

                    // Check overlap with trigger point
                    if (rect.top <= triggerPoint && rect.bottom >= triggerPoint) {
                        closestProductId = product.id;
                        break;
                    }

                    // Fallback: track closest element top to trigger
                    const distance = Math.abs(rect.top - triggerPoint);
                    if (distance < minDistanceToTrigger) {
                        minDistanceToTrigger = distance;
                        closestProductId = product.id;
                    }
                }
            }

            if (closestProductId && closestProductId !== activeProduct) {
                setActiveProduct(closestProductId);
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [visibleProducts, activeProduct]);


    const getProductName = (id: string) => {
        const product = products.find((p) => p.id === id);
        return product?.name || id;
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="flex flex-col lg:flex-row max-w-[1920px] mx-auto relative">
                {/* Sidebar */}
                <aside className="w-[280px] h-screen sticky top-0 hidden lg:flex flex-col pt-[140px] pb-10 pl-[60px] overflow-hidden bg-gray-50 border-r border-gray-100 z-10">
                    <div ref={sidebarRef} className="flex-1 overflow-y-auto pr-6 custom-scrollbar space-y-12">
                        {(Object.keys(sidebarStructure) as Array<keyof typeof sidebarStructure>).map((key) => {
                            const category = sidebarStructure[key];
                            const isExpanded = expandedCategories.includes(key);
                            const hasItems = (category.items && category.items.length > 0) ||
                                (category.Private && category.Private.length > 0) ||
                                (category.Public && category.Public.length > 0);

                            if (!hasItems) return null;

                            return (
                                <div key={key} className="group">
                                    <div
                                        className="flex items-center justify-between cursor-pointer mb-4 select-none group/header py-2" // Added padding for click area
                                        onClick={() => handleCategoryClick(key)}
                                    >
                                        <div className="transiton-transform duration-300 group-hover/header:translate-x-2"> {/* Increased movement */}
                                            <h2 className={`text-5xl font-black tracking-tighter transition-colors duration-300 ${isExpanded ? 'text-black' : 'text-gray-200 group-hover:text-gray-400'}`}> {/* Larger font, lighter inactive color */}
                                                {category.label}
                                            </h2>
                                            {category.subtitle && (
                                                <p className="text-[10px] text-gray-400 mt-1 font-medium tracking-wide uppercase opacity-0 group-hover/header:opacity-100 transition-opacity transformtranslate-y-1 group-hover/header:translate-y-0">
                                                    {category.subtitle}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <AnimatePresence>
                                        {isExpanded && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                                className="overflow-hidden"
                                            >
                                                <div className="pl-1 space-y-6 pt-2 pb-4">
                                                    {/* S만 세부 카테고리(Private/Public) 지원 */}
                                                    {key === 'S' ? (
                                                        <>
                                                            {category.Private && category.Private.length > 0 && (
                                                                <div className="mb-6">
                                                                    <div className="flex items-c
...<truncated 28029 chars>
```

### Analytics dashboard fallback
```ts
'use server';

import {
    getTrafficStats,
    getUserDemographics,
    getCityDemographics,
    getAcquisitionSources,
    getTopPages
} from '@/lib/analytics';
import { unstable_cache } from 'next/cache';
import { requireAdmin } from '@/lib/admin-auth';

// Cache configuration
const CACHE_TIME = 3600; // 1 hour
const DEFAULT_DASHBOARD_TIMEOUT_MS = 7000;
const MIN_DASHBOARD_TIMEOUT_MS = 1000;
const MAX_DASHBOARD_TIMEOUT_MS = 30000;
const configuredDashboardTimeout = Number(process.env.GA_DASHBOARD_TIMEOUT_MS);
const DASHBOARD_TIMEOUT_MS = Number.isFinite(configuredDashboardTimeout)
    ? Math.min(Math.max(configuredDashboardTimeout, MIN_DASHBOARD_TIMEOUT_MS), MAX_DASHBOARD_TIMEOUT_MS)
    : DEFAULT_DASHBOARD_TIMEOUT_MS;

const cachedTrafficStats = unstable_cache(
    async (startDate?: string, endDate?: string) => {
        return await getTrafficStats(startDate, endDate);
    },
    ['analytics-traffic'],
    { revalidate: CACHE_TIME, tags: ['analytics'] }
);

const cachedUserDemographics = unstable_cache(
    async (startDate?: string, endDate?: string) => {
        return await getUserDemographics(startDate, endDate);
    },
    ['analytics-demographics'],
    { revalidate: CACHE_TIME, tags: ['analytics'] }
);

const cachedCityDemographics = unstable_cache(
    async (startDate?: string, endDate?: string) => {
        return await getCityDemographics(startDate, endDate);
    },
    ['analytics-city'],
    { revalidate: CACHE_TIME, tags: ['analytics'] }
);

const cachedAcquisitionSources = unstable_cache(
    async (startDate?: string, endDate?: string) => {
        return await getAcquisitionSources(startDate, endDate);
    },
    ['analytics-acquisition'],
    { revalidate: CACHE_TIME, tags: ['analytics'] }
);

const cachedTopPages = unstable_cache(
    async (startDate?: string, endDate?: string) => {
        return await getTopPages(startDate, endDate);
    },
    ['analytics-top-pages'],
    { revalidate: CACHE_TIME, tags: ['analytics'] }
);

export async function fetchTrafficStats(startDate?: string, endDate?: string) {
    await requireAdmin();
    return cachedTrafficStats(startDate, endDate);
}

export async function fetchUserDemographics(startDate?: string, endDate?: string) {
    await requireAdmin();
    return cachedUserDemographics(startDate, endDate);
}

export async function fetchCityDemographics(startDate?: string, endDate?: string) {
    await requireAdmin();
    return cachedCityDemographics(startDate, endDate);
}

export async function fetchAcquisitionSources(startDate?: string, endDate?: string) {
    await requireAdmin();
    return cachedAcquisitionSources(startDate, endDate);
}

export async function fetchTopPages(startDate?: string, endDate?: string) {
    await requireAdmin();
    return cachedTopPages(startDate, endDate);
}

function settledValue<T>(result: PromiseSettledResult<T>) {
    if (result.status === 'fulfilled') return result.value;

    return {
        error: result.reason instanceof Error ? result.reason.message : 'Analytics data failed to load',
    };
}

export async function fetchAnalyticsDashboard(startDate?: string, endDate?: string) {
    await requireAdmin();

    const loadDashboard = async () => {
        const [trafficStats, demographics, acquisition, topPages, cityStats] = await Promise.allSettled([
            cachedTrafficStats(startDate, endDate),
            cachedUserDemographics(startDate, endDate),
            cachedAcquisitionSources(startDate, endDate),
            cachedTopPages(startDate, endDate),
            cachedCityDemographics(startDate, endDate),
        ]);

        return {
            trafficStats: settledValue(trafficStats),
            demographics: settledValue(demographics),
            acquisition: settledValue(acquisition),
            topPages: settledValue(topPages),
            cityStats: settledValue(cityStats),
        };
    };

    const timeoutFallback = new Promise<Awaited<ReturnType<typeof loadDashboard>>>((resolve) => {
        setTimeout(() => {
            const error = { error: `Analytics dashboard timed out after ${DASHBOARD_TIMEOUT_MS}ms` };
            resolve({
                trafficStats: error,
                demographics: error,
                acquisition: error,
                topPages: error,
                cityStats: error,
            });
        }, DASHBOARD_TIMEOUT_MS);
    });

    return Promise.race([loadDashboard(), timeoutFallback]);
}

```

## Commands Run / Validation Output

- npm run lint: passed, ESLint max-warnings=0.
- npm test: passed, Vitest 3 files / 20 tests.
- npm run build: passed, production build completed. Existing warning only: Next middleware file convention deprecated in favor of proxy.
- npx playwright test e2e/customize-configurator.spec.ts e2e/public-pages.spec.ts: passed, 16/16 tests.
- Final Playwright server log after image fixes: no Next Image sizes/LCP warnings remained; only NO_COLOR/FORCE_COLOR process warnings and existing middleware-to-proxy deprecation.
- Supabase service-role lookup identified remaining LCP URL as hero_slides[0], then code fixed both public hero carousel and admin CMS hero thumbnail loading hints.

## Browser / Playwright Findings

- Clean /customize remains clean until buyer changes configuration.
- /products has no /customize?product= misleading CTA and hash links reveal hidden staged products.
- /projects does not expose test project title or Image Coming Soon placeholders.
- Mobile public pages and key admin routes avoid horizontal overflow.
- Authenticated admin checks use temporary Supabase Auth user when E2E_ADMIN_ID/PASSWORD are absent and clean up afterward.
- /admin/projects and /admin/insights were previously audited authenticated with 0 warnings/errors and no overflow after fixes.

## Current Failures / Risks

- GPT-5.5 Pro Deep Research/Chrome stage 4 review failed repeatedly and was not saved because outputs were empty, stuck, split, or marker-mismatched.
- Antigravity IDE did not respond to Computer Use get_app_state within 120s on two attempts.
- Real portfolio proof quality still depends on future admin content entry.
- Existing Next middleware-to-proxy deprecation remains unrelated to this task.

## Exact Review Questions For GPT-5.5 Pro

Return exactly one of VERDICT: PASS or VERDICT: REVISE. If REVISE, list only concrete MUST_FIX items that should block completion. Treat content-entry wishlist items as OPTIONAL unless code must change now.

1. Are there any remaining MUST_FIX logic bugs in public project filtering, direct project routes, products staged rendering/hash links, customize URL behavior, or admin project readiness display?
2. Are there any remaining MUST_FIX admin performance/reliability issues after SSR initial projects, analytics timeout/allSettled fallback, chart resize handling, and image loading hint fixes?
3. Are there any remaining MUST_FIX conversion blockers in homepage/products/projects/support from the 5 personas?
4. Are the validation results enough for this repository state, or is a specific missing test a MUST_FIX?

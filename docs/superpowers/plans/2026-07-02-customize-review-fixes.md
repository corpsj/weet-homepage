# /customize 리뷰 확정 24건 수정 구현 계획

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 멀티에이전트 리뷰에서 확정된 /customize 컨피규레이터 결함 24건을 5개 웨이브로 수정한다 (스펙: `docs/superpowers/specs/2026-07-02-customize-review-fixes-design.md`).

**Architecture:** 기존 구조(서버 page.tsx → 클라이언트 CustomizeConfigurator → parts/*) 유지. 신규 유닛은 `sanitizeConfig`(priceCalculator), `useIsDesktop`(hooks), `scrollBehavior`(helpers) 3개뿐. 나머지는 기존 파일 내 국소 수정.

**Tech Stack:** Next.js 15 App Router, TypeScript, Tailwind, vitest(`npm run test`), Playwright(`npx playwright test`), Supabase.

## Global Constraints

- **절대 변경 금지:** `formatWon`의 `₩` prefix 포맷 / customize.\* 토큰 체계 / 22px 스와치 / 도면 좌표(우변 830, 6m→x326/w504, 9m→x74/w756) / "결제는 진행되지 않습니다" 고지. **예외 1건:** '포함' 가격색 #9ca3af → #6b7280 (사용자 승인).
- 고객 노출 카피는 byte-identical 유지 (e2e가 카피를 단언함). 이 계획의 어떤 태스크도 카피를 바꾸지 않는다.
- `npm run lint`는 max-warnings=0. react-hooks 규칙이 effect 내 setState를 막을 수 있음 — 마운트 1회 외부 저장소 복원 등 정당한 경우만 `// eslint-disable-next-line` + 사유 주석으로 통과시킨다.
- Next 16: `revalidateTag(tag, 'max')` 2-인자 시그니처.
- 새 의존성 추가 금지. 커밋 메시지는 한국어 `fix(customize): ...` / `feat(customize): ...` / `test(customize): ...` 형식.
- 각 태스크 완료 시: `npm run lint && npm run test` 통과 확인 후 커밋.

---

## Wave 1 — 상태·URL 결함

### Task 1: sanitizeConfig 헬퍼 (#2)

**Files:**
- Modify: `lib/customize/priceCalculator.ts` (파일 끝에 추가)
- Modify: `components/customize/CustomizeConfigurator.tsx:58-64` (초기 state), `components/customize/lib/helpers.ts:75` (모델 변경), `app/actions/customize-actions.ts:339-341` (서버 제출)
- Test: `lib/customize/__tests__/sanitizeConfig.test.ts` (신규)

**Interfaces:**
- Produces: `sanitizeConfig(catalog: CustomizeCatalog, modelId: string, selections: SelectedOptions): { modelId: string; selections: SelectedOptions }` — 이후 태스크가 이 시그니처를 사용.

- [ ] **Step 1: 실패하는 테스트 작성** — `lib/customize/__tests__/sanitizeConfig.test.ts`

기존 `lib/customize/__tests__/priceCalculator.test.ts` 상단의 카탈로그 픽스처 패턴을 참고해 최소 픽스처를 만들고 5개 규칙을 검증한다:

```ts
import { describe, expect, it } from 'vitest';
import { sanitizeConfig } from '../priceCalculator';
import type { CustomizeCatalog } from '../types';

// 최소 픽스처: 모델 2(m1 활성, mX 비활성), 카테고리 single(c1)·multi(c2),
// 옵션 a(c1, default)·b(c1)·d(c2, default)·e(c2), 충돌 d↔e
const catalog: CustomizeCatalog = {
  models: [
    { id: 'm1', code: 'm1', nameKo: '모델1', nameEn: null, widthM: 3, lengthM: 6, areaSqm: 18, basePrice: 1000, imagePath: null, displayOrder: 1, isActive: true },
    { id: 'mX', code: 'mX', nameKo: '비활성', nameEn: null, widthM: 3, lengthM: 9, areaSqm: 27, basePrice: 2000, imagePath: null, displayOrder: 2, isActive: false },
  ],
  categories: [
    { id: 'c1', key: 'door', nameKo: '도어', nameEn: null, descriptionKo: null, descriptionEn: null, selectionType: 'single', required: true, displayOrder: 1, isActive: true },
    { id: 'c2', key: 'connectivity', nameKo: '통신', nameEn: null, descriptionKo: null, descriptionEn: null, selectionType: 'multiple', required: false, displayOrder: 2, isActive: true },
  ],
  options: [
    { id: 'a', key: 'a', categoryId: 'c1', categoryKey: 'door', nameKo: 'a', nameEn: null, shortDescriptionKo: null, shortDescriptionEn: null, detailDescriptionKo: null, detailDescriptionEn: null, priceType: 'included', price: 0, isDefault: true, availableModelIds: [], imagePath: null, displayOrder: 1, isActive: true },
    { id: 'b', key: 'b', categoryId: 'c1', categoryKey: 'door', nameKo: 'b', nameEn: null, shortDescriptionKo: null, shortDescriptionEn: null, detailDescriptionKo: null, detailDescriptionEn: null, priceType: 'fixed', price: 100, isDefault: false, availableModelIds: [], imagePath: null, displayOrder: 2, isActive: true },
    { id: 'd', key: 'd', categoryId: 'c2', categoryKey: 'connectivity', nameKo: 'd', nameEn: null, shortDescriptionKo: null, shortDescriptionEn: null, detailDescriptionKo: null, detailDescriptionEn: null, priceType: 'fixed', price: 50, isDefault: true, availableModelIds: [], imagePath: null, displayOrder: 3, isActive: true },
    { id: 'e', key: 'e', categoryId: 'c2', categoryKey: 'connectivity', nameKo: 'e', nameEn: null, shortDescriptionKo: null, shortDescriptionEn: null, detailDescriptionKo: null, detailDescriptionEn: null, priceType: 'consult', price: 0, isDefault: false, availableModelIds: [], imagePath: null, displayOrder: 4, isActive: true },
  ],
  includedSpecs: [],
  conflicts: [{ id: 'cf1', optionId: 'e', conflictsWithOptionId: 'd', reasonKo: null }],
};
// 주의: 픽스처의 필드명이 lib/customize/types.ts 실제 타입과 다르면 타입 에러가 난다.
// 구현 시 types.ts를 열어 위 필드명을 실제 타입에 맞춰 조정할 것(테스트 의도는 유지).

describe('sanitizeConfig', () => {
  it('없는 옵션 id를 제거한다', () => {
    const out = sanitizeConfig(catalog, 'm1', { c1: ['a', 'ghost'] });
    expect(out.selections.c1).toEqual(['a']);
  });
  it('옵션을 실제 categoryId 키로 재매핑한다 (유령 키 제거)', () => {
    const out = sanitizeConfig(catalog, 'm1', { oldCat: ['a'] });
    expect(out.selections.c1).toEqual(['a']);
    expect(out.selections.oldCat).toBeUndefined();
  });
  it('single 카테고리는 첫 항목만 유지한다', () => {
    const out = sanitizeConfig(catalog, 'm1', { c1: ['a', 'b'] });
    expect(out.selections.c1).toEqual(['a']);
  });
  it('충돌 쌍은 기본 옵션(d)을 제거하고 비기본(e)을 남긴다', () => {
    const out = sanitizeConfig(catalog, 'm1', { c1: ['a'], c2: ['d', 'e'] });
    expect(out.selections.c2).toEqual(['e']);
  });
  it('비활성/부재 modelId는 첫 활성 모델 + 기본 선택으로 폴백한다', () => {
    const out = sanitizeConfig(catalog, 'mX', { c1: ['b'] });
    expect(out.modelId).toBe('m1');
    expect(out.selections.c1).toEqual(['a']); // getDefaultSelections 결과
  });
});
```

- [ ] **Step 2: 실패 확인** — Run: `npm run test -- --run sanitizeConfig` → Expected: FAIL (`sanitizeConfig is not exported`)

- [ ] **Step 3: 구현** — `lib/customize/priceCalculator.ts` 끝(199행 `formatPrice` 아래 — Task 17에서 삭제되기 전이므로 위치 무관)에 추가:

```ts
// ?c= 디코드/모델 변경 등 신뢰할 수 없는 선택 상태를 카탈로그 기준으로 정규화한다.
// 규칙: 없는 옵션 제거 → 실제 categoryId로 재매핑 → single은 첫 항목만 →
// 충돌 쌍은 기본(isDefault) 옵션을 제거(둘 다/둘 다 아니면 conflictsWith 쪽 제거) →
// 모델이 비활성/부재면 첫 활성 모델 + 기본 선택으로 폴백.
export function sanitizeConfig(
  catalog: CustomizeCatalog,
  modelId: string,
  selections: SelectedOptions
): { modelId: string; selections: SelectedOptions } {
  const model = catalog.models.find((item) => item.id === modelId && item.isActive);
  if (!model) {
    const fallbackId = catalog.models.find((item) => item.isActive)?.id ?? modelId;
    return { modelId: fallbackId, selections: getDefaultSelections(catalog, fallbackId) };
  }

  const available = new Map(
    optionsForModel(catalog.options.filter((option) => option.isActive), model.id).map((option) => [option.id, option])
  );
  const categories = new Map(catalog.categories.filter((category) => category.isActive).map((category) => [category.id, category]));

  const next: SelectedOptions = {};
  const seen = new Set<string>();
  for (const optionId of Object.values(selections).flat()) {
    const option = available.get(optionId);
    if (!option || seen.has(optionId)) continue;
    const category = categories.get(option.categoryId);
    if (!category) continue;
    const current = next[option.categoryId] ?? [];
    if (category.selectionType === 'single' && current.length >= 1) continue;
    seen.add(optionId);
    next[option.categoryId] = [...current, optionId];
  }

  for (const conflict of catalog.conflicts) {
    const ids = new Set(Object.values(next).flat());
    if (!ids.has(conflict.optionId) || !ids.has(conflict.conflictsWithOptionId)) continue;
    const a = available.get(conflict.optionId);
    const b = available.get(conflict.conflictsWithOptionId);
    const dropId = a?.isDefault && !b?.isDefault ? conflict.optionId
      : b?.isDefault && !a?.isDefault ? conflict.conflictsWithOptionId
      : conflict.conflictsWithOptionId;
    for (const [categoryId, optionIds] of Object.entries(next)) {
      next[categoryId] = optionIds.filter((id) => id !== dropId);
    }
  }

  for (const [categoryId, optionIds] of Object.entries(next)) {
    if (optionIds.length === 0) delete next[categoryId];
  }

  return { modelId: model.id, selections: next };
}
```

- [ ] **Step 4: 통과 확인** — Run: `npm run test -- --run sanitizeConfig` → Expected: PASS (5 tests)

- [ ] **Step 5: 3개 소비처에 연결**

(a) `CustomizeConfigurator.tsx` — import에 `sanitizeConfig` 추가 후 58-64행을 교체:

```tsx
  const decoded = useMemo(() => decodeConfig(initialConfig), [initialConfig]);
  const firstModelId = catalog.models[0]?.id ?? DEFAULT_MODEL_ID;
  // 외부 입력(?c=)·기본값 모두 카탈로그 기준으로 정규화해서 시작한다.
  const initial = useMemo(
    () => sanitizeConfig(
      catalog,
      decoded?.modelId ?? firstModelId,
      decoded?.selectedOptions ?? getDefaultSelections(catalog, decoded?.modelId ?? firstModelId)
    ),
    [catalog, decoded, firstModelId]
  );
  const [modelId, setModelId] = useState(initial.modelId);
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>(initial.selections);
```

`getDefaultSelections`를 priceCalculator import 목록에 추가(이미 있음 — 확인만).

(b) `components/customize/lib/helpers.ts` — import에 `sanitizeConfig` 추가, `buildSelectionsForModelChange`의 75행 return을 교체:

```ts
  return { selections: sanitizeConfig(catalog, nextModelId, nextSelections).selections, removedOptions };
```

(c) `app/actions/customize-actions.ts:339-341` — import에 `sanitizeConfig` 추가 후:

```ts
    const catalog = await loadCatalog(supabase, false);
    const safe = sanitizeConfig(catalog, parsed.data.modelId, parsed.data.selectedOptions);
    const estimate = calculateEstimate(catalog, safe.modelId, safe.selections);
```

이후 346행 `selectedOptionIds(parsed.data.selectedOptions)` → `selectedOptionIds(safe.selections)`, 352-357행의 `parsed.data.selectedOptions` → `safe.selections`, 358행 `encodeConfig(estimate.model.id, selectedOptions)`는 그대로(위에서 정의되는 `selectedOptions` 지역변수가 safe 기반이 됨).

- [ ] **Step 6: 게이트 + 커밋**

```bash
npm run lint && npm run test -- --run
git add lib/customize app/actions/customize-actions.ts components/customize
git commit -m "fix(customize): 선택 상태 sanitizeConfig 정규화 (?c=·모델변경·서버 제출)"
```

### Task 2: URL 동기화 effect 재작성 (#1)

**Files:**
- Modify: `components/customize/CustomizeConfigurator.tsx:92-102`

**Interfaces:**
- Produces: `pristineEncoded: string` (컴포넌트 내 useMemo) — Task 4가 세션 저장 시 사용.

- [ ] **Step 1: 구현** — 92-102행(`encodedConfig` useMemo, `initialEncodedConfigRef`, URL effect)을 다음으로 교체. `initialEncodedConfigRef`는 삭제:

```tsx
  const encodedConfig = useMemo(() => encodeConfig(modelId, selectedOptions), [modelId, selectedOptions]);
  // 순정 기본 구성(첫 모델 + 기본 선택)의 인코딩. 이 상태에서는 URL을 깨끗하게 유지한다.
  const pristineEncoded = useMemo(
    () => encodeConfig(firstModelId, getDefaultSelections(catalog, firstModelId)),
    [catalog, firstModelId]
  );

  // URL을 항상 현재 구성과 일치시킨다(공유/새로고침 복원 정합성).
  // utm 등 기존 쿼리는 보존하고, 300ms debounce + try/catch로 Safari replaceState 제한을 방어한다.
  useEffect(() => {
    if (!estimate || typeof window === 'undefined') return;
    const timer = window.setTimeout(() => {
      try {
        const params = new URLSearchParams(window.location.search);
        if (encodedConfig === pristineEncoded) {
          params.delete('c');
        } else {
          params.set('c', encodedConfig);
        }
        const query = params.toString();
        window.history.replaceState(null, '', `${window.location.pathname}${query ? `?${query}` : ''}`);
      } catch {
        // Safari replaceState 호출 제한(SecurityError) — 이번 동기화만 건너뛴다.
      }
    }, 300);
    return () => window.clearTimeout(timer);
  }, [encodedConfig, estimate, pristineEncoded]);
```

- [ ] **Step 2: 수동 검증** — dev 서버(`npm run dev`)에서:
  - /customize?utm_source=test 진입 → 옵션 하나 변경 → URL이 `?utm_source=test&c=...`(utm 보존) 확인
  - 방금 바꾼 옵션을 되돌림 → ~300ms 후 `?c=` 사라지고 `?utm_source=test`만 남는지 확인

- [ ] **Step 3: e2e 스모크** — Run: `npx playwright test e2e/customize-configurator.spec.ts` (dev 서버 :3000 재사용) → Expected: PASS. `toHaveURL(/\?c=/)` 단언은 자동 재시도라 debounce 300ms에 영향 없음.

- [ ] **Step 4: 커밋**

```bash
git add components/customize/CustomizeConfigurator.tsx
git commit -m "fix(customize): URL 동기화 재작성 — 초기 복귀 시 stale ?c= 제거·utm 보존·Safari 제한 방어"
```

### Task 3: 제출 스냅샷 — submitted를 파생 상태로 (#11)

**Files:**
- Modify: `components/customize/CustomizeConfigurator.tsx` (70행 submitted state, 166-197행 handleSubmit, 239-253행 ReviewStep 호출)
- Modify: `components/customize/parts/ReviewStep.tsx` (props, 204-227행 확인 카드)

**Interfaces:**
- Produces: `type SubmittedSnapshot = { model: CustomizeModel; estimatedTotal: number; encodedConfig: string }` — ReviewStep prop `submittedSnapshot: SubmittedSnapshot | null`.

- [ ] **Step 1: Configurator 수정**
  - 70행 `const [submitted, setSubmitted] = useState(false);` →

```tsx
  // 제출 시점 견적 스냅샷. 구성이 스냅샷과 달라지면 submitted가 자동 해제된다(파생).
  const [submittedSnapshot, setSubmittedSnapshot] = useState<{ model: CustomizeModel; estimatedTotal: number; encodedConfig: string } | null>(null);
```

  - `CustomizeModel`을 types import에 추가.
  - `encodedConfig` 선언(Task 2) **아래**에 파생 값 추가:

```tsx
  const submitted = submittedSnapshot !== null && submittedSnapshot.encodedConfig === encodedConfig;
```

  - handleSubmit 성공 분기(181-183행) `setSubmitted(true);` → `if (estimate) setSubmittedSnapshot({ model: estimate.model, estimatedTotal: estimate.estimatedTotal, encodedConfig });`
  - ReviewStep 호출(247-248행): `submitted={submitted}` 유지, `onEditAfterSubmit={() => setSubmitted(false)}` → `onEditAfterSubmit={() => setSubmittedSnapshot(null)}`, prop 추가 `submittedSnapshot={submittedSnapshot}`.

- [ ] **Step 2: ReviewStep 수정**
  - props 타입에 `submittedSnapshot: { model: CustomizeModel; estimatedTotal: number; encodedConfig: string } | null;` 추가 (`CustomizeModel` import 추가).
  - 204행 분기 `submitted ?` → `submitted && submittedSnapshot ?`
  - 213행 `estimate.model` → `submittedSnapshot.model`, 217행 `estimate.estimatedTotal` → `submittedSnapshot.estimatedTotal`.

- [ ] **Step 3: 수동 검증** — 제출 성공 → '수정'으로 옵션 변경 → 검토 복귀 시 폼이 다시 열리고(파생 submitted=false) 재제출 가능한지 확인. 변경 없이 돌아오면 접수 카드 유지 확인.

- [ ] **Step 4: 게이트 + 커밋**

```bash
npm run lint && npm run test -- --run
git add components/customize
git commit -m "fix(customize): 제출 확인 카드를 제출 시점 스냅샷으로 렌더, 구성 변경 시 재제출 허용"
```

### Task 4: 새로고침 시 단계·진행도 복원 (#12)

**Files:**
- Modify: `components/customize/CustomizeConfigurator.tsx` (66-69행 근처 + handleStepSelect)

**Interfaces:**
- Consumes: Task 2의 `pristineEncoded`, `encodedConfig`.

- [ ] **Step 1: 저장 effect + 복원 effect 추가** — currentStep/furthestStepIndex 선언 아래에:

```tsx
  // 새로고침 시 보던 단계/진행도 복원용. 구성(c)이 다르면(다른 공유 링크 진입) 무시한다.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const raw = window.sessionStorage.getItem('customize-progress');
      if (!raw) return;
      const saved = JSON.parse(raw) as { step?: string; furthest?: number; c?: string | null };
      if ((saved.c ?? null) !== (initialConfig ?? null)) return;
      const savedIndex = STEPS.findIndex((s) => s.id === saved.step);
      if (savedIndex < 0) return;
      // 마운트 1회 외부 저장소 복원 — hydration 이후에만 실행해야 해서 effect가 맞다.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCurrentStep(STEPS[savedIndex].id);
      if (typeof saved.furthest === 'number') {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setFurthestStepIndex(Math.min(Math.max(saved.furthest, savedIndex), STEPS.length - 1));
      }
    } catch {
      // 저장값 파손 시 조용히 무시
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      window.sessionStorage.setItem(
        'customize-progress',
        JSON.stringify({
          step: currentStep,
          furthest: furthestStepIndex,
          c: encodedConfig === pristineEncoded ? null : encodedConfig,
        })
      );
    } catch {
      // 프라이빗 모드 등 저장 불가 시 무시
    }
  }, [currentStep, furthestStepIndex, encodedConfig, pristineEncoded]);
```

주의: eslint-disable 주석은 실제로 lint가 해당 룰로 실패할 때만 남긴다. `npm run lint`가 주석 없이 통과하면 주석을 제거한다(사용하지 않는 disable도 max-warnings=0에 걸린다).

- [ ] **Step 2: 수동 검증** — 4단계까지 진행 → 새로고침 → 4단계에서 이어지고 5단계(검토)는 미완료 표시인지 확인. 시크릿 창에서 ?c= 공유 링크 진입 → 기존처럼 1단계 + 전체 완료 표시 확인.

- [ ] **Step 3: 게이트 + 커밋**

```bash
npm run lint && npm run test -- --run
git add components/customize/CustomizeConfigurator.tsx
git commit -m "fix(customize): 새로고침 시 sessionStorage로 단계·진행도 복원"
```

### Task 5: geomFor clamp (#13)

**Files:**
- Modify: `components/customize/parts/FloorplanCanvas.tsx:25-28`
- Test: `components/customize/__tests__/FloorplanCanvas.test.tsx`

- [ ] **Step 1: 실패하는 테스트 추가** — FloorplanCanvas.test.tsx의 기존 geomFor 테스트 옆에:

```tsx
  it('9.8m 초과 모델은 좌측 여백 40px에서 clamp된다', () => {
    expect(geomFor(12)).toEqual({ x: 40, w: 790 });
  });
```

- [ ] **Step 2: 실패 확인** — Run: `npm run test -- --run FloorplanCanvas` → Expected: FAIL (`{ x: -178, w: 1008 }`)

- [ ] **Step 3: 구현** — 25-28행:

```tsx
const PLAN_MIN_LEFT = 40; // 관리자가 긴 모델을 추가해도 도면이 viewBox 밖으로 나가지 않게 하는 하한

export function geomFor(lengthM: number): PlanGeom {
  const w = Math.min(Math.round(lengthM * PLAN_SCALE), PLAN_RIGHT_EDGE - PLAN_MIN_LEFT);
  return { x: PLAN_RIGHT_EDGE - w, w };
}
```

- [ ] **Step 4: 통과 확인 + 기존 좌표 회귀 없음** — Run: `npm run test -- --run FloorplanCanvas` → Expected: PASS (6m→x326/w504, 9m→x74/w756 기존 테스트 포함 전부)

- [ ] **Step 5: 커밋**

```bash
git add components/customize
git commit -m "fix(customize): geomFor 좌측 여백 clamp — 9.8m 초과 모델 도면 잘림 방지"
```

---

## Wave 2 — 레이아웃·반응형

### Task 6: 한국어 break-keep 전면 적용 (#4)

**Files:**
- Modify: `components/customize/CustomizeConfigurator.tsx:228`, `components/customize/lib/helpers.ts:109` (buildQuoteHtml CSS)

- [ ] **Step 1: 루트에 break-keep** — 228행:

```tsx
    <div className="min-h-dvh break-keep bg-weet-paper text-weet-ink">
```

(두 모달 모두 이 div 내부에 렌더되므로 상속된다 — portal 아님.)

- [ ] **Step 2: 견적 인쇄 HTML** — helpers.ts 109행 body 규칙에 `word-break: keep-all;` 추가:

```
    body { font-family: -apple-system, BlinkMacSystemFont, "Noto Sans KR", sans-serif; color: #2f3432; background: #f8f4ec; word-break: keep-all; }
```

- [ ] **Step 3: 검증 + 커밋** — 390px에서 검토 단계 고지 박스·옵션 정보 모달을 열어 단어 중간 줄바꿈('상/담', '유/지관리')이 사라졌는지 확인 (최종 재캡처는 Task 19).

```bash
npm run lint && git add components/customize && git commit -m "fix(customize): 페이지 전체 break-keep — 한국어 단어 중간 줄바꿈 제거"
```

### Task 7: OptionCard — ⓘ 돌출 + 히트 영역 (#5, #7)

**Files:**
- Modify: `components/customize/parts/OptionCard.tsx:52, 94`

- [ ] **Step 1: 토글 버튼 min-w-0** — 52행:

```tsx
          'flex min-w-0 flex-1 items-center gap-2 rounded-lg py-2 pl-2.5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-weet-gold-deep',
```

- [ ] **Step 2: ⓘ 히트 영역 44px 확장(시각 22px 유지)** — 94행 className에 `relative before:absolute before:-inset-[11px] before:content-['']` 추가:

```tsx
          className="relative mr-1.5 flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-md text-customize-slate transition-colors before:absolute before:-inset-[11px] before:content-[''] hover:bg-customize-dune hover:text-customize-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-weet-gold-deep"
```

- [ ] **Step 3: 검증 + 커밋** — 390px 무드&소재 단계에서 'SPC 화이트오크' 카드 ⓘ가 테두리 안에 있고, ⓘ 주변 여백 탭으로 모달이 열리는지(토글되지 않는지) 확인.

```bash
npm run lint && git add components/customize/parts/OptionCard.tsx && git commit -m "fix(customize): 옵션 카드 min-w-0 truncate 정상화 + 인포 버튼 히트 영역 44px"
```

### Task 8: 모달 정비 — 모바일 확대 + 셸 통일 (#9, #10)

**Files:**
- Modify: `components/customize/parts/FloorplanZoomModal.tsx:57`, `components/customize/parts/OptionInfoModal.tsx:71, 86-88`

- [ ] **Step 1: 확대 모달 모바일 min-w** — FloorplanZoomModal 57행:

```tsx
                className="min-w-[720px] md:min-w-0"
```

(52행 래퍼의 `overflow-auto`가 모바일에서 실제로 동작해 가로 스크롤 확대가 된다.)

- [ ] **Step 2: OptionInfoModal 셸 통일** — 71행 backdrop:

```tsx
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-weet-ink/55 p-4 backdrop-blur-sm" onClick={onClose}>
```

86-88행 닫기 버튼(Button ghost icon-sm)을 FloorplanZoomModal과 동일 구조(패널 토큰만 customize)로 교체:

```tsx
          <button
            type="button"
            onClick={onClose}
            aria-label={copy.closeWord}
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-customize-taupe text-customize-ink transition-colors hover:bg-customize-dune focus:outline-none focus-visible:ring-2 focus-visible:ring-weet-gold-deep"
          >
            <X className="h-4 w-4" />
          </button>
```

`Button` import가 다른 곳에서 안 쓰이면 제거(미사용 import는 lint 실패).

- [ ] **Step 3: 검증 + 커밋** — 390px에서 '도면 크게 보기' → 도면이 인라인보다 크고 가로 스크롤되는지, 두 모달 backdrop 농도·블러·닫기 버튼이 동일한지, ESC/포커스 트랩(useModalDismiss) 정상인지 확인.

```bash
npm run lint && git add components/customize/parts && git commit -m "fix(customize): 확대 모달 모바일 min-w + 두 모달 셸(딤·블러·닫기) 통일"
```

### Task 9: 무보호 flex 행 + 모바일 aria-live (#22, #20)

**Files:**
- Modify: `components/customize/parts/FloorplanPreview.tsx:24-32`, `components/customize/CustomizeConfigurator.tsx:316-324`

- [ ] **Step 1: FloorplanPreview 헤더** — 24-32행:

```tsx
      <div className="mb-4 flex items-end justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-bold text-weet-muted">{copy.selectedModel}</p>
          <h1 className="text-2xl font-black text-weet-ink md:text-3xl">{pickText(model.nameKo, model.nameEn, language)}</h1>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-sm font-bold text-weet-muted">{copy.basePrice}</p>
          <p className="whitespace-nowrap text-lg font-black text-weet-gold-deep">{formatModelStartPrice(model.basePrice)}</p>
        </div>
      </div>
```

- [ ] **Step 2: 모바일 고정 바** — CustomizeConfigurator 316-324행의 `<div className="min-w-0">` 내부를 교체 (총액 p의 truncate 제거, 배지 줄바꿈 허용, aria-live 추가):

```tsx
            <div className="min-w-0">
              <p className="text-[11px] font-semibold text-weet-sub">{copy.estimatedAmount}</p>
              <p className="flex flex-wrap items-baseline gap-x-1.5 text-lg font-black text-weet-ink" aria-live="polite" aria-atomic="true">
                <span data-testid="mobile-estimated-total" className="whitespace-nowrap">{estimate ? formatWon(estimate.estimatedTotal) : '-'}</span>
                {estimate && estimate.consultOptionCount > 0 && (
                  <span className="whitespace-nowrap text-xs font-bold text-weet-gold-deep">{copy.consultBadge(estimate.consultOptionCount)}</span>
                )}
              </p>
              <p className="truncate text-[11px] text-weet-muted">{copy.transportSeparateShort} · {copy.finalQuoteShort}</p>
            </div>
```

- [ ] **Step 3: 검증 + 커밋** — 390px에서 '+ 상담 N건' 배지가 잘리지 않고(필요 시 다음 줄) 표시되는지 확인. `data-testid="mobile-estimated-total"` 보존 확인(e2e 사용).

```bash
npm run lint && npm run test -- --run && git add components/customize && git commit -m "fix(customize): 모바일 견적 바 배지 잘림 방지 + aria-live, 도면 헤더 가격 nowrap"
```

### Task 10: reduced-motion 헬퍼 + 스테퍼 자동 스크롤 (#25, #21)

**Files:**
- Modify: `components/customize/lib/helpers.ts` (헬퍼 추가), `components/customize/CustomizeConfigurator.tsx:154, 161`, `components/customize/parts/ReviewStep.tsx:299`, `components/customize/parts/StepperBar.tsx`

**Interfaces:**
- Produces: `scrollBehavior(): ScrollBehavior` (helpers.ts) — 4개 스크롤 호출부가 사용.

- [ ] **Step 1: 헬퍼 추가** — helpers.ts:

```ts
// OS '동작 줄이기' 설정 시 스크롤 애니메이션을 끈다.
export function scrollBehavior(): ScrollBehavior {
  if (typeof window === 'undefined') return 'auto';
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
}
```

- [ ] **Step 2: 적용** —
  - CustomizeConfigurator 154행: `window.scrollTo({ top: 0, behavior: scrollBehavior() });`
  - CustomizeConfigurator 161행: `scrollIntoView({ behavior: scrollBehavior(), block: 'start' });`
  - ReviewStep 299행: `target?.scrollIntoView({ behavior: scrollBehavior(), block: 'center' });` (helpers import 추가)

- [ ] **Step 3: 스테퍼 자동 스크롤** — StepperBar.tsx에 `useEffect, useRef` import, 컴포넌트에:

```tsx
  const activeButtonRef = useRef<HTMLButtonElement | null>(null);
  // 390px에서 스테퍼가 가로로 넘칠 때 현재 단계 버튼이 항상 보이게 한다(보이면 no-op).
  useEffect(() => {
    activeButtonRef.current?.scrollIntoView({ behavior: scrollBehavior(), inline: 'nearest', block: 'nearest' });
  }, [currentStep]);
```

버튼(35행)에 `ref={isCurrent ? activeButtonRef : null}` 추가, `scrollBehavior`를 helpers에서 import.

- [ ] **Step 4: 검증 + 커밋** — 390px에서 하단 CTA로 4단계까지 진행 시 스테퍼가 따라 스크롤되는지, macOS '동작 줄이기' 켜면 즉시 점프하는지 확인.

```bash
npm run lint && npm run test -- --run && git add components/customize && git commit -m "fix(customize): prefers-reduced-motion 존중 스크롤 + 스테퍼 현재 단계 자동 스크롤"
```

### Task 11: 로딩 스켈레톤 규격 일치 (#18)

**Files:**
- Modify: `app/customize/loading.tsx:56-58`

- [ ] **Step 1: 도면·요약 placeholder를 실제 규격으로** — 56행과 58행:

```tsx
            {/* 도면 미리보기 placeholder: 실제 FloorplanPreview(max-w-[1100px], viewBox 1000x460)와 동일 비율 */}
            <div className="aspect-[1000/460] w-full max-w-[1100px] animate-pulse rounded-lg border border-weet-line bg-weet-surface" />
            {/* 요약 보드 placeholder */}
            <div className="w-full max-w-[1100px] animate-pulse rounded-lg border border-weet-line bg-weet-surface p-5">
```

- [ ] **Step 2: 검증 + 커밋** — dev에서 홈 → /customize 전환 시 도면 영역 높이 점프가 없는지 확인.

```bash
npm run lint && git add app/customize/loading.tsx && git commit -m "fix(customize): 로딩 스켈레톤을 실제 도면 규격(1000/460·1100px·rounded-lg)에 일치"
```

---

## Wave 3 — 접근성·색 대비

### Task 12: 가격색 AA 보정 + PRICE_TONE 단일화 (#6)

**Files:**
- Modify: `components/customize/lib/constants.ts` (PRICE_TONE 신설), `components/customize/parts/OptionCard.tsx:9-14`, `components/customize/parts/OptionInfoModal.tsx:17-22`, `components/customize/parts/OptionsPanel.tsx:192`

- [ ] **Step 1: PRICE_TONE을 constants로 추출하며 '포함'만 #6b7280으로** — constants.ts의 `OPTION_SWATCH` 아래에 추가:

```ts
// 시안(B안) 가격색. 상담 #a16207 / 유료 #18181b 은 시안 그대로,
// 기본포함은 시안 #9ca3af가 대비 2.43:1(AA 미달)이라 사용자 승인 하에 #6b7280(4.6:1)으로 보정(2026-07-02).
export const PRICE_TONE: Record<'consult' | 'fixed' | 'included', string> = {
  consult: 'text-[#a16207]',
  fixed: 'text-[#18181b]',
  included: 'text-[#6b7280]',
};
```

- [ ] **Step 2: 두 소비처의 로컬 PRICE_TONE 삭제 후 import** — OptionCard.tsx 9-14행과 OptionInfoModal.tsx 17-22행의 로컬 `const PRICE_TONE`을 삭제하고 constants import에 `PRICE_TONE` 추가. (사용부 `PRICE_TONE[option.priceType]`는 그대로 동작 — priceType이 세 값 외면 타입 에러로 드러남.)

- [ ] **Step 3: slate 소형 텍스트 보정** — OptionsPanel.tsx 192행:

```tsx
          <span className="text-xs font-bold text-customize-ink/70">{copy.panelRailStepCount(stepIndex + 1, STEPS.length)}</span>
```

(OptionCard 94행의 `text-customize-slate`는 아이콘 색 + hover 진해짐이라 유지.)

- [ ] **Step 4: 대비 확인 + 커밋** — #6b7280 vs #fbfaf7(sand) = 4.63:1 ≥ 4.5 확인(https://webaim.org/resources/contrastchecker/ 또는 수식).

```bash
npm run lint && npm run test -- --run && git add components/customize && git commit -m "fix(customize): '포함' 가격색 AA 보정(#6b7280) + PRICE_TONE constants 단일화"
```

### Task 13: 모델 버튼 aria-pressed + 존 정렬 (#8, #15)

**Files:**
- Modify: `components/customize/parts/OptionsPanel.tsx:69-96`

- [ ] **Step 1: aria-pressed + 선택 상태 토큰을 OptionCard 패턴으로** — 모델 버튼(69-78행)을 교체:

```tsx
              <button
                key={model.id}
                type="button"
                onClick={() => onModelChange(model.id)}
                aria-pressed={model.id === modelId}
                className={cn(
                  'rounded-lg border p-3 text-left transition-[border-color,box-shadow] focus:outline-none focus-visible:ring-2 focus-visible:ring-weet-gold-deep',
                  model.id === modelId
                    ? 'border-customize-ink bg-customize-sand shadow-[0_0_0_1px_#2f3432]'
                    : 'border-customize-taupe bg-customize-sand hover:border-customize-mushroom'
                )}
              >
```

(내부 콘텐츠 90행 Check 아이콘·가격 gold 톤은 유지 — 헤어라인/선택 상태만 옵션 카드와 동일 체계로.)

- [ ] **Step 2: 시각 확인 + 커밋** — 데스크톱 레일과 390px 인라인에서 모델 카드 선택 상태가 옵션 카드와 같은 인상(잉크 보더+1px 섀도)인지 확인. VoiceOver 또는 접근성 트리에서 선택 모델이 pressed로 읽히는지 확인.

```bash
npm run lint && git add components/customize/parts/OptionsPanel.tsx && git commit -m "fix(customize): 모델 버튼 aria-pressed + 선택 상태를 옵션 카드 토큰 체계로 정렬"
```

---

## Wave 4 — 포커스 링·폼 일관성

### Task 14: 포커스 링 통일 + 폼 웜 토큰·invalid 표시 (#16, #17)

**Files:**
- Modify: `components/customize/parts/FloorplanPreview.tsx:46`, `components/customize/parts/FloorplanZoomModal.tsx:46`, `components/customize/lib/constants.ts:620-621`, `components/customize/parts/ReviewStep.tsx:411`

- [ ] **Step 1: focus: → focus-visible: 풀 오패시티** —
  - FloorplanPreview 46행: `focus:outline-none focus:ring-2 focus:ring-weet-gold-deep/40` → `focus:outline-none focus-visible:ring-2 focus-visible:ring-weet-gold-deep`
  - FloorplanZoomModal 46행: 동일 교체.

- [ ] **Step 2: 폼 컨트롤 토큰 + invalid** — constants.ts 620-621행:

```ts
export const inputClass = 'h-11 rounded-lg border-weet-line-2 bg-weet-surface text-sm focus-visible:ring-weet-gold-deep aria-[invalid=true]:border-customize-error aria-[invalid=true]:ring-1 aria-[invalid=true]:ring-customize-error/40';
export const selectClass = 'h-11 w-full rounded-lg border border-weet-line-2 bg-weet-surface px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-weet-gold-deep';
```

ReviewStep 411행 Textarea: `border-gray-300` → `border-weet-line-2`.

- [ ] **Step 3: 검증 + 커밋** — 검토 폼에서 빈 필수 필드로 제출 → 인풋 보더가 error 색으로 표시되는지(기존엔 메시지만), 마우스 클릭 시 도면 확대 버튼에 링이 남지 않는지, Tab 이동 시엔 풀 오패시티 링인지 확인.

```bash
npm run lint && npm run test -- --run && git add components/customize && git commit -m "fix(customize): 포커스 링 focus-visible 1종 통일 + 리뷰 폼 웜 토큰·invalid 시각 표시"
```

---

## Wave 5 — 구조·성능·문서

### Task 15: useIsDesktop 한 벌 마운트 (#24)

**Files:**
- Modify: `components/customize/lib/hooks.ts` (훅 추가), `components/customize/CustomizeConfigurator.tsx:270-307` (인라인/레일 분기)
- Modify: `e2e/customize-configurator.spec.ts` (필요 시 셀렉터 스코프)

**Interfaces:**
- Produces: `useIsDesktop(): boolean | null` — SSR/hydration 중 null(양쪽 렌더), mount 후 boolean(한 벌만).

- [ ] **Step 1: 훅 추가** — hooks.ts (useSyncExternalStore — effect 내 setState 없이 lint-clean):

```ts
import { useEffect, useSyncExternalStore } from 'react';

const DESKTOP_QUERY = '(min-width: 1024px)';

function subscribeDesktop(callback: () => void) {
  const mql = window.matchMedia(DESKTOP_QUERY);
  mql.addEventListener('change', callback);
  return () => mql.removeEventListener('change', callback);
}

// SSR/hydration 첫 렌더에서는 null(인라인+레일 양쪽 렌더 → 플래시 없음),
// mount 후 실제 뷰포트로 확정되어 한 벌만 남는다.
export function useIsDesktop(): boolean | null {
  return useSyncExternalStore(
    subscribeDesktop,
    () => window.matchMedia(DESKTOP_QUERY).matches as boolean | null,
    () => null
  );
}
```

(기존 `import { useEffect } from 'react';` 줄과 병합.)

- [ ] **Step 2: Configurator 분기** — `const isDesktop = useIsDesktop();`를 컴포넌트 상단(useLanguage 아래)에 추가하고, 270-307행의 두 마운트를 조건부로:

```tsx
          {/* 모바일/태블릿 인라인: 데스크톱으로 확정되면 마운트 해제(hydration 이후) */}
          {isDesktop !== true && (
            <div id="customize-options" className="scroll-mt-[150px] border-t border-weet-line bg-weet-surface md:scroll-mt-[162px] lg:hidden">
              <OptionsPanel ... inline />
            </div>
          )}

          {isDesktop !== false && (
            <aside data-testid="customize-desktop-rail" className="hidden shrink-0 border-l border-customize-stone bg-customize-sand lg:block lg:w-[430px]">
              <OptionsPanel ... />
            </aside>
          )}
```

(내부 props는 기존 그대로 — `...`는 기존 코드 유지 표시이며 실제 편집에서는 기존 JSX를 그대로 둔 채 래핑 조건만 추가한다.)

- [ ] **Step 3: e2e 중복 testid 스코프 확인** — Run: `grep -n "option-info-\|getByTestId" e2e/customize-configurator.spec.ts` — `.first()` 등 중복 전제 셀렉터가 있으면 mount 후 한 벌이 되므로 그대로 동작하지만, 실패하는 케이스가 있으면 `page.getByTestId('customize-desktop-rail').getByTestId(...)` 스코프로 수정.

- [ ] **Step 4: e2e 실행 + 커밋** — Run: `npx playwright test e2e/customize-configurator.spec.ts` → Expected: PASS (390px·데스크톱 프로젝트 모두)

```bash
npm run lint && git add components/customize e2e && git commit -m "fix(customize): OptionsPanel 이중 마운트 제거 — useIsDesktop 한 벌 마운트"
```

### Task 16: 카탈로그 캐시 (#3)

**Files:**
- Modify: `app/actions/customize-actions.ts:275-282, 716-719`, `app/customize/page.tsx:7`

- [ ] **Step 1: unstable_cache 래핑** — customize-actions.ts, `revalidatePath` import 옆에 `revalidateTag, unstable_cache` 추가. 275-282행:

```ts
// 공개 카탈로그는 관리자만 수정하는 준정적 데이터 — site-settings와 동일 패턴으로 캐시한다.
const fetchPublicCatalog = unstable_cache(
  async () => loadCatalog(supabase, false),
  ['customize-catalog'],
  { tags: ['customize-catalog'], revalidate: 300 }
);

export async function getPublicCustomizeCatalog() {
  try {
    return await fetchPublicCatalog();
  } catch (error) {
    console.error('Error loading public customize catalog:', error);
    return { models: [], categories: [], options: [], includedSpecs: [], conflicts: [] } satisfies CustomizeCatalog;
  }
}
```

주의: 이 파일이 `'use server'`라면 비-async export가 금지되므로 `fetchPublicCatalog`는 **export 없이** 모듈 로컬로 둔다. `supabase`는 cookie 비의존 anon 클라이언트(site-settings와 동일 조건)임.

- [ ] **Step 2: 무효화 연결** — 716-719행:

```ts
function revalidateCustomizePaths() {
  revalidatePath('/customize');
  revalidatePath('/admin/customize');
  revalidateTag('customize-catalog', 'max');
}
```

(빌드에서 `revalidateTag` 2-인자 시그니처 오류가 나면 Next 버전이 1-인자 — 그 경우 `revalidateTag('customize-catalog')`로.)

- [ ] **Step 3: force-dynamic 제거** — page.tsx 7행 `export const dynamic = 'force-dynamic';` 삭제 (searchParams await로 이미 dynamic).

- [ ] **Step 4: 검증** — `npm run build` → Expected: 오류 없음, /customize가 dynamic(ƒ)으로 표시. dev에서 관리자 카탈로그 수정 → /customize 새로고침 시 반영(최대 revalidate 지연 없이 태그 무효화로 즉시) 확인.

- [ ] **Step 5: 커밋**

```bash
git add app/actions/customize-actions.ts app/customize/page.tsx
git commit -m "perf(customize): 공개 카탈로그 unstable_cache(revalidate 300)+revalidateTag, force-dynamic 제거"
```

### Task 17: 데드 코드 삭제 + 실사용 라벨 테스트 (#14)

**Files:**
- Modify: `lib/customize/priceCalculator.ts` (20-24, 142-148, 196-199행 삭제), `components/customize/lib/constants.ts` (FALLBACK_CATALOG specs 제거), `lib/customize/__tests__/priceCalculator.test.ts:136-141`
- Test: `components/customize/__tests__/helpers.test.ts` (신규)

- [ ] **Step 1: 실사용 라벨 테스트 먼저 작성** — `components/customize/__tests__/helpers.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { buildQuoteHtml, optionPriceDisplay } from '../lib/helpers';
import type { CustomizeOption, EstimateBreakdown } from '@/lib/customize/types';

const opt = (over: Partial<CustomizeOption>): CustomizeOption => ({
  id: 'o1', key: 'o1', categoryId: 'c1', categoryKey: 'door', nameKo: '옵션', nameEn: null,
  shortDescriptionKo: null, shortDescriptionEn: null, detailDescriptionKo: null, detailDescriptionEn: null,
  priceType: 'fixed', price: 2200000, isDefault: false, availableModelIds: [], imagePath: null,
  displayOrder: 1, isActive: true, ...over,
} as CustomizeOption);
// 필드명이 types.ts와 다르면 실제 타입에 맞춰 조정(테스트 의도 유지).

describe('optionPriceDisplay (실사용 라벨)', () => {
  it('included → 기본 포함', () => expect(optionPriceDisplay(opt({ priceType: 'included', price: 0 }))).toBe('기본 포함'));
  it('consult → 상담 필요', () => expect(optionPriceDisplay(opt({ priceType: 'consult', price: 0 }))).toBe('상담 필요'));
  it('fixed → +₩2,200,000', () => expect(optionPriceDisplay(opt({}))).toBe('+₩2,200,000'));
});

describe('buildQuoteHtml', () => {
  it('기본가+옵션합계=총액이 문서에 일치 표기된다', () => {
    const estimate: EstimateBreakdown = {
      model: { id: 'm1', code: 'm1', nameKo: '모델', nameEn: null, widthM: 3, lengthM: 6, areaSqm: 18, basePrice: 27900000, imagePath: null, displayOrder: 1, isActive: true },
      selectedOptions: [opt({})],
      optionTotal: 2200000,
      estimatedTotal: 30100000,
      consultOptionCount: 0,
    } as EstimateBreakdown;
    const html = buildQuoteHtml(estimate, [opt({})], 'KO');
    expect(html).toContain('₩27,900,000');
    expect(html).toContain('+₩2,200,000');
    expect(html).toContain('₩30,100,000');
  });
});
```

Run: `npm run test -- --run helpers` → Expected: PASS (기존 코드가 이미 이 동작 — 회귀 방지망 확보)

- [ ] **Step 2: 죽은 라벨 테스트 교체** — priceCalculator.test.ts 136-141행의 `formatOptionPrice` describe 블록과 그 import를 삭제 (다른 formatWon 등 실사용 테스트는 유지).

- [ ] **Step 3: 데드 export 4개 삭제** — priceCalculator.ts에서 `formatOptionPrice`(20-24행), `floorplanSize`(142-148행), `calculateTotalPrice`(196-197행), `formatPrice`(199행) 삭제.

- [ ] **Step 4: FALLBACK_CATALOG specs 제거** —

```bash
sed -i '' -E 's/, specs: \[[^]]*\] \}/ }/g' components/customize/lib/constants.ts
```

타입도 `Record<string, { desc: string; specs: string[] }>` → `Record<string, { desc: string }>`.

- [ ] **Step 5: 전수 확인** — Run: `npx tsc --noEmit && npm run lint && npm run test -- --run` → Expected: 전부 PASS. `grep -rn "formatOptionPrice\|floorplanSize\|calculateTotalPrice\|formatPrice" --include="*.ts*" lib components app` → Expected: 0건.

- [ ] **Step 6: 커밋**

```bash
git add lib/customize components/customize
git commit -m "test(customize): 데드 export 4종·specs 삭제, 실사용 optionPriceDisplay·buildQuoteHtml 테스트로 교체"
```

### Task 18: 스펙 문서 현행화 (#23)

**Files:**
- Modify: `design_handoff_weet/CUSTOMIZE-SOLUTION-SPEC.md`

- [ ] **Step 1: 정본 주석 + 문구 수정** —
  - §1 카탈로그 표 바로 위에 추가:

```markdown
> **⚠️ 2026-07-02 현행화:** 아래 표의 가격·옵션 값은 초기 시안 더미값이다. **실제 정답은 Supabase `customize_*` 테이블(관리자 페이지에서 관리)이며, 시드는 `supabase/migrations/202606060002*`, 기대 동작은 `e2e/customize-configurator.spec.ts`가 정본이다.** 이 표를 근거로 코드·시드·테스트를 수정하지 말 것.
```

  - 37행 "스펙 칩 3개" 문구 → "이름·가격·설명" (구현은 칩 없이 문단 구성 — e2e가 칩 부재를 단언).
  - 53행 가격 표기 규칙을 현행으로: `(만원값 * 10000).toLocaleString() + '원'` → "₩ prefix — `formatWon` → \"₩28,000,000\" (2026-06-19 사용자 확정, 원 suffix 금지)".
  - §1 28행 모델 카드 "이미지+" 요구 문구에 "(구현은 이미지 없이 도면 SVG로 대체됨)" 부기.

- [ ] **Step 2: 커밋**

```bash
git add design_handoff_weet/CUSTOMIZE-SOLUTION-SPEC.md
git commit -m "docs(customize): 스펙 문서 현행화 — 정본은 Supabase 카탈로그·e2e임을 명시"
```

### Task 19: 최종 게이트 + 390px 재캡처 + 메모리 갱신

**Files:**
- Create: `.codex/qa/customize-fixes-2026-07-02/` (스크린샷)
- Modify: 메모리 `customize-solution-spec.md` (색 변경 반영)

- [ ] **Step 1: 전체 게이트** — Run:

```bash
npm run lint && npm run test -- --run && npx tsc --noEmit && npm run build && npx playwright test
```

Expected: 전부 PASS. (e2e는 :3000 dev 서버 재사용, /customize는 networkidle 불가 — 스펙 내 대기 로직 그대로.)

- [ ] **Step 2: 390px 재캡처(리뷰 증거와 1:1 대조)** — Playwright 스크립트(deviceScaleFactor 2, 390/834/1440)로 `.codex/qa/customize-fixes-2026-07-02/`에 저장:
  - 검토 단계 고지 박스(단어 분리 소멸), 무드 바닥재 카드(ⓘ 수납), 도면 확대 모달(확대+스크롤), 4단계 스테퍼(현재 단계 가시), 모바일 바(+상담 N건 유지)
  - 새로고침 시나리오: 4단계 → reload → 4단계 복원 + 5단계 미완료 표시 캡처

- [ ] **Step 3: 시나리오 재연** — 제출 → 수정 → 검토 복귀(폼 재개), ?c= 공유 링크 신규 진입(전체 완료 유지), 옵션 되돌림 → URL ?c= 제거.

- [ ] **Step 4: 메모리 갱신** — `~/.claude/.../memory/customize-solution-spec.md`의 intentional 색 목록에서 포함 색을 `#6b7280(AA 보정, 2026-07-02 사용자 승인; 시안 원값 #9ca3af)`로 수정. sanitizeConfig·세션 복원·카탈로그 캐시 도입 사실 1줄 추가.

- [ ] **Step 5: 커밋 + (사용자 확인 후) push** —

```bash
git add .codex/qa
git commit -m "test(customize): 리뷰 수정 24건 검증 스크린샷"
```

push(=Vercel 배포)는 사용자에게 확인 후 진행한다.

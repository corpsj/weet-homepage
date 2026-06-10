# GPT Pro Review Packet

Marker: `REVIEW_PACKET_ORDER_UI_ADMIN_20260610_V2`

## Review Request

Please review the current local working tree for concrete `MUST_FIX` issues only. Treat `OPTIONAL` suggestions as advisory. Focus on user-facing regressions, broken flows, accessibility/interaction bugs, and missing validation that could hide a real defect.

Return with the marker `REVIEW_PACKET_ORDER_UI_ADMIN_20260610_V2` and one of:

- `NO MUST_FIX`
- `MUST_FIX` findings with file/line references and exact fixes

## Active Task Brief

The user asked to improve the Weet website based on a report direction: solve lack of evidence and consultation paths, improve the order flow, move the header `주문하기` CTA to a better location, visually redesign the admin `주문 구성 관리` tab, reduce overly large order option cards, and remove the inconvenient mobile bottom drawer by referencing Tesla-style order UI.

The user explicitly required implementation through the already-open Claude app, not Claude CLI and not Antigravity. Claude app was instructed to perform only file edits and skip tests/lint/typecheck/build/dev server/Playwright/browser validation/git/GPT review. Codex performed all validation, QA, review packet creation, GPT Pro review, and feedback application orchestration.

## Current Progress / State

- Claude app implemented the public header/order UI, admin `주문 구성 관리`, docs, and E2E-file changes.
- Codex validated the first implementation and sent this packet as `REVIEW_PACKET_ORDER_UI_ADMIN_20260610_V1`.
- GPT-5.5 Pro returned one concrete `MUST_FIX`: admin `새 옵션` initialized `categoryId` from `catalog.categories[0]`, which could select the internal `model` category.
- Codex sent a code-only Claude app prompt for that `MUST_FIX`; Claude changed the initializer to first non-model category.
- Codex then found a local admin click/hydration symptom on the old port 3000 dev server. Claude app replaced Base UI Tabs in `CustomizeManager.tsx` with an explicit local controlled tablist and conditional panels.
- Codex reran validation and fresh production-server visual QA on port 3100. The old 3000 dev-server symptom did not reproduce there; tabs and buttons worked normally.

## Project Snapshot

- Framework: Next.js 16.2.7, React, TypeScript, Tailwind-style classes.
- Main changed surfaces:
  - Public header: `components/layout/Header.tsx`
  - Public order configurator: `components/customize/CustomizeConfigurator.tsx`
  - Admin order configuration manager: `components/admin/customize/CustomizeManager.tsx`
  - E2E assertions: `e2e/header-navigation.spec.ts`, `e2e/customize-configurator.spec.ts`
  - Workflow/harness docs: `AGENTS.md`, `codex-loop.md`, `.codex/current-task.md`, `.codex/chatgpt-procedure.md`, `agent-inbox/*`
  - `.gitignore`

## Git Status

```text
 M .codex/chatgpt-procedure.md
 M .codex/current-task.md
 M .gitignore
 M AGENTS.md
 M agent-inbox/안티그래비티의 작업범위.md
 M agent-inbox/컴퓨터유즈,웹제어.md
 M codex-loop.md
 M components/admin/customize/CustomizeManager.tsx
 M components/customize/CustomizeConfigurator.tsx
 M components/layout/Header.tsx
 M e2e/customize-configurator.spec.ts
 M e2e/header-navigation.spec.ts
```

## Changed Files / Diff Stat

```text
 .codex/chatgpt-procedure.md                        |   2 +
 .codex/current-task.md                             |  49 +--
 .gitignore                                         |   5 +
 AGENTS.md                                          |   4 +-
 agent-inbox/안티그래비티의 작업범위.md             |   4 +-
 agent-inbox/컴퓨터유즈,웹제어.md                   |   2 +
 codex-loop.md                                      |   6 +-
 components/admin/customize/CustomizeManager.tsx    | 448 ++++++++++++++++-----
 components/customize/CustomizeConfigurator.tsx     | 367 +++++++++--------
 components/layout/Header.tsx                       |  44 +-
 e2e/customize-configurator.spec.ts                 |  25 +-
 e2e/header-navigation.spec.ts                      |  14 +-
 12 files changed, 646 insertions(+), 324 deletions(-)
```

## Relevant Diff / File Excerpts

### Header CTA

```tsx
// components/layout/Header.tsx
<div className="xl:hidden absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-[60] flex items-center gap-2">
  <Link href="/customize" className="flex h-9 items-center justify-center whitespace-nowrap rounded-sm bg-[#FEBD16] px-3.5 text-[13px] font-bold text-[#2f3432] ...">
    {language === 'KO' ? '주문하기' : 'Order'}
  </Link>
  <button aria-label="Toggle mobile menu" ... />
</div>

<div className="hidden xl:flex absolute right-[64px] top-1/2 -translate-y-1/2 items-center gap-4">
  <div className="flex items-center gap-3 text-gray-400">...</div>
  <Link href="/customize" className="flex h-10 items-center justify-center rounded-sm bg-[#FEBD16] px-6 text-[14px] font-bold text-[#2f3432] ...">
    {language === 'KO' ? '주문하기' : 'Order'}
  </Link>
</div>
```

### Order Configurator

```tsx
// components/customize/CustomizeConfigurator.tsx
const handleStepSelect = (step: ConfigStep) => {
  setCurrentStep(step);
  // 모바일/태블릿 인라인 구성에서는 단계 전환 시 도면 아래 옵션 영역으로 바로 이동한다.
  if (typeof window !== 'undefined' && window.innerWidth < 1024) {
    document.getElementById('customize-options')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

<StepperBar currentStep={currentStep} setCurrentStep={handleStepSelect} stepCounts={stepCounts} />

{/* 모바일/태블릿: 드로어 없이 도면 아래에서 바로 이어지는 인라인 단계 구성 (Tesla 주문 흐름 참고) */}
<div id="customize-options" className="scroll-mt-[120px] border-t border-[#d8d0c3] bg-[#fbfaf7] md:scroll-mt-[132px] lg:hidden">
  <OptionsPanel ... inline />
</div>

<aside className="hidden shrink-0 border-l border-[#d8d0c3] bg-[#fbfaf7] lg:block lg:w-[400px] xl:w-[460px]">
  <OptionsPanel ... />
</aside>
```

```tsx
// components/customize/CustomizeConfigurator.tsx OptionCard
<button
  type="button"
  onClick={onToggle}
  className="flex min-h-[44px] w-full items-center gap-2.5 rounded-lg px-2.5 py-2 pr-9 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#b88b26]"
  aria-pressed={selected}
>
  <span className={cn('flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-colors', selected ? 'border-[#0d6e66] bg-[#0d6e66] text-white' : 'border-[#bcb2a3] bg-[#fbfaf7] group-hover:border-[#8a806f]')}>
    {selected && <Check className="h-3 w-3" />}
  </span>
  <div className="min-w-0 flex-1">
    <div className="flex items-center justify-between gap-2">
      <span className="truncate text-sm font-bold text-[#2f3432]">{option.nameKo}</span>
      ...
    </div>
    {option.shortDescriptionKo && (
      <span className="mt-0.5 block truncate text-[11px] text-[#8a806f]">{option.shortDescriptionKo}</span>
    )}
  </div>
</button>
```

### Admin Manager

```tsx
// components/admin/customize/CustomizeManager.tsx
type CustomizeTab = 'models' | 'included' | 'categories' | 'options' | 'assets';

// Base UI Tabs가 이 화면에서 탭 전환(aria-selected)을 반영하지 못해 로컬 제어형 탭으로 대체한다.
const TAB_ITEMS: { value: CustomizeTab; label: string; Icon: LucideIcon }[] = [
  { value: 'models', label: '모델', Icon: Boxes },
  { value: 'included', label: '기본 포함 사양', Icon: PackageCheck },
  { value: 'categories', label: '카테고리', Icon: FolderTree },
  { value: 'options', label: '옵션', Icon: SlidersHorizontal },
  { value: 'assets', label: '이미지 자산', Icon: ImageIcon },
];

const [activeTab, setActiveTab] = useState<CustomizeTab>('models');

<div role="tablist" aria-label="주문 구성 관리 탭" className="inline-flex min-w-max items-center rounded-lg border border-[#e5e5df] bg-[#f4f4f1] p-[3px]">
  {TAB_ITEMS.map(({ value, label, Icon }) => {
    const selected = activeTab === value;
    const count = tabCounts[value];
    return (
      <button
        key={value}
        type="button"
        role="tab"
        id={`customize-tab-${value}`}
        aria-selected={selected}
        aria-controls={`customize-panel-${value}`}
        onClick={() => setActiveTab(value)}
        className={cn('inline-flex h-8 items-center gap-1.5 whitespace-nowrap rounded-md px-3 text-sm font-medium transition-colors ...', selected ? 'bg-white text-[#111111] shadow-sm' : 'text-gray-500 hover:text-[#111111]')}
      >
        <Icon className="size-3.5" />
        {label}
        {count !== null && <TabCount value={count} />}
      </button>
    );
  })}
</div>

{activeTab === 'options' && (
  <div role="tabpanel" id="customize-panel-options" aria-labelledby="customize-tab-options">
    <AdminSection
      title="옵션"
      description="카테고리별 옵션의 가격, 기본 선택, 모델 노출과 충돌 관계를 관리합니다."
      action={
        <button
          className={consoleSecondaryButtonClass}
          onClick={() => {
            setOptionForm({ ...emptyOption, categoryId: catalog.categories.find((category) => category.key !== 'model')?.id || '' });
            setEditingOptionId(undefined);
          }}
        >
          <Plus className="h-4 w-4" /> 새 옵션
        </button>
      }
    >
      <div className="grid gap-6 xl:grid-cols-[460px_1fr]">...</div>
    </AdminSection>
  </div>
)}
```

## Test / Validation Output

```text
git diff --check -- . ':(exclude)test-results'
PASS
```

```text
npm run lint
> eslint . --max-warnings=0
PASS
```

```text
npx tsc --noEmit
PASS
```

```text
npm test
Test Files  3 passed (3)
Tests       20 passed (20)
PASS
```

```text
npm run build
PASS exit 0
Notes:
- Next.js warning: middleware file convention is deprecated in favor of proxy.
- Existing dynamic server usage warning during static generation of `/` because cookies are used; build still completed and marked `/` dynamic.
```

```text
npx playwright test e2e/header-navigation.spec.ts e2e/customize-configurator.spec.ts --project=chromium
13 passed
```

## Browser / Visual QA Findings

Screenshots and summary JSON:

- `.codex/qa/order-ui-admin-20260610-final/fresh-3100/home-desktop-header.png`
- `.codex/qa/order-ui-admin-20260610-final/fresh-3100/home-mobile-header.png`
- `.codex/qa/order-ui-admin-20260610-final/fresh-3100/customize-desktop-options.png`
- `.codex/qa/order-ui-admin-20260610-final/fresh-3100/customize-mobile-inline-options.png`
- `.codex/qa/order-ui-admin-20260610-final/fresh-3100/customize-mobile-smart-options.png`
- `.codex/qa/order-ui-admin-20260610-final/fresh-3100/admin-desktop-options-new.png`
- `.codex/qa/order-ui-admin-20260610-final/fresh-3100/admin-mobile-options.png`
- `.codex/qa/order-ui-admin-20260610-final/fresh-3100/summary.json`

Fresh production-server QA used `npm run start -- --port 3100` from the latest build output:

- Header desktop/mobile: `주문하기` CTA is visible, no horizontal overflow.
- Order configurator desktop: option rail is compact; floorplan remains the primary area; no drawer button/dialog; no horizontal overflow.
- Order configurator mobile: options are inline below the floorplan; fixed bottom bar contains only total/quote CTA; no `옵션 구성` drawer button; no dialog; no horizontal overflow.
- Admin desktop: `옵션30` tab selects correctly, `customize-panel-options` is visible, model panel hidden, `새 옵션` defaults to `외장`, and the category select contains no `model` option.
- Admin mobile: overview cards and horizontal tabs render without horizontal page overflow; `옵션30` can be selected.
- Browser page errors: none. Local-only Vercel analytics script 404/MIME errors appeared under `next start` because `/_vercel/insights/script.js` is not served locally; ignored as unrelated to the UI changes.

## Current Failures / Risks

- No current validation failure.
- Existing old port 3000 dev server showed stale/non-clicking admin client behavior, but fresh `next start` on port 3100 worked correctly. This is recorded because browser workflow failures should not be hidden.
- Pre-existing diagnostics still exist outside the requested slice: lucide `Instagram` deprecation and `document.write` use in quote popup were observed earlier and left unchanged.
- Build warning about deprecated Next `middleware` convention remains pre-existing.
- Admin mobile tablist is horizontally scrollable by design; visual QA showed no page overflow.

## Exact Review Questions

1. Is there any `MUST_FIX` regression in header CTA placement, accessible names, or responsive layout?
2. Is the order configurator change safe after removing the mobile bottom drawer, especially with inline options plus fixed bottom quote bar?
3. Are the denser option cards still accessible and not too cramped?
4. Does the admin `주문 구성 관리` redesign introduce any data-management bug, tab interaction bug, or admin workflow regression?
5. Does the manual controlled tablist need any concrete keyboard/a11y fix before shipping, or is the current click/ARIA behavior acceptable for this admin screen?
6. Are the tests/visual QA sufficient for this change, or is there a concrete missing test that should be `MUST_FIX` before shipping?

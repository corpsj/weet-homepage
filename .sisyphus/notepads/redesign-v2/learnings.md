# redesign-v2 Notepad — Learnings

## Project Context
- **Worktree**: /Users/zoopark-studio/Documents/dev/weet-homepage
- **Branch**: redesign (already checked out)
- **Framework**: Next.js ^16.0.7, React 19, Tailwind v3 (3.4.1), framer-motion ^11.15.0
- **Package Manager**: npm
- **Build cmd**: npm run build (Turbopack)
- **Test cmd**: npx vitest run

## Critical Technical Rules
- shadcn@2.3.0 ONLY — NOT @latest (targets Tailwind v4, breaks project)
- CSS variables: HSL format (NOT OKLCH) — Tailwind v3 requirement
- tailwindcss-animate plugin required for shadcn animations
- NO motion/react import — use framer-motion

## Color Palette (HSL)
- --accent / --primary: 46 100% 52.5% (#FFCA0D — yellow)
- --foreground / dark: 60 5.3% 17.1% (#2D2D2A)
- --background: 0 0% 98% (#FAFAFA)

## File Safety (DO NOT DELETE)
- lib/constants.ts, lib/supabase.ts, lib/products.ts, lib/kakao.ts
- lib/easter-eggs.ts, lib/tracking-realtime.ts, lib/a11y.ts, lib/utils.ts
- types/supabase.ts, app/actions/
- components/providers/KakaoProvider.tsx
- app/admin/, components/admin/

## Files to Delete in T1
- app/(redesign)/ — all 13 subdirectories + layout.tsx
- components/sections/FullscreenHero.tsx, ModelComparison.tsx, TrustBadges.tsx
- components/sections/BeforeAfterStories.tsx, ScrollStorySection.tsx
- components/ui/ScrollReveal.tsx, CountUp.tsx, ConsultationModal.tsx
- lib/design-tokens.ts, lib/animations.ts, lib/scroll-storytelling.ts, lib/witty-copy.ts

## Server Actions for Forms
- app/actions/submit-inquiry.ts → submitInquiry(prevState, formData) — USE THIS for public forms
- app/actions/inquiry-actions.ts → admin-only (getInquiries, etc.) — do NOT use for public

## Pre-existing LSP Errors (ignore, from old V1 code)
- app/layout.tsx:152 dangerouslySetInnerHTML — pre-existing
- components/layout/Header.tsx — multiple pre-existing errors
- app/globals.css — Tailwind syntax warnings (CSS linter false positives)

## [2026-03-07 12:55] T1: shadcn@2.3.0 init complete
- ✓ app/(redesign)/ directory deleted (all V1 files removed)
- ✓ V1-specific components deleted: FullscreenHero, ModelComparison, TrustBadges, BeforeAfterStories, ScrollStorySection, ScrollReveal, CountUp, ConsultationModal
- ✓ V1-specific lib files deleted: design-tokens.ts, animations.ts, scroll-storytelling.ts, witty-copy.ts
- ✓ components.json created with correct aliases (@/components, @/lib/utils)
- ✓ lib/utils.ts has cn() function (clsx + tailwind-merge)
- ✓ shadcn@2.3.0 initialized (NOT @latest — critical for Tailwind v3 compatibility)
- ✓ tailwindcss-animate and class-variance-authority already in package.json
- ✓ npm run build PASSES (no errors)

### Fixes applied during cleanup:
- HeaderV2.tsx: Removed design-tokens import, replaced zIndex.header (100) and zIndex.mobileMenu (200) with hardcoded values
- AIChatbot.tsx: Removed design-tokens import, replaced zIndex.chatbot (500) with hardcoded value
- PageTransition.tsx: Removed design-tokens import, replaced motionConfig.duration.normal (0.4) with hardcoded value
- FloatingKakaoCTA.tsx: Removed ConsultationModal import, simplified to Kakao-only flow
- SectionLoading.tsx: Removed witty-copy import, inlined loadingStates array

### Build status: ✓ PASS
- Turbopack compilation: 3.4s
- TypeScript check: PASS
- No LSP errors in modified files

## [2026-03-07 T2] Design tokens & Tailwind config complete
- ✓ tailwind.config.ts: Added destructive-foreground color (was missing)
- ✓ tailwind.config.ts: darkMode: 'class' already present (line 4)
- ✓ tailwind.config.ts: tailwindcss-animate plugin already in plugins array (line 154)
- ✓ tailwind.config.ts: All shadcn HSL CSS variable colors configured (background, foreground, card, popover, secondary, muted, accent, destructive, border, input, ring, chart, sidebar)
- ✓ tailwind.config.ts: Backward compatibility preserved (primary.DEFAULT, primary.dark, gray scale, custom spacing, animations, keyframes, borderRadius all intact)
- ✓ lib/design-tokens.ts: Created with COLORS, TYPOGRAPHY, SPACING, Z_INDEX constants
- ✓ npm run build: PASS (3.5s, no errors)

### Design tokens structure:
- COLORS: accent (#FFCA0D), primary (#2D2D2A), background (#FAFAFA) with hex + HSL values
- TYPOGRAPHY: display, h1-h3, bodyLg, caption with Tailwind class strings
- SPACING: sectionPaddingY, containerMaxWidth, cardGap with responsive Tailwind classes
- Z_INDEX: header (50), overlay (150), modal (100), toast (200), floatingBtn (40)

## [2026-03-07 T3] globals.css updated with shadcn HSL variables
- ✓ Replaced oklch color system with HSL variables (shadcn default style)
- ✓ :root has all 19 shadcn HSL variables: background, foreground, card, popover, primary, secondary, muted, accent, destructive, border, input, ring, radius
- ✓ .dark class has inverted color variables for dark mode support
- ✓ Korean typography optimization: word-break: keep-all, overflow-wrap: break-word, line-height: 1.8
- ✓ @layer base: * { @apply border-border; }, html { scroll-behavior: smooth; }, body { @apply bg-background text-foreground; }
- ✓ Typography utility classes added: .text-display, .text-h1, .text-h2, .text-h3, .text-body-lg, .text-caption
- ✓ Layout utilities added: .section-padding, .container-base
- ✓ Preserved existing utilities: .text-balance, .animate-fade-in, .hide-scrollbar, .custom-scrollbar
- ✓ Preserved @tailwind directives and old weet custom variables for backward compatibility
- ✓ npm run build: PASS (3.4s, no errors, all 24 pages generated)

### Color values (HSL):
- Primary/Accent: 46 100% 52.5% (#FFCA0D — yellow)
- Foreground/Dark: 60 5.3% 17.1% (#2D2D2A)
- Background: 0 0% 98% (#FAFAFA)
- Secondary: 0 0% 96.1% (light gray)
- Muted: 0 0% 93% (lighter gray)
- Destructive: 0 84.2% 60.2% (red)

## [2026-03-07 13:00] T5: Types + Navigation + Constants
- ✓ lib/types.ts: SizeCategory (S|M|L|XL), PurposeCategory (4 types), PURPOSE_TO_SIZE_MAP, PURPOSE_LABELS, SIZE_LABELS, NavItem, PageMeta
- ✓ lib/navigation.ts: V2_NAV_ITEMS (8 items: 홈, 시스템건축, 제품, 시공사례, 비스포크, 솔루션, 회사소개, 고객지원)
- ✓ lib/constants.ts: BRAND_V2 appended (COMPANY unchanged, 15 lines → 25 lines)
- ✓ Build: PASS (Turbopack 3.4s, TypeScript check PASS)
- ✓ LSP: No errors in new files
- ✓ Protected files: types/supabase.ts, lib/products.ts unchanged

## [2026-03-07 T4] shadcn components installed (16 total)
- ✓ shadcn@2.3.0 add command executed with --overwrite flag
- ✓ React 19 compatibility: Selected "Use --force" for npm peer dependency resolution
- ✓ All 16 components installed successfully:
  1. button.tsx — CVA-based button with variants (default, destructive, outline, secondary, ghost, link)
  2. card.tsx — Card wrapper with header, footer, title, description
  3. dialog.tsx — Radix Dialog with overlay and content
  4. accordion.tsx — Radix Accordion with item, trigger, content
  5. sheet.tsx — Radix Dialog variant for side drawers (mobile nav, chatbot)
  6. form.tsx — React Hook Form integration with field, label, message components
  7. input.tsx — Styled input with focus ring and border
  8. textarea.tsx — Styled textarea with focus ring
  9. select.tsx — Radix Select with trigger, content, item, group
  10. navigation-menu.tsx — Radix NavigationMenu for desktop header nav
  11. carousel.tsx — Swiper-based carousel with prev/next buttons
  12. badge.tsx — Badge with variants (default, secondary, destructive, outline)
  13. separator.tsx — Radix Separator for visual dividers
  14. tabs.tsx — Radix Tabs with list, trigger, content
  15. skeleton.tsx — Skeleton loader placeholder
  16. sonner.tsx — Toast notification wrapper (Toaster component)
- ✓ All components use CSS variables via Tailwind classes (bg-primary, text-primary-foreground, etc.)
- ✓ All components import cn() from @/lib/utils (16/16 verified)
- ✓ npm run build: PASS (3.4s, Turbopack, all 24 pages generated, no errors)

### Installation notes:
- shadcn@2.3.0 (NOT @latest) — critical for Tailwind v3 compatibility
- Used --overwrite flag to replace pre-existing card.tsx and button.tsx from T1
- React 19 peer dependency resolved with "Use --force" option
- No custom components overwritten (AIChatbot.tsx, FloatingKakaoCTA.tsx, etc. preserved)
- label.tsx auto-installed as dependency of form.tsx (17 files total in components/ui/)

### Build verification:
- TypeScript: PASS
- Turbopack compilation: 3.4s
- Static page generation: 24/24 pages
- No LSP errors in new component files

## [2026-03-07] T7: KakaoTalk provider verified
- **KakaoProvider.tsx**: EXISTS ✓ — Context-based provider with useKakao hook, proper SDK initialization with error handling
- **lib/kakao.ts**: EXISTS ✓ — Three utility functions: isKakaoReady(), openKakaoChannel(), shareToKakao() with graceful fallbacks
- **Integration**: Properly imported and used in app/layout.tsx
- **TypeScript**: No errors in either file
- **Build**: TypeScript compilation passed; Next.js infrastructure issue unrelated to Kakao files

## [2026-03-07 T6] Animation system created
- ✓ lib/animations.ts: 8 animation presets exported (fadeUp, fadeIn, slideInLeft, slideInRight, scaleIn, staggerContainer, staggerItem, pageTransition)
- ✓ components/ui/ScrollReveal.tsx: whileInView animation with 5 directions (up/down/left/right/none), supports delay/duration/className/once props
- ✓ components/ui/PageTransition.tsx: AnimatePresence + motion.div with route transition animation, uses pageTransition preset
- ✓ Reduced motion: implemented via useReducedMotion() hook in both components (graceful fallback to no animation)
- ✓ LSP diagnostics: ZERO errors in all 3 new files
- ✓ framer-motion: ^11.15.0 already in package.json (no install needed)
- ✓ Build: TypeScript check passes (pre-existing test errors unrelated to animation system)

### Animation presets details:
- fadeUp: opacity 0→1, y 30→0, 0.6s cubic-bezier
- fadeIn: opacity 0→1, 0.5s easeOut
- slideInLeft: opacity 0→1, x -40→0, 0.6s cubic-bezier
- slideInRight: opacity 0→1, x 40→0, 0.6s cubic-bezier
- scaleIn: opacity 0→1, scale 0.92→1, 0.5s cubic-bezier
- staggerContainer: staggerChildren 0.1s, delayChildren 0.1s
- staggerItem: opacity 0→1, y 20→0, 0.5s easeOut
- pageTransition: hidden (opacity 0, y 10), visible (opacity 1, y 0, 0.35s), exit (opacity 0, y -10, 0.25s)

### ScrollReveal component:
- Props: children, direction (default 'up'), delay, duration, className, once (default true)
- Uses whileInView with viewport={{ once, amount: 0.2 }}
- Respects prefers-reduced-motion (falls back to fadeIn)

### PageTransition component:
- Props: children, className
- Wraps with AnimatePresence mode="wait"
- Uses pageTransition variants for smooth route transitions
- Respects prefers-reduced-motion (renders plain div)

## [2026-03-07] T10: Redesign layout created

- Created `app/(redesign)/layout.tsx` with HeaderV2 + FooterV2 + PageTransition + KakaoProvider + Toaster
- Route group `(redesign)` ensures layout only applies to pages inside `app/(redesign)/`
- Metadata: title "weet:) | 시스템건축", description "시스템건축의 새로운 기준 — 이동식주택과 현장건축 전문 기업 위트"
- Main element has `pt-20` for header offset
- Includes FloatingKakaoCTA and AIChatbot components
- Build passes with zero errors
- All component exports verified: HeaderV2, FooterV2, PageTransition, KakaoProvider, Toaster, FloatingKakaoCTA, AIChatbot

## [2026-03-07] T15: Products page created
- Created `app/(redesign)/products-v2/page.tsx` with metadata title `이동식주택 제품 | weet:)` and server/client split to keep Next.js metadata support while using client tabs.
- Added dual navigation UI in `app/(redesign)/products-v2/products-v2-client.tsx` using shadcn Tabs (`용도별 보기`, `사이즈별 보기`) with mobile horizontal scroll.
- Implemented purpose cards for 4 categories using `PurposeCategory`, `PURPOSE_TO_SIZE_MAP`, `PURPOSE_LABELS`, and commercial category routing to `/bespoke-v2`.
- Implemented size cards for S/M/L/XL with fixed dimensions, 면적, 추천 용도, and 총 가격 only (no 월납입/할부/리스 text).
- Added dark `체류형 쉼터` section (`#2D2D2A`) with 상담 CTA to `/support-v2`, plus final CTA section `견적 받기` to `/bespoke-v2`.
- Verification: LSP diagnostics clean on both new files and `npm run build` passed with `/products-v2` generated successfully.

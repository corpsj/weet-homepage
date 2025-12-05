# Weet Homepage Debug Checklist

This checklist covers key areas of the Weet homepage to ensuring stability, functionality, and visual quality.

## 1. Core Navigation & Layout
- [ ] **Header:**
  - [ ] Logo links to home.
  - [ ] Desktop menu links work and active states are correct.
  - [ ] Dropdown menus (if any, e.g., Solutions) open/close correctly.
  - [ ] "Contact" or CTA buttons function properly.
- [ ] **Mobile Menu:**
  - [ ] Hamburger icon toggles menu.
  - [ ] Menu closes when a link is clicked.
  - [ ] Layout looks correct on various screen sizes.
- [ ] **Footer:**
  - [ ] All links (Policy, Terms, Socials) are valid.
  - [ ] Copyright year is current.

## 2. Pages Verification
### Public Pages
- [ ] **Home (`/`):**
  - [ ] Hero section loads images correctly (check for "Xbox" or broken text).
  - [ ] Hero carousel auto-plays and slides smoothly.
  - [ ] Featured products/solutions data loads from Supabase.
- [ ] **Company (`/company`):**
  - [ ] Check "Weet Crew" image loading.
  - [ ] Verify "주식회사 위트" text styling (yellow underline/overlap).
  - [ ] Partners banner logos display correctly.
- [ ] **Solution (`/solution/*`):**
  - [ ] Check sub-pages (`design`, `iot`, etc.).
  - [ ] Verify image optimizations (sizes, priority) in `SolutionTemplate`.
  - [ ] Ensure no Layout Shift (CLS) on load.

### Product & Service Pages
- [ ] **Product Listing:**
  - [ ] "3x6" product names display updated material info (Stucco, Zinc, etc.).
  - [ ] Images load lazily where appropriate.
- [ ] **Product Detail (Dynamic Routes):**
  - [ ] Correct product info loads based on ID/Slug.
  - [ ] "Back to list" navigation works.

### Admin & Protected Routes
- [ ] **Login (`/admin/login`?):**
  - [ ] Valid credentials redirect to Dashboard.
  - [ ] Invalid credentials show error message.
- [ ] **Dashboard:**
  - [ ] Product management (Add/Edit/Delete) works.
  - [ ] CMS content updates reflect on public site.
  - [ ] Inquiry/Support form submissions appear here.
- [ ] **Session Handling:**
  - [ ] Redirect to login if accessing admin pages without session.
  - [ ] Logout functions correctly.

## 3. Functionality & Logic
- [ ] **Forms (Support/Inquiry):**
  - [ ] Validation prevents empty submissions.
  - [ ] Success message/Toast appears on valid submission.
  - [ ] Error handling for API failures.
- [ ] **Server Actions:**
  - [ ] Verify data mutation actions (e.g., updating product names) work.
  - [ ] Check console for `server-side` errors during actions.

## 4. Visual & Performance
- [ ] **Images:**
  - [ ] Check for `404` on any dynamic image URLs.
  - [ ] Verify `next/image` attributes (`sizes`, `priority`) are used effectively.
- [ ] **Console Logs:**
  - [ ] Open DevTools and check for RED errors (Key props, Hydration mismatches).
  - [ ] Check for "Failed to fetch" errors.
- [ ] **Responsiveness:**
  - [ ] Test on Mobile (< 768px).
  - [ ] Test on Tablet (768px - 1024px).
  - [ ] Test on Desktop (> 1024px).

## 5. Specific Recent Fixes (Regression Testing)
- [ ] **Hero Carousel:** Confirm import error `HeroCarouselClient` is gone.
- [ ] **Image Saving:** Confirm editing images doesn't throw `fetch` errors.
- [ ] **Product Renaming:** Verify 3x6 products have correct material names in DB and UI.

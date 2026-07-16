# Sprint 2 — Task 04: Featured Menu Architecture

**Author:** Principal Frontend Architect
**Status:** Draft — Awaiting Tech Lead Approval
**Date:** 2026-07-15
**Context:** Third customer-facing section of the landing page, following Hero and Navigation.

---

## 1. Business Goal

Convert the user's emotional curiosity (established by the Hero) into culinary desire by presenting a curated selection of signature dishes. The Featured Menu is the first concrete proof of the restaurant's food quality.

Specific metrics:
- Increase click-through to the full Menu page (`/menu`) by 30% of landing page visitors.
- Increase average session duration by +15 seconds (users pause to read dish descriptions).
- Drive at least one dish name recall ("I remember the octopus dish") in post-visit surveys.

## 2. UX Objective

Create a quiet, confident presentation of food that feels like paging through a bound restaurant menu — not a generic gallery grid.

The user should feel:
- **Curated:** Only 4–6 dishes shown. Not overwhelming.
- **Hungry:** Photography is the hero. Text supports, never competes.
- **Informed:** Key details (dietary, spice, chef's choice) are glanceable.
- **Trusting:** The presentation signals Michelin-level attention to detail.

The emotional tone is: *"This is what you will remember eating."*

## 3. Visual Hierarchy

Each dish card follows a strict visual priority:

```
1. Image                   (largest element, first fixation)
2. Dish Name               (Playfair Display, bold)
3. Short Description       (Inter, body-sm, secondary color)
4. Price                   (Inter, medium weight, gold accent)
5. Badges                  (dietary / chef's special / popular)
6. CTA                     ("View in Menu" link, subtle)
```

The eye path is vertical within each card: top (image) → center (name + description) → bottom (price + CTA).

Across the section:
1. Section heading ("Featured Dishes" or similar) — display-2
2. Subheading / curator note — body-base, secondary color
3. Dish grid — 3 columns desktop, 2 tablet, 1 mobile
4. "View Full Menu" CTA — centered below the grid

## 4. Layout Architecture

### Section container

Uses the existing `section` class (`padding-block: var(--garcia-spacing-16)` on desktop, `--spacing-8` on mobile) with `content-wrapper` (`max-width: 80rem`).

### Grid system

The dish grid uses `display: grid` with:

```css
.grid-auto-fill {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(var(--grid-min, 20rem), 1fr));
  gap: var(--garcia-spacing-8);
}
```

Desktop (≥80rem): 3 columns — `--grid-min: 22rem`
Tablet (≥48rem): 2 columns — `--grid-min: 18rem`
Mobile (<48rem): 1 column — single card full-width with max-width constraint

### Vertical rhythm

- Section heading → `margin-bottom: var(--garcia-spacing-3)`
- Subheading → `margin-bottom: var(--garcia-spacing-10)`
- Between cards: `gap: var(--garcia-spacing-8)` (desktop), `--spacing-6` (mobile)
- Bottom CTA → `margin-top: var(--garcia-spacing-12)`

### Background

- Section background: `var(--garcia-surface-secondary)` (subtle off-white) or `var(--garcia-color-ivory)` for warmth
- Card background: `var(--garcia-surface-primary)` (pure white)
- The slight contrast between section bg and card bg creates depth without shadows

## 5. Desktop Layout (≥80rem)

```
┌─────────────────────────────────────────────────────────────┐
│  ╔═══════════════════════════════════════════════════════╗  │
│  ║  Featured Dishes                       [overline]    ║  │
│  ║  A carefully curated selection from our kitchen.     ║  │
│  ╚═══════════════════════════════════════════════════════╝  │
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ ◄── Image ──► │  │ ◄── Image ──► │  │ ◄── Image ──► │      │
│  │ Name          │  │ Name          │  │ Name          │      │
│  │ Description   │  │ Description   │  │ Description   │      │
│  │ $32 · badges  │  │ $28 · badges  │  │ $45 · badges  │      │
│  │ [View]        │  │ [View]        │  │ [View]        │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                             │
│              [ View Full Menu → ]                          │
└─────────────────────────────────────────────────────────────┘
```

- Max 6 dishes (2 rows × 3 columns)
- Content max-width: 80rem (`content-wrapper-lg`)
- Cards have subtle border or no border (rely on bg contrast)

## 6. Tablet Layout (≥48rem)

```
┌───────────────────────────────────────────────┐
│  Featured Dishes                               │
│  A carefully curated selection...              │
│                                                │
│  ┌──────────────┐  ┌──────────────┐            │
│  │ ◄── Image ──►│  │ ◄── Image ──►│            │
│  │ Name         │  │ Name         │            │
│  │ Description  │  │ Description  │            │
│  │ $32 · badges │  │ $28 · badges │            │
│  └──────────────┘  └──────────────┘            │
│  ┌──────────────┐  ┌──────────────┐            │
│  │ ◄── Image ──►│  │ ◄── Image ──►│            │
│  │ ...          │  │ ...          │            │
│  └──────────────┘  └──────────────┘            │
│                                                │
│         [ View Full Menu → ]                  │
└───────────────────────────────────────────────┘
```

- 2 columns
- Gap reduces to `var(--garcia-spacing-6)`
- Cards maintain same internal proportions

## 7. Mobile Layout (<48rem)

```
┌────────────────────┐
│  Featured Dishes    │
│                     │
│  ┌────────────────┐ │
│  │ ◄── Image ──►  │ │
│  │ Name           │ │
│  │ Description    │ │
│  │ $32 · badges   │ │
│  │ [View]         │ │
│  └────────────────┘ │
│  ┌────────────────┐ │
│  │ ◄── Image ──►  │ │
│  │ ...            │ │
│  └────────────────┘ │
│                     │
│  [ View Full Menu] │
└────────────────────┘
```

- Single column, full-width cards
- Padding: `--garcia-spacing-6` on content wrapper
- Section padding: `--garcia-spacing-8` block
- Images remain same aspect ratio, scale down naturally
- Typography one step down on the scale

## 8. Card Anatomy

```
┌──────────────────────────────────────┐
│                                      │
│  ◄══════════ Image ═══════════►       │  ← 4:3 aspect ratio, object-fit: cover
│                                      │  ← Badge overlay top-left (optional)
│                                      │
├──────────────────────────────────────┤
│                                      │
│  Dish Name                heading-3  │  ← Playfair Display, bold
│                                      │
│  Short description of the dish.      │  ← body-sm, text-secondary
│  One or two sentences max.           │
│                                      │
│  ─────────────────────────────────   │  ← subtle divider (optional)
│                                      │
│  $32 · ⬤ ⬤ ⬤ ⬤ ⬤  · Chef's Pick   │  ← price + badges inline
│                                      │
│              View in Menu →          │  ← text link, gold hover
│                                      │
└──────────────────────────────────────┘
```

### Card container

```css
.featured-card {
  background-color: var(--garcia-surface-primary);
  border-radius: var(--garcia-radius-lg);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
```

No outer border. Cards distinguish from the section background purely through `surface-primary` vs `surface-secondary`/`ivory` contrast. This is the luxury restaurant approach — space, not lines, creates separation.

### Card padding

- Image: full-width, no padding
- Content: `padding: var(--garcia-spacing-6)`
- Gap between content elements: `var(--garcia-spacing-3)` stacked

## 9. Image Ratio

**Aspect ratio: 4:3** (width : height)

Rationale:
- Standard photography ratio, compatible with most food photography
- Wider than square (1:1) — gives the dish room to breathe
- Not too wide (16:9) — avoids letterboxing on cards
- Consistent across all cards for visual rhythm

Implementation:

```css
.featured-card-image {
  aspect-ratio: 4 / 3;
  overflow: hidden;
}

.featured-card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

Images use `<Image>` from Next.js with:
- `sizes` attribute: `(max-width: 48rem) 100vw, (max-width: 80rem) 50vw, 33vw`
- `loading="lazy"` (below the hero, so lazy is appropriate)
- `placeholder="blur"` with `blurDataURL` for smooth loading
- WebP format (handled automatically by Next.js)

### Image fallback

If no image is available, render a placeholder gradient using the olive palette:

```css
background: linear-gradient(135deg, var(--garcia-color-primary-100), var(--garcia-color-primary-200));
```

## 10. Typography Hierarchy

| Element | Class | Font | Size (mobile) | Size (desktop) | Weight | Color |
|---------|-------|------|--------------|----------------|--------|-------|
| Section heading | `heading-1` | Playfair Display | `--font-size-2xl` | `--font-size-3xl` | Bold | `--text-primary` |
| Subheading | `body-base` | Inter | `--font-size-base` | `--font-size-lg` | Normal | `--text-secondary` |
| Dish name | `heading-3` | Playfair Display | `--font-size-lg` | `--font-size-xl` | Semibold | `--text-primary` |
| Description | `body-sm` | Inter | `--font-size-sm` | `--font-size-sm` | Normal | `--text-secondary` |
| Price | `body-base` | Inter | `--font-size-base` | `--font-size-lg` | Medium | `--color-gold-dark` |
| Badge label | `caption` | Inter | `--font-size-xs` | `--font-size-xs` | Medium | `--text-tertiary` |
| Overline | `overline` | Inter | `--font-size-xs` | `--font-size-xs` | Semibold | `--color-gold` |
| View link | `body-sm` | Inter | `--font-size-sm` | `--font-size-sm` | Medium | `--text-link` |

RTL override: All display/heading fonts switch to `--garcia-font-family-arabic` in `[dir="rtl"]` as defined in `typography.css`.

## 11. Badge System

Badges are small, non-interactive visual tags that communicate additional information at a glance.

### Badge types

| Badge | Meaning | Visual |
|-------|---------|--------|
| Chef's Pick | Recommended by chef | Gold text + gold dot (⬤) |
| Popular | Top-selling dish | Warm icon + "Popular" text |
| Dietary | Vegetarian / Vegan / GF | Small green icon or text |
| Spicy | Heat level | Icon or text indicator |
| New | Recently added to menu | Subtle "New" chip |

### Badge placement

- Primary badge (Chef's Pick / Popular): Overlaid on the image, top-left corner, semi-transparent dark chip with gold text
- Secondary badges (Dietary / Spicy / New): Inline below the description, before the price row

### Implementation

```css
.featured-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--garcia-spacing-1);
  font-size: var(--garcia-font-size-xs);
  font-weight: var(--garcia-font-weight-medium);
  line-height: 1;
  white-space: nowrap;
}

.featured-badge-image {
  position: absolute;
  inset-block-start: var(--garcia-spacing-3);
  inset-inline-start: var(--garcia-spacing-3);
  padding: var(--garcia-spacing-1) var(--garcia-spacing-2);
  border-radius: var(--garcia-radius-sm);
  background-color: rgb(0 0 0 / 0.55);
  backdrop-filter: blur(4px);
  color: var(--garcia-color-gold);
  font-size: var(--garcia-font-size-xs);
  font-weight: var(--garcia-font-weight-semibold);
}

.featured-badge-inline {
  color: var(--garcia-text-tertiary);
}

.featured-badge-inline::before {
  content: "·";
  margin-inline: var(--garcia-spacing-2);
  color: var(--garcia-border);
}
```

Maximum 2 badges shown per card. "Chef's Pick" or "Popular" take priority. Dietary badges show only when relevant.

## 12. Price Presentation

Prices are:
- Right-aligned or inline in the price/badge row
- Using `--garcia-color-gold-dark` as the color (luxury gold for monetary value)
- Prefixed with the currency symbol ($)
- No decimal places for whole numbers, .00 for round numbers (or .50)
- Font weight: medium

No strikethrough pricing, no "was" pricing, no discounts. Luxury brands do not discount.

Layout:

```
$32  ·  Chef's Pick  ·  ⬤ Vegetarian
```

The price is the first element in the row (visually most important after dish name).

## 13. CTA Strategy

Two levels of calls to action:

### Primary CTA: "View Full Menu"

- Located below the dish grid
- Centered, subtle
- Uses the existing `Button` component with variant `secondary` or `ghost`
- Gold accent on hover (not olive — gold is for actions)
- Links to `/menu`

```tsx
<Button variant="ghost" size="lg">
  View Full Menu
  <Icon name="chevronDown" size={16} />
</Button>
```

Hover effect: color changes to gold, icon rotates or slides.

### Secondary CTA: "View in Menu"

- Located per-card, bottom-right or right-aligned
- Text link style (not a full button)
- Small, subtle, supports scannability
- Links to `/menu#dish-id` (deep link to specific dish on menu page)
- Hover: gold color transition

```tsx
<Link href="/menu#dish-id" className="featured-view-link">
  View in Menu
  <Icon name="chevronDown" size={14} />
</Link>
```

The per-card CTA should NOT compete with the dish name or image. It is discoverable on hover (desktop) or always visible but muted (mobile).

## 14. Hover Interactions

All interactions are CSS-only. No JavaScript.

### Card hover

```css
.featured-card {
  transition: transform var(--garcia-duration-slow) var(--garcia-ease-out);
}

.featured-card:hover {
  transform: translateY(-4px);
}
```

The card lifts slightly. No shadow change required (the background contrast already provides separation). On touch devices, this effect does not apply (no hover state).

### Image hover

```css
.featured-card-image img {
  transition: transform var(--garcia-duration-slow) var(--garcia-ease-out);
}

.featured-card:hover .featured-card-image img {
  transform: scale(1.03);
}
```

A very subtle image zoom on card hover. Slower than typical (350ms vs 200ms) to feel unhurried.

### View link hover

```css
.featured-view-link {
  transition: color var(--garcia-duration-fast) var(--garcia-ease-out), gap var(--garcia-duration-fast) var(--garcia-ease-out);
}

.featured-view-link:hover {
  color: var(--garcia-color-gold-dark);
  gap: var(--garcia-spacing-2);
}
```

### Section heading

Optional: a subtle gold underline that expands from center on section entry (CSS animation, triggered by the parent section entering the viewport — no JS needed, can be done with `@keyframes` and `animation-delay`).

### Reduced motion

```css
@media (prefers-reduced-motion: reduce) {
  .featured-card,
  .featured-card-image img,
  .featured-view-link {
    transition: none;
  }

  .featured-card:hover {
    transform: none;
  }

  .featured-card:hover .featured-card-image img {
    transform: none;
  }
}
```

## 15. Loading Strategy

### Image loading

- All dish images use `loading="lazy"` (they are below the hero fold)
- Next.js `<Image>` with `placeholder="blur"` and inline `blurDataURL` (tiny base64 thumbnail)
- `sizes` attribute per breakpoint for responsive loading

### Skeleton state

On first paint, before images load, cards render with a CSS skeleton:

```css
.featured-card-skeleton .featured-card-image {
  background: linear-gradient(
    90deg,
    var(--garcia-color-primary-100) 25%,
    var(--garcia-color-primary-50) 50%,
    var(--garcia-color-primary-100) 75%
  );
  background-size: 200% 100%;
  animation: skeleton-shimmer 1.5s infinite;
}

@keyframes skeleton-shimmer {
  from { background-position: 200% 0; }
  to { background-position: -200% 0; }
}
```

The skeleton is rendered as part of the static HTML (not client-side). Once images load via Next.js lazy loading, the skeleton is replaced naturally. No JS state needed.

### Content loading

All text content is static — part of the page's static generation. No API calls, no loading states for text. The section is fully rendered in the initial HTML.

### Entry animation

On scroll into view (CSS only using `@keyframes` with `animation-delay` driven by Intersection Observer — actually, CSS-only scroll animations require `animation-timeline: scroll()` which has limited support. For cross-browser support, use a class toggle via a lightweight Intersection Observer hook. Each card fades in with a staggered delay (100ms between cards).

```css
.featured-card {
  opacity: 0;
  transform: translateY(20px);
  animation: featured-card-enter 600ms var(--garcia-ease-out) forwards;
}

.featured-card:nth-child(1) { animation-delay: 0ms; }
.featured-card:nth-child(2) { animation-delay: 100ms; }
.featured-card:nth-child(3) { animation-delay: 200ms; }
/* etc. */
```

The animation class is applied when the section enters the viewport. This requires a small Intersection Observer hook (reuse the one from LandingHeader or create a shared hook). At `prefers-reduced-motion: reduce`, all cards appear fully opaque and in position with no animation.

## 16. Accessibility

### Landmarks

- The Featured Menu section uses `<section>` with `aria-labelledby` referencing a visible `<h2>` heading.
- Each dish card uses `<article>` with `aria-label` containing the dish name.
- The grid is a `<div>` with `role="list"` and each card has `role="listitem"`.

### Headings

- `<h2>` for the section title ("Featured Dishes")
- `<h3>` for each dish name inside `<article>`
- Strict heading order: `h1` (Hero) → `h2` (section) → `h3` (dish)

### Images

- Each dish image has a descriptive `alt` text (e.g., "Grilled octopus with lemon dressing and fresh herbs")
- Decorative badge icons have `alt=""` (empty)

### Interactive elements

- "View in Menu" links are `<a>` elements with visible `:focus-visible` rings (satisfied by global CSS)
- "View Full Menu" button uses the existing `Button` component with built-in focus handling
- Keyboard navigation follows card order (left-to-right, top-to-bottom)

### Color contrast

- Text on the ivory/white background: `--garcia-text-primary` (#171717 on white) — 17.5:1 contrast ratio (exceeds AA)
- Gold badges on dark overlay: white text on semi-transparent dark background — needs verification but mathematically sufficient at 0.55 opacity dark bg
- Price text: `--garcia-color-gold-dark` (#b8943e on white) — approximately 3.5:1 for 18px+ text (meets AA large text)

### Screen reader considerations

- Badges are read as text (e.g., "Chef's Pick", "Vegetarian"), not as icons
- Price is read as currency: "32 dollars"
- The `aria-label` on each `<article>` provides context: "Grilled octopus — 32 dollars — Chef's Pick"

## 17. RTL Support

All layout uses logical CSS properties:

| Property | LTR value | RTL value |
|----------|-----------|-----------|
| Badge position | `inset-inline-start: var(--garcia-spacing-3)` | same (start = right in RTL) |
| View link alignment | `margin-inline-start: auto` | same (start = right in RTL) |
| Price row | `display: flex; gap: var(--garcia-spacing-2)` | same (flex direction auto-reverses) |
| Grid gap | `gap: var(--garcia-spacing-8)` | same |
| Text alignment | `text-align: start` | same |

No `left` or `right` properties are used. No `text-align: left` or `text-align: right` — use `text-align: start` / `end`.

The typography system already handles RTL font switching in `typography.css`:
```css
[dir="rtl"] .heading-1,
[dir="rtl"] .heading-2,
[dir="rtl"] .heading-3 {
  font-family: var(--garcia-font-family-arabic), var(--garcia-font-family-display);
  letter-spacing: normal;
}
```

## 18. Performance Considerations

| Metric | Target | Strategy |
|--------|--------|----------|
| LCP | Not affected | Hero is the LCP element. Featured Menu is below fold. |
| CLS | <0.05 | All images have explicit `width` and `height` via `<Image>`. Cards use `aspect-ratio: 4/3` containers. No layout shift when images load. |
| Image weight | <100KB per image | Next.js automatically generates WebP via Sharp. `sizes` attribute prevents oversized downloads. |
| Total section weight | <300KB | 6 images × 100KB max = 600KB worst case. Target: 6 images × 50KB = 300KB. |
| JavaScript | 0KB (excluding shared Intersection Observer) | No client components. No JS libraries. The Intersection Observer hook is shared and already loaded from LandingHeader. |
| CSS | <5KB gzipped | Single-purpose `.featured-*` classes. No duplicated utility patterns. |

### Preventing CLS

```tsx
<Image
  src={dish.image}
  alt={dish.alt}
  width={400}
  height={300}
  loading="lazy"
  sizes="(max-width: 48rem) 100vw, (max-width: 80rem) 50vw, 33vw"
  style={{ width: "100%", height: "100%", objectFit: "cover" }}
/>
```

The parent `.featured-card-image` has `aspect-ratio: 4/3` which reserves the exact vertical space before the image loads. Combined with `<Image>`'s automatic width/height, CLS is eliminated.

## 19. Future Scalability

### CMS-driven content

The Featured Menu component accepts a typed props interface:

```typescript
interface FeaturedDish {
  id: string;
  image: string;
  imageAlt: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  badges: DishBadge[];
  slug: string; // for deep linking to /menu#slug
}

type DishBadge = "chefs-pick" | "popular" | "vegetarian" | "vegan" | "gluten-free" | "spicy" | "new";
```

When a CMS is added, this page becomes a data-fetching wrapper that maps CMS entries to `FeaturedDish[]`. The component itself remains pure.

### Category tabs (future)

If the Featured Menu expands to show categories (Starters, Mains, Desserts), the grid container is wrapped in a tab-like filter. Each category is a separate `FeaturedDish[]` array. Tab switching uses CSS only (`:target` pseudo-class or hidden radio buttons) — no JS.

### Seasonal rotation

The component supports a `season` prop that changes the section heading (e.g., "Summer Menu", "Winter Specials") and the dish data. No structural changes needed.

### Multi-language

All text content is extracted to a prop interface. When Arabic is added, the component receives translated strings. RTL is automatically handled.

## 20. Definition of Done

- [ ] Section renders with 4–6 dish cards in a responsive grid (3-col desktop, 2-col tablet, 1-col mobile).
- [ ] All dish images use Next.js `<Image>` with `loading="lazy"`, `sizes`, and `aspect-ratio: 4/3` containers.
- [ ] Zero CLS from image loading (verified by Lighthouse).
- [ ] Cards show: image, dish name (h3), description (body-sm), price (gold), badges, and "View in Menu" link.
- [ ] Badge system renders at least "Chef's Pick" and "Popular" variants, with image-overlay and inline placements.
- [ ] Prices display in gold (`var(--garcia-color-gold-dark)`) with currency symbol.
- [ ] "View Full Menu" button at section bottom uses existing `Button` component.
- [ ] Card hover: `translateY(-4px)` lift with 350ms ease-out.
- [ ] Image hover: subtle `scale(1.03)` zoom synced with card hover.
- [ ] `prefers-reduced-motion: reduce` disables all card/image hover animations and entry animations.
- [ ] RTL test: all cards render correctly with `dir="rtl"`, no broken positioning.
- [ ] Keyboard-navigable: Tab through cards in correct order, all links reachable.
- [ ] Screen reader: announces section heading, each dish name + price + badges correctly.
- [ ] Color contrast: all text meets WCAG AA (verified with contrast checker).
- [ ] `<section>` uses `aria-labelledby` pointing to the `<h2>`.
- [ ] Each dish card is an `<article>` with `aria-label`.
- [ ] `dark` mode: cards use `--garcia-surface-primary` (dark surface), text uses dark-mode tokens, badges adjust.
- [ ] `pnpm build` passes with zero errors and zero warnings.
- [ ] `pnpm format:check` passes.
- [ ] No new external dependencies added to `package.json`.
- [ ] Intersection Observer hook is shared/reused from existing codebase (no duplicate implementation).
- [ ] Bundle size impact <5KB CSS + 0KB JS (excluding shared observer hook).

---

**End of architecture specification.**

*Awaiting Tech Lead approval before implementation begins.*

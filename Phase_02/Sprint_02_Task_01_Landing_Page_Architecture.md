# Sprint 2 — Task 01: Premium Landing Page Architecture

**Author:** Principal Frontend Architect
**Status:** Draft — Awaiting Tech Lead Approval
**Date:** 2026-07-15
**Context:** First customer-facing feature for Garcia Restaurant & Cafe.

---

## 1. Business Goal

Drive conversion from unknown visitor to confirmed restaurant guest by creating an irresistible first impression that communicates quality, atmosphere, and trust — before the user has ever stepped through the door.

Specifically: increase the restaurant inquiry-to-visit conversion rate by presenting the venue as a premium dining destination worth travelling for.

## 2. UX Goal

Deliver a cinematic, emotionally resonant browsing experience that mimics the feeling of approaching, entering, and being seated at a world-class restaurant — all from a mobile or desktop browser.

The page must feel like the restaurant itself: warm, intentional, unhurried. Every scroll, hover, and click should reinforce the brand's commitment to quality.

## 3. Conversion Goal

- Primary: Drive users to the **Menu** page (the next step in the funnel).
- Secondary: Capture **Reservation inquiries** (via reservation CTAs).
- Tertiary: Increase **social proof engagement** (Google rating link, Instagram feed).
- Measurable targets (post-launch):
  - Scroll depth >70% on first visit.
  - Menu page click-through rate >25% of landing page visitors.
  - Bounce rate <40%.

## 4. Emotional Journey

The landing page must take the user through a sequence of feelings, mapped to sections:

| Phase | Feeling | Section |
|-------|---------|---------|
| 1. Approach | Anticipation, curiosity | Hero — full-bleed video/image + restaurant name + tagline |
| 2. Threshold | Warmth, welcome | Atmosphere — interior photos, ambient lighting cues |
| 3. Discovery | Delight, desire | Signature dishes — hero food photography |
| 4. Validation | Trust, relief | Social proof — ratings, reviews, press features |
| 5. Invitation | Urgency, exclusivity | Reservation CTA / "You are invited" |
| 6. Grounding | Orientation, reliability | Location, hours, contact info |

Each phase should be visually and tonally distinct, but bound by a consistent design language. The emotional arc is: *curiosity → wonder → trust → desire → action.*

## 5. Information Hierarchy

```
1. Restaurant Name + Tagline          (Hero — primary message)
2. Atmosphere / Ambiance              (Visual proof of experience)
3. Signature Dishes (3–5 hero items)  (Visual proof of food quality)
4. Social Proof                       (Reviews, ratings, press, awards)
5. Reservation CTA                    (Primary conversion action)
6. Location & Hours                   (Practical information)
7. Footer                             (Secondary links, copyright, social)
```

Every element above the fold must serve a single purpose: **make the user want to scroll deeper.** Nothing above the fold should be a utility link. Utility (contact, directions, hours) lives below the fold or in a minimal header.

## 6. Section Order with Rationale

### 6.1 Hero Section

Full-viewport, full-bleed background (video preferred, high-res image fallback). Centered overlay with:

- Restaurant logo or wordmark (Playfair Display, bold, large)
- Short tagline (e.g., "Mediterranean soul. Modern heart.")
- A subtle scroll-down affordance (animated chevron or text)
- Optional: a minimal "Reserve a Table" button in the bottom-third, only on desktop

**Rationale:** The hero is the handshake. Before users see a menu item or a price, they must feel the restaurant. No navigation chrome. No secondary CTAs. Nothing that competes with the emotional impact of the visual.

### 6.2 Atmosphere Section

Grid or staggered layout of interior/lifestyle photography. Warm, dimly lit imagery. Short poetic text overlay (e.g., "Candlelight. Conversation. Cuisine.").

**Rationale:** After the hero establishes the brand, the atmosphere section deepens the sensory experience. Users who reach this section are signaling interest — reward them with an immersive visual experience.

### 6.3 Signature Dishes Section

3–5 hero dish images arranged in an asymmetric masonry or alternating layout. Each dish has a name, short description (1 sentence), and optional "View in Menu" link. Photography is front-lit, vivid, hero-styled.

**Rationale:** The food is the core product. After establishing atmosphere, show the user what they will actually eat. This section must trigger hunger. It bridges emotional desire to practical consideration.

### 6.4 Social Proof Section

- Aggregate rating (Google / TripAdvisor stars + score)
- 1–2 pull quotes from notable reviews (press or top reviewers)
- "As featured in" logos (if applicable)
- No more than 5 items total. Clean, minimal, scannable.

**Rationale:** Social proof reduces perceived risk. After the user has formed an emotional connection and seen the food, they need a rational reason to trust. This section provides it concisely.

### 6.5 Reservation CTA Section

Full-bleed background (different from hero — perhaps a warm amber wash or a dim interior shot). Centered headline: "Reserve Your Experience" or "We're Saving You a Seat." Primary button: "Make a Reservation." Secondary text: "Walk-ins welcome" or phone number.

**Rationale:** The primary conversion point. Placed after social proof so the user has enough information to act. The visual contrast restarts attention after the text-heavy social proof section.

### 6.6 Location & Hours Section

- Address with link to Google Maps
- Operating hours (clear, scannable table)
- Phone number
- Optional: a small static map or embedded map thumbnail

**Rationale:** Practical information. Placed after conversion so it does not distract from the reservation CTA. Users who reach this section are highly intentional — give them exactly what they need.

### 6.7 Footer

- Navigation links (Menu, Reservations, Contact, Gallery)
- Social media links (Instagram, Facebook)
- Privacy policy, terms
- "© Garcia Restaurant & Cafe"

**Rationale:** Standard closure. No surprises.

## 7. Component Tree

```
LandingPage
├── LandingHeader (minimal, transparent, fixed)
│   ├── Logo / Wordmark
│   ├── NavLinks (Menu, Reservations, Contact)
│   └── HamburgerToggle (mobile only)
├── HeroSection
│   ├── HeroMedia (video | image)
│   ├── HeroOverlay
│   │   ├── RestaurantName (display-1)
│   │   ├── Tagline (body-xl, text-inverse)
│   │   └── ScrollIndicator (animated chevron)
│   └── SkipToContent (visually-hidden, focusable)
├── AtmosphereSection
│   ├── SectionHeader (overline + heading-1)
│   ├── MediaGrid
│   │   ├── MediaGridItem (photo, optional caption overlay)
│   │   ├── MediaGridItem
│   │   └── MediaGridItem
│   └── AmbientQuote (body-lg, italic, centered)
├── SignatureDishesSection
│   ├── SectionHeader
│   ├── DishGallery (asymmetric grid)
│   │   ├── DishCard
│   │   │   ├── DishImage (optimized, lazy)
│   │   │   ├── DishName (heading-3)
│   │   │   ├── DishDescription (body-base)
│   │   │   └── DishLink ("View in Menu" → /menu)
│   │   ├── DishCard
│   │   └── DishCard
│   └── GalleryCTA (optional "View Full Menu" link)
├── SocialProofSection
│   ├── RatingBadge (stars + score)
│   ├── ReviewPullQuotes
│   │   ├── PullQuote
│   │   └── PullQuote
│   └── PressLogos (inline logo row)
├── ReservationSection
│   ├── ReservationOverlay (background)
│   ├── ReservationHeadline (display-2)
│   ├── ReservationCTAs
│   │   ├── PrimaryButton ("Make a Reservation")
│   │   └── SecondaryText ("Or call +1 (555) 123-4567")
│   └── TrustBadge ("No credit card required" or similar)
├── LocationSection
│   ├── AddressBlock
│   ├── HoursTable
│   └── MapEmbed (static or interactive thumbnail)
└── LandingFooter
    ├── FooterNav
    ├── SocialLinks
    └── FooterLegal
```

**Data flow:** All content is static at build time. Sections receive data via props from the parent page. No client-side data fetching. No state management needed.

## 8. Responsive Behaviour

### Breakpoint Strategy

Use the existing `width >= 48rem` (768px) breakpoint as the primary tablet/desktop threshold. A secondary `width >= 80rem` (1280px) breakpoint for large desktops.

### Mobile-first (default) layout:

- Single-column stack. Full-bleed sections (no horizontal padding on hero, atmosphere, reservation).
- Content-wrapper padding: `--garcia-spacing-6` (1.5rem) on mobile.
- Dish gallery: single column, full-width images.
- Typography: one step down on the scale (e.g., display-2 instead of display-1 for hero name on small screens).

### Tablet (≥48rem) adjustments:

- Hero: larger font scale, scroll indicator remains visible.
- Atmosphere grid: 2-column layout.
- Dish gallery: 2-column alternating layout.
- Social proof: side-by-side quote + rating layout.
- Location: address and hours side-by-side.

### Desktop (≥80rem) adjustments:

- Hero: maximum hero scale, optional parallax effect.
- Atmosphere grid: 3-column staggered layout.
- Dish gallery: 3-column with hero dish featured larger.
- Content max-width: 80rem (`content-wrapper-lg`).
- Reservation CTA: max-width constrained, centered.

### Motion consideration:

- `prefers-reduced-motion: reduce`: disable all parallax, auto-play video, and entrance animations. Preserve fade transitions only (opacity 0→1, 300ms).

## 9. Accessibility Strategy

### Landmarks

- `<main>` wraps all unique page content.
- Each section uses a semantic HTML sectioning element: `<section>` with `aria-labelledby` matching a visible heading's `id`.
- Skip-to-content link as first focusable element (existing `.skip-link` class).

### Headings

- Exactly one `<h1>` — the restaurant name in the hero.
- Each section has an `<h2>` (visible or visually-hidden).
- Dish cards use `<h3>` for dish names.
- Strict heading order: `h1 → h2 → h3`. No skips.

### Images

- All `<img>` tags require descriptive `alt` text (never empty for food/atmosphere photos).
- Decorative background images use `role="presentation"` or CSS background-image with empty `alt`.
- Lazy loading (`loading="lazy"`) on all images below the fold.
- `fetchpriority="high"` on the hero image.

### Interactive elements

- All buttons and links must have visible focus indicators (satisfied by existing `:focus-visible` global style).
- Reservation CTA is a `<button>` if it opens a modal/dialog, or an `<a>` if it navigates to a separate reservations page.
- Keyboard navigation order must match visual order.

### Reduced motion

- `@media (prefers-reduced-motion: reduce)` disables parallax, auto-video, entrance animations.
- All animations use `var(--garcia-duration-normal)` or `--garcia-duration-slow` to allow respect of system preferences.
- No infinite animations except the scroll indicator (which has a very subtle pulse and is hidden from motion-reduce users).

### Screen reader considerations

- Hero section has `aria-label="Hero: [restaurant name]"` on the section element.
- Scroll indicator has `aria-hidden="true"`.
- Logo image has `alt="Garcia Restaurant & Cafe"` or is a text wordmark.
- Social proof stars are rendered as text "(4.8 out of 5 stars)" with visual styling, not just icon stars.

## 10. Performance Budget

| Metric | Target | Measurement |
|--------|--------|-------------|
| Largest Contentful Paint (LCP) | <2.5s | Lighthouse, RUM |
| First Input Delay (FID) | <100ms | Lighthouse, RUM |
| Cumulative Layout Shift (CLS) | <0.1 | Lighthouse, RUM |
| Time to Interactive (TTI) | <3.5s | Lighthouse |
| Total Bundle Size (JS) | <100KB gzipped | next-bundle-analysis |
| Total Page Weight | <1.5MB (excluding video) | DevTools |
| Hero Image LCP | <1.5s to first paint | Priority hints |

If the hero uses a video, it must:
- Be served as a compressed H.264 MP4 (not a raw source).
- Have a poster image (high-res JPEG) that loads immediately.
- Autoplay with `muted` and `playsinline`.
- Total video size <2MB for the hero loop (max 10 seconds, looped).

## 11. SEO Strategy

### Metadata (layout.tsx)

Page-specific metadata overrides the root layout:

```typescript
export const metadata: Metadata = {
  title: "Garcia Restaurant & Cafe | Fine Dining in [City]",
  description:
    "Experience Mediterranean-inspired cuisine at Garcia Restaurant & Cafe. Candlelit ambiance, handcrafted dishes, and exceptional service in the heart of [City].",
  openGraph: {
    title: "Garcia Restaurant & Cafe",
    description: "Mediterranean soul. Modern heart.",
    type: "website",
    locale: "en_US",
    siteName: "Garcia Restaurant & Cafe",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Garcia Restaurant & Cafe",
    description: "Mediterranean soul. Modern heart.",
  },
};
```

### Structured data (JSON-LD)

Inject `ld+json` script tag via Next.js `Script` component with `strategy="beforeInteractive"`:

```json
{
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "name": "Garcia Restaurant & Cafe",
  "servesCuisine": "Mediterranean",
  "priceRange": "$$$",
  "address": { ... },
  "telephone": "+1...",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "247"
  },
  "image": "https://.../og-image.jpg",
  "url": "https://..."
}
```

### Semantic HTML

- Use `<article>` for dish cards (they are self-contained content items).
- Use `<figure>` + `<figcaption>` for atmosphere photos with captions.
- Use `<address>` for the location block.
- Use `<time>` for hours (with `datetime` attribute).

### Technical SEO

- Generate a static page (no SSR — the landing page content is fully static).
- Ensure `sitemap.xml` includes the landing page and `/menu`.
- `robots.txt` allows indexing.
- Canonical URL set to the production domain.

## 12. Animation Strategy

### Principles

1. **Borrowed time:** Animations must finish within `var(--garcia-duration-slow)` (350ms) for UI elements, up to 600ms for immersive hero transitions.
2. **Easing:** Use `var(--garcia-ease-out)` for entrances (decelerate into position), `var(--garcia-ease-in-out)` for state transitions.
3. **Staggered reveal:** Sections animate into view one after another as the user scrolls, using an Intersection Observer.
4. **Performance:** Animate only `opacity` and `transform` (prefer `translate` and `scale`). Never animate `width`, `height`, `top`, `left`, or `margin`.

### Specific animations

| Element | Animation | Trigger | Duration | Easing |
|---------|-----------|---------|----------|--------|
| Hero overlay text | Fade in + translateY(20px→0) | Page load (staggered: name→tagline→button) | 600ms per element | ease-out |
| Scroll chevron | TranslateY(0→8px) loop | Infinite (after hero load) | 2s loop | ease-in-out |
| Atmosphere grid items | Fade in + scale(0.95→1) | Intersection (staggered 100ms) | 400ms | ease-out |
| Dish cards | Fade in + translateY(30px→0) | Intersection (staggered 150ms) | 450ms | ease-out |
| Social proof | Fade in | Intersection | 350ms | ease-out |
| Reservation CTA | Scale(0.98→1) on hover | Hover | 200ms | ease-out |
| Button press | Scale(1→0.97) | Active | 100ms | ease-in |

### Implementation approach

Use CSS `@keyframes` for simple animations (scroll chevron, button hover). Use a lightweight Intersection Observer hook for scroll-triggered reveals. No external animation library.

### Reduced motion

Check `prefers-reduced-motion: reduce` before applying any entrance or scroll animations. If active, all elements appear fully opaque and in their final position at load time.

## 13. Loading Strategy

### Page load sequence

1. **Critical (blocking):** HTML, CSS (inline critical CSS for hero above-fold content), fonts (preloaded).
2. **High priority (non-blocking):** Hero image (`fetchpriority="high"`, `loading="eager"`), JSON-LD structured data.
3. **Medium priority:** Below-fold images (`loading="lazy"`), video poster, hero video source.
4. **Low priority:** Social proof logos, map embed (iframe), non-critical images.

### Code splitting

No code splitting needed at the page level — the landing page is a single route with minimal interactive JS. The bundle should contain only:

- Layout components (shared, likely already loaded)
- Landing page specific components (tree-shaken)
- Intersection Observer hook (small, inline-able)

No heavy libraries. No client-side state. No data fetching runtime.

### Preloading strategy

```html
<link rel="preload" href="/hero.webp" as="image" fetchpriority="high" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
```

Fonts are already preloaded by `next/font/google` with `display: swap`.

### Skeleton / loading state

Because the page is fully static (generated at build time), no loading spinners or skeletons are required. The first paint includes the hero background and the restaurant name. Below-fold sections render as part of the initial HTML and fade in progressively via CSS/Intersection Observer.

## 14. Image Strategy

### Formats

- **Primary format:** WebP (widely supported, excellent compression).
- **Fallback:** JPEG for hero and food photography (to support very old browsers).
- **Hero video:** H.264 MP4 with WebM as optional secondary source.
- **Icons and logos:** SVG (inline or `<img>`).

### Optimization pipeline

Use Next.js `<Image>` component for:

- Automatic WebP generation via Sharp.
- Responsive `srcSet` (mobile, tablet, desktop variants).
- Correct `sizes` attribute per breakpoint.
- Lazy loading (default for `<Image>`).
- Blur placeholder via `placeholder="blur"` with `blurDataURL` (tiny base64-encoded thumbnail).

### Hero image specifics

- Resolution: 1920×1080 (16:9) for desktop, 1080×1920 (9:16) for mobile portrait.
- `fetchpriority="high"`, `loading="eager"`, `priority` prop on `<Image>`.
- The hero image should be the LCP candidate.
- File size budget: <200KB for the WebP hero image.

### Food photography

- Aspect ratio: 4:3 or square for consistency.
- Lighting: bright, high-contrast, vivid colors.
- Each dish image should have a descriptive `alt` text (e.g., "Grilled octopus with lemon dressing and fresh herbs").
- File size budget: <100KB per image (WebP).

### Atmosphere photography

- Aspect ratio: 3:2 or 16:9 (landscape orientation).
- Lighting: warm, dim, moody (match the restaurant's actual lighting).
- File size budget: <150KB per image (WebP).

## 15. Future Scalability

### CMS integration

The architecture is designed for eventual CMS-driven content:

- Each section accepts a typed props interface. When a CMS is added, the page becomes a data-fetching wrapper that maps CMS blocks to section props.
- No section component hard-codes text content (except structural text like "Make a Reservation").
- The dish gallery data structure (`DishCard[]`) anticipates a future menu API.

### Multi-language support

- All text content will be extracted into a locale file (`en.ts`, `ar.ts`) when Arabic support is added.
- The landing page layout already supports `dir="rtl"` via `layout.tsx`.
- Typography tokens already include `--garcia-font-family-arabic` and RTL overrides in `typography.css`.

### Seasonal / event-specific sections

- A "Highlights" or "Events" section can be inserted between Social Proof and Reservation CTA without disrupting the emotional arc.
- The component tree supports flexible section ordering via a sections array pattern (future enhancement).

### A/B testing

- Section visibility and order can be controlled via URL parameters or feature flags (once a flag system is established).
- Hero, Atmosphere, and Signature Dishes are the primary candidates for A/B testing.

## 16. Risks

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Hero video slows LCP | High | Medium | Use poster image as fallback; preload poster; defer video load. If LCP budget cannot be met, use a static hero image instead. |
| Font swap causes layout shift | Medium | Low | Next.js `adjustFontFallback: true` on all fonts already configured; `size-adjust` metrics already set by `next/font/google`. |
| Intersection Observer animations cause jank on low-end devices | Medium | Low | Use `will-change: transform, opacity` on animated elements; respect `prefers-reduced-motion`; limit animated elements to viewport. |
| Social proof data becomes outdated | Low | Medium | Static content is acceptable for launch. Future: embed dynamic Google rating widget with `loading="lazy"` iframe. |
| RTL layout breaks custom sections | Medium | Low | All new CSS must use logical properties (`margin-inline-start`, `padding-inline-end`, `inset-inline-start`). Review all animations for RTL awareness. |

## 17. Alternatives Considered

| Alternative | Reason Rejected |
|-------------|-----------------|
| Third-party animation library (Framer Motion, GSAP) | Adds ~30KB+ to bundle for effects achievable with CSS + a 20-line Intersection Observer hook. Not justified for a primarily static page. |
| Full-screen video as background with sound | Autoplay with sound is blocked by browsers; unmuted video degrades UX in public/quiet environments. Hero video must be muted by default. |
| Hero carousel / slideshow | Increases cognitive load, dilutes the single-strong-first-impression, complicates LCP optimization, and adds JS complexity. A single hero asset (video or image) is more impactful and performant. |
| Parallax scrolling on all sections | High risk of motion sickness, accessibility issues, poor mobile performance. Limit parallax to hero (subtle) and disable at `prefers-reduced-motion`. |
| Embedded Google Maps widget above fold | Delays load, adds external JS, distracts from the emotional journey. Maps belong in the Location section below the fold. |
| Popup newsletter / email capture on entry | Destroys the cinematic experience. No modals, popups, or interstitials on first visit. Email capture (if any) belongs in the footer or as a passive element. |
| "Book Now" floating button persistent on scroll | Creates visual clutter and fights the immersive aesthetic. The primary CTA is a section, not a persistent banner. |
| Server-side rendering (SSR) | Unnecessary for a marketing page. Static generation (`output: "export"` or `generateStaticParams`) gives better performance, lower cost, and simpler architecture. |

## 18. Decision Rationale

### Why static generation over SSR

The landing page content does not change per-user, per-request, or per-session. Static generation eliminates server cost, reduces TTFB to CDN-cached levels, and simplifies deployment. If dynamic content (e.g., real-time reservation availability) is needed later, the static page can embed an iframe or client-side widget without changing the rendering strategy.

### Why no carousel

A single, carefully chosen hero asset is more memorable than a rotating set. Carousels dilute impact, slow LCP, and are statistically ignored by most users. The scroll-down affordance invites exploration naturally.

### Why Intersection Observer over scroll-listener

Scroll listeners trigger on the main thread and cause jank. Intersection Observer is off-main-thread, more performant, and declarative. It is the standard approach for scroll-triggered animations in 2026.

### Why fade+translate animations over complex choreography

The restaurant brand is about understated elegance, not flashy motion. Simple, slow fades with subtle vertical translation match the brand voice: "unhurried, intentional, warm." Complex choreography would feel out of character.

### Why no persistent sticky header

A transparent fixed header is present but intentionally minimal (logo + 2–3 nav links). It never becomes opaque on scroll. The landing page is designed to feel like a narrative, not a dashboard. Persistent headers with background colors break immersion.

### Why logical CSS properties everywhere

The app already has RTL support. Using logical properties (`inset-inline-start`, `margin-inline-end`, `padding-block`) ensures the landing page works correctly in Arabic without duplication. This is a hard requirement, not a nice-to-have.

## 19. Definition of Done

- [ ] Landing page renders at `/` with full content (Hero → Atmosphere → Dishes → Social Proof → Reservation CTA → Location → Footer).
- [ ] All text content is placeholder-free (real restaurant data used).
- [ ] Images are optimized: WebP format, responsive srcSet, lazy loading, blur placeholders.
- [ ] Hero image loads as LCP under 2.5s on a 4G connection (verified by Lighthouse).
- [ ] CLS < 0.1 (verified by Lighthouse).
- [ ] No external animation or UI libraries added to `package.json`.
- [ ] Zero ESLint warnings, zero TypeScript errors.
- [ ] Prettier compliance (`pnpm format:check` passes).
- [ ] Passes axe-core accessibility audit (no violations).
- [ ] Keyboard-navigable: all interactive elements reachable and operable via Tab/Enter.
- [ ] Screen reader test: reads sections in correct order, all images described, headings announced correctly.
- [ ] RTL test: `dir="rtl"` renders correctly with no broken layout (Arabic version may have placeholder text pending translation).
- [ ] Dark mode test: `.dark` class applies correct token overrides with no unreadable text.
- [ ] `prefers-reduced-motion: reduce` test: no animations, all content fully visible on load.
- [ ] Responsive test: mobile (375px), tablet (768px), desktop (1280px) — no horizontal overflow, no broken grids.
- [ ] Meta tags and OG images render correctly in social share previews (Facebook, Twitter, LinkedIn).
- [ ] JSON-LD structured data validates with Google's Rich Results Test.
- [ ] `pnpm build` passes (production build with lint + type-check).
- [ ] Bundle size <100KB JS gzipped (verified by `next build` output analysis).

## 20. Validation Checklist

### Visual & Brand
- [ ] Hero image/video communicates the restaurant's atmosphere immediately.
- [ ] Color palette matches the warm amber brand identity (not just default Tailwind colors).
- [ ] Typography hierarchy is clear: Playfair Display for headings, Inter for body.
- [ ] Whitespace is generous and intentional (no cramped sections).
- [ ] Every section has a clear focal point.

### Content
- [ ] Tagline is memorable and distinctive (not generic).
- [ ] Dish descriptions make the reader hungry (not clinical).
- [ ] Social proof is specific (actual numbers, named reviewers).
- [ ] Reservation CTA creates a sense of invitation, not a transaction.

### Technical
- [ ] Lighthouse Performance score ≥95.
- [ ] Lighthouse Accessibility score ≥95.
- [ ] Lighthouse Best Practices score ≥95.
- [ ] Lighthouse SEO score ≥95.
- [ ] Mobile Lighthouse Performance score ≥90 (due to image weight).
- [ ] HTML validates with no errors (W3C validator).
- [ ] No console errors or warnings.
- [ ] All links resolve to real pages or external destinations.

### Integration
- [ ] Menu page link points to `/menu` (existing route).
- [ ] Reservation link/action points to the correct destination (TBD: external booking system or internal page).
- [ ] Social links open in new tabs with `rel="noopener noreferrer"`.
- [ ] Phone number is a `tel:` link on mobile.
- [ ] Address links to Google Maps in new tab.

---

**End of architecture specification.**

*Awaiting Tech Lead approval before implementation begins.*

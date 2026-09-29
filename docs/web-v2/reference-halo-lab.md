# Reference: Halo Lab (halo-lab.com) – strukturální rozbor

_Rozbor z 29. 9. 2026 (koordinátor, K00). Slouží jako vzor struktury, interakcí a konverzních mechanismů. Nekopírovat jejich JS/CSS ani texty – main.js posílá beacon při běhu mimo jejich doménu._

## 1. Service page anatomy

Three generations of service template are live at once:

| Gen | Pages | Character |
|---|---|---|
| **G1 (older)** | `/services/webflow-development-services`, `/services/cms-development` | Hero with a stats row → process carousel → "Our Expertise" 3-card slider → account manager card → "some of Our Cases" (4) → tech stack → review slider → logos → Why choose us → CEO LinkedIn card → FAQ → Related Services (4-card slider) → CTA |
| **G2 (conversion template, most pages)** | website-design, mvp-development, ui-ux-design-audit, landing, web-development | Detailed below |
| **G3 (newest, editorial)** | `/services/branding` and the homepage | Starfield hero, showreel, pinned horizontal services scroll, pinned process, story-style review slider, rotating "wheel" CTA |

**G2 section order on three pages.** Each `#id` is a reusable section component.

| # | Website design | MVP development | UX audit |
|---|---|---|---|
| 1 | Hero: H1 promise with yellow-highlighted phrases, 2 proof bullets with icons, 1 CTA "Discuss your site" | Hero: "idea to MVP in 3 months… 2× faster", CTA "Get free MVP estimate" | Hero: "…in 2 weeks*" with footnote, 2 CTAs (Book a call, Free consultation) |
| 2 | Logo strip (6) | Logo strip (6) | Logo strip (6) |
| 3 | `#results`: 3 case/testimonial cards + stats trio | `#problems`: "MVP pitfalls…" 3 cards | `#results`: 3 case cards + stats trio |
| 4 | `#problems`: "Skip the common web design challenges" 3 cards + CTA | `#overview`: solutions slider (5 cards, "i need this") | `#problems`: "3 main barriers…" 3 cards |
| 5 | "What you can entrust us with" (4) | `#results`: 3 case cards + stats trio | Before/after image slider (unique to this page) |
| 6 | `#process`: 6 steps, step 1 "Free" + CTA | Mid CTA band | "What you'll get": 4 numbered deliverables |
| 7 | `#why-us`: 6 reasons | "Who our MVP service fits best" (3 personas, unique) | `#process`: 6 steps, "RISK-FREE STEP #1" + CTA |
| 8 | `#overview`: 4 solution blocks, "i need this" ×4 | Roadmap: 3 steps + CTA | "12 years… 6 reasons" |
| 9 | Work slider (15 slides) | Tech stack by category (unique) | `#reviews` |
| 10 | CTA band + CEO quote + awards (4) | `#why-us`: 6 reasons | Inline form + newsletter |
| 11 | `#reviews`: "500 projects done with 4.9★ AVG" | `#reviews` | CEO LinkedIn card |
| 12 | CEO LinkedIn card → FAQ (8) | CEO card → FAQ (6) | FAQ (7) |
| 13 | `#discuss`: "Ready to launch your new site?" | `#discuss`: "Ready to turn your idea into a real product?" | `#discuss` |
| 14 | Awards run-line + footer | Same | Same |

**Identical components (same block, text swapped or not changed at all):**
- Header and mega-menu.
- Logo strip (same logos, slightly varied).
- Stats trio: $530M raised / 3.4M MAU / $25.86B biggest-client market cap.
- "6 Reasons to work with us" grid. The titles change, the layout doesn't.
- `#reviews` block with review grid and video-review modal.
- CEO LinkedIn card ("Have more questions… connect with me on LinkedIn").
- Awards run-line: Clutch 4.9 / Upwork Top Rated / Sortlist / Dribbble.
- `#discuss` final CTA (only the headline changes).
- Footer and the booking modal.

**Unique per page:**
- H1 promise, always quantified ("in 3 months", "2 weeks*", "from day one").
- Hero icon and the Lottie icons on solution cards (`solutions_support.json`, `icon-audit-hero.svg`).
- The 3 pain points, each ending in a metric ("+80% faster kickoff", "40% less spent on irrelevant features").
- Solution cards.
- Number of process steps (3, 5 or 6).
- Hand-picked case trio: MVP shows Bookclub24/Linkbycar/Monterra, UX audit shows WeSpire/Kinetik/HomeQ.
- FAQ, 5–8 questions per service.
- One signature section per page: before/after slider (audit), personas + tech stack (MVP), "outdated platforms vs Webflow" comparison (web design).

**How few components cover dozens of pages:**
1. Sections are reordered to follow each buyer's worry. Audit and web design lead with proof. MVP leads with pain.
2. Every section carries a number, so pages read as specific rather than templated.
3. One custom block per page.
4. Case studies are curated per page, not pulled by a CMS filter.
5. The final CTA headline is rewritten for each service.
6. Section anchor IDs (`#results`, `#problems`, `#process`, `#why-us`, `#overview`, `#reviews`, `#discuss`) are shared, so a component always has the same slot name.

---

## 2. Section patterns worth copying

- **Hero (G2).**
  - Left-aligned H1 at 4.5rem, sentence case, 1.1 line-height.
  - 1–2 phrases coloured yellow (`#FDC448`) inside a white H1.
  - Under the H1: 2 icon + short-proof lines ("Designed and developed by a top 1% team", "Based on 500+ websites launched & 12 years").
  - One yellow pill CTA. The visual is an illustration or icon; there's no big photo.
  - Web development page variant: centred, with a small keyword H1 as an eyebrow ("Web development services"), then a big claim set as an H2 with gradient text, a 24px lead paragraph and a CTA.
- **Homepage hero (G3).** H1 at 72px, a canvas starfield where the star nearest the cursor lights up, and 3 large link cards ("Design team / Development team / Marketing team").
- **Logo strip.** A heading ("Trusted by global brands & SMBs in the US and Europe") plus 6 greyscale logos. On mobile it becomes an auto-scrolling Swiper. The homepage runs two Splide marquee rows in opposite directions at a slow 0.5px per frame.
- **Services list.**
  - G2: a Swiper of cards, 3 visible on desktop, with a progress-bar pagination and prev/next buttons.
  - Each card has a Lottie icon, an H3, a "+" toggle that expands the description, and a yellow "i need this" pill with lightning icons.
  - Clicking "i need this" opens the booking modal with the textarea pre-filled: "I'm looking for a {card H3}".
  - G3 (branding): 8 cards in a pinned section that scrolls horizontally as you scroll down.
- **Pain points.** A 3-card grid. Each card has a question headline ("Want a site but feel stuck?"), 2–3 lines on how Halo Lab fixes it, and a bold metric at the bottom. A CTA sits below the grid.
- **Why trust us.** "6 Reasons…" as a 6-card grid with icons, title and 2 lines, with a cursor-following glow on the cards. Alongside it: a CEO quote card, an awards row (Clutch "Top design company 2025", Dribbble 7M views, Behance 40+ features, Awwwards 20 honourable mentions), and a CEO LinkedIn card with a real face.
- **Process.**
  - Horizontal numbered steps (6).
  - Step 1 is labelled "Free" or "RISK-FREE STEP #1" to remove risk.
  - A CTA sits under the steps ("let's get started" / "get a consultation").
  - Branding page: 5 steps with week ranges ("2–4 Weeks") in a pinned section with a progress line and a 3D tilt on the card.
- **Stats.** 3–4 very large numbers in Instrument Serif italic, each with a one-line label. They don't count up.
- **Testimonials and review badges.**
  - Heading "500 projects done with 4.9 ★ AVG".
  - 3 short quote cards with avatar, name and role.
  - A "100+ REVIEWS" grid in Clutch style: stars, budget range, industry, duration, full quote.
  - Video reviews open in a modal.
  - Badges sit in a separate auto-scrolling strip: Clutch "4.9 AVG. SCORE based on 80+ reviews", Upwork "Top rated, 100% job success", Sortlist, Dribbble.
  - Homepage and branding: "100+ verified love letters" as a stacked, slightly rotated card deck (Swiper cards effect, 3° rotation, 6px offset).
  - Case-result cards also carry 5 stars and a quote, so the social proof is attached to the outcome.
- **FAQ.** An accordion built on Webflow dropdowns. The "+" icon swaps on hover, and the open item's background panel extends past the column edges (negative margins). 5–8 questions, always including "How much does it cost?" and "How long…". Newer pages use a friendlier heading: "Quick answers to questions you may have".
- **Big CTA (`#discuss`).** A service-specific question headline, one line of text, and "BOOK A FREE CALL". On G3 pages a ring of about 16 project screenshots slowly rotates around the CTA; it can be dragged and keeps spinning with momentum.
- **Footer.**
  - Two office cards (Warsaw, Boston) and an email address.
  - Link columns: Core services, Core industries, Company.
  - Expandable "All design / development / tech / industry services" lists covering 50+ long-tail pages.
  - Newsletter field, social icons, partner badges (Clutch, GoodFirms, DesignRush, Webflow, Prismic, Sanity) and legal links.

---

## 3. Portfolio

- **`/projects`.**
  - H1 "Explore relevant project from 100+ cases".
  - 3 multi-select checkbox dropdowns: Services (4 values), Industries (~50), Solutions (~27). Each option shows a live count, and there's a "Clear filters" link. Filtering runs client-side with Finsweet List over ~130 items, with an empty-state message.
  - Grid: flex items with `min-width: 25%`, 5rem column gap and 8rem row gap, which works out to about 3 columns on desktop. The large gaps give it a calm, editorial feel.
  - Card: image (19.25rem tall, 12px radius). On hover a muted Vimeo loop fades in over the image.
  - Below the image: client name in 60% grey, an outcome-style H2 title at 1.75rem ("Transforming Pluto into a globally positioned spend management platform") with a sliding arrow, and a one-line description. Listing cards show no metrics.
  - A CTA band sits mid-page.
- **Cases on service pages.**
  - G2 has 3 "Real outcomes" cards: industry and country flag, headline metric ("67% growth", "$23.7M funding"), 5 stars, quote, avatar with name and title, project image link.
  - Some G2 pages add a 15-slide single-card "work across industries" slider with title, one line and screenshot.
  - G1 uses 4 cards with an industry badge.
  - On the homepage the case list shows a preview image that follows the cursor when you hover a title.
- **Case study page (Pluto).**
  - Hero: outcome title, service tags, industry and 3 metrics ("70% faster month-end close").
  - Body: About → Challenge → Process (split by discipline) → Results bullets → Approach → 8-image slider → CEO testimonial → 10 detailed process sub-sections → team roles (PM, 2 writers, 2 UX/UI designers, Webflow developer…) and tech logos → "Next projects" (4) → CTA and form.

---

## 4. Typography and layout

- **Fonts.** Suisse Int'l, a Swiss neo-grotesk, in weights 300–700 for everything. Instrument Serif italic is the accent, used for secondary H2s, labels, big stat numbers and rich-text `em`. The pairing is grotesk with italic serif accents.
- **Fluid root size.** `html { font-size: 1.1vw }` from 992 to 1800px, 1.25rem above 1800, `0.3rem + 1.5vw` on tablet and 5vw on mobile. Everything is sized in rem, so the whole layout scales with the viewport.
- **Type scale** (px values at a 1440px viewport, where 1rem ≈ 15.8px):

| Style | Size | Details |
|---|---|---|
| Service hero H1 | 4.5rem ≈ 5vw ≈ 71px | line-height 1.1 |
| Homepage H1 | 4rem–4.5rem | |
| Legacy base h1 / h2 | 7rem / 5rem | uppercase, line-height 0.9 |
| Section H2 | 3.5rem ≈ 55px | weight 600, line-height 1.1, letter-spacing -0.02ch |
| H3 | 2.5rem | |
| Card titles | 1.75rem | |
| Lead | 1.25–1.5rem | |
| Body | 1rem | line-height 1.6 |
| Labels and buttons | 0.75–0.875rem | uppercase, +0.06em tracking |

- **Grid and spacing.** Container max width 82rem (≈90vw). Section padding 5rem vertical, hero top padding 9rem. There's plenty of space between sections, but cards themselves are fairly dense.
- **Radii.** Pill (20rem) for every button and tag. 50% for icon discs. 1–1.5rem for cards, 0.75rem for images, 0.5rem for small elements.
- **Borders vs shadows.** Almost no shadows (about 35 in 820KB of CSS). Surfaces are separated by tone and 1px translucent hairlines (white at 20%, navy at 10%), and glows are used where you might expect a shadow.
- **Colour.**
  - Dark navy `#02021E` background with white text.
  - Brand blue `#3719CA`, `#3827C7` on hover.
  - Yellow `#FDC448` for H1 highlights and primary CTAs.
  - Light grey `#F5F5F7` for light slides.
  - Secondary text is white at 60–70% opacity.
  - Occasional blue-gradient section backgrounds and pink gradient text.

---

## 5. Micro-interactions (desktop ≥992px only unless noted)

**Subtle and effective (worth copying):**
1. **Button text roll.** The label is duplicated in the markup. On hover both copies move `translateY(-150%)` over 0.3s, so the text rolls up.
2. **Button icon disc.** An arrow or icon sits in a circle on the right of the pill. On hover the icon slides out and its clone slides in, while a background circle scales from 0 to 1 (0.3s). The lightning icons next to "i need this" scale up.
3. **Link underline.** A 1px `scaleX(0→1)` line. The transform origin flips from right to left, so the line draws in from the left on hover and exits to the right. 0.5s, `cubic-bezier(.14,0,0,1.01)`.
4. **Scroll reveal.** A `.anim` class is removed with staggered `data-anim-delay` values (0/50/100/…/700ms) and a `transform .6s, opacity .4s` transition, triggered when the section is 10% into the viewport. Plays once and is switched off on mobile.
5. **Text line reveal (G3).** SplitType splits headings into lines. Each line animates from `y: 2.5rem`, `blur(10px)` and opacity 0 to its resting state: 0.8s, `power3.out`, 0.08s stagger, starting at "top 93%", once. It waits for `document.fonts.ready`.
6. **Header.** Hides when you scroll down and comes back only after you scroll up by 40% of the viewport height. It is absolute over the hero and becomes fixed after the hero. The header "Contact us" pill is glass-style, with a highlight that travels around its outline and a glow on hover.
7. **Cursor glow on card grids.** A `radial-gradient(circle 10rem at var(--cursor-x) var(--cursor-y))` layer fades in over every card in the grid.
8. **Floating form labels.** Labels move up on focus. The phone field has a country-code picker (intl-tel-input).
9. **Project card hover.** A muted Vimeo preview fades in over 0.2s, and the title arrow slides.
10. **Progress-bar pagination on sliders.** On the branding page the review slider autoplays with a fill bar per slide, Instagram-stories style, and pauses when off screen.
11. **FAQ.** The "+" icon swaps, and the open item's background panel extends past the column edges.
12. **"Experts online" avatars.** 3 avatars fade in and out in sequence every second.
13. **Animated favicon.** Swaps between 2 frames every 4 seconds.
14. **Custom thin scrollbar.** 6px, fades in while scrolling and widens to 10px on hover.
15. **Lenis smooth scroll.** Duration 1.3, exponential ease, switched off on the blog, and it pauses while a modal is open.

**Heavier (G3 showpieces; use sparingly or skip):**
- Canvas starfield hero that reacts to the cursor.
- Showreel clip reveal: width 50%→100% and height 20→42rem, scrubbed with scroll.
- Pinned horizontal services carousel (sticky container, `translateX` driven by scroll progress).
- Pinned process section with a progress graph and a 3D card tilt (`perspective 900px`, ±9°).
- Draggable rotating ring of screenshots with momentum in the final CTA. It does respect `prefers-reduced-motion`.
- Custom cursor bubble that shows text ("Watch our showreel", "drag") over specific areas. It isn't a global cursor replacement.
- Cursor-following preview image on the homepage case list (GSAP `quickTo`, `power2.out`).
- Stacked "love letters" card deck.
- Before/after drag slider using `clip-path: inset()` with a handle.
- Brand-evolution frames scrubbed with scroll.

Not found: number count-ups and a site-wide magnetic or custom cursor.

---

## 6. Conversion mechanics

- **CTA count.** The website-design page has about 10 booking entry points: hero, pain points, process, 4× "i need this", mid CTA band, final CTA and the header "Contact us". The CEO LinkedIn card is a softer, secondary contact option. Every booking CTA opens the same modal.
- **CTA wording.** A verb plus a low-commitment object, often with "free":
  - "Discuss your site", "Discuss project"
  - "Book a call", "Book a free call", "Book a discovery call"
  - "Get free MVP estimate", "Get a consultation"
  - "let's get started", "i need this"
  - "Request a quote", "Send a message", "Get in touch"
- **Booking modal: form first, then calendar.**
  - Step 1 fields: Full name, Company email, Phone (with country picker), Budget dropdown ($10–20K / $20–50K / $50–100K / $100–200K), About project, and a consent checkbox covering the privacy policy and SMS follow-up. Button: "REQUEST A QUOTE".
  - After a successful submit, the modal switches to an inline Cal.com 15-minute calendar pre-filled with name, email and notes. The lead is captured even if the visitor never books.
- **Contact page.**
  - Fields: first name, last name, company email, phone, about project, and a budget dropdown that adds "Monthly retainer". Button: "SEND A MESSAGE".
  - After submit, an inline Cal.com "introduction" calendar appears.
  - Trust copy beside the form: "We respond within 24 hours", "We sign NDAs".
- **Behind the forms.** Invisible Turnstile captcha (pre-warmed when the visitor focuses a field). UTM parameters and the page URL are added to every submission. `dataLayer` events fire for `form_send` and `booking_success`.
- **Other devices.**
  - Exit-intent modal on the UX audit page ("Seriously? You're about to miss our free UI/UX audit?" → "SIGN ME UP!").
  - "Free consultation" mini-form with only name and email ("RESERVE MY SPOT").
  - Newsletter modal.
- **Sticky CTA.** There's no sticky bottom bar. The header pill is the only persistent CTA, and it disappears while you scroll down.

---

## 7. SEO approach

- **URLs.** Keyword slugs, but the structure is inconsistent: `/services/{slug}` (`website-design-services`, `web-development-services`, `webflow-development-services`, `react-js-development-services`), `/service/{slug}`, `/services/all/{slug}`, industry hubs like `/healthcare`, cases at `/project/{slug}`, listing at `/projects`. Use one consistent pattern instead.
- **Titles.** "{Service} Services — {Professional…/Company} — Halo Lab". Meta descriptions include an emoji (⚡).
- **Headings.**
  - Exactly one H1 per page, with the keyword inside a promise, or a small keyword H1 above a large H2 claim (web development page).
  - About 7–10 H2s and 12–21 H3s per page.
  - H2s are seeded with keywords ("Our website creation process", "MVP development tech stack", "MVP pitfalls…").
- **Schema.** A `FAQPage` JSON-LD on every service page, matching the visible FAQ exactly (8, 6 and 5 questions on the pages checked), plus `Organization`. No `Service` or `BreadcrumbList` schema was found.
- **Internal linking.**
  - The footer's expandable lists link to 50+ long-tail pages: technology (Next.js, Webflow, Sanity), industry × service (e.g. "Healthcare website design", "Logistics web design").
  - G1 pages have a "Related Services" slider.
  - Each FAQ includes cost and timeline questions to capture those searches.

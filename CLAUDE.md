# JobsiteRank — project state snapshot

**Live at:** https://jobsiterank.com
**Repo:** https://github.com/leoshah/jobsiterank-marketing
**Local path:** `c:\Users\pc\code\jobsiterank-marketing`
**Owner email:** leoshahnazari@gmail.com

This document is the canonical state of the project. Read it first when resuming a new session.

---

## 1. Project overview

JobsiteRank is a **marketing agency for plumbing shops in the US**. The site sells a productized service: a free website + missed-call text-back + review automation, with an upgrade tier that adds full local SEO, citations, GBP work, a branded mobile CRM, and re-activation campaigns.

- **Audience:** plumbing-shop owners (1–20 employees). Trades-savvy, not design-savvy. Skeptical of agencies. Hate paying lead-gen apps.
- **Hero offer:** "Never miss a lead again" — every missed call becomes a text in under 30 seconds, plus a free conversion-focused website is included.
- **Geography:** nationwide (all 50 states).
- **Trade focus:** plumbing only — site explicitly turns down HVAC, roofing, electrical, landscaping, painting, GCs.

---

## 2. Tech stack

- **Framework:** Astro 5.18.1 (static output, no SSR adapter)
- **Styling:** Tailwind CSS 4.2.4 via `@tailwindcss/vite` (NOT the `@astrojs/tailwind` integration). All design tokens defined in `src/styles/global.css` using `@theme {}` block and `@layer components`.
- **TypeScript:** strict mode (`tsconfig.json` extends `astro/tsconfigs/strict`)
- **Hosting:** Cloudflare Workers Static Assets (auto-deploys from `main` branch via Cloudflare's Git integration). Configured in `wrangler.jsonc`. **Not on Pages** — Cloudflare's new "Workers Builds" flow is what we used.
- **DNS / domain:** Cloudflare Registrar manages `jobsiterank.com`. Both apex and www are connected as Custom Domains in the Worker. SSL via Let's Encrypt, auto-renewing.
- **Fonts:** Google Fonts — Bricolage Grotesque (display), DM Sans (body), JetBrains Mono (rarely used now). Loaded via stylesheet link in `BaseLayout.astro`.
- **No JS libraries beyond Astro itself.** All animations are pure CSS keyframes. Tab switching + mobile nav + Calendly resize listener are tiny inline `<script is:inline>` blocks.
- **Calendly:** inline embed via `assets.calendly.com/assets/external/widget.js` script, real URL `https://calendly.com/gmbstrategysession/30min`.

### Local dev

```sh
cd c:/Users/pc/code/jobsiterank-marketing
# PowerShell may need: $env:Path = "C:\Program Files\nodejs;C:\Program Files\Git\cmd;$env:Path"
# npm.ps1 is blocked by execution policy — call npm.cmd directly
npm install
npm run dev          # http://localhost:4321
npm run dev -- --port 4322   # alternate port if 4321 in use
npm run build        # runs astro check && astro build
```

### Deploy

Push to `main` → Cloudflare Workers Builds runs `npm run build` then `npx wrangler deploy` automatically. Build typically takes ~90 sec total. There's a tiny `wrangler.jsonc` that points the asset directory at `./dist`.

`astro.config.mjs` notes:
- `site: 'https://jobsiterank.com'` (used for canonical URLs + OG tags)
- `build.format: 'file'` — generates flat `.html` files (`pricing.html`, not `pricing/index.html`) so Cloudflare doesn't 307-redirect `/pricing` → `/pricing/`
- `vite.server.allowedHosts: ['.trycloudflare.com']` — needed when sharing local previews via cloudflared tunnel
- `tailwindcss()` is wrapped in `/** @type {any} */` cast to silence a known Vite-typings variance between Astro 5's pinned Vite and `@tailwindcss/vite`'s peer Vite

---

## 3. File structure

```
c:\Users\pc\code\jobsiterank-marketing\
├── astro.config.mjs              # site, build.format, tailwind plugin, allowed hosts
├── wrangler.jsonc                # Cloudflare Workers config (assets dir = ./dist)
├── tsconfig.json                 # extends astro/tsconfigs/strict
├── package.json                  # scripts: dev, build, preview
├── public/
│   ├── favicon.svg               # ink bg + emerald JR monogram
│   └── og-image.svg              # 1200×630 OG image (SVG — needs PNG version for Facebook/Twitter/iMessage compatibility)
└── src/
    ├── components/
    │   ├── Header.astro          # sticky top header. Logo + nav (Home/Pricing/Case studies/Contact) + green "Book a demo" CTA. Mobile hamburger panel with same links + CTA. NO PHONE NUMBER (intentional).
    │   └── Footer.astro          # WHITE background (not dark). Brand block + 3-col: Product (incl. Blog link) / Get in touch / copyright row. NO COVERAGE column. NO PHONE NUMBER. Email link points to /contact instead of mailto.
    ├── layouts/
    │   └── BaseLayout.astro      # <head> with full OG + Twitter Card meta tags. Loads global.css + Google Fonts. Renders Header + slot + Footer + mobile floating "Book a demo" FAB (hidden on /contact).
    ├── styles/
    │   └── global.css            # @theme tokens (colors, fonts, radii, shadows). @layer components (.btn-accent, .btn-primary, .btn-outline, .btn-link, .card-flat, .card-soft, .card-mint, .card-dark, .eyebrow, .eyebrow-mint, .input-soft, .tag-pill, .check-bullet, .container-page, .section-padding, etc.)
    ├── data/
    │   └── caseStudies.ts        # TypeScript-typed array of 10 case studies + CATEGORIES list. EXPORTS: CaseStudy interface, CaseCategory type, CATEGORIES const, CASE_STUDIES const.
    └── pages/
        ├── index.astro           # Home. Hero (animated SMS thread mockup) → trust bar (4 stats) → CRM dashboard mockup section → video walkthrough placeholder section → 2-tier pricing → 3-card testimonial wall → FAQ accordion → bottom CTA. Inline <style> at bottom contains all hero animation keyframes + reduced-motion fallback. Tabbed showcase + 4 product category sections were ALL REMOVED.
        ├── pricing.astro         # 2-tier card grid (Never Miss a Lead $297 / Local Authority $497 — Flagship badge). "What we don't sell" section. Bottom CTA. NO comparison matrix (removed).
        ├── contact.astro         # Hero + Calendly inline embed (gmbstrategysession/30min) + dark "What to expect" 3-step card BELOW the calendar. NO sidebar. Calendly resize listener prevents internal scroll.
        ├── blog.astro            # Placeholder "Coming soon" page. 4 mock upcoming-post cards + email-capture form. Ready to be replaced with real posts when the time comes.
        └── case-studies/
            ├── index.astro       # Hero → pill filter bar (All / Text-back / Re-activation / Reviews / Leads) → 10-card responsive grid. Filter is vanilla-JS toggling display:none. Footer disclaimer about "representative" engagements.
            └── [slug].astro      # Dynamic route. Renders one case study with intake card + mint before/after sidebar + 6-metric grid + numbered timeline + dark testimonial card. NO breadcrumb at top (removed). Bottom has "Book a demo" + "All case studies" buttons.
```

### Removed files (gone from disk and history)

- `src/components/Marquee.astro` — old dossier-design top marquee
- `src/components/PageMastHead.astro` — old dossier-design page header

---

## 4. What's been built (current production state)

### Home page (`src/pages/index.astro`)
1. **Hero** with two-column grid: left = "★ Built for plumbers" pill + headline "Stop losing jobs to voicemail. Get found, get called, get booked." + subhead mentioning "$297/month" + dual CTA (green "Book a demo" + outline "See pricing") + 5-star rating row. Right = animated phone mockup with looped SMS thread (Mile-High Pipeworks / Karen). Animation runs on a 12-second loop, respects `prefers-reduced-motion`.
2. **Trust bar / stats grid** — 4 stats: `100+ Plumbing shops served`, `12s Avg auto-text response`, `4.9★ Average customer rating`, `$0 Setup fee, every tier`.
3. **CRM dashboard mockup section** — full-width card showing a fake "Mile-High Pipeworks · Pipeline" CRM with KPI strip (Jobs today / Calls captured / New reviews / Booked revenue) + 4-column pipeline (New / Quoted / Scheduled / Done) + live activity feed. Static, no animation.
4. **Video walkthrough placeholder section** — full-width dark card with play button, "Product walkthrough · 90 seconds · No signup required" text, 5 chip tags ("Real missed call", "Auto-text in 28 sec", etc.). Button doesn't actually play anything (placeholder for future video).
5. **Pricing tiers** — 2 white cards in a 2-column grid. Plan A: Never Miss a Lead $297 (no badge). Plan B: Local Authority $497 (green "Flagship" badge). Both have green "Book a demo" CTAs. Both visually identical except badge.
6. **Testimonial wall** — 3 cards: Mike T. (Bluebonnet/Austin), Karen M. (Mile-High/Denver), Diego L. (Saguaro/Phoenix).
7. **FAQ accordion** — 6 entries answering plan differences, "is the website really free", how the system works vs HomeAdvisor, etc.
8. **Bottom CTA** — dark section with "Ready to stop missing jobs?" + green "Book a demo" button only (no phone number).

### Pricing page (`src/pages/pricing.astro`)
1. **Hero** — centered "Two plans. Free website with both." headline.
2. **Tier cards** — 2 white cards in 2-column grid. Same as home page. Sublines: both are `✓ Cancel anytime · ✓ No setup fee · ✓ Free website included`.
3. **What we deliberately don't sell** — 4 cards: Paid Google Ads, Logo + brand identity, Social content production, Trades outside our wheelhouse.
4. **Bottom CTA** — dark section.

### Case studies (`/case-studies` index + 10 detail pages)
- Index has filter pills (All 10 / Text-back 4 / Re-activation 3 / Reviews 2 / Leads 1) and a 10-card grid.
- Each detail page has intake facts, before/after sidebar, 6-metric grid, 5-step timeline, dark testimonial card.
- All 10 are tagged `representative: true` (illustrative content). Disclaimer at bottom of index page calls this out.

**Final 10 cases (file numbers 002-011, sequential):**

| # | Slug | Business | Location | Theme |
|---|---|---|---|---|
| 002 | mile-high-pipeworks-denver | Mile-High Pipeworks | Denver, CO | Text-back |
| 003 | gulfshore-plumbing-tampa | Gulfshore Plumbing Co. | Tampa, FL | Text-back |
| 004 | bluebonnet-plumbing-austin | Bluebonnet Plumbing | Austin, TX | Text-back |
| 005 | saguaro-plumbing-phoenix | Saguaro Plumbing Co. | Phoenix, AZ | Re-activation |
| 006 | tarheel-plumbing-charlotte | Tarheel Plumbing Co. | Charlotte, NC | Re-activation |
| 007 | wasatch-pipeworks-salt-lake | Wasatch Pipeworks | Salt Lake City, UT | Re-activation |
| 008 | rose-city-plumbing-portland | Rose City Plumbing | Portland, OR | Hybrid (text-back tag) |
| 009 | peach-state-plumbing-atlanta | Peach State Plumbing | Atlanta, GA | Reviews |
| 010 | tideway-plumbing-long-island | Tideway Plumbing | Long Island, NY | Reviews |
| 011 | bayou-city-pipeworks-houston | Bayou City Pipeworks | Houston, TX | Leads |

### Contact page (`src/pages/contact.astro`)
- Hero: "Pick a time. We'll show you how it works."
- **Calendly inline embed** — real URL `https://calendly.com/gmbstrategysession/30min`. Resize listener prevents internal scrollbar.
- **"What to expect"** — dark card BELOW the calendar with 3 horizontal steps.
- No sidebar, no contact info card, no phone number.

### Blog page (`src/pages/blog.astro`)
- Placeholder. "Coming soon" hero + 4 upcoming-post cards + email capture form. Wired into the footer "Product" column.

---

## 5. Design decisions

### Color palette (defined in `src/styles/global.css` `@theme`)

```css
--color-ink:           #0E1B22   /* primary dark, almost black */
--color-ink-soft:      #1E2A33   /* slightly lighter ink for hovers */
--color-paper:         #FFFFFF   /* main bg */
--color-cream:         #FAFAF7   /* alt section bg, subtle warmth */
--color-mint:          #ECFDF5   /* soft accent bg (cards, pills) */
--color-accent:        #10B981   /* emerald — primary CTA color */
--color-accent-dark:   #047857   /* deep emerald for hover */
--color-accent-soft:   #D1FAE5   /* subtle emerald tint */
--color-warning:       #F59E0B   /* amber — used for star ratings only */
--color-slate-{50..900}          /* full slate range for text + borders */
```

### Typography
- **Display headlines:** `font-display` = Bricolage Grotesque, weights 500/600/700, tight tracking
- **Body / UI:** `font-sans` = DM Sans
- **Mono:** `font-mono` = JetBrains Mono — declared in CSS but rarely used in current design

Headline sizing: hero h1 around `text-[2.4rem] sm:text-[3.2rem] md:text-[3.8rem]`. Section h2 around `text-[2.2rem] md:text-[3rem]`. Body around `text-[1.05rem]`.

### Component patterns
- **Buttons:** all rounded-full pills. Three styles: `.btn-accent` (emerald), `.btn-primary` (ink/dark), `.btn-outline` (white with slate border). Hover transforms: `translateY(-1px)` + shadow lift.
- **Cards:** rounded-`2xl` (24px). Three variants: `.card-flat` (white + slate-200 border), `.card-soft` (same but with hover lift + shadow), `.card-mint` (mint bg + accent-soft border), `.card-dark` (ink bg + paper text).
- **Eyebrows:** small green dot + uppercase label (`.eyebrow`) for section headers. Pill version (`.eyebrow-mint`) used ONLY on home hero "★ Built for plumbers" — explicitly removed from every other page hero.
- **Section padding:** `.section-padding` = 5rem mobile / 7rem desktop. `.section-padding-tight` = 3.5rem / 5rem.

### Brand voice / copy rules
- **Sentence case everywhere, never title case.** Headlines, buttons, eyebrows.
- Direct, contractor-voice quotes. Short, declarative. No marketing buzzwords like "synergy", "leverage", "transform". Yes to "we", "you", numbers, contractions.
- Numbers should feel realistic — not all multiples of 10. Acknowledge limits: "not yet #1", "Houston is the toughest market we've worked", etc.
- No emojis.
- ✓ checkmarks are fine (they're text, not emoji).

### Layout patterns from owner.com inspiration
- Generous whitespace, alternating cream/white section backgrounds
- Big bold headlines + soft body copy
- Phone mockup in hero
- Soft drop shadows over hard shadows
- Pill-shaped CTAs

### What we DON'T offer (don't add these as features)
- **No phone number** anywhere on the site (removed from header, footer, mobile menus, hero, bottom CTA — intentionally CTA-only).
- **No negative-review resolution.** We do review *requests* (auto-ask after every job), *smart routing* (happy → Google, unhappy → private form), and *replies* (our team responds to all reviews). We do NOT actively resolve / fix posted negative reviews.
- **No AI Receptionist.** It was an offering during prior iterations, then removed. Don't reintroduce.
- **No paid Google Ads management, no logo/brand work, no Instagram/social content production, no other trades.**

### Pricing model (current, locked)
- **2 tiers only:**
  - **Never Miss a Lead — $297/mo:** Free website, missed-call text-back (under 30s), dedicated business number, two-way SMS inbox, mobile messaging app, weekly missed-call recovery report, review request automation, smart routing, smart cooldown, monthly review-volume report. (10 features.)
  - **Local Authority — $497/mo:** Everything in NMaL + Google My Business optimization, GBP posts (2×/wk), online directory listings (Yelp, Apple Maps, Bing & more — DO NOT say "NAP citations" or "80+ directories", that copy was simplified for plumber audience), review responses by our team, full CRM with lead pipeline, full branded mobile CRM, local on-page SEO + service-area pages, quarterly re-activation campaigns. (8 added features.)
- **Both tiers:** Cancel anytime, no setup fee, free website included.
- **No add-ons. No third tier. No 90-day minimum.**

---

## 6. What's NOT yet built / pending

### OG image PNG version
The OG image at `/public/og-image.svg` works on Slack/Discord/LinkedIn but not reliably on Facebook, Twitter, or iMessage (those prefer PNG/JPG). **TODO:** convert the SVG to a 1200×630 PNG, save as `/public/og-image.png`, then change `BaseLayout.astro` line ~22 from `${siteUrl}/og-image.svg` → `${siteUrl}/og-image.png`. Owner can do this via cloudconvert.com or an SVG-to-PNG tool.

### Blog content
`/blog` is a placeholder page only. The 4 mock post cards in `blog.astro` are illustrative. Owner should either:
- Write real blog posts (would require a CMS or just adding individual `.astro` pages under `src/pages/blog/`)
- Or remove the page + footer link if blog isn't a near-term priority

### Real testimonial sources
All 10 case studies are flagged `representative: true` (illustrative). Owner should replace with real engagements as they accumulate. The data structure makes this easy — edit `src/data/caseStudies.ts`, change `representative: true` → `false` (or remove the field), update business name/location/numbers. URLs stay stable because they're derived from `slug`.

### Video walkthrough placeholder
The home page has a video placeholder section with a play button that doesn't link to anything. **TODO:** record a real 90-second product walkthrough, host on YouTube/Vimeo/Loom, replace the `<button>` element with an iframe or click-to-load video.

### Contact / email
- The footer's email link currently points to `/contact` (the page) instead of `mailto:hello@jobsiterank.com`. This was intentional after removing the phone number — keeping all contact paths funneled through Calendly.
- Cloudflare Email Routing for `hello@jobsiterank.com` was discussed but never set up. The address doesn't actually receive mail. Decide: set up Email Routing, or remove the email reference from anywhere it appears.

### Hero phone mockup nuance
The "Live · Pasadena, CA" line in the hero phone mockup demo is a holdover from when Plumbing Geeks (Pasadena) was the anchor case. After the Plumbing Geeks removal, the mockup business name was changed to "Mile-High Pipeworks" but the city tag was left at "Pasadena, CA". **Cosmetic mismatch** — should probably be "Denver, CO" to match. (See `src/pages/index.astro` around line 145, search for `"Live · Pasadena"`.)

### Cloudflared share tunnel
A cloudflared tunnel was started during development (background task `bzpc324d6`) at port 4322 for sharing previews. Likely no longer running but if processes are lingering, kill them.

---

## 7. Git state, tags, rollback

### Branches
- `main` — production (deployed automatically)
- `redesign-owner-style` — the redesign branch, already merged. Can be deleted.
- `conversion-improvements` — old branch from v1.x era. Already merged. Can be deleted.

### Tags (rollback points)

| Tag | Commit | What it represents |
|---|---|---|
| `v1.0-shipped` | efc61b3 | Original launch (dossier design — dark ink/cream/amber palette, "File 001" framing, brutalist hard-edge cards, marquee ticker) |
| `v1.1-conversion` | d34f3b6 | Conversion improvements era (still dossier design, hero reframed around missed-call-text-back, demo CTAs, mobile tap-to-call bar) |
| `v1.3-pre-redesign` | 4db9c85 | Last dossier version before today's owner.com-inspired rebuild |
| **`v2.0-redesign`** | a1c56d7 | Original redesign launch — owner.com-inspired modern SaaS look (slate + emerald palette) |

**Current production is well past v2.0-redesign** (commit `f2324f5` at time of writing). The tag is just a milestone marker.

### Rollback recipes
- Revert to dossier design: `git reset --hard v1.3-pre-redesign && git push --force origin main` — Cloudflare redeploys in ~90 sec.
- Revert to redesign launch: `git reset --hard v2.0-redesign && git push --force origin main`.
- Single-file revert: `git checkout <tag> -- path/to/file && git commit && git push`.

---

## 8. Resuming work checklist

When picking this up in a new session:

1. `cd c:\Users\pc\code\jobsiterank-marketing`
2. `git pull` to grab anything that landed since last work
3. `git status` to confirm clean tree
4. Run `npm install` if `node_modules` is stale (e.g., new machine)
5. `npm run dev` (or `-- --port 4322` if 4321 is taken) → http://localhost:4321
6. Verify production is matching expectations: `curl -I https://jobsiterank.com` — should be 200
7. Read this file again before making changes — it captures what NOT to add (phone number, AI Receptionist, negative-review resolution, NAP jargon, exact directory counts, third tier, 90-day minimum, dossier-style components).

### Key environment notes (Windows-specific)
- Node is at `C:\Program Files\nodejs\` but NOT on PATH. PowerShell sessions need: `$env:Path = "C:\Program Files\nodejs;C:\Program Files\Git\cmd;$env:Path"`.
- `npm.ps1` is blocked by execution policy. Use `& "C:\Program Files\nodejs\npm.cmd"` for npm commands in PowerShell, or just use Bash for git/build commands.
- `gh` CLI is NOT installed. GitHub interactions go through Git Credential Manager (cached from initial repo creation).

---

*Last updated: end of session ending at commit `f2324f5` (2026-05-02). All changes through that commit are live on https://jobsiterank.com.*

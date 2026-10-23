# Portfolio Foundation Specification

**Status:** Implementation-ready (planning only)  
**Owner:** Godric G. Ramelo  
**Audience for this doc:** Implementation session + design session  
**Repo inspected:** `gph-portfolio` (App Router, Next.js 16.4.2)  
**Constraint:** No visual layout, typography, color, spacing, or grid decisions. Design session owns those.

---

## 1. Repository assessment

### 1.1 Verified facts (seen in repo)

| Item | Finding | Label |
|------|---------|-------|
| Package name / version | `gph-portfolio` `0.1.0`, `private: true` | **Verified** |
| Next.js | `16.4.2` | **Verified** |
| React / React DOM | `19.3.0` | **Verified** |
| TypeScript | `^5`, `strict: true`, `allowJs: true` | **Verified** |
| Router | App Router only (`app/`); no `pages/` | **Verified** |
| `src/` | Not used; app at repo root `app/` | **Verified** |
| Path alias | `@/*` → `./*` (`tsconfig.json`) | **Verified** |
| Package manager | `package-lock.json` present → npm | **Verified** |
| Scripts | `dev`, `build`, `start`, `lint` only — no `typecheck` script | **Verified** |
| Lint | ESLint 9 flat config: `eslint-config-next` core-web-vitals + typescript | **Verified** |
| Prettier | No Prettier config found | **Verified** (absent) |
| Styling | Tailwind CSS v4 via `@import "tailwindcss"` in `app/globals.css`; `@tailwindcss/turbopack` in `next.config.ts` | **Verified** |
| Component library | None | **Verified** |
| Fonts | `Geist` + `Geist_Mono` via `next/font/google` in `app/layout.tsx` (CSS variables). Design session may replace; approach stays `next/font`. | **Verified** |
| Images | `next/image` used on boilerplate home; `public/` has create-next-app SVGs only | **Verified** |
| Favicon | `app/favicon.ico` (default) | **Verified** |
| Root layout | Server Component; exports boilerplate `metadata`; `lang="en"`; body `min-h-full flex flex-col` | **Verified** |
| Home | Boilerplate Create Next App content | **Verified** |
| Existing routes | `/` (`app/page.tsx`), `/about-me` (empty), `/contacts` (empty), `/projects` (empty) | **Verified** |
| Components | `app/NavBar.tsx` (placeholder anchors; **not imported** by layout); empty `app/components/` | **Verified** |
| Content / data modules | None | **Verified** |
| CMS / DB / API / global state | None | **Verified** |
| Next config | `cacheComponents: true`, `partialPrefetching: true`, Turbopack CSS rule for Tailwind | **Verified** |
| Git | Single commit “Initial commit from Create Next App”; **no remote** | **Verified** |
| Deployment / domain | Not configured; owner confirmed no production domain for v1 | **Verified** (absent) |
| MedicaOne / portfolio content in code | None — only CNA boilerplate + empty stubs + unused NavBar | **Verified** |
| Agent note | `AGENTS.md` requires reading `node_modules/next/dist/docs/` before implementation (Next 16 breaking changes) | **Verified** |

### 1.2 Assumptions (inferred)

| Item | Assumption | Basis |
|------|------------|-------|
| Typed routes | `LayoutProps<"/">` in layout implies Next-generated route types (`.next/dev/types`) | Layout signature + `next-env.d.ts` references |
| Image API | Prefer current Image props from Next 16 docs (`preload` over legacy `priority` where applicable) | Local Next 16 Image docs; home still uses `priority` (boilerplate drift) |
| Static portfolio fit | With `cacheComponents` + local typed data + no request APIs, routes can stay fully static | Config + content strategy |
| Contact channel | Primary email `godricramelo@gmail.com`; phone `09271790706` for résumé/footer as owner-supplied | Owner résumé block in prompt |
| OJT timeframe | Feb–May 2026 is completed relative to this planning date (2026-10-23) | User info date + résumé dates |

### 1.3 Unknown / still open

| Item | Notes |
|------|-------|
| Portfolio production domain / canonical URL | **Owner confirmed: none.** Do not set `metadataBase` or absolute canonicals. |
| GitHub / LinkedIn / other profile URLs | Not confirmed |
| Public GitHub repo URLs for MedicaOne / FoodHub / SideScroll | Not provided |
| FoodHub / SideScroll live demos | Not provided |
| FoodHub / SideScroll screenshots | Owner confirmed: not included for now — use forthcoming state |
| Academic honors | Explicitly require owner confirmation |
| FoodHub OAuth / RBAC as shipped features | Claimed in earlier résumé copy; not verified — remain omitted |

### 1.3b Owner answers incorporated (2026-10-23 follow-up)

| Topic | Resolution | Label |
|-------|------------|-------|
| Portfolio domain | None — omit `metadataBase` / canonical | **Verified** (owner) |
| Résumé PDF | `public/assets/Godric_Ramelo-Resume.pdf` → URL `/assets/Godric_Ramelo-Resume.pdf` | **Verified** (repo) |
| OJT title | “OJT / Intern — Technical Support and Data Encoding” | **Verified** (owner) |
| OJT org | “City Government of Olongapo — LEDIPO-BPLO” | **Verified** (owner) |
| OJT bullets | Encoding; applicant assistance; mobile adaptation / usability (owner wording below) | **Verified** (owner) |
| MedicaOne live site | `https://medica-one.site` | **Verified** (owner) |
| MedicaOne public framing | Digital prescription management platform (per live landing); portfolio summary focuses on three core areas (below) | **Verified** (owner) |
| MedicaOne narrative weight | One case study among projects — do **not** center the whole portfolio on healthcare software | **Verified** (owner) |
| MedicaOne screenshots | 11 PNGs under `public/assets/MedicaOne Screenshots/` (spaces in path/names) | **Verified** (repo) |

### 1.4 Conventions to preserve

1. **App Router + TypeScript + `@/*` alias** — extend; do not introduce Pages Router or `src/`.
2. **Tailwind v4 + `globals.css` + CSS variables** — sole styling system. No CSS Modules, no second UI kit, no styled-components.
3. **Server Components by default** — match root layout pattern; Client Components only where interaction requires it.
4. **Route-level / layout `metadata`** — replace boilerplate; use `generateMetadata` for dynamic case-study segments.
5. **Reuse `app/NavBar.tsx` and empty `app/components/`** — rewrite NavBar links/content; put new shared components under `app/components/`.
6. **Keep `cacheComponents` / `partialPrefetching`** — do not disable for convenience; keep content static so they help rather than constrain.
7. **npm** — lockfile is source of truth for installs in later sessions.

### 1.5 Adaptation rules applied

| Default from prompt | Repo reality | Decision |
|---------------------|--------------|----------|
| `/about` | Folder is `app/about-me/` | **Keep `/about-me`** as the About route. Map all “about” content here. Do not create `/about` unless owner later requests a redirect. |
| No contact route; mailto in chrome | Empty `app/contacts/` exists | **Do not ship a Contact page.** Contact = `mailto:` (+ optional `tel:`) in nav/footer. Leave `/contacts` unimplemented; implementation may delete the stub or add a temporary redirect — either is fine; do not build form or page content. |
| `/projects/[slug]` case studies | Only empty `/projects` index | Add `app/projects/[slug]/page.tsx` with `generateStaticParams`. |
| Reuse components | NavBar unused + wrong links | Repurpose NavBar; do not invent a second nav. |
| Stay in styling system | Tailwind v4 present | All styling tokens/classes via Tailwind + `globals.css` variables; design session fills values. |
| Static typed local data | No content pattern yet | Introduce `content/` modules (typed TS) at repo root, imported via `@/content/...`. |
| Domain for SEO | Owner: no production domain | Omit `metadataBase` / absolute canonical permanently for v1. Defer `sitemap.ts`/`robots.ts` absolute URLs, or ship only after a domain exists. |

### 1.6 Leftover / conflicting material to replace

- Home Create Next App copy, Vercel/Next marketing links, and CNA SVGs usage on home.
- Root metadata title/description (“Create Next App”).
- NavBar placeholder destinations (`/services`, `/products`, `/blog`, duplicate Contact).
- Empty `/contacts` page (architectural dead end for v1).
- Dark-mode CSS media query in `globals.css` is boilerplate — design session decides theme; implementation must not treat dark styling as a product requirement until design says so.

---

## 2. Final route and content hierarchy

### 2.1 Definitive routes

| Route | Purpose | Tier | Owns (unique content) |
|-------|---------|------|------------------------|
| `/` | Position owner for entry-level IT; summarize proof; drive to case studies + résumé + contact | **Must** | Identity, short positioning, featured project teasers, currently learning snapshot, primary CTAs |
| `/projects` | Index of all case-study previews with equal discovery | **Must** | Full project list (all three); no deep case-study body |
| `/projects/medicaone` | Evidence-backed MedicaOne case study | **Must** | Full project narrative + screenshots + tech + limitations |
| `/projects/foodhub` | Evidence-backed FoodHub case study | **Must** | Same model |
| `/projects/sidescroll` | Evidence-backed SideScroll case study | **Must** | Same model |
| `/about-me` | Background, education, experience, skills, learning — human context for evaluators | **Must** | Expanded bio, education, experience detail, skill inventory, currently learning (full), résumé download |

**Not in v1 routes**

| Path | Decision |
|------|----------|
| `/contacts`, `/contact` | No page. Mailto/tel in SiteHeader / SiteFooter. |
| `/services`, `/products`, `/blog` | Remove from NavBar; do not create. |

### 2.2 Shared chrome (all routes)

| Region | Semantic role | Content ownership |
|--------|---------------|-------------------|
| Site header / nav | Landmark `banner` + `navigation` | Site name/identity link to `/`; links to Home, Projects, About; Résumé download; Contact mailto |
| Site footer | Landmark `contentinfo` | Name; mailto; optional tel; optional profile links when approved; short rights/line |

### 2.3 Semantic section order (comprehension / a11y — not visual layout)

Order below is **document outline / reading order**, not placement on screen.

#### `/` Home — **Must**

1. **Identity & positioning** (primary): name; role framing (BSIT undergraduate · web / UI usability / tech support); one short summary sentence.
2. **Primary actions** (primary): link to Projects; résumé download; mailto contact.
3. **Featured work** (primary): 2–3 project teasers (all three preferred for honesty/completeness within a week).
4. **Currently learning** (secondary): short list (3 items max on home).
5. **Optional:** single-line location (Calapacuan / Subic, Zambales) — secondary.

Home **must not** duplicate full case-study sections, full skill taxonomy, or full experience bullets.

#### `/projects` — **Must**

1. **Page intro** (primary): heading + one sentence on what the index contains.
2. **Project preview list** (primary): one preview per project (title, summary, tech chips, status, link to case study, optional thumbnail).

#### `/projects/[slug]` — **Must**

1. **Title + summary**
2. **Meta strip** (type, status, role, tech) — structured, not decorative fluff
3. **Problem / motivation**
4. **Intended users**
5. **Contributions** (honest scope, including AI-assisted where true)
6. **Features** (only verified / approved)
7. **Challenges & decisions**
8. **Screenshots** (informative images with captions)
9. **Outcomes** (only verified; else omit section)
10. **Limitations / unfinished work**
11. **Lessons & improvements**
12. **External links** (repo / live demo — omit individually if absent)
13. **Back to projects** link

#### `/about-me` — **Must**

1. **About intro** (who + seeking)
2. **Experience** (OJT)
3. **Education**
4. **Skills** (evidence-linked levels)
5. **Currently learning** (fuller than home)
6. **Résumé download** + contact mailto

### 2.4 Why this IA

- Matches owner goal: balanced IT portfolio, evidence on case studies, résumé always reachable.
- Respects existing `/about-me` and `/projects` stubs.
- Avoids content duplication: home summarizes; case studies prove; about contextualizes.

---

## 3. Content inventory and data models

### 3.1 Content module layout (proposed; no files created in this session)

```
content/
  site.ts          // site identity, nav, contact, seo defaults
  projects.ts      // Project[] + getters
  experience.ts
  education.ts
  skills.ts
  learning.ts
  types.ts         // shared contracts
```

Import via `@/content/...`. Pure TS modules; no CMS/API.

### 3.2 Shared TypeScript contracts

```ts
/** Evidence-linked skill proficiency — never percentages */
export type SkillLevel =
  | "foundational"
  | "practical-familiarity"
  | "used-in-completed-project"
  | "learning";

export type ProjectType =
  | "academic"
  | "personal"
  | "internship-related"
  | "other";

export type ProjectStatus =
  | "completed"
  | "in-progress"
  | "prototype"
  | "archived";

export type LearningStatus = "active" | "paused" | "completed-intro";

export interface ProjectScreenshot {
  /** Public path, e.g. /images/projects/medicaone/dashboard.png */
  src: string;
  alt: string; // informative; describe UI purpose, not "screenshot"
  caption?: string;
  width: number;  // intrinsic px — required for next/image
  height: number;
}

export interface ProjectLink {
  label: string;
  href: string;
  kind: "repo" | "live" | "other";
}

export interface Project {
  id: string;
  slug: "medicaone" | "foodhub" | "sidescroll" | (string & {});
  title: string;
  summary: string; // 1–3 sentences
  problem: string;
  intendedUsers: string;
  type: ProjectType;
  status: ProjectStatus;
  role: string;
  contributions: string[]; // honest bullets
  technologies: string[];
  features: string[]; // only substantiated
  challenges: string[];
  outcomes: string[]; // verified only; empty => hide section
  limitations: string[];
  lessons: string[];
  screenshots: ProjectScreenshot[]; // empty => show missing-asset state
  links: ProjectLink[]; // omit unavailable links entirely
  caseStudyPath: string; // e.g. /projects/medicaone
  featured: boolean; // home teaser inclusion
}

export interface ExperienceItem {
  id: string;
  organization: string;
  location: string;
  title: string;
  employmentType: string; // e.g. "On-the-Job Training / Intern"
  start: string; // display string or ISO — keep consistent site-wide
  end: string;
  responsibilities: string[];
}

export interface EducationItem {
  id: string;
  institution: string;
  location: string;
  credential: string; // "Bachelor of Science in Information Technology"
  status: "undergraduate" | "graduate"; // undergraduate for owner
  expectedCompletion?: string; // "2027"
  coursework: string[];
  honors: string[]; // empty unless owner confirms
}

export interface SkillItem {
  id: string;
  name: string;
  level: SkillLevel;
  /** Project slug or experience id that evidences the level */
  evidenceRef?: string;
  evidenceNote?: string;
}

export interface SkillCategory {
  id: string;
  label: string;
  items: SkillItem[];
}

export interface LearningItem {
  id: string;
  topic: string;
  status: LearningStatus;
  objective: string;
  relatedActivity?: string; // e.g. "Service Desk Simulator exercises"
  updatedAt?: string; // optional ISO date
}

export interface ContactInfo {
  email: string;
  phoneDisplay?: string;
  phoneTel?: string; // E.164 or local tel: value — owner to confirm format
  locationDisplay?: string;
  profiles: { label: string; href: string }[]; // empty until approved
}

export interface ResumeAsset {
  /** Public path when file exists */
  href?: string;
  label: string; // e.g. "Download résumé (PDF)"
  available: boolean;
}

export interface SiteMetadata {
  siteName: string;
  defaultTitle: string;
  titleTemplate: string; // e.g. "%s · Godric G. Ramelo"
  defaultDescription: string;
  locale: string; // "en"
  /** Set only when production domain is known */
  metadataBase?: string;
  ogImagePath?: string; // optional; omit if missing
}
```

### 3.3 Field rules (projects)

| Field | Required? | If absent / empty |
|-------|-----------|-------------------|
| id, slug, title, summary, problem, intendedUsers, type, status, role | Required | Block publish of that case study until filled |
| contributions, technologies, features, challenges, limitations, lessons | Required arrays (may be empty only for outcomes/screenshots/links) | Empty `features`/`challenges`/etc. → omit that subsection heading |
| outcomes | Optional (array) | Hide Outcomes section |
| screenshots | Optional | Show “Screenshots forthcoming” unavailable state; case study still shippable |
| links | Optional | Hide link row / individual missing kinds |
| featured | Required bool | `false` → not on home; still on `/projects` |

### 3.4 Content inventory (source → status)

#### Site / contact / résumé

| Item | Purpose | Source | Req? | Format | Accuracy rule | Consumed on | Status |
|------|---------|--------|------|--------|---------------|-------------|--------|
| Name | Identity | Owner | Yes | string | Exact legal/preferred name | All chrome, home, about, SEO | **Verified** (prompt): Godric G. Ramelo |
| Email | Contact | Owner | Yes | email | Working mailto | Header, footer, about | **Verified** (prompt) |
| Phone | Contact | Owner | Optional | display + tel | Owner confirms tel: format | Footer / résumé | **Needs approval** (display given; tel normalization unknown) |
| Location | Context | Owner | Optional | short string | No invented city branding | Home optional, about, résumé | **Verified** (prompt): Calapacuan Subic Zambales |
| Résumé file | Download | Owner asset in repo | Must | PDF | Path must remain valid; on-page claims must not contradict PDF | Header, home, about | **Verified**: `/assets/Godric_Ramelo-Resume.pdf` (`available: true`) |
| Profiles | Credibility | Owner | Optional | URL list | Do not invent | Footer | **Missing** / **Owner input needed** |
| Site domain | Canonical SEO | Owner | No | — | No invented domain | metadataBase, sitemap | **Verified absent** — leave unset |
| Default SEO blurb | SERP | Derived from summary | Yes | ≤160 chars target | No inflated claims; balanced IT positioning (not healthcare-only) | Root metadata | **Assumed** draft from summary — owner may edit |

#### Experience (OJT) — locked copy

| Item | Value | Status |
|------|-------|--------|
| Title | OJT / Intern — Technical Support and Data Encoding | **Verified** (owner) |
| Organization | City Government of Olongapo — LEDIPO-BPLO | **Verified** (owner) |
| Location | Olongapo City, Zambales, Philippines | **Assumed** from prior résumé context — keep unless owner corrects |
| Dates | February 2026 – May 2026 | **Verified** (earlier owner résumé) |
| QA / “UI Designer” as job title | **Do not use** as official title | **Verified** superseded by owner wording |
| Responsibility 1 | Encoded applicant information and processed application records across digital systems to support permit application processing and record organization. | **Verified** (owner) |
| Responsibility 2 | Assisted permit applicants with navigating the digital permitting system and completing application-related tasks. | **Verified** (owner) |
| Responsibility 3 | Contributed to the mobile adaptation of the web-based permitting system, with attention to usability and interface layout. | **Verified** (owner) |
| Metrics | None | Do not invent |

#### Education

| Item | Status |
|------|--------|
| Gordon College, Olongapo City, BSIT | **Verified** (owner) |
| Undergraduate, expected 2027 | **Verified** (owner context) — never say “graduate” |
| Coursework list | **Verified** (résumé block) |
| Dean’s List / honors | **Missing** — omit until confirmed |

#### Skills (starting inventory — levels provisional)

All listed technologies from owner inventory enter data with provisional levels; **Needs approval** before launch copy is final. Evidence links preferred.

| Skill | Provisional level | Evidence basis | Status |
|-------|-------------------|----------------|--------|
| HTML, CSS | foundational | Academic + projects | **Assumed** pending owner confirm |
| JavaScript | used-in-completed-project / practical | Projects | **Assumed** |
| TypeScript | practical-familiarity / foundational | MedicaOne “where applicable” | **Needs approval** |
| React, Next.js | used-in-completed-project | MedicaOne | **Assumed** |
| Angular | used-in-completed-project | FoodHub, SideScroll | **Assumed** |
| Tailwind CSS | practical-familiarity | MedicaOne | **Assumed** |
| PHP, MySQL | used-in-completed-project | FoodHub, SideScroll | **Assumed** |
| Firebase / Firestore | used-in-completed-project | MedicaOne | **Assumed** |
| MongoDB | foundational | Résumé “basic familiarity” | **Assumed** |
| Git, GitHub, VS Code, DevTools | practical-familiarity | Workflow | **Assumed** |
| Figma, Canva | foundational | Résumé | **Assumed** |
| AI-assisted development | practical-familiarity | Owner-confirmed SideScroll; general workflow | **Verified** as practice — never claim as certification |

#### Currently learning

| Topic | Status field | Source | Content status |
|-------|--------------|--------|----------------|
| Service Desk Simulator exercises | active | Owner | **Verified** as learning activity — **not** experience/cert |
| Networking fundamentals | active | Owner | **Verified** as learning |
| Strengthening web development & interface design | active | Owner | **Verified** as learning |

#### Projects — MedicaOne — locked public framing

| Field | Value / rule | Status |
|-------|--------------|--------|
| Public product line | Digital Prescription Management (align with live landing at medica-one.site) | **Verified** (owner) |
| Portfolio summary focus (only these three core areas) | (1) Prescription template creation and digital prescription issuing; (2) Prescription and medication management; (3) Medication reminders and tracking | **Verified** (owner) |
| Narrative weight | **One case study among three** — home/about positioning stays balanced IT (web / usability / support); do not frame the portfolio as a healthcare-software specialist site | **Verified** (owner) |
| Barangay / clinic naming | Omit from default portfolio copy unless owner later restores | **Assumed** safe default after owner shifted framing to product capabilities |
| Broader patient-admin screens in assets | May appear as secondary evidence; do **not** expand Must case-study feature claims beyond the three core areas | **Verified** (assets exist; scope rule from owner) |
| Stack | Next.js, React, TypeScript where applicable, Firebase Auth, Firestore, Tailwind | **Assumed** — confirm vs project if claims expand |
| Live demo | `https://medica-one.site` (`kind: "live"`) | **Verified** (owner) |
| Repo URL | Omit until supplied | **Missing** |
| Outcomes / metrics | None invented | Empty until owner supplies |
| Screenshots | See §7.1b — synthetic/anonymized data only; no real patient PHI | **Verified** files present; content honesty still required |

#### Projects — FoodHub

| Field | Draft content rule | Status |
|-------|--------------------|--------|
| Stack | Angular, PHP, MySQL | **Assumed** — verify implementation |
| Features | CRUD, responsive UI | **Assumed** from résumé |
| OAuth / RBAC | Include **only** if substantiated in project | **Needs approval** — default **omit** |
| Screenshots / links | | **Missing** |

#### Projects — SideScroll

| Field | Draft content rule | Status |
|-------|--------------------|--------|
| Stack | Angular, PHP, MySQL | **Assumed** — verify |
| Features | CRUD, authentication, content management | **Assumed** |
| AI-assisted coding | Explicit contribution/lesson language | **Verified** (owner) |
| Screenshots / links | | **Missing** |

### 3.5 Authored vs structured

| Kind | Examples | Storage |
|------|----------|---------|
| Structured | slugs, tech arrays, dates, skill levels, link kinds | Typed fields in `content/*.ts` |
| Authored prose | summaries, problem, lessons, about intro | String fields in same modules (not MDX for v1 — keep Must scope small) |

**Could / Defer:** MDX case studies.

---

## 4. Component registry

**Legend:** S = Server Component (default) · C = Client Component · Plain = prefer semantic markup in the page, no new file.

| Component | Responsibility | Props / contract (signature) | Reuse | S/C | External deps | A11y notes | Notes |
|-----------|----------------|------------------------------|-------|-----|---------------|------------|-------|
| `RootLayout` (existing) | Document shell, fonts, global metadata base, header+footer slot | `children` | Site-wide | S | `next/font`, globals.css | `lang`; landmarks via children | Replace boilerplate metadata; mount header/footer |
| `SiteHeader` (evolve `NavBar`) | Primary nav + résumé + contact | `navItems`, `resume`, `contactEmail` | All pages | S | `next/link` | `banner`; `nav` with accessible name; current page indication (`aria-current`) | **Reuse** `app/NavBar.tsx` (rewrite). Prefer `next/link` over raw `<a>` for internal routes |
| `SiteFooter` | Secondary identity + contact + optional profiles | `contact`, `profiles` | All pages | S | none beyond Link | `contentinfo` | New under `app/components/` |
| `PageIntro` | Consistent H1 + optional lede | `{ title: string; lede?: string }` | projects, about, optional home | S | none | Exactly one H1 per page via this or page-owned H1 — do not double | Thin wrapper OK; **or stay plain** in page |
| `ProjectPreview` | One project teaser/card-or-list-item for index/home | `{ project: Pick<Project, "slug"\|"title"\|"summary"\|"technologies"\|"status"\|"caseStudyPath"\|"screenshots"> }` | `/`, `/projects` | S | `next/image`, `next/link` | Title in heading; link name clear (“Case study: {title}”) | Not a visual “card” mandate — structure only |
| `ProjectMeta` | Type/status/role/tech disclosure | `{ type, status, role, technologies }` | Case study | S | none | Use description list or labeled groups | |
| `ScreenshotFigure` | One informative screenshot | `ProjectScreenshot` | Case study | S | `next/image` | `figure`/`figcaption`; meaningful `alt`; dimensions required | Missing src → do not render broken img; parent handles empty list |
| `ExternalTextLink` | Repo/live/other | `ProjectLink` | Case study, footer | S | none | `rel` for external (`noopener noreferrer`); announce new tab if `target=_blank` | Plain `<a>` OK |
| `ResumeDownloadLink` | Résumé affordance | `ResumeAsset` | Header, home, about | S | none | Disabled/unavailable text if `available: false` — **not** a fake button | Link only when file exists |
| `SkillList` | Category → items with level + evidence | `SkillCategory[]` | about | S | none | Prefer list semantics; level as text, not color-only | |
| `LearningList` | Currently learning items | `LearningItem[]` | home (short), about (full) | S | none | Do not label as certs | |
| `ExperienceEntry` | One job block | `ExperienceItem` | about | S | none | Heading hierarchy under About | |
| `EducationEntry` | One education block | `EducationItem` | about | S | none | | |
| `MailtoLink` | Contact via email | `{ email: string; children?: ReactNode }` | chrome, about | S | none | Visible email or clear “Email Godric” name | **Plain markup preferred** if only used twice — optional helper |
| Home identity block | Name + positioning + CTAs | from `site` + `learning` | `/` only | — | — | H1 = name or site-approved identity phrase | **Stay plain markup** in `page.tsx` |
| Case study body sections | Prose sections | from `Project` | `[slug]` | — | — | H1 title; H2 per section | **Stay plain markup** mapping fields → sections; avoid `CaseStudyRenderer` megacomponent |

### 4.1 Explicit non-components (v1)

- Contact form
- Lightbox / carousel
- Project filter / search
- Theme toggle
- Global state provider
- Animation libraries

### 4.2 Client boundary policy

| Need | Decision |
|------|----------|
| Nav, links, static lists, images | **Server** |
| Mobile nav disclosure (if design requires collapse) | **Client** only for the disclosure widget — **Should**, not Must if design uses always-visible links |
| Lightbox | **Defer** (Could) — would be Client |
| Forms | **Defer** |

Default Must launch: **zero Client Components** if header links remain always visible.

---

## 5. Next.js / React strategy

### 5.1 Routing

- App Router file map:

```
app/
  layout.tsx                 # header + footer + metadata
  page.tsx                   # home
  about-me/page.tsx
  projects/page.tsx
  projects/[slug]/page.tsx
  not-found.tsx              # Should
  NavBar.tsx                 # → SiteHeader (reuse path or move to components)
  components/...
  globals.css
  favicon.ico
content/
  ...
public/
  assets/
    Godric_Ramelo-Resume.pdf           # Verified
    MedicaOne Screenshots/*.png        # Verified (spaces in folder/file names)
  # FoodHub / SideScroll screenshots: still Missing
```

**Asset path rule:** Prefer existing `public/assets/...` paths as Verified. Do not require a move for Must. **Should:** rename folders/files to kebab-case without spaces (and update content refs) for cleaner URLs — optional cleanup, not blocking.

- Dynamic segment: `slug` ∈ `medicaone` | `foodhub` | `sidescroll`.
- `generateStaticParams` returns those three; set `dynamicParams = false` so unknown slugs 404.
- `params` are **async** (`Promise<{ slug: string }>`) per Next 16 docs — await before use.
- Do **not** migrate to Pages Router.

### 5.2 Rendering

- **Static by default.** All portfolio data is local TS imports — no `cookies`, `headers`, or uncached fetch.
- With `cacheComponents: true`, avoid introducing request-time APIs.
- Optional **Should:** `export const ensureStatic = 'navigation'` on portfolio pages once implementers confirm compatibility with local docs — only if it does not conflict with chosen patterns; not required to ship.
- No ISR/revalidate required for v1.

### 5.3 Server / Client boundaries

- Pages and layouts: Server Components.
- Data: imported at build/render time from `content/*`.
- Client only for progressive enhancement interactions listed in §4.2.

### 5.4 Data modeling

- Single `Project` contract for all three case studies.
- Getters: `getAllProjects()`, `getFeaturedProjects()`, `getProjectBySlug(slug)`, `getAllProjectSlugs()`.
- Unknown slug → `notFound()`.

### 5.5 Images

- Use `next/image` with **explicit width/height** from `ProjectScreenshot`.
- Store files under intended `public/images/projects/{slug}/...` (convention only; do not invent files now).
- Informative `alt`; captions optional via `figure`.
- Home/index thumbnails: first screenshot if present; else placeholder unavailable state (no stock photos).
- No remote image host required for v1.
- Note: boilerplate home uses `priority`; Next 16 Image docs document `preload` — follow **current** docs at implementation time.

### 5.6 Performance

- Minimal client JS (ideally none for Must).
- No third-party analytics/scripts unless owner later requests.
- Prefer static imports of local images when helpful for blur placeholder (**Could**).
- Do not promise Lighthouse scores.

### 5.7 SEO

| Concern | v1 approach |
|---------|-------------|
| Titles | Root `metadata` + per-route `metadata` / `generateMetadata` for `[slug]` |
| Description | Unique per route; no keyword stuffing |
| Identity | `siteName` / owner name consistent |
| Canonical / metadataBase | **Omit** — owner confirmed no production domain |
| Open Graph | Title/description; relative `og:image` **Should** when asset exists — absolute OG URLs need a domain later |
| Favicon | Keep/replace `app/favicon.ico` when brand asset ready |
| Crawlable nav | Real `Link`/`a` elements — no click-only divs |
| `sitemap.ts` / `robots.ts` | **Defer** until a domain exists (absolute sitemap URLs otherwise weak/wrong) |
| JSON-LD | **Could / Defer** |

### 5.8 Accessibility

- Landmarks: header, nav, main, footer.
- One H1 per page; logical H2+ for sections.
- Keyboard: all controls focusable; visible focus **required as design input** (design session supplies token; implementation must not remove outline without replacement).
- Skip link: **Should**.
- Images: informative alts for UI screenshots; empty alt only for pure decorative (avoid decorative-only project shots).
- Mailto/tel: clear accessible names.
- Résumé unavailable: text explanation, not silent broken link.
- `prefers-reduced-motion`: if design adds motion, respect it (**Should** when motion exists).
- Usable on mobile/tablet/desktop — functional requirement; composition is design’s job.
- Language: `lang="en"` retained unless owner requests otherwise.

### 5.9 Honesty / compliance hooks for implementers

- No fabricated metrics.
- Learning ≠ experience.
- MedicaOne screenshots: synthetic/anonymized only.
- AI-assisted work disclosed where relevant (SideScroll minimum).

---

## 6. Interaction specification

| ID | Control | Type | Trigger | Result | Implementation | A11y | Failure / unavailable |
|----|---------|------|---------|--------|----------------|------|------------------------|
| I1 | Logo / site name | Link | Activate | Navigate `/` | `next/link` | Accessible name = site/owner name | N/A |
| I2 | Nav: Home | Link | Activate | `/` | `next/link` | `aria-current="page"` when active | N/A |
| I3 | Nav: Projects | Link | Activate | `/projects` | `next/link` | same | N/A |
| I4 | Nav: About | Link | Activate | `/about-me` | `next/link` | same | Label “About” OK; href `/about-me` |
| I5 | Résumé | Link | Activate | Download/open PDF | `<a href="/assets/Godric_Ramelo-Resume.pdf">` (optional `download`) | Name includes “résumé” + format | File **Verified** present — treat `available: true`. If file later missing at build/runtime, fall back to unavailable message (do not 404 the whole page) |
| I6 | Contact | Link | Activate | Open mail client | `mailto:godricramelo@gmail.com` | Name “Email Godric” or show address | If client missing, browser handles; no site-side error UI |
| I7 | Phone | Link | Activate | Dial | `tel:` | Optional | Omit if tel not approved |
| I8 | Project preview | Link | Activate | Case study | `next/link` to `caseStudyPath` | Includes project title | N/A |
| I9 | Repo / live demo | Link (external) | Activate | External URL | `<a target="_blank" rel="noopener noreferrer">` | Indicate external if needed | Omit link if URL missing — do not show disabled fake buttons |
| I10 | Back to projects | Link | Activate | `/projects` | `next/link` | Clear name | N/A |
| I11 | Profile links | Link | Activate | External profile | Same as I9 | | Omit until URLs approved |
| I12 | Mobile nav toggle | Button | Activate | Expand/collapse nav | Client disclosure | `aria-expanded`, controls id | **Should** — only if design requires; Must can use always-visible links |

**Rules**

- Links navigate; buttons only for on-page state (I12).
- No dead controls.
- No contact form in Must/Should for v1.

---

## 7. Content and asset gaps

### 7.1 Verified assets (use these paths)

#### Résumé

| File | Public URL |
|------|------------|
| `public/assets/Godric_Ramelo-Resume.pdf` | `/assets/Godric_Ramelo-Resume.pdf` |

`ResumeAsset`: `{ href: "/assets/Godric_Ramelo-Resume.pdf", label: "Download résumé (PDF)", available: true }`

#### MedicaOne screenshots

Folder: `public/assets/MedicaOne Screenshots/` (note spaces). URL prefix: `/assets/MedicaOne%20Screenshots/` (or equivalent encoding).

| File | Intrinsic size (px) | Case-study priority vs three core areas |
|------|---------------------|------------------------------------------|
| `Template builder.png` | 1340×678 | **Primary** — template creation |
| `Issue Prescription.png` | 1341×681 | **Primary** — digital issuing |
| `save prescription modal.png` | 1355×680 | **Primary** — issuing flow |
| `Prescription Management.png` | 1342×678 | **Primary** — Rx / medication management |
| `Prescription Overview.png` | 1339×676 | **Primary** — Rx / medication management |
| `Treatment assistance.png` | 1344×678 | **Primary/Secondary** — use if it evidences reminders/tracking; else secondary |
| `Patient Dashboard.png` | 1343×680 | **Secondary** — context only; do not expand Must feature claims |
| `Patient managment page.png` | 1341×677 | **Secondary** (filename typo “managment” — keep as-is or rename in Should cleanup) |
| `Patient Registration.png` | 1341×678 | **Secondary** |
| `Landing page.png` | 1347×684 | **Secondary** / teaser candidate |
| `Profile.png` | 1342×678 | **Optional** |

**Must screenshot set for MedicaOne case study:** at least the Primary rows above (template, issue, save modal, management, overview). Secondary images optional if they dilute the prescription-management focus.

**Honesty:** screenshots must show synthetic/anonymized data only — no real patient credentials or PHI.

### 7.1b Still missing assets

| Asset | Intended use | Suggested convention (when supplied) |
|-------|--------------|--------------------------------------|
| FoodHub screenshots (2–5) | Case study + teaser | Prefer `public/assets/FoodHub Screenshots/` or kebab-case equivalent |
| SideScroll screenshots (2–5) | same | same pattern |
| Optional OG image | Social share | e.g. `public/assets/og-default.png` — **Should** (absolute OG URL still weak without domain) |
| Optional avatar / portrait | About — **Could** | Not required |
| Favicon / app icons | Branding | Replace CNA favicon when ready — **Should** |

### 7.2 Missing / unverified facts (remaining)

- GitHub profile + per-project repo URLs
- FoodHub / SideScroll live demos
- FoodHub OAuth/RBAC claim (remain omitted)
- TypeScript proficiency wording
- Phone `tel:` normalization
- Any metrics/outcomes
- Honors
- Whether Treatment assistance / patient screens should appear on the case study or stay asset-library only

### 7.3 Boilerplate to remove at implementation

- CNA home content and marketing CTAs
- Unused `public/*.svg` references from home (files may remain until cleaned — **Could** delete unused SVGs)
- Placeholder NavBar hrefs

---

## 8. Implementation handoff

### 8.1 Priority order

#### Must (one-week credible launch)

1. Content modules + types with honest placeholders (`[TODO: owner to supply]` only where still unknown — prefer omitting unverified claims).
2. Root layout: real metadata, `SiteHeader` (rewritten NavBar), `SiteFooter`, `<main>`.
3. `/` home with identity, CTAs, featured previews, short learning list.
4. `/projects` index with all three previews.
5. `/projects/[slug]` static case studies + `generateStaticParams` + `notFound`.
6. `/about-me` with experience, education, skills, learning, résumé/contact.
7. Résumé download → `/assets/Godric_Ramelo-Resume.pdf` (`available: true`).
8. Mailto contact in header/footer.
9. MedicaOne case study: three-core-area summary + Primary screenshots + live link `https://medica-one.site`.
10. Replace CNA boilerplate; Tailwind-only styling hooks (tokens undecided — use semantic class hooks design can restyle).
11. Basic `not-found` page (**Should** almost Must for bad slugs).
12. Home/about framing: balanced entry-level IT — MedicaOne is not the sole narrative.

#### Should (if time)

- Skip link; `aria-current` polish
- Kebab-case rename of `MedicaOne Screenshots` paths (update content refs)
- OG image when asset exists (relative path only without domain)
- `ensureStatic` if validated against Next 16 docs in-repo
- Move NavBar into `app/components/SiteHeader.tsx` for clarity
- Favicon replacement
- `sitemap.ts` / `robots.ts` **only after** a production domain exists

#### Could / Defer

- Contact form
- Lightbox gallery
- Project filtering
- MDX
- JSON-LD
- Theme toggle / forced dark mode productization
- Portrait photography section
- Analytics

### 8.2 Data to use

- OJT: locked title/org/bullets from §3.4 Experience.
- MedicaOne: “Digital Prescription Management”; features limited to the three core areas; live `https://medica-one.site`; screenshots from §7.1.
- Résumé: Verified PDF path; align on-page claims with PDF where they overlap.
- Omit until supplied: OAuth/RBAC (FoodHub), honors, metrics, profile URLs, FoodHub/SideScroll demos/repos.
- Learning items exactly as learning — never under Experience.
- Do not center site identity on healthcare/MedicaOne alone.

### 8.3 Routes / components required

- Routes in §2.1
- Components: SiteHeader (NavBar), SiteFooter, ProjectPreview, ScreenshotFigure, ProjectMeta, SkillList, LearningList, ExperienceEntry, EducationEntry, ResumeDownloadLink; keep case-study prose mostly plain in page.

### 8.4 Behavior to support

- All interactions in §6 Must rows (I1–I11 as applicable).
- MedicaOne live link present; FoodHub/SideScroll live/repo links omitted until supplied.
- FoodHub/SideScroll empty screenshots → unavailable message, page still renders.
- Résumé link uses Verified PDF path.
- Unknown project slug → 404.

### 8.5 Design-session inputs

Design owns: layout, columns, typography, color, borders, spacing, motion style, responsive composition, whether previews look like “cards,” hero treatment, etc.

#### Home

| Content item | Priority | Length | States |
|--------------|----------|--------|--------|
| Name / identity | Primary | 2–5 words | always |
| Positioning line | Primary | 12–28 words | always |
| CTA group (Projects, Résumé, Email) | Primary | 3 actions | résumé available |
| Featured project teasers | Primary | title + 1–2 sentence summary + tech list each | MedicaOne thumbnail available; others may miss image |
| Currently learning (≤3) | Secondary | topic + short objective | empty list hide section |
| Location | Optional | short | omit if design prefers about-only |

**Assets:** MedicaOne teaser candidate e.g. Landing page or Template builder (see §7.1 sizes); FoodHub/SideScroll TBD.

#### Projects index

| Item | Priority | Length | States |
|------|----------|--------|--------|
| H1 + lede | Primary | lede ≤40 words | always |
| Preview ×3 | Primary | summary 1–3 sentences | missing image |

#### Case study

| Item | Priority | Length | States |
|------|----------|--------|--------|
| Title + summary | Primary | summary 1–3 sentences | always |
| Meta (type/status/role/tech) | Primary | compact | always |
| Problem, users, contributions | Primary | 40–120 words / section or 3–6 bullets | always |
| Features, challenges | Secondary | bullets | hide if empty |
| Screenshots | Primary | MedicaOne: Primary set in §7.1; others 2–5 when available | empty → forthcoming message |
| Outcomes | Optional | bullets | hide if empty |
| Limitations, lessons | Secondary | bullets | always preferred for honesty |
| External links | Secondary | MedicaOne live required; others omit if missing | omit missing kinds |

**Assets:** MedicaOne sizes in §7.1; alts describe UI task/region (prescription/template flows preferred).

#### About

| Item | Priority | Length | States |
|------|----------|--------|--------|
| Intro | Primary | 60–120 words | always |
| Experience | Primary | 3–5 bullets | always |
| Education | Primary | coursework list OK | honors empty |
| Skills | Primary | categorized lists + level text | always |
| Learning | Primary | full list | always |
| Résumé + email | Primary | actions | résumé available |

**Global states for design to style:** default, focus-visible, hover for links (non-essential), unavailable/missing asset, 404 page.

**Motion:** none required for Must. If added later: provide reduced-motion alternative.

---

## 9. Decisions and open questions

### 9.1 Decisions made (do not re-litigate in implementation)

1. App Router + TS + Tailwind v4 only; no CMS/DB/API/global state for v1.
2. About URL is **`/about-me`** (repo stub wins over prompt default `/about`).
3. **No Contact page**; mailto (and optional tel) in chrome.
4. Case studies at **`/projects/[slug]`** with static generation for three slugs.
5. Content in **`content/*.ts`** typed modules.
6. Contact form, lightbox, filters deferred.
7. FoodHub OAuth/RBAC **omitted** until owner verifies.
8. Honors **omitted** until confirmed.
9. Learning activities are **not** experience.
10. MedicaOne media must be synthetic/anonymized.
11. SideScroll AI-assisted development is **disclosed** in contributions/lessons.
12. Owner is **BSIT undergraduate, expected 2027** — never “graduate.”
13. NavBar is **reused/rewritten**, not replaced by a parallel nav.
14. `/contacts` stub is **not** part of shipped IA.
15. **No portfolio production domain** — no `metadataBase`, no absolute canonicals, defer absolute sitemap/robots.
16. Résumé href is **`/assets/Godric_Ramelo-Resume.pdf`**.
17. OJT copy locked to owner wording in §3.4 (Technical Support and Data Encoding; City Government of Olongapo — LEDIPO-BPLO).
18. MedicaOne public framing: Digital Prescription Management; **three core feature areas only** for Must claims; live site `https://medica-one.site`.
19. MedicaOne is **one of three** case studies — portfolio identity remains balanced entry-level IT.

### 9.2 Remaining safe defaults (unanswered items)

| Topic | Default | Why safe |
|-------|---------|----------|
| FoodHub auth claims | Omit OAuth/RBAC | Unverified |
| Profile / GitHub links | None until supplied | No invented URLs |
| FoodHub / SideScroll live/repo | Omit | No fake demos |
| Phone | Show display string as text; add `tel:` only if owner confirms format | Avoids broken tel links |
| MedicaOne barangay/clinic name | Omit from copy | Owner shifted to product-capability framing |
| Secondary MedicaOne screens (patient admin, profile) | Optional on case study; not used to invent extra feature claims | Protects three-area focus |

### 9.3 Open questions — resolved vs remaining

**Resolved by owner (do not re-ask):** production domain (none); résumé path; OJT title/org/bullets; MedicaOne live URL + framing + three core areas + narrative weight; MedicaOne screenshots present in repo.

**Still useful if answered later (non-blocking):**

1. **GitHub profile and/or project repo URLs?**  
   *Default:* omit. *Why safe:* live MedicaOne + screenshots already evidence the work.

2. **FoodHub / SideScroll screenshots and any live links?**  
   **Resolved:** owner will not include screenshots for now; forthcoming state + no live links.

3. **Include secondary MedicaOne patient-admin screenshots on the case study page, or keep Primary prescription set only?**  
   *Default used:* Primary prescription-focused set (plus landing). Patient-admin shots omitted from case study.

---

## Acceptance checklist (for later sessions)

- [ ] Every route has purpose, content, tier (§2)
- [ ] Every content section has a source (§3)
- [ ] All three projects share one `Project` model (§3.2)
- [ ] Claims pass honesty rules; gaps listed not invented (§7)
- [ ] Components have single responsibility + S/C justification (§4)
- [ ] Controls have behavior + failure states (§6)
- [ ] Spec matches App Router + Tailwind v4 + existing stubs (§1)
- [ ] No visual layout/styling prescribed (§8.5 inputs only)
- [ ] Repo changes limited to this file for the planning session

---

*End of specification.*

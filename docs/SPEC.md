# s3q.io — V0 build spec

> **Assembled snapshot.** The source of truth is the wayfinder map and its
> resolved tickets under `.scratch/personal-website/`. Regenerate this document
> from there if they diverge. Every section links the ticket that owns its detail.

---

## 1. Destination & scope

Ship a **basic-but-beautiful static site on s3q.io, ASAP** — a professional home
(profile + writing + projects) for hiring visibility — on an architecture and
extension model that lets the site grow into the eventual "personal universe"
(the full visual system, media-heavy sections, easter eggs) without
re-architecting.

**In V0:** `/` (single scrolling landing), `/writing` + posts, `/projects` +
per-project pages. **Not in V0:** photography, the full motif/visual system,
`/work` sub-routes, `/contact` as a page, `/now`, easter eggs, `<ClientRouter />`
transitions beyond the base router. See §14–15.

Build model: agent-driven, loosely supervised. Load-bearing topics carry
acceptance criteria; visual craft is delegated to an `impeccable` cycle (§11–13).

---

## 2. Stack & hosting — [ADR 0001](adr/0001-stack-and-hosting.md), [ticket 0](../.scratch/personal-website/tickets/000-toolchain-research.md)

- **Astro** + **React islands**, **TypeScript**, **Tailwind v4**, **pnpm**,
  **100% static (SSG)** — no SSR adapter.
- Host: **Cloudflare Pages**. Domain: **s3q.io**. Repo: **public GitHub**.
- Toolchain facts (current): pure SSG needs no `@astrojs/cloudflare`; CF Pages
  build image v3 = Node 22.16, pnpm 10.11.1, `PNPM_VERSION` env pins pnpm;
  Tailwind v4 via `@tailwindcss/vite` with CSS-first `@theme` tokens
  (`@astrojs/tailwind` is deprecated); no built-in Lighthouse gate — use a GitHub
  Actions `@lhci/cli` required check.

---

## 3. Repo conventions — [ticket 1](../.scratch/personal-website/tickets/001-scaffold-and-repo-conventions.md)

```
src/
  pages/          Astro routes only
  layouts/        Astro layout shells
  components/     .astro presentational — never hydrate
  islands/        .tsx React — the ONLY place a client:* directive appears
  content/        content collections (writing/, projects/) + content.config.ts
  styles/         global.css (Tailwind entry) + tokens.css (@theme values)
  lib/            framework-agnostic TS helpers
  assets/         images imported & processed by Astro
public/           static passthrough (favicon, robots.txt, og-default.png, resume PDF)
```

- **All React in `src/islands/`.** A `client:*` directive anywhere else is a
  review failure.
- Tailwind v4 via `@tailwindcss/vite`; tokens live in `src/styles/tokens.css`
  (`@theme`), imported first by `global.css`. `class` dark mode
  (`@custom-variant dark`), `.dark` on `<html>`, set by a ≤ 500-byte inline
  `<head>` script (`localStorage` else `prefers-color-scheme`), system default.
  `@tailwindcss/typography` in for `/writing` prose.
- TS extends `astro/tsconfigs/strict`; alias `@/* → src/*`; `astro check` =
  typecheck. **Pin `typescript@~6.0`** — TypeScript 7.x (the native compiler)
  does not expose the API `astro check` needs, and `pnpm add -D @astrojs/check`
  pulls 7.x by default.
- ESLint flat (`typescript-eslint` + `eslint-plugin-astro`, no stylistic) +
  Prettier (`prettier-plugin-astro`, `prettier-plugin-tailwindcss`);
  `prettier --check` in CI.
- Pinning: `PNPM_VERSION = 10.11.1` on CF Pages; `"packageManager":
  "pnpm@10.11.1"`; `.nvmrc = 22`.
- CI: one `.github/workflows/ci.yml` on push + PR —
  install → `astro check` → `eslint .` → `prettier --check .` → `astro build`
  → (§7) `lhci`.
- Hygiene: Astro `.gitignore`; `.editorconfig` (2-space, LF, UTF-8, final
  newline, trim trailing); minimal README. **No `LICENSE` file** — public but
  all-rights-reserved; README note reserves reuse and marks writing/photos
  © Mohammed Sadiq K.

---

## 4. Progressive-enhancement layers & hydration — [ticket 2](../.scratch/personal-website/tickets/002-pe-layers-and-hydration-rules.md)

| Layer | Contains | Removal test |
|---|---|---|
| **0 HTML** | all content, nav, bodies, links, forms | JS **and** CSS off → every route works |
| **1 CSS** | design, layout, type, colour, transitions, keyframes | CSS partial → Layer 0 still readable |
| **2 JS / islands** | stateful interaction only, enhancing a working L0/L1 element | JS off → lose delight, never info/nav |
| **3 Canvas/WebGL** | particles, easter eggs, games — **never in V0** | always additive |

**Rule:** removing Layer N leaves 0…N‑1 working. Enforced per PR (JS-off + CSS-off
passes).

**Island rules:** islands only for genuine client state; default `client:visible`;
`client:load` / `client:only` **banned** (former needs written justification);
no nested islands; leaf-oriented; meaningful SSR output required.
**V0 ships zero islands.** Only non-island JS in V0: the inline theme bootstrap +
Astro `<ClientRouter />` (~7 KB, reduced-motion aware, MPA fallback) + hover
`prefetch`.

**Dynamic-import boundary + ambient-element model:** an easter egg rests as a
cheap always-present ambient element (L1–2); on **explicit user action** it
`import()`s the heavy game chunk (L3). Listener outside React, per-egg chunks,
silent failure, **zero L3 code in the initial bundle**. V0 ships none of this.

**The reveal model:** the site emerges from blank — **no loader / progress gate,
ever**. First paint is Layer 0 content. Reveal follows layer order, staggered and
deliberately sequenced, driven by CSS where possible; interaction live from first
paint; interrupting never breaks it; `prefers-reduced-motion` collapses it to
near-instant; **the LCP element is Layer 0 content and paints at stage 1 — never
waits on the sequence.** V0 ships the *lite* reveal only (copy/blocks fade from
blank). Full choreography = [ticket 10](../.scratch/personal-website/tickets/010-reveal-choreography.md), post-V0.

---

## 5. Content model — [ticket 3](../.scratch/personal-website/tickets/003-v0-content-schemas.md)

Astro 5 Content Layer API, `glob` loader, `src/content.config.ts`. Files in
`src/content/{writing,projects}/**/*.mdx`. Covers in `src/assets/`.

```ts
const writing = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/writing" }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    type: z.enum(["article", "note", "essay"]).default("article"),
    draft: z.boolean().default(false),
    cover: image().optional(),
    canonicalUrl: z.string().url().optional(),
    slug: z.string().optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/projects" }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    tech: z.array(z.string()),
    role: z.string().optional(),
    links: z.object({
      repo: z.string().url().optional(),
      live: z.string().url().optional(),
      writeup: z.string().url().optional(),
    }).default({}),
    status: z.enum(["wip", "shipped", "archived"]),
    featured: z.boolean().default(false),
    date: z.coerce.date(),
    order: z.number().optional(),
    cover: image().optional(),
    draft: z.boolean().default(false),
    slug: z.string().optional(),
  }),
});
```

- `description` is the one canonical summary term (meta / RSS / cards).
- `tags` / `tech` free-form, lowercased, no enum.
- Project **body optional** — case studies added progressively after V0.
- Ordering: writing by `date` desc; projects by `order` → `featured` → `date` desc.
- Drafts excluded when `PROD` and from RSS + sitemap; shown in `dev`.
- Single author; reading time derived at build.
- This `glob` + optional-body shape is the template for future collections (§16).

---

## 6. IA, routes, SEO, RSS — [ticket 6](../.scratch/personal-website/tickets/006-v0-ia-routes-seo-rss.md)

| Route | Notes |
|---|---|
| `/` | single scrolling landing (§9) |
| `/writing` | flat index, `date` desc, **no pagination in V0** |
| `/writing/[slug]` | post |
| `/projects` | thin curated index, `order → featured → date` |
| `/projects/[slug]` | **always rendered**, thin until a body exists |
| `/404` | `src/pages/404.astro` |

- **`trailingSlash: 'never'`**, kebab-case slugs, no date segments.
- `/writing` and `/projects` are locked nouns. Future sections = new top-level
  nouns; **existing routes never move**.
- SEO: homepage title is **s3q · Sadiq's space** (not `Sadiq — s3q.io`); inner
  pages use `<page> — <brand>`. Meta `description` from SITE or the entry field;
  self-canonical; OG/Twitter `summary_large_image` with `og:site_name` `s3q.io`;
  static `public/og-default.png` (1200×630) + entry `cover` when present;
  `@astrojs/sitemap` (drafts excluded); `robots.txt` → sitemap.
- **JSON-LD:** `Person` on `/`, `BlogPosting` on posts.
- **RSS:** `@astrojs/rss` at `/rss.xml`, writing only, summary not full content,
  drafts excluded, `<link rel="alternate">` in `<head>`.
- Nav: `prefetch` hover strategy; `<ClientRouter />` retained.

---

## 7. Quality budgets & CI gate — [ticket 4](../.scratch/personal-website/tickets/004-quality-budgets-and-ci-gate.md)

Portfolio-grade, enforced pre-deploy. **Later layers get their own budget review
and may not silently erode these.**

**Lighthouse lab (mobile emulation), median of 3:**

| Metric | Fail line |
|---|---|
| LCP | 1800 ms |
| CLS | 0.02 |
| TBT (INP proxy) | 150 ms |
| FCP | 1200 ms |
| Speed Index | 2000 ms |
| Perf score | ≥ 98 |
| Accessibility / Best Practices / SEO | = 100 |

**`budget.json` (`/` and posts):** scripts **≤ 12 KB** gzip (expected ~8 KB;
tight so an accidental island fails CI), **0 bytes** Layer 3 code in the entry,
CSS ≤ 30 KB, fonts ≤ 100 KB total, images ≤ 150 KB each, total page ≤ 250 KB.

**A11y must-pass (WCAG 2.2 AA):** Lighthouse a11y = 100; full keyboard +
`:focus-visible`; `prefers-reduced-motion` honoured; contrast ≥ 4.5:1 text /
3:1 UI; one `<h1>` + landmarks; skip-link; `<html lang>`; meaningful `alt`.

**Gate:** `lhci` job in `.github/workflows/ci.yml`, `staticDistDir: ./dist`
(local build, deterministic), routes `/` `/writing` `/writing/[slug]`
`/projects`, required check on PRs. Non-gating Lighthouse run vs the CF preview
URL + CrUX / CF Analytics for field observability (real INP lives here).

---

## 8. Content inventory & seed plan — [ticket 11](../.scratch/personal-website/tickets/011-v0-landing-copy-and-content.md)

**Seed writing (target 2 published for launch; no placeholders):**
1. **Signals** — Angular signals vs Preact / React signals, for Angular devs
   moving to React; native TC39 signals proposal.
2. **Taste in AI design work** — personal taste in AI-assisted design; plug to
   `taste-vault`.
3. *(soon)* **Database schema VCS** — case study from `ryft`.
4. *(post-launch)* **Building s3q** — web-perf deep dive.

One substantial engineering piece at launch beats three thin ones.

**Projects:** shown — Nook, rover, ryft, taste-vault. **Featured (3):** Nook,
rover, ryft. `loom`, `seventy-five` held until real (`status: wip`).

**Work profile:** Senior SDE at M2P Fintech; leads 5; frontend authority across
8+ teams / 100+ engineers; design direction, roadmaps, modernisations, reviews.
Rendered as prose + **CV (PDF)** download + **LinkedIn** link. **CV PDF in
`public/` is a launch asset.**

**Links:** email, GitHub (`github.com/mdsdqk`), LinkedIn, RSS.

**Voice:** first person, concrete over adjectives, builder-not-coder, range as a
feature, no seniority-signalling, bold and pragmatic.

---

## 9. Landing hero — [ticket 12](../.scratch/personal-website/tickets/012-landing-hero-identity-copy.md)

**Direction: Name-led.** Fixed structure and copy; the visual world (§10) dresses
it.

| Slot | Content |
|---|---|
| Nav left | **`s3q`** mark (a logo later) |
| Nav right | `Writing · Projects · About` |
| Prefix | small, above name — **"This is"** (alt: `I'm`, `//`; not "Hi, I'm") |
| Name | **Sadiq.** at display scale — the hero's whole weight |
| Positioning | "I build software products end to end — the design, the engineering, and the thousand details in between." |
| Meta | "Leading Fullstack / Frontend at M2P Fintech. Building [Nook], [rover] & [ryft] on the side." (inline links) |
| Below | deliberate empty space for motif + reveal |

Landing block order: hero → positioning → what-I-do → work profile (prose + CV +
LinkedIn) → selected projects (3 featured → `/projects`) → recent writing (3 →
`/writing`) → links.

Reference prototype (throwaway):
https://claude.ai/code/artifact/f7bfff93-a17c-4dbd-86fc-1a3204d3a5af ·
`.scratch/personal-website/hero-directions.html`.

---

## 10. Visual-world brief — for `impeccable shape` — [ticket 7](../.scratch/personal-website/tickets/007-v0-visual-language-and-landing.md)

The visual world is **not decided in planning** — it is `impeccable init` +
`shape` / `new-work`'s job (output: `DESIGN.md`), run in build phase 3 (§11).
Constraints that pass must honor:

- **Hero is fixed as Name-led** (§9) — the world dresses that skeleton.
- **Mood:** bolder / edgy / **sci-fi / digital**. The soft-serif hero prototype
  is the **anti-reference**.
- **Keep V0 simple** — the mountains/stars/WebGL motif system is a later layer.
  At most one restrained low-cost motif nod (SVG + CSS) that won't be torn out.
- **Light + dark**, day one, as semantic tokens (no raw hex in components).
- Contrast ≥ WCAG 2.2 AA. Font budget ≤ 100 KB (woff2, subset, ≤ 2 weights;
  system stack is valid).
- **Motion:** CSS-only for V0; implements the reveal model (§4) and its
  reduced-motion collapse; LCP paints at stage 1.
- **`s3q` mark** needs a V0 form (pre-logo).

---

## 11. Build phases

Six discrete agent sessions, in order:

1. **Scaffold** — §2–3 realised: Astro + Tailwind + TS + ESLint/Prettier + CI +
   `budget.json` / `lighthouserc.json` wired; deploys an empty shell.
2. **Content layer** — §5–6 realised: collections, all routes, RSS, sitemap,
   `robots.txt`, SEO/JSON-LD, 404; the 2 seed posts + 4 project entries (§8);
   CV PDF placed.
3. **`impeccable init` + `shape` / `new-work`** — PRODUCT.md, DESIGN.md, tokens
   (§10, §12).
4. **`impeccable craft`** — the landing (§9) + page templates, against DESIGN.md.
5. **`impeccable audit` / `polish`** + budget reconciliation against §7.
6. **DNS Phase B + production deploy + V0-done gate (§13).**

Plumbing (1–2) precedes design (3–5): `impeccable` needs real routes and content
to work against.

---

## 12. `impeccable`-cycle handoff — [ticket 12](../.scratch/personal-website/tickets/012-landing-hero-identity-copy.md)

Run on the built landing in phases 3–5. Mode: **Persuade**.

| `impeccable` input | Seeded by |
|---|---|
| `PRODUCT.md` | §8 (identity, work facts, voice) + map Notes |
| Landing **surface brief** | §9 (Name-led skeleton + copy) + §6 (routes, SEO) + §7 (budgets as hard constraints) |
| `DESIGN.md` | §10 (the sci-fi/digital visual-world brief) |
| Anti-reference | the soft-serif hero prototype (§9) |

---

## 13. "V0 done" gate

All must hold:

- `/`, `/writing`, `/projects` live at **https://s3q.io** (DNS Phase B complete).
- Writing + projects collections populated: **≥ 1 substantial writing piece**
  published (target 2), the **4 launch projects** entered, **CV PDF** present.
- All **§7 budgets green in CI**; the `lhci` required check passing.
- **A11y must-pass list (§7) satisfied.**
- The **lite reveal** working (emerge from blank, reduced-motion collapse).
- **`impeccable audit` clean — no P1 findings**; `polish` pass done. V0 is not
  "done" until the landing is genuinely good, not merely functional.

---

## 14. Post-V0 layer sequence

Each layer names its entry condition. Photography is **not** here — it is a
separate future effort (§15).

1. **Full visual system** (motif language: mountains / stars / atmospheric depth)
   — entry: V0 shipped and stable.
2. **The reveal choreography** ([ticket 10](../.scratch/personal-website/tickets/010-reveal-choreography.md)) — entry: full visual system exists.
3. **`<ClientRouter />` + `transition:persist`** (cross-page motif continuity) —
   entry: with layer 1.
4. **Tech / media split landing composition** — entry: layer 1.
5. **Full IA** (`/work`-style sub-routes, `/contact`, writing taxonomy) — entry:
   enough content to justify.
6. **Project case-study bodies** (`/projects/[slug]`) — incremental, anytime.
7. **Media-heavy sections** — photography, then travel / vlogs / creative; each
   its own wayfinding (§16).
8. **Easter-egg layer** — entry: after the easter-egg lifecycle-contract
   wayfinding.

---

## 15. Out of scope (this effort)

Beyond the destination; return only as fresh efforts.

- Individual easter-egg designs & per-game specs; the full Easter Egg Engine
  build (this spec covers only the attachment model, §16).
- Cross-publishing **implementation** to Medium / dev.to (RSS is in).
- CMS / Ghost migration; newsletter / memberships; comments; `/now`.
- **Photography in full** — section, derivative pipeline, metadata model, viewer.
  A *planned* future layer (§14.7), its own wayfinding — the deferred
  [Photography pipeline ticket](../.scratch/personal-website/tickets/005-photography-pipeline.md)
  is its starting point.

---

## 16. Extension model

How a future addition attaches without re-architecting.

- **New section / route** — a new top-level noun. Reuses the layout shell, the
  §10 tokens, the §6 SEO/RSS plumbing and slug conventions. Must not move or
  rename an existing route (§6). Adds a nav entry.
- **New content collection** — copy the §5 pattern: `glob` loader in
  `src/content.config.ts`, a Zod schema with `description` as the summary field,
  optional body, `draft` handling, `date` via `z.coerce.date()`. Wire an index
  route + a `[slug]` route.
- **Media-heavy section** (photography, travel, vlogs, creative — *planned*, not
  hypothetical) — a new section + collection as above, plus the decision that
  section needs: an image derivative pipeline (AVIF/WebP, responsive, originals
  likely in R2); for vlogs, a video-hosting choice (YouTube embed vs Cloudflare
  Stream vs self-host). Each gets its own detailed wayfinding; this model states
  only the attachment pattern.
- **New easter egg** — enters via the §4 dynamic-import boundary as an ambient
  element (L1–2) that `import()`s its game chunk (L3) on explicit user action.
  Must pass the §7 a11y must-pass list and add **0 bytes** to the initial
  bundle. A full lifecycle contract (register / trigger / activate / pause /
  exit, screen-region claiming, the per-egg a11y checklist) is designed in its
  own wayfinding **before the first egg is built**.

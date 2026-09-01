# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

The site serves several visitors and is deliberately not tuned to one:

- **Recruiters and hiring managers** arriving from a CV or LinkedIn link, skimming
  to decide whether Sadiq is worth a conversation — they need scope, impact, and
  proof fast.
- **Technical peers** arriving to judge the work itself — the engineering, the
  decisions, the site as an artifact.
- **Readers** landing directly on a single writing piece from a shared link, with
  no prior context.

The unifying job, across all of them: **feel the craft.** Whoever the visitor is
and however they arrived, what must land is that the art and the engineering are
magnificent. That reaction is the primary success condition; the
audience-specific jobs (evaluate for a role, judge the engineering, read a post)
sit under it.

## Product Purpose

s3q.io is Mohammed Sadiq K's personal home on the web — a standing place for his
profile, his writing, and his projects, where using the site is itself a
demonstration of the ability it describes. Success is a visitor leaving with a
clear, vivid sense of the person and an unprompted impression that the site is
unusually well made.

Over time it becomes the home for everything he makes — photography, travel,
creative work — not only professional work. V0 is the professional core: profile
+ writing + projects.

## Positioning

**A 0→1 builder across the whole craft.** Sadiq takes products from nothing to
shipped, across the stack and across design, product, engineering, and quality —
not a frontend specialist who also dabbles, and not a generalist without depth.
The projects (Nook, rover, ryft) are whole products built end to end, alongside
frontend leadership at org scale. A typical strong-engineer portfolio can claim
depth in one lane; this one claims the full arc, backed by shipped work.

## Operating Context

- Most visits begin from an external link — a CV, a LinkedIn profile, a shared
  post, a search result — and are short.
- Visitors span device classes and networks; the site is judged on how it feels
  on a mid-range phone as much as on a desktop.
- s3q.io is the canonical home for Sadiq's writing; other platforms (Medium,
  dev.to) may syndicate, but this is the source.
- It is a living site, extended in place over years, not a one-time build.

## Capabilities and Constraints

- **Delivery:** static site (Astro, 100% prerendered), Cloudflare Pages, s3q.io.
- **V0 scope:** a single scrolling landing (identity / what he does / work
  profile), `/writing` (index + posts), `/projects` (curated index + per-project
  pages). No photography, no `/work` sub-routes, no `/contact` page in V0.
- **Performance is a product requirement,** not a later pass: portfolio-grade
  Lighthouse budgets enforced in CI (LCP ≤ 1.8 s lab, CLS ≤ 0.02, ~12 KB script
  budget on the landing, ≤ 250 KB total page). Expensive experiences load only on
  demand and never on the initial bundle.
- **The load experience is "the reveal":** the site emerges from a blank field in
  staged order, with no loading screen or progress gate, usable from first paint,
  interruption-safe, collapsing to near-instant under reduced motion. The
  assembly itself is part of the craft.
- **Progressive enhancement is structural:** meaningful HTML before CSS before
  JavaScript before Canvas/WebGL; each layer enhances, never blocks, the one
  below. V0 ships zero client interactivity beyond a theme bootstrap and Astro's
  view-transition router.
- **Content model:** MDX writing and project entries in typed collections;
  `description` is the canonical one-line summary field; drafts are excluded from
  production and feeds.
- **Undecided:** typography, colour, and the full visual world (the sci-fi /
  digital direction is a target, not a resolved system); the `s3q` logo (a text
  mark stands in for V0); a downloadable CV PDF and a default OG image are
  required launch assets not yet produced.
- **Terminology:** *beachhead* / *V0* (the minimal first live version); *the
  reveal* (the staged load); *easter egg* (an optional discoverable interactive
  experience — none in V0); *island* (a hydrated React component, the only place
  client JS runs); *motif* (recurring personal-interest visual elements —
  mountains, stars — not built in V0).

## Brand Commitments

- **Name:** displayed as **Sadiq**; `Mohammed Sadiq K` is the full name. `s3q` is
  a monospace mark now, intended to become a logo later. Domain: `s3q.io`.
- **Voice:** first person; concrete over adjectives; "builder," not "coder" —
  work framed as products, not code output; range (engineering, product, design,
  quality, taste) shown as a strength without reading as unfocused; bold and
  pragmatic, neither modest nor grandiose. Seniority is not foregrounded — the
  site does not lead with "Senior" or a job title.
- **Visual direction (target, not committed):** bolder, edgy, sci-fi / digital.
  The soft-serif hero prototype at
  `.scratch/personal-website/hero-directions.html` is an explicit **anti-reference**
  for type and mood.
- **Hero structure is fixed** (Name-led): `s3q` mark left, nav right
  (`Writing · Projects · About`), a small prefix above a display-scale "Sadiq.",
  a positioning line, then a prose line linking the featured projects.

## Evidence on Hand

- **Projects (real):** Nook (AI-native personal finance OS with an MCP server and
  agent tools), rover (multi-agent PRD→PR tool, human in the loop), ryft (version
  control for database schemas — github.com/mdsdqk/ryft), taste-vault (a personal
  design-taste corpus — github.com/mdsdqk/taste-vault). `loom` and `seventy-five`
  are planned, not yet real, and are not shown at launch. Entries in
  `src/content/projects/`; case-study bodies to be written later.
- **Writing (planned, drafts only):** "Angular signals, for React developers";
  "Giving your taste to the machine" (ties to taste-vault); "Version control for
  database schemas" (case study from ryft); "Building s3q" (web-perf,
  post-launch). Stubs in `src/content/writing/`, all `draft: true` — **no writing
  is publish-ready yet.**
- **Work-profile facts:** Senior SDE at M2P Fintech; leads a team of 5; frontend
  authority across 8+ teams / 100+ engineers; drives design direction, frontend
  and product roadmaps, modernisations, and cross-org code reviews.
- **Absent — must not be fabricated:** finished article bodies; project
  case-study write-ups; a CV PDF; a default OG image; any testimonials,
  endorsements, client logos, metrics, or press. GitHub handle is `mdsdqk`; a
  LinkedIn URL and a contact email are not yet supplied.
- **Planning record:** `docs/SPEC.md` (16-section build spec), `CONTEXT.md`
  (glossary), `docs/adr/0001-stack-and-hosting.md`, wayfinder map under
  `.scratch/personal-website/`.

## Product Principles

1. **The craft is the message.** The site does not merely describe good work;
   using it must feel like good work. Every visitor should leave impressed by the
   making, whatever brought them.
2. **Magnificence without a toll.** Ambition in the experience never costs the
   visitor speed, access, or clarity — advanced effects are opt-in by resource
   cost, and the base experience is complete on its own.
3. **The whole arc, shown.** Design, product, engineering, and quality read as
   one continuous capability, not separate skills — the 0→1 positioning has to be
   legible in how the site itself is built.
4. **A home, not a campaign.** A standing place that grows in place over years,
   never a job-hunt landing page; structure and vocabulary must not foreclose
   photography, travel, or creative sections later.
5. **Honest by construction.** No fabricated proof, no borrowed identity, no
   claim the work does not back. Empty beats invented.

## Accessibility & Inclusion

Target WCAG 2.2 AA, enforced: full keyboard operability with visible focus,
`prefers-reduced-motion` honoured (the reveal collapses to near-instant), contrast
≥ 4.5:1 for text and ≥ 3:1 for UI, semantic landmarks with one `h1` per page, a
skip link, and meaningful `alt` on content images. The visual ambition must never
depend on excluding anyone — everything above the CSS layer has a working
fallback.

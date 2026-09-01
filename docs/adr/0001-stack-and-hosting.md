# Stack and hosting for s3q.io

**Status:** accepted

We are building s3q.io as an **Astro** site with **React islands** for interactivity,
**TypeScript** throughout, **Tailwind v4** (via `@tailwindcss/vite`, CSS-first
`@theme` tokens) for styling, and **pnpm** as the package manager. Output is
**100% static (SSG)** for the first version — no SSR adapter — deployed to
**Cloudflare Pages**, with photography originals in **Cloudflare R2** and optimized
derivatives produced at build time.

## Why

The site is itself a portfolio piece, so the architecture has to demonstrate
restraint: ship HTML that works before JavaScript, and pay for interactivity only
where it earns its place. Astro's islands model makes that the default rather than
a discipline we have to enforce. Static output keeps the beachhead fast and cheap
and defers the operational cost of a server until something concrete needs it;
Cloudflare Pages serves it globally for free with per-branch preview deploys, and
leaves an edge-compute path (Workers) open without committing to it now. R2 keeps
large photo originals out of git while Astro's build-time image pipeline still
produces responsive AVIF/WebP.

## Considered and rejected

- **Next.js / SvelteKit** — heavier client runtime by default; the islands-first
  story is weaker.
- **Vercel / Netlify** — better Astro DX, but Cloudflare's free static tier and
  the R2 + Workers adjacency won on cost and future optionality.
- **Vanilla CSS with custom-property tokens** — smaller payload, but Tailwind v4's
  CSS-first tokens get most of that benefit while keeping authoring velocity.
- **SSR / hybrid rendering now** — no V0 feature needs it; revisit per-route if one
  emerges.

Reversal cost is real: the hosting target shapes the deploy pipeline and the
image pipeline, and the framework shapes every page. Hence this record.

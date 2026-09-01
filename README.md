# s3q.io

Personal site of Mohammed Sadiq K — profile, writing, and projects. Astro + React
islands, Tailwind v4, TypeScript, static output, deployed on Cloudflare Pages.

The build is specified in [`docs/SPEC.md`](docs/SPEC.md); domain vocabulary in
[`CONTEXT.md`](CONTEXT.md).

## Commands

```sh
pnpm dev        # local dev server
pnpm build      # static build to ./dist
pnpm preview    # serve the build locally
```

## Structure

```
src/
  pages/       Astro routes only
  layouts/     Astro layout shells
  components/  .astro presentational — never hydrate
  islands/     .tsx React — the ONLY place a client:* directive appears
  content/     writing/ + projects/ collections (+ content.config.ts)
  styles/      global.css (Tailwind entry) + tokens.css (@theme, placeholder)
  lib/         framework-agnostic TS helpers
  assets/      images imported & processed by Astro
public/        static passthrough
```

Path alias: `@/*` → `src/*`.

## License

The source is public so you can see how the site is built. It is not licensed for
reuse. Writing and photographs are © Mohammed Sadiq K, all rights reserved.

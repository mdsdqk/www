import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// SPEC §5 — V0 content schemas. `description` is the one canonical summary term
// (meta / RSS / cards). Tags and tech are free-form, lowercased by convention.
// Preferred writing tags: engineering, ai, frontend, systems, product, taste.

const writing = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/writing' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z.coerce.date(),
      updated: z.coerce.date().optional(),
      tags: z.array(z.string()).default([]),
      type: z.enum(['article', 'note', 'essay']).default('article'),
      draft: z.boolean().default(false),
      cover: image().optional(),
      canonicalUrl: z.url().optional(),
      slug: z.string().optional(),
    }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      tech: z.array(z.string()),
      role: z.string().optional(),
      links: z
        .object({
          repo: z.url().optional(),
          live: z.url().optional(),
          writeup: z.url().optional(), // external writeup, not the body
        })
        .default({}),
      status: z.enum(['wip', 'shipped', 'archived']),
      featured: z.boolean().default(false),
      date: z.coerce.date(),
      order: z.number().optional(),
      cover: image().optional(),
      draft: z.boolean().default(false),
      slug: z.string().optional(),
    }),
});

export const collections = { writing, projects };

// Global site metadata. Framework-agnostic — import from anywhere via `@/lib/site`.

export const SITE = {
  /** Short name in inner-page titles (`Writing — Sadiq`). */
  brand: 'Sadiq',
  /** og:site_name — the domain, not the person. */
  siteName: 's3q.io',
  /** Homepage `<title>` / og:title. Place name, not a job title. */
  title: "s3q · Sadiq's space",
  tagline: 'I build software products end to end',
  description:
    'I build software products end to end — the design, the engineering, and the thousand details in between.',
  url: 'https://s3q.io',
  author: 'Mohammed Sadiq K',
  locale: 'en',
  ogLocale: 'en_US',
  ogImage: '/og-default.png',
  ogImageAlt: 'This is Sadiq. s3q.io',
  ogImageWidth: 1200,
  ogImageHeight: 630,
} as const;

/** Primary nav — new sections attach here as new top-level nouns (SPEC §6, §16). */
export const NAV = [
  { href: '/writing', label: 'Writing' },
  { href: '/projects', label: 'Projects' },
  { href: '/#about', label: 'About' },
] as const;

export const SOCIALS = {
  github: 'https://github.com/mdsdqk',
  linkedin: 'https://www.linkedin.com/in/mdsdqk',
  email: 'mdsdqk@gmail.com',
  rss: '/rss.xml',
} as const;

export type JsonLd = Record<string, unknown>;

export function personJsonLd(): JsonLd {
  return {
    '@type': 'Person',
    '@id': `${SITE.url}/#person`,
    name: SITE.author,
    alternateName: [SITE.brand, 's3q'],
    url: SITE.url,
    image: `${SITE.url}${SITE.ogImage}`,
    jobTitle: 'Fullstack Engineer',
    worksFor: {
      '@type': 'Organization',
      name: 'M2P Fintech',
    },
    sameAs: [SOCIALS.github, SOCIALS.linkedin],
    email: SOCIALS.email,
  };
}

export function websiteJsonLd(): JsonLd {
  return {
    '@type': 'WebSite',
    '@id': `${SITE.url}/#website`,
    name: SITE.title,
    url: SITE.url,
    description: SITE.description,
    inLanguage: SITE.locale,
    publisher: { '@id': `${SITE.url}/#person` },
  };
}

export function jsonLdGraph(nodes: JsonLd[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@graph': nodes,
  };
}

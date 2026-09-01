// Global site metadata. Framework-agnostic — import from anywhere via `@/lib/site`.

export const SITE = {
  /** Title-bar brand string. Finalized in the impeccable cycle; "Sadiq" for now. */
  brand: 'Sadiq',
  /** Role tagline — placeholder; settled in the impeccable cycle (ticket 12). */
  tagline: 'Software engineer & product builder',
  description:
    'Mohammed Sadiq — I build software products end to end. Writing and projects.',
  url: 'https://s3q.io',
  author: 'Mohammed Sadiq K',
  locale: 'en',
} as const;

/** Primary nav — new sections attach here as new top-level nouns (SPEC §6, §16). */
export const NAV = [
  { href: '/writing', label: 'Writing' },
  { href: '/projects', label: 'Projects' },
  { href: '/#about', label: 'About' },
] as const;

export const SOCIALS = {
  github: 'https://github.com/mdsdqk',
  linkedin: '',
  email: '',
  rss: '/rss.xml',
} as const;

import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE } from '@/lib/site';

// SPEC §6 — writing feed at /rss.xml, drafts excluded, summary (description) not full content.
export async function GET(context) {
  const posts = (await getCollection('writing', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  );

  return rss({
    title: `Writing — ${SITE.brand}`,
    description: SITE.description,
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/writing/${post.data.slug ?? post.id}`,
    })),
  });
}

/**
 * Topic hubs group blog posts into browsable, internally-linked clusters
 * (a pillar/section page at /blog/topics/[slug]). Each topic can declare an
 * optional on-site CTA target used by the in-content banner so supplement
 * articles funnel to the right place instead of the enclomiphene providers.
 */
export type BlogTopicCta = {
  eyebrow: string;
  title: string;
  body: string;
  buttonLabel: string;
  /** On-site href (keeps internal link equity; brand page handles outbound hop). */
  href: string;
};

export type BlogTopic = {
  slug: string;
  /** Short label for chips/breadcrumbs. */
  label: string;
  /** H1 on the hub page. */
  heading: string;
  /** Intro paragraph on the hub page. */
  intro: string;
  seoTitle: string;
  seoDescription: string;
  /** Optional CTA banner shown inside posts tagged with this topic. */
  cta?: BlogTopicCta;
};

export const BLOG_TOPICS: Record<string, BlogTopic> = {
  "critical-t": {
    slug: "critical-t",
    label: "Critical T",
    heading: "Critical T: Reviews, Ingredients & Honest Guides",
    intro:
      "Independent, in-depth coverage of Critical T — the Tongkat Ali, DIM, and Acacetin testosterone-support supplement from Critical Nutrition Labs. Reviews, ingredient science, dosing, side effects, real cost, and head-to-head comparisons, with no hype and clear disclaimers.",
    seoTitle: "Critical T: Reviews, Ingredients & Guides | T-Compare",
    seoDescription:
      "Everything on Critical T in one place: independent review, ingredient breakdown (Tongkat Ali, DIM, Acacetin), dosage, side effects, real cost, and comparisons.",
    cta: {
      eyebrow: "Natural testosterone support",
      title: "See Critical T pricing, ingredients & guarantee",
      body: "Review the formula, real cost, and 60-day guarantee on our independent Critical T page before you decide.",
      buttonLabel: "View Critical T details",
      href: "/t-supplements/critical-t",
    },
  },
};

export function getBlogTopic(slug: string): BlogTopic | undefined {
  return BLOG_TOPICS[slug];
}

/** Returns the first configured topic for a post (used to pick the in-content CTA). */
export function resolvePrimaryTopic(topics: string[] | undefined): BlogTopic | undefined {
  if (!topics) return undefined;
  for (const t of topics) {
    const topic = BLOG_TOPICS[t];
    if (topic) return topic;
  }
  return undefined;
}

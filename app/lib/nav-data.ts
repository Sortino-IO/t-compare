export type NavLink = { label: string; href: string };

// ── Enclomiphene providers ────────────────────────────────────────────────────
export const ENCLO_PROVIDERS: NavLink[] = [
  { label: "TTime", href: "/testosterone/enclomiphene/ttime" },
  { label: "Hims", href: "/testosterone/enclomiphene/hims" },
  { label: "Maximus Tribe", href: "/testosterone/enclomiphene/maximus-tribe" },
  { label: "Hone Health", href: "/testosterone/enclomiphene/hone-health" },
  { label: "Joi + Blokes", href: "/testosterone/enclomiphene/joi-blokes" },
  { label: "PeterMD", href: "/testosterone/enclomiphene/petermd" },
  { label: "Defy Medical", href: "/testosterone/enclomiphene/defy-medical" },
  { label: "ConciergeMD", href: "/testosterone/enclomiphene/concierge-md" },
];

// ── Testosterone supplement brands ───────────────────────────────────────────
export const SUPP_BRANDS: NavLink[] = [
  { label: "Critical T", href: "/t-supplements/critical-t" },
  { label: "TestoPrime", href: "/t-supplements/testoprime" },
  { label: "EndoPeak", href: "/t-supplements/endopeak" },
  { label: "ErecPrime", href: "/t-supplements/erecprime" },
  { label: "TestoGen", href: "/t-supplements/testogen" },
  { label: "Prime Male", href: "/t-supplements/prime-male" },
  { label: "Alpha Surge", href: "/t-supplements/alpha-surge" },
];

// ── Enclomiphene comparisons (5 key pairs) ───────────────────────────────────
export const ENCLO_COMPARISONS: NavLink[] = [
  { label: "TTime vs Hims", href: "/compare/hims-vs-ttime" },
  { label: "TTime vs Maximus Tribe", href: "/compare/maximus-tribe-vs-ttime" },
  { label: "TTime vs Hone Health", href: "/compare/hone-health-vs-ttime" },
  { label: "Hims vs Hone Health", href: "/compare/hims-vs-hone-health" },
  { label: "Hims vs Maximus Tribe", href: "/compare/hims-vs-maximus-tribe" },
];

// ── Supplement comparisons (5 key pairs) ─────────────────────────────────────
export const SUPP_COMPARISONS: NavLink[] = [
  { label: "Critical T vs TestoPrime", href: "/t-supplements/compare/critical-t-vs-testoprime" },
  { label: "Critical T vs TestoGen", href: "/t-supplements/compare/critical-t-vs-testogen" },
  { label: "Critical T vs Prime Male", href: "/t-supplements/compare/critical-t-vs-prime-male" },
  { label: "Critical T vs EndoPeak", href: "/t-supplements/compare/critical-t-vs-endopeak" },
  { label: "Critical T vs ErecPrime", href: "/t-supplements/compare/critical-t-vs-erecprime" },
];

// ── Key blog posts (5 featured) ───────────────────────────────────────────────
export const KEY_BLOG_POSTS: NavLink[] = [
  { label: "Critical T Review 2026", href: "/blog/critical-t-review-2026" },
  { label: "Best Testosterone Supplements 2026", href: "/blog/best-testosterone-supplements-2026" },
  { label: "How TTime Cut Enclomiphene Costs", href: "/blog/how-ttime-cut-enclomiphene-costs" },
  { label: "Signs of Low Testosterone", href: "/blog/signs-of-low-testosterone" },
  { label: "Critical T vs TRT", href: "/blog/critical-t-vs-trt" },
];

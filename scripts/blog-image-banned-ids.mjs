/**
 * Shared Unsplash `photo-*` policy for blog assets.
 * Keep in sync with docs/blog-image-guidelines.md (“Do not use”).
 *
 * - BROKEN_IDS: known bad suffix / 404 on images.unsplash.com - never substitute toward these in tooling.
 * - BANNED_IDS: removed for editorial/policy reasons (surgery/OR, stethoscope heroes, women-primary stock
 *   for men’s scope, etc.) - CI and dedupe must reject or replace them.
 */
export const BROKEN_UNSPLASH_PHOTO_IDS = new Set([
  "photo-1476480862126-207bf8fa9edc",
]);

export const BANNED_UNSPLASH_PHOTO_IDS = new Set([
  // Operating room / active surgery
  "photo-1551601651-2a8555f1a136",
  "photo-1579684385127-1ef15d508118",
  // Stethoscope as primary “medicine” shorthand
  "photo-1505751172876-fa1923c5c528",
  "photo-1612349317150-e413f6a5b16d",
  "photo-1576091160399-112ba8d25d1d",
  "photo-1576091160550-2173dba999ef",
  // Women-primary hero / female contraceptive blister (wrong scope for these articles)
  "photo-1579154204601-01588f351e67",
  "photo-1571019613454-1cb2f99b2d8b",
  "photo-1575879711582-0024b37f2bfa",
  // Manufacturing PPE that reads clinical; sternotomy scar hero
  "photo-1551884170-09fb70a3a2ed",
  "photo-1597892653980-3cec697283fe",
  // Hospitality - guidelines: avoid as filler
  "photo-1582719478250-c89cae4dc85b",
  // Readable non-English text on clothing (editorial: keep stock language-neutral)
  "photo-1626624156750-f20ecfce6f8b",
]);

/** Any ID that must never appear in posts.json Unsplash URLs */
export const FORBIDDEN_UNSPLASH_PHOTO_IDS = new Set([
  ...BROKEN_UNSPLASH_PHOTO_IDS,
  ...BANNED_UNSPLASH_PHOTO_IDS,
]);

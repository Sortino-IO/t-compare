/** Per-ingredient photos under /public/lp — run scripts/download-lp-images.mjs */
export const LP_INGREDIENT_IMAGES = {
  tongkat: "/lp/ingredient-tongkat.jpg",
  epimedium: "/lp/ingredient-epimedium.jpg",
  "saw palmetto": "/lp/ingredient-saw-palmetto.jpg",
  hawthorn: "/lp/ingredient-hawthorn.jpg",
  tribulus: "/lp/ingredient-tribulus.jpg",
  magnesium: "/lp/ingredient-magnesium.jpg",
  dim: "/lp/ingredient-dim.jpg",
  acacetin: "/lp/ingredient-acacetin.jpg",
  chrysin: "/lp/ingredient-chrysin.jpg",
  winged: "/lp/ingredient-winged.jpg",
  "beet root": "/lp/ingredient-beet.jpg",
  beet: "/lp/ingredient-beet.jpg",
  "l-arginine": "/lp/ingredient-powder.jpg",
  arginine: "/lp/ingredient-powder.jpg",
  "l-citrulline": "/lp/ingredient-citrulline.jpg",
  citrulline: "/lp/ingredient-citrulline.jpg",
  "horny goat": "/lp/ingredient-horny-goat.jpg",
  ginkgo: "/lp/ingredient-ginkgo.jpg",
  "d-aspartic": "/lp/ingredient-capsule.jpg",
  aspartic: "/lp/ingredient-capsule.jpg",
  "dong quai": "/lp/ingredient-dong-quai.jpg",
  niacin: "/lp/ingredient-niacin.jpg",
} as const;

const FALLBACK = LP_INGREDIENT_IMAGES.tongkat;

/** Longer needles first so "saw palmetto" wins over partial matches. */
const MATCH_ORDER = [
  "saw palmetto",
  "beet root",
  "l-citrulline",
  "l-arginine",
  "d-aspartic",
  "dong quai",
  "horny goat",
  "hawthorn",
  "epimedium",
  "tribulus",
  "magnesium",
  "chrysin",
  "winged",
  "citrulline",
  "arginine",
  "acacetin",
  "ginkgo",
  "niacin",
  "tongkat",
  "beet",
  "dim",
] as const;

/** Match ingredient display name → dedicated image (one unique photo per card). */
export function ingredientImageForName(name: string): string {
  const key = name.toLowerCase();
  for (const needle of MATCH_ORDER) {
    if (key.includes(needle)) return LP_INGREDIENT_IMAGES[needle];
  }
  return FALLBACK;
}

/** Prefer explicit per-card image (e.g. TedsWoodworking feature photos). */
export function ingredientCardImage(ing: { name: string; image?: string }): string {
  return ing.image ?? ingredientImageForName(ing.name);
}

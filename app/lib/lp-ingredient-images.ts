/** Shared herb / supplement photos for men's formula LPs */
export const LP_INGREDIENT_IMAGES: Record<string, string> = {
  tongkat: "/lp/ingredient-tongkat.jpg",
  epimedium: "/lp/ingredient-acacetin.jpg",
  "saw palmetto": "/lp/ingredient-tongkat.jpg",
  hawthorn: "/lp/ingredient-dim.jpg",
  tribulus: "/lp/ingredient-acacetin.jpg",
  chrysin: "/lp/ingredient-tongkat.jpg",
  winged: "/lp/ingredient-acacetin.jpg",
  magnesium: "/lp/ingredient-dim.jpg",
  dim: "/lp/ingredient-dim.jpg",
  acacetin: "/lp/ingredient-acacetin.jpg",
};

export function ingredientImageForName(name: string): string | undefined {
  const key = name.toLowerCase();
  for (const [needle, src] of Object.entries(LP_INGREDIENT_IMAGES)) {
    if (key.includes(needle)) return src;
  }
  return LP_INGREDIENT_IMAGES.tongkat;
}

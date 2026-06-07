import { ERECPRIME_LP1_IMAGES } from "./erecprime-lp1-images";

/** ErecPrime LP2 — bento, reviews; packages & ingredients reuse LP1 assets */
export const ERECPRIME_LP2_IMAGES = {
  bento: {
    stamina: "/lp/erecprime-lp2-bento-stamina.png",
    energy: "/lp/erecprime-lp2-bento-energy.png",
    circulation: "/lp/erecprime-lp2-bento-circulation.png",
    gym: "/lp/erecprime-lp2-bento-gym.png",
  },
  reviews: [
    "/lp/erecprime-lp2-review-1.png",
    "/lp/erecprime-lp2-review-2.png",
    "/lp/erecprime-lp2-review-3.png",
    "/lp/erecprime-lp2-review-4.png",
    "/lp/erecprime-lp2-review-5.png",
    "/lp/erecprime-lp2-review-6.png",
    "/lp/erecprime-lp2-review-7.png",
    "/lp/erecprime-lp2-review-8.png",
    "/lp/erecprime-lp2-review-9.png",
  ],
  packages: ERECPRIME_LP1_IMAGES,
  ingredients: ERECPRIME_LP1_IMAGES.ingredients,
} as const;

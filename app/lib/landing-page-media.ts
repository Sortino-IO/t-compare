import type { LpTestimonial } from "./landing-pages";
import { isTestosteroneSupplementLp } from "./testosterone-lp";

export type LpMedia = {
  heroImage: string;
  heroImageAlt: string;
  /** Fills hero product card (replaces empty gradient badge) */
  heroProductImage?: string;
  heroProductImageAlt?: string;
  heroProductImagePosition?: string;
  heroImageCaption?: string;
  heroImageSubcaption?: string;
  splitImage: string;
  splitImageAlt: string;
  gallery: { src: string; alt: string }[];
};

/** Local assets under /public/lp — downloaded via scripts/download-lp-images.mjs */
const IMG = {
  avatar1: "/lp/avatar-1.jpg",
  avatar2: "/lp/avatar-2.jpg",
  avatar3: "/lp/avatar-3.jpg",
  avatar4: "/lp/avatar-4.jpg",
  gymStrength: "/lp/gym-strength.jpg",
  gymTraining: "/lp/gym-training.jpg",
  manRunning: "/lp/man-running.jpg",
  workoutSession: "/lp/workout-session.jpg",
  yogaStretch: "/lp/yoga-stretch.jpg",
  coupleActive: "/lp/couple-active.jpg",
  coupleTogether: "/lp/couple-together.jpg",
  manPortraitSmile: "/lp/man-portrait-smile.jpg",
  /** Verified male lifestyle — used for supplement LP heroes (avoids bad stock swaps). */
  heroManFitness: "/lp/hero-man-fitness.jpg",
  /** Generic white capsule bottle — supplement LP product hero (not brand-specific). */
  supplementBottleHero: "/lp/supplement-bottle-hero.jpg",
  coupleHappy: "/lp/couple-happy.jpg",
  couplePartner: "/lp/couple-outdoor-together.jpg",
  teamMeeting: "/lp/team-meeting.jpg",
  gymLifting: "/lp/gym-lifting.jpg",
  meditationCalm: "/lp/meditation-calm.jpg",
  manConfident: "/lp/man-confident.jpg",
  woodWorkshop1: "/lp/wood-workshop-1.jpg",
  woodCraft2: "/lp/wood-craft-2.jpg",
  woodInterior3: "/lp/wood-interior-3.jpg",
  woodFurniture4: "/lp/wood-furniture-4.jpg",
  woodProject5: "/lp/wood-project-5.jpg",
  woodHome6: "/lp/wood-home-6.jpg",
  tedHeroCraftsman: "/lp/ted-hero-craftsman-table.png",
  tedCraftsmanPortrait: "/lp/ted-craftsman-portrait.png",
  tedSketchTo3d: "/lp/ted-sketch-to-3d.png",
  tedTableSawBlueprint: "/lp/ted-table-saw-blueprint.png",
  tedMortiseTenon: "/lp/ted-mortise-tenon.png",
  tedExplodedTable: "/lp/ted-exploded-table.png",
  tedLibraryTablet: "/lp/ted-library-tablet.png",
  tedMeasuring: "/lp/ted-measuring-precision.png",
  tedMaterialsCart: "/lp/ted-materials-cart.png",
  tedMultiDevice: "/lp/ted-multi-device-plans.png",
  tedOfferBundle: "/lp/ted-offer-bundle.png",
  tedOfferBanner: "/lp/ted-offer-banner.png",
  tedCutList: "/lp/ted-cut-list-clipboard.png",
} as const;

/** Male-presenting faces for supplement LPs (avoid mismatched stock portraits). */
const SUPPLEMENT_AVATARS = [IMG.avatar2, IMG.avatar3, IMG.avatar4];
const AVATARS = [IMG.avatar1, IMG.avatar2, IMG.avatar3, IMG.avatar4];

export const LP_MEDIA: Record<string, LpMedia> = {
  "critical-t-lp1": {
    heroImage: IMG.heroManFitness,
    heroImageAlt: "Fit man training — Critical T daily support",
    heroImageCaption: "Feel the difference.",
    heroImageSubcaption: "Join thousands of men already on Critical T",
    splitImage: IMG.gymTraining,
    splitImageAlt: "Man working out at the gym with focus",
    gallery: [
      { src: IMG.gymLifting, alt: "Man lifting weights in gym" },
      { src: IMG.manRunning, alt: "Fit man running outdoors" },
      { src: IMG.couplePartner, alt: "Happy couple outdoors together" },
      { src: IMG.manConfident, alt: "Confident man feeling vital" },
    ],
  },
  "endopeak24-lp1": {
    heroImage: IMG.heroManFitness,
    heroImageAlt: "Confident man smiling — EndoPeak vitality support",
    heroProductImage: "/lp/endopeak-lp1-hero-product.png",
    heroProductImageAlt: "EndoPeak dietary supplement — 60 capsules",
    heroImageCaption: "Feel the edge again.",
    heroImageSubcaption: "Join thousands of men already on EndoPeak",
    splitImage: "/lp/endopeak-lp1-benefits-glance.png",
    splitImageAlt: "Confident man at home — EndoPeak vitality support",
    gallery: [
      { src: IMG.gymLifting, alt: "Man lifting weights in gym" },
      { src: IMG.workoutSession, alt: "Man training with intensity" },
      { src: IMG.coupleHappy, alt: "Happy man and woman enjoying life together" },
      { src: IMG.coupleTogether, alt: "Happy couple outdoors together" },
    ],
  },
  "erecprime24-lp1": {
    heroImage: IMG.manConfident,
    heroImageAlt: "Confident man — ErecPrime performance support",
    heroImageCaption: "Perform with confidence.",
    heroImageSubcaption: "Join thousands of men already on ErecPrime",
    splitImage: IMG.gymLifting,
    splitImageAlt: "Man training hard at the gym",
    gallery: [
      { src: IMG.workoutSession, alt: "Man mid-workout with energy" },
      { src: IMG.gymTraining, alt: "Man building strength at gym" },
      { src: IMG.coupleTogether, alt: "Happy man and woman with connection" },
      { src: IMG.manPortraitSmile, alt: "Smiling man feeling his best" },
    ],
  },
  "critical-t-lp2": {
    heroImage: IMG.manPortraitSmile,
    heroImageAlt: "Confident man — Critical T natural support",
    splitImage: IMG.gymTraining,
    splitImageAlt: "Man training at the gym",
    gallery: [
      { src: IMG.gymLifting, alt: "Man lifting weights in gym" },
      { src: IMG.workoutSession, alt: "Man working out with intensity" },
      { src: IMG.manConfident, alt: "Confident man feeling strong" },
      { src: IMG.gymStrength, alt: "Strength training at the gym" },
    ],
  },
  "endopeak24-lp2": {
    heroImage: IMG.manPortraitSmile,
    heroImageAlt: "Confident man — EndoPeak men's formula",
    splitImage: IMG.gymTraining,
    splitImageAlt: "Man training at the gym",
    gallery: [
      { src: IMG.gymLifting, alt: "Man lifting in fitness center" },
      { src: IMG.workoutSession, alt: "Intense gym workout" },
      { src: IMG.manConfident, alt: "Confident man feeling strong" },
      { src: IMG.coupleHappy, alt: "Happy couple together" },
    ],
  },
  "erecprime24-lp2": {
    heroImage: IMG.manConfident,
    heroImageAlt: "Confident man — ErecPrime performance formula",
    splitImage: IMG.workoutSession,
    splitImageAlt: "Man working out with power and focus",
    gallery: [
      { src: IMG.gymTraining, alt: "Man training at gym" },
      { src: IMG.gymLifting, alt: "Strength training session" },
      { src: IMG.coupleHappy, alt: "Happy man and woman with energy" },
      { src: IMG.manPortraitSmile, alt: "Smiling confident man" },
    ],
  },
  "nitric-boost-lp1": {
    heroImage: IMG.gymLifting,
    heroImageAlt: "Powerful man training with explosive energy",
    splitImage: IMG.manRunning,
    splitImageAlt: "Athletic man building stamina outdoors",
    gallery: [
      { src: IMG.workoutSession, alt: "Intense gym workout session" },
      { src: IMG.manConfident, alt: "Confident man feeling his best" },
      { src: IMG.coupleHappy, alt: "Happy man and woman enjoying life" },
      { src: IMG.gymStrength, alt: "Man lifting heavy weights" },
    ],
  },
  "nitric-boost-lp2": {
    heroImage: IMG.gymLifting,
    heroImageAlt: "Athletic man training with power and focus",
    splitImage: IMG.manRunning,
    splitImageAlt: "Man building stamina with outdoor cardio",
    gallery: [
      { src: IMG.gymTraining, alt: "Man training with focus" },
      { src: IMG.coupleHappy, alt: "Happy man and woman reconnected" },
      { src: IMG.coupleTogether, alt: "Man and woman enjoying time together" },
      { src: IMG.manConfident, alt: "Confident man feeling his best" },
    ],
  },
  "tedplansdiy-lp1": {
    heroImage: IMG.tedHeroCraftsman,
    heroImageAlt: "Woodworker with finished dining table and tablet plan in workshop",
    splitImage: IMG.tedSketchTo3d,
    splitImageAlt: "Hand sketch and 3D CAD plan for a woodworking project",
    gallery: [
      { src: IMG.tedCraftsmanPortrait, alt: "Smiling woodworker with finished table in shop" },
      { src: IMG.tedMultiDevice, alt: "Workbench, laptop, tablet, and phone showing woodworking plans" },
      { src: IMG.tedLibraryTablet, alt: "Woodworking project library on tablet in the shop" },
      { src: IMG.tedMaterialsCart, alt: "Lumber cart with materials and cutting plan at hardware store" },
    ],
  },
  "tedplansdiy-lp2": {
    heroImage: IMG.tedTableSawBlueprint,
    heroImageAlt: "Woodworker at table saw with coffee table blueprint on the wall",
    splitImage: IMG.tedMortiseTenon,
    splitImageAlt: "Mortise and tenon plan with confirmed dado cut on hardwood",
    gallery: [
      { src: IMG.tedCutList, alt: "Wood stock checklist and cut dimensions on workbench" },
      { src: IMG.tedMeasuring, alt: "Measuring wood with folding ruler and pencil" },
      { src: IMG.tedExplodedTable, alt: "Exploded technical diagram of a trestle dining table" },
      { src: IMG.tedSketchTo3d, alt: "Sketch on paper next to 3D chair model on screen" },
    ],
  },
  "tedplansdiy-lp3": {
    heroImage: IMG.tedTableSawBlueprint,
    heroImageAlt: "Shop-tested build at the table saw with plan pinned nearby",
    splitImage: IMG.tedLibraryTablet,
    splitImageAlt: "Searchable woodworking project library on tablet in the shop",
    gallery: [],
  },
};

export function getLpMedia(slug: string): LpMedia {
  const base = LP_MEDIA[slug] ?? LP_MEDIA["critical-t-lp1"]!;
  if (!isTestosteroneSupplementLp(slug)) return base;
  return {
    ...base,
    heroProductImage: base.heroProductImage ?? IMG.supplementBottleHero,
    heroProductImageAlt:
      base.heroProductImageAlt ?? "White supplement capsule bottle — illustrative product photo",
  };
}

export function testimonialAvatar(index: number, slug?: string): string {
  const pool = slug && isTestosteroneSupplementLp(slug) ? SUPPLEMENT_AVATARS : AVATARS;
  return pool[index % pool.length]!;
}

export function withAvatars(
  testimonials: LpTestimonial[],
  slug?: string,
): (LpTestimonial & { avatarUrl: string })[] {
  return testimonials.map((t, i) => ({ ...t, avatarUrl: testimonialAvatar(i, slug) }));
}

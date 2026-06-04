/** LP3 "Included With Lifetime Access" — filenames match uploaded assets */
export const TED_LP3_INCLUDED_IMAGES = {
  projectPlans16000: "/lp/ted-included-16000-project-plans.png",
  dwgCadViewer: "/lp/ted-included-dwg-cad-viewer.png",
  videoTutorials150: "/lp/ted-included-150-video-tutorials.png",
  businessStarterGuide: "/lp/ted-included-business-starter-guide.png",
  woodworkingManual200: "/lp/ted-included-200-page-woodworking-manual.png",
  customPlanRequests: "/lp/ted-included-custom-plan-requests.png",
} as const;

/** Feature card images for TedsWoodworking LPs — "What Makes These Plans Different" */
export const TED_FEATURE_IMAGES = {
  shopTestedBlueprints: "/lp/ted-feature-shop-tested-blueprints.png",
  exactCutMaterials: "/lp/ted-feature-exact-cut-materials.png",
  searchableLibrary: "/lp/ted-feature-searchable-library.png",
  smallShopFriendly: "/lp/ted-feature-small-shop-friendly.png",
  monthlyPlanDrops: "/lp/ted-feature-monthly-plan-drops.png",
  customPlanRequests: "/lp/ted-feature-custom-plan-requests.png",
} as const;

export const TED_DIFFERENTIATOR_CARDS = [
  {
    name: "Shop-Tested Blueprints",
    benefit: "Every plan physically built before publication",
    image: TED_FEATURE_IMAGES.shopTestedBlueprints,
  },
  {
    name: "Exact Cut & Materials Lists",
    benefit: "Buy exactly what you need — down to the last screw",
    image: TED_FEATURE_IMAGES.exactCutMaterials,
  },
  {
    name: "Searchable Library",
    benefit: "Filter by category, keyword, or difficulty in minutes",
    image: TED_FEATURE_IMAGES.searchableLibrary,
  },
  {
    name: "Small-Shop Friendly",
    benefit: "Most projects need table saw, drill, clamps, sander",
    image: TED_FEATURE_IMAGES.smallShopFriendly,
  },
  {
    name: "Monthly Plan Drops",
    benefit: "5+ new tested plans added free every month for life",
    image: TED_FEATURE_IMAGES.monthlyPlanDrops,
  },
  {
    name: "Custom Plan Requests",
    benefit: "Can't find it? Ted's team drafts, builds, and delivers it",
    image: TED_FEATURE_IMAGES.customPlanRequests,
  },
] as const;

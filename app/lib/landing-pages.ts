import { LANDING_PAGES_LP2 } from "./landing-pages-lp2";
import { LANDING_PAGES_NITRIC_BOOST } from "./landing-pages-nitric-boost";
import { LANDING_PAGES_TEDPLANS } from "./landing-pages-tedplans";

export type LpTheme = {
  primary: string;
  primaryDark: string;
  accent: string;
  accentHover: string;
  accentText: string;
  heroBg: string;
  sectionBg: string;
  cardBg: string;
  border: string;
  text: string;
  muted: string;
};

export type LpPackage = {
  id: string;
  title: string;
  subtitle: string;
  pricePerBottle: string;
  total: string;
  regularTotal?: string;
  savings?: string;
  badge?: string;
  shipping: string;
  highlight?: boolean;
  ctaLabel: string;
  /** Product shot for funnel-style pricing columns */
  productImage?: string;
  productImageAlt?: string;
  /** CSS object-position when using a shared funnel screenshot */
  productImagePosition?: string;
  /** Official-style column header (e.g. STARTER, BEST VALUE!) */
  funnelHeader?: string;
  funnelSubheader?: string;
  /** Large price line under product image */
  priceDisplay?: string;
  /** Secondary price line */
  priceSubline?: string;
  /** CSS bottle mockup count when no productImage */
  bottleCount?: number;
  /** Red burst text e.g. SAVE $209 */
  savingsBurst?: string;
  /** Extra perk rows with checkmarks */
  perkLines?: string[];
};

export type LpPricingFunnelConfig = {
  layout: "supplement-funnel";
  /** Column order left → right */
  columnOrder: string[];
  sectionTitle?: string;
  footerNote?: string;
  /** Header bg for highlighted (center) column */
  highlightHeaderBg?: string;
};

export type LpTestimonial = {
  name: string;
  location: string;
  quote: string;
  packageLabel: string;
};

export type LpTimelineStep = {
  milestone: string;
  title: string;
  body: string;
};

export type LpOfferStackItem = {
  text: string;
  /** e.g. "($297 Value)" — shown in red */
  value?: string;
};

export type LpOfferStack = {
  preHeadline?: string;
  bundleImage?: string;
  bundleImageAlt?: string;
  items: LpOfferStackItem[];
  bonusTitle?: string;
  bonuses: LpOfferStackItem[];
  /** e.g. guarantee line below bonuses */
  extras?: LpOfferStackItem[];
  totalValue: string;
  priceLabel?: string;
  offerPrice: string;
  ctaLabel?: string;
  secondaryLinkLabel?: string;
};

export type LpStoryBlock = {
  paragraphs: string[];
  image: string;
  imageAlt: string;
  imagePosition: "left" | "right";
};

export type LpStorySection = {
  title: string;
  introParagraphs?: string[];
  blocks: LpStoryBlock[];
  footerParagraph?: string;
};

export type LpProductMeta = {
  /** Digital / woodworking — hides supplement footer, adjusts trust copy */
  isDigitalProduct?: boolean;
  trustItems?: readonly string[];
  galleryTitle?: string;
  heroTagline?: string;
  heroSocialProof?: string;
  stickyCtaLabel?: string;
  heroBottleCount?: number;
  advertorialMasthead?: { category: string; publication: string; author?: string };
  pricingHeadline?: string;
};

export type LpLayoutVariant = "lp1" | "lp2";
export type Lp2Style = "dtc" | "advertorial" | "bento";

export type LandingPageConfig = {
  slug: string;
  variant?: LpLayoutVariant;
  lp2Style?: Lp2Style;
  brandName: string;
  productName: string;
  ctaUrl: string;
  seoTitle: string;
  seoDescription: string;
  theme: LpTheme;
  urgencyHeadline: string;
  heroHeadline: string;
  heroSubheadline: string;
  heroBullets: string[];
  hookParagraphs: string[];
  problemTitle: string;
  problemBullets: string[];
  solutionTitle: string;
  solutionParagraphs: string[];
  ingredientsTitle: string;
  ingredients: { name: string; benefit: string; image?: string }[];
  benefitsTitle: string;
  benefits: string[];
  testimonials: LpTestimonial[];
  guaranteeTitle: string;
  guaranteeParagraphs: string[];
  packages: LpPackage[];
  faq: { q: string; a: string }[];
  finalCtaHeadline: string;
  timeline?: LpTimelineStep[];
  /** Override product card subtitle (default: "Daily Formula") */
  productBadgeLine?: string;
  /** Override pricing unit label (default: "per bottle") */
  packagePriceLabel?: string;
  /** Full value-stack offer block (plans, bonuses, anchored price) */
  offerStack?: LpOfferStack;
  productMeta?: LpProductMeta;
  /** Replaces lifestyle gallery grid (e.g. Magic Morning narrative) */
  storySection?: LpStorySection;
  pricingFunnel?: LpPricingFunnelConfig;
};

export const LANDING_PAGES_LP1: LandingPageConfig[] = [
  {
    slug: "critical-t-lp1",
    brandName: "Critical T",
    productName: "Critical T",
    ctaUrl:
      "https://9dcacr3eqbms0qez2408eyse51.hop.clickbank.net/?&traffic_source=blog&traffic_type=paid&campaign=t-compare",
    seoTitle: "Critical T — Support Natural Testosterone From $55/mo",
    seoDescription:
      "Try Critical T: Tongkat Ali, DIM & Acacetin in a daily two-capsule stack. Subscribe from $55/mo, 60-day guarantee. Limited pricing on this page.",
    theme: {
      primary: "#0c2340",
      primaryDark: "#081829",
      accent: "#e8a317",
      accentHover: "#cf8f0f",
      accentText: "#0c2340",
      heroBg: "linear-gradient(165deg, #0c2340 0%, #163a5f 55%, #0c2340 100%)",
      sectionBg: "#f4f6f9",
      cardBg: "#ffffff",
      border: "#d4dce8",
      text: "#1a1a1a",
      muted: "#5c6570",
    },
    urgencyHeadline: "WAIT — You qualify for increased savings on Critical T",
    heroHeadline: "The 10-Second Morning Ritual That Supports Your Body's Natural Testosterone",
    heroSubheadline:
      "Critical T combines Tongkat Ali, DIM, and Acacetin in one calibrated stack — built to support healthy T production while keeping estrogen in check.",
    heroBullets: [
      "Subscribe & Save from ~$55/mo — among the lowest entry prices we track",
      "Two capsules each morning — no injections, no clinic visits",
      "60-day money-back guarantee (even empty bottles, per vendor terms)",
      "FDA-registered facility · zero-fillers capsule framing on official site",
    ],
    hookParagraphs: [
      "If you've been dragging through mornings, losing gym momentum, or feeling like your edge slipped somewhere after 35 — you're not imagining it. Free testosterone naturally declines with age, and most store-bought \"boosters\" never address the full picture.",
      "Critical Nutrition Labs built Critical T around a \"one-two punch\" — Tongkat Ali to support luteinizing hormone and natural T signaling, DIM to help your liver process excess estrogen, and Acacetin from Turnera diffusa for aromatase-related balance framing.",
      "This page unlocks the same bundle pricing structure shown on the official offer — including Subscribe & Save and multi-bottle discounts — so you can lock in your package before inventory resets.",
    ],
    problemTitle: "Why Most Men Still Feel Stuck (Even With \"Testosterone Boosters\")",
    problemBullets: [
      "Single-ingredient formulas ignore estrogen balance — T can rise while usable free T stays flat",
      "Aggressive TRT costs $500–$1,000+/mo and requires needles, labs, and ongoing clinic visits",
      "Cheap Amazon blends hide under-dosed proprietary mixes with no guarantee you'll feel anything",
      "Low energy, weaker workouts, and declining drive compound — and willpower alone won't fix hormones",
    ],
    solutionTitle: "Critical T Delivers a Calibrated Daily Stack — Not a Random Herb Blend",
    solutionParagraphs: [
      "Every morning, two capsules of Critical T deliver three research-backed pillars: Tongkat Ali (Eurycoma longifolia) for natural testosterone pathway support, DIM for estrogen metabolism in the liver, and Acacetin for balance framing that competitors skip.",
      "Unlike funnel copy that promises overnight miracles, Critical T is positioned as consistent daily support — most men planning a fair trial should budget at least 60 days to assess how they feel on energy, drive, and training recovery.",
      "You're not buying hype. You're buying a structured formula from Critical Nutrition Labs with transparent bundle math and a guarantee that lets you test it on your body — not on marketing promises.",
    ],
    ingredientsTitle: "Inside Every Critical T Dose",
    ingredients: [
      {
        name: "Tongkat Ali",
        benefit: "Supports natural testosterone signaling via luteinizing hormone pathways",
        image: "/lp/ingredient-tongkat.jpg",
      },
      {
        name: "DIM",
        benefit: "Helps the liver convert excess estrogen into inactive forms",
        image: "/lp/ingredient-dim.jpg",
      },
      {
        name: "Acacetin",
        benefit: "From Turnera diffusa — marketed for aromatase balance support",
        image: "/lp/ingredient-acacetin.jpg",
      },
    ],
    storySection: {
      title: "The Magic Morning",
      introParagraphs: [
        "Imagine waking up every morning with the energy and drive you had in your twenties — before the slow drain of age, stress, and declining hormones.",
        "Critical T is built around a simple daily ritual: two capsules with water, then get on with your day. No injections. No clinic visits. Just consistent support for the pathways that matter.",
      ],
      blocks: [
        {
          imagePosition: "right",
          image: "/lp/couple-happy.jpg",
          imageAlt: "Happy couple enjoying closeness and energy together",
          paragraphs: [
            "When your body has the raw materials to support healthy testosterone and balanced estrogen metabolism, many men report feeling more present at home — not just in the gym.",
            "More morning energy often translates into better mood, patience, and connection with your partner. That is the \"magic morning\" most men are really chasing: vitality that shows up everywhere, not just on a lab printout.",
          ],
        },
        {
          imagePosition: "left",
          image: "/lp/man-running.jpg",
          imageAlt: "Fit mature man running outdoors with confidence",
          paragraphs: [
            "Training feels different when recovery and drive improve. Men who stick with Critical T for 60–90 days often describe pushing harder in workouts without feeling wrecked the next day.",
            "Whether you are 35 or 55, the goal is the same: wake up ready to move, work, and live — not negotiate with your alarm clock every morning.",
          ],
        },
      ],
      footerParagraph:
        "Critical T retails for $69 per bottle on the official site. This page routes you to bundle and Subscribe & Save pricing so you pay less per month when you commit to a fair trial window.",
    },
    productMeta: {
      heroSocialProof: "Join thousands of men already supporting natural T with Critical T",
      galleryTitle: "The Magic Morning",
    },
    benefitsTitle: "What Optimized Daily Support Can Feel Like",
    benefits: [
      "Wake up with clearer morning energy instead of hitting snooze three times",
      "Push harder in the gym with better recovery between sessions",
      "Feel sharper decisions and motivation at work — not just in the bedroom",
      "Support libido and stamina as part of overall male vitality, not as a separate problem",
      "Stack consistently without injections, prescriptions, or clinic scheduling",
    ],
    testimonials: [
      {
        name: "Marcus T.",
        location: "Colorado, USA",
        quote:
          "I tried three different boosters from Amazon before Critical T. This is the first one where I actually felt a difference in week two — more morning energy and I'm back to training four days a week.",
        packageLabel: "90-day supply",
      },
      {
        name: "Daniel R.",
        location: "Florida, USA",
        quote:
          "Subscribe pricing made it a no-brainer to test. Sixty days in, my wife noticed before I did — more energy after work and I'm not crashing on the couch by 8pm.",
        packageLabel: "Subscribe & Save",
      },
      {
        name: "Kevin L.",
        location: "Ohio, USA",
        quote:
          "The bulk bundle math finally made sense for me. Six bottles at the lowest per-capsule cost — and the guarantee meant zero risk trying the full run.",
        packageLabel: "Best value bundle",
      },
    ],
    guaranteeTitle: "60-Day Critical T Money-Back Guarantee",
    guaranteeParagraphs: [
      "Try Critical T for a full 60 days. If you're not satisfied — for any reason — request a refund per vendor terms. Official copy states you can return even empty bottles for a full refund (minus shipping and handling where applicable).",
      "That means you can say \"maybe\" today and let your body answer the question over the next two months — not a marketing headline.",
    ],
    packages: [
      {
        id: "starter",
        title: "Subscribe & Save",
        subtitle: "1 bottle · delivered monthly",
        pricePerBottle: "$55.20",
        total: "$55.20/mo",
        shipping: "+ $5.99 shipping",
        ctaLabel: "Start Subscribe & Save",
      },
      {
        id: "popular",
        title: "Most Popular",
        subtitle: "90-day supply · 3 bottles",
        pricePerBottle: "$59",
        total: "$177",
        regularTotal: "$207",
        savings: "Save $30",
        badge: "FREE US SHIPPING",
        shipping: "Fast & free US shipping",
        highlight: true,
        ctaLabel: "Claim 3-Bottle Package",
      },
      {
        id: "best",
        title: "Best Value",
        subtitle: "120-day supply · Buy 1 Get 3 Free",
        pricePerBottle: "$16.75",
        total: "$67",
        regularTotal: "$276",
        savings: "Save $209",
        badge: "BIGGEST DISCOUNT",
        shipping: "+ $7.99 shipping",
        ctaLabel: "Claim Best Value Bundle",
      },
    ],
    faq: [
      {
        q: "How do I take Critical T?",
        a: "Take two capsules once daily with water in the morning, with or without food — as directed on the official label.",
      },
      {
        q: "How long until I notice a difference?",
        a: "Some men report early shifts in energy within the first couple of weeks. Critical T's own FAQ recommends at least 60 days for a fair assessment of how you feel on training, drive, and daily stamina.",
      },
      {
        q: "Is Critical T a prescription?",
        a: "No. It's an OTC dietary supplement, not TRT or enclomiphene. It supports natural pathways — it does not supply exogenous testosterone.",
      },
      {
        q: "What if it doesn't work for me?",
        a: "You're covered by the 60-day money-back guarantee advertised on the official checkout page. Review live terms at checkout for the latest return language.",
      },
    ],
    finalCtaHeadline: "Lock In Critical T Pricing Before This Page Resets",
  },
  {
    slug: "endopeak24-lp1",
    brandName: "EndoPeak",
    productName: "EndoPeak",
    ctaUrl:
      "https://42ad2cskk5msam5atc1eq2ur5a.hop.clickbank.net/?&traffic_source=blog&traffic_type=paid&campaign=t-compare",
    seoTitle: "EndoPeak — Men's Vitality Stack From $49/Bottle Bulk",
    seoDescription:
      "EndoPeak: 8-ingredient men's wellness formula. Try intro or bulk bundles with 60-day guarantee. Limited offer on this private page.",
    theme: {
      primary: "#0d3d2e",
      primaryDark: "#082a20",
      accent: "#d4a017",
      accentHover: "#b8890f",
      accentText: "#0d3d2e",
      heroBg: "linear-gradient(165deg, #0d3d2e 0%, #1a5c45 50%, #0d3d2e 100%)",
      sectionBg: "#f3f7f5",
      cardBg: "#ffffff",
      border: "#c8ddd4",
      text: "#1a1a1a",
      muted: "#5a6b63",
    },
    urgencyHeadline: "WAIT — Your EndoPeak discount is still active",
    heroHeadline: "Reclaim Stamina, Drive & Confidence With One Daily Capsule",
    heroSubheadline:
      "EndoPeak packs 8 botanical ingredients — Tongkat Ali, Epimedium, Saw Palmetto & more — into a men's wellness formula built for energy, circulation, and performance.",
    heroBullets: [
      "8 carefully selected ingredients in every capsule",
      "Bulk bundles from ~$49/bottle with free US shipping on larger tiers",
      "60-day money-back guarantee on official checkout",
      "Manufactured in an FDA-registered, GMP-certified US facility",
    ],
    hookParagraphs: [
      "You've felt it — the slow leak of energy after 40. Workouts take longer to recover from. Desire isn't gone, but it's not what it used to be. And every \"miracle pill\" ad looks the same.",
      "EndoPeak is different in structure: eight named botanicals targeting circulation, libido, stress resilience, and testosterone pathway support — not a single under-dosed ingredient buried in a proprietary blend.",
      "On this private page you can access the same multi-bottle savings shown on the official order funnel — before the countdown hits zero and pricing resets.",
    ],
    problemTitle: "The Real Reason \"Just Try Harder\" Stops Working",
    problemBullets: [
      "Declining blood flow and stamina affect gym performance and intimate confidence together",
      "Stress and poor sleep accelerate the slide — willpower can't outrun biology forever",
      "One-ingredient supplements miss the synergy that multi-botanical stacks can provide",
      "Prescription paths cost more, take longer, and aren't what every man wants to jump into first",
    ],
    solutionTitle: "EndoPeak: One Capsule, Eight Pathways, Zero Needles",
    solutionParagraphs: [
      "Take EndoPeak with water after your first meal of the day. The formula combines Hawthorn Berry for circulation, Tribulus and Tongkat Ali for libido and performance framing, Epimedium for blood flow, Saw Palmetto for healthy testosterone production support, plus Chrysin, Winged Treebine, and Magnesium.",
      "EndoPeak's funnel pricing rewards commitment: intro tiers run higher per bottle, but the 90- and 180-day packages drop to $59 and $49 per bottle with free US shipping — the math most smart buyers use after a fair trial.",
      "Thousands of men have already tested this exact formula through the official funnel. This page routes you to the same checkout — with your discount structure intact.",
    ],
    ingredientsTitle: "Inside Every EndoPeak Capsule",
    ingredients: [
      { name: "Tongkat Ali", benefit: "Boosts sexual performance & male vitality signaling", image: "/lp/ingredient-tongkat.jpg" },
      { name: "Epimedium", benefit: "Facilitates blood flow where it matters most", image: "/lp/ingredient-acacetin.jpg" },
      { name: "Saw Palmetto", benefit: "Supports healthy testosterone production pathways", image: "/lp/ingredient-tongkat.jpg" },
      { name: "Hawthorn Berry", benefit: "Promotes circulation and cardiovascular support", image: "/lp/ingredient-dim.jpg" },
      { name: "Tribulus", benefit: "Maintains a healthy libido baseline", image: "/lp/ingredient-acacetin.jpg" },
      { name: "Magnesium", benefit: "Supports testosterone levels and recovery", image: "/lp/ingredient-dim.jpg" },
    ],
    storySection: {
      title: "The Daily Edge",
      introParagraphs: [
        "Most men over 40 feel the same slow leak — less morning drive, longer recovery after workouts, and confidence that used to come naturally.",
        "EndoPeak is built as one daily capsule after breakfast: eight botanicals working on circulation, libido, stress resilience, and testosterone pathway support together.",
      ],
      blocks: [
        {
          imagePosition: "right",
          image: "/lp/couple-happy.jpg",
          imageAlt: "Happy couple enjoying renewed energy and connection",
          paragraphs: [
            "When circulation and stamina improve, the benefits show up at home — not just in the gym. Partners notice before you finish explaining the formula.",
            "EndoPeak is framed as consistent daily support, not a stimulant spike. That is the edge most men are actually shopping for.",
          ],
        },
        {
          imagePosition: "left",
          image: "/lp/gym-lifting.jpg",
          imageAlt: "Man training with strength and focus at the gym",
          paragraphs: [
            "Better blood flow and recovery often translate into stronger sessions and less afternoon crash — the combination that keeps men consistent on a 90-day trial.",
            "Bulk pricing drops to about $49 per bottle on the 6-bottle tier with free US shipping — the math smart buyers use after week two feels different.",
          ],
        },
      ],
      footerParagraph:
        "Official EndoPeak pricing: intro 2-bottle, 90-day (3 bottles), and 180-day (6 bottles) tiers. This page routes you to the same checkout with your discount intact.",
    },
    productMeta: {
      heroSocialProof: "Join thousands of men already using EndoPeak",
      heroBottleCount: 1,
      galleryTitle: "The Daily Edge",
    },
    productBadgeLine: "8 Botanicals · 60 caps",
    benefitsTitle: "What Men Report After Staying Consistent",
    benefits: [
      "More usable energy from morning through evening — not a jittery 2-hour spike",
      "Stronger gym sessions with faster bounce-back between workouts",
      "Renewed confidence in intimate situations — for you and your partner",
      "Calmer stress response thanks to adaptogenic botanical support",
      "A simple once-daily ritual — no shots, no prescriptions, no clinic waiting rooms",
    ],
    testimonials: [
      {
        name: "Thomas J.",
        location: "Arizona, USA",
        quote:
          "I work a demanding job in finance — it used to take me forever to unwind. With EndoPeak, that time dropped to basically zero. I can keep up with my wife again and both of us noticed.",
        packageLabel: "180-day supply",
      },
      {
        name: "Chad B.",
        location: "Texas, USA",
        quote:
          "I was always self-conscious about performance. EndoPeak changed everything — stamina, reliable energy, confidence. This is the real deal.",
        packageLabel: "90-day supply",
      },
      {
        name: "Jason S.",
        location: "North Carolina, USA",
        quote:
          "After two weeks I felt like I was in my 20s again. Workouts stronger, energy through the roof. My wife definitely noticed the difference.",
        packageLabel: "6-bottle package",
      },
    ],
    guaranteeTitle: "60-Day \"Empty Bottle\" Money-Back Guarantee",
    guaranteeParagraphs: [
      "Try EndoPeak for 60 days. Not satisfied? Request a refund per official terms — vendor copy states you can return even empty bottles within the guarantee window.",
      "You risk nothing by starting with the package that fits your budget today and upgrading once you feel the difference.",
    ],
    packages: [
      {
        id: "intro",
        title: "Try Two",
        subtitle: "60-day supply · 2 bottles",
        pricePerBottle: "$69",
        total: "$138",
        shipping: "+ shipping",
        ctaLabel: "Add 2-Bottle Intro",
      },
      {
        id: "popular",
        title: "Most Popular",
        subtitle: "90-day supply · 3 bottles",
        pricePerBottle: "$59",
        total: "$177",
        regularTotal: "$537",
        savings: "Save $360",
        badge: "FREE US SHIPPING",
        shipping: "Free US shipping",
        highlight: true,
        ctaLabel: "Claim 3-Bottle Package",
      },
      {
        id: "best",
        title: "Best Value",
        subtitle: "180-day supply · 6 bottles",
        pricePerBottle: "$49",
        total: "$294",
        regularTotal: "$1,074",
        savings: "Save $780",
        badge: "BIGGEST DISCOUNT",
        shipping: "Free US shipping",
        ctaLabel: "Claim 6-Bottle Bundle",
      },
    ],
    faq: [
      {
        q: "How do I take EndoPeak?",
        a: "Take one capsule daily with a glass of water after your first meal — as directed on the official label.",
      },
      {
        q: "When will I see results?",
        a: "Many users report feeling initial shifts within the first week. EndoPeak recommends at least 3 months of consistent use for the best experience.",
      },
      {
        q: "Is EndoPeak safe?",
        a: "EndoPeak is manufactured in an FDA-registered, GMP-certified US facility using plant ingredients and natural minerals. Consult your doctor if you take medications or have health conditions.",
      },
      {
        q: "Which package should I choose?",
        a: "If you're testing for the first time, the 3-bottle tier balances savings and commitment. Serious buyers targeting lowest per-bottle cost choose the 6-bottle bundle with free shipping.",
      },
    ],
    finalCtaHeadline: "Stock Up on EndoPeak While Bulk Pricing Lasts",
  },
  {
    slug: "erecprime24-lp1",
    brandName: "ErecPrime",
    productName: "ErecPrime",
    ctaUrl:
      "https://erecprime24.com/c/order-now.php?hop=sorela1&hopId=976f8585-4681-4e04-8126-a9a68e7c372b&&traffic_source=blog&traffic_type=paid&campaign=t-compare",
    seoTitle: "ErecPrime — Men's Performance Formula From $49/Bottle",
    seoDescription:
      "ErecPrime: 8-ingredient capsule for stamina, blood flow & drive. Single bottle $69 or bulk from $49/bottle. 60-day guarantee on this page.",
    theme: {
      primary: "#4a1528",
      primaryDark: "#2f0c19",
      accent: "#e8b923",
      accentHover: "#cfa018",
      accentText: "#2f0c19",
      heroBg: "linear-gradient(165deg, #4a1528 0%, #6b2040 50%, #4a1528 100%)",
      sectionBg: "#faf6f7",
      cardBg: "#ffffff",
      border: "#e8d4dc",
      text: "#1a1a1a",
      muted: "#6b5a62",
    },
    urgencyHeadline: "WAIT — Your ErecPrime introductory pricing is reserved",
    heroHeadline: "Feel Great. Perform Better. One Capsule Every Morning.",
    heroSubheadline:
      "ErecPrime combines 8 premium botanicals — Tongkat Ali, Epimedium, Saw Palmetto & more — in a daily men's formula for stamina, circulation, and vitality.",
    heroBullets: [
      "Single-bottle trial from $69 — or drop to ~$49/bottle on 6-bottle bulk",
      "Free US shipping on 3- and 6-bottle packages",
      "60-day money-back guarantee (per official checkout terms)",
      "Natural formula · plant ingredients · easy-to-swallow capsules",
    ],
    hookParagraphs: [
      "Performance anxiety isn't just \"in your head.\" Blood flow, stamina, stress, and hormone balance all play a role — and ignoring them doesn't make them go away.",
      "ErecPrime was built for men who want a direct, daily ritual: one capsule after breakfast, eight synergistic ingredients working on circulation, libido, oxidative stress, and testosterone pathway support.",
      "This private offer page mirrors the official bundle structure — so you can grab intro pricing or maximize bulk savings before inventory refreshes.",
    ],
    problemTitle: "Why Generic \"Men's Formulas\" Fail",
    problemBullets: [
      "Proprietary blends hide doses — you never know if you're getting enough of anything",
      "Stimulant-heavy pills give a crash, not sustained stamina",
      "Ignoring circulation means ignoring half the performance equation",
      "Waiting until \"someday\" costs you months of confidence you won't get back",
    ],
    solutionTitle: "ErecPrime Targets the Full Performance Stack",
    solutionParagraphs: [
      "Hawthorn Berry and Epimedium support blood flow. Tribulus and Tongkat Ali frame libido and sexual performance. Saw Palmetto and Magnesium support testosterone pathways. Chrysin and Winged Treebine round out oxidative stress and stamina support.",
      "Unlike gimmicky gummies or under-dosed singles, ErecPrime is positioned as a serious daily capsule — the same format used in the official funnel with verified purchaser testimonials and tiered bundle pricing.",
      "Choose the 1-bottle intro if you're skeptical. Choose 3- or 6-bottle packages when you're ready to commit to the 90-day runway most men need for a fair test.",
    ],
    ingredientsTitle: "8 Ingredients. One Daily Ritual.",
    ingredients: [
      { name: "Tongkat Ali", benefit: "Improves sexual performance & male vitality", image: "/lp/ingredient-tongkat.jpg" },
      { name: "Epimedium", benefit: "Facilitates blood flow for stronger arousal response", image: "/lp/ingredient-acacetin.jpg" },
      { name: "Saw Palmetto", benefit: "Testosterone production aid & prostate support framing", image: "/lp/ingredient-tongkat.jpg" },
      { name: "Hawthorn Berry", benefit: "Promotes healthy circulation", image: "/lp/ingredient-dim.jpg" },
      { name: "Tribulus", benefit: "Heightens libido baseline", image: "/lp/ingredient-acacetin.jpg" },
      { name: "Magnesium", benefit: "Supports testosterone levels and muscle function", image: "/lp/ingredient-dim.jpg" },
    ],
    storySection: {
      title: "Perform With Confidence",
      introParagraphs: [
        "Performance is not one problem — it is blood flow, stamina, stress, and hormone balance intersecting every day.",
        "ErecPrime targets all four legs with eight named botanicals in one capsule after your first meal.",
      ],
      blocks: [
        {
          imagePosition: "right",
          image: "/lp/couple-active.jpg",
          imageAlt: "Active couple with energy and connection",
          paragraphs: [
            "Men who stay on ErecPrime for 90 days often describe renewed appetite for intimacy — not a jittery hour, but sustained confidence.",
            "Your partner notices the difference when stamina and mood improve together. That is the outcome this stack is marketed for.",
          ],
        },
        {
          imagePosition: "left",
          image: "/lp/workout-session.jpg",
          imageAlt: "Man pushing through an intense gym workout",
          paragraphs: [
            "Circulation and testosterone pathway support also show up in training — better sessions, faster recovery, less couch time after work.",
            "From $69 for a single bottle to about $49 per bottle on the 6-bottle bundle with free shipping — pick the tier that matches your trial runway.",
          ],
        },
      ],
      footerParagraph:
        "ErecPrime retails higher on single bottles; bulk tiers unlock the lowest per-capsule cost. This page mirrors official bundle structure.",
    },
    productMeta: {
      heroSocialProof: "Join thousands of men already on ErecPrime",
      heroBottleCount: 1,
      galleryTitle: "Perform With Confidence",
    },
    productBadgeLine: "8 Botanicals · 60 caps",
    benefitsTitle: "The Benefits Men Buy ErecPrime For",
    benefits: [
      "Reliable stamina for longer-lasting intimate encounters",
      "Faster, more intense arousal with renewed appetite for intimacy",
      "Cleaner daily energy without stimulant jitters or afternoon crash",
      "Gym performance that matches how you want to feel outside the bedroom",
      "Confidence that compounds — because you're finally doing something consistent",
    ],
    testimonials: [
      {
        name: "Mark B.",
        location: "New York, USA",
        quote:
          "Before ErecPrime I thought my best days were gone. Now I feel like I'm back in my prime — my partner and I enjoy a satisfying love life again.",
        packageLabel: "90-day supply",
      },
      {
        name: "Thomas J.",
        location: "Arizona, USA",
        quote:
          "Since I started one capsule every morning with coffee, I've never had a problem with energy in the bedroom. My young wife and I are both VERY happy.",
        packageLabel: "180-day supply",
      },
      {
        name: "Chad B.",
        location: "Texas, USA",
        quote:
          "Improved stamina, reliable performance, otherworldly confidence. ErecPrime changed my love life forever — no jitters, just results.",
        packageLabel: "6-bottle package",
      },
    ],
    guaranteeTitle: "60-Day 100% Money-Back Guarantee",
    guaranteeParagraphs: [
      "Use ErecPrime for up to 60 days. If you're not enthusiastic about your results, request a refund per vendor terms — official copy allows returns even if you've used every capsule.",
      "The only way to know if ErecPrime works for your body is to test it. The guarantee removes the financial downside.",
    ],
    packages: [
      {
        id: "intro",
        title: "Try One",
        subtitle: "30-day supply · 1 bottle",
        pricePerBottle: "$69",
        total: "$69",
        regularTotal: "$179",
        savings: "Save $110",
        shipping: "+ shipping",
        ctaLabel: "Try 1 Bottle",
      },
      {
        id: "popular",
        title: "Most Popular",
        subtitle: "90-day supply · 3 bottles",
        pricePerBottle: "$59",
        total: "$177",
        regularTotal: "$537",
        savings: "Save $360",
        badge: "FREE US SHIPPING",
        shipping: "Free US shipping",
        highlight: true,
        ctaLabel: "Claim 3-Bottle Package",
      },
      {
        id: "best",
        title: "Best Value",
        subtitle: "180-day supply · 6 bottles",
        pricePerBottle: "$49",
        total: "$294",
        regularTotal: "$1,074",
        savings: "Save $780",
        badge: "BIGGEST DISCOUNT",
        shipping: "Free US shipping",
        ctaLabel: "Claim 6-Bottle Bundle",
      },
    ],
    faq: [
      {
        q: "How should I take ErecPrime?",
        a: "Take one capsule daily with water after your first meal, or as directed on the official supplement label.",
      },
      {
        q: "Is ErecPrime natural?",
        a: "Yes — ErecPrime uses plant ingredients and natural minerals in a non-GMO capsule. No artificial hormones or synthetic testosterone.",
      },
      {
        q: "How long should I try it?",
        a: "Official guidance recommends at least 3 months of daily use. Stage 1 is energy and sleep; stage 2 adds stamina and firmness; stage 3 solidifies results.",
      },
      {
        q: "What's the best package?",
        a: "First-time buyers often start with one bottle. Once you feel early shifts, the 6-bottle tier delivers the lowest per-bottle cost with free shipping.",
      },
    ],
    finalCtaHeadline: "Claim Your ErecPrime Package Before Pricing Resets",
  },
];

export const LANDING_PAGES: LandingPageConfig[] = [
  ...LANDING_PAGES_LP1,
  ...LANDING_PAGES_LP2,
  ...LANDING_PAGES_NITRIC_BOOST,
  ...LANDING_PAGES_TEDPLANS,
];

export function getLandingPageBySlug(slug: string): LandingPageConfig | undefined {
  return LANDING_PAGES.find((p) => p.slug === slug);
}

export function getAllLandingPageSlugs(): string[] {
  return LANDING_PAGES.map((p) => p.slug);
}

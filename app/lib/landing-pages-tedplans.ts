import type { LandingPageConfig, LpOfferStack } from "./landing-pages";

const TEDPLANS_CTA =
  "https://8a4d3jpqq6py4refm24ow8ul9y.hop.clickbank.net/?&traffic_source=blog&traffic_type=paid&campaign=t-compare";

export const TEDPLANS_OFFER_STACK: LpOfferStack = {
  preHeadline: "Hit the **ADD TO CART** button below and I'll see you on the inside...",
  bundleImage: "/lp/ted-offer-bundle.png",
  bundleImageAlt: "TedsWoodworking — 16,000+ plans on laptop, tablet, and phone with lifetime $67 offer",
  items: [
    {
      text: "**Instant Access To All 16,000 Projects** with step-by-step details, drawings, plans, cutting & materials list and more...",
      value: "($297 Value)",
    },
    {
      text: "**Lifetime Membership Access** — Easy-to-use and fully searchable members area with organized categories, difficulty levels, and keyword search.",
    },
    {
      text: "**Lifetime FREE Monthly Plans** — with varied and unique plans added every month with no recurring fees or charges.",
      value: "($39 Per Month Value)",
    },
    {
      text: "**Free Custom Plan Request** — Get a custom plan drafted for your specific project by our craftsman team.",
      value: "($250 Value)",
    },
    {
      text: "**Woodworking Guides & Videos** — archive of detailed guides and video tutorials from master woodworkers.",
    },
    {
      text: "**Option to have everything on physical copies** shipped to you available at checkout (optional add-on).",
    },
  ],
  extras: [{ text: "**100% Risk-Free Money Back Guarantee**" }],
  bonusTitle: "Plus These Amazing Bonuses:",
  bonuses: [
    { text: "DWG & CAD Plan Viewer", value: "($47 Value)" },
    { text: "150 Premium Woodworking Videos", value: "($77 Value)" },
    { text: "How To Start A Woodworking Business", value: "($27 Value)" },
    { text: "Complete Woodworking Guides", value: "($39 Value)" },
  ],
  totalValue: "$749 + $39/m",
  priceLabel: "Get Started For A One Time Fee Of:",
  offerPrice: "$67.00",
  ctaLabel: "Add To Cart",
  secondaryLinkLabel: "Get Instant Access to 16,000 Projects Now",
};

const TEDPLANS_PRODUCT_META = {
  isDigitalProduct: true,
  trustItems: ["60-Day Guarantee", "Instant Digital Access", "Secure ClickBank Checkout", "4.9★ Member Reviews"],
  galleryTitle: "Real Builds From the Library",
  heroTagline: "16,000 Shop-Tested Plans · Lifetime Access",
  heroSocialProof: "Join 54,000+ woodworkers already building from Ted's library",
  stickyCtaLabel: "Add To Cart — $67 Lifetime",
  advertorialMasthead: {
    category: "Woodworking · Special Report",
    publication: "Workshop Insider",
    author: "By James Hartley, DIY Editor",
  },
  pricingHeadline: "Everything Included — One-Time $67",
} as const;

const LIFETIME_PACKAGE = {
  id: "lifetime",
  title: "Lifetime Access",
  subtitle: "16,000 plans + 4 bonuses + monthly updates",
  pricePerBottle: "$67",
  total: "$67 one-time",
  regularTotal: "$749 + $39/mo",
  savings: "Save $682+ vs total package value",
  badge: "LIMITED LIFETIME DEAL",
  shipping: "Instant digital download",
  highlight: true,
  ctaLabel: "Add To Cart",
} as const;

const BONUSES = [
  { name: "DWG/CAD Plan Viewer", benefit: "Edit and resize plans to fit your space ($47 value)" },
  { name: "150 Premium Videos", benefit: "Step-by-step video library from veteran woodworkers ($77 value)" },
  { name: "Woodworking Business Guide", benefit: "Turn shop time into side income ($27 value)" },
  { name: "Complete Woodworking Guides", benefit: "200+ pages of joinery and tool fundamentals ($39 value)" },
];

const TESTIMONIALS = [
  {
    name: "Carol B.",
    location: "Charlotte, NC",
    quote:
      "Built two Adirondack chairs from the plans and sold them at a craft fair for $175 each. The whole package cost me $67. Do the math.",
    packageLabel: "Lifetime member",
  },
  {
    name: "Tony R.",
    location: "Phoenix, AZ",
    quote:
      "Brand new to woodworking — bought my first table saw in January. Built a bookshelf from a beginner plan. It's standing and my wife loves it.",
    packageLabel: "Lifetime member",
  },
  {
    name: "Jessica T.",
    location: "Houston, TX",
    quote:
      "Typed 'small chicken coop' in the search bar, picked a plan, had it done by Sunday. My neighbor asked me to build him one too. Charged $400.",
    packageLabel: "Lifetime member",
  },
];

const FAQ = [
  {
    q: "How do I get access after I order?",
    a: "You'll get instant access to the searchable members area with all 16,000 plans. Pay once — no monthly fee with this lifetime offer.",
  },
  {
    q: "Is there a monthly fee?",
    a: "Not with this page. Standard TedsWoodworking is moving to $39/month, but this offer locks in lifetime access for a one-time $67 payment.",
  },
  {
    q: "Do I need a big workshop?",
    a: "No. Ted started in a 7×8 shop. Most plans need a table saw, drill, clamps, and sander — many work in a garage corner.",
  },
  {
    q: "What's the guarantee?",
    a: "60-day money-back guarantee. If it's not the most complete woodworking resource you've owned, email for a full refund — no questions asked.",
  },
];

export const LANDING_PAGES_TEDPLANS: LandingPageConfig[] = [
  {
    slug: "tedplansdiy-lp1",
    brandName: "TedsWoodworking",
    productName: "TedsWoodworking",
    ctaUrl: TEDPLANS_CTA,
    productBadgeLine: "16,000 Plans · Lifetime Access",
    packagePriceLabel: "one-time",
    seoTitle: "TedsWoodworking — 16,000 Shop-Tested Plans for $67 Lifetime",
    seoDescription:
      "Stop wasting weekends on broken plans. Get 16,000 woodworking projects with exact cut lists, materials lists, and step-by-step instructions — lifetime access for $67.",
    theme: {
      primary: "#4a3728",
      primaryDark: "#2d2118",
      accent: "#c17817",
      accentHover: "#a86510",
      accentText: "#2d2118",
      heroBg: "linear-gradient(165deg, #3d2914 0%, #5c4033 50%, #3d2914 100%)",
      sectionBg: "#f5f0eb",
      cardBg: "#ffffff",
      border: "#d4c4b0",
      text: "#1a1a1a",
      muted: "#6b5d52",
    },
    urgencyHeadline: "WAIT — Lifetime $67 access is still open (moving to $39/month)",
    heroHeadline: "Finally Build the Project You've Been Planning In Your Head",
    heroSubheadline:
      "16,000+ woodworking plans — each one built and tested in Ted McGrath's workshop before you download it. Exact cut lists. Zero guesswork. One-time $67.",
    heroBullets: [
      "**Instant access** to all 16,000 shop-tested projects ($297 value)",
      "**Lifetime membership** — searchable library, not a zip file dump",
      "**Free monthly plans** for life — normally $39/month ($468/year saved)",
      "**Free custom plan request** — team drafts your specific build ($250 value)",
      "**4 bonuses included:** CAD viewer, 150 videos, business guide, 200-page manual ($190 value)",
      "**60-day guarantee** · Secure ClickBank checkout · Optional physical copies",
    ],
    hookParagraphs: [
      "You already know what you want to build — the deck, the dining table, the workbench. The problem isn't vision. It's plans that look complete but fall apart at step five.",
      "Ted McGrath spent 25 years fixing that: build first, then write the instructions. Today that's 16,000 plans from a 12-person team that drafts, builds, and verifies every project before it ships.",
      "This page unlocks the original lifetime deal — $67 once, everything included — before the transition to $39/month closes the one-time option for good.",
    ],
    problemTitle: "The Real Problem Nobody Talks About",
    problemBullets: [
      "Steps that skip the hard part — no assembly order, no hardware specs",
      "Measurements close but not close enough — 1/16\" on paper ruins a joint in your shop",
      "Diagrams show the finished piece, not how to get there",
      "You blame yourself when the plan was never finished in the first place",
    ],
    solutionTitle: "16,000 Plans Built In Our Shop — Not In Yours",
    solutionParagraphs: [
      "Draft it. Build it. Test every joint. Verify every measurement. If a weekend hobbyist with a basic table saw can't follow it, the plan isn't done.",
      "You get step-by-step instructions, exact cut lists, complete materials lists, and multi-angle schematics — plus a searchable library that finds 'garden bench' in seconds, not hours.",
      "Lock in lifetime access for $67 before this page switches to monthly-only pricing.",
    ],
    ingredientsTitle: "What Makes These Plans Different",
    ingredients: [
      { name: "Shop-Tested Blueprints", benefit: "Every plan physically built before publication" },
      { name: "Exact Cut & Materials Lists", benefit: "Buy exactly what you need — down to the last screw" },
      { name: "Searchable Library", benefit: "Filter by category, keyword, or difficulty in minutes" },
      { name: "Small-Shop Friendly", benefit: "Most projects need table saw, drill, clamps, sander" },
      { name: "Monthly Plan Drops", benefit: "5+ new tested plans added free every month for life" },
      { name: "Custom Plan Requests", benefit: "Can't find it? Ted's team drafts, builds, and delivers it" },
    ],
    benefitsTitle: "Stop Searching. Start Building.",
    benefits: [
      "Finish projects instead of abandoning half-built lumber in the garage",
      "No more three trips to the hardware store for wrong materials",
      "Build furniture for a fraction of retail — or sell pieces for profit",
      "Beginner to advanced — plans written to follow, not interpret",
      "Instant access: pick a plan, print it, start cutting this weekend",
    ],
    testimonials: TESTIMONIALS,
    guaranteeTitle: "60-Day \"Love It or Shove It\" Guarantee",
    guaranteeParagraphs: [
      "Use TedsWoodworking for 60 full days. If it's not the most complete woodworking resource you've ever owned, email for a full refund. No questions. No fine print.",
      "Ted's been in this industry 25 years — this guarantee is the whole bet on one thing: these plans work.",
    ],
    packages: [{ ...LIFETIME_PACKAGE }],
    faq: FAQ,
    finalCtaHeadline: "Lock In Lifetime Access for $67 Before It's Gone",
    offerStack: TEDPLANS_OFFER_STACK,
    productMeta: TEDPLANS_PRODUCT_META,
  },
  {
    slug: "tedplansdiy-lp2",
    variant: "lp2",
    lp2Style: "advertorial",
    brandName: "TedsWoodworking",
    productName: "TedsWoodworking",
    ctaUrl: TEDPLANS_CTA,
    productBadgeLine: "16,000 Plans · Lifetime",
    packagePriceLabel: "one-time",
    seoTitle: "The Plans Were Broken. Not You. | TedsWoodworking Review",
    seoDescription:
      "Why most woodworking plans fail at step five — and how Ted McGrath's 16,000 shop-tested plans fix the measurement gaps, missing steps, and wasted lumber.",
    theme: {
      primary: "#3d2914",
      primaryDark: "#2a1c0e",
      accent: "#92400e",
      accentHover: "#78350f",
      accentText: "#ffffff",
      heroBg: "#faf7f2",
      sectionBg: "#f5efe6",
      cardBg: "#ffffff",
      border: "#e7dcc8",
      text: "#292524",
      muted: "#78716c",
    },
    urgencyHeadline: "Reader offer: lifetime $67 access before $39/month transition",
    heroHeadline: "The Plans Were Broken. Not You.",
    heroSubheadline:
      "From the desk of Ted McGrath — why your half-finished garage projects aren't your fault, and what 25 years of workshop teaching changed about how plans should work.",
    heroBullets: [
      "16,000 plans — each built in-shop before you download ($297 value)",
      "Lifetime access + free monthly plan drops ($39/mo value — included free)",
      "Free custom plan request when you can't find your exact project ($250 value)",
      "4 bonuses: CAD viewer ($47), 150 videos ($77), business guide ($27), manuals ($39)",
      "Total package value $749+ — **yours for $67 one-time** while this page is live",
    ],
    hookParagraphs: [
      "Dear fellow woodworker — you already know what you want to build. You can picture the deck, the table, the bench. But every time you sit down to really start, something gets in the way.",
      "You find a plan that looks great. You buy lumber, clear your Saturday, and by step four or five things go sideways. A measurement that doesn't match. A step that jumps from 'cut side panels' to 'attach face frame' with nothing in between.",
      "You're not doing something wrong. The plan just isn't finished. It looks complete — but it isn't. That's what I spent 25 years fixing, starting with a white oak cabinet class in 1989 where the magazine plan had dado measurements wrong.",
      "That night I rebuilt the plan from scratch, measured every joint, and handed it out next class. Nobody got stuck. One plan became ten, ten became fifty — today it's 16,000, each one built and tested before it reaches you.",
    ],
    problemTitle: "Why Pinterest Plans Cost You $60 in Lumber",
    problemBullets: [
      "Professional layout hiding incomplete assembly instructions",
      "Materials lists off by just enough to send you back to the yard",
      "Tool lists assuming $5,000 in equipment you don't own",
      "Finished-photo diagrams with no path from first cut to last screw",
    ],
    solutionTitle: "Build First. Write Second. Ship Only When It Works.",
    solutionParagraphs: [
      "My team of twelve drafts, builds, and tests five new plans every week. If a weekend hobbyist with a basic table saw can't follow it, the plan isn't done.",
      "The members area is searchable by keyword, category, and difficulty — find 'chicken coop' or 'corner desk' in minutes. Can't find your exact spec? Submit a custom request and we'll draft, build, test, and deliver it.",
    ],
    ingredientsTitle: "Five Things Serious Plan Libraries Must Include",
    ingredients: BONUSES.slice(0, 5).map((b, i) => ({
      name: ["Finished Plans", "Exact Lists", "Smart Search", "Small-Shop Builds", "Monthly Updates"][i]!,
      benefit: [
        "Multi-angle schematics with exploded joint views",
        "Cut and materials lists verified to 1/16″",
        "100+ categories, keyword search, difficulty filters",
        "Table saw + drill + clamps — no mega tool list",
        "New plans every month, free for life",
      ][i]!,
    })),
    benefitsTitle: "What 54,000+ Members Report",
    benefits: [
      "Projects finished on the first try — not abandoned halfway",
      "Cut lists dead-on — every piece fit, no extra store runs",
      "Side income from selling chairs, coops, and custom pieces",
      "Small garages and basic tools — plenty of plans fit",
      "Four projects in three months vs zero in five years before",
    ],
    timeline: [
      {
        milestone: "Day 1",
        title: "Instant access",
        body: "Search the library, pick a project, print the materials list, hit the lumber yard.",
      },
      {
        milestone: "Weekend 1",
        title: "First cuts",
        body: "Follow step one → step two → step three. No guessing what happens next.",
      },
      {
        milestone: "Month 1+",
        title: "New plans arrive",
        body: "Monthly drops appear in your library automatically — no extra charge, ever.",
      },
    ],
    testimonials: [
      {
        name: "David T.",
        location: "Atlanta, GA",
        quote:
          "I've bought two other plan bundles before. Never built a thing. Found a storage bench in Ted's library, finished it in three weekends. It's on my front porch right now.",
        packageLabel: "Lifetime member",
      },
      {
        name: "Ray A.",
        location: "Sacramento, CA",
        quote:
          "Submitted a custom request for a 34-inch corner cabinet. Team had a plan in two weeks. Fit perfectly.",
        packageLabel: "Lifetime member",
      },
      ...TESTIMONIALS.slice(0, 1),
    ],
    guaranteeTitle: "60-Day Iron-Clad Money-Back Guarantee",
    guaranteeParagraphs: [
      "Try the full library for 60 days. Not the most useful woodworking resource you've owned? Full refund. No questions.",
      "Standard pricing is moving to $39/month — this page still offers lifetime access for a one-time $67 while capacity lasts.",
    ],
    packages: [{ ...LIFETIME_PACKAGE }],
    faq: FAQ,
    finalCtaHeadline: "See If the $67 Lifetime Offer Is Still Available",
    offerStack: TEDPLANS_OFFER_STACK,
    productMeta: TEDPLANS_PRODUCT_META,
  },
  {
    slug: "tedplansdiy-lp3",
    variant: "lp2",
    lp2Style: "dtc",
    brandName: "TedsWoodworking",
    productName: "TedsWoodworking",
    ctaUrl: TEDPLANS_CTA,
    productBadgeLine: "16,000 Plans · 4 Bonuses",
    packagePriceLabel: "one-time",
    seoTitle: "TedsWoodworking — Shop-Tested Plan Library | $67 Lifetime",
    seoDescription:
      "Browse 16,000 woodworking plans with exact cut lists, CAD viewer, 150 videos, and lifetime monthly updates. One-time $67 — instant digital access.",
    theme: {
      primary: "#1c1917",
      primaryDark: "#0c0a09",
      accent: "#ea580c",
      accentHover: "#c2410c",
      accentText: "#ffffff",
      heroBg: "#ffffff",
      sectionBg: "#fafaf9",
      cardBg: "#ffffff",
      border: "#e7e5e4",
      text: "#1c1917",
      muted: "#78716c",
    },
    urgencyHeadline: "Lifetime deal: $67 one-time (standard rate moving to $39/mo)",
    heroHeadline: "16,000 Woodworking Plans. Built, Tested, Ready to Download.",
    heroSubheadline:
      "The organized plan library for makers who'd rather build on Saturday than debug bad measurements. Searchable. Shop-verified. Lifetime access.",
    heroBullets: [
      "Instant access — searchable members area with 16,000 projects ($297 value)",
      "Every plan includes cut list, materials list, and step-by-step drawings",
      "Lifetime FREE monthly plans ($39/mo value) · Custom plan request ($250 value)",
      "4 bonuses: CAD viewer ($47), 150 videos ($77), business guide ($27), guides ($39)",
      "Total value $749+ · **$67 one-time** · 60-day guarantee · ClickBank secure checkout",
    ],
    hookParagraphs: [
      "Magazines sell single plans for $10–20. At that rate, 16,000 plans would cost over $160,000. TedsWoodworking bundles the full shop-tested library for a one-time $67 while lifetime pricing is still available.",
      "Pick furniture, outdoor, sheds, kids' projects, or workshop jigs — filter by skill level and start building the same weekend.",
    ],
    problemTitle: "Why Most Plan Bundles Collect Dust",
    problemBullets: [
      "Chaotic zip files with no search or organization",
      "Untested diagrams that break mid-build",
      "No materials list — guess-and-check at the store",
      "Monthly fees that add up to hundreds per year",
    ],
    solutionTitle: "One Library. Every Project. Zero Recurring Fees.",
    solutionParagraphs: [
      "16,000+ original plans from Ted McGrath's workshop team. Draft → build → verify → publish. Custom requests included. Monthly drops included. Bonuses included.",
      "Pay once. Build forever. Or wait until the $67 lifetime window closes and pay $39 every month.",
    ],
    ingredientsTitle: "Included With Lifetime Access",
    ingredients: [
      { name: "16,000 Project Plans", benefit: "Furniture, outdoor, sheds, decor, kids, workshop — all categories" },
      { name: "DWG/CAD Viewer", benefit: "Resize plans to fit your exact space" },
      { name: "150 Video Tutorials", benefit: "Joinery basics through advanced techniques" },
      { name: "Business Starter Guide", benefit: "Sell what you build for side income" },
      { name: "200-Page Woodworking Manual", benefit: "Tools, joints, and fundamentals" },
      { name: "Custom Plan Requests", benefit: "Team drafts your specific project ($250 value)" },
    ],
    benefitsTitle: "Built for Real Shops",
    benefits: [
      "Find any plan in minutes with keyword + category search",
      "Beginner-friendly — most members start with simple projects",
      "Sell finished pieces legally — many members do craft fairs",
      "Works in a garage corner with basic tools",
      "New content every month at no extra cost",
    ],
    timeline: [
      {
        milestone: "Instant",
        title: "Download access",
        body: "Full library + bonuses available seconds after checkout.",
      },
      {
        milestone: "This weekend",
        title: "Start building",
        body: "Print materials list, buy lumber, follow steps 1–2–3.",
      },
      {
        milestone: "Forever",
        title: "Library grows",
        body: "New shop-tested plans added monthly — lifetime, no fees.",
      },
    ],
    testimonials: TESTIMONIALS,
    guaranteeTitle: "60-Day 100% Money-Back Guarantee",
    guaranteeParagraphs: [
      "ClickBank secure checkout. 60 days to explore the full library. Not satisfied? Full refund, no questions.",
      "Lifetime $67 vs $39/month — this pricing has a natural capacity limit.",
    ],
    packages: [
      { ...LIFETIME_PACKAGE },
      {
        id: "compare-monthly",
        title: "Standard Rate",
        subtitle: "What new members pay soon",
        pricePerBottle: "$39",
        total: "$39/mo",
        regularTotal: "$468/yr",
        shipping: "Recurring billing",
        ctaLabel: "Add To Cart — Get Lifetime",
      },
      {
        id: "compare-value",
        title: "Total Package Value",
        subtitle: "Plans + bonuses + updates",
        pricePerBottle: "$749+",
        total: "Yours for $67",
        savings: "Save $682+ today",
        badge: "BEST DEAL",
        shipping: "One-time payment",
        highlight: false,
        ctaLabel: "Add To Cart",
      },
    ],
    faq: FAQ,
    finalCtaHeadline: "Add TedsWoodworking to Cart — $67 Lifetime",
    offerStack: TEDPLANS_OFFER_STACK,
    productMeta: TEDPLANS_PRODUCT_META,
  },
];

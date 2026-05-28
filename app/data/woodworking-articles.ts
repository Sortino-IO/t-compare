import type { WoodworkingArticle } from "../lib/woodworking";

const IMG = {
  workshop: "/lp/wood-workshop-1.jpg",
  craft: "/lp/wood-craft-2.jpg",
  interior: "/lp/wood-interior-3.jpg",
  furniture: "/lp/wood-furniture-4.jpg",
  project: "/lp/wood-project-5.jpg",
  home: "/lp/wood-home-6.jpg",
};

function cta(title?: string, body?: string) {
  return { type: "woodworkingCta" as const, title, body };
}

export const WOODWORKING_ARTICLES: WoodworkingArticle[] = [
  {
    slug: "how-to-start-woodworking",
    title: "How to Start Woodworking: A Complete Beginner's Guide",
    excerpt:
      "New to the shop? Here is a realistic path from zero to your first finished project — tools, space, safety, and how to avoid the plan mistakes that waste lumber.",
    featuredImage: IMG.workshop,
    featuredImageAlt: "Beginner woodworking workshop with tools and lumber",
    publishedAt: "2026-05-20",
    seoTitle: "How to Start Woodworking — Beginner's Guide (2026)",
    seoDescription:
      "Learn how to start woodworking: essential first tools, garage shop setup, safety basics, and picking beginner projects that you will actually finish.",
    targetKeyword: "woodworking for beginners (~5,900/mo)",
    readMinutes: 9,
    category: "getting-started",
    content: [
      {
        type: "paragraph",
        text: "Woodworking for beginners is less about talent and more about sequence: pick one project, gather the right tools, follow a complete plan, and finish before you chase the next idea. That sounds obvious — but most new woodworkers skip straight to inspiration photos and end up with half-built pieces in the garage.",
      },
      {
        type: "heading",
        text: "Step 1: Define Your First Project Before You Buy Tools",
        level: 2,
      },
      {
        type: "paragraph",
        text: "Search volume for woodworking projects is huge because people want something tangible fast — a shelf, a bench, a planter, a small table. Choose one build that needs only a table saw (or circular saw), a drill, clamps, and a sander. Avoid projects that require dovetails, bent lamination, or a full tool collection on day one.",
      },
      {
        type: "bulletList",
        items: [
          "Good first builds: wall shelf, step stool, simple workbench, planter box, small side table",
          "Avoid for now: cabinets with inset doors, chairs with angled joinery, large dining tables",
          "Pick a plan with a full cut list and materials list before you visit the lumber yard",
        ],
      },
      cta(
        "Start with a plan that is already shop-tested",
        "Browse 16,000 beginner-friendly woodworking plans with exact cut lists — so you know what to buy before you cut.",
      ),
      {
        type: "heading",
        text: "Step 2: Set Up a Small Shop (Even Half a Garage Works)",
        level: 2,
      },
      {
        type: "paragraph",
        text: "You do not need a dedicated outbuilding. A folding workbench, good lighting, and clear floor space for 8-foot boards is enough for most starter projects. Ted McGrath famously started in a 7×8 shop — many plans in professional libraries are designed for tight spaces and basic tools.",
      },
      {
        type: "heading",
        text: "Step 3: Learn to Read a Plan, Not Just a Photo",
        level: 2,
      },
      {
        type: "paragraph",
        text: "Pinterest and social feeds show finished pieces, not assembly order. A real plan walks you step one → step two → step three with measurements verified for actual milled lumber sizes. That is the difference between a fun Saturday and a $60 mistake.",
      },
      {
        type: "bulletList",
        items: [
          "Confirm whether dimensions use nominal or actual lumber thickness",
          "Print the cut list and mark pieces as you go",
          "Dry-fit assemblies before glue or final screws",
        ],
      },
      {
        type: "image",
        src: IMG.craft,
        alt: "Woodworker reviewing plans at a workbench",
        caption: "A complete plan saves more time than any new gadget.",
      },
      {
        type: "heading",
        text: "Step 4: Build Once, Then Expand Your Toolkit",
        level: 2,
      },
      {
        type: "paragraph",
        text: "After your first finish, you will know whether you want a miter saw for trim, a router for profiles, or a better table saw fence. Buy tools to solve problems you have actually hit — not problems a forum told you that you might hit someday.",
      },
      cta("Ready for project #1?", "Get instant access to searchable plans filtered by beginner difficulty."),
    ],
  },
  {
    slug: "essential-woodworking-tools-beginners",
    title: "Essential Woodworking Tools for Beginners",
    excerpt:
      "The woodworking tools category gets 22,000+ searches a month for a reason — here is the minimal kit that covers 80% of starter projects without a $5,000 wish list.",
    featuredImage: IMG.craft,
    featuredImageAlt: "Essential woodworking tools laid out on a workbench",
    publishedAt: "2026-05-19",
    seoTitle: "Essential Woodworking Tools for Beginners (2026)",
    seoDescription:
      "Best woodworking tools for beginners: table saw vs circular saw, drill, clamps, measuring tools, and what you can skip until later.",
    targetKeyword: "woodworking tools (~22,200/mo)",
    readMinutes: 8,
    category: "tools",
    content: [
      {
        type: "paragraph",
        text: "Woodworking tools searches spike because beginners want one authoritative list. Here is the honest version: most projects need a way to make straight cuts, a way to join boards, and a way to measure accurately. Everything else is optimization.",
      },
      {
        type: "heading",
        text: "The Core Four (Covers Most Beginner Plans)",
        level: 2,
      },
      {
        type: "bulletList",
        items: [
          "Cutting: portable table saw or quality circular saw with a straightedge guide",
          "Drill/driver: for screws, pocket holes, and hardware",
          "Clamps: at least four — you cannot glue or assemble without them",
          "Sander: random-orbit sander saves hours vs hand sanding",
        ],
      },
      {
        type: "heading",
        text: "Measuring & Marking (Do Not Cheap Out Here)",
        level: 2,
      },
      {
        type: "bulletList",
        items: [
          "12″ combination square — checking 90° and 45° angles",
          "Tape measure with clear hook",
          "Sharp pencil or marking knife for precise lines",
          "Speed square for crosscuts with a circular saw",
        ],
      },
      {
        type: "paragraph",
        text: "A 1/16″ error on paper becomes a gap you can see in a glued joint. Good measuring tools cost less than one botched panel.",
      },
      {
        type: "heading",
        text: "What to Skip at First",
        level: 2,
      },
      {
        type: "bulletList",
        items: [
          "Full-size cabinet saw — overkill until you know your workflow",
          "Every router bit set — buy bits when a plan calls for them",
          "Duplicate sanders, jigs, and specialty gadgets marketed to beginners",
        ],
      },
      cta(
        "Build with the tools you have",
        "Thousands of plans are written for table saw + drill + clamps — not a pro shop.",
      ),
      {
        type: "image",
        src: IMG.workshop,
        alt: "Garage workshop with basic woodworking tools",
      },
    ],
  },
  {
    slug: "best-table-saw-for-beginners",
    title: "Best Table Saw for Beginners: 2026 Buyer's Guide",
    excerpt:
      "The table saw is the most searched single-tool decision in woodworking. Here is how to choose between jobsite, compact, and benchtop models — and what actually matters for accuracy.",
    featuredImage: IMG.workshop,
    featuredImageAlt: "Table saw in a home woodworking shop",
    publishedAt: "2026-05-18",
    seoTitle: "Best Table Saw for Beginners — 2026 Buyer's Guide",
    seoDescription:
      "Compare jobsite vs benchtop table saws for beginners: fence quality, rip capacity, safety features, and which models fit a garage workshop.",
    targetKeyword: "best table saw for beginners / woodworking table saws",
    readMinutes: 10,
    category: "tools",
    content: [
      {
        type: "paragraph",
        text: "If you are serious about woodworking projects beyond simple boards, a table saw is usually the first big purchase. Search interest for woodworking table saws stays high because the wrong saw frustrates you on every rip cut — while the right one makes beginner plans feel easy.",
      },
      {
        type: "heading",
        text: "Jobsite Saws: Best for Most Beginners",
        level: 2,
      },
      {
        type: "paragraph",
        text: "Portable jobsite saws with rack-and-pinion fences (like the DeWalt DWE7491RS class of tools) balance accuracy, power, and storage. You can rip sheet goods, build a folding outfeed table, and store the saw against a wall when you are done.",
      },
      {
        type: "bulletList",
        items: [
          "Look for a stable fence that locks parallel to the blade",
          "15-amp motor handles hardwood rips for hobby use",
          "Riving knife and blade guard — use them every cut",
          "Consider wheeled stands if you move the saw often",
        ],
      },
      {
        type: "heading",
        text: "When a Circular Saw Is Enough",
        level: 2,
      },
      {
        type: "paragraph",
        text: "For your first project or two, a circular saw with a DIY straightedge jig can work. Many easy woodworking projects for beginners use shorter cuts only. Upgrade to a table saw when you are tired of clamping guides and re-measuring every rip.",
      },
      {
        type: "heading",
        text: "Safety Before Brand Loyalty",
        level: 2,
      },
      {
        type: "bulletList",
        items: [
          "Never freehand rips without a fence",
          "Use push sticks for narrow offcuts",
          "Unplug the saw when changing blades",
          "Hearing and eye protection every session",
        ],
      },
      cta(
        "Pick your saw — then pick a plan",
        "Match your first build to the tool you own today, not the shop you wish you had.",
      ),
    ],
  },
  {
    slug: "easy-woodworking-projects-beginners",
    title: "Easy Woodworking Projects for Beginners",
    excerpt:
      "Woodworking projects is one of the highest-volume search topics in the hobby. These 12 builds are beginner-realistic — and what to look for in a plan before you start.",
    featuredImage: IMG.project,
    featuredImageAlt: "Finished easy woodworking project in a home",
    publishedAt: "2026-05-17",
    seoTitle: "Easy Woodworking Projects for Beginners (12 Ideas)",
    seoDescription:
      "Beginner woodworking projects you can finish in a weekend: shelves, benches, planters, and more — plus how to pick plans that match your tools.",
    targetKeyword: "woodworking projects / easy woodworking projects for beginners",
    readMinutes: 8,
    category: "projects",
    content: [
      {
        type: "paragraph",
        text: "DIY woodworking projects for beginners fail when the plan assumes skills or tools you do not have. The projects below are popular because they teach core skills — measuring, square cuts, simple joinery — without advanced techniques.",
      },
      {
        type: "heading",
        text: "12 Beginner-Friendly Builds",
        level: 2,
      },
      {
        type: "bulletList",
        items: [
          "Floating wall shelf (hidden cleat)",
          "Step stool with angled legs",
          "Adirondack chair (great first outdoor build)",
          "Planter box for deck or garden",
          "Garage workbench with shelf storage",
          "Wall-mounted tool cabinet",
          "Simple coffee table with aprons",
          "Birdhouse or bat house",
          "Cutting board (glue-up intro)",
          "Small bookshelf",
          "Garden bench",
          "Chicken coop (popular search — pick a small plan first)",
        ],
      },
      {
        type: "heading",
        text: "How to Pick the Right Plan",
        level: 2,
      },
      {
        type: "bulletList",
        items: [
          "Filter by beginner difficulty if the library supports it",
          "Read the full materials list before buying lumber",
          "Check that the plan matches your saw setup (sheet goods vs dimension lumber)",
          "Prefer exploded diagrams for assembly order",
        ],
      },
      {
        type: "image",
        src: IMG.furniture,
        alt: "Handmade wooden furniture built from plans",
      },
      cta(
        "Search 16,000 projects by keyword",
        "Type \"planter,\" \"bench,\" or \"shelf\" and get shop-tested plans in seconds.",
      ),
    ],
  },
  {
    slug: "woodworking-plans-guide",
    title: "Woodworking Plans: How to Pick Plans That Actually Work",
    excerpt:
      "With 14,800+ monthly searches for woodworking plans, most buyers still get incomplete diagrams. Here is how to spot a real plan vs a pretty picture.",
    featuredImage: IMG.interior,
    featuredImageAlt: "Detailed woodworking plans and cut list on workbench",
    publishedAt: "2026-05-16",
    seoTitle: "Woodworking Plans — How to Choose Plans That Work",
    seoDescription:
      "Avoid bad woodworking plans: cut lists, step order, lumber sizes, and why shop-tested blueprints beat free PDF dumps.",
    targetKeyword: "woodworking plans (~14,800/mo)",
    readMinutes: 9,
    category: "plans",
    content: [
      {
        type: "paragraph",
        text: "Woodworking plans for beginners should remove guesswork. Yet most free downloads are missing assembly steps, use nominal lumber sizes incorrectly, or skip hardware specs. You only discover the gap after the lumber is cut.",
      },
      {
        type: "heading",
        text: "Five Signs of a Complete Plan",
        level: 2,
      },
      {
        type: "bulletList",
        items: [
          "Step-by-step instructions in logical assembly order",
          "Exact cut list with finished dimensions",
          "Materials list including screws, glue, and hardware",
          "Multi-angle or exploded views of joints",
          "Clarity on whether the builder tested the plan physically",
        ],
      },
      {
        type: "heading",
        text: "Why \"16,000 Plans\" Zip Files Disappoint",
        level: 2,
      },
      {
        type: "paragraph",
        text: "Huge unorganized collections feel like value but waste weekends searching filenames. A searchable library — filter by category, keyword, and skill level — beats a folder dump every time.",
      },
      {
        type: "heading",
        text: "Shop-Tested vs Internet-Drawn",
        level: 2,
      },
      {
        type: "paragraph",
        text: "Professional plan libraries built by workshop teams catch measurement errors before you do. That is the core promise of libraries like TedsWoodworking: build first, publish second.",
      },
      cta(
        "Plans built in the shop first",
        "Lifetime access to 16,000 tested plans — searchable, not a chaotic zip file.",
      ),
    ],
  },
  {
    slug: "garage-workshop-setup-budget",
    title: "How to Set Up a Garage Workshop on a Budget",
    excerpt:
      "You do not need a barn. Here is how to organize half a garage for woodworking — layout, lighting, dust control, and mobile tool storage.",
    featuredImage: IMG.workshop,
    featuredImageAlt: "Organized garage woodworking workshop",
    publishedAt: "2026-05-15",
    seoTitle: "Garage Workshop Setup on a Budget — Woodworking Guide",
    seoDescription:
      "Set up a small garage workshop: layout tips, lighting, workbench placement, dust collection basics, and storing lumber in limited space.",
    targetKeyword: "garage workshop / small shop woodworking",
    readMinutes: 7,
    category: "workshop",
    content: [
      {
        type: "paragraph",
        text: "Most hobbyists search for workshop ideas because cars, bikes, and storage compete for the same floor space. The goal is a layout that lets you break down sheet goods, assemble projects, and sweep up without rebuilding the room every weekend.",
      },
      {
        type: "heading",
        text: "Layout Priorities",
        level: 2,
      },
      {
        type: "bulletList",
        items: [
          "Put the table saw where you can feed long rips safely",
          "Keep a clear zone for assembly and clamping",
          "Store lumber vertically or on a rack — off the floor",
          "Mobile bases on heavy tools so one person can move them",
        ],
      },
      {
        type: "heading",
        text: "Lighting and Power",
        level: 2,
      },
      {
        type: "paragraph",
        text: "Overhead garage lighting is rarely enough. Add task lighting over the workbench and saw station. Dedicated circuits for larger tools prevent tripped breakers mid-cut.",
      },
      {
        type: "heading",
        text: "First Builds for Your Shop",
        level: 2,
      },
      {
        type: "paragraph",
        text: "Ironically, some of the best starter projects improve your shop: a rolling workbench, wall lumber rack, or clamp storage wall. Plan libraries often include workshop jigs specifically for small spaces.",
      },
      cta("Plans for small-shop builds", "Filter workshop & jig categories in a searchable plan library."),
    ],
  },
  {
    slug: "woodworking-joinery-basics",
    title: "Woodworking Joinery Basics for Beginners",
    excerpt:
      "Woodworking techniques searches cluster around joints and assembly. Start with screws, glue, and pocket holes before you chase hand-cut dovetails.",
    featuredImage: IMG.craft,
    featuredImageAlt: "Wood joinery and assembly in a workshop",
    publishedAt: "2026-05-14",
    seoTitle: "Woodworking Joinery Basics for Beginners",
    seoDescription:
      "Learn beginner woodworking joinery: butt joints, pocket screws, dadoes, glue-up tips, and when to upgrade to advanced joints.",
    targetKeyword: "woodworking techniques / woodworking basics",
    readMinutes: 8,
    category: "getting-started",
    content: [
      {
        type: "paragraph",
        text: "Woodworking basics around joinery confuse beginners because social media highlights exotic joints while 90% of furniture uses simple, strong connections reinforced with glue and mechanical fasteners.",
      },
      {
        type: "heading",
        text: "Start Here",
        level: 2,
      },
      {
        type: "bulletList",
        items: [
          "Pocket-hole screws — fast cabinet and frame assembly",
          "Glue + screws — strong for shop projects and painted work",
          "Dadoes on a table saw — shelves that sit flush in cases",
          "Biscuits or dowels — alignment help on panel glue-ups",
        ],
      },
      {
        type: "heading",
        text: "Glue-Up Tips",
        level: 2,
      },
      {
        type: "bulletList",
        items: [
          "Dry-fit everything before glue",
          "Spread glue thin and even — squeeze-out is normal",
          "Use enough clamps to close gaps along the joint line",
          "Keep a damp rag for immediate squeeze-out cleanup",
        ],
      },
      {
        type: "paragraph",
        text: "Good plans specify joinery method per step so you are not improvising under time pressure while glue sets.",
      },
      cta("Follow proven assembly order", "Shop-tested plans spell out every joint — not just a photo of the finished piece."),
    ],
  },
  {
    slug: "how-to-choose-lumber",
    title: "How to Choose Lumber for Woodworking Projects",
    excerpt:
      "Nominal vs actual sizes, hardwood vs softwood, and how to read a plan's materials list so you buy once — not three trips to the yard.",
    featuredImage: IMG.home,
    featuredImageAlt: "Lumber selection for woodworking projects",
    publishedAt: "2026-05-13",
    seoTitle: "How to Choose Lumber for Woodworking — Beginner Guide",
    seoDescription:
      "Choose lumber for woodworking: nominal dimensions, pine vs hardwood, reading grain, avoiding warp, and matching the plan's cut list.",
    targetKeyword: "woodworking lumber / materials list",
    readMinutes: 7,
    category: "getting-started",
    content: [
      {
        type: "paragraph",
        text: "The white oak cabinet story that started many professional plan libraries comes down to lumber: a plan used nominal 3/4″ thickness while store-bought boards measure 13/16″ or 19/32″ actual. Three students cut wrong panels — not because they could not measure, but because the plan was wrong.",
      },
      {
        type: "heading",
        text: "Nominal vs Actual",
        level: 2,
      },
      {
        type: "paragraph",
        text: "A \"1×4\" is not 1 inch by 4 inches. Learn actual dimensions for common board sizes before you mark your first cut.",
      },
      {
        type: "heading",
        text: "Picking Boards at the Store",
        level: 2,
      },
      {
        type: "bulletList",
        items: [
          "Sight down the length for bow, twist, or cup",
          "Match grain direction on visible faces for furniture",
          "Buy one extra board for mistakes on first builds",
          "Let kiln-dried lumber acclimate to your shop a few days when possible",
        ],
      },
      cta(
        "Exact materials lists per project",
        "Stop guessing at the lumber yard — use plans with verified cut and materials lists.",
      ),
    ],
  },
  {
    slug: "woodworking-safety-tips",
    title: "Woodworking Safety Tips Every Beginner Should Know",
    excerpt:
      "Power tools, sharp blades, and dust — the safety basics that belong in every woodworking how-to before your first cut.",
    featuredImage: IMG.workshop,
    featuredImageAlt: "Safe woodworking practice with push stick and guards",
    publishedAt: "2026-05-12",
    seoTitle: "Woodworking Safety Tips for Beginners",
    seoDescription:
      "Essential woodworking safety: PPE, table saw rules, dust control, kickback prevention, and shop habits that prevent injuries.",
    targetKeyword: "woodworking safety / woodworking tips",
    readMinutes: 6,
    category: "getting-started",
    content: [
      {
        type: "paragraph",
        text: "Woodworking tips and tricks searches often focus on shortcuts — but safety habits compound like skill. The best woodworkers treat near-misses as signals to change procedure, not luck.",
      },
      {
        type: "heading",
        text: "Non-Negotiables",
        level: 2,
      },
      {
        type: "bulletList",
        items: [
          "Safety glasses and hearing protection in the shop",
          "No loose clothing or dangling cords near spinning blades",
          "Push sticks and riving knives on table saws",
          "Dust mask or respirator for sanding and cutting",
          "Unplug tools before blade changes or adjustments",
        ],
      },
      {
        type: "heading",
        text: "Kickback Awareness",
        level: 2,
      },
      {
        type: "paragraph",
        text: "Kickback happens when the workpiece binds and launches. Use a sharp blade, proper fence alignment, and never stand inline with the rip cut. If you are new, practice on scrap until feeds feel controlled.",
      },
      cta("Build confidence with clear steps", "Structured plans reduce improvisation — where many accidents start."),
    ],
  },
  {
    slug: "diy-woodworking-projects-that-sell",
    title: "DIY Woodworking Projects That Sell (and How to Start)",
    excerpt:
      "DIY woodworking projects searches often hide a business angle — craft fairs, local buyers, and side income from builds you already enjoy.",
    featuredImage: IMG.furniture,
    featuredImageAlt: "Handmade woodworking projects ready to sell",
    publishedAt: "2026-05-11",
    seoTitle: "DIY Woodworking Projects That Sell — Side Income Guide",
    seoDescription:
      "Woodworking projects that sell at craft fairs and locally: Adirondack chairs, coops, cutting boards, and how to price beginner builds.",
    targetKeyword: "DIY woodworking projects / sell woodworking",
    readMinutes: 8,
    category: "projects",
    content: [
      {
        type: "paragraph",
        text: "Search interest in DIY woodworking projects that sell rises whenever lumber costs spike — people want hobby time that can pay for itself. Real buyers exist for outdoor furniture, home decor, and custom storage.",
      },
      {
        type: "heading",
        text: "Projects With Repeat Demand",
        level: 2,
      },
      {
        type: "bulletList",
        items: [
          "Adirondack chairs and outdoor seating",
          "Planters and raised garden beds",
          "Chicken coops and small animal shelters",
          "Cutting boards and charcuterie slabs",
          "Custom signs and rustic decor (simple builds, strong margins)",
        ],
      },
      {
        type: "heading",
        text: "Pricing Reality",
        level: 2,
      },
      {
        type: "paragraph",
        text: "One TedsWoodworking buyer reported selling two Adirondack chairs for $175 each after a $67 plan purchase. Your margin depends on local demand, finish quality, and how efficiently the plan reduces build time.",
      },
      {
        type: "heading",
        text: "Legal and Practical Notes",
        level: 2,
      },
      {
        type: "paragraph",
        text: "Many commercial plan licenses allow selling finished pieces — check terms on any plan you use. Track material costs, time, and local regulations for small business sales.",
      },
      {
        type: "image",
        src: IMG.project,
        alt: "Quality outdoor woodworking project",
      },
      cta(
        "Includes woodworking business guide",
        "Lifetime plans plus a free guide on starting a home woodworking business — included with the full library.",
      ),
    ],
  },
];

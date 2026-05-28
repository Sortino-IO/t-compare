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
      "New to the shop? Here is a realistic path from zero to your first finished project — tools, space, safety, budget, and how to avoid the plan mistakes that waste lumber.",
    featuredImage: IMG.workshop,
    featuredImageAlt: "Beginner woodworking workshop with tools and lumber",
    publishedAt: "2026-05-20",
    seoTitle: "How to Start Woodworking — Beginner's Guide (2026)",
    seoDescription:
      "Learn how to start woodworking: essential first tools, garage shop setup, safety basics, week-by-week learning path, and picking beginner projects you will actually finish.",
    targetKeyword: "woodworking for beginners (~5,900/mo)",
    readMinutes: 18,
    category: "getting-started",
    content: [
      {
        type: "paragraph",
        text: "Woodworking for beginners is less about talent and more about sequence: pick one project, gather the right tools, follow a complete plan, and finish before you chase the next idea. That sounds obvious — but most new woodworkers skip straight to inspiration photos and end up with half-built pieces in the garage, a pile of expensive tools they barely use, and frustration that has nothing to do with skill.",
      },
      {
        type: "paragraph",
        text: "This guide walks you through a realistic first 30 days: what to buy, how to set up even a corner of a garage, how to read plans correctly, and how to finish something you are proud to show someone. You do not need a barn, a $10,000 tool collection, or years of experience. You need a clear path and one completed build.",
      },
      {
        type: "heading",
        text: "Step 1: Define Your First Project Before You Buy Tools",
        level: 2,
      },
      {
        type: "paragraph",
        text: "Search volume for woodworking projects is huge because people want something tangible fast — a shelf, a bench, a planter, a small table. The mistake is buying tools first and then hunting for a project that fits them. Reverse that order. Choose one build that needs only a table saw (or circular saw), a drill, clamps, and a sander. Avoid projects that require dovetails, bent lamination, or a full tool collection on day one.",
      },
      {
        type: "heading",
        text: "Good First Projects vs. Projects to Save for Later",
        level: 3,
      },
      {
        type: "bulletList",
        items: [
          "Good first builds: floating wall shelf, step stool, simple workbench, planter box, small side table, basic bookshelf, cutting board",
          "Solid second projects: Adirondack chair, garden bench, wall-mounted tool cabinet, coffee table with aprons",
          "Avoid for now: cabinets with inset doors, chairs with angled joinery, large dining tables, anything requiring a jointer/planer on day one",
          "Pick a plan with a full cut list and materials list before you visit the lumber yard — not after",
        ],
      },
      {
        type: "paragraph",
        text: "A good first project teaches measuring, square cuts, drilling, clamping, and finishing — without forcing you to learn five new techniques at once. If the plan says \"beginner\" but includes mortise-and-tenon joinery, it is not a beginner plan regardless of what the title claims.",
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
        text: "Minimum Shop Checklist",
        level: 3,
      },
      {
        type: "bulletList",
        items: [
          "Flat, stable work surface at comfortable height (34–36″ is typical for bench work)",
          "At least one dedicated 120V outlet on its own circuit for larger tools",
          "Task lighting over the bench — overhead garage fluorescents alone cast shadows on your cut lines",
          "8–10 feet of clear floor space in one direction for breaking down lumber",
          "A place to store lumber off the floor (even a simple vertical rack against one wall)",
          "A fire extinguisher within reach — wood dust and finishes are real hazards",
        ],
      },
      {
        type: "paragraph",
        text: "If you share the garage with cars, use mobile bases on heavy tools so you can roll the table saw against a wall when you are done. Many successful hobbyists work in a single bay and park outside on build weekends. The layout matters more than square footage.",
      },
      {
        type: "image",
        src: IMG.craft,
        alt: "Woodworker reviewing plans at a workbench",
        caption: "A complete plan saves more time than any new gadget.",
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
        type: "heading",
        text: "How to Work Through a Plan Before You Cut",
        level: 3,
      },
      {
        type: "bulletList",
        items: [
          "Read the entire plan once before buying lumber — surprises in step 8 should not happen on step 1",
          "Confirm whether dimensions use nominal or actual lumber thickness (a 1×4 is not 1″ × 4″)",
          "Print the cut list and mark pieces as you go — label boards with pencil as you cut",
          "Dry-fit assemblies before glue or final screws — gaps you see dry are gaps you will see forever glued",
          "Note hardware sizes (screw length, pocket-hole screw type) and buy them in one trip",
          "Check whether the plan assumes pre-milled plywood vs. solid lumber for panels",
        ],
      },
      {
        type: "paragraph",
        text: "If a free PDF plan skips the cut list or uses only a single front-view drawing, treat it as inspiration — not instructions. Incomplete plans are the number-one reason beginners abandon projects halfway through.",
      },
      {
        type: "heading",
        text: "Step 4: Your First 30 Days — A Realistic Timeline",
        level: 2,
      },
      {
        type: "paragraph",
        text: "Spreading the learning curve across a month keeps frustration low and completion rates high. Here is a pace that works for most people with a few hours on weekends:",
      },
      {
        type: "bulletList",
        items: [
          "Week 1: Choose your project, read the full plan, buy core tools if needed, set up bench and lighting",
          "Week 2: Buy lumber (plus one extra board), practice cuts on scrap, cut all pieces per the cut list",
          "Week 3: Dry-fit, assemble sub-assemblies, sand through 120–180 grit, fix any gaps before glue",
          "Week 4: Apply finish (paint, stain, or clear coat), install hardware, mount or place the finished piece",
        ],
      },
      {
        type: "paragraph",
        text: "Do not rush the finish. Most beginners spend 80% of their time on construction and 20% on sanding and finishing — then wonder why the piece looks \"homemade.\" Flip that ratio on your first build. Sanding through 180 grit and applying two thin finish coats will make even simple joinery look professional.",
      },
      {
        type: "heading",
        text: "Step 5: Common Beginner Mistakes (and How to Avoid Them)",
        level: 2,
      },
      {
        type: "bulletList",
        items: [
          "Buying every tool before building anything — start minimal, expand when you hit a real limitation",
          "Skipping dry-fits — glue sets in minutes; misaligned parts become permanent fast",
          "Using the wrong lumber thickness because the plan said \"1×\" without specifying actual dimensions",
          "Starting a second project before finishing the first — momentum comes from completion, not novelty",
          "Ignoring safety basics because \"it's just a quick cut\" — most shop injuries happen on familiar tools",
          "Chasing perfect joints on a painted shop project — paint hides a lot; save perfectionism for show pieces",
        ],
      },
      {
        type: "heading",
        text: "Step 6: Build Once, Then Expand Your Toolkit",
        level: 2,
      },
      {
        type: "paragraph",
        text: "After your first finish, you will know whether you want a miter saw for trim, a router for profiles, or a better table saw fence. Buy tools to solve problems you have actually hit — not problems a forum told you that you might hit someday. A random-orbit sander after hand-sanding a tabletop is a justified purchase. A $400 dovetail jig before you have built a box is not.",
      },
      {
        type: "paragraph",
        text: "Keep a simple notebook or phone notes file: what went wrong, what tool would have helped, what you would do differently. That log becomes your personal upgrade roadmap and saves you from buying duplicates of things you already own.",
      },
      cta("Ready for project #1?", "Get instant access to searchable plans filtered by beginner difficulty."),
    ],
  },
  {
    slug: "essential-woodworking-tools-beginners",
    title: "Essential Woodworking Tools for Beginners",
    excerpt:
      "The woodworking tools category gets 22,000+ searches a month for a reason — here is the minimal kit that covers 80% of starter projects, plus what to add next and what you can skip entirely.",
    featuredImage: IMG.craft,
    featuredImageAlt: "Essential woodworking tools laid out on a workbench",
    publishedAt: "2026-05-19",
    seoTitle: "Essential Woodworking Tools for Beginners (2026)",
    seoDescription:
      "Best woodworking tools for beginners: table saw vs circular saw, drill, clamps, measuring tools, budget tiers, maintenance tips, and what you can skip until later.",
    targetKeyword: "woodworking tools (~22,200/mo)",
    readMinutes: 16,
    category: "tools",
    content: [
      {
        type: "paragraph",
        text: "Woodworking tools searches spike because beginners want one authoritative list. Here is the honest version: most projects need a way to make straight cuts, a way to join boards, and a way to measure accurately. Everything else is optimization. This guide breaks tools into tiers so you can start under $500 and grow your shop as your projects demand it.",
      },
      {
        type: "heading",
        text: "The Core Four (Covers Most Beginner Plans)",
        level: 2,
      },
      {
        type: "paragraph",
        text: "These four categories handle the majority of beginner furniture, outdoor, and shop projects. If you own quality tools in each group, you can build dozens of plans before needing anything else.",
      },
      {
        type: "bulletList",
        items: [
          "Cutting: portable table saw ($300–600) or quality circular saw ($80–150) with a straightedge guide",
          "Drill/driver: 18V or 20V cordless combo kit with 1/4″ hex driver and clutch settings ($100–200)",
          "Clamps: at least four — two 24″ bar clamps and two quick-grip style; you cannot glue or assemble without them ($40–80)",
          "Sander: random-orbit sander (5″ or 6″) with variable speed saves hours vs hand sanding ($50–100)",
        ],
      },
      {
        type: "heading",
        text: "Measuring & Marking (Do Not Cheap Out Here)",
        level: 2,
      },
      {
        type: "paragraph",
        text: "A 1/16″ error on paper becomes a gap you can see in a glued joint. Good measuring tools cost less than one botched panel and last decades if you do not drop them on concrete.",
      },
      {
        type: "bulletList",
        items: [
          "12″ combination square — checking 90° and 45° angles, marking lines across board faces ($15–40)",
          "25′ tape measure with a clear, stable hook — check that the hook slides correctly for inside vs outside measurements",
          "Sharp pencil or mechanical pencil plus a marking knife for precise cross-grain lines",
          "Speed square (7″ or 12″) for crosscuts with a circular saw and quick layout on framing lumber",
          "Optional but valuable: 4′ level or straightedge for checking assembly squareness on larger frames",
        ],
      },
      {
        type: "heading",
        text: "Budget Starter Kit vs. Mid-Range Shop",
        level: 2,
      },
      {
        type: "paragraph",
        text: "Your budget determines whether you start with a circular saw or jump to a table saw. Both paths work — the table saw path is faster and more accurate for repeat rips; the circular saw path costs less upfront.",
      },
      {
        type: "heading",
        text: "Under $400 — Circular Saw Path",
        level: 3,
      },
      {
        type: "bulletList",
        items: [
          "Circular saw + DIY straightedge jig (two clamps and a factory-edge plywood strip)",
          "Cordless drill/driver, four clamps, random-orbit sander",
          "Combination square, tape, speed square, basic chisel set for cleanup",
          "Work surface: sturdy folding table or DIY bench from 2×4s and plywood",
        ],
      },
      {
        type: "heading",
        text: "$600–1,200 — Table Saw Path",
        level: 3,
      },
      {
        type: "bulletList",
        items: [
          "Jobsite table saw with rack-and-pinion fence (most versatile first big purchase)",
          "Same drill, clamps, sander, and measuring kit as above",
          "Miter saw can wait until you are cutting lots of trim or repetitive crosscuts at identical lengths",
          "Shop vacuum connected to the saw for dust — your lungs and marriage will thank you",
        ],
      },
      {
        type: "heading",
        text: "Joinery Tools Worth Adding Early",
        level: 2,
      },
      {
        type: "bulletList",
        items: [
          "Pocket-hole jig (Kreg or equivalent) — fastest way to assemble face frames, boxes, and table aprons",
          "Wood glue (PVA, Type II for outdoor) — stronger than the wood around it when clamped correctly",
          "Brad nailer (18-gauge) — optional but speeds up trim, backs, and temporary holds during glue-up",
          "Forstner or spade bits for clean holes when plans call for dowels or cable pass-throughs",
        ],
      },
      {
        type: "paragraph",
        text: "You do not need a router, jointer, or planer for your first three projects. When you want decorative edges or raised panels, add a trim router with two or three bits — not a full 50-piece set.",
      },
      {
        type: "heading",
        text: "What to Skip at First",
        level: 2,
      },
      {
        type: "bulletList",
        items: [
          "Full-size cabinet saw — overkill until you know your workflow and have dedicated shop space",
          "Every router bit set — buy bits when a specific plan calls for them",
          "Duplicate sanders, jigs, and specialty gadgets marketed to beginners on social media",
          "Cheap no-name table saws with flimsy fences — inaccurate fences teach bad habits and waste lumber",
          "Benchtop planer/jointer combo before you understand milling — buy S4S lumber from the store first",
        ],
      },
      {
        type: "heading",
        text: "Tool Maintenance Basics",
        level: 2,
      },
      {
        type: "paragraph",
        text: "Tools that stay sharp, clean, and calibrated outperform expensive tools that are neglected. Five minutes after each session pays off for years.",
      },
      {
        type: "bulletList",
        items: [
          "Wipe table saw top with light machine oil or dedicated wax to prevent rust",
          "Vacuum dust from motor housings and vents — overheating shortens tool life",
          "Replace circular/table saw blades when burn marks appear or feed pressure increases",
          "Charge batteries at room temperature; store them partially charged if unused for months",
          "Keep one dedicated shop towel and a small brush near the saw for instant cleanup",
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
        caption: "A small, organized shop beats a large messy one every time.",
      },
    ],
  },
  {
    slug: "best-table-saw-for-beginners",
    title: "Best Table Saw for Beginners: 2026 Buyer's Guide",
    excerpt:
      "The table saw is the most searched single-tool decision in woodworking. Here is how to choose between jobsite, compact, and benchtop models — what actually matters for accuracy, safety, and long-term value.",
    featuredImage: IMG.workshop,
    featuredImageAlt: "Table saw in a home woodworking shop",
    publishedAt: "2026-05-18",
    seoTitle: "Best Table Saw for Beginners — 2026 Buyer's Guide",
    seoDescription:
      "Compare jobsite vs benchtop table saws for beginners: fence quality, rip capacity, safety features, blade selection, setup tips, and which models fit a garage workshop.",
    targetKeyword: "best table saw for beginners / woodworking table saws",
    readMinutes: 17,
    category: "tools",
    content: [
      {
        type: "paragraph",
        text: "If you are serious about woodworking projects beyond simple boards, a table saw is usually the first big purchase. Search interest for woodworking table saws stays high because the wrong saw frustrates you on every rip cut — while the right one makes beginner plans feel easy. This guide explains categories, features that matter, features that are marketing noise, and how to set up whatever you buy for accurate, safe cuts.",
      },
      {
        type: "heading",
        text: "Three Table Saw Categories Explained",
        level: 2,
      },
      {
        type: "heading",
        text: "Jobsite Saws — Best for Most Beginners",
        level: 3,
      },
      {
        type: "paragraph",
        text: "Portable jobsite saws with rack-and-pinion fences (like the DeWalt DWE7491RS, Bosch 4100, or similar class of tools) balance accuracy, power, and storage. You can rip sheet goods, build a folding outfeed table, and store the saw against a wall when you are done. Expect to spend $400–700 for a saw plus stand.",
      },
      {
        type: "bulletList",
        items: [
          "Look for a stable fence that locks parallel to the blade and does not deflect under light pressure",
          "15-amp motor handles hardwood rips up to about 2″ thick for hobby use",
          "Riving knife and blade guard — use them on every through-cut, not just when you remember",
          "Wheeled stands save your back if you move the saw often; folding stands work in tight garages",
          "Typical rip capacity: 24–32″ to the right of the blade — enough for most furniture panels",
        ],
      },
      {
        type: "heading",
        text: "Benchtop Saws — Compact but Limited",
        level: 3,
      },
      {
        type: "paragraph",
        text: "Benchtop models sit on your workbench and cost less ($150–300) but have lighter fences, smaller tables, and less rip capacity. They work for small projects and tight apartments but frustrate quickly when you start ripping 4×8 plywood or building full-size furniture. Consider benchtop only if space and budget are extremely tight.",
      },
      {
        type: "heading",
        text: "Cabinet & Hybrid Saws — Later Upgrade",
        level: 3,
      },
      {
        type: "paragraph",
        text: "Cabinet saws ($1,500–4,000+) offer mass, precision, and dust collection for dedicated shops. Hybrids split the difference. Neither belongs in a beginner's first purchase unless you already know you are committed and have permanent shop space. Most hobbyists never need more than a good jobsite saw on a solid outfeed setup.",
      },
      {
        type: "heading",
        text: "When a Circular Saw Is Enough",
        level: 2,
      },
      {
        type: "paragraph",
        text: "For your first project or two, a circular saw with a DIY straightedge jig can work. Many easy woodworking projects for beginners use shorter cuts only. Upgrade to a table saw when you are tired of clamping guides, re-measuring every rip, and fighting tear-out on long cuts.",
      },
      {
        type: "bulletList",
        items: [
          "Circular saw wins on: cost, portability, single-sheet breakdown outdoors",
          "Table saw wins on: repeat rips, joinery cuts (tenons, grooves), accuracy, speed",
          "Rule of thumb: if you are building more than two furniture pieces this year, a table saw pays for itself in time and lumber saved",
        ],
      },
      {
        type: "heading",
        text: "Features That Actually Matter",
        level: 2,
      },
      {
        type: "bulletList",
        items: [
          "Fence quality — the most important spec; test lock repeatability before you trust any cut",
          "Riving knife that stays aligned with the blade through height changes",
          "Flat cast or stamped table top — check with a straightedge; dips cause snipe and binding",
          "Standard 10″ blade diameter — replacement blades are everywhere; odd sizes are painful",
          "Dust port that fits a shop vac hose (2.5″ or adapter) — you will use this daily",
          "Soft-start motor if you are on shared household circuits — reduces breaker trips",
        ],
      },
      {
        type: "heading",
        text: "Blade Selection for Beginners",
        level: 2,
      },
      {
        type: "paragraph",
        text: "The blade that ships with most saws is fine for construction lumber and rough cuts. For furniture-grade plywood and hardwood, upgrade to a 40-tooth combination or 60-tooth crosscut blade ($30–60). A dull or wrong-pitch blade causes burn marks, kickback risk, and the false impression that your saw is underpowered.",
      },
      {
        type: "bulletList",
        items: [
          "24-tooth rip blade — fast cuts in thick softwood; rough edge acceptable for hidden parts",
          "40-tooth combination — good daily driver for mixed rips and crosscuts",
          "60-tooth crosscut / plywood blade — clean edges on oak, maple, and veneered sheet goods",
          "Never mix blade diameter or arbor size — 10″ / 5/8″ arbor is standard on jobsite saws",
        ],
      },
      {
        type: "heading",
        text: "Setup Checklist After Unboxing",
        level: 2,
      },
      {
        type: "bulletList",
        items: [
          "Verify blade is parallel to the miter slot (adjust trunnion or manufacturer procedure)",
          "Check fence parallel to blade at front and rear — even 1/32″ out causes binding and kickback",
          "Set blade height so teeth clear the workpiece by about 1/8″ — not fully buried in the wood",
          "Install riving knife at correct height for through-cuts",
          "Make five test rips on scrap and measure width at both ends — adjust fence until consistent",
        ],
      },
      {
        type: "heading",
        text: "Safety Before Brand Loyalty",
        level: 2,
      },
      {
        type: "paragraph",
        text: "Every brand has fans. Every saw can hurt you if used carelessly. These rules apply regardless of logo on the cabinet.",
      },
      {
        type: "bulletList",
        items: [
          "Never freehand rips without a fence or track — the blade pulls work toward itself",
          "Use push sticks for cuts narrower than about 6″ between blade and fence",
          "Unplug the saw when changing blades or adjusting the riving knife",
          "Hearing and eye protection every session — splinters launch sideways, not just forward",
          "Do not stand directly behind the blade — kickback sends material backward along the fence line",
          "Keep the floor clear — tripping mid-cut is how good woodworkers get hurt",
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
      "Woodworking projects is one of the highest-volume search topics in the hobby. These 12 builds are beginner-realistic — with time estimates, tools required, and skills each one teaches.",
    featuredImage: IMG.project,
    featuredImageAlt: "Finished easy woodworking project in a home",
    publishedAt: "2026-05-17",
    seoTitle: "Easy Woodworking Projects for Beginners (12 Ideas)",
    seoDescription:
      "Beginner woodworking projects you can finish in a weekend: shelves, benches, planters, and more — with difficulty ratings, tool lists, and how to pick plans that match your setup.",
    targetKeyword: "woodworking projects / easy woodworking projects for beginners",
    readMinutes: 15,
    category: "projects",
    content: [
      {
        type: "paragraph",
        text: "DIY woodworking projects for beginners fail when the plan assumes skills or tools you do not have. The projects below are popular because they teach core skills — measuring, square cuts, simple joinery — without advanced techniques. Each entry includes realistic time, tools, and what you will learn so you can pick the right first build for your shop.",
      },
      {
        type: "heading",
        text: "12 Beginner-Friendly Builds (Ranked by Difficulty)",
        level: 2,
      },
      {
        type: "heading",
        text: "Easiest — Finish in One Weekend",
        level: 3,
      },
      {
        type: "bulletList",
        items: [
          "Floating wall shelf (hidden cleat) — 3–4 hours; drill + saw; teaches level mounting and cleat joinery",
          "Planter box for deck or garden — 4–6 hours; saw + drill; teaches basic box construction and drainage planning",
          "Birdhouse or bat house — 2–3 hours; hand saw or miter saw; teaches angled cuts and small assembly",
          "Simple cutting board (edge-grain glue-up) — 6–8 hours over two days; saw + clamps + sander; introduces glue-up and food-safe finish",
        ],
      },
      {
        type: "heading",
        text: "Moderate — One to Two Weekends",
        level: 3,
      },
      {
        type: "bulletList",
        items: [
          "Step stool with angled legs — 8–10 hours; saw + drill; teaches angled leg layout and reinforcement",
          "Garage workbench with shelf storage — 10–12 hours; table saw recommended; teaches frame construction and load-bearing design",
          "Small bookshelf (fixed shelves) — 8–12 hours; table saw + drill; teaches dadoes or shelf-pin holes",
          "Wall-mounted tool cabinet — 10–14 hours; pocket-hole jig helpful; teaches carcase assembly and door hanging basics",
          "Simple coffee table with aprons — 12–16 hours; table saw + pocket screws; teaches leg-to-apron joinery",
        ],
      },
      {
        type: "heading",
        text: "Stretch Projects — Build After Your First Finish",
        level: 3,
      },
      {
        type: "bulletList",
        items: [
          "Adirondack chair — 12–20 hours; miter saw helpful for angles; great first outdoor furniture with high satisfaction payoff",
          "Garden bench — 10–16 hours; similar skills to Adirondack but simpler joinery",
          "Chicken coop (small) — 20–30 hours; high search volume — start with a compact 3–4 bird plan, not a barn",
        ],
      },
      {
        type: "heading",
        text: "Skills Each Project Type Teaches",
        level: 2,
      },
      {
        type: "paragraph",
        text: "Rotating through different project types builds a well-rounded foundation faster than building the same shelf five times.",
      },
      {
        type: "bulletList",
        items: [
          "Box projects (planters, cabinets) — square assemblies, clamping strategy, panel selection",
          "Frame projects (tables, benches) — leg alignment, apron attachment, racking prevention",
          "Wall-mounted projects — stud finding, hidden hardware, weight load planning",
          "Outdoor projects — choosing rot-resistant lumber, exterior glue, and UV-stable finishes",
          "Glue-up projects (cutting boards) — grain orientation, clamp pressure, flattening after glue",
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
          "Filter by beginner difficulty if the library supports it — ignore \"easy\" labels on plans with 40 steps",
          "Read the full materials list before buying lumber — note sheet goods vs dimension lumber quantities",
          "Check that the plan matches your saw setup (full plywood sheets need rip capacity or circular saw breakdown)",
          "Prefer exploded diagrams showing assembly order — sequence matters when glue is involved",
          "Look for plans that list screw lengths and pocket-hole screw types — guessing leads to split boards",
          "Verify the plan includes finishing steps — raw wood projects fail outdoors and indoors alike",
        ],
      },
      {
        type: "heading",
        text: "Materials Tips for Beginner Projects",
        level: 2,
      },
      {
        type: "paragraph",
        text: "Pine, poplar, and birch plywood are forgiving first materials — soft enough to drill without pre-drilling every hole, inexpensive enough to replace a miscut. Save oak, walnut, and exotic hardwoods for project #5 or later when your cuts are consistently accurate.",
      },
      {
        type: "bulletList",
        items: [
          "Buy one extra board beyond the cut list on your first two builds",
          "Pre-sand rough lumber lightly before cutting — splinters slow you down and hurt",
          "For painted projects, filler and paint hide small gaps; for stained projects, fit matters more",
          "Exterior projects: use pressure-treated or cedar/ redwood; avoid standard pine without exterior finish",
        ],
      },
      {
        type: "image",
        src: IMG.furniture,
        alt: "Handmade wooden furniture built from plans",
        caption: "Simple joinery plus good finishing makes beginner builds look store-bought.",
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
      "With 14,800+ monthly searches for woodworking plans, most buyers still get incomplete diagrams. Here is how to spot a real plan vs a pretty picture — and organize your build workflow.",
    featuredImage: IMG.interior,
    featuredImageAlt: "Detailed woodworking plans and cut list on workbench",
    publishedAt: "2026-05-16",
    seoTitle: "Woodworking Plans — How to Choose Plans That Work",
    seoDescription:
      "Avoid bad woodworking plans: cut lists, step order, lumber sizes, red flags, licensing, and why shop-tested blueprints beat free PDF dumps.",
    targetKeyword: "woodworking plans (~14,800/mo)",
    readMinutes: 16,
    category: "plans",
    content: [
      {
        type: "paragraph",
        text: "Woodworking plans for beginners should remove guesswork. Yet most free downloads are missing assembly steps, use nominal lumber sizes incorrectly, or skip hardware specs. You only discover the gap after the lumber is cut — when fixes cost money and morale. This guide teaches you to evaluate any plan in ten minutes before you touch a saw.",
      },
      {
        type: "heading",
        text: "Five Signs of a Complete Plan",
        level: 2,
      },
      {
        type: "bulletList",
        items: [
          "Step-by-step instructions in logical assembly order — sub-assemblies before final glue-up",
          "Exact cut list with finished dimensions (not just \"cut one board to length\")",
          "Materials list including screws, glue, hinges, slides, and finish quantities",
          "Multi-angle or exploded views of joints — at least front, side, and one detail of critical connections",
          "Evidence the builder tested the plan physically — photos of build-in-progress, not only a render",
        ],
      },
      {
        type: "heading",
        text: "Red Flags That Predict a Failed Build",
        level: 2,
      },
      {
        type: "paragraph",
        text: "Walk away or treat as inspiration-only if you see these patterns:",
      },
      {
        type: "bulletList",
        items: [
          "Single photo of finished piece with no cut list or step numbering",
          "Dimensions that use nominal lumber sizes (\"1×4\") without actual thickness callouts",
          "No hardware specification — screw length matters; too long splits, too short pulls out",
          "Assembly steps that skip dry-fit or clamping guidance on glued joints",
          "Plans copied from magazines with missing pages or illegible scans",
          "\"Free\" plans bundled as SEO bait with broken download links or malware-adjacent ad walls",
        ],
      },
      {
        type: "heading",
        text: "How to Read a Cut List Like a Builder",
        level: 2,
      },
      {
        type: "paragraph",
        text: "Professional woodworkers mark up cut lists before the first cut. You should too.",
      },
      {
        type: "bulletList",
        items: [
          "Group cuts by lumber source — all pieces from one 8′ 1×4, then move to the next board",
          "Note grain direction on visible parts — book-matched panels look intentional; random grain looks chaotic",
          "Add 1/2″–1″ extra length on first builds for squaring ends after miscuts",
          "Label each cut piece with pencil as it comes off the saw — \"left side panel,\" not \"piece #7\"",
          "Cross-check total board feet against the materials list — missing a 2×4 stops the whole project",
        ],
      },
      {
        type: "heading",
        text: "Why \"16,000 Plans\" Zip Files Disappoint",
        level: 2,
      },
      {
        type: "paragraph",
        text: "Huge unorganized collections feel like value but waste weekends searching filenames like \"project_final_v3(2).pdf\". A searchable library — filter by category, keyword, and skill level — beats a folder dump every time. The question is not how many plans you own; it is how fast you can find one that matches your tools, space, and skill today.",
      },
      {
        type: "heading",
        text: "Shop-Tested vs Internet-Drawn",
        level: 2,
      },
      {
        type: "paragraph",
        text: "Professional plan libraries built by workshop teams catch measurement errors before you do. A designer who never built the piece might draw a shelf span that sags, a door gap that cannot close, or a joint that cannot be clamped. Shop-tested means someone stood at a bench, hit the problems, and revised the document.",
      },
      {
        type: "paragraph",
        text: "That is the core promise of libraries like TedsWoodworking: build first, publish second. Whether you use that library or another, apply the same filter — did a human build this, or did someone trace a photo in CAD?",
      },
      {
        type: "heading",
        text: "Organizing Your Build Workflow",
        level: 2,
      },
      {
        type: "bulletList",
        items: [
          "Print the plan or keep it on a tablet at the bench — phones get sawdust in charging ports",
          "Highlight completed steps; note deviations in pencil for your next build",
          "Keep hardware in labeled cups (yogurt containers work) per assembly stage",
          "Photograph your own build at key stages — helps with warranty claims and future repairs",
          "Store successful plans in a folder by category — outdoor, shop, furniture — for quick re-builds",
        ],
      },
      {
        type: "heading",
        text: "Licensing and Selling Finished Pieces",
        level: 2,
      },
      {
        type: "paragraph",
        text: "If you might sell what you build, read the plan license. Most personal-use plans allow unlimited builds for yourself and gifts. Commercial plans or commercial licenses vary — some allow selling finished goods, others restrict you to hobby use only. When in doubt, email the publisher before you price a chair for a craft fair.",
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
      "You do not need a barn. Here is how to organize half a garage for woodworking — layout, lighting, dust control, storage, and budget tiers from $200 to $2,000.",
    featuredImage: IMG.workshop,
    featuredImageAlt: "Organized garage woodworking workshop",
    publishedAt: "2026-05-15",
    seoTitle: "Garage Workshop Setup on a Budget — Woodworking Guide",
    seoDescription:
      "Set up a small garage workshop: layout tips, lighting, workbench placement, dust collection basics, lumber storage, and mobile tool strategies on a budget.",
    targetKeyword: "garage workshop / small shop woodworking",
    readMinutes: 14,
    category: "workshop",
    content: [
      {
        type: "paragraph",
        text: "Most hobbyists search for workshop ideas because cars, bikes, and storage compete for the same floor space. The goal is a layout that lets you break down sheet goods, assemble projects, and sweep up without rebuilding the room every weekend. A well-planned half-garage shop often outperforms a large messy space where every tool lives on the floor.",
      },
      {
        type: "heading",
        text: "Layout Priorities (In Order)",
        level: 2,
      },
      {
        type: "bulletList",
        items: [
          "Put the table saw where you can feed long rips safely — ideally open to the garage door side for full-sheet entry",
          "Keep a clear 4×8 zone for assembly and clamping — this is non-negotiable for furniture builds",
          "Store lumber vertically on a wall rack or horizontal on overhead racks — never flat on damp concrete",
          "Mobile bases on heavy tools so one person can reconfigure the shop in five minutes",
          "Keep the path from door to saw clear — carrying 8′ boards around a parked car gets old fast",
        ],
      },
      {
        type: "heading",
        text: "Sample Layouts for Common Garage Sizes",
        level: 2,
      },
      {
        type: "heading",
        text: "Single Bay (≈10×20 ft) — One Car Moves Out to Build",
        level: 3,
      },
      {
        type: "paragraph",
        text: "Table saw on mobile base against side wall, workbench on opposite wall, lumber rack on back wall above bench height. Break down plywood on foam insulation boards on the floor or on a low assembly table. This is the most common hobby setup and it works.",
      },
      {
        type: "heading",
        text: "Double Bay — Dedicated Wood Zone",
        level: 3,
      },
      {
        type: "paragraph",
        text: "One bay for parking, one for shop. Run a long workbench along the shared wall, saw at one end with outfeed extending toward the open bay. Add overhead lumber storage above the bench line. You can leave tools set up permanently — productivity jumps when setup time disappears.",
      },
      {
        type: "heading",
        text: "Lighting and Power",
        level: 2,
      },
      {
        type: "paragraph",
        text: "Overhead garage lighting is rarely enough for accurate work. Shadows hide crooked cut lines and uneven glue lines. Aim for 4,000–6,000 lumens over the primary work zone.",
      },
      {
        type: "bulletList",
        items: [
          "Add LED shop lights over the workbench and saw station — 4000K neutral white shows wood color accurately",
          "Plug tools into circuits that can handle 15-amp continuous load; avoid extension cord chains on table saws",
          "Install a power strip on the bench for chargers and small tools — one switch to kill the bench at night",
          "Consider a dedicated 240V circuit only if you buy a cabinet saw or large dust collector later",
        ],
      },
      {
        type: "heading",
        text: "Dust Control on a Budget",
        level: 2,
      },
      {
        type: "paragraph",
        text: "Sawdust is not just messy — fine wood dust is a respiratory hazard over years of hobby use. You do not need a $1,000 cyclone to start.",
      },
      {
        type: "bulletList",
        items: [
          "Shop vac hooked to the table saw port catches most chips at the source",
          "Wear a N95 or half-mask respirator when sanding — especially MDF and exotic species",
          "Sweep and vac the floor after every session — tracked dust spreads through the house",
          "Open the garage door for cross-ventilation when finishing with oil-based products",
          "Upgrade path: hose kit → cyclone separator lid on a trash can → dedicated dust collector",
        ],
      },
      {
        type: "heading",
        text: "Budget Tiers for Shop Setup",
        level: 2,
      },
      {
        type: "bulletList",
        items: [
          "$200 tier: folding work table, two LED shop lights, basic lumber rack from 2×4s, fire extinguisher",
          "$500 tier: add shop vac, pegboard or French cleat wall for hand tools, mobile tool cart",
          "$1,000 tier: add solid workbench build (great first project), more clamps, dust hose kit",
          "$2,000+ tier: table saw on stand, outfeed table, overhead storage, dedicated circuits",
        ],
      },
      {
        type: "heading",
        text: "First Builds That Improve Your Shop",
        level: 2,
      },
      {
        type: "paragraph",
        text: "Ironically, some of the best starter projects improve your shop: a rolling workbench, wall lumber rack, clamp storage wall, or outfeed table. You learn construction skills while solving a daily annoyance. Plan libraries often include workshop jigs specifically for small spaces — filter for \"workbench,\" \"storage,\" and \"jig\" categories.",
      },
      {
        type: "image",
        src: IMG.interior,
        alt: "Organized small woodworking shop with wall storage",
        caption: "Vertical storage and mobile tools turn a cramped garage into a real shop.",
      },
      cta("Plans for small-shop builds", "Filter workshop & jig categories in a searchable plan library."),
    ],
  },
  {
    slug: "woodworking-joinery-basics",
    title: "Woodworking Joinery Basics for Beginners",
    excerpt:
      "Woodworking techniques searches cluster around joints and assembly. Start with screws, glue, and pocket holes before you chase hand-cut dovetails — with detailed guidance on each method.",
    featuredImage: IMG.craft,
    featuredImageAlt: "Wood joinery and assembly in a workshop",
    publishedAt: "2026-05-14",
    seoTitle: "Woodworking Joinery Basics for Beginners",
    seoDescription:
      "Learn beginner woodworking joinery: butt joints, pocket screws, dadoes, biscuits, dowels, glue-up tips, and when to upgrade to advanced joints.",
    targetKeyword: "woodworking techniques / woodworking basics",
    readMinutes: 15,
    category: "getting-started",
    content: [
      {
        type: "paragraph",
        text: "Woodworking basics around joinery confuse beginners because social media highlights exotic joints while 90% of furniture uses simple, strong connections reinforced with glue and mechanical fasteners. Master five joint types and you can build almost anything in a beginner plan library. Save dovetails and mortise-and-tenon for when you enjoy spending weekends on a single drawer.",
      },
      {
        type: "heading",
        text: "The Five Joints Beginners Actually Need",
        level: 2,
      },
      {
        type: "heading",
        text: "1. Butt Joint + Screws + Glue",
        level: 3,
      },
      {
        type: "paragraph",
        text: "Two boards end-to-face or edge-to-edge, glued and screwed. Fast, strong enough for shop projects and painted furniture. Pre-drill pilot holes in hardwood to prevent splits. Countersink screw heads for a flush finish.",
      },
      {
        type: "heading",
        text: "2. Pocket-Hole Screws",
        level: 3,
      },
      {
        type: "paragraph",
        text: "Angled screws hidden inside the joint — the workhorse of modern hobby furniture. Ideal for face frames, table aprons, cabinet boxes, and quick repairs. Use coarse-thread pocket screws for softwood, fine-thread for hardwood. Clamp pieces during driving to prevent shift.",
      },
      {
        type: "heading",
        text: "3. Dado or Groove",
        level: 3,
      },
      {
        type: "paragraph",
        text: "A channel cut across (dado) or with (groove) the grain so a shelf or panel sits flush inside a case. Cut on a table saw with a dado stack or multiple passes with a standard blade. Shelves seated in dados cannot slide — critical for bookcases and cabinets.",
      },
      {
        type: "heading",
        text: "4. Biscuits or Dowels for Alignment",
        level: 3,
      },
      {
        type: "paragraph",
        text: "Not always structural — often used to keep panel glue-ups flush across the face. Biscuit joiners and doweling jigs speed alignment on tabletops and wide panels. The glue does the real holding work on edge joints.",
      },
      {
        type: "heading",
        text: "5. Rabbet and Lap Joints",
        level: 3,
      },
      {
        type: "paragraph",
        text: "A rabbet is a step cut along an edge so another board nests into it — common on cabinet backs and drawer bottoms. Lap joints overlap two notched boards — strong for frames and rustic furniture. Both are table-saw or router cuts within beginner reach.",
      },
      {
        type: "heading",
        text: "Glue-Up Tips That Prevent Ruined Projects",
        level: 2,
      },
      {
        type: "bulletList",
        items: [
          "Dry-fit everything before glue — including clamps in position",
          "Spread glue thin and even on both mating surfaces — starved joints fail, flooded joints waste time cleaning squeeze-out",
          "Use enough clamps to close gaps along the entire joint line — one clamp in the center is not enough on a 24″ panel",
          "Keep a damp rag for immediate squeeze-out cleanup on raw wood; on stained projects, use tape along the joint line first",
          "Work within open time — most PVA glues give 5–10 minutes before squeeze-out skins over",
          "Leave clamps on for at least 30–60 minutes; full cure takes 24 hours before heavy stress or machining",
        ],
      },
      {
        type: "heading",
        text: "When to Upgrade to Advanced Joinery",
        level: 2,
      },
      {
        type: "paragraph",
        text: "Move to mortise-and-tenon, dovetails, and hand-cut joints when you want the joint itself to be part of the design — visible drawer fronts, heirloom tables, skill-building for its own sake. For garage furniture, painted kids' beds, and outdoor builds, simple joints plus good engineering (triangles, stretchers, gussets) beat fancy joinery hidden under paint.",
      },
      {
        type: "bulletList",
        items: [
          "Visible joinery on drawer fronts → dovetails (hand or router jig)",
          "Chair legs and heavy racking loads → mortise-and-tenon with wedges or drawbore pins",
          "Thin stock where screws would split → biscuits, dowels, or specialized fasteners",
          "Outdoor exposure → stainless or coated screws plus exterior glue; mechanical fasteners beat glue-only",
        ],
      },
      {
        type: "paragraph",
        text: "Good plans specify joinery method per step so you are not improvising under time pressure while glue sets. If a plan says \"attach apron\" without saying how, that is another sign of an incomplete document.",
      },
      cta("Follow proven assembly order", "Shop-tested plans spell out every joint — not just a photo of the finished piece."),
    ],
  },
  {
    slug: "how-to-choose-lumber",
    title: "How to Choose Lumber for Woodworking Projects",
    excerpt:
      "Nominal vs actual sizes, hardwood vs softwood, plywood grades, and how to read a plan's materials list so you buy once — not three trips to the yard.",
    featuredImage: IMG.home,
    featuredImageAlt: "Lumber selection for woodworking projects",
    publishedAt: "2026-05-13",
    seoTitle: "How to Choose Lumber for Woodworking — Beginner Guide",
    seoDescription:
      "Choose lumber for woodworking: nominal dimensions, pine vs hardwood, plywood types, reading grain, avoiding warp, and matching the plan's cut list.",
    targetKeyword: "woodworking lumber / materials list",
    readMinutes: 14,
    category: "getting-started",
    content: [
      {
        type: "paragraph",
        text: "The white oak cabinet story that started many professional plan libraries comes down to lumber: a plan used nominal 3/4″ thickness while store-bought boards measure 13/16″ or 19/32″ actual. Three students cut wrong panels — not because they could not measure, but because the plan was wrong. Your job at the lumber yard is to match real dimensions to real plans.",
      },
      {
        type: "heading",
        text: "Nominal vs Actual — The Chart You Need",
        level: 2,
      },
      {
        type: "paragraph",
        text: "A \"1×4\" is not 1 inch by 4 inches. Nominal names are historical; actual dimensions are what hit your saw.",
      },
      {
        type: "bulletList",
        items: [
          "1×2 actual ≈ 3/4″ × 1-1/2″",
          "1×3 actual ≈ 3/4″ × 2-1/2″",
          "1×4 actual ≈ 3/4″ × 3-1/2″",
          "1×6 actual ≈ 3/4″ × 5-1/2″",
          "2×4 actual ≈ 1-1/2″ × 3-1/2″",
          "2×6 actual ≈ 1-1/2″ × 5-1/2″",
          "4×4 actual ≈ 3-1/2″ × 3-1/2″",
        ],
      },
      {
        type: "paragraph",
        text: "Plywood labeled 3/4″ is often 23/32″ actual. Always measure your stock with a caliper or tape if the plan clearance is tight — drawer sides and dados are unforgiving.",
      },
      {
        type: "heading",
        text: "Softwood vs Hardwood — When to Use Each",
        level: 2,
      },
      {
        type: "heading",
        text: "Softwoods (Pine, Fir, Cedar)",
        level: 3,
      },
      {
        type: "bulletList",
        items: [
          "Inexpensive, easy to cut and drill — ideal for first projects and painted furniture",
          "Dents easily — not great for fine dining tables without hard finish or cap rails",
          "Cedar and redwood resist rot — default choices for outdoor planters and benches",
          "Pressure-treated pine for ground contact — never use indoors or for cutting boards",
        ],
      },
      {
        type: "heading",
        text: "Hardwoods (Oak, Maple, Poplar, Walnut)",
        level: 3,
      },
      {
        type: "bulletList",
        items: [
          "Poplar — affordable hardwood, paints beautifully, good step up from pine",
          "Red oak and white oak — strong, visible grain; pre-drill screw holes",
          "Hard maple — dense, great for cutting boards and heavy-use surfaces",
          "Walnut and cherry — premium appearance; save for showcase pieces after skill builds",
        ],
      },
      {
        type: "heading",
        text: "Plywood and Sheet Goods",
        level: 2,
      },
      {
        type: "bulletList",
        items: [
          "Birch or maple plywood — stable, good for cabinets and shelves; void-free cores worth the premium",
          "Construction-grade CDX — structural only, not for visible furniture faces",
          "MDF — flat and cheap for painted panels; heavy, no grain strength, terrible dust",
          "Baltic birch — excellent for drawers and jigs; many thin plies resist warping",
          "Always support full sheets when cutting — sagging plywood binds the blade and ruins cuts",
        ],
      },
      {
        type: "heading",
        text: "Picking Boards at the Store",
        level: 2,
      },
      {
        type: "paragraph",
        text: "Big-box stores and lumber yards both work for hobbyists. Big-box is convenient; lumber yards offer better hardwood selection and often straightening services.",
      },
      {
        type: "bulletList",
        items: [
          "Sight down the length for bow (ends dip), twist (corners not flat), and cup (edges curl)",
          "Reject boards with large knots on structural edges or show faces unless rustic is the goal",
          "Match grain direction on visible faces for furniture — consecutive boards from one wider board look best",
          "Buy one extra board beyond the cut list on first builds — miscuts happen",
          "Let kiln-dried lumber acclimate to your shop 3–7 days when possible — especially in humid climates",
          "Stack lumber flat with stickers (spacers) between layers if storing more than a week",
        ],
      },
      {
        type: "heading",
        text: "Reading the Plan's Materials List",
        level: 2,
      },
      {
        type: "bulletList",
        items: [
          "Translate every line to actual dimensions before shopping",
          "Note species — substituting pine for oak changes screw torque and finish absorption",
          "Check quantity units — \"one sheet\" of plywood vs \"two boards\" of 1×6×8′",
          "Flag special items early — edge banding, veneer, hardware that requires online ordering",
          "Bring the cut list to the store on your phone — reordering one board costs another hour",
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
      "Power tools, sharp blades, and dust — the safety basics that belong in every woodworking how-to before your first cut, plus per-tool rules and shop habits.",
    featuredImage: IMG.workshop,
    featuredImageAlt: "Safe woodworking practice with push stick and guards",
    publishedAt: "2026-05-12",
    seoTitle: "Woodworking Safety Tips for Beginners",
    seoDescription:
      "Essential woodworking safety: PPE, table saw rules, miter saw safety, dust control, kickback prevention, and shop habits that prevent injuries.",
    targetKeyword: "woodworking safety / woodworking tips",
    readMinutes: 13,
    category: "getting-started",
    content: [
      {
        type: "paragraph",
        text: "Woodworking tips and tricks searches often focus on shortcuts — but safety habits compound like skill. The best woodworkers treat near-misses as signals to change procedure, not luck. Every tool in your shop can cause serious injury in seconds. Respect that reality and the hobby stays enjoyable for decades.",
      },
      {
        type: "heading",
        text: "Personal Protective Equipment (Non-Negotiables)",
        level: 2,
      },
      {
        type: "bulletList",
        items: [
          "Safety glasses — impact-rated, worn from the moment you enter the shop until you leave",
          "Hearing protection — muffs or plugs; damage is cumulative and permanent",
          "Dust mask (N95 minimum) for sanding; half-face respirator with organic cartridges for finishes",
          "No loose clothing, dangling jewelry, or long untied hair near spinning blades",
          "Sturdy closed-toe shoes — drop a clamp on a sandal once and you will never forget",
        ],
      },
      {
        type: "heading",
        text: "Table Saw Safety",
        level: 2,
      },
      {
        type: "paragraph",
        text: "The table saw causes more serious hobbyist injuries than any other tool — not because it is uniquely dangerous, but because it is used most often with the least guard compliance.",
      },
      {
        type: "bulletList",
        items: [
          "Use the riving knife and blade guard for through-cuts whenever possible",
          "Never rip freehand without a fence; never crosscut with the fence as a stop block",
          "Use push sticks when the rip width is under 6″ between blade and fence",
          "Stand slightly to the side of the blade, not inline with the cut line",
          "Unplug before blade changes, fence adjustments behind the blade, or clearing stuck pieces",
          "Keep the blade sharp — dull blades require more force and increase kickback risk",
        ],
      },
      {
        type: "heading",
        text: "Kickback — What It Is and How to Prevent It",
        level: 2,
      },
      {
        type: "paragraph",
        text: "Kickback happens when the workpiece binds against the blade and rear fence edge, then launches backward at high speed. It occurs in a fraction of a second. Prevention beats reaction every time.",
      },
      {
        type: "bulletList",
        items: [
          "Keep fence parallel to blade — misalignment pinches the board against the rising teeth",
          "Do not cut warped boards on the table saw without jointing or a sled — they rock and bind",
          "Do not reach over or behind the blade to pull stock through",
          "Use a crosscut sled for wide crosscuts instead of the miter gauge on wide panels",
          "Practice on scrap until feed pressure feels smooth and consistent before cutting project parts",
        ],
      },
      {
        type: "heading",
        text: "Other Common Tools — Quick Rules",
        level: 2,
      },
      {
        type: "bulletList",
        items: [
          "Circular saw: two hands on the tool, support the offcut so it does not sag and bind the blade",
          "Miter saw: let the blade reach full speed before lowering; hold stock firmly against fence; hands outside the marked danger zone",
          "Router: climb cuts throw the tool — always feed against bit rotation; start with shallow passes",
          "Drill press: clamp small parts — never hold them by hand while drilling",
          "Random-orbit sander: do not grab the spinning pad; let it stop before setting down on a surface",
        ],
      },
      {
        type: "heading",
        text: "Dust and Finishing Safety",
        level: 2,
      },
      {
        type: "paragraph",
        text: "Wood dust is a known respiratory irritant; some species (oak, walnut, exotic imports) sensitize over repeated exposure. Finishes add solvent fumes on top.",
      },
      {
        type: "bulletList",
        items: [
          "Ventilate when spraying or brushing oil-based finishes — open doors, fans exhausting outdoors",
          "Never store rags soaked in oil-based finish in a closed container — spontaneous combustion is real; lay flat to dry or submerge in water",
          "Keep a fire extinguisher rated ABC within arm's reach of the finishing area",
          "Separate food and drink from the shop — sawdust in coffee is not the main concern; chemicals on cups are",
        ],
      },
      {
        type: "heading",
        text: "Shop Habits That Keep You Safe",
        level: 2,
      },
      {
        type: "bulletList",
        items: [
          "Clean the floor after every session — slips cause falls into sharp tools",
          "One distraction rule — if someone talks to you mid-cut, finish the cut or turn off the tool first",
          "No alcohol or impairing medication before shop time",
          "Keep kids and pets out of the active zone — curious hands and wagging tails do not mix with blades",
          "First aid kit on the wall — bandages, pressure dressings, phone charged for emergencies",
        ],
      },
      cta("Build confidence with clear steps", "Structured plans reduce improvisation — where many accidents start."),
    ],
  },
  {
    slug: "diy-woodworking-projects-that-sell",
    title: "DIY Woodworking Projects That Sell (and How to Start)",
    excerpt:
      "DIY woodworking projects searches often hide a business angle — craft fairs, local buyers, and side income from builds you already enjoy. Here is what sells, how to price, and how to start legally.",
    featuredImage: IMG.furniture,
    featuredImageAlt: "Handmade woodworking projects ready to sell",
    publishedAt: "2026-05-11",
    seoTitle: "DIY Woodworking Projects That Sell — Side Income Guide",
    seoDescription:
      "Woodworking projects that sell at craft fairs and locally: outdoor furniture, decor, pricing formulas, marketing channels, and licensing basics.",
    targetKeyword: "DIY woodworking projects / sell woodworking",
    readMinutes: 15,
    category: "projects",
    content: [
      {
        type: "paragraph",
        text: "Search interest in DIY woodworking projects that sell rises whenever lumber costs spike — people want hobby time that can pay for itself. Real buyers exist for outdoor furniture, home decor, and custom storage. This is not a get-rich-quick path, but a skilled woodworker with efficient plans and consistent quality can cover material costs, fund new tools, and build a local reputation.",
      },
      {
        type: "heading",
        text: "Projects With Repeat Demand",
        level: 2,
      },
      {
        type: "paragraph",
        text: "Buyers at craft fairs and on local marketplaces gravitate toward items they can visualize in their yard or home — not abstract art pieces requiring taste alignment.",
      },
      {
        type: "bulletList",
        items: [
          "Adirondack chairs and outdoor seating sets — high perceived value, strong summer demand",
          "Planters and raised garden beds — spring seasonality, repeat customers upgrading sizes",
          "Chicken coops and small animal shelters — passionate niche buyers pay for solid construction",
          "Cutting boards and charcuterie slabs — gift market, smaller material cost, high margin if batch-produced",
          "Custom signs and rustic decor — simple builds with personalization (names, dates) command premiums",
          "Entry benches with storage, coat hooks, and mudroom organizers — local Facebook marketplace staple",
          "Cornhole boards, outdoor games — seasonal, fast builds, good booth traffic at fairs",
        ],
      },
      {
        type: "heading",
        text: "Pricing Reality — A Simple Formula",
        level: 2,
      },
      {
        type: "paragraph",
        text: "Underpricing is the most common mistake — you compete with mass-produced imports on price and lose on labor. Overpricing without brand story fails at craft fairs. Start with costs, then add margin for skill and finish.",
      },
      {
        type: "bulletList",
        items: [
          "Materials: lumber + hardware + finish + sandpaper + shop consumables (blades, bits)",
          "Labor: hours × your target hourly rate (even $25–40/hr for hobby side income)",
          "Overhead: fair fees, booth rental, mileage, packaging — allocate 10–15% or per-unit fee",
          "Profit margin: 20–40% on top for reinvestment and unexpected costs",
          "Compare locally: search Facebook Marketplace and Etsy for similar items — price within range with better finish or customization",
        ],
      },
      {
        type: "paragraph",
        text: "One TedsWoodworking buyer reported selling two Adirondack chairs for $175 each after a $67 plan purchase. Your margin depends on local demand, finish quality, and how efficiently the plan reduces build time. The second pair always builds faster than the first — price for pair #1 knowing pair #2 takes half the hours.",
      },
      {
        type: "heading",
        text: "Where to Sell (Without a Storefront)",
        level: 2,
      },
      {
        type: "bulletList",
        items: [
          "Local craft fairs and farmers markets — face-to-face feedback and impulse buys on outdoor pieces",
          "Facebook Marketplace and neighborhood groups — free listings, local pickup avoids shipping",
          "Etsy — works for small shippable items (cutting boards, decor); outdoor furniture is local-only",
          "Commission through word of mouth — one great porch set leads to neighbor inquiries",
          "Instagram or TikTok build videos — not required, but documenting builds creates trust before the fair",
        ],
      },
      {
        type: "heading",
        text: "Efficiency — How Plans Affect Profit",
        level: 2,
      },
      {
        type: "paragraph",
        text: "If a chair takes 20 hours because the plan is vague, your hourly rate collapses. Shop-tested plans with accurate cut lists let you batch-cut parts for multiple units — rip all seat slats at once, assemble three chairs in one glue session. Production thinking separates hobby income from hobby expense.",
      },
      {
        type: "bulletList",
        items: [
          "Build one prototype for yourself — iron out finish and fit before selling copies",
          "Create a cut list spreadsheet multiplier for quantity builds",
          "Standardize finishes — three stain options, not unlimited custom color matching at first",
          "Photograph the prototype in good light — booth sales depend on photos when shoppers walk past",
        ],
      },
      {
        type: "heading",
        text: "Legal and Practical Notes",
        level: 2,
      },
      {
        type: "paragraph",
        text: "Many commercial plan licenses allow selling finished pieces — check terms on any plan you use. Personal-use-only plans restrict sales. When in doubt, contact the publisher before your first paid delivery.",
      },
      {
        type: "bulletList",
        items: [
          "Track material costs and mileage for tax purposes if income is meaningful — consult a local accountant",
          "Check city/county rules for home-based sales and craft fair vendor permits",
          "Product liability is low for furniture but not zero — build solid, avoid wobbly chairs, document your process",
          "Children's items (toy boxes, cribs) have stricter safety standards — research before selling",
        ],
      },
      {
        type: "image",
        src: IMG.project,
        alt: "Quality outdoor woodworking project",
        caption: "Outdoor furniture sells best when joinery and finish hold up to weather.",
      },
      cta(
        "Includes woodworking business guide",
        "Lifetime plans plus a free guide on starting a home woodworking business — included with the full library.",
      ),
    ],
  },
];

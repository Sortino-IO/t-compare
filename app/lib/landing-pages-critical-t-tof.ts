import { CRITICAL_T_AFFILIATE_URL } from "./affiliate-links";
import { CRITICAL_T_IMAGES } from "./critical-t-images";
import type { LandingPageConfig } from "./landing-pages";
import { SUPPLEMENT_FACILITY_BULLET, SUPPLEMENT_FACILITY_FAQ } from "./lp-robots";

export const LANDING_PAGES_CRITICAL_T_TOF: LandingPageConfig[] = [
  {
    slug: "critical-t-lp3",
    variant: "lp2",
    lp2Style: "tof",
    brandName: "Critical T",
    productName: "Critical T",
    ctaUrl: CRITICAL_T_AFFILIATE_URL,
    seoTitle: "Critical T — Natural Testosterone Support | Limited Bundle Offer",
    seoDescription:
      "Critical T: Tongkat Ali, DIM & Acacetin daily stack. Support energy, drive & training recovery from ~$0.56/day on bulk. 60-day guarantee.",
    theme: {
      primary: "#0c2340",
      primaryDark: "#061220",
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
    urgencyHeadline: "LIMITED OFFER — BUY 1 GET 3 FREE ON 4-BOTTLE BUNDLE",
    heroHeadline:
      "The 100% Natural Testosterone Stack That Supercharges Focus, Energy & Drive — The Pharmaceutical Giants Hope You Never Find It",
    heroSubheadline:
      "Critical T combines Tongkat Ali, DIM, and Acacetin in one two-capsule morning ritual — built to support healthy T signaling and estrogen balance without needles, clinics, or $500/mo TRT bills.",
    heroBullets: [
      "From ~$0.56/day on the Best Value bundle — less than a coffee",
      "Two capsules each morning · no prescriptions · no clinic visits",
      "60-day money-back guarantee (even empty bottles, per vendor terms)",
      SUPPLEMENT_FACILITY_BULLET,
    ],
    hookParagraphs: [
      "If mornings feel heavier, gym sessions feel flat, and drive slipped somewhere after 35 — you're not imagining it. Free testosterone naturally declines with age, and most store-bought boosters never address estrogen balance.",
      "Critical Nutrition Labs built Critical T as a structured daily stack — not a random herb blend — so men who want a fair 60–90 day trial can test it on their body, not on marketing hype.",
    ],
    problemTitle: "What Happened To Men?",
    problemBullets: [
      "Energy drops. Drive fades. Performance dips. Then most men accept it as \"just aging.\"",
      "Single-ingredient boosters ignore estrogen — T can rise on paper while usable free T stays flat",
      "TRT costs $500–$1,000+/mo, requires needles, labs, and lifetime clinic management",
      "Cheap Amazon blends hide under-dosed proprietary mixes with zero accountability",
    ],
    solutionTitle: "Meet Critical T — The 3-Pillar Daily Stack",
    solutionParagraphs: [
      "Every morning, two capsules deliver Tongkat Ali for natural testosterone pathway support, DIM for liver-mediated estrogen metabolism, and Acacetin for aromatase balance framing competitors skip.",
      "No jittery stimulants. No synthetic hormones. Just consistent support for the pathways that matter when you want energy, drive, and recovery to show up together.",
    ],
    ingredientsTitle: "Inside Every Critical T Serving",
    ingredients: [
      {
        name: "Tongkat Ali",
        benefit:
          "Eurycoma longifolia extract — marketed to support luteinizing hormone signaling and natural testosterone pathways",
        image: CRITICAL_T_IMAGES.tongkatAli,
      },
      {
        name: "DIM",
        benefit:
          "Diindolylmethane — helps the liver convert excess estrogen into inactive forms so usable free T isn't fighting estrogen drag",
        image: CRITICAL_T_IMAGES.dim,
      },
      {
        name: "Acacetin",
        benefit:
          "From Turnera diffusa — positioned for aromatase-related balance support that single-ingredient boosters skip",
        image: CRITICAL_T_IMAGES.acacetin,
      },
    ],
    benefitsTitle: "Side Effects? Yes Please — The Kind You Actually Want",
    benefits: [
      "Clearer morning energy instead of hitting snooze three times",
      "Steadier drive and motivation through work and training",
      "Better gym output and recovery between sessions",
      "Libido and stamina as part of overall male vitality",
      "A simple 10-second ritual — no injections or clinic scheduling",
    ],
    testimonials: [
      {
        name: "Marcus T.",
        location: "Colorado, USA",
        avatarImage: "/lp/critical-t-face-2.png",
        quote:
          "I tried three Amazon boosters before Critical T. Week two is when I noticed more morning energy — I'm back to training four days a week without feeling wrecked the next day.",
        packageLabel: "90-day supply",
      },
      {
        name: "Daniel R.",
        location: "Florida, USA",
        avatarImage: "/lp/critical-t-face-1.png",
        quote:
          "Subscribe pricing made it a no-brainer to test. Sixty days in, my wife noticed before I did — more energy after work and I'm not crashing on the couch by 8pm.",
        packageLabel: "Subscribe & Save",
      },
      {
        name: "Kevin L.",
        location: "Ohio, USA",
        avatarImage: "/lp/critical-t-face-4.png",
        quote:
          "The bulk bundle math finally made sense. Lowest per-capsule cost on the 4-bottle tier — and the guarantee meant zero risk running the full trial.",
        packageLabel: "Best value bundle",
      },
      {
        name: "James P.",
        location: "Texas, USA",
        avatarImage: "/lp/critical-t-face-6.png",
        quote:
          "Two capsules with coffee every morning. No jitters, no afternoon crash — just steadier focus through long workdays and better sessions at the gym.",
        packageLabel: "Subscribe & Save",
      },
      {
        name: "Robert M.",
        location: "Arizona, USA",
        avatarImage: "/lp/critical-t-face-3.png",
        quote:
          "I was skeptical of another booster. Critical T's ingredient list is transparent — Tongkat, DIM, Acacetin with a clear role for each. That sold me more than the hype.",
        packageLabel: "90-day supply",
      },
      {
        name: "Chris W.",
        location: "Georgia, USA",
        avatarImage: "/lp/critical-t-face-8.png",
        quote:
          "Energy and drive improved gradually over the first month. By day 60 I felt like I had a fair read on whether it was working — and I ordered another bulk bundle.",
        packageLabel: "Best value bundle",
      },
      {
        name: "Brian H.",
        location: "Michigan, USA",
        avatarImage: "/lp/critical-t-face-5.png",
        quote:
          "TRT felt like overkill for where I was. Critical T gave me a structured OTC stack to test first — morning ritual, consistent dosing, no clinic visits.",
        packageLabel: "90-day supply",
      },
      {
        name: "Eric S.",
        location: "Washington, USA",
        avatarImage: "/lp/critical-t-face-7.png",
        quote:
          "Recovery between workouts improved noticeably. I'm 47 and finally pushing harder without negotiating with my alarm clock every morning.",
        packageLabel: "Subscribe & Save",
      },
    ],
    guaranteeTitle: "60-Day Critical T Money-Back Guarantee",
    guaranteeParagraphs: [
      "Try Critical T for a full 60 days. If you're not satisfied — for any reason — request a refund per vendor terms. Official copy states you can return even empty bottles.",
      "Test it on your schedule. Let your body answer the question over the next two months — not a marketing deadline.",
    ],
    packages: [
      {
        id: "starter",
        title: "Subscribe & Save",
        subtitle: "1 bottle · delivered monthly",
        funnelHeader: "STARTER",
        funnelSubheader: "Subscribe & Save (1 Bottle)",
        pricePerBottle: "$55.20",
        priceDisplay: "$55.20/month",
        total: "$55.20/mo",
        shipping: "Delivered Monthly — Cancel Anytime",
        priceSubline: "+ Shipping fee $5.99",
        bottleCount: 1,
        productImage: CRITICAL_T_IMAGES.package1,
        productImageAlt: "Critical T single bottle",
        ctaLabel: "ADD TO CART",
      },
      {
        id: "best",
        title: "Best Value",
        subtitle: "120-day supply · Buy 1 Get 3 Free",
        funnelHeader: "BEST VALUE!",
        funnelSubheader: "120-Day Supply (4 bottles) · Buy 1 Get 3 Free",
        pricePerBottle: "$16.75",
        priceDisplay: "$67",
        priceSubline: "$16.75/bottle",
        total: "$67",
        regularTotal: "$276",
        badge: "BIGGEST DISCOUNT",
        perkLines: ["BIGGEST DISCOUNT", "+ $7.99 SHIPPING FEE"],
        shipping: "+ $7.99 shipping fee",
        highlight: true,
        bottleCount: 4,
        productImage: CRITICAL_T_IMAGES.package4,
        productImageAlt: "Critical T — Buy 1 Get 3 Free",
        ctaLabel: "ADD TO CART",
      },
      {
        id: "popular",
        title: "Most Popular",
        subtitle: "90-day supply · 3 bottles",
        funnelHeader: "MOST POPULAR",
        funnelSubheader: "90-Day Supply (3 Bottles)",
        pricePerBottle: "$59",
        priceDisplay: "$177",
        priceSubline: "($59/bottle)",
        total: "$177",
        regularTotal: "$207",
        badge: "FREE US SHIPPING",
        perkLines: ["FAST & FREE SHIPPING"],
        shipping: "Fast & free US shipping",
        bottleCount: 3,
        productImage: CRITICAL_T_IMAGES.package3,
        productImageAlt: "Critical T 90-day supply — 3 bottles",
        ctaLabel: "ADD TO CART",
      },
    ],
    pricingFunnel: {
      layout: "supplement-funnel",
      columnOrder: ["starter", "best", "popular"],
      sectionTitle: "Claim Your Critical T Package — While Stock Lasts",
      highlightHeaderBg: "#f5b800",
      footerNote: "Secure SSL checkout · Official Critical T order page · 60-day guarantee",
    },
    timeline: [
      {
        milestone: "Day 1–7",
        title: "Early energy shifts",
        body: "Many men report waking easier and feeling less midday drag — subtle, but noticeable when you're paying attention.",
      },
      {
        milestone: "Day 14–30",
        title: "Training momentum",
        body: "Gym sessions feel more productive. Recovery between workouts often improves as daily consistency compounds.",
      },
      {
        milestone: "Day 60–90",
        title: "Full assessment window",
        body: "Official guidance recommends 60–90 days for a fair read on drive, stamina, and overall vitality markers.",
      },
      {
        milestone: "Month 3+",
        title: "Stack becomes routine",
        body: "Men who stay consistent often describe Critical T as part of their morning ritual — like coffee, but for hormonal support pathways.",
      },
    ],
    faq: [
      {
        q: "How do I take Critical T?",
        a: "Take two capsules once daily with water in the morning, with or without food — as directed on the official label.",
      },
      {
        q: "How long until I notice a difference?",
        a: "Some men report early shifts in energy within the first couple of weeks. Plan at least 60 days for a fair assessment of training, drive, and daily stamina.",
      },
      {
        q: "Is Critical T a prescription or TRT?",
        a: "No. It's an OTC dietary supplement supporting natural pathways — not exogenous testosterone, injections, or clinic-managed TRT.",
      },
      {
        q: "What if it doesn't work for me?",
        a: "You're covered by the 60-day money-back guarantee on the official checkout page. Review live terms at checkout for the latest return language.",
      },
      {
        q: "Why Tongkat Ali + DIM together?",
        a: "Tongkat Ali is marketed for natural testosterone signaling. DIM supports estrogen metabolism in the liver. Many single-ingredient boosters ignore the estrogen side of the equation.",
      },
      {
        q: "Where is Critical T manufactured?",
        a: SUPPLEMENT_FACILITY_FAQ,
      },
    ],
    finalCtaHeadline: "Don't Let Another Year Slide — Claim Critical T Now",
    productMeta: {
      heroSocialProof: "Join thousands of men already on Critical T",
      stickyCtaLabel: "Get Critical T Now →",
    },
    tof: {
      offerBadge: "BUY 1 GET 3 FREE — 4-BOTTLE BUNDLE",
      trustLine: "⭐ 4.9/5 verified buyers · GMP-certified facility · 60-day guarantee",
      pricePerDay: "~$0.56/day",
      heroKicker: "LIMITED TIME OFFER",
      heroPreheadline:
        "Critical T Is Arguably The Greatest Natural Testosterone Breakthrough Of Our Generation:",
      heroOfferLine: "Limited Time Offer: Buy 1 Get 3 Free on the 4-bottle bundle · 120-day supply",
      pillars: [
        {
          badge: "So Safe",
          title: "Made In A US GMP-Certified Facility — Zero Needles, Zero Prescriptions",
          body: "Critical T is manufactured in a US facility registered with the FDA for dietary supplements. Two capsules each morning — no clinic visits, no injections, no lifetime TRT contracts.",
        },
        {
          badge: "So Effective",
          title: "You Can Actually FEEL The Difference — Not Just Read About It",
          body: "Tongkat Ali, DIM, and Acacetin target testosterone signaling and estrogen balance together — the dual-pathway gap most boosters ignore. Thousands of men plan a 60–90 day runway for a fair read.",
        },
        {
          badge: "So Affordable",
          title: "It's JUST PENNIES A Day On The Best Value Bundle",
          body: "The 4-bottle Best Value tier breaks down to roughly $0.56 per day — a fraction of TRT monthly costs and less than stacking three separate boutique ingredients yourself.",
        },
      ],
      researchSectionTitle:
        "The Astonishing Testosterone Stack Thousands Of Grateful Men Are Testing Instead Of Random Boosters",
      researchQuote: {
        text: "Men searching for natural testosterone support often buy single-ingredient formulas that ignore estrogen metabolism. Critical T was built around the opposite idea: support natural T signaling and help process excess estrogen in the same daily stack — the same structure shown on the official Critical Nutrition Labs offer.",
        attribution: "— Men's supplement category analysis, T-Compare research desk",
      },
      testimonialsTitle:
        "Over Thousands Of Men Have Reclaimed Energy, Drive & Confidence Thanks To Critical T",
      testimonialsSubtitle:
        "Find out how men all over the world are ditching random Amazon boosters and $500/mo TRT bills — reclaiming their edge with a simple two-capsule morning ritual.",
      declineSection: {
        title: "What Happened To Men?!",
        statLine:
          "Studies show testosterone can decline roughly 1% per year after 30 — and over 40% of men over 45 report low energy, fading drive, and recovery that never quite bounces back.",
        paragraphs: [
          "The statistics are brutal. But they are not destiny.",
          "Most men slide. Energy drops. Drive fades. Performance dips. Then they accept it.",
          "That is how you become a statistic — negotiating with your alarm clock, skipping workouts, crashing on the couch by 8pm.",
          "Seventy-two hours ago this was just another supplement ad. Now it's a line in the sand. No lifetime prescriptions. No chemical crutches. No quiet surrender.",
        ],
        closingLines: [
          "Three named actives. One morning decision.",
          "You either drift into decline…",
          "or you fight back and take control.",
        ],
      },
      trustBadges: [
        { icon: "🇺🇸", label: "Made In The USA" },
        { icon: "🏭", label: "GMP-Certified Facility" },
        { icon: "🧪", label: "Third-Party Lab Tested" },
        { icon: "🌿", label: "Non-GMO · Zero Fillers" },
        { icon: "💊", label: "No Prescription Needed" },
        { icon: "🛡️", label: "60-Day Guarantee" },
      ],
      ctaPerkTriple: ["60-Day Money-Back Guarantee", "Buy 1 Get 3 Free", "Fast & Free US Shipping"],
      storyResultsTitle: "True Life-Changing Stories By The Men Who Lived Them",
      storyResultsIntro:
        "From flat energy and dead drive at 50, to training harder than they did at 35 — these are real reads men shared after giving Critical T a fair 60–90 day runway. (Verified purchaser feedback · results may vary.)",
      storyResults: [
        {
          title: "Anatomy Of A Reclaimed Morning Drive",
          mechanism:
            "Low free testosterone quietly drains the motivation, confidence, and physical readiness men used to take for granted — and most boosters never touch the estrogen side that keeps free T flat.",
          quote:
            "I hadn't felt 'switched on' in the morning for years — my wife and I had basically become roommates. I started Critical T in the spring. By the second or third week I noticed it: I was waking up with energy and actual drive again, not dragging myself out of bed. My focus at work sharpened too. It honestly feels like I got a part of myself back.",
          attribution: "— Jeroen V., 54, verified purchaser",
          image: "/lp/critical-t-story-1.png",
          imageAlt: "Mature man waking up energized and stretching at home — Critical T morning drive",
        },
        {
          title: "Cuts Through The Afternoon Crash Better Than Coffee",
          mechanism:
            "When energy pathways run on empty, 2 PM brain fog and the desperate sugar-or-caffeine hit become 'normal.' Supporting healthy T signaling and estrogen balance changes the baseline you operate from.",
          quote:
            "I started Critical T just hoping for a little energy. I didn't expect much. But within a month the midday crash that plagued me for a decade simply… faded. I'm training four days a week again, recovering faster, and I'm not negotiating with my alarm clock every morning. Two capsules with my coffee — that's the whole routine.",
          attribution: "— Anthony F., 46, verified purchaser",
          image: "/lp/critical-t-story-2.png",
          imageAlt: "Fit man in his 40s training with dumbbells at the gym — Critical T steady energy",
        },
        {
          title: "Unrelenting Motivation & Focus Returned",
          mechanism:
            "Low testosterone doesn't just hit your body — it dulls your mind. Brain fog, weak decision-making, and that constant 'flat' feeling all track with declining T and rising estrogen drag.",
          quote:
            "The modern world beats men down into a low-energy, low-drive version of themselves — and Critical T helped me feel the opposite. The effects built over the first 60 days. I work with more focus and intensity than I have in years, and I feel like I can take on challenges that used to quietly scare me. It's like a fire I thought had gone out came back.",
          attribution: "— Holden A., 41, verified purchaser",
          image: "/lp/critical-t-story-3.png",
          imageAlt: "Focused mature man working with sharp clarity at the office — Critical T motivation",
        },
      ],
      sideEffectsHeadline: "Side Effects? Yes Please!",
      sideEffectsSubhead: "Critical T ONLY delivers side effects you want",
      benefitBlocks: [
        {
          title: "Supercharged Drive — The spark isn't \"mood,\" it's hormonal fuel",
          paragraphs: [
            "Low libido isn't just in your head. It's often tied to the same pathways that control motivation, confidence, and physical readiness.",
            "Critical T's Tongkat Ali and Acacetin are positioned to support natural testosterone signaling — while DIM helps address estrogen drag that can leave usable free T flat even when total T looks fine on paper.",
          ],
          result:
            "The result: many men describe renewed appetite for training, work, and intimacy — not a jittery hour, but steadier drive that compounds over 60+ days.",
        },
        {
          title: "Testosterone Support — Your body's master switch, supported naturally",
          paragraphs: [
            "It's been happening so slowly you might not have noticed: the invisible tax eating away at morning energy, gym output, and mental edge.",
            "Critical T delivers structured daily support for the pathways that matter — without supplying exogenous testosterone or synthetic hormones.",
          ],
          result:
            "The result: surging vitality you can feel in the gym, at work, and at home — when you give the stack a fair 60–90 day trial window.",
        },
        {
          title: "Hyper Focus — The 2 PM crash doesn't have to be normal",
          paragraphs: [
            "Brain fog, heavy eyelids, desperate sugar or caffeine hits — that's what happens when energy pathways run on empty.",
            "Men who stay consistent on Critical T often describe cleaner morning energy and less midday drag — subtle at first, obvious by week two when you're paying attention.",
          ],
          result:
            "The result: calm, sustained focus from your first meeting through your evening workout — without stimulant jitters or an afternoon cliff.",
        },
      ],
      featuredStory: {
        title: "TRT May Be Overkill — Listen To What Men Report After 90 Days",
        intro:
          "In the past decade, clinic-managed TRT exploded — but it costs hundreds per month and requires needles, labs, and ongoing management. Many men want to test natural support first.",
        quote:
          "I started Critical T on a 90-day bulk bundle instead of jumping straight to clinic TRT. Sixty days in, morning energy was back, I was training four days again, and my wife noticed the difference before I did. My doctor said my numbers looked fine for my age — I didn't need to escalate to injections yet. Whatever you're doing, don't stop — but I'm glad I tested this stack first.",
        attribution: "— David K., 48, North Carolina (verified purchaser feedback · results may vary)",
      },
      visionTitle: "Critical T Is Your Secret Weapon To Reclaim The Edge",
      visionIntro:
        "It's a calibrated blend of Tongkat Ali, DIM, and Acacetin — designed to target the root causes men actually complain about: flat energy, fading drive, weak recovery, and boosters that never address estrogen.",
      visionBullets: [
        "Your energy soars — mornings feel possible again instead of negotiable",
        "Your confidence radiates — training, work, and home life stop feeling like separate battles",
        "Your recovery improves — harder sessions without feeling wrecked the next day",
        "Your drive returns — libido and stamina as part of overall vitality, not a side problem",
      ],
      visionClosing:
        "Don't settle for a slow decline and random herb blends. Critical T is structured support with transparent bundle math and a guarantee that lets you test it on your body.",
      ingredientDeepTitle: "Lab-Formulated, Research-Positioned Ingredients",
      ingredientDeepIntro:
        "Critical T is your daily stack to reclaim energy and confidence. Each ingredient has a clear role — no proprietary hide-the-dose games.",
      costStack: {
        title: "How Much Would It Cost To Match This Stack Yourself?",
        subtitle:
          "Buying boutique single-ingredient bottles separately — before you even address dosing synergy:",
        items: [
          { label: "Tongkat Ali extract (quality tier)", price: "$42" },
          { label: "DIM (diindolylmethane)", price: "$28" },
          { label: "Acacetin / Turnera diffusa blend", price: "$35" },
          { label: "Shipping × 3 orders", price: "$18" },
        ],
        stackTotal: "$123/mo",
        productTotal: "$67",
        productPerDay: "~$0.56/day",
        stackPerDay: "~$4.10/day",
      },
      compareTitle: "Critical T vs TRT vs Random Boosters",
      compareRows: [
        {
          label: "Addresses T + estrogen balance",
          criticalT: "✔ 3-pillar stack",
          trt: "✘ Exogenous T only",
          randomBooster: "✘ Usually T-only",
        },
        {
          label: "No needles or clinic visits",
          criticalT: "✔ 2 capsules daily",
          trt: "✘ Injections + labs",
          randomBooster: "✔ Pills",
        },
        {
          label: "Transparent ingredient names",
          criticalT: "✔ Tongkat · DIM · Acacetin",
          trt: "✔ Prescription",
          randomBooster: "✘ Proprietary blends",
        },
        {
          label: "Monthly cost (typical)",
          criticalT: "From ~$55/mo",
          trt: "$500–$1,000+",
          randomBooster: "$30–$80",
        },
        {
          label: "60-day money-back guarantee",
          criticalT: "✔ Per official terms",
          trt: "✘ Clinic contracts",
          randomBooster: "Sometimes",
        },
      ],
      guaranteeCards: [
        {
          title: "Increased Vitality Or Money Back",
          body: "If you're not happy after 60 days, request a refund per vendor terms — including empty bottles where applicable.",
        },
        {
          title: "60-Day Fair Trial Window",
          body: "Most men planning a real read on energy, drive, and gym recovery budget at least 60 days. The guarantee removes the financial downside.",
        },
        {
          title: "Hassle-Free Refunds",
          body: "Official checkout copy states you can test Critical T on your schedule. Review live terms at checkout for the latest return language.",
        },
      ],
      ctaStrip: {
        headline: "CLAIM BEST VALUE BUNDLE — BUY 1 GET 3 FREE",
        perks: ["60-Day Guarantee", "Biggest Discount", "Official Checkout"],
        buttonLabel: "GET CRITICAL T NOW →",
      },
    },
  },
];

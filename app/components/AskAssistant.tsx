"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef, type ReactNode } from "react";

// ── Types ─────────────────────────────────────────────────────────────────────
interface AnswerLink {
  label: string;
  href: string;
  /** Element id on the enclomiphene grid to scroll/highlight when already there. */
  scrollTo?: string;
}

interface QA {
  id: string;
  question: string;
  answer: string;
  links?: AnswerLink[];
}

interface Topic {
  id: string;
  label: string;
  blurb: string;
  icon: ReactNode;
  items: QA[];
}

const ENCLO_GRID = "/testosterone/enclomiphene";

// ── Icons ─────────────────────────────────────────────────────────────────────
function Icon({ path }: { path: ReactNode }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {path}
    </svg>
  );
}

// ── Topic + Q&A data ──────────────────────────────────────────────────────────
const TOPICS: Topic[] = [
  {
    id: "providers",
    label: "Enclomiphene providers",
    blurb: "Telehealth programs & pricing",
    icon: (
      <Icon
        path={
          <>
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z" />
          </>
        }
      />
    ),
    items: [
      {
        id: "cheapest",
        question: "Which provider has the lowest starting price?",
        answer:
          "Our enclomiphene grid is sorted low → high by published starting price, so the top row is always the lowest anchor in our dataset. Verify checkout totals — labs, promos, and plan length can change the real cost.",
        links: [
          { label: "Open provider grid", href: ENCLO_GRID, scrollTo: "lowest-price-provider" },
        ],
      },
      {
        id: "fastest",
        question: "Which program has the fastest onboarding?",
        answer:
          "Among the brands we list, TTime is tagged as a faster-start flow versus standard onboarding elsewhere. “Fast” still means a clinician review and eligibility rules apply.",
        links: [{ label: "See TTime", href: ENCLO_GRID, scrollTo: "card-ttime" }],
      },
      {
        id: "difference",
        question: "What actually differs between providers?",
        answer:
          "Expect differences in monthly anchors, plan-length framing (90-day vs multi-month), what's bundled (labs, messaging, shipping), and how care is delivered (async vs visits). Use the grid for orientation, then verify on each official site.",
        links: [{ label: "Compare providers", href: "/comparisons" }],
      },
      {
        id: "labs",
        question: "Do I need a consultation or labs?",
        answer:
          "Prescription programs require licensed clinician review, and many require baseline and follow-up labs. Exact requirements vary by provider, state, and clinical context — confirm before checkout.",
        links: [{ label: "Browse all providers", href: ENCLO_GRID }],
      },
    ],
  },
  {
    id: "supplements",
    label: "Testosterone supplements",
    blurb: "OTC boosters, value & formulas",
    icon: (
      <Icon
        path={
          <>
            <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" />
            <path d="m8.5 8.5 7 7" />
          </>
        }
      />
    ),
    items: [
      {
        id: "best-value",
        question: "Which testosterone supplement is the best value?",
        answer:
          "We list OTC boosters sorted by monthly cost, with bulk-bundle math and guarantee length so you compare true value — not just the headline single-bottle price.",
        links: [{ label: "Browse all supplements", href: "/t-supplements" }],
      },
      {
        id: "critical-t",
        question: "Is Critical T worth it?",
        answer:
          "Critical T is one of the most-searched testosterone supplements. Our independent review breaks down ingredients, dosing, price, and the refund window so you can decide.",
        links: [
          { label: "Read the Critical T review", href: "/blog/critical-t-review-2026" },
          { label: "Critical T page", href: "/t-supplements/critical-t" },
        ],
      },
      {
        id: "ingredients",
        question: "What ingredients actually matter?",
        answer:
          "Look for evidence-backed inputs like Tongkat Ali, fenugreek, DAA, zinc, and vitamin D — at meaningful doses. Our ingredient guides explain what each one does and the realistic expectations.",
        links: [
          { label: "Ingredients explained", href: "/blog/critical-t-ingredients-explained" },
          { label: "Best supplements 2026", href: "/blog/best-testosterone-supplements-2026" },
        ],
      },
      {
        id: "fda",
        question: "Are testosterone supplements FDA-approved?",
        answer:
          "No — OTC supplements are not FDA-approved to treat low testosterone. They're sold as dietary supplements. If you have symptoms or abnormal labs, talk to a clinician before relying on boosters.",
        links: [{ label: "Compare supplements", href: "/t-supplements/comparisons" }],
      },
    ],
  },
  {
    id: "comparisons",
    label: "Head-to-head comparisons",
    blurb: "Two brands, side by side",
    icon: (
      <Icon
        path={
          <>
            <path d="M3 6h7M3 12h7M3 18h7" />
            <path d="M14 6h7M14 12h7M14 18h7" />
          </>
        }
      />
    ),
    items: [
      {
        id: "enclo-compare",
        question: "Compare enclomiphene providers",
        answer:
          "Our pairwise comparisons line up two providers on price, labs, onboarding, and plan terms so the trade-offs are easy to see at a glance.",
        links: [
          { label: "All enclomiphene comparisons", href: "/comparisons" },
          { label: "TTime vs Hims", href: "/compare/hims-vs-ttime" },
        ],
      },
      {
        id: "supp-compare",
        question: "Compare testosterone supplements",
        answer:
          "Supplement funnels often hide the real cost behind multi-bottle bundles. These comparisons normalize price, guarantee length, and ingredients so you can pick the better value before checkout.",
        links: [
          { label: "All supplement comparisons", href: "/t-supplements/comparisons" },
          { label: "Critical T vs TestoPrime", href: "/t-supplements/compare/critical-t-vs-testoprime" },
        ],
      },
      {
        id: "trt",
        question: "How does this compare to TRT?",
        answer:
          "Enclomiphene and OTC boosters work differently from traditional testosterone replacement therapy (TRT). Our guide explains the trade-offs in mechanism, monitoring, and fertility.",
        links: [{ label: "Critical T vs TRT", href: "/blog/critical-t-vs-trt" }],
      },
    ],
  },
  {
    id: "guides",
    label: "Guides & blog",
    blurb: "Research-backed articles",
    icon: (
      <Icon
        path={
          <>
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
          </>
        }
      />
    ),
    items: [
      {
        id: "low-t-signs",
        question: "What are the signs of low testosterone?",
        answer:
          "Common signs include low energy, reduced libido, mood changes, and loss of muscle or motivation. Symptoms overlap with other conditions — labs and a clinician confirm low T.",
        links: [{ label: "Signs of low testosterone", href: "/blog/signs-of-low-testosterone" }],
      },
      {
        id: "natural",
        question: "Can I boost testosterone naturally?",
        answer:
          "Sleep, resistance training, body-fat management, and managing stress all influence testosterone. Our guide covers what the evidence supports before you reach for a supplement.",
        links: [
          { label: "Natural ways to boost T", href: "/blog/natural-ways-to-boost-testosterone" },
        ],
      },
      {
        id: "all-articles",
        question: "Show me all your articles",
        answer:
          "Our blog covers enclomiphene, testosterone supplements, ingredients, and lifestyle — written to answer the questions men actually search for.",
        links: [{ label: "Read all articles", href: "/blog" }],
      },
    ],
  },
];

// ── Scroll helper (enclomiphene grid only) ────────────────────────────────────
function scrollAndHighlight(slug: string) {
  const el = document.getElementById(slug);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "center" });
  el.classList.remove("card-highlight-pulse");
  void el.offsetWidth;
  el.classList.add("card-highlight-pulse");
  setTimeout(() => el.classList.remove("card-highlight-pulse"), 2200);
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function AskAssistant() {
  const pathname = usePathname();
  const onEnclomipheneGrid = pathname === ENCLO_GRID;

  const [open, setOpen] = useState(false);
  const [topic, setTopic] = useState<Topic | null>(null);
  const [selected, setSelected] = useState<QA | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  function reset() {
    setTopic(null);
    setSelected(null);
  }

  // Close on outside click / tap
  useEffect(() => {
    if (!open) return;
    function handleOutside(e: MouseEvent | TouchEvent) {
      const target = e.target as Node;
      const insidePanel = panelRef.current?.contains(target) ?? false;
      const insideButton = buttonRef.current?.contains(target) ?? false;
      if (!insidePanel && !insideButton) {
        setOpen(false);
        reset();
      }
    }
    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("touchstart", handleOutside, { passive: true });
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("touchstart", handleOutside);
    };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        reset();
      }
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  function handleToggle() {
    setOpen((v) => {
      if (v) reset();
      return !v;
    });
  }

  // Header back-button target depends on depth
  const headerBack = selected
    ? () => setSelected(null)
    : topic
      ? () => setTopic(null)
      : null;

  function renderLink(link: AnswerLink) {
    const canScroll = link.scrollTo && onEnclomipheneGrid && link.href === ENCLO_GRID;
    const className =
      "inline-flex items-center gap-1 rounded-lg bg-[#f0f7f3] border border-[#cfe6d8] px-3 py-2 text-xs font-semibold text-[#2a6e47] hover:bg-[#e3f1ea] transition-colors";
    const arrow = (
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
        <path d="M2.5 6h7M6.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );

    if (canScroll) {
      return (
        <button key={link.label} type="button" onClick={() => scrollAndHighlight(link.scrollTo!)} className={className}>
          {link.label}
          {arrow}
        </button>
      );
    }

    const href = link.scrollTo ? `${link.href}#${encodeURIComponent(link.scrollTo)}` : link.href;
    return (
      <Link key={link.label} href={href} className={className} onClick={() => { setOpen(false); reset(); }}>
        {link.label}
        {arrow}
      </Link>
    );
  }

  return (
    <>
      {open && (
        <div
          ref={panelRef}
          className="fixed bottom-[4.5rem] right-4 sm:right-6 z-50 w-80 sm:w-[22rem] max-w-[calc(100vw-2rem)] rounded-2xl bg-white border border-[#e3dfd6] shadow-2xl overflow-hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Ask T-Compare"
        >
          {/* Header */}
          <div className="flex items-center gap-2 px-4 py-3.5 border-b border-[#f0ece4]">
            {headerBack ? (
              <button
                onClick={headerBack}
                className="p-1 -ml-1 text-[#b5b0a8] hover:text-[#1c1917] transition-colors rounded-lg"
                aria-label="Back"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </button>
            ) : (
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#f0f7f3] text-[#2a6e47]">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </span>
            )}
            <span className="flex-1 font-[family-name:var(--font-playfair)] text-base font-semibold text-[#1c1917]">
              {selected ? "Answer" : topic ? topic.label : "Ask T-Compare"}
            </span>
            <button
              onClick={() => { setOpen(false); reset(); }}
              className="p-1.5 -mr-1 text-[#b5b0a8] hover:text-[#1c1917] transition-colors rounded-lg"
              aria-label="Close"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Body */}
          <div className="px-4 py-4 max-h-[60vh] overflow-y-auto">
            {/* LEVEL 2 — answer */}
            {selected ? (
              <div>
                <p className="text-[11px] font-semibold text-[#b5b0a8] uppercase tracking-[0.12em] mb-2">
                  {selected.question}
                </p>
                <p className="text-sm text-[#44403c] leading-relaxed">{selected.answer}</p>
                {selected.links && selected.links.length > 0 ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {selected.links.map(renderLink)}
                  </div>
                ) : null}
              </div>
            ) : topic ? (
              /* LEVEL 1 — questions for the chosen topic */
              <div>
                <p className="text-xs text-[#b5b0a8] mb-3">Pick a question:</p>
                <ul className="flex flex-col gap-2">
                  {topic.items.map((qa) => (
                    <li key={qa.id}>
                      <button
                        onClick={() => setSelected(qa)}
                        className="w-full text-left rounded-xl border border-[#e3dfd6] bg-[#faf9f7] px-4 py-3 text-sm text-[#44403c] hover:border-[#8fbc9e] hover:bg-[#f0f7f3] hover:text-[#1c1917] transition-all duration-150"
                      >
                        {qa.question}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              /* LEVEL 0 — topic picker */
              <div>
                <p className="text-sm text-[#57534e] mb-3 leading-relaxed">
                  What can we help you compare today?
                </p>
                <ul className="flex flex-col gap-2">
                  {TOPICS.map((t) => (
                    <li key={t.id}>
                      <button
                        onClick={() => setTopic(t)}
                        className="group flex w-full items-center gap-3 rounded-xl border border-[#e3dfd6] bg-[#faf9f7] px-4 py-3 text-left hover:border-[#8fbc9e] hover:bg-[#f0f7f3] transition-all duration-150"
                      >
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white border border-[#e3dfd6] text-[#2a6e47] group-hover:border-[#8fbc9e]">
                          {t.icon}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm font-semibold text-[#1c1917]">{t.label}</span>
                          <span className="block text-xs text-[#a8a29e]">{t.blurb}</span>
                        </span>
                        <svg width="14" height="14" viewBox="0 0 12 12" fill="none" aria-hidden="true" className="shrink-0 text-[#c8c2bb] group-hover:text-[#2a6e47]">
                          <path d="M2.5 6h7M6.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-4 py-3 border-t border-[#f0ece4] bg-[#faf9f7]">
            <p className="text-[11px] text-[#b5b0a8] leading-relaxed">
              Based on publicly available information. Not medical advice.
            </p>
          </div>
        </div>
      )}

      {/* Floating button */}
      <button
        ref={buttonRef}
        onClick={handleToggle}
        className="fixed bottom-5 right-4 sm:right-6 z-50 flex max-w-[calc(100vw-2rem)] items-center gap-1.5 rounded-full bg-[#2a6e47] px-3 py-2.5 sm:px-5 sm:py-3 text-[11px] sm:text-sm font-semibold text-white shadow-lg hover:bg-[#22593a] transition-colors"
        aria-expanded={open}
        aria-label="Ask T-Compare"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
        <span className="truncate">Ask T-Compare</span>
      </button>
    </>
  );
}

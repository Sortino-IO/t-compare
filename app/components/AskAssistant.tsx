"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";

interface QA {
  id: string;
  question: string;
  answer: string;
  scrollTo?: string;
}

const QA_LIST: QA[] = [
  {
    id: "cheapest",
    question: "Which provider has the lowest starting price?",
    answer:
      "On T-Compare’s enclomiphene comparison grid, providers are sorted low → high by published starting price. The top row is always the lowest anchor in our current dataset (verify checkout totals-labs, promos, and plan length can change the real cost).",
    scrollTo: "lowest-price-provider",
  },
  {
    id: "fastest",
    question: "Which program emphasizes the fastest onboarding?",
    answer:
      "Among brands we list, TTime is tagged as a faster-start flow versus standard onboarding elsewhere. “Fast” still means clinician review and eligibility rules apply-open the provider listing for specifics.",
    scrollTo: "card-ttime",
  },
  {
    id: "difference",
    question: "What actually differs between these providers?",
    answer:
      "Expect differences in published monthly anchors, plan length framing (e.g., 90‑day vs multi‑month commitments), what’s bundled (labs, messaging, shipping), and how care is delivered (async vs visits). Use the grid for orientation, then verify on each provider’s official site.",
  },
  {
    id: "consultation",
    question: "Do I need a consultation or labs?",
    answer:
      "Prescription programs require licensed clinician review; many also require baseline and follow‑up labs. Exact requirements vary by provider, state, and clinical context-confirm what you must complete before checkout.",
  },
  {
    id: "after-signup",
    question: "What happens after I start a program?",
    answer:
      "Generally: intake → clinician decision → fulfillment/refills on an approved plan, with monitoring per program rules. Exact steps differ by brand; use each provider’s FAQ and checkout disclosures.",
  },
];

function scrollAndHighlight(slug: string) {
  const el = document.getElementById(slug);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "center" });
  el.classList.remove("card-highlight-pulse");
  void el.offsetWidth;
  el.classList.add("card-highlight-pulse");
  setTimeout(() => el.classList.remove("card-highlight-pulse"), 2200);
}

export default function AskAssistant() {
  const pathname = usePathname();
  const onEnclomipheneGrid = pathname === "/testosterone/enclomiphene";
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<QA | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close on outside click / tap - only active when open
  useEffect(() => {
    if (!open) return;

    function handleOutside(e: MouseEvent | TouchEvent) {
      const target = e.target as Node;
      const insidePanel = panelRef.current?.contains(target) ?? false;
      const insideButton = buttonRef.current?.contains(target) ?? false;
      if (!insidePanel && !insideButton) {
        setOpen(false);
        setSelected(null);
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
        setSelected(null);
      }
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  function handleToggle() {
    setOpen((v) => {
      if (v) setSelected(null);
      return !v;
    });
  }

  function handleSelect(qa: QA) {
    setSelected(qa);
    if (qa.scrollTo) {
      setTimeout(() => scrollAndHighlight(qa.scrollTo!), 250);
    }
  }

  return (
    <>
      {/*
        PANEL - only mounted in the DOM when open.
        When closed it does not exist at all, so it cannot
        intercept any touch or pointer events.
      */}
      {open && (
        <div
          ref={panelRef}
          className="fixed bottom-[4.5rem] right-4 sm:right-6 z-50 w-72 sm:w-80 max-w-[calc(100vw-2rem)] rounded-2xl bg-white border border-[#e3dfd6] shadow-2xl overflow-hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Ask T-Compare"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#f0ece4]">
            <span className="font-[family-name:var(--font-playfair)] text-base font-semibold text-[#1c1917]">
              Ask T-Compare
            </span>
            <button
              onClick={() => { setOpen(false); setSelected(null); }}
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
          <div className="px-5 py-4">
            {selected ? (
              <div>
                <button
                  onClick={() => setSelected(null)}
                  className="flex items-center gap-1.5 text-xs text-[#b5b0a8] hover:text-[#1c1917] transition-colors mb-4 py-1 -my-1"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M9.5 6H2.5M5.5 3L2.5 6l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  All questions
                </button>
                <p className="text-[11px] font-semibold text-[#b5b0a8] uppercase tracking-[0.12em] mb-2">
                  {selected.question}
                </p>
                <p className="text-sm text-[#44403c] leading-relaxed">
                  {selected.answer}
                </p>
                {selected.scrollTo && onEnclomipheneGrid ? (
                  <button
                    type="button"
                    onClick={() => scrollAndHighlight(selected.scrollTo!)}
                    className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#2a6e47] hover:text-[#22593a] transition-colors py-1"
                  >
                    Show on page
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                      <path d="M2.5 6h7M6.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                ) : selected.scrollTo ? (
                  <Link
                    href={`/testosterone/enclomiphene#${encodeURIComponent(selected.scrollTo)}`}
                    className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#2a6e47] hover:text-[#22593a] transition-colors py-1"
                  >
                    Open comparison & jump to card
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                      <path d="M2.5 6h7M6.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Link>
                ) : null}
              </div>
            ) : (
              <div>
                <p className="text-xs text-[#b5b0a8] mb-3">Select a question:</p>
                <ul className="flex flex-col gap-2">
                  {QA_LIST.map((qa) => (
                    <li key={qa.id}>
                      <button
                        onClick={() => handleSelect(qa)}
                        className="w-full text-left rounded-xl border border-[#e3dfd6] bg-[#faf9f7] px-4 py-3 text-sm text-[#44403c] hover:border-[#8fbc9e] hover:bg-[#f0f7f3] hover:text-[#1c1917] transition-all duration-150"
                      >
                        {qa.question}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-5 py-3 border-t border-[#f0ece4] bg-[#faf9f7] space-y-2">
            <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] font-medium">
              <Link href="/testosterone/enclomiphene" className="text-[#2a6e47] hover:underline">
                Provider grid
              </Link>
              <Link href="/comparisons" className="text-[#2a6e47] hover:underline">
                Pairwise comparisons
              </Link>
              <Link href="/blog" className="text-[#2a6e47] hover:underline">
                Blog
              </Link>
            </div>
            <p className="text-[11px] text-[#b5b0a8] leading-relaxed">
              Based on publicly available information. Not medical advice.
            </p>
          </div>
        </div>
      )}

      {/*
        BUTTON - independent fixed element, always present.
        Has no shared container with the panel, so its DOM
        footprint never exceeds the visible button area.
      */}
      <button
        ref={buttonRef}
        onClick={handleToggle}
        className="fixed bottom-5 right-4 sm:right-6 z-50 flex max-w-[calc(100vw-2rem)] items-center gap-1.5 rounded-full bg-[#2a6e47] px-3 py-2.5 sm:px-5 sm:py-3 text-[11px] sm:text-sm font-semibold text-white shadow-lg hover:bg-[#22593a] transition-colors"
        aria-expanded={open}
        aria-label="Ask T-Compare"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
        <span className="truncate">Ask T-Compare</span>
      </button>
    </>
  );
}

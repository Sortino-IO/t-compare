"use client";

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
    question: "Which is the cheapest?",
    answer: "TTime currently shows the lowest starting price on this page.",
    scrollTo: "card-ttime",
  },
  {
    id: "fastest",
    question: "Which starts fastest?",
    answer: "TTime is presented as the quicker-start option on this page.",
    scrollTo: "card-ttime",
  },
  {
    id: "difference",
    question: "What's the difference between providers?",
    answer:
      "Providers differ mainly in starting price, onboarding style, and how their programs are presented.",
  },
  {
    id: "consultation",
    question: "Do I need a consultation?",
    answer:
      "Program details are typically determined after provider review or consultation. Verify specifics directly with each provider.",
  },
  {
    id: "after-signup",
    question: "What happens after I sign up?",
    answer:
      "The next steps usually include provider review, eligibility confirmation, and program-specific follow-up. Check each provider page for details.",
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
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<QA | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close on outside click / tap — only active when open
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
        PANEL — only mounted in the DOM when open.
        When closed it does not exist at all, so it cannot
        intercept any touch or pointer events.
      */}
      {open && (
        <div
          ref={panelRef}
          className="fixed bottom-[4.5rem] right-4 sm:right-6 z-50 w-72 sm:w-80 max-w-[calc(100vw-2rem)] rounded-2xl bg-white border border-[#e3dfd6] shadow-2xl overflow-hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Ask CompareT"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#f0ece4]">
            <span className="font-[family-name:var(--font-playfair)] text-base font-semibold text-[#1c1917]">
              Ask CompareT
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
                {selected.scrollTo && (
                  <button
                    onClick={() => scrollAndHighlight(selected.scrollTo!)}
                    className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#2a6e47] hover:text-[#22593a] transition-colors py-1"
                  >
                    Show on page
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                      <path d="M2.5 6h7M6.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                )}
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
          <div className="px-5 py-3 border-t border-[#f0ece4] bg-[#faf9f7]">
            <p className="text-[11px] text-[#b5b0a8] leading-relaxed">
              Based on publicly available information. Not medical advice.
            </p>
          </div>
        </div>
      )}

      {/*
        BUTTON — independent fixed element, always present.
        Has no shared container with the panel, so its DOM
        footprint never exceeds the visible button area.
      */}
      <button
        ref={buttonRef}
        onClick={handleToggle}
        className="fixed bottom-5 right-4 sm:right-6 z-50 flex items-center gap-1.5 rounded-full bg-[#2a6e47] px-3 py-2.5 sm:px-5 sm:py-3 text-xs sm:text-sm font-semibold text-white shadow-lg hover:bg-[#22593a] transition-colors"
        aria-expanded={open}
        aria-label="Ask CompareT"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
        <span className="hidden sm:inline">Ask CompareT</span>
        <span className="sm:hidden">Ask</span>
      </button>
    </>
  );
}

"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";

export type SelectOption = {
  value: string;
  label: string;
  /** Right-aligned secondary text, e.g. a price. */
  meta?: string;
};

type Props = {
  id?: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  className?: string;
  "aria-labelledby"?: string;
};

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={`shrink-0 text-[#5f757f] transition-transform ${open ? "rotate-180" : ""}`}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

/**
 * Site-styled replacement for <select>. The native popup is drawn by the OS
 * and cannot be themed, so it looked detached from the rest of the design.
 */
export default function Select({
  id,
  value,
  options,
  onChange,
  className = "",
  "aria-labelledby": labelledBy,
}: Props) {
  const autoId = useId();
  const buttonId = id ?? `select-${autoId}`;
  const listId = `${buttonId}-list`;
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const selectedIndex = Math.max(
    0,
    options.findIndex((o) => o.value === value),
  );
  const selected = options[selectedIndex];

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    listRef.current
      ?.querySelector<HTMLElement>(`[data-index="${active}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [open, active]);

  const openList = () => {
    setActive(selectedIndex);
    setOpen(true);
  };

  const choose = (index: number) => {
    const opt = options[index];
    if (opt) onChange(opt.value);
    setOpen(false);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    const last = options.length - 1;
    if (!open) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
        e.preventDefault();
        openList();
      }
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(last, i + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(0, i - 1));
    } else if (e.key === "Home") {
      e.preventDefault();
      setActive(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setActive(last);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      choose(active);
    } else if (e.key === "Escape" || e.key === "Tab") {
      setOpen(false);
    }
  };

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        id={buttonId}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-labelledby={labelledBy ? `${labelledBy} ${buttonId}` : undefined}
        aria-activedescendant={open ? `${listId}-${active}` : undefined}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={onKeyDown}
        className={`flex w-full items-center gap-3 rounded-lg border bg-white px-3 py-2.5 text-left text-sm text-[#142b3a] transition-colors hover:border-[#176b87] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#176b87]/20 ${
          open ? "border-[#176b87] ring-2 ring-[#176b87]/15" : "border-[#949494]"
        }`}
      >
        <span className="min-w-0 flex-1 truncate font-medium">{selected?.label}</span>
        {selected?.meta ? (
          <span className="shrink-0 tabular-nums text-[#53666e]">{selected.meta}</span>
        ) : null}
        <Chevron open={open} />
      </button>

      {open ? (
        <ul
          ref={listRef}
          id={listId}
          role="listbox"
          aria-labelledby={labelledBy}
          className="absolute left-0 right-0 top-full z-30 mt-1.5 max-h-80 overflow-auto rounded-lg border border-[#e3e3e3] bg-white p-1 shadow-[0_12px_32px_-12px_rgba(20,43,58,0.25)]"
        >
          {options.map((o, i) => {
            const isSelected = o.value === value;
            return (
              <li
                key={o.value}
                id={`${listId}-${i}`}
                data-index={i}
                role="option"
                aria-selected={isSelected}
                onMouseEnter={() => setActive(i)}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => choose(i)}
                className={`flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-sm ${
                  i === active ? "bg-[#eef6f9]" : ""
                } ${isSelected ? "font-semibold text-[#176b87]" : "text-[#142b3a]"}`}
              >
                <span className="min-w-0 flex-1 truncate">{o.label}</span>
                {o.meta ? (
                  <span className="shrink-0 tabular-nums text-[#53666e]">{o.meta}</span>
                ) : null}
                <span aria-hidden className="w-3 shrink-0 text-[#176b87]">
                  {isSelected ? "✓" : ""}
                </span>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}

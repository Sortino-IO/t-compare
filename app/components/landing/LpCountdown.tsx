"use client";

import { useEffect, useState } from "react";

type Props = {
  minutes?: number;
  className?: string;
  label?: string;
  variant?: "light" | "dark" | "urgent";
};

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function LpCountdown({
  minutes = 47,
  className = "",
  label = "Promotional pricing resets in:",
  variant = "dark",
}: Props) {
  const [secondsLeft, setSecondsLeft] = useState(minutes * 60);

  useEffect(() => {
    const id = window.setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : minutes * 60));
    }, 1000);
    return () => window.clearInterval(id);
  }, [minutes]);

  const h = Math.floor(secondsLeft / 3600);
  const m = Math.floor((secondsLeft % 3600) / 60);
  const s = secondsLeft % 60;

  const boxClass =
    variant === "urgent"
      ? "bg-[#c0392b] text-white border-[#922b21]"
      : variant === "light"
        ? "bg-white/15 text-white border-white/30 backdrop-blur-sm"
        : "bg-[#1a1a1a] text-white border-[#333]";

  return (
    <div className={`rounded-xl border-2 px-4 py-4 sm:px-6 sm:py-5 ${boxClass} ${className}`}>
      <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-center mb-3">{label}</p>
      <div className="flex items-center justify-center gap-3 sm:gap-5">
        {[
          { value: pad(h), unit: "Hours" },
          { value: pad(m), unit: "Minutes" },
          { value: pad(s), unit: "Seconds" },
        ].map(({ value, unit }) => (
          <div key={unit} className="flex flex-col items-center min-w-[64px] sm:min-w-[80px]">
            <span className="text-3xl sm:text-5xl font-black tabular-nums leading-none">{value}</span>
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wide mt-1.5 opacity-90">
              {unit}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

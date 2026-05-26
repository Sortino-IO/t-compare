"use client";

import { useEffect, useState } from "react";

type Props = {
  minutes?: number;
  className?: string;
  label?: string;
};

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function LpCountdown({
  minutes = 47,
  className = "",
  label = "Promotional pricing resets in:",
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

  return (
    <div className={className}>
      <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider opacity-90 mb-2 text-center">
        {label}
      </p>
      <div className="flex items-center justify-center gap-2 sm:gap-3">
        {[
          { value: pad(h), unit: "Hours" },
          { value: pad(m), unit: "Minutes" },
          { value: pad(s), unit: "Seconds" },
        ].map(({ value, unit }) => (
          <div key={unit} className="flex flex-col items-center min-w-[56px] sm:min-w-[68px]">
            <span className="text-2xl sm:text-3xl font-bold tabular-nums leading-none">{value}</span>
            <span className="text-[10px] sm:text-xs uppercase tracking-wide mt-1 opacity-80">{unit}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

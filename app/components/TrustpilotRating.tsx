import type { TrustpilotSnapshot } from "../lib/brands";

function Star({ fill }: { fill: number }) {
  const pct = Math.round(Math.max(0, Math.min(1, fill)) * 100);
  return (
    <span className="relative inline-block h-3.5 w-3.5" aria-hidden>
      <span className="absolute inset-0 rounded-[2px] bg-[#dcdce6]" />
      <span className="absolute inset-y-0 left-0 rounded-[2px] bg-[#00b67a]" style={{ width: `${pct}%` }} />
      <svg viewBox="0 0 24 24" className="absolute inset-0 h-full w-full p-[1px]" fill="#fff">
        <path d="M12 2.5l2.9 6.6 7.1.6-5.4 4.7 1.6 7-6.2-3.7-6.2 3.7 1.6-7L2 9.7l7.1-.6z" />
      </svg>
    </span>
  );
}

function monthYear(iso: string): string {
  const d = new Date(`${iso}T12:00:00Z`);
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" });
}

/** Third-party rating shown as-is with its source and check date; never marked up as our own rating. */
export default function TrustpilotRating({
  rating,
  className = "",
}: {
  rating: TrustpilotSnapshot;
  className?: string;
}) {
  return (
    <a
      href={rating.url}
      target="_blank"
      rel="nofollow noopener noreferrer"
      className={`inline-flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#3c535e] hover:underline ${className}`}
      aria-label={`Rated ${rating.score} out of 5 on Trustpilot from ${rating.reviews.toLocaleString("en-US")} reviews, checked ${monthYear(rating.checkedOn)}`}
    >
      <span className="inline-flex gap-[2px]">
        {[0, 1, 2, 3, 4].map((i) => (
          <Star key={i} fill={rating.score - i} />
        ))}
      </span>
      <span>
        <span className="font-semibold text-[#142b3a]">{rating.score.toFixed(1)}</span> on Trustpilot
        {" · "}
        {rating.reviews.toLocaleString("en-US")} reviews
        <span className="text-[#5f757f]"> (checked {monthYear(rating.checkedOn)})</span>
      </span>
    </a>
  );
}

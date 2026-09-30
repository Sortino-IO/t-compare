import type { Brand } from "./brands";

/**
 * Two-letter monogram used as a brand mark on cards and tables.
 *
 * The repository ships no provider or supplement logo files, so rather than
 * sourcing third-party marks we render initials from the brand name. Purely
 * decorative — the full name is always displayed alongside it.
 */
export function brandMonogram(name: string): string {
  const words = name.split(/[\s+]+/).filter(Boolean);
  if (words.length >= 2) {
    return `${words[0]![0]}${words[1]![0]}`.toUpperCase();
  }
  const word = words[0] ?? name;
  const secondCap = word.slice(1).match(/[A-Z]/);
  if (secondCap) return `${word[0]}${secondCap[0]}`.toUpperCase();
  return word.slice(0, 2).toUpperCase();
}

/** Specific internal action wording, e.g. "Review TTime". */
export function reviewCtaLabel(brand: Brand): string {
  return brand.category === "supplement"
    ? `See ${brand.name} pricing`
    : `Review ${brand.name}`;
}

/** Specific external action wording for the merchant destination. */
export function merchantCtaLabel(brand: Brand): string {
  return brand.category === "supplement"
    ? "Check current price"
    : "Check pricing & eligibility";
}

export function formatReviewedDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      timeZone: "UTC",
    });
  } catch {
    return iso;
  }
}

/** The most recent `lastReviewed` value across a set of brands. */
export function latestReviewedDate(brands: Brand[]): string | null {
  const times = brands
    .map((b) => new Date(b.lastReviewed).getTime())
    .filter((t) => Number.isFinite(t));
  if (times.length === 0) return null;
  return new Date(Math.max(...times)).toISOString().slice(0, 10);
}

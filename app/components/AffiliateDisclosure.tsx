import Link from "next/link";

/**
 * Concise commercial disclosure shown next to the first merchant CTA on a page.
 * Wording mirrors the site-wide language on /disclaimer and /about: some links
 * are affiliate links, and they do not change the reader's price.
 */
export default function AffiliateDisclosure({
  className = "",
}: {
  className?: string;
}) {
  return (
    <p
      className={`text-xs leading-relaxed text-[#53666e] ${className}`.trim()}
    >
      We may be paid a commission if you sign up through our links. Your price
      is the same either way.{" "}
      <Link
        href="/disclaimer"
        className="font-medium text-[#176b87] underline decoration-[#176b87]/30 underline-offset-2 hover:text-[#10556d]"
      >
        How we work
      </Link>
      .
    </p>
  );
}

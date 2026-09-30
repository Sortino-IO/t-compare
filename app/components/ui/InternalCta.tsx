import Link from "next/link";

type Props = {
  href: string;
  children: React.ReactNode;
  /** Outlined button for prominent internal actions; `link` for inline navigation. */
  variant?: "outline" | "link";
  size?: "md" | "sm";
  fullWidth?: boolean;
  className?: string;
};

/**
 * Internal T-Compare navigation. Deliberately outlined (never filled blue) so a
 * reader can tell at a glance which actions stay on-site.
 */
export default function InternalCta({
  href,
  children,
  variant = "outline",
  size = "md",
  fullWidth = false,
  className = "",
}: Props) {
  const base =
    variant === "link"
      ? "inline-flex items-center gap-1.5 text-sm font-semibold text-[#176b87] hover:text-[#10556d] hover:underline underline-offset-2"
      : `tc-btn tc-btn-secondary ${size === "sm" ? "tc-btn-sm" : ""} ${
          fullWidth ? "w-full" : ""
        }`;

  return (
    <Link href={href} className={`${base} ${className}`.trim()}>
      {children}
      <span aria-hidden>→</span>
    </Link>
  );
}

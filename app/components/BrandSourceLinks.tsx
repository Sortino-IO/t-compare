import type { Brand } from "../lib/brands";
import { getBrandSourceLinks } from "../lib/brand-source-links";

type Props = {
  brand: Brand;
  className?: string;
  linkClassName?: string;
};

export default function BrandSourceLinks({
  brand,
  className = "mt-2 space-y-1.5 text-sm text-[#57534e]",
  linkClassName = "text-[#2a6e47] hover:underline font-medium",
}: Props) {
  const links = getBrandSourceLinks(brand);

  return (
    <ul className={className}>
      {links.map((link) => (
        <li key={link.href}>
          <a
            className={linkClassName}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

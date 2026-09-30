import type { Brand } from "../lib/brands";
import { getBrandSourceLinks } from "../lib/brand-source-links";
import ExternalTextLink from "./ui/ExternalTextLink";

type Props = {
  brand: Brand;
  className?: string;
  linkClassName?: string;
};

export default function BrandSourceLinks({
  brand,
  className = "mt-2 space-y-1.5 text-sm text-[#53666e]",
  linkClassName = "text-[#176b87] hover:underline font-medium",
}: Props) {
  const links = getBrandSourceLinks(brand);

  return (
    <ul className={className}>
      {links.map((link) => (
        <li key={link.href}>
          <ExternalTextLink className={linkClassName} href={link.href}>
            {link.label}
          </ExternalTextLink>
        </li>
      ))}
    </ul>
  );
}

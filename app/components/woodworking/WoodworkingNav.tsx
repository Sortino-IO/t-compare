"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { WOODWORKING_NAV } from "../../lib/woodworking";

export default function WoodworkingNav() {
  const pathname = usePathname();

  return (
    <nav className="border-b border-[#e7dcc8] bg-[#faf7f2]">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-1 gap-y-2 px-4 py-3 sm:px-6">
        {WOODWORKING_NAV.map((item) => {
          const active =
            item.href === "/lp/woodworking"
              ? pathname === "/lp/woodworking"
              : pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-md px-3 py-1.5 text-sm font-semibold transition-colors ${
                active
                  ? "bg-[#4a3728] text-white"
                  : "text-[#78716c] hover:bg-[#ede5d8] hover:text-[#292524]"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
        <Link
          href="/lp/woodworking#all-guides"
          className={`ml-auto rounded-md px-3 py-1.5 text-sm font-semibold transition-colors ${
            pathname.startsWith("/lp/woodworking/") && pathname !== "/lp/woodworking"
              ? "text-[#92400e] underline underline-offset-2"
              : "text-[#92400e] hover:bg-[#ede5d8]"
          }`}
        >
          All guides →
        </Link>
      </div>
    </nav>
  );
}

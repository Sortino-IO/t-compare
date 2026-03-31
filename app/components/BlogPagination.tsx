import Link from "next/link";

type Props = {
  currentPage: number;
  totalPages: number;
};

export default function BlogPagination({ currentPage, totalPages }: Props) {
  if (totalPages <= 1) return null;

  const prevHref = currentPage <= 2 ? "/blog" : `/blog?page=${currentPage - 1}`;
  const nextHref = `/blog?page=${currentPage + 1}`;

  return (
    <nav
      className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-between"
      aria-label="Blog pagination"
    >
      <div className="flex flex-wrap items-center justify-center gap-2">
        {Array.from({ length: totalPages }, (_, idx) => {
          const n = idx + 1;
          const href = n === 1 ? "/blog" : `/blog?page=${n}`;
          const isActive = n === currentPage;
          return (
            <Link
              key={n}
              href={href}
              className={`flex min-h-10 min-w-10 items-center justify-center rounded-lg px-3 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-[#2a6e47] text-white"
                  : "border border-[#e3dfd6] bg-white text-[#78716c] hover:border-[#2a6e47]/40 hover:text-[#1c1917]"
              }`}
              aria-current={isActive ? "page" : undefined}
            >
              {n}
            </Link>
          );
        })}
      </div>

      <div className="flex items-center gap-3">
        <Link
          href={prevHref}
          className={`rounded-lg border border-[#e3dfd6] bg-white px-4 py-2 text-sm font-medium transition-colors ${
            currentPage <= 1
              ? "pointer-events-none opacity-40"
              : "text-[#78716c] hover:border-[#2a6e47]/40 hover:text-[#1c1917]"
          }`}
          aria-disabled={currentPage <= 1}
          tabIndex={currentPage <= 1 ? -1 : undefined}
        >
          Previous
        </Link>
        <Link
          href={nextHref}
          className={`rounded-lg border border-[#e3dfd6] bg-white px-4 py-2 text-sm font-medium transition-colors ${
            currentPage >= totalPages
              ? "pointer-events-none opacity-40"
              : "text-[#78716c] hover:border-[#2a6e47]/40 hover:text-[#1c1917]"
          }`}
          aria-disabled={currentPage >= totalPages}
          tabIndex={currentPage >= totalPages ? -1 : undefined}
        >
          Next
        </Link>
      </div>
    </nav>
  );
}

import type { Metadata } from "next";
import HomeLanding from "../../components/HomeLanding";

// Temporary preview of the redesigned homepage.
// Kept out of the sitemap (app/internal/* is skipped) and explicitly noindex.
// Delete this folder once the design is approved and applied to app/page.tsx.
export const metadata: Metadata = {
  title: "Home preview (internal)",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function HomePreviewPage() {
  return (
    <>
      <div className="bg-[#fff7ed] border-b border-[#fed7aa]">
        <p className="mx-auto max-w-5xl px-6 py-2 text-center text-xs font-medium text-[#9a3412]">
          Internal preview — not indexed. This is a draft of the new homepage.
        </p>
      </div>
      <HomeLanding />
    </>
  );
}

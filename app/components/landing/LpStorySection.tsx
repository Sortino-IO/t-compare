import Image from "next/image";
import type { LandingPageConfig } from "../../lib/landing-pages";

type Props = {
  section: NonNullable<LandingPageConfig["storySection"]>;
  theme: LandingPageConfig["theme"];
};

export default function LpStorySection({ section, theme }: Props) {
  return (
    <section className="px-4 sm:px-6 py-12 sm:py-16 bg-[#e8f4fc]">
      <div className="mx-auto max-w-4xl">
        <h2
          className="text-2xl sm:text-4xl font-black text-center mb-8 sm:mb-10"
          style={{ color: theme.primary }}
        >
          {section.title}
        </h2>

        {section.introParagraphs?.map((p) => (
          <p
            key={p.slice(0, 48)}
            className="text-base sm:text-lg leading-relaxed mb-5 text-center sm:text-left"
            style={{ color: theme.text }}
          >
            {p}
          </p>
        ))}

        <div className="space-y-10 sm:space-y-14 mt-8">
          {section.blocks.map((block) => {
            const imageFirst = block.imagePosition === "left";
            const figure = (
              <div className="relative aspect-[4/3] sm:aspect-[16/11] rounded-xl overflow-hidden shadow-lg border-2 border-white">
                <Image src={block.image} alt={block.imageAlt} fill className="object-cover" sizes="(max-width:768px) 100vw, 480px" />
              </div>
            );
            const copy = (
              <div className="space-y-4 text-base sm:text-[1.05rem] leading-relaxed" style={{ color: theme.muted }}>
                {block.paragraphs.map((p) => (
                  <p key={p.slice(0, 48)}>{p}</p>
                ))}
              </div>
            );

            return (
              <div
                key={block.image}
                className="grid md:grid-cols-2 gap-6 sm:gap-10 items-center"
              >
                {imageFirst ? (
                  <>
                    {figure}
                    {copy}
                  </>
                ) : (
                  <>
                    {copy}
                    {figure}
                  </>
                )}
              </div>
            );
          })}
        </div>

        {section.footerParagraph ? (
          <p
            className="mt-10 text-base sm:text-lg leading-relaxed text-center font-semibold"
            style={{ color: theme.primary }}
          >
            {section.footerParagraph}
          </p>
        ) : null}
      </div>
    </section>
  );
}

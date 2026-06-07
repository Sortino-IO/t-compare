"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import LpStars from "./LpStars";

export type CarouselTestimonial = {
  name: string;
  location: string;
  quote: string;
  packageLabel?: string;
  avatarUrl: string;
};

type Props = {
  testimonials: CarouselTestimonial[];
  accentColor?: string;
  cardBg?: string;
  mutedColor?: string;
};

function TestimonialCard({
  t,
  accentColor,
  cardBg,
  mutedColor,
}: {
  t: CarouselTestimonial;
  accentColor: string;
  cardBg: string;
  mutedColor: string;
}) {
  return (
    <blockquote
      className="h-full rounded-2xl border border-zinc-800 p-5 sm:p-6 flex flex-col"
      style={{ backgroundColor: cardBg }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="relative h-12 w-12 rounded-full overflow-hidden shrink-0 border-2" style={{ borderColor: accentColor }}>
          <Image src={t.avatarUrl} alt={t.name} fill className="object-cover" sizes="48px" />
        </div>
        <div className="min-w-0">
          <p className="font-bold text-sm truncate">{t.name}</p>
          <p className="text-xs truncate" style={{ color: mutedColor }}>
            {t.location}
          </p>
        </div>
      </div>
      <LpStars />
      <p className="mt-3 text-sm leading-relaxed text-zinc-300 flex-1">&ldquo;{t.quote}&rdquo;</p>
      {t.packageLabel ? (
        <p className="text-[10px] font-bold uppercase mt-3 text-zinc-500">{t.packageLabel}</p>
      ) : null}
    </blockquote>
  );
}

export default function LpTestimonialCarousel({
  testimonials,
  accentColor = "#ff4757",
  cardBg = "#1a1a1a",
  mutedColor = "#71717a",
}: Props) {
  const [index, setIndex] = useState(0);
  const count = testimonials.length;

  useEffect(() => {
    if (count <= 1) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), 4500);
    return () => clearInterval(id);
  }, [count]);

  const windowItems = (visible: number) =>
    Array.from({ length: visible }, (_, i) => testimonials[(index + i) % count]!);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <div className="md:hidden">
        <div key={index}>
          <TestimonialCard
            t={testimonials[index]!}
            accentColor={accentColor}
            cardBg={cardBg}
            mutedColor={mutedColor}
          />
        </div>
      </div>
      <div className="hidden md:grid md:grid-cols-4 gap-4 transition-opacity duration-500">
        {windowItems(4).map((t) => (
          <TestimonialCard key={`${index}-${t.name}`} t={t} accentColor={accentColor} cardBg={cardBg} mutedColor={mutedColor} />
        ))}
      </div>
    </div>
  );
}

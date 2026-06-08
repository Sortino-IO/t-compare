"use client";

import Image from "next/image";
import { useState } from "react";

type GalleryImage = { src: string; alt: string };

type Props = {
  images: readonly GalleryImage[];
  accentColor?: string;
};

export default function LpDtcProductGallery({ images, accentColor = "#2563eb" }: Props) {
  const thumbs = images.slice(0, 4);
  const [active, setActive] = useState(0);
  const main = thumbs[active] ?? thumbs[0];

  if (!main) return null;

  return (
    <div className="space-y-4">
      <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-slate-100 shadow-md">
        <Image
          src={main.src}
          alt={main.alt}
          fill
          className="object-cover"
          sizes="50vw"
          priority
        />
      </div>
      {thumbs.length > 1 ? (
        <div className="grid grid-cols-4 gap-2">
          {thumbs.map((img, i) => (
            <button
              key={img.src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show image ${i + 1}`}
              aria-pressed={active === i}
              className="relative aspect-square rounded-lg overflow-hidden border-2 transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{
                borderColor: active === i ? accentColor : "transparent",
                boxShadow: active === i ? `0 0 0 1px ${accentColor}` : undefined,
              }}
            >
              <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="120px" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

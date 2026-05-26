import type { LpTestimonial } from "./landing-pages";

export type LpMedia = {
  heroImage: string;
  heroImageAlt: string;
  splitImage: string;
  splitImageAlt: string;
  gallery: { src: string; alt: string }[];
};

const AVATARS = [
  "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=240&h=240&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=240&h=240&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=240&h=240&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=240&h=240&fit=crop&crop=faces",
];

export const LP_MEDIA: Record<string, LpMedia> = {
  "critical-t-lp1": {
    heroImage:
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50c?w=900&h=700&fit=crop",
    heroImageAlt: "Fit man training with energy and confidence",
    splitImage:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop",
    splitImageAlt: "Man lifting weights in gym",
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&h=500&fit=crop",
        alt: "Athletic man mid-workout",
      },
      {
        src: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&h=500&fit=crop",
        alt: "Man training hard at the gym",
      },
      {
        src: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=600&h=400&fit=crop",
        alt: "Active couple enjoying life together",
      },
      {
        src: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop",
        alt: "Confident man stretching outdoors",
      },
    ],
  },
  "endopeak24-lp1": {
    heroImage:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=900&h=700&fit=crop",
    heroImageAlt: "Strong man training with focus and drive",
    splitImage:
      "https://images.unsplash.com/photo-1583500178690-e59a82a490ca?w=800&h=600&fit=crop",
    splitImageAlt: "Happy mature man feeling vital",
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50c?w=600&h=500&fit=crop",
        alt: "Man building strength at gym",
      },
      {
        src: "https://images.unsplash.com/photo-1540497077202-7a8a3998166e?w=600&h=500&fit=crop",
        alt: "Energetic man in fitness center",
      },
      {
        src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&h=400&fit=crop",
        alt: "Happy couple smiling together",
      },
      {
        src: "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=600&h=400&fit=crop",
        alt: "Confident man in casual setting",
      },
    ],
  },
  "erecprime24-lp1": {
    heroImage:
      "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=900&h=700&fit=crop",
    heroImageAlt: "Confident smiling man feeling his best",
    splitImage:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&h=600&fit=crop",
    splitImageAlt: "Happy couple enjoying life",
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=500&fit=crop",
        alt: "Smiling man radiating confidence",
      },
      {
        src: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&h=500&fit=crop",
        alt: "Mature man feeling strong and happy",
      },
      {
        src: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=600&h=400&fit=crop",
        alt: "Active couple staying fit together",
      },
      {
        src: "https://images.unsplash.com/photo-1583500178690-e59a82a490ca?w=600&h=400&fit=crop",
        alt: "Vital man ready to take on the day",
      },
    ],
  },
};

export function getLpMedia(slug: string): LpMedia {
  return (
    LP_MEDIA[slug] ?? {
      heroImage:
        "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50c?w=900&h=700&fit=crop",
      heroImageAlt: "Man training with energy",
      splitImage:
        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop",
      splitImageAlt: "Man at gym",
      gallery: LP_MEDIA["critical-t-lp1"]!.gallery,
    }
  );
}

export function testimonialAvatar(index: number): string {
  return AVATARS[index % AVATARS.length]!;
}

export function withAvatars(testimonials: LpTestimonial[]): (LpTestimonial & { avatarUrl: string })[] {
  return testimonials.map((t, i) => ({ ...t, avatarUrl: testimonialAvatar(i) }));
}

import type { LpTestimonial } from "./landing-pages";

export type LpMedia = {
  heroImage: string;
  heroImageAlt: string;
  splitImage: string;
  splitImageAlt: string;
  gallery: { src: string; alt: string }[];
};

/** Local assets under /public/lp — downloaded via scripts/download-lp-images.mjs */
const IMG = {
  avatar1: "/lp/avatar-1.jpg",
  avatar2: "/lp/avatar-2.jpg",
  avatar3: "/lp/avatar-3.jpg",
  avatar4: "/lp/avatar-4.jpg",
  gymStrength: "/lp/gym-strength.jpg",
  gymTraining: "/lp/gym-training.jpg",
  manRunning: "/lp/man-running.jpg",
  workoutSession: "/lp/workout-session.jpg",
  yogaStretch: "/lp/yoga-stretch.jpg",
  coupleActive: "/lp/couple-active.jpg",
  manPortraitSmile: "/lp/man-portrait-smile.jpg",
  coupleHappy: "/lp/couple-happy.jpg",
  teamMeeting: "/lp/team-meeting.jpg",
  gymLifting: "/lp/gym-lifting.jpg",
  meditationCalm: "/lp/meditation-calm.jpg",
  manConfident: "/lp/man-confident.jpg",
} as const;

const AVATARS = [IMG.avatar1, IMG.avatar2, IMG.avatar3, IMG.avatar4];

export const LP_MEDIA: Record<string, LpMedia> = {
  "critical-t-lp1": {
    heroImage: IMG.manRunning,
    heroImageAlt: "Fit man training with energy and confidence",
    splitImage: IMG.gymStrength,
    splitImageAlt: "Man lifting weights in gym",
    gallery: [
      { src: IMG.workoutSession, alt: "Athletic man mid-workout" },
      { src: IMG.gymTraining, alt: "Man training hard at the gym" },
      { src: IMG.coupleActive, alt: "Active couple enjoying life together" },
      { src: IMG.yogaStretch, alt: "Confident man stretching outdoors" },
    ],
  },
  "endopeak24-lp1": {
    heroImage: IMG.gymTraining,
    heroImageAlt: "Strong man training with focus and drive",
    splitImage: IMG.teamMeeting,
    splitImageAlt: "Confident man ready to take on the day",
    gallery: [
      { src: IMG.manRunning, alt: "Man building strength at gym" },
      { src: IMG.gymLifting, alt: "Energetic man in fitness center" },
      { src: IMG.coupleHappy, alt: "Happy couple smiling together" },
      { src: IMG.manPortraitSmile, alt: "Confident man feeling vital" },
    ],
  },
  "erecprime24-lp1": {
    heroImage: IMG.manPortraitSmile,
    heroImageAlt: "Confident smiling man feeling his best",
    splitImage: IMG.coupleHappy,
    splitImageAlt: "Happy couple enjoying life",
    gallery: [
      { src: IMG.manConfident, alt: "Smiling man radiating confidence" },
      { src: IMG.gymLifting, alt: "Mature man feeling strong and happy" },
      { src: IMG.coupleActive, alt: "Active couple staying fit together" },
      { src: IMG.teamMeeting, alt: "Vital man ready to take on the day" },
    ],
  },
  "critical-t-lp2": {
    heroImage: IMG.gymStrength,
    heroImageAlt: "Athletic man lifting weights with focus",
    splitImage: IMG.workoutSession,
    splitImageAlt: "Man mid-workout session",
    gallery: [
      { src: IMG.manRunning, alt: "Runner training outdoors" },
      { src: IMG.gymTraining, alt: "Gym training session" },
      { src: IMG.yogaStretch, alt: "Man stretching after workout" },
      { src: IMG.meditationCalm, alt: "Calm focused man recovering" },
    ],
  },
  "endopeak24-lp2": {
    heroImage: IMG.manConfident,
    heroImageAlt: "Confident mature man in casual setting",
    splitImage: IMG.gymLifting,
    splitImageAlt: "Man training with energy at gym",
    gallery: [
      { src: IMG.teamMeeting, alt: "Professional man ready for the day" },
      { src: IMG.coupleHappy, alt: "Happy couple together" },
      { src: IMG.manPortraitSmile, alt: "Smiling man feeling vital" },
      { src: IMG.coupleActive, alt: "Active lifestyle couple" },
    ],
  },
  "erecprime24-lp2": {
    heroImage: IMG.gymTraining,
    heroImageAlt: "Fit man training with intensity",
    splitImage: IMG.manConfident,
    splitImageAlt: "Confident man post-workout",
    gallery: [
      { src: IMG.workoutSession, alt: "High energy workout" },
      { src: IMG.coupleHappy, alt: "Happy couple intimate moment" },
      { src: IMG.gymLifting, alt: "Strength training focus" },
      { src: IMG.manRunning, alt: "Man running with stamina" },
    ],
  },
};

export function getLpMedia(slug: string): LpMedia {
  return LP_MEDIA[slug] ?? LP_MEDIA["critical-t-lp1"]!;
}

export function testimonialAvatar(index: number): string {
  return AVATARS[index % AVATARS.length]!;
}

export function withAvatars(testimonials: LpTestimonial[]): (LpTestimonial & { avatarUrl: string })[] {
  return testimonials.map((t, i) => ({ ...t, avatarUrl: testimonialAvatar(i) }));
}

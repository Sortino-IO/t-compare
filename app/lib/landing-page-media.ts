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
  woodWorkshop1: "/lp/wood-workshop-1.jpg",
  woodCraft2: "/lp/wood-craft-2.jpg",
  woodInterior3: "/lp/wood-interior-3.jpg",
  woodFurniture4: "/lp/wood-furniture-4.jpg",
  woodProject5: "/lp/wood-project-5.jpg",
  woodHome6: "/lp/wood-home-6.jpg",
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
  "nitric-boost-lp1": {
    heroImage: IMG.gymLifting,
    heroImageAlt: "Powerful man training with explosive energy",
    splitImage: IMG.manRunning,
    splitImageAlt: "Athletic man building stamina outdoors",
    gallery: [
      { src: IMG.workoutSession, alt: "Intense gym workout session" },
      { src: IMG.manConfident, alt: "Confident man feeling his best" },
      { src: IMG.coupleActive, alt: "Active couple enjoying life" },
      { src: IMG.gymStrength, alt: "Man lifting heavy weights" },
    ],
  },
  "nitric-boost-lp2": {
    heroImage: IMG.manPortraitSmile,
    heroImageAlt: "Confident smiling man radiating vitality",
    splitImage: IMG.teamMeeting,
    splitImageAlt: "Professional man ready to perform",
    gallery: [
      { src: IMG.gymTraining, alt: "Man training with focus" },
      { src: IMG.coupleHappy, alt: "Happy couple reconnected" },
      { src: IMG.meditationCalm, alt: "Calm confident man" },
      { src: IMG.yogaStretch, alt: "Man stretching with energy" },
    ],
  },
  "tedplansdiy-lp1": {
    heroImage: IMG.woodWorkshop1,
    heroImageAlt: "Warm workshop with woodworking project in progress",
    splitImage: IMG.woodCraft2,
    splitImageAlt: "Craftsman working on a wood project",
    gallery: [
      { src: IMG.woodFurniture4, alt: "Handmade wooden furniture piece" },
      { src: IMG.woodInterior3, alt: "Custom wood interior built by homeowner" },
      { src: IMG.woodProject5, alt: "Finished woodworking project in modern home" },
      { src: IMG.woodHome6, alt: "Beautiful home with custom wood details" },
    ],
  },
  "tedplansdiy-lp2": {
    heroImage: IMG.woodCraft2,
    heroImageAlt: "Woodworker focused on a shop project",
    splitImage: IMG.woodWorkshop1,
    splitImageAlt: "Garage workshop setup for weekend builds",
    gallery: [
      { src: IMG.woodProject5, alt: "Completed furniture build" },
      { src: IMG.woodFurniture4, alt: "Wooden dining table project" },
      { src: IMG.woodHome6, alt: "Outdoor wood structure project" },
      { src: IMG.woodInterior3, alt: "Built-in shelving project" },
    ],
  },
  "tedplansdiy-lp3": {
    heroImage: IMG.woodFurniture4,
    heroImageAlt: "Quality woodworking furniture result",
    splitImage: IMG.woodProject5,
    splitImageAlt: "Modern room with custom woodwork",
    gallery: [
      { src: IMG.woodWorkshop1, alt: "Workshop ready for next build" },
      { src: IMG.woodCraft2, alt: "Tools and materials for woodworking" },
      { src: IMG.woodInterior3, alt: "Home project built from plans" },
      { src: IMG.woodHome6, alt: "Craftsman-quality wood finish" },
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

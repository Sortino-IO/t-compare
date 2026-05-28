import fs from "fs";
import path from "path";

const OUT_DIR = path.join("public", "lp");

/** Verified Unsplash sources (blog-validated IDs). */
const ASSETS = [
  // Avatars
  {
    file: "avatar-1.jpg",
    url: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=480&h=480&fit=crop&crop=faces&auto=format&q=85",
  },
  {
    file: "avatar-2.jpg",
    url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=480&h=480&fit=crop&crop=faces&auto=format&q=85",
  },
  {
    file: "avatar-3.jpg",
    url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=480&h=480&fit=crop&crop=faces&auto=format&q=85",
  },
  {
    file: "avatar-4.jpg",
    url: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=480&h=480&fit=crop&crop=faces&auto=format&q=85",
  },
  // Lifestyle / fitness
  {
    file: "gym-strength.jpg",
    url: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&h=900&fit=crop&auto=format&q=85",
  },
  {
    file: "gym-training.jpg",
    url: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200&h=900&fit=crop&auto=format&q=85",
  },
  {
    file: "man-running.jpg",
    url: "https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=1200&h=900&fit=crop&auto=format&q=85",
  },
  {
    file: "workout-session.jpg",
    url: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=1200&h=900&fit=crop&auto=format&q=85",
  },
  {
    file: "yoga-stretch.jpg",
    url: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&h=900&fit=crop&auto=format&q=85",
  },
  {
    file: "couple-active.jpg",
    url: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=1200&h=800&fit=crop&auto=format&q=85",
  },
  {
    file: "man-portrait-smile.jpg",
    url: "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=1200&h=900&fit=crop&auto=format&q=85",
  },
  {
    file: "couple-happy.jpg",
    url: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1200&h=800&fit=crop&auto=format&q=85",
  },
  {
    file: "team-meeting.jpg",
    url: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&h=900&fit=crop&auto=format&q=85",
  },
  {
    file: "gym-lifting.jpg",
    url: "https://images.unsplash.com/photo-1609377375724-8fadc82cd50e?w=1200&h=900&fit=crop&auto=format&q=85",
  },
  {
    file: "meditation-calm.jpg",
    url: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&h=800&fit=crop&auto=format&q=85",
  },
  {
    file: "man-confident.jpg",
    url: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=1200&h=800&fit=crop&auto=format&q=85",
  },
  // Woodworking / workshop
  {
    file: "wood-workshop-1.jpg",
    url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=900&fit=crop&auto=format&q=85",
  },
  {
    file: "wood-craft-2.jpg",
    url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=900&fit=crop&auto=format&q=85",
  },
  {
    file: "wood-interior-3.jpg",
    url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=900&fit=crop&auto=format&q=85",
  },
  {
    file: "wood-furniture-4.jpg",
    url: "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=1200&h=900&fit=crop&auto=format&q=85",
  },
  {
    file: "wood-project-5.jpg",
    url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&h=900&fit=crop&auto=format&q=85",
  },
  {
    file: "wood-home-6.jpg",
    url: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&h=900&fit=crop&auto=format&q=85",
  },
];

fs.mkdirSync(OUT_DIR, { recursive: true });

let failed = 0;
for (const { file, url } of ASSETS) {
  const dest = path.join(OUT_DIR, file);
  const res = await fetch(url);
  if (!res.ok) {
    console.error(`FAIL ${res.status} ${file} ${url}`);
    failed++;
    continue;
  }
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(dest, buf);
  console.log(`OK ${file} (${buf.length} bytes)`);
}

if (failed > 0) {
  process.exit(1);
}

console.log(`Downloaded ${ASSETS.length} images to ${OUT_DIR}`);

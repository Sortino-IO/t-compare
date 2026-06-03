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
    url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=900&fit=crop&auto=format&q=85",
  },
  {
    file: "couple-active.jpg",
    url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&h=800&fit=crop&auto=format&q=85",
  },
  {
    file: "couple-together.jpg",
    url: "https://images.unsplash.com/photo-1763651958875-3cbd5780c805?w=1200&h=800&fit=crop&auto=format&q=85",
  },
  {
    file: "man-portrait-smile.jpg",
    url: "https://images.pexels.com/photos/1229356/pexels-photo-1229356.jpeg?auto=compress&cs=tinysrgb&w=1200&h=900&fit=crop",
  },
  {
    file: "hero-man-fitness.jpg",
    url: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=1200&h=900&fit=crop&auto=format&q=85",
  },
  {
    file: "supplement-bottle-hero.jpg",
    url: "https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1200&fit=crop",
  },
  {
    file: "couple-happy.jpg",
    url: "https://images.unsplash.com/photo-1541089404510-5c9a779841fc?w=1200&h=800&fit=crop&auto=format&q=85",
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
    url: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1200&h=800&fit=crop&auto=format&q=85",
  },
  {
    file: "man-confident.jpg",
    url: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=1200&h=800&fit=crop&auto=format&q=85",
  },
  {
    file: "ingredient-tongkat.jpg",
    url: "https://images.pexels.com/photos/277253/pexels-photo-277253.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
  },
  {
    file: "ingredient-epimedium.jpg",
    url: "https://images.pexels.com/photos/230477/pexels-photo-230477.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
  },
  {
    file: "ingredient-saw-palmetto.jpg",
    url: "https://images.pexels.com/photos/207247/pexels-photo-207247.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
  },
  {
    file: "ingredient-hawthorn.jpg",
    url: "https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
  },
  {
    file: "ingredient-tribulus.jpg",
    url: "https://images.pexels.com/photos/1084199/pexels-photo-1084199.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
  },
  {
    file: "ingredient-magnesium.jpg",
    url: "https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
  },
  {
    file: "ingredient-dim.jpg",
    url: "https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
  },
  {
    file: "ingredient-acacetin.jpg",
    url: "https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=800&h=600&fit=crop&auto=format&q=85",
  },
  {
    file: "ingredient-chrysin.jpg",
    url: "https://images.pexels.com/photos/1038000/pexels-photo-1038000.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
  },
  {
    file: "ingredient-winged.jpg",
    url: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=600&fit=crop&auto=format&q=85",
  },
  {
    file: "ingredient-beet.jpg",
    url: "https://images.pexels.com/photos/1300975/pexels-photo-1300975.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
  },
  {
    file: "ingredient-powder.jpg",
    url: "https://images.pexels.com/photos/4046552/pexels-photo-4046552.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
  },
  {
    file: "ingredient-citrulline.jpg",
    url: "https://images.pexels.com/photos/1313267/pexels-photo-1313267.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
  },
  {
    file: "ingredient-horny-goat.jpg",
    url: "https://images.pexels.com/photos/1002543/pexels-photo-1002543.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
  },
  {
    file: "ingredient-ginkgo.jpg",
    url: "https://images.pexels.com/photos/1038000/pexels-photo-1038000.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
  },
  {
    file: "ingredient-capsule.jpg",
    url: "https://images.pexels.com/photos/3786126/pexels-photo-3786126.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
  },
  {
    file: "ingredient-dong-quai.jpg",
    url: "https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
  },
  {
    file: "ingredient-niacin.jpg",
    url: "https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
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

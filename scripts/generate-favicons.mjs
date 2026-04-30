import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import pngToIco from "png-to-ico";

const ROOT = process.cwd();
const PUBLIC_DIR = path.join(ROOT, "public");
const APP_DIR = path.join(ROOT, "app");
const SOURCE_LOGO = path.join(PUBLIC_DIR, "logo.png");

const PNG_SIZES = [
  { name: "favicon-16x16.png", size: 16 },
  { name: "favicon-32x32.png", size: 32 },
  // Google requires at least 48x48 for favicons in Search.
  { name: "favicon-48x48.png", size: 48 },
  { name: "apple-touch-icon.png", size: 180 },
  { name: "android-chrome-192x192.png", size: 192 },
  { name: "android-chrome-512x512.png", size: 512 },
];

async function main() {
  await fs.access(SOURCE_LOGO);

  const src = sharp(SOURCE_LOGO, { failOn: "none" }).ensureAlpha();
  const meta = await src.metadata();
  if (!meta.width || !meta.height) throw new Error("Unable to read logo dimensions");

  // The logo contains the symbol on the left and text on the right.
  // Crop to the left portion (symbol only). We intentionally avoid `trim()` here:
  // on some Windows + sharp builds, trim on transparent PNGs can throw `extract_area`.
  const leftCropWidth = Math.max(1, Math.round(meta.width * 0.38));
  const safeWidth = Math.min(meta.width, leftCropWidth);
  const safeHeight = meta.height;

  const symbol = src.clone().extract({ left: 0, top: 0, width: safeWidth, height: safeHeight });

  // Render to a square canvas so small favicon sizes stay legible.
  const baseBuf = await symbol
    .resize(512, 512, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();

  await fs.writeFile(path.join(PUBLIC_DIR, "icon.png"), baseBuf);

  for (const { name, size } of PNG_SIZES) {
    const buf = await sharp(baseBuf).resize(size, size, { fit: "cover" }).png().toBuffer();
    await fs.writeFile(path.join(PUBLIC_DIR, name), buf);
  }

  const ico = await pngToIco([
    await sharp(baseBuf).resize(16, 16).png().toBuffer(),
    await sharp(baseBuf).resize(32, 32).png().toBuffer(),
    await sharp(baseBuf).resize(48, 48).png().toBuffer(),
  ]);
  await fs.writeFile(path.join(PUBLIC_DIR, "favicon.ico"), ico);
  // Next.js App Router prefers special files under /app for /favicon.ico.
  await fs.mkdir(APP_DIR, { recursive: true });
  await fs.writeFile(path.join(APP_DIR, "favicon.ico"), ico);

  // Minimal, standards-friendly manifest used by Chrome/Android.
  const manifest = {
    name: "T-Compare",
    short_name: "T-Compare",
    start_url: "/",
    display: "standalone",
    background_color: "#f5f3ee",
    theme_color: "#f5f3ee",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
  await fs.writeFile(
    path.join(PUBLIC_DIR, "site.webmanifest"),
    JSON.stringify(manifest, null, 2) + "\n",
    "utf8"
  );

  // eslint-disable-next-line no-console
  console.log("Favicons generated in /public");
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exitCode = 1;
});


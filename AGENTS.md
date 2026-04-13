<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Blog images (`app/data/posts.json`)

When adding or changing **featured** or inline **images**, follow **`docs/blog-image-guidelines.md`** (allowed themes: testosterone / men’s hormone health / enclomiphene / neutral prescription context / approved man-positive editorial subjects; banned: invoices/tax scenery, generic tech, landscapes/hotels, weight loss / hair loss / women-focused or female-fertility hero imagery, **surgery/OR hero shots**, **stethoscope-as-medicine clichés**, **smiling doctor-with-clipboard ad tropes**, etc.). Style: modern, clean, premium, natural light, editorial trust. **Reuse:** the same Unsplash `photo-…` id should appear **at most twice** site-wide (`npm run check:blog-image-cap`) and **at most once per article** (`npm run check:blog-image-per-post`). **Do not reuse** known-bad Unsplash ids listed in `scripts/blog-image-banned-ids.mjs`. **`npm run build` runs `check:blog-images:all` first** (`prebuild`) so broken or banned blog images fail the production build.

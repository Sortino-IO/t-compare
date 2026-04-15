<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Blog images (`app/data/posts.json`)

When adding or changing **featured** or inline **images**, follow **`docs/blog-image-guidelines.md`** (allowed themes: testosterone / men’s hormone health / enclomiphene / neutral prescription context / approved man-positive editorial subjects; banned: invoices/tax scenery, generic tech, landscapes/hotels, weight loss / hair loss / women-focused or female-fertility hero imagery, **surgery/OR hero shots**, **stethoscope-as-medicine clichés**, **smiling doctor-with-clipboard ad tropes**, etc.). Style: modern, clean, premium, natural light, editorial trust. **Reuse:** the same Unsplash `photo-…` id should appear **at most twice** site-wide (`npm run check:blog-image-cap`) and **at most once per article** (`npm run check:blog-image-per-post`). **Do not reuse** known-bad Unsplash ids listed in `scripts/blog-image-banned-ids.mjs`. **`npm run build` runs `check:blog-images:all` first** (`prebuild`) so broken or banned blog images fail the production build.

## Blog content: full drafts + git

- **Full versions:** Do not ship thin placeholders for blog posts whose titles promise specifics (e.g. “Program Details, Pricing, and Review”). The article body must actually deliver those sections with usable detail (structure, numbers with sources/caveats, honest review framing). If the same post exists in more than one place (e.g. `app/data/posts.json` and `scripts/blog-14-posts.mjs`), **keep them in sync** so a batch script cannot reintroduce a short version. After editing batch 14 in `blog-14-posts.mjs`, run **`npm run sync:blog14`** (see `docs/blog-batch-14-index.md` for the slug list).
- **Git:** When blog or related content work is done and checks pass (`npm run check:blog-images:all`, then `npm run build` if you touched posts), **commit and push to the remote without delay**—do not leave finished changes only on disk. Use clear commit messages describing what changed.

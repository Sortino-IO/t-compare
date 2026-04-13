# Blog image guidelines (T-Compare)

Use these rules for **every** `featuredImage`, inline `image` `src`, and any future hero assets in `app/data/posts.json` (or local files under `public/blog/`). URLs may be Unsplash or other CDNs; **relevance matters more than variety**.

## Allowed visual themes (pick one clear fit per image)

- **Testosterone** — educational / clinical context (not sensational “gains” marketing).
- **Men’s hormone health** — evaluation, monitoring, responsible care framing.
- **Enclomiphene** — educational framing (mechanism, programs, labs)—never as branded advertising.
- **Prescription medication** — neutral, **non-branded** pills/capsules/blister packs when appropriate.
- **Healthy adult man, confident posture** — lifestyle-adjacent but still compatible with men’s health editorial tone.
- **Man with increased energy / daily activity** — walking, training, everyday movement (avoid unrelated sports hero stock).
- **Testosterone molecule structure** — scientific / diagram-style (ensure license and accuracy if custom).
- **Infographic-style hormone levels chart** — educational charts only; no fake “lab results” that imply diagnosis.

## Do not use (reject stock that looks like this)

- **Invoices, receipts, billing paperwork, tax forms, or “tax calculation”** as the main subject.
- **Laptops, desktops, generic office tech, or “startup desk”** without a clear men’s-health editorial link (default: avoid).
- **Landscapes, nature scenery, mountains, beaches** as filler.
- **Generic “vibe / atmosphere”** images with no clear tie to hormone health education.
- **Hotels, hospitality, travel lifestyle** unrelated to care.
- **Weight loss** as the primary theme (different category; confuses messaging).
- **Hair loss treatments** as a visual theme.
- **Women-focused hormone imagery** or women as the primary subject for these articles.
- **Women-focused** marketing or lifestyle stock where women are the main subject.
- **Pregnancy / female fertility** visuals.
- **Female-presenting** people as hero/primary subjects for these posts (this site’s educational scope here is men’s hormone health).

If a candidate image could fit both an “allowed” and a “banned” reading (e.g. “fit woman running”), **discard it** and pick a clearer option.

## Style guidelines

- **Modern, clean, premium** — avoid cluttered stock, neon gradients, or meme aesthetics.
- **Natural lighting, realistic environments** — believable clinic/home/gym context; no hyper-stylized CGI unless it’s a diagram.
- **Subtle, trustworthy, editorial-style imagery** — looks like serious health publishing, not aggressive performance marketing.

## Alt text and captions

- `alt` must describe what the image shows and **why it’s there** (e.g. “Blood sample tubes for hormone lab work”).
- `caption` is optional; when used, keep it educational and non-prescriptive.

## Technical note

Run `npm run check:blog-images` to ensure there are no broken **local** `/blog/...` paths. Remote URLs must still be chosen using the rules above.

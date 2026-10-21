# Orthotrack

A complete, responsive Next.js landing page for visitors arriving from public-space QR codes. Brand colours, logo, imagery, product construction, and specifications are based on the supplied Orthotrack catalogue.

## Run locally

Requires Node.js 20.9 or later.

```sh
npm install
npm run dev
```

Open http://localhost:3000. On Windows PowerShell, use `npm.cmd` if script execution policy blocks `npm`.

## Build and preview production

```sh
npm run build
npm start
```

The build exports the full site to `out/`. `npm start` serves that directory with the included Node.js static server. This project intentionally uses static export, so `next start` is not the production command. Deploy `out/` to a static host such as Vercel, Netlify, Cloudflare Pages, or your existing hosting. The Sites hosting manifest also targets `out/`.

```sh
npm run typecheck
```

## Replace photos and videos

All starting images are WebP crops of the provided catalogue; they illustrate the product and possible settings, rather than completed installations. No stock-photo service is needed at runtime.

- `src/lib/content.ts`: central brand/contact settings, hero media, story video, setting examples, layer descriptions, FAQs.
- `public/images/hero-walk.webp`: portrait hero. Recommended replacement: at least 1200 × 1500 pixels, with subject near the centre.
- `public/images/everyday-walk.webp`: walking detail in the benefits section and story.
- `public/images/community.webp`, `park.webp`, `campus.webp`, `wellness.webp`: setting images. Recommended replacement: at least 1400 × 1000 pixels.
- `public/images/logo.webp`: catalogue logo. Replace with a clean high-resolution logo or SVG and update `BrandLogo` if available.
- `public/media/`: add your `.mp4` or `.webm` files here.

To add a muted looping hero video, set `media.hero.video` to `/media/hero.mp4`. The current hero image remains the video poster. To replace the three-scene visual story with a real brand film, set `media.story.video` to `/media/orthotrack-story.mp4`. It will open in the same accessible dialog with native video controls. Until then, the story is explicitly labelled as a visual preview and has working play/pause and scene controls.

The section components live in `src/components/landing-page.tsx`. Styling is in `src/app/globals.css`; reusable shadcn-style Button, Dialog, and Accordion primitives are in `src/components/ui/`, using Radix UI for focus management, keyboard navigation, and dialogs.

Open Sans is bundled locally through `@fontsource/open-sans`; the page does not request fonts from Google.

## Contact and enquiries

The catalogue provides `orthotrack.com` but no email address or telephone number. The enquiry dialog currently creates a downloadable or copyable project brief **in the visitor's browser**. It does not send, store, or falsely report submission of personal details. The visitor can then open the existing company website to contact the team.

Set `brand.email` in `src/lib/content.ts` to a verified address to enable a prefilled email enquiry. To collect enquiries automatically, connect an approved email or form service and replace the local brief handler. Add the appropriate privacy copy when adding a service.

## Public launch and QR codes

1. Replace the catalogue image crops with your final photography and video where desired.
2. Configure the verified enquiry destination.
3. Deploy to your chosen public HTTPS domain. A private Sites preview requires account access and is not suitable for a public QR campaign.
4. Set `NEXT_PUBLIC_SITE_URL` to that public origin before rebuilding so share metadata uses the correct domain.
5. Create the printed QR code from the final public URL. Optionally add a stable campaign parameter such as `?utm_source=park_signage&utm_medium=qr&utm_campaign=orthotrack_launch`; no analytics are installed by default.
6. Test a printed QR from a signed-out phone on mobile data before production printing.

## Content approach

Copy prioritises everyday comfort, a welcoming walking routine, and the value of thoughtfully designed shared spaces. The catalogue's six-layer construction and 15 mm SBR cushion are included. Unverified health improvement percentages, guaranteed injury prevention, service-life claims, and unestablished test values are not used as proven marketing claims. The original catalogue is available as a download for technical review.

## Accessibility and interaction

- Responsive layout for small phones through wide desktop screens.
- Keyboard-accessible navigation, layer buttons, setting controls, story controls, dialogs, and FAQ accordion.
- Focus trapping and Escape-to-close via Radix Dialog.
- Skip link, labelled form fields, descriptive image alternatives, and reduced-motion styling.
- No account creation, cookies, or trackers.

## Stack

Next.js App Router, React, TypeScript, Tailwind CSS 4, Open Sans, Radix UI / shadcn-style primitives, and Lucide icons. Dependency versions are pinned by `package-lock.json`.

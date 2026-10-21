# Orthotrack

A complete, responsive Next.js landing page for visitors arriving from public-space QR codes. Brand colours, logo, imagery, product construction, and specifications are based on the supplied Orthotrack catalogue. A winding, textured track connects six guided chapters; GSAP ScrollTrigger expands the supplied video, draws the route as visitors scroll, and updates the progress navigation.

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

The supplied ten-second, 1280 × 720 film has been optimised from 12.1 MB to 4.9 MB and is installed at `public/media/orthotrack-motion.mp4`. It sits directly below the hero, slightly overlaps it, and expands from a framed preview to the full page width with GSAP ScrollTrigger. It loops silently when visible and pauses outside the viewport. Visitors can pause it or open a separate player with native controls. Reduced-motion preferences disable autoplay and scroll expansion. Replace this file to update the film; the component is `ExpandingFilm` in `src/components/scroll-experience.tsx`.

The existing section components live in `src/components/landing-page.tsx`. The new chapter navigation, winding track, expanding film, cushioning demo, anatomy journey, and durability explorer live in `src/components/scroll-experience.tsx`. Base styling is in `src/app/globals.css`, and the sports-themed redesign is in `src/app/experience.css`. Reusable shadcn-style Button, Dialog, and Accordion primitives are in `src/components/ui/`, using Radix UI for focus management, keyboard navigation, and dialogs.

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

Copy prioritises cushioning, knee comfort, the benefits of regular movement, and care over time. The catalogue's six-layer construction and 15 mm SBR cushion are included. The interactive underfoot demo is labelled as an illustration of the construction principle, rather than measured impact data. General physical activity benefits are supported by the [WHO physical activity factsheet](https://www.who.int/news-room/fact-sheets/detail/physical-activity), linked from the health chapter. Unverified health improvement percentages, guaranteed injury prevention, zero-damage promises, service-life claims, and unestablished test values are not used as proven marketing claims. The original catalogue is available as a download for technical review.

## Accessibility and interaction

- Responsive layout for small phones through wide desktop screens.
- Keyboard-accessible navigation, layer buttons, setting controls, story controls, dialogs, and FAQ accordion.
- Focus trapping and Escape-to-close via Radix Dialog.
- Skip link, labelled form fields, descriptive image alternatives, and reduced-motion styling.
- No account creation, cookies, or trackers.

## Stack

Next.js App Router, React, TypeScript, Tailwind CSS 4, GSAP / ScrollTrigger, Open Sans, Radix UI / shadcn-style primitives, and Lucide icons. Dependency versions are pinned by `package-lock.json`.

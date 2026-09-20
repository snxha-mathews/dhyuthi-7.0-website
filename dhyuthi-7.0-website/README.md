# Dhyuthi 7.0 — Official Website

A dark, cinematic landing page for the IEEE SCT SB college tech festival, built around **track reveals**, **pre-events**, **competitions**, and **winner announcements**.

## What’s inside

```
src/
  routes/
    index.tsx      # Full landing page (hero, tracks, drops, schedule, teaser, footer)
    __root.tsx     # Root route, fonts, favicon, meta tags
  styles.css       # Theme tokens + animations (signal sweep, ticker, scan line, tech grid)
  assets/
    circuit-sprint.jpg
    mechathon.jpg
    pulse-night.jpg
    SB_White_1.png.asset.json   # Lovable asset pointer for the IEEE logo
public/
  favicon.png
  logo.png                      # Standalone copy of the IEEE SCT SB logo
```

## Tech stack

- TanStack Start v1 + React 19 + TypeScript
- Tailwind CSS v4
- shadcn/ui Button component
- Lucide icons
- Google Fonts: Archivo + Space Grotesk

## Running locally

1. Install dependencies (from a TanStack Start project root):

```bash
bun install
```

2. Copy these files into the matching project paths:

```bash
src/routes/index.tsx
src/routes/__root.tsx
src/styles.css
src/assets/*
public/favicon.png
public/logo.png
```

3. Start the dev server:

```bash
bun dev
```

## Design identity

- **Background:** `oklch(0.135 0.014 240)` — near-black slate
- **Primary:** `oklch(0.84 0.145 205)` — electric cyan
- **Secondary:** `oklch(0.625 0.255 17)` — signal red-orange
- **Display font:** Archivo
- **Body font:** Space Grotesk
- **Motion:** signal sweep, ticker, scan line, tech-grid background

All colors are semantic CSS variables in `src/styles.css` so future IEEE sites can swap the palette without touching components.

## Replacing placeholder content

Everything currently marked as placeholder is clearly labelled in the UI:

- Track names (`Build`, `Decode`, `Create`) are preview labels.
- Pre-event / competition / winner cards show status tags like `NEXT DROP`, `QUEUED`, `LOCKED`.
- Schedule release sequence has no invented dates.
- The email signup form at `#register` is a visual placeholder (`event.preventDefault()`).

Replace the arrays at the top of `src/routes/index.tsx` with real data as announcements drop:

```ts
const trackReveals = [ ... ]
const drops = [ ... ]
const schedule = [ ... ]
```

## Logo note

The header and footer import the logo through Lovable’s asset system:

```ts
import logo from "@/assets/SB_White_1.png.asset.json";
// usage: <img src={logo.url} ... />
```

If you move this code outside Lovable, swap the import for the local copy:

```ts
import logo from "/logo.png";
// usage: <img src={logo} ... />
```

## Credits

- Event: Dhyuthi 7.0 — IEEE SCT Student Branch
- Generated event imagery created for Dhyuthi 7.0 visual identity
- Logo provided by the IEEE SCT Student Branch

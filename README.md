# DostoForge

Personal project showcase for Yousef Al-juhani ([@Dostovinchi](https://github.com/Dostovinchi)), featuring:

- **Framix** — a cinematic film/TV review-card studio with Letterboxd import and 1080 × 1920 story export.
- **PocketPigeon** — a Chrome/Edge extension plus self-hosted relay that sends links, text and files between desktop and phone with end-to-end encryption.

Live at <https://dostovinchi.github.io/> (Arabic: <https://dostovinchi.github.io/ar/>).

## Structure

```
index.html               English page
ar/index.html            Arabic page (RTL)
styles.css               Shared styles
app.js                   Ember canvas, scroll reveals, quick-start dialog
assets/brand/            Logo mark, favicons, social card
assets/hero/             Animated WebP hero (GIF fallback) + static WebP posters
assets/framix/           Framix screenshot + step-guide captures
assets/pocketpigeon/     Icon and phone inbox screenshot
downloads/               PocketPigeon 1.3.0 ZIP (extension + relay)
```

## Local preview

```bash
python -m http.server 8080
```

Open <http://localhost:8080/>. Any static file server works.

## Deploy

Pushing to `main` runs `.github/workflows/deploy-pages.yml`, which publishes the repository root to GitHub Pages. GitHub Pages must be set to **GitHub Actions** as the source.

## Notes

- Fonts come from Google Fonts; the rest of the site is self-contained.
- The hero is a full-bleed background built from the supplied 498 × 281 GIF: a 996 px animated WebP (796 px at ≤900 px) upscaled from its frames, the original GIF as fallback, and static WebPs under reduced motion. Desktop centers the full frame over a live, heavily blurred copy of the same animation (`hero-heaven-ambient.webp`) with a glass sheen and local text scrim; mobile stacks a full-width image band behind the title. Neither layout crops the artwork.
- Each project card has a native `<details>` guide with four steps and screenshots; PocketPigeon's relay setup commands are in step 01 (the old quick-start modal was removed).
- No build step, no framework, no analytics.
- The PocketPigeon download is built from the source project; to update it, replace `downloads/pocketpigeon-<version>.zip` and the version badge in both pages.

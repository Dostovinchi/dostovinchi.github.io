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
assets/hero/             Animated GIF hero + static WebP fallbacks
assets/framix/           Framix screenshot
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
- The hero uses a single 498 × 281 looping GIF inside a framed panel at near-native size (no cover crop) with a static WebP fallback under reduced motion.
- No build step, no framework, no analytics.
- The PocketPigeon download is built from the source project; to update it, replace `downloads/pocketpigeon-<version>.zip` and the version badge in both pages.

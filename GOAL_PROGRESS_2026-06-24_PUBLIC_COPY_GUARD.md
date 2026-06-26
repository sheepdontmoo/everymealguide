# Public copy guard progress - 2026-06-24

## What changed

- Added `tools/guard-public-copy.mjs` to fail builds when internal operator wording appears in public `.html` or `.js` files.
- Added `tools/sanitize-public-copy.mjs` to scrub legacy static pages after generation.
- Updated `tools/generate-cash-ready-routes.mjs` so all `/go/` pages are regenerated as public-safe "Offer Check" pages.
- Updated `package.json` so production builds run the full page-generation chain, sanitize public HTML, then run the guard.

## Production evidence

- Vercel production deployment: `dpl_B9rLEm1LDpRbFeWZNDifXqhZyDnP`
- Production URL: `https://dinner-compare-3hplvcukv-darren-buckleys-projects.vercel.app`
- Alias reported by Vercel: `https://everymealguide.com`
- Vercel build output included `Public copy guard passed.`

## Remaining human gates

- Google Search Console verification and sitemap submission.
- Affiliate program approvals and approved tracking URLs.
- Direct partnership outreach approval before any messages are sent.
- Analytics ownership and production tracking confirmation.
- Legal/business review for disclosure, privacy, and commercial claims.

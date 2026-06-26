# Every Meal Guide Handoff

## Current Objective

Complete Every Meal Guide as a competitor-beating consumer meal delivery comparison site: polished design, reusable data/page system, first money pages, SEO foundation, affiliate-ready links, and a clear path to publish live.

## Current Status

Local launch candidate. Not live. No affiliate approvals yet.

Estimated completion: see `CURRENT_READINESS.md`.

## Project Location

```text
C:\codex\dinner-compare
```

## Local Preview

```powershell
npm run preview
```

Local URL:

```text
http://127.0.0.1:4173/
```

## Core Commands

```powershell
npm run build
npm run preview
npm run audit:visual
npm run audit:launch
```

Live-domain build:

```powershell
$env:SITE_URL="https://yourdomain.com"
$env:CONTACT_EMAIL="hello@yourdomain.com"
npm run build
```

## Main Files

- `README.md`: project entrypoint.
- `tools/generate-pages.mjs`: generated page system.
- `GENERATOR_NOTES.md`: generator contract and safety rules.
- `styles.css`: visual system.
- `script.js`: matcher and affiliate-click scaffold.
- `vercel.json`: Vercel config.
- `CURRENT_READINESS.md`: score and gates.
- `LIVE_LAUNCH_RUNBOOK.md`: deployment runbook.
- `LAUNCH_CHECKLIST.md`: operator file index.
- `VISUAL_QA_CHECKLIST.md`: browser visual QA gate.
- `DOMAIN_DECISION.md`: domain shortlist.
- `FIRST_30_DAYS.md`: post-launch operating rhythm.
- `POST_DEPLOY_VERIFY.md`: live verification checklist after deployment.
- `APPROVAL_GATES.md`: approval boundaries for external/live actions.
- `brand-style-guide.md`: design rules.

## SEO/Growth Files

- `seo/site-architecture.csv`
- `seo/content-briefs.md`
- `seo/technical-audit.md`
- `seo/30-page-expansion-roadmap.md`
- `seo/affiliate-program-targets.csv`
- `seo/affiliate-application-kit.md`
- `seo/analytics-events.md`

## What Is Done Locally

- Homepage exists and has modern buyer-cockpit design direction.
- Generated pages exist for best, deals, reviews, vs, country, trust, and `/go/` routes.
- Money pages have source-backed latest checks for top brands.
- Deal pages have deal decision tables.
- Ranking cards have verdict chips, pros, watch-outs, and CTA buttons.
- Canonical, sitemap, robots, FAQ schema, breadcrumb schema, and page schema are generated.
- Affiliate CTAs are marked `sponsored nofollow`.
- Affiliate click tracking scaffold exists via `window.dataLayer`.
- Launch/runbook/checklist/readiness/operator docs exist.

## What Is Not Done

- Site is not deployed live.
- Domain is not bought/confirmed.
- Mailbox is not created/confirmed.
- Affiliate applications are not submitted.
- Affiliate approvals do not exist.
- Real affiliate URLs are not configured.
- Analytics is not connected live.
- Search Console is not connected.
- Browser-led final visual QA has not been completed.

## Exact Next Move

Run the visual QA gate:

```powershell
npm run audit:visual
```

Then check in browser:

1. `/`
2. `/best/meal-delivery-services/`
3. `/deals/best-meal-delivery-deals/`
4. `/vs/factor-vs-cookunity/`
5. `/reviews/factor/`
6. `/methodology/`

Use `VISUAL_QA_CHECKLIST.md`.

## Next Live Move

1. Pick domain using `DOMAIN_DECISION.md`.
2. Create contact mailbox.
3. Build with `SITE_URL` and `CONTACT_EMAIL`.
4. Deploy to Vercel.
5. Confirm live pages, sitemap, and robots.
6. Submit sitemap to Google Search Console.
7. Apply to P0 affiliate programs using `seo/affiliate-application-kit.md`.

## Do Not Redo

- Do not restart from scratch.
- Do not add unrelated recipe content.
- Do not install Magnific/Remotion unless custom visuals/video become the explicit task.
- Do not publish, buy, submit, send, or apply without the relevant approval in `APPROVAL_GATES.md`.
- Do not claim the site is live.
- Do not claim affiliate approval.
- Do not add fake exact prices or fake coupon guarantees.
- Do not claim first-hand testing.

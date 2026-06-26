# Every Meal Guide

Consumer meal-delivery comparison site for meal kits, prepared meals, deals, reviews, country pages, and high-intent brand comparisons.

## Current Status

Local launch candidate, not live yet.

Main remaining external gates:

1. Pick and buy final domain.
2. Create contact mailbox.
3. Deploy to Vercel or Cloudflare Pages.
4. Submit sitemap to Google Search Console.
5. Apply to affiliate programs.
6. Add approved affiliate URLs.
7. Refresh current offers before public promotion.

See `CURRENT_READINESS.md` for the current completion score and gates.

## Run Locally

```powershell
npm run build
npm run preview
```

Local preview:

```text
http://127.0.0.1:4173/
```

## Build For Live Domain

```powershell
$env:SITE_URL="https://yourdomain.com"
$env:CONTACT_EMAIL="hello@yourdomain.com"
npm run build
```

This updates generated canonical URLs, sitemap, robots, and contact-page email.

## Useful Commands

```powershell
npm run build
npm run preview
npm run audit:launch
npm run audit:visual
```

## Before Pushing To GitHub

- Keep `.env` files local.
- Use `.env.example` for public environment-variable names.
- Do not commit screenshots, traces, local logs, or generated browser artifacts.
- Do not add real affiliate URLs until approval exists and the change is intentional.

## Key Files

- `tools/generate-pages.mjs`: reusable page generator.
- `GENERATOR_NOTES.md`: generator contract, env vars, outputs, and rules.
- `styles.css`: design system and page styling.
- `script.js`: matcher and affiliate-click tracking scaffold.
- `vercel.json`: Vercel static deployment config.
- `LIVE_LAUNCH_RUNBOOK.md`: live deployment steps.
- `LAUNCH_CHECKLIST.md`: launch checklist and operator file index.
- `HANDOFF.md`: compact current state and exact next move.
- `CURRENT_READINESS.md`: current completion score and gates to 80/90/100%.
- `DOMAIN_DECISION.md`: domain shortlist and selection rules.
- `FIRST_30_DAYS.md`: post-launch operating plan.
- `REVENUE_MODEL.md`: $5k/month planning model and KPI assumptions.
- `APPROVAL_GATES.md`: approval rules for live/external actions.
- `VISUAL_QA_CHECKLIST.md`: browser-led design QA checklist.
- `brand-style-guide.md`: design direction and component rules.

## SEO And Growth Files

- `seo/site-architecture.csv`
- `seo/content-briefs.md`
- `seo/technical-audit.md`
- `seo/30-page-expansion-roadmap.md`
- `seo/affiliate-program-targets.csv`
- `seo/affiliate-application-kit.md`
- `seo/analytics-events.md`

## Affiliate Links

Affiliate CTAs currently route through:

```text
/go/{brand}/
```

Approved URLs are configured in `affiliatePrograms` inside `tools/generate-pages.mjs`.

Until approvals are complete, `/go/{brand}/` pages show a holding page instead of redirecting.

## Design Direction

The site should feel like a modern buyer cockpit, not a coupon blog:

- buyer-cockpit hero
- premium ranking cards
- deal warning modules
- source-backed latest checks
- clear affiliate disclosure
- sticky mobile deal CTA

Use `brand-style-guide.md` before making major visual changes.

## Do Not Claim Yet

- Do not claim the site is live.
- Do not claim affiliate approval.
- Do not claim revenue.
- Do not claim exact discounts are evergreen.
- Do not claim first-hand meal testing.

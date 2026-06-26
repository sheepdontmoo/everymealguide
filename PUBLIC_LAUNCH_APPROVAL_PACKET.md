# Every Meal Guide Public Launch Approval Packet

Status date: 2026-06-23

Purpose: define the exact approvals needed before Every Meal Guide moves from local build to public website.

## Current Truth

Every Meal Guide is locally strong, but it is not live, not monetized, and not connected to analytics or Search Console.

The site should not be called complete until public launch, visual QA, analytics, Search Console, affiliate approvals, and at least one approved affiliate URL are proven.

## Approval Needed Before Public Launch

The user must explicitly approve:

1. Final domain.
2. Hosting provider.
3. Public deploy.
4. DNS changes.
5. Contact email/mailbox.
6. Analytics provider and script.
7. Search Console verification.
8. Affiliate applications.
9. Any real approved affiliate URL insertion.

## Chosen Launch Provider

Use Vercel as the production hosting home for Every Meal Guide.

Why Vercel:

1. The project already has `vercel.json`.
2. Every Meal Guide is an SEO-heavy static comparison site, which fits Vercel's static/front-end deployment model.
3. Environment variables for `SITE_URL` and `CONTACT_EMAIL` are easy to manage.
4. Fast preview deployments make visual QA easier.
5. Vercel leaves a clean upgrade path if the site later moves to Next.js, ISR, serverless functions, or a CMS.

Platform boundary:

1. Use Vercel for the public site.
2. Use Cloudflare for DNS/domain management if desired.
3. Use Railway only later if Every Meal Guide needs backend workers, databases, scheduled scraping, affiliate sync jobs, or admin APIs.

## Pre-Deploy Local Commands

Run only after visual QA is approved or explicitly skipped:

```powershell
$env:SITE_URL="https://yourdomain.com"
$env:CONTACT_EMAIL="hello@yourdomain.com"
npm.cmd run build
npm.cmd run launch:status
```

Optional local guardrails:

```powershell
npm.cmd run audit:brands
npm.cmd run audit:visual
npm.cmd run audit:launch
```

Do not treat these as public proof. They are local checks only.

## Public Launch Sequence

1. Pick final domain.
2. Create or confirm contact email.
3. Set `SITE_URL` and `CONTACT_EMAIL`.
4. Build static site.
5. Deploy preview.
6. Run browser visual QA on preview.
7. Connect domain.
8. Confirm HTTPS.
9. Confirm homepage and top money pages.
10. Submit sitemap to Search Console.
11. Connect analytics provider.
12. Confirm pageview event.
13. Confirm affiliate-click event with pending `/go/` route.
14. Apply to P0 affiliate programs.
15. Add first approved affiliate URL only after approval.

## Top Pages To Confirm Live

1. `/`
2. `/best/meal-delivery-services/`
3. `/deals/best-meal-delivery-deals/`
4. `/vs/hellofresh-vs-gousto/`
5. `/vs/factor-vs-cookunity/`
6. `/reviews/factor/`
7. `/company-accountability/`
8. `/methodology/`
9. `/affiliate-disclosure/`
10. `/privacy/`
11. `/contact/`
12. `/sitemap.xml`
13. `/robots.txt`

## Do Not Launch If

1. The contact email is still a placeholder.
2. The domain has not been approved.
3. Top pages have not had visual QA.
4. Source notes are stale for P0 brands.
5. Fresh N Lean appears as an active recommendation.
6. A real affiliate URL was added without approval.
7. Analytics/privacy wording conflicts with the chosen provider.

## First Affiliate Approval Sequence

After the public site is live:

1. Apply to Factor.
2. Apply to HelloFresh.
3. Apply to CookUnity.
4. Apply to Gousto if UK coverage is part of the launch.
5. Add approved URLs using `npm.cmd run affiliate:set`.
6. Rebuild and redeploy.
7. Confirm `/go/{brand}/` redirects.
8. Confirm `affiliate_click` and `partner_redirect_ready` events.

## Exact User Approval Phrase To Proceed

Before public deployment, ask the user for explicit approval with:

```text
Approve public launch prep for Every Meal Guide on [domain] using Vercel.
```

Do not deploy publicly from this packet without that approval.

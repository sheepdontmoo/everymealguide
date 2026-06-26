# Every Meal Guide Vercel Production Runbook

Status date: 2026-06-24

Purpose: make the public launch path clear without changing live accounts, DNS, affiliate programs, or analytics before approval.

## Human gates before running live commands

Do not run public deploy, DNS, Search Console, analytics, affiliate application, or affiliate URL changes until Darren approves:

```text
Approve public launch prep for Every Meal Guide on [domain] using Vercel.
```

## Chosen stack

1. Public site: Vercel.
2. DNS/domain: Cloudflare optional.
3. Future backend jobs: Railway optional later, not part of initial public launch.
4. Analytics: choose after domain approval.

## Pre-launch local sequence

Run from:

```powershell
Set-Location C:\codex\dinner-compare
```

Set the real domain and mailbox:

```powershell
$env:SITE_URL="https://your-real-domain.com"
$env:CONTACT_EMAIL="hello@your-real-domain.com"
```

Local guardrails:

```powershell
npm.cmd run predeploy:env
npm.cmd run audit:brands
npm.cmd run audit:visual
npm.cmd run audit:launch
npm.cmd run launch:status
```

Build:

```powershell
npm.cmd run build
```

## Vercel project settings

Use these settings when creating or importing the project in Vercel:

| Setting | Value |
|---|---|
| Framework preset | Other |
| Root directory | `C:\codex\dinner-compare` locally, repository root in Vercel |
| Build command | `npm run build` |
| Output directory | Project root/static output |
| Install command | Vercel default |
| Node version | Current Vercel default is acceptable for the simple Node scripts |

Required environment variables:

| Name | Example | Notes |
|---|---|---|
| `SITE_URL` | `https://your-real-domain.com` | Must be HTTPS and not a placeholder |
| `CONTACT_EMAIL` | `hello@your-real-domain.com` | Must be a real contact inbox |

## Deploy flow

Preferred safe flow:

1. Import repo/project into Vercel.
2. Add `SITE_URL` and `CONTACT_EMAIL`.
3. Create a preview deployment.
4. Run visual QA on the preview.
5. Fix any visible issues locally.
6. Create a production deployment.
7. Connect the approved domain.
8. Confirm HTTPS.
9. Confirm sitemap and robots.

CLI equivalent after Vercel is linked and approved:

```powershell
vercel pull --yes
vercel build
vercel deploy --prebuilt
```

Promote preview only after QA:

```powershell
vercel promote [preview-url]
```

Direct production deploy only after approval:

```powershell
vercel build --prod
vercel deploy --prebuilt --prod
```

## Top pages to verify after preview deploy

1. `/`
2. `/best/meal-delivery-services/`
3. `/countries/us/best-meal-delivery/`
4. `/deals/best-meal-delivery-deals/`
5. `/vs/`
6. `/vs/hellofresh-vs-gousto/`
7. `/reviews/factor/`
8. `/company-accountability/`
9. `/latest-offer-checks/`
10. `/affiliate-disclosure/`
11. `/privacy/`
12. `/contact/`
13. `/sitemap.xml`
14. `/robots.txt`
15. `/llms.txt`

## Post-launch sequence

1. Add site to Google Search Console.
2. Submit `/sitemap.xml`.
3. Add analytics only after choosing provider.
4. Confirm pageview event.
5. Confirm pending `/go/` click event.
6. Apply to Factor, HelloFresh, CookUnity, and Gousto only after live site review.
7. Add approved affiliate URLs only through the affiliate control workflow.

## Do not claim until proven

1. Do not claim the site is live before the public URL works.
2. Do not claim affiliate approval before merchant/network approval exists.
3. Do not claim revenue readiness before live analytics and at least one approved URL are working.
4. Do not claim design is launch-grade until browser visual QA passes.

# Every Meal Guide Live Launch Runbook

## Route

Use Vercel first unless there is a strong reason to use Cloudflare Pages. The project is static, so the deployment should stay simple.

Before making major visual changes, use `brand-style-guide.md` to preserve the buyer-cockpit direction.

Before launch, run the browser QA pass from `VISUAL_QA_CHECKLIST.md`.

## Before Deploy

1. Pick and buy the final domain.
   Use `DOMAIN_DECISION.md` to choose the candidate.
2. Create a mailbox, for example `hello@yourdomain.com`.
3. Confirm `.env` files, screenshots, traces, and local logs are not being published.
4. Set build-time values:

```powershell
$env:SITE_URL="https://yourdomain.com"
$env:CONTACT_EMAIL="hello@yourdomain.com"
npm run build
```

5. Confirm affiliate links still point to `/go/{brand}/` until approved.
6. Confirm `/contact/` shows the real mailbox.
7. Run the local launch audit:

```powershell
npm run audit:launch
```

## Vercel Settings

- Framework preset: `Other`
- Build command: `npm run build`
- Output directory: `./`
- Environment variables:
  - `SITE_URL=https://yourdomain.com`
  - `CONTACT_EMAIL=hello@yourdomain.com`

## After Deploy

1. Open the Vercel preview URL.
2. Check homepage, `/best/meal-delivery-services/`, `/deals/best-meal-delivery-deals/`, `/methodology/`, `/affiliate-disclosure/`, `/privacy/`, and `/contact/`.
3. Add the custom domain in Vercel.
4. Update DNS at the domain provider.
5. Open `https://yourdomain.com/sitemap.xml`.
6. Open `https://yourdomain.com/robots.txt` and confirm the sitemap line uses the final domain.
7. Add the site to Google Search Console.
8. Submit sitemap.
9. Apply to P0 affiliate programs using `seo/affiliate-application-kit.md`.

Use `POST_DEPLOY_VERIFY.md` to record live proof after deployment.

## Local Audit Meaning

`npm run audit:launch` proves local structural readiness: required pages, sitemap entries, affiliate CTA attributes, deal table, source-check sections, trust pages, and click-event scaffolding.

It does not prove external readiness: final domain ownership, DNS, mailbox delivery, Search Console access, analytics ingestion, affiliate approvals, or real affiliate redirects.

## Do Not Launch Paid Traffic Until

1. Contact email works.
2. Privacy and affiliate disclosure are accurate.
3. Analytics is recording pageviews.
4. `affiliate_click` is recorded in the chosen analytics tool.
5. At least P0 affiliate applications are submitted.

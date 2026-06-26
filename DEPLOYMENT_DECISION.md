# Every Meal Guide Deployment Decision

Status date: 2026-06-24

Decision: use Vercel as the production hosting home for Every Meal Guide.

This is not a temporary "launch here and move later" choice. Vercel is the chosen public hosting layer for the current business model.

## Why Vercel wins for Every Meal Guide

Every Meal Guide is primarily a static, SEO-led comparison engine:

1. Thousands of review, comparison, country, category, deal, and use-case pages.
2. Simple tracked `/go/` routes.
3. Sitemap, robots, `llms.txt`, structured pages, and static assets.
4. Preview deployments needed before public launch.
5. Potential future path into Next.js, ISR, serverless functions, or a CMS.

Vercel fits that shape better than Railway because the first money goal depends on fast public pages, crawlability, and low-friction previews, not a long-running backend server.

## Platform roles

| Layer | Decision | Why |
|---|---|---|
| Public website hosting | Vercel | Best fit for static/front-end SEO site, previews, and future Next.js path |
| DNS/domain management | Cloudflare optional | Strong DNS, SSL, redirects, and domain control if Darren wants it |
| Backend jobs/API later | Railway optional later | Useful only if we add database, scraping workers, affiliate sync, admin tools, or scheduled jobs |
| Analytics | Decide at launch | Plausible, GA4, or Vercel Analytics can be chosen once domain is approved |

## Why not Railway as the main host

Railway is excellent for backend apps, persistent services, databases, workers, and APIs. Every Meal Guide does not need that as the public front door yet. Hosting the main static SEO site on Railway would add server-style operational weight before the business has traffic or affiliate revenue proof.

Railway remains valid later for:

1. Affiliate feed sync.
2. Scheduled brand/source checks.
3. Price/offer monitoring.
4. Admin tools.
5. Database-backed personalization.

## Why not Cloudflare Pages as the main host

Cloudflare Pages is a serious static-site alternative and may be cheaper at scale. The reason to pick Vercel instead is workflow quality: preview deployments, simple front-end hosting, future Next.js compatibility, and a cleaner path for a non-backend SEO product.

Cloudflare can still be used for DNS.

## Launch boundary

Do not deploy publicly until the user approves the exact domain and launch command.

Required approval phrase:

```text
Approve public launch prep for Every Meal Guide on [domain] using Vercel.
```

After that approval, follow `VERCEL_PRODUCTION_RUNBOOK.md`.

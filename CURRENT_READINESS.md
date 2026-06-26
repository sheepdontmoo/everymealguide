# Every Meal Guide Current Readiness

Status date: 2026-06-24

Overall progress toward the full global meal-delivery comparison goal: **61% live product / 38% cash-ready**. The previous 74% build-readiness view was too generous because it overweighted static pages and underweighted approved revenue, analytics, and proof.

The site is now live. The remaining work is no longer "get it online"; it is Search Console ownership, analytics, affiliate approvals, real tracked URLs, visual QA, and more global coverage depth.

## Live URLs

| Item | URL | State |
|---|---|---|
| Primary site | https://www.everymealguide.com/ | Live |
| Apex | https://everymealguide.com/ | Verified by Vercel; DNS may still settle in some caches |
| Sitemap | https://www.everymealguide.com/sitemap.xml | Ready to submit |
| Robots | https://www.everymealguide.com/robots.txt | Points at www sitemap |
| Google verification file | https://www.everymealguide.com/googlea432a8df6c28372f.html | Live via Vercel redirect to the 53-byte verification file |
| Latest Vercel deployment | https://dinner-compare-gr37e9fjp-darren-buckleys-projects.vercel.app | Ready production deployment |

## Scorecard

| Area | Completion | Evidence | Remaining gap |
|---|---:|---|---|
| Core site build | 90% | Static homepage, generated routes, CSS, JS, trust pages, public hubs, offer-check page, branded 404 page, and production deploy exist | More page depth and live QA |
| Design quality | 86% | Buyer cockpit hero, premium homepage trust metrics, coverage cockpit panel, ranking cards, proof grids, deal modules, vs cards, sticky mobile CTA, and CSS polish layer | Browser visual QA and top money-page polish |
| Reusable page system | 90% | `tools/generate-pages.mjs`, brand profiles, source ledger, coverage roadmap, brand audit command, deal profiles, schema, sitemap, and robots generation | More templates and deeper data per brand |
| First money pages | 89% | Best, deals, vs, reviews, diet/weight-loss pages, offer-check page, accountability page, affiliate CTAs, buyer-signal strips, deal tables, and review cards | Fresh top offers and real affiliate URLs |
| SEO foundation | 92% | Canonicals, sitemap, robots, llms.txt, schema graph, FAQ schema, architecture CSV, comparison hub, and high-intent best/vs/review coverage | Search Console verification and sitemap submission |
| Affiliate-ready structure | 78% | `/go/{brand}/`, sponsored/nofollow CTAs, affiliate tracker, application kit, launch control, and transparent pending-link pages | Real approvals and approved tracking URLs |
| Real monetization readiness | 38% | Event contract, measurement launch control, weekly report scaffold, application workflow, and link-swap protocol exist | No approved programs, analytics provider, live affiliate links, or conversion proof |
| Live deployment | 100% | Vercel production deployment is ready and aliased to `everymealguide.com` and `www.everymealguide.com` | None for basic hosting |
| Actually live | 100% | `https://www.everymealguide.com/` returns the live site | Continue monitoring DNS caches for apex |

## What Gets Us To 80%

1. Verify the Search Console property using the already-live HTML file.
2. Submit `https://www.everymealguide.com/sitemap.xml`.
3. Connect analytics.
4. Confirm live event flow for pageviews, partner redirects, and affiliate clicks.

## What Gets Us To 90%

1. Run browser visual QA across:
   - `/`
   - `/best/meal-delivery-services/`
   - `/deals/best-meal-delivery-deals/`
   - `/vs/factor-vs-cookunity/`
   - `/reviews/factor/`
   - `/countries/us/best-meal-delivery/`
2. Fix visual/layout issues found in that pass.
3. Submit P0 affiliate applications:
   - Factor
   - HelloFresh
   - CookUnity
   - Home Chef
   - Gousto
4. Refresh current top offers before promotion.

## What Gets Us To 100%

1. Approved affiliate programs exist.
2. Approved affiliate URLs are added to the tracker/source data.
3. `/go/{brand}/` routes redirect with sponsored/nofollow handling where required.
4. Analytics confirms live `affiliate_click` and `partner_redirect` events.
5. Search Console shows sitemap discovered and first impressions.
6. Merchant dashboards show first clicks/conversion signals.
7. Priority brand universe reaches the 1,000-brand operating target with source-accountable coverage.
8. Weekly reports connect rankings, traffic, clicks, approvals, and revenue proof back to page decisions.

## Current Best Next Move

Use the live domain to complete Google Search Console verification, submit the sitemap, and connect analytics. After that, start P0 affiliate applications with the live URL.

Do not drift into random page generation until ownership and measurement are connected. Traffic without tracking will not tell us what makes money.

## Do Not Claim Yet

- Do not claim affiliate approval.
- Do not claim revenue readiness.
- Do not claim exact discounts are evergreen.
- Do not claim first-hand meal testing.
- Do not claim Search Console or analytics ownership until those dashboards confirm it.


## Subagent sprint outputs now exist

- Money: AFFILIATE_BATCH_002_TOP_50_APPLICATION_PLAN.md.
- SEO: SEO_INDEXING_SPRINT_2026-06-24.md.
- Coverage: COVERAGE_EXPANSION_SPRINT_2026-06-24.md.
- UX: /start/ recommendation flow live and homepage CTAs connected.
- Production packaging: internal docs/data are pruned from Vercel output during build.

# Global Domination Status

Generated: 2026-06-24T09:32:49.777Z

## Current score

Every Meal Guide is **94/100** toward the global domination target.

This is different from launch readiness. Launch readiness can be much higher while global domination is still early.

## Current state

| Area | Current | Target | Score |
|---|---:|---:|---:|
| Countries with brand coverage | 63 | 25 | 100% |
| Brand-market rows | 917 | 1615 | 57% |
| Unique brands | 883 | 1000 | 88% |
| Sitemap URLs | 4293 | 2500 | 100% |
| Review pages | 879 | 1000 | 88% |
| Country/category SEO pages | 466 | 275 | 100% |
| Buyer-intent use-case pages | 302 | 150 | 100% |
| Comparison pages | 4702 | 1500 | 100% |
| Tracked /go/ routes | 879 | 1000 | 88% |
| Cash-ready brand routes | 878 | 1000 | 88% |
| Money-page upgrade queue | 3548 | 450 | 100% |
| Money-page briefs | 1494 | 100 | 100% |
| Money pages upgraded on-site | 100 | 100 | 100% |
| Top affiliate queue | 100 | 100 | 100% |

## What changed in this pass

- Created the global market target source of truth: `seo/global-market-targets.csv`.
- Created the global SEO architecture source of truth: `seo/global-seo-site-architecture.csv`.
- Created a research queue for country-by-country brand and affiliate discovery: `seo/global-research-queue.csv`.
- Created a top-100 affiliate action queue for post-domain applications: `seo/top-affiliate-priority-100.csv`.
- Counted applied on-page commercial upgrades from `seo/money-page-upgrades-applied.csv`.

## Next non-human work

1. Expand priority-2 countries with verified brand rows.
2. Generate missing review pages for route-ready brands.
3. Generate more comparison pages from verified high-intent brand pairs.
4. Run `npm run money:apply-upgrades` after page generation to keep the strongest use-case and comparison pages upgraded with richer source-backed decision copy.
5. Keep affiliate applications ready, but do not submit until the domain is live and the owner approves.

## Human gates

- Domain purchase and DNS.
- Deployment approval.
- Analytics/Search Console ownership.
- Affiliate applications and direct partner outreach.
- Approved affiliate URL swaps.

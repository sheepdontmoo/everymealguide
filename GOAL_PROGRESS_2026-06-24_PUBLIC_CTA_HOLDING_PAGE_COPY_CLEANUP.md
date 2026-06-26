# Public CTA holding-page wording cleanup - 2026-06-24

User-reported issue:
- Public pages exposed internal buyer/partner plumbing copy such as `Opens partner or holding page` and `official holding routes`.

Completed:
- Updated `tools/sanitize-public-copy.mjs` to replace public `holding page`, `holding route`, `partner/holding page`, and `approved clearly disclosed tracking` language with consumer-facing offer/check wording.
- Updated `tools/guard-public-copy.mjs` so these phrases now block public builds if they reappear.
- Updated `brand-style-guide.md` conversion guidance so CTAs explain the useful buyer action: current offer, delivery fit, menu details, price, or terms.
- Updated `tools/apply-fast-rank-seo-plan.mjs` and `tools/build-money-page-upgrade-briefs.mjs` to avoid reintroducing holding-route language.
- Re-ran fast-rank page generation, money-page upgrades, and the sanitizer.
- Sanitizer changed 1,951 public files.
- Deployed to production with Vercel deployment `dpl_5SrgNwhZnDjtGb287D3PApC3jGJ3`.

Live URL:
- https://everymealguide.com

Deployment URL:
- https://dinner-compare-2rt52glag-darren-buckleys-projects.vercel.app

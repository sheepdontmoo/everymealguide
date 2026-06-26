# Offer-check route decision upgrade - 2026-06-24

Goal link: every monetizable brand should route through a trustworthy `/go/` page without exposing internal monetization plumbing.

Completed locally:
- Updated `tools/generate-cash-ready-routes.mjs` so approved and official-site CTAs use consumer wording: `Check current offer` / `Check official site`.
- Added a buyer decision strip to every generated `/go/{brand}/` page:
  - Continue if the brand fits the job.
  - Compare first if the visitor is unsure on meal format.
  - Skip for now if price, delivery, minimum order, skip, or cancellation terms are unclear.
- Regenerated 891 `/go/` offer-check routes.
- Ran the sanitizer after generation; it reported 0 additional public files changed.

Current deployment state:
- Not deployed after this local `/go/` route upgrade.
- Last live deploy remains the public CTA holding-page wording cleanup.

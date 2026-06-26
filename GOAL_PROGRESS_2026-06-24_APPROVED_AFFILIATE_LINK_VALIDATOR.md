# Approved affiliate link validator - 2026-06-24

Goal link: safely activate real affiliate URLs only after approval, without fake links or broken `/go/` trust.

Completed locally:
- Added `tools/validate-approved-affiliate-links.mjs`.
- Added package script `affiliate:validate-approved`.
- Updated `APPROVED_AFFILIATE_LINKS.json` rules to require the validator before route regeneration.
- Updated `AFFILIATE_URL_SWAP_RUNBOOK.md` so the approved-link workflow uses `APPROVED_AFFILIATE_LINKS.json` instead of the older helper-first path.
- Updated `AFFILIATE_GO_ROUTE_SWAP_CHECKLIST.md` to include the validator gate.

Validator checks:
- Required fields: brand, url, country, destinationType, sourceNetwork, approvalDate.
- `ownerConfirmation` must be true.
- URL must be HTTPS.
- Placeholder/example/local URLs are rejected.
- EveryMealGuide internal URLs are rejected.
- Duplicate brand slugs are rejected.
- Unknown brand names generate warnings against `seo/global-brand-universe.csv`.

Not done:
- Validator was not run in this step; no validation/test pass requested.
- No approved affiliate URLs were added.
- No deploy.

Human gate remains:
- Only add URLs after merchant/network approval and Darren confirmation.

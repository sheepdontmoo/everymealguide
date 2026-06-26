# Public placeholder/internal-copy cleanup - 2026-06-24

## Why this mattered
A public offer-check page exposed internal affiliate-route language such as cash route readiness, affiliate approval pending, partner redirect logic, and raw status values. That damages trust and makes the site feel like an internal revenue dashboard instead of a consumer comparison guide.

## Local changes made
- Patched `tools/generate-cash-ready-routes.mjs` so `/go/` pages are consumer-facing offer-check pages.
- Removed `data-partner-status` from generated public offer-check pages.
- Replaced internal route/status language with buyer-safe language about checking offer terms, delivery area, pricing, menu fit, and cancellation rules.
- Removed visible Role/Status-style internal cards from stale HTML through `tools/sanitize-public-copy.mjs`.
- Added new blocked phrases to `tools/guard-public-copy.mjs` and `tools/guard-page-quality.mjs` so phrases like cash route ready, trackable internal route, automatic partner redirect, owner-approved tracking URL, affiliate program approves, partner redirect, and data-partner-status are treated as public-copy failures.

## Regeneration performed
- `node tools/generate-cash-ready-routes.mjs`
- `node tools/sanitize-public-copy.mjs`

## Output
- Generated offer-check routes: 891
- Approved affiliate routes currently active: 0
- Public HTML files sanitized: 58

## Important status
This is local only. It has not been deployed, and no validation/build pass was run in this step.

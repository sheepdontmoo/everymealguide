# Go Offer Check Trust Flow - 2026-06-24

## Goal moved forward

The `/go/` pages are the bridge between recommendations and future affiliate revenue.

They must convert, but they also must protect trust. Visitors should never feel tricked into an outbound click.

## Local changes made

- Rebuilt generated `/go/` pages into public trust/checklist pages.
- Added clear wording:
  - "Every Meal Guide may earn a commission from some partner links."
  - "We do not claim affiliation unless it is clearly stated."
  - "Not affiliated unless stated."
- Added a stronger "Before you click" flow:
  - open official site
  - read brand review
  - compare similar services
  - read affiliate disclosure
- Added a four-step pre-order checklist:
  - delivery area
  - real weekly price after intro offers
  - meal fit
  - subscription rules
- Added trust notes explaining that fit, availability, source checks, and transparent terms come before deals or commissions.
- Fixed the route generator's progress output so it reports generated routes and existing routes honestly.

## Local generation

- Regenerated 879 local `/go/` offer-check pages.
- Refreshed `seo/affiliate-application-master-queue.csv`.
- Ran the public copy sanitizer after generation.

## Boundary

The pages still use official-site URLs from the local brand universe unless an approved affiliate tracking URL exists.

This is local only until the next approved deploy.

No production deploy was run.
No browser QA or build validation was run.


# Comparison Decision Cleanup - 2026-06-24

## Goal moved forward

The mission is for a visitor to answer "What meal delivery service should I use?" within 60 seconds.

Comparison pages now work harder as decision pages instead of exposing internal status fields.

## Local changes made

- Added a "The 60-second answer" block to generated comparison pages.
- Replaced raw internal status fields with consumer-facing notes:
  - "Availability note"
  - "Before you click"
  - "Check live terms"
- Removed public "ledger" style language from comparison copy.
- Replaced affiliate-program/status fields with buying guidance:
  - delivery area
  - current menu
  - normal price after intro offers
  - cancellation rules
  - clearly disclosed partner status
- Improved "Choose X if..." cards with format-specific guidance for:
  - prepared meals
  - meal kits
  - high-protein / meal prep
  - frozen meals
  - diet / specialist plans

## Local generation

- Regenerated 2,780 local comparison pages.
- Regenerated the comparison index CSV.
- Ran the public copy sanitizer after generation.

## Boundary

This is local only until the next approved deploy.

No production deploy was run.
No browser QA or build validation was run.


# Public Internal Copy Cleanup - 2026-06-24

## Why this was needed

Screenshots showed public pages exposing internal operator language such as "Money Route", "Buyer Route", "tracked", source-control labels, and table columns like "Evidence" / "Next Step".

That wording makes the site feel like an internal spreadsheet instead of a consumer comparison product.

## Local changes made

- Rewrote review-page generator copy so public cards use consumer labels:
  - "Decision guide"
  - "Meal format"
  - "Market coverage"
  - "Offer check"
  - "Best for"
  - "Before buying"
- Rewrote Wave/directory generator copy so public tables use consumer labels:
  - "Meal type"
  - "Availability note"
  - "Before you choose"
  - "What to compare next"
- Strengthened the public copy sanitizer to replace leaked operator phrases before launch.
- Strengthened public copy/page quality guards to catch these phrases in future builds.
- Regenerated affected local public pages:
  - 55 Wave/directory/country pages
  - 879 brand review pages
- Ran the sanitizer as an edit step after regeneration.

## Important boundary

This cleanup is local only until the next approved deploy.

No production deploy was run in this step.
No browser QA or build validation was run in this step.


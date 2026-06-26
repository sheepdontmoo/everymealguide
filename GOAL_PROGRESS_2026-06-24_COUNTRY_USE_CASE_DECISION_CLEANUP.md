# Country and Use-Case Decision Cleanup - 2026-06-24

## Goal moved forward

The mission is for a visitor to answer "What meal delivery service should I use?" within 60 seconds.

Country/category and use-case pages are major entry points from search, so they need to feel like buyer guides, not internal data tables.

## Local changes made

- Replaced public raw fields such as `site_status` and `affiliate_program_target` with buyer-friendly copy.
- Replaced "Evidence" table headers with "Official source".
- Replaced "Status" table headers with "Availability note".
- Replaced "Offer check" table fields with "Before you choose".
- Replaced "full market ledger" style wording with "full option directory".
- Replaced internal "ledger" fallback copy with public "company list" / "option list" language.
- Added a "The 60-second answer" section to generated use-case pages.
- Use-case pages now tell visitors which first brand to check and when to compare the second option instead.

## Local generation

- Regenerated 223 local country/category pages.
- Regenerated 302 local use-case pages.
- Regenerated:
  - `seo/country-category-page-index.csv`
  - `seo/use-case-page-index.csv`
- Ran the public copy sanitizer after generation.

## Boundary

This is local only until the next approved deploy.

No production deploy was run.
No browser QA or build validation was run.


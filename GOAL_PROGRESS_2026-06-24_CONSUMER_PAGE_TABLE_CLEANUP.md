# Consumer-page database-table cleanup - 2026-06-24

## Why this mattered
Every Meal Guide needs to help a visitor answer "What meal delivery service should I use?" quickly. Normal buyer pages should not feel like an internal database or spreadsheet. The full brand directory belongs on an All Brands/directory page, not on review, comparison, country, or best pages.

## Local changes made
- Updated `script.js` so the full brand CSV is only fetched when `companyTableShouldRender()` returns true.
- Current table rendering stays limited to `/brand-directory/`, `/all-brands/`, or pages explicitly marked as directory pages.
- Removed the old `data-partner-status` analytics fallback from public JS so public offer-check pages are not coupled to internal partner status attributes.

## Impact
- Normal consumer pages avoid loading the full brand database script path.
- The giant directory table remains available for dedicated brand-directory pages only.
- This supports the mission by keeping buyer pages focused on recommendations, fit, alternatives, and current offer checks.

## Important status
This is local only. No build, browser QA, Core Web Vitals check, or deploy was run in this step.

## Next cleanup target
Create/strengthen a dedicated `/brand-directory/` or `/all-brands/` page that clearly labels the table as a directory, while review/best/country/comparison pages stay curated and decision-first.

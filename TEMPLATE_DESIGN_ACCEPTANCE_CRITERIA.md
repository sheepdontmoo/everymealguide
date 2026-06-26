# Every Meal Guide Template Design Acceptance Criteria

This is the quality bar for turning Every Meal Guide from a directory into a premium comparison engine.

## Global rules

- Show curated choices before exhaustive data.
- Use the Every Meal Guide orange for primary CTAs.
- Keep affiliate disclosure close to money links.
- Avoid fake ratings, fake testing, invented prices, or invented live offers.
- Use one clear H1 per page.
- Put a short quick answer in the first screen.
- Link to relevant reviews, comparisons, countries, deals, and `/go/` routes.
- Keep route structure, sitemap, and `/go/` pages intact.

## Homepage

Must answer:

"What does this site do and where should I start?"

Acceptance criteria:

- Hero headline is simple and direct.
- Primary action leads to matcher or meal-type start.
- Vanity volume stats do not dominate the hero.
- Meal type choices are obvious.
- The homepage sends users to Top Picks, Meal Types, Countries/Regions, Compare Brands, Deals, and All Brands without confusion.

## Best pages

Must answer:

"Which services should I shortlist for this need?"

Acceptance criteria:

- First screen includes quick answer and disclosure.
- Top 3-6 picks appear before any exhaustive data.
- Each pick includes:
  - Best-for label.
  - What it is.
  - Who it fits.
  - One caveat.
  - `Check price` or `View deal` CTA.
  - Link to review or comparison where available.
- Intro discounts are clearly separated from ongoing value.

## Review pages

Must answer:

"Should I consider this brand, and who is it actually for?"

Acceptance criteria:

- No giant coverage table directly under the review hero.
- Review includes:
  - Overview.
  - Pros and cons.
  - Pricing and plans caveat.
  - Who it is best for.
  - Who should skip it.
  - Alternatives.
  - How we compare.
  - Final verdict.
- CTA and affiliate disclosure sit near the recommendation.
- Source-backed offer notes are clearly dated where used.

## Comparison pages

Must answer:

"Which of these two brands is the better fit for me?"

Acceptance criteria:

- First screen gives an immediate verdict.
- Comparison separates:
  - Best for price.
  - Best for convenience.
  - Best for families.
  - Best for diet/protein.
  - Best for country availability.
- Both brand CTAs are visible with affiliate disclosure.
- Page links to relevant alternatives if neither brand fits.

## Country pages

Must answer:

"Which services are relevant where I live?"

Acceptance criteria:

- Country is obvious in the H1.
- Page separates meal kits from prepared meals and other categories.
- Local availability caveats are visible.
- Top local/relevant brands appear before any directory table.
- Links lead to brand reviews, comparisons, and `/go/` routes.

## All Brands directory

Must answer:

"Is this brand covered and where can I find its route?"

Acceptance criteria:

- Directory table is allowed here.
- Page explains that Top Picks pages are better for choosing.
- Search/filter controls are visible.
- Every brand row links to review and `/go/` route where available.

## Visual quality

Acceptance criteria:

- Light surfaces and whitespace dominate.
- Dark sections are used sparingly for emphasis only.
- Orange CTA treatment is consistent.
- Logo has padding and clear visibility.
- Body copy is easy to scan.
- Mobile layout has no clipped primary content.

## Measurement

Acceptance criteria:

- `affiliate_click` still fires on money links.
- `matcher_submit` still fires on matcher use.
- `newsletter_interest` still fires on newsletter button.
- New CTAs preserve `data-track="affiliate-click"` where relevant.

## Deployment boundary

Passing these criteria locally is not the same as live success. Live success requires deployment, Search Console, analytics, affiliate approvals, tracking URLs, and revenue evidence.

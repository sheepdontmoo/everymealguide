# GPT Audit Response And Fix Log

This file maps the external audit feedback to concrete Every Meal Guide actions.

## Audit diagnosis

The audit correctly identified that the site felt more like a giant coverage directory than a curated comparison engine.

The biggest trust/conversion issues were:

- The hero and first click were not clear enough.
- Navigation labels were too abstract.
- The massive coverage table appeared too early on consumer-facing pages.
- Affiliate disclosures were not close enough to recommendation links.
- The visual system felt too busy and dark in places.
- Reviews needed stronger buyer guidance and less directory spillover.

## Fixes applied locally

### Hero and first-click clarity

- Changed homepage positioning toward choosing the right meal type first.
- Added a `Start Here` section with clear consumer pathways:
  - Prepared meals.
  - Meal kits.
  - High-protein meals.
  - Cheap meals.
  - Family meals.
  - Deals.
- Changed the matcher so it routes to relevant money pages instead of only scrolling.

### Navigation clarity

- Replaced abstract labels with clearer buyer labels:
  - `Best` -> `Top Picks`.
  - `Compare` -> `Compare Brands`.
  - `Directory` -> `All Brands`.
  - `Countries` -> `Countries/Regions`.
- Added `Meal Types` as a visible path.

### Coverage table overwhelm

- Stopped the giant brand coverage table from rendering on normal consumer pages.
- The table now belongs to directory-style pages only.
- This keeps homepage, best pages, review pages, country pages, and comparison pages focused on buyer decisions.

### Affiliate disclosure proximity

- Added nearby affiliate disclosure text to sections with affiliate links.
- Added a homepage deals-section disclosure line.
- The disclosure language is simple:
  `Disclosure: when you buy through our links, we may earn a commission at no extra cost to you.`

### Branding

- Added supplied Every Meal Guide logo assets under `assets/brand/`.
- Created cropped web versions for the logo mark.
- Updated header logo treatment with padding.
- Updated favicon references to the cropped orange logo.
- Shifted the accent color from old tomato red to the new Every Meal Guide orange.

## Still to fix next

### Review page template

Add a stronger review structure:

- Overview.
- Pros and cons.
- Pricing and plans.
- Who it is best for.
- Alternatives.
- How we compare.
- Verdict.
- Nearby `Check price` CTA and disclosure.

### Top-picks page template

Replace generic ranking surfaces with curated shortlists:

- 3 to 6 top picks.
- Best-for label.
- Pros and cons.
- Pricing caveat.
- Current offer caveat.
- `Check price` CTA.
- Alternatives if the user chose the wrong meal type.

### Country pages

Add country-specific first-screen clarity:

- Local market summary.
- Meal kits available locally.
- Prepared meals available locally.
- Regional delivery caveats.
- Local currency/pricing caveat where source-backed.

### Trust layer

Add:

- Last-updated labels.
- Methodology links near recommendations.
- Author/editor note.
- Source notes where claims are made.
- Stronger `Why you can trust us` module.

### Design system

The site should keep moving toward:

- Light, clean comparison-guide surfaces.
- Less decorative darkness.
- More whitespace.
- One Every Meal Guide orange CTA system.
- Stronger editorial hierarchy.
- Shortlists before tables.

## Evidence boundary

These are local design/CRO fixes unless a fresh production deployment succeeds. Do not claim the audit fixes are live until deployment is confirmed.

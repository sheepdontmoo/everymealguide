# Top Picks decision-first upgrade - 2026-06-24

## Why this mattered
The Top Picks page is one of the main routes for the mission: help a visitor answer "What meal delivery service should I use?" quickly. The page had useful rankings, but it still pushed users into brand rankings before clearly separating meal kits, prepared meals, budget boxes, high-protein plans, family dinners, and local/country fit.

## Local changes made
- Patched `tools/generate-pages.mjs` so `/best/meal-delivery-services/` is source-safe and survives production builds.
- Rewrote the Top Picks hero metadata to say `Top Picks`, `Fastest answer`, and `Choose the format first` instead of generic buyer-cockpit framing.
- Expanded Top Picks from 3 primary picks to 5: HelloFresh, Factor, CookUnity, EveryPlate, and Gousto.
- Added a new `Choose your lane` decision section above the brand rankings with six routes:
  - Prepared meals
  - Meal kits
  - Budget boxes
  - High-protein meals
  - Family dinners
  - Country pages
- Added CSS for `.top-picks-decision-section` and `.top-picks-decision-grid` in `styles.css`.
- Regenerated core pages with `node tools/generate-pages.mjs` so the local generated Top Picks page reflects the generator update.

## Impact toward mission
- The page now tells visitors what type of meal delivery to choose before pushing brand names.
- It reduces cognitive load by turning a broad comparison page into a lane picker.
- It keeps the ranking list below for readers who want brand-level detail after choosing the category.

## Important status
This is local only. It has not been deployed after this Top Picks upgrade, and no build, guard, browser QA, or Core Web Vitals check was run in this step.

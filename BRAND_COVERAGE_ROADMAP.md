# Every Meal Guide Brand Coverage Roadmap

Status date: 2026-06-23

Purpose: make sure every company has a practical content path, not just a mention in the data file.

## Coverage Principle

Each active company should eventually have four layers:

1. A source-backed brand profile in `tools/generate-pages.mjs`.
2. At least one money page where the brand is commercially relevant.
3. At least one comparison or review angle that matches real search demand.
4. Affiliate status tracking before any real monetized link is added.

Fresh N Lean is different: it stays as watchlist/legacy context only until active official availability is proven.

## Brand Coverage Queue

| Brand | Priority | Core money angle | Required page coverage | Current launch decision |
|---|---|---|---|---|
| HelloFresh | P0 | Broad meal-kit demand | Best pages, deals, review, vs Gousto, vs Home Chef | Promote after final offer refresh |
| Factor | P0 | Prepared meals, no-cook, high protein | Best prepared meals, high protein, review, vs CookUnity, deals | Promote after final offer refresh |
| CookUnity | P0 | Premium prepared meals and taste | Prepared meals, fresh meals, vs Factor, deals | Promote after final offer refresh |
| Gousto | P1 | UK meal kits and recipe choice | UK country page, meal kits, vs HelloFresh, deals | Promote after final offer refresh |
| EveryPlate | P1 | Cheap meal kits | Cheap meal delivery, budget meal kits, vs Dinnerly | Promote after final offer refresh |
| Dinnerly | P1 | Budget challenger | Cheap meal delivery, budget meal kits, vs EveryPlate | Promote after final offer refresh |
| Home Chef | P1 | US mainstream meal-kit alternative | US country page, review, vs HelloFresh | Promote after final offer refresh |
| Purple Carrot | P2 | Vegan and plant-based meals | Vegan page, vegetarian page, vs Green Chef | Promote after final offer refresh |
| Green Chef | P2 | Healthy and premium diet-filter kits | Healthy page, high protein adjacent, vs Purple Carrot | Promote after final offer refresh |
| Fresh N Lean | Blocked | Historical prepared-meal query capture | Watchlist/context only | Do not promote as active buy |

## Added Local Review Coverage

These review pages are now part of the generated local site:

1. `/reviews/everyplate/`
2. `/reviews/dinnerly/`
3. `/reviews/gousto/`
4. `/reviews/cookunity/`
5. `/reviews/green-chef/`
6. `/reviews/purple-carrot/`

## Added Local Best-Page Coverage

These high-intent best pages are now part of the generated local site:

1. `/best/meal-delivery-for-weight-loss/`
2. `/best/keto-meal-delivery/`
3. `/best/gluten-free-meal-delivery/`

## Added Local Vs-Page Coverage

These comparison pages are now part of the generated local site:

1. `/vs/hellofresh-vs-everyplate/`
2. `/vs/factor-vs-hellofresh/`
3. `/vs/factor-vs-green-chef/`

## Next Expansion Pages

Build these only after visual QA and launch basics are handled:

1. `/best/diabetic-friendly-meal-delivery/`
2. `/best/low-calorie-meal-delivery/`
3. `/best/meal-delivery-for-seniors/`
4. `/best/meal-delivery-for-athletes/`
5. `/best/low-carb-meal-delivery/`
6. `/vs/hellofresh-vs-dinnerly/`

## Do Not Expand If

1. The brand has no source trail.
2. The brand is watchlist-only.
3. The page would be a thin duplicate of an existing page.
4. The offer cannot be refreshed before launch.
5. The page has no clear commercial intent.

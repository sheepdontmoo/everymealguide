# Page quality acceptance criteria

## Purpose

Every Meal Guide can scale to thousands of pages only if each page still helps a visitor choose quickly and confidently.

## Required page qualities

Each important public page should include:

- a quick answer or fast verdict
- clear meal-format fit
- country or delivery-area context where relevant
- alternatives or next-best options
- price-after-intro/deal caution where relevant
- skip/cancel/terms reminder where relevant
- offer-check or review path
- affiliate disclosure where links may earn commission
- no internal operator language

## Local guard

Run this before major page-template changes:

```powershell
npm.cmd run guard:page-quality
```

The guard samples:

- homepage
- best page
- review page
- comparison page
- country page
- offer-check page

## What the guard does not prove

This guard does not prove that every generated page is excellent. It catches obvious template drift and missing decision-support elements on representative pages.

For launch-quality proof, pair it with:

- browser spot-checks
- public-copy guard
- homepage mission guard
- performance budget guard
- Search Console/analytics after traffic exists

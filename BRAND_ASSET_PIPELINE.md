# Every Meal Guide Brand Asset Pipeline

This pipeline controls how real company logos, food images, banners, and affiliate creatives are added to the site.

## Why this matters

Real logos and meal photos will make Every Meal Guide feel more trustworthy, easier to scan, and more affiliate-ready. But unsafe image use can create legal, brand, or partner-approval problems.

## Folder structure

- `assets/brands/{brand-slug}/logo.png`
- `assets/brands/{brand-slug}/meal.jpg`
- `assets/brand-creatives/{brand-slug}/`
- `assets/category-photos/`
- `seo/brand-assets-manifest.csv`

## Source priority

Use assets in this order:

1. Approved affiliate creative portal after the program accepts Every Meal Guide.
2. Official brand media kit or press page with usable assets.
3. Official brand website logo only when use is clearly nominative and not presented as a partnership.
4. Brandfetch, Logo.dev, or another reputable logo provider for placeholder logo research.
5. Text-only brand card if no safe asset source exists.

## Hard no

- Do not scrape Google Images.
- Do not use random product photos from search results.
- Do not imply a partnership before approval.
- Do not use brand logos in a "partners" or "trusted by" section unless the brand has approved or the relationship is real.
- Do not alter logos beyond sizing, padding, transparent background handling, or monochrome use where permitted.
- Do not claim images are official if the source is unverified.

## Logo policy

Logos are acceptable only as brand identifiers inside review, comparison, directory, or shortlist contexts.

Each logo needs:

- Source URL.
- Source type.
- Permission/status.
- Local path.
- Last checked date.

## Food image policy

Brand-specific meal photos should come from:

- Affiliate creative portal.
- Official press/media kit.
- Official brand image with clear usable rights.

Until then, use neutral stock/category images for meal-type pages and keep brand cards logo/text-led.

## Manifest generation

After updating `seo/global-brand-universe.csv`, generate or refresh the asset manifest with:

```powershell
Set-Location C:\codex\dinner-compare
.\tools\build-brand-assets-manifest.ps1
```

This produces:

```text
C:\codex\dinner-compare\seo\brand-assets-manifest.csv
```

## First implementation target

Do not try to add logos for 800+ brands at once.

Start with the first 20 commercial targets:

- HelloFresh
- Factor
- CookUnity
- Gousto
- Mindful Chef
- Chefs Plate
- Youfoodz
- My Muscle Chef
- Blue Apron
- Marley Spoon
- EveryPlate
- Dinnerly
- Home Chef
- Green Chef
- Purple Carrot
- Hungryroot
- Thistle
- Trifecta
- Sprinly
- Little Spoon

## Page rollout order

1. Homepage top picks.
2. Best meal delivery services page.
3. Prepared meal delivery page.
4. Meal kits page.
5. High-protein page.
6. Review pages for approved/source-safe brands.
7. Comparison pages.
8. Country pages.
9. Full directory.

## Evidence boundary

Having a logo in the manifest does not mean the brand is an affiliate partner. Only approved affiliate programs or direct agreements should be described as partnerships.

# SEO landing-page expansion workflow

## Purpose

Move toward 10,000+ SEO landing pages without creating thin, low-trust pages.

## Command

```powershell
npm.cmd run plan:seo-pages
```

## Output

```text
seo/seo-landing-page-expansion-plan.csv
reports/seo-landing-page-expansion-plan.json
```

## Expansion rule

Only create a page when it helps a visitor make a clearer choice.

Good page reasons:

- country-specific delivery decision
- category-specific meal format decision
- use-case decision such as no cooking, family, fitness, weight loss, budget
- brand-vs-brand comparison where both brands are plausible alternatives
- deal/cancellation/normal-price explanation where buyer risk is high

Bad page reasons:

- keyword exists but no distinct user problem
- one thin brand with no useful alternatives
- duplicate page with swapped wording
- unverified brand list
- no path to recommendation or offer check

## Required page quality

Every generated expansion page should include:

- quick answer
- top starting picks
- who it is for
- who should avoid it
- delivery/price/cancellation caveats
- related alternatives
- offer-check links only with safe disclosure

## Status

Planner added locally. Run only when we are ready to create the next page-expansion batch.

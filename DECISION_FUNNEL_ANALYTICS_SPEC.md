# Decision funnel analytics spec

## Mission

Help consumers answer "What meal delivery service should I use?" within 60 seconds of landing on Every Meal Guide.

## Funnel events

| Funnel step | Existing or planned event | Meaning | Success signal |
| --- | --- | --- | --- |
| Page view | `page_view` | Visitor landed on a page | Homepage and shortlist pages receive traffic |
| Matcher submit | `matcher_submit` | Visitor answered the matcher questions | User is actively asking for a recommendation |
| Matcher result shown | `matcher_result_shown` | Homepage gave an inline recommendation | Site answered before sending visitor away |
| Decision path click | `decision_path_click` | Visitor clicked a recommendation lane | User reached a path in 1 to 2 clicks |
| Affiliate click | `affiliate_click` | Visitor clicked an offer/check link | Commercial intent reached |

## Primary UX KPIs

| KPI | Target | How to calculate |
| --- | --- | --- |
| Homepage clarity | Purpose understood in under 5 seconds | Qualitative review until survey/recording data exists |
| Recommendation access | Recommendation reached in under 3 clicks | `decision_path_click` or `matcher_result_shown` from homepage |
| 60-second answer rate | 50%+ of engaged homepage users see/click a recommendation | `matcher_result_shown + decision_path_click` divided by engaged homepage sessions |
| Shortlist click-through | 25%+ of homepage users click a shortlist/review path | `decision_path_click` divided by homepage sessions |
| Commercial intent click-through | 5%+ of shortlist/review visitors click offer/check links | `affiliate_click` divided by shortlist/review sessions |

## Event properties to preserve

Every decision-path event should include:

- `path`
- `pageTitle`
- `timestamp`
- `pathChoice`
- `label`
- `href`

Matcher result events should include:

- `country`
- `budget`
- `diet`
- `mealType`
- `recommendation`
- `href`

Affiliate click events should include:

- `brand`
- `href`
- `affiliateStatus`
- `label`

## Drop-off questions

Use the event sequence to answer:

- Do people use the instant-answer cards or the matcher more?
- Which first-click paths produce the most offer/check clicks?
- Are visitors choosing prepared meals, meal kits, budget, family, high-protein, or country-specific paths?
- Do example-brand links convert better than category shortlist links?
- Are country-specific shortlists more useful than global best pages?

## Current gaps

- Events currently use the site event pipeline and local browser storage, but production analytics ownership still needs confirmation.
- No server-side event collection exists yet.
- No Search Console data exists in this repo yet.
- No affiliate revenue data exists yet.

## Recommended next instrumentation step

Connect the existing event names to the chosen analytics tool once ownership is confirmed:

- Plausible custom events, or
- Google Analytics 4 events, or
- Vercel Web Analytics plus a lightweight event endpoint if needed.

Do not build a custom analytics backend until traffic proves the need.

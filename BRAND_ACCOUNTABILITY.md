# Every Meal Guide Brand Accountability

Status date: 2026-06-23

Purpose: every company included in Every Meal Guide must have a clear current status, source trail, and launch decision. No brand should sit in the data as a vague placeholder.

## Company Status Matrix

| Brand | Site role | Current status | Source trail | Launch decision |
|---|---|---|---|---|
| HelloFresh | Mainstream meal kit | Active official offer checked | Official page | Keep as P0 comparison brand |
| Factor | Prepared meals | Active official offer checked | Official page | Keep as P0 comparison brand |
| Gousto | UK meal kit | Active official offer checked | Official page | Keep as P1/UK comparison brand |
| CookUnity | Premium prepared meals | Active official offer checked | Official page | Keep as P0 comparison brand |
| EveryPlate | Budget meal kit | Active official page checked | Official page | Keep as P1 budget brand |
| Dinnerly | Budget meal kit | Active official page checked | Official page | Keep as P1 budget brand |
| Home Chef | Mainstream US meal kit | Active official page checked | Official page | Keep as P1 US comparison brand |
| Purple Carrot | Plant-based meal kit | Active official page checked | Official page | Keep as P2 vegan/plant-based brand |
| Green Chef | Health-focused meal kit | Active official page checked | Official page | Keep as P2 healthy/premium brand |
| Fresh N Lean | Prepared meal historical/search term | Watchlist, do not recommend as active buy | Third-party shutdown/availability-risk note | Keep only as cautionary/legacy context until official availability is proven |

## Rules

1. Every brand in `affiliatePrograms` must also be represented in `brandProfiles`.
2. Every brand profile must have `checkedOffer`, `sourceUrl`, and `sourceLabel`.
3. Brands with unresolved availability risk must not be top recommendations.
4. Official pages are preferred. If no official active page can be verified, mark the brand as watchlist.
5. Before launch, refresh P0 and P1 brands again from official pages.

## Local Guardrail

Run this before adding or promoting any new company:

```powershell
npm.cmd run audit:brands
```

The audit checks that every affiliate company has a profile, source fields, and a row in this accountability matrix. It also blocks Fresh N Lean from reappearing as a top recommendation while it is watchlist-only.

## Fresh N Lean Decision

Fresh N Lean remains in the data only because people may search for it and because it can be useful as cautionary comparison context.

It should not be used as:

1. A top recommendation.
2. A live deal target.
3. A positive active-buy CTA.
4. A P0 affiliate application target.

It can be used as:

1. A watchlist mention.
2. A comparison warning.
3. A prompt to check current availability before buying.

## Next Brand Expansion Rule

Do not add a new meal company unless we can also add:

1. Official URL.
2. Active/inactive/watchlist status.
3. Best-for summary.
4. Watch-out summary.
5. Affiliate priority.
6. Source check date.

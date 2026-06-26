# Every Meal Guide Cash Route Replacement Runbook

Use this when an affiliate program approves Every Meal Guide or a direct partner provides a tracking URL.

## Source of truth

- Route manifest: `C:\codex\dinner-compare\seo\cash-route-manifest.csv`
- Affiliate tracker: `C:\codex\dinner-compare\affiliate-application-tracker.csv`
- Affiliate mapping: `C:\codex\dinner-compare\affiliate-programs.json`
- Page generator: `C:\codex\dinner-compare\tools\generate-pages.mjs`

## Current route evidence

As of 2026-06-24 local route check:

- Brand rows in cash manifest: 882
- Missing `/go/` route folders: 0
- Missing `/reviews/` route folders: 0

This means the current brand universe is locally cash-routable through placeholder `/go/` routes. It does not mean affiliate URLs are approved or active.

## Replacement rule

Only replace a placeholder route with a merchant URL after:

1. The program approves Every Meal Guide.
2. The approved tracking URL is available.
3. Darren approves adding that exact URL.
4. The brand has an affiliate disclosure context on the destination page.

## Replacement steps

1. Open `seo/cash-route-manifest.csv`.
2. Find the brand row.
3. Confirm `go_route_exists` is `yes`.
4. Confirm `tracking_url_status` is still `placeholder_pending_approval`.
5. Add the approved URL to the active affiliate mapping.
6. Regenerate static pages if the generator owns that route.
7. Keep `rel="sponsored nofollow"` on outbound affiliate links.
8. Update `affiliate-application-tracker.csv` to `tracking_url_added`.
9. Record the deploy URL after shipping.
10. Record the first tracked click separately from first commission.

## Do not do this

- Do not use unapproved direct merchant links as affiliate redirects.
- Do not cloak or hide affiliate status.
- Do not claim a brand is partnered unless the program has approved the site.
- Do not invent discount codes or live offers.
- Do not redirect watchlist or closed brands.
- Do not bulk-replace every `/go/` route with generic homepage URLs.

## Status meanings

- `local_placeholder_route_ready`: the `/go/` page exists locally and can become a cash route later.
- `placeholder_pending_approval`: no approved tracking URL is connected yet.
- `tracking_url_added`: approved tracking URL has been added locally.
- `live_cash_route`: approved tracking URL has been deployed and the route is live.
- `first_click_recorded`: tracking recorded a user click.
- `first_commission_recorded`: affiliate dashboard shows commission evidence.

## Evidence boundary

A complete placeholder route is not revenue. Revenue proof requires an approved affiliate account, an approved tracking URL, deployed route, click tracking, and commission evidence.

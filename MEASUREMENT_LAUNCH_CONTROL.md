# Every Meal Guide Measurement Launch Control

Status date: 2026-06-23

Purpose: make Every Meal Guide measurable as a money asset after launch without adding noisy or unsafe tracking too early.

## Current State

| Layer | Status | Evidence | Launch action |
|---|---|---|---|
| Event scaffolding | Ready locally | `script.js` pushes `page_view`, `affiliate_click`, `matcher_submit`, `newsletter_interest`, and `partner_redirect_ready` into `dataLayer`, localStorage, console, and Plausible when available | Confirm live after analytics provider is connected |
| Event naming contract | Ready locally | `ANALYTICS_EVENT_CONTRACT.json` | Use same names in Plausible/GA/dashboard |
| Pageview analytics | Not live | No provider script connected to production domain | Connect after domain is live |
| Search Console | Not live | No public verified domain yet | Verify domain and submit sitemap after deploy |
| Merchant conversion data | Not live | No approved affiliate programs yet | Check affiliate dashboards after approvals |
| Revenue reporting | Not live | No traffic, clicks, or commissions yet | Start weekly report after first approved link |

## Event Contract

The first money events are:

1. `page_view`
2. `affiliate_click`
3. `matcher_submit`
4. `newsletter_interest`
5. `partner_redirect_ready`

All five launch events are scaffolded locally. They are not live analytics until an approved provider script is connected on the public domain.

## What To Measure Weekly

1. Pageviews by landing page.
2. Organic sessions by money page.
3. Affiliate clicks by page.
4. Affiliate clicks by brand.
5. Click-through rate by page.
6. Search Console impressions by query.
7. Search Console clicks by page.
8. Approved affiliate programs.
9. Merchant-side conversions.
10. Estimated revenue per brand.

## First Revenue Proof

The first real proof target is:

1. One live approved affiliate link.
2. One recorded affiliate click.
3. One matching outbound click visible in analytics.
4. One merchant dashboard visit/conversion/sale signal.

Do not call the site monetized before this proof exists.

## Provider Recommendation

Use a lightweight analytics provider first:

1. Plausible for simple privacy-friendly pageviews and custom events.
2. Google Search Console for SEO performance.
3. Affiliate network dashboards for conversions and commission.

Google Analytics can be added later if we need deeper attribution, but it is not required for the first revenue proof.

## Approval Gate

Do not connect analytics on a public domain until the user approves:

1. The provider.
2. The domain.
3. The tracking script.
4. The privacy wording.

## Post-Launch Setup Order

1. Deploy site.
2. Confirm domain.
3. Confirm `/privacy/` and `/affiliate-disclosure/` are live.
4. Add analytics provider script.
5. Submit sitemap to Search Console.
6. Confirm pageviews.
7. Confirm affiliate-click event.
8. Apply for affiliate programs.
9. Add first approved affiliate URL.
10. Confirm live outbound click and merchant dashboard activity.

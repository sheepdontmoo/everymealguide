# Every Meal Guide Analytics Events

## Goal

Measure which pages and brands produce affiliate intent before spending time on more content.

## Current Local Event

Affiliate CTA clicks push this object to `window.dataLayer`:

```json
{
  "event": "affiliate_click",
  "brand": "Factor",
  "path": "/reviews/factor/",
  "label": "Claim Deal",
  "href": "/go/factor/",
  "affiliateStatus": "apply",
  "pageTitle": "Factor Meals Review | Every Meal Guide",
  "timestamp": "2026-06-23T00:00:00.000Z"
}
```

The last 25 local clicks are also stored in `localStorage` under:

```text
dc_affiliate_clicks
```

This is only a local debugging aid. It is not a production analytics database.

If Plausible is present on the page, the same click also fires:

```text
Affiliate Click
```

with props:

```json
{
  "brand": "Factor",
  "path": "/reviews/factor/",
  "label": "Claim Deal",
  "affiliateStatus": "apply"
}
```

## Production Setup Options

1. GA4: listen for `affiliate_click` in the data layer and mark it as a conversion.
2. Plausible: forward clicks with brand and path as custom properties.
3. Vercel Analytics plus custom endpoint: send click events to a small serverless route later.
4. Cloudflare Web Analytics: use pageview analytics first, then add click tracking separately.

## Minimum Launch Metrics

Track these before scaling content:

1. Pageviews by route.
2. Affiliate clicks by route.
3. Affiliate clicks by brand.
4. Click-through rate from pageview to affiliate click.
5. Top Search Console queries by landing page.

## First Decision Rules

1. If `/deals/best-meal-delivery-deals/` gets clicks but no affiliate approval, prioritize that brand application.
2. If `/best/meal-delivery-services/` gets impressions but weak clicks, improve the first three ranking cards.
3. If `/vs/factor-vs-cookunity/` gets clicks, deepen prepared-meal comparisons before adding more meal-kit pages.
4. If country pages get impressions, localize availability and brand order.

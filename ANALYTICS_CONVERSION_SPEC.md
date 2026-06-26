# Every Meal Guide Analytics And Conversion Spec

This file defines what Every Meal Guide needs to measure before it can honestly claim traffic, affiliate clicks, or revenue progress.

## Measurement objective

Track the path from visitor intent to affiliate click:

1. User lands on a best, country, review, comparison, deal, or home page.
2. User uses navigation, start-here links, or the matcher.
3. User reaches a shortlist, review, comparison, or `/go/` route.
4. User clicks a monetizable brand route.
5. Approved affiliate dashboard records clicks and commissions later.

## Current local event names

The frontend currently emits or is designed around these event names:

- `page_view`
- `matcher_submit`
- `newsletter_interest`
- `affiliate_click`
- `partner_redirect_ready`

## Required analytics destinations

Choose one primary analytics destination before serious traffic work:

- GA4: best if Search Console and ad/remarketing integrations matter later.
- Plausible: best for simple, privacy-friendly page and goal tracking.
- Vercel Analytics: best for fast deployment-side visibility and speed insights.

Recommended setup:

- Use GA4 for durable site analytics and Search Console integration.
- Use Vercel Web Analytics or Speed Insights for deployment-level performance.
- Keep `dataLayer` events so GTM can be added without rewriting site code.

## Event schema

### page_view

Purpose: measure page demand and landing-page performance.

Required properties:

- `path`
- `pageTitle`
- `page_type`
- `timestamp`

Key reports:

- Landing pages by users.
- Landing pages by affiliate click rate.
- Page type performance: best, review, vs, country, deal, home.

### matcher_submit

Purpose: measure whether the homepage/start flow helps users self-select.

Required properties:

- `country`
- `budget`
- `diet`
- `mealType`
- `path`
- `timestamp`

Key reports:

- Most selected meal types.
- Matcher-to-affiliate-click rate.
- Countries with demand but weak pages.

### affiliate_click

Purpose: measure commercial intent before affiliate dashboards are approved or reliable.

Required properties:

- `brand`
- `label`
- `href`
- `affiliateStatus`
- `path`
- `page_type`
- `timestamp`

Key reports:

- Affiliate clicks by brand.
- Affiliate clicks by page.
- Affiliate clicks by page type.
- Placeholder clicks versus approved tracking clicks.

### partner_redirect_ready

Purpose: measure approved partner redirect readiness once real tracking URLs exist.

Required properties:

- `brand`
- `status`
- `path`
- `timestamp`

Key reports:

- Active partner routes.
- Redirect starts by brand.
- Broken or stale redirect checks.

### newsletter_interest

Purpose: measure early demand for deal alerts.

Required properties:

- `sourceSection`
- `path`
- `timestamp`

Key reports:

- Newsletter interest by landing page.
- Newsletter interest by meal type page.

## Conversion goals

Configure these as goals or conversions:

- `affiliate_click`: primary pre-revenue conversion.
- `matcher_submit`: intent conversion.
- `newsletter_interest`: owned-audience conversion.
- `partner_redirect_ready`: approved-route readiness event.

## Attribution rules

Before affiliate approvals:

- Count `affiliate_click` as buyer intent, not revenue.
- Mark status as `placeholder_pending_approval` or equivalent.
- Do not call placeholder clicks commissions.

After affiliate approvals:

- Count approved-network dashboard clicks separately from site-side clicks.
- Count commissions only from affiliate dashboard evidence.
- Reconcile weekly by brand, page, and date.

## Dashboard views needed

Minimum useful dashboard:

- Total users.
- Organic users.
- Top landing pages.
- Top page types.
- Matcher submits.
- Affiliate clicks.
- Affiliate clicks by brand.
- Affiliate clicks by page.
- Newsletter interest.
- Approved partner-route clicks.

## Weekly scorecard

Use this scorecard after analytics are connected:

| Metric | This week | Last week | Notes |
| --- | ---: | ---: | --- |
| Users |  |  |  |
| Organic clicks from Search Console |  |  |  |
| Indexed URLs |  |  |  |
| Top landing page |  |  |  |
| Matcher submits |  |  |  |
| Affiliate clicks |  |  |  |
| Approved affiliate clicks |  |  |  |
| Commissions |  |  |  |
| New affiliate approvals |  |  |  |

## Human gates

- Darren chooses analytics destination.
- Darren owns or approves Google account setup.
- Search Console verification is completed.
- Sitemap is submitted.
- Affiliate dashboards become available after approvals.

## Evidence boundary

Local events and `dataLayer` readiness are not traffic proof. Traffic proof comes from analytics dashboards. Revenue proof comes from affiliate dashboards, payment records, or merchant reporting.

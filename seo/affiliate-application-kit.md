# Every Meal Guide Affiliate Application Kit

## Positioning

Every Meal Guide is a consumer meal-delivery comparison site for normal people choosing between meal kits, prepared meals, budget dinner boxes, high-protein prepared meals, vegetarian options, and country-specific services.

The site is built around high-intent buying pages:

- Best meal delivery services
- Best prepared meal delivery
- Best meal delivery deals
- Factor vs CookUnity
- HelloFresh vs Gousto
- Factor Meals review
- Cheapest meal delivery services

## Why Brands Should Approve Us

1. The pages are commercial and comparison-led, not generic recipe content.
2. Affiliate links are clearly disclosed and marked as sponsored/nofollow.
3. The site has methodology, privacy, affiliate disclosure, and contact pages.
4. Click tracking is already scaffolded with `affiliate_click` events.
5. The content angle protects users from bad-fit subscriptions, which can improve lead quality.

## Priority Applications

### P0

1. Factor
2. HelloFresh
3. CookUnity

### P1

1. Gousto
2. EveryPlate
3. Dinnerly
4. Home Chef

### P2

1. Fresh N Lean
2. Purple Carrot
3. Green Chef

## Network Notes To Check

Common places to check after the domain is live:

1. Impact
2. CJ Affiliate
3. Awin
4. PartnerStack
5. ShareASale
6. Direct brand affiliate pages

Do not assume a network until verified from the brand or affiliate program page.

## Application Website Description

Use this as the short website description:

```text
Every Meal Guide helps consumers choose between meal kits, prepared meal delivery services, budget meal boxes, high-protein meals, and country-specific dinner services. The site focuses on high-intent comparison pages, deal pages, reviews, and buyer checklists that help readers compare fit, value, convenience, dietary needs, and subscription terms before ordering.
```

## Traffic Source Description

Use this as the traffic-source description:

```text
Primary traffic will come from organic search and direct content discovery around meal delivery comparisons, deal pages, service reviews, and long-tail buyer questions such as "Factor vs CookUnity", "best prepared meal delivery", "cheapest meal delivery", and "best meal delivery deals". We do not use misleading coupon pages, forced clicks, toolbar traffic, or incentive traffic.
```

## Promotional Method Description

Use this for allowed promotional methods:

```text
We promote brands through editorial comparison pages, buyer guides, review pages, deal roundups, and contextual calls to action. Affiliate links are disclosed, marked as sponsored/nofollow, and placed where they help readers move from comparison to checkout.
```

## Brand Outreach Email

Subject:

```text
Affiliate partnership request for Every Meal Guide
```

Body:

```text
Hi,

I run Every Meal Guide, a consumer comparison site helping people choose between meal kits, prepared meal delivery services, budget meal boxes, and high-protein dinner options.

We are building high-intent buyer pages around searches like best meal delivery services, best prepared meal delivery, best meal delivery deals, Factor vs CookUnity, and brand reviews. The site includes affiliate disclosure, methodology, privacy, and contact pages, with outbound click tracking already prepared.

I would like to join your affiliate program and promote the brand through comparison-led editorial pages and deal/review content. We do not use misleading coupon pages, forced clicks, toolbar traffic, or incentive traffic.

Could you point me to the right affiliate application or approve Every Meal Guide for the program?

Thanks,
Every Meal Guide
```

## Application Checklist

Before applying:

1. Final domain is live.
2. Homepage loads.
3. `/best/meal-delivery-services/` loads.
4. `/deals/best-meal-delivery-deals/` loads.
5. `/methodology/` loads.
6. `/affiliate-disclosure/` loads.
7. `/privacy/` loads.
8. `/contact/` has a real email.
9. Site has no placeholder affiliate claims.
10. Sitemap is live.

After approval:

1. Add approved URL to `affiliatePrograms` in `tools/generate-pages.mjs`.
2. Run `npm run build`.
3. Confirm `/go/{brand}/` redirects correctly.
4. Confirm `rel="sponsored nofollow"` remains on CTAs.
5. Confirm analytics records `affiliate_click`.
6. Update `seo/affiliate-program-targets.csv` status.

## Rejection Recovery

If rejected:

1. Improve the top three money pages.
2. Add proof of organic strategy and site architecture.
3. Add more brand-neutral content so the site does not look like a thin bridge page.
4. Reapply after the domain has indexed pages and visible traffic.

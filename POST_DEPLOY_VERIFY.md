# Every Meal Guide Post-Deploy Verification

## Purpose

Prove the public site is actually live and ready for affiliate applications, indexing, and analytics setup.

Do not mark launch complete until these checks pass on the public domain.

## Public URL

```text
https://yourdomain.com
```

## Required Live Checks

| Check | URL | Expected | Evidence |
|---|---|---|---|
| Homepage | `/` | 200, correct title/H1 |  |
| Best page | `/best/meal-delivery-services/` | 200, ranking cards visible |  |
| Deals page | `/deals/best-meal-delivery-deals/` | 200, deal table visible |  |
| VS page | `/vs/factor-vs-cookunity/` | 200, comparison visible |  |
| Review page | `/reviews/factor/` | 200, review visible |  |
| Methodology | `/methodology/` | 200 |  |
| Affiliate disclosure | `/affiliate-disclosure/` | 200 |  |
| Privacy | `/privacy/` | 200 |  |
| Contact | `/contact/` | 200, real email visible |  |
| Sitemap | `/sitemap.xml` | 200, final domain URLs |  |
| Robots | `/robots.txt` | 200, final domain sitemap |  |

## Browser Checks

Run on desktop and mobile:

1. No obvious layout break.
2. No horizontal overflow.
3. Sticky mobile CTA does not block critical text.
4. Affiliate CTAs route to `/go/{brand}/`.
5. `/go/{brand}/` pages are `noindex,follow` until approved links are configured.

## Analytics Checks

After analytics is connected:

1. Pageview appears for homepage.
2. Pageview appears for one money page.
3. Click an affiliate CTA.
4. Confirm `affiliate_click` event is captured in chosen analytics or debug tooling.

## Search Console Checks

1. Add property.
2. Verify property.
3. Submit `/sitemap.xml`.
4. Confirm sitemap can be fetched.

## Affiliate Application Readiness

Before applying:

1. Public domain is live.
2. Contact email works.
3. Methodology page is live.
4. Affiliate disclosure page is live.
5. Best/deal/review pages are live.
6. No fake price or testing claims are present.

## Launch Complete Criteria

Launch can be called complete only when:

1. Public site loads on final domain.
2. Sitemap and robots use final domain.
3. Contact email is real.
4. Visual QA has no P0/P1 issues.
5. Search Console sitemap is submitted.
6. Analytics is connected.

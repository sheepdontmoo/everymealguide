# Every Meal Guide Post-Launch Operating Loop

Status date: 2026-06-24

Purpose: make sure the site turns launch data into revenue decisions instead of drifting into random edits.

## Live Baseline

- Primary site: https://www.everymealguide.com/
- Apex: https://everymealguide.com/
- Sitemap: https://www.everymealguide.com/sitemap.xml
- Robots: https://www.everymealguide.com/robots.txt
- Google verification path: https://www.everymealguide.com/googlea432a8df6c28372f.html
- Deployment state: Vercel reports apex and www configured correctly for project `dinner-compare`.

## Immediate Post-Deploy Gates

1. Click Verify in Google Search Console.
2. Submit the sitemap.
3. Connect analytics.
4. Confirm pageview, affiliate-click, and partner-redirect events.
5. Start P0 affiliate applications only after Search Console/analytics ownership is clear.

## Weekly Report Command

After the site is live and analytics/Search Console/affiliate dashboards have data, create the weekly report with:

```powershell
npm.cmd run report:weekly -- YYYY-MM-DD
```

Use the Monday date for `YYYY-MM-DD`.

## Weekly Decision Order

1. Check Search Console impressions and clicks.
2. Check analytics pageviews.
3. Check affiliate clicks by page and brand.
4. Check affiliate approval state.
5. Check merchant-side conversions or sale signals.
6. Refresh source notes for any promoted offer that changed.
7. Improve pages with impressions but weak clicks.
8. Improve CTAs where traffic exists but affiliate clicks are weak.
9. Pause or demote any brand with source or availability risk.
10. Pick the next page only if it has clear commercial intent.

## First 30 Days Focus

Do not judge the site by revenue before the basic chain exists:

1. Indexed pages.
2. Search impressions.
3. Search clicks.
4. Affiliate clicks.
5. Approved affiliate programs.
6. Merchant-side conversion signal.

## Revenue Rule

The site becomes a real money asset only when page traffic, affiliate clicks, approvals, and merchant-side proof are connected in the weekly report.

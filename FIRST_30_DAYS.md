# Every Meal Guide First 30 Days Plan

## Objective

Get Every Meal Guide from local launch candidate to a live, indexed, affiliate-applying consumer comparison site with a clear feedback loop.

## Week 0: Launch Prep

1. Pick and buy domain using `DOMAIN_DECISION.md`.
2. Create contact mailbox.
3. Build with final environment variables:

```powershell
$env:SITE_URL="https://yourdomain.com"
$env:CONTACT_EMAIL="hello@yourdomain.com"
npm run build
```

4. Run:

```powershell
npm run audit:visual
npm run audit:launch
```

5. Run browser-led visual QA from `VISUAL_QA_CHECKLIST.md`.
6. Deploy to Vercel.
7. Confirm live homepage, sitemap, robots, contact, privacy, disclosure, methodology, and top money pages.

## Week 1: Index And Affiliate Applications

1. Add site to Google Search Console.
2. Submit sitemap.
3. Add analytics and confirm pageviews.
4. Confirm `affiliate_click` event tracking.
5. Apply to P0 affiliate programs:
   - Factor
   - HelloFresh
   - CookUnity
6. Deepen:
   - `/best/meal-delivery-services/`
   - `/deals/best-meal-delivery-deals/`
   - `/vs/factor-vs-cookunity/`

## Week 2: Prepared Meal Cluster

1. Deepen `/reviews/factor/`.
2. Deepen `/best/prepared-meal-delivery/`.
3. Deepen `/best/high-protein-meal-delivery/`.
4. Add or improve internal links between prepared-meal pages.
5. Check affiliate application status.
6. If rejected, improve the relevant page and reapply after indexing.

## Week 3: Meal Kit And Budget Cluster

1. Deepen `/reviews/hellofresh/`.
2. Deepen `/vs/hellofresh-vs-home-chef/`.
3. Deepen `/vs/everyplate-vs-dinnerly/`.
4. Deepen `/best/cheap-meal-delivery/`.
5. Apply to P1 affiliate programs where the site is eligible:
   - Gousto
   - EveryPlate
   - Dinnerly
   - Home Chef

## Week 4: Expand Based On Evidence

1. Review Search Console queries and impressions.
2. Review top landing pages.
3. Review affiliate clicks by brand and page.
4. Prioritize pages with:
   - impressions but weak clicks
   - pageviews but weak affiliate clicks
   - affiliate clicks but no approved program
5. Improve the top 3 opportunity pages.
6. Add approved affiliate URLs and redeploy as approvals arrive.

## Daily 20-Minute Loop

1. Check if the site is live.
2. Check analytics.
3. Check Search Console if available.
4. Check affiliate inbox/status.
5. Improve one money page or one internal-link path.
6. Record the day’s move.

Use `daily/YYYY-MM-DD.md` as the daily log template.

## Success Metrics By Day 30

Minimum:

1. Site live.
2. Sitemap submitted.
3. Analytics connected.
4. P0 affiliate applications submitted.
5. At least 6 P0 pages deepened.
6. At least 1 affiliate approval or clear reapplication path.

Strong:

1. 20+ indexed pages.
2. Search Console impressions across P0/P1 pages.
3. Affiliate clicks recorded.
4. P0 approvals in progress or accepted.
5. First monetized outbound clicks through real links.

## Do Not Do In First 30 Days

- Do not publish recipe content.
- Do not chase social content before money pages are indexed.
- Do not add fake prices or fake coupons.
- Do not buy ads before affiliate links and tracking work.
- Do not expand into unrelated food niches before comparison pages get data.

# Every Meal Guide SEO Traffic Runbook

This is the operating loop for traffic and revenue readiness. It is deliberately consumer-first, not B2B, not recipe blogging, and not generic content farming.

## Core principle

Every page should help a normal buyer answer one question:

"Which meal delivery service should I use for my country, budget, diet, household, and cooking style?"

If a page does not move a visitor toward a useful comparison, review, deal, or tracked `/go/` route, it is not priority work.

## Source files

- Full buyer-intent queue: `C:\codex\dinner-compare\seo\buyer-intent-seo-queue.csv`
- First sprint queue: `C:\codex\dinner-compare\seo\buyer-intent-top-50.csv`
- Brand universe: `C:\codex\dinner-compare\seo\global-brand-universe.csv`
- SEO handoff: `C:\codex\dinner-compare\SEO_TRAFFIC_HANDOFF.md`

## Daily SEO loop

1. Open `buyer-intent-top-50.csv`.
2. Pick the highest-priority row that is not polished.
3. Improve the page for one buyer intent only.
4. Add internal links to the next best comparison, review, deal, country, and `/go/` route.
5. Add or improve source-backed caveats where needed.
6. Do not invent prices, reviews, tests, ratings, or current offers.
7. Record the next action in the queue if the page still needs work.
8. Deploy only when Darren explicitly asks to ship.
9. After deploy, submit or request indexing only when Search Console access is confirmed.

## Page improvement checklist

Every priority page should have:

- One clear H1 that matches the buyer query.
- A short quick answer within the first screen.
- A "best for" shortlist that separates meal kits from prepared meals.
- A comparison table with price-risk, prep time, meal type, diet fit, country/availability, and current offer status.
- Clear affiliate disclosure near money links.
- At least one tracked `/go/` CTA for each monetizable brand.
- Alternatives for users who chose the wrong format.
- Internal links to reviews, comparisons, deals, country pages, and related meal-type pages.
- A caveat for intro discounts versus normal subscription price.
- A note that availability and final price must be checked at checkout.

## Money-page order

Work in this order unless live data says otherwise:

1. `best/meal-delivery-services`
2. `best/prepared-meal-delivery`
3. `best/meal-kits`
4. `best/high-protein-meal-delivery`
5. `best/cheap-meal-delivery`
6. `deals/best-meal-delivery-deals`
7. Top country pages from the queue
8. Top review pages from the queue
9. Top comparison pages from the queue

## Search Console and indexing

Human gate first:

- Verify `https://www.everymealguide.com/` in Google Search Console.
- Submit `https://www.everymealguide.com/sitemap.xml`.
- Confirm whether the HTML verification redirect is accepted by Google.

After that:

- Inspect the homepage.
- Inspect the sitemap.
- Request indexing for the top commercial pages only.
- Track impressions, clicks, and indexed status weekly.

## Affiliate and cash routing

Do not redirect `/go/` pages to merchants until approved affiliate URLs exist.

For each affiliate-approved brand:

1. Add the approved tracking URL to `affiliate-programs.json` or the active affiliate mapping.
2. Regenerate pages if needed.
3. Confirm the `/go/brand/` page uses `rel="sponsored nofollow"`.
4. Confirm event tracking still records the click.
5. Mark the brand as approved in the affiliate control file.

## What good looks like

The site should feel like:

- Wirecutter-style decision clarity.
- Finder-style comparison breadth.
- MoneySavingExpert-style caution around deals.
- A normal-person dinner helper, not a SaaS dashboard and not a recipe blog.

## Hard no

- No fake hands-on testing.
- No fake ratings.
- No invented prices.
- No claiming current deals without a source and date.
- No hiding affiliate status.
- No broad recipe content until commercial pages are indexed and getting traffic.
- No paid API, crawling, or browser-agent work without a clear growth use case and Darren's approval.

# Every Meal Guide SEO / Traffic Handoff

Use this file only if Darren wants a dedicated traffic-and-SEO chat. The main build chat remains the command centre for product, design, deployment, affiliate gates, and cash readiness.

## Current objective

Make Every Meal Guide the global consumer meal-delivery comparison engine: meal kits, prepared meals, high-protein meal prep, diet meals, frozen meals, kids meals, grocery dinner shortcuts, and country-specific options. The SEO lane exists to turn that engine into traffic, affiliate clicks, and eventual revenue.

## Latest instruction

Darren asked whether a separate chat is needed for traffic and SEO only. Recommended answer: not immediately, but useful after the site clarity pass. This file prepares that future focused chat without forcing a handoff.

## Primary URL and local project

- Live domain: https://www.everymealguide.com/
- Apex domain: https://everymealguide.com/
- Local project: `C:\codex\dinner-compare`
- Vercel project: `dinner-compare`
- Public brand: Every Meal Guide

## Current positioning

Every Meal Guide helps normal people answer:

"What meal delivery service should I use for my country, budget, diet, household, and cooking style?"

The site must separate:

- Meal kits: ingredients and recipes you cook yourself.
- Prepared meals: heat-and-eat dinners.
- High-protein meal prep: fitness and macro-friendly options.
- Diet-specific meals: keto, vegetarian, vegan, gluten-free, weight-loss, specialist plans.
- Family and kids meals: household-friendly dinner planning.
- Frozen meals: freezer-ready easy dinners.
- Grocery and dinner shortcuts: boxes, produce, and supermarket-led solutions.

## Current local evidence

- `seo/global-brand-universe.csv` currently contains 917 coverage rows.
- The same CSV currently contains 883 unique brands.
- The same CSV currently contains 81 country values.
- Homepage now starts with a clearer "choose meal type first" route.
- Quick matcher now routes users toward the correct money page instead of only scrolling.
- Generated page template now adds a clearer quick-answer sentence about choosing format first.
- Static generated pages were regenerated locally after the clarity patch.

## What is live versus local

- The domain and Vercel deployment are live.
- The latest clarity/design patch is local unless it has been redeployed after this handoff was created.
- Do not tell Darren the latest changes are live until a fresh Vercel deploy succeeds.

## Human gates

- Google Search Console: click Verify for the uploaded HTML verification method.
- Google Search Console: submit `https://www.everymealguide.com/sitemap.xml`.
- Analytics ownership: choose/confirm GA4, Plausible, Vercel Analytics, or another system.
- Affiliate approvals: apply to programs and wait for acceptance.
- Affiliate URLs: replace placeholder `/go/` destinations only after approved tracking links exist.
- Legal/business: final affiliate disclosure, privacy, terms, company/contact details.

## Traffic strategy

The fastest traffic path is not generic blogging. Build and improve pages in this order:

1. Best pages by meal type: prepared meals, meal kits, high-protein, cheap, family, vegan, keto, gluten-free, frozen.
2. Country pages: US, UK, Canada, Australia, Ireland, New Zealand first, then other English-search markets.
3. Comparison pages: `brand vs brand`, especially HelloFresh, Factor, Gousto, CookUnity, EveryPlate, Dinnerly, Home Chef, Green Chef, Purple Carrot, Marley Spoon, Chefs Plate, Youfoodz.
4. Deal pages: current offers, first-box traps, second-box cost, cancellation rules.
5. Review pages: the top 50 brands by search demand and affiliate potential.
6. Internal links: every best page links to relevant country pages, comparisons, reviews, deals, and `/go/` routes.

## SEO-only chat first tasks

1. Confirm whether the latest local changes have been deployed.
2. Confirm Search Console verification and sitemap submission status.
3. Build a source-of-truth SEO queue with columns:
   `page_type, keyword, url, country, meal_type, monetization_status, current_status, priority, next_action`.
4. Prioritize 50 pages that can realistically bring buyer-intent traffic.
5. Improve those pages for above-the-fold clarity, comparison tables, quick answers, source notes, affiliate disclosure, and internal links.
6. Prepare affiliate application support pages and copy using the live domain.
7. Create a weekly reporting loop: indexed pages, impressions, clicks, top queries, affiliate clicks, approved programs, revenue.

## What not to do

- Do not chase random recipe content.
- Do not publish fake reviews, fake ratings, fake testing, or invented prices.
- Do not claim affiliate approval until the program confirms acceptance.
- Do not redirect `/go/` pages to merchants until approved affiliate URLs exist.
- Do not make the site UK-only or Ireland-only.
- Do not turn this into B2B or employer lead-gen.
- Do not run expensive broad crawls, paid APIs, or long browser agents without Darren's approval.

## Suggested fresh-chat prompt

Use `C:\codex\dinner-compare\SEO_TRAFFIC_HANDOFF.md` and run traffic/SEO only for Every Meal Guide. First confirm deploy/Search Console/sitemap status, then create and execute the 50-page buyer-intent SEO queue without touching unrelated build work.

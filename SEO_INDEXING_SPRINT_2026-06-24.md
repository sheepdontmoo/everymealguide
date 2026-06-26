# Every Meal Guide SEO Indexing Sprint - 2026-06-24

Role: SEO / indexing operator  
Goal: build the route from first Google discovery to 10,000+ organic visits without claiming indexing, traffic, affiliate approval, or revenue before dashboard proof exists.

## Guardrails

- Do not deploy from this sprint.
- Do not use git from this sprint.
- Do not claim Search Console submission, URL inspection, indexing request, indexed status, impressions, clicks, or revenue unless the relevant dashboard confirms it.
- Work from already live/public page groups first: `/start/`, the buyer guide, top-pick pages, country pages, and comparison pages.
- Keep `/go/` affiliate language conservative until approved affiliate tracking URLs exist.

## Starting evidence from current files

| Item | Current evidence | Sprint action |
| --- | --- | --- |
| Search Console property | `GOOGLE_SEARCH_CONSOLE_VERIFICATION.md` says `https://www.everymealguide.com/` is verified. | Use this property only; do not create another property unless Darren asks. |
| Verification method | HTML upload file `googlea432a8df6c28372f.html`. | Keep file live and do not remove it. |
| Robots | `robots.txt` allows all and points to `https://www.everymealguide.com/sitemap.xml`. | No robots change needed. |
| Sitemap in GSC | Current docs say sitemap was submitted on 24 June 2026, processed successfully, with 51 discovered pages. | Treat this as the last recorded GSC state, not proof that newer URLs are discovered. |
| Local sitemap | Local `sitemap.xml` currently contains 3,746 URLs. | After the current sitemap is confirmed live or deployed by an approved deployer, recheck/resubmit in GSC and record the new discovered count. |
| GSC data | Docs say Performance and Page indexing reports are still processing / no query data yet. | Sprint starts with inspection and indexing requests, then weekly reporting once data arrives. |

## Traffic path to 10,000+ organic visits

The fastest path is not generic blog content. It is a layered buyer-intent index:

1. Get the strongest 20 URLs crawled, inspected, and internally promoted.
2. Polish the top 50 buyer-intent pages from `seo/buyer-intent-top-50.csv`.
3. Use Search Console impressions to identify pages ranking 8-30, then improve titles, intros, tables, internal links, and answer capsules.
4. Scale only after signal: country pages, brand reviews, brand-vs-brand comparisons, and deal pages.
5. Build toward either 50 pages averaging 200 visits/month or 200 pages averaging 50 visits/month, then expand from pages already getting impressions.

## Exact Google Search Console steps

Use these steps manually. This file does not mean any submission was performed.

### 1. Confirm property

1. Open Google Search Console.
2. Select the URL-prefix property: `https://www.everymealguide.com/`.
3. Confirm ownership still shows verified.
4. Open Settings and confirm `robots.txt` remains valid.

### 2. Confirm or resubmit sitemap

1. In the left menu, open `Sitemaps`.
2. In `Add a new sitemap`, enter:

```text
sitemap.xml
```

3. Submit only if the current live sitemap should be refreshed in Google.
4. Open the submitted sitemap detail page.
5. Record:
   - submitted date
   - last read date
   - status
   - discovered pages
   - discovered videos
6. If discovered pages still show 51 after the larger sitemap is live, keep this as a recrawl delay, not a technical success claim.

### 3. Inspect priority URLs

For each priority URL:

1. Paste the full URL into the top `URL inspection` field.
2. Wait for the live result.
3. Record one of:
   - `URL is on Google`
   - `URL is not on Google`
   - `Discovered - currently not indexed`
   - `Crawled - currently not indexed`
   - blocked by robots/noindex/canonical/redirect/404
4. If there is no blocker and the page is important, click `Request indexing`.
5. If there is a blocker, do not request indexing. Fix or hand off the blocker first.
6. Keep indexing requests bounded: inspect all 20 if needed, but request indexing for the first 10 highest-priority non-blocked pages first.

### 4. Record evidence

Create or update a daily note in `daily/YYYY-MM-DD.md` with:

```text
url,status_in_gsc,indexing_request_sent,request_date,next_action,notes
```

Do not mark a URL indexed until Search Console says it is indexed.

## Next 20 URLs to request indexing or internally promote

Priority logic: one decision entry page, one buyer guide, top commercial pages, top country pages, then high-intent comparison pages. The homepage should be inspected as a baseline separately, but this list is the 20-page sprint queue.

| Priority | URL | Page type | Action | Internal promotion target |
| ---: | --- | --- | --- | --- |
| 1 | `https://www.everymealguide.com/start/` | decision flow | Inspect and request indexing if not indexed. | Link from homepage hero, top nav, and buyer guide. |
| 2 | `https://www.everymealguide.com/guides/how-to-choose-meal-delivery/` | buyer guide | Inspect and request indexing if live and indexable. | Link from `/start/`, homepage, and every top-pick page. |
| 3 | `https://www.everymealguide.com/best/meal-delivery-services/` | top pick | Inspect and request indexing first commercial page. | Link from homepage, `/start/`, guide, countries, comparisons. |
| 4 | `https://www.everymealguide.com/best/prepared-meal-delivery/` | top pick | Inspect and request indexing. | Link from prepared-meal answers, Factor/CookUnity reviews, comparison pages. |
| 5 | `https://www.everymealguide.com/best/meal-kits/` | top pick | Inspect and request indexing. | Link from guide, HelloFresh/Gousto/EveryPlate comparisons, UK country page. |
| 6 | `https://www.everymealguide.com/best/high-protein-meal-delivery/` | top pick | Inspect and request indexing. | Link from prepared meal pages and high-protein brand reviews. |
| 7 | `https://www.everymealguide.com/best/cheap-meal-delivery/` | top pick | Inspect and request indexing. | Link from deals page, budget meal kit page, and comparison pages. |
| 8 | `https://www.everymealguide.com/best/meal-kits-for-families/` | top pick | Inspect and request indexing if quota allows. | Link from guide, meal-kit page, and country pages. |
| 9 | `https://www.everymealguide.com/best/vegan-meal-delivery/` | top pick | Inspect and request indexing if quota allows. | Link from guide, plant-based reviews, and Green Chef/Purple Carrot comparison. |
| 10 | `https://www.everymealguide.com/best/keto-meal-delivery/` | top pick | Inspect and request indexing if quota allows. | Link from diet/healthy pages with medical-claim caveat. |
| 11 | `https://www.everymealguide.com/best/gluten-free-meal-delivery/` | top pick | Internally promote first; request after top 10 if no blocker. | Link from guide and diet pages with cross-contamination caveat. |
| 12 | `https://www.everymealguide.com/deals/best-meal-delivery-deals/` | deals | Inspect and request indexing once offer wording is source-safe. | Link from all top-pick pages and `/start/` result states. |
| 13 | `https://www.everymealguide.com/countries/us/best-meal-delivery/` | country | Inspect and request indexing after local intro is acceptable. | Link from homepage country section, guide, and top-pick pages. |
| 14 | `https://www.everymealguide.com/countries/uk/best-meal-delivery/` | country | Inspect and request indexing after local intro is acceptable. | Link from homepage country section, guide, and HelloFresh/Gousto comparison. |
| 15 | `https://www.everymealguide.com/countries/australia/best-meal-delivery/` | country | Inspect and request indexing after local intro is acceptable. | Link from homepage country section and relevant Australian reviews. |
| 16 | `https://www.everymealguide.com/countries/canada/best-meal-delivery/` | country | Inspect and request indexing after local intro is acceptable. | Link from homepage country section and relevant Canadian reviews. |
| 17 | `https://www.everymealguide.com/countries/ireland/best-meal-delivery/` | country | Internally promote first; request after first country batch. | Link from country hub and UK/Ireland-friendly guide sections. |
| 18 | `https://www.everymealguide.com/meal-delivery-comparisons/` | comparison hub | Inspect and request indexing. | Link from homepage, guide, top-pick pages, and footer. |
| 19 | `https://www.everymealguide.com/vs/hellofresh-vs-gousto/` | comparison | Inspect and request indexing. | Link from meal-kit page, UK page, comparison hub, and guide. |
| 20 | `https://www.everymealguide.com/vs/factor-vs-cookunity/` | comparison | Inspect and request indexing. | Link from prepared-meal page, comparison hub, and Factor/CookUnity reviews. |

## Internal linking sprint

Do this before requesting indexing for weaker pages:

- Homepage: link prominently to `/start/`, buyer guide, top three best pages, country hub, and comparison hub.
- `/start/`: every result state should point to one top-pick page, one country page where relevant, one comparison page, and the buyer guide.
- Buyer guide: add a "choose your route" block linking to meal kits, prepared meals, cheap, high-protein, family, vegan, countries, and comparisons.
- Top-pick pages: add links to `/start/`, buyer guide, deals page, relevant country pages, and 2-3 comparison pages.
- Country pages: link back to the global best page, relevant meal type pages, comparison hub, and country-specific reviews.
- Comparison pages: link to both brand reviews, the relevant top-pick page, deals page, and country page.

## 7-day indexing and traffic sprint

| Day | Work | Evidence to capture |
| --- | --- | --- |
| 24 Jun | Create sprint plan, confirm current docs, set first 20 URL queue. | This file. |
| 25 Jun | In Search Console, inspect homepage baseline plus priorities 1-10. Request indexing only for non-blocked priority pages. | URL inspection statuses and request timestamps. |
| 26 Jun | Inspect priorities 11-20. Internally promote pages that are weak or not worth request quota yet. | GSC statuses plus internal link notes. |
| 27 Jun | Polish top-pick pages 1-5 from `seo/buyer-intent-top-50.csv`. | Changed page notes, no traffic claims. |
| 28 Jun | Polish top-pick pages 6-10 and deals page. | Changed page notes, offer caveat checks. |
| 29 Jun | Country pass: US, UK, Australia, Canada, Ireland. | Local editorial notes, internal links, GSC statuses if inspected. |
| 30 Jun | Comparison pass: hub, HelloFresh vs Gousto, Factor vs CookUnity, and next 5 comparison pages from GSC impressions or queue. | GSC status and next comparison queue. |
| 1 Jul | Weekly scorecard: indexed priority URLs, impressions, clicks, analytics users/events, blockers, next 50-page plan. | Dashboard-derived metrics only. |

## What to check once Search Console data appears

Prioritize pages by:

1. Pages with impressions but no clicks.
2. Pages ranking around positions 8-30.
3. Pages discovered but not indexed.
4. Pages crawled but not indexed.
5. Pages indexed but with poor title fit.

For each page, improve:

- title and meta description
- first-screen quick answer
- comparison table
- "best for / not for" verdict
- internal links to the next commercial step
- source-safe caveats around pricing, discounts, availability, and affiliate status

## Do-not-claim list

- Sitemap submitted today: not claimed by this file.
- URL inspection performed: not claimed by this file.
- Indexing requested: not claimed by this file.
- URL indexed: only claim after GSC confirms.
- Organic traffic: only claim after GSC or analytics confirms.
- Affiliate revenue: only claim after affiliate/payment dashboard confirms.

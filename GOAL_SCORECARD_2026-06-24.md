# Every Meal Guide goal scorecard - 2026-06-24

## North star

Help consumers choose the right meal delivery service quickly and confidently.

The database is support. The product mission is that a visitor can answer:

> What meal delivery service should I use?

within 60 seconds of landing on the site.

## Current evidence snapshot

Latest observed production build output showed:

- `891` unique brand review pages generated.
- `891` `/go/` offer-check routes generated.
- `2,801` comparison pages generated.
- `303` use-case pages generated.
- `225` core pages generated.
- `243` planned country/category pages created plus `32` preserved.
- Public copy guard passed in Vercel build.

Latest live recommendation work added:

- 60-second promise.
- Inline matcher result.
- Instant-answer cards.
- Decision checklist.
- Recommendation trust rationale.
- Concrete starting-picks strip.
- Decision-path click tracking.
- Homepage mission guard.
- Decision funnel analytics spec.

## Success metric status

| Metric | Target | Current status | Evidence strength | Next action |
| --- | ---: | --- | --- | --- |
| Brands covered | 1,000+ | 879 generated review/go routes observed | Strong from build output | Add at least 121 verified serious brands or brand-market rows before making the claim |
| Countries covered | 50+ | Homepage snapshot previously showed 81 markets, but current distinct country proof needs a fresh count | Medium | Add/run a country-count report before claiming complete; keep new countries as targets until source-backed |
| SEO landing pages | 10,000+ | Roughly 5,000+ generated public page routes observed from build components | Medium | Expand comparison/category/use-case generation only from verified brand facts |
| Eligible brands linked via `/go/` | 100% | 879 `/go/` routes generated for 879 unique brands | Strong for current brand universe | Keep `generate-cash-ready-routes` in build |
| Affiliate/direct applications submitted | 100+ | 0 submitted by confirmed evidence | Strong | Requires account login and explicit approval |
| Core Web Vitals pass rate | 90%+ | Not proven | Missing | Needs Lighthouse/PageSpeed or Vercel analytics check |
| Homepage purpose under 5 sec | Yes | Local homepage copy now supports it, not yet live/deployed for latest local edits | Medium | Deploy and browser spot-check only when approved |
| Recommendation under 3 clicks | Yes | Local homepage supports answer in 1 click and shortlist in 2 clicks | Medium | Deploy and measure `matcher_result_shown` / `decision_path_click` when approved |
| First affiliate revenue | Generated | Not achieved | Strong | Requires approved affiliate links and traffic |
| Monthly affiliate clicks | 100 / 1,000 | Not proven | Missing | Requires analytics destination |
| Monthly organic visitors | 10,000 / 100,000 | Not proven | Missing | Requires Search Console/analytics |

## Coverage sprint now defined

See `COVERAGE_EXPANSION_SPRINT_2026-06-24.md` for the next coverage plan.

Immediate coverage priorities:

1. Add 121 verified serious brand-market rows before any 1,000-brand claim.
2. Fill lower-localization country targets first: New Zealand, Singapore, South Africa.
3. Add Western Europe and Nordic targets as verified provider rows, not broad market claims.
4. Deepen US, UK, Ireland, Canada, and Australia with regional prepared-meal, high-protein, vegan, family, and frozen providers.
5. Require official URL, delivery-area evidence, active-service signal, source-backed category tags, evidence URL, and check date before page generation.

## Immediate next moves

1. Build the next expansion queue from official-source checks only.
2. Convert verified rows into category-country and comparison page inputs only when provider density is useful.
3. Deploy the local homepage decision upgrades when approved.
4. Verify Search Console and submit sitemap when access is available.
5. Confirm analytics destination for `decision_path_click`, `matcher_result_shown`, and `affiliate_click`.
6. Start affiliate applications from `outreach/affiliate-application-targets-2026-06-24.csv` only after exact-batch approval.
7. Expand landing-page generation toward 10,000 pages only after public-copy guard stays green and page inputs are source-backed.

## Human gates

- Approve production deploy of local UX changes.
- Google Search Console access.
- Analytics ownership/tool choice.
- Affiliate network accounts and submission approval.
- Approved tracking URLs before any real affiliate links are activated.
- Legal/business review for disclosures and commercial claims.

## Subagent acceleration results

Four parallel lanes were created to move toward 100% faster:

| Lane | Output | Next action |
| --- | --- | --- |
| Money / affiliate | `AFFILIATE_BATCH_002_TOP_50_APPLICATION_PLAN.md` | Human submits top-50 applications in priority order; no approval is claimed until network/direct dashboards confirm. |
| SEO / indexing | `SEO_INDEXING_SPRINT_2026-06-24.md` | Use Search Console to submit sitemap and request indexing for the first 20 URLs. |
| Coverage / data | `COVERAGE_EXPANSION_SPRINT_2026-06-24.md` | Add 121 source-accountable brand-market rows before claiming 1,000+ brands. |
| UX / trust | `/start/` and homepage CTA improvements | Continue manual polish on top 20 money pages and add real logos/images where allowed. |

## Production safety update

Vercel build now runs `prune:public-output` after generation and public-copy guard. On Vercel, this removes internal operator directories and root docs/data from the published output while preserving them locally.
# Coverage Expansion Sprint - 2026-06-24

Status: local planning only. No scraping, affiliate submissions, deploys, git actions, or live site changes were made.

## Sprint goal

Move Every Meal Guide from a large generated site toward a source-backed consumer decision engine that can scale to:

- 1,000+ serious brand-market rows.
- 50+ countries with honest coverage status.
- 10,000+ SEO landing pages generated only from verified facts.

The immediate gap from the current scorecard is at least `121` additional verified serious brands or brand-market rows before making any 1,000-brand coverage claim.

## Inputs inspected

- `FULL_THROTTLE_BRAND_EXPANSION.md`
- `GOAL_SCORECARD_2026-06-24.md`
- Existing research source files are present under `research/verified-expansion-wave-*-sources.md`, but this sprint does not treat unread source files as proof by itself.

## Non-negotiable truth rules

1. A brand is not verified until the row has an official source URL, country or delivery-area evidence, and a current active-service signal.
2. A category claim is not verified unless the official menu, plan page, FAQ, or delivery page supports it.
3. Affiliate availability is separate from consumer availability. Do not imply a brand is monetizable just because it is useful coverage.
4. Do not invent reviews, prices, ratings, discount percentages, delivery countries, health outcomes, allergens, or sustainability claims.
5. Do not promote medical or condition-specific claims. For diabetes, renal, GLP-1, pregnancy, senior care, or weight-loss pages, use neutral selection language and require source-backed plan details.
6. If evidence is thin, use `not enough evidence yet`, `watchlist`, or `comparison-only` rather than a recommendation.
7. Country hubs should not claim market-wide coverage until they have enough verified providers to answer at least three common buyer scenarios.

## Next country waves

These are research and verification targets, not coverage claims.

| Wave | Countries | Why next | Minimum evidence before public hub expansion |
| --- | --- | --- | --- |
| A - English/commercial fill | New Zealand, Singapore, South Africa | Lower localization friction and high chance of English consumer search | 3+ active providers, delivery proof, and at least 2 useful categories |
| B - Western Europe | Germany, France, Netherlands, Belgium, Spain, Italy, Portugal, Austria, Switzerland | Large ecommerce markets and likely meal-kit/prepared-meal supply | 5+ active providers per country before any "best" page |
| C - Nordics | Sweden, Denmark, Norway, Finland | Strong consumer subscription markets and clean country pages | 3+ active providers plus clear country-specific availability |
| D - regional depth in proven countries | United States, United Kingdom, Ireland, Canada, Australia | Better decision pages come from regional, diet, price, and delivery nuance | Add regional providers only with delivery-area proof |
| E - second-pass global candidates | India, UAE, Mexico, Brazil, Japan, South Korea, Hong Kong, Taiwan, Poland, Czechia, Greece, Turkey | Helps move toward 50+ countries without pretending every market is mature | Keep as `country_target` until source-backed provider density exists |

## Brand types to add next

Prioritize provider types that directly improve consumer decisions rather than padding the database.

| Priority | Brand type | Decision pages unlocked | Verification requirement |
| --- | --- | --- | --- |
| P0 | National meal-kit services | Best meal kits by country, meal kits vs prepared meals, family meal boxes | Official active country site and current menu/signup path |
| P0 | Prepared ready-meal delivery | Best prepared meals, no-cook dinners, busy weekday meals | Menu, delivery area, storage/reheating details |
| P0 | Regional meal prep providers | Best meal delivery near/in region, high-protein local meal prep | Service area proof and active ordering/menu evidence |
| P1 | Frozen or stock-up ready meals | Best freezer meals, budget stock-up dinners, seniors/busy families | Shipping or delivery proof and meal format evidence |
| P1 | Fitness/high-protein meal prep | High-protein meals, gym/fitness meal prep, calorie-conscious pages | Nutrition/menu evidence without performance claims |
| P1 | Plant-based/vegan providers | Vegan meal delivery, plant-based prepared meals | Official dietary positioning and current menu evidence |
| P1 | Family/kid-friendly providers | Family meal kits, picky-eater dinners, school-night meals | Family serving/plan evidence, not inferred tone |
| P2 | Gluten-free/keto/low-carb/diet preference providers | Filtered diet pages and comparison qualifiers | Official menu/filter evidence; no medical outcome claims |
| P2 | Senior-focused/home meal providers | Senior meal delivery explainers and alternatives | Eligibility, delivery, and service model evidence |
| P3 | Legacy/inactive brands | Alternatives pages and trust coverage | Mark inactive/legacy; do not recommend |

## Verification workflow

Use a row-level evidence checklist before a brand can power public SEO pages.

| Field | Required? | Notes |
| --- | --- | --- |
| brand_name | Yes | Consumer-facing name from official source |
| official_url | Yes | Prefer country-specific official URL |
| country | Yes | Use explicit delivery/service evidence, not headquarters |
| service_area | Yes for regional providers | City, state, province, or national coverage |
| active_service_signal | Yes | Current menu, signup, pricing page, delivery FAQ, or ordering flow |
| category_tags | Yes for page generation | Only tags supported by source evidence |
| commercial_status | Yes | affiliate-ready, affiliate-target, comparison-only, watchlist, blocked |
| evidence_url | Yes | The exact page supporting availability/category |
| evidence_date | Yes | Use current date when checked |
| public_claim_level | Yes | recommended, comparison-only, regional, watchlist, not-enough-evidence, inactive |

## Page generation guardrails

1. Generate review/go routes only for brands with an official URL and a public claim level.
2. Generate `best X in Y` pages only when the country/category pair has at least 3 verified eligible providers.
3. Generate brand-vs-brand pages only when both brands are active and share at least one country or clear consumer alternative relationship.
4. Generate alternatives pages for inactive or unavailable brands only when the inactive/unavailable status is source-backed.
5. Generate diet pages only from verified category tags, and use "may fit" or "compare options" language instead of health promises.
6. Keep weak markets as draft/source-of-truth rows until enough providers exist for a useful page.

## How this avoids spreadsheet UX

The database should stay behind the experience. Public pages should answer a decision quickly:

- Start with a one-sentence recommendation frame: "If you want X, start with Y type of service."
- Use scenario cards: cheapest, fastest, family, high-protein, prepared, flexible subscription.
- Show evidence badges: delivery proof, menu proof, category proof, affiliate status if relevant.
- Use comparison tables only after the answer, not as the main experience.
- Route users into shortlists, quizzes, and country/category guides rather than exposing raw brand rows.

## Consumer decision page support

This sprint supports pages that feel useful even at 10,000+ URLs because each page has a reason to exist.

| Page type | Data needed | Consumer question answered |
| --- | --- | --- |
| Country hub | 3-5+ verified providers by category | "What meal delivery services can I actually use here?" |
| Category-country page | 3+ providers with verified category tag | "What is the best vegan/high-protein/prepared option in my country?" |
| Brand review | official URL, availability, category tags, status | "Is this brand available and worth considering?" |
| Brand comparison | overlapping country/category evidence | "Which of these two should I choose?" |
| Alternatives page | inactive/unavailable proof plus verified substitutes | "What should I use instead?" |
| Use-case page | verified tags plus scenario copy | "What should I pick for my situation?" |

## Sprint output targets

- Add `121` verified serious brand-market rows before any 1,000-brand claim.
- Add at least `20` rows from Wave A/B/C countries to diversify beyond the original core markets.
- Add at least `40` rows that unlock category-country decision pages.
- Add at least `30` regional-provider rows in proven countries where service-area evidence is explicit.
- Tag every new row with `public_claim_level` and `commercial_status` before page generation.
- Keep unverified candidates in research notes or watchlist status, not recommendation pages.

## Recommended next action

Build the next expansion queue from official-source checks only:

1. Fill Wave A first because English pages can be written honestly with lower localization risk.
2. Add Western Europe and Nordics as verified country targets, not broad claims.
3. Deepen US/UK/Canada/Australia/Ireland with regional meal prep and prepared-meal brands that unlock buyer scenarios.
4. Convert only source-backed rows into page generation inputs.
5. Leave affiliate outreach for a separate approval-gated batch.

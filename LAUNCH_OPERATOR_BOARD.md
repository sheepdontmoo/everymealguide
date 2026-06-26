# Every Meal Guide Launch Operator Board

This board ties together the local build, SEO, affiliate, cash-route, analytics, and deployment work. Use it as the single execution surface until the site is genuinely traffic-ready and monetizable.

## Current stage

Local launch-prep is strong. Public/live proof still depends on human and external gates.

## Primary live URL

- https://www.everymealguide.com/

## Local project

- `C:\codex\dinner-compare`

## Deployment command

Use the guarded script only when Darren explicitly approves production deployment:

```powershell
Set-Location C:\codex\dinner-compare
.\DEPLOY_PRODUCTION.ps1
```

The script requires typing `DEPLOY` before it runs the Vercel production command.

## Local readiness files

- Design sprint backlog: `C:\codex\dinner-compare\DESIGN_SPRINT_BACKLOG.csv`
- Template acceptance criteria: `C:\codex\dinner-compare\TEMPLATE_DESIGN_ACCEPTANCE_CRITERIA.md`
- GPT audit response log: `C:\codex\dinner-compare\GPT_AUDIT_RESPONSE_AND_FIX_LOG.md`
- Design skill route: `C:\codex\dinner-compare\DESIGN_SKILL_AND_REPO_ROUTE.md`
- SEO handoff: `C:\codex\dinner-compare\SEO_TRAFFIC_HANDOFF.md`
- SEO runbook: `C:\codex\dinner-compare\SEO_TRAFFIC_RUNBOOK.md`
- SEO full queue: `C:\codex\dinner-compare\seo\buyer-intent-seo-queue.csv`
- SEO top-50 queue: `C:\codex\dinner-compare\seo\buyer-intent-top-50.csv`
- Affiliate pack: `C:\codex\dinner-compare\AFFILIATE_PARTNERSHIP_OPERATING_PACK.md`
- Affiliate tracker: `C:\codex\dinner-compare\affiliate-application-tracker.csv`
- Cash route manifest: `C:\codex\dinner-compare\seo\cash-route-manifest.csv`
- Cash replacement runbook: `C:\codex\dinner-compare\CASH_ROUTE_REPLACEMENT_RUNBOOK.md`
- Analytics spec: `C:\codex\dinner-compare\ANALYTICS_CONVERSION_SPEC.md`
- Post-launch checklist: `C:\codex\dinner-compare\POST_LAUNCH_INDEXING_AND_MEASUREMENT_CHECKLIST.md`

## First seven days after deploy

### Pre-deploy design gate

- Confirm latest local design changes should ship.
- Confirm logo assets display acceptably.
- Confirm consumer pages no longer surface the giant coverage table above the main decision content.
- Confirm affiliate disclosures appear near money links.
- Confirm the design sprint backlog has no blocking item that must ship before public promotion.

### Day 1 - Ship and index

- Deploy latest local build.
- Verify homepage, sitemap, robots, and Google verification file.
- Complete Google Search Console verification.
- Submit sitemap.
- Request indexing for top 10 commercial pages.

### Day 2 - Analytics

- Choose analytics destination.
- Confirm page views.
- Confirm `affiliate_click`.
- Confirm `matcher_submit`.
- Confirm `newsletter_interest`.
- Start the weekly scorecard.

### Day 3 - Affiliate batch one

- Confirm contact email works.
- Review `affiliate-application-tracker.csv`.
- Submit first approved batch only after Darren approval.
- Log submission dates and expected review windows.

### Day 4 - Top pages polish

- Work the first 10 rows of `seo/buyer-intent-top-50.csv`.
- Improve above-the-fold clarity, quick answers, comparison tables, internal links, and `/go/` CTAs.
- Do not invent prices, tests, ratings, or current offers.

### Day 5 - Country pages

- Improve the highest-priority country pages.
- Add local caveats, top local brands, and links to relevant brand reviews and `/go/` routes.

### Day 6 - Comparisons

- Improve highest-intent brand-vs-brand pages.
- Make the winner logic obvious by price, prep effort, diet fit, country availability, and routine.

### Day 7 - Scorecard and next sprint

- Record indexed pages, impressions, clicks, affiliate clicks, applications submitted, approvals, and blockers.
- Decide next sprint from evidence, not vibes.

## First priority URLs

- https://www.everymealguide.com/
- https://www.everymealguide.com/best/meal-delivery-services/
- https://www.everymealguide.com/best/prepared-meal-delivery/
- https://www.everymealguide.com/best/meal-kits/
- https://www.everymealguide.com/best/high-protein-meal-delivery/
- https://www.everymealguide.com/best/cheap-meal-delivery/
- https://www.everymealguide.com/deals/best-meal-delivery-deals/
- https://www.everymealguide.com/vs/hellofresh-vs-gousto/
- https://www.everymealguide.com/vs/factor-vs-cookunity/
- https://www.everymealguide.com/reviews/factor/

## Human gates

- Production deploy approval.
- Search Console verification.
- Sitemap submission.
- Analytics destination and ownership.
- Contact email confirmation.
- Affiliate program applications.
- Affiliate approvals.
- Approved tracking URLs.
- Legal/business final decisions.

## Evidence boundary

Do not claim the latest local work is live until deployment succeeds. Do not claim indexed status until Search Console confirms it. Do not claim traffic until analytics records it. Do not claim revenue until affiliate or payment evidence confirms it.

# Every Meal Guide Launch Checklist

## Launch Target

Get a static, affiliate-ready consumer comparison site live quickly, then grow through high-intent comparison, deals, review, and country pages.

## What Is Ready

- Static homepage with comparison, deals, reviews, countries, and email capture sections.
- Generated SEO page system for best, versus, review, deal, country, and outbound partner-link pages.
- Affiliate links route through `/go/{brand}/` and are marked `sponsored nofollow`.
- Sitemap and robots files exist.
- Methodology, affiliate disclosure, privacy, and contact pages are generated into the site.
- Vercel and Cloudflare Pages deployment notes exist in `DEPLOY.md`.
- SEO source-of-truth files exist in `seo/` for architecture, content briefs, technical audit, and affiliate targets.

## Before Going Live

1. Pick the final domain.
2. Build with `SITE_URL` set to the final domain.
3. Apply for affiliate programs for HelloFresh, Factor, Gousto, CookUnity, EveryPlate, Dinnerly, Home Chef, Fresh N Lean, Purple Carrot, and Green Chef.
4. Add approved affiliate URLs to `affiliatePrograms` in `tools/generate-pages.mjs`.
5. Run `npm run build` with `SITE_URL` and `CONTACT_EMAIL`.
6. Deploy to Vercel or Cloudflare Pages.
7. Submit `/sitemap.xml` in Google Search Console.
8. Add analytics.
9. Confirm the contact page shows a real mailbox once the domain is live.

## First Money Pages To Improve

1. `/best/meal-delivery-services/`
2. `/deals/best-meal-delivery-deals/`
3. `/vs/factor-vs-cookunity/`
4. `/best/prepared-meal-delivery/`
5. `/best/cheap-meal-delivery/`
6. `/reviews/factor/`

Use `seo/content-briefs.md` as the working brief source and `seo/site-architecture.csv` as the page map.

## Growth Loop

1. Publish one comparison page per day for low-competition long-tail queries.
2. Refresh deal pages weekly.
3. Add brand-specific screenshots, current offer notes, cancellation notes, and country availability.
4. Track outbound clicks from `data-track="affiliate-click"`.
5. Use Search Console queries to decide the next batch of pages.

## Operator Files

- `README.md`: project entrypoint, local commands, launch status, and key file map.
- `HANDOFF.md`: compact current state, exact next move, and do-not-redo notes.
- `GENERATOR_NOTES.md`: generator contract and safety rules.
- `seo/site-architecture.csv`: page map and priority source of truth.
- `seo/content-briefs.md`: first P0 money-page briefs.
- `seo/technical-audit.md`: launch and technical SEO gates.
- `seo/affiliate-program-targets.csv`: affiliate application and link tracker.
- `seo/analytics-events.md`: outbound-click event schema and launch measurement plan.
- `seo/affiliate-application-kit.md`: affiliate approval positioning, application copy, and post-approval workflow.
- `seo/cro-backlog.md`: affiliate click-through improvement backlog.
- `brand-style-guide.md`: visual identity, component rules, copy voice, and future image direction.
- `CURRENT_READINESS.md`: current completion score, evidence, and gates to 80/90/100%.
- `DOMAIN_DECISION.md`: domain shortlist, selection criteria, and post-buy steps.
- `seo/30-page-expansion-roadmap.md`: prioritized content expansion plan for commercial search growth.
- `FIRST_30_DAYS.md`: post-launch weekly operating plan for indexing, affiliate applications, and page improvement.
- `daily/YYYY-MM-DD.md`: daily growth and evidence log template.
- `POST_DEPLOY_VERIFY.md`: public-domain verification checklist after deployment.
- `REVENUE_MODEL.md`: $5k/month model, required assumptions, KPI stages, and diagnostics.
- `APPROVAL_GATES.md`: explicit approval boundaries for deploy, domain, affiliate, analytics, and live actions.
- `.gitignore`: prevents local env files, logs, caches, screenshots, and browser artifacts from being published.

## Do Not Fake

- Do not invent exact prices, coupon amounts, or delivery coverage.
- Do not claim first-hand testing until meals are actually tested.
- Do not add affiliate URLs until approved by the relevant program.

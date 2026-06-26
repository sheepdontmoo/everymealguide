# Every Meal Guide Generator Notes

## Entrypoint

```text
tools/generate-pages.mjs
```

Run:

```powershell
npm run build
```

## Environment Variables

```text
SITE_URL
CONTACT_EMAIL
```

Example:

```powershell
$env:SITE_URL="https://yourdomain.com"
$env:CONTACT_EMAIL="hello@yourdomain.com"
npm run build
```

## Generated Outputs

- Best pages under `/best/`
- Comparison pages under `/vs/`
- Deal pages under `/deals/`
- Review pages under `/reviews/`
- Country pages under `/countries/`
- Affiliate holding/redirect pages under `/go/`
- Trust pages:
  - `/methodology/`
  - `/affiliate-disclosure/`
  - `/privacy/`
  - `/contact/`
- `sitemap.xml`
- `robots.txt`
- `affiliate-programs.json`

## Rules That Must Stay True

1. Affiliate CTAs must include `data-track="affiliate-click"`.
2. Affiliate CTAs must include `rel="sponsored nofollow"`.
3. Unapproved affiliate links must route to `/go/{brand}/`.
4. `/go/{brand}/` pages must stay `noindex,follow`.
5. `SITE_URL` must drive canonicals, sitemap, robots, and schema URLs.
6. `CONTACT_EMAIL` must drive contact page email copy.
7. Do not add exact pricing or coupon claims without fresh source checks.
8. Do not claim first-hand meal testing unless testing actually happened.
9. Keep schema aligned with visible content.
10. Regenerate after changing page data.

## Data Layers

Main data objects:

- `affiliatePrograms`
- `brandProfiles`
- `dealProfiles`
- `pages`
- `staticPages`

## Schema

Generated pages use:

- ItemList for best pages.
- Article for comparison pages.
- Review for review pages.
- WebPage for default/static pages.
- BreadcrumbList where appropriate.
- FAQPage where visible FAQ exists.

## Design System Hooks

Generated pages rely on these key classes:

- `money-page`
- `page-hero`
- `hero-verdict-card`
- `quick-answer`
- `ranking-card`
- `fact-list`
- `pros-cons`
- `decision-module`
- `deal-warning-grid`
- `buying-checklist`
- `trust-panel`
- `source-notes`
- `faq-section`
- `sticky-deal-bar`

Do not rename these without updating CSS and visual audit scripts.

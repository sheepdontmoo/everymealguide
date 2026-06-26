# Every Meal Guide Technical SEO Audit

Audit date: 2026-06-23

## Current Local Status

- Static HTML/CSS/JS site in `C:\codex\dinner-compare`.
- Generated pages run from `tools/generate-pages.mjs`.
- Build command: `npm run build`.
- Preview command: `npm run preview`.
- Launch audit command: `npm run audit:launch`.
- Sitemap generated at `/sitemap.xml`.
- Sitemap includes `lastmod`, `changefreq`, and `priority` metadata generated from page type and money-page priority.
- Robots file exists at `/robots.txt` and is generated from `SITE_URL`.
- Affiliate outbound routes live under `/go/{brand}/` and use `noindex,follow`.
- Trust pages exist for methodology, affiliate disclosure, privacy, and contact.
- Affiliate click events push structured `affiliate_click` data into `window.dataLayer`.

## SEO Foundations Present

- Canonical tags on generated pages.
- Meta descriptions on generated pages.
- Open Graph tags on generated pages.
- ItemList schema for best pages.
- Review schema for review pages.
- Article schema for versus pages.
- BreadcrumbList schema for generated money pages and trust pages.
- FAQPage schema for generated pages with visible FAQ sections.
- WebSite schema on homepage.
- Affiliate disclosure text on money pages.
- Sponsored/nofollow attributes on affiliate CTAs.
- Footer links to trust pages.
- Local affiliate-click debug storage for the latest 25 clicks.

## Remaining Launch Gates

1. Final domain is not confirmed.
2. `siteUrl` still uses `https://www.everymealguide.com`.
3. Contact page still needs a real mailbox.
4. Affiliate program approvals and real partner URLs are not added.
5. Brand-specific price/deal/availability facts need live verification before publishing exact claims.
6. Google Search Console and analytics are not connected because site is not live.

## Recommended Deployment Order

1. Choose final domain.
2. Update `siteUrl` in `tools/generate-pages.mjs`.
3. Replace contact launch note with real email.
4. Run `npm run build`.
5. Deploy to Vercel.
6. Add domain DNS.
7. Submit sitemap in Google Search Console.
8. Add analytics and outbound-click event tracking.
9. Confirm `affiliate_click` is recorded as a conversion event in the chosen analytics tool.

## Technical Risks

- Static pages are fast and simple, but current generated copy is still generic.
- Exact pricing/deal claims should not be added without fresh checks.
- Review schema exists, but should not overstate first-hand testing.
- Affiliate redirect pages are placeholders until approvals are complete.

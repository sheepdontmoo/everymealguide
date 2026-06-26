# Approved Affiliate Link Activation - 2026-06-24

## Goal moved forward

The long-term goal requires every monetizable brand to route through `/go/` pages and use approved affiliate or direct partner URLs when available.

This step adds the safe activation path without adding speculative links.

## Local changes made

- Updated `/go/` route generation to read:
  - `APPROVED_AFFILIATE_LINKS.json`
- Added strict activation requirements for each approved link:
  - brand
  - HTTPS URL
  - country
  - destination type
  - source network
  - approval date
  - `ownerConfirmation: true`
- If any approved link is malformed, generation fails instead of silently publishing a bad monetization link.
- If a brand has an approved link, its `/go/` page can show:
  - "Open approved partner offer"
  - sponsored/nofollow link attributes
  - approved partner disclosure
  - official site as a secondary link
- If a brand has no approved link, the page stays an honest offer-check / official-site page.
- Added generated route map:
  - `seo/approved-affiliate-route-map.csv`

## Local generation result

- Regenerated 879 local `/go/` pages.
- Approved routes active: 0
- This is correct because no approved affiliate links are stored yet.
- Ran the public copy sanitizer after generation.

## Boundary

No real affiliate URLs were added.
No applications were submitted.
No partner approvals are claimed.

The site is now technically ready to activate approved tracking URLs quickly after partner acceptance, without using scraped or speculative links.


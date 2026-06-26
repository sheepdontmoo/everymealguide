# Every Meal Guide Affiliate URL Swap Runbook

Status date: 2026-06-23

Use this only after a brand or affiliate network has approved Every Meal Guide and provided an approved tracking URL.

## Command

```powershell
npm.cmd run affiliate:validate-approved
npm.cmd run generate:all
```

Add the approved URL to `APPROVED_AFFILIATE_LINKS.json` first. Do not paste URLs directly into public HTML.

## Approved link record

```json
{
  "brand": "Factor",
  "url": "https://approved-network-or-merchant-url",
  "country": "US",
  "destinationType": "affiliate_offer",
  "sourceNetwork": "Impact / CJ / Awin / ShareASale / direct",
  "approvalDate": "2026-06-24",
  "ownerConfirmation": true
}
```

## Safety Checks Before Running

1. Approval exists in the merchant dashboard or affiliate network.
2. The URL is the exact approved tracking URL.
3. The URL starts with `https://`.
4. The visible offer copy still matches the current merchant page.
5. The brand is already present in `seo/global-brand-universe.csv`.
6. Darren has confirmed the exact URL belongs in `APPROVED_AFFILIATE_LINKS.json`.

## Safety Checks After Running

1. Validate with `npm.cmd run affiliate:validate-approved`.
2. Regenerate with `npm.cmd run generate:all`.
3. Confirm `/go/{brand}/` uses the approved destination only for the approved brand.
4. Confirm CTAs still use `rel="sponsored nofollow"`.
5. Update `seo/affiliate-program-targets.csv`.
6. Add the brand to weekly click/revenue tracking.

## Rollback

If the tracking URL is wrong, remove that brand entry from `APPROVED_AFFILIATE_LINKS.json`, then run `npm.cmd run affiliate:validate-approved` and `npm.cmd run generate:all`.

Do not publish until the incorrect URL is removed or replaced with the correct approved tracking URL.

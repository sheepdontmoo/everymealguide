# Affiliate URL Swap Checklist

Status: local checklist only.

## Before swapping a /go/ route

- Brand program approved.
- Approved URL stored in APPROVED_AFFILIATE_LINKS.json.
- `npm.cmd run affiliate:validate-approved` passes.
- Country-specific URL confirmed where needed.
- Link destination matches page claim.
- Disclosure visible on page.
- No inactive/watchlist brand is promoted.

## After swapping

- Check /go/<brand>/ route loads.
- Confirm outbound destination.
- Confirm analytics event fires if analytics is approved and installed.
- Update source/offer date.
- Add rollback note.

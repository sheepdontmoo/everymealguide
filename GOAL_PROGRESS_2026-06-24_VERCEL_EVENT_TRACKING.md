# Goal Progress - Vercel Event Tracking

Date: 2026-06-24

## What changed

- Added `/api/track` as a lightweight Vercel Function for privacy-safe event logs.
- Wired `emitDinnerCompareEvent` to send public events to `/api/track` with `sendBeacon` or `fetch(..., keepalive)`.
- Events logged include page views, affiliate clicks, decision-path clicks, matcher submits, matcher results, newsletter interest, and partner redirect readiness.
- Updated `ANALYTICS_EVENT_CONTRACT.json` to document Vercel event logs as temporary proof until a full analytics provider is connected.

## Privacy boundary

- No email, checkout data, personal identifiers, or form free-text is collected.
- URLs are stripped to origin and path.
- Event payloads are capped and sanitized before logging.

## Why this moves the cash goal forward

- Gives immediate evidence of `/go/` clicks and decision-path clicks in Vercel logs.
- Helps prove whether buyer-intent traffic is moving toward offer pages.
- Supports affiliate optimization while waiting for approved links, Search Console data, and affiliate dashboard proof.

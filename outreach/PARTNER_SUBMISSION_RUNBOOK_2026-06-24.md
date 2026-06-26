# Partner Submission Runbook - 2026-06-24

## Purpose

Turn the top-100 partner drafts into real affiliate/direct applications without losing evidence quality.

## Hard boundary

The tracker starts at `draft_only_not_submitted`.

Do not change a row to `submitted` unless there is proof:

- confirmation email
- affiliate-network application record
- submitted form screenshot
- sent email record
- CRM/network status page

Do not change a row to `approved` unless the brand, network, or direct partner explicitly approves Every Meal Guide.

Do not add an affiliate URL to `APPROVED_AFFILIATE_LINKS.json` unless approval is confirmed and the URL is approved for use.

## Daily submission workflow

1. Open `outreach/partner-submission-tracker-2026-06-24.csv`.
2. Start at the lowest rank with `draft_only_not_submitted`.
3. Find the official affiliate program, partner page, network listing, or brand contact.
4. Fill `program_url` and `network_or_contact`.
5. Open the matching draft file from `outreach/partner-application-drafts-2026-06-24/`.
6. Review the copy before submitting.
7. Submit manually or approve a sending workflow.
8. Record `submitted_at`, `submitted_by`, and `submission_evidence`.
9. When approved, record the tracking URL in `APPROVED_AFFILIATE_LINKS.json` with `ownerConfirmation: true`.
10. Regenerate `/go/` pages and run click QA before calling the route live-monetized.

## Status values

- `draft_only_not_submitted`
- `submitted_pending_review`
- `approved_tracking_pending`
- `approved_tracking_added`
- `rejected`
- `needs_more_info`
- `not_a_fit`

## Cash-readiness rule

A brand is not cash-ready until all are true:

- application approved
- approved tracking URL stored
- `/go/` route regenerated
- click QA passed
- disclosure remains visible

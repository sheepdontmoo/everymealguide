# Every Meal Guide Affiliate Launch Control

Status date: 2026-06-24

Purpose: keep Every Meal Guide affiliate work clean, approval-safe, and ready to monetize once the site is live.

## Current State

| Layer | Status | Evidence | Next action |
|---|---|---|---|
| Affiliate disclosure | Live-ready | `/affiliate-disclosure/` generated and deploy domain is live | Recheck during visual QA |
| Sponsored link markup | Live-ready | CTAs use `rel="sponsored nofollow"` | Preserve during URL swaps |
| Offer-check routes | Live-ready | 891 `/go/{brand}/` routes generated | Replace destination URLs after approval |
| Click tracking scaffold | Ready locally | `affiliate_click` events in `script.js` | Connect analytics before judging performance |
| Approved affiliate links | Not ready | No program approvals yet | Apply after contact mailbox confirmation |
| Batch 002 top-50 plan | Ready locally | `AFFILIATE_BATCH_002_TOP_50_APPLICATION_PLAN.md` | Human must confirm mailbox, log into networks, and submit only after Darren approves exact batch |
| Merchant-side conversion proof | Not ready | No live traffic or programs yet | Track after approval |

## P0 Applications

| Brand | Why first | Apply when | Approval blocker |
|---|---|---|---|
| Factor | Prepared meal pages have high buyer intent and no-cook angle | Contact mailbox confirmed | Thin/new site risk |
| HelloFresh | Broad meal-kit demand and strongest generic comparison fit | Contact mailbox confirmed | Competitive affiliate program |
| CookUnity | Premium prepared meal angle supports higher-value comparisons | Contact mailbox confirmed | Availability/location specificity |

## P1 Applications

| Brand | Why next | Apply when | Approval blocker |
|---|---|---|---|
| Gousto | Strong UK comparison angle and HelloFresh vs Gousto page | UK page/live contact ready | Region-specific program access |
| EveryPlate | Budget pages need monetization | Budget pages live | Offer/program network unknown |
| Dinnerly | Budget vs budget comparisons | Budget pages live | Offer/program network unknown |
| Home Chef | Mainstream US meal-kit alternative | US meal-kit pages live | Program availability unknown |

## Link Swap Protocol

Use this every time a real affiliate URL is approved.

1. Confirm approval in the merchant dashboard or network.
2. Copy the exact approved tracking URL.
3. Add it to `affiliatePrograms` in `tools/generate-pages.mjs`.
4. Keep `status` as `approved`.
5. Keep all visible CTA labels honest.
6. Run `npm.cmd run build`.
7. Confirm the relevant `/go/{brand}/` page redirects.
8. Confirm CTA markup keeps `rel="sponsored nofollow"`.
9. Update `seo/affiliate-program-targets.csv`.
10. Add the brand to weekly measurement once analytics is connected.

## Approval-Safe Rules

Do not:

1. Add fake affiliate links.
2. Claim approval before approval exists.
3. Claim a discount is evergreen.
4. Claim first-hand testing unless the testing happened.
5. Redirect users to merchants with untracked normal URLs and call it monetized.

Do:

1. Keep pending pages transparent.
2. Use official sources for offer notes.
3. Refresh top offers before public promotion.
4. Prioritize pages that can earn clicks after approval.
5. Track clicks by brand and page.

## First Revenue Gate

The first commercial proof target is not `$5k/month`. It is:

1. One approved program.
2. One live affiliate redirect.
3. One tracked affiliate click.
4. One merchant-side conversion or sale report.

After that, scale by page type and brand conversion quality.

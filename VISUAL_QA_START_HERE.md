# Every Meal Guide Visual QA Start Here

Status date: 2026-06-23

Purpose: this is the next required gate after local-prep completion. Do not treat the site as complete until this pass is run and findings are fixed or explicitly accepted.

## Approval Needed

Before running browser QA, get this approval:

```text
Approve browser visual QA for Every Meal Guide local preview.
```

## Local Prep Before QA

Start the local preview:

```powershell
npm.cmd run preview
```

Create the QA report shell:

```powershell
npm.cmd run qa:visual-report -- YYYY-MM-DD
```

Do not mark the report as passed until browser evidence exists.

## Required Routes

Check desktop and mobile:

1. `/`
2. `/best/meal-delivery-services/`
3. `/deals/best-meal-delivery-deals/`
4. `/vs/hellofresh-vs-gousto/`
5. `/vs/factor-vs-cookunity/`
6. `/reviews/factor/`
7. `/meal-delivery-comparisons/`
8. `/latest-offer-checks/`
9. `/company-accountability/`
10. `/methodology/`
11. `/404.html`

## Viewports

1. Desktop: `1280x900`
2. Mobile: `390x844`

## Must Pass

1. No horizontal overflow.
2. Header does not hide critical content.
3. Top money pages look modern, not like an old affiliate blog.
4. CTAs are obvious.
5. Tables scroll cleanly on mobile.
6. Sticky mobile deal bar does not block important content.
7. Offer-check and company-accountability pages feel credible.
8. Fresh N Lean is visibly watchlist/caution only, not an active recommendation.
9. Footer links are readable.
10. No obvious placeholder claims.

## Fix Priority

1. Broken layout or horizontal overflow.
2. Hidden/weak CTA.
3. Cramped hero or ranking card.
4. Hard-to-read comparison table.
5. Generic-looking trust/source section.
6. Minor spacing or hover polish.

## After QA Passes

The next approval needed is:

```text
Approve public launch prep for Every Meal Guide on [domain] using [provider].
```

Then follow `PUBLIC_LAUNCH_APPROVAL_PACKET.md`.

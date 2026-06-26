# Every Meal Guide Visual QA Checklist

## Goal

Confirm the site feels like a modern consumer comparison product, not an old affiliate article or coupon table.

## Local Preflight

Before the browser-led visual pass, run:

```powershell
npm run audit:visual
```

This only checks local HTML/CSS structure. It does not prove the design looks good in the browser.

## Routes To Check

1. `/`
2. `/best/meal-delivery-services/`
3. `/deals/best-meal-delivery-deals/`
4. `/vs/factor-vs-cookunity/`
5. `/reviews/factor/`
6. `/methodology/`

## Viewports

1. Desktop: `1280x900`
2. Mobile: `390x844`

## Page-Level Checks

For each route:

1. Page loads with the expected title and H1.
2. No horizontal overflow.
3. No console errors or relevant warnings.
4. Header does not cover important content.
5. Typography feels intentional and readable.
6. CTAs are visually obvious.
7. Cards have consistent spacing and alignment.
8. Tables are scrollable on mobile and do not break layout.
9. Sticky mobile deal bar does not block critical content.
10. Footer links are readable and not cramped.

## Money-Page Checks

For `/best/meal-delivery-services/`:

1. Hero feels like a buyer cockpit.
2. Verdict card is visible and not cramped.
3. Ranking cards feel premium and scannable.
4. First ranking card highlight is tasteful, not garish.
5. Pros/watch-outs are readable.
6. CTAs look like buttons, not old text links.
7. Source notes feel credible.

For `/deals/best-meal-delivery-deals/`:

1. Deal warning cards appear before the table.
2. Deal table is readable on desktop.
3. Deal table scrolls cleanly on mobile.
4. Second-box risk and checkout checks are easy to find.

For `/vs/factor-vs-cookunity/`:

1. Head-to-head hero makes sense.
2. Side-by-side comparison is not visually flat.
3. Choose/skip verdict sections are easy to scan.
4. CTAs route to the correct `/go/` pages.
5. `Choose X if` cards include visible CTAs.

For `/reviews/factor/`:

1. Review score section is readable.
2. Review rail does not feel detached or old-fashioned.
3. Claim-deal CTA is visible.
4. No copy implies first-hand testing beyond what is actually true.
5. Review decision cards are readable and do not overclaim.

## Pass Standard

The visual QA pass is successful only if:

1. All checked routes load.
2. No route has horizontal overflow.
3. No route has obvious clipped content.
4. Mobile sticky CTA is helpful rather than annoying.
5. Money pages feel clearly more modern than a basic affiliate blog.
6. Any remaining visual issues are documented with route, viewport, and fix priority.

## If Issues Are Found

Use this priority:

1. Mobile overflow or blocked CTA.
2. Broken/hidden affiliate CTA.
3. Cramped hero or ranking cards.
4. Hard-to-read table.
5. Generic-looking trust/source sections.
6. Minor spacing or hover polish.

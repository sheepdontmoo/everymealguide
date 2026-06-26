# Cash Execution Command Board - Every Meal Guide

Date: 2026-06-24

## North star

Cash comes from:

`buyer-intent traffic -> approved affiliate links -> tracked clicks -> confirmed conversions`

Everything else is support work.

## Current truth

- Site is live at `https://www.everymealguide.com/`.
- `/start/` recommendation flow is live.
- `/go/{brand}/` offer-check routes exist for the current brand universe.
- Public affiliate disclosure, partner page, and media kit exist.
- Public-copy guard is active.
- Production build prunes internal operator docs/data from Vercel output.
- No affiliate approval is confirmed yet.
- No approved tracking URL is live yet.
- No revenue is confirmed yet.

## Cash priority order

1. Submit affiliate/direct partner applications for the top 10 brands.
2. Use `https://www.everymealguide.com/media-kit/` plus partner/disclosure/methodology pages in application fields where useful.\n3. Capture proof for each application: confirmation page, email, or dashboard status.
4. Add approved tracking URLs only after approval and owner review.
5. Push indexing for the first 20 buyer-intent URLs in Search Console.
6. Polish the top 20 money pages only where it improves click trust or affiliate acceptance.
7. Measure `/go/` clicks, affiliate dashboard clicks, and first conversion.

## P0 affiliate applications

Use `AFFILIATE_BATCH_002_TOP_50_APPLICATION_PLAN.md`.

| Priority | Brand | Route | Human action |
| ---: | --- | --- | --- |
| 1 | Factor | FlexOffers / confirm active program | Log in, apply, capture proof. |
| 2 | HelloFresh | Country-specific network route | Pick correct country program, apply, capture proof. |
| 3 | Home Chef | CJ | Apply through CJ, capture proof. |
| 4 | CookUnity | Direct affiliate form | Submit direct form, capture proof. |
| 5 | Gousto | Awin | Apply through Awin, capture proof. |
| 6 | Dinnerly | Awin | Apply through Awin, capture proof. |
| 7 | Marley Spoon | Awin | Apply through Awin, capture proof. |
| 8 | EveryPlate | Country-specific route | Confirm US/AU route, apply, capture proof. |
| 9 | Blue Apron | CJ / confirm route | Apply through confirmed publisher route. |
| 10 | Green Chef | FlexOffers / confirm active program | Apply, capture proof. |

## P0 indexing actions

Use `SEO_INDEXING_SPRINT_2026-06-24.md`.

Request indexing only inside Search Console after URL inspection shows no blocker.

First 10 URLs:

1. `https://www.everymealguide.com/start/`
2. `https://www.everymealguide.com/guides/how-to-choose-meal-delivery/`
3. `https://www.everymealguide.com/best/meal-delivery-services/`
4. `https://www.everymealguide.com/best/prepared-meal-delivery/`
5. `https://www.everymealguide.com/best/meal-kits/`
6. `https://www.everymealguide.com/best/high-protein-meal-delivery/`
7. `https://www.everymealguide.com/best/cheap-meal-delivery/`
8. `https://www.everymealguide.com/best/meal-kits-for-families/`
9. `https://www.everymealguide.com/best/vegan-meal-delivery/`
10. `https://www.everymealguide.com/best/keto-meal-delivery/`

## Proof tracker rules

Use these statuses only:

| Status | Meaning |
| --- | --- |
| `needs_human_submit` | Ready to apply, but no submission proof yet. |
| `submitted` | A human submitted and captured proof. |
| `approved` | Merchant/network explicitly approved Every Meal Guide. |
| `rejected` | Merchant/network explicitly rejected Every Meal Guide. |
| `tracking_url_added` | Approved tracking URL was added after owner review. |
| `live_cash_route` | Approved route is live and click tracking is confirmed. |

## What not to do

- Do not add random affiliate links.
- Do not claim approval before proof.
- Do not claim traffic before analytics or Search Console proof.
- Do not claim revenue before affiliate/payment dashboard proof.
- Do not expand random pages before P0 applications and indexing are moving.

## Next human-assisted step

Open the first affiliate network or direct form and submit Factor, HelloFresh, Home Chef, CookUnity, and Gousto first. Capture proof immediately.

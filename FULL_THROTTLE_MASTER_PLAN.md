# Every Meal Guide Full-Throttle Master Plan

Status: local execution plan. No external submissions, signups, deployments, DNS changes, spend, or affiliate URL swaps are authorized by this file.

## Objective

Build Every Meal Guide into a consumer meal-delivery comparison engine covering meal kits, prepared meals, meal prep, frozen meals, diet meal plans, fitness meals, kids meals, and country availability across the USA, UK, Ireland, Australia, and Canada.

Commercial goal: create enough useful country/category/brand/comparison pages to support affiliate approvals and organic search growth.

## Non-negotiable gates

- Every brand must have a status before being promoted.
- Active recommendations need official URL, country availability, source date, and offer caveat.
- Watchlist/inactive brands must not appear as top recommendations.
- Affiliate applications require live domain, contact email, brand/category pages, and explicit approval for the batch.
- Affiliate URL swaps require approved partner links and final click QA.
- Deployment, analytics, Search Console, DNS, and emails are separate approval-gated live actions.

## Workstreams

### 1. Brand universe

Target: 300+ brand-market rows.

Inputs:

- seo/global-brand-universe.csv
- seo/next-50-brand-research-batch.csv

Outputs:

- brand statuses
- official URLs
- country availability
- affiliate-program target flags
- inactive/watchlist notes

### 2. Page build engine

Page types:

- country hub
- category hub
- brand review
- brand deals
- vs comparison
- alternatives page
- company accountability entry
- latest offer check entry

Priority order:

1. Country hubs for USA, UK, Ireland, Australia, Canada.
2. P0 brand reviews and deal checks.
3. High-intent vs pages.
4. Category pages by buyer intent.
5. Long-tail regional providers.

### 3. Monetization

Affiliate workflow:

1. Identify program/network.
2. Confirm requirements.
3. Prepare application copy.
4. Apply only after explicit approval.
5. Store approved URLs locally.
6. Swap /go/ routes only after approval.
7. Re-test click/event tracking.

### 4. Launch

Required before public launch:

- domain selected
- deploy target selected
- live deploy approved
- analytics approved
- Search Console/Bing setup approved
- sitemap submitted
- affiliate disclosure visible
- privacy/contact pages live

### 5. Operating loop

Daily during build:

- add/verify 25 brands
- publish or generate 10 pages locally
- add 5 affiliate-program records
- update blockers

Weekly after launch:

- offer checks
- broken link checks
- affiliate click audit
- ranking/indexing review
- page expansion batch

## Current first wave

Use seo/next-50-brand-research-batch.csv as Wave 001.

The local runner is tools/run-full-throttle-plan.mjs.

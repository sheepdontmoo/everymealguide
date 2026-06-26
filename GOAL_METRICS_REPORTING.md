# Goal metrics reporting

## Purpose

Use this when current evidence is needed for the Every Meal Guide goal scorecard.

## Command

```powershell
npm.cmd run report:goal-metrics
```

## Output

The command writes:

```text
reports/goal-metrics-current.json
```

It counts:

- source rows in `seo/global-brand-universe.csv`
- unique brands
- unique countries
- `/go/` route directories
- review route directories
- public `index.html` files
- SEO landing pages
- eligible brands missing `/go/` routes

## Why this matters

The goal has hard numeric targets:

- 1,000+ brands
- 50+ countries
- 10,000+ SEO landing pages
- 100% eligible brands linked through `/go/`

This report gives current worktree evidence instead of relying on memory or old deployment logs.

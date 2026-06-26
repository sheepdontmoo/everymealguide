# Deployment Checklist

Status: local checklist only.

## Predeploy local checks

- Run: node tools/run-full-throttle-plan.mjs
- Run: node tools/update-full-throttle-scorecard.mjs
- Confirm sitemap includes current generated pages.
- Confirm /brand-directory/ loads locally.
- Confirm /countries/ loads locally.
- Confirm top 10 commercial pages load locally.
- Confirm no approved affiliate URL file contains unapproved links.

## Deploy command path

Preferred host: Vercel static deployment.

Approval required before running deploy.

Suggested command after approval:

vercel --prod

If Vercel project is not linked, run Vercel link flow first after approval.

## Postdeploy checks

- Live homepage HTTP 200
- /brand-directory/ HTTP 200
- /countries/ HTTP 200
- /sitemap.xml HTTP 200
- /robots.txt HTTP 200
- /llms.txt HTTP 200
- Top 10 pages HTTP 200
- Mobile layout smoke check
- No accidental external affiliate links

## Rollback

If deploy exposes broken pages, rollback in Vercel dashboard or redeploy last known good local build.

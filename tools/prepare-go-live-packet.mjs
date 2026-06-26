import fs from 'node:fs';
import path from 'node:path';

const root = 'C:/codex/dinner-compare';
const reportsDir = path.join(root, 'reports');
fs.mkdirSync(reportsDir, { recursive: true });

const status = JSON.parse(fs.readFileSync(path.join(reportsDir, 'full-throttle-status.json'), 'utf8'));
const scorecard = JSON.parse(fs.readFileSync(path.join(reportsDir, 'full-throttle-scorecard.json'), 'utf8'));

const packet = `# Go-Live Approval Packet

Status: prepared locally. No deployment, DNS, analytics, Search Console, affiliate application, email, or external submission has been performed.

## Current readiness

- Current local score: ${scorecard.overall}/100
- Brand-market rows: ${status.brandRows}
- Generated Wave pages: ${status.generatedWavePages}
- Generated country pages: ${status.generatedCountryPages}
- Brand directory ready: ${status.brandDirectoryReady}
- Sitemap URLs: ${scorecard.evidence.sitemapUrlCount}
- Polished Wave pages: ${scorecard.evidence.polishedWavePages}
- Upgraded money pages: ${scorecard.evidence.upgradedMoneyPages}

## What would go live

- Homepage and matcher
- Best meal delivery pages
- Prepared meal, meal kit, and meal prep category hubs
- Country hubs for US, UK, Ireland, Australia, Canada
- Brand directory with 323 tracked brand-market rows
- 48 Wave 001 expansion pages
- 10 upgraded commercial pages
- Affiliate disclosure, methodology, privacy/contact surfaces
- Sitemap and llms.txt

## What would not happen automatically

- No affiliate applications
- No affiliate URL swaps
- No domain purchase
- No DNS change unless approved separately
- No analytics/Search Console unless approved separately
- No paid spend
- No emails or forms submitted

## Known caveats before live launch

- Four Wave 001 manual source follow-ups remain: Prep Kitchen, Tastily, Blue Apron, Nutrisystem.
- Wave 002 rows are candidate coverage rows and not recommendations.
- Many pages are source-aware coverage pages, not final editorial reviews.
- Real affiliate revenue cannot start until applications are submitted and approved.

## Suggested approval phrase

Approve live deploy to Vercel

## After approval

1. Run local predeploy check.
2. Deploy static site to Vercel.
3. Confirm live URL.
4. Check homepage, brand directory, countries index, top 10 money pages, sitemap, robots.txt, llms.txt.
5. Prepare analytics/Search Console approval packet.
6. Prepare first affiliate application batch approval packet.
`;
fs.writeFileSync(path.join(root, 'GO_LIVE_APPROVAL_PACKET.md'), packet, 'utf8');

const checklist = `# Deployment Checklist

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
`;
fs.writeFileSync(path.join(root, 'DEPLOYMENT_APPROVAL_CHECKLIST.md'), checklist, 'utf8');

const report = {
  generatedAt: new Date().toISOString(),
  files: ['GO_LIVE_APPROVAL_PACKET.md', 'DEPLOYMENT_APPROVAL_CHECKLIST.md'],
  approvalPhrase: 'Approve live deploy to Vercel',
  noExternalActionsTaken: true
};
fs.writeFileSync(path.join(reportsDir, 'go-live-approval-packet.json'), JSON.stringify(report, null, 2), 'utf8');
console.log(JSON.stringify(report, null, 2));

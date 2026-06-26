import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const reportsDir = path.join(root, "reports");
const reportJsonPath = path.join(reportsDir, "mission-control-2026-06-24.json");
const reportMdPath = path.join(reportsDir, "mission-control-2026-06-24.md");

const paths = {
  brandUniverse: path.join(root, "seo", "global-brand-universe.csv"),
  sitemap: path.join(root, "sitemap.xml"),
  approvedLinks: path.join(root, "APPROVED_AFFILIATE_LINKS.json"),
  approvedRouteMap: path.join(root, "seo", "approved-affiliate-route-map.csv"),
  partnerQueue: path.join(root, "seo", "affiliate-application-master-queue.csv"),
  partnerDraftIndex: path.join(root, "outreach", "partner-application-drafts-2026-06-24", "index.csv"),
  partnerSubmissionTracker: path.join(root, "outreach", "partner-submission-tracker-2026-06-24.csv"),
  seoBacklog: path.join(root, "seo", "seo-expansion-backlog-2026-06-24.csv"),
  seoBriefIndex: path.join(root, "content", "seo-editorial-briefs-2026-06-24", "index.csv"),
};

function parseCsv(text) {
  const rows = [];
  let row = [];
  let value = "";
  let quoted = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const next = text[index + 1];

    if (char === '"' && quoted && next === '"') {
      value += '"';
      index += 1;
      continue;
    }

    if (char === '"') {
      quoted = !quoted;
      continue;
    }

    if (char === "," && !quoted) {
      row.push(value);
      value = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && next === "\n") index += 1;
      row.push(value);
      if (row.some((cell) => cell.trim())) rows.push(row);
      row = [];
      value = "";
      continue;
    }

    value += char;
  }

  row.push(value);
  if (row.some((cell) => cell.trim())) rows.push(row);

  const headers = rows.shift()?.map((header) => header.trim()) || [];

  return rows.map((cells) =>
    headers.reduce((entry, header, index) => {
      entry[header] = (cells[index] || "").trim();
      return entry;
    }, {})
  );
}

function readCsv(file) {
  if (!fs.existsSync(file)) return [];
  return parseCsv(fs.readFileSync(file, "utf8"));
}

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeCountry(value) {
  const raw = String(value || "Global").trim();
  const lower = raw.toLowerCase();

  if (lower === "us" || lower === "usa" || lower === "united states") return "United States";
  if (lower === "uk" || lower === "united kingdom" || lower === "gb") return "United Kingdom";
  if (lower === "uae" || lower === "united arab emirates") return "UAE";

  return raw
    .split(/[\s-]+/)
    .map((part) => (part ? part[0].toUpperCase() + part.slice(1).toLowerCase() : part))
    .join(" ");
}

function countSitemapUrls() {
  if (!fs.existsSync(paths.sitemap)) return 0;
  return [...fs.readFileSync(paths.sitemap, "utf8").matchAll(/<loc>/g)].length;
}

function statusCounts(rows, field) {
  return rows.reduce((counts, row) => {
    const value = row[field] || "blank";
    counts[value] = (counts[value] || 0) + 1;
    return counts;
  }, {});
}

function pct(value, target) {
  if (!target) return 0;
  return Math.min(100, Math.round((value / target) * 100));
}

function yesNo(value) {
  return value ? "yes" : "no";
}

const brandRows = readCsv(paths.brandUniverse).filter((row) => row.brand);
const uniqueBrands = new Set(brandRows.map((row) => slugify(row.brand)).filter(Boolean));
const uniqueCountries = new Set(brandRows.map((row) => normalizeCountry(row.country)).filter(Boolean));
const goEligibleBrands = new Set(brandRows.filter((row) => row.official_url).map((row) => slugify(row.brand)).filter(Boolean));
const sitemapUrls = countSitemapUrls();

const approvedLinksStore = fs.existsSync(paths.approvedLinks)
  ? JSON.parse(fs.readFileSync(paths.approvedLinks, "utf8"))
  : { links: [] };
const approvedLinks = Array.isArray(approvedLinksStore.links) ? approvedLinksStore.links : [];
const approvedRouteMap = readCsv(paths.approvedRouteMap).filter((row) => row.brand && row.approved_url);
const partnerQueue = readCsv(paths.partnerQueue).filter((row) => row.brand);
const partnerDrafts = readCsv(paths.partnerDraftIndex).filter((row) => row.brand);
const partnerSubmissions = readCsv(paths.partnerSubmissionTracker).filter((row) => row.brand);
const seoBacklog = readCsv(paths.seoBacklog).filter((row) => row.url);
const seoBriefs = readCsv(paths.seoBriefIndex).filter((row) => row.url);

const submittedRows = partnerSubmissions.filter((row) => !/^draft_only_not_submitted$/i.test(row.submission_status || ""));
const approvedSubmissionRows = partnerSubmissions.filter((row) => /^approved/i.test(row.approval_status || ""));
const readyBacklog = seoBacklog.filter((row) => row.readiness === "ready_to_brief");

const targets = {
  brands: 1000,
  countries: 50,
  seoUrls: 10000,
  partnerApplications: 100,
  affiliateClicks100: 100,
  affiliateClicks1000: 1000,
  organicVisitors10k: 10000,
  organicVisitors100k: 100000,
};

const metrics = {
  generatedAt: new Date().toISOString(),
  coverage: {
    brandRows: brandRows.length,
    uniqueBrands: uniqueBrands.size,
    uniqueCountries: uniqueCountries.size,
    sitemapUrls,
    goEligibleBrands: goEligibleBrands.size,
    approvedAffiliateLinks: approvedLinks.length,
    approvedAffiliateRoutes: approvedRouteMap.length,
  },
  partnerPipeline: {
    queueRows: partnerQueue.length,
    draftRows: partnerDrafts.length,
    trackerRows: partnerSubmissions.length,
    submittedRows: submittedRows.length,
    approvedRows: approvedSubmissionRows.length,
    statusCounts: statusCounts(partnerSubmissions, "submission_status"),
  },
  seoPipeline: {
    backlogCandidates: seoBacklog.length,
    readyToBrief: readyBacklog.length,
    briefsGenerated: seoBriefs.length,
    notReadyCandidates: seoBacklog.length - readyBacklog.length,
  },
  targetProgress: {
    brandsPct: pct(uniqueBrands.size, targets.brands),
    countriesPct: pct(uniqueCountries.size, targets.countries),
    seoUrlsPct: pct(sitemapUrls, targets.seoUrls),
    partnerApplicationsPct: pct(submittedRows.length, targets.partnerApplications),
  },
  evidenceBoundaries: {
    localOnly: true,
    deployedThisRun: false,
    submittedApplications: submittedRows.length,
    approvedAffiliateLinks: approvedLinks.length,
    firstAffiliateRevenueVerified: false,
    trafficVerified: false,
  },
};

const nextActions = [
  approvedLinks.length === 0
    ? "Submit partner applications manually or through an approved workflow, then add only approved tracking URLs."
    : "Run click QA on approved affiliate routes before claiming monetized routes.",
  uniqueBrands.size < targets.brands
    ? `Add at least ${targets.brands - uniqueBrands.size} more verified unique brands with official URLs.`
    : "Maintain brand freshness and prioritize approval coverage.",
  sitemapUrls < targets.seoUrls
    ? `Convert ready SEO briefs into high-quality pages after editorial review; current URL gap is ${targets.seoUrls - sitemapUrls}.`
    : "Keep SEO pages fresh and monitor traffic quality.",
  submittedRows.length < targets.partnerApplications
    ? `Submit ${targets.partnerApplications - submittedRows.length} partner applications with proof before counting the 100+ milestone.`
    : "Track approvals and replace only approved links.",
];

fs.mkdirSync(reportsDir, { recursive: true });
fs.writeFileSync(reportJsonPath, JSON.stringify({ ...metrics, nextActions }, null, 2) + "\n", "utf8");
fs.writeFileSync(
  reportMdPath,
  `# Every Meal Guide Mission Control - 2026-06-24

## Current local metrics

| Metric | Current | Target | Progress |
|---|---:|---:|---:|
| Unique brands | ${metrics.coverage.uniqueBrands} | ${targets.brands} | ${metrics.targetProgress.brandsPct}% |
| Unique countries | ${metrics.coverage.uniqueCountries} | ${targets.countries} | ${metrics.targetProgress.countriesPct}% |
| Sitemap URLs | ${metrics.coverage.sitemapUrls} | ${targets.seoUrls} | ${metrics.targetProgress.seoUrlsPct}% |
| Submitted partner applications | ${metrics.partnerPipeline.submittedRows} | ${targets.partnerApplications} | ${metrics.targetProgress.partnerApplicationsPct}% |

## Cash-readiness

- /go-eligible brands with official URLs: ${metrics.coverage.goEligibleBrands}
- Approved affiliate links stored: ${metrics.coverage.approvedAffiliateLinks}
- Approved affiliate routes active: ${metrics.coverage.approvedAffiliateRoutes}
- Partner queue rows: ${metrics.partnerPipeline.queueRows}
- Partner drafts generated: ${metrics.partnerPipeline.draftRows}
- Partner tracker rows: ${metrics.partnerPipeline.trackerRows}

## SEO pipeline

- SEO backlog candidates: ${metrics.seoPipeline.backlogCandidates}
- Ready to brief: ${metrics.seoPipeline.readyToBrief}
- Briefs generated: ${metrics.seoPipeline.briefsGenerated}
- Need more verified brands first: ${metrics.seoPipeline.notReadyCandidates}

## Evidence boundaries

- Local-only report: ${yesNo(metrics.evidenceBoundaries.localOnly)}
- Deployed in this run: ${yesNo(metrics.evidenceBoundaries.deployedThisRun)}
- First affiliate revenue verified: ${yesNo(metrics.evidenceBoundaries.firstAffiliateRevenueVerified)}
- Traffic verified: ${yesNo(metrics.evidenceBoundaries.trafficVerified)}

## Next actions

${nextActions.map((action) => `- ${action}`).join("\n")}

## Operator note

The fastest path to the real mission is not raw page volume. It is:

1. Keep the homepage and entry pages decision-first.
2. Add verified brands until the brand target is exceeded.
3. Submit partner applications with proof.
4. Activate only approved tracking links.
5. Convert ready SEO briefs into pages that answer the buyer's question in under 60 seconds.
`,
  "utf8"
);

console.log(
  JSON.stringify(
    {
      uniqueBrands: metrics.coverage.uniqueBrands,
      uniqueCountries: metrics.coverage.uniqueCountries,
      sitemapUrls: metrics.coverage.sitemapUrls,
      submittedPartnerApplications: metrics.partnerPipeline.submittedRows,
      approvedAffiliateLinks: metrics.coverage.approvedAffiliateLinks,
      seoBacklogCandidates: metrics.seoPipeline.backlogCandidates,
      seoBriefsGenerated: metrics.seoPipeline.briefsGenerated,
      reportJsonPath,
      reportMdPath,
    },
    null,
    2
  )
);


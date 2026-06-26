import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const queuePath = path.join(root, "seo", "fast-rank-indexing-queue-2026-06-24.csv");
const sitemapPath = path.join(root, "sitemap.xml");
const reportPath = path.join(root, "reports", "fast-rank-seo-verification.json");
const markdownPath = path.join(root, "reports", "fast-rank-seo-verification.md");

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const next = text[index + 1];

    if (char === '"' && quoted && next === '"') {
      field += '"';
      index += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === "," && !quoted) {
      row.push(field);
      field = "";
    } else if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && next === "\n") index += 1;
      row.push(field);
      if (row.some((cell) => cell.length)) rows.push(row);
      row = [];
      field = "";
    } else {
      field += char;
    }
  }

  if (field.length || row.length) {
    row.push(field);
    if (row.some((cell) => cell.length)) rows.push(row);
  }

  const headers = rows.shift() || [];
  return rows.map((cells) => Object.fromEntries(headers.map((header, index) => [header, cells[index] || ""])));
}

function read(filePath) {
  return fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8") : "";
}

function one(regex, text) {
  const match = text.match(regex);
  return match ? match[1].trim() : "";
}

const queue = parseCsv(read(queuePath));
const sitemap = read(sitemapPath);
const results = queue.map((row) => {
  const filePath = path.join(root, row.local_path);
  const html = read(filePath);
  const affiliateLinks = [...html.matchAll(/<a\b[^>]*data-track="affiliate-click"[^>]*>/g)].map((match) => match[0]);
  const unsafeAffiliateLinks = affiliateLinks.filter((tag) => !/rel="[^"]*sponsored[^"]*nofollow/.test(tag));
  const reviewScoreSignals = /ratingValue|score-grid|Taste <strong>|Value <strong>|Nutrition <strong>|Convenience <strong>/.test(html);
  const title = one(/<title>([\s\S]*?)<\/title>/, html);
  const canonical = one(/<link rel="canonical" href="([^"]+)"/, html);

  return {
    priority: Number(row.priority),
    pageType: row.page_type,
    keyword: row.target_keyword,
    url: row.url,
    localPath: row.local_path,
    exists: Boolean(html),
    h1Count: (html.match(/<h1\b/g) || []).length,
    titleMatches: title.toLowerCase().includes(row.target_keyword.toLowerCase()),
    canonicalMatches: canonical === row.url,
    fastRankBlocks: (html.match(/<!-- fast-rank:start -->/g) || []).length,
    sitemapIncluded: sitemap.includes(`<loc>${row.url}</loc>`),
    unsafeAffiliateLinks: unsafeAffiliateLinks.length,
    fakeReviewSignals: row.page_type === "review" && reviewScoreSignals,
  };
});

const failures = results.filter((result) =>
  !result.exists ||
  result.h1Count !== 1 ||
  !result.titleMatches ||
  !result.canonicalMatches ||
  result.fastRankBlocks !== 1 ||
  !result.sitemapIncluded ||
  result.unsafeAffiliateLinks > 0 ||
  result.fakeReviewSignals
);

const summary = {
  generatedAt: new Date().toISOString(),
  checkedPages: results.length,
  passedPages: results.length - failures.length,
  failedPages: failures.length,
  sitemapUrls: (sitemap.match(/<loc>/g) || []).length,
  metrics: {
    targetPagesPolished: results.length,
    deployReadyInspectionCandidates: Math.min(10, results.length),
    unsafeAffiliateClaims: results.reduce((sum, result) => sum + result.unsafeAffiliateLinks, 0),
    fakeTestingOrRatingSignals: results.filter((result) => result.fakeReviewSignals).length,
  },
  failures,
};

fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(reportPath, JSON.stringify(summary, null, 2), "utf8");
fs.writeFileSync(
  markdownPath,
  `# Fast-Rank SEO Verification

- Checked pages: ${summary.checkedPages}
- Passed pages: ${summary.passedPages}
- Failed pages: ${summary.failedPages}
- Sitemap URLs: ${summary.sitemapUrls}
- Target pages polished: ${summary.metrics.targetPagesPolished}
- Deploy-ready inspection candidates: ${summary.metrics.deployReadyInspectionCandidates}
- Unsafe affiliate-link findings: ${summary.metrics.unsafeAffiliateClaims}
- Fake testing/rating signals: ${summary.metrics.fakeTestingOrRatingSignals}

## Failures

${failures.length ? failures.map((failure) => `- ${failure.url}: ${JSON.stringify(failure)}`).join("\n") : "- None"}
`,
  "utf8"
);

console.log(JSON.stringify(summary, null, 2));
process.exitCode = failures.length ? 1 : 0;

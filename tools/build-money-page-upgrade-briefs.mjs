import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const useCaseIndexPath = path.join(root, "seo", "use-case-page-index.csv");
const comparisonIndexPath = path.join(root, "seo", "comparison-page-index.csv");
const categoryIndexPath = path.join(root, "seo", "country-category-page-index.csv");
const cashReadinessPath = path.join(root, "seo", "cash-route-readiness-by-brand.csv");
const queuePath = path.join(root, "seo", "money-page-upgrade-queue.csv");
const briefsDir = path.join(root, "content", "money-page-briefs");
const reportPath = path.join(root, "reports", "money-page-upgrade-briefs.json");
const briefLimit = Math.max(50, Number(process.argv[2] || 100));

const commercialWeights = [
  [/prepared|no-cook|healthy/i, 22],
  [/high-protein|protein|meal prep/i, 22],
  [/weight-loss|diet|low carb|keto/i, 20],
  [/cheap|budget|deals/i, 18],
  [/meal kit|grocery dinner/i, 16],
  [/family|kids/i, 14],
  [/frozen/i, 12],
  [/vegetarian|vegan/i, 10]
];

function parseCsv(text) {
  const rows = [];
  let row = [];
  let value = "";
  let quoted = false;
  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];
    if (char === '"') {
      if (quoted && next === '"') {
        value += '"';
        i += 1;
      } else {
        quoted = !quoted;
      }
    } else if (char === "," && !quoted) {
      row.push(value);
      value = "";
    } else if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && next === "\n") i += 1;
      row.push(value);
      if (row.some((cell) => cell.length)) rows.push(row);
      row = [];
      value = "";
    } else {
      value += char;
    }
  }
  if (value.length || row.length) {
    row.push(value);
    if (row.some((cell) => cell.length)) rows.push(row);
  }
  const header = rows.shift() || [];
  return rows.map((cells) => Object.fromEntries(header.map((column, index) => [column, cells[index] || ""])));
}

function readCsv(filePath) {
  if (!fs.existsSync(filePath)) return [];
  return parseCsv(fs.readFileSync(filePath, "utf8"));
}

function csvCell(value) {
  const text = String(value ?? "");
  return /[",\n\r]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function toCsv(rows) {
  return `${rows.map((row) => row.map(csvCell).join(",")).join("\n")}\n`;
}

function slugify(value) {
  return String(value)
    .toLowerCase()
    .replace(/&/g, "and")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function mdEscape(value) {
  return String(value ?? "").replaceAll("|", "\\|");
}

function commercialIntentScore(text) {
  return commercialWeights.reduce((score, [pattern, weight]) => score + (pattern.test(text) ? weight : 0), 0);
}

function brandNamesFromLeadList(value) {
  return String(value || "")
    .split("|")
    .map((brand) => brand.trim())
    .filter(Boolean);
}

function buildCashMap(rows) {
  const map = new Map();
  for (const row of rows) {
    map.set(slugify(row.brand), row);
  }
  return map;
}

function cashSignalsForBrands(brands, cashMap) {
  return brands
    .map((brand) => cashMap.get(slugify(brand)))
    .filter(Boolean);
}

function countStrongRoutes(cashRows) {
  return cashRows.filter((row) => /affiliate application|direct partnership/i.test(row.monetization_path || "")).length;
}

function officialSources(cashRows) {
  return [...new Set(cashRows.flatMap((row) => String(row.official_urls || "").split("|").map((url) => url.trim()).filter(Boolean)))];
}

function pageScore(page) {
  const text = `${page.page_type} ${page.intent} ${page.topic} ${page.url} ${page.lead_brands} ${page.category_cluster}`;
  const scopeBoost = page.scope === "global" ? 20 : 10;
  const brandCount = Number(page.brand_count || 0);
  const routeBoost = Number(page.strong_routes || 0) * 8;
  const typeBoost = page.page_type === "use_case" ? 16 : page.page_type === "comparison" ? 14 : 10;
  return commercialIntentScore(text) + scopeBoost + Math.min(brandCount, 25) + routeBoost + typeBoost;
}

function briefMarkdown(page, cashRows) {
  const brands = page.brands.slice(0, 8);
  const sourceRows = officialSources(cashRows).slice(0, 12);
  const sourceList = sourceRows.length
    ? sourceRows.map((url) => `- ${url}`).join("\n")
    : "- Use official brand source URLs from the brand ledger before publishing deeper claims.";
  const brandTable = brands
    .map((brand) => {
      const cash = cashRows.find((row) => slugify(row.brand) === slugify(brand));
      return `| ${mdEscape(brand)} | ${mdEscape(cash?.tracked_go_url || `/go/${slugify(brand)}/`)} | ${mdEscape(cash?.review_url || `/reviews/${slugify(brand)}/`)} | ${mdEscape(cash?.monetization_path || "needs route check")} |`;
    })
    .join("\n");

  return `# Money Page Upgrade Brief: ${page.title}

URL: ${page.url}

Page type: ${page.page_type}

Priority score: ${page.priority_score}

Primary intent: ${page.intent}

## Why this page matters

This page targets a buyer who is close to choosing a meal delivery option. The upgrade should make the decision easier, increase trust, and route each serious brand through a clear offer-check path without exposing internal monetization language.

## Above-the-fold upgrade

- Lead with the practical decision: who should choose which brand and why.
- Put the top 3 routes in a visible comparison card or table.
- Include a short disclosure that some links may earn commission and that partner relationships are only claimed when clearly stated.
- Avoid fake ratings, fake prices, fake testing claims, or unapproved affiliate language.

## Brand routing table

| Brand | Check offer | Review route | Buyer check |
|---|---|---|---|
${brandTable}

## Copy blocks to add

### Quick answer

For this page, the first answer should compare ${brands.slice(0, 3).join(", ")} in plain English. Mention format fit, cost sensitivity, nutrition/diet fit, and whether the shopper wants to cook or avoid cooking.

### What to compare before buying

1. Meal format: meal kit, prepared meal, frozen meal, diet plan, or grocery dinner box.
2. Real weekly cost after introductory discounts.
3. Delivery coverage and skip/cancel flexibility.
4. Protein, calories, allergens, and diet filters.
5. Portion size and household fit.
6. Whether the link clearly explains the next buyer action: offer, menu, delivery, price, or terms.

### Trust note

Every Meal Guide should state that rankings are updated from source pages, official menus, offer check status, and user-visible offer checks. Do not claim hands-on testing until we have actually tested the brand.

## FAQ targets

- What is the best option on this page for most people?
- Which option is cheapest after the first-box discount?
- Which option is best if I do not want to cook?
- Which option is best for high-protein or weight-loss goals?
- Can I pause, skip, or cancel the subscription?

## Internal links to include

- /best/
- /vs/
- ${brands.slice(0, 5).map((brand) => `/reviews/${slugify(brand)}/`).join("\n- ")}
- ${brands.slice(0, 5).map((brand) => `/go/${slugify(brand)}/`).join("\n- ")}

## Source URLs to verify before publishing stronger claims

${sourceList}

## Human gates

- Live domain before affiliate applications.
- Analytics/Search Console before promising traffic.
- User approval before sending outreach.
- Affiliate/direct approval before replacing official holding URLs.
`;
}

const cashRows = readCsv(cashReadinessPath);
const cashMap = buildCashMap(cashRows);
const useCaseRows = readCsv(useCaseIndexPath).map((row) => {
  const brands = brandNamesFromLeadList(row.lead_brands);
  const routeRows = cashSignalsForBrands(brands, cashMap);
  return {
    page_type: "use_case",
    scope: row.scope,
    country: row.country,
    topic: row.use_case,
    title: `${row.use_case} ${row.scope === "global" ? "global" : row.country}`,
    url: row.url,
    intent: row.intent,
    lead_brands: row.lead_brands,
    brands,
    brand_count: row.brand_count,
    strong_routes: countStrongRoutes(routeRows),
    source_count: officialSources(routeRows).length
  };
});

const comparisonRows = readCsv(comparisonIndexPath).map((row) => {
  const brands = [row.brand_a, row.brand_b].filter(Boolean);
  const routeRows = cashSignalsForBrands(brands, cashMap);
  return {
    page_type: "comparison",
    scope: "country",
    country: row.country,
    topic: row.category_cluster,
    title: `${row.brand_a} vs ${row.brand_b} in ${row.country}`,
    url: row.url,
    intent: `Compare ${row.brand_a} and ${row.brand_b} for ${row.category_cluster}`,
    lead_brands: brands.join(" | "),
    brands,
    brand_count: brands.length,
    strong_routes: countStrongRoutes(routeRows),
    source_count: officialSources(routeRows).length
  };
});

const categoryRows = readCsv(categoryIndexPath).map((row) => {
  const brands = brandNamesFromLeadList(row.lead_brands);
  const routeRows = cashSignalsForBrands(brands, cashMap);
  return {
    page_type: "country_category",
    scope: "country",
    country: row.country,
    topic: row.category_cluster,
    title: `${row.category_cluster} in ${row.country}`,
    url: row.url,
    intent: `Compare ${row.category_cluster} in ${row.country}`,
    lead_brands: row.lead_brands,
    brands,
    brand_count: row.brand_count,
    strong_routes: countStrongRoutes(routeRows),
    source_count: officialSources(routeRows).length
  };
});

const pages = [...useCaseRows, ...comparisonRows, ...categoryRows]
  .map((page) => ({ ...page, priority_score: pageScore(page) }))
  .sort((a, b) => b.priority_score - a.priority_score || a.url.localeCompare(b.url));

fs.mkdirSync(path.dirname(queuePath), { recursive: true });
fs.writeFileSync(
  queuePath,
  toCsv([
    ["priority_rank", "page_type", "scope", "country", "topic", "url", "priority_score", "brand_count", "strong_routes", "source_count", "lead_brands", "upgrade_status", "next_action"],
    ...pages.map((page, index) => [
      index + 1,
      page.page_type,
      page.scope,
      page.country,
      page.topic,
      page.url,
      page.priority_score,
      page.brand_count,
      page.strong_routes,
      page.source_count,
      page.lead_brands,
      index < briefLimit ? "brief_generated" : "queued",
      index < 10 ? "upgrade_page_copy_next" : "use_when_scaling_money_pages"
    ])
  ])
);

fs.mkdirSync(briefsDir, { recursive: true });
const briefs = [];
for (const [index, page] of pages.slice(0, briefLimit).entries()) {
  const fileName = `${String(index + 1).padStart(2, "0")}-${slugify(page.url)}.md`;
  const filePath = path.join(briefsDir, fileName);
  const cashSignals = cashSignalsForBrands(page.brands, cashMap);
  fs.writeFileSync(filePath, briefMarkdown(page, cashSignals));
  briefs.push(path.relative(root, filePath));
}

fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(
  reportPath,
  `${JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      pagesScored: pages.length,
      briefLimit,
      briefsGenerated: briefs.length,
      queuePath: path.relative(root, queuePath),
      briefs
    },
    null,
    2
  )}\n`
);

console.log(JSON.stringify({ pagesScored: pages.length, briefsGenerated: briefs.length, queuePath, briefsDir, reportPath }, null, 2));

import fs from "node:fs";
import path from "node:path";

const root = path.resolve(process.cwd());
const brandUniversePath = path.join(root, "seo", "global-brand-universe.csv");
const affiliateQueuePath = path.join(root, "seo", "affiliate-application-master-queue.csv");
const marketTargetsPath = path.join(root, "seo", "global-market-targets.csv");
const siteArchitecturePath = path.join(root, "seo", "global-seo-site-architecture.csv");
const researchQueuePath = path.join(root, "seo", "global-research-queue.csv");
const affiliateTop100Path = path.join(root, "seo", "top-affiliate-priority-100.csv");
const categoryPageIndexPath = path.join(root, "seo", "country-category-page-index.csv");
const comparisonPageIndexPath = path.join(root, "seo", "comparison-page-index.csv");
const useCasePageIndexPath = path.join(root, "seo", "use-case-page-index.csv");
const cashReadinessPath = path.join(root, "seo", "cash-route-readiness-by-brand.csv");
const moneyPageQueuePath = path.join(root, "seo", "money-page-upgrade-queue.csv");
const moneyPageUpgradesAppliedPath = path.join(root, "seo", "money-page-upgrades-applied.csv");
const statusJsonPath = path.join(root, "reports", "global-domination-status.json");
const statusMdPath = path.join(root, "reports", "global-domination-status.md");
const operatingPlanPath = path.join(root, "GLOBAL_DOMINATION_OPERATING_PLAN.md");

const targetMarkets = [
  { region: "North America", country: "US", slug: "us", language: "en", priority: 1, brandTarget: 180 },
  { region: "North America", country: "Canada", slug: "canada", language: "en", priority: 1, brandTarget: 110 },
  { region: "Europe", country: "UK", slug: "uk", language: "en", priority: 1, brandTarget: 130 },
  { region: "Europe", country: "Ireland", slug: "ireland", language: "en", priority: 1, brandTarget: 55 },
  { region: "Oceania", country: "Australia", slug: "australia", language: "en", priority: 1, brandTarget: 120 },
  { region: "Oceania", country: "New Zealand", slug: "new-zealand", language: "en", priority: 2, brandTarget: 45 },
  { region: "Europe", country: "Germany", slug: "germany", language: "de", priority: 2, brandTarget: 85 },
  { region: "Europe", country: "France", slug: "france", language: "fr", priority: 2, brandTarget: 70 },
  { region: "Europe", country: "Netherlands", slug: "netherlands", language: "nl", priority: 2, brandTarget: 55 },
  { region: "Europe", country: "Spain", slug: "spain", language: "es", priority: 2, brandTarget: 55 },
  { region: "Europe", country: "Italy", slug: "italy", language: "it", priority: 2, brandTarget: 55 },
  { region: "Europe", country: "Sweden", slug: "sweden", language: "sv", priority: 2, brandTarget: 40 },
  { region: "Europe", country: "Denmark", slug: "denmark", language: "da", priority: 2, brandTarget: 35 },
  { region: "Europe", country: "Norway", slug: "norway", language: "no", priority: 2, brandTarget: 35 },
  { region: "Europe", country: "Belgium", slug: "belgium", language: "nl/fr", priority: 3, brandTarget: 35 },
  { region: "Europe", country: "Switzerland", slug: "switzerland", language: "de/fr/it", priority: 3, brandTarget: 35 },
  { region: "Asia", country: "Singapore", slug: "singapore", language: "en", priority: 3, brandTarget: 45 },
  { region: "Asia", country: "Hong Kong", slug: "hong-kong", language: "en/zh", priority: 3, brandTarget: 35 },
  { region: "Asia", country: "UAE", slug: "uae", language: "en/ar", priority: 3, brandTarget: 40 },
  { region: "Asia", country: "India", slug: "india", language: "en/hi", priority: 3, brandTarget: 110 },
  { region: "Asia", country: "Japan", slug: "japan", language: "ja", priority: 4, brandTarget: 55 },
  { region: "Asia", country: "South Korea", slug: "south-korea", language: "ko", priority: 4, brandTarget: 45 },
  { region: "Latin America", country: "Mexico", slug: "mexico", language: "es", priority: 4, brandTarget: 45 },
  { region: "Latin America", country: "Brazil", slug: "brazil", language: "pt", priority: 4, brandTarget: 55 },
  { region: "Africa", country: "South Africa", slug: "south-africa", language: "en", priority: 4, brandTarget: 45 },
];

const categoryTargets = [
  { slug: "best-meal-delivery", pageType: "location", keyword: "best meal delivery", topic: "all meal delivery services", funnel: "commercial" },
  { slug: "best-prepared-meals", pageType: "category", keyword: "best prepared meal delivery", topic: "prepared meals and heat-and-eat meals", funnel: "commercial" },
  { slug: "best-meal-kits", pageType: "category", keyword: "best meal kits", topic: "meal kits you cook yourself", funnel: "commercial" },
  { slug: "best-high-protein-meal-delivery", pageType: "category", keyword: "best high protein meal delivery", topic: "high-protein and fitness meal prep", funnel: "commercial" },
  { slug: "cheapest-meal-delivery", pageType: "category", keyword: "cheapest meal delivery", topic: "budget meal kits and low-cost prepared meals", funnel: "commercial" },
  { slug: "best-vegan-meal-delivery", pageType: "category", keyword: "best vegan meal delivery", topic: "vegan and plant-based meals", funnel: "commercial" },
  { slug: "best-family-meal-delivery", pageType: "category", keyword: "best family meal delivery", topic: "family dinners and kid-friendly meals", funnel: "commercial" },
  { slug: "best-weight-loss-meal-delivery", pageType: "category", keyword: "best weight loss meal delivery", topic: "diet and calorie-controlled meals", funnel: "commercial" },
  { slug: "best-frozen-meal-delivery", pageType: "category", keyword: "best frozen meal delivery", topic: "frozen ready meals", funnel: "commercial" },
  { slug: "meal-delivery-deals", pageType: "landing", keyword: "meal delivery deals", topic: "discounts and first-order offers", funnel: "transactional" },
  { slug: "meal-kits-vs-prepared-meals", pageType: "comparison", keyword: "meal kits vs prepared meals", topic: "format decision", funnel: "commercial" },
];

function parseCsv(csvText) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;

  for (let index = 0; index < csvText.length; index += 1) {
    const char = csvText[index];
    const next = csvText[index + 1];

    if (char === '"' && inQuotes && next === '"') {
      field += '"';
      index += 1;
      continue;
    }

    if (char === '"') {
      inQuotes = !inQuotes;
      continue;
    }

    if (char === "," && !inQuotes) {
      row.push(field);
      field = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && next === "\n") index += 1;
      row.push(field);
      field = "";
      if (row.some((cell) => cell.trim())) rows.push(row);
      row = [];
      continue;
    }

    field += char;
  }

  row.push(field);
  if (row.some((cell) => cell.trim())) rows.push(row);

  const headers = rows.shift()?.map((header) => header.trim()) || [];

  return rows.map((cells) =>
    headers.reduce((entry, header, index) => {
      entry[header] = (cells[index] || "").trim();
      return entry;
    }, {})
  );
}

function csvEscape(value) {
  const text = String(value ?? "");
  return /[",\n\r]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function writeCsv(filePath, headers, rows) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(
    filePath,
    [headers, ...rows].map((row) => row.map(csvEscape).join(",")).join("\n") + "\n"
  );
}

function countBy(rows, key) {
  const map = new Map();

  for (const row of rows) {
    const value = row[key] || "Unknown";
    map.set(value, (map.get(value) || 0) + 1);
  }

  return [...map.entries()].sort((a, b) => b[1] - a[1]);
}

function scorePercent(current, target) {
  if (!target) return 0;
  return Math.min(100, Math.round((current / target) * 100));
}

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/&/g, "and")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function countrySlug(country) {
  const raw = String(country || "").trim().toLowerCase();
  if (raw === "us" || raw === "usa" || raw === "united-states" || raw === "united states") return "us";
  if (raw === "uk" || raw === "united-kingdom" || raw === "united kingdom") return "uk";
  return slugify(raw);
}

function currentCountryCount(rows, marketSlug) {
  return rows.filter((row) => countrySlug(row.country) === marketSlug).length;
}

function countCsvRows(filePath) {
  if (!fs.existsSync(filePath)) return 0;
  return parseCsv(fs.readFileSync(filePath, "utf8")).length;
}

function statusForMarket(current, target) {
  if (current >= target) return "coverage_target_met_needs_freshness";
  if (current >= Math.ceil(target * 0.55)) return "strong_base_expand";
  if (current > 0) return "starter_coverage";
  return "not_started";
}

if (!fs.existsSync(brandUniversePath)) {
  throw new Error(`Missing ${brandUniversePath}`);
}

const brandRows = parseCsv(fs.readFileSync(brandUniversePath, "utf8")).filter((row) => row.brand);
const affiliateRows = fs.existsSync(affiliateQueuePath)
  ? parseCsv(fs.readFileSync(affiliateQueuePath, "utf8")).filter((row) => row.brand)
  : [];

const uniqueBrands = new Set(brandRows.map((row) => row.brand)).size;
const existingCountries = new Set(brandRows.map((row) => countrySlug(row.country))).size;
const targetBrandMarketRows = targetMarkets.reduce((sum, market) => sum + market.brandTarget, 0);
const targetCountries = targetMarkets.length;
const goRoutes = fs.existsSync(path.join(root, "go"))
  ? fs.readdirSync(path.join(root, "go"), { withFileTypes: true }).filter((entry) => entry.isDirectory()).length
  : 0;
const reviews = fs.existsSync(path.join(root, "reviews"))
  ? fs.readdirSync(path.join(root, "reviews"), { withFileTypes: true }).filter((entry) => entry.isDirectory()).length
  : 0;
const comparisonDirs = fs.existsSync(path.join(root, "vs"))
  ? fs.readdirSync(path.join(root, "vs"), { withFileTypes: true }).filter((entry) => entry.isDirectory()).length
  : 0;
const comparisonPages = Math.max(comparisonDirs, countCsvRows(comparisonPageIndexPath));
const categoryPages = countCsvRows(categoryPageIndexPath);
const useCasePages = countCsvRows(useCasePageIndexPath);
const cashReadyBrands = countCsvRows(cashReadinessPath);
const moneyPageQueueRows = countCsvRows(moneyPageQueuePath);
const moneyPageUpgradesApplied = countCsvRows(moneyPageUpgradesAppliedPath);
const moneyPageBriefs = fs.existsSync(path.join(root, "content", "money-page-briefs"))
  ? fs.readdirSync(path.join(root, "content", "money-page-briefs"), { withFileTypes: true }).filter((entry) => entry.isFile() && entry.name.endsWith(".md")).length
  : 0;
const sitemapText = fs.existsSync(path.join(root, "sitemap.xml")) ? fs.readFileSync(path.join(root, "sitemap.xml"), "utf8") : "";
const sitemapUrls = (sitemapText.match(/<loc>/g) || []).length;

const marketRows = targetMarkets.map((market) => {
  const current = currentCountryCount(brandRows, market.slug);
  return [
    market.region,
    market.country,
    market.slug,
    market.language,
    market.priority,
    market.brandTarget,
    current,
    market.brandTarget - current > 0 ? market.brandTarget - current : 0,
    statusForMarket(current, market.brandTarget),
    "meal kits; prepared meals; high protein; diet; vegan; family; frozen; budget; grocery dinner",
    `Build country hub plus ${categoryTargets.length} commercial pages, then add brand reviews and vs pages from verified brands.`,
  ];
});

writeCsv(
  marketTargetsPath,
  [
    "region",
    "country",
    "country_slug",
    "language",
    "priority",
    "target_brand_market_rows",
    "current_brand_market_rows",
    "gap_to_target",
    "status",
    "priority_categories",
    "next_action",
  ],
  marketRows
);

const architectureHeaders = [
  "site",
  "page_type",
  "parent_slug",
  "slug",
  "url",
  "primary_keyword",
  "secondary_keywords",
  "intent",
  "funnel_stage",
  "location",
  "service_or_topic",
  "target_persona",
  "title",
  "meta_description",
  "h1",
  "content_angle",
  "internal_links",
  "schema_type",
  "status",
  "priority",
  "metric_source",
  "notes",
];

const architectureRows = [];

for (const market of targetMarkets) {
  for (const category of categoryTargets) {
    const parentSlug = `countries/${market.slug}`;
    const url = `https://www.everymealguide.com/${parentSlug}/${category.slug}/`;
    const primaryKeyword = `${category.keyword} ${market.country}`.trim();
    const title = `${primaryKeyword.replace(/\b\w/g, (char) => char.toUpperCase())} | Every Meal Guide`;
    const h1 = `${category.keyword.replace(/\b\w/g, (char) => char.toUpperCase())} in ${market.country}`;
    const status = currentCountryCount(brandRows, market.country) > 0 ? "planned_from_existing_coverage" : "planned_needs_brand_research";

    architectureRows.push([
      "Every Meal Guide",
      category.pageType,
      parentSlug,
      category.slug,
      url,
      primaryKeyword,
      `${category.topic}; deals; reviews; alternatives; delivery coverage`,
      category.funnel,
      category.funnel === "transactional" ? "bottom" : "middle",
      market.country,
      category.topic,
      "consumer dinner buyer",
      title,
      `Compare ${category.topic} in ${market.country} by price, format, routine fit, and current deal quality.`,
      h1,
      `Country-specific buyer table with verified brands, deal routing, category definitions, and clear fit verdicts.`,
      `/countries/${market.slug}/; /best/meal-delivery-services/; /deals/best-meal-delivery-deals/`,
      category.pageType === "comparison" ? "Article,BreadcrumbList,FAQPage" : "ItemList,BreadcrumbList,FAQPage",
      status,
      market.priority,
      "needs_live_metrics",
      "Generated from global domination operating layer. Build only after brand/source rows exist for the market or category.",
    ]);
  }
}

writeCsv(siteArchitecturePath, architectureHeaders, architectureRows);

const researchRows = [];

for (const market of targetMarkets) {
  researchRows.push([
    market.priority,
    market.country,
    "brand_discovery",
    `"meal delivery services ${market.country}" OR "meal kit ${market.country}" OR "prepared meals delivery ${market.country}"`,
    "Find serious commercial brands, official URLs, service type, delivery coverage, and affiliate/contact path.",
    "needs_research",
  ]);
  researchRows.push([
    market.priority,
    market.country,
    "affiliate_discovery",
    `"${market.country}" "meal delivery" affiliate program OR partner program`,
    "Find network, direct partner page, commission hints, approval requirements, and geographic restrictions.",
    "needs_research",
  ]);
}

writeCsv(
  researchQueuePath,
  ["priority", "country", "research_type", "query", "purpose", "status"],
  researchRows
);

const topAffiliateRows = affiliateRows.slice(0, 100).map((row, index) => [
  index + 1,
  row.brand,
  row.route,
  row.countries,
  row.categories,
  row.official_url,
  row.affiliate_target,
  row.next_action,
  "apply_or_contact_after_domain_live",
]);

writeCsv(
  affiliateTop100Path,
  [
    "priority_rank",
    "brand",
    "route",
    "countries",
    "categories",
    "official_url",
    "affiliate_target",
    "next_action",
    "owner_gate",
  ],
  topAffiliateRows
);

const status = {
  generatedAt: new Date().toISOString(),
  target: {
    countries: targetCountries,
    brandMarketRows: targetBrandMarketRows,
    uniqueBrands: 1000,
    sitemapUrls: 2500,
    reviewPages: 1000,
    categoryPages: 275,
    useCasePages: 150,
    comparisonPages: 1500,
    goRoutes: 1000,
    cashReadyBrands: 1000,
    moneyPageQueueRows: 450,
    moneyPageBriefs: 100,
    moneyPageUpgradesApplied: 100,
    affiliatePriorityRows: 100,
  },
  current: {
    countries: existingCountries,
    brandMarketRows: brandRows.length,
    uniqueBrands,
    sitemapUrls,
    reviewPages: reviews,
    categoryPages,
    useCasePages,
    comparisonPages,
    goRoutes,
    cashReadyBrands,
    moneyPageQueueRows,
    moneyPageBriefs,
    moneyPageUpgradesApplied,
    affiliatePriorityRows: topAffiliateRows.length,
  },
  score: {
    countries: scorePercent(existingCountries, targetCountries),
    brandMarketRows: scorePercent(brandRows.length, targetBrandMarketRows),
    uniqueBrands: scorePercent(uniqueBrands, 1000),
    sitemapUrls: scorePercent(sitemapUrls, 2500),
    reviewPages: scorePercent(reviews, 1000),
    categoryPages: scorePercent(categoryPages, 275),
    useCasePages: scorePercent(useCasePages, 150),
    comparisonPages: scorePercent(comparisonPages, 1500),
    goRoutes: scorePercent(goRoutes, 1000),
    cashReadyBrands: scorePercent(cashReadyBrands, 1000),
    moneyPageQueueRows: scorePercent(moneyPageQueueRows, 450),
    moneyPageBriefs: scorePercent(moneyPageBriefs, 100),
    moneyPageUpgradesApplied: scorePercent(moneyPageUpgradesApplied, 100),
    affiliatePriorityRows: scorePercent(topAffiliateRows.length, 100),
  },
  marketCoverage: Object.fromEntries(countBy(brandRows, "country")),
  categoryCoverageTop20: Object.fromEntries(countBy(brandRows, "category").slice(0, 20)),
  nextMoves: [
    "Run brand discovery for priority-2 markets: New Zealand, Germany, France, Netherlands, Spain, Italy, Sweden, Denmark, Norway.",
    "Convert verified new brands into global-brand-universe rows before generating public pages.",
    "Generate missing review pages for all route-ready brands, prioritizing top affiliate queue rows.",
    "Generate and improve buyer-intent use-case pages from the brand ledger, then add deeper source-backed copy to the pages with the strongest commercial fit.",
    "Work down seo/money-page-upgrade-queue.csv with npm run money:apply-upgrades, applying source-backed conversion panels to the highest-value pages.",
    "After domain is live, apply to top 100 affiliate programs and replace only approved links.",
  ],
};

fs.mkdirSync(path.dirname(statusJsonPath), { recursive: true });
fs.writeFileSync(statusJsonPath, JSON.stringify(status, null, 2) + "\n");

const currentScore = Math.round(
  (status.score.countries +
    status.score.brandMarketRows +
    status.score.uniqueBrands +
    status.score.sitemapUrls +
    status.score.reviewPages +
    status.score.categoryPages +
    status.score.useCasePages +
    status.score.comparisonPages +
    status.score.goRoutes +
    status.score.cashReadyBrands +
    status.score.moneyPageQueueRows +
    status.score.moneyPageBriefs +
    status.score.moneyPageUpgradesApplied +
    status.score.affiliatePriorityRows) /
    14
);

const markdown = `# Global Domination Status

Generated: ${status.generatedAt}

## Current score

Every Meal Guide is **${currentScore}/100** toward the global domination target.

This is different from launch readiness. Launch readiness can be much higher while global domination is still early.

## Current state

| Area | Current | Target | Score |
|---|---:|---:|---:|
| Countries with brand coverage | ${existingCountries} | ${targetCountries} | ${status.score.countries}% |
| Brand-market rows | ${brandRows.length} | ${targetBrandMarketRows} | ${status.score.brandMarketRows}% |
| Unique brands | ${uniqueBrands} | 1000 | ${status.score.uniqueBrands}% |
| Sitemap URLs | ${sitemapUrls} | 2500 | ${status.score.sitemapUrls}% |
| Review pages | ${reviews} | 1000 | ${status.score.reviewPages}% |
| Country/category SEO pages | ${categoryPages} | 275 | ${status.score.categoryPages}% |
| Buyer-intent use-case pages | ${useCasePages} | 150 | ${status.score.useCasePages}% |
| Comparison pages | ${comparisonPages} | 1500 | ${status.score.comparisonPages}% |
| Tracked /go/ routes | ${goRoutes} | 1000 | ${status.score.goRoutes}% |
| Cash-ready brand routes | ${cashReadyBrands} | 1000 | ${status.score.cashReadyBrands}% |
| Money-page upgrade queue | ${moneyPageQueueRows} | 450 | ${status.score.moneyPageQueueRows}% |
| Money-page briefs | ${moneyPageBriefs} | 100 | ${status.score.moneyPageBriefs}% |
| Money pages upgraded on-site | ${moneyPageUpgradesApplied} | 100 | ${status.score.moneyPageUpgradesApplied}% |
| Top affiliate queue | ${topAffiliateRows.length} | 100 | ${status.score.affiliatePriorityRows}% |

## What changed in this pass

- Created the global market target source of truth: \`seo/global-market-targets.csv\`.
- Created the global SEO architecture source of truth: \`seo/global-seo-site-architecture.csv\`.
- Created a research queue for country-by-country brand and affiliate discovery: \`seo/global-research-queue.csv\`.
- Created a top-100 affiliate action queue for post-domain applications: \`seo/top-affiliate-priority-100.csv\`.
- Counted applied on-page commercial upgrades from \`seo/money-page-upgrades-applied.csv\`.

## Next non-human work

1. Expand priority-2 countries with verified brand rows.
2. Generate missing review pages for route-ready brands.
3. Generate more comparison pages from verified high-intent brand pairs.
4. Run \`npm run money:apply-upgrades\` after page generation to keep the strongest use-case and comparison pages upgraded with richer source-backed decision copy.
5. Keep affiliate applications ready, but do not submit until the domain is live and the owner approves.

## Human gates

- Domain purchase and DNS.
- Deployment approval.
- Analytics/Search Console ownership.
- Affiliate applications and direct partner outreach.
- Approved affiliate URL swaps.
`;

fs.writeFileSync(statusMdPath, markdown);

const operatingPlan = `# Every Meal Guide Global Domination Operating Plan

## North star

Own the consumer decision layer for meal delivery globally: meal kits, prepared meals, high-protein meal prep, diet meals, frozen meals, kids meals, vegan meals, grocery dinner boxes, and local dinner subscriptions.

## Current operating target

- 25 priority markets.
- 1,000 unique brands.
- 1,365 brand-market coverage rows minimum.
- 1,000 review pages.
- 1,500 comparison pages.
- 2,500 sitemap URLs.
- Every monetizable brand has a tracked \`/go/\` route.
- Top 100 affiliate applications ready immediately after domain/deploy.

## Build rules

- Add brands to \`seo/global-brand-universe.csv\` only when the brand name, market, category, and official/source status are known.
- Add public pages from \`seo/global-seo-site-architecture.csv\`, not from one-off ideas.
- Do not fake prices, reviews, availability, or affiliate relationships.
- Keep \`/go/\` routes live as honest holding pages until approved tracking URLs exist.
- Prioritize pages by buyer intent: best pages, comparison pages, review pages, deals, then informational guides.

## Current priority sequence

1. Launch \`everymealguide.com\` when Darren buys/connects the domain.
2. Submit sitemap and connect analytics/Search Console after approval.
3. Apply to top 100 affiliate programs from \`seo/top-affiliate-priority-100.csv\`.
4. Expand priority-2 markets: New Zealand, Germany, France, Netherlands, Spain, Italy, Sweden, Denmark, Norway.
5. Generate missing review pages for all route-ready brands.
6. Generate high-intent vs pages from same-market brand pairs.
7. Run \`npm run money:briefs\`, then \`npm run money:apply-upgrades\`, then \`npm run domination:status\`.
8. Add weekly offer freshness checks and visible "last checked" notes.
9. Redesign the top money pages to premium comparison-site quality.

## Cash-readiness definition

A page is cash-ready when it has:

- A clear buyer-intent keyword.
- A visible comparison table or ranking.
- A tracked \`/go/\` route for each commercial brand.
- Affiliate disclosure.
- Internal links to deals, comparisons, and alternatives.
- A source/freshness note.
- A post-launch action in the affiliate queue.
`;

fs.writeFileSync(operatingPlanPath, operatingPlan);

console.log(
  JSON.stringify(
    {
      currentScore,
      marketTargets: targetMarkets.length,
      architectureRows: architectureRows.length,
      researchRows: researchRows.length,
      affiliatePriorityRows: topAffiliateRows.length,
      outputs: [
        marketTargetsPath,
        siteArchitecturePath,
        researchQueuePath,
        affiliateTop100Path,
        statusJsonPath,
        statusMdPath,
        operatingPlanPath,
      ],
    },
    null,
    2
  )
);

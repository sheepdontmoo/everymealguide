import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const sourcePath = path.join(root, "seo", "global-brand-universe.csv");
const sitemapPath = path.join(root, "sitemap.xml");
const reportsDir = path.join(root, "reports");
const reportJsonPath = path.join(reportsDir, "coverage-gap-report-2026-06-24.json");
const reportMdPath = path.join(reportsDir, "coverage-gap-report-2026-06-24.md");
const targetsCsvPath = path.join(root, "seo", "coverage-expansion-targets-2026-06-24.csv");

const targetCountryPlan = [
  "United States",
  "United Kingdom",
  "Ireland",
  "Australia",
  "Canada",
  "New Zealand",
  "Germany",
  "France",
  "Netherlands",
  "Spain",
  "Italy",
  "Sweden",
  "Denmark",
  "Norway",
  "Belgium",
  "Switzerland",
  "Austria",
  "Poland",
  "Finland",
  "Portugal",
  "Greece",
  "Czech Republic",
  "Romania",
  "Hungary",
  "Turkey",
  "Israel",
  "UAE",
  "Saudi Arabia",
  "Qatar",
  "Kuwait",
  "Singapore",
  "Malaysia",
  "Thailand",
  "Philippines",
  "Indonesia",
  "Japan",
  "South Korea",
  "Taiwan",
  "Hong Kong",
  "India",
  "Vietnam",
  "China",
  "Mexico",
  "Brazil",
  "Argentina",
  "Chile",
  "Colombia",
  "South Africa",
  "Egypt",
  "Nigeria",
  "Kenya",
  "Morocco",
];

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

function csvCell(value) {
  const text = String(value ?? "");
  return /[",\n\r]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
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

function scoreCountry(country, count, missingFromPlan) {
  if (missingFromPlan) return 100;
  if (count === 0) return 90;
  if (count < 3) return 80;
  if (count < 5) return 65;
  if (count < 10) return 45;
  return 20;
}

if (!fs.existsSync(sourcePath)) {
  throw new Error(`Missing brand universe: ${sourcePath}`);
}

const rows = parseCsv(fs.readFileSync(sourcePath, "utf8")).filter((row) => row.brand);
const brandSlugs = new Set(rows.map((row) => slugify(row.brand)).filter(Boolean));
const countryCounts = new Map();
const countryBrandSlugs = new Map();
const categoryCounts = new Map();
const goEligible = new Set();

for (const row of rows) {
  const country = normalizeCountry(row.country);
  const brandSlug = slugify(row.brand);
  const category = row.category || "Unclassified";

  countryCounts.set(country, (countryCounts.get(country) || 0) + 1);
  categoryCounts.set(category, (categoryCounts.get(category) || 0) + 1);

  if (!countryBrandSlugs.has(country)) countryBrandSlugs.set(country, new Set());
  countryBrandSlugs.get(country).add(brandSlug);

  if (brandSlug && row.official_url) goEligible.add(brandSlug);
}

const sitemapUrls = fs.existsSync(sitemapPath)
  ? [...fs.readFileSync(sitemapPath, "utf8").matchAll(/<loc>/g)].length
  : 0;

const normalizedTargetPlan = targetCountryPlan.map(normalizeCountry);
const coveredCountries = new Set([...countryCounts.keys()]);
const missingTargetCountries = normalizedTargetPlan.filter((country) => !coveredCountries.has(country));
const underCoveredCountries = [...countryBrandSlugs.entries()]
  .map(([country, brands]) => ({ country, uniqueBrands: brands.size, rows: countryCounts.get(country) || 0 }))
  .filter((entry) => entry.uniqueBrands < 10)
  .sort((a, b) => a.uniqueBrands - b.uniqueBrands || a.country.localeCompare(b.country));

const targetRows = [
  ["country", "current_unique_brands", "current_rows", "target_unique_brands", "gap_to_target", "priority_score", "recommended_next_step"],
];

for (const country of normalizedTargetPlan) {
  const currentUnique = countryBrandSlugs.get(country)?.size || 0;
  const currentRows = countryCounts.get(country) || 0;
  const target = country === "United States" || country === "United Kingdom" || country === "Australia" || country === "Canada" ? 75 : 15;
  const gap = Math.max(0, target - currentUnique);
  const missingFromPlan = !coveredCountries.has(country);

  targetRows.push([
    country,
    currentUnique,
    currentRows,
    target,
    gap,
    scoreCountry(country, currentUnique, missingFromPlan),
    missingFromPlan
      ? "Research and add first 10-15 verified consumer meal-delivery brands."
      : gap > 0
        ? "Expand verified brands and create country/category pages after source checks."
        : "Maintain freshness and partner routes.",
  ]);
}

const report = {
  generatedAt: new Date().toISOString(),
  current: {
    brandRows: rows.length,
    uniqueBrands: brandSlugs.size,
    uniqueCountries: coveredCountries.size,
    sitemapUrls,
    goEligibleBrands: goEligible.size,
  },
  targets: {
    uniqueBrands: 1000,
    uniqueCountries: 50,
    seoLandingPages: 10000,
  },
  gaps: {
    brandsNeededFor1000: Math.max(0, 1000 - brandSlugs.size),
    countriesNeededFor50: Math.max(0, 50 - coveredCountries.size),
    seoPagesNeededFor10000: Math.max(0, 10000 - sitemapUrls),
    targetPlanCountriesMissing: missingTargetCountries.length,
  },
  topCountriesByRows: [...countryCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)
    .map(([country, rows]) => ({ country, rows, uniqueBrands: countryBrandSlugs.get(country)?.size || 0 })),
  underCoveredCountries: underCoveredCountries.slice(0, 30),
  missingTargetCountries: missingTargetCountries.slice(0, 30),
  topCategories: [...categoryCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 30)
    .map(([category, rows]) => ({ category, rows })),
};

fs.mkdirSync(reportsDir, { recursive: true });
fs.writeFileSync(reportJsonPath, JSON.stringify(report, null, 2) + "\n", "utf8");
fs.writeFileSync(targetsCsvPath, targetRows.map((row) => row.map(csvCell).join(",")).join("\n") + "\n", "utf8");

fs.writeFileSync(
  reportMdPath,
  `# Coverage Gap Report - 2026-06-24

## Current local coverage

- Brand rows: ${report.current.brandRows}
- Unique brands: ${report.current.uniqueBrands}
- Unique countries: ${report.current.uniqueCountries}
- Sitemap URLs: ${report.current.sitemapUrls}
- Brands with official URLs and generated /go/ eligibility: ${report.current.goEligibleBrands}

## Gap to stated targets

- Brands needed for 1,000+: ${report.gaps.brandsNeededFor1000}
- Countries needed for 50+: ${report.gaps.countriesNeededFor50}
- SEO URLs needed for 10,000+: ${report.gaps.seoPagesNeededFor10000}
- Target-plan countries not yet covered: ${report.gaps.targetPlanCountriesMissing}

## Highest-priority missing countries

${report.missingTargetCountries.slice(0, 20).map((country) => `- ${country}`).join("\n") || "- None from the target plan"}

## Under-covered existing countries

${report.underCoveredCountries.slice(0, 20).map((entry) => `- ${entry.country}: ${entry.uniqueBrands} unique brands`).join("\n") || "- None"}

## Next expansion rule

Do not claim global domination from page volume alone.

The next data-expansion sprint should add verified consumer meal-delivery brands in missing or under-covered countries, with official URLs and clear categories, before creating stronger public recommendations.
`,
  "utf8"
);

console.log(
  JSON.stringify(
    {
      uniqueBrands: report.current.uniqueBrands,
      uniqueCountries: report.current.uniqueCountries,
      sitemapUrls: report.current.sitemapUrls,
      brandsNeededFor1000: report.gaps.brandsNeededFor1000,
      countriesNeededFor50: report.gaps.countriesNeededFor50,
      seoPagesNeededFor10000: report.gaps.seoPagesNeededFor10000,
      reportJsonPath,
      reportMdPath,
      targetsCsvPath,
    },
    null,
    2
  )
);


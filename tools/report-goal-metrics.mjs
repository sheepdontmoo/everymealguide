import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const universePath = path.join(root, "seo", "global-brand-universe.csv");
const reportPath = path.join(root, "reports", "goal-metrics-current.json");

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
      value = "";
      if (row.some((cell) => cell.trim())) rows.push(row);
      row = [];
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

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function walkHtml(directory, excluded = new Set()) {
  if (!fs.existsSync(directory)) return [];
  const files = [];

  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (excluded.has(entry.name)) continue;
      files.push(...walkHtml(path.join(directory, entry.name), excluded));
      continue;
    }

    if (entry.name.toLowerCase() === "index.html") files.push(path.join(directory, entry.name));
  }

  return files;
}

function countDirectories(directory) {
  if (!fs.existsSync(directory)) return 0;
  return fs.readdirSync(directory, { withFileTypes: true }).filter((entry) => entry.isDirectory()).length;
}

const rows = fs.existsSync(universePath) ? parseCsv(fs.readFileSync(universePath, "utf8")) : [];
const brands = new Set(rows.map((row) => slugify(row.brand)).filter(Boolean));
const countries = new Set(rows.map((row) => row.country).filter(Boolean));
const eligibleBrands = new Set(
  rows
    .filter((row) => !/inactive|not active|watchlist/i.test(`${row.site_status} ${row.affiliate_program_target}`))
    .map((row) => slugify(row.brand))
    .filter(Boolean)
);

const goRouteCount = countDirectories(path.join(root, "go"));
const reviewRouteCount = countDirectories(path.join(root, "reviews"));
const publicHtmlFiles = walkHtml(root, new Set([".git", ".vercel", "node_modules"]));
const seoLandingPages = publicHtmlFiles.filter((file) =>
  /[\\/](best|countries|reviews|vs|deals|use-cases|brand-directory)[\\/]/i.test(file)
);

const missingGoRoutes = [...eligibleBrands]
  .filter((brandSlug) => !fs.existsSync(path.join(root, "go", brandSlug, "index.html")))
  .sort();

const metrics = {
  generatedAt: new Date().toISOString(),
  targets: {
    brands: 1000,
    countries: 50,
    seoLandingPages: 10000,
    eligibleBrandsLinkedViaGoPages: "100%",
  },
  current: {
    sourceRows: rows.length,
    uniqueBrands: brands.size,
    uniqueCountries: countries.size,
    goRoutes: goRouteCount,
    reviewRoutes: reviewRouteCount,
    publicIndexHtmlFiles: publicHtmlFiles.length,
    seoLandingPages: seoLandingPages.length,
    eligibleBrands: eligibleBrands.size,
    missingGoRoutes: missingGoRoutes.length,
  },
  progress: {
    brandsToTarget: Math.max(0, 1000 - brands.size),
    countriesToTarget: Math.max(0, 50 - countries.size),
    seoLandingPagesToTarget: Math.max(0, 10000 - seoLandingPages.length),
    goRouteCoveragePercent: eligibleBrands.size
      ? Number((((eligibleBrands.size - missingGoRoutes.length) / eligibleBrands.size) * 100).toFixed(2))
      : 0,
  },
  missingGoRoutes: missingGoRoutes.slice(0, 100),
};

fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(reportPath, `${JSON.stringify(metrics, null, 2)}\n`);

console.log(JSON.stringify(metrics, null, 2));

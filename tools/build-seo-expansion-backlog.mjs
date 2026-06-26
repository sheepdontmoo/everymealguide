import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const sourcePath = path.join(root, "seo", "global-brand-universe.csv");
const sitemapPath = path.join(root, "sitemap.xml");
const backlogPath = path.join(root, "seo", "seo-expansion-backlog-2026-06-24.csv");
const reportPath = path.join(root, "reports", "seo-expansion-backlog-2026-06-24.md");
const targetCandidates = Math.max(5000, Number(process.argv[2] || 5000));

const useCaseRoutes = [
  ["prepared meals", "best-prepared-meal-delivery"],
  ["meal kits", "best-meal-kits"],
  ["high-protein meals", "best-high-protein-meal-delivery"],
  ["cheap meal delivery", "best-cheap-meal-delivery"],
  ["healthy meal delivery", "best-healthy-meal-delivery"],
  ["family meal delivery", "best-family-meal-delivery"],
  ["frozen meals", "best-frozen-meal-delivery"],
  ["vegan meal delivery", "best-vegan-meal-delivery"],
  ["weight-loss meal delivery", "best-weight-loss-meal-delivery"],
  ["grocery dinner delivery", "best-grocery-dinner-delivery"],
];

const buyerModifiers = [
  ["for busy professionals", "busy-professionals"],
  ["for families", "families"],
  ["for fitness", "fitness"],
  ["for weight loss", "weight-loss"],
  ["for beginners", "beginners"],
  ["for picky eaters", "picky-eaters"],
  ["for couples", "couples"],
  ["for seniors", "seniors"],
  ["for students", "students"],
  ["for one person", "one-person"],
  ["with no cooking", "no-cooking"],
  ["with the easiest cancellation", "easy-cancellation"],
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

function categoryBucket(category) {
  const value = String(category || "").toLowerCase();

  if (/prepared|ready|heat|meal prep/.test(value)) return "prepared meals";
  if (/meal kit|recipe|cook/.test(value)) return "meal kits";
  if (/protein|fitness|macro/.test(value)) return "high-protein meals";
  if (/budget|cheap|value/.test(value)) return "cheap meal delivery";
  if (/frozen/.test(value)) return "frozen meals";
  if (/plant|vegan|vegetarian/.test(value)) return "vegan meal delivery";
  if (/diet|weight|medical|keto|fodmap/.test(value)) return "weight-loss meal delivery";
  if (/kid|baby|family/.test(value)) return "family meal delivery";
  if (/grocery|produce|market|starter/.test(value)) return "grocery dinner delivery";
  return "meal delivery";
}

function priorityScore(row) {
  const priority = String(row.priority || "").toLowerCase();
  const status = String(row.site_status || "").toLowerCase();
  let score = 0;

  if (priority.includes("p0") || priority === "1") score += 40;
  else if (priority.includes("p1") || priority === "2") score += 30;
  else if (priority.includes("p2") || priority === "3") score += 20;
  else score += 10;

  if (status.includes("active")) score += 25;
  if (row.official_url) score += 20;
  if (row.market_role) score += 10;

  return score;
}

function existingUrls() {
  if (!fs.existsSync(sitemapPath)) return new Set();
  return new Set([...fs.readFileSync(sitemapPath, "utf8").matchAll(/<loc>https:\/\/www\.everymealguide\.com([^<]+)<\/loc>/g)].map((match) => match[1]));
}

function addCandidate(candidates, seen, currentUrls, candidate) {
  if (!candidate.url || seen.has(candidate.url) || currentUrls.has(candidate.url)) return;
  seen.add(candidate.url);
  candidates.push(candidate);
}

if (!fs.existsSync(sourcePath)) {
  throw new Error(`Missing brand universe: ${sourcePath}`);
}

const rows = parseCsv(fs.readFileSync(sourcePath, "utf8")).filter((row) => row.brand);
const currentUrls = existingUrls();
const byCountry = new Map();
const byBrand = new Map();

for (const row of rows) {
  const country = normalizeCountry(row.country);
  const brandSlug = slugify(row.brand);

  if (!byCountry.has(country)) byCountry.set(country, []);
  byCountry.get(country).push(row);

  if (!byBrand.has(brandSlug)) byBrand.set(brandSlug, []);
  byBrand.get(brandSlug).push({ ...row, country });
}

const candidates = [];
const seen = new Set();

for (const [country, countryRows] of [...byCountry.entries()].sort((a, b) => b[1].length - a[1].length)) {
  const countrySlug = slugify(country);
  const buckets = new Map();

  for (const row of countryRows) {
    const bucket = categoryBucket(row.category);
    if (!buckets.has(bucket)) buckets.set(bucket, []);
    buckets.get(bucket).push(row);
  }

  for (const [label, route] of useCaseRoutes) {
    const bucketRows = buckets.get(label) || [];
    const uniqueBrands = new Set(bucketRows.map((row) => slugify(row.brand)));
    const ready = uniqueBrands.size >= 3 ? "ready_to_brief" : uniqueBrands.size >= 2 ? "needs_one_more_brand" : "not_ready";

    addCandidate(candidates, seen, currentUrls, {
      url: `/countries/${countrySlug}/${route}-comparison-guide/`,
      page_type: "country_use_case_guide",
      country,
      topic: label,
      primary_brand: bucketRows[0]?.brand || "",
      secondary_brand: bucketRows[1]?.brand || "",
      brand_count: uniqueBrands.size,
      readiness: ready,
      quality_gate: ready === "ready_to_brief" ? "needs_editorial_brief_before_publish" : "needs_more_verified_brands",
      intent: `Compare ${label} in ${country} with a 60-second first-pick answer.`,
    });

    for (const [modifierLabel, modifierSlug] of buyerModifiers) {
      if (candidates.length >= targetCandidates) break;
      addCandidate(candidates, seen, currentUrls, {
        url: `/countries/${countrySlug}/${route}-${modifierSlug}/`,
        page_type: "country_modifier_guide",
        country,
        topic: `${label} ${modifierLabel}`,
        primary_brand: bucketRows[0]?.brand || "",
        secondary_brand: bucketRows[1]?.brand || "",
        brand_count: uniqueBrands.size,
        readiness: ready,
        quality_gate: ready === "ready_to_brief" ? "needs_editorial_brief_before_publish" : "needs_more_verified_brands",
        intent: `Help ${modifierLabel.replace(/^for |^with /, "")} choose ${label} in ${country}.`,
      });
    }
  }
}

for (const [brandSlug, brandRows] of [...byBrand.entries()].sort((a, b) => priorityScore(b[1][0]) - priorityScore(a[1][0]))) {
  if (candidates.length >= targetCandidates) break;
  const first = brandRows[0];
  const country = normalizeCountry(first.country);
  const countrySlug = slugify(country);
  const category = categoryBucket(first.category);

  for (const angle of [
    ["alternatives", "alternatives"],
    ["reviews and deals", "reviews-and-deals"],
    ["is it worth it", "is-it-worth-it"],
    ["for families", "for-families"],
    ["for weight loss", "for-weight-loss"],
    ["for high protein meals", "for-high-protein-meals"],
  ]) {
    if (candidates.length >= targetCandidates) break;
    addCandidate(candidates, seen, currentUrls, {
      url: `/reviews/${brandSlug}/${angle[1]}-${countrySlug}/`,
      page_type: "brand_angle_page",
      country,
      topic: `${first.brand} ${angle[0]}`,
      primary_brand: first.brand,
      secondary_brand: "",
      brand_count: new Set(brandRows.map((row) => slugify(row.brand))).size,
      readiness: first.official_url ? "ready_to_brief" : "needs_source",
      quality_gate: "needs_editorial_brief_before_publish",
      intent: `Answer whether ${first.brand} is a good ${category} fit in ${country}.`,
    });
  }
}

const headers = [
  "url",
  "page_type",
  "country",
  "topic",
  "primary_brand",
  "secondary_brand",
  "brand_count",
  "readiness",
  "quality_gate",
  "intent",
];

fs.writeFileSync(
  backlogPath,
  [headers, ...candidates.map((candidate) => headers.map((header) => candidate[header] || ""))]
    .map((row) => row.map(csvCell).join(","))
    .join("\n") + "\n",
  "utf8"
);

const ready = candidates.filter((candidate) => candidate.readiness === "ready_to_brief").length;
const needsMoreBrands = candidates.filter((candidate) => candidate.readiness !== "ready_to_brief").length;

fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(
  reportPath,
  `# SEO Expansion Backlog - 2026-06-24

## Purpose

Close the measured SEO URL gap without publishing thin pages.

## Current output

- Candidate URLs: ${candidates.length}
- Ready for editorial brief: ${ready}
- Need more verified brands first: ${needsMoreBrands}

## Rule

Candidate URLs are not published pages.

A candidate should only become a public page after:

- enough verified brands exist for the country/topic
- the page has a real 60-second answer
- the page links to reviews and /go/ offer checks
- public copy passes internal-wording guards
- the page is reviewed for usefulness, not only SEO volume

## Files

- Backlog CSV: \`seo/seo-expansion-backlog-2026-06-24.csv\`
`,
  "utf8"
);

console.log(
  JSON.stringify(
    {
      candidates: candidates.length,
      readyToBrief: ready,
      needsMoreBrands,
      backlogPath,
      reportPath,
    },
    null,
    2
  )
);


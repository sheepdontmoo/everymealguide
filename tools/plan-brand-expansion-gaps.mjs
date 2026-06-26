import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const universePath = path.join(root, "seo", "global-brand-universe.csv");
const planPath = path.join(root, "seo", "brand-expansion-gap-plan.csv");
const reportPath = path.join(root, "reports", "brand-expansion-gap-plan.json");

const priorityCountries = [
  "US",
  "UK",
  "Canada",
  "Australia",
  "Ireland",
  "Germany",
  "France",
  "Netherlands",
  "Spain",
  "Italy",
  "Belgium",
  "Switzerland",
  "Austria",
  "New Zealand",
  "Singapore",
  "UAE",
];

const categoryTargets = [
  { match: /meal kit|recipe kit|organic meal kit|budget meal kit/i, label: "meal kits", target: 12 },
  { match: /prepared|ready meals|ready meal|meal prep/i, label: "prepared meals", target: 16 },
  { match: /protein|fitness|macro/i, label: "high-protein meal prep", target: 8 },
  { match: /diet|weight loss|medical|special/i, label: "diet and specialist meals", target: 8 },
  { match: /frozen/i, label: "frozen meals", target: 6 },
  { match: /family|kids|baby|toddler/i, label: "family and kids meals", target: 6 },
  { match: /grocery|produce|pantry|protein box|seafood|meat/i, label: "grocery dinner shortcuts", target: 6 },
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

function csvCell(value) {
  const text = String(value ?? "");
  return /[",\n\r]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function toCsv(rows) {
  return `${rows.map((row) => row.map(csvCell).join(",")).join("\n")}\n`;
}

function normalizedCountry(value) {
  const text = String(value || "").trim();
  const lower = text.toLowerCase();
  if (lower === "united states" || lower === "usa" || lower === "us") return "US";
  if (lower === "united kingdom" || lower === "great britain" || lower === "uk") return "UK";
  if (lower === "uae" || lower === "united arab emirates") return "UAE";
  return text ? text.charAt(0).toUpperCase() + text.slice(1) : "Unknown";
}

function categoryBucket(category) {
  const target = categoryTargets.find((entry) => entry.match.test(category || ""));
  return target?.label || "other meal delivery";
}

function targetFor(country, bucket) {
  const target = categoryTargets.find((entry) => entry.label === bucket)?.target || 4;
  if (priorityCountries.includes(country)) return target;
  return Math.max(3, Math.ceil(target / 2));
}

if (!fs.existsSync(universePath)) {
  throw new Error(`Missing brand universe: ${universePath}`);
}

const rows = parseCsv(fs.readFileSync(universePath, "utf8")).filter((row) => row.brand);
const counts = new Map();

for (const row of rows) {
  const country = normalizedCountry(row.country);
  const bucket = categoryBucket(row.category);
  const key = `${country}::${bucket}`;
  const current = counts.get(key) || {
    country,
    bucket,
    brands: new Set(),
    activeBrands: new Set(),
  };

  current.brands.add(row.brand);
  if (/active/i.test(row.site_status || "")) current.activeBrands.add(row.brand);
  counts.set(key, current);
}

const planRows = [
  [
    "priority",
    "country",
    "category_bucket",
    "current_brands",
    "active_brands",
    "target_brands",
    "gap",
    "why_it_matters",
    "next_research_action",
  ],
];

const gaps = [...counts.values()]
  .map((entry) => {
    const target = targetFor(entry.country, entry.bucket);
    const gap = Math.max(0, target - entry.brands.size);
    const priority = priorityCountries.includes(entry.country) ? "P0" : gap >= 4 ? "P1" : "P2";
    return {
      ...entry,
      target,
      gap,
      priority,
    };
  })
  .filter((entry) => entry.gap > 0)
  .sort((a, b) => {
    const priorityOrder = { P0: 0, P1: 1, P2: 2 };
    return (
      priorityOrder[a.priority] - priorityOrder[b.priority] ||
      b.gap - a.gap ||
      a.country.localeCompare(b.country) ||
      a.bucket.localeCompare(b.bucket)
    );
  });

for (const gap of gaps) {
  planRows.push([
    gap.priority,
    gap.country,
    gap.bucket,
    gap.brands.size,
    gap.activeBrands.size,
    gap.target,
    gap.gap,
    `${gap.country} ${gap.bucket} coverage needs enough real options for a confident shortlist.`,
    `Find ${gap.gap} verified active ${gap.bucket} brands in ${gap.country}; require official URL, delivery area, category, status, and offer/contact route.`,
  ]);
}

fs.mkdirSync(path.dirname(planPath), { recursive: true });
fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(planPath, toCsv(planRows));
fs.writeFileSync(
  reportPath,
  `${JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      sourceRows: rows.length,
      gapCount: gaps.length,
      totalMissingBrandsToLaneTargets: gaps.reduce((sum, gap) => sum + gap.gap, 0),
      p0Gaps: gaps.filter((gap) => gap.priority === "P0").length,
      planPath: path.relative(root, planPath),
    },
    null,
    2
  )}\n`
);

console.log(JSON.stringify({ gapCount: gaps.length, planPath, reportPath }, null, 2));

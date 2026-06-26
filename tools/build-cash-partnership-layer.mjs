import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const sourcePath = path.join(root, "seo", "global-brand-universe.csv");
const readinessPath = path.join(root, "seo", "cash-route-readiness-by-brand.csv");
const batchPath = path.join(root, "outreach", "affiliate-and-partner-batch-001.csv");
const directTemplatePath = path.join(root, "outreach", "direct-partnership-email-template.md");
const affiliateTemplatePath = path.join(root, "outreach", "affiliate-application-template.md");
const reportPath = path.join(root, "reports", "cash-partnership-layer.json");

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
  return rows;
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

function score(record) {
  const priority = String(record.priority || "").toLowerCase();
  const target = String(record.affiliate_program_target || "").toLowerCase();
  const status = String(record.site_status || "").toLowerCase();
  let value = 0;
  if (priority.includes("p0") || priority === "1") value += 50;
  else if (priority.includes("p1") || priority === "2") value += 35;
  else if (priority.includes("p2") || priority === "3") value += 20;
  else value += 5;
  if (status.includes("active")) value += 20;
  if (target.includes("yes") || target.includes("affiliate network")) value += 20;
  if (target.includes("direct partnership")) value += 15;
  if (target.includes("not ready") || target.includes("not active")) value -= 30;
  return value;
}

const csv = parseCsv(fs.readFileSync(sourcePath, "utf8"));
const header = csv[0];
const records = csv.slice(1).map((row) =>
  Object.fromEntries(header.map((column, index) => [column, row[index] ?? ""]))
);
const byBrand = new Map();

for (const record of records) {
  if (!record.brand) continue;
  const key = slugify(record.brand);
  if (!byBrand.has(key)) {
    byBrand.set(key, {
      brand: record.brand,
      slug: slugify(record.brand),
      countries: new Set(),
      categories: new Set(),
      urls: new Set(),
      targets: new Set(),
      evidence: new Set(),
      bestScore: -999,
      bestRecord: record
    });
  }
  const item = byBrand.get(key);
  item.countries.add(record.country);
  item.categories.add(record.category);
  if (record.official_url) item.urls.add(record.official_url);
  if (record.affiliate_program_target) item.targets.add(record.affiliate_program_target);
  if (record.evidence_status) item.evidence.add(record.evidence_status);
  const currentScore = score(record);
  if (currentScore > item.bestScore) {
    item.bestScore = currentScore;
    item.bestRecord = record;
  }
}

const brands = [...byBrand.values()].sort((a, b) => b.bestScore - a.bestScore || a.brand.localeCompare(b.brand));
const readinessRows = [
  ["brand", "review_url", "tracked_go_url", "countries", "categories", "official_urls", "monetization_path", "priority_score", "status", "next_action"]
];

for (const item of brands) {
  const targetText = [...item.targets].join(" | ");
  let monetizationPath = "direct partnership outreach";
  if (/affiliate network|yes/i.test(targetText)) monetizationPath = "affiliate application";
  if (/not ready|not active|verify/i.test(targetText)) monetizationPath = "verify before monetization";
  readinessRows.push([
    item.brand,
    `/reviews/${item.slug}/`,
    `/go/${item.slug}/`,
    [...item.countries].join(" | "),
    [...item.categories].join(" | "),
    [...item.urls].join(" | "),
    monetizationPath,
    item.bestScore,
    item.bestRecord.site_status,
    item.bestRecord.next_action
  ]);
}

const batchRows = [
  ["rank", "brand", "route", "review", "monetization_path", "countries", "categories", "official_urls", "first_email_angle", "human_gate"]
];

brands.slice(0, 100).forEach((item, index) => {
  const targetText = [...item.targets].join(" | ");
  const monetizationPath = /affiliate network|yes/i.test(targetText) ? "affiliate application" : "direct partnership outreach";
  batchRows.push([
    index + 1,
    item.brand,
    `/go/${item.slug}/`,
    `/reviews/${item.slug}/`,
    monetizationPath,
    [...item.countries].join(" | "),
    [...item.categories].join(" | "),
    [...item.urls].join(" | "),
    `Every Meal Guide is building country/category comparison pages for ${[...item.categories][0] || "meal delivery"} shoppers and can route high-intent buyers to ${item.brand}.`,
    "Requires live domain, analytics, and user approval before sending"
  ]);
});

fs.mkdirSync(path.dirname(readinessPath), { recursive: true });
fs.mkdirSync(path.dirname(batchPath), { recursive: true });
fs.writeFileSync(readinessPath, toCsv(readinessRows));
fs.writeFileSync(batchPath, toCsv(batchRows));

fs.writeFileSync(
  directTemplatePath,
  `# Direct partnership email template

Subject: Every Meal Guide partnership for {{brand}} shoppers

Hi {{first_name}},

I am building Every Meal Guide, a consumer comparison engine for meal kits, prepared meals, diet meal delivery, high-protein meal prep, frozen meals, and family dinner services.

We have created a dedicated review route for {{brand}} plus relevant country/category comparison pages, and we can route shoppers through a tracked link:

- Review: {{review_url}}
- Tracked route: {{tracked_go_url}}

Could you point me to the right person for partnerships or affiliate/referral tracking?

Thanks,
Darren
Every Meal Guide
`
);

fs.writeFileSync(
  affiliateTemplatePath,
  `# Affiliate application template

Site name: Every Meal Guide

Site description:
Every Meal Guide is a consumer meal-delivery comparison site covering meal kits, prepared meals, diet meal delivery, high-protein meal prep, frozen meals, kids meals, and grocery-dinner services by country and category.

Promotion method:
SEO comparison pages, brand reviews, versus pages, tracked /go/ outbound routes, deal pages, and email offer alerts.

Traffic status:
Pre-launch/local build. Domain, deployment, analytics, and Search Console are human gates before applications should be submitted.

Compliance notes:
No fake reviews, no fake pricing, no unapproved affiliate claims. Official links are used until partner tracking is approved.
`
);

fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(
  reportPath,
  `${JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      sourceRows: records.length,
      uniqueBrands: brands.length,
      readinessPath: path.relative(root, readinessPath),
      batchPath: path.relative(root, batchPath),
      templates: [path.relative(root, directTemplatePath), path.relative(root, affiliateTemplatePath)]
    },
    null,
    2
  )}\n`
);

console.log(JSON.stringify({ uniqueBrands: brands.length, readinessPath, batchPath, reportPath }, null, 2));

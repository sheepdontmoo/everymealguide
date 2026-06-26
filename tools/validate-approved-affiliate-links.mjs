import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const approvedLinksPath = path.join(root, "APPROVED_AFFILIATE_LINKS.json");
const brandUniversePath = path.join(root, "seo", "global-brand-universe.csv");

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

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function validDate(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(String(value || "")) && !Number.isNaN(Date.parse(`${value}T00:00:00Z`));
}

function host(value) {
  try {
    return new URL(value).hostname.toLowerCase();
  } catch {
    return "";
  }
}

const errors = [];
const warnings = [];

if (!fs.existsSync(approvedLinksPath)) {
  errors.push(`Missing ${path.relative(root, approvedLinksPath)}`);
}

if (!fs.existsSync(brandUniversePath)) {
  errors.push(`Missing ${path.relative(root, brandUniversePath)}`);
}

const approvedStore = errors.length ? { links: [] } : JSON.parse(fs.readFileSync(approvedLinksPath, "utf8"));
const links = Array.isArray(approvedStore.links) ? approvedStore.links : [];
const brandRows = errors.length ? [] : parseCsv(fs.readFileSync(brandUniversePath, "utf8"));
const knownBrands = new Set(brandRows.map((row) => slugify(row.brand)).filter(Boolean));
const seen = new Set();

links.forEach((link, index) => {
  const label = `links[${index}]`;
  const required = ["brand", "url", "country", "destinationType", "sourceNetwork", "approvalDate"];

  for (const field of required) {
    if (!String(link[field] || "").trim()) errors.push(`${label} missing ${field}`);
  }

  const brandSlug = slugify(link.brand);
  if (brandSlug && !knownBrands.has(brandSlug)) warnings.push(`${label} brand is not in global-brand-universe.csv: ${link.brand}`);

  if (seen.has(brandSlug)) errors.push(`${label} duplicates brand slug ${brandSlug}`);
  if (brandSlug) seen.add(brandSlug);

  if (link.ownerConfirmation !== true) errors.push(`${label} must set ownerConfirmation to true`);
  if (!/^https:\/\//i.test(String(link.url || ""))) errors.push(`${label} URL must start with https://`);
  if (!validDate(link.approvalDate)) errors.push(`${label} approvalDate must be YYYY-MM-DD`);

  const urlHost = host(link.url);
  if (/example|placeholder|localhost|127\.0\.0\.1/i.test(String(link.url || ""))) {
    errors.push(`${label} URL looks like a placeholder`);
  }
  if (urlHost && /everymealguide\.com$/i.test(urlHost)) {
    errors.push(`${label} URL must be the approved merchant or network URL, not an Every Meal Guide page`);
  }
});

if (errors.length) {
  console.error("Approved affiliate link validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  if (warnings.length) {
    console.error("Warnings:");
    for (const warning of warnings) console.error(`- ${warning}`);
  }
  process.exit(1);
}

console.log(
  JSON.stringify(
    {
      approvedLinks: links.length,
      warnings,
      status: "ok"
    },
    null,
    2
  )
);

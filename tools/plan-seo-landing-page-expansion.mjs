import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const universePath = path.join(root, "seo", "global-brand-universe.csv");
const planPath = path.join(root, "seo", "seo-landing-page-expansion-plan.csv");
const reportPath = path.join(root, "reports", "seo-landing-page-expansion-plan.json");

const coreIntents = [
  {
    slug: "best-meal-delivery",
    label: "best meal delivery",
    categoryMatch: /meal kit|prepared|ready|meal prep|diet|protein|frozen|grocery|family|kids|baby/i,
    minBrands: 3,
    pageType: "country hub",
  },
  {
    slug: "best-prepared-meal-delivery",
    label: "best prepared meal delivery",
    categoryMatch: /prepared|ready|meal prep/i,
    minBrands: 3,
    pageType: "category",
  },
  {
    slug: "best-meal-kits",
    label: "best meal kits",
    categoryMatch: /meal kit|recipe kit|organic meal kit|budget meal kit/i,
    minBrands: 3,
    pageType: "category",
  },
  {
    slug: "best-high-protein-meal-prep",
    label: "best high-protein meal prep",
    categoryMatch: /protein|fitness|macro/i,
    minBrands: 2,
    pageType: "category",
  },
  {
    slug: "best-diet-meal-delivery",
    label: "best diet meal delivery",
    categoryMatch: /diet|weight loss|medical|special/i,
    minBrands: 2,
    pageType: "category",
  },
  {
    slug: "best-frozen-meal-delivery",
    label: "best frozen meal delivery",
    categoryMatch: /frozen/i,
    minBrands: 2,
    pageType: "category",
  },
  {
    slug: "best-family-meal-delivery",
    label: "best family meal delivery",
    categoryMatch: /family|kids|baby|toddler/i,
    minBrands: 2,
    pageType: "category",
  },
  {
    slug: "best-grocery-dinner-delivery",
    label: "best grocery dinner delivery",
    categoryMatch: /grocery|produce|pantry|protein box|seafood|meat/i,
    minBrands: 2,
    pageType: "category",
  },
];

const useCaseModifiers = [
  { slug: "for-busy-people", label: "for busy people", match: /prepared|ready|meal prep|frozen/i },
  { slug: "for-families", label: "for families", match: /family|kids|meal kit|prepared/i },
  { slug: "for-weight-loss", label: "for weight loss", match: /diet|weight loss|protein|prepared/i },
  { slug: "for-fitness", label: "for fitness", match: /protein|fitness|macro|meal prep/i },
  { slug: "for-no-cooking", label: "for no cooking", match: /prepared|ready|frozen/i },
  { slug: "for-cheap-dinners", label: "for cheap dinners", match: /budget|meal kit|grocery|pantry/i },
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

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function countrySlug(value) {
  const text = String(value || "").trim();
  const lower = text.toLowerCase();
  if (lower === "united states" || lower === "usa") return "us";
  if (lower === "united kingdom" || lower === "great britain") return "uk";
  if (lower === "united arab emirates") return "uae";
  return slugify(text);
}

function existingPage(url) {
  return fs.existsSync(path.join(root, url.replace(/^\/|\/$/g, ""), "index.html"));
}

function topBrands(records, limit = 6) {
  return records
    .slice()
    .sort((a, b) => {
      const priorityA = Number.parseInt(a.priority || "999", 10);
      const priorityB = Number.parseInt(b.priority || "999", 10);
      return priorityA - priorityB || a.brand.localeCompare(b.brand);
    })
    .slice(0, limit)
    .map((row) => row.brand)
    .join(" | ");
}

if (!fs.existsSync(universePath)) {
  throw new Error(`Missing brand universe: ${universePath}`);
}

const rows = parseCsv(fs.readFileSync(universePath, "utf8")).filter((row) => row.brand && row.country);
const byCountry = new Map();

for (const row of rows) {
  const key = countrySlug(row.country);
  if (!key) continue;
  const current = byCountry.get(key) || {
    country: row.country,
    countrySlug: key,
    records: [],
  };
  current.records.push(row);
  byCountry.set(key, current);
}

const planRows = [
  [
    "priority",
    "page_type",
    "country",
    "intent",
    "url",
    "brand_count",
    "lead_brands",
    "status",
    "why_it_matters",
    "quality_rule",
  ],
];

const candidates = [];

for (const country of byCountry.values()) {
  for (const intent of coreIntents) {
    const matched = country.records.filter((row) => intent.categoryMatch.test(row.category || ""));
    if (matched.length < intent.minBrands) continue;

    const url = `/countries/${country.countrySlug}/${intent.slug}/`;
    candidates.push({
      priority: existingPage(url) ? "existing" : matched.length >= 6 ? "P0" : "P1",
      pageType: intent.pageType,
      country: country.country,
      intent: intent.label,
      url,
      brandCount: matched.length,
      leadBrands: topBrands(matched),
      status: existingPage(url) ? "already_exists" : "planned",
      why: `${country.country} visitors need a fast shortlist for ${intent.label}.`,
      qualityRule: "Needs quick answer, top picks, fit notes, delivery/price caveats, and offer-check links.",
    });

    for (const modifier of useCaseModifiers) {
      const useCaseMatched = matched.filter((row) => modifier.match.test(row.category || `${row.market_role}`));
      if (useCaseMatched.length < Math.max(2, intent.minBrands - 1)) continue;
      const useCaseUrl = `/countries/${country.countrySlug}/${intent.slug}-${modifier.slug}/`;
      candidates.push({
        priority: existingPage(useCaseUrl) ? "existing" : "P2",
        pageType: "use case",
        country: country.country,
        intent: `${intent.label} ${modifier.label}`,
        url: useCaseUrl,
        brandCount: useCaseMatched.length,
        leadBrands: topBrands(useCaseMatched),
        status: existingPage(useCaseUrl) ? "already_exists" : "planned",
        why: `${country.country} visitors may search by situation, not only meal format.`,
        qualityRule: "Needs distinct user problem and should not duplicate the base category page.",
      });
    }
  }
}

candidates
  .sort((a, b) => {
    const order = { P0: 0, P1: 1, P2: 2, existing: 3 };
    return order[a.priority] - order[b.priority] || b.brandCount - a.brandCount || a.url.localeCompare(b.url);
  })
  .forEach((candidate) => {
    planRows.push([
      candidate.priority,
      candidate.pageType,
      candidate.country,
      candidate.intent,
      candidate.url,
      candidate.brandCount,
      candidate.leadBrands,
      candidate.status,
      candidate.why,
      candidate.qualityRule,
    ]);
  });

fs.mkdirSync(path.dirname(planPath), { recursive: true });
fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(planPath, toCsv(planRows));
fs.writeFileSync(
  reportPath,
  `${JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      sourceRows: rows.length,
      candidatePages: candidates.length,
      plannedPages: candidates.filter((candidate) => candidate.status === "planned").length,
      p0Pages: candidates.filter((candidate) => candidate.priority === "P0").length,
      planPath: path.relative(root, planPath),
    },
    null,
    2
  )}\n`
);

console.log(JSON.stringify({ candidatePages: candidates.length, planPath, reportPath }, null, 2));

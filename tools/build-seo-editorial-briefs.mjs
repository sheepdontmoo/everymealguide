import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const backlogPath = path.join(root, "seo", "seo-expansion-backlog-2026-06-24.csv");
const outDir = path.join(root, "content", "seo-editorial-briefs-2026-06-24");
const indexPath = path.join(outDir, "index.csv");
const readmePath = path.join(outDir, "README.md");
const limit = Math.max(1, Number(process.argv[2] || 100));

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

function titleCase(value) {
  return String(value || "")
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function briefTitle(candidate) {
  if (candidate.page_type === "brand_angle_page") return titleCase(candidate.topic);
  return `${titleCase(candidate.topic)} in ${candidate.country}`;
}

function primaryAnswer(candidate) {
  const primary = candidate.primary_brand || "the first verified fit";
  const secondary = candidate.secondary_brand || "the next best alternative";

  if (candidate.page_type === "brand_angle_page") {
    return `Start by checking whether ${primary} matches your country, meal format, normal price after intro offers, and cancellation rules. If one of those fails, compare similar services before clicking through.`;
  }

  return `Start with ${primary} if it serves your address and matches the way you want to eat. Compare ${secondary} if ${primary} is unavailable, too expensive after the intro offer, or a weaker meal-format fit.`;
}

function internalLinks(candidate) {
  const links = [
    "/best/meal-delivery-services/",
    "/best/prepared-meal-delivery/",
    "/best/meal-kits/",
    "/deals/best-meal-delivery-deals/",
  ];

  if (candidate.primary_brand) links.push(`/reviews/${slugify(candidate.primary_brand)}/`, `/go/${slugify(candidate.primary_brand)}/`);
  if (candidate.secondary_brand) links.push(`/reviews/${slugify(candidate.secondary_brand)}/`, `/go/${slugify(candidate.secondary_brand)}/`);
  if (candidate.country) links.push(`/countries/${slugify(candidate.country)}/`);

  return [...new Set(links)];
}

function briefBody(candidate, rank) {
  const title = briefTitle(candidate);
  const answer = primaryAnswer(candidate);
  const links = internalLinks(candidate);

  return `# ${title}

Status: editorial brief only
Publish gate: not approved for public generation yet
Rank: ${rank}
Target URL: ${candidate.url}
Page type: ${candidate.page_type}
Country: ${candidate.country}
Topic: ${candidate.topic}
Readiness: ${candidate.readiness}
Quality gate: ${candidate.quality_gate}

## Mission

Help a visitor answer "What meal delivery service should I use?" within 60 seconds.

This page should not exist just to capture search traffic. It must give a fast, honest buying path.

## 60-second answer draft

${answer}

## Required page structure

1. Hero with one clear answer and two buttons:
   - Check first option
   - Compare alternatives
2. Quick answer section:
   - first option
   - when to choose the second option
   - when to avoid both and go back to the country/category guide
3. Top comparison cards:
   - ${candidate.primary_brand || "Primary brand"}
   - ${candidate.secondary_brand || "Secondary brand"}
   - one backup brand if available during page build
4. Decision table:
   - delivery area
   - meal format
   - normal price after intro offer
   - subscription/cancellation rules
   - best for
5. Trust block:
   - not affiliated unless stated
   - affiliate links may earn commission
   - no hands-on test claim unless we actually tested it
6. Related links:
${links.map((link) => `   - ${link}`).join("\n")}

## Evidence required before publish

- Confirm primary brand official URL.
- Confirm secondary brand official URL where present.
- Confirm both review pages exist.
- Confirm both /go/ pages exist.
- Confirm public copy guard passes.
- Confirm the page answers a real consumer choice, not only a keyword.

## Copy constraints

- Do not use internal words like ledger, route-ready, money route, cash route, partner route, tracked route, evidence status, next action, or affiliate approval pending.
- Do not claim approval, testing, lowest price, official partnership, or availability unless directly proven.
- Keep the first answer short enough to understand in under 60 seconds.

## Conversion intent

Primary conversion is a qualified click to a /go/ offer-check page after the reader has seen the trust checklist.

Secondary conversion is moving the reader to a better-fit comparison, country, or category page.
`;
}

if (!fs.existsSync(backlogPath)) {
  throw new Error(`Missing SEO backlog: ${backlogPath}`);
}

fs.mkdirSync(outDir, { recursive: true });

const candidates = parseCsv(fs.readFileSync(backlogPath, "utf8"))
  .filter((candidate) => candidate.readiness === "ready_to_brief")
  .sort((a, b) => Number(b.brand_count || 0) - Number(a.brand_count || 0) || a.country.localeCompare(b.country) || a.url.localeCompare(b.url))
  .slice(0, limit);

const indexRows = [
  ["rank", "url", "page_type", "country", "topic", "primary_brand", "secondary_brand", "brand_count", "brief_file", "publish_status"],
];

for (const [index, candidate] of candidates.entries()) {
  const rank = index + 1;
  const fileName = `${String(rank).padStart(3, "0")}-${slugify(candidate.topic || candidate.url)}.md`;
  fs.writeFileSync(path.join(outDir, fileName), briefBody(candidate, rank), "utf8");
  indexRows.push([
    rank,
    candidate.url,
    candidate.page_type,
    candidate.country,
    candidate.topic,
    candidate.primary_brand,
    candidate.secondary_brand,
    candidate.brand_count,
    fileName,
    "brief_only_not_published",
  ]);
}

fs.writeFileSync(indexPath, indexRows.map((row) => row.map(csvCell).join(",")).join("\n") + "\n", "utf8");
fs.writeFileSync(
  readmePath,
  `# SEO Editorial Briefs - 2026-06-24

Generated briefs: ${candidates.length}

These briefs are created from ready-to-brief SEO backlog candidates.

## Boundary

Briefs are not published pages.
They should not be counted as live SEO pages.
They are a quality gate before page generation.

## Publish rule

A brief can move to public page generation only after:

- the 60-second answer is useful
- brand/review/go links exist
- source checks are sufficient
- public copy guard passes
- the page would help a real visitor choose
`,
  "utf8"
);

console.log(
  JSON.stringify(
    {
      briefsGenerated: candidates.length,
      outDir,
      indexPath,
      readmePath,
    },
    null,
    2
  )
);


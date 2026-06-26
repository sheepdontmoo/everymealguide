import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const queuePath = path.join(root, "seo", "affiliate-application-master-queue.csv");
const outDir = path.join(root, "outreach", "partner-application-drafts-2026-06-24");
const indexPath = path.join(outDir, "index.csv");
const summaryPath = path.join(outDir, "README.md");
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
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function firstValue(value, fallback) {
  return String(value || "")
    .split(";")
    .map((part) => part.trim())
    .filter(Boolean)[0] || fallback;
}

function normalizeTarget(value) {
  const target = String(value || "").toLowerCase();

  if (target.includes("affiliate")) return "affiliate";
  if (target.includes("direct partnership")) return "direct";
  if (target.includes("retail")) return "retail affiliate";
  if (target.includes("yes")) return "affiliate";
  return "direct";
}

function draftBody(row) {
  const brand = row.brand;
  const route = row.route || `/go/${slugify(brand)}/`;
  const review = `/reviews/${slugify(brand)}/`;
  const country = firstValue(row.countries, "your market");
  const category = firstValue(row.categories, "meal delivery");
  const role = firstValue(row.market_roles, `${category} option for ${country}`);
  const target = normalizeTarget(row.affiliate_target);
  const official = row.official_url || "Official URL to confirm";

  return `# ${brand} Partner Application Draft

Status: draft only
Submission gate: human approval required
Target route: ${target}
Generated: 2026-06-24

## Brand context

- Brand: ${brand}
- Main market: ${country}
- Meal type: ${category}
- Fit note: ${role}
- Review page: ${review}
- Offer-check page: ${route}
- Official URL: ${official}

## Evidence boundary

Do not claim this has been submitted.
Do not claim Every Meal Guide is approved by ${brand}.
Do not replace the offer-check page with an affiliate tracking URL until ${brand} or its affiliate network approves the site and provides an approved URL.

## Affiliate/network application blurb

Every Meal Guide is a meal-delivery comparison site helping consumers choose the right meal kit, prepared meal, high-protein, diet, frozen, family, or grocery-dinner service quickly and confidently.

We have built dedicated coverage for ${brand}, including:

- ${brand} review page: ${review}
- ${brand} offer-check page: ${route}
- Relevant country/category coverage for ${country} and ${category}

Our pages are designed around consumer fit first: delivery area, meal format, normal price after introductory offers, menu suitability, and subscription/cancellation terms. We clearly disclose affiliate relationships and do not claim hands-on testing or affiliation unless stated.

We would like to join the ${brand} partner program and use approved tracking links only after acceptance.

## Direct partnership email draft

Subject: ${brand} coverage on Every Meal Guide

Hi ${brand} team,

I run Every Meal Guide, a consumer meal-delivery comparison site built to help people choose the right service quickly by comparing meal format, country availability, price after intro offers, menu fit, and cancellation terms.

We have prepared ${brand} coverage here:

- Review page: ${review}
- Offer-check page: ${route}

${brand} is currently listed as a ${category} option for ${country}. Before we strengthen the recommendation or add offer details, I wanted to ask if you have an affiliate program, direct partner route, approved creative assets, or preferred offer terms we should use.

We clearly disclose commercial relationships and do not claim affiliation unless it is confirmed.

Would you point me to the right partner contact or program application?

Thanks,
Darren
Every Meal Guide

## Follow-up draft

Subject: Re: ${brand} coverage on Every Meal Guide

Hi ${brand} team,

Quick follow-up on this. We are building out meal-delivery comparison pages by country and meal type, and we want to make sure ${brand} is represented accurately.

If there is a partner program, approved tracking URL, media kit, current offer, or preferred contact, I would be grateful if you could send it over.

Thanks,
Darren
Every Meal Guide

## Human submission checklist

- Confirm official partner/application URL.
- Confirm whether this is affiliate network, direct partnership, or retail affiliate.
- Confirm approved landing page and tracking URL after acceptance.
- Confirm allowed brand assets and logo usage.
- Confirm required disclosure wording.
- Add approved URL only to the approved affiliate-link store after acceptance.
`;
}

if (!fs.existsSync(queuePath)) {
  throw new Error(`Missing queue: ${queuePath}`);
}

fs.mkdirSync(outDir, { recursive: true });

const rows = parseCsv(fs.readFileSync(queuePath, "utf8"))
  .filter((row) => row.brand && row.route)
  .sort((a, b) => Number(a.priority_rank || 999999) - Number(b.priority_rank || 999999))
  .slice(0, limit);

const indexRows = [
  ["rank", "brand", "target_route", "countries", "categories", "draft_file", "submission_status", "human_gate"],
];

for (const row of rows) {
  const rank = String(row.priority_rank || indexRows.length);
  const slug = `${rank.padStart(3, "0")}-${slugify(row.brand)}`;
  const fileName = `${slug}.md`;
  const filePath = path.join(outDir, fileName);
  fs.writeFileSync(filePath, draftBody(row), "utf8");
  indexRows.push([
    rank,
    row.brand,
    normalizeTarget(row.affiliate_target),
    row.countries,
    row.categories,
    fileName,
    "draft_only_not_submitted",
    "requires_human_submission_or_program_login",
  ]);
}

fs.writeFileSync(indexPath, indexRows.map((row) => row.map(csvCell).join(",")).join("\n") + "\n", "utf8");

fs.writeFileSync(
  summaryPath,
  `# Partner Application Draft Pack

Generated: 2026-06-24

This folder contains ${rows.length} local partner application drafts generated from \`seo/affiliate-application-master-queue.csv\`.

## Boundary

These are drafts only.

Nothing has been submitted.
No emails have been sent.
No affiliate applications have been completed.
No brand approval is implied.

## How to use

1. Open \`index.csv\`.
2. Start with the lowest rank.
3. Find the official affiliate or partner application page manually.
4. Paste the relevant draft into the program form or email only after human review.
5. Store approved tracking URLs only after acceptance.

## Why this matters

This prepares the site for the 100+ affiliate/direct partner application milestone without crossing the submission boundary.
`,
  "utf8"
);

console.log(
  JSON.stringify(
    {
      draftsGenerated: rows.length,
      outDir,
      indexPath,
      summaryPath,
    },
    null,
    2
  )
);


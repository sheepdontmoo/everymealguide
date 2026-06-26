import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const brandUniversePath = path.join(root, "seo", "global-brand-universe.csv");
const waveCsvPath = path.join(root, "seo", "verified-expansion-wave-014.csv");
const waveReportPath = path.join(root, "reports", "verified-expansion-wave-014.json");

const checkedDate = "2026-06-24";

const additions = [
  ["US", "Top Chef Meals", "frozen prepared meals", "P2", "active", "chef-made frozen entrees with a la carte ordering, same-day shipping cutoff, and no-subscription prepared meal demand", "https://topchefmeals.com/", "affiliate application", `official_source_checked_${checkedDate}`, "Add to frozen prepared meal, senior, and no-subscription pages"],
  ["US", "Power Plate Meals", "prepared meals", "P2", "active", "healthy prepared meal delivery with weekly menu, breakfast, lunch, dinner, and doorstep delivery", "https://powerplatemeals.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to regional and fitness prepared meal pages"],
  ["US", "My Fit Foods", "prepared meals", "P2", "active", "healthy affordable prepared meals with FitClub meal-prep positioning and delivery/store routes", "https://www.myfitfoods.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to US value prepared-meal and fitness meal-prep pages"],
  ["US", "Project LeanNation", "high protein meal prep", "P2", "active", "personalized meal plans, coaching, and prepared meals for health and body-composition goals", "https://projectleannation.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to US high-protein and coaching-led meal prep pages"],
  ["US", "Home Bistro", "prepared meals", "P3", "active", "prepared gourmet meal delivery brand with chef-made frozen meal demand", "https://www.homebistro.com/", "affiliate application", `official_source_checked_${checkedDate}`, "Add to premium prepared meal and senior frozen meal pages"],
  ["US", "Balance by bistroMD", "diet prepared meals", "P2", "brand_family_or_legacy_route", "a la carte prepared meal route from bistroMD family; important for brand search but should be routed through current bistroMD/Balance availability", "https://www.bistromd.com/", "affiliate application", `brand_family_source_checked_${checkedDate}`, "Account for search demand and avoid duplicate recommendation claims"],
  ["US", "Fresh N Lean", "prepared meals", "P2", "ceased_operations", "formerly major prepared meal delivery brand that ceased operations; important for alternatives pages and competitor search demand", "https://www.freshnlean.com/", "not ready", `ceased_operations_source_checked_${checkedDate}`, "Create alternatives angle, do not recommend as active"],
  ["Canada", "Power Kitchen", "high protein meal prep", "P1", "active", "Canadian macro-balanced prepared meal delivery with athlete partnership and chef-made performance meals", "https://powerkitchen.ca/", "direct partnership", `official_source_checked_${checkedDate}`, "Promote to Canada high-protein and athlete meal pages"],
  ["Canada", "Athlete's Kitchen", "high protein meal prep", "P1", "active", "Toronto/GTA healthy prepared meal delivery for gluten-free, soy-free, keto, paleo, and performance nutrition goals", "https://athleteskitchen.ca/", "direct partnership", `official_source_checked_${checkedDate}`, "Promote to Canada regional high-protein meal prep pages"],
  ["Canada", "MealFix Canada", "prepared meals", "P2", "active", "Canadian ready-to-eat meal delivery candidate for prepared meals and convenience demand", "https://www.mealfixcanada.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Canada prepared meal challenger pages"],
  ["Canada", "Inspired Go", "prepared meals", "P2", "active", "Canadian fresh meal and salad delivery brand with healthy lunch and prepared meal demand", "https://inspiredgo.ca/", "direct partnership", `official_source_checked_${checkedDate}`, "Promote to Canada healthy prepared meal pages"],
  ["Canada", "Spatula Foods", "frozen meals", "P2", "active", "Canadian frozen ready meal brand with heat-and-eat convenience demand", "https://www.spatulafoods.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Promote to Canada frozen prepared meal pages"],
  ["Australia", "Providoor", "prepared meals", "P2", "active", "Australian restaurant-quality prepared meal and finish-at-home delivery brand with premium dinner demand", "https://providoor.com.au/", "affiliate application", `official_source_checked_${checkedDate}`, "Add to AU premium prepared meal and restaurant meal pages"],
  ["Australia", "THR1VE", "prepared meals", "P2", "active", "Australian healthy prepared meal and performance food brand with ready-meal and fitness demand", "https://thrivemeals.com.au/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to AU healthy prepared meal pages"],
  ["Australia", "Delidoor", "frozen prepared meals", "P2", "active", "Australian French-inspired frozen ready meal delivery brand with family dinner and freezer stock-up demand", "https://delidoor.com.au/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to AU frozen prepared meal pages"],
  ["Australia", "ChefPrep", "prepared meals", "P2", "active", "Australian chef-made prepared meal marketplace with fresh ready meals delivered", "https://chefprep.com.au/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to AU chef-prepared meal marketplace pages"],
  ["Australia", "A Life Plus", "diet prepared meals", "P3", "active", "Australian healthy diet meal delivery and prepared meal candidate", "https://www.alifeplus.com.au/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to AU diet prepared meal challenger pages"],
  ["New Zealand", "The Kai Box", "meal kit", "P2", "active", "New Zealand recipe box and meal-kit delivery brand for easy dinner planning", "https://www.kaibox.co.nz/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to New Zealand meal-kit challenger pages"],
  ["New Zealand", "Bellyful", "frozen family meals", "P3", "charity_not_commercial", "New Zealand volunteer freezer-meal charity, important for meal-help search demand but not a commercial buying route", "https://bellyful.org.nz/", "not ready", `official_source_checked_${checkedDate}`, "Account for non-commercial meal support searches, do not monetize"],
  ["New Zealand", "Angel Food", "plant-based pantry meals", "P3", "active", "New Zealand plant-based cheese and pantry meal-helper brand with vegan dinner relevance", "https://www.angelfood.co.nz/", "direct partnership", `official_source_checked_${checkedDate}`, "Categorize as vegan grocery dinner helper"],
  ["Ireland", "NutriQuick", "prepared meals", "P3", "active", "Irish prepared meal delivery and healthy meal prep candidate", "https://nutriquick.ie/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Ireland prepared meal challenger pages"],
  ["Ireland", "Chef in a Box", "prepared meals", "P3", "active", "Irish prepared meal and dinner delivery candidate for easy home meals", "https://chefinabox.ie/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Ireland local prepared meal pages"],
  ["UK", "Muscle Meals 2 Go", "high protein prepared meals", "P2", "active", "UK high-protein prepared meal delivery brand with fitness and macro demand", "https://musclemeals2go.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to UK high-protein challenger pages"],
  ["UK", "Ginger & Lime", "prepared meals", "P3", "active", "UK fresh prepared meal delivery and meal-plan candidate for premium healthy eating", "https://gingerandlime.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to UK premium prepared meal challenger pages"],
  ["UK", "The Pure Package", "diet prepared meals", "P3", "active", "UK healthy meal delivery and diet plan brand with premium nutrition positioning", "https://www.purepackage.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to UK diet prepared meal and premium wellness pages"]
].map(([country, brand, category, priority, site_status, market_role, official_url, affiliate_program_target, evidence_status, next_action]) => ({
  country,
  brand,
  category,
  priority,
  site_status,
  market_role,
  official_url,
  affiliate_program_target,
  evidence_status,
  next_action
}));

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

if (!fs.existsSync(brandUniversePath)) {
  throw new Error(`Missing ${brandUniversePath}`);
}

const rows = parseCsv(fs.readFileSync(brandUniversePath, "utf8"));
const header = rows[0];
const records = rows.slice(1).map((row) => Object.fromEntries(header.map((column, index) => [column, row[index] ?? ""])));
const byKey = new Map(records.map((record, index) => [`${record.country}::${record.brand}`.toLowerCase(), { record, index }]));
const inserted = [];
const updated = [];

for (const addition of additions) {
  const key = `${addition.country}::${addition.brand}`.toLowerCase();
  const existing = byKey.get(key);
  if (existing) {
    records[existing.index] = { ...existing.record, ...addition };
    updated.push(addition);
  } else {
    records.push(addition);
    inserted.push(addition);
    byKey.set(key, { record: addition, index: records.length - 1 });
  }
}

fs.writeFileSync(brandUniversePath, toCsv([header, ...records.map((record) => header.map((column) => record[column] ?? ""))]));
fs.writeFileSync(waveCsvPath, toCsv([header, ...additions.map((record) => header.map((column) => record[column] ?? ""))]));

fs.mkdirSync(path.dirname(waveReportPath), { recursive: true });
fs.writeFileSync(
  waveReportPath,
  `${JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      wave: "014",
      waveRows: additions.length,
      rowsInserted: inserted.length,
      rowsUpdated: updated.length,
      countriesTouched: [...new Set(additions.map((row) => row.country))].sort(),
      sourceOfTruth: path.relative(root, brandUniversePath),
      waveCsv: path.relative(root, waveCsvPath),
      note: "Mixed scale wave adding US, Canada, Australia, New Zealand, Ireland, and UK long-tail prepared, frozen, diet, high-protein, and grocery-helper brands with explicit inactive/non-commercial caveats."
    },
    null,
    2
  )}\n`
);

console.log(`Wave 014 complete: ${inserted.length} inserted, ${updated.length} updated.`);

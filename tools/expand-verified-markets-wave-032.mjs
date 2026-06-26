import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const brandUniversePath = path.join(root, "seo", "global-brand-universe.csv");
const waveCsvPath = path.join(root, "seo", "verified-expansion-wave-032.csv");
const waveReportPath = path.join(root, "reports", "verified-expansion-wave-032.json");

const checkedDate = "2026-06-24";

const additions = [
  ["US", "Fresh N Fit Cuisine", "prepared meals", "P2", "active_region_check", "Atlanta and Southeast healthy chef-prepared meal delivery brand with recurring and a la carte meal plans", "https://www.freshnfitcuisine.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Atlanta and Southeast prepared-meal pages"],
  ["US", "Hummus Fit", "high protein meal prep", "P2", "active", "Long Island meal-prep brand shipping healthy prepared meals to all 50 states, Canada, and Puerto Rico", "https://myhummusfit.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to high-protein and Long Island meal-prep pages"],
  ["US", "Fit & Fresh Meals", "diet prepared meals", "P3", "active_region_check", "Regional weekly meal-prep service for weight loss, maintenance, and healthier eating goals", "https://fitandfreshmeals.net/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to local diet meal-prep alternatives"],
  ["US", "Foodie Fit", "high protein meal prep", "P3", "active_region_check", "Las Vegas healthy meal-prep brand with grab-and-go locations, custom meals, and local ordering", "https://foodiefit.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Las Vegas high-protein meal-prep pages"],
  ["US", "Prep To Your Door", "plant-based prepared meals", "P3", "active_region_check", "Austin and Houston plant-based organic ready-to-eat meal delivery brand with zero-waste packaging", "https://preptoyourdoor.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Texas plant-based prepared-meal pages"],
  ["US", "Healthy Xpress", "diet prepared meals", "P3", "active_region_check", "Miami healthy meal-plan delivery service with keto, paleo, balanced, and athlete meal-plan options", "https://healthyxpress.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Miami diet and athlete meal-plan alternatives"],
  ["US", "Perfectly Plated", "prepared meals", "P3", "active_region_check", "Regional prepared-meal and freezer-meal brand with individual and family-sized heat-and-eat options", "https://perfectlyplated.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to regional family prepared-meal alternatives"],
  ["US", "Mindful Meals TX", "prepared meals", "P3", "active_region_check", "Austin and Hill Country weekly meal-delivery brand with omnivore and plant-based prepared meals", "https://www.mindfulmealstx.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Austin healthy prepared-meal pages"],
  ["US", "Fit Meals 4U", "high protein meal prep", "P3", "active_region_check", "Las Vegas fresh organic cooked-to-order meal delivery brand with custom, vegan, paleo, and keto options", "https://fitmeals4u.net/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Las Vegas high-protein and custom meal-prep alternatives"],
  ["US", "Balanced Bites", "frozen prepared meals", "P3", "active", "US frozen paleo, keto, gluten-free, and real-food meal delivery brand shipping meal boxes nationwide", "https://balancedbites.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Refresh official URL and add to specialty frozen meal pages"],
  ["US", "The Handmade Chef Meal Prep Co", "high protein meal prep", "P3", "active_region_check", "San Diego clean meal-prep company with chef-made online ordering and walk-in pickup", "https://www.thcmealprepco.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to San Diego clean meal-prep alternatives"],
  ["US", "Good Measure Meals", "medically tailored meals", "P3", "active_program_route", "Atlanta medically tailored meal delivery brand with registered-dietitian-designed heart-healthy and diabetic-friendly meals", "https://www.goodmeasuremeals.com/", "direct partnership after eligibility route check", `official_source_checked_${checkedDate}`, "Add to medically tailored meal pages with eligibility caveat"],
  ["US", "Long Island Fit Meals", "high protein meal prep", "P3", "active_region_check", "Long Island fitness meal-prep brand offering healthy boxed meals for fat-loss and low-calorie goals", "https://www.longislandfitmeals.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Long Island high-protein meal-prep alternatives"],
  ["US", "Healthy Meals Direct", "prepared meals", "P2", "active", "Long Island prepared-meal brand with many retail locations, local delivery, and nationwide shipping messaging", "https://healthymealsdirect.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Long Island and nationwide prepared-meal alternatives"],
  ["US", "Redefine Meals", "prepared meals", "P2", "active_region_check", "Long Island, NYC, and Westchester meal-prep brand with 60-plus chef-prepared meals and delivery/pickup routes", "https://www.redefinemeals.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to New York regional prepared-meal pages"],
  ["US", "FNF Meals", "prepared meals", "P3", "active_region_check", "Long Island meal-prep company delivering fresh organic and non-GMO prepared meals across Nassau and Suffolk County", "https://fnfmeals.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Long Island prepared-meal alternatives"],
  ["US", "Fit Fresh 417", "high protein meal prep", "P3", "active_region_check", "Springfield Missouri chef-prepared high-protein macro-balanced meal-prep delivery brand", "https://www.fitfresh417.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Missouri high-protein meal-prep pages"],
  ["US", "Fresh Fit Meals", "diet prepared meals", "P3", "active_region_check", "Des Moines dietitian-designed meal-prep restaurant with online pre-ordering and local delivery signals", "https://freshfitmeals.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Iowa diet meal-prep alternatives"],
  ["US", "Fresh Fit Foods Naples", "prepared meals", "P3", "active_region_check", "Southwest Florida prepared-meal delivery service with healthy, senior, plant-based, and paleo meal-plan options", "https://freshfitnaples.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Naples and Fort Myers prepared-meal pages"],
  ["US", "Miltown Eats", "meal kit", "P3", "active_region_check", "Milwaukee local meal-kit delivery brand with locally sourced and allergy-aware meal kits", "https://www.miltowneats.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Midwest local meal-kit pages"],
  ["US", "Homestyle Direct", "medically tailored meals", "P3", "active_program_route", "US pre-cooked medically tailored meal delivery provider with Medicaid and private-pay routes", "https://www.homestyledirect.com/", "direct partnership after eligibility route check", `official_source_checked_${checkedDate}`, "Add to medically tailored meals with eligibility caveat"],
  ["UK", "FuelHub", "high protein prepared meals", "P2", "active", "UK chef-prepared high-protein and macro-balanced meal-prep delivery brand", "https://fuelhub.co.uk/", "affiliate application", `official_source_checked_${checkedDate}`, "Add to UK high-protein meal-prep pages"],
  ["UK", "STOCKED", "frozen prepared meals", "P2", "active", "UK frozen meal-block brand delivering award-winning meat, plant-based, and family-favourite meals", "https://stockedfood.com/", "affiliate application", `official_source_checked_${checkedDate}`, "Add to UK frozen ready-meal pages"],
  ["UK", "Kurami", "premium prepared meals", "P2", "active_region_check", "London gut-health meal delivery brand with fresh meal paths and frozen heat-and-eat UK delivery", "https://kurami.co.uk/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to UK premium wellness meal-delivery pages"],
  ["UK", "Athlete Kitchen UK", "high protein prepared meals", "P3", "active_region_check", "South Wales performance-led high-protein meal delivery brand with fresh daily and frozen meal options", "https://athletekitchen.co.uk/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Wales and UK performance meal-prep alternatives"],
  ["Norway", "Kokkeloren", "premium meal kit", "P2", "active_region_check", "Norway premium meal-kit provider delivering three chef-led dinners with portioned ingredients and local produce", "https://kokkeloren.no/en", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Norway premium meal-kit alternatives"]
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
      wave: "032",
      waveRows: additions.length,
      rowsInserted: inserted.length,
      rowsUpdated: updated.length,
      countriesTouched: [...new Set(additions.map((row) => row.country))].sort(),
      sourceOfTruth: path.relative(root, brandUniversePath),
      waveCsv: path.relative(root, waveCsvPath),
      note: "Adds source-backed US, UK, and Norway prepared-meal, high-protein meal-prep, frozen prepared-meal, medically tailored, meal-kit, and regional/local delivery brands."
    },
    null,
    2
  )}\n`
);

console.log(`Wave 032 complete: ${inserted.length} inserted, ${updated.length} updated.`);

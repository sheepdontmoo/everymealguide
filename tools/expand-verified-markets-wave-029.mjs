import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const brandUniversePath = path.join(root, "seo", "global-brand-universe.csv");
const waveCsvPath = path.join(root, "seo", "verified-expansion-wave-029.csv");
const waveReportPath = path.join(root, "reports", "verified-expansion-wave-029.json");

const checkedDate = "2026-06-24";

const additions = [
  ["Thailand", "NutriChef Bangkok", "diet prepared meals", "P1", "active_region_check", "Bangkok healthy meal-prep delivery brand with weight-loss, keto, vegan, and fitness meal-plan positioning", "https://thenutrichef.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add as Bangkok healthy diet meal-prep anchor"],
  ["Thailand", "Fit2go Thailand", "high protein meal prep", "P1", "active_region_check", "Thailand ready-to-eat high-protein and low-calorie meal-plan service with Bangkok route evidence", "https://fit2gothailand.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add as Thailand high-protein meal-prep anchor"],
  ["Thailand", "Plantiful Bangkok", "plant-based prepared meals", "P2", "active_region_check", "Bangkok plant-based meal-plan brand selling multi-day chef-crafted meal and snack packages", "https://www.plantifulbkk.com/plans", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Thailand plant-based meal-plan pages"],
  ["Thailand", "Healthy Tasty Thailand", "diet prepared meals", "P2", "active_region_check", "Thailand healthy meal-plan brand with calorie-controlled, pregnancy, and lifestyle plans delivered fresh daily", "https://www.healthytastyclubbyht.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Thailand diet prepared-meal alternatives"],
  ["Malaysia", "Meals in Minutes Malaysia", "frozen prepared meals", "P1", "active", "Malaysia portioned and prepped vacuum-packed meal portions delivered for fast cook-at-home convenience", "https://mealsinminutes.co/", "direct partnership", `official_source_checked_${checkedDate}`, "Add as Malaysia frozen/prepped meal anchor"],
  ["Malaysia", "La Juiceria Grocer", "high protein prepared meals", "P2", "active_delivery_partner_route", "Malaysia healthy food and prepared-meal range with Lean Fuel and Muscle Gain bundles plus delivery routes", "https://lajuiceria.com.my/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Malaysia high-protein prepared meal alternatives"],
  ["Malaysia", "GoClean Malaysia", "diet prepared meals", "P2", "active_region_check", "Kuala Lumpur and Petaling Jaya healthy food delivery and catering route with daily changing menu", "https://goclean.oddle.me/en_MY", "direct partnership", `official_source_checked_${checkedDate}`, "Add to KL/PJ healthy meal delivery alternatives"],
  ["Malaysia", "Agrain Malaysia", "prepared meals", "P3", "active_delivery_partner_route", "Kuala Lumpur healthy halal protein bowl brand with delivery partner route and low-kcal high-protein positioning", "https://agrain.my/", "direct partnership after meal-plan fit check", `official_source_checked_${checkedDate}`, "Add to Malaysia healthy prepared-meal watchlist with delivery-route caveat"],
  ["Philippines", "The Six Pack Chef", "diet prepared meals", "P1", "active_region_check", "Philippines healthy meal-plan delivery brand with nutritious high-quality meals delivered to customers", "https://www.thesixpackchef.ph/", "direct partnership", `official_source_checked_${checkedDate}`, "Add as Philippines healthy meal-plan anchor"],
  ["Philippines", "Pickle.ph", "diet prepared meals", "P1", "active_region_check", "Metro Manila healthy food delivery service offering calorie-controlled and macro-balanced meals", "https://pickle.ph/", "direct partnership", `official_source_checked_${checkedDate}`, "Add as Philippines calorie-controlled meal-plan anchor"],
  ["Philippines", "FitFood Manila", "diet prepared meals", "P1", "active_region_check", "Manila meal-plan brand with Original, Plus, Veg, Keto, and heart-focused subscription options", "https://fitfoodmanila.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Philippines diet and keto meal-plan pages"],
  ["Vietnam", "Fuel Meals Vietnam", "high protein meal prep", "P1", "active_region_check", "Da Nang macro meal delivery brand with fresh chef-crafted healthy meal prep and custom plans", "https://fuelmealsvn.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add as Vietnam/Da Nang macro meal-prep anchor"],
  ["Japan", "Mitsuboshi Farm", "frozen prepared meals", "P1", "active", "Japan frozen prepared side-dish delivery service with nutrition-supervised low-carb meal positioning", "https://mitsuboshifarm.jp/", "affiliate application", `official_source_checked_${checkedDate}`, "Add as Japan frozen prepared-meal anchor"],
  ["Japan", "GREEN SPOON Japan", "frozen prepared meals", "P1", "active", "Japan vegetable one-step meal brand delivering soups, salads, smoothies, and dishes to customers", "https://greenspoon.co.jp/", "affiliate application", `official_source_checked_${checkedDate}`, "Add as Japan vegetable frozen meal anchor"],
  ["Japan", "FIT FOOD HOME", "frozen prepared meals", "P1", "active", "Japan chef-made frozen prepared-meal delivery service focused on nutrition, taste, and additive-conscious food", "https://store.tavenal.com/", "affiliate application", `official_source_checked_${checkedDate}`, "Add to Japan frozen prepared meal pages"],
  ["Japan", "Nokasoul", "premium prepared meals", "P2", "active_region_check", "Tokyo farm-to-bento delivery brand preparing seasonal locally sourced bento for delivery", "https://www.nokasoul.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Tokyo premium prepared-meal alternatives"],
  ["US", "FITfoodNJ", "prepared meals", "P3", "active_region_check", "New Jersey prepared-meal and bulk meal-prep brand delivering ready heat-and-eat meals statewide", "https://fitfoodnj.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to US regional prepared-meal alternatives"],
  ["US", "Instant Muscle Meals", "high protein meal prep", "P3", "active_region_check", "NY/NJ/CT high-protein chef-prepped meal-prep brand serving athletes and busy customers", "https://instantmusclemeals.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to US Northeast high-protein meal-prep alternatives"],
  ["US", "Muscle Fuel Meals", "high protein meal prep", "P3", "active_region_check", "Florida local meal-prep delivery brand serving Pinellas, Pasco, Hillsborough, and Hernando counties", "https://musclefuelmeals.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Florida regional high-protein meal-prep pages"],
  ["US", "Fit Food Cuisine", "prepared meals", "P3", "active_region_check", "San Jose meal-prep service with fresh curated meals, delivery, pickup, and meal-pack options", "https://fitfoodcuisine.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to California regional prepared-meal alternatives"],
  ["US", "Healthy Meals Kitchen", "diet prepared meals", "P3", "active_region_check", "Orange County dietitian-approved chef-inspired meal-prep service with delivery and pickup", "https://www.healthymealskitchen.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to California diet prepared-meal alternatives"],
  ["US", "Johns Fit Meals", "high protein meal prep", "P3", "active_region_check", "Maryland meal-prep service with pre-portioned, customized, and bulk protein/carb/vegetable options", "https://www.johnsfitmeals.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Mid-Atlantic high-protein meal-prep alternatives"],
  ["US", "Nutri Muscle Meals", "high protein meal prep", "P3", "active_region_check", "Virginia and Washington DC local meal-prep delivery service with weekly prepared meal packages", "https://www.nutrimusclemeals.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Virginia/DC high-protein meal-prep pages"],
  ["US", "Fit Food Prep", "high protein meal prep", "P3", "active_region_check", "US regional healthy weekly meal delivery brand with weight-loss, maintenance, and bulking meal options", "https://fitfoodprep.org/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to US regional high-protein meal-prep alternatives"],
  ["US", "Pure Meal Prep SD", "prepared meals", "P3", "active_region_check", "San Diego organic meal-prep delivery brand with rotating chef-crafted prepared meals", "https://puremealprepsd.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to San Diego prepared-meal alternatives"],
  ["US", "Westerly", "premium prepared meals", "P3", "active_region_check", "Seattle and San Francisco prepared-meal delivery brand with gluten-free and dairy-free weekly menus", "https://www.westerlykitchen.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to gluten-free and premium regional prepared-meal alternatives"],
  ["US", "Eat Clean PHX", "prepared meals", "P3", "active_region_check", "Phoenix-area fresh chef-prepared and nutritionist-approved meal delivery brand serving the Valley", "https://eatcleanphx.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Phoenix prepared-meal alternatives"],
  ["US", "FitFood Meal Prep DMV", "prepared meals", "P3", "active_region_check", "DMV chef-prepared weekly meal-prep service delivering healthy meals to customers", "https://www.fitfoodmealprepservice.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to DC/Maryland/Virginia prepared-meal alternatives"]
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
      wave: "029",
      waveRows: additions.length,
      rowsInserted: inserted.length,
      rowsUpdated: updated.length,
      countriesTouched: [...new Set(additions.map((row) => row.country))].sort(),
      sourceOfTruth: path.relative(root, brandUniversePath),
      waveCsv: path.relative(root, waveCsvPath),
      note: "Adds source-backed Thailand, Malaysia, Philippines, Vietnam, Japan, and US regional prepared-meal, high-protein meal-prep, frozen prepared-meal, plant-based, and diet meal brands."
    },
    null,
    2
  )}\n`
);

console.log(`Wave 029 complete: ${inserted.length} inserted, ${updated.length} updated.`);

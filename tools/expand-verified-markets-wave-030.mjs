import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const brandUniversePath = path.join(root, "seo", "global-brand-universe.csv");
const waveCsvPath = path.join(root, "seo", "verified-expansion-wave-030.csv");
const waveReportPath = path.join(root, "reports", "verified-expansion-wave-030.json");

const checkedDate = "2026-06-24";

const additions = [
  ["New Zealand", "FED New Zealand", "frozen prepared meals", "P2", "active", "New Zealand chef-made frozen ready-meal service with one-off and subscription delivery", "https://www.getfed.co.nz/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to New Zealand frozen ready-meal and family dinner pages"],
  ["New Zealand", "Green Dinner Table", "plant-based meal kit", "P2", "active", "New Zealand vegan meal-box company delivering fresh chef-designed plant-based dinners", "https://www.greendinnertable.co.nz/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to New Zealand vegan meal-kit pages"],
  ["South Africa", "FitFoodz South Africa", "diet prepared meals", "P2", "active", "South Africa chef-prepared macro-matched ready-made meal delivery brand serving major city centers", "https://fitfoodz.co.za/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to South Africa weight-loss and macro prepared-meal pages"],
  ["South Africa", "KookBox", "meal kit", "P3", "active_region_check", "Cape Town-area meal-kit brand delivering fresh flexible dinner kits with local ingredients and step-by-step cards", "https://kookbox.co.za/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to South Africa regional meal-kit alternatives"],
  ["UAE", "Basiligo", "diet prepared meals", "P1", "active", "UAE clean-eating meal-plan brand delivering personalized daily meal plans across Dubai and Abu Dhabi", "https://basiligo.ae/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to UAE clean-eating and diet meal-plan pages"],
  ["UAE", "TheMeal UAE", "prepared meals", "P3", "active", "UAE monthly meal-plan service delivering fresh meal boxes twice weekly with trial plan option", "https://www.themeal.menu/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to UAE budget and monthly meal-plan alternatives"],
  ["UAE", "Eat Clean ME", "diet prepared meals", "P2", "active", "UAE healthy meal-plan brand offering low-calorie, high-protein, vegan, vegetarian, and gluten-free plans", "https://eatcleanme.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to UAE diet-specific meal-plan pages"],
  ["Singapore", "Green Kitchen SG", "prepared meals", "P3", "active", "Singapore chef-crafted weekly meal-plan service using fresh local produce and ready-in-minutes meals", "https://www.greenkitchen.co/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Singapore prepared meal-plan alternatives"],
  ["Singapore", "The Daily Cut", "prepared meals", "P3", "active_delivery_partner_route", "Singapore healthy bowl brand with online ordering and delivery-partner routes for office and home meals", "https://www.thedailycut.sg/", "direct partnership after meal-plan fit check", `official_source_checked_${checkedDate}`, "Add to Singapore healthy prepared-meal alternatives with delivery-route caveat"],
  ["Hong Kong", "Fete Up", "prepared meals", "P3", "active_delivery_partner_route", "Hong Kong healthy meal and bento brand with balanced macro-forward bowls and delivery/catering routes", "https://feteup.com/", "direct partnership after meal-plan fit check", `official_source_checked_${checkedDate}`, "Add to Hong Kong healthy prepared-meal alternatives"],
  ["Hong Kong", "Mealthy HK", "high protein meal prep", "P2", "active", "Hong Kong chef-prepared high-protein meal delivery brand for convenient healthy eating", "https://mealthy.com.hk/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Hong Kong high-protein meal-plan pages"],
  ["Hong Kong", "Bain Marie", "prepared meals", "P3", "active_region_check", "Hong Kong catering and healthy meal-plan brand delivering homemade meals in sustainable packaging", "https://www.facebook.com/bainmariehk/", "direct partnership after direct-order route check", `official_and_social_source_checked_${checkedDate}`, "Add to Hong Kong meal-plan alternatives with source caveat"],
  ["France", "Kitchen Daily", "prepared meals", "P2", "active", "France prepared-meal subscription brand offering chef-designed meals delivered in 48 to 72 hours", "https://www.kitchen-daily.fr/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to France fresh prepared-meal pages"],
  ["France", "My Cuistot Paris", "prepared meals", "P3", "active_region_check", "Paris healthy prepared-meal delivery service with customizable weekly meal plans", "https://paris.mycuistot.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Paris prepared-meal alternatives"],
  ["Spain", "Knoweats", "prepared meals", "P2", "active", "Spain prepared-meal delivery brand with refrigerated weekly dishes and flexible one-off or subscription ordering", "https://knoweats.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Spain prepared-meal comparison pages"],
  ["Australia", "Fit Chef Australia", "high protein meal prep", "P3", "active_region_check", "Adelaide macro-balanced chef-prepared meal-prep delivery service with fresh heat-and-eat meals", "https://fitchefaus.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to South Australia high-protein meal-prep alternatives"],
  ["Australia", "Macrofoodz", "prepared meals", "P2", "active", "Australia healthy fresh ready-made meal delivery brand with low-carb, weight-loss, and muscle-toning plans", "https://macrofoodz.com.au/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Australia macro and ready-made meal pages"],
  ["US", "Mother of Macros", "high protein meal prep", "P3", "active", "US chef-prepared macro meal delivery brand with fresh weekly rotating menus and gluten-free/dairy-free options", "https://motherofmacros.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to US macro meal-prep alternatives"],
  ["US", "Nourish to Heal", "diet prepared meals", "P3", "active_region_check", "New Jersey and Pennsylvania chef-crafted dietitian-approved fresh meal delivery brand", "https://nourishtoheal.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to US regional dietitian-approved prepared-meal pages"],
  ["US", "Fit Five Meals", "prepared meals", "P3", "active_region_check", "US regional meal-prep company offering pickup, shipping, and home delivery with weekly menu drops", "https://fitfivemeals.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to US regional prepared-meal alternatives"],
  ["US", "Fit Fresh Fast", "prepared meals", "P3", "active_region_check", "US local meal-prep delivery brand with rotating healthy affordable meals and pickup options", "https://www.fitfreshfast.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to US local prepared-meal alternatives"],
  ["US", "Fit Prep", "prepared meals", "P3", "active_region_check", "US fresh balanced meal-prep service using colorful vegetables, proteins, and complex carbs", "https://eatfitprep.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to US regional fit meal-prep alternatives"],
  ["US", "Muscle Cell", "high protein meal prep", "P3", "active_region_check", "US fresh home-cooked high-protein meal delivery brand with 20g+ protein meals", "https://musclecellhealth.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to US high-protein meal-prep alternatives"],
  ["US", "Meal Me by Sof", "diet prepared meals", "P3", "active_region_check", "Chicagoland meal-prep and meal delivery brand focused on weight loss and balanced healthy meals", "https://mealmebysof.store/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Chicago regional prepared-meal alternatives"]
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
      wave: "030",
      waveRows: additions.length,
      rowsInserted: inserted.length,
      rowsUpdated: updated.length,
      countriesTouched: [...new Set(additions.map((row) => row.country))].sort(),
      sourceOfTruth: path.relative(root, brandUniversePath),
      waveCsv: path.relative(root, waveCsvPath),
      note: "Adds source-backed New Zealand, South Africa, UAE, Singapore, Hong Kong, France, Spain, Australia, and US prepared-meal, frozen ready-meal, high-protein meal-prep, diet, meal-kit, and delivery-route brands."
    },
    null,
    2
  )}\n`
);

console.log(`Wave 030 complete: ${inserted.length} inserted, ${updated.length} updated.`);

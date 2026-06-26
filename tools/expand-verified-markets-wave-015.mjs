import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const brandUniversePath = path.join(root, "seo", "global-brand-universe.csv");
const waveCsvPath = path.join(root, "seo", "verified-expansion-wave-015.csv");
const waveReportPath = path.join(root, "reports", "verified-expansion-wave-015.json");

const checkedDate = "2026-06-24";

const additions = [
  ["Japan", "Oisix", "meal kit and grocery dinner delivery", "P1", "active", "Japanese grocery and meal-kit service with regular daily-meal delivery and Kit Oisix style dinner kits", "https://en.oisixradaichi.co.jp/services/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Japan meal-kit and grocery-dinner pages"],
  ["Japan", "Yoshikei", "meal kit", "P1", "active", "Japanese home meal-kit and dinner ingredient delivery brand with broad household dinner demand", "https://yoshikei-dvlp.co.jp/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Japan meal-kit anchor pages"],
  ["Japan", "nosh Japan", "frozen prepared meals", "P1", "active", "Japanese frozen prepared meal delivery brand with healthy, low-carb, ready-meal positioning", "https://nosh.jp/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Japan frozen prepared meal pages"],
  ["Japan", "Muscle Deli", "high protein prepared meals", "P1", "active", "Japanese high-protein diet and fitness meal delivery brand", "https://muscledeli.jp/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Japan high-protein and diet meal pages"],
  ["Japan", "Easy Meals Japan", "prepared meals", "P2", "active", "Japan-wide Western-style fresh prepared meal delivery with high-protein, vegan, halal, family, and low-calorie options", "https://www.easymealsjapan.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Japan English-friendly prepared meal pages"],
  ["Japan", "Nu-Table", "prepared meals", "P3", "active", "Japanese homemade meal delivery service with rotating menus and recurring plan model", "https://www.nu-table.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Japan local prepared meal challenger pages"],
  ["South Korea", "Fresheasy", "meal kit", "P1", "active", "South Korean leading meal-kit brand referenced in K-food trade sources as a major industry player", "https://www.fresheasy.co.kr/", "direct partnership", `official_and_trade_source_checked_${checkedDate}`, "Add to Korea meal-kit anchor pages"],
  ["South Korea", "MyChef", "meal kit", "P1", "active", "South Korean meal-kit company referenced as one of the country's first and major meal-kit operators", "https://www.mychef.kr/", "direct partnership", `official_and_trade_source_checked_${checkedDate}`, "Add to Korea meal-kit comparisons"],
  ["South Korea", "Cookat", "prepared meals", "P2", "active", "Korean ready-food and meal brand with prepared meal and convenience-food relevance", "https://www.cookatmarket.com/", "direct partnership", `official_and_trade_source_checked_${checkedDate}`, "Add to Korea prepared meal pages"],
  ["South Korea", "Wingeat", "prepared meals", "P2", "active", "South Korean prepared meal and food-commerce brand referenced in Korean meal-kit market sources", "https://www.wingeat.com/", "direct partnership", `official_and_trade_source_checked_${checkedDate}`, "Add to Korea prepared meal challenger pages"],
  ["Mexico", "Manzana Verde", "diet prepared meals", "P1", "active_app_route", "healthy meal subscription app with home/office delivery in Mexico plus Peru and Colombia signals", "https://play.google.com/store/apps/details?id=la.manzana_verde_app", "direct partnership after checkout check", `app_store_source_checked_${checkedDate}`, "Add to Mexico healthy diet prepared meal pages with app-route caveat"],
  ["Mexico", "Nurish", "prepared meals", "P1", "active", "Mexico City healthy meal prep service delivering chef-prepared meals weekly", "https://nurish.mx/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Mexico City prepared meal pages"],
  ["Mexico", "Fit Food Mexico", "healthy meal delivery", "P2", "active", "Mexican healthy meal delivery and prepared food candidate", "https://fitfood.mx/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Mexico healthy prepared meal challenger pages"],
  ["Mexico", "Eat Fit Mexico", "prepared meals", "P2", "active", "Mexican prepared meal and healthy eating brand candidate for local meal-prep demand", "https://eatfit.com.mx/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Mexico prepared meal challenger pages"],
  ["Brazil", "Liv Up", "frozen prepared meals", "P1", "active_app_route", "Brazilian direct-to-consumer healthy frozen meal brand with app-led ordering and strong national awareness", "https://play.google.com/store/apps/details?id=br.com.livup.ecommerce", "direct partnership after active route check", `app_store_and_third_party_source_checked_${checkedDate}`, "Add to Brazil frozen healthy meal pages with app-route caveat"],
  ["Brazil", "Beleaf", "plant-based prepared meals", "P1", "active", "Brazilian plant-based frozen prepared meal and vegan dinner brand", "https://www.beleaf.com.br/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Brazil vegan prepared meal pages"],
  ["Brazil", "Pronto Light", "diet prepared meals", "P2", "active", "Brazilian diet and healthy frozen meal delivery brand", "https://www.prontolight.com.br/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Brazil diet prepared meal pages"],
  ["Brazil", "Keep Light", "diet prepared meals", "P2", "active", "Brazilian healthy and diet prepared meal delivery brand", "https://keeplight.com.br/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Brazil healthy prepared meal challenger pages"],
  ["Brazil", "Chef Bob", "prepared meals", "P2", "active", "Brazilian chef-prepared frozen meal and easy dinner delivery brand", "https://chefbob.com.br/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Brazil frozen prepared meal pages"],
  ["US", "EatFlavorly", "frozen prepared meals", "P2", "active", "frozen meal delivery brand with scratch-made meals, no subscription, and ready-in-minutes positioning", "https://www.eatflavorly.com/", "affiliate application", `official_source_checked_${checkedDate}`, "Add to US frozen no-subscription prepared meal pages"],
  ["US", "RealEats", "prepared meals", "P3", "closed_or_inactive", "formerly notable prepared meal delivery brand; account for alternatives/search demand, but do not recommend as active", "https://www.realeats.com/", "not ready", `active_status_needs_check_${checkedDate}`, "Create alternatives angle only until active operations are proven"],
  ["US", "Eat Fit Go", "prepared meals", "P3", "active_region_check", "prepared meal and grab-and-go healthy meal brand with regional availability to verify", "https://eatfitgo.com/", "direct partnership after region check", `official_source_checked_${checkedDate}`, "Add to regional prepared meal pages with delivery caveat"],
  ["US", "Catered Fit", "prepared meals", "P2", "active", "healthy meal plan delivery service with prepared meals and South Florida/selected delivery areas", "https://www.cateredfit.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to regional prepared meal and diet meal pages"],
  ["US", "Fitness Kitchen LA", "prepared meals", "P3", "active_region_check", "Los Angeles prepared meal delivery and meal prep candidate", "https://fitnesskitchenla.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to LA prepared meal regional pages"],
  ["US", "Model Meals", "prepared meals", "P3", "active_region_check", "prepared meal delivery brand with Whole30/clean eating heritage and regional service caveats", "https://modelmeals.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to clean eating prepared meal pages with active-region check"],
  ["US", "Fresh Meal Plan", "prepared meals", "P2", "active", "fresh prepared meal delivery brand with diet and convenience meal-plan positioning", "https://www.freshmealplan.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to US prepared meal challenger pages"],
  ["US", "Meal Prep Sunday San Diego", "prepared meals", "P3", "active_region_check", "regional prepared meal delivery brand for San Diego meal prep demand", "https://mealprepsundaysandiego.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to regional US meal-prep coverage"],
  ["Canada", "MealPro Canada", "prepared meals", "P3", "active", "Canadian prepared meal and meal-prep delivery candidate", "https://mealpro.ca/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Canada prepared meal challenger pages"],
  ["Canada", "Essential Meal Delivery", "prepared meals", "P3", "active", "Canadian prepared meal delivery candidate for healthy and convenient eating", "https://essentialmealdelivery.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Canada regional prepared meal pages"],
  ["Australia", "Meals in Minutes", "prepared meals", "P3", "active", "Australian ready-made meal delivery candidate for quick prepared dinner demand", "https://mealsinminutes.com.au/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to AU quick prepared meal challenger pages"]
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
      wave: "015",
      waveRows: additions.length,
      rowsInserted: inserted.length,
      rowsUpdated: updated.length,
      countriesTouched: [...new Set(additions.map((row) => row.country))].sort(),
      sourceOfTruth: path.relative(root, brandUniversePath),
      waveCsv: path.relative(root, waveCsvPath),
      note: "Adds Japan, South Korea, Mexico, Brazil, US, Canada, and Australia brand scale with app-route, regional, closed, and active-status caveats where needed."
    },
    null,
    2
  )}\n`
);

console.log(`Wave 015 complete: ${inserted.length} inserted, ${updated.length} updated.`);

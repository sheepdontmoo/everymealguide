import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const brandUniversePath = path.join(root, "seo", "global-brand-universe.csv");
const waveCsvPath = path.join(root, "seo", "verified-expansion-wave-017.csv");
const waveReportPath = path.join(root, "reports", "verified-expansion-wave-017.json");

const checkedDate = "2026-06-24";

const additions = [
  ["Poland", "Maczfit", "diet prepared meals", "P1", "active_app_route", "Polish boxed diet and meal catering leader with app ordering and broad diet-plan demand", "https://play.google.com/store/apps/details?id=com.maczfit.app2", "direct partnership after web route check", `app_and_partner_source_checked_${checkedDate}`, "Add to Poland diet catering and boxed meal pages"],
  ["Poland", "Nice To Fit You", "diet prepared meals", "P1", "active_app_route", "Polish flexible diet catering service with healthy meal delivery app and customizable plans", "https://apps.apple.com/pl/app/ntfy-healthy-meal-delivery/id1246308752", "direct partnership after web route check", `app_store_source_checked_${checkedDate}`, "Add to Poland premium diet catering pages"],
  ["Poland", "Body Chief", "diet prepared meals", "P1", "active", "Polish boxed diet catering brand with prepared meal-plan delivery demand", "https://bodychief.pl/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Poland diet prepared meal pages"],
  ["Poland", "Kuchnia Vikinga", "diet prepared meals", "P1", "active", "Polish boxed diet catering brand and high-growth prepared meal delivery player", "https://kuchniavikinga.pl/", "direct partnership", `official_and_news_source_checked_${checkedDate}`, "Add to Poland boxed diet comparison pages"],
  ["Poland", "Wygodna Dieta", "diet prepared meals", "P2", "active", "Polish diet catering brand with prepared daily meal-plan delivery", "https://www.wygodnadieta.pl/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Poland diet meal challenger pages"],
  ["Poland", "Fit Apetit", "diet prepared meals", "P2", "active", "Polish diet catering and prepared meal delivery brand", "https://www.fitapetit.com.pl/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Poland diet catering challenger pages"],
  ["Czech Republic", "Zdravé stravování", "diet prepared meals", "P1", "active", "Czech boxed diet and prepared meal-plan delivery service with protein, weight-loss, and daily menu programs", "https://www.en.zdravestravovani.cz/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Czech diet prepared meal pages"],
  ["Czech Republic", "Nutric Bistro", "diet prepared meals", "P2", "active", "Czech premium low-carb, paleo, and fit boxed diet delivery brand", "https://www.nutricbistro.cz/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Czech low-carb and diet prepared meal pages"],
  ["Czech Republic", "NutritionPro", "diet prepared meals", "P2", "active", "Czech healthy meal box delivery in Prague and Brno with flexible meal plans and subscriptions", "https://nutritionpro.cz/en/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Czech healthy boxed meal pages"],
  ["Czech Republic", "Krabičková dieta Zdravě", "diet prepared meals", "P3", "active_region_check", "Czech boxed diet candidate for Prague and national diet meal search demand", "https://www.krabickovadietazdrave.cz/", "direct partnership", `official_source_checked_${checkedDate}`, "Add with delivery-area caveat"],
  ["Romania", "LifeBox", "diet prepared meals", "P1", "active", "Romanian healthy menu subscription delivery service with daily balanced menus in Bucharest", "https://www.lifebox.ro/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Romania healthy meal subscription pages"],
  ["Romania", "Fit Food Way", "diet prepared meals", "P1", "active", "Romanian healthy diet food delivery with weight-loss, muscle gain, keto, and custom menu positioning", "https://fitfoodway.ro/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Romania diet catering and high-protein pages"],
  ["Romania", "FoodKit", "diet prepared meals", "P2", "active_region_check", "Romanian prepared meal and healthy subscription candidate", "https://foodkit.ro/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Romania meal prep challenger pages"],
  ["Romania", "Caserola Fit", "diet prepared meals", "P3", "active_region_check", "Romanian boxed diet and prepared meal candidate", "https://caserolafit.ro/", "direct partnership", `official_source_checked_${checkedDate}`, "Add with active delivery caveat"],
  ["Portugal", "EatTasty", "prepared meals", "P2", "closed_or_inactive", "Portuguese prepared meal delivery startup with historical search demand; source checks indicate shutdown in 2025", "https://www.eattasty.pt/", "not ready", `closure_source_checked_${checkedDate}`, "Create alternatives angle only, do not recommend as active"],
  ["Portugal", "Go Natural", "prepared meals", "P2", "active", "Portuguese healthy food and prepared meal brand with easy dinner and grocery relevance", "https://www.gonatural.pt/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Portugal healthy prepared meal pages"],
  ["Portugal", "Celeiro", "grocery dinner delivery", "P2", "active", "Portuguese health food, grocery, and meal-helper retailer with dinner basket relevance", "https://www.celeiro.pt/", "affiliate application", `official_source_checked_${checkedDate}`, "Add to Portugal healthy grocery-dinner pages"],
  ["Portugal", "Comer Melhor", "diet prepared meals", "P3", "active_region_check", "Portuguese healthy prepared meal and diet delivery candidate", "https://comermelhor.pt/", "direct partnership", `official_source_checked_${checkedDate}`, "Add with regional caveat"],
  ["Hungary", "Teletál", "prepared meals", "P2", "active", "Hungarian prepared meal and daily lunch delivery brand with broad ready-meal demand", "https://www.teletal.hu/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Hungary prepared meal pages"],
  ["Hungary", "Cityfood", "prepared meals", "P2", "active", "Hungarian lunch and prepared meal delivery service for daily menus", "https://www.cityfood.hu/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Hungary prepared meal challenger pages"],
  ["Hungary", "Interfood", "prepared meals", "P2", "active", "Hungarian prepared meal delivery and daily menu brand", "https://www.interfood.hu/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Hungary daily menu pages"],
  ["Turkey", "Meal Box", "prepared meals", "P2", "active_b2b_consumer_mixed", "Turkish meal box and corporate/prepared meal service with lunch and meal-plan relevance", "https://www.mealbox.com.tr/", "direct partnership after consumer fit check", `official_source_checked_${checkedDate}`, "Account for Turkey prepared meal demand with B2B caveat"],
  ["Turkey", "FitChef Turkey", "diet prepared meals", "P3", "active_region_check", "Turkey healthy diet meal delivery candidate with local availability to verify", "https://fitchef.com.tr/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Turkey diet meal challenger pages"],
  ["Greece", "Fitness Meals Greece", "high protein meal prep", "P3", "active_region_check", "Greece fitness meal prep delivery candidate", "https://fitnessmeals.gr/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Greece high-protein meal-prep pages"],
  ["Greece", "Food for Fitness Greece", "diet prepared meals", "P3", "active_region_check", "Greek healthy meal prep and diet prepared meal candidate", "https://foodforfitness.gr/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Greece diet prepared meal pages"],
  ["US", "Nutre", "prepared meals", "P2", "active", "healthy prepared meal delivery for New England and tri-state area with weekly rotating menus", "https://www.gonutre.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to regional US prepared meal pages"],
  ["US", "Forkful", "prepared meals", "P2", "active", "prepared non-frozen microwave meal delivery brand with vegan, keto, paleo, gluten-free, high-protein, and GLP-1 relevance", "https://www.eatforkful.com/", "affiliate application", `third_party_and_official_source_checked_${checkedDate}`, "Add to US prepared meal and GLP-1-friendly pages"],
  ["US", "Tempo by Home Chef", "prepared meals", "P1", "active_brand_family", "fresh ready-to-eat prepared meals from the Home Chef family with high-protein and low-calorie positioning", "https://www.homechef.com/tempo", "yes", `official_and_news_source_checked_${checkedDate}`, "Add as Home Chef prepared-meal brand family route"],
  ["US", "Freshology", "diet prepared meals", "P2", "brand_family_route", "diet meal delivery route associated with Diet-to-Go/Freshology brand family", "https://www.diettogo.com/", "affiliate application", `brand_family_source_checked_${checkedDate}`, "Account for Freshology search demand without duplicate claims"],
  ["US", "Veestro", "plant-based prepared meals", "P3", "closed_or_inactive", "formerly notable plant-based prepared meal delivery brand; account for alternatives search demand only", "https://www.veestro.com/", "not ready", `active_status_needs_check_${checkedDate}`, "Do not recommend until active operations are proven"]
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
      wave: "017",
      waveRows: additions.length,
      rowsInserted: inserted.length,
      rowsUpdated: updated.length,
      countriesTouched: [...new Set(additions.map((row) => row.country))].sort(),
      sourceOfTruth: path.relative(root, brandUniversePath),
      waveCsv: path.relative(root, waveCsvPath),
      note: "Adds Poland, Czechia, Romania, Portugal, Hungary, Turkey, Greece, and extra US prepared/diet brands, with active, app-route, regional, brand-family, closed, and B2B caveats."
    },
    null,
    2
  )}\n`
);

console.log(`Wave 017 complete: ${inserted.length} inserted, ${updated.length} updated.`);

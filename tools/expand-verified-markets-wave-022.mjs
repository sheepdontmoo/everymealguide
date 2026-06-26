import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const brandUniversePath = path.join(root, "seo", "global-brand-universe.csv");
const waveCsvPath = path.join(root, "seo", "verified-expansion-wave-022.csv");
const waveReportPath = path.join(root, "reports", "verified-expansion-wave-022.json");

const checkedDate = "2026-06-24";

const additions = [
  ["Brazil", "Liv Up", "frozen prepared meals", "P1", "active_app_route", "Brazilian healthy frozen ready-meal and natural food delivery brand with app-led ordering and strong Sao Paulo/Rio demand", "https://play.google.com/store/apps/details?id=br.com.livup.ecommerce", "direct partnership", `app_and_startup_source_checked_${checkedDate}`, "Promote as Brazil frozen healthy meal anchor with app-route caveat"],
  ["Brazil", "Beleaf", "plant-based frozen meals", "P2", "active_retail_check", "Brazilian plant-based frozen and vegan food brand for healthy grocery dinner searches", "https://www.beleafvegan.com/", "retail affiliate or direct partnership", `official_source_checked_${checkedDate}`, "Add to Brazil plant-based frozen meal pages with retail-route caveat"],
  ["Peru", "Manzana Verde Peru", "diet prepared meals", "P1", "active_app_route", "Peru healthy meal plan and delivery app with personalized daily meals and diet-plan positioning", "https://manzanaverde.la/peru", "direct partnership", `official_and_app_source_checked_${checkedDate}`, "Add as Peru diet meal delivery anchor"],
  ["Mexico", "Manzana Verde Mexico", "diet prepared meals", "P1", "active_app_route", "Mexico healthy meal subscription and app-led diet meal delivery brand active in major cities", "https://apps.apple.com/us/app/manzana-verde-healthy-food/id1542798197", "direct partnership", `app_and_portfolio_source_checked_${checkedDate}`, "Add as Mexico diet meal plan challenger"],
  ["Colombia", "Manzana Verde Colombia", "diet prepared meals", "P2", "active_app_route", "Colombia healthy meal subscription brand from the Manzana Verde app network", "https://play.google.com/store/apps/details?id=la.manzana_verde_app", "direct partnership", `app_and_portfolio_source_checked_${checkedDate}`, "Add to Colombia healthy meal delivery pages"],
  ["UAE", "PrepHero", "high protein meal prep", "P1", "active", "Dubai/UAE macro-tracked chef-made meal-plan delivery brand with weight-loss, muscle-gain, and everyday wellness plans", "https://www.myprephero.com/", "direct partnership", `official_and_app_source_checked_${checkedDate}`, "Add to UAE high-protein and prepared meal-plan pages"],
  ["UAE", "Nutrition Kitchen UAE", "prepared meals", "P1", "active", "UAE fresh ready-made meals delivered daily with chef-designed recipes and reheating convenience", "https://nutritionkitchenuae.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to UAE prepared meal and daily meal-plan pages"],
  ["UAE", "Hello Chef", "meal kit", "P1", "active", "UAE meal-kit brand delivering pre-portioned ingredients and recipes across the country", "https://hellochef.me/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to UAE meal-kit and easy dinner comparison pages"],
  ["UAE", "FITT Meals", "diet prepared meals", "P2", "active", "UAE chef-prepared meal-plan brand serving Dubai, Abu Dhabi, and UAE with weight-loss, flex, and vegetarian plans", "https://fittmeals.ae/en", "direct partnership", `official_source_checked_${checkedDate}`, "Add to UAE diet and prepared meal challenger pages"],
  ["Saudi Arabia", "Right Bite Saudi Arabia", "diet prepared meals", "P1", "active", "Saudi healthy meal-plan delivery brand serving Riyadh, Al-Khobar, and Dammam with calorie-controlled fresh meals", "https://rightbite.com/en-sa/home", "direct partnership", `official_and_app_source_checked_${checkedDate}`, "Add to Saudi diet prepared meal pages"],
  ["Saudi Arabia", "Calo Saudi Arabia", "prepared meals", "P1", "active_app_route", "Saudi app-led personalized fresh meal-plan delivery brand for busy people and fitness goals", "https://calo.app/en", "direct partnership", `official_and_app_source_checked_${checkedDate}`, "Add to Saudi prepared meal-plan pages"],
  ["Qatar", "Dieture", "diet prepared meals", "P1", "active", "Qatar premium meal subscription with dietitian-designed plans for weight loss, keto, vegetarian, and personalized meals", "https://www.dieture.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Qatar diet meal delivery anchor pages"],
  ["Qatar", "Calo Qatar", "prepared meals", "P1", "active_app_route", "Qatar Calo meal-plan route with personalized ready-to-eat meals and app-led ordering", "https://calo.app/en", "direct partnership", `official_and_local_source_checked_${checkedDate}`, "Add to Qatar prepared meal-plan comparisons"],
  ["Qatar", "Diet Delights Qatar", "diet prepared meals", "P2", "active_region_check", "Qatar healthy meal delivery brand referenced in local meal-subscription comparisons", "https://www.dietdelights.com/", "direct partnership after local route check", `local_list_source_checked_${checkedDate}`, "Add with local active-route caveat"],
  ["Kuwait", "Calo Kuwait", "prepared meals", "P1", "active", "Kuwait Calo meal plans with customized fresh meals delivered to home or office", "https://calo.app/en-kw", "direct partnership", `official_source_checked_${checkedDate}`, "Add as Kuwait prepared meal-plan anchor"],
  ["Kuwait", "Anona Diet", "diet prepared meals", "P2", "active", "Kuwait diet meal-plan subscription with dietitian consultation and healthy meal plans", "https://www.anonadiet.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Kuwait diet meal delivery pages"],
  ["Kuwait", "Diet Care Kuwait", "diet prepared meals", "P2", "active", "Kuwait healthy daily meal and diet-plan brand with keto, low-carb, and gourmet meal options", "https://www.dietcaredelivery.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Kuwait healthy prepared meal pages"],
  ["Kuwait", "Protein Kuwait", "high protein meal prep", "P2", "active", "Kuwait specialized diet-plan and protein/fitness meal brand from United Catering Company", "https://proteinfitnessmeals.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Kuwait high-protein meal-prep pages"],
  ["Singapore", "Lean Bento", "high protein prepared meals", "P2", "active_region_check", "Singapore healthy bento and protein-forward prepared meal candidate for local meal-prep demand", "https://leanbento.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Singapore high-protein challenger pages with route caveat"],
  ["Singapore", "Nutrify Meals", "diet prepared meals", "P3", "active_region_check", "Singapore healthy meal prep and nutrition-focused delivery candidate", "https://nutrifymeals.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Singapore diet meal candidate pages"],
  ["Hong Kong", "Eatology Hong Kong", "diet prepared meals", "P1", "active", "Hong Kong meal-plan delivery brand with nutritionist-designed prepared meals and calorie-controlled plans", "https://www.eatologyasia.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Hong Kong diet prepared meal pages"],
  ["Hong Kong", "Nutrition Kitchen Hong Kong", "prepared meals", "P1", "active", "Hong Kong healthy meal-plan brand with fresh prepared meals delivered for fitness and busy professionals", "https://nutritionkitchenhk.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Hong Kong prepared meal-plan comparisons"],
  ["Malaysia", "Dietmonsta", "diet prepared meals", "P2", "active_region_check", "Malaysia healthy meal delivery and diet meal candidate for Kuala Lumpur demand", "https://dietmonsta.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Malaysia diet meal challenger pages"],
  ["Thailand", "Fit Food Always", "high protein meal prep", "P2", "active_region_check", "Thailand fitness meal-prep candidate with healthy prepared meals and macro-led demand", "https://fitfoodalways.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Thailand high-protein meal-prep pages"],
  ["Philippines", "Dear Diet", "diet prepared meals", "P2", "active_region_check", "Philippines healthy diet meal delivery candidate for calorie-controlled and prepared meal demand", "https://deardietdelivery.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Philippines diet prepared meal pages"]
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
      wave: "022",
      waveRows: additions.length,
      rowsInserted: inserted.length,
      rowsUpdated: updated.length,
      countriesTouched: [...new Set(additions.map((row) => row.country))].sort(),
      sourceOfTruth: path.relative(root, brandUniversePath),
      waveCsv: path.relative(root, waveCsvPath),
      note: "Adds Latin America, Gulf, and Southeast/East Asia consumer meal-plan, prepared-meal, frozen, high-protein, and diet meal brands with app-route, regional, and direct-partnership caveats."
    },
    null,
    2
  )}\n`
);

console.log(`Wave 022 complete: ${inserted.length} inserted, ${updated.length} updated.`);

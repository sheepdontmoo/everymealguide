import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const brandUniversePath = path.join(root, "seo", "global-brand-universe.csv");
const waveCsvPath = path.join(root, "seo", "verified-expansion-wave-010.csv");
const waveReportPath = path.join(root, "reports", "verified-expansion-wave-010.json");

const checkedDate = "2026-06-24";

const additions = [
  ["singapore", "Lean Bento", "healthy meal delivery", "2", "active_social_route", "Singapore halal healthy bento delivery brand with fitness, family, maternity, and leaning-out meal-plan demand", "https://order.leanbento.com/", "direct partnership after active checkout check", `social_and_secondary_source_checked_${checkedDate}`, "Verify active ordering path, then add to Singapore halal and healthy meal delivery pages"],
  ["singapore", "YoloFoods", "prepared meals", "2", "active_social_route", "Singapore healthy ready-to-eat meal plan brand with weight-loss, low-carb, vegetarian, and clean-eating demand", "https://www.facebook.com/yoloFoodsSG/", "direct partnership after active checkout check", `social_and_secondary_source_checked_${checkedDate}`, "Verify current ordering route before recommending as active"],
  ["singapore", "Ketomei", "keto prepared meals", "2", "active_social_route", "Singapore keto and low-carb meal-plan brand with chef-prepared meals and subscription demand", "https://www.facebook.com/KetomeiSG/", "direct partnership after active checkout check", `social_and_secondary_source_checked_${checkedDate}`, "Account for keto meal search demand and verify current checkout"],
  ["singapore", "Keto Eato", "keto prepared meals", "2", "active", "Singapore keto-approved halal meal plans and dishes with delivery threshold and meal-plan menu", "https://ketoeatosg.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Singapore keto and low-carb meal pages"],
  ["singapore", "Healthfull", "keto prepared meals", "3", "active", "Singapore keto meals and meal packages with delivery threshold and healthy keto positioning", "https://healthfull.sg/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Singapore keto meal challenger pages"],
  ["uae", "Hello Chef", "meal kit", "1", "active", "UAE meal-kit brand delivering weekly recipes and pre-portioned ingredients", "https://hellochef.me/", "affiliate application", `official_source_checked_${checkedDate}`, "Add as UAE meal-kit anchor against prepared meal-plan brands"],
  ["uae", "FITT Meals", "high protein meal prep", "2", "active", "UAE fitness meal prep and healthy prepared meal delivery brand", "https://fittmeals.ae/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to UAE high-protein prepared-meal pages"],
  ["uae", "Fuel-Up by Kcal", "high protein meal prep", "2", "active", "UAE performance and fitness meal-plan brand from the Kcal ecosystem", "https://fuel-up.ae/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to UAE athlete and high-protein comparison pages"],
  ["uae", "The Protein Kitchen", "high protein meal prep", "3", "active", "UAE protein-focused prepared meal and snack delivery candidate", "https://theproteinkitchen.ae/", "direct partnership", `official_source_checked_${checkedDate}`, "Verify current menu and add to high-protein challenger pages"],
  ["south-africa", "Frozen For You", "frozen meals", "1", "active", "South African frozen home-style meal delivery brand with prepared family meals and convenience demand", "https://www.frozenforyou.co.za/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to South Africa frozen and family prepared-meal pages"],
  ["south-africa", "Dinnerbox", "meal kit", "2", "active", "South African dinner kit and meal-box brand for easy home cooking", "https://dinnerbox.co.za/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to South Africa meal-kit challenger pages"],
  ["south-africa", "DinnerMates", "meal kit", "2", "active", "South African meal-kit and recipe-box delivery candidate for weekly dinner planning", "https://dinnermates.co.za/", "direct partnership", `official_source_checked_${checkedDate}`, "Verify checkout and add to South Africa meal-kit comparisons"],
  ["south-africa", "Frozen Food Factory", "frozen meals", "3", "active", "South African frozen ready-meal brand for easy family dinners", "https://frozenfoodfactory.co.za/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to South Africa frozen prepared-meal challenger set"],
  ["india", "ACTIVeat", "diet prepared meals", "2", "active", "Mumbai healthy meal subscription brand with diet food delivery, daily changing menus, and nutrition support", "https://activeat.in/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to India/Mumbai healthy diet meal pages"],
  ["india", "Healthie", "healthy meal delivery", "2", "active", "India healthy meal and subscription delivery candidate for city-led prepared meal search demand", "https://www.healthie.in/", "direct partnership", `official_source_checked_${checkedDate}`, "Verify current delivery cities and add to India healthy meal pages"],
  ["india", "EatFit", "healthy meal delivery", "1", "active", "India healthy food and meal delivery brand with broad consumer demand and app-led ordering", "https://www.eatfit.in/", "direct partnership", `official_source_checked_${checkedDate}`, "Add as India mainstream healthy meal delivery anchor"],
  ["india", "Kcal Healthy Food", "diet prepared meals", "2", "active", "India calorie-counted healthy meal delivery and diet food brand candidate", "https://www.kcalindia.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Verify active ordering and add to India diet meal comparison"],
  ["france", "Dietbon", "diet prepared meals", "1", "active", "French diet meal delivery program with weight-loss prepared meals and coaching angle", "https://www.dietbon.fr/", "affiliate application", `official_source_checked_${checkedDate}`, "Add to France diet prepared-meal and weight-loss pages"],
  ["france", "Comme J'aime", "diet prepared meals", "1", "active", "French weight-loss meal program with prepared meals and structured diet plan demand", "https://www.commejaime.fr/", "affiliate application", `official_source_checked_${checkedDate}`, "Add to France diet meal delivery comparisons"],
  ["france", "La Belle Vie", "grocery dinner delivery", "2", "active", "French online grocery and easy dinner delivery brand with fresh meal-planning relevance", "https://www.labellevie.com/", "affiliate application", `official_source_checked_${checkedDate}`, "Add to France grocery-dinner pages"],
  ["germany", "Bofrost", "frozen meals", "1", "active", "German frozen food delivery brand with ready meals, family dinners, and frozen convenience demand", "https://www.bofrost.de/", "affiliate application", `official_source_checked_${checkedDate}`, "Add to Germany frozen meal delivery and family dinner pages"],
  ["germany", "Frosta", "frozen meals", "2", "active", "German frozen meal and clean-label ready meal brand with grocery/freezer dinner demand", "https://www.frosta.de/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Germany frozen dinner comparison pages"],
  ["netherlands", "Mealhero", "frozen prepared meals", "2", "active", "Netherlands frozen prepared meal and smart-steamer meal delivery brand", "https://www.mealhero.com/nl/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Netherlands frozen prepared-meal pages"],
  ["netherlands", "Vers aan Tafel", "senior prepared meals", "2", "active", "Dutch fresh prepared meals delivered at home with senior/easy dinner demand", "https://www.versaantafel.nl/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Netherlands senior and fresh meal pages"]
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
      wave: "010",
      waveRows: additions.length,
      rowsInserted: inserted.length,
      rowsUpdated: updated.length,
      countriesTouched: [...new Set(additions.map((row) => row.country))].sort(),
      sourceOfTruth: path.relative(root, brandUniversePath),
      waveCsv: path.relative(root, waveCsvPath),
      note: "Adds international prepared, keto, frozen, grocery-dinner, and diet meal brands across Singapore, UAE, South Africa, India, France, Germany, and Netherlands."
    },
    null,
    2
  )}\n`
);

console.log(`Wave 010 complete: ${inserted.length} inserted, ${updated.length} updated.`);

import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const brandUniversePath = path.join(root, "seo", "global-brand-universe.csv");
const waveCsvPath = path.join(root, "seo", "verified-expansion-wave-012.csv");
const waveReportPath = path.join(root, "reports", "verified-expansion-wave-012.json");

const checkedDate = "2026-06-24";

const additions = [
  ["UK", "Oakhouse Foods", "frozen senior meals", "P1", "active", "UK frozen ready-meal home delivery service with 250+ meals and strong senior/easy-dinner demand", "https://www.oakhousefoods.co.uk/", "affiliate application", `official_source_checked_${checkedDate}`, "Add to UK frozen, seniors, and no-subscription ready-meal pages"],
  ["UK", "apetito UK", "meals on wheels and institutional meals", "P2", "b2b_and_meals_on_wheels", "UK meals-on-wheels, care home, hospital, nursery, school, and local authority meal producer; consumer-adjacent but not a standard DTC recommendation", "https://www.apetito.co.uk/", "direct partnership after fit check", `official_source_checked_${checkedDate}`, "Account for UK meals-on-wheels search demand without treating as normal consumer checkout"],
  ["UK", "DabbaDrop", "plant-based prepared meals", "P2", "active", "London plant-based Indian tiffin delivery with reusable steel dabbas and fresh ready-to-heat meals", "https://dabbadrop.co.uk/", "direct partnership", `official_source_checked_${checkedDate}`, "Promote to UK plant-based prepared meals and London local dinner pages"],
  ["UK", "Potage", "prepared meals", "P3", "closed_or_inactive", "formerly notable UK healthy prepared/frozen meal brand, now appears closed from source checks and should only be accounted for as historical search demand", "https://fieldgoods.co.uk/pages/potage", "not ready", `closure_source_checked_${checkedDate}`, "Route users toward FieldGoods, COOK, Field Doctor, and Planty alternatives"],
  ["UK", "FieldGoods", "prepared meals", "P2", "active", "UK chef-made frozen meals and Potage alternative with prepared meals delivered to the door", "https://fieldgoods.co.uk/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to UK frozen prepared meal and Potage-alternative pages"],
  ["UK", "HomeCooks", "prepared meals", "P2", "active", "UK marketplace for chef-made ready meals from independent cooks, delivered frozen for easy home dinners", "https://home-cooks.co.uk/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to UK marketplace and independent chef prepared-meal pages"],
  ["UK", "Cook My Grub", "prepared meals", "P3", "active", "UK home-style Indian meal delivery marketplace candidate with local cooked meal demand", "https://www.cookmygrub.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to UK ethnic/home-style prepared meal challenger pages"],
  ["UK", "All About The Cooks", "prepared meals marketplace", "P3", "active", "UK marketplace for homemade meals from local cooks with prepared dinner delivery relevance", "https://allaboutthecooks.co.uk/", "direct partnership", `official_source_checked_${checkedDate}`, "Account for local homemade meal marketplace demand"],
  ["Ireland", "DropChef", "meal kit and prepared meals", "P0", "active", "Irish meal kit and prepared meal brand with recipe boxes, prepared meals, and national dinner subscription demand", "https://dropchef.com/", "affiliate application", `official_source_checked_${checkedDate}`, "Promote to Ireland anchor and compare against HelloFresh-style services"],
  ["Ireland", "Gourmet Fuel", "prepared meals", "P0", "active", "Irish fresh healthy meal plan and prepared meal delivery brand for fitness, weight loss, and convenience", "https://gourmetfuel.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Promote to Ireland meal-plan and high-protein pages"],
  ["Ireland", "Eatto", "frozen prepared meals", "P1", "active", "Irish frozen prepared meal delivery brand with convenient ready meals and family dinner relevance", "https://eatto.ie/", "direct partnership", `official_source_checked_${checkedDate}`, "Promote to Ireland frozen prepared meal pages"],
  ["Ireland", "The Good Prep Ireland", "prepared meals", "P2", "active", "Irish healthy prepared meal delivery and meal prep candidate for convenience and nutrition-focused buyers", "https://thegoodprep.ie/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Ireland prepared meal challenger pages"],
  ["Ireland", "Clean Cut Meals", "prepared meals", "P2", "active", "Irish healthy meal prep and prepared meal delivery brand with fitness and convenience demand", "https://cleancutmeals.ie/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Ireland high-protein and fitness meal-prep pages"],
  ["Ireland", "BodyChef Ireland", "diet prepared meals", "P2", "active", "Irish meal plan and diet meal delivery candidate for healthy eating and weight management", "https://bodychef.ie/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Ireland diet prepared meal pages"],
  ["Canada", "Fit Kitchen Canada", "prepared meals", "P2", "active", "Canadian prepared meal delivery brand with fitness and healthy eating demand", "https://fitkitchen.ca/", "direct partnership", `official_source_checked_${checkedDate}`, "Promote to Canada prepared and fitness meal pages"],
  ["Canada", "Factor Canada", "prepared meals", "P1", "active", "ready-to-eat Factor meal delivery available in Canada with prepared meals and high-protein demand", "https://www.factor75.com/pages/canada", "yes", `official_source_checked_${checkedDate}`, "Add to Canada Factor prepared meal comparisons"],
  ["Canada", "Yumba", "prepared meals", "P2", "active", "Canadian chef-prepared meal delivery brand for ready-to-eat meals and healthy dinner convenience", "https://www.yumba.ca/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Canada prepared meal challenger pages"],
  ["Canada", "Meal Prep Ottawa", "prepared meals", "P3", "active", "Ottawa regional meal prep delivery brand with local high-protein prepared meal demand", "https://mealpreottawa.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add as regional Canada meal prep candidate"],
  ["Australia", "Foober", "diet prepared meals", "P2", "active", "Australian keto, weight-loss, and healthy prepared meal delivery brand", "https://foober.com.au/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to AU keto, weight-loss, and prepared-meal pages"],
  ["Australia", "Core Powerfoods", "high protein prepared meals", "P2", "active", "Australian frozen high-protein ready meals with fitness and supermarket/freezer demand", "https://corepowerfoods.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to AU high-protein frozen meal pages"],
  ["Australia", "Muscle Meals Direct", "high protein meal prep", "P2", "active", "Australian performance meal prep delivery brand with high-protein and macro demand", "https://musclemealsdirect.com.au/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to AU fitness prepared meal challenger pages"],
  ["Australia", "Garden of Vegan", "plant-based prepared meals", "P2", "active", "Australian organic plant-based prepared meal delivery brand", "https://gardenofvegan.com.au/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to AU vegan prepared meal pages"],
  ["New Zealand", "FED.", "prepared meals", "P1", "active", "New Zealand ready-made meal delivery brand with prepared dinners and family convenience demand", "https://www.fed.co.nz/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to New Zealand prepared meal anchor set"],
  ["New Zealand", "Angel Delivery", "frozen meals", "P2", "active", "New Zealand frozen meal and care package delivery brand for families, new parents, and easy dinners", "https://www.angeldelivery.co.nz/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to New Zealand frozen and family meal pages"],
  ["New Zealand", "Jess' Underground Kitchen", "prepared meals", "P2", "active", "New Zealand prepared meal delivery brand with frozen/fresh meal convenience and local demand", "https://www.juk.co.nz/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to New Zealand prepared meal challenger pages"],
  ["Hong Kong", "Cali-Mex", "prepared meals", "P3", "active", "Hong Kong meal delivery and ready-food candidate for international dinner convenience searches", "https://www.cali-mex.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Hong Kong international prepared meal challenger pages"]
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
      wave: "012",
      waveRows: additions.length,
      rowsInserted: inserted.length,
      rowsUpdated: updated.length,
      countriesTouched: [...new Set(additions.map((row) => row.country))].sort(),
      sourceOfTruth: path.relative(root, brandUniversePath),
      waveCsv: path.relative(root, waveCsvPath),
      note: "Adds UK/Ireland/Canada/Australia/New Zealand/Hong Kong frozen, senior, prepared, plant-based, grocery-dinner, and regional delivery coverage with explicit caveats for B2B or inactive brands."
    },
    null,
    2
  )}\n`
);

console.log(`Wave 012 complete: ${inserted.length} inserted, ${updated.length} updated.`);

import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const brandUniversePath = path.join(root, "seo", "global-brand-universe.csv");
const waveCsvPath = path.join(root, "seo", "verified-expansion-wave-008.csv");
const waveReportPath = path.join(root, "reports", "verified-expansion-wave-008.json");

const checkedDate = "2026-06-24";

const additions = [
  ["US", "Trifecta", "fitness prepared meals", "P0", "active", "performance-focused high-protein prepared meals with dietitian and chef-built plans", "https://www.trifectanutrition.com/", "affiliate application", `official_source_checked_${checkedDate}`, "Promote to US high-protein anchor and apply after domain is live"],
  ["US", "Territory Foods", "prepared meals", "P1", "active", "local chef prepared meals with diet filters and prepared delivery positioning", "https://www.territoryfoods.com/", "affiliate application", `official_source_checked_${checkedDate}`, "Use for diet-filtered prepared-meal comparisons and verify delivery footprint"],
  ["US", "FlexPro Meals", "fitness prepared meals", "P1", "active", "high-protein fitness meal prep with shipped prepared meals", "https://www.flexpromeals.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Use for US gym and bulk meal-prep pages"],
  ["US", "Clean Eatz Kitchen", "prepared meals", "P1", "active", "macro-friendly prepared meals with no-subscription boxes and continental US shipping", "https://www.cleaneatzkitchen.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Promote to US value prepared-meal and GLP-1 support comparisons"],
  ["US", "Snap Kitchen", "prepared meals", "P2", "active", "fresh prepared meals with local delivery/store footprint and meal plans", "https://www.snapkitchen.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Use with service-area caveat and route after ZIP check"],
  ["US", "Mosaic Foods", "frozen plant-based meals", "P1", "active", "healthy frozen plant-centric meals, bowls, family meals, soups, smoothies, and no-prep dinners", "https://www.mosaicfoods.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to frozen, vegan, and family prepared-meal pages"],
  ["US", "Thistle", "prepared meals", "P1", "active", "fresh ready-to-eat meals with plant and meat protein options, nutritionist-designed menus, and delivery", "https://www.thistle.co/", "affiliate application", `official_source_checked_${checkedDate}`, "Use for US premium healthy prepared-meal and high-protein pages"],
  ["US", "Eat Clean Bro", "prepared meals", "P2", "active", "fresh prepared meal prep brand with athlete/high-protein search demand", "https://eatcleanbro.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Verify exact delivery footprint, then add to high-protein comparisons"],
  ["US", "MightyMeals", "prepared meals", "P2", "active", "regional fresh prepared meal delivery brand with fitness and family meal prep demand", "https://www.mightymeals.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Use with regional-service caveat and direct outreach"],
  ["US", "Splendid Spoon", "prepared meals", "P2", "active", "plant-based prepared bowls, smoothies, soups, and wellness meal delivery", "https://splendidspoon.com/", "affiliate application", `official_source_checked_${checkedDate}`, "Add to vegan, smoothie, and prepared meal pages"],
  ["US", "Fuel Meals", "high protein meal prep", "P2", "active", "fitness meal prep delivery with high-protein prepared meals and athletic positioning", "https://www.fuelmeals.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to athlete and high-protein comparison sets"],
  ["US", "ICON Meals", "high protein meal prep", "P2", "active", "custom and pre-made fitness meals with macro-focused checkout", "https://iconmeals.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to custom meal-prep and bodybuilder pages"],
  ["US", "MegaFit Meals", "high protein meal prep", "P2", "active", "fitness prepared meals with high-protein and athlete-focused demand", "https://megafitmeals.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to US high-protein challenger comparisons"],
  ["US", "Methodology", "premium prepared meals", "P2", "active", "premium prepared meal delivery with clean ingredient and reusable-container positioning", "https://www.gomethodology.com/", "affiliate application", `official_source_checked_${checkedDate}`, "Use for premium healthy prepared-meal comparison"],
  ["US", "MealPro", "fitness prepared meals", "P2", "active", "high-protein prepared meal delivery with custom macro and fitness meal positioning", "https://www.mealpro.net/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to macro and fitness prepared meal pages"],
  ["Canada", "Fresh Prep", "meal kit and prepared meals", "P1", "active", "Canadian meal-kit and prepared-meal brand with Western Canada demand", "https://www.freshprep.ca/", "affiliate application", `official_source_checked_${checkedDate}`, "Promote to Canada meal-kit and prepared-meal comparisons"],
  ["Canada", "WeCook", "prepared meals", "P1", "active", "ready-to-eat prepared meals in Canada with recurring menu and delivery positioning", "https://www.wecookmeals.ca/en", "direct partnership", `official_source_checked_${checkedDate}`, "Use as Canada prepared-meal anchor"],
  ["Canada", "LiveFit Foods", "prepared meals", "P1", "active", "Canadian chef-prepared fresh meals with keto, muscle gain, vegan, and weight-loss journeys", "https://livefitfood.ca/", "direct partnership", `official_source_checked_${checkedDate}`, "Promote to Canada high-protein and diet prepared-meal pages"],
  ["Canada", "Protein Chefs", "high protein meal prep", "P2", "active", "Canada meal-prep delivery brand for macro, fitness, and high-protein goals", "https://proteinchefs.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Canada high-protein challenger comparisons"],
  ["Canada", "Spatula Foods", "frozen meals", "P2", "active", "Canadian frozen meal delivery brand with quick heat-and-eat dinners", "https://www.spatulafoods.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Canada frozen prepared-meal pages"],
  ["Canada", "Inspired Go", "prepared meals", "P2", "active", "Canadian fresh meal and salad delivery brand with recurring healthy eating demand", "https://inspiredgo.ca/", "direct partnership", `official_source_checked_${checkedDate}`, "Use for Canada healthy lunch and prepared-meal pages"],
  ["Canada", "MealFix Canada", "prepared meals", "P3", "active", "Canadian prepared meal delivery candidate for ready-to-eat local comparison coverage", "https://www.mealfixcanada.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Verify coverage and add to regional Canada prepared-meal pages"],
  ["Australia", "Youfoodz", "prepared meals", "P0", "active", "Australian ready-meal brand with prepared meals, snacks, and mainstream demand", "https://www.youfoodz.com/", "affiliate application", `official_source_checked_${checkedDate}`, "Keep as AU prepared-meal anchor"],
  ["Australia", "My Muscle Chef", "fitness prepared meals", "P0", "active", "Australian high-protein ready-made meals and fitness meal-prep anchor", "https://www.mymusclechef.com/", "affiliate application", `official_source_checked_${checkedDate}`, "Keep as AU high-protein anchor"],
  ["Australia", "Chefgood", "prepared meals", "P1", "active", "Australian healthy ready meals with prepared-meal subscription demand", "https://chefgood.com.au/", "direct partnership", `official_source_checked_${checkedDate}`, "Use as AU healthy prepared-meal challenger"],
  ["Australia", "Soulara", "plant-based prepared meals", "P1", "active", "Australian plant-based prepared meals and vegan meal delivery", "https://www.soulara.com.au/", "direct partnership", `official_source_checked_${checkedDate}`, "Use as AU vegan prepared-meal anchor"],
  ["Australia", "Macros", "macro prepared meals", "P1", "active", "Australian macro-focused ready meals for fitness and calorie-controlled eating", "https://www.macros.com.au/", "direct partnership", `official_source_checked_${checkedDate}`, "Promote to AU macro and high-protein comparisons"],
  ["Australia", "Workout Meals", "fitness prepared meals", "P2", "active", "Australian high-protein and performance meal-prep delivery brand", "https://workoutmeals.com.au/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to AU high-protein challenger comparisons"],
  ["Australia", "Dineamic", "prepared meals", "P2", "active", "Australian prepared ready-meal brand with chef-made family and healthy dinner range", "https://www.dineamic.com.au/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to AU family and prepared-meal comparisons"],
  ["Australia", "Be Fit Food", "diet prepared meals", "P2", "active", "Australian dietitian-designed weight-loss and health meal delivery brand", "https://befitfood.com.au/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to AU diet and weight-loss comparisons"],
  ["Australia", "Dietlicious", "diet prepared meals", "P2", "active", "Australian healthy prepared meals and diet meal delivery brand", "https://dietlicious.com.au/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to AU diet prepared-meal pages"],
  ["Australia", "Nourish'd", "prepared meals", "P2", "active", "Australian healthy ready-meal delivery brand for prepared meals and meal plans", "https://nourishd.com.au/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to AU healthy prepared-meal comparisons"],
  ["UK", "Prep Kitchen", "high protein prepared meals", "P0", "active", "UK high-protein chef-made meals delivered across the UK and ready in minutes", "https://prepkitchen.co.uk/", "affiliate application", `official_source_checked_${checkedDate}`, "Promote to UK high-protein prepared-meal anchor"],
  ["UK", "MuscleFood", "meal prep and grocery", "P1", "active", "UK high-protein online food shop with meat, meals, FitPot/prepped pots, and goal-based ranges", "https://www.musclefood.com/", "affiliate application", `official_source_checked_${checkedDate}`, "Use as UK protein grocery and prepared-meal hybrid"],
  ["UK", "Field Doctor", "frozen diet prepared meals", "P1", "active", "UK dietitian-designed frozen healthy ready meals with high-protein, low-FODMAP, gluten-free, and health ranges", "https://www.fielddoctor.co.uk/", "affiliate application", `official_source_checked_${checkedDate}`, "Add to UK diet, frozen, and health-specific meal pages"],
  ["UK", "The Good Prep", "prepared meals", "P1", "active", "UK premium macro-balanced chef-cooked ready-to-eat meal prep delivery", "https://thegoodprep.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Promote to UK athlete and premium meal-prep comparisons"],
  ["UK", "Frive", "prepared meals", "P1", "active", "UK fresh prepared meal brand formerly known as Lions Prep with health and performance meal delivery demand", "https://www.frive.co.uk/", "affiliate application", `official_source_checked_${checkedDate}`, "Add as UK premium prepared-meal anchor"],
  ["UK", "Planty", "frozen plant-based meals", "P2", "active", "UK plant-based frozen prepared meals delivered for vegan and flexitarian dinners", "https://planty.uk/", "direct partnership", `official_source_checked_${checkedDate}`, "Use for UK vegan and frozen meal pages"],
  ["UK", "COOK", "frozen meals", "P1", "active", "UK frozen prepared meals and family dinner delivery/collection brand", "https://www.cookfood.net/", "affiliate application", `official_source_checked_${checkedDate}`, "Add to UK family frozen-meal comparisons"],
  ["UK", "Wiltshire Farm Foods", "frozen meals", "P1", "active", "UK frozen ready-meal delivery brand with older-adult and special-diet demand", "https://www.wiltshirefarmfoods.com/", "affiliate application", `official_source_checked_${checkedDate}`, "Add to UK frozen, seniors, and special-diet comparisons"],
  ["UK", "Simmer Eats", "prepared meals", "P2", "active", "UK prepared meal delivery candidate for healthy ready-meal comparisons", "https://www.simmereats.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Verify menu/coverage and include as challenger"],
  ["UK", "Fresh Fitness Food", "high protein prepared meals", "P2", "active", "UK personalised nutrition and fresh meal delivery brand for performance and body-composition goals", "https://www.freshfitnessfood.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to premium performance meal-prep pages"],
  ["UK", "Detox Kitchen", "prepared meals", "P2", "active", "UK healthy prepared meal delivery and meal plan brand with wellness positioning", "https://detoxkitchen.co.uk/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to wellness and healthy prepared-meal comparisons"]
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
      wave: "008",
      waveRows: additions.length,
      rowsInserted: inserted.length,
      rowsUpdated: updated.length,
      countriesTouched: [...new Set(additions.map((row) => row.country))].sort(),
      sourceOfTruth: path.relative(root, brandUniversePath),
      waveCsv: path.relative(root, waveCsvPath),
      note: "Upserts US, Canada, Australia, and UK prepared-meal/high-protein coverage so stale needs_official_check rows become verified active rows where official source evidence exists."
    },
    null,
    2
  )}\n`
);

console.log(`Wave 008 complete: ${inserted.length} inserted, ${updated.length} updated.`);

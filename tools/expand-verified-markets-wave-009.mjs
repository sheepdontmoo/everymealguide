import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const brandUniversePath = path.join(root, "seo", "global-brand-universe.csv");
const waveCsvPath = path.join(root, "seo", "verified-expansion-wave-009.csv");
const waveReportPath = path.join(root, "reports", "verified-expansion-wave-009.json");

const checkedDate = "2026-06-24";

const additions = [
  ["US", "Little Spoon", "kids and baby meals", "P1", "active", "fresh baby, toddler, and kids meal delivery with Babyblends, Biteables, Plates, Lunchers, snacks, and formula", "https://www.littlespoon.com/", "affiliate application", `official_source_checked_${checkedDate}`, "Add to US kids meal delivery, toddler meals, and family pages"],
  ["US", "Nurture Life", "kids meals", "P1", "active", "kids meal delivery service focused on ready-made meals and picky-eater family convenience", "https://www.nurturelife.com/", "affiliate application", `official_source_checked_${checkedDate}`, "Use as US kids meal delivery anchor"],
  ["US", "Tiny Organics", "baby and toddler meals", "P2", "active", "organic baby and toddler meals delivered to the door", "https://www.tinyorganics.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to baby/toddler meal pages"],
  ["US", "Yumi", "kids and toddler snacks", "P3", "active", "healthy toddler and family snack brand with baby-food heritage", "https://helloyumi.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Account for Yumi baby-food search demand with current snack positioning"],
  ["US", "bistroMD", "diet prepared meals", "P1", "active", "dietitian-designed chef-prepared weight-loss and wellness meal delivery with specialized programs", "https://www.bistromd.com/", "affiliate application", `official_source_checked_${checkedDate}`, "Add to US diet, weight-loss, diabetic, and high-protein pages"],
  ["US", "Diet-to-Go", "diet prepared meals", "P1", "active", "diet prepared meal delivery brand for weight-loss and structured plans", "https://www.diettogo.com/", "affiliate application", `official_source_checked_${checkedDate}`, "Add to US diet meal delivery and weight-loss comparisons"],
  ["US", "ModifyHealth", "medical diet meals", "P1", "active", "medically tailored prepared meals focused on low-FODMAP, Mediterranean, and condition-specific nutrition", "https://www.modifyhealth.com/", "affiliate application", `official_source_checked_${checkedDate}`, "Add to medical diet and low-FODMAP meal pages"],
  ["US", "Epicured", "medical diet meals", "P1", "active", "low-FODMAP and gluten-free fresh meal delivery for digestive health", "https://www.epicured.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Use as medical/specialist diet meal anchor"],
  ["US", "Magic Kitchen", "frozen senior and special-diet meals", "P1", "active", "frozen prepared meals with senior, diabetic, renal, dialysis, low-carb, and complete-meal options", "https://www.magickitchen.com/", "affiliate application", `official_source_checked_${checkedDate}`, "Add to seniors, frozen meals, and special-diet pages"],
  ["US", "Mom's Meals", "medically tailored meals", "P1", "active", "home-delivered medically tailored meals with diabetes, renal, heart-friendly, protein+, pureed, halal, kosher, produce, and pantry programs", "https://www.momsmeals.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to seniors, medically tailored meals, and food-as-medicine pages"],
  ["US", "Sakara", "premium plant-based prepared meals", "P1", "active", "premium plant-based nutrition programs, prepared meals, and wellness delivery", "https://www.sakara.com/", "affiliate application", `official_source_checked_${checkedDate}`, "Add to premium wellness, plant-based, and prepared-meal pages"],
  ["US", "Hungryroot", "grocery dinner delivery", "P0", "active", "personalized grocery-dinner service combining meal-kit convenience, grocery variety, recipes, and dietary filters", "https://www.hungryroot.com/", "affiliate application", `official_source_checked_${checkedDate}`, "Use as US grocery-dinner anchor"],
  ["US", "Wildgrain", "frozen bakery and dinner pantry", "P2", "active", "subscription box for bake-from-frozen breads, pastas, pastries, and dinner pantry staples", "https://wildgrain.com/", "affiliate application", `official_source_checked_${checkedDate}`, "Add to frozen pantry and dinner helper pages"],
  ["US", "Daily Harvest", "frozen plant-based meals", "P1", "active", "frozen plant-based smoothies, bowls, soups, and no-prep meal delivery", "https://www.daily-harvest.com/", "affiliate application", `official_source_checked_${checkedDate}`, "Add to US frozen vegan and smoothie meal pages"],
  ["Canada", "Heart to Home Meals", "frozen senior meals", "P1", "active", "Canadian frozen prepared meal delivery brand for seniors and home convenience", "https://www.hearttohomemeals.ca/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Canada senior and frozen meal pages"],
  ["Canada", "Power Kitchen", "high protein meal prep", "P2", "active", "Canadian macro and high-protein prepared meal delivery brand", "https://powerkitchen.ca/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Canada high-protein challenger pages"],
  ["Canada", "Athletes Kitchen", "high protein meal prep", "P2", "active", "Canadian athlete-focused meal-prep delivery brand", "https://athleteskitchen.ca/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Canada fitness meal-prep pages"],
  ["Australia", "The Dinner Ladies", "frozen family meals", "P1", "active", "Australian frozen family meal delivery brand with ready-made dinners and entertaining food", "https://www.dinnerladies.com.au/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to AU family frozen-meal pages"],
  ["Australia", "Lite n' Easy", "diet prepared meals", "P1", "active", "Australian weight-loss and healthy prepared-meal delivery brand", "https://www.liteneasy.com.au/", "affiliate application", `official_source_checked_${checkedDate}`, "Add to AU diet and prepared-meal comparisons"],
  ["Australia", "Tender Loving Cuisine", "senior and diet meals", "P1", "active", "Australian prepared meal delivery brand for seniors, NDIS-style support, and healthy home meals", "https://www.tlc.org.au/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to AU seniors and special-diet pages"],
  ["Australia", "The Good Meal Co", "prepared meals", "P2", "active", "Australian ready-made meal delivery brand focused on convenient prepared meals", "https://www.thegoodmealco.com.au/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to AU prepared-meal challenger pages"],
  ["UK", "Grubby", "vegan meal kit", "P1", "active", "UK plant-based recipe kit and vegan meal-kit delivery brand", "https://grubby.co.uk/", "affiliate application", `official_source_checked_${checkedDate}`, "Add to UK vegan meal-kit comparisons"],
  ["UK", "Riverford", "grocery dinner delivery", "P1", "active", "UK organic veg box and recipe-box brand with dinner-planning relevance", "https://www.riverford.co.uk/", "affiliate application", `official_source_checked_${checkedDate}`, "Add to UK grocery-dinner and organic recipe-box pages"],
  ["UK", "Abel & Cole", "grocery dinner delivery", "P1", "active", "UK organic grocery, veg box, and recipe-box delivery brand", "https://www.abelandcole.co.uk/", "affiliate application", `official_source_checked_${checkedDate}`, "Add to UK organic grocery-dinner comparisons"],
  ["UK", "Parsley Box", "shelf-stable senior meals", "P2", "active", "UK cupboard-stored prepared meal delivery for older customers and easy dinners", "https://www.parsleybox.com/", "affiliate application", `official_source_checked_${checkedDate}`, "Add to UK seniors and shelf-stable meal pages"],
  ["UK", "Balance Box", "diet prepared meals", "P2", "active", "UK healthy diet meal delivery and calorie-controlled meal plan brand", "https://www.balancebox.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to UK diet prepared-meal pages"]
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
      wave: "009",
      waveRows: additions.length,
      rowsInserted: inserted.length,
      rowsUpdated: updated.length,
      countriesTouched: [...new Set(additions.map((row) => row.country))].sort(),
      sourceOfTruth: path.relative(root, brandUniversePath),
      waveCsv: path.relative(root, waveCsvPath),
      note: "Adds and upserts kids, medical/diet, senior, frozen, and grocery-dinner brands that broaden Every Meal Guide beyond mainstream meal kits."
    },
    null,
    2
  )}\n`
);

console.log(`Wave 009 complete: ${inserted.length} inserted, ${updated.length} updated.`);

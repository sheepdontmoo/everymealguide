import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const brandUniversePath = path.join(root, "seo", "global-brand-universe.csv");
const waveCsvPath = path.join(root, "seo", "verified-expansion-wave-019.csv");
const waveReportPath = path.join(root, "reports", "verified-expansion-wave-019.json");

const checkedDate = "2026-06-24";

const additions = [
  ["US", "Amy's Kitchen", "frozen prepared meals", "P1", "active", "organic vegetarian, vegan, gluten-free, and convenience frozen meals for grocery dinner comparisons", "https://www.amys.com/", "retail affiliate", `official_and_retail_source_checked_${checkedDate}`, "Add to healthy frozen dinner and vegetarian frozen meal pages"],
  ["US", "Saffron Road", "frozen prepared meals", "P1", "active", "certified halal and mostly gluten-free frozen dinners with international cuisine positioning", "https://www.saffronroad.com/collections/frozen-dinners", "retail affiliate", `official_source_checked_${checkedDate}`, "Add to halal, gluten-free, and international frozen dinner pages"],
  ["US", "Deep Indian Kitchen", "frozen prepared meals", "P1", "active", "ready-to-eat Indian frozen meals and wraps with strong grocery-dinner relevance", "https://deepindiankitchen.com/", "retail affiliate", `official_source_checked_${checkedDate}`, "Add to Indian frozen dinner and quick lunch pages"],
  ["US", "Kevin's Natural Foods", "heat and eat meals", "P1", "active", "clean-label heat-and-eat entrees, stir-fry kits, keto, paleo, dairy-free, gluten-free, and soy-free dinner shortcuts", "https://www.kevinsnaturalfoods.com/collections/heat-eat-entrees", "retail affiliate", `official_and_retail_source_checked_${checkedDate}`, "Add to high-protein, keto, paleo, and heat-and-eat dinner pages"],
  ["US", "Real Good Foods", "high protein frozen meals", "P1", "active", "high-protein, low-carb, gluten-free frozen meals, chicken, and snacks for macro-friendly dinner searches", "https://realgoodfoods.com/collections/all", "retail affiliate", `official_source_checked_${checkedDate}`, "Add to high-protein frozen meal pages"],
  ["US", "Gardein", "frozen plant-based meals", "P2", "active", "plant-based frozen bowls and meatless meal starters for vegan dinner shortcuts", "https://www.gardein.com/meatless", "retail affiliate", `official_source_checked_${checkedDate}`, "Add to plant-based frozen meal pages"],
  ["US", "Sweet Earth", "frozen plant-based meals", "P2", "active_retail_route", "plant-forward frozen dinners and bowls with vegan and protein-forward grocery relevance", "https://www.goodnes.com/sweet-earth/", "retail affiliate", `brand_family_and_retail_source_checked_${checkedDate}`, "Add to vegan and plant-based grocery dinner pages"],
  ["US", "Evol", "frozen prepared meals", "P2", "active", "microwave-ready single-serve meals, protein bowls, and burritos for convenient frozen dinner searches", "https://www.evolfoods.com/", "retail affiliate", `official_and_retail_source_checked_${checkedDate}`, "Add to frozen bowl and burrito pages"],
  ["US", "Lean Cuisine", "diet frozen meals", "P1", "active", "frozen meals with diet, high-protein, gluten-free, and calorie-conscious positioning", "https://www.goodnes.com/lean-cuisine/", "retail affiliate", `official_source_checked_${checkedDate}`, "Add to diet frozen meal and calorie-conscious pages"],
  ["US", "Healthy Choice", "diet frozen meals", "P1", "active", "healthy frozen meals, power bowls, max bowls, and protein-forward quick meals", "https://www.healthychoice.com/", "retail affiliate", `official_source_checked_${checkedDate}`, "Add to healthy frozen meal and high-protein bowl pages"],
  ["US", "Marie Callender's", "comfort frozen meals", "P1", "active", "comfort-food frozen dinners, bowls, pot pies, and family-size meals for mainstream grocery dinner demand", "https://www.mariecallendersmeals.com/frozen-dinners", "retail affiliate", `official_source_checked_${checkedDate}`, "Add to comfort frozen dinner and family-size meal pages"],
  ["US", "Stouffer's", "comfort frozen meals", "P1", "active", "mainstream frozen entrees, lasagna, macaroni and cheese, and family-size dinner options", "https://www.goodnes.com/stouffers/", "retail affiliate", `official_and_retail_source_checked_${checkedDate}`, "Promote candidate to active grocery frozen meal coverage"],
  ["US", "Birds Eye Voila", "frozen skillet meals", "P2", "active", "frozen skillet meal bags for easy family dinners and grocery dinner shortcuts", "https://www.birdseye.com/voila/", "retail affiliate", `official_source_checked_${checkedDate}`, "Add to frozen skillet meal pages"],
  ["US", "P.F. Chang's Home Menu", "frozen skillet meals", "P2", "active", "Asian-inspired frozen meals, skillet meals, and appetizers for grocery dinner comparisons", "https://www.pfchangshomemenu.com/", "retail affiliate", `official_source_checked_${checkedDate}`, "Add to Asian frozen dinner pages"],
  ["US", "Primal Kitchen", "grocery dinner helpers", "P2", "active", "paleo and keto sauces, pantry shortcuts, and clean-label dinner helpers for grocery meal planning", "https://www.primalkitchen.com/", "retail affiliate", `official_source_checked_${checkedDate}`, "Add to paleo/keto grocery dinner helper pages"],
  ["US", "Good Food Made Simple", "frozen prepared meals", "P3", "active", "frozen breakfast and entree brand with simple-ingredient convenience meal positioning", "https://www.goodfoodmadesimple.com/", "retail affiliate", `official_source_checked_${checkedDate}`, "Add to frozen prepared meal challenger pages"],
  ["US", "Caulipower", "frozen gluten-free meals", "P3", "active", "better-for-you frozen pizzas, meals, and gluten-free dinner shortcuts", "https://eatcaulipower.com/", "retail affiliate", `official_source_checked_${checkedDate}`, "Add to gluten-free frozen dinner pages"],
  ["US", "Atkins", "diet frozen meals", "P2", "active", "low-carb frozen meals and meal replacement products for diet grocery dinner searches", "https://www.atkins.com/products/frozen-meals", "retail affiliate", `official_source_checked_${checkedDate}`, "Add to low-carb frozen meal and diet pages"],
  ["US", "Vital Pursuit", "high protein frozen meals", "P2", "active", "portion-aligned high-protein frozen meals from Nestle for GLP-1 and weight-management-adjacent search demand", "https://www.goodnes.com/vital-pursuit/", "retail affiliate", `official_source_checked_${checkedDate}`, "Add to high-protein frozen meal pages with health-claims caveat"],
  ["US", "Afia", "plant-based frozen meals", "P3", "active", "Mediterranean-inspired falafel, bowls, and plant-based frozen meals for vegan and gluten-free grocery dinner searches", "https://afiafoods.com/", "retail affiliate", `official_and_news_source_checked_${checkedDate}`, "Add to plant-based Mediterranean frozen dinner pages"]
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
      wave: "019",
      waveRows: additions.length,
      rowsInserted: inserted.length,
      rowsUpdated: updated.length,
      countriesTouched: [...new Set(additions.map((row) => row.country))].sort(),
      sourceOfTruth: path.relative(root, brandUniversePath),
      waveCsv: path.relative(root, waveCsvPath),
      note: "Adds mainstream grocery, frozen dinner, high-protein frozen meal, comfort meal, plant-based frozen meal, and skillet dinner coverage for consumer SEO and retail affiliate monetization."
    },
    null,
    2
  )}\n`
);

console.log(`Wave 019 complete: ${inserted.length} inserted, ${updated.length} updated.`);

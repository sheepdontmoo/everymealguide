import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const brandUniversePath = path.join(root, "seo", "global-brand-universe.csv");
const waveCsvPath = path.join(root, "seo", "verified-expansion-wave-011.csv");
const waveReportPath = path.join(root, "reports", "verified-expansion-wave-011.json");

const checkedDate = "2026-06-24";

const additions = [
  ["US", "Gobble", "fast-prep meal kit", "P1", "active", "15-minute meal kit with freshly prepped ingredients, flexible plans, classic, lean and clean, and vegetarian routes", "https://www.gobble.com/", "affiliate application", `official_source_checked_${checkedDate}`, "Promote to US fast-prep meal-kit anchor and compare against Home Chef and Blue Apron"],
  ["US", "Metabolic Meals", "prepared meals", "P1", "active", "chef-prepared fresh healthy meals shipped ready to heat with rotating menus and performance nutrition demand", "https://mymetabolicmeals.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Promote to US healthy prepared-meal and high-protein pages"],
  ["US", "Pete's Real Food", "paleo prepared meals", "P2", "active_content_needs_checkout_check", "paleo-friendly real-food brand with current site content and historical heat-and-eat meal demand", "https://www.petesrealfood.com/", "direct partnership after checkout check", `official_source_checked_${checkedDate}`, "Keep accounted but verify live meal checkout before strong recommendation"],
  ["US", "Paleo On The Go", "specialty prepared meals", "P2", "archive_or_needs_active_check", "AIP and paleo meal delivery brand now showing archive-style official content, still important for brand search demand", "https://paleoonthego.com/", "verify before monetization", `official_archive_checked_${checkedDate}`, "Account for search demand but do not recommend until active ordering is confirmed"],
  ["US", "Urban AIP", "medical diet meals", "P2", "active", "organic chef-prepared AIP and paleo meals shipped nationwide for autoimmune and anti-inflammatory diets", "https://urbanaip.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to AIP, paleo, medical diet, and special-diet pages"],
  ["US", "Provenance Meals", "prepared meals", "P2", "active", "gluten-free dairy-free prepared meal delivery and cleanse programs available with no subscription requirement", "https://www.provenancemeals.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to premium wellness prepared-meal and cleanse pages"],
  ["US", "The Cumin Club", "shelf-stable meal kit", "P2", "active", "5-minute Indian vegetarian meal kits delivered as shelf-stable everyday meal packs", "https://www.thecuminclub.com/", "affiliate application", `official_source_checked_${checkedDate}`, "Add to shelf-stable, vegetarian, Indian meal kit, and student dinner pages"],
  ["US", "Tovala", "smart oven meal delivery", "P2", "active", "smart oven plus fresh meal delivery system with scan-to-cook weekly meals and low-prep dinner demand", "https://www.tovala.com/", "affiliate application", `official_and_recent_review_source_checked_${checkedDate}`, "Add to appliance-assisted meal delivery and low-prep dinner pages"],
  ["US", "Proper Good", "shelf-stable meals", "P2", "active", "shelf-stable soups, meals, and quick pantry dinners for convenient healthy eating", "https://eatpropergood.com/", "affiliate application", `official_source_checked_${checkedDate}`, "Add to shelf-stable and pantry dinner pages"],
  ["US", "Haven's Kitchen", "grocery dinner helper", "P3", "active", "sauces and dinner helpers that support fast grocery-dinner decision journeys", "https://havenskitchen.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Account under grocery-dinner helper rather than full meal delivery"],
  ["Canada", "Chefs Plate", "meal kit", "P0", "active", "budget Canadian meal-kit brand with broad national meal-kit demand and affiliate potential", "https://www.chefsplate.com/", "yes", `official_source_checked_${checkedDate}`, "Promote to Canada P0 and compare against HelloFresh Canada"],
  ["Canada", "Goodfood", "meal kit", "P0", "active", "Canadian meal kit and grocery-dinner brand with recipe boxes and national consumer awareness", "https://www.makegoodfood.ca/", "affiliate application", `official_source_checked_${checkedDate}`, "Promote to Canada P0 with business-status freshness checks"],
  ["Canada", "Cook it", "meal kit", "P1", "active", "Quebec and Canada meal-kit brand with recipe boxes and prepared dinner relevance", "https://www.chefcookit.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Quebec and Canada meal-kit comparisons"],
  ["Canada", "Plant Prepped", "plant-based meal kit", "P2", "active", "Canadian plant-based meal-kit brand for vegan and vegetarian dinner planning", "https://plantprepped.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Canada vegan and plant-based meal-kit pages"],
  ["Canada", "Mama Earth", "grocery dinner delivery", "P2", "active", "Canadian organic grocery, produce, and meal-planning delivery brand with dinner basket relevance", "https://www.mamaearth.ca/", "affiliate application", `official_source_checked_${checkedDate}`, "Add to Canada grocery-dinner and organic produce box pages"],
  ["Canada", "SPUD", "grocery dinner delivery", "P2", "active", "Canadian online grocery and organic produce delivery service with dinner-planning relevance", "https://www.spud.ca/", "affiliate application", `official_source_checked_${checkedDate}`, "Add to Canada grocery-dinner comparison pages"],
  ["UK", "Mindful Chef", "meal kit", "P0", "active", "healthy UK recipe box with 28 weekly chef-designed meals plus ready meal/smoothie extensions", "https://www.mindfulchef.com/", "affiliate application", `official_source_checked_${checkedDate}`, "Promote to UK healthy recipe-box anchor and compare against Gousto"],
  ["UK", "Green Chef UK", "meal kit", "P1", "active", "healthy diet-focused UK meal kit for keto, balanced, vegetarian, and lower-carb recipe-box demand", "https://www.greenchef.co.uk/", "yes", `official_source_checked_${checkedDate}`, "Add to UK healthy and diet meal-kit pages"],
  ["UK", "SimplyCook", "recipe kit", "P1", "active", "low-cost UK recipe-kit and flavour-pot subscription for easy grocery-assisted dinners", "https://www.simplycook.com/", "affiliate application", `official_source_checked_${checkedDate}`, "Add to UK cheap recipe-kit and grocery-dinner pages"],
  ["UK", "Pasta Evangelists", "fresh pasta meal kit", "P1", "active", "fresh pasta kit and Italian meal delivery brand with strong UK consumer search demand", "https://pastaevangelists.com/", "affiliate application", `official_source_checked_${checkedDate}`, "Add to UK specialty meal-kit and pasta dinner pages"],
  ["UK", "Planthood", "plant-based meal kit", "P1", "active", "chef-made plant-based whole-food meal kits delivered across the UK and finished at home in minutes", "https://planthood.co.uk/", "direct partnership", `official_source_checked_${checkedDate}`, "Promote to UK vegan and plant-based meal-kit pages"],
  ["UK", "Fuel Hub", "high protein prepared meals", "P1", "active", "UK high-protein calorie-controlled prepared meal delivery with fresh meals ready in minutes", "https://fuelhub.co.uk/", "direct partnership", `official_source_checked_${checkedDate}`, "Promote to UK high-protein prepared meal pages"],
  ["UK", "pREP UK", "high protein prepared meals", "P2", "active", "UK fresh healthy meal prep service focused on gym meals and prepared meals delivered to the door", "https://prepuk.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to UK budget and gym meal-prep pages"],
  ["UK", "PrepKing", "prepared meals", "P2", "active", "UK gourmet meal prep service with nutritionally balanced meals delivered weekly", "https://prepking.co.uk/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to UK challenger meal-prep comparisons"],
  ["UK", "Dishpatch", "restaurant meal kits", "P2", "active", "UK restaurant meal-kit and finish-at-home dinner delivery brand", "https://dishpatch.co.uk/", "affiliate application", `official_source_checked_${checkedDate}`, "Add to UK restaurant meal-kit and premium dinner pages"],
  ["UK", "Foodhak", "prepared meals", "P2", "active", "UK plant-powered prepared meal delivery brand with health and ready-meal demand", "https://www.foodhak.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to UK plant-based prepared meal pages"]
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
      wave: "011",
      waveRows: additions.length,
      rowsInserted: inserted.length,
      rowsUpdated: updated.length,
      countriesTouched: [...new Set(additions.map((row) => row.country))].sort(),
      sourceOfTruth: path.relative(root, brandUniversePath),
      waveCsv: path.relative(root, waveCsvPath),
      note: "Upserts stale high-value US/Canada/UK rows and adds verified long-tail meal-kit, prepared, shelf-stable, AIP, grocery-dinner, and recipe-kit brands."
    },
    null,
    2
  )}\n`
);

console.log(`Wave 011 complete: ${inserted.length} inserted, ${updated.length} updated.`);

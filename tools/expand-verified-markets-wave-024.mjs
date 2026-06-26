import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const brandUniversePath = path.join(root, "seo", "global-brand-universe.csv");
const waveCsvPath = path.join(root, "seo", "verified-expansion-wave-024.csv");
const waveReportPath = path.join(root, "reports", "verified-expansion-wave-024.json");

const checkedDate = "2026-06-24";

const additions = [
  ["US", "Shef", "local chef prepared meals", "P1", "active", "homemade meals delivered weekly from vetted local chefs, positioned as a shared personal-chef alternative", "https://shef.com/", "affiliate application", `official_and_app_source_checked_${checkedDate}`, "Add to local chef and homemade prepared meal pages"],
  ["US", "CookinGenie", "private chef meal prep", "P2", "active", "private-chef marketplace for in-home dining and customized weekly meal prep", "https://cookingenie.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to private chef and meal-prep alternatives pages with service-type caveat"],
  ["US", "WoodSpoon", "local chef prepared meals", "P3", "active_app_route", "local/home-cooked meal delivery app with trusted cooks and app-led ordering", "https://woodspoon.app.link/WoodSpoon", "direct partnership after route check", `app_and_press_source_checked_${checkedDate}`, "Add with app-route caveat"],
  ["US", "Locale", "prepared meals", "P2", "active_region_check", "California regional prepared meal delivery with high-protein, dietary preference, and weekly delivery positioning", "https://www.shoplocale.com/", "direct partnership", `official_and_review_source_checked_${checkedDate}`, "Add to California/regional prepared meal pages with delivery-area caveat"],
  ["US", "Table & Twine", "restaurant prepared meals", "P3", "active_region_check", "chef-driven restaurant-quality prepared meals, entertaining packages, and finish-at-home meals", "https://tableandtwine.com/", "direct partnership", `press_source_checked_${checkedDate}`, "Add to regional restaurant prepared meal pages with route caveat"],
  ["US", "Gardencup", "ready-to-eat salads and bowls", "P1", "active", "fresh ready-to-eat salads, bowls, soups, and snacks delivered nationwide", "https://gardencup.com/", "affiliate application", `official_and_review_source_checked_${checkedDate}`, "Add to ready-to-eat salad, lunch, and healthy prepared meal pages"],
  ["US", "Kencko", "smoothie and produce subscription", "P2", "active", "organic instant smoothie, protein, and fruit/vegetable packets for no-prep nutrition searches", "https://www.kencko.com/", "affiliate application", `official_and_review_source_checked_${checkedDate}`, "Add to smoothie subscription and produce-dinner helper pages"],
  ["US", "Revive Superfoods", "smoothies and prepared foods", "P2", "active_social_check", "Canadian-made smoothie and superfood bowl subscription with ready-in-minutes positioning", "https://revivesuperfoods.com/", "affiliate application", `social_and_secondary_source_checked_${checkedDate}`, "Promote from candidate with active checkout caveat"],
  ["Canada", "Revive Superfoods Canada", "smoothies and prepared foods", "P2", "active_social_check", "Canada smoothie and bowl delivery subscription with chef-crafted nutritionally balanced products", "https://revivesuperfoods.com/", "affiliate application", `social_source_checked_${checkedDate}`, "Promote Canada variant with checkout caveat"],
  ["US", "Little Sesame", "grocery dinner helpers", "P3", "active_retail_check", "organic hummus and snack bundles for grocery dinner shortcut and plant-based pantry searches", "https://www.eatlittlesesame.com/", "retail affiliate", `official_and_retail_source_checked_${checkedDate}`, "Add to plant-based grocery dinner helper pages, not prepared meal rankings"],
  ["US", "Omsom", "meal starter kits", "P2", "active", "shelf-stable Asian meal starter kits and sauces for fast grocery-assisted dinners", "https://www.omsom.com/", "affiliate application", `official_source_checked_${checkedDate}`, "Promote from candidate to meal starter kit pages"],
  ["US", "Goldbelly Meal Kits", "restaurant meal kits", "P2", "active", "restaurant meal kits, prepared food shipments, and iconic regional food delivery marketplace", "https://www.goldbelly.com/meal-kits", "affiliate application", `official_source_checked_${checkedDate}`, "Promote from candidate to restaurant meal-kit pages"],
  ["US", "ButcherBox", "protein box", "P2", "active", "meat and seafood subscription box for freezer and dinner-protein planning", "https://www.butcherbox.com/", "affiliate application", `official_source_checked_${checkedDate}`, "Promote from candidate as protein-box adjacent, not full meal delivery"],
  ["US", "Porter Road", "protein box", "P3", "active", "butcher meat delivery and subscription box for dinner protein planning", "https://porterroad.com/", "affiliate application", `official_source_checked_${checkedDate}`, "Promote from candidate as protein delivery adjacent"],
  ["US", "Good Chop", "protein box", "P3", "active", "meat and seafood subscription box for dinner protein delivery", "https://www.goodchop.com/", "affiliate application", `official_source_checked_${checkedDate}`, "Add to protein box and grocery dinner helper pages"],
  ["US", "Crowd Cow", "protein box", "P3", "active", "meat and seafood delivery marketplace for freezer protein and dinner planning", "https://www.crowdcow.com/", "affiliate application", `official_source_checked_${checkedDate}`, "Add to protein box and meat delivery comparison pages"],
  ["US", "Wild Pastures", "protein box", "P3", "active", "regenerative meat delivery subscription for grocery dinner protein planning", "https://wildpastures.com/", "affiliate application", `official_source_checked_${checkedDate}`, "Add to protein-box adjacent pages"],
  ["US", "Northstar Bison", "protein box", "P3", "active", "grass-fed bison and meat delivery brand for freezer protein and specialty dinner planning", "https://www.northstarbison.com/", "affiliate application", `official_source_checked_${checkedDate}`, "Add as specialty protein delivery adjacent"],
  ["US", "Misfits Market", "grocery dinner delivery", "P2", "active", "online grocery delivery service for produce, pantry, and dinner-planning savings", "https://www.misfitsmarket.com/", "affiliate application", `official_source_checked_${checkedDate}`, "Add to grocery dinner and budget produce pages"],
  ["US", "Imperfect Foods", "grocery dinner delivery", "P3", "brand_family_route", "grocery delivery brand now operating through Misfits Market brand family with residual search demand", "https://www.imperfectfoods.com/", "not primary route", `brand_family_source_checked_${checkedDate}`, "Account for alternatives intent and route toward Misfits Market"],
  ["US", "FarmboxRx", "grocery dinner delivery", "P3", "active_program_check", "produce and healthy grocery box delivery with healthcare/benefit program relevance", "https://www.farmboxrx.com/", "direct partnership after consumer fit check", `official_source_checked_${checkedDate}`, "Add with consumer-route caveat"],
  ["US", "Farm Fresh To You", "produce box", "P2", "active_region_check", "California organic produce box and grocery delivery service for dinner planning", "https://www.farmfreshtoyou.com/", "affiliate application", `official_source_checked_${checkedDate}`, "Add to produce box and grocery dinner pages with regional caveat"],
  ["US", "Full Circle", "produce box", "P3", "active_region_check", "Pacific Northwest organic produce and grocery delivery for dinner planning", "https://www.fullcircle.com/", "affiliate application", `official_source_checked_${checkedDate}`, "Add to regional produce box pages"],
  ["US", "Hungry Harvest", "produce box", "P3", "active_region_check", "rescued produce box delivery and grocery add-ons for budget dinner planning", "https://www.hungryharvest.net/", "affiliate application", `official_source_checked_${checkedDate}`, "Add to budget produce and grocery dinner pages with region caveat"],
  ["US", "Fulton Fish Market", "seafood dinner delivery", "P3", "active", "online seafood delivery marketplace for fresh/frozen dinner protein planning", "https://fultonfishmarket.com/", "affiliate application", `official_source_checked_${checkedDate}`, "Add to seafood dinner delivery and grocery helper pages"]
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
      wave: "024",
      waveRows: additions.length,
      rowsInserted: inserted.length,
      rowsUpdated: updated.length,
      countriesTouched: [...new Set(additions.map((row) => row.country))].sort(),
      sourceOfTruth: path.relative(root, brandUniversePath),
      waveCsv: path.relative(root, waveCsvPath),
      note: "Adds US and Canada local chef meals, ready salad/bowl delivery, smoothie subscriptions, grocery dinner helpers, produce boxes, and protein boxes with precise adjacent-category caveats."
    },
    null,
    2
  )}\n`
);

console.log(`Wave 024 complete: ${inserted.length} inserted, ${updated.length} updated.`);

import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const brandUniversePath = path.join(root, "seo", "global-brand-universe.csv");
const waveCsvPath = path.join(root, "seo", "verified-expansion-wave-025.csv");
const waveReportPath = path.join(root, "reports", "verified-expansion-wave-025.json");

const checkedDate = "2026-06-24";

const additions = [
  ["Canada", "OTR Meals", "prepared meals", "P1", "active", "Toronto healthy chef-prepared meal delivery with nutritionist-designed meals and no-cooking-required positioning", "https://otrmeals.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Canada/Toronto prepared meal pages"],
  ["Canada", "Ever Gourmet", "prepared meals", "P2", "active_region_check", "Toronto/GTA fresh prepared meals with gourmet, vegan, paleo, keto, athlete, and breakfast options", "https://evergourmet.ca/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Canada prepared meal challenger pages with regional caveat"],
  ["Canada", "Fed Fed Fed", "prepared meals", "P2", "active", "Canadian nutrition-focused meal club delivering fresh full-nutrition meals", "https://www.fedfedfed.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Canada nutrition-focused prepared meal pages"],
  ["Canada", "SupperWorks Meals for One", "frozen prepared meals", "P3", "closing_or_limited", "Ontario single-serve frozen prepared meals with closure/availability caveat from current public evidence", "https://supportontariomade.ca/explore-products/supperworks-meals-for-one", "not ready", `closure_and_product_source_checked_${checkedDate}`, "Account for alternatives demand only; do not recommend as active until ordering route is proven"],
  ["US", "Meal Village", "prepared meals", "P2", "active_region_check", "Chicago fresh chef-prepared meals delivered daily and ready to eat after heating", "https://www.mealvillage.com/", "direct partnership", `official_and_app_source_checked_${checkedDate}`, "Add to US regional prepared-meal pages with Chicago caveat"],
  ["UK", "Diced Meal Prep", "high protein meal prep", "P2", "active", "UK fresh chef-prepared high-protein meal prep with burgers, bowls, pastas, staples, and kids meals", "https://dicedmealprep.co.uk/", "direct partnership", `official_and_trust_source_checked_${checkedDate}`, "Add to UK high-protein meal-prep challenger pages"],
  ["US", "Tasty Bite", "shelf-stable meals", "P2", "active", "ready-to-eat Indian meals, bowls, rice, entrees, and sauces for fast pantry dinners", "https://www.tastybite.com/collections/all", "retail affiliate", `official_source_checked_${checkedDate}`, "Add to shelf-stable, Indian, vegetarian, and pantry dinner pages"],
  ["US", "Maya Kaimal", "shelf-stable meals", "P2", "active", "Indian-inspired ready-to-eat meals, dals, sauces, and meal helpers for pantry dinner shortcuts", "https://www.mayakaimal.com/products/", "retail affiliate", `official_source_checked_${checkedDate}`, "Add to shelf-stable Indian meal helper pages"],
  ["US", "A Dozen Cousins", "shelf-stable meals", "P2", "active", "ready-to-eat seasoned beans, rice, and meal sides inspired by Creole, Caribbean, and Latin American recipes", "https://adozencousins.com/", "retail affiliate", `official_and_editorial_source_checked_${checkedDate}`, "Add to shelf-stable bean/rice dinner helper pages"],
  ["US", "Loma Linda", "shelf-stable plant-based meals", "P2", "active", "shelf-stable plant-based meal solution packets and vegan pantry meals", "https://lomalindabrand.com/", "retail affiliate", `official_source_checked_${checkedDate}`, "Add to shelf-stable plant-based meal pages"],
  ["US", "Bachan's", "meal starter kits", "P3", "active", "Japanese barbecue sauces and cooking sauces for fast grocery-assisted dinner searches", "https://bachans.com/", "retail affiliate", `official_source_checked_${checkedDate}`, "Add to meal starter and grocery dinner helper pages"],
  ["US", "Fly By Jing", "meal starter kits", "P3", "active", "Chinese pantry sauces, meal starters, and quick dinner helpers for Asian-inspired home meals", "https://flybyjing.com/", "retail affiliate", `official_source_checked_${checkedDate}`, "Add to meal starter and pantry dinner helper pages"],
  ["US", "Momofuku Goods", "meal starter kits", "P3", "active", "noodles, sauces, and pantry goods for quick restaurant-style dinners at home", "https://shop.momofuku.com/", "retail affiliate", `official_source_checked_${checkedDate}`, "Add to noodle and pantry dinner helper pages"],
  ["US", "Brooklyn Delhi", "meal starter kits", "P3", "active", "Indian simmer sauces, achaar, and pantry products for fast grocery-assisted dinners", "https://brooklyndelhi.com/", "retail affiliate", `official_source_checked_${checkedDate}`, "Add to Indian meal starter pages"],
  ["US", "Diaspora Co.", "grocery dinner helpers", "P3", "active", "single-origin spices and pantry staples for high-intent cooking-at-home dinner helper searches", "https://www.diasporaco.com/", "retail affiliate", `official_source_checked_${checkedDate}`, "Add to premium pantry dinner helper pages, not meal delivery rankings"],
  ["US", "Ipsa Provisions", "frozen prepared meals", "P2", "active_region_check", "small-batch frozen meals, soups, and dinner provisions with regional delivery and retail route", "https://eatipsa.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to frozen prepared meal challenger pages with route caveat"],
  ["US", "Nourish Meals", "prepared meals", "P2", "active_region_check", "regional chef-prepared healthy meals delivered fresh for family and convenience demand", "https://nourishmeals.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to regional prepared meal pages with delivery-area caveat"],
  ["US", "Eat Flavorly", "prepared meals", "P3", "active_region_check", "meal prep and healthy prepared meal candidate for regional convenience searches", "https://eatflavorly.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add with active-route caveat"],
  ["US", "Ice Age Meals", "paleo prepared meals", "P3", "active", "frozen paleo meal delivery with protein-forward freezer meals", "https://iceagemeals.net/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to paleo and frozen prepared meal pages"],
  ["US", "Caveman Chefs", "paleo prepared meals", "P3", "active_region_check", "Colorado paleo meal prep and prepared meal brand with specialty diet positioning", "https://cavemanchefs.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to paleo meal prep pages with regional caveat"],
  ["US", "Truly Good Foods", "snack and pantry box", "P3", "active_b2b_consumer_mixed", "snack and pantry box supplier for healthy convenience searches with consumer-fit caveat", "https://trulygoodfoods.com/", "direct partnership after consumer fit check", `official_source_checked_${checkedDate}`, "Add only to pantry/snack box adjacent pages"],
  ["Canada", "Chef's Plate", "meal kit", "P1", "active", "Canadian meal kit brand with pre-portioned ingredients and recipes from the HelloFresh family", "https://www.chefsplate.com/", "affiliate application", `official_source_checked_${checkedDate}`, "Add to Canada meal-kit comparisons"],
  ["Canada", "MissFresh", "meal kit", "P3", "closed_or_inactive", "Canadian meal-kit brand with historical demand and inactive/watchlist status", "https://www.missfresh.com/", "not ready", `active_status_needs_check_${checkedDate}`, "Use for alternatives intent only until active ordering is proven"],
  ["Canada", "Goodfood Ready-to-Eat", "prepared meals", "P2", "active_route_check", "Goodfood ready-to-eat and prepared meal variant for Canadian convenience searches", "https://www.makegoodfood.ca/", "affiliate application", `official_source_checked_${checkedDate}`, "Promote Canada prepared-meal variant with active product caveat"],
  ["Canada", "Inspired Go Alberta", "ready-to-eat salads and bowls", "P3", "active_region_check", "regional Canadian fresh salad and prepared meal delivery variant for Alberta searches", "https://inspiredgo.ca/", "direct partnership", `official_source_checked_${checkedDate}`, "Promote regional variant with delivery-area caveat"]
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
      wave: "025",
      waveRows: additions.length,
      rowsInserted: inserted.length,
      rowsUpdated: updated.length,
      countriesTouched: [...new Set(additions.map((row) => row.country))].sort(),
      sourceOfTruth: path.relative(root, brandUniversePath),
      waveCsv: path.relative(root, waveCsvPath),
      note: "Adds Canada and US prepared-meal, shelf-stable meal, pantry dinner helper, frozen prepared meal, and meal-kit rows, including active, regional, adjacent, watchlist, and brand-family caveats."
    },
    null,
    2
  )}\n`
);

console.log(`Wave 025 complete: ${inserted.length} inserted, ${updated.length} updated.`);

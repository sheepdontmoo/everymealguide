import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const brandUniversePath = path.join(root, "seo", "global-brand-universe.csv");
const waveCsvPath = path.join(root, "seo", "verified-expansion-wave-026.csv");
const waveReportPath = path.join(root, "reports", "verified-expansion-wave-026.json");

const checkedDate = "2026-06-24";

const additions = [
  ["Ireland", "Clean Cut Meals", "high protein meal prep", "P1", "active", "Ireland healthy ready-made meal prep brand with nationwide delivery and gym/lifestyle demand", "https://cleancutmeals.ie/", "direct partnership", `official_and_review_source_checked_${checkedDate}`, "Add to Ireland high-protein and healthy meal-prep pages"],
  ["Ireland", "DropChef", "meal kit and prepared meals", "P1", "active", "Ireland meal-kit brand with pre-portioned recipe boxes plus prepared Made Fresh options", "https://dropchef.com/", "affiliate application", `official_and_review_source_checked_${checkedDate}`, "Promote to Ireland meal-kit and prepared meal pages"],
  ["Ireland", "GourmetFuel", "prepared meals", "P1", "active_route_check", "Ireland healthy prepared meal delivery brand frequently considered for meal-plan delivery searches", "https://gourmetfuel.com/", "direct partnership", `community_source_checked_${checkedDate}`, "Add with active checkout caveat"],
  ["Ireland", "Eatstro", "meal kit", "P3", "needs_active_check", "Ireland meal-kit candidate with historical consumer discussion and uncertain current activity", "https://eatstro.com/", "verify before monetization", `community_source_checked_${checkedDate}`, "Use for alternatives intent only until active ordering is proven"],
  ["UK", "The Cookaway", "premium meal kit", "P1", "active", "UK premium meal-kit brand for occasion cooking, chef-led kits, and restaurant-at-home demand", "https://www.thecookaway.com/", "affiliate application", `official_source_checked_${checkedDate}`, "Promote from missing priority to active premium meal-kit coverage"],
  ["UK", "Abel & Cole Recipe Boxes", "organic meal kit", "P2", "active", "UK organic recipe boxes and grocery dinner delivery from Abel & Cole", "https://www.abelandcole.co.uk/", "affiliate application", `official_source_checked_${checkedDate}`, "Promote from candidate to organic recipe-box coverage"],
  ["UK", "Oddbox", "produce box", "P2", "active", "UK wonky fruit and veg box delivery brand for budget produce and grocery dinner planning", "https://www.oddbox.co.uk/", "affiliate application", `official_source_checked_${checkedDate}`, "Promote from candidate to produce box coverage"],
  ["UK", "Mindful Chef Ready Meals", "prepared meals", "P2", "active_route_check", "UK prepared meal variant attached to Mindful Chef healthy recipe-box ecosystem", "https://www.mindfulchef.com/", "affiliate application", `official_source_checked_${checkedDate}`, "Promote prepared-meal variant with active product caveat"],
  ["UK", "Tastily", "prepared meals", "P1", "active_route_check", "UK chef-prepared meal delivery candidate with healthy prepared meal demand", "https://www.tastily.co.uk/", "direct partnership", `official_source_checked_${checkedDate}`, "Promote from watchlist with ordering-path caveat"],
  ["UK", "allplants", "frozen plant-based meals", "P2", "active_route_check", "UK plant-based frozen meal brand with strong residual search demand and route needing live checkout check", "https://allplants.com/", "affiliate application", `official_source_checked_${checkedDate}`, "Promote cautiously from watchlist with active-route caveat"],
  ["UK", "Apetito UK", "frozen senior meals", "P2", "active", "UK frozen meal provider for older adults, care settings, and home meal delivery demand", "https://www.apetito.co.uk/", "direct partnership", `trustedcare_and_official_source_checked_${checkedDate}`, "Add to UK senior frozen meal alternatives pages"],
  ["Canada", "Heart to Home Meals Ontario", "frozen senior meals", "P2", "active_region_check", "Ontario senior frozen meal delivery variant from Heart to Home Meals", "https://www.hearttohomemeals.ca/", "direct partnership", `official_source_checked_${checkedDate}`, "Promote regional senior meal variant with delivery-area caveat"],
  ["Canada", "Heart to Home Meals Alberta", "frozen senior meals", "P2", "active_region_check", "Alberta senior frozen meal delivery variant from Heart to Home Meals", "https://www.hearttohomemeals.ca/", "direct partnership", `official_source_checked_${checkedDate}`, "Promote regional senior meal variant with delivery-area caveat"],
  ["Canada", "Power Kitchen Canada Toronto", "high protein meal prep", "P2", "active_region_check", "Toronto macro-balanced prepared meal and fitness meal-prep variant from Power Kitchen", "https://powerkitchen.ca/", "direct partnership", `official_source_checked_${checkedDate}`, "Promote regional variant with delivery-area caveat"],
  ["Canada", "Spud", "grocery dinner delivery", "P2", "active", "Canadian online grocery and organic produce delivery service for dinner planning", "https://www.spud.ca/", "affiliate application", `official_source_checked_${checkedDate}`, "Normalize Canada SPUD route capitalization and add to grocery dinner pages"],
  ["US", "Huel Hot & Savory", "shelf-stable meals", "P1", "active", "complete nutrition hot meal pouches for quick no-prep pantry dinners", "https://huel.com/collections/huel-hot-and-savory", "affiliate application", `official_source_checked_${checkedDate}`, "Add as Huel sub-brand/variant for hot meal replacement searches"],
  ["US", "Soylent Complete Protein", "complete nutrition meal replacement", "P2", "active", "ready-to-drink complete nutrition/protein products for quick meal replacement demand", "https://soylent.com/", "affiliate application", `official_source_checked_${checkedDate}`, "Add as Soylent product-route variant for complete nutrition searches"],
  ["US", "Goodles", "shelf-stable meals", "P3", "active", "protein-forward boxed mac and noodles for quick pantry dinner searches", "https://www.goodles.com/", "retail affiliate", `official_source_checked_${checkedDate}`, "Add to shelf-stable pantry dinner helper pages"],
  ["US", "Banza", "shelf-stable meals", "P3", "active", "chickpea pasta, rice, and pizza products for high-protein pantry dinner helpers", "https://www.eatbanza.com/", "retail affiliate", `official_source_checked_${checkedDate}`, "Add to high-protein pantry dinner helper pages"],
  ["US", "Siete Foods", "grocery dinner helpers", "P3", "active", "grain-free tortillas, sauces, beans, and pantry dinner helpers for grocery-assisted meals", "https://sietefoods.com/", "retail affiliate", `official_source_checked_${checkedDate}`, "Add to grocery dinner helper pages"],
  ["US", "Primal Kitchen Sauces", "grocery dinner helpers", "P3", "active", "paleo/keto sauces, dressings, and pantry shortcuts for healthy dinner planning", "https://www.primalkitchen.com/", "retail affiliate", `official_source_checked_${checkedDate}`, "Add product-route variant for sauce/dinner helper pages"],
  ["US", "Kevin's Natural Foods Sides", "heat and eat meals", "P3", "active", "heat-and-eat sides and meal components from Kevin's Natural Foods for fast dinner construction", "https://www.kevinsnaturalfoods.com/", "retail affiliate", `official_source_checked_${checkedDate}`, "Add side/component variant for heat-and-eat dinner helper pages"],
  ["US", "Maya Kaimal Everyday Dal", "shelf-stable meals", "P3", "active", "ready-to-eat dal and Indian pantry meal packets for fast vegetarian dinners", "https://www.mayakaimal.com/products/", "retail affiliate", `official_source_checked_${checkedDate}`, "Add product-route variant for ready-to-eat Indian meal searches"],
  ["US", "Tasty Bite Protein Bowls", "shelf-stable meals", "P3", "active", "ready-to-eat shelf-stable bowls and Indian meals for quick pantry dinner searches", "https://www.tastybite.com/collections/all", "retail affiliate", `official_source_checked_${checkedDate}`, "Add product-route variant for ready-to-eat bowl searches"],
  ["US", "A Dozen Cousins Rice & Beans", "shelf-stable meals", "P3", "active", "ready-to-eat rice and bean packs for quick Creole, Caribbean, and Latin-inspired dinners", "https://adozencousins.com/", "retail affiliate", `official_source_checked_${checkedDate}`, "Add product-route variant for pantry dinner packs"]
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
      wave: "026",
      waveRows: additions.length,
      rowsInserted: inserted.length,
      rowsUpdated: updated.length,
      countriesTouched: [...new Set(additions.map((row) => row.country))].sort(),
      sourceOfTruth: path.relative(root, brandUniversePath),
      waveCsv: path.relative(root, waveCsvPath),
      note: "Adds Ireland, UK, Canada, and US meal-kit, prepared, senior frozen, shelf-stable, pantry-helper, and product-route variants with active, route-check, regional, and alternatives-only caveats."
    },
    null,
    2
  )}\n`
);

console.log(`Wave 026 complete: ${inserted.length} inserted, ${updated.length} updated.`);

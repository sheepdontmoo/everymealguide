import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const brandUniversePath = path.join(root, "seo", "global-brand-universe.csv");
const waveCsvPath = path.join(root, "seo", "verified-expansion-wave-013.csv");
const waveReportPath = path.join(root, "reports", "verified-expansion-wave-013.json");

const checkedDate = "2026-06-24";

const additions = [
  ["Germany", "Juit", "frozen prepared meals", "P1", "active", "German frozen ready-meal delivery brand with healthy heat-and-eat meals and no-subscription positioning", "https://www.juit.com/en", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Germany frozen prepared meal and healthy ready-meal pages"],
  ["Germany", "Evertaste", "frozen meals", "P2", "active", "German frozen meal brand with ready dishes and convenience dinner relevance", "https://www.evertaste.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Germany frozen meal challenger pages"],
  ["Germany", "Reishunger", "grocery dinner delivery", "P2", "active", "German pantry and meal-kit-style rice/noodle dinner brand with quick meal box relevance", "https://www.reishunger.de/", "affiliate application", `official_source_checked_${checkedDate}`, "Add to Germany grocery-dinner and pantry meal pages"],
  ["Germany", "KoRo", "grocery dinner delivery", "P2", "active", "German online food and pantry brand with healthy grocery-dinner basket relevance", "https://www.korodrogerie.de/", "affiliate application", `official_source_checked_${checkedDate}`, "Add to Germany healthy pantry and grocery-dinner pages"],
  ["Germany", "Just Spices", "grocery dinner helper", "P2", "active", "German recipe spice and dinner-helper brand with easy meal planning and grocery-assisted dinner demand", "https://www.justspices.de/", "affiliate application", `official_source_checked_${checkedDate}`, "Categorize as grocery-dinner helper, not full meal delivery"],
  ["France", "Frichti", "prepared meals", "P2", "active_app_route", "Paris-area app-led prepared food and ready meal delivery brand with prepared lunch/dinner demand", "https://play.google.com/store/apps/details?id=com.frichti.android", "direct partnership after active route check", `app_store_source_checked_${checkedDate}`, "Account for Paris prepared-food demand and verify active web ordering route"],
  ["France", "Foodette", "meal kit", "P2", "active", "French recipe basket and meal-kit brand delivering ingredients and recipes for home cooking", "https://www.foodette.fr/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to France meal-kit challenger pages"],
  ["France", "Popchef", "prepared meals", "P3", "b2b_or_catering_focus", "French prepared food/catering brand with office-lunch relevance but not a standard home meal delivery route", "https://www.popchef.com/", "direct partnership after fit check", `official_source_checked_${checkedDate}`, "Account for B2B/lunch search demand but avoid normal consumer recommendation"],
  ["France", "Rutiz", "prepared meals", "P2", "active", "French fresh prepared meal delivery candidate for healthy ready-meal demand", "https://rutiz.fr/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to France prepared meal challenger pages"],
  ["France", "Jow", "grocery dinner delivery", "P1", "active", "French grocery-dinner planning app that builds recipes and baskets with supermarket partners", "https://jow.fr/", "affiliate application", `official_source_checked_${checkedDate}`, "Add to France grocery-dinner and recipe planning pages"],
  ["Netherlands", "Marley Spoon Netherlands", "meal kit", "P1", "active", "Netherlands Marley Spoon meal-kit route for recipe box comparisons against HelloFresh", "https://marleyspoon.nl/", "affiliate application", `official_source_checked_${checkedDate}`, "Promote to Netherlands meal-kit comparisons"],
  ["Netherlands", "Ekomenu", "organic meal kit", "P2", "active", "Dutch organic and sustainable meal-box brand with vegetarian, vegan, family, and diet recipe options", "https://www.ekomenu.nl/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Netherlands organic and vegan meal-kit pages"],
  ["Netherlands", "Boerschappen", "grocery dinner delivery", "P2", "active", "Dutch local grocery/meal-box brand with fresh regional ingredients and recipe-box relevance", "https://www.boerschappen.nl/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Netherlands grocery-dinner and local produce pages"],
  ["Netherlands", "Crisp", "grocery dinner delivery", "P1", "active", "Dutch fresh online supermarket with recipes and dinner-planning relevance", "https://www.crisp.nl/", "affiliate application", `official_source_checked_${checkedDate}`, "Add to Netherlands grocery-dinner pages"],
  ["Netherlands", "Maaltijdservice.nl", "senior prepared meals", "P2", "active", "Dutch meal service marketplace for prepared meals at home, including senior and easy dinner use cases", "https://www.maaltijdservice.nl/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Netherlands senior meal and prepared meal pages"],
  ["Belgium", "Smartmat", "meal kit", "P2", "active", "Belgian meal-box brand with weekly recipes and ingredients for home cooking", "https://www.smartmat.be/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Belgium meal-kit challenger pages"],
  ["Belgium", "15gram", "meal kit", "P2", "active", "Belgian meal box and recipe planning brand with grocery-dinner relevance", "https://15gram.be/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Belgium recipe-box and meal-kit pages"],
  ["Belgium", "Foodmaker", "prepared meals", "P2", "active", "Belgian healthy prepared meal and salad brand with retail and ready-meal relevance", "https://www.foodmaker.be/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Belgium healthy prepared-meal pages"],
  ["Belgium", "Oh My Guts", "diet prepared meals", "P3", "active", "Belgian gut-health and low-FODMAP friendly prepared meal candidate", "https://ohmyguts.be/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Belgium special-diet meal pages"],
  ["Italy", "Quomi", "meal kit", "P2", "needs_active_check", "Italian recipe-box brand historically associated with meal kits; current active consumer route needs confirmation", "https://www.quomi.it/", "verify before monetization", `official_route_needs_check_${checkedDate}`, "Account for Italy meal-kit search demand but do not recommend until active checkout is confirmed"],
  ["Italy", "MiCibo", "prepared meals", "P2", "active", "Italian healthy prepared meal and diet food delivery candidate", "https://www.micibo.it/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Italy prepared meal challenger pages"],
  ["Italy", "Cortilia", "grocery dinner delivery", "P1", "active", "Italian online grocery and fresh food delivery brand with meal-planning relevance", "https://www.cortilia.it/", "affiliate application", `official_source_checked_${checkedDate}`, "Add to Italy grocery-dinner pages"],
  ["Italy", "FrescoFrigo", "prepared meals", "P3", "b2b_or_office_focus", "Italian smart-fridge and ready-meal workplace food service with prepared-meal relevance but not normal DTC checkout", "https://www.frescofrigo.it/", "direct partnership after fit check", `official_source_checked_${checkedDate}`, "Account for office prepared-meal demand but separate from consumer rankings"],
  ["Spain", "Nootric", "diet prepared meals", "P2", "active", "Spanish nutrition and diet meal-plan brand with healthy prepared meal delivery relevance", "https://www.nootric.es/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Spain diet meal and weight-loss pages"],
  ["Spain", "MyRealFood", "grocery dinner delivery", "P2", "active", "Spanish healthy eating app and real-food grocery/dinner planning brand with consumer meal planning demand", "https://myrealfood.app/", "affiliate application", `official_source_checked_${checkedDate}`, "Add to Spain grocery-dinner and healthy meal planning pages"],
  ["Spain", "ComeFruta", "grocery dinner delivery", "P3", "active", "Spanish fruit and produce delivery brand with grocery-dinner and healthy basket relevance", "https://comefruta.es/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Spain produce and grocery-dinner pages"],
  ["Sweden", "Middagsfrid", "meal kit", "P2", "active", "Swedish meal-kit brand with dinner box and recipe planning demand", "https://www.middagsfrid.se/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Sweden meal-kit challenger pages"],
  ["Sweden", "Mathem", "grocery dinner delivery", "P1", "active", "Swedish online grocery delivery brand with recipe and dinner-planning relevance", "https://www.mathem.se/", "affiliate application", `official_source_checked_${checkedDate}`, "Add to Sweden grocery-dinner pages"],
  ["Denmark", "Skagenfood", "meal kit", "P2", "active", "Danish meal-box and fish/seafood dinner delivery brand with recipe-box relevance", "https://skagenfood.dk/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Denmark seafood and meal-kit pages"],
  ["Norway", "Morgenlevering", "grocery dinner delivery", "P2", "active", "Norwegian breakfast and grocery delivery brand with easy-meal and local delivery relevance", "https://morgenlevering.no/", "affiliate application", `official_source_checked_${checkedDate}`, "Add to Norway grocery-dinner and local delivery pages"],
  ["Switzerland", "Farmy", "grocery dinner delivery", "P1", "active", "Swiss online market and grocery delivery brand with recipe and fresh dinner basket relevance", "https://www.farmy.ch/", "affiliate application", `official_source_checked_${checkedDate}`, "Add to Switzerland grocery-dinner pages"],
  ["Switzerland", "Betty Bossi", "meal kit", "P2", "active", "Swiss recipe, meal-planning, and cooking brand with meal-kit/dinner-helper relevance", "https://www.bettybossi.ch/", "affiliate application", `official_source_checked_${checkedDate}`, "Add to Switzerland recipe-kit and dinner helper pages"]
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
      wave: "013",
      waveRows: additions.length,
      rowsInserted: inserted.length,
      rowsUpdated: updated.length,
      countriesTouched: [...new Set(additions.map((row) => row.country))].sort(),
      sourceOfTruth: path.relative(root, brandUniversePath),
      waveCsv: path.relative(root, waveCsvPath),
      note: "Europe-heavy wave adding prepared, frozen, grocery-dinner, meal-kit, recipe-helper, and senior meal brands with explicit caveats for B2B, app-only, or active-check rows."
    },
    null,
    2
  )}\n`
);

console.log(`Wave 013 complete: ${inserted.length} inserted, ${updated.length} updated.`);

import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const brandUniversePath = path.join(root, "seo", "global-brand-universe.csv");
const waveCsvPath = path.join(root, "seo", "verified-expansion-wave-020.csv");
const waveReportPath = path.join(root, "reports", "verified-expansion-wave-020.json");

const checkedDate = "2026-06-24";

const additions = [
  ["UK", "Charlie Bigham's", "premium ready meals", "P1", "active", "premium UK ready-meal brand with oven-ready curries, pies, fish dishes, and restaurant-at-home demand", "https://www.charliebighams.com/", "retail affiliate", `official_and_news_source_checked_${checkedDate}`, "Promote from candidate to UK premium ready-meal pages"],
  ["UK", "Kirsty's", "free-from ready meals", "P2", "active", "UK gluten-free, dairy-free, wheat-free, and allergy-friendly ready meal brand", "https://kirstys.co.uk/", "retail affiliate", `official_and_social_source_checked_${checkedDate}`, "Add to UK free-from and allergy-friendly ready meal pages"],
  ["UK", "M&S Cook Menu", "grocery ready meals", "P1", "active", "Marks and Spencer ready-to-cook and ready-meal range for mainstream grocery dinner demand", "https://www.marksandspencer.com/food/l/ready-to-cook", "retail affiliate", `official_source_checked_${checkedDate}`, "Add to UK supermarket dinner shortcut pages"],
  ["UK", "Waitrose Ready Meals", "grocery ready meals", "P2", "active_region_check", "Waitrose ready meal and premium grocery dinner range for UK/expat grocery delivery comparisons", "https://www.waitrose.com/ecom/shop/browse/groceries/fresh_and_chilled/ready_meals", "retail affiliate", `official_and_retail_source_checked_${checkedDate}`, "Add with retailer availability caveat"],
  ["UK", "Calo UK", "prepared meals", "P1", "active", "personalised healthy meal delivery brand expanding in the UK after acquiring Fresh Fitness Food and Detox Kitchen", "https://calo.app/en", "direct partnership", `official_and_news_source_checked_${checkedDate}`, "Add to UK healthy prepared-meal and Frive comparison pages"],
  ["UK", "Fresh Fitness Food", "prepared meals", "P2", "rebranded_to_calo", "UK bespoke nutrition and ready-to-eat meal delivery brand now moved under Calo", "https://www.freshfitnessfood.com/", "not ready", `rebrand_source_checked_${checkedDate}`, "Use for alternatives and migration context; route active users to Calo UK"],
  ["UK", "Tweakd", "performance prepared meals", "P3", "active_social_check", "UK performance nutrition prepared meal brand for athlete and tailored-meal searches", "https://tweakd.uk/", "direct partnership after checkout check", `social_and_review_source_checked_${checkedDate}`, "Add with active checkout caveat"],
  ["US", "Nutrition Solutions", "high protein meal prep", "P2", "active", "protein-packed meal prep service with weekly menu and performance-nutrition positioning", "https://nutritionsolutions.com/menu/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to US athlete meal-prep challenger pages"],
  ["US", "Snap Kitchen", "prepared meals", "P2", "active_app_route", "healthy chef-prepared meals with Texas demand and app/store ordering evidence", "https://snapkitchen.com/", "direct partnership after route check", `app_and_social_source_checked_${checkedDate}`, "Add with app-route and regional footprint caveat"],
  ["US", "Fitlife Foods", "prepared meals", "P2", "active_region_check", "healthy prepared meal pickup and delivery brand with Florida and Georgia footprint", "https://eatfitlifefoods.com/", "direct partnership", `official_and_social_source_checked_${checkedDate}`, "Promote from candidate with regional availability caveat"],
  ["US", "ProMeals", "prepared meals", "P3", "active_region_check", "regional ready-to-eat meal prep brand with Houston/Texas search demand", "https://mypromeals.com/", "direct partnership", `social_source_checked_${checkedDate}`, "Promote from candidate with regional caveat"],
  ["US", "Healthy For Life Meals", "diet prepared meals", "P3", "active", "chef-prepared calorie-controlled meals for weight-loss, GLP-1 support, and healthy prepared-meal search demand", "https://www.healthyforlifemeals.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to GLP-1 support and calorie-controlled prepared meal pages"],
  ["US", "Eat Clean To Go", "prepared meals", "P3", "active", "fully prepared chef-cooked fresh meals with quick heat-and-eat positioning", "https://eatcleantogo.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to US value prepared-meal challenger pages"],
  ["Canada", "M&M Food Market", "frozen prepared meals", "P1", "active", "Canadian frozen prepared meal retailer with broad family dinner and freezer meal demand", "https://www.mmfoodmarket.com/categories/prepared-meals", "retail affiliate", `official_source_checked_${checkedDate}`, "Add to Canada frozen prepared meal and family dinner pages"],
  ["Canada", "Ethey", "prepared meals", "P2", "active", "fresh cooked-to-order prepared meals shipped ready to heat in Canada", "https://pgs.ethey.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Promote from candidate to Canada prepared meal pages"],
  ["Canada", "Factor Meals Canada", "prepared meals", "P1", "active", "chef-prepared ready-to-eat meals delivered weekly across eligible Canadian regions", "https://www.factormeals.ca/", "yes", `official_source_checked_${checkedDate}`, "Add as Canada-specific Factor route distinct from old landing page"],
  ["Australia", "Gourmet Dinner Service", "prepared meals", "P2", "active", "Australian chef-made prepared meal home delivery with large review volume and family dinner relevance", "https://www.gourmetdinnerservice.com.au/", "direct partnership", `official_source_checked_${checkedDate}`, "Promote from candidate to Australia prepared meal pages"],
  ["Australia", "Aussie Muscle Meals", "high protein meal prep", "P3", "active_route_check", "Australian fitness meal prep candidate for high-protein and gym meal searches", "https://aussiemusclemeals.com.au/", "direct partnership", `official_source_checked_${checkedDate}`, "Promote from candidate with route caveat"],
  ["Australia", "Nourish'd", "prepared meals", "P2", "active", "Australian fully prepared meal service referenced in current prepared meal delivery comparisons", "https://nourishd.com.au/", "direct partnership", `official_and_review_source_checked_${checkedDate}`, "Add to Australia prepared and healthy meal pages"],
  ["Australia", "Providoor", "prepared meals", "P3", "active", "Australian prepared meal and restaurant-at-home service with fully prepared meal positioning", "https://providoor.com/", "direct partnership", `official_and_review_source_checked_${checkedDate}`, "Add to Australia premium prepared dinner pages"]
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
      wave: "020",
      waveRows: additions.length,
      rowsInserted: inserted.length,
      rowsUpdated: updated.length,
      countriesTouched: [...new Set(additions.map((row) => row.country))].sort(),
      sourceOfTruth: path.relative(root, brandUniversePath),
      waveCsv: path.relative(root, waveCsvPath),
      note: "Promotes candidate prepared-meal rows and adds UK, US, Canada, and Australia grocery, premium ready-meal, performance meal-prep, frozen, and diet prepared-meal coverage."
    },
    null,
    2
  )}\n`
);

console.log(`Wave 020 complete: ${inserted.length} inserted, ${updated.length} updated.`);

import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const brandUniversePath = path.join(root, "seo", "global-brand-universe.csv");
const waveCsvPath = path.join(root, "seo", "verified-expansion-wave-018.csv");
const waveReportPath = path.join(root, "reports", "verified-expansion-wave-018.json");

const checkedDate = "2026-06-24";

const additions = [
  ["Global", "Huel", "complete nutrition meal replacement", "P1", "active", "complete nutrition powders, ready-to-drink meals, bars, and hot savoury meals for no-cook meal replacement demand", "https://huel.com/", "affiliate application", `official_source_checked_${checkedDate}`, "Add to complete-nutrition and no-cook meal replacement pages without positioning as cooked dinner delivery"],
  ["US", "Soylent", "complete nutrition meal replacement", "P1", "active", "shelf-stable complete meal shakes, powders, and drinks for quick no-prep meal replacement demand", "https://soylent.com/collections/meal-replacements", "affiliate application", `official_source_checked_${checkedDate}`, "Add to US complete meal replacement comparisons"],
  ["Global", "Jimmy Joy", "complete nutrition meal replacement", "P2", "active", "Plenny complete shakes, bars, and pots for budget-friendly complete food search demand", "https://jimmyjoy.com/", "affiliate application", `official_source_checked_${checkedDate}`, "Add to complete-food and cheap meal replacement pages"],
  ["Europe", "yfood", "complete nutrition meal replacement", "P2", "active", "ready-to-drink complete meal brand with European and UK consumer demand", "https://yfood.com/en", "affiliate application", `official_source_checked_${checkedDate}`, "Add to ready-to-drink complete meal pages"],
  ["Europe", "Mana", "complete nutrition meal replacement", "P2", "active", "complete meal powder, ready-to-drink ManaDrink, and bar brand for European complete-food searches", "https://drinkmana.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to complete nutrition challenger pages"],
  ["Europe", "Queal", "complete nutrition meal replacement", "P3", "active", "nutritionally complete shakes and complete meals positioned for fast smart nutrition", "https://queal.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to complete-food alternatives pages"],
  ["Europe", "Saturo", "complete nutrition meal replacement", "P3", "active", "ready-to-drink complete meal with high-protein and vegan positioning", "https://saturo.com/en-us", "direct partnership", `official_source_checked_${checkedDate}`, "Add to ready-to-drink meal replacement comparisons"],
  ["Global", "Ambronite", "complete nutrition meal replacement", "P3", "closed_or_inactive", "historical whole-food meal shake brand; official product page says the company closed its doors", "https://ambronite.com/products/complete-meal-shake-new.html", "not ready", `closure_source_checked_${checkedDate}`, "Account for alternatives search demand only; do not recommend as active"],
  ["Europe", "Bertrand", "complete nutrition meal replacement", "P3", "active", "organic drinkable meal and complete nutrition powder brand for clean-label meal replacement searches", "https://bertrand.bio/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to organic meal replacement challenger pages"],
  ["Europe", "Jake", "complete nutrition meal replacement", "P3", "active_marketplace_check", "complete vegan shake brand with current marketplace and social evidence but official checkout needs recheck", "https://jakefood.com/", "verify before monetization", `marketplace_source_checked_${checkedDate}`, "List with active-route caveat until official checkout is verified"],
  ["France", "Feed", "complete nutrition meal replacement", "P3", "active_retail_check", "French complete meal bar and shake brand with retail evidence for meal replacement demand", "https://www.feed.co/", "verify before monetization", `retail_source_checked_${checkedDate}`, "Add as French complete-food candidate with checkout caveat"],
  ["Europe", "Runtime", "complete nutrition meal replacement", "P3", "needs_active_check", "gaming and creator-focused meal replacement powder with historical search demand", "https://runtime.gg/", "verify before monetization", `third_party_source_checked_${checkedDate}`, "Use only for alternatives pages until active checkout is verified"],
  ["US", "Seattle Sutton's Healthy Eating", "diet prepared meals", "P2", "active", "fresh ready-to-eat dietitian-designed meal plans for weight-management prepared meal demand", "https://www.seattlesutton.com/", "direct partnership", `official_and_partner_source_checked_${checkedDate}`, "Promote from candidate to active US diet prepared meal pages"],
  ["US", "Personal Trainer Food", "diet prepared meals", "P3", "active_route_check", "weight-loss meal plan brand for low-carb prepared meal and diet plan search demand", "https://personaltrainerfood.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Promote from candidate with checkout and plan caveat"],
  ["US", "Serenity Kids", "kids and baby meals", "P2", "active", "baby and toddler food brand with subscription and subscribe-to-save route for parent meal-search demand", "https://myserenitykids.com/", "affiliate application", `official_source_checked_${checkedDate}`, "Promote from candidate to baby food subscription pages"],
  ["US", "Once Upon a Farm", "kids and baby meals", "P2", "active", "organic baby and kids pouches, snacks, and subscription box route for parent food delivery searches", "https://onceuponafarmorganics.com/", "affiliate application", `official_source_checked_${checkedDate}`, "Promote from candidate to kids and baby food pages"],
  ["US", "Cerebelly", "kids and baby meals", "P2", "active", "brain-supporting baby and toddler pouch brand with subscription and retail availability", "https://cerebelly.com/", "affiliate application", `official_source_checked_${checkedDate}`, "Promote from candidate to baby and toddler food pages"],
  ["US", "Yumble", "kids meals", "P3", "needs_active_check", "kids prepared meal delivery brand with historical search demand and uncertain current checkout state", "https://yumblekids.com/", "verify before monetization", `active_status_needs_check_${checkedDate}`, "Create alternatives intent only until active ordering is proven"],
  ["US", "OPTAVIA", "diet meal replacement", "P2", "active", "structured weight-loss fuelings and meal replacements for diet meal-plan comparison demand", "https://www.optavia.com/us/en/shop/plans/weight-loss/c/meal-replacement", "affiliate application", `official_source_checked_${checkedDate}`, "Add to weight-loss meal replacement pages with medical/legal caveats"],
  ["US", "Hers Meal Replacement", "diet meal replacement", "P3", "active", "women-focused weight-loss meal replacement shake plan tied to high-intent diet searches", "https://www.forhers.com/weight-loss/meal-replacement", "affiliate application", `official_source_checked_${checkedDate}`, "Add to diet meal replacement pages with clear health disclaimer"],
  ["Canada", "CookUnity Canada", "prepared meals", "P1", "active_postal_check", "chef-made prepared meals route for Canada; verify postal-code coverage before strong ranking claims", "https://www.cookunity.com/en-ca", "affiliate application", `official_source_checked_${checkedDate}`, "Promote from missing priority to route-ready Canadian prepared meal coverage"]
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
      wave: "018",
      waveRows: additions.length,
      rowsInserted: inserted.length,
      rowsUpdated: updated.length,
      countriesTouched: [...new Set(additions.map((row) => row.country))].sort(),
      sourceOfTruth: path.relative(root, brandUniversePath),
      waveCsv: path.relative(root, waveCsvPath),
      note: "Adds complete-nutrition meal replacement, baby/kids food, diet meal replacement, and Canadian prepared meal coverage with active, route-check, inactive, and monetization caveats."
    },
    null,
    2
  )}\n`
);

console.log(`Wave 018 complete: ${inserted.length} inserted, ${updated.length} updated.`);

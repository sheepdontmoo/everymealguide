import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const brandUniversePath = path.join(root, "seo", "global-brand-universe.csv");
const waveCsvPath = path.join(root, "seo", "verified-expansion-wave-021.csv");
const waveReportPath = path.join(root, "reports", "verified-expansion-wave-021.json");

const checkedDate = "2026-06-24";

const additions = [
  ["Germany", "Every. Food", "frozen plant-based meals", "P2", "active", "German frozen plant-based bowls, smoothies, and ready meals for healthy frozen dinner demand", "https://every-foods.com/", "affiliate application", `official_source_checked_${checkedDate}`, "Add to Germany plant-based frozen meal pages"],
  ["Germany", "Hofmanns", "frozen prepared meals", "P2", "active", "German frozen meal delivery and workplace/home ready-meal brand with classic prepared dishes", "https://www.hofmanns.de/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Germany frozen prepared-meal challenger pages"],
  ["Germany", "EveryFitDay", "diet prepared meals", "P3", "active_region_check", "German diet catering and freshly prepared daily meal delivery candidate", "https://everyfitday.de/en/", "direct partnership", `official_source_checked_${checkedDate}`, "Add with delivery-area caveat"],
  ["France", "FoodChéri", "prepared meals", "P2", "active_b2b_consumer_mixed", "French chef-prepared meal delivery brand connected to Seazon and office/home meal demand", "https://www.foodcheri.com/", "direct partnership after consumer-route check", `news_and_brand_source_checked_${checkedDate}`, "Account for France prepared-meal demand with B2B/consumer caveat"],
  ["France", "Rutabago", "organic meal kit", "P2", "active", "French organic recipe basket and meal-kit brand for sustainable home-cooking demand", "https://www.rutabago.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to France organic meal-kit pages"],
  ["France", "Cuisinery", "frozen prepared meals", "P3", "active_us_route", "French-style frozen ready meals and gourmet grocery delivery brand with US route", "https://www.cuisineryfoodmarket.com/", "affiliate application", `official_and_editorial_source_checked_${checkedDate}`, "Add as French cuisine frozen meal option with US route caveat"],
  ["France", "Frichti", "prepared meals", "P3", "closed_or_inactive", "historical French prepared-meal and grocery delivery brand with alternatives search demand", "https://www.frichti.co/", "not ready", `active_status_needs_check_${checkedDate}`, "Use only for alternatives pages until active consumer route is proven"],
  ["Netherlands", "Vegan Masters", "frozen plant-based meals", "P2", "active", "Dutch plant-based frozen ready-meal delivery brand for vegan prepared-meal demand", "https://veganmasters.nl/", "direct partnership", `third_party_and_official_source_checked_${checkedDate}`, "Add to Netherlands vegan prepared-meal pages"],
  ["Netherlands", "MealHero Netherlands", "frozen prepared meals", "P3", "active_region_check", "ready meal and frozen ingredient/meal solution mentioned in Dutch healthy meal delivery lists", "https://mealhero.me/", "direct partnership after active-route check", `third_party_source_checked_${checkedDate}`, "Add with active-route caveat"],
  ["Netherlands", "MarleenKookt", "prepared meals", "P3", "active_region_check", "Dutch home-cooked prepared meal delivery candidate for Amsterdam/Netherlands demand", "https://www.marleenkookt.nl/", "direct partnership", `third_party_source_checked_${checkedDate}`, "Add with regional caveat"],
  ["Spain", "Tappers", "prepared meals", "P2", "active", "Spanish prepared meal delivery brand for fresh heat-and-eat weekly meals", "https://tappers.es/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Spain prepared meal challenger pages"],
  ["Spain", "NoCocinoMas", "prepared meals", "P3", "active_region_check", "Spanish homemade prepared meal delivery candidate for Madrid/local dinner searches", "https://www.nococinomas.es/", "direct partnership", `official_source_checked_${checkedDate}`, "Add with local availability caveat"],
  ["Spain", "Take Eat Easy Spain", "prepared meals", "P3", "active_region_check", "Spanish healthy prepared meal and menu delivery candidate", "https://takeateasy.es/", "direct partnership", `official_source_checked_${checkedDate}`, "Add with route check caveat"],
  ["Italy", "Dieta Chef", "diet prepared meals", "P2", "active", "Italian diet meal delivery and prepared meal-plan brand for weight-loss searches", "https://www.dietachef.it/", "affiliate application", `official_source_checked_${checkedDate}`, "Add to Italy diet prepared-meal pages"],
  ["Italy", "Quomi", "meal kit", "P3", "closed_or_inactive", "historical Italian meal-kit brand with alternatives search demand", "https://www.quomi.it/", "not ready", `active_status_needs_check_${checkedDate}`, "Use for alternatives pages only unless active ordering returns"],
  ["Italy", "SecondChef", "meal kit", "P3", "active_region_check", "Italian recipe-kit and dinner box candidate with local availability to verify", "https://www.secondchef.it/", "direct partnership", `official_source_checked_${checkedDate}`, "Add with delivery-area caveat"],
  ["Sweden", "Middagsfrid", "meal kit", "P3", "closed_or_referred", "Swedish meal-kit pioneer closed by Axfood with customers referred to Linas Matkasse", "https://www.middagsfrid.se/", "not ready", `closure_source_checked_${checkedDate}`, "Use for alternatives and history pages; route users to Linas Matkasse"],
  ["Sweden", "Mealprep.se", "high protein meal prep", "P3", "active_region_check", "Swedish performance meal-prep candidate for prepared fitness meal searches", "https://mealprep.se/", "direct partnership", `community_source_checked_${checkedDate}`, "Add with active route and delivery-area caveat"],
  ["Denmark", "HelloFresh Denmark", "meal kit", "P1", "active", "large Danish meal-kit route from HelloFresh for comparison and incumbent coverage", "https://www.hellofresh.dk/", "yes", `official_source_checked_${checkedDate}`, "Add Denmark-specific HelloFresh route for local comparison pages"],
  ["Norway", "HelloFresh Norway", "meal kit", "P1", "active", "Norwegian HelloFresh meal-kit route for incumbent local comparisons", "https://www.hellofresh.no/", "yes", `official_source_checked_${checkedDate}`, "Add Norway-specific HelloFresh route"],
  ["Finland", "Ruokaboksi", "meal kit", "P1", "active_app_route", "Finnish meal box delivering weekly recipes, ingredients, and cooking instructions near major cities", "https://www.ruokaboksi.fi/", "direct partnership", `app_and_case_study_source_checked_${checkedDate}`, "Add to Finland meal-kit pages with delivery-area caveat"],
  ["Finland", "Menumat", "frozen prepared meals", "P2", "active", "Finnish chef-made frozen home-style meals for older adult and easy dinner demand", "https://menumat.fi/en/front-page/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Finland frozen prepared-meal pages"],
  ["New Zealand", "Jess's Underground Kitchen", "frozen prepared meals", "P1", "active", "New Zealand premium ready-to-eat frozen meals, care packages, and gift hampers with nationwide delivery evidence", "https://www.juk.co.nz/", "direct partnership", `official_and_social_source_checked_${checkedDate}`, "Add to New Zealand frozen prepared meal anchor pages"],
  ["New Zealand", "Muscle Fuel", "high protein meal prep", "P2", "active_region_check", "New Zealand fitness meal prep candidate with high-protein and athlete demand", "https://www.musclefuel.co.nz/", "direct partnership", `community_source_checked_${checkedDate}`, "Add with active delivery caveat"],
  ["New Zealand", "Fitfood NZ", "prepared meals", "P1", "active", "New Zealand healthy ready-made meals with portion-controlled, nutritionally balanced heat-and-eat positioning", "https://www.fitfood.co.nz/", "direct partnership", `official_source_checked_${checkedDate}`, "Promote New Zealand Fitfood route if duplicate variant exists"]
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
      wave: "021",
      waveRows: additions.length,
      rowsInserted: inserted.length,
      rowsUpdated: updated.length,
      countriesTouched: [...new Set(additions.map((row) => row.country))].sort(),
      sourceOfTruth: path.relative(root, brandUniversePath),
      waveCsv: path.relative(root, waveCsvPath),
      note: "Adds priority-market brands across Germany, France, Netherlands, Spain, Italy, Sweden, Denmark, Norway, Finland, and New Zealand, including active, regional, app-route, rebrand, and inactive alternatives caveats."
    },
    null,
    2
  )}\n`
);

console.log(`Wave 021 complete: ${inserted.length} inserted, ${updated.length} updated.`);

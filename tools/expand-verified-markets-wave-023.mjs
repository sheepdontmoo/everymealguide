import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const brandUniversePath = path.join(root, "seo", "global-brand-universe.csv");
const waveCsvPath = path.join(root, "seo", "verified-expansion-wave-023.csv");
const waveReportPath = path.join(root, "reports", "verified-expansion-wave-023.json");

const checkedDate = "2026-06-24";

const additions = [
  ["Nigeria", "Fresh Meal Prep Nigeria", "high protein meal prep", "P1", "active", "Nigeria healthy prepared meal delivery with chef-prepared portioned meals delivered ready to reheat", "https://thefreshmealprep.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add as Nigeria high-protein and healthy meal-prep anchor"],
  ["Nigeria", "Nourie", "prepared meals", "P1", "active_app_route", "Abuja cloud kitchen and meal pre-order app with weekly and monthly meal plan positioning", "https://www.eatnourie.com/", "direct partnership", `official_and_app_source_checked_${checkedDate}`, "Add to Nigeria prepared meal and weekly meal-plan pages with app-route caveat"],
  ["Kenya", "Olive and Basil Kenya", "plant-based prepared meals", "P1", "active", "Nairobi plant-based meal subscription and delivery brand with vegan and vegetarian prepared meals", "https://oliveandbasil.co.ke/", "direct partnership", `official_source_checked_${checkedDate}`, "Add as Kenya plant-based meal delivery anchor"],
  ["Kenya", "Food Affair Kenya", "prepared meals", "P3", "active_social_check", "Kenyan pre-portioned meal pack and healthy food candidate with social evidence", "https://www.instagram.com/thefoodaffairkenya/", "direct partnership after route check", `social_source_checked_${checkedDate}`, "Add with social-route caveat until official checkout is verified"],
  ["South Africa", "BexTheChef", "frozen prepared meals", "P2", "active_region_check", "Johannesburg meal delivery and frozen meal brand with fresh meals and freezer-stock options", "https://bexthechef.co.za/", "direct partnership", `official_and_social_source_checked_${checkedDate}`, "Add to South Africa frozen prepared meal challenger pages"],
  ["South Africa", "Safari Eatz", "high protein meal prep", "P3", "active_region_check", "South African meal-prep candidate with heat-and-eat healthy meals and weekly ordering", "https://safarieatz.com/meal-prep/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to South Africa high-protein meal-prep pages with region caveat"],
  ["Philippines", "The Hearty Grub", "diet prepared meals", "P1", "active_region_check", "Philippines chef-designed and nutritionist-approved meal delivery with packages and customized meal plans", "https://www.theheartygrubph.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add as Philippines healthy meal-plan anchor with coverage-area caveat"],
  ["Philippines", "Nuthera", "diet prepared meals", "P2", "active_region_check", "Philippines healthy meal plan delivery service referenced in current Metro Manila meal-plan guides", "https://nuthera.ph/", "direct partnership", `third_party_and_official_source_checked_${checkedDate}`, "Add to Philippines diet meal challenger pages"],
  ["Philippines", "Fit Kitchen PH", "high protein meal prep", "P2", "active_region_check", "Philippines fitness and healthy meal delivery candidate referenced in current healthy meal-plan guides", "https://www.fitkitchenph.com/", "direct partnership", `third_party_and_official_source_checked_${checkedDate}`, "Add to Philippines fitness meal-prep pages with route caveat"],
  ["India", "FreshMenu", "prepared meals", "P1", "active_app_route", "India chef-curated food delivery app covering Bangalore, Mumbai, Gurgaon, and Delhi for meal subscription and quick prepared meal demand", "https://play.google.com/store/apps/details?id=com.freshmenu", "direct partnership after active route check", `app_source_checked_${checkedDate}`, "Add to India prepared meal app pages with app-route caveat"],
  ["India", "Sprink", "meal subscription", "P1", "active", "India home-style daily meal subscription for offices, campuses, and homes with fresh meals and monthly plans", "https://www.sprink.online/", "direct partnership", `official_source_checked_${checkedDate}`, "Add as India daily meal subscription anchor"],
  ["India", "Fitmeals India", "diet prepared meals", "P2", "active_region_check", "Hyderabad healthy meal-plan subscription with weight-loss, healthy, and muscle-building meal plans", "https://www.fitmeals.co.in/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to India regional diet prepared meal pages"],
  ["India", "Zomato Healthy Subscriptions", "healthy meal subscription", "P1", "active_app_feature", "Zomato app healthy subscription feature for planned lunch or dinner meals in Delhi, Mumbai, and Bengaluru", "https://www.zomato.com/", "platform partnership after launch", `news_source_checked_${checkedDate}`, "Account for India platform-led healthy subscription demand with app-feature caveat"],
  ["India", "Fitelo", "diet meal planning", "P3", "active_app_route", "India weight-loss and diet app with personalized diet plans and nutrition coaches, adjacent to diet meal planning searches", "https://play.google.com/store/apps/details?id=com.fitelo.android", "not primary meal delivery", `app_source_checked_${checkedDate}`, "Use only for diet-planning adjacent pages, not prepared meal delivery recommendations"],
  ["Indonesia", "YellowFit Kitchen", "diet prepared meals", "P1", "active", "Indonesia healthy diet catering and meal plan brand with ready-to-eat diet meals", "https://yellowfitkitchen.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add as Indonesia diet prepared meal anchor"],
  ["Indonesia", "Burgreens", "plant-based prepared meals", "P2", "active", "Indonesia plant-based healthy restaurant and meal delivery brand with vegan and flexitarian demand", "https://burgreens.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Indonesia plant-based prepared meal pages"],
  ["Thailand", "Paleo Robbie", "healthy meal delivery", "P1", "active", "Thailand healthy prepared food, grocery, and meal plan delivery brand with Paleo and organic positioning", "https://paleorobbie.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add as Thailand healthy grocery and prepared meal anchor"],
  ["Thailand", "Pure Prep Bangkok", "high protein meal prep", "P2", "active_region_check", "Bangkok meal prep delivery candidate for macro-friendly and high-protein prepared meals", "https://pureprepbangkok.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Thailand high-protein meal-prep pages with regional caveat"],
  ["Malaysia", "Homey Malaysia", "prepared meals", "P2", "active_region_check", "Malaysia home-style prepared meal delivery candidate for Kuala Lumpur family and easy dinner demand", "https://homey.com.my/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Malaysia prepared meal challenger pages with route caveat"],
  ["Malaysia", "Clean Eats Malaysia", "diet prepared meals", "P3", "active_region_check", "Malaysia healthy meal-prep and clean eating candidate", "https://cleaneats.my/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Malaysia diet prepared meal challenger pages"],
  ["US", "Fresh Meal Plan", "prepared meals", "P1", "active", "US chef-crafted fresh prepared meals ready in about three minutes with dietitian-approved positioning", "https://freshmealplan.com/", "affiliate application", `official_source_checked_${checkedDate}`, "Add to US fresh prepared meal challenger pages"],
  ["US", "Sunbasket", "meal kit and prepared meals", "P1", "active", "US healthy meal delivery brand with both heat-and-eat meals and cooking kits", "https://sunbasket.com/", "affiliate application", `official_source_checked_${checkedDate}`, "Promote from watchlist to active route-ready coverage"],
  ["US", "Blue Apron", "meal kit", "P1", "active", "US mainstream meal-kit brand with recipes, pre-portioned ingredients, and broad comparison demand", "https://www.blueapron.com/", "affiliate application", `official_source_checked_${checkedDate}`, "Promote from missing-priority to active route-ready coverage"],
  ["US", "Marley Spoon", "meal kit", "P1", "active", "US recipe-led meal-kit brand for premium cooking-kit comparisons against Blue Apron, Dinnerly, and HelloFresh", "https://marleyspoon.com/", "affiliate application", `official_source_checked_${checkedDate}`, "Promote from missing-priority to active route-ready coverage"],
  ["US", "Thrive Market", "grocery dinner delivery", "P2", "active", "US membership grocery delivery brand for healthy pantry, frozen, and dinner-shortcut searches", "https://thrivemarket.com/", "affiliate application", `official_source_checked_${checkedDate}`, "Add to grocery dinner and healthy pantry pages"]
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
      wave: "023",
      waveRows: additions.length,
      rowsInserted: inserted.length,
      rowsUpdated: updated.length,
      countriesTouched: [...new Set(additions.map((row) => row.country))].sort(),
      sourceOfTruth: path.relative(root, brandUniversePath),
      waveCsv: path.relative(root, waveCsvPath),
      note: "Adds Africa, India, Southeast Asia, and US grocery/prepared-meal brands, while promoting some US watchlist rows to route-ready active status with app, regional, and platform caveats."
    },
    null,
    2
  )}\n`
);

console.log(`Wave 023 complete: ${inserted.length} inserted, ${updated.length} updated.`);

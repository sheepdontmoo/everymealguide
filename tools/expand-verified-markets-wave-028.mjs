import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const brandUniversePath = path.join(root, "seo", "global-brand-universe.csv");
const waveCsvPath = path.join(root, "seo", "verified-expansion-wave-028.csv");
const waveReportPath = path.join(root, "reports", "verified-expansion-wave-028.json");

const checkedDate = "2026-06-24";

const additions = [
  ["Croatia", "LightFork", "diet prepared meals", "P1", "active_region_check", "Croatia healthy full-day meal delivery program with four daily meals and weight-loss positioning", "https://www.lightfork.hr/en/", "direct partnership", `official_source_checked_${checkedDate}`, "Add as Croatia diet prepared-meal anchor"],
  ["Serbia", "28Ishrana", "diet prepared meals", "P1", "active_region_check", "Belgrade healthy meal delivery service with weekly meal plans and full-day nutrition programs", "https://28ishrana.rs/en/", "direct partnership", `official_source_checked_${checkedDate}`, "Add as Serbia/Belgrade diet meal delivery anchor"],
  ["Serbia", "Vit Fit Serbia", "diet prepared meals", "P2", "active_region_check", "Belgrade balanced meal delivery service with women's, men's, protein, and weight-loss packages", "https://vitfit.rs/en", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Serbia healthy meal delivery alternatives"],
  ["Bulgaria", "Fit Panther", "diet prepared meals", "P1", "active", "Bulgaria ready healthy menu delivery brand serving home and office customers with full-day menus", "https://fitpanther.bg/en/", "direct partnership", `official_source_checked_${checkedDate}`, "Add as Bulgaria healthy prepared-meal anchor"],
  ["Latvia", "MealPrep Baltic Latvia", "diet prepared meals", "P1", "active_region_check", "Baltic healthy prepared-meal subscription route serving Latvia through MealPrep Global", "https://mealprep.global/", "direct partnership", `official_source_checked_${checkedDate}`, "Add as Latvia meal-prep anchor with Baltic-region caveat"],
  ["Lithuania", "MealPrep Baltic Lithuania", "diet prepared meals", "P1", "active_region_check", "Baltic healthy prepared-meal subscription route serving Lithuania through MealPrep Global", "https://mealprep.global/", "direct partnership", `official_source_checked_${checkedDate}`, "Add as Lithuania meal-prep anchor with Baltic-region caveat"],
  ["Estonia", "MealPrep Baltic Estonia", "diet prepared meals", "P2", "active_region_check", "Baltic healthy prepared-meal subscription route serving Estonia through MealPrep Global", "https://mealprep.global/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Estonia meal-prep alternatives"],
  ["Estonia", "SmartFOOD Estonia", "diet prepared meals", "P1", "active_region_check", "Estonia complete daily meal system delivering five dietitian-planned meals in the morning", "https://smartfood.ee/en/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Estonia boxed diet pages"],
  ["Estonia", "EasyEats Estonia", "high protein meal prep", "P2", "active_region_check", "Tallinn high-protein meal-prep delivery service with weekly breakfast, lunch, and dinner options", "https://www.easyeats.ee/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Estonia high-protein meal-prep pages"],
  ["Cyprus", "HealthyBox Cyprus", "diet prepared meals", "P1", "active_region_check", "Cyprus weekly and monthly healthy meal-plan brand delivering around Nicosia, Larnaca, and Limassol", "https://healthybox.com.cy/", "direct partnership", `official_source_checked_${checkedDate}`, "Add as Cyprus healthy meal-plan anchor"],
  ["Cyprus", "Healthy Meals Cyprus", "diet prepared meals", "P1", "active_region_check", "Cyprus weekly healthy meal delivery service with Nicosia delivery and Larnaca expansion messaging", "https://healthy-meals.com.cy/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Cyprus diet prepared-meal pages"],
  ["Cyprus", "Ofelimon", "prepared meals", "P2", "active_region_check", "Cyprus customizable healthy prepared-meal delivery brand focused on heat-and-eat convenience", "https://ofelimon.com.cy/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Cyprus prepared meal alternatives"],
  ["Cyprus", "FamilyChef Cyprus", "diet prepared meals", "P2", "active_region_check", "Cyprus diet meal-plan delivery brand with slim, keto, and weekly program positioning", "https://familychef.com.cy/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Cyprus diet program pages"],
  ["Cyprus", "Milts Food", "prepared meals", "P3", "active_region_check", "Cyprus healthy food delivery service with organic, plant-based, and gluten-free positioning", "https://www.miltsfood.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Cyprus prepared meal challenger pages"],
  ["Cyprus", "Family Kitchen Cyprus", "kids and family meal plans", "P3", "active_region_check", "Cyprus healthy family meal-plan and catering route for children and adults", "https://familykitchen.cy/", "direct partnership after consumer fit check", `official_source_checked_${checkedDate}`, "Add to Cyprus family/kids meal-plan alternatives with catering caveat"],
  ["Bahrain", "Right Calories Bahrain", "diet prepared meals", "P1", "active", "Bahrain healthy meal-plan delivery brand with balanced, low-carb, high-protein, and custom programs", "https://www.rightcalories.com/bh", "direct partnership", `official_source_checked_${checkedDate}`, "Add as Bahrain diet meal-plan anchor"],
  ["Bahrain", "Honestly Foods", "prepared meals", "P1", "active", "Bahrain balanced meal subscription and prepared food service with home-cooked positioning", "https://honestlybh.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Bahrain prepared meal pages"],
  ["Bahrain", "Calo Bahrain", "prepared meals", "P1", "active_app_route", "Bahrain app-led personalized daily meal-plan delivery route from Calo", "https://calo.app/en-bh", "direct partnership", `official_source_checked_${checkedDate}`, "Add as Bahrain Calo local route"],
  ["Oman", "Nourish Kitchen Oman", "diet prepared meals", "P1", "active_region_check", "Muscat healthy prepared meal service with portion-controlled calorie-counted programs", "https://nourishkitchen.me/", "direct partnership", `official_source_checked_${checkedDate}`, "Add as Oman/Muscat diet meal-plan anchor"],
  ["Oman", "Calo Oman", "prepared meals", "P1", "active_app_route", "Oman app-led personalized fresh meal-plan route from Calo with Muscat launch evidence", "https://calo.app/en", "direct partnership", `official_and_local_source_checked_${checkedDate}`, "Add to Oman prepared meal-plan alternatives with app-route caveat"],
  ["Egypt", "Protein Box Egypt", "high protein meal prep", "P1", "active_region_check", "Egypt healthy prepared meal delivery brand with high-protein, keto, and weekly package demand", "https://www.proteinbox-egypt.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add as Egypt high-protein meal-prep anchor"],
  ["Egypt", "Chef Box Egypt", "meal kit", "P2", "active_region_check", "Egypt meal-kit service with recurring subscription terms and premeasured ingredient boxes", "https://chefboxeg.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Egypt meal-kit and cook-at-home pages"],
  ["Egypt", "Diet Hub Egypt", "diet prepared meals", "P1", "active_app_route", "Egypt healthy diet meal subscription brand with customized nutrition plans and delivery", "https://diethubegypt.com/", "direct partnership", `official_and_app_source_checked_${checkedDate}`, "Add to Egypt diet meal delivery pages"],
  ["Egypt", "Diet to Door Egypt", "diet prepared meals", "P1", "active", "Egypt diet food delivery service with balanced, muscle, low-carb, vegetarian, and kids programs", "https://diettodoor.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Egypt weight-loss and diet prepared meal pages"],
  ["Egypt", "Calories Egypt", "diet prepared meals", "P2", "active_region_check", "Egypt eat-clean program and daily meal-plan service for full-day prepared meals", "https://www.calories-eg.com/calories-healthy-package-program.html", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Egypt diet prepared-meal challenger pages"],
  ["Morocco", "MealBox Morocco", "prepared meals", "P1", "active_region_check", "Morocco dietitian-approved fresh prepared meals delivered ready to heat in minutes", "https://www.mealbox.ma/", "direct partnership", `official_source_checked_${checkedDate}`, "Add as Morocco prepared-meal anchor"],
  ["Greece", "Nutrichef Greece", "diet prepared meals", "P1", "active_region_check", "Greece nutritionally designed ready-to-eat meal delivery service with program-based ordering", "https://nutrichef.gr/", "direct partnership", `official_source_checked_${checkedDate}`, "Add as Greece healthy prepared-meal anchor"],
  ["Hungary", "Smartfood Hungary", "diet prepared meals", "P2", "active_region_check", "Hungary complete meal system delivering five dietitian-designed meals per day", "https://smart-food.hu/in-english/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to Hungary boxed diet alternatives"],
  ["US", "NutriFit", "diet prepared meals", "P2", "active_region_check", "California customized prepared meal delivery brand with rotating gourmet menus and dietary options", "https://www.nutrifitonline.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to US customized diet meal pages"],
  ["US", "fit-flavors", "prepared meals", "P2", "active_region_check", "US regional fresh prepared meal brand with portion-controlled healthy meals and retail/delivery routes", "https://fit-flavors.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to US regional prepared meal alternatives"],
  ["US", "Farm to Fit", "prepared meals", "P2", "active_region_check", "Portland prepared meal delivery brand with chef-made calorie-controlled meals and recurring delivery", "https://www.farmtofit.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to US regional calorie-controlled meal pages"],
  ["US", "LifeChef", "diet prepared meals", "P2", "active", "US tailored healthy meal delivery brand for dietary needs including diabetes and heart-friendly programs", "https://www.lifechef.com/", "affiliate application", `official_source_checked_${checkedDate}`, "Add to medically tailored and diet meal pages"],
  ["US", "Munch Thyme", "premium prepared meals", "P2", "active", "US chef-prepared personalized meal delivery brand with seed-oil-free positioning", "https://munchthyme.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to premium prepared meal pages"],
  ["US", "MyoMeals", "high protein meal prep", "P3", "active_region_check", "Chicago meal-prep delivery brand with macros, pickup, and local delivery", "https://myomealsprep.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to US regional high-protein meal-prep pages"],
  ["US", "Healthy Course Meals", "diet prepared meals", "P3", "active_region_check", "US regional portion-controlled prepared meal delivery brand for fitness and healthy eating goals", "https://healthycoursemeals.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to US regional prepared meal alternatives"],
  ["US", "Performance Ready Nutrition", "high protein meal prep", "P3", "active_region_check", "US regional macro-friendly prepared meal brand for fitness goals and whole-food meal prep", "https://www.performancereadynutrition.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to US performance meal-prep alternatives"],
  ["US", "Fit AF Nutrition", "prepared meals", "P3", "active_region_check", "Boston-area fresh prepared meal delivery brand with high-protein and diet-filtered weekly menus", "https://fitafnutrition.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to US regional prepared meal alternatives"],
  ["US", "EatFitz", "high protein meal prep", "P3", "active_region_check", "Massachusetts and Rhode Island fresh meal-prep delivery brand with customizable high-protein meals", "https://eatfitz.com/", "direct partnership", `official_source_checked_${checkedDate}`, "Add to US regional high-protein meal-prep alternatives"]
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
      wave: "028",
      waveRows: additions.length,
      rowsInserted: inserted.length,
      rowsUpdated: updated.length,
      countriesTouched: [...new Set(additions.map((row) => row.country))].sort(),
      sourceOfTruth: path.relative(root, brandUniversePath),
      waveCsv: path.relative(root, waveCsvPath),
      note: "Adds source-backed under-covered Eastern Europe, Baltic, Cyprus, Gulf, Egypt, Morocco, Greece, Hungary, and US regional prepared-meal, boxed-diet, high-protein meal-prep, family, and meal-kit brands."
    },
    null,
    2
  )}\n`
);

console.log(`Wave 028 complete: ${inserted.length} inserted, ${updated.length} updated.`);

import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const brandUniversePath = path.join(root, "seo", "global-brand-universe.csv");
const waveCsvPath = path.join(root, "seo", "verified-expansion-wave-006.csv");
const waveReportPath = path.join(root, "reports", "verified-expansion-wave-006.json");
const sitemapPath = path.join(root, "sitemap.xml");

const additions = [
  ["uae", "Right Bite", "prepared meals", "1", "active", "UAE meal-plan brand with dietitian-designed fresh meals across Dubai, Abu Dhabi, and Sharjah", "https://rightbite.com/", "direct partnership", "official_source_checked_2026-06-23", "Lead UAE prepared-meal comparison and partner outreach"],
  ["uae", "Kcal Life", "prepared meals", "1", "active", "UAE healthy meal-plan provider with customizable plans and daily meal delivery", "https://kcallife.com/", "direct partnership", "official_source_checked_2026-06-23", "Add as UAE top-tier meal-plan comparison target"],
  ["uae", "Calo", "prepared meals", "1", "active", "Personalized daily fresh meal-plan app active in UAE and wider GCC", "https://calo.app/en", "direct partnership", "official_source_checked_2026-06-23", "Add as app-led UAE/GCC comparison target"],
  ["uae", "Delicut", "prepared meals", "2", "active", "UAE calorie-tracked chef-prepared meal plans delivered across the country", "https://delicut.ae/", "direct partnership", "official_source_checked_2026-06-23", "Use for UAE value and high-protein comparison angle"],
  ["uae", "Meals on Me", "prepared meals", "2", "active", "UAE calorie-controlled fresh meal plans with lunch and dinner delivery", "https://hellomealsonme.com/", "direct partnership", "official_source_checked_2026-06-23", "Add to UAE prepared-meal outreach queue"],
  ["singapore", "Nutrition Kitchen", "prepared meals", "1", "active", "Singapore fresh ready-made meals and goal-based meal plans delivered daily", "https://nutritionkitchensg.com/", "direct partnership", "official_source_checked_2026-06-23", "Lead Singapore prepared-meal comparison and outreach"],
  ["singapore", "Grain", "prepared meals", "1", "active", "Singapore on-demand healthy meal delivery with rotating weekly dishes", "https://grain.com.sg/eat", "direct partnership", "official_source_checked_2026-06-23", "Add as Singapore convenience and office-lunch angle"],
  ["singapore", "AMGD", "healthy meal delivery", "2", "active", "Singapore healthy meal credits and meal-plan delivery brand", "https://www.amgdglobal.com/en-sg", "direct partnership", "official_source_checked_2026-06-23", "Add to Singapore halal and flexible meal-credit cluster"],
  ["singapore", "Yummy Bros", "meal prep", "2", "active", "Singapore high-protein customizable meal-prep brand with doorstep delivery", "https://www.yummybros.com/", "direct partnership", "official_source_checked_2026-06-23", "Use for fitness and high-protein Singapore comparison"],
  ["singapore", "FitThree", "meal prep", "3", "active", "Singapore chef-crafted healthy meals delivered weekly for active consumers", "https://fitthree.com/", "direct partnership", "official_source_checked_2026-06-23", "Add to fitness-focused Singapore shortlist"],
  ["singapore", "Freshkitchen Meals", "prepared meals", "3", "active", "Singapore ready-to-eat meal-plan brand by SaladStop Group", "https://freshkitchenmeals.sg/", "direct partnership", "official_source_checked_2026-06-23", "Add to Singapore daily fresh meal-plan cluster"],
  ["south-africa", "UCOOK", "meal kit", "1", "active", "South Africa meal-kit provider delivering pre-portioned ingredients and recipes", "https://ucook.co.za/", "direct partnership", "official_source_checked_2026-06-23", "Lead South Africa meal-kit comparison and outreach"],
  ["south-africa", "Daily Dish", "meal kit", "2", "active", "South African dinner-kit brand with weekly pre-portioned dinner boxes", "https://www.facebook.com/dailydishforyou/", "direct partnership", "third_party_and_social_source_checked_2026-06-23", "Account for South Africa meal-kit search demand and verify current official site"],
  ["south-africa", "FitChef", "prepared meals", "1", "active", "South African healthy ready-to-eat meals, smoothies, snacks, and meal-plan kits", "https://orders.fitchef.co.za/customer/menu/meals", "direct partnership", "official_source_checked_2026-06-23", "Lead South Africa prepared-meal comparison and outreach"],
  ["south-africa", "We Are Food", "frozen meals", "2", "active", "South African frozen meal brand delivering ready meals from its online shop", "https://wearefood.co.za/", "direct partnership", "official_source_checked_2026-06-23", "Add as frozen prepared-meal option"],
  ["south-africa", "TasteBox", "meal kit", "3", "active", "South African health-focused meal kits delivered weekly", "https://tastebox.co.za/", "direct partnership", "official_source_checked_2026-06-23", "Add to South Africa meal-kit challenger list"],
  ["hong-kong", "Nutrition Kitchen", "prepared meals", "1", "active", "Hong Kong high-protein chef-made meal plans designed by nutritionists", "https://nutritionkitchenhk.com/", "direct partnership", "official_source_checked_2026-06-23", "Lead Hong Kong healthy meal-plan comparison and outreach"],
  ["hong-kong", "NOSH", "prepared meals", "1", "active", "Hong Kong healthy meal-plan delivery service with fresh meals delivered each morning", "https://www.nosh.hk/", "direct partnership", "official_source_checked_2026-06-23", "Add as Hong Kong top comparison target"],
  ["hong-kong", "Eatology", "prepared meals", "2", "active", "Hong Kong bespoke healthy meal-plan brand with diet-specific plans", "https://www.eatologyasia.com/", "direct partnership", "third_party_source_checked_2026-06-23", "Verify official content and add premium comparison angle"],
  ["hong-kong", "Fittery", "prepared meals", "2", "active", "Hong Kong flexible high-protein meal-plan provider with broad menu choice", "https://www.instagram.com/fitteryhk/", "direct partnership", "third_party_and_social_source_checked_2026-06-23", "Find official web ordering route and add to Hong Kong challenger list"],
  ["india", "Food Darzee", "diet prepared meals", "1", "active", "Indian subscription meal service for keto, low-carb high-protein, vegan, and balanced diet plans", "https://fooddarzee.com/", "direct partnership", "official_source_checked_2026-06-23", "Lead India healthy meal-plan comparison and outreach"],
  ["india", "Sprink", "prepared meals", "2", "active", "India fresh home-style meal subscription for offices, campuses, and homes", "https://www.sprink.online/", "direct partnership", "official_source_checked_2026-06-23", "Add as India daily meal subscription target"],
  ["india", "Fitmeals", "meal prep", "2", "active", "India meal-plan subscription brand for weight loss, healthy eating, and muscle-building goals", "https://www.fitmeals.co.in/", "direct partnership", "official_source_checked_2026-06-23", "Add to India fitness meal-plan comparison"],
  ["india", "Calorie Care", "diet prepared meals", "3", "needs_active_check", "India diet meal delivery brand with historical Mumbai subscription demand", "https://caloriecare.com/", "direct partnership after active check", "needs_official_content_check_2026-06-23", "Verify active status before recommendation"]
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

const countryMeta = {
  uae: {
    label: "UAE",
    url: "/countries/uae/best-meal-delivery/",
    title: "Best Meal Delivery Services in the UAE",
    intro: "The UAE is a high-value prepared-meal market: busy professionals, fitness users, weight-loss plans, and premium daily delivery. This page should compare Right Bite, Kcal, Calo, Delicut, and Meals on Me first.",
    verdict: "Start with Right Bite, Kcal, and Calo as the top three, then use Delicut and Meals on Me for value and flexible lunch/dinner plan comparisons."
  },
  singapore: {
    label: "Singapore",
    url: "/countries/singapore/best-meal-delivery/",
    title: "Best Meal Delivery Services in Singapore",
    intro: "Singapore is a strong prepared-meal and fitness meal-prep market with English search demand and direct partnership potential.",
    verdict: "Start with Nutrition Kitchen and Grain, then compare AMGD, Yummy Bros, FitThree, and Freshkitchen for different price and fitness needs."
  },
  "south-africa": {
    label: "South Africa",
    url: "/countries/south-africa/best-meal-delivery/",
    title: "Best Meal Delivery Services in South Africa",
    intro: "South Africa has both meal-kit and ready-meal demand. UCOOK anchors meal kits, while FitChef and We Are Food cover prepared and frozen meals.",
    verdict: "Use UCOOK for meal kits, FitChef for healthy prepared meals, and We Are Food for frozen family convenience."
  },
  "hong-kong": {
    label: "Hong Kong",
    url: "/countries/hong-kong/best-meal-delivery/",
    title: "Best Meal Delivery Services in Hong Kong",
    intro: "Hong Kong is a premium healthy meal-plan market for busy professionals. Nutrition Kitchen, NOSH, Eatology, and Fittery are the first comparison set.",
    verdict: "Start with Nutrition Kitchen and NOSH, then position Eatology as premium bespoke and Fittery as high-protein flexible meal plans."
  },
  india: {
    label: "India",
    url: "/countries/india/best-meal-delivery/",
    title: "Best Meal Delivery Services in India",
    intro: "India's opportunity is city-led healthy meal subscriptions, with diet and fitness plans rather than classic Western meal kits.",
    verdict: "Start with Food Darzee for goal-based diets, Sprink for daily home-style subscriptions, and Fitmeals for fitness meal plans."
  }
};

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

function slugify(value) {
  return String(value)
    .toLowerCase()
    .replace(/&/g, "and")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function htmlEscape(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function brandUrl(brand) {
  return `/reviews/${slugify(brand)}/`;
}

const rows = parseCsv(fs.readFileSync(brandUniversePath, "utf8"));
const header = rows[0];
const records = rows.slice(1).map((row) =>
  Object.fromEntries(header.map((column, index) => [column, row[index] ?? ""]))
);
const existing = new Set(records.map((record) => `${record.country}::${record.brand}`.toLowerCase()));
const newRecords = [];

for (const addition of additions) {
  const key = `${addition.country}::${addition.brand}`.toLowerCase();
  if (existing.has(key)) continue;
  records.push(addition);
  newRecords.push(addition);
  existing.add(key);
}

fs.writeFileSync(
  brandUniversePath,
  toCsv([header, ...records.map((record) => header.map((column) => record[column] ?? ""))])
);
fs.writeFileSync(
  waveCsvPath,
  toCsv([header, ...additions.map((record) => header.map((column) => record[column] ?? ""))])
);

for (const [country, meta] of Object.entries(countryMeta)) {
  const countryRecords = records
    .filter((record) => record.country === country)
    .sort((a, b) => Number(a.priority || 99) - Number(b.priority || 99));
  const activeRecords = countryRecords.filter((record) => record.site_status === "active");
  const accountedRecords = countryRecords.filter((record) => record.site_status !== "active");
  const pageDir = path.join(root, "countries", country, "best-meal-delivery");
  fs.mkdirSync(pageDir, { recursive: true });

  const cards = activeRecords
    .slice(0, 4)
    .map((record, index) => `
            <article class="brand-card">
              <span class="eyebrow">#${index + 1} ${htmlEscape(record.category)}</span>
              <h3>${htmlEscape(record.brand)}</h3>
              <p>${htmlEscape(record.market_role)}</p>
              <a class="text-link" href="${brandUrl(record.brand)}">Read the ${htmlEscape(record.brand)} review</a>
            </article>`)
    .join("");

  const tableRows = countryRecords
    .map((record) => `
              <tr>
                <td><a href="${brandUrl(record.brand)}">${htmlEscape(record.brand)}</a></td>
                <td>${htmlEscape(record.category)}</td>
                <td>${htmlEscape(record.market_role)}</td>
                <td>${htmlEscape(record.site_status)}</td>
                <td><a href="${htmlEscape(record.official_url)}" rel="nofollow noopener">Official site</a></td>
              </tr>`)
    .join("");

  const accountedBlock = accountedRecords.length
    ? `<section class="content-section">
          <h2>Accounted-for brands that need routing or checks</h2>
          <p>These brands matter for search demand, but we should not treat every one as a normal active recommendation.</p>
          <ul>${accountedRecords.map((record) => `<li><strong>${htmlEscape(record.brand)}:</strong> ${htmlEscape(record.next_action)}</li>`).join("")}</ul>
        </section>`
    : "";

  fs.writeFileSync(
    path.join(pageDir, "index.html"),
    `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${htmlEscape(meta.title)} | Every Meal Guide</title>
    <meta name="description" content="Compare ${htmlEscape(meta.label)} meal delivery, meal kit, prepared meal, and diet meal options with evidence-backed brand coverage." />
    <link rel="canonical" href="https://www.everymealguide.com${meta.url}" />
    <link rel="stylesheet" href="/styles.css" />
  </head>
  <body>
    <header class="site-header">
      <a class="brand-mark" href="/">Every Meal Guide</a>
      <nav>
        <a href="/#rankings">Rankings</a>
        <a href="/#deals">Deals</a>
        <a href="/#compare">Compare</a>
        <a href="/#methodology">Methodology</a>
      </nav>
    </header>
    <main class="page-shell">
      <section class="hero page-hero">
        <div>
          <span class="eyebrow">${htmlEscape(meta.label)} market guide</span>
          <h1>Best meal delivery services in ${htmlEscape(meta.label)}</h1>
          <p>${htmlEscape(meta.intro)}</p>
          <div class="hero-actions">
            <a class="button primary" href="#rankings">See the shortlist</a>
            <a class="button ghost" href="#all-brands">View all accounted brands</a>
          </div>
        </div>
        <aside class="deal-card">
          <span class="eyebrow">Fast verdict</span>
          <p>${htmlEscape(meta.verdict)}</p>
        </aside>
      </section>
      <section class="content-section" id="rankings">
        <div class="section-heading">
          <span class="eyebrow">Best starting points</span>
          <h2>${htmlEscape(meta.label)} shortlist</h2>
          <p>These are the first brands to review, monetize, and update with live offers once affiliate approval is in place.</p>
        </div>
        <div class="brand-grid">${cards}</div>
      </section>
      <section class="content-section" id="all-brands">
        <div class="section-heading">
          <span class="eyebrow">Coverage ledger</span>
          <h2>Every ${htmlEscape(meta.label)} brand currently accounted for</h2>
          <p>This table is deliberately commercial: it separates active recommendations from brands that need checking, routing, or partnership work.</p>
        </div>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Brand</th>
                <th>Type</th>
                <th>Why it matters</th>
                <th>Status</th>
                <th>Source</th>
              </tr>
            </thead>
            <tbody>${tableRows}
            </tbody>
          </table>
        </div>
      </section>
      ${accountedBlock}
      <section class="content-section">
        <h2>How this page makes money</h2>
        <p>Every Meal Guide should monetize this page through affiliate links where available, direct partner deals with prepared-meal brands, sponsored placements that stay clearly labelled, and email capture for offer alerts. Until a deal is approved, links stay as official-source routes rather than fake affiliate claims.</p>
      </section>
    </main>
  </body>
</html>
`
  );
}

if (fs.existsSync(sitemapPath)) {
  let sitemap = fs.readFileSync(sitemapPath, "utf8");
  for (const meta of Object.values(countryMeta)) {
    const loc = `https://www.everymealguide.com${meta.url}`;
    if (sitemap.includes(`<loc>${loc}</loc>`)) continue;
    sitemap = sitemap.replace("</urlset>", `  <url>\n    <loc>${loc}</loc>\n  </url>\n</urlset>`);
  }
  fs.writeFileSync(sitemapPath, sitemap);
}

fs.mkdirSync(path.dirname(waveReportPath), { recursive: true });
fs.writeFileSync(
  waveReportPath,
  `${JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      wave: "006",
      countries: Object.keys(countryMeta),
      rowsAdded: newRecords.length,
      waveRows: additions.length,
      countryPagesWritten: Object.values(countryMeta).map((meta) => meta.url),
      sourceOfTruth: path.relative(root, brandUniversePath),
      waveCsv: path.relative(root, waveCsvPath)
    },
    null,
    2
  )}\n`
);

console.log(`Wave 006 complete: ${newRecords.length} brand-market rows added.`);
console.log(`Country pages: ${Object.values(countryMeta).map((meta) => meta.url).join(", ")}`);

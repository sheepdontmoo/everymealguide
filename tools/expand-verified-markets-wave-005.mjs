import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const brandUniversePath = path.join(root, "seo", "global-brand-universe.csv");
const waveCsvPath = path.join(root, "seo", "verified-expansion-wave-005.csv");
const waveReportPath = path.join(root, "reports", "verified-expansion-wave-005.json");
const sitemapPath = path.join(root, "sitemap.xml");

const additions = [
  ["belgium", "HelloFresh", "meal kit", "1", "active", "Large Belgium meal-kit subscription with weekly recipes and home delivery", "https://www.hellofresh.be/", "affiliate network or direct partnership", "official_source_checked_2026-06-23", "Use as Belgium mainstream benchmark and affiliate application target"],
  ["belgium", "Foodbag", "meal kit and ready meals", "1", "active", "Belgian meal box with local ingredients, no-subscription ordering, and ready-made options", "https://www.foodbag.be/", "direct partnership", "official_source_checked_2026-06-23", "Position as local Belgium alternative to HelloFresh and Marley Spoon"],
  ["belgium", "Marley Spoon", "meal kit", "2", "active", "Belgium meal-kit option with recipes, ingredients, and market add-ons", "https://marleyspoon.be/", "affiliate network or direct partnership", "official_source_checked_2026-06-23", "Add to Belgium comparison and affiliate application queue"],
  ["belgium", "Simply You Box", "retail meal kit", "4", "needs_active_check", "Carrefour-backed Belgian recipe box with historical search demand", "https://www.carrefour.com/en/news/carrefour-simply-you-box-has-arrived", "not ready; verify active status", "historical_source_checked_needs_active_check_2026-06-23", "Account for search demand but do not recommend until active status is confirmed"],
  ["switzerland", "HelloFresh", "meal kit", "1", "active", "Large Swiss cook-at-home box with fresh ingredients and weekly delivery", "https://www.hellofresh.ch/", "affiliate network or direct partnership", "official_source_checked_2026-06-23", "Use as Switzerland meal-kit benchmark and affiliate application target"],
  ["switzerland", "Weekly Food", "prepared meals", "1", "active", "Swiss ready-to-eat weekly meals cooked by chefs and delivered throughout Switzerland", "https://weekly-food.ch/en/", "direct partnership", "official_source_checked_2026-06-23", "Lead prepared-meals comparison and direct partnership outreach"],
  ["switzerland", "Allcook Kitchen", "prepared meals", "2", "active", "Artisanal ready-meal delivery across Switzerland and Liechtenstein", "https://allcook.ch/", "direct partnership", "official_source_checked_2026-06-23", "Add to Switzerland prepared-meals shortlist"],
  ["switzerland", "merciChef", "prepared meals", "2", "active", "Swiss ready-to-eat meal delivery with weekly menu and chef-crafted meals", "https://mercichef.ch/en", "direct partnership", "official_source_checked_2026-06-23", "Add to Switzerland prepared-meals shortlist"],
  ["switzerland", "prepmymeal", "high protein prepared meals", "2", "active", "High-protein ready-made meals delivered in Switzerland", "https://www.prepmymeal.ch/a/l/en/", "direct partnership", "official_source_checked_2026-06-23", "Use for fitness and high-protein comparison angle"],
  ["austria", "HelloFresh", "meal kit", "1", "active", "Austria meal-kit subscription with recipes and nationwide delivery", "https://www.hellofresh.at/", "affiliate network or direct partnership", "official_source_checked_2026-06-23", "Use as Austria mainstream benchmark and affiliate application target"],
  ["austria", "Marley Spoon", "meal kit", "1", "active", "Austria cook-at-home meal box with flexible recipes and delivery", "https://marleyspoon.at/", "affiliate network or direct partnership", "official_source_checked_2026-06-23", "Build Austria HelloFresh vs Marley Spoon comparison"],
  ["austria", "prepmymeal", "high protein prepared meals", "2", "active", "DACH ready-made high-protein meals for fitness and convenience shoppers", "https://prepmymeal.com/", "direct partnership", "official_source_checked_2026-06-23", "Confirm Austria delivery terms and use for high-protein page cluster"],
  ["poland", "Maczfit", "diet prepared meals", "1", "active", "Major Polish boxed-diet provider with ready diet plans and menu choice", "https://www.maczfit.pl/", "direct partnership", "official_source_checked_2026-06-23", "Lead Poland diet-catering comparison and direct partnership outreach"],
  ["poland", "Nice To Fit You", "diet prepared meals", "1", "active", "Polish diet catering service with menu-choice packages", "https://ntfy.pl/", "direct partnership", "official_source_checked_2026-06-23", "Use as Maczfit challenger and app-led choice angle"],
  ["poland", "Body Chief", "diet prepared meals", "2", "active", "Polish diet box provider delivering sets of meals across many locations", "https://bodychief.pl/", "direct partnership", "official_source_checked_2026-06-23", "Add to Poland top comparison and outreach queue"],
  ["poland", "Wygodna Dieta", "diet prepared meals", "2", "active", "Polish box-diet provider with many diet types and broad location coverage", "https://www.wygodnadieta.pl/en", "direct partnership", "official_source_checked_2026-06-23", "Add to Poland top comparison and outreach queue"],
  ["poland", "SuperMenu", "diet prepared meals", "3", "active", "Polish diet catering brand with ready diets and menu-choice packages", "https://supermenu.com.pl/", "direct partnership", "official_source_checked_2026-06-23", "Add as celebrity-led diet catering challenger"],
  ["finland", "Ruokaboksi", "meal kit", "1", "active", "Finland meal-kit provider delivering planned recipes and measured ingredients to the door", "https://ruokaboksi.fi/", "direct partnership", "official_source_checked_2026-06-23", "Lead Finland meal-kit comparison and direct partnership outreach"],
  ["finland", "Calori", "prepared meals", "1", "active", "Finland meal-plan service cooking and delivering nutritious meals", "https://calori.fi/", "direct partnership", "official_source_checked_2026-06-23", "Lead Finland prepared-meals comparison and direct partnership outreach"],
  ["finland", "FuelMe", "prepared meals", "2", "active", "Helsinki ready-meal delivery service for busy consumers", "https://fuelme.fi/", "direct partnership", "official_source_checked_2026-06-23", "Add to Finland prepared-meals shortlist"],
  ["finland", "Komero Food", "ready meals", "3", "active_retail_ready_meal_brand", "Finnish fresh ready-meal brand with vegetable-forward meals", "https://www.komerofood.fi/", "retail partnership or content mention", "official_source_checked_2026-06-23", "Account for ready-meal search demand but separate from home-delivery rankings"]
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
  belgium: {
    label: "Belgium",
    url: "/countries/belgium/best-meal-delivery/",
    title: "Best Meal Delivery Services in Belgium",
    intro: "Belgium is a strong meal-kit comparison market because shoppers can compare global players against a Belgian local brand. The first page should make HelloFresh vs Foodbag vs Marley Spoon simple.",
    verdict: "Start with HelloFresh for broad meal-kit choice, Foodbag for a local Belgian no-subscription angle, and Marley Spoon for another flexible cook-at-home option."
  },
  switzerland: {
    label: "Switzerland",
    url: "/countries/switzerland/best-meal-delivery/",
    title: "Best Meal Delivery Services in Switzerland",
    intro: "Switzerland needs both cook-at-home and prepared-meal coverage. HelloFresh covers meal kits, while Weekly Food, Allcook, merciChef, and prepmymeal cover heat-and-eat convenience.",
    verdict: "Use HelloFresh for meal kits, Weekly Food for prepared weekly meals, and prepmymeal for high-protein ready meals."
  },
  austria: {
    label: "Austria",
    url: "/countries/austria/best-meal-delivery/",
    title: "Best Meal Delivery Services in Austria",
    intro: "Austria is a straightforward comparison market: HelloFresh and Marley Spoon are the cook-at-home anchors, while prepmymeal gives the page a high-protein prepared-meal lane.",
    verdict: "Build the page around HelloFresh vs Marley Spoon first, then add prepmymeal for shoppers who want ready-made fitness-focused meals."
  },
  poland: {
    label: "Poland",
    url: "/countries/poland/best-meal-delivery/",
    title: "Best Meal Delivery Services in Poland",
    intro: "Poland is one of the strongest prepared-meal opportunities because boxed diet catering is already a known consumer behaviour. This should become a serious money cluster, not just one country page.",
    verdict: "Start with Maczfit and Nice To Fit You, compare Body Chief and Wygodna Dieta, then expand into diet-specific pages for keto, high-protein, low-calorie, and menu-choice catering."
  },
  finland: {
    label: "Finland",
    url: "/countries/finland/best-meal-delivery/",
    title: "Best Meal Delivery Services in Finland",
    intro: "Finland splits neatly into meal kits and ready meals. Ruokaboksi covers the cook-at-home box, while Calori and FuelMe cover prepared meal delivery.",
    verdict: "Use Ruokaboksi for Finnish meal kits, Calori for prepared meal plans, and FuelMe for Helsinki ready-meal convenience."
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
      wave: "005",
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

console.log(`Wave 005 complete: ${newRecords.length} brand-market rows added.`);
console.log(`Country pages: ${Object.values(countryMeta).map((meta) => meta.url).join(", ")}`);

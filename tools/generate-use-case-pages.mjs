import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const sourcePath = path.join(root, "seo", "global-brand-universe.csv");
const indexPath = path.join(root, "seo", "use-case-page-index.csv");
const reportPath = path.join(root, "reports", "use-case-page-generation.json");
const sitemapPath = path.join(root, "sitemap.xml");

const countryLabels = {
  us: "United States",
  uk: "United Kingdom",
  ireland: "Ireland",
  australia: "Australia",
  canada: "Canada",
  "new-zealand": "New Zealand",
  germany: "Germany",
  france: "France",
  netherlands: "Netherlands",
  spain: "Spain",
  italy: "Italy",
  sweden: "Sweden",
  denmark: "Denmark",
  norway: "Norway",
  belgium: "Belgium",
  switzerland: "Switzerland",
  austria: "Austria",
  poland: "Poland",
  finland: "Finland",
  uae: "UAE",
  singapore: "Singapore",
  "south-africa": "South Africa",
  "hong-kong": "Hong Kong",
  india: "India",
  global: "Global"
};

const useCases = [
  {
    slug: "best-prepared-meal-delivery",
    label: "prepared meal delivery",
    intent: "People who want dinner without cooking",
    match: /prepared|ready|heat|no-cook|ready-to-eat|ready meal|meal prep|frozen/i
  },
  {
    slug: "best-high-protein-meal-prep",
    label: "high-protein meal prep",
    intent: "Gym-goers, busy professionals, and macro-focused shoppers",
    match: /high protein|protein|fitness|meal prep|muscle|macro|active/i
  },
  {
    slug: "best-weight-loss-meal-delivery",
    label: "weight-loss meal delivery",
    intent: "People comparing calorie-controlled plans",
    match: /weight loss|low calorie|calorie|slim|diet|low carb|keto|diabetic|portion/i
  },
  {
    slug: "best-diet-meal-delivery",
    label: "diet meal delivery",
    intent: "People with a diet goal or nutrition constraint",
    match: /diet|keto|low carb|low-calorie|diabetic|gluten|lactose|hashimoto|fodmap|nutritionist|dietitian/i
  },
  {
    slug: "best-cheap-meal-delivery",
    label: "cheap meal delivery",
    intent: "Budget-conscious shoppers comparing cost and first-box deals",
    match: /cheap|budget|value|affordable|everyplate|dinnerly|essentials|econom/i
  },
  {
    slug: "best-meal-kits",
    label: "meal kits",
    intent: "People who want ingredients and recipes delivered",
    match: /meal kit|recipe|kochbox|maaltijdbox|dinner kit|cook-at-home|cook at home|ingredients/i
  },
  {
    slug: "best-family-meal-delivery",
    label: "family meal delivery",
    intent: "Parents and households that need easier weeknight dinners",
    match: /family|kids|children|child|parent|household|dinner|family-friendly|families/i
  },
  {
    slug: "best-frozen-meal-delivery",
    label: "frozen meal delivery",
    intent: "People who want freezer-ready backup meals",
    match: /frozen|freezer|freeze|delidoor|we are food/i
  },
  {
    slug: "best-vegetarian-meal-delivery",
    label: "vegetarian meal delivery",
    intent: "Vegetarian, vegan, flexitarian, and plant-based shoppers",
    match: /vegetarian|vegan|plant|veggie|flexitarian|plant-based/i
  },
  {
    slug: "best-grocery-dinner-delivery",
    label: "grocery dinner delivery",
    intent: "People comparing grocery-led dinner planning and recipe boxes",
    match: /grocery|market|recipe kit|recipe|food box|produce|ingredients|farm|organic/i
  },
  {
    slug: "best-healthy-meal-delivery",
    label: "healthy meal delivery",
    intent: "People looking for balanced, fresher, healthier convenience meals",
    match: /healthy|balanced|diet|nutrition|fresh|organic|protein|low carb|weight|macro/i
  }
];

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
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function normalizeCountry(country) {
  const raw = String(country || "global").trim();
  const lower = raw.toLowerCase();
  const slug = lower === "us" || lower === "usa" || lower === "united states" ? "us" : slugify(raw);
  return {
    slug,
    label: countryLabels[slug] || raw.replace(/\b\w/g, (char) => char.toUpperCase())
  };
}

function priorityScore(record) {
  const raw = String(record.priority || "").toLowerCase();
  if (raw.includes("p0") || raw === "1") return 1;
  if (raw.includes("p1") || raw === "2") return 2;
  if (raw.includes("p2") || raw === "3") return 3;
  return 9;
}

function routeScore(record) {
  const target = String(record.affiliate_program_target || "").toLowerCase();
  const status = String(record.site_status || "").toLowerCase();
  let score = 100 - priorityScore(record) * 10;
  if (status.includes("active")) score += 15;
  if (target.includes("yes") || target.includes("affiliate network")) score += 15;
  if (target.includes("direct partnership")) score += 10;
  if (target.includes("not ready") || target.includes("not active")) score -= 30;
  return score;
}

function availabilityNote(record) {
  const status = `${record.site_status || ""} ${record.evidence_status || ""}`.toLowerCase();

  if (/inactive|legacy/.test(status)) return "Check whether this company still accepts orders before relying on it.";
  if (/active/.test(status)) return "Listed as an available option, but delivery area and current menu still need checking.";
  if (/pending|needs|watch|planned|source_list_seen|news_seen/.test(status)) {
    return "Confirm the official site, delivery area, current menu, and terms before choosing.";
  }

  return "Check delivery coverage, menu availability, and current terms before ordering.";
}

function sourceCell(record) {
  if (!/^https?:\/\//i.test(record.official_url || "")) return "Official source to confirm";
  return `<a href="${htmlEscape(record.official_url)}" rel="nofollow noopener">Official source</a>`;
}

function reviewUrl(record) {
  return `/reviews/${slugify(record.brand)}/`;
}

function goUrl(record) {
  return `/go/${slugify(record.brand)}/`;
}

function textBlob(record) {
  return [
    record.brand,
    record.category,
    record.market_role,
    record.next_action,
    record.affiliate_program_target
  ].join(" ");
}

function dedupeByBrand(records) {
  const map = new Map();
  for (const record of records) {
    const key = slugify(record.brand);
    const existing = map.get(key);
    if (!existing || routeScore(record) > routeScore(existing)) map.set(key, record);
  }
  return [...map.values()];
}

function pageHtml({ useCase, country, records, url, isGlobal }) {
  const sorted = dedupeByBrand(records).sort((a, b) => routeScore(b) - routeScore(a) || a.brand.localeCompare(b.brand));
  const top = sorted.slice(0, 8);
  const firstPick = top[0];
  const secondPick = top[1];
  const leadNames = top.slice(0, 5).map((record) => record.brand).join(", ");
  const countryText = isGlobal ? "globally" : `in ${country.label}`;
  const title = `Best ${useCase.label} ${countryText}`;
  const description = `Compare ${useCase.label} ${countryText}. See top brands including ${leadNames}, review pages, current offer checks, and fit notes.`;
  const itemList = top.map((record, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: record.brand,
    url: `https://www.everymealguide.com${reviewUrl(record)}`
  }));
  const cards = top
    .map((record, index) => `
          <article class="brand-card">
            <span class="eyebrow">#${index + 1} ${htmlEscape(record.category)}</span>
            <h3>${htmlEscape(record.brand)}</h3>
            <p>${htmlEscape(record.market_role || `${record.brand} is included because it matches this meal-delivery need.`)}</p>
            <div class="hero-actions compact-actions">
              <a class="button primary" href="${goUrl(record)}">Check current offer</a>
              <a class="button ghost" href="${reviewUrl(record)}">Review</a>
            </div>
          </article>`)
    .join("");
  const rows = sorted
    .map((record) => `
              <tr>
                <td><a href="${reviewUrl(record)}">${htmlEscape(record.brand)}</a></td>
                <td>${htmlEscape(normalizeCountry(record.country).label)}</td>
                <td>${htmlEscape(record.category)}</td>
                <td>${htmlEscape(availabilityNote(record))}</td>
                <td><a href="${goUrl(record)}">Check offer</a></td>
                <td>${sourceCell(record)}</td>
              </tr>`)
    .join("");

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${htmlEscape(title)} | Every Meal Guide</title>
    <meta name="description" content="${htmlEscape(description)}" />
    <link rel="canonical" href="https://www.everymealguide.com${url}" />
    <link rel="stylesheet" href="/styles.css" />
    <script type="application/ld+json">${JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: title,
      itemListElement: itemList
    })}</script>
  </head>
  <body>
    <header class="site-header">
      <a class="brand-mark" href="/">Every Meal Guide</a>
      <nav>
        <a href="/#rankings">Rankings</a>
        <a href="/#deals">Deals</a>
        <a href="/vs/">Comparisons</a>
        <a href="/best/">Best lists</a>
      </nav>
    </header>
    <main class="page-shell">
      <section class="hero page-hero">
        <div>
          <span class="eyebrow">${htmlEscape(useCase.intent)}</span>
          <h1>${htmlEscape(title)}</h1>
          <p>${htmlEscape(description)}</p>
          <div class="hero-actions">
            <a class="button primary" href="#top-picks">See top picks</a>
            <a class="button ghost" href="#all-options">View all options</a>
          </div>
        </div>
        <aside class="deal-card">
          <span class="eyebrow">Fast shortlist</span>
          <h3>${htmlEscape(leadNames || "More brands needed")}</h3>
          <p>Every listed brand has a review page and an offer check so readers can compare fit, availability, and current terms before choosing.</p>
        </aside>
      </section>

      <section class="quick-answer route-section">
        <div>
          <h2>The 60-second answer</h2>
          <p>${firstPick ? `Start with <strong>${htmlEscape(firstPick.brand)}</strong> if you want the quickest first check for ${htmlEscape(useCase.label)} ${htmlEscape(countryText)}.` : "Start with the top shortlist, then confirm delivery and current terms."} ${secondPick ? `Compare <strong>${htmlEscape(secondPick.brand)}</strong> if the first option does not serve your area, fit your routine, or stay affordable after intro discounts.` : "If the first option is not a fit, use the full list below to compare alternatives."}</p>
        </div>
      </section>

      <section class="content-section" id="top-picks">
        <div class="section-heading">
          <span class="eyebrow">Buyer-intent shortlist</span>
          <h2>Best starting points</h2>
          <p>These are ranked by active status, source signals, consumer fit, and category relevance.</p>
        </div>
        <div class="brand-grid">${cards}</div>
      </section>

      <section class="content-section" id="all-options">
        <div class="section-heading">
          <span class="eyebrow">All options table</span>
          <h2>All matching brands</h2>
          <p>Use this table to compare meal type, country fit, current offer checks, review pages, and source links.</p>
        </div>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Brand</th>
                <th>Market</th>
                <th>Type</th>
                <th>Availability note</th>
                <th>Offer</th>
                <th>Official source</th>
              </tr>
            </thead>
            <tbody>${rows}
            </tbody>
          </table>
        </div>
      </section>

      <section class="content-section">
        <h2>How to choose</h2>
        <p>Start with fit, not the biggest discount. Match the meal format to your real week: meal kits if you still want to cook, prepared meals if you want no prep, high-protein plans if macros matter, frozen meals if you need backup dinners, and diet plans if calories or nutrition structure matter more than menu variety.</p>
      </section>
    </main>
  </body>
</html>
`;
}

function indexHtml(rows) {
  const cards = rows
    .filter((row) => row.scope === "global")
    .map((row) => `
          <article class="brand-card">
            <span class="eyebrow">${htmlEscape(row.brand_count)} brands</span>
            <h3>${htmlEscape(row.use_case)}</h3>
            <p>${htmlEscape(row.intent)}</p>
            <a class="text-link" href="${row.url}">Open best list</a>
          </article>`)
    .join("");
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Best Meal Delivery Lists | Every Meal Guide</title>
    <meta name="description" content="Browse Every Meal Guide best-list pages by buyer intent, including prepared meals, high-protein meal prep, weight loss, cheap meal delivery, frozen meals, meal kits, and healthy meals." />
    <link rel="canonical" href="https://www.everymealguide.com/best/" />
    <link rel="stylesheet" href="/styles.css" />
  </head>
  <body>
    <header class="site-header">
      <a class="brand-mark" href="/">Every Meal Guide</a>
      <nav>
        <a href="/#rankings">Rankings</a>
        <a href="/#deals">Deals</a>
        <a href="/vs/">Comparisons</a>
        <a href="/best/">Best lists</a>
      </nav>
    </header>
    <main class="page-shell">
      <section class="hero page-hero">
        <div>
          <span class="eyebrow">Buyer-intent hub</span>
          <h1>Best meal delivery lists by need</h1>
          <p>Start with the problem you need solved: less cooking, more protein, weight loss, family dinners, lower cost, frozen backup meals, vegetarian options, or grocery-style dinner planning.</p>
        </div>
      </section>
      <section class="content-section">
        <div class="brand-grid">${cards}</div>
      </section>
    </main>
  </body>
</html>
`;
}

const csv = parseCsv(fs.readFileSync(sourcePath, "utf8"));
const header = csv[0];
const records = csv.slice(1).map((row) =>
  Object.fromEntries(header.map((column, index) => [column, row[index] ?? ""]))
);

const indexRows = [
  ["scope", "country", "country_slug", "use_case", "page_slug", "url", "brand_count", "lead_brands", "intent", "status"]
];
const pageRows = [];
const sitemapUrls = ["https://www.everymealguide.com/best/"];

for (const useCase of useCases) {
  const matched = records.filter((record) => useCase.match.test(textBlob(record)));
  const globalMatched = dedupeByBrand(matched);
  if (globalMatched.length >= 3) {
    const url = `/best/${useCase.slug}/`;
    const dir = path.join(root, "best", useCase.slug);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, "index.html"), pageHtml({ useCase, country: { slug: "global", label: "Global" }, records: globalMatched, url, isGlobal: true }));
    const leadBrands = globalMatched.sort((a, b) => routeScore(b) - routeScore(a)).slice(0, 6).map((record) => record.brand).join(" | ");
    pageRows.push({ scope: "global", country: "Global", country_slug: "global", use_case: useCase.label, page_slug: useCase.slug, url, brand_count: globalMatched.length, lead_brands: leadBrands, intent: useCase.intent, status: "generated" });
    sitemapUrls.push(`https://www.everymealguide.com${url}`);
  }

  const byCountry = new Map();
  for (const record of matched) {
    const country = normalizeCountry(record.country);
    if (country.slug === "global") continue;
    if (!byCountry.has(country.slug)) byCountry.set(country.slug, { country, records: [] });
    byCountry.get(country.slug).records.push(record);
  }

  for (const { country, records: countryRecords } of byCountry.values()) {
    const countryMatched = dedupeByBrand(countryRecords);
    if (countryMatched.length < 2) continue;
    const url = `/countries/${country.slug}/${useCase.slug}/`;
    const dir = path.join(root, "countries", country.slug, useCase.slug);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, "index.html"), pageHtml({ useCase, country, records: countryMatched, url, isGlobal: false }));
    const leadBrands = countryMatched.sort((a, b) => routeScore(b) - routeScore(a)).slice(0, 6).map((record) => record.brand).join(" | ");
    pageRows.push({ scope: "country", country: country.label, country_slug: country.slug, use_case: useCase.label, page_slug: useCase.slug, url, brand_count: countryMatched.length, lead_brands: leadBrands, intent: useCase.intent, status: "generated" });
    sitemapUrls.push(`https://www.everymealguide.com${url}`);
  }
}

pageRows.sort((a, b) => a.url.localeCompare(b.url));
for (const row of pageRows) {
  indexRows.push([row.scope, row.country, row.country_slug, row.use_case, row.page_slug, row.url, row.brand_count, row.lead_brands, row.intent, row.status]);
}

fs.writeFileSync(indexPath, toCsv(indexRows));
fs.mkdirSync(path.join(root, "best"), { recursive: true });
fs.writeFileSync(path.join(root, "best", "index.html"), indexHtml(pageRows));

if (fs.existsSync(sitemapPath)) {
  let sitemap = fs.readFileSync(sitemapPath, "utf8");
  for (const loc of sitemapUrls) {
    if (sitemap.includes(`<loc>${loc}</loc>`)) continue;
    sitemap = sitemap.replace("</urlset>", `  <url>\n    <loc>${loc}</loc>\n  </url>\n</urlset>`);
  }
  fs.writeFileSync(sitemapPath, sitemap);
}

fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(
  reportPath,
  `${JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      sourceRows: records.length,
      useCases: useCases.length,
      pagesGenerated: pageRows.length,
      globalPages: pageRows.filter((row) => row.scope === "global").length,
      countryPages: pageRows.filter((row) => row.scope === "country").length,
      indexPath: path.relative(root, indexPath)
    },
    null,
    2
  )}\n`
);

console.log(JSON.stringify({ pagesGenerated: pageRows.length, indexPath, reportPath }, null, 2));
